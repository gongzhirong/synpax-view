<template>
  <div class="configureBags">
    <PackageSteps />
    <h1>配置袋子</h1>
    <md-table></md-table>
  </div>
</template>
<script>
import PackageSteps from '../components/packageSteps.vue'
export default {
  name: 'configureBags',
  data () {
    return {}
  },
  components: {
    PackageSteps
  },
  created () {
    this.$store.dispatch('changeSteps', 'configureBags')
  }
}
</script>
<style lang="less">
.configureBags {}
</style>
