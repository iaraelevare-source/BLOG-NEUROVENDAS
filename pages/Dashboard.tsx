import React, { useEffect, useState } from 'react';
import analyticsService from '../services/analyticsService';
import type { DashboardMetrics } from '../services/analyticsService';

interface DashboardProps {
  pillars: string[];
  onNavigateToHub?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ pillars, onNavigateToHub }) => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simula carregamento de dados
    setLoading(true);
    setTimeout(() => {
      const dashboardData = analyticsService.getDashboardMetrics(pillars);
      setMetrics(dashboardData);
      setLoading(false);
    }, 500);
  }, [pillars]);
  
  if (loading || !metrics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  const { overview, pillars: pillarMetrics, articles, alerts, recommendations } = metrics;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-900">Dashboard de Autoridade</h2>
        <button 
          onClick={() => analyticsService.simulateGrowth()}
          className="text-sm px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
          title="Simular crescimento (demo)"
        >
          🔄 Atualizar Métricas
        </button>
      </div>
      
      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-600 mb-2">Taxa de Autoridade</h3>
          <p className="text-4xl font-bold text-indigo-900 mb-1">
            {overview.authorityRate}%
          </p>
          <div className="flex items-center gap-2">
            {overview.growthRate >= 0 ? (
              <span className="text-xs text-green-600 font-medium">↑ {overview.growthRate}%</span>
            ) : (
              <span className="text-xs text-red-600 font-medium">↓ {Math.abs(overview.growthRate)}%</span>
            )}
            <span className="text-xs text-slate-500">vs período anterior</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-600 mb-2">Artigos Publicados</h3>
          <p className="text-4xl font-bold text-indigo-900 mb-1">{overview.totalArticles}</p>
          <p className="text-xs text-slate-500">Total acumulado</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-600 mb-2">Total de Visualizações</h3>
          <p className="text-4xl font-bold text-indigo-900 mb-1">
            {overview.totalViews.toLocaleString('pt-BR')}
          </p>
          <p className="text-xs text-slate-500">Todos os artigos</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-600 mb-2">Engajamento Médio</h3>
          <p className="text-4xl font-bold text-indigo-900 mb-1">{overview.avgEngagement}%</p>
          <p className="text-xs text-slate-500">Taxa de interação</p>
        </div>
      </div>


      {/* Alertas Estratégicos */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-slate-900">🔔 Alertas Estratégicos</h3>
          {alerts.slice(0, 3).map(alert => (
            <div 
              key={alert.id}
              className={`rounded-xl p-4 border-2 ${
                alert.type === 'urgent' ? 'bg-red-50 border-red-300' :
                alert.type === 'warning' ? 'bg-amber-50 border-amber-300' :
                alert.type === 'success' ? 'bg-green-50 border-green-300' :
                'bg-blue-50 border-blue-300'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className={`font-bold mb-1 ${
                    alert.type === 'urgent' ? 'text-red-900' :
                    alert.type === 'warning' ? 'text-amber-900' :
                    alert.type === 'success' ? 'text-green-900' :
                    'text-blue-900'
                  }`}>
                    {alert.title}
                  </h4>
                  <p className={`text-sm mb-2 ${
                    alert.type === 'urgent' ? 'text-red-800' :
                    alert.type === 'warning' ? 'text-amber-800' :
                    alert.type === 'success' ? 'text-green-800' :
                    'text-blue-800'
                  }`}>
                    {alert.description}
                  </p>
                  <p className={`text-xs font-medium ${
                    alert.type === 'urgent' ? 'text-red-700' :
                    alert.type === 'warning' ? 'text-amber-700' :
                    alert.type === 'success' ? 'text-green-700' :
                    'text-blue-700'
                  }`}>
                    → {alert.action}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                  alert.priority === 'alta' ? 'bg-red-200 text-red-900' :
                  alert.priority === 'média' ? 'bg-amber-200 text-amber-900' :
                  'bg-slate-200 text-slate-900'
                }`}>
                  {alert.priority.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Performance por Pilar */}
      {pillarMetrics.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-4">📊 Performance por Pilar</h3>
          <div className="space-y-4">
            {pillarMetrics.map(pillar => (
              <div key={pillar.name} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-slate-900">{pillar.name}</h4>
                    <p className="text-sm text-slate-600">
                      {pillar.articlesCount} artigo{pillar.articlesCount !== 1 ? 's' : ''} · {pillar.totalViews} views
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    pillar.trend === 'ascending' ? 'bg-green-100 text-green-800' :
                    pillar.trend === 'stable' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {pillar.trend === 'ascending' ? '↗ Crescendo' :
                     pillar.trend === 'stable' ? '→ Estável' :
                     '↘ Declínio'}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-indigo-900">{pillar.authorityScore}</p>
                    <p className="text-xs text-slate-600">Autoridade</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-indigo-900">{pillar.avgEngagement}%</p>
                    <p className="text-xs text-slate-600">Engajamento</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-indigo-900">{pillar.recommendedFrequency}</p>
                    <p className="text-xs text-slate-600">Frequência ideal</p>
                  </div>
                </div>
                
                {pillar.lastArticleDate && (
                  <p className="text-xs text-slate-500 mt-3">
                    Último artigo: {new Date(pillar.lastArticleDate).toLocaleDateString('pt-BR')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Artigos Recentes */}
      {articles.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-4">📝 Artigos Publicados</h3>
          <div className="space-y-3">
            {articles.slice(0, 5).map(article => (
              <div key={article.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{article.title}</p>
                  <p className="text-xs text-slate-600">
                    {article.pillar} · {new Date(article.publishedDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="flex gap-4 text-right">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{article.views}</p>
                    <p className="text-xs text-slate-600">views</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{article.engagement}%</p>
                    <p className="text-xs text-slate-600">engajamento</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{article.seoScore}</p>
                    <p className="text-xs text-slate-600">SEO</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Recomendações Lucresia */}
      <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl p-6 border border-indigo-200 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
            🤖
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Recomendações Estratégicas Lucresia
            </h3>
            {recommendations.length > 0 ? (
              <ul className="space-y-2">
                {recommendations.map((rec, index) => (
                  <li key={index} className="text-slate-700 flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">→</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-700">
                Configure seus pilares no Hub Central para começar a receber análises estratégicas.
              </p>
            )}
          </div>
        </div>
      </div>
      
      {pillars.length === 0 && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-amber-900 mb-2">
            🎯 Comece Definindo Seus Pilares
          </h3>
          <p className="text-amber-800 mb-4">
            Para construir autoridade de forma estratégica, você precisa primeiro definir 
            seus pilares no Hub Central. Pilares são os temas principais que representam sua expertise.
          </p>
          <button 
            onClick={onNavigateToHub}
            className="inline-block bg-amber-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-amber-700 transition-all"
          >
            Ir para Hub Central →
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
