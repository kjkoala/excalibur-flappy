<script lang="ts">
  import { resources } from "src/app/resources";
  import { backIn } from "svelte/easing";
  import { fly } from "svelte/transition";

  let gameoverContainer: HTMLDivElement | undefined;

  Promise.resolve().then(() => {
    if (gameoverContainer) {
      gameoverContainer.append(resources.gameover.data);
    }
  });
</script>

<div
  in:fly={{ duration: 800, y: "-100%", opacity: 1, easing: backIn }}
  class="gameover"
  bind:this={gameoverContainer}
/>

<style>
  .gameover {
    position: absolute;
    margin: auto;
    inset: 0;
    width: 192px;
    height: 42px;
    top: -250px;
  }
</style>
