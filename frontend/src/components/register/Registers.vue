<template>
    <div class="registers-container">
        <div class="registers-notebooks-actions">

            <div class="registers-notebook-item">
                <NotebookItem :notebook="notebook"/>

                <div class="registers-notebook-item-edit">
                    <EditNotebook :notebook="notebook"/>
                    <DeleteNotebook :notebook="notebook"/>
                </div>
            </div>
        
            <NewRegister :id_notebook="notebook.id" :loadRegisters="loadRegisters"/>
        </div>

        <div class="registers">
            <RegisterItem v-for="register in registers" :key="register.id" :register="register" :loadRegisters="loadRegisters"/>

            <div v-if="!loadingRegisters" class="registers-pagination">
                <button @click="previousPage" v-if="page > 1" class="registers-left">
                    <img src="@/assets/left-arrow.svg" width="38" height="38" alt="Esquerda">
                </button>
                <div v-else/>

                <button @click="nextPage" v-if="hasMore" class="registers-right">
                    <img src="@/assets/right-arrow.svg" width="38" height="38" alt="Direita">
                </button>
                <div v-else/>
            </div>

            <div v-else class="registers-loading">
                <div class="ball-pulse">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import { baseApiUrl } from '@/global.js'
import NewRegister from './NewRegister.vue'
import RegisterItem from './RegisterItem.vue'
import EditNotebook from '../notebook/EditNotebook.vue'
import NotebookItem from '../notebook/NotebookItem.vue'
import DeleteNotebook from '../notebook/DeleteNotebook.vue'

export default {
    name: 'Registers',
    components: {NewRegister, RegisterItem, NotebookItem, EditNotebook, DeleteNotebook},
    data: function() {
        return {
            notebook: {},
            registers: [],
            page: 1,
            hasMore: true,
            loadingRegisters: false
        }
    },
    methods: {
        loadRegisters() {
            this.$store.commit('setLoading', true)
            axios.get(`${baseApiUrl}/notebooks/${this.$route.params.notebookId}`)
                .then(res => {
                    this.$store.commit('setLoading', false)
                    
                    if(res.data.registers.length < res.data.limit) {
                        this.hasMore = false
                    }
                    
                    this.notebook = res.data.notebook
                    this.registers = res.data.registers
                })
        },

        nextPage() {
            this.page++

            this.loadingRegisters = true
            axios.get(`${baseApiUrl}/notebooks/${this.$route.params.notebookId}?page=${this.page}`)
                .then(res => {
                    this.loadingRegisters = false

                    if(res.data.registers.length > 0) {
                        this.registers = res.data.registers
                    } else {
                        this.page--
                    }

                    if(res.data.registers.length < res.data.limit) {
                        this.hasMore = false
                    }
                })    
        },

        previousPage() {
            this.page--
            this.hasMore = true

            this.loadingRegisters = true
            axios.get(`${baseApiUrl}/notebooks/${this.$route.params.notebookId}?page=${this.page}`)
                .then(res => {
                    this.loadingRegisters = false
                    this.registers = res.data.registers
                })    

        }
    },
    mounted() {
        this.loadRegisters()
    }
}
</script>

<style>
    .registers-container {
        width: 100vw;
        max-width: 1200px;

        padding: 4rem 0.5rem;
        margin: 0 auto;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center
    }

    .registers {
        width: 100%;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    .registers-notebooks-actions {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;

        margin-bottom: 2em;
        padding-bottom: 1rem;

        border-bottom: solid 2px var(--main-color);
    }

    .registers-notebook-item {
        display: flex;
        flex-direction: row;
        align-items: center;

        margin-bottom: 1rem;
    }

    .registers-notebook-item-edit {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 120px;
    }

    @media(max-width: 450px) {
        .registers-notebooks-actions {
            flex-direction: column;
        }
    }

    .registers-pagination {
        margin-top: 30px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .registers-pagination button {
        cursor: pointer;
        background-color: unset;
        border: none;
        outline: none;
        padding: 0;
    }

    .registers .ball-pulse div {
        background-color: var(--main-color);
    }

    .registers-loading {
        margin-top: 45px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>