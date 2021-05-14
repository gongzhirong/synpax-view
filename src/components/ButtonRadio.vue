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
  props: {
    modelValue: {
      type: Array,
      default () {
        return []
      },
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
    modelValue (value) {
      this.setActived(value)
    }
  },
  methods: {
    // 设置option选中高亮
    setActived (value) {
      const currentData = JSON.parse(JSON.stringify(value))
      let optionList = this.$refs.option.children
      for (let i = 0; i < optionList.length; i++) {
        let dom = optionList[i]
        if (currentData.includes(dom.getAttribute('data-value'))) {
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

      // 解决flex布局不够一行钟健空白问题
      let count = optionList.length % this.row
      if (count !== 0) {
        const temp = document.createDocumentFragment()
        for (let i = 0; i < (this.row - count); i++) {
          const emptyLi = document.createElement('li')
          emptyLi.style.listStyle = 'none'
          emptyLi.style.width = `${93 / this.row}%`
          temp.appendChild(emptyLi)
        }
        this.$refs.option.appendChild(temp)
      }
    },
    selected (data) {
      const result = JSON.parse(JSON.stringify(this.modelValue))
      if (result.indexOf(data.value) > -1) {
        result.splice(result.indexOf(data.value), 1)
      } else {
        if (this.$refs.option.querySelector('li.active')) {
          let index = result.indexOf(this.$refs.option.querySelector('li.active').getAttribute('data-value'))
          result.splice(index, 1)
        }
        result.push(data.value)
      }
      this.$emit('update:modelValue', result)
    }
  },
  mounted () {
    // 初始化默认值选中
    this.setActived(this.modelValue)
    this.setWdith()
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
