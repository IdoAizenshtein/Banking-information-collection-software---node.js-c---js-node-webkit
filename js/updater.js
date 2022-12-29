var requests = require('request');
var request = requests.defaults({jar: requests.jar()});

var path = require('path');
var os = require('os');
var fs = require('fs');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var ncp = require('ncp');
var del = require('del');
var semver = require('semver');
var url = require('url');
var http = require('http');
var https = require('https');
var fsPath = require('fs-path');

var platform = process.platform;

if (/^win/.test(platform)) {
    var wshortLink = require('./lib/windows-shortcuts.js');
}

platform = /^win/.test(platform) ? 'win' : /^darwin/.test(platform) ? 'mac' : 'linux' + (process.arch == 'ia32' ? '32' : '64');

var platformArch = process.platform;
platformArch = /^win/.test(platformArch) ? 'win' + (process.env.hasOwnProperty('ProgramFiles(x86)') == false ? '32' : '64') : /^darwin/.test(platformArch) ? 'mac' : 'linux' + (process.arch == 'ia32' ? '32' : '64');

function updater(manifest, options) {
    this.manifest = manifest;
    this.options = {
        temporaryDirectory: options
    };
}

updater.prototype.checkNewVersion = function (cb, loadConfig) {
    var mainfest_url;
    if (this.manifest.versionDownloadFull || !this.manifest.versionTest) {
        mainfest_url = this.manifest.manifestUrl;
    } else {
        mainfest_url = this.manifest.manifestTestUrl;
    }
    request.get(mainfest_url, {timeout: 3500, family: 4}, gotManifest.bind(this));

    function gotManifest(err, req, data) {
        if (err) {
            return cb(err, loadConfig);
        }
        if (req.statusCode < 200 || req.statusCode > 299) {
            return cb(new Error(req.statusCode), loadConfig);
        }
        try {
            this.manifestRemote = JSON.parse(data);
        } catch (e) {
            return cb(e, loadConfig)
        }
        if (this.manifest.versionTest) {
            cb(null, true, this.manifestRemote, loadConfig);
        } else {
            cb(null, semver.gt(this.manifestRemote.version, this.manifest.version), this.manifestRemote, loadConfig);
        }
    }
};

// updater.prototype.checkUrl = function (uri) {
// 	if (this.protocol == "http") {
// 		var manifestUrl = "http://192.168.10.249";
// 		return uri.replace("https://php.bizibox.biz", manifestUrl);
// 	}
// 	else {
// 		return uri;
// 	}
// };

updater.prototype.download = function (cb, newManifest) {
    fsPath.mkdirSync(this.options.temporaryDirectory);
    if (platform == "win") {
        exec("TASKKILL /F /IM MonitorBizibox.exe");
        exec("TASKKILL /F /IM biziboxMonitor.exe");
        exec("TASKKILL /F /IM monitorExporter.exe");
    }
    var manifest = newManifest || this.manifestRemote;
    if (manifest.versionDownloadFull) {
        var file_url = manifest.packages[platformArch].url;
    } else {
        if (!manifest.versionTest) {
            var file_url = manifest.packagesFiles[platform].url;
        } else {
            var file_url = manifest.packagesFilesTests[platform].url;
        }
    }
    console.log(file_url);
    var host = url.parse(file_url).host;
    var protocol = https, port = 443;
    // if (this.protocol == "http") {
    // 	host = "192.168.10.249";
    // 	protocol = http;
    // 	port = 80;
    // }
    var options = {
        host: host,
        port: port,
        path: url.parse(file_url).pathname,
        family: 4
    };
    var file_name = url.parse(file_url).pathname.split('/').pop();
    var destinationPath = path.join(this.options.temporaryDirectory, file_name);
    fs.unlink(path.join(this.options.temporaryDirectory, file_name), function () {
        var file = fs.createWriteStream(destinationPath);
        var getRequest = protocol.get(options, function (res) {
            var fsize = res.headers['content-length'];
            res.on('data', function (data) {
                file.write(data);
                process.emit('chunk', parseInt(100 - (((fsize - file.bytesWritten) / fsize) * 100)));
            })
                .on('end', function () {
                    file.end();
                    cb(null, destinationPath);
                });
        }).on('error', function (e) {
            console.error(e);
        });
        getRequest.on('socket', function (socket) {
            socket.setTimeout(3500, function () {
                getRequest.abort();
            });
        });
    });
};

updater.prototype.downloadDirectlyVer = function (type, cb) {
    var mainfest_url = this.manifest.manifestUrl;
    request.get(mainfest_url, {timeout: 3500, family: 4}, gotManifest.bind(this));

    function gotManifest(err, req, data) {
        if (err) {
            return cb(err);
        }
        if (req.statusCode < 200 || req.statusCode > 299) {
            return cb(new Error(req.statusCode));
        }
        try {
            this.manifestRemote = JSON.parse(data);
            fsPath.mkdirSync(this.options.temporaryDirectory);
            if (platform == "win") {
                exec("TASKKILL /F /IM MonitorBizibox.exe");
                exec("TASKKILL /F /IM biziboxMonitor.exe");
                exec("TASKKILL /F /IM monitorExporter.exe");
            }
            var manifest = this.manifestRemote;
            var file_url;
            if (type === 'PROD') {
                file_url = manifest.packagesFiles[platform].url;
            } else if (type === 'STG') {
                file_url = manifest.packagesFilesTests[platform].url;
            } else if (type === 'DEV') {
                file_url = manifest.packagesFilesDev[platform].url;
            }
            console.log(file_url);
            var host = url.parse(file_url).host;
            var protocol = https, port = 443;
            var options = {
                host: host,
                port: port,
                path: url.parse(file_url).pathname,
                family: 4
            };
            console.log(file_url);
            var file_name = url.parse(file_url).pathname.split('/').pop();
            var destinationPath = path.join(this.options.temporaryDirectory, file_name);
            fs.unlink(path.join(this.options.temporaryDirectory, file_name), function () {
                var file = fs.createWriteStream(destinationPath);
                var getRequest = protocol.get(options, function (res) {
                    var fsize = res.headers['content-length'];
                    res.on('data', function (data) {
                        file.write(data);
                        process.emit('chunk', parseInt(100 - (((fsize - file.bytesWritten) / fsize) * 100)));
                    })
                        .on('end', function () {
                            file.end();
                            cb(null, destinationPath, manifest);
                        });
                }).on('error', function (e) {
                    console.error(e);
                });
                getRequest.on('socket', function (socket) {
                    socket.setTimeout(3500, function () {
                        getRequest.abort();
                    });
                });
            });
        } catch (e) {
            return cb(e)
        }
    }
};

updater.prototype.getAppPath = function () {
    var appPath = {
        mac: path.join(process.cwd(), '../../..'),
        win: path.dirname(process.execPath)
    };
    appPath.linux32 = appPath.win;
    appPath.linux64 = appPath.win;
    return appPath[platform];
};

updater.prototype.getAppExec = function () {
    var execFolder = this.getAppPath();
    var exec = {
        mac: '',
        win: path.basename(process.execPath),
        linux32: path.basename(process.execPath),
        linux64: path.basename(process.execPath)
    };
    return path.join(execFolder, exec[platform]);
};

updater.prototype.unpack = function (filename, cb, manifest) {
    pUnpack[platform](filename, cb, manifest, this.options.temporaryDirectory);
};

var getZipDestinationDirectory = function (zipPath, temporaryDirectory) {
        return path.join(temporaryDirectory, path.basename(zipPath, path.extname(zipPath)));
    },
    getExecPathRelativeToPackage = function (manifest) {
        var execPath = manifest.packages[platform] && manifest.packages[platform].execPath;

        if (execPath) {
            return execPath;
        } else {
            var suffix = {
                win: '.exe',
                mac: '.app'
            };
            return manifest.name + (suffix[platform] || '');
        }
    };

var pUnpack = {
    mac: function (filename, cb, manifest, temporaryDirectory) {
        var args = arguments,
            extension = path.extname(filename),
            destination = path.join(temporaryDirectory, path.basename(filename, extension));

        fs.stat(destination, function (error, exist) {
            if (error) {
                fs.mkdirSync(destination);
            }
        });

        if (extension === ".zip") {
            exec('unzip -xo "' + filename + '" >/dev/null', {cwd: destination}, function (err) {
                if (err) {
                    console.log(err);
                    return cb(err);
                }
                var appPath = path.join(destination, getExecPathRelativeToPackage(manifest));
                cb(null, appPath);
            })

        } else if (extension === ".dmg") {
            // just in case if something was wrong during previous mount
            exec('hdiutil unmount /Volumes/' + path.basename(filename, '.dmg'), function (err) {
                // create a CDR from the DMG to bypass any steps which require user interaction
                var cdrPath = filename.replace(/.dmg$/, '.cdr');
                exec('hdiutil convert "' + filename + '" -format UDTO -o "' + cdrPath + '"', function (err) {
                    exec('hdiutil attach "' + cdrPath + '" -nobrowse', function (err) {
                        if (err) {
                            if (err.code == 1) {
                                pUnpack.mac.apply(this, args);
                            }
                            return cb(err);
                        }
                        findMountPoint(path.basename(filename, '.dmg'), cb);
                    });
                });
            });

            function findMountPoint(dmg_name, callback) {
                exec('hdiutil info', function (err, stdout) {
                    if (err) return callback(err);
                    var results = stdout.split("\n");
                    var dmgExp = new RegExp(dmg_name + '$');
                    for (var i = 0, l = results.length; i < l; i++) {
                        if (results[i].match(dmgExp)) {
                            var mountPoint = results[i].split("\t").pop();
                            var fileToRun = path.join(mountPoint, dmg_name + ".app");
                            return callback(null, fileToRun);
                        }
                    }
                    callback(Error("Mount point not found"));
                })
            }
        }
    },

    win: function (filename, cb, manifest, temporaryDirectory) {
        var destinationDirectory = getZipDestinationDirectory(filename, temporaryDirectory),
            unzip = function () {
                exec('"' + path.resolve(__dirname, 'tools/unzip.exe') + '" -u -o "' +
                    filename + '" -d "' + destinationDirectory + '" > NUL', function (err) {
                    if (err) {
                        return cb(err);
                    }
                    var filesFolders = filename.split(path.extname(filename))[0];
                    if (path.extname(filename) == ".gz") {
                        filesFolders = filename.split(".tar.gz")[0];
                    }
                    cb(null, path.join(destinationDirectory, getExecPathRelativeToPackage(manifest)), manifest.versionDownloadFull, filesFolders);
                });
            };

        fs.stat(destinationDirectory, function (err, exists) {
            if (err == null) {
                del(destinationDirectory, {force: true}, function (err) {
                    if (err) {
                        cb(err);
                    } else {
                        unzip();
                    }
                });
            } else {
                unzip();
            }
        });
    },

    linux32: function (filename, cb, manifest, temporaryDirectory) {
        fs.stat("./imageSpider.json", function (error, exist) {
            var isAmazon = '';
            if (error == null) {
                //isAmazon = 'sudo ';
            }

            exec(isAmazon + 'tar -zxvf "' + filename + '" >/dev/null', {cwd: temporaryDirectory}, function (err) {
                if (err) {
                    console.log(err);
                    return cb(err);
                }
                var filesFolders = filename.split(path.extname(filename))[0];
                if (path.extname(filename) == ".gz") {
                    filesFolders = filename.split(".tar.gz")[0];
                }
                if (manifest.versionDownloadFull) {
                    exec("chown root:root " + temporaryDirectory + "/nwBizibox/nwBizibox", {}, function (err) {
                        exec("chmod 777  " + temporaryDirectory + "/nwBizibox/nwBizibox", {}, function (err) {
                            cb(null, path.join(temporaryDirectory, getExecPathRelativeToPackage(manifest)), manifest.versionDownloadFull, filesFolders);
                        })
                    });
                } else {
                    cb(null, path.join(temporaryDirectory, getExecPathRelativeToPackage(manifest)), manifest.versionDownloadFull, filesFolders);
                }
            })
        });
    }
};
pUnpack.linux64 = pUnpack.linux32;
updater.prototype.runInstaller = function (appPath, args, options) {
    return pRun[platform].apply(this, arguments);
};

var pRun = {
    mac: function (appPath, args, options) {
        if (args && args.length) {
            args = [appPath].concat('--args', args);
        } else {
            args = [appPath];
        }
        return run('open', args, options);
    },
    win: function (appPath, args, options, cb) {
        return run(appPath, args, options, cb);
    },
    linux32: function (appPath, args, options, cb) {
        var appExec = path.join(appPath, path.basename(this.getAppExec()));
        fs.chmodSync(appExec, 0777);
        if (!options) options = {};
        options.cwd = appPath;
        return run(appPath + "/" + path.basename(this.getAppExec()), args, options, cb);
    }
};

pRun.linux64 = pRun.linux32;

function run(path, args, options) {
    var opts = {
        detached: true
    };
    for (var key in options) {
        opts[key] = options[key];
    }
    if (platform.indexOf('linux') === 0 && args == null) {
        args = [];
    }
    var sp = spawn(path, args, opts);
    sp.stdout.on('data', (data) => {
        console.log(data.toString());
    });
    sp.stderr.on('data', (data) => {
        console.log(data.toString());
    });
    sp.on('exit', (code) => {
        console.log(`Child exited with code ${code}`);
    });
    sp.unref();
    return sp;
}

updater.prototype.install = function (copyPath, cb) {
    pInstall[platform].apply(this, arguments);
};

var pInstall = {
    mac: function (to, cb) {
        ncp(this.getAppPath(), to, cb);
    },
    win: function (to, cb) {
        var self = this;
        var errCounter = 10;
        deleteApp(appDeleted);

        function appDeleted(err) {
            ncp(self.getAppPath(), to, appCopied);
            // if (err.errno !== -4082) {
            // 	return cb(err);
            // }
            // else {
            // 	errCounter--;
            // 	if (errCounter > 0) {
            // 		setTimeout(function () {
            // 			deleteApp(appDeleted);
            // 		}, 100);
            // 	} else {
            // 		ncp(self.getAppPath(), to, appCopied);
            // 	}
            // }
        }

        function deleteApp(cb) {
            var configJson = to + '/spider_config.json';
            var imageSpider = to + '/imageSpider.json';

            del([to + '/**', '!' + configJson, '!' + imageSpider], {force: true}, cb);
        }

        function appCopied(err) {
            if (err) {
                console.error(err);
                cb(err);
            }
            cb();
        }
    },
    linux32: function (to, cb) {
        ncp(this.getAppPath(), to, cb);
    }
};

pInstall.linux64 = pInstall.linux32;

updater.prototype.installOnlyFiles = function (filesFolders, cb) {
    ncp(filesFolders, this.getAppPath(), cb);
};

updater.prototype.runMonitorAll = function (callBackFun) {
    if (platform == "win") {
        console.log("win");
        fs.stat("MonitorBizibox.exe", function (error, exist) {
            console.log("MonitorBizibox");
            if (error == null) {
                del(["MonitorBizibox.exe", 'libstdc++-6.dll', 'libgcc_s_dw2-1.dll'], {force: true}, function (err) {
                    nextStep();
                });
            } else {
                nextStep();
            }
        });

        function nextStep() {
            console.log("nextStep");
            fs.stat(path.dirname(process.cwd()) + "bizibox\\Agent\\BiziBox.Monitor", function (error) {
                if (error) {
                    var pathToCreate = path.dirname(process.cwd()) + "bizibox\\Agent\\BiziBox.Monitor";
                    pathToCreate
                        .split(path.sep)
                        .reduce(function (currentPath, folder) {
                            currentPath += folder + path.sep;
                            if (!fs.existsSync(currentPath)) {
                                fs.mkdirSync(currentPath);
                            }
                            return currentPath;
                        }, '');
                    console.log("pathToCreate");
                    callbackMonitor();
                } else {
                    console.log("nextSteppathToCreate");
                    callbackMonitor();
                }
            });
        }

        function callbackMonitor() {
            console.log("callbackMonitor");
            fs.stat(path.dirname(process.execPath) + "\\biziboxMonitor", function (error, exist) {
                if (error == null) {
                    console.log("ncp");

                    ncp(path.dirname(process.execPath) + "\\biziboxMonitor", path.dirname(process.cwd()) + "bizibox\\Agent\\BiziBox.Monitor", function (err) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log('done!');
                        }
                        console.log("del");

                        del(['biziboxMonitor'], {force: true}, function (err) {
                            console.log("Findel");
                            checkLink();
                        });
                    });
                } else {
                    console.log("not-ncp");
                    checkLink();
                }
            });
        }

        function checkLink() {
            console.log("checkLink");
            fs.stat(path.dirname(process.cwd()) + "bizibox\\Agent\\BiziBox.Monitor\\biziboxMonitor.exe", function (error, exist) {
                if (error == null) {
                    console.log("lnk");

                    var lnkmonitorExporter = process.env["APPDATA"] + "\\Microsoft\\Windows\\Start Menu\\Programs\\Startup";
                    fs.stat(lnkmonitorExporter, function (error, exist) {
                        if (error == null) {
                            fs.readdir(lnkmonitorExporter, function (err, data) {
                                if (err) {
                                    console.log("err read files");
                                } else {
                                    var dataLen = data.length;
                                    if (dataLen) {
                                        data.forEach(function (name, index) {
                                            if (name.toLowerCase().indexOf("bizibox") !== -1 && name.indexOf("biziboxMonitor") === -1) {
                                                var pathFile = lnkmonitorExporter + name;
                                                del([pathFile], {force: true});
                                            }
                                        });
                                    }
                                }
                                biziboxMonitorLnk();
                            });
                        } else {
                            biziboxMonitorLnk();
                        }
                    });


                    // var lnkmonitorExporter = process.env["APPDATA"] + "\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\monitorExporter.lnk";
                    // fs.stat(lnkmonitorExporter, function (error, exist) {
                    // 	if (error == null) {
                    // 		del([lnkmonitorExporter], {force: true}, function (err) {
                    // 			lnkMonitorBiziboxFun()
                    // 		});
                    // 	}
                    // 	else {
                    // 		lnkMonitorBiziboxFun();
                    // 	}
                    // })
                    //
                    // function lnkMonitorBiziboxFun() {
                    // 	var lnkMonitorBizibox = process.env["APPDATA"] + "\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\MonitorBizibox.lnk";
                    // 	fs.stat(lnkMonitorBizibox, function (error, exist) {
                    // 		if (error == null) {
                    // 			del([lnkMonitorBizibox], {force: true}, function (err) {
                    // 				biziboxMonitorLnk();
                    // 			});
                    // 		}
                    // 		else{
                    // 			biziboxMonitorLnk();
                    // 		}
                    // 	})
                    // }

                    function biziboxMonitorLnk() {
                        fs.stat(process.env["APPDATA"] + "\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\biziboxMonitor.lnk", function (error, exist) {
                            if (error == null) {
                                console.log("biziboxMonitor.lnk exist");

                                runMonitor();
                            } else {
                                console.log("biziboxMonitor.lnk not exist");

                                createLink();
                            }
                        })
                    }
                } else {
                    callBackFun();
                }
            });
        }

        function createLink() {
            console.log("createLink");
            wshortLink.create("%APPDATA%/Microsoft/Windows/Start Menu/Programs/Startup/biziboxMonitor.lnk", process.env["SystemDrive"] + "\\bizibox\\Agent\\BiziBox.Monitor\\biziboxMonitor.exe", function (err) {
                if (err) {
                    console.log("Shortcut not created!");
                    runMonitor();
                } else {
                    console.log("Shortcut created!");
                    runMonitor();
                }
            })
        }

        function runMonitor() {
            console.log("runMonitor");
            var pathEXEMonitor = process.env["SystemDrive"] + "\\bizibox\\Agent\\BiziBox.Monitor\\biziboxMonitor.exe";
            exec(pathEXEMonitor);
            callBackFun();
        }
    } else {
        fs.stat("NwBiziboxMonitor", function (error, exist) {
            if (error == null) {
                exec("chmod 777 NwBiziboxMonitor");
                exec("./NwBiziboxMonitor");
                exec("chmod +x nwBizibox.desktop");
                callBackFun();
            } else {
                callBackFun();
            }
        })
    }
};
updater.prototype.deletedFolders = function (cb) {
    var mainFolder = this.options.temporaryDirectory;
    if (!/^win/.test(platform)) {
        exec("sudo rm -r " + mainFolder, {}, function () {
            del([mainFolder], {force: true}, cb);
        });
        // exec("sudo rm -r /tmp", {}, function () {
        //     del(['/tmp'], {force: true});
        // });
    } else {
        del([mainFolder], {force: true}, cb);
    }
}
updater.prototype.run = function (execPath, args, options) {
    var arg = arguments;
    if (platform.indexOf('linux') === 0) {
        arg[0] = path.dirname(arg[0]);
        pRun[platform].apply(this, arg);
    } else {
        nw.Shell.openItem(execPath);
    }
};

module.exports = updater;

