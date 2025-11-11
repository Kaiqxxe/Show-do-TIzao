import React from 'react';

const ScoreBoard = ({ currentQuestion, totalQuestions, currentPrize }) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-elegant p-6 mb-6 border border-gray-100">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Pergunta {currentQuestion} de {totalQuestions}
        </h3>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-3 overflow-hidden">
          <div
            className="bg-red-600 h-4 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-sm font-medium text-gray-600 mb-2">Prêmio Atual</p>
        <div className="bg-red-600 text-white px-6 py-3 rounded-full inline-block shadow-lg">
          <p className="text-xl font-bold">
            R$ {currentPrize.toLocaleString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;