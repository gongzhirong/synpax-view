<template>
  <div class="finish">
    <PackageSteps />
    <div class="content">
      <div class="wrap">
        <p>您已完成您的包装</p>
        <p>我们已收到您的包装配置</p>
        <p>我们会尽快为您安排供应商进行报价</p>
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
  .content {
    width: 1400px;
    margin: 12px auto 0;
    background-color: white;
    padding: 50px;
  }
}
</style>