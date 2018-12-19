<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot>
				
			</slot>
		</div>
		<div class="dots">
			<span class="dot" v-for="(item,index) in dots" :class="{active:index===currrentPageIndex}"></span>
		</div>
	</div>
</template>
<script>
import BScroll from "better-scroll";
import {addClass} from "common/js/dom";
	export default{
		data(){
			return{
				dots:[],
				currrentPageIndex:0
			}
		},
		props:{
			loop:{
				type:Boolean,
				default:true
			},
			autoPlay:{
				type:Boolean,
				default:true
			},
			interval:{
				type:Number,
				default:3000
			}
		},
		mounted(){
			//保证dom成功渲染的延时
			setTimeout(()=>{
				this._setSliderWidth();
				this._initSlider();
				this._initDots();
				if(this.autoPlay){
					this._play();
				}
				window.addEventListener('resize',()=>{
					if(!this.scroll||!this.scroll.enabled){
						return;
					}
					this._setSliderWidth(true);
					this.scroll.refresh();
					//clearTimeout(this.resizeTimer);
					// this.resizeTimer=setTimeout(()=>{
					// 	if(this.scroll.isInTansition){
					// 		this.currentPageIndex = this.scroll.getCurrentPage().pageX
					//         if (this.autoPlay) {
					//           this._play()
					//         }
					// 	}else{
					// 		if (this.autoPlay) {
					//           this._play()
					//         }
					// 	}
					// },60)
				})

			},20)
		},
		methods:{
			//因为是横向滚动，计算宽度
			_setSliderWidth(isResize){
				this.children=this.$refs.sliderGroup.children;
				let width=0;
				//视口的宽度和每个元素的宽度相同
				let sliderWidth=this.$refs.slider.clientWidth;
				for(let i=0;i<this.children.length;i++){
					let child=this.children[i]; 
					addClass(child,"slider-item");
					child.style.width=sliderWidth+"px";
					width+=sliderWidth;
				}
				//如果循环为true石，为了保证无缝滚动，需要左右两边加宽两个元素
				if(this.loop && !isResize){
					width+=2*sliderWidth;
				}
				this.$refs.sliderGroup.style.width=width+"px";

			},
			_initSlider(){
				this.scroll=new BScroll(this.$refs.slider,{
					scrollX:true,
					scrollY:false,
					momentum:false,//惯性
					snap:{
						loop:this.loop,
						threshold:0.3,
						speed:40
					},
					
				});
				this.scroll.on("scrollEnd",()=>{
					let pageIndex=this.scroll.getCurrentPage().pageX;
					// if(this.loop){
					// 	pageIndex-=1;
					// }
					this.currrentPageIndex=pageIndex;
					if(this.autoPlay){
						clearTimeout(this.timer);
						this._play();
					}
				})
			},
			_initDots(){
				this.dots=new Array(this.children.length-2)
			},
			_play(){
				clearTimeout(this.timer);
				this.timer=setTimeout(()=>{
					this.scroll.next();
				},this.interval)
			}
		},
		destroyed(){
			clearTimeout(this.timer);
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
//切记，scss中引入文件后一定要加分号；不然会被坑死哒
@import "~common/sass/variable";
.slider {
	min-height:1px;
	.slider-group{
		position:relative;
		overflow:hidden;
		white-space:nowrap;
		 .slider-item {
	        float: left;
	        box-sizing: border-box;
	        overflow: hidden;
	        text-align: center;
			a{
				display:block;
				width:100%;
				overflow:hidden;
				text-decoration:none;
			}
			img{
				display:block;
				width:100%;
			}
		}
	}
	.dots{
		position:absolute;
		right:0;
		left:0;
		bottom:12px;
		transform:translateZ(1px);
		text-align:center;
		font-size:0;
		.dot{
			display:inline-block;
			margin:0 4px;
			width:8px;
			height:8px;
			border-radius:50%;
			background:$color-text-l;
			&.active{
				width:20px;
				border-radius:5px;
				background:$color-text-ll;
			}
		}
	}
}

</style>