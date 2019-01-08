<template>
  <div class="home">
    <div class="wrap" :style="{transform: `scale(${transformScale})`, height: `${bodyHeight}px`}">
    <!-- 公共头部 -->
      <div class="pack_top">
          <div class="top_logo">
              <b class="logo_line"></b>
              <img src="../assets/img/logo.png" class="logo_img">
              <b class="logo_line"></b>
          </div>
      </div>
      <!-- 每页代码 -->
      <div class="pack_container">
          <!-- codeing -->
          <div class="home_banner">
              <div class="banner_wrap swiper-wrapper">
                  <div class="banner_slider swiper-slide"><img src="../assets/img/banner_pic_1.png" class="banner_pic"></div>
                  <div class="banner_slider swiper-slide"><img src="../assets/img/banner_pic_1.png" class="banner_pic"></div>
              </div>
              <div class="banner_page">
                  <div class="banner_icon"></div>
                  <div class="banner_icon"></div>
              </div>
          </div>
          <div class="home_tabber">
              <div class="home_title">
                  <div class="title_line"></div>
                  <div class="title_text">包装配置器</div>
                  <div class="title_line"></div>
              </div>
              <p class="home_text">通过简单的操作选出最适合你的包装产品</p>
              <div class="tabber_content">
              </div>
          </div>
          <div class="home_detail">
              <div class="home_title">
                  <div class="title_line"></div>
                  <div class="title_text">包装设计展示</div>
                  <div class="title_line"></div>
              </div>
              <p class="home_text">FAILURE IS PROBABLY THE FORTIFICATION IN YOUR POLE. IT IS LIKE A PEEK YOUR WALLET AS
                  THE THIEF, <br>WHEN YOU ARE THINKING HOW TO SPEND SEVERAL HARD-</p>
              <div class="detail_wrap">
              </div>
          </div>
      </div>
      <!-- 公共底部 -->
      <div class="pack_footer">
          <div class="footer_contact">
              <div class="contact_wrap contact_name">
                  <p class="contact_left">您的姓名</p>
                  <input type="text" class="contact_right">
              </div>
              <div class="contact_wrap contact_tel">
                  <p class="contact_left">联系电话</p>
                  <input type="text" class="contact_right">
              </div>
              <div class="contact_wrap contact_txt">
                  <p class="contact_left">留言</p>
                  <textarea cols="30" rows="10" class="contact_right contact_textarea"></textarea>
              </div>
          </div>
          <div class="footer_arrow" @click="scrollToTop"></div>
      </div>
  </div>
</div>
</template>

<script>
import '../assets/css/common.less'
import '../assets/css/home.less'
import transformScale from '../public/transformScaleMixin'
export default {
  name: 'home',
  mixins: [transformScale]
}
</script>
<style>
</style>
