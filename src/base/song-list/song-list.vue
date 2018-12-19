<template>
	<div class="song-list">
		<ul>
			<li @click="selectItem(song,index)" v-for="(song,index) in songs" class="item">
				<div class="rankCls" v-show="rank">
					<span :class="getRankCls(index)">{{getRankText(index)}}</span>
				</div>
				<div class="content">
					<h2 class="name">{{song.name}}</h2>
					<p class="desc">{{getDesc(song)}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
export default{
	 props:{
	 	songs:{
	 		type:Array,
	 		default: []
	 	},
	 	rank:{
	 		type:Boolean,
	 		default:false
	 	}
	 },
	 methods:{
	 	getDesc(song){
	 		return `${song.singer}·${song.ablum}`
	 	},
	 	//派发事件给调用该组件的music-list
	 	selectItem(item,index){
	 		this.$emit("select",item,index)
	 	},
	 	getRankCls(index){
	 		if(index <= 2){
	 			return `icon icon${index}`
	 		}else {
	 			return `text`
	 		}
	 	},
	 	getRankText(index){
	 		if(index>2){
	 			return index+1;
	 		}
	 	}
	 }
}	
</script>
<style lang="scss" rel="stylesheet/scss">

@import "~common/sass/variable";
@import "~common/sass/mixin";
.song-list{
	.item{
		display:flex;
		align-items:center;
		box-sizing:border-box;
		height:64px;
		font-size:$font-size-medium;
		.rankCls{
			flex:0 0 25px;
			width:25px;
			margin-right:30px;
			text-align:center;
			.text{
				color:orange;
				font-size:18px;
			}
			.icon{
				display:inline-block;
				width:25px;
				height:25px;
				background-size:100% 100%;
				&.icon0{
					@include bg-img('first');
				}
				&.icon1{
					@include bg-img("second")
				}
				&.icon2{
					@include bg-img('third');
				}
			}
		}
		.content{
			flex:1;
			line-height:20px;
			overflow:hidden;
			
			.name{
				@include no-wrap();
				color:$color-text;
			}
			.desc{
				@include no-wrap();
				margin-top:4px;
				color:$color-text-d;
			}
		}
	}
}	
</style>