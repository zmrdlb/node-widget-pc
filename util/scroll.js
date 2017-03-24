/**
 * @fileoverview
 *   给指定元素创建scroll事件监听类
 * @author mingrui| mingrui@staff.sina.com.cn
 * @version 1.0 | 2015-08-27
 * @return scroll类
 * @example
 * 		const Scroll = require('libutil-scroll');
 *
 * 		var scroll = new Scroll($(window));
 * 		scroll.listen({call:function(){console.log('窗口scroll');}});
 *
 */

const Delayevt = require('./delayevt.js');

class Scroll{
	/**
	 * @param {Element} *node 元素节点
	 * @param {JSON} config 延迟配置。同libevt/delayevt类的初始化参数
	 */
	constructor(node,config){
		if(node.length == 0){
			return;
		}
		this.delay = new Delayevt(config);
		node.on('scroll',() => {
			this.delay.start();
		});
	}
	/**
	 * 添加scroll事件监听
     * @param {JSON} opt
     * {
     *   call: function//事件发生时触发的回调
	 *   filter: function //过滤条件。filter返回为true则才触发call。不填此项则默认不过滤
	 * }
     */
    listen(opt){
		this.delay.subscribe(opt);
	}
	/**
	 * 移除监听
     * @param {Object} opt 和调用listen时一样的参数引用
	 */
	unlisten(opt){
		this.delay.unsubscribe(opt);
	}
}

module.exports = Scroll;
