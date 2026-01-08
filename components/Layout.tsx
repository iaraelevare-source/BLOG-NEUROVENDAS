
import React from 'react';
import { Zap, LayoutDashboard, FileText, Settings, Youtube, Image, Newspaper, Lightbulb } from 'lucide-react';
import { APP_NAME, APP_SLOGAN } from '../constants';

interface LayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  credits: number;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ activeTab, setActiveTab, credits, children }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'hub', label: 'Hub Central', icon: Newspaper },
    { id: 'generator', label: 'Gerador', icon: FileText },
    { id: 'autopilot', label: 'Autopilot', icon: Zap },
    { id: 'youtube', label: 'YouTube', icon: Youtube },
    { id: 'stories', label: 'Web Stories', icon: Image },
    { id: 'examples', label: 'Exemplos', icon: Lightbulb },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">{APP_NAME}</h1>
                <p className="text-xs text-slate-500">{APP_SLOGAN}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-xs text-slate-500">Créditos Disponíveis</p>
                <p className="text-lg font-bold text-indigo-600">{credits}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-1 overflow-x-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-6 text-center text-sm text-slate-500 border-t border-slate-200">
        <p>&copy; 2026 {APP_NAME}. Powered by Gemini AI.</p>
      </footer>
    </div>
  );
};

export default Layout;
