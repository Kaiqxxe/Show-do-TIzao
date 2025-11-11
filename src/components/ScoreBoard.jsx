import React from 'react';

const ScoreBoard = ({ currentQuestion, totalQuestions, currentPrize }) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          Pergunta {currentQuestion} de {totalQuestions}
        </h3>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
          <div
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-1">Prêmio Atual</p>
        <p className="text-2xl font-bold text-green-600">
          R$ {currentPrize.toLocaleString('pt-BR')}
        </p>
      </div>
    </div>
  );
};

export default ScoreBoard;