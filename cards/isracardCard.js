var https = require('https');

//test unclose br
class israCard {
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
    }

    isracardPost(...args) {
        monitorActivityClass.setIntervalActivity();
        let [url, Referer, cookie, body, paramHeader] = args;
        writeLog("isracardPost: " + url);
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
                    "Host": `${this.rootUrl}`,
                    "Origin": `https://${this.rootUrl}`,
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
                }
            };
            if (paramHeader !== null) {
                paramHeader.forEach((values) => {
                    options.headers[Object.keys(values)[0]] = values[Object.keys(values)[0]];
                });
            }
            if (cookie !== null) {
                options.headers.Cookie = cookie;
            }
            if (Referer !== null) {
                options.headers.Referer = Referer;
            }
            options.gzip = true;
            senderReq.sendersServer(options, (error, response, data) => {
                if (response !== undefined) {
                    if (response.headers !== undefined) {
                        if (response.headers["set-cookie"]) {
                            this.getSetCookies(response.headers["set-cookie"])
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

    isracardRestGet(...args) {
        let [url, Referer, cookie, paramHeader, getCookieSep] = args;
        monitorActivityClass.setIntervalActivity();
        writeLog("isracardRestGet: " + url);
        return new Promise((resolve, reject) => {
            let options = {
                "uri": url,
                "family": 4,
                "method": "GET",
                "timeout": 40000,
                "headers": {
                    "Connection": "keep-alive",
                    "Upgrade-Insecure-Requests": "1",
                    "Host": `${this.rootUrl}`,
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
                }
            }
            if (cookie !== null) {
                options.headers.Cookie = cookie;
            }
            if (Referer !== null) {
                options.headers.Referer = Referer;
            }
            if (paramHeader !== undefined) {
                paramHeader.forEach((values) => {
                    options.headers[Object.keys(values)[0]] = values[Object.keys(values)[0]];
                });
            }
            options.gzip = true;
            senderReq.sendersServer(options, (error, response, data) => {
                if (response !== undefined) {
                    if (response.headers !== undefined) {
                        if (response.headers["set-cookie"]) {
                            if (getCookieSep == undefined) {
                                this.getSetCookies(response.headers["set-cookie"])
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
                } else {
                    resolve([error, response, data]);
                }
            });
        });
    }

    isracardRestGetBrowser(...args) {
        writeLog("isracardRestGetBrowser: s1749017430.t.eloqua.com");
        return new Promise((resolve, reject) => {
            https.request({
                hostname: 's1749017430.t.eloqua.com',
                port: 443,
                path: '/visitor/v200/svrGP?pps=70&siteid=1749017430&ref=&ms=818',
                method: 'GET',
                rejectUnauthorized: false
            }, (res) => {
                resolve(res);
            }).on('error', (e) => {
                console.error(e);
            }).end();
        })
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
                                        cookSplit[i1] = v.split(";")[0] + ";";
                                    }
                                }
                            }
                        }
                        if (exist === 0) {
                            cookSplit.unshift(v.split(";")[0])
                        }
                        if (len === i + 1) {
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

    sendCardsCtrl() {
        writeLog("sendCardsCtrl");
        all.banks.core.services.sendCards(this.arr)
            .then((arr) => {
                this.logOut();
            })
            .fail((error, resErr) => {
                if (error == 'discard') {
                    this.sendCardsCtrl();
                }
            });
    }

    async login() {
        try {
            const now = new Date();
            const dateTo = new Date(now.getFullYear(), now.getMonth() + 1, 1);
//            let dateTo = new Date();
//            dateTo.setMonth(dateTo.getMonth() + 1);
            for (let i = 0; i < all.banks.accountDetails.ccardMonth; i++) {
                let dateFrom = new Date(dateTo.getFullYear(), (dateTo.getMonth() - i), 1);
                this.monthOfCard.push({
                    month: ("0" + (dateFrom.getMonth() + 1)).slice(-2),
                    year: dateFrom.getFullYear().toString()
                });
            }

            if (parseFloat(all.banks.accountDetails.bank.BankNumber) == 22 || parseFloat(all.banks.accountDetails.bank.BankNumber) == 23) {
                this.rootUrl = "digital.isracard.co.il";
                this.defaultCardType = 22;
                this.users = {
                    id: all.banks.accountDetails.bank.username.slice(0, 9),
                    cardSuffix: all.banks.accountDetails.bank.autoCode.slice(0, 6),
                    Sisma: all.banks.accountDetails.bank.password.slice(0, 20).replace(/\W+/g, ''),
                    paramLogon: "performLogonI",
                    companyCode: "11"
                }
            } else {
                this.rootUrl = "he.americanexpress.co.il";
                this.defaultCardType = 25;
                const idVal = all.banks.accountDetails.bank.autoCode.length > all.banks.accountDetails.bank.username.length
                    ? all.banks.accountDetails.bank.autoCode : all.banks.accountDetails.bank.username;
                const cardSuffixVal = all.banks.accountDetails.bank.autoCode.length > all.banks.accountDetails.bank.username.length
                    ? all.banks.accountDetails.bank.username : all.banks.accountDetails.bank.autoCode;
                this.users = {
                    id: idVal.slice(0, 9),
                    cardSuffix: cardSuffixVal.slice(0, 6),
                    Sisma: all.banks.accountDetails.bank.password.slice(0, 20).replace(/\W+/g, ''),
                    paramLogon: "performLogonA",
                    companyCode: "77"
                }
            }

            if ((this.users.Sisma.length < 8) || (this.users.cardSuffix.length < 6)) {
                myEmitterLogs(5, (this.users.Sisma.length < 8) ? 'יש להזין 8-20 ספרות ואותיות באנגלית' : 'יש להזין ערך באורך הנדרש');
                return;
            }

            writeLog("login: " + this.rootUrl);
            var args = await this.isracardRestGet(
                `https://${this.rootUrl}/personalarea/login/`,
                null,
                null
            );
            var [error, response, data] = [...args];

//			var clientIp = data.split("clientIp = '")[1].split("'")[0];
            var dataRes = all.banks.core.services.parseHtml(data);
            this.token = dataRes.find("input[name='__RequestVerificationToken']").val();
            //console.log(clientIp, this.token);

            var res = await this.isracardRestGetBrowser();
            var cook, cookSplit = [];
            if (res !== undefined) {
                if (res.headers !== undefined) {
                    var cooki = res.headers['set-cookie'];
                    if (cooki) {
                        var i, len = cooki.length;
                        if (len) {
                            for (i = 0; i < len; i++) {
                                var v = cooki[i];
                                cookSplit.unshift(v.split(";")[0]);
                                if (len === i + 1) {
                                    cook = cookSplit.join(";");
                                }
                            }
                        }
                    }
                }
            }
            //	console.log(cook)

            var rid = res.headers.location;
            //console.log(rid)
            var args;
            if (rid !== undefined) {
                args = await this.isracardRestGet(
                    rid.startsWith('http') ? rid : `https:${rid}`, // `https:${rid}`,
                    `https://${this.rootUrl}/personalarea/login/`,
                    cook,
                    [
                        {
                            "Host": "s1749017430.t.eloqua.com"
                        }
                    ],
                    true
                );
            }

            var [error, response, data] = [...args];
            var eloquaCustomerGUID = !!data && !data.includes('<!DOCTYPE html>') ? (new Function('return ' + data))()() : null;
            //console.log(eloquaCustomerGUID)

            if (!!eloquaCustomerGUID) {
                var args = await this.isracardRestGet(
                    `https://s1749017430.t.eloqua.com/visitor/v200/svrGP?pps=50&siteid=1749017430&DLKey=87c97a25cb6d440e8d59a7e7d391f79e&DLLookup=%3CelqCustomerGUID1%3E${eloquaCustomerGUID}%3C%2FelqCustomerGUID1%3E&ms=818`,
                    `https://${this.rootUrl}/personalarea/login/`,
                    cook,
                    [
                        {
                            "Host": "s1749017430.t.eloqua.com"
                        }
                    ],
                    true
                );
            }

            //console.log(args)
            var args = await this.isracardPost(
                `https://${this.rootUrl}/services/ProxyRequestHandler.ashx`,
                `https://${this.rootUrl}/personalarea/login/`,
                this.cookies,
                {
                    reqName: "GetCustomerGuid",
                    id: this.users.id,
                    countryCode: "212",
                    identityCode: "1"
                },
                [
                    {
                        "__RequestVerificationToken": this.token
                    },
                    {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    }
                ]
            );
            var [error, response, data] = [...args];
            try {
                var response = JSON.parse(data).GetCustomerGuidBean;

            } catch (e) {
                myEmitterLogs(5, 'פרטי כניסה שגויים');
            }

            //console.log(response);

//            var args = await this.isracardPost(
//                    "https://s1749017430.t.eloqua.com/e/f2",
//                    `https://${this.rootUrl}/personalarea/login/`,
//                    this.cookies,
//                    {
//                        elqFormName: "ConvertByAuthentication",
//                        elqSiteID: "1749017430",
//                        elqCustomerGUID: eloquaCustomerGUID,
//                        elqCookieWrite: "0",
//                        convertSourceForm1: "PersonalAreaLogin",
//                        convertSourceFormURL1: `https://${this.rootUrl}/personalarea/login/`,
//                        convertSourceFormIP1: clientIp,
//                        customerID1: response.customerGUID
//                    },
//                    [
//                        {
//                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
//                        },
//                        {
//                            "Host": "s1749017430.t.eloqua.com"
//                        }
//                    ]
//                    );
//            var [error, response, data] = [...args];
//            var args = await this.isracardRestGet(
//                    `https://${this.rootUrl}/ErrorMessages/ErrorMessagesTemplate`,
//                    `https://${this.rootUrl}/personalarea/login/`,
//                    this.cookies
//                    );

            var args;
            if (!!eloquaCustomerGUID) {
                args = await this.isracardPost(
                    `https://${this.rootUrl}/services/ProxyRequestHandler.ashx?reqName=ValidateIdData`,
                    `https://${this.rootUrl}/personalarea/login/`,
                    this.cookies,
                    JSON.stringify({
                        "checkLevel": "1",
                        "idType": "1",
                        "id": this.users.id, //username
                        "cardSuffix": this.users.cardSuffix, //autoCode
                        "companyCode": this.users.companyCode,
                        "countryCode": "212"//,
                        //"applicationSource": "0"
                    }),
                    [
                        {
                            "__RequestVerificationToken": this.token
                        },
                        {
                            "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                        }
                    ]
                );
                var [error, response, data] = [...args];
                //console.log(this.cookies, data, response.headers)

                const validateIdData = JSON.parse(data).ValidateIdDataBean;
                if (!validateIdData) {
                    myEmitterLogs(5);
                    return;
                }
                if (validateIdData.authorizationStatus === '98') {
                    myEmitterLogs(5, validateIdData.authorizationsStatusDescription);
                    return;
                }
                if (validateIdData.authorizationStatus === '1' && validateIdData.message === 'לקוח לא רשום לאתר') {
                    myEmitterLogs(5, validateIdData.message);
                    return;
                }

                const logonBody = {
                    "Sisma": this.users.Sisma,
                    "MisparZihuy": this.users.id,
                    "countryCode": "212",
                    "idType": "1",
                    "cardSuffix": this.users.cardSuffix
                };
                if (validateIdData.userName) {
                    logonBody['KodMishtamesh'] = validateIdData.userName;
                }
                args = await this.isracardPost(
                    `https://${this.rootUrl}/services/ProxyRequestHandler.ashx?reqName=${this.users.paramLogon}`,
                    `https://${this.rootUrl}/personalarea/login/`,
                    this.cookies,
                    JSON.stringify(logonBody),
                    [
                        {
                            "__RequestVerificationToken": this.token
                        },
                        {
                            "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                        }
                    ]
                );
            } else {
                args = await this.isracardPost(
                    `https://${this.rootUrl}/services/ProxyRequestHandler.ashx?reqName=ValidateIdDataNoReg`,
                    `https://${this.rootUrl}/personalarea/login/`,
                    this.cookies,
                    JSON.stringify({
                        "checkLevel": "1",
                        "idType": "1",
                        "id": this.users.id, //username
                        "cardSuffix": this.users.cardSuffix, //autoCode
                        "companyCode": this.users.companyCode,
                        "countryCode": "212",
                        "isGoogleCaptcha": true
                    }),
                    [
                        {
                            "__RequestVerificationToken": this.token
                        },
                        {
                            "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                        }
                    ]
                );
                args = await this.isracardPost(
                    `https://${this.rootUrl}/services/ProxyRequestHandler.ashx?reqName=IsRegisterNoReg`,
                    `https://${this.rootUrl}/personalarea/login/`,
                    this.cookies,
                    JSON.stringify({
                        "idType": "1",
                        "id": this.users.id
                    }),
                    [
                        {
                            "__RequestVerificationToken": this.token
                        },
                        {
                            "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                        }
                    ]
                );
                args = await this.isracardPost(
                    `https://${this.rootUrl}/services/ProxyRequestHandler.ashx?reqName=${this.users.paramLogon}`,
                    `https://${this.rootUrl}/personalarea/login/`,
                    this.cookies,
                    JSON.stringify({
                        "Sisma": this.users.Sisma,
                        "MisparZihuy": this.users.id,
                        "countryCode": "212",
                        "idType": "1",
                        "cardSuffix": this.users.cardSuffix,
                        "isGoogleCaptcha": true
                    }),
                    [
                        {
                            "__RequestVerificationToken": this.token
                        },
                        {
                            "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                        }
                    ]
                );
            }

            var [error, response, data] = [...args];
            // console.log(this.cookies,
            // 	data,
            // 	response.headers);
            var isValid = JSON.parse(data);
            if (isValid.status == "1") {
                var args = await this.isracardRestGet(
                    `http://${this.rootUrl}/personalarea/dashboard/`,
                    `https://${this.rootUrl}/personalarea/login/`,
                    this.cookies
                );
                var [error, response, data] = [...args];
                var args = await this.isracardRestGet(
                    `https://${this.rootUrl}/personalarea/dashboard/`,
                    null,
                    this.cookies
                );
                var [error, response, data] = [...args];
                this.userGuid = data.split("var userGuid = '")[1].split("'")[0];
                // setInterval(() => {
                // 	this.isracardRestGet(
                // 		`https://${this.rootUrl}/services/ProxyRequestHandler.ashx?reqName=CardsList_102Digital&userGuid=NOSESSION_${new Date().getTime()}`,
                // 		`https://${this.rootUrl}/personalarea/transaction-list/`,
                // 		this.cookies
                // 	);
                // }, 60000);
                if (!all.banks.openBankPage) {
                    this.getCardsAsync();
                } else {
                    var cookSplit = this.cookies.split(";");
                    var i1, len1 = cookSplit.length;
                    for (i1 = 0; i1 < len1; i1++) {
                        var v1 = cookSplit[i1];
                        if (v1 !== "") {
                            var nameExist = v1.split("=")[0].replace(/\s/g, "");
                            var valExist = v1.split("=")[1].replace(/\s/g, "");
                            win.cookies.set({
                                url: `https://${this.rootUrl}`,
                                name: nameExist,
                                domain: this.rootUrl,
                                value: valExist
                            })
                        }
                    }
                    setTimeout(() => {
                        all.banks.core.services.openBankPage(`https://${this.rootUrl}/personalarea/transaction-list/`);
                    }, 1000)
                }
            } else if (isValid.status == "3") {
                myEmitterLogs(6);
            } else if (isValid.status == "2") {
                myEmitterLogs(5);
            } else if (isValid.status === 'Validation failed' || isValid.status === '-3') {
                myEmitterLogs(5, isValid.message);
            } else {
                myEmitterLogs(9, 'system unavailable');
            }
        } catch (e) {
            console.log(e);
        }
    }

    async getCardsAsync() {
        try {
            writeLog("תחילת איסוף פרטי תנועות");
            var args = await this.isracardRestGet(
                `https://${this.rootUrl}/services/ProxyRequestHandler.ashx?reqName=CardsList_102Digital&userGuid=${this.userGuid}`,
                `https://${this.rootUrl}/personalarea/transaction-list/`,
                this.cookies
            );
            var [error, response, data] = [...args];
            data = JSON.parse(data);

            if (!("CardsList_102DigitalBean" in data)) {
                myEmitterLogs(9, ': Cards data fetch failed. Got ' + JSON.stringify(data));
                this.logOut(true);
                return;
            }

            let cardsToTraverse = [
                ...(Array.isArray(data["CardsList_102DigitalBean"].Table1) ? data["CardsList_102DigitalBean"].Table1 : []),
                ...(Array.isArray(data["CardsList_102DigitalBean"].Table2) ? data["CardsList_102DigitalBean"].Table2 : []),
                ...(Array.isArray(data["CardsList_102DigitalBean"].Table3) ? data["CardsList_102DigitalBean"].Table3 : []),
            ];

            cardsToTraverse = cardsToTraverse.filter(it => it.cardNumber);
            writeLog("טבלת כרטיסי אשראי ראשית " + JSON.stringify(cardsToTraverse));
            if (cardsToTraverse.length) {
                writeLog("מספר כרטיסי אשראי קיימים: ", cardsToTraverse.length);

                let digForMoreFutureTransactions = true;

                for (let i = 0; i < this.monthOfCard.length && digForMoreFutureTransactions; i++) {
                    writeLog("ריצה על חודש ושנה : " + this.monthOfCard[i].month + " " + this.monthOfCard[i].year);
                    var args = await this.isracardRestGet(
                        `https://${this.rootUrl}/services/ProxyRequestHandler.ashx?reqName=DashboardMonth&userGuid=${this.userGuid}&format=Json&actionCode=0&requestType=&sourceId=1&identityId=&identityCode=&contryCode=&accountNumber=&billingDate=${this.monthOfCard[i].year}-${this.monthOfCard[i].month}-01&cardIndexes=`,
                        `https://${this.rootUrl}/personalarea/transaction-list/`,
                        this.cookies
                    );
                    var [error, response, dataResCards] = [...args];
                    dataResCards = JSON.parse(dataResCards);

                    var args = await this.isracardRestGet(
                        `https://${this.rootUrl}/services/ProxyRequestHandler.ashx?reqName=CardsTransactionsList&userGuid=${this.userGuid}&month=${this.monthOfCard[i].month}&year=${this.monthOfCard[i].year}&requiredDate=N`,
                        `https://${this.rootUrl}/personalarea/transaction-list/`,
                        this.cookies
                    );
                    var [error, response, dataRes] = [...args];
                    dataRes = JSON.parse(dataRes);

                    if (i === 0) {
                        const maxProcessed = Number(this.monthOfCard[i].year + this.monthOfCard[i].month);
                        dataRes.CardsTransactionsListBean.dateList
                            .map((mmSlashYYYY) => {
                                const [month, year] = mmSlashYYYY.split("/");
                                return {
                                    month: month,
                                    year: year,
                                    order: Number(year + month)
                                };
                            })
                            .filter(monyearFuture => monyearFuture.order > maxProcessed)
                            .reverse()
                            .forEach((monyearFuture) => this.monthOfCard.push(monyearFuture));

                    } else if (this.monthOfCard[i].order) {
                        digForMoreFutureTransactions = cardsToTraverse
                            .some((crd) => {
                                return dataRes.CardsTransactionsListBean[`Index${crd.cardIndex}`].CurrentCardTransactions
                                    .some(crdTranses => {
                                        return (Array.isArray(crdTranses.txnIsrael) && crdTranses.txnIsrael.length > 0)
                                            || (Array.isArray(crdTranses.txnAbroad) && crdTranses.txnAbroad.length > 0);
                                    });
                            });
                        if (!digForMoreFutureTransactions) {
                            continue;
                        }
                    }


                    for (let value of cardsToTraverse) {
                        var resCard = {
                            "cardNumber": value.cardNumber,
                            "cardName": all.banks.core.services.getTypeCard(value.cardName + " " + value.club1, this.defaultCardType),
                            "bankBranchId": value.bankBranchId.replace(/\D/g, ""),
                            "bankAccountId": this.parseAccountNumber(value.bankAccountId),
                            "paymentDate": value.paymentDate,
                            "cardIndex": value.cardIndex
                        }

                        const cardCharge = dataResCards.DashboardMonthBean.cardsCharges.find(crd => crd.cardNumber === resCard.cardNumber);
                        resCard.billingDate = cardCharge ? cardCharge.billingDate : null;//dataResCards.DashboardMonthBean.cardsCharges[resCard.cardIndex].billingDate;
                        resCard.billingSumSekel = cardCharge ? cardCharge.billingSumSekel : null;//dataResCards.DashboardMonthBean.cardsCharges[resCard.cardIndex].billingSumSekel;
                        writeLog("ריצה על כרטיס אשראי : " + resCard.cardNumber + "index: " + value.cardIndex);

                        var currentCardTransactions = dataRes.CardsTransactionsListBean[`Index${resCard.cardIndex}`].CurrentCardTransactions;
                        var totalNis = (dataRes.CardsTransactionsListBean[`card${resCard.cardIndex}`] && dataRes.CardsTransactionsListBean[`card${resCard.cardIndex}`].length) ? dataRes.CardsTransactionsListBean[`card${resCard.cardIndex}`][0].totalNis : 0;
                        var totalDollar = (dataRes.CardsTransactionsListBean[`card${resCard.cardIndex}`] && dataRes.CardsTransactionsListBean[`card${resCard.cardIndex}`].length) ? dataRes.CardsTransactionsListBean[`card${resCard.cardIndex}`][0].totalDollar : 0;
                        var totalEuro = (dataRes.CardsTransactionsListBean[`card${resCard.cardIndex}`] && dataRes.CardsTransactionsListBean[`card${resCard.cardIndex}`].length) ? dataRes.CardsTransactionsListBean[`card${resCard.cardIndex}`][0].totalEuro : 0;

                        for (let valueCards of currentCardTransactions) {
                            var txnIsrael = valueCards.txnIsrael;
                            var txnAbroad = valueCards.txnAbroad;

                            if (txnIsrael !== undefined && txnIsrael !== null && txnIsrael.length) {
                                writeLog("תנועות בישראל");
                                var idx = txnIsrael.findIndex((valCurr) => {
                                    return (valCurr.dealsInbound == "NO" && valCurr.fullSupplierNameHeb && valCurr.fullSupplierNameHeb.includes("לידיעה בקרדיט"))
                                })
                                try {
                                    if (idx !== -1) {
                                        var commentAdd = " " + txnIsrael[idx].fullSupplierNameHeb + (txnIsrael[idx].moreInfo ? (" " + txnIsrael[idx].moreInfo) : "");
                                    }
                                } catch (e) {

                                }
                                let txnIsraelTotalGroups;
                                let totalGroupIdx = 0;
                                if (txnIsrael && txnIsrael.length) {
                                    txnIsraelTotalGroups = txnIsrael
                                        .filter(v => (v.paymentSum && v.voucherNumberRatz === '000000000'
                                            && (!v.supplierName || !v.supplierName.includes('לידיעה'))))
                                        .map(v => {
                                            const dateMatch = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/g.exec(v.dealSum);
                                            return {
                                                "NextBillingDate": dateMatch
                                                    ? [
                                                        dateMatch[1],
                                                        dateMatch[2],
                                                        dateMatch[3].length === 2
                                                            ? (+dateMatch[3] > 70 ? ("19" + dateMatch[3]) : ("20" + dateMatch[3]))
                                                            : dateMatch[3]
                                                    ].join("/")
                                                    : "",
                                                "NextCycleTotal": v.paymentSum
                                            };
                                        });
                                }
//                                const recordsBuffer = [];
                                for (let [indexCardsRows, valueCardsRows] of txnIsrael.entries()) {
                                    //console.log(indexCardsRows, valueCardsRows);
                                    // if (((valueCardsRows.dealSumType !== '1' || valueCardsRows.supplierId !== '1000000')
                                    //     &&
                                    //     (valueCardsRows.dealSum !== null && valueCardsRows.dealSum.length !== 0 && valueCardsRows.voucherNumberRatz !== '000000000')
                                    // ) || (valueCardsRows.fullSupplierNameHeb && valueCardsRows.fullSupplierNameHeb.toString().includes('חיובי קרדיט ל'))) {
                                    if ((valueCardsRows.dealSumType !== '1' || valueCardsRows.supplierId !== '1000000')
                                        &&
                                        (valueCardsRows.dealSum !== null && valueCardsRows.dealSum.length !== 0 && valueCardsRows.voucherNumberRatz !== '000000000')
                                    ) {
                                        let comments = valueCardsRows.moreInfo, CurrentPaymentNum = null,
                                            TotalPayments = null;
                                        if (comments !== null) {
                                            if (comments.indexOf("תשלום") >= 0 && comments.indexOf("מתוך") >= 0) {
                                                var oneFromAll = comments.split("מתוך");
                                                CurrentPaymentNum = oneFromAll[0].match(/\d+/)[0];
                                                TotalPayments = oneFromAll[1].match(/\d+/)[0];
                                                comments = null;
                                            } else {
                                                comments = comments.trim().replace(/\s+/g, " ");
                                            }
                                        }

                                        if (idx !== "") {
                                            if (parseInt(idx) > indexCardsRows) {
                                                if (comments == null) {
                                                    comments = "";
                                                }
                                                comments += commentAdd;
                                            }
                                        }

//                                        var nextBillingDate = resCard.billingDate;
//                                        if (valueCardsRows.fullPaymentDate !== null) {
//                                            nextBillingDate = valueCardsRows.fullPaymentDate;
//                                        }
                                        var voucherNumber = valueCardsRows.voucherNumberRatz;
                                        var transCategory = null, business_address = null, business_phone = null;
                                        if (all.banks.accountDetails.isCategory) {
                                            if (voucherNumber !== "000000000" && valueCardsRows.dealSumType != '1' && valueCardsRows.dealSumType != 'T') {
                                                var args = await this.isracardRestGet(
                                                    `https://${this.rootUrl}/services/ProxyRequestHandler.ashx?reqName=PirteyIska_204&userGuid=${this.userGuid}&CardIndex=${resCard.cardIndex}&moedChiuv=${this.monthOfCard[i].month}${this.monthOfCard[i].year}&inState=yes&shovarRatz=${voucherNumber}`,
                                                    `https://${this.rootUrl}/personalarea/transaction-list/`,
                                                    this.cookies
                                                );
                                                var [error, response, dataResInside] = [...args];
                                                dataResInside = JSON.parse(dataResInside);
                                                writeLog("פירוט קטגוריה");
                                                if (dataResInside.PirteyIska_204Bean) {
                                                    if (dataResInside.PirteyIska_204Bean.sector !== undefined && dataResInside.PirteyIska_204Bean.sector !== null) {
                                                        transCategory = dataResInside.PirteyIska_204Bean.sector.toString().trim();
                                                    }
                                                    if (dataResInside.PirteyIska_204Bean.address !== undefined && dataResInside.PirteyIska_204Bean.address !== null) {
                                                        business_address = dataResInside.PirteyIska_204Bean.address.toString().trim();
                                                    }
                                                    if (dataResInside.PirteyIska_204Bean.phoneNumber !== undefined && dataResInside.PirteyIska_204Bean.phoneNumber !== null) {
                                                        business_phone = dataResInside.PirteyIska_204Bean.phoneNumber.toString().trim();
                                                    }
                                                }
                                            }
                                        }

                                        // console.log(txnIsraelTotalGroups[totalGroupIdx], valueCardsRows, totalNis, totalEuro, totalDollar);

                                        const record = {
                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                            "Token": all.banks.accountDetails.bank.token,
                                            "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                            "BranchNumber": resCard.bankBranchId,
                                            "AccountNumber": resCard.bankAccountId,
                                            "CardNumber": resCard.cardNumber,
                                            "NextBillingDate": valueCardsRows['fullPaymentDate'] ? valueCardsRows['fullPaymentDate'] : ((txnIsraelTotalGroups[totalGroupIdx] && txnIsraelTotalGroups[totalGroupIdx]["NextBillingDate"]) ? txnIsraelTotalGroups[totalGroupIdx]["NextBillingDate"] : resCard.billingDate),
                                            "NextCycleTotal": (txnIsraelTotalGroups && txnIsraelTotalGroups[totalGroupIdx]) ? txnIsraelTotalGroups[totalGroupIdx]["NextCycleTotal"] : totalNis,
                                            "TransDesc": valueCardsRows.fullSupplierNameHeb,
                                            "TransTotal": valueCardsRows.paymentSum,
                                            "ValueDate": valueCardsRows.fullPurchaseDate,
                                            "TransCategory": transCategory,
                                            "business_address": business_address,
                                            "business_phone": business_phone,
                                            "TotalPayments": TotalPayments,
                                            "CurrentPaymentNum": CurrentPaymentNum,
                                            "CardType": resCard.cardName,
                                            "indFakeDate": 0,
                                            "currency_id": all.banks.core.services.getTypeCurrencyAll(valueCardsRows.currentPaymentCurrency),
                                            "original_total": valueCardsRows.dealSum,
                                            // "original_total": (valueCardsRows.fullSupplierNameHeb && valueCardsRows.fullSupplierNameHeb.toString().includes('חיובי קרדיט ל')) ? valueCardsRows.paymentSum : valueCardsRows.dealSum,
                                            "ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(valueCardsRows.currencyId),
                                            "comment": comments
                                        };

                                        this.arr.push(record);
//                                        recordsBuffer.push(record);

                                    } else if (valueCardsRows.paymentSum && valueCardsRows.voucherNumberRatz === '000000000'
                                        && (!valueCardsRows.supplierName || !valueCardsRows.supplierName.includes('לידיעה'))) {
                                        totalGroupIdx++;
//                                        const dateMatch = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/g.exec(valueCardsRows.dealSum);
//                                        let dateFromSumRow = null;
//                                        if (dateMatch !== null) {
//                                            dateFromSumRow = [
//                                                dateMatch[1],
//                                                dateMatch[2],
//                                                dateMatch[3].length === 2
//                                                    ? (+dateMatch[3] > 70 ? ("19" + dateMatch[3]) : ("20" + dateMatch[3]))
//                                                    : dateMatch[3]
//                                            ].join("/");
//                                        }
//
//                                        let rec;
//                                        while ((rec = recordsBuffer.pop())) {
//                                            rec["NextCycleTotal"] = valueCardsRows.paymentSum;
//                                            if (dateFromSumRow) {
//                                                rec["NextBillingDate"] = dateFromSumRow;
//                                            }
//                                        }
                                    }
                                }
                            }
                            if (txnAbroad !== undefined && txnAbroad !== null && txnAbroad.length) {
                                writeLog("תנועות חו״ל");
                                let txnAbroadTotalGroups;
                                let totalGroupIdx = 0;
                                if ((txnAbroad !== undefined && txnAbroad !== null && txnAbroad.length) && txnAbroad[0].voucherNumberRatzOutbound !== null) {
                                    txnAbroadTotalGroups = txnAbroad
                                        .filter(v => (v.voucherNumberRatzOutbound === '000000000' && v.fullPurchaseDateOutbound !== null))
                                        .map(v => {
                                            const dateMatch = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/g.exec(v.fullPurchaseDateOutbound);
                                            return {
                                                "NextBillingDate": dateMatch
                                                    ? [
                                                        dateMatch[1],
                                                        dateMatch[2],
                                                        dateMatch[3].length === 2
                                                            ? (+dateMatch[3] > 70 ? ("19" + dateMatch[3]) : ("20" + dateMatch[3]))
                                                            : dateMatch[3]
                                                    ].join("/")
                                                    : "",
                                                "NextCycleTotal": v.paymentSumOutbound
                                            };
                                        });
                                }

                                for (let [indexCardsRows, valueCardsRows] of txnAbroad.entries()) {
                                    //console.log(indexCardsRows, valueCardsRows);
                                    let comments = valueCardsRows.moreInfo, CurrentPaymentNum = null,
                                        TotalPayments = null;
                                    if (comments !== null) {
                                        if (comments.indexOf("תשלום") >= 0 && comments.indexOf("מתוך") >= 0) {
                                            var oneFromAll = comments.split("מתוך");
                                            CurrentPaymentNum = oneFromAll[0].match(/\d+/)[0];
                                            TotalPayments = oneFromAll[1].match(/\d+/)[0];
                                            comments = null;
                                        } else {
                                            comments = comments.trim().replace(/\s+/g, " ");
                                        }
                                    }
                                    if (valueCardsRows.voucherNumberRatzOutbound === '000000000') {
                                        if (valueCardsRows.fullPurchaseDateOutbound === null && indexCardsRows > 0) {
                                            const feeComment = valueCardsRows.fullSupplierNameOutbound + ": " + valueCardsRows.paymentSumOutbound + valueCardsRows.currencyId;
                                            this.arr[this.arr.length - 1]["comment"] = this.arr[this.arr.length - 1]["comment"]
                                                ? this.arr[this.arr.length - 1]["comment"] + "; " + feeComment
                                                : feeComment;
                                        } else {
                                            totalGroupIdx++;
//                                            console.log(this.idxGrRows, "000000000");
                                        }
                                    } else if (valueCardsRows.dealSumOutbound !== null && valueCardsRows.dealSumOutbound.length !== 0 && valueCardsRows.voucherNumberRatzOutbound !== '000000000') {
//                                        var nextBillingDate = resCard.billingDate;
//                                        if (valueCardsRows.fullPaymentDate !== null) {
//                                            nextBillingDate = valueCardsRows.fullPaymentDate;
//                                        }
                                        var voucherNumber = valueCardsRows.voucherNumberRatzOutbound;
                                        var transCategory = null, business_address = null, business_phone = null;
                                        if (all.banks.accountDetails.isCategory) {
                                            if (voucherNumber !== "000000000") {
                                                var args = await this.isracardRestGet(
                                                    `https://${this.rootUrl}/services/ProxyRequestHandler.ashx?reqName=PirteyIska_204&userGuid=${this.userGuid}&CardIndex=${resCard.cardIndex}&moedChiuv=${this.monthOfCard[i].month}${this.monthOfCard[i].year}&inState=no&shovarRatz=${voucherNumber}`,
                                                    `https://${this.rootUrl}/personalarea/transaction-list/`,
                                                    this.cookies
                                                );
                                                var [error, response, dataResInside] = [...args];
                                                dataResInside = JSON.parse(dataResInside);
                                                // .PirteyIska_204Bean.address
                                                // .PirteyIska_204Bean.phoneNumber
                                                writeLog("פירוט קטגוריה")
                                                if (dataResInside.PirteyIska_204Bean) {
                                                    if (dataResInside.PirteyIska_204Bean.sector !== undefined && dataResInside.PirteyIska_204Bean.sector !== null) {
                                                        transCategory = dataResInside.PirteyIska_204Bean.sector.toString().trim();
                                                    }
                                                    if (dataResInside.PirteyIska_204Bean.address !== undefined && dataResInside.PirteyIska_204Bean.address !== null) {
                                                        business_address = dataResInside.PirteyIska_204Bean.address.toString().trim();
                                                    }
                                                    if (dataResInside.PirteyIska_204Bean.phoneNumber !== undefined && dataResInside.PirteyIska_204Bean.phoneNumber !== null) {
                                                        business_phone = dataResInside.PirteyIska_204Bean.phoneNumber.toString().trim();
                                                    }
                                                }
                                            }
                                        }

                                        this.arr.push({
                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                            "Token": all.banks.accountDetails.bank.token,
                                            "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                            "BranchNumber": resCard.bankBranchId,
                                            "AccountNumber": resCard.bankAccountId,
                                            "CardNumber": resCard.cardNumber,
                                            "NextBillingDate": valueCardsRows['fullPaymentDate'] ? valueCardsRows['fullPaymentDate'] : ((txnAbroadTotalGroups[totalGroupIdx] && txnAbroadTotalGroups[totalGroupIdx]["NextBillingDate"]) ? txnAbroadTotalGroups[totalGroupIdx]["NextBillingDate"] : resCard.billingDate),
                                            // "NextCycleTotal": (txnAbroadTotalGroups && txnAbroadTotalGroups[totalGroupIdx]) ? txnAbroadTotalGroups[totalGroupIdx]["NextCycleTotal"] : (totalDollar ? totalDollar : totalEuro),
                                            "NextCycleTotal": txnAbroad[txnAbroad.length - 1].paymentSumOutbound,
                                            "TransDesc": valueCardsRows.fullSupplierNameOutbound,
                                            "TransTotal": valueCardsRows.paymentSumOutbound,
                                            "ValueDate": valueCardsRows.fullPurchaseDateOutbound,
                                            "TransCategory": transCategory,
                                            "business_address": business_address,
                                            "business_phone": business_phone,
                                            "TotalPayments": TotalPayments,
                                            "CurrentPaymentNum": CurrentPaymentNum,
                                            "CardType": resCard.cardName,
                                            "indFakeDate": 0,
                                            "currency_id": all.banks.core.services.getTypeCurrencyAll(valueCardsRows.currentPaymentCurrency),
                                            "original_total": valueCardsRows.dealSumOutbound,
                                            "ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(valueCardsRows.currencyId),
                                            "comment": comments
                                        });
                                    }
                                }
                            }
                        }
                    }
                }

                writeLog("סיום ריצה");
                writeLog("שליחת נתונים");
                this.sendCardsCtrl();
            } else {
                this.logOut();
            }
        } catch (e) {
            console.log(e);
        }
    }

    logOut(silently) {
        writeLog("logOut");

        this.isracardRestGet(
            `https://${this.rootUrl}/services/ProxyRequestHandler.ashx?reqName=performExitI&loginUrl=/personalarea/login/`,
            `https://${this.rootUrl}/personalarea/transaction-list/`,
            this.cookies
        ).then((...args) => {
            writeLog("killVpn");
            monitorVpn.killVpn(() => {
                if (silently !== true) {
                    myEmitterLogs(25);
                }
            });
        });
    }

    parseAccountNumber(str) {
        if (!str) {
            return str;
        }

        const regex = /(\d+)\/(\d{3})/g;
        let m;
        if ((m = regex.exec(str)) !== null) {
            return m[1];
        }

        return str.replace(/\D/g, "");
    }
}

all.banks.accounts.israCardAll = new israCard();
