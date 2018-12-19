<template>
	<transition name="slide">
		<MusicList :title="title" :bg-image="bgImage" :songs="songs"></MusicList>
	</transition>
</template>

<script>
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from "vuex"
  import {getDiscSongList} from "api/recommend"
  import {ERR_OK} from "api/config"
  import {creatSong} from "common/js/song"
	export default{
		data(){
			return {
				songs:[]
			}
		},
		computed:{
			title(){
				return this.disc.dissname
			},
			bgImage(){
				return this.disc.imgurl
			},
			...mapGetters([
				'disc'
			])
		},
		created(){
			this._getDiscSongList();
		},
		methods:{
			_getDiscSongList(){
				//刷新页面的时候会退到上一个路由
				if(!this.disc.dissid){
					this.$router.push("/recommend");
				}
				getDiscSongList(this.disc.dissid).then((res) => {
					if(res.code===ERR_OK){
						this.songs=this._normalizeSongs(res.cdlist[0].songlist);
					}
				})
			},
			_normalizeSongs(list){
				let ret=[];
				list.forEach((musicData) => {
					if(musicData.songid && musicData.albumid){
						ret.push(creatSong(musicData));
					}
				});
				return ret;
			}

		},
		components:{
			MusicList
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
 .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0); // 100% 移动到屏幕右边
  }
</style>