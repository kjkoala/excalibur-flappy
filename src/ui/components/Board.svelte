<script lang="ts">
  import { fly } from "svelte/transition";
  import { resources } from "src/app/resources"
  import { setScore } from "src/ui/api/setScore";
  import type { User } from "../types";
  
  export let score: number;
  export let me: User | undefined;

  </script>
  
  <div in:fly={{ delay: 250, duration: 800, y: '100%'}} class="board">
    <div class="medal">
      <div class="text">medal</div>
      <div class="medalIcon">
        <img src={resources.bronze.path}>
      </div>
    </div>
    <div class="score__table">
      <div>
        <div class="text">score</div>
        <div class="board__score score">{score}</div>
      </div>
      <div>
        <div class="text">best</div>
        <div class="board__score score">{me?.score ? score > me.score ? score : me.score : score}</div>
      </div>
    </div>
    {#if (me && score > me.score) || score > 0}
      {#await setScore(score) then}
        <slot />
      {/await}
    {:else}
      <slot />
    {/if}
    </div>
  <style>
      .medal {
         flex: 1 1 150px;
        }
        .medalIcon {
          width: 60px;
          height: 60px;
          aspect-ratio: 1/1;
          border-radius: 50%;
          margin-top: 6px;
          background-color: #ccca89; 
          box-shadow: inset 0 2px 0 1px #ccb25c, inset 0 0px 0 1px #fff;
        }
        .medalIcon img {
          width: 100%;
          height: 100%;
          image-rendering: pixelated;
        }

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
            box-shadow: inset 1px 1px 0 0 #f0e3bb, inset 3px 3px 0 0 #efe1aa, inset -3px -3px 0 0 #efe1aa, inset -4px -4px 0 0 white, inset 5px 5px 0 0 #ccb25c, 0 1px 0 2px #563737;
        }
        .score.board__score {
          padding: 0;
          font-size: 1rem;
          margin-top: 0.4rem;
        }

        
.text {
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