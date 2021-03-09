/**
 * @description 自定义 Hook 视图比例缩放
 * @author gongzhirong
 * @since 2021/03/09
*/
import { useStore } from 'vuex'
import { computed, ComputedRef, onMounted } from 'vue'

interface Returns {
  transformScale: ComputedRef<number>,
  bodyHeight: ComputedRef<number>
}

/**
 * transformScaleHook
 * @return {
 *  transformScale: ComputedRef<number>
 *  bodyHeight: ComputedRef<number>
 * }
 */
export default function transformScaleHook(): Returns {
  const store = useStore()

  const transformScale = computed<number>(() => store.state.transformScale)
  const bodyHeight = computed<number>(() => store.state.bodyHeight)

  // 初始化比例
  function resetScreenSzie() {
    store.dispatch('resetScreenSzie')
    window.onresize = () => {
        store.dispatch('resetScreenSzie')
    }
  }

  // 取消监听比例
  onMounted(() => {
    if (transformScale.value) return
    setTimeout(() => {
      resetScreenSzie()
    }, 100)
  })

  return {
    transformScale,
    bodyHeight
  }
}