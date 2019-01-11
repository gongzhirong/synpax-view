<template>
  <div class="selectType">
    <PackageSteps />
  </div>
</template>
<script>
import PackageSteps from '../components/packageSteps'
export default {
  data () {
    return {}
  },
  components: {
    PackageSteps
  },
  created () {
    this.$store.dispatch('changeSteps', 'selectType')
  }
}
</script>
<style lang="less">
.selectType {}
</style>
