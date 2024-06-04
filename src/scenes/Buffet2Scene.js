import Player from "../classes/Player.mjs";
import Dialogo from "../classes/Dialogo.mjs";

// Classe representando a cena Buffet2
export default class Buffet2 extends Phaser.Scene {
  constructor() {
    super({ key: "Buffet2" });
  }
  
  // Pré-carrega os recursos necessários para a cena
  preload() {
    this.load.image( "interior2", "../src/assets/Buffet2/buffet2.png" );
    this.load.tilemapTiledJSON( "mapa_buffet2", "../src/assets/Buffet2/buffet2Bom2.json" );
    this.load.spritesheet( "player", '../src/assets/jose_sprite-sheet.png', { frameWidth: 34, frameHeight: 64, } );
    this.load.image("NPC_Buffet2", "../src/assets/Buffet2/NPC_Buffet2.png");
    this.load.image("dialogueBox", './assets/caixaDialogo.png');
  }

  create(){
    const faseAtual = this.registry.get("Fase");
    const buffetDialogados = this.registry.get("BuffetsDialogados");
    if (faseAtual === 3) {
      let buffetsVisitados = this.registry.get("BuffetsVisitados");
      buffetsVisitados.buffet2 = true;
      this.registry.set("BuffetsVisitados", buffetsVisitados);
    }
    console.log("Fase", this.registry.get("Fase"));
    console.log("buffetsVisitados: ", this.registry.get("BuffetsVisitados"));

    // Instancia o jogador na posição especificada
    this.player = new Player(this, 450, 100, "player");

    // Cria o mapa do buffet2
    this.criarMapa();

    // Instância o NPC no jogo
    this.Npc = this.physics.add.staticGroup();
    this.Npc.create(180, 200, "NPC_Buffet2");

    //Define a criação do diálogo caso o jogador esteja na fase 3 e colida com o NPC
    if (faseAtual === 3) {
      if(!buffetDialogados.buffet2){
        this.pin = this.physics.add.sprite(180, 165, 'pin').setScale(0.5).setDepth(100);
        this.pin.anims.play("pulaPin", true);

        this.physics.add.collider(this.Npc, this.player, () => {
          if(this.dialogoNPC !== undefined){
            return;
          }
          this.dialogoNPC = new Dialogo(this, 250, 130, "É um prazer recebê-los no SaborVille! Nossa equipe diversificada garante uma ampla gama de opções para nossos clientes. Comprometidos com a qualidade e pontualidade, oferecemos uma experiência gastronômica memorável em todos os eventos.", "NPC_Buffet2", "Steve");
          this.dialogoNPC.createDialogue();
          this.physics.pause();
          // this.dialogoNPC.changeDialogueText();
          buffetDialogados.buffet2 = true;
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
    this.map = this.make.tilemap({ key: "mapa_buffet2"});

    this.tilesInterior = this.map.addTilesetImage("buffet2", "interior2");
    
    this.chao = this.map.createLayer("chao", this.tilesInterior, 0, 0);
    this.colisao = this.map.createLayer("colisao", this.tilesInterior, 0, 0);
    this.portalS2 = this.map.createLayer("portalS2", this.tilesInterior, 0, 0);
  
    this.colisao.setCollisionByProperty({ collider: true });
    this.portalS2.setCollisionByProperty({ collider: true });

    this.physics.add.collider(this.player, this.colisao);
    this.physics.add.collider(
      this.player, this.portalS2,
      () => this.scene.start( "Cidade", { posX:620, posY: 1299 } ),
      null, this
    );
  }


  // Configura a câmera para seguir o jogador e limita seus movimentos ao tamanho do mapa
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