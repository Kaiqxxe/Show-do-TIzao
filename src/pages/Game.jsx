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
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mt-4 rounded">
                <p className="text-yellow-800">
                  <strong>💡 Dica:</strong> {getDica()}
                </p>
              </div>
            )}

            {showConfirm && (
              <div className="text-center mt-6 space-x-4">
                <button
                  onClick={handleConfirm}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all"
                >
                  ✅ Confirmar Resposta
                </button>
                <button
                  onClick={handleChangeAnswer}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all"
                >
                  🔄 Trocar Alternativa
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
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-all"
            >
              🚪 Desistir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;