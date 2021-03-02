<template>
    <div>
        <button @click="toggleModal" class="delete-notebook-open-button" id="modal-open">
            <img src="@/assets/trash.svg" width="32" height="32" alt="Editar">
        </button>
        
        <modal name="delete-notebook-modal" :scrollable="true"  :adaptive="true" width="500px" height="auto">

            <div class="delete-notebook">
                <button @click="toggleModal" id="modal-close" class="modal-close-button">
                    <img src="@/assets/close.svg" id="modal-close" height="25" width="25" alt="Fechar">
                </button>

                <h1>Remover Caderno?</h1>
                <div class="delete-notebook-actions">
                    <button class="dm-btn" id="modal-close" @click="toggleModal">Não</button>
                    <button class="dm-btn" @click="deleteNotebook">Sim</button>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import axios from 'axios'

import { baseApiUrl, showError } from '@/global'

export default {
    name: 'EditNotebook',
    props: { notebook: Object },
    methods: {

        toggleModal(e) {
            if(e.target.id === 'modal-close') {
                this.$modal.hide('delete-notebook-modal')
            } else {
                this.$modal.show('delete-notebook-modal')
            }
        },

        deleteNotebook() {
            this.$store.commit('setLoading', true)
            axios.delete(`${baseApiUrl}/notebooks/${this.notebook.id}`)
                .then(() => {
                    this.$store.commit('setLoading', false)
                    this.$modal.hide('delete-notebook-modal')
                    this.$router.push({path: '/cadernos'})

                    this.$toast.open({
                        message: 'Caderno removido com sucesso',
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

    .delete-notebook {
        overflow: hidden;
        padding: 0 20px 20px 20px;

        display: flex;
        flex-direction: column;
    }

    .delete-notebook h1 {
        font-family: var(--main-font);
        font-weight: 600;
        font-size: 1.5rem;
        
        color: var(--main-color);

        text-align: center;
    }

    .delete-notebook-open-button {
        border-radius: 15px;

        margin-left: 20px;
        background-color: white;
        outline: none;
        border: none;
        cursor: pointer;
    }

    .delete-notebook-actions {
        margin-top: 25px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .delete-notebook-actions button {
        width: 80px;
    }

    .delete-notebook-actions :first-child {
        background-color: var(--red);
    }

    .delete-notebook-actions :last-child {
        background-color: var(--green);
    }
</style>