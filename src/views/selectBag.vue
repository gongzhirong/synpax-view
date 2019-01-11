<template>
  <div class="selectBag">
    <PackageSteps />
    <h1>选择包装</h1>
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
    this.$store.dispatch('changeSteps', 'selectBag')
  }
}
</script>
<style lang="less">
.selectBag {}
</style>
