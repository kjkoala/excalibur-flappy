<script lang="ts">
  import * as medals from "src/app/medals";
  import { fetchUsers } from "../api/fetchUser";
  import type { User } from "../types";
  import { resources } from "src/app/resources";
  let ul: HTMLUListElement | undefined;
  export let me: User | undefined;

  const renderMedal = (user: User): HTMLImageElement | undefined => {
    if (user.score >= medals.BONZE_MEDAL && user.score < medals.SILVER_MEDAL) {
      return resources.bronze.data;
    }
    if (user.score >= medals.SILVER_MEDAL && user.score < medals.GOLD_MEDAL) {
      return resources.silver.data;
    }
    if (user.score >= medals.GOLD_MEDAL && user.score < medals.PLATINUM_MEDAL) {
      return resources.gold.data;
    }
    if (user.score >= medals.PLATINUM_MEDAL) {
      return resources.platinum.data;
    }
  };

  const renderList = (userList: User[]) => {
    const fragment = new DocumentFragment();
    userList.forEach((user) => {
      if (user?.me && me && user.score > me.score) {
        me = user;
      }
      const li = document.createElement("li");
      const medal = renderMedal(user);
      li.append(`${user.position} `);
      if (medal) {
        li.append(medal.cloneNode());
      }
      li.append(`${user.name}: ${user.score}`);
      fragment.append(li);
    });
    return fragment;
  };

  fetchUsers().then((users) => {
    if (ul) {
      ul.append(renderList(users));
    }
  });
</script>

<ul bind:this={ul} />

<style>
  ul {
    display: flex;
    flex-direction: column;
    gap: 8px;
    scrollbar-width: thin;
    scrollbar-color: #563737 #ccb25c;
    list-style: none;
    max-height: 85px;
    overflow: auto;
    scrollbar-gutter: stable;
    scroll-behavior: smooth;
  }
  ul :global(li) {
    padding: 1px 0;
    color: white;
    text-shadow: 0 1px black, 3px 0 black, -1px 0 black, 0 -1px black;
    display: flex;
    align-items: center;
  }
  ul :global(li) :global(img) {
    width: 18px;
    height: 18px;
    aspect-ratio: 1/1;
    padding: 0 5px;
    margin-left: -0px;
    image-rendering: pixelated;
  }
</style>
