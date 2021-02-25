<template>
    <header class="header">
        <router-link to="/">
            <span class="header-logo">
                <h1>Dream.me</h1> <img src="@/assets/moon.svg" width="30" height="30">
            </span>
        </router-link>

        <UserDropdown v-if="!hideUserDropdown"/>
        
        <router-link v-else to="/entrar">
            <span class="header-login">Entrar</span>
        </router-link>
    </header>
</template>

<script>
import UserDropdown from './UserDropdown.vue'

export default {
    name: 'Header',
    components: {UserDropdown},
    props: {
        hideUserDropdown: Boolean
    }
}
</script>

<style>
    .header {
        height: 80px;
        background-color: var(--main-color);
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: var(--main-font);
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
        color: white;
    }

    .header-logo img {
        padding-left: 15px;
    }

    .header-login {
        font-size: 1.3rem;
        color: white;
        margin-right: 20px;
    }

</style>