<!--
 * @Descripttion: 
 * @version: 
 * @Author: 华伟
 * @Date: 2024-03-07 19:30:32
 * @LastEditTime: 2024-05-16 14:30:00
-->
<template>
  <div id="app">
    <!-- <GanttChart :default-date="'day'"/> -->
    <ganttElastic></ganttElastic>
  </div>
</template>

<script>
import GanttChart from './components/gantt-chart/index.vue'
import ganttElastic from './components/gantt-elastic/index.vue'

export default {
  name: 'App',
  components: {
    GanttChart,
    ganttElastic
  }
}
</script>
