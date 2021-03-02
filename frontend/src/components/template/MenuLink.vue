<template>
    <router-link :to="path" class="menu-link-container">
        <img :src="icon" alt="">
    </router-link>
</template>

<script>
export default {
    name: 'MenuLink',
    props: {icon: String, path: String}
}
</script>

<style>
    .menu-link-container {
        cursor: pointer;

        width: 80%;

        border-bottom: solid 0px var(--main-color);
        border-radius: 2px;
        
        padding: 0.6rem 0;
        margin-bottom: 0.5rem;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .menu-link-container img {
        height: 3rem;
        transition: height 0.15s;
    }

    .menu-link-container:hover img {
        height: 3.3rem;
    }

</style>