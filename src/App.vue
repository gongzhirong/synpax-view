<template>
  <div id="app">
    <div class="wrap" :style="{transform: `scale(${transformScale})`, height: `${bodyHeight}px`}">
      <!-- 公共头部 -->
      <div class="pack_top">
          <div class="top_logo">
              <b class="logo_line"></b>
              <img src="./assets/img/logo.png" class="logo_img">
              <b class="logo_line"></b>
          </div>
      </div>
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
