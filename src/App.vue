<!--
 * @Descripttion: 
 * @version: 
 * @Author: 华伟
 * @Date: 2024-03-07 19:30:32
 * @LastEditTime: 2024-05-14 11:42:51
-->
<template>
  <div id="app">
    <GanttChart msg="Welcome to Your Vue.js App"/>
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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
