<template>
    <div class="notebooks-page-container">
        <h1>Meus cadernos</h1>

        <section class="notebooks-container">
            <NotebookItem v-for="nb in notebooks" :notebook="nb" :key="nb.id"/>
        </section>
    </div>
</template>

<script>
import axios from 'axios'

import { baseApiUrl } from '@/global.js'
import NotebookItem from './NotebookItem.vue'
//import SaveNotebook from './SaveNotebook.vue'

export default {
    name: 'NotebooksByUser',
    //components: {NotebookItem, SaveNotebook},
    components: {NotebookItem},
    data: function() {
        return {
            notebooks: [],
            page: 1,
            hasMoreNotebooks: true,
            loadingMore: false,
            searching: ''
        }
    },
    methods: {
        loadNotebooks() {
            this.searching = ''
            this.$store.commit('setLoading', true)
            axios.get(`${baseApiUrl}/notebooks?page=1`)
                .then(res => {
                    this.$store.commit('setLoading', false)
                    this.notebooks = res.data.notebooks

                    this.hasMoreNotebooks = true
                    this.page = 1
                })
        },

        loadMore() {
            this.page++
            this.loadingMore = true
            axios.get(`${baseApiUrl}/notebooks?page=${this.page}`)
                .then(res => {
                    this.loadingMore = false

                    if(res.data.notebooks.length > 0) {
                        this.notebooks = this.notebooks.concat(res.data.notebooks)
                    } else {
                        this.hasMoreNotebooks = false
                    }

                })
        },

        searchNotebooks() {
            this.$store.commit('setLoading', true)
            axios.get(`${baseApiUrl}/notebooks/byName?name=${this.searching}`)
                .then(res => {
                    this.$store.commit('setLoading', false)
                    this.notebooks = res.data.notebooks

                    this.hasMoreNotebooks = false
                })
        }
    },
    mounted() {
        this.loadNotebooks()
    }
}
</script>

<style>
    .notebooks-page-container {
        height: 100%;
        max-height: 100vh;
        width: 100vw;
        max-width: 1200px;

        margin: 0 auto;
        padding: 3rem 0.5rem;
    }

    .notebooks-page-container > h1 {
        font-size: 2rem;
        font-weight: 600;
        font-family: var(--main-font);
        color: var(--text);
    }

    .notebooks-container {
        max-height: 70%;
        overflow-y: scroll;
    }
</style>