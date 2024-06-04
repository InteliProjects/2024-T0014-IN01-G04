
// Importa a classe Player de um arquivo JavaScript module
import Player from "../classes/Player.mjs";
import Assistente from "../classes/Assistente.mjs";

// Define e exporta a classe Festa que estende Phaser.Scene
export default class Festa extends Phaser.Scene {
  constructor() {
    super({ key: "Festa" }); 
  }

  // Método para pré-carregar recursos necessários para a cena
  preload() {
    
    this.load.image("interiorF", "Fase8/assets/Modern_Exteriors_Complete_Tileset_32x32.png");
    this.load.image("interiorChao", "Fase8/assets/Room_Builder_free_32x32.png");
    this.load.image("festinhaMapa", "Fase8/Festa/mapaFesta.png");
   
    this.load.tilemapTiledJSON( "mapa_festa", "Fase8/Festa/mapaFestaBom4.json" );
    this.load.spritesheet( "player", '../../assets/jose_sprite-sheet.png',{ frameWidth: 34, frameHeight: 64, } );
   
    this.load.image("NPC_Festa", "Fase8/assets/NPC_Festa.png");
    this.load.image("metaBot", "./assets/MetaBOT.png");

  }
  // Método para criar elementos visuais e configurar a cena
  create() {

    // Cria uma instância do jogador (classe Player)
    this.player = new Player(this, 60, 120, "player");
    
    this.criarMapa();

    // Configura a câmera para seguir o jogador
    this.configurarCamera();

    // Adiciona um NPC à cena
    this.NPC = this.physics.add.staticGroup();
    this.NPC.create(180, 200, "NPC_Festa");

    

    this.physics.add.collider(this.player, this.NPC, () => {
      this.registry.set("Fase", 9);
      this.scene.start("Cidade", { posX: 633, posY: 1957 });
    })

    window.alert("Converse com o representante da empresa e depois vá para o banco realizar o pagamento");

      this.listaDeDialogos = ["Parabéns por emitir com sucesso a ordem de compra! \nAgora é hora de relaxar um pouco na festa de lançamento do Meta Quest 4. \nAo chegar à festa, você precisará encontrar o representante do buffet para recolher a \nnota fiscal e finalizar o processo.",
      "Mas lembre-se de manter um bom relacionamento com os fornecedores \npara garantir o sucesso contínuo das parcerias comerciais!"];
    this.dialogo = new Assistente(this, this.game.renderer.width/5.2, this.game.renderer.height/2.5, 150, 100, this.listaDeDialogos).setScale(0.7);
    this.dialogo.setScrollFactor(0);    


  }

  //Método para criar mapa da festa 
  criarMapa() {
    this.map = this.make.tilemap({ key: "mapa_festa"});

    // Carrega o tilemap da festa e adiciona as tilesets necessárias
    this.tilesInterior = this.map.addTilesetImage("Modern_Exteriors_Complete_Tileset_32x32", "interiorF");
    this.tilesInteriorChao = this.map.addTilesetImage("Room_Builder_free_32x32", "interiorChao");
    this.tilesfestinhaMapa = this.map.addTilesetImage("mapaFesta","festinhaMapa");
    
    // Cria as camadas do mapa
    this.chao = this.map.createLayer("chao", this.tilesInteriorChao, 0, 0);
    this.grade = this.map.createLayer("grade", this.tilesInterior, 0, 0);
    this.piscina = this.map.createLayer("piscina", this.tilesInterior, 0, 0);
    this.carrinhosFesta = this.map.createLayer("carrinhosFesta", this.tilesInterior, 0, 0);
    this.cadeira = this.map.createLayer("cadeira", this.tilesInterior, 0, 0);
    this.itenspiscina = this.map.createLayer("itenspiscina", this.tilesInterior, 0, 0);
    this.limite = this.map.createLayer("limite", this.tilesInterior, 0, 0);

    // Define as colisões das camadas do mapa
    this.grade.setCollisionByProperty({ collider: true });
    this.piscina.setCollisionByProperty({ collider: true });
    this.carrinhosFesta.setCollisionByProperty({ collider: true });
    this.cadeira.setCollisionByProperty({ collider: true });
    this.itenspiscina.setCollisionByProperty({ collider: true });
    this.limite.setCollisionByProperty({ collider: true });

    // Adiciona colisões entre o jogador e as camadas do mapa
    this.physics.add.collider(this.player, this.grade);
    this.physics.add.collider(this.player, this.piscina);
    this.physics.add.collider(this.player, this.carrinhosFesta);
    this.physics.add.collider(this.player, this.cadeira);
    this.physics.add.collider(this.player, this.itenspiscina);
    this.physics.add.collider(this.player, this.limite);

  
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
  }
}