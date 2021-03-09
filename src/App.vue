<template>
  <div id="app">
    <div class="pack_top" :class="{'scroll_pack_top': isFixed}">
      <img src="./assets/img/logo.png" class="logo_img">
      <div class="header_nav">
        <nav>
          <li>
            <a @click="navScrollFn('home_banner')">{{ $t('首页') }}</a>
          </li>
          <li>
            <a @click="navScrollFn('home_tabber')">{{ $t('包装定制')}}</a>
          </li>
          <li>
            <a @click="navScrollFn('home_detail')">{{ $t('产品案例')}}</a>
          </li>
          <li>
            <a @click="navScrollFn('home_about')">{{ $t('关于我们')}}</a>
          </li>
        </nav>
        <nav class="login_language_box el-dropdown-link">
          <li>
            <el-dropdown @command="changeLang">
              <span class="el-dropdown-link">
                {{ $t('语言') }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="zh-cn">{{ $t('中文')}}</el-dropdown-item>
                  <el-dropdown-item command="en-us">{{ $t('英文') }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <a class="el-dropdown-link">{{ $t('登录') }}</a>
          </li>
        </nav>
      </div>
    </div>
    <div class="wrap" :style="{transform: `scale(${transformScale})`, height: `${bodyHeight}px`}">
      <!-- 公共头部 -->
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
  import './assets/css/common.less'
  import transformScaleHook from './utils/transformScaleHook'
  import {
    getCurrentInstance,
    onMounted,
    onUnmounted,
    ref
  } from 'vue'
  import {
    useRoute,
    useRouter
  } from 'vue-router'
  export default {
    name: 'App',
    setup() {
      const currentInstance: any = getCurrentInstance() // 获取当前组件实例
      const isFixed = ref(false) // 导航定位开关
      const {
        transformScale,
        bodyHeight
      } = transformScaleHook() // 缩放比例，比例计算后的高度
      const currentRoute = useRoute() // 获取当前路由信息
      const router = useRouter() // 获取路由实例

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
        // 记录已修改的语言模式
        window.localStorage.setItem('lang', lang)
        // 修改 APP 当前语言
        currentInstance.ctx.$i18n.locale = lang
      }

      function isFixedComputed() {
        const t = document.getElementsByTagName('html')[0].scrollTop
        if (t >= 100) {
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

      return {
        isFixed,
        navScrollFn,
        bodyHeight,
        transformScale,
        changeLang
      }
    }
  }
</script>
<style lang="less" scoped>
  .pack_top {
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
    animation: 300ms ease-in-out 0s normal none 1 running fadeInDown;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 75px;
    z-index: 1;

    .logo_img {
      height: 20px;
    }

    nav li a {
      height: 75px;
      line-height: 80px;
      font-size: 15px;
    }
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
    width: 220px;
    text-align: right;
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
</style>