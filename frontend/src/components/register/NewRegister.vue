<template>
    <div>
        <button @click="toggleModal" id="modal-open" class="dm-btn new-register-open-button">Novo Registro</button>

        <modal name="new-register-modal" :scrollable="true"  :adaptive="true" width="1200px" height="auto"
            @before-close="reset"
        >

            <div class="new-register-modal-content">

                <button @click="toggleModal" id="modal-close" class="new-register-close">
                    <img src="@/assets/close.svg" id="modal-close" height="25" width="25" alt="Fechar">
                </button>

                <label class="dm-label" for="register-name">Título: </label>
                <input v-model="register.title" class="dm-input" id="register-name" type="text">

                <VueEditor :editorOptions="editorSettings" v-model="register.content" class="new-register-editor" />

                <div class="new-register-modal-actions">
                    <button @click="toggleModal" id="modal-close" class="dm-btn">Cancelar</button>
                    <button @click="save" class="dm-btn">Enviar</button>
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
    name: 'NewRegister',
    props: {id_notebook: Number, loadRegisters: Function},
    components: { VueEditor },
    data: function() {
        return {
            register: {
                title: '',
                content: ''
            },
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
                this.$modal.hide('new-register-modal')
            } else {
                this.$modal.show('new-register-modal')
            }
        },

        toggleVisibility() {
            this.isVisible = !this.isVisible
            this.reset()
        },

        reset() {
            this.register = {
                title: '',
                content: ''
            }
        },
        
        save() {
            this.$store.commit('setLoading', true)
            axios.post(`${baseApiUrl}/registers`, {...this.register, id_notebook: this.id_notebook})
                .then(() => {
                    this.$store.commit('setLoading', false)
                    this.$modal.hide('new-register-modal')
                    this.$toast.open({
                        message: 'Registro salvo com sucesso',
                        position: 'top-right',
                        type: 'info',
                        duration: 4000
                    })
                    this.isVisible = false
                    this.reset()
                    this.loadRegisters()
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

    .new-register-modal-content {
        padding: 25px;
    }

    #register-name {
        margin-bottom: 20px;
    }

    .new-register-editor {
        margin-bottom: 80px;
        height: 350px;
    }

    @media(max-width: 936px) {
        .new-register-editor {
            margin-bottom: 114px;
        }
    }
    @media(max-width: 532px) {
        .new-register-editor {
            margin-bottom: 148px;
        }
    }
    @media(max-width: 384px) {
        .new-register-editor {
            margin-bottom: 182px;
        }
    }

    [name="new-register-modal"] {
        padding: 20px 20px 0 20px;
        border: solid 3px var(--main-color);
    }

    .new-register input {
        width: 300px;
    }

    .new-register-container .dm-btn {
        width: 100%;
    }

    .new-register-close {
        position: absolute;
        right: 20px;
        top: 20px;

        cursor: pointer;
        background-color: unset;
        border: none;
        outline: none;
        padding: 0;
    }

    .new-register-modal-actions {
        display: flex;
        flex-direction: row;

        justify-content: space-between;
    }

    .new-register-modal-actions :first-child {
        background-color: var(--red);
    }

    .new-register-modal-actions :last-child {
        background-color: var(--green);
    }
</style>