var del = require('del');
var fs = require('fs');

module.exports.deleteOldLogs = function (cb, linuxUsed) {
	function matchDaysBetweenDates(dates) {
		var firstDate = new Date(dates);
		var secondDate = new Date();
		var oneDay = 24 * 60 * 60 * 1000;
		var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
		return diffDays;
	}

	var pathFolder = ["./Output/", "./disAsakimHtml/", "./logs/"];
	pathFolder.forEach(function (v, idxPath) {
		fs.stat(v, (err, folder) => {
			if (!err) {
				fs.readdir(v, (err, data) => {
					var ind = 0;
					if (err) {
						cb("err read files");
					}
					else {
						var indLen = 0;
						var dataLen = data.length;
						if (dataLen) {
							data.forEach((name, index) => {
								indLen += 1;
								var pathFile = v + name;
								fs.stat(pathFile, (err, res) => {
									if (err) throw err;
									var dateFile = new Date(res.birthtime);
									var dayBetween = matchDaysBetweenDates(dateFile);
									if(linuxUsed && linuxUsed > 70){
										if (dayBetween > 2) {
											ind += 1;
											del([pathFile], {force: true});
										}
									}else{
										if (dayBetween > 3) {
											ind += 1;
											del([pathFile], {force: true});
										}
									}
								});
								if (dataLen == indLen && (idxPath + 1 == pathFolder.length)) {
									cb(ind);
								}
							});
						}
						else {
							if (idxPath + 1 == pathFolder.length) {
								cb(ind);
							}
						}
					}
				});
			}
			else {
				if (idxPath + 1 == pathFolder.length) {
					cb("err folder");
				}
			}
		});
	});
}