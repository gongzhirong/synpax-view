<template>
  <div class="selectBag">
    <PackageSteps />
    <div class="content">
      <div class="body">
        <div class="choseWrap">
          <img src="../assets/img/type_4.png">
          <div class="descBox">
            <p>三边封</p>
            <p>ORGAN BAG</p>
            <p class="desc_title">袋形描述</p>
          </div>
          <p class="desc_content">SYNPAX由拥有30年行业经验的资深专家研发E-PACKAGING致力于简化定制包装流程。</p>
        </div>
        <div class="choseWrap">
          <img src="../assets/img/type_4.png">
          <div class="descBox">
            <p>三边封</p>
            <p>ORGAN BAG</p>
            <p class="desc_title">袋形描述</p>
          </div>
          <p class="desc_content">SYNPAX由拥有30年行业经验的资深专家研发E-PACKAGING致力于简化定制包装流程。</p>
        </div>
        <div class="choseWrap">
          <img src="../assets/img/type_4.png">
          <div class="descBox">
            <p>三边封</p>
            <p>ORGAN BAG</p>
            <p class="desc_title">袋形描述</p>
          </div>
          <p class="desc_content">SYNPAX由拥有30年行业经验的资深专家研发E-PACKAGING致力于简化定制包装流程。</p>
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
    this.$store.dispatch('changeSteps', 'selectBag')
  }
}
</script>
<style lang="less">
.selectBag {
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

      .choseWrap {
        width: 600px;
        padding: 100px 20px 45px;
        margin-bottom: 40px;
        background-color: #fff;
        font-size: 26px;
        text-align: center;
        cursor: pointer;
        background: linear-gradient(140deg, transparent 38px, #fff 0);

        img {
          width: 414px;
        }

        .descBox {
          text-align: left;
          margin: 0 30px;
          padding: 0 0 12px;
          border-bottom: 1px solid #707070;
          position: relative;

          .desc_title {
            display: inline-block;
            padding: 0 8px 12px 20px;
            border-bottom: 5px solid #060606;
            position: absolute;
            top: 37px;
            right: 0;
          }
        }

        .desc_content {
          text-align: left;
          margin: 12px 30px;
          font-size: 20px;
          line-height: 22px;
          color: #5A5D5F;
        }
      }
    }
  }
}
</style>
