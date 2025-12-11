import Arm from '../weapons/Arm.js';
import Knife from '../weapons/Knife.js';

export default class Player {
  constructor(position, name) {
    this.life = 100;
    this.magic = 20;
    this.speed = 1;
    this.attack = 10;
    this.agility = 5;
    this.luck = 10;
    this.description = 'Игрок';
    this.weapon = new Arm();
    this.position = position;
    this.name = name;
  }

  getLuck() {
    return (((Math.random()) * (100 + this.luck)) / 100);
  }

  getDamage(distance) {
    if (distance > this.weapon.range) return 0;
    return (((this.attack + this.weapon.getDamage()) * this.getLuck()) / distance);
  }

  takeDamage(damage) {
    this.life = Math.max(this.life - damage, 0);
  }

  isDead() {
    return this.life === 0;
  }

  moveLeft(distance) {
    this.position = Math.max(this.position - Math.min(distance, this.speed), 0);
  }

  moveRight(distance) {
    this.position += Math.min(distance, this.speed);
  }

  move(distance) {
    if (distance < 0) {
      this.moveLeft(Math.abs(distance));
    } else {
      this.moveRight(distance);
    }
  }

  isAttackBlocked() {
    return this.getLuck() > ((100 - this.luck) / 100);
  }

  dodged() {
    return this.getLuck() > (((100 - this.agility) - (this.speed * 3)) / 100);
  }

  takeAttack(damage, newPosition = null) {
    if (newPosition !== null) {
      this.position = newPosition;
    }
    if (this.isAttackBlocked()) {
      this.weapon.takeDamage(damage);
      console.log(`${this.name} блокировал атаку! Оружие получило урон ${damage}`);
    } else if (this.dodged()) {
      console.log(`${this.name} уклонился от атаки!`);
    } else {
      this.takeDamage(damage);
      console.log(`${this.name} получил урон ${damage}. Здоровье: ${this.life}`);
    }
    this.checkWeapon();
  }

  checkWeapon() {
    if (this.weapon.isBroken()) {
      console.log(`${this.name} меняет сломанное оружие.`);
      if (this.weapon.constructor.name === 'Knife') {
        this.weapon = new Arm();
      } else {
        this.weapon = new Knife();
      }
    }
  }

  tryAttack(enemy) {
    const distance = Math.abs(this.position - enemy.position);

    if (distance > this.weapon.range) {
      const attackMessage = `${this.name} атакует ${enemy.name} вплотную!`;
      const positionMessage = `${enemy.name} отлетает на 1 клетку.`;
      console.log(`${attackMessage} ${positionMessage}`);
      return;
    }

    const weaponDamage = 10 * this.getLuck();
    this.weapon.takeDamage(weaponDamage);

    let damage = this.getDamage(distance);

    if (this.position === enemy.position) {
      const newEnemyPosition = enemy.position + 1;
      console.log(`${this.name} атакует ${enemy.name} вплотную!`);
      console.log(`${enemy.name} отлетает на 1 клетку.`);
      damage *= 2;
      enemy.takeAttack(damage, newEnemyPosition);
    } else {
      enemy.takeAttack(damage);
    }
  }

  chooseEnemy(players) {
    let minHealth = Infinity;
    let chosenEnemy = null;

    players.forEach((player) => {
      if (player !== this && !player.isDead() && player.life < minHealth) {
        minHealth = player.life;
        chosenEnemy = player;
      }
    });

    return chosenEnemy;
  }

  moveToEnemy(enemy) {
    if (!enemy) return;

    const distanceToEnemy = enemy.position - this.position;

    if (distanceToEnemy < 0) {
      this.moveLeft(this.speed);
    } else if (distanceToEnemy > 0) {
      this.moveRight(this.speed);
    }
  }

  turn(players) {
    const enemy = this.chooseEnemy(players);
    if (!enemy) return;

    console.log(`\n${this.name} (${this.description}) делает ход:`);
    this.moveToEnemy(enemy);
    this.tryAttack(enemy);
  }
}
