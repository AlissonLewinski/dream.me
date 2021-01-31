<template>
    <header class="header">
        <span class="header-logo">
            <h1>Dream.me</h1> <img src="@/assets/moon.svg" alt="">
        </span>
        <div class="header-actions">
            <Header-link name="Meus cadernos"/>
            <Header-link name="Novo caderno"/>
        </div>
    </header>
</template>

<script>
import HeaderLink from './HeaderLink.vue'

export default {
    name: 'Header',
    components: {HeaderLink}
}
</script>

<style>
    .header {
        height: 80px;
        background-color: var(--main-color);
        display: flex;
        align-items: center;
    }

    .header-logo {
        margin-left: 20px;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .header-logo h1 {
        margin: 0;
        padding-bottom: 2px;
        font-weight: normal;
        font-size: 36px;
        font-family: 'Lobster', cursive;
        color: white;
    }

    .header-logo img {
        padding-left: 15px;
    }
    
    .header-actions {
        margin-left: 20px;
    }
</style>