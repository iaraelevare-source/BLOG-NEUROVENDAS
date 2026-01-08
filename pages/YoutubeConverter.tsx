
import React, { useState } from 'react';
import { Youtube, Loader, FileText, Download } from 'lucide-react';

const YoutubeConverter: React.FC = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [converting, setConverting] = useState(false);
  const [convertedArticle, setConvertedArticle] = useState('');
  const [error, setError] = useState('');

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    setConverting(true);
    setError('');
    setConvertedArticle('');

    try {
      // Simulate conversion - in a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setConvertedArticle(`# Artigo Convertido do YouTube

## Introdução
Este é um artigo gerado automaticamente a partir do vídeo do YouTube.

## Principais Pontos
- Ponto 1: Informação relevante do vídeo
- Ponto 2: Outro insight importante
- Ponto 3: Conclusão e próximos passos

## Conclusão
Artigo convertido com sucesso!`);
    } catch (err: any) {
      setError('Erro ao converter vídeo. Verifique a URL e tente novamente.');
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-3 mb-2">
          <Youtube className="w-6 h-6 text-rose-600" />
          <h2 className="text-2xl font-bold text-slate-900">Conversor YouTube para Artigo</h2>
        </div>
        <p className="text-slate-600">Transforme vídeos do YouTube em artigos otimizados para SEO</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <form onSubmit={handleConvert} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                URL do Vídeo YouTube
              </label>
              <input
                type="url"
                required
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={converting}
              className="w-full px-6 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {converting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Convertendo...</span>
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5" />
                  <span>Converter em Artigo</span>
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-rose-50 border border-rose-200 rounded-xl">
              <p className="text-sm text-rose-700">{error}</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Artigo Convertido</h3>
          <div className="min-h-[400px] max-h-[600px] overflow-y-auto">
            {convertedArticle ? (
              <div className="prose prose-slate max-w-none">
                <pre className="whitespace-pre-wrap text-slate-700">{convertedArticle}</pre>
                <button className="mt-4 flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  <Download className="w-4 h-4" />
                  <span>Baixar Artigo</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <Youtube className="w-16 h-16 text-slate-300 mb-4" />
                <p className="text-slate-500">Cole uma URL do YouTube e clique em converter</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeConverter;
