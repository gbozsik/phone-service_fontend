import Vue from 'vue'
import App from './App.vue'


// eslint-disable-next-line
import _ from 'lodash'
import Axios from 'axios'

Axios.defaults.baseURL = '/api/v1'
Axios.defaults.headers.common.Accept = 'application/json'
Axios.defaults.auth =  {
  username: 'heyman',
  password: 'bab'
}

Vue.$http = Axios
Object.defineProperty(Vue.prototype, '$http', {
    get() {
        return Axios;
    }
})

import store from './store'
import VuexRouterSync from 'vuex-router-sync'
import router from '@/routes/core'

VuexRouterSync.sync(store, router)

Vue.config.productionTip = false

import Vuetify from 'vuetify'
Vue.use(Vuetify)
import '@/assets/stylus/app.styl' 

// Startup store actions
store.dispatch('account/startup');
store.dispatch('partner/startup');


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
