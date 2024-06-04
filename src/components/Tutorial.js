import Player from "../classes/Player.mjs";

export default class Tutorial extends Phaser.Scene {
  constructor() {
    super({ key: "Tutorial" });
  }
  
  preload() {
    this.load.image('arrowLeft', '../assets/keyboardArrows/leftarrow.png');
    this.load.image('arrowRight', '../assets/keyboardArrows/rightarrow.png');
    this.load.image('arrowUp', '../assets/keyboardArrows/uparrow.png');
    this.load.image('arrowDown', '../assets/keyboardArrows/downarrow.png');
    this.load.image('space', '../assets/keyboardArrows/spacebar.png');
    this.load.image('mKey', '../assets/keyboardArrows/mkey.png');
    this.load.image('enter', '../assets/enter.png');
    this.load.image('esc', '../assets/esc.png');
    this.load.image('botaoConfirmarTutorial', '../assets/botaoConfirmar.png');
    this.load.image('tutorialBG', '../assets/tutorialBG.png');
    this.load.image('aviso', "../src/assets/telinha/metaSupply.png");
    // this.load.spritesheet('jose', '../../assets/jose_sprite-sheet.png', { frameWidth: 32, frameHeight: 64 });
  }
  
  create() {
    this.add.image(this.game.renderer.width/2, this.game.renderer.height/2, 'tutorialBG').setScale(1.45);
    this.player = new Player(this, 100, 100);
    this.cameras.main.setBackgroundColor('#0175D8');
    
    var distanciaSeta = 20 * 2;
    
    this.leftArrow = this.add.image(this.game.renderer.width/1.5 - 100, this.game.renderer.height/1.3, 'arrowLeft').setScale(2);
    this.rightArrow = this.add.image(this.game.renderer.width/1.5 - 100 + distanciaSeta*2, this.game.renderer.height/1.3, 'arrowRight').setScale(2);
    this.upArrow = this.add.image(this.game.renderer.width/1.5 - 100 + distanciaSeta, this.game.renderer.height/1.3 - distanciaSeta, 'arrowUp').setScale(2);
    this.downArrow = this.add.image(this.game.renderer.width/1.5 - 100 + distanciaSeta, this.game.renderer.height/1.3, 'arrowDown').setScale(2);
    this.space = this.add.image(this.game.renderer.width/3, this.game.renderer.height/1.3, 'space').setScale(2);
    this.mKey = this.add.image(this.game.renderer.width/1.14 - 60, this.game.renderer.height/2.5, 'mKey').setScale(3);
    this.escKey = this.add.image(this.game.renderer.width/8, this.game.renderer.height/3, 'esc').setScale(2);
    this.enterKey = this.add.image(this.game.renderer.width/8, this.game.renderer.height/1.6, 'enter').setScale(2);

    var style = { fontSize: '24px', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10 };
    this.add.text(650, 590, "Teclas de movimento", style);
    this.add.text(300, 590, "Tecla de interação", style);
    this.add.text(850, 330, "       Abrir Minimapa\n(funciona apenas na cidade)", style);
    this.add.text(130, 270, "ESC\nSair", style);
    this.add.text(100, 490, "  ENTER\nContinuar", style);

    this.botaoConfirmar = this.add.image(this.game.renderer.width/1.15, this.game.renderer.height/1.25, 'botaoConfirmarTutorial').setScale(0.5);

    this.botaoConfirmar.setInteractive({ useHandCursor: true });
    this.botaoConfirmar.on('pointerup', () => {
      this.add.image(this.game.renderer.width/2, this.game.renderer.height/2, 'aviso').setScale(1);
      this.botaoConfirmar.disableInteractive();
      setTimeout(() => {
        this.botao = this.add.image(this.game.renderer.width/2, this.game.renderer.height/1.25, 'botaoConfirmarTutorial').setScale(0.4);
        this.botao.setInteractive({ useHandCursor: true });
        this.botao.on('pointerup', () => this.scene.start("Cidade"));
      }, 5000);
    });

    this.player = this.physics.add.sprite(this.game.renderer.width / 2 - 20, this.game.renderer.height / 6 + 200, 'player').setScale(5).setVisible(true);
    this.player.play(`andando_baixo`, true);
  }
}