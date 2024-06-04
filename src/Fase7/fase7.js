import Assistente from "../classes/Assistente.mjs";
export default class Fase7 extends Phaser.Scene {
    constructor() {
        super({ key: 'Fase7' });
    }

    preload() {
        //Carrega as imagens necessárias
        this.load.image('bg', '../src/assets/Fase7/Tela.png');
        this.load.image('circulo', '../src/assets/Fase7/botaoVazio.png');
        this.load.image('circuloazul', '../src/assets/Fase7/botaoSelecionado.png');
        this.load.image('telaAcerto', '../src/assets/Fase7/feedbackAcerto.png');
        this.load.image('proximaFase', '../src/assets/Fase7/proximaFase.png');
        this.load.image('circuloverde', '../src/assets/Fase7/botaoCompleto.png');
    }

    create() {
        const width = this.game.renderer.width;
        const height = this.game.renderer.height;

        //Pontuacao:
        this.score = {preco: false, prazo: false, clausula: false};

        //Definindo o plano de fundo
        const background = this.add.image(width/2, height/2, 'bg');
        let scaleX = width / background.width;
        let scaleY = height / background.height;
        let scale = Math.max( scaleX, scaleY );
        background.setScale(scale).setScrollFactor(0);

        //Criando os botões principais
        const circuloPreco = this.add.image(width / 3.6, height / 2.5, 'circulo').setScale(2);
        const circuloClausula = this.add.image(width / 2.8, height / 1.74, 'circulo').setScale(2);
        const circuloPrazo = this.add.image(width / 3.6, height / 1.32, 'circulo').setScale(2);

        //Criando os botões secundários
        const circuloPrecoErrado = this.add.image(width / 1.57, height / 3.45, 'circulo').setInteractive({ useHandCursor: true }).setScale(2);
        const circuloPrecoCerto = this.add.image(width / 1.63, height / 1.16, 'circulo').setInteractive({ useHandCursor: true }).setScale(2);
        const circuloPrazoErrado = this.add.image(width / 1.57, height / 2.11, 'circulo').setInteractive({ useHandCursor: true }).setScale(2);
        const circuloPrazoCerto = this.add.image(width / 1.57, height / 2.64, 'circulo').setInteractive({ useHandCursor: true }).setScale(2);
        const circuloClausulaCerto = this.add.image(width/2.09, height/1.7, 'circulo').setInteractive({ useHandCursor: true }).setScale(2);
        const circuloClausulaErrado = this.add.image(width/2, height/1.35, 'circulo').setInteractive({ useHandCursor: true }).setScale(2);
        const CirculosDireita = [circuloPrecoCerto, circuloClausulaCerto, circuloClausulaErrado, circuloPrecoErrado, circuloPrazoCerto, circuloPrazoErrado];
        const CirculosEsquerda = [circuloPreco, circuloClausula, circuloPrazo];
        let selected;

        //Criando as linhas
        const precoLine = this.add.graphics();
        const clausulaLine = this.add.graphics();
        const prazoLine = this.add.graphics();

        const linhas = [precoLine, clausulaLine, prazoLine]

        //Tornando os botões interativos:
        CirculosEsquerda.forEach(obj => obj.setInteractive({ useHandCursor: true }));


        // Adiciona a funcionalidade de escolha do preço
        circuloPreco.on('pointerdown', () => {

            // Desabilita outros botões e habilita os secundários
            CirculosEsquerda.forEach(obj => obj.disableInteractive());
            CirculosDireita.forEach(obj => obj.setInteractive({ useHandCursor: true }));
            selected = "preco";
            circuloPreco.setTexture('circuloazul');

            // Desenha uma linha conforme o movimento do mouse
            this.input.on("pointermove", pointer => {
                precoLine.clear();
                precoLine.lineStyle(5, 0x000000);
                precoLine.moveTo(circuloPreco.x, circuloPreco.y);
                precoLine.lineTo(pointer.x, pointer.y);
                precoLine.strokePath();
            })
        });

        // Adiciona funcionalidade para botão de preço errado
        circuloPrecoErrado.on('pointerdown', () => {

            // Limpa a linha e reseta as seleções
            this.input.off('pointermove');
            linhas.forEach(linha => linha.clear());
            selected = undefined;
            CirculosEsquerda.forEach(obj => obj.setTexture('circulo'));
            CirculosEsquerda.forEach(obj => obj.setInteractive({ useHandCursor: true }));
            CirculosDireita.forEach(obj => obj.disableInteractive());
            CirculosDireita.forEach(obj => setTexture('circulo'));
            this.score.preco = false;
            this.score.clausula = false;
            this.score.prazo = false;
        });

        // Adiciona funcionalidade para botão de preço correto
        circuloPrecoCerto.on('pointerdown', () => {
            this.input.off('pointermove');
            if(selected !== "preco"){

                 // Se não foi selecionado corretamente, reseta as seleções
                precoLine.clear();
                CirculosEsquerda.forEach(obj => obj.setTexture('circulo'));
                CirculosDireita.forEach(obj => obj.setTexture('circulo'));
                this.score.preco = false;
                this.score.clausula = false;
                this.score.prazo = false;
                linhas.forEach(linha => linha.clear());
                selected = undefined;
            }else{
                
                // Se foi selecionado corretamente, marca a seleção
                this.score.preco = true;
                circuloPrecoCerto.setTexture('circuloverde')
            }
            CirculosEsquerda.forEach(obj => obj.setInteractive({ useHandCursor: true }));
            CirculosDireita.forEach(obj => obj.disableInteractive());

           // Verifica se todas as seleções estão corretas para mostrar a tela de acerto
            if(this.score.preco && this.score.prazo && this.score.clausula){
                CirculosDireita.forEach(obj => obj.disableInteractive());
                CirculosEsquerda.forEach(obj => obj.disableInteractive());
                this.acerto = this.add.image(width/2, height/2, 'telaAcerto');
                this.proximafase = this.add.image(width/2, height/2 + 250, "proximaFase")
                    .setScale(2)
                    .setInteractive({ useHandCursor: true });
                this.proximafase.on('pointerdown', () => {
                    this.registry.set("Fase", 8);
                    this.scene.start("Buffet3");
                })
            }
            
        });

        // Adiciona funcionalidade para botão de cláusula
        circuloClausula.on('pointerdown', () => {
            CirculosEsquerda.forEach(obj => obj.disableInteractive());
            CirculosDireita.forEach(obj => obj.setInteractive({ useHandCursor: true }));
            selected = "clausula";
            circuloClausula.setTexture('circuloazul');
            this.input.on('pointermove', pointer => {
                clausulaLine.clear();
                clausulaLine.lineStyle(5, 0x000000);
                clausulaLine.moveTo(circuloClausula.x, circuloClausula.y);
                clausulaLine.lineTo(pointer.x, pointer.y);
                clausulaLine.strokePath();
            })

        });
        
        // Evento de clique no botão de cláusula incorreta
        circuloClausulaErrado.on('pointerdown', () => {
            //Erro total
            this.input.off('pointermove');
            linhas.forEach(linha => linha.clear());
            selected = undefined;
            CirculosEsquerda.forEach(obj => obj.setTexture('circulo'));
            CirculosEsquerda.forEach(obj => obj.setInteractive({ useHandCursor: true }));
            CirculosDireita.forEach(obj => obj.disableInteractive());
            CirculosDireita.forEach(obj => obj.setTexture('circulo'));
            this.score.preco = false;
            this.score.clausula = false;
            this.score.prazo = false;
        });

        // Evento de clique no botão de cláusula correta
        circuloClausulaCerto.on('pointerdown', () => {
            this.input.off('pointermove');
            if(selected !== "clausula"){
                //Erro
                CirculosEsquerda.forEach(obj => obj.setTexture('circulo'));
                CirculosDireita.forEach(obj => obj.setTexture('circulo'));
                this.score.preco = false;
                this.score.clausula = false;
                this.score.prazo = false;
                linhas.forEach(linha => linha.clear());
                selected = undefined;
            }else{
                //Acerto
                this.score.clausula = true;
                circuloClausulaCerto.setTexture('circuloverde');
            }
            CirculosEsquerda.forEach(obj => obj.setInteractive({ useHandCursor: true }));
            CirculosDireita.forEach(obj => obj.disableInteractive());

             // Condição de vitória: todas as pontuações devem ser verdadeiras
            if(this.score.preco && this.score.prazo && this.score.clausula){
                CirculosDireita.forEach(obj => obj.disableInteractive());
                CirculosEsquerda.forEach(obj => obj.disableInteractive());
                this.acerto = this.add.image(width/2, height/2, 'telaAcerto');
                this.proximafase = this.add.image(width/2, height/2 + 250, "proximaFase")
                    .setScale(2)
                    .setInteractive({ useHandCursor: true });
                this.proximafase.on('pointerdown', () => {
                    this.registry.set("Fase", 8);
                    this.scene.start("Buffet3");
                })
            }
        });

        // Evento de clique no botão de prazo para escolher o prazo
        circuloPrazo.on('pointerdown', () => {
            CirculosEsquerda.forEach(obj => obj.disableInteractive());
            CirculosDireita.forEach(obj => obj.setInteractive({ useHandCursor: true }));
            selected = "prazo";
            circuloPrazo.setTexture('circuloazul');
            this.input.on('pointermove', pointer => {
                prazoLine.clear();
                prazoLine.lineStyle(5, 0x000000);
                prazoLine.moveTo(circuloPrazo.x, circuloPrazo.y);
                prazoLine.lineTo(pointer.x, pointer.y);
                prazoLine.strokePath();
            })
        });

        // Evento de clique no botão de prazo incorreto
        circuloPrazoErrado.on('pointerdown', () => {
            //Erro
            this.input.off('pointermove');
            linhas.forEach(linha => linha.clear());
            selected = undefined;
            CirculosEsquerda.forEach(obj => obj.setTexture('circulo'));
            CirculosEsquerda.forEach(obj => obj.setInteractive({ useHandCursor: true }));
            CirculosDireita.forEach(obj => obj.disableInteractive());
            CirculosDireita.forEach(obj => obj.setTexture('circulo'));
            this.score.preco = false;
            this.score.clausula = false;
            this.score.prazo = false;
        });

        // Evento de clique no botão de prazo correto
        circuloPrazoCerto.on('pointerdown', () => {
            this.input.off('pointermove');
            if(selected !== "prazo"){
                
                // Se não estiver selecionado corretamente, marca como erro e reseta a seleção e a pontuação
                CirculosEsquerda.forEach(obj => obj.setTexture('circulo'));
                CirculosDireita.forEach(obj => obj.setTexture('circulo'));
                this.score.preco = false;
                this.score.clausula = false;
                this.score.prazo = false;
                linhas.forEach(linha => linha.clear());
                selected = undefined;
            }else{
                // Se estiver selecionado corretamente, marca como acerto na pontuação
                this.score.prazo = true;
                circuloPrazoCerto.setTexture('circuloverde');
            }
            CirculosEsquerda.forEach(obj => obj.setInteractive({ useHandCursor: true }));
            CirculosDireita.forEach(obj => obj.disableInteractive());

            // Condição de vitória: todas as pontuações devem ser verdadeiras
            if(this.score.preco && this.score.prazo && this.score.clausula){
                CirculosDireita.forEach(obj => obj.disableInteractive());
                CirculosEsquerda.forEach(obj => obj.disableInteractive());
                this.acerto = this.add.image(width/2, height/2, 'telaAcerto');
                this.proximafase = this.add.image(width/2, height/2 + 250, "proximaFase")
                    .setScale(2)
                    .setInteractive({ useHandCursor: true });
                this.proximafase.on('pointerdown', () => {
                    this.registry.set("Fase", 8);
                    this.scene.start("Buffet3");
                })
            }
        })

        this.listaDeDialogos = ["Para concluir esta fase, é necessário conectar o que está na esquerda com o que está na direita \nPara isso, clique com o mouse na 'bolinha' referente a cada tópico e depois clique na 'bolinha'\ndo tópico correspondente."];
        this.dialogo = new Assistente(this,  width/6.8, height/2, 150, 100, this.listaDeDialogos).setScale(0.8);
        this.dialogo.setScrollFactor(0);  

    }
}
