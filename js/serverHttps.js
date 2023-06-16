var requestServer = require('request');
require('events').EventEmitter.prototype._maxListeners = 10;
require('events').EventEmitter.defaultMaxListeners = 10;
process.setMaxListeners(10);
var request_server = requestServer.defaults({maxRedirects: 10, forever: true, timeout: 30000});
// var j = request.jar();
//var requestJar = request.defaults({maxRedirects: 10, jar: true});
// const https = require('https');
// var url = require('url');

function serverHttps() {
};

serverHttps.prototype.senderRest = function (url, referer, cookie, data, cb) {
    var domains = "bankleumi";
    if (url.indexOf("aibank") !== -1) {
        domains = "aibank";
    } else if (url.indexOf("unionbank") !== -1) {
        domains = "unionbank";
    }
    var options = {
        uri: url,
        family: 4,
        timeout: 40000000,
        headers: {
            "Host": "hb2." + domains + ".co.il",
            "Origin": "https://hb2." + domains + ".co.il",
            "Connection": "keep-alive",
            "Cache-Control": "no-cache",
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
        }
    };
    if (cookie !== null) {
        options.headers.Cookie = cookie;
    }
    if (data == null) {
        options.headers.referer = referer;
    } else {
        options.method = "POST";
        options.body = "POST";
        options.form = data;
        options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        options.headers['Upgrade-Insecure-Requests'] = '1';
        options.headers.Referer = referer;
    }

    request_server(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            cb(null, body, response);
            error = null;
            body = null;
            response = null;
        } else {
            cb(error);
            error = null;
            body = null;
            response = null;
            options = null;
        }
    })
};

serverHttps.prototype.senderGetRest = function (url, cookie, cb) {
    var domains = "bankleumi";
    if (url.indexOf("aibank") !== -1) {
        domains = "aibank";
    } else if (url.indexOf("unionbank") !== -1) {
        domains = "unionbank";
    }
    var options = {
        'Upgrade-Insecure-Requests': '1',
        "Host": "hb2." + domains + ".co.il",
        "Origin": "https://hb2." + domains + ".co.il",
        "Connection": "keep-alive",
        "Cache-Control": "no-cache",
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
    };
    if (cookie !== null) {
        options.Cookie = cookie;
    }
    request_server({
        uri: url,
        method: "GET",
        family: 4,
        timeout: 40000000,
        headers: options
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            cb(null, body);
            error = null;
            body = null;
            url = null;
            response = null;
        } else {
            cb(error);
            error = null;
            body = null;
            response = null;
            cookie = null;
            url = null;
        }
    });
}

serverHttps.prototype.getCookiesAll = function (cookiesNew, cookies) {
    var cookiRes = "";
    cookiesNew.forEach(function (v) {
        cookiRes += v.split(";")[0] + ';';
    });

    var text = cookies.split(";").splice(0, cookies.split(";").length - 1);
    var cookieText = "";
    text.forEach(function (v, i) {
        var val = v.trim().split("=");
        cookiRes.split(";").forEach(function (value, index) {
            var val2 = value.trim().split("=");
            if (val[0] == val2[0]) {
                v = val[0] + "=" + val2[1] + ";";
                cookieText += v;
            }
        });
    });

    var isExist = 0, cookiesStore = "";
    text.forEach(function (v, i) {
        isExist = 0;
        var val1 = v.trim().split("=");
        cookieText.split(";").forEach(function (value, index) {
            var val2 = value.trim().split("=");
            if (val1[0] == val2[0]) {
                isExist = 1;
            }
            if (cookieText.split(";").length == index + 1) {
                if (isExist == 0) {
                    cookiesStore += v + ";";
                }
            }
        });
    });
    var cookiesAll = cookiesStore + "" + cookieText;
    return cookiesAll;
};

serverHttps.prototype.getCook = function (cookies, val) {
    var text = "", ind = 0;
    var cookSplit = cookies.split(";");
    cookSplit.forEach(function (v, i) {
        var name = v.split("=")[0].replace(/\s/g, "");
        if (!text.length) {
            if (name == "NisDateSort") {
                ind = 1;
                text += v.split("=")[0] + '=' + val + ";";
            } else {
                text += v.split("=")[0] + '=' + v.split("=")[1] + ";";
            }
        } else {
            var idx = 0;
            text.split(";").forEach(function (val, index) {
                var names = val.split("=")[0].replace(/\s/g, "");
                if (names == name) {
                    idx = 1;
                }
                if (index + 1 == text.split(";").length) {
                    if (idx == 0) {
                        if (name == "NisDateSort") {
                            ind = 1;
                            text += v.split("=")[0] + '=' + val + ";";
                        } else {
                            text += v.split("=")[0] + '=' + v.split("=")[1] + ";";
                        }
                    }
                }
            });
        }
        if (i + 1 == cookSplit.length) {
            if (ind == 0) {
                text += "NisDateSort=" + val + ";";
            }
        }
    });
    return text;
}

serverHttps.prototype.getCookAll = function (cookies, val) {
    var text = "", ind = 0;
    var cookSplit = cookies.split(";");
    cookSplit.forEach(function (v, i) {
        var name = v.split("=")[0].replace(/\s/g, "");
        if (!text.length) {
            text += v.split("=")[0] + '=' + v.split("=")[1] + ";";
        } else {
            var idx = 0;
            text.split(";").forEach(function (val, index) {
                var names = val.split("=")[0].replace(/\s/g, "");
                if (names == name) {
                    idx = 1;
                }
                if (index + 1 == text.split(";").length) {
                    if (idx == 0) {
                        text += v.split("=")[0] + '=' + v.split("=")[1] + ";";
                    }
                }
            });
        }
    });
    return text;
}

serverHttps.prototype.senderRestAll = function (options, cb) {
    options.family = 4;
    request_server(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // var cookie_string = j.getCookieString(options.uri);
            // var cookAll = response.request.headers.Cookie;
            //console.log(response);
            cb(null, body, response);
            error = null;
            body = null;
            response = null;
        } else {
            cb(error);
            error = null;
            body = null;
            response = null;
            options = null;
        }
    });
};

serverHttps.prototype.sendersServer = function (options, cb) {
    request_server(options, (error, response, data) => {
        cb(error, response, data);
    });

    // const data = options.form;
    // const option = {
    //     port: 443,
    //     method: options.method,
    //     host: url.parse(options.uri).host,
    //     path: url.parse(options.uri).pathname,
    //     family: 4,
    //     headers: options.headers
    // };
    // const req = https.request(option, res => {
    //     console.log(`statusCode: ${res.statusCode}`)
    //     console.log('headers:', res.headers);
    //     let body = '';
    //     res.on('data', function (chunk) {
    //         body = body + chunk;
    //     });
    //     res.on('end', function () {
    //         console.log("Body :" + body);
    //         if (res.statusCode !== 200) {
    //             cb("Api call failed with response code " + res.statusCode, res);
    //         } else {
    //             cb(null, res, body);
    //         }
    //     });
    // });
    // req.on('error', error => {
    //     cb(error)
    // });
    // if (data) {
    //     req.write(data)
    // }
    // req.end()
};

module.exports = serverHttps;

