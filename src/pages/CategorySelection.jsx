import React from 'react';

const CategorySelection = ({ onSelectCategory, onBackToMenu }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-4xl w-full border border-gray-100">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Escolha sua Categoria
          </h1>
          <p className="text-xl text-gray-600">
            Selecione o tipo de perguntas que deseja responder
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => onSelectCategory('ti')}
            className="group bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="text-center">
              <div className="text-5xl mb-3">💻</div>
              <h2 className="text-2xl font-bold mb-2">ADS & TI</h2>
              <p className="text-sm opacity-90">
                Programação, tecnologia e informática
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelectCategory('gerais')}
            className="group bg-gradient-to-br from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="text-center">
              <div className="text-5xl mb-3">🌍</div>
              <h2 className="text-2xl font-bold mb-2">Conhecimentos Gerais</h2>
              <p className="text-sm opacity-90">
                História, geografia, ciências e cultura
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelectCategory('direito')}
            className="group bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="text-center">
              <div className="text-5xl mb-3">⚖️</div>
              <h2 className="text-2xl font-bold mb-2">Direito</h2>
              <p className="text-sm opacity-90">
                Legislação, jurisprudência e normas
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelectCategory('medicina')}
            className="group bg-gradient-to-br from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="text-center">
              <div className="text-5xl mb-3">🏥</div>
              <h2 className="text-2xl font-bold mb-2">Medicina</h2>
              <p className="text-sm opacity-90">
                Anatomia, fisiologia e saúde
              </p>
            </div>
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={onBackToMenu}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Voltar ao Menu
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;