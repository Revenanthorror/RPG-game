import Archer from './Archer.js';
import LongBow from '../weapons/LongBow.js';
import Knife from '../weapons/Knife.js';
import Arm from '../weapons/Arm.js';

export default class Crossbowman extends Archer {
  constructor(position, name) {
    super(position, name);
    this.life = 85;
    this.attack = 8;
    this.agility = 20;
    this.luck = 15;
    this.description = 'Арбалетчик';
    this.weapon = new LongBow();
  }

  checkWeapon() {
    if (this.weapon.isBroken()) {
      console.log(`${this.name} меняет сломанное оружие.`);
      if (this.weapon.constructor.name === 'LongBow') {
        this.weapon = new Knife();
      } else if (this.weapon.constructor.name === 'Knife') {
        this.weapon = new Arm();
      }
    }
  }
}
