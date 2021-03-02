<template>
    <div class="user-dropdown">
        <div class="user-dropdown-button">
            <span>{{user.username ? user.username.split(' ')[0]: ''}}</span>
            <img src="@/assets/down-arrow.svg" height="20" width="20">
        </div>

        <div class="user-dropdown-options">
            <MenuLink name="Meus cadernos" path="/cadernos"/>
            <MenuLink name="Minha conta" path="/cadernos"/>
            <hr>
            <a @click.prevent="logout" class="dropdown-link">
                Sair
            </a>
        </div>
    </div>
</template>

<script>
import { userKey } from '@/global'
import { mapState } from 'vuex'
import MenuLink from './MenuLink.vue'

export default {
    name: 'UserDropdown',
    components: {MenuLink},
    computed: mapState(['user']),
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
    .user-dropdown {
        position: relative;
        height: 70%;
        margin-right: 10px;

        color: white;
    }

    .user-dropdown-button {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;

        width: auto;
        max-width: 190px;
        height: 100%;
        overflow: hidden;
    }

    .user-dropdown-button span {
        font-size: 1.3rem;
        font-family: var(--main-font);
        margin-right: 8px;

        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .user-dropdown-options {
        z-index: 1;
        position: absolute;
        right: 0px;
        padding: 0px 7px 7px 7px;

        border: dashed 2px white;
        min-width: 110px;
        background-color: var(--main-color);

        display: flex;
        flex-direction: column;

        visibility: hidden;
    }

    .user-dropdown-options hr {
        width: 100%;
        margin: 8px 0 0 0;
    }

    .user-dropdown:hover .user-dropdown-options {
        visibility: visible;
    }
</style>