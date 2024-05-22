<!--
 * @Descripttion: 
 * @version: 
 * @Author: 华伟
 * @Date: 2022-05-07 11:53:56
 * @LastEditTime: 2024-05-20 13:48:00
-->
<!--网格块-->
<template>
  <div class="gantt-block"><slot></slot></div>
</template>

<script>
export default {
  name: 'GanttBlock'
}
</script>

<style scoped lang="scss">
@import './css/gant-v.scss';

.gantt-block {
  text-align: center;
  line-height: 60px;
  height: 60px;
  width: 360px; // 24小时
  box-sizing: border-box;
  border-right: 1px solid $tableBorderColor;
  border-bottom: 1px solid $tableBorderColor;

  // 给时间段加上小时分割线,每一个小时为15px 24个小时为360px
  &.time {
    background-image: repeating-linear-gradient(90deg, transparent, transparent 14px, #f3f3f3, #f3f3f3 15px);
  }
}
</style>
