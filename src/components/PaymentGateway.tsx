
import React, { useState } from 'react';
import { CreditCard, Lock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PaymentGatewayProps {
  total: number;
  onPayment: () => void;
  isProcessing: boolean;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({
  total,
  onPayment,
  isProcessing
}) => {
  const [paymentMethod, setPaymentMethod] = useState('pix');

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Lock className="text-burger-red" size={24} />
        Pagamento Seguro
      </h2>

      <div className="mb-6">
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Forma de Pagamento
        </Label>
        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pix">📱 PIX</SelectItem>
            <SelectItem value="credit">💳 Cartão de Crédito</SelectItem>
            <SelectItem value="debit">💳 Cartão de Débito</SelectItem>
            <SelectItem value="cash">💵 Dinheiro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
        <div className="space-y-4 mb-6">
          <div>
            <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">
              Número do Cartão
            </Label>
            <Input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry" className="text-sm font-medium text-gray-700">
                Validade
              </Label>
              <Input
                id="expiry"
                type="text"
                placeholder="MM/AA"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="cvv" className="text-sm font-medium text-gray-700">
                CVV
              </Label>
              <Input
                id="cvv"
                type="text"
                placeholder="123"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="cardName" className="text-sm font-medium text-gray-700">
              Nome no Cartão
            </Label>
            <Input
              id="cardName"
              type="text"
              placeholder="Seu nome completo"
              className="mt-1"
            />
          </div>
        </div>
      )}

      {paymentMethod === 'pix' && (
        <div className="bg-burger-cream rounded-lg p-4 mb-6 text-center">
          <p className="text-gray-700 mb-2">
            Você será redirecionado para completar o pagamento via PIX
          </p>
          <p className="text-sm text-gray-600">
            Pagamento instantâneo e seguro
          </p>
        </div>
      )}

      {paymentMethod === 'cash' && (
        <div className="bg-burger-cream rounded-lg p-4 mb-6 text-center">
          <p className="text-gray-700 mb-2">
            Pague em dinheiro na entrega ou na retirada
          </p>
          <p className="text-sm text-gray-600">
            Precisa de troco? Avise nosso atendimento 😉
          </p>
        </div>
      )}

      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Shield size={16} className="text-burger-red" />
        <span>Transação protegida com criptografia SSL</span>
      </div>

      <Button
        onClick={onPayment}
        disabled={isProcessing}
        className="w-full bg-burger-red hover:bg-burger-red-dark text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isProcessing ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Processando...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <CreditCard size={20} />
            Finalizar Pagamento - R$ {total.toFixed(2)}
          </div>
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Ao finalizar, você concorda com nossos termos e condições
      </p>
    </div>
  );
};

export default PaymentGateway;
