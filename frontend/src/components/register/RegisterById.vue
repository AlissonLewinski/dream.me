<template>
    <div class="register-by-id">

        <h1>{{`${notebook.name || ''} - ${register.title || ''}`}}</h1>
        <div class="register-content ql-editor" v-html="register.content"></div>
        
        <div class="register-actions">
            <EditRegister :register="register" :loadRegister="loadRegister"/>
            <DeleteRegister :register="register" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import { baseApiUrl } from '@/global.js'
import EditRegister from './EditRegister.vue'
import DeleteRegister from './DeleteRegister.vue'

export default {
    name: 'RegisterById',
    components: {EditRegister, DeleteRegister},
    data: function() {
        return {
            notebook: {},
            register: {}
        }
    },
    methods: {
        loadRegister() {
            this.$store.commit('setLoading', true)
            axios.get(`${baseApiUrl}/registers/${this.$route.params.registerId}`)
                .then(res => {
                    this.$store.commit('setLoading', false)
                    this.notebook = res.data.notebook
                    this.register = res.data.register
                })
        }
    },
    mounted() {
        this.loadRegister()
    }
}
</script>

<style src="quill/dist/quill.snow.css">
</style>
<style>
    .register-by-id {
        height: 100%;
        max-height: 100vh;
        width: 100vw;
        max-width: 1200px;

        margin: 0 auto;
        padding: 3rem 0.5rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 20px;

    }

    .register-by-id > h1 {
        font-weight: 600;
        font-family: var(--main-font);
        color: var(--main-color);
        margin: 0;
    }

    .register-actions {
        margin-top: 3rem;

        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .register-content {
        margin-top: 20px;
        width: 100%;

        font-family: var(--main-font);
        color: var(--text);
    }

    .register-content p {
        line-height: 1.6rem;
    }

    .register-content img {
        cursor: initial !important;
        max-width: 99%;
    }

    .register-content pre {
        background-color: #171131;
        color: #42DD76;
        font-size: 15px;
        padding: 7px;
        border-radius: 5px;
    }
</style>