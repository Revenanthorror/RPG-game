import Warrior from './Warrior.js';
import Axe from '../weapons/Axe.js';
import Knife from '../weapons/Knife.js';
import Arm from '../weapons/Arm.js';

export default class Dwarf extends Warrior {
  constructor(position, name) {
    super(position, name);
    this.life = 130;
    this.attack = 15;
    this.luck = 20;
    this.description = 'Гном';
    this.weapon = new Axe();
    this.hitCount = 0;
  }

  takeDamage(damage) {
    this.hitCount += 1;
    let actualDamage = damage;
    if (this.hitCount % 6 === 0 && this.getLuck() > 0.5) {
      actualDamage = damage / 2;
      console.log(`${this.name} получил половинный урон благодаря удаче!`);
    }
    super.takeDamage(actualDamage);
  }

  checkWeapon() {
    if (this.weapon.isBroken()) {
      console.log(`${this.name} меняет сломанное оружие.`);
      if (this.weapon.constructor.name === 'Axe') {
        this.weapon = new Knife();
      } else if (this.weapon.constructor.name === 'Knife') {
        this.weapon = new Arm();
      }
    }
  }
}
