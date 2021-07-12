<template>
  <div class="orderManager">
    <div class="searchParamBox">
      <!-- <label for="msg_search_value">
        <span>{{ t('关键词') }}：</span>
        <el-input id="msg_search_value" v-model.trim="searchValue" style="width: 300px; margin-top: 10px;"/>
      </label> -->
    </div>

    <el-table style="width: 100%" :data="orderSourceData" stripe>
      <el-table-column :label="t('状态')" prop="status" width="300" align="center"></el-table-column>
      <el-table-column :label="t('订单标题')" prop="title" minWidth="500" align="center">
        <template v-slot="{ row }">
          <a href="">{{ row.title }}</a>
        </template>
      </el-table-column>
      <el-table-column :label="t('创建时间')" prop="time" width="500" align="center"></el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        v-model:currentPage="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="10"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { orderList } from '../../api'
import { useStore } from 'vuex'
export default {
  setup() {
    const searchValue = ref('');
    const { t } = useI18n();
    const orderSourceData = ref([]);
    const store = useStore()

    const orderData = computed(() => {
      return orderSourceData.value.filter((item: any) => item.title.includes(searchValue.value))
    })

    /* 分页器 */
    const currentPage = ref(1); // 当前页码
    const total = ref(0);
    // 页码变更处理
    const handleCurrentChange: (value: number) => void = function (value) {
      currentPage.value = value
      getList()
    }
    /* 分页器 */
    
    const getList = async () => {
      try {
        const data = {
          token: store.state.userInfo.token,
          page: currentPage.value
        }
        const res = await orderList({ data })
        if (res.data.code === 0) {
          orderSourceData.value = res.data.result.order_list || []
          total.value = res.data.result.total
        }
      } catch(e) {}
    }
    getList()

    return {
      searchValue,
      orderData,
      orderSourceData,
      handleCurrentChange,
      t,
      currentPage,
      total
    }
  }
}
</script>
<style lang="less">
.orderManager {
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
