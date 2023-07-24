<script lang="ts">
	import DsButton from "$lib/Auth/Gen/DsButton.svelte";
	import { scale } from "svelte/transition";

    import { auth, db, staticState} from "$lib";
    import { signInWithEmailAndPassword } from "firebase/auth";

    const dsComp = {
        loader: false,
        domMsg: "",
        email: "",
        password: "",
    }

    const loginHandler = () =>
    {
        dsComp.loader = true;
        const email = dsComp.email;
        const password = dsComp.password;

        signInWithEmailAndPassword(auth, email, password)
        .then(userCred =>
        {
            dsComp.loader = false;
        })
        .catch(errorResp =>
        {
            dsComp.domMsg = errorResp.code;
            dsComp.loader = false;
        })

    }

</script>


<main class="mx-auto sm:max-w-[450px]  mt-[15vh] sm:mt-[20vh] p-2 sm:p-0" in:scale>
    <section class="border-[0.1rem] border-black min-h-[10vh] p-4 flex flex-col gap-2 bg-gradient-to-r from-blue-400 to-blue-800">

        <p class="text-center font-semibold bg-gradient-to-tr from-blue-800 to-pink-600 px-2 py-1 text-white">Attendance System</p>
        <p class="text-center text-red-900 animate-bounce">{dsComp.domMsg}</p>
        <section class="flex flex-col gap-2 mt-5">
            <p>Email:</p>
            <input type="email" placeholder="Enter your email" class="w-full px-2 py-1 focus:outline-none border-[0.1rem] border-black" 
            bind:value={dsComp.email}
            />

            <p>Password:</p>
            <input type="password" placeholder="Enter your password" class="w-full px-2 py-1 focus:outline-none border-[0.1rem] border-black" 
            bind:value={dsComp.password}
            />

        </section>

        <DsButton title="Login" loader={dsComp.loader} loader_title="Logging." on:click={loginHandler}/>

    <section class="flex flex-col gap-2 mt-2">
        <button class="max-w-fit px-2 py-1 underline transition-all hover:font-semibold active:scale-95"
        on:click={() => $staticState.showReset = true}
        >Forgot password?</button>

        <button class="max-w-fit px-2 py-1 underline transition-all hover:font-semibold active:scale-95"
        on:click={() => $staticState.showRegister = true}
        >Create account</button>
    </section>

    </section>

    
</main>