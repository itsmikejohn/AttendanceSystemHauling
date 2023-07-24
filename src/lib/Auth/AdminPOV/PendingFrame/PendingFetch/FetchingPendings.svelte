<script lang="ts">
    import { auth, db, adminState } from "$lib";
	import DsButton from "$lib/Auth/Gen/DsButton.svelte";
    import { onSnapshot, collection, doc, query, orderBy, updateDoc } from "firebase/firestore";
	import SearchPendings from "./SearchPending/SearchPendings.svelte";
	import AcceptPending from "./AcceptingPending/AcceptPending.svelte";

    
    onSnapshot(query(collection(db, "pendingStudents"), orderBy("createdAt", "desc")), snapsResp =>
    {
        let fbData: any[] = [];
        let result: any[] = [];
        snapsResp.docs.forEach(docRef =>
        {
            let mutatedDate = new Date(Number(JSON.stringify(docRef.data().createdAt).slice(11,21)) * 1000);
            let date = mutatedDate.toLocaleTimeString() + ", " + mutatedDate.toLocaleDateString();
            let data = {...docRef.data(), id: docRef.id, date: date}
            fbData = [data, ...fbData];
            result = fbData.filter(item => item.isPending === true);
        })
        $adminState.pendingStudents = result;
        
    })

    

</script>

<main class="mx-auto sm:max-w-xl border-[0.1rem] border-black mt-[2vh] md:mt-[7vh] bg-gradient-to-bl from-blue-400 to-orange-600">
    <section class="p-2 flex flex-col gap-3">
        <section class="">
            <p class="w-full text-center bg-gradient-to-bl from-blue-300 to-lime-900 font-semibold">Pending Request</p>
        </section>

        <!-- MINI SEARCH ENGINE SUBSCRIBE YT: www.youtube.com/@mikeSharesCode -->
        <SearchPendings />
            
    </section>

    <!--RENDER PENDINGS-->
    <section class="overflow-y-scroll max-h-[50vh] p-2 ">
        {#each $adminState.pendingStudents as pending}
            <div class="flex gap-1 items-center text-xs p-2 bg-gradient-to-r from-pink-300 to-black mt-2">
                <img loading="lazy" src={pending.photoURL} alt="loading" class="w-10 rounded-full bg-gradient-to-r from-blue-100 to-orange-700"/>
                <section class="w-full">
                    <p class="font-semibold ">{pending.fullname}</p>
                    <p class="font-semibold ">{pending.email}</p>
                </section>

                <AcceptPending {pending}/>
            </div>
        {/each}

        

        
 

    </section>
</main>

<style>
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