<template>
	<div class="singer" ref="singer">
		<list-view :data="singers" @select="selectSinger" ref="list"></list-view>
		<router-view></router-view>
	</div>
</template>
<script>
import {getSingerList} from "api/singer"
import {ERR_OK} from "api/config"
import Singer from "common/js/singer"
import listView from "base/listView/listView"
import {mapMutations} from "vuex" //写入数据的语法糖
import {playlistMixin} from "common/js/mixin"
const HOT_NAME="热门";
const HOT_SINGER_LEN=10;
export default{
	mixins:[playlistMixin],
	data(){
		return {
			singers:[]
		}
	},
	created(){
		this._initSingerList();
	},
	methods:{
		selectSinger(singer){
			this.$router.push({
				path:`/singer/${singer.id}`
			})
			this.setSinger(singer);
		},
		handlePlaylist(playList){
			const bottom=playList.length > 0 ? "60px" : ""
			this.$refs.singer.style.bottom=bottom;
			this.$refs.list.refresh();

		},
		_initSingerList(){
			getSingerList().then((res) => {
				if(res.code===ERR_OK){
					this.singers=this._normalizeSinger(res.data.list);
					console.log(this.singers);
					
				}
			})
		},
		//取出所需数据
		_normalizeSinger(list){
			let map={
				hot:{
					title:HOT_NAME,
					items:[]
				}
			}
			//遍历所有数据，取出热门数据--前十条
			list.forEach((item,index) => {
				if(index<HOT_SINGER_LEN){
					map.hot.items.push(new Singer({
						id:item.Fsinger_mid,
						name:item.Fsinger_name
					}))
				}
				const key=item.Findex;
				if(!map[key]){
					map[key]={
						title:key,
						items:[]
					}
				}
				map[key].items.push(new Singer({
					id:item.Fsinger_mid,
					name:item.Fsinger_name
				}))
			})
			//为了得到有序列表，我们应该处理map
			let hot=[];
			let ret=[];
			for(let key in map){
				let val=map[key];  //每个对象
				if (val.title.match(/[a-zA-z]/)) {
            		ret.push(val)
				}else if(val.title===HOT_NAME){
					hot.push(val);
				}
			}
			ret.sort((a,b) => {
				return a.title.charCodeAt(0)-b.title.charCodeAt(0);
			})

			return hot.concat(ret);
			
		},
		...mapMutations({
			setSinger:"SET_SINGER" //映射为this.$store.commit("SET_SINGER")
		})
		
	},
	components:{
		listView
	}
}
</script>
<style lang="scss" rel="stylesheet">
.singer {
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
  }
</style>