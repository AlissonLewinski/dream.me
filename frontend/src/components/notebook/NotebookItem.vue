<template>
    <router-link class="notebook-item-link" :to="`/cadernos/${notebook.id}`">
        <div class="notebook-item-container" :style="`background-image: url(${notebook.icon})`">

            <h2>{{notebook.name}}</h2>

        </div>
    </router-link>
</template>

<script>

export default {
    name: "NotebookItem",
    props: { notebook: Object },
}
</script>

<style>
    .notebook-item-container {
        position: relative;

        height: 14rem;
        width: 11rem;

        background-size: cover;
        background-position: center;
    }

    .notebook-item-container > h2 {
        position: absolute;
        bottom: 0.5rem;

        width: 100%;
        
        background: var(--red);
        padding: 0.5rem 0.5rem;

        font-family: var(--main-font);
        font-weight: 500;
        font-size: 1rem;
        color: var(--white);

        transition: background-color 0.2s;
    }

    .notebook-item-container:hover > h2 {
        background: var(--white);
        color: var(--text);
    }
</style>