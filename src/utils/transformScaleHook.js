import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

/**
 * transformScaleHook
 * @returns {
 *  transformScale: Computed 计算类型
 *  bodyHeight: Computed 计算类型
 * }
 */
export default function transformScaleHook() {
  const store = useStore();
  const transformScale = computed(() => store.state.transformScale);
  const bodyHeight = computed(() => store.state.bodyHeight);

  function resetScreenSzie() {
    store.dispatch('resetScreenSzie');
    window.onresize = _ => {
        store.dispatch('resetScreenSzie')
    }
  }

  onMounted(() => {
    if (transformScale.value) return
    setTimeout(_ => {
      resetScreenSzie()
    }, 100)
  })

  return {
    transformScale,
    bodyHeight
  }
}