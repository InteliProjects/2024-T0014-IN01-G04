export default class Loading extends Phaser.Scene {
  constructor() {
    super({ key: 'Loading' });
  }

  init(data) {
    this.playerSprite = data.spritePath;
  }

  preload() {
    // Adiciona gráficos para exibir o progresso do carregamento
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle( 0x222222, 0.8 );
    progressBox.fillRect( 240, 270, 320, 50 );
    
    // Retoma a altura e largura da tela 
    var width = innerWidth;
    var height = innerHeight;
    var loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 60,
        text: 'Loading...',
        style: {
            font: '20px',
            fill: '#ffffff'
        }
    });
    loadingText.setOrigin( 0.5, 0.5 );
    
    var percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin( 0.5, 0.5 );
    
    var assetText = this.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: '',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });

    
    assetText.setOrigin(0.5, 0.5);
    
    // Define eventos para atualizar o progresso do carregamento

    this.load.on('progress', (value) => {
        percentText.setText( parseInt(value * 100) + '%' );
        progressBar.clear();
        progressBar.fillStyle( 0xffffff, 1 );
        progressBar.fillRect( 250, 280, 300 * value, 30 );
    });
    this.load.on('complete', () => {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
    });

    this.load.spritesheet( "player", this.playerSprite, { frameWidth: 32, frameHeight: 64, } );
    this.load.spritesheet("pin", "../assets/pin.png", { frameWidth: 64, frameHeight: 64 });
  }
  
  create() {
    this.criarAnimacoes();

    this.registry.set("Fase", 1);
    this.registry.set("BuffetsVisitados", {
      buffet1: false,
      buffet2: false,
      buffet3: false,
      buffet4: false,
    });
    this.registry.set("BuffetsDialogados", {
      buffet1: false,
      buffet2: false,
      buffet3: false,
      buffet4: false
    });

    this.scene.start("Tutorial");
  }

  criarAnimacoes() {
    this.anims.create({
      key: "pulaPin",
      frames: this.anims.generateFrameNumbers( "pin", { start: 0, end: 4 }),
      frameRate: 6,
      repeat: -1,
    });
    
    // Cria as animações para o jogador se movendo em diferentes direções
    this.anims.create({
      key: "andando",
      frames: this.anims.generateFrameNumbers( "player", { start: 4, end: 6} ),
      frameRate: 8,
      repeat: -1,
    });
  
    this.anims.create({
      key: "andando_baixo",
      frames: this.anims.generateFrameNumbers( "player", { start: 0, end: 1} ),
      frameRate: 5,
      repeat: -1,
    });
      
    this.anims.create({
      key: "andando_cima",
      frames: this.anims.generateFrameNumbers( "player", { start: 2, end: 3} ),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "parado",
      frames: this.anims.generateFrameNumbers( "player", { start: 7, end: 9} ),
      frameRate: 3,
      repeat: -1,
    });
  }
}