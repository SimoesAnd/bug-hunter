export const achievements = [
  {
    id: "first_login",
    title: "Primeira Caçada",
    description: "Entrou no BugHunter pela primeira vez!",
    rarity: "Comum",
    condition: (user, progress) => true
  },
  {
    id: "level_1_complete",
    title: "Caçador Iniciante",
    description: "Completou o primeiro nível.",
    rarity: "Comum",
    condition: (user, progress) => progress >= 1
  },
  {
    id: "level_10_complete",
    title: "Aprendiz Dedicado",
    description: "Chegou ao nível 10. Você está pegando o jeito!",
    rarity: "Comum",
    condition: (user, progress) => progress >= 10
  },
  {
    id: "level_20_complete",
    title: "Caçador Intermediário",
    description: "Alcançou o nível 20. Os bugs tremem na sua presença.",
    rarity: "Raro",
    condition: (user, progress) => progress >= 20
  },
  {
    id: "js_master",
    title: "Mestre da Lógica",
    description: "Superou o nível 35 e dominou o JavaScript!",
    rarity: "Raro",
    condition: (user, progress) => progress >= 35
  },
  {
    id: "web_architect",
    title: "Arquiteto Web",
    description: "Chegou aos desafios de HTML e CSS (Nível 40+).",
    rarity: "Épico",
    condition: (user, progress) => progress >= 40
  },
  {
    id: "game_complete",
    title: "Lenda Viva",
    description: "Completou absolutamente TODOS os níveis disponíveis!",
    rarity: "Lendário",
    condition: (user, progress, totalLevels) => progress >= totalLevels
  }
];