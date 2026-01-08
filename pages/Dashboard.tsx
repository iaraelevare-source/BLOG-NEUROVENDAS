
import React from 'react';
import { TrendingUp, FileText, Clock, Target, BarChart3, Zap } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      icon: FileText,
      label: 'Artigos Gerados',
      value: '42',
      change: '+12%',
      changeType: 'positive'
    },
    {
      icon: Target,
      label: 'Taxa de Conversão',
      value: '3.2%',
      change: '+0.8%',
      changeType: 'positive'
    },
    {
      icon: TrendingUp,
      label: 'Tráfego Orgânico',
      value: '12.5K',
      change: '+24%',
      changeType: 'positive'
    },
    {
      icon: Clock,
      label: 'Tempo Economizado',
      value: '86h',
      change: '+18h',
      changeType: 'positive'
    }
  ];

  const recentArticles = [
    {
      id: 1,
      title: 'Como a Criomodelagem Revoluciona a Estética Corporal',
      status: 'Publicado',
      views: '1.2K',
      date: '2 dias atrás',
      seoScore: 95
    },
    {
      id: 2,
      title: 'Harmonização Facial: Guia Completo para Iniciantes',
      status: 'Agendado',
      views: '-',
      date: 'Amanhã',
      seoScore: 92
    },
    {
      id: 3,
      title: 'Top 10 Procedimentos Estéticos para 2026',
      status: 'Publicado',
      views: '3.5K',
      date: '5 dias atrás',
      seoScore: 88
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Bem-vindo de volta! 👋</h2>
            <p className="text-indigo-200">Sua máquina de conteúdo está funcionando perfeitamente.</p>
          </div>
          <div className="hidden md:block">
            <Zap className="w-20 h-20 text-indigo-300 opacity-50" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Articles */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Artigos Recentes</h3>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
              Ver todos
            </button>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {recentArticles.map((article) => (
            <div key={article.id} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-2">{article.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      article.status === 'Publicado' 
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {article.status}
                    </span>
                    <span>👁 {article.views}</span>
                    <span>📅 {article.date}</span>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-2xl font-bold text-indigo-600">{article.seoScore}</div>
                  <div className="text-xs text-slate-500">SEO Score</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <button className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-6 text-left hover:shadow-lg transition-shadow">
          <FileText className="w-8 h-8 mb-3 opacity-80" />
          <h3 className="font-bold text-lg mb-1">Gerar Artigo</h3>
          <p className="text-sm text-indigo-100">Crie um novo artigo com IA</p>
        </button>
        
        <button className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-2xl p-6 text-left hover:shadow-lg transition-shadow">
          <BarChart3 className="w-8 h-8 mb-3 opacity-80" />
          <h3 className="font-bold text-lg mb-1">Ver Relatórios</h3>
          <p className="text-sm text-emerald-100">Análise de performance</p>
        </button>
        
        <button className="bg-gradient-to-br from-orange-600 to-rose-600 text-white rounded-2xl p-6 text-left hover:shadow-lg transition-shadow">
          <Target className="w-8 h-8 mb-3 opacity-80" />
          <h3 className="font-bold text-lg mb-1">Configurar SEO</h3>
          <p className="text-sm text-orange-100">Otimize suas palavras-chave</p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
