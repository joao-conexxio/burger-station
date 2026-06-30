
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sandwich, CheckCircle2, Clock, MessageCircle, Info } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CartItem, { CartItemData } from '@/components/CartItem';
import OrderSummary, { DeliveryMode } from '@/components/OrderSummary';
import PaymentGateway from '@/components/PaymentGateway';
import { toast } from '@/hooks/use-toast';

const DEFAULT_DELIVERY_FEE = 6.0;

// Aviso fixo: deixa claro que é uma demonstração, não uma loja real.
const DemoBanner = () => (
  <div className="bg-burger-dark text-burger-gold text-center text-xs sm:text-sm px-4 py-2 flex items-center justify-center gap-2">
    <Info size={14} className="shrink-0" />
    <span>
      Página de demonstração criada pela <b className="text-white">Conexxio</b> — nenhum pagamento é processado de verdade.
    </span>
  </div>
);

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('delivery');
  const [orderId, setOrderId] = useState<string>('');
  const [deliveryFee, setDeliveryFee] = useState<number>(DEFAULT_DELIVERY_FEE);

  // Carrega os produtos, o número do pedido e o frete vindos da URL (gerados pelo bot)
  useEffect(() => {
    const orderParam = searchParams.get('order');
    if (orderParam) setOrderId(orderParam);

    // Frete dinâmico: o bot calcula na etapa de coleta e envia via URL (?shipping= ou ?frete=)
    const shippingParam = searchParams.get('shipping') ?? searchParams.get('frete');
    if (shippingParam !== null) {
      const parsedFee = Number(shippingParam.replace(',', '.'));
      if (!Number.isNaN(parsedFee) && parsedFee >= 0) {
        setDeliveryFee(parsedFee);
      }
    }

    try {
      const productsParam = searchParams.get('products');
      if (productsParam) {
        const decodedProducts = JSON.parse(decodeURIComponent(productsParam));
        setCartItems(decodedProducts);
      } else {
        // Dados de exemplo para demonstração
        setCartItems([
          { id: '1', name: 'Cheddar Bacon', price: 32.9, quantity: 2 },
          { id: '2', name: 'Smash Clássico', price: 26.9, quantity: 1 },
          { id: '3', name: 'Batata Frita G', price: 18.9, quantity: 1 },
        ]);
      }
    } catch (error) {
      console.error('Erro ao carregar produtos da URL:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os itens do pedido.',
        variant: 'destructive',
      });
    }
  }, [searchParams]);

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(items =>
      items.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: 'Item removido',
      description: 'O item foi removido do seu pedido.',
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = deliveryMode === 'delivery' ? deliveryFee : 0;
  const total = subtotal + shipping;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      toast({
        title: 'Pagamento realizado com sucesso! 🎉',
        description: 'Seu pedido foi confirmado e já vai pra chapa!',
      });
      setIsPaid(true);
    } catch (error) {
      toast({
        title: 'Erro no pagamento',
        description: 'Houve um problema ao processar seu pagamento. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Tela de sucesso (pós-pagamento)
  if (isPaid) {
    return (
      <div className="min-h-screen bg-burger-cream flex flex-col">
        <DemoBanner />
        <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full text-center">
          <CheckCircle2 className="mx-auto text-burger-red mb-4" size={72} />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Pagamento confirmado!
          </h1>
          <p className="text-gray-600 mb-6">
            Recebemos seu pedido e ele já foi pra cozinha 🍔
          </p>

          {orderId && (
            <div className="bg-burger-cream rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-600">Número do pedido</p>
              <p className="text-2xl font-bold text-burger-red">#{orderId}</p>
            </div>
          )}

          <div className="flex justify-between items-center bg-burger-cream rounded-xl p-4 mb-4">
            <span className="text-gray-700 font-medium">Total pago</span>
            <span className="text-xl font-bold text-burger-red">R$ {total.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-6">
            <Clock size={16} className="text-burger-red" />
            <span>
              {deliveryMode === 'delivery'
                ? 'Entrega em 30 a 45 minutos'
                : 'Pronto para retirada em 30 a 45 minutos'}
            </span>
          </div>

          <button
            onClick={() => window.history.back()}
            className="w-full bg-burger-red hover:bg-burger-red-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle size={20} />
            Voltar ao atendimento
          </button>
        </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-burger-cream">
        <DemoBanner />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Sandwich className="mx-auto text-burger-red mb-4" size={64} />
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Seu pedido está vazio
            </h1>
            <p className="text-gray-600 mb-6">
              Volte ao atendimento e monte seu combo na Burger Station!
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-burger-red hover:bg-burger-red-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Voltar ao atendimento
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-burger-cream">
      <DemoBanner />
      {/* Header */}
      <div className="bg-burger-dark shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="text-burger-gold hover:text-white transition-colors"
              aria-label="Voltar"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              <Sandwich className="text-burger-gold" size={28} />
              <h1 className="text-xl font-bold text-white">
                Burger Station <span className="text-burger-gold">·</span> Checkout
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Coluna da Esquerda - Itens */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Seu Pedido ({itemCount} {itemCount === 1 ? 'item' : 'itens'})
              </h2>
              {orderId && (
                <span className="text-sm font-semibold text-burger-red bg-white rounded-lg px-3 py-1 shadow-sm">
                  #{orderId}
                </span>
              )}
            </div>

            <div className="space-y-4">
              {cartItems.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
          </div>

          {/* Coluna da Direita - Resumo e Pagamento */}
          <div>
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              itemCount={itemCount}
              deliveryMode={deliveryMode}
              onChangeDeliveryMode={setDeliveryMode}
            />

            <PaymentGateway
              total={total}
              onPayment={handlePayment}
              isProcessing={isProcessing}
            />

            {/* Informações Adicionais */}
            <div className="bg-white rounded-xl p-4 mt-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} className="text-burger-red" />
                <span>
                  Tempo médio de preparo: 30 a 45 minutos.
                  {deliveryMode === 'pickup' && ' Retirada no balcão sem taxa!'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
