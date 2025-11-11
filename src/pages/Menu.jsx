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
          <h1 className="text-6xl md:text-8xl font-bold text-yellow-400 mb-4 animate-pulse">
            SHOW DO
          </h1>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8">
            T.IZÃO
          </h1>
          <p className="text-xl text-white opacity-90">
            O game show de programação mais divertido da web!
          </p>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          <button
            onClick={handleStartGame}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            ▶ JOGAR
          </button>

          <button
            onClick={onShowRules}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            ℹ REGRAS
          </button>

          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🔁 REINICIAR
          </button>
        </div>

        <div className="mt-12 text-white opacity-75">
          <p>Inspirado no clássico Show do Milhão</p>
          <p className="text-sm mt-2">Teste seus conhecimentos em programação!</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;