import React from 'react';

const HubView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-900">Hub Central</h2>
        <button className="bg-indigo-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-950 transition-all shadow-md">
          Novo Planejamento
        </button>
      </div>
      
      <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">
          Calendário Editorial Estratégico
        </h3>
        <p className="text-slate-600 mb-6">
          O Hub Central é o coração da sua estratégia de autoridade. 
          Aqui você define pilares editoriais, planeja conteúdo e acompanha o progresso.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="border border-slate-200 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 mb-2">Pilares de Autoridade</h4>
            <p className="text-sm text-slate-600">Defina 3-5 temas principais</p>
          </div>
          
          <div className="border border-slate-200 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 mb-2">Artigos Planejados</h4>
            <p className="text-sm text-slate-600">0 artigos no calendário</p>
          </div>
          
          <div className="border border-slate-200 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 mb-2">Recomendações Lucresia</h4>
            <p className="text-sm text-slate-600">Configure para ver análises</p>
          </div>
          
          <div className="border border-slate-200 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 mb-2">Distribuição</h4>
            <p className="text-sm text-slate-600">Multi-canal configurável</p>
          </div>
        </div>
        
        <div className="bg-slate-50 rounded-lg p-4">
          <p className="text-sm text-slate-700">
            <strong>Próximo passo:</strong> Configure seu perfil de clínica e defina seus objetivos 
            para que Lucresia possa analisar oportunidades de autoridade no seu nicho.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HubView;
