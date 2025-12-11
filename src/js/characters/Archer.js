import Player from './Player.js';
import Bow from '../weapons/Bow.js';
import Knife from '../weapons/Knife.js';
import Arm from '../weapons/Arm.js';

export default class Archer extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 80;
    this.magic = 35;
    this.attack = 5;
    this.agility = 10;
    this.description = 'Лучник';
    this.weapon = new Bow();
  }

  getDamage(distance) {
    if (distance > this.weapon.range) return 0;

    const baseDamage = this.attack + this.weapon.getDamage();
    const luckFactor = baseDamage * this.getLuck();
    return (luckFactor * distance) / this.weapon.range;
  }

  checkWeapon() {
    if (this.weapon.isBroken()) {
      console.log(`${this.name} меняет сломанное оружие.`);
      if (this.weapon.constructor.name === 'Bow') {
        this.weapon = new Knife();
      } else if (this.weapon.constructor.name === 'Knife') {
        this.weapon = new Arm();
      }
    }
  }
}
