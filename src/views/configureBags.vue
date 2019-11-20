<template>
  <div class="configureBags">
    <PackageSteps />
    <div class="bg">
      <div class="content">
        <div class="leftPart" v-if="this.$route.query.type == '1'">
          <p>三边封</p>
          <p>THREE SIDE SEALING</p>
          <div class="imgBox">
            <img src="../assets/images/selectBag/1.png">
          </div>
          <div class="descBox">
            <p class="title">
              袋形描述
            </p>
            <p>XXXXXXXXXXXXXXXXXXXXXXX</p>
          </div>
          <div class="selectImg">
            <ul>
              <li>
                <img src="../assets/images/selectBag/1.png">
              </li>
              <li>
                <img src="../assets/images/selectBag/1.png">
              </li>
              <li>
                <img src="../assets/images/selectBag/1.png">
              </li>
            </ul>
          </div>
        </div>
        <div class="leftPart" v-else-if="this.$route.query.type == '2'">
          <p>三边封立底袋</p>
          <p>THREE SIDE BOTTOM BAGS</p>
          <div class="imgBox">
            <img src="../assets/images/selectBag/2.png">
          </div>
          <div class="descBox">
            <p class="title">
              袋形描述
            </p>
            <p>XXXXXXXXXXXXXXXXXXXXXXX</p>
          </div>
          <div class="selectImg">
            <ul>
              <li>
                <img src="../assets/images/selectBag/2.png">
              </li>
              <li>
                <img src="../assets/images/selectBag/2.png">
              </li>
              <li>
                <img src="../assets/images/selectBag/2.png">
              </li>
            </ul>
          </div>
        </div>
        <div class="leftPart" v-else-if="this.$route.query.type == '3'">
          <p>四边封</p>
          <p>FOUR SIDE SEALING</p>
          <div class="imgBox">
            <img src="../assets/images/selectBag/3.png">
          </div>
          <div class="descBox">
            <p class="title">
              袋形描述
            </p>
            <p>XXXXXXXXXXXXXXXXXXXXXXX</p>
          </div>
          <div class="selectImg">
            <ul>
              <li>
                <img src="../assets/images/selectBag/3.png">
              </li>
              <li>
                <img src="../assets/images/selectBag/3.png">
              </li>
              <li>
                <img src="../assets/images/selectBag/3.png">
              </li>
            </ul>
          </div>
        </div>
        <div class="leftPart" v-else-if="this.$route.query.type == '4'">
          <p>八边封</p>
          <p>EIGHT SIDE SEALING</p>
          <div class="imgBox">
            <img src="../assets/images/selectBag/4.png">
          </div>
          <div class="descBox">
            <p class="title">
              袋形描述
            </p>
            <p>XXXXXXXXXXXXXXXXXXXXXXX</p>
          </div>
          <div class="selectImg">
            <ul>
              <li>
                <img src="../assets/images/selectBag/4.png">
              </li>
              <li>
                <img src="../assets/images/selectBag/4.png">
              </li>
              <li>
                <img src="../assets/images/selectBag/4.png">
              </li>
            </ul>
          </div>
        </div>
        <div class="leftPart" v-else-if="this.$route.query.type == '5'">
          <p>中封袋</p>
          <p>MIDDLE SEALING BAG</p>
          <div class="imgBox">
            <img src="../assets/images/selectBag/5.png">
          </div>
          <div class="descBox">
            <p class="title">
              袋形描述
            </p>
            <p>XXXXXXXXXXXXXXXXXXXXXXX</p>
          </div>
          <div class="selectImg">
            <ul>
              <li>
                <img src="../assets/images/selectBag/5.png">
              </li>
              <li>
                <img src="../assets/images/selectBag/5.png">
              </li>
              <li>
                <img src="../assets/images/selectBag/5.png">
              </li>
            </ul>
          </div>
        </div>


        <!-- 配置主要部分 -->
        <div class="rightPart">
          <div class="overviewTitle">
            <img class="imgList" src="../assets/img/list.png">
            <p class="text">
              <span>概览</span>
            </p>
          </div>

          <div class="overviewContent">
            <!-- 打孔样式 -->
            <Collapse title="打孔样式">
              <ButtonRadio v-model="data.punchStyle" row=2>
                <Option v-for="option in punchStyleList" :value="option.value" :label="option.label" :key="option.value"></Option>
              </ButtonRadio>
            </Collapse>

            <!-- 试用环境 -->
            <Collapse title="试用环境">
              <ButtonRadio v-model="data.trialEnvironment" row=2>
                <Option v-for="option in trialEnvironmentList" :value="option.value" :label="option.label" :key="option.value"></Option>
              </ButtonRadio>
            </Collapse>

            <!-- 罐装条件 -->
            <Collapse title="罐装条件">
              <ButtonRadio v-model="data.canningRequirement" row=2>
                <Option v-for="option in canningRequirementList" :value="option.value" :label="option.label" :key="option.value"></Option>
              </ButtonRadio>
            </Collapse>

            <!-- 内容物属性 -->
            <Collapse title="内容物属性" type="gray">
              <div class="cu-box">
                <div class="cu-box-title">
                  液态
                </div>
                <div class="cu-box-content">
                  <ButtonRadio v-model="data.liquidContent" row=3 type=empty>
                    <Option v-for="option in liquidContentList" :value="option.value" :label="option.label" :key="option.value"></Option>
                  </ButtonRadio>
                </div>
              </div>

              <div class="cu-box">
                <div class="cu-box-title">
                  固态
                </div>
                <div class="cu-box-content">
                  <ButtonRadio v-model="data.solidContent" row=3 type=empty>
                    <Option v-for="option in solidContentList" :value="option.value" :label="option.label" :key="option.value"></Option>
                  </ButtonRadio>
                </div>
              </div>

              <div class="cu-box">
                <div class="cu-box-title">
                  固液混合
                </div>
                <div class="cu-box-content">
                  <ButtonRadio v-model="data.solidLiquidContent" row=3 type=empty>
                    <Option v-for="option in solidLiquidContentList" :value="option.value" :label="option.label" :key="option.value"></Option>
                  </ButtonRadio>
                </div>
              </div>

              <div class="upLoadBox">
                <div class="upLoadBox-title">上传内容物图片</div>
                <div class="uploadBox-content">
                  <div class="imgLi" v-for="img in upLoadImgShowList" :key="img">
                    <img :src="img">
                  </div>
                  <div class="uploadButton" @click="openUpload">
                    <span>+</span>
                    <input ref="uploadInput" type="file" accept="image/*" class="uploadInput" @change="getDataPic">
                  </div>
                </div>
              </div>
            </Collapse>

            <!-- 阻隔性要求 -->
            <Collapse title="阻隔性要求">
              <ButtonRadio v-model="data.barrierRequirement" row=2>
                <Option v-for="option in barrierRequirementList" :value="option.value" :label="option.label" :key="option.value"></Option>
              </ButtonRadio>
            </Collapse>

            <!-- 材质偏好 -->
            <Collapse title="材质偏好">
              <ButtonRadio v-model="data.material" row=3>
                <Option v-for="option in materialList" :value="option.value" :label="option.label" :key="option.value"></Option>
              </ButtonRadio>
            </Collapse>

            <!-- 备注 -->
            <Collapse title="备注">
              <textarea rows="4" class="textareaStyle" placeholder="内容物描述" v-model="data.contentDesc"></textarea>
            </Collapse>
          </div>
          <div class="flooter">
            <div class="buttonStyle" @click="addToCar">
              显示汇总 >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PackageSteps from '../components/packageSteps.vue'
import SelectComponent from '../components/selectComponent.vue'
import Option from '../components/Option.vue'
import Collapse from '../components/Collapse.vue'
import ButtonRadio from '../components/ButtonRadio'
export default {
  name: 'configureBags',
  data () {
    return {
      // 配置信息
      data: {
        punchStyle: '1', // 打孔样式
        trialEnvironment: '', // 试用环境
        canningRequirement: '', // 罐装条件
        liquidContent: '', // 内容物-液体
        solidContent: '', // 内容物-固态
        solidLiquidContent: '', // 内容物-固液混合
        barrierRequirement: '', // 阻隔性要求
        material: '', // 材质偏好
        contentDesc: '', // 内容物描述
        type: 1,
        prop1: [],
        prop2: false,
        prop3: [],
        prop4: [],
        prop5: false,
        prop6: {type: '', num: ''},
        prop7: {type: '', num: ''},
        prop8: {type: '', num: ''},
        prop9: {type: '', num: ''}
      },
      punchStyleList: [ // 打孔样式选项列表
        { label: '飞机孔', value: '1' },
        { label: '圆孔', value: '2' },
        { label: '不打孔孔', value: '3' },
      ],
      trialEnvironmentList: [ // 试用环境选项列表
        { label: '冷冻', value: '1' },
        { label: '常温', value: '2' },
        { label: '蒸煮110°-121°', value: '3' },
        { label: '水煮≤100°', value: '4' },
      ],
      canningRequirementList: [ // 罐装条件选项列表
        { label: '抽真空', value: '1' },
        { label: '充气', value: '2' },
        { label: '机器罐装', value: '3' },
        { label: '手工罐装', value: '4' },
      ],
      liquidContentList: [ // 内容物-液体选项列表
        { label: '油', value: '1' },
        { label: '辣', value: '2' },
        { label: '酸', value: '3' },
        { label: '碱', value: '4' },
        { label: '腐', value: '5' },
      ],
      solidContentList: [ // 内容物-固态选项列表
        { label: '粉', value: '1' },
        { label: '尖', value: '2' },
        { label: '酸', value: '3' },
        { label: '碱', value: '4' },
        { label: '腐', value: '5' },
      ],
      solidLiquidContentList: [ // 内容物-固液混合
        { label: '粉', value: '1' },
        { label: '尖', value: '2' },
        { label: '酸', value: '3' },
        { label: '碱', value: '4' },
        { label: '腐', value: '5' },
        { label: '辣', value: '6' },
      ],
      barrierRequirementList: [ // 阻隔性要求选项列表
        { label: '极高（2年内）', value: '1' },
        { label: '高（1年内）', value: '2' },
        { label: '通用（6个月）', value: '3' },
        { label: '无', value: '4' },
      ],
      materialList: [ // 材质偏好选项列表
        { label: '塑塑复合', value: '1' },
        { label: '铝塑复合', value: '2' },
        { label: '纸塑复合', value: '3' },
        { label: '可降解', value: '4' },
      ],
      // -------------------------------------------------------------------------------TODO
      upLoadImgShowList: [],
    }
  },
  components: {
    PackageSteps,
    SelectComponent,
    Option,
    Collapse,
    ButtonRadio,
  },
  methods: {
    // 选择内容物
    selectBagContent (value) {
      let index = this.data.prop1.indexOf(value)
      if ( index > -1) {
        this.data.prop1.splice(index, 1)
      } else {
        this.data.prop1.push(value)
      }
    },
    // 选择表面
    selectSurfaceContent (value) {
      let index = this.data.prop3.indexOf(value)
      if ( index > -1) {
        this.data.prop3.splice(index, 1)
      } else {
        this.data.prop3.push(value)
      }
    },
    // 选择开口方式
    selectOpeningContent (value) {
      let index = this.data.prop4.indexOf(value)
      if ( index > -1) {
        this.data.prop4.splice(index, 1)
      } else {
        this.data.prop4.push(value)
      }
    },
    // 图片上传
    openUpload () {
      this.$refs.uploadInput.click()
    },
    // 本地获取图片数据
    getDataPic () {
      let reads= new FileReader()
      reads.readAsDataURL(event.target.files[0])
      reads.onload = (e) => {
        this.upLoadImgShowList.push(e.target.result)
      }
    },
    // 汇总显示
    addToCar () {
      this.$router.push({path: '/addToCar'});
    }
  },
  created () {
    this.$store.dispatch('changeSteps', 'configureBags')
  }
}
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
    background-color: #F5F5F5;
    padding-top: 22px;
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
      }
      .descBox {
        .title {
          font-weight: bold;
          height: 50px;
          border-bottom: 1px solid #5d5b5b;
        }
      }
      .selectImg {
        margin-top: 95px;
        li {
          display: inline-block;
          width: 20%;
          margin-right: 10px;
          img {
            width: 100%;
          }
        }
      }
    }
    .rightPart {
      flex: 1;
      
      .overviewContent {
        padding: 0 32px;
      }

      .overviewTitle {
        background-color: #A0A0A0;
        height: 50px;
        color: #F9F9F9;
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
    background-color: #F1F1F1;
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
      background-color: #F1F1F1;
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
    background-color: #279BB4;
    color: white;
    border-radius: 8px;
    padding: 12px 26px;
  }
}
</style>
