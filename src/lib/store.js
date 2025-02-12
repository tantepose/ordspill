import { writable } from 'svelte/store';

// hardkoda 4 spillere foreløpig
export const playersStore = writable([
  { name: '', score: 0 },
  { name: '', score: 0 },
  { name: '', score: 0 },
  { name: '', score: 0 }
]);

export const answersStore = writable([
  // {
  //   questionID: 0,
  //   playerID: 0,
  //   answer: "svar på spørsmål 0 fra spiller 0"
  // }
]);

export const questionsDatabase = [
    "Hva er din favorittmat?",
    "Hva er ditt favorittband?",
    "Hva er din seksuelle fantasi?",
    "Hva er din favorittbok?"
]