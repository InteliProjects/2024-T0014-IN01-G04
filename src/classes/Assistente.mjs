
// Classe Assistente estende Phaser.GameObjects.Container
export default class Assistente extends Phaser.GameObjects.Container {
    // Construtor da classe
    constructor(scene, x, y, dialogWidth, dialogHeight, dialogList) {
        // Chama o construtor da classe pai (Phaser.GameObjects.Container)
        super(scene, x, y);

        // Atribui a lista de diálogos e inicializa o índice do diálogo atual como 0
        this.dialogList = dialogList;
        this.currentDialogIndex = 0;

        // Adiciona a imagem do assistente
        this.image = scene.add.image(scene.game.renderer.width/49, scene.game.renderer.height/3.9, 'metaBOT').setOrigin(0);
        this.add(this.image);

        const textX = scene.game.renderer.width * 0.2;
        const textY = scene.game.renderer.width * 0.2;
        // Adiciona o texto do diálogo atual
        this.text = scene.add.text(textX/1.3, textY/0.93, this.dialogList[this.currentDialogIndex], { font: '20px Arial', fill: '#000' });
        this.add(this.text).setDepth(100000000);

        // Define os listeners de teclado para avançar para o próximo diálogo (ENTER) e mudar a visibilidade (SPACE)
        scene.input.keyboard.on('keydown-ENTER', () => { this.avancarProximaInstrucao(); });
        scene.input.keyboard.on('keydown-SPACE', () => { this.mudarVisibilidade(); });

        // Adiciona o assistente à cena
        const box = scene.add.existing(this);
        box.setDepth(100000);
    }
    
    // Método para avançar para o próximo diálogo
    avancarProximaInstrucao() {
        // Incrementa o índice do diálogo atual
        this.currentDialogIndex++;
        // Verifica se ainda há diálogos na lista
        if (this.currentDialogIndex < this.dialogList.length) {
            // Atualiza o texto para o próximo diálogo
            this.text.setText(this.dialogList[this.currentDialogIndex]);
        } else {
            // Caso contrário, exibe uma mensagem de fim dos diálogos e torna a assistente invisível
            console.log("Fim dos diálogos");
            this.mudarVisibilidade();
        }
    }
    
    // Método para mudar a visibilidade do assistente
    mudarVisibilidade() {
        this.setVisible(!this.visible);
    }
}
