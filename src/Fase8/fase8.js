export default class Fase8 extends Phaser.Scene {
    constructor() {
        super({
            key: "Fase8"
        });
        this.botaoConceito = null;
        this.botaoInformacoes = null;
    }

    preload() {
        this.load.image("TelaInicialPC", "./Fase8/assets/TelaFase8Inicio.png");
        this.load.image("BotaoConceito", "./Fase8/assets/botaoConceito.png");
        this.load.image("BotaoInformacoes", "./Fase8/assets/botaoInformacoes.png");
        this.load.image("BotaoIrFesta", "./Fase8/assets/botaoIrFesta.png");
    }

    create() {
        var blackBackground = this.add.rectangle(0, 0, this.game.renderer.width, this.game.renderer.height, 0x000000);
        blackBackground.setOrigin(0, 0);

        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "TelaInicialPC").setOrigin(0.5).setScale(0.7);

        const centerX = this.game.renderer.width / 2;
        const botaoConceitoY = this.game.renderer.height*0.534;
        const botaoInformacoesY = this.game.renderer.height * 0.64;
        const botaoIrFestaY = this.game.renderer.height * 0.745;

        const botaoWidth = this.game.renderer.width * 0.111;
        const botaoHeight = this.game.renderer.height * 0.064;

        //Definição da posição e tamanho dos botões
        this.botaoConceito = this.add.image(centerX , botaoConceitoY,  "BotaoConceito").setScale(1.24).setInteractive({ useHandCursor: true });
        this.botaoInformacoes = this.add.image(centerX, botaoInformacoesY,  "BotaoInformacoes").setScale(1.24).setInteractive({ useHandCursor: true });
        this.botaoIrFesta = this.add.image(centerX, botaoIrFestaY,  "BotaoIrFesta").setScale(0.8).setInteractive({ useHandCursor: true });
        
        //Evento que redireciona para a tela do conceito de PO
        this.botaoConceito.on('pointerdown', (pointer, localX, localY, event) => {
            this.scene.start('Fase8TelaConceito');
        });
        
        //Evento que encaminha para a tela que mostra as informações que tem no PO
        this.botaoInformacoes.on('pointerdown', (pointer) => {
            this.scene.start("Fase8TelaInformacoes");
        });

        //Evento que redireciona a cena da festa
        this.botaoIrFesta.on('pointerdown', (pointer) => {
            this.scene.start("Festa");
        });
    }

    update() {
    
    }
}