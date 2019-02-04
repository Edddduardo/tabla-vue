import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import router from './Router/router.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)

Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

