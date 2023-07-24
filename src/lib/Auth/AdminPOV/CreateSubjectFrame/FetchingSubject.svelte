<script lang="ts">
    import { auth,db, adminState, adminKeyProvider, staticState } from "$lib";
    import { deleteDoc, doc } from "firebase/firestore";
    import { onSnapshot, collection } from "firebase/firestore";

	import DsButton from "$lib/Auth/Gen/DsButton.svelte";
	import { fly } from "svelte/transition";
	import ViewSubject from "./ViewSubject/ViewSubject.svelte";
    

    let createdSubjects: any[] = [];

    onSnapshot(collection(db, "createdSubjects"), snapsResp =>
    {
        let fbData: any[] = [];
        snapsResp.docs.forEach(docRef =>
        {
            let mutatedDate = new Date(Number(JSON.stringify(docRef.data().createdAt).slice(11,21)) * 1000);
            let date = mutatedDate.toLocaleTimeString() + ", " + mutatedDate.toLocaleDateString();
            let data = {...docRef.data(), id: docRef.id, date: date}
            fbData = [data, ...fbData];
        })
        createdSubjects = fbData;
    })


</script>

<main class="sm:flex sm:gap-1 sm:flex-wrap break-words">
    {#each createdSubjects as subject, outerIndex}
        <main class="border-[0.1rem] border-black h-fit mt-5 bg-gradient-to-r from-blue-300 to-white sm:max-w-xl" in:fly={{x:-200, duration:200}}>
            <section class="p-2 flex flex-col gap-2">
                <p class="bg-gradient-to-r from-yellow-100 to-yellow-500 font-bold text-center px-2 py-1">{subject.subjectName}</p>
                <p class="mt-2"><b>Date Open:</b> {subject.date}</p>
                <p><b>Teacher Name:</b> {subject.teacherName}</p>
                <p><b>Description:</b> {subject.subjectDescription}</p>
            </section>

            <section class="flex gap-1 p-2 mt-2">
                
                <ViewSubject {subject} {outerIndex}/>

                {#if $adminKeyProvider.includes(auth.currentUser?.uid ? auth.currentUser.uid : "")}
                    <DsButton rounded="rounded-none" text_color="text-white" color="from-red-300 to-red-600" title="Drop" 
                    on:click={() => deleteDoc(doc(collection(db, "createdSubjects"), subject.id))} />
                {/if}

            </section>
        </main>
    {/each}
</main>

