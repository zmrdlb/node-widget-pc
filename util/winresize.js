/**
 * @fileoverview
 *   监听window resize。只支持PC
 * @author mingrui| mingrui@staff.sina.com.cn
 * @version 1.0 | 2015-08-27
 * @example
 * 		const Winresize = require('libutil-winresize');
 *
 * 		Winresize.listen({call:function(){console.log('窗口resize');}});
 */
const Resize = require('./resize.js'),
		Deviceevtname = require('./deviceevtname.js');

module.exports = new Resize($(window),{
	evtname: Deviceevtname+'.lib'
});
