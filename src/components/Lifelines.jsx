import React from 'react';

const Lifelines = ({ lifelines, onUseLifeline, disabled }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
        💡 Ajudas Disponíveis
      </h3>
      
      <div className="space-y-3">
        <button
          onClick={() => onUseLifeline('pular')}
          disabled={disabled || !lifelines.pular}
          className={`w-full p-3 rounded-lg font-semibold transition-all ${
            lifelines.pular && !disabled
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          🔄 Pular Questão {!lifelines.pular && '(Usada)'}
        </button>

        <button
          onClick={() => onUseLifeline('eliminar')}
          disabled={disabled || !lifelines.eliminar}
          className={`w-full p-3 rounded-lg font-semibold transition-all ${
            lifelines.eliminar && !disabled
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          ❌ Eliminar Duas {!lifelines.eliminar && '(Usada)'}
        </button>

        <button
          onClick={() => onUseLifeline('dica')}
          disabled={disabled || !lifelines.dica}
          className={`w-full p-3 rounded-lg font-semibold transition-all ${
            lifelines.dica && !disabled
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          🔍 Dica {!lifelines.dica && '(Usada)'}
        </button>
      </div>
    </div>
  );
};

export default Lifelines;