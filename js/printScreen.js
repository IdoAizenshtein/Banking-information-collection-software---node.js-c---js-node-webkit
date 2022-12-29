module.exports.takeSnapshot = function (url, callb) {
	nw.Window.open(url, {width: 1440, height: 900, id: "frameCapture", 'show':false}, function (popWindow) {
		var popWindow = popWindow;
		popWindow.on('loaded', function () {
			setTimeout(function () {
				popWindow.capturePage(function (buffer) {
					require('fs').writeFile('./screenshot.png', buffer, function (err) {
						if (err) throw err;
						console.log('It\'s saved!');
						setTimeout(function () {
							callb('null');
							popWindow.close(true);
							popWindow = null;
							popWindow.hide();
						}, 300)
					});
				}, {format: 'png', datatype: 'buffer'});
			}, 5000)
		});
		popWindow.on('closed', function () {
			popWindow = null;
			popWindow.hide();
		});
	});
};
