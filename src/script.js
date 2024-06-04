import Cidade from "./scenes/CityScene.js";
import Escritorio from "./scenes/OfficeScene.js";
import Tribunal from "./scenes/CourtScene.js";
import Banco from "./scenes/BankScene.js";
import Buffet1 from "./scenes/Buffet1Scene.js";
import Buffet2 from "./scenes/Buffet2Scene.js";
import Buffet3 from "./scenes/Buffet3Scene.js";
import Buffet4 from "./scenes/Buffet4Scene.js";
import TelaInicial from "./scenes/IntroductionScene.js";
import Loading from "./scenes/LoadingScene.js";
import Carousel from "./components/carousel.js";
import Tutorial from './components/Tutorial.js';
import Fase1, { Fase1Tela2 } from "./Fase1/fase1.js";
import Fase2 from "./Fase2/fase2.js";
import Fase3 from "./Fase3/fase3.js";
import pergunta1, { pergunta2, pergunta3, pergunta4, pergunta5, Formulario, respostaGourmet, respostaMetaville, respostaSabor, verRespostas, EscolherBuffet } from "./Fase4/fase4.js";
import Cadastro1 from "./Fase5/fase5.js";
import Fase6 from "./Fase6/fase6.js";
import Fase7 from "./Fase7/fase7.js";
import Fase8 from "./Fase8/fase8.js";
import Fase8TelaConceito from "./Fase8/fase8Conceito.js";
import Fase8TelaInformacoes from "./Fase8/fase8Informacoes.js";
import Fase9tela1, { Fase9tela2, Fase9tela3 } from "./Fase9/fase9.js";
import Fase10 from "./Fase10/fase10.js";
import Festa from "./scenes/PartyScene.js";
import { Cadastro2 } from "./Fase5/fase5.js";

var config = {
  pixelArt: true,
  type: Phaser.AUTO,  
  width: 1280,
  height: 720,
  scale: {
    mode: Phaser.Scale.FIT,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  
  scene: [
    TelaInicial,
    Carousel,
    Loading,
    Tutorial,
    Cidade, Escritorio, Tribunal, Banco,
    Buffet1, Buffet2, Buffet3, Buffet4,
    Fase1, Fase1Tela2,
    Fase2,
    Fase3,
    pergunta1, pergunta2, pergunta3, pergunta4, pergunta5,
    respostaGourmet, respostaMetaville, respostaSabor,
    Formulario, verRespostas, EscolherBuffet,
    Cadastro1, Cadastro2,
    Fase6,
    Fase7,
    Fase8, Fase8TelaConceito, Fase8TelaInformacoes,
    Fase9tela1, Fase9tela2, Fase9tela3,
    Fase10,
    Festa,
  ]
};
//Adicionamos aqui algumas variáveis que nos permitirá adicionar novos elementos ao jogo
//Incluindo também uma variável que guardará as configurações phaser

var game = new Phaser.Game(config);
