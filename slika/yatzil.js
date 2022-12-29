class yatzil {
    constructor() {
        this.cookies = "";
        this.paramForm;
        this.param = "";
        this.pathUrl = "";
        this.logoutTime = 0;
        this.arr = [];
        var dateTo = new Date();
        var dateFrom = new Date(dateTo.getFullYear(), dateTo.getMonth() - 3, dateTo.getDate());
        this.dates = {
            dateFrom: [
                ("0" + (dateFrom.getDate())).slice(-2),
                ("0" + (dateFrom.getMonth() + 1)).slice(-2),
                dateFrom.getFullYear()
            ],
            dateTo: [
                ("0" + (dateTo.getDate())).slice(-2),
                ("0" + (dateTo.getMonth() + 1)).slice(-2),
                dateTo.getFullYear()
            ]
        }
    }

    yatzilPost(url, Referer, cookie, body, cb, encode) {
        monitorActivityClass.setIntervalActivity();

        writeLog("yatzilPost: " + url);
        var options = {
            uri: url,
            family: 4,
            timeout: 20000,
            headers: {
                'User-Agent': "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko"
            }
        };
        options.method = "POST";
        options.body = "POST";
        options.headers['DNT'] = "1";
        options.headers['Accept-Language'] = "he-IL";
        options.headers['Content-Type'] = "application/x-www-form-urlencoded; charset=utf-8";
        options.headers.Host = "services.yatzil.co.il";
        // if (typeof(body) !== "object") {
        // 	var obj = {};
        // 	body.split("&").forEach((v) => {
        // 		var val = v.split("=");
        // 		obj[val[0]] = val[1];
        // 	})
        // 	body = obj;
        // }
        options.form = body;
        options.family = 4;
        options.timeout = 20000;
        if (cookie !== null) {
            options.headers.Cookie = cookie;
        }
        if (Referer !== null) {
            options.headers.Referer = Referer;
        }
        if (encode !== undefined) {
            options.encoding = null;
        }
        senderReq.sendersServer(options, (error, response, data) => {
            if (encode !== undefined) {
                data = iconv.decode(new Buffer(data), 'iso-8859-8');
            }
            if (response.headers["set-cookie"]) {
                this.getSetCookies(response.headers["set-cookie"])
                    .then((res) => {
                        cb(error, response, data);
                    });
            } else {
                cb(error, response, data);
            }
        });
    }

    yatzilRestGet(url, cookie, Referer, cb, encode) {
        monitorActivityClass.setIntervalActivity();

        writeLog("yatzilRestGet: " + url);
        var options = {
            uri: url,
            headers: {
                'User-Agent': "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko"
            }
        };
        options.headers['Cache-Control'] = "no-cache";
        options.headers['Connection'] = "Keep-Alive";
        options.headers['Accept-Encoding'] = "gzip, deflate";
        options.headers['Accept'] = "text/html, application/xhtml+xml, */*";
        options.headers['Accept-Language'] = "he-IL";
        options.method = "GET";
        options.headers.DNT = "1";
        options.headers.Host = "services.yatzil.co.il";
        if (cookie !== null) {
            options.headers.Cookie = cookie;
        }
        if (encode !== undefined) {
            options.encoding = null;
        }
        if (Referer !== null) {
            options.headers.Referer = Referer;
        }
        senderReq.sendersServer(options, (error, response, data) => {
            if (encode !== undefined) {
                data = iconv.decode(new Buffer(data), 'iso-8859-8');
            }
            if (response.headers["set-cookie"]) {
                this.getSetCookies(response.headers["set-cookie"])
                    .then((res) => {
                        cb(error, response, data);
                    });
            } else {
                cb(error, response, data);
            }
        });
    }

    sendSlikaCtrl() {
        writeLog("sendSlikaCtrl");

        all.banks.core.services.slikaAccount(this.arr)
            .then((arr) => {
                this.logOut(this.paramForm + "&WARG_1=TAFNIT&WARG_2=run2&WARG_3=EventSrc~CHKTIK~CHKTIK~null~%25paramlst~%22CHKTIK%22%2C%22%25ZWBSCRB%22%2C%22%22%2C1~wberrtreat~~=");
            })
            .fail((error, resErr) => {
                if (error == 'discard') {
                    this.sendSlikaCtrl();
                }
            });
    };

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

    convertDateLocal(dateLocal) {
        var dateFormat = "";
        if (dateLocal !== undefined && dateLocal !== null) {
            dateLocal = dateLocal.toString();
            if (dateLocal !== "") {
                dateFormat = dateLocal.split("/")[1] + "/" + dateLocal.split("/")[0] + "/" + dateLocal.split("/")[2];
            }
        }
        return dateFormat;
    };

    getReverseText(comment, isSpace) {
        var textCom = comment.split(" ").reverse();
        var text = [];
        textCom.forEach(function (val) {
            if (val.replace(/\D/g, '') == "") {
                text.push(val.split("").reverse().join(""))
            } else {
                text.push(val);
            }
        })
        return text.join(" ");
    }

    login() {
        writeLog("login");

        this.yatzilRestGet(
            "https://services.yatzil.co.il/online/screens/AccountManagement/Login.aspx",
            null,
            null,
            (error, response, data) => {
                if (!error && response.statusCode === 200) {
                    // console.log(this.cookies);
                    // console.log("------");
                    var responseGet = all.banks.core.services.parseHtml(data);
                    this.yatzilPost(
                        "https://services.yatzil.co.il/online/screens/AccountManagement/Login.aspx",
                        "https://services.yatzil.co.il/online/screens/AccountManagement/Login.aspx",
                        this.cookies,
                        {
                            "__EVENTTARGET": responseGet.find('#__EVENTTARGET').val(),
                            "__EVENTARGUMENT": "",
                            "__VIEWSTATE": responseGet.find('#__VIEWSTATE').val(),
                            "__VIEWSTATEGENERATOR": responseGet.find('#__VIEWSTATEGENERATOR').val(),
                            "__EVENTVALIDATION": responseGet.find('#__EVENTVALIDATION').val(),
                            "ctl00$FormArea$lgnLogin$LoginImageButton.x": "48",
                            "ctl00$FormArea$lgnLogin$LoginImageButton.y": "12",
                            "ctl00$FormArea$lgnLogin$UserName": all.banks.accountDetails.bank.username.slice(0, 8),
                            "ctl00$FormArea$lgnLogin$Password":  all.banks.accountDetails.bank.password.slice(0, 10)
                        },
                        (error, response, data) => {
                            // console.log(error, response, data);
                            if (error == null) {
                                var data = all.banks.core.services.parseHtml(data);
                                if (data.find(".ErrorMsgBox").length && data.find(".ErrorMsgBox").text().indexOf("הכניסה למערכת נחסמה") !== -1) {
                                    myEmitterLogs(8);
                                } else {
                                    if (response.headers.location !== undefined) {
                                        if (response.headers.location.includes("ChangePassword.aspx")
                                            || response.headers.location.includes("ExpressRegstraionComplite.aspx")) {
                                            myEmitterLogs(6);
                                        } else {
                                            var urls = "https://services.yatzil.co.il" + response.headers.location;
                                            this.yatzilRestGet(
                                                urls,
                                                this.cookies,
                                                "https://services.yatzil.co.il/online/screens/AccountManagement/Login.aspx",
                                                (error, response, data) => {
                                                    console.log(error, response, data);

                                                    // this.yatzilPost(
                                            //     urls,
                                            //     "https://services.yatzil.co.il/online/screens/AccountManagement/Login.aspx",
                                            //     this.cookies,
                                            //     {
                                            //         "from": "marketing",
                                            //         "username": all.banks.accountDetails.bank.username,
                                            //         "password": all.banks.accountDetails.bank.password
                                            //     },
                                            //     (error, response, data) => {
                                                    var data = all.banks.core.services.parseHtml(data);
                                                    if (data.find(".ErrorMessagesBox").length && data.find(".ErrorMessagesBox").text().indexOf("לא תקין") !== -1) {
                                                        myEmitterLogs(5);
                                                    } else if (data.find(".ErrorMsgBox").length && data.find(".ErrorMsgBox").text().indexOf("אינו תקין") !== -1) {
                                                        myEmitterLogs(5);
                                                    } else if (data.find(".ErrorMsgBox").length && data.find(".ErrorMsgBox").text().indexOf("לא קיים") !== -1) {
                                                        myEmitterLogs(5);
                                                    } else {
                                                        // console.log(this.cookies);
                                                        //console.log(response, data);

                                                        var urls1 = "https://services.yatzil.co.il" + data.find("input[name='GO']").attr("ONCLICK").split("'")[1];

                                                        var serializeForm = data.find("form").serializeArray();
                                                        var obj = {};
                                                        serializeForm.forEach((vals) => {
                                                            obj[vals.name] = vals.value;
                                                        });
                                                        this.loadDataFuture(urls, urls1, obj);
                                                    }
                                                })
                                        }
                                    } else {
                                        myEmitterLogs(5);
                                    }
                                }
                            } else {
                                myEmitterLogs(5);
                            }
                        }
                    )
                } else {
                    myEmitterLogs(9, 'system unavailable');
                }
            }
        )
    }

    loadDataFuture(urls, urls1, obj) {
        writeLog("loadDataFuture");

        this.yatzilPost(
            urls1,
            urls,
            this.cookies,
            obj,
            (error, response, data) => {
                console.log("yatzilPost");
                if (error == null) {
                    var urls = "https://services.yatzil.co.il" + response.headers.location;

                    this.yatzilPost(
                        urls,
                        urls,
                        this.cookies,
                        obj,
                        (error, response, data) => {
                            var param = 'WARGC=3&WEVENT=' + data.split("cspHttpServerMethod('")[1].split("',")[0].split("&CSPCHD=")[0] + '&CSPCHD=' + data.split("cspHttpServerMethod('")[1].split("',")[0].split("&CSPCHD=")[1] + '&WARG_1=TAFNIT&WARG_2=run2&WARG_3=EventSrc~ONLINKCLICK~ONLINKCLICK~null~%25paramlst~%22ONLINKCLICK%22%2C%22%25ZWBDHTMLX%22%2C%22**%22%2C1~wberrtreat~~';
                            var dataPage = all.banks.core.services.parseHtml(data);

                            this.solek_descDefault = this.getReverseText(dataPage.find("#BietEsekName").text());

                            var fperutMeaged = dataPage.find("input[name='FPerutMeaged']");
                            if (fperutMeaged.length) {
                                var uriAll = "https://services.yatzil.co.il/tafnit/" + fperutMeaged.attr("onclick").split("form.action='")[1].split("';")[0]
                                var serializeForm = dataPage.find("form").serializeArray();
                                var obj = {};
                                serializeForm.forEach((vals) => {
                                    obj[vals.name] = vals.value;
                                });
                                this.yatzilPost(
                                    uriAll,
                                    urls,
                                    this.cookies,
                                    obj,
                                    (error, response, data) => {
                                        var dataPage = all.banks.core.services.parseHtml(data);

                                        const headersRow = dataPage.find("#Future tr.gridheader").first();
                                        const valueDateIndex = headersRow.find("a#wbkFutureZikuyDate").parents("td").index();
                                        const regularPaymentsTotalIndex = headersRow.find("a#wbkFutureSum").parents("td").index();
                                        const solekDescIndex = 3;

                                        var rows = dataPage.find("#Future tr").not(".gridheaderk, .gridheader");
                                        rows.each((i, v) => {
                                            var valTdRow = $(v).children("td");
                                            var valueDate = null;
                                            var dates = valTdRow.eq(valueDateIndex >= 0 ? valueDateIndex : 2).text().replace(/\s/g, "");
                                            if (dates !== "") {
                                                valueDate = dates;
                                            }
                                            var regularPaymentsTotal = null;
                                            var regularPayments = valTdRow.eq(regularPaymentsTotalIndex >= 0 ? regularPaymentsTotalIndex : 1).text().replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, '');
                                            if (regularPayments !== "") {
                                                regularPaymentsTotal = regularPayments;
                                            }

                                            let solek_desc = null;
                                            if (valueDateIndex !== solekDescIndex && regularPaymentsTotalIndex !== solekDescIndex) {
                                                const textAcc = valTdRow.eq(solekDescIndex).text();
                                                const encodetxt = encodeURI(textAcc).replace(/%C2%A0/g, " ");
                                                solek_desc = this.getReverseText(decodeURI(encodetxt));
                                            }

                                            var accNumbers = $(v).attr('key').replace(/\D/g, "");
                                            //valTdRow.eq(5).text().replace(/\D/g, "");
                                            this.arr.push({
                                                "target_idStr": all.banks.accountDetails.bank.targetId,
                                                "tokenStr": all.banks.accountDetails.bank.token,
                                                "bankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                                "extractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                "ExporterId": all.banks.spiderConfig.spiderId,
                                                "solek_desc": solek_desc || this.solek_descDefault,
                                                "paymentsTotal": 0,
                                                "grandTotal": 0,
                                                "slikaAccount": accNumbers,
                                                "valueDate": valueDate,
                                                "regularPaymentsTotal": regularPaymentsTotal,
                                                "nextTotal": regularPaymentsTotal,
                                                "cardType": 91
                                            });
                                        });
                                        this.param = dataPage.find("input[name='CSPCHD']").val();
                                        this.paramForm = param.split("&WARG_1=")[0];
                                        this.loadLinksData(param, null, urls);
                                    }, true);
                            } else {
                                var rows = dataPage.find("#Future tr").not(".gridheaderk, .gridheader").children("td");
                                var idxTdDate = 2, idxTdNum = 1;
                                if (rows.length === 4) {
                                    idxTdDate = 3;
                                    idxTdNum = 2;
                                }
                                var valueDate = null;
                                var dates = rows.eq(idxTdDate).text().replace(/\s/g, "");
                                if (dates !== "") {
                                    valueDate = dates;
                                }
                                var regularPaymentsTotal = null;
                                var regularPayments = rows.eq(idxTdNum).text().replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, '');
                                if (regularPayments !== "") {
                                    regularPaymentsTotal = regularPayments;
                                }

                                var textAcc = dataPage.find("#Future .gridheaderk").eq(0).text();
                                var encodetxt = encodeURI(textAcc).replace(/%C2%A0/g, " ");
                                textAcc = this.getReverseText(decodeURI(encodetxt));
                                var solek_desc = null;
                                if (textAcc.split("-").length > 1) {
                                    solek_desc = textAcc.split("-")[1];
                                }
                                var lenAcc = 0,
                                    accNumbers = null,
                                    textAccArr = textAcc.split(" ");

                                textAccArr.forEach((valAcc) => {
                                    var valTextAcc = valAcc.replace(/\D/g, "");
                                    if (valTextAcc !== "") {
                                        if (valTextAcc.length > lenAcc) {
                                            lenAcc = valTextAcc.length;
                                            accNumbers = valTextAcc;
                                        }
                                    }
                                });
                                this.arr.push({
                                    "target_idStr": all.banks.accountDetails.bank.targetId,
                                    "tokenStr": all.banks.accountDetails.bank.token,
                                    "bankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                    "extractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    "solek_desc": solek_desc || this.solek_descDefault,
                                    "paymentsTotal": 0,
                                    "grandTotal": 0,
                                    "slikaAccount": accNumbers,
                                    "valueDate": valueDate,
                                    "regularPaymentsTotal": regularPaymentsTotal,
                                    "nextTotal": regularPaymentsTotal,
                                    "cardType": 91
                                });
                                this.param = dataPage.find("input[name='CSPCHD']").val();
                                this.paramForm = param.split("&WARG_1=")[0];
                                this.loadLinksData(param, null, urls);
                            }


                        }, true)

                } else {
                    myEmitterLogs(9, 'system unavailable');
                }
            })
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

    loadLinksData(param, load, urlRef) {
        writeLog("Load links for past data");
        this.yatzilPost(
            "https://services.yatzil.co.il/tafnit/%25CSP.Broker.cls",
            urlRef,
            this.cookies,
            param,
            (error, response, data) => {
                if (load === null) {
                    param = param.split('WARG_3=')[0] + 'WARG_3=EventSrc~ONLINKCLICK~ONLINKCLICK~null~%25paramlst~%22ONLINKCLICK%22%2C%22%25ZWBDHTMLX%22%2C%22ACC*%5EWBASRYDPERUTTASH*asryintcrm%22%2C1~wberrtreat~~';
                    this.loadLinksData(param, true, urlRef)
                } else {
                    var urls = "https://services.yatzil.co.il/tafnit/" + this.decodeHTMLEntities(data.split("aClick=true;this.location.href='")[1].split("';")[0]);
                    this.pathUrl = urls;
                    this.yatzilRestGet(
                        urls,
                        this.cookies,
                        urls,
                        (error, response, data) => {
                            if (!all.banks.openBankPage) {
                                this.loadDates(urls, "from");
                            } else {
                                document.cookie = this.cookies;
                                var cookSplit = this.cookies.split(";");
                                var i1, len1 = cookSplit.length;
                                for (i1 = 0; i1 < len1; i1++) {
                                    var v1 = cookSplit[i1];
                                    if (v1 !== "") {
                                        var nameExist = v1.split("=")[0].replace(/\s/g, "");
                                        var valExist = v1.split("=")[1].replace(/\s/g, "");
                                        win.cookies.set({
                                            url: "https://services.yatzil.co.il",
                                            name: nameExist,
                                            domain: "services.yatzil.co.il",
                                            value: valExist
                                        })
                                    }
                                }
                                setTimeout(() => {
                                    all.banks.core.services.openBankPage("explorerAgent.html", urls)
                                }, 1500)
                            }
                        }, true);
                }
            })
    }

    loadDates(urls, type, last) {
        writeLog("Set Dates for past data");


        var param;
        if (type === "from") {
            param = this.paramForm + "&WARG_1=TAFNIT&WARG_2=run&WARG_3=EventSrc~hFromTarZikuyYMD2~wbInhFromTarZikuyYMD2~" + this.dates.dateFrom[0] + "%2F" + this.dates.dateFrom[1] + "%2F" + this.dates.dateFrom[2] + "~%25paramlst~wbInhFromTarZikuyYMD2%2C2~%25guid~%20~wblookup~~wberrtreat~~";
        } else if (type === "to") {
            param = this.paramForm + "&WARG_1=TAFNIT&WARG_2=run&WARG_3=EventSrc~hToTarZikuyYMD2~wbInhToTarZikuyYMD2~" + this.dates.dateTo[0] + "%2F" + this.dates.dateTo[1] + "%2F" + this.dates.dateTo[2] + "~%25paramlst~wbInhToTarZikuyYMD2%2C1~%25guid~%20~wblookup~~wberrtreat~~";
        } else if (type === "submit") {
            param = this.paramForm + "&WARG_1=TAFNIT&WARG_2=run&WARG_3=EventSrc~KSHOW~KSHOW~null~%25paramlst~KSHOW%2C1~%25guid~%20~wberrtreat~~";
        }
        //console.log(param);
        this.yatzilPost(
            "https://services.yatzil.co.il/tafnit/%25CSP.Broker.cls",
            urls,
            this.cookies,
            param,
            (error, response, data) => {
                //	console.log(data);
                if (type === "from" && last === undefined) {
                    this.loadDates(urls, "from", true)
                } else {
                    if (type === "from") {
                        this.loadDates(urls, "to");
                    } else if (type === "to") {
                        this.loadDates(urls, "submit");
                    } else if (type === "submit") {
                        this.loadData();
                    }
                }
            });
    }

    loadData() {
        writeLog("loadData past");

        var paramForm = "CSPCHD=" + this.param + "--&HSHOW=%A0%28%E4%F6%E2%A0%28%F0%F1%FA%F8&wbgnlPERUTTASH=500&wbgndPERUTTASH=1&wbgsgHeshboniyot=&wbgsgScNeto=&wbgsgScTash=&wbgsgAher=&wbgsgMoadonim=&wbgsgScMaam=&wbgsgScAmlatNikyon=&wbgsgScAmlatSlika=&wbgsgScBruto=&wbgsgHeshbonBank=&wbgteurgMislaka=&wbgsgMislaka=&wbgsgMsprLK=&wbgsgTarZikuyDMY2=&wbgnlDPERUTTASH=500&wbgndDPERUTTASH=1&wbgsgDHeshboniyot=&wbgsgDScNeto=&wbgsgDScTash=&wbgsgDAherSc=&wbgsgDAherTeur=&wbgsgDMoadonim=&wbgsgDScMaam=&wbgsgDScAmlatNikyon=&wbgsgDScAmlatSlika=&wbgsgDScBruto=&wbgsgDHeshbonBank=&wbgteurgDMislaka=&wbgsgDMislaka=&wbgsgDMsprLK=&wbgsgDTarZikuyDMY2=&wbgnlTVnavFIND=10&wbgndTVnavFIND=1&wbgnlTTAher=20&wbgndTTAher=1&wbgsgTTASc=&wbgsgTTATeur=&wbgnlTTHeshbonit=20&wbgndTTHeshbonit=1&wbgsgTTHTarHeshbonitYMD2=&wbgsgTTHHeshbonit=&wbgsgTTHHev=&wbgnlTTKabl=20&wbgndTTKabl=1&wbgsgTTKScNeto=&wbgsgTTKScMaam=&wbgsgTTKScMoadonim=&wbgsgTTKScNikyon=&wbgsgTTKScSlika=&wbgsgTTKScBruto=&wbgteurgTTKSugIska=&wbgsgTTKSugIska=&wbgsgTTKTarKabalaYMD2=&wbgsgTTKKabala=&wbgsgTTKHev=&jsHIDDEN=";
        var urlsParam = "https://services.yatzil.co.il/tafnit/TAFNIT.CSP?PRESSED=HSHOW&nspace=ACC&cspaction=MatrixCSP.SYS.MatrixBase.action&CSPCHD=" + this.param;
        this.yatzilPost(
            urlsParam,
            this.pathUrl,
            this.cookies,
            paramForm,
            (error, response, data) => {
                if (error != null) {
                    myEmitterLogs(9);
                    return;
                }

                let processingFailed;
                try {
                    //console.log(data);
                    var data = all.banks.core.services.parseHtml(data);

                    const headersRow = data.find("#GRIDPERUTTASH tr.gridheader").first();
                    const valueDateIndex = headersRow.find("a#wbkgTarZikuyDMY2").parents("td").index();
                    const slikaAccountIndex = headersRow.find("a#wbkgMsprLK").parents("td").index();
                    const nextTotalIndex = headersRow.find("a#wbkgScNeto").parents("td").index();
                    const regularPaymentsTotalIndex = headersRow.find("a#wbkgScTash").parents("td").index();

                    if (valueDateIndex < 0 || slikaAccountIndex < 0 || nextTotalIndex < 0 || regularPaymentsTotalIndex < 0) {
                        throw new Error(`Field index not found ${valueDateIndex}, ${slikaAccountIndex}, ${nextTotalIndex}, ${regularPaymentsTotalIndex}`);
                    }

                    data.find("#GRIDPERUTTASH tr").not(".gridheader, .gridsubtot, .gridtotall").each((i, v) => {
                        try {
                            var val = $(v).children("td");
                            if (val.length > 5) {
                                var solekDesc = null;
                                // if (val.eq(10).text().replace(/\s/g, "") !== "") {
                                // 	solekDesc = this.getReverseText(val.eq(10).text());
                                // }
                                this.arr.push({
                                    "target_idStr": all.banks.accountDetails.bank.targetId,
                                    "tokenStr": all.banks.accountDetails.bank.token,
                                    "bankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                    "extractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    "solek_desc": solekDesc || this.solek_descDefault,
                                    "paymentsTotal": 0,
                                    "grandTotal": 0,
                                    "slikaAccount": val.eq(slikaAccountIndex).text().replace(/\s/g, ""),
                                    "valueDate": val.eq(valueDateIndex).text().replace(/\s/g, ""),
                                    "regularPaymentsTotal": val.eq(regularPaymentsTotalIndex).text().replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, ''),
                                    "nextTotal": val.eq(nextTotalIndex).text().replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, ''),
                                    "cardType": 91
                                })
                            }
                        } catch (e) {
                            writeLog(e);
                            processingFailed = true;
                            return false;
                        }
                    });

                } catch (e) {
                    writeLog(e);
                    myEmitterLogs(9);
                    return;
                }

                if (processingFailed) {
                    myEmitterLogs(9);
                    return;
                }

                this.sendSlikaCtrl();
                //console.log(this.arr);
            }, true);
    }

    logOut(param) {
        if (this.logoutTime === 0) {
            writeLog("logOut");
        }

        this.yatzilPost(
            "https://services.yatzil.co.il/tafnit/%25CSP.Broker.cls",
            this.pathUrl,
            this.cookies,
            param,
            (error, response, data) => {
                if (this.logoutTime === 0) {
                    this.logoutTime += 1;
                    this.logOut(this.paramForm + "&WARG_1=TAFNIT&WARG_2=run2&WARG_3=EventSrc~CONFIRM~CONFIRM~null~%25paramlst~%22CONFIRM%22%2C%22%25ZWBSCRD%22%2C%22KRET%22%2C1~wberrtreat~~")
                } else if (this.logoutTime === 1) {
                    this.logoutTime += 1;
                    this.logOut(this.paramForm + "&WARG_1=TAFNIT&WARG_2=run&WARG_3=EventSrc~KRET~KRET~null~%25paramlst~KRET%2C1~%25guid~%20~wberrtreat~~");
                } else if (this.logoutTime === 2) {
                    this.logoutTime += 1;
                    this.logOut(this.paramForm + "&WARG_1=TAFNIT&WARG_2=run2&WARG_3=EventSrc~CLOSE~CLOSE~null~%25paramlst~%22CLOSE%22%2C%22%25ZWBSCRB%22%2C%22%22%2C1~wberrtreat~~")
                } else if (this.logoutTime === 3) {
                    monitorVpn.killVpn(() => {
                        myEmitterLogs(25);
                    });
                }
            });
    }
}

all.banks.accounts.yatzilAll = new yatzil();
