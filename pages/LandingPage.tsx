import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 flex items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Elevare Editorial AI
        </h1>
        <p className="text-xl md:text-2xl text-indigo-100 mb-8">
          A máquina de autoridade para clínicas estéticas
        </p>
        <p className="text-lg text-indigo-200 mb-12">
          Sistema de decisão editorial estratégica que constrói autoridade através de conteúdo otimizado,
          guiado por Lucresia.
        </p>
        <button
          onClick={onStart}
          className="bg-white text-indigo-900 px-8 py-4 rounded-xl text-lg font-bold hover:bg-indigo-50 transition-all shadow-xl"
        >
          Começar Agora
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
