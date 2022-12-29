all.banks.accounts.mizrahiTefahot = function () {
    var mizrahiTefahot = {};
    mizrahiTefahot.counterCard = 0;
    mizrahiTefahot.indexAccMatah = 0;
    mizrahiTefahot.urlPattern = "Online";
    mizrahiTefahot.imageScale = 0.2;
    mizrahiTefahot.cookies = "";
    mizrahiTefahot.xsrfToken = false;
    mizrahiTefahot.timesChangeIp = 0;
    mizrahiTefahot.changeIp = function () {
        mizrahiTefahot.timesChangeIp++;
        writeLog("---- Start ChangeIp again----");
        all.banks.core.main.changeIpV4(false).then(function (res) {
            if (res) {
                console.log(res);
                mizrahiTefahot.login();
            } else {
                if (mizrahiTefahot.timesChangeIp < 5) {
                    mizrahiTefahot.changeIp();
                } else {
                    $.get("http://icanhazip.com")
                        .done(function (ipAddrress) {
                            ipAddrress = ipAddrress.replace(/\s/g, "");
                            myEmitterLogs(9, 'IP is blocked - ' + ipAddrress + 'spiderId:' + all.banks.spiderConfig.spiderId);
                        });
                }
            }
        });
    }
    mizrahiTefahot.senderPostForm = (...args) => {
        let [url, Referer, cookie, body, host, origin] = args;

        writeLog("senderPostForm: " + url);

        var options = {
            uri: url,
            family: 4,
            timeout: 200000,
            form: body,
            method: "POST",
            body: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Host": host ? host : "mto.mizrahi-tefahot.co.il",
                "Origin": origin ? origin : "https://mto.mizrahi-tefahot.co.il",
                'Upgrade-Insecure-Requests': "1",
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
            }
        };
        if (mizrahiTefahot.xsrfToken) {
            options.headers['mizrahixsrftoken'] = mizrahiTefahot.xsrfToken;
        }
        if (cookie !== null) {
            options.headers.Cookie = cookie;
        }
        if (Referer !== null) {
            options.headers.Referer = Referer;
        }
        return mizrahiTefahot.senderRequest(options);
    }
    mizrahiTefahot.senderPostJSON = (...args) => {
        // mizrahixsrftoken: cdGqGQHpqWKR7CkdKqnVPzuOoKWbu3ZtfQeA/rqSeQ==###319
        let [url, Referer, cookie, body, host, origin] = args;
        writeLog("senderPostJSON: " + url);
        let headers = {
            "Content-Type": "application/json;charset=UTF-8",
            "Host": host ? host : "mto.mizrahi-tefahot.co.il",
            "Origin": origin ? origin : "https://mto.mizrahi-tefahot.co.il",
            'Upgrade-Insecure-Requests': "1",
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
        }
        if (mizrahiTefahot.xsrfToken) {
            headers['mizrahixsrftoken'] = mizrahiTefahot.xsrfToken;
        }
        if (url.includes('Online/api/SkyBL/logon')) {
            headers['mizrahixsrftoken'] = '';
        }
        var options = {
            uri: url,
            family: 4,
            timeout: 200000,
            method: "POST",
            body: body,
            headers: headers
        };
        if (cookie !== null) {
            options.headers.Cookie = cookie;
        }
        if (Referer !== null) {
            options.headers.Referer = Referer;
        }

        return mizrahiTefahot.senderRequest(options);
    }
    mizrahiTefahot.senderGet = (...args) => {
        let [url, Referer, cookie, host] = args;
        writeLog("senderGet: " + url);

        let options = {
            "uri": url,
            "family": 4,
            "method": "GET",
            timeout: 200000,
            "headers": {
                "Connection": "keep-alive",
                "Upgrade-Insecure-Requests": "1",
                "Host": host ? host : "mto.mizrahi-tefahot.co.il",
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
            }
        };
        if (mizrahiTefahot.xsrfToken && !url.includes('root-main-personal-mailbox/items')) {
            options.headers['mizrahixsrftoken'] = mizrahiTefahot.xsrfToken;
        }
        if (cookie !== null) {
            options.headers.Cookie = cookie;
        }
        if (Referer !== null) {
            options.headers.Referer = Referer;
        }
        return mizrahiTefahot.senderRequest(options);
    }
    mizrahiTefahot.senderRequest = (options) => {
        if (!options.uri.includes('keepAlive')) {
            monitorActivityClass.setIntervalActivity();
        }

//        writeLog("senderRequest: " + JSON.stringify(options));
//         writeLog("senderRequest: " + options.uri);

        // const usernameProxy = 'brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob' + all.banks.accountDetails.bank.token.replace(/-/g, '');
        // if (window.navigator.platform.indexOf('Win') === -1) {
        //     options['proxy'] = 'http://' + usernameProxy + ':h0mi0yvib3to@zproxy.lum-superproxy.io:22225';
        // }
        return new Promise((resolve, reject) => {
            senderReq.sendersServer(options, (error, response, data) => {
                if (response !== undefined) {
                    // if (options.uri.includes('CardDetails')) {
                    //     console.log(options, response.headers)
                    //     debugger
                    // }
                    if (response.headers !== undefined) {
                        if (response.headers["set-cookie"]) {
                            if (response.headers["set-cookie"].length > 1) {
                                if (response.headers["set-cookie"][0].includes('MizSESSION=;')) {
                                    response.headers["set-cookie"] = [
                                        response.headers["set-cookie"][1]
                                    ]
                                }
                            }

                            mizrahiTefahot.getSetCookies(response.headers["set-cookie"])
                                .then((res) => {
                                    resolve([error, response, data]);
                                });
                        } else {
                            resolve([error, response, data]);
                        }
                    } else {
                        resolve([error, response, data]);
                    }
                } else {
                    resolve([error, response, data]);
                }
            });
        });
    }
    mizrahiTefahot.getSetCookies = (cookie) => {
        return new Promise((resolve, reject) => {
            try {
                var cookSplit = mizrahiTefahot.cookies.split(";");
                var i, len = cookie.length;
                if (len) {
                    for (i = 0; i < len; i++) {
                        var v = cookie[i];
                        var name = v.split(";")[0].split("=")[0].replace(/\s/g, "");
                        var val = v.split(";")[0].split("=")[1].replace(/\s/g, "");
                        var exist = 0;
                        var i1, len1 = cookSplit.length;
                        for (i1 = 0; i1 < len1; i1++) {
                            var v1 = cookSplit[i1];
                            if (v1 !== "") {
                                var nameExist = v1.split("=")[0].replace(/\s/g, "");
                                var valExist = v1.split("=")[1].replace(/\s/g, "");
                                if (nameExist === name) {
                                    exist = 1;
                                    if (val !== valExist) {
                                        v1 = v.split(";")[0] + ";"
                                    }
                                }
                            }
                        }
                        if (exist === 0) {
                            cookSplit.unshift(v.split(";")[0])
                        }
                        if (len === i + 1) {
                            mizrahiTefahot.cookies = cookSplit.join(";");
                            resolve(true)
                        }
                    }
                } else {
                    resolve(true)
                }
            } catch (e) {
                debugger
            }
        });
    }
    mizrahiTefahot.login = async function () {
        //var mizrachi = new Mizrachi();
        mizrahiTefahot.arr = [];
        mizrahiTefahot.ind = 0;
        mizrahiTefahot.numberOfOptions = 0;
        mizrahiTefahot.timeOutFunc;
        mizrahiTefahot.cookies = "";

        let args = await mizrahiTefahot.senderGet(
            'https://www.mizrahi-tefahot.co.il/login/index.html',
            '',
            null,
            'www.mizrahi-tefahot.co.il'
        )
        let [error, response, res] = [...args];
        if (!error) {
            try {
                res = all.banks.core.services.parseHtml(res);
                if (($(res).text().indexOf("URL was rejected") == -1)
                    &&
                    ($(res).find('#mainTitleAlign').length === 0 || $(res).find('#mainTitleAlign').length && $(res).find('#mainTitleAlign').text().indexOf("הודעה") == -1)
                ) {
                    await mizrahiTefahot.senderGet(
                        'https://www.mizrahi-tefahot.co.il/login/api/config',
                        'https://www.mizrahi-tefahot.co.il/login/index.html',
                        mizrahiTefahot.cookies,
                        'www.mizrahi-tefahot.co.il'
                    )
                    let args = await mizrahiTefahot.senderPostJSON(
                        'https://www.mizrahi-tefahot.co.il/login/api/Login/LoginUser',
                        'https://www.mizrahi-tefahot.co.il/login/index.html',
                        mizrahiTefahot.cookies,
                        JSON.stringify({
                            "Username": all.banks.accountDetails.bank.username.slice(0, 14),
                            "Password": all.banks.accountDetails.bank.password.slice(0, 15),
                            "Lang": "HE"
                        }),
                        'www.mizrahi-tefahot.co.il',
                        'https://www.mizrahi-tefahot.co.il'
                    )
                    let [error, response, data] = [...args];
                    if (error) {
                        all.banks.core.services.errorLog('שגיאה')
                    } else {
                        if (data && typeof data === 'string') {
                            data = JSON.parse(data);
                        }
                        if (data.ReturnMessagesKey === 'LoginOK') {
                            mizrahiTefahot.xsrfToken = data.XsrfToken;
                            // let args = await mizrahiTefahot.senderGet(
                            //     'https://mto.mizrahi-tefahot.co.il/OnlineApp/ge/legacy/root-main-personal-mailbox/items',
                            //     'https://www.mizrahi-tefahot.co.il/',
                            //     mizrahiTefahot.cookies,
                            //     'mto.mizrahi-tefahot.co.il'
                            // )
                            // let [error, response, res] = [...args];
                            // if (error) {
                            //     all.banks.core.services.errorLog('שגיאה')
                            //     return;
                            // }
                            // var cookSplit = mizrahiTefahot.cookies.split(";");
                            // var i1, len1 = cookSplit.length;
                            // for (i1 = 0; i1 < len1; i1++) {
                            //     var v1 = cookSplit[i1];
                            //     if (v1 !== "") {
                            //         var nameExist = v1.split("=")[0].replace(/\s/g, "");
                            //         var valExist = v1.split("=")[1].replace(/\s/g, "");
                            //         win.cookies.set({
                            //             url: `https://mto.mizrahi-tefahot.co.il`,
                            //             name: nameExist,
                            //             domain: 'mto.mizrahi-tefahot.co.il',
                            //             value: valExist
                            //         })
                            //     }
                            // }
                            // res = all.banks.core.services.parseHtml(res);
                            // const scriptsElemSrc = res.find("script[data-dtconfig]").attr('src');
                            // const scriptsElem = res.find('script').attr('data-dtconfig');
                            // const scriptsElemFixed = scriptsElem.replace(/=\//g, "=https://mto.mizrahi-tefahot.co.il/");
                            // const script = document.createElement('script');
                            // script.src = 'https://mto.mizrahi-tefahot.co.il' + scriptsElemSrc;
                            // script.setAttribute('data-dtconfig', scriptsElemFixed)
                            // document.body.appendChild(script);
                            // script.onload = () => {
                            //     win.cookies.getAll({}, async function (cool) {
                            //         if (cool && cool.length) {
                            //             mizrahiTefahot.cookies = cool
                            //                 .map(ck => {
                            //                     return ck.name + "=" + (ck.value);
                            //                 })
                            //                 .join(";");
                            //        ////
                            //         } else {
                            //             myEmitterLogs(9, 'cookies unavailable');
                            //         }
                            //     });
                            // };
                            writeLog("---- Login Successfully----");
                            if (!all.banks.openBankPage) {
                                all.banks.generalVariables.allDataArr = {
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    "BankData": [
                                        {
                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                            "Token": all.banks.accountDetails.bank.token,
                                            "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                            "Account": []
                                        }
                                    ]
                                }
                                all.banks.generalVariables.allDataArrMatah = {
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    "BankData": [
                                        {
                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                            "Token": all.banks.accountDetails.bank.token,
                                            "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                            "Account": []
                                        }
                                    ]
                                };
                                all.banks.generalVariables.allDataArrAshrai = [];
                                all.banks.generalVariables.allDataArrLoan = [];
                                all.banks.generalVariables.allDataArrDeposit = [];
                                all.banks.generalVariables.allDataArrDueChecks = [];
                                all.banks.generalVariables.allDataArrStandingOrders = [];
                                all.banks.accounts.mizrahiTefahot.datemakaf = all.banks.accountDetails.dateFrom.getFullYear() + '-' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '-' + ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2);
                                all.banks.accounts.mizrahiTefahot.datebackslesh = ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateFrom.getFullYear();
                                all.banks.accounts.mizrahiTefahot.datemakafWithMin = all.banks.accountDetails.dateFrom.getFullYear() + '-' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '-' + ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2) + '-00-00-00';
                                all.banks.accounts.mizrahiTefahot.datePsik = all.banks.accountDetails.dateFrom.getFullYear() + ',' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + ',' + ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2);

                                all.banks.accounts.mizrahiTefahot.datemakafTo = all.banks.accountDetails.dateTo.getFullYear() + '-' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '-' + ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2);
                                all.banks.accounts.mizrahiTefahot.datebacksleshTo = ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateTo.getFullYear();
                                all.banks.accounts.mizrahiTefahot.datemakafWithMinTo = all.banks.accountDetails.dateTo.getFullYear() + '-' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '-' + ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2) + '-00-00-00';
                                all.banks.accounts.mizrahiTefahot.datePsikTo = all.banks.accountDetails.dateTo.getFullYear() + ',' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + ',' + ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2);
                                all.banks.accounts.mizrahiTefahot.dateFrom =
                                    ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2) +
                                    '/' +
                                    ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) +
                                    '/' +
                                    all.banks.accountDetails.dateFrom.getFullYear();

                                all.banks.accounts.mizrahiTefahot.dateTill =
                                    ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2) +
                                    '/' +
                                    ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) +
                                    '/' +
                                    all.banks.accountDetails.dateTo.getFullYear();


                                all.banks.accounts.mizrahiTefahot.dateFromSalary = all.banks.accountDetails.dateFrom.getFullYear() + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2);
                                all.banks.accounts.mizrahiTefahot.dateTillSalary = all.banks.accountDetails.dateTo.getFullYear() + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2);

                                res = all.banks.core.services.parseHtml(res);
                                var isNotSelectNew = $(res).find('select#ddlAcounts option').length;
                                if (isNotSelectNew) {
                                    mizrahiTefahot.numberOfOptions = isNotSelectNew;
                                    // mizrahiTefahot.intervals = setInterval(function () {
                                    //     // $.get("https://mto.mizrahi-tefahot.co.il/Online/api/newGE/keepAlive");
                                    // }, 120000);
                                    nextStepLoad();
                                } else {
                                    let args = await mizrahiTefahot.senderPostJSON(
                                        'https://mto.mizrahi-tefahot.co.il/Online/api/SkyBL/logon',
                                        'https://mto.mizrahi-tefahot.co.il/OnlineApp/ge/legacy/root-main-personal-mailbox/items',
                                        mizrahiTefahot.cookies,
                                        JSON.stringify({
                                            "appId": "skyWeb",
                                            "appVer": "",
                                            "lang": "he-il",
                                            "isPdf": false
                                        })
                                    )
                                    let [error, response, dataRes] = [...args];
                                    if (error) {
                                        myEmitterLogs(9);
                                        return;
                                    }
                                    if (dataRes && typeof dataRes === 'string') {
                                        dataRes = JSON.parse(dataRes);
                                    }

                                    if (dataRes.errorCode && dataRes.errorCode === "general_error") {
                                        if (dataRes.redirectUrl && dataRes.redirectUrl.includes('לא ניתן להשתמש בשירות')) {
                                            myEmitterLogs(5, dataRes.redirectUrl);  //login failed
                                        } else {
                                            myEmitterLogs(9);
                                        }
                                    } else {
                                        mizrahiTefahot.xsrfToken = dataRes.body.xsrfToken;
                                        mizrahiTefahot.AccountsAllJson = dataRes.body.user.Accounts;
                                        if (mizrahiTefahot.AccountsAllJson.length) {
                                            mizrahiTefahot.AccountsAllJson.forEach((it, idx) => {
                                                mizrahiTefahot.AccountsAllJson[idx].idx = idx;
                                            });
                                        }
                                        if (all.banks.accountDetails.deleted_account_ids.length) {
                                            mizrahiTefahot.AccountsAllJson = mizrahiTefahot.AccountsAllJson.filter(item => !(all.banks.accountDetails.deleted_account_ids.some(it => (parseInt(item.Number).toString()).includes(it.toString()))))
                                        }
                                        mizrahiTefahot.numberOfOptions = mizrahiTefahot.AccountsAllJson.length;

                                        //mizrahiTefahot.urlOshNew = "https://mto.mizrahi-tefahot.co.il" + dataRes.body.user.LandingPage.url + "?" + dataRes.body.user.LandingPage.queryString;
                                        // if (dataRes.body.user.LandingPage.url.indexOf("P428.aspx") == -1) {
                                        // }
                                        mizrahiTefahot.urlOshNew = "https://mto.mizrahi-tefahot.co.il/Online/Osh/P428.aspx?null";
                                        mizrahiTefahot.urlPattern = "Online";
                                        mizrahiTefahot.urlPatternNew = true;
                                        if (mizrahiTefahot.xsrfToken) {
                                            mizrahiTefahot.intervals = setInterval(function () {
                                                mizrahiTefahot.senderPostJSON(
                                                    'https://mto.mizrahi-tefahot.co.il/Online/api/newGE/keepAlive',
                                                    'https://mto.mizrahi-tefahot.co.il/OnlineApp/ge/legacy/root-main-personal-mailbox/items',
                                                    mizrahiTefahot.cookies,
                                                    JSON.stringify({})
                                                );
                                            }, 120000);

                                            // mizrahiTefahot.intervalsIsAlive = setInterval(function () {
                                            //     $.ajax({
                                            //         url: "https://mto.mizrahi-tefahot.co.il/Online/api/newGE/isAlive",
                                            //         data: null,
                                            //         xhrFields: {
                                            //             withCredentials: true
                                            //         },
                                            //         beforeSend: function (xhr) {
                                            //             xhr.setRequestHeader('Upgrade-Insecure-Requests', '1')
                                            //             xhr.setRequestHeader('mizrahixsrftoken', mizrahiTefahot.xsrfToken)
                                            //         },
                                            //         method: "POST",
                                            //         contentType: "application/json"
                                            //     });
                                            // }, 20000);
                                        }
                                        nextStepLoad();
                                    }

                                }

                                function nextStepLoad() {
                                    mizrahiTefahot.ind = 0;
                                    if (all.banks.accountDetails.days > 0) {
                                        if (!all.banks.spiderConfig.isMizrahiJson) {
                                            mizrahiTefahot.getOsh();
                                        } else {
                                            mizrahiTefahot.changBankAcc(mizrahiTefahot.ind);
                                        }
                                        //console.log(all.banks.accountDetails.bank.username.slice(0, 10), all.banks.accountDetails.bank.password.slice(0, 15));
                                        //mizrachi.login(all.banks.accountDetails.bank.username.slice(0, 10), all.banks.accountDetails.bank.password.slice(0, 15));
                                        // mizrahiTefahot.changBankAcc(mizrahiTefahot.ind);
                                    } else if (all.banks.accountDetails.ccardMonth > 0) {
                                        myEmitterLogs(14);
                                        //mizrachi.login(all.banks.accountDetails.bank.username.slice(0, 10), all.banks.accountDetails.bank.password.slice(0, 15));
                                        if (!all.banks.spiderConfig.isMizrahiJson) {
                                            mizrahiTefahot.getAshrai();
                                        } else {
                                            mizrahiTefahot.changBankAccAshrai(mizrahiTefahot.ind);
                                        }
                                    } else if (all.banks.accountDetails.IND_NILVIM > 0) {
                                        myEmitterLogs(21);
                                        mizrahiTefahot.changBankAccLoan(mizrahiTefahot.ind);
                                    } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                                        myEmitterLogs(34);
                                        mizrahiTefahot.changBankAccMatah(mizrahiTefahot.ind);
                                    } else {
                                        mizrahiTefahot.logOff();
                                    }
                                }
                            } else {
                                var cookSplit = mizrahiTefahot.cookies.split(";");
                                var i1, len1 = cookSplit.length;
                                for (i1 = 0; i1 < len1; i1++) {
                                    var v1 = cookSplit[i1];
                                    if (v1 !== "") {
                                        var nameExist = v1.split("=")[0].replace(/\s/g, "");
                                        var valExist = v1.split("=")[1].replace(/\s/g, "");
                                        win.cookies.set({
                                            url: `https://mto.mizrahi-tefahot.co.il`,
                                            name: nameExist,
                                            domain: 'mto.mizrahi-tefahot.co.il',
                                            value: valExist
                                        })
                                    }
                                }
                                setTimeout(() => {
                                    all.banks.core.services.openBankPage("https://mto.mizrahi-tefahot.co.il/Online/Default.aspx?language=he-IL");
                                }, 3000)
                            }
                        } else {
                            console.log('error', data);
                            if (data.ReturnMessagesKey === 'UserNotExist') {
                                myEmitterLogs(5, 'משתמש לא קיים'); //login failed
                            } else if (data.ReturnMessagesKey === 'IllegalCharacters') {
                                myEmitterLogs(5); //login failed
                            } else if (data.ReturnMessagesKey === 'PasswordMustChange') {
                                myEmitterLogs(6); //Password expired
                            } else {
                                myEmitterLogs(9, JSON.stringify(data));
                            }
                        }
                    }


                } else {
                    writeLog("---- URL was rejected ----");
                    // setProxy().then(() => {
                    //     all.banks.core.services.httpReq("https://lumtest.com/myip.json", 'GET', null, false, false).done((ipAfterClientProxy) => {
                    //         writeLog('---ipAfterClientProxy: ' + ipAfterClientProxy.ip);
                    //         all.banks.accounts.mizrahiTefahot.login();
                    //     })
                    // })
                    // mizrahiTefahot.changeIp();
                    all.banks.core.services.errorLog('---- URL was rejected ----');
                }
            } catch (e) {
                all.banks.core.services.errorLog(JSON.stringify(e))
            }
        } else {
            mizrahiTefahot.changeIp();
        }


        // function thenFixSameSiteValueInCookies(data) {
        //     const dfd = jQuery.Deferred();
        //     win.cookies.getAll({}, function (cookies) {
        //         for (const ck of cookies) {
        //             if (!!ck.sameSite && ck.sameSite.toLowerCase() !== 'no_restriction'
        //                 && ck.sameSite.toLowerCase() !== 'unspecified') {
        //                 win.cookies.set({
        //                     url: 'https://www.mizrahi-tefahot.co.il',
        //                     name: ck.name,
        //                     value: ck.value,
        //                     domain: ck.domain,
        //                     path: ck.path,
        //                     secure: ck.secure,
        //                     httpOnly: ck.httpOnly,
        //                     sameSite: 'no_restriction'
        //                 });
        //             }
        //         }
        //         dfd.resolve(data);
        //     });
        //     return dfd.promise();
        // }

        // $.ajax({
        //     url: "https://www.mizrahi-tefahot.co.il/login/bv5x83ut/index.html#/login-he",
        //     xhrFields: {
        //         withCredentials: true
        //     },
        //     beforeSend: function (xhr) {
        //         xhr.setRequestHeader('Upgrade-Insecure-Requests', '1')
        //     },
        //     method: "GET"
        // }).then(thenFixSameSiteValueInCookies)
        //     .done(function (res) {
        //
        //     }).fail(function (jqXHR, textStatus) {
        //     writeLog("---- IP is blocked - changeIp----");
        //     setProxy().then(() => {
        //         all.banks.core.services.httpReq("https://lumtest.com/myip.json", 'GET', null, false, false).done((ipAfterClientProxy) => {
        //             writeLog('---ipAfterClientProxy: ' + ipAfterClientProxy.ip);
        //             all.banks.accounts.mizrahiTefahot.login();
        //         })
        //     })
        //     // mizrahiTefahot.changeIp();
        // });
    }
    mizrahiTefahot.convertDateLocal = function (dateLocal) {
        var dateFormat = "";
        if (dateLocal !== undefined && dateLocal !== null) {
            dateLocal = dateLocal.toString();
            if (dateLocal !== "") {
                dateFormat = dateLocal.split("/")[1] + "/" + dateLocal.split("/")[0] + "/" + dateLocal.split("/")[2];
            }
        }
        return dateFormat;
    };
    mizrahiTefahot.sendOshCtrl = function (matah) {
        var dataArr = all.banks.generalVariables.allDataArr;
        if (matah) {
            //debugger
            dataArr = all.banks.generalVariables.allDataArrMatah;
        }
        all.banks.core.services.sendOsh(dataArr, matah)
            .then(function (arr) {
                if (!matah) {
                    if (all.banks.accountDetails.ccardMonth > 0) {
                        //mizrachi.changeAccount("cards");
                        mizrahiTefahot.ind = 0;
                        if (!all.banks.spiderConfig.isMizrahiJson) {
                            mizrahiTefahot.getAshrai();
                        } else {
                            mizrahiTefahot.changBankAccAshrai(mizrahiTefahot.ind);
                        }
                    } else if (all.banks.accountDetails.IND_NILVIM > 0) {
                        mizrahiTefahot.ind = 0;
                        myEmitterLogs(21);
                        mizrahiTefahot.changBankAccLoan(mizrahiTefahot.ind);
                    } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                        mizrahiTefahot.ind = 0;
                        myEmitterLogs(34);
                        mizrahiTefahot.changBankAccMatah(mizrahiTefahot.ind);
                    } else {
                        all.banks.accounts.mizrahiTefahot.logOff();
                    }
                } else {
                    all.banks.accounts.mizrahiTefahot.logOff();
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.mizrahiTefahot.sendOshCtrl(matah)
                }
            })
    };
    // mizrahiTefahot.sendChecksCtrl = function (formData) {
    //     all.banks.core.services.sendChecks(formData)
    //         .then(function (arr) {
    //             all.banks.generalVariables.numChecksDrawn = all.banks.generalVariables.numChecksDrawn + 1;
    //         })
    //         .fail(function (error, resErr) {
    //             if (error == 'discard') {
    //                 all.banks.accounts.mizrahiTefahot.sendChecksCtrl(formData)
    //             }
    //         })
    // };
    mizrahiTefahot.sendCardsCtrl = function () {
        all.banks.core.services.sendCards(all.banks.generalVariables.allDataArrAshrai)
            .then(function (arr) {
                if (all.banks.accountDetails.IND_NILVIM > 0) {
                    mizrahiTefahot.ind = 0;
                    myEmitterLogs(21);
                    mizrahiTefahot.changBankAccLoan(mizrahiTefahot.ind)
                } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                    mizrahiTefahot.ind = 0;
                    myEmitterLogs(34);
                    mizrahiTefahot.changBankAccMatah(mizrahiTefahot.ind)
                } else {
                    all.banks.accounts.mizrahiTefahot.logOff();
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.mizrahiTefahot.sendCardsCtrl()
                }
            })
    };
    mizrahiTefahot.sendLoanCtrl = function () {
        all.banks.core.services.sendLoan(all.banks.generalVariables.allDataArrLoan)
            .then(function (arr) {
                mizrahiTefahot.ind = 0;
                myEmitterLogs(17);
                mizrahiTefahot.changBankAccDeposit(mizrahiTefahot.ind)
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    mizrahiTefahot.sendLoanCtrl()
                }
            })
    };
    mizrahiTefahot.sendDepositCtrl = function () {
        all.banks.core.services.sendPikdonot(all.banks.generalVariables.allDataArrDeposit)
            .then(function (arr) {
                mizrahiTefahot.ind = 0;
                myEmitterLogs(19);
                mizrahiTefahot.changBankAccDueChecks(mizrahiTefahot.ind)
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    mizrahiTefahot.sendDepositCtrl()
                }
            })
    };
    mizrahiTefahot.sendDueChecksCtrl = function () {
        all.banks.core.services.sendDueChecks(all.banks.generalVariables.allDataArrDueChecks)
            .then(function (arr) {
                mizrahiTefahot.ind = 0;
                myEmitterLogs(24);
                mizrahiTefahot.changBankAccStandingOrders(mizrahiTefahot.ind)
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    mizrahiTefahot.sendDueChecksCtrl()
                }
            })
    };
    mizrahiTefahot.sendStandingOrdersCtrl = function () {
        all.banks.core.services.sendStandingOrders(all.banks.generalVariables.allDataArrStandingOrders)
            .then(function (arr) {
                if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                    myEmitterLogs(34);
                    mizrahiTefahot.ind = 0;
                    mizrahiTefahot.changBankAccMatah(mizrahiTefahot.ind)
                } else {
                    mizrahiTefahot.logOff();
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    mizrahiTefahot.sendStandingOrdersCtrl()
                }
            })
    };
    mizrahiTefahot.getBase64FromImageUrl = function (chequeindex, controller, asmac) {
        var dfd = jQuery.Deferred();
        $.get("https://mto.mizrahi-tefahot.co.il/Online/GenericHandlers/ServicesReadOnlyFromSessionHandler.ashx?ServicesType=InnerServices&Action=GetJustForYouContent&Parameters=%7B%22PageName%22%3A%22ASP.osh_p428_aspx%22%7D&_=" + new Date().getTime())
        var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/Osh/ShowCheque.aspx?chequeIndex=" + chequeindex + "&c='" + controller + "'&nocache=" + Math.random();
        if (mizrahiTefahot.xsrfToken !== undefined) {
            url += "&mizrahixsrftoken=" + encodeURIComponent(mizrahiTefahot.xsrfToken);
        }
        all.banks.core.services.httpReq(url, 'GET', null, false, false)
            .then(function (resPage) {
                try {
                    var resPage = all.banks.core.services.parseHtml(resPage);
                    if ($(resPage).find('#ctl00_ContentPlaceHolder1_grvChequeList_ctl00').length) {
                        var arrImg = [], indCheck = 0;

                        function loadCheckQueue() {
                            $(resPage).find('#ctl00_ContentPlaceHolder1_grvChequeList_ctl00 tbody tr').each(function (i, v) {
                                if (i == indCheck) {
                                    var url = 'https://mto.mizrahi-tefahot.co.il/' + mizrahiTefahot.urlPattern + '/GenericHandlers/Buffer.ashx?chequeIndex=' + chequeindex + '&nocache=' + Math.random() + '&depInx=' + i + '&c=' + controller;
                                    if (mizrahiTefahot.xsrfToken !== undefined) {
                                        url += "&mizrahixsrftoken=" + encodeURIComponent(mizrahiTefahot.xsrfToken);
                                    }
                                    var img = new Image();
                                    img.src = url;
                                    img.onload = function () {
                                        var canvas = document.createElement("canvas");
                                        canvas.width = this.width;
                                        canvas.height = this.height;
                                        var ctx = canvas.getContext("2d");
                                        ctx.drawImage(this, 0, 0);
                                        var dataURL = canvas.toDataURL("image/jpeg", mizrahiTefahot.imageScale);
                                        if ($(resPage).find('#lblDepChequeBankName').length) {
                                            var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/Osh/ShowCheque.aspx/GetChequeDetails";
                                            var jsons = {
                                                chequeIndex: i,
                                                tnuaIndex: chequeindex.toString()
                                            };
                                            all.banks.core.services.httpReq(url, 'POST', jsons, false, false)
                                                .then(function (response) {
                                                    var dataRes = response.d.split(':');
                                                    var dates = dataRes[4];
                                                    var asmachta = asmac;
                                                    var checkAccountNumber = dataRes[2];
                                                    var depositeDate = dates.split('/')[2] + '' + dates.split('/')[1] + '' + dates.split('/')[0];
                                                    var checkBankNumber = dataRes[0].replace(/\D/g, "");
                                                    var checkBranchNumber = dataRes[1];
                                                    var checkNumber = dataRes[5].replace(/\s/g, "");
                                                    var checkTotal = dataRes[3].replace(/\s/g, "");
                                                    var checkBankNumberParam = (checkBankNumber == '') ? '' : parseInt(checkBankNumber);
                                                    var uuid = checkBankNumberParam + '' + parseInt(checkBranchNumber) + '' + parseInt(checkAccountNumber) + '' + parseInt(checkNumber) + '' + parseInt(depositeDate) + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].AccountNumber;
                                                    var formData = new FormData();
                                                    var content = dataURL.replace(/^data:image\/(png|jpg|jpeg|JPEG);base64,/, "");
                                                    var blob = new Blob([content], {
                                                        type: "text/plain"
                                                    });
                                                    formData.append(uuid, blob);
                                                    all.banks.accounts.mizrahiTefahot.sendChecksCtrl({
                                                        formData: formData,
                                                        params: {
                                                            imagenamekey: uuid,
                                                            bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BankNumber,
                                                            snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BranchNumber,
                                                            accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].AccountNumber
                                                        }
                                                    })
                                                    arrImg.push({
                                                        "Asmachta": asmachta,
                                                        "CheckAccountNumber": checkAccountNumber,
                                                        "DepositeDate": depositeDate,
                                                        "CheckBankNumber": checkBankNumber,
                                                        "CheckBranchNumber": checkBranchNumber,
                                                        "CheckNumber": checkNumber,
                                                        "CheckTotal": checkTotal,
                                                        "ImageNameKey": uuid
                                                    })
                                                    if (i + 1 == $(resPage).find('#ctl00_ContentPlaceHolder1_grvChequeList_ctl00 tbody tr').length) {
                                                        if (arrImg.length) {
                                                            dfd.resolve(arrImg);
                                                        } else {
                                                            dfd.resolve([{
                                                                "ImageNameKey": "x"
                                                            }]);
                                                        }
                                                    } else {
                                                        indCheck = indCheck + 1;
                                                        loadCheckQueue()
                                                    }
                                                })
                                                .fail(function (jqXHR, textStatus) {
                                                    //all.banks.core.services.errorLog('שגיאה')
                                                    all.banks.generalVariables.numChecksNotWithdrawn += 1;
                                                    if (i + 1 == $(resPage).find('#ctl00_ContentPlaceHolder1_grvChequeList_ctl00 tbody tr').length) {
                                                        if (arrImg.length) {
                                                            dfd.resolve(arrImg);
                                                        } else {
                                                            dfd.resolve([{
                                                                "ImageNameKey": "x"
                                                            }]);
                                                        }
                                                    } else {
                                                        indCheck = indCheck + 1;
                                                        loadCheckQueue()
                                                    }
                                                });
                                        } else {
                                            var dates = $(resPage).find('#ctl00_ContentPlaceHolder1_tblChequeData #ctl00_ContentPlaceHolder1_lblChequeDate').text();
                                            var depositeDate = dates.split('/')[2] + '' + dates.split('/')[1] + '' + dates.split('/')[0];
                                            var checkNumber = $(resPage).find('#ctl00_ContentPlaceHolder1_tblChequeData #ctl00_ContentPlaceHolder1_lblChequeNumber').text().replace(/\s/g, "");
                                            var checkTotal = $(resPage).find('#ctl00_ContentPlaceHolder1_tblChequeData #ctl00_ContentPlaceHolder1_lblChequeSum').text().replace(/\s/g, "");
                                            var checkAccountNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].AccountNumber;
                                            var checkBankNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BankNumber;
                                            var checkBranchNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BranchNumber;
                                            var asmachta = asmac;
                                            var checkBankNumberParam = (checkBankNumber == '') ? '' : parseInt(checkBankNumber);
                                            var uuid = checkBankNumberParam + '' + parseInt(checkBranchNumber) + '' + parseInt(checkAccountNumber) + '' + parseInt(checkNumber) + '' + parseInt(depositeDate) + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].AccountNumber;
                                            var formData = new FormData();
                                            var content = dataURL.replace(/^data:image\/(png|jpg|jpeg|JPEG);base64,/, "");
                                            var blob = new Blob([content], {
                                                type: "text/plain"
                                            });
                                            formData.append(uuid, blob);
                                            all.banks.accounts.mizrahiTefahot.sendChecksCtrl({
                                                formData: formData,
                                                params: {
                                                    imagenamekey: uuid,
                                                    bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BankNumber,
                                                    snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BranchNumber,
                                                    accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].AccountNumber
                                                }
                                            })
                                            arrImg.push({
                                                "Asmachta": asmachta,
                                                "CheckAccountNumber": checkAccountNumber,
                                                "DepositeDate": depositeDate,
                                                "CheckBankNumber": checkBankNumber,
                                                "CheckBranchNumber": checkBranchNumber,
                                                "CheckNumber": checkNumber,
                                                "CheckTotal": checkTotal,
                                                "ImageNameKey": uuid
                                            });
                                            if (i + 1 == $(resPage).find('#ctl00_ContentPlaceHolder1_grvChequeList_ctl00 tbody tr').length) {
                                                if (arrImg.length) {
                                                    dfd.resolve(arrImg);
                                                } else {
                                                    dfd.resolve([{
                                                        "ImageNameKey": "x"
                                                    }]);
                                                }
                                            } else {
                                                indCheck = indCheck + 1;
                                                loadCheckQueue()
                                            }
                                        }
                                    }
                                    img.onerror = function () {
                                        all.banks.generalVariables.numChecksNotWithdrawn += 1;
                                        if ($(resPage).find('#lblDepChequeBankName').length) {
                                            var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/Osh/ShowCheque.aspx/GetChequeDetails";
                                            var jsons = {
                                                chequeIndex: i,
                                                tnuaIndex: chequeindex.toString()
                                            };
                                            all.banks.core.services.httpReq(url, 'POST', jsons, false, false)
                                                .then(function (response) {
                                                    var dataRes = response.d.split(':');
                                                    var dates = dataRes[4];
                                                    var asmachta = asmac;
                                                    var checkAccountNumber = dataRes[2].replace(/\D/g, "");
                                                    var depositeDate = dates.split('/')[2] + '' + dates.split('/')[1] + '' + dates.split('/')[0];
                                                    var checkBankNumber = dataRes[0].replace(/\D/g, "");
                                                    var checkBranchNumber = dataRes[1].replace(/\D/g, "");
                                                    var checkNumber = dataRes[5].replace(/\s/g, "");
                                                    var checkTotal = dataRes[3].replace(/\s/g, "");

                                                    if (!checkBankNumber || !checkBranchNumber || !checkAccountNumber) {
                                                        checkBankNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BankNumber;
                                                        checkBranchNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BranchNumber;
                                                        checkAccountNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].AccountNumber;
                                                    }

                                                    arrImg.push({
                                                        "Asmachta": asmachta,
                                                        "CheckAccountNumber": checkAccountNumber,
                                                        "DepositeDate": depositeDate,
                                                        "CheckBankNumber": checkBankNumber,
                                                        "CheckBranchNumber": checkBranchNumber,
                                                        "CheckNumber": checkNumber,
                                                        "CheckTotal": checkTotal,
                                                        "ImageNameKey": "x"
                                                    })
                                                    if (i + 1 == $(resPage).find('#ctl00_ContentPlaceHolder1_grvChequeList_ctl00 tbody tr').length) {
                                                        if (arrImg.length) {
                                                            dfd.resolve(arrImg);
                                                        } else {
                                                            dfd.resolve([{
                                                                "ImageNameKey": "x"
                                                            }]);
                                                        }
                                                    } else {
                                                        indCheck = indCheck + 1;
                                                        loadCheckQueue()
                                                    }
                                                })
                                                .fail(function (jqXHR, textStatus) {
                                                    if (i + 1 == $(resPage).find('#ctl00_ContentPlaceHolder1_grvChequeList_ctl00 tbody tr').length) {
                                                        if (arrImg.length) {
                                                            dfd.resolve(arrImg);
                                                        } else {
                                                            dfd.resolve([{
                                                                "ImageNameKey": "x"
                                                            }]);
                                                        }
                                                    } else {
                                                        indCheck = indCheck + 1;
                                                        loadCheckQueue()
                                                    }
                                                });
                                        } else {
                                            var dates = $(resPage).find('#ctl00_ContentPlaceHolder1_tblChequeData #ctl00_ContentPlaceHolder1_lblChequeDate').text();
                                            var depositeDate = dates.split('/')[2] + '' + dates.split('/')[1] + '' + dates.split('/')[0];
                                            var checkNumber = $(resPage).find('#ctl00_ContentPlaceHolder1_tblChequeData #ctl00_ContentPlaceHolder1_lblChequeNumber').text().replace(/\s/g, "");
                                            var checkTotal = $(resPage).find('#ctl00_ContentPlaceHolder1_tblChequeData #ctl00_ContentPlaceHolder1_lblChequeSum').text().replace(/\s/g, "");
                                            var checkAccountNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].AccountNumber;
                                            var checkBankNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BankNumber;
                                            var checkBranchNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BranchNumber;
                                            var asmachta = asmac;
                                            arrImg.push({
                                                "Asmachta": asmachta,
                                                "CheckAccountNumber": checkAccountNumber,
                                                "DepositeDate": depositeDate,
                                                "CheckBankNumber": checkBankNumber,
                                                "CheckBranchNumber": checkBranchNumber,
                                                "CheckNumber": checkNumber,
                                                "CheckTotal": checkTotal,
                                                "ImageNameKey": "x"
                                            });
                                            if (i + 1 == $(resPage).find('#ctl00_ContentPlaceHolder1_grvChequeList_ctl00 tbody tr').length) {
                                                if (arrImg.length) {
                                                    dfd.resolve(arrImg);
                                                } else {
                                                    dfd.resolve([{
                                                        "ImageNameKey": "x"
                                                    }]);
                                                }
                                            } else {
                                                indCheck = indCheck + 1;
                                                loadCheckQueue()
                                            }
                                        }
                                    }
                                    return false;
                                }
                            })
                        }

                        loadCheckQueue()
                    } else {
                        var url = 'https://mto.mizrahi-tefahot.co.il/' + mizrahiTefahot.urlPattern + '/GenericHandlers/Buffer.ashx?chequeIndex=' + chequeindex + '&nocache=' + Math.random() + '&c=' + controller;
                        if (mizrahiTefahot.xsrfToken !== undefined) {
                            url += "&mizrahixsrftoken=" + encodeURIComponent(mizrahiTefahot.xsrfToken);
                        }

                        var img = new Image();
                        img.src = url;
                        img.onload = function () {
                            $.ajax({
                                url: "https://mto.mizrahi-tefahot.co.il/Online/api/SkyBL/keepAlive",
                                data: null,
                                xhrFields: {
                                    withCredentials: true
                                },
                                beforeSend: function (xhr) {
                                    xhr.setRequestHeader('Upgrade-Insecure-Requests', '1')
                                    xhr.setRequestHeader('mizrahixsrftoken', mizrahiTefahot.xsrfToken)
                                },
                                method: "POST",
                                contentType: "application/json"
                            })

                            var canvas = document.createElement("canvas");
                            canvas.width = this.width;
                            canvas.height = this.height;
                            var ctx = canvas.getContext("2d");
                            ctx.drawImage(this, 0, 0);
                            var dataURL = canvas.toDataURL("image/jpeg", mizrahiTefahot.imageScale);
                            if ($(resPage).find('#lblDepChequeAccount').length || !$(resPage).find('#ctl00_ContentPlaceHolder1_tblChequeData').length) {
                                var formScr = $(resPage).find("form[name='aspnetForm'] script");
                                var ind;
                                $(formScr).each(function (i, v) {
                                    if ($(v).text().indexOf("pageWebParams") !== -1) {
                                        ind = i;
                                        return;
                                    }
                                })
                                try {
                                    eval(formScr[ind].innerText);
                                    var checkreturn;
                                    if (pageWebParams.chequeDetailsMethod == "GetChequeDetails") {
                                        var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/Osh/ShowCheque.aspx/GetChequeDetails";
                                        var jsons = {
                                            chequeIndex: 0,
                                            tnuaIndex: pageWebParams.currentIndex
                                        };
                                    } else if (pageWebParams.chequeDetailsMethod == "GetDelayedPaidChequeDetails") {
                                        var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/Osh/ShowCheque.aspx/GetDelayedPaidChequeDetails";
                                        var jsons = {
                                            tnuaIndex: pageWebParams.currentIndex
                                        };
                                    } else if (pageWebParams.chequeDetailsMethod == "GetReturnedChequeDetails") {
                                        checkreturn = true;
                                        var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/Osh/ShowCheque.aspx/GetReturnedChequeDetails";
                                        var jsons = {
                                            tnuaIndex: pageWebParams.currentIndex
                                        };
                                    }
                                    pageWebParams = undefined;
                                    all.banks.core.services.httpReq(url, 'POST', jsons, false, false)
                                        .then(function (response) {
                                            if (checkreturn == undefined) {
                                                var dataRes = response.d.split(':');
                                                var dates = dataRes[4];
                                                var asmachta = asmac;
                                                var checkAccountNumber = dataRes[2];
                                                var depositeDate = dates.split('/')[2] + '' + dates.split('/')[1] + '' + dates.split('/')[0];
                                                var checkBankNumber = dataRes[0].replace(/\D/g, "");
                                                var checkBranchNumber = dataRes[1];
                                                var checkNumber = dataRes[5].replace(/\s/g, "");
                                                var checkTotal = dataRes[3].replace(/\s/g, "");
                                            } else {
                                                var dataRes = JSON.parse(response.d);
                                                var asmachta = asmac;
                                                var checkAccountNumber = dataRes.account;
                                                var depositeDate = dataRes.date;
                                                var checkBankNumber = dataRes.bank.replace(/\D/g, "");
                                                var checkBranchNumber = dataRes.branch;
                                                var checkNumber = dataRes.serial;
                                                var checkTotal = dataRes.amount;
                                            }
                                            var checkBankNumberParam = (checkBankNumber == '') ? '' : parseInt(checkBankNumber);
                                            var uuid = checkBankNumberParam + '' + parseInt(checkBranchNumber) + '' + parseInt(checkAccountNumber) + '' + parseInt(checkNumber) + '' + parseInt(depositeDate) + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].AccountNumber;
                                            var formData = new FormData();
                                            var content = dataURL.replace(/^data:image\/(png|jpg|jpeg|JPEG);base64,/, "");
                                            var blob = new Blob([content], {
                                                type: "text/plain"
                                            });
                                            formData.append(uuid, blob);
                                            all.banks.accounts.mizrahiTefahot.sendChecksCtrl({
                                                formData: formData,
                                                params: {
                                                    imagenamekey: uuid,
                                                    bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BankNumber,
                                                    snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BranchNumber,
                                                    accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].AccountNumber
                                                }
                                            });
                                            dfd.resolve([{
                                                "Asmachta": asmachta,
                                                "CheckAccountNumber": checkAccountNumber,
                                                "DepositeDate": depositeDate,
                                                "CheckBankNumber": checkBankNumber,
                                                "CheckBranchNumber": checkBranchNumber,
                                                "CheckNumber": checkNumber,
                                                "CheckTotal": checkTotal,
                                                "ImageNameKey": uuid
                                            }]);
                                        })
                                        .fail(function (jqXHR, textStatus) {
                                            all.banks.generalVariables.numChecksNotWithdrawn += 1;
                                            dfd.resolve([{
                                                "ImageNameKey": "x"
                                            }]);
                                        });
                                } catch (e) {
                                    all.banks.generalVariables.numChecksNotWithdrawn += 1;
                                    dfd.resolve([{
                                        "ImageNameKey": "x"
                                    }]);
                                }
                            } else {
                                var dates = $(resPage).find('#ctl00_ContentPlaceHolder1_tblChequeData #ctl00_ContentPlaceHolder1_lblChequeDate').text();
                                var depositeDate = dates.split('/')[2] + '' + dates.split('/')[1] + '' + dates.split('/')[0];
                                var checkNumber = $(resPage).find('#ctl00_ContentPlaceHolder1_tblChequeData #ctl00_ContentPlaceHolder1_lblChequeNumber').text().replace(/\s/g, "");
                                var checkTotal = $(resPage).find('#ctl00_ContentPlaceHolder1_tblChequeData #ctl00_ContentPlaceHolder1_lblChequeSum').text().replace(/\s/g, "");
                                var checkAccountNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].AccountNumber;
                                var checkBankNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BankNumber;
                                var checkBranchNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BranchNumber;
                                var asmachta = asmac;
                                var checkBankNumberParam = (checkBankNumber == '') ? '' : parseInt(checkBankNumber);
                                var uuid = checkBankNumberParam + '' + parseInt(checkBranchNumber) + '' + parseInt(checkAccountNumber) + '' + parseInt(checkNumber) + '' + parseInt(depositeDate) + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].AccountNumber;
                                var formData = new FormData();
                                var content = dataURL.replace(/^data:image\/(png|jpg|jpeg|JPEG);base64,/, "");
                                var blob = new Blob([content], {
                                    type: "text/plain"
                                });
                                formData.append(uuid, blob);
                                all.banks.accounts.mizrahiTefahot.sendChecksCtrl({
                                    formData: formData,
                                    params: {
                                        imagenamekey: uuid,
                                        bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BankNumber,
                                        snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BranchNumber,
                                        accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].AccountNumber
                                    }
                                });
                                dfd.resolve([{
                                    "Asmachta": asmachta,
                                    "CheckAccountNumber": checkAccountNumber,
                                    "DepositeDate": depositeDate,
                                    "CheckBankNumber": checkBankNumber,
                                    "CheckBranchNumber": checkBranchNumber,
                                    "CheckNumber": checkNumber,
                                    "CheckTotal": checkTotal,
                                    "ImageNameKey": uuid
                                }]);
                            }
                        }
                        img.onerror = function () {
                            checkHasErr();
                        }

                        function checkHasErr() {
                            if ($(resPage).find('#lblDepChequeAccount').length || !$(resPage).find('#ctl00_ContentPlaceHolder1_tblChequeData').length) {
                                var formScr = $(resPage).find("form[name='aspnetForm'] script");
                                var ind;
                                $(formScr).each(function (i, v) {
                                    if ($(v).text().indexOf("pageWebParams") !== -1) {
                                        ind = i;
                                        return;
                                    }
                                })
                                try {
                                    eval(formScr[ind].innerText);
                                    var checkreturn;
                                    if (pageWebParams.chequeDetailsMethod == "GetChequeDetails") {
                                        var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/Osh/ShowCheque.aspx/GetChequeDetails";
                                        var jsons = {
                                            chequeIndex: 0,
                                            tnuaIndex: pageWebParams.currentIndex
                                        };
                                    } else if (pageWebParams.chequeDetailsMethod == "GetDelayedPaidChequeDetails") {
                                        var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/Osh/ShowCheque.aspx/GetDelayedPaidChequeDetails";
                                        var jsons = {
                                            tnuaIndex: pageWebParams.currentIndex
                                        };
                                    } else if (pageWebParams.chequeDetailsMethod == "GetReturnedChequeDetails") {
                                        checkreturn = true;
                                        var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/Osh/ShowCheque.aspx/GetReturnedChequeDetails";
                                        var jsons = {
                                            tnuaIndex: pageWebParams.currentIndex
                                        };
                                    } else {
                                        all.banks.generalVariables.numChecksNotWithdrawn += 1;
                                        dfd.resolve([{
                                            "ImageNameKey": "x"
                                        }]);
                                    }
                                    if (pageWebParams.chequeDetailsMethod != undefined) {
                                        pageWebParams = undefined;
                                        all.banks.core.services.httpReq(url, 'POST', jsons, false, false)
                                            .then(function (response) {
                                                if (checkreturn == undefined) {
                                                    var dataRes = response.d.split(':');
                                                    var dates = dataRes[4];
                                                    var asmachta = asmac;
                                                    var checkAccountNumber = dataRes[2];
                                                    var depositeDate = dates.split('/')[2] + '' + dates.split('/')[1] + '' + dates.split('/')[0];
                                                    var checkBankNumber = dataRes[0].replace(/\D/g, "");
                                                    var checkBranchNumber = dataRes[1];
                                                    var checkNumber = dataRes[5].replace(/\s/g, "");
                                                    var checkTotal = dataRes[3].replace(/\s/g, "");
                                                } else {
                                                    var dataRes = JSON.parse(response.d);
                                                    var asmachta = asmac;
                                                    var checkAccountNumber = dataRes.account;
                                                    var depositeDate = dataRes.date;
                                                    var checkBankNumber = dataRes.bank.replace(/\D/g, "");
                                                    var checkBranchNumber = dataRes.branch;
                                                    var checkNumber = dataRes.serial;
                                                    var checkTotal = dataRes.amount;
                                                }

                                                if (!checkBankNumber || !checkBranchNumber || !checkAccountNumber) {
                                                    checkBankNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BankNumber;
                                                    checkBranchNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BranchNumber;
                                                    checkAccountNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].AccountNumber;
                                                }

                                                dfd.resolve([{
                                                    "Asmachta": asmachta,
                                                    "CheckAccountNumber": checkAccountNumber,
                                                    "DepositeDate": depositeDate,
                                                    "CheckBankNumber": checkBankNumber,
                                                    "CheckBranchNumber": checkBranchNumber,
                                                    "CheckNumber": checkNumber,
                                                    "CheckTotal": checkTotal,
                                                    "ImageNameKey": "x"
                                                }]);
                                            })
                                            .fail(function (jqXHR, textStatus) {
                                                all.banks.generalVariables.numChecksNotWithdrawn += 1;
                                                dfd.resolve([{
                                                    "ImageNameKey": "x"
                                                }]);
                                            });
                                    }
                                } catch (e) {
                                    all.banks.generalVariables.numChecksNotWithdrawn += 1;
                                    dfd.resolve([{
                                        "ImageNameKey": "x"
                                    }]);
                                }
                            } else {
                                var dates = $(resPage).find('#ctl00_ContentPlaceHolder1_tblChequeData #ctl00_ContentPlaceHolder1_lblChequeDate').text();
                                var depositeDate = dates.split('/')[2] + '' + dates.split('/')[1] + '' + dates.split('/')[0];
                                var checkNumber = $(resPage).find('#ctl00_ContentPlaceHolder1_tblChequeData #ctl00_ContentPlaceHolder1_lblChequeNumber').text().replace(/\s/g, "");
                                var checkTotal = $(resPage).find('#ctl00_ContentPlaceHolder1_tblChequeData #ctl00_ContentPlaceHolder1_lblChequeSum').text().replace(/\s/g, "");
                                var checkAccountNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].AccountNumber;
                                var checkBankNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BankNumber;
                                var checkBranchNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BranchNumber;
                                var asmachta = asmac;
                                dfd.resolve([{
                                    "Asmachta": asmachta,
                                    "CheckAccountNumber": checkAccountNumber,
                                    "DepositeDate": depositeDate,
                                    "CheckBankNumber": checkBankNumber,
                                    "CheckBranchNumber": checkBranchNumber,
                                    "CheckNumber": checkNumber,
                                    "CheckTotal": checkTotal,
                                    "ImageNameKey": "x"
                                }]);
                                all.banks.generalVariables.numChecksNotWithdrawn += 1;
                            }
                        }
                    }
                } catch (err) {
                    all.banks.core.services.errorLog(err)
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
        return dfd.promise();
    };
    mizrahiTefahot.changBankAcc = function (i, type) {
        mizrahiTefahot.arr = [];
        if (mizrahiTefahot.AccountsAllJson == undefined) {
            var url = 'https://mto.mizrahi-tefahot.co.il/Online/GenericHandlers/ServicesReadAndWriteToSessionHandler.ashx?ServicesType=InnerServices&Action=ChangeAccount&Parameters=%7B%22selectedAccountIndex%22%3A' + i + '%7D';
            all.banks.core.services.httpReq(url, 'GET', null, false, false)
                .then(function (res) {
                    try {
                        if (typeof (res) == "string") {
                            res = JSON.parse(res);
                        }
                        console.log('changBankAcc', res);
                        var acc = {
                            'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                            'AccountNumber': parseInt(res.SnifAndNumber.split('-')[1]),
                            'BranchNumber': parseInt(res.SnifAndNumber.split('-')[0]),
                            'Balance': res.YitraAdkanit || 0, // res.YitraAdkanit,
                            'AccountCredit': res.Ashrai || 0  // res.Ashrai
                        };
                        nextStepAfterChangeAcc(type, acc);
                    } catch (err) {
                        all.banks.core.services.errorLog(err)
                    }
                })
                .fail(function (error, resErr, urlParam) {
                    var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                    all.banks.core.services.errorLog(logErr)
                });
        } else {
            var url = "https://mto.mizrahi-tefahot.co.il/online/api/SkyGeneralServices/getGeneralService?action=ChangeAccount&parameters=%7B%22selectedAccountIndex%22:" + mizrahiTefahot.AccountsAllJson[mizrahiTefahot.ind].idx + "%7D&servicesType=InnerServices";
            mizrahiTefahot.sender(url, "GET")
                .done(function (resp) {
//				var accCre = resp.Ashrai;
//				if (accCre == null) {
//					accCre = 0;
//				}
                    var acc = {
                        'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                        'AccountNumber': parseInt(mizrahiTefahot.AccountsAllJson[mizrahiTefahot.ind].Number),
                        'BranchNumber': parseInt(mizrahiTefahot.AccountsAllJson[mizrahiTefahot.ind].BranchForDispaly),
                        'Balance': resp.YitraAdkanit || 0, // resp.YitraAdkanit,
                        'AccountCredit': resp.Ashrai || 0 // accCre
                    }
                    console.log('changBankAcc', acc);
                    nextStepAfterChangeAcc(type, acc);
                })
        }

        function nextStepAfterChangeAcc(type, acc) {
            if (type == undefined) {
                myEmitterLogs(10, acc.AccountNumber); //change Acc
                all.banks.generalVariables.allDataArr.BankData[0].Account.push(acc);
                if (mizrahiTefahot.numberOfOptions == 1) {
                    mizrahiTefahot.loadOshPageMain();
                } else {
                    if (mizrahiTefahot.ind <= (mizrahiTefahot.numberOfOptions - 1)) {
                        mizrahiTefahot.loadOshPageMain();
                    }
                }
            } else if (type == "changBankAccAshrai") {
                all.banks.generalVariables.allDataArr.BankData[0].Account.push(acc);
                mizrahiTefahot.loadAsharaiMisgeret();
            } else if (type == "changBankAccLoan") {
                mizrahiTefahot.loadLoan(acc);
            } else if (type == "changBankAccDeposit") {
                mizrahiTefahot.loadDepositPahak(acc);
            } else if (type == "changBankAccDueChecks") {
                mizrahiTefahot.loadDueChecks(acc);
            } else if (type == "changBankAccStandingOrders") {
                mizrahiTefahot.loadStandingOrders(acc);
            } else if (type == "changBankAccMatah") {
                mizrahiTefahot.loadMatah(acc);
            }
        }
    };
    mizrahiTefahot.changBankAccAshrai = function (i) {
        mizrahiTefahot.arr = [];
        mizrahiTefahot.changBankAcc(i, "changBankAccAshrai");
    };
    mizrahiTefahot.changBankAccLoan = function (i) {
        mizrahiTefahot.changBankAcc(i, "changBankAccLoan");
    };
    mizrahiTefahot.changBankAccDeposit = function (i) {
        mizrahiTefahot.changBankAcc(i, "changBankAccDeposit");
    };
    mizrahiTefahot.changBankAccDueChecks = function (i) {
        mizrahiTefahot.changBankAcc(i, "changBankAccDueChecks");
    };
    mizrahiTefahot.changBankAccStandingOrders = function (i) {
        mizrahiTefahot.changBankAcc(i, "changBankAccStandingOrders");
    };
    mizrahiTefahot.changBankAccMatah = function (i) {
        mizrahiTefahot.changBankAcc(i, "changBankAccMatah");
    }


    mizrahiTefahot.sendChecksCtrl = function (formData) {
        all.banks.core.services.sendChecks(formData)
            .then(function (arr) {
                all.banks.generalVariables.numChecksDrawn = all.banks.generalVariables.numChecksDrawn + 1;
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.mizrahiTefahot.sendChecksCtrl(formData)
                }
            })
    };

    mizrahiTefahot.sendChecksCtrlNew = async function (formData) {
        const dfd = jQuery.Deferred();

        function senderCheck() {
            all.banks.core.services.sendChecks(formData)
                .then(function (arr) {
                    all.banks.generalVariables.numChecksDrawn = all.banks.generalVariables.numChecksDrawn + 1;
                    dfd.resolve(true)
                })
                .fail(function (error, resErr) {
                    if (error == 'discard') {
                        senderCheck()
                    } else {
                        dfd.resolve(false)
                    }
                })
        }

        senderCheck()

        return dfd.promise();
    };
    mizrahiTefahot.sender = function (url, method, params, isForm) {
        var dfd = jQuery.Deferred();
        monitorActivityClass.setIntervalActivity();

        let senderFunc;
        if (method === 'POST') {
            if (!isForm) {
                senderFunc = mizrahiTefahot.senderPostJSON(
                    url,
                    'https://mto.mizrahi-tefahot.co.il/OnlineApp/',
                    mizrahiTefahot.cookies,
                    JSON.stringify(params)
                )
            } else {
                senderFunc = mizrahiTefahot.senderPostForm(
                    url,
                    'https://mto.mizrahi-tefahot.co.il/OnlineApp/',
                    mizrahiTefahot.cookies,
                    params
                )
            }
        } else {
            senderFunc = mizrahiTefahot.senderGet(
                url,
                'https://mto.mizrahi-tefahot.co.il/OnlineApp/',
                mizrahiTefahot.cookies
            )
        }
        senderFunc.then((...args) => {
            let [error, response, data] = args[0];
            if (error) {
                dfd.reject(error);
            } else {
                try {
                    if (data && typeof data === 'string') {
                        try {
                            data = JSON.parse(data);
                        } catch (e) {

                        }
                    }
                    if (data && typeof data === 'string') {
                        try {
                            data = JSON.parse(data);
                        } catch (e) {

                        }
                    }
                    dfd.resolve(data)
                } catch (e) {
                    dfd.reject(e);
                }
            }
        })
        // $.ajax(Object.assign({
        //     url: url,
        //     xhrFields: {
        //         withCredentials: true
        //     },
        //     beforeSend: function (xhr) {
        //         xhr.setRequestHeader('mizrahixsrftoken', mizrahiTefahot.xsrfToken)
        //     },
        //     method: method
        // }, (method === 'POST'
        //         ? {
        //             data: JSON.stringify(params),
        //             contentType: "application/json; charset=UTF-8"
        //         }
        //         : {}
        // ))).done(function (resp) {
        //     try {
        //         if (typeof (resp) == "string") {
        //             resp = JSON.parse(resp);
        //         }
        //     } catch (e) {
        //     }
        //
        //     dfd.resolve(resp)
        // }).fail(function (jqXHR, textStatus, errorThrown) {
        //     dfd.reject(errorThrown);
        // });

        return dfd.promise();
    }
    mizrahiTefahot.getOsh = async function () {
        function getServiceName(ofi) {
            var serviceName = null;
            switch (ofi) {
                case"00":
                    break;
                case"01":
                    serviceName = "GetCheque";
                    break;
                case"03":
                    serviceName = "GetOutChequesOfDeposit";
                    break;
                case"05":
                    serviceName = "GetPaidDelayedCheques";
                    break;
                case"06":
                    serviceName = "GetPaidDelayedCheques";
                    break;
                case"07":
                    serviceName = "getIncReturnedCheques";
                    break;
                case"08":
                    serviceName = "getOutReturnedCheques";
                    break;
                default:
                    serviceName = null
            }
            return serviceName
        }

        async function getTransferData(item) {
            const dfd = jQuery.Deferred();

            try {
                const dateToFormat = new Date(item.MC02PeulaTaaEZ);
                const MC02PeulaTaaEZFormat =
                    ("0" + (dateToFormat.getDate())).slice(-2) +
                    '/' +
                    ("0" + (dateToFormat.getMonth() + 1)).slice(-2) +
                    '/' +
                    dateToFormat.getFullYear();

                const transferData = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/api/OSH/getMaherBerurimSMF", "POST", {
                    "inKodGorem": item.MC02KodGoremEZ,
                    "inAsmachta": item.MC02AsmahtaMekoritEZ,
                    "inSchum": Number(item.MC02SchumEZ),
                    "inNakvanit": item.MC02KodGoremEZ,
                    "inSugTnua": item.MC02SugTnuaKaspitEZ,
                    "inAgid": item.MC02AgidEZ,
                    "inTarPeulaFormatted": MC02PeulaTaaEZFormat,
                    "inTarErechFormatted": MC02PeulaTaaEZFormat,
                    "inKodNose": item.MC02SeifMaralEZ,
                    "inKodTatNose": item.MC02NoseMaralEZ,
                    "inTransactionNumber": item.TransactionNumber
                });

                if (transferData && transferData.body && transferData.body.fields && transferData.body.fields.length && transferData.body.fields[0].length && transferData.body.fields[0][0].Records && transferData.body.fields[0][0].Records.length) {
                    const records = transferData.body.fields[0][0].Records;
                    const transferDataArr = [];
                    for (let i = 0; i < records.length; i++) {
                        const record = records[i];
                        if (record.Fields && record.Fields.length) {
                            const idxBank = record.Fields.findIndex((it) => it.Label.includes('בנק'));
                            let idxBranch = record.Fields.findIndex((it) => it.Label.includes('סניף חובה') || it.Label.includes('סניף מזוכה'));
                            const idxAcc = record.Fields.findIndex((it) => it.Label.includes('חשבון'));
                            const idxDetails = record.Fields.findIndex((it) => it.Label.includes('מהות'));
                            const idxNamePayerTransfer = record.Fields.findIndex((it) => it.Label.includes('שם מוטב') || it.Label.includes('שם המעביר') || it.Label.includes('שם מעביר') || it.Label.includes('שם לקוח'));
                            const idxDepositeTransferDate = record.Fields.findIndex((it) => it.Label.includes('תאריך'));
                            const idxDetails1 = record.Fields.findIndex((it) => it.Label.includes('תיאור'));
                            if (idxBranch === -1) {
                                idxBranch = record.Fields.findIndex((it) => it.Label.includes('סניף'));
                            }
                            let idxDetailsVal = '';
                            if (idxDetails !== -1) {
                                idxDetailsVal = record.Fields[idxDetails].Value.replace(/\s\s+/g, "").replace(/\u0000/g, "")
                            }
                            const idxEssence = record.Fields.findIndex((it) => it.Label.includes('מהות העברה'));
                            let idxEssenceVal = '';
                            if (idxEssence !== -1) {
                                idxEssenceVal = record.Fields[idxEssence].Value.replace(/\s\s+/g, "").replace(/\u0000/g, "")
                            }
                            let detailsTransfer = ((idxDetailsVal !== '') && (idxDetails1 !== -1))
                                ? (idxDetailsVal + ' ' + record.Fields[idxDetails1].Value.replace(/\s\s+/g, ""))
                                : (idxDetailsVal !== '') ? idxDetailsVal : ((idxDetails1 !== -1) ? record.Fields[idxDetails1].Value.replace(/\s\s+/g, "") : null)

                            if (idxEssenceVal) {
                                if (detailsTransfer) {
                                    detailsTransfer += ' ' + idxEssenceVal;
                                } else {
                                    detailsTransfer = idxEssenceVal;
                                }
                            } else {
                                if (idxAcc !== -1) {
                                    if (detailsTransfer) {
                                        detailsTransfer += ' ' + record.Fields[idxAcc].Value.replace(/\s\s+/g, "").replace(/\u0000/g, "");
                                    } else {
                                        detailsTransfer = record.Fields[idxAcc].Value.replace(/\s\s+/g, "").replace(/\u0000/g, "");
                                    }
                                }
                            }
                            transferDataArr.push({
                                "DepositeTransferDate": (idxDepositeTransferDate !== -1) ? (record.Fields[idxDepositeTransferDate].Value.includes('/') ? record.Fields[idxDepositeTransferDate].Value : all.banks.core.services.convertDateAll(record.Fields[idxDepositeTransferDate].Value)) : all.banks.core.services.convertDateAll(item.MC02PeulaTaaEZ),
                                "BankTransferNumber": (idxBank !== -1) ? record.Fields[idxBank].Value.replace(/\D/g, "") : null,
                                "BranchTransferNumber": (idxBranch !== -1 && record.Fields[idxBranch].Value.replace(/\D/g, "") !== "")
                                    ? record.Fields[idxBranch].Value.replace(/\D/g, "")
                                    : all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.generalVariables.allDataArr.BankData[0].Account.length - 1].BranchNumber,
                                "AccountTransferNumber": (idxAcc !== -1) ? record.Fields[idxAcc].Value.replace(/\D/g, "") : null,
                                // "NamePayerTransfer": (idxNamePayerTransfer !== -1) ? record.Fields[idxNamePayerTransfer].Value.replace(/\s\s+/g, "") + (idxDetailsVal !== '' ? (' - ' + idxDetailsVal) : '') : null,
                                "NamePayerTransfer": (idxNamePayerTransfer !== -1) ? record.Fields[idxNamePayerTransfer].Value.replace(/\s\s+/g, "") : null,
                                "DetailsTransfer": detailsTransfer,
                                "TransferTotal": item.MC02SchumEZ
                            })
                        }
                    }
                    dfd.resolve(transferDataArr)
                } else {
                    dfd.resolve(null)
                }
            } catch (e) {
                dfd.resolve(null)
            }

            return dfd.promise();
        }

        async function getChecks(item, indexRowCheck, ofi) {
            try {
                if ("07" !== ofi && "08" !== ofi) {
                    if ("01" !== ofi) {
                        const getOshChequesList = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/api/OSH/getOshChequesList", "POST", {
                            "ServiceName": getServiceName(ofi),
                            "ChequeIndex": indexRowCheck,
                            "DepInx": 0
                        });
                        const {table} = getOshChequesList.body;
                        if (table && table.rows) {
                            let depInx = 0;
                            if ("05" === ofi && isFinite(Number(item.Asmachta))) {
                                const asmachtaToFind = Number(item.Asmachta);
                                depInx = table.rows.findIndex(row => asmachtaToFind === row.ChequeSerial && (Math.abs(row.ChequeAmount) === Math.abs(item.TransTotal)));
                                if (depInx === -1 && asmachtaToFind.toString().length < 8) {
                                    depInx = table.rows.findIndex(row => (row.ChequeSerial.toString().endsWith(asmachtaToFind.toString())) && (Math.abs(row.ChequeAmount) === Math.abs(item.TransTotal)));
                                }
                            }

                            const getChequeOutImg = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/api/OSH/" + (
                                "07" === ofi
                                    ? 'getIncReturnedCheques' :
                                    "08" === ofi ? 'getOutReturnedCheques'
                                        : "05" === ofi ? 'getChequeOutImg'
                                            : 'getAllChequeOutImg'
                            ), "POST", {
                                "ChequeIndex": indexRowCheck,
                                "DepInx": Math.max(0, depInx)
                            });
                            const bodyChecks = getChequeOutImg.body;
                            const rowsImgs = (bodyChecks && bodyChecks.table && bodyChecks.table.rows && bodyChecks.table.rows.length) ? bodyChecks.table.rows : null;
                            const rows = table.rows;


                            if ("05" === ofi && Array.isArray(rowsImgs) && rowsImgs.length === 1 && depInx >= 0) {
                                const row = rows[depInx];
                                const idxAcc = all.banks.generalVariables.allDataArr.BankData[0].Account.length - 1;
                                const depositDateDDMMYYYY = all.banks.core.services.convertDateAll(row.DepositDate).split("/");
                                let uuid = "x";

                                let ImageNameKey = (typeof rowsImgs[0] === 'object' && rowsImgs[0].ChequeImageByteArray)
                                    ? rowsImgs[0].ChequeImageByteArray : null;
                                if (ImageNameKey !== null) {
                                    const formData = new FormData();
                                    const content = ImageNameKey.replace(/^data:image\/(png|jpg|jpeg|JPEG);base64,/, "");
                                    const blob = new Blob([content], {
                                        type: "text/plain"
                                    });
                                    uuid = row.ChequeBank + '' + row.ChequeBranch + '' + row.ChequeAccount + '' + row.ChequeSerial
                                        + '' + depositDateDDMMYYYY[2] + depositDateDDMMYYYY[1] + depositDateDDMMYYYY[0]
                                        //                                        + '' + row.DepositDate
                                        + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].BankNumber
                                        + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].BranchNumber
                                        + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].AccountNumber;
                                    formData.append(uuid, blob);
                                    const sucSenderCheck = await all.banks.accounts.mizrahiTefahot.sendChecksCtrlNew({
                                        formData: formData,
                                        params: {
                                            imagenamekey: uuid,
                                            bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].BankNumber,
                                            snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].BranchNumber,
                                            accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].AccountNumber
                                        }
                                    });
                                    if (!sucSenderCheck) {
                                        uuid = "x"
                                    }
                                }

                                return [{
                                    "Asmachta": item.Asmachta,
                                    "CheckAccountNumber": row.ChequeAccount,
                                    "DepositeDate": depositDateDDMMYYYY.join('/'),
//                                    "DepositeDate": all.banks.core.services.convertDateAll(row.DepositDate),
                                    "CheckBankNumber": row.ChequeBank,
                                    "CheckBranchNumber": row.ChequeBranch,
                                    "CheckNumber": row.ChequeSerial,
                                    "CheckTotal": row.ChequeAmount,
                                    "ImageNameKey": uuid
                                }];
                            }

                            const arrImg = [];
                            for (let indexRow = 0; indexRow < rows.length; indexRow++) {
                                const row = rows[indexRow];
                                const idxAcc = all.banks.generalVariables.allDataArr.BankData[0].Account.length - 1;
                                const depositDateDDMMYYYY = all.banks.core.services.convertDateAll(row.DepositDate).split("/");
                                let uuid = row.ChequeBank + '' + row.ChequeBranch + '' + row.ChequeAccount + '' + row.ChequeSerial
                                    + '' + depositDateDDMMYYYY[2] + depositDateDDMMYYYY[1] + depositDateDDMMYYYY[0]
                                    //                                        + '' + row.DepositDate
                                    + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].AccountNumber;

                                let ImageNameKey = (rowsImgs && Array.isArray(rowsImgs))
                                    ? ((typeof rowsImgs[indexRow] === 'object' && rowsImgs[indexRow].ChequeImageByteArray) ? rowsImgs[indexRow].ChequeImageByteArray : rowsImgs[indexRow])
                                    : null;
                                if (ImageNameKey !== null) {
                                    const formData = new FormData();
                                    const content = ImageNameKey.replace(/^data:image\/(png|jpg|jpeg|JPEG);base64,/, "");
                                    const blob = new Blob([content], {
                                        type: "text/plain"
                                    });
                                    formData.append(uuid, blob);
                                    const sucSenderCheck = await all.banks.accounts.mizrahiTefahot.sendChecksCtrlNew({
                                        formData: formData,
                                        params: {
                                            imagenamekey: uuid,
                                            bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].BankNumber,
                                            snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].BranchNumber,
                                            accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].AccountNumber
                                        }
                                    });
                                    if (!sucSenderCheck) {
                                        uuid = "x"
                                    }
                                } else {
                                    uuid = "x"
                                }

                                arrImg.push({
                                    "Asmachta": item.Asmachta,
                                    "CheckAccountNumber": row.ChequeAccount,
                                    "DepositeDate": depositDateDDMMYYYY.join('/'),
//                                    "DepositeDate": all.banks.core.services.convertDateAll(row.DepositDate),
                                    "CheckBankNumber": row.ChequeBank,
                                    "CheckBranchNumber": row.ChequeBranch,
                                    "CheckNumber": row.ChequeSerial,
                                    "CheckTotal": row.ChequeAmount,
                                    "ImageNameKey": uuid
                                })
                            }
                            return arrImg;
                        } else {
                            return null;
                        }
                    } else {
                        const getChequeOutImg = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/api/OSH/getChequeImg", "POST", {
                            "ChequeIndex": indexRowCheck,
                            "DepInx": 0
                        });
                        const {table} = getChequeOutImg.body;
                        if (table && table.rows) {
                            const rows = table.rows;
                            const arrImg = [];
                            for (let indexRow = 0; indexRow < rows.length; indexRow++) {
                                const row = rows[indexRow];
                                const idxAcc = all.banks.generalVariables.allDataArr.BankData[0].Account.length - 1;
                                var dateLast = item.ValueDate.split("/")[2] + item.ValueDate.split("/")[0] + item.ValueDate.split("/")[1];
                                let uuid = all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].AccountNumber + '' + item.Asmachta + '' + parseInt(dateLast) + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].AccountNumber;
                                let ImageNameKey = row.ChequeImageByteArray || null;
//                                        (row && Array.isArray(row))
//                                    ? ((typeof row[indexRow] === 'object' && row[indexRow].ChequeImageByteArray) ? row[indexRow].ChequeImageByteArray : row[indexRow])
//                                    : null;
                                if (ImageNameKey !== null) {
                                    const formData = new FormData();
                                    const content = ImageNameKey.replace(/^data:image\/(png|jpg|jpeg|JPEG);base64,/, "");
                                    const blob = new Blob([content], {
                                        type: "text/plain"
                                    });
                                    formData.append(uuid, blob);
                                    const sucSenderCheck = await all.banks.accounts.mizrahiTefahot.sendChecksCtrlNew({
                                        formData: formData,
                                        params: {
                                            imagenamekey: uuid,
                                            bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].BankNumber,
                                            snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].BranchNumber,
                                            accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].AccountNumber
                                        }
                                    });
                                    if (!sucSenderCheck) {
                                        uuid = "x";
                                    }
                                } else {
                                    uuid = "x";
                                }

                                arrImg.push({
                                    "Asmachta": item.Asmachta,
                                    "CheckAccountNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].AccountNumber,
                                    "DepositeDate": all.banks.core.services.convertDateAll(row.DepositDate),
                                    "CheckBankNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].BankNumber,
                                    "CheckBranchNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].BranchNumber,
                                    "CheckNumber": item.Asmachta,
                                    "CheckTotal": item.TransTotal,
                                    "ImageNameKey": uuid
                                })
                            }

                            return arrImg;
                        } else {
                            return null;
                        }
                    }

                } else {
                    const getChequeOutImg = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/api/OSH/" + (
                        "07" === ofi
                            ? 'getIncReturnedCheques' :
                            "08" === ofi ? 'getOutReturnedCheques'
                                : "05" === ofi ? 'getChequeOutImg'
                                    : 'getAllChequeOutImg'
                    ), "POST", {
                        "ChequeIndex": indexRowCheck,
                        "DepInx": 0
                    });
                    const bodyChecks = getChequeOutImg.body;
                    const rowsImgs = (bodyChecks && bodyChecks.table && bodyChecks.table.rows && bodyChecks.table.rows.length) ? bodyChecks.table.rows : null;
                    const arrImg = [];
                    for (let indexRow = 0; indexRow < rowsImgs.length; indexRow++) {
                        const row = rowsImgs[indexRow];
                        const idxAcc = all.banks.generalVariables.allDataArr.BankData[0].Account.length - 1;

                        let uuid = row.BankElec + '' + row.BranchElec + '' + row.AccountElec + '' + row.AsmachtaElec + '' + row.DateElec + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].AccountNumber;

                        let ImageNameKey = row.ImageByteArray;
                        if (ImageNameKey !== null) {
                            const formData = new FormData();
                            const content = ImageNameKey.replace(/^data:image\/(png|jpg|jpeg|JPEG);base64,/, "");
                            const blob = new Blob([content], {
                                type: "text/plain"
                            });
                            formData.append(uuid, blob);
                            const sucSenderCheck = await all.banks.accounts.mizrahiTefahot.sendChecksCtrlNew({
                                formData: formData,
                                params: {
                                    imagenamekey: uuid,
                                    bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].BankNumber,
                                    snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].BranchNumber,
                                    accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[idxAcc].AccountNumber
                                }
                            });
                            if (!sucSenderCheck) {
                                uuid = "x"
                            }
                        } else {
                            uuid = "x"
                        }

                        arrImg.push({
                            "Asmachta": item.Asmachta,
                            "CheckAccountNumber": row.AccountElec,
                            "DepositeDate": all.banks.core.services.convertDateAll(row.DateElec),
                            "CheckBankNumber": row.BankElec,
                            "CheckBranchNumber": row.BranchElec,
                            "CheckNumber": row.AsmachtaElec,
                            "CheckTotal": row.Amount,
                            "ImageNameKey": uuid
                        })
                    }

                    return arrImg;
                }
            } catch (e) {
                return null;
            }
        }

        try {
            for (let i = 0; i < mizrahiTefahot.AccountsAllJson.length; i++) {
                const idxAcc = mizrahiTefahot.AccountsAllJson[i].idx;
                const account = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/online/api/SkyGeneralServices/getGeneralService?action=ChangeAccount&parameters={%22selectedAccountIndex%22:" + idxAcc + "}&servicesType=InnerServices", "GET");
                const acc = {
                    'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                    'AccountNumber': parseInt(mizrahiTefahot.AccountsAllJson[i].Number),
                    'BranchNumber': parseInt(mizrahiTefahot.AccountsAllJson[i].BranchForDispaly),
                    'Balance': account.YitraAdkanit || 0,
                    'AccountCredit': account.Ashrai || 0,
                    'DataRow': []
                }
                myEmitterLogs(10, acc.AccountNumber);
                all.banks.generalVariables.allDataArr.BankData[0].Account.push(acc);
                console.log('changBankAcc', acc);
                const oshTable = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/api/SkyOSH/get428Index", "POST",
                    {
                        "inToDate": mizrahiTefahot.dateTill,
                        "inFromDate": mizrahiTefahot.dateFrom,
                        "inSugTnua": "",
                        "table": {
                            "sortExpression": "MC02PeulaTaaEZ ASC",
                            "sortOrder": "ASC",
                            "startRowIndex": 0,
                            "maxRow": 9999999,
                            "actionGuid": ""
                        }
                    });
                // exportJson.writeFileWithFolder('./OutputMizrahiOSH/' + all.banks.accountDetails.bank.token + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getHours() + '_' + new Date().getMinutes() + '_' + new Date().getSeconds() + '_' + acc.AccountNumber + '.json', oshTable, {spaces: 4}, function (err) {
                //     if (err) {
                //         console.log('Error writing file');
                //     }
                // });
                if (oshTable && oshTable.body) {
                    const {table, fields} = oshTable.body;
                    if (fields) {
                        if (all.banks.generalVariables.allDataArr.BankData[0].Account[i].Balance === 0 && fields.Yitra) {
                            all.banks.generalVariables.allDataArr.BankData[0].Account[i].Balance = Number(fields.Yitra);
                        }
                        if (all.banks.generalVariables.allDataArr.BankData[0].Account[i].AccountCredit === 0 && fields.Ashrai) {
                            all.banks.generalVariables.allDataArr.BankData[0].Account[i].AccountCredit = Number(fields.Ashrai);
                        }
                    }
                    if (table && table.rows) {
                        let tableOfSalaries = null;

                        try {
                            const getPreviousTransfersList483 = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/api/Transfers/getPreviousTransfersList483", "POST",
                                {
                                    "TaarichAd": mizrahiTefahot.dateTillSalary,
                                    "TaarichMe": mizrahiTefahot.dateFromSalary,
                                    "SugBakasha": 5
                                });
                            if (getPreviousTransfersList483 && getPreviousTransfersList483.body && getPreviousTransfersList483.body.table && getPreviousTransfersList483.body.table.rows) {
                                tableOfSalaries = getPreviousTransfersList483.body.table.rows;
                            }
                        } catch (errSalary) {

                        }


                        const rows = table.rows;
                        for (let indexRow = 0; indexRow < rows.length; indexRow++) {
                            const row = rows[indexRow];

                            if (row['RecType'] && row['Icone'] !== "" && row['MC02OfiTnuaEZ'] !== "") {
                                let BankTransferNumber = null;
                                let BranchTransferNumber = null;
                                let AccountTransferNumber = null;
                                let DetailsTransfer = null;
                                let NamePayerTransfer = null;
                                if (row.P428G2Details) {
                                    const idxBank = row.P428G2Details.findIndex((it) => it.MC02DetailsKoteretEZ.includes('בנק'));
                                    let idxBranch = row.P428G2Details.findIndex((it) => it.MC02DetailsKoteretEZ.includes('סניף חובה') || it.MC02DetailsKoteretEZ.includes('סניף מזוכה'));
                                    const idxAcc = row.P428G2Details.findIndex((it) => it.MC02DetailsKoteretEZ.includes('חשבון'));
                                    BankTransferNumber = (idxBank !== -1) ? row.P428G2Details[idxBank].MC02DetailsErechEZ.replace(/\D/g, "") : null;
                                    AccountTransferNumber = (idxAcc !== -1) ? row.P428G2Details[idxAcc].MC02DetailsErechEZ.replace(/\D/g, "") : null;
                                    const idxDetails = row.P428G2Details.findIndex((it) => it.MC02DetailsKoteretEZ.includes('מהות'));
                                    DetailsTransfer = (idxDetails !== -1) ? row.P428G2Details[idxDetails].MC02DetailsErechEZ : null;
                                    if (idxBranch === -1) {
                                        idxBranch = row.P428G2Details.findIndex((it) => it.MC02DetailsKoteretEZ.includes('סניף'));
                                    }
                                    BranchTransferNumber = (idxBranch !== -1 && row.P428G2Details[idxBranch].MC02DetailsErechEZ.replace(/\D/g, "") !== "")
                                        ? row.P428G2Details[idxBranch].MC02DetailsErechEZ.replace(/\D/g, "")
                                        : all.banks.generalVariables.allDataArr.BankData[0].Account[i].BranchNumber;
                                    const idxNamePayerTransfer = row.P428G2Details.findIndex((it) => it.MC02DetailsKoteretEZ.includes('שם מוטב') || it.MC02DetailsKoteretEZ.includes('שם המעביר') || it.MC02DetailsKoteretEZ.includes('שם לקוח'));
                                    NamePayerTransfer = (idxNamePayerTransfer !== -1) ? row.P428G2Details[idxNamePayerTransfer].MC02DetailsErechEZ : null;
                                }


                                let DepositeTransferData = null;
                                if (row.MC02KodGoremEZ === '631' && row.MC02SeifMaralEZ === '94' && tableOfSalaries && tableOfSalaries.length) {
                                    const idxOfSalary = tableOfSalaries.findIndex(it => Math.abs(it.Schum3) === Math.abs(row.MC02SchumEZ) && Number(it.AsmachtaChavila3) === Number(row.MC02AsmEZ || row.MC02AsmahtaMekoritEZ));
                                    const getMutavimOfSalary = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/api/Transfers/getMutavimOfSalary", "POST", {"index": idxOfSalary});
                                    if (getMutavimOfSalary && getMutavimOfSalary.body && getMutavimOfSalary.body.table && getMutavimOfSalary.body.table.rows) {
                                        const tableOfSalaries_row = getMutavimOfSalary.body.table.rows;
                                        if (tableOfSalaries_row && tableOfSalaries_row.length) {
                                            DepositeTransferData = [];
                                            const TaarichBitzua3 = tableOfSalaries[idxOfSalary].TaarichBitzua3;
                                            const DepositeTransferDateParent = new Date(Number(TaarichBitzua3.slice(0, 4)), Number(TaarichBitzua3.slice(4, 6)) - 1, Number(TaarichBitzua3.slice(6, 8))).toISOString()
                                            for (let indexRowSalary = 0; indexRowSalary < tableOfSalaries_row.length; indexRowSalary++) {
                                                const row_salary = tableOfSalaries_row[indexRowSalary];
                                                DepositeTransferData.push({
                                                    "DepositeTransferDate": all.banks.core.services.convertDateAll(DepositeTransferDateParent),
                                                    "BankTransferNumber": Number(row_salary.BankMutav4),
                                                    "BranchTransferNumber": Number(row_salary.SnifMutav4),
                                                    "AccountTransferNumber": Number(row_salary.ChnMutav4),
                                                    "NamePayerTransfer": row_salary.ShemMutav4,
                                                    "DetailsTransfer": tableOfSalaries[idxOfSalary].TeurHaavara,
                                                    "TransferTotal": Math.abs(row_salary.Schum4)
                                                })
                                            }
                                        }
                                    }
                                }


                                let runOnCheck = false;
                                if ((all.banks.accountDetails.checks === true && ("01" === row.MC02OfiTnuaEZ || "03" === row.MC02OfiTnuaEZ || "05" === row.MC02OfiTnuaEZ || "06" === row.MC02OfiTnuaEZ || "07" === row.MC02OfiTnuaEZ || "08" === row.MC02OfiTnuaEZ))) {
                                    runOnCheck = true;
                                }
                                all.banks.generalVariables.allDataArr.BankData[0].Account[i].DataRow.push({
                                    "Asmachta": row.MC02AsmEZ || row.MC02AsmahtaMekoritEZ,
                                    "TransDesc": all.banks.core.services.getStringJson(row.MC02TnuaTeurEZ),
                                    "ValueDate": all.banks.core.services.convertDateAll(row.MC02PeulaTaaEZ),
                                    "TransactionType": Number(row.MC02OfiSchumEZ) === 1 ? 1 : 0,
                                    "TransTotal": Math.abs(row.MC02SchumEZ),
                                    "Balance": (row.MC02YitraEZ === Number.MAX_VALUE || Math.abs(row.MC02YitraEZ) === Number.MAX_VALUE) ? null : row.MC02YitraEZ,
                                    "IsDaily": Number(row.IsTodayTransaction),
                                    "imgs": (runOnCheck) ? [all.banks.generalVariables.allDataArr.BankData[0].Account[i].DataRow.length, row.MC02OfiTnuaEZ] : null,
                                    "DepositeTransferData": row.P428G2Details ? [{
                                        "DepositeTransferDate": all.banks.core.services.convertDateAll(row.MC02PeulaTaaEZ),
                                        "BankTransferNumber": BankTransferNumber,
                                        "BranchTransferNumber": BranchTransferNumber,
                                        "AccountTransferNumber": AccountTransferNumber,
                                        "NamePayerTransfer": NamePayerTransfer,
                                        "DetailsTransfer": DetailsTransfer,
                                        "TransferTotal": row.MC02SchumEZ
                                    }] : row.MC02ShowDetailsEZ === "1" ? await getTransferData(row) : DepositeTransferData
                                })
                            }
                        }

                        if (all.banks.accountDetails.checks === true) {
                            const groupChecksRows = all.banks.generalVariables.allDataArr.BankData[0].Account[i].DataRow.filter((row) => row.imgs !== null);
                            if (groupChecksRows && groupChecksRows.length) {
                                for (let indexRowCheck = 0; indexRowCheck < groupChecksRows.length; indexRowCheck++) {
                                    const rowOfCheck = groupChecksRows[indexRowCheck];
                                    all.banks.generalVariables.allDataArr.BankData[0].Account[i].DataRow[rowOfCheck.imgs[0]].imgs = await getChecks(rowOfCheck, indexRowCheck, rowOfCheck.imgs[1])
                                }
                            }
                        }

                    }
                }
            }

            mizrahiTefahot.sendOshCtrl();
        } catch (e) {
            if (all.banks.accountDetails.ccardMonth > 0) {
                //mizrachi.changeAccount("cards");
                mizrahiTefahot.ind = 0;
                if (!all.banks.spiderConfig.isMizrahiJson) {
                    mizrahiTefahot.getAshrai();
                } else {
                    mizrahiTefahot.changBankAccAshrai(mizrahiTefahot.ind);
                }
            } else if (all.banks.accountDetails.IND_NILVIM > 0) {
                mizrahiTefahot.ind = 0;
                myEmitterLogs(21);
                mizrahiTefahot.changBankAccLoan(mizrahiTefahot.ind);
            } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                mizrahiTefahot.ind = 0;
                myEmitterLogs(34);
                mizrahiTefahot.changBankAccMatah(mizrahiTefahot.ind);
            } else {
                all.banks.accounts.mizrahiTefahot.logOff();
            }
        }
    }

    mizrahiTefahot.getAshrai = async function () {
        try {
            function tryParseCurrentAndTotalPayments(candidates) {
                if (!Array.isArray(candidates)) {
                    return [null, null];
                }

                for (let cndIdx = 0; cndIdx < candidates.length; cndIdx++) {
                    const candidate = candidates[cndIdx] ? candidates[cndIdx].trim() : '';
                    const matchPymnts = /(\d{1,2})\W*(מ|מתוך)\W*(\d{1,2})/g.exec(candidate);
                    if (matchPymnts !== null) {
                        return [matchPymnts[1], matchPymnts[3]];
                    }
                }

                return [null, null];
            }

            try {
                for (let i = 0; i < mizrahiTefahot.AccountsAllJson.length; i++) {
                    myEmitterLogs(33, parseInt(mizrahiTefahot.AccountsAllJson[i].Number));
                    const idxAcc = mizrahiTefahot.AccountsAllJson[i].idx;
                    const account = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/online/api/SkyGeneralServices/getGeneralService?action=ChangeAccount&parameters=%7B%22selectedAccountIndex%22:" + idxAcc + "%7D&servicesType=InnerServices", "GET");
                    const getAllCreditCards = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/api/CC/getAllCreditCards", "POST", {});
                    if (getAllCreditCards && getAllCreditCards.body) {
                        const {bankCreditCardsList} = getAllCreditCards.body;
                        if (bankCreditCardsList && bankCreditCardsList.length) {
                            const getAllCreditCardsMonths = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/api/CC/getCCMonthList", "POST", {"SugBakasha": "1"});
                            if (getAllCreditCardsMonths && getAllCreditCardsMonths.body && Array.isArray(getAllCreditCardsMonths.body.myCCMonthsList) && getAllCreditCardsMonths.body.myCCMonthsList.length) {

                                try {
                                    if (getAllCreditCardsMonths.body.myCCMonthsList.every(moncc => moncc.isCurrentMonth === false && moncc.isFuture === true)) {
                                        const firstMonth = getAllCreditCardsMonths.body.myCCMonthsList[0].month;
                                        const month = new Date(Number(firstMonth.slice(-4)), Number(firstMonth.slice(0, 2) - 1), 1)
                                        month.setMonth(month.getMonth() - 1)
                                        const dateOflastMonth = new Date(month)
                                        getAllCreditCardsMonths.body.myCCMonthsList.unshift({
                                            month: ("0" + (dateOflastMonth.getMonth() + 1)).slice(-2) + '' + dateOflastMonth.getFullYear(),
                                            isCurrentMonth: true,
                                            isFuture: false,
                                            totalCharge: "0",
                                            totalChargeDollar: "0",
                                            totalChargeEuro: "0",
                                            futureItem: null
                                        })
                                    }
                                } catch (e) {
                                    console.log(e)
                                }

                                let idxAllCCMonth = getAllCreditCardsMonths.body.myCCMonthsList.findIndex(moncc => moncc.isCurrentMonth === true);
                                if (idxAllCCMonth >= 0 && idxAllCCMonth + 1 < getAllCreditCardsMonths.body.myCCMonthsList.length) {
                                    idxAllCCMonth++;
                                }
                                if (idxAllCCMonth === -1 && getAllCreditCardsMonths.body.myCCMonthsList.length) {
                                    idxAllCCMonth = getAllCreditCardsMonths.body.myCCMonthsList.findIndex(ccMonth => ccMonth.isFuture === true);
                                }
                                if (idxAllCCMonth === -1 && getAllCreditCardsMonths.body.myCCMonthsList.length) {
                                    idxAllCCMonth = getAllCreditCardsMonths.body.myCCMonthsList.length - 1;
                                }

                                if (idxAllCCMonth === -1 && !getAllCreditCardsMonths.body.myCCMonthsList.length) {
                                    const prevMonYearDt = new Date();
                                    prevMonYearDt.setMonth(prevMonYearDt.getMonth() + 1);
                                    const monthForRequest = String(prevMonYearDt.getMonth() + 1).padStart(2, 0) + prevMonYearDt.getFullYear();
                                    const getBankCCMonthlyDetails = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/api/CC/getBankCCMonthlyDetails", "POST", {
                                        "ccIndex": bankCreditCardsList[0].index,
                                        "month": monthForRequest
                                    });
                                    if (getBankCCMonthlyDetails && getBankCCMonthlyDetails.body) {
                                        const commonPart = {
                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                            "Token": all.banks.accountDetails.bank.token,
                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                            'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                            'AccountNumber': parseInt(mizrahiTefahot.AccountsAllJson[i].Number),
                                            'BranchNumber': parseInt(mizrahiTefahot.AccountsAllJson[i].BranchForDispaly),
                                        };
                                        const {
                                            bankCCMonthlyDetailsList,
                                            bankCCMonthlyTotalChargesList
                                        } = getBankCCMonthlyDetails.body;
                                        for (let indexRow = 0; indexRow < bankCCMonthlyDetailsList.length; indexRow++) {
                                            const row = bankCCMonthlyDetailsList[indexRow];

                                            if (row.transactionAmount === "0" && row.chargeAmount === "0") {
                                                continue;
                                            }

                                            const card = bankCreditCardsList.find(item => item.index === row.creditCardIndex);

                                            let totalPaymentsSum = null;
                                            let currentPaymentNumSum = null;
                                            let comment = null;
                                            if (row.bankCCMonthlyDetailsMoreDetails) {
                                                if (row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails) {
                                                    [currentPaymentNumSum, totalPaymentsSum] = tryParseCurrentAndTotalPayments([
                                                        row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails.continuousChargeDetails_currentPaymentNum,
                                                        row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails.continuousChargeDetails_totalPaymentNum,
                                                        [row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails.continuousChargeDetails_currentPaymentNum,
                                                            row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails.continuousChargeDetails_totalPaymentNum]
                                                            .join(' מ ')
                                                    ]);
                                                } else if (!!row.bankCCMonthlyDetailsMoreDetails.chargeDetails_hearot
                                                    && !!row.bankCCMonthlyDetailsMoreDetails.chargeDetails_type
                                                    && ['תשלום', 'קרדיט'].some(key => row.bankCCMonthlyDetailsMoreDetails.chargeDetails_type.includes(key))) {
                                                    [currentPaymentNumSum, totalPaymentsSum] = tryParseCurrentAndTotalPayments([row.bankCCMonthlyDetailsMoreDetails.chargeDetails_hearot]);
                                                }
                                                comment = (row.bankCCMonthlyDetailsMoreDetails.chargeDetails_type + ' ' + row.bankCCMonthlyDetailsMoreDetails.chargeDetails_hearot).trim();
                                            }
                                            if (row.transactionDate === "0001-01-01T00:00:00") {
                                                if (comment) {
                                                    comment += ' לידיעה בלבד';
                                                } else {
                                                    comment = 'לידיעה בלבד';
                                                }
                                            }

                                            let chargeCurrencyToTranslate = row.chargeCurrencType;
                                            if (!chargeCurrencyToTranslate && row.chargeCurrencCode) {
                                                switch (row.chargeCurrencCode) {
                                                    case 777:
                                                    case '777':
                                                        chargeCurrencyToTranslate = 'NIS'
                                                        break;
                                                    case '001':
                                                        chargeCurrencyToTranslate = 'USD'
                                                        break;
                                                    case '009':
                                                        chargeCurrencyToTranslate = 'EUR'
                                                        break;
                                                }
                                            }

                                            const businessName = all.banks.core.services.getStringJson(row.businessName) ? all.banks.core.services.getStringJson(row.businessName) : 'ללא מלל';
                                            // if (businessName.includes('העברות לקרדיט')
                                            //     && row.chargeAmount.replace(/,/g, '') === "1124.53"
                                            //     && commonPart.AccountNumber === 381144
                                            //     && card.cc4LastNumber === '5561'
                                            // ) {
                                            //     debugger
                                            // }
                                            all.banks.generalVariables.allDataArrAshrai.push(Object.assign({
                                                "CardNumber": card.cc4LastNumber,
                                                "NextBillingDate": row.chargeDate === "0001-01-01T00:00:00"
                                                    ? all.banks.core.services.convertDateAll(prevMonYearDt) // all.banks.core.services.convertDateAll(closeChargeDate)
                                                    : all.banks.core.services.convertDateAll(row.chargeDate), //all.banks.core.services.convertDateAll(prevMonYearDt) ? all.banks.core.services.convertDateAll(prevMonYearDt) : all.banks.core.services.convertDateAll(row.chargeDate),
                                                "NextCycleTotal": bankCCMonthlyTotalChargesList[0].totalChargesAmount.replace(/,/g, ''),
                                                "CardStatus": null,
                                                "TransDesc": businessName,
                                                "TransTotal": row.chargeAmount.replace(/,/g, ''),
                                                "ValueDate": row.transactionDate === "0001-01-01T00:00:00"
                                                    ? all.banks.core.services.convertDateAll(bankCCMonthlyTotalChargesList[0].totalChargeDate) // all.banks.core.services.convertDateAll(closeChargeDate)
                                                    : all.banks.core.services.convertDateAll(row.transactionDate),
                                                "TransCategory": null,
                                                "TotalPayments": totalPaymentsSum !== null ? Number(totalPaymentsSum) : null,
                                                "CurrentPaymentNum": currentPaymentNumSum !== null ? Number(currentPaymentNumSum) : null,
                                                "CardType": all.banks.core.services.getTypeCard(card.ccName),
                                                "indFakeDate": row.chargeDate === "0001-01-01T00:00:00" ? 1 : 0,
                                                "currency_id": all.banks.core.services.getTypeCurrencyAll(row.MatbeaMakor),
                                                // all.banks.core.services.getTypeCurrencyAll(row.chargeCurrencType),
                                                "original_total": row.transactionAmount.replace(/,/g, ''),
                                                "ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(chargeCurrencyToTranslate),
                                                "comment": comment
                                            }, commonPart));
                                        }
                                    }
                                } else {

                                    try {
                                        const comparisonListPerMonth = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/api/CC/getCCComparisonPerMonth", "POST", {"index": bankCreditCardsList[0].index});
                                        if (comparisonListPerMonth && comparisonListPerMonth.body && Array.isArray(comparisonListPerMonth.body.ComparisonListPerMonth) && comparisonListPerMonth.body.ComparisonListPerMonth.length) {
                                            const reversed = comparisonListPerMonth.body.ComparisonListPerMonth.reverse()
                                            const currentDate = new Date();
                                            if ((Number(reversed[0].month) - 1) !== (new Date().getMonth())
                                                ||
                                                Number(reversed[0].year) !== new Date().getFullYear()
                                            ) {
                                                reversed.unshift({
                                                    "month": ("0" + (new Date().getMonth() + 1)).slice(-2),
                                                    "year": new Date().getFullYear().toString(),
                                                    "expensesPerMonth": 0.0
                                                })
                                            }
                                            if (Number(reversed[0].month) !== (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()).getMonth() + 1)
                                                ||
                                                Number(reversed[0].year) !== new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()).getFullYear()
                                            ) {
                                                reversed.unshift({
                                                    "month": ("0" + (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()).getMonth() + 1)).slice(-2),
                                                    "year": (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()).getFullYear()).toString(),
                                                    "expensesPerMonth": 0.0
                                                })
                                            }
                                            // ccIndex: 0
                                            // month: "022021"
                                            for (let indexMonth = 0;
                                                 indexMonth < (all.banks.accountDetails.ccardMonth + 1);
                                                 indexMonth++) {

                                                let monthForRequest = reversed[indexMonth].month + reversed[indexMonth].year;
                                                myEmitterLogs(15, bankCreditCardsList.map(item => item.cc4LastNumber).join(', ')
                                                    + ' period ' + monthForRequest);

                                                const getAllCreditCardsMonthSummary = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/api/CC/getCCMonthSummary", "POST",
                                                    {"month": monthForRequest});
                                                let allCreditCardsMonthSummaryMap = {};
                                                if (getAllCreditCardsMonthSummary && getAllCreditCardsMonthSummary.body) {
                                                    const {
                                                        myCCMonthlyListFuture,
                                                        myCCMonthlyListPrevious
                                                    } = getAllCreditCardsMonthSummary.body;
                                                    if (Array.isArray(myCCMonthlyListFuture)) {
                                                        allCreditCardsMonthSummaryMap = myCCMonthlyListFuture.reduce((acmltr, ccMonthSummary) => {
                                                            acmltr[String(ccMonthSummary.creditCardIndex)] = Object.assign({future: true}, ccMonthSummary);
                                                            return acmltr;
                                                        }, allCreditCardsMonthSummaryMap);
                                                    }
                                                    if (Array.isArray(myCCMonthlyListPrevious)) {
                                                        allCreditCardsMonthSummaryMap = myCCMonthlyListPrevious.reduce((acmltr, ccMonthSummary) => {
                                                            acmltr[String(ccMonthSummary.creditCardIndex)] = Object.assign({future: false}, ccMonthSummary);
                                                            return acmltr;
                                                        }, allCreditCardsMonthSummaryMap);
                                                    }
                                                }

                                                // no matter which card index we use, transactions for all cards in month brought anyway
                                                const getBankCCMonthlyDetails = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/api/CC/getBankCCMonthlyDetails", "POST", {
                                                    "ccIndex": bankCreditCardsList[0].index,
                                                    "month": monthForRequest
                                                });
                                                if (getBankCCMonthlyDetails && getBankCCMonthlyDetails.body) {
                                                    const commonPart = {
                                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                                        "Token": all.banks.accountDetails.bank.token,
                                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                                        'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                                        'AccountNumber': parseInt(mizrahiTefahot.AccountsAllJson[i].Number),
                                                        'BranchNumber': parseInt(mizrahiTefahot.AccountsAllJson[i].BranchForDispaly),
                                                    };
                                                    const {
                                                        bankCCMonthlyDetailsList,
                                                        bankCCMonthlyTotalChargesList
                                                    } = getBankCCMonthlyDetails.body;
                                                    for (let indexRow = 0; indexRow < bankCCMonthlyDetailsList.length; indexRow++) {
                                                        const row = bankCCMonthlyDetailsList[indexRow];

                                                        if (row.transactionAmount === "0" && row.chargeAmount === "0") {
                                                            continue;
                                                        }

                                                        const card = bankCreditCardsList.find(item => item.index === row.creditCardIndex);

                                                        let totalPaymentsSum = null;
                                                        let currentPaymentNumSum = null;
                                                        let comment = null;
                                                        if (row.bankCCMonthlyDetailsMoreDetails) {
                                                            if (row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails) {
                                                                [currentPaymentNumSum, totalPaymentsSum] = tryParseCurrentAndTotalPayments([
                                                                    row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails.continuousChargeDetails_currentPaymentNum,
                                                                    row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails.continuousChargeDetails_totalPaymentNum,
                                                                    [row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails.continuousChargeDetails_currentPaymentNum,
                                                                        row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails.continuousChargeDetails_totalPaymentNum]
                                                                        .join(' מ ')
                                                                ]);
                                                            } else if (!!row.bankCCMonthlyDetailsMoreDetails.chargeDetails_hearot
                                                                && !!row.bankCCMonthlyDetailsMoreDetails.chargeDetails_type
                                                                && ['תשלום', 'קרדיט'].some(key => row.bankCCMonthlyDetailsMoreDetails.chargeDetails_type.includes(key))) {
                                                                [currentPaymentNumSum, totalPaymentsSum] = tryParseCurrentAndTotalPayments([row.bankCCMonthlyDetailsMoreDetails.chargeDetails_hearot]);
                                                            }
                                                            comment = (row.bankCCMonthlyDetailsMoreDetails.chargeDetails_type + ' ' + row.bankCCMonthlyDetailsMoreDetails.chargeDetails_hearot).trim();
                                                        }
                                                        if (row.transactionDate === "0001-01-01T00:00:00") {
                                                            if (comment) {
                                                                comment += ' לידיעה בלבד';
                                                            } else {
                                                                comment = 'לידיעה בלבד';
                                                            }
                                                        }

                                                        let chargeCurrencyToTranslate = row.chargeCurrencType;
                                                        if (!chargeCurrencyToTranslate && row.chargeCurrencCode) {
                                                            switch (row.chargeCurrencCode) {
                                                                case 777:
                                                                case '777':
                                                                    chargeCurrencyToTranslate = 'NIS'
                                                                    break;
                                                                case '001':
                                                                    chargeCurrencyToTranslate = 'USD'
                                                                    break;
                                                                case '009':
                                                                    chargeCurrencyToTranslate = 'EUR'
                                                                    break;
                                                            }
                                                        }

                                                        const cardMonthSummary = allCreditCardsMonthSummaryMap[String(row.creditCardIndex)];
                                                        const monthTotalChargeForRow = cardMonthSummary
                                                            ? (cardMonthSummary.myCurrencyChargesList.find(crncyChrg => crncyChrg.currency === row.chargeCurrencCode)
                                                                    ? cardMonthSummary.myCurrencyChargesList.find(crncyChrg => crncyChrg.currency === row.chargeCurrencCode)
                                                                    : {
                                                                        totalCharge: "0",
                                                                        chargingDate: (card.myCloseCharge.closeChargeDate !== "0001-01-01T00:00:00")
                                                                            ? new Date(card.myCloseCharge.closeChargeDate)
                                                                            : (card.myLastCharge.lastChargeDate !== "0001-01-01T00:00:00")
                                                                                ? new Date(card.myLastCharge.lastChargeDate)
                                                                                : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15)
                                                                    }
                                                            ) : {
                                                                totalCharge: "0",
                                                                chargingDate: (card.myCloseCharge.closeChargeDate !== "0001-01-01T00:00:00")
                                                                    ? new Date(card.myCloseCharge.closeChargeDate)
                                                                    : (card.myLastCharge.lastChargeDate !== "0001-01-01T00:00:00")
                                                                        ? new Date(card.myLastCharge.lastChargeDate)
                                                                        : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15)
                                                            };

                                                        try {
                                                            if (typeof monthTotalChargeForRow.chargingDate === 'string') {
                                                                const [match, day, month, year] = /(\d{2})(\d{2})(\d{4})/g.exec(monthTotalChargeForRow.chargingDate) || [];
                                                                if (match) {
                                                                    monthTotalChargeForRow.chargingDate = new Date(year, month - 1, day);
                                                                } else {
                                                                    const [match1, day1, month1, year1] = /(\d{2})\/(\d{2})\/(\d{4})/g.exec(monthTotalChargeForRow.chargingDate) || [];
                                                                    if (match1) {
                                                                        monthTotalChargeForRow.chargingDate = new Date(year1, month1 - 1, day1);
                                                                    }
                                                                }
                                                            }
                                                        } catch (e) {
                                                            console.log(monthTotalChargeForRow, e)
                                                        }
                                                        const businessName = all.banks.core.services.getStringJson(row.businessName) ? all.banks.core.services.getStringJson(row.businessName) : 'ללא מלל';
                                                        // if (businessName.includes('העברות לקרדיט')
                                                        //     && row.chargeAmount.replace(/,/g, '') === "1124.53"
                                                        //     && commonPart.AccountNumber === 381144
                                                        //     && card.cc4LastNumber === '5561'
                                                        // ) {
                                                        //     debugger
                                                        // }
                                                        all.banks.generalVariables.allDataArrAshrai.push(Object.assign({
                                                            "CardNumber": card.cc4LastNumber,
                                                            "NextBillingDate": row.chargeDate === "0001-01-01T00:00:00"
                                                                ? all.banks.core.services.convertDateAll(monthTotalChargeForRow.chargingDate) // all.banks.core.services.convertDateAll(closeChargeDate)
                                                                : all.banks.core.services.convertDateAll(row.chargeDate), //all.banks.core.services.convertDateAll(monthTotalChargeForRow.chargingDate) ? all.banks.core.services.convertDateAll(monthTotalChargeForRow.chargingDate) : all.banks.core.services.convertDateAll(row.chargeDate),
                                                            "NextCycleTotal": monthTotalChargeForRow.totalCharge.replace(/,/g, ''),
                                                            // bankCCMonthlyTotalChargesList.find((it) => it.creditCardIndex === card.index).totalChargesAmount.replace(/,/g, ''),
                                                            "CardStatus": null,
                                                            "TransDesc": businessName,
                                                            "TransTotal": row.chargeAmount.replace(/,/g, ''),
                                                            "ValueDate": row.transactionDate === "0001-01-01T00:00:00"
                                                                ? all.banks.core.services.convertDateAll(monthTotalChargeForRow.chargingDate) // all.banks.core.services.convertDateAll(closeChargeDate)
                                                                : all.banks.core.services.convertDateAll(row.transactionDate),
                                                            "TransCategory": null,
                                                            "TotalPayments": totalPaymentsSum !== null ? Number(totalPaymentsSum) : null,
                                                            "CurrentPaymentNum": currentPaymentNumSum !== null ? Number(currentPaymentNumSum) : null,
                                                            "CardType": all.banks.core.services.getTypeCard(card.ccName),
                                                            "indFakeDate": row.chargeDate === "0001-01-01T00:00:00" ? 1 : 0,
                                                            "currency_id": all.banks.core.services.getTypeCurrencyAll(row.MatbeaMakor),
                                                            // all.banks.core.services.getTypeCurrencyAll(row.chargeCurrencType),
                                                            "original_total": row.transactionAmount.replace(/,/g, ''),
                                                            "ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(chargeCurrencyToTranslate),
                                                            // all.banks.core.services.getTypeCurrencyAll(row.MatbeaMakor),
                                                            "comment": comment
                                                        }, commonPart));
                                                    }
                                                }
                                            }
                                        } else {
                                            for (let indexMonth = 0;
                                                 indexMonth < (all.banks.accountDetails.ccardMonth + 1) && idxAllCCMonth >= 0;
                                                 indexMonth++, idxAllCCMonth--) {

                                                let monthForRequest = getAllCreditCardsMonths.body.myCCMonthsList[idxAllCCMonth].month;
                                                if (monthForRequest === '*' && idxAllCCMonth > 0) {
                                                    const prevMonYearMtch = /^(\d{2})(\d{4})$/g.exec(getAllCreditCardsMonths.body.myCCMonthsList[idxAllCCMonth - 1].month);
                                                    if (prevMonYearMtch === null) {
                                                        continue;
                                                    }

                                                    const prevMonYearDt = new Date(prevMonYearMtch[2], prevMonYearMtch[1]);
                                                    prevMonYearDt.setMonth(prevMonYearDt.getMonth() + 1);
                                                    monthForRequest = String(prevMonYearDt.getMonth()).padStart(2, 0) + prevMonYearDt.getFullYear();
                                                }
                                                myEmitterLogs(15, bankCreditCardsList.map(item => item.cc4LastNumber).join(', ')
                                                    + ' period ' + monthForRequest);

                                                const getAllCreditCardsMonthSummary = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/api/CC/getCCMonthSummary", "POST",
                                                    {"month": monthForRequest});
                                                let allCreditCardsMonthSummaryMap = {};
                                                if (getAllCreditCardsMonthSummary && getAllCreditCardsMonthSummary.body) {
                                                    const {
                                                        myCCMonthlyListFuture,
                                                        myCCMonthlyListPrevious
                                                    } = getAllCreditCardsMonthSummary.body;
                                                    if (Array.isArray(myCCMonthlyListFuture)) {
                                                        allCreditCardsMonthSummaryMap = myCCMonthlyListFuture.reduce((acmltr, ccMonthSummary) => {
                                                            acmltr[String(ccMonthSummary.creditCardIndex)] = Object.assign({future: true}, ccMonthSummary);
                                                            return acmltr;
                                                        }, allCreditCardsMonthSummaryMap);
                                                    }
                                                    if (Array.isArray(myCCMonthlyListPrevious)) {
                                                        allCreditCardsMonthSummaryMap = myCCMonthlyListPrevious.reduce((acmltr, ccMonthSummary) => {
                                                            acmltr[String(ccMonthSummary.creditCardIndex)] = Object.assign({future: false}, ccMonthSummary);
                                                            return acmltr;
                                                        }, allCreditCardsMonthSummaryMap);
                                                    }
                                                }
//                                     debugger
// new Date()
//
                                                // no matter which card index we use, transactions for all cards in month brought anyway
                                                const getBankCCMonthlyDetails = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/api/CC/getBankCCMonthlyDetails", "POST", {
                                                    "ccIndex": bankCreditCardsList[0].index,
                                                    "month": monthForRequest
                                                });
                                                if (getBankCCMonthlyDetails && getBankCCMonthlyDetails.body) {
                                                    const commonPart = {
                                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                                        "Token": all.banks.accountDetails.bank.token,
                                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                                        'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                                        'AccountNumber': parseInt(mizrahiTefahot.AccountsAllJson[i].Number),
                                                        'BranchNumber': parseInt(mizrahiTefahot.AccountsAllJson[i].BranchForDispaly),
                                                    };
                                                    const {
                                                        bankCCMonthlyDetailsList,
                                                        bankCCMonthlyTotalChargesList
                                                    } = getBankCCMonthlyDetails.body;
                                                    for (let indexRow = 0; indexRow < bankCCMonthlyDetailsList.length; indexRow++) {
                                                        const row = bankCCMonthlyDetailsList[indexRow];

                                                        if (row.transactionAmount === "0" && row.chargeAmount === "0") {
                                                            continue;
                                                        }

                                                        const card = bankCreditCardsList.find(item => item.index === row.creditCardIndex);

                                                        let totalPaymentsSum = null;
                                                        let currentPaymentNumSum = null;
                                                        let comment = null;
                                                        if (row.bankCCMonthlyDetailsMoreDetails) {
                                                            if (row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails) {
                                                                [currentPaymentNumSum, totalPaymentsSum] = tryParseCurrentAndTotalPayments([
                                                                    row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails.continuousChargeDetails_currentPaymentNum,
                                                                    row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails.continuousChargeDetails_totalPaymentNum,
                                                                    [row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails.continuousChargeDetails_currentPaymentNum,
                                                                        row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails.continuousChargeDetails_totalPaymentNum]
                                                                        .join(' מ ')
                                                                ]);
                                                            } else if (!!row.bankCCMonthlyDetailsMoreDetails.chargeDetails_hearot
                                                                && !!row.bankCCMonthlyDetailsMoreDetails.chargeDetails_type
                                                                && ['תשלום', 'קרדיט'].some(key => row.bankCCMonthlyDetailsMoreDetails.chargeDetails_type.includes(key))) {
                                                                [currentPaymentNumSum, totalPaymentsSum] = tryParseCurrentAndTotalPayments([row.bankCCMonthlyDetailsMoreDetails.chargeDetails_hearot]);
                                                            }
                                                            comment = (row.bankCCMonthlyDetailsMoreDetails.chargeDetails_type + ' ' + row.bankCCMonthlyDetailsMoreDetails.chargeDetails_hearot).trim();
                                                        }
                                                        if (row.transactionDate === "0001-01-01T00:00:00") {
                                                            if (comment) {
                                                                comment += ' לידיעה בלבד';
                                                            } else {
                                                                comment = 'לידיעה בלבד';
                                                            }
                                                        }

                                                        let chargeCurrencyToTranslate = row.chargeCurrencType;
                                                        if (!chargeCurrencyToTranslate && row.chargeCurrencCode) {
                                                            switch (row.chargeCurrencCode) {
                                                                case 777:
                                                                case '777':
                                                                    chargeCurrencyToTranslate = 'NIS'
                                                                    break;
                                                                case '001':
                                                                    chargeCurrencyToTranslate = 'USD'
                                                                    break;
                                                                case '009':
                                                                    chargeCurrencyToTranslate = 'EUR'
                                                                    break;
                                                            }
                                                        }

                                                        const cardMonthSummary = allCreditCardsMonthSummaryMap[String(row.creditCardIndex)];
                                                        const monthTotalChargeForRow = cardMonthSummary
                                                            ? (cardMonthSummary.myCurrencyChargesList.find(crncyChrg => crncyChrg.currency === row.chargeCurrencCode)
                                                                    ? cardMonthSummary.myCurrencyChargesList.find(crncyChrg => crncyChrg.currency === row.chargeCurrencCode)
                                                                    : {
                                                                        totalCharge: "0",
                                                                        chargingDate: (card.myCloseCharge.closeChargeDate !== "0001-01-01T00:00:00")
                                                                            ? new Date(card.myCloseCharge.closeChargeDate)
                                                                            : (card.myLastCharge.lastChargeDate !== "0001-01-01T00:00:00")
                                                                                ? new Date(card.myLastCharge.lastChargeDate)
                                                                                : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15)
                                                                    }
                                                            ) : {
                                                                totalCharge: "0",
                                                                chargingDate: (card.myCloseCharge.closeChargeDate !== "0001-01-01T00:00:00")
                                                                    ? new Date(card.myCloseCharge.closeChargeDate)
                                                                    : (card.myLastCharge.lastChargeDate !== "0001-01-01T00:00:00")
                                                                        ? new Date(card.myLastCharge.lastChargeDate)
                                                                        : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15)
                                                            };

                                                        try {
                                                            if (typeof monthTotalChargeForRow.chargingDate === 'string') {
                                                                const [match, day, month, year] = /(\d{2})(\d{2})(\d{4})/g.exec(monthTotalChargeForRow.chargingDate) || [];
                                                                if (match) {
                                                                    monthTotalChargeForRow.chargingDate = new Date(year, month - 1, day);
                                                                } else {
                                                                    const [match1, day1, month1, year1] = /(\d{2})\/(\d{2})\/(\d{4})/g.exec(monthTotalChargeForRow.chargingDate) || [];
                                                                    if (match1) {
                                                                        monthTotalChargeForRow.chargingDate = new Date(year1, month1 - 1, day1);
                                                                    }
                                                                }
                                                            }
                                                        } catch (e) {
                                                            console.log(monthTotalChargeForRow, e)
                                                        }
                                                        const businessName = all.banks.core.services.getStringJson(row.businessName) ? all.banks.core.services.getStringJson(row.businessName) : 'ללא מלל';
                                                        // if (businessName.includes('העברות לקרדיט')
                                                        //     && row.chargeAmount.replace(/,/g, '') === "1124.53"
                                                        //     && commonPart.AccountNumber === 381144
                                                        //     && card.cc4LastNumber === '5561'
                                                        // ) {
                                                        //     debugger
                                                        // }
                                                        all.banks.generalVariables.allDataArrAshrai.push(Object.assign({
                                                            "CardNumber": card.cc4LastNumber,
                                                            "NextBillingDate": row.chargeDate === "0001-01-01T00:00:00"
                                                                ? all.banks.core.services.convertDateAll(monthTotalChargeForRow.chargingDate) // all.banks.core.services.convertDateAll(closeChargeDate)
                                                                : all.banks.core.services.convertDateAll(row.chargeDate), //all.banks.core.services.convertDateAll(monthTotalChargeForRow.chargingDate) ? all.banks.core.services.convertDateAll(monthTotalChargeForRow.chargingDate) : all.banks.core.services.convertDateAll(row.chargeDate),
                                                            "NextCycleTotal": monthTotalChargeForRow.totalCharge.replace(/,/g, ''),
                                                            // bankCCMonthlyTotalChargesList.find((it) => it.creditCardIndex === card.index).totalChargesAmount.replace(/,/g, ''),
                                                            "CardStatus": null,
                                                            "TransDesc": businessName,
                                                            "TransTotal": row.chargeAmount.replace(/,/g, ''),
                                                            "ValueDate": row.transactionDate === "0001-01-01T00:00:00"
                                                                ? all.banks.core.services.convertDateAll(monthTotalChargeForRow.chargingDate) // all.banks.core.services.convertDateAll(closeChargeDate)
                                                                : all.banks.core.services.convertDateAll(row.transactionDate),
                                                            "TransCategory": null,
                                                            "TotalPayments": totalPaymentsSum !== null ? Number(totalPaymentsSum) : null,
                                                            "CurrentPaymentNum": currentPaymentNumSum !== null ? Number(currentPaymentNumSum) : null,
                                                            "CardType": all.banks.core.services.getTypeCard(card.ccName),
                                                            "indFakeDate": row.chargeDate === "0001-01-01T00:00:00" ? 1 : 0,
                                                            "currency_id": all.banks.core.services.getTypeCurrencyAll(row.MatbeaMakor),
                                                            // all.banks.core.services.getTypeCurrencyAll(row.chargeCurrencType),
                                                            "original_total": row.transactionAmount.replace(/,/g, ''),
                                                            "ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(chargeCurrencyToTranslate),
                                                            // all.banks.core.services.getTypeCurrencyAll(row.MatbeaMakor),
                                                            "comment": comment
                                                        }, commonPart));
                                                    }
                                                }
                                            }


                                        }
                                    } catch (e) {
                                        console.log(e)
                                    }


                                }
                            } else {
                                try {
                                    const comparisonListPerMonth = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/api/CC/getCCComparisonPerMonth", "POST", {"index": 1});
                                    if (comparisonListPerMonth && comparisonListPerMonth.body && Array.isArray(comparisonListPerMonth.body.ComparisonListPerMonth) && comparisonListPerMonth.body.ComparisonListPerMonth.length) {
                                        const reversed = comparisonListPerMonth.body.ComparisonListPerMonth.reverse()
                                        const currentDate = new Date();
                                        if ((Number(reversed[0].month) - 1) !== (new Date().getMonth())
                                            ||
                                            Number(reversed[0].year) !== new Date().getFullYear()
                                        ) {
                                            reversed.unshift({
                                                "month": ("0" + (new Date().getMonth() + 1)).slice(-2),
                                                "year": new Date().getFullYear().toString(),
                                                "expensesPerMonth": 0.0
                                            })
                                        }
                                        if (Number(reversed[0].month) !== (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()).getMonth() + 1)
                                            ||
                                            Number(reversed[0].year) !== new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()).getFullYear()
                                        ) {
                                            reversed.unshift({
                                                "month": ("0" + (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()).getMonth() + 1)).slice(-2),
                                                "year": (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()).getFullYear()).toString(),
                                                "expensesPerMonth": 0.0
                                            })
                                        }
                                        // ccIndex: 0
                                        // month: "022021"

                                        for (let indexMonth = 0;
                                             indexMonth < (all.banks.accountDetails.ccardMonth + 1);
                                             indexMonth++) {

                                            let monthForRequest = reversed[indexMonth].month + reversed[indexMonth].year;
                                            myEmitterLogs(15, bankCreditCardsList.map(item => item.cc4LastNumber).join(', ')
                                                + ' period ' + monthForRequest);

                                            const getAllCreditCardsMonthSummary = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/api/CC/getCCMonthSummary", "POST",
                                                {"month": monthForRequest});
                                            let allCreditCardsMonthSummaryMap = {};
                                            if (getAllCreditCardsMonthSummary && getAllCreditCardsMonthSummary.body) {
                                                const {
                                                    myCCMonthlyListFuture,
                                                    myCCMonthlyListPrevious
                                                } = getAllCreditCardsMonthSummary.body;
                                                if (Array.isArray(myCCMonthlyListFuture)) {
                                                    allCreditCardsMonthSummaryMap = myCCMonthlyListFuture.reduce((acmltr, ccMonthSummary) => {
                                                        acmltr[String(ccMonthSummary.creditCardIndex)] = Object.assign({future: true}, ccMonthSummary);
                                                        return acmltr;
                                                    }, allCreditCardsMonthSummaryMap);
                                                }
                                                if (Array.isArray(myCCMonthlyListPrevious)) {
                                                    allCreditCardsMonthSummaryMap = myCCMonthlyListPrevious.reduce((acmltr, ccMonthSummary) => {
                                                        acmltr[String(ccMonthSummary.creditCardIndex)] = Object.assign({future: false}, ccMonthSummary);
                                                        return acmltr;
                                                    }, allCreditCardsMonthSummaryMap);
                                                }
                                            }

                                            // no matter which card index we use, transactions for all cards in month brought anyway
                                            const getBankCCMonthlyDetails = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/api/CC/getBankCCMonthlyDetails", "POST", {
                                                "ccIndex": bankCreditCardsList[0].index,
                                                "month": monthForRequest
                                            });
                                            if (getBankCCMonthlyDetails && getBankCCMonthlyDetails.body) {
                                                const commonPart = {
                                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                                    "Token": all.banks.accountDetails.bank.token,
                                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                                    'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                                    'AccountNumber': parseInt(mizrahiTefahot.AccountsAllJson[i].Number),
                                                    'BranchNumber': parseInt(mizrahiTefahot.AccountsAllJson[i].BranchForDispaly),
                                                };
                                                const {
                                                    bankCCMonthlyDetailsList,
                                                    bankCCMonthlyTotalChargesList
                                                } = getBankCCMonthlyDetails.body;
                                                for (let indexRow = 0; indexRow < bankCCMonthlyDetailsList.length; indexRow++) {
                                                    const row = bankCCMonthlyDetailsList[indexRow];

                                                    if (row.transactionAmount === "0" && row.chargeAmount === "0") {
                                                        continue;
                                                    }

                                                    const card = bankCreditCardsList.find(item => item.index === row.creditCardIndex);

                                                    let totalPaymentsSum = null;
                                                    let currentPaymentNumSum = null;
                                                    let comment = null;
                                                    if (row.bankCCMonthlyDetailsMoreDetails) {
                                                        if (row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails) {
                                                            [currentPaymentNumSum, totalPaymentsSum] = tryParseCurrentAndTotalPayments([
                                                                row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails.continuousChargeDetails_currentPaymentNum,
                                                                row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails.continuousChargeDetails_totalPaymentNum,
                                                                [row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails.continuousChargeDetails_currentPaymentNum,
                                                                    row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails.continuousChargeDetails_totalPaymentNum]
                                                                    .join(' מ ')
                                                            ]);
                                                        } else if (!!row.bankCCMonthlyDetailsMoreDetails.chargeDetails_hearot
                                                            && !!row.bankCCMonthlyDetailsMoreDetails.chargeDetails_type
                                                            && ['תשלום', 'קרדיט'].some(key => row.bankCCMonthlyDetailsMoreDetails.chargeDetails_type.includes(key))) {
                                                            [currentPaymentNumSum, totalPaymentsSum] = tryParseCurrentAndTotalPayments([row.bankCCMonthlyDetailsMoreDetails.chargeDetails_hearot]);
                                                        }
                                                        comment = (row.bankCCMonthlyDetailsMoreDetails.chargeDetails_type + ' ' + row.bankCCMonthlyDetailsMoreDetails.chargeDetails_hearot).trim();
                                                    }
                                                    if (row.transactionDate === "0001-01-01T00:00:00") {
                                                        if (comment) {
                                                            comment += ' לידיעה בלבד';
                                                        } else {
                                                            comment = 'לידיעה בלבד';
                                                        }
                                                    }

                                                    let chargeCurrencyToTranslate = row.chargeCurrencType;
                                                    if (!chargeCurrencyToTranslate && row.chargeCurrencCode) {
                                                        switch (row.chargeCurrencCode) {
                                                            case 777:
                                                            case '777':
                                                                chargeCurrencyToTranslate = 'NIS'
                                                                break;
                                                            case '001':
                                                                chargeCurrencyToTranslate = 'USD'
                                                                break;
                                                            case '009':
                                                                chargeCurrencyToTranslate = 'EUR'
                                                                break;
                                                        }
                                                    }

                                                    const cardMonthSummary = allCreditCardsMonthSummaryMap[String(row.creditCardIndex)];
                                                    const monthTotalChargeForRow = cardMonthSummary
                                                        ? (cardMonthSummary.myCurrencyChargesList.find(crncyChrg => crncyChrg.currency === row.chargeCurrencCode)
                                                                ? cardMonthSummary.myCurrencyChargesList.find(crncyChrg => crncyChrg.currency === row.chargeCurrencCode)
                                                                : {
                                                                    totalCharge: "0",
                                                                    chargingDate: (card.myCloseCharge.closeChargeDate !== "0001-01-01T00:00:00")
                                                                        ? new Date(card.myCloseCharge.closeChargeDate)
                                                                        : (card.myLastCharge.lastChargeDate !== "0001-01-01T00:00:00")
                                                                            ? new Date(card.myLastCharge.lastChargeDate)
                                                                            : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15)
                                                                }
                                                        ) : {
                                                            totalCharge: "0",
                                                            chargingDate: (card.myCloseCharge.closeChargeDate !== "0001-01-01T00:00:00")
                                                                ? new Date(card.myCloseCharge.closeChargeDate)
                                                                : (card.myLastCharge.lastChargeDate !== "0001-01-01T00:00:00")
                                                                    ? new Date(card.myLastCharge.lastChargeDate)
                                                                    : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15)
                                                        };

                                                    try {
                                                        if (typeof monthTotalChargeForRow.chargingDate === 'string') {
                                                            const [match, day, month, year] = /(\d{2})(\d{2})(\d{4})/g.exec(monthTotalChargeForRow.chargingDate) || [];
                                                            if (match) {
                                                                monthTotalChargeForRow.chargingDate = new Date(year, month - 1, day);
                                                            } else {
                                                                const [match1, day1, month1, year1] = /(\d{2})\/(\d{2})\/(\d{4})/g.exec(monthTotalChargeForRow.chargingDate) || [];
                                                                if (match1) {
                                                                    monthTotalChargeForRow.chargingDate = new Date(year1, month1 - 1, day1);
                                                                }
                                                            }
                                                        }
                                                    } catch (e) {
                                                        console.log(monthTotalChargeForRow, e)
                                                    }
                                                    const businessName = all.banks.core.services.getStringJson(row.businessName) ? all.banks.core.services.getStringJson(row.businessName) : 'ללא מלל';
                                                    // if (businessName.includes('העברות לקרדיט')
                                                    //     && row.chargeAmount.replace(/,/g, '') === "1124.53"
                                                    //     && commonPart.AccountNumber === 381144
                                                    //     && card.cc4LastNumber === '5561'
                                                    // ) {
                                                    //     debugger
                                                    // }
                                                    all.banks.generalVariables.allDataArrAshrai.push(Object.assign({
                                                        "CardNumber": card.cc4LastNumber,
                                                        "NextBillingDate": row.chargeDate === "0001-01-01T00:00:00"
                                                            ? all.banks.core.services.convertDateAll(monthTotalChargeForRow.chargingDate) // all.banks.core.services.convertDateAll(closeChargeDate)
                                                            : all.banks.core.services.convertDateAll(row.chargeDate), //all.banks.core.services.convertDateAll(monthTotalChargeForRow.chargingDate) ? all.banks.core.services.convertDateAll(monthTotalChargeForRow.chargingDate) : all.banks.core.services.convertDateAll(row.chargeDate),
                                                        "NextCycleTotal": monthTotalChargeForRow.totalCharge.replace(/,/g, ''),
                                                        // bankCCMonthlyTotalChargesList.find((it) => it.creditCardIndex === card.index).totalChargesAmount.replace(/,/g, ''),
                                                        "CardStatus": null,
                                                        "TransDesc": businessName,
                                                        "TransTotal": row.chargeAmount.replace(/,/g, ''),
                                                        "ValueDate": row.transactionDate === "0001-01-01T00:00:00"
                                                            ? all.banks.core.services.convertDateAll(monthTotalChargeForRow.chargingDate) // all.banks.core.services.convertDateAll(closeChargeDate)
                                                            : all.banks.core.services.convertDateAll(row.transactionDate),
                                                        "TransCategory": null,
                                                        "TotalPayments": totalPaymentsSum !== null ? Number(totalPaymentsSum) : null,
                                                        "CurrentPaymentNum": currentPaymentNumSum !== null ? Number(currentPaymentNumSum) : null,
                                                        "CardType": all.banks.core.services.getTypeCard(card.ccName),
                                                        "indFakeDate": row.chargeDate === "0001-01-01T00:00:00" ? 1 : 0,
                                                        "currency_id": all.banks.core.services.getTypeCurrencyAll(row.MatbeaMakor),
                                                        // all.banks.core.services.getTypeCurrencyAll(row.chargeCurrencType),
                                                        "original_total": row.transactionAmount.replace(/,/g, ''),
                                                        "ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(chargeCurrencyToTranslate),
                                                        // all.banks.core.services.getTypeCurrencyAll(row.MatbeaMakor),
                                                        "comment": comment
                                                    }, commonPart));
                                                }
                                            }
                                        }
                                    }
                                } catch (e) {
                                    console.log(e)
                                }

                            }

                            // for (let indexCard = 0; indexCard < bankCreditCardsList.length; indexCard++) {
                            //     const card = bankCreditCardsList[indexCard];
                            //     const closeChargeDate = (card.myCloseCharge.closeChargeDate !== "0001-01-01T00:00:00") ? new Date(card.myCloseCharge.closeChargeDate) : (card.myLastCharge.lastChargeDate !== "0001-01-01T00:00:00") ? new Date(card.myLastCharge.lastChargeDate) : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15);
                            //     for (let indexMonth = 0; indexMonth < (all.banks.accountDetails.ccardMonth + 1); indexMonth++) {
                            //         myEmitterLogs(15, card.cc4LastNumber + ' period ' + ("0" + (closeChargeDate.getMonth() + 1)).slice(-2) + '/' + closeChargeDate.getFullYear());
                            //         const getBankCCMonthlyDetails = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/api/CC/getBankCCMonthlyDetails", "POST", {
                            //             "ccIndex": card.index,
                            //             "month": ("0" + (closeChargeDate.getMonth() + 1)).slice(-2) + '' + closeChargeDate.getFullYear()
                            //         });
                            //         if (getBankCCMonthlyDetails && getBankCCMonthlyDetails.body) {
                            //             const {bankCCMonthlyDetailsList, bankCCMonthlyTotalChargesList} = getBankCCMonthlyDetails.body;
                            //             for (let indexRow = 0; indexRow < bankCCMonthlyDetailsList.length; indexRow++) {
                            //                 const row = bankCCMonthlyDetailsList[indexRow];
                            //                 if (row.creditCardIndex === card.index) {
                            //                     let totalPaymentsSum = null;
                            //                     let currentPaymentNumSum = null;
                            //                     let comment = null;
                            //                     if (row.bankCCMonthlyDetailsMoreDetails) {
                            //                         if (row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails) {
                            //                             [currentPaymentNumSum, totalPaymentsSum] = tryParseCurrentAndTotalPayments([
                            //                                 row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails.continuousChargeDetails_currentPaymentNum,
                            //                                 row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails.continuousChargeDetails_totalPaymentNum,
                            //                                 [row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails.continuousChargeDetails_currentPaymentNum,
                            //                                     row.bankCCMonthlyDetailsMoreDetails.myContinuousChargeDetails.continuousChargeDetails_totalPaymentNum]
                            //                                         .join(' מ ')
                            //                             ]);
                            //                         } else if (!!row.bankCCMonthlyDetailsMoreDetails.chargeDetails_hearot
                            //                                     && !!row.bankCCMonthlyDetailsMoreDetails.chargeDetails_type
                            //                                     && ['תשלום', 'קרדיט'].some(key => row.bankCCMonthlyDetailsMoreDetails.chargeDetails_type.includes(key))) {
                            //                                 [currentPaymentNumSum, totalPaymentsSum] = tryParseCurrentAndTotalPayments([row.bankCCMonthlyDetailsMoreDetails.chargeDetails_hearot]);
                            //                         }
                            //                         comment = (row.bankCCMonthlyDetailsMoreDetails.chargeDetails_type + ' ' + row.bankCCMonthlyDetailsMoreDetails.chargeDetails_hearot).trim();
                            //                     }
                            //                     if (row.transactionDate === "0001-01-01T00:00:00") {
                            //                         if (comment) {
                            //                             comment += ' לידיעה בלבד'
                            //                         } else {
                            //                             comment = 'לידיעה בלבד'
                            //                         }
                            //                     }
                            //                     all.banks.generalVariables.allDataArrAshrai.push({
                            //                         "TargetId": all.banks.accountDetails.bank.targetId,
                            //                         "Token": all.banks.accountDetails.bank.token,
                            //                         "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                            //                         "ExporterId": all.banks.spiderConfig.spiderId,
                            //                         'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                            //                         'AccountNumber': parseInt(mizrahiTefahot.AccountsAllJson[i].Number),
                            //                         'BranchNumber': parseInt(mizrahiTefahot.AccountsAllJson[i].BranchForDispaly),
                            //                         "CardNumber": card.cc4LastNumber,
                            //                         "NextBillingDate": row.chargeDate === "0001-01-01T00:00:00" ? all.banks.core.services.convertDateAll(closeChargeDate) : all.banks.core.services.convertDateAll(row.chargeDate),
                            //                         "NextCycleTotal": bankCCMonthlyTotalChargesList.find((it) => it.creditCardIndex === card.index).totalChargesAmount.replace(/,/g, ''),
                            //                         "CardStatus": null,
                            //                         "TransDesc": all.banks.core.services.getStringJson(row.businessName),
                            //                         "TransTotal": row.chargeAmount.replace(/,/g, ''),
                            //                         "ValueDate": row.transactionDate === "0001-01-01T00:00:00" ? all.banks.core.services.convertDateAll(closeChargeDate) : all.banks.core.services.convertDateAll(row.transactionDate),
                            //                         "TransCategory": null,
                            //                         "TotalPayments": totalPaymentsSum !== null ? Number(totalPaymentsSum) : null,
                            //                         "CurrentPaymentNum": currentPaymentNumSum !== null ? Number(currentPaymentNumSum) : null,
                            //                         "CardType": all.banks.core.services.getTypeCard(card.ccName),
                            //                         "indFakeDate": row.chargeDate === "0001-01-01T00:00:00" ? 1 : 0,
                            //                         "currency_id": all.banks.core.services.getTypeCurrencyAll(row.MatbeaMakor),
                            //                                 // all.banks.core.services.getTypeCurrencyAll(row.chargeCurrencType),
                            //                         "original_total": row.transactionAmount.replace(/,/g, ''),
                            //                         "ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(row.chargeCurrencType),
                            //                                 // all.banks.core.services.getTypeCurrencyAll(row.MatbeaMakor),
                            //                         "comment": comment
                            //                     });
                            //                 }
                            //             }
                            //         }
                            //         closeChargeDate.setMonth(closeChargeDate.getMonth() - 1);
                            //     }
                            // }
                        }
                    }
                }

            } catch (e) {
                console.log(e)
            }

            mizrahiTefahot.sendCardsCtrl();
        } catch (e) {
            if (all.banks.accountDetails.IND_NILVIM > 0) {
                mizrahiTefahot.ind = 0;
                myEmitterLogs(21);
                mizrahiTefahot.changBankAccLoan(mizrahiTefahot.ind);
            } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                mizrahiTefahot.ind = 0;
                myEmitterLogs(34);
                mizrahiTefahot.changBankAccMatah(mizrahiTefahot.ind);
            } else {
                all.banks.accounts.mizrahiTefahot.logOff();
            }
        }
    }

    mizrahiTefahot.loadLoan = function (acc) {
        var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/loan/p060.aspx";
        mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/loan/p060.aspx", "GET")
            .then(function (res) {
                try {
                    var res = all.banks.core.services.parseHtml(res);
                    if ($(res).find("#ctl00_ContentPlaceHolder2_grvHalv_ctl00").length) {
                        function loadRows() {
                            $(res).find("#ctl00_ContentPlaceHolder2_grvHalv_ctl00 > tbody > tr").each(function (i, v) {
                                var pathUrl = $(v).find("td:last-child").children("a").attr("data-click2");
                                if (pathUrl !== undefined) {
                                    if (mizrahiTefahot.AccountsAllJson == undefined) {
                                        var urlPerut = "https://mto.mizrahi-tefahot.co.il/Online/" + pathUrl;
                                    } else {
                                        var urlPerut = "https://mto.mizrahi-tefahot.co.il" + pathUrl;
                                    }
                                    var loanDate = $(v).find("td").eq(2).text().replace(/\s/g, "");
                                    var loanFinish = $(v).find("td").eq(3).text().replace(/\s/g, "");
                                    all.banks.generalVariables.allDataArrLoan.push({
                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                        "Token": all.banks.accountDetails.bank.token,
                                        "BankNumber": acc.BankNumber,
                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                        "BranchNumber": acc.BranchNumber,
                                        "AccountNumber": acc.AccountNumber,
                                        "LoanName": $(v).find("td").eq(1).text(),
                                        "LoanNumber": $(v).find("td").eq(0).text(),
                                        "LoanIntrest": $(v).find("td").eq(9).text().replace(/\s\s+/g, ""),
                                        "LoanFinish": all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(loanFinish)),
                                        "LoanTotalLeft": $(v).find("td").eq(11).text().replace(/ /g, '').replace(/,/g, ''),
                                        "LoanDate": all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(loanDate)),
                                        "PaymentsNumberLeft": null,
                                        "LoanOriginalTotal": $(v).find("td").eq(10).text().replace(/ /g, '').replace(/,/g, ''),
                                        "NextPaymentTotal": null,
                                        "LoanNextPaymentDate": urlPerut,
                                        "LoanPigurTotal": null
                                    });
                                    res.find('#ctl00_ContentPlaceHolder2_grvHalv_ctl00 > tbody > tr').eq(0).remove();
                                    var lengthRowsLeft = res.find('#ctl00_ContentPlaceHolder2_grvHalv_ctl00 > tbody > tr').length;
                                    if (lengthRowsLeft == 0) {
                                        nextStepLoan(acc);
                                    } else {
                                        loadRows();
                                    }
                                    return false;
                                } else {
                                    res.find('#ctl00_ContentPlaceHolder2_grvHalv_ctl00 > tbody > tr').eq(0).remove();
                                    var lengthRowsLeft = res.find('#ctl00_ContentPlaceHolder2_grvHalv_ctl00 > tbody > tr').length;
                                    if (lengthRowsLeft == 0) {
                                        nextStepLoan(acc);
                                    } else {
                                        loadRows();
                                    }
                                    return false;
                                }
                            })
                        }

                        loadRows();
                    } else {
                        if (mizrahiTefahot.numberOfOptions > 1) {
                            if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
                                mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
                                mizrahiTefahot.changBankAccLoan(mizrahiTefahot.ind)
                            } else {
                                all.banks.accounts.mizrahiTefahot.sendLoanCtrl();
                            }
                        } else {
                            all.banks.accounts.mizrahiTefahot.sendLoanCtrl();
                        }
                    }

                    function nextStepLoan(acc) {
                        if (res.find(".rgPagerCell.NextPrev .rgPageNext[title='עמוד הבא']").length) {
                            var nameAttr = res.find(".rgPagerCell.NextPrev").eq(0).find(".rgPageNext[title='עמוד הבא']").attr("name");
                            // if (data !== undefined) {
                            // 	res = data;
                            // 	data = null;
                            // }
                            $.when(mizrahiTefahot.loadLoanNextTable(res, nameAttr, acc))
                                .then(function () {
                                    loadAllLinks();
                                });
                        } else {
                            loadAllLinks();
                        }
                    }

                    function loadAllLinks() {
                        $(all.banks.generalVariables.allDataArrLoan).each(function (i, v) {
                            if (v.LoanNextPaymentDate !== null && v.LoanNextPaymentDate.indexOf("mto.mizrahi-tefahot.co.il") !== -1) {
                                mizrahiTefahot.sender(v.LoanNextPaymentDate, "GET")
                                    .then(function (data) {
                                        try {
                                            var data = all.banks.core.services.parseHtml(data);
                                            if ($(data).find("#ctl00_ContentPlaceHolder1_grvHalv_ctl00 tbody tr").length) {
                                                var ParentRadAjaxPanel = $(data).find(".RadAjaxPanel").eq(1).attr("id").replace(/_/g, '$');
                                                const loanPayments = [];

                                                function loadDateNext(data, moreNext) {
                                                    var nextPage = false;
                                                    if (moreNext == undefined) {
                                                        if ($(data).find("thead .rgPagerCell.NextPrev .rgPageNext[title='עמוד הבא']").length) {
                                                            var nameAttr = $(data).find("thead .rgPagerCell.NextPrev .rgPageNext[title='עמוד הבא']").attr("name");
                                                            nextPage = true;
                                                        }
                                                    } else {
                                                        var clickEv = $(data).find(".rgWrap.rgArrPart1 [title='עמוד הבא']");
                                                        if (clickEv.length && clickEv.attr("onclick") !== undefined && clickEv.attr("onclick").indexOf("false") == -1) {
                                                            var nameAttr = clickEv.attr("name");
                                                            nextPage = true;
                                                        }
                                                    }

                                                    $(data).find("#ctl00_ContentPlaceHolder1_grvHalv_ctl00 tbody tr").each(function (indx, val) {
                                                        var dates = $(val).find("td").eq(1).text().split("/");
                                                        loanPayments.push({
                                                            misparTashlum: parseFloat($(val).find("td").eq(0).text()
                                                                .replace(/[^\d-.]/g, "")),
                                                            taarichHiyuv: new Date(parseFloat('20' + dates[2]), parseFloat(dates[1]) - 1, parseFloat(dates[0])),
                                                            tashlumAlHeshbonKeren: $(val).find("td").eq(2).text()
                                                                .replace(/[^\d-.]/g, ""),
                                                            tashlumAlHeshbonRibit: $(val).find("td").eq(3).text()
                                                                .replace(/[^\d-.]/g, ""),
                                                            sahHechzerHodshi: $(val).find("td").eq(4).text()
                                                                .replace(/[^\d-.]/g, ""),
                                                            itratHaKeren: $(val).find("td").eq(5).text()
                                                                .replace(/[^\d-.]/g, "")
                                                        });
                                                    });

                                                    if (nextPage) {
                                                        if (moreNext !== undefined) {
                                                            var post = {
                                                                'ctl00$radScriptManager': ParentRadAjaxPanel + '|' + nameAttr,
                                                                'ctl00_radScriptManager_TSM': '',
                                                                'ctl00_RadStyleSheetManager_TSSM': '',
                                                                'ctl00_ContentPlaceHolder1_grvHalv_ClientState': '',
                                                                '__EVENTTARGET': nameAttr,
                                                                '__EVENTARGUMENT': "",
                                                                "__VIEWSTATE": moreNext.split("__VIEWSTATE")[1].split("|")[1],
                                                                "__VIEWSTATEGENERATOR": moreNext.split("__VIEWSTATEGENERATOR")[1].split("|")[1],
                                                                '__VIEWSTATEENCRYPTED': "",
                                                                "__EVENTVALIDATION": moreNext.split("__EVENTVALIDATION")[1].split("|")[1],
                                                                '__ASYNCPOST': 'true',
                                                                'RadAJAXControlID': "ctl00_ContentPlaceHolder1_RadAjaxManager"
                                                            }
                                                        } else {
                                                            var post = {
                                                                'ctl00$radScriptManager': ParentRadAjaxPanel + '|' + nameAttr,
                                                                'ctl00_radScriptManager_TSM': '',
                                                                'ctl00_RadStyleSheetManager_TSSM': '',
                                                                'ctl00_ContentPlaceHolder1_grvHalv_ClientState': '',
                                                                '__EVENTTARGET': nameAttr,
                                                                '__EVENTARGUMENT': $(data).find('input[name="__EVENTARGUMENT"]').val(),
                                                                '__VIEWSTATE': $(data).find('input[name="__VIEWSTATE"]').val(),
                                                                '__VIEWSTATEGENERATOR': $(data).find('input[name="__VIEWSTATEGENERATOR"]').val(),
                                                                '__VIEWSTATEENCRYPTED': $(data).find('input[name="__VIEWSTATEENCRYPTED"]').val(),
                                                                '__EVENTVALIDATION': $(data).find('input[name="__EVENTVALIDATION"]').val(),
                                                                '__ASYNCPOST': 'true',
                                                                'RadAJAXControlID': "ctl00_ContentPlaceHolder1_RadAjaxManager"
                                                            };
                                                        }
                                                        mizrahiTefahot.sender(v.LoanNextPaymentDate, "POST", post, true)
                                                            .then(function (response) {
                                                                var htmlPage = "<html><body>" + response + "</body></html>";
                                                                var responses = all.banks.core.services.parseHtml(htmlPage);
                                                                loadDateNext(responses, htmlPage)
                                                            })
                                                            .fail(function (error, resErr, urlParam) {
                                                                if (all.banks.generalVariables.allDataArrLoan.length == i + 1) {
                                                                    if (mizrahiTefahot.numberOfOptions > 1) {
                                                                        if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
                                                                            mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
                                                                            mizrahiTefahot.changBankAccLoan(mizrahiTefahot.ind)
                                                                        } else {
                                                                            all.banks.accounts.mizrahiTefahot.sendLoanCtrl();
                                                                        }
                                                                    } else {
                                                                        all.banks.accounts.mizrahiTefahot.sendLoanCtrl();
                                                                    }
                                                                } else {
                                                                    loadAllLinks();
                                                                }
                                                                return false;
                                                            });
                                                    } else {

                                                        if (loanPayments.length) {
                                                            const now = new Date();
                                                            const nextPayment = loanPayments.find(pymnt => pymnt.taarichHiyuv > now)
                                                                || loanPayments[loanPayments.length - 1];
                                                            v.NextPaymentTotal = nextPayment.sahHechzerHodshi;
                                                            v.LoanNextPaymentDate = nextPayment.taarichHiyuv.toLocaleDateString("en-GB");

                                                            v.NumOfPayments = loanPayments[loanPayments.length - 1].misparTashlum;
                                                            v.LastPaymentTotal = loanPayments[loanPayments.length - 1].sahHechzerHodshi;

                                                            const graceNextPayment = loanPayments.find(pymnt => pymnt.tashlumAlHeshbonKeren > 0);
                                                            v.GraceNextPaymentTotal = graceNextPayment ? graceNextPayment.sahHechzerHodshi : null;
                                                            v.GraceNextPaymentDate = graceNextPayment ? graceNextPayment.taarichHiyuv.toLocaleDateString("en-GB") : null;

                                                            v.LoanType = null;
                                                            v.NumOfInterestPayments = null;
                                                            v.LoanFirstPaymentDate = null;
                                                            v.InterestFirstPaymentDate = null;
                                                        }

                                                        if (all.banks.generalVariables.allDataArrLoan.length == i + 1) {
                                                            if (mizrahiTefahot.numberOfOptions > 1) {
                                                                if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
                                                                    mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
                                                                    mizrahiTefahot.changBankAccLoan(mizrahiTefahot.ind)
                                                                } else {
                                                                    all.banks.accounts.mizrahiTefahot.sendLoanCtrl();
                                                                }
                                                            } else {
                                                                all.banks.accounts.mizrahiTefahot.sendLoanCtrl();
                                                            }
                                                        } else {
                                                            loadAllLinks();
                                                        }
                                                        return false;
                                                    }

                                                }

                                                loadDateNext(data);
                                            } else {
                                                v.NextPaymentTotal = null;
                                                v.LoanNextPaymentDate = null;
                                                if (all.banks.generalVariables.allDataArrLoan.length == i + 1) {
                                                    if (mizrahiTefahot.numberOfOptions > 1) {
                                                        if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
                                                            mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
                                                            mizrahiTefahot.changBankAccLoan(mizrahiTefahot.ind)
                                                        } else {
                                                            all.banks.accounts.mizrahiTefahot.sendLoanCtrl();
                                                        }
                                                    } else {
                                                        all.banks.accounts.mizrahiTefahot.sendLoanCtrl();
                                                    }
                                                } else {
                                                    loadAllLinks();
                                                }
                                                return false;
                                            }
                                        } catch (err) {
                                            all.banks.core.services.errorLog(err);
                                        }
                                    }).fail(function (error, resErr, urlParam) {
                                    if (all.banks.generalVariables.allDataArrLoan.length == i + 1) {
                                        if (mizrahiTefahot.numberOfOptions > 1) {
                                            if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
                                                mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
                                                mizrahiTefahot.changBankAccLoan(mizrahiTefahot.ind)
                                            } else {
                                                all.banks.accounts.mizrahiTefahot.sendLoanCtrl();
                                            }
                                        } else {
                                            all.banks.accounts.mizrahiTefahot.sendLoanCtrl();
                                        }
                                    } else {
                                        loadAllLinks();
                                    }
                                });
                                return false;
                            } else {
                                if (all.banks.generalVariables.allDataArrLoan.length == i + 1) {
                                    if (mizrahiTefahot.numberOfOptions > 1) {
                                        if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
                                            mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
                                            mizrahiTefahot.changBankAccLoan(mizrahiTefahot.ind)
                                        } else {
                                            all.banks.accounts.mizrahiTefahot.sendLoanCtrl();
                                        }
                                    } else {
                                        all.banks.accounts.mizrahiTefahot.sendLoanCtrl();
                                    }
                                }
                            }
                        })
                    }

                } catch (err) {
                    all.banks.core.services.errorLog(err)
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    };

    mizrahiTefahot.loadLoanNextTable = function (data, nameAttr, acc) {
        var dfd = jQuery.Deferred();

        function loadRowsNext(data, nameAttr, moreNext) {
            if (moreNext !== undefined) {
                var post = {
                    "ctl00_radScriptManager_TSM": "",
                    "ctl00$radScriptManager": "ctl00$ContentPlaceHolder2$ctl00$ContentPlaceHolder2$grvHalvPanel|" + nameAttr,
                    "ctl00_RadStyleSheetManager_TSSM": "",
                    "__EVENTTARGET": nameAttr,
                    "__EVENTARGUMENT": "",
                    "__VIEWSTATE": moreNext.split("__VIEWSTATE")[1].split("|")[1],
                    "__VIEWSTATEGENERATOR": moreNext.split("__VIEWSTATEGENERATOR")[1].split("|")[1],
                    "__VIEWSTATEENCRYPTED": "",
                    "__EVENTVALIDATION": moreNext.split("__EVENTVALIDATION")[1].split("|")[1],
                    "ctl00_ContentPlaceHolder2_grvHalv_ClientState": "",
                    "ctl00$hdnLinkToExternalSite": "קישור לאתר חיצוני",
                    "__ASYNCPOST": "true",
                    "RadAJAXControlID": "ctl00_ContentPlaceHolder2_RadAjaxManager"
                };
            } else {
                var post = {
                    "ctl00_radScriptManager_TSM": "",
                    "ctl00$radScriptManager": "ctl00$ContentPlaceHolder2$ctl00$ContentPlaceHolder2$grvHalvPanel|" + nameAttr,
                    "ctl00_RadStyleSheetManager_TSSM": "",
                    "__EVENTTARGET": nameAttr,
                    "__EVENTARGUMENT": "",
                    "__VIEWSTATE": data.find('input[name="__VIEWSTATE"]').val(),
                    "__VIEWSTATEGENERATOR": data.find('input[name="__VIEWSTATEGENERATOR"]').val(),
                    "__VIEWSTATEENCRYPTED": "",
                    "__EVENTVALIDATION": data.find('input[name="__EVENTVALIDATION"]').val(),
                    "ctl00_ContentPlaceHolder2_grvHalv_ClientState": "",
                    "ctl00$hdnLinkToExternalSite": "קישור לאתר חיצוני",
                    "__ASYNCPOST": "true",
                    "RadAJAXControlID": "ctl00_ContentPlaceHolder2_RadAjaxManager"
                };
            }

            var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/loan/p060.aspx";
            mizrahiTefahot.sender(url, "POST", post, true)
                .then(function (response) {
                    var htmlPage = "<html><body>" + response + "</body></html>";
                    var res = all.banks.core.services.parseHtml(htmlPage);
                    response = null;
                    if (res.find("#ctl00_ContentPlaceHolder2_grvHalv_ctl00").length) {
                        function loadRows() {
                            $(res).find("#ctl00_ContentPlaceHolder2_grvHalv_ctl00 > tbody > tr").each(function (i, v) {
                                var pathUrl = $(v).find("td:last-child").children("a").attr("data-click2");
                                if (pathUrl !== undefined) {
                                    if (mizrahiTefahot.AccountsAllJson == undefined) {
                                        var urlPerut = "https://mto.mizrahi-tefahot.co.il/Online/" + pathUrl;
                                    } else {
                                        var urlPerut = "https://mto.mizrahi-tefahot.co.il" + pathUrl;
                                    }
                                    var loanDate = $(v).find("td").eq(2).text().replace(/\s/g, "");
                                    var loanFinish = $(v).find("td").eq(3).text().replace(/\s/g, "");
                                    all.banks.generalVariables.allDataArrLoan.push({
                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                        "Token": all.banks.accountDetails.bank.token,
                                        "BankNumber": acc.BankNumber,
                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                        "BranchNumber": acc.BranchNumber,
                                        "AccountNumber": acc.AccountNumber,
                                        "LoanName": $(v).find("td").eq(1).text(),
                                        "LoanNumber": $(v).find("td").eq(0).text(),
                                        "LoanIntrest": $(v).find("td").eq(9).text().replace(/\s\s+/g, ""),
                                        "LoanFinish": all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(loanFinish)),
                                        "LoanTotalLeft": $(v).find("td").eq(11).text().replace(/ /g, '').replace(/,/g, ''),
                                        "LoanDate": all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(loanDate)),
                                        "PaymentsNumberLeft": "",
                                        "LoanOriginalTotal": $(v).find("td").eq(10).text().replace(/ /g, '').replace(/,/g, ''),
                                        "NextPaymentTotal": null,
                                        "LoanNextPaymentDate": urlPerut,
                                        "LoanPigurTotal": null
                                    });
                                    res.find('#ctl00_ContentPlaceHolder2_grvHalv_ctl00 > tbody > tr').eq(0).remove();
                                    var lengthRowsLeft = res.find('#ctl00_ContentPlaceHolder2_grvHalv_ctl00 > tbody > tr').length;
                                    if (lengthRowsLeft == 0) {
                                        nextStepLoan();
                                    } else {
                                        loadRows();
                                    }
                                    return false;
                                } else {
                                    res.find('#ctl00_ContentPlaceHolder2_grvHalv_ctl00 > tbody > tr').eq(0).remove();
                                    var lengthRowsLeft = res.find('#ctl00_ContentPlaceHolder2_grvHalv_ctl00 > tbody > tr').length;
                                    if (lengthRowsLeft == 0) {
                                        dfd.resolve(true);
                                    } else {
                                        loadRows();
                                    }
                                    return false;
                                }
                            })
                        }

                        loadRows();
                    } else {
                        dfd.resolve(true);
                    }

                    function nextStepLoan() {
                        var clickEv = res.find(".rgWrap.rgArrPart1 [title='עמוד הבא']");
                        if (clickEv.length && clickEv.attr("onclick") !== undefined && clickEv.attr("onclick").indexOf("false") == -1) {
                            var nameAttr = clickEv.attr("name");
                            loadRowsNext(res, nameAttr, htmlPage);
                        } else {
                            dfd.resolve(true);
                        }
                    }
                })
                .fail(function (error, resErr, urlParam) {
                    dfd.resolve(true);
                });
        }

        loadRowsNext(data, nameAttr);

        return dfd.promise();
    };
    mizrahiTefahot.loadDepositPahak = function (acc) {
        var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/hs/p440.aspx";
        mizrahiTefahot.sender(url, "GET")
            .then(function (res) {
                try {
                    var res = all.banks.core.services.parseHtml(res);
                    if (res.find('.rgMasterTable tbody tr').length) {
                        $(res).find('.rgMasterTable tbody tr').each(function (i, v) {
                            var depositDate = $(v).find('td').eq(0).text();
                            all.banks.generalVariables.allDataArrDeposit.push({
                                "TargetId": all.banks.accountDetails.bank.targetId,
                                "Token": all.banks.accountDetails.bank.token,
                                "BankNumber": acc.BankNumber,
                                "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                "ExporterId": all.banks.spiderConfig.spiderId,
                                "BranchNumber": acc.BranchNumber,
                                "AccountNumber": acc.AccountNumber,
                                "TypeName": "פקדון חוזר קרדיטורי",
                                "DepositTotal": $(v).find('td').eq(1).text().replace(/ /g, '').replace(/,/g, ''),
                                "DepositAsTotal": $(v).find('td').eq(4).text().replace(/ /g, '').replace(/,/g, '').replace(/\n/g, "").replace(/\t/g, ""),
                                "DueDate": all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal($(v).find('td').eq(5).text())),
                                "DepositDate": all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(depositDate)),
                                "DepositExistStation": null,
                                "DepositNumber": '',
                                "DepositInterest": $(v).find('td').eq(2).find('span').text()
                            });


                            if ($(res).find('.rgMasterTable tbody tr').length == i + 1) {
                                mizrahiTefahot.loadDeposit(acc);
                            }
                        })
                    } else {
                        mizrahiTefahot.loadDeposit(acc);
                    }
                } catch (e) {
                    mizrahiTefahot.loadDeposit(acc);
                }
            })
    };
    mizrahiTefahot.loadDeposit = function (acc) {
        var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/hs/p446.aspx";
        mizrahiTefahot.sender(url, "GET")
            .then(function (res) {
                try {
                    var res = all.banks.core.services.parseHtml(res);

                    if ($(res).find("#ctl00_ContentPlaceHolder2_grvHS_ctl00").length) {
                        $(res).find("#ctl00_ContentPlaceHolder2_grvHS_ctl00 tbody tr").each(function (i, v) {
                            var depositInterest = $(v).find("td").eq(7).text().replace(/\n/g, "").replace(/\t/g, "");
                            // if (depositInterest == "?") {
                            //     depositInterest = $(v).find("td").eq(7).find("span").eq(1).text();
                            // }

                            var dueDate = $(v).find("td").eq(10).text();
                            var depositDate = '';//$(v).find("td").eq(9).text().split('/');
                            var depositExistStation = $(v).find("td").eq(9).text();
                            all.banks.generalVariables.allDataArrDeposit.push({
                                "TargetId": all.banks.accountDetails.bank.targetId,
                                "Token": all.banks.accountDetails.bank.token,
                                "BankNumber": acc.BankNumber,
                                "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                "ExporterId": all.banks.spiderConfig.spiderId,
                                "BranchNumber": acc.BranchNumber,
                                "AccountNumber": acc.AccountNumber,
                                "TypeName": $(v).find("td").eq(1).children("a").text(),
                                "DepositTotal": $(v).find("td").eq(6).text().replace(/ /g, '').replace(/,/g, ''),
                                "DepositAsTotal": $(v).find("td").eq(11).text().replace(/ /g, '').replace(/,/g, '').replace(/\n/g, "").replace(/\t/g, ""),
                                "DueDate": all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(dueDate)),
                                "DepositDate": null,
                                "DepositExistStation": all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(depositExistStation)),
                                "DepositNumber": $(v).find("td").eq(14).text(),
                                "DepositInterest": depositInterest
                            });
                            if ($(res).find("#ctl00_ContentPlaceHolder2_grvHS_ctl00 tbody tr").length == i + 1) {
                                if (mizrahiTefahot.numberOfOptions > 1) {
                                    if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
                                        mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
                                        mizrahiTefahot.changBankAccDeposit(mizrahiTefahot.ind)
                                    } else {
                                        all.banks.accounts.mizrahiTefahot.sendDepositCtrl();
                                    }
                                } else {
                                    all.banks.accounts.mizrahiTefahot.sendDepositCtrl();
                                }
                            }
                        })
                    } else {
                        if (mizrahiTefahot.numberOfOptions > 1) {
                            if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
                                mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
                                mizrahiTefahot.changBankAccDeposit(mizrahiTefahot.ind)
                            } else {
                                all.banks.accounts.mizrahiTefahot.sendDepositCtrl();
                            }
                        } else {
                            all.banks.accounts.mizrahiTefahot.sendDepositCtrl();
                        }
                    }
                } catch (err) {
                    all.banks.core.services.errorLog(err)
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    };
    mizrahiTefahot.loadDueChecks = async function (acc) {
        const dateFrom = new Date();
        const dateTo = new Date(new Date().getFullYear(), new Date().getMonth() + 72, new Date().getDate());

        const commonPart = {
            "TargetId": all.banks.accountDetails.bank.targetId,
            "Token": all.banks.accountDetails.bank.token,
            "BankNumber": acc.BankNumber,
            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
            "ExporterId": all.banks.spiderConfig.spiderId,
            "BranchNumber": acc.BranchNumber,
            "AccountNumber": acc.AccountNumber
        };

        try {

            let result;
            do {
                result = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/api/OSH/getDelayedCheques", "POST",
                    {
                        "inSkyFromDate": [dateFrom.getMonth() + 1, dateFrom.getDate(), dateFrom.getFullYear()]
                            .map(v => String(v).padStart(2, '0')).join('/'),
                        "inSkyToDate": [dateTo.getMonth() + 1, dateTo.getDate(), dateTo.getFullYear()]
                            .map(v => String(v).padStart(2, '0')).join('/'),
                        "inSugChek": "0",
                        "table": {
                            "sortExpression": "Sky425TrPeraonEZ",
                            "sortOrder": "ASC",
                            "startRowIndex": 0,
                            "maxRow": 9999999,
                            "actionGuid": ""
                        }
                    });

                if (!!result && !!result.body && !!result.body.table && Array.isArray(result.body.table.rows)) {
                    for (const row of result.body.table.rows) {
                        const [full, bank, branch, account] = /(\d{1,3})\/(\d{1,3})\/(\d{3,})/g.exec(row.Sky425PrHotemEZ);
                        all.banks.generalVariables.allDataArrDueChecks.push(Object.assign({
                            "CheckNumber": row.Sky425MsCheckEZ, // row.Sky425AsmachtaEZ,
                            "CheckDescription": row.Sky425TeurEZ,
                            "DepositeDate": all.banks.core.services.convertDateAll(new Date(row.Sky425TrHafkdEZ)),
                            "DueDate": all.banks.core.services.convertDateAll(new Date(row.Sky425TrPeraonEZ)),
                            "CheckTotal": row.Sky425SchumEZ,
                            "CheckBankNumber": !!full ? bank : null,
                            "CheckBranchNumber": !!full ? branch : null,
                            "CheckAccountNumber": !!full ? account : null
                        }, commonPart));
                    }
                }

            } while (!!result && !!result.body && !!result.body.table && result.body.table.isHasMoreRows);


            if (mizrahiTefahot.numberOfOptions > 1) {
                if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
                    mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
                    mizrahiTefahot.changBankAccDueChecks(mizrahiTefahot.ind)
                } else {
                    all.banks.accounts.mizrahiTefahot.sendDueChecksCtrl();
                }
            } else {
                all.banks.accounts.mizrahiTefahot.sendDueChecksCtrl();
            }

        } catch (e) {
            all.banks.core.services.errorLog(e);
        }


//        var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/osh/p425.aspx";
//        all.banks.core.services.httpReq(url, 'GET', null, false, false)
//            .then(function (res) {
//                var res = all.banks.core.services.parseHtml(res);
//                var v = $(res).find('#ctl00_radScriptManager_TSM').val();
//                var v1 = $(res).find('#ctl00_RadStyleSheetManager_TSSM').val();
//                var v2 = $(res).find('#__EVENTTARGET').val();
//                var v3 = $(res).find('#__EVENTARGUMENT').val();
//                var v4 = $(res).find('#__LASTFOCUS').val();
//                var v5 = $(res).find('#__VIEWSTATE').val();
//                var v6 = $(res).find('#__VIEWSTATEGENERATOR').val();
//                var v7 = $(res).find('#__VIEWSTATEENCRYPTED').val();
//                var v8 = $(res).find('#__EVENTVALIDATION').val();
//                var v9 = $(res).find('#ddlRules').val();
//                var v22 = $(res).find('#ctl00_ContentPlaceHolder2_ddlSug').val();
//                var v23 = $(res).find('#ctl00_ContentPlaceHolder2_uc428Grid_grvP428G2_ClientState').val();
//                var EVENTARGUMENT = 'ctl00$ContentPlaceHolder2$btnExtraData';
//                var asm = $(res).find("#ctl00_ContentPlaceHolder2_btnNoExtraData")[0];
//                if (asm !== undefined) {
//                    EVENTARGUMENT = 'ctl00$ContentPlaceHolder2$btShow';
//                }
//                var dateFrom = new Date();
//                var dateToFormat = new Date(new Date().getFullYear(), new Date().getMonth() + 36, new Date().getDate());
//
//                var datemakaf = dateFrom.getFullYear() + '-' + ("0" + (dateFrom.getMonth() + 1)).slice(-2) + '-' + ("0" + (dateFrom.getDate())).slice(-2);
//                var datebackslesh = ("0" + (dateFrom.getDate())).slice(-2) + '/' + ("0" + (dateFrom.getMonth() + 1)).slice(-2) + '/' + dateFrom.getFullYear();
//                var datemakafWithMin = dateFrom.getFullYear() + '-' + ("0" + (dateFrom.getMonth() + 1)).slice(-2) + '-' + ("0" + (dateFrom.getDate())).slice(-2) + '-00-00-00';
//                var datePsik = dateFrom.getFullYear() + ',' + ("0" + (dateFrom.getMonth() + 1)).slice(-2) + ',' + ("0" + (dateFrom.getDate())).slice(-2);
//
//                var datemakafTo = dateToFormat.getFullYear() + '-' + ("0" + (dateToFormat.getMonth() + 1)).slice(-2) + '-' + ("0" + (dateToFormat.getDate())).slice(-2);
//                var datebacksleshTo = ("0" + (dateToFormat.getDate())).slice(-2) + '/' + ("0" + (dateToFormat.getMonth() + 1)).slice(-2) + '/' + dateToFormat.getFullYear();
//                var datemakafWithMinTo = dateToFormat.getFullYear() + '-' + ("0" + (dateToFormat.getMonth() + 1)).slice(-2) + '-' + ("0" + (dateToFormat.getDate())).slice(-2) + '-00-00-00';
//                var datePsikTo = dateToFormat.getFullYear() + ',' + ("0" + (dateToFormat.getMonth() + 1)).slice(-2) + ',' + ("0" + (dateToFormat.getDate())).slice(-2);
//                if (mizrahiTefahot.urlPatternNew) {
//                    var jsons = {
//                        "ctl00_radScriptManager_TSM": "",
//                        "ctl00_RadStyleSheetManager_TSSM": "",
//                        "__EVENTTARGET": "",
//                        "__EVENTARGUMENT": "",
//                        "__VIEWSTATE": v5,
//                        "__VIEWSTATEGENERATOR": v6,
//                        "__VIEWSTATEENCRYPTED": "",
//                        "__EVENTVALIDATION": v8,
//                        "ctl00$ContentPlaceHolder2$ddlSug": v22,
//                        'ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker1ID$radDatePickerID': datemakaf,
//                        'ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker1ID$radDatePickerID$dateInput': datebackslesh,
//                        'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_dateInput_ClientState': '{"enabled":true,"emptyMessage":"","validationText":"' + datemakaf + '-00-00-00","valueAsString":"' + datemakaf + '-00-00-00","minDateStr":"' + datemakaf + '-00-00-00","maxDateStr":"2029-12-31-00-00-00","lastSetTextBoxValue":"' + datebackslesh + '"}',
//                        'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_calendar_SD': '[]',
//                        'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_calendar_AD': '[[' + datePsik + '],[2029,12,31],[' + datePsik + ']]',
//                        'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_ClientState': '{"minDateStr":"' + datemakafWithMin + '","maxDateStr":"2029-12-31-00-00-00"}',
//                        'ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker2ID$radDatePickerID': datemakafTo,
//                        'ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker2ID$radDatePickerID$dateInput': datebacksleshTo,
//                        'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_dateInput_ClientState': '{"enabled":true,"emptyMessage":"","validationText":"' + datemakafWithMinTo + '","valueAsString":"' + datemakafWithMinTo + '","minDateStr":"' + datemakafWithMin + '","maxDateStr":"2029-12-31-00-00-00","lastSetTextBoxValue":"' + datebacksleshTo + '"}',
//                        'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_calendar_SD': '[[' + datePsikTo + ']]',
//                        'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_calendar_AD': '[[' + datePsik + '],[2029,12,31],[' + datePsikTo + ']]',
//                        'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_ClientState': '{"minDateStr":"' + datemakafWithMin + '","maxDateStr":"2029-12-31-00-00-00"}',
//                        'ctl00$ContentPlaceHolder2$rdblistSicumim': 'SugCheck',
//                        'ctl00$ContentPlaceHolder2$btShow': 'הצג',
//                        'ctl00_ContentPlaceHolder2_RepeaterBase_ctl00_Repeater1_ctl00_grvDelayedCheque_ClientState': '',
//                        'ctl00$hdnLinkToExternalSite': 'קישור לאתר חיצוני'
//                    }
//                } else {
//                    var jsons = {
//                        'ctl00$radScriptManager': "ctl00$radScriptManager|ctl00$ContentPlaceHolder2$btShow",
//                        'ctl00_radScriptManager_TSM': v,
//                        'ctl00_RadStyleSheetManager_TSSM': v1,
//                        '__EVENTTARGET': EVENTARGUMENT,
//                        '__EVENTARGUMENT': v3,
//                        '__LASTFOCUS': "",
//                        '__VIEWSTATE': v5,
//                        '__VIEWSTATEGENERATOR': v6,
//                        '__VIEWSTATEENCRYPTED': v7,
//                        '__EVENTVALIDATION': v8,
//                        'ctl00$ContentPlaceHolder2$ddlRules': v9,
//                        'ctl00$ContentPlaceHolder2$ddlSug': v22,
//                        'ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker1ID$radDatePickerID': datemakaf,
//                        'ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker1ID$radDatePickerID$dateInput': datebackslesh,
//                        'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_dateInput_ClientState': '{"enabled":true,"emptyMessage":"","validationText":"' + datemakaf + '-00-00-00","valueAsString":"' + datemakaf + '-00-00-00","minDateStr":"' + datemakaf + '-00-00-00","maxDateStr":"2029-12-31-00-00-00","lastSetTextBoxValue":"' + datebackslesh + '"}',
//                        'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_calendar_SD': '[]',
//                        'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_calendar_AD': '[[' + datePsik + '],[2029,12,31],[' + datePsik + ']]',
//                        'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_ClientState': '{"minDateStr":"' + datemakafWithMin + '","maxDateStr":"2029-12-31-00-00-00"}',
//                        'ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker2ID$radDatePickerID': datemakafTo,
//                        'ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker2ID$radDatePickerID$dateInput': datebacksleshTo,
//                        'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_dateInput_ClientState': '{"enabled":true,"emptyMessage":"","validationText":"' + datemakafWithMinTo + '","valueAsString":"' + datemakafWithMinTo + '","minDateStr":"' + datemakafWithMin + '","maxDateStr":"2029-12-31-00-00-00","lastSetTextBoxValue":"' + datebacksleshTo + '"}',
//                        'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_calendar_SD': '[[' + datePsikTo + ']]',
//                        'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_calendar_AD': '[[' + datePsik + '],[2029,12,31],[' + datePsikTo + ']]',
//                        'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_ClientState': '{"minDateStr":"' + datemakafWithMin + '","maxDateStr":"2029-12-31-00-00-00"}',
//                        'ctl00$ContentPlaceHolder2$rdblistSicumim': 'SugCheck',
//                        'ctl00_ContentPlaceHolder2_RepeaterBase_ctl00_Repeater1_ctl00_grvDelayedCheque_ClientState': '',
//                        'ctl00_ContentPlaceHolder2_RepeaterBase_ctl01_Repeater1_ctl00_grvDelayedCheque_ClientState': '',
//                        'ctl00_ContentPlaceHolder2_RepeaterBase_ctl01_Repeater1_ctl01_grvDelayedCheque_ClientState': '',
//                        'ctl00$hdnLinkToExternalSite': 'קישור לאתר חיצוני',
//                        '__ASYNCPOST': 'true',
//                        'RadAJAXControlID': 'ctl00_ContentPlaceHolder2_PageAjaxManager'
//                    };
//                }
//                var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/osh/p425.aspx";
//                all.banks.core.services.httpReq(url, 'POST', jsons, true, false)
//                    .then(function (data) {
//                        try {
//                            var data = all.banks.core.services.parseHtml(data);
//                            if ($(data).find("table.rgMasterTable tbody tr").length) {
//                                $(data).find("table.rgMasterTable tbody tr")
//                                        .filter(function (i, v) {
//                                            return $(v).children("td").length > 6;
//                                        })
//                                        .each(function (i, v) {
//                                    if ($(v).children("td").length == 8) {
//                                        var deBank = $(v).find("td").eq(7).text().split("/");
//                                        var depositeDate = $(v).find("td").eq(4).text();
//                                        var dueDate = $(v).find("td").eq(1).text();
//                                        var checkNumber = $(v).find("td").eq(6).text();
//                                        var checkDescription = $(v).find("td").eq(2).text();
//                                        var checkTotal = $(v).find("td").eq(3).text().replace(/\s/g, "").replace(/,/g, '');
//                                    } else {
//                                        var deBank = $(v).find("td").eq(6).text().split("/");
//                                        var depositeDate = $(v).find("td").eq(3).text();
//                                        var dueDate = $(v).find("td").eq(0).text();
//                                        var checkNumber = $(v).find("td").eq(5).text();
//                                        var checkDescription = $(v).find("td").eq(1).text();
//                                        var checkTotal = $(v).find("td").eq(2).text().replace(/\s/g, "").replace(/,/g, '');
//                                    }
//                                    all.banks.generalVariables.allDataArrDueChecks.push({
//                                        "TargetId": all.banks.accountDetails.bank.targetId,
//                                        "Token": all.banks.accountDetails.bank.token,
//                                        "BankNumber": acc.BankNumber,
//                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
//                                        "ExporterId": all.banks.spiderConfig.spiderId,
//                                        "BranchNumber": acc.BranchNumber,
//                                        "AccountNumber": acc.AccountNumber,
//                                        "CheckNumber": checkNumber,
//                                        "CheckDescription": checkDescription,
//                                        "DepositeDate": all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(depositeDate)),
//                                        "DueDate": all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(dueDate)),
//                                        "CheckTotal": checkTotal,
//                                        "CheckBankNumber": deBank[0],
//                                        "CheckAccountNumber": deBank[2],
//                                        "CheckBranchNumber": deBank[1]
//                                    });
//                                    if ($(data).find("table.rgMasterTable tbody tr").length == i + 1) {
//                                        if (mizrahiTefahot.numberOfOptions > 1) {
//                                            if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
//                                                mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
//                                                mizrahiTefahot.changBankAccDueChecks(mizrahiTefahot.ind)
//                                            } else {
//                                                all.banks.accounts.mizrahiTefahot.sendDueChecksCtrl();
//                                            }
//                                        } else {
//                                            all.banks.accounts.mizrahiTefahot.sendDueChecksCtrl();
//                                        }
//                                    }
//                                })
//                            } else {
//                                if (mizrahiTefahot.numberOfOptions > 1) {
//                                    if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
//                                        mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
//                                        mizrahiTefahot.changBankAccDueChecks(mizrahiTefahot.ind)
//                                    } else {
//                                        all.banks.accounts.mizrahiTefahot.sendDueChecksCtrl();
//                                    }
//                                } else {
//                                    all.banks.accounts.mizrahiTefahot.sendDueChecksCtrl();
//                                }
//                            }
//                        } catch (err) {
//                            all.banks.core.services.errorLog(err)
//                        }
//                    })
//                    .fail(function (error, resErr, urlParam) {
//                        var logErr = "restUrl: " + urlParam + ", status: " + error.status;
//                        all.banks.core.services.errorLog(logErr)
//                    });
//            })
//            .fail(function (error, resErr, urlParam) {
//                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
//                all.banks.core.services.errorLog(logErr)
//            });
    };
    mizrahiTefahot.loadStandingOrders = function (acc) {
        mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/api/OSH/getManagePermissionsData", "POST", {})
            .then(function (res) {
                try {
                    if (res.body && res.body.table && res.body.table.rows && res.body.table.rows.length && res.body.table.rows[0].P485GUnified && res.body.table.rows[0].P485GUnified.length) {
                        res.body.table.rows[0].P485GUnified.forEach(function (item) {
                            var BankTransferNumber = null,
                                BranchTransferNumber = null,
                                AccountTransferNumber = null;
                            const splitOshLakoachMisEZ = item.OshLakoachMisEZ.split('-');
                            if (splitOshLakoachMisEZ.length === 2) {
                                BankTransferNumber = 20;
                                BranchTransferNumber = splitOshLakoachMisEZ[0];
                                AccountTransferNumber = splitOshLakoachMisEZ[1];
                            } else if (splitOshLakoachMisEZ.length === 3) {
                                BankTransferNumber = splitOshLakoachMisEZ[0];
                                BranchTransferNumber = splitOshLakoachMisEZ[1];
                                AccountTransferNumber = splitOshLakoachMisEZ[2];
                            }
                            all.banks.generalVariables.allDataArrStandingOrders.push({
                                "TargetId": all.banks.accountDetails.bank.targetId,
                                "Token": all.banks.accountDetails.bank.token,
                                "BankNumber": acc.BankNumber,
                                "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                "ExporterId": all.banks.spiderConfig.spiderId,
                                "BranchNumber": acc.BranchNumber,
                                "AccountNumber": acc.AccountNumber,
                                "OrderName": item.OshPirtiEZ,
                                "OrderOpeningDate": all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(item.OshTaarichBegEZ)),
                                "OrderLastDate": all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(item.OshTaarichEndEZ)),
                                "OrderTotal": item.OshSchumEZ,
                                "OrderNumber": null,
                                "Asmachta": item.OshHoraaEZ,
                                BankTransferNumber: BankTransferNumber,
                                BranchTransferNumber: BranchTransferNumber,
                                AccountTransferNumber: AccountTransferNumber,
                                NamePayerTransfer: item.OshLakoachShmEZ,
                                Type: 2,
                            });
                        })
                    }

                    p485Run();
                } catch (e) {
                    p485Run();
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });

        function p485Run() {
            var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/osh/p485.aspx";
            mizrahiTefahot.sender(url, "GET")
                .then(function (data) {
                    try {
                        var data = all.banks.core.services.parseHtml(data);
                        const rows = $(data).find("#ctl00_ContentPlaceHolder2_pnlHarshaot2 table.rgMasterTable tbody tr");

                        if (rows.length) {
                            rows.each(function (i, v) {
                                if ($(v).children("td").eq(0).text() === 'הרשאות בהעברה') {
                                    myEmitterLogs(24, 'הרשאות בהעברה');
                                } else {
                                    var orderOpeningDate = $(v).children("td").eq(4).text().replace(/\s/g, "").trim();
                                    var orderLastDate = $(v).children("td").eq(6).text().replace(/\s/g, "").trim();
                                    all.banks.generalVariables.allDataArrStandingOrders.push({
                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                        "Token": all.banks.accountDetails.bank.token,
                                        "BankNumber": acc.BankNumber,
                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                        "BranchNumber": acc.BranchNumber,
                                        "AccountNumber": acc.AccountNumber,
                                        "OrderName": $(v).children("td").eq(0).text().replace(/\s\s+/g, ""),
                                        "OrderOpeningDate": all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(orderOpeningDate)),
                                        "OrderLastDate": all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(orderLastDate)),
                                        "OrderTotal": $(v).children("td").eq(10).text().replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, ''),
                                        "OrderNumber": $(v).children("td").eq(1).text().replace(/\s/g, ""),
                                        "Asmachta": $(v).children("td").eq(3).text().replace(/\s/g, ""),
                                        BankTransferNumber: null,
                                        BranchTransferNumber: null,
                                        AccountTransferNumber: null,
                                        NamePayerTransfer: null,
                                        Type: 1,
                                    });
                                }

                                if (rows.length == i + 1) {
                                    moveOn();
                                }
                            });
                        } else {
                            moveOn();
                        }

                        function moveOn() {
                            if (mizrahiTefahot.numberOfOptions > 1) {
                                if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
                                    mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
                                    mizrahiTefahot.changBankAccStandingOrders(mizrahiTefahot.ind)
                                } else {
                                    all.banks.accounts.mizrahiTefahot.sendStandingOrdersCtrl();
                                }
                            } else {
                                all.banks.accounts.mizrahiTefahot.sendStandingOrdersCtrl();
                            }
                        }
                    } catch (err) {
                        all.banks.core.services.errorLog(err)
                    }
                })
                .fail(function (error, resErr, urlParam) {
                    var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                    all.banks.core.services.errorLog(logErr)
                });
        }
    };
    mizrahiTefahot.loadOshPageMain = function () {
        if (mizrahiTefahot.urlOshNew == undefined) {
            var url = "https://mto.mizrahi-tefahot.co.il/Online/Osh/P428.aspx";
        } else {
            var url = mizrahiTefahot.urlOshNew;
        }
        all.banks.core.services.httpReq(url, 'GET', null, false, false)
            .then(function (data3) {
                try {
                    var data3 = all.banks.core.services.parseHtml(data3);
                    if ($(data3).find('.error_msg').length == 0) {
                        mizrahiTefahot.loadOsh(data3);
                    } else {
                        if (mizrahiTefahot.numberOfOptions > 1) {
                            all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].DataRow = [];
                            if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
                                mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
                                mizrahiTefahot.changBankAcc(mizrahiTefahot.ind)
                            } else {
                                all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].DataRow = [];
                                console.log(all.banks.generalVariables.allDataArr)
                                all.banks.accounts.mizrahiTefahot.sendOshCtrl();
                            }
                        } else {
                            all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].DataRow = [];
                            all.banks.accounts.mizrahiTefahot.sendOshCtrl();
                        }
                    }
                } catch (err) {
                    all.banks.core.services.errorLog(err)
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    };
    mizrahiTefahot.loadOsh = function (data3) {
        myEmitterLogs(11); // get data
        var v = $(data3).find('#ctl00_radScriptManager_TSM').val();
        var v1 = $(data3).find('#ctl00_RadStyleSheetManager_TSSM').val();
        var v2 = $(data3).find('#__EVENTTARGET').val();
        var v3 = $(data3).find('#__EVENTARGUMENT').val();
        var v4 = $(data3).find('#__LASTFOCUS').val();
        var v5 = $(data3).find('#__VIEWSTATE').val();
        var v6 = $(data3).find('#__VIEWSTATEGENERATOR').val();
        var v7 = $(data3).find('#__VIEWSTATEENCRYPTED').val();
        var v8 = $(data3).find('#__EVENTVALIDATION').val();
//		var v9 = $(data3).find('#ddlRules').val();
        var v10 = $(data3).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID').val();
        var v11 = $(data3).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID_dateInput').val();
        var v12 = $(data3).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID_dateInput_ClientState').val();
        var v13 = $(data3).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID_calendar_SD').val();
        var v14 = $(data3).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID_calendar_AD').val();
        var v15 = $(data3).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID_ClientState').val();
        var v16 = $(data3).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID').val();
        var v17 = $(data3).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID_dateInput').val();
        var v18 = $(data3).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID_dateInput_ClientState').val();
        var v19 = $(data3).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID_calendar_SD').val();
        var v20 = $(data3).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID_calendar_AD').val();
        var v21 = $(data3).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID_ClientState').val();
        var v22 = $(data3).find('#ctl00_ContentPlaceHolder2_ddlSug').val();
        var v23 = $(data3).find('#ctl00_ContentPlaceHolder2_uc428Grid_grvP428G2_ClientState').val();
        var EVENTARGUMENT = 'ctl00$ContentPlaceHolder2$btnExtraData';
        var asm = $(data3).find("#ctl00_ContentPlaceHolder2_btnNoExtraData")[0];
        if (asm !== undefined) {
            EVENTARGUMENT = 'ctl00$ContentPlaceHolder2$btShow';
        }
        var jsons = {
            'ctl00_radScriptManager_TSM': v,
            'ctl00_RadStyleSheetManager_TSSM': v1,
            '__EVENTTARGET': EVENTARGUMENT,
            '__EVENTARGUMENT': v3,
            '__LASTFOCUS': "",
            '__VIEWSTATE': v5,
            '__VIEWSTATEGENERATOR': v6,
            '__VIEWSTATEENCRYPTED': v7,
            '__EVENTVALIDATION': v8,
//			'ctl00$ContentPlaceHolder2$ddlRules': v9,
            'ctl00$ContentPlaceHolder2$SkyDRP$SkyDatePicker1ID$radDatePickerID': all.banks.accounts.mizrahiTefahot.datemakaf,
            'ctl00$ContentPlaceHolder2$SkyDRP$SkyDatePicker1ID$radDatePickerID$dateInput': all.banks.accounts.mizrahiTefahot.datebackslesh,
            'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID_dateInput_ClientState': '{"enabled":true,"emptyMessage":"","validationText":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMin + '","valueAsString":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMin + '","minDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMin + '","maxDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMinTo + '","lastSetTextBoxValue":"' + all.banks.accounts.mizrahiTefahot.datebackslesh + '"}',
            'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID_calendar_SD': '[[' + all.banks.accounts.mizrahiTefahot.datePsik + ']]',
            'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID_calendar_AD': '[[' + all.banks.accounts.mizrahiTefahot.datePsik + '],[' + all.banks.accounts.mizrahiTefahot.datePsikTo + '],[' + all.banks.accounts.mizrahiTefahot.datePsik + ']]',
            'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID_ClientState': '{"minDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMin + '","maxDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMinTo + '"}',
            'ctl00$ContentPlaceHolder2$SkyDRP$SkyDatePicker2ID$radDatePickerID': all.banks.accounts.mizrahiTefahot.datemakafTo,
            'ctl00$ContentPlaceHolder2$SkyDRP$SkyDatePicker2ID$radDatePickerID$dateInput': all.banks.accounts.mizrahiTefahot.datebacksleshTo,
            'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID_dateInput_ClientState': '{"enabled":true,"emptyMessage":"","validationText":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMinTo + '","valueAsString":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMinTo + '","minDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMin + '","maxDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMinTo + '","lastSetTextBoxValue":"' + all.banks.accounts.mizrahiTefahot.datebacksleshTo + '"}',
            'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID_calendar_SD': '[]',
            'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID_calendar_AD': '[[' + all.banks.accounts.mizrahiTefahot.datePsik + '],[' + all.banks.accounts.mizrahiTefahot.datePsikTo + '],[' + all.banks.accounts.mizrahiTefahot.datePsikTo + ']]',
            'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID_ClientState': '{"minDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMin + '","maxDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMinTo + '"}',
            'ctl00$ContentPlaceHolder2$ddlSug': v22,
            'ctl00_ContentPlaceHolder2_uc428Grid_grvP428G2_ClientState': v23,
            '__ASYNCPOST': false,
//			'RadAJAXControlID': 'ctl00_ContentPlaceHolder2_PageAjaxManager',
            'RadAJAXControlID': 'ctl00_ContentPlaceHolder2_uc428Grid_PageAjaxPanel'
        };
        if (mizrahiTefahot.urlOshNew == undefined) {
            var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/Osh/P428.aspx";
        } else {
            var url = mizrahiTefahot.urlOshNew;
        }
        all.banks.core.services.httpReq(url, 'POST', jsons, true, false)
            .then(function (data4) {
                var data4 = all.banks.core.services.parseHtml(data4);
                try {
                    if (data4.find('.error_msg').length == 0) {
                        var arrSliceA = [];
                        var rgMasterTable = data4.find('.rgMasterTable').children('tbody').find("tr").not(".nestedTitle");
                        if (rgMasterTable.length > 0) {
                            $(rgMasterTable).each(function (i, v) {
                                var transactionType = null;
                                if (v.cells[4].childNodes.length > 0) {
                                    if (v.cells[4].childNodes[0].data.indexOf("-") == -1) {
                                        transactionType = "1";
                                    } else {
                                        transactionType = "0";
                                    }
                                }
                                var isDay = "0";
                                if ($(v).children("td").eq(2).text() == "05") {
                                    isDay = "1";
                                }
                                var balance = null;
                                if (v.cells[5].childNodes.length > 0) {
                                    balance = v.cells[5].childNodes[0].data.replace(/ /g, '').replace(/,/g, '')
                                }
                                var asmachta = null;
                                if (v.cells[6].childNodes.length > 0) {
                                    asmachta = v.cells[6].childNodes[0].data;
                                }
                                var transDesc = null,
                                    imgs = null,
                                    valDate = v.cells[0].childNodes && (v.cells[0].childNodes.length > 0)
                                        ? all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(v.cells[0].childNodes[0].data))
                                        : arrSliceA.length > 0 ? arrSliceA[arrSliceA.length - 1].ValueDate : null;
                                var objectRow;
                                if (v.cells[3].childNodes.length > 0) {
                                    if (v.cells[3].childNodes[0].data !== undefined) {
                                        if (v.cells[4].childNodes.length) {
                                            transDesc = v.cells[3].childNodes[0].data;
                                            objectRow = {
                                                "Asmachta": asmachta,
                                                "TransDesc": all.banks.core.services.getStringJson(transDesc),
                                                "ValueDate": valDate,
                                                "TransactionType": transactionType,
                                                "TransTotal": v.cells[4].childNodes[0].data.replace(/ /g, '').replace(/,/g, '').replace('-', ''),
                                                "Balance": balance,
                                                "IsDaily": isDay,
                                                "imgs": imgs
                                            };
                                            if ($(v).find('td.expandItem > a').length) {
                                                objectRow.DepositeTransferData = $(v).find('td.expandItem > a').attr('href').split('(')[1].split(')')[0].split(",")[0].replace(/'/g, '');
                                            }
                                            arrSliceA.push(objectRow);
                                        }
                                    } else {
                                        transDesc = v.cells[3].childNodes[0].childNodes[0].data;
                                        if (v.cells[3].childNodes.length == 2) {
                                            if (all.banks.accountDetails.checks == true) {
                                                var imgProp = $(v).children("td").eq(3).children("a");
                                                if (imgProp.data("controller") !== undefined) {
                                                    imgs = [imgProp.data("chequeindex"), imgProp.data("controller").replace(/'/g, ''), asmachta];
                                                }
                                            }
                                            objectRow = {
                                                "Asmachta": asmachta,
                                                "TransDesc": all.banks.core.services.getStringJson(transDesc),
                                                "ValueDate": valDate,
                                                "TransactionType": transactionType,
                                                "TransTotal": v.cells[4].childNodes[0].data.replace(/ /g, '').replace(/,/g, '').replace('-', ''),
                                                "Balance": balance,
                                                "IsDaily": isDay,
                                                "imgs": imgs
                                            }
                                            if ($(v).find('td.expandItem > a').length) {
                                                objectRow.DepositeTransferData = $(v).find('td.expandItem > a').attr('href').split('(')[1].split(')')[0].split(",")[0].replace(/'/g, '');
                                            }
                                            arrSliceA.push(objectRow)
                                        } else {
                                            objectRow = {
                                                "Asmachta": asmachta,
                                                "TransDesc": all.banks.core.services.getStringJson(transDesc),
                                                "ValueDate": valDate,
                                                "TransactionType": transactionType,
                                                "TransTotal": v.cells[4].childNodes[0].data.replace(/ /g, '').replace(/,/g, '').replace('-', ''),
                                                "Balance": balance,
                                                "IsDaily": isDay,
                                                "imgs": imgs
                                            }
                                            if ($(v).find('td.expandItem > a').length) {
                                                objectRow.DepositeTransferData = $(v).find('td.expandItem > a').attr('href').split('(')[1].split(')')[0].split(",")[0].replace(/'/g, '');
                                            }
                                            arrSliceA.push(objectRow)
                                        }
                                    }
                                } else {
                                    objectRow = {
                                        "Asmachta": asmachta,
                                        "TransDesc": all.banks.core.services.getStringJson(transDesc),
                                        "ValueDate": valDate,
                                        "TransactionType": transactionType,
                                        "TransTotal": v.cells[4].childNodes[0].data.replace(/ /g, '').replace(/,/g, '').replace('-', ''),
                                        "Balance": balance,
                                        "IsDaily": isDay,
                                        "imgs": imgs
                                    }
                                    if ($(v).find('td.expandItem > a').length) {
                                        objectRow.DepositeTransferData = $(v).find('td.expandItem > a').attr('href').split('(')[1].split(')')[0].split(",")[0].replace(/'/g, '');
                                    }
                                    arrSliceA.push(objectRow)
                                }
                                if (rgMasterTable.length == i + 1) {
                                    getAllChecks()
                                }
                            });
                        } else {
                            getAllChecks()
                        }

                        function getAllChecks() {
                            clearTimeout(mizrahiTefahot.timeOutFunc);
                            try {
                                var ret = false;
                                if (arrSliceA.length) {
                                    $(arrSliceA).each(function (i, v) {
                                        if (v.imgs !== null && Object.prototype.toString.call(v.imgs) === '[object Array]' && v.imgs[0].Asmachta == undefined && v.imgs[0].ImageNameKey == undefined) {
                                            $.when(mizrahiTefahot.getBase64FromImageUrl(v.imgs[0], v.imgs[1], v.imgs[2]))
                                                .then(function (status) {
                                                    v.imgs = status;
                                                    mizrahiTefahot.timeOutFunc = setTimeout(function () {
                                                        clearTimeout(mizrahiTefahot.timeOutFunc);
                                                        getAllChecks();
                                                    }, 500)
                                                })
                                            ret = true;
                                            return false;
                                        } else if (v.DepositeTransferData !== undefined && v.DepositeTransferData !== null && Object.prototype.toString.call(v.DepositeTransferData) !== '[object Array]') {
                                            $.when(mizrahiTefahot.loadHaavara(data4, v.DepositeTransferData, v.TransTotal, v.ValueDate, v.TransactionType))
                                                .then(function (status) {
                                                    v.DepositeTransferData = status;
                                                    mizrahiTefahot.timeOutFunc = setTimeout(function () {
                                                        clearTimeout(mizrahiTefahot.timeOutFunc);
                                                        getAllChecks();
                                                    }, 500)
                                                })
                                            ret = true;
                                            return false;
                                        } else {
                                            if ($(arrSliceA).length == (i + 1)) {
                                                Array.prototype.push.apply(mizrahiTefahot.arr, arrSliceA);
                                                mizrahiTefahot.dataPage = data4;
                                                mizrahiTefahot.loadNextAll(data4)
                                            }
                                        }
                                    })
                                } else {
                                    Array.prototype.push.apply(mizrahiTefahot.arr, arrSliceA);
                                    mizrahiTefahot.dataPage = data4;
                                    mizrahiTefahot.loadNextAll(data4);
                                }
                            } catch (err) {
                                all.banks.core.services.errorLog(err)
                            }
                        }
                    } else {
                        if (mizrahiTefahot.numberOfOptions > 1) {
                            all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].DataRow = mizrahiTefahot.arr;
                            if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
                                mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
                                mizrahiTefahot.changBankAcc(mizrahiTefahot.ind)
                            } else {
                                all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].DataRow = mizrahiTefahot.arr;
                                console.log(all.banks.generalVariables.allDataArr)
                                all.banks.accounts.mizrahiTefahot.sendOshCtrl();
                            }
                        } else {
                            all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].DataRow = mizrahiTefahot.arr;
                            console.log(all.banks.generalVariables.allDataArr)
                            all.banks.accounts.mizrahiTefahot.sendOshCtrl();
                        }
                    }
                } catch (err) {
                    all.banks.core.services.errorLog(err)
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    };
    mizrahiTefahot.loadHaavara = function (data3, EVENTTARGET, total, date, transactionType) {
        var dfd = jQuery.Deferred();
        var v = $(data3).find('#ctl00_radScriptManager_TSM').val();
        var v1 = $(data3).find('#ctl00_RadStyleSheetManager_TSSM').val();
        var v4 = $(data3).find('#__LASTFOCUS').val();
        var v5 = $(data3).find('#__VIEWSTATE').val();
        var v6 = $(data3).find('#__VIEWSTATEGENERATOR').val();
        var v7 = $(data3).find('#__VIEWSTATEENCRYPTED').val();
        var v8 = $(data3).find('#__EVENTVALIDATION').val();
        var v9 = $(data3).find('#ddlRules').val();
        var v22 = $(data3).find('#ctl00_ContentPlaceHolder2_ddlSug').val();
        var v23 = $(data3).find('#ctl00_ContentPlaceHolder2_uc428Grid_grvP428G2_ClientState').val();
        if (v5 == undefined) {
            var dataVal = data3[0].body.childNodes[2].data;
            var v4 = dataVal.split('|')[13];
            var v5 = dataVal.split('|')[16];
            var v6 = dataVal.split('|')[20];
            var v8 = dataVal.split('|')[28];
            var v7 = dataVal.split('|')[25];
            var v3 = dataVal.split('|')[9];
        }
        var jsons = {
            'ctl00$radScriptManager': "ctl00$ContentPlaceHolder2$ctl00$ContentPlaceHolder2$uc428Grid$grvP428G2Panel|" + EVENTTARGET,
            'ctl00_RadStyleSheetManager_TSSM': v1,
            '__EVENTTARGET': EVENTTARGET,
            '__EVENTARGUMENT': "",
            '__LASTFOCUS': v4,
            '__VIEWSTATE': v5,
            '__VIEWSTATEGENERATOR': v6,
            '__VIEWSTATEENCRYPTED': v7,
            '__EVENTVALIDATION': v8,
            'ctl00$ContentPlaceHolder2$ddlRules': v9,
            'ctl00$ContentPlaceHolder2$SkyDRP$SkyDatePicker1ID$radDatePickerID': all.banks.accounts.mizrahiTefahot.datemakaf,
            'ctl00$ContentPlaceHolder2$SkyDRP$SkyDatePicker1ID$radDatePickerID$dateInput': all.banks.accounts.mizrahiTefahot.datebackslesh,
            'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID_dateInput_ClientState': '{"enabled":true,"emptyMessage":"","validationText":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMin + '","valueAsString":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMin + '","minDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMin + '","maxDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMinTo + '","lastSetTextBoxValue":"' + all.banks.accounts.mizrahiTefahot.datebackslesh + '"}',
            'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID_calendar_SD': '[[' + all.banks.accounts.mizrahiTefahot.datePsik + ']]',
            'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID_calendar_AD': '[[' + all.banks.accounts.mizrahiTefahot.datePsik + '],[' + all.banks.accounts.mizrahiTefahot.datePsikTo + '],[' + all.banks.accounts.mizrahiTefahot.datePsik + ']]',
            'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID_ClientState': '{"minDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMin + '","maxDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMinTo + '"}',
            'ctl00$ContentPlaceHolder2$SkyDRP$SkyDatePicker2ID$radDatePickerID': all.banks.accounts.mizrahiTefahot.datemakafTo,
            'ctl00$ContentPlaceHolder2$SkyDRP$SkyDatePicker2ID$radDatePickerID$dateInput': all.banks.accounts.mizrahiTefahot.datebacksleshTo,
            'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID_dateInput_ClientState': '{"enabled":true,"emptyMessage":"","validationText":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMinTo + '","valueAsString":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMinTo + '","minDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMin + '","maxDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMinTo + '","lastSetTextBoxValue":"' + all.banks.accounts.mizrahiTefahot.datebacksleshTo + '"}',
            'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID_calendar_SD': '[]',
            'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID_calendar_AD': '[[' + all.banks.accounts.mizrahiTefahot.datePsik + '],[' + all.banks.accounts.mizrahiTefahot.datePsikTo + '],[' + all.banks.accounts.mizrahiTefahot.datePsikTo + ']]',
            'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID_ClientState': '{"minDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMin + '","maxDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMinTo + '"}',
            'ctl00$ContentPlaceHolder2$ddlSug': v22,
            'ctl00_ContentPlaceHolder2_uc428Grid_grvP428G2_ClientState': v23,
            '__ASYNCPOST': true,
            'ctl00$hdnLinkToExternalSite': 'קישור לאתר חיצוני',
            'RadAJAXControlID': 'ctl00_ContentPlaceHolder2_PageAjaxManager',
            'RadAJAXControlID': 'ctl00_ContentPlaceHolder2_uc428Grid_PageAjaxPanel'
        };
        if (mizrahiTefahot.urlOshNew == undefined) {
            var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/Osh/P428.aspx";
        } else {
            var url = mizrahiTefahot.urlOshNew;
        }
        all.banks.core.services.httpReq(url, 'POST', jsons, true, false)
            .then(function (res) {
                try {
                    var allRes = "<html><body>" + res + "</body></html>";
                    var divIdMain = EVENTTARGET.replace(/\$/g, '_').replace('EditButton', 'EditFormControl_pnlBirurim');
                    var divIdNum = divIdMain.split("_")[5].replace(/\D/g, "");
                    if (divIdNum.length <= 2) {
                        var nums = "ctl" + ("0" + (parseFloat(divIdNum) + 1)).slice(-2);
                    }
                    if (divIdNum.length >= 3) {
                        var nums = "ctl" + (parseFloat(divIdNum) + 1);
                    }
                    var divId = divIdMain.split("_")[0] + '_' + divIdMain.split("_")[1] + '_' + divIdMain.split("_")[2] + '_' + divIdMain.split("_")[3] + '_' + divIdMain.split("_")[4] + '_' + nums + '_' + divIdMain.split("_")[6] + '_' + divIdMain.split("_")[7];
                    var allRes = all.banks.core.services.parseHtml(allRes);
                    var contentRow = $(allRes).find('#' + divId + ' tr');
                    var rowOne = $(contentRow).eq(0).find('td').eq(0).text();

                    if (!contentRow.length || rowOne.indexOf("סוג מטבע") !== -1 || rowOne.indexOf("תאור נייר") !== -1) {
                        dfd.resolve(null);
                    } else {
                        const haavaraInfo = {
                            "DepositeTransferDate": date,
                            "TransferTotal": transactionType == '0' ? (total * -1) : total
                        };
                        $(allRes).find('#' + divId + ' td').each(function () {
                            const txt = $(this).text();
                            if (txt.includes('מהות העברה:')) {
                                haavaraInfo["DetailsTransfer"] = txt.replace('מהות העברה:', '').replace(/\s\s+/g, "");
                            } else if (txt.includes('שם מוטב:') || txt.includes('שם המעביר:') || txt.includes('שם לקוח:')) {
                                haavaraInfo["NamePayerTransfer"] = txt.replace('שם מוטב:', '').replace('שם המעביר:', '').replace('שם לקוח:', '').replace(/\s\s+/g, "");
                            } else if (txt.includes('בנק:')) {
                                haavaraInfo["BankTransferNumber"] = txt.replace(/\D/g, "");
                            } else if (txt.includes('בנק מזוכה:') || txt.includes('בנק חובה:')) {
                                haavaraInfo["BankTransferNumber"] = $(this).next('td').text().replace(/\D/g, "");
                            } else if (txt.includes('סניף:')) {
                                haavaraInfo["BranchTransferNumber"] = txt.replace(/\D/g, "");
                            } else if (txt.includes('סניף מזוכה:') || txt.includes('סניף חובה:')) {
                                haavaraInfo["BranchTransferNumber"] = $(this).next('td').text().replace(/\D/g, "");
                            } else if (txt.includes('חשבון:')) {
                                haavaraInfo["AccountTransferNumber"] = txt.replace(/\D/g, "");
                            } else if (txt.includes('חשבון מזוכה:') || txt.includes('חשבון חובה:')) {
                                haavaraInfo["AccountTransferNumber"] = $(this).next('td').text().replace(/\D/g, "");
                            }
                        });

                        ['BankTransferNumber', 'BranchTransferNumber', 'AccountTransferNumber']
                            .filter(k => haavaraInfo[k] && /^\d+$/g.test(haavaraInfo[k]))
                            .forEach(k => haavaraInfo[k] = Number(haavaraInfo[k]));

                        dfd.resolve([haavaraInfo]);
//					var namePayerTransfer = null;
//					if ($(contentRow).length < 4) {
//						if ($(contentRow).eq(1).find('td').eq(1).text().indexOf("סניף מבצע") == -1) {
//							namePayerTransfer = $(contentRow).eq(1).find('td').eq(1).text().split(":")[1];
//							if (namePayerTransfer !== undefined) {
//								namePayerTransfer = namePayerTransfer.replace(/\s\s+/g, "");
//							}
//						}
//					} else if (contentRow.length === 4 && contentRow.eq(3).find('td').eq(1).text().includes('שם מוטב:')) {
//						namePayerTransfer = contentRow.eq(3).find('td').eq(1).text().split(':')[1].replace(/\s\s+/g, "");
//					}
//
//					var detailsTransfer = null;
//					if ($(contentRow).length !== 2) {
//						detailsTransfer = $(contentRow).eq(2).find('td').eq(0).text().split(":")[1];
//						if (detailsTransfer !== undefined) {
//							detailsTransfer = detailsTransfer.replace(/\s\s+/g, "");
//						}
//					}
//					if (transactionType == '0') {
//						total = total * (-1);
//					}
//					dfd.resolve([{
//						"DepositeTransferDate": date,
//						"BankTransferNumber": $(contentRow).eq(0).find('td').eq(0).text().replace(/\D/g, ""),
//						"BranchTransferNumber": $(contentRow).eq(0).find('td').eq(1).text().replace(/\D/g, ""),
//						"AccountTransferNumber": $(contentRow).eq(1).find('td').eq(0).text().replace(/\D/g, ""),
//						"NamePayerTransfer": namePayerTransfer,
//						"DetailsTransfer": detailsTransfer,
//						"TransferTotal": total
//					}]);
                    }
                } catch (err) {
                    all.banks.core.services.errorLog(err)
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr);
            });
        return dfd.promise();
    };
    mizrahiTefahot.loadNextAll = function (data4, load2) {
        try {
            //var data4 = $(data4);
            var cccc = data4.find(".rgWrap.rgArrPart1 [title='עמוד הבא']").attr('onclick');
            if (cccc !== undefined && cccc.indexOf("WebForm_DoPostBackWithOptions") == -1) {
                myEmitterLogs(31);//next page
                var clickEv = $(data4).find(".rgWrap.rgArrPart1 [title='עמוד הבא']").attr('name');
                if (load2) {
                    var dataVal = data4[0].body.childNodes[2].data;
                    var v4 = dataVal.split('|')[13];
                    var v5 = dataVal.split('|')[16];
                    var v6 = dataVal.split('|')[20];
                    var v8 = dataVal.split('|')[28];
                    var v7 = dataVal.split('|')[25];
                    var v3 = dataVal.split('|')[9];
                } else {
                    var v4 = $(mizrahiTefahot.dataPage).find('#__LASTFOCUS').val();
                    var v5 = $(mizrahiTefahot.dataPage).find('#__VIEWSTATE').val();
                    var v6 = $(mizrahiTefahot.dataPage).find('#__VIEWSTATEGENERATOR').val();
                    var v8 = $(mizrahiTefahot.dataPage).find('#__EVENTVALIDATION').val();
                    var v7 = $(mizrahiTefahot.dataPage).find('#__VIEWSTATEENCRYPTED').val();
                    var v3 = $(mizrahiTefahot.dataPage).find('#__EVENTARGUMENT').val();
                }
                var v = $(mizrahiTefahot.dataPage).find('#ctl00_radScriptManager_TSM').val();
                var v1 = $(mizrahiTefahot.dataPage).find('#ctl00_RadStyleSheetManager_TSSM').val();
                var v2 = $(mizrahiTefahot.dataPage).find('#__EVENTTARGET').val();
                var v9 = $(mizrahiTefahot.dataPage).find('#ddlRules').val();
                var v10 = $(mizrahiTefahot.dataPage).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID').val();
                var v11 = $(mizrahiTefahot.dataPage).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID_dateInput').val();
                var v12 = $(mizrahiTefahot.dataPage).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID_dateInput_ClientState').val();
                var v13 = $(mizrahiTefahot.dataPage).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID_calendar_SD').val();
                var v14 = $(mizrahiTefahot.dataPage).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID_calendar_AD').val();
                var v15 = $(mizrahiTefahot.dataPage).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID_ClientState').val();
                var v16 = $(mizrahiTefahot.dataPage).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID').val();
                var v17 = $(mizrahiTefahot.dataPage).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID_dateInput').val();
                var v18 = $(mizrahiTefahot.dataPage).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID_dateInput_ClientState').val();
                var v19 = $(mizrahiTefahot.dataPage).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID_calendar_SD').val();
                var v20 = $(mizrahiTefahot.dataPage).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID_calendar_AD').val();
                var v21 = $(mizrahiTefahot.dataPage).find('#ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID_ClientState').val();
                var v22 = $(mizrahiTefahot.dataPage).find('#ctl00_ContentPlaceHolder2_ddlSug').val();
                var v23 = $(mizrahiTefahot.dataPage).find('#ctl00_ContentPlaceHolder2_uc428Grid_grvP428G2_ClientState').val();
                var jsons = {
                    'ctl00$radScriptManager': 'ctl00$ContentPlaceHolder2$ctl00$ContentPlaceHolder2$uc428Grid$grvP428G2Panel|' + clickEv,
                    'ctl00_radScriptManager_TSM': v,
                    'ctl00_RadStyleSheetManager_TSSM': v1,
                    '__EVENTTARGET': clickEv,
                    '__EVENTARGUMENT': "",
                    '__LASTFOCUS': "",
                    '__VIEWSTATE': v5,
                    '__VIEWSTATEGENERATOR': v6,
                    '__VIEWSTATEENCRYPTED': "",
                    '__EVENTVALIDATION': v8,
//					'ctl00$ContentPlaceHolder2$ddlRules': v9,
                    'ctl00$ContentPlaceHolder2$SkyDRP$SkyDatePicker1ID$radDatePickerID': all.banks.accounts.mizrahiTefahot.datemakaf,
                    'ctl00$ContentPlaceHolder2$SkyDRP$SkyDatePicker1ID$radDatePickerID$dateInput': all.banks.accounts.mizrahiTefahot.datebackslesh,
                    'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID_dateInput_ClientState': '{"enabled":true,"emptyMessage":"","validationText":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMin + '","valueAsString":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMin + '","minDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMin + '","maxDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMinTo + '","lastSetTextBoxValue":"' + all.banks.accounts.mizrahiTefahot.datebackslesh + '"}',
                    'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID_calendar_SD': '[[' + all.banks.accounts.mizrahiTefahot.datePsik + ']]',
                    'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID_calendar_AD': '[[' + all.banks.accounts.mizrahiTefahot.datePsik + '],[' + all.banks.accounts.mizrahiTefahot.datePsikTo + '],[' + all.banks.accounts.mizrahiTefahot.datePsik + ']]',
                    'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker1ID_radDatePickerID_ClientState': '{"minDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMin + '","maxDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMinTo + '"}',
                    'ctl00$ContentPlaceHolder2$SkyDRP$SkyDatePicker2ID$radDatePickerID': all.banks.accounts.mizrahiTefahot.datemakafTo,
                    'ctl00$ContentPlaceHolder2$SkyDRP$SkyDatePicker2ID$radDatePickerID$dateInput': all.banks.accounts.mizrahiTefahot.datebacksleshTo,
                    'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID_dateInput_ClientState': '{"enabled":true,"emptyMessage":"","validationText":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMinTo + '","valueAsString":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMinTo + '","minDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMin + '","maxDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMinTo + '","lastSetTextBoxValue":"' + all.banks.accounts.mizrahiTefahot.datebacksleshTo + '"}',
                    'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID_calendar_SD': '[]',
                    'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID_calendar_AD': '[[' + all.banks.accounts.mizrahiTefahot.datePsik + '],[' + all.banks.accounts.mizrahiTefahot.datePsikTo + '],[' + all.banks.accounts.mizrahiTefahot.datePsikTo + ']]',
                    'ctl00_ContentPlaceHolder2_SkyDRP_SkyDatePicker2ID_radDatePickerID_ClientState': '{"minDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMin + '","maxDateStr":"' + all.banks.accounts.mizrahiTefahot.datemakafWithMinTo + '"}',
                    'ctl00$ContentPlaceHolder2$ddlSug': v22,
                    'ctl00_ContentPlaceHolder2_uc428Grid_grvP428G2_ClientState': v23,
                    '__ASYNCPOST': true,
                    'RadAJAXControlID': 'ctl00_ContentPlaceHolder2_PageAjaxManager',
                    'RadAJAXControlID': 'ctl00_ContentPlaceHolder2_uc428Grid_PageAjaxPanel'
                };
                if (mizrahiTefahot.urlOshNew == undefined) {
                    var url = "https://mto.mizrahi-tefahot.co.il/Online/Osh/P428.aspx";
                } else {
                    var url = mizrahiTefahot.urlOshNew;
                }
                all.banks.core.services.httpReq(url, 'POST', jsons, true, false, undefined, {
                    'X-MicrosoftAjax': 'Delta=true',
                    'X-Requested-With': 'XMLHttpRequest'
                })
                    .then(function (data5) {
                        try {
                            var arrSliceB = [];
                            var dataRes = '<!DOCTYPE html><html lang="en"> <head> <meta charset="UTF-8"><title></title></head><body>' + data5 + '</body></html>';
                            var data5 = all.banks.core.services.parseHtml(data5);
                            mizrahiTefahot.dataPage = data4;

                            var rgMasterTable = $(data5).find('.rgMasterTable').children('tbody').find("tr").not(".nestedTitle");
                            if (rgMasterTable.length > 0) {
                                $(rgMasterTable).each(function (i, v) {
                                    var transactionType = null;
                                    if (v.cells[4].childNodes.length > 0) {
                                        if (v.cells[4].childNodes[0].data.indexOf("-") == -1) {
                                            transactionType = "1";
                                        } else {
                                            transactionType = "0";
                                        }
                                    }
                                    var isDay = "0";
                                    if ($(v).children("td").eq(2).text() == "05") {
                                        isDay = "1";
                                    }
                                    var balance = null;
                                    if (v.cells[5].childNodes.length > 0) {
                                        balance = v.cells[5].childNodes[0].data.replace(/ /g, '').replace(/,/g, '')
                                    }
                                    var asmachta = null;
                                    if (v.cells[6].childNodes.length > 0) {
                                        asmachta = v.cells[6].childNodes[0].data;
                                    }
                                    var transDesc = null,
                                        imgs = null,
                                        valDate = v.cells[0].childNodes && (v.cells[0].childNodes.length > 0)
                                            ? all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(v.cells[0].childNodes[0].data))
                                            : arrSliceB.length > 0 ? arrSliceB[arrSliceB.length - 1].ValueDate : null;
                                    var objectRow;
                                    if (v.cells[3].childNodes.length > 0) {
                                        if (v.cells[3].childNodes[0].data !== undefined) {
                                            if (v.cells[4].childNodes.length) {
                                                transDesc = v.cells[3].childNodes[0].data;
                                                objectRow = {
                                                    "Asmachta": asmachta,
                                                    "TransDesc": all.banks.core.services.getStringJson(transDesc),
                                                    "ValueDate": valDate,
                                                    "TransactionType": transactionType,
                                                    "TransTotal": v.cells[4].childNodes[0].data.replace(/ /g, '').replace(/,/g, '').replace('-', ''),
                                                    "Balance": balance,
                                                    "IsDaily": isDay,
                                                    "imgs": imgs
                                                };
                                                if ($(v).find('td.expandItem > a').length) {
                                                    objectRow.DepositeTransferData = $(v).find('td.expandItem > a').attr('href').split('(')[1].split(')')[0].split(",")[0].replace(/'/g, '');
                                                }
                                                arrSliceB.push(objectRow);
                                            }
                                        } else {
                                            transDesc = v.cells[3].childNodes[0].childNodes[0].data;
                                            if (v.cells[3].childNodes.length == 2) {
                                                if (all.banks.accountDetails.checks == true) {
                                                    var imgProp = $(v).children("td").eq(3).children("a");
                                                    if (imgProp.data("controller") !== undefined)
                                                        imgs = [imgProp.data("chequeindex"), imgProp.data("controller").replace(/'/g, ''), asmachta];
                                                }
                                                objectRow = {
                                                    "Asmachta": asmachta,
                                                    "TransDesc": all.banks.core.services.getStringJson(transDesc),
                                                    "ValueDate": valDate,
                                                    "TransactionType": transactionType,
                                                    "TransTotal": v.cells[4].childNodes[0].data.replace(/ /g, '').replace(/,/g, '').replace('-', ''),
                                                    "Balance": balance,
                                                    "IsDaily": isDay,
                                                    "imgs": imgs
                                                }
                                                if ($(v).find('td.expandItem > a').length) {
                                                    objectRow.DepositeTransferData = $(v).find('td.expandItem > a').attr('href').split('(')[1].split(')')[0].split(",")[0].replace(/'/g, '');
                                                }
                                                arrSliceB.push(objectRow)
                                            } else {
                                                objectRow = {
                                                    "Asmachta": asmachta,
                                                    "TransDesc": all.banks.core.services.getStringJson(transDesc),
                                                    "ValueDate": valDate,
                                                    "TransactionType": transactionType,
                                                    "TransTotal": v.cells[4].childNodes[0].data.replace(/ /g, '').replace(/,/g, '').replace('-', ''),
                                                    "Balance": balance,
                                                    "IsDaily": isDay,
                                                    "imgs": imgs
                                                }
                                                if ($(v).find('td.expandItem > a').length) {
                                                    objectRow.DepositeTransferData = $(v).find('td.expandItem > a').attr('href').split('(')[1].split(')')[0].split(",")[0].replace(/'/g, '');
                                                }
                                                arrSliceB.push(objectRow)
                                            }
                                        }
                                    } else {
                                        objectRow = {
                                            "Asmachta": asmachta,
                                            "TransDesc": all.banks.core.services.getStringJson(transDesc),
                                            "ValueDate": valDate,
                                            "TransactionType": transactionType,
                                            "TransTotal": v.cells[4].childNodes[0].data.replace(/ /g, '').replace(/,/g, '').replace('-', ''),
                                            "Balance": balance,
                                            "IsDaily": isDay,
                                            "imgs": imgs
                                        }
                                        if ($(v).find('td.expandItem > a').length) {
                                            objectRow.DepositeTransferData = $(v).find('td.expandItem > a').attr('href').split('(')[1].split(')')[0].split(",")[0].replace(/'/g, '');
                                        }
                                        arrSliceB.push(objectRow)
                                    }
                                    if (rgMasterTable.length == i + 1) {
                                        getAllChecksB()
                                    }
                                });
                            } else {
                                if (mizrahiTefahot.numberOfOptions > 1) {
                                    if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
                                        all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].DataRow = mizrahiTefahot.arr;
                                        mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
                                        mizrahiTefahot.changBankAcc(mizrahiTefahot.ind)
                                    } else {
                                        all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].DataRow = mizrahiTefahot.arr;
                                        all.banks.accounts.mizrahiTefahot.sendOshCtrl();
                                    }
                                } else {
                                    all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].DataRow = mizrahiTefahot.arr;
                                    all.banks.accounts.mizrahiTefahot.sendOshCtrl();
                                }
                                ///getAllChecksB()
                            }

                            function getAllChecksB() {
                                clearTimeout(mizrahiTefahot.timeOutFunc);
                                try {
                                    var ret = false;
                                    if (arrSliceB.length) {
                                        $(arrSliceB).each(function (i, v) {
                                            if (v.imgs !== null && Object.prototype.toString.call(v.imgs) === '[object Array]' && v.imgs[0].Asmachta == undefined && v.imgs[0].ImageNameKey == undefined) {
                                                $.when(mizrahiTefahot.getBase64FromImageUrl(v.imgs[0], v.imgs[1], v.imgs[2])).then(function (status) {
                                                    v.imgs = status;
                                                    mizrahiTefahot.timeOutFunc = setTimeout(function () {
                                                        clearTimeout(mizrahiTefahot.timeOutFunc);
                                                        getAllChecksB();
                                                    }, 500)
                                                })
                                                ret = true;
                                                return false;
                                            } else if (v.DepositeTransferData !== undefined && v.DepositeTransferData !== null && Object.prototype.toString.call(v.DepositeTransferData) !== '[object Array]') {
                                                $.when(mizrahiTefahot.loadHaavara(data5, v.DepositeTransferData, v.TransTotal, v.ValueDate, v.TransactionType))
                                                    .then(function (status) {
                                                        v.DepositeTransferData = status;
                                                        mizrahiTefahot.timeOutFunc = setTimeout(function () {
                                                            clearTimeout(mizrahiTefahot.timeOutFunc);
                                                            getAllChecksB();
                                                        }, 500)
                                                    })
                                                ret = true;
                                                return false;
                                            } else {
                                                if (arrSliceB.length == (i + 1)) {
                                                    Array.prototype.push.apply(mizrahiTefahot.arr, arrSliceB);
                                                    var nextPageb = data5.find(".rgWrap.rgArrPart1 [title='עמוד הבא']").attr('onclick');
                                                    if (nextPageb !== undefined && nextPageb.indexOf("WebForm_DoPostBackWithOptions") == -1) {
                                                        mizrahiTefahot.loadNextAll(data5, true);
                                                    } else {
                                                        myEmitterLogs(12, mizrahiTefahot.arr.length); //length arr
                                                        myEmitterLogs(29);
                                                        all.banks.generalVariables.numChecksDrawn = 0;
                                                        all.banks.generalVariables.numChecksNotWithdrawn = 0;
                                                        if (mizrahiTefahot.numberOfOptions > 1) {
                                                            if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
                                                                all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].DataRow = mizrahiTefahot.arr;
                                                                mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
                                                                mizrahiTefahot.changBankAcc(mizrahiTefahot.ind)
                                                            } else {
                                                                all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].DataRow = mizrahiTefahot.arr;
                                                                all.banks.accounts.mizrahiTefahot.sendOshCtrl();
                                                            }
                                                        } else {
                                                            all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].DataRow = mizrahiTefahot.arr;
                                                            all.banks.accounts.mizrahiTefahot.sendOshCtrl();
                                                        }
                                                    }
                                                }
                                            }
                                        })
                                    } else {
                                        Array.prototype.push.apply(mizrahiTefahot.arr, arrSliceB);
                                        var nextPageb = data5.find(".rgWrap.rgArrPart1 [title='עמוד הבא']").attr('onclick');
                                        if (nextPageb !== undefined && nextPageb.indexOf("WebForm_DoPostBackWithOptions") == -1) {
                                            mizrahiTefahot.loadNextAll(data5, true);
                                        } else {
                                            myEmitterLogs(12, mizrahiTefahot.arr.length); //length arr
                                            myEmitterLogs(29);
                                            all.banks.generalVariables.numChecksDrawn = 0;
                                            all.banks.generalVariables.numChecksNotWithdrawn = 0;
                                            if (mizrahiTefahot.numberOfOptions > 1) {
                                                if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
                                                    all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].DataRow = mizrahiTefahot.arr;
                                                    mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
                                                    mizrahiTefahot.changBankAcc(mizrahiTefahot.ind)
                                                } else {
                                                    all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].DataRow = mizrahiTefahot.arr;
                                                    all.banks.accounts.mizrahiTefahot.sendOshCtrl();
                                                }
                                            } else {
                                                all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].DataRow = mizrahiTefahot.arr;
                                                all.banks.accounts.mizrahiTefahot.sendOshCtrl();
                                            }
                                        }
                                    }
                                } catch (err) {
                                    all.banks.core.services.errorLog(err)
                                }
                            }
                        } catch (err) {
                            all.banks.core.services.errorLog(err)
                        }
                    })
                    .fail(function (error, resErr, urlParam) {
                        var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                        all.banks.core.services.errorLog(logErr)
                    });
            } else {
                myEmitterLogs(12, mizrahiTefahot.arr.length); //length arr
                myEmitterLogs(29);
                all.banks.generalVariables.numChecksDrawn = 0;
                all.banks.generalVariables.numChecksNotWithdrawn = 0;
                if (mizrahiTefahot.numberOfOptions > 1) {
                    all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].DataRow = mizrahiTefahot.arr;
                    if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
                        mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
                        mizrahiTefahot.changBankAcc(mizrahiTefahot.ind)
                    } else {
                        all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].DataRow = mizrahiTefahot.arr;
                        all.banks.accounts.mizrahiTefahot.sendOshCtrl();
                    }
                } else {
                    all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].DataRow = mizrahiTefahot.arr;
                    all.banks.accounts.mizrahiTefahot.sendOshCtrl();
                }
            }
        } catch (err) {
            all.banks.core.services.errorLog(err);
        }
    };
    mizrahiTefahot.loadAsharaiMisgeret = function () {
        var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/cc/main.aspx";
        all.banks.core.services.httpReq(url, 'GET', null, false, false)
            .then(function (data) {
                all.banks.core.services.httpReq("https://mto.mizrahi-tefahot.co.il/Online/GenericHandlers/ServicesReadOnlyFromSessionHandler.ashx?ServicesType=InnerServices&Action=GetJustForYouContent&Parameters=%7B%22PageName%22%3A%22ASP.cc_main_aspx%22%7D&_=" + new Date().getTime(),
                    'GET', null, false, false);

                var data = all.banks.core.services.parseHtml(data);
                mizrahiTefahot.ccCards = [];
                if ($(data).find('#ctl00_ContentPlaceHolder2_WebPartMain1_ctl00_grvCC_ctl00 tbody tr').length) {
                    $(data).find('#ctl00_ContentPlaceHolder2_WebPartMain1_ctl00_grvCC_ctl00 tbody tr').each(function (i, v) {
                        var dates = $(v).find('td').eq(3).text().split('/')[0];
                        var cc = {
                            cardNumber: $(v).find('td').eq(1).text().replace(/\D/g, ""),
                            debitDate: (dates !== "") ? dates : undefined
                        }
                        mizrahiTefahot.ccCards.push(cc);
                    });
                    mizrahiTefahot.loadPresentAndPrevCard("present");
                } else {
                    mizrahiTefahot.loadPresentAndPrevCard("present");
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    };
    mizrahiTefahot.debitDate = function (num) {
        var indNum;
        $(mizrahiTefahot.ccCards).each(function (i, v) {
            if (v.cardNumber == num) {
                indNum = v.debitDate;
            }
        })
        return indNum;
    };
    mizrahiTefahot.loadPresentAndPrevCard = function (type) {
        var arrNextPages = [];
        if (type == "present") {
            var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/cc/p436.aspx";
        } else {
            var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/cc/p054.aspx";
            all.banks.core.services.httpReq("https://mto.mizrahi-tefahot.co.il/Online/api/newGE/keepAlive",
                'POST', null, false, false);
        }
        all.banks.core.services.httpReq(url, 'GET', null, false, false)
            .then(function (response, res1, res2) {
                var res = all.banks.core.services.parseHtml(response);
                if (res.find('#errorMessageBox').length) {
                    if (mizrahiTefahot.numberOfOptions > 1) {
                        if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
                            mizrahiTefahot.counterCard = 0;
                            mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
                            mizrahiTefahot.changBankAccAshrai(mizrahiTefahot.ind)
                        } else {
                            all.banks.accounts.mizrahiTefahot.sendCardsCtrl()
                        }
                    } else {
                        all.banks.accounts.mizrahiTefahot.sendCardsCtrl()
                    }
                    return;
                }

                var rgMasterTable = res.find('.rgMasterTable');
                var rgMasterTableLen = rgMasterTable.length;
                if (rgMasterTableLen) {
                    if (rgMasterTableLen > 1) {
                        rgMasterTable.each(function (i, v) {
                            var id = $(v).attr("id").split("Repeater1_")[1].split("_")[0].split("ctl")[1];
                            var clickEv = $(res).find("#ctl00_ContentPlaceHolder2_Repeater1_ctl" + id + "_grvKART_ctl00 .rgWrap.rgArrPart1 [title='עמוד הבא']");
                            if (type == "present") {
                                var lengthWords = $(res).find("#ctl00_ContentPlaceHolder2_Repeater1_ctl" + id + "_lblNameCard").text().split(" ");
                                var namberCard = lengthWords[lengthWords.length - 1].replace(/\D/g, "");
                                var indNumber = mizrahiTefahot.debitDate(namberCard);
                                var NextBillingDate = res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + id + '_lblDate').text().replace(/\s/g, "").split('/');
                                var dataMonthlyCycle = {
                                    'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                    'AccountNumber': all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].AccountNumber,
                                    'BranchNumber': all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BranchNumber,
                                    'NextTotal': res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + id + '_lblSach').text().replace(/\s/g, "").replace(/,/g, '').replace(/₪/g, ''),
                                    'CardNumber': namberCard,
                                    'currencyId': all.banks.core.services.getTypeCurrencyAll(res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + id + '_lblShach').text()),
                                    'CardType': all.banks.core.services.getTypeCard(res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + id + '_lblNameCard').text())
                                };
                                if (indNumber !== undefined) {
                                    dataMonthlyCycle.indFake = 0;
                                    dataMonthlyCycle.NextBillingDate = indNumber + '/' + NextBillingDate[1] + '/' + NextBillingDate[2];
                                } else {
                                    dataMonthlyCycle.indFake = 1;
                                    dataMonthlyCycle.NextBillingDate = '01' + '/' + NextBillingDate[1] + '/ ' + NextBillingDate[2];
                                }
                            } else {
                                var indNumber = mizrahiTefahot.debitDate(res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + id + '_UCPieManyCards_lblCard').text().replace(/\D/g, ""));
                                var dataMonthlyCycle = {
                                    'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                    'AccountNumber': all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].AccountNumber,
                                    'BranchNumber': all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BranchNumber,
                                    'NextTotal': res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + id + '_UCPieManyCards_lblSach').text().replace(/\s/g, "").replace(/,/g, ''),
                                    'CardNumber': res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + id + '_UCPieManyCards_lblCard').text().replace(/\D/g, ""),
                                    'currencyId': all.banks.core.services.getTypeCurrencyAll(res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + id + '_UCPieManyCards_lblShach').text()),
                                    'CardType': all.banks.core.services.getTypeCard(res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + id + '_lblNameCard').text())
                                };
                                // if (indNumber !== undefined) {
                                // 	dataMonthlyCycle.indFake = 0;
                                // 	dataMonthlyCycle.NextBillingDate = res.find('#ctl00_ContentPlaceHolder2_ddlDate').val().replace(/\D/g, "").substr(2, 4) + '' + res.find('#ctl00_ContentPlaceHolder2_ddlDate').val().replace(/\D/g, "").substr(0, 2) + indNumber;
                                // }
                                // else {
                                dataMonthlyCycle.indFake = 1;
                                dataMonthlyCycle.NextBillingDate = '01' + '/' + res.find('#ctl00_ContentPlaceHolder2_ddlDate').val().replace(/\D/g, "").substr(0, 2) + '/' + res.find('#ctl00_ContentPlaceHolder2_ddlDate').val().replace(/\D/g, "").substr(2, 4);
                                //}

                            }

                            if (clickEv.length) {
                                if (type == "present") {
                                    if (id == "00") {
                                        arrNextPages.push({
                                            id: clickEv.attr("name"),
                                            selectIdCard: $(res).find("#ddlMisKartis option:selected").val(),
                                            RadAJAXControlID: "ctl00_ContentPlaceHolder2_Repeater1_ctl" + id + "_grvCCPanel1",
                                            cardDetails: dataMonthlyCycle,
                                            '__VIEWSTATE': $(res).find('input[name="__VIEWSTATE"]').val(),
                                            '__VIEWSTATEGENERATOR': $(res).find('input[name="__VIEWSTATEGENERATOR"]').val(),
                                            '__EVENTVALIDATION': $(res).find('input[name="__EVENTVALIDATION"]').val(),
                                            'radScriptManager': 'ctl00$ContentPlaceHolder2$ctl00$ContentPlaceHolder2$Repeater1$ctl00$grvKARTPanel'
                                        });
                                    } else {
                                        arrNextPages.push({
                                            id: clickEv.attr("name"),
                                            selectIdCard: $(res).find("#ddlMisKartis option:selected").val(),
                                            RadAJAXControlID: "ctl00_ContentPlaceHolder2_Repeater1_ctl" + id + "_grvCCPanel1",
                                            cardDetails: dataMonthlyCycle,
                                            '__VIEWSTATE': $(res).find('input[name="__VIEWSTATE"]').val(),
                                            '__VIEWSTATEGENERATOR': $(res).find('input[name="__VIEWSTATEGENERATOR"]').val(),
                                            '__EVENTVALIDATION': $(res).find('input[name="__EVENTVALIDATION"]').val(),
                                            'radScriptManager': 'ctl00$ContentPlaceHolder2$Repeater1$ctl' + id + '$ctl00$ContentPlaceHolder2$Repeater1$ctl' + id + '$grvCCPanel1Panel'
                                        });
                                    }
                                } else {
                                    if (id == "00") {
                                        arrNextPages.push({
                                            id: clickEv.attr("name"),
                                            selectIdCard: $(res).find("#ddlMisKartis option:selected").val(),
                                            RadAJAXControlID: "ctl00_ContentPlaceHolder2_Repeater1_ctl" + id + "_pnlgrvKART",
                                            date: $(res).find("#ctl00_ContentPlaceHolder2_ddlDate option:selected").val(),
                                            cardDetails: dataMonthlyCycle,
                                            '__VIEWSTATE': $(res).find('input[name="__VIEWSTATE"]').val(),
                                            '__VIEWSTATEGENERATOR': $(res).find('input[name="__VIEWSTATEGENERATOR"]').val(),
                                            '__EVENTVALIDATION': $(res).find('input[name="__EVENTVALIDATION"]').val(),
                                            'radScriptManager': 'ctl00$ContentPlaceHolder2$ctl00$ContentPlaceHolder2$Repeater1$ctl00$grvKARTPanel'
                                        });
                                    } else {
                                        arrNextPages.push({
                                            id: clickEv.attr("name"),
                                            selectIdCard: $(res).find("#ddlMisKartis option:selected").val(),
                                            RadAJAXControlID: "ctl00_ContentPlaceHolder2_Repeater1_ctl" + id + "_pnlgrvKART",
                                            date: $(res).find("#ctl00_ContentPlaceHolder2_ddlDate option:selected").val(),
                                            cardDetails: dataMonthlyCycle,
                                            '__VIEWSTATE': $(res).find('input[name="__VIEWSTATE"]').val(),
                                            '__VIEWSTATEGENERATOR': $(res).find('input[name="__VIEWSTATEGENERATOR"]').val(),
                                            '__EVENTVALIDATION': $(res).find('input[name="__EVENTVALIDATION"]').val(),
                                            'radScriptManager': 'ctl00$ContentPlaceHolder2$Repeater1$ctl' + id + '$ctl00$ContentPlaceHolder2$Repeater1$ctl' + id + '$pnlgrvKARTPanel'
                                        });
                                    }
                                }
                            }
                            if (res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + id + '_grvKART_ctl00 > tbody > tr').length) {
                                const nextBillingDateColumnIndex = mizrahiTefahot.replaceCycleDateIfPresent(
                                    res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + id + '_grvKART_ctl00'),
                                    dataMonthlyCycle);
                                if (dataMonthlyCycle.NextTotal === '') {
                                    dataMonthlyCycle.NextTotal = '0';
                                }
                                mizrahiTefahot.processData(res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + id + '_grvKART_ctl00 > tbody > tr'),
                                    dataMonthlyCycle,
                                    nextBillingDateColumnIndex);
                            }
                            if (i + 1 == res.find('.rgMasterTable').length) {
                                if (type == "present") {
                                    mizrahiTefahot.stepNextCards(arrNextPages, res, "present");
                                } else {
                                    mizrahiTefahot.stepNextCards(arrNextPages, res, null);
                                }
                            }
                        })
                    } else {
                        var clickEv = $(res).find(".rgWrap.rgArrPart1 [title='עמוד הבא']");
                        var idElem = rgMasterTable.attr("id").split("_grvKART")[0].split("Repeater1_ctl")[1];
                        if (type == "present") {
                            var lengthWords = $(res).find("#ctl00_ContentPlaceHolder2_Repeater1_ctl" + idElem + "_lblNameCard").text().split(" ");
                            var namberCard = lengthWords[lengthWords.length - 1].replace(/\D/g, "");
                            var indNumbers = mizrahiTefahot.debitDate(namberCard);
                            var NextBillingDate = res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + idElem + '_lblDate').text().replace(/\s/g, "").split('/');
                            var dataMonthlyCycle = {
                                'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                'AccountNumber': all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].AccountNumber,
                                'BranchNumber': all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BranchNumber,
                                'NextTotal': res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + idElem + '_lblSach').text().replace(/\s/g, "").replace(/,/g, '').replace(/₪/g, ''),
                                'CardNumber': namberCard,
                                'currencyId': all.banks.core.services.getTypeCurrencyAll(res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + idElem + '_lblShach').text()),
                                'CardType': all.banks.core.services.getTypeCard(res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + idElem + '_lblNameCard').text())
                            };
                            if (indNumbers !== undefined) {
                                dataMonthlyCycle.indFake = 0;
                                dataMonthlyCycle.NextBillingDate = indNumbers + '/' + NextBillingDate[1] + '/' + NextBillingDate[2];
                            } else {
                                dataMonthlyCycle.indFake = 1;
                                dataMonthlyCycle.NextBillingDate = '01' + '/' + NextBillingDate[1] + '/' + NextBillingDate[2];
                            }
                        } else {
                            var indNumbers = mizrahiTefahot.debitDate(res.find('#ctl00_ContentPlaceHolder2_UCPie1_lblCard').text().replace(/\D/g, ""));
                            var dataMonthlyCycle = {
                                'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                'AccountNumber': all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].AccountNumber,
                                'BranchNumber': all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BranchNumber,
                                'NextTotal': res.find('#ctl00_ContentPlaceHolder2_UCPie1_lblSach').text().replace(/\s/g, "").replace(/,/g, '').replace(/₪/g, ''),
                                'CardNumber': res.find('#ctl00_ContentPlaceHolder2_UCPie1_lblCard').text().replace(/\D/g, ""),
                                'currencyId': all.banks.core.services.getTypeCurrencyAll(res.find('#ctl00_ContentPlaceHolder2_UCPie1_lblShach').text()),
                                'CardType': all.banks.core.services.getTypeCard(res.find('#ctl00_ContentPlaceHolder2_lblNameCard').text())
                            };
                            // if (indNumbers !== undefined) {
                            // 	dataMonthlyCycle.indFake = 0;
                            // 	dataMonthlyCycle.NextBillingDate = res.find('#ctl00_ContentPlaceHolder2_ddlDate').val().replace(/\D/g, "").substr(2, 4) + '' + res.find('#ctl00_ContentPlaceHolder2_ddlDate').val().replace(/\D/g, "").substr(0, 2) + '' + indNumbers;
                            // }
                            // else {
                            dataMonthlyCycle.indFake = 1;
                            dataMonthlyCycle.NextBillingDate = '01' + '/' + res.find('#ctl00_ContentPlaceHolder2_ddlDate').val().replace(/\D/g, "").substr(0, 2) + '/' + res.find('#ctl00_ContentPlaceHolder2_ddlDate').val().replace(/\D/g, "").substr(2, 4);
                            //}
                        }
                        if (clickEv.length) {
                            if (type == "present") {
                                arrNextPages.push({
                                    id: clickEv.attr("name"),
                                    selectIdCard: $(res).find("#ddlMisKartis option:selected").val(),
                                    RadAJAXControlID: "ctl00_ContentPlaceHolder2_Repeater1_ctl" + idElem + "_pnlgrvKART",
                                    cardDetails: dataMonthlyCycle,
                                    '__VIEWSTATE': $(res).find('input[name="__VIEWSTATE"]').val(),
                                    '__VIEWSTATEGENERATOR': $(res).find('input[name="__VIEWSTATEGENERATOR"]').val(),
                                    '__EVENTVALIDATION': $(res).find('input[name="__EVENTVALIDATION"]').val(),
                                    'radScriptManager': 'ctl00$ContentPlaceHolder2$ctl00$ContentPlaceHolder2$Repeater1$ctl' + idElem + '$grvKARTPanel'
                                });
                            } else {
                                arrNextPages.push({
                                    id: clickEv.attr("name"),
                                    selectIdCard: $(res).find("#ddlMisKartis option:selected").val(),
                                    RadAJAXControlID: "ctl00_ContentPlaceHolder2_Repeater1_ctl" + idElem + "_pnlgrvKART",
                                    date: $(res).find("#ctl00_ContentPlaceHolder2_ddlDate option:selected").val(),
                                    cardDetails: dataMonthlyCycle,
                                    '__VIEWSTATE': $(res).find('input[name="__VIEWSTATE"]').val(),
                                    '__VIEWSTATEGENERATOR': $(res).find('input[name="__VIEWSTATEGENERATOR"]').val(),
                                    '__EVENTVALIDATION': $(res).find('input[name="__EVENTVALIDATION"]').val(),
                                    'radScriptManager': 'ctl00$ContentPlaceHolder2$ctl00$ContentPlaceHolder2$Repeater1$ctl' + idElem + '$grvKARTPanel'
                                });
                            }
                        }
                        myEmitterLogs(33, dataMonthlyCycle.AccountNumber);
                        myEmitterLogs(15, dataMonthlyCycle.CardNumber + ' period ' + dataMonthlyCycle.NextBillingDate);
                        if (type == "present") {
                            if (res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + idElem + '_grvKART_ctl00 > tbody > tr').length) {
                                const nextBillingDateColumnIndex = mizrahiTefahot.replaceCycleDateIfPresent(
                                    res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + idElem + '_grvKART_ctl00'),
                                    dataMonthlyCycle);
                                if (dataMonthlyCycle.NextTotal === '') {
                                    dataMonthlyCycle.NextTotal = '0';
                                }
                                mizrahiTefahot.processData(res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + idElem + '_grvKART_ctl00 > tbody > tr'),
                                    dataMonthlyCycle,
                                    nextBillingDateColumnIndex);
                            }
                        } else {
                            if (res.find('#ctl00_ContentPlaceHolder2_grvCC_ctl00 > tbody > tr').length) {
                                const nextBillingDateColumnIndex = mizrahiTefahot.replaceCycleDateIfPresent(
                                    res.find('#ctl00_ContentPlaceHolder2_grvCC_ctl00'),
                                    dataMonthlyCycle);
                                if (dataMonthlyCycle.NextTotal === '') {
                                    dataMonthlyCycle.NextTotal = '0';
                                }
                                mizrahiTefahot.processData(res.find('#ctl00_ContentPlaceHolder2_grvCC_ctl00 > tbody > tr'),
                                    dataMonthlyCycle,
                                    nextBillingDateColumnIndex);
                            }
                        }

                        if (type == "present") {
                            mizrahiTefahot.stepNextCards(arrNextPages, res, "present");
                        } else {
                            mizrahiTefahot.stepNextCards(arrNextPages, res, null);
                        }
                    }
                } else {
                    if (type == "present") {
                        mizrahiTefahot.stepNextCards(arrNextPages, res, "present");
                    } else {
                        mizrahiTefahot.stepNextCards(arrNextPages, res, null);
                    }
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    };
    mizrahiTefahot.loadPrevPrevCard = function (dataRes) {
        var dateSplited = dataRes.find('#ctl00_ContentPlaceHolder2_ddlDate').length;
        if (mizrahiTefahot.isErrorOrNotAvailableMessage(dataRes.find('.error_msg').text()) && !dateSplited) {
            mizrahiTefahot.stepNextCards([], dataRes, null);
        } else {
            var dateMonth = new Date(parseInt($(dataRes).find('#ctl00_ContentPlaceHolder2_ddlDate option:selected').val().replace(/\D/g, "").substr(2, 4)), parseInt($(dataRes).find('#ctl00_ContentPlaceHolder2_ddlDate option:selected').val().replace(/\D/g, "").substr(0, 2)) - 2, 1);
            var ctl00ContentPlaceHolder2ddlDate = ("0" + (dateMonth.getMonth() + 1)).slice(-2) + '' + dateMonth.getFullYear().toString();
            var arrNextPages = [];
            var post = {
                'ctl00_radScriptManager_TSM': '',
                'ctl00_RadStyleSheetManager_TSSM': '',
                '__EVENTTARGET': $(dataRes).find('input[name="__EVENTTARGET"]').val(),
                '__EVENTARGUMENT': $(dataRes).find('input[name="__EVENTARGUMENT"]').val(),
                '__VIEWSTATE': $(dataRes).find('input[name="__VIEWSTATE"]').val(),
                '__VIEWSTATEGENERATOR': $(dataRes).find('input[name="__VIEWSTATEGENERATOR"]').val(),
                '__VIEWSTATEENCRYPTED': $(dataRes).find('input[name="__VIEWSTATEENCRYPTED"]').val(),
                '__EVENTVALIDATION': $(dataRes).find('input[name="__EVENTVALIDATION"]').val(),
                'ctl00$ContentPlaceHolder2$ddlDate': ctl00ContentPlaceHolder2ddlDate,
                'ctl00$ContentPlaceHolder2$btnShow': $(dataRes).find('input[name="ctl00$ContentPlaceHolder2$btnShow"]').val(),
                'ctl00_ContentPlaceHolder2_Repeater1_ctl00_RTGraph_ClientState': $(dataRes).find('input[name="ctl00_ContentPlaceHolder2_Repeater1_ctl00_RTGraph_ClientState"]').val(),
                'ctl00_ContentPlaceHolder2_Repeater1_ctl00_grvKART_ClientState': $(dataRes).find('input[name="ctl00_ContentPlaceHolder2_Repeater1_ctl00_grvKART_ClientState"]').val(),
                'ctl00$ContentPlaceHolder2$Repeater1$ctl00$UCPieManyCards$hdnChartType': $(dataRes).find('input[name="ctl00$ContentPlaceHolder2$Repeater1$ctl00$UCPieManyCards$hdnChartType"]').val(),
                'ctl00$ContentPlaceHolder2$Repeater1$ctl00$UCPieManyCards$hdnAnafSum': $(dataRes).find('input[name="ctl00$ContentPlaceHolder2$Repeater1$ctl00$UCPieManyCards$hdnAnafSum"]').val(),
                'ctl00$ContentPlaceHolder2$Repeater1$ctl00$UCPieManyCards$hdnAnafName': $(dataRes).find('input[name="ctl00$ContentPlaceHolder2$Repeater1$ctl00$UCPieManyCards$hdnAnafName"]').val(),
                'ctl00$ContentPlaceHolder2$Repeater1$ctl00$UCPieColumnGraphManyCards$hdnChartType': $(dataRes).find('input[name="ctl00$ContentPlaceHolder2$Repeater1$ctl00$UCPieColumnGraphManyCards$hdnChartType"]').val(),
                'ctl00$ContentPlaceHolder2$Repeater1$ctl00$UCPieColumnGraphManyCards$hdnAnafSum': $(dataRes).find('input[name="ctl00$ContentPlaceHolder2$Repeater1$ctl00$UCPieColumnGraphManyCards$hdnAnafSum"]').val(),
                'ctl00$ContentPlaceHolder2$Repeater1$ctl00$UCPieColumnGraphManyCards$hdnAnafName': $(dataRes).find('input[name="ctl00$ContentPlaceHolder2$Repeater1$ctl00$UCPieColumnGraphManyCards$hdnAnafName"]').val(),
                'ctl00$ContentPlaceHolder2$Repeater1$ctl00$UCYearChartManyCards$hdnChartData': $(dataRes).find('input[name="ctl00$ContentPlaceHolder2$Repeater1$ctl00$UCYearChartManyCards$hdnChartData"]').val(),
                'ctl00_ContentPlaceHolder2_Repeater1_ctl00_mp1_ClientState': $(dataRes).find('input[name="ctl00_ContentPlaceHolder2_Repeater1_ctl00_mp1_ClientState"]').val(),
                'ctl00_ContentPlaceHolder2_Repeater1_ctl01_RTGraph_ClientState': $(dataRes).find('input[name="ctl00_ContentPlaceHolder2_Repeater1_ctl01_RTGraph_ClientState"]').val(),
                'ctl00_ContentPlaceHolder2_Repeater1_ctl01_grvKART_ClientState': $(dataRes).find('input[name="ctl00_ContentPlaceHolder2_Repeater1_ctl01_grvKART_ClientState"]').val(),
                'ctl00$ContentPlaceHolder2$Repeater1$ctl01$UCPieManyCards$hdnChartType': $(dataRes).find('input[name="ctl00$ContentPlaceHolder2$Repeater1$ctl01$UCPieManyCards$hdnChartType"]').val(),
                'ctl00$ContentPlaceHolder2$Repeater1$ctl01$UCPieManyCards$hdnAnafSum': $(dataRes).find('input[name="ctl00$ContentPlaceHolder2$Repeater1$ctl01$UCPieManyCards$hdnAnafSum"]').val(),
                'ctl00$ContentPlaceHolder2$Repeater1$ctl01$UCPieManyCards$hdnAnafName': $(dataRes).find('input[name="ctl00$ContentPlaceHolder2$Repeater1$ctl01$UCPieManyCards$hdnAnafName"]').val(),
                'ctl00$ContentPlaceHolder2$Repeater1$ctl01$UCPieColumnGraphManyCards$hdnChartType': $(dataRes).find('input[name="ctl00$ContentPlaceHolder2$Repeater1$ctl01$UCPieColumnGraphManyCards$hdnChartType"]').val(),
                'ctl00$ContentPlaceHolder2$Repeater1$ctl01$UCPieColumnGraphManyCards$hdnAnafSum': $(dataRes).find('input[name="ctl00$ContentPlaceHolder2$Repeater1$ctl01$UCPieColumnGraphManyCards$hdnAnafSum"]').val(),
                'ctl00$ContentPlaceHolder2$Repeater1$ctl01$UCPieColumnGraphManyCards$hdnAnafName': $(dataRes).find('input[name="ctl00$ContentPlaceHolder2$Repeater1$ctl01$UCPieColumnGraphManyCards$hdnAnafName"]').val(),
                'ctl00$ContentPlaceHolder2$Repeater1$ctl01$UCYearChartManyCards$hdnChartData': $(dataRes).find('input[name="ctl00$ContentPlaceHolder2$Repeater1$ctl01$UCYearChartManyCards$hdnChartData"]').val(),
                'ctl00_ContentPlaceHolder2_Repeater1_ctl01_mp1_ClientState': $(dataRes).find('input[name="ctl00_ContentPlaceHolder2_Repeater1_ctl01_mp1_ClientState"]').val()
            }

            const allCardsOption = $(dataRes).find('#ddlMisKartis > option:contains("כל הכרטיסים")').val();
            if (allCardsOption) {
                post['ctl00$ContentPlaceHolder2$UCCards1$ddlMisKartis'] = allCardsOption;
            }

            var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/cc/p054.aspx";
            all.banks.core.services.httpReq(url, 'POST', post, true, false)
                .then(function (response, state, status, responseUrl) {
                    if (responseUrl && responseUrl.includes('Error')) {
                        $(dataRes).find('#ctl00_ContentPlaceHolder2_ddlDate option:selected').next().attr('selected', 'selected');
                        mizrahiTefahot.stepNextCards(arrNextPages, dataRes, null);
                    } else {
                        var res = all.banks.core.services.parseHtml(response);
                        response = null;
                        if (!mizrahiTefahot.isErrorOrNotAvailableMessage(res.find('.error_msg').text())) {
                            if (res.find('.rgMasterTable').length > 1) {
                                res.find('.rgMasterTable').each(function (i, v) {
                                    var id = $(v).attr("id").split("Repeater1_")[1].split("_")[0].split("ctl")[1];
                                    var clickEv = $(res).find("#ctl00_ContentPlaceHolder2_Repeater1_ctl" + id + "_grvKART_ctl00 .rgWrap.rgArrPart1 [title='עמוד הבא']");
                                    var indNumber = mizrahiTefahot.debitDate(res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + id + '_UCPieManyCards_lblCard').text().replace(/\D/g, ""));
                                    var dataMonthlyCycle = {
                                        'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                        'AccountNumber': all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].AccountNumber,
                                        'BranchNumber': all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BranchNumber,
                                        'NextTotal': res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + id + '_UCPieManyCards_lblSach').text().replace(/\s/g, "").replace(/,/g, ''),
                                        'CardNumber': res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + id + '_UCPieManyCards_lblCard').text().replace(/\D/g, ""),
                                        'currencyId': all.banks.core.services.getTypeCurrencyAll(res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + id + '_UCPieManyCards_lblShach').text()),
                                        'CardType': all.banks.core.services.getTypeCard(res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + id + '_lblNameCard').text())
                                    };
                                    // if (indNumber !== undefined) {
                                    // 	dataMonthlyCycle.indFake = 0;
                                    // 	dataMonthlyCycle.NextBillingDate = res.find('#ctl00_ContentPlaceHolder2_ddlDate').val().replace(/\D/g, "").substr(2, 4) + '' + res.find('#ctl00_ContentPlaceHolder2_ddlDate').val().replace(/\D/g, "").substr(0, 2) + mizrahiTefahot.debitDate(res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + id + '_UCPieManyCards_lblCard').text().replace(/\D/g, ""));
                                    // }
                                    // else {
                                    dataMonthlyCycle.indFake = 1;
                                    dataMonthlyCycle.NextBillingDate = '01' + '/' + res.find('#ctl00_ContentPlaceHolder2_ddlDate').val().replace(/\D/g, "").substr(0, 2) + '/' + res.find('#ctl00_ContentPlaceHolder2_ddlDate').val().replace(/\D/g, "").substr(2, 4);
                                    //}
                                    if (clickEv.length) {
                                        if (id == "00") {
                                            arrNextPages.push({
                                                id: clickEv.attr("name"),
                                                selectIdCard: $(res).find("#ddlMisKartis option:selected").val(),
                                                RadAJAXControlID: "ctl00_ContentPlaceHolder2_Repeater1_ctl" + id + "_pnlgrvKART",
                                                date: $(res).find("#ctl00_ContentPlaceHolder2_ddlDate option:selected").val(),
                                                cardDetails: dataMonthlyCycle,
                                                '__VIEWSTATE': $(res).find('input[name="__VIEWSTATE"]').val(),
                                                '__VIEWSTATEGENERATOR': $(res).find('input[name="__VIEWSTATEGENERATOR"]').val(),
                                                '__EVENTVALIDATION': $(res).find('input[name="__EVENTVALIDATION"]').val(),
                                                'radScriptManager': 'ctl00$ContentPlaceHolder2$ctl00$ContentPlaceHolder2$Repeater1$ctl00$grvKARTPanel'
                                            });
                                        } else {
                                            arrNextPages.push({
                                                id: clickEv.attr("name"),
                                                selectIdCard: $(res).find("#ddlMisKartis option:selected").val(),
                                                RadAJAXControlID: "ctl00_ContentPlaceHolder2_Repeater1_ctl" + id + "_pnlgrvKART",
                                                date: $(res).find("#ctl00_ContentPlaceHolder2_ddlDate option:selected").val(),
                                                cardDetails: dataMonthlyCycle,
                                                '__VIEWSTATE': $(res).find('input[name="__VIEWSTATE"]').val(),
                                                '__VIEWSTATEGENERATOR': $(res).find('input[name="__VIEWSTATEGENERATOR"]').val(),
                                                '__EVENTVALIDATION': $(res).find('input[name="__EVENTVALIDATION"]').val(),
                                                'radScriptManager': 'ctl00$ContentPlaceHolder2$Repeater1$ctl' + id + '$ctl00$ContentPlaceHolder2$Repeater1$ctl' + id + '$pnlgrvKARTPanel'
                                            });
                                        }
                                    }
                                    myEmitterLogs(33, dataMonthlyCycle.AccountNumber);
                                    myEmitterLogs(15, dataMonthlyCycle.CardNumber + ' period ' + dataMonthlyCycle.NextBillingDate);
                                    if (res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + id + '_grvKART_ctl00 > tbody > tr').length) {
                                        const nextBillingDateColumnIndex = mizrahiTefahot.replaceCycleDateIfPresent(
                                            res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + id + '_grvKART_ctl00'),
                                            dataMonthlyCycle);
                                        if (dataMonthlyCycle.NextTotal === '') {
                                            dataMonthlyCycle.NextTotal = '0';
                                        }
                                        mizrahiTefahot.processData(res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl' + id + '_grvKART_ctl00 > tbody > tr'),
                                            dataMonthlyCycle,
                                            nextBillingDateColumnIndex);
                                    }
                                    if (i + 1 == $(res).find('.rgMasterTable').length) {
                                        mizrahiTefahot.stepNextCards(arrNextPages, res, null);
                                    }
                                })
                            } else {
                                var clickEv = $(res).find(".rgWrap.rgArrPart1 [title='עמוד הבא']");
                                var indNumbers = mizrahiTefahot.debitDate(res.find('#ctl00_ContentPlaceHolder2_UCPie1_lblCard').text().replace(/\D/g, ""));
                                var dataMonthlyCycle = {
                                    'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                    'AccountNumber': all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].AccountNumber,
                                    'BranchNumber': all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BranchNumber,
                                    'NextTotal': res.find('#ctl00_ContentPlaceHolder2_UCPie1_lblSach').text().replace(/\s/g, "").replace(/,/g, '').replace(/₪/g, ''),
                                    'CardNumber': res.find('#ctl00_ContentPlaceHolder2_UCPie1_lblCard').text().replace(/\D/g, ""),
                                    'currencyId': all.banks.core.services.getTypeCurrencyAll(res.find('#ctl00_ContentPlaceHolder2_UCPie1_lblShach').text()),
                                    'CardType': all.banks.core.services.getTypeCard(res.find('#ctl00_ContentPlaceHolder2_lblNameCard').text())
                                };
                                if (dataMonthlyCycle.CardNumber === '') {
                                    dataMonthlyCycle.CardNumber = res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl01_lblNameCard').text().replace(/\D/g, "")
                                }
                                if (dataMonthlyCycle.NextTotal === '') {
                                    dataMonthlyCycle.NextTotal = res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl01_lblSach').text().replace(/\s/g, "").replace(/,/g, '').replace(/₪/g, '')
                                }

                                // if (indNumbers !== undefined) {
                                // 	dataMonthlyCycle.indFake = 0;
                                // 	dataMonthlyCycle.NextBillingDate = res.find('#ctl00_ContentPlaceHolder2_ddlDate').val().replace(/\D/g, "").substr(2, 4) + '' + res.find('#ctl00_ContentPlaceHolder2_ddlDate').val().replace(/\D/g, "").substr(0, 2) + '' + indNumbers;
                                // }
                                // else {
                                dataMonthlyCycle.indFake = 1;
                                dataMonthlyCycle.NextBillingDate = '01' + '/' + res.find('#ctl00_ContentPlaceHolder2_ddlDate').val().replace(/\D/g, "").substr(0, 2) + '/' + res.find('#ctl00_ContentPlaceHolder2_ddlDate').val().replace(/\D/g, "").substr(2, 4);
                                //}
                                if (clickEv.length) {
                                    arrNextPages.push({
                                        id: clickEv.attr("name"),
                                        selectIdCard: $(res).find("#ddlMisKartis option:selected").val(),
                                        RadAJAXControlID: "ctl00_ContentPlaceHolder2_Repeater1_ctl00_pnlgrvKART",
                                        date: $(res).find("#ctl00_ContentPlaceHolder2_ddlDate option:selected").val(),
                                        cardDetails: dataMonthlyCycle,
                                        '__VIEWSTATE': $(res).find('input[name="__VIEWSTATE"]').val(),
                                        '__VIEWSTATEGENERATOR': $(res).find('input[name="__VIEWSTATEGENERATOR"]').val(),
                                        '__EVENTVALIDATION': $(res).find('input[name="__EVENTVALIDATION"]').val(),
                                        'radScriptManager': 'ctl00$ContentPlaceHolder2$ctl00$ContentPlaceHolder2$Repeater1$ctl00$grvKARTPanel'
                                    });
                                }
                                myEmitterLogs(33, dataMonthlyCycle.AccountNumber);
                                myEmitterLogs(15, dataMonthlyCycle.CardNumber + ' period ' + dataMonthlyCycle.NextBillingDate);


                                // if (res.find('table.rgMasterTable > tbody > tr').length) {
                                // 	const nextBillingDateColumnIndex = mizrahiTefahot.replaceCycleDateIfPresent(
                                // 		res.find('table.rgMasterTable'),
                                // 		dataMonthlyCycle);
                                // 	if (dataMonthlyCycle.NextTotal === '') {
                                // 		dataMonthlyCycle.NextTotal = '0';
                                // 	}
                                // 	mizrahiTefahot.processData(res.find('table.rgMasterTable > tbody > tr'),
                                // 		dataMonthlyCycle,
                                // 		nextBillingDateColumnIndex);
                                // }
                                if (res.find('#ctl00_ContentPlaceHolder2_grvCC_ctl00 > tbody > tr').length) {
                                    const nextBillingDateColumnIndex = mizrahiTefahot.replaceCycleDateIfPresent(
                                        res.find('#ctl00_ContentPlaceHolder2_grvCC_ctl00'),
                                        dataMonthlyCycle);
                                    if (dataMonthlyCycle.NextTotal === '') {
                                        dataMonthlyCycle.NextTotal = '0';
                                    }
                                    mizrahiTefahot.processData(res.find('#ctl00_ContentPlaceHolder2_grvCC_ctl00 > tbody > tr'),
                                        dataMonthlyCycle,
                                        nextBillingDateColumnIndex);
                                } else if (res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl01_grvKART_ctl00 > tbody > tr').length) {
                                    const nextBillingDateColumnIndex = mizrahiTefahot.replaceCycleDateIfPresent(
                                        res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl01_grvKART_ctl00'),
                                        dataMonthlyCycle);
                                    if (dataMonthlyCycle.NextTotal === '') {
                                        dataMonthlyCycle.NextTotal = '0';
                                    }
                                    mizrahiTefahot.processData(res.find('#ctl00_ContentPlaceHolder2_Repeater1_ctl01_grvKART_ctl00 > tbody > tr'),
                                        dataMonthlyCycle,
                                        nextBillingDateColumnIndex);
                                }
                                mizrahiTefahot.stepNextCards(arrNextPages, res, null);
                            }
                        } else {
                            mizrahiTefahot.stepNextCards(arrNextPages, res, null);
                        }
                    }
                })
                .fail(function (error, resErr, urlParam) {
                    var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                    all.banks.core.services.errorLog(logErr)
                });
        }
    };
    mizrahiTefahot.processData = function (arr, dataMonthlyCycle, nextBillingDateColumnIndex) {
        var actionName = '';
        $(arr).each(function (indx, val) {
            if (val.style.display !== 'none') {
                let peulaSpecificNextBillingDate;
                if (nextBillingDateColumnIndex
                    && (peulaSpecificNextBillingDate =
                        $(val).find('td:nth-child(' + nextBillingDateColumnIndex + ')').text().trim())
                    && /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(peulaSpecificNextBillingDate)) {
                    peulaSpecificNextBillingDate = peulaSpecificNextBillingDate.split('/')
                        .map((part, idx) => idx === 2 ? ('20' + part) : part)
                        .join('/');
                } else {
                    peulaSpecificNextBillingDate = undefined;
                }

                var td = $(val).find('td');

                if (td.length < 8) {
                    var totalPaymentsSum = null, currentPaymentNumSum = null, comment = '';
                    const regex = /(\d{1,2})[\s\u200f]+(מ|מתוך)[\s\u200f]+(\d{1,2})/g;
                    let pymntsMatch = regex.exec(td.eq(4).text());
                    if (pymntsMatch !== null && pymntsMatch.length === 4) {
                        currentPaymentNumSum = parseInt(pymntsMatch[1]);
                        totalPaymentsSum = parseInt(pymntsMatch[3]);
                    } else {
                        comment = td.eq(4).text().replace(/\s\s+/g, " ").trim();
                    }

                    var comText = td.eq(3).text().replace(/\s\s+/g, " ").trim();
                    if (comText !== "") {
                        var textBuilder = "";
                        if (comment !== "") {
                            textBuilder = " ";
                        }
                        comment += textBuilder + comText;
                    }
                    var ValueDate = null;
                    if (td.eq(0).text() !== '') {
                        ValueDate = td.eq(0).text();
                    }
                    var TransDesc = null;
                    if (td.eq(1).text() !== '') {
                        if (actionName != '') {
                            TransDesc = actionName + ' ' + td.eq(1).text();
                            actionName = '';
                        } else {
                            TransDesc = td.eq(1).text();
                        }
                    }

                    var original_total = null;
                    if (td.eq(2).text() !== '') {
                        original_total = td.eq(2).text().replace(/\s/g, "").replace(/,/g, '');
                    }
                    var transTotal = null;
                    if (td.eq(5).text() !== '') {
                        transTotal = td.eq(5).text().replace(/\s/g, "").replace(/,/g, '');
                    }
                } else {
                    var td = $(val).find('td');

                    var totalPaymentsSum = null, currentPaymentNumSum = null, comment = '';
                    const regex = /(\d{1,2})[\s\u200f]+(מ|מתוך)[\s\u200f]+(\d{1,2})/g;
                    let pymntsMatch = regex.exec(td.eq(4).text());
//                                    let pymntsMatch = regex.exec(td.eq(5).text());
                    if (pymntsMatch !== null && pymntsMatch.length === 4) {
                        currentPaymentNumSum = parseInt(pymntsMatch[1]);
                        totalPaymentsSum = parseInt(pymntsMatch[3]);
                    } else {
                        comment = td.eq(5).text().replace(/\s\s+/g, " ").trim();
                    }

                    var comText = td.eq(4).text().replace(/\s\s+/g, " ").trim();
                    if (comText !== "") {
                        var textBuilder = "";
                        if (comment !== "") {
                            textBuilder = " ";
                        }
                        comment += textBuilder + comText;
                    }
                    var ValueDate = null;
                    if (td.eq(0).text() !== '') {
                        ValueDate = td.eq(0).text();
                    }
                    var TransDesc = null;
                    if (td.eq(2).text() !== '') {
                        if (actionName != '') {
                            TransDesc = actionName + ' ' + td.eq(2).text();
                            actionName = '';
                        } else {
                            TransDesc = td.eq(2).text();
                        }
                    }

                    var original_total = null;
                    if (td.eq(3).text() !== '') {
                        original_total = td.eq(3).text().replace(/\s/g, "").replace(/,/g, '');
                    }
                    var transTotal = null;
                    var tdVisible = td.filter(function (i, v) {
                        return v.style["display"] !== "none";
                    });
                    if (!/^-?\d+\.?\d*$/g.test((transTotal = tdVisible.eq(-2).text().replace(/\s/g, "").replace(/,/g, '')))) {
                        transTotal = null;
                    }
                    var currencyId = null;
                    const currencyMatch = /^[A-Z]{2,3}$/g.exec(td.eq(5).text());
                    if (currencyMatch !== null) {
                        currencyId = all.banks.core.services.getTypeCurrencyAll(td.eq(5).text());
                    } else if (td.eq(6).text().trim() !== '') {
                        currencyId = all.banks.core.services.getTypeCurrencyAll(
                            td.eq(6).text().replace(/\s/g, "").replace(/,/g, ''));
                    }
                }

                if (comment.replace(/\s/g, "") !== "" || transTotal != null) {
                    if (ValueDate !== null || TransDesc.replace(/\s/g, "") !== "") {
                        all.banks.generalVariables.allDataArrAshrai.push({
                            "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                            "TargetId": all.banks.accountDetails.bank.targetId,
                            "Token": all.banks.accountDetails.bank.token,
                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                            "ExporterId": all.banks.spiderConfig.spiderId,
                            "BranchNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BranchNumber,
                            "AccountNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].AccountNumber,
                            "CardNumber": dataMonthlyCycle.CardNumber,
                            "NextBillingDate": peulaSpecificNextBillingDate
                                ? peulaSpecificNextBillingDate
                                : all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(dataMonthlyCycle.NextBillingDate)),
                            "NextCycleTotal": dataMonthlyCycle.NextTotal,
                            "CardStatus": null,
                            "TransDesc": all.banks.core.services.getStringJson(TransDesc),
                            "TransTotal": transTotal,
                            "ValueDate": (ValueDate == null) ? all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(dataMonthlyCycle.NextBillingDate)) : all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(ValueDate)),
                            "TransCategory": null,
                            "TotalPayments": totalPaymentsSum,
                            "CurrentPaymentNum": currentPaymentNumSum,
                            "CardType": dataMonthlyCycle.CardType,
                            "indFakeDate": dataMonthlyCycle.indFake,
                            "currency_id": currencyId !== null ? currencyId
                                : (!totalPaymentsSum && original_total && transTotal
                                    && transTotal.replace(/-/g, '') !== original_total.replace(/-/g, ''))
                                    ? 99 : dataMonthlyCycle.currencyId,
//							"currency_id": dataMonthlyCycle.currencyId,
                            "original_total": original_total,
                            "ind_iskat_hul": dataMonthlyCycle.currencyId,
                            "comment": comment
                        });
                    } else if (transTotal !== null) {
                        if (all.banks.generalVariables.allDataArrAshrai.length > 0
                            && all.banks.generalVariables.allDataArrAshrai[all.banks.generalVariables.allDataArrAshrai.length - 1].TransTotal == null) {
                            all.banks.generalVariables.allDataArrAshrai[all.banks.generalVariables.allDataArrAshrai.length - 1].TransTotal = transTotal;
                        } else {
                            all.banks.generalVariables.allDataArrAshrai.push({
                                "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                "TargetId": all.banks.accountDetails.bank.targetId,
                                "Token": all.banks.accountDetails.bank.token,
                                "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                "ExporterId": all.banks.spiderConfig.spiderId,
                                "BranchNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].BranchNumber,
                                "AccountNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[mizrahiTefahot.ind].AccountNumber,
                                "CardNumber": dataMonthlyCycle.CardNumber,
                                "NextBillingDate": peulaSpecificNextBillingDate
                                    ? peulaSpecificNextBillingDate
                                    : all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(dataMonthlyCycle.NextBillingDate)),
                                "NextCycleTotal": dataMonthlyCycle.NextTotal,
                                "CardStatus": null,
                                "TransDesc": all.banks.core.services.getStringJson(comment),
                                "TransTotal": transTotal,
                                "ValueDate": (ValueDate == null) ? all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(dataMonthlyCycle.NextBillingDate)) : all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(ValueDate)),
                                "TransCategory": null,
                                "TotalPayments": totalPaymentsSum,
                                "CurrentPaymentNum": currentPaymentNumSum,
                                "CardType": dataMonthlyCycle.CardType,
                                "indFakeDate": dataMonthlyCycle.indFake,
                                "currency_id": currencyId !== null ? currencyId : dataMonthlyCycle.currencyId,
                                "original_total": original_total,
                                "ind_iskat_hul": dataMonthlyCycle.currencyId,
                                "comment": comment
                            });
                        }
                    }
                } else {
                    actionName = TransDesc;
                }
            }
        })
    };
    mizrahiTefahot.stepNextCards = function (arrNextPages, res, type) {
        if (arrNextPages.length) {
            function loacAllNextDates() {
                $(arrNextPages).each(function (i, v) {
                    if (i == 0) {
                        if (type == "present") {
                            var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/CC/P436.aspx";
                            var form = {
                                "ctl00$radScriptManager": v.radScriptManager + "|" + v.id,
                                "__EVENTTARGET": "",
                                "__EVENTARGUMENT": "",
                                '__VIEWSTATE': v["__VIEWSTATE"],
                                '__VIEWSTATEGENERATOR': v["__VIEWSTATEGENERATOR"],
                                "__VIEWSTATEENCRYPTED": "",
                                '__EVENTVALIDATION': v["__EVENTVALIDATION"],
                                "ctl00$ContentPlaceHolder2$UCCards1$ddlMisKartis": v.selectIdCard,
                                "__ASYNCPOST": "true",
                                "RadAJAXControlID": v.RadAJAXControlID
                            }
                            form[v.id] = "";
                        } else {
                            var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/cc/p054.aspx";
                            var form = {
                                "ctl00$radScriptManager": v.radScriptManager + "|" + v.id,
                                "__EVENTTARGET": "",
                                "__EVENTARGUMENT": "",
                                '__VIEWSTATE': v["__VIEWSTATE"],
                                '__VIEWSTATEGENERATOR': v["__VIEWSTATEGENERATOR"],
                                "__VIEWSTATEENCRYPTED": "",
                                '__EVENTVALIDATION': v["__EVENTVALIDATION"],
                                "ctl00$ContentPlaceHolder2$UCCards1$ddlMisKartis": v.selectIdCard,
                                "ctl00$ContentPlaceHolder2$ddlDate": v.date,
                                "__ASYNCPOST": "true",
                                "RadAJAXControlID": v.RadAJAXControlID
                            }
                            form[v.id] = "";
                        }
                        mizrahiTefahot.loadNextPage(url, form)
                            .then(function (response, res1, res2) {
                                try {
                                    var resValues = response;
                                    var responseAll = all.banks.core.services.parseHtml(response);
                                    if (responseAll.find('#errorMessageBox').length) {
                                        if (mizrahiTefahot.numberOfOptions > 1) {
                                            if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
                                                mizrahiTefahot.counterCard = 0;
                                                mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
                                                mizrahiTefahot.changBankAccAshrai(mizrahiTefahot.ind)
                                            } else {
                                                all.banks.accounts.mizrahiTefahot.sendCardsCtrl()
                                            }
                                        } else {
                                            all.banks.accounts.mizrahiTefahot.sendCardsCtrl()
                                        }
                                        return;
                                    }
                                    var tr = responseAll.find("table.rgMasterTable > tbody > tr");
                                    const nextBillingDateColumnIndex = mizrahiTefahot.replaceCycleDateIfPresent(
                                        responseAll.find("table.rgMasterTable"),
                                        v.cardDetails);
                                    if (v.cardDetails.NextTotal && v.cardDetails.NextTotal === '') {
                                        v.cardDetails.NextTotal = '0';
                                    }
                                    mizrahiTefahot.processData(tr, v.cardDetails, nextBillingDateColumnIndex);
                                    var clickEv = responseAll.find(".rgWrap.rgArrPart1 [title='עמוד הבא']");
                                    if (clickEv.length && clickEv.attr("onclick") !== undefined && clickEv.attr("onclick").indexOf("false") == -1) {
                                        v.id = clickEv.attr("name");
                                        v["__EVENTVALIDATION"] = resValues.split("__EVENTVALIDATION")[1].split("|")[1];
                                        v["__VIEWSTATEGENERATOR"] = resValues.split("__VIEWSTATEGENERATOR")[1].split("|")[1];
                                        v["__VIEWSTATE"] = resValues.split("__VIEWSTATE")[1].split("|")[1];
                                        loacAllNextDates();
                                    } else {
                                        arrNextPages.splice(0, 1);
                                        mizrahiTefahot.stepNextCards(arrNextPages, res, type)
                                    }
                                } catch (e) {
                                }
                            });
                        return false;
                    }
                })
            }

            loacAllNextDates();
        } else {
            if (type == "present") {
                mizrahiTefahot.loadPresentAndPrevCard("prev");
            } else {
                if (all.banks.accountDetails.ccardMonth > mizrahiTefahot.counterCard) {
                    mizrahiTefahot.counterCard += 1;
                    mizrahiTefahot.loadPrevPrevCard(res);
                } else {
                    if (mizrahiTefahot.numberOfOptions > 1) {
                        if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
                            mizrahiTefahot.counterCard = 0;
                            mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
                            mizrahiTefahot.changBankAccAshrai(mizrahiTefahot.ind)
                        } else {
                            all.banks.accounts.mizrahiTefahot.sendCardsCtrl()
                        }
                    } else {
                        all.banks.accounts.mizrahiTefahot.sendCardsCtrl()
                    }
                }
            }
        }
    }
    mizrahiTefahot.loadNextPage = function (url, form) {
        var dfd = jQuery.Deferred();
        all.banks.core.services.httpReq(url, 'POST', form, true, false)
            .then(function (response) {
                var htmlPage = "<html><body>" + response + "</body></html>";
                var res = htmlPage;
                dfd.resolve(res);
                res = null;
                response = null;
                htmlPage = null;
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
        return dfd.promise();
    };
    mizrahiTefahot.loadMatah = function (acc) {
        var accArr = acc;
        var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/Matach/p403.aspx";
        mizrahiTefahot.sender(url, "GET")
            .then(function (data) {
                try {
                    var data = all.banks.core.services.parseHtml(data);
                    data.find("#ctl00_ContentPlaceHolder2_ddlKvutza option").eq(0).remove();
                    var groups = data.find("#ctl00_ContentPlaceHolder2_ddlKvutza option");
                    var arrayGroup = [{
                        text: 'מעבר שיק גביה רגילה',
                        val: '259'
                    }];
                    $(groups).each(function (idx, valOpt) {
                        arrayGroup.push({
                            text: $(valOpt).text(),
                            val: $(valOpt).val()
                        })
                    });
                    //	function loadFromGroup() {
                    //	$(arrayGroup).each(function (idx, valOpt) {
                    var valOptGr = "000";
                    var dateFromLast = ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2),
                        monthFromLast = ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2),
                        yearFromLast = all.banks.accountDetails.dateFromMatah.getFullYear().toString(),
                        dateToLast = ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2),
                        monthToLast = ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2),
                        yearToLast = all.banks.accountDetails.dateToMatah.getFullYear().toString();

                    function loadMatahRows(dateFrom, monthFrom, yearFrom, dateTo, monthTo, yearTo, isFirst) {
                        var post = {
                            'ctl00_radScriptManager_TSM': '',
                            'ctl00_RadStyleSheetManager_TSSM': '',
                            '__EVENTTARGET': $(data).find('input[name="__EVENTTARGET"]').val(),
                            '__EVENTARGUMENT': $(data).find('input[name="__EVENTARGUMENT"]').val(),
                            '__VIEWSTATE': $(data).find('input[name="__VIEWSTATE"]').val(),
                            '__VIEWSTATEGENERATOR': $(data).find('input[name="__VIEWSTATEGENERATOR"]').val(),
                            '__VIEWSTATEENCRYPTED': $(data).find('input[name="__VIEWSTATEENCRYPTED"]').val(),
                            '__EVENTVALIDATION': $(data).find('input[name="__EVENTVALIDATION"]').val(),
                            'ctl00$ContentPlaceHolder2$ddlSugMatbeha': '00',
                            'ctl00$ContentPlaceHolder2$ddlKvutza': valOptGr,
                            'ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker1ID$radDatePickerID': yearFrom + "-" + monthFrom + "-" + dateFrom,
                            'ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker1ID$radDatePickerID$dateInput': dateFrom + "/" + monthFrom + "/" + yearFrom,
                            'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_dateInput_ClientState': '{"enabled":true,"emptyMessage":"","validationText":"' + yearFrom + '-' + monthFrom + '-' + dateFrom + '-00-00-00","valueAsString":"' + yearFrom + '-' + monthFrom + '-' + dateFrom + '-00-00-00","minDateStr":"1980-01-01-00-00-00","maxDateStr":"2099-12-31-00-00-00","lastSetTextBoxValue":"' + dateFrom + '/' + monthFrom + '/' + yearFrom + '"}',
                            'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_calendar_SD': '[[' + yearFrom + ',' + parseFloat(monthFrom) + ',' + parseFloat(dateFrom) + ']]',
                            'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_calendar_AD': '[[1980,1,1],[2099,12,31],[' + yearFrom + ',' + parseFloat(monthFrom) + ',' + parseFloat(dateFrom) + ']]',
                            'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_ClientState': '',
                            'ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker2ID$radDatePickerID': yearTo + "-" + monthTo + "-" + dateTo,
                            'ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker2ID$radDatePickerID$dateInput': dateTo + "/" + monthTo + "/" + yearTo,
                            'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_dateInput_ClientState': '{"enabled":true,"emptyMessage":"","validationText":"' + yearTo + '-' + monthTo + '-' + dateTo + '-00-00-00","valueAsString":"' + yearTo + '-' + monthTo + '-' + dateTo + '-00-00-00","minDateStr":"1980-01-01-00-00-00","maxDateStr":"2099-12-31-00-00-00","lastSetTextBoxValue":"' + dateTo + '/' + monthTo + '/' + yearTo + '"}',
                            'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_calendar_SD': '[]',
                            'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_calendar_AD': '[[1980,1,1],[2099,12,31],[' + yearTo + ',' + parseFloat(monthTo) + ',' + parseFloat(dateTo) + ']]',
                            'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_ClientState': '',
                            'ctl00$ContentPlaceHolder2$btnShow': 'הצג',
                            'ctl00_ContentPlaceHolder2_Repeater1_ctl00_grvPeulot_ClientState': '',
                            'ctl00$hdnLinkToExternalSite': 'קישור לאתר חיצוני'
                        };
                        var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/Matach/p403.aspx";
                        mizrahiTefahot.sender(url, "POST", post, true)
                            .then(function (response) {
                                var res = all.banks.core.services.parseHtml(response);
                                response = null;
                                if (res.find('.rgMasterTable').length) {
                                    var lengthOfTables = res.find('.rgMasterTable').length;

                                    function loadTablesMatah() {
                                        res.find('.rgMasterTable').each(function (i, v) {
                                            var elementTitle;
                                            var ParentRadAjaxPanel = $(v).parents(".RadAjaxPanel");
                                            ParentRadAjaxPanel = ParentRadAjaxPanel.eq(ParentRadAjaxPanel.length - 1);
                                            var idParent = ParentRadAjaxPanel.attr("id");
                                            var childrenId = ParentRadAjaxPanel.children("div").attr("id");
                                            var nodeName = ParentRadAjaxPanel.prev();
                                            if (nodeName.length) {
                                                elementTitle = ParentRadAjaxPanel.prev();
                                            } else {
                                                elementTitle = ParentRadAjaxPanel.parent("div").prev();
                                            }
                                            if (all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length) {
                                                mizrahiTefahot.indexAccMatah = (all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1);
                                            }
                                            var obj = {
                                                'BankNumber': accArr.BankNumber,
                                                'AccountNumber': accArr.AccountNumber,
                                                'BranchNumber': accArr.BranchNumber,
                                                'Balance': null,
                                                'AccountCredit': null,
                                                "BankAccountTypeId": getTypeGroup(elementTitle.children("span").eq(1).text()),
                                                "CurrencyId": all.banks.core.services.getTypeCurrencyAll(elementTitle.children("span").eq(0).text(), true)
                                            }
                                            if (obj.BankAccountTypeId == null) {
                                                res.find('.rgMasterTable').eq(i).remove();
                                                if (res.find('.rgMasterTable').length == 0) {
                                                    if (yearFromLast !== yearToLast && (yearTo !== yearToLast)) {
                                                        loadMatahRows("01", "01", yearToLast, dateToLast, monthToLast, yearToLast);
                                                    } else {
                                                        if (mizrahiTefahot.numberOfOptions > 1) {
                                                            if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
                                                                mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
                                                                mizrahiTefahot.changBankAccMatah(mizrahiTefahot.ind)
                                                            } else {
                                                                mizrahiTefahot.sendOshCtrl(true);
                                                            }
                                                        } else {
                                                            mizrahiTefahot.sendOshCtrl(true);
                                                        }
                                                    }
                                                } else {
                                                    loadTablesMatah();
                                                }
                                            } else {
                                                if (all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length) {
                                                    var isExist = 0;
                                                    $(all.banks.generalVariables.allDataArrMatah.BankData[0].Account).each(function (indexAcc, accVal) {
                                                        if (
                                                            (accVal.BankNumber == obj.BankNumber)
                                                            &&
                                                            (accVal.AccountNumber == obj.AccountNumber)
                                                            &&
                                                            (accVal.BranchNumber == obj.BranchNumber)
                                                            &&
                                                            (accVal.BankAccountTypeId == obj.BankAccountTypeId)
                                                            &&
                                                            (accVal.CurrencyId == obj.CurrencyId)
                                                        ) {
                                                            isExist = 1;
                                                            mizrahiTefahot.indexAccMatah = indexAcc;
                                                        }
                                                        if (indexAcc + 1 == all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length) {
                                                            if (isExist == 0) {
                                                                all.banks.generalVariables.allDataArrMatah.BankData[0].Account.push(obj);
                                                                mizrahiTefahot.indexAccMatah = (all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1);
                                                                all.banks.generalVariables.allDataArrMatah.BankData[0].Account[mizrahiTefahot.indexAccMatah].DataRow = [];
                                                            }
                                                            loadRowsMatahAll();
                                                        }
                                                    })
                                                } else {
                                                    all.banks.generalVariables.allDataArrMatah.BankData[0].Account.push(obj);
                                                    mizrahiTefahot.indexAccMatah = (all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1);
                                                    all.banks.generalVariables.allDataArrMatah.BankData[0].Account[mizrahiTefahot.indexAccMatah].DataRow = [];
                                                    loadRowsMatahAll();
                                                }
                                            }

                                            async function loadRowsMatahAll() {
                                                var rowsArray = $(v).children("tbody").children("tr");
                                                if (rowsArray.length) {
                                                    for (var i1 = 0; i1 < rowsArray.length; i1++) {
                                                        var td = rowsArray.eq(i1).children("td");
                                                        var dateVal = td.eq(0).text().replace(/\s/g, ""),
                                                            dateValue = td.eq(1).text(),
                                                            dateValDesc = td.eq(2).text(),
                                                            dateValAsmacta = td.eq(3).text().replace(/\s/g, ""),
                                                            dateValSum = td.eq(4).text().replace(/\s/g, "").replace(/,/g, ''),
                                                            dateValItra = td.eq(5).text().replace(/\s/g, "").replace(/,/g, '');

                                                        if (dateVal !== "") {
                                                            var depositeTransferData = null;
                                                            var indexData = td.eq(2).attr("data-index");
                                                            if (indexData !== undefined) {
                                                                var resData = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/Matach/swiftPopUp.aspx?indexTnua=" + indexData, "GET");
                                                                var swiftPopUp = all.banks.core.services.parseHtml(resData);
                                                                var textValues = swiftPopUp.find("#ctl00_ContentPlaceHolder1_swiftContentDiv pre").map(function () {
                                                                    return $(this).text().trim();
                                                                }).get().join(" ");
                                                                depositeTransferData = [{
                                                                    "DepositeTransferDate": "",
                                                                    "BankTransferNumber": "",
                                                                    "BranchTransferNumber": "",
                                                                    "AccountTransferNumber": "",
                                                                    "NamePayerTransfer": "",
                                                                    "DetailsTransfer": textValues,
                                                                    "TransferTotal": ""
                                                                }];
                                                            }
                                                            if (td.eq(2).children("span").length) {
                                                                dateValDesc = td.eq(2).children("span").text();
                                                            }
                                                            all.banks.generalVariables.allDataArrMatah.BankData[0].Account[mizrahiTefahot.indexAccMatah].DataRow.push({
                                                                "Asmachta": (dateValAsmacta == "") ? null : dateValAsmacta,
                                                                "TransDesc": all.banks.core.services.getStringJson(dateValDesc),
                                                                "ValueDate": all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(dateVal)),
                                                                "TransactionType": (dateValSum.indexOf("-") !== -1) ? "0" : "1",
                                                                "TransTotal": Math.abs(dateValSum),
                                                                "Balance": dateValItra,
                                                                "IsDaily": "0",
                                                                "imgs": null,
                                                                "DepositeTransferData": depositeTransferData
                                                            });
                                                        }
                                                        if (rowsArray.length == i1 + 1) {
                                                            if ($(v).find("thead .rgPagerCell.NextPrev .rgPageNext[title='עמוד הבא']").length) {
                                                                var nameAttr = $(v).find("thead .rgPagerCell.NextPrev .rgPageNext[title='עמוד הבא']").attr("name");
                                                                $.when(mizrahiTefahot.loadMatahNextTable(res, dateFrom, monthFrom, yearFrom, dateTo, monthTo, yearTo, isFirst, valOptGr, nameAttr, childrenId, idParent))
                                                                    .then(function () {
                                                                        res.find('.rgMasterTable').eq(i).remove();
                                                                        if (res.find('.rgMasterTable').length == 0) {
                                                                            if (yearFromLast !== yearToLast && (yearTo !== yearToLast)) {
                                                                                loadMatahRows("01", "01", yearToLast, dateToLast, monthToLast, yearToLast);
                                                                            } else {
                                                                                if (mizrahiTefahot.numberOfOptions > 1) {
                                                                                    if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
                                                                                        mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
                                                                                        mizrahiTefahot.changBankAccMatah(mizrahiTefahot.ind)
                                                                                    } else {
                                                                                        mizrahiTefahot.sendOshCtrl(true);
                                                                                    }
                                                                                } else {
                                                                                    mizrahiTefahot.sendOshCtrl(true);
                                                                                }
                                                                            }
                                                                        } else {
                                                                            loadTablesMatah();
                                                                        }
                                                                    });
                                                            } else {
                                                                res.find('.rgMasterTable').eq(i).remove();
                                                                if (res.find('.rgMasterTable').length == 0) {
                                                                    if (yearFromLast !== yearToLast && (yearTo !== yearToLast)) {
                                                                        loadMatahRows("01", "01", yearToLast, dateToLast, monthToLast, yearToLast);
                                                                    } else {
                                                                        if (mizrahiTefahot.numberOfOptions > 1) {
                                                                            if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
                                                                                mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
                                                                                mizrahiTefahot.changBankAccMatah(mizrahiTefahot.ind)
                                                                            } else {
                                                                                mizrahiTefahot.sendOshCtrl(true);
                                                                            }
                                                                        } else {
                                                                            mizrahiTefahot.sendOshCtrl(true);
                                                                        }
                                                                    }
                                                                } else {
                                                                    loadTablesMatah();
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }

                                            return false;
                                        })
                                    }

                                    loadTablesMatah();
                                } else {
                                    if (yearFromLast !== yearToLast && (yearTo !== yearToLast)) {
                                        loadMatahRows("01", "01", yearToLast, dateToLast, monthToLast, yearToLast);
                                    } else {
                                        if (mizrahiTefahot.numberOfOptions > 1) {
                                            if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
                                                mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
                                                mizrahiTefahot.changBankAccMatah(mizrahiTefahot.ind);
                                            } else {
                                                mizrahiTefahot.sendOshCtrl(true);
                                            }
                                        } else {
                                            mizrahiTefahot.sendOshCtrl(true);
                                        }
                                    }
                                }
                            })
                            .fail(function (error, resErr, urlParam) {
                                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                                all.banks.core.services.errorLog(logErr)
                            });
                    }

                    if (yearFromLast !== yearToLast) {
                        loadMatahRows(dateFromLast, monthFromLast, yearFromLast, "31", "12", yearFromLast, true);
                    } else {
                        loadMatahRows(dateFromLast, monthFromLast, yearFromLast, dateToLast, monthToLast, yearFromLast, true);
                    }

                    // 	return false;
                    // });
                    //	}

                    // loadFromGroup();
                    function getTypeGroup(text) {
                        var type = null;
                        $(arrayGroup).each(function (i, v) {
                            if (v.text.indexOf(text) !== -1) {
                                type = v.val;
                                return false;
                            }
                        });

                        if (type === null) {
                            if (text && 'עו"ש מטבע לא סחיר' === text.trim()) {
                                return '9001';
                            }
                        }
                        return type;
                    }
                } catch (err) {
                    all.banks.core.services.errorLog(err)
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr);
            });
        // all.banks.core.services.httpReq("https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/Matach/p409.aspx", 'GET', null, false, false)
        //     .then(function (responsePage) {
        //         var responsePage = all.banks.core.services.parseHtml(responsePage);
        //         if (mizrahiTefahot.isErrorOrNotAvailableMessage(responsePage.find(".error_msg").text())) {
        //             if (mizrahiTefahot.numberOfOptions > 1) {
        //                 if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
        //                     mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
        //                     mizrahiTefahot.changBankAccMatah(mizrahiTefahot.ind);
        //                 } else {
        //                     mizrahiTefahot.sendOshCtrl(true);
        //                 }
        //             } else {
        //                 mizrahiTefahot.sendOshCtrl(true);
        //             }
        //         } else {
        //             var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/matach/p403.aspx";
        //             all.banks.core.services.httpReq(url, 'GET', null, false, false)
        //                 .then(function (data) {
        //                     try {
        //                         var data = all.banks.core.services.parseHtml(data);
        //                         data.find("#ctl00_ContentPlaceHolder2_ddlKvutza option").eq(0).remove();
        //                         var groups = data.find("#ctl00_ContentPlaceHolder2_ddlKvutza option");
        //                         var arrayGroup = [{
        //                             text: 'מעבר שיק גביה רגילה',
        //                             val: '259'
        //                         }];
        //                         $(groups).each(function (idx, valOpt) {
        //                             arrayGroup.push({
        //                                 text: $(valOpt).text(),
        //                                 val: $(valOpt).val()
        //                             })
        //                         });
        //                         //	function loadFromGroup() {
        //                         //	$(arrayGroup).each(function (idx, valOpt) {
        //                         var valOptGr = "000";
        //                         var dateFromLast = ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2),
        //                             monthFromLast = ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2),
        //                             yearFromLast = all.banks.accountDetails.dateFromMatah.getFullYear().toString(),
        //                             dateToLast = ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2),
        //                             monthToLast = ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2),
        //                             yearToLast = all.banks.accountDetails.dateToMatah.getFullYear().toString();
        //
        //                         function loadMatahRows(dateFrom, monthFrom, yearFrom, dateTo, monthTo, yearTo, isFirst) {
        //                             var post = {
        //                                 'ctl00_radScriptManager_TSM': '',
        //                                 'ctl00_RadStyleSheetManager_TSSM': '',
        //                                 '__EVENTTARGET': $(data).find('input[name="__EVENTTARGET"]').val(),
        //                                 '__EVENTARGUMENT': $(data).find('input[name="__EVENTARGUMENT"]').val(),
        //                                 '__VIEWSTATE': $(data).find('input[name="__VIEWSTATE"]').val(),
        //                                 '__VIEWSTATEGENERATOR': $(data).find('input[name="__VIEWSTATEGENERATOR"]').val(),
        //                                 '__VIEWSTATEENCRYPTED': $(data).find('input[name="__VIEWSTATEENCRYPTED"]').val(),
        //                                 '__EVENTVALIDATION': $(data).find('input[name="__EVENTVALIDATION"]').val(),
        //                                 'ctl00$ContentPlaceHolder2$ddlSugMatbeha': '00',
        //                                 'ctl00$ContentPlaceHolder2$ddlKvutza': valOptGr,
        //                                 'ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker1ID$radDatePickerID': yearFrom + "-" + monthFrom + "-" + dateFrom,
        //                                 'ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker1ID$radDatePickerID$dateInput': dateFrom + "/" + monthFrom + "/" + yearFrom,
        //                                 'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_dateInput_ClientState': '{"enabled":true,"emptyMessage":"","validationText":"' + yearFrom + '-' + monthFrom + '-' + dateFrom + '-00-00-00","valueAsString":"' + yearFrom + '-' + monthFrom + '-' + dateFrom + '-00-00-00","minDateStr":"1980-01-01-00-00-00","maxDateStr":"2099-12-31-00-00-00","lastSetTextBoxValue":"' + dateFrom + '/' + monthFrom + '/' + yearFrom + '"}',
        //                                 'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_calendar_SD': '[[' + yearFrom + ',' + parseFloat(monthFrom) + ',' + parseFloat(dateFrom) + ']]',
        //                                 'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_calendar_AD': '[[1980,1,1],[2099,12,31],[' + yearFrom + ',' + parseFloat(monthFrom) + ',' + parseFloat(dateFrom) + ']]',
        //                                 'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_ClientState': '',
        //                                 'ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker2ID$radDatePickerID': yearTo + "-" + monthTo + "-" + dateTo,
        //                                 'ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker2ID$radDatePickerID$dateInput': dateTo + "/" + monthTo + "/" + yearTo,
        //                                 'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_dateInput_ClientState': '{"enabled":true,"emptyMessage":"","validationText":"' + yearTo + '-' + monthTo + '-' + dateTo + '-00-00-00","valueAsString":"' + yearTo + '-' + monthTo + '-' + dateTo + '-00-00-00","minDateStr":"1980-01-01-00-00-00","maxDateStr":"2099-12-31-00-00-00","lastSetTextBoxValue":"' + dateTo + '/' + monthTo + '/' + yearTo + '"}',
        //                                 'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_calendar_SD': '[]',
        //                                 'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_calendar_AD': '[[1980,1,1],[2099,12,31],[' + yearTo + ',' + parseFloat(monthTo) + ',' + parseFloat(dateTo) + ']]',
        //                                 'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_ClientState': '',
        //                                 'ctl00$ContentPlaceHolder2$btnShow': 'הצג',
        //                                 'ctl00_ContentPlaceHolder2_Repeater1_ctl00_grvPeulot_ClientState': '',
        //                                 'ctl00$hdnLinkToExternalSite': 'קישור לאתר חיצוני'
        //                             };
        //                             var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/matach/p403.aspx";
        //                             all.banks.core.services.httpReq(url, 'POST', post, true, false)
        //                                 .then(function (response) {
        //                                     var res = all.banks.core.services.parseHtml(response);
        //                                     response = null;
        //                                     if (res.find('.rgMasterTable').length) {
        //                                         var lengthOfTables = res.find('.rgMasterTable').length;
        //
        //                                         function loadTablesMatah() {
        //                                             res.find('.rgMasterTable').each(function (i, v) {
        //                                                 var elementTitle;
        //                                                 var ParentRadAjaxPanel = $(v).parents(".RadAjaxPanel");
        //                                                 ParentRadAjaxPanel = ParentRadAjaxPanel.eq(ParentRadAjaxPanel.length - 1);
        //                                                 var idParent = ParentRadAjaxPanel.attr("id");
        //                                                 var childrenId = ParentRadAjaxPanel.children("div").attr("id");
        //                                                 var nodeName = ParentRadAjaxPanel.prev();
        //                                                 if (nodeName.length) {
        //                                                     elementTitle = ParentRadAjaxPanel.prev();
        //                                                 } else {
        //                                                     elementTitle = ParentRadAjaxPanel.parent("div").prev();
        //                                                 }
        //                                                 if (all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length) {
        //                                                     mizrahiTefahot.indexAccMatah = (all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1);
        //                                                 }
        //                                                 var obj = {
        //                                                     'BankNumber': accArr.BankNumber,
        //                                                     'AccountNumber': accArr.AccountNumber,
        //                                                     'BranchNumber': accArr.BranchNumber,
        //                                                     'Balance': null,
        //                                                     'AccountCredit': null,
        //                                                     "BankAccountTypeId": getTypeGroup(elementTitle.children("span").eq(1).text()),
        //                                                     "CurrencyId": all.banks.core.services.getTypeCurrencyAll(elementTitle.children("span").eq(0).text(), true)
        //                                                 }
        //                                                 if (obj.BankAccountTypeId == null) {
        //                                                     res.find('.rgMasterTable').eq(i).remove();
        //                                                     if (res.find('.rgMasterTable').length == 0) {
        //                                                         if (yearFromLast !== yearToLast && (yearTo !== yearToLast)) {
        //                                                             loadMatahRows("01", "01", yearToLast, dateToLast, monthToLast, yearToLast);
        //                                                         } else {
        //                                                             if (mizrahiTefahot.numberOfOptions > 1) {
        //                                                                 if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
        //                                                                     mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
        //                                                                     mizrahiTefahot.changBankAccMatah(mizrahiTefahot.ind)
        //                                                                 } else {
        //                                                                     mizrahiTefahot.sendOshCtrl(true);
        //                                                                 }
        //                                                             } else {
        //                                                                 mizrahiTefahot.sendOshCtrl(true);
        //                                                             }
        //                                                         }
        //                                                     } else {
        //                                                         loadTablesMatah();
        //                                                     }
        //                                                 } else {
        //                                                     if (all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length) {
        //                                                         var isExist = 0;
        //                                                         $(all.banks.generalVariables.allDataArrMatah.BankData[0].Account).each(function (indexAcc, accVal) {
        //                                                             if (
        //                                                                 (accVal.BankNumber == obj.BankNumber)
        //                                                                 &&
        //                                                                 (accVal.AccountNumber == obj.AccountNumber)
        //                                                                 &&
        //                                                                 (accVal.BranchNumber == obj.BranchNumber)
        //                                                                 &&
        //                                                                 (accVal.BankAccountTypeId == obj.BankAccountTypeId)
        //                                                                 &&
        //                                                                 (accVal.CurrencyId == obj.CurrencyId)
        //                                                             ) {
        //                                                                 isExist = 1;
        //                                                                 mizrahiTefahot.indexAccMatah = indexAcc;
        //                                                             }
        //                                                             if (indexAcc + 1 == all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length) {
        //                                                                 if (isExist == 0) {
        //                                                                     all.banks.generalVariables.allDataArrMatah.BankData[0].Account.push(obj);
        //                                                                     mizrahiTefahot.indexAccMatah = (all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1);
        //                                                                     all.banks.generalVariables.allDataArrMatah.BankData[0].Account[mizrahiTefahot.indexAccMatah].DataRow = [];
        //                                                                 }
        //                                                                 loadRowsMatahAll();
        //                                                             }
        //                                                         })
        //                                                     } else {
        //                                                         all.banks.generalVariables.allDataArrMatah.BankData[0].Account.push(obj);
        //                                                         mizrahiTefahot.indexAccMatah = (all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1);
        //                                                         all.banks.generalVariables.allDataArrMatah.BankData[0].Account[mizrahiTefahot.indexAccMatah].DataRow = [];
        //                                                         loadRowsMatahAll();
        //                                                     }
        //                                                 }
        //
        //                                                 async function loadRowsMatahAll() {
        //                                                     var rowsArray = $(v).children("tbody").children("tr");
        //                                                     if (rowsArray.length) {
        //                                                         for (var i1 = 0; i1 < rowsArray.length; i1++) {
        //                                                             var td = rowsArray.eq(i1).children("td");
        //                                                             var dateVal = td.eq(0).text().replace(/\s/g, ""),
        //                                                                 dateValue = td.eq(1).text(),
        //                                                                 dateValDesc = td.eq(2).text(),
        //                                                                 dateValAsmacta = td.eq(3).text().replace(/\s/g, ""),
        //                                                                 dateValSum = td.eq(4).text().replace(/\s/g, "").replace(/,/g, ''),
        //                                                                 dateValItra = td.eq(5).text().replace(/\s/g, "").replace(/,/g, '');
        //
        //                                                             if (dateVal !== "") {
        //                                                                 var depositeTransferData = null;
        //                                                                 var indexData = td.eq(2).attr("data-index");
        //                                                                 if (indexData !== undefined) {
        //                                                                     var resData = await all.banks.core.services.httpReq("https://mto.mizrahi-tefahot.co.il/Online/Matach/swiftPopUp.aspx?indexTnua=" + indexData, 'GET', null, false, false);
        //                                                                     var swiftPopUp = all.banks.core.services.parseHtml(resData);
        //                                                                     var textValues = swiftPopUp.find("#ctl00_ContentPlaceHolder1_swiftContentDiv pre").map(function () {
        //                                                                         return $(this).text().trim();
        //                                                                     }).get().join(" ");
        //                                                                     depositeTransferData = [{
        //                                                                         "DepositeTransferDate": "",
        //                                                                         "BankTransferNumber": "",
        //                                                                         "BranchTransferNumber": "",
        //                                                                         "AccountTransferNumber": "",
        //                                                                         "NamePayerTransfer": "",
        //                                                                         "DetailsTransfer": textValues,
        //                                                                         "TransferTotal": ""
        //                                                                     }];
        //                                                                 }
        //                                                                 if (td.eq(2).children("span").length) {
        //                                                                     dateValDesc = td.eq(2).children("span").text();
        //                                                                 }
        //                                                                 all.banks.generalVariables.allDataArrMatah.BankData[0].Account[mizrahiTefahot.indexAccMatah].DataRow.push({
        //                                                                     "Asmachta": (dateValAsmacta == "") ? null : dateValAsmacta,
        //                                                                     "TransDesc": all.banks.core.services.getStringJson(dateValDesc),
        //                                                                     "ValueDate": all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(dateVal)),
        //                                                                     "TransactionType": (dateValSum.indexOf("-") !== -1) ? "0" : "1",
        //                                                                     "TransTotal": Math.abs(dateValSum),
        //                                                                     "Balance": dateValItra,
        //                                                                     "IsDaily": "0",
        //                                                                     "imgs": null,
        //                                                                     "DepositeTransferData": depositeTransferData
        //                                                                 });
        //                                                             }
        //                                                             if (rowsArray.length == i1 + 1) {
        //                                                                 if ($(v).find("thead .rgPagerCell.NextPrev .rgPageNext[title='עמוד הבא']").length) {
        //                                                                     var nameAttr = $(v).find("thead .rgPagerCell.NextPrev .rgPageNext[title='עמוד הבא']").attr("name");
        //                                                                     $.when(mizrahiTefahot.loadMatahNextTable(res, dateFrom, monthFrom, yearFrom, dateTo, monthTo, yearTo, isFirst, valOptGr, nameAttr, childrenId, idParent))
        //                                                                         .then(function () {
        //                                                                             res.find('.rgMasterTable').eq(i).remove();
        //                                                                             if (res.find('.rgMasterTable').length == 0) {
        //                                                                                 if (yearFromLast !== yearToLast && (yearTo !== yearToLast)) {
        //                                                                                     loadMatahRows("01", "01", yearToLast, dateToLast, monthToLast, yearToLast);
        //                                                                                 } else {
        //                                                                                     if (mizrahiTefahot.numberOfOptions > 1) {
        //                                                                                         if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
        //                                                                                             mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
        //                                                                                             mizrahiTefahot.changBankAccMatah(mizrahiTefahot.ind)
        //                                                                                         } else {
        //                                                                                             mizrahiTefahot.sendOshCtrl(true);
        //                                                                                         }
        //                                                                                     } else {
        //                                                                                         mizrahiTefahot.sendOshCtrl(true);
        //                                                                                     }
        //                                                                                 }
        //                                                                             } else {
        //                                                                                 loadTablesMatah();
        //                                                                             }
        //                                                                         });
        //                                                                 } else {
        //                                                                     res.find('.rgMasterTable').eq(i).remove();
        //                                                                     if (res.find('.rgMasterTable').length == 0) {
        //                                                                         if (yearFromLast !== yearToLast && (yearTo !== yearToLast)) {
        //                                                                             loadMatahRows("01", "01", yearToLast, dateToLast, monthToLast, yearToLast);
        //                                                                         } else {
        //                                                                             if (mizrahiTefahot.numberOfOptions > 1) {
        //                                                                                 if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
        //                                                                                     mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
        //                                                                                     mizrahiTefahot.changBankAccMatah(mizrahiTefahot.ind)
        //                                                                                 } else {
        //                                                                                     mizrahiTefahot.sendOshCtrl(true);
        //                                                                                 }
        //                                                                             } else {
        //                                                                                 mizrahiTefahot.sendOshCtrl(true);
        //                                                                             }
        //                                                                         }
        //                                                                     } else {
        //                                                                         loadTablesMatah();
        //                                                                     }
        //                                                                 }
        //                                                             }
        //                                                         }
        //                                                     }
        //                                                 }
        //
        //                                                 return false;
        //                                             })
        //                                         }
        //
        //                                         loadTablesMatah();
        //                                     } else {
        //                                         if (yearFromLast !== yearToLast && (yearTo !== yearToLast)) {
        //                                             loadMatahRows("01", "01", yearToLast, dateToLast, monthToLast, yearToLast);
        //                                         } else {
        //                                             if (mizrahiTefahot.numberOfOptions > 1) {
        //                                                 if (mizrahiTefahot.ind < (mizrahiTefahot.numberOfOptions - 1)) {
        //                                                     mizrahiTefahot.ind = mizrahiTefahot.ind + 1;
        //                                                     mizrahiTefahot.changBankAccMatah(mizrahiTefahot.ind);
        //                                                 } else {
        //                                                     mizrahiTefahot.sendOshCtrl(true);
        //                                                 }
        //                                             } else {
        //                                                 mizrahiTefahot.sendOshCtrl(true);
        //                                             }
        //                                         }
        //                                     }
        //                                 })
        //                                 .fail(function (error, resErr, urlParam) {
        //                                     var logErr = "restUrl: " + urlParam + ", status: " + error.status;
        //                                     all.banks.core.services.errorLog(logErr)
        //                                 });
        //                         }
        //
        //                         if (yearFromLast !== yearToLast) {
        //                             loadMatahRows(dateFromLast, monthFromLast, yearFromLast, "31", "12", yearFromLast, true);
        //                         } else {
        //                             loadMatahRows(dateFromLast, monthFromLast, yearFromLast, dateToLast, monthToLast, yearFromLast, true);
        //                         }
        //
        //                         // 	return false;
        //                         // });
        //                         //	}
        //
        //                         // loadFromGroup();
        //                         function getTypeGroup(text) {
        //                             var type = null;
        //                             $(arrayGroup).each(function (i, v) {
        //                                 if (v.text.indexOf(text) !== -1) {
        //                                     type = v.val;
        //                                     return false;
        //                                 }
        //                             });
        //
        //                             if (type === null) {
        //                                 if (text && 'עו"ש מטבע לא סחיר' === text.trim()) {
        //                                     return '9001';
        //                                 }
        //                             }
        //                             return type;
        //                         }
        //                     } catch (err) {
        //                         all.banks.core.services.errorLog(err)
        //                     }
        //                 })
        //                 .fail(function (error, resErr, urlParam) {
        //                     var logErr = "restUrl: " + urlParam + ", status: " + error.status;
        //                     all.banks.core.services.errorLog(logErr);
        //                 });
        //         }
        //     })
    }
    mizrahiTefahot.loadMatahNextTable = function (data, dateFrom, monthFrom, yearFrom, dateTo, monthTo, yearTo, isFirst, valOptGr, nameAttr, childrenId, idParent) {
        var dfd = jQuery.Deferred();

        function loadRowsNext(data, dateFrom, monthFrom, yearFrom, dateTo, monthTo, yearTo, isFirst, valOptGr, nameAttr, childrenId, moreNext) {
            if (moreNext !== undefined) {
                var post = {
                    "ctl00$radScriptManager": moreNext.split("panelsToRefreshIDs")[1].split("||")[1].split(",")[0] + "|" + nameAttr,
                    "ctl00_radScriptManager_TSM": ";;Telerik.Web.UI, Version=2013.2.717.40, Culture=neutral, PublicKeyToken=121fae78165ba3d4:en-US:0507d587-20ad-4e22-b866-76bd3eaee2df:16e4e7cd:ed16cbdc:365331c3:7c926187:8674cba1:b7778d6c:c08e9f8a:59462f1:a51ee93e:58366029;",
                    "ctl00_RadStyleSheetManager_TSSM": "",
                    "ctl00$ContentPlaceHolder2$ddlSugMatbeha": "00",
                    "ctl00$ContentPlaceHolder2$ddlKvutza": valOptGr,
                    "ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker1ID$radDatePickerID": yearFrom + "-" + monthFrom + "-" + dateFrom,
                    "ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker1ID$radDatePickerID$dateInput": dateFrom + "/" + monthFrom + "/" + yearFrom,
                    "ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_dateInput_ClientState": {
                        "enabled": true,
                        "emptyMessage": "",
                        "validationText": yearFrom + '-' + monthFrom + '-' + dateFrom + '-00-00-00',
                        "valueAsString": yearFrom + '-' + monthFrom + '-' + dateFrom + '-00-00-00',
                        "minDateStr": "1980-01-01-00-00-00",
                        "maxDateStr": "2099-12-31-00-00-00",
                        "lastSetTextBoxValue": dateFrom + '/' + monthFrom + '/' + yearFrom
                    },
                    "ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_calendar_SD": [[yearFrom, parseFloat(monthFrom), parseFloat(dateFrom)]],
                    "ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_calendar_AD": [[1980, 1, 1], [2099, 12, 31], [yearFrom, parseFloat(monthFrom), parseFloat(dateFrom)]],
                    "ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_ClientState": "",
                    "ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker2ID$radDatePickerID": yearTo + "-" + monthTo + "-" + dateTo,
                    "ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker2ID$radDatePickerID$dateInput": dateTo + "/" + monthTo + "/" + yearTo,
                    "ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_dateInput_ClientState": {
                        "enabled": true,
                        "emptyMessage": "",
                        "validationText": yearTo + '-' + monthTo + '-' + dateTo + '-00-00-00',
                        "valueAsString": yearTo + '-' + monthTo + '-' + dateTo + '-00-00-00',
                        "minDateStr": "1980-01-01-00-00-00",
                        "maxDateStr": "2099-12-31-00-00-00",
                        "lastSetTextBoxValue": dateTo + '/' + monthTo + '/' + yearTo
                    },
                    "ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_calendar_SD": [],
                    "ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_calendar_AD": [[1980, 1, 1], [2099, 12, 31], [yearTo, parseFloat(monthTo), parseFloat(dateTo)]],
                    "ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_ClientState": "",
                    "ctl00_ContentPlaceHolder2_Repeater1_ctl00_grvPeulot_ClientState": "",
                    "ctl00_ContentPlaceHolder2_Repeater1_ctl01_grvPeulot_ClientState": "",
                    "ctl00_ContentPlaceHolder2_Repeater1_ctl02_grvPeulot_ClientState": "",
                    "ctl00_ContentPlaceHolder2_Repeater1_ctl03_grvPeulot_ClientState": "",
                    "ctl00_ContentPlaceHolder2_Repeater1_ctl04_grvPeulot_ClientState": "",
                    "ctl00_ContentPlaceHolder2_Repeater1_ctl05_grvPeulot_ClientState": "",
                    "ctl00_ContentPlaceHolder2_Repeater1_ctl06_grvPeulot_ClientState": "",
                    "ctl00_ContentPlaceHolder2_Repeater1_ctl07_grvPeulot_ClientState": "",
                    "ctl00_ContentPlaceHolder2_Repeater1_ctl08_grvPeulot_ClientState": "",
                    "ctl00_ContentPlaceHolder2_Repeater1_ctl09_grvPeulot_ClientState": "",
                    "ctl00$hdnLinkToExternalSite": "קישור לאתר חיצוני",
                    "__EVENTTARGET": nameAttr,
                    "__EVENTARGUMENT": "",
                    "__VIEWSTATE": moreNext.split("__VIEWSTATE")[1].split("|")[1],
                    "__VIEWSTATEGENERATOR": moreNext.split("__VIEWSTATEGENERATOR")[1].split("|")[1],
                    "__VIEWSTATEENCRYPTED": "",
                    "__EVENTVALIDATION": moreNext.split("__EVENTVALIDATION")[1].split("|")[1],
                    "__ASYNCPOST": "true",
                    "RadAJAXControlID": "ctl00_ContentPlaceHolder2_PageAjaxManager",
                    "RadAJAXControlID": childrenId
                }
            } else {
                var post = {
                    'ctl00_radScriptManager_TSM': '',
                    'ctl00_RadStyleSheetManager_TSSM': '',
                    '__EVENTTARGET': $(data).find('input[name="__EVENTTARGET"]').val(),
                    '__EVENTARGUMENT': $(data).find('input[name="__EVENTARGUMENT"]').val(),
                    '__VIEWSTATE': $(data).find('input[name="__VIEWSTATE"]').val(),
                    '__VIEWSTATEGENERATOR': $(data).find('input[name="__VIEWSTATEGENERATOR"]').val(),
                    '__VIEWSTATEENCRYPTED': $(data).find('input[name="__VIEWSTATEENCRYPTED"]').val(),
                    '__EVENTVALIDATION': $(data).find('input[name="__EVENTVALIDATION"]').val(),
                    'ctl00$ContentPlaceHolder2$ddlSugMatbeha': '00',
                    'ctl00$ContentPlaceHolder2$ddlKvutza': valOptGr,
                    'ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker1ID$radDatePickerID': yearFrom + "-" + monthFrom + "-" + dateFrom,
                    'ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker1ID$radDatePickerID$dateInput': dateFrom + "/" + monthFrom + "/" + yearFrom,
                    'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_dateInput_ClientState': '{"enabled":true,"emptyMessage":"","validationText":"' + yearFrom + '-' + monthFrom + '-' + dateFrom + '-00-00-00","valueAsString":"' + yearFrom + '-' + monthFrom + '-' + dateFrom + '-00-00-00","minDateStr":"1980-01-01-00-00-00","maxDateStr":"2099-12-31-00-00-00","lastSetTextBoxValue":"' + dateFrom + '/' + monthFrom + '/' + yearFrom + '"}',
                    'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_calendar_SD': '[[' + yearFrom + ',' + parseFloat(monthFrom) + ',' + parseFloat(dateFrom) + ']]',
                    'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_calendar_AD': '[[1980,1,1],[2099,12,31],[' + yearFrom + ',' + parseFloat(monthFrom) + ',' + parseFloat(dateFrom) + ']]',
                    'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker1ID_radDatePickerID_ClientState': '',
                    'ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker2ID$radDatePickerID': yearTo + "-" + monthTo + "-" + dateTo,
                    'ctl00$ContentPlaceHolder2$SkyDateRangePicker1$SkyDatePicker2ID$radDatePickerID$dateInput': dateTo + "/" + monthTo + "/" + yearTo,
                    'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_dateInput_ClientState': '{"enabled":true,"emptyMessage":"","validationText":"' + yearTo + '-' + monthTo + '-' + dateTo + '-00-00-00","valueAsString":"' + yearTo + '-' + monthTo + '-' + dateTo + '-00-00-00","minDateStr":"1980-01-01-00-00-00","maxDateStr":"2099-12-31-00-00-00","lastSetTextBoxValue":"' + dateTo + '/' + monthTo + '/' + yearTo + '"}',
                    'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_calendar_SD': '[]',
                    'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_calendar_AD': '[[1980,1,1],[2099,12,31],[' + yearTo + ',' + parseFloat(monthTo) + ',' + parseFloat(dateTo) + ']]',
                    'ctl00_ContentPlaceHolder2_SkyDateRangePicker1_SkyDatePicker2ID_radDatePickerID_ClientState': '',
                    'ctl00$ContentPlaceHolder2$btnShow': 'הצג',
                    'ctl00$hdnLinkToExternalSite': 'קישור לאתר חיצוני',
                    'ctl00$radScriptManager': idParent.replace(/_/g, '$') + '|' + nameAttr,
                    '__ASYNCPOST': 'true',
                    'RadAJAXControlID': childrenId
                };
                post[nameAttr] = "";
                post["ctl00_ContentPlaceHolder2_Repeater1_ctl00_grvPeulot_ClientState"] = "";
                post["ctl00_ContentPlaceHolder2_Repeater1_ctl01_grvPeulot_ClientState"] = "";
                post["ctl00_ContentPlaceHolder2_Repeater1_ctl02_grvPeulot_ClientState"] = "";
                post["ctl00_ContentPlaceHolder2_Repeater1_ctl03_grvPeulot_ClientState"] = "";
                post["ctl00_ContentPlaceHolder2_Repeater1_ctl04_grvPeulot_ClientState"] = "";
                post["ctl00_ContentPlaceHolder2_Repeater1_ctl05_grvPeulot_ClientState"] = "";
                post["ctl00_ContentPlaceHolder2_Repeater1_ctl06_grvPeulot_ClientState"] = "";
                post["ctl00_ContentPlaceHolder2_Repeater1_ctl07_grvPeulot_ClientState"] = "";
                post["ctl00_ContentPlaceHolder2_Repeater1_ctl08_grvPeulot_ClientState"] = "";
                post["ctl00_ContentPlaceHolder2_Repeater1_ctl09_grvPeulot_ClientState"] = "";
            }

            var url = "https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/Matach/p403.aspx";
            mizrahiTefahot.sender(url, "POST", post, true)
                .then(function (response) {
                    debugger
                    var htmlPage = "<html><body>" + response + "</body></html>";
                    var res = all.banks.core.services.parseHtml(htmlPage);
                    response = null;
                    if (res.find('.rgMasterTable').length) {
                        async function loadrows() {
                            var rgMasterTable = res.find('.rgMasterTable');
                            for (var i = 0; i < rgMasterTable.length; i++) {
                                var v = rgMasterTable.eq(i).children("tbody").children("tr");
                                for (var i1 = 0; i1 < v.length; i1++) {
                                    var td = v.eq(i1).children("td");
                                    var dateVal = td.eq(0).text().replace(/\s/g, ""),
                                        dateValue = td.eq(1).text(),
                                        dateValDesc = td.eq(2).text(),
                                        dateValAsmacta = td.eq(3).text().replace(/\s/g, ""),
                                        dateValSum = td.eq(4).text().replace(/\s/g, "").replace(/,/g, ''),
                                        dateValItra = td.eq(5).text().replace(/\s/g, "").replace(/,/g, '');

                                    if (dateVal !== "") {
                                        var depositeTransferData = null;
                                        var indexData = td.eq(2).attr("data-index");
                                        if (indexData !== undefined) {
                                            var resData = await mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/Matach/swiftPopUp.aspx?indexTnua=" + indexData, "GET");
                                            var swiftPopUp = all.banks.core.services.parseHtml(resData);
                                            var textValues = swiftPopUp.find("#ctl00_ContentPlaceHolder1_swiftContentDiv pre").map(function () {
                                                return $(this).text().trim();
                                            }).get().join(" ");
                                            depositeTransferData = [{
                                                "DepositeTransferDate": "",
                                                "BankTransferNumber": "",
                                                "BranchTransferNumber": "",
                                                "AccountTransferNumber": "",
                                                "NamePayerTransfer": "",
                                                "DetailsTransfer": textValues,
                                                "TransferTotal": ""
                                            }];
                                        }
                                        if (td.eq(2).children("span").length) {
                                            dateValDesc = td.eq(2).children("span").text();
                                        }
                                        all.banks.generalVariables.allDataArrMatah.BankData[0].Account[mizrahiTefahot.indexAccMatah].DataRow.push({
                                            "Asmachta": (dateValAsmacta == "") ? null : dateValAsmacta,
                                            "TransDesc": all.banks.core.services.getStringJson(dateValDesc),
                                            "ValueDate": all.banks.core.services.convertDateAll(mizrahiTefahot.convertDateLocal(dateVal)),
                                            "TransactionType": (dateValSum.indexOf("-") !== -1) ? "0" : "1",
                                            "TransTotal": Math.abs(dateValSum),
                                            "Balance": dateValItra,
                                            "IsDaily": "0",
                                            "imgs": null,
                                            "DepositeTransferData": depositeTransferData
                                        });
                                    }
                                    if (v.length == i1 + 1) {
                                        var clickEv = rgMasterTable.eq(i).find(".rgWrap.rgArrPart1 [title='עמוד הבא']");
                                        if (clickEv.length && clickEv.attr("onclick") !== undefined && clickEv.attr("onclick").indexOf("false") == -1) {
                                            var nameAttr = clickEv.attr("name");
                                            loadRowsNext(res, dateFrom, monthFrom, yearFrom, dateTo, monthTo, yearTo, isFirst, valOptGr, nameAttr, childrenId, htmlPage);
                                        } else {
                                            dfd.resolve(true);
                                        }
                                    }
                                }
                            }
                        }

                        loadrows();

                    } else {
                        dfd.resolve(true);
                    }
                })
                .fail(function (error, resErr, urlParam) {
                    dfd.resolve(true);
                });
        }

        loadRowsNext(data, dateFrom, monthFrom, yearFrom, dateTo, monthTo, yearTo, isFirst, valOptGr, nameAttr, childrenId);

        return dfd.promise();
    }
    mizrahiTefahot.logOff = function (logOutWithoutLog) {
        clearInterval(mizrahiTefahot.intervals);
        clearInterval(mizrahiTefahot.intervalsIsAlive);

        if (mizrahiTefahot.xsrfToken !== undefined) {
            mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/api/newGE/endSession", "POST", {"fromExitLink": true})
                .done(function () {
                    mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/Online/api/newGE/keepAlive", "POST", {})
                        .done(function () {
                            logOutFin()
                        })
                })
        } else {
            logOutFin()
        }

        function logOutFin() {
            mizrahiTefahot.sender("https://mto.mizrahi-tefahot.co.il/" + mizrahiTefahot.urlPattern + "/logout.htm?v=" + new Date().getTime(), "GET")
                .then(function () {
                    all.banks.core.services.httpReq("https://www.mizrahi-tefahot.co.il/he/Bank/Pages/Default.aspx", 'GET', null, false, false);
                    try {
                        writeLog("killVpn");
                        monitorVpn.killVpn(() => {
                            if (!logOutWithoutLog) {
                                // $('#filecontainerlogin').attr('src', '');
                                myEmitterLogs(25);
                            }
                        });
                        // clearProxy().then(() => {
                        //     if (!logOutWithoutLog) {
                        //         // $('#filecontainerlogin').attr('src', '');
                        //         myEmitterLogs(25);
                        //     }
                        // })
                    } catch (err) {
                        all.banks.core.services.errorLog(err)
                    }
                })
        }

    };

    mizrahiTefahot.isErrorOrNotAvailableMessage = function (message) {
        if (!message) {
            return false;
        }

        return ['לא קיימים', 'לא ניתן', 'שירות אינו זמין' //,
//                    'אין מידע להצגה'
        ].some(part => message.includes(part));
    };

    mizrahiTefahot.replaceCycleDateIfPresent = function (table, dataMonthlyCycle) {
        const columnIndex = table.find('thead > tr > th:contains("תאריך חיוב")').index() + 1;
        if (columnIndex > 0) {
            table.find('tbody > tr > td:nth-child(' + columnIndex + '):not(:empty)').each((idx, val) => {
                const tdText = $(val).text().trim();
                if (/[\d\/]+/.test(tdText)) {
                    dataMonthlyCycle.NextBillingDate = tdText.split('/')
                        .map((part, idx) => idx === 2 ? '20' + part : part)
                        .join('/');
                    dataMonthlyCycle.indFake = 0;
                    return false;
                }
            });
        }
        return columnIndex > 0 ? columnIndex : undefined;
    };

    return mizrahiTefahot;
}();
