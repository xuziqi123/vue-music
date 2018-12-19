import {commonParams} from "./config"
import axios from 'axios'
export function getTopList(mid){
	const url="/api/getTopList"
	const data=Object.assign({},commonParams,{
		platform:'h5',
		uin:0,
		needNewCode:1,
		format:'json',
		notice:0,
		g_tk:999222372
	})
	return axios.get(url,{
		params:data
	}).then(res => {
		return Promise.resolve(res.data)
	})
}

export function getDetailTopList(topid){
	const url="/api/getDetailTopList"
	const data=Object.assign({},commonParams,{
		topid,
		tpl:3,
		page:'detail',
		type:'top',
		song_begin:0,
		song_num:30,
		g_tk:5381,
		loginUin:0,
		hostUin:0,
		format:"json",
		notice:0,
		platform:'yqq',
		needNewCode:0
	})

	return axios.get(url,{
		params:data
	}).then((res) => {
		return Promise.resolve(res.data);
	})
}
