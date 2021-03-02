<template>
    <div class="loading loader">
        <div class="line-scale">
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

    .line-scale div {
        background-color: var(--main-color) !important;
    }
</style>