console.log("[DEBUG] Loading game.js module...");

import Warrior from './characters/Warrior.js';
import Archer from './characters/Archer.js';
import Mage from './characters/Mage.js';
import Dwarf from './characters/Dwarf.js';
import Crossbowman from './characters/Crossbowman.js';
import Demiurge from './characters/Demiurge.js';

console.log("[DEBUG] Imported character classes in game.js");

export function play(players) {
  console.log('[DEBUG] Function play() started.');
  console.log('🎮 Начинается эпическая битва!');

  let round = 1;
  while (players.filter((player) => !player.isDead()).length > 1) {
    console.log(`\n=== Раунд ${round} ===`);

    const activePlayers = players
      .filter((player) => !player.isDead())
      .sort((a, b) => b.speed - a.speed);

    console.log(`[DEBUG] Active players for round ${round}: ${activePlayers.map(p => p.name).join(', ')}`);

    activePlayers.forEach((player) => {
      console.log(`[DEBUG] Player ${player.name} is about to take their turn.`);
      player.turn(players.filter((p) => !p.isDead()));
    });

    console.log('\nТекущее состояние:');
    players.forEach((player) => {
      const status = player.isDead() ? '💀 МЕРТВ' : `❤️ ${player.life} HP, 🔮 ${player.magic} MP`;
      console.log(
        `${player.name} (${player.description}): ${status}, `
        + `позиция: ${player.position}, оружие: ${player.weapon.name} `
        + `(${player.weapon.durability}/${player.weapon.initDurability})`,
      );
    });

    round += 1;
  }

  const winner = players.find((player) => !player.isDead());
  console.log(`\n🏆 ПОБЕДИТЕЛЬ: ${winner.name} (${winner.description})`);
  console.log('[DEBUG] Function play() finished.');
  return winner;
}
console.log("[DEBUG] game.js module loaded and play function defined.");