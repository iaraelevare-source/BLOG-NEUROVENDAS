import React from 'react';

const AutomationConfig: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-900">Autopilot</h2>
      
      <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🤖</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Automação Editorial
          </h3>
          <p className="text-slate-600 max-w-md mx-auto mb-6">
            Configure a publicação automática de artigos baseada na sua estratégia do Hub Central.
          </p>
        </div>
        
        <div className="space-y-4 max-w-lg mx-auto">
          <div className="border border-slate-200 rounded-lg p-4">
            <label className="flex items-center justify-between">
              <span className="font-semibold text-slate-900">Autopilot Ativo</span>
              <input type="checkbox" className="w-5 h-5" />
            </label>
          </div>
          
          <div className="border border-slate-200 rounded-lg p-4">
            <label className="block font-semibold text-slate-900 mb-2">
              Frequência de Publicação
            </label>
            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg">
              <option>Diária</option>
              <option>Semanal</option>
              <option>Personalizada</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationConfig;
