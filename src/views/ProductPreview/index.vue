<template>
  <div class="product_preview">
    <h1 class="title">{{ productData.name || t("详情") }}</h1>
    <div class="content">
      <div class="img_preview">
        <img
          :src="currentImgPreview"
          :alt="currentImgPreview"
          @error="$setDefaultImg"
        />
        <div class="divider"></div>
        <p class="companyName">{{ productData.company }}</p>
      </div>
      <div class="product_info">
        <div class="designerInfo">
          <span> {{ t("设计师") }}： </span>
          <a :href="productData.designer_url"> {{ productData.designer }} </a>
        </div>
        <div class="product_label">
          <span> {{ t("标签") }}： </span>
          <span> {{ productData.label }} </span>
        </div>
        <div class="img_list">
          <img v-for="img in productData.img_list" :src="img" :key="img" @error="$setDefaultImg"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
interface Product {
  name: string;
  label: string;
  company: string;
  designer: string;
  designer_url: string;
  img_list: string[];
  [key: string]: any;
}
import { ref } from "vue";
import { caseInfo } from "../../api";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
export default {
  name: "productPreview",
  setup() {
    const productData = ref<Product>({
      name: "",
      label: "",
      company: "",
      designer: "",
      designer_url: "",
      img_list: [],
    });
    const currentImgPreview = ref<string>("");
    const route = useRoute();
    const { t } = useI18n();

    const getProductData = async () => {
      try {
        const data = {
          id: +route.params.productId,
        };
        const res = await caseInfo({ data });
        if (res.data.code === 0) {
          productData.value = res.data.result as Product;
          currentImgPreview.value = productData.value.img_list[0];
        }
      } catch (e) {}
    };
    getProductData();

    return {
      productData,
      currentImgPreview,
      t,
    };
  },
};
</script>
<style lang="less" scoped>
.product_preview {
  padding: 48px 70px;
  font-size: 28px;

  .content {
    margin-top: 53px;
    display: flex;

    .img_preview {
      flex: 8;

      img {
        background-image: linear-gradient(180deg, lightgrey, white);
        width: 100%;
      }

      .companyName {
        text-indent: 28px;
      }
    }

    .product_info {
      padding: 28px 90px;
      flex: 5;

      .designerInfo, .product_label {
        margin-bottom: 68px;
      }

      .img_list {
        img {
          display: inline-block;
          width: 32%;
          height: 198px;
          margin-bottom: 18px;
        }

        img:nth-child(3n - 1) {
          margin-left: 12px;
          margin-right: 12px;
        }
      }
    }
  }

  .divider {
    margin: 58px 0 28px;
    width: 100%;
    height: 2px;
    background-color: #00000073;
  }

  .title {
    color: #353535;
    position: relative;
    display: inline-block;
    min-width: 150px;
    color: #353535;
    text-align: center;
    position: relative;

    &::after {
      content: "一一";
      position: absolute;
      color: #66b1ff;
      top: 35px;
      left: 50%;
      margin-left: -30px;
      font-weight: bold;
    }
  }
}
</style>
