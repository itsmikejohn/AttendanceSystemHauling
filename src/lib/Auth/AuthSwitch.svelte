<script lang="ts">
    import { auth, staticState, adminKeyProvider } from "$lib";
    import { onAuthStateChanged } from "firebase/auth";

    import AdminSwitch from "./AdminPOV/AdminSwitch.svelte";
    import StudentSwitch from "./StudentPOV/StudentSwitch.svelte";
    import StaticSwitch from "./StaticPOV/StaticSwitch.svelte";
    import Nav from "./StaticPOV/Nav/Nav.svelte";

    onAuthStateChanged(auth, userCred =>
    {
        if(userCred)
        {
            if($adminKeyProvider.includes(userCred.uid))
            {
                $staticState.defaultNav = $staticState.adminNav;
                $staticState.hasAuth = true;
                $staticState.hasAdmin = true;
                $staticState.activeItem = "Create Subject"
               
            }else
            {
                $staticState.defaultNav = $staticState.studentNav;
                $staticState.hasAuth = true;
                $staticState.hasAdmin = false;
                $staticState.activeItem = "Subjects"
              
            }
        }else
        {
            $staticState.defaultNav = $staticState.defaultNav;
            $staticState.hasAuth = false;
            $staticState.hasAdmin = false;
          

        }
    })

</script>

<main>
    {#if $staticState.hasAuth}
        <Nav array_data={$staticState.defaultNav}/>
        <main class="mt-20">
            {#if $staticState.hasAdmin}
                <AdminSwitch />
            {:else}
                <StudentSwitch />
            {/if}
        </main>
    {:else}
        <StaticSwitch />
    {/if}
</main>