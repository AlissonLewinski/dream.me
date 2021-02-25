<template>
    <div class="register-by-id">
        <EditRegister :register="register" :loadRegister="loadRegister"/>
        <PageTitle :title="`${notebook.name || ''} - ${register.title || ''}`"/>
        
        <div class="register-content ql-editor" v-html="register.content"></div>
    </div>
</template>

<script>
import axios from 'axios'

import { baseApiUrl } from '@/global.js'
import PageTitle from '../template/PageTitle.vue'
import EditRegister from './EditRegister.vue'

export default {
    name: 'RegisterById',
    components: {PageTitle, EditRegister},
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
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 20px;
    }

    .register-content {
        border-radius: 2px 15px 15px 2px;
        margin-top: 20px;
        box-sizing: border-box;
        width: 900px;
        max-width: 95vw;

        font-family: var(--secondary-font);
    }

    .register-content p {
        line-height: 30px;
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