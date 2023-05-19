var request = require('request');
require('events').EventEmitter.prototype._maxListeners = 10;
require('events').EventEmitter.defaultMaxListeners = 10;
process.setMaxListeners(10);
// process.env.UV_THREADPOOL_SIZE = 128;
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
var request = request.defaults({maxRedirects: 10, forever: true, timeout: 30000});
var iconv = require('iconv-lite');
var platform = process.platform;
platform = /^win/.test(platform) ? 'win' : /^darwin/.test(platform) ? 'mac' : 'linux' + (process.arch == 'ia32' ? '32' : '64');

module.exports = function (input, callback) {
    const started = Date.now();
    const numberOfOperations = input.numberOfOperations;
    const listOfArguments = input.urls;
    const asyncOperation = url => {
        return new Promise(resolve => {
            let checkGr = [];

            function req() {
                let obj = {};
                if (input.body) {
                    obj.body = input.body
                }
                if (input.isChecks) {
                    obj.encoding = null
                }
                let uri = url;
                if (input.isChecks) {
                    uri = url.urlCheck[checkGr.length];
                } else if (input.isCheck) {
                    uri = url.imgs;
                }
                if (input.encode) {
                    obj.encoding = null
                }
                if (input.sendToBizibox && !input.sendToAnotherServers) {
                    uri = input.sendToBizibox;
                    obj.formData = url.formData;
                    // const formData = {
                    // 	"name": url.formData.name,
                    // 	"filename": "blob",
                    // };
                    // formData[url.formData.name] = url.formData.file;
                    // obj.formData = formData;
                    // const boundary = "xxxxxxxxxx";
                    // let data = "";
                    // data += "--" + boundary + "\r\n";
                    // data += "Content-Disposition: form-data; filename=\"blob\"; name=\"" + url.formData.name + "\"\r\n";
                    // data += "Content-Type:text/plain\r\n\r\n";
                    // obj.body = Buffer.concat([
                    // 	Buffer.from(data, "utf8"),
                    // 	new Buffer(url.formData.file, 'binary'),
                    // 	Buffer.from("\r\n--" + boundary + "--\r\n", "utf8"),
                    // ]);
                    // obj.headers = Object.assign(obj.headers, {"Content-Type": "multipart/form-data; boundary=" + boundary})
                }
                if (input.sendToBizibox && input.sendToAnotherServers && input.method === 'POST') {
                    uri = input.sendToBizibox;
                    try {
                        obj.body = JSON.stringify({
                            imagenamekey: url.imgs[0].ImageNameKey,
                            bankId: input.data.BankNumber,
                            snifId: input.data.BranchNumber,
                            accountId: input.data.AccountNumber
                        })
                    } catch (e) {
                        // console.log(e, url)
                        // debugger
                        obj.body = JSON.stringify({
                            imagenamekey: url.ImageNameKey,
                            bankId: input.data.BankNumber,
                            snifId: input.data.BranchNumber,
                            accountId: input.data.AccountNumber
                        })
                    }
                    input.headers['Content-Type'] = "application/json;charset=UTF-8";
                }
                if (input.sendToBizibox && input.sendToAnotherServers && input.method === 'PUT') {
                    uri = url.body;
                    obj.body = url.fileBuffer;
                    // const bufferValue = Buffer.from(url.base64, "base64");
                    // let arraybuffer = Uint8Array.from(bufferValue);
                    // obj.body = arraybuffer;
                    // obj.multipart = [
                    //     {
                    //         body: arraybuffer,
                    //         options: {
                    //             filename: url.ImageNameKey,
                    //             contentType: 'image/jpeg'
                    //         }
                    //     }
                    // ];
                    // obj.formData = {
                    //     [url.ImageNameKey]: url.base64,
                    //     filename: "blob",
                    //     name: url.ImageNameKey
                    // }
                    // input.method = 'POST';
                    // obj.body = null;

                    // const bufferValue = Buffer.from(url.formData, "base64");
                    // let arraybuffer = Uint8Array.from(bufferValue);
                }
                // if (!input.sendToBizibox) {
                // 	obj.proxy = "http://lum-customer-ifact-zone-residential-route_err-pass_dyn-country-il:h0mi0yvib3to@zproxy.lum-superproxy.io:22225";
                // }

                const params = (Object.assign(
                        {
                            // agent: false,
                            // pool: {maxSockets: 100},
                            forever: true,
                            uri: uri,
                            method: input.method,
                            family: 4,
                            timeout: 30000,
                            headers: (input.sendToBizibox) ? Object.assign({
                                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
                                "Cookie": input.cookies,
                                "Connection": "keep-alive",
                                "Cache-Control": "no-cache",
                            }, (input.headers ? input.headers : {})) : Object.assign({
                                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
                                "Host": "biz2.bankhapoalim.co.il",
                                "Cookie": input.cookies,
                                "Connection": "keep-alive",
                                "Cache-Control": "no-cache",
                                "X-XSRF-TOKEN": input.token,
                            }, (input.headers ? input.headers : {}))
                        },
                        obj)
                );
                if (input['isChecks']) {
                    delete params.headers["X-XSRF-TOKEN"];
                    delete params.headers["Host"];
                    delete params.headers["Connection"];
                    // params.headers["accept"] = 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8';
                    // params.headers["accept-encoding"] = 'gzip, deflate, br';
                    // params.headers["accept-language"] = 'en-US,en;q=0.9';
                }
                // if(!input.sendToBizibox && platform !== "win"){
                //     params['proxy'] = input.proxy;
                // }

                request(params, function (error, response, body) {
                    // console.log('error---', error)
                    // if(response){
                    // 	console.log('statusCode--', response['statusCode'])
                    // 	console.log('headers--', response['headers'])
                    // }
                    // console.log('body--', body)
                    if (input.isChecks) {
                        if (!checkGr.length) {
                            if (!error) {
                                if (response.headers["content-type"] !== "image/jpeg; charset=UTF-8") {
                                    const r = Buffer.from(body).toString()
                                    console.log(r)
                                } else {
                                    checkGr.push("data:" + "image/jpeg; charset=UTF-8" + ";base64," + new Buffer(body).toString('base64'));
                                }
                            } else {
                                // checkGr.push("");
                            }
                            if (response && response.statusCode && (response.statusCode === 204 || response.statusCode === 418)) {
                                resolve({
                                    response: Object.assign(url, {
                                        "urlCheck": null,
                                    }),
                                    statusCode: response && response.statusCode ? response.statusCode : null,
                                    headers: response && response.headers ? response.headers : null,
                                    error: false,
                                });
                            } else {
                                setTimeout(() => {
                                    req()
                                }, 500)
                            }
                        } else {
                            if (!error) {
                                if (response.headers["content-type"] === "image/jpeg; charset=UTF-8") {
                                    checkGr.push("data:" + "image/jpeg; charset=UTF-8" + ";base64," + new Buffer(body).toString('base64'));
                                    resolve({
                                        response: Object.assign(url, {
                                            "urlCheck": checkGr[0] === '' ? checkGr[1] : checkGr,
                                        }),
                                        statusCode: response && response.statusCode ? response.statusCode : null,
                                        headers: response && response.headers ? response.headers : null,
                                        error: false,
                                    });
                                } else {
                                    const r = Buffer.from(body).toString()
                                    console.log(r)
                                    if (response && response.statusCode && (response.statusCode === 204 || response.statusCode === 418)) {
                                        resolve({
                                            response: Object.assign(url, {
                                                "urlCheck": checkGr[0] !== '' ? checkGr[0] : null,
                                            }),
                                            statusCode: response && response.statusCode ? response.statusCode : null,
                                            headers: response && response.headers ? response.headers : null,
                                            error: false,
                                        });
                                    } else {
                                        setTimeout(() => {
                                            req()
                                        }, 500)
                                    }
                                }
                            } else {
                                if (response && response.statusCode && (response.statusCode === 204 || response.statusCode === 418)) {
                                    resolve({
                                        response: Object.assign(url, {
                                            "urlCheck": null,
                                        }),
                                        statusCode: response && response.statusCode ? response.statusCode : null,
                                        headers: response && response.headers ? response.headers : null,
                                        error: false,
                                    });
                                } else {
                                    setTimeout(() => {
                                        req()
                                    }, 0)
                                }
                                // resolve({
                                //     response: Object.assign(url, {
                                //         "urlCheck": checkGr[0] === '' ? null : checkGr,
                                //     }),
                                //     statusCode: response && response.statusCode ? response.statusCode : null,
                                //     headers: response && response.headers ? response.headers : null,
                                //     error: false,
                                // });
                            }
                        }
                    } else if (input.isCheck) {
                        if (!error) {
                            try {
                                const list = JSON.parse(body).list;
                                let arrList;
                                if (list) {
                                    arrList = [];
                                    list.forEach((v) => {
                                        const urlCheck = v.imageFrontLink && v.imageFrontLink.length > 0 && v.imageFrontLink.indexOf('000000000000000000000.png') === -1 ? ([v.imageFrontLink, v.imageBackLink].filter(lnk => lnk && !lnk.includes('000000000000000000000.png')).map(lnk => 'https://biz2.bankhapoalim.co.il' + lnk)) : undefined;
                                        const uuid = parseInt(v.bank) + '' + parseInt(v.branch) + '' + parseInt(v.account) + '' + parseInt(v.number) + '' + parseInt(url.originalEventCreateDate) + '_' + url.bankParams;
                                        const objVal = {
                                            "Asmachta": url.Asmachta,
                                            "CheckAccountNumber": v.account,
                                            "DepositeDate": url.originalEventCreateDate,
                                            "CheckBankNumber": v.bank,
                                            "CheckBranchNumber": v.branch,
                                            "CheckNumber": v.number,
                                            "CheckTotal": v.amount,
                                            "ImageNameKey": urlCheck ? uuid : "x",
                                            "accIdx": url.accIdx,
                                            "idx": url.idx,
                                            "urlCheck": urlCheck,
                                        }
                                        arrList.push(objVal);
                                    });
                                } else {
                                    arrList = url
                                    // url.imgs = [{
                                    // 	"ImageNameKey": "x"
                                    // }];
                                }
                                resolve({
                                    response: arrList,
                                    statusCode: response.statusCode,
                                    headers: response.headers,
                                    error: false,
                                });
                            } catch (e) {
                                resolve({
                                    response: url,
                                    statusCode: response.statusCode,
                                    headers: response.headers,
                                    error: false,
                                });
                            }
                        } else {
                            // url.imgs = [{
                            // 	"ImageNameKey": "x"
                            // }];
                            // console.log('error-----error-----error----', error);
                            resolve({
                                response: url,
                                statusCode: response && response.statusCode ? response.statusCode : null,
                                headers: response && response.headers ? response.headers : null,
                                error: true
                                // error: (error.code === 'ETIMEDOUT' || error.code === 'ECONNRESET' || error.code === 'ESOCKETTIMEDOUT'),
                            });
                        }
                    } else {
                        if (!error) {
                            if (input.encode) {
                                body = iconv.decode(new Buffer(body), 'iso-8859-8');
                            }
                            resolve({
                                uri: params.uri,
                                response: (!input.sendToBizibox || input.sendToAnotherServers) && !(input.sendToBizibox && input.sendToAnotherServers && input.method === 'POST') && !(input.sendToBizibox && input.sendToAnotherServers && input.method === 'PUT') ? body : Object.assign(url, {body}),
                                statusCode: response.statusCode,
                                headers: response.headers,
                                error: false,
                            });
                        } else {
                            console.log('error-----error-----error----', error, response && response.headers ? response.headers : null, response && response.statusCode ? response.statusCode : null, params.uri);
                            resolve({
                                uri: params.uri,
                                response: (!input.sendToBizibox || input.sendToAnotherServers) ? null : Object.assign(url, {body: null}),
                                statusCode: response && response.statusCode ? response.statusCode : null,
                                headers: response && response.headers ? response.headers : null,
                                error: true
                                // error: (error.code === 'ETIMEDOUT' || error.code === 'ECONNRESET' || error.code === 'ESOCKETTIMEDOUT'),
                            });
                        }
                    }

                });
            }

            req()
        })
    };

    function timeoutDe() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true)
            }, 500)
        })
    }

    async function parallel() {
        const argsCopy = [].concat(listOfArguments.map((val, ind) => ({val, ind})));
        const result = new Array(listOfArguments.length);
        const promises = new Array(numberOfOperations).fill(Promise.resolve());
        // if (input.isChecks) {
        //     await timeoutDe();
        //     await timeoutDe();
        //
        //     for (let idx = 0; idx < argsCopy.length; idx++) {
        //         // await timeoutDe();
        //         const arg = argsCopy[idx];
        //         result[arg.ind] = await asyncOperation(arg.val);
        //         console.log(result[arg.ind])
        //         // await timeoutDe();
        //     }
        // } else {
        function chainNext(p) {
            if (argsCopy.length) {
                const arg = argsCopy.shift();
                return p.then(() => {
                    if (input.isChecks || input.isCheck || input.sendToBizibox) {
                        console.log(arg.val)
                    }
                    const operationPromise = asyncOperation(arg.val).then(r => {
                        result[arg.ind] = r;
                    });
                    return chainNext(operationPromise);
                });
            }
            return p;
        }

        await Promise.all(promises.map(chainNext));
        // }

        return result;
    }

    parallel().then((response) => {
        const elapsed = Date.now() - started;
        // console.log('Promises Finished!!!');
        response.forEach((item) => {
            if (item.response) {
                let responseFormat;
                try {
                    responseFormat = JSON.parse(item.response)
                } catch (e) {
                    responseFormat = item.response
                }
                item['response'] = responseFormat
            }
        });
        callback({
            response: response,
            elapsed: elapsed / 1000,
        });
    });
}
