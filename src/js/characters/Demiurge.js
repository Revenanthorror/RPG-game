import Mage from './Mage.js';
import StormStaff from '../weapons/StormStaff.js';
import Knife from '../weapons/Knife.js';
import Arm from '../weapons/Arm.js';

export default class Demiurge extends Mage {
  constructor(position, name) {
    super(position, name);
    this.life = 80;
    this.magic = 120;
    this.attack = 6;
    this.luck = 12;
    this.description = 'Демиург';
    this.weapon = new StormStaff();
  }

  getDamage(distance) {
    let damage = super.getDamage(distance);
    if (this.magic > 0 && this.getLuck() > 0.6) {
      damage *= 1.5;
      this.magic -= 10;
      console.log(`${this.name} использует магию для усиления атаки! Осталось маны: ${this.magic}`);
    }
    return damage;
  }

  checkWeapon() {
    if (this.weapon.isBroken()) {
      console.log(`${this.name} меняет сломанное оружие.`);
      if (this.weapon.constructor.name === 'StormStaff') {
        this.weapon = new Knife();
      } else if (this.weapon.constructor.name === 'Knife') {
        this.weapon = new Arm();
      }
    }
  }
}
