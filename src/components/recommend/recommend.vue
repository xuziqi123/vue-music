<template>
	<div class="recommend" ref="recommend">
		<scroll ref="scroll" class="recommend-content" :data="discList">
			<div>
		<!-- 让slider和列表都要滚动，所以需要一个盒子包裹他们 -->
				<div v-if="recommends.length" class="slider-wrapper">
					<slider>
						<!-- 填写插槽中的内容 -->
						<div v-for="item in recommends">
							<a :href="item.linkUrl">
								<img @load="loadImage()" :src="item.picUrl"/>
							</a>
						</div>
					</slider>
				</div>
				<div class="recommend-list">
					<h1 class="list-title">热门歌单推荐</h1>
					<ul>
						<li  v-for="(item,index) in discList" @click="selectItem(item)" class="item">
							<div class="icon">
								<img width="60" height='60' v-lazy="item.imgurl"/>
							</div>
							<div class="text">
								<!-- 用v-html -->
								<h2 class="name" v-html="item.creator.name"></h2>
								<p class="desc" v-html="item.dissname"></p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="loading-container" v-show="!discList.length">
				<loader></loader>
			</div>
		</scroll>
		<router-view></router-view>
	</div>
</template>
<script>
import scroll from "base/scroll/scroll"
import slider from "base/slider/slider"
import loader from "base/loading/loading"
import {getRecommend,getDiscList} from "api/recommend"
import {ERR_OK} from "api/config"
import {playlistMixin} from "common/js/mixin"
import {mapMutations} from "vuex"
export default{
	mixins:[playlistMixin],
	data(){
		return {
			recommends:[],
			discList:[]
		}
	},
	created(){
		this._getRecommend();
		this._getDiscList();
	},
	methods:{

		handlePlaylist(playList){
			const bottom = playList.length > 0 ? "60px" :0
			this.$refs.recommend.style.bottom=bottom;
			this.$refs.scroll.refresh();
		},
		_getRecommend(){
			getRecommend().then((res) => {
				if(res.code===ERR_OK){
					this.recommends=res.data.slider;

				}
			});
		},
		_getDiscList(){
			
			getDiscList().then((res) => {
				if(res.code===ERR_OK){
					this.discList=res.data.list;
					console.log("----------------------");
					console.log(res.data.list);
					console.log("----------------------");
				}
			})
		},
		selectItem(item) {
			console.log(item);
	        this.$router.push({
	          path: `/recommend/${item.dissid}`
	        });
	        this.setDisc(item);
      	},
		loadImage(){
			if(!this.checkLoaded){
				this.$refs.scroll.refresh();
				this.checkLoaded=true;  //设置标记位，然此逻辑执行一次
			}
		},
		...mapMutations({
			setDisc:'SET_DISC'

			})

	},
	components:{
		slider,
		scroll,
		loader
	}
}
</script>
<style lang="scss" rel="stylesheet">
@import "~common/sass/variable";
.recommend{
	position:fixed;
	width:100%;
	top:88px;
	bottom:0;
	.recommend-content{
		height:100%;
		overflow:hidden;
		.slider-wrapper{
			position:relative;
			width:100%;
			overflow:hidden;
		}
	}
	.recommend-list{
		.list-title{
			height:60px;
			line-height:60px;
			text-align:center;
			font-size:$font-size-medium-x;
			color: $color-theme;
		}
		.item{
			display:flex;
			box-sizing:border-box;
			align-items:center;
			padding:10px 15px;
			margin:20px 10px;
			box-shadow:1px 1px 2px #56f5e2,1px 1px 2px #56ddf5;
			border-radius:6px;
			&:first-child{
				margin-top:0;
			}
			.icon{
				flex:0 0 60px;
				width:60px;
				padding-right:20px;
				img{
					border-radius:4px;
				}
			}
			.text{
				display:flex;
				flex-direction:column;
				justify-content:center;
				flex:1;
				line-height:20px;
				over-flow:hidden;
				font-size:$font-size-medium;
				.name{
					margin-bottom:10px;
					color:$color-text;
				}
				.desc{
					color:$color-text-d;
				}
			}
		}
	}
	.loading-container{
		position:absolute;
		width:100%;
		top:50%;
		transform:translateY(-50%);
	}
}
</style>