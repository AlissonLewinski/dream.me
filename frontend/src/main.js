import Vue from 'vue'
import App from './App.vue'

import 'loaders.css/loaders.min.css'
import './config/toast.js'
import './config/modal.js'
import store from './config/store.js'
import router from './config/router.js'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
