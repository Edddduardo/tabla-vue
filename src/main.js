import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import table from './components/table.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

new Vue({
  render: h => h(table),
}).$mount('#table')

