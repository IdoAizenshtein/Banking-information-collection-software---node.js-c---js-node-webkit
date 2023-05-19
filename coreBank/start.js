var os = require('os');
var fs = require('fs');
const setVpnLoginFunc = require('./js/setVpnLogin.js');
var newVersionCheckIntervalId = null;
var tryingForNewVersion = false;
var copyPath, execPath;
if (nw.App.argv.length) {
    copyPath = nw.App.argv[0];
    execPath = nw.App.argv[1];
}
var file_content = fs.readFileSync("package.json");
var contentJson = JSON.parse(file_content);
// if (contentJson.versionTest) {
// 	$(".checkSwitch").prop("checked", true);
// }
// else {
// 	$(".checkSwitch").prop("checked", false);
// }

$("#" + contentJson.versionKind).addClass("active");


// var d = new Date();
// var localTime = d.getTime();
// var localOffset = d.getTimezoneOffset() * 60000;
// var utcTime = localTime + localOffset;//utc time
// var st = utcTime + 3600000 * 3;//timezone time Israel
// var stime = new Date(st);
// var smallText = "Upload :" + stime.toLocaleString("en-GB");
// $(".wrapBottomText small").text(smallText);

document.getElementById('version').innerHTML = 'Current version ' + pkg.version;
if (pkg.dateUpload) {
    document.getElementById('dateUpload').innerHTML = 'Upload : ' + pkg.dateUpload;
}

var pathSoftware = process.argv[0];
fs.stat(pathSoftware, function (err, stats) {
    var contentPer = '';
    if (stats.isFile()) {
        contentPer += pathSoftware + ' this is file' + os.EOL;
    }
    if (stats.isDirectory()) {
        contentPer += pathSoftware + ' this is directory' + os.EOL;
    }
    contentPer += '    size: ' + stats["size"] + os.EOL;
    contentPer += '    mode: ' + stats["mode"] + os.EOL;
    contentPer += '    others eXecute: ' + (stats["mode"] & 1 ? 'x' : '-') + os.EOL;
    contentPer += '    others Write:   ' + (stats["mode"] & 2 ? 'w' : '-') + os.EOL;
    contentPer += '    others Read:    ' + (stats["mode"] & 4 ? 'r' : '-') + os.EOL;

    contentPer += '    group eXecute:  ' + (stats["mode"] & 10 ? 'x' : '-') + os.EOL;
    contentPer += '    group Write:    ' + (stats["mode"] & 20 ? 'w' : '-') + os.EOL;
    contentPer += '    group Read:     ' + (stats["mode"] & 40 ? 'r' : '-') + os.EOL;

    contentPer += '    owner eXecute:  ' + (stats["mode"] & 100 ? 'x' : '-') + os.EOL;
    contentPer += '    owner Write:    ' + (stats["mode"] & 200 ? 'w' : '-') + os.EOL;
    contentPer += '    owner Read:     ' + (stats["mode"] & 400 ? 'r' : '-') + os.EOL;

    contentPer += '    file:           ' + (stats["mode"] & 0100000 ? 'f' : '-') + os.EOL;
    contentPer += '    directory:      ' + (stats["mode"] & 0040000 ? 'd' : '-') + os.EOL;
    if ((stats["mode"] & 100) && (stats["mode"] & 200) && (stats["mode"] & 400)) {
        contentPer += "Have Permission" + os.EOL;
        var logElement = $("#outPut")[0];
        logElement.innerHTML += "You Have All Permission<br>";
        logElement.scrollTop = logElement.scrollHeight;
        if (!copyPath) {
            all.banks.core.services.loadVarsFromConfig()
                .then(function (response) {
                    all.banks.spiderConfig = JSON.parse(response);
                    all.banks.spiderConfig.runPoalimAsakimParallel = true;
                    //all.banks.spiderConfig.spiderId === 'moty_office' || all.banks.spiderConfig.spiderId === 'Kasefet' || all.banks.spiderConfig.spiderId === 'Kasefet2' || all.banks.spiderConfig.spiderId === 'mosa_garis' || all.banks.spiderConfig.spiderId === 'Ido' || all.banks.spiderConfig.spiderId === '82.81.225.234';
                    all.banks.spiderConfig.poalimBizThreadNum = "30";
                    all.banks.spiderConfig.poalimBizCheckThreadNum = "10";
                    all.banks.spiderConfig.numOfAccForRenewLogin = "60";
                    all.banks.spiderConfig.numOfAccForRenewLoginOsh = "60";
                    all.banks.spiderConfig.numOfAccForRenewLoginCards = "30";
                    all.banks.spiderConfig.numberOfOperationsCards = "30";
                    all.banks.spiderConfig.numOfAccForRenewLoginMatah = "60";
                    all.banks.spiderConfig.numberOfOperationsMatah = "30";
                    all.banks.spiderConfig.numberOfOperationsNilvim = "30";
                    all.banks.spiderConfig.numOfAccForRenewLoginNilvim = "60";
                    exportJson.writeFileWithFolder('spider_config.json', all.banks.spiderConfig, {spaces: 4}, function (err) {

                    });
                    all.banks.spiderConfig.time_to_send = 10;
                    if (all.banks.spiderConfig.spiderId !== undefined && all.banks.spiderConfig.spiderId !== "") {
                        all.banks.spiderConfig.sendToServerApi = all.banks.spiderConfig.sendToServer;
                        var postData = {
                            'spiderId': all.banks.spiderConfig.spiderId,
                            'workTime': (all.banks.spiderConfig.isISO === undefined) ? all.banks.spiderConfig.time_to_send : 333,
                            'sendToServer': all.banks.spiderConfig.sendToServer,
                            'versionNum': pkg.version
                        };
                        all.banks.core.services.monitor(postData);
                        (function getTypeCurrency() {
                            all.banks.core.services.getTypeCurrency()
                                .then(function (responseJson) {
                                    if (typeof (responseJson) == "string") {
                                        responseJson = JSON.parse(responseJson);
                                    }
                                    all.banks.generalVariables.typeCurrency = responseJson;
                                }).fail(function (error) {
                                getTypeCurrency();
                            })
                        })();
                        if (/^win/.test(process.platform)) {
                            if (all.banks.spiderConfig.changeIp !== undefined) {
                                if (all.banks.spiderConfig.changeIp === true) {
                                    monitorVpn.checkIfRun();
                                }
                            }
                        }
                        versionProcess();
                        // all.banks.core.services.login()
                        //     .then(function (response) {
                        //         var postData = {
                        //             'spiderId': all.banks.spiderConfig.spiderId,
                        //             'workTime': (all.banks.spiderConfig.isISO === undefined) ? all.banks.spiderConfig.time_to_send : 333,
                        //             'sendToServer': all.banks.spiderConfig.sendToServer,
                        //             'versionNum': pkg.version
                        //         };
                        //         all.banks.core.services.monitor(postData);
                        //         (function getTypeCurrency() {
                        //             all.banks.core.services.getTypeCurrency()
                        //                 .then(function (responseJson) {
                        //                     if (typeof (responseJson) == "string") {
                        //                         responseJson = JSON.parse(responseJson);
                        //                     }
                        //                     all.banks.generalVariables.typeCurrency = responseJson;
                        //                 }).fail(function (error) {
                        //                 getTypeCurrency();
                        //             })
                        //         })();
                        //         if (/^win/.test(process.platform)) {
                        //             if (all.banks.spiderConfig.changeIp !== undefined) {
                        //                 if (all.banks.spiderConfig.changeIp === true) {
                        //                     monitorVpn.checkIfRun();
                        //                 }
                        //             }
                        //         }
                        //         versionProcess();
                        //     })
                        //     .fail(function (error) {
                        //
                        //     })
                    } else {
                        $.get("https://api.ipify.org/?" + new Date().getTime())
                            .done(function (ipAddrress) {
                                ipAddrress = ipAddrress.replace(/\s/g, "");
                                all.banks.spiderConfig.spiderId = ipAddrress;
                                require('request')({
                                    uri: 'https://brightdata.com/api/zone/whitelist',
                                    method: "POST",
                                    body: {'zone': 'residential', 'ip': ipAddrress},
                                    json: true,
                                    headers: {'Authorization': 'Bearer 959bcce2-a1e9-466c-b4b8-eb1d06cdcf4f'}
                                }, (error, response, data) => {

                                });
                                exportJson.writeFileWithFolder('spider_config.json', all.banks.spiderConfig, {spaces: 4}, function (err) {
                                    if (err) {
                                        writeLog('Error writing file');
                                        setTimeout(function () {
                                            all.banks.core.services.reloadPage();
                                        }, 2000);
                                    } else {
                                        all.banks.statusWorkFromRest = false;
                                        all.banks.statusWorkUpdate = false;
                                        all.banks.core.services.reloadPage();
                                    }
                                });
                            })
                    }
                })
                .fail(function (error) {
                    $.get("http://icanhazip.com")
                        .done(function (ipAddrress) {
                            ipAddrress = ipAddrress.replace(/\s/g, "");
                            if (ipAddrress == undefined || ipAddrress == "") {
                                all.banks.core.services.editConfig();
                            } else {
                                fs.stat("imageSpider.json", function (error, exist) {
                                    // require('request')({
                                    //     uri: 'https://brightdata.com/api/zone/domain_perm',
                                    //     method: "POST",
                                    //     body: {'zone': 'residential','type':'whitelist','domain':ipAddrress},
                                    //     json:true,
                                    //     headers: {'Authorization': 'Bearer 959bcce2-a1e9-466c-b4b8-eb1d06cdcf4f'}
                                    // }, (error, response, data) => {
                                    //
                                    // });

                                    require('request')({
                                        uri: 'https://brightdata.com/api/zone/whitelist',
                                        method: "POST",
                                        body: {'zone': 'residential', 'ip': ipAddrress},
                                        json: true,
                                        headers: {'Authorization': 'Bearer 959bcce2-a1e9-466c-b4b8-eb1d06cdcf4f'}
                                    }, (error, response, data) => {

                                    });
                                    var dataJsonConfig = {
                                        "spiderId": ipAddrress,
                                        "sendToServer": "https://dataload.bizibox.biz",
                                        "time_to_send": 10,
                                        "Ppoalim": false,
                                        "isMizrahiJson": false,
                                        "IsLeumiSilukin": false,
                                        "IsGamaWithout_VPN_PROXY": false,
                                        "Ppass": "",
                                        "Ptarget_id": "df3a5b1b-4747-410b-8f4a-86cdd5b3fe10",
                                        "Ptoken": "df3a5b1b-4747-410b-8f4a-86cdd5b3fe10",
                                        "changeIp": false,
                                        "timeToChaneIp": "2"
                                    }
                                    if (error == null && /^linux/.test(process.platform)) {
                                        dataJsonConfig.changeIp = true;
                                        dataJsonConfig.isISO = true;
                                        dataJsonConfig.sendToServer = "https://dataload.bizibox.biz";

                                        setVpnLoginFunc.setVpnLogin((isSet) => {
                                            if (isSet) {
                                                if(isSet !== true){
                                                    dataJsonConfig.vpn_type = isSet;
                                                }
                                                dataJsonConfig.changeIp = true;
                                            } else {
                                                dataJsonConfig.changeIp = false;
                                            }
                                            exportJson.writeFileWithFolder('spider_config.json', dataJsonConfig, {spaces: 4}, function (err) {
                                                if (err) {
                                                    console.log('Error writing file');
                                                } else {
                                                    setTimeout(() => {
                                                        setVpnLoginFunc.reboot((rebootSuc) => {
                                                            if (!rebootSuc) {
                                                                all.banks.core.services.reloadPage();
                                                            }
                                                        });
                                                    }, 10000);
                                                }
                                            });
                                        })
                                    } else {
                                        exportJson.writeFileWithFolder('spider_config.json', dataJsonConfig, {spaces: 4}, function (err) {
                                            if (err) {
                                                console.log('Error writing file');
                                            } else {
                                                all.banks.core.services.reloadPage();
                                            }
                                        });
                                    }


                                });
                            }
                        }).fail(function () {
                        all.banks.core.services.editConfig();
                    })
                })
        } else {
            versionProcess();
        }
    } else {
        var permissionText = "";
        if (!(stats["mode"] & 100)) {
            contentPer += "Not Have Permission for eXecute" + os.EOL;
            permissionText += "Not Have Permission for eXecute <br>";
        }
        if (!(stats["mode"] & 200)) {
            contentPer += "Not Have Permission for Write" + os.EOL;
            permissionText += "Not Have Permission for Write <br>";
        }
        if (!(stats["mode"] & 400)) {
            contentPer += "Not Have Permission for Read" + os.EOL;
            permissionText += "Not Have Permission for Read <br>";
        }
        all.banks.statusWorkFromRest = true;
        all.banks.statusWorkUpdate = true;
        var logElement = $("#outPut")[0];
        logElement.innerHTML += permissionText + "<br>";
        logElement.scrollTop = logElement.scrollHeight;
        // all.banks.core.services.loadVarsFromConfig()
        // .then(function (response) {
        // 	all.banks.spiderConfig = JSON.parse(response);
        // 	all.banks.spiderConfig.time_to_send = 10;
        // 	all.banks.spiderConfig.sendToServerApi = all.banks.spiderConfig.sendToServer;
        // 	var nameSpider = "<b>spiderId: </b>" + all.banks.spiderConfig.spiderId + "<br><b>versionNum: </b>" + pkg.version;
        // 	var stack = "<b>message: </b>" + contentPer;
        // 	var title = "חסימת הרשאה בספיידר גרסה מלאה - דחוף!!!";
        // 	var paramsData = {
        // 		url: "https://bizibox2015.visualstudio.com/DefaultCollection/bizibox/_apis/wit/workitems/$Task?api-version=1.0",
        // 		xhrFields: {
        // 			withCredentials: true
        // 		},
        // 		method: "PATCH",
        // 		type: "PATCH",
        // 		data: JSON.stringify(
        // 			[
        // 				{
        // 					"op": "add",
        // 					"path": "/fields/System.Title",
        // 					"value": title
        // 				},
        // 				{
        // 					"op": "add",
        // 					"path": "/fields/System.AssignedTo",
        // 					"value": "ido aizenshtein <ido@bizibox.biz>"
        // 				},
        // 				{
        // 					"op": "add",
        // 					"path": "/fields/Microsoft.VSTS.Scheduling.RemainingWork",
        // 					"value": 1
        // 				},
        // 				{
        // 					"op": "add",
        // 					"path": "/fields/System.AreaPath",
        // 					"value": "bizibox\\spider 2"
        // 				},
        // 				{
        // 					"op": "add",
        // 					"path": "/fields/Microsoft.VSTS.TCM.ReproSteps",
        // 					"value": "<p style='font-size:15px'>" + nameSpider + "<br> " + stack + "</p>"
        // 				},
        // 				{
        // 					"op": "add",
        // 					"path": "/fields/System.WorkItemType",
        // 					"value": "Bug"
        // 				},
        // 				{
        // 					"op": "add",
        // 					"path": "/fields/System.Tags",
        // 					"value": "spider 2;"
        // 				}
        // 			]
        // 		),
        // 		headers: {
        // 			'Accept': '*/*',
        // 			'Content-Type': 'application/json-patch+json',
        // 			'Authorization': 'Basic ' + btoa("" + ":" + "5aznizuiwje4av3ymkgxxlzu6lxx3jgua64rqdnvixamhmjsyt7a")
        // 		}
        // 	};
        // 	$.ajax(paramsData);
        // }).fail(function () {
        // 	var nameSpider = "<b>spiderId: </b>" + "לא ידוע" + "<br><b>versionNum: </b>" + pkg.version;
        // 	var stack = "<b>message: </b>" + contentPer;
        // 	var title = "חסימת הרשאה בספיידר גרסה מלאה - דחוף!!!";
        // 	var paramsData = {
        // 		url: "https://bizibox2015.visualstudio.com/DefaultCollection/bizibox/_apis/wit/workitems/$Task?api-version=1.0",
        // 		xhrFields: {
        // 			withCredentials: true
        // 		},
        // 		method: "PATCH",
        // 		type: "PATCH",
        // 		data: JSON.stringify(
        // 			[
        // 				{
        // 					"op": "add",
        // 					"path": "/fields/System.Title",
        // 					"value": title
        // 				},
        // 				{
        // 					"op": "add",
        // 					"path": "/fields/System.AssignedTo",
        // 					"value": "ido aizenshtein <ido@bizibox.biz>"
        // 				},
        // 				{
        // 					"op": "add",
        // 					"path": "/fields/Microsoft.VSTS.Scheduling.RemainingWork",
        // 					"value": 1
        // 				},
        // 				{
        // 					"op": "add",
        // 					"path": "/fields/System.AreaPath",
        // 					"value": "bizibox\\spider 2"
        // 				},
        // 				{
        // 					"op": "add",
        // 					"path": "/fields/Microsoft.VSTS.TCM.ReproSteps",
        // 					"value": "<p style='font-size:15px'>" + nameSpider + "<br> " + stack + "</p>"
        // 				},
        // 				{
        // 					"op": "add",
        // 					"path": "/fields/System.WorkItemType",
        // 					"value": "Bug"
        // 				},
        // 				{
        // 					"op": "add",
        // 					"path": "/fields/System.Tags",
        // 					"value": "spider 2;"
        // 				}
        // 			]
        // 		),
        // 		headers: {
        // 			'Accept': '*/*',
        // 			'Content-Type': 'application/json-patch+json',
        // 			'Authorization': 'Basic ' + btoa("" + ":" + "5aznizuiwje4av3ymkgxxlzu6lxx3jgua64rqdnvixamhmjsyt7a")
        // 		}
        // 	};
        // 	$.ajax(paramsData);
        // })

    }
    fs.writeFile('./sysPer.txt', contentPer, function (err) {
    });
});

function versionProcess() {
    if (!copyPath) {
        if (!d && !tryingForNewVersion && !all.banks.statusWorkFromRest) {
            tryingForNewVersion = true; //lock
            upd.checkNewVersion(versionChecked, true);
        }
        newVersionCheckIntervalId = setInterval(function () {
            if (!d && !tryingForNewVersion && !all.banks.statusWorkFromRest) {
                tryingForNewVersion = true; //lock
                upd.checkNewVersion(versionChecked);
            }
        }, 10000);
    } else {
        all.banks.spiderConfig.status = 'update';
        document.getElementById('version').innerHTML = 'copying app';
        upd.install(copyPath, newAppInstalled);

        function newAppInstalled(err) {
            if (err) {
                console.log(err);
                return;
            }
            upd.run(execPath, null);
            nw.App.quit();
        }
    }
}

function versionChecked(err, newVersionExists, manifest, loadConfig) {
    if (!all.banks.statusWorkFromRest) {
        tryingForNewVersion = false; //unlock
        if (err) {
            if (newVersionExists) {
                all.banks.core.main.loadConfig();
            }
            console.log(err);
            return Error(err);
        } else if (d) {
            if (loadConfig) {
                all.banks.core.main.loadConfig();
            }
            console.log('Already downloading');
            return;
        } else if (!newVersionExists) {
            if (loadConfig) {
                all.banks.core.main.loadConfig();
            }
            console.log('No new version exists');
            return;
        }

        all.banks.statusWorkUpdate = true;
        all.banks.spiderConfig.status = 'update';
        d = true;
        if (loadConfig) {
            all.banks.core.main.loadConfig();
        }
        clearInterval(newVersionCheckIntervalId);

        upd.deletedFolders(runAfterDeletedFolders);

        function runAfterDeletedFolders() {
            upd.download(function (error, filename) {
                newVersionDownloaded(error, filename, manifest);
            }, manifest);
            process.on('chunk', function (chunk) {
                document.getElementById('loaded').innerHTML = "New version loading " + chunk + '%';
            });
        }
    }
}

function newVersionDownloaded(err, filename, manifest) {
    if (err) {
        console.log(err);
        return Error(err);
    }
    document.getElementById('loaded').innerHTML = "unpacking: " + filename;
    upd.unpack(filename, newVersionUnpacked, manifest);
}

function newVersionUnpacked(err, newAppPath, versionDownloadFull, filesFolders) {
    if (err) {
        console.log(err);
        return Error(err);
    }
    window.localStorage.removeItem("vpnTimeNow");
    window.localStorage.removeItem("vpnTimeLinuxFindBest");
    if (versionDownloadFull) {
        upd.runInstaller(newAppPath, [upd.getAppPath(), upd.getAppExec()]);
        upd.runMonitorAll(function () {
            nw.App.quit();
        });
    } else {
        upd.installOnlyFiles(filesFolders, newAppInstalledFiles);

        function newAppInstalledFiles(err) {
            if (err) {
                console.log(err);
            }
            upd.deletedFolders(runAfterDeletedFolders);
        }

        function runAfterDeletedFolders() {
            upd.runMonitorAll(function () {
                setTimeout(function () {
                    chrome.runtime.reload();
                }, 1000)
            });
        }
    }
}

memoryCPUsInfo();

function downloadVer(type) {
    if (!all.banks.statusWorkFromRest) {
        all.banks.statusWorkUpdate = true;
        all.banks.spiderConfig.status = 'update';
        d = true;
        clearInterval(newVersionCheckIntervalId);
        upd.downloadDirectlyVer(type, function (error, filename, manifest) {
            newDevVersionDownloaded(error, filename, manifest);
        });
        process.on('chunk', function (chunk) {
            document.getElementById('loaded').innerHTML = "New version loading " + chunk + '%';
        });
    }
}

function newDevVersionDownloaded(err, filename, manifest) {
    if (err) {
        console.log(err);
        return Error(err);
    }
    document.getElementById('loaded').innerHTML = "unpacking: " + filename;
    upd.unpack(filename, newDevVersionUnpacked, manifest);
}

function newDevVersionUnpacked(err, newAppPath, versionDownloadFull, filesFolders) {
    if (err) {
        console.log(err);
        return Error(err);
    }
    window.localStorage.removeItem("vpnTimeNow");
    window.localStorage.removeItem("vpnTimeLinuxFindBest");
    upd.installOnlyFiles(filesFolders, newAppInstalledFiles);

    function newAppInstalledFiles(err) {
        if (err) {
            console.log(err);
        }
        upd.deletedFolders(runAfterDeletedFolders);
    }

    function runAfterDeletedFolders() {
        upd.runMonitorAll(function () {
            setTimeout(function () {
                chrome.runtime.reload();
            }, 1000)
        });
    }
}


function funcNav(fun) {
    if (fun == "reload") {
        all.banks.core.services.reloadPage();
    }
    if (fun == "config") {
        all.banks.core.services.editConfig();
    }
    if (fun == "token") {
        all.banks.core.services.loadToken();
    }
    if (fun == "version") {
        all.banks.core.services.showVersion();
    }
    if (fun == "json") {
        window.open("angular2Table/index.html");
    }
    if (fun == "testVersion") {
        all.banks.core.services.testVersion();
    }
}

$(function () {
    setInterval(function () {
        var precentMemory = getMemory().toFixed(2);
        +$("#progressBarMemory").css({"width": precentMemory + "%"}).text(precentMemory + "%");
    }, 1500);

    // Give it a menu
    //var menu = new nw.Menu();
    //menu.append(new nw.MenuItem({
    //	label: "Reload Page",
    //	click: function () {
    //		//tray.remove();
    //		//tray = null;
    //		nw.App.clearCache();
    //		all.banks.statusWorkFromRest = false;
    //		win.reload();
    //	}
    //}));
    //menu.append(new nw.MenuItem({
    //	label: "Dev Tools",
    //	click: function () {
    //		win.showDevTools();
    //	}
    //}));
    //menu.append(new nw.MenuItem({
    //	label: "Clear Cache",
    //	click: function () {
    //		nw.App.clearCache();
    //	}
    //}));
    //menu.append(new nw.MenuItem({
    //	label: "Close App",
    //	click: function () {
    //		nw.App.closeAllWindows();
    //	}
    //}));
    //tray.menu = menu;
    nw.App.clearCache();
//win.focus();
//	win.on('close', function () {
//		all.banks.spiderConfig.status = 'off';
//		nw.App.clearCache();
//		nw.App.quit();
//	});
    //
    //var https = require('https');
    //var cheerio = require('cheerio');
    //var destinationPath = "logs/index.html";
    //var file = fs.createWriteStream(destinationPath);
    //$.get("https://biz.bankhapoalim.co.il/cgi-bin/poalwwwc").done(function (data) {
    //	file.write('<meta charset="utf-8">'+data);
    //	file.end();
    //
    //	fs.readFile(destinationPath, 'utf8', function (err,data) {
    //		if (err) {
    //			return console.log(err);
    //		}
    //		var htmlpage = cheerio.load(data);
    //		console.log(htmlpage('.table12').text());
    //	});
    //})

    //var https = require('https');
    //var cheerio = require('cheerio');
    //var destinationPath = "logs/index.html";
    //var file = fs.createWriteStream(destinationPath);
    //$.get("https://biz.bankhapoalim.co.il/cgi-bin/poalwwwc")
    //	.done(function (data) {
    //	file.write(data);
    //	file.end();
    //
    //	fs.readFile(destinationPath, 'utf8', function (err, data) {
    //		if (err) {
    //			return console.log(err);
    //		}
    //
    //		var $$ = cheerio.load(data);
    //		var aa = $$('.table12');
    //		$$ = null;
    //		console.log(aa);
    //	});
    //})
    //all.banks.core.main.loadConfig();
    // console.log = function(){};
    // console.error = function(){};
    // console.info = function(){};
    // console.warn = function(){};
    // console.dir = function(){};
    // console.time = function(){};
    // console.timeEnd = function(){};
    // console.trace = function(){};
    // console.assert = function(){};
});
//  "node-remote": "<all_urls>",
