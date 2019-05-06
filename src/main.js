import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$Message = (param) => {
  let option = {
    content: '',
    time: 3000
  }
  let paramType = typeof param
  if (paramType === 'object' && param !== null) {
    option = Object.assign(option, param)
  } else {
    option.content = param
  }
  let alertElement = document.createElement('div')
  alertElement.id = 'message'
  alertElement.style = 'position: fixed;top: 20px;width: 200px;color: #fffdfd;display: block;background: rgba(218, 23, 23, 0.54);padding: 8px 18px;left: 50%;margin-left: -100px;border-radius: 8px;'
  let alertElementContent = document.createElement('div')
  alertElementContent.innerHTML = option.content || '测试toast样式'
  alertElementContent.className = 'messageContent'
  alertElement.appendChild(alertElementContent)
  document.getElementsByTagName('body')[0].appendChild(alertElement)
  setTimeout(function () {
    alertElement.remove()
    alertElement = null
  }, option.time)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
