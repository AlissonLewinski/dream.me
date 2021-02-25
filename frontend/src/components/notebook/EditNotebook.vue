<template>
    <div>
        <button @click="toggleModal" class="edit-notebook-open-button" id="modal-open">
            <img src="@/assets/edit.svg" width="30" height="30" alt="Editar">
        </button>
        
        <modal name="edit-notebook-modal" :scrollable="true"  :adaptive="true" width="600px" height="auto">

            <button @click="toggleModal" id="modal-close" class="modal-close-button">
                <img src="@/assets/close.svg" id="modal-close" height="25" width="25" alt="Fechar">
            </button>

            <PageTitle title="Editar Caderno"/>
            <div class="edit-notebook">
                <div class="edit-notebook-name">
                    <label for="name">Nome: </label>
                    <input v-model="notebook.name" type="text" id="name">
                </div>

                <div class="edit-notebook-icon">
                    <input @change="iconToBase64" v-show="false" type="file" accept="image/*">
                    <button class="dm-btn" @click="iconInputClick">Selecionar Ícone</button>
                    <img :src="notebook.icon" width="130">
                </div>
                <button class="dm-btn" @click="saveNotebook">Enviar</button>
            </div>
        </modal>
    </div>
</template>

<script>
import axios from 'axios'
import {resize} from './ImageTools.js'

import { baseApiUrl, showError } from '@/global'
import PageTitle from '../template/PageTitle.vue'

export default {
    name: 'EditNotebook',
    components: {PageTitle},
    props: { notebook: Object },
    methods: {

        toggleModal(e) {
            console.log(e.target.id);
            if(e.target.id === 'modal-close') {
                this.$modal.hide('edit-notebook-modal')
            } else {
                this.$modal.show('edit-notebook-modal')
            }
        },

        iconToBase64() {
            var file = document.querySelector('.edit-notebook-icon input').files[0]
            var reader = new FileReader()

            resize(file, {
                width: 450,
                height: 450
            }, blob => {
                reader.readAsDataURL(blob)
                reader.onloadend = () => {
                    this.notebook.icon = reader.result
                }
            })
        },

        iconInputClick() {
            document.querySelector('.edit-notebook-icon input').click()
        },

        saveNotebook() {
            this.$store.commit('setLoading', true)
            axios.put(`${baseApiUrl}/notebooks/${this.notebook.id}`, this.notebook)
                .then(() => {
                    this.$store.commit('setLoading', false)
                    this.$modal.hide('edit-notebook-modal')

                    this.$toast.open({
                        message: 'Caderno salvo com sucesso',
                        position: 'top-right',
                        type: 'info',
                        duration: 4000
                    })
                })
                .catch(res => {
                    this.$store.commit('setLoading', false)
                    showError(res)
                })
        }
    }
}
</script>

<style>

    .edit-notebook {
        overflow: hidden;
        padding: 0 20px 20px 20px;

        display: flex;
        flex-direction: column;
    }

    .edit-notebook-open-button {
        border-radius: 15px;

        margin-left: 20px;
        background-color: white;
        outline: none;
        border: none;
        cursor: pointer;
    }
    
    .edit-notebook-name {
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;
    } 

    .edit-notebook-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .edit-notebook-icon img {
        margin: 15px 0 15px 0;
    } 

</style>