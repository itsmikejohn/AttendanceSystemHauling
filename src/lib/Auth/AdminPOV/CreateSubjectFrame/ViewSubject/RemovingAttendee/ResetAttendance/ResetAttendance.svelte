<script lang="ts">
    import { auth, db } from "$lib";

    import DsButton from "$lib/Auth/Gen/DsButton.svelte";
	import { collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";


    export let subject: any;

    const dsComp = {
        loader: false,
    }

    const resetAttendanceHandler = () =>
    {
        dsComp.loader = true;
        getDocs(collection(db, "attendedStudents"))
        .then(snapsResp => 
        {
            
            snapsResp.docs.forEach(docRef =>
            {
                if(docRef.data().subjectUID === subject.id)
                {
                    deleteDoc(doc(collection(db, "attendedStudents"), docRef.id))
                    .then( (nothing: void) =>
                    {
                        updateDoc(doc(collection(db, "createdSubjects"), subject.id), {
                            subscribers: [],
                        })
                        dsComp.loader = false;
                    })
                }
            })
        })
        .finally(() =>
        {
            dsComp.loader = false;
        })
        
    }
</script>

<DsButton color="from-red-300 to-red-600" text_color="text-white" title="Reset Attendance" rounded="rounded-none" loader={dsComp.loader}
loader_title="Deleting all." on:click={resetAttendanceHandler}
/>