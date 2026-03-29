import React from 'react';

const Rules = ({ onBackToMenu }) => {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Regras do Show do T.Izão
          </h1>

          <div className="space-y-6 text-gray-700">
            <div>
              <h2 className="text-2xl font-bold text-blue-600 mb-3">Objetivo</h2>
              <p className="text-lg">
                Responda corretamente às 10 perguntas sobre programação e informática 
                para ganhar o prêmio máximo de <strong>R$ 1.000.000</strong>!
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-600 mb-3">Como Jogar</h2>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>Cada pergunta tem 4 alternativas (A, B, C, D)</li>
                <li>Escolha uma alternativa e confirme sua resposta</li>
                <li>Você pode trocar de alternativa antes de confirmar</li>
                <li>Acertou? Passa para a próxima pergunta!</li>
                <li>Errou? O jogo termina e você leva o prêmio da pergunta anterior</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-600 mb-3">Ajudas Disponíveis</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-700 mb-2">Pular Questão</h3>
                  <p>Pula a pergunta atual e vai para a próxima (use apenas 1x)</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-bold text-red-700 mb-2">Eliminar Duas</h3>
                  <p>Remove duas alternativas incorretas (use apenas 1x)</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-green-700 mb-2">Dica</h3>
                  <p>Mostra uma dica sobre a resposta correta (use apenas 1x)</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-600 mb-3">Premiação</h2>
              <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-6 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="font-bold">Pergunta 1: R$ 1.000</p>
                    <p className="font-bold">Pergunta 2: R$ 2.000</p>
                    <p className="font-bold">Pergunta 3: R$ 5.000</p>
                    <p className="font-bold">Pergunta 4: R$ 10.000</p>
                    <p className="font-bold">Pergunta 5: R$ 25.000</p>
                  </div>
                  <div>
                    <p className="font-bold">Pergunta 6: R$ 50.000</p>
                    <p className="font-bold">Pergunta 7: R$ 100.000</p>
                    <p className="font-bold">Pergunta 8: R$ 250.000</p>
                    <p className="font-bold">Pergunta 9: R$ 500.000</p>
                    <p className="font-bold text-green-600 text-xl">Pergunta 10: R$ 1.000.000</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-600 mb-3">Dicas Importantes</h2>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>Você pode desistir a qualquer momento e levar o prêmio acumulado</li>
                <li>As perguntas ficam mais difíceis conforme você avança</li>
                <li>Use as ajudas estrategicamente!</li>
                <li>Leia as perguntas com atenção</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={onBackToMenu}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Voltar ao Menu
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;