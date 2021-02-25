<template>
    <div class="auth-content">
        <div class="auth-modal">
            <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>

            <input v-model="user.username" name="username" placeholder="Nome de usuário" type="text">
            <input v-model="user.password" name="password" placeholder="Senha" type="password">
            <input v-if="showSignup" v-model="user.confirmPassword" placeholder="Confirme a Senha" type="password">
        
            <button class="dm-btn" v-if="showSignup" @click="signup">Registrar</button>
            <button class="dm-btn" v-else @click="signin">Entrar</button>

            <a href @click.prevent="showSignup = !showSignup">
                <span>
                    {{showSignup ? 'Já tem cadastro? Faça o Login!'
                        : 'Não tem cadastro? Registre-se aqui!'}}
                </span>
            </a>
        </div>
    </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from '@/global'
import axios from 'axios'

export default {
    name: 'Auth',
    data: function() {
        return {
            showSignup: false,
            user: {}
        }
    },
    methods: {
        signin() {
            axios.post(`${baseApiUrl}/signin`, this.user)
                .then(res => {
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$router.push({path: '/cadernos'})
                })
                .catch(showError)
        },
        signup() {
            axios.post(`${baseApiUrl}/signup`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.$toast.open({
                        message: 'Cadastro realizado com sucesso',
                        position: 'top-right',
                        type: 'info',
                        duration: 4000
                    })
                    this.user = {}
                    this.showSignup = false
                })
                .catch(showError)
        }
    }
}
</script>

<style>
    .auth-content {
        display: flex;
        justify-content: center;
    }

    .auth-modal {
        background-color: white;
        width: 350px;
        padding: 25px;
        border: solid 3px var(--main-color);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-family: var(--main-font);
        color: var(--main-color);
        font-size: 1.4rem;
        font-weight: 100;
        margin-bottom: 15px;
    }

    .auth-modal input {
        width: 100%;
        margin-bottom: 15px;
    }

    .auth-modal button {
        align-self: flex-end;
        padding: 5px 15px;
    }

    .auth-modal a {
        margin-top: 15px;
        font-size: 1.2rem;
        text-decoration: none;
        color: var(--main-color);
        font-family: var(--main-font);
    }

</style>