export default class Carousel extends Phaser.Scene {
    // Método Construtor da Classe Carrossel
    constructor(){
        super({ key: 'Carousel' });
        this.rightArrow;
        this.leftArrow;
        this.sprites = [];
        this.startButton;
        this.downFlag = false;
    }

    preload(){
        // Carregamento das imagens
        this.load.image('background', '../assets/carroselBG.png');
        this.load.image('right', '../assets/direita.png');
        this.load.image('left', '../assets/esquerda.png');
        this.load.image('startButton', '../assets/start.png');

        this.spritePaths = [
          './assets/Personagens/sprite_jose.png',
          './assets/Personagens/sprite_esperanza.png',
          './assets/Personagens/sprite_taylor.png',
          './assets/Personagens/sprite_klaus.png',
        ]

        this.spriteNames = ['jose', 'esperanza', 'taylor', 'klaus'];

        // Carregamento das spritesheets
        this.load.spritesheet(this.spriteNames[0], this.spritePaths[0], { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet(this.spriteNames[1], this.spritePaths[1], { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet(this.spriteNames[2], this.spritePaths[2], { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet(this.spriteNames[3], this.spritePaths[3], { frameWidth: 32, frameHeight: 64 });
    }

    create(){

        this.cursors = this.input.keyboard.createCursorKeys();
        console.log(this.game.renderer.height);
        // Adição dos Assets na tela do jogo
        let bg = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2, 'background')
        let scaleX = this.cameras.main.width / bg.width;
        let scaleY = this.cameras.main.height / bg.height;
        let scale = Math.max(scaleX, scaleY);
        bg.setScale(scale).setScrollFactor(0);

        this.leftArrow = this.add.image(500, this.game.renderer.height / 2 + 150, 'left').setScale(0.2);
        this.rightArrow = this.add.image(this.game.renderer.width - 500, this.game.renderer.height / 2 + 150, 'right').setScale(0.2);
        
        this.sprites[0] = this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, this.spriteNames[0]).setScale(5).setVisible(true);
        this.sprites[1] = this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, this.spriteNames[1]).setScale(5).setVisible(false);
        this.sprites[2] = this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, this.spriteNames[2]).setScale(5).setVisible(false);
        this.sprites[3] = this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, this.spriteNames[3]).setScale(5).setVisible(false);
        this.startButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height - 50, 'startButton').setInteractive({ useHandCursor: true });

        // Definição das Setas da Esquerda e da Direita como interativas
        this.rightArrow.setInteractive({ useHandCursor: true });
        this.leftArrow.setInteractive({ useHandCursor: true }); 
        this.counter = 0;

        // Criação das animações para os Sprites
        for(let i = 1; i <= 4; i++){
            this.anims.create({
                key: `walk${i}`,
                frames: this.anims.generateFrameNumbers(this.spriteNames[i - 1], { start: 0, end: 1 }),
                frameRate: 3,
                repeat: -1
            });
        }
        
        //Inicia as animações das sprites
        this.sprites[0].play('walk1', true);
        this.sprites[1].play('walk2', true);
        this.sprites[2].play('walk3', true);
        this.sprites[3].play('walk4', true);

        // Configura os eventos de clique para as setas
        this.rightArrow.on('pointerup', () => {
            this.sprites[this.counter].setVisible(false);
            if(this.counter < this.sprites.length - 1){
                this.counter++;
            }else{
                this.counter = 0;
            }
            this.sprites[this.counter].setVisible(true);
        })
        this.leftArrow.on('pointerup', () => {
            this.sprites[this.counter].setVisible(false);
            if (this.counter > 0) {
              this.counter--;
            } else {
              this.counter = this.sprites.length-1;
            }
            this.sprites[this.counter].setVisible(true);
        })
        


        // Configura o botão de clique para o botão de iniciar
        this.startButton.on('pointerup', () => {
            switch(this.counter){
                case 0:
                    this.registry.set("Personagem", "José");
                    break;
                case 1:
                    this.registry.set("Personagem", "Esperanza");
                    break;
                case 2:
                    this.registry.set("Personagem", "Taylor");
                    break;
                case 3:
                    this.registry.set("Personagem", "Klaus");
                    break;
            }
            // this.scene.start('Loading', { spritePath: `../assets/Personagens/Personagem${this.counter + 2}/personagem${this.counter + 2}.png` });
            this.scene.start('Loading', { spritePath: this.spritePaths[this.counter] });
        });
        this.startButton.setInteractive({ useHandCursor: true });

        this.input.keyboard.on('keydown-ENTER', () => {
            // this.scene.start('Loading', { spritePath: `../assets/Personagens/Personagem${this.counter + 2}/personagem${this.counter + 2}.png` });
            switch(this.counter){
                case 0:
                    this.registry.set("Personagem", "José");
                    break;
                case 1:
                    this.registry.set("Personagem", "Esperanza");
                    break;
                case 2:
                    this.registry.set("Personagem", "Taylor");
                    break;
                case 3:
                    this.registry.set("Personagem", "Klaus");
                    break;
            }
            this.scene.start('Loading', { spritePath: this.spritePaths[this.counter] });
        })
    };

    update(){
        //Criando os eventos de teclas:
        if(this.cursors.right.isDown && this.cursors.left.isUp){
            if(!this.downFlag){
                this.sprites[this.counter].setVisible(false);
                if(this.counter < this.sprites.length - 1){
                    this.counter++;
                }else{
                    this.counter = 0;
                }
                this.sprites[this.counter].setVisible(true);
                this.downFlag = true;
            }
        }else if(this.cursors.left.isDown && this.cursors.right.isUp){
            if(!this.downFlag){
                this.sprites[this.counter].setVisible(false);
                if(this.counter > 0){
                    this.counter--;
                }else{
                    this.counter = this.sprites.length - 1;
                }
                this.sprites[this.counter].setVisible(true);
                this.downFlag = true;
            }
        }else{
            this.downFlag = false;
        }
    }
}