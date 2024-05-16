<!--
 * @Descripttion: 
 * @version: 
 * @Author: 华伟
 * @Date: 2024-03-07 19:30:32
 * @LastEditTime: 2024-05-14 15:20:53
-->
<template>
  <div id="app">
    <GanttChart :default-date="'day'"/>
  </div>
</template>

<script>
import GanttChart from './components/gantt-chart/index.vue'

export default {
  name: 'App',
  components: {
    GanttChart
  }
}
</script>
