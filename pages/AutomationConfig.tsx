
import React, { useState } from 'react';
import { Zap, Calendar, Share2, CheckCircle, Settings } from 'lucide-react';
import { AutomationStatus } from '../types';

const AutomationConfig: React.FC = () => {
  const [automation, setAutomation] = useState<AutomationStatus>({
    sheetConnected: true,
    lastSync: '2 horas atrás',
    activeTriggers: 3,
    frequency: 'weekly',
    postsPerWeek: 3,
    autoPublish: true
  });

  const [platforms, setPlatforms] = useState({
    wordpress: { connected: true, url: 'https://clinica-exemplo.com' },
    wix: { connected: false, url: '' },
    googleSheets: { connected: true, spreadsheetId: '1ABC...' },
    n8n: { connected: true, webhookUrl: 'https://n8n.io/webhook/...' }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center space-x-3 mb-2">
          <Zap className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Configuração de Autopilot</h2>
        </div>
        <p className="text-indigo-100">Configure a publicação automática de artigos em seus canais</p>
      </div>

      {/* Status Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
              Ativo
            </span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{automation.activeTriggers}</div>
          <div className="text-sm text-slate-500">Triggers Ativos</div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs text-slate-500">Por semana</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{automation.postsPerWeek}</div>
          <div className="text-sm text-slate-500">Posts Agendados</div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Share2 className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs text-slate-500">{automation.lastSync}</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">
            {automation.sheetConnected ? 'Sync' : 'Offline'}
          </div>
          <div className="text-sm text-slate-500">Última Sincronização</div>
        </div>
      </div>

      {/* Automation Settings */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Configurações de Publicação</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div>
              <h4 className="font-semibold text-slate-900">Publicação Automática</h4>
              <p className="text-sm text-slate-600">Publicar artigos automaticamente sem revisão</p>
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

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Frequência de Publicação
            </label>
            <select
              value={automation.frequency}
              onChange={(e) => setAutomation({ ...automation, frequency: e.target.value as any })}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="daily">Diária</option>
              <option value="weekly">Semanal</option>
              <option value="custom">Personalizada</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Posts por Semana
            </label>
            <input
              type="number"
              min="1"
              max="7"
              value={automation.postsPerWeek}
              onChange={(e) => setAutomation({ ...automation, postsPerWeek: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Platform Connections */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Plataformas Conectadas</h3>
        
        <div className="space-y-4">
          {/* WordPress */}
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                platforms.wordpress.connected ? 'bg-blue-100' : 'bg-slate-100'
              }`}>
                <span className="text-2xl">W</span>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">WordPress</h4>
                <p className="text-sm text-slate-600">
                  {platforms.wordpress.connected ? platforms.wordpress.url : 'Não conectado'}
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg font-medium ${
              platforms.wordpress.connected 
                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}>
              {platforms.wordpress.connected ? 'Conectado' : 'Conectar'}
            </button>
          </div>

          {/* Wix */}
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                platforms.wix.connected ? 'bg-yellow-100' : 'bg-slate-100'
              }`}>
                <span className="text-2xl">W</span>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Wix</h4>
                <p className="text-sm text-slate-600">
                  {platforms.wix.connected ? platforms.wix.url : 'Não conectado'}
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg font-medium ${
              platforms.wix.connected 
                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}>
              {platforms.wix.connected ? 'Conectado' : 'Conectar'}
            </button>
          </div>

          {/* Google Sheets */}
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                platforms.googleSheets.connected ? 'bg-green-100' : 'bg-slate-100'
              }`}>
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Google Sheets</h4>
                <p className="text-sm text-slate-600">
                  {platforms.googleSheets.connected ? 'Sincronizado' : 'Não conectado'}
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg font-medium ${
              platforms.googleSheets.connected 
                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}>
              {platforms.googleSheets.connected ? 'Conectado' : 'Conectar'}
            </button>
          </div>

          {/* n8n */}
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                platforms.n8n.connected ? 'bg-purple-100' : 'bg-slate-100'
              }`}>
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">n8n Automation</h4>
                <p className="text-sm text-slate-600">
                  {platforms.n8n.connected ? 'Webhook ativo' : 'Não conectado'}
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg font-medium ${
              platforms.n8n.connected 
                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}>
              {platforms.n8n.connected ? 'Conectado' : 'Conectar'}
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md">
          Salvar Configurações
        </button>
      </div>
    </div>
  );
};

export default AutomationConfig;
