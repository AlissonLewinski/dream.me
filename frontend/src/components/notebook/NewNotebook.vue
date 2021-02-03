<template>
    <div class="new-notebook-container">
        <PageTitle title="Novo Caderno"/>
        <div class="new-notebook">
            <div class="new-notebook-name">
                <label for="name">Nome: </label>
                <input v-model="notebook.name" type="text" id="name">
            </div>

            <div class="new-notebook-icon">
                <input @change="iconToBase64" v-show="false" type="file" accept="image/*">
                <button class="dm-btn" @click="iconInputClick">Selecionar Ícone</button>
                <img :src="notebook.icon" width="130">
            </div>

            <button class="dm-btn" @click="saveNotebook">Enviar</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import { baseApiUrl } from '@/global.js'
import PageTitle from '../template/PageTitle.vue'

export default {
    name: 'NewNotebook',
    components: {PageTitle},
    data: function() {
        return {
            notebook: {
                name: '',
                icon: null
            }
        }
    },
    methods: {
        iconToBase64() {
            var file = document.querySelector('.new-notebook-icon input').files[0]
            var reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = e => {
                this.notebook.icon = e.target.result
            } 
        },

        iconInputClick() {
            document.querySelector('.new-notebook-icon input').click()
        },

        reset() {
            this.notebook = {
                name: '',
                icon: null
            }
        },

        saveNotebook() {
            axios.post(`${baseApiUrl}/notebooks`, this.notebook)
                .then(() => {
                    this.$toast.open({
                        message: 'Caderno salvo com sucesso',
                        position: 'top-right',
                        type: 'info',
                        duration: 4000
                    })
                    this.reset()
                })
        }
    }
}
</script>

<style>
    .new-notebook-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .new-notebook {
        margin-top: 30px;
        width: 350px;
        max-width: 95vw;
        overflow: hidden;
    }
    
    .new-notebook-name {
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;
    } 

    .new-notebook-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .new-notebook-icon img {
        margin-bottom: 15px;
    } 

</style>