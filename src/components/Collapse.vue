<template>
  <div :class="`Collapse importCard importCard-${type} ${isShow ? 'active' : ''}`">
    <div class="importCardTitle" @click="isShow = !isShow">
      <span>{{title}}</span>
      <span class="arrow"></span>
    </div>
    <div class="importCardContent" v-show="isShow">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/**
 * @name Collapse折叠面板组件类型一
 * @prop title 标题Text
 * @prop type 风格类型 [ gray ]
 */
export default {
  name: 'Collapse',
  props: {
    title: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'default'
    }
  },
  data () {
    return {
      isShow: true
    }
  }
}
</script>
<style lang="less" scoped>
.importCard {
  margin: 36px 0;
  .importCardTitle {
    cursor: pointer;
    border-bottom: 1px solid #585858;
    font-size: 24px;
    padding: 10px 23px;

    .arrow {
      float: right;
      display: inline-block;
      width: 13px;
      height: 13px;
      margin-top: 10px;
      border-right: 3px solid;
      border-bottom: 3px solid;
      transform: rotate(-45deg);
      transition: all .5s;
    }
  }

  .importCardContent {
    padding: 26px 40px 0;
  }

  &.active {
    .arrow {
      transform: rotate(45deg);
    }
  }
}

.importCard-gray {
  background-color: #A0A0A0;
  color: #fff;

  .importCardTitle {
    border: 0;
  }

  .importCardContent {
    background-color: #EEEEEE;
  }
}
</style>
