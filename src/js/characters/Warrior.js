import Player from './Player.js';
import Sword from '../weapons/Sword.js';
import Knife from '../weapons/Knife.js';
import Arm from '../weapons/Arm.js';

export default class Warrior extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 120;
    this.speed = 2;
    this.attack = 10;
    this.description = 'Воин';
    this.weapon = new Sword();
  }

  takeDamage(damage) {
    if (this.life < 60 && this.getLuck() > 0.8 && this.magic > 0) {
      const magicDamage = Math.min(damage, this.magic);
      this.magic -= magicDamage;
      console.log(`${this.name} блокировал урон магией! Осталось маны: ${this.magic}`);
    } else {
      this.life = Math.max(this.life - damage, 0);
    }
  }

  checkWeapon() {
    if (this.weapon.isBroken()) {
      console.log(`${this.name} меняет сломанное оружие.`);
      if (this.weapon.constructor.name === 'Sword') {
        this.weapon = new Knife();
      } else if (this.weapon.constructor.name === 'Knife') {
        this.weapon = new Arm();
      }
    }
  }
}
