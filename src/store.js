import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    transformScale: null,
    bodyHeight: 500
  },
  mutations: {
    screenSzie (state, size) {
      state.transformScale = size
      state.bodyHeight = document.getElementsByClassName('wrap')[0].clientHeight * size
    }
  },
  actions: {
    resetScreenSzie ({commit}, value) {
      let size = document.body.clientWidth / 1920
      commit('screenSzie', size)
    }
  }
})
