import Vue from 'vue'
import App from './App.vue'
// import './assets/scss/main.scss'
import vuetify from './plugins/vuetify'
import isSelect from '@/components/isSelect';
import isCheckbox from '@/components/isCheckbox';

Vue.component('is-select', isSelect)
Vue.component('is-checkbox', isCheckbox)

Vue.config.productionTip = false
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
