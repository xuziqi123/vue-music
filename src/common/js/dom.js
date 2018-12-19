//常用的添加样式操作
export function addClass(el,className){
	if(hasClass(el,className)){
		return;
	}
	//下面三句等价于：el.classList.add(className)
	let newClass=el.className.split('');
	newClass.push(className);
	el.className=newClass.join(" ");
}
export function hasClass(el,className){
	let reg=new RegExp('(^|\\s)'+className+'(\\s|$)');
	return reg.test(el.className);
}
//获取自定义属性函数
export function getData(el,name,val){
	const prefix="data-";
	name=prefix+name;
	if(val){
		return el.setAttribute(name,val)
	}else{
		return el.getAttribute(name)
	}
}

let elementStyle=document.createElement('div').style;

let vendor = (() => {
	let transformNames={
		webkit:'webkitTransform',
		Moz:'MozTransform',
		O:'Otransform',
		ms:'msTransform',
		standard:'transform'
	}

	for(let key in transformNames){
		if(elementStyle[transformNames[key]] !== undefined){
			return key;
		}
	}
	return false;
})()

export function prefixStyle(style){
	if(vendor ===false){
		return false;
	}

	if(vendor === 'standard'){
		return style;
	}
	return vendor + style.charAt(0).toUpperCase() +style.substr(1)
}