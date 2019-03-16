<template>
  <li @click="selected">{{label}}</li>
</template>
<script>
export default {
  props: {
    value: '',
    label: ''
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