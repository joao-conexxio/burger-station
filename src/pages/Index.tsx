
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sandwich, ShoppingBag, Flame, Bike, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  const goToCheckout = () => {
    // Exemplo de como o bot da Burger Station passa o pedido via URL
    const exampleProducts = [
      { id: '1', name: 'Cheddar Bacon', price: 32.9, quantity: 2 },
      { id: '2', name: 'Smash Clássico', price: 26.9, quantity: 1 },
      { id: '3', name: 'Batata Frita G', price: 18.9, quantity: 1 },
    ];

    const productsParam = encodeURIComponent(JSON.stringify(exampleProducts));
    const orderId = String(Math.floor(100000 + Math.random() * 900000));
    navigate(`/checkout?order=${orderId}&shipping=7.90&products=${productsParam}`);
  };

  return (
    <div className="min-h-screen bg-burger-cream">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Sandwich className="text-burger-red" size={48} />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Burger Station
            </h1>
          </div>

          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Hambúrgueres artesanais na chapa, do jeitinho que você gosta.
            Peça pelo WhatsApp e finalize com um link de pagamento rápido e seguro.
          </p>

          {/* Demonstração do Checkout */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Link de Pagamento Burger Station
            </h2>

            <p className="text-gray-600 mb-8">
              Demonstração Conexxio: o bot com IA monta o pedido no WhatsApp e
              envia este link já com os itens e o número do pedido.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-burger-red text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Flame size={22} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Pedido pela IA</h3>
                <p className="text-sm text-gray-600">
                  Itens e quantidades chegam direto do atendimento no WhatsApp
                </p>
              </div>

              <div className="text-center">
                <div className="bg-burger-red text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Bike size={22} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Entrega ou Retirada</h3>
                <p className="text-sm text-gray-600">
                  Cliente escolhe receber em casa ou retirar no balcão
                </p>
              </div>

              <div className="text-center">
                <div className="bg-burger-red text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck size={22} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Pagamento Seguro</h3>
                <p className="text-sm text-gray-600">
                  Pix, cartão e dinheiro com confirmação na hora
                </p>
              </div>
            </div>

            <Button
              onClick={goToCheckout}
              className="bg-burger-red hover:bg-burger-red-dark text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105"
            >
              <ShoppingBag className="mr-2" size={20} />
              Ver Demonstração do Checkout
            </Button>
          </div>

          {/* Como integrar com o bot */}
          <div className="bg-white rounded-xl p-6 shadow-sm text-left">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              🔗 Como o bot gera o link
            </h3>
            <p className="text-gray-600 mb-3">
              Passe os itens do pedido (JSON), o id de 6 dígitos do
              <code className="bg-gray-100 px-1 py-0.5 rounded mx-1">registrar_pedido</code>
              e o frete calculado pelo bot nos parâmetros da URL:
            </p>
            <code className="block bg-gray-100 px-3 py-2 rounded text-sm overflow-x-auto">
              /checkout?order=123456&amp;shipping=7.90&amp;products=[&#123;"id":"1","name":"Cheddar Bacon","price":32.90,"quantity":2&#125;]
            </code>
            <p className="text-sm text-gray-500 mt-3">
              <code className="bg-gray-100 px-1 py-0.5 rounded">shipping</code> (ou
              <code className="bg-gray-100 px-1 py-0.5 rounded mx-1">frete</code>) define a taxa de entrega
              vinda do bot. O campo <code className="bg-gray-100 px-1 py-0.5 rounded">unit</code> é opcional.
              Na retirada, o frete é sempre grátis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
