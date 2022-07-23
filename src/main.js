import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import "@/plugins/vee-validate";
import "@/plugins/axios";

import Loading from "@/components/Loading";

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.component("Loading", Loading);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
