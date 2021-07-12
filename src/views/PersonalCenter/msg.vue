<template>
  <div class="msgManager">
    <div class="searchParamBox">
      <!-- <label for="msg_search_value">
        <span>{{ t('关键词') }}：</span>
        <el-input id="msg_search_value" v-model.trim="searchValue" style="width: 300px; margin-top: 10px;"/>
      </label> -->
    </div>

    <el-table style="width: 100%" :data="msgData" stripe>
      <el-table-column :label="t('状态')" prop="status" width="300" align="center">
        <template v-slot="{ row }">
          <span>
            {{ row.status === 0 ? t('未读') : t('已读') }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="t('主题')" prop="title" minWidth="500" align="center">
        <template v-slot="{ row }">
          <a href="javascript:void()" @click="openDetail(row)">{{ row.title }}11111</a>
        </template>
      </el-table-column>
      <el-table-column :label="t('发送时间')" prop="create_time" width="500" align="center">
        <template v-slot="{ row }">
          {{ dayjs(row.create_time).format('YYYY-MM-DD hh:mm:ss') }}
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        v-model:currentPage="currentPage"
        :page-size="10"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog
      :title="msgDetail.data.title"
      v-model="msgDetail.show"
      :append-to-body="true"
      width="50%">
      <pre>
        {{ msgDetail.data.content }}
      </pre>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="msgDetail.show = false">{{ t('关闭') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n' 
import { newsList, newInfo, changeNewStatus } from '../../api'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
export default {
  setup() {
    const searchValue = ref('');
    const { t } = useI18n();
    const msgSourceData = ref<any>([]);
    const msgDetail = reactive({
      show: false,
      data: {}
    })

    const msgData = computed(() => {
      return msgSourceData.value.filter((item: any) => item.title.includes(searchValue.value))
    })

    /* 分页器 */
    const currentPage = ref(1); // 当前页码
    const total = ref(0);
    const store = useStore();

    // 页码变更处理
    const handleCurrentChange: (value: number) => void = function (value) {
      currentPage.value = value;
      getList()
    }
    /* 分页器 */

    const openDetail = async (row: any) => {
      try {
        const data = {
          news_id: row.news_id,
          token: store.state.userInfo.token
        }
        const res = await newInfo({ data })
        if (res.data.code === 0) {
          changeStatus(row.news_id)
          msgDetail.data = res.data.result
        }
      } catch(e) {
        
      }
      msgDetail.show = true
    }

    const changeStatus = async (news_id: number, status = 1) => {
      try {
        const data = {
          news_id: news_id,
          token: store.state.userInfo.token,
          status
        }
        const res = await changeNewStatus({ data })
        if (res.data.code === 0) {
          getList()
          store.dispatch('readOneMessage')
        }
      } catch(e) {}
    }

    const getList = async () => {
      try {
        const data = {
          page: currentPage.value,
          token: store.state.userInfo.token
        }
        const res = await newsList({ data })
        console.log(res)
        if (res.data.code === 0) {
          msgSourceData.value = res.data.result.msg_list || []
          total.value = res.data.result.total
        }
      } catch(e) {}
    }
    getList()

    return {
      searchValue,
      msgData,
      handleCurrentChange,
      total,
      currentPage,
      t,
      msgDetail,
      openDetail,
      dayjs
    }
  }
}
</script>
<style lang="less">
.msgManager {
  font-size: 21px;
  
  .searchParamBox {
    padding: 22px 78px;

    .el-input {
      font-size: 18px;
    }
  }

  .el-table {
    font-size: 18px;
  }

  .pagination {
    margin-top: 18px;
    text-align: right;

    .el-input--mini .el-input__inner {
      font-size: 16px;
      height: 36px;
    }

    .el-pagination button, .el-pagination span:not([class*=suffix]) {
      height: 40px;
    }
    
    .el-pagination .el-select .el-input {
      width: 140px;
    }

    .el-pager li {
      line-height: 40px;
      font-size: 16px;
    }
  }
}
</style>
