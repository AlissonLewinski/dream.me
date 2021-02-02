import Vue from 'vue'
import App from './App.vue'

import './config/toast.js'
import router from './config/router.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
