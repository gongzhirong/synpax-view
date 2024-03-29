<template>
  <div id="app">
    <div :style="{height: `${100*transformScale}px`, overflow: 'hidden'}">
      <div
        class="pack_top"
        :class="{'scroll_pack_top': isFixed}"
        :style="{transform: `scale(${transformScale})`}"
        v-show="true">
        <img src="./assets/img/logo.png" class="logo_img">
        <div class="header_nav">
          <nav>
            <li>
              <a @click="navScrollFn('home_banner')">{{ t('首页') }}</a>
            </li>
            <li>
              <a @click="navScrollFn('home_tabber')">{{ t('包装定制') }}</a>
            </li>
            <li>
              <a @click="navScrollFn('home_detail')">{{ t('产品案例') }}</a>
            </li>
            <li>
              <a @click="navScrollFn('home_about')">{{ t('关于我们') }}</a>
            </li>
          </nav>
          <nav class="login_language_box">
            <li>
              <el-dropdown @command="changeLang">
                <span class="el-dropdown-link">
                  {{ t('语言') }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="zh-cn">{{ t('中文')}}</el-dropdown-item>
                    <el-dropdown-item command="en">{{ t('英文') }}</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              
              <template v-if="isLogin">
                <el-avatar
                  class="headImg"
                  icon="el-icon-user-solid"
                  :src="userData.headimgurl || undefined"
                ></el-avatar>
                <a class="el-dropdown-link" @click="goPersonalCenter">{{userData.nickname || '...'}}</a>

                <el-popconfirm
                  title="是否确定退出的登录？"
                  @confirm="logout"
                >
                <template #reference>
                  <el-button type="text" icon="el-icon-switch-button" title="退出登录" style="font-size: 18px;"></el-button>
                  </template>
                </el-popconfirm>

                <el-badge :value="unreadMessageNum" class="messagesTips" type="danger" @click="goPersonalCenter">
                  <el-button type="text">{{ t('消息') }}</el-button>
                </el-badge>
              </template>
              <a v-else class="el-dropdown-link" @click="login">{{ t('登录') }}</a>
            </li>
          </nav>
        </div>
      </div>
    </div>
    
    <div class="wrap" :style="{transform: `scale(${transformScale})`, height: `${bodyHeight}px`}">
      <!-- 公共头部 -->
      <router-view :login="login"/>
    </div>

    <el-dialog
      title="微信登录"
      v-model="wxLogin.visiable"
      width="30%">
      <img style="width: 100%;" :src="wxLogin.imgUrl" alt="">
      <p style="text-align: center;">请使用微信扫描二维码关注</p>
    </el-dialog>
  </div>
</template>

<script lang="ts">
  import './assets/css/common.less'
  import transformScaleHook from './hooks/transformScaleHook'
  import { useI18n } from 'vue-i18n'
  import { computed, onMounted, onUnmounted, ref, defineComponent, reactive, watch, toRef, provide } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import {
    wxGetCodeimg,
    wxGetToken
  } from './api'
  export default defineComponent({
    name: 'App',
    setup() {
      const isFixed = ref(false) // 导航定位开关
      const {
        transformScale,
        bodyHeight
      } = transformScaleHook() // 缩放比例，比例计算后的高度
      const currentRoute = useRoute() // 获取当前路由信息
      const router = useRouter() // 获取路由实例
      const { t } = useI18n({useScope: 'global'})
      const store = useStore()
      const isLogin = computed(() => store.state.isLogin)
      const userData = computed(() => store.state.userInfo)
      const unreadMessageNum = computed(() => store.state.unreadMessageNum)
      const wxLogin = reactive({
        visiable: false,
        imgUrl: ''
      })

      // 非home首页要回到首页后再跳转
      function navScrollFn(className: string) {
        if (currentRoute.name !== 'home') {
          router.push({
            name: 'home'
          })
        }
        // 保证需要跳转页面的情况下，在跳转后再执行位置追踪
        setTimeout(() => {
          const tag = document.getElementsByClassName(className)[0] as HTMLElement
          const scrollValue = tag?.offsetTop || 0
          document.documentElement.scrollTop = +`${(scrollValue * transformScale.value) - 100}`
        }, 0)
      }

      // 切换语言
      function changeLang(lang: string) {
        // 修改 APP 当前语言
        router.push({
          name: currentRoute.name || '',
          params: {
            locale: lang
          }
        })
      }

      function isFixedComputed() {
        const top = document.getElementsByTagName('html')[0].scrollTop
        if (top >= 100) {
          isFixed.value = true
        } else {
          isFixed.value = false
        }
      }
      
      onMounted(() => {
        document.onscroll = isFixedComputed
      })

      onUnmounted(() => {
        document.onscroll = null
      })

      // 登录按钮事件
      // TODO 跳转登录界面进行登录操作
      const login =  async (cb?: Function) => {
        // store.dispatch('login')
        // 获取微信二维码以及临时门票
        try {
          const wxres = await wxGetCodeimg()
          wxLogin.visiable = true
          wxLogin.imgUrl = wxres.data.login_img_url;
          checkLogined(wxres.data.scene_id, cb)
          return true
        } catch(e) {}
      }
      const checkTime = ref<any>()
      const checkLogined = async (sceneId: string, cb?: Function) => {
        try {
          const params = {
            scene_id: sceneId
          }
          const wxres = await wxGetToken({ params })
          if (wxres.data.code === 0) {
            wxLogin.visiable = false
            window.localStorage.setItem('token', wxres.data.token);
            store.dispatch('checkLogin');
            cb && cb();
          }

          checkTime.value = setTimeout(checkLogined, 3000, sceneId, cb)
        }catch(e) {}
      }
      // 界面关闭后清楚计时任务
      watch(toRef(wxLogin, 'visiable'), (value: boolean) => {
        if (!value) {
          clearTimeout(checkTime.value)
        }
      })
      provide('login', login);

      // 退出登录
      const logout = async () => {
        // TODO 对接退出登录接口，以及完成相关逻辑
        console.log('退出登录')
      }
      
      function goPersonalCenter() {
        router.push({name: 'personalCenter'})
      }

      // 检查是否已登录，且获取信息
      store.dispatch('checkLogin')

      return {
        isFixed,
        navScrollFn,
        bodyHeight,
        transformScale,
        changeLang,
        login,
        isLogin,
        userData,
        goPersonalCenter,
        t,
        unreadMessageNum,
        wxLogin,
        logout
      }
    }
  })
</script>
<style lang="less">
  a:visited, a:link {
    color: #409EFF;
  }
  html, body {
    scroll-behavior: smooth;
  }
  .pack_top {
    transform-origin: left top;
    width: 1922px;
    height: 100px;
    background-color: #fff;
  }

  .logo_img {
    height: 40px;
    float: left;
    margin: 30px 50px;
  }

  .scroll_pack_top {
    box-shadow: 0px -6px 20px 0px #0b0507;
    // animation: 300ms ease-in-out 0s normal none 1 running fadeInDown;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    // height: 75px;
    z-index: 1;

    // .logo_img {
    //   height: 20px;
    // }

    // nav li a {
    //   height: 75px;
    //   line-height: 80px;
    //   font-size: 15px;
    // }
  }

  .header_nav {
    display: flex;
    justify-content: flex-end;
    padding: 0 18px;
  }

  nav {
    width: 640px;
    text-align: right;

    li {
      list-style: none;
      display: inline-block;
      margin: 0 18px;

      a {
        cursor: pointer;
        display: inline-block;
        height: 100px;
        line-height: 100px;
        font-size: 16px;
        color: #333;

        &:hover {
          color: #14b1bb;
        }
      }
    }
  }

  .login_language_box {
    width: auto;
    min-width: 238px;
    text-align: right;
    flex-shrink: 0;

    .headImg {
      vertical-align: sub;
      position: relative;
      top: 6px;
      margin-left: 12px;
    }
  }

  .el-dropdown-link {
    font-size: 15px;
    cursor: pointer;
    color: #409EFF;
    margin: 0 10px;
  }

  .el-icon-arrow-down {
    font-size: 15px;
  }

  .messagesTips {
    margin-left: 10px;
    vertical-align: unset !important;

    .el-badge__content.is-fixed {
      top: 10px;
      right: 10px;
    }

    button {
      font-size: 15px;  
    }
  }
</style>