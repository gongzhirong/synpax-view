<template>
  <div class="packageSet">
    <div class="header">
      <ul class="stepsBox">
        <li v-for="(name, type, index) in stepList" :class="{active: setSteps(type)}" :key="type">
          <span class="backHome" v-if="name==='返回首页'" @click="backHome">{{`${name}`}}<img src="../assets/img/backhome.png"></span>
          <span v-else>{{`${++index}.${name}`}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'packageSet',
  data () {
    return {
      stepList: {
        selectType: '选择类型',
        selectBag: '选择袋子',
        configureBags: '配置袋子',
        configureMembrane: '配置膜',
        addToCar: '加入购物车',
        finish: '完成包装配置',
        backHome: '返回首页',
      }
    }
  },
  computed: {
    packageSetSteps () {
      return this.$store.state.packageSetSteps
    }
  },
    created () {
      // console.log(name)
    },
  methods: {
    backHome() {
      this.$router.push({path: '/home'});
    },
    setSteps (type) {
      if (this.packageSetSteps === type) {
        return true
      } else {
        return false
      }
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
      li:last-child {
          cursor: pointer;
          float: right;
          .backHome {
            display: flex;
            align-items: center;
            img {
              margin-left: 5px;
            }
          }
        }
    }
  }
</style>