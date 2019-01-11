<template>
  <div class="home">
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
</template>

<script>
export default {
  name: 'home',
  methods: {
    scrollToTop () {
      window.scrollTo(0, 0)
    }
  }
}
</script>
<style lang="less">
.home {
  .home_banner {
    width: 100%;
    height: 744px;
    padding-bottom: 90px;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }

  .banner_wrap {
      position: relative;
      width: 100%;
      height: 100%;
      display: -webkit-flex;
      display: -moz-flex;
      display: -ms-flex;
      display: -o-flex;
      display: flex;
  }

  .banner_slider {
      display: -webkit-flex;
      display: -moz-flex;
      display: -ms-flex;
      display: -o-flex;
      display: flex;
      flex-shrink: 0;
      position: relative;
  }

  .banner_pic {
      width: 1920px;
      height: 744px;
  }

  .banner_slider:after {
      display: block;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      height: 90px;
      background: url(../assets/img/shadow.png) no-repeat center center;
      background-size: 100% 100%;
      content: ' ';
  }

  .banner_page {
      width: 100%;
      height: 16px;
      position: absolute;
      bottom: 28px;
      left: 0;
      z-index: 2;
      text-align: center;
  }

  .banner_page span {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #e5e5e5;
      display: inline-block;
      margin: 0 18px;
      cursor: pointer;
  }

  .banner_page .swiper-pagination-bullet-active {
      background-color: #000;
  }

  .home_title {
      width: 1640px;
      height: 108px;
      position: relative;
      margin: 0 auto;
  }

  .title_line {
      width: 600px;
      height: 1px;
      margin-top: 105px;
      background-color: #aaa;
      float: left;
  }

  .title_text {
      width: 440px;
      height: 155px;
      line-height: 203px;
      font-size: 58px;
      color: #040000;
      text-align: center;
      z-index: 2;
      float: left;
  }

  .home_text {
      width: 1640px;
      clear: left;
      margin: 9px auto 0;
      line-height: 34px;
      font-size: 26px;
      color: #838282;
      text-align: center;
  }

  .home_tabber {
      width: 100%;
      position: relative;
      overflow: hidden;
  }

  .tabber_content {
      width: 1210px;
      overflow: hidden;
      margin: 30px auto 0;
  }

  .home_shower {
      width: 1640px;
      margin: 0 auto;
      overflow: hidden;
      position: relative;
  }

  .home_detail {
      width: 1640px;
      margin: 0 auto 110px;
      overflow: hidden;
      position: relative;
  }

  .home_yun .search_bar {
      text-align: center;
      margin-bottom: 75px;
  }

  .home_yun .search_bar .classify {
      width: 150px;
      line-height: 65px;
      color: #7e7e7e;
      font-size: 32px;
      background: #f7f7f7 url("../assets/img/classify.jpg") no-repeat 103px center;
      border: 1px solid #d8d8d8;
      border-radius: 36px;
      box-shadow: 0 1px 3px #a3a3a3;
      margin-right: 15px;
      padding-left: 28px;
      text-align: left;
  }

  .home_yun .search_bar .search_input {
      width: 820px;
      padding-left: 25px;
      line-height: 75px;
      box-shadow: 0 -1px 1px #a3a3a3;
      border: 1px solid #d8d8d8;
      border-radius: 36px;
      background: #f3f3f3;
      font-size: 32px;
  }

  .home_yun .search_bar .search_btn {
      width: 60px;
      height: 60px;
      box-shadow: 0 1px 3px #a3a3a3;
      border: 1px solid #d8d8d8;
      border-radius: 50%;
      background: #f6f6f6 url("../assets/img/searchBtn.jpg") no-repeat center center;
      position: relative;
      right: 76px;
      top: 16px;
  }
}

</style>
