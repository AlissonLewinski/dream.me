<template>
    <div class="notebooks-container">
        <PageTitle title="Meus Cadernos"/>

        <div class="notebooks-actions">
            <SaveNotebook :loadNotebooks="loadNotebooks"/>

            <div class="notebooks-search-container">
                <button @click="loadNotebooks">
                    <img src="@/assets/close.svg" height="25" width="25" alt="Cancelar">
                </button>

                <input type="text" v-model="searching">
                
                <button @click="searchNotebooks">
                    <img src="@/assets/search.svg" height="25" width="25" alt="Pesquisar">
                </button>
            </div>
        </div>

        <div class="notebooks-content">
            <div class="notebooks-content-books">
                <NotebookItem v-for="nb in notebooks" :notebook="nb" :key="nb.id"/>
            </div>
        </div>

        <div v-if="hasMoreNotebooks" class="load-more-container">
            
            <button v-if="!loadingMore" @click="loadMore" class="dm-btn">
                Carregar mais
            </button>

            <div v-else class="ball-pulse">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import { baseApiUrl } from '@/global.js'
import PageTitle from '../template/PageTitle.vue'
import NotebookItem from './NotebookItem.vue'
import SaveNotebook from './SaveNotebook.vue'

export default {
    name: 'NotebooksByUser',
    components: {NotebookItem, PageTitle, SaveNotebook},
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
    .notebooks-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        padding-bottom: 40px;

        width: 95vw;
        max-width: 1700px;
    }

    .notebooks-content {
        margin-top: 30px;
        width: 100%;
        height: auto;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .notebooks-content-books {
        max-width: 1673px;
    }

    .notebooks-container .ball-pulse div {
        background-color: var(--main-color);
    }

    .notebooks-actions {
        width: 95vw;
        max-width: 1700px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .notebooks-search-container {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .notebooks-search-container input {
        margin: 0 10px 0 10px;
    }

    .notebooks-search-container button {
        cursor: pointer;
        background-color: unset;
        border: none;
        outline: none;
        padding: 0;
    }

    .load-more-container {
        margin-top: 30px;
    }
</style>