# node-widget-pc

基于node开发的pc版的js组件库。注意，里面的任何代码没有掺杂css样式。

具体使用方式请查见：https://github.com/zmrdlb/node-coreui-pc

# 目录及组件说明

## lib - 通过http方式引用的js第三方库

- jquery.js

- polyfill.js

## ui - 构建ui或与ui交互的js组件

- layer - 存放各种层

  - layer.js: 基本层类
  
  - bombLayer.js: 弹层类
  
  - alert.js: 内容区+单个按钮的alert模拟层类
  
  - confirm.js: 内容区+两个按钮的confirm模拟层类
  
  - baseControl.js: 基本的弹层工厂控制器，不可直接使用，只可子类继承后使用。应用场景：针对频繁更改弹层里某些节点的内容，以及更改点击按钮后的回调事件。
  
  - alertControl.js: alert的工厂控制器，继承baseControl。应用场景：针对简单alert弹层，频繁更改弹层里某些节点的内容，以及更改点击"确定"按钮后的回调事件。
    如果是更复杂的交互建议使用layers.alert或layers.bombLayer
    
  - confirmControl.js: confirm的工厂控制器，集成baseControl。应用场景：针对简单confirm弹层，针对频繁更改弹层里某些节点的内容，以及更改点击"确定"、"取消"按钮后的回调事件。
    如果是更复杂的交互建议使用layers.confirm或layers.bombLayer
    
  - mask.js: 遮罩
  
  - positionBomb.js: 弹层定位方法，现只支持居中定位和满屏定位
  
## util - 各种小工具

- csssuport.js: 检测是否支持指定的css特性

- datetime.js: 日期格式化方法

- delayevt.js: 对于高频触发的事件进行延迟处理类。应用场景：scroll和resize

- deviceevtname.js: 根据设备给出相关业务事件的事件名称

- publisher.js: 订阅者模式——发布者类

- publisherS.js: 订阅者模式——发布者类——精简版

- subscriber.js: 订阅者模式——订阅者类

- resize.js: 给指定元素创建resize事件监听类。引用了delayevt.js

- scroll.js: 给指定元素创建scroll事件监听类。引用了delayevt.js

- rwcontroller.js: 读写控制器——对于读写异步操作进行控制

- tool.js: 杂的不能再杂的小工具

- winresize.js: 监听window resize

- winscroll.js: 监听window scroll

- workerControl.js: 线程池控制器，负责返回当前空闲的线程对象

## package.json

- "browser"选项给可以扩展给开发者的js起了别名

- npm run jquery: 运行这条命令，则可以将你安装的新的jquery生成到lib.jquery.js里，这个jquery.js可以让通过browserify编译后的js代码直接使用，并且jquery.js
直接通过http方式引用到页面上。

  关于这个生成命令踩了坑，可以查看经验分享 [browserify cli 使用说明](http://blog.csdn.net/zmrdlb/article/details/60778337)
 
