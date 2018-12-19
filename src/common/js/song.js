//获取歌曲的数据，使用工厂模式
/*工厂模式的使用场景
@1.对象的构造十分复杂
@2.需要依赖具体的环境创建不同实例
@3.处理大量具有相同属性的小对象

*/
import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'
export  class Song{
	//参数比较多的时候可以传一个对象
	constructor({id,mid,singer,name,ablum,duration,image,url}){
		this.id=id;
		this.mid=mid;
		this.singer=singer;
		this.name=name;
		this.ablum=ablum;
		this.duration=duration;
		this.image=image;
		this.url=url;
	}

	getLyric() {
	//防止多次请求，获取歌词
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then(res => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }

};
//遍历获取的数据，创建song 的对象,因为musicData数据类似，所以抽象出来
export function creatSong(musicData){
	return new Song({
		id:musicData.songid,
		mid:musicData.songmid,
		singer:filterSinger(musicData.singer),
		name:musicData.albumname,
		ablum:musicData.albumid,
		duration:musicData.interval,
		image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
		url:`http://isure.stream.qqmusic.qq.com/C400003aAYrm3GE0Ac.m4a?guid=735546645&vkey=9A77E3DD0B5ECCCAEDC739FE478F61C8E64A77B1455507140C85503D3898733146F3E67EF09E009429BEFE22CCE497AF9538077633A41ED0&uin=0&fromtag=66`
	})
}

//歌手
export function filterSinger(singer){
	let ret=[];
	if(!singer){
		return;
	}
	singer.forEach((s) => {
		ret.push(s.name);
	});
	return ret.join("/");
}