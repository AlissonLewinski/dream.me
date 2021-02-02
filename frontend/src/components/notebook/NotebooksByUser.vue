<template>
    <div class="notebooks-container">
        <PageTitle title="Meus Cadernos"/>

        <div class="notebooks-content">
            <NotebookItem v-for="nb in notebooks" :notebook="nb" :key="nb.id"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import { baseApiUrl } from '@/global.js'
import PageTitle from '../template/PageTitle.vue'
import NotebookItem from './NotebookItem.vue'

export default {
    name: 'NotebooksByUser',
    components: {NotebookItem, PageTitle},
    data: function() {
        return {
            notebooks: []
        }
    },
    methods: {
        loadNotebooks() {
            axios.get(`${baseApiUrl}/notebooks`)
                .then(res => this.notebooks = res.data)
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
    }

    .notebooks-content {
        margin-top: 30px;
        width: 950px;
        max-width: 95vw;
    }
</style>