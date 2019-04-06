<template>
  <div class="addToCar">
    <PackageSteps />
    <div class="content">
      <div class="body">
        <AddCarItem />
        <AddCarItem />
        <AddCarItem />
      </div>
    </div>
  </div>
</template>
<script>
import PackageSteps from '../components/packageSteps.vue'
import AddCarItem from '../components/addCarItem.vue'
export default {
  data () {
    return {}
  },
  components: {
    PackageSteps,
    AddCarItem
  },
  created () {
    this.$store.dispatch('changeSteps', 'addToCar')
  }
}
</script>
<style lang="less">
.addToCar {
  font-size: 24px;
  .content {
    background-color: #F5F5F5;

    .body {
      width: 1400px;
      box-sizing: border-box;
      padding: 40px 46px 40px;
      background-color: #F9F9F9;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
}
</style>
