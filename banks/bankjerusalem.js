//test23/03
class bankjerusalem {
    constructor() {
        this.cookies = "";
        this.param = "";
    }

    httpPost(...args) {
        const usernameProxy = 'brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob' + all.banks.accountDetails.bank.token.replace(/-/g, '');
        monitorActivityClass.setIntervalActivity();
        let [url, Referer, cookie, body] = args;
        writeLog("httpPost: " + url);
        return new Promise((resolve, reject) => {
            var options = {
                uri: url,
                family: 4,
                timeout: 40000,
                form: body,
                method: "POST",
                body: "POST",
                headers: {
                    'Upgrade-Insecure-Requests': "1",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Host": "services.bankjerusalem.co.il",
                    "Origin": "https://services.bankjerusalem.co.il",
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
                }
            };
            if (window.navigator.platform.indexOf('Win') === -1) {
                options['proxy'] = 'http://' + usernameProxy + ':h0mi0yvib3to@zproxy.lum-superproxy.io:22225';
            }
            if (cookie !== null) {
                options.headers.Cookie = cookie;
            }
            if (Referer !== null) {
                options.headers.Referer = Referer;
            }
            senderReq.sendersServer(options, (error, response, data) => {
                if (response !== undefined && response.headers !== undefined && response.headers["set-cookie"]) {
                    this.getSetCookies(response.headers["set-cookie"])
                        .then((res) => {
                            resolve([error, response, data]);
                        });
                } else {
                    resolve([error, response, data]);
                }
            });
        });
    }

    httpPostSoap() {
        const usernameProxy = 'brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob' + all.banks.accountDetails.bank.token.replace(/-/g, '');
        monitorActivityClass.setIntervalActivity();
        return new Promise((resolve, reject) => {
            var options = {
                uri: "https://services.bankjerusalem.co.il/_vti_bin/sites.asmx",
                family: 4,
                timeout: 40000,
                method: "POST",
                body: '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">  <soap:Body>    <GetUpdatedFormDigest xmlns="http://schemas.microsoft.com/sharepoint/soap/" />  </soap:Body></soap:Envelope>',
                headers: {
                    'SOAPAction': "http://schemas.microsoft.com/sharepoint/soap/GetUpdatedFormDigest",
                    "Content-Type": "text/xml",
                    'X-TS-AJAX-Request': "true",
                    "Host": "services.bankjerusalem.co.il",
                    "Origin": "https://services.bankjerusalem.co.il",
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
                }
            };
            if (window.navigator.platform.indexOf('Win') === -1) {
                options['proxy'] = 'http://' + usernameProxy + ':h0mi0yvib3to@zproxy.lum-superproxy.io:22225';
            }
            if (this.cookies !== null) {
                options.headers.Cookie = this.cookies;
            }
            senderReq.sendersServer(options, (error, response, data) => {
                if (response !== undefined && response.headers !== undefined && response.headers["set-cookie"]) {
                    this.getSetCookies(response.headers["set-cookie"])
                        .then((res) => {
                            resolve([error, response, data]);
                        });
                } else {
                    resolve([error, response, data]);
                }
            });
        });
    }

    httpPostSoapOsh() {
        const usernameProxy = 'brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob' + all.banks.accountDetails.bank.token.replace(/-/g, '');
        monitorActivityClass.setIntervalActivity();
        return new Promise((resolve, reject) => {
            var options = {
                uri: "https://services.bankjerusalem.co.il/currentaccount/_vti_bin/sites.asmx",
                family: 4,
                timeout: 40000,
                method: "POST",
                body: '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">  <soap:Body>    <GetUpdatedFormDigest xmlns="http://schemas.microsoft.com/sharepoint/soap/" />  </soap:Body></soap:Envelope>',
                headers: {
                    'Referer': 'https://services.bankjerusalem.co.il/currentaccount/pages/current.aspx',
                    'SOAPAction': "http://schemas.microsoft.com/sharepoint/soap/GetUpdatedFormDigest",
                    "Content-Type": "text/xml",
                    'X-TS-AJAX-Request': "true",
                    "Host": "services.bankjerusalem.co.il",
                    "Origin": "https://services.bankjerusalem.co.il",
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
                }
            };
            if (window.navigator.platform.indexOf('Win') === -1) {
                options['proxy'] = 'http://' + usernameProxy + ':h0mi0yvib3to@zproxy.lum-superproxy.io:22225';
            }
            if (this.cookies !== null) {
                options.headers.Cookie = this.cookies;
            }
            senderReq.sendersServer(options, (error, response, data) => {
                if (response !== undefined && response.headers !== undefined && response.headers["set-cookie"]) {
                    this.getSetCookies(response.headers["set-cookie"])
                        .then((res) => {
                            resolve([error, response, data]);
                        });
                } else {
                    resolve([error, response, data]);
                }
            });
        });
    }

    httpPostSoapCredit() {
        const usernameProxy = 'brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob' + all.banks.accountDetails.bank.token.replace(/-/g, '');
        monitorActivityClass.setIntervalActivity();
        return new Promise((resolve, reject) => {
            var options = {
                uri: "https://services.bankjerusalem.co.il/credit/_vti_bin/sites.asmx",
                family: 4,
                timeout: 40000,
                method: "POST",
                body: '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">  <soap:Body>    <GetUpdatedFormDigest xmlns="http://schemas.microsoft.com/sharepoint/soap/" />  </soap:Body></soap:Envelope>',
                headers: {
                    'Referer': 'https://services.bankjerusalem.co.il/credit/pages/credit-card.aspx',
                    'SOAPAction': "http://schemas.microsoft.com/sharepoint/soap/GetUpdatedFormDigest",
                    "Content-Type": "text/xml",
                    'X-TS-AJAX-Request': "true",
                    "Host": "services.bankjerusalem.co.il",
                    "Origin": "https://services.bankjerusalem.co.il",
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
                }
            };
            if (window.navigator.platform.indexOf('Win') === -1) {
                options['proxy'] = 'http://' + usernameProxy + ':h0mi0yvib3to@zproxy.lum-superproxy.io:22225';
            }
            if (this.cookies !== null) {
                options.headers.Cookie = this.cookies;
            }
            senderReq.sendersServer(options, (error, response, data) => {
                if (response !== undefined && response.headers !== undefined && response.headers["set-cookie"]) {
                    this.getSetCookies(response.headers["set-cookie"])
                        .then((res) => {
                            resolve([error, response, data]);
                        });
                } else {
                    resolve([error, response, data]);
                }
            });
        });
    }

    httpGet(...args) {
        const usernameProxy = 'brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob' + all.banks.accountDetails.bank.token.replace(/-/g, '');
        let [url, Referer, cookie] = args;
        monitorActivityClass.setIntervalActivity();
        writeLog("httpGet: " + url);
        return new Promise((resolve, reject) => {
            let options = {
                "uri": url,
                "family": 4,
                "method": "GET",
                "timeout": 40000,
                "headers": {
                    "Connection": "keep-alive",
                    'Upgrade-Insecure-Requests': "1",
                    "Host": "services.bankjerusalem.co.il",
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
                }
            }
            if (window.navigator.platform.indexOf('Win') === -1) {
                options['proxy'] = 'http://' + usernameProxy + ':h0mi0yvib3to@zproxy.lum-superproxy.io:22225';
            }
            if (cookie !== null) {
                options.headers.Cookie = cookie;
            }
            if (Referer !== null) {
                options.headers.Referer = Referer;
            }
            senderReq.sendersServer(options, (error, response, data) => {
                if (response !== undefined && response.headers !== undefined && response.headers["set-cookie"]) {
                    this.getSetCookies(response.headers["set-cookie"])
                        .then((res) => {
                            resolve([error, response, data]);
                        });
                } else {
                    resolve([error, response, data]);
                }
            });
        });
    }

    getSetCookies(cookie) {
        return new Promise((resolve, reject) => {
            try {
                var cookSplit = this.cookies.split(";");
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
                                        cookSplit[i1] = v.split(";")[0] + ";"
                                    }
                                }
                            }
                        }
                        if (exist === 0) {
                            cookSplit.unshift(cookie[i].split(";")[0])
                        }
                        if (len === i + 1) {
                            //console.log(cookSplit);
                            this.cookies = cookSplit.join(";");
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

    sendChecksCtrl(formData) {
        return new Promise((resolve, reject) => {
            function sender(formData) {
                all.banks.core.services.sendChecks(formData)
                    .then((arr) => {
                        all.banks.generalVariables.numChecksDrawn = all.banks.generalVariables.numChecksDrawn + 1;
                        resolve(true);
                    })
                    .fail((error, resErr) => {
                        if (error == 'discard') {
                            sender(formData);
                        }
                    });
            }

            sender(formData);
        })
    }

    sendOshCtrl(urls) {
        all.banks.core.services.sendOsh(all.banks.generalVariables.allDataArr)
            .then((arr) => {
                if (all.banks.accountDetails.ccardMonth > 0) {
                    this.getCards(urls);
                } else if (all.banks.accountDetails.IND_NILVIM > 0) {
                    this.getLoans(urls);
                } else {
                    this.logout();
                }
            })
            .fail((error, resErr) => {
                if (error == 'discard') {
                    this.sendOshCtrl(urls);
                }
            });
    }

    sendCardsCtrl(urls) {
        if (all.banks.generalVariables.allDataArrAshrai && all.banks.generalVariables.allDataArrAshrai.length) {
            all.banks.core.services.sendCards(all.banks.generalVariables.allDataArrAshrai)
                .then((arr) => {
                    if (all.banks.accountDetails.IND_NILVIM > 0) {
                        this.getLoans(urls);
                    } else {
                        this.logout();
                    }
                })
                .fail((error, resErr) => {
                    if (error == 'discard') {
                        this.sendCardsCtrl();
                    }
                });
        } else {
            this.logout();
        }
    }

    sendLoanCtrl = function (data) {
        if (all.banks.generalVariables.allDataArrLoan && all.banks.generalVariables.allDataArrLoan.length) {
            all.banks.core.services.sendLoan(all.banks.generalVariables.allDataArrLoan)
                .then((arr) => {
                    this.logout();
                })
                .fail((error, resErr) => {
                    if (error == 'discard') {
                        this.sendLoanCtrl();
                    }
                });
        } else {
            this.logout();
        }
    };

    async login() {
        try {
            writeLog("login");
            if (all.banks.openBankPage) {
                // await setProxy();
                $('#filecontainerloginWithUpdatedUserAgent').attr('src', 'https://services.bankjerusalem.co.il/Pages/Login.aspx');
                let times = 1;
                const checker = setInterval(() => {
                    monitorActivityClass.setIntervalActivity();
                    const currentContent = $('#filecontainerloginWithUpdatedUserAgent').contents();
                    if (currentContent.find('input#txtUsername').length) {
                        writeLog("login currentContent.find('input#txtUsername').length");
                        clearInterval(checker);
                        currentContent.find('input#txtUsername').val(all.banks.accountDetails.bank.username.slice(0, 15));
                        currentContent.find('input#txtPassword').val(all.banks.accountDetails.bank.password.slice(0, 30));

                        setTimeout(() => {
                            currentContent.find('#btnConnect').click();

                            setTimeout(() => {
                                $('#filecontainerloginWithUpdatedUserAgent').show();
                                $('html, body').animate({scrollTop: 1000}, 1000);
                                const checker_lnkBtnNotNow = setInterval(() => {
                                    const currentContentNew = $('#filecontainerloginWithUpdatedUserAgent').contents();
                                    if (currentContentNew.find('#lnkBtnNotNow').length) {
                                        clearInterval(checker_lnkBtnNotNow);
                                        currentContentNew.find('#lnkBtnNotNow').click();
                                    }
                                    if (currentContentNew.find('#HPCurrentAccountZone').length) {
                                        clearInterval(checker_lnkBtnNotNow);
                                    }
                                }, 2000);

                                setInterval(() => monitorActivityClass.setIntervalActivity(), 20000)
                                // #lnkBtnNotNow
                            }, 2000)
                        }, 1000)
                    } else if (times++ > 60) {
                        writeLog("login !currentContent.find('input#txtUsername').length");
                        $('#filecontainerloginWithUpdatedUserAgent').attr('src', '');
                        clearInterval(checker);
                        this.logout();
                    }
                }, 5000);
                return;
            }

            var args = await this.httpGet(
                "https://services.bankjerusalem.co.il/Pages/Login.aspx",
                "https://www.bankjerusalem.co.il/",
                null
            );

            var [error, response, data] = [...args];
            await this.httpPostSoap();
            var dataRes = all.banks.core.services.parseHtml(data);
            var serializeForm = dataRes.find("form").serializeArray();
            var obj = {};
            serializeForm.forEach((vals) => {
                obj[vals.name] = vals.value;
            });
            obj["ctl00$SPWebPartManager1$g_73540c81_e46c_4848_b6a2_d0f6d3aaf466$ctl00$btnConnect"] = "התחבר";
            obj["ctl00$SPWebPartManager1$g_73540c81_e46c_4848_b6a2_d0f6d3aaf466$ctl00$txtUsername"] = all.banks.accountDetails.bank.username.slice(0, 15);
            obj["ctl00$SPWebPartManager1$g_73540c81_e46c_4848_b6a2_d0f6d3aaf466$ctl00$txtPassword"] = all.banks.accountDetails.bank.password.slice(0, 30);
            // console.log(obj);
            var args = await this.httpPost(
                "https://services.bankjerusalem.co.il/Pages/Login.aspx",
                "https://services.bankjerusalem.co.il/Pages/Login.aspx",
                this.cookies,
                obj
            );
            var [error, response, data] = [...args];
            if (data) {
                var dataRes = all.banks.core.services.parseHtml(data);
                let lblServerErrorMessage = dataRes.find("#lblServerErrorMessage");
                if (lblServerErrorMessage.length && lblServerErrorMessage.text().includes('פעיל במערכת')) {
                    myEmitterLogs(5);
                    return;
                } else if (lblServerErrorMessage.length && lblServerErrorMessage.text().includes('שגוי')) {
                    myEmitterLogs(5);
                    return;
                }
            }

            var rid = response.headers.location;
            if (rid === undefined) {
                myEmitterLogs(5);
                return;
            } else if (rid.includes('/Pages/ChangePasswordNew.aspx')) {
                var urls = `https://services.bankjerusalem.co.il${rid}`;
                var args = await this.httpGet(
                    urls,
                    "https://services.bankjerusalem.co.il/Pages/Login.aspx",
                    this.cookies
                );
                var [error, response, data] = [...args];
                var dataRes = all.banks.core.services.parseHtml(data);
                if (dataRes.find(".subTitle").length && dataRes.find(".subTitle").text().includes('פג')) {
                    myEmitterLogs(6);
                    return;
                }

                var serializeForm = dataRes.find("form").serializeArray();
                var obj = {};
                serializeForm.forEach((vals) => {
                    obj[vals.name] = vals.value;
                });
                obj["__EVENTTARGET"] = dataRes.find('#lnkBtnNotNow').attr('href').split("('")[1].split("',")[0];
                this.params = obj;
                await this.httpPostSoap();
                var args = await this.httpPost(
                    urls,
                    urls,
                    this.cookies,
                    obj
                );
                var [error, response, data] = [...args];
                var args = await this.httpGet(
                    "https://services.bankjerusalem.co.il/Pages/Trans.aspx",
                    "https://services.bankjerusalem.co.il/Pages/ChangePasswordNew.aspx",
                    this.cookies
                );
                var [error, response, data] = [...args];
                var dataRes = all.banks.core.services.parseHtml(data);
                var serializeForm = dataRes.find("form").serializeArray();
                var obj = {};
                serializeForm.forEach((vals) => {
                    obj[vals.name] = vals.value;
                });
                this.params = obj;
                if (!all.banks.openBankPage) {
                    if (dataRes.find("select[name='ctl00$PlaceHolderMain$AccountsDDL$ddlAccounts'] option").length) {
                        if (all.banks.accountDetails.deleted_account_ids.length) {
                            dataRes.find("select[name='ctl00$PlaceHolderMain$AccountsDDL$ddlAccounts'] option").each((idx, child) => {
                                const numberAcc = child.text.match(/(\d+)[\-](\d+)/g);
                                if (numberAcc) {
                                    var accNumber = numberAcc[0].split("-");
                                    var accountNumber = accNumber[1];
                                    if (all.banks.accountDetails.deleted_account_ids.some(it => accountNumber.includes(it.toString()))) {
                                        $(child).remove();
                                    }
                                }
                            });
                        }
                        this.accSelect = dataRes.find("select[name='ctl00$PlaceHolderMain$AccountsDDL$ddlAccounts'] option");
                    } else {
                        this.accSelect = dataRes.find("#ctl00_PlaceHolderMain_AccountsDDL_lblAccountDetails").text();
                    }
                    all.banks.generalVariables.allDataArrAshrai = [];
                    all.banks.generalVariables.allDataArrLoan = [];
                    if (all.banks.accountDetails.days > 0 || all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                        if (all.banks.accountDetails.days >= all.banks.accountDetails.MATAH_DAY_TO_RUN) {
                            this.dateFrom = ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2) + '.' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '.' + all.banks.accountDetails.dateFrom.getFullYear().toString();
                            this.dateTo = ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2) + '.' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '.' + all.banks.accountDetails.dateTo.getFullYear().toString();
                        }
                        if (all.banks.accountDetails.MATAH_DAY_TO_RUN >= all.banks.accountDetails.days) {
                            this.dateFrom = ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2) + '.' + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + '.' + all.banks.accountDetails.dateFromMatah.getFullYear().toString();
                            this.dateTo = ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2) + '.' + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + '.' + all.banks.accountDetails.dateToMatah.getFullYear().toString();
                        }
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
                        };
                        this.getOsh(urls);
                    } else if (all.banks.accountDetails.ccardMonth > 0) {
                        all.banks.generalVariables.allDataArrAshrai = [];
                        this.getCards(urls);
                    } else if (all.banks.accountDetails.IND_NILVIM > 0) {
                        this.getLoans(urls);
                    } else {
                        this.logout();
                    }
                }
            } else if (rid.includes('change')) {
                myEmitterLogs(6);
                return;
            } else if (rid.includes('/Pages/Trans.aspx')) {
                var urls = `https://services.bankjerusalem.co.il${rid}`;
                var args = await this.httpGet(
                    urls,
                    "https://services.bankjerusalem.co.il/Pages/Login.aspx",
                    this.cookies
                );
                var [error, response, data] = [...args];
                var dataRes = all.banks.core.services.parseHtml(data);
                var serializeForm = dataRes.find("form").serializeArray();
                var obj = {};
                serializeForm.forEach((vals) => {
                    obj[vals.name] = vals.value;
                });
                this.params = obj;
                if (!all.banks.openBankPage) {
                    if (dataRes.find("select[name='ctl00$PlaceHolderMain$AccountsDDL$ddlAccounts'] option").length) {
                        if (all.banks.accountDetails.deleted_account_ids.length) {
                            dataRes.find("select[name='ctl00$PlaceHolderMain$AccountsDDL$ddlAccounts'] option").each((idx, child) => {
                                const numberAcc = child.text.match(/(\d+)[\-](\d+)/g);
                                if (numberAcc) {
                                    var accNumber = numberAcc[0].split("-");
                                    var accountNumber = accNumber[1];
                                    if (all.banks.accountDetails.deleted_account_ids.some(it => accountNumber.includes(it.toString()))) {
                                        $(child).remove();
                                    }
                                }
                            });
                        }
                        this.accSelect = dataRes.find("select[name='ctl00$PlaceHolderMain$AccountsDDL$ddlAccounts'] option");
                    } else {
                        this.accSelect = dataRes.find("#ctl00_PlaceHolderMain_AccountsDDL_lblAccountDetails").text();
                    }

                    all.banks.generalVariables.allDataArrAshrai = [];
                    all.banks.generalVariables.allDataArrLoan = [];
                    if (all.banks.accountDetails.days > 0 || all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                        if (all.banks.accountDetails.days >= all.banks.accountDetails.MATAH_DAY_TO_RUN) {
                            this.dateFrom = ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2) + '.' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '.' + all.banks.accountDetails.dateFrom.getFullYear().toString();
                            this.dateTo = ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2) + '.' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '.' + all.banks.accountDetails.dateTo.getFullYear().toString();
                        }
                        if (all.banks.accountDetails.MATAH_DAY_TO_RUN >= all.banks.accountDetails.days) {
                            this.dateFrom = ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2) + '.' + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + '.' + all.banks.accountDetails.dateFromMatah.getFullYear().toString();
                            this.dateTo = ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2) + '.' + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + '.' + all.banks.accountDetails.dateToMatah.getFullYear().toString();
                        }
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
                        };
                        this.getOsh(urls);
                    } else if (all.banks.accountDetails.ccardMonth > 0) {
                        all.banks.generalVariables.allDataArrAshrai = [];
                        this.getCards(urls);
                    } else if (all.banks.accountDetails.IND_NILVIM > 0) {
                        this.getLoans(urls);
                    } else {
                        this.logout();
                    }
                } else {
                    // win.cookies.getAll({}, function (cool) {
                    //     cool.forEach(function (v) {
                    //         document.cookie = v.name + "=" + v.value + ";";
                    //     })
                    // });
                    // var cookSplit = this.cookies.split(";");
                    // var i1, len1 = cookSplit.length;
                    // for (i1 = 0; i1 < len1; i1++) {
                    // 	var v1 = cookSplit[i1];
                    // 	if (v1 !== "") {
                    // 		var nameExist = v1.split("=")[0].replace(/\s/g, "");
                    // 		var valExist = v1.split("=")[1].replace(/\s/g, "");
                    // 		win.cookies.set({
                    // 			url: "https://services.bankjerusalem.co.il",
                    // 			name: nameExist,
                    // 			domain: "services.bankjerusalem.co.il",
                    // 			value: valExist
                    // 		})
                    // 	}
                    // }
                    // setTimeout(() => {
                    //     $('#filecontainerlogin').attr('src', 'https://services.bankjerusalem.co.il/Pages/Trans.aspx').show();
                    //     $('html, body').animate({scrollTop: 1000}, 1000);
                    //    // all.banks.core.services.openBankPage('https://services.bankjerusalem.co.il/Pages/Trans.aspx');
                    // }, 3000)
                }
            }
        } catch (e) {
            console.log(e)
            await clearProxy();

        }
    }

    async getOsh(urls) {
        try {
            var args = await this.httpGet(
                "https://services.bankjerusalem.co.il/currentaccount/pages/current.aspx",
                urls,
                this.cookies
            );
            var [error, response, data] = [...args];
            var dataRes = all.banks.core.services.parseHtml(data);
            var serializeForm = dataRes.find("form").serializeArray();
            var obj = {};
            serializeForm.forEach((vals) => {
                obj[vals.name] = vals.value;
            });
            this.params = obj;
            // if(dataRes.find("#DeltaFormDigest").length){
            //     const deltaFormDigestText = dataRes.find("#DeltaFormDigest").text();
            //     if(deltaFormDigestText.length){
            //         const REQUESTDIGEST = deltaFormDigestText.split('formDigestElement.value = ')[1].split(';')[0].replace(/'/g, '');
            //         this.params["__REQUESTDIGEST"] = REQUESTDIGEST;
            //     }
            // }
            const typeSelect = typeof this.accSelect;
            if (typeSelect !== 'string') {
                for (let i = 0; i < this.accSelect.length; i++) {
                    let option = $(this.accSelect[i]);
                    let val = option.val();
                    let numberAcc = option.text().match(/(\d+)[\-](\d+)/g);
                    if (numberAcc) {
                        var accNumber = numberAcc[0].split("-");
                        var branchNumber = accNumber[0];
                        var accountNumber = accNumber[1];
                        // const currency = option.text().replace(/\s/g, '');

                        let arrDates = [{
                            dateFrom: this.dateFrom,
                            dateTo: this.dateTo
                        }]
                        if (this.dateFrom.split('.')[2] !== this.dateTo.split('.')[2]) {
                            arrDates = [{
                                dateFrom: this.dateFrom,
                                dateTo: '31.12.' + this.dateFrom.split('.')[2]
                            }, {
                                dateFrom: '01.01.' + this.dateTo.split('.')[2],
                                dateTo: this.dateTo
                            }]
                        }
                        let arrDate = [];

                        function parseDate(str) {
                            const mdy = str.split('.');
                            return new Date(Number(mdy[2]), Number(mdy[1]) - 1, Number(mdy[0]));
                        }

                        function datediff(first, second) {
                            return Math.round((second - first) / (1000 * 60 * 60 * 24));
                        }


                        try {
                            const diffDaysLastYear = datediff(parseDate(arrDates[0].dateFrom), parseDate(arrDates[0].dateTo))
                            if ((diffDaysLastYear / 180) > 1) {
                                const mdy = (arrDates[0].dateFrom).split('.');
                                const dateTill = new Date(Number(mdy[2]), Number(mdy[1]) - 1, Number(mdy[0]) + (diffDaysLastYear / 2));
                                const firstDate = {
                                    dateFrom: arrDates[0].dateFrom,
                                    dateTo: ("0" + (dateTill.getDate())).slice(-2) + '.' + ("0" + (dateTill.getMonth() + 1)).slice(-2) + '.' + dateTill.getFullYear().toString()
                                }
                                const mdy1 = (firstDate.dateTo).split('.');
                                const dateFrom = new Date(Number(mdy1[2]), Number(mdy1[1]) - 1, Number(mdy1[0]) + 1);
                                const lastDate = {
                                    dateFrom: ("0" + (dateFrom.getDate())).slice(-2) + '.' + ("0" + (dateFrom.getMonth() + 1)).slice(-2) + '.' + dateFrom.getFullYear().toString(),
                                    dateTo: arrDates[0].dateTo
                                }

                                arrDate.push(firstDate, lastDate);
                            } else {
                                arrDate.push(arrDates[0]);
                            }
                            if (this.dateFrom.split('.')[2] !== this.dateTo.split('.')[2]) {
                                const diffDaysLastYear2 = datediff(parseDate(arrDates[1].dateFrom), parseDate(arrDates[1].dateTo))
                                if ((diffDaysLastYear2 / 180) > 1) {
                                    const mdy = (arrDates[1].dateFrom).split('.');
                                    const dateTill = new Date(Number(mdy[2]), Number(mdy[1]) - 1, Number(mdy[0]) + (diffDaysLastYear / 2));
                                    const firstDate = {
                                        dateFrom: arrDates[1].dateFrom,
                                        dateTo: ("0" + (dateTill.getDate())).slice(-2) + '.' + ("0" + (dateTill.getMonth() + 1)).slice(-2) + '.' + dateTill.getFullYear().toString()
                                    }
                                    const mdy1 = (firstDate.dateTo).split('.');
                                    const dateFrom = new Date(Number(mdy1[2]), Number(mdy1[1]) - 1, Number(mdy1[0]) + 1);
                                    const lastDate = {
                                        dateFrom: ("0" + (dateFrom.getDate())).slice(-2) + '.' + ("0" + (dateFrom.getMonth() + 1)).slice(-2) + '.' + dateFrom.getFullYear().toString(),
                                        dateTo: arrDates[1].dateTo
                                    }
                                    arrDate.push(firstDate, lastDate);
                                } else {
                                    arrDate.push(arrDates[1]);
                                }
                            }
                        } catch (e) {
                        }

                        myEmitterLogs(10, accountNumber);
                        if (i > 0) {
                            writeLog("Start to switch account");
                            //only for switch account
                            await this.httpPostSoapOsh();
                            this.params["MSOTlPn_View"] = "0";
                            this.params["MSOTlPn_Button"] = "none";
                            this.params["__EVENTTARGET"] = "ctl00$PlaceHolderMain$AccountsDDL$ddlAccounts";
                            this.params["ctl00$PlaceHolderMain$AccountsDDL$ddlAccounts"] = val;
                            this.params["ctl00$SPWebPartManager2$g_1e733a62_566d_45bd_99c4_a554b0d7791d$ctl00$btnFilterTransactions"] = "";
                            this.params["ctl00$SPWebPartManager2$g_1e733a62_566d_45bd_99c4_a554b0d7791d$ctl00$hdnFrom"] = '';
                            this.params["ctl00$SPWebPartManager2$g_1e733a62_566d_45bd_99c4_a554b0d7791d$ctl00$hdnTo"] = '';
                            this.params["ctl00$SPWebPartManager2$g_1e733a62_566d_45bd_99c4_a554b0d7791d$ctl00$qaz"] = "180";
                            this.params["ctl00$SPWebPartManager2$g_1e733a62_566d_45bd_99c4_a554b0d7791d$ctl00$hfPeriodFilterSelected"] = "";

                            if (dataRes.find("#DeltaFormDigest").length) {
                                const deltaFormDigestText = dataRes.find("#DeltaFormDigest").text();
                                if (deltaFormDigestText.length) {
                                    const REQUESTDIGEST = deltaFormDigestText.split('formDigestElement.value = ')[1].split(';')[0].replace(/'/g, '');
                                    this.params["__REQUESTDIGEST"] = REQUESTDIGEST;
                                }
                            }

                            var args = await this.httpPost(
                                "https://services.bankjerusalem.co.il/currentaccount/pages/current.aspx",
                                "https://services.bankjerusalem.co.il/currentaccount/pages/current.aspx",
                                this.cookies,
                                this.params
                            );
                            var [error, response, data] = [...args];
                            // console.log('data---', data, response, error)
                            // debugger
                            var rid = response.headers.location;
                            if (rid !== undefined) {
                                var args = await this.httpGet(
                                    rid,
                                    "https://services.bankjerusalem.co.il/currentaccount/pages/current.aspx",
                                    this.cookies
                                );
                                var [error, response, data] = [...args];
                                // console.log('data---', data, response, error)
                                // debugger
                                var dataRes = all.banks.core.services.parseHtml(data);
                                var serializeForm = dataRes.find("form").serializeArray();
                                var obj = {};
                                serializeForm.forEach((vals) => {
                                    obj[vals.name] = vals.value;
                                });
                                this.params = obj;
                            }
                            //end of switch account
                            writeLog("End of switch account");
                        }

                        for (let iarrDates = 0; iarrDates < arrDate.length; iarrDates++) {
                            await this.httpPostSoapOsh();
                            this.params["MSOTlPn_View"] = "0";
                            this.params["MSOTlPn_Button"] = "none";
                            this.params["__EVENTTARGET"] = "";
                            this.params["ctl00$PlaceHolderMain$AccountsDDL$ddlAccounts"] = val;
                            this.params["ctl00$SPWebPartManager2$g_1e733a62_566d_45bd_99c4_a554b0d7791d$ctl00$btnFilterTransactions"] = "";
                            this.params["ctl00$SPWebPartManager2$g_1e733a62_566d_45bd_99c4_a554b0d7791d$ctl00$hdnFrom"] = arrDate[iarrDates].dateFrom;
                            this.params["ctl00$SPWebPartManager2$g_1e733a62_566d_45bd_99c4_a554b0d7791d$ctl00$hdnTo"] = arrDate[iarrDates].dateTo;
                            this.params["ctl00$SPWebPartManager2$g_1e733a62_566d_45bd_99c4_a554b0d7791d$ctl00$qaz"] = "180";
                            this.params["ctl00$SPWebPartManager2$g_1e733a62_566d_45bd_99c4_a554b0d7791d$ctl00$hfPeriodFilterSelected"] = "none";
                            // if(dataRes.find("#DeltaFormDigest").length){
                            //     const deltaFormDigestText = dataRes.find("#DeltaFormDigest").text();
                            //     if(deltaFormDigestText.length){
                            //         const REQUESTDIGEST = deltaFormDigestText.split('formDigestElement.value = ')[1].split(';')[0].replace(/'/g, '');
                            //         this.params["__REQUESTDIGEST"] = REQUESTDIGEST;
                            //     }
                            // }
                            //console.log('this.params: ', this.params)
                            var args = await this.httpPost(
                                "https://services.bankjerusalem.co.il/currentaccount/pages/current.aspx",
                                "https://services.bankjerusalem.co.il/currentaccount/pages/current.aspx",
                                this.cookies,
                                this.params
                            );
                            var [error, response, data] = [...args];
                            // console.log('data---', data, response, error)
                            // debugger
                            var rid = response.headers.location;
                            if (rid !== undefined) {
                                var args = await this.httpGet(
                                    rid,
                                    "https://services.bankjerusalem.co.il/currentaccount/pages/current.aspx",
                                    this.cookies
                                );
                                var [error, response, data] = [...args];
                                //writeHtmlFile('osh', data);
                                var dataRes = all.banks.core.services.parseHtml(data);
                                var serializeForm = dataRes.find("form").serializeArray();
                                var obj = {};
                                serializeForm.forEach((vals) => {
                                    obj[vals.name] = vals.value;
                                });
                                this.params = obj;
                                if (dataRes.find("#DeltaFormDigest").length) {
                                    const deltaFormDigestText = dataRes.find("#DeltaFormDigest").text();
                                    if (deltaFormDigestText.length) {
                                        const REQUESTDIGEST = deltaFormDigestText.split('formDigestElement.value = ')[1].split(';')[0].replace(/'/g, '');
                                        this.params["__REQUESTDIGEST"] = REQUESTDIGEST;
                                    }
                                }

                                if (iarrDates === 0) {
                                    const currency = dataRes.find(".revaluedBalance .currencySign").text();
                                    let revaluedBalance = dataRes.find(".revaluedBalance").text(); // .replace(/[^\d\.-]/g, "");
                                    let accountcreditline = dataRes.find(".accountcreditline_val").text().replace(/[^\d\.-]/g, "");
                                    var acc = {
                                        'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                        'AccountNumber': accountNumber,
                                        'BranchNumber': branchNumber,
                                        'Balance': this.strToSumOrNull(revaluedBalance), // (revaluedBalance === "") ? null : revaluedBalance,
                                        'AccountCredit': (accountcreditline === "") ? null : accountcreditline
                                    };
                                    if (!currency.includes('₪')) {
                                        acc.BankAccountTypeId = null;
                                        acc.CurrencyId = all.banks.core.services.getTypeCurrencyAll(currency, true)
                                    }
                                    all.banks.generalVariables.allDataArr.BankData[0].Account.push(acc);
                                    all.banks.generalVariables.allDataArr.BankData[0].Account[i].DataRow = [];
                                }

                                let table = dataRes.find("#ValidQuerylastTransactions");
                                if (table.length && table.find("tbody tr").length) {
                                    var rows = table.find("tbody tr");
                                    for (let i1 = 0; i1 < rows.length; i1++) {
                                        let row = rows.eq(i1);
                                        let td = row.children("td");
                                        let dateVal = td.eq(0).text().split(".");
                                        var valueDate = (new Date(parseFloat("20" + dateVal[2]), parseFloat(dateVal[1]) - 1, parseFloat(dateVal[0]))).toLocaleString('en-GB', {
                                            "year": 'numeric',
                                            "month": '2-digit',
                                            "day": '2-digit'
                                        });
                                        let transDesc = td.eq(1).find(".transSpan").text();
                                        let asmachta = td.eq(2).text().replace(/\D/g, "");

                                        var transactionType = '1';
                                        var totalOperationAmount = this.strToSumOrNull(td.eq(3).text());
                                        if (totalOperationAmount !== null && totalOperationAmount < 0) {
                                            transactionType = "0";
                                            totalOperationAmount = Math.abs(totalOperationAmount);
                                        }
                                        //                                    var totalOperationAmount = td.eq(3).text().replace(/[^\d\.-]/g, "");
                                        //                                    if (td.eq(3).hasClass("Negative")) {
                                        //                                        transactionType = "0";
                                        //                                        totalOperationAmount = Math.abs(Number(totalOperationAmount.replace(/-/g, "")));
                                        //                                    }

                                        var balance = this.strToSumOrNull(td.eq(4).text());
                                        //                                    var balance = td.eq(4).text().replace(/[^\d\.-]/g, "");
                                        //                                    if (balance.includes("-")) {
                                        //                                        balance = -Math.abs(Number(balance.replace(/-/g, "")));
                                        //                                    }

                                        var imgs = null;
                                        var isImg = td.eq(1).find("img");
                                        if (all.banks.accountDetails.checks === true && isImg.length && isImg.hasClass("checkImg")) {
                                            var onclickImg = td.eq(1).attr("onclick").split('(')[1].split(')')[0].split(',');
                                            var args = await this.httpGet(
                                                `https://services.bankjerusalem.co.il/_layouts/15/BankJerusalem/Handlers/WebPartHandler.aspx?wp=CheckViewer&valueDate=${encodeURI(onclickImg[2].replace(/"/g, ''))}&checkNumber=${onclickImg[0].replace(/"/g, '')}&_=${new Date().getTime()}`,
                                                "https://services.bankjerusalem.co.il/currentaccount/pages/current.aspx",
                                                this.cookies
                                            );
                                            var [error, response, data] = [...args];
                                            var dataRes = all.banks.core.services.parseHtml(data);
                                            var formData = new FormData();
                                            var contentImg = dataRes.find("#chek_front");
                                            if (contentImg.length) {
                                                var CheckBranchNumber = parseInt(branchNumber);
                                                var CheckAccountNumber = parseInt(accountNumber);
                                                var uuid = parseInt(all.banks.accountDetails.bank.BankNumber) + '' + CheckBranchNumber + '' + CheckAccountNumber + '' + parseInt(asmachta) + '' + Number(valueDate.split("/")[2] + "" + valueDate.split("/")[1] + "" + valueDate.split("/")[0]) + '_' + parseInt(all.banks.accountDetails.bank.BankNumber) + '' + CheckBranchNumber + '' + CheckAccountNumber;
                                                var content = contentImg.attr("src").replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                                                var blob = new Blob([content], {
                                                    type: "text/plain"
                                                });
                                                formData.append(uuid, blob);
                                                await this.sendChecksCtrl({
                                                    formData: formData,
                                                    params: {
                                                        imagenamekey: uuid,
                                                        bankId: parseInt(all.banks.accountDetails.bank.BankNumber),
                                                        snifId: branchNumber,
                                                        accountId: accountNumber
                                                    }
                                                });
                                            } else {
                                                var uuid = "x";
                                            }
                                            imgs = [
                                                {
                                                    "Asmachta": (asmachta === "") ? null : parseInt(asmachta),
                                                    "CheckAccountNumber": accountNumber,
                                                    "DepositeDate": valueDate,
                                                    "CheckBankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                                    "CheckBranchNumber": branchNumber,
                                                    "CheckNumber": parseInt(asmachta),
                                                    "CheckTotal": totalOperationAmount, // Math.abs(Number(totalOperationAmount)),
                                                    "ImageNameKey": uuid
                                                }
                                            ]
                                        }
                                        let DepositeTransferData = null;
                                        if (row.find('.accountTransferInfo').length) {
                                            const DepositeTransferDate = row.find('.accountTransferContent .popup-left-column .popupTextInner').eq(1).text().match(/(\d+)[\.](\d+)[\.](\d+)/g)
                                            const DepositeTransferDateSplit = DepositeTransferDate && DepositeTransferDate.length ? DepositeTransferDate[0].split('.') : null;
                                            const BankTransferNumber = row.find('.accountTransferContent .popup-middle-column .popupTextInner').eq(0).text().replace(/\D/g, "");
                                            let BranchTransferNumber = row.find('.accountTransferContent .popup-middle-column .popupTextInner').eq(1).text().replace(/\D/g, "");
                                            let AccountTransferNumber = row.find('.accountTransferContent .popup-middle-column .popupTextInner').eq(2).text().replace(/\D/g, "");
                                            if(row.find('.accountTransferContent .popup-middle-column .popupTextInner').eq(1).text().includes('ח-ן')){
                                                AccountTransferNumber = BranchTransferNumber;
                                                BranchTransferNumber = null;
                                            }
                                            let NamePayerTransfer = row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(1).text().replace("שם המוטב:", "");
                                            if (!row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(1).text().includes('המוטב')) {
                                                if (row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(1).text().includes('המעביר')) {
                                                    NamePayerTransfer = row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(1).text().replace("שם המעביר:", "");
                                                } else {
                                                    if (!row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(0).text().includes(':')) {
                                                        NamePayerTransfer = row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(0).text();
                                                    } else {
                                                        NamePayerTransfer = null;
                                                    }
                                                }
                                            }
                                            const TransferTotal = row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(0).text().replace(/[^\d\.]/g, "");
                                            const DetailsTransfer = row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(2).text();
                                            DepositeTransferData = [{
                                                "DepositeTransferDate": DepositeTransferDateSplit ? new Date(Number(20 + '' + DepositeTransferDateSplit[2]), Number(DepositeTransferDateSplit[1]), Number(DepositeTransferDateSplit[0])).toLocaleString('en-GB', {
                                                    "year": 'numeric',
                                                    "month": '2-digit',
                                                    "day": '2-digit'
                                                }) : null,
                                                "BankTransferNumber": BankTransferNumber ? parseInt(BankTransferNumber) : null,
                                                "BranchTransferNumber": BranchTransferNumber ? parseInt(BranchTransferNumber) : null,
                                                "AccountTransferNumber": AccountTransferNumber ? parseInt(AccountTransferNumber) : null,
                                                "NamePayerTransfer": NamePayerTransfer ? NamePayerTransfer.trim() : null,
                                                "DetailsTransfer": DetailsTransfer.trim().replace(/\s+/g, ' '),
                                                "TransferTotal": TransferTotal ? Number(TransferTotal) : null
                                            }];
                                        }

                                        all.banks.generalVariables.allDataArr.BankData[0].Account[i].DataRow.push({
                                            "Asmachta": (asmachta === "") ? null : parseInt(asmachta),
                                            "TransDesc": (transDesc === "") ? null : transDesc,
                                            "ValueDate": valueDate,
                                            "TransactionType": transactionType,
                                            "TransTotal": totalOperationAmount,
                                            "Balance": balance,
                                            "IsDaily": "0",
                                            "imgs": imgs,
                                            "DepositeTransferData": DepositeTransferData
                                        });
                                    }
                                }


                                let futureTransactions = dataRes.find(".futureTransactions");
                                if (futureTransactions.length && futureTransactions.find("table.futureTransactionsTable tbody tr").length) {
                                    var rows = futureTransactions.find("table.futureTransactionsTable tbody tr");
                                    for (let i1 = 0; i1 < rows.length; i1++) {
                                        let row = rows.eq(i1);
                                        let td = row.children("td");
                                        let dateVal = td.eq(0).text().split(".");
                                        var valueDate = (new Date(parseFloat("20" + dateVal[2]), parseFloat(dateVal[1]) - 1, parseFloat(dateVal[0]))).toLocaleString('en-GB', {
                                            "year": 'numeric',
                                            "month": '2-digit',
                                            "day": '2-digit'
                                        });
                                        let transDesc = td.eq(1).find(".transSpan").text();
                                        let asmachta = td.eq(2).text().replace(/\D/g, "");

                                        var transactionType = '1';
                                        var totalOperationAmount = this.strToSumOrNull(td.eq(3).text());
                                        if (totalOperationAmount !== null && totalOperationAmount < 0) {
                                            transactionType = "0";
                                            totalOperationAmount = Math.abs(totalOperationAmount);
                                        }
                                        //                                    var totalOperationAmount = td.eq(3).text().replace(/[^\d\.-]/g, "");
                                        //                                    var transactionType = '1';
                                        //                                    if (td.eq(3).hasClass("Negative")) {
                                        //                                        transactionType = "0";
                                        //                                        totalOperationAmount = Math.abs(Number(totalOperationAmount.replace(/-/g, "")));
                                        //                                    }

                                        let DepositeTransferData = null;
                                        if (row.find('.accountTransferInfo').length) {
                                            const DepositeTransferDate = row.find('.accountTransferContent .popup-left-column .popupTextInner').eq(1).text().match(/(\d+)[\.](\d+)[\.](\d+)/g)
                                            const DepositeTransferDateSplit = DepositeTransferDate && DepositeTransferDate.length ? DepositeTransferDate[0].split('.') : null;
                                            const BankTransferNumber = row.find('.accountTransferContent .popup-middle-column .popupTextInner').eq(0).text().replace(/\D/g, "");
                                            let BranchTransferNumber = row.find('.accountTransferContent .popup-middle-column .popupTextInner').eq(1).text().replace(/\D/g, "");
                                            let AccountTransferNumber = row.find('.accountTransferContent .popup-middle-column .popupTextInner').eq(2).text().replace(/\D/g, "");
                                            if(row.find('.accountTransferContent .popup-middle-column .popupTextInner').eq(1).text().includes('ח-ן')){
                                                AccountTransferNumber = BranchTransferNumber;
                                                BranchTransferNumber = null;
                                            }
                                            let NamePayerTransfer = row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(1).text().replace("שם המוטב:", "");
                                            if (!row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(1).text().includes('המוטב')) {
                                                if (row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(1).text().includes('המעביר')) {
                                                    NamePayerTransfer = row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(1).text().replace("שם המעביר:", "");
                                                } else {
                                                    if (!row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(0).text().includes(':')) {
                                                        NamePayerTransfer = row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(0).text();
                                                    } else {
                                                        NamePayerTransfer = null;
                                                    }
                                                }
                                            }
                                            const TransferTotal = row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(0).text().replace(/[^\d\.]/g, "");
                                            const DetailsTransfer = row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(2).text();
                                            DepositeTransferData = [{
                                                "DepositeTransferDate": DepositeTransferDateSplit ? new Date(Number(20 + '' + DepositeTransferDateSplit[2]), Number(DepositeTransferDateSplit[1]), Number(DepositeTransferDateSplit[0])).toLocaleString('en-GB', {
                                                    "year": 'numeric',
                                                    "month": '2-digit',
                                                    "day": '2-digit'
                                                }) : null,
                                                "BankTransferNumber": BankTransferNumber ? parseInt(BankTransferNumber) : null,
                                                "BranchTransferNumber": BranchTransferNumber ? parseInt(BranchTransferNumber) : null,
                                                "AccountTransferNumber": AccountTransferNumber ? parseInt(AccountTransferNumber) : null,
                                                "NamePayerTransfer": NamePayerTransfer ? NamePayerTransfer.trim() : null,
                                                "DetailsTransfer": DetailsTransfer.trim().replace(/\s+/g, ' '),
                                                "TransferTotal": TransferTotal ? Number(TransferTotal) : null
                                            }];
                                        }
                                        all.banks.generalVariables.allDataArr.BankData[0].Account[i].DataRow.push({
                                            "Asmachta": (asmachta === "") ? null : asmachta,
                                            "TransDesc": (transDesc === "") ? null : transDesc,
                                            "ValueDate": valueDate,
                                            "TransactionType": transactionType,
                                            "TransTotal": totalOperationAmount,
                                            "Balance": null,
                                            "IsDaily": "1",
                                            "imgs": null,
                                            "DepositeTransferData": DepositeTransferData
                                        });
                                    }
                                }
                            }
                        }

                        if (all.banks.generalVariables.allDataArr.BankData[0].Account[i] && all.banks.generalVariables.allDataArr.BankData[0].Account[i].DataRow && all.banks.generalVariables.allDataArr.BankData[0].Account[i].DataRow.length) {
                            let source = JSON.parse(JSON.stringify(all.banks.generalVariables.allDataArr.BankData[0].Account[i].DataRow));
                            const dateRE = /^(\d{2})[\/\- ](\d{2})[\/\- ](\d{4})/;
                            source.sort(function (a, b) {
                                if (a.ValueDate) {
                                    a = a.ValueDate.replace(dateRE, "$3$2$1");
                                }
                                if (b.ValueDate) {
                                    b = b.ValueDate.replace(dateRE, "$3$2$1");
                                }
                                if (a < b) return 1;
                                if (a > b) return -1;
                                return 0;
                            });
                            all.banks.generalVariables.allDataArr.BankData[0].Account[i].DataRow = source;
                        }
                    }
                }
            } else {
                let numberAcc = this.accSelect.match(/(\d+)[\-](\d+)/g);
                if (numberAcc) {
                    var accNumber = numberAcc[0].split("-");
                    var branchNumber = accNumber[0];
                    var accountNumber = accNumber[1];
                    // const currency = this.accSelect.replace(/\s/g, '');
                    let arrDates = [{
                        dateFrom: this.dateFrom,
                        dateTo: this.dateTo
                    }]
                    if (this.dateFrom.split('.')[2] !== this.dateTo.split('.')[2]) {
                        arrDates = [{
                            dateFrom: this.dateFrom,
                            dateTo: '31.12.' + this.dateFrom.split('.')[2]
                        }, {
                            dateFrom: '01.01.' + this.dateTo.split('.')[2],
                            dateTo: this.dateTo
                        }]
                    }


                    let arrDate = [];

                    function parseDate(str) {
                        const mdy = str.split('.');
                        return new Date(Number(mdy[2]), Number(mdy[1]) - 1, Number(mdy[0]));
                    }

                    function datediff(first, second) {
                        return Math.round((second - first) / (1000 * 60 * 60 * 24));
                    }

                    const diffDaysLastYear = datediff(parseDate(arrDates[0].dateFrom), parseDate(arrDates[0].dateTo))
                    if ((diffDaysLastYear / 180) > 1) {
                        const mdy = (arrDates[0].dateFrom).split('.');
                        const dateTill = new Date(Number(mdy[2]), Number(mdy[1]) - 1, Number(mdy[0]) + (diffDaysLastYear / 2));
                        const firstDate = {
                            dateFrom: arrDates[0].dateFrom,
                            dateTo: ("0" + (dateTill.getDate())).slice(-2) + '.' + ("0" + (dateTill.getMonth() + 1)).slice(-2) + '.' + dateTill.getFullYear().toString()
                        }
                        const mdy1 = (firstDate.dateTo).split('.');
                        const dateFrom = new Date(Number(mdy1[2]), Number(mdy1[1]) - 1, Number(mdy1[0]) + 1);
                        const lastDate = {
                            dateFrom: ("0" + (dateFrom.getDate())).slice(-2) + '.' + ("0" + (dateFrom.getMonth() + 1)).slice(-2) + '.' + dateFrom.getFullYear().toString(),
                            dateTo: arrDates[0].dateTo
                        }

                        arrDate.push(firstDate, lastDate);
                    } else {
                        arrDate.push(arrDates[0]);
                    }
                    if (this.dateFrom.split('.')[2] !== this.dateTo.split('.')[2]) {
                        const diffDaysLastYear2 = datediff(parseDate(arrDates[1].dateFrom), parseDate(arrDates[1].dateTo))
                        if ((diffDaysLastYear2 / 180) > 1) {
                            const mdy = (arrDates[1].dateFrom).split('.');
                            const dateTill = new Date(Number(mdy[2]), Number(mdy[1]) - 1, Number(mdy[0]) + (diffDaysLastYear / 2));
                            const firstDate = {
                                dateFrom: arrDates[1].dateFrom,
                                dateTo: ("0" + (dateTill.getDate())).slice(-2) + '.' + ("0" + (dateTill.getMonth() + 1)).slice(-2) + '.' + dateTill.getFullYear().toString()
                            }
                            const mdy1 = (firstDate.dateTo).split('.');
                            const dateFrom = new Date(Number(mdy1[2]), Number(mdy1[1]) - 1, Number(mdy1[0]) + 1);
                            const lastDate = {
                                dateFrom: ("0" + (dateFrom.getDate())).slice(-2) + '.' + ("0" + (dateFrom.getMonth() + 1)).slice(-2) + '.' + dateFrom.getFullYear().toString(),
                                dateTo: arrDates[1].dateTo
                            }
                            arrDate.push(firstDate, lastDate);
                        } else {
                            arrDate.push(arrDates[1]);
                        }
                    }


                    for (let iarrDates = 0; iarrDates < arrDate.length; iarrDates++) {
                        await this.httpPostSoapOsh();
                        this.params["MSOTlPn_View"] = "0";
                        this.params["MSOTlPn_Button"] = "none";
                        this.params["ctl00$SPWebPartManager2$g_1e733a62_566d_45bd_99c4_a554b0d7791d$ctl00$btnFilterTransactions"] = "";
                        this.params["ctl00$SPWebPartManager2$g_1e733a62_566d_45bd_99c4_a554b0d7791d$ctl00$hdnFrom"] = arrDate[iarrDates].dateFrom;
                        this.params["ctl00$SPWebPartManager2$g_1e733a62_566d_45bd_99c4_a554b0d7791d$ctl00$hdnTo"] = arrDate[iarrDates].dateTo;
                        this.params["ctl00$SPWebPartManager2$g_1e733a62_566d_45bd_99c4_a554b0d7791d$ctl00$qaz"] = "180";
                        this.params["ctl00$SPWebPartManager2$g_1e733a62_566d_45bd_99c4_a554b0d7791d$ctl00$hfPeriodFilterSelected"] = "none";
                        if (dataRes.find("#DeltaFormDigest").length) {
                            const deltaFormDigestText = dataRes.find("#DeltaFormDigest").text();
                            if (deltaFormDigestText.length) {
                                const REQUESTDIGEST = deltaFormDigestText.split('formDigestElement.value = ')[1].split(';')[0].replace(/'/g, '');
                                this.params["__REQUESTDIGEST"] = REQUESTDIGEST;
                            }
                        }
                        var args = await this.httpPost(
                            "https://services.bankjerusalem.co.il/currentaccount/pages/current.aspx",
                            "https://services.bankjerusalem.co.il/currentaccount/pages/current.aspx",
                            this.cookies,
                            this.params
                        );
                        var [error, response, data] = [...args];
                        var rid = response.headers.location;
                        if (rid !== undefined) {
                            myEmitterLogs(10, accountNumber);
                            var args = await this.httpGet(
                                rid,
                                "https://services.bankjerusalem.co.il/currentaccount/pages/current.aspx",
                                this.cookies
                            );
                            var [error, response, data] = [...args];
                            var dataRes = all.banks.core.services.parseHtml(data);
                            var serializeForm = dataRes.find("form").serializeArray();
                            var obj = {};
                            serializeForm.forEach((vals) => {
                                obj[vals.name] = vals.value;
                            });
                            this.params = obj;
                            if (dataRes.find("#DeltaFormDigest").length) {
                                const deltaFormDigestText = dataRes.find("#DeltaFormDigest").text();
                                if (deltaFormDigestText.length) {
                                    const REQUESTDIGEST = deltaFormDigestText.split('formDigestElement.value = ')[1].split(';')[0].replace(/'/g, '');
                                    this.params["__REQUESTDIGEST"] = REQUESTDIGEST;
                                }
                            }
                            if (iarrDates === 0) {
                                const currency = dataRes.find(".revaluedBalance .currencySign").text();
                                let revaluedBalance = dataRes.find(".revaluedBalance").text(); // .replace(/[^\d\.-]/g, "");
                                let accountcreditline = dataRes.find(".accountcreditline_val").text().replace(/[^\d\.-]/g, "");
                                var acc = {
                                    'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                    'AccountNumber': accountNumber,
                                    'BranchNumber': branchNumber,
                                    'Balance': this.strToSumOrNull(revaluedBalance), // (revaluedBalance === "") ? null : revaluedBalance,
                                    'AccountCredit': (accountcreditline === "") ? null : accountcreditline
                                };
                                if (!currency.includes('₪')) {
                                    acc.BankAccountTypeId = null;
                                    acc.CurrencyId = all.banks.core.services.getTypeCurrencyAll(currency, true)
                                }
                                all.banks.generalVariables.allDataArr.BankData[0].Account.push(acc);
                                all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow = [];
                            }
                            let table = dataRes.find("#ValidQuerylastTransactions");

                            if (table.length && table.find("tbody tr").length) {
                                var rows = table.find("tbody tr");
                                for (let i1 = 0; i1 < rows.length; i1++) {
                                    let row = rows.eq(i1);
                                    let td = row.children("td");
                                    let dateVal = td.eq(0).text().split(".");
                                    var valueDate = (new Date(parseFloat("20" + dateVal[2]), parseFloat(dateVal[1]) - 1, parseFloat(dateVal[0]))).toLocaleString('en-GB', {
                                        "year": 'numeric',
                                        "month": '2-digit',
                                        "day": '2-digit'
                                    });
                                    let transDesc = td.eq(1).find(".transSpan").text();
                                    let asmachta = td.eq(2).text().replace(/\D/g, "");
                                    var transactionType = '1';
                                    var totalOperationAmount = this.strToSumOrNull(td.eq(3).text());
                                    if (totalOperationAmount !== null && totalOperationAmount < 0) {
                                        transactionType = "0";
                                        totalOperationAmount = Math.abs(totalOperationAmount);
                                    }
                                    //                                var totalOperationAmount = td.eq(3).text().replace(/[^\d\.-]/g, "");
                                    //                                if (td.eq(3).hasClass("Negative")) {
                                    //                                    transactionType = "0";
                                    //                                    totalOperationAmount = Math.abs(Number(totalOperationAmount.replace(/-/g, "")));
                                    //                                }
                                    var balance = this.strToSumOrNull(td.eq(4).text());
                                    //                                var balance = td.eq(4).text().replace(/[^\d\.-]/g, "");
                                    //                                if (balance.includes("-")) {
                                    //                                    balance = -Math.abs(Number(balance.replace(/-/g, "")));
                                    //                                }
                                    var imgs = null;
                                    var isImg = td.eq(1).find("img");
                                    if (all.banks.accountDetails.checks === true && isImg.length && isImg.hasClass("checkImg")) {
                                        var onclickImg = td.eq(1).attr("onclick").split('(')[1].split(')')[0].split(',');
                                        var args = await this.httpGet(
                                            `https://services.bankjerusalem.co.il/_layouts/15/BankJerusalem/Handlers/WebPartHandler.aspx?wp=CheckViewer&valueDate=${encodeURI(onclickImg[2].replace(/"/g, ''))}&checkNumber=${onclickImg[0].replace(/"/g, '')}&_=${new Date().getTime()}`,
                                            "https://services.bankjerusalem.co.il/currentaccount/pages/current.aspx",
                                            this.cookies
                                        );
                                        var [error, response, data] = [...args];
                                        var dataRes = all.banks.core.services.parseHtml(data);
                                        var formData = new FormData();
                                        var contentImg = dataRes.find("#chek_front");
                                        if (contentImg.length) {
                                            var CheckBranchNumber = parseInt(branchNumber);
                                            var CheckAccountNumber = parseInt(accountNumber);
                                            var uuid = parseInt(all.banks.accountDetails.bank.BankNumber) + '' + CheckBranchNumber + '' + CheckAccountNumber + '' + parseInt(asmachta) + '' + Number(valueDate.split("/")[2] + "" + valueDate.split("/")[1] + "" + valueDate.split("/")[0]) + '_' + parseInt(all.banks.accountDetails.bank.BankNumber) + '' + CheckBranchNumber + '' + CheckAccountNumber;
                                            var content = contentImg.attr("src").replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                                            var blob = new Blob([content], {
                                                type: "text/plain"
                                            });
                                            formData.append(uuid, blob);
                                            await this.sendChecksCtrl({
                                                formData: formData,
                                                params: {
                                                    imagenamekey: uuid,
                                                    bankId: parseInt(all.banks.accountDetails.bank.BankNumber),
                                                    snifId: branchNumber,
                                                    accountId: accountNumber
                                                }
                                            });
                                        } else {
                                            var uuid = "x";
                                        }
                                        imgs = [
                                            {
                                                "Asmachta": (asmachta === "") ? null : parseInt(asmachta),
                                                "CheckAccountNumber": accountNumber,
                                                "DepositeDate": valueDate,
                                                "CheckBankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                                "CheckBranchNumber": branchNumber,
                                                "CheckNumber": parseInt(asmachta),
                                                "CheckTotal": totalOperationAmount, // Math.abs(Number(totalOperationAmount)),
                                                "ImageNameKey": uuid
                                            }
                                        ]
                                    }
                                    let DepositeTransferData = null;
                                    if (row.find('.accountTransferInfo').length) {
                                        const DepositeTransferDate = row.find('.accountTransferContent .popup-left-column .popupTextInner').eq(1).text().match(/(\d+)[\.](\d+)[\.](\d+)/g)
                                        const DepositeTransferDateSplit = DepositeTransferDate && DepositeTransferDate.length ? DepositeTransferDate[0].split('.') : null;
                                        const BankTransferNumber = row.find('.accountTransferContent .popup-middle-column .popupTextInner').eq(0).text().replace(/\D/g, "");
                                        let BranchTransferNumber = row.find('.accountTransferContent .popup-middle-column .popupTextInner').eq(1).text().replace(/\D/g, "");
                                        let AccountTransferNumber = row.find('.accountTransferContent .popup-middle-column .popupTextInner').eq(2).text().replace(/\D/g, "");
                                        if(row.find('.accountTransferContent .popup-middle-column .popupTextInner').eq(1).text().includes('ח-ן')){
                                            AccountTransferNumber = BranchTransferNumber;
                                            BranchTransferNumber = null;
                                        }
                                        let NamePayerTransfer = row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(1).text().replace("שם המוטב:", "");
                                        if (!row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(1).text().includes('המוטב')) {
                                            if (row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(1).text().includes('המעביר')) {
                                                NamePayerTransfer = row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(1).text().replace("שם המעביר:", "");
                                            } else {
                                                if (!row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(0).text().includes(':')) {
                                                    NamePayerTransfer = row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(0).text();
                                                } else {
                                                    NamePayerTransfer = null;
                                                }
                                            }
                                        }
                                        const TransferTotal = row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(0).text().replace(/[^\d\.]/g, "");
                                        const DetailsTransfer = row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(2).text();
                                        DepositeTransferData = [{
                                            "DepositeTransferDate": DepositeTransferDateSplit ? new Date(Number(20 + '' + DepositeTransferDateSplit[2]), Number(DepositeTransferDateSplit[1]), Number(DepositeTransferDateSplit[0])).toLocaleString('en-GB', {
                                                "year": 'numeric',
                                                "month": '2-digit',
                                                "day": '2-digit'
                                            }) : null,
                                            "BankTransferNumber": BankTransferNumber ? parseInt(BankTransferNumber) : null,
                                            "BranchTransferNumber": BranchTransferNumber ? parseInt(BranchTransferNumber) : null,
                                            "AccountTransferNumber": AccountTransferNumber ? parseInt(AccountTransferNumber) : null,
                                            "NamePayerTransfer": NamePayerTransfer ? NamePayerTransfer.trim() : null,
                                            "DetailsTransfer": DetailsTransfer.trim().replace(/\s+/g, ' '),
                                            "TransferTotal": TransferTotal ? Number(TransferTotal) : null
                                        }];
                                    }
                                    all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.push({
                                        "Asmachta": (asmachta === "") ? null : parseInt(asmachta),
                                        "TransDesc": (transDesc === "") ? null : transDesc,
                                        "ValueDate": valueDate,
                                        "TransactionType": transactionType,
                                        "TransTotal": totalOperationAmount,
                                        "Balance": balance,
                                        "IsDaily": "0",
                                        "imgs": imgs,
                                        "DepositeTransferData": DepositeTransferData
                                    });
                                }
                            }


                            let futureTransactions = dataRes.find(".futureTransactions");
                            if (futureTransactions.length && futureTransactions.find("table.futureTransactionsTable tbody tr").length) {
                                var rows = futureTransactions.find("table.futureTransactionsTable tbody tr");
                                for (let i1 = 0; i1 < rows.length; i1++) {
                                    let row = rows.eq(i1);
                                    let td = row.children("td");
                                    let dateVal = td.eq(0).text().split(".");
                                    var valueDate = (new Date(parseFloat("20" + dateVal[2]), parseFloat(dateVal[1]) - 1, parseFloat(dateVal[0]))).toLocaleString('en-GB', {
                                        "year": 'numeric',
                                        "month": '2-digit',
                                        "day": '2-digit'
                                    });
                                    let transDesc = td.eq(1).find(".transSpan").text();
                                    let asmachta = td.eq(2).text().replace(/\D/g, "");
                                    var transactionType = '1';
                                    var totalOperationAmount = this.strToSumOrNull(td.eq(3).text());
                                    if (totalOperationAmount !== null && totalOperationAmount < 0) {
                                        transactionType = "0";
                                        totalOperationAmount = Math.abs(totalOperationAmount);
                                    }
                                    //                                var totalOperationAmount = td.eq(3).text().replace(/[^\d\.-]/g, "");
                                    //                                if (td.eq(3).hasClass("Negative")) {
                                    //                                    transactionType = "0";
                                    //                                    totalOperationAmount = Math.abs(Number(totalOperationAmount.replace(/-/g, "")));
                                    //                                }
                                    let DepositeTransferData = null;
                                    if (row.find('.accountTransferInfo').length) {
                                        const DepositeTransferDate = row.find('.accountTransferContent .popup-left-column .popupTextInner').eq(1).text().match(/(\d+)[\.](\d+)[\.](\d+)/g)
                                        const DepositeTransferDateSplit = DepositeTransferDate && DepositeTransferDate.length ? DepositeTransferDate[0].split('.') : null;
                                        const BankTransferNumber = row.find('.accountTransferContent .popup-middle-column .popupTextInner').eq(0).text().replace(/\D/g, "");
                                        let BranchTransferNumber = row.find('.accountTransferContent .popup-middle-column .popupTextInner').eq(1).text().replace(/\D/g, "");
                                        let AccountTransferNumber = row.find('.accountTransferContent .popup-middle-column .popupTextInner').eq(2).text().replace(/\D/g, "");
                                        if(row.find('.accountTransferContent .popup-middle-column .popupTextInner').eq(1).text().includes('ח-ן')){
                                            AccountTransferNumber = BranchTransferNumber;
                                            BranchTransferNumber = null;
                                        }
                                        let NamePayerTransfer = row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(1).text().replace("שם המוטב:", "");
                                        if (!row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(1).text().includes('המוטב')) {
                                            if (row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(1).text().includes('המעביר')) {
                                                NamePayerTransfer = row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(1).text().replace("שם המעביר:", "");
                                            } else {
                                                if (!row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(0).text().includes(':')) {
                                                    NamePayerTransfer = row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(0).text();
                                                } else {
                                                    NamePayerTransfer = null;
                                                }
                                            }
                                        }
                                        const TransferTotal = row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(0).text().replace(/[^\d\.]/g, "");
                                        const DetailsTransfer = row.find('.accountTransferContent .popup-right-column .popupTextInner').eq(2).text();
                                        DepositeTransferData = [{
                                            "DepositeTransferDate": DepositeTransferDateSplit ? new Date(Number(20 + '' + DepositeTransferDateSplit[2]), Number(DepositeTransferDateSplit[1]), Number(DepositeTransferDateSplit[0])).toLocaleString('en-GB', {
                                                "year": 'numeric',
                                                "month": '2-digit',
                                                "day": '2-digit'
                                            }) : null,
                                            "BankTransferNumber": BankTransferNumber ? parseInt(BankTransferNumber) : null,
                                            "BranchTransferNumber": BranchTransferNumber ? parseInt(BranchTransferNumber) : null,
                                            "AccountTransferNumber": AccountTransferNumber ? parseInt(AccountTransferNumber) : null,
                                            "NamePayerTransfer": NamePayerTransfer ? NamePayerTransfer.trim() : null,
                                            "DetailsTransfer": DetailsTransfer.trim().replace(/\s+/g, ' '),
                                            "TransferTotal": TransferTotal ? Number(TransferTotal) : null
                                        }];
                                    }
                                    all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.push({
                                        "Asmachta": (asmachta === "") ? null : asmachta,
                                        "TransDesc": (transDesc === "") ? null : transDesc,
                                        "ValueDate": valueDate,
                                        "TransactionType": transactionType,
                                        "TransTotal": totalOperationAmount,
                                        "Balance": null,
                                        "IsDaily": "1",
                                        "imgs": null,
                                        "DepositeTransferData": DepositeTransferData
                                    });
                                }
                            }
                        }
                    }


                    if (all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow && all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length) {
                        let source = JSON.parse(JSON.stringify(all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow));
                        const dateRE = /^(\d{2})[\/\- ](\d{2})[\/\- ](\d{4})/;
                        source.sort(function (a, b) {
                            if (a.ValueDate) {
                                a = a.ValueDate.replace(dateRE, "$3$2$1");
                            }
                            if (b.ValueDate) {
                                b = b.ValueDate.replace(dateRE, "$3$2$1");
                            }
                            if (a < b) return 1;
                            if (a > b) return -1;
                            return 0;
                        });
                        all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow = source;
                    }
                }
            }

            this.sendOshCtrl(urls);
        } catch (e) {
            console.log(e)
        }
    }

    async getCards(urls) {
        function parseMinusNumbers(number) {
            if (number.includes('-')) {
                return ('-' + number.replace(/[^\d\.]/g, ""))
            }
            return number
        }

        try {
            myEmitterLogs(14);

            console.log('start getCards')
            var args = await this.httpGet(
                "https://services.bankjerusalem.co.il/credit/pages/credit-card.aspx",
                urls,
                this.cookies
            );
            var [error, response, data] = [...args];
            // writeHtmlFile('credit-card', data);

            var dataRes = all.banks.core.services.parseHtml(data);
            var serializeForm = dataRes.find("form").serializeArray();
            var obj = {};
            serializeForm.forEach((vals) => {
                obj[vals.name] = vals.value;
            });
            this.params = obj;
            const typeSelect = typeof this.accSelect;
            console.log('this.accSelect ', this.accSelect)

            if (typeSelect !== 'string') {
                for (let i = 0; i < this.accSelect.length; i++) {
                    let option = $(this.accSelect[i]);
                    let val = option.val();
                    let numberAcc = option.text().match(/(\d+)[\-](\d+)/g);
                    console.log('numberAcc ', numberAcc, 'val ', val)

                    if (numberAcc) {
                        var accNumber = numberAcc[0].split("-");
                        var branchNumber = accNumber[0];
                        var accountNumber = accNumber[1];
                        myEmitterLogs(33, accountNumber);
                        const getData = async () => {
                            dataRes.find(".creditCardEntry").each(function (i111, childTable) {
                                const tableTr = $(childTable).find(".foundActionsTables table.ccTable1 tbody tr");
                                // console.log('tableTr ', tableTr)
                                if (!$(childTable).find('.error_msg').length && tableTr.length) {
                                    const nextTotal = $(childTable).find('.divMisgeret').eq(0).find('.paddingBottom2').eq(0).find('span.NIS').text().replace(/[^\d\.-]/g, "")
                                    const cartShorftNumber = $(childTable).find('.cartShorftNumber').text();
                                    myEmitterLogs(15, Number(cartShorftNumber.replace(/\D/g, "")));
                                    $(tableTr).each(function (i, v) {
                                        const td = $(v).children("td");

                                        let totalPaymentsSum = null;
                                        let currentPaymentNumSum = null;

                                        const payments = $(v).find('.wrapperCCDetailsInner .CCDetailsData').text()
                                        if (payments && payments.includes('תשלום')) {
                                            const getPaymentsNum = payments.match(/(\d+)[/](\d+)/g)
                                            if (getPaymentsNum && getPaymentsNum.length) {
                                                const arrPayments = getPaymentsNum[0].split('/')
                                                if (arrPayments && arrPayments.length) {
                                                    currentPaymentNumSum = Number(arrPayments[0])
                                                    totalPaymentsSum = Number(arrPayments[1])
                                                }
                                            }
                                        }

                                        let comment = '';
                                        const comments = $(v).find('.wrapperCCDetailsInner .CCDetailsData.Madad')
                                        if (comments.length) {
                                            comment = comments.text()
                                        }

                                        all.banks.core.services.getTypeCurrencyAll(td.eq(3).text())
                                        all.banks.generalVariables.allDataArrAshrai.push({
                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                            "Token": all.banks.accountDetails.bank.token,
                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                            'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                            'AccountNumber': accountNumber,
                                            'BranchNumber': branchNumber,
                                            "NextBillingDate": all.banks.core.services.convertDateAll(new Date('20' + td.eq(0).find('span').attr('sort').slice(0, 8).replace(/\//g, ','))),
                                            "CardNumber": Number(cartShorftNumber.replace(/\D/g, "")),
                                            "CardType": all.banks.core.services.getTypeCard(cartShorftNumber),
                                            "ValueDate": all.banks.core.services.convertDateAll(new Date('20' + td.eq(1).find('span').attr('sort').slice(0, 8).replace(/\//g, ','))),
                                            "TransDesc": td.eq(2).text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s\s+/g, ""),
                                            "original_total": parseMinusNumbers(td.eq(3).text().replace(/[^\d\.-]/g, "")),
                                            "TransTotal": $(v).attr('sum'),
                                            "CardStatus": null,
                                            "TransCategory": null,
                                            "TotalPayments": totalPaymentsSum,
                                            "CurrentPaymentNum": currentPaymentNumSum,
                                            "comment": comment,
                                            "indFakeDate": 0,
                                            "currency_id": 1,
                                            "ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(td.eq(3).text()),
                                            "NextCycleTotal": nextTotal,
                                        });
                                    })
                                }
                            })

                            // const debitCardItem = dataRes.find(".debitCardsList li.debitCardItem");
                            // if (debitCardItem.length) {
                            //     for (let idx = 0; idx < debitCardItem.length; idx++) {
                            //         const childTable = debitCardItem[idx];
                            //         const tableTr = $(childTable).find(".creditCardEntry");
                            //         if (!$(childTable).find('.error_msg').length && tableTr.length) {
                            //             const cc_number = tableTr.attr('cc_number');
                            //             myEmitterLogs(15, Number(cc_number.replace(/\D/g, "")));
                            //
                            //             const debitCardContinue = tableTr.find('.debitCardContinue');
                            //             let CCIssuingCompanyCode;
                            //             if (debitCardContinue.length) {
                            //                 CCIssuingCompanyCode = debitCardContinue.attr('CCIssuingCompanyCode');
                            //             }
                            //             const fromDate = tableTr.find('.fromDate').val().split('.');
                            //             const toDate = tableTr.find('.toDate').val().split('.');
                            //             const urlDebit = 'https://services.bankjerusalem.co.il/credit/pages/BojHandler.ashx?Command=Xactions&debitCardNumber=' + cc_number + '&fromDate=' + (fromDate[2] + fromDate[1] + fromDate[0]) + '&toDate=' + (toDate[2] + toDate[1] + toDate[0]) + '&companyCode=' + CCIssuingCompanyCode + '&_=' + new Date().getTime()
                            //             const argsDebit = await this.httpGet(
                            //                 urlDebit,
                            //                 "https://services.bankjerusalem.co.il/credit/pages/credit-card.aspx",
                            //                 this.cookies
                            //             );
                            //             const [errorDebit, responseDebit, dataDebit] = [...argsDebit];
                            //             if (dataDebit && dataDebit.length) {
                            //                 dataDebit.forEach(v => {
                            //                     all.banks.generalVariables.allDataArrAshrai.push({
                            //                         "TargetId": all.banks.accountDetails.bank.targetId,
                            //                         "Token": all.banks.accountDetails.bank.token,
                            //                         "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                            //                         "ExporterId": all.banks.spiderConfig.spiderId,
                            //                         'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                            //                         'AccountNumber': accountNumber,
                            //                         'BranchNumber': branchNumber,
                            //                         "NextBillingDate": all.banks.core.services.convertDateAll(new Date('20' + td.eq(0).find('span').attr('sort').slice(0, 8).replace(/\//g, ','))),
                            //                         "CardNumber": Number(cc_number.replace(/\D/g, "")),
                            //                         "CardType": 30,
                            //                         "ValueDate": all.banks.core.services.convertDateAll(v.CCXactionDate),
                            //                         "TransDesc": v.CCXactionBusiness.replace(/\n/g, "").replace(/\t/g, "").replace(/\s\s+/g, ""),
                            //                         "original_total": v.CCXactionAmount,
                            //                         "TransTotal": v.CCXactionDebitAmount,
                            //                         "CardStatus": null,
                            //                         "TransCategory": null,
                            //                         "TotalPayments": 1,
                            //                         "CurrentPaymentNum": 1,
                            //                         "comment": v.CCXactionName + '' + v.BojNote,
                            //                         "indFakeDate": 0,
                            //                         "currency_id": 1,
                            //                         "ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(v.CCCurrencyName),
                            //                         "NextCycleTotal": null,
                            //                     });
                            //
                            //                 });
                            //             }
                            //         }
                            //     }
                            // }
                        }
                        if (option.is(':selected')) {
                            await getData(dataRes)
                        } else {
                            await this.httpPostSoapCredit();
                            this.params["MSOTlPn_View"] = "0";
                            this.params["MSOTlPn_Button"] = "none";
                            this.params["ctl00$PlaceHolderMain$AccountsDDL$ddlAccounts"] = val;
                            this.params["__EVENTTARGET"] = "ctl00$PlaceHolderMain$AccountsDDL$ddlAccounts";

                            var args = await this.httpPost(
                                "https://services.bankjerusalem.co.il/credit/pages/credit-card.aspx",
                                "https://services.bankjerusalem.co.il/credit/pages/credit-card.aspx",
                                this.cookies,
                                this.params
                            );
                            var [error, response, data] = [...args];

                            var rid = response.headers.location;
                            if (rid !== undefined) {
                                var args = await this.httpGet(
                                    rid,
                                    "https://services.bankjerusalem.co.il/credit/pages/credit-card.aspx",
                                    this.cookies
                                );
                                var [error, response, data] = [...args];
                                // writeHtmlFile('credit', data);

                                var dataRes = all.banks.core.services.parseHtml(data);
                                var serializeForm = dataRes.find("form").serializeArray();
                                var obj = {};
                                serializeForm.forEach((vals) => {
                                    obj[vals.name] = vals.value;
                                });
                                this.params = obj;
                                await getData(dataRes)
                            }
                        }


                    }
                }
            } else {
                let numberAcc = this.accSelect.match(/(\d+)[\-](\d+)/g);
                if (numberAcc) {
                    var accNumber = numberAcc[0].split("-");
                    var branchNumber = accNumber[0];
                    var accountNumber = accNumber[1];

                    dataRes.find("#creditCards .creditCardEntry").each(function (i111, childTable) {
                        const tableTr = $(childTable).find(".foundActionsTables table.ccTable1 tbody tr");
                        if (!$(childTable).find('.error_msg').length && tableTr.length) {
                            const nextTotal = $(childTable).find('.divMisgeret').eq(0).find('.paddingBottom2').eq(0).find('span.NIS').text().replace(/[^\d\.-]/g, "")
                            const cartShorftNumber = $(childTable).find('.cartShorftNumber').text();
                            myEmitterLogs(15, Number(cartShorftNumber.replace(/\D/g, "")));

                            $(tableTr).each(function (i, v) {
                                const td = $(v).children("td");

                                let totalPaymentsSum = null;
                                let currentPaymentNumSum = null;

                                const payments = $(v).find('.wrapperCCDetailsInner  .CCDetailsData').text()
                                if (payments && payments.includes('תשלום')) {
                                    const getPaymentsNum = payments.match(/(\d+)[/](\d+)/g)
                                    if (getPaymentsNum && getPaymentsNum.length) {
                                        const arrPayments = getPaymentsNum[0].split('/')
                                        if (arrPayments && arrPayments.length) {
                                            currentPaymentNumSum = Number(arrPayments[0])
                                            totalPaymentsSum = Number(arrPayments[1])
                                        }
                                    }
                                }

                                let comment = '';
                                const comments = $(v).find('.wrapperCCDetailsInner  .CCDetailsData.Madad')
                                if (comments.length) {
                                    comment = comments.text()
                                }

                                all.banks.generalVariables.allDataArrAshrai.push({
                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                    "Token": all.banks.accountDetails.bank.token,
                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                    'AccountNumber': accountNumber,
                                    'BranchNumber': branchNumber,
                                    "NextBillingDate": all.banks.core.services.convertDateAll(new Date('20' + td.eq(0).find('span').attr('sort').slice(0, 8).replace(/\//g, ','))),
                                    "CardNumber": Number(cartShorftNumber.replace(/\D/g, "")),
                                    "CardType": all.banks.core.services.getTypeCard(cartShorftNumber),
                                    "ValueDate": all.banks.core.services.convertDateAll(new Date('20' + td.eq(1).find('span').attr('sort').slice(0, 8).replace(/\//g, ','))),
                                    "TransDesc": td.eq(2).text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s\s+/g, ""),
                                    "original_total": parseMinusNumbers(td.eq(3).text().replace(/[^\d\.-]/g, "")),
                                    "TransTotal": $(v).attr('sum'),
                                    "CardStatus": null,
                                    "TransCategory": null,
                                    "TotalPayments": totalPaymentsSum,
                                    "CurrentPaymentNum": currentPaymentNumSum,
                                    "comment": comment,
                                    "indFakeDate": 0,
                                    "currency_id": 1,
                                    "ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(td.eq(3).text()),
                                    "NextCycleTotal": nextTotal,
                                });
                            })
                        }
                    })

                    // const debitCardItem = dataRes.find(".debitCardsList li.debitCardItem");
                    // if (debitCardItem.length) {
                    //     for (let idx = 0; idx < debitCardItem.length; idx++) {
                    //         const childTable = debitCardItem[idx];
                    //         const tableTr = $(childTable).find(".creditCardEntry");
                    //         if (!$(childTable).find('.error_msg').length && tableTr.length) {
                    //             const cc_number = tableTr.attr('cc_number');
                    //             myEmitterLogs(15, Number(cc_number.replace(/\D/g, "")));
                    //
                    //             const debitCardContinue = tableTr.find('.debitCardContinue');
                    //             let CCIssuingCompanyCode;
                    //             if (debitCardContinue.length) {
                    //                 CCIssuingCompanyCode = debitCardContinue.attr('CCIssuingCompanyCode');
                    //             }
                    //             const fromDate = tableTr.find('.fromDate').val().split('.');
                    //             const toDate = tableTr.find('.toDate').val().split('.');
                    //             const urlDebit = 'https://services.bankjerusalem.co.il/credit/pages/BojHandler.ashx?Command=Xactions&debitCardNumber=' + cc_number + '&fromDate=' + (fromDate[2] + fromDate[1] + fromDate[0]) + '&toDate=' + (toDate[2] + toDate[1] + toDate[0]) + '&companyCode=' + CCIssuingCompanyCode + '&_=' + new Date().getTime()
                    //             const argsDebit = await this.httpGet(
                    //                 urlDebit,
                    //                 "https://services.bankjerusalem.co.il/credit/pages/credit-card.aspx",
                    //                 this.cookies
                    //             );
                    //             const [errorDebit, responseDebit, dataDebit] = [...argsDebit];
                    //             if (dataDebit && dataDebit.length) {
                    //                 dataDebit.forEach(v => {
                    //                     all.banks.generalVariables.allDataArrAshrai.push({
                    //                         "TargetId": all.banks.accountDetails.bank.targetId,
                    //                         "Token": all.banks.accountDetails.bank.token,
                    //                         "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                    //                         "ExporterId": all.banks.spiderConfig.spiderId,
                    //                         'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                    //                         'AccountNumber': accountNumber,
                    //                         'BranchNumber': branchNumber,
                    //                         "NextBillingDate": all.banks.core.services.convertDateAll(new Date('20' + td.eq(0).find('span').attr('sort').slice(0, 8).replace(/\//g, ','))),
                    //                         "CardNumber": Number(cc_number.replace(/\D/g, "")),
                    //                         "CardType": 30,
                    //                         "ValueDate": all.banks.core.services.convertDateAll(v.CCXactionDate),
                    //                         "TransDesc": v.CCXactionBusiness.replace(/\n/g, "").replace(/\t/g, "").replace(/\s\s+/g, ""),
                    //                         "original_total": v.CCXactionAmount,
                    //                         "TransTotal": v.CCXactionDebitAmount,
                    //                         "CardStatus": null,
                    //                         "TransCategory": null,
                    //                         "TotalPayments": 1,
                    //                         "CurrentPaymentNum": 1,
                    //                         "comment": v.CCXactionName + '' + v.BojNote,
                    //                         "indFakeDate": 0,
                    //                         "currency_id": 1,
                    //                         "ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(v.CCCurrencyName),
                    //                         "NextCycleTotal": null,
                    //                     });
                    //
                    //                 });
                    //             }
                    //         }
                    //     }
                    // }


                }
            }
            if (all.banks.generalVariables.allDataArrAshrai && all.banks.generalVariables.allDataArrAshrai.length) {
                let source = JSON.parse(JSON.stringify(all.banks.generalVariables.allDataArrAshrai));
                const dateRE = /^(\d{2})[\/\- ](\d{2})[\/\- ](\d{4})/;
                source.sort(function (a, b) {
                    if (a.NextBillingDate) {
                        a = a.NextBillingDate.replace(dateRE, "$3$2$1");
                    }
                    if (b.NextBillingDate) {
                        b = b.NextBillingDate.replace(dateRE, "$3$2$1");
                    }
                    if (a < b) return 1;
                    if (a > b) return -1;
                    return 0;
                });
                all.banks.generalVariables.allDataArrAshrai = source;
            }
            this.sendCardsCtrl(urls);
        } catch (e) {
            console.log(e)
        }
    }

    async getLoans(urls) {
        function parseMinusNumbers(number) {
            if (number.includes('-')) {
                return ('-' + number.replace(/[^\d\.]/g, ""))
            }
            return number
        }

        try {
            myEmitterLogs(14);

            console.log('start getLoans')
            var args = await this.httpGet(
                "https://services.bankjerusalem.co.il/loans/Pages/loans.aspx",
                urls,
                this.cookies
            );
            var [error, response, data] = [...args];
            // writeHtmlFile('loans', data);

            var dataRes = all.banks.core.services.parseHtml(data);
            var serializeForm = dataRes.find("form").serializeArray();
            var obj = {};
            serializeForm.forEach((vals) => {
                obj[vals.name] = vals.value;
            });
            this.params = obj;
            const typeSelect = typeof this.accSelect;
            console.log('this.accSelect ', this.accSelect)

            if (typeSelect !== 'string') {
                for (let i = 0; i < this.accSelect.length; i++) {
                    let option = $(this.accSelect[i]);
                    let val = option.val();
                    let numberAcc = option.text().match(/(\d+)[\-](\d+)/g);
                    console.log('numberAcc ', numberAcc, 'val ', val)

                    if (numberAcc) {
                        var accNumber = numberAcc[0].split("-");
                        var branchNumber = accNumber[0];
                        var accountNumber = accNumber[1];
                        myEmitterLogs(33, accountNumber);
                        const getData = async () => {
                            if (dataRes.find(".depositsAndLoans.Loans .depositsEntry").length) {
                                dataRes.find(".depositsAndLoans.Loans .depositsEntry").each(function (i111, childTable) {

                                    const loanName = $(childTable).find(".depositTitleName").text();
                                    const loanNumber = Number($(childTable).find(".depositTitleNumber").text().replace(/\D/g, ""));
                                    const loanIntrest = $(childTable).find(".rateAmountLoans .detailsValue").text().split('=');
                                    let loanFinish = null;
                                    let loanTotalLeft = null;
                                    let loanDate = null;
                                    let loanOriginalTotal = null;
                                    let nextPaymentTotal = null;
                                    let loanNextPaymentDate = null;

                                    $(childTable).find(".detailsName").each(function (i, v) {
                                        const text = $(v).text();
                                        if (text === "תאריך סיום") {
                                            loanFinish = $(v).next().next().text();
                                            if (loanFinish.length) {
                                                loanFinish = all.banks.core.services.convertDateAll(new Date(Number(loanFinish.split('.')[2]), Number(loanFinish.split('.')[1]), Number(loanFinish.split('.')[0])))
                                            }
                                        }
                                        if (text === "יתרה משוערכת") {
                                            loanTotalLeft = $(v).next().next().text();
                                            if (loanTotalLeft.length) {
                                                loanTotalLeft = loanTotalLeft.replace(/[^\d\.-]/g, "")
                                            }
                                        }
                                        if (text === "תאריך ביצוע") {
                                            loanDate = $(v).next().next().text();
                                            if (loanDate.length) {
                                                loanDate = all.banks.core.services.convertDateAll(new Date(Number(loanDate.split('.')[2]), Number(loanDate.split('.')[1]), Number(loanDate.split('.')[0])))
                                            }
                                        }
                                        if (text === "סכום מקורי") {
                                            loanOriginalTotal = $(v).next().next().text();
                                            if (loanOriginalTotal.length) {
                                                loanOriginalTotal = loanOriginalTotal.replace(/[^\d\.-]/g, "")
                                            }
                                        }

                                        if (text.includes("תשלום הבא")) {
                                            loanNextPaymentDate = text.replace(/[^\d\.-]/g, "");
                                            loanNextPaymentDate = loanNextPaymentDate.split('.');
                                            if (loanNextPaymentDate.length) {
                                                loanNextPaymentDate = all.banks.core.services.convertDateAll(new Date(Number(loanNextPaymentDate[2]), Number(loanNextPaymentDate[1]), Number(loanNextPaymentDate[0])))
                                            }
                                            nextPaymentTotal = $(v).next().next().text();
                                            if (nextPaymentTotal.length) {
                                                nextPaymentTotal = nextPaymentTotal.replace(/[^\d\.-]/g, "")
                                            }
                                        }
                                    })

                                    all.banks.generalVariables.allDataArrLoan.push({
                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                        "Token": all.banks.accountDetails.bank.token,
                                        'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                        'AccountNumber': accountNumber,
                                        'BranchNumber': branchNumber,
                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                        "LoanName": loanName,
                                        "LoanNumber": loanNumber,
                                        "LoanIntrest": (loanIntrest[loanIntrest.length > 1 ? 1 : 0].replace(/[^\d\.-]/g, "")),
                                        "LoanFinish": loanFinish,
                                        "LoanTotalLeft": loanTotalLeft,
                                        "LoanDate": loanDate,
                                        "PaymentsNumberLeft": null,
                                        "LoanOriginalTotal": loanOriginalTotal,
                                        "NextPaymentTotal": nextPaymentTotal,
                                        "LoanNextPaymentDate": loanNextPaymentDate,
                                        "LoanPigurTotal": null
                                    });

                                })
                            }
                        }
                        if (option.is(':selected')) {
                            await getData(dataRes)
                        } else {
                            await this.httpPostSoapCredit();
                            this.params["MSOTlPn_View"] = "0";
                            this.params["MSOTlPn_Button"] = "none";
                            this.params["ctl00$PlaceHolderMain$AccountsDDL$ddlAccounts"] = val;
                            this.params["__EVENTTARGET"] = "ctl00$PlaceHolderMain$AccountsDDL$ddlAccounts";

                            var args = await this.httpPost(
                                "https://services.bankjerusalem.co.il/loans/Pages/loans.aspx",
                                "https://services.bankjerusalem.co.il/loans/Pages/loans.aspx",
                                this.cookies,
                                this.params
                            );
                            var [error, response, data] = [...args];

                            var rid = response.headers.location;
                            if (rid !== undefined) {
                                var args = await this.httpGet(
                                    rid,
                                    "https://services.bankjerusalem.co.il/loans/Pages/loans.aspx",
                                    this.cookies
                                );
                                var [error, response, data] = [...args];
                                // writeHtmlFile('credit', data);

                                var dataRes = all.banks.core.services.parseHtml(data);
                                var serializeForm = dataRes.find("form").serializeArray();
                                var obj = {};
                                serializeForm.forEach((vals) => {
                                    obj[vals.name] = vals.value;
                                });
                                this.params = obj;
                                await getData(dataRes)
                            }
                        }


                    }
                }
            } else {
                let numberAcc = this.accSelect.match(/(\d+)[\-](\d+)/g);
                if (numberAcc) {
                    var accNumber = numberAcc[0].split("-");
                    var branchNumber = accNumber[0];
                    var accountNumber = accNumber[1];
                    if (dataRes.find(".depositsAndLoans.Loans .depositsEntry").length) {
                        dataRes.find(".depositsAndLoans.Loans .depositsEntry").each(function (i111, childTable) {

                            const loanName = $(childTable).find(".depositTitleName").text();
                            const loanNumber = Number($(childTable).find(".depositTitleNumber").text().replace(/\D/g, ""));
                            const loanIntrest = $(childTable).find(".rateAmountLoans .detailsValue").text().split('=');
                            let loanFinish = null;
                            let loanTotalLeft = null;
                            let loanDate = null;
                            let loanOriginalTotal = null;
                            let nextPaymentTotal = null;
                            let loanNextPaymentDate = null;

                            $(childTable).find(".detailsName").each(function (i, v) {
                                const text = $(v).text();
                                if (text === "תאריך סיום") {
                                    loanFinish = $(v).next().next().text();
                                    if (loanFinish.length) {
                                        loanFinish = all.banks.core.services.convertDateAll(new Date(Number(loanFinish.split('.')[2]), Number(loanFinish.split('.')[1]), Number(loanFinish.split('.')[0])))
                                    }
                                }
                                if (text === "יתרה משוערכת") {
                                    loanTotalLeft = $(v).next().next().text();
                                    if (loanTotalLeft.length) {
                                        loanTotalLeft = loanTotalLeft.replace(/[^\d\.-]/g, "")
                                    }
                                }
                                if (text === "תאריך ביצוע") {
                                    loanDate = $(v).next().next().text();
                                    if (loanDate.length) {
                                        loanDate = all.banks.core.services.convertDateAll(new Date(Number(loanDate.split('.')[2]), Number(loanDate.split('.')[1]), Number(loanDate.split('.')[0])))
                                    }
                                }
                                if (text === "סכום מקורי") {
                                    loanOriginalTotal = $(v).next().next().text();
                                    if (loanOriginalTotal.length) {
                                        loanOriginalTotal = loanOriginalTotal.replace(/[^\d\.-]/g, "")
                                    }
                                }

                                if (text.includes("תשלום הבא")) {
                                    loanNextPaymentDate = text.replace(/[^\d\.-]/g, "");
                                    loanNextPaymentDate = loanNextPaymentDate.split('.');
                                    if (loanNextPaymentDate.length) {
                                        loanNextPaymentDate = all.banks.core.services.convertDateAll(new Date(Number(loanNextPaymentDate[2]), Number(loanNextPaymentDate[1]), Number(loanNextPaymentDate[0])))
                                    }
                                    nextPaymentTotal = $(v).next().next().text();
                                    if (nextPaymentTotal.length) {
                                        nextPaymentTotal = nextPaymentTotal.replace(/[^\d\.-]/g, "")
                                    }
                                }
                            })

                            all.banks.generalVariables.allDataArrLoan.push({
                                "TargetId": all.banks.accountDetails.bank.targetId,
                                "Token": all.banks.accountDetails.bank.token,
                                'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                'AccountNumber': accountNumber,
                                'BranchNumber': branchNumber,
                                "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                "ExporterId": all.banks.spiderConfig.spiderId,
                                "LoanName": loanName,
                                "LoanNumber": loanNumber,
                                "LoanIntrest": (loanIntrest[loanIntrest.length > 1 ? 1 : 0].replace(/[^\d\.-]/g, "")),
                                "LoanFinish": loanFinish,
                                "LoanTotalLeft": loanTotalLeft,
                                "LoanDate": loanDate,
                                "PaymentsNumberLeft": null,
                                "LoanOriginalTotal": loanOriginalTotal,
                                "NextPaymentTotal": nextPaymentTotal,
                                "LoanNextPaymentDate": loanNextPaymentDate,
                                "LoanPigurTotal": null
                            });

                        })
                    }
                }
            }

            this.sendLoanCtrl();
        } catch (e) {
            console.log(e)
        }
    }


    async logout() {
        try {
            await this.httpPostSoap();
            this.params["__EVENTTARGET"] = "ctl00$WelcomeV3$lbLogout";
            var args = await this.httpPost(
                "https://services.bankjerusalem.co.il/Pages/Trans.aspx?LogoutClick=1",
                null,
                this.cookies,
                this.params
            );
            await clearProxy();

            writeLog("killVpn");
            monitorVpn.killVpn(() => {
                myEmitterLogs(25);
            });
        } catch (e) {
            await clearProxy();

            writeLog("killVpn");
            monitorVpn.killVpn(() => {
                myEmitterLogs(25);
            });
        }
    }

    strToSumOrNull(val) {
        if (!val || typeof val !== 'string') {
            return null;
        }

        let valPrepared = val.replace(/[^\d\.-]/g, "");
        if (!valPrepared || !(/\d/.test(valPrepared))) {
            return null;
        }
        if (valPrepared.endsWith('-')) {
            valPrepared = valPrepared.slice(-1) + valPrepared.slice(0, -1);
        }
        const valNum = Number(valPrepared);
        return isFinite(valNum) ? valNum : null;
    }
}

all.banks.accounts.bankjerusalem = new bankjerusalem();
