import React from 'react';

interface LayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  credits: number;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ activeTab, setActiveTab, credits, children }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'hub', label: 'Hub Central' },
    { id: 'generator', label: 'Criar Artigo' },
    { id: 'examples', label: 'Exemplos' },
    { id: 'autopilot', label: 'Autopilot' },
    { id: 'youtube', label: 'YouTube' },
    { id: 'stories', label: 'Stories' },
    { id: 'articles', label: 'Artigos' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-indigo-900">Elevare Editorial AI</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">Créditos: {credits}</span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-indigo-900 border-b-2 border-indigo-900'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
