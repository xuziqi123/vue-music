<template>
	<transition name="slider">
		<music-list :songs="songs" :title="title" :bgImage="bgImage"></music-list>
	</transition>
</template>
<script>
import {mapGetters} from "vuex"
import {getSingerDetail} from 'api/singer'
import {getMusic} from 'api/song'
import {ERR_OK} from 'api/config'
import {creatSong} from 'common/js/song'
import musicList from "components/music-list/music-list"
	export default{
		data(){
			return {
				songs:[]
			}
		},
		computed:{
			...mapGetters([
				'singer'
			]),
			title(){
				return this.singer.name
			},
			bgImage(){
				return this.singer.avatar
			}

		},
		created(){
			this._getDetail();
			console.log(this.singer)
		},
		methods:{
			_getDetail(){
				if(!this.singer.id){
					this.$router.push('/singer');
					return;
				}
				getSingerDetail(this.singer.id).then((res) => {
					if(res.code===ERR_OK){
						this.songs=this._normalLizeSongs(res.data.list);
					}
				})
			},
			_normalLizeSongs(list){
				let ret=[];
				//取出所需数据
				list.forEach((item) => {
					let {musicData}=item;
					if(musicData.songid && musicData.albummid&&musicData.songmid){
							ret.push(creatSong(musicData));
					}
				})
				console.log(ret);
				return ret;
			},
		},
		components:{
			musicList
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
@import "~common/sass/variable";
// .singerDetail{
// 	position:fixed;
// 	z-index:100;
// 	top:0;
// 	bottom:0;
// 	left:0;
// 	right:0;
// 	background-color:$color-background;
// }
.slider-enter-active,.slider-leave-active{
	transition:all 0.3s;
}
.slider-enter,.slider-leave-to{
	transform:translate3d(100%,0,0);
}
</style>