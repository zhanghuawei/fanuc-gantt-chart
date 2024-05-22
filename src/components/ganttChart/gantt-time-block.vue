<!--
 * @Descripttion: 
 * @version: 
 * @Author: 华伟
 * @Date: 2022-05-07 11:53:56
 * @LastEditTime: 2024-05-20 16:12:30
-->
<!--甘特图时间头的一块块-->
<template>
  <div class="gantt-time-block">
    <div class="top">{{ targetTime }}</div>
    <div class="bottom">
      <!-- 24小时 -->
      <div class="day-item" v-for="index in 2" :key="index">
        <div class="text">{{ index === 2 ? '12-24' : '0-12' }}</div>
      </div>
      <!-- <div class="item-hour" v-for="(item, index) in timeList" :key="index">
        <div class="text">{{ item }}</div>
      </div> -->
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'gantt-time-block',
  props: {
    targetTime: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      timeList: []
    }
  },
  created() {
    const len = 24;
    const timeList = [];
    for (let index = 0; index < len; index++) {
      timeList.push(index);
    }
    this.timeList = timeList;
  },
}
</script>

<style scoped lang="scss">
@import './css/gant-v.scss';
.gantt-time-block {
  box-sizing: border-box;
  //border: 1px solid #999999;
  font-size: 12px;
  .top {
    box-sizing: border-box;
    border-bottom: 1px solid $tableBorderColor;
    border-right: 1px solid $tableBorderColor;
    text-align: center;
    // 60 ÷ 2 = 30
    height: $tableHeadHeight/2;
    line-height: $tableHeadHeight/2;
  }
  .bottom {
    display: flex;
    .day-item {
      //180 ÷ 3 = 60
      line-height: $tableHeadHeight/2;
      //为了保持1px 等于1分钟 所以取值60px
      width: 180px;
      height: $tableHeadHeight/2;

      &:first-child {
        border-right: 1px solid $tableBorderColor;
      }

      .text {
        margin-left: -6px;
        text-align: center;
      }
      &:last-child {
        box-sizing: border-box;
        border-right: 1px solid $tableBorderColor;
      }
    }
    .item-hour {
      line-height: $tableHeadHeight/2;
      width: 15px;
      height: $tableHeadHeight/2;
    }
  }
}
</style>
