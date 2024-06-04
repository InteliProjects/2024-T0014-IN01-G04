class LoadingScreen extends Phaser.Scene{
    constructor(){
        super({ key: 'LoadingScreen' }); // Define as chave para acessar a classe
    }

    preload() {
        // Adiciona gráficos para exibir o progresso do carregamento
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        
        // Retoma a altura e largura da tela 
        var width = globalVariables.gameWidth;
        var height = globalVariables.gameHeight;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 60,
            text: 'Loading...',
            style: {
                font: '20px',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });

        
        assetText.setOrigin(0.5, 0.5);
        
        // Define eventos para atualizar o progresso do carregamento

        this.load.on('progress', (value) => {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
        
        // Carrega os assets necessários para a cena
        this.load.image('logo', './assets/meta.png');
    }
    create() {
        // Adição da cena do carrossel após o carregamento
        this.scene.start('Carousel');
    }
}