import React from 'react';

const Question = ({ pergunta, onAnswer, selectedAnswer, showConfirm, eliminatedOptions = [], showCorrectAnswer = false }) => {
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
            disabled={eliminatedOptions.includes(letra)}
            className={`relative p-6 text-left rounded-xl border overflow-hidden button-smooth ${
              eliminatedOptions.includes(letra)
                ? 'bg-red-50 border-red-200 text-red-400 opacity-60 cursor-not-allowed line-through'
                : showCorrectAnswer && letra === pergunta.correta
                ? 'bg-green-500 border-green-500 text-white font-semibold shadow-lg animate-pulse'
                : selectedAnswer === letra
                ? 'bg-red-600 border-red-600 text-white font-semibold shadow-xl transform scale-102'
                : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-blue-600 hover:shadow-md hover:scale-102 btn-professional'
            } cursor-pointer`}
          >
            {selectedAnswer === letra && (
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 animate-fill-smooth" />
            )}
            <div className="relative z-10 flex items-center">
              <span className={`inline-flex items-center justify-center w-8 h-8 font-bold rounded-full mr-4 text-sm transition-all duration-500 ${
                selectedAnswer === letra 
                  ? 'bg-white text-red-600 shadow-md transform scale-110' 
                  : 'bg-blue-600 text-white'
              }`}>{letra}</span>
              <span className={`transition-all duration-300 ${
                selectedAnswer === letra ? 'font-semibold' : ''
              }`}>
                {pergunta.alternativas[letra]}
              </span>
            </div>
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
      
      {showCorrectAnswer && (
        <div className="text-center bg-green-50 rounded-xl p-6 border border-green-200 mt-4">
          <p className="text-xl mb-3 text-gray-800">
            A resposta correta era: <span className="font-bold text-green-600">{pergunta.correta}</span>
          </p>
          <p className="text-lg text-gray-700 font-medium">
            {pergunta.alternativas[pergunta.correta]}
          </p>
        </div>
      )}
    </div>
  );
};

export default Question;