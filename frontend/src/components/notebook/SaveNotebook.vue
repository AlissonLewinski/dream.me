<template>
    <div>
        <button @click="toggleModal" class="dm-btn new-notebook-open-button" id="modal-open">Novo caderno</button>
        
        <modal name="save-notebook-modal" :scrollable="true"  :adaptive="true" width="600px" height="auto">

            <button @click="toggleModal" id="modal-close" class="modal-close-button">
                <img src="@/assets/close.svg" id="modal-close" height="25" width="25" alt="Fechar">
            </button>

            <PageTitle title="Novo Caderno"/>
            <div class="new-notebook">
                <div class="new-notebook-name">
                    <label for="name">Nome: </label>
                <hr>
                    <input v-model="notebook.name" type="text" id="name">
                </div>

                <div class="new-notebook-icon">
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
    name: 'SaveNotebook',
    components: {PageTitle},
    props: { loadNotebooks: Function },
    data: function() {
        return {
            notebook: {
                name: '',
                icon: null
            }
        }
    },
    methods: {

        toggleModal(e) {
            console.log(e.target.id);
            if(e.target.id === 'modal-close') {
                this.$modal.hide('save-notebook-modal')
            } else {
                this.$modal.show('save-notebook-modal')
            }
        },

        iconToBase64() {
            var file = document.querySelector('.new-notebook-icon input').files[0]
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
            document.querySelector('.new-notebook-icon input').click()
        },

        reset() {
            this.notebook = {
                name: '',
                icon: null
            }
        },

        saveNotebook() {
            this.$store.commit('setLoading', true)
            axios.post(`${baseApiUrl}/notebooks`, this.notebook)
                .then(() => {
                    this.$store.commit('setLoading', false)
                    this.$modal.hide('save-notebook-modal')

                    this.$toast.open({
                        message: 'Caderno salvo com sucesso',
                        position: 'top-right',
                        type: 'info',
                        duration: 4000
                    })
                    this.loadNotebooks()
                    this.reset()
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

    .new-notebook {
        margin-top: 30px;
        overflow: hidden;
        padding: 0 20px 20px 20px;

        display: flex;
        flex-direction: column;
    }

    .new-notebook button {
        width: 100%;
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
        margin: 15px 0 15px 0;
    } 

</style>