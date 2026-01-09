import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Artigos Publicados</h3>
          <p className="text-4xl font-bold text-indigo-900">0</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Artigos Planejados</h3>
          <p className="text-4xl font-bold text-indigo-900">0</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Taxa de Autoridade</h3>
          <p className="text-4xl font-bold text-indigo-900">0%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">Bem-vindo ao Elevare Editorial AI</h3>
        <p className="text-slate-600">
          Sistema de decisão editorial estratégica para clínicas estéticas. 
          Configure seu primeiro projeto no Hub Central para começar.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
