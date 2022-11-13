import Vue from 'vue'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'

import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './lang'

import '@/icons/components'
import '@/permission'

import '@/styles/element-variables.scss'
import '@/styles/index.scss'

Vue.use(ElementUI, {
  i18n: (key: string, value: string) => i18n.t(key, value)
})
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
