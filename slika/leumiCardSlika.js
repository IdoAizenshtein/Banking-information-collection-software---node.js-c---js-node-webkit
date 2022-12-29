class leumiCardSlika {

    constructor() {
        this.cookies = "";
        this.idxMonth = 0;
        this.idxCards = 0;
        this.eventVal = "";
        this.param = "";
        this.pathUrl = "";
        this.logoutTime = 0;
        this.arrOfCard = [];
        this.monthOfCard = [];
        this.arr = [];

        this.facadeStartUrl = "https://businesslc.max.co.il/home";
        this.facadeCAV = "";
    }

    leumiCardSlikaPost(...args) {
        monitorActivityClass.setIntervalActivity();
        let [url, Referer, cookie, body] = args;
        writeLog("visaPost: " + url);
        return new Promise((resolve, reject) => {
            var options = {
                uri: url,
                family: 4,
                timeout: 40000,
                method: "POST",
                body: body,
                json: true,
                headers: {
                    "Content-Type": "application/json",
                    "Host": "businesslc.max.co.il",
                    "Origin": "https://businesslc.max.co.il",
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
                }
            };
            options.headers.CAV = this.facadeCAV || "V3.32-HF.3.9";
            options.headers.URF = "/personal/reports";
            options.headers.SID = "fe105896-72e3-993b-e6a5-6444e8850b6c";
            options.headers.CID = "";

            if (cookie !== null) {
                options.headers.Cookie = cookie;
            }
            if (Referer !== null) {
                options.headers.Referer = Referer;
            }
            senderReq.sendersServer(options, (error, response, data) => {
                if (!error && response && response.headers["ETag"]) {
                    this.facadeCAV = response.headers["ETag"];
                }
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

    leumiCardSlikaGet(...args) {
        let [url, Referer, cookie] = args;
        monitorActivityClass.setIntervalActivity();
        writeLog("visaRestGet: " + url);
        return new Promise((resolve, reject) => {
            let options = {
                "uri": url,
                "family": 4,
                "method": "GET",
                "timeout": 40000,
                "headers": {
                    "Connection": "keep-alive",
                    'Upgrade-Insecure-Requests': "1",
                    "Host": "businesslc.max.co.il",
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
                }
            }
            if (cookie !== null) {
                options.headers.Cookie = cookie;
            }
            if (Referer !== null) {
                options.headers.Referer = Referer;
            }
            senderReq.sendersServer(options, (error, response, data) => {
                if (!error && response && response.headers["ETag"]) {
                    this.facadeCAV = response.headers["ETag"];
                }
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
                            resolve(true);
                        }
                    }
                } else {
                    resolve(true);
                }
            } catch (e) {
            }
        });
    }

    sendSlikaCtrl() {
        writeLog("sendSlikaCtrl");
        all.banks.core.services.slikaAccount(this.arr)
            .then((arr) => {
                this.logOut();
            })
            .fail((error, resErr) => {
                if (error === 'discard') {
                    this.sendSlikaCtrl();
                }
            });
    }

    leumiCardSlikaNewFacadeExchange(url, method, referrer, requestData) {
        monitorActivityClass.setIntervalActivity();
        writeLog("NEW facade exchange: " + url);
        return new Promise((resolve, reject) => {
            const options = {
                uri: url,
                family: 4,
                timeout: 40000,
                method: method,
                headers: {
                    "Origin": "https://businesslc.max.co.il",
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
                }
            };
            if (this.facadeStartUrl !== url) {
                options.headers.CAV = this.facadeCAV || "V3.32-HF.3.9";
                options.headers.URF = "";
                options.headers.SID = "cd07c510-584d-cc1a-8452-7e563517fc46";
                options.headers.SessionId = "6160298a-3899-f4c0-6526-01cedf79bcc7";
                options.headers.CID = "04b956bc-80da-0702-bc11-e54542ed50f1";
            }
            if (method === 'POST' && requestData) {
                options.json = true;
                options.body = requestData;
            }
            if (this.cookie) {
                options.headers.Cookie = this.cookie;
            }
            if (referrer) {
                options.headers.Referer = referrer;
            }
            senderReq.sendersServer(options, (error, response, data) => {
                if (!error && response && response.headers["ETag"]) {
                    this.facadeCAV = response.headers["ETag"];
                }
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

    async login() {
        try {
            writeLog("login");
            let [error, response, data] = await this.leumiCardSlikaNewFacadeExchange(
                "https://businesslc.max.co.il/home",
                "GET");


            [error, response, data] = await this.leumiCardSlikaNewFacadeExchange(
                "https://businesslc.max.co.il/api/auth/login/password",
                "POST",
                "https://businesslc.max.co.il/api/auth/login/password",
                {
                    "password": all.banks.accountDetails.bank.password.slice(0, 14),
                    "reEnterPassword": null,
                    "currentPassword": null,
                    "termsOfUse": false,
                    "userName": all.banks.accountDetails.bank.username,
                    "idNumber": null
                }
            );
            if (response.statusCode === 200 && data && data.result && data.result.userDetails) {
                if (data.returnCode === 14) {
                    myEmitterLogs(6);
                    writeLog("Password expired.");
                    return false;
                }
                // if (data.returnCode === 15) {
                //     myEmitterLogs(7);
                //     writeLog("Your password is going to expire.");
                //     return false;
                // }
//				const rid = response.headers.location;
//				if (rid.includes('PasswordExpired.aspx')) {
//					myEmitterLogs(6);
//					writeLog("Password expired.");
//					return false;
//				}
//				if (rid.includes('LoginAgreement.aspx')) {
//					myEmitterLogs(36);
//					writeLog("Login agreement required.");
//					return false;
//				}

                if (all.banks.openBankPage) {
                    var cookSplit = this.cookies.split(";");
                    var i1, len1 = cookSplit.length;
                    for (i1 = 0; i1 < len1; i1++) {
                        var v1 = cookSplit[i1];
                        if (v1 !== "") {
                            var nameExist = v1.split("=")[0].replace(/\s/g, "");
                            var valExist = v1.split("=")[1].replace(/\s/g, "");
                            win.cookies.set({
                                url: 'https://businesslc.max.co.il',
                                name: nameExist,
                                domain: '.max.co.il',
                                value: valExist
                            })
                        }
                    }
                    setTimeout(() => all.banks.core.services.openBankPage('https://businesslc.max.co.il/personal/reports'),
                        1000);
                    return;
                } else {
                    this.loadData();
                }
            } else {
                myEmitterLogs(5);
            }
        } catch (e) {
            myEmitterLogs(9, "failed during login", e);
        }
    }

    getTypeCard(id) {
        if (id === 1) {
            return 81; //"Visa"
        }
        if (id === 2) {
            return 88; //"MasterCard"
        }
        if (id === 3) {
            return 30; //"PrivateLabel"
        }
        if (id === 4) {
            return 82; //"IsraCard"
        }
        if (id === 5) {
            return 30; //"UnionPay"
        }
        return 30;
    }

    async loadData() {
        try {
            const uriGetBrunches = "https://businesslc.max.co.il/api/registered/reports/getFilterData?v=V3.32-HF.3.9";
            const args = await this.leumiCardSlikaGet(
                uriGetBrunches,
                "https://businesslc.max.co.il/personal/reports",
                this.cookies
            );
            let [error, response, data] = [...args];
            if (error) {
                throw error;
            } else if (response.statusCode == 302 && response.headers.location.includes('Error.aspx')) {
                throw new Error('Got redirect ' + response.headers.location);
            }
            if (data) {
                data = JSON.parse(data);
            }
            if (data && data.result && data.result.branches && data.result.branches.length) {
                const branches = data.result.branches;
                for (let idx = 0; idx < branches.length; idx++) {
                    const uriGetData = "https://businesslc.max.co.il/api/registered/reports/getReportsData";
                    const dateToday = new Date();
                    dateToday.setMonth(dateToday.getMonth() - 3);
                    const dateFrom = dateToday.toLocaleString('en-US');
                    dateToday.setMonth(dateToday.getMonth() + 36);
                    const dateTo = dateToday.toLocaleString('en-US');
                    const reqDataParams = {
                        "filter": {
                            "branches": [Number(branches[idx].id)],
                            "dates": {
                                "period": null,
                                "startDate": dateFrom,
                                "endDate": dateTo
                            },
                            "mode": "credits",
                            "advanced": {
                                "cardNum": null,
                                "dealFrom": null,
                                "dealTo": null,
                                "creditFrom": null,
                                "creditTo": null,
                                "batchId": null,
                                "transactionsType": null,
                                "accountNum": null,
                                "brands": null,
                                "subGroups": null,
                                "clearingNum": null,
                                "currency": null
                            }
                        },
                        "page": {"index": 1, "size": 100},
                        "sort": {"active": "settDepositDate", "direction": "asc"},
                        "breadCrumbs": ["credits", "branchCredits"]
                    };
                    let [error0, response0, data0] = await this.leumiCardSlikaPost(
                        uriGetData,
                        "https://businesslc.max.co.il/personal/reports",
                        this.cookies,
                        reqDataParams
                    );
                    if (error0) {
                        throw error0;
                    } else if (response0.statusCode === 302 && response0.headers.location.includes('Error.aspx')) {
                        throw new Error('Got redirect ' + response0.headers.location);
                    }
                    if (data0 && data0.result && data0.result.numOfRecords && data0.result.numOfRecords > 100) {
                        reqDataParams.page.size = data0.result.numOfRecords + 1;
                        [error0, response0, data0] = await this.leumiCardSlikaPost(
                            uriGetData,
                            "https://businesslc.max.co.il/personal/reports",
                            this.cookies,
                            reqDataParams
                        );
                        if (error0) {
                            throw error0;
                        } else if (response0.statusCode === 302 && response0.headers.location.includes('Error.aspx')) {
                            throw new Error('Got redirect ' + response0.headers.location);
                        }
                    }
                    if (data0 && data0.result && data0.result.data && data0.result.data.length) {
                        const slikaAccount = Number(branches[idx].id);
                        const solek_desc = branches[idx].nameLegal;
                        data0.result.data.forEach((row) => {
                            const cardType = row.subGroupName !== '' ? (row.subGroupName.includes('MC') ? all.banks.core.services.getTypeCreditCard('מאסטרקארד')
                                : row.subGroupName.includes('ויזה') ?
                                    all.banks.core.services.getTypeCreditCard('ויזה')
                                    : row.subGroupName.includes('ישראכרט') ?
                                        all.banks.core.services.getTypeCreditCard('ישראכרט') :
                                        row.subGroupName.includes('דיינרס') ?
                                            all.banks.core.services.getTypeCreditCard('דיינרס')
                                        : 30) : row.productId ? this.getTypeCard(Number(row.productId)) : 30;
                            this.arr.push({
                                "target_idStr": all.banks.accountDetails.bank.targetId,
                                "tokenStr": all.banks.accountDetails.bank.token,
                                "bankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                "extractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                "ExporterId": all.banks.spiderConfig.spiderId,
                                "solek_desc": solek_desc,
                                "slikaAccount": slikaAccount,
                                "valueDate": row.settDepositDate,
                                "grandTotal": row.grossAmount,
                                "regularPaymentsTotal": row.netAmount,
                                "nextTotal": row.netAmount,
                                "paymentsTotal": 0,
                                "cardType": cardType
                            });
                        })
                    }
                }
            } else {
                const uriGetData = "https://businesslc.max.co.il/api/registered/reports/getReportsData";
                const dateToday = new Date();
                dateToday.setMonth(dateToday.getMonth() - 3);
                const dateFrom = dateToday.toLocaleString('en-US');
                dateToday.setMonth(dateToday.getMonth() + 36);
                const dateTo = dateToday.toLocaleString('en-US');
                const reqDataParams = {
                    "filter": {
                        "branches": [],
                        "dates": {
                            "period": "",
                            "startDate": dateFrom,
                            "endDate": dateTo
                        },
                        "mode": "credits",
                        "advanced": {
                            "cardNum": "",
                            "dealFrom": "",
                            "dealTo": "",
                            "creditFrom": "",
                            "creditTo": "",
                            "batchId": "",
                            "transactionsType": "",
                            "accountNum": "",
                            "brands": "",
                            "subGroups": "",
                            "clearingNum": "",
                            "currency": null
                        }
                    },
                    "page": {"index": 1, "size": 100},
                    "sort": {"active": "settDepositDate", "direction": "asc"},
                    "breadCrumbs": ["credits"]
                }
                let [error0, response0, data0] = await this.leumiCardSlikaPost(
                    uriGetData,
                    "https://businesslc.max.co.il/personal/reports",
                    this.cookies,
                    reqDataParams
                );
                if (error0) {
                    throw error0;
                } else if (response0.statusCode === 302 && response0.headers.location.includes('Error.aspx')) {
                    throw new Error('Got redirect ' + response0.headers.location);
                }
                if (data0 && data0.result && data0.result.numOfRecords && data0.result.numOfRecords > 100) {
                    reqDataParams.page.size = data0.result.numOfRecords + 1;
                    [error0, response0, data0] = await this.leumiCardSlikaPost(
                        uriGetData,
                        "https://businesslc.max.co.il/personal/reports",
                        this.cookies,
                        reqDataParams
                    );
                    if (error0) {
                        throw error0;
                    } else if (response0.statusCode === 302 && response0.headers.location.includes('Error.aspx')) {
                        throw new Error('Got redirect ' + response0.headers.location);
                    }
                }
                if (data0 && data0.result && data0.result.data && data0.result.data.length) {
                    data0.result.data.forEach((row) => {
                        const cardType = row.subGroupName !== '' ? (row.subGroupName.includes('MC') ? all.banks.core.services.getTypeCreditCard('מאסטרקארד')
                            : row.subGroupName.includes('ויזה') ?
                                all.banks.core.services.getTypeCreditCard('ויזה')
                                : row.subGroupName.includes('ישראכרט') ?
                                    all.banks.core.services.getTypeCreditCard('ישראכרט') :
                                    row.subGroupName.includes('דיינרס') ?
                                        all.banks.core.services.getTypeCreditCard('דיינרס')
                                        : 30) : row.productId ? this.getTypeCard(Number(row.productId)) : 30;


                        const slikaAccount = Number(row.merchantId);
                        const solek_desc = row.merchantName;
                        this.arr.push({
                            "target_idStr": all.banks.accountDetails.bank.targetId,
                            "tokenStr": all.banks.accountDetails.bank.token,
                            "bankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                            "extractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                            "ExporterId": all.banks.spiderConfig.spiderId,
                            "solek_desc": solek_desc,
                            "slikaAccount": slikaAccount,
                            "valueDate": row.settDepositDate,
                            "grandTotal": row.grossAmount,
                            "regularPaymentsTotal": row.netAmount,
                            "nextTotal": row.netAmount,
                            "paymentsTotal": 0,
                            "cardType": cardType
                        });
                    })
                }
            }

        } catch (ex) {
            myEmitterLogs(9, ex);
            this.logOut(false);
            return false;
        }
        if (this.arr.length) {
            writeLog('Finished to run and start to send data');
            this.sendSlikaCtrl();
        } else {
            this.logOut(true);
        }
    }

    async logOut(reportStatus = true) {
        writeLog("logOut");
        await this.leumiCardSlikaGet(
            "https://businessinfo.max.co.il/logout.aspx",
            "https://businesslc.max.co.il/",
            this.cookies
        );
        writeLog("killVpn");
        monitorVpn.killVpn(() => {
            if (reportStatus) {
                myEmitterLogs(25);
            }
        });
    }
}

all.banks.accounts.leumiCardSlika = new leumiCardSlika();
