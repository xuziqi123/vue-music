<template>
	<div class="no-result">
		<div class="no-result-icon"></div>
		<p class="no-result-text">{{title}}</p>
	</div>
</template>
<script>
	export default{
		props:{
			title:{
				type:String,
				default:''
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	@import "~common/sass/variable";
	@import "~common/sass/mixin";
	.no-result{
		text-align:center;
		.no-result-icon{
			width:86px;
			height:86px;
			margin:0 auto;
			@include bg-img('no-result');
			background-size:86px 86px;
		}
		.no-result-text{
			margin-top:30px;
			font-size:$font-size-medium;
			color:$color-text-d;
		}

	}
</style>