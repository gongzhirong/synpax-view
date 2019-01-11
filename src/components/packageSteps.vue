<template>
  <div class="packageSet">
    <div class="header">
      <ul class="stepsBox">
        <li :class="{active: packageSetSteps === 'selectType'}">1.选择类型</li>
        <li>2.选择袋子</li>
        <li>3.配置袋子</li>
        <li>4.加入购物车</li>
        <li>5.完成包装配置</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'packageSet',
  data () {
    return {}
  },
  computed: {
    packageSetSteps () {
      return this.$store.state.packageSetSteps
    }
  }
}
</script>
<style lang="less">
  .packageSet {
    margin-top: 100px;
    padding-top: 80px;
    background-color: #EEEEEE;
    font-size: 20px;

    .stepsBox {
      background-color: #313639;
      color: #fff;
      width: 1400px;
      margin: 0 auto;

      li {
        padding: 30px;
        display: inline-block;
        position: relative;

        &.active {
          background-color: #289AB5;

          &::after {
            content: " ";
            position: absolute;
            left: 50%;
            bottom: -1px;
            border: 16px solid #fff;
            border-top-color: transparent;
            border-left-color: transparent;
            border-right-color: transparent;
            margin-left: -13px;
          }
        }
      }
    }
  }
</style>