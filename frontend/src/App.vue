<template>
  <div id="app">
    <Header :hideUserDropdown="!user"></Header>
    <Loading v-show="loading"></Loading>
    <Content v-show="!loading" v-if="!isValidating"></Content>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, userKey } from "@/global.js";
import { mapState } from "vuex";
import Header from "./components/template/Header.vue";
import Content from "./components/template/Content.vue";
import Loading from "./components/template/Loading";

export default {
  name: "App",
  components: { Header, Content, Loading },
  computed: mapState(["user", "loading"]),
  data: function () {
    return {
      isValidating: true,
    };
  },
  methods: {
    async validateToken() {
        this.isValidating = true;
        this.$store.commit("setLoading", true);

        const json = localStorage.getItem(userKey);
        const userData = JSON.parse(json);
        this.$store.commit("setUser", null);

        if (!userData) {
            this.$store.commit("setLoading", false);
            this.isValidating = false;
            return;
        }

        const res = await axios.post(`${baseApiUrl}/validateToken `, userData);

        if (res.data) {
            this.$store.commit("setUser", userData);
        } else {
            localStorage.removeItem(userKey);
        }

        this.isValidating = false;
        this.$store.commit("setLoading", false);
    },
  },
  created() {
    this.validateToken();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

:root {
  /*--main-color: #8600b3;*/
  --main-color: #a70505;
  --main-font: "Lobster", cursive;
  --secondary-font: "Open Sans", sans-serif;
}

body {
    margin: 0;
}

#app {
    height: 100vh;
}

.v-toast-text {
    font-size: 22px;
    font-family: var(--main-font);
}

input {
    box-sizing: border-box;
    border: solid 3px var(--main-color);
    border-radius: 10px;
    padding: 10px;
    outline: none;
}

label {
    font-size: 18px;
    font-family: var(--main-font);
    color: var(--main-color);
}

a {
    text-decoration: none;
}

.dm-btn {
    font-size: 18px;
    font-family: var(--main-font);
    color: white;
    border: none;

    border-radius: 8px;
    outline: none;
    background-color: var(--main-color);

    cursor: pointer;
    padding: 8px 4px 8px 4px;
}

.dm-btn:hover {
  padding: 10px 6px 10px 6px;
}

.modal-close-button {
    position: absolute;
    right: 20px;
    top: 20px;

    cursor: pointer;
    background-color: unset;
    border: none;
    outline: none;
    padding: 0;
}

.ql-toolbar {
    border: solid 3px var(--main-color) !important;
}

.ql-container {
    border-right: solid 3px var(--main-color) !important;
    border-left: solid 3px var(--main-color) !important;
    border-bottom: solid 3px var(--main-color) !important;
    overflow: hidden;
}
</style>
