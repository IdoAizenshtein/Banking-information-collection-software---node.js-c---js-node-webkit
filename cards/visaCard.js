class visaCard {
    constructor() {
        this.cookies = "";
        this.idxMonth = 0;
        this.idxCards = 0;
        this.eventVal = "";
        this.param = "";
        this.pathUrl = "";
        this.logoutTime = 0;
        this.arrOfCard = [];
        this.arr = [];
//        this.datesDefCalChoice = false;
        this.keepAliveWS = null;
        this.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36';
        // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36';
        this.formDatesMutations = [];
        this.formDatesMutationsIdx = 0;
    }

    visaPost(...args) {
        let [url, Referer, cookie, body] = args;
        writeLog("visaPost: " + url);

        var options = {
            uri: url,
            family: 4,
            timeout: 200000,
            form: body,
            method: "POST",
            body: "POST",
            headers: {
                'Upgrade-Insecure-Requests': "1",
                "Content-Type": "application/x-www-form-urlencoded",
                "Host": "services.cal-online.co.il",
                "Origin": "https://services.cal-online.co.il",
                'User-Agent': this.userAgent
                // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
            }
        };
        if (cookie !== null) {
            options.headers.Cookie = cookie;
        }
        if (Referer !== null) {
            options.headers.Referer = Referer;
        }
        return this.visaSendRequest(options);
    }

    visaPostJSON(...args) {
        let [url, Referer, cookie, body] = args;
        writeLog("visaPostJSON: " + url);
        var options = {
            uri: url,
            family: 4,
            timeout: 200000,
            method: "POST",
            body: body,
            headers: {
                'Upgrade-Insecure-Requests': "1",
                "Content-Type": "application/json; charset=UTF-8",
                "Host": "services.cal-online.co.il",
                "Origin": "https://services.cal-online.co.il",
                "X-Requested-With": "XMLHttpRequest",
                'User-Agent': this.userAgent
                // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
            }
        };
        if (cookie !== null) {
            options.headers.Cookie = cookie;
        }
        if (Referer !== null) {
            options.headers.Referer = Referer;
        }

        return this.visaSendRequest(options);
    }

    visaRestGet(...args) {
        let [url, Referer, cookie] = args;
        writeLog("visaRestGet: " + url);

        let options = {
            "uri": url,
            "family": 4,
            "method": "GET",
            timeout: 200000,
            "headers": {
                "Connection": "keep-alive",
                "Upgrade-Insecure-Requests": "1",
                "Host": "services.cal-online.co.il",
                'User-Agent': this.userAgent
                // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
            }
        };
        if (cookie !== null) {
            options.headers.Cookie = cookie;
        }
        if (Referer !== null) {
            options.headers.Referer = Referer;
        }
        return this.visaSendRequest(options);
    }

    visaSendRequest(options) {
        monitorActivityClass.setIntervalActivity();
//        writeLog("visaSend: " + JSON.stringify(options));
//         writeLog("visaSendRequest: " + options.uri);

        const usernameProxy = 'brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob' + all.banks.accountDetails.bank.token.replace(/-/g, '');
        if (window.navigator.platform.indexOf('Win') === -1) {
            options['proxy'] = 'http://' + usernameProxy + ':h0mi0yvib3to@zproxy.lum-superproxy.io:22225';
        }
        return new Promise((resolve, reject) => {
            senderReq.sendersServer(options, (error, response, data) => {
                if (response !== undefined) {
                    // if (options.uri.includes('CardDetails')) {
                    //     console.log(options, response.headers)
                    //     debugger
                    // }
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
                debugger
            }
        });
    }

    decodeHTMLEntities(text) {
        var entities = [
            ['amp', '&'],
            ['apos', '\''],
            ['#x27', '\''],
            ['#x2F', '/'],
            ['#39', '\''],
            ['#47', '/'],
            ['lt', '<'],
            ['gt', '>'],
            ['nbsp', ' '],
            ['quot', '"']
        ];

        for (var i = 0, max = entities.length; i < max; ++i) {
            text = text.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1]);
        }

        return text;
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

    initCookies() {
        const that = this;

        return new Promise((resolve, reject) => {
            $('#filecontainerloginWithUpdatedUserAgent').attr('src', 'https://services.cal-online.co.il/card-holders/Screens/AccountManagement/login.aspx');
//            var ifarmeSetInterval = setInterval(function () {
//                var input = $('#filecontainerloginWithUpdatedUserAgent').contents().find("script[src^='/TSPD/']").attr('src');
//                if (!input) {
//                    $('#filecontainerlogin').attr('src', 'https://services.cal-online.co.il/card-holders/Screens/AccountManagement/login.aspx')
//                } else {
//                    clearInterval(ifarmeSetInterval);
//                }
//            }, 20000);
//            var waitForIFrame = setInterval(function () {
//                var input = $('#filecontainerloginWithUpdatedUserAgent').contents().find("script[src^='/TSPD/']").attr('src');
//                if (input) {
//                    clearInterval(waitForIFrame);
//                    clearInterval(ifarmeSetInterval);
//                    setTimeout(() => {
//                        $('#filecontainerloginWithUpdatedUserAgent').attr('src', 'https://services.cal-online.co.il/card-holders/Screens/AccountManagement/login.aspx');
//
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
                        arr.forEach((ck) => win.cookies.remove({
                            url: `https://${ck.domain}${ck.path}`,
                            name: ck.name
                        }));
                        resolve(true);
                        clearInterval(checker);
                    } else if (times++ > 15) {
                        $('#filecontainerloginWithUpdatedUserAgent').attr('src', '');
                        clearInterval(checker);
                        resolve(false);
                    }
                });
            }, 2000);
//                    }, 2000)
//                }
//            }, 200);
        });
    }

    async login() {
        try {
            let dateTo = new Date();
            dateTo.setMonth(dateTo.getMonth() + 1);
            let dateFrom = new Date(dateTo.getFullYear(), dateTo.getMonth() - 3, dateTo.getDate());
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
                "https://services.cal-online.co.il/card-holders/Screens/AccountManagement/login.aspx",
                "https://services.cal-online.co.il/card-holders/Screens/AccountManagement/login.aspx",
                null
            ).then((...args) => {
                let [error, response, data] = args[0];
                var dataRes = all.banks.core.services.parseHtml(data);
                var serializeForm = dataRes.find("form").serializeArray();
                const obj = {};
                serializeForm.forEach((vals) => {
                    obj[vals.name] = vals.value;
                });
                var cookSplit = this.cookies.split(";").find(it => it.includes('TS010'));
                this.cookies = cookSplit;
                const guidRegex = /guid:\s*["'](.+)["']\s*/g;
                const xSiteIdContainer = guidRegex.exec(data);
                if (xSiteIdContainer !== null && xSiteIdContainer.length > 1) {
                    const xSiteId = xSiteIdContainer[1];
                    this.visaSendRequest({
                        uri: "https://connect.cal-online.co.il/col-rest/calconnect/authentication/login",
                        family: 4,
                        timeout: 40000,
                        method: "POST",
                        body: JSON.stringify(
                            {
                                username: all.banks.accountDetails.bank.username.slice(0, 8),
                                password: all.banks.accountDetails.bank.password.slice(0, 10),
                                recaptcha: ""
                            }
                        ),
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8",
                            "Host": "connect.cal-online.co.il",
                            "Origin": "https://connect.cal-online.co.il",
                            "Referer": "https://connect.cal-online.co.il/send-otp",
                            "X-Site-Id": xSiteId,
                            'User-Agent': this.userAgent,
                            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
                            'sec-ch-ua-mobile': '?0',
                            'Sec-Fetch-Dest': 'empty',
                            'Sec-Fetch-Mode': 'cors',
                            'Sec-Fetch-Site': 'same-origin'

                            // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
                        }
                    }).then((...args) => {
                        // this.visaSendRequest({
                        //     uri: "https://connect.cal-online.co.il/api/authentication/login",
                        //     family: 4,
                        //     timeout: 40000,
                        //     method: "POST",
                        //     body: JSON.stringify({
                        //         username: all.banks.accountDetails.bank.username.slice(0, 8),
                        //         password: all.banks.accountDetails.bank.password.slice(0, 10),
                        //         rememberMe: null
                        //     }),
                        //     headers: {
                        //         "Content-Type": "application/json; charset=UTF-8",
                        //         "Host": "connect.cal-online.co.il",
                        //         "Origin": "https://connect.cal-online.co.il",
                        //         "Referer": "https://connect.cal-online.co.il/send-otp",
                        //         "X-Site-Id": xSiteId,
                        //         'User-Agent': this.userAgent,
                        //         'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
                        //         'sec-ch-ua-mobile': '?0',
                        //         'Sec-Fetch-Dest': 'empty',
                        //         'Sec-Fetch-Mode': 'cors',
                        //         'Sec-Fetch-Site': 'same-origin'
                        //
                        //         // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
                        //     }
                        // }).then((...args) => {
                        [error, response, data] = args[0];
                        if (error) {
                            myEmitterLogs(5);
                            return;
                        }

                        if (data.includes('הכניסה למנוי נחסמה')) {
                            myEmitterLogs(8, data);
                            return;
                        }
                        if (response.statusCode === 412) {
                            myEmitterLogs(6);
                            return;
                        }
                        if (data.includes('אנו מתנצלים, עקב תקלה לא ניתן לבצע את הפעולה כעת')) {
                            myEmitterLogs(9, data);
                            return;
                        }

                        const authData = JSON.parse(data);
                        if (!authData.token) {
                            myEmitterLogs(5, data);
                            return;
                        }

                        this.visaSendRequest({
                            uri: "https://connect.cal-online.co.il/col-rest/calconnect/account/info", // "https://connect.cal-online.co.il/api/account/info",
                            family: 4,
                            timeout: 40000,
                            method: "GET",
                            headers: {
                                "Host": "connect.cal-online.co.il",
                                "Referer": "https://connect.cal-online.co.il/index.html",
                                "X-Site-Id": xSiteId,
                                "Authorization": 'CalAuthScheme ' + authData.token,
                                'User-Agent': this.userAgent
                                // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
                            }
                        }).then((...args) => {
                            if (error) {
                                myEmitterLogs(5);
                                return;
                            }

//                                                [error, response, data] = args[0];
//                                                authData = JSON.parse(data);
                            obj['ctl00$FormAreaNoBorder$FormArea$token_bridge'] = authData.token;
                            obj['ctl00$FormAreaNoBorder$FormArea$CcLogin'] = '';
                            this.visaPost(
                                "https://services.cal-online.co.il/card-holders/Screens/AccountManagement/login.aspx",
                                "https://services.cal-online.co.il/card-holders/Screens/AccountManagement/login.aspx",
                                this.cookies,
                                obj
                            ).then((...args) => {
                                [error, response, data] = args[0];
                                var dataRes = all.banks.core.services.parseHtml(data);
                                if (dataRes.find('#ctl00_FormAreaNoBorder_FormArea_lgnLogin_FailureText').length && dataRes.find('#ctl00_FormAreaNoBorder_FormArea_lgnLogin_FailureText').text().includes("שגוי") || dataRes.find('#ctl00_FormAreaNoBorder_FormArea_lgnLogin_FailureText').text().includes("לא ניתן")) {
                                    writeLog("---- User/Password is wrong----");
                                    myEmitterLogs(5);
                                } else {
                                    var rid = response.headers.location;
                                    if (rid !== undefined) {
                                        if (rid.includes("PasswordChanging")) {
                                            myEmitterLogs(6);
                                        } else {
                                            this.visaRestGet(
                                                `https://services.cal-online.co.il${rid}`,
                                                "https://services.cal-online.co.il/card-holders/Screens/AccountManagement/login.aspx",
                                                this.cookies
                                            ).then((...args) => {
                                                let [error, response, data] = args[0];
                                                var dataRes = all.banks.core.services.parseHtml(data);
                                                var serializeForm = dataRes.find("form").serializeArray();
                                                var obj = {};
                                                serializeForm.forEach((vals) => {
                                                    obj[vals.name] = vals.value;
                                                });
                                                obj["__EVENTTARGET"] = "ctl00$AppTopMenu$rptTopMenu$ctl01$HyperLink1";
                                                var paramUrlCard = dataRes.find("#tabsContainer > ul > li").eq(0).find(".tabBody > a").attr("href")
                                                    || dataRes.find("#tabsContainer > ul > li").eq(0).find(".homepage-credit-card-container > a").attr("href");
//												var paramUrlCard = "https://services.cal-online.co.il/Card-Holders/Screens/AccountManagement/"
//                                                                                                        + dataRes.find("#tabsContainer > ul > li").eq(0).find(".tabBody > a").attr("href");
                                                this.visaRestGet(
                                                    "https://services.cal-online.co.il/Card-Holders/Screens/AccountManagement/" + paramUrlCard,
                                                    `https://services.cal-online.co.il${rid}`,
                                                    this.cookies
                                                ).then((...args) => {
                                                    let [error, response, data] = args[0];
                                                    var dataRes = all.banks.core.services.parseHtml(data);
                                                    obj["hiddenCardsImages"] = this.decodeHTMLEntities(dataRes.find("input[name='hiddenCardsImages']").val());
                                                    this.loadTransactions(obj, dataRes, paramUrlCard);
                                                })
                                            })
                                        }
                                    } else {
                                        myEmitterLogs(9, 'system unavailable');
                                    }
                                }
                            });
                        });
                    });
                } else {
                    obj["ctl00$FormAreaNoBorder$FormArea$lgnLogin$LoginImageButton.x"] = "80";
                    obj["ctl00$FormAreaNoBorder$FormArea$lgnLogin$LoginImageButton.y"] = "16";
                    obj["ctl00$FormAreaNoBorder$FormArea$lgnLogin$UserName"] = all.banks.accountDetails.bank.username.slice(0, 8);
                    obj["ctl00$FormAreaNoBorder$FormArea$lgnLogin$Password"] = all.banks.accountDetails.bank.password.slice(0, 10);
                    this.visaPost(
                        "https://services.cal-online.co.il/card-holders/Screens/AccountManagement/login.aspx",
                        "https://services.cal-online.co.il/card-holders/Screens/AccountManagement/login.aspx",
                        this.cookies,
                        obj
                    ).then((...args) => {
                        let [error, response, data] = args[0];
                        var dataRes = all.banks.core.services.parseHtml(data);
                        if (dataRes.find('#ctl00_FormAreaNoBorder_FormArea_lgnLogin_FailureText').length && dataRes.find('#ctl00_FormAreaNoBorder_FormArea_lgnLogin_FailureText').text().includes("שגוי") || dataRes.find('#ctl00_FormAreaNoBorder_FormArea_lgnLogin_FailureText').text().includes("לא ניתן")) {
                            writeLog("---- User/Password is wrong----");
                            myEmitterLogs(5);
                        } else {
                            var rid = response.headers.location;
                            if (rid !== undefined) {
                                if (rid.includes("PasswordChanging")) {
                                    myEmitterLogs(6);
                                } else {
                                    writeLog("login rid: ", rid);

                                    this.visaRestGet(
                                        `https://services.cal-online.co.il${rid}`,
                                        "https://services.cal-online.co.il/card-holders/Screens/AccountManagement/login.aspx",
                                        this.cookies
                                    ).then((...args) => {
                                        let [error, response, data] = args[0];
                                        var dataRes = all.banks.core.services.parseHtml(data);
                                        var serializeForm = dataRes.find("form").serializeArray();
                                        var obj = {};
                                        serializeForm.forEach((vals) => {
                                            obj[vals.name] = vals.value;
                                        });
                                        obj["__EVENTTARGET"] = "ctl00$AppTopMenu$rptTopMenu$ctl01$HyperLink1";
                                        var paramUrlCard = dataRes.find("#tabsContainer > ul > li").eq(0).find(".tabBody > a").attr("href")
                                            || dataRes.find("#tabsContainer > ul > li").eq(0).find(".homepage-credit-card-container > a").attr("href");
//										var paramUrlCard = "https://services.cal-online.co.il/Card-Holders/Screens/AccountManagement/"
//                                                                                        + dataRes.find("#tabsContainer > ul > li").eq(0).find(".tabBody > a").attr("href");
                                        this.visaRestGet(
                                            "https://services.cal-online.co.il/Card-Holders/Screens/AccountManagement/" + paramUrlCard,
                                            `https://services.cal-online.co.il${rid}`,
                                            this.cookies
                                        ).then((...args) => {
                                            let [error, response, data] = args[0];
                                            var dataRes = all.banks.core.services.parseHtml(data);
                                            obj["hiddenCardsImages"] = this.decodeHTMLEntities(dataRes.find("input[name='hiddenCardsImages']").val());
                                            this.loadTransactions(obj, dataRes, paramUrlCard);
                                        })
                                    })
                                }
                            } else {
                                myEmitterLogs(9, 'system unavailable');
                            }
                        }
                    });
                }
            });
        } catch (e) {
            debugger
        }
    }

    loadTransactions(obj, dataResCard, paramUrlCard) {
        writeLog("loadTransactions");
        this.visaPost(
            "https://services.cal-online.co.il/card-holders/Screens/AccountManagement/HomePage.aspx",
            "https://services.cal-online.co.il/card-holders/Screens/AccountManagement/HomePage.aspx",
            this.cookies,
            obj
        ).then((...args) => {
            if (!all.banks.openBankPage) {
                let [error, response, data] = args[0];
                var rid = response.headers.location || '/Card-Holders/SCREENS/Transactions/Transactions.aspx';
                writeLog("loadTransactions rid: " + rid);
                if (rid !== undefined) {
                    this.visaRestGet(
                        `https://services.cal-online.co.il${rid}`,
                        "https://services.cal-online.co.il/card-holders/Screens/AccountManagement/HomePage.aspx",
                        this.cookies)
                        .then((...args) => {
                            let [error, response, data] = args[0];
                            var dataRes = all.banks.core.services.parseHtml(data);
                            dataRes.find("#ctl00_ContentTop_cboCardList_categoryList_pnlMain > table").each((i, val) => {
                                var v = $(val);
                                const cardType = all.banks.core.services.getTypeCardVisa(v.find("a").text());
                                const cardName = /^.+\s\-\s(\d{4})\s*$/gm.exec(v.find("a").text())
                                    || /^(\d{4})\s*\-\s*.+$/gm.exec(v.find("a").text());
                                this.arrOfCard.push({
                                    "eventTarget": v.find("a").attr("href").split("(")[1].split(",")[0].replace(/'/g, ""),
                                    "cardNumber": cardName !== null ? cardName[1] : null, //v.find("input").val().slice(-4),
                                    "cardType": cardType === 30 ? 21 : cardType,
                                    "calChoice": v.find("a").text().includes("CalChoice"),
                                    "cardID": v.find("input").val()
                                });
                            });
                            console.log(this.arrOfCard);
                            writeLog("length of arrOfCard : " + this.arrOfCard.length);

                            if (this.arrOfCard.length) {
                                this.visaPostJSON(
                                    "https://services.cal-online.co.il/Card-Holders/SCREENS/Common/KeepAlive.asmx/KeepAliveWS",
                                    "https://services.cal-online.co.il/card-holders/Screens/AccountManagement/HomePage.aspx",
                                    this.cookies,
                                    null
                                ).then((...args) => {
                                    this.changeCard(obj, paramUrlCard && paramUrlCard.includes(this.arrOfCard[this.idxCards].cardID) ? dataResCard : false);
                                    this.keepAliveWS = setInterval(() => {
                                        this.visaPostJSON(
                                            "https://services.cal-online.co.il/Card-Holders/SCREENS/Common/KeepAlive.asmx/KeepAliveWS",
                                            "https://services.cal-online.co.il/card-holders/Screens/AccountManagement/HomePage.aspx",
                                            this.cookies,
                                            null
                                        );
                                    }, 6000);
                                })
                            } else {
                                myEmitterLogs(15, "Has no cards");
                                this.logOut();
                            }
                        });
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
                    all.banks.core.services.openBankPage("https://services.cal-online.co.il/card-holders/Screens/AccountManagement/HomePage.aspx");
                }, 1000);
            }
        });
    }

    async changeCard(obj, dataRes) {
        writeLog("Card Number: " + this.arrOfCard[this.idxCards].cardNumber + " Card Type: " + this.arrOfCard[this.idxCards].cardType);
        if (dataRes) {
            const dateMatch = /(\d{1,2})\/(\d{1,2})\/(\d{2,4})/g.exec(dataRes.find("#lblNextDebitDate").text());
            this.arrOfCard[this.idxCards].debitDayOfMonth = +(dateMatch !== null ? dateMatch[1] : "15");
            this.arrOfCard[this.idxCards].indFakeDate = dateMatch === null ? 1 : 0;

            this.visaRestGet(
                "https://services.cal-online.co.il/Card-Holders/SCREENS/Transactions/Transactions.aspx",
                "https://services.cal-online.co.il/Card-Holders/Screens/AccountManagement/HomePage.aspx",
                this.cookies
            ).then((...args) => {
                let [error, response, data] = args[0];
                try {
                    // writeHtmlFile('dataCards1111', data);
                    const [matched, endTransDate, startTransDate, debitDate] = /_inputForm\.handleViewChange\(.+"EndTransDate":\s*"([^"]+)".+"StartTransDate":\s*"([^"]+)".+"DebitDate":\s*"([^"]+)".+/gm.exec(data);
                    const dataRes = all.banks.core.services.parseHtml(data);
                    if (!matched) {
                        writeLog("Card not available");
                        writeLog("Finished");
                        this.sendCardsCtrl();
                    } else {
                        const debitDates = dataRes.find("#ctl00_FormAreaNoBorder_FormArea_clndrDebitDateScope_OptionList > li").toArray()
                            .map(el => $(el).text());
                        const scopeStartDates = dataRes.find("#ctl00_FormAreaNoBorder_FormArea_ctlDateScopeStart_ctlMonthYearList_OptionList > li").toArray()
                            .map(el => $(el).text());
                        const scopeEndDates = dataRes.find("#ctl00_FormAreaNoBorder_FormArea_ctlDateScopeEnd_ctlMonthYearList_OptionList > li").toArray()
                            .map(el => $(el).text());
                        const debitIdx = debitDates.findIndex(v => v === debitDate);

                        let [d, m, y] = startTransDate.split('/');
                        const scopeStartMY = [m, y].join('/');
                        const scopeStartIdx = scopeStartDates.findIndex(v => v === scopeStartMY);

                        [d, m, y] = endTransDate.split('/');
                        const scopeEndMY = [m, y].join('/');
                        const scopeEndIdx = scopeEndDates.findIndex(v => v === scopeEndMY);

                        this.formDatesMutations = [];
                        for (let x = 0; x < all.banks.accountDetails.ccardMonth; x++) {
                            if (this.arrOfCard[this.idxCards].calChoice) {
                                this.formDatesMutations.push({
                                    "ctl00$FormAreaNoBorder$FormArea$clndrDebitDateScope$TextBox": debitDates[debitIdx],
                                    "ctl00$FormAreaNoBorder$FormArea$clndrDebitDateScope$HiddenField": debitIdx,

                                    "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeStart$ctlMonthYearList$TextBox": scopeStartDates[scopeStartIdx - x],
                                    "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeStart$ctlMonthYearList$HiddenField": scopeStartIdx - x,

                                    "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeEnd$ctlMonthYearList$TextBox": scopeEndDates[scopeEndIdx - x],
                                    "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeEnd$ctlMonthYearList$HiddenField": scopeEndIdx - x,

                                    "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeStart$ctlDaysList$TextBox": this.arrOfCard[this.idxCards].debitDayOfMonth - 1,
                                    "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeStart$ctlDaysList$HiddenField": this.arrOfCard[this.idxCards].debitDayOfMonth - 1 - 1,
                                    "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeEnd$ctlDaysList$TextBox": this.arrOfCard[this.idxCards].debitDayOfMonth,
                                    "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeEnd$ctlDaysList$HiddenField": this.arrOfCard[this.idxCards].debitDayOfMonth - 1
                                });
                            } else {
                                this.formDatesMutations.push({
                                    "ctl00$FormAreaNoBorder$FormArea$clndrDebitDateScope$TextBox": debitDates[debitIdx - x],
                                    "ctl00$FormAreaNoBorder$FormArea$clndrDebitDateScope$HiddenField": debitIdx - x,

                                    "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeStart$ctlMonthYearList$TextBox": scopeStartDates[scopeStartIdx],
                                    "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeStart$ctlMonthYearList$HiddenField": scopeStartIdx - 1,

                                    "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeEnd$ctlMonthYearList$TextBox": scopeEndDates[scopeEndIdx],
                                    "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeEnd$ctlMonthYearList$HiddenField": scopeEndIdx - 1,

                                    "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeStart$ctlDaysList$TextBox": d,
                                    "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeStart$ctlDaysList$HiddenField": Number(d) - 1,
                                    "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeEnd$ctlDaysList$TextBox": d,
                                    "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeEnd$ctlDaysList$HiddenField": Number(d) - 1
                                });

                            }
                        }
                        this.formDatesMutationsIdx = 0;

                        const newObj = Object.assign(
                            dataRes.find("form").serializeArray()
                                .reduce((acmltr, keyVal) => {
                                    acmltr[keyVal.name] = keyVal.value;
                                    return acmltr;
                                }, Object.create(null)),
                            this.formDatesMutations[this.formDatesMutationsIdx],
                            {
                                "hidToggleFormLink": "AdvancedSearchClose",
                                "__EVENTARGUMENT": "NewRequest",
                                "__EVENTTARGET": "SubmitRequest"
                            }
                        );
                        setTimeout(() => {
                            this.loadData(newObj, false);
                        }, 0)
                    }
                } catch (e) {
                    console.log(e);
                    clearInterval(this.keepAliveWS);
                }
            });
        } else {
            this.visaRestGet(
                "https://services.cal-online.co.il/card-holders/Screens/AccountManagement/CardDetails.aspx?cardUniqueID=" + this.arrOfCard[this.idxCards].cardID,
                "https://services.cal-online.co.il/card-holders/Screens/AccountManagement/HomePage.aspx",
                this.cookies
            ).then((...args) => {
                let [error, response, data] = args[0];
                // writeHtmlFile('CardDetails', data);

                let dataRes;
                if (!!error || !data || !(dataRes = all.banks.core.services.parseHtml(data))) {
                    clearInterval(this.keepAliveWS);
                    myEmitterLogs(9, 'Failed in card change' + (error || data));
                    return;
                }

                const dateMatch = /(\d{1,2})\/(\d{1,2})\/(\d{2,4})/g.exec(dataRes.find("#lblNextDebitDate").text());
                this.arrOfCard[this.idxCards].debitDayOfMonth = +(dateMatch !== null ? dateMatch[1] : "15");
                this.arrOfCard[this.idxCards].indFakeDate = dateMatch === null ? 1 : 0;

                this.visaRestGet(
                    "https://services.cal-online.co.il/Card-Holders/SCREENS/Transactions/Transactions.aspx",
                    "https://services.cal-online.co.il/Card-Holders/Screens/AccountManagement/HomePage.aspx",
                    this.cookies
                ).then((...args) => {
                    let [error, response, data] = args[0];
                    try {
                        // writeHtmlFile('dataCards1111', data);
                        const [matched, endTransDate, startTransDate, debitDate] = /_inputForm\.handleViewChange\(.+"EndTransDate":\s*"([^"]+)".+"StartTransDate":\s*"([^"]+)".+"DebitDate":\s*"([^"]+)".+/gm.exec(data);
                        const dataRes = all.banks.core.services.parseHtml(data);
                        if (!matched) {
                            writeLog("Card not available");
                            writeLog("Finished");
                            this.sendCardsCtrl();
                        } else {
                            const debitDates = dataRes.find("#ctl00_FormAreaNoBorder_FormArea_clndrDebitDateScope_OptionList > li").toArray()
                                .map(el => $(el).text());
                            const scopeStartDates = dataRes.find("#ctl00_FormAreaNoBorder_FormArea_ctlDateScopeStart_ctlMonthYearList_OptionList > li").toArray()
                                .map(el => $(el).text());
                            const scopeEndDates = dataRes.find("#ctl00_FormAreaNoBorder_FormArea_ctlDateScopeEnd_ctlMonthYearList_OptionList > li").toArray()
                                .map(el => $(el).text());
                            const debitIdx = debitDates.findIndex(v => v === debitDate);

                            let [d, m, y] = startTransDate.split('/');
                            const scopeStartMY = [m, y].join('/');
                            const scopeStartIdx = scopeStartDates.findIndex(v => v === scopeStartMY);

                            [d, m, y] = endTransDate.split('/');
                            const scopeEndMY = [m, y].join('/');
                            const scopeEndIdx = scopeEndDates.findIndex(v => v === scopeEndMY);

                            this.formDatesMutations = [];
                            for (let x = 0; x < all.banks.accountDetails.ccardMonth; x++) {
                                if (this.arrOfCard[this.idxCards].calChoice) {
                                    this.formDatesMutations.push({
                                        "ctl00$FormAreaNoBorder$FormArea$clndrDebitDateScope$TextBox": debitDates[debitIdx],
                                        "ctl00$FormAreaNoBorder$FormArea$clndrDebitDateScope$HiddenField": debitIdx,

                                        "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeStart$ctlMonthYearList$TextBox": scopeStartDates[scopeStartIdx - x],
                                        "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeStart$ctlMonthYearList$HiddenField": scopeStartIdx - x,

                                        "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeEnd$ctlMonthYearList$TextBox": scopeEndDates[scopeEndIdx - x],
                                        "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeEnd$ctlMonthYearList$HiddenField": scopeEndIdx - x,

                                        "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeStart$ctlDaysList$TextBox": this.arrOfCard[this.idxCards].debitDayOfMonth - 1,
                                        "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeStart$ctlDaysList$HiddenField": this.arrOfCard[this.idxCards].debitDayOfMonth - 1 - 1,
                                        "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeEnd$ctlDaysList$TextBox": this.arrOfCard[this.idxCards].debitDayOfMonth,
                                        "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeEnd$ctlDaysList$HiddenField": this.arrOfCard[this.idxCards].debitDayOfMonth - 1
                                    });
                                } else {
                                    this.formDatesMutations.push({
                                        "ctl00$FormAreaNoBorder$FormArea$clndrDebitDateScope$TextBox": debitDates[debitIdx - x],
                                        "ctl00$FormAreaNoBorder$FormArea$clndrDebitDateScope$HiddenField": debitIdx - x,

                                        "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeStart$ctlMonthYearList$TextBox": scopeStartDates[scopeStartIdx],
                                        "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeStart$ctlMonthYearList$HiddenField": scopeStartIdx - 1,

                                        "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeEnd$ctlMonthYearList$TextBox": scopeEndDates[scopeEndIdx],
                                        "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeEnd$ctlMonthYearList$HiddenField": scopeEndIdx - 1,

                                        "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeStart$ctlDaysList$TextBox": d,
                                        "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeStart$ctlDaysList$HiddenField": Number(d) - 1,
                                        "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeEnd$ctlDaysList$TextBox": d,
                                        "ctl00$FormAreaNoBorder$FormArea$ctlDateScopeEnd$ctlDaysList$HiddenField": Number(d) - 1
                                    });

                                }
                            }
                            this.formDatesMutationsIdx = 0;

                            const newObj = Object.assign(
                                dataRes.find("form").serializeArray()
                                    .reduce((acmltr, keyVal) => {
                                        acmltr[keyVal.name] = keyVal.value;
                                        return acmltr;
                                    }, Object.create(null)),
                                this.formDatesMutations[this.formDatesMutationsIdx],
                                {
                                    "hidToggleFormLink": "AdvancedSearchClose",
                                    "__EVENTARGUMENT": "NewRequest",
                                    "__EVENTTARGET": "SubmitRequest"
                                }
                            );
                            setTimeout(() => {
                                this.loadData(newObj, false);
                            }, 0)
                        }
                    } catch (e) {
                        console.log(e);
                        clearInterval(this.keepAliveWS);
                    }
                });
            });
        }


    }

    async loadData(obj, dataExist) {
        try {
            async function processPage() {
                let NextCycleTotal = 0, indFakeDate = Card.indFakeDate,
                    branchNumber = Card.bankData ? Card.bankData.branchNumber : null,
                    accountNumber = Card.bankData ? Card.bankData.accountNumber : null;

                for (const tproc of tableProcessors) {
                    tproc.tbody = dataRes.find(tproc.tbodySelector);
                    if (tproc.tbody.length === 0) {
                        continue;
                    }
                    if (tproc.tbody.eq(1).find("tr").length) {
                        NextCycleTotal = tproc.tbody.eq(1).find("tr td").eq(1).text().replace(/[^\d\.-]/g, "");
                    }
//                        var branchNumber = null, accountNumber = null;
//                        var accAndbranch = dataRes.find(".form_search_brief").text().match(/(\d{1,10})[\-](\d{1,20})/g);
//                        if (accAndbranch !== null) {
//                            branchNumber = accAndbranch[1];
//                            accountNumber = accAndbranch[2];
//                        }

                    console.log(" acc: " + branchNumber + "-" + accountNumber + " NextBillingDate: " + NextBillingDate);
                    var rowsArray = tproc.tbody.eq(0).find("tr");
                    if (rowsArray.length) {
                        for (var i = 0; i < rowsArray.length; i++) {
                            var CurrentPaymentNum = null, TotalPayments = null, Comments = null;
                            var td = rowsArray.eq(i).children("td");
                            var category = null, business_address = null, business_phone = null;
                            if (all.banks.accountDetails.isCategory) {
                                var onMouseClickRow = rowsArray.eq(i).attr("onclick");
                                if (onMouseClickRow.includes("OnMouseClickRow")) {
                                    console.log("onMouseClickRow");
                                    onMouseClickRow = onMouseClickRow.match(/(\d{0,10})[|](\d{0,20})/g);
                                    if (onMouseClickRow !== null) {
                                        onMouseClickRow = onMouseClickRow[0].split("|");
                                        var args = await visaCard.visaPostJSON(
                                            "https://services.cal-online.co.il/Card-Holders/Screens/Transactions/Transactions.aspx/GetTransDetails",
                                            "https://services.cal-online.co.il/Card-Holders/Screens/Transactions/Transactions.aspx",
                                            visaCard.cookies,
                                            JSON.stringify({
                                                "Identifier": onMouseClickRow[1],
                                                "Numerator": onMouseClickRow[0]
                                            })
                                        )
                                        var [error, response, dataJson] = [...args];
                                        var categoryJson = JSON.parse(dataJson);
                                        try {
                                            category = categoryJson.d.Data.MerchantDetails.SectorName;
                                            business_address = categoryJson.d.Data.MerchantDetails.Address;
                                            business_phone = categoryJson.d.Data.MerchantDetails.PhoneNumber;
                                        } catch (e) {
                                            business_address = null;
                                            business_phone = null;
                                            category = null;
                                        }
                                    }
                                }
                            }

                            if (!tproc.tableType) {
                                if (td.eq(4).text().replace(/\s/g, '') !== "") {
                                    Comments = td.eq(4).text();
                                    if (Comments.indexOf("תשלום") >= 0 && Comments.indexOf("מתוך") >= 0) {
                                        var oneFromAll = Comments.split("מתוך");
                                        CurrentPaymentNum = oneFromAll[0].match(/\d+/)[0];
                                        TotalPayments = oneFromAll[1].match(/\d+/)[0];
                                        Comments = null;
                                    } else {
                                        Comments = Comments.trim().replace(/\s+/g, " ");
                                    }
                                }
                                var valDate = td.eq(0).text().replace(/\s/g, '').split("/");
                                let transTotal = td.eq(3).text().replace(/[^\d\.-]/g, "");
                                let ind_iskat_hul;
                                if (transTotal.length === 0 && td.length > 5) {
                                    transTotal = td.eq(5).text().replace(/[^\d\.-]/g, "");
                                    ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(td.eq(5).text());
                                } else {
                                    ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(td.eq(3).text());
                                }

                                tproc.transactions.push({
                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                    "Token": all.banks.accountDetails.bank.token,
                                    "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    "BranchNumber": branchNumber,
                                    "AccountNumber": accountNumber,
                                    "CardNumber": Card.cardNumber,
                                    "NextBillingDate": NextBillingDate,
                                    "NextCycleTotal": NextCycleTotal,
                                    "TransDesc": td.eq(1).text().trim(),
                                    "TransTotal": transTotal,
                                    "ValueDate": `${valDate[0]}/${valDate[1]}/20${valDate[2]}`,
                                    "TransCategory": category,
                                    "business_address": business_address,
                                    "business_phone": business_phone,
                                    "TotalPayments": TotalPayments,
                                    "CurrentPaymentNum": CurrentPaymentNum,
                                    "CardType": Card.cardType,
                                    "indFakeDate": indFakeDate,
                                    "currency_id": all.banks.core.services.getTypeCurrencyAll(td.eq(2).text()),
                                    "original_total": td.eq(2).text().replace(/[^\d\.-]/g, ""),
                                    "ind_iskat_hul": ind_iskat_hul,
                                    "comment": Comments
                                });
                            } else {
                                if (td.eq(5).text().replace(/\s/g, '') !== "") {
                                    Comments = td.eq(5).text();
                                    if (Comments.indexOf("תשלום") >= 0 && Comments.indexOf("מתוך") >= 0) {
                                        var oneFromAll = Comments.split("מתוך");
                                        CurrentPaymentNum = oneFromAll[0].match(/\d+/)[0];
                                        TotalPayments = oneFromAll[1].match(/\d+/)[0];
                                        Comments = null;
                                    } else {
                                        Comments = Comments.trim().replace(/\s+/g, " ");
                                    }
                                }
                                var valDate = td.eq(1).text().replace(/\s/g, '').split("/");
                                const nextBillingDateSplit = td.eq(0).text().replace(/\s/g, '').split("/");
                                tproc.transactions.push({
                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                    "Token": all.banks.accountDetails.bank.token,
                                    "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    "BranchNumber": branchNumber,
                                    "AccountNumber": accountNumber,
                                    "CardNumber": Card.cardNumber,
                                    "NextBillingDate": `${nextBillingDateSplit[0]}/${nextBillingDateSplit[1]}/20${nextBillingDateSplit[2]}`,
                                    "NextCycleTotal": NextCycleTotal,
                                    "TransDesc": td.eq(2).text().trim(),
                                    "TransTotal": td.eq(4).text().replace(/[^\d\.-]/g, ""),
                                    "ValueDate": `${valDate[0]}/${valDate[1]}/20${valDate[2]}`,
                                    "TransCategory": category,
                                    "business_address": business_address,
                                    "business_phone": business_phone,
                                    "TotalPayments": TotalPayments,
                                    "CurrentPaymentNum": CurrentPaymentNum,
                                    "CardType": Card.cardType,
                                    "indFakeDate": indFakeDate,
                                    "currency_id": all.banks.core.services.getTypeCurrencyAll(td.eq(3).text()),
                                    "original_total": td.eq(3).text().replace(/[^\d\.-]/g, ""),
                                    "ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(td.eq(4).text()),
                                    "comment": Comments
                                });
                            }
                        }
                    }
                }
            }

            function storePagesResults() {
                tableProcessors
                    .filter((tproc) => tproc.transactions.length > 0)
                    .forEach((tproc) => {
                        const lastTrans = tproc.transactions[tproc.transactions.length - 1];
                        if (lastTrans["NextCycleTotal"] !== null && lastTrans["NextCycleTotal"] !== "") {
                            tproc.transactions
                                .filter((trans) => trans["NextCycleTotal"] === null || trans["NextCycleTotal"] === "" || trans["NextCycleTotal"] === 0)
                                .forEach((trans) => {
                                    trans["NextCycleTotal"] = lastTrans["NextCycleTotal"];
                                });

                            visaCard.arr.push(...tproc.transactions);
                        } else {
                            visaCard.arr.push(...tproc.transactions);
                        }
                    });

                if (tableProcessors.every((tproc) => tproc.transactions.length === 0)) {
                    myEmitterLogs(15, Card.cardNumber + " has no data on " + NextBillingDate + ".");
                }
            }

            let visaCard = this;
            const tableProcessors = [{
                tbodySelector: "table#ctlMainGrid > tbody",
                tbody: null,
                tableType: false,
                transactions: []
            }, {
                tbodySelector: "table#ctlSecondaryGrid > tbody",
                tbody: null,
                tableType: true,
                transactions: []
            }];

            let cardMonYear = (this.arrOfCard[this.idxCards].calChoice
                    ? this.formDatesMutations[this.formDatesMutationsIdx]["ctl00$FormAreaNoBorder$FormArea$ctlDateScopeEnd$ctlMonthYearList$TextBox"]
                    : this.formDatesMutations[this.formDatesMutationsIdx]["ctl00$FormAreaNoBorder$FormArea$clndrDebitDateScope$TextBox"]),
                NextBillingDate = [
                    ("0" + (this.arrOfCard[this.idxCards].debitDayOfMonth)).slice(-2),
                    cardMonYear].join("/"),
                Card = this.arrOfCard[this.idxCards];

            let dataRes;
            let stopCurrentMonthProcessing = false;
            do {
                writeLog("Current month : " + cardMonYear);

                console.log("Card: %o, month: %o, obj: %o",
                    this.arrOfCard[this.idxCards].cardNumber,
                    cardMonYear,
                    obj);
                if (!dataExist) {
                    let [error, response, data] = await this.visaPost(
                        "https://services.cal-online.co.il/Card-Holders/Screens/Transactions/Transactions.aspx",
                        "https://services.cal-online.co.il/Card-Holders/Screens/Transactions/Transactions.aspx",
                        this.cookies,
                        obj);

                    if (response.statusCode !== 200) {
                        writeLog("Got failed response : " + response.statusCode
                            + " -> " + data + ". Proceeding...");
                        stopCurrentMonthProcessing = true;
                        continue;
                    }
                    // writeHtmlFile('dataCards', data);
                    dataRes = all.banks.core.services.parseHtml(data);
                } else {
                    dataRes = dataExist;
                    dataExist = undefined;
                }

                if (dataRes.length) {
                    const accAndBranch = /(\d{1,10})[\-](\d{1,20})/g.exec(dataRes.find(".form_search_brief").text());
                    if (accAndBranch !== null) {
                        this.arrOfCard[this.idxCards].bankData = {
                            branchNumber: accAndBranch[1],
                            accountNumber: accAndBranch[2]
                        };
                    }

                    await processPage();

                    if (dataRes.find("input[name='ctl00$FormAreaNoBorder$FormArea$ctlGridPager$btnNext']").length) {
                        writeLog("Go to next Page");
                        console.log("Go to next Page");

                        var serializeForm = dataRes.find("form").serializeArray();
                        var obj = {};
                        serializeForm.forEach((vals) => {
                            obj[vals.name] = vals.value;
                        });
                        delete obj["ctl00$SM"];
                        delete obj["__ASYNCPOST"];
                        delete obj["__AjaxControlToolkitCalendarCssLoaded"];

                        obj["__EVENTARGUMENT"] = "";
                        obj["__EVENTTARGET"] = "";
//                        obj["__AjaxControlToolkitCalendarCssLoaded"] = "";
                        obj["ctl00$FormAreaNoBorder$FormArea$ctlGridPager$btnNext.x"] = "37";
                        obj["ctl00$FormAreaNoBorder$FormArea$ctlGridPager$btnNext.y"] = "9";

                    } else if (dataRes.find("input[name='ctl00$FormAreaNoBorder$FormArea$ctlAccountPager$btnNext']").length) {
                        stopCurrentMonthProcessing = true;

                        // writeLog("Go to next Account");
                        // console.log("Go to next Account");
                        //
                        // var serializeForm = dataRes.find("form").serializeArray();
                        // var obj = {};
                        // serializeForm.forEach((vals) => {
                        //     obj[vals.name] = vals.value;
                        // });
                        // delete obj["ctl00$SM"];
                        // delete obj["__ASYNCPOST"];
                        // delete obj["__AjaxControlToolkitCalendarCssLoaded"];
                        //
                        // obj["hidToggleFormLink"] = "AdvancedSearchClose";
                        // obj["__EVENTARGUMENT"] = "";
                        // obj["__EVENTTARGET"] = "";
                        // obj["__TRANS_SOURCE_NAME"] = "Transactions";
                        // obj["ctl00$FormAreaNoBorder$FormArea$ctlAccountPager$btnNext.x"] = "33";
                        // obj["ctl00$FormAreaNoBorder$FormArea$ctlAccountPager$btnNext.y"] = "6";
                        // obj["ctl00$FormAreaNoBorder$FormArea$rdogrpTransactionType"] = "rdoDebitDate";
                        // obj["ctl00$FormAreaNoBorder$FormArea$rdogrpSummaryReport"] = "rdoAggregationNone";
                        //
                        // obj["cmbTransType_HiddenField"] = "0";
                        // obj["cmbTransOrigin_HiddenField"] = "0";
                        // obj["cmbPayWallet_HiddenField"] = "0";
                        // obj["cmbTransAggregation_HiddenField"] = "0";

                        // obj["ctl00$FormAreaNoBorder$FormArea$ctlDateScopeStart$ctlMonthYearList$HiddenField"] = obj["ctl00$FormAreaNoBorder$FormArea$ctlDateScopeEnd$ctlMonthYearList$HiddenField"];

                    } else {
                        stopCurrentMonthProcessing = true;
                    }
                } else {
                    stopCurrentMonthProcessing = true;
                }

            } while (!stopCurrentMonthProcessing);

            storePagesResults();

            if ((this.formDatesMutationsIdx + 1) < this.formDatesMutations.length) {
                this.formDatesMutationsIdx += 1;
                var serializeForm = dataRes.find("form").serializeArray();
                var obj = {};
                serializeForm.forEach((vals) => {
                    obj[vals.name] = vals.value;
                });
                delete obj["ctl00$SM"];
                delete obj["__ASYNCPOST"];
                delete obj["__AjaxControlToolkitCalendarCssLoaded"];

                obj["hidToggleFormLink"] = "AdvancedSearchClose";
                obj["__EVENTARGUMENT"] = "NewRequest";
                obj["__EVENTTARGET"] = "SubmitRequest";

                setTimeout(() => {
                    this.loadData(Object.assign(obj, this.formDatesMutations[this.formDatesMutationsIdx]));
                }, 0)
            } else {
                if (this.arrOfCard.length > (this.idxCards + 1)) {
                    this.idxCards += 1;
                    setTimeout(() => {
                        this.changeCard(false, false);
                    }, 0)
                } else {
                    writeLog("Finished");
                    this.sendCardsCtrl();
                }
            }

        } catch (ex) {
            myEmitterLogs(9, 'Failed in card months processing', ex.stack);
            this.logOut(false);
        }
    }

    logOut(emitSuccess = true) {
        writeLog("logOut");
        if (this.keepAliveWS) {
            clearInterval(this.keepAliveWS);
        }

        this.visaRestGet(
            "https://services.cal-online.co.il/Card-Holders/Screens/System/Logout.aspx",
            "https://services.cal-online.co.il/Card-Holders/Screens/Transactions/Transactions.aspx",
            this.cookies
        ).then((...args) => {
            writeLog("killVpn");
            monitorVpn.killVpn(() => {
                if (emitSuccess) {
                    myEmitterLogs(25);
                }
            });
        })
    }
}

all.banks.accounts.visaCardAll = new visaCard();
