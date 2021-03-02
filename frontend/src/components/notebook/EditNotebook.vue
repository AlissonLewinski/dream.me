<template>
    <div>
        <button @click="toggleModal" class="edit-notebook-open-button" id="modal-open">
            <img src="@/assets/edit.svg" width="30" height="30" alt="Editar">
        </button>
        
        <modal 
            name="edit-notebook-modal"
            :scrollable="true"
            :adaptive="true"
            width="600px"
            height="auto"
            
            @before-close="loadRegisters">

            <div class="edit-notebook-modal-content">

                <button @click="toggleModal" id="modal-close" class="modal-close-button">
                    <img src="@/assets/close.svg" id="modal-close" height="25" width="25" alt="Fechar">
                </button>

                <h1>Editar caderno</h1>

                <label class="dm-label" for="name">Nome: </label>
                <input v-model="notebook.name" class="dm-input" type="text" id="name">

                <div class="edit-notebook-icon">
                    <input @change="iconToBase64" v-show="false" type="file" accept="image/*">
                    <button class="dm-btn" @click="iconInputClick">Selecionar Ícone</button>
                    <img :src="notebook.icon" width="130">
                </div>

                <div class="edit-notebook-actions">
                    <button class="dm-btn" id="modal-close" @click="toggleModal">Cancelar</button>
                    <button class="dm-btn" @click="saveNotebook">Salvar</button>
                </div>
            </div>
    
        </modal>
    </div>
</template>

<script>
import axios from 'axios'
import {resize} from './ImageTools.js'

import { baseApiUrl, showError } from '@/global'

export default {
    name: 'EditNotebook',
    props: { notebook: Object, loadRegisters: Function },
    data: function() {
        return {
            oldNotebook: {}
        }
    },

    methods: {
        toggleModal(e) {
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
                        message: 'Alterações salvas com sucesso',
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

    .edit-notebook-modal-content {
        padding: 1rem;
    }

    .edit-notebook-modal-content > h1 {
        text-align: center;

        color: var(--main-color);
        font-family: var(--main-font);
        font-weight: 600;
        font-size: 1.8rem;

        border-bottom: solid 1px var(--main-color);
        margin: 0 0 1rem 0;
        padding-bottom: 0.7rem;
    }

    .edit-notebook-modal-content input {
        width: 100%;
    }

    .edit-notebook-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 1rem 0;
    }
    
    .edit-notebook-icon button {
        width: 100%;
    }

    .edit-notebook-icon img {
        margin-top: 1rem;
    } 

    .edit-notebook-actions {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .edit-notebook-actions :first-child {
        background-color: var(--red)
    }

    .edit-notebook-actions :last-child {
        background-color: var(--green);
    }
</style>