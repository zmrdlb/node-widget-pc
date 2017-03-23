/**
 * @fileoverview 弹层类，继承自layer/layer。默认居中定位，显示遮罩。（如果需其他特殊配置则参见参数说明）
 * 如果弹层中有以下属性的节点node="close"。则点击该节点会关闭弹层，并触发hidecal通知。
 * @version 1.0.0 | 2015-09-14 版本信息
 * @author Zhang Mingrui | 592044573@qq.com
 * @example
 * 	 const BombLayer = require('liblayer-bombLayer');
 *
 *   var layer = new BombLayer();
 *    layer.showbeforecal.add(function(){console.log('层显示前');});
 *   layer.hidebeforecal.add(function(){console.log('层隐藏前');});
 *   layer.showaftercal.add(function(){console.log('层显示后');});
 *   layer.hideaftercal.add(function(){console.log('层隐藏后');});
 *   layer.pos.poscal.add(function(){console.log('layer定位后回调')});
 *   layer.setContent('<div class="js-content"></div>'); //设置layer层里面的内容
 *   layer.getNodes(['content']); // 获取class="js-content"的节点
 *   layer.show(); //显示层
 *   layer.hide(); //隐藏层
 *   layer.layer; //层dom节点对象
 *   layer.container; //浮层容器
 *   layer.destroy(); //销毁层
 *
 * */

 const $ = require('jquery'),
 	   Layer = require('./layer.js'),
 	   Mask = require('./mask.js'),
	   PositionBomb = require('./positionBomb.js'),
	   Tool = require('libutil-tool');

class BombLayer extends Layer{
	/**
	 * 弹层类——创建并添加到指定容器中
     * @param {JSON} config 弹层配置参数 ，不是必填项
     * 		{
     * 	       container {Element} 存放弹层的容器。可不指定，默认弹层存放于body中的一个动态生成的div里
     * 	       pos:{}, //定位参数，具体说明可见方法layer/positionBomb中的config说明
     *         layer: {}, //弹层信息参数，具体说明可见方法layer/layer中的config说明
     * 		   mask: { //遮罩信息参数，具体说明可见方法layer/mask中的config说明。在此基础上进行以下扩展
     * 			  mask: true, //是否创建遮罩
     *            cmlhide: false //点击遮罩是否关闭弹层
     *            //其他查看mask.js中的配置
     * 		   }
     *      }
	 */
	constructor(config) {
		if(!config.container || config.container.length == 0){
			config.container = $('<div></div>').appendTo('body');
			this._newcontainer = true; //说明是新创建的容器
		}
		config = config || {};
		//初始化基类
		super(config.container,config.layer);
		//创建定位类对象
		this.pos = new PositionBomb({
			layer: this.layer
		},config.pos);
		//创建遮罩
		var maskopt = $.extend(true,{
			mask: true,
			cmlhide: false
		},config.mask);
		if(maskopt.mask){ //如果创建遮罩
			this.mask = new Mask(config.container,maskopt);
			if(maskopt.cmlhide){ //点击遮罩关闭
				this.mask.clickcal.add((e) => {
					this.hide();
				});
			}
		}
		//事件绑定
		this.layer.on('click.lib', '.js-close', (e) => {
	    	e.preventDefault();
	    	this.hide();
	    });
	}
	/**
	 * 获取alert中具有node='指定名称'的节点列表。如果nodenamearr中指定的节点不存在，则不在结果中返回。举例
     * @param {Array} nodenamearr 如['content','ok']
     * @return {
     * 	   content: 获取的节点
     *     ok: 获取的节点
     * }
     * 如果content不存在，则只返回{ok}
	 */
	getNodes(nodenamearr){
		var result = {}, that = this;
		if(Tool.isArray(nodenamearr)){
			$.each(nodenamearr,(index,name) => {
				var node = this.layer.find('.js-'+name);
				if(node.length > 0){
					result[name] = node;
				}
			});
		}
		return result;
	}
	/**
	 * 显示弹层
	 */
	show(){
		if(!this.isshow()){
			this.showbeforecal.fire(); //层显示前回调
			this.mask && this.mask.show();
			this._show();
			this.pos.setpos();
			this.showaftercal.fire(); //层显示后回调
		}
	}
	/**
	 * 隐藏弹层
	 */
	hide(){
		if(this.isshow()){
			this.hidebeforecal.fire(); //层隐藏前回调
			this.mask && this.mask.hide();
			this._hide();
			this.hideaftercal.fire(); //层隐藏后回调
		}
	}
	/**
	 * 弹层销毁
	 */
	destroy(){
		this.layer.off('click.lib', '.js-close');
		if(this._newcontainer){
			this.container.remove();
		}
		super.destroy();
		this.pos.destroy();
		if(this.mask){
            this.mask.destroy();
        }
		this._newcontainer = null;
	}
}

module.exports = BombLayer;
