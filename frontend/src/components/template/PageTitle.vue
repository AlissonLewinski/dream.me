<template>
    <h1 class="page-title">{{title}}</h1>
</template>

<script>
export default {
    name: 'PageTitle',
    props: {title: String}
}
</script>

<style>
    .page-title {
        margin: 0;
        text-align: center;
        font-size: 48px;
        font-family: var(--main-font);
        font-weight: normal;
        color: var(--main-color);
    }
</style>