<!--
 * @Descripttion: 
 * @version: 
 * @Author: 华伟
 * @Date: 2024-05-14 11:39:40
 * @LastEditTime: 2024-05-15 13:53:49
-->
<template>
  <div>
    <ganttChartGrid />
    
  </div>
</template>

<script>
import ganttChartGrid from "./components/ganttChartGrid/index.vue";
import dayjs from "dayjs";
import { data } from './../../utils/index.js'
const dateList = ['hour', 'day', 'week', 'month', 'season', 'year']
export default {
  name: 'fanucGanttChart',
  components: { ganttChartGrid },
  props: {
    defaultDate: {
      type: String,
      default: 'day' // hour day week month season year
    }
  },
  provide() {
    return {
      defaultDate: dateList.includes(this.defaultDate) ? this.defaultDate : 'day',
      dateList: dateList,
      dataList: data
    }
  },
  data() {
    return {
      dateList,
      dataList: [1,2,3,34,5,5,6,77,77,7,88,8,8]
    }
  },
  mounted() {
    /**
     * 第一步创建画布、网格
     * 第二步创建方格，能拖动
     * 第三步模拟数据
     */
  }
}
</script>

<style lang="scss" scoped>
@import url(./../../assets/style/reset.css);
</style>