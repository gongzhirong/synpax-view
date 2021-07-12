import { createStore } from 'vuex'
import {
  login,
  getUserinfo,
  getUnreadNum
} from './api'

const store = createStore({
  state: {
    isLogin: false,
    userInfo: {
      token: ''
    },
    unreadMessageNum: 0,
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
    },
    setUnreadMessageNum (state, num) {
      state.unreadMessageNum = num
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
    async login ({ commit, dispatch }) {
      try {
        const data = {
          data: '283203806@qq.com',
          type: 1,
          password: '958D51602BBFBD18B2A084BA848A827C29952BFEF170C936419B0922994C0589'
        }
        const res = await login({ data })
        if (res.data.code === 0) {
          commit('loginSuccess', res.data.result)
          dispatch('getUnreadNum')
        }
      } catch(e) {}
    },

    // 检查本地缓存 token，并检查是否有效
    async checkLogin ({ commit, dispatch }) {
      const token = window.localStorage.getItem('token')
      if (!token) {
        return
      }
      try {
        const params = {
          token
        }
        const res = await getUserinfo({ params })
        if (res.data.code === 0) {
          res.data.result.token = token
          commit('loginSuccess', res.data.result)
          dispatch('getUnreadNum')
        }
      } catch(e) {}
    },

    // 获取未读消息数量
    async getUnreadNum({ commit, state }) {
      try {
        const params = {
          token: state.userInfo?.token
        }
        const res = await getUnreadNum({ params })
        if (res.data.code === 0) {
          commit('setUnreadMessageNum', res.data.result || 0)
        }
      } catch(e) {}
    },

    // 阅读一个消息
    readOneMessage({ dispatch }) {
      dispatch('getUnreadNum')
    }
  }
})

export default store