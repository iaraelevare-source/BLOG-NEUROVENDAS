import React from 'react';
import { TrendingUp, FileText, CheckCircle, Clock, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard: React.FC = () => {
  // Sample data for the chart
  const data = [
    { month: 'Jan', artigos: 12 },
    { month: 'Fev', artigos: 15 },
    { month: 'Mar', artigos: 18 },
    { month: 'Abr', artigos: 14 },
    { month: 'Mai', artigos: 16 },
    { month: 'Jun', artigos: 20 },
  ];

  const stats = [
    { label: 'Artigos Publicados', value: '95', icon: CheckCircle, color: 'emerald' },
    { label: 'Em Produção', value: '12', icon: Clock, color: 'amber' },
    { label: 'Tráfego Mensal', value: '24.5K', icon: TrendingUp, color: 'indigo' },
    { label: 'Taxa de Conversão', value: '3.2%', icon: BarChart3, color: 'purple' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-2">Visão geral do seu hub de conteúdo</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${stat.color}-50`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
              <p className="text-slate-500 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Produção Mensal</h2>
            <p className="text-slate-500 text-sm mt-1">Artigos publicados por mês</p>
          </div>
          <FileText className="w-6 h-6 text-indigo-600" />
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="artigos" fill="#4f46e5" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Atividade Recente</h2>
        <div className="space-y-4">
          {[
            { action: 'Artigo publicado', title: 'Harmonização Facial: Guia Completo', time: '2h atrás' },
            { action: 'Artigo otimizado', title: 'Preenchimento Labial: Tudo que Você Precisa Saber', time: '5h atrás' },
            { action: 'Artigo gerado', title: 'Botox: Benefícios e Indicações', time: '1 dia atrás' },
          ].map((activity, index) => (
            <div key={index} className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0">
              <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2"></div>
              <div className="flex-1">
                <p className="text-slate-900 font-medium">{activity.action}</p>
                <p className="text-slate-600 text-sm">{activity.title}</p>
              </div>
              <span className="text-slate-400 text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
