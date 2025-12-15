import { playGame } from './js/game.js';
import Warrior from './js/characters/Warrior.js';
import Archer from './js/characters/Archer.js';
import Mage from './js/characters/Mage.js';
import Dwarf from './js/characters/Dwarf.js';
import Crossbowman from './js/characters/Crossbowman.js';
import Demiurge from './js/characters/Demiurge.js';

const warrior = new Warrior(0, 'Алёша Попович');
const archer = new Archer(5, 'Леголас');
const mage = new Mage(10, 'Гендальф');
const dwarf = new Dwarf(3, 'Гимли');
const crossbowman = new Crossbowman(8, 'Робин Гуд');
const demiurge = new Demiurge(15, 'Волан-де-Морт');

const winner = play([warrior, archer, mage, dwarf, crossbowman, demiurge]);
console.log(`🏁 Финальный победитель: ${winner.name}`);
