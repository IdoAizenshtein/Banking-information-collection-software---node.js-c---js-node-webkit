var fsPath = require('fs-path');

module.exports.writeFileWithFolder = function (file, obj, options, callback) {
	if (callback == null) {
		callback = options
		options = {}
	}

	var spaces = typeof options === 'object' && options !== null
		? 'spaces' in options
			? options.spaces : this.spaces
		: this.spaces;

	var str = '';
	try {
		str = JSON.stringify(obj, options ? options.replacer : null, spaces) + '\n'
	} catch (err) {
		if (callback) return callback(err, null)
	}

	fsPath.writeFile(file, str, 'utf-8', callback)
}
