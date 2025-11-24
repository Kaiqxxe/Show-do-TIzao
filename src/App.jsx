import React, { useState } from 'react';
import Menu from './pages/Menu';
import CategorySelection from './pages/CategorySelection';
import Game from './pages/Game';
import GameOver from './pages/GameOver';
import Rules from './pages/Rules';
import AudioManager from './components/AudioManager';
import perguntasTI from './data/perguntas.json';
import perguntasGerais from './data/perguntasGerais.json';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('menu'); // menu, categorySelection, game, gameOver, rules
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [gameResult, setGameResult] = useState({ won: false, finalPrize: 0 });
  const [isMuted, setIsMuted] = useState(false);
  const { playSound } = AudioManager();

  const handlePlaySound = (type, perguntaId) => {
    playSound(type, perguntaId, isMuted);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const showCategorySelection = () => {
    setGameState('categorySelection');
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setGameState('game');
  };

  const endGame = (won, finalPrize) => {
    setGameResult({ won, finalPrize });
    setGameState('gameOver');
  };

  const quitToMenu = () => {
    setGameState('menu');
  };

  const restartGame = () => {
    setGameState('game');
  };

  const backToMenu = () => {
    setGameState('menu');
  };

  const showRules = () => {
    setGameState('rules');
  };

  const getCurrentPerguntas = () => {
    const perguntas = selectedCategory === 'gerais' ? perguntasGerais : perguntasTI;
    const shuffledPerguntas = shuffleArray(perguntas).slice(0, 10);
    return shuffledPerguntas.map((pergunta, index) => ({
      ...pergunta,
      valor: [1000, 10000, 30000, 50000, 100000, 200000, 300000, 400000, 500000, 1000000][index]
    }));
  };

  return (
    <div className="App">
      {gameState !== 'game' && (
        <div className="fixed top-4 right-4 z-50">
          <button
            type="button"
            onClick={toggleMute}
            className="bg-white hover:bg-gray-100 text-gray-700 p-3 rounded-full shadow-lg transition-all duration-200"
          >
            <span className="flex items-center gap-2">
              {isMuted ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.828 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.828l3.555-3.793A1 1 0 019.383 3.076zM8 5.04L5.707 7.293A1 1 0 005 8H3v4h2a1 1 0 01.707.293L8 14.96V5.04zm6.293 1.293a1 1 0 011.414 0L17 7.626l1.293-1.293a1 1 0 111.414 1.414L18.414 9l1.293 1.293a1 1 0 01-1.414 1.414L17 10.414l-1.293 1.293a1 1 0 01-1.414-1.414L15.586 9l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  MUTE
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.828 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.828l3.555-3.793A1 1 0 019.383 3.076zM8 5.04L5.707 7.293A1 1 0 005 8H3v4h2a1 1 0 01.707.293L8 14.96V5.04zm6.707 5.293a1 1 0 010 1.414A4.978 4.978 0 0116 14a1 1 0 11-2 0 2.987 2.987 0 00-.879-2.121 1 1 0 010-1.414A4.978 4.978 0 0114 8a1 1 0 112 0c0 1.045-.417 2.036-1.172 2.757z" clipRule="evenodd" />
                  </svg>
                  SOUND
                </>
              )}
            </span>
          </button>
        </div>
      )}


      {gameState === 'menu' && (
        <Menu 
          onStartGame={showCategorySelection}
          onShowRules={showRules}
          playSound={handlePlaySound}
        />
      )}
      
      {gameState === 'categorySelection' && (
        <CategorySelection 
          onSelectCategory={selectCategory}
          onBackToMenu={backToMenu}
        />
      )}
      
      {gameState === 'rules' && (
        <Rules onBackToMenu={backToMenu} />
      )}
      
      {gameState === 'game' && selectedCategory && (
        <Game 
          perguntas={getCurrentPerguntas()}
          category={selectedCategory}
          onGameEnd={endGame}
          onQuitToMenu={quitToMenu}
          playSound={handlePlaySound}
        />
      )}
      
      {gameState === 'gameOver' && (
        <GameOver 
          won={gameResult.won}
          finalPrize={gameResult.finalPrize}
          onRestart={restartGame}
          onBackToMenu={backToMenu}
        />
      )}
    </div>
  );
}

export default App;