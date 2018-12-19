<template>
	<Scroll class="listview" 
	:data="data" 
	ref="listview" 
	:click="true" 
	:listenScroll="listenScroll"
	:probeType="probeType"
	@scroll="scroll"
	 >
		<ul>
			<li v-for="(group,index) in data" class="list-group" ref="listGroup">
				<h2 class="list-group-title">{{group.title}}</h2>
				<ul>
					<li v-for="(item,index) in group.items" class="list-group-item" @click="selectItem(item)">
						<img v-lazy="item.avatar" class="avatar"/>
						<span class="name">{{item.name}}</span>
					</li>
				</ul>
			</li>
		</ul>
		<div class="list-shortcart"  
		@touchstart.stop.prevent="onShortcutTouchStart"@touchmove.stop.prevent="onShortcutTouchMove">
			<ul>
				<li v-for="(item,index) in shotCatList" :data-index="index" class="item" :class="{'current':currentIndex===index}">
					{{item}}
				</li>
			</ul>
		</div>
		<div class="list-fixed" v-show="fixtitle" ref="fixed">
			<h1 class="fixed-title">{{fixtitle}}</h1>
		</div>
	</Scroll>
</template>
<script>
 import Scroll from 'base/scroll/scroll'
 import {getData} from "common/js/dom"
 const ANCHOR_HEIGHT=18;  //每个锚点的高度
 const TITLE_HEIGHT=30;
export default{
	data(){
		return {
			//观测实时滚动的位置
			scrollY:-1,
			currentIndex:0,
			diff:-1
		}
	},
	created(){
		//因为不需要监听touch,所以不需要放到data中
		this.touch={}
		this.listenScroll=true
		//保存所有goup的高度值
		this.listHeight=[]
		this.probeType=3
	},
	props:{
		data:{
			type:Array,
			default:[]
		}
	},
	methods: {
		onShortcutTouchStart(e){
			//获取具体描点的index值
			let anchorIndex=getData(e.target, 'index');
			let firstTouch=e.touches[0];   //记录手指第一次触摸
			this.touch.y1=firstTouch.pageY;//手指第一次触摸的纵坐标值
			//记录当前的点击索引
			this.touch.anchorIndex=anchorIndex;
			this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex],0);
			this._scrollTo(anchorIndex);

		},
		onShortcutTouchMove(e){
			let firstTouch=e.touches[0];
			this.touch.y2=firstTouch.pageY;//手指最终的纵坐标
			//|0相当于Math,floor，计算一共滑动了几个锚点
			let delta=(this.touch.y2-this.touch.y1)/ANCHOR_HEIGHT|0;
			let anchorIndex=parseInt(this.touch.anchorIndex)+delta;
			this._scrollTo(anchorIndex);
		},
		//singer将要调用此refresh
		refresh(){
			this.$refs.listview.refresh();
		},
		//派发的列表滚动事件

		scroll(pos){
			this.scrollY=pos.y;  //better-scroll实时滚动的距离

		},
		//计算每个group的高度,当传给listview的data发生变化时计算，所以需要watch监听
		_calcullateHight(){
			this.listHeight=[];;
			const list=this.$refs.listGroup;
			let height=0;
			this.listHeight.push(height);
			for(let i=0;i<list.length;i++){
				let item=list[i];
				height+=item.clientHeight;
				this.listHeight.push(height);
			}
		},
		_scrollTo(index){
			if(!index&&index!==0){
				return;
			}
			if(index < 0){
				index = 0;
			}else if(index > this.listHeight.length-2){
				index = this.listHeight.length-2;
			}
			this.scrollY=-this.listHeight[index];
			this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0);
		},
		selectItem(item){
			this.$emit("select",item);
		}
	},
	watch:{
		//监听data的变化，延时保证dom完全渲染
		data(){
			setTimeout(() => {
				this.$nextTick(() => {
					//dom渲染后计算高度
					this._calcullateHight();
				})
			},20)
		},
		scrollY(newY){

			const listHeight=this.listHeight;
			//1.当滚动到顶部，newY>0
			if(newY>0){
				this.currentIndex=0;
				return;
			}
			//在中间部分滚动
			for(let i=0;i<listHeight.length-1;i++){
				let height1=listHeight[i]
				let height2=listHeight[i+1]
				if(-newY>=height1&&-newY<height2){
					this.currentIndex=i;
					this.diff= height2 + newY;
					//console.log(this.currentIndex);
					return;
				}
			}
			//当滚动到底部，且-newY>最后一个元素的上线
			this.currentIndex=listHeight.length-2;
		},
		diff(newVal){
			let fixedTop=(newVal > 0 && newVal < TITLE_HEIGHT) ? newVal-TITLE_HEIGHT : 0
			//因为diff实时变化
			if(this.fixedTop===fixedTop){
				return;
			}
			this.fixedTop=fixedTop;
			this.$refs.fixed.style.transform=`translate3d(0,${fixedTop}px,0)`
		}
	},
	components:{
		Scroll
	},
	//得到字母列表的数组
	computed:{
		shotCatList(){
			return this.data.map((group) => {
				return group.title.substr(0,1);
			})
		},
		fixtitle(){
			if(this.scrollY > 0){
				return ""
			}
			return this.data[this.currentIndex] ? this.data[this.currentIndex].title : "";
		}
	}
}
</script>
<style lang="scss" rel="stylesheet/scss">
@import "~common/sass/variable";
.listview{
	position:relative;
	width:100%;
	height:100%;
	overflow:hidden;
	background:$color-background;
	.list-group{
		padding-bottom:30px;
		.list-group-title{
			height:30px;
			line-height:30px;
			padding-left:20px;
			font-size: $font-size-small;
        	background: $color-highlight-background;
		}
		.list-group-item{
			display:flex;
			align-items:center;
			padding:20px 0 0 20px;
			.avatar{
				width:50px;
				height:50px;
				border-radius:50%;
			}
			.name{
				margin-left:20px;
				color:$color-text-l;
				font-size: $font-size-medium;
			}
		}
	}
	.list-shortcart{
		position:absolute;
		z-index:30;
		right:0;
		top:50%;
		transform:translateY(-50%);
		text-align:center;
		font-family: Helvetica;
		.item{
			padding:6px 16px 0;
			line-height:1;
			color:$color-text-l;
			color: hsla(0, 0%, 100%, .5);
			font-size:$font-size-small;
			&.current{
				color:orange;
			}
		}
	}
	.list-fixed{
		position:absolute;
		top:-1px;
		left:0;
		width:100%;
		.fixed-title{
			height:30px;
			line-height:30px;
			padding-left:20px;
			font-size:$font-size-small;
			background:$color-highlight-background;
		}
	}
}
</style>