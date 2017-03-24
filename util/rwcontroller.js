/**
 * @fileoverview 读写控制器——对于读写异步操作进行控制
 * @version 1.0 | 2015-09-07 版本信息
 * @author Zhang Mingrui | 592044573@qq.com
 * @return 读写控制器类
 * @example
 * */
 const Tool = require('./tool.js');

 class Rwcontroller {
	 constructor(){
		 this.readlock = false; //读锁
 		this.writelock = false; //写锁
 		this.queue = []; //读写操作缓存队列
	 }
	 /**
 	 * 获取当前是否可以执行读操作
 	 */
	 readenable(){
		if(this.writelock){
 			return false;
 		}
 		return true;
	 }
	 /**
 	 * 获取当前是否可以执行写操作
 	 */
	 writeenable(){
		if(this.writelock || this.readlock){
 			return false;
 		}
 		return true;
	 }
	 /**
 	 * 执行读写操作队列
 	 */
 	 execqueue(){
		 while(this.queue.length > 0){
 			var obj = this.queue.shift();
 			if(obj.type == 'read'){
 				this._execread(obj.fun);
 			}else if(obj.type == 'write'){
 				this._execwrite(obj.fun);
 			}
 		}
	 }
	 /**
 	 * 私有——执行读操作
 	 */
	 _execread(fun){
		this.readlock = true;
 		fun();
 		this.readlock = false;
	 }
	 /**
 	 * 私有——执行写操作
 	 */
	 _execwrite(fun){
		this.writelock = true;
 		fun();
 		this.writelock = false;
	 }
	 /**
 	 * 开始读
      * @param {Function} *fun 读操作回调函数
 	 */
	 read(fun){
		 if(Tool.isFunction(fun)){
 			if(this.readenable()){
 				this._execread(fun);
 				this.execqueue();
 			}else{
 				this.queue.push({
 					type: 'read',
 					fun: fun
 				});
 			}
 		}
	 }
	 /**
 	 * 开始写
      * @param {Function} *fun 写操作回调函数
 	 */
	 write(fun){
		 if(Tool.isFunction(fun)){
 			if(this.writeenable()){
 				this._execwrite(fun);
 				this.execqueue();
 			}else{
 				this.queue.push({
 					type: 'write',
 					fun: fun
 				});
 			}
 		}
	 }
 }

module.exports = Rwcontroller;
