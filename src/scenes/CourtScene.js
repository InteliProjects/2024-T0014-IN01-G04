import Player from "../classes/Player.mjs"
import Dialogo from "../classes/Dialogo.mjs";

// Classe representando a cena do Tribunal
export default class Tribunal extends Phaser.Scene {
  constructor() {
    super({ key: "Tribunal" });
  }

  preload() {
    this.load.image("interiorC", "../src/assets/Tribunal/tribunal.png");
    this.load.tilemapTiledJSON(
      "mapa_tribunal",
      "../src/assets/Tribunal/tribunalBom5.json"
    );
    this.load.spritesheet("player", "../src/assets/jose_sprite-sheet.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.image("NPC_Juiz", "../src/assets/Tribunal/NPC_Juiz.png");
    this.load.image("dialogueBox", './assets/caixaDialogo.png');

  }

  create() {
    const faseAtual = this.registry.get('Fase')
    this.player = new Player(this, 450, 450, "player");
    this.criarMapa();
    this.Npc = this.physics.add.staticGroup();
    this.Npc.create(440, 225, "NPC_Juiz");

    if (faseAtual === 6) {
      this.physics.add.collider(this.Npc, this.player, () => {
        if(this.dialogoNPC !== undefined){
          return;
        }
        this.dialogoNPC = new Dialogo(this, 440, 170, "Iniciamos hoje um julgamento simulado para avaliar os buffets Metaville Fest e Gourmet Park com base em critérios da Meta. O Metaville Fest mostrou boa proteção de informações, ao contrário do Gourmet Park, que teve falhas graves nesse aspecto. Ambos foram avaliados quanto à privacidade, com o Metaville Fest tendo risco moderado e o Gourmet Park não atendendo aos critérios. Em termos de concorrência, o Metaville Fest seguiu as políticas, mas o Gourmet Park não. Na saúde financeira, o Metaville Fest está estável, enquanto o Gourmet Park não teve um bom desempenho. Quanto à continuidade dos negócios, o Metaville Fest está bem, mas o Gourmet Park teve dificuldades. Em questões políticas, o Metaville Fest foi adequado, mas o Gourmet Park teve problemas. O júri deve decidir qual buffet deve ser escolhido pela META.", "NPC_Juiz", "Michael");
        this.dialogoNPC.createDialogue();
        this.physics.pause();
        // this.dialogoNPC.changeDialogueText();
      });
    }

    // Configura a câmera
    this.configurarCamera();
  }

  criarMapa() {
    // Cria o mapa utilizando os dados carregados
    this.map = this.make.tilemap({ key: "mapa_tribunal" });

    this.tilesInterior = this.map.addTilesetImage("tribunal", "interiorC");

    this.chao = this.map.createLayer("chao", this.tilesInterior, 0, 0);
    this.parede = this.map.createLayer("parede", this.tilesInterior, 0, 0);
    this.cadeira = this.map.createLayer("cadeira", this.tilesInterior, 0, 0);
    this.mesas = this.map.createLayer("mesas", this.tilesInterior, 0, 0);
    this.decoracao = this.map.createLayer("decoracao", this.tilesInterior, 0, 0);
    this.portalSC = this.map.createLayer("portalSC", this.tilesInterior, 0, 0);


    // Define colisões para as camadas necessárias
    this.parede.setCollisionByProperty({ collider: true });
    this.cadeira.setCollisionByProperty({ collider: true });
    this.mesas.setCollisionByProperty({ collider: true });
    this.decoracao.setCollisionByProperty({ collider: true });
    this.portalSC.setCollisionByProperty({ collider: true });
    
    this.physics.add.collider(this.player, this.parede);
    this.physics.add.collider(this.player, this.cadeira); // para fazer o personagem passar por tras da cadeira uma ideia é fazer um mapa que tenha apenas uma cadeira no fundo e exportar o mapa no tiled
    this.physics.add.collider(this.player, this.mesas);
    this.physics.add.collider(this.player, this.decoracao);
    this.physics.add.collider(
      this.player, this.portalSC,
      () => this.scene.start("Cidade",{ posX: 2895, posY: 547 }),
      null, this
    );

    let faseAtual = this.registry.get("Fase");
    if (faseAtual === 6) {
      this.pin = this.physics.add.sprite(440, 190, 'pin').setScale(0.5).setDepth(100);
      this.pin.anims.play("pulaPin", true);
    } else {
      this.pin = this.physics.add.sprite(448, 560, 'pin').setScale(0.5).setDepth(100);
      this.pin.anims.play("pulaPin", true);
    }
  }

  configurarCamera() {
    // Configura a câmera para seguir o jogador e limita seus movimentos ao tamanho do mapa
    this.camera = this.cameras.main;
    this.camera.startFollow( this.player );
    this.camera.setBounds( 0, 0, this.map.widthInPixels, this.map.heightInPixels );
    this.camera.setZoom( 1.7, 1.7 );
  }

  update() {
    this.player.move();
  }
}
