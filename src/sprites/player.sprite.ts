import { Sprite } from '../lib/sprite.class';
import { ISpriteConfig } from '../interfaces/interfaces';
import { PlayerController } from '../objects/controls/player-controller';

const playerConfig = {
  rotationDegree: 5,
  thrustSpeed: 0.01,
  angle: 90,
  scale: 0.25,
  frictionAir: 0.05,
  mass: 30,
  depth: 1000,
};

const degreeToRadian = d => d * Math.PI / 180;

export class Player extends Sprite {
  rotationRadian: number;
  thrustSpeed: number;
  controller = new PlayerController();
  
  constructor(world: Phaser.Physics.Matter.World, spriteConfig: ISpriteConfig, {
    rotationDegree,
    thrustSpeed,
    angle,
    scale,
    frictionAir,
    mass,
    depth,
  } = playerConfig) {
    super(world, spriteConfig.x, spriteConfig.y, spriteConfig.name);
    this.setScale(scale, scale);
    this.setAngle(angle);
    this.setFrictionAir(frictionAir);
    this.setMass(mass);
    this.depth = depth;
    
    this.rotationRadian = degreeToRadian(rotationDegree);
    this.thrustSpeed = thrustSpeed;
    
    this.setOnCollide(() => {
      // make explosion animation, and restart scene
      console.error('you died');
    });
    
    this.controller.init();
  }
  
  public manageControls({ up, right, left }: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (up?.isDown) {
      this.thrustLeft(this.thrustSpeed);
    }
    
    if (right?.isDown) {
      this.setRotation(this.rotation += this.rotationRadian);
    } else if (left?.isDown) {
      this.setRotation(this.rotation -= this.rotationRadian);
    }
  }

  
}