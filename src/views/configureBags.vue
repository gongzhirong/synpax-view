<template>
  <div class="configureBags">
    <PackageSteps />
    <div class="bg">
      <div class="content">
        <div class="leftPart">
          <p>三边封立体袋</p>
          <p>THREE SIDE BOTTOM BAGS</p>
          <div class="imgBox">
            <img src="../assets/img/type_4.png">
          </div>
          <div class="descBox">
            <p class="title">
              袋形描述
            </p>
            <p>XXXXXXXXXXXXXXXXXXXXXXX</p>
          </div>
          <div class="selectImg">
            <ul>
              <li>
                <img src="../assets/img/type_4.png">
              </li>
              <li>
                <img src="../assets/img/type_4.png">
              </li>
              <li>
                <img src="../assets/img/type_4.png">
              </li>
              <li>
                <img src="../assets/img/type_4.png">
              </li>
            </ul>
          </div>
        </div>
        <div class="rightPart">
          <div class="overviewTitle">
            <img class="imgList" src="../assets/img/list.png">
            <p class="text">
              <span>概览</span>
            </p>
          </div>
          <div class="selectType">
            <p class="selected">内包装</p>
            <p>外包装</p>
          </div>
          <div class="rightPartContent">
            <div class="rightPartTitle">
              <span>属性</span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
.configureBags {
  .bg {
    background-color: #F5F5F5;
    padding-top: 22px;
  }
  .content {
    font-size: 20px;
    background-color: white;
    background: linear-gradient(140deg, transparent 38px, #fff 0);
    width: 1400px;
    margin: auto;
    display: flex;
    padding: 40px 50px;
    box-sizing: border-box;
    .leftPart {
      margin-top: 15px;
      flex: 1;
      .imgBox {
        margin: 50px 10px;
      }
      .descBox {
        .title {
          font-weight: bold;
          height: 50px;
          border-bottom: 1px solid #5d5b5b;
        }
      }
      .selectImg {
        margin-top: 50px;
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

      .overviewTitle {
        background-color: #A0A0A0;
        height: 50px;
        color: #F9F9F9;
        line-height: 50px;
        padding: 14px 0;

        .imgList {
          width: 30px;
          float: left;
          margin-left: 55px;
          padding-top: 6px;
        }

        .text {
          margin-left: 110px;
          padding-left: 24px;
          border-left: 1px solid;
        }
      }

      .selectType {
        text-align: center;
        margin: 64px 0;
        p {
          display: inline-block;
          width: 150px;
          line-height: 54px;
          border: 1px solid #c8c8c8;
          text-align: center;
          margin: 0 12px;
          cursor: default;

          &.selected {
            background-color: #a0a0a0;
            color: white;
          }
        }
      }

      .rightPartContent {
        padding: 0 10px;

        .rightPartTitle {
          background-color: #a0a0a0;
          padding: 13px 42px;
          color: white;
        }
      }
    }
  }
}
</style>
