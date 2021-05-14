<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>{{ msg }}</h1>
    <h2>{{ t('home1') }}</h2>
    <el-button type="primary" @click="addCount" size="mini">count is: {{ data.count }}</el-button>
    <el-button type="primary" @click="addAge" size="mini">age is: {{ age }}</el-button>
    <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(props) {
    const { t } = useI18n({ useScope: 'global' })
    console.log(t)
    const msg = props.msg;
    const data = reactive({
      count: 0
    });

    const age = ref(0);
    
    function addCount() {
      data.count++;
      console.log(data.count);
    }
    function addAge() {
      age.value += 1
    }
    return {
      msg,
      data,
      addCount,
      age,
      addAge,
      t
    }
  }
}
</script>
