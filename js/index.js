"use strict";
delete require.cache[require.resolve('./package.json')];
delete require.cache[require.resolve('./js/exportJson.js')];
delete require.cache[require.resolve('./js/connectToVpn.js')];
delete require.cache[require.resolve('./js/serverHttps.js')];
delete require.cache[require.resolve('./js/updater.js')];
delete require.cache[require.resolve('./js/proxy.js')];

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
var iconv = require('iconv-lite');
var pkg = require('./package.json');
var request = require('request');
var url = require('url');
var path = require('path');
var os = require('os');
var fs = require('fs');
var exportJson = require('./js/exportJson.js');
var printScreen = require('./js/printScreen.js');
var k = 0;
var d = false;
var updater = require('./js/updater.js');
var platform = process.platform;
var biziboxVersionZipPath = "/biziboxVersionZip";
if (/^win/.test(platform)) {
    biziboxVersionZipPath = "biziboxVersionZip";
}
var upd = new updater(pkg, path.dirname(process.cwd()) + biziboxVersionZipPath);
var win = nw.Window.get();
var fsPath = require('fs-path');

function memoryCPUsInfo() {
    var content = '';

// Platform Info
    content += '[Platform]' + os.EOL;
    content += 'OS Type        : ' + os.platform() + os.EOL; // linux, darwin, win32, sunos, freebsd
    content += 'OS Version     : ' + os.release() + os.EOL;
    content += 'OS Architecture: ' + os.arch() + os.EOL;
    content += os.EOL;

// Memory info
    content += '[Memory]' + os.EOL;
    content += 'Total (Bytes)  : ' + os.totalmem() + os.EOL;
    content += 'Free  (Bytes)  : ' + os.freemem() + os.EOL;
    content += 'Free  (%)      : ' + (os.freemem() / os.totalmem() * 100).toFixed(2) + os.EOL;
    content += os.EOL;

// CPU Info
    content += '[CPUs]' + os.EOL;
    content += 'No. of Cores   : ' + os.cpus().length + os.EOL;
    content += 'Core Type      : ' + os.cpus()[0].model + os.EOL;


// Write to file, read file back in, write contents to DOM
    fs.writeFile('./sysinfo.txt', content, function (err) {
        if (err) {
            console.log('Error writing file');
        } else {
            fs.readFile('./sysinfo.txt', function (err, fileContent) {
                if (err) {
                    console.log('Error reading previously written file');
                } else {
                    console.log(fileContent.toString().replace(new RegExp(os.EOL, 'g'), '\n'));
                }
            });
        }
    });
}


function getMemory() {
    return 100 - (os.freemem() / os.totalmem() * 100);
}

var writeHtmlFile = function (name, html) {
    var pathDir = './disAsakimHtml/' + name + '-' + new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + '.html';
    var dist = path.resolve(pathDir);
    fsPath.mkdir(path.dirname(dist), function (err) {
        if (err) {
            console.log(err);
        } else {
            fs.appendFile(dist, html, function (err) {
                if (err) {
                    console.log('Error writing file');
                }
            });
        }
    });
}
var logLast = "";
var writeLog = function (msg) {
    var data = ("0" + (new Date().getDate())).slice(-2) + "/" + ("0" + (new Date().getMonth() + 1)).slice(-2) + '/' + new Date().getFullYear() + '_' + ("0" + (new Date().getHours())).slice(-2) + ':' + ("0" + (new Date().getMinutes())).slice(-2) + ':' + ("0" + (new Date().getSeconds())).slice(-2) + ' ' + msg + '\n';
    var logElement = $("#outPut")[0];
    logElement.innerHTML += data + "<br>";
    logElement.scrollTop = logElement.scrollHeight;
    logLast = data;
    var pathDir = './logs/logInfo-' + new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + '.txt';
    var dist = path.resolve(pathDir);
    fsPath.mkdir(path.dirname(dist), function (err) {
        if (err) {
            console.log(err);
        } else {
            fs.appendFile(dist, data, function (err) {
                if (err) {
                    console.log('Error writing file');
                }
            });
        }
    });
};

function myEmitterLogs(param, description, stack) {
    if (typeof param == "number") {
        var textLog = all.banks.core.services.logAlertsBanks(param, description);
        var text = "";
        var types = typeof (textLog);
        if (types == "object") {
            text = textLog.logClient;
            textLog = textLog.spider;
        } else {
            text = textLog;
        }
        all.banks.core.services.sendLogs(param, text);
        if (stack) {
            writeLog(stack);
        } else {
            writeLog(textLog);
        }
    } else {
        writeLog(param);
    }
}


function myEmitterLogsPromise(param, description, stack) {
    return new Promise((resolve, reject) => {
        if (typeof param == "number") {
            var textLog = all.banks.core.services.logAlertsBanks(param, description);
            var text = "";
            var types = typeof (textLog);
            if (types == "object") {
                text = textLog.logClient;
                textLog = textLog.spider;
            } else {
                text = textLog;
            }
            if (stack) {
                writeLog(stack);
            } else {
                writeLog(textLog);
            }
            all.banks.core.services.sendStatus(param, text)
                .then(function () {
                    resolve(true)
                });
        } else {
            writeLog(param);
        }
    })
}

var serverRest = require('./js/serverHttps.js');
const senderReq = new serverRest();
win.setBadgeLabel("");
win.setProgressBar(0);
var parallelReq = require('./js/parallelReq.js');

// myEmitterLogs.on('event', function (param, description) {
//	if (typeof param == "number") {
//		var text = all.banks.core.services.logAlertsBanks(param, description);
//		all.banks.core.services.sendLogs(param, text);
//		writeLog(text);
//	}
//	else {
//		writeLog(param);
//	}
//});
// print error message in log window
//process.on("uncaughtException", function (exception) {
//	all.banks.spiderConfig.status = 'off';
//	var stack = exception.stack.split("\n");
//	stack.forEach(function (line) {
//		writeLog(line);
//		process.stdout.write(String(line) + "\n");
//	});
//});
//var menu = new nw.Menu({type: 'menubar'});
//if (process.platform == "darwin") {
//	menu.createMacBuiltin && menu.createMacBuiltin(window.document.title);
//}
//var submenu = new nw.Menu();
//submenu.append(new nw.MenuItem({
//	label: "Reload Page",
//	click: function () {
//		//process.removeAllListeners(['uncaughtException']);
//		//myEmitterLogs.removeAllListeners(['event']);
//		nw.App.clearCache();
//		all.banks.statusWorkFromRest = false;
//		win.reload();
//	}
//}));
//submenu.append(new nw.MenuItem({
//	label: "Dev Tools",
//	click: function () {
//		win.showDevTools();
//	}
//}));
//submenu.append(new nw.MenuItem({
//	label: "Clear Cache",
//	click: function () {
//		nw.App.clearCache();
//	}
//}));
//submenu.append(new nw.MenuItem({
//	label: "Close App",
//	click: function () {
//		//nw.App.closeAllWindows();
//		//nw.App.clearCache();
//		nw.App.quit();
//	}
//}));
//menu.append(new nw.MenuItem({
//	label: 'Menu',
//	submenu: submenu
//}));
//var submenu1 = new nw.Menu();
//submenu1.append(new nw.MenuItem({
//	label: "Edit/create",
//	click: function () {
//		all.banks.core.services.editConfig();
//	}
//}));
//menu.append(new nw.MenuItem({
//	label: 'Config',
//	submenu: submenu1
//}));
//nw.Window.get().menu = menu;


//function callb(data) {
//}
//setTimeout(function () {
//	//printScreen.takeSnapshot("https://secure.bizibox.biz/", callb)
//}, 4000)
//tar -cvzf nwBizibox.tar.gz nwBizibox/*
//const EventEmitter = require('events');
//require('events').EventEmitter.defaultMaxListeners = Infinity;
//const util = require('util');
//function MyEmitterLog() {
//	EventEmitter.call(this);
//}
//util.inherits(MyEmitterLog, EventEmitter);
//const myEmitterLogs = new MyEmitterLog();
//myEmitterLogs.setMaxListeners(Infinity);
//process.setMaxListeners(Infinity);
//nw.App.setCrashDumpDir("~/Library/Application\ Support/nwBizibox/CrashPad/");
//var socket = io.connect('http://onmodulus.net/');
// $.get("http://ipaddress.com/proxy-list/", function (data) {
// 	var randomIp = Math.floor(Math.random()*45)+1;
// 	var aaaIp = $(data).find('.table.table-striped tr').eq(randomIp).find('td:first').text();
// 	console.log(aaaIp)
// 	if(nw.App.getProxyForURL("http://97.77.104.22:80") == 'DIRECT'){
// 		console.log('DIRECT')
// 		setTimeout(function(){
// 			nw.App.setProxyConfig("http://" + aaaIp)
// 		}, 2000)
// 	}
// });
// nw.App.getProxyForURL("http://91.194.42.51:80")


//



