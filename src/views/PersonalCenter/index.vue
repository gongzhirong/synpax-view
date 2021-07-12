<template>
  <div class="personalCenter">
    <div class="userInfoBox">
      <h1 class="title">{{ t('个人中心') }}</h1>
      <el-form ref="userForm" label-width="300" style="width: 100%">
        <el-row class="userForm">
          <el-col :span="8">
            <el-form-item :label="`${t('账号')}：`">
              <el-input v-if="isEditInfo" v-model="editInfoForm.name" style="width: 300px;"></el-input>
              <span v-else v-text="userData.nickname"></span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="`${t('手机号码')}：`">
              <el-input v-if="isEditInfo" v-model="editInfoForm.phone" style="width: 300px;"></el-input>
              <span v-else v-text="userData.phone"></span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="`${t('邮箱地址')}：`">
              <el-input v-if="isEditInfo" v-model="editInfoForm.email" style="width: 300px;"></el-input>
              <span v-else v-text="userData.email"></span>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="editButtonBox">
          <el-button type="text" v-show="!isEditInfo" @click="editInfo">{{ t('修改信息') }}</el-button>
          <el-button type="text" v-show="isEditInfo" @click="cancelEditInfo">{{ t('取消') }}</el-button>
          <el-button type="text" v-show="isEditInfo" @click="submitEditInfo">{{ t('保存') }}</el-button>
        </div>
      </el-form>
    </div>

    <ul class="tabs">
      <li :class="{actived: activeName === 'MsgManager'}" @click="activeName = 'MsgManager'">消息</li>
      <li :class="{actived: activeName === 'OrderManager'}" @click="activeName = 'OrderManager'">订单</li>
    </ul>
    <keep-alive>
      <component :is="activeName"></component>
    </keep-alive>
  </div>
</template>
<script lang="ts">
import { computed, defineAsyncComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from 'vue-i18n';
import { changeInfo } from '../../api'

export default {
  name: 'personalCenter',
  components: {
    MsgManager: defineAsyncComponent(() => import('./msg.vue')),
    OrderManager: defineAsyncComponent(() => import('./order.vue'))
  },
  setup() {
    const store = useStore();
    const userData: any = computed(() => store.state.userInfo);
    const { t } = useI18n();
    const activeName = ref('MsgManager');
    const isEditInfo = ref(false)
    const editInfoForm = reactive({
      phone: '',
      email: '',
      name: ''
    })

    const editInfo = () => {
      isEditInfo.value = true
      editInfoForm.phone = userData.value.phone
      editInfoForm.email = userData.value.email
      editInfoForm.name = userData.value.nickname
    }

    const cancelEditInfo = () => {
      isEditInfo.value = false
    }

    const submitEditInfo = async () => {
      try {
        const data = {
          user_info: {
            ...editInfoForm
          },
          token: store.state.userInfo.token
        }
        const res = await changeInfo({ data })
        if (res.data.code === 0) {
          isEditInfo.value = false
          store.dispatch('checkLogin')
        }
      } catch(e) {}
    }

    return {
      userData,
      activeName,
      t,
      isEditInfo,
      editInfo,
      cancelEditInfo,
      submitEditInfo,
      editInfoForm
    }
  }
}
</script>
<style lang="less">
.personalCenter {
  .userInfoBox {
    padding: 68px 70px;
    font-size: 28px;

    .userForm {
      margin-top: 60px;
      padding: 21px;
      
      .el-form-item__label {
        font-size: 21px;
      }

      .el-form-item__content {
        font-size: 21px;
      }
    }

    .editButtonBox {
      text-align: center;
      
      .el-button {
        font-size: 18px;
      }
    }
    
    .title {
      color: #353535;
      position: relative;
      
      &::after {
        content: '一一';
        position: absolute;
        color: #66b1ff;
        top: 35px;
        left: 29px;
        font-weight: bold;
      }
    }
  }
  
  .tabs {
    margin-top: 100px;
    font-size: 24px;
    border-bottom: 1px solid #b2b2b2;
    padding: 0 55px;

    li {
      padding-bottom: 8px;
      display: inline-block;
      margin: 0 20px;
      cursor: pointer;
      position: relative;
      bottom: -3px;

      &.actived {
        color: #409EFF;
        border-bottom: 5px solid;
      }
    }
  }
}
</style>
