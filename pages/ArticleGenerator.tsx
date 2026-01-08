
import React, { useState } from 'react';
import { Sparkles, Loader, CheckCircle, AlertCircle, Copy } from 'lucide-react';
import { ArticleType } from '../types';

const ArticleGenerator: React.FC = () => {
  const [formData, setFormData] = useState({
    keyword: '',
    articleType: ArticleType.PROCEDURE,
    tone: 'professional',
    language: 'pt-BR',
    wordCount: '1500'
  });
  
  const [generating, setGenerating] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const articleTypes = [
    { value: ArticleType.PROCEDURE, label: 'Procedimento' },
    { value: ArticleType.AUTHORITY, label: 'Autoridade Clínica' },
    { value: ArticleType.EDUCATIONAL, label: 'Educativo' },
    { value: ArticleType.MANAGEMENT, label: 'Gestão Estética' },
    { value: ArticleType.NEWS, label: 'Tendência de Beleza' },
    { value: ArticleType.REVIEW, label: 'Resenha de Produto' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    setError('');
    setSuccess(false);
    setGeneratedArticle('');

    try {
      // Import Gemini AI dynamically
      const { GoogleGenerativeAI } = await import('@google/genai');
      
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (globalThis as any).process?.env?.GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error('Gemini API key não configurada. Configure GEMINI_API_KEY no arquivo .env.local');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `
Você é um especialista em marketing de conteúdo para clínicas estéticas. 
Crie um artigo completo e otimizado para SEO sobre: "${formData.keyword}"

Tipo de artigo: ${formData.articleType}
Tom: ${formData.tone}
Tamanho aproximado: ${formData.wordCount} palavras
Idioma: ${formData.language}

O artigo deve:
1. Ter um título atrativo e otimizado para SEO
2. Incluir uma introdução envolvente
3. Ter pelo menos 5 seções com subtítulos (H2 e H3)
4. Incluir informações técnicas precisas
5. Ter um CTA (call-to-action) no final
6. Usar palavras-chave naturalmente
7. Ser formatado em Markdown

Retorne APENAS o artigo em Markdown, sem explicações adicionais.
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setGeneratedArticle(text);
      setSuccess(true);
    } catch (err: any) {
      console.error('Erro ao gerar artigo:', err);
      setError(err.message || 'Erro ao gerar artigo. Tente novamente.');
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedArticle);
    alert('Artigo copiado para a área de transferência!');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-3 mb-2">
          <Sparkles className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-slate-900">Gerador de Artigos IA</h2>
        </div>
        <p className="text-slate-600">Crie artigos otimizados para SEO em segundos usando IA avançada.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Palavra-chave Principal *
              </label>
              <input
                type="text"
                required
                value={formData.keyword}
                onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
                placeholder="Ex: Criomodelagem, Harmonização Facial..."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tipo de Artigo *
              </label>
              <select
                value={formData.articleType}
                onChange={(e) => setFormData({ ...formData, articleType: e.target.value as ArticleType })}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {articleTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tom do Artigo
              </label>
              <select
                value={formData.tone}
                onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="professional">Profissional</option>
                <option value="casual">Casual</option>
                <option value="technical">Técnico</option>
                <option value="conversational">Conversacional</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tamanho do Artigo
              </label>
              <select
                value={formData.wordCount}
                onChange={(e) => setFormData({ ...formData, wordCount: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="800">Curto (~800 palavras)</option>
                <option value="1500">Médio (~1500 palavras)</option>
                <option value="2500">Longo (~2500 palavras)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={generating}
              className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {generating ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Gerando Artigo...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Gerar Artigo</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Preview do Artigo</h3>
            {generatedArticle && (
              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span>Copiar</span>
              </button>
            )}
          </div>

          <div className="min-h-[500px] max-h-[600px] overflow-y-auto">
            {error && (
              <div className="flex items-start space-x-3 p-4 bg-rose-50 border border-rose-200 rounded-xl">
                <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-rose-900">Erro</p>
                  <p className="text-sm text-rose-700">{error}</p>
                </div>
              </div>
            )}

            {success && !error && (
              <div className="flex items-start space-x-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl mb-4">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-emerald-900">Artigo gerado com sucesso!</p>
                  <p className="text-sm text-emerald-700">Você pode copiar e editar conforme necessário.</p>
                </div>
              </div>
            )}

            {generatedArticle ? (
              <div className="prose prose-slate max-w-none">
                <div 
                  className="text-slate-700 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ 
                    __html: generatedArticle
                      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4 text-slate-900">$1</h1>')
                      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mb-3 mt-6 text-slate-900">$1</h2>')
                      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mb-2 mt-4 text-slate-900">$1</h3>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                      .replace(/\n\n/g, '</p><p class="mb-4">')
                      .replace(/^(?!<[hH]|<p)/gm, '<p class="mb-4">')
                  }}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500">Preencha o formulário e clique em "Gerar Artigo"</p>
                <p className="text-sm text-slate-400 mt-2">O artigo aparecerá aqui</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleGenerator;
