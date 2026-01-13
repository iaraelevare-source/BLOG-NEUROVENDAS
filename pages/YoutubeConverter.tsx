import React, { useState } from 'react';
import { Youtube, Link as LinkIcon, Wand2, Download } from 'lucide-react';
import { toast } from '../utils/toast';

const YoutubeConverter: React.FC = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isConverting, setIsConverting] = useState(false);

  const handleConvert = async () => {
    if (!youtubeUrl) return;
    
    setIsConverting(true);
    // Simulate conversion
    setTimeout(() => {
      setIsConverting(false);
      toast.success('Vídeo convertido em artigo com sucesso!');
    }, 3000);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Conversor YouTube</h1>
        <p className="text-slate-500 mt-2">Transforme vídeos do YouTube em artigos otimizados</p>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
          <Youtube className="w-6 h-6 text-indigo-600" />
          <div>
            <p className="font-medium text-slate-900">Como funciona?</p>
            <p className="text-sm text-slate-600">
              Cole a URL de um vídeo do YouTube e nossa IA criará um artigo completo baseado no conteúdo
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <LinkIcon className="w-4 h-4 inline mr-2" />
            URL do Vídeo
          </label>
          <input
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={handleConvert}
          disabled={!youtubeUrl || isConverting}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {isConverting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Convertendo...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Converter em Artigo
            </>
          )}
        </button>
      </div>

      {/* Recent Conversions */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Conversões Recentes</h2>
        <div className="space-y-4">
          {[
            { title: 'Técnicas de Harmonização Facial', date: '2 dias atrás', status: 'Completo' },
            { title: 'Cuidados Pós Botox', date: '5 dias atrás', status: 'Completo' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <Youtube className="w-5 h-5 text-rose-600" />
                <div>
                  <p className="font-medium text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-500">{item.date}</p>
                </div>
              </div>
              <button className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2 text-sm font-medium">
                <Download className="w-4 h-4" />
                Baixar
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-rose-50 to-purple-50 rounded-2xl p-6 border border-rose-100">
        <h3 className="font-semibold text-slate-900 mb-2">💡 Dica Profissional</h3>
        <p className="text-slate-600 text-sm">
          Escolha vídeos com legendas em português para obter melhores resultados. 
          A IA extrai o conteúdo das legendas e do áudio para criar um artigo completo e otimizado.
        </p>
      </div>
    </div>
  );
};

export default YoutubeConverter;
