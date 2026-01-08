
import React, { useState } from 'react';
import { Image, Sparkles, Eye } from 'lucide-react';
import { WebStory } from '../types';

const WebStoriesView: React.FC = () => {
  const [stories] = useState<WebStory[]>([
    {
      id: '1',
      articleId: '1',
      title: 'Como Funciona a Criomodelagem',
      slides: [
        {
          imagePrompt: 'Modern aesthetic clinic interior',
          title: 'Criomodelagem',
          description: 'O tratamento revolucionário'
        },
        {
          imagePrompt: 'Cryotherapy equipment',
          title: 'Como Funciona',
          description: 'Tecnologia de congelamento controlado'
        },
        {
          imagePrompt: 'Happy patient results',
          title: 'Resultados',
          description: 'Redução de até 25% de gordura'
        }
      ]
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-3 mb-2">
          <Image className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-slate-900">Web Stories</h2>
        </div>
        <p className="text-slate-600">Crie stories visuais a partir dos seus artigos</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div key={story.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-[9/16] bg-gradient-to-br from-indigo-500 to-purple-600 relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                <Sparkles className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                <p className="text-sm text-indigo-100">{story.slides.length} slides</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{story.slides.length} slides</span>
                <button className="flex items-center space-x-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">Visualizar</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Create New Story Card */}
        <button className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-400 transition-all aspect-[9/16] flex flex-col items-center justify-center text-center p-6">
          <Sparkles className="w-12 h-12 text-slate-400 mb-4" />
          <h3 className="text-lg font-bold text-slate-700 mb-2">Criar Nova Story</h3>
          <p className="text-sm text-slate-500">Transforme artigos em Web Stories</p>
        </button>
      </div>
    </div>
  );
};

export default WebStoriesView;
