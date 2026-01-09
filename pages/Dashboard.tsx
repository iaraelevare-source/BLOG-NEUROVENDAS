import React from 'react';

interface DashboardProps {
  pillars: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ pillars }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Pilares Definidos</h3>
          <p className="text-4xl font-bold text-indigo-900">{pillars.length}</p>
          <p className="text-sm text-slate-600 mt-1">de 5 recomendados</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Artigos Publicados</h3>
          <p className="text-4xl font-bold text-indigo-900">0</p>
          <p className="text-sm text-slate-600 mt-1">este mês</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Taxa de Autoridade</h3>
          <p className="text-4xl font-bold text-indigo-900">
            {pillars.length >= 3 ? '45%' : '--'}
          </p>
          <p className="text-sm text-slate-600 mt-1">
            {pillars.length >= 3 ? 'em crescimento' : 'defina pilares primeiro'}
          </p>
        </div>
      </div>

      {pillars.length === 0 ? (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-amber-900 mb-2">
            🎯 Comece Definindo Seus Pilares
          </h3>
          <p className="text-amber-800 mb-4">
            Para construir autoridade de forma estratégica, você precisa primeiro definir 
            seus pilares no Hub Central. Pilares são os temas principais que representam sua expertise.
          </p>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: 'hub' })); }}
            className="inline-block bg-amber-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-amber-700 transition-all"
          >
            Ir para Hub Central →
          </a>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            Seus Pilares de Autoridade
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map((pillar, index) => (
              <div key={index} className="border border-indigo-200 bg-indigo-50 rounded-lg p-4">
                <p className="font-semibold text-indigo-900 mb-1">{pillar}</p>
                <p className="text-sm text-indigo-700">0 artigos</p>
              </div>
            ))}
          </div>
          {pillars.length < 3 && (
            <p className="text-sm text-amber-700 mt-4 bg-amber-50 p-3 rounded-lg">
              💡 Recomendação: Defina pelo menos 3 pilares para uma estratégia sólida
            </p>
          )}
        </div>
      )}

      <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl p-6 border border-indigo-200 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
            🤖
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Status da Estratégia Lucresia
            </h3>
            {pillars.length === 0 && (
              <p className="text-slate-700">
                Configure seus pilares no Hub Central para começar a receber análises estratégicas 
                e recomendações personalizadas de conteúdo.
              </p>
            )}
            {pillars.length > 0 && pillars.length < 3 && (
              <p className="text-slate-700">
                ✅ Bom começo! Você tem {pillars.length} pilar{pillars.length > 1 ? 'es' : ''} definido{pillars.length > 1 ? 's' : ''}.
                <br />
                💡 Recomendação: Adicione mais {3 - pillars.length} para uma cobertura estratégica completa.
              </p>
            )}
            {pillars.length >= 3 && (
              <div className="space-y-2">
                <p className="text-slate-700">
                  ✅ Excelente! Você tem {pillars.length} pilares definidos.
                </p>
                <p className="text-slate-700">
                  <strong>Próximos passos:</strong> Crie pelo menos 1 artigo de autoridade para cada pilar 
                  para estabelecer sua presença estratégica.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
