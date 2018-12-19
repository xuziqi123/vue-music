<template>
	<div class="search-box">
		<i class="icon-search"></i>
		<input ref="query" class="box" v-model="query" :placeholder="placeholder"/>
		<i @click="clear" v-show="query" class="icon-dismiss"></i>
	</div>
</template>
<script>
import {debounce} from "common/js/util"
	export default{
		props:{
			placeholder:{
				type:String,
				default:'搜索歌手、歌词'
			}
		},
		data(){
			return{
				query:''
			}
		},
		methods:{
			clear(){
				this.query=""
			},
			setQuery(query){
				this.query=query;
			},
			blur(){
				this.$refs.query.blur();
			}
		},
		created(){
			//对输入内容做节流操作
			this.$watch("query",debounce((newQuery) => {
				this.$emit('query',newQuery);
			},200))
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	@import "~common/sass/variable";
	.search-box{
		display:flex;
		align-items:center;
		box-sizing:border-box;
		width:100%;
		padding:0 6px;
		height:40px;
		background:$color-highlight-background;

		border-radius:6px;
		.icon-search{
			font-size:24px;
			color:$color-background2;
		}
		.box{
			flex:1;
			margin:0 5px;
			line-height:18px;
			background:$color-highlight-background;
			color:$color-text;
			border:none;
			border-bottom:1px solid #6ededd;
			font-size:$font-size-medium;
			&::placeholder{
				color:$color-text-d;
			}

		}
		.icon-dismiss{
			font-size:16px;
			color:$color-background2;
		}
	}
</style>