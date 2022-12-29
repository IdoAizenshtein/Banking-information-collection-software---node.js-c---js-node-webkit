/* global monitorActivityClass, senderReq, all, win, monitorVpn */

class tzameret {
    constructor() {
        this.cookies = "";
        this.defaultOptions = {
            "baseUrl": "https://service.tzm.co.il",
            "timeout": 40000,
            "headers": {
                "Connection": "keep-alive",
                "Upgrade-Insecure-Requests": "1",
                "Host": "service.tzm.co.il",
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
            }
        };
        this.currentContent = undefined;
        this.locationToTraverse = "";

        this.arr = [];
    }

    tzameretSend(options, parseDOM = false) {
        monitorActivityClass.setIntervalActivity();

        options = $.extend(true, options, this.defaultOptions);
        if (this.cookies) {
            options.headers.Cookie = this.cookies;
        }

        return new Promise((resolve, reject) => {
            senderReq.sendersServer(options, (error, response, data) => {
                if (!error && response !== undefined && response.statusCode < 400) {
                    if (response.headers !== undefined && response.headers["set-cookie"]) {
                        this.mergeIntoCookies(response.headers["set-cookie"]);
                    }
                    if (parseDOM && response.statusCode < 300) {
                        try {
                            this.currentContent = all.banks.core.services.parseHtml(data);
                        } catch (exception) {
                            error = exception;
                        }
                    }
                }

                resolve([error, response, data]);
            });
        });
    }

    tzameretGet({url, referer, parseDOM = false} = {}) {
        let options = {
            "uri": url,
            "method": "GET"
        };
        if (referer) {
            options.headers = {
                Referer: referer
            };
        }

        return this.tzameretSend(options, parseDOM);
    }

    tzameretPost({url, referer, body, parseDOM = false} = {}) {
        let options = {
            uri: url,
            form: body,
            method: "POST",
            body: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Origin": "https://service.tzm.co.il"
            }
        };
        if (referer) {
            options.headers.Referer = referer;
        }

        return this.tzameretSend(options, parseDOM);
    }

    async logout() {
        writeLog("tzameert slika logout");

        let [error, response, data] = await this.tzameretPost({
            url: "/Account/LogOff",
            referer: `https://service.tzm.co.il/${this.locationToTraverse}`,
            body: {}
        });
        if (error !== null) {
            myEmitterLogs(9, `request with logout form failed on ${this.locationToTraverse}`);
            return false;
        }

        return true;
    }

    mergeIntoCookies(cookiesStrArr) {
        if (!Array.isArray(cookiesStrArr) || !cookiesStrArr.length) {
            return;
        }

        let existingCookiesMap = Object.create(null);
        if (this.cookies) {
            this.cookies.split(";").forEach((cookie) => {
                let [name, val] = cookie.split(";")[0].split("=");
                existingCookiesMap[name.replace(/\s/g, "")] = val.replace(/\s/g, "");
            });
        }

        cookiesStrArr.forEach((cookie) => {
            let [name, val] = cookie.split(";")[0].split("=");
            existingCookiesMap[name.replace(/\s/g, "")] = val.replace(/\s/g, "");
        });

        this.cookies = $.map(existingCookiesMap, function (val, key) {
            return [key, val].join("=");
        }).join(";");
    }

//	get siteUserType() {
//		return all.banks.accountDetails.bank.autoCode.toString().length > 3 ? "Business" : "Net";
//	}

    async login() {
        writeLog("tzameret slika login start");
        let [error, response, data] = await this.tzameretGet({url: "/Account/Login?ReturnUrl=%2f", parseDOM: true});
        if (error !== null) {
            myEmitterLogs(9, 'request failed on /');
            return false;
        }
        const siteUserTypes = all.banks.accountDetails.bank.autoCode.toString().length > 3
            ? ["Business", "Net"]
            : ["Net", "Business"];

        const loginForm = {
            "loginPasswordViewModel.UserName": all.banks.accountDetails.bank.username,
            "loginPasswordViewModel.Password": all.banks.accountDetails.bank.password,
            "loginPasswordViewModel.BusinessID": all.banks.accountDetails.bank.autoCode,
            'WrongAttemptsPassword': '',
            '__RequestVerificationToken': this.currentContent.find("input[name='__RequestVerificationToken']").val()
        };

        let retriesByType = 0;
        do {
            loginForm["loginPasswordViewModel.UserType"] = siteUserTypes[retriesByType];
            [error, response, data] = await this.tzameretPost({
                url: "/Account/Login?ReturnUrl=%2F",
                referer: "https://service.tzm.co.il/Account/Login?ReturnUrl=%2f",
                body: loginForm,
                parseDOM: true
            });

            if (error !== null) {
                myEmitterLogs(9, 'request with login form failed on /Account/Login');
                return false;
            }

            this.locationToTraverse = response.headers["location"];

        } while (!this.locationToTraverse && ((++retriesByType) < siteUserTypes.length));

        if (!this.locationToTraverse) {
            let validationErrors = this.currentContent.find("div.validation-summary-errors");
            if (validationErrors.length > 0) {
                myEmitterLogs(5, validationErrors.text());
            } else {
                myEmitterLogs(5);
            }
            return false;
        }
        //add failures handling (password expired, etc.) here
        if (this.locationToTraverse.includes("ChangePassword")
            || this.locationToTraverse.includes("ChangeFirstPassword")) {

            myEmitterLogs(6);
            return;
        }


        writeLog(`tzameret slika login done. location to traverse: ${this.locationToTraverse}`);
        return true;
    }

    async traverse() {
        if (all.banks.openBankPage) {
            if (this.cookies) {
                for (const cookie of this.cookies.split(";")) {
                    let [name, val] = cookie.split(";")[0].split("=");
                    win.cookies.set({
                        url: "https://service.tzm.co.il",
                        name: name.replace(/\s/g, ""),
                        domain: "service.tzm.co.il",
                        value: val.replace(/\s/g, "")
                    });
                }
            }

            setTimeout(() => {
                all.banks.core.services.openBankPage(`https://service.tzm.co.il${this.locationToTraverse}`);
            }, 1000);

            return false;
        }

        writeLog("tzameret slika traverse: start");

        let [error, response, data] = await this.tzameretGet({
            url: `${this.locationToTraverse}`,
            referer: "https://service.tzm.co.il",
            parseDOM: true
        });
        if (error !== null) {
            myEmitterLogs(9, `request failed on ${this.locationToTraverse} or DOM parsing failure`);
            return false;
        }

        // to get to the first page where accounts present
        [error, response, data] = await this.tzameretGet({
            url: '/Transfers',
            referer: "https://service.tzm.co.il",
            parseDOM: true
        });

        let slikaAccountStubs = [];
        let slikaAccountsDOM = this.currentContent.find("select[name='BusinessID'] option")
            .filter((i, v) => {
                return $(v).attr("value");
            });
        if (slikaAccountsDOM.length > 0) {
            slikaAccountsDOM
                .filter((i, v) => {
                    return $(v).attr("value");
                })
                .each((i, v) => {
                    const solekAccId = $(v).val();
                    slikaAccountStubs.push({
                        "target_idStr": all.banks.accountDetails.bank.targetId,
                        "tokenStr": all.banks.accountDetails.bank.token,
                        "bankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                        "ExporterId": all.banks.spiderConfig.spiderId,
                        "solek_desc": $(v).text().replace("-" + solekAccId, "").replace(solekAccId, "")
                            //                                .replace(/[^\w]/g, "")
                            .trim(),
//					"paymentsTotal": 0,
//					"grandTotal": 0,
                        "slikaAccount": solekAccId,
                        "cardType": parseInt(all.banks.accountDetails.bank.BankNumber)//89
                    });
                });
        } else {
            let slikaSingleAccountDOM = this.currentContent
                .find("section#HeaderDetails li:contains('שם הלקוח'):contains('מספר לקוח:')");
            if (slikaSingleAccountDOM.length > 0) {
                slikaAccountStubs.push({
                    "target_idStr": all.banks.accountDetails.bank.targetId,
                    "tokenStr": all.banks.accountDetails.bank.token,
                    "bankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                    "ExporterId": all.banks.spiderConfig.spiderId,
                    "solek_desc": slikaSingleAccountDOM.children(":contains('שם הלקוח')")
                        .first().next().text().trim(),
//					"paymentsTotal": 0,
//					"grandTotal": 0,
                    "slikaAccount": slikaSingleAccountDOM.children(":contains('מספר לקוח:')")
                        .first().next().text().replace(/[^\d\.-]/g, ""),
                    "cardType": parseInt(all.banks.accountDetails.bank.BankNumber)//89
                });
            }
        }

        if (slikaAccountStubs.length === 0) {
            myEmitterLogs(9, "Traverse failed. No accounts found");
            return false;
        }

        let d = new Date();
        const trvrsToday = ("0" + (d.getDate())).slice(-2) + "/"
            + ("0" + (d.getMonth() + 1)).slice(-2) + "/"
            + d.getFullYear();

        d.setMonth(d.getMonth() - 3);
        const trvrs3MonthsAgo = ("0" + (d.getDate())).slice(-2) + "/"
            + ("0" + (d.getMonth() + 1)).slice(-2) + "/"
            + d.getFullYear();

        d.setMonth(d.getMonth() + 39);
        const trvrsIn3Years = ("0" + (d.getDate())).slice(-2) + "/"
            + ("0" + (d.getMonth() + 1)).slice(-2) + "/"
            + d.getFullYear();

        writeLog(`tzameret slika traverse: ${slikaAccountStubs.length} account(s) found`);

        for (const accStub of slikaAccountStubs) {
            writeLog(`tzameret slika traverse: processing account ${accStub.slikaAccount}...`);
            accStub.extractDate = new Date().getFullYear() + ''
                + ("0" + (new Date().getMonth() + 1)).slice(-2) + ''
                + ("0" + (new Date().getDate())).slice(-2) + ''
                + ("0" + (new Date().getHours())).slice(-2) + ''
                + ("0" + (new Date().getMinutes())).slice(-2);

            if (!await this.traversePastData({
                    businessId: accStub.slikaAccount,
                    dateFrom: trvrs3MonthsAgo,
                    dateTo: trvrsToday,
                    accStub: accStub
                })
                || !await this.traverseFutureData({
                    businessId: accStub.slikaAccount,
                    dateFrom: trvrsToday,
                    dateTo: trvrsIn3Years,
                    accStub: accStub
                })) {
                writeLog(`tzameret slika traverse: processing account ${accStub.slikaAccount}... failed`);
                return false;
            }

            writeLog(`tzameret slika traverse: processing account ${accStub.slikaAccount}... done`);
        }

        writeLog("tzameret slika traverse: done");
        return true;
    }

    async traversePastData({businessId, dateFrom, dateTo, page = 1, accStub} = {}) {
        let [error, response, data] = await this.tzameretPost({
            url: "/Transfers",
            referer: "https://service.tzm.co.il/Transfers",
            body: {
                BusinessID: businessId,
                AccountID: undefined,
                TransferNum: undefined,
                DateFrom: dateFrom,
                DateTo: dateTo,
//                Dummy: undefined,
                sort: "TransferDate",
                sortdir: "ASC",
                page: page
            },
            parseDOM: true
        });
        if (error !== null) {
            myEmitterLogs(9, `request failed on /Transfers or DOM parsing failure when switching to account ${businessId}, page: ${page}`);
            return false;
        }

        if (!await this.traverseTable(accStub)) {
            return false;
        }

        if (page === 1) {
            const pagesNum = this.tablePagesNumFromContent();
            while (++page <= pagesNum) {
                if (!await this.traversePastData({
                    businessId: businessId,
                    dateFrom: dateFrom,
                    dateTo: dateTo,
                    page: page,
                    accStub
                })) {
                    return false;
                }
            }
        }

        return true;
    }

    async traverseFutureData({businessId, dateFrom, dateTo, page = 1, accStub} = {}) {
        let [error, response, data] = await this.tzameretPost({
            url: "/FutureTransfer",
            referer: "https://service.tzm.co.il/FutureTransfer",
            body: {
                BusinessID: businessId,
                AccountID: undefined,
                DateFrom: dateFrom,
                DateTo: dateTo,
//                Dummy: undefined,
                sort: "TransferDate",
                sortdir: "ASC",
                page: page
            },
            parseDOM: true
        });
        if (error !== null) {
            myEmitterLogs(9, `request failed on /FutureTransfer or DOM parsing failure when switching to account ${businessId}, page: ${page}`);
            return false;
        }

        if (!await this.traverseTable(accStub)) {
            return false;
        }

        if (page === 1) {
            const pagesNum = this.tablePagesNumFromContent();
            while (++page <= pagesNum) {
                if (!await this.traverseFutureData({
                    businessId: businessId,
                    dateFrom: dateFrom,
                    dateTo: dateTo,
                    page: page,
                    accStub
                })) {
                    return false;
                }
            }
        }

        return true;
    }

    tablePagesNumFromContent() {
        return this.currentContent.find("div.pager[rel='transfers']")
            .children()
            .filter((i, v) => {
                return $(v).text().replace(/\D/g, '').length > 0;
            })
            .length;
    }

    async traverseTable(accStub) {
        const tableDOM = this.currentContent.find('table#infoTable');
        if (tableDOM.length === 0) {
            writeLog(`tzameret slika traverse table: table#infoTable not found`);
            return true;
        }

        const columnNames = ['תאריך העברה', 'בנק', 'סניף', 'מספר חשבון', 'סכום העברה נטו', 'סכום העברה ברוטו'];
        const columnLocations = Object.create(null);
        tableDOM.find('th')
            .each((i, v) => {
                const foundInColumnsAt = columnNames.indexOf($(v).text());
                if (foundInColumnsAt >= 0) {
                    columnLocations[columnNames[foundInColumnsAt]] = i;
                    columnNames.splice(foundInColumnsAt, 1);
                }
                return columnNames.length > 0;
            });

        if (columnNames.length > 0) {
            writeLog(`tzameret slika traverse table: columns ${columnNames} not found`);
            return false;
        }

        const maxColumnIndex = Math.max(...Object.values(columnLocations));
        tableDOM.find('tr')
            .filter((i, v) => {
                return $(v).children('td').length > maxColumnIndex;
            })
            .each((i, v) => {
                const cells = $(v).children('td');
                const sum = cells.eq(columnLocations['סכום העברה נטו']).text().replace(/[^\d\.-]/g, ""),
                    valdate = cells.eq(columnLocations['תאריך העברה']).text().replace(/[^\d\/]/g, ""),
                    grand = cells.eq(columnLocations['סכום העברה ברוטו']).text().replace(/[^\d\.-]/g, "");

                if (valdate.length < 8) {
                    return true;
                }

                this.arr.push(Object.assign({
                    "regularPaymentsTotal": sum,
                    "nextTotal": sum,
                    "branchNumber": cells.eq(columnLocations['סניף']).text().replace(/[^\d]/g, ""),
                    "accountNumber": cells.eq(columnLocations['מספר חשבון']).text().replace(/[^\d]/g, ""),
                    "valueDate": cells.eq(columnLocations['תאריך העברה']).text().trim(),
                    "grandTotal": grand,
                    "paymentsTotal": sum
                }, accStub));
            });
        return true;
    }

    async process() {
        try {
            if (!await this.login()) {
                return;
            }
        } catch (e) {
            myEmitterLogs(9, e.toString());
            return;
        }

        try {
            if (!await this.traverse()) {
                return;
            }
        } catch (e) {
            myEmitterLogs(9, e.toString());
            return;
        } finally {
            try {
                await this.logout();
            } catch (e) {
                myEmitterLogs(9, e.toString());
            }
        }

        let keepTrying = true;
        do {
            writeLog("tzameret slika send results...");
            try {
                await all.banks.core.services.slikaAccount(this.arr);
                keepTrying = false;
                writeLog("tzameret slika send results... Done");
            } catch (error) {
                writeLog("tzameret slika send results... Got " + error);
                keepTrying = 'discard' === error;
            }
        } while (keepTrying);

        writeLog("tzameret slika killVpn");
        monitorVpn.killVpn(() => {
            myEmitterLogs(25);
        });
    }
}

all.banks.accounts.tzameret = new tzameret();
