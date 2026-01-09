
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Onboarding from './pages/Onboarding';
import ArticleGenerator from './pages/ArticleGenerator';
import HubView from './pages/HubView';
import ExploreExamples from './pages/ExploreExamples';
import AutomationConfig from './pages/AutomationConfig';
import YoutubeConverter from './pages/YoutubeConverter';
import WebStoriesView from './pages/WebStoriesView';
import { Project, PlatformType } from './types';
import { CREDIT_LIMIT } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState('hub'); // Start with Hub Central as primary
  const [credits, setCredits] = useState(CREDIT_LIMIT);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (isLoggedIn && projects.length === 0) {
      setProjects([
        {
          id: '1',
          name: 'Clínica Estética Premium',
          platform: PlatformType.WORDPRESS,
          language: 'Português',
          niche: 'Estética Avançada',
          mainKeyword: 'Criomodelagem'
        }
      ]);
    }
  }, [isLoggedIn, projects.length]);

  if (!isLoggedIn) {
    return <LandingPage onStart={() => setIsLoggedIn(true)} />;
  }

  // Show onboarding after login but before main app
  if (!hasCompletedOnboarding) {
    return (
      <Onboarding
        onComplete={() => {
          setHasCompletedOnboarding(true);
          setActiveTab('hub'); // Go directly to Hub Central
        }}
      />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'hub':
        return <HubView />;
      case 'generator':
        return <ArticleGenerator />;
      case 'examples':
        return <ExploreExamples />;
      case 'autopilot':
        return <AutomationConfig />;
      case 'youtube':
        return <YoutubeConverter />;
      case 'stories':
        return <WebStoriesView />;
      case 'articles':
        return (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Seus Artigos Estratégicos</h2>
            <p className="text-slate-500 mt-2">O Hub Central está processando sua fila de autoridade.</p>
            <button 
              onClick={() => setActiveTab('generator')}
              className="mt-6 px-6 py-2 bg-indigo-900 text-white rounded-xl font-bold hover:bg-indigo-950 transition-all shadow-md"
            >
              Gerar Novo Artigo
            </button>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-slate-400">?</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Em Desenvolvimento</h2>
            <p className="text-slate-500 max-w-sm">Esta funcionalidade está sendo integrada ao Hub Central.</p>
          </div>
        );
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      credits={credits}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
