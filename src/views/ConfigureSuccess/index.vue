<template>
  <div class="finish">
    <div class="content">
      <div class="content_wrap">
        <p>{{ t('您已完成您的包装') }}</p>
        <p>{{ t('我们已收到您的包装配置') }}</p>
        <p>{{ t('我们会尽快为您安排供应商进行报价') }}</p>
      </div>
      <div class="footer">
        <p class="title">
          <span v-html="t('浏览器将在X秒后自动返回首页', {number: countDownNumber})"></span>
        </p>
        <a @click="goHome">{{ t('如无反应，请点这里') }}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
export default {
  setup () {
    const { t } = useI18n()
    const router = useRouter()
    const countDownNumber = ref(8)
    let timer = null

    // 倒数器
    const countDown = () => {
      timer = setTimeout(() => {
        if (countDownNumber.value > 0) {
          countDownNumber.value--
          countDown()
        } else {
          goHome()
        }
      }, 1000)
    }
    countDown()

    onBeforeUnmount(() => {
      clearTimeout(timer)
    })

    const goHome = () => {
      router.push({
        name: 'home'
      })
    }

    return {
      t,
      goHome,
      countDownNumber
    }
  }
}
</script>
<style lang="less">
.finish {
  padding-bottom: 245px;

  .content {
    width: 1400px;
    margin: 48px auto 0;
    background-color: white;
    box-sizing: border-box;
    padding: 228px;
    background: linear-gradient(140deg, transparent 38px, #fff 0);
    text-align: center;

    .content_wrap {
      font-size: 26px;
    }

    .footer {
      margin-top: 60px;
      font-size: 18px;
      
      a {
        display: inline-block;
        margin-top: 8px;
        color: #7C8290;
        cursor: pointer;
      }
    }
  }

  .countDown {
    margin: 0 12px;
    font-size: 28px;
  }
}
</style>