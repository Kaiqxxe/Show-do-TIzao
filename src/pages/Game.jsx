import React, { useState, useEffect } from 'react';
import Question from '../components/Question';
import Lifelines from '../components/Lifelines';
import ScoreBoard from '../components/ScoreBoard';

const Game = ({ perguntas, onGameEnd, onQuitToMenu, playSound }) => {
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const currentQuestion = perguntas[currentQuestionIndex];
  const currentPrize = currentQuestion?.valor || 0;

  useEffect(() => {
    if (currentQuestion) {
      const questionNumber = currentQuestionIndex + 1;
      playSound('pergunta', questionNumber);
    }
  }, [currentQuestionIndex, playSound, currentQuestion]);

  const handleAnswer = (answer) => {
    if (eliminatedOptions.includes(answer)) return;
    setSelectedAnswer(answer);
    setShowConfirm(true);
    playSound('confirmar');
  };

  const handleConfirm = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    
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
          setIsProcessing(false);
        }
      }, 2000);
    } else {
      playSound('erro');
      setShowCorrectAnswer(true);
      setTimeout(() => onGameEnd(false, currentQuestionIndex > 0 ? perguntas[currentQuestionIndex - 1].valor : 0), 2000);
    }
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
      10: "Garante que só existe uma instância da classe.",
      11: "Usado para dar estilo e aparência às páginas web.",
      12: "Porta padrão para navegação web não segura.",
      13: "Função básica para exibir informações na tela em Python.",
      14: "Ambiente integrado para desenvolvimento de software.",
      15: "Extensão padrão para arquivos desta linguagem web.",
      16: "Interface que permite comunicação entre aplicações.",
      17: "Gerenciador de pacotes do Node.js.",
      18: "JavaScript foi criado em meados dos anos 90.",
      19: "Formato leve para intercâmbio de dados.",
      20: "Sistema criado por Linus Torvalds.",
      21: "Estrutura que facilita o desenvolvimento de aplicações.",
      22: "Linguagem que domina o desenvolvimento web frontend.",
      23: "Endereço único de recursos na internet.",
      24: "Porta padrão para navegação web segura.",
      25: "Conceito fundamental da programação orientada a objetos.",
      26: "Sequência lógica de passos para resolver um problema.",
      27: "Comando para visualizar histórico de mudanças.",
      28: "Erro ou defeito no código de um programa.",
      29: "Banco de dados orientado a documentos.",
      30: "Representação em árvore dos elementos HTML.",
      31: "Linguagem para definir a apresentação de documentos.",
      32: "Estrutura de dados que armazena múltiplos valores.",
      33: "Linguagem mais popular para desenvolvimento web.",
      34: "Técnica onde uma função chama a si mesma.",
      35: "Criador do kernel Linux.",
      36: "Traduz código fonte para código executável.",
      37: "Protocolo para transferência de arquivos.",
      38: "Memória de acesso aleatório do computador.",
      39: "=== verifica tipo e valor, == só valor.",
      40: "Computador que fornece recursos para outros.",
      41: "APIs REST são stateless por natureza.",
      42: "Notação para analisar eficiência de algoritmos.",
      43: "No pior caso, QuickSort tem performance quadrática.",
      44: "Situação onde processos ficam travados esperando recursos.",
      45: "Capacidade de usar a mesma interface para diferentes tipos.",
      46: "Last In, First Out - último a entrar, primeiro a sair.",
      47: "Princípio de ocultar detalhes internos de implementação.",
      48: "Protocolo para envio de emails.",
      49: "Estrutura que mapeia chaves para valores.",
      50: "HTTPS adiciona criptografia ao HTTP.",
      51: "IA que aprende padrões a partir de dados.",
      52: "Comando para criar uma nova ramificação.",
      53: "Computação distribuída via internet.",
      54: "NoSQL escala horizontalmente melhor que SQL.",
      55: "Cultura que integra desenvolvimento e operações.",
      56: "Padrão que notifica observadores sobre mudanças.",
      57: "Arquitetura de aplicações pequenas e independentes.",
      58: "GET busca dados, POST envia dados.",
      59: "Callback HTTP automático para eventos.",
      60: "Funções são tratadas como valores de primeira classe.",
      61: "Integração e entrega contínuas.",
      62: "Comando para desfazer um commit específico.",
      63: "Rede de distribuição de conteúdo.",
      64: "SQL é relacional, NoSQL é não-relacional.",
      65: "Distribui carga entre múltiplos servidores.",
      66: "Padrão que separa Model, View e Controller.",
      67: "Mapeia objetos para tabelas relacionais.",
      68: "Docker isola aplicações em containers portáteis.",
      69: "Linguagem de consulta flexível para APIs.",
      70: "Threads compartilham memória, processos não.",
      71: "Orquestrador de containers em produção.",
      72: "Git suporta múltiplos protocolos de comunicação.",
      73: "Soluções reutilizáveis para problemas recorrentes.",
      74: "Compilação traduz antes, interpretação durante execução.",
      75: "Software que conecta diferentes componentes.",
      76: "REST não mantém estado entre requisições.",
      77: "Armazenamento temporário para acesso rápido.",
      78: "var tem escopo de função, let/const têm escopo de bloco.",
      79: "Função passada como parâmetro para outra função.",
      80: "async/await é sintaxe mais limpa para Promises.",
      81: "Função que 'lembra' do escopo onde foi criada.",
      82: "Comando para unir branches no Git.",
      83: "Metodologia que escreve testes antes do código.",
      84: "Criador da linguagem Python.",
      85: "Melhora código sem alterar funcionalidade.",
      86: "TypeScript adiciona tipos estáticos ao JavaScript.",
      87: "Representação virtual do DOM em memória.",
      88: "Criador do kernel Linux.",
      89: "Processo de organizar dados para reduzir redundância.",
      90: "Criador da linguagem Java.",
      91: "Condição onde threads competem por recursos compartilhados.",
      92: "Criador da linguagem C.",
      93: "Gerenciamento automático de memória não utilizada.",
      94: "Cria objetos sem especificar a classe concreta.",
      95: "Mecanismo que gerencia execução assíncrona em JavaScript.",
      96: "Fundadores da Microsoft.",
      97: "Cinco princípios para design de software limpo.",
      98: "Criador do Facebook.",
      99: "Teorema sobre trade-offs em sistemas distribuídos.",
      100: "Merge Sort sempre mantém complexidade O(n log n).",
      101: "Tecnologia de registro imutável e distribuído.",
      102: "Fundadores do Google.",
      103: "Caracterizado por volume, velocidade e variedade.",
      104: "Permite trocar algoritmos dinamicamente.",
      105: "Consistência alcançada após propagação em sistemas distribuídos.",
      106: "Criador da linguagem C++.",
      107: "Divisão horizontal de dados entre múltiplos servidores.",
      108: "Fundadores da Apple.",
      109: "Paradigma para processamento paralelo de grandes datasets.",
      110: "Responde a eventos e mudanças de forma assíncrona."
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
              showCorrectAnswer={showCorrectAnswer}
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
                  disabled={isProcessing}
                  className={`font-semibold py-4 px-10 rounded-xl text-lg transition-all duration-200 shadow-lg ${
                    isProcessing 
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Confirmar Resposta
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
              disabled={isProcessing}
            />

            <button
              onClick={onQuitToMenu}
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