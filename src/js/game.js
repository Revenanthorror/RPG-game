export function play(players) {
  console.log('🎮 Начинается эпическая битва!');

  let round = 1;
  while (players.filter((player) => !player.isDead()).length > 1) {
    console.log(`\n=== Раунд ${round} ===`);

    const activePlayers = players
      .filter((player) => !player.isDead())
      .sort((a, b) => b.speed - a.speed);

    activePlayers.forEach((player) => {
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
  return winner;
}
