/**
 * @fileoverview confirm类，继承自layer/bombLayer。添加“确定按钮”和“取消按钮”事件回调
 * 如果弹层中有以下属性的节点
 * node="close"，点击则会关闭弹层,并触发hidecal通知。
 * node="ok"，点击则触发“确定按钮”事件，关闭弹层，并触发okcal和hidecal通知。
 * node="cancel" 点击触发“取消按钮”事件，关闭弹层，并触发cancelcal和hidecal通知。
 * @version 1.0.0 | 2015-09-16 版本信息
 * @author Zhang Mingrui | 592044573@qq.com
 * @example
 * 	 const Confirm = require('liblayer-confirm');
 *
 * 	 var layer = new Confirm({
 * 	 	confirm: {
 * 			frametpl: [ //弹层基本模板
				'<div class="js-title"></div>',
				'<div class="js-content"></div>',
				'<div><a href="javascript:;" class="js-ok">好的</a><a href="javascript:;" class="js-cancel">等下说</a></div>'
			].join('')
 *      }
 *   });
 *   layer.showcal.add(function(type){switch(type){case 'before':console.log('层显示前');break; case 'after':console.log('层显示后');break;}});
 *   layer.hidecal.add(function(type){switch(type){case 'before':console.log('层隐藏前');break; case 'after':console.log('层隐藏后');break;}});
 *   layer.okcal.add(function(e){console.log('点击了确定')});
 *   layer.cancelcal.add(function(e){console.log('点击了取消')});
 *   layer.setMyContent('设置node="content"节点的innerHTML');
 *   var nodeArr = layer.getNodes(['title']); // 获取class="js-title"的节点
 *   nodeArr.title.html('内容区html');
 *   layer.contentnode; //内容区node="content"节点
 *   layer.show(); //显示层
 *   layer.hide(); //隐藏层
 *   layer.layer; //层dom节点对象
 *   layer.container; //浮层容器
 *   layer.destroy(); //销毁层
 * */
const BombLayer = require('./bombLayer.js'),
		Tpl = require('./tpl.js');

class Confirm extends BombLayer {
	/**
	 * confirm类
     * @param {Object} config 参数同layer/bombLayer里面的config,在此基础上增加如下默认配置
     * {
     * 	  *confirm: {
     * 		 *frametpl {String} confirm基本模板。要求请详见layer/tpl里面confirm项的要求
     *    }
     * }
	 */
	constructor(config) {
		var opt = $.extend(true,{
			confirm: {
				frametpl: Tpl.confirm //confirm弹层基本模板。要求请详见layer/tpl里面confirm项的要求
			}
		},config);
		super(opt);
		this.setContent(opt.confirm.frametpl);
		this.contentnode = this.layer.find('.js-content'); //内容区节点
		this.okcal = $.Callbacks();
		this.cancelcal = $.Callbacks();
		//事件绑定
	    this.layer.on('click.lib', '.js-ok', (e) => {
	    	e.preventDefault();
			this.okcal.fire(e);
	    	this.hide();
	    });
	    this.layer.on('click.lib', '.js-cancel', (e) => {
	    	e.preventDefault();
			this.cancelcal.fire(e);
	    	this.hide();
	    });
	}
	/**
	 * 设置confirm内容区具有[node="content"]属性的节点的html
     * @param {String} html
	 */
	setMyContent(html){
		if(typeof html == 'string' && this.contentnode.length > 0){
			this.contentnode.html(html);
		}
	}
	/**
	 * 组件销毁
	 */
	destroy(){
		this.layer.off('click.lib', '.js-ok');
		this.layer.off('click.lib', '.js-cancel');
		super.destroy();
		this.contentnode = null;
		this.okcal = null;
	}
}

module.exports = Confirm;
