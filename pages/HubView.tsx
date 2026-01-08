
import React, { useState } from 'react';
import { Search, Filter, Plus, Edit2, Trash2, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { HubRow, ArticleType } from '../types';

const HubView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // Sample data
  const [articles] = useState<HubRow[]>([
    {
      id: '1',
      keyword: 'Criomodelagem',
      topic: 'Como funciona a Criomodelagem',
      type: ArticleType.PROCEDURE,
      status: 'Publicado',
      seoScore: 95,
      channels: {
        blog: true,
        pinterest: true,
        linkedin: false,
        audio: false
      }
    },
    {
      id: '2',
      keyword: 'Harmonização Facial',
      topic: 'Guia Completo de Harmonização Facial',
      type: ArticleType.AUTHORITY,
      status: 'Agendado',
      seoScore: 92,
      channels: {
        blog: true,
        pinterest: false,
        linkedin: true,
        audio: true
      }
    },
    {
      id: '3',
      keyword: 'Preenchimento Labial',
      topic: 'Tendências em Preenchimento Labial 2026',
      type: ArticleType.NEWS,
      status: 'Gerado',
      seoScore: 88,
      channels: {
        blog: true,
        pinterest: true,
        linkedin: true,
        audio: false
      }
    },
    {
      id: '4',
      keyword: 'Gestão Clínica',
      topic: 'Como Gerenciar uma Clínica Estética',
      type: ArticleType.MANAGEMENT,
      status: 'Pendente',
      seoScore: 0,
      channels: {
        blog: false,
        pinterest: false,
        linkedin: false,
        audio: false
      }
    }
  ]);

  const getStatusColor = (status: HubRow['status']) => {
    const colors = {
      'Publicado': 'bg-emerald-100 text-emerald-700',
      'Gerado': 'bg-blue-100 text-blue-700',
      'Otimizado': 'bg-purple-100 text-purple-700',
      'Agendado': 'bg-orange-100 text-orange-700',
      'Pendente': 'bg-slate-100 text-slate-700',
      'Erro': 'bg-rose-100 text-rose-700'
    };
    return colors[status] || 'bg-slate-100 text-slate-700';
  };

  const getStatusIcon = (status: HubRow['status']) => {
    const icons = {
      'Publicado': CheckCircle,
      'Agendado': Clock,
      'Erro': AlertCircle,
      'Pendente': Clock
    };
    const Icon = icons[status];
    return Icon ? <Icon className="w-4 h-4" /> : null;
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.keyword.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || article.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Hub Central de Artigos</h2>
            <p className="text-slate-600">Gerencie, otimize e publique seus artigos</p>
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md">
            <Plus className="w-5 h-5" />
            <span>Novo Artigo</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar artigos por palavra-chave ou tópico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
            >
              <option value="all">Todos os Status</option>
              <option value="Pendente">Pendente</option>
              <option value="Gerado">Gerado</option>
              <option value="Otimizado">Otimizado</option>
              <option value="Agendado">Agendado</option>
              <option value="Publicado">Publicado</option>
              <option value="Erro">Erro</option>
            </select>
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Tópico
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Palavra-chave
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  SEO Score
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Canais
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredArticles.map((article) => (
                <tr key={article.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{article.topic}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                      {article.keyword}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 capitalize">
                    {article.type.replace('_', ' ')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}>
                      {getStatusIcon(article.status)}
                      <span>{article.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            article.seoScore >= 90 ? 'bg-emerald-500' :
                            article.seoScore >= 70 ? 'bg-yellow-500' :
                            article.seoScore > 0 ? 'bg-orange-500' :
                            'bg-slate-300'
                          }`}
                          style={{ width: `${article.seoScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-700 w-8">
                        {article.seoScore > 0 ? article.seoScore : '-'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {article.channels.blog && (
                        <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded flex items-center justify-center text-xs font-bold" title="Blog">
                          B
                        </span>
                      )}
                      {article.channels.pinterest && (
                        <span className="w-6 h-6 bg-rose-100 text-rose-600 rounded flex items-center justify-center text-xs font-bold" title="Pinterest">
                          P
                        </span>
                      )}
                      {article.channels.linkedin && (
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded flex items-center justify-center text-xs font-bold" title="LinkedIn">
                          L
                        </span>
                      )}
                      {article.channels.audio && (
                        <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded flex items-center justify-center text-xs font-bold" title="Audio">
                          A
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Visualizar">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Editar">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Excluir">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">Nenhum artigo encontrado</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl p-4 text-white">
          <div className="text-3xl font-bold">{articles.length}</div>
          <div className="text-sm text-indigo-100">Total de Artigos</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl p-4 text-white">
          <div className="text-3xl font-bold">{articles.filter(a => a.status === 'Publicado').length}</div>
          <div className="text-sm text-emerald-100">Publicados</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-rose-500 rounded-xl p-4 text-white">
          <div className="text-3xl font-bold">{articles.filter(a => a.status === 'Agendado').length}</div>
          <div className="text-sm text-orange-100">Agendados</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-4 text-white">
          <div className="text-3xl font-bold">{Math.round(articles.reduce((sum, a) => sum + a.seoScore, 0) / articles.length)}</div>
          <div className="text-sm text-blue-100">SEO Médio</div>
        </div>
      </div>
    </div>
  );
};

export default HubView;
