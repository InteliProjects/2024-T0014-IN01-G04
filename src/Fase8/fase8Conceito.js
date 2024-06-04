// const largura = 896;
// const altura = 576;



export default class Fase8TelaConceito extends Phaser.Scene {
    constructor() {
        super({ key: "Fase8TelaConceito" });
    }

    preload() {
        this.load.image("TelaConceitoPO", "./Fase8/assets/TelaFase8ConceitoPO.png");
        this.load.image("BotaoVoltar1", "./Fase8/assets/botaoVoltar1.png");
        
    }

    create() {

        //Criação da tela de conceito e do botão de voltar
         let telaConceito = this.add.image(this.game.renderer.width/2 , this.game.renderer.height/2, "TelaConceitoPO").setOrigin(.50,.50).setScale(0.7); 
        let botaoVoltar1 = this.add.image(this.game.renderer.width/2 , this.game.renderer.height/1.4, "BotaoVoltar1").setScale(1.3).setInteractive();

        //Evento que retorna para a tela inicial da fase 8
        botaoVoltar1.on('pointerdown', ()=> {
            this.scene.start("Fase8");  
        })
    }

}

