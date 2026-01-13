import React from 'react';
import { Sparkles, TrendingUp, FileText, Calendar } from 'lucide-react';

const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Powered by AI Studio</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Elevare Editorial AI
          </h1>
          
          <p className="text-xl md:text-2xl text-indigo-200">
            A máquina de autoridade para clínicas estéticas
          </p>
          
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
            Crie, otimize e publique conteúdo SEO de alta qualidade automaticamente. 
            Transforme sua clínica em referência digital com IA de última geração.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
            <FileText className="w-8 h-8 text-indigo-200 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">180 Artigos/Ano</h3>
            <p className="text-indigo-200 text-sm">Conteúdo consistente e otimizado</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
            <TrendingUp className="w-8 h-8 text-indigo-200 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">SEO Avançado</h3>
            <p className="text-indigo-200 text-sm">Rankeamento garantido no Google</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
            <Calendar className="w-8 h-8 text-indigo-200 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Automação Total</h3>
            <p className="text-indigo-200 text-sm">Publicação automática no seu blog</p>
          </div>
        </div>

        <button
          onClick={onStart}
          className="bg-white text-indigo-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-indigo-50 transition-all shadow-2xl hover:scale-105"
        >
          Começar Agora
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
