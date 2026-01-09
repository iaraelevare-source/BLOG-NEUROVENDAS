import React from 'react';

const ExploreExamples: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-900">Explorar Exemplos</h2>
      
      <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">📚</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          Biblioteca de Exemplos
        </h3>
        <p className="text-slate-600 max-w-md mx-auto">
          Explore artigos de exemplo otimizados para diferentes tipos de procedimentos estéticos.
          Esta funcionalidade está em desenvolvimento.
        </p>
      </div>
    </div>
  );
};

export default ExploreExamples;
