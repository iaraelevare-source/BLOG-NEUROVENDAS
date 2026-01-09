import React, { useState } from 'react';
import distributionService from '../services/distributionService';
import type { ArticleType } from '../types';

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
  const [articleType, setArticleType] = useState<ArticleType>('autoridade-clinica');
  const [content, setContent] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDistributing, setIsDistributing] = useState(false);
  const [distributionResults, setDistributionResults] = useState<any[]>([]);
  const [platforms, setPlatforms] = useState(distributionService.getPlatforms());

  const togglePlatform = (platformId: string) => {
    distributionService.updatePlatformStatus(
      platformId, 
      !platforms.find(p => p.id === platformId)?.enabled
    );
    setPlatforms(distributionService.getPlatforms());
  };

  const handleGenerateAndDistribute = async () => {
    if (!topic) return;

    setIsDistributing(true);
    setDistributionResults([]);

    // Simulate article generation
    await new Promise(resolve => setTimeout(resolve, 1500));

    const article = {
      title: topic,
      content: content || `Conteúdo detalhado sobre ${topic}. Este artigo foi criado para fortalecer o pilar "${pillar}" e construir autoridade no seu nicho.`,
      pillar,
      type: articleType,
    };

    // Distribute to all enabled platforms
    const results = await distributionService.distributeToAll(article);
    setDistributionResults(results);
    setIsDistributing(false);
  };
  
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
      
      {/* Article Form */}
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
            <select 
              value={articleType}
              onChange={(e) => setArticleType(e.target.value as ArticleType)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="autoridade-clinica">Autoridade Clínica</option>
              <option value="educacao-paciente">Educação do Paciente</option>
              <option value="caso-sucesso">Caso de Sucesso</option>
              <option value="procedimento-guia">Guia de Procedimento</option>
              <option value="tendencia">Tendência</option>
              <option value="faq">FAQ</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Conteúdo (Opcional - para pré-visualização)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Cole o conteúdo do artigo aqui para pré-visualizar adaptação multi-canal..."
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={handleGenerateAndDistribute}
            className="w-full bg-indigo-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-950 transition-all shadow-md disabled:opacity-50"
            disabled={!topic || (pillars.length > 0 && !pillar) || isDistributing}
          >
            {isDistributing ? 'Distribuindo...' : 'Gerar e Distribuir Multi-Canal'}
          </button>
        </div>
      </div>

      {/* Multi-Channel Distribution */}
      <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-4">📱 Distribuição Multi-Canal</h3>
        <p className="text-sm text-slate-600 mb-6">
          Configure em quais plataformas este artigo será publicado automaticamente.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {platforms.map((platform) => (
            <div 
              key={platform.id}
              className={`border-2 rounded-xl p-4 transition-all ${
                platform.enabled 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{platform.icon}</span>
                  <span className="font-semibold text-slate-900">{platform.name}</span>
                </div>
                <button
                  onClick={() => togglePlatform(platform.id)}
                  className={`px-4 py-1 rounded-lg text-sm font-semibold transition-all ${
                    platform.enabled
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-slate-300 text-slate-700 hover:bg-slate-400'
                  }`}
                >
                  {platform.enabled ? 'Ativo' : 'Inativo'}
                </button>
              </div>
              <p className="text-xs text-slate-600">
                {platform.imageRequired && '🖼️ Imagem obrigatória · '}
                {platform.hashtags && '#️⃣ Suporta hashtags'}
              </p>
            </div>
          ))}
        </div>

        {distributionService.getEnabledPlatforms().length === 0 && (
          <p className="text-sm text-amber-600 mt-4 text-center">
            ⚠️ Ative pelo menos uma plataforma para distribuição
          </p>
        )}
      </div>

      {/* Distribution Results */}
      {distributionResults.length > 0 && (
        <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-4">✅ Resultados da Distribuição</h3>
          <div className="space-y-3">
            {distributionResults.map((result, idx) => (
              <div 
                key={idx}
                className={`border-2 rounded-lg p-4 ${
                  result.success 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {result.success ? '✓' : '✗'} {result.platform}
                    </p>
                    {result.publishedUrl && (
                      <a 
                        href={result.publishedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:underline"
                      >
                        {result.publishedUrl}
                      </a>
                    )}
                    {result.error && (
                      <p className="text-sm text-red-600">{result.error}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Lucresia Recommendation */}
      {pillars.length > 0 && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <h3 className="font-semibold text-indigo-900 mb-2">🤖 Recomendação Lucresia</h3>
          <p className="text-sm text-indigo-800">
            {pillar 
              ? `Ótima escolha! Criar conteúdo sobre "${pillar}" fortalecerá sua autoridade nessa área específica. A distribuição multi-canal amplificará seu alcance em ${distributionService.getEnabledPlatforms().length} plataforma(s).`
              : 'Selecione um pilar para receber recomendações personalizadas de Lucresia sobre como posicionar este artigo estrategicamente.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ArticleGenerator;
