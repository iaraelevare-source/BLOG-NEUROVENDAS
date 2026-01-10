import React from 'react';

const YoutubeConverter: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-900">Conversor YouTube</h2>
      
      <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🎥</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Transforme Vídeos em Artigos
          </h3>
          <p className="text-slate-600 max-w-md mx-auto mb-6">
            Converta seus vídeos do YouTube em artigos otimizados para SEO, 
            mantendo sua autoridade em múltiplos formatos.
          </p>
        </div>
        
        <div className="max-w-lg mx-auto">
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            URL do Vídeo YouTube
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="https://www.youtube.com/watch?v=..."
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button className="bg-indigo-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-950 transition-all">
              Converter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeConverter;
