<template>
    <router-link :to="path">
        <span class="header-link">{{name}}</span>
    </router-link>
</template>

<script>
export default {
    name: 'HeaderLink',
    props: {name: String, path: String}
}
</script>

<style>
    .header-link{
        position: relative;
        font-family: var(--main-font);
        font-size: 24px;
        font-weight: normal;
        color: white;

        margin: 0 15px 0 0;
    }

    .header-link:after{
        content: '';
        position: absolute;
        width: 0; height: 3px;
        display: block;
        margin-top: 5px;
        right: 0;
        background: #fff;
        transition: width 0.35s ease;
        -webkit-transition: width 0.35s ease;
    }
    
    .header-link:hover:after{
        width: 100%;
        left: 0;
        background: #fff;
    }
</style>