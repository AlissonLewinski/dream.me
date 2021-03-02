<template>
    <div class="menu">
        <router-link to="/">
            <img class="menu-logo" src="@/assets/logo.svg" alt="Dream.me">
        </router-link>

        <div class="menu-links">
            <MenuLink :icon="HomeIcon" path="/"/>
            <MenuLink v-if="!hideUserOptions" :icon="NotebookIcon" path="/cadernos"/>

            <MenuLink v-else :icon="EnterIcon" path="/entrar"/>

            <a v-if="!hideUserOptions" @click.prevent="logout" class="menu-link-container">
                <img :src="LogoutIcon" alt="">
            </a>
        </div>
        
        <footer>
            <span>Feito por Alisson Lewinski</span>
        </footer>
    </div>
</template>

<script>
import { userKey } from '@/global'

import MenuLink from './MenuLink.vue'

import NotebookIcon from "@/assets/notebook.svg"
import HomeIcon from "@/assets/home.svg"
import EnterIcon from "@/assets/enter.svg"
import LogoutIcon from "@/assets/logout.svg"

export default {
    name: 'Menu',
    props: { hideUserOptions: Boolean },
    components: { MenuLink },
    
    data: function() {
        return {
            NotebookIcon,
            HomeIcon,
            EnterIcon,
            LogoutIcon
        }
    },

    methods: {
        logout() {
            localStorage.removeItem(userKey)
            this.$store.commit('setUser', null)
            this.$router.push({ name: 'auth' })
        }
    }
}
</script>

<style>
    .menu {
        width: 7rem;

        background: var(--white);
        filter: drop-shadow(0px 0px 60px rgba(0, 0, 0, 0.05));

        display: flex;
        flex-direction: column;
        align-items: center;

        padding: 0.7rem 0;
    }

    .menu-logo {
        width: 6.5rem;
    }

    .menu-links {
        flex: 1;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 100%;
    }

    .menu footer span {
        display: flex;
        align-items: center;
        justify-content: center;

        text-align: center;

        color: var(--main-color);
        font-family: var(--main-font);
        font-size: 0.8rem;
        font-weight: 600;
    }
</style>