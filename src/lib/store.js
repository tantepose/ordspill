import { writable } from 'svelte/store';

export const playersStore = writable([
  { name: 'Spiller 1', score: 0, answers: [], guesses: [] },
  { name: 'Spiller 2', score: 0, answers: [], guesses: [] },
  { name: 'Spiller 3', score: 0, answers: [], guesses: [] },
  { name: 'Spiller 4', score: 0, answers: [], guesses: [] }
]);

export const questionsDatabase = [
    "Hva er din favorittmat?",
    "Hva er ditt favorittband?",
    "Hva er din favorittkuk?"
]