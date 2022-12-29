all.banks.core.services = function () {
    var services = {};
    services.numberLoopError = 0;
    services.runByDays = false;
//	var _dfltXHR = $.ajaxSettings.xhr;
//	$.ajaxSettings.xhr = function () {
//		services.xhr = _dfltXHR();
//		return services.xhr;
//	};


    services.uuidv4 = function () {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    };

    services.parseJwt = function (token) {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };
    services.getCookies_bizibox = function () {
        return localStorage.getItem('cookies_bizibox');
    }
    services.getTokenAWS = function () {
        return localStorage.getItem('tokenAWS_' + all.banks.spiderConfig.sendToServerAWS);
    }
    services.getDiffMinutes = function (dt2, dt1) {
        let diff = (dt2.getTime() - dt1.getTime()) / 1000 / 60;
        return Math.abs(Math.round(diff));
    }
    services.getTokenExpirationDate = function (token) {
        try {
            const decoded = services.parseJwt(token);
            if (decoded.exp === undefined) {
                return null;
            }
            const date = new Date(0);
            date.setUTCSeconds(decoded.exp);
            return date;
        } catch (e) {
            return null;
        }
    }
    services.isCookiesExpired = function () {
        const token = services.getCookies_bizibox();
        if (!token) {
            return true;
        } else {
            const cookies = JSON.parse(token);
            const isAllUpdates = cookies.every((it) => {
                const currentDate = new Date();
                win.cookies.set({
                    path: "/",
                    url: 'https://secure.bizibox.biz',
                    name: it.name,
                    domain: 'secure.bizibox.biz',
                    value: it.val,
                    secure: (it.name === 'AWSALBCORS'),
                    sameSite: (it.name === 'AWSALBCORS') ? 'no_restriction' : 'unspecified'
                })
                const date = new Date(it.expired);
                if (date.valueOf() > currentDate.valueOf()) {
                    if (services.getDiffMinutes(date, currentDate) < 15) {
                        return false;
                    }
                    return true;
                }
            })
            if (isAllUpdates) {
                return false;
            } else {
                return true;
            }
        }
    }
    services.login = function () {
        const dfd = jQuery.Deferred();
        const isCookiesExpired = services.isCookiesExpired();
        if (isCookiesExpired === true) {
            var options = {
                uri: all.banks.spiderConfig.sendToServer + '/ang/login',
                family: 4,
                timeout: 40000000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
                }
            };
            options.method = "POST";
            options.body = "POST";
            options.form = {
                inuser_username: all.banks.config.user,
                inuser_password: all.banks.config.pass,
                inbrowser: 'Chrome 107',
                inos: 'MacOS'
            };
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            request(options, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    const cookie = response.headers["set-cookie"];
                    const cook = [];
                    try {
                        if (cookie.length) {
                            for (let i = 0; i < cookie.length; i++) {
                                var v = cookie[i];
                                var name = v.split(";")[0].split("=")[0].replace(/\s/g, "");
                                if (name !== 'JSESSIONID') {
                                    var val = v.split(";")[0].split("=")[1].replace(/\s/g, "");
                                    var expired = v.split(";")[1].split("Expires=")[1];
                                    cook.push({
                                        name: name,
                                        val: val,
                                        expired: new Date(expired)
                                    })
                                    win.cookies.set({
                                        path: "/",
                                        url: 'https://secure.bizibox.biz',
                                        name: name,
                                        domain: 'secure.bizibox.biz',
                                        value: val,
                                        secure: (name === 'AWSALBCORS'),
                                        sameSite: (name === 'AWSALBCORS') ? 'no_restriction' : 'unspecified'
                                    })
                                }
                                // win.cookies.getAll({}, function (cookies) {
                                //         let cook = '';
                                //         cookies.forEach(it=>{
                                //             if(it.domain.includes('bizibox')){
                                //                 cook += it.name + '=' +  it.value + ';';
                                //             }
                                //         })
                                //     console.log(cook)
                                // })
                            }
                        }
                    } catch (e) {
                        console.log(e)
                    }
                    localStorage.setItem('cookies_bizibox', JSON.stringify(cook))
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            })
        } else {
            dfd.resolve(true);
        }
        return dfd.promise();
    }
    services.loginAWS = function () {
        const dfd = jQuery.Deferred();
        const isTokenExpired = services.isTokenExpiredAWS();
        if (isTokenExpired === true) {
            $.ajax({
                // url: 'https://i-dev-etl.bizibox.biz/rest/api/v1/auth/token',
                url: 'https://' + all.banks.spiderConfig.sendToServerAWS + '/rest/api/v1/auth/token',
                data: JSON.stringify({
                    email: all.banks.config.user,
                    password: all.banks.config.pass,
                }),
                // url: 'https://bsecure.bizibox.biz/rest/api/v1/auth/token',
                // data: JSON.stringify({
                //     username: all.banks.config.user,
                //     password: all.banks.config.pass,
                //     rememberMe: true
                // }),
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                type: 'POST',
                timeout: 120000
            })
                .done(function (response, state, status) {
                    if (response.token) {
                        localStorage.setItem('tokenAWS_' + all.banks.spiderConfig.sendToServerAWS, response.token)
                        dfd.resolve(response.token);
                    } else {
                        dfd.resolve(false);
                    }
                })
                .fail(function (error, resErr, xhr) {
                    dfd.resolve(false);
                })
        } else if (isTokenExpired === 'refreshToken') {
            const token = this.getTokenAWS();
            $.ajax({
                // url: 'https://i-dev-etl.bizibox.biz/rest/api/v1/auth/refresh',
                url: 'https://' + all.banks.spiderConfig.sendToServerAWS + '/rest/api/v1/auth/refresh',
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    'Authorization': token
                },
                method: 'GET',
                type: 'GET',
                timeout: 120000
            })
                .done(function (response, state, status) {
                    if (response.token) {
                        localStorage.setItem('tokenAWS_' + all.banks.spiderConfig.sendToServerAWS, response.token)
                        dfd.resolve(response.token);
                    } else {
                        dfd.resolve(false);
                    }
                })
                .fail(function (error, resErr, xhr) {
                    dfd.resolve(false);
                })
        } else {
            const token = this.getTokenAWS();
            dfd.resolve(token);
        }
        return dfd.promise();
    }

    services.isTokenExpiredAWS = function () {
        const token = services.getTokenAWS();
        if (!token) {
            return true;
        }
        const date = services.getTokenExpirationDate(token);
        if (date === undefined) {
            return false;
        }
        const decoded = services.parseJwt(token);
        if (decoded && decoded.type !== 'AUTH') {
            return true;
        }
        const currentDate = new Date();
        if (date.valueOf() > currentDate.valueOf()) {
            if (services.getDiffMinutes(date, currentDate) < 15) {
                return 'refreshToken';
            }
            return false;
        } else {
            return true;
        }
    }

    services.make_base_auth = function (user, password) {
        var tok = user + ':' + password;
        var hash = btoa(tok);
        return "Basic " + hash;
    };
    services.httpReq = function (url, method, data, contentType, linksInside, media, headers, timeout, isUploadToAWS) {
        var dfd = jQuery.Deferred();
        if (url !== undefined && typeof url === "string") {
            monitorActivityClass.setIntervalActivity();
            var params = {
                url: url,
                xhrFields: {
                    withCredentials: true
                },
                method: method,
                type: method,
                timeout: timeout || 120000
            };

            if (url.indexOf('login.bankhapoalim.co.il') !== -1) {
                params.beforeSend = function (xhr) {
                    if (all.banks.accounts.hapoalim.xsrfToken) {
                        xhr.setRequestHeader('X-XSRF-TOKEN', all.banks.accounts.hapoalim.xsrfToken);
                    }
                };
            }
            if (url.indexOf('biz2.bankhapoalim.co.il') !== -1) {
                params.beforeSend = function (xhr) {
                    if (all.banks.accounts.poalimAsakim.xsrfToken) {
                        xhr.setRequestHeader('X-XSRF-TOKEN', all.banks.accounts.poalimAsakim.xsrfToken);
                    }
                };
            }
            if (url.indexOf('hb2.bankleumi.co.il') !== -1 || url.indexOf('start.telebank.co.il') !== -1) {
                params.beforeSend = function (xhr) {
                    xhr.setRequestHeader('Upgrade-Insecure-Requests', '1');
                };
            }
            if (url.includes('mto.mizrahi-tefahot.co.il')) {
                params.beforeSend = function (xhr) {
                    xhr.setRequestHeader('Upgrade-Insecure-Requests', '1')
                    if (all.banks.accounts.mizrahiTefahot.xsrfToken) {
                        xhr.setRequestHeader('mizrahixsrftoken', all.banks.accounts.mizrahiTefahot.xsrfToken);
                    }
                };
            }
            if (url.includes('unionbank.co.il/InternalSite/Validate')) {
                params.beforeSend = function (xhr) {
                    xhr.overrideMimeType('text/html; charset=windows-1255');
                };
            }

            if (linksInside == true) {
                // const token = this.getToken();
                params.headers = {
                    // 'Authorization': token,
                    'HTML_LOGIN': true
                };
                // params.beforeSend = function (xhr) {
                //     xhr.setRequestHeader('Authorization', token);
                // };
                // params.username = all.banks.config.user;
                // params.password = all.banks.config.pass;
                myEmitterLogs(32, url);
            }

            if ((url.includes('bizibox') || url.includes('dataload.bizibox.biz') || url.includes('adm.bizibox.biz')) && (!headers || (headers && !headers.Authorization))) {
                if (params.headers === undefined) {
                    params.headers = {
                        'Authorization': 'Basic' + btoa(all.banks.config.user + ':' + all.banks.config.pass)
                    };
                } else {
                    params.headers['Authorization'] = 'Basic' + btoa(all.banks.config.user + ':' + all.banks.config.pass);
                }
                params.beforeSend = function (xhr) {
                    xhr.setRequestHeader('Authorization', all.banks.core.services.make_base_auth(all.banks.config.user, all.banks.config.pass));
                };
            }

            if (url.indexOf('eloan.co.il') !== -1) {
                if (params.headers === undefined) {
                    params.headers = {
                        'rbz-bizibox': new Date().getTime()
                    };
                } else {
                    params.headers['rbz-bizibox'] = new Date().getTime();
                }
            }
            if (url.includes('api.pagerduty.com')) {

            }
            if (contentType == true) {
                params.contentType = "application/x-www-form-urlencoded; charset=UTF-8";
                params['data'] = data;
            } else {
                if ((method === 'PUT' && !isUploadToAWS) || (method == 'POST' && media == undefined)) {
                    params['data'] = JSON.stringify(data);
                    if (params.headers == undefined) {
                        params.headers = {
                            'Accept': '*/*',
                            'Content-Type': 'application/json'
                        };
                    } else {
                        params.headers.Accept = '*/*';
                        params.headers['Content-Type'] = 'application/json';
                    }
                }
                if (method == 'POST' && media !== undefined) {
                    params['data'] = data;
                    params.processData = false;
                    params.contentType = false;
                }
                if (method === 'PUT' && media !== undefined && isUploadToAWS) {
                    params['data'] = data;
                    params.processData = false;
                    params.contentType = false;
                    params.cache = false;
                }
            }

            if (headers) {
                params.headers = params.headers ? Object.assign({}, headers, params.headers) : headers;
            }

            if (url.indexOf('telebank.co.il/Lobby/') !== -1 || url.indexOf('telebank.co.il/Titan/') !== -1) {
                const discountGlobalHeaders = (all.banks.accounts.discuont || all.banks.accounts.discountAsakimPlusNew).globalHeaders;
                params.headers = !!params.headers ? Object.assign({},
                        discountGlobalHeaders,
                        params.headers)
                    : discountGlobalHeaders;
            }

            var xhr = new XMLHttpRequest();
            params.xhr = function () {
                return xhr;
            };

            if (url.indexOf('biz.bankhapoalim.co.il') !== -1) {
                setTimeout(function () {
                    $.ajax(params)
                        .done(function (response, state, status) {
                            dfd.resolve(response, state, status,
                                xhr.responseURL);//services.xhr.responseURL);
                        })
                        .fail(function (error, resErr) {
                            if (error.status == 406) {
                                console.log('406')
                            }
                            dfd.reject(error, resErr, params.url,
                                xhr.responseURL);//services.xhr.responseURL);
                        })
                }, 350)
            } else {
                function sendXhrAjax() {
                    $.ajax(params)
                        .done(function (response, state, status) {
                            if (url.indexOf('biz2.bankhapoalim.co.il') !== -1 && all.banks.accounts.poalimAsakim.active && xhr.responseURL && xhr.responseURL.includes('ErrorNew_6')) {
                                // debugger
                                // myEmitterLogs(302);
                                // let iCahngeIp = 0;
                                // async function changeIpBiz() {
                                //     iCahngeIp++
                                //     try {
                                //         writeLog("---- Start ChangeIp----");
                                //         const res = await all.banks.core.main.changeIpV4(true)
                                //         if (res) {
                                //             $.ajax(params)
                                //                 .done(function (response, state, status) {
                                //                     if (xhr.responseURL && xhr.responseURL.includes('ErrorNew_6') && iCahngeIp < 3) {
                                //                         changeIpBiz()
                                //                     } else {
                                //                         if (xhr.responseURL && xhr.responseURL.includes('ErrorNew_6')) {
                                //                             $.get("http://icanhazip.com")
                                //                                 .done(function (ipAddrress) {
                                //                                     ipAddrress = ipAddrress.replace(/\s/g, "");
                                //                                     myEmitterLogs(9, 'IP is blocked - ' + ipAddrress + 'spiderId:' + all.banks.spiderConfig.spiderId);
                                //                                 });
                                //                         } else {
                                //                             dfd.resolve(response, state, status, xhr.responseURL);
                                //                         }
                                //                     }
                                //                 })
                                //                 .fail(function (error, resErr, xhr) {
                                //                     if (iCahngeIp < 3) {
                                //                         changeIpBiz()
                                //                     } else {
                                //                         if (error.status == 406) {
                                //                             console.log('406')
                                //                         }
                                //                         dfd.reject(error, resErr, params.url,
                                //                             xhr.responseURL);
                                //                     }
                                //                 })
                                //         } else {
                                //             $.get("http://icanhazip.com")
                                //                 .done(function (ipAddrress) {
                                //                     ipAddrress = ipAddrress.replace(/\s/g, "");
                                //                     myEmitterLogs(9, 'IP is blocked - ' + ipAddrress + 'spiderId:' + all.banks.spiderConfig.spiderId);
                                //                 });
                                //         }
                                //     } catch (e) {
                                //         $.get("http://icanhazip.com")
                                //             .done(function (ipAddrress) {
                                //                 ipAddrress = ipAddrress.replace(/\s/g, "");
                                //                 myEmitterLogs(9, 'IP is blocked - ' + ipAddrress + 'spiderId:' + all.banks.spiderConfig.spiderId);
                                //             });
                                //     }
                                // }
                                // changeIpBiz()


                                $.ajax(params)
                                    .done(function (response, state, status) {
                                        if (xhr.responseURL && xhr.responseURL.includes('ErrorNew_6')) {
                                            $.get("http://icanhazip.com")
                                                .done(function (ipAddrress) {
                                                    ipAddrress = ipAddrress.replace(/\s/g, "");
                                                    myEmitterLogs(9, 'IP is blocked - ' + ipAddrress + 'spiderId:' + all.banks.spiderConfig.spiderId);
                                                });
                                        } else {
                                            dfd.resolve(response, state, status, xhr.responseURL);
                                        }
                                    })
                                    .fail(function (error, resErr, xhr) {
                                        if (error.status == 406) {
                                            console.log('406')
                                        }
                                        dfd.reject(error, resErr, params.url,
                                            xhr.responseURL);
                                    })


                            } else {
                                if (url.indexOf('biz2.bankhapoalim.co.il') !== -1 && all.banks.accounts.poalimAsakim.active) {
                                    writeLog('Req: ' + url + ' status: ' + status.status);
                                    if (xhr.responseURL !== url
                                        &&
                                        xhr.responseURL.includes('authenticate')) {
                                        writeLog('Req: ' + url + ' redirect to url: ' + xhr.responseURL);
                                        all.banks.accountDetails.bank.BankNumber = all.banks.accountDetails.bank.BankNumberSrc;
                                        all.banks.accounts.poalimAsakim.login(function (resData) {
                                            if (resData) {
                                                writeLog('Session expired, renewed login succeeded!');
                                                sendXhrAjax();
                                                // dfd.resolve(response, state, status, xhr.responseURL); // services.xhr.responseURL);
                                            } else {
                                                writeLog('Session expired, re-login failed');
                                                all.banks.accounts.poalimAsakim.logOutNew();
                                                return;
                                            }
                                        })
                                        // all.banks.core.main.changeIpV4(false).then(function () {
                                        //
                                        // });
                                    } else {
                                        dfd.resolve(response, state, status, xhr.responseURL); // services.xhr.responseURL);
                                    }
                                } else {
                                    dfd.resolve(response, state, status, xhr.responseURL); // services.xhr.responseURL);
                                }
                            }
                        })
                        .fail(function (error, resErr, xhr) {
                            if (url.indexOf('biz2.bankhapoalim.co.il') !== -1) {
                                writeLog('Error!!! Req: ' + url + ' status: ' + error.status);
                            }
                            if (error.status == 406) {
                                console.log('406')
                            }
                            dfd.reject(error, resErr, params.url, xhr.responseURL); // services.xhr.responseURL);
                        })
                }

                sendXhrAjax()
            }
        } else {
            all.banks.core.services.errorLog("undefinedUrl");
        }
        return dfd.promise();
    };

    services.httpReqResolveArray = function (url, method, data, contentType, linksInside, media, headers, timeout, isUploadToAWS) {
        var dfd = jQuery.Deferred();
        if (url !== undefined && typeof url === "string") {
            monitorActivityClass.setIntervalActivity();
            var params = {
                url: url,
                xhrFields: {
                    withCredentials: true
                },
                method: method,
                type: method,
                timeout: timeout || 120000
            };

            if (url.indexOf('login.bankhapoalim.co.il') !== -1) {
                params.beforeSend = function (xhr) {
                    if (all.banks.accounts.hapoalim.xsrfToken) {
                        xhr.setRequestHeader('X-XSRF-TOKEN', all.banks.accounts.hapoalim.xsrfToken);
                    }
                };
            }
            if (url.indexOf('biz2.bankhapoalim.co.il') !== -1) {
                params.beforeSend = function (xhr) {
                    if (all.banks.accounts.poalimAsakim.xsrfToken) {
                        xhr.setRequestHeader('X-XSRF-TOKEN', all.banks.accounts.poalimAsakim.xsrfToken);
                    }
                };
            }
            if (url.indexOf('hb2.bankleumi.co.il') !== -1 || url.indexOf('start.telebank.co.il') !== -1) {
                params.beforeSend = function (xhr) {
                    xhr.setRequestHeader('Upgrade-Insecure-Requests', '1');
                };
            }
            if (url.includes('mto.mizrahi-tefahot.co.il')) {
                params.beforeSend = function (xhr) {
                    xhr.setRequestHeader('Upgrade-Insecure-Requests', '1')
                    if (all.banks.accounts.mizrahiTefahot.xsrfToken) {
                        xhr.setRequestHeader('mizrahixsrftoken', all.banks.accounts.mizrahiTefahot.xsrfToken);
                    }
                };
            }
            if (url.includes('unionbank.co.il/InternalSite/Validate')) {
                params.beforeSend = function (xhr) {
                    xhr.overrideMimeType('text/html; charset=windows-1255');
                };
            }

            if (linksInside == true) {
                // const token = this.getToken();
                params.headers = {
                    // 'Authorization': token,
                    'HTML_LOGIN': true
                };
                // params.beforeSend = function (xhr) {
                //     xhr.setRequestHeader('Authorization', token);
                // };
                // params.username = all.banks.config.user;
                // params.password = all.banks.config.pass;
                myEmitterLogs(32, url);
            }

            if ((url.includes('bizibox') || url.includes('dataload.bizibox.biz') || url.includes('adm.bizibox.biz')) && (!headers || (headers && !headers.Authorization))) {
                if (params.headers === undefined) {
                    params.headers = {
                        'Authorization': 'Basic' + btoa(all.banks.config.user + ':' + all.banks.config.pass)
                    };
                } else {
                    params.headers['Authorization'] = 'Basic' + btoa(all.banks.config.user + ':' + all.banks.config.pass);
                }
                params.beforeSend = function (xhr) {
                    xhr.setRequestHeader('Authorization', all.banks.core.services.make_base_auth(all.banks.config.user, all.banks.config.pass));
                };
            }
            if (url.indexOf('eloan.co.il') !== -1) {
                if (params.headers === undefined) {
                    params.headers = {
                        'rbz-bizibox': new Date().getTime()
                    };
                } else {
                    params.headers['rbz-bizibox'] = new Date().getTime();
                }
            }
            if (url.includes('api.pagerduty.com')) {

            }
            if (contentType == true) {
                params.contentType = "application/x-www-form-urlencoded; charset=UTF-8";
                params['data'] = data;
            } else {
                if ((method === 'PUT' && !isUploadToAWS) || (method == 'POST' && media == undefined)) {
                    params['data'] = JSON.stringify(data);
                    if (params.headers == undefined) {
                        params.headers = {
                            'Accept': '*/*',
                            'Content-Type': 'application/json'
                        };
                    } else {
                        params.headers.Accept = '*/*';
                        params.headers['Content-Type'] = 'application/json';
                    }
                }
                if (method == 'POST' && media !== undefined) {
                    params['data'] = data;
                    params.processData = false;
                    params.contentType = false;
                }
                if (method === 'PUT' && media !== undefined && isUploadToAWS) {
                    params['data'] = data;
                    params.processData = false;
                    params.contentType = false;
                    params.cache = false;
                }
            }

            if (headers) {
                params.headers = params.headers ? Object.assign({}, headers, params.headers) : headers;
            }

            if (url.indexOf('telebank.co.il/Lobby/') !== -1 || url.indexOf('telebank.co.il/Titan/') !== -1) {
                const discountGlobalHeaders = (all.banks.accounts.discuont || all.banks.accounts.discountAsakimPlusNew).globalHeaders;
                params.headers = !!params.headers ? Object.assign({},
                        discountGlobalHeaders,
                        params.headers)
                    : discountGlobalHeaders;
            }

            var xhr = new XMLHttpRequest();
            params.xhr = function () {
                return xhr;
            };

            if (url.indexOf('biz.bankhapoalim.co.il') !== -1) {
                setTimeout(function () {
                    $.ajax(params)
                        .done(function (response, state, status) {
                            dfd.resolve([response, state, status,
                                xhr.responseURL]);//services.xhr.responseURL);
                        })
                        .fail(function (error, resErr) {
                            if (error.status == 406) {
                                console.log('406')
                            }
                            dfd.reject([error, resErr, params.url,
                                xhr.responseURL]);//services.xhr.responseURL);
                        })
                }, 350)
            } else {

                $.ajax(params)
                    .done(function (response, state, status) {
                        dfd.resolve([response, state, status, xhr.responseURL]); // services.xhr.responseURL);
                    })
                    .fail(function (error, resErr, xhr) {
                        if (error.status == 406) {
                            console.log('406')
                        }
                        dfd.reject([error, resErr, params.url,
                            xhr.responseURL]); // services.xhr.responseURL);
                    })
            }
        } else {
            all.banks.core.services.errorLog("undefinedUrl");
        }
        return dfd.promise();
    };

    services.sendOsh = function (data, matah) {
        var isMatah = "-";
        if (matah) {
            isMatah = "_Matah_";
        }
        all.banks.core.services.numberLoopError++;
        var dfd = jQuery.Deferred();
        if (data.BankData == undefined) {
            all.banks.core.services.numberLoopError = 0;
            dfd.resolve(true);
        } else {
            if (matah) {
                data.IsMatah = true;
            }

            var pathJson = "";
            if (all.banks.spiderConfig.sendToServerApi !== all.banks.spiderConfig.sendToServer) {
                pathJson = "json/";
            }
            all.banks.core.services.httpReq(all.banks.spiderConfig.sendToServerApi + "/dataload/" + pathJson + "banks/result", 'POST', data, false, true)
                .then(function (response) {
                    exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token + isMatah + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                        if (err) {
                            console.log('Error writing file');
                        }
                    });
                    all.banks.core.services.numberLoopError = 0;
                    dfd.resolve(response);
                })
                .fail(function (error) {
                    if ((error.status == 500 || error.status == 502 || error.status == 406 || error.status == 504) && all.banks.core.services.numberLoopError < 6) {
                        myEmitterLogs(26, "dataload/banks/result, status: " + error.status + "errorText: " + error.responseText);
                        dfd.reject('discard');
                    } else {
                        exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token + isMatah + '_Error_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                            if (err) {
                                console.log('Error writing file');
                            }
                        });
                        myEmitterLogs(26, "dataload/banks/result, status: " + error.status + "errorText: " + error.responseText);
                        all.banks.core.services.numberLoopError = 0;
                        dfd.resolve(error);
                    }
                });
        }
        return dfd.promise();
    };
    services.sendOshServer = function (data, matah) {
        var dfd = jQuery.Deferred();

        var numberLoopError = 0;

        function runSender() {
            var isMatah = "-";
            if (matah) {
                isMatah = "_Matah_";
            }
            numberLoopError++;
            if (data.BankData === undefined) {
                numberLoopError = 0;
                dfd.resolve(true);
            } else {
                if (matah) {
                    data.IsMatah = true;
                }

                var pathJson = "";
                if (all.banks.spiderConfig.sendToServerApi !== all.banks.spiderConfig.sendToServer) {
                    pathJson = "json/";
                }
                // const token = this.getToken();
                const options = {
                    uri: all.banks.spiderConfig.sendToServerApi + "/dataload/" + pathJson + "banks/result",
                    method: 'POST',
                    family: 4,
                    timeout: 100000,
                    body: JSON.stringify(data),
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36",
                        "Connection": "keep-alive",
                        "Content-Type": "application/json; charset=UTF-8",
                        "Cache-Control": "no-cache",
                        'Authorization': all.banks.core.services.make_base_auth(all.banks.config.user, all.banks.config.pass),
                        'HTML_LOGIN': true
                    }
                }
                senderReq.sendersServer(options, (error, response, body) => {
                    if (!error) {
                        exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token + isMatah + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                            if (err) {
                                console.log('Error writing file');
                            }
                        });
                        numberLoopError = 0;
                        dfd.resolve(response);
                    } else {
                        if (((!response) || (response && (response.statusCode === 500 || response.statusCode === 502 || response.statusCode === 406 || response.statusCode === 504))) && numberLoopError < 6) {
                            myEmitterLogs(26, "dataload/banks/result, status: " + error.status + "errorText: " + error.responseText);
                            runSender();
                        } else {
                            exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token + isMatah + '_Error_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                                if (err) {
                                    console.log('Error writing file');
                                }
                            });
                            myEmitterLogs(26, "dataload/banks/result, status: " + error.status + "errorText: " + error.responseText);
                            numberLoopError = 0;
                            dfd.resolve(error);
                        }
                    }
                });
            }
        }

        runSender();

        return dfd.promise();
    };

    services.sendChecks = function (data) {
        all.banks.core.services.numberLoopError++;
        var dfd = jQuery.Deferred();
        if (all.banks.accounts.IND_CHECKS_TO_S3 === 1) {
            const token = services.getTokenAWS();
            // all.banks.core.services.httpReq('https://i-dev-etl.bizibox.biz/rest/api/v1/dataload/upload-check-images', 'POST', data.params, false, false, undefined, {
            all.banks.core.services.httpReq('https://' + all.banks.spiderConfig.sendToServerAWS + '/rest/api/v1/dataload/upload-check-images', 'POST', data.params, false, false, undefined, {
                'Authorization': token
            })
                .then(function (response) {
                    const blob = data.formData.get(data.params.imagenamekey);
                    blob.text().then(text => {
                        if (!text.includes('data:image/')) {
                            text = "data:image/jpeg;base64," + text;
                        }
                        fetch(text)
                            .then(res => res.blob())
                            .then(blob => {
                                const file = new File([blob], data.params.imagenamekey, {
                                    type: 'image/jpeg',
                                    lastModified: new Date().getTime()
                                });
                                file['src'] = URL.createObjectURL(file);
                                all.banks.core.services.httpReq(response, 'PUT', file, false, false, true, {
                                    'Content-Type': 'image/jpeg'
                                }, false, true)
                                    .then(function (response) {
                                        all.banks.core.services.numberLoopError = 0;
                                        dfd.resolve(response);
                                    })
                                    .fail(function (error) {
                                        if ((error.status == 500 || error.status == 502 || error.status == 406 || error.status == 504) && all.banks.core.services.numberLoopError < 6) {
                                            myEmitterLogs(26, "dataload/cheques/images, status: " + error.status + "errorText: " + error.responseText);
                                            dfd.reject('discard');
                                        } else {
                                            myEmitterLogs(26, "dataload/cheques/images, status: " + error.status + "errorText: " + error.responseText);
                                            all.banks.core.services.numberLoopError = 0;
                                            dfd.resolve("error");
                                        }
                                    });
                            })
                    });


                    // fetch(url)
                    //     .then(res => res.blob())
                    //     .then(blob => {
                    //         console.log(blob)
                    //
                    //
                    //         const file = new File([blob], data.params.imagenamekey, {
                    //             type: 'image/jpg',
                    //             lastModified: new Date().getTime()
                    //         });
                    //         file['src'] = URL.createObjectURL(file);
                    //     })
                    //
                    // if (data.canvas.data.toBlob) {
                    //     data.canvas.data.toBlob(function (blob) {
                    //         const file = new File([blob], data.params.imagenamekey, {
                    //             type: 'image/jpeg',
                    //             lastModified: new Date().getTime()
                    //         });
                    //         file['src'] = URL.createObjectURL(file);
                    //     }, 'image/jpeg', data.canvas.quality)
                    // }


                })
                .fail(function (error) {
                    // all.banks.core.services.httpReq('https://api.bizibox.biz/rest/api/v1/dataload/upload-check-images', 'POST', data.params, false, true)
                    //     .then(function (response) {
                    //         all.banks.core.services.httpReq(response, 'PUT', data.formData, false, false, true, {
                    //             'Content-Type': "text/plain"
                    //         }, false, true)
                    //             .then(function (response) {
                    //                 all.banks.core.services.numberLoopError = 0;
                    //                 dfd.resolve(response);
                    //             })
                    //             .fail(function (error) {
                    //                 if ((error.status == 500 || error.status == 502 || error.status == 406 || error.status == 504) && all.banks.core.services.numberLoopError < 6) {
                    //                     myEmitterLogs(26, "dataload/cheques/images, status: " + error.status + "errorText: " + error.responseText);
                    //                     dfd.reject('discard');
                    //                 } else {
                    //                     myEmitterLogs(26, "dataload/cheques/images, status: " + error.status + "errorText: " + error.responseText);
                    //                     all.banks.core.services.numberLoopError = 0;
                    //                     dfd.resolve("error");
                    //                 }
                    //             });
                    //     })
                    //     .fail(function (error) {
                    //         all.banks.core.services.numberLoopError = 0;
                    //         dfd.resolve("error");
                    //     })
                    myEmitterLogs(26, "https://" + all.banks.spiderConfig.sendToServerAWS + "/rest/api/v1/dataload/upload-check-images, status: " + error.status + "errorText: " + error.responseText);
                    all.banks.core.services.numberLoopError = 0;
                    dfd.resolve("error");
                })
        } else {
            all.banks.core.services.httpReq(all.banks.spiderConfig.sendToServer + "/dataload/cheques/images", 'POST', data.formData, false, true, true)
                .then(function (response) {
                    all.banks.core.services.numberLoopError = 0;
                    dfd.resolve(response);
                })
                .fail(function (error) {
                    if ((error.status == 500 || error.status == 502 || error.status == 406 || error.status == 504) && all.banks.core.services.numberLoopError < 6) {
                        myEmitterLogs(26, "dataload/cheques/images, status: " + error.status + "errorText: " + error.responseText);
                        dfd.reject('discard');
                    } else {
                        myEmitterLogs(26, "dataload/cheques/images, status: " + error.status + "errorText: " + error.responseText);
                        all.banks.core.services.numberLoopError = 0;
                        dfd.resolve("error");
                    }
                });
        }
        return dfd.promise();
    };
    services.sendAccDDPoalim = function (data) {
        all.banks.core.services.numberLoopError++;
        var dfd = jQuery.Deferred();
        all.banks.core.services.httpReq("https://secure.bizibox.biz/ang/protected/spider_get_poalimbiz_work", 'POST', data, false, true)
            .then(function (response) {
                all.banks.core.services.numberLoopError = 0;
                //var type = 8;
                //var text = "אוסף נתוני חשבונות";
                dfd.resolve(response);
            })
            .fail(function (error) {
                if ((error.status == 500 || error.status == 502 || error.status == 406 || error.status == 504) && all.banks.core.services.numberLoopError < 6) {
                    dfd.reject('discard');
                } else {
                    all.banks.core.services.numberLoopError = 0;
                    dfd.resolve(error);
                }
            })
        return dfd.promise();
    };
    services.sendCards = function (data) {
        all.banks.core.services.numberLoopError += 1;
        var dfd = jQuery.Deferred();
        if (!data.length) {
            all.banks.core.services.numberLoopError = 0;
            dfd.resolve(true);
        } else {
            var pathJson = "";
            if (all.banks.spiderConfig.sendToServerApi !== all.banks.spiderConfig.sendToServer) {
                pathJson = "json/";
            }

            // --- TEMPORARILY !!!! REMOVE WHEN BACKEND GOT READY ---
            // for (const item of data) {
            //     delete item.CardStatus;
            // }
            // -------------------------------------------------------

            all.banks.core.services.httpReq(all.banks.spiderConfig.sendToServerApi + "/dataload/" + pathJson + "cards/result", 'POST', data, false, true)
                .then(function (response) {
                    exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token + '_Card_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                        if (err) {
                            console.log('Error writing file');
                        }
                    });
                    all.banks.core.services.numberLoopError = 0;
                    dfd.resolve(response);
                })
                .fail(function (error) {
                    if ((error.status == 500 || error.status == 502 || error.status == 406 || error.status == 504) && all.banks.core.services.numberLoopError < 6) {
                        myEmitterLogs(26, "dataload/cards/result, status: " + error.status + "errorText: " + error.responseText);
                        dfd.reject('discard');
                    } else {
                        exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token + '_Card_Error_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                            if (err) {
                                console.log('Error writing file');
                            }
                        });
                        myEmitterLogs(26, "dataload/cards/result, status: " + error.status + "errorText: " + error.responseText);
                        all.banks.core.services.numberLoopError = 0;
                        dfd.resolve(error);
                    }
                })
        }

        return dfd.promise();
    };
    services.sendCardsServer = function (data) {
        all.banks.core.services.numberLoopError += 1;
        var dfd = jQuery.Deferred();
        if (!data.length) {
            all.banks.core.services.numberLoopError = 0;
            dfd.resolve(true);
        } else {
            var pathJson = "";
            if (all.banks.spiderConfig.sendToServerApi !== all.banks.spiderConfig.sendToServer) {
                pathJson = "json/";
            }
            // const token = this.getToken();

            const options = {
                uri: all.banks.spiderConfig.sendToServerApi + "/dataload/" + pathJson + "cards/result",
                method: 'POST',
                family: 4,
                timeout: 100000,
                body: JSON.stringify(data),
                headers: {
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36",
                    "Connection": "keep-alive",
                    "Content-Type": "application/json; charset=UTF-8",
                    "Cache-Control": "no-cache",
                    'Authorization': all.banks.core.services.make_base_auth(all.banks.config.user, all.banks.config.pass),
                    'HTML_LOGIN': true
                }
            }
            senderReq.sendersServer(options, (error, response, body) => {
                if (!error) {
                    exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token + '_Card_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                        if (err) {
                            console.log('Error writing file');
                        }
                    });
                    all.banks.core.services.numberLoopError = 0;
                    dfd.resolve(body);
                } else {
                    if (((!response) || (response && (response.statusCode === 500 || response.statusCode === 502 || response.statusCode === 406 || response.statusCode === 504))) && all.banks.core.services.numberLoopError < 6) {
                        myEmitterLogs(26, "dataload/cards/result, status: " + error.status);
                        dfd.reject('discard');
                    } else {
                        exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token + '_Card_Error_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                            if (err) {
                                console.log('Error writing file');
                            }
                        });
                        myEmitterLogs(26, "dataload/cards/result, status: " + response.statusCode);
                        all.banks.core.services.numberLoopError = 0;
                        dfd.resolve(error);
                    }
                }
            });
        }

        return dfd.promise();
    };

    services.sendPikdonotServer = function (data) {
        all.banks.core.services.numberLoopError += 1;
        var dfd = jQuery.Deferred();
        if (!data.length) {
            all.banks.core.services.numberLoopError = 0;
            dfd.resolve(true);
        } else {
            var pathJson = "";
            if (all.banks.spiderConfig.sendToServerApi !== all.banks.spiderConfig.sendToServer) {
                pathJson = "json/";
            }
            // const token = this.getToken();

            const options = {
                uri: all.banks.spiderConfig.sendToServerApi + "/dataload/" + pathJson + "savings/result",
                method: 'POST',
                family: 4,
                timeout: 100000,
                body: JSON.stringify(data),
                headers: {
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36",
                    "Connection": "keep-alive",
                    "Content-Type": "application/json; charset=UTF-8",
                    "Cache-Control": "no-cache",
                    'Authorization': all.banks.core.services.make_base_auth(all.banks.config.user, all.banks.config.pass),
                    'HTML_LOGIN': true
                }
            }
            senderReq.sendersServer(options, (error, response, body) => {
                if (!error) {
                    exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token + '_Saving_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                        if (err) {
                            console.log('Error writing file');
                        }
                    });
                    all.banks.core.services.numberLoopError = 0;
                    dfd.resolve(body);
                } else {
                    if (((!response) || (response && (response.statusCode === 500 || response.statusCode === 502 || response.statusCode === 406 || response.statusCode === 504))) && all.banks.core.services.numberLoopError < 6) {
                        myEmitterLogs(26, "dataload/savings/result, status: " + error.status);
                        dfd.reject('discard');
                    } else {
                        exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token + '_SavingError_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                            if (err) {
                                console.log('Error writing file');
                            }
                        });
                        myEmitterLogs(26, "dataload/savings/result, status: " + response.statusCode);
                        all.banks.core.services.numberLoopError = 0;
                        dfd.resolve(error);
                    }
                }
            });
        }

        return dfd.promise();
    };

    services.sendLoanServer = function (data) {
        all.banks.core.services.numberLoopError += 1;
        var dfd = jQuery.Deferred();
        if (!data.length) {
            all.banks.core.services.numberLoopError = 0;
            dfd.resolve(true);
        } else {
            var pathJson = "";
            if (all.banks.spiderConfig.sendToServerApi !== all.banks.spiderConfig.sendToServer) {
                pathJson = "json/";
            }
            // const token = this.getToken();

            const options = {
                uri: all.banks.spiderConfig.sendToServerApi + "/dataload/" + pathJson + "loans/result",
                method: 'POST',
                family: 4,
                timeout: 100000,
                body: JSON.stringify(data),
                headers: {
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36",
                    "Connection": "keep-alive",
                    "Content-Type": "application/json; charset=UTF-8",
                    "Cache-Control": "no-cache",
                    'Authorization': all.banks.core.services.make_base_auth(all.banks.config.user, all.banks.config.pass),
                    'HTML_LOGIN': true
                }
            }
            senderReq.sendersServer(options, (error, response, body) => {
                if (!error) {
                    exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token + '_Loan_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                        if (err) {
                            console.log('Error writing file');
                        }
                    });
                    all.banks.core.services.numberLoopError = 0;
                    dfd.resolve(body);
                } else {
                    if (((!response) || (response && (response.statusCode === 500 || response.statusCode === 502 || response.statusCode === 406 || response.statusCode === 504))) && all.banks.core.services.numberLoopError < 6) {
                        myEmitterLogs(26, "dataload/loans/result, status: " + error.status);
                        dfd.reject('discard');
                    } else {
                        exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token + '_LoanError_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                            if (err) {
                                console.log('Error writing file');
                            }
                        });
                        myEmitterLogs(26, "dataload/loans/result, status: " + response.statusCode);
                        all.banks.core.services.numberLoopError = 0;
                        dfd.resolve(error);
                    }
                }
            });
        }

        return dfd.promise();
    };


    services.sendDueChecksServer = function (data) {
        all.banks.core.services.numberLoopError += 1;
        var dfd = jQuery.Deferred();
        if (!data.length) {
            all.banks.core.services.numberLoopError = 0;
            dfd.resolve(true);
        } else {
            var pathJson = "";
            if (all.banks.spiderConfig.sendToServerApi !== all.banks.spiderConfig.sendToServer) {
                pathJson = "json/";
            }
            // const token = this.getToken();

            const options = {
                uri: all.banks.spiderConfig.sendToServerApi + "/dataload/" + pathJson + "cheques/result",
                method: 'POST',
                family: 4,
                timeout: 100000,
                body: JSON.stringify(data),
                headers: {
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36",
                    "Connection": "keep-alive",
                    "Content-Type": "application/json; charset=UTF-8",
                    "Cache-Control": "no-cache",
                    'Authorization': all.banks.core.services.make_base_auth(all.banks.config.user, all.banks.config.pass),
                    'HTML_LOGIN': true
                }
            }
            senderReq.sendersServer(options, (error, response, body) => {
                if (!error) {
                    exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token + '_DueChecks_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                        if (err) {
                            console.log('Error writing file');
                        }
                    });
                    all.banks.core.services.numberLoopError = 0;
                    dfd.resolve(body);
                } else {
                    if (((!response) || (response && (response.statusCode === 500 || response.statusCode === 502 || response.statusCode === 406 || response.statusCode === 504))) && all.banks.core.services.numberLoopError < 6) {
                        myEmitterLogs(26, "dataload/cheques/result, status: " + error.status);
                        dfd.reject('discard');
                    } else {
                        exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token + '_DueChecksError_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                            if (err) {
                                console.log('Error writing file');
                            }
                        });
                        myEmitterLogs(26, "dataload/cheques/result, status: " + response.statusCode);
                        all.banks.core.services.numberLoopError = 0;
                        dfd.resolve(error);
                    }
                }
            });
        }

        return dfd.promise();
    };

    services.sendStandingOrdersServer = function (data) {
        all.banks.core.services.numberLoopError += 1;
        var dfd = jQuery.Deferred();
        if (!data.length) {
            all.banks.core.services.numberLoopError = 0;
            dfd.resolve(true);
        } else {
            var pathJson = "";
            if (all.banks.spiderConfig.sendToServerApi !== all.banks.spiderConfig.sendToServer) {
                pathJson = "json/";
            }
            // const token = this.getToken();

            const options = {
                uri: all.banks.spiderConfig.sendToServerApi + "/dataload/" + pathJson + "standing_orders/result",
                method: 'POST',
                family: 4,
                timeout: 100000,
                body: JSON.stringify(data),
                headers: {
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36",
                    "Connection": "keep-alive",
                    "Content-Type": "application/json; charset=UTF-8",
                    "Cache-Control": "no-cache",
                    'Authorization': all.banks.core.services.make_base_auth(all.banks.config.user, all.banks.config.pass),
                    'HTML_LOGIN': true
                }
            }
            senderReq.sendersServer(options, (error, response, body) => {
                if (!error) {
                    exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token + '_StandingOrders_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                        if (err) {
                            console.log('Error writing file');
                        }
                    });
                    all.banks.core.services.numberLoopError = 0;
                    dfd.resolve(body);
                } else {
                    if (((!response) || (response && (response.statusCode === 500 || response.statusCode === 502 || response.statusCode === 406 || response.statusCode === 504))) && all.banks.core.services.numberLoopError < 6) {
                        myEmitterLogs(26, "dataload/standing_orders/result, status: " + error.status);
                        dfd.reject('discard');
                    } else {
                        exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token + '_StandingOrdersError_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                            if (err) {
                                console.log('Error writing file');
                            }
                        });
                        myEmitterLogs(26, "dataload/standing_orders/result, status: " + response.statusCode);
                        all.banks.core.services.numberLoopError = 0;
                        dfd.resolve(error);
                    }
                }
            });
        }

        return dfd.promise();
    };


    services.sendPikdonot = function (data) {
        all.banks.core.services.numberLoopError++;
        var dfd = jQuery.Deferred();
        if (!data.length) {
            all.banks.core.services.numberLoopError = 0;
            dfd.resolve(true);
        } else {
            var pathJson = "";
            if (all.banks.spiderConfig.sendToServerApi !== all.banks.spiderConfig.sendToServer) {
                pathJson = "json/";
            }
            all.banks.core.services.httpReq(all.banks.spiderConfig.sendToServerApi + "/dataload/" + pathJson + "savings/result", 'POST', data, false, true)
                .then(function (response) {
                    exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token.toUpperCase() + '_Saving_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                        if (err) {
                            console.log('Error writing file');
                        }
                    });
                    all.banks.core.services.numberLoopError = 0;
                    dfd.resolve(response);
                })
                .fail(function (error) {
                    if ((error.status == 500 || error.status == 502 || error.status == 406 || error.status == 504) && all.banks.core.services.numberLoopError < 6) {
                        myEmitterLogs(26, "dataload/savings/result, status: " + error.status + "errorText: " + error.responseText);
                        dfd.reject('discard');
                    } else {
                        myEmitterLogs(26, "dataload/savings/result, status: " + error.status + "errorText: " + error.responseText);
                        exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token.toUpperCase() + '_SavingError_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                            if (err) {
                                console.log('Error writing file');
                            }
                        });
                        all.banks.core.services.numberLoopError = 0;
                        dfd.resolve(error);
                    }
                })
        }
        return dfd.promise();
    };
    services.sendLoan = function (data) {
        all.banks.core.services.numberLoopError++;
        var dfd = jQuery.Deferred();
        if (!data.length) {
            all.banks.core.services.numberLoopError = 0;
            dfd.resolve(true);
        } else {
            var pathJson = "";
            if (all.banks.spiderConfig.sendToServerApi !== all.banks.spiderConfig.sendToServer) {
                pathJson = "json/";
            }
            all.banks.core.services.httpReq(all.banks.spiderConfig.sendToServerApi + "/dataload/" + pathJson + "loans/result", 'POST', data, false, true)
                .then(function (response) {
                    exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token.toUpperCase() + '_Loan_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                        if (err) {
                            console.log('Error writing file');
                        }
                    });
                    all.banks.core.services.numberLoopError = 0;
                    dfd.resolve(response);
                })
                .fail(function (error) {
                    if ((error.status == 500 || error.status == 502 || error.status == 406 || error.status == 504) && all.banks.core.services.numberLoopError < 6) {
                        myEmitterLogs(26, "dataload/loans/result, status: " + error.status + "errorText: " + error.responseText);
                        dfd.reject('discard');
                    } else {
                        myEmitterLogs(26, "dataload/loans/result, status: " + error.status + "errorText: " + error.responseText);
                        exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token.toUpperCase() + '_LoanError_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                            if (err) {
                                console.log('Error writing file');
                            }
                        });
                        all.banks.core.services.numberLoopError = 0;
                        dfd.resolve(error);
                    }
                })
        }
        return dfd.promise();
    };
    services.slikaAccount = function (data) {
        all.banks.core.services.numberLoopError++;
        var dfd = jQuery.Deferred();
        if (!data.length) {
            all.banks.core.services.numberLoopError = 0;
            dfd.resolve(true);
        } else {
            var pathJson = "";
            if (all.banks.spiderConfig.sendToServerApi !== all.banks.spiderConfig.sendToServer) {
                pathJson = "json/";
            }
            all.banks.core.services.httpReq(all.banks.spiderConfig.sendToServerApi + "/dataload/" + pathJson + "slika/result", 'POST', data, false, true)
                .then(function (response) {
                    exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token.toUpperCase() + '_Slika_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                        if (err) {
                            console.log('Error writing file');
                        }
                    });
                    all.banks.core.services.numberLoopError = 0;
                    dfd.resolve(response);
                })
                .fail(function (error) {
                    if ((error.status == 500 || error.status == 502 || error.status == 406 || error.status == 504) && all.banks.core.services.numberLoopError < 6) {
                        myEmitterLogs(26, "dataload/slika/result, status: " + error.status + "errorText: " + error.responseText);
                        dfd.reject('discard');
                    } else {
                        myEmitterLogs(26, "dataload/slika/result, status: " + error.status + "errorText: " + error.responseText);
                        exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token.toUpperCase() + '_SlikaError_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                            if (err) {
                                console.log('Error writing file');
                            }
                        });
                        all.banks.core.services.numberLoopError = 0;
                        dfd.resolve(error);
                    }
                })
        }
        return dfd.promise();
    };
    services.sendDueChecks = function (data) {
        all.banks.core.services.numberLoopError++;
        var dfd = jQuery.Deferred();
        if (!data.length) {
            all.banks.core.services.numberLoopError = 0;
            dfd.resolve(true);
        } else {
            var pathJson = "";
            if (all.banks.spiderConfig.sendToServerApi !== all.banks.spiderConfig.sendToServer) {
                pathJson = "json/";
            }
            all.banks.core.services.httpReq(all.banks.spiderConfig.sendToServerApi + "/dataload/" + pathJson + "cheques/result", 'POST', data, false, true)
                .then(function (response) {
                    exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token.toUpperCase() + '_DueChecks_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                        if (err) {
                            console.log('Error writing file');
                        }
                    });
                    all.banks.core.services.numberLoopError = 0;
                    dfd.resolve(response);
                })
                .fail(function (error) {
                    if ((error.status == 500 || error.status == 502 || error.status == 406 || error.status == 504) && all.banks.core.services.numberLoopError < 6) {
                        myEmitterLogs(26, "dataload/cheques/result, status: " + error.status + "errorText: " + error.responseText);
                        dfd.reject('discard');
                    } else {
                        myEmitterLogs(26, "dataload/cheques/result, status: " + error.status + "errorText: " + error.responseText);
                        exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token.toUpperCase() + '_DueChecksError_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                            if (err) {
                                console.log('Error writing file');
                            }
                        });
                        all.banks.core.services.numberLoopError = 0;
                        dfd.resolve(error);
                    }
                });
        }
        return dfd.promise();
    };
    services.sendStandingOrders = function (data) {
        all.banks.core.services.numberLoopError++;
        var dfd = jQuery.Deferred();
        if (!data.length) {
            all.banks.core.services.numberLoopError = 0;
            dfd.resolve(true);
        } else {
            var pathJson = "";
            if (all.banks.spiderConfig.sendToServerApi !== all.banks.spiderConfig.sendToServer) {
                pathJson = "json/";
            }
            all.banks.core.services.httpReq(all.banks.spiderConfig.sendToServerApi + "/dataload/" + pathJson + "standing_orders/result", 'POST', data, false, true)
                .then(function (response) {
                    exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token.toUpperCase() + '_StandingOrders_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                        if (err) {
                            console.log('Error writing file');
                        }
                    });
                    all.banks.core.services.numberLoopError = 0;
                    dfd.resolve(response);
                })
                .fail(function (error) {
                    if ((error.status == 500 || error.status == 502 || error.status == 406 || error.status == 504) && all.banks.core.services.numberLoopError < 6) {
                        myEmitterLogs(26, "dataload/standing_orders/result, status: " + error.status + "errorText: " + error.responseText);
                        dfd.reject('discard');
                    } else {
                        myEmitterLogs(26, "dataload/standing_orders/result, status: " + error.status + "errorText: " + error.responseText);
                        exportJson.writeFileWithFolder('./Output/' + all.banks.accountDetails.bank.token.toUpperCase() + '_StandingOrdersError_' + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + new Date().getMilliseconds() + '.json', data, {spaces: 4}, function (err) {
                            if (err) {
                                console.log('Error writing file');
                            }
                        });
                        all.banks.core.services.numberLoopError = 0;
                        dfd.resolve(error);
                    }
                });
        }
        return dfd.promise();
    };
    services.getStatus = function (num) {
        switch (num) {
            case 0:
                return ("תקין");
                break;
            case 1:
                return ("קיימת בעיה טכנית");
                break;
            case 2:
                return ("סיסמא שגויה");
                break;
            case 3:
                return ("חשבון חסום");
                break;

            case 4:
                return ("הסיסמא פגה");
                break;

            case 5:
                return ("סיסמא הולכת לפוג בבנק");
                break;

            case 8:
                return ("תקין");
                break;

            case 9:
                return ("מתחבר...");
                break;

            case 10:
                return ("מתחבר לראשונה...");
                break;

            case 17:
                return ("נדרשת כניסה לאתר");
                break;

            case 444:
                return ("מבזק בנקאי");
                break;

            case 4444:
                return ("פועלים בעסקים");
                break;

            case 158:
                return ("עדכון דיסקוד");
                break;

            case 157:
                return ("עדכון מרקוד");
                break;

            case 100:
                return ("מושך נתוני בנק");
                break;

            case 101:
                return ("מושך כ.אשראי");
                break;

            case 102:
                return ("מושך צקים ממשמרת");
                break;

            case 103:
                return ("מושך פקדונות");
                break;

            case 104:
                return ("מושך הלוואות");
                break;

            case 105:
                return ("מושך הוראות קבע");
                break;

            case null:
                return ("תקין");
                break;
        }
    }
    services.tokenGetotp = function () {
        var dfd = jQuery.Deferred();
        all.banks.core.services.httpReq("https://secure.bizibox.biz/ang/protected/token_getotp/" + all.banks.accountDetails.bank.token, 'GET', null, false, true)
            // all.banks.core.services.httpReq(all.banks.spiderConfig.sendToServer + "/ang/protected/token_getotp/" + all.banks.accountDetails.bank.token, 'GET', null, false, true)
            .then(function (response) {
                dfd.resolve(response);
            })
            .fail(function (error) {
                dfd.reject('discard');
            });
        return dfd.promise();
    };
    services.getDataByToken = function () {
        var dfd = jQuery.Deferred();
        var data = {
            tokenId: $("#token").val()
        }
        all.banks.core.services.httpReq(
            "https://dataload.bizibox.biz/ang/protected/get_token_det",
//			all.banks.spiderConfig.sendToServer + "/ang/protected/get_token_det",
            'POST', data, false, true)
            .then(function (response) {
                dfd.resolve(response);
            })
            .fail(function (error) {
                dfd.reject(error);
            })
        return dfd.promise();
    };
    services.monitor = function (data) {
        all.banks.core.services.httpReq(all.banks.spiderConfig.sendToServer + "/dataload/spider_get_monitor_2", 'POST', data, false, true)
            .then(function (response) {
                // if (response == 1) {
                // 	services.reloadPage();
                // }
                // else {
                // 	services.TimeOut = setTimeout(function () {
                // 		clearTimeout(services.TimeOut);
                // 		services.monitor(data);
                // 	}, 1800000)
                // }
            })
            .fail(function (error) {
                //services.monitor(data);
            })
    };
    services.getTypeCurrency = function () {
        var dfd = jQuery.Deferred();
        all.banks.core.services.httpReq(all.banks.spiderConfig.sendToServer + "/ang/protected/get_currencys", 'GET', false, false, true)
            .then(function (response) {
                exportJson.writeFileWithFolder('typeOfCurrency.json', response, {spaces: 4}, function (err) {
                    if (err) {
                        dfd.reject(err);
                    } else {
                        dfd.resolve(response);
                    }
                });
            })
            .fail(function (error) {
                fs.readFile("typeOfCurrency.json", 'utf8', function (err, data) {
                    if (err) {
                        dfd.reject(error);
                    } else {
                        dfd.resolve(data);
                    }
                });
            });
        return dfd.promise();
    };
    services.loadFromToken = function (token) {
        var dfd = jQuery.Deferred();
        var data = {
            token_id: token
        }
        all.banks.core.services.httpReq("https://adm.bizibox.biz/adm/protected/get_token_target_details", 'POST', data, false, true)
            .then(function (response) {
                dfd.resolve(response);
            })
            .fail(function (error) {
                if ((error.status == 500 || error.status == 502 || error.status == 406 || error.status == 504)) {
                    dfd.reject('discard');
                } else {
                    dfd.resolve(error);
                }
            });
        return dfd.promise();
    };
    services.statusesSentWithPendingReload = [0, 1, 2, 3, 4, 7, 5, 6, 8, 17];
    services.logsQueue = [];
    services.logsQueueProcessor = null;
    services.logsQueueMaxRetries = 6;
    services.logDequeue = function () {
        const logRec = services.logsQueue.shift();

        if (logRec == undefined) {
            clearTimeout(services.logsQueueProcessor);
            services.logsQueueProcessor = null;
            return;
        }

        all.banks.core.services.httpReq(all.banks.spiderConfig.sendToServer + "/dataload/banks/status", 'POST', logRec.data, false, true)
            .then(function (response, state, status) {
                writeLog("dataload/banks/status, status: " + status.status + ", " + (logRec.retryCount > 0 ? "attempt no. " + (logRec.retryCount + 1) : "right away!"));
                if (services.statusesSentWithPendingReload.includes(logRec.data.status)) {
                    all.banks.core.services.reloadPage();
                }
            })
            .fail(function (error) {
                writeLog("dataload/banks/status, status: " + error.status + ", attempt no. " + (logRec.retryCount + 1));
                if (logRec.retryCount < services.logsQueueMaxRetries) {
                    logRec.retryCount++;
                    services.logsQueue.unshift(logRec);
                } else if (services.statusesSentWithPendingReload.includes(logRec.data.status)) {
                    all.banks.core.services.reloadPage();
                }
            })
            .always(function () {
                services.logsQueueProcessor = setTimeout(services.logDequeue, 10);
            });
    };
    services.sendStatus = function (param, text) {
        return new Promise((resolve) => {
            var type;
            switch (param) {
                case 1:
                    type = 9;   //start process
                    break;
                case 11:
                    type = 100;  //pulling currency
                    break;
                case 14:
                    type = 101; //Start Extracting credit card data
                    break;
                case 17:
                    type = 103; //Start Extracting Savings Data
                    break;
                case 19:
                    type = 102; //Start Extracting Due Checks Data
                    break;
                case 21:
                    type = 104; //Start Extracting Loans Data
                    break;
                case 24:
                    type = 105; //Start Extracting Stending orders
                    break;
                case 5:
                    type = 2; //Login Failed
                    break;
                case 6:
                    type = 4; //Password expired
                    break;
                case 7:
                    type = 5; //Your password is going to expire
                    break;
                case 9:
                    type = 1; //General error
                    break;
                case 8:
                    type = 3; //Blocked Account
                    break;
                case 25:
                    type = 0; //Logout
                    break;
                case 27:
                    type = 7; //Logout
                    break;
                case 4:
                    type = 8; //poalim logOut
                    break;
                case 28:     //poalim send all account from account combo
                    type = 100;
                    break;
                case 29:
                    type = 100;  // send information about pulling checks
                    break;
                case 10:
                    type = 100; //information about account
                    break;
                case 30:
                    type = 9; //poalim start
                    break;
                case 12:
                    type = 100; //information about rows num
                    break;
                case 33:
                    type = 101; //information acc for credit card pulling
                    break;
                case 16:
                    type = 101; //information acc for credit card pulling
                    break;
                case 34:
                    type = 106; //information acc for credit card pulling
                    break;
                case 35:
                    type = 106; //information about account
                    break;
                case 36:
                    type = 17; //"נדרשת כניסה לאתר"
                    break;
                case 37:
                    type = 11; //חשבון לא זמין
                    break;
                case 38:
                    $("#closeOtp").off('click');
                    $("#passOtp").fadeOut();
                    type = 2; //Login Failed -----change me back to 6 when DB is ready
//				type = 6; //otp code not provided due timeout
                    break;
                default:
                    type = null;
                    break;
            }
            if (type === null) {
                all.banks.core.services.numberLoopError = 0;
                resolve(true);
            } else {
                var data = {
                    "AccountNumber": all.banks.generalVariables.AccountNumber,
                    "bankNumber": all.banks.generalVariables.bankNumber,
                    "branchNumber": all.banks.generalVariables.branchNumber,
                    "CardNumber": null,
                    "status": type,
                    "IPAdress": all.banks.spiderConfig.spiderId,
                    "extractDate": all.banks.generalVariables.ExtractDate,
                    "ErrorDesc": text
                }
                all.banks.core.services.numberLoopError++;

                function loopSender() {
                    all.banks.core.services.httpReq(all.banks.spiderConfig.sendToServer + "/dataload/banks/status", 'POST', data, false, true)
                        .then(function (response, state, status) {
                            writeLog("dataload/banks/status, status: " + status.status + ", " + (all.banks.core.services.numberLoopError > 0 ? "attempt no. " + (all.banks.core.services.numberLoopError) : "right away!"));
                            all.banks.core.services.numberLoopError = 0;
                            resolve(response);
                        })
                        .fail(function (error) {
                            writeLog("dataload/banks/status, status: " + error.status + ", attempt no. " + (all.banks.core.services.numberLoopError));
                            if ((error.status == 500 || error.status == 502 || error.status == 406 || error.status == 504) && all.banks.core.services.numberLoopError < 6) {
                                resolve('discard');
                            } else {
                                all.banks.core.services.numberLoopError = 0;
                                loopSender()
                            }
                        });
                }

                loopSender()
            }
        })
    };
    services.logEnqueue = function (type, text) {
//		if (services.logsQueue.length
//				&& services.logsQueue[services.logsQueue.length - 1].data
//				&& services.statusesSentWithPendingReload.includes(
//					services.logsQueue[services.logsQueue.length - 1].data.status)) {
//			return;
//		}

        services.logsQueue.push({
            data: {
                "AccountNumber": all.banks.generalVariables.AccountNumber,
                "bankNumber": all.banks.generalVariables.bankNumber,
                "branchNumber": all.banks.generalVariables.branchNumber,
                "CardNumber": null,
                "status": type,
                "IPAdress": all.banks.spiderConfig.spiderId,
                "extractDate": all.banks.generalVariables.ExtractDate,
                "ErrorDesc": text
            },
            retryCount: 0
        });

        if (!services.logsQueueProcessor) {
            services.logsQueueProcessor = setTimeout(services.logDequeue, 0);
        }
    };
    services.sendLogs = function (param, text) {
        var type;
        switch (param) {
            case 1:
                type = 9;   //start process
                break;
            case 11:
                type = 100;  //pulling currency
                break;
            case 14:
                type = 101; //Start Extracting credit card data
                break;
            case 17:
                type = 103; //Start Extracting Savings Data
                break;
            case 19:
                type = 102; //Start Extracting Due Checks Data
                break;
            case 21:
                type = 104; //Start Extracting Loans Data
                break;
            case 24:
                type = 105; //Start Extracting Stending orders
                break;
            case 5:
                type = 2; //Login Failed
                break;
            case 6:
                type = 4; //Password expired
                break;
            case 7:
                type = 5; //Your password is going to expire
                break;
            case 9:
                type = 1; //General error
                break;
            case 302:
                type = 1; //session_end
                break;
            case 503:
                type = 1; //503
                break;
            case 8:
                type = 3; //Blocked Account
                break;
            case 25:
                type = 0; //Logout
                break;
            case 27:
                type = 7; //Logout
                break;
            case 4:
                type = 8; //poalim logOut
                break;
            case 28:     //poalim send all account from account combo
                type = 100;
                break;
            case 29:
                type = 100;  // send information about pulling checks
                break;
            case 10:
                type = 100; //information about account
                break;
            case 30:
                type = 9; //poalim start
                break;
            case 12:
                type = 100; //information about rows num
                break;
            case 33:
                type = 101; //information acc for credit card pulling
                break;
            case 16:
                type = 101; //information acc for credit card pulling
                break;
            case 34:
                type = 106; //information acc for credit card pulling
                break;
            case 35:
                type = 106; //information about account
                break;
            case 36:
                type = 17; //"נדרשת כניסה לאתר"
                break;
            case 37:
                type = 11; //חשבון לא זמין
                break;
            case 38:
                $("#closeOtp").off('click');
                $("#passOtp").fadeOut();
                type = 2; //Login Failed -----change me back to 6 when DB is ready
//				type = 6; //otp code not provided due timeout
                break;
            default:
                type = null;
                break;
        }
        if (type !== null) {
            services.logEnqueue(type, text);
        }
    };
    services.errorLog = function (err) {
        if (all.banks.accountDetails !== undefined) {
            if (all.banks.accountDetails.bank !== undefined) {
                if (all.banks.accountDetails.bank.BankNumber !== undefined && parseFloat(all.banks.accountDetails.bank.BankNumber) === 54) {
                    all.banks.accounts.bankjerusalem.logout();

                    setTimeout(() => {
                        if (all.banks.accountDetails !== undefined) {
                            if (all.banks.accountDetails.bank !== undefined) {
                                if (all.banks.accountDetails.bank.username !== undefined) {
                                    delete all.banks.accountDetails.bank.username;
                                }
                                if (all.banks.accountDetails.bank.password !== undefined) {
                                    delete all.banks.accountDetails.bank.password;
                                }
                                if (all.banks.accountDetails.bank.autoCode !== undefined) {
                                    delete all.banks.accountDetails.bank.autoCode;
                                }
                                if (all.banks.accountDetails.bank.ExtractDate !== undefined) {
                                    delete all.banks.accountDetails.bank.ExtractDate;
                                }
                            }
                        }

                        var nameSpider = "<b>spiderId: </b>" + all.banks.spiderConfig.spiderId + "<br>" + "<b>sendToServer: </b>" + all.banks.spiderConfig.sendToServerApi + "<br>" + "<b>versionNum: </b>" + pkg.version;
                        if (err.stack) {
                            var stack = "<b>message: </b>" + err.stack;
                            var title = err.message;
                            //var caller_line = err.stack.split("\n")[4];
                            //if (caller_line !== undefined) {
                            //	var index = caller_line.indexOf("at ");
                            //	var clean = "message: " + err.message + ', line: ' + caller_line.slice(index + 2, caller_line.length);
                            //}
                            //else {
                            //	var clean = "message: " + err.message;
                            //}
                        } else {
                            var stack = "<b>message: </b>" + err;
                            var title = "שגיאה כללית";
                        }
                        if (err.stack) {
                            // console.log(9, err, stack)
                            myEmitterLogs(9, err, stack);
                        } else {
                            // console.log(9, err)
                            myEmitterLogs(9, err);
                        }

                        services.removingCookie(false);
                    }, 2000)
                    return;
                }
            }
        }


        if (all.banks.accountDetails !== undefined) {
            if (all.banks.accountDetails.bank !== undefined) {
                if (all.banks.accountDetails.bank.username !== undefined) {
                    delete all.banks.accountDetails.bank.username;
                }
                if (all.banks.accountDetails.bank.password !== undefined) {
                    delete all.banks.accountDetails.bank.password;
                }
                if (all.banks.accountDetails.bank.autoCode !== undefined) {
                    delete all.banks.accountDetails.bank.autoCode;
                }
                if (all.banks.accountDetails.bank.ExtractDate !== undefined) {
                    delete all.banks.accountDetails.bank.ExtractDate;
                }
            }
        }

        var nameSpider = "<b>spiderId: </b>" + all.banks.spiderConfig.spiderId + "<br>" + "<b>sendToServer: </b>" + all.banks.spiderConfig.sendToServerApi + "<br>" + "<b>versionNum: </b>" + pkg.version;
        if (err.stack) {
            var stack = "<b>message: </b>" + err.stack;
            var title = err.message;
            //var caller_line = err.stack.split("\n")[4];
            //if (caller_line !== undefined) {
            //	var index = caller_line.indexOf("at ");
            //	var clean = "message: " + err.message + ', line: ' + caller_line.slice(index + 2, caller_line.length);
            //}
            //else {
            //	var clean = "message: " + err.message;
            //}
        } else {
            var stack = "<b>message: </b>" + err;
            var title = "שגיאה כללית";
        }
        if (err.stack) {
            myEmitterLogs(9, err, stack);
        } else {
            myEmitterLogs(9, err);
        }

        services.removingCookie(false);

        // function sendTfsRestApi(userNames, sender) {
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
        // 					"value": userNames
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
        // 					"value": "<p style='font-size:15px'>" + nameSpider + "<br><b>accountDetails: </b>" + JSON.stringify(all.banks.accountDetails, null, 3) + "<br> " + stack + "</p>"
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
        // 	$.ajax(paramsData)
        // 	.done(function (response, state, status) {
        // 		if (sender) {
        // 			if (err.stack) {
        // 				myEmitterLogs(9, err, stack);
        // 			}
        // 			else {
        // 				myEmitterLogs(9, err);
        // 			}
        // 		}
        // 	})
        // 	.fail(function (error, resErr) {
        // 		if (sender) {
        // 			if (err.stack) {
        // 				myEmitterLogs(9, err, stack);
        // 			}
        // 			else {
        // 				myEmitterLogs(9, err);
        // 			}
        // 		}
        // 	})
        // }
        //
        // sendTfsRestApi("ido aizenshtein <ido@bizibox.biz>");
        // sendTfsRestApi("Semion <semion@bizibox.biz>", true);
    };
    services.logAlertsBanks = function (param, description) {
        var text, infoLog = 'INFO: ', descriptionText = "", errorLog = 'ERROR: ';
        if (description !== undefined) {
            descriptionText = description;
        }
        switch (param) {
            case 1:
                text = infoLog + "--------Start Export Bank number " + parseFloat(all.banks.accountDetails.bank.BankNumber) + "---------" + "\n" + 'Running type: Days to run: ' + all.banks.accountDetails.days + " Checks: " + all.banks.accountDetails.checks + " Credit card: " + all.banks.accountDetails.ccardMonth + " Nilvim: " + all.banks.accountDetails.IND_NILVIM + " Matach: " + all.banks.accountDetails.MATAH_DAY_TO_RUN + " The result will be sent to " + all.banks.spiderConfig.sendToServerApi + "\n" + "token to run: " + all.banks.accountDetails.bank.token.replace(/-/g, '').toUpperCase();
                break;
            case 2:
                text = infoLog + "Bank page login is not load try again ... ";
                break;
            case 3:
                text = infoLog + "Bank page login is load";
                break;
            case 4:
                text = {};
                text.spider = "Logoff hapoalimAsakim";
                text.logClient = "טעינה הסתיימה בהצלחה";
                break;
            case 5:
                text = infoLog + ((descriptionText === "") ? "Login Failed" : descriptionText);
                break;
            case 6:
                text = infoLog + "Password expired";
                break;
            case 7:
                text = infoLog + " ------------------LogOut & Finished All Accounts - Your password is going to expire!!! ---------------";
                break;
            case 8:
                text = infoLog + "Blocked Account";
                break;
            case 9:
                text = errorLog + "General error" + descriptionText;
                break;
            case 10:
                text = infoLog + "Change Acc " + descriptionText;
                break;
            case 11:
                text = infoLog + "Pulls current data ";
                break;
            case 12:
                text = {};
                text.spider = infoLog + "Found " + descriptionText + " records";
                text.logClient = "נטענו " + descriptionText + " פעולות";
                break;
            case 13:
                text = infoLog + "Send current data ";
                break;
            case 14:
                text = {};
                text.spider = infoLog + "Start Extracting credit card data";
                text.logClient = "מושך כרטיסי אשראי";
                break;
            case 15:
                text = infoLog + "Card Number " + descriptionText;
                break;
            case 16:
                text = infoLog + "Send credit card data ";
                break;
            case 17:
                text = infoLog + "Start Extracting Savings Data";
                break;
            case 18:
                text = infoLog + "Send Savings Data";
                break;
            case 19:
                text = infoLog + "Start Extracting Due Checks Data";
                break;
            case 20:
                text = infoLog + "Send Due Checks Data";
                break;
            case 21:
                text = infoLog + "Start Extracting Loans Data";
                break;
            case 22:
                text = infoLog + "Send Loans Data";
                break;
            case 24:
                text = infoLog + (descriptionText || "Start Extracting Stending orders");
                break;
            case 23:
                text = infoLog + "Send Stending orders";
                break;
            case 25:
                text = infoLog
                    + " ------------------ "
                    + (description || 'LogOut & Finished All Accounts')
                    + " ------------------";
                break;
            case 26:
            case 503:
                text = errorLog + "Services error: " + descriptionText;
                break;
            case 27:
                text = infoLog + "No Minikey";
                break;
            case 28:
                text = infoLog + "Poalim Assakim " + descriptionText;
                break;
            case 29:
                text = {};
                text.spider = infoLog + "success pulling checks: " + all.banks.generalVariables.numChecksDrawn + ' ' + "failed pulling checks: " + all.banks.generalVariables.numChecksNotWithdrawn;
                text.logClient = "נמשכו " + all.banks.generalVariables.numChecksDrawn + " שיקים";
                break;
            case 30:
            case 111:
                text = infoLog + "--------Start Export Bank number " + descriptionText;
                break;
            case 31:
                text = infoLog + "go to next page";
                break;
            case 32:
                text = infoLog + "send Service: " + descriptionText;
                break;
            case 33:
                text = infoLog + "Change Acc card pulling: " + descriptionText;
                break;
            case 34:
                text = {};
                text.spider = infoLog + "Start Extracting Matah ";
                text.logClient = "מושך מט\"ח";
                break;
            case 35:
                text = infoLog + "Change Acc Matach" + descriptionText;
                break;
            case 88:
                text = infoLog + "Change Acc card pulling: " + descriptionText;
                break;
            case 36:
                text = "נדרש הסכם שירות";
                break;
            case 37:
                text = {
                    logClient: infoLog + "חשבון לא זמין: " + descriptionText,
                    spider: infoLog + "חשבון לא זמין: " + descriptionText
                };
                break;
            case 38:
                text = "otp code wasn't provided due timeout: " + descriptionText;
                break;
            case 302:
                text = "session_end";
                break;
            default:
                text = "Default case";
                break;
        }
        return text;
    };
    services.loadVarsFromConfig = function () {
        var dfd = jQuery.Deferred();
        //var platform = process.platform;
        //platform = /^win/.test(platform) ? 'win' : /^darwin/.test(platform) ? 'mac' : 'linux' + (process.arch == 'ia32' ? '32' : '64');
        //if (platform == 'win') {
        //	var pathConfig = "spider_config.json";
        //}
        //if (platform == 'mac') {
        //	var pathConfig = "spider_config.json";
        //}
        //if (platform == 'linux') {
        //	var pathConfig = "spider_config.json";
        //}
        var pathConfig = "spider_config.json";
        fs.stat("imageSpider.json", function (error, exist) {
            if (error) {
                fs.readFile(pathConfig, 'utf8', function (err, data) {
                    if (err) {
                        dfd.reject(err);
                    } else {
                        dfd.resolve(data);
                    }
                });
            } else {
                fs.readFile(pathConfig, 'utf8', function (err, data) {
                    if (err) {
                        dfd.reject(err);
                    } else {
                        var isISO = JSON.parse(data);
                        if (!isISO.isISO) {
                            isISO.isISO = true;
                            isISO.sendToServer = "https://dataload.bizibox.biz";
                            exportJson.writeFileWithFolder(pathConfig, isISO, {spaces: 4}, function (err) {
                                if (err) {
                                    console.log('Error writing file');
                                } else {
                                    fs.readFile(pathConfig, 'utf8', function (err, data) {
                                        if (err) {
                                            dfd.reject(err);
                                        } else {
                                            dfd.resolve(data);
                                        }
                                    });
                                }
                            });
                        } else {
                            dfd.resolve(data);
                        }
                    }
                });
            }
        });
        return dfd.promise();
    };
    services.loadTokensFromConfig = function () {
        var dfd = jQuery.Deferred();
        var pathConfig = "tokenList.txt";
        fs.stat(pathConfig, function (error, exist) {
            if (error) {
                fs.readFile(pathConfig, 'utf8', function (err, data) {
                    if (err) {
                        dfd.reject(err);
                    } else {
                        dfd.resolve(data);
                    }
                });
            } else {
                fs.readFile(pathConfig, 'utf8', function (err, data) {
                    if (err) {
                        dfd.reject(err);
                    } else {
                        dfd.resolve(data);
                    }
                });
            }
        });
        return dfd.promise();
    };
    services.loadPoalimAsakim = function (data) {
        var dfd = jQuery.Deferred();
        all.banks.core.services.httpReq(all.banks.spiderConfig.sendToServer + "/dataload/spider_get_params_2", 'POST', data, false, true)
            .then(function (response) {
                dfd.resolve(response);
            })
            .fail(function (error) {
                myEmitterLogs(26, "/dataload/spider_get_params_2, status: " + error.status + "errorText: " + error.responseText);
                dfd.reject(error);
            })
        return dfd.promise();
    };
    services.loadBanksAll = function (data) {
        var dfd = jQuery.Deferred();
        all.banks.core.services.httpReq(all.banks.spiderConfig.sendToServer + "/dataload/gettokenlist_work_json", 'POST', data, false, true)
            .then(function (response) {
                dfd.resolve(response);
            })
            .fail(function (error) {
                if (error.status === 503) {
                    myEmitterLogs(503, "gettokenlist_work_json, status: " + error.status + "errorText: " + error.responseText);
                } else {
                    myEmitterLogs(26, "gettokenlist_work_json, status: " + error.status + "errorText: " + error.responseText);
                }
                dfd.reject(error);
            })
        return dfd.promise();
    };
    services.convertPdfToImg = function (uriPath, host, referer) {
        var dfd = jQuery.Deferred();
        // var options = {
        // 	"uri": uriPath,
        // 	"family": 4,
        // 	"method": "GET",
        // 	"headers": {
        // 		"Connection": "keep-alive",
        // 		"Upgrade-Insecure-Requests": "1",
        // 		"Host": host,
        // 		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
        // 	}
        // }
        // if (cookie !== null) {
        // 	options.headers.Cookie = cookie;
        // }
        // options.headers.Referer = referer;
        // senderReq.sendersServer(options, (error, response, data) => {
        // 	debugger
        // });

        pdfjsLib.getDocument(uriPath).promise
            .then((pdf) => {
                pdf.getPage(1).then((page) => {
                    var scale = 1.5;
                    var viewport = page.getViewport({scale});
                    var canvas = document.createElement("canvas");
                    //var canvas = document.getElementById('the-canvas');
                    var context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    var renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    viewport = null;
                    context = null;
                    page.render(renderContext)
                        .promise
                        .then(function (data) {
                            dfd.resolve(true, canvas);
                            canvas = null;
                            pdf.destroy();
                        })
                        .catch(function () {
                            dfd.reject(false);
                            canvas = null;
                            pdf.destroy();
                        });
                    //var jsPromise = Promise.resolve(page.render(renderContext));
                    //jsPromise.then(function (response) {
                    //	setTimeout(function () {
                    //		dfd.resolve(true, canvas);
                    //	}, 500)
                    //}, function (xhrObj) {
                    //	dfd.reject(false);
                    //});
                });
            });
        return dfd.promise();
    };
    services.reloadPage = function () {
        all.banks.exit = true;
        writeLog("---- reloadPage ----");
        monitorVpn.killVpn(() => {
            clearProxy().then(() => {
                all.banks.statusWorkFromRest = false;
                all.banks.statusWorkUpdate = false;
                if (all.banks.accounts !== undefined) {
                    if (all.banks.accounts.aibank !== undefined) {
                        if (all.banks.accounts.aibank.cookies !== undefined) {
                            delete all.banks.accounts.aibank.cookies;
                        }
                    }
                }
                win.setBadgeLabel("");
                win.setProgressBar(0);
                //all.banks.statusWorkFromRest = false;
                ////window.location.reload(true)
                //nw.Window.get().reload()
                ////all.banks.core.main.loadConfig();
                //tray.remove();
                //tray = null;
                if (all.banks.spiderConfig.spiderId !== 'Ido') {
                    console.clear();
                }
                //myEmitterLogs.removeAllListeners(['event']);
                //process.removeAllListeners(['uncaughtException']);
                all.banks.core.main.timeTosend = 0;
                clearTimeout(all.banks.core.main.TimeOut);
                services.numberLoopError = 0;
                // var logElement = $("#outPut")[0];
                // logElement.innerHTML = "";
                // logElement.scrollTop = logElement.scrollHeight;
                //nw.App.clearCache();
                services.removingCookie(true);
            });
        });
    };
    services.removingCookie = function (param, cb) {
        var win = nw.Window.get();
        win.cookies.getAll({},
            function (cookies) {
                if (cookies && cookies.length) {
                    for (var i = 0; i < cookies.length; i++) {
                        // if(!cookies[i].domain.includes('bizibox')){
                        removeCookie(cookies[i]);
                        // }
                        if (i + 1 == cookies.length) {
                            if (param && all.banks.spiderConfig.spiderId !== 'Ido') {
                                setTimeout(function () {
                                    clearProxy().then(() => {
                                        document.cookie = '';
                                        nw.App.clearCache();
                                        win.reload();
                                    })
                                }, 1500);
                            }
                            if (cb) {
                                cb();
                            }
                        }
                    }
                } else {
                    if (param && all.banks.spiderConfig.spiderId !== 'Ido') {
                        clearProxy().then(() => {
                            document.cookie = '';
                            nw.App.clearCache();
                            win.reload();
                        })
                    }
                    if (cb) {
                        cb();
                    }
                }
            });

        function removeCookie(cookie) {
            var lurl = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
            if (cookie.name !== "lbleumi" && cookie.name !== "lbigudhb") {
                win.cookies.remove({url: lurl, name: cookie.name},
                    function (result) {
                        if (result) {
                            if (!result.name) {
                                result = result[0];
                            }
                            console.log('cookie remove callback: ' + result.name + ' ' + result.url);
                        } else {
                            console.log('cookie removal failed');
                        }
                    });
            }
        }
    };
    services.setMonthOfCards = function (bankNum, ccardMonth, isInput) {
        ccardMonth = parseInt(ccardMonth);
        if (bankNum == 31 || bankNum == 46 || bankNum == 52 || bankNum == 126 || bankNum == 14) {
            if (isInput && ccardMonth > 7) {
                return 7;
            }
            if (!isInput && ccardMonth > 8) {
                return 8;
            }
        } else if (bankNum == 11 || bankNum == 17 || bankNum == 57 || bankNum == 58) {
            if (isInput && ccardMonth > 11) {
                return 11;
            }
            if (!isInput && ccardMonth > 12) {
                return 12;
            }
        } else if (bankNum == 10 || bankNum == 13 || bankNum == 34) {
            if (isInput && ccardMonth > 12) {
                return 12;
            }
            if (!isInput && ccardMonth > 12) {
                return 12;
            }
        } else if ([12, 122, 123, 124, 157, 158].includes(bankNum)) {
            if (ccardMonth > 12) {
                return 12;
            }
        }
//		else if (bankNum == 12) {
//			if (!all.banks.generalVariables.isPoalimAsakim) {
//				if (ccardMonth > 6)
//					return 6;
//			}
//			else {
//				if (ccardMonth > 2)
//					return 2;
//			}
//		}
//		else if (bankNum == 122 || bankNum == 123 || bankNum == 124) {
//			if (ccardMonth > 2)
//				return 2;
//		}
        else if (bankNum == 4) {
            if (isInput && ccardMonth > 1) {
                return 1;
            }
            if (!isInput && ccardMonth > 2) {
                return 2;
            }
        } else if (bankNum == 22 || bankNum == 23 || bankNum == 25) {
            return Math.min(ccardMonth, 25);
//            if (isInput && ccardMonth > 13) {
//                return 13;
//            }
//            if (!isInput && ccardMonth > 14) {
//                return 14;
//            }
        } else if (bankNum == 54) {
            if (ccardMonth > 12)
                return 12;
        } else if (bankNum == 21) {
            if (isInput && ccardMonth > 18) {
                return 18;
            }
            if (!isInput && ccardMonth > 19) {
                return 19;
            }
        } else if (bankNum == 20) {
            return Math.min(ccardMonth, 8);
//            return Math.min(ccardMonth, 5);
        } else if (bankNum == 24) {
            if (isInput && ccardMonth > 18) {
                return 18;
            }
            if (!isInput && ccardMonth > 19) {
                return 19;
            }
        }
        return ccardMonth;
    }
    services.editConfig = function () {
        all.banks.statusWorkFromRest = true;
        all.banks.statusWorkUpdate = true;
        all.banks.core.services.loadVarsFromConfig()
            .then(function (response) {
                all.banks.spiderConfig = JSON.parse(response);
                all.banks.spiderConfig.sendToServerApi = all.banks.spiderConfig.sendToServer;
                $("#spiderId").val(all.banks.spiderConfig.spiderId);
                $("#sendToServer").val(all.banks.spiderConfig.sendToServer);
                $("#time_to_send").val(all.banks.spiderConfig.time_to_send);
                $("#Ppass").val(all.banks.spiderConfig.Ppass);
                $("#Ptarget_id").val(all.banks.spiderConfig.Ptarget_id);
                $("#Ptoken").val(all.banks.spiderConfig.Ptoken);
                $("#timeToChaneIp").val(all.banks.spiderConfig.timeToChaneIp);


                document.getElementById("IsGamaWithout_VPN_PROXY").checked = all.banks.spiderConfig.IsGamaWithout_VPN_PROXY;
                document.getElementById("IsLeumiSilukin").checked = all.banks.spiderConfig.IsLeumiSilukin;
                document.getElementById("isMizrahiJson").checked = all.banks.spiderConfig.isMizrahiJson;
                document.getElementById("Ppoalim").checked = all.banks.spiderConfig.Ppoalim;
                document.getElementById("changeIp").checked = all.banks.spiderConfig.changeIp;

                $("#poalimBizThreadNum").val(all.banks.spiderConfig.poalimBizThreadNum);
                $("#poalimBizCheckThreadNum").val(all.banks.spiderConfig.poalimBizCheckThreadNum);
                $("#numOfAccForRenewLogin").val(all.banks.spiderConfig.numOfAccForRenewLogin);
                $("#numOfAccForRenewLoginOsh").val(all.banks.spiderConfig.numOfAccForRenewLoginOsh);
                $("#numOfAccForRenewLoginCards").val(all.banks.spiderConfig.numOfAccForRenewLoginCards);
                $("#numberOfOperationsCards").val(all.banks.spiderConfig.numberOfOperationsCards);
                $("#numOfAccForRenewLoginMatah").val(all.banks.spiderConfig.numOfAccForRenewLoginMatah);
                $("#numberOfOperationsMatah").val(all.banks.spiderConfig.numberOfOperationsMatah);
                $("#numberOfOperationsNilvim").val(all.banks.spiderConfig.numberOfOperationsNilvim);
                $("#numOfAccForRenewLoginNilvim").val(all.banks.spiderConfig.numOfAccForRenewLoginNilvim);

                document.getElementById("runPoalimAsakimParallel").checked = all.banks.spiderConfig.runPoalimAsakimParallel;
                if (all.banks.spiderConfig.runPoalimAsakimParallel) {
                    all.banks.accounts.poalimAsakimNew.numberOfOperations = parseFloat(all.banks.spiderConfig.poalimBizThreadNum);
                    all.banks.accounts.poalimAsakimNew.numberOfOperationsChecks = parseFloat(all.banks.spiderConfig.poalimBizCheckThreadNum);
                    all.banks.accounts.poalimAsakimNew.numOfAccForRenewLogin = parseFloat(all.banks.spiderConfig.numOfAccForRenewLogin);
                    all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginOsh = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginOsh);
                    all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginCards = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginCards);
                    all.banks.accounts.poalimAsakimNew.numberOfOperationsCards = parseFloat(all.banks.spiderConfig.numberOfOperationsCards);
                    all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginMatah = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginMatah);
                    all.banks.accounts.poalimAsakimNew.numberOfOperationsMatah = parseFloat(all.banks.spiderConfig.numberOfOperationsMatah);
                    all.banks.accounts.poalimAsakimNew.numberOfOperationsNilvim = parseFloat(all.banks.spiderConfig.numberOfOperationsNilvim);
                    all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginNilvim = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginNilvim);
                }
                if ($("#runPoalimAsakimParallel").prop("checked")) {
                    $("#poalimBizThreadNum").prop("disabled", false);
                    $("#poalimBizCheckThreadNum").prop("disabled", false);
                    $("#numOfAccForRenewLogin").prop("disabled", false);
                    $("#numOfAccForRenewLoginOsh").prop("disabled", false);


                    $("#numOfAccForRenewLoginCards").prop("disabled", false);
                    $("#numberOfOperationsCards").prop("disabled", false);
                    $("#numOfAccForRenewLoginMatah").prop("disabled", false);
                    $("#numberOfOperationsMatah").prop("disabled", false);
                    $("#numberOfOperationsNilvim").prop("disabled", false);
                    $("#numOfAccForRenewLoginNilvim").prop("disabled", false);

                } else {
                    $("#poalimBizThreadNum").prop("disabled", true);
                    $("#poalimBizCheckThreadNum").prop("disabled", true);
                    $("#numOfAccForRenewLogin").prop("disabled", true);
                    $("#numOfAccForRenewLoginOsh").prop("disabled", true);


                    $("#numOfAccForRenewLoginCards").prop("disabled", true);
                    $("#numberOfOperationsCards").prop("disabled", true);
                    $("#numOfAccForRenewLoginMatah").prop("disabled", true);
                    $("#numberOfOperationsMatah").prop("disabled", true);
                    $("#numberOfOperationsNilvim").prop("disabled", true);
                    $("#numOfAccForRenewLoginNilvim").prop("disabled", true);

                }
                if ($("#changeIp").prop("checked")) {
                    $("#timeToChaneIp").prop("disabled", false);
                }
                $("#closeEditSend").show();
                $("#configEdit").slideDown("fast");
            })
            .fail(function (error) {
                $("#timeToChaneIp").val("0");
                document.getElementById("IsGamaWithout_VPN_PROXY").checked = false;
                document.getElementById("IsLeumiSilukin").checked = false;
                document.getElementById("isMizrahiJson").checked = false;
                document.getElementById("Ppoalim").checked = false;
                document.getElementById("changeIp").checked = false;
                document.getElementById("sendToServer").value = "https://dataload.bizibox.biz";
                $("#Ptarget_id").val("df3a5b1b-4747-410b-8f4a-86cdd5b3fe10");
                $("#Ptoken").val("df3a5b1b-4747-410b-8f4a-86cdd5b3fe10");
                $("#configEdit").slideDown("fast");
            });

        $("#changeIp").off('change');
        $("#changeIp").on('change', function (e) {
            e.preventDefault();
            if ($(this).prop("checked")) {
                $("#timeToChaneIp").prop("disabled", false);
            } else {
                $("#timeToChaneIp").prop("disabled", true);
            }
        });

        $("#runPoalimAsakimParallel").off('change');
        $("#runPoalimAsakimParallel").on('change', function (e) {
            e.preventDefault();
            if ($(this).prop("checked")) {
                $("#poalimBizThreadNum").prop("disabled", false);
                if ($("#poalimBizThreadNum").val() === '') {
                    $("#poalimBizThreadNum").val('10');
                }
                $("#poalimBizCheckThreadNum").prop("disabled", false);
                if ($("#poalimBizCheckThreadNum").val() === '') {
                    $("#poalimBizCheckThreadNum").val('10');
                }
                $("#numOfAccForRenewLogin").prop("disabled", false);
                $("#numOfAccForRenewLoginOsh").prop("disabled", false);


                $("#numOfAccForRenewLoginCards").prop("disabled", false);
                $("#numberOfOperationsCards").prop("disabled", false);
                $("#numOfAccForRenewLoginMatah").prop("disabled", false);
                $("#numberOfOperationsMatah").prop("disabled", false);
                $("#numberOfOperationsNilvim").prop("disabled", false);
                $("#numOfAccForRenewLoginNilvim").prop("disabled", false);

                if ($("#numOfAccForRenewLogin").val() === '') {
                    $("#numOfAccForRenewLogin").val('10');
                }
                if ($("#numOfAccForRenewLoginOsh").val() === '') {
                    $("#numOfAccForRenewLoginOsh").val('10');
                }

            } else {
                $("#numOfAccForRenewLogin").prop("disabled", true);
                $("#numOfAccForRenewLoginOsh").prop("disabled", true);
                $("#poalimBizThreadNum").prop("disabled", true);
                $("#poalimBizCheckThreadNum").prop("disabled", true);
                $("#numOfAccForRenewLoginCards").prop("disabled", true);
                $("#numberOfOperationsCards").prop("disabled", true);
                $("#numOfAccForRenewLoginMatah").prop("disabled", true);
                $("#numberOfOperationsMatah").prop("disabled", true);
                $("#numberOfOperationsNilvim").prop("disabled", true);
                $("#numOfAccForRenewLoginNilvim").prop("disabled", true);
            }
        });

        $("#configEditSend").off('click');
        $("#configEditSend").on('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('token');
            var spiderId = $("#spiderId").val();
            var sendToServer = $("#sendToServer").val();
            var time_to_send = $("#time_to_send").val();
            var Ppoalim = $("#Ppoalim").prop("checked");
            var isMizrahiJson = $("#isMizrahiJson").prop("checked");
            var IsLeumiSilukin = $("#IsLeumiSilukin").prop("checked");
            var IsGamaWithout_VPN_PROXY = $("#IsGamaWithout_VPN_PROXY").prop("checked");

            var Ppass = $("#Ppass").val();
            var Ptarget_id = $("#Ptarget_id").val();
            var Ptoken = $("#Ptoken").val();
            var changeIp = $("#changeIp").prop("checked");
            var timeToChaneIp = $("#timeToChaneIp").val();
            var poalimBizThreadNum = $("#poalimBizThreadNum").val();

            var numOfAccForRenewLogin = $("#numOfAccForRenewLogin").val();
            var numOfAccForRenewLoginOsh = $("#numOfAccForRenewLoginOsh").val();


            var poalimBizCheckThreadNum = $("#poalimBizCheckThreadNum").val();
            var runPoalimAsakimParallel = $("#runPoalimAsakimParallel").prop("checked");

            var numOfAccForRenewLoginCards = $("#numOfAccForRenewLoginCards").val();
            var numberOfOperationsCards = $("#numberOfOperationsCards").val();
            var numOfAccForRenewLoginMatah = $("#numOfAccForRenewLoginMatah").val();
            var numberOfOperationsMatah = $("#numberOfOperationsMatah").val();
            var numOfAccForRenewLoginNilvim = $("#numOfAccForRenewLoginNilvim").val();
            var numberOfOperationsNilvim = $("#numberOfOperationsNilvim").val();

            if (spiderId == "" || sendToServer == "" || time_to_send == "" || (Ppoalim == true && Ppass == "") || Ptarget_id == "" || Ptoken == "" || (changeIp == true && timeToChaneIp == "") || (all.banks.spiderConfig.runPoalimAsakimParallel && (poalimBizThreadNum === '' || poalimBizCheckThreadNum === '' || numOfAccForRenewLogin === '' || numOfAccForRenewLogin === '0'
                || numOfAccForRenewLoginCards === '' || numOfAccForRenewLoginCards === '0'
                || numOfAccForRenewLoginOsh === '' || numOfAccForRenewLoginOsh === '0'
                || numberOfOperationsCards === '' || numberOfOperationsCards === '0'
                || numOfAccForRenewLoginMatah === '' || numOfAccForRenewLoginMatah === '0'
                || numberOfOperationsMatah === '' || numberOfOperationsMatah === '0'
                || numberOfOperationsNilvim === '' || numberOfOperationsNilvim === '0'
                || numOfAccForRenewLoginNilvim === '' || numOfAccForRenewLoginNilvim === '0'
            ))
            ) {
                alert("אנא מלא את כל השדות החסרים");
            } else {
                var dataJsonConfig = {
                    "spiderId": spiderId,
                    "sendToServer": sendToServer,
                    "time_to_send": time_to_send,
                    "Ppoalim": Ppoalim,
                    "isMizrahiJson": isMizrahiJson,
                    "IsLeumiSilukin": IsLeumiSilukin,
                    "IsGamaWithout_VPN_PROXY": IsGamaWithout_VPN_PROXY,
                    "Ppass": Ppass,
                    "Ptarget_id": Ptarget_id,
                    "Ptoken": Ptoken,
                    "changeIp": changeIp,
                    "timeToChaneIp": timeToChaneIp,
                    "runPoalimAsakimParallel": runPoalimAsakimParallel,
                    "poalimBizThreadNum": poalimBizThreadNum,
                    "poalimBizCheckThreadNum": poalimBizCheckThreadNum,
                    "numOfAccForRenewLogin": numOfAccForRenewLogin,
                    "numOfAccForRenewLoginOsh": numOfAccForRenewLoginOsh,
                    "numOfAccForRenewLoginCards": numOfAccForRenewLoginCards,
                    "numberOfOperationsCards": numberOfOperationsCards,
                    "numOfAccForRenewLoginMatah": numOfAccForRenewLoginMatah,
                    "numberOfOperationsMatah": numberOfOperationsMatah,
                    "numberOfOperationsNilvim": numberOfOperationsNilvim,
                    "numOfAccForRenewLoginNilvim": numOfAccForRenewLoginNilvim
                }
                exportJson.writeFileWithFolder('spider_config.json', dataJsonConfig, {spaces: 4}, function (err) {
                    if (err) {
                        writeLog('Error writing file');
                        setTimeout(function () {
                            services.reloadPage();
                        }, 2000);
                    } else {
                        $("#configEdit").slideUp("fast", function () {
                            console.log('הקובץ נוצר בהצלחה');
                            all.banks.statusWorkFromRest = false;
                            all.banks.statusWorkUpdate = false;
                            services.reloadPage();
                        });
                    }
                });
            }
        });
        $("#closeEditSend").off('click');
        $("#closeEditSend").on('click', function (e) {
            e.preventDefault();
            $("#configEdit").slideUp("fast", function () {
                all.banks.statusWorkFromRest = false;
                all.banks.statusWorkUpdate = false;
//				services.reloadPage();
            });
        });
    };
    services.loadToken = function () {
        all.banks.statusWorkFromRest = true;
        all.banks.statusWorkUpdate = true;
        $("#closeLoad").show();
        $("#senderToken").slideDown("fast");
        if (all.banks.spiderConfig.runPoalimAsakimParallel) {
            // $("#poalimBizThreadNum1").val(parseFloat(all.banks.spiderConfig.poalimBizThreadNum));
            // $("#poalimBizCheckThreadNum1").val(parseFloat(all.banks.spiderConfig.poalimBizCheckThreadNum));
            // $("#numOfAccForRenewLogin1").val(parseFloat(all.banks.spiderConfig.numOfAccForRenewLogin));
            // $("#numOfAccForRenewLoginOsh1").val(parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginOsh));
            // $("#numOfAccForRenewLoginCards1").val(parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginCards));
            // $("#numberOfOperationsCards1").val(parseFloat(all.banks.spiderConfig.numberOfOperationsCards));
            // $("#numOfAccForRenewLoginMatah1").val(parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginMatah));
            // $("#numberOfOperationsMatah1").val(parseFloat(all.banks.spiderConfig.numberOfOperationsMatah));
            // $("#numOfAccForRenewLoginNilvim1").val(parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginNilvim));
        }

        //$("#code").prop("disabled", false);
        //$("#isPoalimAsakim").prop("disabled", true);

        function checkSumMonthOfCard() {
            var token = $("#token").val().replace(/-/g, "").toUpperCase();
            if (token.length == 32 && all.banks.accounts.WEBSITE_TARGET_TYPE_ID !== undefined) {
                var ccardMonthVal = $("#ccardMonth").val();
                if (ccardMonthVal !== 0 && ccardMonthVal !== 1) {
                    var bankNum = parseFloat(all.banks.accounts.WEBSITE_TARGET_TYPE_ID);
                    var valAfter = all.banks.core.services.setMonthOfCards(bankNum, ccardMonthVal, true);
                    $("#ccardMonth").val(valAfter);
                }
            }
        }

        $("#ccardMonth").on("input", checkSumMonthOfCard);

        function getDataByToken() {
            all.banks.accounts.WEBSITE_TARGET_TYPE_ID = undefined;
            var token = $("#token").val().replace(/-/g, "").toUpperCase();
            if (token.length == 32) {
                $(".pNot").hide();
                $("#loader").show();
                $("#senderToken > div.right").fadeIn();
                services.getDataByToken().then(function (info) {
                    if (info.length) {
                        var dataInfo = info[0];
                        for (var a in dataInfo) {
                            if (a === "WEBSITE_TARGET_TYPE_ID") {
                                all.banks.accounts.WEBSITE_TARGET_TYPE_ID = dataInfo[a];
                                const target = all.banks.targets[all.banks.accounts.WEBSITE_TARGET_TYPE_ID];
                                $("#" + a + " > img").attr("src",
                                    target ? "menuFrame/target-icons/" + target.icon : "");
                                $("#" + a + " > span").text(target ? target.name : "");
                            } else if (a === "STATUS") {
                                $("#" + a + " > span").text(services.getStatus(dataInfo[a]));
                            } else if (a === "IND_CHECKS_TO_S3") {
                                all.banks.accounts.IND_CHECKS_TO_S3 = dataInfo[a];
                                $("#" + a + " > span").text(dataInfo[a] === 1 ? 'כן' : 'לא');
                            } else {
                                $("#" + a + " > span").text(dataInfo[a]);
                            }
                        }
                        if (dataInfo.STATUS !== 2 && dataInfo.STATUS !== 3) {
                            $("#WRNG_PSWRD_DATE, #WRNG_PSWRD_TRIAL_COUNT").hide();
                        } else {
                            $("#WRNG_PSWRD_DATE, #WRNG_PSWRD_TRIAL_COUNT").show();
                        }

                        if (all.banks.spiderConfig.spiderId !== 'Ido') {
                            $("#sendLoad").prop('disabled', [9, 10, 123, 100, 101, 102, 103, 104, 105, 106].includes(dataInfo.STATUS));
                        }

                        checkSumMonthOfCard();
                        $("#loader").hide();
                        $(".dataBottom > ul#infoUl").fadeIn();


                        const shouldUseOTPProcessing = [12, 122].includes(all.banks.accounts.WEBSITE_TARGET_TYPE_ID)
                            && (dataInfo["OTP_DATE_CREATED"] || dataInfo["OTP_DATE_START"] || dataInfo["OTP_CELL"]);
                        $("#isPoalimAsakim").prop('checked', !shouldUseOTPProcessing).click();
                        setTimeout(() => {
                            const otpFlag = $("#isOtp");
                            if (shouldUseOTPProcessing !== otpFlag.prop('checked')) {
                                if (shouldUseOTPProcessing) {
                                    otpFlag.prop('checked', false).click();
                                } else {
                                    otpFlag.prop('checked', false);
                                }
                            }
                        }, 100);

                        const fibiFamily = [31, 46, 52, 126, 14].includes(all.banks.accounts.WEBSITE_TARGET_TYPE_ID);
                        if (fibiFamily) {
                            $("#branch").prop("disabled", false);
                            $("#account").prop("disabled", false);
                            $("#subAccount").prop("disabled", false);
                        } else if (!shouldUseOTPProcessing) {
                            $("#branch").prop("disabled", true);
                            $("#account").prop("disabled", true);
                            $("#subAccount").prop("disabled", true);
                        }
                    } else {
                        $(".dataBottom > ul#infoUl").hide();
                        $("#loader").hide();
                        $(".pNot").show();
                    }
                }).fail(function () {
                    //getDataByToken();
                });
            }
        }

//        $("#info").on("click", getDataByToken);
//        $("#token").on("input", getDataByToken);
//        $("#recurring").on("click", getDataByToken);

//        $("#info, #accs, #history, #recurring").on('click', rightNavActiveReload);
        $("#recurring").off('click', rightNavActiveReload);
        $("#recurring").on('click', rightNavActiveReload);
        $("#token").off('input', rightNavActiveReload);
        $("#token").on('input', rightNavActiveReload);

        function rightNavActiveReload() {
            const activeId = $(".right nav > div.active").attr("id");
            switch (activeId) {
                case 'info':
                    getDataByToken();
                    break;
                case 'accs':
                    getAccountsByToken();
                    break;
                case 'history':
                    getHistoryByToken();
                    break;

                default:
                    break;
            }
        }

        async function getAccountsByToken() {
            $("#accsUl").empty();
            var token = $("#token").val().replace(/-/g, "").toUpperCase();
            if (token.length === 32) {
                $("#loader").show();
                try {
                    const data = await all.banks.core.services.httpReq(
                        "https://dataload.bizibox.biz/ang/protected/get_accounts_4token",
//			all.banks.spiderConfig.sendToServer + "/ang/protected/get_accounts_4token",
                        'POST', {
                            token_id: $("#token").val()
                        }, false, true);

                    $.each(data, (i, item) => {
                        $("<li>").append(
                            $("<span class='acc-type'>").text(!!item.BANK_SNIF_ID ? "חשבון:" : "כרטיס:"),
                            $("<span class='acc-name'>").text((!!item.BANK_SNIF_ID ? item.BANK_SNIF_ID + "-" : '') + item.ID_NUMBER),
                            $("<span class='acc-last-update' title='תאריך עדכון אחרון'>").text(item.BALANCE_LAST_UPDATED_DATE),
                            $("<span class='acc-is-deleted'>").text(item.IND_DELETED === 1 ? 'נמחק' : '')
                        ).appendTo("#accsUl");
                    });
                } catch (e) {
                    console.error(e);
                } finally {
                    $("#loader").hide();
                }
            }
        };

        async function getHistoryByToken() {
            $("#historyUl").empty();
            var token = $("#token").val().replace(/-/g, "").toUpperCase();
            if (token.length === 32) {
                try {
                    const data = await all.banks.core.services.httpReq(
                        "https://dataload.bizibox.biz/ang/protected/get_token_hist",
//			all.banks.spiderConfig.sendToServer + "/ang/protected/get_token_hist",
                        'POST', {
                            token_id: $("#token").val()
                        }, false, true);

                    $.each(data, (i, item) => {
                        $("<li>").append(
                            $("<span>").text(item.ERRORDESC)
                        ).appendTo("#historyUl");
                    });
                } catch (e) {
                    console.error(e);
                } finally {
                    $("#loader").hide();
                }
            }
        };

        $(".right nav > div").off('click');
        $(".right nav > div").on('click', function (e) {
            e.preventDefault();
            $("#loader").show();
            $(".right nav > div").not($(this)).removeClass("active");
            $(this).addClass("active");
            var id = $(this).attr("id") + "Ul";
            $(".dataBottom > ul").not("#" + id).hide();
            $(".dataBottom > ul#" + id).show();
            rightNavActiveReload();
        });

        $("#tableOfMonth").off('click');
        $("#tableOfMonth").on('click', function (e) {
            e.preventDefault();
            $("#tableOfMonthPop").fadeIn();
        });

        $("#tableOfMonthPop i").off('click');
        $("#tableOfMonthPop i").on('click', function (e) {
            e.preventDefault();
            $("#tableOfMonthPop").fadeOut();
        })


        $("#sendLoad").off('click');
        $("#sendLoad").on('click', function (e) {
            e.preventDefault();
            $(this).off('click');

            var token = $("#token").val().replace(/-/g, "").toUpperCase();
            var days = $("#days").val();
            var optionOfDate = $("#dateField input[name='dates']:checked").val();
            var from = $("#from").val();
            var until = $("#until").val();

            // var daysMatah = $("#daysMatah").val();
            // var optionOfDateMatah = $("#dateFieldMatah input[name='datesMatah']:checked").val();
            // var fromMatah = $("#fromMatah").val();
            // var untilMatah = $("#untilMatah").val();

            var branch = $("#branch").val();
            var account = $("#account").val();
            var checks = $("#checks").prop('checked');
            var isCategory = $("#isCategory").prop('checked');
            var ccardMonth = $("#ccardMonth").val();
            var IND_NILVIM = $("#IND_NILVIM").prop('checked');
            var isPoalimAsakim = $("#isPoalimAsakim").prop('checked');
            var isOtp = $("#isOtp").prop('checked');
            all.banks.generalVariables.isOtp = isOtp;
            all.banks.generalVariables.otpChannel = $("input:radio[name ='otpChannel']:checked").val();
            all.banks.openBankPage = $("#openBankPage").prop('checked');
            // all.banks.IsNewDateBankHadoar = $("#IsNewDateBankHadoar").prop('checked');

//			var isAsakim = $("#isAsakim").prop('checked');
//			var code = $("#code").val();
            if ((!isPoalimAsakim || (isPoalimAsakim && isOtp)) && (token !== "" && token.length == 32 && (all.banks.openBankPage || optionOfDate == "false" || (optionOfDate == "true" && from !== "" && until !== "")))) {
                $("#token").removeClass("red");
                all.banks.core.services.loadFromToken(token)
                    .then(function (response) {
                        all.banks.statusWorkFromRest = true;
                        all.banks.statusWorkUpdate = false;
                        var res = response[token];
                        if (res !== undefined) {
                            all.banks.core.services.loadVarsFromConfig()
                                .then(function (response) {
                                    $("#senderToken").fadeOut();
                                    all.banks.spiderConfig = JSON.parse(response);
                                    all.banks.spiderConfig.sendToServerApi = all.banks.spiderConfig.sendToServer;
                                    all.banks.accountDetails.checks = checks;
                                    all.banks.accountDetails.isCategory = isCategory;

                                    if (!all.banks.openBankPage) {
                                        if (optionOfDate == "false") {
                                            all.banks.accountDetails.days = parseFloat(days);
//									if ((res.website_target_id == 158 || res.website_target_id == 157) && all.banks.accountDetails.days > 179) {
//										all.banks.accountDetails.days = 179;
//									}
                                            all.banks.accountDetails.dateFrom = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - all.banks.accountDetails.days);
                                            all.banks.accountDetails.dateTo = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                                        } else {
                                            all.banks.accountDetails.dateFrom = new Date(from);
                                            all.banks.accountDetails.dateTo = new Date(until);

                                            function matchBetweenDates() {
                                                var firstDate = new Date(all.banks.accountDetails.dateFrom);
                                                var secondDate = new Date(all.banks.accountDetails.dateTo);
                                                var oneDay = 24 * 60 * 60 * 1000;
                                                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
                                                return diffDays;
                                            }

                                            all.banks.accountDetails.days = matchBetweenDates();
                                        }
                                        all.banks.accountDetails.IND_NILVIM = (IND_NILVIM) ? 1 : 0;
                                        all.banks.accountDetails.ccardMonth = ccardMonth;

                                        var daysMatah = $("#daysMatah").val();
                                        var optionOfDateMatah = $("#dateFieldMatah input[name='datesMatah']:checked").val();
                                        var fromMatah = $("#fromMatah").val();
                                        var untilMatah = $("#untilMatah").val();
                                        if (optionOfDateMatah == "false") {
                                            all.banks.accountDetails.daysMatah = parseFloat(daysMatah);
                                            all.banks.accountDetails.dateFromMatah = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - all.banks.accountDetails.daysMatah);
                                            all.banks.accountDetails.dateToMatah = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                                        } else {
                                            all.banks.accountDetails.dateFromMatah = new Date(fromMatah);
                                            all.banks.accountDetails.dateToMatah = new Date(untilMatah);

                                            function matchBetweenDates() {
                                                var firstDate = new Date(all.banks.accountDetails.dateFromMatah);
                                                var secondDate = new Date(all.banks.accountDetails.dateToMatah);
                                                var oneDay = 24 * 60 * 60 * 1000;
                                                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
                                                return diffDays;
                                            }

                                            all.banks.accountDetails.daysMatah = matchBetweenDates();
                                        }
                                        all.banks.accountDetails.MATAH_DAY_TO_RUN = all.banks.accountDetails.daysMatah;
                                    }
                                    if (res.AccountsToIgnore !== undefined && res.AccountsToIgnore !== null && res.AccountsToIgnore.deleted_account_ids !== undefined && res.AccountsToIgnore.deleted_account_ids.length) {
                                        all.banks.accountDetails.deleted_account_ids = res.AccountsToIgnore.deleted_account_ids;
                                    } else {
                                        all.banks.accountDetails.deleted_account_ids = [];
                                    }
                                    all.banks.accountDetails.bank = {
                                        BankNumber: res.website_target_id,
                                        targetId: plainify(res.target_id),
                                        token: token,
                                        username: plainify(res.target_username),
                                        password: plainify(res.target_password),
                                        autoCode: plainify(res.target_mezahe), // isAsakim ? code : plainify(res.target_mezahe),
                                        ExtractDate: new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2)
                                    };
                                    all.banks.accountDetails.ccardMonth = parseFloat(all.banks.accountDetails.ccardMonth);
                                    if (all.banks.accountDetails.ccardMonth !== 0 && all.banks.accountDetails.ccardMonth !== 1) {
                                        var bankNum = parseFloat(all.banks.accountDetails.bank.BankNumber);
                                        if (all.banks.accountDetails.ccardMonth !== 0 && all.banks.accountDetails.ccardMonth !== 1) {
                                            var bankNum = parseFloat(all.banks.accountDetails.bank.BankNumber);
                                            all.banks.accountDetails.ccardMonth = all.banks.core.services.setMonthOfCards(bankNum, all.banks.accountDetails.ccardMonth);
                                        }
                                    } else if (all.banks.accountDetails.ccardMonth == 1) {
                                        all.banks.accountDetails.ccardMonth = 3;
                                    }
                                    if (isPoalimAsakim && isOtp) {
                                        all.banks.bankPoalimAsakimManual = true;
                                        if (account !== "" && branch !== "" && !all.banks.openBankPage) {
                                            all.banks.accountDetails.bank.arrDDAll = [{
                                                "BANK_SNIF_ACCOUNT_KEY": account + "-" + branch,
                                                "BITWISE": 0,
                                                "TRANS_DAY_TO_RUN": 0,
                                                "CHECKPIC_DAYS_TO_RUN": (checks) ? 1 : 0,
                                                "IND_CCARD_DATA": (ccardMonth > 0) ? all.banks.accountDetails.ccardMonth : 0,
                                                "IND_NILVIM": (IND_NILVIM) ? 1 : 0,
                                                "MATAH_DAY_TO_RUN": 0,
                                                "DATE_TILL": null
                                            }];
                                        }
                                        if (account == "" && branch == "" && !all.banks.openBankPage) {
                                            all.banks.accountDetails.bank.arrDDAll = [{
                                                "BANK_SNIF_ACCOUNT_KEY": null,
                                                "BITWISE": 0,
                                                "TRANS_DAY_TO_RUN": 0,
                                                "CHECKPIC_DAYS_TO_RUN": (checks) ? 1 : 0,
                                                "IND_CCARD_DATA": (ccardMonth > 0) ? all.banks.accountDetails.ccardMonth : 0,
                                                "IND_NILVIM": (IND_NILVIM) ? 1 : 0,
                                                "MATAH_DAY_TO_RUN": 0,
                                                "DATE_TILL": null
                                            }];
                                        }

                                        // all.banks.accounts.poalimAsakimNew.numberOfOperations = parseFloat($("#poalimBizThreadNum1").val());
                                        // all.banks.accounts.poalimAsakimNew.numberOfOperationsChecks = parseFloat($("#poalimBizCheckThreadNum1").val());
                                        // all.banks.accounts.poalimAsakimNew.numOfAccForRenewLogin = parseFloat($("#numOfAccForRenewLogin1").val());
                                        // all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginOsh = parseFloat($("#numOfAccForRenewLoginOsh1").val());
                                        // all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginCards = parseFloat($("#numOfAccForRenewLoginCards1").val());
                                        // all.banks.accounts.poalimAsakimNew.numberOfOperationsCards = parseFloat($("#numberOfOperationsCards1").val());
                                        // all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginMatah = parseFloat($("#numOfAccForRenewLoginMatah1").val());
                                        // all.banks.accounts.poalimAsakimNew.numberOfOperationsMatah = parseFloat($("#numberOfOperationsMatah1").val());
                                        // all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginNilvim = parseFloat($("#numOfAccForRenewLoginNilvim1").val());
                                        all.banks.accounts.poalimAsakimNew.numberOfOperations = parseFloat(all.banks.spiderConfig.poalimBizThreadNum);
                                        all.banks.accounts.poalimAsakimNew.numberOfOperationsChecks = parseFloat(all.banks.spiderConfig.poalimBizCheckThreadNum);
                                        all.banks.accounts.poalimAsakimNew.numOfAccForRenewLogin = parseFloat(all.banks.spiderConfig.numOfAccForRenewLogin);
                                        all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginOsh = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginOsh);
                                        all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginCards = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginCards);
                                        all.banks.accounts.poalimAsakimNew.numberOfOperationsCards = parseFloat(all.banks.spiderConfig.numberOfOperationsCards);
                                        all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginMatah = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginMatah);
                                        all.banks.accounts.poalimAsakimNew.numberOfOperationsMatah = parseFloat(all.banks.spiderConfig.numberOfOperationsMatah);
                                        all.banks.accounts.poalimAsakimNew.numberOfOperationsNilvim = parseFloat(all.banks.spiderConfig.numberOfOperationsNilvim);
                                        all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginNilvim = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginNilvim);
                                        if (!all.banks.openBankPage) {
                                            if (optionOfDate == "false") {
                                                all.banks.accountDetails.dateFrom = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - parseFloat(days));
                                                all.banks.accountDetails.dateTo = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                                                if (parseFloat(days) > 0) {
                                                    all.banks.accountDetails.bank.arrDDAll[0].TRANS_DAY_TO_RUN = parseFloat(days);
                                                }
                                            } else {
                                                all.banks.accountDetails.dateFrom = new Date(from);
                                                all.banks.accountDetails.dateTo = new Date(until);
                                            }


                                            var datebacksleshTo = ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateTo.getFullYear();
                                            var datebackslesh = ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateFrom.getFullYear();
                                            all.banks.accountDetails.bank.arrDDAll[0].datebackslesh = datebackslesh;
                                            all.banks.accountDetails.bank.arrDDAll[0].datebacksleshTo = datebacksleshTo;

                                            var daysMatah = $("#daysMatah").val();
                                            var optionOfDateMatah = $("#dateFieldMatah input[name='datesMatah']:checked").val();
                                            var fromMatah = $("#fromMatah").val();
                                            var untilMatah = $("#untilMatah").val();

                                            if (optionOfDateMatah == "false") {
                                                all.banks.accountDetails.dateFromMatah = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - parseFloat(daysMatah));
                                                all.banks.accountDetails.dateToMatah = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                                                if (parseFloat(daysMatah) > 0) {
                                                    all.banks.accountDetails.bank.arrDDAll[0].MATAH_DAY_TO_RUN = parseFloat(daysMatah);
                                                }
                                            } else {
                                                all.banks.accountDetails.dateFromMatah = new Date(fromMatah);
                                                all.banks.accountDetails.dateToMatah = new Date(untilMatah);
                                                all.banks.accountDetails.bank.arrDDAll[0].MATAH_DAY_TO_RUN = 1;
                                            }

                                            var datebacksleshToMatah = ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateToMatah.getFullYear();
                                            var datebacksleshMatah = ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateFromMatah.getFullYear();
                                            all.banks.accountDetails.bank.arrDDAll[0].datebacksleshMatah = datebacksleshMatah;
                                            all.banks.accountDetails.bank.arrDDAll[0].datebacksleshToMatah = datebacksleshToMatah;
                                        }
                                        all.banks.generalVariables.isPoalimAsakim = true;
                                        switch (all.banks.generalVariables.otpChannel) {
                                            case 'VOICE':
                                                all.banks.generalVariables.bankNumber = 123;
                                                all.banks.accountDetails.bank.BankNumber = 123;
                                                break;

                                            default:
                                                all.banks.generalVariables.bankNumber = 122;
                                                all.banks.accountDetails.bank.BankNumber = 122;
                                                break;
                                        }
//								all.banks.generalVariables.bankNumber = 122;
//								all.banks.accountDetails.bank.BankNumber = 122;
                                    } else {
                                        all.banks.generalVariables.bankNumber = all.banks.accountDetails.bank.BankNumber;
                                        all.banks.generalVariables.isPoalimAsakim = false;
                                    }
                                    all.banks.generalVariables.AccountNumber = all.banks.accountDetails.bank.targetId;
                                    all.banks.generalVariables.branchNumber = all.banks.accountDetails.bank.token;
                                    all.banks.generalVariables.ExtractDate = all.banks.accountDetails.bank.ExtractDate;
                                    all.banks.core.main.goToBank();
                                })
                                .fail(function (error) {
                                    all.banks.core.services.editConfig();
                                })
                        } else {
                            alert("Load token from service is fail, Try again.");
                        }
                    })
                    .fail(function (error) {
                        alert("Load token from service is fail, Try again.");
                    });
            } else if (isPoalimAsakim && !isOtp) {
                $("#account").removeClass("red");
                $("#branch").removeClass("red");
                $(".loader").show();
                all.banks.core.services.loadVarsFromConfig()
                    .then(function (response) {
                        all.banks.statusWorkFromRest = true;
                        all.banks.statusWorkUpdate = false;
                        $("#senderToken").fadeOut();
                        all.banks.bankPoalimAsakimManual = true;
                        //all.banks.accountDetails.run_type = 999;
                        all.banks.spiderConfig = JSON.parse(response);
                        all.banks.spiderConfig.sendToServerApi = all.banks.spiderConfig.sendToServer;
                        var ifarmeSetInterval = setInterval(function () {
                            if (typeof (window.frames[0].callCheckIsMnkReady) == "function") {
                                clearInterval(ifarmeSetInterval);
                                window.frames[0].callCheckIsMnkReady(function (result) {
                                    if (result == "0") {
                                        all.banks.accountDetails.bank = {
                                            BankNumber: 12,
                                            targetId: all.banks.spiderConfig.Ptarget_id,
                                            token: all.banks.spiderConfig.Ptoken,
                                            password: all.banks.spiderConfig.Ppass,
                                            ExtractDate: new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2)
                                        };
                                        if (account !== "" && branch !== "" && !all.banks.openBankPage) {
                                            all.banks.accountDetails.bank.arrDDAll = [{
                                                "BANK_SNIF_ACCOUNT_KEY": account + "-" + branch,
                                                "BITWISE": 0,
                                                "TRANS_DAY_TO_RUN": 0,
                                                "CHECKPIC_DAYS_TO_RUN": (checks) ? 1 : 0,
                                                "IND_CCARD_DATA": (ccardMonth > 0) ? 1 : 0,
                                                "IND_NILVIM": (IND_NILVIM) ? 1 : 0,
                                                "MATAH_DAY_TO_RUN": 0,
                                                "DATE_TILL": null
                                            }];
                                        }
                                        if (account == "" && branch == "" && !all.banks.openBankPage) {
                                            all.banks.accountDetails.bank.arrDDAll = [{
                                                "BANK_SNIF_ACCOUNT_KEY": null,
                                                "BITWISE": 0,
                                                "TRANS_DAY_TO_RUN": 0,
                                                "CHECKPIC_DAYS_TO_RUN": (checks) ? 1 : 0,
                                                "IND_CCARD_DATA": (ccardMonth) ? 1 : 0,
                                                "IND_NILVIM": (IND_NILVIM) ? 1 : 0,
                                                "MATAH_DAY_TO_RUN": 0,
                                                "DATE_TILL": null
                                            }];
                                        }
                                        if (!all.banks.openBankPage) {
                                            if (optionOfDate == "false") {
                                                all.banks.accountDetails.dateFrom = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - parseFloat(days));
                                                all.banks.accountDetails.dateTo = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                                                if (parseFloat(days) > 0) {
                                                    all.banks.accountDetails.bank.arrDDAll[0].TRANS_DAY_TO_RUN = parseFloat(days);
                                                }
                                            } else {
                                                all.banks.accountDetails.dateFrom = new Date(from);
                                                all.banks.accountDetails.dateTo = new Date(until);
                                            }
                                            var datebacksleshTo = ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateTo.getFullYear();
                                            var datebackslesh = ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateFrom.getFullYear();
                                            all.banks.accountDetails.bank.arrDDAll[0].datebackslesh = datebackslesh;
                                            all.banks.accountDetails.bank.arrDDAll[0].datebacksleshTo = datebacksleshTo;

                                            var daysMatah = $("#daysMatah").val();
                                            var optionOfDateMatah = $("#dateFieldMatah input[name='datesMatah']:checked").val();
                                            var fromMatah = $("#fromMatah").val();
                                            var untilMatah = $("#untilMatah").val();

                                            if (optionOfDateMatah == "false") {
                                                all.banks.accountDetails.dateFromMatah = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - parseFloat(daysMatah));
                                                all.banks.accountDetails.dateToMatah = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                                                if (parseFloat(daysMatah) > 0) {
                                                    all.banks.accountDetails.bank.arrDDAll[0].MATAH_DAY_TO_RUN = parseFloat(daysMatah);
                                                }
                                            } else {
                                                all.banks.accountDetails.dateFromMatah = new Date(fromMatah);
                                                all.banks.accountDetails.dateToMatah = new Date(untilMatah);
                                                all.banks.accountDetails.bank.arrDDAll[0].MATAH_DAY_TO_RUN = 1;
                                            }

                                            var datebacksleshToMatah = ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateToMatah.getFullYear();
                                            var datebacksleshMatah = ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateFromMatah.getFullYear();
                                            all.banks.accountDetails.bank.arrDDAll[0].datebacksleshMatah = datebacksleshMatah;
                                            all.banks.accountDetails.bank.arrDDAll[0].datebacksleshToMatah = datebacksleshToMatah;
                                        }
                                        all.banks.generalVariables.AccountNumber = all.banks.spiderConfig.Ptarget_id;
                                        all.banks.generalVariables.bankNumber = 12;
                                        all.banks.generalVariables.branchNumber = all.banks.spiderConfig.Ptoken;
                                        all.banks.generalVariables.ExtractDate = all.banks.accountDetails.bank.ExtractDate;
                                        all.banks.generalVariables.isPoalimAsakim = true;
                                        all.banks.core.main.goToBank();
                                    } else {
                                        writeLog("Minikey is not connect");
                                        setTimeout(function () {
                                            services.reloadPage();
                                        }, 2000);
                                    }
                                });
                            } else {
                                $('#filecontainerlogin').attr('src', 'https://biz.bankhapoalim.co.il/cgi-bin/poalwwwc');
                            }
                        }, 5000);
                    })
                    .fail(function (error) {
                        all.banks.core.services.editConfig();
                    })
            } else {
                if (isPoalimAsakim) {
                    if (account == "" && branch == "") {
                        $("#account").addClass("red");
                        $("#branch").addClass("red");
                    } else if (account == "") {
                        $("#account").addClass("red");
                    } else {
                        $("#branch").addClass("red");
                    }
                } else {
                    $("#token").addClass("red");
                }
            }
        });

        $("#closeLoad").off('click');
        $("#closeLoad").on('click', function (e) {
            e.preventDefault();
            all.banks.statusWorkFromRest = false;
            all.banks.statusWorkUpdate = false;
            $("#senderToken").slideUp("fast");
//			services.reloadPage();
        });

        $("#openBankPage").off('change');
        $("#openBankPage").on('change', function (e) {
            e.preventDefault();
            if ($(this).prop("checked")) {
                $("#days").prop("disabled", true);
                $("#checks").prop("disabled", true);
                $("#ccardMonth").prop("disabled", true);
                $("#branch").prop("disabled", true);
                $("#account").prop("disabled", true);
                $("#subAccount").prop("disabled", true);
                $("#IND_NILVIM").prop("disabled", true);
                $("#from, #until").prop("disabled", true);
                $("#datesFalse").prop("disabled", true);
                $("#datesTrue").prop("disabled", true);

                $("#fromMatah, #untilMatah, #daysMatah").prop("disabled", true);
                $("#datesFalseMatah").prop("disabled", true);
                $("#datesTrueMatah").prop("disabled", true);
            } else {
                $("#days").prop("disabled", false);
                $("#checks").prop("disabled", false);
                $("#branch").prop("disabled", false);
                $("#account").prop("disabled", false);
                $("#subAccount").prop("disabled", false);

                $("#ccardMonth").prop("disabled", false);
                $("#IND_NILVIM").prop("disabled", false);
                $("#from, #until").prop("disabled", false);
                $("#datesFalse").prop("disabled", false);
                $("#datesTrue").prop("disabled", false);

                $("#fromMatah, #untilMatah, #daysMatah").prop("disabled", false);
                $("#datesFalseMatah").prop("disabled", false);
                $("#datesTrueMatah").prop("disabled", false);
            }
        });


        // $("#IsNewDateBankHadoar").off('change');
        // $("#IsNewDateBankHadoar").on('change', function (e) {
        //     e.preventDefault();
        //     all.banks.IsNewDateBankHadoar = $(this).prop("checked");
        // });


//		$("#isAsakim").off('change');
//		$("#isAsakim").on('change', function (e) {
//			e.preventDefault();
//			if ($(this).prop("checked")) {
//				$("#code").prop("disabled", false);
//				$("#isPoalimAsakim").prop("disabled", true);
//			}
//			else {
//				$("#code").prop("disabled", true);
//				$("#isPoalimAsakim").prop("disabled", false);
//			}
//		});

        $("#isPoalimAsakim").off('change');
        $("#isPoalimAsakim").on('change', function (e) {
            e.preventDefault();
            if ($(this).prop("checked")) {
                $("#token").prop("disabled", true);
//				$("#isAsakim").prop("disabled", true);
                $("#branch").prop("disabled", false);
                $("#account").prop("disabled", false);
                $("#isOtp").prop("disabled", false);
                $(".isOtp").addClass("enabled");

                if ($("#openBankPage").prop("checked")) {
                    $("#branch").prop("disabled", true);
                    $("#account").prop("disabled", true);
                }
            } else {
                $("#branch").prop("disabled", true);
                $("#account").prop("disabled", true);
                $("#isOtp").prop("disabled", true);
                $(".isOtp").removeClass("enabled");

                $("#token").prop("disabled", false);
//				$("#isAsakim").prop("disabled", false);
            }
        });

        $("#isOtp").off('change');
        $("#isOtp").on('change', function (e) {
            e.preventDefault();
            if ($(this).prop("checked")) {
                $(".otpChannelSelectors").show();
            } else {
                $(".otpChannelSelectors").hide();
            }
        });

        $("#fromMatah, #untilMatah").off('click');
        $("#fromMatah, #untilMatah").on('click', function (e) {
            $("#datesFalseMatah").prop("checked", false);
            $("#datesTrueMatah").prop("checked", true);
        });

        $("#daysMatah").off('click');
        $("#daysMatah").on('click', function (e) {
            $("#datesFalseMatah").prop("checked", true);
            $("#datesTrueMatah").prop("checked", false);
        });

        $("#from, #until").off('click');
        $("#from, #until").on('click', function (e) {
            $("#datesFalse").prop("checked", false);
            $("#datesTrue").prop("checked", true);
        });

        $("#days").off('click');
        $("#days").on('click', function (e) {
            $("#datesFalse").prop("checked", true);
            $("#datesTrue").prop("checked", false);
        });
    };
    services.testVersion = function () {
        var checkSwitch = $(".checkSwitch").prop("checked");
        fs.readFile("package.json", 'utf8', function (err, data) {
            if (!err) {
                var contentJson = JSON.parse(data);
                if (checkSwitch) {
                    contentJson.versionTest = true;
                    exportJson.writeFileWithFolder('package.json', contentJson, {spaces: 4}, function (err) {
                        if (!err) {
                            services.reloadPage();
                        }
                    });
                } else {
                    contentJson.versionTest = false;
                    exportJson.writeFileWithFolder('package.json', contentJson, {spaces: 4}, function (err) {
                        if (!err) {
                            services.reloadPage();
                        }
                    });
                }
            }
        });
    };
    services.getTypeCurrencyAll = function (text, isMatah) {
        var type = 1;
        if (isMatah) {
            type = 99;
        }
        if (text !== undefined && typeof (text) == "string") {
            text = text.trim();
            if (text.length > 0) {
                if (text.indexOf("€") !== -1) {
                    type = 11;
                } else {
                    for (let i = 0; i < all.banks.generalVariables.typeCurrency.length; i++) {
                        const v = all.banks.generalVariables.typeCurrency[i];
                        var dataTypes = v.CURRENCY_SIGN.split(";").filter(function (e) {
                            return e
                        });
                        if (dataTypes.length == 1) {
                            if (text.indexOf(dataTypes[0].trim()) !== -1) {
                                type = v.CURRENCY_ID;
                                if (text === dataTypes[0].trim()) {
                                    return type;
                                }
                            }
                        } else {
                            for (let i1 = 0; i1 < dataTypes.length; i1++) {
                                const types = dataTypes[i1];
                                if (text.indexOf(types.trim()) !== -1) {
                                    type = v.CURRENCY_ID;
                                }
                                if (text === types.trim()) {
                                    return type;
                                }
                            }
                        }
                    }
                }
            }
        }
        return type;
    };
    services.getTypeCard = function (text, dflt) {
        const dfltN = Number(dflt);
        let type = dfltN > 0 ? dfltN : 30;

        if (!text) {
            return type;
        }

        if (
//            (text.indexOf("לאומי") !== -1 && text.indexOf("ויזה") !== -1)
            (text.indexOf("מקס") !== -1 && text.indexOf("ויזה") !== -1)
            ||
            (text.indexOf("לאומי קארד") !== -1)
            ||
            (text.indexOf("לאומיקארד") !== -1)
        ) {
            type = 24;
        } else if (
            (text.indexOf("ויזה כאל זהב") !== -1)
            ||
            (text.indexOf("ויזה") !== -1)
            ||
            (text.indexOf("כאל") !== -1)
            ||
            (text == "115")
            ||
            (text == "116")
            ||
            (text == "128")
        ) {
            type = 21;
        } else if (
            (text.indexOf("מסטרקארד") !== -1)
            ||
            (text.indexOf("מאסטרקארד") !== -1)
            ||
            (text.indexOf("Mastercard") !== -1)
            ||
            (text.indexOf("מאסטרכארד") !== -1)
            ||
            (text.indexOf("מאסטרכרד") !== -1)
            ||
            (text.indexOf("מסטרכארד") !== -1)
            ||
            (text.indexOf("עילית") !== -1)
            ||
            (text.indexOf("מ.קארד") !== -1)
            ||
            (text == "106")
            ||
            (text == "107")
            ||
            (text == "108")
            ||
            (text == "109")
            ||
            (text == "110")
            ||
            (text == "111")
            ||
            (text == "112")
            ||
            (text == "113")
            ||
            (text == "127")
        ) {
            type = 23;
        } else if (
            (text.indexOf("דיינרס") !== -1)
        ) {
            type = 26;
        } else if (
            (text.indexOf("ישראכרט") !== -1)
            ||
            (text.indexOf("ישרכארט") !== -1)
            ||
            (text.indexOf("לייפסטייל") !== -1)
            ||
            (text.indexOf("הומסנטר") !== -1)
            ||
            (text.indexOf("PREFERRED") !== -1)
            ||
            (text == "101")
            ||
            (text == "102")
            ||
            (text == "103")
            ||
            (text == "104")
            ||
            (text == "105")
        ) {
            type = 22;
        } else if (
            (text.indexOf("אמקס") !== -1)
            ||
            (text.indexOf("קורפורייט") !== -1)
            ||
            (text.indexOf("אמריקן אקספרס") !== -1)
            ||
            (text.indexOf("אקספרס") !== -1)
            ||
            (text.indexOf("אמריקן") !== -1)
            ||
            (text.indexOf('אמק"ס') !== -1)
            ||
            (text.indexOf('AMEX') !== -1)
            ||
            (text == "117")
            ||
            (text == "118")
            ||
            (text == "119")
            ||
            (text == "120")
            ||
            (text == "121")
            ||
            (text == "122")
            ||
            (text == "122")
            ||
            (text == "124")
        ) {
            type = 25;
        }
        return type;
    };

    services.getTypeCardVisa = function (txt, dflt) {
        const dfltN = Number(dflt);
        let type = dfltN > 0 ? dfltN : 30;
        const textComplete = txt.replace(/[^a-zA-Z0-9\u0590-\u05FF]+/g, ' ').trim().split(' ');
        if (!textComplete) {
            return type;
        }
        textComplete.every((text) => {
            if (
//            (text.indexOf("לאומי") !== -1 && text.indexOf("ויזה") !== -1)
                (textComplete.indexOf("מקס") !== -1 && textComplete.indexOf("ויזה") !== -1)
                ||
                (text.indexOf("לאומי קארד") !== -1)
                ||
                (text === ("לאומיקארד"))
            ) {
                type = 24;
                return false;
            }
            if (
                (textComplete.indexOf("ויזה כאל זהב") !== -1)
                ||
                (text === ("ויזה"))
                ||
                (text === ("כאל"))
                ||
                (text == "115")
                ||
                (text == "116")
                ||
                (text == "128")
            ) {
                type = 21;
                return false;
            }
            if (
                (text === ("מסטרקארד"))
                ||
                (text === ("מאסטרקארד"))
                ||
                (text === ("Mastercard"))
                ||
                (text === ("מאסטרכארד"))
                ||
                (text === ("מאסטרכרד"))
                ||
                (text === ("מסטרכארד"))
                ||
                (text === ("עילית"))
                ||
                (text === ("מ.קארד"))
                ||
                (text == "106")
                ||
                (text == "107")
                ||
                (text == "108")
                ||
                (text == "109")
                ||
                (text == "110")
                ||
                (text == "111")
                ||
                (text == "112")
                ||
                (text == "113")
                ||
                (text == "127")
            ) {
                type = 23;
                return false;
            }
            if (
                (text === ("דיינרס"))
            ) {
                type = 26;
                return false;
            }
            if (
                (text === ("ישראכרט"))
                ||
                (text === ("ישרכארט"))
                ||
                (text === ("לייפסטייל"))
                ||
                (text === ("הומסנטר"))
                ||
                (text === ("PREFERRED"))
                ||
                (text == "101")
                ||
                (text == "102")
                ||
                (text == "103")
                ||
                (text == "104")
                ||
                (text == "105")
            ) {
                type = 22;
                return false;
            }
            if (
                (text === ("אמקס"))
                ||
                (text === ("קורפורייט"))
                ||
                (textComplete.indexOf("אמריקן אקספרס") !== -1)
                ||
                (text === ("אקספרס"))
                ||
                (text === ("אמריקן"))
                ||
                (text === ('אמק"ס'))
                ||
                (text === ('AMEX'))
                ||
                (text == "117")
                ||
                (text == "118")
                ||
                (text == "119")
                ||
                (text == "120")
                ||
                (text == "121")
                ||
                (text == "122")
                ||
                (text == "122")
                ||
                (text == "124")
            ) {
                type = 25;
                return false;
            }
            return true;
        })
        return type;
    };

    services.getTypeCreditCard = function (text) {
        var type = 99;//null;
        if (parseFloat(all.banks.accountDetails.bank.BankNumber) === 80) {
            type = 80;
        }
        if (
            (text.indexOf("לאומי קארד") !== -1)
            ||
            (text.indexOf("לאומיקארד") !== -1)
        ) {
            type = 80;
        } else if (
            (text.indexOf("ויזה כאל") !== -1)
            ||
            (text.indexOf("ויזה") !== -1)
            ||
            (text.indexOf("Visa") !== -1)
            ||
            (text.indexOf("כאל") !== -1)
        ) {
            type = 81;
        } else if (
            (text.indexOf("אמריקן אקספרס") !== -1)
            ||
            (text.indexOf("אמריקן") !== -1)
            ||
            (text.indexOf("אקספרס") !== -1)
        ) {
            type = 84;
        } else if (
            text.indexOf("יורוקרד") !== -1
        ) {
            type = 86;
        } else if (
            (text.indexOf("מסטרקארד") !== -1)
            ||
            (text.indexOf("מאסטרקארד") !== -1)
            ||
            (text.indexOf("Mastercard") !== -1)
            ||
            (text.indexOf("מאסטרכארד") !== -1)
            ||
            (text.indexOf("מאסטרכרד") !== -1)
            ||
            (text.indexOf("מסטרכארד") !== -1)
            ||
            (text.indexOf("עילית") !== -1)
        ) {
            type = 88;
        } else if (
            (text.indexOf("דיינרס") !== -1)
            ||
            (text.indexOf("Diners") !== -1)
        ) {
            type = 83;
        } else if (
            (text.indexOf("גמא") !== -1)
        ) {
            type = 90;
        } else if (
            (text.indexOf("צמרת מימונים") !== -1)
            ||
            (text.indexOf("צמרת") !== -1)
            ||
            (text.indexOf("מימונים") !== -1)
        ) {
            type = 89;
        } else if (
            (text.indexOf("יציל פיננסים") !== -1)
            ||
            (text.indexOf("יציל") !== -1)
            ||
            (text.indexOf("פיננסים") !== -1)
        ) {
            type = 91;
        } else if (
            (text.indexOf("ישראכרט") !== -1)
            ||
            (text.indexOf("Isracard") !== -1)
            ||
            (text.indexOf("ישרכארט") !== -1)
            ||
            (text.indexOf("לייפסטייל") !== -1)
            ||
            (text.indexOf("הומסנטר") !== -1)
            ||
            (text.indexOf("ישראכארד") !== -1)
        ) {
            type = 82;
        }
        return type;
    };
    services.getTypeBank = function (text) {
        var type = '';//null;
        if (
            (text.indexOf("מסד") !== -1)
        ) {
            type = 46;
            return type;
        } else if (
            (text.indexOf("פאגי") !== -1)
            ||
            (text.indexOf("פאג״י") !== -1)
            ||
            (text.indexOf("פועלי אגודת ישראל") !== -1)
        ) {
            type = 52;
            return type;
        } else if (
            (text.indexOf("אוצר") !== -1)
            ||
            (text.indexOf("אוצר החייל") !== -1)
            ||
            (text.indexOf("החייל") !== -1)
            ||
            (text.indexOf("אוצה״ח") !== -1)
        ) {
            type = 14;
            return type;
        } else if (
            (text.indexOf("יו-בנק") !== -1)
            ||
            (text.indexOf("יו בנק") !== -1)
            ||
            (text.indexOf("יובנק") !== -1)
        ) {
            type = 126;
            return type;
        } else if (
            (text.indexOf("דואר") !== -1)
        ) {
            type = 9;
            return type;
        } else if (
            (text.indexOf("יהב") !== -1)
        ) {
            type = 4;
            return type;
        } else if (
            (text.indexOf("ירושלים") !== -1)
        ) {
            type = 54;
            return type;
        } else if (
            (text.indexOf("איגוד") !== -1)
        ) {
            type = 13;
            return type;
        } else if (
            (text.indexOf("דקסיה") !== -1)
        ) {
            type = 68;
            return type;
        } else if (
            (text.indexOf("לאומי") !== -1)
        ) {
            type = 10;
            return type;
        } else if (
            (text.indexOf("ערבי") !== -1)
        ) {
            type = 34;
            return type;
        } else if (
            (text.indexOf("פועלים עסקים") !== -1)
            ||
            (text.indexOf("פועלים בעסקים") !== -1)
        ) {
            type = 122;
            return type;
        } else if (
            (text.indexOf("פועלים") !== -1)
        ) {
            type = 12;
            return type;

        } else if (
            (text.indexOf("מזרחי") !== -1)
            ||
            (text.indexOf("טפחות") !== -1)
        ) {
            type = 20;
            return type;
        } else if (
            (text.indexOf("פיבי") !== -1)
            ||
            (text.indexOf("בינלאומי") !== -1)
        ) {
            type = 31;
            return type;
        } else if (
            (text.indexOf("מרכנתיל עסקים") !== -1)
        ) {
            type = 57;
            return type;
        } else if (
            (text.indexOf("דיסקונט עסקים") !== -1)
        ) {
            type = 58;
            return type;
        } else if (
            (text.indexOf("מרכנתיל עסקים פלוס") !== -1)
            ||
            (text.indexOf("מרכנתיל עסקים +") !== -1)
        ) {
            type = 157;
            return type;
        } else if (
            (text.indexOf("דיסקונט עסקים פלוס") !== -1)
            ||
            (text.indexOf("דיסקונט עסקים +") !== -1)
        ) {
            type = 158;
            return type;
        } else if (
            (text.indexOf("דיסקונט") !== -1)
        ) {
            type = 11;
            return type;

        } else if (
            (text.indexOf("מרכנתיל") !== -1)
        ) {
            type = 17;
            return type;

        }
        return type;
    };
    services.openBankPage = function (url, iframeNew) {
        var windowObjectReference = window.open(url, "frameCapture", "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes,width=1440,height=900");
        if (iframeNew) {
            setTimeout(function () {
                windowObjectReference.document.getElementById("yatzilFrame").src = iframeNew;
            }, 2000)
        }
        windowObjectReference.focus();
        var inter = setInterval(function () {
            monitorActivityClass.setIntervalActivity();
        }, 50000);
        var closeInterval = setInterval(function () {
            if (windowObjectReference.closed) {
                clearInterval(inter);
                clearInterval(closeInterval);
                windowObjectReference = null;
                services.reloadPage();
            }
        }, 1000);
    };
    services.parseHtml = function (data) {
        if (typeof (data) == "string") {
            var parser = new DOMParser();
            var doc = parser.parseFromString(data, "text/html");
            var data = $(doc);
            doc = undefined;
        }
        return data;
    };
    services.showVersion = function (data) {
        all.banks.statusWorkFromRest = true;
        all.banks.statusWorkUpdate = true;
        var pathConfig = "detailsVersions.html";
        fs.readFile(pathConfig, 'utf8', function (err, data) {
            if (err) {
            }
            $("#logVersion").html(data).slideDown("fast");
            var target = $("li[name='" + pkg.version + "']");
            if (target.length) {
                $('#logVersion > ul').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
            $("#logVersion > #closeVers").on("click", function () {
                $("#logVersion").slideUp("fast").html("");
                all.banks.statusWorkFromRest = false;
                all.banks.statusWorkUpdate = false;
            });
        });
    };
    services.parseSum = function (sum) {
        return Math.round(sum * 100) / 100;
    }
    services.getStringJson = function (str) {
        if (str == undefined || str == null) {
            return str;
        } else {
            return str.replace(/&quot;/g, "\"").replace(/"/g, "\"").replace(/&rlm;/g, "");
        }
    }
    services.convertDateAll = function (dateValueStr) {
        var responseDate = null;
        if (dateValueStr == undefined) {
            return responseDate;
        } else if (dateValueStr == null) {
            return responseDate;
        } else if (dateValueStr.toString().replace(/\s/g, "") == "") {
            return responseDate;
        } else {
            var valDate = dateValueStr.toString();
            var dateFormat = new Date(valDate);
            if (dateFormat == "Invalid Date") {
                var pathDir = './dateInvalid.txt';
                var dist = path.resolve(pathDir);
                fsPath.mkdir(path.dirname(dist), function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        fs.appendFile(dist, valDate + "<br>", function (err) {
                            if (err) {
                                console.log('Error writing file');
                            }
                        });
                    }
                });
                return responseDate;
            } else {
                return ("0" + dateFormat.getDate()).slice(-2) + '/' + ("0" + (dateFormat.getMonth() + 1)).slice(-2) + '/' + dateFormat.getFullYear();
            }
        }
    }
    services.addMonthsToDate = function (date, count) {
        if (date && count) {
            var m, d = (date = new Date(+date)).getDate();

            date.setMonth(date.getMonth() + count, 1);
            m = date.getMonth();
            date.setDate(d);
            if (date.getMonth() !== m) {
                date.setDate(0);
            }
        }
        return date;
    };
    services.notifyPagerDuty = async function (incidentType, incidentSource) {
        if (incidentSource === '88E6C85EB9144928843647E86DDDD3A5') {
            incidentSource = 'Eyal';
        } else if (incidentSource === '88E6C85EB9144928843647E86DDDD3A4') {
            incidentSource = 'Moti';
        }
        let reqBody = null;
        switch (incidentSource) {
            case 'Moti':
            case 'Eyal':
                reqBody = {
                    "incident": {
                        "type": "incident",
                        "title": `${incidentType} in ${incidentSource} O T P`,
                        "service": {
                            "id": "P57MIJH",
                            "summary": "<string>",
                            "type": "service_reference",
                            "self": "<url>",
                            "html_url": "<url>"
                        },
                        "urgency": "high",
                        "body": {
                            "type": "incident body",
                            "details": "<string>"
                        },
                        "incident_key": `${uuidv4()}`, // "{{$guid}}",
                        "escalation_policy": {
                            "id": "P5UFU7F",
                            "summary": "<string>",
                            "type": "escalation_policy_reference",
                            "self": "<url>",
                            "html_url": "<url>"
                        }
                    }
                };
                break;
        }

        if (!reqBody) {
            return;
        }

        function uuidv4() {
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
        };


        try {
            const resp = await $.ajax({
                url: 'https://api.pagerduty.com/incidents',
                xhrFields: {
                    withCredentials: true
                },
                method: 'POST',
                data: JSON.stringify(reqBody),
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Token token=8GFvyqBt2RStKUzujJCq',
                    'From': 'yosia@bizibox.biz',
                    'Accept': 'application/vnd.pagerduty+json;version=2'
                }
            });
        } catch (e) {
            writeLog('Failed to notifyPagerDuty for ' + incidentType + ': ' + (e.responseText || e.stack));
        }
    };
    return services;
}();
// var po = document.createElement('script');
// po.type = 'text/javascript';
// po.async = true;
// po.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js';
// var s = document.getElementsByTagName('script')[0];
// s.parentNode.insertBefore(po, s);

// var dateFrom = new Date(2021, 1, 1)
// var dateTo = new Date(2021, 2, 2)
// var oneDay = 24 * 60 * 60 * 1000;
// var diffDays = Math.round(Math.abs((dateFrom.getTime() - dateTo.getTime()) / (oneDay)));
// for(let i = 0; i < diffDays; i++){
//     var firstDate = new Date(dateFrom);
//     firstDate.setDate(firstDate.getDate() + i)
//     var secondDate = new Date(firstDate);
//     secondDate.setDate(secondDate.getDate() + 1)
//
//     console.log('firstDate', firstDate)
//     console.log('secondDate', secondDate)
// }
