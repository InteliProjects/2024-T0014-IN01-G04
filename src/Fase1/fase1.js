import Assistente from "../classes/Assistente.mjs";

// Define um objeto para armazenar quais buffets foram selecionados
var buffetsSelecionados = {
  buffet1: false,
  buffet2: false,
  buffet3: false,
  buffet4: false,
  buffet5: false,
  buffet6: false,
  buffet7: false,
  buffet8: false,
};

var tela1;
var tela2;
var buffet1;
var buffet2;
var buffet3;
var buffet4;
var buffet5;
var buffet6;
var buffet7;
var buffet8;
var setaDireita;
var setaEsquerda;
var botaoVerificar;

// Exporta a classe Fase1 como padrão
export default class Fase1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Fase1' });
  }

  preload() {
    // Carrega as imagens:
    this.load.image( 'tela1', '../src/assets/fase1/tela1.png' );
    this.load.image( 'buffet1', '../src/assets/fase1/buffet1.png' );
    this.load.image( 'buffet2', '../src/assets/fase1/buffet2.png' );
    this.load.image( 'buffet3', '../src/assets/fase1/buffet3.png' );
    this.load.image( 'buffet4', '../src/assets/fase1/buffet4.png' );
    this.load.image( 'setaDireita', '../src/assets/fase1/setadireita.png' );
  }

  create() {
    this.registry.set("Fase", 1);

    let self = this;
    tela1 = this.add.image( this.game.renderer.width /2, this.game.renderer.height/2, 'tela1' );

    // Adiciona buffets interativos à cena
    buffet1 = this.add.image( this.game.renderer.width / 2.8, this.game.renderer.height / 2.3, 'buffet1' ).setInteractive({ useHandCursor: true });
    buffet2 = this.add.image( this.game.renderer.width / 1.56, this.game.renderer.height / 2.3, 'buffet2' ).setInteractive({ useHandCursor: true });
    buffet3 = this.add.image( this.game.renderer.width / 2.8, this.game.renderer.height / 1.5, 'buffet3' ).setInteractive({ useHandCursor: true });
    buffet4 = this.add.image( this.game.renderer.width / 1.56, this.game.renderer.height / 1.5, 'buffet4' ).setInteractive({ useHandCursor: true });
    setaDireita = this.add.image( this.game.renderer.width /1.26, this.game.renderer.height / 1.2, 'setaDireita' ).setInteractive({ useHandCursor: true });

    buffet1.setScale(0.9); // Ajuste a escala conforme necessário
    buffet2.setScale(0.9); // Ajuste a escala conforme necessário
    buffet3.setScale(0.9); // Ajuste a escala conforme necessário
    buffet4.setScale(0.9); // Ajuste a escala conforme necessário

    // Verifica se um buffet já estava selecionado anteriormente e o pinta novamente
    if  (buffetsSelecionados.buffet1 ) {
      buffet1.setTint(0x689efc);
    } else if  (buffetsSelecionados.buffet2 ) {
      buffet2.setTint(0x689efc);
    } else if ( buffetsSelecionados.buffet3 ) {
      buffet3.setTint(0x689efc);
    } else if ( buffetsSelecionados.buffet4 ) {
      buffet4.setTint(0x689efc);
    }
    const posicaoX = this.game.renderer.width;
    const posicaoY = this.game.renderer.height;
    this.listaDeDialogos = ["Esta é a primeira fase. Nela você deverá selecionar os 4 melhores buffets aqui presentes.\n Lembre-se de considerar a diversidade, as avaliações e a missão das empresas, isso \né algo muito importante para a META."];
    this.dialogo = new Assistente(this,  posicaoX/6.8, posicaoY/2.5, 150, 100, this.listaDeDialogos).setScale(0.8);
    this.dialogo.setScrollFactor(0);  


    // Adiciona eventos de clique aos buffets
    buffet1.on( 'pointerdown', function ( pointer ) {
      toggleTint(buffet1, 'buffet1' );
    });
    buffet1.setInteractive({ useHandCursor: true });

    buffet2.on( 'pointerdown', function ( pointer ) {
      toggleTint( buffet2, 'buffet2' );
    });
    buffet2.setInteractive({ useHandCursor: true });

    buffet3.on( 'pointerdown', function ( pointer ) {
      toggleTint( buffet3, 'buffet3' );
    });
    buffet3.setInteractive({ useHandCursor: true });

    buffet4.on( 'pointerdown', function ( pointer ) {
      toggleTint( buffet4, 'buffet4' );
    });
    buffet4.setInteractive({ useHandCursor: true });

    // Adiciona evento de clique para avançar para a próxima cena
    setaDireita.on( 'pointerdown', function ( pointer ) {
      self.scene.start( 'Fase1Tela2' );
    });
    setaDireita.setInteractive({ useHandCursor: true });

    // Função interna para alternar a cor dos buffets selecionados
    function toggleTint( obj, key ) {
      if ( obj.isTinted ) {
        obj.clearTint();
        buffetsSelecionados[key] = false;
      } else {
        obj.setTint( 0x689efc );
        buffetsSelecionados[key] = true;
      }
    }
  }
}

// Exporta a classe Fase1Tela2
export class Fase1Tela2 extends Phaser.Scene {
  constructor() {
    super({ key: 'Fase1Tela2' });
  }

    preload() {
        this.load.image( 'tela2', '../src/assets/fase1/tela2.png' );
        this.load.image( 'buffet5', '../src/assets/fase1/buffet5.png' );
        this.load.image( 'buffet6', '../src/assets/fase1/buffet6.png' );
        this.load.image( 'buffet7', '../src/assets/fase1/buffet7.png' );
        this.load.image( 'buffet8', '../src/assets/fase1/buffet8.png' );
        this.load.image( 'setaEsquerda', '../src/assets/fase1/setaesquerda.png' );
        this.load.image( 'botaoVerificar', '../src/assets/fase1/botaoVerificar.png' );
        this.load.image( 'feedbackAcerto', '../src/assets/fase1/feedbackAcerto.png' );
        this.load.image( 'feedbackErro', '../src/assets/fase1/feedbackErro.png' )
    }

    create() {
      let self = this;
      tela2 = this.add.image(  this.game.renderer.width /2, this.game.renderer.height/2, 'tela2' );

      // Adiciona buffets interativos à cena
      buffet5 = this.add.image( this.game.renderer.width / 2.8, this.game.renderer.height/ 2.3, 'buffet5' ).setInteractive({ useHandCursor: true });
      buffet6 = this.add.image( this.game.renderer.width / 1.56, this.game.renderer.height / 2.3, 'buffet6' ).setInteractive({ useHandCursor: true });
      buffet7 = this.add.image( this.game.renderer.width / 2.8, this.game.renderer.height / 1.5, 'buffet7').setInteractive({ useHandCursor: true });
      buffet8 = this.add.image( this.game.renderer.width / 1.56, this.game.renderer.height / 1.5, 'buffet8' ).setInteractive({ useHandCursor: true });
      setaEsquerda = this.add.image( this.game.renderer.width / 4.56, this.game.renderer.height / 1.2, 'setaEsquerda' ).setInteractive({ useHandCursor: true });

      buffet5.setScale(0.9); // Ajuste a escala conforme necessário
      buffet6.setScale(0.9); // Ajuste a escala conforme necessário
      buffet7.setScale(0.9); // Ajuste a escala conforme necessário
      buffet8.setScale(0.9); // Ajuste a escala conforme necessário
      const items = [buffet5, buffet6, buffet7, buffet8, setaEsquerda];

      // Verifica se um buffet já estava selecionado anteriormente e o pinta novamente
      if ( buffetsSelecionados.buffet5 ) {
        buffet5.setTint( 0x689efc );
      }
      if ( buffetsSelecionados.buffet6 ) {
        buffet6.setTint( 0x689efc );
      }
      if ( buffetsSelecionados.buffet7 ) {
        buffet7.setTint( 0x689efc );
      }
      if ( buffetsSelecionados.buffet8 ) {
        buffet8.setTint( 0x689efc );
      }

      //Adiciona o evento de clique para ir para a próxima fase
      setaEsquerda.on( 'pointerdown', function ( pointer ) {
        self.scene.start( 'Fase1' );
      });
      setaEsquerda.setInteractive({ useHandCursor: true });

      buffet5.on( 'pointerdown', function ( pointer ) {
        toggleTint( buffet5, 'buffet5' );
      });
      buffet5.setInteractive({ useHandCursor: true });

      buffet6.on( 'pointerdown', function ( pointer ) {
        toggleTint( buffet6, 'buffet6' );
      });
      buffet6.setInteractive({ useHandCursor: true });

      buffet7.on( 'pointerdown', function ( pointer ) {
        toggleTint( buffet7, 'buffet7' );
      });
      buffet7.setInteractive({ useHandCursor: true });

      buffet8.on( 'pointerdown', function ( pointer ) {
        toggleTint( buffet8, 'buffet8' );
      });
      buffet8.setInteractive({ useHandCursor: true });

      const posicaoX = this.game.renderer.width;
      const posicaoY = this.game.renderer.height;
      this.listaDeDialogos = ["Esta é a primeira fase. Nela você deverá selecionar os 4 melhores buffets aqui presentes.\n Lembre-se de considerar a diversidade, as avaliações e a missão das empresas, isso \né algo muito importante para a META."];
      this.dialogo = new Assistente(this,  posicaoX/6.8, posicaoY/2.5, 150, 100, this.listaDeDialogos).setScale(0.8);
      this.dialogo.setScrollFactor(0); 
      // Adiciona um botão interativo para verificar se os buffets selecionados estão corretos
      botaoVerificar = this.add.image( this.game.renderer.width /1.3, this.game.renderer.height / 1.23, 'botaoVerificar' ).setInteractive({ useHandCursor: true });
      // Define o evento de clique para verificar a seleção dos buffets
      botaoVerificar.on( 'pointerdown', ( pointer ) => {
          if (( buffetsSelecionados.buffet1 ) && ( buffetsSelecionados.buffet4 ) && ( buffetsSelecionados.buffet5 ) && ( buffetsSelecionados.buffet7 )) {

            // Se os buffets estiverem corretos, exibe um feedback de acerto e avança para a próxima fase
            let feedback = this.add.image( this.game.renderer.width / 2, this.game.renderer.height / 2, 'feedbackAcerto' ).setInteractive({ useHandCursor: true });
            items.forEach(item => item.disableInteractive());
            feedback.on( 'pointerdown', function ( pointer ) {
              if (this === feedback) {
                self.scene.start('Fase2');
              }
            });
          } else {
            let feedback = this.add.image( this.game.renderer.width / 2, this.game.renderer.height / 2, 'feedbackErro' ).setInteractive({ useHandCursor: true });

            // Se os buffets estiverem incorretos, exibe um feedback de erro e retorna para a mesma fase
            feedback.on( 'pointerdown', function ( pointer ) {
              if ( this === feedback ) {
                items.forEach(item => item.disableInteractive());
                self.scene.start( 'Fase1' );
              }
            });
          }
      });
      
      
    // Função interna para alternar a cor dos buffets selecionados
    function toggleTint( obj, key ) {
      if (obj.isTinted) {
        obj.clearTint();
        buffetsSelecionados[key] = false;
      } else {
        obj.setTint( 0x689efc );
        buffetsSelecionados[key] = true;
      }
    }
  }
  
}