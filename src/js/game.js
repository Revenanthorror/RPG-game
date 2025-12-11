import Warrior from './characters/Warrior';
import Mage from './characters/Mage';
import Archer from './characters/Archer';
import Dwarf from './characters/Dwarf';
import Crossbowman from './characters/Crossbowman';
import Demiurge from './characters/Demiurge';

export function play(players) {
  console.log('Игра начинается!');
  
  while (players.filter(player => !player.isDead()).length > 1) {
    players.forEach(player => {
      if (!player.isDead()) {
        player.turn(players.filter(p => !p.isDead()));
      }
    });
  }
  
  const winner = players.find(player => !player.isDead());
  console.log(`Победитель: ${winner.name} (${winner.description})`);
  return winner;
}