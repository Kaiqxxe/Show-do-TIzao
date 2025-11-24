import React, { useState, useEffect, useRef } from 'react';
import Question from '../components/Question';
import Lifelines from '../components/Lifelines';
import ScoreBoard from '../components/ScoreBoard';

const Game = ({ perguntas, category, onGameEnd, onQuitToMenu, playSound }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const questionRef = useRef(null);
  const confirmButtonRef = useRef(null);
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

  const scrollToConfirmButton = () => {
    if (confirmButtonRef.current && window.innerWidth < 1024) {
      confirmButtonRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  };

  const scrollToTop = () => {
    if (window.innerWidth < 1024) {
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    }
  };

  const scrollToQuestion = () => {
    if (questionRef.current && window.innerWidth < 1024) {
      questionRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  const handleAnswer = (answer) => {
    if (eliminatedOptions.includes(answer)) return;
    setSelectedAnswer(answer);
    setShowConfirm(true);
    playSound('confirmar');
    setTimeout(scrollToConfirmButton, 100);
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
          setTimeout(scrollToTop, 100);
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
        setTimeout(scrollToQuestion, 100);
        break;

      case 'dica':
        setLifelines(prev => ({ ...prev, dica: false }));
        setShowDica(true);
        setTimeout(scrollToQuestion, 100);
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
      110: "Responde a eventos e mudanças de forma assíncrona.",
      1001: "Capital federal do país, localizada no centro-oeste.",
      1002: "América, Europa, Ásia, África, Oceania, Antártica e mais um.",
      1003: "O gigante gasoso com a Grande Mancha Vermelha.",
      1004: "Missão Apollo 11 com Neil Armstrong.",
      1005: "Disputa com o Amazonas pelo título de mais longo.",
      1006: "Artista renascentista italiano, também inventor.",
      1007: "Dois átomos de hidrogênio e um de oxigênio.",
      1008: "Antiga civilização inca nas montanhas.",
      1009: "Estado soberano dentro de Roma.",
      1010: "Autor de 'O Cortiço' e fundador da ABL.",
      1011: "Moeda japonesa, uma das mais negociadas.",
      1012: "Esqueleto humano completo na idade adulta.",
      1013: "Felino africano, o mais veloz em terra.",
      1014: "Conflito que envolveu o mundo todo.",
      1015: "Não é Sydney nem Melbourne.",
      1016: "Navegador português em 1500.",
      1017: "O maior de todos os oceanos.",
      1018: "Cidade natal do famoso dramaturgo inglês.",
      1019: "Símbolo Au na tabela periódica.",
      1020: "Instrumento de cordas mais popular.",
      1021: "Pico mais alto da cordilheira do Himalaia.",
      1022: "Grito do Ipiranga às margens do rio.",
      1023: "Língua oficial de Buenos Aires.",
      1024: "Compositor alemão, surdo nos últimos anos.",
      1025: "Mamífero marinho, maior que qualquer dinossauro.",
      1026: "Berço da civilização egípcia antiga.",
      1027: "Aproximadamente 300 milhões de metros por segundo.",
      1028: "Proclamador da República, marechal militar.",
      1029: "Cidade Luz, capital da moda.",
      1030: "Reunificação alemã após Guerra Fria.",
      1031: "Cerca de 78% da atmosfera terrestre.",
      1032: "Obra-prima pintada em parede de convento.",
      1033: "Primeiro planeta a partir do Sol.",
      1034: "Próximo ao Cairo, no deserto.",
      1035: "Continente gelado, tecnicamente um deserto.",
      1036: "Autor colombiano, Prêmio Nobel de Literatura.",
      1037: "Unidade de força no Sistema Internacional.",
      1038: "Físico alemão, criador da relatividade.",
      1039: "Capital federal do Canadá.",
      1040: "Polígono de seis lados iguais.",
      1041: "Metal leve, muito usado em latas.",
      1042: "Organização criada após a Segunda Guerra.",
      1043: "Religião baseada em Jesus Cristo.",
      1044: "Físico alemão, E=mc².",
      1045: "Moeda americana, símbolo $.",
      1046: "Grande ilha africana no Oceano Índico.",
      1047: "Maior país da América do Sul.",
      1048: "Compositor russo, balés famosos.",
      1049: "Temperatura de fervura da água pura.",
      1050: "Cidade rosa, antiga capital nabateia.",
      1051: "Processo que usa luz solar e clorofila.",
      1052: "Primeiro cosmonauta soviético no espaço.",
      1053: "Capital da Espanha, no centro do país.",
      1054: "Abolição da escravidão no Brasil.",
      1055: "Maior corpo de água salgada interior.",
      1056: "Aviador francês, autor de fábula famosa.",
      1057: "Símbolo Fe na tabela periódica.",
      1058: "Cidade italiana famosa pela torre inclinada.",
      1059: "Nossa galáxia, vista como faixa no céu.",
      1060: "Uma hora tem sessenta destes.",
      1061: "Capital da Rússia, antiga URSS.",
      1062: "Grande Guerra que antecedeu a Segunda.",
      1063: "Marsupial saltador, símbolo australiano.",
      1064: "Inventor americano da lâmpada incandescente.",
      1065: "Moeda britânica, símbolo £.",
      1066: "Grande ilha ártica, território dinamarquês.",
      1067: "Maior órgão do corpo, nos protege.",
      1068: "Líder da Revolução Cubana de 1959.",
      1069: "Capital chilena, aos pés dos Andes.",
      1070: "ARPANET, precursora da web moderna.",
      1071: "Navio que afundou no Atlântico Norte.",
      1072: "Pintor espanhol, criador do cubismo.",
      1073: "Cloreto de sódio, tempero básico.",
      1074: "Compositor austríaco, morreu jovem.",
      1075: "Maior mamífero terrestre, com tromba.",
      1076: "Presente da França, na entrada do porto.",
      1077: "Transformação completa de forma e estrutura.",
      1078: "Primeiro imperador do Brasil independente.",
      1079: "Capital alemã, dividida por muro.",
      1080: "Colombo chegou às Américas neste ano.",
      1081: "Linha que divide Norte e Sul terrestres.",
      1082: "Dramaturgo inglês, 'Ser ou não ser'.",
      1083: "Quarto planeta, cor avermelhada.",
      1084: "País do Sol Nascente, arquipélago asiático.",
      1085: "Festival brasileiro de música, muito famoso.",
      1086: "Médico austríaco, pai da psicanálise.",
      1087: "Capital italiana, Cidade Eterna.",
      1088: "Fim da Segunda Guerra Mundial.",
      1089: "Satélite natural que influencia marés.",
      1090: "Inventor escocês-americano do telefone.",
      1091: "Moeda chinesa, renminbi.",
      1092: "Ilha misteriosa no Pacífico Sul.",
      1093: "Passagem direta de sólido para gás.",
      1094: "Líder dos direitos civis americanos.",
      1095: "Capital mexicana, uma das maiores cidades.",
      1096: "Construído para dividir Berlim Oriental.",
      1097: "Teoria da origem e expansão do universo.",
      1098: "Autor espanhol de 'Dom Quixote'.",
      1099: "Força gravitacional lunar sobre oceanos.",
      1100: "Líder sul-africano, Nobel da Paz.",
      1101: "Velocidade do som no ar seco.",
      1102: "Primeiro presidente americano, pai fundador.",
      1103: "Capital argentina, cidade do tango.",
      1104: "Rede social criada por Mark Zuckerberg.",
      1105: "Camada atmosférica com ozônio protetor.",
      1106: "Compositor austríaco, 'A Flauta Mágica'.",
      1107: "Maior arquipélago mundial, milhares de ilhas.",
      1108: "Estátua do Cristo no Rio de Janeiro.",
      1109: "Primeiro livro de Harry Potter.",
      1110: "Último imperador brasileiro, exilado.",
      // Dicas para Direito (IDs 2001-2050)
      2001: "Garantia fundamental do processo judicial.",
      2002: "Limite máximo de privação de liberdade no país.",
      2003: "Corte máxima do Poder Judiciário brasileiro.",
      2004: "Idade mínima para o cargo máximo do Executivo.",
      2005: "Remédio constitucional para liberdade de ir e vir.",
      2006: "Prazo para crimes mais graves contra a vida.",
      2007: "Aquisição de propriedade pelo tempo de posse.",
      2008: "Número de ministros da Suprema Corte.",
      2009: "Legislação trabalhista consolidada.",
      2010: "Competência para julgar o chefe do Executivo.",
      2011: "Intenção consciente de praticar o crime.",
      2012: "Idade para adquirir capacidade civil plena.",
      2013: "Remédio contra ato ilegal de autoridade.",
      2014: "Duração do mandato na Câmara dos Deputados.",
      2015: "Excludente de ilicitude em situação de agressão.",
      2016: "Prazo para responder à ação judicial.",
      2017: "Entidade que representa os advogados.",
      2018: "Penação para crime contra a vida sem qualificadoras.",
      2019: "Decisões repetidas dos tribunais superiores.",
      2020: "Representação de cada estado no Senado.",
      2021: "Ação para retomar imóvel locado.",
      2022: "Prazo para anular sentença transitada em julgado.",
      2023: "Crime sem intenção, por falta de cuidado.",
      2024: "Idade mínima para ser deputado federal.",
      2025: "Ação para pedir sustento familiar.",
      2026: "Procuração não tem prazo legal definido.",
      2027: "Instituição que defende a sociedade.",
      2028: "Justiça especializada em crimes eleitorais.",
      2029: "Situação que exclui a criminalidade do ato.",
      2030: "Mandato mais longo do Legislativo federal.",
      2031: "Ação para esclarecer existência de direito.",
      2032: "Pena máxima para infrações menores.",
      2033: "Remédio para falta de regulamentação legal.",
      2034: "Idade mínima para chefe do Executivo municipal.",
      2035: "Crimes de gravidade excepcional.",
      2036: "Prazo para recorrer de sentença de primeiro grau.",
      2037: "Ação para questionar lei inconstitucional.",
      2038: "Prescrição varia conforme a pena aplicada.",
      2039: "Ação para cobrar dívida documentada.",
      2040: "Número de ministros do Superior Tribunal.",
      2041: "Ação para depositar pagamento recusado.",
      2042: "Prazo para questionar casamento inválido.",
      2043: "Vários crimes similares em sequência.",
      2044: "Idade mínima para vereador municipal.",
      2045: "Ação para estabelecer filiação paterna.",
      2046: "Prazo para contestar cobrança fiscal.",
      2047: "Ação principal de controle de constitucionalidade.",
      2048: "Prazo para anular negócio jurídico viciado.",
      2049: "Ação para adquirir propriedade por posse.",
      2050: "Mandato presidencial no sistema brasileiro.",
      // Dicas para Medicina (IDs 3001-3050)
      3001: "Osso da coxa, o maior do esqueleto humano.",
      3002: "Dois átrios e dois ventrículos.",
      3003: "Filtração sanguínea e produção de urina.",
      3004: "Reveste todo o corpo externamente.",
      3005: "Valores ideais para adultos saudáveis.",
      3006: "Proteína dos glóbulos vermelhos.",
      3007: "Protege o tórax e os órgãos internos.",
      3008: "Hormônio que controla o açúcar no sangue.",
      3009: "Maior glândula do corpo humano.",
      3010: "Membrana que envolve o músculo cardíaco.",
      3011: "Dentição completa do adulto.",
      3012: "Processo de formação das células sanguíneas.",
      3013: "Células de defesa do organismo.",
      3014: "Principal artéria que sai do ventrículo esquerdo.",
      3015: "Temperatura corporal normal do ser humano.",
      3016: "Músculo essencial para a respiração.",
      3017: "Estrutura de sustentação do corpo.",
      3018: "Responsáveis pela coagulação sanguínea.",
      3019: "Doença por deficiência de vitamina C.",
      3020: "Batimentos cardíacos normais por minuto.",
      3021: "Hormônio responsável pelo crescimento.",
      3022: "Volume sanguíneo total no organismo.",
      3023: "Filtra sangue e armazena células sanguíneas.",
      3024: "Membrana que reveste os pulmões.",
      3025: "Local de produção das células sanguíneas.",
      3026: "Vitamina sintetizada pela pele com sol.",
      3027: "Sistema muscular completo do corpo.",
      3028: "Armazena a bile produzida pelo fígado.",
      3029: "Divisão celular para crescimento e reparação.",
      3030: "Volume total de ar que os pulmões comportam.",
      3031: "Doença causada pela falta de insulina.",
      3032: "Material genético em cada célula humana.",
      3033: "Coordena movimentos e equilíbrio corporal.",
      3034: "Tipo de articulação móvel do joelho.",
      3035: "Glândula que regula o metabolismo corporal.",
      3036: "Fluido que lubrifica as articulações.",
      3037: "Nervos que saem diretamente do cérebro.",
      3038: "Proteínas de defesa contra infecções.",
      3039: "Membranas protetoras do sistema nervoso central.",
      3040: "Ciclo reprodutivo feminino normal.",
      3041: "Processo de formação da urina nos rins.",
      3042: "Cavidade única do estômago humano.",
      3043: "Função principal da hemoglobina sanguínea.",
      3044: "Anemia causada por deficiência de ferro.",
      3045: "Função endócrina do pâncreas.",
      3046: "Proteína estrutural mais abundante.",
      3047: "Volume de ar respirado por minuto.",
      3048: "Hormônio da resposta de luta ou fuga.",
      3049: "Célula básica do sistema nervoso.",
      3050: "Sistema de defesa e drenagem corporal."
    };
    
    let dicaId = currentQuestion.id;
    if (category === 'gerais') {
      dicaId = currentQuestion.id + 1000;
    } else if (category === 'direito') {
      dicaId = currentQuestion.id + 2000;
    } else if (category === 'medicina') {
      dicaId = currentQuestion.id + 3000;
    }
    
    return dicas[dicaId] || "Pense bem na resposta!";
  };

  if (!currentQuestion) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div ref={questionRef}>
              <Question
                pergunta={currentQuestion}
                onAnswer={handleAnswer}
                selectedAnswer={selectedAnswer}
                showConfirm={showConfirm}
                eliminatedOptions={eliminatedOptions}
                showCorrectAnswer={showCorrectAnswer}
              />
            </div>

            {showDica && (
              <div className="bg-blue-50 border border-blue-200 p-6 mt-6 rounded-xl shadow-lg">
                <p className="text-blue-800 text-lg font-medium">
                  <strong className="text-blue-600">Dica:</strong> {getDica()}
                </p>
              </div>
            )}

            {showConfirm && (
              <div ref={confirmButtonRef} className="text-center mt-8 space-x-6">
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