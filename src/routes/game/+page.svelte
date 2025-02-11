<script>
    // en slags state-hælvete
    import { playersStore, questionsDatabase } from '$lib/store';
    let players;
    const unsubscribe = playersStore.subscribe(value => {
        players = value;
    });
    console.log(players);

    // $playersStore.push({ name: "petteren", score:1 });
    // $playersStore[0].score = 2;

    let gameState = "setup";
    let currentPlayer = 0;

    console.log(questionsDatabase)

    function startGuessing() {
        gameState = "guessing";
        currentPlayer = 0;
    }

</script>
<!-- {#each players as player}
    <p>{player.name}: {player.score}</p>
{/each} -->

{#if gameState == "setup"}
    <h1>hvem spiller?</h1>
    <input type="text" placeholder="player name" bind:value={$playersStore[0].name}>
    <input type="text" placeholder="player name" bind:value={$playersStore[1].name}>
    <input type="text" placeholder="player name" bind:value={$playersStore[2].name}>
    <input type="text" placeholder="player name" bind:value={$playersStore[3].name}>
    <button on:click={() => gameState = "answering"}>Start game</button>

{:else if gameState == "answering"}
    <h1>{players[currentPlayer].name}, svar ærlig:</h1>
    <p>{questionsDatabase[0]}</p>
    <input type="text" placeholder="Ditt svar" bind:value={players[currentPlayer].answers[0]}>
    <p>{questionsDatabase[1]}</p>
    <input type="text" placeholder="Ditt svar" bind:value={players[currentPlayer].answers[1]}>
    <p>{questionsDatabase[2]}</p>
    <input type="text" placeholder="Ditt svar" bind:value={players[currentPlayer].answers[2]}>
    
    {#if currentPlayer == players.length - 1}
        <button on:click={() => startGuessing()}>OK, til gjetting!!</button>
    {:else}
        <button on:click={() => currentPlayer = (currentPlayer + 1) }>OK, neste spiller!</button>
    {/if}


{:else if gameState == "guessing"}
    <h1>{players[currentPlayer].name}, gjett hvem som svarte hva:</h1>
    
    {#each questionsDatabase as question }
        <h2>{question}</h2>
        {#each players as player}
            <p>«{player.answers[questionsDatabase.indexOf(question)]}»</p>
            <select bind:value={players[currentPlayer].guesses[questionsDatabase.indexOf(question)][players.indexOf(player)]}> // her må vi ha en todimensjonal array av noe slag
                {#each players as player}
                    <option value={player.name}>{player.name}</option>
                {/each}
            </select>
        {/each}
    {/each}

    {#if currentPlayer == players.length - 1}
        <button on:click={() => gameState = "scoring"}>OK, til scoring!!</button>
    {:else}
        <button on:click={() => currentPlayer = (currentPlayer + 1) }>OK, neste spiller!</button>
    {/if}
{/if}


