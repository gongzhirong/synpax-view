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
            <a @click="navScrollFn('home_tabber')">包装定制</a>
          </li>
          <li>
            <a @click="navScrollFn('home_detail')">产品案例</a>
          </li>
          <li>
            <a @click="navScrollFn('home_about')">关于我们</a>
          </li>
        </nav>
        <nav class="login_language_box el-dropdown-link">
          <li>
            <el-dropdown @command="changeLang">
              <span class="el-dropdown-link">
                语言<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="zh-cn">中文</el-dropdown-item>
                  <el-dropdown-item command="en-us">英文</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span> / </span>
            <a class="el-dropdown-link">登录</a>
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

<script>
  import './assets/css/common.less'
  import { useStore } from 'vuex'
  import transformScaleHook from './utils/transformScaleHook'
  import {
    getCurrentInstance,
    onMounted,
    onUnmounted,
    ref
  } from 'vue'
  export default {
    name: 'App',
    setup() {
      const currentInstance = getCurrentInstance();
      const isFixed = ref(false);
      const {transformScale, bodyHeight} = transformScaleHook();

      function navScrollFn(className) {
        const scrollValue = document.getElementsByClassName(className)[0]?.offsetTop || 0
        document.documentElement.scrollTop = `${(scrollValue * transformScale.value) - 100}`
      }

      // 切换语言
      function changeLang(lang) {
        window.localStorage.setItem('lang', lang)
        currentInstance.proxy.$i18n.locale = lang
      }

      function isFixedComputed() {
        const t = document.getElementsByTagName('html')[0].scrollTop;
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
  .pack_top{
    height: 100px;
    background-color: #fff;
  }
  
  .logo_img{
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
    width: 200px;
    text-align: right;
  }

  .el-dropdown-link {
    font-size: 15px;
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 15px;
  }
</style>