import React from 'react';

const WebStoriesView: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-900">Web Stories</h2>
      
      <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📱</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Web Stories para Google Discover
          </h3>
          <p className="text-slate-600 max-w-md mx-auto mb-6">
            Crie Web Stories otimizadas automaticamente a partir dos seus artigos 
            para alcançar mais pacientes no Google Discover.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-slate-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-2">✨</div>
            <h4 className="font-semibold text-slate-900 mb-1">Automático</h4>
            <p className="text-sm text-slate-600">Gerado do artigo</p>
          </div>
          
          <div className="border border-slate-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-2">🎨</div>
            <h4 className="font-semibold text-slate-900 mb-1">Visual</h4>
            <p className="text-sm text-slate-600">Design profissional</p>
          </div>
          
          <div className="border border-slate-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-2">📊</div>
            <h4 className="font-semibold text-slate-900 mb-1">Otimizado</h4>
            <p className="text-sm text-slate-600">Para engajamento</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebStoriesView;
