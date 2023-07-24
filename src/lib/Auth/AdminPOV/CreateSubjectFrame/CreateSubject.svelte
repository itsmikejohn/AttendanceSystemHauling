<script lang="ts">
    import {auth, db, adminState } from "$lib";
    import { addDoc, collection, serverTimestamp } from "firebase/firestore";

	import DsButton from "$lib/Auth/Gen/DsButton.svelte";
	import { scale } from "svelte/transition";

    const dsComp = {
        loader: false,
        domMsg: "",
        subjectName: "",
        teacherName: "",
        subjectDescription: "",
    }

    const fbAddDoc = (subjectName: string, teacherName: string, subjectDescription: string) =>
    {
        addDoc(collection(db, "createdSubjects"), {
            createdAt: serverTimestamp(),
            subjectName: subjectName,
            teacherName: teacherName,
            subjectDescription: subjectDescription,
            subscribers: [],
        })
        .then(docRef =>
        {
            $adminState.showCreateSubject = false;
            dsComp.loader = false;
            dsComp.domMsg = "";
            dsComp.subjectDescription = "";
            dsComp.subjectName = "";
            dsComp.teacherName = "";
        })



    }

    const submitHandler = () =>
    {
        const subjectName = dsComp.subjectName;
        const teacherName = dsComp.teacherName;
        const subjectDescription = dsComp.subjectDescription;

        if(subjectName.trim().length > 3 && teacherName.trim().length > 3 && subjectDescription.trim().length > 3)
        {
            dsComp.loader = true;
            fbAddDoc(subjectName, teacherName, subjectDescription);
        }else
        {
            dsComp.domMsg = "Error: invalid inputs please no troll."
        }

        
    }


</script>

<main>
    <section class="max-w-fit ">
        <DsButton color="from-green-500 to-blue-500" title="Create Subject" on:click={() => $adminState.showCreateSubject = true}/>
    </section>

    {#if $adminState.showCreateSubject}
        <section class="fixed left-0 right-0 bottom-0 top-0 z-10 p-2 sm:p-0" id="colorMe">
            
            <div class="border-[0.1rem] border-black mx-auto sm:max-w-xl min-h-[20vh] mt-[20vh] p-5 bg-gradient-to-tr from-blue-300 to-white rounded-lg" transition:scale>
                <p class="w-full text-center bg-gradient-to-br from-blue-500 to-green-500 font-semibold px-2 py-1">Create Subject</p>
                <p class="text-center text-red-500 animate-pulse">{dsComp.domMsg}</p>
                <section class="flex flex-col mt-2">
                    <p class="py-1 font-semibold">Subject name:</p>
                    <input type="text" placeholder="Enter subject name" class="w-full px-2 py-1 focus:outline-none border-[0.1rem] border-black" 
                    bind:value={dsComp.subjectName}
                    />

                    <p class="py-1 font-semibold">Teacher name:</p>
                    <input type="text" placeholder="Enter teacher name" class="w-full px-2 py-1 focus:outline-none border-[0.1rem] border-black" 
                    bind:value={dsComp.teacherName}
                    />

                    <p class="py-1 font-semibold">Subject description:</p>
                    <input type="text" placeholder="Enter subject description" class="w-full px-2 py-1 focus:outline-none border-[0.1rem] border-black" 
                    bind:value={dsComp.subjectDescription}
                    />
                </section>

                <section class="flex mt-2 gap-1">
                    <DsButton color="from-blue-300 to-blue-700" title="Create" loader={dsComp.loader} loader_title="Creating." on:click={submitHandler}/>
                    <DsButton color="from-red-500 to-blue-300" title="Cancel" on:click={() => {
                        $adminState.showCreateSubject = false;
                        dsComp.domMsg = "";
                    }}/>
                </section>
            </div>

        </section>
    {/if}
</main>

<style>
    #colorMe{
        background-color: rgba(0, 0, 0, 0.638);
    }
</style>