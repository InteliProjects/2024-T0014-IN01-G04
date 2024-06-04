import Dialogo from "../classes/Dialogo.mjs";

export default class TelaInicial extends Phaser.Scene{
    constructor (){
        super({ key: 'TelaInicial' });
        //Variáveis auxiliares para a tela inicial.
        this.languages = ['br', 'us'];
        this.counter = 0;
    }

    preload(){
        //Carregando as imagens:
        this.load.image( "fundo", "../assets/inicioBG.png" );
        this.load.image( "botao", "../assets/start.png" );
    }

    create(){
        //Adicionando o Background:
        let image = this.add.image( this.cameras.main.width/2, this.cameras.main.height/2, "fundo" );
        let scaleX = this.cameras.main.width / image.width;
        let scaleY = this.cameras.main.height / image.height;
        let scale = Math.max( scaleX, scaleY );
        image.setScale(scale).setScrollFactor(0);

        //Colocando os botões da tela:
        const startButton = this.add.image( this.game.renderer.width/2, this.game.renderer.height - 150, 'botao' );
        startButton.setScale( 1.2 );

        //Adicionando interatividade nos botões:
        startButton.setInteractive({ useHandCursor: true });

        //Colocando as funções:
        startButton.on( 'pointerup', () => this.scene.start( 'Carousel' ));
    }
}