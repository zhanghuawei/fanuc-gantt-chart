/*
 * @Descripttion: 
 * @version: 
 * @Author: 华伟
 * @Date: 2024-03-07 19:30:32
 * @LastEditTime: 2024-05-22 15:11:25
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  render: h => h(App),
}).$mount('#app')
