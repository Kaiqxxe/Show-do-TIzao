import React from 'react';

const Lifelines = ({ lifelines, onUseLifeline, disabled }) => {
  return (
    <div className="bg-white rounded-2xl shadow-elegant p-6 mb-6 border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
        Ajudas Disponíveis
      </h3>
      
      <div className="space-y-4">
        <button
          onClick={() => onUseLifeline('pular')}
          disabled={disabled || !lifelines.pular}
          className={`w-full p-4 rounded-xl font-semibold transition-all duration-200 ${
            lifelines.pular && !disabled
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-102'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
          }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Pular Questão {!lifelines.pular && '(Usada)'}
          </span>
        </button>

        <button
          onClick={() => onUseLifeline('eliminar')}
          disabled={disabled || !lifelines.eliminar}
          className={`w-full p-4 rounded-xl font-semibold transition-all duration-200 ${
            lifelines.eliminar && !disabled
              ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transform hover:scale-102'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
          }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Eliminar Duas {!lifelines.eliminar && '(Usada)'}
          </span>
        </button>

        <button
          onClick={() => onUseLifeline('dica')}
          disabled={disabled || !lifelines.dica}
          className={`w-full p-4 rounded-xl font-semibold transition-all duration-200 ${
            lifelines.dica && !disabled
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-102'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
          }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Dica {!lifelines.dica && '(Usada)'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Lifelines;