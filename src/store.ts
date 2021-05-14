import { createStore } from 'vuex'
import {
  login,
  getUserinfo
} from './api'

const store = createStore({
  state: {
    isLogin: false,
    userInfo: {},
    transformScale: null,
    bodyHeight: 500,
    packageSetSteps: '' // 包装配置功能块步骤点
  },
  mutations: {
    screenSzie (state, size) {
      state.transformScale = size;
      state.bodyHeight = document.getElementsByClassName('wrap')[0]?.clientHeight * size;
    },
    changePackageSetSteps (state, value) {
      state.packageSetSteps = value;
    },
    loginSuccess (state, user) {
      state.isLogin = true;
      state.userInfo = user;
      window.localStorage.setItem('token', user.token)
    }
  },
  actions: {
    // 设置界面缩放比例
    resetScreenSzie ({ commit }) {
      let size = document.body.clientWidth / 1921;
      commit('screenSzie', size);
    },

    changeSteps ({commit}, value) {
      commit('changePackageSetSteps', value);
    },

    // 登录
    async login ({ commit }) {
      try {
        const data = {
          data: '283203806@qq.com',
          type: 1,
          password: '958D51602BBFBD18B2A084BA848A827C29952BFEF170C936419B0922994C0589'
        }
        const res = await login({ data })
        if (res.data.code === 0) {
          commit('loginSuccess', res.data.result)
        }
      } catch(e) {}
    },
    // 检查本地缓存 token，并检查是否有效
    async checkLogin ({ commit }) {
      const token = window.localStorage.getItem('token')
      if (!token) {
        return
      }
      try {
        const params = {
          token
        }
        console.log(params)
        const res = await getUserinfo({ params })
        if (res.data.code === 0) {
          res.data.result.token = token
          commit('loginSuccess', res.data.result)
        }
      } catch(e) {}
    }
  }
})

export default store