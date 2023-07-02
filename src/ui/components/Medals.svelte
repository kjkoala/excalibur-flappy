<script lang="ts">
  import * as medals from "src/app/medals";
  import { resources } from "src/app/resources";
  import type { User } from "../types";
  export let me: User | undefined;
  const returnPathToImage = (me?: User) => {
    if (me) {
      if (me.score >= medals.BONZE_MEDAL && me.score < medals.SILVER_MEDAL) {
        return resources.bronze.path;
      } else if (
        me.score >= medals.SILVER_MEDAL &&
        me.score < medals.GOLD_MEDAL
      ) {
        return resources.silver.path;
      } else if (
        me.score >= medals.GOLD_MEDAL &&
        me.score < medals.PLATINUM_MEDAL
      ) {
        return resources.gold.path;
      } else if (me.score >= medals.PLATINUM_MEDAL) {
        return resources.platinum.path;
      }
    }
  };
</script>

<div class="medal">
  <div class="text">medal</div>
  <div class="medalIcon">
    <img src={returnPathToImage(me)} alt="medal" />
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
  .medalIcon img {
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
  }
</style>
