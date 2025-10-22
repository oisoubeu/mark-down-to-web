import { Button } from '@/components/ui/button';
import { Wallet, TrendingUp, PiggyBank, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-success/10">
      <nav className="border-b bg-background/80 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-xl">SetDívidas</span>
          </div>
          <Button onClick={() => navigate('/auth')}>Começar Agora</Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
            Controle suas finanças com inteligência
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Dashboard financeiro pessoal moderno e intuitivo. Organize receitas, despesas e alcance suas metas.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/auth')}>
              Começar Gratuitamente
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/auth')}>
              Fazer Login
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 rounded-lg border bg-card text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Dashboard Completo</h3>
            <p className="text-muted-foreground">
              Visualize seu saldo, receitas e despesas em um só lugar
            </p>
          </div>

          <div className="p-6 rounded-lg border bg-card text-center">
            <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <PiggyBank className="h-6 w-6 text-success" />
            </div>
            <h3 className="text-xl font-bold mb-2">Metas Financeiras</h3>
            <p className="text-muted-foreground">
              Defina objetivos e acompanhe seu progresso
            </p>
          </div>

          <div className="p-6 rounded-lg border bg-card text-center">
            <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-6 w-6 text-warning" />
            </div>
            <h3 className="text-xl font-bold mb-2">Relatórios Visuais</h3>
            <p className="text-muted-foreground">
              Gráficos e análises para decisões mais inteligentes
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 SetDívidas. Controle financeiro pessoal.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
