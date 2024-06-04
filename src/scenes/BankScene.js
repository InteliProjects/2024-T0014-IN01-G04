import Player from "../classes/Player.mjs";

// Classe Banco representando uma cena no jogo
export default class Banco extends Phaser.Scene {
  constructor() {
    super({ key: "Banco" }); // Inicializa a cena com a chave "Banco"
  }

  //Carregamento de recursos necessários para a cena
  preload() {
    this.load.image("interiorB", "../src/assets/Banco/banco.png");
    this.load.tilemapTiledJSON( "mapa_banco", "../src/assets/Banco/bancoBom7.json" );  
    this.load.spritesheet("player", '../src/assets/jose_sprite-sheet.png',{ frameWidth: 34, frameHeight: 64,} );
    this.load.image("NPC_Bank", "../src/assets/Banco/NPC_Bank.png");
  }

  create(){
    this.player = new Player(this, 450, 100, "player");
    this.criarMapa();

    // Configura a câmera
    this.configurarCamera();
  }

  criarMapa() {
    // Cria o mapa utilizando os dados carregados
    this.map = this.make.tilemap({ key: "mapa_banco"});
    this.tilesInterior = this.map.addTilesetImage("banco", "interiorB");
    
    // Criar camadas do mapa
    this.chao = this.map.createLayer( "chao", this.tilesInterior, 0, 0 );
    this.colisao = this.map.createLayer( "colisao", this.tilesInterior, 0, 0 );
    this.portalSaidaBanco = this.map.createLayer( "portalSB", this.tilesInterior, 0,0 );
   
    // Definir colisões
    this.colisao.setCollisionByProperty({ collider: true });
    this.portalSaidaBanco.setCollisionByProperty({ collider: true });

    // Adicionar colisões
    this.physics.add.collider( this.player, this.colisao );
    this.physics.add.collider(
      this.player, this.portalSaidaBanco,
      () => this.scene.start( "Cidade", { posX: 2450, posY: 2149 } ),
      null, this
    );
    this.NPC = this.physics.add.staticGroup();
    this.NPC.create(180, 200, "NPC_Bank");
  }


  // Método para configurar a câmera para seguir o jogador e limitar seus movimentos ao tamanho do mapa
  configurarCamera() {
    this.camera = this.cameras.main;
    this.camera.startFollow( this.player );
    this.camera.setBounds( 0, 0, this.map.widthInPixels, this.map.heightInPixels );
    this.camera.setZoom( 1.7, 1.7 );
  }

  update() {
    this.player.move();

    if(this.registry.get("Fase") === 9){
      this.scene.start("Fase9tela1");
    }
  }
}
