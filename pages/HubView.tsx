import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { HubRow, ArticleType } from '../types';

const HubView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data
  const hubRows: HubRow[] = [
    {
      id: '1',
      keyword: 'harmonização facial',
      topic: 'Harmonização Facial: Guia Completo 2026',
      type: ArticleType.PROCEDURE,
      status: 'Publicado',
      seoScore: 95,
      channels: { blog: true, pinterest: true, linkedin: false, audio: false }
    },
    {
      id: '2',
      keyword: 'preenchimento labial',
      topic: 'Preenchimento Labial: Técnicas e Resultados',
      type: ArticleType.EDUCATIONAL,
      status: 'Otimizado',
      seoScore: 88,
      channels: { blog: true, pinterest: false, linkedin: true, audio: false }
    },
    {
      id: '3',
      keyword: 'botox preventivo',
      topic: 'Botox Preventivo: Quando Começar?',
      type: ArticleType.AUTHORITY,
      status: 'Gerado',
      seoScore: 92,
      channels: { blog: true, pinterest: false, linkedin: false, audio: true }
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Publicado': 'bg-emerald-100 text-emerald-700',
      'Otimizado': 'bg-blue-100 text-blue-700',
      'Gerado': 'bg-amber-100 text-amber-700',
      'Pendente': 'bg-slate-100 text-slate-700',
      'Erro': 'bg-rose-100 text-rose-700',
      'Agendado': 'bg-purple-100 text-purple-700',
    };
    return colors[status] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Hub Central</h1>
          <p className="text-slate-500 mt-2">Gerencie toda sua fila de conteúdo</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Novo Artigo
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por keyword ou tópico..."
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button className="px-6 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filtros
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Keyword</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Tópico</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Tipo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">SEO Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Canais</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {hubRows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{row.keyword}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{row.topic}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 capitalize">{row.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${row.seoScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-slate-900">{row.seoScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {row.channels.blog && <span className="w-2 h-2 rounded-full bg-indigo-600" title="Blog"></span>}
                      {row.channels.pinterest && <span className="w-2 h-2 rounded-full bg-rose-600" title="Pinterest"></span>}
                      {row.channels.linkedin && <span className="w-2 h-2 rounded-full bg-blue-600" title="LinkedIn"></span>}
                      {row.channels.audio && <span className="w-2 h-2 rounded-full bg-purple-600" title="Audio"></span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HubView;
