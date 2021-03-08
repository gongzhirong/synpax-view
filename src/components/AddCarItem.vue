<template>
  <div class="productDetail" :class="{openCar: open}">
    <div class="leftPart">
      <div class="detailTitle">
        <span style="cursor: pointer;" @click="open = !open">
          <span class="arrow"></span>
          详情
        </span>
      </div>
      <div class="imgBox">
        <img src="../assets/images/selectBag/2.png">
      </div>
      <div class="descBox">
        <p class="title">
          袋形描述
        </p>
        <p style="font-size: 18px;margin-top: 18px;">XXXXXXXXXXXXXXXXXXXXXXX</p>
      </div>
    </div>
    <div class="rightPart">
      <div class="infoBox">
        <div class="persen50Content">
          <p>打孔样式</p>
          <p>飞机孔</p>
        </div>
        <div class="persen50Content">
          <p>使用环境</p>
          <p>冷冻</p>
        </div>
        <div class="persen50Content">
          <p>罐装条件</p>
          <p>抽真空</p>
        </div>
        <div class="persen50Content">
          <p>阻隔性需求</p>
          <p>极高（2年内）</p>
        </div>
        <div class="persen50ContentWithWrap">
          <div>内容物属性</div>
          <p>液态</p><p>油</p>
        </div>
        <div class="persen50ContentWithWrap">
          <!-- <p>阻隔性需求</p><p>极高（2年内）</p> -->
          <p>材质偏好</p><p>塑塑复合</p>
        </div>
        <div class="persen50ContentWithWrap">
          <p>备注</p><p>i'm remark</p>
        </div>
        
      </div>
      <div class="editBox">
        <p style="display: inline-block; cursor: pointer;">
          <img src="../assets/images/addToCar/modifiy.png" style="vertical-align: text-top; width: 30px;">
          >
           修改配置
        </p>
        <p style="float: right; cursor: pointer;">
          <img src="../assets/images/addToCar/delete.png" style="vertical-align: text-top; width: 28px;">
          >
           删除此项
        </p>
      </div>
    </div>
    <div class="pageFooterLeft"></div>
    <span class="pageFooterLeftNum">1</span>
  </div>
</template>
<script>
export default {
  data () {
    return {
      open: false
    }
  }
}
</script>
<style lang="less">
.productDetail {
  position: relative;
  margin-bottom: 35px;
  width: 100%;
  color: #313538;
  background: linear-gradient(140deg, transparent 30px, #fff 0);
  padding: 60px 50px;
  display: flex;
  .leftPart {
    margin-top: 15px;
    flex: 1;
    padding-right: 140px;

    .detailTitle {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 70px;
    }
    .imgBox {
      text-align: center;
      margin: auto;
      width: 370px;
      img {
        height: 300px;
      }
    }
    .descBox {
      display: none;
      .title {
        font-weight: bold;
        height: 50px;
        font-size: 24px;
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
    padding-top: 20px;
    flex: 1;
  }
  .pageFooterLeft {
    position: absolute;
    left: 0;
    bottom: 0;
    border: 38px solid transparent;
    border-bottom: 38px solid #555555;
    border-left: 38px solid #555555;
  }
  .pageFooterLeftNum {
    color: white;
    position: absolute;
    left: 15px;
    bottom: 9px;
    font-size: 20px;
  }

  .infoBox {
    margin-bottom: 50px;
    border-bottom: 1px solid;
  }

  .persen50Content {
    display: flex;
    margin-bottom: 38px;
    p, div {
      flex: 1;
    }
  }

  .persen50ContentWithWrap {
    display: none;
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: 18px;
    border-top: 1px solid;
    border-bottom: 1px solid;
    padding-top: 18px;
    & + .persen50ContentWithWrap {
      border-top-width: 0;
    }
    &:last-child {
      border-bottom-width: 0;
    }
    div {
      width: 100%;
      margin-bottom: 20px;
    }
    p {
      margin-bottom: 30px;
      width: 50%;

      &:last {
        margin-bottom: 0;
      }
    }
  }
  .persen25Content {
    display: flex;
    margin-bottom: 38px;

    p {
      flex: 1;
    }
  }

  .arrow {
    vertical-align: sub;
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 16px;
    border-right: 3px solid;
    border-bottom: 3px solid;
    transform: rotate(-135deg);
    transition: all .5s;
  }
}

.openCar {
  .descBox {
    display: block !important;
  }

  .arrow {
    transform: rotate(45deg) !important;
  }

  .persen50Content, persen25Content {
    // display: block !important;
    // border-bottom: 1px solid;

    &:last-child {
      border-bottom: 1 solid #000;
    }
  }

  .persen50ContentWithWrap {
    display: flex;
  }

  .infoBox {
    border-bottom-width: 0;
  }
}
</style>