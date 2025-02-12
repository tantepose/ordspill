<script>
    // en slags state-hælvete, dette må fikses, bytte store med state
    import { playersStore, answersStore, questionsDatabase } from '$lib/store';

    let players;
    const unsubscribeplayersStore = playersStore.subscribe(value => {
        players = value;
    });

    let answers;
    const unsubscribeanswersStore = answersStore.subscribe(value => {
        answers = value;
    });

    // oppsett
    let gameState = "setup";
    let currentPlayer = 0;

    // legge inn nye svar
    let newAnswers = [];
    function submitAnswer() {
        newAnswers.forEach(answer => {
            answers.push(answer);            
        });

        newAnswers = [];
        console.log(answers)
    };

    // sjekke gjetting
    let newGuesses = [];
    function checkGuesses() {
        console.log(newGuesses);
        newGuesses.forEach(guess => {
            if (guess.guessedID == guess.trueID) {
                players[currentPlayer].score++;
                console.log("hurra! " + players[currentPlayer].name + " har " + players[currentPlayer].score);
            } else {
                console.log("feil!");
            }
        });
        newGuesses = []
    }

</script>

{#key currentPlayer}

<!-- OPPSETT -->

{#if gameState == "setup"}
    <h1>hvem spiller?</h1>
    <input type="text" placeholder="spiller1" bind:value={$playersStore[0].name}>
    <input type="text" placeholder="spiller2" bind:value={$playersStore[1].name}>
    <input type="text" placeholder="spiller3" bind:value={$playersStore[2].name}>
    <input type="text" placeholder="spiller4" bind:value={$playersStore[3].name}>
    <button on:click={() => gameState = "answering"}>START SPILL</button>

<!-- SVARE PÅ SPØRSMÅL -->

{:else if gameState == "answering"}
    <h1>{players[currentPlayer].name}, svar ærlig:</h1>
    {#each questionsDatabase as question, index}
        <p>{question}</p>
        <input type="text" placeholder="Ditt svar" value=""
            on:input={(e) => {
            newAnswers[index] = { questionID: index, playerID: currentPlayer, answer: e.target.value };
        }}
        >
    {/each}
    
    {#if currentPlayer == players.length - 1}
        <button 
            on:click={() => {
                submitAnswer()
                currentPlayer = 0;
                gameState = "guessing";
                window.scrollTo(0, 0);
            }}
        >OK, til gjetting!</button>
    {:else}
        <button 
            on:click={() => {
                submitAnswer()
                currentPlayer++
                window.scrollTo(0, 0);     
            }}        
        >OK, neste spiller!</button>
    {/if}

<!-- GJETTING -->

{:else if gameState == "guessing"}
    <h1>{players[currentPlayer].name}, gjett hvem som svarte hva:</h1>
    
    {#each questionsDatabase as question, index }
        <h2>{question}</h2>
        {#each answers.filter(answer => answer.questionID == index) as answer}
            <p>«{answer.answer}» (fra {players[answer.playerID].name})</p>
            <!-- dette funker ikke; kan ikke pushe hver gang endrer -->
            <select on:change={(e)=>newGuesses.push ({guessedID: e.target.value, trueID: answer.playerID})}>
                <option disabled selected value> velg spiller </option>
                {#each players as player, index}
                    <option value={index}>{player.name} </option>
                {/each}
            </select>
        {:else}
            <p>ingenting å vise!</p>
        {/each}
    {/each}

    {#if currentPlayer == players.length - 1}
        <button on:click={() => {
            checkGuesses()
            gameState = "scoring"
            window.scrollTo(0, 0);
        }}>OK, til scoring!</button>
    {:else}
        <button on:click={() => 
            {
                checkGuesses()
                currentPlayer = (currentPlayer + 1)
                window.scrollTo(0, 0); 
            }}>OK, neste spiller!</button>
    {/if}

<!-- SCORING -->

{:else if gameState == "scoring"}
    <h1>Scoring!</h1>
    {#each players as player}
        <p>{player.name}: {player.score} poeng!</p>
    {/each}

{:else}
    <h1>wat!?</h1>
{/if}

{/key}