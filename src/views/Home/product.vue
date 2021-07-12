<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { getCaseList } from "../../api";

export default defineComponent({
  name: "product",
  setup() {
    const { t } = useI18n({ useScope: "global" });
    const searchValue = ref<string>("");
    const ProductImgs = ref<any[]>([]);
    const router = useRouter();

    const productData = computed(() => {
      const data: Array<Array<object>> = [[], [], [], []];
      const products = ProductImgs.value.filter((item) => {
        if (!searchValue.value) {
          return true;
        } else if (item.name.includes(searchValue.value)) {
          return true;
        } else {
          return false;
        }
      });
      products.forEach((item, index) => {
        data[index % 4].push(item);
      });
      
      return data;
    });

    const openDtail = (id: string) => {
      router.push({
        name: 'ProductPreview',
        params: {
          productId: id
        }
      })
    }

    const getData = async () => {
      try {
        const res = await getCaseList();
        if (res.data.code === 0) {
          ProductImgs.value = res.data.result
        }
      } catch (e) {
        console.error(e);
      }
    };

    getData();

    return {
      t,
      productData,
      searchValue,
      openDtail
    };
  },
});
</script>
<template>
  <div class="home_detail">
    <div class="home_title">
      <div class="title_line"></div>
      <div class="title_text">{{ t("包装设计展示") }}</div>
      <div class="title_line"></div>
    </div>
    <p class="home_text">
      FAILURE IS PROBABLY THE FORTIFICATION IN YOUR POLE. IT IS LIKE A PEEK YOUR
      WALLET AS THE THIEF, <br />WHEN YOU ARE THINKING HOW TO SPEND SEVERAL
      HARD-
    </p>
    <div class="product_search">
      <el-input
        placeholder="搜素"
        prefix-icon="suffix-icon"
        v-model="searchValue"
      >
      </el-input>
    </div>
    <div class="detail_wrap">
      <div class="productBox" v-for="(box, index) in productData" :key="index">
        <div class="product" v-for="pro in box" :key="pro.id" @click="openDtail(pro.id)">
          <img :src="pro.img_big"  @error="$setDefaultImg" class="imgHoverBigger"/>
          <p class="productNama">{{ pro.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.home_detail {
  width: 1640px;
  margin: 0 auto 110px;
  overflow: hidden;
  position: relative;

  .home_title {
    width: 1640px;
    height: 108px;
    position: relative;
    margin: 0 auto;
  }

  .title_line {
    width: 600px;
    height: 1px;
    margin-top: 105px;
    background-color: #aaa;
    float: left;
  }

  .title_text {
    width: 440px;
    height: 155px;
    line-height: 203px;
    font-size: 58px;
    color: #040000;
    text-align: center;
    z-index: 2;
    float: left;
  }

  .home_text {
    width: 1640px;
    clear: left;
    margin: 9px auto 0;
    line-height: 34px;
    font-size: 26px;
    color: #838282;
    text-align: center;
  }

  .detail_wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 120px;
  }

  .productBox {
    width: 24.5%;

    .product {
      cursor: pointer;
      width: 100%;
      margin-bottom: 10px;
      position: relative;
    }

    img {
      display: block;
      width: 100%;
      min-height: 300px;
    }

    .productNama {
      position: absolute;
      font-size: 20px;
      bottom: 5px;
      right: 8px;
    }
  }

  .product_search {
    position: absolute;
    right: 0px;
    top: 254px;
    width: 350px;

    .el-input__inner {
      font-size: 26px;
      height: 56px;
      border-radius: 8px;
    }
  }
}
</style>