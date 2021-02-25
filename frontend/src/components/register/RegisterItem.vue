<template>
    <router-link class="register-item-link" :to="`/registros/${register.id}`">
        <div class="register-item">
            <div class="register-item-circle"></div>
            <h2 class="register-item-title">{{register.title}}</h2>
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
        max-width: 100%;
    }

    .register-item {
        height: 40px;
        max-width: 100%;
        position: relative;

        display: flex;
        align-items: center;
        border-bottom: solid 2px rgb(78, 76, 76);

    }

    .register-item:hover {
        background-color: #f8f7d1;;
    }

    .register-item-circle {
        pointer-events: none;
        position: absolute;
        left: -37px;
        bottom: -10.5px;

        width: 20px;
        height: 20px;
        background-color: rgb(78, 76, 76);
        border-radius: 0px;
    }

    .register-item-title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 100%;
        text-align: center;

        font-weight: normal;
        font-family: var(--main-font);
        color: rgb(78, 76, 76);
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