#主要技术栈
**【前端】**
- vue:用于构建用户界面的渐进式框架，通常被称为MVVM型框架，核心是**数据驱动**和**组件化**思想
![markdown](https://img-blog.csdn.net/20180403110035670 "markdown")
- 组件化：把页面抽象成多个相对独立的模块，实现代码重用，提高开发效率和代码质量，使代码易于维护
- ES6：项目中用到解构赋值，promise,Class，模块化，数组新特性，很好用
- vue-router:为单页应用提供路由系统，项目中使用路由懒加载方式进行异步加载性能优化。
- vuex:专门为vue.js应用程序开发的状态管理模式，集中式存储管理应用所有组件的共享状态，一般用于较复杂的中大型项目。

------------


	项目中的vuex结构，当给vuex定义数据时，通常修改以下数据
	1>state   （想清楚原始数据是什么，即跟组件，模块，项目相关的一些数据，一般是底层数据）
	2>getters （对数据的一些映射，可以是些函数，这些函数类似于计算属性，根据state的不同值计算新的值，）
	3>mutations-types （定义那些修改的动作，通常定义为字符串常量）
	4>mutations （修改数据的逻辑，本质是些函数，函数名是mutation-types中定义的值，通常带两个参数，第一个是state,第二个是要修改的对象，去修改state中的值）
	5>actions通常有两种情况下使用（异步操作和对mutations的封装）

------------


- better-scroll:是移动端页面滚动体验更加流畅，轮播图也采用此插件
- vue-lazyload：图片懒加载插件，提高图片加载的效率。
- Sass(scss):css预处理器，其中可多次调用函数解决代码冗余问题。
**【后端】**
- Node.js:利用Express启用数据抓取的本地服务器端代理，请求接口数据
-JSONP:服务器端通讯，跨域抓取数据（后边一致使用axios赚取数据）
axios:服务器端通讯，结合node.js后端代理请求，赚取QQ音乐移动端数据。
**【自动化构建及移动端常用工具】**
- vue-cli:Vue的脚手架工具，快速初始化项目代码，以及webpack的配置
- vconsole:移动端调试工具，可在控制台打印相关日志
-charies:移动端抓包工具（pc端可用Fiddler）

# 项目页面：
- 主要页面：播放器内核页、推荐页、歌单详情页、歌手页、歌手详情页、排行页、搜索页、添加歌曲页、个人中心页等。
- 核心页面：播放器内核页
# 项目结构
![markdown](https://raw.githubusercontent.com/nanyang24/music-vue/master/img/dir.png "markdown")
# 项目构建
1. npm install vue-cli -g
2. Vue init webpack MyProject（请使用vue-init webpack  my-project）
3. 进入项目目录my-project
4. npm install --production
5. npm run dev
详细教程请看：https://www.jianshu.com/p/8914bb679347
bay

















