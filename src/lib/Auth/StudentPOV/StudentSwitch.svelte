<script lang="ts">
    import { auth, db, studentState, staticState } from "$lib";
    import { onSnapshot, collection, doc } from "firebase/firestore";

    import PendingLandingFrame from "./PendingStudent/PendingLandingFrame.svelte";
    import Subjects from "./AcceptedStudent/Subjects.svelte";

    let restricted = false;

    onSnapshot(doc(collection(db, "pendingStudents"), auth.currentUser?.uid), snapResp =>
    {
        snapResp.data()?.isPending ? restricted = true : restricted = false;


    })

</script>

<main class="p-2 sm:m-10 text-xs md:text-base">
    {#if restricted}
        <PendingLandingFrame />
    {:else}
        {#if $staticState.activeItem === "Subjects"}
            <Subjects />
        {/if}
    {/if}
</main>