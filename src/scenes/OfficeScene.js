// Importa a classe Player do arquivo Player.mjs localizado na pasta classes
import Player from "../classes/Player.mjs";
import Assistente from "../classes/Assistente.mjs";

// Define a classe Escritorio que estende Phaser.Scene
export default class Escritorio extends Phaser.Scene {
  constructor() {
    super({ key: 'Escritorio' });  // Chama o construtor da classe pai com uma chave específica
  }
  

  preload() {
    //Carrega o mapa do escritório
    this.load.image("interiorE", "../src/assets/pasta_escritorio/escritorio (1).png");
    this.load.tilemapTiledJSON('mapa_escritorio', '../src/assets/pasta_escritorio/escritorioBom3.json');
    this.load.image("NPC_Escritorio", "../src/assets/pasta_escritorio/NPC_Escritorio.png");
    this.load.spritesheet("player", "../assets/jose_sprite-sheet.png", { frameWidth: 32, frameHeight: 64, });
    this.load.image("metaBOT", "./assets/MetaBOT.png");

  }

  create() {
    const faseAtual = this.registry.get("Fase");
    this.player = new Player(this, 450, 100, "player");
    this.criarMapa();
    this.configurarCamera();
    //this.tocarMusica();
    

    const posicaoX = this.game.renderer.width
    const posicaoY = this.game.renderer.height
    if(faseAtual === 1){
      this.listaDeDialogos = ["Na primeira fase da nossa contratação é preciso avaliar a demanda de serviços, \nnesse caso é organizar a festa, e procurar os fornecedores disponíveis. \nLembre-se de dar prioridade aos fornecedores que já têm experiência de trabalho conosco \nna Meta.",
      "Além disso, ao escolher um fornecedor você deve considerar a diversidade de fornecedores, \nou seja, deve buscar fornecedores que reflitam diferentes origens, culturas, estilos e \nperspectivas, de forma a promover a inclusão e equidade nos negócios.",
      "Agora, você tem à disposição oito buffets previamente cadastrados em nossos sistemas. \nSua tarefa é filtrar as quatro melhores opções. \nPara selecioná-las, basta clicar nos cards e, em seguida, em 'analisar'. \nOBS: Vá até o computador indicado."];
      
      this.dialogo = new Assistente(this, posicaoX/5.1, posicaoY/2.5, 150, 100, this.listaDeDialogos).setScale(0.7);
      this.dialogo.setScrollFactor(0); 
    } else if( faseAtual === 6){
      this.listaDeDialogos = ["Você é demais, já chegou na sexta fase do nosso processo (OBS: Vá para o Tribunal), \ne agora entramos na etapa crucial da Avaliação de Terceiros. \nEsta etapa é fundamental para garantir que todos os fornecedores que trabalharão com a Meta \npassem por uma due diligence adequada.",
      "A Avaliação de Terceiros, ou TPA, é um dos programas principais de due diligence de fornecedores, \nprojetado para garantir que os terceiros envolvidos com a Meta tenham a capacidade de proteger \ninformações confidenciais contra possíveis usos indevidos.",
      "Nesta fase do jogo, você será desafiado a participar de um julgamento simulado, atuando como \nparte do júri. Você irá assistir ao julgamento do juiz e, em seguida, votar para selecionar o melhor \nfornecedor entre as duas opções apresentadas.",
      "Este é um momento crucial, pois sua escolha influenciará diretamente na seleção final do \nfornecedor que trabalhará com a Meta. \nEntão, fique atento e faça sua escolha com sabedoria!"];
      this.dialogo = new Assistente(this, posicaoX/5.1, posicaoY/2.5, 150, 100, this.listaDeDialogos).setScale(0.7);
      this.dialogo.setScrollFactor(0);  
    }
    //this.events.on('shutdown', this.pararMusica.bind(this)); // Se utiliza bind para que o this seja o mesmo da classe no caso o escritório
  }

  criarMapa() {
    //Cria o mapa do escritório na tela 
    this.map = this.make.tilemap({ key: "mapa_escritorio" });

    //Define as camadas do mapa
    this.tilesInterior = this.map.addTilesetImage( "escritorio (1)", "interiorE", );

    this.chao = this.map.createLayer("chao", this.tilesInterior, 0, 0);
    this.colisao = this.map.createLayer("colisao", this.tilesInterior, 0, 0);
    this.portalSE = this.map.createLayer("portalSE", this.tilesInterior, 0, 0);
    this.PcFase1 = this.map.createLayer("PcFase1", this.tilesInterior, 0, 0);

    

    // Adiciona a colisão em algumas camadas do mapa
    this.colisao.setCollisionByProperty({ collider: true });
    this.portalSE.setCollisionByProperty({ collider: true });
    this.PcFase1.setCollisionByProperty({ collider: true });
    
    this.physics.add.collider(this.player, this.colisao);
    this.physics.add.collider(
    this.player, this.portalSE,
      () => this.scene.start( "Cidade", { posX: 633, posY: 1957 } ),
      null, this
    );

    //Defini a condição para que inicie a fase 1 do jogo
    this.physics.add.collider(this.player, this.PcFase1, () => {
      const faseAtual = this.registry.get("Fase");
      console.log(faseAtual);
      if(faseAtual === 1){
        this.scene.start("Fase1");
      } else if (faseAtual === 4) {
        this.scene.start("pergunta2");
      } else if(faseAtual === 8){
        this.scene.start("Fase8");
      }
    }, null, this);

    const faseAtual = this.registry.get("Fase");
    if (faseAtual === 1 || faseAtual === 4 || faseAtual === 5 || faseAtual === 8) {
      this.pin = this.physics.add.sprite(400, 260, 'pin').setScale(1.2).setDepth(100);
      this.pin.anims.play("pulaPin", true);
    } else if (faseAtual === 3) {
      this.pin = this.physics.add.sprite(448, 40, 'pin').setScale(1.1).setDepth(100);
      this.pin.anims.play("pulaPin", true);
    }
  }

  // Método para configurar a câmera
  configurarCamera() {
    this.camera = this.cameras.main;
    this.camera.startFollow( this.player );
    this.camera.setBounds( 0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.camera.setZoom( 1.7,1.7 );
  }

  update() {
    // Atualiza o movimento do jogador
    this.player.move();
  }
}