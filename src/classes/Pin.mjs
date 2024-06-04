export default class Pin extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, sprite, scale = 5) {
    super(scene, x, y, sprite).setScale(scale);
  }

  
}