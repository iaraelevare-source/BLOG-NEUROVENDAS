import React from 'react';
import { BookOpen, ExternalLink, Star } from 'lucide-react';

const ExploreExamples: React.FC = () => {
  const examples = [
    {
      title: 'Harmonização Facial Completa',
      category: 'Procedimento',
      description: 'Artigo técnico sobre harmonização facial com foco em técnicas modernas',
      rating: 4.9,
      views: '12.5K',
      url: '#'
    },
    {
      title: 'Skincare para Pele Madura',
      category: 'Educativo',
      description: 'Guia educativo sobre cuidados com pele madura e anti-aging',
      rating: 4.8,
      views: '8.2K',
      url: '#'
    },
    {
      title: 'Tendências em Estética 2026',
      category: 'Tendência',
      description: 'Artigo sobre as principais tendências do mercado estético',
      rating: 4.7,
      views: '15.3K',
      url: '#'
    },
    {
      title: 'Como Escolher uma Clínica de Estética',
      category: 'Autoridade',
      description: 'Conteúdo de autoridade sobre critérios de escolha',
      rating: 4.9,
      views: '9.1K',
      url: '#'
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Exemplos de Conteúdo</h1>
        <p className="text-slate-500 mt-2">Explore artigos de referência criados pela IA</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {examples.map((example, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-indigo-50 rounded-xl">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-xs px-3 py-1 bg-slate-100 rounded-full text-slate-600">
                {example.category}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">{example.title}</h3>
            <p className="text-slate-600 text-sm mb-4">{example.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{example.rating}</span>
                </div>
                <span>{example.views} visualizações</span>
              </div>
              <a
                href={example.url}
                className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2 text-sm font-medium"
              >
                Ver exemplo
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Precisa de Inspiração?</h3>
        <p className="text-slate-600 mb-4">
          Todos esses exemplos foram criados automaticamente pela nossa IA. 
          Use-os como referência para entender o nível de qualidade que você pode esperar.
        </p>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-all">
          Gerar Meu Artigo
        </button>
      </div>
    </div>
  );
};

export default ExploreExamples;
