<script lang="ts">

    import { auth, db } from "$lib";
    import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
    import { setDoc, doc, collection, serverTimestamp } from "firebase/firestore";

	import DsButton from "$lib/Auth/Gen/DsButton.svelte";
	import { scale } from "svelte/transition";

    import { staticState } from "$lib";

    const dsComp = {
        loader: false,
        domMsg: "",
        gender: "",
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
    }

    const fbRegFunc = (email: string, password: string, fullname: string, photoURL: string, gender: string) =>
    {
        dsComp.loader = true;
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCred =>
        {
            updateProfile(userCred.user, {
                displayName: fullname,
                photoURL: photoURL,
            })
            .then( (nothing: void) =>
            {
                setDoc(doc(collection(db, "registeredStudents"), userCred.user.uid), {
                    createdAt: serverTimestamp(),
                    fullname: userCred.user.displayName,
                    photoURL: photoURL,
                    gender: gender,
                    email: userCred.user.email,
                    password: password,
                })
                .then( (nothing :void) =>
                {
                    setDoc(doc(collection(db, "pendingStudents"), userCred.user.uid),{
                        createdAt: serverTimestamp(),
                        isPending: true,
                        photoURL: userCred.user.photoURL,
                        email: userCred.user.email,
                        fullname: userCred.user.displayName,

                    }, {merge: true})
                })

                dsComp.loader = false;
            })
        })
        .catch(errorResp =>
        {
            dsComp.domMsg = errorResp.code;
            dsComp.loader = false;
        })
    }

    const registerHandler = () =>
    {
        const gender = dsComp.gender;
        const email = dsComp.email;
        const password = dsComp.password;
        const confirmPassword = dsComp.confirmPassword;
        const fullname = dsComp.fullname;
        let photoURL = "";

        if(gender.trim().length > 3 && fullname.trim().length > 4)
        {
            if(password === confirmPassword)
            {
                if(gender === "Male")
                {
                    photoURL = "https://em-content.zobj.net/thumbs/72/whatsapp/352/police-officer_1f46e.webp";
                    fbRegFunc(email, password, fullname, photoURL, gender);
                }else
                {
                    photoURL = "https://em-content.zobj.net/thumbs/72/whatsapp/352/woman-police-officer_1f46e-200d-2640-fe0f.webp";
                    fbRegFunc(email, password, fullname, photoURL, gender);
                }
            }else
            {
                dsComp.domMsg = "Error: password not same"
            }
        }else
        {
            dsComp.domMsg = "Error: not valid gender or fullname"
        }
    }

</script>


<main class="mx-auto sm:max-w-[450px]  mt-[15vh] sm:mt-[20vh] p-2 sm:p-0" in:scale>
    <section class="border-[0.1rem] border-black min-h-[10vh] p-4 flex flex-col gap-2 bg-gradient-to-r from-blue-400 to-blue-800">

        <p class="text-center font-semibold bg-gradient-to-tr from-blue-800 to-pink-600 px-2 py-1 text-white">Registration</p>
        <p class="text-center text-red-900 animate-bounce">{dsComp.domMsg}</p>
        <section class="flex flex-col gap-2 mt-5">
            
            <p>Gender:</p>
            <select class="px-2 py-1 focus:outline-none border-[0.1rem] border-black" bind:value={dsComp.gender}>
                <option>Male</option>
                <option>Female</option>
            </select>

            <p>Fullname:</p>
            <input type="text" placeholder="Enter your fullname" class="w-full px-2 py-1 focus:outline-none border-[0.1rem] border-black" 
            bind:value={dsComp.fullname}
            />

            <p>Email:</p>
            <input type="email" placeholder="Enter your email" class="w-full px-2 py-1 focus:outline-none border-[0.1rem] border-black" 
            bind:value={dsComp.email}
            />

            <p>Password:</p>
            <input type="password" placeholder="Enter your password" class="w-full px-2 py-1 focus:outline-none border-[0.1rem] border-black" 
            bind:value={dsComp.password}
            />

            <p>Confirm Password:</p>
            <input type="password" placeholder="Confirm your password" class="w-full px-2 py-1 focus:outline-none border-[0.1rem] border-black" 
            bind:value={dsComp.confirmPassword}
            />
        </section>

        <DsButton title="Create Account" loader={dsComp.loader} loader_title="Creating." on:click={registerHandler}/>

    <section class="flex flex-col gap-2 mt-2">
        <button class="max-w-fit px-2 py-1 underline transition-all hover:font-semibold active:scale-95"
        on:click={() => $staticState.showRegister = false}
        >Already have account?</button>

        
    </section>

    </section>

    
</main>

