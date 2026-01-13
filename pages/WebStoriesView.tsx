import React, { useState } from 'react';
import { Image, Wand2, Eye } from 'lucide-react';
import { WebStory, WebStorySlide } from '../types';

const WebStoriesView: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample stories
  const stories: WebStory[] = [
    {
      id: '1',
      articleId: '1',
      title: '5 Benefícios da Harmonização Facial',
      slides: [
        { imagePrompt: 'harmonização facial antes e depois', title: 'Harmonização Facial', description: 'Transforme seu rosto' },
        { imagePrompt: 'rosto simétrico', title: 'Simetria Facial', description: 'Equilíbrio perfeito' },
        { imagePrompt: 'autoestima elevada', title: 'Autoestima', description: 'Confiança renovada' },
      ]
    }
  ];

  const handleGenerate = async () => {
    if (!selectedArticle) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('Web Story gerada com sucesso!');
    }, 2000);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Web Stories</h1>
        <p className="text-slate-500 mt-2">Crie stories visuais para Pinterest e Instagram</p>
      </div>

      {/* Generator */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
          <Image className="w-6 h-6 text-purple-600" />
          <div>
            <p className="font-medium text-slate-900">Stories Visuais</p>
            <p className="text-sm text-slate-600">
              Transforme seus artigos em stories verticais otimizadas para redes sociais
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Selecionar Artigo
          </label>
          <select
            value={selectedArticle}
            onChange={(e) => setSelectedArticle(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Escolha um artigo...</option>
            <option value="1">Harmonização Facial: Guia Completo</option>
            <option value="2">Preenchimento Labial: Técnicas</option>
            <option value="3">Botox Preventivo: Quando Começar?</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!selectedArticle || isGenerating}
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
              Gerar Web Story
            </>
          )}
        </button>
      </div>

      {/* Stories Grid */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Suas Stories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="aspect-[9/16] bg-gradient-to-br from-indigo-500 to-purple-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <Image className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-xs font-medium">{story.slides.length} slides</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Eye className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-slate-900 truncate">{story.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
        <h3 className="font-semibold text-slate-900 mb-2">📱 Otimizado para Mobile</h3>
        <p className="text-slate-600 text-sm">
          Todas as stories são geradas no formato 9:16, perfeito para Pinterest, Instagram e Facebook Stories. 
          Compartilhe em múltiplas plataformas com um clique.
        </p>
      </div>
    </div>
  );
};

export default WebStoriesView;
