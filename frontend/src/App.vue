<template>
  <div id="app">
    <Header></Header>
  </div>
</template>

<script>
import Header from "./components/template/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

:root {
	--main-color: #8600B3
}

body {
	margin: 0;
}

</style>
