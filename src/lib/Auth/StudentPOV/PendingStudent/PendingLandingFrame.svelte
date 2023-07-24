<script lang="ts">
	import DsButton from "$lib/Auth/Gen/DsButton.svelte";

    import { auth, db } from "$lib";
    import { collection, getCountFromServer } from "firebase/firestore";

    

</script>

<main class="fixed bottom-0 top-0 left-0 right-0 p-2 sm:p-0">
    <section class="sm:max-w-xl border-[0.1rem] border-black mx-auto mt-[10vh] bg-gradient-to-br to-black from-pink-500  flex items-center flex-col sm:flex-row ">
        <p class="text-center text-white font-bold text-xl">Opss. You have to wait till the admin accepts you.</p>

        <img loading="lazy" src="https://em-content.zobj.net/source/skype/289/stop-sign_1f6d1.png" alt="loading" />
    </section>
</main>