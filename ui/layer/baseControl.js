/**
 * @fileoverview 基本的弹层工厂控制器，不可直接使用，只可子类继承后使用。
 * 应用场景：针对频繁更改弹层里某些节点的内容，以及更改点击按钮后的回调事件。
 * @version 1.0.0 | 2016-01-26 版本信息
 * @author Zhang Mingrui | 592044573@qq.com
 * @example
 *      const BaseControl = require('liblayer-baseControl');
 *
 * */

 const Tool = require('libutil-tool');

 class BaseControl{
     /**
      * 工厂模型控制器
      * @param {Boolean} hidedestroy 弹层关闭时，是否走系统默认的销毁操作。默认为true
      */
     constructor(hidedestroy){
         this._layerobj = null; //弹层对象
 		 this._defaultopt = {}; //默认config配置参数
 		 this._funarr = []; //会替换的回调方法的关键词。如['ok','cancel']
         this.createcal = $.Callbacks(); //弹层对象创建后的回调
         if(typeof hidedestroy != 'boolean'){
             hidedestroy = true;
         }
         this.hidedestroy = hidedestroy;
     }
     /**
 	 *  参数说明请参见子类使用的弹层类里面的config说明
 	 *  如alert.js。confirm.js
 	 */
     setconfig(config){
         this._defaultopt = config;
     }
     /**
 	 * 获取弹层对象，具体由子类实现
 	 */
     getlayerobj(){

     }
     /**
 	 * 添加系统回调，由子类创建了弹层对象后调用
 	 */
     _addcall(){
         if(this.hidedestroy){
             this._layerobj.hideaftercal.add(() => {
                 this.destroy();
             });
         }
         this.createcal.fire(this._layerobj);
     }
     /**
 	 * 显示弹层
 	 * @param {Object} *txt 文案配置,选填。如果setconfig调用设置的模板中还有其他node="其他值"，
 	 *      如node="other" 则可自行扩展
 	 * {
 	 * 	 content {String} node="content"节点里面的html
 	 *   title {String} node="title"节点里面的html
 	 *   ok {String} node="ok"节点里面的html
 	 * }
 	 * @param {Object} cal 回调配置
 	 * {
 	 * 	 键值为_funarr中距离的关键词 {Function} 点击确定按钮后的回调
 	 * }
 	 */
 	 show(txt,cal){
         if(!Tool.isObject(txt)){
 			throw new Error('baseControl-show方法txt参数必须是json对象');
 		}else{
 			if(Tool.isObject(cal)){
 				var funname = this._funarr;
 				for(var curname of funname){
 					if(Tool.isFunction(cal[curname])){
 						this['_'+curname+'cal'] = cal[curname];
 					}
 					else{
 						this['_'+curname+'cal'] = function(){};
 					}
 				}
 			}else{
 				this._okcal = function(){};
 			}
 			//获取txt里面的键值
 			var nodenamearr = [];
 			for(var name in txt){
 				nodenamearr.push(name);
 			}
 			this.getlayerobj(true);
 			var nodearr = this._layerobj.getNodes(nodenamearr);
 			for(var name in nodearr){
 				Tool.isString(txt[name]) && nodearr[name].html(txt[name]);
 			}
 			this._layerobj.show();
 		}
     }
     /**
      * 销毁弹层
      */
     destroy(){
         if(this._layerobj != null){
 			this._layerobj.destroy();
 			this._layerobj = null;
 		}
     }
 }

module.exports = BaseControl;
