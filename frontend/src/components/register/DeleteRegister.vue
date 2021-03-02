<template>
    <div class="delete-register-container">
        <button @click="toggleModal" class="delete-register-open-button" id="modal-open">
            <img src="@/assets/trash.svg" alt="Editar">
        </button>
        
        <modal name="delete-register-modal" :scrollable="true"  :adaptive="true" width="500px" height="auto">

            <div class="delete-register">
                <button @click="toggleModal" id="modal-close" class="modal-close-button">
                    <img src="@/assets/close.svg" id="modal-close" height="25" width="25" alt="Fechar">
                </button>

                <h1>Remover Registro?</h1>
                <div class="delete-register-actions">
                    <button class="dm-btn" id="modal-close" @click="toggleModal">Não</button>
                    <button class="dm-btn" @click="deleteRegister">Sim</button>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import axios from 'axios'

import { baseApiUrl, showError } from '@/global'

export default {
    name: 'DeleteRegister',
    props: { register: Object },
    methods: {

        toggleModal(e) {
            if(e.target.id === 'modal-close') {
                this.$modal.hide('delete-register-modal')
            } else {
                this.$modal.show('delete-register-modal')
            }
        },

        deleteRegister() {
            this.$store.commit('setLoading', true)
            axios.delete(`${baseApiUrl}/registers/${this.register.id}`)
                .then(() => {
                    this.$store.commit('setLoading', false)
                    this.$modal.hide('delete-register-modal')
                    this.$router.push({path: `/cadernos/${this.register.id_notebook}`})

                    this.$toast.open({
                        message: 'Registro removido com sucesso',
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
    .delete-register {
        overflow: hidden;
        padding: 0 20px 20px 20px;

        display: flex;
        flex-direction: column;
    }

    .delete-register h1 {
        font-family: var(--main-font);
        font-weight: 600;
        font-size: 1.5rem;
        
        color: var(--main-color);

        text-align: center;
    }

    .delete-register-container > button img {
        width: 2.4rem;
        height: 2.4rem;
    }

    .delete-register-container > button {
        border-radius: 15px;

        margin-left: 20px;
        background-color: white;
        outline: none;
        border: none;
        cursor: pointer;
    }

    .delete-register-actions {
        margin-top: 25px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .delete-register-actions button {
        width: 80px;
    }

    .delete-register-actions :first-child {
        background-color: var(--red);
    }

    .delete-register-actions :last-child {
        background-color: var(--green);
    }
</style>