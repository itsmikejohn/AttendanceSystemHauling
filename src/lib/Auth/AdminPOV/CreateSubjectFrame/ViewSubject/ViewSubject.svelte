<script lang="ts">
    import { auth, db, adminState, adminKeyProvider } from "$lib";
    import { addDoc, collection, doc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
    
    import { scale } from "svelte/transition";
	import DsButton from "$lib/Auth/Gen/DsButton.svelte";
	import AttendSubject from "./AttendSubject/AttendSubject.svelte";
	import ResetAttendance from "./RemovingAttendee/ResetAttendance/ResetAttendance.svelte";
	import KickAttendee from "./RemovingAttendee/KickAttendee/KickAttendee.svelte";
	import SearchAttendee from "./SearchAttendee/SearchAttendee.svelte";

    export let subject: any;
    export let outerIndex: number;
    
    
    onSnapshot(query(collection(db, "attendedStudents"), orderBy("createdAt", "asc")), snapsResp =>
    {
        let fbData: any[] = [];
        snapsResp.docs.forEach(docRef =>
        {
            let mutatedDate = new Date(Number(JSON.stringify(docRef.data().createdAt).slice(11,21)) * 1000);
            let date = mutatedDate.toLocaleTimeString() + ", " + mutatedDate.toLocaleDateString();
            let data = {...docRef.data(), id: docRef.id, date: date};

            fbData = [data, ...fbData];

        })
        $adminState.attendedStudents = fbData;
    })


    const dsComp = {
        loader: false,
        showAttendBtn: false,
    }

    const viewHandler = () =>
    {
        dsComp.loader = true;
        updateDoc(doc(collection(db, "createdSubjects"), subject.id), {originUID: subject.id})
        .then((nothing: void) => 
        {
            $adminState.crtSbjComparison = outerIndex;
            dsComp.loader = false;
        })
    }

    
</script>

<DsButton rounded="rounded-none" text_color="text-white" color="from-green-500 to-green-800" title="View" loader={dsComp.loader}
loader_title="Viewing." on:click={viewHandler}
/>

{#if $adminState.crtSbjComparison === outerIndex}
    <section class="left-0 right-0 top-0 bottom-0 fixed bg-white z-10 p-2 sm:p-0" id="colorMe">
        <section class="border-[0.1rem] border-black md:mt-[5vh] sm:max-w-2xl mx-auto bg-gradient-to-r from-white to-cyan-700 p-4" transition:scale>
            <p class="bg-gradient-to-l from-yellow-100 to-yellow-500 font-bold text-center px-2 py-1">{subject.subjectName}</p>
            <section class="flex gap-1 mt-2">
                
                <DsButton title="Back" rounded="rounded-none" on:click={() => $adminState.crtSbjComparison = 0.1}/>

                {#if $adminKeyProvider.includes(auth.currentUser?.uid ? auth.currentUser.uid : "")}
                    <!--RESET COMPONENT-->
                    <ResetAttendance {subject}/>
                {:else}
                    {#if subject.subscribers.includes(auth.currentUser?.uid)}
                        <p class="w-full text-center px-2 py-1 border-[0.1rem] border-black bg-white text-green-500 font-bold">Attended</p>
                    {:else}
                        <!--ATTEND COMPONENT-->
                        <AttendSubject {subject}/>
                    {/if}
                {/if}

            </section>

            <section class="mt-4">
                <!--SEARCH COMPONENT-->
                <SearchAttendee />
                    
                <p class="font-semibold px-2 py-1">Student Attended:</p>
            </section>
            <!--Render attended students-->
            <section class="mt-2 border-[0.1rem] border-black p-2 overflow-y-scroll max-h-[60vh] min-h-[10vh]">
                {#each $adminState.attendedStudents as attendee}
                    {#if attendee.subjectUID === subject.id}
                        <section class="flex items-center mt-2 bg-gradient-to-r from-green-300 to-fuchsia-700 px-2">
                            <img src={attendee.photoURL} alt="loading" class="w-10" />
                            <div class="w-full">
                                <p>{attendee.fullname}</p>
                                <p>{attendee.date}</p>
                            </div>
                            
                            {#if $adminKeyProvider.includes(auth.currentUser?.uid ? auth.currentUser.uid : "")}
                                <!--KICK COMPONENT-->
                                <KickAttendee {attendee} {subject}/>
                            {/if}
                        </section>
                    {/if}
                {/each}
            </section>

        </section>
    </section>
{/if}


<style>
    #colorMe{
        background-color: rgba(0, 0, 0, 0.638);

    }
    /* width */
    ::-webkit-scrollbar {
    width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    border-radius: 10px;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.613); 

    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #b30000; 
    }
</style>
