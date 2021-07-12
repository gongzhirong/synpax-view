<template>
  <div class="configureBags">
    <div class="bg">
      <div class="content">
        <div class="leftPart">
          <p>{{ configProperty.name }}</p>
          <p>THREE SIDE SEALING</p>
          <div class="imgBox">
            <img :src="currentBigImg" @error="$setDefaultImg" />
          </div>
          <div class="selectImg">
            <ul>
              <li
                v-if="configProperty.left_img"
                @click="currentBigImg = configProperty.left_img"
              >
                <img :src="configProperty.left_img" @error="$setDefaultImg" />
              </li>
              <li
                v-if="configProperty.middle_img"
                @click="currentBigImg = configProperty.middle_img"
              >
                <img :src="configProperty.middle_img" @error="$setDefaultImg" />
              </li>
              <li
                v-if="configProperty.right_img"
                @click="currentBigImg = configProperty.right_img"
              >
                <img :src="configProperty.right_img" @error="$setDefaultImg" />
              </li>
            </ul>
          </div>
          <div class="descBox">
            <p class="title">
              {{ t("袋形描述") }}
            </p>
            <p>{{ configProperty.description }}</p>
          </div>
          <div class="sizeConfig">
            <span>尺寸：</span>
            <el-input v-model="configData.length" placeholder=""></el-input>mm X
            <el-input v-model="configData.width" placeholder=""></el-input>mm X
            <el-input v-model="configData.height" placeholder=""></el-input>mm
          </div>
        </div>

        <!-- 配置主要部分 -->
        <div class="rightPart">
          <div class="overviewTitle">
            <img class="imgList" src="../../assets/img/list.png" />
            <p class="text">
              <span>{{ t("概览") }}</span>
            </p>
          </div>

          <div class="overviewContent">
            <!-- 打孔样式 -->
            <div
              v-for="(configType, name) in configProperty.config"
              :key="name"
            >
              <template v-if="name === '内容物'">
                <!-- 内容物配置项 -->
                <Collapse :title="t('内容物属性')" type="gray">
                  <div class="cu-box">
                    <div class="cu-box-content">
                      <ButtonRadio v-model="configData.config_id" row="2">
                        <Option
                          v-for="option in configType"
                          :value="String(option.id)"
                          :label="option.name"
                          :key="option.id"
                        ></Option>
                      </ButtonRadio>
                    </div>
                  </div>

                  <div class="upLoadBox">
                    <div class="upLoadBox-title">{{ t("上传内容物图片") }}</div>
                    <div class="uploadBox-content">
                      <el-upload
                        :limit="1"
                        action="http://119.29.151.52:8080/tc/v1/home/upload_img"
                        list-type="picture-card"
                        :on-exceed="handleExceed"
                        :on-success="handleUploadSuccess"
                        :on-remove="handleRemoveFile"
                      >
                        <i class="el-icon-plus"></i>
                      </el-upload>
                    </div>
                  </div>
                </Collapse>
              </template>

              <template v-else v-for="config in configType" :key="config.id">
                <!-- 默认配置项 -->
                <Collapse :title="config.name" v-if="config.list">
                  <ButtonRadio v-model="configData.config_id" row="2">
                    <Option
                      v-for="option in config.list"
                      :value="String(option.id)"
                      :label="option.name"
                      :key="option.id"
                    ></Option>
                  </ButtonRadio>
                </Collapse>
              </template>
            </div>

            <!-- 备注 -->
            <Collapse :title="t('备注')">
              <textarea
                rows="4"
                class="textareaStyle"
                :placeholder="t('内容物描述')"
                v-model="configData.remark"
              ></textarea>
            </Collapse>
          </div>
          <div class="flooter">
            <div class="buttonStyle" @click="submit">
              {{ t("确认提交，寻求报价") }} >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import PackageSteps from "../../components/PackageSteps.vue";
import SelectComponent from "../../components/SelectComponent.vue";
import Option from "../../components/Option.vue";
import Collapse from "../../components/Collapse.vue";
import ButtonRadio from "../../components/ButtonRadio.vue";
import { packConfig, configArray, sendSonfig } from "../../api";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { ref, inject, watch, toRef } from "vue";
export default {
  props: {
    login: {
      type: Function,
      default () {
        return () => {}
      }
    }
  },
  name: "configureBags",
  components: {
    PackageSteps,
    SelectComponent,
    Option,
    Collapse,
    ButtonRadio,
  },
  setup(props: any, content) {
    const { t } = useI18n();
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const currentBigImg = ref();
    const login = inject<Function>('login')
    const configData = ref({
      // 配置信息
      pack_id: "",
      length: "",
      width: "",
      height: "",
      config_id: [],
      content_img: "",
      remark: "",
      token: "",
    });
    const configProperty = ref({
      left_img: '',
      config: {},
    });

    // 提交配置单
    const isAutoSubmit = ref<boolean>(false);
    const submit = async () => {
      if (!store.state.isLogin) {
        login && login(() => {
          isAutoSubmit.value = true
        });
        return ElMessage.error("请先登录");
      }
      try {
        const data = {
          ...configData.value,
          pack_id: +(route.query.packageId as any),
          token: store.state.userInfo.token,
        };
        const res = await sendSonfig({ data });
        if (res.data.code === 0) {
          router.push({
            name: "ConfigureSuccess",
          });
        }
      } catch (e) {
        console.error(e);
      }
    };
    // 监听登录成功且登录状态更新后自动提交表单
    watch(toRef(store.state, 'isLogin'), (value: boolean) => {
      if (value && isAutoSubmit) {
        isAutoSubmit.value = false
        submit()
      }
    })

    // 获取模板可配置项
    const getConfigTemplate = async () => {
      try {
        const data = {
          pack_id: +(route.query.packageId as any),
        };
        const res = await packConfig({ data });
        if (res.data.code === 0) {
          configProperty.value = res.data.result;
          currentBigImg.value = configProperty.value && configProperty.value.left_img;
        }
      } catch (e) {
        console.error(e);
      }
    };

    // 获取固定模板默认配置项
    const getConfigProduct = async () => {
      try {
        const data = {
          stencil_id: +(route.query.productId as any),
        };
        const res = await configArray({ data });
        if (res.data.code === 0) {
          configData.value = res.data.result;
        }
      } catch (e) {
        console.error(e);
      }
    };

    // 上传图片限制触发
    const handleExceed = () => {
      ElMessage.error(t('只能上传一张内容物图片'));
    };
    const handleRemoveFile = () => {
      configData.value.content_img = "";
    };
    // 内容物图片上传回调
    const handleUploadSuccess = (response: any) => {
      configData.value.content_img = response.result.file_path;
    };

    getConfigTemplate();
    if (route.query.productId) {
      getConfigProduct();
    }

    return {
      t,
      submit,
      handleUploadSuccess,
      handleExceed,
      handleRemoveFile,
      configData,
      configProperty,
      currentBigImg,
    };
  },
};
</script>
<style lang="less">
.configureBags {
  .upLoadBox {
    padding: 0 12px 48px;
    color: #000;
  }
  .upLoadBox-title {
    padding: 15px 0 18px;
  }
  .uploadBox-content {
    padding: 0 12px;
  }
  .cu-box {
    padding: 0 10px;
    color: #000;
  }
  .cu-box-title {
    font-size: 22px;
    padding-bottom: 14px;
    margin-bottom: 22px;
    margin-top: 18px;
    text-indent: 12px;
    border-bottom: 1px solid #000;
  }

  .cu-box-content {
    padding: 8px 18px;
  }

  .bg {
    background-color: #f5f5f5;
    padding-top: 68px;
    padding-bottom: 80px;
  }
  .content {
    font-size: 20px;
    background-color: white;
    background: linear-gradient(140deg, transparent 38px, #fff 0);
    width: 1400px;
    margin: auto;
    display: flex;
    padding: 40px 50px;
    box-sizing: border-box;
    .leftPart {
      margin-top: 15px;
      flex: 1;
      padding-right: 140px;
      .imgBox {
        margin: 50px 10px;
        text-align: center;
        min-height: 300px;

        img {
          width: 100%;
          height: 559px;
        }
      }
      .descBox {
        .title {
          font-weight: bold;
          height: 50px;
          border-bottom: 1px solid #5d5b5b;
        }
      }
      .selectImg {
        margin: 20px 0;
        li {
          cursor: pointer;
          display: inline-block;
          width: 20%;
          margin-right: 10px;
          img {
            display: inline-block;
            width: 100%;
            min-height: 114px;
          }
        }
      }
      .sizeConfig {
        margin-top: 20px;
        font-size: 22px;

        .el-input {
          width: 110px;
        }
      }
    }
    .rightPart {
      flex: 1;

      .overviewContent {
        padding: 0 32px;
      }

      .overviewTitle {
        background-color: #a0a0a0;
        height: 50px;
        color: #f9f9f9;
        line-height: 50px;
        padding: 14px 0;

        .imgList {
          width: 30px;
          float: left;
          margin-left: 55px;
          padding-top: 6px;
        }

        .text {
          margin-left: 110px;
          padding-left: 24px;
          border-left: 1px solid;
        }
      }
    }
  }

  .textareaStyle {
    width: 100%;
    background-color: #f1f1f1;
    // color;
    padding: 15px;
    border: none;
  }

  .imgLi {
    display: inline-block;
    width: 89px;
    height: 89px;
    margin-right: 12px;
    vertical-align: bottom;

    img {
      width: 89px;
      height: 89px;
    }
  }

  .uploadButton {
    position: relative;
    cursor: pointer;
    display: inline-block;
    width: 60px;
    height: 60px;
    padding: 14px;
    background-color: #fff;

    span {
      color: #000;
      display: inline-block;
      width: 56px;
      height: 56px;
      border-radius: 60px;
      font-size: 48px;
      line-height: 46px;
      text-align: center;
      border: 2px dashed #d8d8d8;
    }

    .uploadInput {
      display: none;
    }
  }

  .remark {
    margin-top: 80px;
    input {
      border: none;
      background-color: #f1f1f1;
      color: #989595;
      padding: 12px 12px;
      width: 365px;
    }
  }

  .flooter {
    text-align: center;
  }

  .buttonStyle {
    cursor: pointer;
    display: inline-block;
    background-color: #279bb4;
    color: white;
    border-radius: 8px;
    padding: 12px 26px;
  }
}
</style>
