<template>
    <div class="save-notebook-container">
        <button @click="toggleModal" class="new-notebook-open-button" id="modal-open">
            <img src="@/assets/add.svg" alt="">
        </button>
        
        <modal name="save-notebook-modal" :scrollable="true"  :adaptive="true" width="600px" height="auto">

            <div class="save-notebook-modal-content">
                <button @click="toggleModal" id="modal-close" class="modal-close-button">
                    <img src="@/assets/close.svg" id="modal-close" height="25" width="25" alt="Fechar">
                </button>

                <h1>Adicionar novo caderno</h1>

                <label for="name">Nome: </label>
                <input v-model="notebook.name" class="dm-input" type="text" id="name">

                <div class="save-notebook-icon">
                    <input @change="iconToBase64" v-show="false" type="file" accept="image/*">
                    <button class="dm-btn" @click="iconInputClick">Selecionar Ícone</button>
                    <img :src="notebook.icon" width="130">
                </div>

                <div class="save-notebook-actions">
                    <button class="dm-btn" id="modal-close" @click="toggleModal">Cancelar</button>
                    <button class="dm-btn" @click="saveNotebook">Enviar</button>
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
    name: 'SaveNotebook',
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
            if(e.target.id === 'modal-close') {
                this.$modal.hide('save-notebook-modal')
                this.reset()
            } else {
                this.$modal.show('save-notebook-modal')
            }
        },

        iconToBase64() {
            var file = document.querySelector('.save-notebook-icon input').files[0]
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
            document.querySelector('.save-notebook-icon input').click()
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
    .save-notebook-container {
        height: 14rem;
        width: 11rem;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .new-notebook-open-button {
        outline: none;
        border: none;
        padding: 0;
        background: unset;
        cursor: pointer;
    }

    .new-notebook-open-button img {
        width: 4rem;
        height: 4rem;

        transition: height 0.15s;
    }

    .save-notebook-modal-content {
        padding: 1rem;
    }

    .save-notebook-modal-content > h1 {
        text-align: center;

        color: var(--main-color);
        font-family: var(--main-font);
        font-weight: 600;
        font-size: 1.8rem;

        border-bottom: solid 1px var(--main-color);
        margin: 0 0 1rem 0;
        padding-bottom: 0.7rem;
    }

    .save-notebook-modal-content label {
        font-family: var(--main-font);
        font-weight: 600;
    }

    .save-notebook-modal-content input {
        width: 100%;
    }

    .save-notebook-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 1rem 0;
    }

    .save-notebook-icon button {
        width: 100%;
    }

    .save-notebook-icon img {
        margin-top: 1rem;
    }

    .save-notebook-actions {
        display: flex;
        flex-direction: row;
        justify-content: space-between;        
    }

    .save-notebook-actions :first-child {
        background-color: var(--red);
    }

    .save-notebook-actions :last-child {
        background-color: var(--green);
    }
</style>