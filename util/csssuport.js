/**
 * @fileoverview css支持情况判断。主要用于浏览器兼容
 * @version 1.0 | 2015-08-31 版本信息
 * @author Zhang Mingrui | 592044573@qq.com
 * @return
 * @example
 * 	 const Csssuport = require('libutil-csssuport');
 * 	 Csssuport.fixed;
 * */
var _div = document.createElement('div');
var result = {
	//是否支持position:fixed定位
	fixed: !('undefined' == typeof(document.body.style.maxHeight) || (document.compatMode !== "CSS1Compat" && /msie/.test(navigator.userAgent.toLowerCase()))),
	//是否支持transition
	transition: !(_div.style.transition == undefined)
};

module.exports = result;
