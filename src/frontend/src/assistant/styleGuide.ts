export function formatResponse(content: string): string {
  // Ensure responses are friendly and clear
  return content.trim();
}

export function createBulletList(items: string[]): string {
  return items.map(item => `• ${item}`).join('\n');
}

export function createNumberedList(items: string[]): string {
  return items.map((item, i) => `${i + 1}. ${item}`).join('\n');
}

export function addEncouragement(): string {
  const encouragements = [
    "You've got this! 💪",
    "Keep up the great work! ✨",
    "One step at a time! 🌟",
    "You're doing amazing! 🎉",
    "Stay positive! 🌈",
    "Believe in yourself! 💫",
  ];
  return encouragements[Math.floor(Math.random() * encouragements.length)];
}
