/**
 * @fileoverview alert的工厂控制器，继承baseControl
 * 应用场景：针对简单alert弹层，频繁更改弹层里某些节点的内容，以及更改点击"确定"按钮后的回调事件
 * 如果是更复杂的交互建议使用layers.alert或layers.bombLayer
 * @version 1.0.0 | 2016-01-26 版本信息
 * @author Zhang Mingrui | 592044573@qq.com
 * @example
 * const AlertControl = require('liblayer-alertControl');
 *
		var curlayer = new AlertControl();
		curlayer.setconfig({
			alert: {
				frametpl: [
				    '<div class="js-title"></div>',
					'<div class="js-content"></div>',
					'<div><a href="javascript:;" class="js-ok">好的</a></div>'
				].join('')
			}
		});
		curlayer.show({
            content: '您还未登陆'
        },{
            ok: function(){
                console.log('点击好的');
            }
        });
        curlayer.getlayerobj()； //layer/alert类对象
 * */
 const Alert = require('./alert.js'),
       BaseControl = require('./baseControl.js');

/**
* alert工厂控制器
*/
class AlertControl extends Alert {
    constructor(hidedestroy) {
        supert(hidedestroy);
        this._okcal = function(){}; //点击ok的回调私有存储器
		this._funarr = ['ok']; //可控制的回调方法名
    }
    /**
	 * 获取alert弹层
	 * @param {Boolean} reset 是否重新渲染模板。默认为false
	 */
    getlayerobj(reset){
		if(this._layerobj == null){
			this._layerobj = new Alert(this._defaultopt);
			this._layerobj.okcal.add((e) => {
				this._okcal();
			});
            this._addcall();
		}else{
            if(reset){
                this._layerobj.setContent(this._defaultopt.alert.frametpl);
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
    }
}

module.exports = AlertControl;
