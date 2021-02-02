<template>
    <header class="header">
        <router-link to="/">
            <span class="header-logo">
                <h1>Dream.me</h1> <img src="@/assets/moon.svg" width="30" height="30">
            </span>
        </router-link>
        
        <div class="header-links">
            <Header-link name="Meus cadernos" path="/cadernos"/>
            <Header-link name="Novo caderno" path="/cadernos/novo"/>
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

    .header a {
        text-decoration: none;
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
        font-family: var(--main-font);
        color: white;
    }

    .header-logo img {
        padding-left: 15px;
    }
    
    .header-links {
        margin-left: 20px;
        display: flex;
        flex-direction: row;
    }
</style>