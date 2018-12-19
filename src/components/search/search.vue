<template>
	<div class="search">
		<div class="search-box-wrapper">
			<SearchBox  ref="searchBox" @query="onQueryChange"></SearchBox>
		</div>
		<div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
			<scroll class="shortcut" :refreshDelay="refreshDelay" :data="shortcut" ref="shortcut">
				<div class="shorcut_con">
					<div class="hot-key">
						<h1 class="title">热门搜索</h1>
						<ul>
							<li class="item" v-for="item in hotkey" @click="addQuery(item.k)">
								<span>{{item.k}}</span>
							</li>
						</ul>
					</div>
					<div class="search-history" v-show="searchHistory && !query">
						<h1 class="title">
							<span class="text">搜索历史</span>
							<span class="clear" @click="showConfirm"><i class="icon-clear"></i></span>
						</h1>
						<SearchList @select="addQuery" @delete="deleteOne" :searches="searchHistory"></SearchList>
					</div>
				</div>
			</scroll>
		</div>
		<div ref="searchResult" class='search-result' v-show="query">
			<Suggest ref="suggest" @select="saveSearch" @listScroll="blurInput" :query="query"></Suggest>
		</div>
		<confirm ref="confirm" text="是否清空所有搜索历史" @confirm="clearSearchHistory"></confirm>
		<router-view></router-view>
	</div>
</template>
<script>
import SearchBox from "base/search-box/search-box"
import {getHotKey} from "api/search"
import {ERR_OK} from "api/config"
import Suggest from  "components/suggest/suggest"
import {mapActions,mapGetters} from "vuex"
import SearchList from "base/search-list/search-list"
import Confirm from "base/confirm/confirm"
import Scroll from "base/scroll/scroll"
import {playlistMixin,searchMixin} from "common/js/mixin"
	export default{
		mixins:[playlistMixin,searchMixin],
		data(){
			return {
				hotkey:[]
			}
		},
		components:{
			SearchBox,
			Suggest,
			SearchList,
			Confirm,
			Scroll
		},
		computed:{
			shortcut(){
				return this.hotkey.concat(this.searchHistory);
			}
			
		},
		created(){
			this._getHotKey();
		},
		methods:{
			handlePlaylist(playlist){
				const bottom=playlist.length>0 ? "60px" : "";
				this.$refs.shortcutWrapper.style.bottom=bottom;
				this.$refs.shortcut.refresh();
				this.$refs.searchResult.style.bottom=bottom;
				//this.$refs.suggest.refresh();
			},
			refresh(){
				//实际则调用的是suggest组件中的scroll组件的refresh方法。
				this.$refs.suggest.refresh();
			},
			
			_getHotKey(){
				getHotKey().then((res) => {
					if(res.code === ERR_OK){
						this.hotkey=res.data.hotkey.slice(0,10);
					}
				})
			},
			showConfirm(){
				this.$refs.confirm.show();
			},
			deleteOne(item){
				this.deleteSearchHistory(item);
			},
			
			clearSearch(){
				this.clearSearchHistory();
			},
			...mapActions([
				'clearSearchHistory'
				]),
			
		},
		watch:{
			query(newQuery){
				if(!newQuery){
					setTimeout(() => {
						this.$refs.shortcut.refresh();
					})
				}
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet">
	@import "~common/sass/variable";
	@import "~common/sass/mixin";
	.search {
	    .search-box-wrapper {
	      margin: 20px;
	    }
	    .shortcut-wrapper {
	      position: fixed;
	      top: 178px;
	      bottom: 0;
	      width: 100%;
	      .shortcut {
	        height: 100%;
	        overflow: hidden;
	        .hot-key {
	          margin: 0 20px 20px 20px;
	          .title {
	            margin-bottom: 20px;
	            font-size: $font-size-medium;
	            color: $color-text-l;
	          }
	          .item {
	            display: inline-block;
	            padding: 5px 10px;
	            margin: 0 20px 10px 0;
	            border-radius: 6px;
	            background: $color-input-custom;
	            font-size: $font-size-medium;
	            color: $color-text-d;
	          }
	        }
	        .search-history {
	          position: relative;
	          margin: 0 20px;
	          .title {
	            display: flex;
	            align-items: center;
	            height: 40px;
	            font-size: $font-size-medium;
	            color: $color-text-l;
	            .text {
	              flex: 1;
	            }
	            .clear {
	              @include extend-click();
	              .icon-clear {
	                font-size: $font-size-medium;
	                color: $color-text-d;
	              }
	            }
	          }
	        }
	      }
	    }
	    .search-result {
	      position: fixed;
	      width: 100%;
	      top: 178px;
	      bottom: 0;
	    }
  }
</style>