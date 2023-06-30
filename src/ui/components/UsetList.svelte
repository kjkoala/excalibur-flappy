<script lang="ts">
  import { fetchUsers } from "../api/fetchUser";
  import type { User } from "../types";
  export let me: User | undefined;

</script>

{#await fetchUsers() }
      <div>Loading</div>
      {:then userList} 
      <ul>
        {#each userList as user}
          {#if user.me}{(me = user, '')}{/if}
          <li>{user.position}.{user.name}:{user.score}</li>
        {/each}
      </ul>
{/await}

<style>
    ul {
            display: flex;
            flex-direction: column;
            gap: 8px;
            list-style: none;
        }
    ul li {
        padding: 5px 0;
        color: white;
        text-shadow: 0 1px black, 3px 0 black, -1px 0 black, 0 -1px black;
    }
</style>