import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: (data: { clinicName: string; specialty: string }) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [clinicName, setClinicName] = useState('');
  const [clinicFocus, setClinicFocus] = useState('');

  const totalSteps = 4;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl">🎯</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900">
              Por que Autoridade Importa?
            </h2>
            <div className="text-left max-w-2xl mx-auto space-y-4 text-slate-700">
              <p className="text-lg">
                <strong>80% dos pacientes</strong> pesquisam online antes de escolher uma clínica estética.
              </p>
              <p>
                Clínicas com <strong>autoridade digital estabelecida</strong> têm:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>3x mais agendamentos de primeira consulta</li>
                <li>45% maior valor médio por paciente</li>
                <li>Menor sensibilidade a preço</li>
                <li>Melhor retenção e indicações</li>
              </ul>
              <p className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mt-4">
                <strong className="text-indigo-900">Elevare Editorial AI</strong> não é um gerador de conteúdo genérico.
                É um <strong>sistema de decisão estratégica</strong> que constrói sua autoridade de forma planejada.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl">🏥</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900">
              Conte sobre sua Clínica
            </h2>
            <div className="max-w-lg mx-auto space-y-4">
              <div>
                <label className="block text-left text-sm font-semibold text-slate-900 mb-2">
                  Nome da Clínica
                </label>
                <input
                  type="text"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  placeholder="Ex: Clínica Estética Renova"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-left text-sm font-semibold text-slate-900 mb-2">
                  Principal Especialidade
                </label>
                <select
                  value={clinicFocus}
                  onChange={(e) => setClinicFocus(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Selecione...</option>
                  <option value="harmonizacao">Harmonização Facial</option>
                  <option value="corporal">Estética Corporal</option>
                  <option value="facial">Tratamentos Faciais</option>
                  <option value="capilar">Estética Capilar</option>
                  <option value="intima">Estética Íntima</option>
                  <option value="geral">Estética Geral</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl">🤖</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900">
              Como Lucresia Funciona?
            </h2>
            <div className="text-left max-w-2xl mx-auto space-y-4 text-slate-700">
              <p>
                <strong>Lucresia</strong> é o cérebro estratégico do Elevare. Ela não apenas gera conteúdo - 
                ela <strong>analisa, recomenda e decide</strong> com você.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="text-2xl mb-2">🔍</div>
                  <h4 className="font-semibold text-slate-900 mb-1">Análise de Nicho</h4>
                  <p className="text-sm">Identifica oportunidades no seu mercado</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="text-2xl mb-2">🎯</div>
                  <h4 className="font-semibold text-slate-900 mb-1">Pilares Estratégicos</h4>
                  <p className="text-sm">Define temas que constroem autoridade</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="text-2xl mb-2">📅</div>
                  <h4 className="font-semibold text-slate-900 mb-1">Calendário Inteligente</h4>
                  <p className="text-sm">Planeja conteúdo para longo prazo</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="text-2xl mb-2">✨</div>
                  <h4 className="font-semibold text-slate-900 mb-1">Conteúdo Premium</h4>
                  <p className="text-sm">Gera artigos que educam e convertem</p>
                </div>
              </div>
              <p className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <strong>Diferença chave:</strong> Lucresia pensa estrategicamente. 
                Ela pergunta "Por quê?" antes de "O quê?", garantindo que cada artigo 
                contribua para sua autoridade.
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl">🚀</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900">
              Pronto para Começar!
            </h2>
            <div className="text-left max-w-2xl mx-auto space-y-4 text-slate-700">
              <p className="text-lg">
                Você está prestes a acessar o <strong>Hub Central</strong>, onde acontece a mágica.
              </p>
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6">
                <h3 className="font-bold text-indigo-900 mb-3">Seus Primeiros Passos:</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <strong>Hub Central:</strong> Lucresia analisará {clinicFocus ? 'seu nicho' : 'o mercado'} e sugerirá pilares de autoridade
                  </li>
                  <li>
                    <strong>Definir Estratégia:</strong> Escolha 3-5 pilares que representam sua expertise
                  </li>
                  <li>
                    <strong>Calendário Editorial:</strong> Planeje artigos para os próximos 3-6 meses
                  </li>
                  <li>
                    <strong>Gerar Artigos:</strong> Crie conteúdo estratégico com Lucresia
                  </li>
                  <li>
                    <strong>Distribuir:</strong> Publique em múltiplos canais automaticamente
                  </li>
                </ol>
              </div>
              <p className="text-sm text-slate-600">
                💡 <strong>Dica:</strong> Reserve 30 minutos agora para configurar sua estratégia no Hub Central.
                Isso economizará horas depois e garantirá conteúdo mais eficaz.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    if (step === 2) {
      return clinicName.trim() !== '' && clinicFocus !== '';
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              Passo {step} de {totalSteps}
            </span>
            <span className="text-sm font-medium text-indigo-600">
              {Math.round((step / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-6 py-3 text-slate-600 font-medium rounded-xl hover:bg-white hover:text-slate-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Voltar
          </button>
          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próximo →
            </button>
          ) : (
            <button
              onClick={() => onComplete({ clinicName, specialty: clinicFocus })}
              className="px-8 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-lg"
            >
              Ir para Hub Central 🚀
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
