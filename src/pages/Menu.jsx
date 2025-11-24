import React from 'react';

const Menu = ({ onStartGame, onShowRules, playSound }) => {
  const handleStartGame = () => {
    playSound('inicio');
    setTimeout(() => onStartGame(), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-12">
          <img 
            src="/logo-show-do-tizao.png" 
            alt="Show do Tizão" 
            className="mx-auto mb-8 max-w-md w-full animate-pulse"
          />
          <p className="text-xl text-white opacity-90">
            O game show de programação mais divertido da web!
          </p>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          <button
            onClick={handleStartGame}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              JOGAR
            </span>
          </button>

          <button
            onClick={onShowRules}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              REGRAS
            </span>
          </button>


        </div>

        <div className="mt-12 text-white opacity-75">
          <p>Inspirado no clássico Show do Milhão</p>
          <p className="text-sm mt-2">Teste seus conhecimentos em programação e em outras áreas!</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;