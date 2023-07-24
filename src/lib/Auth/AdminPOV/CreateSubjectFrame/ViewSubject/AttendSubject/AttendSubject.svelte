<script lang="ts">
    import { auth, db, } from "$lib";
    import { addDoc, arrayUnion, collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

    import DsButton from "$lib/Auth/Gen/DsButton.svelte";

    export let subject: any;

    const dsComp = {
        loader: false
    }

    const attendHandler = () =>
    {
        dsComp.loader = true;
        setDoc(doc(collection(db, "attendedStudents"), auth.currentUser?.uid + subject.id), {
            createdAt: serverTimestamp(),
            subjectUID: subject.id,
            ownerUID: auth.currentUser?.uid,
            fullname: auth.currentUser?.displayName,
            email: auth.currentUser?.email,
            photoURL: auth.currentUser?.photoURL,

        }, {merge: true})
        .then( (nothing: void) =>
        {
            updateDoc(doc(collection(db, "createdSubjects"), subject.id), {
                subscribers: arrayUnion(auth.currentUser?.uid),
            })
            .then( (nothing: void) =>
            {
                dsComp.loader = false;
            })
        })
    }
</script>

<DsButton color="from-green-300 to-cyan-600" title="Attend" rounded="rounded-none" loader={dsComp.loader} loader_title="Attending."
on:click={attendHandler}
/>