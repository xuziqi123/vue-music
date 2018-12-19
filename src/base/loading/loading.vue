<template>
	<div class="loading">
		<img src="./loading.gif" width="18" height="18"/>
		<p class="desc">{{title}}</p>
	</div>
</template>
<script>
	export default{
		props:{
			title:{
				type:String,
				default:"正在加载..."
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	 @import "~common/sass/variable";
	 .loading{
	 	width:100%;
	 	text-align:center;
	 	.desc{
	 		line-height: 20px;
	        font-size: $font-size-small;
	        color: $color-text-l;
	 	}
	 }
</style>