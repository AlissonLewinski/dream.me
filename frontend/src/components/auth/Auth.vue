<template>
    <div class="auth-content">
        <div class="auth-modal">
            <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>

            <input v-model="user.username" class="dm-input" name="username" placeholder="Nome de usuário" type="text">
            <input v-model="user.password" class="dm-input" name="password" placeholder="Senha" type="password">
            <input v-if="showSignup" class="dm-input" v-model="user.confirmPassword" placeholder="Confirme a Senha" type="password">
        
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
            this.$store.commit("setLoading", true);
            axios.post(`${baseApiUrl}/signin`, this.user)
                .then(res => {
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$store.commit("setLoading", false);
                    this.$router.push({path: '/'})
                })
                .catch(err => {
                    showError(err)
                    this.$store.commit("setLoading", false);
                })
        },
        signup() {
            this.$store.commit("setLoading", true);
            axios.post(`${baseApiUrl}/signup`, this.user)
                .then(() => {
                    this.$store.commit("setLoading", false);
                    this.$toast.open({
                        message: 'Cadastro realizado com sucesso',
                        position: 'top-right',
                        type: 'info',
                        duration: 4000
                    })
                    this.user = {}
                    this.showSignup = false
                })
                .catch(err => {
                    showError(err)
                    this.$store.commit("setLoading", false);
                })
        }
    }
}
</script>

<style>
    .auth-content {
        display: flex;
        justify-content: center;
        align-items: center;

        height: 100%;

        padding: 0 0.5rem;
    }

    .auth-modal {
        background-color: white;

        width: 24rem;
        padding: 1.4rem;
        margin-bottom: 5rem;

        border: solid 2px var(--main-color);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-family: var(--main-font);
        color: var(--main-color);
        font-size: 1.4rem;
        font-weight: 600;

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
    
        text-decoration: none;
        
        font-size: 1.2rem;
        font-weight: 600;
        font-family: var(--main-font);
        color: var(--main-color);
    }

</style>