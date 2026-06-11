import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ServicosPage from './pages/ServicosPage';
import AgendarPage from './pages/AgendarPage';
import AgendamentosAdminPage from './pages/AgendamentosAdminPage';
import BarbeirosAdminPage from './pages/BarbeirosAdminPage';
import BarbeiroDashboardPage from './pages/BarbeiroDashboardPage';
import HistoricoPage from './pages/HistoricoPage';
import IndexPage from './pages/IndexPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';
import SetupBanner from './components/SetupBanner';


function AppInner() {
  const { user, perfil, loading } = useAuth();
  const [page, setPage] = useState<string>('index');
  const [pageParams, setPageParams] = useState<Record<string, string>>({});

  function navigate(to: string, params: Record<string, string> = {}) {
    setPage(to);
    setPageParams(params);
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    if (!loading) {
      const hash = window.location.hash.replace('#', '') || 'index';
      setPage(hash);
    }
  }, [loading]);

  useEffect(() => {
    window.location.hash = page;
  }, [page]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  // Route guards
  const rotasProtegidas = ['agendar', 'historico', 'dashboard', 'admin-agendamentos', 'admin-barbeiros', 'admin-servicos', 'barbeiro-dashboard'];
  const rotasAdmin = ['dashboard', 'admin-agendamentos', 'admin-barbeiros', 'admin-servicos'];
  const rotasBarbeiro = ['barbeiro-dashboard'];

  if (rotasProtegidas.includes(page) && !user) {
    return (
      <AuthPage navigate={navigate} mensagem="Faça login para continuar." />
    );
  }

  if (rotasAdmin.includes(page) && perfil?.tipo_usuario !== 'admin') {
    return (
      <div className="error-page">
        <Navbar navigate={navigate} />
        <NotFoundPage navigate={navigate} mensagem="Acesso negado. Área restrita ao administrador." codigo={403} />
      </div>
    );
  }

  if (rotasBarbeiro.includes(page) && perfil?.tipo_usuario !== 'barbeiro') {
    return (
      <div className="error-page">
        <Navbar navigate={navigate} />
        <NotFoundPage navigate={navigate} mensagem="Acesso negado. Área restrita a barbeiros." codigo={403} />
      </div>
    );
  }

  const renderPage = () => {
    switch (page) {
      case 'index':
        return <IndexPage navigate={navigate} />;
      case 'auth':
        return <AuthPage navigate={navigate} />;
      case 'dashboard':
        return <DashboardPage navigate={navigate} />;
      case 'servicos':
        return <ServicosPage navigate={navigate} />;
      case 'agendar':
        return <AgendarPage navigate={navigate} params={pageParams} />;
      case 'admin-agendamentos':
        return <AgendamentosAdminPage navigate={navigate} />;
      case 'admin-barbeiros':
        return <BarbeirosAdminPage navigate={navigate} />;
      case 'admin-servicos':
        return <ServicosPage navigate={navigate} adminMode={true} />;
      case 'barbeiro-dashboard':
        return <BarbeiroDashboardPage navigate={navigate} />;
      case 'historico':
        return <HistoricoPage navigate={navigate} />;
      default:
        return <NotFoundPage navigate={navigate} />;
    }
  };

  const showNavbar = page !== 'auth';

  return (
    <div className="app-wrapper">
      {showNavbar && <Navbar navigate={navigate} />}
      <main className={showNavbar ? 'with-navbar' : ''}>
        {renderPage()}
      </main>
      <SetupBanner />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
