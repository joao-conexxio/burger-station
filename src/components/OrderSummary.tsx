
import React from 'react';
import { ShoppingBag, Bike, Store } from 'lucide-react';

export type DeliveryMode = 'delivery' | 'pickup';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  itemCount: number;
  deliveryMode: DeliveryMode;
  onChangeDeliveryMode: (mode: DeliveryMode) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shipping,
  total,
  itemCount,
  deliveryMode,
  onChangeDeliveryMode,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <ShoppingBag className="text-burger-red" size={24} />
        Resumo do Pedido
      </h2>

      {/* Entrega ou Retirada */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        <button
          type="button"
          onClick={() => onChangeDeliveryMode('delivery')}
          className={`flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-colors border ${
            deliveryMode === 'delivery'
              ? 'bg-burger-red text-white border-burger-red'
              : 'bg-burger-cream text-gray-700 border-transparent hover:bg-burger-gold/40'
          }`}
        >
          <Bike size={18} />
          Entrega
        </button>
        <button
          type="button"
          onClick={() => onChangeDeliveryMode('pickup')}
          className={`flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-colors border ${
            deliveryMode === 'pickup'
              ? 'bg-burger-red text-white border-burger-red'
              : 'bg-burger-cream text-gray-700 border-transparent hover:bg-burger-gold/40'
          }`}
        >
          <Store size={18} />
          Retirada
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'itens'})</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span className="flex items-center gap-1">
            {deliveryMode === 'delivery' ? <Bike size={16} /> : <Store size={16} />}
            {deliveryMode === 'delivery' ? 'Taxa de entrega' : 'Retirada no balcão'}
          </span>
          <span>{shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}</span>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-xl font-bold text-burger-red">
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
