import Assistente from "../classes/Assistente.mjs";
// const largura = 896;
// const altura = 576;

var tela1;
var tela2;
var buffet1;
var buffet2;
var buffet3;
var buffet4;
var botaoVerificar;

export default class Fase3 extends Phaser.Scene {
  constructor() {
    super({ key: 'Fase3' });

    this.respostasBuffets = {
      buffet1: false,
      buffet2: false,
      buffet3: false,
      buffet4: false,
    };
  }

  preload() {
    this.load.image( 'tela3', '../src/Fase2/assets/tela1.png' );
    this.load.image( 'buffet1card', 'Fase3/assets/buffet1.png' );
    this.load.image( 'buffet2card', 'Fase3/assets/buffet3.png' );
    this.load.image( 'buffet3card', 'Fase3/assets/buffet2.png' );
    this.load.image( 'buffet4card', 'Fase3/assets/buffet4.png' );
    this.load.image( 'botaoVerificar', 'Fase3/assets/botaoVerificar.png' );
    this.load.image( 'feedbackAcerto', 'Fase3/assets/feedbackAcerto.png' );
    this.load.image( 'feedbackErro', 'Fase3/assets/feedbackErro.png' );
  }

  create() {
    this.registry.set("Fase", 3);

    tela1 = this.add.image( this.game.renderer.width / 2, this.game.renderer.height/ 2, 'tela3' );
    const posX = this.game.renderer.width / 2.65;

    // Adiciona os sprites dos buffets e os torna interativos
    buffet1 = this.add.image( posX - 140, this.game.renderer.height / 1.9, 'buffet1card' ).setInteractive({ useHandCursor: true });
    buffet2 = this.add.image( posX + 60, this.game.renderer.height / 1.9, 'buffet2card' ).setInteractive({ useHandCursor: true });
    buffet3 = this.add.image( posX + 260, this.game.renderer.height / 1.9, 'buffet3card' ).setInteractive({ useHandCursor: true });
    buffet4 = this.add.image( posX + 460, this.game.renderer.height / 1.9, 'buffet4card' ).setInteractive({ useHandCursor: true });

    // Adiciona o botão de verificar e o torna interativo
    botaoVerificar = this.add.image( this.game.renderer.width / 1.29, this.game.renderer.height  / 1.26, 'botaoVerificar' ).setInteractive({ useHandCursor: true });

    // Array contendo os sprites dos buffets
    this.buffets = [buffet1, buffet2, buffet3, buffet4];

    // Define a funcionalidade dos sprites dos buffets ao serem clicados
    this.buffets.forEach((buffet, index) =>
      buffet.on('pointerup', () => {
        if (buffet.isTinted) {
          this.respostasBuffets[`buffet${index + 1}`] = false;
          buffet.clearTint();
        } else {
          this.respostasBuffets[`buffet${index + 1}`] = true;
          buffet.setTint(0x689efc);
        }
        console.log(this.respostasBuffets);
      })
    );
    this.respostaCorreta = false;
    const posicaoX = this.game.renderer.width;
    const posicaoY = this.game.renderer.height;
    this.listaDeDialogos = ["Agora que você conheceu mais afundo os buffets, selecione os 3 melhores."];
    this.dialogo = new Assistente(this,  posicaoX/6.8, posicaoY/2.5, 150, 100, this.listaDeDialogos).setScale(0.8);
    this.dialogo.setScrollFactor(0);  

    botaoVerificar.on('pointerdown', (pointer) => {
      // Check if all the required buffets are selected
      if (this.respostasBuffets.buffet1 && !this.respostasBuffets.buffet2 && this.respostasBuffets.buffet3 && this.respostasBuffets.buffet4) {
        this.respostaCorreta = true;
      }
  
    if (this.respostaCorreta) {
      this.registry.set("Fase", 4);
    } else {
      this.respostasBuffets = {
        buffet1: false,
        buffet2: false,
        buffet3: false,
        buffet4: false,
      };
    }
  
    // Display feedback and start the next scene accordingly
    let feedback = this.add.image(
        this.game.renderer.width / 2, this.game.renderer.height / 2,
        this.respostaCorreta? 'feedbackAcerto' : 'feedbackErro'
    ).setInteractive({ useHandCursor: true });
    feedback.on('pointerdown', (pointer) => this.scene.start(this.respostaCorreta? "Cidade" : "Fase3"));
  }); 
  }
}