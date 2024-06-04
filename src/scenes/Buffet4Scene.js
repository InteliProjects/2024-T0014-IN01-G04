import Player from "../classes/Player.mjs";
import Dialogo from "../classes/Dialogo.mjs";

// Classe representando a cena Buffet4
export default class Buffet4 extends Phaser.Scene {
  constructor() {
    super({ key: "Buffet4" });
  }
  
  preload() {
    // Pré-carrega os recursos necessários para a cena
    this.load.image("interior", "../src/assets/Buffet4/buffet4.png");
    this.load.tilemapTiledJSON( "mapa_buffet4","../src/assets/Buffet4/buffet4Bom4.json" );
    this.load.spritesheet("player", '../src/assets/jose_sprite-sheet.png',{ frameWidth: 34,frameHeight: 64, });

    this.load.audio('musica3', '../../assets/MusicasESons/buffet.mp3');
    this.load.image("NPC_Buffet4", "../src/assets/Buffet4/NPC_buffet4.png");
    this.load.image("dialogueBox", './assets/caixaDialogo.png');


  }

  create() {
    const faseAtual = this.registry.get("Fase");
    const buffetDialogados = this.registry.get("BuffetsDialogados");
    if (faseAtual === 3) {
      let buffetsVisitados = this.registry.get("BuffetsVisitados");
      buffetsVisitados.buffet4 = true;
      this.registry.set("BuffetsVisitados", buffetsVisitados);
    }
    console.log("Fase", this.registry.get("Fase"));
    console.log("buffetsVisitados: ", this.registry.get("BuffetsVisitados"));

    //Instância o Jogador
    this.player = new Player(this, 450, 130, "player");

    // Executa a Função Criar Mapa
    this.criarMapa();

    // Instância o Npc
    this.Npc = this.physics.add.staticGroup();
    this.Npc.create(180, 200, "NPC_Buffet4");

    //Define a criação do diálogo caso o jogador esteja na fase 3 e colida com o NPC
    if (faseAtual === 3) {
      if(!buffetDialogados.buffet4){
        this.pin = this.physics.add.sprite(180, 165, 'pin').setScale(0.5).setDepth(100);
        this.pin.anims.play("pulaPin", true);

        this.physics.add.collider(this.Npc, this.player, () => {
          if(this.dialogoNPC !== undefined){
            return;
          }
          this.dialogoNPC = new Dialogo(this, 250, 130, "Sejam bem-vindos ao Delícias da Serra! Apesar de alguns desafios recentes, prometemos pratos autênticos e um serviço acolhedor. Nosso buffet é reconhecido por sua variedade de pratos regionais e ambiente familiar.", "NPC_Buffet4", "Aisha");
          this.dialogoNPC.createDialogue();
          this.physics.pause();
          // this.dialogoNPC.changeDialogueText();
          buffetDialogados.buffet4 = true;
          this.registry.set("BuffetsDialogados", buffetDialogados)
          this.pin.destroy();
        });
      }
    } else {
      this.pin = this.physics.add.sprite(448, 40, 'pin').setScale(0.8).setDepth(100);
      this.pin.anims.play("pulaPin", true);

      this.physics.add.collider(this.Npc, this.player);
    }
    //Configura câmera
    this.configurarCamera();
  }

  criarMapa() {
    // Cria o mapa utilizando os dados carregados
    this.map = this.make.tilemap({ key: "mapa_buffet4"});

    this.tilesInterior = this.map.addTilesetImage("buffet4", "interior");
  
    this.chao = this.map.createLayer("chao", this.tilesInterior, 0, 0);
    this.colisao = this.map.createLayer("colisao", this.tilesInterior, 0, 0);
    this.portalS4 = this.map.createLayer("portalS4", this.tilesInterior, 0, 0);

    this.colisao.setCollisionByProperty({ collider: true });
    this.portalS4.setCollisionByProperty({ collider: true });
    
    this.physics.add.collider(this.player, this.colisao);
    this.physics.add.collider(
      this.player,
      this.portalS4,
      () => {
        this.scene.start("Cidade", { posX: 2325, posY: 1300 });
      },
      null,
      this
    );
    
  }

  
  configurarCamera() {
    // Configura a câmera para seguir o jogador e limita seus movimentos ao tamanho do mapa
    this.camera = this.cameras.main;
    this.camera.startFollow( this.player );
    this.camera.setBounds( 0, 0, this.map.widthInPixels, this.map.heightInPixels );
    this.camera.setZoom( 1.7,1.7 );
  }

  update() {
    this.player.move();
  }
}