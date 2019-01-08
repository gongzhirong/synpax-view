<script>
export default {
  computed: {
    transformScale () {
      return this.$store.state.transformScale
    },
    bodyHeight () {
      return this.$store.state.bodyHeight
    }
  },
  methods: {
    scrollToTop () {
      window.scrollTo(0, 0)
    },
    resetScreenSzie () {
      this.$store.dispatch('resetScreenSzie')
      window.onresize = _ => {
        this.$store.dispatch('resetScreenSzie')
      }
    }
  },
  mounted () {
    if (this.transformScale) return
    this.resetScreenSzie()
  }
}
</script>