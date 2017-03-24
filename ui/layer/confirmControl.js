/**
 * @fileoverview confirm的工厂控制器，集成baseControl
 * 应用场景：针对简单confirm弹层，针对频繁更改弹层里某些节点的内容，以及更改点击"确定"、"取消"按钮后的回调事件
 * 如果是更复杂的交互建议使用layers.confirm或layers.bombLayer
 * @version 1.0.0 | 2016-01-26 版本信息
 * @author Zhang Mingrui | 592044573@qq.com
 * @example
 * 		const ConfirmControl = require('liblayer-confirmControl');
 *
		var curconfirm = new ConfirmControl();
		curconfirm.setconfig({
			confirm: {
				frametpl: [
					'<div class="js-content"></div>',
					'<div><a href="javascript:;" class="js-ok">好的</a><a href="javascript:;" class="js-cancel">等下说</a></div>'
				].join('')
			}
		});
		curconfirm.show({
		    content: '您还未登陆'
		},{
		    ok: function(){
                console.log('点击好的');
            },
			cancel: function(){
				console.log('点击等下说');
			}
		});
		curconfirm.getlayerobj()； //layer/confirm类对象
 * */

 const Confirm = require('./confirm.js'),
 		BaseControl = require('./baseControl.js');

class ConfirmControl extends BaseControl {
	/**
     * confirm工厂控制器
     */
	constructor(hidedestroy) {
		super(hidedestroy);
		this._okcal = function(){}; //点击ok的回调私有存储器
		this._cancelcal = function(){}; //点击cancel的回调私有存储器
		this._funarr = ['ok','cancel']; //可控制的回调方法名
	}
	/**
	 * 获取confirm弹层
	 * @param {Boolean} reset 是否重新渲染模板。默认为false
	 */
	getlayerobj(reset){
		if(this._layerobj == null){
			this._layerobj = new Confirm(this._defaultopt);
			this._layerobj.okcal.add((e) => {
				this._okcal();
			});
			this._layerobj.cancelcal.add((e) => {
				this._cancelcal();
			});
			this._addcall();
		}else{
            if(reset){
                this._layerobj.setContent(this._defaultopt.confirm.frametpl);
            }
        }
		return this._layerobj;
	}
	/**
	 * 销毁alert弹层
	 */
	destroy(){
		super.destroy();
		this._okcal = function(){};
		this._cancelcal = function(){};
	}
}

module.exports = ConfirmControl;
