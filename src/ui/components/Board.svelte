<script lang="ts">
  import { fly } from "svelte/transition";
  import { setScore } from "src/ui/api/setScore";
  import type { User } from "../types";
  import Medals from "./Medals.svelte";

  export let score: number;
  export let me: User | undefined;
</script>

<div in:fly={{ delay: 250, duration: 800, y: "100%" }} class="board">
  <Medals {me} />
  <div class="score__table">
    <div>
      <div class="text">score</div>
      <div class="board__score score">{score}</div>
    </div>
    <div>
      <div class="text">best</div>
      <div class="board__score score">
        {me?.score ? (score > me.score ? score : me.score) : score}
      </div>
    </div>
  </div>
  {#if (me && score > me.score) || (!me && score > 0)}
    {#await setScore(score) then}
      <slot />
    {/await}
  {:else}
    <slot />
  {/if}
</div>

<style>
  .score {
    display: flex;
    justify-content: center;
    padding: 1rem;
    font-size: 1.5rem;
    color: white;
    text-shadow: 0 1px black, 3px 0 black, -1px 0 black, 0 -1px black;
  }

  .board {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    padding: 10px 20px;
    margin: auto;
    background-color: #dcda94;
    width: 100%;
    max-width: 350px;
    box-shadow: inset 1px 1px 0 0 #f0e3bb, inset 3px 3px 0 0 #efe1aa,
      inset -3px -3px 0 0 #efe1aa, inset -4px -4px 0 0 white,
      inset 5px 5px 0 0 #ccb25c, 0 1px 0 2px #563737;
  }
  .score.board__score {
    padding: 0;
    font-size: 1rem;
    margin-top: 0.4rem;
  }

  .board :global(.text) {
    text-transform: uppercase;
    color: #ccb25c;
    text-shadow: 0 2px #f0e3bb;
  }

  .score__table {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
</style>
