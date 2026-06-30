
import React from 'react';
import { Minus, Plus, X } from 'lucide-react';

export interface CartItemData {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit?: string;
}

interface CartItemProps {
  item: CartItemData;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const subtotal = item.price * item.quantity;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-3">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
          <p className="text-burger-red font-medium">
            R$ {item.price.toFixed(2)}{item.unit ? ` / ${item.unit}` : ' cada'}
          </p>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
          aria-label="Remover item"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
            className="bg-burger-cream hover:bg-burger-gold/40 rounded-lg p-2 transition-colors"
            aria-label="Diminuir quantidade"
          >
            <Minus size={16} />
          </button>
          <span className="font-semibold text-lg min-w-[3rem] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="bg-burger-cream hover:bg-burger-gold/40 rounded-lg p-2 transition-colors"
            aria-label="Aumentar quantidade"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="text-right">
          <p className="text-xl font-bold text-burger-red">
            R$ {subtotal.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
