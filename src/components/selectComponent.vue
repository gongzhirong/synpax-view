<template>
  <div class="selectComponent">
    <div class="currentSelectOption">{{current.label}}</div>
    <div class="buttonBox" @click="open = !open">
      <span class="triangle"></span>
    </div>
    <div v-show="open" class="selectList">
      <ul style="height: 300px; overflow: auto;">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'selectComponent',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: ''
  },
  data () {
    return {
      open: false,
      current: {}
    }
  },
  watch: {
    open (value) {
      if (value) {
        document.getElementsByClassName("bg")[0].addEventListener('click', this.close)
      } else {
        document.getElementsByClassName("bg")[0].removeEventListener('click', this.close)
      }
    }
  },
  methods: {
    testClick (data) {
      this.current = data
      this.$emit('change', data.value)
      this.open = false
    },
    close () {
      this.open = false
    }
  },
  created () {
    this.$on('selected', this.testClick)
  }
}
</script>
<style lang="less">
.selectComponent {
  padding-right: 60px;
  position: relative;
  .currentSelectOption {
    background-color: #E5E5E5;
    width: 100%;
    line-height: 65px;
    height: 65px;
    text-align: center;
  }

  .buttonBox {
    background-color: #E5E5E5;
    position: absolute;
    padding: 7px 13px 11px;
    top: 8px;
    right: 0px;
    cursor: pointer;

    .triangle {
      display: inline-block;
      height: 1px;
      width: 1px;
      border: 10px solid white;
      border-top-color: #E5E5E5;
      border-left-color: #E5E5E5;
      background-color: white;
      transform: rotate(45deg);
    }
  }

  .selectList {
    width: 100%;
    box-sizing: border-box;
    padding-right: 40px;
    position: absolute;
    z-index: 99;
    padding-right: 60px;
    box-sizing: border-box;

    li {
      background-color: #a0a0a0;
      line-height: 65px;
      text-align: center;
      cursor: default;
      &::hover {
        background-color: #E5E5E5;
      }
    }
  }
}
</style>