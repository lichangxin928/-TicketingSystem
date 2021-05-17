电影售票系统：
	1.0 版本：
		基本的用户登录与注册功能，用户通过输入账号和密码进入电影售票系统主页，能够对首页中的电影进行
		买票，管理员登录，能实现对电影的基本管理功能。

		views文件夹：各个页面的 html 文件
		public文件夹：公共的文件

		views/user_login.html 用户登录页面
		views/menu.html 主界面菜单

		public/ 公用的资源，设涉及到图片文件，css 文件，js 文件，框架依赖等等

		package.json 在创建项目时自动生成的对项目引用的 node 的包的介绍以及大致框架
		package-lock.json 项目包的相互依赖介绍

		main.js 为后端程序的入口，通过 node 平台启动服务器，让前端平台能够访问
		