/*洗牌函数的封装*/
function getRandom(min,max){
	return Math.floor(Math.random() * (max - min +1) + min);
}
export function shuffle(arr){
	//不修改原数组
	let _arr=arr.slice();
	for(let i=0;i<_arr.length;i++){
		let j=getRandom(0,i);
		let t=_arr[i];
		_arr[i]=_arr[j];
		_arr[j]=t;
	}
	return _arr;
}
//节流函数:原理：对某个函数做节流，返回一个新的函数，那这个新的函数就会延迟执行我们要节流的函数func
export function debounce(func,delay){
	let timer;
	return function(...args){
		if(timer){
			clearTimeout(timer);
		}
		timer=setTimeout(() => {
			func.apply(this,args)
		},delay)
	}
}