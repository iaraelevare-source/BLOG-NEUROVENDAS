
import React from 'react';
import { Lightbulb, ExternalLink, Star } from 'lucide-react';

const ExploreExamples: React.FC = () => {
  const examples = [
    {
      id: 1,
      title: 'Harmonização Facial: O Guia Definitivo',
      category: 'Procedimento',
      seoScore: 98,
      views: '15.2K',
      description: 'Artigo completo sobre harmonização facial com técnicas avançadas e resultados',
      tags: ['SEO', 'Alto Engajamento', 'Viral']
    },
    {
      id: 2,
      title: 'Top 10 Tendências em Estética para 2026',
      category: 'Tendência',
      seoScore: 95,
      views: '22.8K',
      description: 'Lista curada das principais tendências do mercado estético',
      tags: ['Lista', 'Trending', 'Compartilhável']
    },
    {
      id: 3,
      title: 'Como Gerenciar uma Clínica de Sucesso',
      category: 'Gestão',
      seoScore: 92,
      views: '8.5K',
      description: 'Estratégias práticas para gestão de clínicas estéticas',
      tags: ['Business', 'Educativo', 'Autoridade']
    },
    {
      id: 4,
      title: 'Criomodelagem vs. Lipoaspiração: Qual Escolher?',
      category: 'Comparativo',
      seoScore: 94,
      views: '18.3K',
      description: 'Análise detalhada comparando dois procedimentos populares',
      tags: ['Comparativo', 'Decisão', 'Informativo']
    },
    {
      id: 5,
      title: 'Skincare: Rotina Completa para Cada Tipo de Pele',
      category: 'Educativo',
      seoScore: 96,
      views: '31.5K',
      description: 'Guia passo a passo para cuidados com a pele',
      tags: ['Tutorial', 'Guia', 'Evergreen']
    },
    {
      id: 6,
      title: 'Preenchimento Labial: Mitos e Verdades',
      category: 'Autoridade',
      seoScore: 93,
      views: '12.7K',
      description: 'Desmistificando o preenchimento labial com base científica',
      tags: ['Científico', 'Credibilidade', 'FAQ']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center space-x-3 mb-2">
          <Lightbulb className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Exemplos de Sucesso</h2>
        </div>
        <p className="text-amber-100">Inspire-se com artigos de alto desempenho e aprenda com os melhores</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((example) => (
          <div key={example.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden">
            {/* Header Badge */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                  {example.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                  <span className="text-sm font-bold">{example.seoScore}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold leading-tight">{example.title}</h3>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              <p className="text-sm text-slate-600">{example.description}</p>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-500">👁</span>
                  <span className="font-medium text-slate-700">{example.views}</span>
                </div>
                <div className="text-emerald-600 font-medium">SEO {example.seoScore}</div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {example.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <ExternalLink className="w-4 h-4" />
                <span className="font-medium">Ver Exemplo</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tips Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-4">💡 Dicas para Artigos de Sucesso</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-600 font-bold">1</span>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Use Títulos Atrativos</h4>
              <p className="text-sm text-slate-600">Títulos que prometem valor claro atraem mais cliques</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-600 font-bold">2</span>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Otimize para SEO</h4>
              <p className="text-sm text-slate-600">Use palavras-chave naturalmente no conteúdo</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-600 font-bold">3</span>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Conteúdo Longo</h4>
              <p className="text-sm text-slate-600">Artigos com 1500+ palavras ranqueiam melhor</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-600 font-bold">4</span>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Call-to-Action</h4>
              <p className="text-sm text-slate-600">Sempre inclua um CTA claro no final</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreExamples;
