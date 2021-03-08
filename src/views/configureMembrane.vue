<template>
  <div class="configureMembrane">
    <PackageSteps />
    <div class="bg">
      <div class="content">
        <div class="leftPart">
          <p>膜</p>
          <p>OPGAN BAG</p>
          <div class="imgBox">
            <img src="../assets/img/membrane.png">
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
                <img src="../assets/img/membrane.png">
              </li>
              <li>
                <img src="../assets/img/membrane.png">
              </li>
              <li>
                <img src="../assets/img/membrane.png">
              </li>
              <!--<li>-->
                <!--<img src="../assets/img/membrane.png">-->
              <!--</li>-->
            </ul>
          </div>
        </div>
        <div class="rightPart">
          <div class="overviewTitle">
            <img class="imgList" src="../assets/img/list.png">
            <p class="text">
              <span>概览</span>
            </p>
          </div>
          <div class="rightPartContent">
            <!-- 属性 -->
            <div class="importCard" :class="{active: importCardTitleOne}">
              <div class="importCardTitle" @click="importCardTitleOne = !importCardTitleOne">
                <span>属性</span>
                <span class="arrow" ></span>
              </div>
              <div class="importCardContent" v-show="importCardTitleOne">
                <div class="selectBox">
                  <!-- <span v-for="option in attributeList" class="selectOtion" :class="{active: data.prop1 === option.value}" @click="data.prop1 = option.value">{{option.label}}</span> -->
                </div>
              </div>
            </div>
            <!-- 性能 -->
            <div class="importCard" :class="{active: importCardTitleTwo}">
              <div class="importCardTitle" @click="importCardTitleTwo = !importCardTitleTwo">
                <span>性能</span>
                <span class="arrow"></span>
              </div>
              <div class="importCardContent" v-show="importCardTitleTwo">
                <div class="selectBox">
                  <!-- <span v-for="option in performanceList" class="selectOtion" :class="{active: data.prop2 === option.value}" @click="data.prop2 = option.value">{{option.label}}</span> -->
                </div>
              </div>
            </div>
            <!-- 材质 -->
            <div class="importCard" :class="{active: importCardTitleThree}">
              <div class="importCardTitle" @click="importCardTitleThree = !importCardTitleThree">
                <span>材质</span>
                <span class="arrow"></span>
              </div>
              <div class="importCardContent" v-show="importCardTitleThree">
                <div class="selectBox">
                  <!-- <span v-for="option in materialList" class="selectOtion" :class="{active: data.prop3 === option.value}" @click="data.prop3 = option.value">{{option.label}}</span> -->
                </div>
              </div>
            </div>
            <!-- 自定义 -->
            <div class="importCard" :class="{active: importCardTitleFour}">
              <div class="importCardTitle" @click="importCardTitleFour = !importCardTitleFour">
                <span>自定义</span>
                <span class="arrow"></span>
              </div>
              <div class="importCardContent" v-show="importCardTitleFour">
                <div class="remark">
                  <div style="margin-top: 20px;">
                    <span style="margin: 0 6px 0 30px;">备注名</span>
                    <input v-model="data.remark">
                  </div>
                  <div style="margin-top: 20px;">
                    <span style="margin: 0 6px 0 30px;">内容物</span>
                    <input v-model="data.remark">
                  </div>
                </div>
                <div class="sizeImport">
                  <label for="height">
                    <span class="labelName">长</span>
                    <input id="height" v-model="data.long">
                  </label>
                  <label for="height">
                    <span class="labelName">宽</span>
                    <input id="height" v-model="data.weight">
                  </label>
                  <label for="height">
                    <span class="labelName">高</span>
                    <input id="height" v-model="data.height">
                  </label>
                </div>
              </div>
            </div>
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
import PackageSteps from '../components/PackageSteps.vue'
import SelectComponent from '../components/SelectComponent.vue'
import Option from '../components/Option.vue'
export default {
  name: 'configureMembrane',
  data () {
    return {
      // 配置信息
      data: {
        type: 1,
        prop1: false,
        prop2: false,
        prop3: false,
        prop4: false,
        prop5: false,
        prop6: '',
        prop7: '',
        prop8: '',
        prop9: ''
      },
      upLoadImgShowList: [],
      importCardTitleOne: true,
      importCardTitleTwo: true,
      importCardTitleThree: true,
      importCardTitleFour: true,
      importCardTitleFive: true,
      importCardTitleSix: true,
      importCardTitleSeven: true,
      // 属性选择项
      attributeList: [
        { label: '洗铝', value: '1' },
        { label: '阴阳', value: '2' },
        { label: '镭射', value: '3' },
        { label: '哑光', value: '4' }
      ],
      // 性能选择项
      performanceList: [
        { label: '高温蒸煮', value: '1' },
        { label: '抽真空', value: '2' },
        { label: '油泡', value: '3' },
        { label: '冷冻', value: '4' },
        { label: '高阻隔', value: '5' },
        { label: '热收缩', value: '6' },
        { label: '易揭膜', value: '7' }
      ],
      // 材质选择项
      materialList: [
        { label: 'BOPA', value: '1' },
        { label: 'CPP', value: '2' },
        { label: 'PET', value: '3' },
        { label: 'PE', value: '4' },
        { label: 'KBOPA', value: '5' },
        { label: 'VMCPP', value: '6' },
        { label: 'AL', value: '7' },
        { label: 'HDPE', value: '8' },
        { label: '绵纸', value: '9' },
        { label: 'LLDPE', value: '10' },
        { label: 'VMPET', value: '11' },
        { label: 'LDPE', value: '12' },
        { label: 'KPET', value: '13' },
        { label: '牛皮纸', value: '14' }
      ],
      // 开口方式
      openingContentList: [
        { label: '拉链', value: '1' },
        { label: '易撕口', value: '2' },
        { label: '拉骨', value: '3' },
        { label: '侧拉链', value: '4' }
      ],
      holeContentList: [
        { label: '飞机孔', value: '1' },
        { label: '圆孔', value: '2' },
        { label: '异形孔', value: '3' }
      ],
      textureContentList: [
        { label: 'BOPA', value: '1' },
        { label: 'CPP', value: '2' },
        { label: 'PET', value: '3' },
        { label: 'PE', value: '4' },
        { label: 'KBOPA', value: '5' },
        { label: 'VMCPP', value: '6' },
        { label: 'AL', value: '7' },
        { label: 'HDPE', value: '8' },
        { label: '绵纸', value: '9' },
        { label: 'LLDPE', value: '10' },
        { label: 'VMPET', value: '11' },
        { label: 'LDPE', value: '12' },
        { label: 'KPET', value: '13' }
      ]
    }
  },
  components: {
    PackageSteps,
    SelectComponent,
    Option
  },
  methods: {
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
    this.$store.dispatch('changeSteps', 'configureMembrane')
  }
}
</script>
<style lang="less">
.configureMembrane {
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

      .selectType {
        text-align: center;
        margin: 64px 0;
        p {
          display: inline-block;
          width: 150px;
          line-height: 54px;
          border: 1px solid #c8c8c8;
          text-align: center;
          margin: 0 12px;
          cursor: pointer;

          &.selected {
            background-color: #a0a0a0;
            color: white;
          }
        }
      }

      .rightPartContent {
        padding: 0 10px;
        margin-bottom: 16px;

        .rightPartTitle {
          background-color: #a0a0a0;
          padding: 13px 42px;
          color: white;
        }

        .sizeImport {
          margin: 56px 0 56px 40px;

          label {
            margin-right: 12px;
          }

          .circular {
            display: inline-block;
            width: 24px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            border-radius: 100px;
            border: 1px solid #B2B2B2;
            color: #B2B2B2;
            margin: 0 5px;
          }

          input {
            border: none;
            background-color: #F1F1F1;
            color: #989595;
            padding: 12px 12px;
            margin-left: 10px;
            width: 80px;
          }
        }

        .importCard {
          margin-top: 36px;
          .importCardTitle {
            cursor: pointer;
            border-bottom: 1px solid #585858;
            font-size: 24px;
            padding: 0 40px 16px;

            .arrow {
              display: inline-block;
              float: right;
              width: 16px;
              height: 16px;
              margin-top: 12px;
              border-right: 3px solid;
              border-bottom: 3px solid;
              transform: rotate(-45deg);
              transition: all .5s;
            }
          }

          .importCardContent {
            padding: 26px 40px;
            .row {
              margin: 16px 0;

              .rowItem {
                display: inline-block;
                width: 50%;

                input {
                  border: none;
                  width: 150px;
                  margin-left: 50px;
                  border-bottom: 1px solid;
                }
              }
            }
          }

          &.active {
            .arrow {
              transform: rotate(45deg);
            }
          }
        }
      }
    }
  }

  .selectBox {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    .selectOtion {
      cursor: pointer;
      background-color: #E5E5E5;
      margin: 0 1% 15px;
      line-height: 65px;
      text-align: center;
      width: 23%;
      &.active {
        background-color: #a0a0a0;
        color: white;
      }
    }
  }

  .textareaStyle {
    width: 100%;
    background-color: #F1F1F1;
    color: #A9ABAA;
    padding: 12px;
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
    background-color: #E5E5E5;
    border: 1px solid #E9E9E9;

    span {
      color: white;
      display: inline-block;
      width: 56px;
      height: 56px;
      border-radius: 60px;
      font-size: 50px;
      line-height: 48px;
      text-align: center;
      border: 2px dashed white;
    }

    .uploadInput {
      display: none;
    }
  }

  .remark {
    margin-top: 32px;
    input {
      border: none;
      background-color: #F1F1F1;
      color: #989595;
      padding: 12px 12px;
      margin-left: 20px;
      width: 340px;
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
