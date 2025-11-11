import React, { useState } from 'react';
import Menu from './pages/Menu';
import Game from './pages/Game';
import GameOver from './pages/GameOver';
import Rules from './pages/Rules';
import AudioManager from './components/AudioManager';
import perguntas from './data/perguntas.json';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('menu'); // menu, game, gameOver, rules
  const [gameResult, setGameResult] = useState({ won: false, finalPrize: 0 });
  const { playSound } = AudioManager();

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startGame = () => {
    setGameState('game');
  };

  const endGame = (won, finalPrize) => {
    setGameResult({ won, finalPrize });
    setGameState('gameOver');
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

  const orderedPerguntas = perguntas.map((pergunta, index) => ({
    ...pergunta,
    valor: [1000, 10000, 30000, 50000, 100000, 200000, 300000, 400000, 500000, 1000000][index]
  }));

  return (
    <div className="App">
      {gameState === 'menu' && (
        <Menu 
          onStartGame={startGame}
          onShowRules={showRules}
          playSound={playSound}
        />
      )}
      
      {gameState === 'rules' && (
        <Rules onBackToMenu={backToMenu} />
      )}
      
      {gameState === 'game' && (
        <Game 
          perguntas={orderedPerguntas}
          onGameEnd={endGame}
          playSound={playSound}
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