<script lang="ts">
    
    import { auth,db, staticState } from "$lib";
    import { signOut } from "firebase/auth";

	import DsButton from "$lib/Auth/Gen/DsButton.svelte";
	import { fly } from "svelte/transition";

    export let array_data = ["Sample one", "Sample two"];

    const dsComp = {
        showMenu: false,
    }

    const showMenu = () => dsComp.showMenu = !dsComp.showMenu;

    const catchSelection = (selected: string) =>
    {
        $staticState.activeItem = selected;
        showMenu();
    }

</script>

<main class="w-full bg-gradient-to-bl from-blue-300 to-blue-700 border-[0.1rem] border-black p-2 fixed top-0 z-10 left-0 right-0">
    <section class="flex items-center">
        <button class="flex flex-col gap-1 p-2 animate-pulse"
        on:click={showMenu}
        >
            <div class="w-8 border-b-4 border-black"></div>
            <div class="w-4 border-b-4 border-black"></div>
            <div class="w-8 border-b-4 border-black"></div>
        </button>

        <section class="w-full text-center">
            <p class="font-bold">{$staticState.activeItem}</p>
        </section>

        <section>
            <DsButton color="from-white to-red-500" title="Logout" on:click={() => signOut(auth)}/>
        </section>
    </section>
</main>

{#if dsComp.showMenu}
    <nav class="fixed left-0 top-0 bottom-0 z-10 bg-blue-500 border-[0.1rem] border-black" in:fly={{x:-200, duration:400}}>
        <section class="float-right p-2 transition-all active-scale-95 hover:scale-105">
            <button class="flex flex-col gap-1 p-2 animate-pulse"
            on:click={showMenu}
            >
                <div class="w-8 border-b-4 border-red-500"></div>
                <div class="w-4 border-b-4 border-red-500"></div>
                <div class="w-8 border-b-4 border-red-500"></div>
            </button>
        </section>

        <section class="flex items-center border-[0.1rem] border-black m-2 p-2 flex-wrap mt-20">
            <img loading="lazy" src={auth.currentUser?.photoURL} alt="loading" class="w-16" />
            <div class="">
                <p class="font-bold">{auth.currentUser?.displayName}</p>
                <p>{auth.currentUser?.email}</p>
            </div>

        </section>

        <section class="flex flex-col p-2">
            {#each array_data as selection}
                <button class="w-full p-4 text-left font-bold transition-all hover:opacity-70 hover:scale-105 hover:border-[0.1rem] border-black active:scale-95"
                class:active={$staticState.activeItem === selection}
                on:click={(_ => catchSelection(selection))}
                >{selection}</button>
            {/each}
        </section>
    </nav>
{/if}

<style>
    .active{
        background: linear-gradient(blue, white, blue);
    }
</style>