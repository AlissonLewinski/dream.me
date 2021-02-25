<template>
    <div class="edit-register-container">

        <button @click="toggleVisibility" v-show="!isVisible" class="dm-btn">Editar Registro</button>

        <div v-show="isVisible" class="edit-register">
            <button @click="toggleVisibility" class="edit-register-close">
                <img src="@/assets/close.svg" height="25" width="25" alt="Fechar">
            </button>

            <label for="register-name">Título: </label>
            <input v-model="register.title" id="register-name" type="text">

            <VueEditor :editorOptions="editorSettings" v-model="register.content" class="edit-register-editor" />

            <button @click="save" class="dm-btn">Salvar</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { VueEditor, Quill } from 'vue2-editor'
import ImageResize from 'quill-image-resize-vue'
import { baseApiUrl } from '@/global.js'

Quill.register("modules/imageResize", ImageResize)

export default {
    name: 'EditRegister',
    props: {register: Object, loadRegister: Function},
    components: { VueEditor },
    data: function() {
        return {
            isVisible: false,
            editorSettings: {
                modules: {
                    imageResize: {},
                }
            }
        }
    },
    methods: {
        toggleVisibility() {
            this.isVisible = !this.isVisible
        },
        
        save() {
            this.$store.commit('setLoading', true)
            axios.put(`${baseApiUrl}/registers/${this.register.id}`, this.register)
                .then(() => {
                    this.$store.commit('setLoading', false)
                    this.$toast.open({
                        message: 'Registro salvo com sucesso',
                        position: 'top-right',
                        type: 'info',
                        duration: 4000
                    })
                    this.isVisible = false
                })
        }
    }

}
</script>

<style>

    .edit-register-container {
        margin: 20px 0px 20px 0px;
        width: 900px;
        max-width: 95vw;
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

    .edit-register {
        position: relative;
        padding: 20px;
        border: solid 3px var(--main-color);
    }

    .edit-register input {
        width: 300px;
    }

    .edit-register-container .dm-btn {
        width: 100%;
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
</style>