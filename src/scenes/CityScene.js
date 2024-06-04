import Player from "../classes/Player.mjs";
import Assistente from "../classes/Assistente.mjs";

export default class Cidade extends Phaser.Scene {
    localRenascer;

    constructor() {
      super({ key: "Cidade" });

      this.positions = {
        escritorio: { x: 660, y: 1750 },
        buffet1: { x: 450, y: 520 },
        buffet2: { x: 680, y: 1070 },
        buffet3: { x: 3475, y: 1070 },
        buffet4: { x: 2325, y: 1070 },
        tribunal: { x: 2900, y: 350 },
        banco: { x: 2450, y: 1950 },
      };
    }

    // Método init para inicializar a cena com dados
    init(dados) {
      this.localRenascer = dados;
    }

    preload() {
      // Carrega o cenário do mapa
      this.load.image("cidade", "./assets/City/Modern_Exteriors_Complete_Tileset_32x32.png");
      this.load.tilemapTiledJSON("mapa_cidade", "./assets/City/mapaRealOficial44.json");
      this.load.image("city", "./assets/City/mapaRealOficial.png");
      this.load.image("moedaemeta", "./assets/City/moedaesimbolo.png");
      this.load.image("logoBuffets", "./assets/City/logobuffets.png");
      this.load.image("borda", "./assets/City/mapaPrincipalcomlogo.png");
      this.load.tilemapTiledJSON("mapa_cidade", "./assets/City/mapaRealOficial.json");
      this.load.image("metaBOT", "./assets/MetaBOT.png");
    }
    // Método create para criar elementos visuais e configurar a cena
    create() {
      const faseAtual = this.registry.get("Fase");
      console.log("Fase atual:", faseAtual);
      if (faseAtual === 3) {
        let buffetsVisitados = this.registry.get("BuffetsVisitados");
        let todosBuffetsVisitados = true;
        Object.entries(buffetsVisitados).forEach(([key, value]) => {
          if (!value) {
            todosBuffetsVisitados = false;
          }
        });
        if (todosBuffetsVisitados) {
          this.scene.start("Fase3");
        }
      }

      this.criarMapa();
      this.createPlayer();
      this.adicionarCamadas();
      this.adicionarColisoes();
      this.configurarCamera();
      const posicaoX = this.game.renderer.width;
      const posicaoY = this.game.renderer.height;
      if(faseAtual === 1){
        this.listaDeDialogos = [`Olá, seja muito bem-vind@, ${this.registry.get("Personagem")}, à Meta. \nEu sou o MetaBot e estarei ao seu lado durante toda a sua jornada no Meta \nSupply. Tenho uma notícia empolgante para compartilhar com você: Parabéns!`, 
      "Devido ao seu comprometimento e dedicação à empresa, você \nfoi escolhido para uma missão especial: organizar o maior evento que MetaVille já viu. \nSim, você será encarregado de planejar a festa de lançamento do tão\n aguardado Meta Quest 4!", 
      "Sua responsabilidade será grande e exigirá muito esforço e dedicação, \nespecialmente se você pulou o treinamento sobre a contratação de novos fornecedores... \nMas não se preocupe, estou aqui para guiá-lo(a) em cada passo desta jornada!",
      "Para começar, sua primeira tarefa é se dirigir ao escritório e iniciar a primeira fase do jogo! \nEstou ansioso para ver suas habilidades em ação. \nOBS: Vá para o Escritório da Meta"];
      this.dialogo = new Assistente(this, posicaoX/15, posicaoY/2.5, 150, 100, this.listaDeDialogos);
      this.dialogo.setScrollFactor(0);  
      }else if( faseAtual === 3){
        if(this.registry.get("BuffetsVisitados").buffet1 || this.registry.get("BuffetsVisitados").buffet2 ||this.registry.get("BuffetsVisitados").buffet3 ||this.registry.get("BuffetsVisitados").buffet4){
          this.listaDeDialogos = ["Lembre-se de escolher com sabedoria, levando em consideração não apenas a \nqualidade da comida, mas também a compatibilidade com nossos valores e objetivos. \nPronto para conhecer nossos potenciais parceiros? \nOBS: Vá para a cidade e visite cada um dos Buffets"];
        }else{
          this.listaDeDialogos = ["Na terceira fase do nosso processo, chegou o momento crucial de conhecer o negócio dos \nfornecedores. Após a assinatura do Acordo de Confidencialidade (NDA), \né hora de trocar informações com as empresas selecionadas.",
          "Esta é uma oportunidade valiosa para você, colaborador, conhecer mais sobre o fornecedor \ne para o fornecedor entender melhor o negócio que estamos solicitando. \nEssa troca de informações é fundamental para garantir uma parceria sólida e bem-sucedida.",
          "Agora, sua tarefa é visitar cada um dos quatro buffets e conversar com o representante \nde cada um deles. Após a última visita, será necessário fazer uma seleção de \ntrês buffets com base nas informações coletadas.",
          "Lembre-se de escolher com sabedoria, levando em consideração não apenas a \nqualidade da comida, mas também a compatibilidade com nossos valores e objetivos. \nPronto para conhecer nossos potenciais parceiros? \nOBS: Vá para a cidade e visite cada um dos Buffets"];
        }
        this.dialogo = new Assistente(this, posicaoX/15, posicaoY/2.5, 150, 100, this.listaDeDialogos);
        this.dialogo.setScrollFactor(0);     
      } else if( faseAtual === 4){
        this.listaDeDialogos = ["Parabéns, você concluiu mais uma fase com sucesso, agora na quarta fase do nosso \nprocesso , vamos criar e analisar o formulário RFP, ou Solicitação de Proposta. \nEsta é uma etapa crucial para avaliar as capacidades e os preços dos fornecedores\nconcorrentes.",
        "A RFP contém perguntas sobre qualidade, capacidades de serviço, tecnologia, novos produtos \ne informações sobre preços específicos. É uma ferramenta valiosa para avaliar o desempenho \ndos fornecedores e tomar decisões sobre premiações.",
        "Utilizaremos a Compra Guiada para criar e distribuir nossa Solicitação de Proposta. \nLembre-se, antes de entrar em contato com os fornecedores, é essencial que o Acordo de \nConfidencialidade esteja em vigor.",
        "Agora, você será direcionado para cinco categorias, cada uma com quatro alternativas de \nperguntas. Seu objetivo é escolher a pergunta mais coerente para encaixar no formulário RFP.",
        "Assim que todas as perguntas forem selecionadas, o formulário será gerado e você deverá \nenviá-lo aos fornecedores. Em seguida, você terá acesso às respostas dos \nfornecedores. OBS: Vá para o Escritório da Meta"];
        this.dialogo = new Assistente(this, posicaoX/15, posicaoY/2.5, 150, 100, this.listaDeDialogos);
        this.dialogo.setScrollFactor(0);    
      } else if( faseAtual === 7){
        this.listaDeDialogos = ["Uau, mais uma fase concluída, agora você iniciará a sétima fase onde você entrará na etapa \ncrucial de negociação de contratos com os fornecedores. Esta fase é fundamental \npara garantir que todos os termos e condições estejam claros e \naceitáveis para ambas as partes antes de avançarmos para a próxima etapa.",
          "Após a fase de due diligence, um contrato pode ser necessário para formalizar o acordo com seu \nfornecedor. É importante observar que um contrato só pode ser emitido para um fornecedor \ntotalmente registrado e deve ser atribuído a um TPA (Avaliação de Terceiros).",
          "Antes de avançarmos para a negociação, é essencial entender quando um contrato é \nnecessário. Detalhes sobre isso podem ser encontrados na Política de Contrato da Meta. \nEm geral, para produtos prontos para uso, como móveis ou materiais de escritório, \nnum contrato pode não ser necessário, mas para serviços e produtos personalizados, \num contrato é essencial.",
          "Na tela, você encontrará três categorias: cláusulas, preço e data de entrega. \nSeu objetivo é clicar nas bolinhas de cada categoria e arrastar a linha até a bolinha da resposta \ncorreta. Lembre-se de considerar cuidadosamente cada aspecto do contrato, para garantir que \ntodas as partes envolvidas estejam satisfeitas com os termos acordados."];
        this.dialogo = new Assistente(this, posicaoX/15, posicaoY/2.5, 150, 100, this.listaDeDialogos);
        this.dialogo.setScrollFactor(0);  
      } else if( faseAtual === 8){
        this.listaDeDialogos = ["Bem-vindo à oitava fase do jogo! Nesta etapa, você será responsável por emitir a ordem de \ncompra para garantir a compra dos serviços necessários. Além disso, você também precisará \ngerenciar e monitorar o fornecedor para garantir que o serviço seja entregue conforme o contrato.",
        "A ordem de compra é um documento essencial emitido pelo colaborador para assegurar a \ncompra do serviço. É importante observar que os serviços ou bens nunca devem ser entregues \npor fornecedores antes da emissão de uma PO, ou poderão haver problemas de conformidade.",
        "Após emitir a PO, você entrará na fase de gerenciamento contínuo de relacionamento com \nfornecedores. Isso garantirá que o fornecedor permaneça em conformidade e que os resultados \nde negócios sejam positivos ao longo do tempo.",
        "Na tela, você terá três opções: ver o que é uma ordem de compra, emitir a ordem de compra \ne ir para a festa. Sua tarefa é emitir a ordem de compra e depois participar da festa \nde lançamento do novo Meta Quest 4."
        ];
        this.dialogo = new Assistente(this, posicaoX/15, posicaoY/2.5, 150, 100, this.listaDeDialogos);
        this.dialogo.setScrollFactor(0);  
      } else if( faseAtual === 9){
        this.listaDeDialogos = ["Parabéns você na penúltima fase do jogo, \nAgora que você recebeu a nota fiscal e o serviço foi concluído com sucesso pelo fornecedor, \né hora de efetuar o pagamento.",
        "Você precisará ir até o banco para realizar o pagamento. \nCertifique-se de ter em mãos as informações necessárias, incluindo o número da conta do \nfornecedor, a agência bancária e o valor combinado anteriormente. \nOBS: Vá para o Banco"];
        this.dialogo = new Assistente(this, posicaoX/15, posicaoY/2.5, 150, 100, this.listaDeDialogos);
        this.dialogo.setScrollFactor(0);  
      }
    }

    // Método para criar o jogador
    createPlayer() {

        // Encontra o ponto de spawn do jogador no mapa
        this.spawningPoint = this.map.findObject(
            "player",
            (objects) => objects.name === "spawning point"
        );

        // Define as coordenadas de spawn com base nos dados recebidos ou no ponto de spawn do mapa
        var spawn = Object.keys(this.localRenascer).length > 0 ?
            [this.localRenascer.posX, this.localRenascer.posY] :
            [this.spawningPoint.x, this.spawningPoint.y];


        // Cria uma nova instância da classe Player com as coordenadas de spawn e a chave do sprite
        this.player = new Player(this, spawn[0], spawn[1], "player");
    }

    // Método para criar o mapa
    criarMapa() {
        this.map = this.make.tilemap({ key: "mapa_cidade" });
        this.assets_combinado = this.map.addTilesetImage("Modern_Exteriors_Complete_Tileset_32x32", "cidade");
        this.assets_logo = this.map.addTilesetImage("logobuffets", "logoBuffets");
        this.assets_moedaesimbolo = this.map.addTilesetImage("moedaesimbolo", "moedaemeta");
        this.assets_borda = this.map.addTilesetImage("mapaPrincipalcomlogo","borda");
    }
     
    adicionarCamadas() {
        // Cria as camadas do mapa
        this.estrada = this.map.createLayer("estrada", this.assets_combinado, 0, 0);
        this.terreno = this.map.createLayer("terreno", this.assets_combinado, 0, 0);
        this.paredePraca = this.map.createLayer("paredePraca", this.assets_combinado, 0, 0);
        this.arvore8 = this.map.createLayer("arvore8", this.assets_combinado, 0, 0);
        this.arvore7 = this.map.createLayer("arvore7", this.assets_combinado, 0, 0);
        this.arvore6 = this.map.createLayer("arvore6", this.assets_combinado, 0, 0);
        this.arvore5 = this.map.createLayer("arvore5", this.assets_combinado, 0, 0);
        this.arvore4 = this.map.createLayer("arvore4", this.assets_combinado, 0, 0);
        this.arvore3 = this.map.createLayer("arvore3", this.assets_combinado, 0, 0);
        this.arvore2 = this.map.createLayer("arvore2", this.assets_combinado, 0, 0);
        this.arvore1 = this.map.createLayer("arvore1", this.assets_combinado, 0, 0);
        this.casa2 = this.map.createLayer("casa2", this.assets_combinado, 0, 0);

        this.cerca = this.map.createLayer("cerca", this.assets_combinado, 0, 0);
        this.casa = this.map.createLayer("casa", this.assets_combinado, 0, 0);
        this.acima_poste = this.map.createLayer("acima_poste", this.assets_combinado, 0, 0);
        this.poste = this.map.createLayer("poste", this.assets_combinado, 0, 0);
        this.semaforo = this.map.createLayer("semaforo", this.assets_combinado, 0, 0);
        this.faixa = this.map.createLayer("faixa", this.assets_combinado, 0, 0);
        this.portalEscritorio = this.map.createLayer("portal", this.assets_combinado, 0, 0);
        this.portalTribunal = this.map.createLayer("portalT", this.assets_combinado, 0, 0);
        this.portalBanco = this.map.createLayer("portalB", this.assets_combinado, 0, 0);
        this.portalBuffet1 = this.map.createLayer("portalB1", this.assets_combinado, 0, 0);
        this.portalBuffet2 = this.map.createLayer("portalB2", this.assets_combinado, 0, 0);
        this.portalBuffet3 = this.map.createLayer("portalB3", this.assets_combinado, 0, 0);
        this.portalBuffet4 = this.map.createLayer("portalB4", this.assets_combinado, 0, 0);
        this.coin = this.map.createLayer("coin", this.assets_moedaesimbolo, 0, 0);
        this.logoBuffets = this.map.createLayer("logoBuffets", this.assets_logo, 0, 0);
        this.borda = this.map.createLayer("borda", this.assets_borda, 0, 0);

        // Define as colisões para algumas camadas do mapa
        this.cerca.setCollisionByProperty({ collider: true });
        this.poste.setCollisionByProperty({ collider: true });
        this.acima_poste.setCollisionByProperty({ collider: true });
        this.casa.setCollisionByProperty({ collider: true });
        this.semaforo.setCollisionByProperty({ collider: true });
        this.casa2.setCollisionByProperty({ collider: true });
        this.arvore1.setCollisionByProperty({ collider: true });
        this.arvore2.setCollisionByProperty({ collider: true });
        this.arvore3.setCollisionByProperty({ collider: true });
        this.arvore4.setCollisionByProperty({ collider: true });
        this.arvore5.setCollisionByProperty({ collider: true });
        this.arvore6.setCollisionByProperty({ collider: true });
        this.arvore7.setCollisionByProperty({ collider: true });
        this.arvore8.setCollisionByProperty({ collider: true });
        this.paredePraca.setCollisionByProperty({ collider: true });
        this.faixa.setCollisionByProperty({ collider: true });
        this.portalEscritorio.setCollisionByProperty({ collider: true });
        this.portalTribunal.setCollisionByProperty({ collider: true });
        this.portalBanco.setCollisionByProperty({ collider: true });
        this.portalBuffet1.setCollisionByProperty({ collider: true });
        this.portalBuffet2.setCollisionByProperty({ collider: true });
        this.portalBuffet3.setCollisionByProperty({ collider: true });
        this.portalBuffet4.setCollisionByProperty({ collider: true });
        this.logoBuffets.setCollisionByProperty({ collider: true });
        this.coin.setCollisionByProperty({ collider: true });
        this.borda.setCollisionByProperty({ collider: true });
    }

    adicionarColisoes() {
        // Definição as colisões do jogador com alguns objetos do mapa
        this.physics.add.collider(this.player, this.semaforo);
        this.semaforo.setDepth(10);
        this.physics.add.collider(this.player, this.poste);
        this.physics.add.collider(this.player, this.acima_poste);
        this.acima_poste.setDepth(50);
        this.physics.add.collider(this.player, this.casa);
        this.casa.setDepth(10);
        this.physics.add.collider(this.player, this.arvore8);
        this.physics.add.collider(this.player, this.arvore7);
        this.physics.add.collider(this.player, this.arvore6);
        this.physics.add.collider(this.player, this.arvore5);
        this.physics.add.collider(this.player, this.arvore4);
        this.physics.add.collider(this.player, this.arvore3);
        this.physics.add.collider(this.player, this.arvore2);
        this.arvore2.setDepth(10);
        this.physics.add.collider(this.player, this.arvore1);
        this.physics.add.collider(this.player, this.paredePraca);
        this.physics.add.collider(this.player, this.cerca);
        this.physics.add.collider(this.player, this.casa2);
        this.physics.add.collider(this.player, this.faixa);
        this.physics.add.collider(this.player, this.borda);
        this.physics.add.collider(this.player, this.coin);
        this.coin.setDepth(1000);
        this.physics.add.collider(this.player, this.logoBuffets);
        this.logoBuffets.setDepth(10000);
        
        // Entra no escritório caso o personagem colida com a porta
        this.addCollider(this.player, this.portalEscritorio, 'Escritorio');
        this.addCollider(this.player, this.portalTribunal, 'Tribunal');
        this.addCollider(this.player, this.portalBanco, 'Banco');
        this.addCollider(this.player, this.portalBuffet1, 'Buffet1');
        this.addCollider(this.player, this.portalBuffet2, 'Buffet2');
        this.addCollider(this.player, this.portalBuffet3, 'Buffet3');
        this.addCollider(this.player, this.portalBuffet4, 'Buffet4');
    }

    // Método para adicionar colisões entre dois objetos e definir um evento para ocorrer quando há colisão
    addCollider(obj1, obj2, sceneName) {
      this.physics.add.collider(
        obj1, obj2,
        () => { this.scene.start(sceneName); },
        null, this
      );
    }

    // Método para configurar a câmera da cena e criar um minimapa
    configurarCamera() {
      this.camera = this.cameras.main;
      this.camera.startFollow(this.player);
      this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
      this.camera.setZoom(1.1, 1.1);

      this.createMiniMap();
      this.createMapPins();
    }
    // Método para criar um minimapa na cena
  createMiniMap() {
    // Definições de tamanho e posição do minimapa
    const miniMapX = 500;
    const miniMapY = -250;
    const miniMapWidth = 896;
    const miniMapHeight = 576;

    this.minimap = this.cameras.add(miniMapX, miniMapY, miniMapWidth, miniMapHeight).setZoom(0.1).setVisible(false);
      
    // Adiciona um retângulo ao redor do minimapa para destacá-lo
    const borderGraphics = this.add.graphics();
    borderGraphics.lineStyle(6, 0xD2B48C);
    borderGraphics.strokeRect(miniMapX - 1, miniMapY - 1, miniMapWidth + 2, miniMapHeight + 2);
    borderGraphics.setScrollFactor(0);
    borderGraphics.setScale(0.1);
    borderGraphics.setVisible(false); // Inicialmente invisível
  
      // Adiciona um fundo escuro para o minimapa
      const backgroundGraphics = this.add.graphics();
      backgroundGraphics.fillStyle(0x000000, 0.5);
      backgroundGraphics.fillRect(miniMapX, miniMapY, miniMapWidth, miniMapHeight);
      backgroundGraphics.setScrollFactor(0);
      backgroundGraphics.setVisible(false); // Inicialmente invisível
  
      // Adiciona uma imagem representando a cidade no minimapa
      const miniMapCityImage = this.add.image(miniMapX, miniMapY, 'city').setOrigin(0);
      miniMapCityImage.setScale(miniMapWidth / miniMapCityImage.width, miniMapHeight / miniMapCityImage.height);
      miniMapCityImage.setScrollFactor(0);
      miniMapCityImage.setVisible(false); // Inicialmente invisível
  
      // Função para alternar a visibilidade do minimapa quando a tecla 'M' é pressionada
      const toggleMiniMap = () => {
          const isVisible = this.minimap.visible;
          this.minimap.setVisible(!isVisible);
          borderGraphics.setVisible(!isVisible);
      };
  
      // Define um evento para a tecla 'M' para chamar a função toggleMiniMap
      this.input.keyboard.on('keydown-M', toggleMiniMap);
  
      // Define a ordem de profundidade dos elementos do minimapa
      borderGraphics.setDepth(50);
      backgroundGraphics.setDepth(51);
      miniMapCityImage.setDepth(52);
      // this.playerMiniMapRect.setDepth(100);

  }

  createMapPins() {
    this.faseAtual = this.registry.get("Fase");
    this.buffetsVisitados = this.registry.get("BuffetsVisitados");

    this.pin1 = this.physics.add.sprite(0, 0, 'pin').setScale(5).setDepth(100);
    this.pin3 = this.physics.add.sprite(0, 0, 'pin').setScale(5).setDepth(100).setVisible(false);
    this.pin2 = this.physics.add.sprite(0, 0, 'pin').setScale(5).setDepth(100).setVisible(false);
    this.pin4 = this.physics.add.sprite(0, 0, 'pin').setScale(5).setDepth(100).setVisible(false);
    this.pins = [this.pin1, this.pin2, this.pin3, this.pin4];
    this.pins.forEach(pin => pin.anims.play("pulaPin", true));

    this.pin1.setVisible(this.faseAtual !== 3);
    
    if (this.faseAtual === 1 || this.faseAtual === 2 || this.faseAtual === 4 || this.faseAtual === 5 || this.faseAtual === 8) {
      this.pin1.x = this.positions.escritorio.x;
      this.pin1.y = this.positions.escritorio.y;
    } else if (this.faseAtual === 3) {
      for (let i = 0; i < 4; i++) {
        this.pins[i].setVisible(!this.buffetsVisitados[`buffet${i + 1}`]);
        this.pins[i].x = this.positions[`buffet${i + 1}`].x;
        this.pins[i].y = this.positions[`buffet${i + 1}`].y;
      }
    } else if (this.faseAtual === 6) {
      this.pin1.x = this.positions.tribunal.x;
      this.pin1.y = this.positions.tribunal.y;
    } else if (this.faseAtual === 7) {
      this.pin1.x = this.positions.buffet3.x;
      this.pin1.y = this.positions.buffet3.y;
    } else if (this.faseAtual === 9) {
      this.pin1.x = this.positions.banco.x;
      this.pin1.y = this.positions.banco.y;
    }
  }

  update() {
    this.player.move();
  }

}
