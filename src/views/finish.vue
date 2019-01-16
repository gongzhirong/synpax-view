<template>
  <div class="finish">
    <PackageSteps />
    <div class="content">
      <div class="content_wrap">
        <p>您已完成您的包装</p>
        <p>我们已收到您的包装配置</p>
        <p>我们会尽快为您安排供应商进行报价</p>
      </div>
      <div class="footer">
        <p class="title">浏览器将在8秒后自动返回首页</p>
        <a>如无反应，请点这里</a>
      </div>
    </div>
  </div>
</template>
<script>
import PackageSteps from '../components/packageSteps.vue'
export default {
  data () {
    return {}
  },
  components: {
    PackageSteps
  },
  created () {
    this.$store.dispatch('changeSteps', 'finish')
  }
}
</script>
<style lang="less">
.finish {
  background-color: #F5F5F5;
  padding-bottom: 245px;

  .content {
    width: 1400px;
    margin: 16px auto 0;
    background-color: white;
    box-sizing: border-box;
    padding: 50px;
    background: linear-gradient(140deg, transparent 38px, #fff 0);
    text-align: center;

    .content_wrap {
      font-size: 26px;
    }

    .footer {
      margin-top: 60px;
      font-size: 18px;
      
      a {
        color: #7C8290;
      }
    }
  }
}
</style>