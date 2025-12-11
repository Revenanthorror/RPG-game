import Player from './Player.js';
import Staff from '../weapons/Staff.js';
import Knife from '../weapons/Knife.js';
import Arm from '../weapons/Arm.js';

export default class Mage extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 70;
    this.magic = 100;
    this.attack = 5;
    this.agility = 8;
    this.description = 'Маг';
    this.weapon = new Staff();
  }

  takeDamage(damage) {
    let actualDamage = damage;
    if (this.magic > 50) {
      this.magic -= 12;
      actualDamage = damage / 2;
      console.log(`${this.name} использует магию для защиты! Осталось маны: ${this.magic}`);
    }
    this.life = Math.max(this.life - actualDamage, 0);
  }

  checkWeapon() {
    if (this.weapon.isBroken()) {
      console.log(`${this.name} меняет сломанное оружие.`);
      if (this.weapon.constructor.name === 'Staff') {
        this.weapon = new Knife();
      } else if (this.weapon.constructor.name === 'Knife') {
        this.weapon = new Arm();
      }
    }
  }
}
