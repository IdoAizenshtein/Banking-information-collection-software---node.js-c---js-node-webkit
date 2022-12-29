all.banks.accounts.yahav = function () {
    var crypto = require('crypto'),
        productVersion = "BaNCSDigital.Web_1.3.46.BY.1.1.42.FP3",
        gdm = "GDM_1.0.88",
        envelopeVersion = "MessageEnvelope_1.0.0";

    function createBDIdentKey(val) {
        var encriptionKey = productVersion + "~" + gdm + "~" + envelopeVersion + "~" + crypto.createHash("sha256").update(val, "utf8").digest("hex");
        return btoa(encriptionKey);
    }

    var yahav = {};
    yahav.requestBase = {
        "Device": {
            "Ver": "Device_1.0.0",
            "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
            "Type": {"CDE": "HOMECOMPUTER"},
            "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
        },
        "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
        "AppVer": productVersion, // "BaNCSDigital.Web.1.3.45.BY.1.1.36",
        "EnvVer": "MessageEnvelope_1.0.0",
        "APIVer": gdm, // "GDM_1.0.85",
        "ProxyApp": {
            "Ver": "ProxyApp_1.0.0",
            "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36",
            "Typ": {
                "CDE": "BROWSER"
            }
        },
        "ClientApp": {
            "Ver": "Application_1.0.0",
            "Id": {
                "Ver": "Identifier_1.0.0"
            },
            "BldDt": {
                "Ver": "DateTime_1.0.0",
                "Timezone": {
                    "Ver": "TimeZone_1.0.0"
                }
            },
            "InstlDt": {
                "Ver": "DateTime_1.0.0",
                "Timezone": {
                    "Ver": "TimeZone_1.0.0"
                }
            },
            "ComptLst": {
                "Ver": "ApplicationComponentList_1.0.0",
                "AppCompLst": [
                    {
                        "Ver": "ApplicationComponent_1.0.0",
                        "Nam": "Retail Internet Banking",
                        "AppCompVer": productVersion, // "BaNCSDigital.Web.1.3.45.BY.1.1.36",
                        "Typ": {
                            "CDE": "WEBPACKAGE"
                        }
                    }
                ]
            },
            "ApId": {
                "Ver": "Identifier_1.0.0"
            },
            "ApGrpId": {
                "Ver": "Identifier_1.0.0"
            },
            "Nam": "Retail Internet Banking",
            "ApVer": productVersion, // "BaNCSDigital.Web.1.3.45.BY.1.1.36",
            "Typ": {
                "CDE": "WEBAPP"
            },
            "CdngLng": "Hybrid",
            "TrgtOS": {
                "CDE": "WINDOWS"
            }
        }
    };

    yahav.prepareRequestUsing = function (data) {
        if (data) {
            data["Ver"] = envelopeVersion;
            data["Device"] = {
                "Ver": "Device_1.0.0",
                "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
                "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
                "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
            };
            data["Locale"] = {"CDE": "IW_IL", "DISP": "Hebrew Israel"}
            data["AppVer"] = productVersion;
            data["EnvVer"] = "MessageEnvelope_1.0.0";
            data["APIVer"] = gdm;
            data["ProxyApp"] = {
                "Ver": "ProxyApp_1.0.0",
                "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36",
                "Typ": {"CDE": "BROWSER", "DISP": "Browser"}
            };
            data["ClientApp"] = {
                "Ver": "Application_1.0.0",
                "Id": {"Ver": "Identifier_1.0.0"},
                "BldDt": {"Ver": "DateTime_1.0.0", "Timezone": {"Ver": "TimeZone_1.0.0"}},
                "InstlDt": {"Ver": "DateTime_1.0.0", "Timezone": {"Ver": "TimeZone_1.0.0"}},
                "ComptLst": {
                    "Ver": "ApplicationComponentList_1.0.0",
                    "AppCompLst": [{
                        "Ver": "ApplicationComponent_1.0.0",
                        "AppCompVer": productVersion,
                        "Typ": {"CDE": "WEBPACKAGE", "DISP": "WEBPACKAGE"}
                    }]
                },
                "ApId": {"Ver": "Identifier_1.0.0"},
                "ApGrpId": {"Ver": "Identifier_1.0.0"},
                "ApVer": productVersion,
                "Typ": {"CDE": "WEBAPP", "DISP": "WebApp"},
                "CdngLng": "Hybrid",
                "TrgtOS": {"CDE": "WINDOWS", "DISP": "WINDOWS"}
            };
            data["FiId"] = {"Ver": "Identifier_1.0.0"}
            data["UIID"] = {"Ver": "UIIDomain_1.0.0"}
            data["DgtlTxnId"] = {"Ver": "Identifier_1.0.0"},
                data["MsgId"] = "73692655"
            data["SessionId"] = "sessionId"
        }

        return data;
    };
    yahav.timesOfChangeIp = 0;

    function waitForInitialCookies() {
        return new Promise((resolve, reject) => {
            $('#filecontainerlogin').attr("src", "https://login.yahav.co.il/login/");
            let times = 1;
            const checker = setInterval(() => {
                monitorActivityClass.setIntervalActivity();
                win.cookies.getAll({}, function (arr) {
                    if (arr.length > 3) {
                        resolve(true);
                        clearInterval(checker);
                    } else if (times++ > 20) {
                        writeLog("---- IP is blocked - changeIp----");
                        if (yahav.timesOfChangeIp < 5) {
                            yahav.timesOfChangeIp += 1;
                            times = 0;
                            writeLog("---- Start ChangeIp----");
                            all.banks.core.main.changeIpV4(true).then(function (res) {
                                if (res) {
                                    console.log(res);
                                    $('#filecontainerlogin').attr("src", "https://login.yahav.co.il/login/");
                                } else {
                                    $.get("http://icanhazip.com")
                                        .done(function (ipAddrress) {
                                            ipAddrress = ipAddrress.replace(/\s/g, "");
                                            myEmitterLogs(9, 'IP is blocked - ' + ipAddrress + 'spiderId:' + all.banks.spiderConfig.spiderId);
                                            $('#filecontainerlogin').attr('src', '');
                                            clearInterval(checker);
                                            resolve(false);
                                        });
                                }
                            });
                        } else {
                            $.get("http://icanhazip.com")
                                .done(function (ipAddrress) {
                                    ipAddrress = ipAddrress.replace(/\s/g, "");
                                    myEmitterLogs(9, 'IP is blocked - ' + ipAddrress + 'spiderId:' + all.banks.spiderConfig.spiderId);
                                    $('#filecontainerlogin').attr('src', '');
                                    clearInterval(checker);
                                    resolve(false);
                                });
                        }
                    }
                });

            }, 10000);
        });
    }

    yahav.login = async function () {
        try {
            // await setProxy();
            // await clearProxy();
            // await setProxy();

            if (!await waitForInitialCookies()) {
                myEmitterLogs(9, 'Failed to get initial cookies');
                return false;
            }

            $('#filecontainerlogin').remove()

            var data = {
                'SMENC': "UTF-8",
                'SMLOCALE': "US-EN",
                'USER': all.banks.accountDetails.bank.username,
                'NATIONAL_ID': all.banks.accountDetails.bank.autoCode,
                'PASSWORD': all.banks.accountDetails.bank.password,
                'submit': ""
            };
            all.banks.core.services.httpReq("https://login.yahav.co.il/login/login", 'POST', data, true, false)
                .then(function (res) {
                    var dataRes = all.banks.core.services.parseHtml(res);
                    if (dataRes[0].title === 'שאלות אבטחה') {
                        myEmitterLogs(5, 'שאלות אבטחה');
                    } else if (dataRes[0].title === "login") {
                        myEmitterLogs(5);
                    } else if (dataRes[0].title.includes('לא ניתן להשלים בקשה')) {
                        myEmitterLogs(5);
                    } else if (dataRes.find("form#QAForm[name='requestChequeBookCntrl.registerForm']").length) {
                        myEmitterLogs(9);
                    } else {
                        const textPage = dataRes.text();
                        if (textPage.includes('חשבונך ננעל')) {
                            myEmitterLogs(8);
                            return;
                        } else if (textPage.includes('אחד או יותר מהפרטים שהזנת שגוי')) {
                            myEmitterLogs(5);
                            return;
                        } else {
                            if (!all.banks.openBankPage) {
                                function pollForSessionCookies() {
                                    return new Promise((resolve, reject) => {
                                        all.banks.core.services.httpReq('https://digital.yahav.co.il/BaNCSDigitalUI/version.json', 'GET', null, false, false).then(function (response) {
                                            productVersion = response.implementation.web.version;
                                            // $('#filecontainerlogin').attr("src", "https://digital.yahav.co.il/BaNCSDigitalWeb/app/index.html");
                                            let times = 1;
                                            const checker = setInterval(() => {
                                                monitorActivityClass.setIntervalActivity();
                                                win.cookies.getAll({domain: '.yahav.co.il'}, function (arr) {
                                                    if (arr.length > 5) {
                                                        resolve(true);
                                                        clearInterval(checker);
                                                    } else if (times++ > 9) {
                                                        clearInterval(checker);
                                                        resolve(false);
                                                    }
                                                });
                                            }, 300);
                                        })
                                            .fail(function (error, resErr, urlParam) {
                                                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                                                all.banks.core.services.errorLog(logErr)
                                            });
                                    });
                                }

                                function proceed() {
                                    function getCookie(cname) {
                                        var name = cname + "=";
                                        var decodedCookie = decodeURIComponent(window.frames[0].document.cookie);
                                        var ca = decodedCookie.split(';');
                                        for (var i = 0; i < ca.length; i++) {
                                            var c = ca[i];
                                            while (c.charAt(0) == ' ') {
                                                c = c.substring(1);
                                            }
                                            if (c.indexOf(name) == 0) {
                                                return c.substring(name.length, c.length);
                                            }
                                        }
                                        return "";
                                    }

                                    var url = "https://digital.yahav.co.il/BaNCSDigitalApp/login";
                                    var req = yahav.prepareRequestUsing({
                                        "Payload": {
                                            "Ver": "MessagePayload_1.0.0",
                                            "DataEntity": [{
                                                "Ver": "LoginUserCredentials_1.0.0",
                                                "PrimaryVerData": {
                                                    "Ver": "SMSessionVerificationData_1.0.0",
                                                    "isArchetype": true,
                                                    "SMSession": {"Ver": "Secret_1.0.0", "isArchetype": true}
                                                },
                                                "DomainAddr": [{
                                                    "Ver": "DomainAddress_1.0.0",
                                                    "isArchetype": false,
                                                    "PlatformId": "Retail",
                                                    "AppId": "Bancs"
                                                }],
                                                "VerId": {
                                                    "Ver": "StringVerificationIdentifier_1.0.0",
                                                    "UserId": {
                                                        "Ver": "UserIdentifier_1.0.0",
                                                        "isArchetype": false,
                                                        "ObjId": "RetailUser",
                                                        "UserStatus": {"CDE": "ACTIVE"}
                                                    },
                                                    "NAME": "."
                                                },
                                                "CredScope": {"CDE": "LOGIN"}
                                            }],
                                            "Operation": "VLD",
                                            "Category": ["min"]
                                        },
                                    });
                                    req['Resource'] = "https://digital.yahav.co.il//BaNCSDigitalApp/login";
                                    req['SecToken'] = {"Ver": "SecurityToken_1.0.0", "isArchetype": true, "Token": []};

                                    all.banks.core.services.httpReq(url, 'POST', req, false, false, undefined, {
                                        'BD_IDENT_KEY': createBDIdentKey(JSON.stringify(req))
                                    })
                                        .then(function (data, res, xhr) {
                                            win.cookies.getAll({}, function (cookies) {
                                                const TOKEN = cookies.find((it) => it.name === 'XSRF-TOKEN');
                                                if (TOKEN) {
                                                    yahav.token = TOKEN.value;
                                                    nextAfterGetToken()
                                                } else {
                                                    yahav.token = getCookie("XSRF-TOKEN");
                                                    nextAfterGetToken()
                                                }
                                            });

                                            function nextAfterGetToken() {
                                                yahav.SecToken = data.SecToken;
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
                                                all.banks.generalVariables.allDataArrAshrai = [];
                                                all.banks.generalVariables.allDataArrLoan = [];
                                                all.banks.generalVariables.allDataArrDeposit = [];
                                                all.banks.generalVariables.allDataArrDueChecks = [];
                                                all.banks.generalVariables.allDataArrStandingOrders = [];
                                                all.banks.accounts.aibank.datebackslesh = ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateFrom.getFullYear().toString().slice(-2);
                                                all.banks.accounts.aibank.datebacksleshTo = ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateTo.getFullYear().toString().slice(-2);
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
                                                yahav.loadAcc();
                                            }
                                        })
                                        .fail(function (error, resErr, urlParam) {
                                            myEmitterLogs(5);
                                        });
                                }

                                pollForSessionCookies().then((result) => {
                                    if (result) {
                                        proceed();
                                    } else {
                                        myEmitterLogs(9);
                                    }
                                });
                            } else {
                                all.banks.core.services.openBankPage("https://digital.yahav.co.il/BaNCSDigitalWeb/app/index.html");
                            }
                        }
                    }
                })
                .fail(function (error, resErr, urlParam) {
                    var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                    all.banks.core.services.errorLog(logErr)
                });
        } catch (err) {
            all.banks.core.services.errorLog(err)
        }
    };
    yahav.loadAcc = function () {
        var accUrl = "https://digital.yahav.co.il/BaNCSDigitalApp/portfolio";
        var reqAcc = yahav.prepareRequestUsing({
            "Payload": {
                "Ver": "MessagePayload_1.0.0",
                "DataEntity": [{
                    "Ver": "CustomerPortfolioRelationship_1.0.0.BY.1.0",
                    "isArchetype": true,
                    "Prtflio": {
                        "Ver": "Portfolio_1.0.0",
                        "isArchetype": true,
                        "Id": {"Ver": "PortfolioIdentifier_1.0.0", "isArchetype": true}
                    }
                }],
                "Operation": "INQ",
                "Category": ["min"]
            }
        });
        reqAcc['Resource'] = "https://digital.yahav.co.il//BaNCSDigitalApp/portfolio";
        reqAcc.SecToken = yahav.SecToken;
        $.ajax({
            url: accUrl,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqAcc)));
            },
            data: JSON.stringify(reqAcc),
            method: "POST",
            contentType: "application/json"
        })
            .done(function (data) {
                if (data && data.Status && data.Status.Code === 0) {
                    yahav.acc = data.Payload.DataEntity;
                    if (all.banks.accountDetails.deleted_account_ids.length) {
                        yahav.acc = yahav.acc.filter(v => !(all.banks.accountDetails.deleted_account_ids.some(it => (parseFloat(v.Prtflio.Id.Id.split(new RegExp(v.Prtflio.Brnch.FiLocatnId.Id + '(\\d+)', 'g'))[1].toString()).toString()).includes(it.toString()))))
                    }
                    yahav.loadDataAll();
                } else {
                    // yahav.loadAcc();

                    myEmitterLogs(9);
                }
            })
    }
    yahav.loadDataAll = function () {
        yahav.indAcc = 0;
        if (all.banks.accountDetails.days > 0) {
            yahav.loadOsh();
        } else if (all.banks.accountDetails.ccardMonth > 0) {
            yahav.loadAshrai()
        } else if (all.banks.accountDetails.IND_NILVIM > 0) {
            yahav.loadDepositsAndLoans();
        } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
            yahav.loadMatah();
        } else {
            yahav.logOut();
        }
    }
    yahav.reverseText = function (comment, isTransfer) {
        if (comment && (comment = comment.replace(/[\u202D\u202B]/g, ''))) {
            return comment.split("/").join(isTransfer ? "" : "/");
        }
        return comment;
//		if (comment && (comment = comment.replace(/[\u202D]/g, ''))) {
//			var textCom = comment.split("/").reverse();
//			var text = [];
//			textCom.forEach(function (val) {
//				if (val.match(/\D/g) !== null && val.match(/[\u0590-\u05FF]/g) !== null) {
//					text.push(val.split("").reverse().join(""));
//				}
//				else {
//					text.push(val);
//				}
//			});
//			if (isTransfer) {
//				return text.join("");
//			}
//			else {
//				return text.join("/");
//			}
//		}
//		else {
//			return comment;
//		}
    };
    yahav.loadOsh = function () {
        $(yahav.acc).each(function (i, v) {
            if (i == yahav.indAcc) {
                var id = v.Prtflio.Id;
                var reqAcc = yahav.prepareRequestUsing({
                    "Ver": "MessageEnvelope_1.0.0",
//                    "Device": {
//                        "Ver": "Device_1.0.0",
//                        "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                        "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                        "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                    },
//                    "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                    "Payload": {
                        "Ver": "MessagePayload_1.0.0",
                        "DataEntity": [{
                            "Ver": "PortfolioAccountRelationship_1.0.0",
                            "isArchetype": true,
                            "Id": {"Ver": "Identifier_1.0.0", "isArchetype": true},
                            "Prtflio": {
                                "Ver": "Portfolio_1.0.0",
                                "isArchetype": true,
                                "Id": {
                                    "Ver": "PortfolioIdentifier_1.0.0",
                                    "PortFoId": {"INTERNALIDENTIFIER": ""},
                                    "iorId": id.iorId,
                                    "Id": id.Id
                                }
                            }
                        }],
                        "Operation": "INQ",
                        "RefDataList": [{
                            "Ver": "ReferenceData_1.0.0",
                            "Id": id.iorId,
                            "Type": {
                                "CDE": "PORTFOLIOIDENTIFIERIORID",
                                "DISP": "PortfolioIdentifierIORID"
                            }
                        }],
                        "Filters": [{
                            "Ver": "ANDFilter_1.0.0",
                            "Filters": [{
                                "Ver": "AccountListFilter_1.0.0",
                                "Type": {"CDE": "DDA", "DISP": "DEMANDDEPOSITACCOUNT"},
                                "Operator": "EQUAL"
                            }, {
                                "Ver": "AccountListFilter_1.0.0",
                                "Currency": {
                                    "Ver": "Currency_1.0.0",
                                    "isArchetype": true,
                                    "Code": {"CDE": "ILS", "DISP": "Shekel"}
                                },
                                "Operator": "EQUAL"
                            }]
                        }]
                    },
                    "UIID": {"Ver": "UIIDomain_1.0.0"},
                    "Resource": "resrc",
//                    "AppVer": "1.0.0",
//                    "EnvVer": "MessageEnvelope_1.0.0",
//                    "APIVer": "apiVer",
                    "MsgId": "64009602",
//                    "ProxyApp": {
//                        "Ver": "ProxyApp_1.0.0",
//                        "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36"
//                    },
                    "SessionId": "sessionId"
                });
                reqAcc.SecToken = yahav.SecToken;
                var idPor = id.iorId;
                $.ajax({
                    url: "https://digital.yahav.co.il/BaNCSDigitalApp/account",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                        xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqAcc)));
                    },
                    data: JSON.stringify(reqAcc),
                    method: "POST",
                    contentType: "application/json"
                }).done(function (data) {
                    var dataInfo = data;
                    var id = dataInfo.Payload.DataEntity[0].Account.AccountId.Id.Id;
                    var iorId = dataInfo.Payload.DataEntity[0].Account.AccountId.iorId;

                    var acc = {
                        "BankNumber": parseFloat(all.banks.accountDetails.bank.BankNumber),
                        'AccountNumber': parseFloat(v.Prtflio.Id.Id.split(new RegExp(v.Prtflio.Brnch.FiLocatnId.Id + '(\\d+)', 'g'))[1].toString()),
                        'BranchNumber': parseFloat(v.Prtflio.Brnch.FiLocatnId.Id.toString()),
                        'Balance': dataInfo.Payload.DataEntity[0].Account.AccountRefDataList[0].Id,
                        'AccountCredit': null
                    };
                    var reqCredit = yahav.prepareRequestUsing({
                        "Ver": "MessageEnvelope_1.0.0",
//                        "Device": {
//                            "Ver": "Device_1.0.0",
//                            "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                            "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                            "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                        },
//                        "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                        "Payload": {
                            "Ver": "MessagePayload_1.0.0",
                            "DataEntity": [{
                                "Ver": "DemandDepositAccount_1.0.0",
                                "AccountId": {
                                    "Ver": "AccountIdentifier_1.0.0",
                                    "AcctIds": {"BANKACCOUNTID": ""},
                                    "Id": {"Ver": "Identifier_1.0.0", "Id": id},
                                    "iorId": iorId
                                },
                                "Currency": {
                                    "Ver": "Currency_1.0.0",
                                    "isArchetype": true,
                                    "Code": {"CDE": "ILS", "DISP": "שקל"}
                                },
                                "Use": {"CDE": "BUSINESS", "DISP": "ביזנס"},
                                "Type": {"CDE": "DDA", "DISP": "DEMANDDEPOSITACCOUNT"},
                                "OpenDt": {"Ver": "Date_1.0.0", "isArchetype": true},
                                "BalanceList": [{
                                    "Ver": "AccountBalance_1.0.0",
                                    "isArchetype": true,
                                    "CurrAmt": {
                                        "Ver": "CurrencyAmount_1.0.0",
                                        "isArchetype": true,
                                        "Amt": {"Ver": "Amount_1.0.0", "isArchetype": true}
                                    }
                                }]
                            }],
                            "Operation": "INQ",
                            "RefDataList": [{
                                "Ver": "ReferenceData_1.0.0",
                                "Id": id.iorId,
                                "Type": {"CDE": "PORTFOLIOIDENTIFIERIORID", "DISP": "PortfolioIdentifierIORID"}
                            }]
                        },
                        "UIID": {"Ver": "UIIDomain_1.0.0"},
                        "Resource": "resrc",
//                        "AppVer": "1.0.0",
//                        "EnvVer": "MessageEnvelope_1.0.0",
//                        "APIVer": "apiVer",
                        "MsgId": "99079992",
//                        "ProxyApp": {
//                            "Ver": "ProxyApp_1.0.0",
//                            "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
//                        },
                        "SessionId": "sessionId"
                    });
                    reqCredit.SecToken = data.SecToken;
                    $.ajax({
                        url: "https://digital.yahav.co.il/BaNCSDigitalApp/account",
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                            xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqCredit)));
                        },
                        data: JSON.stringify(reqCredit),
                        method: "POST",
                        contentType: "application/json"
                    }).done(function (res) {
                        try {
                            acc.AccountCredit = all.banks.core.services.parseSum(res.Payload.DataEntity[0].OverdraftLimitList[0].OvrdrftAmt.Amt.Value);
                        } catch (e) {
                            acc.AccountCredit = 0;
                        }
                        myEmitterLogs(10, acc.AccountNumber); //change Acc
                        all.banks.generalVariables.allDataArr.BankData[0].Account.push(acc);
                        all.banks.generalVariables.allDataArr.BankData[0].Account[yahav.indAcc].DataRow = [];

                        var req = yahav.prepareRequestUsing({
                            "Ver": "MessageEnvelope_1.0.0",
//                            "Device": {
//                                "Ver": "Device_1.0.0",
//                                "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                                "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                                "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                            },
//                            "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                            "Payload": {
                                "Ver": "MessagePayload_1.0.0",
                                "DataEntity": [{
                                    "Ver": "Transaction_1.0.0",
                                    "AccountId": {
                                        "Ver": "AccountIdentifier_1.0.0",
                                        "AcctIds": {"BANKACCOUNTID": ""},
                                        "Id": {"Ver": "Identifier_1.0.0", "Id": id},
                                        "iorId": iorId
                                    }
                                }],
                                "Operation": "INQ",
                                "Category": ["min"],
                                "Filters": [{
                                    "Ver": "ANDFilter_1.0.0",
                                    "Filters": [{
                                        "Ver": "TransactionListFilter_1.0.0",
                                        "OrigDt": {
                                            "Ver": "Date_1.0.0",
                                            "Day": all.banks.accountDetails.dateFrom.getDate(),
                                            "Month": (all.banks.accountDetails.dateFrom.getMonth() + 1),
                                            "Year": all.banks.accountDetails.dateFrom.getFullYear()
                                        },
                                        "Operator": "GREATERTHANOREQUAL"
                                    }, {
                                        "Ver": "TransactionListFilter_1.0.0",
                                        "OrigDt": {
                                            "Ver": "Date_1.0.0",
                                            "Day": all.banks.accountDetails.dateTo.getDate(),
                                            "Month": (all.banks.accountDetails.dateTo.getMonth() + 1),
                                            "Year": all.banks.accountDetails.dateTo.getFullYear()
                                        },
                                        "Operator": "LESSTHANOREQUAL"
                                    }]
                                }],
                                "RefDataList": [{
                                    "Ver": "ReferenceData_1.0.0",
                                    "Id": idPor,
                                    "Type": {"CDE": "PORTFOLIOIDENTIFIERIORID", "DISP": "PortfolioIdentifierIORID"}
                                }]
                            },
                            "UIID": {"Ver": "UIIDomain_1.0.0"},
                            "Resource": "resrc",
//                            "AppVer": "1.0.0",
//                            "EnvVer": "MessageEnvelope_1.0.0",
//                            "APIVer": "apiVer",
                            "MsgId": "19905396",
//                            "ProxyApp": {
//                                "Ver": "ProxyApp_1.0.0",
//                                "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36"
//                            },
                            "SessionId": "sessionId"
                        });
                        req.SecToken = data.SecToken;
                        $.ajax({
                            url: "https://digital.yahav.co.il/BaNCSDigitalApp/account",
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                                xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(req)));
                            },
                            data: JSON.stringify(req),
                            method: "POST",
                            contentType: "application/json"
                        }).done(function (data) {
                            var rows = data.Payload.DataEntity;

                            function loadRowsAll(rows) {
                                if (rows == undefined) {
                                    loadRowsToday();
                                } else if (rows.length == 0) {
                                    loadRowsToday();
                                } else {
                                    $(rows).each(function (indx, val) {
                                        var dates = val.OrigDt;
                                        if (val.TotalCurAmt.Amt.Value.indexOf("-") == -1) {
                                            var transactionType = 1;
                                        } else {
                                            var transactionType = 0;
                                        }
                                        var dataRow = {
                                            "Asmachta": parseFloat(val.TxnId.TxnIds.TRANSACTIONID.replace(/\D/g, "")),
                                            "TransDesc": yahav.reverseText(val.Memo),
                                            "ValueDate": all.banks.core.services.convertDateAll(("0" + (dates.Month)).slice(-2) + '/' + ("0" + (dates.Day)).slice(-2) + '/' + dates.Year),
                                            "TransactionType": transactionType,
                                            "TransTotal": all.banks.core.services.parseSum(Math.abs(val.TotalCurAmt.Amt.Value)),
                                            "Balance": all.banks.core.services.parseSum(val.StmtRunningBal[0].CurrAmt.Amt.Value),
                                            "IsDaily": "0",
                                            "imgs": null
                                        };
                                        if (val.TxnType !== undefined) {
                                            if (val.TxnType.TypVal.CDE == "PAYMENT") {
                                                var transferData = val.Memo.split("/");
                                                if (val.Memo.indexOf("הרבעה") !== -1 && transferData.length > 2) {
                                                    dataRow.DepositeTransferData = [{
                                                        "DepositeTransferDate": dataRow.ValueDate,
                                                        "BankTransferNumber": null,
                                                        "BranchTransferNumber": parseFloat(transferData[2].split("-")[0]),
                                                        "AccountTransferNumber": parseFloat(transferData[2].split("-")[1]),
                                                        "NamePayerTransfer": yahav.reverseText(transferData[1], true),
                                                        "DetailsTransfer": transferData[0],
                                                        "TransferTotal": all.banks.core.services.parseSum(val.TotalCurAmt.Amt.Value)
                                                    }];
                                                } else if (val.Memo.indexOf("תרבעה") !== -1) {
                                                    var accDeRow = transferData[0].split("-");
                                                    var branchTransferNumber = null, accountTransferNumber = null;
                                                    if (accDeRow.length > 1) {
                                                        branchTransferNumber = parseFloat(accDeRow[0].replace(/\D/g, ""));
                                                        accountTransferNumber = parseFloat(accDeRow[1].replace(/\D/g, ""))
                                                    } else {
                                                        accountTransferNumber = accDeRow[0].replace(/\D/g, "")
                                                    }
                                                    dataRow.DepositeTransferData = [{
                                                        "DepositeTransferDate": dataRow.ValueDate,
                                                        "BankTransferNumber": null,
                                                        "BranchTransferNumber": branchTransferNumber,
                                                        "AccountTransferNumber": accountTransferNumber,
                                                        "NamePayerTransfer": null,
                                                        "DetailsTransfer": transferData[1],
                                                        "TransferTotal": all.banks.core.services.parseSum(val.TotalCurAmt.Amt.Value)
                                                    }];
                                                } else if (val.Memo.indexOf("יוכיז רזחה") !== -1 || val.Memo.indexOf("ןיגב יוכיז") !== -1 || val.Memo.indexOf("יוול-יוכיז") !== -1) {
                                                    dataRow.DepositeTransferData = [{
                                                        "DepositeTransferDate": dataRow.ValueDate,
                                                        "BankTransferNumber": parseFloat(transferData[1].split("-")[0].replace(/\D/g, "")),
                                                        "BranchTransferNumber": parseFloat(transferData[1].split("-")[1].replace(/\D/g, "")),
                                                        "AccountTransferNumber": parseFloat(transferData[1].split("-")[2].replace(/\D/g, "")),
                                                        "NamePayerTransfer": yahav.reverseText(transferData[4], true),
                                                        "DetailsTransfer": yahav.reverseText(transferData[2], true) + ' ' + yahav.reverseText(transferData[3], true),
                                                        "TransferTotal": all.banks.core.services.parseSum(val.TotalCurAmt.Amt.Value)
                                                    }];
                                                } else if (val.Memo.indexOf("משכורת") !== -1) {
                                                    dataRow.DepositeTransferData = [{
                                                        "DepositeTransferDate": dataRow.ValueDate,
                                                        "BankTransferNumber": "",
                                                        "BranchTransferNumber": "",
                                                        "AccountTransferNumber": "",
                                                        "NamePayerTransfer": yahav.reverseText(val.Memo),
                                                        "DetailsTransfer": "",
                                                        "TransferTotal": all.banks.core.services.parseSum(val.TotalCurAmt.Amt.Value)
                                                    }];
                                                } else if (transferData.length === 1 && val.Memo.indexOf("בהי קנב") !== -1
                                                    && /(\d{1,3})-(\d{1,3})-(\d{5,})/g.test(val.TxnId.Id.Id)) {
                                                    const bankBranchAcc = /(\d{1,3})-(\d{1,3})-(\d{5,})/g.exec(val.TxnId.Id.Id)
                                                        .slice(1);
                                                    dataRow.DepositeTransferData = [{
                                                        "DepositeTransferDate": dataRow.ValueDate,
                                                        "BankTransferNumber": parseFloat(bankBranchAcc[0].replace(/\D/g, "")),
                                                        "BranchTransferNumber": parseFloat(bankBranchAcc[1].replace(/\D/g, "")),
                                                        "AccountTransferNumber": parseFloat(bankBranchAcc[2].replace(/\D/g, "")),
                                                        "NamePayerTransfer": yahav.reverseText("בהי קנב"),
                                                        "DetailsTransfer": null,
                                                        "TransferTotal": all.banks.core.services.parseSum(val.TotalCurAmt.Amt.Value)
                                                    }];
                                                } else if (val.Memo.indexOf("יוכיז") !== -1) {
                                                    dataRow.DepositeTransferData = [{
                                                        "DepositeTransferDate": dataRow.ValueDate,
                                                        "BankTransferNumber": parseFloat(transferData[0].split("-")[0].replace(/\D/g, "")),
                                                        "BranchTransferNumber": parseFloat(transferData[0].split("-")[1].replace(/\D/g, "")),
                                                        "AccountTransferNumber": parseFloat(transferData[0].split("-")[2].replace(/\D/g, "")),
                                                        "NamePayerTransfer": yahav.reverseText(transferData[1], true),
                                                        "DetailsTransfer": yahav.reverseText(transferData[2], true),
                                                        "TransferTotal": all.banks.core.services.parseSum(val.TotalCurAmt.Amt.Value)
                                                    }];
                                                } else if (transferData[0].indexOf("-") !== -1) {
                                                    const cntrPrtData = transferData[0].split("-");
                                                    let bnkTn = null, brnchTn = null, accTn = null;
                                                    if (cntrPrtData.length > 2) {
                                                        bnkTn = parseFloat(cntrPrtData[0].replace(/\D/g, ""));
                                                        brnchTn = parseFloat(cntrPrtData[1].replace(/\D/g, ""));
                                                        accTn = parseFloat(cntrPrtData[2].replace(/\D/g, ""));
                                                    } else if (cntrPrtData.length <= 2
                                                        && (cntrPrtData[1].includes('סניף') || cntrPrtData[1].includes('ףינס'))) {
                                                        brnchTn = parseFloat(cntrPrtData[0].replace(/\D/g, ""));
                                                    }
                                                    dataRow.DepositeTransferData = [{
                                                        "DepositeTransferDate": dataRow.ValueDate,
                                                        "BankTransferNumber": bnkTn,
                                                        "BranchTransferNumber": brnchTn,
                                                        "AccountTransferNumber": accTn,
                                                        "NamePayerTransfer": yahav.reverseText(transferData[1], true),
                                                        "DetailsTransfer": transferData.slice(2).join(' '),
                                                        //transferData[2] + " " + transferData[3],
                                                        "TransferTotal": all.banks.core.services.parseSum(val.TotalCurAmt.Amt.Value)
                                                    }];
                                                }
                                            }

                                            if (all.banks.accountDetails.checks && val.TxnType.TypVal.CDE == "GROUPCHECKPAIDIN") {
                                                yahav.loadCheck(val.TxnId.TxnIds.TRANSACTIONID, idPor, dataRow.ValueDate)
                                                    .then(function (arrImg) {
                                                        dataRow.imgs = arrImg;
                                                        dataRow.Asmachta = arrImg[0].CheckNumber == undefined ? dataRow.Asmachta : arrImg[0].CheckNumber;
                                                        all.banks.generalVariables.allDataArr.BankData[0].Account[yahav.indAcc].DataRow.push(dataRow);
                                                        rows.splice(0, 1);
                                                        loadRowsAll(rows);
                                                    });
                                                return false;
                                            } else if (all.banks.accountDetails.checks && val.TxnType.TypVal.CDE == "CHECKPAIDIN") {
                                                yahav.loadCheck(val.TxnId.TxnIds.TRANSACTIONID, idPor, dataRow.ValueDate, true).then(function (arrImg) {
                                                    dataRow.imgs = arrImg;
                                                    dataRow.Asmachta = arrImg[0].CheckNumber == undefined ? dataRow.Asmachta : arrImg[0].CheckNumber;
                                                    all.banks.generalVariables.allDataArr.BankData[0].Account[yahav.indAcc].DataRow.push(dataRow);
                                                    rows.splice(0, 1);
                                                    loadRowsAll(rows);
                                                });
                                                return false;
                                            } else {
                                                all.banks.generalVariables.allDataArr.BankData[0].Account[yahav.indAcc].DataRow.push(dataRow);
                                                rows.splice(0, 1);
                                            }
                                        } else {
                                            all.banks.generalVariables.allDataArr.BankData[0].Account[yahav.indAcc].DataRow.push(dataRow);
                                            rows.splice(0, 1);
                                        }
                                        if (rows.length == 0) {
                                            loadRowsToday();
                                        }
                                    })
                                }
                            }

                            loadRowsAll(rows);

                            function loadRowsToday() {
                                var reqToday = yahav.prepareRequestUsing({
                                    "Ver": "MessageEnvelope_1.0.0",
//                                    "Device": {
//                                        "Ver": "Device_1.0.0",
//                                        "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                                        "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                                        "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                                    },
//                                    "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                                    "Payload": {
                                        "Ver": "MessagePayload_1.0.0",
                                        "DataEntity": [{
                                            "Ver": "AccountHold_1.0.0",
                                            "isArchetype": true,
                                            "ActHldActRef": {
                                                "Ver": "AccountReference_1.0.0",
                                                "AcctKeys": {
                                                    "Ver": "AccountKeys_1.0.0",
                                                    "AcctId": {
                                                        "Ver": "AccountIdentifier_1.0.0",
                                                        "AcctIds": {"BANKACCOUNTID": ""},
                                                        "Id": {"Ver": "Identifier_1.0.0", "Id": id},
                                                        "iorId": iorId
                                                    }
                                                }
                                            }
                                        }],
                                        "Operation": "INQ",
                                        "Category": ["min"],
                                        "Filters": [{
                                            "Ver": "ANDFilter_1.0.0",
                                            "Filters": [{
                                                "Ver": "TransactionListFilter_1.0.0",
                                                "PostedDt": {
                                                    "Ver": "Date_1.0.0",
                                                    "Day": all.banks.accountDetails.dateFrom.getDate(),
                                                    "Month": (all.banks.accountDetails.dateFrom.getMonth() + 1),
                                                    "Year": all.banks.accountDetails.dateFrom.getFullYear()
                                                },
                                                "Operator": "GREATERTHANOREQUAL"
                                            }, {
                                                "Ver": "TransactionListFilter_1.0.0",
                                                "PostedDt": {
                                                    "Ver": "Date_1.0.0",
                                                    "Day": all.banks.accountDetails.dateTo.getDate(),
                                                    "Month": (all.banks.accountDetails.dateTo.getMonth() + 1),
                                                    "Year": all.banks.accountDetails.dateTo.getFullYear()
                                                },
                                                "Operator": "LESSTHANOREQUAL"
                                            }]
                                        }],
                                        "RefDataList": [{
                                            "Ver": "ReferenceData_1.0.0",
                                            "Id": idPor,
                                            "Type": {
                                                "CDE": "PORTFOLIOIDENTIFIERIORID",
                                                "DISP": "PortfolioIdentifierIORID"
                                            }
                                        }]
                                    },
                                    "UIID": {"Ver": "UIIDomain_1.0.0"},
                                    "Resource": "resrc",
//                                    "AppVer": "1.0.0",
//                                    "EnvVer": "MessageEnvelope_1.0.0",
//                                    "APIVer": "apiVer",
                                    "MsgId": "10909083",
//                                    "ProxyApp": {
//                                        "Ver": "ProxyApp_1.0.0",
//                                        "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
//                                    },
                                    "SessionId": "sessionId"
                                });
                                reqToday.SecToken = data.SecToken;
                                $.ajax({
                                    url: "https://digital.yahav.co.il/BaNCSDigitalApp/account",
                                    beforeSend: function (xhr) {
                                        xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                                        xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqToday)));
                                    },
                                    data: JSON.stringify(reqToday),
                                    method: "POST",
                                    contentType: "application/json"
                                }).done(function (data) {
                                    var rows = data.Payload.DataEntity;
                                    if (rows !== undefined) {
                                        $(rows).each(function (indx, val) {
                                            var dates = val.ActHldEfftDt;
                                            if (val.ActHldAmt.Amt.Value.indexOf("-") == -1) {
                                                var transactionType = 1;
                                            } else {
                                                var transactionType = 0;
                                            }
                                            var dataRow = {
                                                "Asmachta": parseFloat(val.ActHldIdent.replace(/\D/g, "")),
                                                "TransDesc": yahav.reverseText(val.ActHldMemo),
                                                "ValueDate": all.banks.core.services.convertDateAll(("0" + (dates.Month)).slice(-2) + '/' + ("0" + (dates.Day)).slice(-2) + '/' + dates.Year),
                                                "TransactionType": transactionType,
                                                "TransTotal": all.banks.core.services.parseSum(Math.abs(val.ActHldAmt.Amt.Value)),
                                                "Balance": null,
                                                "IsDaily": "1",
                                                "imgs": null
                                            };
                                            all.banks.generalVariables.allDataArr.BankData[0].Account[yahav.indAcc].DataRow.push(dataRow);
                                            if (indx + 1 == rows.length) {
                                                if (yahav.indAcc + 1 == yahav.acc.length) {
                                                    yahav.sendOshCtrl();
                                                } else {
                                                    yahav.indAcc += 1;
                                                    yahav.loadOsh();
                                                }
                                            }
                                        })
                                    } else {
                                        if (yahav.indAcc + 1 == yahav.acc.length) {
                                            yahav.sendOshCtrl();
                                        } else {
                                            yahav.indAcc += 1;
                                            yahav.loadOsh();
                                        }
                                    }
                                })
                            }
                        })
                    })
                });
                return false;
            }
        })
    };
    yahav.loadCheck = function (id, idPor, dates, CHECKPAIDIN) {
        var dfd = jQuery.Deferred();
        if (CHECKPAIDIN) {
            var reqCheck = yahav.prepareRequestUsing({
                "Ver": "MessageEnvelope_1.0.0",
//                "Device": {
//                    "Ver": "Device_1.0.0",
//                    "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                    "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                    "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                },
//                "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                "Payload": {
                    "Ver": "MessagePayload_1.0.0",
                    "DataEntity": [{
                        "Ver": "TransactionImage_1.0.0",
                        "isArchetype": true,
                        "AcctTransRef": {
                            "Ver": "Transaction_1.0.0",
                            "isArchetype": true,
                            "TxnId": {
                                "Ver": "TransactionIdentifier_1.0.0",
                                "isArchetype": true,
                                "Id": {"Ver": "Identifier_1.0.0", "Id": id},
                            }
                        }
                    }],
                    "Operation": "INQ",
                    "RefDataList": [{
                        "Ver": "ReferenceData_1.0.0",
                        "Id": idPor,
                        "Type": {"CDE": "PORTFOLIOIDENTIFIERIORID", "DISP": "PortfolioIdentifierIORID"}
                    }]
                },
                "UIID": {"Ver": "UIIDomain_1.0.0"},
                "Resource": "resrc",
//                "AppVer": "1.0.0",
//                "EnvVer": "MessageEnvelope_1.0.0",
//                "APIVer": "apiVer",
//                "MsgId": "49684156",
//                "ProxyApp": {
//                    "Ver": "ProxyApp_1.0.0",
//                    "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
//                },
                "SessionId": "sessionId"
            });
        } else {
            var reqCheck = yahav.prepareRequestUsing({
                "Ver": "MessageEnvelope_1.0.0",
//                "Device": {
//                    "Ver": "Device_1.0.0",
//                    "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                    "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                    "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                },
//                "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                "Payload": {
                    "Ver": "MessagePayload_1.0.0",
                    "DataEntity": [{
                        "Ver": "CheckCredit_1.0.0.BY.1.0",
                        "Id": {"Ver": "Identifier_1.0.0", "Id": id},
                        "RefData": {
                            "Ver": "ReferenceData_1.0.0",
                            "Id": idPor,
                            "Type": {"CDE": "PORTFOLIOIDENTIFIERIORID", "DISP": "PortfolioIdentifierIORID"}
                        }
                    }],
                    "Operation": "INQ",
                    "RefDataList": [{
                        "Ver": "ReferenceData_1.0.0",
                        "Id": idPor,
                        "Type": {"CDE": "PORTFOLIOIDENTIFIERIORID", "DISP": "PortfolioIdentifierIORID"}
                    }]
                },
                "UIID": {"Ver": "UIIDomain_1.0.0"},
                "Resource": "resrc",
//                "AppVer": "1.0.0",
//                "EnvVer": "MessageEnvelope_1.0.0",
//                "APIVer": "apiVer",
                "MsgId": "73373087",
//                "ProxyApp": {
//                    "Ver": "ProxyApp_1.0.0",
//                    "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
//                },
                "SessionId": "sessionId"
            });
        }
        reqCheck.SecToken = yahav.SecToken;
        $.ajax({
            url: "https://digital.yahav.co.il/BaNCSDigitalApp/check",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqCheck)));
            },
            data: JSON.stringify(reqCheck),
            method: "POST",
            contentType: "application/json"
        }).done(function (data) {
            if (CHECKPAIDIN) {
                var arrList = [];
                $(data.Payload.DataEntity).each(function (i, v) {
                    try {
                        var content = v.TransImg.Front.BinDataStr;
                        if (content !== "") {
                            var formData = new FormData();
                            var uuid = parseInt(v.AcctTransRef.TxnRef.CntrPrtyDta.AcctRfrnc.AcctKeys.Bank.Identifier.Id.Id) + '' + parseInt(v.AcctTransRef.TxnRef.CntrPrtyDta.AcctRfrnc.AcctKeys.Branch.FiLocatnId.Id) + '' + parseInt(v.AcctTransRef.TxnRef.CntrPrtyDta.AcctRfrnc.AcctKeys.AcctId.Id.Id) + '' + parseInt(v.ChekNumberList[0]) + '' + parseInt(dates.replace(/\//g, "")) + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[yahav.indAcc].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[yahav.indAcc].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[yahav.indAcc].AccountNumber;
                            var blob = new Blob([content], {
                                type: "text/plain"
                            });
                            formData.append(uuid, blob);
                            yahav.sendChecksCtrl({
                                formData: formData,
                                params: {
                                    imagenamekey: uuid,
                                    bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[yahav.indAcc].BankNumber,
                                    snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[yahav.indAcc].BranchNumber,
                                    accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[yahav.indAcc].AccountNumber
                                }
                            });
                            arrList.push({
                                "Asmachta": parseInt(v.ChekNumberList[0]),
                                "CheckAccountNumber": parseInt(v.AcctTransRef.TxnRef.CntrPrtyDta.AcctRfrnc.AcctKeys.AcctId.Id.Id),
                                "DepositeDate": dates,
                                "CheckBankNumber": parseInt(v.AcctTransRef.TxnRef.CntrPrtyDta.AcctRfrnc.AcctKeys.Bank.Identifier.Id.Id),
                                "CheckBranchNumber": parseInt(v.AcctTransRef.TxnRef.CntrPrtyDta.AcctRfrnc.AcctKeys.Branch.FiLocatnId.Id),
                                "CheckNumber": parseInt(v.ChekNumberList[0]),
                                "CheckTotal": all.banks.core.services.parseSum(Math.abs(v.Amount.Amt.Value)),
                                "ImageNameKey": uuid
                            })
                        } else {
                            arrList.push({
                                "ImageNameKey": "x"
                            });
                        }
                        if (data.Payload.DataEntity.length == i + 1) {
                            dfd.resolve(arrList);
                        }
                    } catch (e) {
//                                            console.error(e);
                        arrList.push({
                            "ImageNameKey": "x"
                        });

                        if (data.Payload.DataEntity.length == i + 1) {
                            dfd.resolve(arrList);
                        }
                    }
                })
            } else {
                var arrList = [];
                var index = 0;
                $(data.Payload.DataEntity).each(function (i, v) {
                    if (index == i) {
                        index++;
                        var ids = data.Payload.DataEntity[i].Id.Id;
                        var reqCheckLast = yahav.prepareRequestUsing({
                            "Ver": "MessageEnvelope_1.0.0",
//                            "Device": {
//                                "Ver": "Device_1.0.0",
//                                "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                                "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                                "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                            },
//                            "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                            "Payload": {
                                "Ver": "MessagePayload_1.0.0",
                                "DataEntity": [{
                                    "Ver": "TransactionImage_1.0.0",
                                    "isArchetype": true,
                                    "AcctTransRef": {
                                        "Ver": "Transaction_1.0.0",
                                        "isArchetype": true,
                                        "TxnId": {
                                            "Ver": "TransactionIdentifier_1.0.0",
                                            "isArchetype": true,
                                            "Id": {"Ver": "Identifier_1.0.0", "Id": ids}
                                        }
                                    }
                                }],
                                "Operation": "INQ",
                                "RefDataList": [{
                                    "Ver": "ReferenceData_1.0.0",
                                    "Id": idPor,
                                    "Type": {"CDE": "PORTFOLIOIDENTIFIERIORID", "DISP": "PortfolioIdentifierIORID"}
                                }]
                            },
                            "UIID": {"Ver": "UIIDomain_1.0.0"},
                            "Resource": "resrc",
//                            "AppVer": "1.0.0",
//                            "EnvVer": "MessageEnvelope_1.0.0",
//                            "APIVer": "apiVer",
                            "MsgId": "73373088",
//                            "ProxyApp": {
//                                "Ver": "ProxyApp_1.0.0",
//                                "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
//                            },
                            "SessionId": "sessionId"
                        });
                        reqCheckLast.SecToken = yahav.SecToken;
                        $.ajax({
                            url: "https://digital.yahav.co.il/BaNCSDigitalApp/check",
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                                xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqCheckLast)));
                            },
                            data: JSON.stringify(reqCheckLast),
                            method: "POST",
                            contentType: "application/json"
                        })
                            .done(function (data) {
                                try {
                                    var content = data.Payload.DataEntity[0].TransImg.Front.BinDataStr;
                                    if (content !== "") {
                                        var formData = new FormData();
                                        var uuid = parseInt(data.Payload.DataEntity[0].AcctTransRef.TxnRef.CntrPrtyDta.AcctRfrnc.AcctKeys.AcctId.Id.Id) + '' + parseInt(data.Payload.DataEntity[0].AcctTransRef.TxnRef.CntrPrtyDta.AcctRfrnc.AcctKeys.Branch.FiLocatnId.Id) + '' + parseInt(data.Payload.DataEntity[0].AcctTransRef.TxnRef.CntrPrtyDta.AcctRfrnc.AcctKeys.AcctId.Id.Id) + '' + parseInt(data.Payload.DataEntity[0].ChekNumberList[0]) + '' + parseInt(dates.replace(/\//g, "")) + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[yahav.indAcc].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[yahav.indAcc].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[yahav.indAcc].AccountNumber;
                                        var blob = new Blob([content], {
                                            type: "text/plain"
                                        });
                                        formData.append(uuid, blob);
                                        yahav.sendChecksCtrl({
                                            formData: formData,
                                            params: {
                                                imagenamekey: uuid,
                                                bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[yahav.indAcc].BankNumber,
                                                snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[yahav.indAcc].BranchNumber,
                                                accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[yahav.indAcc].AccountNumber
                                            }
                                        });
                                        arrList.push({
                                            "Asmachta": parseInt(data.Payload.DataEntity[0].ChekNumberList[0]),
                                            "CheckAccountNumber": parseInt(data.Payload.DataEntity[0].AcctTransRef.TxnRef.CntrPrtyDta.AcctRfrnc.AcctKeys.AcctId.Id.Id),
                                            "DepositeDate": dates,
                                            "CheckBankNumber": parseInt(data.Payload.DataEntity[0].AcctTransRef.TxnRef.CntrPrtyDta.AcctRfrnc.AcctKeys.Bank.Identifier.Id.Id),
                                            "CheckBranchNumber": parseInt(data.Payload.DataEntity[0].AcctTransRef.TxnRef.CntrPrtyDta.AcctRfrnc.AcctKeys.Branch.FiLocatnId.Id),
                                            "CheckNumber": parseInt(data.Payload.DataEntity[0].ChekNumberList[0]),
                                            "CheckTotal": all.banks.core.services.parseSum(Math.abs(data.Payload.DataEntity[0].Amount.Amt.Value)),
                                            "ImageNameKey": uuid
                                        });
                                    } else {
                                        arrList.push({
                                            "ImageNameKey": "x"
                                        })
                                    }
                                    if (data.Payload.DataEntity.length == i + 1) {
                                        dfd.resolve(arrList);
                                    }
                                } catch (e) {
                                    arrList.push({
                                        "ImageNameKey": "x"
                                    })

                                    if (data.Payload.DataEntity.length == i + 1) {
                                        dfd.resolve(arrList);
                                    }
                                }

                            })
                    }

                })


            }
        });
        return dfd.promise();
    }
    yahav.sendOshCtrl = function (matah) {
        if (!matah) {
            var arr = all.banks.generalVariables.allDataArr;
        } else {
            var arr = all.banks.generalVariables.allDataArrMatah;
        }
        all.banks.core.services.sendOsh(arr, matah)
            .then(function (arr) {
                yahav.indAcc = 0;
                if (!matah) {
                    myEmitterLogs(29);
                    if (all.banks.accountDetails.ccardMonth > 0) {
                        myEmitterLogs(14);
                        yahav.loadAshrai();
                    } else if (all.banks.accountDetails.IND_NILVIM > 0) {
                        myEmitterLogs(21);
                        yahav.loadDepositsAndLoans();
                    } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                        myEmitterLogs(34);
                        yahav.loadMatah();
                    } else {
                        yahav.logOut();
                    }
                } else {
                    yahav.logOut();
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    yahav.sendOshCtrl(matah)
                }
            })
    }
    yahav.sendChecksCtrl = function (formData) {
        all.banks.core.services.sendChecks(formData)
            .then(function (arr) {
                all.banks.generalVariables.numChecksDrawn = all.banks.generalVariables.numChecksDrawn + 1;
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    yahav.sendChecksCtrl(formData)
                }
            })
    }
    yahav.loadAshrai = function () {
        $(yahav.acc).each(function (i, v) {
            if (i == yahav.indAcc) {
                var acc = {
                    "BankNumber": parseFloat(all.banks.accountDetails.bank.BankNumber),
                    'AccountNumber': parseFloat(v.Prtflio.Id.Id.split(new RegExp(v.Prtflio.Brnch.FiLocatnId.Id + '(\\d+)', 'g'))[1].toString()),
                    'BranchNumber': parseFloat(v.Prtflio.Brnch.FiLocatnId.Id.toString())
                };
                var id = v.Prtflio.Id;
                var req = yahav.prepareRequestUsing({
                    "Ver": "MessageEnvelope_1.0.0",
//                    "Device": {
//                        "Ver": "Device_1.0.0",
//                        "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                        "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                        "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                    },
//                    "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                    "Payload": {
                        "Ver": "MessagePayload_1.0.0",
                        "DataEntity": [{
                            "Ver": "PortfolioCardRelationship_1.0.0",
                            "isArchetype": true,
                            "Id": {"Ver": "CardIdentifier_1.0.0", "isArchetype": true},
                            "Prtflio": {
                                "Ver": "Portfolio_1.0.0",
                                "isArchetype": true,
                                "Id": {
                                    "Ver": "PortfolioIdentifier_1.0.0",
                                    "PortFoId": {"INTERNALIDENTIFIER": ""},
                                    "iorId": id.iorId,
                                    "Id": id.Id
                                }
                            }
                        }],
                        "Operation": "INQ",
                        "Category": ["min"],
                        "RefDataList": [{
                            "Ver": "ReferenceData_1.0.0",
                            "Id": id.iorId,
                            "Type": {"CDE": "PORTFOLIOIDENTIFIERIORID", "DISP": "PortfolioIdentifierIORID"}
                        }]
                    },
                    "UIID": {"Ver": "UIIDomain_1.0.0"},
                    "Resource": "resrc",
//                    "AppVer": "1.0.0",
//                    "EnvVer": "MessageEnvelope_1.0.0",
//                    "APIVer": "apiVer",
                    "MsgId": "42649177",
//                    "ProxyApp": {
//                        "Ver": "ProxyApp_1.0.0",
//                        "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
//                    },
                    "SessionId": "sessionId"
                });

                var idPor = id.iorId;
                req.SecToken = yahav.SecToken;
                $.ajax({
                    url: "https://digital.yahav.co.il/BaNCSDigitalApp/card",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                        xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(req)));
                    },
                    data: JSON.stringify(req),
                    method: "POST",
                    contentType: "application/json"
                }).done(function (data) {
                    var cardsAll = data.Payload.DataEntity;

                    function loadCardData() {
                        $(cardsAll).each(function (ind, vals) {
                            var reqCard = yahav.prepareRequestUsing({
                                "Ver": "MessageEnvelope_1.0.0",
//                                "Device": {
//                                    "Ver": "Device_1.0.0",
//                                    "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                                    "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                                    "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                                },
//                                "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                                "Payload": {
                                    "Ver": "MessagePayload_1.0.0",
                                    "DataEntity": [{
                                        "Ver": "CardAccountRelationship_1.0.0",
                                        "Card": {
                                            "Ver": "CreditCard_1.0.0",
                                            "CardId": {
                                                "Ver": "CardIdentifier_1.0.0",
                                                "iorId": vals.Card.CardId.iorId,
                                                "Id": vals.Card.CardId.Id
                                            },
                                            "IssuerName": vals.Card.IssuerName
                                        },
                                        "Account": {
                                            "Ver": "CreditCardAccount_1.0.0",
                                            "AccountId": {
                                                "Ver": "AccountIdentifier_1.0.0",
                                                "isArchetype": true,
                                                "Id": {"Ver": "Identifier_1.0.0", "isArchetype": true}
                                            },
                                            "Type": {
                                                "CDE": "CREDITCARDACCOUNT",
                                                "DISP": "Credit Card Account. An account linked to a pre-approved Line of Credit where a person with satisfactory credit rating makes retail purchases or obtains cash advances using a payment card. This is a credit type account."
                                            }
                                        }
                                    }],
                                    "Operation": "INQ",
                                    "Category": ["Unbilled"],
                                    "RefDataList": [{
                                        "Ver": "ReferenceData_1.0.0",
                                        "Id": idPor,
                                        "Type": {"CDE": "PORTFOLIOIDENTIFIERIORID", "DISP": "PortfolioIdentifierIORID"}
                                    }]
                                },
                                "UIID": {"Ver": "UIIDomain_1.0.0"},
                                "Resource": "resrc",
//                                "AppVer": "1.0.0",
//                                "EnvVer": "MessageEnvelope_1.0.0",
//                                "APIVer": "apiVer",
                                "MsgId": "66886760",
//                                "ProxyApp": {
//                                    "Ver": "ProxyApp_1.0.0",
//                                    "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36"
//                                },
                                "SessionId": "sessionId"
                            });
                            reqCard.SecToken = yahav.SecToken;
                            $.ajax({
                                url: "https://digital.yahav.co.il/BaNCSDigitalApp/card",
                                beforeSend: function (xhr) {
                                    xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                                    xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqCard)));
                                },
                                data: JSON.stringify(reqCard),
                                method: "POST",
                                contentType: "application/json"
                            }).done(function (data) {
                                var nextBillingDate = data.Payload.DataEntity[0].Account.NextStmtDt;
                                if (data.Payload.DataEntity[0].Account.BalanceList !== undefined && nextBillingDate !== undefined) {
                                    if (data.Payload.DataEntity[0].Account.BalanceList[1] !== undefined) {
                                        var nextCycleTotal = all.banks.core.services.parseSum(data.Payload.DataEntity[0].Account.BalanceList[1].CurrAmt.Amt.Value);
                                    } else {
                                        var nextCycleTotal = all.banks.core.services.parseSum(data.Payload.DataEntity[0].Account.BalanceList[0].CurrAmt.Amt.Value);
                                    }
                                    var idCardId = data.Payload.DataEntity[0].Card.CardId.Id;
                                    var iorIdCardId = data.Payload.DataEntity[0].Card.CardId.iorId;
                                    var reqCardRows = yahav.prepareRequestUsing({
                                        "Ver": "MessageEnvelope_1.0.0",
//                                        "Device": {
//                                            "Ver": "Device_1.0.0",
//                                            "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                                            "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                                            "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                                        },
//                                        "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                                        "Payload": {
                                            "Ver": "MessagePayload_1.0.0",
                                            "DataEntity": [{
                                                "Ver": "CardTransaction_1.0.0",
                                                "isArchetype": true,
                                                "Id": {
                                                    "Ver": "CardIdentifier_1.0.0",
                                                    "iorId": iorIdCardId,
                                                    "Id": idCardId
                                                }
                                            }],
                                            "Operation": "INQ",
                                            "Category": ["min"],
                                            "Filters": [{
                                                "Ver": "ANDFilter_1.0.0",
                                                "Filters": [{
                                                    "Ver": "TransactionListFilter_1.0.0",
                                                    "IssuerName": data.Payload.DataEntity[0].Card.IssuerName
                                                }]
                                            }],
                                            "RefDataList": [{
                                                "Ver": "ReferenceData_1.0.0",
                                                "Id": idPor,
                                                "Type": {
                                                    "CDE": "PORTFOLIOIDENTIFIERIORID",
                                                    "DISP": "PortfolioIdentifierIORID"
                                                }
                                            }]
                                        },
                                        "UIID": {"Ver": "UIIDomain_1.0.0"},
                                        "Resource": "resrc",
//                                        "AppVer": "1.0.0",
//                                        "EnvVer": "MessageEnvelope_1.0.0",
//                                        "APIVer": "apiVer",
                                        "MsgId": "66886763",
//                                        "ProxyApp": {
//                                            "Ver": "ProxyApp_1.0.0",
//                                            "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36"
//                                        },
                                        "SessionId": "sessionId"
                                    });
                                    reqCardRows.SecToken = yahav.SecToken;
                                    $.ajax({
                                        url: "https://digital.yahav.co.il/BaNCSDigitalApp/card",
                                        beforeSend: function (xhr) {
                                            xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                                            xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqCardRows)));
                                        },
                                        data: JSON.stringify(reqCardRows),
                                        method: "POST",
                                        contentType: "application/json"
                                    }).done(function (data) {
                                        var resCardsRows = data.Payload.DataEntity;
                                        $(resCardsRows).each(function (indx, val) {
                                            if (val.Memo !== undefined) {
                                                var comment = "", currentPaymentNum = null, totalPayments = null;
                                                if (val.TxnId !== undefined) {
                                                    comment += val.TxnId.TxnIds.TRANSACTIONID;
                                                }
                                                if (val.TxnRef.RefData.Desc !== undefined) {
                                                    const pymntsAlternateRegex = /(\d{1,3})\s*\/\s*(\d{1,3})/g;
                                                    let pymntsAlternateVals;
                                                    comment += " " + val.TxnRef.RefData.Desc;
                                                    if (comment.indexOf("מתוך") !== -1) {
                                                        var sumOfPays = comment.split("מתוך");
                                                        currentPaymentNum = sumOfPays[0].replace(/\D/g, "");
                                                        totalPayments = sumOfPays[1].replace(/\D/g, "");
                                                    } else if ((pymntsAlternateVals = pymntsAlternateRegex.exec(val.TxnRef.RefData.Desc)) !== null) {
                                                        currentPaymentNum = pymntsAlternateVals[1];
                                                        totalPayments = pymntsAlternateVals[2];
                                                    }
                                                }
                                                var dates = val.OrigDt;
                                                all.banks.generalVariables.allDataArrAshrai.push({
                                                    "BankNumber": acc.BankNumber,
                                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                                    "Token": all.banks.accountDetails.bank.token,
                                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                                    "BranchNumber": acc.BranchNumber,
                                                    "AccountNumber": acc.AccountNumber,
                                                    "CardNumber": vals.Card.CardNum,
                                                    "NextBillingDate": all.banks.core.services.convertDateAll(("0" + (nextBillingDate.Month)).slice(-2) + '/' + ("0" + (nextBillingDate.Day)).slice(-2) + '/' + nextBillingDate.Year),
                                                    "NextCycleTotal": nextCycleTotal,
                                                    "CardStatus": null,
                                                    "TransDesc": val.Memo,
                                                    "TransTotal": all.banks.core.services.parseSum(val.TotalCurAmt.Amt.Value),
                                                    "ValueDate": all.banks.core.services.convertDateAll(("0" + (dates.Month)).slice(-2) + '/' + ("0" + (dates.Day)).slice(-2) + '/' + dates.Year),
                                                    "TransCategory": null,
                                                    "TotalPayments": totalPayments,
                                                    "CurrentPaymentNum": currentPaymentNum,
                                                    "CardType": all.banks.core.services.getTypeCard(vals.Card.Brand ? vals.Card.Brand.DISP : ''),
//                                                    "CardType": vals.Card.Brand !== undefined ? all.banks.core.services.getTypeCard(vals.Card.Brand.DISP) : null,
                                                    "indFakeDate": 0,
                                                    "original_total": all.banks.core.services.parseSum(val.CompositeCurAmtList[0].Amount.Amt.Value),
//													"original_total": all.banks.core.services.parseSum(val.TotalCurAmt.Amt.Value),
                                                    "currency_id": all.banks.core.services.getTypeCurrencyAll(val.TotalCurAmt.CurrCode.SYM),
                                                    "ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(val.TotalCurAmt.CurrCode.SYM),
                                                    "comment": comment
                                                })
                                            }
                                        });
                                        cardsAll.splice(0, 1);
                                        if (cardsAll.length == 0) {
                                            if (yahav.indAcc + 1 == yahav.acc.length) {
                                                yahav.indAcc = 0;
                                                yahav.loadAshraiPrev();
                                            } else {
                                                yahav.indAcc += 1;
                                                yahav.loadAshrai();
                                            }
                                        } else {
                                            loadCardData();
                                        }
                                    })
                                } else {
                                    cardsAll.splice(0, 1);
                                    if (cardsAll.length == 0) {
                                        if (yahav.indAcc + 1 == yahav.acc.length) {
                                            yahav.indAcc = 0;
                                            yahav.loadAshraiPrev();
                                        } else {
                                            yahav.indAcc += 1;
                                            yahav.loadAshrai();
                                        }
                                    } else {
                                        loadCardData();
                                    }
                                }
                            });
                            return false;
                        });
                    }

                    if (cardsAll !== undefined) {
                        loadCardData();
                    } else {
                        if (yahav.indAcc + 1 == yahav.acc.length) {
                            yahav.indAcc = 0;
                            yahav.loadAshraiPrev();
                        } else {
                            yahav.indAcc += 1;
                            yahav.loadAshrai();
                        }
                    }
                });
                return false;
            }
        })
    };
    yahav.loadAshraiPrev = function () {
        $(yahav.acc).each(function (i, v) {
            if (i == yahav.indAcc) {
                var acc = {
                    "BankNumber": parseFloat(all.banks.accountDetails.bank.BankNumber),
                    'AccountNumber': parseFloat(v.Prtflio.Id.Id.split(new RegExp(v.Prtflio.Brnch.FiLocatnId.Id + '(\\d+)', 'g'))[1].toString()),
                    'BranchNumber': parseFloat(v.Prtflio.Brnch.FiLocatnId.Id.toString())
                }
                var id = v.Prtflio.Id;
                var req = yahav.prepareRequestUsing({
                    "Ver": "MessageEnvelope_1.0.0",
//                    "Device": {
//                        "Ver": "Device_1.0.0",
//                        "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                        "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                        "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                    },
//                    "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                    "Payload": {
                        "Ver": "MessagePayload_1.0.0",
                        "DataEntity": [{
                            "Ver": "PortfolioCardRelationship_1.0.0",
                            "isArchetype": true,
                            "Id": {"Ver": "CardIdentifier_1.0.0", "isArchetype": true},
                            "Prtflio": {
                                "Ver": "Portfolio_1.0.0",
                                "isArchetype": true,
                                "Id": {
                                    "Ver": "PortfolioIdentifier_1.0.0",
                                    "PortFoId": {"INTERNALIDENTIFIER": ""},
                                    "iorId": id.iorId,
                                    "Id": id.Id
                                }
                            }
                        }],
                        "Operation": "INQ",
                        "Category": ["min"],
                        "RefDataList": [{
                            "Ver": "ReferenceData_1.0.0",
                            "Id": id.iorId,
                            "Type": {"CDE": "PORTFOLIOIDENTIFIERIORID", "DISP": "PortfolioIdentifierIORID"}
                        }]
                    },
                    "UIID": {"Ver": "UIIDomain_1.0.0"},
                    "Resource": "resrc",
//                    "AppVer": "1.0.0",
//                    "EnvVer": "MessageEnvelope_1.0.0",
//                    "APIVer": "apiVer",
                    "MsgId": "72450009",
//                    "ProxyApp": {
//                        "Ver": "ProxyApp_1.0.0",
//                        "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36"
//                    },
                    "SessionId": "sessionId"
                });
                var idPor = id.iorId;
                req.SecToken = yahav.SecToken;
                $.ajax({
                    url: "https://digital.yahav.co.il/BaNCSDigitalApp/card",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                        xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(req)));
                    },
                    data: JSON.stringify(req),
                    method: "POST",
                    contentType: "application/json"
                }).done(function (data) {
                    var cardsAll = data.Payload.DataEntity;

                    function loadCardData() {
                        $(cardsAll).each(function (ind, vals) {
                            var reqCard = yahav.prepareRequestUsing({
                                "Ver": "MessageEnvelope_1.0.0",
//                                "Device": {
//                                    "Ver": "Device_1.0.0",
//                                    "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                                    "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                                    "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                                },
//                                "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                                "Payload": {
                                    "Ver": "MessagePayload_1.0.0",
                                    "DataEntity": [{
                                        "Ver": "CardAccountRelationship_1.0.0",
                                        "Card": {
                                            "Ver": "CreditCard_1.0.0",
                                            "CardId": {
                                                "Ver": "CardIdentifier_1.0.0",
                                                "iorId": vals.Card.CardId.iorId,
                                                "Id": vals.Card.CardId.Id
                                            },
                                            "IssuerName": vals.Card.IssuerName
                                        },
                                        "Account": {
                                            "Ver": "CreditCardAccount_1.0.0",
                                            "AccountId": {
                                                "Ver": "AccountIdentifier_1.0.0",
                                                "isArchetype": true,
                                                "Id": {"Ver": "Identifier_1.0.0", "isArchetype": true}
                                            },
                                            "Type": {
                                                "CDE": "CREDITCARDACCOUNT",
                                                "DISP": "Credit Card Account. An account linked to a pre-approved Line of Credit where a person with satisfactory credit rating makes retail purchases or obtains cash advances using a payment card. This is a credit type account."
                                            }
                                        }
                                    }],
                                    "Operation": "INQ",
                                    "Category": ["Billed"],
                                    "RefDataList": [{
                                        "Ver": "ReferenceData_1.0.0",
                                        "Id": idPor,
                                        "Type": {"CDE": "PORTFOLIOIDENTIFIERIORID", "DISP": "PortfolioIdentifierIORID"}
                                    }]
                                },
                                "UIID": {"Ver": "UIIDomain_1.0.0"},
                                "Resource": "resrc",
//                                "AppVer": "1.0.0",
//                                "EnvVer": "MessageEnvelope_1.0.0",
//                                "APIVer": "apiVer",
                                "MsgId": "72450010",
//                                "ProxyApp": {
//                                    "Ver": "ProxyApp_1.0.0",
//                                    "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36"
//                                },
                                "SessionId": "sessionId"
                            });
                            reqCard.SecToken = yahav.SecToken;
                            $.ajax({
                                url: "https://digital.yahav.co.il/BaNCSDigitalApp/card",
                                beforeSend: function (xhr) {
                                    xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                                    xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqCard)));
                                },
                                data: JSON.stringify(reqCard),
                                method: "POST",
                                contentType: "application/json"
                            }).done(function (data) {
                                var nextBillingDate = data.Payload.DataEntity[0].Account.LstPymntDt;
                                if (data.Payload.DataEntity[0].Account.BalanceList !== undefined && nextBillingDate !== undefined) {
                                    if (data.Payload.DataEntity[0].Account.BalanceList[1] !== undefined) {
                                        var nextCycleTotal = all.banks.core.services.parseSum(data.Payload.DataEntity[0].Account.BalanceList[1].CurrAmt.Amt.Value);
                                    } else {
                                        var nextCycleTotal = all.banks.core.services.parseSum(data.Payload.DataEntity[0].Account.BalanceList[0].CurrAmt.Amt.Value);
                                    }
                                    var idCardId = data.Payload.DataEntity[0].Card.CardId.Id;
                                    var iorIdCardId = data.Payload.DataEntity[0].Card.CardId.iorId;
                                    var billingDt = data.Payload.DataEntity[0].Account.LstPymntDt;
                                    var reqCardRows = yahav.prepareRequestUsing({
                                        "Ver": "MessageEnvelope_1.0.0",
//                                        "Device": {
//                                            "Ver": "Device_1.0.0",
//                                            "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                                            "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                                            "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                                        },
//                                        "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                                        "Payload": {
                                            "Ver": "MessagePayload_1.0.0",
                                            "DataEntity": [{
                                                "Ver": "CardTransaction_1.0.0",
                                                "isArchetype": true,
                                                "BillingDt": {
                                                    "Ver": "DateTime_1.0.0",
                                                    "Day": billingDt.Day,
                                                    "Month": billingDt.Month,
                                                    "Year": billingDt.Year
                                                },
                                                "Id": {
                                                    "Ver": "CardIdentifier_1.0.0",
                                                    "iorId": iorIdCardId,
                                                    "Id": idCardId
                                                }
                                            }],
                                            "Operation": "INQ",
                                            "Category": ["min"],
                                            "Filters": [{
                                                "Ver": "ANDFilter_1.0.0",
                                                "Filters": [{
                                                    "Ver": "TransactionListFilter_1.0.0",
                                                    "IssuerName": data.Payload.DataEntity[0].Card.IssuerName
                                                }]
                                            }],
                                            "RefDataList": [{
                                                "Ver": "ReferenceData_1.0.0",
                                                "Id": idPor,
                                                "Type": {
                                                    "CDE": "PORTFOLIOIDENTIFIERIORID",
                                                    "DISP": "PortfolioIdentifierIORID"
                                                }
                                            }]
                                        },
                                        "UIID": {"Ver": "UIIDomain_1.0.0"},
                                        "Resource": "resrc",
//                                        "AppVer": "1.0.0",
//                                        "EnvVer": "MessageEnvelope_1.0.0",
//                                        "APIVer": "apiVer",
                                        "MsgId": "72450014",
//                                        "ProxyApp": {
//                                            "Ver": "ProxyApp_1.0.0",
//                                            "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36"
//                                        },
                                        "SessionId": "sessionId"
                                    });
                                    reqCardRows.SecToken = yahav.SecToken;
                                    $.ajax({
                                        url: "https://digital.yahav.co.il/BaNCSDigitalApp/card",
                                        beforeSend: function (xhr) {
                                            xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                                            xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqCardRows)));
                                        },
                                        data: JSON.stringify(reqCardRows),
                                        method: "POST",
                                        contentType: "application/json"
                                    }).done(function (data) {

                                        function combineBlocks(resCardsRows) {
                                            if (!Array.isArray(resCardsRows)) {
                                                return resCardsRows;
                                            }

                                            return resCardsRows
                                                .map((row, idx, arr) => {
                                                    if (!row.Memo) {
                                                        return null;
                                                    }

                                                    if (!all.banks.core.services.parseSum(row.TotalCurAmt.Amt.Value)) {
                                                        let searchIdx;
                                                        if (idx + 1 === arr.length || all.banks.core.services.parseSum(arr[idx + 1].TotalCurAmt.Amt.Value)) {
                                                            // go back
                                                            for (searchIdx = idx - 1; searchIdx >= 0
                                                            && !arr[searchIdx].Memo
                                                            && !all.banks.core.services.parseSum(arr[searchIdx].TotalCurAmt.Amt.Value); --searchIdx)
                                                                ;
                                                        } else {
                                                            // go forward
                                                            for (searchIdx = idx + 1; searchIdx < arr.length
                                                            && !arr[searchIdx].Memo
                                                            && !all.banks.core.services.parseSum(arr[searchIdx].TotalCurAmt.Amt.Value); ++searchIdx)
                                                                ;
                                                        }

                                                        if (searchIdx >= 0 && searchIdx < arr.length && !arr[searchIdx].Memo) {
                                                            row.TotalCurAmt.Amt.Value = arr[searchIdx].TotalCurAmt.Amt.Value;
                                                        }
                                                    }

                                                    return row;
                                                })
                                                .filter(row => !!row);
                                        }

                                        var resCardsRows = combineBlocks(data.Payload.DataEntity);
                                        $(resCardsRows).each(function (indx, val) {
                                            if (val.Memo !== undefined) {
                                                var dates = val.OrigDt;
                                                if (dates == undefined) {
                                                    dates = nextBillingDate;
                                                }
                                                var comment = null, currentPaymentNum = null, totalPayments = null;
                                                if (val.TxnRef.RefData.Desc !== undefined) {
                                                    comment = val.TxnRef.RefData.Desc;
                                                    if (comment.indexOf("מתוך") !== -1) {
                                                        var sumOfPays = comment.split("מתוך");
                                                        currentPaymentNum = sumOfPays[0].replace(/\D/g, "");
                                                        totalPayments = sumOfPays[1].replace(/\D/g, "");
                                                    }
                                                }
                                                all.banks.generalVariables.allDataArrAshrai.push({
                                                    "BankNumber": acc.BankNumber,
                                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                                    "Token": all.banks.accountDetails.bank.token,
                                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                                    "BranchNumber": acc.BranchNumber,
                                                    "AccountNumber": acc.AccountNumber,
                                                    "CardNumber": vals.Card.CardNum,
                                                    "NextBillingDate": all.banks.core.services.convertDateAll(("0" + (nextBillingDate.Month)).slice(-2) + '/' + ("0" + (nextBillingDate.Day)).slice(-2) + '/' + nextBillingDate.Year),
                                                    "NextCycleTotal": nextCycleTotal,
                                                    "CardStatus": null,
                                                    "TransDesc": val.Memo,
                                                    "TransTotal": val.TotalCurAmt.Amt.Value,
                                                    "ValueDate": all.banks.core.services.convertDateAll(("0" + (dates.Month)).slice(-2) + '/' + ("0" + (dates.Day)).slice(-2) + '/' + dates.Year),
                                                    "TransCategory": null,
                                                    "TotalPayments": totalPayments,
                                                    "CurrentPaymentNum": currentPaymentNum,
                                                    "CardType": all.banks.core.services.getTypeCard(vals.Card.Brand ? vals.Card.Brand.DISP : ''),
//                                                    "CardType": vals.Card.Brand !== undefined ? all.banks.core.services.getTypeCard(vals.Card.Brand.DISP) : null,
                                                    "indFakeDate": 0,
                                                    "original_total": all.banks.core.services.parseSum(val.CompositeCurAmtList[0].Amount.Amt.Value),
//													"original_total": all.banks.core.services.parseSum(val.TotalCurAmt.Amt.Value),
                                                    "currency_id": all.banks.core.services.getTypeCurrencyAll(val.TotalCurAmt.CurrCode.SYM),
                                                    "ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(val.TotalCurAmt.CurrCode.SYM),
                                                    "comment": comment
                                                })
                                            }
                                        });
                                        cardsAll.splice(0, 1);
                                        if (cardsAll.length == 0) {
                                            if (yahav.indAcc + 1 == yahav.acc.length) {
                                                yahav.sendCardsCtrl();
                                            } else {
                                                yahav.indAcc += 1;
                                                yahav.loadAshraiPrev();
                                            }
                                        } else {
                                            loadCardData();
                                        }
                                    })
                                } else {
                                    cardsAll.splice(0, 1);
                                    if (cardsAll.length == 0) {
                                        if (yahav.indAcc + 1 == yahav.acc.length) {
                                            yahav.sendCardsCtrl();
                                        } else {
                                            yahav.indAcc += 1;
                                            yahav.loadAshraiPrev();
                                        }
                                    } else {
                                        loadCardData();
                                    }
                                }
                            });
                            return false;
                        });
                    }

                    if (cardsAll !== undefined) {
                        loadCardData();
                    } else {
                        if (yahav.indAcc + 1 == yahav.acc.length) {
                            yahav.sendCardsCtrl();
                        } else {
                            yahav.indAcc += 1;
                            yahav.loadAshraiPrev();
                        }
                    }
                });
                return false;
            }
        })
    };
    yahav.sendCardsCtrl = function () {
        all.banks.core.services.sendCards(all.banks.generalVariables.allDataArrAshrai)
            .then(function (arr) {
                yahav.indAcc = 0;
                if (all.banks.accountDetails.IND_NILVIM > 0) {
                    yahav.loadDepositsAndLoans();
                } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                    yahav.loadMatah();
                } else {
                    yahav.logOut();
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    yahav.sendCardsCtrl()
                }
            })
    }
    yahav.loadDepositsAndLoans = function () {
        $(yahav.acc).each(function (i, v) {
            if (i == yahav.indAcc) {
                var acc = {
                    "BankNumber": parseFloat(all.banks.accountDetails.bank.BankNumber),
                    'AccountNumber': parseFloat(v.Prtflio.Id.Id.split(new RegExp(v.Prtflio.Brnch.FiLocatnId.Id + '(\\d+)', 'g'))[1].toString()),
                    'BranchNumber': parseFloat(v.Prtflio.Brnch.FiLocatnId.Id.toString())
                };
                var id = v.Prtflio.Id;
                var req = yahav.prepareRequestUsing({
                    "Ver": "MessageEnvelope_1.0.0",
//                    "Device": {
//                        "Ver": "Device_1.0.0",
//                        "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                        "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                        "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                    },
//                    "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                    "Payload": {
                        "Ver": "MessagePayload_1.0.0",
                        "DataEntity": [{
                            "Ver": "PortfolioCardRelationship_1.0.0",
                            "isArchetype": true,
                            "Id": {"Ver": "CardIdentifier_1.0.0", "isArchetype": true},
                            "Prtflio": {
                                "Ver": "Portfolio_1.0.0",
                                "isArchetype": true,
                                "Id": {
                                    "Ver": "PortfolioIdentifier_1.0.0",
                                    "PortFoId": {"INTERNALIDENTIFIER": ""},
                                    "iorId": id.iorId,
                                    "Id": id.Id
                                }
                            }
                        }],
                        "Operation": "INQ",
                        "Category": ["min"],
                        "RefDataList": [{
                            "Ver": "ReferenceData_1.0.0",
                            "Id": id.iorId,
                            "Type": {"CDE": "PORTFOLIOIDENTIFIERIORID", "DISP": "PortfolioIdentifierIORID"}
                        }]
                    },
                    "UIID": {"Ver": "UIIDomain_1.0.0"},
                    "Resource": "resrc",
//                    "AppVer": "1.0.0",
//                    "EnvVer": "MessageEnvelope_1.0.0",
//                    "APIVer": "apiVer",
                    "MsgId": "69316513",
//                    "ProxyApp": {
//                        "Ver": "ProxyApp_1.0.0",
//                        "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36"
//                    },
                    "SessionId": "sessionId"
                });
                var idPor = id.iorId;
                req.SecToken = yahav.SecToken;
                var url = "https://digital.yahav.co.il/BaNCSDigitalApp/account";

                function loadPikdonot() {
                    var reqPikdonot = yahav.prepareRequestUsing({
                        "Ver": "MessageEnvelope_1.0.0",
//                        "Device": {
//                            "Ver": "Device_1.0.0",
//                            "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                            "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                            "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                        },
//                        "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                        "Payload": {
                            "Ver": "MessagePayload_1.0.0",
                            "DataEntity": [{
                                "Ver": "PortfolioAccountRelationship_1.0.0",
                                "isArchetype": true,
                                "Id": {"Ver": "Identifier_1.0.0", "isArchetype": true},
                                "Prtflio": {
                                    "Ver": "Portfolio_1.0.0",
                                    "isArchetype": true,
                                    "Id": {
                                        "Ver": "PortfolioIdentifier_1.0.0",
                                        "PortFoId": {"INTERNALIDENTIFIER": ""},
                                        "iorId": id.iorId,
                                        "Id": id.Id
                                    }
                                }
                            }],
                            "Operation": "INQ",
                            "Filters": [{
                                "Ver": "ANDFilter_1.0.0",
                                "Filters": [{
                                    "Ver": "AccountListFilter_1.0.0",
                                    "Type": {"CDE": "MMA", "DISP": "MONEYMARKETACCOUNT"},
                                    "Operator": "EQUAL"
                                }, {
                                    "Ver": "AccountListFilter_1.0.0",
                                    "Currency": {
                                        "Ver": "Currency_1.0.0",
                                        "isArchetype": true,
                                        "Code": {"CDE": "ILS", "DISP": "שקל"}
                                    },
                                    "Operator": "EQUAL"
                                }]
                            }],
                            "RefDataList": [{
                                "Ver": "ReferenceData_1.0.0",
                                "Id": id.iorId,
                                "Type": {"CDE": "PORTFOLIOIDENTIFIERIORID", "DISP": "PortfolioIdentifierIORID"}
                            }]
                        },
                        "UIID": {"Ver": "UIIDomain_1.0.0"},
                        "Resource": "resrc",
//                        "AppVer": "1.0.0",
//                        "EnvVer": "MessageEnvelope_1.0.0",
//                        "APIVer": "apiVer",
                        "MsgId": "67854851",
//                        "ProxyApp": {
//                            "Ver": "ProxyApp_1.0.0",
//                            "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
//                        },
                        "SessionId": "sessionId"
                    });
                    reqPikdonot.SecToken = yahav.SecToken;
                    $.ajax({
                        url: url,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                            xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqPikdonot)));
                        },
                        data: JSON.stringify(reqPikdonot),
                        method: "POST",
                        contentType: "application/json"
                    }).done(function (data) {
                        var dataEntity = data.Payload.DataEntity;
                        if (dataEntity !== undefined) {
                            $.each(dataEntity, function (i, v) {
                                all.banks.generalVariables.allDataArrDeposit.push({
                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                    "Token": all.banks.accountDetails.bank.token,
                                    "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    "AccountNumber": acc.AccountNumber,
                                    "BranchNumber": acc.BranchNumber,
                                    "TypeName": v.Account.Title,
                                    "DepositTotal": v.Account.PeriodDataList[0].Amount.Amt.Value,
                                    "DepositAsTotal": v.Account.IntalAmt.Amt.Value,
                                    "DueDate": v.Account.MaturityDt.Day + '/' + v.Account.MaturityDt.Month + '/' + v.Account.MaturityDt.Year,
                                    "DepositDate": v.Account.OpenDt.Day + '/' + v.Account.OpenDt.Month + '/' + v.Account.OpenDt.Year,
                                    "DepositExistStation": v.Account.MaturityDt.Day + '/' + v.Account.MaturityDt.Month + '/' + v.Account.MaturityDt.Year,
                                    //"DepositNumber": v.Account.AccountOpeningRef.,
                                    "DepositInterest": v.Account.IntrstRateDataList[0].RateMatrixTierList[0].Rate
                                });
                                if (dataEntity.length == i + 1) {

                                    loadPeri();
                                }
                            })
                        } else {
                            loadPeri();
                        }
                    });
                }

                function loadPeri() {
                    var reqPeri = yahav.prepareRequestUsing({
                        "Ver": "MessageEnvelope_1.0.0",
//                        "Device": {
//                            "Ver": "Device_1.0.0",
//                            "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                            "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                            "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                        },
//                        "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                        "Payload": {
                            "Ver": "MessagePayload_1.0.0",
                            "DataEntity": [{
                                "Ver": "PortfolioAccountRelationship_1.0.0",
                                "isArchetype": true,
                                "Id": {"Ver": "Identifier_1.0.0", "isArchetype": true},
                                "Prtflio": {
                                    "Ver": "Portfolio_1.0.0",
                                    "isArchetype": true,
                                    "Id": {
                                        "Ver": "PortfolioIdentifier_1.0.0",
                                        "PortFoId": {"INTERNALIDENTIFIER": ""},
                                        "iorId": id.iorId,
                                        "Id": id.Id
                                    }
                                }
                            }],
                            "Operation": "INQ",
                            "Category": ["min"],
                            "Filters": [{
                                "Ver": "ANDFilter_1.0.0",
                                "Filters": [{
                                    "Ver": "AccountListFilter_1.0.0",
                                    "Type": {"CDE": "YAHAVPERIDEPOSITACCOUNT", "DISP": "Yahav Perideposit Account"},
                                    "Operator": "EQUAL"
                                }, {
                                    "Ver": "AccountListFilter_1.0.0",
                                    "Currency": {
                                        "Ver": "Currency_1.0.0",
                                        "isArchetype": true,
                                        "Code": {"CDE": "ILS", "DISP": "שקל"}
                                    },
                                    "Operator": "EQUAL"
                                }]
                            }],
                            "RefDataList": [{
                                "Ver": "ReferenceData_1.0.0",
                                "Id": id.iorId,
                                "Type": {"CDE": "PORTFOLIOIDENTIFIERIORID", "DISP": "PortfolioIdentifierIORID"}
                            }]
                        },
                        "UIID": {"Ver": "UIIDomain_1.0.0"},
                        "Resource": "resrc",
//                        "AppVer": "1.0.0",
//                        "EnvVer": "MessageEnvelope_1.0.0",
//                        "APIVer": "apiVer",
                        "MsgId": "67854852",
//                        "ProxyApp": {
//                            "Ver": "ProxyApp_1.0.0",
//                            "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
//                        },
                        "SessionId": "sessionId"
                    });
                    reqPeri.SecToken = yahav.SecToken;
                    $.ajax({
                        url: url,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                            xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqPeri)));
                        },
                        data: JSON.stringify(reqPeri),
                        method: "POST",
                        contentType: "application/json"
                    }).done(function (data) {
                        var dataEntity = data.Payload.DataEntity;
                        if (dataEntity !== undefined) {
                            $.each(dataEntity, function (i, v) {
                                all.banks.generalVariables.allDataArrDeposit.push({
                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                    "Token": all.banks.accountDetails.bank.token,
                                    "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    "AccountNumber": acc.AccountNumber,
                                    "BranchNumber": acc.BranchNumber,
                                    "TypeName": v.Account.Title,
                                    "DepositTotal": v.Account.IntalAmt.Amt.Value,
                                    "DepositAsTotal": v.Account.IntalAmt.Amt.Value,
                                    "DueDate": all.banks.core.services.convertDateAll(v.Account.ClosedDt.Month + '/' + v.Account.ClosedDt.Day + '/' + v.Account.ClosedDt.Year),
                                    "DepositDate": all.banks.core.services.convertDateAll(v.Account.OpenDt.Month + '/' + v.Account.OpenDt.Day + '/' + v.Account.OpenDt.Year),
                                    "DepositExistStation": '',
                                    //"DepositNumber": v.Account.AccountOpeningRef.,
                                    "DepositInterest": v.Account.IntrstRateDataList[0].RateMatrixTierList[0].Rate
                                });
                                if (dataEntity.length == i + 1) {
                                    loadPikdonotStanding();
                                }

                            })
                        } else {
                            loadPikdonotStanding();
                        }
                    });
                }

                function loadPikdonotStanding() {
                    var reqPikdonotStanding = yahav.prepareRequestUsing({
                        "Ver": "MessageEnvelope_1.0.0",
//                        "Device": {
//                            "Ver": "Device_1.0.0",
//                            "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                            "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                            "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                        },
//                        "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                        "Payload": {
                            "Ver": "MessagePayload_1.0.0",
                            "DataEntity": [{
                                "Ver": "PortfolioAccountRelationship_1.0.0",
                                "isArchetype": true,
                                "Id": {"Ver": "Identifier_1.0.0", "isArchetype": true},
                                "Prtflio": {
                                    "Ver": "Portfolio_1.0.0",
                                    "isArchetype": true,
                                    "Id": {
                                        "Ver": "PortfolioIdentifier_1.0.0",
                                        "PortFoId": {"INTERNALIDENTIFIER": ""},
                                        "iorId": id.iorId,
                                        "Id": id.Id
                                    }
                                }
                            }],
                            "Operation": "INQ",
                            "RefDataList": [{
                                "Ver": "ReferenceData_1.0.0",
                                "Id": id.iorId,
                                "Type": {"CDE": "PORTFOLIOIDENTIFIERIORID", "DISP": "PortfolioIdentifierIORID"}
                            }],
                            "Category": ["min"],
                            "Filters": [{
                                "Ver": "ANDFilter_1.0.0",
                                "Filters": [{
                                    "Ver": "AccountListFilter_1.0.0",
                                    "Type": {
                                        "CDE": "YAHAVRECURRINGPERIDEPOSITACCOUNT",
                                        "DISP": "YAHAVRECURRINGPERIDEPOSITACCOUNT"
                                    },
                                    "Operator": "EQUAL"
                                }, {
                                    "Ver": "AccountListFilter_1.0.0",
                                    "Currency": {
                                        "Ver": "Currency_1.0.0",
                                        "isArchetype": true,
                                        "Code": {"CDE": "ILS", "DISP": "שקל"}
                                    },
                                    "Operator": "EQUAL"
                                }]
                            }]
                        },
                        "UIID": {"Ver": "UIIDomain_1.0.0"},
                        "Resource": "resrc",
//                        "AppVer": "1.0.0",
//                        "EnvVer": "MessageEnvelope_1.0.0",
//                        "APIVer": "apiVer",
                        "MsgId": "67854853",
//                        "ProxyApp": {
//                            "Ver": "ProxyApp_1.0.0",
//                            "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
//                        },
                        "SessionId": "sessionId"
                    });
                    reqPikdonotStanding.SecToken = yahav.SecToken;
                    $.ajax({
                        url: url,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                            xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqPikdonotStanding)));
                        },
                        data: JSON.stringify(reqPikdonotStanding),
                        method: "POST",
                        contentType: "application/json"
                    }).done(function (data) {
                        var dataEntity = data.Payload.DataEntity;
                        if (dataEntity !== undefined) {
                            //console.log("loadPikdonotStanding: ", JSON.stringify(dataEntity));
                            $.each(dataEntity, function (i, v) {
                                var jsonStanding = yahav.prepareRequestUsing({
                                    "Ver": "MessageEnvelope_1.0.0",
//                                    "Device": {
//                                        "Ver": "Device_1.0.0",
//                                        "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                                        "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                                        "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                                    },
//                                    "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},

                                    "Payload": {
                                        "Ver": "MessagePayload_1.0.0",
                                        "DataEntity": [{
                                            "Ver": "RecurringDepositAccount_1.0.0.BY.1.0",
                                            "AccountId": {
                                                "Ver": "AccountIdentifier_1.0.0",
                                                "AcctIds": {"BANKACCOUNTID": ""},
                                                "Id": {"Ver": "Identifier_1.0.0", "Id": v.Account.AccountId.Id.Id},
                                                "iorId": v.Account.AccountId.iorId
                                            },
                                            "Currency": {
                                                "Ver": "Currency_1.0.0",
                                                "isArchetype": true,
                                                "Code": {"CDE": "ILS", "DISP": "שקל"}
                                            },
                                            "Type": {
                                                "CDE": "YAHAVRECURRINGPERIDEPOSITACCOUNT",
                                                "DISP": "YAHAVRECURRINGPERIDEPOSITACCOUNT"
                                            },
                                            "Use": {"CDE": "BUSINESS", "DISP": "ביזנס"}
                                        }],
                                        "Operation": "INQ",
                                        "RefDataList": [{
                                            "Ver": "ReferenceData_1.0.0",
                                            "Id": id.iorId,
                                            "Type": {
                                                "CDE": "PORTFOLIOIDENTIFIERIORID",
                                                "DISP": "PortfolioIdentifierIORID"
                                            }
                                        }]
                                    },
                                    "UIID": {"Ver": "UIIDomain_1.0.0"},
                                    "Resource": "resrc",
//                                    "AppVer": "1.0.0",
//                                    "EnvVer": "MessageEnvelope_1.0.0",
//                                    "APIVer": "apiVer",
                                    "MsgId": "79661978",
//                                    "ProxyApp": {
//                                        "Ver": "ProxyApp_1.0.0",
//                                        "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
//                                    },
                                    "SessionId": "sessionId"
                                });

                                jsonStanding.SecToken = yahav.SecToken;
                                $.ajax({
                                    url: url,
                                    beforeSend: function (xhr) {
                                        xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                                        xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(jsonStanding)));
                                    },
                                    data: JSON.stringify(jsonStanding),
                                    method: "POST",
                                    contentType: "application/json"
                                }).done(function (data) {
                                    all.banks.generalVariables.allDataArrDeposit.push({
                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                        "Token": all.banks.accountDetails.bank.token,
                                        "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                        "AccountNumber": acc.AccountNumber,
                                        "BranchNumber": acc.BranchNumber,
                                        "TypeName": data.Payload.DataEntity[0].Title,
                                        "DepositTotal": data.Payload.DataEntity[0].IntalAmt.Amt.Value,
                                        "DepositAsTotal": data.Payload.DataEntity[0].IntalAmt.Amt.Value,
                                        "DueDate": all.banks.core.services.convertDateAll(data.Payload.DataEntity[0].MaturityDt.Month + '/' + data.Payload.DataEntity[0].MaturityDt.Day + '/' + data.Payload.DataEntity[0].MaturityDt.Year),
                                        "DepositDate": all.banks.core.services.convertDateAll(data.Payload.DataEntity[0].OpenDt.Month + '/' + data.Payload.DataEntity[0].OpenDt.Day + '/' + data.Payload.DataEntity[0].OpenDt.Year),
                                        "DepositExistStation": '',
                                        "DepositNumber": data.Payload.DataEntity[0].AccountId.Id.Id,
                                        "DepositInterest": data.Payload.DataEntity[0].IntrstRateDataList[0].RateMatrixTierList[0].Rate
                                    });
                                    if (dataEntity.length == i + 1) {
                                        loadSavingsPlan();
                                    }
                                })
                            })
                        } else {
                            loadSavingsPlan();
                        }
                    });
                    return false;
                }

                function loadSavingsPlan() {
                    var reqSavingsPlan = yahav.prepareRequestUsing({
                        "Ver": "MessageEnvelope_1.0.0",
//                        "Device": {
//                            "Ver": "Device_1.0.0",
//                            "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                            "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                            "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                        },
//                        "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                        "Payload": {
                            "Ver": "MessagePayload_1.0.0",
                            "DataEntity": [{
                                "Ver": "PortfolioAccountRelationship_1.0.0",
                                "isArchetype": true,
                                "Id": {"Ver": "Identifier_1.0.0", "isArchetype": true},
                                "Prtflio": {
                                    "Ver": "Portfolio_1.0.0",
                                    "isArchetype": true,
                                    "Id": {
                                        "Ver": "PortfolioIdentifier_1.0.0",
                                        "PortFoId": {"INTERNALIDENTIFIER": ""},
                                        "iorId": id.iorId,
                                        "Id": id.Id
                                    }
                                }
                            }],
                            "Operation": "INQ",
                            "Category": ["min"],
                            "RefDataList": [{
                                "Ver": "ReferenceData_1.0.0",
                                "Id": id.iorId,
                                "Type": {"CDE": "PORTFOLIOIDENTIFIERIORID", "DISP": "PortfolioIdentifierIORID"}
                            }],
                            "Filters": [{
                                "Ver": "ANDFilter_1.0.0",
                                "Filters": [{
                                    "Ver": "AccountListFilter_1.0.0",
                                    "Type": {"CDE": "YAHAVSAVINGSACCOUNT", "DISP": "YAHAVSAVINGSACCOUNT"},
                                    "Operator": "EQUAL"
                                }, {
                                    "Ver": "AccountListFilter_1.0.0",
                                    "Currency": {
                                        "Ver": "Currency_1.0.0",
                                        "isArchetype": true,
                                        "Code": {"CDE": "ILS", "DISP": "שקל"}
                                    },
                                    "Operator": "EQUAL"
                                }]
                            }]
                        },
                        "UIID": {"Ver": "UIIDomain_1.0.0"},
                        "Resource": "resrc",
//                        "AppVer": "1.0.0",
//                        "EnvVer": "MessageEnvelope_1.0.0",
//                        "APIVer": "apiVer",
                        "MsgId": "67854854",
//                        "ProxyApp": {
//                            "Ver": "ProxyApp_1.0.0",
//                            "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
//                        },
                        "SessionId": "sessionId"
                    });
                    reqSavingsPlan.SecToken = yahav.SecToken;
                    $.ajax({
                        url: url,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                            xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqSavingsPlan)));
                        },
                        data: JSON.stringify(reqSavingsPlan),
                        method: "POST",
                        contentType: "application/json"
                    }).done(function (data) {
                        var dataEntity = data.Payload.DataEntity;
                        if (dataEntity !== undefined) {
                            var index = 0;
                            $.each(dataEntity, function (i, v) {
                                if (i == index) {
                                    index++;
                                    var jsonReq = yahav.prepareRequestUsing({
                                        "Ver": "MessageEnvelope_1.0.0",
//                                        "Device": {
//                                            "Ver": "Device_1.0.0",
//                                            "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                                            "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                                            "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                                        },
//                                        "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                                        "Payload": {
                                            "Ver": "MessagePayload_1.0.0",
                                            "DataEntity": [{
                                                "Ver": "TermDepositAccount_1.0.0",
                                                "AccountId": {
                                                    "Ver": "AccountIdentifier_1.0.0",
                                                    "AcctIds": {"BANKACCOUNTID": ""},
                                                    "Id": {"Ver": "Identifier_1.0.0", "Id": v.Account.AccountId.Id.Id},
                                                    "iorId": v.Account.AccountId.iorId
                                                },
                                                "Currency": {
                                                    "Ver": "Currency_1.0.0",
                                                    "isArchetype": true,
                                                    "Code": {"CDE": "ILS", "DISP": "שקל"}
                                                },
                                                "Use": {"CDE": "BUSINESS", "DISP": "ביזנס"},
                                                "OpenDt": {"Ver": "Date_1.0.0", "isArchetype": true},
                                                "BalanceList": [{
                                                    "Ver": "AccountBalance_1.0.0",
                                                    "isArchetype": true,
                                                    "CurrAmt": {
                                                        "Ver": "CurrencyAmount_1.0.0",
                                                        "isArchetype": true,
                                                        "Amt": {"Ver": "Amount_1.0.0", "isArchetype": true}
                                                    }
                                                }],
                                                "AccountRefDataList": [{
                                                    "Ver": "ReferenceData_1.0.0",
                                                    "Id": id.iorId,
                                                    "Type": {
                                                        "CDE": "PORTFOLIOIDENTIFIERIORID",
                                                        "DISP": "PortfolioIdentifierIORID"
                                                    }
                                                }],
                                                "Type": {"CDE": "YAHAVSAVINGSACCOUNT", "DISP": "YAHAVSAVINGSACCOUNT"}
                                            }],
                                            "Operation": "INQ",
                                            "RefDataList": [{
                                                "Ver": "ReferenceData_1.0.0",
                                                "Id": id.iorId,
                                                "Type": {
                                                    "CDE": "PORTFOLIOIDENTIFIERIORID",
                                                    "DISP": "PortfolioIdentifierIORID"
                                                }
                                            }]
                                        },
                                        "UIID": {"Ver": "UIIDomain_1.0.0"},
                                        "Resource": "resrc",
//                                        "AppVer": "1.0.0",
//                                        "EnvVer": "MessageEnvelope_1.0.0",
//                                        "APIVer": "apiVer",
                                        "MsgId": "99431466",
//                                        "ProxyApp": {
//                                            "Ver": "ProxyApp_1.0.0",
//                                            "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
//                                        },
                                        "SessionId": "sessionId"
                                    });
                                    jsonReq.SecToken = yahav.SecToken;
                                    $.ajax({
                                        url: url,
                                        beforeSend: function (xhr) {
                                            xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                                            xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(jsonReq)));
                                        },
                                        data: JSON.stringify(jsonReq),
                                        method: "POST",
                                        contentType: "application/json"
                                    }).done(function (data) {

                                        if (data.Payload.DataEntity[0].IntalAmt) {
                                            all.banks.generalVariables.allDataArrDeposit.push({
                                                "TargetId": all.banks.accountDetails.bank.targetId,
                                                "Token": all.banks.accountDetails.bank.token,
                                                "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                                "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                "ExporterId": all.banks.spiderConfig.spiderId,
                                                "AccountNumber": acc.AccountNumber,
                                                "BranchNumber": acc.BranchNumber,
                                                "TypeName": v.Account.Title,
                                                "DepositTotal": data.Payload.DataEntity[0].IntalAmt.Amt.Value,
                                                "DepositAsTotal": data.Payload.DataEntity[0].BalanceList[0].CurrAmt.Amt.Value,
                                                "DueDate": all.banks.core.services.convertDateAll(data.Payload.DataEntity[0].MaturityDt.Month + '/' + data.Payload.DataEntity[0].MaturityDt.Day + '/' + data.Payload.DataEntity[0].MaturityDt.Year),
                                                "DepositDate": all.banks.core.services.convertDateAll(data.Payload.DataEntity[0].OpenDt.Month + '/' + data.Payload.DataEntity[0].OpenDt.Day + '/' + data.Payload.DataEntity[0].OpenDt.Year),
                                                "DepositExistStation": '',
                                                "DepositNumber": data.Payload.DataEntity[0].AccountId.Id.Id,
                                                "DepositInterest": ''
                                            });
                                        }
                                        if (dataEntity.length == i + 1) {
                                            if (yahav.indAcc + 1 == yahav.acc.length) {

                                                yahav.sendDepositCtrl()
                                            } else {
                                                yahav.indAcc += 1;
                                                yahav.loadDepositsAndLoans();
                                            }

                                        }

                                        return false;
                                    })
                                }

                            })
                        } else {
                            if (yahav.indAcc + 1 == yahav.acc.length) {

                                yahav.sendDepositCtrl()
                                //loadLoans();
                            } else {
                                yahav.indAcc += 1;
                                yahav.loadDepositsAndLoans();
                                //loadLoans();
                            }
                        }
                    });
                }


                loadPikdonot();
            }
        })
    }
    yahav.loadLoans = function () {
        $(yahav.acc).each(function (i, v) {
            if (i == yahav.indAcc) {
                var acc = {
                    "BankNumber": parseFloat(all.banks.accountDetails.bank.BankNumber),
                    'AccountNumber': parseFloat(v.Prtflio.Id.Id.split(new RegExp(v.Prtflio.Brnch.FiLocatnId.Id + '(\\d+)', 'g'))[1].toString()),
                    'BranchNumber': parseFloat(v.Prtflio.Brnch.FiLocatnId.Id.toString())
                };
                var id = v.Prtflio.Id;
                var req = yahav.prepareRequestUsing({
                    "Ver": "MessageEnvelope_1.0.0",
//                    "Device": {
//                        "Ver": "Device_1.0.0",
//                        "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                        "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                        "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                    },
//                    "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                    "Payload": {
                        "Ver": "MessagePayload_1.0.0",
                        "DataEntity": [{
                            "Ver": "PortfolioCardRelationship_1.0.0",
                            "isArchetype": true,
                            "Id": {"Ver": "CardIdentifier_1.0.0", "isArchetype": true},
                            "Prtflio": {
                                "Ver": "Portfolio_1.0.0",
                                "isArchetype": true,
                                "Id": {
                                    "Ver": "PortfolioIdentifier_1.0.0",
                                    "PortFoId": {"INTERNALIDENTIFIER": ""},
                                    "iorId": id.iorId,
                                    "Id": id.Id
                                }
                            }
                        }],
                        "Operation": "INQ",
                        "Category": ["min"],
                        "RefDataList": [{
                            "Ver": "ReferenceData_1.0.0",
                            "Id": id.iorId,
                            "Type": {"CDE": "PORTFOLIOIDENTIFIERIORID", "DISP": "PortfolioIdentifierIORID"}
                        }]
                    },
                    "UIID": {"Ver": "UIIDomain_1.0.0"},
                    "Resource": "resrc",
//                    "AppVer": "1.0.0",
//                    "EnvVer": "MessageEnvelope_1.0.0",
//                    "APIVer": "apiVer",
                    "MsgId": "69316513",
//                    "ProxyApp": {
//                        "Ver": "ProxyApp_1.0.0",
//                        "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36"
//                    },
                    "SessionId": "sessionId"
                });
                var idPor = id.iorId;
                req.SecToken = yahav.SecToken;
                var url = "https://digital.yahav.co.il/BaNCSDigitalApp/account";


                function loadLoans() {
                    var reqLoans = yahav.prepareRequestUsing({
                        "Ver": "MessageEnvelope_1.0.0",
//                        "Device": {
//                            "Ver": "Device_1.0.0",
//                            "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                            "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                            "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                        },
//                        "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                        "Payload": {
                            "Ver": "MessagePayload_1.0.0",
                            "DataEntity": [{
                                "Ver": "PortfolioAccountRelationship_1.0.0",
                                "isArchetype": true,
                                "Id": {"Ver": "Identifier_1.0.0", "isArchetype": true},
                                "Prtflio": {
                                    "Ver": "Portfolio_1.0.0",
                                    "isArchetype": true,
                                    "Id": {
                                        "Ver": "PortfolioIdentifier_1.0.0",
                                        "PortFoId": {"INTERNALIDENTIFIER": ""},
                                        "iorId": id.iorId,
                                        "Id": id.Id
                                    }
                                }
                            }],
                            "Operation": "INQ",
                            "RefDataList": [{
                                "Ver": "ReferenceData_1.0.0",
                                "Id": id.iorId,
                                "Type": {"CDE": "PORTFOLIOIDENTIFIERIORID", "DISP": "PortfolioIdentifierIORID"}
                            }],
                            "Filters": [{
                                "Ver": "ANDFilter_1.0.0",
                                "Filters": [{
                                    "Ver": "AccountListFilter_1.0.0",
                                    "Type": {"CDE": "LOANACCOUNT", "DISP": "LOANACCOUNT"},
                                    "Operator": "EQUAL"
                                }, {
                                    "Ver": "AccountListFilter_1.0.0",
                                    "Currency": {
                                        "Ver": "Currency_1.0.0",
                                        "isArchetype": true,
                                        "Code": {"CDE": "ILS", "DISP": "שקל"}
                                    },
                                    "Operator": "EQUAL"
                                }]
                            }]
                        },
                        "UIID": {"Ver": "UIIDomain_1.0.0"},
                        "Resource": "resrc",
//                        "AppVer": "1.0.0",
//                        "EnvVer": "MessageEnvelope_1.0.0",
//                        "APIVer": "apiVer",
                        "MsgId": "67854856",
//                        "ProxyApp": {
//                            "Ver": "ProxyApp_1.0.0",
//                            "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
//                        },
                        "SessionId": "sessionId"
                    });
                    reqLoans.SecToken = yahav.SecToken;
                    $.ajax({
                        url: url,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                            xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqLoans)));
                        },
                        data: JSON.stringify(reqLoans),
                        method: "POST",
                        contentType: "application/json"
                    }).done(function (data) {
                        var index = 0;
                        var dataEntity = data.Payload.DataEntity;
                        if (dataEntity !== undefined) {
                            $.each(dataEntity, function (i, v) {
                                if (index == i) {
                                    index++;
                                    var jsonReq = yahav.prepareRequestUsing({
                                        "Ver": "MessageEnvelope_1.0.0",
//                                        "Device": {
//                                            "Ver": "Device_1.0.0",
//                                            "DeviceId": {
//                                                "Ver": "DeviceIdentifier_1.0.0"
//                                            },
//                                            "Type": {
//                                                "CDE": "HOMECOMPUTER",
//                                                "DISP": "Home Computer"
//                                            },
//                                            "OperatingSystem": {
//                                                "Ver": "OperatingSystem_1.0.0",
//                                                "Name": "MacIntel"
//                                            }
//                                        },
//                                        "Locale": {
//                                            "CDE": "IW_IL",
//                                            "DISP": "Hebrew Israel"
//                                        },
                                        "SecToken": {
                                            "Ver": "SecurityToken_1.0.0",
                                            "Token": [{
                                                "Ver": "SMSessionValidatedToken_1.0.0",

                                                "Type": {
                                                    "CDE": "AUTHENTICATION",
                                                    "DISP": "Authentication"
                                                },
                                                "Issuer": "AuthenticationTokenIssuer_1.0.0",
                                                "Expiry": {
                                                    "Ver": "DateTime_1.0.0",
                                                    "Year": 2017,
                                                    "Month": 3,
                                                    "Day": 20,
                                                    "Hour": 16,
                                                    "Minute": 30,
                                                    "Second": 35
                                                }

                                            }]
                                        },
                                        "Payload": {
                                            "Ver": "MessagePayload_1.0.0",
                                            "DataEntity": [{
                                                "Ver": "LoanAccount_1.0.0.BY.1.0",
                                                "AccountId": {
                                                    "Ver": "AccountIdentifier_1.0.0",
                                                    "AcctIds": {
                                                        "BANKACCOUNTID": ""
                                                    },
                                                    "Id": {
                                                        "Ver": "Identifier_1.0.0"
                                                    },
                                                    "iorId": v.Account.AccountId.iorId
                                                },
                                                "AccountRefDataList": [{
                                                    "Ver": "ReferenceData_1.0.0",
                                                    "Id": id.iorId,
                                                    "Type": {
                                                        "CDE": "PORTFOLIOIDENTIFIERIORID",
                                                        "DISP": "PortfolioIdentifierIORID"
                                                    }
                                                }],
                                                "Type": {
                                                    "CDE": "LOANACCOUNT",
                                                    "DISP": "LOANACCOUNT"
                                                }
                                            }],
                                            "Operation": "INQ",
                                            "RefDataList": [{
                                                "Ver": "ReferenceData_1.0.0",
                                                "Id": id.iorId,
                                                "Type": {
                                                    "CDE": "PORTFOLIOIDENTIFIERIORID",
                                                    "DISP": "PortfolioIdentifierIORID"
                                                }
                                            }]
                                        },
                                        "UIID": {
                                            "Ver": "UIIDomain_1.0.0"
                                        },
                                        "Resource": "resrc",
//                                        "AppVer": "1.0.0",
//                                        "EnvVer": "MessageEnvelope_1.0.0",
//                                        "APIVer": "apiVer",
                                        "MsgId": "94327571",
//                                        "ProxyApp": {
//                                            "Ver": "ProxyApp_1.0.0",
//                                            "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
//                                        },
                                        "SessionId": "sessionId"
                                    });
                                    jsonReq.SecToken = yahav.SecToken;
                                    $.ajax({
                                        url: url,
                                        beforeSend: function (xhr) {
                                            xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                                            xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(jsonReq)));
                                        },
                                        data: JSON.stringify(jsonReq),
                                        method: "POST",
                                        contentType: "application/json"
                                    }).done(function (data) {
                                        data = data.Payload.DataEntity[0];
                                        all.banks.generalVariables.allDataArrLoan.push({
                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                            "Token": all.banks.accountDetails.bank.token,
                                            "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                            "AccountNumber": acc.AccountNumber,
                                            "BranchNumber": acc.BranchNumber,
                                            "LoanNumber": data.AccountId.AcctIds.BANKACCOUNTID,
                                            "LoanOriginalTotal": data.PeriodDataList[0].Amount.Amt.Value,
                                            "LoanTotalLeft": // data.BalanceList[0].CurrAmt.Amt.Value,
                                                data.BalanceList.reduce((acmltr, rec) => {
                                                    if (rec.CurrAmt && rec.CurrAmt.Amt) {
                                                        if (rec.BalType && rec.BalType.CDE === "OUTSTANDING") {
                                                            acmltr = rec.CurrAmt.Amt.Value;
                                                        } else if (acmltr === null) {
                                                            acmltr = rec.CurrAmt.Amt.Value;
                                                        }
                                                    }
                                                    return acmltr;
                                                }, null),
                                            "NextPaymentTotal": data.NextPymntAmt.Amt.Value,
                                            "LoanDate": data.OpenDt.Day != undefined ? all.banks.core.services.convertDateAll(data.OpenDt.Month + '/' + data.OpenDt.Day + '/' + data.OpenDt.Year) : null,
                                            "LoanName": data.PurposeDesc,
                                            "LoanIntrest": data.IntrstRateDataList[2].RateMatrixTierList[0].Rate,
                                            "LoanNextPaymentDate": all.banks.core.services.convertDateAll(data.NextPymntDt.Month + '/' + data.NextPymntDt.Day + '/' + data.NextPymntDt.Year),
                                            "LoanFinish": all.banks.core.services.convertDateAll(data.EndDt.Month + '/' + data.EndDt.Day + '/' + data.EndDt.Year),
                                        })
                                        if (dataEntity.length == i + 1) {
                                            if (yahav.indAcc + 1 == yahav.acc.length) {
                                                yahav.sendLoanCtrl();
                                            } else {
                                                yahav.indAcc += 1;
                                                yahav.loadLoans();
                                            }
                                        }
                                        return false;
                                    })
                                }
                            })

                        } else {
                            if (yahav.indAcc + 1 == yahav.acc.length) {
                                yahav.sendLoanCtrl();
                            } else {
                                yahav.indAcc += 1;
                                yahav.loadLoans();
                            }
                        }
                    });

                }

                loadLoans();
            }
        })
    }
    yahav.sendDepositCtrl = function (loadLoans) {
        all.banks.core.services.sendPikdonot(all.banks.generalVariables.allDataArrDeposit)
            .then(function (arr) {
                yahav.indAcc = 0;
                myEmitterLogs(19);
                yahav.loadLoans();
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    yahav.sendDepositCtrl()
                }
            })
    }
    yahav.sendLoanCtrl = function () {
        all.banks.core.services.sendLoan(all.banks.generalVariables.allDataArrLoan)
            .then(function (arr) {
                yahav.indAcc = 0;
                myEmitterLogs(23); //start standingOrders
                yahav.loadStandingOrders();
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    yahav.sendLoanCtrl()
                }
            })
    }
    yahav.loadStandingOrders = function () {
        $(yahav.acc).each(function (i, v) {
            if (i == yahav.indAcc) {
                var id = v.Prtflio.Id;
                console.log('id1', id);

                var reqAcc = yahav.prepareRequestUsing({
                    "Ver": "MessageEnvelope_1.0.0",
//                    "Device": {
//                        "Ver": "Device_1.0.0",
//                        "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                        "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                        "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                    },
//                    "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                    "Payload": {
                        "Ver": "MessagePayload_1.0.0",
                        "DataEntity": [{
                            "Ver": "PortfolioAccountRelationship_1.0.0",
                            "isArchetype": true,
                            "Id": {"Ver": "Identifier_1.0.0", "isArchetype": true},
                            "Prtflio": {
                                "Ver": "Portfolio_1.0.0",
                                "isArchetype": true,
                                "Id": {
                                    "Ver": "PortfolioIdentifier_1.0.0",
                                    "PortFoId": {"INTERNALIDENTIFIER": ""},
                                    "iorId": id.iorId,
                                    "Id": id.Id
                                }
                            }
                        }],
                        "Operation": "INQ",
                        "RefDataList": [{
                            "Ver": "ReferenceData_1.0.0",
                            "Id": id.iorId,
                            "Type": {
                                "CDE": "PORTFOLIOIDENTIFIERIORID",
                                "DISP": "PortfolioIdentifierIORID"
                            }
                        }],
                        "Filters": [{
                            "Ver": "ANDFilter_1.0.0",
                            "Filters": [{
                                "Ver": "AccountListFilter_1.0.0",
                                "Type": {"CDE": "DDA", "DISP": "DEMANDDEPOSITACCOUNT"},
                                "Operator": "EQUAL"
                            }, {
                                "Ver": "AccountListFilter_1.0.0",
                                "Currency": {
                                    "Ver": "Currency_1.0.0",
                                    "isArchetype": true,
                                    "Code": {"CDE": "ILS", "DISP": "Shekel"}
                                },
                                "Operator": "EQUAL"
                            }]
                        }]
                    },
                    "UIID": {"Ver": "UIIDomain_1.0.0"},
                    "Resource": "resrc",
//                    "AppVer": "1.0.0",
//                    "EnvVer": "MessageEnvelope_1.0.0",
//                    "APIVer": "apiVer",
                    "MsgId": "64009602",
//                    "ProxyApp": {
//                        "Ver": "ProxyApp_1.0.0",
//                        "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36"
//                    },
                    "SessionId": "sessionId"
                });
                reqAcc.SecToken = yahav.SecToken;
                var idPor = id.iorId;
                console.log('idPor', idPor);

                var acc = {
                    "BankNumber": parseFloat(all.banks.accountDetails.bank.BankNumber),
                    'AccountNumber': parseFloat(v.Prtflio.Id.Id.split(new RegExp(v.Prtflio.Brnch.FiLocatnId.Id + '(\\d+)', 'g'))[1].toString()),
                    'BranchNumber': parseFloat(v.Prtflio.Brnch.FiLocatnId.Id.toString())
                };
                $.ajax({
                    url: "https://digital.yahav.co.il/BaNCSDigitalApp/account",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                        xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqAcc)));
                    },
                    data: JSON.stringify(reqAcc),
                    method: "POST",
                    contentType: "application/json"
                }).done(function (data) {
                    var dataInfo = data;
                    var id = dataInfo.Payload.DataEntity[0].Prtflio.Id.Id;
                    var iorId = dataInfo.Payload.DataEntity[0].Prtflio.Id.iorId;
                    var iorIdForXfer = dataInfo.Payload.DataEntity[0].Account.AccountId.iorId;
                    var idForXfer = dataInfo.Payload.DataEntity[0].Account.AccountId.Id.Id;
                    console.log('id', id);
                    console.log('iorId', iorId);
                    console.log('iorIdForXfer', iorIdForXfer);
                    console.log('idForXfer', idForXfer);

                    var urlStandingOrder = "https://digital.yahav.co.il/BaNCSDigitalApp/payment";

                    function loadTransferMoneyFuture() {
                        var reqTransferMoneyFuture = yahav.prepareRequestUsing({
                            "Ver": "MessageEnvelope_1.0.0",
//                            "Device": {
//                                "Ver": "Device_1.0.0",
//                                "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                                "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                                "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                            },
//                            "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                            "Payload": {
                                "Ver": "MessagePayload_1.0.0",
                                "DataEntity": [{
                                    "Ver": "AccountTransfer_1.0.0",
                                    "isArchetype": true,
                                    "FromAcctRef": {
                                        "Ver": "AccountReference_1.0.0",
                                        "Acct": {
                                            "Ver": "DemandDepositAccount_1.0.0",
                                            "AccountId": {
                                                "Ver": "AccountIdentifier_1.0.0",
                                                "AcctIds": {"BANKACCOUNTID": ""},
                                                "Id": {"Ver": "Identifier_1.0.0", "Id": id},
                                                "iorId": iorId
                                            },
                                            "AccountRefDataList": [{
                                                "Ver": "ReferenceData_1.0.0",
                                                "Id": id.iorId,
                                                "Type": {
                                                    "CDE": "PORTFOLIOIDENTIFIERIORID",
                                                    "DISP": "PortfolioIdentifierIORID"
                                                }
                                            }],
                                            "Type": {"CDE": "DDA", "DISP": "DEMANDDEPOSITACCOUNT"}
                                        }
                                    }
                                }],
                                "Operation": "INQ",
                                "Filters": [{
                                    "Ver": "ANDFilter_1.0.0",
                                    "Filters": [{
                                        "Ver": "TransferListFilter_1.0.0",
                                        "TransferStatus": {
                                            "Ver": "TransferStatus_1.0.0",
                                            "StatusCode": {"CDE": "PROCESSING", "DISP": "Processing"}
                                        },
                                        "Operator": "EQUAL"
                                    }, {
                                        "Ver": "TransferListFilter_1.0.0",
                                        "TimeFrame": {
                                            "Ver": "TimeFrame_1.0.0",
                                            "StartDt": {
                                                "Ver": "DateTime_1.0.0",
                                                "Day": new Date().getDate(),
                                                "Month": new Date().getMonth() + 1,
                                                "Year": new Date().getFullYear()
                                            },
                                            "EndDt": {"Ver": "DateTime_1.0.0", "Day": 31, "Month": 12, "Year": 9999}
                                        },
                                        "Operator": "GREATERTHANOREQUAL"
                                    }]
                                }],
                                "RefDataList": [{
                                    "Ver": "ReferenceData_1.0.0",
                                    "Id": id.iorId,
                                    "Type": {"CDE": "PORTFOLIOIDENTIFIERIORID", "DISP": "PortfolioIdentifierIORID"}
                                }]
                            },
                            "UIID": {"Ver": "UIIDomain_1.0.0"},
                            "Resource": "resrc",
//                            "AppVer": "1.0.0",
//                            "EnvVer": "MessageEnvelope_1.0.0",
//                            "APIVer": "apiVer",
                            "MsgId": "67854871",
//                            "ProxyApp": {
//                                "Ver": "ProxyApp_1.0.0",
//                                "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
//                            },
                            "SessionId": "sessionId"
                        });
                        reqTransferMoneyFuture.SecToken = yahav.SecToken;
                        $.ajax({
                            url: urlStandingOrder,
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                                xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqTransferMoneyFuture)));
                            },
                            data: JSON.stringify(reqTransferMoneyFuture),
                            method: "POST",
                            contentType: "application/json"
                        }).done(function (data) {
                            var dataEntity = data.Payload.DataEntity;
                            if (dataEntity !== undefined) {
                                loadStandingOrdersData();
                            } else {
                                loadStandingOrdersData();
                            }
                        });
                    }

                    function loadStandingOrdersData() {
                        // var reqStandingOrders = {
                        //     "Ver": "MessageEnvelope_1.0.0",
                        //     "Device": {
                        //         "Ver": "Device_1.0.0",
                        //         "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
                        //         "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
                        //         "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
                        //     },
                        //     "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                        //     "Payload": {
                        //         "Ver": "MessagePayload_1.0.0",
                        //         "DataEntity": [{
                        //             "Ver": "AccountRecurTransfer_1.0.0",
                        //             "isArchetype": true,
                        //             "FromAcctRef": {
                        //                 "Ver": "AccountReference_1.0.0",
                        //                 "Acct": {
                        //                     "Ver": "DemandDepositAccount_1.0.0",
                        //                     "AccountId": {
                        //                         "Ver": "AccountIdentifier_1.0.0",
                        //                         "AcctIds": {"BANKACCOUNTID": ""},
                        //                         "Id": {"Ver": "Identifier_1.0.0", "Id": id},
                        //                         "iorId": iorId
                        //                     },
                        //                     "AccountRefDataList": [{
                        //                         "Ver": "ReferenceData_1.0.0",
                        //                         "Id": id.iorId,
                        //                         "Type": {
                        //                             "CDE": "PORTFOLIOIDENTIFIERIORID",
                        //                             "DISP": "PortfolioIdentifierIORID"
                        //                         }
                        //                     }],
                        //                     "Type": {"CDE": "DDA", "DISP": "DEMANDDEPOSITACCOUNT"}
                        //                 }
                        //             }
                        //         }],
                        //         "Operation": "INQ",
                        //         "Filters": [{
                        //             "Ver": "ANDFilter_1.0.0",
                        //             "Filters": [{
                        //                 "Ver": "TransferListFilter_1.0.0",
                        //                 "TransferStatus": {
                        //                     "Ver": "TransferStatus_1.0.0",
                        //                     "StatusCode": {"CDE": "SCHEDULED", "DISP": "Scheduled"}
                        //                 },
                        //                 "Operator": "EQUAL"
                        //             }, {
                        //                 "Ver": "TransferListFilter_1.0.0",
                        //                 "TimeFrame": {
                        //                     "Ver": "TimeFrame_1.0.0",
                        //                     "StartDt": {
                        //                         "Ver": "DateTime_1.0.0",
                        //                         "Day": new Date().getDate(),
                        //                         "Month": new Date().getMonth() + 1,
                        //                         "Year": new Date().getFullYear()
                        //                     },
                        //                     "EndDt": {"Ver": "DateTime_1.0.0", "Day": 31, "Month": 12, "Year": 9999}
                        //                 },
                        //                 "Operator": "EQUAL"
                        //             }]
                        //         }],
                        //         "RefDataList": [{
                        //             "Ver": "ReferenceData_1.0.0",
                        //             "Id": id.iorId,
                        //             "Type": {"CDE": "PORTFOLIOIDENTIFIERIORID", "DISP": "PortfolioIdentifierIORID"}
                        //         }]
                        //     },
                        //     "UIID": {"Ver": "UIIDomain_1.0.0"},
                        //     "Resource": "resrc",
                        //     "AppVer": "1.0.0",
                        //     "EnvVer": "MessageEnvelope_1.0.0",
                        //     "APIVer": "apiVer",
                        //     "MsgId": "67854872",
                        //     "ProxyApp": {
                        //         "Ver": "ProxyApp_1.0.0",
                        //         "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
                        //     },
                        //     "SessionId": "sessionId"
                        // }
                        var reqStandingOrders = yahav.prepareRequestUsing({
                            "Ver": "MessageEnvelope_1.0.0",
                            "Payload": {
                                "Ver": "MessagePayload_1.0.0",
                                "RefDataList": [{
                                    "Ver": "ReferenceData_1.0.0",
                                    "Id": idPor,
                                    "Type": {"CDE": "PORTFOLIOIDENTIFIERIORID", "DISP": "PortfolioIdentifierIORID"}
                                }],
                                "DataEntity": [{"Ver": "Mandate_1.0.0", "isArchetype": true}],
                                "Operation": "INQ",
                                "Filters": [{
                                    "Ver": "ORFilter_1.0.0",
                                    "Filters": [{
                                        "Ver": "MandateListFilter_1.0.0",
                                        "MandateStatusCode": {"CDE": "AUTHORIZED", "DISP": "Authorized"},
                                        "Operator": "EQUAL"
                                    }]
                                }]
                            },
                            "UIID": {"Ver": "UIIDomain_1.0.0"},
                            "Resource": "resrc",
                            "MsgId": "27231082",
                            "SessionId": "sessionId"
                        });
                        reqStandingOrders.SecToken = yahav.SecToken;
                        $.ajax({
                            url: urlStandingOrder,
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                                xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqStandingOrders)));
                            },
                            data: JSON.stringify(reqStandingOrders),
                            method: "POST",
                            contentType: "application/json"
                        }).done(function (data) {
                            var dataEntity = data.Payload.DataEntity;

                            function sender(reqStandingOrders1) {
                                var dfd = jQuery.Deferred();

                                $.ajax({
                                    url: "https://digital.yahav.co.il/BaNCSDigitalApp/xfer",
                                    beforeSend: function (xhr) {
                                        xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                                        xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqStandingOrders1)));
                                    },
                                    data: JSON.stringify(reqStandingOrders1),
                                    method: "POST",
                                    contentType: "application/json;charset=UTF-8"
                                })
                                    .done(function (data) {
                                        dfd.resolve(data)
                                    });

                                return dfd.promise();
                            }

                            async function loadStandingOrdersAll() {
                                var reqStandingOrders11 = yahav.prepareRequestUsing({
                                    "Ver": "MessageEnvelope_1.0.0",
                                    "FiId": {"Ver": "Identifier_1.0.0"},
                                    "UIID": {"Ver": "UIIDomain_1.0.0"},
                                    "Payload": {
                                        "Ver": "MessagePayload_1.0.0",
                                        "DataEntity": [{
                                            "Ver": "AccountTransfer_1.0.0",
                                            "isArchetype": true,
                                            "FromAcctRef": {
                                                "Ver": "AccountReference_1.0.0",
                                                "Acct": {
                                                    "Ver": "DemandDepositAccount_1.0.0",
                                                    "AccountId": {
                                                        "Ver": "AccountIdentifier_1.0.0",
                                                        "AcctIds": {"BANKACCOUNTID": ""},
                                                        "Id": {"Ver": "Identifier_1.0.0", "Id": idForXfer},
                                                        "iorId": iorIdForXfer
                                                    },
                                                    "AccountRefDataList": [{
                                                        "Ver": "ReferenceData_1.0.0",
                                                        "Id": idPor,
                                                        "Type": {
                                                            "CDE": "PORTFOLIOIDENTIFIERIORID",
                                                            "DISP": "PortfolioIdentifierIORID"
                                                        }
                                                    }],
                                                    "Type": {"CDE": "DDA", "DISP": "DEMANDDEPOSITACCOUNT"}
                                                }
                                            }
                                        }],
                                        "Operation": "INQ",
                                        "Filters": [{
                                            "Ver": "ANDFilter_1.0.0",
                                            "Filters": [{
                                                "Ver": "TransferListFilter_1.0.0",
                                                "TransferStatus": {
                                                    "Ver": "TransferStatus_1.0.0",
                                                    "StatusCode": {"CDE": "PROCESSING", "DISP": "Processing"}
                                                },
                                                "Operator": "EQUAL"
                                            }, {
                                                "Ver": "TransferListFilter_1.0.0",
                                                "TimeFrame": {
                                                    "Ver": "TimeFrame_1.0.0",
                                                    "StartDt": {
                                                        "Ver": "DateTime_1.0.0",
                                                        "Day": new Date().getDate(),
                                                        "Month": new Date().getMonth() + 1,
                                                        "Year": new Date().getFullYear()
                                                    },
                                                    "EndDt": {
                                                        "Ver": "DateTime_1.0.0",
                                                        "Day": 31,
                                                        "Month": 12,
                                                        "Year": 9999
                                                    }
                                                },
                                                "Operator": "GREATERTHANOREQUAL"
                                            }]
                                        }],
                                        "RefDataList": [{
                                            "Ver": "ReferenceData_1.0.0",
                                            "Id": idPor,
                                            "Type": {
                                                "CDE": "PORTFOLIOIDENTIFIERIORID",
                                                "DISP": "PortfolioIdentifierIORID"
                                            }
                                        }]
                                    },
                                    "Resource": "resrc",
                                    "MsgId": "27231082",
                                    "SessionId": "sessionId"
                                });
                                reqStandingOrders11.SecToken = yahav.SecToken;
                                await sender(reqStandingOrders11);
                                var reqStandingOrders22 = yahav.prepareRequestUsing({
                                    "Ver": "MessageEnvelope_1.0.0",
                                    "FiId": {"Ver": "Identifier_1.0.0"},
                                    "UIID": {"Ver": "UIIDomain_1.0.0"},
                                    "Payload": {
                                        "Ver": "MessagePayload_1.0.0",
                                        "DataEntity": [{
                                            "Ver": "AccountRecurTransfer_1.0.0",
                                            "isArchetype": true,
                                            "FromAcctRef": {
                                                "Ver": "AccountReference_1.0.0",
                                                "Acct": {
                                                    "Ver": "DemandDepositAccount_1.0.0",
                                                    "AccountId": {
                                                        "Ver": "AccountIdentifier_1.0.0",
                                                        "AcctIds": {"BANKACCOUNTID": ""},
                                                        "Id": {"Ver": "Identifier_1.0.0", "Id": id},
                                                        "iorId": iorIdForXfer
                                                    },
                                                    "AccountRefDataList": [{
                                                        "Ver": "ReferenceData_1.0.0",
                                                        "Id": idPor,
                                                        "Type": {
                                                            "CDE": "PORTFOLIOIDENTIFIERIORID",
                                                            "DISP": "PortfolioIdentifierIORID"
                                                        }
                                                    }],
                                                    "Type": {"CDE": "DDA", "DISP": "DEMANDDEPOSITACCOUNT"}
                                                }
                                            }
                                        }],
                                        "Operation": "INQ",
                                        "Filters": [{
                                            "Ver": "ANDFilter_1.0.0",
                                            "Filters": [{
                                                "Ver": "TransferListFilter_1.0.0",
                                                "TransferStatus": {
                                                    "Ver": "TransferStatus_1.0.0",
                                                    "StatusCode": {"CDE": "SCHEDULED", "DISP": "Scheduled"}
                                                },
                                                "Operator": "EQUAL"
                                            }, {
                                                "Ver": "TransferListFilter_1.0.0",
                                                "TimeFrame": {
                                                    "Ver": "TimeFrame_1.0.0",
                                                    "StartDt": {
                                                        "Ver": "DateTime_1.0.0",
                                                        "Day": new Date().getDate(),
                                                        "Month": new Date().getMonth() + 1,
                                                        "Year": new Date().getFullYear()
                                                    },
                                                    "EndDt": {
                                                        "Ver": "DateTime_1.0.0",
                                                        "Day": 31,
                                                        "Month": 12,
                                                        "Year": 9999
                                                    }
                                                },
                                                "Operator": "EQUAL"
                                            }]
                                        }],
                                        "RefDataList": [{
                                            "Ver": "ReferenceData_1.0.0",
                                            "Id": idPor,
                                            "Type": {
                                                "CDE": "PORTFOLIOIDENTIFIERIORID",
                                                "DISP": "PortfolioIdentifierIORID"
                                            }
                                        }]
                                    },
                                    "Resource": "resrc",
                                    "MsgId": "27231082",
                                    "SessionId": "sessionId"
                                });
                                reqStandingOrders22.SecToken = yahav.SecToken;
                                const data = await sender(reqStandingOrders22);
                                var dataEntity = data.Payload.DataEntity;
                                if (dataEntity !== undefined) {
                                    for (let i = 0; i < dataEntity.length; i++) {
                                        const v = dataEntity[i];
                                        var reqStandingOrders33 = yahav.prepareRequestUsing({
                                            "Ver": "MessageEnvelope_1.0.0",
                                            "FiId": {"Ver": "Identifier_1.0.0"},
                                            "UIID": {"Ver": "UIIDomain_1.0.0"},

                                            "Payload": {
                                                "Ver": "MessagePayload_1.0.0",
                                                "DataEntity": [{
                                                    "Ver": "AccountRecurTransfer_1.0.0",
                                                    "isArchetype": true,
                                                    "RecurTfrId": {"Ver": "Identifier_1.0.0", "Id": v.RecurTfrId.Id}
                                                }],
                                                "Operation": "INQ",
                                                "RefDataList": [{
                                                    "Ver": "ReferenceData_1.0.0",
                                                    "Id": idPor,
                                                    "Type": {
                                                        "CDE": "PORTFOLIOIDENTIFIERIORID",
                                                        "DISP": "PortfolioIdentifierIORID"
                                                    }
                                                }]
                                            },
                                            "Resource": "resrc",
                                            "MsgId": "27231082",
                                            "SessionId": "sessionId"
                                        });
                                        reqStandingOrders33.SecToken = yahav.SecToken;
                                        const data1 = await sender(reqStandingOrders33);
                                        var dataEntity1 = data1.Payload.DataEntity[0];
                                        let iDay = 1;
                                        if (v.RecurModel && v.RecurModel.RecRuleList && v.RecurModel.RecRuleList.length) {
                                            if (v.RecurModel.RecRuleList.length === 1) {
                                                iDay = 0;
                                            }
                                        }
                                        all.banks.generalVariables.allDataArrStandingOrders.push({
                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                            "Token": all.banks.accountDetails.bank.token,
                                            "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                            "AccountNumber": acc.AccountNumber,
                                            "BranchNumber": acc.BranchNumber,
                                            "OrderName": null,
                                            "OrderOpeningDate": null,
                                            "OrderLastDate": v.RecurModel && v.RecurModel.RecRuleList && v.RecurModel.RecRuleList.length && v.RecurModel.RecRuleList[iDay].StartDay ? all.banks.core.services.convertDateAll(v.RecurModel.RecRuleList[iDay].StartDay.Month + '/' + v.RecurModel.RecRuleList[iDay].StartDay.Day + '/' + v.RecurModel.RecRuleList[iDay].StartDay.Year) : null,
                                            "OrderTotal": dataEntity1.Amount.Amt ? dataEntity1.Amount.Amt.Value : v.Amount.Amt.Value,
                                            "OrderNumber": null,
                                            "Asmachta": dataEntity1.RecurTfrId.Id,
                                            BankTransferNumber: dataEntity1.ToAcct.AccountId.AcctIds.BANKACCOUNTID.substr(0, 2),
                                            BranchTransferNumber: dataEntity1.ToAcct.AccountId.AcctIds.BANKACCOUNTID.substr(2, 3),
                                            AccountTransferNumber: dataEntity1.ToAcct.AccountId.AcctIds.BANKACCOUNTID.substring(5, dataEntity1.ToAcct.AccountId.AcctIds.BANKACCOUNTID.length),
                                            NamePayerTransfer: dataEntity1.ToAcct.AccountRefDataList[0].Desc,
                                            Type: 2,
                                        });
                                        if (dataEntity.length == i + 1) {
                                            if (yahav.indAcc + 1 == yahav.acc.length) {
                                                yahav.sendStandingOrdersCtrl();
                                            } else {
                                                yahav.indAcc += 1;
                                                yahav.loadStandingOrders();
                                            }
                                        }
                                    }
                                } else {
                                    if (yahav.indAcc + 1 == yahav.acc.length) {
                                        yahav.sendStandingOrdersCtrl();
                                    } else {
                                        yahav.indAcc += 1;
                                        yahav.loadStandingOrders();
                                    }
                                }
                            }

                            if (dataEntity !== undefined) {
                                //console.log("loadStandingOrdersData: ", JSON.stringify(dataEntity));
                                $.each(dataEntity, function (i, v) {
                                    all.banks.generalVariables.allDataArrStandingOrders.push({
                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                        "Token": all.banks.accountDetails.bank.token,
                                        "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                        "AccountNumber": acc.AccountNumber,
                                        "BranchNumber": acc.BranchNumber,
                                        "OrderName": v.Orgntr.Orgntr.OrgData.NameList[0].Name,
                                        "OrderOpeningDate": v.CrtnDt != undefined ? all.banks.core.services.convertDateAll(v.CrtnDt.Month + '/' + v.CrtnDt.Day + '/' + v.CrtnDt.Year) : null,
                                        "OrderLastDate": v.LstTrntnDt != undefined ? all.banks.core.services.convertDateAll(v.LstTrntnDt.Month + '/' + v.LstTrntnDt.Day + '/' + v.LstTrntnDt.Year) : null,
                                        "OrderTotal": v.LstTrntnAmt.Amt.Value,
                                        "OrderNumber": v.Orgntr.Orgntr.OrgntrId.Id,
                                        "Asmachta": "",
                                        BankTransferNumber: null,
                                        BranchTransferNumber: null,
                                        AccountTransferNumber: null,
                                        NamePayerTransfer: null,
                                        Type: 1,
                                    });
                                });
                                loadStandingOrdersAll();
                            } else {
                                loadStandingOrdersAll();
                            }
                        });
                    }

                    loadStandingOrdersData();
                })
            }
        })
    };
    yahav.sendStandingOrdersCtrl = function () {
        all.banks.core.services.sendStandingOrders(all.banks.generalVariables.allDataArrStandingOrders)
            .then(function (arr) {
                yahav.indAcc = 0;
                yahav.loadDueChecks();
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    yahav.sendStandingOrdersCtrl();
                }
            })
    }
    yahav.loadDueChecks = function () {
        $(yahav.acc).each(function (i, v) {
            if (i == yahav.indAcc) {
                var id = v.Prtflio.Id;
                var reqAcc = yahav.prepareRequestUsing({
                    "Ver": "MessageEnvelope_1.0.0",
//                    "Device": {
//                        "Ver": "Device_1.0.0",
//                        "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                        "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                        "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                    },
//                    "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                    "Payload": {
                        "Ver": "MessagePayload_1.0.0",
                        "DataEntity": [{
                            "Ver": "PortfolioAccountRelationship_1.0.0",
                            "isArchetype": true,
                            "Id": {"Ver": "Identifier_1.0.0", "isArchetype": true},
                            "Prtflio": {
                                "Ver": "Portfolio_1.0.0",
                                "isArchetype": true,
                                "Id": {
                                    "Ver": "PortfolioIdentifier_1.0.0",
                                    "PortFoId": {"INTERNALIDENTIFIER": ""},
                                    "iorId": id.iorId,
                                    "Id": id.Id
                                }
                            }
                        }],
                        "Operation": "INQ",
                        "RefDataList": [{
                            "Ver": "ReferenceData_1.0.0",
                            "Id": id.iorId,
                            "Type": {
                                "CDE": "PORTFOLIOIDENTIFIERIORID",
                                "DISP": "PortfolioIdentifierIORID"
                            }
                        }],
                        "Filters": [{
                            "Ver": "ANDFilter_1.0.0",
                            "Filters": [{
                                "Ver": "AccountListFilter_1.0.0",
                                "Type": {"CDE": "DDA", "DISP": "DEMANDDEPOSITACCOUNT"},
                                "Operator": "EQUAL"
                            }, {
                                "Ver": "AccountListFilter_1.0.0",
                                "Currency": {
                                    "Ver": "Currency_1.0.0",
                                    "isArchetype": true,
                                    "Code": {"CDE": "ILS", "DISP": "Shekel"}
                                },
                                "Operator": "EQUAL"
                            }]
                        }]
                    },
                    "UIID": {"Ver": "UIIDomain_1.0.0"},
                    "Resource": "resrc",
//                    "AppVer": "1.0.0",
//                    "EnvVer": "MessageEnvelope_1.0.0",
//                    "APIVer": "apiVer",
                    "MsgId": "64009602",
//                    "ProxyApp": {
//                        "Ver": "ProxyApp_1.0.0",
//                        "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36"
//                    },
                    "SessionId": "sessionId"
                });
                reqAcc.SecToken = yahav.SecToken;
                var idPor = id.iorId;
                var acc = {
                    "BankNumber": parseFloat(all.banks.accountDetails.bank.BankNumber),
                    'AccountNumber': parseFloat(v.Prtflio.Id.Id.split(new RegExp(v.Prtflio.Brnch.FiLocatnId.Id + '(\\d+)', 'g'))[1].toString()),
                    'BranchNumber': parseFloat(v.Prtflio.Brnch.FiLocatnId.Id.toString())
                };
                $.ajax({
                    url: "https://digital.yahav.co.il/BaNCSDigitalApp/account",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                        xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqAcc)));
                    },
                    data: JSON.stringify(reqAcc),
                    method: "POST",
                    contentType: "application/json"
                }).done(function (data) {
                    var dataInfo = data;
                    var id = dataInfo.Payload.DataEntity[0].Account.AccountId.Id.Id;
                    var iorId = dataInfo.Payload.DataEntity[0].Account.AccountId.iorId;

                    var urlChecks = "https://digital.yahav.co.il/BaNCSDigitalApp/check";

                    function loadDueChecksData() {
                        var reqDueChecks = yahav.prepareRequestUsing({
                            "Ver": "MessageEnvelope_1.0.0",
//                            "Device": {
//                                "Ver": "Device_1.0.0",
//                                "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                                "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                                "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                            },
//                            "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                            "Payload": {
                                "Ver": "MessagePayload_1.0.0",
                                "DataEntity": [{
                                    "Ver": "CheckCredit_1.0.0.BY.1.0",
                                    "isArchetype": true,
                                    "AccountId": {
                                        "Ver": "AccountIdentifier_1.0.0",
                                        "AcctIds": {"BANKACCOUNTID": ""},
                                        "Id": {"Ver": "Identifier_1.0.0", "Id": id},
                                        "iorId": iorId
                                    }
                                }],
                                "Operation": "INQ",
                                "Category": ["min"],
                                "Filters": [{
                                    "Ver": "ANDFilter_1.0.0",
                                    "Filters": [{
                                        "Ver": "CheckCreditListFilter_1.0.0",
                                        "Operator": "EQUAL",
                                        "Status": {
                                            "Ver": "CreditStatus_1.0.0",
                                            "StatusCode": {"CDE": "PROCESSING", "DISP": "Processing"}
                                        }
                                    }]
                                }],
                                "RefDataList": [{
                                    "Ver": "ReferenceData_1.0.0",
                                    "Id": id.iorId,
                                    "Type": {"CDE": "PORTFOLIOIDENTIFIERIORID", "DISP": "PortfolioIdentifierIORID"}
                                }]
                            },
                            "UIID": {"Ver": "UIIDomain_1.0.0"},
                            "Resource": "resrc",
//                            "AppVer": "1.0.0",
//                            "EnvVer": "MessageEnvelope_1.0.0",
//                            "APIVer": "apiVer",
                            "MsgId": "67854869",
//                            "ProxyApp": {
//                                "Ver": "ProxyApp_1.0.0",
//                                "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
//                            },
                            "SessionId": "sessionId"
                        });
                        reqDueChecks.SecToken = yahav.SecToken;
                        $.ajax({
                            url: urlChecks,
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                                xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqDueChecks)));
                            },
                            data: JSON.stringify(reqDueChecks),
                            method: "POST",
                            contentType: "application/json"
                        }).done(function (data) {
                            var dataEntity = data.Payload.DataEntity;
                            if (dataEntity !== undefined) {
                                for (const de of dataEntity) {
                                    if (!de.MediaItemList || !(de.MediaItemList.length > 0)) {
                                        continue;
                                    }

                                    try {
                                        const dueCheck = Object.assign({
                                            'TargetId': all.banks.accountDetails.bank.targetId,
                                            'Token': all.banks.accountDetails.bank.token,
                                            'ExtractDate': new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                            'ExporterId': all.banks.spiderConfig.spiderId,
                                            'CheckDescription': de.RefData.Id,
                                            'DueDate': new Date(de.Status.EffDt.Year, de.Status.EffDt.Month - 1, de.Status.EffDt.Day).toLocaleDateString('en-GB')
                                        }, acc);

                                        for (const mi of de.MediaItemList) {
                                            all.banks.generalVariables.allDataArrDueChecks.push(
                                                Object.assign(dueCheck, {
                                                    'CheckNumber': mi.CckDta.CkhNum,
                                                    'DepositeDate': mi.CckDta.OrgtnDt.Year,
                                                    'CheckTotal': mi.CckDta.EntrdAmt.Amt.Value,
                                                    'CheckBankNumber': mi.CckDta.DrwrDta.DrwFILctn.FiIdent.Id.Id,
                                                    'CheckBranchNumber': mi.CckDta.DrwrDta.DrwFILctn.FiLocatnId.Id.replace(mi.CckDta.DrwrDta.DrwFILctn.FiIdent.Id.Id, ''),
                                                    'CheckAccountNumber': mi.CckDta.DrwrDta.DrwrAcctId.Id.Id
                                                })
                                            );
                                        }
                                    } catch (e) {
                                        console.error('Due check build failed.', e);
                                    }
                                }
                                //console.log("loadDueChecksData: ", JSON.stringify(dataEntity));
//								loadDueChecksRepaid();
                            }
//							else {
//								loadDueChecksRepaid();
//							}
                            if (yahav.indAcc + 1 == yahav.acc.length) {
                                yahav.sendDueChecksCtrl();
                            } else {
                                yahav.indAcc += 1;
                                yahav.loadDueChecks();
                            }
                        });
                    }

//					function loadDueChecksRepaid() {
//						var reqDueChecksRepaid = {
//							"Ver": "MessageEnvelope_1.0.0",
//							"Device": {
//								"Ver": "Device_1.0.0",
//								"DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//								"Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//								"OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//							},
//							"Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
//							"Payload": {
//								"Ver": "MessagePayload_1.0.0",
//								"DataEntity": [{
//									"Ver": "CheckCredit_1.0.0.BY.1.0",
//									"isArchetype": true,
//									"AccountId": {
//										"Ver": "AccountIdentifier_1.0.0",
//										"AcctIds": {"BANKACCOUNTID": ""},
//										"Id": {"Ver": "Identifier_1.0.0", "Id": id},
//										"iorId": iorId
//									}
//								}],
//								"Operation": "INQ",
//								"Category": ["min"],
//								"Filters": [{
//									"Ver": "ANDFilter_1.0.0",
//									"Filters": [{
//										"Ver": "CheckCreditListFilter_1.0.0",
//										"Operator": "EQUAL",
//										"Status": {
//											"Ver": "CreditStatus_1.0.0",
//											"StatusCode": {"CDE": "PAID", "DISP": "Paid"}
//										}
//									}]
//								}],
//								"RefDataList": [{
//									"Ver": "ReferenceData_1.0.0",
//									"Id": id.iorId,
//									"Type": {"CDE": "PORTFOLIOIDENTIFIERIORID", "DISP": "PortfolioIdentifierIORID"}
//								}]
//							},
//							"UIID": {"Ver": "UIIDomain_1.0.0"},
//							"Resource": "resrc",
//							"AppVer": "1.0.0",
//							"EnvVer": "MessageEnvelope_1.0.0",
//							"APIVer": "apiVer",
//							"MsgId": "67854870",
//							"ProxyApp": {
//								"Ver": "ProxyApp_1.0.0",
//								"UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
//							},
//							"SessionId": "sessionId"
//						}
//						reqDueChecksRepaid.SecToken = yahav.SecToken;
//						$.ajax({
//							url: urlChecks,
//							beforeSend: function (xhr) {
//								xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
//							},
//							data: JSON.stringify(reqDueChecksRepaid),
//							method: "POST",
//							contentType: "application/json"
//						}).done(function (data) {
//							var dataEntity = data.Payload.DataEntity;
//							if (dataEntity !== undefined) {
//								for(const de of dataEntity) {
//									if(!de.MediaItemList || !(de.MediaItemList.length > 0)) {
//										continue;
//									}
//
//									try {
//										const dueCheck = Object.assign({
//											'TargetId': all.banks.accountDetails.bank.targetId,
//											'Token': all.banks.accountDetails.bank.token,
//											'ExtractDate': new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
//											'ExporterId': all.banks.spiderConfig.spiderId,
//											'CheckDescription': de.RefData.Id,
//											'DueDate': new Date(de.Status.EffDt.Year, de.Status.EffDt.Month - 1, de.Status.EffDt.Day).toLocaleDateString('en-GB')
//										}, acc);
//
//										for(const mi of de.MediaItemList) {
//											all.banks.generalVariables.allDataArrDueChecks.push(
//												Object.assign(dueCheck, {
//													'CheckNumber': mi.CckDta.CkhNum,
//													'DepositeDate': mi.CckDta.OrgtnDt.Year,
//													'CheckTotal': mi.CckDta.EntrdAmt.Amt.Value,
//													'CheckBankNumber': mi.CckDta.DrwrDta.DrwFILctn.FiIdent.Id.Id,
//													'CheckBranchNumber': mi.CckDta.DrwrDta.DrwFILctn.FiLocatnId.Id.replace(mi.CckDta.DrwrDta.DrwFILctn.FiIdent.Id.Id, ''),
//													'CheckAccountNumber': mi.CckDta.DrwrDta.DrwrAcctId.Id.Id
//												})
//											);
//										}
//									} catch(e) {
//										console.error('Due check build failed.', e);
//                                                                        }
//								}
//								// console.log("loadDueChecksRepaid: ", JSON.stringify(dataEntity));
//
//								if (yahav.indAcc + 1 == yahav.acc.length) {
//									yahav.sendDueChecksCtrl();
//								}
//								else {
//									yahav.indAcc += 1;
//									yahav.loadDueChecks();
//								}
//							}
//							else {
//								if (yahav.indAcc + 1 == yahav.acc.length) {
//									yahav.sendDueChecksCtrl();
//								}
//								else {
//									yahav.indAcc += 1;
//									yahav.loadDueChecks();
//								}
//							}
//						});
//					}

                    loadDueChecksData();
                })
                return false;
            }
        })
    };
    yahav.sendDueChecksCtrl = function () {
        all.banks.core.services.sendDueChecks(all.banks.generalVariables.allDataArrDueChecks)
            .then(function (arr) {
                yahav.indAcc = 0;
                myEmitterLogs(24);

                if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                    myEmitterLogs(34);
                    yahav.loadMatah();
                } else {
                    yahav.logOut();
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    yahav.sendDueChecksCtrl()
                }
            })
    };
    yahav.loadMatah = function () {
        $(yahav.acc).each(function (i, v) {
            if (i == yahav.indAcc) {
                var id = v.Prtflio.Id;
                var reqAcc = yahav.prepareRequestUsing({
                    "Ver": "MessageEnvelope_1.0.0",
//                    "Device": {
//                        "Ver": "Device_1.0.0",
//                        "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                        "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                        "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                    },
//                    "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                    "Payload": {
                        "Ver": "MessagePayload_1.0.0",
                        "DataEntity": [{
                            "Ver": "PortfolioAccountRelationship_1.0.0",
                            "isArchetype": true,
                            "Id": {"Ver": "Identifier_1.0.0", "isArchetype": true},
                            "Prtflio": {
                                "Ver": "Portfolio_1.0.0",
                                "isArchetype": true,
                                "Id": {
                                    "Ver": "PortfolioIdentifier_1.0.0",
                                    "PortFoId": {"INTERNALIDENTIFIER": ""},
                                    "iorId": id.iorId,
                                    "Id": id.Id
                                }
                            }
                        }],
                        "Category": ["min"],
                        "Operation": "INQ",
                        "Filters": [{
                            "Ver": "ANDFilter_1.0.0",
                            "Filters": [{
                                "Ver": "AccountListFilter_1.0.0",
                                "Type": {"CDE": "DDA", "DISP": "DEMANDDEPOSITACCOUNT"},
                                "Operator": "EQUAL"
                            }, {
                                "Ver": "AccountListFilter_1.0.0",
                                "Currency": {
                                    "Ver": "Currency_1.0.0",
                                    "isArchetype": true,
                                    "Code": {"CDE": "ILS", "DISP": "שקל"}
                                },
                                "Operator": "NOTEQUAL"
                            }]
                        }],
                        "RefDataList": [{
                            "Ver": "ReferenceData_1.0.0",
                            "Id": id.iorId,
                            "Type": {"CDE": "PORTFOLIOIDENTIFIERIORID", "DISP": "PortfolioIdentifierIORID"}
                        }]
                    },
                    "UIID": {"Ver": "UIIDomain_1.0.0"},
                    "Resource": "resrc",
//                    "AppVer": "1.0.0",
//                    "EnvVer": "MessageEnvelope_1.0.0",
//                    "APIVer": "apiVer",
                    "MsgId": "68899241",
//                    "ProxyApp": {
//                        "Ver": "ProxyApp_1.0.0",
//                        "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
//                    },
                    "SessionId": "sessionId"
                });
                reqAcc.SecToken = yahav.SecToken;
                var idPor = id.iorId;
                $.ajax({
                    url: "https://digital.yahav.co.il/BaNCSDigitalApp/account",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                        xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqAcc)));
                    },
                    data: JSON.stringify(reqAcc),
                    method: "POST",
                    contentType: "application/json"
                }).done(function (data) {
                    var dataInfo = data.Payload.DataEntity;

                    loadDataMatah(dataInfo);

                    function loadDataMatah(accMatah) {
                        if (accMatah !== undefined && accMatah.length) {
                            $(accMatah).each(function (ind, vals) {

                                var jsonBalanc = yahav.prepareRequestUsing({
                                    "Ver": "MessageEnvelope_1.0.0",
//                                    "Device": {
//                                        "Ver": "Device_1.0.0",
//                                        "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                                        "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                                        "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                                    },
//                                    "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                                    "Payload": {
                                        "Ver": "MessagePayload_1.0.0",
                                        "DataEntity": [{
                                            "Ver": "DemandDepositAccount_1.0.0",
                                            "AccountId": {
                                                "Ver": "AccountIdentifier_1.0.0",
                                                "AcctIds": {"BANKACCOUNTID": ""},
                                                "Id": {
                                                    "Ver": "Identifier_1.0.0",
                                                    "Id": vals.Account.AccountId.Id.Id
                                                },
                                                "iorId": vals.Account.AccountId.iorId
                                            },

                                            "Currency": {"Ver": "Currency_1.0.0", "isArchetype": true},
                                            "Use": {"CDE": "BUSINESS", "DISP": "ביזנס"},
                                            "Type": {"CDE": "DDA", "DISP": "DEMANDDEPOSITACCOUNT"},
                                            "OpenDt": {"Ver": "Date_1.0.0", "isArchetype": true},
                                            "BalanceList": [{
                                                "Ver": "AccountBalance_1.0.0",
                                                "isArchetype": true,
                                                "CurrAmt": {
                                                    "Ver": "CurrencyAmount_1.0.0",
                                                    "isArchetype": true,
                                                    "Amt": {"Ver": "Amount_1.0.0", "isArchetype": true}
                                                }
                                            }]
                                        }],
                                        "Operation": "INQ",
                                        "RefDataList": [{
                                            "Ver": "ReferenceData_1.0.0",
                                            "Id": idPor,
                                            "Type": {
                                                "CDE": "PORTFOLIOIDENTIFIERIORID",
                                                "DISP": "PortfolioIdentifierIORID"
                                            }
                                        }]
                                    },
                                    "UIID": {"Ver": "UIIDomain_1.0.0"},
                                    "Resource": "resrc",
//                                    "AppVer": "1.0.0",
//                                    "EnvVer": "MessageEnvelope_1.0.0",
//                                    "APIVer": "apiVer",
                                    "MsgId": "42805212",
//                                    "ProxyApp": {
//                                        "Ver": "ProxyApp_1.0.0",
//                                        "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
//                                    },
                                    "SessionId": "sessionId"
                                });
                                jsonBalanc.SecToken = yahav.SecToken;
                                $.ajax({
                                    url: "https://digital.yahav.co.il/BaNCSDigitalApp/account",
                                    beforeSend: function (xhr) {
                                        xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                                        xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(jsonBalanc)));
                                    },
                                    data: JSON.stringify(jsonBalanc),
                                    method: "POST",
                                    contentType: "application/json"
                                }).done(function (data) {
                                    var acc = {
                                        "BankNumber": parseFloat(all.banks.accountDetails.bank.BankNumber),
                                        'AccountNumber': parseFloat(v.Prtflio.Id.Id.split(new RegExp(v.Prtflio.Brnch.FiLocatnId.Id + '(\\d+)', 'g'))[1].toString()),
                                        'BranchNumber': parseFloat(v.Prtflio.Brnch.FiLocatnId.Id.toString()),
                                        "BankAccountTypeId": parseFloat(data.Payload.DataEntity[0].AccountId.Id.Id), //vals.Account.Title.split(':')[0],
                                        "Balance": vals.Account.BalanceList[1].CurrAmt.Amt.Value, //data.Payload.DataEntity[0].BalanceList[1].CurrAmt.Amt.Value,
                                        "CurrencyId": all.banks.core.services.getTypeCurrencyAll(vals.Account.Currency.Code.CDE)
                                    };
                                    all.banks.generalVariables.allDataArrMatah.BankData[0].Account.push(acc);
                                    all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow = [];

                                    //send request between dates
                                    var reqMatahInDate = yahav.prepareRequestUsing({
                                        "Ver": "MessageEnvelope_1.0.0",
//                                        "Device": {
//                                            "Ver": "Device_1.0.0",
//                                            "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
//                                            "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
//                                            "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
//                                        },
//                                        "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
                                        "Payload": {
                                            "Ver": "MessagePayload_1.0.0",
                                            "DataEntity": [{
                                                "Ver": "Transaction_1.0.0",
                                                "AccountId": {
                                                    "Ver": "AccountIdentifier_1.0.0",
                                                    "AcctIds": {"BANKACCOUNTID": ""},
                                                    "Id": {
                                                        "Ver": "Identifier_1.0.0",
                                                        "Id": vals.Account.AccountId.Id.Id
                                                    },
                                                    "iorId": vals.Account.AccountId.iorId
                                                }
                                            }],
                                            "Operation": "INQ",
                                            "Category": [""],
                                            "RefDataList": [{
                                                "Ver": "ReferenceData_1.0.0",
                                                "Id": idPor,
                                                "Type": {
                                                    "CDE": "PORTFOLIOIDENTIFIERIORID",
                                                    "DISP": "PortfolioIdentifierIORID"
                                                }
                                            }],
                                            "Filters": [{
                                                "Ver": "ANDFilter_1.0.0",
                                                "Filters": [{
                                                    "Ver": "TransactionListFilter_1.0.0",
                                                    "OrigDt": {
                                                        "Ver": "Date_1.0.0",
                                                        "Day": all.banks.accountDetails.dateFromMatah.getDate(),
                                                        "Month": (all.banks.accountDetails.dateFromMatah.getMonth() + 1),
                                                        "Year": all.banks.accountDetails.dateFromMatah.getFullYear()
                                                    },
                                                    "Operator": "GREATERTHANOREQUAL"
                                                }, {
                                                    "Ver": "TransactionListFilter_1.0.0",
                                                    "OrigDt": {
                                                        "Ver": "Date_1.0.0",
                                                        "Day": all.banks.accountDetails.dateToMatah.getDate(),
                                                        "Month": (all.banks.accountDetails.dateToMatah.getMonth() + 1),
                                                        "Year": all.banks.accountDetails.dateToMatah.getFullYear()
                                                    },
                                                    "Operator": "LESSTHANOREQUAL"
                                                }]
                                            }]
                                        },
                                        "UIID": {"Ver": "UIIDomain_1.0.0"},
                                        "Resource": "resrc",
//                                        "AppVer": "1.0.0",
//                                        "EnvVer": "MessageEnvelope_1.0.0",
//                                        "APIVer": "apiVer",
                                        "MsgId": "67854862",
//                                        "ProxyApp": {
//                                            "Ver": "ProxyApp_1.0.0",
//                                            "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"
//                                        },
                                        "SessionId": "sessionId"
                                    });
                                    reqMatahInDate.SecToken = yahav.SecToken;
                                    $.ajax({
                                        url: "https://digital.yahav.co.il/BaNCSDigitalApp/account",
                                        beforeSend: function (xhr) {
                                            xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                                            xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqMatahInDate)));
                                        },
                                        data: JSON.stringify(reqMatahInDate),
                                        method: "POST",
                                        contentType: "application/json"
                                    }).done(function (data) {
                                        var dataEntity = data.Payload.DataEntity;
                                        if (dataEntity !== undefined && dataEntity.length) {
                                            // console.log("loadDataMatah: ", JSON.stringify(dataEntity));
                                            $.each(dataEntity, function (i, v) {
                                                var dates = v.OrigDt;
                                                if (v.TotalCurAmt.Amt.Value.indexOf("-") == -1) {
                                                    var transactionType = 1;
                                                } else {
                                                    var transactionType = 0;
                                                }
                                                all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.push({
                                                    "Asmachta": parseFloat(v.TxnId.TxnIds.TRANSACTIONID.replace(/\D/g, "")),
                                                    "TransDesc": yahav.reverseText(v.Memo),
                                                    "ValueDate": all.banks.core.services.convertDateAll(("0" + (dates.Month)).slice(-2) + '/' + ("0" + (dates.Day)).slice(-2) + '/' + dates.Year),
                                                    "TransactionType": transactionType,
                                                    "TransTotal": all.banks.core.services.parseSum(Math.abs(v.TotalCurAmt.Amt.Value)),
                                                    "Balance": all.banks.core.services.parseSum(v.StmtRunningBal[0].CurrAmt.Amt.Value),
                                                    "IsDaily": "0",
                                                    "imgs": null,
                                                    "DepositeTransferData": null
                                                });
                                                if (dataEntity.length == i + 1) {
                                                    accMatah.splice(0, 1);
                                                    if (accMatah.length == 0) {
                                                        if (yahav.indAcc + 1 == yahav.acc.length) {
                                                            yahav.sendOshCtrl(true);
                                                        } else {
                                                            yahav.indAcc += 1;
                                                            yahav.loadMatah();
                                                        }
                                                    } else {
                                                        loadDataMatah(accMatah);
                                                    }
                                                }
                                            })

                                        } else {
                                            if (accMatah.length >= 1) {
                                                accMatah.splice(0, 1);
                                                loadDataMatah(accMatah);
                                            } else if (accMatah.length == 0) {
                                                if (yahav.indAcc + 1 == yahav.acc.length) {
                                                    yahav.sendOshCtrl(true);
                                                } else {

                                                    yahav.indAcc += 1;
                                                    yahav.loadMatah();
                                                }
                                            } else {
                                                loadDataMatah(accMatah);
                                            }

                                        }
                                    });
                                })
                                return false;

                            });
                        } else {
                            if (yahav.indAcc + 1 == yahav.acc.length) {
                                yahav.sendOshCtrl(true);
                            } else {

                                yahav.indAcc += 1;
                                yahav.loadMatah();
                            }
                        }
                    }
                })
                return false;
            }
        })
    };
    yahav.logOut = function () {
        var reqLogOut = yahav.prepareRequestUsing({
            "Ver": "MessageEnvelope_1.0.0",
            "Device": {
                "Ver": "Device_1.0.0",
                "DeviceId": {"Ver": "DeviceIdentifier_1.0.0"},
                "Type": {"CDE": "HOMECOMPUTER", "DISP": "Home Computer"},
                "OperatingSystem": {"Ver": "OperatingSystem_1.0.0", "Name": "MacIntel"}
            },
            "TimeStamp": {
                "Ver": "Timestamp_1.0.0",
                "Dttime": {
                    "Ver": "DateTime_1.0.0",
                    "Timezone": {"Ver": "TimeZone_1.0.0", "UTCOffsetHour": 5, "UTCOffsetMinute": 0, "Abbr": "UTC"},
                    "Day": 16,
                    "Year": 2019,
                    "Month": 10,
                    "Hour": 4,
                    "Minute": 52,
                    "Second": 0,
                    "Fraction": 118
                }
            },
            "Locale": {"CDE": "IW_IL", "DISP": "Hebrew Israel"},
            "SecToken": {
                "Ver": "SecurityToken_1.0.0",
                "Token": [{
                    "Ver": "SMSessionValidatedToken_1.0.0",
                    "TokenId": "1cdb03b5-a7e0-462e-bb42-574618811900",
                    "Type": {"CDE": "AUTHENTICATION", "DISP": "Authentication"},
                    "Issuer": "AuthenticationTokenIssuer_1.0.0",
                    "Expiry": {
                        "Ver": "DateTime_1.0.0",
                        "Year": 2019,
                        "Month": 10,
                        "Day": 16,
                        "Hour": 8,
                        "Minute": 21,
                        "Second": 44
                    },
                    "Signature": "1098ed61344b6b62c36b95e4867a71fbac807dc99e059d4cfd263211b51bf8561fa208f7d9237dc4d64f9cec88d05149097d9dd049ee753d44b81b85dce179012c97bd97fa0aab97cfa2ccbbf067ad27182e17148a5133ff9a1ae9622e73c3cf2a6f3ee7d25fb5247bddf39a84aaa14cfd52c11e6a051fcd395213c669e1b693"
                }]
            },
            "FiId": {"Ver": "Identifier_1.0.0"},
            "Payload": {
                "Ver": "MessagePayload_1.0.0",
                "DataEntity": [{
                    "Ver": "LoginUserCredentials_1.0.0",
                    "PrimaryVerData": {
                        "Ver": "SMSessionVerificationData_1.0.0",
                        "isArchetype": true,
                        "SMSession": {"Ver": "Secret_1.0.0", "isArchetype": true}
                    },
                    "DomainAddr": [{
                        "Ver": "DomainAddress_1.0.0",
                        "isArchetype": false,
                        "PlatformId": "Retail",
                        "AppId": "Bancs"
                    }],
                    "VerId": {
                        "Ver": "StringVerificationIdentifier_1.0.0",
                        "UserId": {
                            "Ver": "UserIdentifier_1.0.0",
                            "isArchetype": false,
                            "ObjId": "RetailUser",
                            "UserStatus": {"CDE": "ACTIVE", "DISP": "ACTIVE"}
                        },
                        "NAME": "."
                    },
                    "CredScope": {"CDE": "LOGIN", "DISP": "LOGIN"}
                }],
                "Operation": "INVLD",
                "Category": ["min"]
            },
            "UIID": {"Ver": "UIIDomain_1.0.0"},
            "DgtlTxnId": {"Ver": "Identifier_1.0.0"},
            "Resource": "https://digital.yahav.co.il//BaNCSDigitalApp/logout",
            "AppVer": "BaNCSDigital.Web_1.3.46.BY.1.1.38.FP2",
            "EnvVer": "MessageEnvelope_1.0.0",
            "APIVer": "GDM_1.0.88",
            "MsgId": "94929931",
            "ProxyApp": {
                "Ver": "ProxyApp_1.0.0",
                "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36",
                "Typ": {"CDE": "BROWSER", "DISP": "Browser"}
            },
            "ClientApp": {
                "Ver": "Application_1.0.0",
                "Id": {"Ver": "Identifier_1.0.0"},
                "BldDt": {"Ver": "DateTime_1.0.0", "Timezone": {"Ver": "TimeZone_1.0.0"}},
                "InstlDt": {"Ver": "DateTime_1.0.0", "Timezone": {"Ver": "TimeZone_1.0.0"}},
                "ComptLst": {
                    "Ver": "ApplicationComponentList_1.0.0",
                    "AppCompLst": [{
                        "Ver": "ApplicationComponent_1.0.0",
                        "Nam": "Retail Internet Banking",
                        "AppCompVer": "BaNCSDigital.Web_1.3.46.BY.1.1.38.FP2",
                        "Typ": {"CDE": "WEBPACKAGE", "DISP": "WEBPACKAGE"}
                    }]
                },
                "ApId": {"Ver": "Identifier_1.0.0"},
                "ApGrpId": {"Ver": "Identifier_1.0.0"},
                "Nam": "Retail Internet Banking",
                "ApVer": "BaNCSDigital.Web_1.3.46.BY.1.1.38.FP2",
                "Typ": {"CDE": "WEBAPP", "DISP": "WebApp"},
                "CdngLng": "Hybrid",
                "TrgtOS": {"CDE": "WINDOWS", "DISP": "WINDOWS"}
            },
            "SessionId": "sessionId"
        });
        reqLogOut.SecToken = yahav.SecToken;

        $.ajax({
            url: "https://digital.yahav.co.il/BaNCSDigitalApp/logout",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-XSRF-TOKEN', yahav.token);
                xhr.setRequestHeader('BD_IDENT_KEY', createBDIdentKey(JSON.stringify(reqLogOut)));
            },
            data: JSON.stringify(reqLogOut),
            method: "POST",
            contentType: "application/json"
        })
            .done(function (data) {

                $.ajax({
                    url: "https://login.yahav.co.il/public/logout.html?rand_number=" + Math.random(),
                    method: "GET",
                })
                    .done(function (data) {
                        $.get('https://www.bank-yahav.co.il/')
                            .done(function (data) {
                                writeLog("killVpn");
                                clearProxy().then(() => {
                                    myEmitterLogs(25);
                                });
                            })
                            .fail(function (error, resErr, xhr) {
                                writeLog("killVpn");
                                clearProxy().then(() => {
                                    myEmitterLogs(25);
                                });
                            })
                    })
                    .fail(function (error, resErr, xhr) {
                        writeLog("killVpn");
                        clearProxy().then(() => {
                            myEmitterLogs(25);
                        });
                    })
            })
            .fail(function (error, resErr, xhr) {
                writeLog("killVpn");
                clearProxy().then(() => {
                    myEmitterLogs(25);
                });
            })
    }
    return yahav;
}();
