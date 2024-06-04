//Criando um classe denomindada Player que poderá ser importada para outras classes
//para chamar a movimentação do personagem
export default class Player extends Phaser.Physics.Arcade.Sprite {
  cursors; // Variável para armazenar teclas do teclado

  //Criação do construtor da classe pai com os seu parâmetros fornecidos e
  //definição da escala
  constructor(scene, x, y, sprite, scale = 1) {
    super(scene, x, y, sprite).setScale(scale);

    //Criação das teclas e atribuição à variável cursors
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.createPlayer(scene);

    // Definição da profundidade do sprite do jogador
    this.setDepth(10);

    //Definição do tamanho da sprite do jogador
    this.setSize(32, 32);

    //Definição da posição da colisão do personagem
    this.setOffset(0, 32);
  }
  // Chamada ao método para criar o jogador na cena
  createPlayer(_scene) {
    _scene.add.existing(this);
    _scene.physics.add.existing(this);
  }
//Definições da movimentação dos personagem

//Método para a movimentação para a direita do personagem
  moveRight() {
    this.setVelocityX(350);
    this.flipX = false;
    this.anims.play("andando", true);
  }
//Método para a movimentação para a esquerda do personagem
  moveLeft() {
    this.setVelocityX(-350);
    this.flipX = true;
    this.anims.play("andando", true);
  }

  //Método para a movimentação para baixo do personagem
  moveDown() {
    this.setVelocityY(350);
    this.anims.play("andando_baixo", true);
  }

  //Método para a movimentação para cima do personagem
  moveUp() {
    this.setVelocityY(-350);
    this.anims.play("andando_cima", true);
  }

  //Método para controlar a movimentação dos jogadores
  move() {

    // Verifica se as teclas de movimento horizontal e vertical estão pressionadas
    this.runH = this.cursors.left.isDown || this.cursors.right.isDown;
    this.runV = this.cursors.up.isDown || this.cursors.down.isDown;

     // Movimento horizontal
    if (this.cursors.left.isDown && !this.runV) {
      this.moveLeft();
    }
    if (this.cursors.right.isDown && !this.runV) {
      this.moveRight();
    }

    // Movimento vertical
    if (this.cursors.down.isDown && !this.runH) {
      this.moveDown();
    }
    if (this.cursors.up.isDown && !this.runH) {
      this.moveUp();
    }

    // Parar o jogador se nenhuma tecla estiver pressionada
    if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
      this.setVelocityX(0);
    }
    
    if (!this.cursors.up.isDown && !this.cursors.down.isDown) {
      this.setVelocityY(0);
    }

    // Se nenhuma tecla estiver pressionada, reproduz a animação de parado
    if(
      !this.cursors.left.isDown &&
      !this.cursors.right.isDown &&
      !this.cursors.up.isDown &&
      !this.cursors.down.isDown
    ) { this.anims.play("parado", true); }
  }
}