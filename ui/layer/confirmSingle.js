/**
 * @fileoverview confrim类单体控制器，一般用于简单的confirm信息提示。
 * 注意：该confrim控制的对象及dom在全局中唯一存在，如果想要创建多个，请使用liblayers/confirm或liblayers/confirmControl
 * @version 1.0.0 | 2015-09-16 版本信息
 * @author Zhang Mingrui | 592044573@qq.com
 * @example
 *      const ConfirmSingle = require('liblayer-confirmSingle');
 *
		ConfirmSingle.setconfig({
			confirm: {
				frametpl: [
					'<div class="js-content"></div>',
					'<div><a href="javascript:;" class="js-ok">好的</a><a href="javascript:;" class="js-cancel">等下说</a></div>'
				].join('')
			}
		});
		ConfirmSingle.show({
		    content: '您还未登陆'
		},{
		    ok: function(){
                console.log('点击好的');
            },
			cancel: function(){
				console.log('点击等下说');
			}
		});
        ConfirmSingle.getlayerobj()； //layer/confirm类对象
 * */
 const ConfrimControl = require('./confirmControl.js');

 module.exports = new ConfrimControl();
