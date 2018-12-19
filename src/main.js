// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Vue from 'vue'
import App from './App'
import fastclick from "fastclick"
import router from './router'
import store from "./store"
import vueLazyLoad from "vue-lazyload"
import "common/sass/index.scss"
import vConsole from "vconsole"
console.log("test");
Vue.config.productionTip = false
//去掉点击事件300毫秒的延时
fastclick.attach(document.body)
Vue.use(vueLazyLoad,{
	loading:require('common/image/default.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
