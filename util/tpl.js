/**
 * 模板相关方法
 * @author Zhang Mingrui | 592044573@qq.com
 * var DateUtil = require('libutil/tpl');
 */
const ejs = require('ejs');
const fs = require('fs');
var path = require('path');

/**
 * 读取文件，返回文件内容
 * @param  {String}   filepath 文件相对路径
 * @param  {Function} callback 完成后的回调
 * @return {[type]}            [description]
 */
function readFile(filepath,callback){
    fs.readFile(path.join(__dirname, filepath), {encoding: 'utf8'}, (err, str) => {
        if(err){
            callback('');
        }else{
            callback(str);
        }
    });
}
/**
 * 使用ejs渲染模板并返回渲染后的结果
 * @param  {String}   htmlpath html模板路径相对路径
 * @param  {Function} callback 完成后的回调
 *        (html) 渲染结果
 * @param  {Object}   data  待渲染模板数据
 * @return {Null}
 */
function ejsrender(htmlpath,callback,data){

    readFile(htmlpath,(html) => {
        if(html == ''){
            callback('');
        }else{
            callback(ejs.render(html,data||{}));
        }
    });
}

exports.readFile = readFile;
exports.ejsrender = ejsrender;
