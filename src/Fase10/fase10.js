export default class Fase10 extends Phaser.Scene {
    constructor() {
        super({ key: 'Fase10' });
    }

    preload() {
        this.load.image('fundoFinal', './assets/Fase10/bgfase10.png');
        this.load.image('button1', './assets/Fase10/button1.png');
        this.load.image('button2', './assets/Fase10/button2.png'); 
    }

    create() {
        const larguraTela = this.game.renderer.width ;
        const alturaTela = this.game.renderer.height ;
        
        let bg = this.add.image(0, 0, 'fundoFinal').setDisplaySize(larguraTela, alturaTela).setOrigin(0, 0);
    
        // Cria um grupo para os confetes
        this.confetesGroup = this.add.group();
    
         // Cores disponíveis para os confetes
        const coresConfetes = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
    
        // Loop para criar confetes
        for (let i = 0; i < 100; i++) {

            const x = Phaser.Math.RND.between(0, larguraTela);
            const y = Phaser.Math.RND.between(-alturaTela, 0);
    
            const cor = Phaser.Math.RND.pick(coresConfetes);
    
            const confete = this.add.rectangle(x, y, 10, 10, cor);
    
            this.confetesGroup.add(confete);
    
            this.tweens.add({
                targets: confete,
                y: alturaTela + 10,
                duration: Phaser.Math.RND.between(2000, 4000),
                ease: 'Linear',
                repeat: -1,
                yoyo: false,
                delay: Phaser.Math.RND.between(0, 2000)
            });
        }

        // Adiciona o botão 1 à cena e define interatividade
        const button1 = this.add.sprite(larguraTela /3 , alturaTela - 120, 'button1').setInteractive({ useHandCursor: true });
        button1.setScale(1);
        button1.on('pointerdown', () => {
            this.scene.start("TelaInicial");
        });

        // Adiciona o botão 2 à cena e define interatividade
        const button2 = this.add.sprite(larguraTela / 2 + 200, alturaTela - 120, 'button2').setInteractive({ useHandCursor: true });
        button2.setScale(1);
        button2.on('pointerdown', () => {
            this.scene.start("TelaInicial");
        });
    }
}
