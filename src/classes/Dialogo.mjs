export default class Dialogo extends Phaser.GameObjects.Container { // define a classe chamada Dialogo que estende a classe Container
   // define o construtor da classe, aceitando os parâmetros scene, dialogue, spriteKey e charName
    constructor(scene, posX, posY, dialogue, spriteKey, charName) { 

        // Chama o construtor da classe pai com a cena fornecida
        super(scene);

        // Inicializa as variáveis da instância da classe
        this.dialogue = dialogue;
        this.spriteKey = spriteKey;
        this.charName = charName;
        this.posX = posX;
        this.posY = posY;

        // Define a largura e a altura da tela da câmera principal da cena
        this.width = this.scene.cameras.main.width;
        this.height = this.scene.cameras.main.height;
        this.i = 0; //Índice usado para acompanhar o progresso do diálogo
    }

   //Método para mostrar visualmente os elementos do diálogo 
    createDialogue(scene = this.scene) {

        //Divide o diálogo em substrings para o comprimento do diálogo não se extender muito
        this.substrings = this.splitDialogue();
        
        //Define o estilo do diálogo    
        this.dialogueStyle = {
            fontSize: "10px",
            color: "#000000"
        }
        
        //Cria um objeto do texto com a posição definida
        if(this.substrings.length <= 1){
            this.texto1 = scene.add.text(this.posX, this.posY, this.substrings[0], this.dialogueStyle).setOrigin(0.5);
        }else{
            this.texto1 = scene.add.text(this.posX, this.posY-5, this.substrings[0], this.dialogueStyle).setOrigin(0.5);
            this.texto2 = scene.add.text(this.posX, this.posY+5, this.substrings[1], this.dialogueStyle).setOrigin(0.5);
        }
        
        

        //Cria uma caixa de diaálogo
        this.box = scene.add.image(this.posX, this.posY, "dialogueBox").setScale(0.13, 0.13);
        this.box.depth = 200;//Define a profundidade da caixa de diálogo
        this.texto1.depth = 201; //Define a profundidade do texto
        this.texto2.depth = 202;

        const boxBounds = this.box.getBounds();//Obtém o limite da caixa de diálogo
        
        // Cria um texto com o nome do personagem acima da caixa de diálogo
        this.nome = scene.add.text(this.posX - 50, this.posY - 30, this.charName, { fontSize: "20px", color: "#0668E1" }).setOrigin();
        this.nome.depth = 201; //Define a profundidade do texto com o nome da personagem
        
        // Define um listener de evento para a tecla de espaço, que avança para o próximo pedaço do diálogo
        this.scene.input.keyboard.on('keydown-SPACE', this.changeDialogueText, this);
        // console.log(this.substrings);
    }

     // Método para avançar para o próximo pedaço do diálogo
    changeDialogueText(scene = this.scene){  
        let contador = 0;
        console.log(this.substrings);
        for(let n = 0; n < 2; n++){
            if(this.i < this.substrings.length){
                this.i++;
                contador++;
            }
        }
        if(contador === 2){
            this.texto1.setText(this.substrings[this.i-1]);
            this.texto2.setText(this.substrings[this.i]); 
        }else if(contador === 1){
            this.texto1.setText(this.substrings[this.i]);
            this.texto2.destroy();
        }else{
            this.deleteDialogue();
        }

        if(this.texto1.text.trim() == ""){
            this.deleteDialogue();
        }
    }
    // Método para remover os elementos visuais do diálogo
    deleteDialogue(){
        if (this.box) {
            this.box.destroy();
          }
          if (this.texto1) {
            this.texto1.destroy();
          }
          if(this.texxto2){
            this.texto2.destroy();
          }
          if (this.imagem) {
            this.imagem.destroy();
          }
          if(this.nome){
            this.nome.destroy();
          }
          this.scene.physics.resume();
          this.i = 0;
          this.changeScene();
        
    }
    // Método para dividir o diálogo em substrings com um comprimento máximo
    splitDialogue() {
        const dialogue = this.dialogue;
        const maxLength = 40; // Comprimento máximo de cada linha do diálogo
        const words = dialogue.split(' ');
        let substrings = [];
        let currentString = '';
    
        for (let i = 0; i < words.length; i++) {
            if (currentString.length + words[i].length < maxLength) { // Verifica se a próxima palavra cabe na linha atual
                if (currentString.length > 0) {
                    currentString += ' ';
                }
                currentString += words[i]; // Adiciona a palavra à linha atual
            } else {
                substrings.push(currentString.trim()); // Adiciona a linha atual às substrings
                currentString = words[i]; // Inicia uma nova linha com a palavra atual
            }
        }
    
        if (currentString) {
            substrings.push(currentString.trim()); // Adiciona a última linha, se houver
        
        }
    
        return substrings; // Retorna as substrings do diálogo
    }

    changeScene(){
        if(this.scene.registry.get("Fase") === 6){
            this.scene.scene.start("Fase6");
        }
    }


    
}