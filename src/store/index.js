import Vue from "vue"
import Vuex from "vuex"
import * as getters from "./getters"
import * as actions from "./actions"
import state from "./state"
import mutations from "./mutations"

//每次修改state会在控制台打日志
import createLogger from "vuex/dist/logger"
Vue.use(Vuex);
//调试工具检测对vuex数据的修改是不是通过提交mutations，直接修改会报错(开启调试)
const debug = process.env.NODE_ENV !== 'production'  //true


export default new Vuex.Store({
	getters,
	actions,
	state,
	mutations,
	strict:debug,
	plugins:debug ? [createLogger()] : []

})