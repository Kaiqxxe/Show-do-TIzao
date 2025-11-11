import React from 'react';

const GameOver = ({ won, finalPrize, onRestart, onBackToMenu }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          {won ? (
            <>
              <h1 className="text-6xl font-bold text-yellow-400 mb-4 animate-bounce">
                PARABÉNS!
              </h1>
              <h2 className="text-4xl font-bold text-white mb-6">
                Você ganhou o Show do Tizão!
              </h2>
              <div className="bg-green-500 text-white p-8 rounded-lg shadow-2xl mb-6">
                <p className="text-2xl mb-2">Prêmio Final:</p>
                <p className="text-5xl font-bold">
                  R$ {finalPrize.toLocaleString('pt-BR')}
                </p>
              </div>
              <p className="text-xl text-white opacity-90">
                Você é um verdadeiro expert em programação! 🚀
              </p>
            </>
          ) : (
            <>
              <h1 className="text-6xl font-bold text-red-400 mb-4">
                ERRROOOUUU!
              </h1>
              <h2 className="text-4xl font-bold text-white mb-6">
                Que pena! Mas você foi muito bem!
              </h2>
              <div className="bg-blue-500 text-white p-8 rounded-lg shadow-2xl mb-6">
                <p className="text-2xl mb-2">Você levou:</p>
                <p className="text-5xl font-bold">
                  R$ {finalPrize.toLocaleString('pt-BR')}
                </p>
              </div>
              <p className="text-xl text-white opacity-90">
                Continue estudando e tente novamente! 📚
              </p>
            </>
          )}
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          <button
            onClick={onRestart}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Jogar Novamente
            </span>
          </button>

          <button
            onClick={onBackToMenu}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Voltar ao Menu
            </span>
          </button>
        </div>

        <div className="mt-8 text-white opacity-75">
          <p className="text-lg">
            {won 
              ? "Você dominou todos os desafios de programação!" 
              : "Cada erro é uma oportunidade de aprender!"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameOver;