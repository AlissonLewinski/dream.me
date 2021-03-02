<template>
    <div class="home">
        <h1>Bem vindo(a) ao <span>Dream.me</span></h1>
        <p>Aqui você pode salvar suas anotações sobre qualquer tema em diferentes cadernos :)</p>

        <img src="@/assets/notes.svg" alt="Notas">

        <div>
            <router-link :to="isLogged ? '/cadernos' : '/entrar'">
                <img src="@/assets/enter.svg" alt="">
            </router-link>
        </div>
    </div>
</template>

<script>
import { userKey } from '@/global'

export default {
    name: 'Home',
    computed: {
        isLogged() {
            const json = localStorage.getItem(userKey);

            return !!json
        }
    }
}
</script>

<style>
    .home {
        width: 100%;
        max-width: 700px;

        margin: 0 auto;
        padding: 5rem 0.5rem;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media(max-width: 1350px) {
        .home {
            padding: 2.5rem 0.5rem;
        }
    }

    .home h1 {
        color: var(--main-color);
        font-family: var(--main-font);
        font-size: 2.2rem;
        margin: 0;
    }

    .home h1 span {
        font-family: "Lobster", cursive;
        font-size: 2.6rem;
    }

    .home p {
        font-family: var(--main-font);
        color: var(--text);
    }

    .home > img {
        margin-top: 2rem;

        width: 24rem;
        height: 24rem;

        max-width: 100vw;
        max-height: 100vw;
    }

    .home > div {
        height: 3rem;
        align-self: flex-end;
    }

    .home > div img {
        width: 3rem;
        height: 3rem;
    }

</style>