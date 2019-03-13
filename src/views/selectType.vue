<template>
  <div class="selectType">
    <PackageSteps />
    <div class="content">
      <div class="header">
        <p class="text">开始我的包装</p>
        <div class="line"></div>
      </div>
      <div class="body">
        <div class="choseWrap">
          <img src="../assets/img/type_4.png">
          <p>包装袋</p>
          <p>PACKING BAG</p>
        </div>
        <div class="choseWrap picHandle">
          <img src="../assets/img/type_4.png">
          <p>包装膜</p>
          <p>PACKING BAG</p>
        </div>
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
    this.$store.dispatch('changeSteps', 'selectType')
  }
}
</script>
<style lang="less">
.selectType {
  .content {
    padding-top: 80px;
    padding-bottom: 250px;
    position: relative;
    background-color: #F5F5F5;

    .text {
      position: absolute;
      top: 60px;
      font-size: 26px;
      left: 50%;
      margin-left: -58px;
      font-weight: 600;
      padding: 0 20px;
      background-color: #f5f5f5;
    }

    .line {
      width: 1400px;
      height: 1px;
      margin: 0 auto;
      background-color: #aaa;
    }

    .body {
      width: 1400px;
      margin: 80px auto 0;
      display: flex;
      justify-content: space-around;

      .choseWrap {
        width: 386px;
        padding: 100px 20px 45px;
        border-radius: 50px;
        // background-color: #fff;
        font-size: 26px;
        text-align: center;
        cursor: pointer;
        background: linear-gradient(-45deg, transparent 15px, #fff 0);

        img {
          width: 414px;
        }
      }
    }
  }
}
</style>
