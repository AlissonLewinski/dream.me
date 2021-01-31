<template>
    <a class="header-link">
        {{name}}
    </a>
</template>

<script>
export default {
    name: 'HeaderLink',
    props: {name: String}
}
</script>

<style>
    .header-link{
        position: relative;
        cursor: pointer;
        font-family: 'Lobster', cursive;
        font-size: 24px;
        font-weight: normal;
        color: white;

        margin-right: 15px;
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