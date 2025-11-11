import React, { useState, useEffect } from 'react';
import Question from '../components/Question';
import Lifelines from '../components/Lifelines';
import ScoreBoard from '../components/ScoreBoard';

const Game = ({ perguntas, onGameEnd, playSound }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [lifelines, setLifelines] = useState({
    pular: true,
    eliminar: true,
    dica: true
  });
  const [eliminatedOptions, setEliminatedOptions] = useState([]);
  const [showDica, setShowDica] = useState(false);

  const currentQuestion = perguntas[currentQuestionIndex];
  const currentPrize = currentQuestion?.valor || 0;

  useEffect(() => {
    if (currentQuestion) {
      playSound('pergunta', currentQuestion.id);
    }
  }, [currentQuestionIndex, playSound, currentQuestion]);

  const handleAnswer = (answer) => {
    if (eliminatedOptions.includes(answer)) return;
    setSelectedAnswer(answer);
    setShowConfirm(true);
    playSound('confirmar');
  };

  const handleConfirm = () => {
    const isCorrect = selectedAnswer === currentQuestion.correta;
    
    if (isCorrect) {
      playSound('acerto');
      setTimeout(() => {
        if (currentQuestionIndex === perguntas.length - 1) {
          playSound('parabens');
          setTimeout(() => onGameEnd(true, currentPrize), 2000);
        } else {
          setCurrentQuestionIndex(prev => prev + 1);
          setSelectedAnswer(null);
          setShowConfirm(false);
          setEliminatedOptions([]);
          setShowDica(false);
        }
      }, 2000);
    } else {
      playSound('erro');
      setTimeout(() => onGameEnd(false, currentQuestionIndex > 0 ? perguntas[currentQuestionIndex - 1].valor : 0), 2000);
    }
  };

  const handleChangeAnswer = () => {
    setSelectedAnswer(null);
    setShowConfirm(false);
  };

  const handleUseLifeline = (type) => {
    switch (type) {
      case 'pular':
        playSound('pular');
        setLifelines(prev => ({ ...prev, pular: false }));
        setTimeout(() => {
          if (currentQuestionIndex === perguntas.length - 1) {
            onGameEnd(true, currentPrize);
          } else {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setShowConfirm(false);
            setEliminatedOptions([]);
            setShowDica(false);
          }
        }, 1500);
        break;

      case 'eliminar':
        playSound('eliminar');
        setLifelines(prev => ({ ...prev, eliminar: false }));
        const wrongAnswers = ['A', 'B', 'C', 'D'].filter(
          option => option !== currentQuestion.correta
        );
        const toEliminate = wrongAnswers.slice(0, 2);
        setEliminatedOptions(toEliminate);
        break;

      case 'dica':
        setLifelines(prev => ({ ...prev, dica: false }));
        setShowDica(true);
        break;

      default:
        break;
    }
  };

  const getDica = () => {
    const dicas = {
      1: "Esta linguagem roda diretamente no browser do usuário.",
      2: "É a linguagem de marcação padrão para criar páginas web.",
      3: "A versão segura do protocolo HTTP.",
      4: "Permite executar código repetidamente.",
      5: "Comando para fazer uma cópia local de um repositório remoto.",
      6: "Linguagem para consultar bancos de dados relacionais.",
      7: "Divide o problema pela metade a cada iteração.",
      8: "Novidade do React 16.8 que revolucionou componentes funcionais.",
      9: "Tecnologia que empacota aplicações em containers.",
      10: "Garante que só existe uma instância da classe."
    };
    return dicas[currentQuestion.id] || "Pense bem na resposta!";
  };

  if (!currentQuestion) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Question
              pergunta={currentQuestion}
              onAnswer={handleAnswer}
              selectedAnswer={selectedAnswer}
              showConfirm={showConfirm}
              eliminatedOptions={eliminatedOptions}
            />

            {showDica && (
              <div className="bg-blue-50 border border-blue-200 p-6 mt-6 rounded-xl shadow-lg">
                <p className="text-blue-800 text-lg font-medium">
                  <strong className="text-blue-600">Dica:</strong> {getDica()}
                </p>
              </div>
            )}

            {showConfirm && (
              <div className="text-center mt-8 space-x-6">
                <button
                  onClick={handleConfirm}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-10 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Confirmar Resposta
                  </span>
                </button>
                <button
                  onClick={handleChangeAnswer}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    Trocar Alternativa
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <ScoreBoard
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={perguntas.length}
              currentPrize={currentPrize}
            />
            
            <Lifelines
              lifelines={lifelines}
              onUseLifeline={handleUseLifeline}
              disabled={showConfirm}
            />

            <button
              onClick={() => onGameEnd(false, currentQuestionIndex > 0 ? perguntas[currentQuestionIndex - 1].valor : 0)}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-102"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Desistir
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;