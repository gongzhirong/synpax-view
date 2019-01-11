<template>
  <div class="addToCar">
    <PackageSteps />
    <h1>加入购物车</h1>
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
    this.$store.dispatch('changeSteps', 'addToCar')
  }
}
</script>
<style lang="less">
.addToCar {}
</style>
