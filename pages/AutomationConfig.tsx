import React, { useState } from 'react';
import { Zap, Calendar, Settings as SettingsIcon, CheckCircle } from 'lucide-react';
import { AutomationStatus } from '../types';

const AutomationConfig: React.FC = () => {
  const [automation, setAutomation] = useState<AutomationStatus>({
    sheetConnected: false,
    lastSync: 'Nunca',
    activeTriggers: 0,
    frequency: 'weekly',
    postsPerWeek: 3,
    autoPublish: false,
  });

  const handleConnect = () => {
    setAutomation({
      ...automation,
      sheetConnected: true,
      lastSync: 'Agora mesmo',
      activeTriggers: 1,
    });
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Automação (Autopilot)</h1>
        <p className="text-slate-500 mt-2">Configure a publicação automática do seu conteúdo</p>
      </div>

      {/* Connection Status */}
      <div className={`rounded-2xl p-6 border-2 ${
        automation.sheetConnected 
          ? 'bg-emerald-50 border-emerald-200' 
          : 'bg-amber-50 border-amber-200'
      }`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${
            automation.sheetConnected ? 'bg-emerald-100' : 'bg-amber-100'
          }`}>
            <Zap className={`w-6 h-6 ${
              automation.sheetConnected ? 'text-emerald-600' : 'text-amber-600'
            }`} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 mb-1">
              {automation.sheetConnected ? 'Autopilot Ativo' : 'Autopilot Desconectado'}
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              {automation.sheetConnected 
                ? 'Seu conteúdo está sendo gerado e publicado automaticamente'
                : 'Conecte o Google Sheets para ativar a automação completa'
              }
            </p>
            {!automation.sheetConnected && (
              <button
                onClick={handleConnect}
                className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-all"
              >
                Conectar Google Sheets
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <SettingsIcon className="w-5 h-5" />
          Configurações de Automação
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Frequência de Publicação
            </label>
            <select
              value={automation.frequency}
              onChange={(e) => setAutomation({ ...automation, frequency: e.target.value as any })}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="daily">Diário</option>
              <option value="weekly">Semanal</option>
              <option value="custom">Personalizado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Artigos por Semana
            </label>
            <input
              type="number"
              min="1"
              max="7"
              value={automation.postsPerWeek}
              onChange={(e) => setAutomation({ ...automation, postsPerWeek: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div>
              <p className="font-medium text-slate-900">Publicação Automática</p>
              <p className="text-sm text-slate-500">Publicar automaticamente no blog</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={automation.autoPublish}
                onChange={(e) => setAutomation({ ...automation, autoPublish: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <Calendar className="w-8 h-8 text-indigo-600 mb-3" />
          <p className="text-slate-500 text-sm">Última Sincronização</p>
          <p className="text-xl font-bold text-slate-900 mt-1">{automation.lastSync}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <CheckCircle className="w-8 h-8 text-emerald-600 mb-3" />
          <p className="text-slate-500 text-sm">Triggers Ativos</p>
          <p className="text-xl font-bold text-slate-900 mt-1">{automation.activeTriggers}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <Zap className="w-8 h-8 text-amber-600 mb-3" />
          <p className="text-slate-500 text-sm">Posts/Semana</p>
          <p className="text-xl font-bold text-slate-900 mt-1">{automation.postsPerWeek}</p>
        </div>
      </div>
    </div>
  );
};

export default AutomationConfig;
