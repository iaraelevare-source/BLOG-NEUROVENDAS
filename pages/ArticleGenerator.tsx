import React, { useState } from 'react';
import { Sparkles, FileText, Target, Wand2 } from 'lucide-react';
import { ArticleType } from '../types';
import { toast } from '../utils/toast';

const ArticleGenerator: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [articleType, setArticleType] = useState<ArticleType>(ArticleType.PROCEDURE);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('Artigo gerado com sucesso! Verifique o Hub Central.');
    }, 2000);
  };

  const articleTypes = [
    { value: ArticleType.PROCEDURE, label: 'Procedimento', description: 'Artigo técnico sobre tratamentos' },
    { value: ArticleType.AUTHORITY, label: 'Autoridade Clínica', description: 'Estabeleça expertise e credibilidade' },
    { value: ArticleType.EDUCATIONAL, label: 'Educativo', description: 'Eduque seu público sobre o tema' },
    { value: ArticleType.MANAGEMENT, label: 'Gestão Estética', description: 'Conteúdo sobre gestão de clínicas' },
    { value: ArticleType.NEWS, label: 'Tendência', description: 'Novidades e tendências do setor' },
    { value: ArticleType.REVIEW, label: 'Resenha', description: 'Análise de produtos e técnicas' },
  ];

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Gerador de Artigos</h1>
        <p className="text-slate-500 mt-2">Crie conteúdo otimizado com IA em segundos</p>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Keyword Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <Target className="w-4 h-4 inline mr-2" />
            Palavra-chave Principal
          </label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Ex: harmonização facial"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Article Type Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            <FileText className="w-4 h-4 inline mr-2" />
            Tipo de Artigo
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articleTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setArticleType(type.value)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  articleType === type.value
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <p className="font-medium text-slate-900">{type.label}</p>
                <p className="text-sm text-slate-500 mt-1">{type.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!keyword || isGenerating}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Gerando...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Gerar Artigo com IA
            </>
          )}
        </button>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
        <div className="flex items-start gap-4">
          <Sparkles className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Geração Inteligente</h3>
            <p className="text-slate-600 text-sm">
              Nossa IA cria artigos otimizados para SEO, com estrutura profissional, 
              palavras-chave estratégicas e conteúdo relevante para seu nicho.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleGenerator;
