import { writable } from 'svelte/store';

// hardkoda 4 spillere foreløpig
export const playersStore = writable([
  { name: 'perry', score: 0 },
  { name: 'tobben', score: 0 },
  { name: 'arild', score: 0 },
  { name: 'pettern', score: 0 }
]);

export const answersStore = writable([
  // {
  //   questionID: 0,
  //   playerID: 0,
  //   answer: "svar på spørsmål 0 fra spiller 0"
  // }
]);

export const questionsDatabase = [
    "Hva er du redd for?",
    "Hvem vil du helst ligge med av alle i hele verden?",
    "Finn på et morsomt jentenavn!",
    "Hva er din seksuelle fantasi?"
]