<template>
  <div class="addToCar">
    <PackageSteps />
    <div class="content">
      <div class="body">
        <div class="productDetail">
          <div class="leftPart">
            <div class="detailTitle">
              <span class="arrow" ></span>
              详情
            </div>
            <div class="imgBox">
              <img src="../assets/img/type_4.png">
            </div>
            <div class="descBox">
              <p class="title">
                袋形描述
              </p>
              <p style="font-size: 18px;">XXXXXXXXXXXXXXXXXXXXXXX</p>
            </div>
          </div>
          <div class="rightPart">
          </div>
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
    this.$store.dispatch('changeSteps', 'addToCar')
  }
}
</script>
<style lang="less">
.addToCar {
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

    .productDetail {
      width: 100%;
      background: linear-gradient(140deg, transparent 30px, #fff 0);
      padding: 60px 50px;
      display: flex;
      .leftPart {
        margin-top: 15px;
        flex: 1;
        padding-right: 140px;

        .detailTitle {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 70px;
        }
        .imgBox {
          margin: auto;
          width: 370px;
          img {
            width: 100%;
          }
        }
        .descBox {
          .title {
            font-weight: bold;
            height: 50px;
            font-size: 24px;
            border-bottom: 1px solid #5d5b5b;
          }
        }
        .selectImg {
          margin-top: 95px;
          li {
            display: inline-block;
            width: 20%;
            margin-right: 10px;
            img {
              width: 100%;
            }
          }
        }
      }
      .rightPart {
        flex: 1;
      }
    }
  }

  .arrow {
    vertical-align: sub;
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 16px;
    border-right: 3px solid;
    border-bottom: 3px solid;
    transform: rotate(-135deg);
    transition: all .5s;
  }
}
</style>
