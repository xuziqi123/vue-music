import {mapGetters,mapMutations,mapActions} from "vuex"
import {playMode} from "common/js/config"
import {shuffle} from "common/js/util"
export const  playlistMixin ={
	computed:{
		...mapGetters([
			'playList'

		])
	},
	mounted(){
		this.handlePlaylist(this.playList);
	},
	activated(){
		this.handlePlaylist(this.playList)
	},
	watch:{
		playList(newVal){
			this.handlePlaylist(newVal);
		}
	},
	methods:{
		handlePlaylist(){
			throw new Error('component must implement handlePlaylist methods');
		}
	}
}

export const playerMixin={
	computed:{
		iconMode(){
				return this.mode === playMode.sequence ? "icon-sequence" : this.mode === playMode.loop ? "icon-loop" : "icon-random"
			},
		
			...mapGetters([
				"playList",
				"fullScreen",
				"currentSong",
				"playing",
				"currentIndex",
				"mode",
				"sequenceList",
				"favoriteList"
			])
		},
	methods:{
		changeMode(){
				const mode = (this.mode+1) % 3;
				this.setPlayMode(mode)
				let list=null;
				if(mode===playMode.random){
					//洗牌
					list = shuffle(this.sequenceList)
				}else{
					list =this.sequenceList
				}
				//洗牌列表的同时不能改变原来song的索引值，防止切换播放模式的时候瞬间切换播放歌曲
				this.resetCurrentIndex(list);
				//提交修改后的list
				this.setPlayList(list);

			},
			resetCurrentIndex(list){
				//在list中找到当前歌曲对应的索引
				let index =list.findIndex((item) => {
					return item.id===this.currentSong.id;
				});
				this.setCurrentIndex(index);
			},
			getFavoriteIcon(song){
				if(this.isFavorite(song)){
					return "icon-favorite"
				}
				return "icon-not-favorite"
			},
			toggleFavorite(song){
				if(this.isFavorite(song)){
					this.deleteFavoriteList(song)
				}else{
					this.saveFavoriteList(song);
				}
			},
			//判定歌曲是否在喜欢的列表中
			isFavorite(song){
				const index=this.favoriteList.findIndex( (item) => {
					return item.id===song.id;
				})
				return index > -1;
			},
			...mapMutations({
				setPlayingState:'SET_PLAYING_STATE',
				setCurrentIndex:'SET_CURRENTINDEX_STATE',
				setPlayMode:'SET_MODE_STATE',
				setPlayList:'SET_PLAYLIST_STATE'
			}),
			...mapActions([
				'saveFavoriteList',
				'deleteFavoriteList'
				])
	}

}


export const searchMixin = {
	data(){
		return {
			query:'',
			refreshDelay:100
		}
	},
	computed:{
		...mapGetters([
				'searchHistory'
				])
	},
	methods:{
		saveSearch(){
			this.saveSearchHistory(this.query);
			},
		blurInput(){
			this.$refs.searchBox.blur();
		},
		onQueryChange(query){
				this.query=query;
		},
		addQuery(query){
			//调用子组件的接口
			this.$refs.searchBox.setQuery(query);
		},
		...mapActions([
			'saveSearchHistory',
			'deleteSearchHistory'
			]),
	}
}