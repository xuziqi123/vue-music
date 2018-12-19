import storage from "good-storage";
const SEARCH_KEY = '__search__';
const SEARCH_MAX_LENGTH=15;

const PLAY_KEY="__play__";
const PLAY_MAX_LENGTH=200;

const FAVORITE_KEY="__favorite__";
const FAVORITE_MAX_LENGTH=200;
function insertArray(arr,val,compare,maxLen){
	const index=arr.findIndex(compare);
	if(index === 0){
		return;
	}
	if(index > 0){
		arr.splice(index,1);
	}
	arr.unshift(val);
	if(maxLen&&arr.length > maxLen){
		arr.pop();
	}
}

export function saveSearch(query){
	let searches=storage.get(SEARCH_KEY,[]);
	insertArray(searches,query,(item) => {
		return item === query;
	},SEARCH_MAX_LENGTH);
	storage.set(SEARCH_KEY,searches);
	return searches;
}
//删除搜索历史的操作
function deleteFromArray(arr,compare){
	const index=arr.findIndex(compare);
	if(index > -1){
		arr.splice(index,1);
	}
}

//从本地缓存读取数据，并更改hisstorySearch
export function loadSearch(){
	//默认为空数组
	return storage.get(SEARCH_KEY,[])
}
export function deleteSearch(query){
	let searches=storage.get(SEARCH_KEY,[]);
	deleteFromArray(searches,(item) => {
		return item === query;
	})
	//保存数据
	storage.set(SEARCH_KEY,searches);
	return searches;
}
//清除所有数据
export function clearSearch(){
	storage.remove(SEARCH_KEY);
	return [];
}

//保存当前播放歌曲
export function savePlay(song){
	let songs=storage.get(PLAY_KEY,[]);
	insertArray(songs,song,(item) => {
		return item === song;
	},PLAY_MAX_LENGTH);
	storage.set(PLAY_KEY,songs);
	return songs;
}
//读取保存的歌曲
export function loadPlay(){
	return storage.get(PLAY_KEY);
}

export function saveFavorite(song){
	let songs=storage.get(FAVORITE_KEY,[]);
	insertArray(songs, song,(item) => {
		return song.id===item.id;
	},FAVORITE_MAX_LENGTH);
	storage.set(FAVORITE_KEY,songs);
	return songs;
}

export function deleteFavorite(song){
	let songs=storage.get(FAVORITE_KEY,[]);
	deleteFromArray(songs,(item) => {
		return song.id===item.id;
	})
	storage.set(FAVORITE_KEY,songs);
	return songs;
}

export function loadFavorite(){
	return storage.get(FAVORITE_KEY,[])
}