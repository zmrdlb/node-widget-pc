/**
 * 模板相关方法
 * @author Zhang Mingrui | 592044573@qq.com
 * var DateUtil = require('libutil/tpl');
 */
const ejs = require('ejs');

/**
 * 使用ejs渲染模板并返回渲染后的结果
 * @param  {String}   *html html模板字符串
 * @param  {Object}   data  待渲染模板数据
 * @return {String}
 */
function ejsrender(html,data){
    return ejs.render(html,data||{});
}

exports.ejsrender = ejsrender;
