<template>
  <div id="app">
    <Header></Header>
    <Content></Content>
  </div>
</template>

<script>
import Header from "./components/template/Header.vue";
import Content from "./components/template/Content.vue";

export default {
  name: "App",
  components: {
    Header,
    Content,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");

:root {
  --main-color: #8600b3;
  --main-font: "Lobster", cursive;
}

body {
  margin: 0;
}

.v-toast-text {
  font-size: 22px;
  font-family: var(--main-font);
}

input {
  border: solid 3px var(--main-color);
  padding: 10px;
  outline: none;
}

label {
  font-size: 18px;
  font-family: var(--main-font);
  color: var(--main-color);
}

.dm-btn {
  font-size: 18px;
  font-family: var(--main-font);
  color: var(--main-color);
  border: solid 3px var(--main-color);
  outline: none;
  background-color: unset;

  cursor: pointer;
  width: 100%;
  padding: 8px 0 8px 0;
  margin-bottom: 20px;
}
</style>
