import React from 'react';

const GameOver = ({ won, finalPrize, onRestart, onBackToMenu }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          {won ? (
            <>
              <h1 className="text-6xl font-bold text-yellow-400 mb-4 animate-bounce">
                🎉 PARABÉNS! 🎉
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
                😅 ERRROOOUUU!
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
            🔄 Jogar Novamente
          </button>

          <button
            onClick={onBackToMenu}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🏠 Voltar ao Menu
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