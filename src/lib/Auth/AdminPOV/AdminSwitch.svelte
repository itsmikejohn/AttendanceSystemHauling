<script lang="ts">
    import { staticState } from "$lib";
    import CreateSubjectFrame from "./CreateSubjectFrame/CreateSubjectFrame.svelte";
    import PendingFrame from "./PendingFrame/PendingFrame.svelte";

</script>

<main class="p-2 sm:m-10 text-xs md:text-base">
    {#if $staticState.activeItem === "Create Subject"}
        <CreateSubjectFrame />
    {:else if $staticState.activeItem === "Pending Students"}
        <PendingFrame />
    {/if}
</main>