// src/js/game.js
import Warrior from './characters/Warrior.js';
import Archer from './characters/Archer.js';
import Mage from './characters/Mage.js';
import Dwarf from './characters/Dwarf.js';
import Crossbowman from './characters/Crossbowman.js';
import Demiurge from './characters/Demiurge.js';

export function playGame() {
  console.log("=== НАЧАЛО БИТВЫ ===");

  // Создаём персонажей
  const warrior = new Warrior(1, "Воин");
  const archer = new Archer(5, "Лучник");
  const mage = new Mage(10, "Маг");
  const dwarf = new Dwarf(2, "Гном");
  const crossbowman = new Crossbowman(7, "Арбалетчик");
  const demiurge = new Demiurge(12, "Демиург");

  const players = [warrior, archer, mage, dwarf, crossbowman, demiurge];

  let round = 0;
  while (players.filter(p => !p.isDead()).length > 1) {
    round++;
    console.log(`\n--- Раунд ${round} ---`);

    // Фильтруем живых игроков перед ходом
    const alivePlayers = players.filter(p => !p.isDead());

    // Ход каждого живого игрока
    for (const player of alivePlayers) {
      if (player.isDead()) continue; // Двойная проверка на всякий случай
      console.log(`Ход игрока: ${player.name} (Позиция: ${player.position}, Жизнь: ${player.life})`);
      player.turn(alivePlayers); // Передаём только живых
      player.checkWeapon(); // Проверяем, не сломалось ли оружие после хода
    }

    // Выводим состояние после раунда
    console.log("\nСостояние игроков:");
    for (const player of players) {
      if (player.isDead()) {
        console.log(`${player.name}: [МЁРТВ]`);
      } else {
        console.log(`${player.name}: Жизнь=${player.life}, Позиция=${player.position}, Оружие=${player.weapon.name}`);
      }
    }
  }

  // Определяем победителя
  const survivors = players.filter(p => !p.isDead());
  if (survivors.length === 1) {
    console.log(`\n=== ПОБЕДИТЕЛЬ: ${survivors[0].name} ===`);
  } else if (survivors.length === 0) {
    console.log("\n=== НИЧЬЯ / ВСЕ ПОГИБЛИ ===");
  } else {
    // Если цикл прерван по другой причине
    console.log("\n=== БОЙ ПРЕРВАН ===");
    console.log("Выжившие:", survivors.map(p => p.name));
  }
}