import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  CreditCard, QrCode, ArrowLeft, Lock, CheckCircle, Copy 
} from 'lucide-react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { toast } from 'sonner';

const Payment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const amount = parseFloat(searchParams.get('amount') || '0');

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('pix');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // Card form data (following Asaas patterns)
  const [cardData, setCardData] = useState({
    holderName: '',
    number: '',
    expiryMonth: '',
    expiryYear: '',
    ccv: '',
    cpfCnpj: '',
    postalCode: '',
    addressNumber: '',
    phone: '',
  });

  // Simulated PIX data
  const pixCode = 'ludum_' + Math.random().toString(36).substring(7);
  const pixQRCode = `00020126580014br.gov.bcb.pix0136${pixCode}5204000053039865802BR5913Ludum Games6008Sao Paulo62070503***6304`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixQRCode);
    toast.success('Código PIX copiado!');
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().substring(0, 19);
  };

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setPaymentCompleted(true);
    toast.success('Pagamento aprovado!');
  };

  const handlePixConfirm = async () => {
    setIsProcessing(true);

    // Simulate PIX verification
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsProcessing(false);
    setPaymentCompleted(true);
    toast.success('Pagamento PIX confirmado!');
  };

  if (!amount || amount <= 0) {
    return (
      <DashboardLayout>
        <div className="p-6 md:p-8 flex items-center justify-center min-h-[60vh]">
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">Valor inválido para pagamento</p>
            <Button onClick={() => navigate('/painel/carteira')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Carteira
            </Button>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (paymentCompleted) {
    return (
      <DashboardLayout>
        <div className="p-6 md:p-8 flex items-center justify-center min-h-[60vh]">
          <Card className="p-8 text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Pagamento Confirmado!</h2>
            <p className="text-muted-foreground mb-6">
              R$ {amount.toFixed(2)} foi adicionado à sua carteira.
              {amount > 100 && ' O valor ficará bloqueado por 24h (trava antifraude).'}
            </p>
            <Button onClick={() => navigate('/painel/carteira')}>
              Voltar para Carteira
            </Button>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/painel/carteira')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Adicionar Saldo</span>
          </h1>
          <p className="text-muted-foreground">
            Valor: <span className="text-foreground font-bold">R$ {amount.toFixed(2)}</span>
          </p>
        </div>

        <div className="max-w-2xl">
          {/* Payment Method Selection */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 mb-6">
            <h2 className="font-bold text-lg mb-4">Forma de Pagamento</h2>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(v) => setPaymentMethod(v as 'card' | 'pix')}
              className="grid grid-cols-2 gap-4"
            >
              <Label
                htmlFor="pix"
                className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                  paymentMethod === 'pix'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <RadioGroupItem value="pix" id="pix" />
                <QrCode className="w-6 h-6 text-secondary" />
                <div>
                  <p className="font-medium">PIX</p>
                  <p className="text-xs text-muted-foreground">Aprovação instantânea</p>
                </div>
              </Label>

              <Label
                htmlFor="card"
                className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <RadioGroupItem value="card" id="card" />
                <CreditCard className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium">Cartão</p>
                  <p className="text-xs text-muted-foreground">Crédito ou Débito</p>
                </div>
              </Label>
            </RadioGroup>
          </Card>

          {/* Payment Form */}
          {paymentMethod === 'pix' ? (
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-secondary" />
                Pague com PIX
              </h2>

              {/* QR Code Placeholder */}
              <div className="flex flex-col items-center py-8">
                <div className="w-48 h-48 bg-foreground rounded-lg flex items-center justify-center mb-4">
                  <div className="w-44 h-44 bg-background flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  Escaneie o QR Code ou copie o código abaixo
                </p>

                {/* PIX Code */}
                <div className="w-full max-w-md">
                  <div className="flex gap-2">
                    <Input
                      value={pixQRCode}
                      readOnly
                      className="font-mono text-xs"
                    />
                    <Button variant="outline" onClick={handleCopyPix}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-4">
                  O código expira em 30 minutos
                </p>
              </div>

              <Button
                className="w-full"
                onClick={handlePixConfirm}
                disabled={isProcessing}
              >
                {isProcessing ? 'Verificando pagamento...' : 'Já paguei'}
              </Button>
            </Card>
          ) : (
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Dados do Cartão
              </h2>

              <form onSubmit={handleCardSubmit} className="space-y-4">
                {/* Card Number */}
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Número do Cartão</Label>
                  <Input
                    id="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    value={formatCardNumber(cardData.number)}
                    onChange={(e) =>
                      setCardData({ ...cardData, number: e.target.value.replace(/\s/g, '') })
                    }
                    maxLength={19}
                    required
                  />
                </div>

                {/* Holder Name */}
                <div className="space-y-2">
                  <Label htmlFor="holderName">Nome no Cartão</Label>
                  <Input
                    id="holderName"
                    placeholder="Como está no cartão"
                    value={cardData.holderName}
                    onChange={(e) =>
                      setCardData({ ...cardData, holderName: e.target.value.toUpperCase() })
                    }
                    required
                  />
                </div>

                {/* Expiry & CCV */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryMonth">Mês</Label>
                    <Input
                      id="expiryMonth"
                      placeholder="MM"
                      maxLength={2}
                      value={cardData.expiryMonth}
                      onChange={(e) =>
                        setCardData({ ...cardData, expiryMonth: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryYear">Ano</Label>
                    <Input
                      id="expiryYear"
                      placeholder="AA"
                      maxLength={2}
                      value={cardData.expiryYear}
                      onChange={(e) =>
                        setCardData({ ...cardData, expiryYear: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ccv">CVV</Label>
                    <Input
                      id="ccv"
                      placeholder="000"
                      maxLength={4}
                      value={cardData.ccv}
                      onChange={(e) => setCardData({ ...cardData, ccv: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* CPF/CNPJ */}
                <div className="space-y-2">
                  <Label htmlFor="cpfCnpj">CPF/CNPJ do Titular</Label>
                  <Input
                    id="cpfCnpj"
                    placeholder="000.000.000-00"
                    value={cardData.cpfCnpj}
                    onChange={(e) => setCardData({ ...cardData, cpfCnpj: e.target.value })}
                    required
                  />
                </div>

                {/* Address */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">CEP</Label>
                    <Input
                      id="postalCode"
                      placeholder="00000-000"
                      value={cardData.postalCode}
                      onChange={(e) =>
                        setCardData({ ...cardData, postalCode: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="addressNumber">Número</Label>
                    <Input
                      id="addressNumber"
                      placeholder="123"
                      value={cardData.addressNumber}
                      onChange={(e) =>
                        setCardData({ ...cardData, addressNumber: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    placeholder="(00) 00000-0000"
                    value={cardData.phone}
                    onChange={(e) => setCardData({ ...cardData, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg">
                  <Lock className="w-4 h-4" />
                  <span>Seus dados estão protegidos com criptografia de ponta a ponta</span>
                </div>

                <Button type="submit" className="w-full" disabled={isProcessing}>
                  {isProcessing ? 'Processando...' : `Pagar R$ ${amount.toFixed(2)}`}
                </Button>
              </form>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Payment;
