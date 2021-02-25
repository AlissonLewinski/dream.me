<template>
    <div class="loading loader">
        <div class="ball-spin-fade-loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Loading'
}
</script>

<style>
    .loading {
        height: 100%;
        display: flex;
        justify-content: center;
        padding-top: 40vh;
    }

    .ball-spin-fade-loader div {
        background-color: var(--main-color) !important;
    }
</style>