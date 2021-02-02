<template>
  <div id="app">
    <Header></Header>
    <Content></Content>
  </div>
</template>

<script>
import Header from './components/template/Header.vue'
import Content from './components/template/Content.vue'

export default {
  name: "App",
  components: {
    Header, Content
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

:root {
	--main-color: #8600B3;
  --main-font: 'Lobster', cursive;
}

body {
	margin: 0;
}

.v-toast-text {
  font-size: 22px;
  font-family: var(--main-font);
}

</style>
