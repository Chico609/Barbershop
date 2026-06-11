import { useAuth } from '../contexts/AuthContext';

interface IndexPageProps {
  navigate: (to: string) => void;
}

export default function IndexPage({ navigate }: IndexPageProps) {
  const { user, perfil } = useAuth();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-inner container">
          <div>
            <span className="hero-badge">✂️ Barbearia Profissional</span>
            <h1 className="hero-title">
              Agende seu <span>horário</span> com facilidade
            </h1>
            <p className="hero-desc">
              Sistema moderno de agendamento para barbearia. Escolha seu barbeiro favorito,
              veja os horários disponíveis e agende em poucos cliques — sem ligações,
              sem espera.
            </p>
            <div className="hero-actions">
              {user ? (
                perfil?.tipo_usuario === 'admin' ? (
                  <button className="btn btn-primary btn-lg" onClick={() => navigate('dashboard')}>
                    Ir para o Dashboard
                  </button>
                ) : (
                  <>
                    <button className="btn btn-primary btn-lg" onClick={() => navigate('agendar')}>
                      Fazer Agendamento
                    </button>
                    <button className="btn btn-secondary btn-lg" onClick={() => navigate('historico')}>
                      Meus Agendamentos
                    </button>
                  </>
                )
              ) : (
                <>
                  <button className="btn btn-primary btn-lg" onClick={() => navigate('auth')}>
                    Criar Conta Grátis
                  </button>
                  <button className="btn btn-secondary btn-lg" onClick={() => navigate('servicos')}>
                    Ver Serviços
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-showcase">
              <div style={{ marginBottom: 20, color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Próximo agendamento
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'var(--color-primary-dim)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.4rem'
                }}>👤</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', marginBottom: 2 }}>Carlos Oliveira</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.83rem' }}>Corte + Barba</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                <div style={{
                  flex: 1, background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)',
                  padding: '12px', textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>Data</div>
                  <div style={{ fontWeight: 600 }}>18/06/2026</div>
                </div>
                <div style={{
                  flex: 1, background: 'var(--color-primary-dim)', borderRadius: 'var(--radius-sm)',
                  padding: '12px', textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>Horário</div>
                  <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>14:00</div>
                </div>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                paddingTop: 16, borderTop: '1px solid var(--border)'
              }}>
                <span className="badge badge-confirmado">Confirmado</span>
                <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '1.1rem', fontFamily: 'var(--font-serif)' }}>
                  R$ 65,00
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="container" style={{ marginTop: 60, maxWidth: 1200 }}>
          <div className="hero-features">
            <div className="feature-item">
              <div className="feature-icon">📅</div>
              <div className="feature-title">Agendamento Online</div>
              <div className="feature-desc">Agende 24h por dia, 7 dias por semana, de qualquer dispositivo.</div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✂️</div>
              <div className="feature-title">Escolha seu Barbeiro</div>
              <div className="feature-desc">Veja a disponibilidade de cada barbeiro e escolha seu favorito.</div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💰</div>
              <div className="feature-title">Preços Transparentes</div>
              <div className="feature-desc">Tabela de preços completa e atualizada sempre disponível.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
        padding: '32px 20px',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.85rem'
      }}>
        <div style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary)', fontSize: '1.1rem', marginBottom: 8 }}>
          ✂️ BarberSync
        </div>
        <p>Sistema de Agendamento para Barbearia</p>
        <p style={{ marginTop: 8 }}>
          Projeto Integrador BDD + PW — EEEP Professora Maria Célia Pinheiro Falcão — 2026
        </p>
        <p style={{ marginTop: 4, fontSize: '0.75rem' }}>
          Equipe: Gustavo Araujo · Paulo Gabryel · Francisco Gabriel · Ellen Cristina · Antonio Lourenço · Charles Gabriel · Pedro Victor
        </p>
      </footer>
    </div>
  );
}
