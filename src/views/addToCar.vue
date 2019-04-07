<template>
  <div class="addToCar">
    <PackageSteps />
    <div class="content">
      <div class="body">
        <AddCarItem />
        <AddCarItem />
        <AddCarItem />
        <div class="sendMessage">
          <div class="up">
            <div class="name">
              <label>姓名</label>
              <input type="text" placeholder="请输入姓名">
            </div>
            <div class="email">
              <label>邮箱</label>
              <input type="text" placeholder="请输入邮箱">
            </div>
            <div class="address">
              <label>公司地址</label>
              <input type="text" placeholder="请输入公司地址">
            </div>
          </div>
          <div class="bottom">
            <div class="phone">
              <label>电话</label>
              <input type="text" placeholder="请输入电话">
            </div>
            <div class="code">
              <label>验证码</label>
              <input type="text" placeholder="请输入姓名">
              <button class="updateCode">发送验证码</button>
            </div>
          </div>
          <div class="distributorBtn">
            <button class="distributor" @click="sendDistributor">发送至经销商</button>
          </div>
        </div>
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
  methods: {
    sendDistributor () {
        this.$router.push({path: '/finish'});
    }
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
      .sendMessage {
        position: relative;
        margin-bottom: 35px;
        width: 100%;
        color: #313538;
        background: linear-gradient(140deg, transparent 30px, #fff 0);
        padding: 60px 50px;
        .up {
          display: flex;
          width: 100%;
          margin-bottom: 50px;
          .name {
            margin-right: 50px;
          }
          .email {
            margin-right: 50px;
          }
        }
        .bottom {
          display: flex;
          width: 100%;
          justify-content: center;
          .phone {
            margin-right: 50px;
          }
          .code {
            .updateCode {
              margin-left: 10px;
              background: #fff;
              padding: 8px 20px;
              border: 1px solid #5f5f5f;
              border-radius: 5px;
            }
          }
        }
        .distributorBtn {
          padding: 50px 0 0 0;
          text-align: center;
          .distributor {
            cursor: pointer;
            display: inline-block;
            background-color: #279BB4;
            color: white;
            border-radius: 8px;
            padding: 12px 26px;
            border: none;
            font-size: 18px;
          }
        }
        label {
          margin-right: 20px;
        }
        input {
          border: none;
          border-bottom: 1px solid #000000;
        }
        input::placeholder {
          color: #ccc;
        }
      }
    }
  }
}
</style>
