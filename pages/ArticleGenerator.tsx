import React, { useState, useEffect } from 'react';
import distributionService from '../services/distributionService';
import articleGenerationService from '../services/articleGenerationService';
import creditService from '../services/creditService';
import type { ArticleType } from '../types';

interface ArticleGeneratorProps {
  pillars: string[];
  selectedPillar?: string;
  onBackToHub: () => void;
  onCreditsUpdate?: () => void;
}

const ArticleGenerator: React.FC<ArticleGeneratorProps> = ({ 
  pillars, 
  selectedPillar, 
  onBackToHub,
  onCreditsUpdate 
}) => {
  const [topic, setTopic] = useState('');
  const [pillar, setPillar] = useState(selectedPillar || '');
  const [articleType, setArticleType] = useState<ArticleType>('autoridade-clinica');
  const [generatedContent, setGeneratedContent] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDistributing, setIsDistributing] = useState(false);
  const [distributionResults, setDistributionResults] = useState<any[]>([]);
  const [platforms, setPlatforms] = useState(distributionService.getPlatforms());
  const [generationError, setGenerationError] = useState<string>('');
  const [generationSuccess, setGenerationSuccess] = useState(false);
  const [apiConfigured, setApiConfigured] = useState(false);

  useEffect(() => {
    const status = articleGenerationService.getConfigStatus();
    setApiConfigured(status.configured);
  }, []);

  const togglePlatform = (platformId: string) => {
    distributionService.updatePlatformStatus(
      platformId, 
      !platforms.find(p => p.id === platformId)?.enabled
    );
    setPlatforms(distributionService.getPlatforms());
  };

  const handleGenerateArticle = async () => {
    if (!topic || !pillar) return;

    // Check credits
    if (!creditService.hasEnoughCredits(1)) {
      setGenerationError('Créditos insuficientes. Você precisa de 1 crédito para gerar um artigo.');
      return;
    }

    // Check if API is configured
    if (!apiConfigured) {
      setGenerationError('Configure sua chave API do Google Gemini no arquivo .env.local para gerar artigos reais.');
      return;
    }

    setIsGenerating(true);
    setGenerationError('');
    setGenerationSuccess(false);
    setGeneratedContent('');

    try {
      // Generate article using AI
      const result = await articleGenerationService.generateArticle({
        topic,
        pillar,
        articleType,
      });

      // Consume credit
      creditService.consumeForArticleGeneration();
      
      // Update content
      setGeneratedContent(result.content);
      setGenerationSuccess(true);
      
      // Notify parent to update credits display
      if (onCreditsUpdate) {
        onCreditsUpdate();
      }

      console.log(`✓ Artigo gerado: ${result.wordCount} palavras, SEO score: ${result.seoScore}`);
    } catch (error: any) {
      setGenerationError(error.message || 'Erro ao gerar artigo. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDistribute = async () => {
    if (!generatedContent) {
      setGenerationError('Gere um artigo primeiro antes de distribuir.');
      return;
    }

    setIsDistributing(true);
    setDistributionResults([]);

    const article = {
      title: topic,
      content: generatedContent,
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
              <option value="procedimento">Procedimento</option>
              <option value="autoridade_clinica">Autoridade Clínica</option>
              <option value="educativo">Educativo</option>
              <option value="gestao_estetica">Gestão Estética</option>
              <option value="tendencia_beleza">Tendência/Beleza</option>
              <option value="resenha_produto">Resenha de Produto</option>
            </select>
          </div>

          {/* Generation Error/Success Messages */}
          {generationError && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <p className="text-red-800 text-sm"><strong>❌ Erro:</strong> {generationError}</p>
            </div>
          )}

          {generationSuccess && (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
              <p className="text-green-800 text-sm"><strong>✓ Sucesso!</strong> Artigo gerado com sucesso. Role para baixo para ver o conteúdo ou distribua nas plataformas.</p>
            </div>
          )}

          {!apiConfigured && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <p className="text-blue-800 text-sm">
                <strong>ℹ️ Configuração necessária:</strong> Para gerar artigos reais, adicione sua chave API do Google Gemini no arquivo <code>.env.local</code>
              </p>
            </div>
          )}
          
          {/* Generation Button */}
          <button
            onClick={handleGenerateArticle}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!topic || (pillars.length > 0 && !pillar) || isGenerating || !apiConfigured}
          >
            {isGenerating ? '⏳ Gerando artigo...' : '✨ Gerar Artigo com Lucresia (1 crédito)'}
          </button>

          {/* Distribution Button - Only shown after generation */}
          {generatedContent && (
            <button
              onClick={handleDistribute}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-md disabled:opacity-50"
              disabled={isDistributing}
            >
              {isDistributing ? 'Distribuindo...' : '📤 Distribuir Multi-Canal (simulação)'}
            </button>
          )}
        </div>
      </div>

      {/* Generated Content Preview */}
      {generatedContent && (
        <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-4">📄 Artigo Gerado</h3>
          <div className="prose max-w-none">
            <div 
              className="text-slate-700 leading-relaxed whitespace-pre-wrap"
              style={{ maxHeight: '400px', overflowY: 'auto' }}
            >
              {generatedContent}
            </div>
          </div>
        </div>
      )}

      {/* Multi-Channel Distribution */}
      <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-4">📱 Distribuição Multi-Canal</h3>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
          <p className="text-sm text-amber-800">
            ⚠️ <strong>Modo de demonstração:</strong> A distribuição atual gera URLs simuladas. 
            Integração real com APIs do WordPress, Pinterest, LinkedIn e Instagram será implementada na fase Beta.
          </p>
        </div>

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
          <h3 className="text-xl font-bold text-slate-900 mb-4">✅ Resultados da Distribuição (Simulação)</h3>
          <div className="space-y-3">
            {distributionResults.map((result, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-lg border-2 ${
                  result.success 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {result.success ? '✓' : '✗'} {result.platform}
                    </p>
                    {result.success && result.publishedUrl && (
                      <p className="text-sm text-slate-600 mt-1">
                        <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded">
                          {result.publishedUrl}
                        </span>
                        <span className="ml-2 text-amber-600">(URL simulada)</span>
                      </p>
                    )}
                    {result.error && (
                      <p className="text-sm text-red-600 mt-1">{result.error}</p>
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
