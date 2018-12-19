<template>
	<div class="music-list">
		<div class="back" @click="back()">
			<i class="icon-back"></i>
		</div>
		<h1 class="title" v-html="title"></h1>
		<div class="bg-image" :style="bgStyle" ref="bgImage">
			<div class="play-wrapper">
				<div  ref="playBtn" v-show="songs.length>0" class="play" @click="random">
					<i class="icon-play"></i>
					<span class="text">随机播放全部</span>
				</div>
			</div>
			<div class="filter" ref="filter"></div>
		</div>
		<div class="bg-layer" ref="layer"></div>
		<Scroll @scroll="scroll" ref="list"  
		class="list" 
		:data="songs"
		:probeType="probeType"
		:listenScroll="listenScroll"
		>
			<div class="song-list-wrapper">
				<song-list @select="selectItem" :songs="songs" :rank="rank"></song-list>
			</div>
			<Loading></Loading>
		</Scroll>
	</div>
</template>
<script>
import Scroll from "base/scroll/scroll"
import SongList from "base/song-list/song-list"
import {prefixStyle} from "common/js/dom"
import Loading from "base/loading/loading"
import {mapActions} from "vuex"
//处理scroll列表的底部高度
import {playlistMixin} from "common/js/mixin"
const transform=prefixStyle("transform");
const backdrop=prefixStyle("backdrop-filter");
const RESERVED_HEIGHT=40;
	export default{
		//组建中同名的方法可以覆盖mixin中的方法
		mixins:[playlistMixin],
		props:{
			title:{
				type:String,
				default:""
			},
			songs:{
				type:Array,
				default:[]
			},
			bgImage:{
				type:String,
				default:""
			},
			rank:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				scrollY:0
			}
		},
		created(){
			this.probeType=3;
			this.listenScroll=true;
			//this.click=true;
		},
		mounted(){
			//对于vue组件。this.$refs拿到的是vue组件额实例，所以必须通过$el拿到具体的dom
			this.imageHeight=this.$refs.bgImage.clientHeight;
			this.minTranslateY=-this.imageHeight+RESERVED_HEIGHT;
			this.$refs.list.$el.style.top=`${this.imageHeight}px`
		},
		methods:{
			handlePlaylist(playList){
				const bottom = playList.length > 0 ? '60px' : ''
				this.$refs.list.$el.style.bottom=bottom;
				this.$refs.list.refresh();
			},
			scroll(pos){
				//获得scroll滚动距离
				this.scrollY=pos.y;
			},
			back(){
				this.$router.back();
			},
			selectItem(item,index){
				this.selectPlay({
					list:this.songs,
					index
				})
			},
			random(){
				this.randomPlay({
					list:this.songs
				});
			},
			...mapActions([
				"selectPlay",
				"randomPlay"
			])
		},
		watch:{
			//监听scrollY的变化值
			scrollY(newY){
				//输出值为最大的一个数
				let translateY=Math.max(this.minTranslateY,newY);
				let zIndex = 0;
				let scale=1;
				let blur=0;
				this.$refs.layer.style[transform]=`translate3d(0,${translateY}px,0)`;
				
				const percent=Math.abs(newY / this.imageHeight);
				if(newY > 0){
					scale = scale + percent;
					zIndex=10;
				}else{
					blur=Math.min(20 * percent,20)
				}
				this.$refs.filter.style[backdrop]=`blur(${blur}px)`;
				if(newY < this.minTranslateY){
					zIndex=10;
					this.$refs.bgImage.style.paddingTop=0;
					this.$refs.bgImage.style.height=`${RESERVED_HEIGHT}px`
					this.$refs.playBtn.style.display="none"
				}else{
					this.$refs.bgImage.style.paddingTop='70%';
					this.$refs.bgImage.style.height=0
					this.$refs.playBtn.style.display=""
				}
				 this.$refs.bgImage.style.zIndex = zIndex
				 this.$refs.bgImage.style[transform]=`scale(${scale})`;
			}
		},
		computed:{
			bgStyle(){
				return `background-image:url(${this.bgImage})`
			}
		},
		components:{
			Scroll,
			SongList,
			Loading
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	@import "~common/sass/variable";
	@import "~common/sass/mixin";
	.music-list{
		position:fixed;
		z-index:100;
		top:0;
		left:0;
		bottom:0;
		right:0;
		background:$color-background;
		.back{
			position:absolute;
			top:6px;
			left:6px;
			z-index:50;
			.icon-back {
		        display: block;
		        padding: 10px;
		        font-size: $font-size-large-x;
		        color:$color-theme-custom1;
		      }
		}
		.title{
			position:absolute;
			top:4px;
			left:10%;
			z-index:40;
			width:80%;
			@include no-wrap();
			text-align:center;
			line-height:45px;
			font-size:$font-size-large;
			color:$color-text;
		}
		.bg-image{
			position:relative;
			width:100%;
			padding-top:70%;
			transform-origin:top;
			background-size:cover;
			.filter{
				position:absolute;
				top:0;
				left:0;
				width:100%;
				height:100%;
				background:rgba(7,17,27,0.4);
			}
			.play-wrapper{
				position:absolute;
				bottom:20px;
				z-index:50;
				width:100%;
				.play{
					box-sizing:border-box;
					width:135px;
					padding:7px 0;
					margin:0 auto;
					text-align:center;
					border:1px solid $color-theme;
					color:$color-theme;
					border-radius:100px;
					font-size:0;
					.icon-play{
						display:inline-block;
						vertical-align:middle;
						margin-right:6px;
						font-size:$font-size-medium-x;
						color:$color-theme-custom1;
					}
					.text{
						display:inline-block;
						vertical-align:middle;
						font-size:$font-size-small;
					}
				}
			}
			
		}
		.list{
			position:absolute;
			top:0;
			bottom:0;
			width:100%;
			background:$color-background;
			/* overflow:hidden; */
			.song-list-wrapper{
				padding:20px 30px;
			}
		}
		.bg-layer{
			position:relative;
			height:100%;
			background:$color-background;
		}
	}
</style>