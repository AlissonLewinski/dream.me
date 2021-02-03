<template>
    <div class="new-register-container">

        <button @click="toggleVisibility" v-show="!isVisible" class="dm-btn">Novo Registro</button>

        <div v-show="isVisible" class="new-register">
            <button @click="toggleVisibility" class="new-register-close">
                <img src="@/assets/close.svg" height="25" width="25" alt="Fechar">
            </button>

            <label for="register-name">Título: </label>
            <input v-model="register.title" id="register-name" type="text">

            <VueEditor v-model="register.content" class="new-register-editor" />

            <button @click="save" class="dm-btn">Salvar</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import { baseApiUrl } from '@/global.js'
import { VueEditor } from 'vue2-editor'

export default {
    name: 'NewRegister',
    components: { VueEditor },
    data: function() {
        return {
            register: {
                title: '',
                content: ''
            },
            isVisible: false
        }
    },
    methods: {
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
            axios.post(`${baseApiUrl}/registers`, this.register)
                .then(() => {
                    this.$toast.open({
                        message: 'Registro salvo com sucesso',
                        position: 'top-right',
                        type: 'info',
                        duration: 4000
                    })
                    this.isVisible = false
                    this.reset()
                })
        }
    }

}
</script>

<style>

    .new-register-container {
        margin-top: 20px;
        width: 900px;
        max-width: 95vw;
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

    .ql-toolbar {
        border: solid 3px var(--main-color) !important;
    }

    .ql-container {
        border-right: solid 3px var(--main-color) !important;
        border-left: solid 3px var(--main-color) !important;
        border-bottom: solid 3px var(--main-color) !important;
    }

    .new-register {
        position: relative;
        padding: 20px 20px 0 20px;
        border: solid 3px var(--main-color);
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
</style>