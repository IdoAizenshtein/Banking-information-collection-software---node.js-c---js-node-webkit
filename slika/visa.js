class visa {
    constructor() {
        this.cookies = "";
        this.idxAcc = 0;
        this.idxCards = 0;
        this.eventVal = "";
        this.param = "";
        this.pathUrl = "";
        this.logoutTime = 0;
        this.arr = [];
        this.guid = '';

        this.timedOutAttemptsTillGiveIn = 3;
        this.timedOutAttempts = 0;
        this.lastUrl = '';

        this.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36';
        // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    }

    visaPost(url, Referer, cookie, body, cb, paramExtra) {
        monitorActivityClass.setIntervalActivity();
        writeLog("visaPost: " + url);
        this.lastUrl = url;
        var options = {
            uri: url,
            family: 4,
            timeout: 400000,
            headers: {
                'User-Agent': this.userAgent//'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            }
        };
        options.method = "POST";
        options.body = "POST";
        options.headers['Upgrade-Insecure-Requests'] = "1";
        options.headers['Content-Type'] = "application/x-www-form-urlencoded";
        options.headers.Host = "services.cal-online.co.il";
        options.headers.Origin = "https://services.cal-online.co.il";
        options.form = body;
        if (cookie !== null) {
            options.headers.Cookie = cookie;
        }
        if (Referer !== null) {
            options.headers.Referer = Referer;
        }
        if (paramExtra) {
            options.headers["X-MicrosoftAjax"] = "Delta=true";
            options.headers["X-Requested-With"] = "XMLHttpRequest";
        }
        senderReq.sendersServer(options, (error, response, data) => {
            if (error !== null && (error.code === 'ETIMEDOUT' || error.connect === true)) {
                writeLog("ETIMEDOUT");

                this.timedOutAttempts++;
                if (this.timedOutAttempts < this.timedOutAttemptsTillGiveIn) {
                    writeLog("Retry no. " + this.timedOutAttempts + "...");
                    this.logOut(() => {
                        this.cookies = "";
                        this.login(() => {
                            this.visaPost(url, Referer, cookie, body, cb, paramExtra);
                        });
                    });
                } else {
                    myEmitterLogs(9, error);
                }
            } else {
                this.timedOutAttempts = 0;
                if (response !== undefined) {
                    if (response.headers !== undefined) {
                        if (response.headers["set-cookie"]) {
                            this.getSetCookies(response.headers["set-cookie"])
                                .then((res) => {
                                    cb(error, response, data);
                                });
                        } else {
                            cb(error, response, data);
                        }
                    } else {
                        cb(error, response, data);
                    }
                } else {
                    cb(error, response, data);
                }
            }
        });
    }

    visaPostJson(url, Referer, cookie, body, cb, paramExtra) {
        monitorActivityClass.setIntervalActivity();
        writeLog("visaPost: " + url);
        this.lastUrl = url;
        var options = {
            uri: url,
            family: 4,
            timeout: 400000,
            headers: {
                'User-Agent': this.userAgent//'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            }
        };
        options.method = "POST";
        options.body = body;

        if(url.includes('Authenticate')){
            options.headers['Content-Type'] = "application/json";
            options.headers.Host = "api.cal-online.co.il";
            options.headers.Origin = "https://connect-business.cal-online.co.il";
            options.headers['X-Site-Id'] = this.guid;
        }else{
            options.headers['Upgrade-Insecure-Requests'] = "1";
            options.headers['Content-Type'] = "application/json; charset=UTF-8";
            options.headers.Host = "services.cal-online.co.il";
            options.headers.Origin = "https://services.cal-online.co.il";
        }

        options.json = true;
        if (cookie !== null) {
            options.headers.Cookie = cookie;
        }
        if (Referer !== null) {
            options.headers.Referer = Referer;
        }
        senderReq.sendersServer(options, (error, response, data) => {
            if (error !== null && (error.code === 'ETIMEDOUT' || error.connect === true)) {
                writeLog("ETIMEDOUT");

                this.timedOutAttempts++;
                if (this.timedOutAttempts < this.timedOutAttemptsTillGiveIn) {
                    writeLog("Retry no. " + this.timedOutAttempts + "...");
                    this.logOut(() => {
                        this.cookies = "";
                        this.login(() => {
                            this.visaPostJson(url, Referer, cookie, body, cb, paramExtra);
                        });
                    });
                } else {
                    myEmitterLogs(9, error);
                }
            } else {
                this.timedOutAttempts = 0;
                if (response !== undefined) {
                    if (response.headers !== undefined) {
                        if (response.headers["set-cookie"]) {
                            this.getSetCookies(response.headers["set-cookie"])
                                .then((res) => {
                                    cb(error, response, data);
                                });
                        } else {
                            cb(error, response, data);
                        }
                    } else {
                        cb(error, response, data);
                    }
                } else {
                    cb(error, response, data);
                }
            }
        });
    }

    visaRestGet(url, Referer, cookie, cb) {
        monitorActivityClass.setIntervalActivity();
        writeLog("visaRestGet: " + url);
        var options = {
            uri: url,
            family: 4,
            timeout: 400000,
            headers: {
                'User-Agent': this.userAgent//'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            }
        };
        options.headers['Connection'] = "Keep-Alive";
        options.headers['Upgrade-Insecure-Requests'] = "1";
        options.method = "GET";
        options.headers.Host = "services.cal-online.co.il";
        if (cookie !== null) {
            options.headers.Cookie = cookie;
        }
        if (Referer !== null) {
            options.headers.Referer = Referer;
        }
        senderReq.sendersServer(options, (error, response, data) => {
            if (error !== null && (error.code === 'ETIMEDOUT' || error.connect === true)) {
                writeLog("ETIMEDOUT");

                this.timedOutAttempts++;
                if (this.timedOutAttempts < this.timedOutAttemptsTillGiveIn) {
                    writeLog("Retry no. " + this.timedOutAttempts + "...");
                    this.logOut(() => {
                        this.cookies = "";
                        this.login(() => {
                            this.visaRestGet(url, Referer, cookie, cb);
                        });
                    });
                } else {
                    myEmitterLogs(9, error);
                }
            } else {
                this.timedOutAttempts = 0;
                if (response !== undefined) {
                    if (response.headers !== undefined) {
                        if (response.headers["set-cookie"]) {
                            this.getSetCookies(response.headers["set-cookie"])
                                .then((res) => {
                                    cb(error, response, data);
                                });
                        } else {
                            cb(error, response, data);
                        }
                    } else {
                        cb(error, response, data);
                    }
                } else {
                    cb(error, response, data);
                }
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
                                        v1 = v.split(";")[0] + ";"
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
                console.log(e);
                debugger
            }
        });
    }

    initCookies() {
        const that = this;

        return new Promise((resolve, reject) => {
            $('#filecontainerloginWithUpdatedUserAgent').attr('src', 'https://services.cal-online.co.il/BUSINESS/screens/UsersManagement/Login.aspx');
            let times = 1;
            const checker = setInterval(() => {
                monitorActivityClass.setIntervalActivity();
                win.cookies.getAll({}, function (arr) {
                    if (arr.length > 5) {
                        const cookiesSet = arr.reduce((acmlr, ck) => {
                            acmlr[ck.name] = ck.value;
                            return acmlr;
                        }, Object.create(null));
                        that.cookies = Object.entries(cookiesSet)
                            .map(([key, val]) => key + '=' + val)
                            .join(";");
//                        that.getSetCookies(arr.map((ck) => ck.name + '=' + ck.value).join(";"));

                        $('#filecontainerloginWithUpdatedUserAgent').attr('src', '');
                        arr.forEach((ck) => {
                            if (!ck.domain) {
                                win.cookies.remove({url: `https://www.cal-online.co.il${ck.path}`, name: ck.name});
                            } else if (ck.domain.startsWith('.')) {
                                win.cookies.remove({url: `https://services${ck.domain}${ck.path}`, name: ck.name})
                            } else {
                                win.cookies.remove({url: `https://${ck.domain}${ck.path}`, name: ck.name});
                            }
//                            win.cookies.remove({url: 'https://services.cal-online.co.il', name: ck.name})
                        });
//                        arr.forEach((ck) => win.cookies.remove({url: `https://${ck.domain}${ck.path}`, name: ck.name}));
                        resolve(true);
                        clearInterval(checker);
                    } else if (times++ > 15) {
                        $('#filecontainerloginWithUpdatedUserAgent').attr('src', '');
                        clearInterval(checker);
                        resolve(false);
                    }
                });

            }, 2000);
        });
    }

    async login(cb) {
        try {
            let dateTo = new Date();
            let dateFrom = new Date();
            dateFrom.setMonth(dateFrom.getMonth() - 3);
            this.dates = {
                dateFrom: [
                    ("0" + (dateFrom.getDate())).slice(-2),
                    ("0" + (dateFrom.getMonth() + 1)).slice(-2),
                    dateFrom.getFullYear().toString()
                ],
                dateTo: [
                    ("0" + (dateTo.getDate())).slice(-2),
                    ("0" + (dateTo.getMonth() + 1)).slice(-2),
                    dateTo.getFullYear().toString()
                ]
            };

            writeLog("login");

            // if (!await this.initCookies()) {
            //     myEmitterLogs(9, 'Failed to get initial cookies.');
            //     return false;
            // }

            this.visaRestGet(
                "https://services.cal-online.co.il/BUSINESS/screens/UsersManagement/Login.aspx",
                'https://services.cal-online.co.il/Business/Screens/UsersManagement/Login.aspx',
                null,
                (error, response, data) => {
                    this.guid = data.split('guid: "')[1].split('",')[0];
                    //console.log(error, response, data)
                    var cookSplit = this.cookies.split(";").find(it => it.includes('TS010'));
                    this.cookies = cookSplit + ';CalLoggedIn=1;';
                    var data = all.banks.core.services.parseHtml(data);
                    var serializeForm = data.find("form").serializeArray();
                    var obj = {};
                    serializeForm.forEach((vals) => {
                        obj[vals.name] = vals.value;
                    });
                    // obj["lgnLogin$UserName"] = all.banks.accountDetails.bank.username.slice(0, 8);
                    // obj["lgnLogin$Password"] = all.banks.accountDetails.bank.password.slice(0, 10);
                    // obj["lgnLogin$LoginImageButton"] = "כניסה לחשבון שלי";
                    this.visaPostJson(
                        "https://api.cal-online.co.il/BusinessCalConnect/api/Login/Authenticate?loginType=1",
                        "https://connect-business.cal-online.co.il/",
                        null,
                        {
                            "username": all.banks.accountDetails.bank.username.slice(0, 8).toUpperCase(),
                            "password": all.banks.accountDetails.bank.password.slice(0, 10)
                        },
                        (error, response, data) => {
                            // groupPid: "0f5aec6c-2c7f-42b3-8465-67543fead41d"
                            // result: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImlzcyI6IkdXIFBVQiIsImlhdCI6IjE2NzA5NDU0ODciLCJleHAiOiIxNjcwOTQ2Mzg3IiwibmJmIjoiMTY3MDk0NTQ4NyIsInV1aWQiOiIwMDAwMDE4MjFmOGJjOTcyLWJkZDk1MzcifQ.eyJrZXkiOiJmMmI2NmY2MC04OGVkLTQ3MzktYTAzOS02ZTRmNDJhYmNlM2UifQ.AQbn6hhuAe9OCFVDkqK_pfNofh_6h9K7YnY6b7Lk9k4"
                            // statusCode: 1
                            // statusDescription: "הצלחה"
                            // statusTitle: "הצלחה"
                            if (response.statusCode === 200 && data && data.result) {
                                obj["token_bridge"] = data.result;
                                obj["CcLogin"] = '';
                                    // console.log(obj)
                                this.visaPost(
                                    "https://services.cal-online.co.il/BUSINESS/screens/UsersManagement/Login.aspx",
                                    "https://services.cal-online.co.il/BUSINESS/screens/UsersManagement/Login.aspx",
                                    this.cookies,
                                    obj,
                                    (error, response, data) => {
                                        var rid = response.headers.location;

                                        if (rid === undefined) {
                                            const loginErrMessage = all.banks.core.services.parseHtml(data).find("#lgnLogin_tblErrorMessage").text().trim();
                                            myEmitterLogs(loginErrMessage.includes("הכניסה למערכת נחסמה") ? 8 : 5);
                                            writeLog("Login failed: " + loginErrMessage);
                                            return;
                                        } else if (rid.includes("Error.aspx")) {
                                            writeLog("Login failed: " + rid);
                                            myEmitterLogs(5);
                                            return;
                                        } else if (rid.includes('ChangePasswordOut.aspx')) {
                                            writeLog("Login failed: " + rid);
                                            myEmitterLogs(6);
                                            return;
                                        } else if (rid.includes('marketingError.htm')) {
                                            writeLog("Login failed: " + rid);
                                            myEmitterLogs(2);
                                            return;
                                        } else if (rid.includes('BankingChannel367Out.aspx')) {
                                            writeLog("Login failed: " + rid);
                                            this.logOut(() => myEmitterLogs(36));
                                            return;
                                        }

                                        this.visaRestGet(
                                            "https://services.cal-online.co.il" + rid,
                                            "https://services.cal-online.co.il/BUSINESS/screens/UsersManagement/Login.aspx",
                                            this.cookies,
                                            (error, response, data) => {
                                                // this.cookies += "CalAllowSpamPage=False;";
                                                //console.log(error, response, data);
                                                this.visaRestGet(
                                                    "https://services.cal-online.co.il/BUSINESS/screens/UsersManagement/MainPage.aspx",
                                                    "https://services.cal-online.co.il" + rid,
                                                    this.cookies,
                                                    (error, response, data) => {
                                                        //console.log(error, response, data);
                                                        if (!all.banks.openBankPage) {
                                                            if (!cb) {
                                                                this.loadPrev();

                                                                // this.loadFuture();

                                                            } else {
                                                                cb();
                                                            }
                                                        } else {
                                                            var cookSplit = this.cookies.split(";");
                                                            var i1, len1 = cookSplit.length;
                                                            for (i1 = 0; i1 < len1; i1++) {
                                                                var v1 = cookSplit[i1];
                                                                if (v1 !== "") {
                                                                    var nameExist = v1.split("=")[0].replace(/\s/g, "");
                                                                    var valExist = v1.split("=")[1].replace(/\s/g, "");
                                                                    win.cookies.set({
                                                                        url: 'https://services.cal-online.co.il',
                                                                        name: nameExist,
                                                                        domain: 'services.cal-online.co.il',
                                                                        value: valExist
                                                                    })
                                                                }
                                                            }
                                                            setTimeout(() => {
                                                                all.banks.core.services.openBankPage("https://services.cal-online.co.il/BUSINESS/screens/Credit/BankCreditDetails.aspx");
                                                            }, 3000)
                                                        }
                                                    }
                                                )
                                            }
                                        )


                                    }
                                )
                            } else {
                                writeLog("Login failed: " + response.statusCode);
                                myEmitterLogs(5);
                            }
                        })
                }
            )

        } catch (e) {
            console.log(e);
            debugger
        }

    }

    setAccList(accSelect) {
        const result = [];
        const map = new Map();
        for (const item of accSelect) {
            if (!map.has(item.value)) {
                map.set(item.value, true);
                result.push({
                    value: item.value,
                    text: item.text.split(",")[1].replace(/\s\s+/g, "").trim(),
                    isSelected: item.selected
                });
            }
        }
        this.accSelect = result;
        this.accLength = this.accSelect.length;
    }

    loadPrev() {
        writeLog("loadPrev");

        this.visaRestGet(
            "https://services.cal-online.co.il/BUSINESS/screens/Credit/BankCreditDetails.aspx",
            "https://services.cal-online.co.il/BUSINESS/screens/UsersManagement/MainPage.aspx",
            this.cookies,
            (error, response, data) => {
                //console.log(data)
                var data = all.banks.core.services.parseHtml(data);
                const accSelect = data.find("select[name='ctl00$FormArea$ctlBusinessInput$cmbBusiness'] > option").toArray();
                this.setAccList(accSelect)

                this.valMainRoot = data.find("select[name='ctl00$FormArea$ctlBusinessInput$cmbChainId']").val();
                this.MATRIX_VIEWSTATE = data.find("input[name='ctl00$__MATRIX_VIEWSTATE']").val();
                this.eventVal = data.find("input[name='__EVENTVALIDATION']").val();
                this.useTxtBusiness = data.find("input[name='ctl00$FormArea$ctlBusinessInput$txtBusiness']").length > 0;
                // console.log(this.accLength);
                writeLog("cmbBusiness: " + this.accLength);
                this.cardsSelect = data.find("select[name='ctl00$FormArea$ctlBusinessInput$cmbCreditBrand'] > option");
                this.cardsLength = this.cardsSelect.length;

                if (data.find("select[name='ctl00$FormArea$ctlBusinessInput$cmbVendorType']").length) {
                    var obj = {};
                    obj["ctl00$MainScript"] = "ctl00$FormArea$ctlBusinessInput$panel1|ctl00$FormArea$ctlBusinessInput$cmbVendorType";
                    obj["__WAIT_MSG_BY_CULTURE"] = "אנא המתן...";
                    obj["hidClass"] = "";
                    obj["ctl00$FormArea$ctlBusinessInput$cmbVendorType"] = "0";

                    this.insertIfSelectableParams(obj);

                    obj["ctl00$FormArea$ctlBusinessInput$hiddenForPermission"] = "dummy";
                    obj["ctl00$FormArea$cboCurrencyList"] = "All";

                    const monYearTillSlctd = data.find("select[name='ctl00$FormArea$clndrEndDate$ctl00']").val();
                    const dayTillSlctd = data.find("select[name='ctl00$FormArea$clndrEndDate$ctl01']").val();
                    if (monYearTillSlctd && dayTillSlctd) {
                        const monYearLast = monYearTillSlctd.split("/");
                        this.dates.dateTo[0] = dayTillSlctd;
                        this.dates.dateTo[1] = monYearLast[0];
                        this.dates.dateTo[2] = monYearLast[1];
                    }

                    obj["ctl00$FormArea$clndrStartDate$ctl00"] = this.dates.dateFrom[1] + "/" + this.dates.dateFrom[2];
                    obj["ctl00$FormArea$clndrStartDate$ctl01"] = parseFloat(this.dates.dateFrom[0]);
                    obj["ctl00$FormArea$clndrStartDate$ctl02"] = this.dates.dateFrom[0] + "/" + this.dates.dateFrom[1] + "/" + this.dates.dateFrom[2];
                    obj["ctl00$FormArea$clndrEndDate$ctl00"] = this.dates.dateTo[1] + "/" + this.dates.dateTo[2];
                    obj["ctl00$FormArea$clndrEndDate$ctl01"] = parseFloat(this.dates.dateTo[0]);
                    obj["ctl00$FormArea$clndrEndDate$ctl02"] = this.dates.dateTo[0] + "/" + this.dates.dateTo[1] + "/" + this.dates.dateTo[2];
                    obj["ctl00$__MATRIX_VIEWSTATE"] = this.MATRIX_VIEWSTATE;
                    obj["ctl00$hiddenMsgboxId"] = "ctl00_FormArea_msgboxErrorMessages";
                    obj["__EVENTTARGET"] = "ctl00$FormArea$ctlBusinessInput$cmbVendorType";
                    obj["__EVENTARGUMENT"] = "";
                    obj["__LASTFOCUS"] = "";
                    obj["__VIEWSTATE"] = "";
                    obj["__EVENTVALIDATION"] = this.eventVal;
                    obj["__ASYNCPOST"] = "true";
                    obj[""] = "";
                    this.changeAccPost(obj, () => {
                        this.changeAcc();
                    })
                } else {
                    this.changeAcc();
                }
            }
        )
    }

    changeAccPost(obj, cb, isProcessPrev) {
        // console.log(obj);
        this.visaPost(
            "https://services.cal-online.co.il/BUSINESS/screens/Credit/BankCreditDetails.aspx",
            "https://services.cal-online.co.il/BUSINESS/screens/Credit/BankCreditDetails.aspx",
            this.cookies,
            obj,
            (error, response, data) => {
                try {
                    if (!isProcessPrev) {
                        const eventVal = data.split("__EVENTVALIDATION|")[1].split("|")[0];
                        // writeHtmlFile('changeAccPostBankCreditDetails', data);
                        this.eventVal = eventVal;
                        var data = all.banks.core.services.parseHtml(data);
                        this.MATRIX_VIEWSTATE = data.find("input[name='ctl00$__MATRIX_VIEWSTATE']").val();

                        const accSelect = data.find("select[name='ctl00$FormArea$ctlBusinessInput$cmbBusiness'] > option").toArray();
                        this.setAccList(accSelect)

                        this.cardsSelect = data.find("select[name='ctl00$FormArea$ctlBusinessInput$cmbCreditBrand'] > option");
                        this.cardsLength = this.cardsSelect.length;
                        if (!this.useTxtBusiness) {
                            this.useTxtBusiness = data.find("input[name='ctl00$FormArea$ctlBusinessInput$txtBusiness']").length > 0;
                        }
                        cb();
                    } else {
                        cb(data);
                    }
                } catch (e) {
                    this.sendSlikaCtrl();
                    //this.logOut(() => myEmitterLogs(9, e));
                }
            })
    }

    changeAcc() {
        writeLog("changeAcc cmbBusiness: " + this.accSelect[this.idxAcc].value);

        var obj = {};
        obj["ctl00$MainScript"] = "ctl00$FormArea$ctlBusinessInput$panel1|ctl00$FormArea$ctlBusinessInput$cmbBusiness";
        obj["__WAIT_MSG_BY_CULTURE"] = "אנא המתן...";
        obj["hidClass"] = "";
        obj["ctl00$FormArea$ctlBusinessInput$cmbVendorType"] = "0";

        this.insertIfSelectableParams(obj);

        obj["ctl00$FormArea$ctlBusinessInput$hiddenForPermission"] = "dummy";
        obj["ctl00$FormArea$cboCurrencyList"] = "Nis";
        obj["ctl00$FormArea$clndrStartDate$ctl00"] = this.dates.dateFrom[1] + "/" + this.dates.dateFrom[2];
        obj["ctl00$FormArea$clndrStartDate$ctl01"] = parseFloat(this.dates.dateFrom[0]);
        obj["ctl00$FormArea$clndrStartDate$ctl02"] = this.dates.dateFrom[0] + "/" + this.dates.dateFrom[1] + "/" + this.dates.dateFrom[2];
        obj["ctl00$FormArea$clndrEndDate$ctl00"] = this.dates.dateTo[1] + "/" + this.dates.dateTo[2];
        obj["ctl00$FormArea$clndrEndDate$ctl01"] = parseFloat(this.dates.dateTo[0]);
        obj["ctl00$FormArea$clndrEndDate$ctl02"] = this.dates.dateTo[0] + "/" + this.dates.dateTo[1] + "/" + this.dates.dateTo[2];
        obj["ctl00$__MATRIX_VIEWSTATE"] = this.MATRIX_VIEWSTATE;
        obj["ctl00$hiddenMsgboxId"] = "ctl00_FormArea_msgboxErrorMessages";
        obj["__EVENTTARGET"] = "ctl00$FormArea$ctlBusinessInput$cmbBusiness";
        obj["__EVENTARGUMENT"] = "";
        obj["__LASTFOCUS"] = "";
        obj["__VIEWSTATE"] = "";
        obj["__EVENTVALIDATION"] = this.eventVal;
        obj["__ASYNCPOST"] = "true";
        obj[""] = "";
        this.changeAccPost(obj, () => {
            var obj = {};
            obj["__WAIT_MSG_BY_CULTURE"] = "אנא המתן...";
            obj["hidClass"] = "";
            obj["ctl00$FormArea$ctlBusinessInput$cmbVendorType"] = "0";

            this.insertIfSelectableParams(obj);

            obj["ctl00$FormArea$ctlBusinessInput$hiddenForPermission"] = "dummy";
            obj["ctl00$FormArea$cboCurrencyList"] = "Nis";
            obj["ctl00$FormArea$clndrStartDate$ctl00"] = this.dates.dateFrom[1] + "/" + this.dates.dateFrom[2];
            obj["ctl00$FormArea$clndrStartDate$ctl01"] = parseFloat(this.dates.dateFrom[0]);
            obj["ctl00$FormArea$clndrStartDate$ctl02"] = this.dates.dateFrom[0] + "/" + this.dates.dateFrom[1] + "/" + this.dates.dateFrom[2];
            obj["ctl00$FormArea$clndrEndDate$ctl00"] = this.dates.dateTo[1] + "/" + this.dates.dateTo[2];
            obj["ctl00$FormArea$clndrEndDate$ctl01"] = parseFloat(this.dates.dateTo[0]);
            obj["ctl00$FormArea$clndrEndDate$ctl02"] = this.dates.dateTo[0] + "/" + this.dates.dateTo[1] + "/" + this.dates.dateTo[2];
            obj["ctl00$__MATRIX_VIEWSTATE"] = this.MATRIX_VIEWSTATE;
            obj["ctl00$hiddenMsgboxId"] = "ctl00_FormArea_msgboxErrorMessages";
            obj["__EVENTTARGET"] = "";
            obj["__EVENTARGUMENT"] = "";
            obj["__LASTFOCUS"] = "";
            obj["__VIEWSTATE"] = "";
            obj["__EVENTVALIDATION"] = this.eventVal;
            obj["ctl00$FormArea$DisplayButton.x"] = "67";
            obj["ctl00$FormArea$DisplayButton.y"] = "16";
            this.changeAccPost(obj, (data) => {
                let nextStep = () => {
                    if ((this.idxAcc + 1) < this.accLength) {
                        this.idxAcc += 1;
                        this.changeAcc();
                    } else {
                        console.log("loadFuture now");
                        //console.log(this.arr);
                        this.idxAcc = 0;
                        this.loadFuture();
                    }
                };

                let traverseTable = (data) => {
                    try {
                        // writeHtmlFile('visa', data);
                        var data = all.banks.core.services.parseHtml(data);
                        this.MATRIX_VIEWSTATE = data.find("input[name='ctl00$__MATRIX_VIEWSTATE']").val();
                        this.eventVal = data.find("input[name='__EVENTVALIDATION']").val();
                        let table = data.find("#CreditGrid > tbody > tr").not("#ctl00_rowTotal, #ctl00_footerBottomBorderRow");
                        if (table.length) {
                            const selectedCardType = all.banks.core.services.getTypeCreditCard(
                                data.find("select[name='ctl00$FormArea$ctlBusinessInput$cmbCreditBrand']").text());
                            const hasCreditTypeColumn = data.find('#CreditGrid td.GridHeaderAlign.GridHeaderCaption:contains("חברת אשראי")').length > 0;
                            // const valDateIndex = hasCreditTypeColumn ? 6 : 5;// 1;
                            const valDateIndexPlanB = 1;
                            const regularPaymentsTotalIndex = hasCreditTypeColumn ? 7 : 6;
                            const regularPaymentsTotalIndexPlanB = hasCreditTypeColumn ? 5 : 4;
                            table.each((i, v) => {
                                var val = $(v).children("td");
                                var valDate = (val.eq(1).children("span").text().trim()
                                    || val.eq(valDateIndexPlanB).children("span").text())
                                    .replace(/\s/g, "").split("/");
                                var regularPaymentsTotal = (val.eq(regularPaymentsTotalIndex).text().trim()
                                    || val.eq(regularPaymentsTotalIndexPlanB).text())
                                    .replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, '');
                                if (regularPaymentsTotal.includes("-")) {
                                    regularPaymentsTotal = "-" + regularPaymentsTotal.replace(/-/g, '');
                                }
                                if (valDate.length === 3) {
                                    this.arr.push({
                                        "target_idStr": all.banks.accountDetails.bank.targetId,
                                        "tokenStr": all.banks.accountDetails.bank.token,
                                        "bankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                        "extractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                        "solek_desc": this.accSelect[this.idxAcc].text,
                                        "paymentsTotal": 0,
                                        "grandTotal": 0,
                                        "slikaAccount": this.accSelect[this.idxAcc].value,
                                        "valueDate": valDate[0] + "/" + valDate[1] + "/" + (valDate[2].length === 2 ? "20" : "") + valDate[2], // "/20" + valDate[2],
                                        "regularPaymentsTotal": regularPaymentsTotal || null,
                                        "nextTotal": regularPaymentsTotal || null,
                                        "cardType": hasCreditTypeColumn ? all.banks.core.services.getTypeCreditCard(val.eq(3).text()) || selectedCardType
                                            : selectedCardType
                                    });
                                }
                            });

                            if (data.find("#ctl00_FormArea_ctlGridPaging_btnNext").length > 0) {
                                obj["ctl00$__MATRIX_VIEWSTATE"] = this.MATRIX_VIEWSTATE;
                                obj["__EVENTVALIDATION"] = this.eventVal;

                                delete obj["ctl00$FormArea$DisplayButton.x"];
                                delete obj["ctl00$FormArea$DisplayButton.y"];
                                delete obj["ctl00$FormArea$ctlAccountBrief$ctlAccountPaging$btnNext.x"];
                                delete obj["ctl00$FormArea$ctlAccountBrief$ctlAccountPaging$btnNext.y"];
                                obj['ctl00$FormArea$ctlGridPaging$btnNext.x'] = '84';
                                obj['ctl00$FormArea$ctlGridPaging$btnNext.y'] = '14';

                                this.changeAccPost(obj, traverseTable, true);
                            } else if (data.find('#ctl00_FormArea_ctlAccountBrief_ctlAccountPaging_btnNext').length > 0) {
                                obj["ctl00$__MATRIX_VIEWSTATE"] = this.MATRIX_VIEWSTATE;
                                obj["__EVENTVALIDATION"] = this.eventVal;

                                delete obj["ctl00$FormArea$DisplayButton.x"];
                                delete obj["ctl00$FormArea$DisplayButton.y"];
                                delete obj["ctl00$FormArea$ctlGridPaging$btnNext.x"];
                                delete obj["ctl00$FormArea$ctlGridPaging$btnNext.y"];
                                obj['ctl00$FormArea$ctlAccountBrief$ctlAccountPaging$btnNext.x'] = '76';
                                obj['ctl00$FormArea$ctlAccountBrief$ctlAccountPaging$btnNext.y'] = '17';

                                this.changeAccPost(obj, traverseTable, true);
                            } else {
                                nextStep();
                            }

                        } else {
                            nextStep();
                        }
                    } catch (e) {
                        console.log(e);
                        debugger
                    }
                };

                traverseTable(data);

            }, true);
        });
    }

    loadFuture() {
        writeLog("loadFuture");

        this.visaRestGet(
            "https://services.cal-online.co.il/BUSINESS/screens/Credit/FutureCredit.aspx",
            "https://services.cal-online.co.il/BUSINESS/screens/Credit/BankCreditDetails.aspx",
            this.cookies,
            (error, response, data) => {
                //console.log(data)
                // writeHtmlFile('FutureCredit', data);

                var data = all.banks.core.services.parseHtml(data);
                this.valMainRoot = data.find("select[name='ctl00$FormArea$ctlBusinessInput$cmbChainId']").val();

                const accSelect = data.find("select[name='ctl00$Chat$ddlChatBiz'] > option").toArray();
                this.setAccList(accSelect)
                console.log('loadFuture setAccList length: ', this.accLength)

                this.cardsSelect = data.find("select[name='ctl00$FormArea$ctlBusinessInput$cmbCreditBrand'] > option");
                this.MATRIX_VIEWSTATE = data.find("input[name='ctl00$__MATRIX_VIEWSTATE']").val();
                this.cardsLength = this.cardsSelect.length;
                this.valNowBrand = data.find("select[name='ctl00$FormArea$ctlBusinessInput$cmbCreditBrand']").val();
                // console.log(this.accLength);
                // console.log(this.cardsLength);
                this.idxAcc = 0;
                this.idxCards = 0;
                this.eventVal = data.find("input[name='__EVENTVALIDATION']").val();
                // if (this.accLength > 1) {
                // 	this.changeFuture(true);
                // }
                // else {
                // 	this.changeFuture();
                // }
                // this.processFuture();
                this.changeFuture(true);
            }
        )
    }

    changeFuture(changeMain) {
        // console.log("changeFuture");
        var obj = {};
        if (changeMain) {
            writeLog("changeFuture cmbBusiness: " + this.accSelect[this.idxAcc].value);
            // obj["ctl00$MainScript"] = "ctl00$FormArea$ctlBusinessInput$panel1|ctl00$FormArea$ctlBusinessInput$cmbBusiness";
            // obj["__EVENTTARGET"] = "ctl00$FormArea$ctlBusinessInput$cmbBusiness";

            this.visaPostJson(
                "https://services.cal-online.co.il/Business/screens/Transactions/webservices/transactions.asmx/GetBusinessesAutoComplete",
                "https://services.cal-online.co.il/BUSINESS/screens/Credit/FutureCredit.aspx",
                this.cookies,
                {"param": this.accSelect[this.idxAcc].value},
                (error, response, data) => {
                    this.visaPostJson(
                        "https://services.cal-online.co.il/Business/screens/Transactions/webservices/transactions.asmx/SetBusinessNumber",
                        "https://services.cal-online.co.il/BUSINESS/screens/Credit/FutureCredit.aspx",
                        this.cookies,
                        {"businessNum": this.accSelect[this.idxAcc].value},
                        (error, response, data) => {
                            this.visaRestGet(
                                "https://services.cal-online.co.il/BUSINESS/screens/Credit/FutureCredit.aspx",
                                "https://services.cal-online.co.il/BUSINESS/screens/Credit/BankCreditDetails.aspx",
                                this.cookies,
                                (error, response, data) => {
                                    var data = all.banks.core.services.parseHtml(data);
                                    this.eventVal = data.find("input[name='__EVENTVALIDATION']").val();
                                    this.MATRIX_VIEWSTATE = data.find("input[name='ctl00$__MATRIX_VIEWSTATE']").val();
                                    this.cardsSelect = data.find("select[name='ctl00$FormArea$ctlBusinessInput$cmbCreditBrand'] > option");
                                    this.cardsLength = this.cardsSelect.length;
                                    this.useTxtBusiness = data.find("input[name='ctl00$FormArea$ctlBusinessInput$txtBusiness']").length > 0;
                                    const ctl00$FormArea$ctlBusinessInput$cmbBusiness = data.find("select[name='ctl00$FormArea$ctlBusinessInput$cmbBusiness']");
                                    const ctl00$FormArea$ctlBusinessInput$cmbBusiness_attr = ctl00$FormArea$ctlBusinessInput$cmbBusiness.attr("disabled");
                                    this.ctl00$FormArea$ctlBusinessInput$cmbBusinessDisabled = ctl00$FormArea$ctlBusinessInput$cmbBusiness_attr && ctl00$FormArea$ctlBusinessInput$cmbBusiness_attr === "disabled" ? ctl00$FormArea$ctlBusinessInput$cmbBusiness.val() : false;
                                    this.changeFuture();
                                }
                            )

                        });
                });
        } else {
            writeLog("changeFuture cmbCreditBrand: " + this.cardsSelect.eq(this.idxCards).val());
            obj["ctl00$MainScript"] = "ctl00$FormArea$ctlBusinessInput$panel1|ctl00$FormArea$ctlBusinessInput$cmbCreditBrand";
            obj["__EVENTTARGET"] = "ctl00$FormArea$ctlBusinessInput$cmbCreditBrand";
            obj["__WAIT_MSG_BY_CULTURE"] = "אנא המתן...";
            obj["__EVENTARGUMENT"] = "";
            obj["__LASTFOCUS"] = "";
            obj["__VIEWSTATE"] = "";
            obj["__EVENTVALIDATION"] = this.eventVal;
            obj["hidClass"] = "";
            obj["ctl00$FormArea$ctlBusinessInput$hiddenForPermission"] = "dummy";
            obj["ctl00$__MATRIX_VIEWSTATE"] = this.MATRIX_VIEWSTATE;
            obj["ctl00$hiddenMsgboxId"] = "ctl00_FormArea_msgboxErrorMessages";
            obj["__ASYNCPOST"] = "true";
            obj["ctl00$Chat$chatBizSelected"] = "";
            obj[""] = "";
            if (this.valMainRoot) {
                obj["ctl00$FormArea$ctlBusinessInput$cmbChainId"] = this.valMainRoot;
            }

            if (this.accLength > 1) {
                if (this.useTxtBusiness) {
                    obj["ctl00$FormArea$ctlBusinessInput$txtBusiness"] = this.accSelect.find(it => it.isSelected).value;
                } else {
                    if (this.ctl00$FormArea$ctlBusinessInput$cmbBusinessDisabled) {
                        obj["ctl00$FormArea$ctlBusinessInput$cmbBusiness"] = this.ctl00$FormArea$ctlBusinessInput$cmbBusinessDisabled;
                    } else {
                        obj["ctl00$FormArea$ctlBusinessInput$cmbBusiness"] = this.accSelect[this.idxAcc].value;
                    }
                }
            }


            if (this.cardsLength > 1) {
                obj["ctl00$FormArea$ctlBusinessInput$cmbCreditBrand"] = this.cardsSelect.eq(this.idxCards).val();
            }

            // console.log(obj);
            // console.log('changeFutureObj: ', obj);

            this.visaPost(
                "https://services.cal-online.co.il/BUSINESS/screens/Credit/FutureCredit.aspx",
                "https://services.cal-online.co.il/BUSINESS/screens/Credit/FutureCredit.aspx",
                this.cookies,
                obj,
                (error, response, data) => {
                    try {
                        // console.log(data);
                        // writeHtmlFile('VisaFutureCredit', data);
                        this.eventVal = data.split("__EVENTVALIDATION|")[1].split("|")[0];
                        var data = all.banks.core.services.parseHtml(data);
                        this.MATRIX_VIEWSTATE = data.find("input[name='ctl00$__MATRIX_VIEWSTATE']").val();
                        //console.log(this.eventVal);
                        if (changeMain) {
                            this.cardsSelect = data.find("select[name='ctl00$FormArea$ctlBusinessInput$cmbCreditBrand'] > option");
                            this.cardsLength = this.cardsSelect.length;
                            this.changeFuture();
                        } else {
                            this.processFuture();
                        }
                    } catch (e) {
                        console.log(e);
                        this.changeFuture();
                    }
                }, true)
        }


    }

    processFuture() {
        try {
            writeLog("processFuture cmbBusiness: " + this.accSelect[this.idxAcc].value + ", " + "cmbCreditBrand: " + this.cardsSelect.eq(this.idxCards).val());
            //console.log("processFuture");
            var obj = {};
            obj["__WAIT_MSG_BY_CULTURE"] = "אנא המתן";
            obj["ctl00$FormArea$ctlBusinessInput$hiddenForPermission"] = "dummy";
            obj["ctl00$FormArea$DisplayButton.x"] = "85";
            obj["ctl00$FormArea$DisplayButton.y"] = "37";
            obj["ctl00$Chat$chatBizSelected"] = "";
            obj["ctl00$__MATRIX_VIEWSTATE"] = this.MATRIX_VIEWSTATE;
            obj["ctl00$hiddenMsgboxId"] = "ctl00_FormArea_msgboxErrorMessages";
            obj["__EVENTTARGET"] = "";
            obj["__EVENTARGUMENT"] = "";
            obj["__LASTFOCUS"] = "";
            obj["__VIEWSTATE"] = "";
            obj["__EVENTVALIDATION"] = this.eventVal;
            if (this.ctl00$FormArea$ctlBusinessInput$cmbBusinessDisabled) {
                obj["ctl00$FormArea$ctlBusinessInput$cmbBusiness"] = this.ctl00$FormArea$ctlBusinessInput$cmbBusinessDisabled;
            } else {
                obj["ctl00$FormArea$ctlBusinessInput$cmbBusiness"] = this.accSelect[this.idxAcc].value;
            }
            if (this.cardsLength > 1) {
                obj["ctl00$FormArea$ctlBusinessInput$cmbCreditBrand"] = this.cardsSelect.eq(this.idxCards).val();
            }


            //console.log(obj)
        } catch (e) {
            console.log(e);
            debugger
        }

        this.visaPost(
            "https://services.cal-online.co.il/BUSINESS/screens/Credit/FutureCredit.aspx",
            "https://services.cal-online.co.il/BUSINESS/screens/Credit/FutureCredit.aspx",
            this.cookies,
            obj,
            (error, response, data) => {
                // console.log(error, response, data)
                try {
                    //	console.log(error, response);
                    //writeHtmlFile('VisaFutureCredit', data);
                    var data = all.banks.core.services.parseHtml(data);
                    if (data.find("input[name='__EVENTVALIDATION']").length) {
                        this.eventVal = data.find("input[name='__EVENTVALIDATION']").val();
                    }
                    if (data.find("input[name='ctl00$__MATRIX_VIEWSTATE']").length) {
                        this.MATRIX_VIEWSTATE = data.find("input[name='ctl00$__MATRIX_VIEWSTATE']").val();
                    }
                    let nextStepAcc = () => {
                        if ((this.idxAcc + 1) < this.accLength) {
                            this.idxAcc += 1;
                            this.valNowBrand = data.find("select[name='ctl00$FormArea$ctlBusinessInput$cmbCreditBrand']").val();
                            this.changeFuture(true);
                        } else {
                            this.idxAcc = 0;
                            //console.log(this.arr)
                            this.sendSlikaCtrl();
                        }
                    }
                    let nextStep = () => {
                        if ((this.idxCards + 1) < this.cardsLength) {
                            this.idxCards += 1;
                            this.changeFuture();
                        } else {
                            this.idxCards = 0;
                            nextStepAcc();
                        }
                    };
                    let table = data.find("#FutureCreditGrid > tbody > tr").not('.gridFooterRow');
                    //console.log(table.length);
                    if (table.length) {
                        //console.log(table.eq(0).text());
                        table.each((i, v) => {
                            var val = $(v).children("td");
                            if (val.length > 4 && /₪/g.test(val.eq(2).text())) {
                                var valDate = val.eq(0).children("span").text().replace(/\s/g, "").split("/");
                                var regularPaymentsTotal = val.eq(2).text().replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, '');
                                if (regularPaymentsTotal.includes("-")) {
                                    regularPaymentsTotal = "-" + regularPaymentsTotal.replace(/-/g, '');
                                }

                                this.arr.push({
                                    "target_idStr": all.banks.accountDetails.bank.targetId,
                                    "tokenStr": all.banks.accountDetails.bank.token,
                                    "bankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                    "extractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    "solek_desc": this.accSelect[this.idxAcc].text,
                                    "paymentsTotal": 0,
                                    "grandTotal": 0,
                                    "slikaAccount": this.accSelect[this.idxAcc].value,
                                    "valueDate": valDate[0] + "/" + valDate[1] + "/20" + valDate[2],
                                    "regularPaymentsTotal": regularPaymentsTotal,
                                    "nextTotal": regularPaymentsTotal,
                                    "cardType": all.banks.core.services.getTypeCreditCard(this.cardsSelect.eq(this.idxCards).text())
                                })
                            }
                        });
                        nextStep();
                    } else {
                        nextStep();
                    }
                } catch (e) {
                    console.log('error', e)
                }
            })

    }

    logOut(cb) {
        writeLog("logOut");
        this.visaRestGet(
            "https://services.cal-online.co.il/BUSINESS/screens/System/LogOut.aspx",
            null, //"https://services.cal-online.co.il/BUSINESS/screens/Credit/FutureCredit.aspx",
            this.cookies,
            (error, response, data) => {
                if (!cb) {
                    writeLog("killVpn");
                    monitorVpn.killVpn(() => {
                        myEmitterLogs(25);
                    });
                } else {
                    cb();
                }
            }
        )
    }

    insertIfSelectableParams(obj) {
        if (this.valMainRoot) {
            obj["ctl00$FormArea$ctlBusinessInput$cmbChainId"] = this.valMainRoot;
        }

        if (this.accLength > 1) {
            if (this.useTxtBusiness) {
                obj["ctl00$FormArea$ctlBusinessInput$cmbBusiness"] = this.accSelect.find(it => it.isSelected).value;
                obj["ctl00$FormArea$ctlBusinessInput$txtBusiness"] = this.accSelect[this.idxAcc].value;
            } else {
                obj["ctl00$FormArea$ctlBusinessInput$cmbBusiness"] = this.accSelect[this.idxAcc].value;
            }
        }
        if (this.cardsLength > 1) {
            obj["ctl00$FormArea$ctlBusinessInput$cmbCreditBrand"] = this.cardsSelect.eq(this.idxCards).val();
        }
    }
}

all.banks.accounts.visaAll = new visa();






