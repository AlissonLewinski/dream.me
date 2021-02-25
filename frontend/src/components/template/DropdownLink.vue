<template>
    <router-link :to="path" class="dropdown-link">
        <span>{{name}}</span>
    </router-link>
</template>

<script>
export default {
    name: 'HeaderLink',
    props: {name: String, path: String}
}
</script>

<style>
    .dropdown-link{
        position: relative;
        font-family: var(--main-font);
        font-size: 18px;
        font-weight: normal;
        color: white;
        cursor: pointer;

        margin: 7px auto 0 auto;
        padding: 0 2px;
    }

    .dropdown-link:hover {
        background-color: white;
        color: var(--main-color);
    }

</style>