<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>
<script>
import BScroll from "better-scroll"
export default{
	props:{
		probeType:{
			type:Number,
			default:1
		},
		click:{
			type:Boolean,
			default:true
		},
		data:{
			type:Array,
			default:null
		},
		listenScroll:{
			type:Boolean,
			default:false
		},
		//上拉刷新操作
		pullup:{
			type:Boolean,
			default:false
		},
		//处理移动端滚动时键盘收起
		beforeScroll:{
			type:Boolean,
			default:false
		},
		refreshDelay:{
			type:Number,
			default:20
		}
	},
	mounted(){
		setTimeout(() => {
			this._initScroll();	
			this.refresh();
		},20);
	},
	methods:{
		_initScroll(){
			if(!this.$refs.wrapper){
				return;
			}
			this.scroll=new BScroll(this.$refs.wrapper,{
				probeType:this.probeType,
				click:this.click
			})
			if(this.listenScroll){
				let me=this; //保留vue实例的this,默认指向better-scroll的scroll
				this.scroll.on("scroll",(pos) => {
					me.$emit("scroll",pos);
				})
			}
			//上拉刷新逻辑
			 if (this.pullup) {
	          this.scroll.on('scrollEnd', () => {
	            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
	              this.$emit('scrollToEnd') // 满足这个条件，就是滚动到底部了
	            }
	          })
	        }

	        if(this.beforeScroll){
	        	this.scroll.on("beforeScrollStart",() => {
	        		this.$emit('beforeScroll');
	        	})
	        }
		},
		//代理方法,可以在这里扩展其他方法
		enable(){
			this.scroll && this.scroll.eanable();
		},
		disable(){
			this.scroll && this.scroll.disable();
		},
		refresh(){
			this.scroll && this.scroll.refresh();
		},
		scrollTo(){
			this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
		},
		scrollToElement(){
			this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
		}
	},
	watch:{
		//监听data发生变化时，重新刷新
		data(){
			setTimeout(()=>{
				this.refresh();
			},this.refreshDelay)
		}
	}

}
</script>
<style lang='scss' rel="stylesheet/scss">
	
</style>