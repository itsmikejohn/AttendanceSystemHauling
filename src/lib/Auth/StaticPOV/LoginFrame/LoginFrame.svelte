<script lang="ts">
    import { staticState } from "$lib";
    import Login from "./Login.svelte";
    import Register from "./Register.svelte";
    import Reset from "./Reset.svelte";

</script>

<main class="mx-auto">
    {#if $staticState.showRegister}
        <Register />
    {:else if $staticState.showReset}
        <Reset />
    {:else}
        <Login />
    {/if}
</main>