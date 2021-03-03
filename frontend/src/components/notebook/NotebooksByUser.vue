<template>
    <div class="notebooks-page-container">
        <h1>Meus cadernos</h1>
        <h3>{{user.username}}</h3>

        <section class="notebooks-list-container">
            <div class="notebooks-list-items">
                <NotebookItem v-for="nb in notebooks" :notebook="nb" :key="nb.id"/>

                <SaveNotebook :loadNotebooks="loadNotebooks"/>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from "vuex";

import { baseApiUrl } from '@/global.js'
import NotebookItem from './NotebookItem.vue'
import SaveNotebook from './SaveNotebook.vue'

export default {
    name: 'NotebooksByUser',
    components: {NotebookItem, SaveNotebook},
    computed: mapState(["user"]),
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
        height: auto;
        width: 100vw;
        max-width: 1200px;

        margin: 0 auto;
        padding: 3rem 0.5rem;
    }

    .notebooks-page-container > h1 {
        font-size: 2rem;
        font-weight: 600;
        font-family: var(--main-font);
        color: var(--main-color);
    }
    
    .notebooks-page-container > h3 {
        font-size: 1.4rem;
        font-weight: 600;
        font-family: var(--main-font);
        color: var(--main-color);
    }

    @media(max-width: 335px) {
        .notebooks-page-container > h1 {
            text-align: center;
        }
    }

    .notebooks-list-container {
        display: flex;
        justify-content: center;
        align-items: center;

    }

    .notebooks-list-items {
        width: 790%;
        display: grid;
        grid-template-columns: repeat(auto-fill, 11rem);
        grid-gap: 2rem 1rem;
        justify-content: center;
    }

</style>