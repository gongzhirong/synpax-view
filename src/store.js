import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    transformScale: null,
    bodyHeight: 500,
    packageSetSteps: '' // 包装配置功能块步骤点
  },
  mutations: {
    screenSzie (state, size) {
      state.transformScale = size;
      state.bodyHeight = document.getElementsByClassName('wrap')[0].clientHeight * size;
    },
    changePackageSetSteps (state, value) {
      state.packageSetSteps = value;
    }
  },
  actions: {
    resetScreenSzie({ commit }) {
      let size = document.body.clientWidth / 1921;
      commit('screenSzie', size);
    },
    changeSteps ({commit}, value) {
      commit('changePackageSetSteps', value);
    }
  }
})
