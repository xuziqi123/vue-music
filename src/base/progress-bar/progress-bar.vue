<template>
	<div class="progress-bar" ref="progressBar" @click="progressClick">
		<div class="bar-inner">
			<div class="progress" ref="progress"></div>
			<div class="progress-btn-wrapper" ref="progressBtn"
				@touchstart.prevent="progressTouchStart"
				@touchmove.prevent="progressTouchMove"
				@touchend.prevent="progressTouchEnd"
			>
				<div class="progress-btn"></div>
			</div>
		</div>
	</div>
</template>
<script>
import {prefixStyle} from "common/js/dom"
const progressBtnWidth=16;
const transform=prefixStyle('transform')
	export default {
		props:{
			percent:{
				type:Number,
				default:0
			}
		},
		created(){
			this.touch={}   // 作用是为 Btn 的三个 touch 事件传递共享数据
		},
		methods:{
			progressTouchStart(e){
				this.touch.initiated = true
				this.touch.startX=e.touches[0].pageX;
				//记录按钮的偏移位置，即进度条的宽度
				this.touch.left=this.$refs.progress.clientWidth;
			},
			progressClick(e){
				//当我们点击progressBtn的时候，e.offsetX获取不对
				const rect=this.$refs.progressBar.getBoundingClientRect();
				const offsetWidth=e.pageX-rect.left;
				this._offset(offsetWidth)
				//this._offset(e.offsetX);
				this._triggerPercent();
			},
			progressTouchMove(e){
				if(!this.touch.initiated){
					return;
				}
				//拖动的距离
				const deltaX=e.touches[0].pageX - this.touch.startX;
				//偏移量(已播放的进度长度 + 手指移动的偏移量)，要大于0，但是总和不能大于整体宽度
				const offsetWidth=Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth,Math.max(0,this.touch.left + deltaX));
				this._offset(offsetWidth)
			},
			progressTouchEnd(){

				this.touch.initiated = false;
				this._triggerPercent();
			},
			_triggerPercent(){
				const barWidth=this.$refs.progressBar.clientWidth-progressBtnWidth;
				const percent = this.$refs.progress.clientWidth / barWidth;
				this.$emit("percentChange",percent);
			},
			_offset(offsetWidth){
				this.$refs.progress.style.width=`${offsetWidth}px`;
				this.$refs.progressBtn.style[transform]=`translate3d(${offsetWidth}px,0,0)`
			}

		},
		watch:{
			percent(newPercent){

				//没有被拖动的时候进度条变化，防止拖动干扰
				if( newPercent >= 0 && !this.touch.initiated){
					const barWidth=this.$refs.progressBar.clientWidth-progressBtnWidth;
					const offsetWidth=newPercent * barWidth;
					this._offset(offsetWidth);

				}
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
@import "~common/sass/variable";
.progress-bar{
	height:30px;
	.bar-inner{
		position:relative;
		top:13px;
		height:4px;
		background:rgba(0,0,0,0.3);
		.progress{
			position:absolute;
			height:100%;
			background:$color-theme;
		}
		.progress-btn-wrapper{
			position:absolute;
			left:-8px;
			top:-13px;
			width:30px;
			height:30px;
			.progress-btn{
				position:relative;
				left:7px;
				top:7px;
				box-sizing:border-box;
				width:15px;
				height:16px;
				border:3px solid $color-text;
				border-radius:50%;
				background:#39ebf5e3;
			}
		}
	}
}
</style>