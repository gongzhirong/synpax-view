<template>
  <div class="packagingInitial">
    <div class="title">
      <h1>{{ typeName }}</h1>
    </div>

    <div class="searchBox">
      <el-input
        :placeholder="t('查找')"
        prefix-icon="suffix-icon"
        v-model="typeSelect.searchValue"
      >
      </el-input>
    </div>

    <div class="searchTypeSelect">
      <el-row class="firstTypeSelect">
        <el-col :span="3" class="firstTypeSelectLabel"> 分类： </el-col>
        <el-col :span="18">
          <el-tag
            v-for="type in typeSelect.firstOptions"
            :key="type.id"
            :effect="typeSelect.firstActived === type.id ? 'dark' : undefined"
            :type="typeSelect.firstActived === type.id ? '' : 'info'"
            @click="selectType('first', type)"
          >
            {{ type.name }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row class="secondTypeSelect" v-show="typeSelect.secondOptions">
        <el-col :span="3" class="secondTypeSelectLabel"> 类型： </el-col>
        <el-col :span="18">
          <el-tag
            v-for="type in typeSelect.secondOptions"
            :key="type.id"
            :effect="typeSelect.secondActived === type.id ? 'dark' : undefined"
            :type="typeSelect.secondActived === type.id ? '' : 'info'"
            @click="selectType('second', type)"
          >
            {{ type.name }}
          </el-tag>
        </el-col>
      </el-row>
    </div>

    <div class="templateList">
      <div class="listPagination">
        <el-pagination layout="prev, pager, next" :total="total"> </el-pagination>
      </div>
      <el-row :gutter="20">
        <el-col
          :span="6"
          v-for="temp in typeSelect.templateList"
          :key="temp.id"
        >
          <el-card
            @click="configurePackage(temp)"
          >
            <img :src="temp.img_big" class="image imgHoverBigger" @error="$setDefaultImg"/>
            <div style="padding: 14px">
              <span>{{ temp.name }}</span>
              <div class="bottom">
                <p class="description">{{ temp.description }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <div class="customButton" @click="configurePackage(null)">
            <i class="el-icon-plus"></i>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <div></div>
</template>
<script lang="ts">
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { getTypeList, getProductList } from "../../api";
export default {
  name: "packagingInitial",
  setup() {
    const { t } = useI18n();
    const currentRoute = useRoute();
    const router = useRouter(); // 路由实例
    const typeName = ref<string>(
      decodeURI(currentRoute.query.packageName as string)
    );
    const total = ref<number>(0);
    const demoImage =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAApVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+4/eNVAAAANnRSTlMAQKqAcxgM46ZWRdrNo5xMM25pBt49OtGfhl0U1YxJ+ceyrnl2ZTeZfxDEvym6fLdQIOeS8S2RLc+nAAAEVElEQVR42u3ciVbaUBSF4R0GkTGIQAVlarUogzh1v/+jtXZYadXkQE64cNPzvcH2DyaErMAYY4wxxhhjjDHGGGOMMcYYY4wxxhhzJMLr1rIwH/Tht5sGf6s/P8JbqwYZqXTgqdWE/zqFl77xnXv46InvDeGfJj/QgHdCfugGvpmRuUgSMsYKfpkxRgivhIxzDa/MGKcEn/wJ4v2ZZMZYY3hkzHhleOQzYy3hkTGZj896QpCKT0dWUpBbeMSCHBkLcmQOHqQ9uOKrTefSfZDL0oKvGl/a0CmPols33TPXQc66/GMyUmVbXfFva6RVY7x7xCjwb/UHpBbwjReXQZ74RlG9IzJ1F6TOd27VOyIFpFFICHK5Q8N79Y5I6CZIyA990e6IzNwEmTGjJQHjlF0EuZTutuh3cOgiSJXCEv0OjhwEwYjxSqodkYKDIChQWKLfwY0+iPzR3TDJmWJHpJVdkO4lYrSoXxIwWdFBEBSpXhJQ0HcQBG0KOuoddRdBgCvlkoCSWxdBgCIlN7odlbKTIChXNEsCiqpuggAdyksUO4bYSSAESVJMvSSgaIDdnCYEuYPglqJhyh0jZBtE32SYasczHATRLgkoaiHDINfAXpYEFDXhIIh2SUBRAfsJol9S1ezQB8l4iX6HPoh+SYCfepMUO1RB6nfIdMniHK82mh36ILLBdifqoW6HPohsREkIYKrcoQ8ie6ZgCnxT79AHkc2ZbHKCorjj8EHkuxEMMJd2HEOQH5pMVMJsHzt6e3jq5JRJTtHcx5BmQpATpFMQhnSY6LMfQVhCn8lmxxGkKX7YTybSkmMIciH/+8WCgs3hg1xQMAUQUrI+dJDWVpcoGCiWOAky3/LuzvmCkuUhg1xsexmPgKLl4YI0KQqinx5Fi0MFOaWoCuywZKo/EK5SBClQ9ADsYUk/2yCft9qx45KG+yCzLXcomjgJsqEoBFIsWbgNst5qR6olS0WQM+xoSdEYSLnk2V2QdeodwANFRVdBRhTVECukZLJyE2Q10ewAxpQM3AQZ6HYANQq6ToKgTkEAQY+CmosgPfUOiF/iB2mCnGd8ZPWwhXa6n+C+6oNEmhnskG4HLx0EwTKbB5RWTHCqDKL/FvIVW3tkvNHONwg+nWNXI3GHfkl1r0Hka4w2dlJmjJcTB0Fw8qLcIT8L3XIRBGhpj6vInXAm0gSRBfodUV5+oKAIor/r0Ecq58KOFEF0S3pI60naIQfpAFktCZBa+ZO4Qw6S0ZJ6AIVyKZqyHqa4OOtAYbiO/iClMpTCeaPCyvRLG3AVJNIfTLuTp8YowF7JQbx6B9g8MYg/LMiR+R+CePXOrNwEKeYkCKY5CfKYlyDjnATBbU6C/BySixcvFnMSBL2cBAEq+QgCjHISBLWcBIl5krAK/zzyvQv4qM23CvDT6hP/0YSvyk1v37j4VrXV5S/zNjzXvikWizWf3opnjDHGGGOMMcYYY4wxxpj/1HcKWyb5k7Kv+QAAAABJRU5ErkJggg==";

    // 分类、类型选择、搜索、列表相关状态数据
    const typeSelect = reactive<any>({
      searchValue: "", // 关键字搜索条件
      firstActived: "0", // 分类激活
      secondActived: "0", // 类型激活
      firstOptions: [
        // 分类数据列表
        { name: "全部", id: "0" },
      ],
      secondOptions: [
        // 分类数据列表
        { name: "全部", id: "0" },
      ], // 二级分类列表
      templateList: [],
    });

    // 选择分类
    const selectType = (typeCode: string, type: any) => {
      typeSelect[`${typeCode}Actived`] = type.id;
      if (typeCode === "first") {
        if (type.value) {
          typeSelect.secondOptions = [{ name: "全部", id: "0" }, ...type.value];
        } else {
          typeSelect.secondOptions = [{ name: "全部", id: "0" }];
        }
        typeSelect.secondActived = "0";
      }
      getProductData();
    };

    // 选中包装类型
    const configurePackage = (temp: any) => {
      let url = null;
      if (temp) {
        url = router.resolve({
          name: "ConfigurePackage",
          query: {
            packageId: currentRoute.params.packageId,
            productId: temp.id,
          },
        });
      } else {
        url = router.resolve({
          name: "ConfigurePackage",
          query: {
            packageId: currentRoute.params.packageId,
          },
        });
      }
      window.open(url.href);
    };

    const getTypeData = async () => {
      try {
        const res = await getTypeList();
        typeSelect.firstOptions = typeSelect.firstOptions.concat(
          res.data.result
        );
      } catch (e) {
        console.error(e);
      }
    };
    getTypeData();

    const getProductData = async () => {
      try {
        const data = {
          pack_id: +currentRoute.params.packageId,
          type_id:
            typeSelect.secondActived === "0"
              ? +typeSelect.firstActived
              : +typeSelect.secondActived,
          page: 1,
        };
        const res = await getProductList({ data });

        if (res.data.code === 0) {
          typeSelect.templateList = res.data.result.product_list;
          total.value = res.data.result.total
        }
      } catch (e) {
        console.error(e);
      }
    };
    getProductData();

    return {
      t,
      typeName,
      typeSelect,
      selectType,
      configurePackage,
      total,
    };
  },
};
</script>
<style lang="less">
.packagingInitial {
  padding: 68px 70px;
  font-size: 32px;

  .title {
    display: inline-block;
    min-width: 150px;
    color: #353535;
    text-align: center;
    position: relative;

    &::after {
      content: "一一";
      position: absolute;
      color: #66b1ff;
      top: 32px;
      left: 0;
      width: 100%;
      font-weight: bold;
    }
  }

  .searchBox {
    text-align: right;

    .el-input__inner {
      width: 280px;
      font-size: 18px;
      height: 38px;
      border-radius: 8px;
    }
  }

  .searchTypeSelect {
    margin-top: 10px;
    background-color: #f4f4f5;
    padding: 18px 34px;
    font-size: 23px;
    line-height: 23px;
    margin-bottom: 18px;

    .firstTypeSelectLabel,
    .secondTypeSelectLabel {
      line-height: 28px;
      width: 70px;
      flex: none;
    }

    .secondTypeSelect {
      margin-top: 18px;
    }

    .el-tag {
      margin: 0 18px;
      font-size: 16px;
      cursor: pointer;
      border: none;
    }
  }

  .templateList {
    .listPagination {
      text-align: right;
      font-size: 24px;
      height: 45px;

      .el-pagination .btn-prev .el-icon {
        font-size: 16px;
      }

      .el-pager li {
        font-size: 16px;
      }
    }
    .el-card__body {
      padding: 12px !important;
      cursor: pointer;
    }
    [class*="el-col-"] {
      margin-bottom: 28px;
    }

    .description {
      font-size: 13px;
      color: #999;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .button {
      padding: 0;
      min-height: auto;
    }

    .image {
      width: 100%;
      display: block;
      height: 388px;
    }

    .customButton {
      width: 100%;
      height: calc(100% - 10px);
      border: 4px dashed rgb(239, 239, 239);
      font-size: 170px;
      text-align: center;
      line-height: 446px;
      color: rgb(239, 239, 239);
      cursor: pointer;
    }
  }
}
</style>
