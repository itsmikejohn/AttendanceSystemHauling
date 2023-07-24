<script lang="ts">
    import { auth, db, } from "$lib";
    import { arrayRemove, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";

    import DsButton from "$lib/Auth/Gen/DsButton.svelte";
    

    export let subject: any;
    export let attendee: any;

    const dsComp = {
        loader: false,
    }

    const kickHandler = () =>
    {   
        dsComp.loader = true;
        deleteDoc(doc(collection(db, "attendedStudents"), attendee.id))
        .then( (nothing: void) =>
        {
            updateDoc(doc(collection(db, "createdSubject"), subject.id), {
                subscribers: arrayRemove(attendee.ownerUID)
            })
        })
        .finally(() => 
        {
            dsComp.loader = false;
        })
    }
</script>

<div class="">
    <DsButton color="from-red-300 to-red-500" text_color="text-white" title="Kick" loader={dsComp.loader} loader_title="Kicking."
    on:click={kickHandler}
    />
</div>