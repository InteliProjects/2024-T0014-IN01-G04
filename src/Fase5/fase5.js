// const largura = 896;
// const altura = 576;

import Assistente from "../classes/Assistente.mjs";

export default class Cadastro1 extends Phaser.Scene {
    constructor() {
        super({ key: 'cadastro1' });

        this.nomeFornecedorInput = null;
        this.emailInput = null;
        this.contatoInput = null;
    }

    preload() {
        this.load.image('fundoFase5', 'Fase5/assets/fundoCadastro.png');
        this.load.image('botaoCadastrar', 'Fase5/assets/botaoCadastrar.png');
        this.load.image('feedbackAcerto1Fase5', 'Fase5/assets/feedbackAcerto1.png');
        this.load.image('feedbackErro2Fase5', 'Fase5/assets/feedbackInfoErrada.png');
        this.load.image('feedbackErroFase5', 'Fase5/assets/FeedbackErro.png');
        this.load.image('metaBot', './assets/MetaBOT.png')
    }

    create() {
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'fundoFase5');

        let fornecedor1 = {};

        this.nomeFornecedorInput = this.add.text(this.game.renderer.width/2.68, this.game.renderer.height/2.48, 'Clique para inserir o nome do fornecedor', { font: '24px Arial', fill: '#828282' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.emailInput = this.add.text(this.game.renderer.width/3.2 , this.game.renderer.height/1.85, 'Clique para inserir o Email', { font: '24px Arial', fill: '#828282' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.contatoInput = this.add.text(this.game.renderer.width/3.03, this.game.renderer.height/1.43, 'Clique para inserir o Contato', { font: '24px Arial', fill: '#828282' }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        this.nomeFornecedorInput2 = this.add.text(this.game.renderer.width/2.68, this.game.renderer.height/2.48, 'Clique para inserir o nome do fornecedor', { font: '24px Arial', fill: '#828282' }).setOrigin(0.5).setInteractive({ useHandCursor: true }).setVisible(false);
        this.emailInput2 = this.add.text(this.game.renderer.width/3.2, this.game.renderer.height/1.85, 'Clique para inserir o Email', { font: '24px Arial', fill: '#828282' }).setOrigin(0.5).setInteractive({ useHandCursor: true }).setVisible(false);
        this.contatoInput2 = this.add.text(this.game.renderer.width/3.03, this.game.renderer.height/1.43, 'Clique para inserir o Contato', { font: '24px Arial', fill: '#828282' }).setOrigin(0.5).setInteractive({ useHandCursor: true }).setVisible(false);

        const botaoCadastrar = this.add.image(this.game.renderer.width / 2, 570, 'botaoCadastrar').setInteractive({ useHandCursor: true });

        botaoCadastrar.on('pointerdown', () => {
            if (this.nomeFornecedorInput.text !== '' && this.emailInput.text !== '' && this.contatoInput.text !== '') {
                    fornecedor1.nome = this.nomeFornecedorInput.text.trim();
                    fornecedor1.email = this.emailInput.text.trim();
                    fornecedor1.contato = this.contatoInput.text.trim();
                    if ((this.formatarTexto(fornecedor1.nome) == "metavillefest") && (this.formatarTexto(fornecedor1.email) == "metavillefest@email") && (this.formatarTexto(fornecedor1.contato) == "carol")) {
                        let feedbackAcerto1 = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2, 'feedbackAcerto1Fase5').setInteractive({ useHandCursor: true });
                        feedbackAcerto1.on('pointerdown', () => {
                            this.scene.start('cadastro2');
                        })
                        console.log("Fornecedor 1 cadastrado:", fornecedor1);
                    } else {
                        let feedbackErro = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2, 'feedbackErro2Fase5').setInteractive({ useHandCursor: true })
                        feedbackErro.on('pointerdown', ()=>{
                            this.scene.start('cadastro1');
                        })
                    }
                    this.clearInputs(); // Limpa os campos de entrada após cada cadastro
            } else {
                let feedbackErro = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2, 'feedbackErroFase5').setInteractive({ useHandCursor: true })
                feedbackErro.on('pointerdown', ()=>{
                    this.scene.start('cadastro1')
                })
            }
        });
        const posicaoX = this.game.renderer.width
        const posicaoY = this.game.renderer.height
        
        this.nomeFornecedorInput.on('pointerdown', () => this.inputText(this.nomeFornecedorInput));
        this.emailInput.on('pointerdown', () => this.inputText(this.emailInput));
        this.contatoInput.on('pointerdown', () => this.inputText(this.contatoInput));

        this.listaDeDialogos = ["Parabéns, você atingiu uma nova fase!! \nAgora é hora de cadastrar os fornecedores selecionados nos sistemas da Meta. \nIsso é importante para agilizar o processo de compra e garantir uma integração \neficiente dos fornecedores.",
            "O cadastro do fornecedor é aplicável tanto a fornecedores totalmente novos quanto aos que já se \nenvolveram com a Meta, mas estão 'desativados' no momento. \nSendo recomendado que os fornecedores escolhidos sejam aqueles que já trabalharam conosco no \npassado.",
            "Agora, você precisará cadastrar cada um dos fornecedores selecionados. \nInforme o nome da empresa, o email (use o formato 'nomedaempresa@email') \ne o nome do representante do buffet. Após inserir as informações basta clicar \nem selecionar para efetivar o contrato.",
            "Pronto para integrar nossos fornecedores selecionados e agilizar nossos processos de compra? \nVamos lá!",
            "nome: Metaville Fest \nemail: metavillefest@email \ncontato: Carol"];
        this.dialogo = new Assistente(this,  posicaoX/6.8, posicaoY/2, 150, 100, this.listaDeDialogos).setScale(0.8);
        this.dialogo.setScrollFactor(0);     
    }

    inputText(inputField) {
        const valor = prompt('Insira o valor:');
        if (valor !== null) {
            inputField.text = valor;
        }
    }

    clearInputs() {
        this.nomeFornecedorInput.text = '';
        this.emailInput.text = '';
        this.contatoInput.text = '';
    }

    formatarTexto(texto){
        let txt = texto.trim();
        let t = txt.toLowerCase();
        txt = t.split(" ").join("");
        return txt;
    }
}

export class Cadastro2 extends Phaser.Scene{
    constructor() {
        super({ key: 'cadastro2' });

        this.nomeFornecedorInput = null;
        this.emailInput = null;
        this.contatoInput = null;
    }

    preload() {
        this.load.image('fundoFase5', 'Fase5/assets/fundoCadastro.png');
        this.load.image('botaoCadastrar', 'Fase5/assets/botaoCadastrar.png');
        this.load.image('feedbackAcerto2Fase5', 'Fase5/assets/feedbackAcerto2.png');
        this.load.image('feedbackErroFase5', 'Fase5/assets/FeedbackErro.png');
        this.load.image('feedbackErro2Fase5', 'Fase5/assets/feedbackInfoErrada.png');

    }

    create() {
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'fundoFase5');

        let fornecedor2 = {};
        let primeiroFornecedorCadastrado = false; // Variável de controle para verificar se o primeiro fornecedor foi cadastrado

        this.nomeFornecedorInput = this.add.text(this.game.renderer.width/2.68, this.game.renderer.height/2.48, 'Clique para inserir o nome do fornecedor', { font: '24px Arial', fill: '#828282' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.emailInput = this.add.text(this.game.renderer.width/3.2, this.game.renderer.height/1.85, 'Clique para inserir o Email', { font: '24px Arial', fill: '#828282' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.contatoInput = this.add.text(this.game.renderer.width/3.03, this.game.renderer.height/1.43, 'Clique para inserir o Contato', { font: '24px Arial', fill: '#828282' }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        const botaoCadastrar = this.add.image(this.game.renderer.width / 2, 570, 'botaoCadastrar').setInteractive({ useHandCursor: true });

        botaoCadastrar.on('pointerdown', () => {
            if (this.nomeFornecedorInput.text !== '' && this.emailInput.text !== '' && this.contatoInput.text !== '') {
                    fornecedor2.nome = this.nomeFornecedorInput.text.trim();
                    fornecedor2.email = this.emailInput.text.trim();
                    fornecedor2.contato = this.contatoInput.text.trim();
                    if ((this.formatarTexto(fornecedor2.nome) == "gourmetpark") && (this.formatarTexto(fornecedor2.email) == "gourmetpark@email") && (this.formatarTexto(fornecedor2.contato) == "steve")) {
                        let feedbackAcerto1 = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2, 'feedbackAcerto2Fase5').setInteractive({ useHandCursor: true });
                        feedbackAcerto1.on('pointerdown', () => {
                            this.registry.set("Fase", 6);
                            console.log(this.registry.get("Fase"));
                            this.scene.start("Escritorio");
                        })
                        console.log("Fornecedor 2 cadastrado:", fornecedor2);
                        primeiroFornecedorCadastrado = true; // Define que o primeiro fornecedor foi cadastrado
                    } else {
                        let feedbackErro = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2, 'feedbackErro2Fase5').setInteractive({ useHandCursor: true })
                        feedbackErro.on('pointerdown', ()=>{
                            this.scene.start('cadastro2')
                        })
                    }
                    this.clearInputs(); // Limpa os campos de entrada após cada cadastro
            } else {
                let feedbackErro = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2, 'feedbackErroFase5').setInteractive({ useHandCursor: true })
                feedbackErro.on('pointerdown', ()=>{
                    this.scene.start('cadastro2')
                })
            }
        });
        const posicaoX = this.game.renderer.width
        const posicaoY = this.game.renderer.height
        

        this.nomeFornecedorInput.on('pointerdown', () => this.inputText(this.nomeFornecedorInput));
        this.emailInput.on('pointerdown', () => this.inputText(this.emailInput));
        this.contatoInput.on('pointerdown', () => this.inputText(this.contatoInput));

        this.listaDeDialogos = ["Informe o nome da empresa, o email (use o formato 'nomedaempresa@email') \ne o nome do representante do buffet. Após inserir as informações basta clicar \nem selecionar para efetivar o contrato.",
            "Pronto para integrar nossos fornecedores selecionados e agilizar nossos processos de compra? \nVamos lá!",
            "nome: Gourmet Park \nemail: gourmetpark@email \ncontato: Steve"];
        this.dialogo = new Assistente(this,  posicaoX/6.8, posicaoY/2, 150, 100, this.listaDeDialogos).setScale(0.8);
        this.dialogo.setScrollFactor(0);    
    }

    inputText(inputField) {
        const valor = prompt('Insira o valor:');
        if (valor !== null) {
            inputField.text = valor;
        }
    }

    clearInputs() {
        this.nomeFornecedorInput.text = '';
        this.emailInput.text = '';
        this.contatoInput.text = '';
    }

    formatarTexto(texto){
        let txt = texto.trim();
        let t = txt.toLowerCase();
        txt = t.split(" ").join("");
        return txt;
    }

}