<script lang="ts">
    export let title = "btn";
    export let loader = false;
    export let loader_title = "loading";
    export let color = "from-white to-blue-500";
    export let text_color = "text-black";
    export let rounded = "rounded-lg"

</script>

<button disabled={loader} class="w-full px-2 py-1 border-[0.1rem] border-black {rounded} transition-all bg-gradient-to-br {text_color} {color} hover:opacity-70 active:scale-95 hover:font-semibold"
on:click
>
    {#if loader}
    <section class="flex gap-1 items-center justify-center">
        {loader_title}
        <div class="w-4 h-4 border-4 boder-black border-blue-500 border-b-white rounded-full animate-spin"></div>
    </section>
    {:else}
        <p>{title}</p>
    {/if}
</button>