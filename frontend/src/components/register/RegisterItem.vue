<template>
    <div class="register-item">
        <h2 class="register-item-title">{{title}}</h2>
    </div>
</template>

<script>
export default {
    name: 'RegisterItem',
    props: {title: String}
}
</script>

<style>
    .register-item {
        border: solid 3px var(--main-color);
        height: 80px;

        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .register-item-title {
        margin: 0;

        font-weight: normal;
        font-family: var(--main-font);
        color: var(--main-color)
    }
</style>