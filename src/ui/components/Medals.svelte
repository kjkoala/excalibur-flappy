<script lang="ts">
  import * as medals from "src/app/medals";
  import { resources } from "src/app/resources";
  import type { User } from "../types";
  export let me: User | undefined;
  let medalNode: HTMLDivElement | undefined;
  Promise.resolve()
  .then(() => {
    if (me && medalNode) {
      if (me.score >= medals.BONZE_MEDAL && me.score < medals.SILVER_MEDAL) {
        medalNode.append(resources.bronze.data.cloneNode());
      } else if (
        me.score >= medals.SILVER_MEDAL &&
        me.score < medals.GOLD_MEDAL
      ) {
        medalNode.append(resources.silver.data.cloneNode());
      } else if (
        me.score >= medals.GOLD_MEDAL &&
        me.score < medals.PLATINUM_MEDAL
      ) {
        medalNode.append(resources.gold.data.cloneNode());
      } else if (me.score >= medals.PLATINUM_MEDAL) {
        medalNode.append(resources.platinum.data.cloneNode());
      }
    }
  })
</script>

<div class="medal">
  <div class="text">medal</div>
  <div class="medalIcon" bind:this={medalNode} >
  </div>
</div>

<style>
  .medal {
    pointer-events: none;
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
  .medalIcon :global(img) {
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
  }
</style>
