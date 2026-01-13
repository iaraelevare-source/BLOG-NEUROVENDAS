import React from 'react';

interface LayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  credits: number;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ activeTab, setActiveTab, credits, children }) => {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '1rem 2rem',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b' }}>
            📝 AutoBlog AI - NeuroVendas
          </h1>
          <div style={{ color: '#64748b' }}>
            Créditos: {credits}
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '0 2rem',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          gap: '2rem',
        }}>
          {[
            { id: 'dashboard', label: '📊 Dashboard' },
            { id: 'generator', label: '✍️ Gerador' },
            { id: 'wordpress', label: '🚀 WordPress' },
            { id: 'hub', label: '🎯 Hub' },
            { id: 'autopilot', label: '⚙️ Automação' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                padding: '1rem 0',
                border: 'none',
                background: 'transparent',
                color: activeTab === item.id ? '#4f46e5' : '#64748b',
                fontWeight: activeTab === item.id ? '600' : '400',
                borderBottom: activeTab === item.id ? '2px solid #4f46e5' : 'none',
                cursor: 'pointer',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem',
      }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
