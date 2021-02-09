<template>
  <div id="app">
    <div class="pack_top">
      <img src="./assets/img/logo.png" class="logo_img">
      <a href="#home_detail">home_detail</a>
    </div>
    <div class="wrap" :style="{transform: `scale(${transformScale})`, height: `${bodyHeight}px`}">
      <!-- 公共头部 -->
      <router-view/>
    </div>
  </div>
</template>
<script>
import transformScale from './public/transformScaleMixin'
import './assets/css/common.less'
export default {
  mixins: [transformScale]
}
</script>

<style lang="less">
</style>
