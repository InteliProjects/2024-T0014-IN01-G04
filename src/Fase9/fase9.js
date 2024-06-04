const largura = 896;
const altura = 576;
import Assistente from "../classes/Assistente.mjs";

export default class Fase9tela1 extends Phaser.Scene {
    constructor() {
        super({ key: "Fase9tela1" });
    }

    // Carregando as assets
    preload() {
        this.load.image('telaFundo', 'Fase9/assets/fundoBanco.png');
        this.load.image('botaoEnter', 'Fase9/assets/botao4.png');
    }

    // Dentro do método create() da classe Fase9
    create() {
        // Adiciona a imagem da tela_1
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'telaFundo');

        // Adiciona campos de texto para inserir valores
        this.agenciaInput = this.add.text(this.game.renderer.width/1.75, this.game.renderer.height/2.13, 'Clique para inserir a agência', { font: '24px Arial', fill: '#828282' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.contaInput = this.add.text(largura/1.4, this.game.renderer.height/1.67, 'Clique para inserir a conta', { font: '24px Arial', fill: '#828282' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.valorInput = this.add.text(largura/1.4, this.game.renderer.height/1.37, 'Clique para inserir o valor', { font: '24px Arial', fill: '#828282' }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        // Adiciona um botão para o jogador confirmar os dados inseridos
        const botaoConfirmar = this.add.image(this.game.renderer.width/2, this.game.renderer.height/1.24, 'botaoEnter').setScale();
        botaoConfirmar.setInteractive({ useHandCursor: true });
        botaoConfirmar.on('pointerdown', () => {
            const agencia = this.agenciaInput.text.trim();
            const conta = this.contaInput.text.trim();
            const valor = this.valorInput.text.trim();
            if (agencia === '4321' && conta === '20042021' && (valor === '12.000' || valor === '12,000' || valor === '12000')) {
                console.log('Valores corretos!');
                this.scene.start('Fase9tela2');
            } else {
                console.log('Valores incorretos!');
                this.scene.start('Fase9tela3');
            }
        });

        // Adiciona eventos de clique para os campos de texto
        this.agenciaInput.on('pointerdown', () => this.inputText(this.agenciaInput));
        this.contaInput.on('pointerdown', () => this.inputText(this.contaInput));
        this.valorInput.on('pointerdown', () => this.inputText(this.valorInput));

        const posicaoX = this.game.renderer.width;
        const posicaoY = this.game.renderer.height;

        this.listaDeDialogos = ["Agora, você deve preencher as informações corretamente para realizar \na transferência bancária ao fornecedor.\nPara isso, insira a agência, conta e valor respectivamente.",
    "Lembre-se que essas informações se econtram na PO.",
    "Agência: 4321 \nConta: 20042021 \nValor: 12.000"];
    this.dialogo = new Assistente(this,  posicaoX/6.8, posicaoY/2, 150, 100, this.listaDeDialogos).setScale(0.8);
    this.dialogo.setScrollFactor(0);  
    }

    // Função para receber a entrada de texto do jogador
    inputText(inputField) {
        const valor = prompt('Insira o valor:');
        if (valor !== null) {
            inputField.text = valor;
        }
    }
}

//Tela 2
export class Fase9tela2 extends Phaser.Scene {
    constructor() {
        super({ key: "Fase9tela2" });
    }

    // Carregando as assets
    preload() {
        this.load.image('botao_2', 'Fase9/assets/botao2.png');
        this.load.image('tela_2', 'Fase9/assets/feedbackSucesso.png');
    }

    // Dentro do método create() da classe Fase9
    create() {
        // Adiciona a imagem da tela_2
        const tela = this.add.image(this.game.renderer.width/2, this.game.renderer.height   /2, 'tela_2');
        setTimeout(() => { 
            this.scene.start("Fase10");
        }, 3000);
    }
}

//Tela 3
export class Fase9tela3 extends Phaser.Scene {
    constructor() {
        super({ key: 'Fase9tela3' });
    }

    // Carregando as assets
    preload() {
        this.load.image('botao_3', 'Fase9/assets/botao3.png');
        this.load.image('tela_3', 'Fase9/assets/feedbackerror.png');
    }

    // Dentro do método create()
    create() {
        // Adiciona a imagem da tela_3
        this.add.image(this.game.renderer.width/2, this.game.renderer.height    /2, 'tela_3');

        // Adiciona as imagens dos botões
        const botao3 = this.add.image(this.game.renderer.width/2, this.game.renderer.height /1.28, 'botao_3').setScale(0.5);

        // Adiciona um evento de clique ao botao_3
        botao3.setInteractive({ useHandCursor: true });
        botao3.on('pointerdown', () => {
            // Inicia a fase9tela1
            this.scene.start('Fase9tela1');
        });
    }
}
