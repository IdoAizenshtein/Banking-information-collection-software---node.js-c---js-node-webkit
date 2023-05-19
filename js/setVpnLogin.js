const fs = require('fs');const child_process = require('child_process');const os = require("os");const exec = child_process.exec;const request = require('request');module.exports.setVpnLogin = function (cb) {    if (/^linux/.test(process.platform)) {        request.get('http://169.254.169.254/latest/dynamic/instance-identity/document', {            timeout: 15000,            family: 4        }, (err, response, data) => {            if (!err) {                const dataJson = JSON.parse(data);                // console.log(data)                exec("aws ec2 describe-tags --region " + dataJson.region + " --filters Name=resource-id,Values=" + dataJson.instanceId + " Name=key,Values=Name --query Tags[].Value --output text", (err, stdout, stderr) => {                    if (err instanceof Error) {                        console.log(err);                        cb(false);                    } else {                        let vpn_type = true;                        const instanceName = stdout.split('-');                        if (instanceName && instanceName.length >= 3) {                            const username = instanceName[1].trim().replace(/\s+/g, "");                            const password = instanceName[2].trim().replace(/\s+/g, "");                            if (instanceName.length > 3) {                                vpn_type = instanceName[3].trim().replace(/\s+/g, "");                            }                            // console.log(username, password)                            let content = '';                            content += username + os.EOL;                            content += password;                            fs.writeFile(process.cwd() + "/vpnconfig/vpnlogin", content, function (err) {                                if (err) {                                    console.log('Error writing file');                                    cb(false);                                } else {                                    cb(vpn_type);                                }                            });                        } else {                            console.log('Error instance name');                            cb(false);                        }                    }                });            } else {                cb(false);            }        });    }}module.exports.reboot = function (cb) {    if (/^linux/.test(process.platform)) {        exec("sudo reboot", (err, stdout, stderr) => {            if (err instanceof Error) {                console.log(err);                cb(false);            } else {                cb(true);            }        });    }}