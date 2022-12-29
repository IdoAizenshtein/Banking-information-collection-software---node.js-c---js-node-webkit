class isracardAsakim {
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
        this.companies = [];
    }

    isracardAsakimPost(...args) {
        monitorActivityClass.setIntervalActivity();
        let [url, Referer, cookie, body] = args;
        writeLog("visaPost: " + url);

        return new Promise((resolve, reject) => {
            var options = {
                uri: url,
                family: 4,
                timeout: 80000,
                method: "POST",
                body: body ? JSON.stringify(body) : null,
                headers: {
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Host': 'biz.isracard.co.il',
                    'Origin': 'https://biz.isracard.co.il',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
                }
            };
            if (cookie !== null) {
                options.headers.Cookie = cookie;
            }
            if (Referer !== null) {
                options.headers.Referer = Referer;
            }

            senderReq.sendersServer(options, (error, response, data) => {
                //resolve([error, response, data]);

                if (response !== undefined) {
                    if (response.headers !== undefined) {
                        if (response.headers["set-cookie"]) {
                            this.getSetCookies(response.headers["set-cookie"])
                                .then((res) => {
//								data = iconv.decode(new Buffer(data), 'iso-8859-8');
                                    resolve([error, response, data]);
                                });
                        } else {
//							data = iconv.decode(new Buffer(data), 'iso-8859-8');
                            resolve([error, response, data]);
                        }
                    } else {
//						data = iconv.decode(new Buffer(data), 'iso-8859-8');
                        resolve([error, response, data]);
                    }
                } else {
//					data = iconv.decode(new Buffer(data), 'iso-8859-8');
                    resolve([error, response, data]);
                }
            });
        });
    }

    isracardAsakimRestGet(...args) {
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
                    "Host": "biz.isracard.co.il",
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
                }
            }
            if (cookie !== null) {
                options.headers.Cookie = cookie;
            }
            if (Referer !== null) {
                options.headers.Referer = Referer;
            }
            senderReq.sendersServer(options, (error, response, data) => {
                //resolve([error, response, data]);
                if (response !== undefined) {
                    if (response.headers !== undefined) {
                        if (response.headers["set-cookie"]) {
                            this.getSetCookies(response.headers["set-cookie"])
                                .then((res) => {
//								data = iconv.decode(new Buffer(data), 'iso-8859-8');
                                    resolve([error, response, data]);
                                });
                        } else {
//							data = iconv.decode(new Buffer(data), 'iso-8859-8');
                            resolve([error, response, data]);
                        }
                    } else {
//						data = iconv.decode(new Buffer(data), 'iso-8859-8');
                        resolve([error, response, data]);
                    }
                } else {
//					data = iconv.decode(new Buffer(data), 'iso-8859-8');
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
                if (error == 'discard') {
                    this.sendSlikaCtrl();
                }
            });
    };

    async login() {
        try {
            writeLog("login");
            if (!(/^[0-9]+$/g.test(all.banks.accountDetails.bank.autoCode.slice(0, 9)))) {
                myEmitterLogs(5, 'Value \'' + all.banks.accountDetails.bank.autoCode.slice(0, 9) + '\' is illegal.');
                return;
            }
            if (!(/^[a-zA-Z0-9]+$/g.test(all.banks.accountDetails.bank.username.slice(0, 8)))) {
                myEmitterLogs(5, 'Value \'' + all.banks.accountDetails.bank.username.slice(0, 8) + '\' is illegal.');
                return;
            }

            await this.isracardAsakimRestGet(
                "https://biz.isracard.co.il/",
                null,
                null
            );


            const tryGetAuth = await this.isracardAsakimRestGet(
                "https://biz.isracard.co.il/TryGetAuth",
                "https://biz.isracard.co.il/",
                this.cookies
            );

            const init = await this.isracardAsakimRestGet(
                "https://biz.isracard.co.il/Init",
                "https://biz.isracard.co.il/",
                this.cookies
            );

            const clearMyCookies = await this.isracardAsakimRestGet(
                "https://service.isracard.co.il/clearMyCookies/",
                "https://biz.isracard.co.il/",
                this.cookies
            );

            const initContent = await this.isracardAsakimPost(
                "https://biz.isracard.co.il/DigitalBusiness.Login/initContent",
                "https://biz.isracard.co.il/",
                this.cookies,
                {"isPreview": false}
            );

            const initData = await this.isracardAsakimPost(
                "https://biz.isracard.co.il/DigitalBusiness.Login/initData",
                "https://biz.isracard.co.il/",
                this.cookies,
                {"isPreview": false}
            );

            const args = await this.isracardAsakimPost(
                "https://biz.isracard.co.il/DigitalBusiness.Login/login",
                "https://biz.isracard.co.il/",
                this.cookies,
                {
                    "bankAccountNum": all.banks.accountDetails.bank.autoCode.slice(0, 9),
                    "username": all.banks.accountDetails.bank.username.slice(0, 8),
                    "password": all.banks.accountDetails.bank.password.slice(0, 8),
                    "recaptchaResponse": "",
                    "isPreview": false
                }
            );
            let [error, response, data] = [...args];
            if (!error && data) {
                data = JSON.parse(data);
                if (data.isSuccess) {
                    const tryGetAuth = await this.isracardAsakimRestGet(
                        "https://biz.isracard.co.il/TryGetAuth",
                        "https://biz.isracard.co.il/DigitalBusiness.Login/login",
                        this.cookies
                    );
                    const init = await this.isracardAsakimRestGet(
                        "https://biz.isracard.co.il/Init",
                        "https://biz.isracard.co.il/DigitalBusiness.Login/login",
                        this.cookies
                    );

                    if (!all.banks.openBankPage) {
                        this.loadAcc();
                    } else {
                        try {
                            let cookSplit = this.cookies.split(";");
                            let i1, len1 = cookSplit.length;
                            for (i1 = 0; i1 < len1; i1++) {
                                let v1 = cookSplit[i1];
                                if (v1 !== "") {
                                    let nameExist = v1.split("=")[0].replace(/\s/g, "");
                                    let valExist = v1.split("=")[1].replace(/\s/g, "");
                                    win.cookies.set({
                                        url: "https://biz.isracard.co.il",
                                        name: nameExist,
                                        domain: "biz.isracard.co.il",
                                        value: valExist
                                    })
                                }
                            }
                            setTimeout(() => {
                                all.banks.core.services.openBankPage("https://biz.isracard.co.il/Homepage");
                            }, 1000)
                        } catch (e) {

                        }

                    }
                } else {
                    writeLog("Login failed: " + data.errors[0].value);
                    // if(data.errors[0].value.includes('יש לבצע הרשמה')){
                    //
                    // }

                    myEmitterLogs(5, data.errors[0].value);
                }
            }


            // https://biz.isracard.co.il/DigitalBusiness.PastCredit/SetWebSession
            // {"webKey":"PastCreditWebSessionParams","webValue":"{\"businessBranchAccountSelector\":{\"selectedBranch\":{\"name\":\"כל הרשת\",\"id\":\"-1\"},\"selectedAccount\":{\"name\":\"10-790-117700\",\"value\":{\"displayValue\":\"10-790-117700\",\"accountType\":\"000\",\"account\":\"117700\",\"bank\":\"10\",\"branch\":\"790\"}},\"option\":\"branches\"},\"selectedCurrency\":\"-1\",\"selectedCard\":\"-1\",\"selectedCompany\":\"-1\",\"cardCompanyFilter\":\"company\",\"fromDate\":\"2021-02-20T05:00:00.000Z\",\"toDate\":\"2021-08-20T05:00:00.000Z\",\"isOnlyOneAccount\":true}","isPreview":false}
            // {"isSuccess":true,"errors":null,"data":null}
            //
            //
            // https://biz.isracard.co.il/keepAlive


            //     let messageStr = String(data.Header.Message);
            //     if (messageStr.includes("נחסמה")) {
            //         myEmitterLogs(8);
            //     } else if (messageStr.includes("הסיסמא פג")) {
            //         myEmitterLogs(6);
            //     } else {//if (data.Header.Status == "-3" || messageStr.includes("לבצע הרשמה")) {
            //         myEmitterLogs(5);
            //     }
            //     writeLog("Login failed: " + messageStr);
        } catch (e) {
        }
    }

    async loadAcc() {
        console.log('loadAcc');

        try {
            const argsBranchAccountSelector = await this.isracardAsakimPost(
                "https://biz.isracard.co.il/DigitalBusiness.BranchAccountSelector/data",
                "https://biz.isracard.co.il/Homepage",
                this.cookies,
                {"addAllBranchesToList": true}
            );
            let [error, response, data] = [...argsBranchAccountSelector];
            if (!error && data) {
                data = JSON.parse(data);
                if (data.data && data.data.branches) {
                    this.accList = data.data.branches.filter(it => it.id !== "-1")

                    const getFinanceLists = await this.isracardAsakimPost(
                        "https://biz.isracard.co.il/DigitalBusiness.PastCredit/GetFinanceLists",
                        "https://biz.isracard.co.il/pastcredit",
                        this.cookies,
                        {"isPreview": false}
                    );
                    let [error, response, dataList] = [...getFinanceLists];
                    if (!error && dataList) {
                        this.companies = [];
                        dataList = JSON.parse(dataList);
                        if (dataList && dataList.data && dataList.data.companies && dataList.data.companies.length) {
                            this.companies = dataList.data.companies.filter(it => it.id !== "-1")
                        }
                    }

                    for (let i = 0; i < this.accList.length; i++) {
                        for (let ind = 0; ind < this.companies.length; ind++) {
                            await this.loadPast(i, this.companies[ind]);
                            await this.loadFuture(i, this.companies[ind]);
                        }
                    }

                    if (this.arr.length) {
                        this.sendSlikaCtrl();
                    } else {
                        this.logOut();
                    }
                } else {
                    this.logOut();
                }
            }
        } catch (err) {
            all.banks.core.services.errorLog(err);
        }
    }

    async loadFuture(idx, companyCode) {
        try {
            const cardType = all.banks.core.services.getTypeCreditCard(companyCode.value);
            for (let i = 0; i < 6; i++) {
                const dateToday = new Date();
                dateToday.setDate(dateToday.getDate() + 1);
                dateToday.setMonth(dateToday.getMonth() + (6 * i));
                const from = dateToday.toLocaleString('en-GB', {
                    "year": 'numeric',
                    "month": '2-digit',
                    "day": '2-digit'
                });
                dateToday.setMonth(dateToday.getMonth() + 6);
                dateToday.setDate(dateToday.getDate() - 1);
                const till = dateToday.toLocaleString('en-GB', {
                    "year": 'numeric',
                    "month": '2-digit',
                    "day": '2-digit'
                });
                writeLog(`loadFuture for ${this.accList[idx].id} (${this.accList[idx].displayValue}) - ${companyCode.value} - ${from}-${till}`);

                const getFutureCredits = await this.isracardAsakimPost(
                    "https://biz.isracard.co.il/DigitalBusiness.FutureCredit/GetFutureCredits",
                    "https://biz.isracard.co.il/pastcredit",
                    this.cookies,
                    {
                        "cardCompanyFilter": "company",
                        "companyCode": companyCode.id,
                        "modelCode": "-1",
                        "queryCurrencyType": "-1",
                        "fromDate": from,
                        "toDate": till,
                        "selectedSuppBranch": this.accList[idx].id,
                        "bank": "-1",
                        "branch": "-1",
                        "accountType": "000",
                        "account": "-1",
                        "isPreview": false
                    }
                );
                let [error, response, data] = [...getFutureCredits];
                if (!error && data) {
                    data = JSON.parse(data);
                    if (data.data && data.data.futureCredits && data.data.futureCredits.length) {
                        writeLog(`Found ${data.data.futureCredits.length} rows`);
                        for (let [index1, value1] of data.data.futureCredits.entries()) {
                            this.arr.push({
                                "target_idStr": all.banks.accountDetails.bank.targetId,
                                "tokenStr": all.banks.accountDetails.bank.token,
                                "bankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                "extractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                "ExporterId": all.banks.spiderConfig.spiderId,
                                "solek_desc": this.accList[idx].displayValue,
                                "paymentsTotal": 0,
                                "grandTotal": 0,
                                "slikaAccount": this.accList[idx].id,
                                "valueDate": value1.paymentDate,
                                "regularPaymentsTotal": value1.netAmount.replace(/[^\d\.-]/g, ""),
                                "nextTotal": value1.netAmount.replace(/[^\d\.-]/g, ""),
                                "cardType": cardType
                            })
                        }
                    } else {
                        writeLog(`Not found rows`);
                    }
                } else {
                    console.error(`loadPast FAILED for ${this.accList[idx].id} (${this.accList[idx].displayValue}): ${error}`);
                }
            }
        } catch (err) {
            //console.log('err: ', err);
            all.banks.core.services.errorLog(err);
        }
    }

    async loadPast(idx, companyCode) {
        writeLog(`loadPast for ${this.accList[idx].id} (${this.accList[idx].displayValue}) - ${companyCode.value}`);
        try {
            const cardType = all.banks.core.services.getTypeCreditCard(companyCode.value);
            const dateToday = new Date();
            const dateFilterTo = dateToday.toLocaleString('en-GB', {
                "year": 'numeric',
                "month": '2-digit',
                "day": '2-digit'
            });
            dateToday.setMonth(dateToday.getMonth() - 6);
            const dateFilterFrom = dateToday.toLocaleString('en-GB', {
                "year": 'numeric',
                "month": '2-digit',
                "day": '2-digit'
            });
            const getPastCredits = await this.isracardAsakimPost(
                "https://biz.isracard.co.il/DigitalBusiness.PastCredit/GetPastCredits",
                "https://biz.isracard.co.il/pastcredit",
                this.cookies,
                {
                    "cardCompanyFilter": "company",
                    "companyCode": companyCode.id,
                    "modelCode": "-1",
                    "queryCurrencyType": "-1",
                    "fromDate": dateFilterFrom,
                    "toDate": dateFilterTo,
                    "selectedSuppBranch": this.accList[idx].id,
                    "bank": "-1",
                    "branch": "-1",
                    "accountType": "000",
                    "account": "-1",
                    "isPreview": false
                }
            );
            let [error, response, data] = [...getPastCredits];
            if (!error && data) {
                data = JSON.parse(data);
                if (data.data && data.data.pastCredits && data.data.pastCredits.length) {
                    writeLog(`Found ${data.data.pastCredits.length} rows`);
                    for (let [index1, value1] of data.data.pastCredits.entries()) {
                        this.arr.push({
                            "target_idStr": all.banks.accountDetails.bank.targetId,
                            "tokenStr": all.banks.accountDetails.bank.token,
                            "bankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                            "extractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                            "ExporterId": all.banks.spiderConfig.spiderId,
                            "solek_desc": this.accList[idx].displayValue,
                            "paymentsTotal": 0,
                            "grandTotal": 0,
                            "slikaAccount": this.accList[idx].id,
                            "valueDate": value1.paymentDate,
                            "regularPaymentsTotal": value1.netAmount.replace(/[^\d\.-]/g, ""),
                            "nextTotal": value1.netAmount.replace(/[^\d\.-]/g, ""),
                            "cardType": cardType
                        })
                    }
                } else {
                    writeLog(`Not found rows`);
                }
            } else {
                console.error(`loadPast FAILED for ${this.accList[idx].id} (${this.accList[idx].displayValue}): ${error}`);
            }
        } catch (err) {
            all.banks.core.services.errorLog(err);
        }
    }

    async logOut() {
        writeLog("logOut");
        await this.isracardAsakimPost(
            "https://biz.isracard.co.il/Logout",
            "https://biz.isracard.co.il/Homepage",
            this.cookies,
            null
        );
        await this.isracardAsakimRestGet(
            "https://biz.isracard.co.il/TryGetAuth",
            "https://biz.isracard.co.il/",
            this.cookies
        );
        await this.isracardAsakimRestGet(
            "https://biz.isracard.co.il/Init",
            "https://biz.isracard.co.il/",
            this.cookies
        );
        await this.isracardAsakimRestGet(
            "https://biz.isracard.co.il/",
            null,
            null
        );
        writeLog("killVpn");
        monitorVpn.killVpn(() => {
            myEmitterLogs(25);
        });
    }

    timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

all.banks.accounts.isracardAsakim = new isracardAsakim();
