/**
 * @fileoverview 订阅者模式——发布者类——精简版
 * 精简版：订阅者不限定必须是订阅者类Subscriber的对象
 * @version 1.0 | 2015-08-31 版本信息
 * @author Zhang Mingrui | 592044573@qq.com
 * @return 发布者类
 * @example
 * */
 const Tool = require('./tool.js'),
	   Rwcontroller = require('./rwcontroller.js');

class PublisherS{
	constructor(){
		this.subscribers = []; //记录订阅者对象
		this.rwcontrollder = new Rwcontroller();
	}
	/**
	 * 参数有效性验证
	 */
	argsValidate(data){
		if(Tool.isObject(data) && Tool.isFunction(data.call)){
			return true;
		}
		return false;
	}
	/**
	 * 信息分发，通知所有订阅者
	 * filter执行返回true，则执行call
	 */
	deliver(){
		this.rwcontrollder.read(function(data){
			$.each(this.subscribers,function(index,item){
				if(item.filter() == true){
		        	item.call.apply(window,data.args);
		      	}
			});
		}.bind(this,{args: arguments}));
	}
	/**
	 * 订阅
 	 * @param {JSON} *subscriber 订阅者。格式同subscribers里的单独一项
 	 * {
 	 * 		*call: function(){} //信息分发的回调函数
 	 *      filter: function(){return true;} //过滤条件
 	 * }
	 */
	subscribe(subscriber){
		if(this.argsValidate(subscriber)){
			if(!Tool.isFunction(subscriber.filter)){
		        subscriber.filter = function(){
		            return true;
		        };
		    }
			if($.inArray(subscriber,this.subscribers) < 0){
				this.rwcontrollder.write(function(cursub){
					this.subscribers.push(cursub);
				}.bind(this,subscriber));
			}
		}
	}
	/**
	 * 取消订阅
 	 * @param {JSON} subscriber 订阅者
	 */
	unsubscribe(subscriber){
		if(this.argsValidate(subscriber)){
			this.rwcontrollder.write(function(cursub){
				$.each(this.subscribers,(index,item) => {
					if(item == cursub){
					    this.subscribers.splice(index,1);
						return false;
					}
				});
			}.bind(this,subscriber));
		}
	}
}

module.exports = PublisherS;
