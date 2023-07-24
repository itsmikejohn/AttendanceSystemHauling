<script lang="ts">
    import { auth,db } from "$lib";
    import { updateDoc, doc, collection } from "firebase/firestore";

    import DsButton from "$lib/Auth/Gen/DsButton.svelte";

    export let pending: any;

    const dsComp = {
        loader: false,
    }

    const acceptHandler = (pendingID: string) =>
    {
        dsComp.loader = true;
        updateDoc(doc(collection(db, "pendingStudents"), pending.id), {
            isPending: false,
        })
        .then( (nothing: void) =>
        {
            dsComp.loader = false;
        })
    }

</script>

<section class="max-w-fit">
    <DsButton rounded="rounded-none" title="Accept" color="from-blue-300 to-white" loader={dsComp.loader} 
    loader_title="Accepting" on:click={() => acceptHandler(pending.id)}
    />
</section>