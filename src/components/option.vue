<template>
  <li @click="selected">{{label}}</li>
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
      this.$parent.$emit('selected', {value: this.value, label: this.label})
    }
  }
}
</script>