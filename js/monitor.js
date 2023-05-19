class MonitorActivitySoftware {
    constructor() {
        this.activity = 0;
        this.activitySoftware = 0;
        this.getIntervalActivity();
    }

    setIntervalActivity() {
        this.activity += 1;
    }

    getIntervalActivity() {
        setInterval(() => {
            if (this.activitySoftware !== this.activity) {
                this.activitySoftware = this.activity;
            } else {
                nw.App.clearCache();
                // if (document.getElementById("filecontainerlogin") !== undefined) {
                //     var iframeWin = document.getElementById("filecontainerlogin").contentWindow;
                //     // if (iframeWin.localStorage) {
                //     //     iframeWin.localStorage.clear();
                //     // }
                //     // if (iframeWin.sessionStorage) {
                //     //     iframeWin.sessionStorage.clear();
                //     // }
                // }
                var win = nw.Window.get();
                win.cookies.getAll({},
                    function (cookies) {
                        if (cookies && cookies.length) {
                            for (var i = 0; i < cookies.length; i++) {
                                removeCookie(cookies[i]);
                                if (i + 1 == cookies.length) {
                                    if (logLast !== undefined) {
                                        all.banks.core.services.errorLog("טעינה מחודשת" + logLast);
                                    } else {
                                        all.banks.core.services.errorLog("טעינה מחודשת");
                                    }
                                }
                            }
                        } else {
                            if (logLast !== undefined) {
                                all.banks.core.services.errorLog("טעינה מחודשת" + logLast);
                            } else {
                                all.banks.core.services.errorLog("טעינה מחודשת");
                            }
                        }
                    });

                function removeCookie(cookie) {
                    win.cookies.remove({
                        url: "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path,
                        name: cookie.name
                    }, function (result) {
                        if (!result) {
                            console.log('cookie removal failed');
                        }
                    });
                }
            }
        }, 120000);
    }
}

var monitorActivityClass = new MonitorActivitySoftware();

var deleteOldLogs = require('./js/deleteOldLogs.js');

const {exec} = require('child_process');

class deleteOldFilesLogs {
    constructor() {
        this.linuxUsed = 0;

        if (process.platform === 'linux') {
            exec('df /dev/nvme0n1 -h --output=pcent', (err, stdout, stderr) => {
                if (err === null) {
                    const used = Number(stdout.toString().match(/\d+/)[0]);
                    console.log('% used:', used);
                    this.linuxUsed = used;
                    this.constructorAlt();
                } else {
                    exec('df /dev/nvme0n1p3 -h --output=pcent', (err, stdout, stderr) => {
                        const used = Number(stdout.toString().match(/\d+/)[0]);
                        console.log('% used:', used);
                        this.linuxUsed = used;
                        this.constructorAlt();
                    });
                }
            });
        } else {
            this.constructorAlt();
        }
    }

    constructorAlt() {
        this.now = new Date();
        this.dateFormat = this.now.getFullYear() + "-" + (this.now.getMonth() + 1) + "-" + this.now.getDate();
        let dateDeletedLogsOld = window.localStorage.getItem("dateDeletedLogsOld");
        if (dateDeletedLogsOld === null) {
            this.deleteAllOldLogs();
        } else if (dateDeletedLogsOld !== this.dateFormat) {
            this.deleteAllOldLogs();
        } else {
            this.setMidnight();
        }
    }

    setMidnight() {
        this.night = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate() + 1, 0, 0, 0);
        this.msToMidnight = this.night.getTime() - this.now.getTime();
        this.timeOurToRunFunc();
    }

    deleteAllOldLogs() {
        deleteOldLogs.deleteOldLogs((num) => {
            window.localStorage.setItem("dateDeletedLogsOld", this.dateFormat);
            window.localStorage.setItem("NumLogsDeletedLastTime", num);
            this.constructorAlt();
        }, this.linuxUsed);
    }

    timeOurToRunFunc() {
        var times = setTimeout(() => {
            clearTimeout(times);
            this.deleteAllOldLogs();
        }, this.msToMidnight);
    }
}

var deleteLog = new deleteOldFilesLogs();

// var dns = require('dns');
var vpnHideIp = require('./js/connectToVpn.js');
var requests = require('request');
var request = requests.defaults({jar: requests.jar()});
var connectToVpn = new vpnHideIp();
class monitorTimeVpnConnect {
    constructor() {
        this.runTime = 0;
    }

    checkVpnTime(change, cb) {
        this.now = new Date();
        var vpnTime = window.localStorage.getItem("vpnTime");
        var isIsrael = (change && change === 'israel');
        if (isIsrael) {
            change = false
        }
        if (vpnTime === null) {
            this.runVpn(cb, true, isIsrael);
        } else {
            var diff = Math.abs(new Date() - new Date(vpnTime));
            var minutes = Math.floor((diff / 1000) / 60);
            var timeToChaneIp = parseInt(all.banks.spiderConfig.timeToChaneIp);
            if (isNaN(timeToChaneIp) && change === undefined) {
                this.runVpn(cb, true, isIsrael);
            } else {
                if (change) {
                    this.runVpn(cb, true, isIsrael);
                } else {
                    if (minutes > timeToChaneIp) {
                        this.runVpn(cb, true, isIsrael);
                    } else {
                        this.runVpn(cb, false, isIsrael);
                    }
                }
            }
        }
    }

    runVpn(cb, runSoft, isIsrael) {
        request.get('http://icanhazip.com', {timeout: 15000, family: 4}, (err, req, ip) => {
            if (err !== null) {
                this.connectOrChange(cb, true, isIsrael);
            } else {
                this.ipAddrress = ip.replace(/\s/g, "");
                if (this.ipAddrress === all.banks.spiderConfig.spiderId) {
                    this.connectOrChange(cb, true, isIsrael);
                } else {
                    if (runSoft) {
                        runSoft = "change";
                    }
                    this.connectOrChange(cb, runSoft, isIsrael);
                }
            }
        });
    }

    connectOrChange(cb, runSoft, isIsrael) {
        monitorActivityClass.setIntervalActivity();
        if (/^linux/.test(process.platform)) {
            var vpnTimeLinuxFindBest = window.localStorage.getItem("vpnTimeLinuxFindBest");
            if (vpnTimeLinuxFindBest === null) {
                window.localStorage.setItem("vpnTimeLinuxFindBest", new Date());
                if (isIsrael) {
                    runSoft = "-i";
                    writeLog("---- Change IP to Israel ----");
                } else {
                    runSoft = "-f";
                    writeLog("---- Find IP by ping test ----");
                }
            } else {
                var diff = Math.abs(new Date() - new Date(vpnTimeLinuxFindBest));
                var minutes = Math.floor((diff / 1000) / 60);
                if (minutes > 120) {
                    window.localStorage.setItem("vpnTimeLinuxFindBest", new Date());
                    if (isIsrael) {
                        runSoft = "-i";
                        writeLog("---- Change IP to Israel ----");
                    } else {
                        runSoft = "-f";
                        writeLog("---- Find IP by ping test ----");
                    }
                } else {
                    if (isIsrael) {
                        runSoft = "-i";
                        writeLog("---- Change IP to Israel ----");
                    } else {
                        runSoft = "-m";
                        writeLog("---- Change IP by list exist ----");
                    }
                }
            }
        }

        connectToVpn.ConnectVpn(runSoft, (response) => {
            if (!response) {
                writeLog("---- IP not changed - IP remaining to be: " + this.ipAddrress + "----");
                this.afterConnect(cb);
            } else {
                writeLog("---- Finished Change IP by list exist - Now check it----");
                window.localStorage.setItem("vpnTime", this.now);
                this.checkTime = new Date();
                this.checkIfChange(cb);
            }
        });
    }

    checkIfChange(cb) {
        monitorActivityClass.setIntervalActivity();
        this.runTime += 1;
        writeLog("---- checkIfChange ----");
        request.get('http://icanhazip.com', {timeout: 15000, family: 4}, (err, req, res) => {
            if (err !== null) {
                writeLog("---- Not change yet ---- err icanhazip -----");

                if (this.runTime < 20) {
                    setTimeout(() => this.checkIfChange(cb), 6000);
                } else {
                    this.killVpn((response) => {
                        this.runTime = 0;
                        upd.checkNewVersion((err, newVersionExists, manifest) => {
                            if (err) {
                                this.checkIfChange(cb);
                                return;
                            } else if (!newVersionExists) {
                                this.checkIfChange(cb);
                                return;
                            } else {
                                myEmitterLogs(9, 'New Version');
                                return;
                            }
                        });
                    }, true);
                }
            } else {
                var ip = res;
                let ipNow = ip.replace(/\s/g, "");
                writeLog("---- Real ip addrress -----" + all.banks.spiderConfig.spiderId);
                writeLog("---- ip addrress now -----" + ipNow);
                writeLog("---- The last ip addrress till now -----" + this.ipAddrress);

                if ((ipNow !== this.ipAddrress) && (ipNow !== all.banks.spiderConfig.spiderId)) {
                    all.banks.accounts.poalimAsakimNew.IpAddress = ipNow.replace(/\s/g, "");
                    writeLog("---- IP successfully changed - Now IP is: " + ipNow + "----");
                    this.afterConnect(cb, true);
                } else {
                    if (this.runTime < 20) {
                        if (this.runTime === 10) {
                            writeLog("---- Not change yet - try to change again ----");
                            this.killVpn(() => {
                                this.checkVpnTime(false, cb);
                            });
                        } else {
                            writeLog("---- Not change yet ----");
                            setTimeout(() => this.checkIfChange(cb), 6000);
                        }
                    } else {
                        writeLog("---- Not change a long time ----");
                        window.localStorage.removeItem("vpnTimeLinuxFindBest")
                        this.killVpn((response) => {
                            this.runTime = 0;
                            upd.checkNewVersion((err, newVersionExists, manifest) => {
                                if (err) {
                                    this.checkVpnTime(true, cb);
                                    return;
                                } else if (!newVersionExists) {
                                    this.checkVpnTime(true, cb);
                                    return;
                                } else {
                                    myEmitterLogs(9, 'New Version');
                                    return;
                                }
                            });
                        }, true);
                    }
                }
            }
        })
    }

    checkIfRun() {
        var vpnTimeNow = window.localStorage.getItem("vpnTimeNow");
        if (vpnTimeNow === null) {
            window.localStorage.setItem("vpnTimeNow", new Date());
        }
        connectToVpn.checkIfRun().then((run) => {
            if (run === 1) {
                request.get('http://icanhazip.com', {timeout: 15000, family: 4}, (err, req, res) => {
                    if (err !== null) {
                        // if(err.code === 'ETIMEDOUT' || err.connect === true){
                        var diff = Math.abs(new Date() - new Date(window.localStorage.getItem("vpnTimeNow")));
                        var minutes = Math.floor((diff / 1000) / 60);
                        if (minutes > 1) {
                            window.localStorage.removeItem("vpnTimeNow");
                            connectToVpn.killVpn((response) => {
                                this.checkVpnTime(true, (res) => {
                                    setTimeout(() => {
                                        this.checkIfRun();
                                    }, 10000);
                                })
                            });
                        } else {
                            setTimeout(() => {
                                this.checkIfRun();
                            }, 10000);
                        }
                    } else {
                        var ip = res;
                        if (ip.replace(/\s/g, "") === all.banks.spiderConfig.spiderId) {
                            var diff = Math.abs(new Date() - new Date(window.localStorage.getItem("vpnTimeNow")));
                            var minutes = ((diff / 1000) / 60);
                            if (minutes > 0.5) {
                                window.localStorage.removeItem("vpnTimeNow");
                                connectToVpn.killVpn((response) => {
                                    this.checkVpnTime(true, (res) => {
                                        setTimeout(() => {
                                            this.checkIfRun();
                                        }, 10000);
                                    })
                                });
                            } else {
                                setTimeout(() => {
                                    this.checkIfRun();
                                }, 10000);
                            }
                        } else {
                            window.localStorage.removeItem("vpnTimeNow");
                            setTimeout(() => {
                                this.checkIfRun();
                            }, 10000);
                        }
                    }
                });
            } else if (run === 0) {
                window.localStorage.removeItem("vpnTimeNow");
                setTimeout(() => {
                    this.checkIfRun();
                }, 10000);
            }
        });
    }

    killVpn(cb, deleteStore) {
        if (deleteStore) {
            window.localStorage.removeItem("vpnTimeNow");
            window.localStorage.removeItem("vpnTimeLinuxFindBest");
        }

        if (/^linux/.test(process.platform)) {
            connectToVpn.killVpn((response) => {
                cb(response);
            });
        } else {
            cb(true);
        }
    }

    afterConnect(cb, changeIp) {
        if (changeIp) {
            cb(true);
        } else {
            cb(false);
        }
    }
}

var monitorVpn = new monitorTimeVpnConnect();
