<template>
  <li class="selectOtion" @click="selected" :data-value="value">{{label}}</li>
</template>
<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default () {
        return ''
      }
    },
    label: {
      type: [Number, String],
      default () {
        return ''
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    selected () {
      this.$parent.selected({value: this.value, label: this.label})
    }
  }
}
</script>
<style lang="less" scoped>
li { list-style: none; }
</style>
