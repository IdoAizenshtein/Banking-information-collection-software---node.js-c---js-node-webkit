var fs = require('fs');
var child_process = require('child_process');
var exec = child_process.exec;
var platform = process.platform;
platform = /^win/.test(platform) ? 'win' : /^darwin/.test(platform) ? 'mac' : 'linux' + (process.arch == 'ia32' ? '32' : '64');

function vpnHideIp() {
}
vpnHideIp.prototype.ConnectVpn = function (runSoft, cb) {
	var finish = false;
	if (platform == "win") {
		var programRoot = "Program Files";
		if (process.env.hasOwnProperty('ProgramFiles(x86)') === true) {
			programRoot = "Program Files (x86)";
		}
		fs.stat("C:\\" + programRoot + "\\HMA! Pro VPN\\bin\\HMA! Pro VPN.exe", function (error, exist) {
			if (error) {
				cb(finish);
			}
			else {
				exec('tasklist', function (err, stdout, stderr) {
					var isRun = 0;
					var lines = stdout.toString().split('\n');
					lines.forEach(function (line) {
						var parts = line.split('=');
						parts.forEach(function (items) {
							if (items.toString().indexOf("HMA! Pro VPN.exe") > -1) {
								isRun = 1;
							}
						})
					});
					var command = "-changeip";
					if (isRun === 0 || runSoft == true) {
						command = "-connect";
					}
					if (isRun === 0 || runSoft == true || runSoft == "change") {
						finish = true;
						child_process.exec('"C:\\' + programRoot + '\\HMA! Pro VPN\\bin\\HMA! Pro VPN.exe" ' + command, function (error, stdout, stderr) {
							if (error) {
								finish = false;
								console.log(error.stack);
								console.log('Error code: ' + error.code);
								console.log('Signal received: ' + error.signal);
							}
						});
					}
					cb(finish);
				});
			}
		})
	}
	else if (/^linux/.test(process.platform)) {
		fs.stat(process.cwd() + "/vpnconfig/hma-vpn.sh", (error, exist) => {
			if (error) {
				cb(finish);
			}
			else {
				if (runSoft == false) {
					this.checkIfRun()
					.then((response) => {
						if (response == 0) {
							this.cliUnix('bash "' + process.cwd() + '/vpnconfig/hma-vpn.sh" -c "' + process.cwd() + '/vpnconfig/vpnlogin" -d -p tcp ' + runSoft)
							.then((response) => {
								finish = true;
								console.log(response);
								setTimeout(function () {
									cb(finish);
								}, 6000);
							})
							.catch((reason) => {
								console.error(reason);
								cb(finish);
							});
						}
						else {
							cb(finish);
						}
					});
				}
				else {
					this.cliUnix('bash "' + process.cwd() + '/vpnconfig/hma-vpn.sh" -c "' + process.cwd() + '/vpnconfig/vpnlogin" -d -p tcp ' + runSoft)
					.then((response) => {
						finish = true;
						console.log(response);
						setTimeout(function () {
							cb(finish);
						}, 6000);
					})
					.catch((reason) => {
						console.error(reason);
						cb(finish);
					});
				}
			}
		});
	}
}

vpnHideIp.prototype.checkIfRun = function () {
	return new Promise((resolve, reject) => {
		if (platform == "win") {
			exec('tasklist', function (err, stdout, stderr) {
				var isRun = 0;
				var lines = stdout.toString().split('\n');
				lines.forEach(function (line) {
					var parts = line.split('=');
					parts.forEach(function (items) {
						if (items.toString().indexOf("HMA! Pro VPN.exe") > -1) {
							isRun = 1;
						}
					})
				});
				resolve(isRun);
			});
		}
		else if (/^linux/.test(process.platform)) {
			fs.stat(process.cwd() + "/vpnconfig/hma-vpn.sh", (error, exist) => {
				var isRun = 0;
				if (error) {
					resolve(2);
				}
				else {
					this.cliUnix('bash "' + process.cwd() + '/vpnconfig/hma-vpn.sh"  -s')
					.then((response) => {
						if (response == "Disconnected") {
							resolve(isRun);
						}
						else {
							isRun = 1;
							resolve(isRun);
						}
					})
					.catch((reason) => {
						resolve(2);
					});
				}
			})
		}
	});
}

vpnHideIp.prototype.cliUnix = function (cli) {
	return new Promise((resolve, reject) => {
		exec("sudo " + cli, (err, stdout, stderr) => {
			if (err instanceof Error) {
				reject(err);
			}
			else {
				resolve(stdout)
			}
		});
	});
}

vpnHideIp.prototype.killVpn = function (cb) {
	var finish = false;
	if (platform == "win") {
		var programRoot = "Program Files";
		if (process.env.hasOwnProperty('ProgramFiles(x86)') === true) {
			programRoot = "Program Files (x86)";
		}
		fs.stat("C:\\" + programRoot + "\\HMA! Pro VPN\\bin\\HMA! Pro VPN.exe", function (error, exist) {
			if (error) {
				cb(finish);
			}
			else {
				function kills(cb) {
					exec('TASKKILL /F /IM "HMA! Pro VPN.exe"');
					let promise = new Promise((resolve, reject) => {
						exec('tasklist', function (err, stdout, stderr) {
							var isRun = 0;
							var lines = stdout.toString().split('\n');
							lines.forEach(function (line) {
								var parts = line.split('=');
								parts.forEach(function (items) {
									if (items.toString().indexOf("HMA! Pro VPN.exe") > -1) {
										isRun = 1;
									}
								})
							});
							if (isRun == 0) {
								resolve(true);
							} else {
								reject(false);
							}
						});
					});
					promise.then(
						function (val) {
							finish = true;
							cb(finish);
						})
					.catch(
						(reason) => {
							kills(cb);
						});
				}

				kills(cb);
			}
		})
	}
	else if (/^linux/.test(process.platform)) {
		fs.stat(process.cwd() + "/vpnconfig/hma-vpn.sh", (error, exist) => {
			if (error) {
				cb(finish);
			}
			else {
				this.cliUnix('bash "' + process.cwd() + '/vpnconfig/hma-vpn.sh"  -x')
				.then((response) => {
					finish = true;
					console.log(response);
					cb(finish);
				})
				.catch((reason) => {
					console.error(reason);
					cb(finish);
				});
			}
		})
	}
}

module.exports = vpnHideIp;

// var child_process = require('child_process');
// var exec = child_process.exec;
// exec("sudo " + 'bash "' + process.cwd() + '/vpnconfig/hma-vpn.sh" -c "' + process.cwd() + '/vpnconfig/vpnlogin" -d -p tcp -m', (err, stdout, stderr) => {
// 	console.log(err, stdout, stderr)
// });


