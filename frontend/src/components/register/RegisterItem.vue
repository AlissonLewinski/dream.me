<template>
    <router-link class="register-item-link" :to="`/registros/${register.id}`">
        <div class="register-item">
            <h2>{{register.title}}</h2>
        </div>
    </router-link>
</template>

<script>
import axios from 'axios'
import { baseApiUrl } from '@/global.js'

export default {
    name: 'RegisterItem',
    props: {register: Object, loadRegisters: Function},
    methods: {
        deleteRegister() {
            axios.delete(`${baseApiUrl}/registers/${this.register.id}`)
                .then(() => this.loadRegisters())
        }
    }
}
</script>

<style>
    .register-item-link {
        width: 100%;
        margin: 0.2rem 0;
    }

    .register-item {
        padding: 0 0.5rem;

        height: 40px;
        max-width: 100%;

        position: relative;

        display: flex;
        align-items: center;

        background-color: var(--main-color);
        transition: background-color 0.2s;
    }

    .register-item:hover {
        background-color: var(--white);;
    }

    .register-item > h2 {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 100%;
        text-align: center;

        font-weight: normal;
        font-family: var(--main-font);
        color: var(--white);
    }

    .register-item:hover > h2 {
        color: var(--title);
    }

    .register-close {
        position: absolute;
        right: -50px;
        top: 27px;

        cursor: pointer;
        background-color: unset;
        border: none;
        outline: none;
        padding: 0;
    }
</style>