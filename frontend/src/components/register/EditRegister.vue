<template>
    <div class="edit-register-container">
        <button @click="toggleModal" id="modal-open" class="dm-btn edit-register-open-button">
            <img src="@/assets/edit.svg" alt="Editar" id="modal-open">
        </button>

        <modal name="edit-register-modal" 
            :scrollable="true"  
            :adaptive="true" 
            width="1200px" 
            height="auto"
            
            @before-close="loadRegister"
            >

            <div class="edit-register-modal-content">

                <button @click="toggleModal" id="modal-close" class="edit-register-close">
                    <img src="@/assets/close.svg" id="modal-close" height="25" width="25" alt="Fechar">
                </button>

                <label class="dm-label" for="register-name">Título: </label>
                <input v-model="register.title" class="dm-input" id="register-name" type="text">

                <VueEditor :editorOptions="editorSettings" v-model="register.content" class="edit-register-editor" />

                <div class="new-register-modal-actions">
                    <button @click="toggleModal" id="modal-close" class="dm-btn">Cancelar</button>
                    <button @click="save" class="dm-btn">Salvar</button>
                </div>
                
            </div>
        </modal>
    </div>
</template>

<script>
import axios from 'axios'
import { VueEditor, Quill } from 'vue2-editor'
import ImageResize from 'quill-image-resize-vue';
import { baseApiUrl, showError } from '@/global.js'

Quill.register("modules/imageResize", ImageResize)

export default {
    name: 'EditRegister',
    props: {register: Object, loadRegister: Function},
    components: { VueEditor },
    data: function() {
        return {
            editorSettings: {
                modules: {
                    imageResize: {},
                }
            }
        }
    },
    methods: {
        toggleModal(e) {
            if(e.target.id === 'modal-close') {
                this.$modal.hide('edit-register-modal')
            } else {
                this.$modal.show('edit-register-modal')
            }
        },

        reset() {
            this.register = {
                title: '',
                content: ''
            }
        },

        save() {
            this.$store.commit('setLoading', true)
            axios.put(`${baseApiUrl}/registers/${this.register.id}`, this.register)
                .then(() => {
                    this.$store.commit('setLoading', false)
                    this.$modal.hide('edit-register-modal')
                    this.$toast.open({
                        message: 'Alterações salvas com sucesso',
                        position: 'top-right',
                        type: 'info',
                        duration: 4000
                    })
                })
                .catch(res => {
                    showError(res)
                    this.$store.commit('setLoading', false)
                })
        }
    }

}
</script>

<style>

    .edit-register-container > button img {
        width: 2.4rem;
        height: 2.4rem;
    }

    .edit-register-container > button {
        border-radius: 15px;

        margin-left: 20px;
        background-color: white;
        outline: none;
        border: none;
        cursor: pointer;
    }

    .edit-register-modal-content {
        padding: 25px;
    }

    #register-name {
        margin-bottom: 20px;
    }

    .edit-register-editor {
        margin-bottom: 80px;
        height: 350px;
    }

    @media(max-width: 936px) {
        .edit-register-editor {
            margin-bottom: 114px;
        }
    }
    @media(max-width: 532px) {
        .edit-register-editor {
            margin-bottom: 148px;
        }
    }
    @media(max-width: 384px) {
        .edit-register-editor {
            margin-bottom: 182px;
        }
    }

    [name="edit-register-modal"] {
        padding: 20px 20px 0 20px;
        border: solid 3px var(--main-color);
    }

    .edit-register-close {
        position: absolute;
        right: 20px;
        top: 20px;

        cursor: pointer;
        background-color: unset;
        border: none;
        outline: none;
        padding: 0;
    }

    .edit-register-modal-actions {
        display: flex;
        flex-direction: row;

        justify-content: space-between;
    }

    .edit-register-modal-actions :first-child {
        background-color: var(--red);
    }

    .edit-register-modal-actions :last-child {
        background-color: var(--green);
    }
</style>