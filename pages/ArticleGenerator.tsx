import React, { useState } from 'react';

const ArticleGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-900">Criar Artigo</h2>
      
      <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
        <div className="space-y-6">
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
            disabled={!topic}
          >
            Gerar Artigo com Lucresia
          </button>
        </div>
      </div>
      
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
        <p className="text-sm text-indigo-900">
          💡 <strong>Dica:</strong> Para melhores resultados, comece pelo Hub Central 
          para definir sua estratégia editorial antes de criar artigos individuais.
        </p>
      </div>
    </div>
  );
};

export default ArticleGenerator;
