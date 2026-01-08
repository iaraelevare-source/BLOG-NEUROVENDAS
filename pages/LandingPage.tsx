
import React from 'react';
import { Zap, FileText, Target, TrendingUp, Sparkles, Clock } from 'lucide-react';
import { APP_NAME, APP_SLOGAN } from '../constants';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const features = [
    {
      icon: Sparkles,
      title: 'IA Avançada',
      description: 'Powered by Google Gemini para conteúdo de alta qualidade'
    },
    {
      icon: Target,
      title: 'SEO Otimizado',
      description: 'Artigos otimizados para ranquear no Google'
    },
    {
      icon: Clock,
      title: 'Automação Total',
      description: 'Publicação automática em WordPress e outras plataformas'
    },
    {
      icon: TrendingUp,
      title: 'Análise de Performance',
      description: 'Dashboard completo com métricas de engajamento'
    },
    {
      icon: FileText,
      title: 'Multi-formato',
      description: 'Blog posts, Web Stories, posts sociais e mais'
    },
    {
      icon: Zap,
      title: 'Rápido e Eficiente',
      description: 'Gere artigos completos em menos de 2 minutos'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-8">
            <Zap className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {APP_NAME}
          </h1>
          
          <p className="text-xl md:text-2xl text-indigo-200 mb-8 max-w-3xl mx-auto">
            {APP_SLOGAN}
          </p>
          
          <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto">
            Transforme sua estratégia de conteúdo com IA. Gere artigos otimizados para SEO,
            agende publicações e acompanhe resultados - tudo em uma plataforma.
          </p>
          
          <button
            onClick={onStart}
            className="group relative inline-flex items-center space-x-3 px-8 py-4 bg-white text-indigo-900 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-2xl hover:shadow-indigo-500/50 hover:scale-105"
          >
            <Sparkles className="w-6 h-6" />
            <span>Começar Agora</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative bg-white/5 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Tudo que você precisa para dominar o marketing de conteúdo
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all hover:scale-105"
                >
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-indigo-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-300">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="text-5xl font-bold text-white mb-2">180+</div>
              <div className="text-slate-300">Artigos por Ano</div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="text-5xl font-bold text-white mb-2">&lt;2min</div>
              <div className="text-slate-300">Tempo de Geração</div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="text-5xl font-bold text-white mb-2">100%</div>
              <div className="text-slate-300">Otimizado para SEO</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
