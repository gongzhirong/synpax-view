<script lang="ts">
  import { computed, reactive, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'
  import { getPackageList } from '../../api'

  export default {
    name: 'tabber',
    setup() {
      const router = useRouter()
      const { t } = useI18n() // 国际化工具
      const ImgWidth = 1210 / 4 // 每个图片的长度（.tabber_content 长度除以 4）
      let TabbarImgs = ref<any[]>([])
      const searchValue = ref('')
      const offsetNum = ref(0) // 偏移个数
      const leftButtonDisable = ref(false)
      const rightButtonDisable = ref(false)
      const imgs = computed(() => {
        const result = TabbarImgs.value.filter((img) => {
          return img.name.includes(searchValue.value)
            ? true
            : false
        })
        offsetNum.value = 0
        return result
      }) // 图片列表
      const offset = computed(() => ImgWidth * offsetNum.value)

      function moveAcation(type: string) {
        if (imgs.value.length <= 4) return

        switch(type) {
          case 'right': 
            if (imgs.value.length - offsetNum.value > 4) {
              offsetNum.value++
              leftButtonDisable.value = false
            } else {
              // offsetNum.value = 0
              rightButtonDisable.value = true
            }
            break
          case 'left':
            if (offsetNum.value === 0) {
              // offsetNum.value = imgs.value.length - 4
              leftButtonDisable.value = true
            } else {
              offsetNum.value--
              rightButtonDisable.value = false
            }
            break
          default:
            break
        }
      }

      function selectType(item: any): void {
        router.push({
          name: 'packagingInitial',
          params: {
            packageId: encodeURI(item.id)
          },
          query: {
            packageName: encodeURI(item.name)
          }
        })
      }

      const getData = async () => {
        try {
          const res = await getPackageList()
          if (res.data.code === 0) {
            TabbarImgs.value = res.data.result
          }
        } catch(e) {
          console.error(e)
        }
      }
      getData()
      
      return {
        t,
        imgs,
        offset,
        moveAcation,
        selectType,
        searchValue,
        leftButtonDisable,
        rightButtonDisable,
      }
    }
  }
</script>

<template>
  <div class="home_tabber">
    <div class="home_title">
      <div class="title_line"></div>
      <div class="title_text">{{ t('开始我的包装') }}</div>
      <div class="title_line"></div>
    </div>
    <p class="home_text">{{ t('即包装配置器') }}</p>
    <div class="home_tabber_search">
      <el-input
        :placeholder="t('搜索')"
        prefix-icon="suffix-icon"
        v-model="searchValue">
      </el-input>
    </div>
    <div class="tabber_content">
      <div class="tabber_scrollbox" :style="`transform: translateX(-${offset}px)`">
        <div
          v-for="img in imgs"
          :key="img.id"
          class="tabber_goods"
          @click="selectType(img)">
            <img :src="img.left_img" class="tabber_img imgHoverBigger" @error="$setDefaultImg">
            <p class="desc">
              {{ img.description }}
            </p>
            <p class="name">
              {{ img.name }}
            </p>
        </div>
      </div>
    </div>
    <el-button class="leftbutton" icon="el-icon-arrow-left" circle @click="moveAcation('left')" :disabled="leftButtonDisable"></el-button>
    <el-button class="rightbutton" icon="el-icon-arrow-right" circle @click="moveAcation('right')" :disabled="rightButtonDisable"></el-button>
  </div>
</template>

<style lang="less">
  .home_tabber {
    position: relative;

    * {
      font-size: 50px;
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

    .home_title {
      width: 1640px;
      height: 108px;
      position: relative;
      margin: 0 auto;
    }

    .home_tabber {
      width: 100%;
      position: relative;
      overflow: hidden;
    }

    .tabber_content {
      width: 1210px;
      overflow: hidden;
      margin: 50px auto 100px;
      min-height: 508px;
    }

    .tabber_scrollbox {
      display: flex;
      transition: all .5s;
    }

    .tabber_goods {
      position: relative;
      width: 281.5px;
      height: 508px;
      flex-shrink: 0;
      background-color: #fff;
      display: inline-block;
      margin: 0 10px;
      cursor: pointer;

      .desc {
        font-size: 24px;
        padding: 0 20px;
        color: #8a8484;
      }

      .name {
        position: absolute;
        bottom: 0;
        width: 100%;
        font-size: 28px;
        text-align: center;
        padding: 20px 0;
      }
    }

    .tabber_goods:last-child {
      margin-right: 0;
    }

    .tabber_img {
      width: 100%;
      height: 390px;
    }

    .leftbutton {
      position: absolute;
      top: 353px;
      left: 230px;
    }
    .rightbutton {
      position: absolute;
      top: 353px;
      right: 244px;
    }
    .home_tabber_search {
      position: absolute;
      right: 365px;
      top: 126px;
      width: 320px;

      .el-input__inner {
        font-size: 26px;
        height: 56px;
        border-radius: 8px;
      }
    }
  }
</style>
