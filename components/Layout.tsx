import React from 'react';
import { LayoutDashboard, FileText, Sparkles, Settings, Youtube, Image, Zap, BookOpen } from 'lucide-react';
import { APP_NAME } from '../constants';

interface LayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  credits: number;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ activeTab, setActiveTab, credits, children }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'hub', label: 'Hub Central', icon: Sparkles },
    { id: 'generator', label: 'Gerador', icon: FileText },
    { id: 'examples', label: 'Exemplos', icon: BookOpen },
    { id: 'autopilot', label: 'Autopilot', icon: Zap },
    { id: 'youtube', label: 'YouTube', icon: Youtube },
    { id: 'stories', label: 'Stories', icon: Image },
    { id: 'articles', label: 'Artigos', icon: FileText },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-xl font-bold text-indigo-900">{APP_NAME}</h1>
          <p className="text-xs text-slate-500 mt-1">Fábrica de Conteúdo SEO</p>
        </div>
        
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                  activeTab === item.id
                    ? 'bg-indigo-50 text-indigo-900 font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-slate-50">
          <div className="text-sm">
            <p className="text-slate-600">Créditos disponíveis</p>
            <p className="text-2xl font-bold text-indigo-900">{credits}</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
