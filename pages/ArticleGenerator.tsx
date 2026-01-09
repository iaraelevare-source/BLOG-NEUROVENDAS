import React, { useState } from 'react';

interface ArticleGeneratorProps {
  pillars: string[];
  selectedPillar?: string;
  onBackToHub: () => void;
}

const ArticleGenerator: React.FC<ArticleGeneratorProps> = ({ 
  pillars, 
  selectedPillar, 
  onBackToHub 
}) => {
  const [topic, setTopic] = useState('');
  const [pillar, setPillar] = useState(selectedPillar || '');
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBackToHub}
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          ← Voltar ao Hub
        </button>
        <h2 className="text-3xl font-bold text-slate-900">Criar Artigo</h2>
      </div>

      {pillars.length === 0 && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
          <h3 className="font-bold text-amber-900 mb-2">⚠️ Configure Seus Pilares Primeiro</h3>
          <p className="text-amber-800 mb-4">
            Para criar artigos estratégicos que constroem autoridade, você precisa primeiro 
            definir seus pilares no Hub Central.
          </p>
          <button
            onClick={onBackToHub}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-700 transition-all"
          >
            Ir para Hub Central
          </button>
        </div>
      )}
      
      <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
        <div className="space-y-6">
          {pillars.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="block text-sm font-semibold text-slate-900">
                  Pilar de Autoridade
                </label>
                <div className="relative">
                  <button
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="w-5 h-5 bg-indigo-100 text-indigo-700 rounded-full text-xs flex items-center justify-center cursor-help"
                  >
                    ?
                  </button>
                  {showTooltip && (
                    <div className="absolute left-full ml-2 top-0 w-64 bg-slate-900 text-white text-xs rounded-lg p-3 shadow-xl z-10">
                      <p>Escolha o pilar que este artigo deve fortalecer. Artigos vinculados a pilares constroem autoridade de forma mais eficaz.</p>
                    </div>
                  )}
                </div>
              </div>
              <select 
                value={pillar}
                onChange={(e) => setPillar(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Selecione um pilar...</option>
                {pillars.map((p, i) => (
                  <option key={i} value={p}>{p}</option>
                ))}
              </select>
              {pillar && (
                <p className="text-sm text-indigo-600 mt-2">
                  ✓ Este artigo fortalecerá: <strong>{pillar}</strong>
                </p>
              )}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Tópico do Artigo
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ex: Harmonização facial com ácido hialurônico"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Tipo de Artigo
            </label>
            <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <option value="autoridade_clinica">Autoridade Clínica</option>
              <option value="procedimento">Procedimento</option>
              <option value="educativo">Educativo</option>
              <option value="gestao_estetica">Gestão Estética</option>
              <option value="tendencia_beleza">Tendência Beleza</option>
              <option value="resenha_produto">Resenha Produto</option>
            </select>
          </div>
          
          <button
            className="w-full bg-indigo-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-950 transition-all shadow-md disabled:opacity-50"
            disabled={!topic || (pillars.length > 0 && !pillar)}
          >
            Gerar Artigo com Lucresia
          </button>
        </div>
      </div>
      
      {pillars.length > 0 && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <h3 className="font-semibold text-indigo-900 mb-2">🤖 Recomendação Lucresia</h3>
          <p className="text-sm text-indigo-800">
            {pillar 
              ? `Ótima escolha! Criar conteúdo sobre "${pillar}" fortalecerá sua autoridade nessa área específica.`
              : 'Selecione um pilar para receber recomendações personalizadas de Lucresia sobre como posicionar este artigo estrategicamente.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ArticleGenerator;
