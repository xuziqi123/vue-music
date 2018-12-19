<template>
	<transition name="slide">
		<MusicList :title="title" :bg-image="bgImage" :songs="songs" :rank="rank"></MusicList>
	</transition>
</template>
<script>
	import MusicList from "components/music-list/music-list"
	import {mapGetters} from "vuex"
	import {getDetailTopList} from "api/rank"
	import {ERR_OK} from "api/config"
	import {creatSong} from "common/js/song"
	export default{
		data(){
			return {
				songs:[],
				rank:true
			}
		},
		computed:{
			title(){
				return this.topList.topTitle
			},
			bgImage(){
				if(this.songs.length){
					return this.songs[0].image
				}
			
			},
			...mapGetters([
				'topList'
			])
		},
		created(){
			this._getDetailTopList();
		},
		methods:{
			_getDetailTopList(){
				if(!this.topList.id){
					this.$router.push('/rank');
					return;
				}
				getDetailTopList(this.topList.id).then(res => {
					if(res.code === ERR_OK){
						this.songs = this._normalizeSongs(res.songlist);
					}
				})
				
			},
			_normalizeSongs(list){
				let ret=[];
				list.forEach( (item) => {
					const musicData=item.data;
					if(musicData.songid && musicData.albumid){
						ret.push(creatSong(musicData));
					}
				})
				return ret;
			}
		},
		components:{
			MusicList
		}

	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.slide-enter-active,.slide-leave-active{
		transition: all 0.4s;
	}
	.slide-enter,.slide-leave-to{
		transform:translate3d(10
			0%,0,0)
	}
</style>