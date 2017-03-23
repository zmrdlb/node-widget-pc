/**
 * alert弹层模板，必须具有指定的node属性
 */
exports.alert = [
    '<div>标题</div>',
	'<div node="content">内容区</div>',
	'<div><a href="javascript:;" class="js-ok">确定</a></div>'
].join('');
/**
 * confirm弹层模板，必须具有指定的node属性
 */
exports.confirm = [
    '<div>标题</div>',
	'<div node="content">内容区</div>',
	'<div><a href="javascript:;" class="js-ok">确定</a><a href="javascript:;" class="js-cancel">取消</a></div>'
].join('')
