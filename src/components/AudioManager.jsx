import { useRef, useCallback } from 'react';

const AudioManager = () => {
  const audioRef = useRef(null);

  const playSound = useCallback((type, perguntaId) => {
    const audioFiles = {
      inicio: '/audio/inicio.mp3',
      pergunta1: '/audio/pergunta1.mp3',
      pergunta2: '/audio/pergunta2.mp3',
      pergunta3: '/audio/pergunta3.mp3',
      pergunta4: '/audio/pergunta4.mp3',
      pergunta5: '/audio/pergunta5.mp3',
      pergunta6: '/audio/pergunta6.mp3',
      pergunta7: '/audio/pergunta7.mp3',
      pergunta8: '/audio/pergunta8.mp3',
      pergunta9: '/audio/pergunta9.mp3',
      pergunta10: '/audio/pergunta10.mp3',
      confirmar: '/audio/confirmar.mp3',
      acerto: '/audio/acerto.mp3',
      erro: '/audio/erro.mp3',
      pular: '/audio/pular.mp3',
      eliminar: '/audio/eliminar.mp3',
      parabens: '/audio/parabens.mp3'
    };

    const audioFile = type === 'pergunta' ? audioFiles[`pergunta${perguntaId}`] : audioFiles[type];
    
    if (audioFile) {
      const audio = new Audio(audioFile);
      audio.play().catch(e => console.log('Erro ao reproduzir áudio:', e));
    }
  }, []);

  return { playSound };
};

export default AudioManager;