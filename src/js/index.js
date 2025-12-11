import { play } from './game';

const warrior = new Warrior(0, 'Алёша Попович');
const archer = new Archer(5, 'Леголас');
const mage = new Mage(10, 'Гендальф');

const winner = play([warrior, archer, mage]);
console.log(`Победитель: ${winner.name}`);