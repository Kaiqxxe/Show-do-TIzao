import React from 'react';

const Question = ({ pergunta, onAnswer, selectedAnswer, showConfirm, eliminatedOptions = [] }) => {
  const alternativas = ['A', 'B', 'C', 'D'];

  return (
    <div className="bg-white rounded-2xl shadow-elegant p-8 max-w-5xl mx-auto border border-gray-100">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 leading-relaxed">
          {pergunta.pergunta}
        </h2>
        <div className="inline-block bg-red-600 text-white px-8 py-3 rounded-full text-2xl font-bold shadow-lg">
          R$ {pergunta.valor.toLocaleString('pt-BR')}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {alternativas.map((letra) => (
          <button
            key={letra}
            onClick={() => onAnswer(letra)}
            disabled={showConfirm || eliminatedOptions.includes(letra)}
            className={`p-6 text-left rounded-xl border transition-all duration-200 ${
              eliminatedOptions.includes(letra)
                ? 'bg-red-50 border-red-200 text-red-400 opacity-60 cursor-not-allowed line-through'
                : selectedAnswer === letra
                ? 'bg-red-600 border-red-600 text-white font-semibold shadow-lg transform scale-105'
                : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-blue-600 hover:shadow-md btn-professional'
            } ${showConfirm ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white font-bold rounded-full mr-4 text-sm">{letra}</span>
            {pergunta.alternativas[letra]}
          </button>
        ))}
      </div>

      {showConfirm && selectedAnswer && (
        <div className="text-center bg-blue-50 rounded-xl p-6 border border-blue-200">
          <p className="text-xl mb-3 text-gray-800">
            Você escolheu a alternativa <span className="font-bold text-red-600">{selectedAnswer}</span>
          </p>
          <p className="text-lg text-gray-700 font-medium">
            {pergunta.alternativas[selectedAnswer]}
          </p>
        </div>
      )}
    </div>
  );
};

export default Question;