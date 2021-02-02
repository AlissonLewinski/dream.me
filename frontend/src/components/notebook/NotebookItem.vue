<template>
    <div class="notebook-item">
        <h2 class="notebook-title">{{notebook.name}}</h2>
        <div class="notebook-info">
            <span class="notebook-info-registers">
                15 registros
            </span>
            <span class="notebook-info-last-register">
                Último registro: 13/11/2003
            </span>
        </div>
        <img :src="notebook.icon" height="130" :alt="notebook.name">
    </div>
</template>

<script>
export default {
    name: 'NotebookItem',
    props: {notebook: Object}
}
</script>

<style>
    .notebook-item {
        margin-bottom: 30px;
        padding: 0 35px 0 50px;
        min-height: 200px;
        border: solid 4px var(--main-color);
        border-radius: 0px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .notebook-title {
        margin-right: 100px;
        color: var(--main-color);
        text-align: center;

        font-size: 48px;
        font-weight: normal;
        font-family: var(--main-font);
    }

    .notebook-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 80px;

        color: var(--main-color);
        font-size: 28px;
        font-family: var(--main-font);
    }
</style>