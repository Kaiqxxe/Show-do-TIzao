import React from 'react';

const Question = ({ pergunta, onAnswer, selectedAnswer, showConfirm }) => {
  const alternativas = ['A', 'B', 'C', 'D'];

  return (
    <div className="bg-white rounded-lg shadow-2xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {pergunta.pergunta}
        </h2>
        <div className="text-3xl font-bold text-green-600 mb-6">
          R$ {pergunta.valor.toLocaleString('pt-BR')}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {alternativas.map((letra) => (
          <button
            key={letra}
            onClick={() => onAnswer(letra)}
            disabled={showConfirm}
            className={`p-4 text-left rounded-lg border-2 transition-all duration-300 ${
              selectedAnswer === letra
                ? 'bg-yellow-400 border-yellow-500 text-black font-bold'
                : 'bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300'
            } ${showConfirm ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
          >
            <span className="font-bold text-lg mr-3">{letra})</span>
            {pergunta.alternativas[letra]}
          </button>
        ))}
      </div>

      {showConfirm && selectedAnswer && (
        <div className="text-center">
          <p className="text-xl mb-4 text-gray-700">
            Você escolheu a alternativa <strong>{selectedAnswer}</strong>
          </p>
          <p className="text-lg mb-6 text-gray-600">
            {pergunta.alternativas[selectedAnswer]}
          </p>
        </div>
      )}
    </div>
  );
};

export default Question;