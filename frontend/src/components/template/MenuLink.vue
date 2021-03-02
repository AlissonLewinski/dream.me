<template>
    <router-link :to="path" :class="`menu-link-container${isActualLink ? ' menu-link-highlight' : ''}`">
        <img :src="icon" alt="">
    </router-link>
</template>

<script>
export default {
    name: 'MenuLink',
    props: {icon: String, path: String, isActualLink: Boolean}
}
</script>

<style>
    .menu-link-container {
        cursor: pointer;

        width: 80%;
        
        padding: 0.6rem 0;
        margin-bottom: 0.5rem;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .menu-link-highlight {
        border-right: solid 2px var(--main-color);
    }

    .menu-link-container img {
        height: 3rem;
        transition: height 0.15s;
    }

    .menu-link-container:hover img {
        height: 3.3rem;
    }

    @media(max-width: 1350px) {
        .menu-link-container {
            width: unset;
            margin: 0.5rem;
        }

        .menu-link-highlight {
            border-right: none;
            border-bottom: solid 2px var(--main-color);
        }
    }

</style>