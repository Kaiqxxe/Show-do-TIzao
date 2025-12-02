# 🎯 Show do T.Izão

Um game show interativo inspirado no clássico "Show do Milhão" do Silvio Santos, focado em perguntas sobre programação e informática.

## 🚀 Características

- **10 perguntas** progressivas sobre programação
- **3 ajudas** disponíveis: Pular, Eliminar duas alternativas, Dica
- **Sistema de áudio** com narração usando Web Speech API
- **Interface responsiva** para desktop e mobile
- **Animações** e efeitos visuais inspirados nos anos 2000
- **Premiação** de R$ 1.000 até R$ 1.000.000

## 🛠️ Tecnologias

- **React 18** - Framework principal
- **Tailwind CSS** - Estilização
- **Web Speech API** - Narração e efeitos sonoros
- **JavaScript ES6+** - Lógica do jogo

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm start

# Abrir no navegador
http://localhost:3000
```

## 🎮 Como Jogar

1. **Clique em "JOGAR"** para começar
2. **Leia a pergunta** e escolha uma das 4 alternativas
3. **Confirme ou troque** sua resposta antes de finalizar
4. **Use as ajudas** estrategicamente:
   - 🔄 **Pular**: Vai para a próxima pergunta
   - ❌ **Eliminar**: Remove duas alternativas erradas
   - 🔍 **Dica**: Mostra uma dica sobre a resposta
5. **Acerte todas** para ganhar R$ 1.000.000!

## 🏆 Sistema de Premiação

| Pergunta | Prêmio |
|----------|--------|
| 1 | R$ 1.000 |
| 2 | R$ 2.000 |
| 3 | R$ 5.000 |
| 4 | R$ 10.000 |
| 5 | R$ 25.000 |
| 6 | R$ 50.000 |
| 7 | R$ 100.000 |
| 8 | R$ 250.000 |
| 9 | R$ 500.000 |
| 10 | R$ 1.000.000 |

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── AudioManager.jsx    # Gerenciamento de áudio
│   ├── Question.jsx        # Componente de pergunta
│   ├── Lifelines.jsx       # Ajudas do jogo
│   └── ScoreBoard.jsx      # Placar e progresso
├── pages/
│   ├── Menu.jsx           # Tela inicial
│   ├── Game.jsx           # Tela principal do jogo
│   ├── GameOver.jsx       # Tela de fim de jogo
│   └── Rules.jsx          # Regras do jogo
├── data/
│   └── perguntas.json     # Base de perguntas
└── App.jsx                # Componente principal
```

## 🎵 Sistema de Áudio

O jogo utiliza a **Web Speech API** para criar uma experiência imersiva com:

- Narração automática das frases clássicas
- Efeitos sonoros para cada ação
- Suporte a português brasileiro
- Funciona em navegadores modernos

## 🎨 Design

Interface inspirada nos game shows dos anos 2000 com:

- Cores vibrantes e gradientes
- Animações suaves
- Layout responsivo
- Tipografia clara e legível
- Efeitos hover e transições

## 📱 Compatibilidade

- ✅ Chrome/Edge (recomendado para áudio)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile (iOS/Android)

## 🔧 Personalização

### Adicionar Novas Perguntas

Edite o arquivo `src/data/perguntas.json`:

```json
{
  "id": 11,
  "pergunta": "Sua pergunta aqui?",
  "alternativas": {
    "A": "Opção A",
    "B": "Opção B", 
    "C": "Opção C",
    "D": "Opção D"
  },
  "correta": "B",
  "nivel": "médio",
  "valor": 15000
}
```

### Modificar Áudios

Edite as frases em `src/components/AudioManager.jsx` para personalizar a narração.

## 🎯 Próximas Funcionalidades

- [ ] Ranking online com Supabase
- [ ] Mais categorias de perguntas
- [ ] Modo multiplayer
- [ ] Áudios personalizados em MP3
- [ ] Estatísticas de desempenho
- [ ] Temas visuais alternativos

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

---

**Desenvolvido com ❤️ para a comunidade de programadores!**

*"Ma oê! Está começando... o Show do Tizão!"* 🎪
