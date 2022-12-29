// var request = require('request');
// var fs = require('fs');
//
// var arrUrlsAll = [
// 	'http://217.182.174.169/cmd/get_geoip',
// 	'https://biz.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=getLogonPageIski',
// 	'https://www.mizrahi-tefahot.co.il/login/loginMTO.aspx',
// 	'https://www.google.com/'
// ];
//
// function posts(url) {
// 	var start_time = new Date().getTime();
// 	return new Promise((resolve, reject) => {
// 		request.get(url, {timeout: 15000, family: 4}, (err, req, data) => {
// 			var request_time = new Date().getTime() - start_time;
// 			var seconds = ((request_time / 1000) % 60);
// 			resolve([err, req, data, seconds]);
// 		});
// 	});
// }
//
// function getJsonAmazonScores(src) {
// 	return new Promise((resolve, reject) => {
// 		fs.readFile(src, 'utf8', function (err, data) {
// 			resolve(data);
// 		});
// 	});
// }
//
// function getJsonAmazonScoresState() {
// 	return new Promise((resolve, reject) => {
// 		fs.stat("/tmp/hma-status.txt", (error, exist) => {
// 			if (error == null) {
// 				getJsonAmazonScores("/tmp/hma-status.txt").then(function (data) {
// 					resolve(data);
// 				})
// 			}
// 			else {
// 				resolve(false);
// 			}
// 		})
// 	});
// }
//
// function changeVpnTimeAmazon() {
// 	return new Promise((resolve, reject) => {
// 		monitorVpn.checkVpnTime(true, (suc) => {
// 			resolve(suc);
// 		});
// 	});
// }
//
// function getTimeIL() {
// 	var d = new Date();
// 	var localTime = d.getTime();
// 	var localOffset = d.getTimezoneOffset() * 60000;
// 	var utcTime = localTime + localOffset;
// 	var st = utcTime + 3600000 * 3;
// 	var stime = new Date(st);
// 	return stime;
// }
//
// async function checkIpAmazon(cb) {
// 	if (!all.banks.statusWorkUpdate) {
// 		all.banks.statusWorkFromRest = true;
// 		fs.writeFile('./timeAmazonRun.txt', new Date().toString());
// 		var suc = await changeVpnTimeAmazon();
// 		var responseJson = await getJsonAmazonScores("amazonScores.json");
// 		if (typeof(responseJson) == "string") {
// 			responseJson = JSON.parse(responseJson);
// 		}
// 		var res = responseJson;
// 		var dateIL = getTimeIL();
// 		res["date_IL"] = dateIL.toLocaleString('en-GB', {
// 			"year": 'numeric',
// 			"month": '2-digit',
// 			"day": '2-digit'
// 		});
// 		res["time_IL"] = dateIL.toLocaleString('en-GB', {
// 			"hour": '2-digit',
// 			"minute": '2-digit',
// 			"second": '2-digit'
// 		});
// 		var responseJsonStatus = await getJsonAmazonScoresState();
// 		if (responseJsonStatus) {
// 			res["hide_Server"] = responseJsonStatus;
// 		}
// 		for (var i = 0; i < arrUrlsAll.length; i++) {
// 			var args = await posts(arrUrlsAll[i]);
// 			var [error, response, data, seconds] = [...args];
// 			if (i === 0) {
// 				data = JSON.parse(data);
// 				res["hide_IP"] = data["ip"];
// 				res["hide_Country"] = data["country"];
// 				res["hide_City"] = data["city"];
// 				res["hide_Tz"] = data["tz"];
// 				res["hide_Org_name"] = data["org_name"];
// 			}
// 			else {
// 				res[arrUrlsAll[i] + "_seconds"] = seconds;
// 				res[arrUrlsAll[i] + "_error"] = (error == null) ? "success" : "fail";
// 			}
// 		}
// 		cb(res, suc);
// 	}
// 	else {
// 		cb(false);
// 	}
// }
//
// function checkRunTimeAmazon() {
// 	fs.stat("./timeAmazonRun.txt", (error, exist) => {
// 		if (error == null) {
// 			fs.readFile('./timeAmazonRun.txt', function (err, fileContent) {
// 				if (err) {
// 					console.log('Error reading previously written file');
// 				}
// 				else {
// 					var diff = Math.abs(new Date() - new Date(fileContent));
// 					var minutes = Math.floor((diff / 1000) / 60);
// 					console.log(minutes);
// 					if (minutes > 10) {
// 						startIpAmazon();
// 					}
// 				}
// 			});
// 		}
// 		else {
// 			startIpAmazon();
// 		}
// 	})
// }
//
// function startIpAmazon() {
// 	checkIpAmazon((resAmazon) => {
// 		if (resAmazon) {
// 			fs.stat("amazonScoresArr.json", (error, exist) => {
// 				if (error == null) {
// 					getJsonAmazonScores("amazonScoresArr.json").then(function (responseJson) {
// 						if (typeof(responseJson) == "string") {
// 							responseJson = JSON.parse(responseJson);
// 						}
// 						responseJson.push(resAmazon);
// 						exportJson.writeFileWithFolder('amazonScoresArr.json', responseJson, {spaces: 4}, function (err) {
// 							all.banks.core.services.reloadPage();
// 						});
// 					});
// 				}
// 				else {
// 					exportJson.writeFileWithFolder('amazonScoresArr.json', [resAmazon], {spaces: 4}, function (err) {
// 						all.banks.core.services.reloadPage();
// 					});
// 				}
// 			});
// 		}
// 	})
// }
//
// var counterAmazon = 0;
// var myFunctionTimesAmazon = function () {
// 	counterAmazon = 600000;
// 	fs.stat("amazonScores.json", (error, exist) => {
// 		if (error == null) {
// 			checkRunTimeAmazon();
// 		}
// 		else {
// 			posts('http://217.182.174.169/cmd/get_geoip').then(function ([...args]) {
// 				var [error, response, data, seconds] = [...args];
// 				if (error == null) {
// 					if (typeof(data) == "string") {
// 						var dataParse = JSON.parse(data);
// 						var jsonAll = {
// 							real_IP: dataParse["ip"],
// 							real_Country: dataParse["country"],
// 							real_City: dataParse["city"],
// 							real_Tz: dataParse["tz"],
// 							real_Org_name: dataParse["org_name"]
// 						}
// 						exportJson.writeFileWithFolder('amazonScores.json', jsonAll, {spaces: 4}, function (err) {
// 							checkRunTimeAmazon();
// 						});
// 					}
// 				}
// 			})
// 		}
// 	});
// 	setTimeout(myFunctionTimesAmazon, counterAmazon);
// }
// setTimeout(myFunctionTimesAmazon, counterAmazon);

//
// var request = require('request');
// require('events').EventEmitter.prototype._maxListeners = 10;
// require('events').EventEmitter.defaultMaxListeners = 10;
// process.setMaxListeners(10);
// var request = request.defaults({maxRedirects: 10});
// var fs = require('fs');
//
// async function handler() {
//     var url =
//         "https://bb-ng-images-cheques-prod.s3.eu-west-1.amazonaws.com/12_559_330407/125593304071031620220821_12559330407?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCWV1LXdlc3QtMSJIMEYCIQDdmwvO5frDQTZEdwCpI%2BYeag9NXRS5B%2B%2Bugdb1j7PmWgIhAMcBEuTa2wjZLxIkhtOu12NpZ18qejJc8Vwqtyjooo2pKtsECK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMODQ5MDUwNjgxODkyIgyRvZ97WGPppjiATScqrwTeVdhlQtu7hqkbiP%2BEiV8CA8225b4vYgsuVwZRi1grpqCo5YbTzApXgpGDoD6CtJ5sNjVku%2F9Hg1d%2BI%2FxALQpRTv5vRto3NpWO2xOLjlxJo6%2BuNdCeJp4Tk63jprmxXFmY6RYxNbMIQZb3guq0G4m88KBfoM6Hyodu9aM5EhZZ5mmQfcyDF8LMDlB%2BeZa9iGEa651ji%2FY5ClAa0NqdzNFXv9nCkeatABiDxfKNM46uWfQZW9EnEkT3j1AlstZ9c29jaPx0nwRDfXmYx66SFY%2Fx0uHJC6S6EQebPc5vWg%2B6MvPXeD%2F%2BF%2BqMmHC3AphZCTf%2Fv8b74VbjBhClBt4Klq%2FmQba%2BSgaNb9XLAZM5FV5mZwpWW5w1bzfK6%2FAAer2dkXDUXqCTAuxSnBELYwXNQ%2F2NDej%2FATBh7vB328A67nGFH8gJ9bZC5bZgOaujE9CvnRxoIjNudhfztrbewWriPA7LJGmi%2Bpd4kTy5flGFo%2Fs5OAR1LVgoc2hh5k09B5SYT25VOtsmq%2BWmFJu0sFE%2FY%2F1jmouOiGZiW%2Bg8zoImnkP07Cr5GZCNv0O3JP8cTDgIAB%2FRYo4eEg33EOVBVdpFWEGJzgEvzyBx5xORfuDHhXawT4H792J5SbSqnypEwQkOY5tHWVgXuKdSStFGgME23KkCKNyHajSfRZyHHAYxKuLfEYwJVaAemaimB9SVZHW3GC4zV6WO2rZe1DmzIC6QaLbidRuduPt2E6siAYSo19mAMNiYmpgGOqgBZ%2B2YgziWWt0QodJGNtPtnhyJSmkL7xWNYNLuijPtSwuXc%2Fi8WmanpodWmyFB4VOgQi28f6ngQLQy2KrCY09uWDdU%2FQF1MdZTrzmLbX7gxbxy9fjvd0TmqvmCioPOno74yxbBJPwDovM78YhP0z8Whg2mzWHMH1QvhmZUttb%2B6OFWt72JViFz%2Bx%2FSCGHSCan9Xv4ZlBQqVAbIniOREg0NSaWoqkz1vWL6&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220824T215727Z&X-Amz-SignedHeaders=content-type%3Bhost&X-Amz-Expires=180&X-Amz-Credential=ASIA4LL25IISLZQ6I7HS%2F20220824%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=e94068d1181a5bba8d3946869029bcdc943a6282a2f8cdd9d59ed1493a5f947a"
//     let text = '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'
//
//
//     const bufferValue = Buffer.from(text, "base64");
//     // const myFile = new File([fs.readFileSync(text)], 'file.csv');
//
//     // const blob = fs.readFileSync(text)
//
//     // console.log(blob)
//
//     // const response = await fetch(text);
//     // const blob = await response.blob();
//     //
//     // let buffer = Buffer.from(arraybuffer);
//     // let arraybuffer = Uint8Array.from(buffer).buffer;
//     //
//     // const file = new File([fs.readFileSync(text)], "1064721080086500106820220821_12540313092", {
//     //     type: 'image/jpeg',
//     //     lastModified: new Date().getTime()
//     // });
//     // file['src'] = URL.createObjectURL(file);
//     // var formData = file;
//     // console.log(formData)
//
//     //
//     //
//
//     var param = {
//         uri: url,
//         method: "PUT",
//         family: 4,
//         timeout: 400000,
//
//         multipart: {
//             chunked: false,
//             data: [
//                 {
//                     body:  bufferValue,
//                     filename: "125592909951199420220824_12559290995",
//                     'content-type': 'image/jpeg'}
//
//
//
//             ]
//         },
//         headers: {
//             "Content-Type": 'image/jpeg',
//             "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36",
//             "Connection": "keep-alive",
//             "Cache-Control": "no-cache"
//         }
//     }
//     request(param, function (error, response, body) {
//         console.log('error---', error, body)
//     })
//
// }
//
// handler()
