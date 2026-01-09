import React, { useState, useEffect } from 'react';
import lucresiaService from '../services/lucresiaService';
import type { CalendarSuggestion, PillarSuggestion } from '../types';

interface HubViewProps {
  pillars: string[];
  setPillars: (pillars: string[]) => void;
  onCreateArticle: (pillar: string) => void;
  clinicSpecialty?: string;
}

const HubView: React.FC<HubViewProps> = ({ pillars, setPillars, onCreateArticle, clinicSpecialty = 'harmonização facial' }) => {
  const [showPillarModal, setShowPillarModal] = useState(false);
  const [newPillar, setNewPillar] = useState('');
  const [suggestedPillars, setSuggestedPillars] = useState<PillarSuggestion[]>([]);
  const [calendarSuggestions, setCalendarSuggestions] = useState<CalendarSuggestion[]>([]);
  const [loadingPillars, setLoadingPillars] = useState(false);
  const [loadingCalendar, setLoadingCalendar] = useState(false);

  // Load pillar suggestions
  useEffect(() => {
    const loadPillarSuggestions = async () => {
      setLoadingPillars(true);
      const suggestions = await lucresiaService.suggestPillars(clinicSpecialty, pillars);
      setSuggestedPillars(suggestions);
      setLoadingPillars(false);
    };
    
    if (showPillarModal) {
      loadPillarSuggestions();
    }
  }, [showPillarModal, clinicSpecialty, pillars]);

  // Load calendar suggestions when pillars change
  useEffect(() => {
    const loadCalendar = async () => {
      if (pillars.length >= 3) {
        setLoadingCalendar(true);
        const suggestions = await lucresiaService.generateEditorialCalendar(pillars, clinicSpecialty, 4);
        setCalendarSuggestions(suggestions);
        setLoadingCalendar(false);
      }
    };
    
    loadCalendar();
  }, [pillars, clinicSpecialty]);

  const handleAddPillar = (pillar: string) => {
    if (!pillars.includes(pillar) && pillars.length < 5) {
      setPillars([...pillars, pillar]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Hub Central</h2>
          <p className="text-slate-600 mt-1">O coração da sua estratégia de autoridade</p>
        </div>
        <button 
          onClick={() => setShowPillarModal(true)}
          className="bg-indigo-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-950 transition-all shadow-md"
        >
          Novo Planejamento
        </button>
      </div>

      {/* Strategic Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border-2 border-indigo-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-slate-900">Pilares Definidos</h3>
            <span className="text-3xl">🎯</span>
          </div>
          <p className="text-4xl font-bold text-indigo-900">{pillars.length}/5</p>
          <p className="text-sm text-slate-600 mt-1">Temas de autoridade</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-slate-900">Artigos Planejados</h3>
            <span className="text-3xl">📅</span>
          </div>
          <p className="text-4xl font-bold text-slate-900">0</p>
          <p className="text-sm text-slate-600 mt-1">Próximos 3 meses</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-slate-900">Score de Autoridade</h3>
            <span className="text-3xl">⭐</span>
          </div>
          <p className="text-4xl font-bold text-slate-900">--</p>
          <p className="text-sm text-slate-600 mt-1">Análise em breve</p>
        </div>
      </div>

      {/* Pillars Section */}
      <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Pilares de Autoridade</h3>
            <p className="text-sm text-slate-600 mt-1">
              Defina 3-5 temas principais que representam sua expertise
            </p>
          </div>
          {pillars.length < 3 && (
            <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-sm font-medium">
              Configure seus pilares
            </span>
          )}
        </div>

        {pillars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map((pillar, index) => (
              <div key={index} className="border-2 border-indigo-200 bg-indigo-50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <p className="font-semibold text-indigo-900">{pillar}</p>
                  <button
                    onClick={() => setPillars(pillars.filter((_, i) => i !== index))}
                    className="text-slate-400 hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-sm text-indigo-700 mb-3">0 artigos planejados</p>
                <button
                  onClick={() => onCreateArticle(pillar)}
                  className="w-full text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
                >
                  Criar Artigo →
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-xl">
            <span className="text-5xl mb-4 block">🎯</span>
            <h4 className="font-semibold text-slate-900 mb-2">Defina seus Pilares de Autoridade</h4>
            <p className="text-slate-600 mb-6">
              Pilares são os temas principais que definem sua expertise e atraem seu público ideal
            </p>
            <button
              onClick={() => setShowPillarModal(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
            >
              Configurar Pilares com Lucresia
            </button>
          </div>
        )}
      </div>

      {/* Lucresia Recommendations */}
      <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl p-8 border border-indigo-200 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
            🤖
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Recomendações Lucresia
            </h3>
            {pillars.length >= 3 ? (
              <div className="space-y-4">
                <p className="text-slate-700">
                  ✅ Excelente! Você tem {pillars.length} pilares definidos.
                </p>
                <p className="text-slate-700">
                  <strong>Próximos passos sugeridos:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-700">
                  <li>Crie artigos de <strong>autoridade clínica</strong> para cada pilar</li>
                  <li>Planeje conteúdo educativo que demonstre expertise</li>
                  <li>Balance entre procedimentos, educação e gestão</li>
                </ul>
                
                {/* Editorial Calendar Suggestions */}
                {loadingCalendar ? (
                  <div className="mt-4 bg-white rounded-lg p-4">
                    <div className="animate-pulse">
                      <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ) : calendarSuggestions.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <h4 className="font-semibold text-slate-900">📅 Calendário Editorial Sugerido (4 semanas):</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {calendarSuggestions.slice(0, 6).map((suggestion) => (
                        <div key={suggestion.id} className="bg-white rounded-lg p-3 border border-indigo-100">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-indigo-600">
                                  Semana {suggestion.estimatedWeek}
                                </span>
                                <span className="text-xs text-slate-500">•</span>
                                <span className="text-xs font-medium text-indigo-700">
                                  {suggestion.pillar}
                                </span>
                              </div>
                              <div className="font-medium text-slate-900 text-sm mt-1">
                                {suggestion.title}
                              </div>
                              <div className="text-xs text-slate-600 mt-1">
                                {suggestion.rationale}
                              </div>
                            </div>
                            <div className={`ml-3 px-2 py-1 rounded-full text-xs font-semibold ${
                              suggestion.priority === 'alta' ? 'bg-red-100 text-red-700' : 
                              suggestion.priority === 'média' ? 'bg-amber-100 text-amber-700' : 
                              'bg-slate-100 text-slate-700'
                            }`}>
                              {suggestion.priority === 'alta' ? '🔥' : suggestion.priority === 'média' ? '⚡' : '💡'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {calendarSuggestions.length > 6 && (
                      <p className="text-xs text-slate-600 text-center">
                        + {calendarSuggestions.length - 6} mais sugestões
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-slate-700">
                Configure seus pilares de autoridade para receber análises estratégicas personalizadas.
                Lucresia analisará seu nicho e recomendará oportunidades de conteúdo.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Distribution Channels */}
      <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">
          Canais de Distribuição
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-slate-200 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">📝</div>
            <h4 className="font-semibold text-slate-900 text-sm">Blog</h4>
            <p className="text-xs text-green-600 mt-1">● Ativo</p>
          </div>
          <div className="border border-slate-200 rounded-lg p-4 text-center opacity-50">
            <div className="text-3xl mb-2">📌</div>
            <h4 className="font-semibold text-slate-900 text-sm">Pinterest</h4>
            <p className="text-xs text-slate-500 mt-1">Configurar</p>
          </div>
          <div className="border border-slate-200 rounded-lg p-4 text-center opacity-50">
            <div className="text-3xl mb-2">💼</div>
            <h4 className="font-semibold text-slate-900 text-sm">LinkedIn</h4>
            <p className="text-xs text-slate-500 mt-1">Configurar</p>
          </div>
          <div className="border border-slate-200 rounded-lg p-4 text-center opacity-50">
            <div className="text-3xl mb-2">📱</div>
            <h4 className="font-semibold text-slate-900 text-sm">Stories</h4>
            <p className="text-xs text-slate-500 mt-1">Configurar</p>
          </div>
        </div>
      </div>

      {/* Pillar Modal */}
      {showPillarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">
                Definir Pilares de Autoridade
              </h3>
              <button
                onClick={() => setShowPillarModal(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                ×
              </button>
            </div>

            <p className="text-slate-600 mb-6">
              Pilares são os temas centrais que definem sua autoridade. Escolha 3-5 tópicos que:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 mb-6">
              <li>Representam sua maior expertise</li>
              <li>Têm demanda do seu público-alvo</li>
              <li>Diferenciam sua clínica</li>
            </ul>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-indigo-900 mb-3">
                🤖 Sugestões Lucresia para {clinicSpecialty}:
              </h4>
              {loadingPillars ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                  <p className="text-sm text-slate-600 mt-2">Analisando nicho...</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {suggestedPillars.map((suggestion) => (
                    <button
                      key={suggestion.name}
                      onClick={() => handleAddPillar(suggestion.name)}
                      disabled={pillars.includes(suggestion.name) || pillars.length >= 5}
                      className="w-full text-left px-4 py-3 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900">{suggestion.name}</div>
                          <div className="text-sm text-slate-600 mt-1">{suggestion.description}</div>
                          <div className="flex gap-1 mt-2">
                            {suggestion.keywords.slice(0, 3).map((keyword) => (
                              <span key={keyword} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="ml-4">
                          {pillars.includes(suggestion.name) ? (
                            <span className="text-green-600">✓</span>
                          ) : (
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              suggestion.expectedImpact === 'alto' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {suggestion.expectedImpact === 'alto' ? '🔥 Alto impacto' : '✨ Médio impacto'}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Ou adicione um pilar personalizado:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPillar}
                  onChange={(e) => setNewPillar(e.target.value)}
                  placeholder="Ex: Técnicas de Rejuvenescimento"
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={() => {
                    if (newPillar.trim()) {
                      handleAddPillar(newPillar.trim());
                      setNewPillar('');
                    }
                  }}
                  disabled={pillars.length >= 5}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
                >
                  Adicionar
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm text-slate-600">
                {pillars.length}/5 pilares definidos
              </p>
              <button
                onClick={() => setShowPillarModal(false)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
              >
                Salvar Pilares
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HubView;
