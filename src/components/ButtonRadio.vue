<template>
  <div :class="`ButtonRadio selectBox selectBox-${type}`" ref="option">
    <slot></slot>
  </div>
</template>
<script>
/**
 * @name ButtonRadio按钮单选组件
 * @prop value 当前选中的值
 * @prop type 样式风格 empty
 * @prop row 一行最多显示多少行选项
 * @model 支持双向绑定当前选中的值
 */
export default {
  name: 'ButtonRadio',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: [String],
      default: null,
    },
    row: {
      type: [String, Number],
      default: 4
    },
    type: {
      type: String,
      default: 'default'
    }
  },
  data () {
    return {
    }
  },
  watch: {
    value (value) {
      this.setActived(value)
    }
  },
  methods: {
    // 设置option选中高亮
    setActived (value) {
      let optionList = this.$refs.option.children
      for (let i = 0; i < optionList.length; i++) {
        let dom = optionList[i]
        if (dom.getAttribute('data-value') === value) {
          dom.classList.add('active')
        } else {
          dom.classList.remove('active')
        }
      }
    },
    // 动态设置option宽度
    setWdith () {
      let optionList = this.$refs.option.children
      for (let i = 0; i < optionList.length; i++) {
        let dom = optionList[i]
        dom.style.width = `${93 / this.row}%`
      }
    },
    seleted (data) {
      this.$emit('change', data.value)
    }
  },
  mounted () {
    // 初始化默认值选中
    this.setActived(this.value)
    this.setWdith()
  },
  created () {
    // 监听option子组件时间触发选中操作
    this.$on('selected', this.seleted)
  }
}
</script>
<style lang="less" scoped>
.selectBox {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  .selectOtion {
    cursor: pointer;
    background-color: #E5E5E5;
    margin: 0 0 12px;
    line-height: 58px;
    text-align: center;
    &.active {
      background-color: #a0a0a0;
      color: white;
    }
  }
}

.selectBox-empty {
  .selectOtion {
    background-color: #fff;
    color: #000;
  }
}
</style>
