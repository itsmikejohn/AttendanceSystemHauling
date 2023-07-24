<script lang="ts">
    import { auth,db, adminState } from "$lib";
    import { collection, getDoc, doc, query, onSnapshot,orderBy, where, getDocs } from "firebase/firestore";

	import DsButton from "$lib/Auth/Gen/DsButton.svelte";

    const dsComp = {
        loader: false,
        searchValue: "",
    }

    const searchHandler = () =>
    {
        onSnapshot(query(collection(db, "pendingStudents"), orderBy("createdAt", "desc"), where("email", "==", dsComp.searchValue)), snapsResp =>
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
    }

    const keyDetect = () =>
    {
        if(dsComp.searchValue.trim().length <= 0 )
        {
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
        } 
    }


    
</script>

<section class="flex">
    <input type="text" placeholder="🔍 Search by email" class="w-full px-2 py-1 border-[0.1rem] border-black focus:outline-none" 
    on:keyup={keyDetect}
    on:focus={keyDetect}
    bind:value={dsComp.searchValue}/>
    
    <div class="">
        <DsButton color="from-green-500 to-green-500" rounded="rouned-none" title="Search" text_color="text-white" loader={dsComp.loader} loader_title="Searching."
        on:click={searchHandler}
        />
    </div>
</section>