import Assistente from "../classes/Assistente.mjs";

export default class Fase6 extends Phaser.Scene{

    constructor(){
        super({ key: "Fase6" });
    }

    preload(){
        //Carrega os assets
        this.load.image("fundo6", "../src/assets/fase6/Tela.png");
        this.load.image("botaoX", "../src/assets/fase6/x.png");
        this.load.image("heart", "../src/assets/fase6/coraçãolike.png");
        this.load.image("metaville", "../src/assets/fase6/1.png");
        this.load.image("gourmetPark", "../src/assets/fase6/2.png");
        this.load.image("seta", "../src/assets/fase6/seta.png");
        this.load.image("erro", "../src/assets/fase6/feedbackErro.png");
        this.load.image("tryagain", "../src/assets/fase6/tryagain.png");
        this.load.image("acerto", "../src/assets/fase6/feedbackAcerto.png");
        this.load.image("proximaFase", "../src/assets/fase6/proximaFase.png");
        this.load.image("metaBot", './assets/MetaBOT.png');
    }

    create(){
        console.log(this.registry.get('Fase'))
        const width =  this.game.renderer.width;
        const height = this.game.renderer.height;

        // Adiciona a imagem de fundo
        this.fundo = this.add.image(width/2, height/2, "fundo6");
        let scaleX = width / this.fundo.width;
        let scaleY = height / this.fundo.height;
        let scale = Math.max( scaleX, scaleY );
        this.fundo.setScale(scale).setScrollFactor(0);

        // Adiciona os sprites dos buffets (opções) e define o selecionado como "metaville"
        this.metaville = this.add.image(width/2, height/2 + 50, "metaville").setScale(2);
        this.gourmetPark = this.add.image(width/2, height/2 + 50, "gourmetPark")
            .setScale(2)
            .setVisible(false);
        
        this.selected = this.metaville;

        //Adiciona os botões
        this.likeButton = this.add.image(width-300, height/2 + 50, "heart")
            .setScale(3)
            .setInteractive({ useHandCursor: true });
        
        this.botaoX = this.add.image(300, height/2 + 50, "botaoX")
            .setScale(3)
            .setInteractive({ useHandCursor: true });
             
        this.setaDireita = this.add.image(width/2 + 335, height - 130, "seta")
            .setScale(10)
            .setInteractive({ useHandCursor: true });
        
        this.setaEsquerda = this.add.image(width/2 - 335, height - 130, "seta")
            .setScale(10)
            .setFlipX(true)
            .setInteractive({ useHandCursor: true });
        
         // Define as ações a serem executadas quando os botões são clicados
        this.likeButton.on('pointerdown', () => {
          this.interactiveImages.forEach(obj => obj.disableInteractive());
          if (this.selected == this.metaville) {
            // Mostra a mensagem de acerto e o botão para a próxima fase
            this.telaAcerto = this.add.image(width/2, height/2, "acerto");
            this.proximafase = this.add.image(width/2, height/2 + 250, "proximaFase")
              .setScale(2)
              .setInteractive({ useHandCursor: true });
              // Define a ação para o botão da próxima fase
            this.proximafase.on('pointerdown', () => {
              // Define a próxima fase no registro do jogo e inicia a cena correspondente
              this.registry.set("Fase", 7)
              this.scene.start("Tribunal")
            })
          } else {
            // Mostra a mensagem de erro e o botão para tentar novamente
            this.telaErro = this.add.image(width/2, height/2, "erro");
            this.tryagainButton = this.add.image(width/2, height/2 + 250, "tryagain")
              .setScale(2)
              .setInteractive({ useHandCursor: true });

            // Define a ação para o botão de tentar novamente
            this.tryagainButton.on('pointerdown', () => {
              // Remove a mensagem de erro e reabilita a interação com os elementos interativos
              this.telaErro.destroy();
              this.tryagainButton.destroy();
              this.interactiveImages.forEach(obj => obj.setInteractive({ useHandCursor: true }));
            })
          }
        })

        this.botaoX.on('pointerdown', () =>{

            // Desabilita a interação com todos os elementos interativos
            this.interactiveImages.forEach(obj => obj.disableInteractive());

            // Verifica se o buffet selecionado é o correto
            if(this.selected == this.metaville){

                // Mostra a imagem de erro e o botão "Tentar Novamente"
                this.telaErro = this.add.image(width/2, height/2.2, "erro");
                this.tryagainButton = this.add.image(width/2, height/2 + 250, "tryagain")
                    .setScale(2)
                    .setInteractive({ useHandCursor: true });

                // Define a ação do botão "Tentar Novamente"
                this.tryagainButton.on('pointerdown', () => {

                    // Remove a tela de erro e o botão "Tentar Novamente"
                    this.telaErro.destroy();
                    this.tryagainButton.destroy();

                    // Reabilita a interação com os elementos
                    this.interactiveImages.forEach(obj => obj.setInteractive({ useHandCursor: true }));
                })
            }else if(this.selected == this.gourmetPark){

                // Mostra a imagem de acerto e o botão "Próxima Fase"
                this.telaAcerto = this.add.image(width/2, height/2, "acerto");
                this.proximafase = this.add.image(width/2, height/2 + 250, "proximaFase")
                    .setScale(2)
                    .setInteractive({ useHandCursor: true });

                // Define a ação do botão "Próxima Fase"
                this.proximafase.on('pointerdown', () => {

                    // Define a próxima fase e inicia a cena correspondente
                    this.registry.set("Fase", { fase: 7});
                    this.scene.start("Tribunal")
                })
            }
        })

        
        // Define a ação do botão para avançar para a próxima fase
        this.setaDireita.on('pointerdown', () => {

            // Alterna entre as imagens dos buffets
            if(this.selected == this.metaville){
                this.metaville.setVisible(false);
                this.gourmetPark.setVisible(true);
                this.selected = this.gourmetPark;
            }else{
                this.metaville.setVisible(true);
                this.gourmetPark.setVisible(false);
                this.selected = this.metaville;
            }
        });

        // Define a ação do botão para voltar para a fase anterior 
        this.setaEsquerda.on('pointerdown', () => {

            // Alterna entre as imagens dos buffets 
            if(this.selected == this.metaville){
                this.metaville.setVisible(false);
                this.gourmetPark.setVisible(true);
                this.selected = this.gourmetPark;
            }else{
                this.metaville.setVisible(true);
                this.gourmetPark.setVisible(false);
                this.selected = this.metaville;
            }
        });

        // Define os elementos interativos da cena
        this.interactiveImages = [this.likeButton, this.botaoX, this.setaDireita, this.setaEsquerda];
        const posicaoX = this.game.renderer.width;
        const posicaoY = this.game.renderer.height;
        this.listaDeDialogos = ["Para selecionar sua escolha, basta clicar no botão 'Like' para o fornecedor que você considera \nmais adequado. Se preferir recusar um fornecedor, clique no botão 'X'."];
        this.dialogo = new Assistente(this,  posicaoX/6.8, posicaoY/2, 150, 100, this.listaDeDialogos).setScale(0.8);
        this.dialogo.setScrollFactor(0);     
        
    }

    

}