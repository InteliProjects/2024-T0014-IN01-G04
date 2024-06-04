import Player from "../classes/Player.mjs";
import Dialogo from "../classes/Dialogo.mjs";

// Classe Buffet1 representando uma cena no jogo
export default class Buffet1 extends Phaser.Scene {
  constructor() {
    super({ key: "Buffet1" }); // Inicializa a cena com a chave "Buffet1"
    this.dialogo = [ 
      "Olá! Aqui no Gourmet Park, somos",
      "apaixonados por gastronomia e excelência",
      "em serviço. Com chefs renomados e uma",
      "equipe comprometida, garantimos pratos",
      "gourmet de alta qualidade e um",
      "atendimento impecável. Estamos sempre",
      "pontuais em nossas entregas e",
      "comprometidos em superar as expectativas",
      "dos nossos clientes, oferecendo uma",
      "experiência gastronômica única e sofisticada"];

    this.dialogoNPC = null;
  }

  preload() {
    //Carrega as imagens que vamos utilizar
    this.load.image("interior", "../src/assets/Buffet1/buffet1.png");
    this.load.tilemapTiledJSON( "mapa_buffet1", "../src/assets/Buffet1/buffet1Bom1.json" );
    this.load.image("NPC_Buffet1", "../src/assets/Buffet1/NPC_Buffet1.png");
    this.load.audio('musica3', '../../assets/MusicasESons/buffet.mp3'); 
    this.load.image("dialogueBox", './assets/caixaDialogo.png');
  }

  create() {
    const faseAtual = this.registry.get("Fase");
    const buffetDialogados = this.registry.get("BuffetsDialogados");
    if (faseAtual === 3) {
      this.buffetsVisitados = this.registry.get("BuffetsVisitados");
      this.buffetsVisitados.buffet1 = true;
      this.registry.set("BuffetsVisitados", this.buffetsVisitados);
    }
    console.log("Fase", this.registry.get("Fase"));
    console.log("buffetsVisitados: ", this.registry.get("BuffetsVisitados"));
  
    this.player = new Player(this, 450, 100, "player");
    
    this.criarMapa();

    this.Npc = this.physics.add.staticGroup();
    this.Npc.create(180, 200, "NPC_Buffet1");

  
    // Criação do diálogo NPC após a criação do jogador
    if (faseAtual === 3) {
      if(!buffetDialogados.buffet1){
        this.pin = this.physics.add.sprite(180, 165, 'pin').setScale(0.5).setDepth(100);
        this.pin.anims.play("pulaPin", true);

        this.physics.add.collider(this.Npc, this.player, () => {
          if(this.dialogoNPC !== null){
            return;
          }
          this.dialogoNPC = new Dialogo(this, 250, 130, "Olá! Aqui no Gourmet Park, somos apaixonados por gastronomia e excelência em serviço. Com chefs renomados e uma equipe comprometida, garantimos pratos gourmet de alta qualidade e um atendimento impecável. Estamos sempre pontuais em nossas entregas e comprometidos em superar as expectativas dos nossos clientes, oferecendo uma experiência gastronômica única e sofisticada", "NPC_Buffet1", "Steve");
          this.dialogoNPC.createDialogue();
          this.physics.pause();
          // this.dialogoNPC.changeDialogueText();
          buffetDialogados.buffet1 = true;
          this.registry.set("BuffetsDialogados", buffetDialogados)
          this.pin.destroy();
        });
      }
    } else {
      this.pin = this.physics.add.sprite(448, 40, 'pin').setScale(0.8).setDepth(100);
      this.pin.anims.play("pulaPin", true);
      this.physics.add.collider(this.Npc, this.player);
    }
  
  
    // Configura a câmera
    this.configurarCamera();
  }
  

  criarMapa() {
    this.map = this.make.tilemap({ key: "mapa_buffet1"});

    this.tilesInterior = this.map.addTilesetImage("buffet1", "interior");
    
    this.chao = this.map.createLayer("chao", this.tilesInterior, 0, 0);
    this.colisao = this.map.createLayer("colisao", this.tilesInterior, 0, 0);
    this.portalS1 = this.map.createLayer("portalS1", this.tilesInterior, 0, 0);

    this.colisao.setCollisionByProperty({ collider: true });
    this.portalS1.setCollisionByProperty({ collider: true });

    this.physics.add.collider(this.player, this.colisao);
    this.physics.add.collider(
      this.player, this.portalS1,
      () => this.scene.start( "Cidade", { posX: 450, posY: 770 } ),
      null, this
    );
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