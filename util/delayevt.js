/**
 * @fileoverview 对于高频触发的事件进行延迟处理类。应用场景：scroll和resize
 * @version 1.0.0 | 2015-08-27 版本信息
 * @author Zhang Mingrui | 592044573@qq.com
 * @return 处理类
 * @example
 * */

 const PublisherS = require('./publisherS.js');

 class Delayevt extends PublisherS{
	 /**
 	 * 对于高频触发的事件进行延迟处理。应用场景：scroll和resize
 	 * @param {JSON} config 配置
 	 */
	 constructor(config){
	    super();
 		this.timer = null;
 		$.extend(this,{
 			delaytime: 200 //事件检测延迟时间，毫秒
 		},config || {});
	 }
	 /**
 	 * 开始检测
 	 */
	 start(){
		 if(this.timer){
             clearTimeout(this.timer);
         }
         this.timer = setTimeout(() => {
         	this.deliver();
         },this.delaytime);
	 }
 }

module.exports = Delayevt;
