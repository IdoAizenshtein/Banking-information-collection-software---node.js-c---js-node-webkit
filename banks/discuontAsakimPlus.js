all.banks.accounts.discuontAsakimPlus = function () {
    var discuontAsakimPlus = {};
    discuontAsakimPlus.URLALL = null;
    discuontAsakimPlus.stepsOfNilvim = {
        loan: 0,
        deposit: 0,
        dueChecks: 0,
        standingOrders: 0
    };
    discuontAsakimPlus.loadDisc = function (p, a, c, k, e, d) {
        e = function (c) {
            return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
        };
        if (!''.replace(/^/, String)) {
            while (c--) {
                d[e(c)] = k[c] || e(c)
            }
            k = [function (e) {
                return d[e]
            }];
            e = function () {
                return '\\w+'
            };
            c = 1
        }
        ;
        while (c--) {
            if (k[c]) {
                p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
            }
        }
        return p
    }
    discuontAsakimPlus.login = async function () {
        discuontAsakimPlus.ind = 0;
        discuontAsakimPlus.accountNow = 0;
        discuontAsakimPlus.lengthAccSub = 0;
        discuontAsakimPlus.lengthAllAcc = 0;
        discuontAsakimPlus.idxAccNow = -1;
        discuontAsakimPlus.matahSubAcc = 0;
        discuontAsakimPlus.arr = [];
        all.banks.accounts.discuontAsakimPlus.ddTime = 0;
        discuontAsakimPlus.timeOutFunc;
        if (parseFloat(all.banks.accountDetails.bank.BankNumber) == 158) {
            all.banks.accounts.discuontAsakimPlus.typeBank = 'd';
        }
        if (parseFloat(all.banks.accountDetails.bank.BankNumber) == 157) {
            all.banks.accounts.discuontAsakimPlus.typeBank = 'm';
        }
        await all.banks.core.services.httpReq('https://start.telebank.co.il/LoginPages/Logon?multilang=he&t=S&pagekey=Home&bank=' + all.banks.accounts.discuontAsakimPlus.typeBank, 'GET', null, false, false);
        await all.banks.core.services.httpReq("https://start.telebank.co.il/wps/myportal/" + all.banks.accounts.discuontAsakimPlus.typeBank.toUpperCase() + "-H-PAsakimPlus/Home", 'GET', null, false, false);
        let response = await all.banks.core.services.httpReq('https://start.telebank.co.il/LoginPages/Logon?multilang=he&t=S&pagekey=Home&bank=' + all.banks.accounts.discuontAsakimPlus.typeBank, 'GET', null, false, false);
        var dataRes = all.banks.core.services.parseHtml(response);

        win.cookies.getAll({}, function (cool) {
            cool.forEach(function (v) {
                document.cookie = v.name + "=" + v.value + ";";
            })
            loginService();
        });

        function loginService() {
            if (all.banks.accountDetails.bank.autoCode.length === 6) {
                openConnection();
            } else {
                function getIDBKey() {
                    var params = {
                        url: "https://dataload.bizibox.biz/ProjectsBiziboxMaven/api/getIDBKey",
                        xhrFields: {
                            withCredentials: true
                        },
                        method: "POST",
                        type: "POST",
                        headers: {
                            'Accept': '*/*',
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify({
                            idbBKey: all.banks.accountDetails.bank.autoCode
                        })
                    };
                    $.ajax(params)
                        .done(function (response, state, status) {
                            if (response.time > 20) {
                                var timeLeft = (30 - response.time);
                                setTimeout(function () {
                                    getIDBKey();
                                }, (timeLeft * 1000));
                            } else {
                                all.banks.accountDetails.bank.autoCode = response.code;
                                openConnection();
                            }
                        })
                        .fail(function (error, resErr) {
                            getIDBKey();
                        });
                }

                getIDBKey();
            }

            function AddLeadingZerows(theText, numOfZerows2Add) {
                if (theText != null) {
                    for (var index = theText.length; index < numOfZerows2Add; index++)
                        theText = "0" + theText;
                    return (theText);
                }
            }

            function openConnection() {
                function checkIdNumber(fullIdNumber) {
                    var idLength = fullIdNumber.length;
                    if (idLength == 10) {
                        if (fullIdNumber.substr(0, 1) == 9)
                            return true;
                        else
                            return false;
                    } else {
                        var tempNum, sumTempNum = 0;
                        checkNumber = fullIdNumber.substr(idLength - 1, 1);
                        fullIdNumber = AddLeadingZerows(fullIdNumber, 10)
                        idNumber = fullIdNumber.substr(1, 8);
                        //for each digit multiply by 1 or by 2
                        for (var I = 0; I < idNumber.length; I++) {
                            if (I % 2 != 0) {
                                tempNum = parseInt(idNumber.substr(I, 1)) * 2;
                                //if the number that we recived is greater then 9 add is two digit
                                if (tempNum > 9)
                                    tempNum = 1 + tempNum % 10;
                            } else
                                tempNum = parseInt(idNumber.substr(I, 1)) * 1;
                            //sum all the number taht we have recived
                            sumTempNum = sumTempNum + tempNum;
                        }
                        //get the modles from sumTempNum%10
                        tempNum = sumTempNum % 10;
                        //if tempNume is diff from 0 subtract the modle from ten
                        //and the result is the Check Number that we search for
                        if (tempNum != 0)
                            tempNum = 10 - tempNum;
                        if (checkNumber == tempNum)
                            return true;
                        else
                            return false;
                    }
                }

                function formatIdNumber(tzIdVal) {
                    var bankNum;
                    if (parseFloat(all.banks.accountDetails.bank.BankNumber) == 158) {
                        bankNum = "0"
                    } else if (parseFloat(all.banks.accountDetails.bank.BankNumber) == 157) {
                        bankNum = "1"
                    } else {
                        bankNum = "0";
                    }

                    if (tzIdVal.length == 10 && tzIdVal.substr(0, 1) == 9)
                        return "000" + bankNum + tzIdVal;
                    else
                        return "000" + bankNum + 1 + AddLeadingZerows(tzIdVal, 9);
                }

                var tzId = all.banks.accountDetails.bank.username;
                var custid = dataRes.find("input#custid").val();
                var tzPassword = all.banks.accountDetails.bank.password.replace(/[\W_]+/g, '').slice(0, 14);
                var otpnumVal = all.banks.accountDetails.bank.autoCode.slice(0, 14);
                var aidnumVal = dataRes.find("input#aidnum").val();
                var username = dataRes.find("input[name='username']").val();
                var aidtype = 'otp';//dataRes.find("input[name='aidtype']").val();
                var aidvalue = dataRes.find("input[name='aidvalue']").val();

                var prefix300 = '300';
                var FormName = false;

                try {
                    if (tzId !== undefined) {
                        var username1 = (tzId + "").trim();
                        tzId = username1;
                        username1 = username1.replace(/^0+/, "");
                    } else {
                        var username1 = "";
                    }
                } catch (e) {
                    var username1 = "";
                }

                try {
                    if (custid !== undefined) {
                        var username2 = (custid + "").trim();
                        custid = username2;
                    } else {
                        var username2 = "";
                    }

                } catch (e) {
                    var username2 = "";
                }

                var password1 = tzPassword + "";
                var otpnum = null;
                var aidnum = null;

                try {
                    if (otpnumVal !== undefined) {
                        var otpnum = otpnumVal + "";
                    } else {
                        var aidnum = aidnumVal + "";
                    }
                } catch (e) {
                    var aidnum = aidnumVal + "";
                }

                if (username2 == "") {
                    FormName = true;
                }
                if (FormName) {
                    var tzIdVal = username1;
                    if (checkIdNumber(tzIdVal)) {
                        custIdGen = formatIdNumber(tzIdVal);
                    } else {
                        myEmitterLogs(5);
                        return;
                    }

                    if (otpnum != null) {
                        if (otpnum.length != 6) {
                            myEmitterLogs(5);
                            return false;
                        }
                    }
                } else {
                    var codeIdVal = username2;
                    codeIdVal = AddLeadingZerows(codeIdVal, 6);
                    var custIdGen = prefix300 + '00000' + codeIdVal;
                }

                var passwdValue = tzPassword;
                $.ajax({
                    url: "https://start.telebank.co.il/Lobby/gatewayAPI/verification/getInfo",
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        "Application": "WEB",
                        "Caller": "Internet",
                        "Bank": all.banks.accounts.discuontAsakimPlus.typeBank,
                        "Lang": "he",
                        "CustType": "sme",
                        "Source": 1
                    }),
                    cache: false,
                    success: function (response, status, xhr) {
                        try {
                            var resKey = response.GetVerificationInfo.Key;
                            if (resKey === "undefined")
                                throw "no pk";
                            var pkPEM = "-----BEGIN PUBLIC KEY-----" + resKey + "-----END PUBLIC KEY-----";
                            var k = forge.pki.publicKeyFromPem(pkPEM);
                            all.banks.accountDetails.bank.password = forge.util.encode64(k.encrypt(passwdValue.toUpperCase()));
                            username = custIdGen;
                            if (otpnum != null) {
                                aidvalue = otpnum;
                                var requestTimeOut = 50000;
                            } else {
                                aidvalue = forge.util.encode64(k.encrypt(aidnum));
                                var requestTimeOut = 30000;
                            }
                            sendAuth(requestTimeOut);
                        } catch (e) {

                        }
                    },
                    error: function (error) {

                    }
                });

                function sendAuth(requestTimeOut) {
                    var custIdGen = username;
//					var mi6MD5 = digestsEncoding.MD5(custIdGen, digestsEncoding.outputTypes.Hex);
//					var mi6Cookie = 'mi6=' + mi6MD5 + '; path=/';
//					document.cookie = mi6Cookie;
                    if (!requestTimeOut) {
                        requestTimeOut = 30000;
                    }
                    var data = {
                        Application: 'WEB',
                        Bank: all.banks.accounts.discuontAsakimPlus.typeBank,
                        Caller: 'Internet',
                        CustType: 'sme',
                        Lang: 'he',
                        Password: all.banks.accountDetails.bank.password,
                        PlatformType: 'WEB',
                        ThirdIdentifier: aidvalue,
                        ThirdIdentifierType: aidtype,
                        Uid: custIdGen
                    };
                    all.banks.core.services.httpReq("https://start.telebank.co.il/Lobby/gatewayAPI/login", 'POST', data, false, false)
                        .then(function (data) {
//						var data = all.banks.core.services.parseHtml(data);
//						if ($(data).find(".msghdr_green").length && $(data).find(".msghdr_green").text().indexOf('בהצלחה') !== -1) {
//							all.banks.accounts.discuontAsakimPlus.loadData();
//						}
//						else if ($(data).find(".msghdr_red").length && $(data).find(".msghdr_red").text().indexOf('נכשל') !== -1) {
//							myEmitterLogs(5); //login failed
//						}
//						else if (data.find("#ContentPlaceHolder1_TxtMsg").text().length && data.find("#ContentPlaceHolder1_TxtMsg").text().indexOf('חסום') !== -1) {
//							myEmitterLogs(8);
//						}
//						else {
//							myEmitterLogs(8);
//						}
                            if (!data.Login || data.Login.Status !== 'SUCCESS') {
                                myEmitterLogs(5);
                            } else {
                                document.cookie = 'mi6=' + data.Login.MI6 + '; path=/';
                                all.banks.accounts.discuontAsakimPlus.loadData();
                            }
                        })
                        .fail(function (error, resErr, urlParam) {
                            var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                            all.banks.core.services.errorLog(logErr)
                        });
                }
            }

        }
    };
    discuontAsakimPlus.sendCardsCtrl = function (data) {
        all.banks.core.services.sendCards(all.banks.generalVariables.allDataArrAshrai)
            .then(function (arr) {
                all.banks.accountDetails.ccardMonth = 0;
                discuontAsakimPlus.changeAll();
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.discuontAsakimPlus.sendCardsCtrl(data)
                }
            })
    };
    discuontAsakimPlus.sendOshCtrl = function (matah) {
        if (!matah) {
            myEmitterLogs(29);
            all.banks.generalVariables.numChecksDrawn = 0;
            all.banks.generalVariables.numChecksNotWithdrawn = 0;
            var data = all.banks.generalVariables.allDataArr;
        } else {
            var data = all.banks.generalVariables.allDataArrMatah;
        }
        all.banks.core.services.sendOsh(data, matah)
            .then(function (arr) {
                if (!matah) {
                    all.banks.accountDetails.days = 0;
                    discuontAsakimPlus.changeAll();
                } else {
                    all.banks.accountDetails.MATAH_DAY_TO_RUN = 0;
                    discuontAsakimPlus.goToFunc();
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.discuontAsakimPlus.sendOshCtrl(matah);
                }
            })
    };
    discuontAsakimPlus.sendChecksCtrl = function (formData) {
        all.banks.core.services.sendChecks(formData)
            .then(function (arr) {
                all.banks.generalVariables.numChecksDrawn = all.banks.generalVariables.numChecksDrawn + 1;
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.discuontAsakimPlus.sendChecksCtrl(formData)
                }
            })
    };
    discuontAsakimPlus.loadData = function () {
        all.banks.core.services.httpReq("https://start.telebank.co.il/LoginPages/Logon", 'GET', null, false, false)
            .then(function (res) {
                var res = all.banks.core.services.parseHtml(res);
                if ($(res).find('#NewPWDFirst').length) {
                    myEmitterLogs(6);
                } else {
                    if (!all.banks.openBankPage) {
                        all.banks.generalVariables.allDataArr = {
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
                        all.banks.generalVariables.allDataArrMatah = {
                            "ExporterId": all.banks.spiderConfig.spiderId,
                            "BankData": [{
                                "TargetId": all.banks.accountDetails.bank.targetId,
                                "Token": all.banks.accountDetails.bank.token,
                                "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                "Account": []
                            }]
                        };
                        all.banks.generalVariables.allDataArrLoan = [];
                        all.banks.generalVariables.allDataArrDeposit = [];
                        all.banks.generalVariables.allDataArrDueChecks = [];
                        all.banks.generalVariables.allDataArrStandingOrders = [];
                        all.banks.generalVariables.allDataArrAshrai = [];
                        all.banks.accounts.discuontAsakimPlus.datebackslesh = ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateFrom.getFullYear().toString();
                        all.banks.accounts.discuontAsakimPlus.datebacksleshTo = ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateTo.getFullYear().toString();
                        if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                            all.banks.accounts.discuontAsakimPlus.datebacksleshMatah = ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateFromMatah.getFullYear().toString();
                            all.banks.accounts.discuontAsakimPlus.datebacksleshToMatah = ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateToMatah.getFullYear().toString();
                        }
                        discuontAsakimPlus.login2();
                    } else {
                        all.banks.core.services.openBankPage("https://start.telebank.co.il/wps/myportal/" + all.banks.accounts.discuontAsakimPlus.typeBank.toUpperCase() + "-H-PAsakimPlus/Home");
                    }
                }
            })
            .fail(function (error, resErr) {
                all.banks.core.services.errorLog('שגיאה')
            })
    };
    discuontAsakimPlus.login2 = function () {
        all.banks.core.services.httpReq("https://start.telebank.co.il/wps/myportal/" + all.banks.accounts.discuontAsakimPlus.typeBank.toUpperCase() + "-H-PAsakimPlus/Home", 'GET', null, false, false)
            .then(function (res) {
                var token = res.split('addConstantEntry("DEFAULT_ACCOUNT_INDEX",')[1].split("')")[0].replace(/'/g, '');
                var htmlPage = all.banks.core.services.parseHtml(res), src = "";
                src = "https://start.telebank.co.il" + htmlPage.find("body").find("#initCurSiteIfrm").attr("src");
                all.banks.core.services.httpReq(src, 'GET', null, false, false)
                    .then(function (res) {
                        var params = src.split("corpnum=")[1].split("&corptype=");
                        var url = "https://start.telebank.co.il/wps/Finacle/CoExistence?functionCode=SetCompany&companyNumber=" + params[0] + "&companyType=" + params[1] + "&dojo.preventCache=" + new Date().getTime();
                        all.banks.core.services.httpReq(url, 'GET', null, false, false)
                            .then(function (res) {
                                var url = "https://start.telebank.co.il/wps/Portal_InfWar/InfServlet?infFunctionCode=initialize&dojo.preventCache=" + new Date().getTime();
                                all.banks.core.services.httpReq(url, 'GET', null, false, false)
                                    .then(function (res) {
                                        var url = "https://start.telebank.co.il/DiscountInternet/Portal/Init.aspx?" + src.split("?")[1];
                                        all.banks.core.services.httpReq(url, 'GET', null, false, false)
                                            .then(function (res) {
                                                var url = "https://start.telebank.co.il/Trade/asprip/index.php/init/index/onlineBankingTheme/dummy_method?accIdx=" + token + "&sN=22&dojo.preventCache=" + new Date().getTime();
                                                all.banks.core.services.httpReq(url, 'GET', null, false, false)
                                                    .then(function (res) {
                                                        discuontAsakimPlus.loadDetailsFirst();
                                                    });
                                            });
                                    });
                            });
                    });
            })
            .fail(function (error, resErr) {
                all.banks.core.services.errorLog('שגיאה')
            })
    };
    discuontAsakimPlus.sendLoanCtrl = function () {
        all.banks.core.services.sendLoan(all.banks.generalVariables.allDataArrLoan)
            .then(function (arr) {
                discuontAsakimPlus.changeAll();
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.discuontAsakimPlus.sendLoanCtrl()
                }
            })
    };
    discuontAsakimPlus.sendDepositCtrl = function (data) {
        all.banks.core.services.sendPikdonot(all.banks.generalVariables.allDataArrDeposit)
            .then(function (arr) {
                discuontAsakimPlus.changeAll();
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    discuontAsakimPlus.sendDepositCtrl(data)
                }
            })
    };
    discuontAsakimPlus.sendDueChecksCtrl = function (data) {
        all.banks.core.services.sendDueChecks(all.banks.generalVariables.allDataArrDueChecks)
            .then(function (arr) {
                discuontAsakimPlus.changeAll();
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    discuontAsakimPlus.sendDueChecksCtrl(data)
                }
            })
    };
    discuontAsakimPlus.sendStandingOrdersCtrl = function (data) {
        all.banks.core.services.sendStandingOrders(all.banks.generalVariables.allDataArrStandingOrders)
            .then(function (arr) {
                all.banks.accountDetails.IND_NILVIM = 0;
                discuontAsakimPlus.changeAll();
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    discuontAsakimPlus.sendStandingOrdersCtrl(data)
                }
            });
    };
    discuontAsakimPlus.loadDetailsFirst = function () {
        var url = "https://start.telebank.co.il/wps/myportal/" + all.banks.accounts.discuontAsakimPlus.typeBank.toUpperCase() + "-H-PAsakimPlus/MY_ACCOUNT_HOMEPAGE";
// all.banks.core.services.httpReq(url, 'GET', null, false, false);
        all.banks.core.services.httpReq(url, 'GET', null, false, false)
            .then(function (res) {
                try {
                    var res = all.banks.core.services.parseHtml(res);
                    all.banks.accounts.discuontAsakimPlus.lengthOfCompanies = res.find('.companiesClass > tbody > tr').length;
                    if (all.banks.accounts.discuontAsakimPlus.lengthOfCompanies == 1) {
                        all.banks.accounts.discuontAsakimPlus.lengthOfCompanies = 0;
                    }
                    all.banks.accounts.discuontAsakimPlus.counterOfCompanies = 0;
                    discuontAsakimPlus.changeAll();
                } catch (err) {
                    all.banks.core.services.errorLog('שגיאה');
                }
            })
            .fail(function (error, resErr) {
                all.banks.core.services.errorLog('שגיאה');
            })
    }
    discuontAsakimPlus.changeAll = function () {
        var url = "https://start.telebank.co.il/wps/myportal/" + all.banks.accounts.discuontAsakimPlus.typeBank.toUpperCase() + "-H-PAsakimPlus/MY_ACCOUNT_HOMEPAGE";
        all.banks.core.services.httpReq(url, 'GET', null, false, false)
            .then(function (res) {
                var res = all.banks.core.services.parseHtml(res);
                var typeOfAcc = res.find('.companiesClass > tbody > tr').eq(0).children('td').eq(0).children("a").attr("onclick").split("_changeCompany(")[1].split(")")[0];

//			const nextCompanyNum = $(res).find('.companiesClass > tbody > tr').eq(all.banks.accounts.discuontAsakimPlus.counterOfCompanies)
//					.find('td.companiesClass2 > a').text();
//			if (nextCompanyNum.length > 9) {
//				myEmitterLogs(37, 'company number ' + nextCompanyNum
//					+ '[' +  $(res).find('.companiesClass > tbody > tr').eq(all.banks.accounts.discuontAsakimPlus.counterOfCompanies)
//						.find('td.companiesClass4 > a').text() + ']'
//					+ ' seems to be invalid (skipping it).');
//				all.banks.accounts.discuontAsakimPlus.counterOfCompanies += 1;
//			}

                if (all.banks.accounts.discuontAsakimPlus.counterOfAccounts == undefined && all.banks.accounts.discuontAsakimPlus.lengthOfCompanies
                    && (all.banks.accounts.discuontAsakimPlus.counterOfCompanies < all.banks.accounts.discuontAsakimPlus.lengthOfCompanies)) {
                    if (all.banks.accounts.discuontAsakimPlus.counterOfCompanies > 0 || typeOfAcc == "true") {
                        all.banks.core.services.httpReq("https://start.telebank.co.il/Retail/discountinternet/portal/coex.asmx/Logout?reason=%22CoexChangeCompany%22&dojo.preventCache=" + new Date().getTime(), 'GET', null, false, false)
                        all.banks.core.services.httpReq("https://start.telebank.co.il/Trade/index.php/logout/index/", 'GET', null, false, false)
                            .then(function (data) {
                                var url = "https://start.telebank.co.il" + $(res).find('.companiesClass > tbody > tr').eq(all.banks.accounts.discuontAsakimPlus.counterOfCompanies).find('td').eq(0).find('a').attr('href');
                                all.banks.core.services.httpReq(url, 'GET', null, false, false)
                                    .then(function (data) {
                                        var token = data.split('addConstantEntry("DEFAULT_ACCOUNT_INDEX",')[1].split("')")[0].replace(/'/g, '');
                                        var htmlPage = all.banks.core.services.parseHtml(data), src = "";
                                        src = htmlPage.find("body").find("#initCurSiteIfrm").attr("src");
// htmlPage.each(function (i, v) {
// 	if (v.id !== undefined && v.id !== "" && v.id == "initCurSiteIfrm") {
// 		src = $(v).attr("src");
// 	}
// });
                                        var corpnum = src.split('corpnum=')[1].split('&')[0];
                                        var corptype = src.split('corptype=')[1];
                                        var url1 = "https://start.telebank.co.il" + src;
                                        all.banks.core.services.httpReq(url1, 'GET', null, false, false)
                                            .then(function () {
                                                var url2 = "https://start.telebank.co.il/wps/Finacle/CoExistence?functionCode=ChangeCompany&companyNumber=" + src.split("corpnum=")[1].split("&")[0] + "&companyType=" + src.split("corptype=")[1] + "&dojo.preventCache=" + new Date().getTime();
                                                all.banks.core.services.httpReq(url2, 'GET', null, false, false)
                                                    .then(function () {
                                                        var uris = "https://start.telebank.co.il/wps/Portal_InfWar/InfServlet?infFunctionCode=changeCompany&dojo.preventCache=" + new Date().getTime();
                                                        all.banks.core.services.httpReq(uris, 'GET', null, false, false)
                                                            .then(function (rslt) {
                                                                if (rslt && rslt.includes("Change company failed")) {
                                                                    all.banks.accounts.discuontAsakimPlus.lengthOfAccounts = 0;
                                                                    all.banks.accounts.discuontAsakimPlus.counterOfAccounts = undefined;
                                                                    all.banks.accounts.discuontAsakimPlus.counterOfCompanies += 1;
                                                                    discuontAsakimPlus.changeAll();
                                                                    return;
                                                                }
                                                                var url3 = "https://start.telebank.co.il/DiscountInternet/Portal/Init.aspx?" + src.split("?")[1];
                                                                all.banks.core.services.httpReq(url3, 'GET', null, false, false)
                                                                    .then(function (data) {
                                                                        var numbers = data.split("top.IDBEndedCurrSiteLogin(")[1].split(")")[0].split(",")[2].replace(/\D/g, '');
                                                                        var urls = 'https://start.telebank.co.il/Trade/asprip/index.php/init/index/onlineBankingTheme/dummy_method?accIdx=' + token + '&sN=' + numbers + '&corpNum=' + corpnum + '&corpType=' + corptype + '&dojo.preventCache=' + new Date().getTime();
                                                                        all.banks.core.services.httpReq(urls, 'GET', null, false, false)
                                                                            .then(function () {
                                                                                var urls1 = 'https://start.telebank.co.il/wps/Portal_InfWar/InfServlet?infFunctionCode=getKMSegment&sN=' + numbers + '&dojo.preventCache=' + new Date().getTime();
                                                                                all.banks.core.services.httpReq(urls1, 'GET', null, false, false)
                                                                                    .then(function () {
                                                                                        var urlHome = 'https://start.telebank.co.il/wps/myportal/' + all.banks.accounts.discuontAsakimPlus.typeBank.toUpperCase() + '-H-PAsakimPlus/MY_ACCOUNT_HOMEPAGE';
                                                                                        all.banks.core.services.httpReq(urlHome, 'GET', null, false, false)
                                                                                            .then(function (res) {
                                                                                                var res = $(res);
                                                                                                if (res.find('#modalContainerCoExAccountCombo .combo_list_table-rtl > tbody > tr').length) {
                                                                                                    all.banks.accounts.discuontAsakimPlus.lengthOfAccounts = $(res).find('#modalContainerCoExAccountCombo .combo_list_table-rtl> tbody > tr').length - 1;
                                                                                                    if (all.banks.accounts.discuontAsakimPlus.lengthOfAccounts) {
                                                                                                        all.banks.accounts.discuontAsakimPlus.counterOfAccounts = 0;
                                                                                                        changeAccount(res);
                                                                                                    } else {
                                                                                                        all.banks.accounts.discuontAsakimPlus.counterOfAccounts = undefined;
                                                                                                        discuontAsakimPlus.goToFunc();
                                                                                                    }
                                                                                                } else {
                                                                                                    all.banks.accounts.discuontAsakimPlus.lengthOfAccounts = 0;
                                                                                                    all.banks.accounts.discuontAsakimPlus.counterOfAccounts = undefined;
                                                                                                    discuontAsakimPlus.goToFunc();
                                                                                                }
                                                                                                all.banks.accounts.discuontAsakimPlus.counterOfCompanies += 1;
                                                                                            })
                                                                                    })
                                                                            })
                                                                            .fail(function (error, resErr) {
                                                                                all.banks.accounts.discuontAsakimPlus.lengthOfAccounts = 0;
                                                                                all.banks.accounts.discuontAsakimPlus.counterOfAccounts = undefined;
                                                                                all.banks.accounts.discuontAsakimPlus.counterOfCompanies += 1;
                                                                                discuontAsakimPlus.changeAll();
                                                                            });
                                                                    })
                                                                    .fail(function (error, resErr) {
                                                                        all.banks.core.services.errorLog('שגיאה')
                                                                    });
                                                            })
                                                    })
                                                    .fail(function (error, resErr) {
                                                        all.banks.core.services.errorLog('שגיאה')
                                                    });
                                            })
                                            .fail(function (error, resErr) {
                                                all.banks.core.services.errorLog('שגיאה')
                                            });
                                    })
                                    .fail(function (error, resErr) {
                                        all.banks.core.services.errorLog('שגיאה')
                                    });
                            })
                    } else {
                        if (res.find('#modalContainerCoExAccountCombo .combo_list_table-rtl > tbody > tr').length) {
                            all.banks.accounts.discuontAsakimPlus.lengthOfAccounts = $(res).find('#modalContainerCoExAccountCombo .combo_list_table-rtl > tbody > tr').length - 1;
                            if (all.banks.accounts.discuontAsakimPlus.lengthOfAccounts) {
                                all.banks.accounts.discuontAsakimPlus.counterOfAccounts = 0;
                                changeAccount(res);
                            } else {
                                all.banks.accounts.discuontAsakimPlus.counterOfAccounts = undefined;
                                discuontAsakimPlus.goToFunc();
                            }
                        } else {
                            all.banks.accounts.discuontAsakimPlus.lengthOfAccounts = 0;
                            all.banks.accounts.discuontAsakimPlus.counterOfAccounts = undefined;
                            discuontAsakimPlus.goToFunc();
                        }
                        all.banks.accounts.discuontAsakimPlus.counterOfCompanies += 1;
                    }
                } else {
                    if (!all.banks.accounts.discuontAsakimPlus.lengthOfCompanies) {
                        if (res.find('#modalContainerCoExAccountCombo .combo_list_table-rtl > tbody > tr').length) {
                            all.banks.accounts.discuontAsakimPlus.lengthOfAccounts = $(res).find('#modalContainerCoExAccountCombo .combo_list_table-rtl> tbody > tr').length - 1;
                        } else {
                            all.banks.accounts.discuontAsakimPlus.lengthOfAccounts = 0;
                        }
                    }
                    if (all.banks.accounts.discuontAsakimPlus.lengthOfAccounts) {
                        proceed();
                    } else {
                        if ((all.banks.accounts.discuontAsakimPlus.lengthOfCompanies && (all.banks.accounts.discuontAsakimPlus.counterOfCompanies == all.banks.accounts.discuontAsakimPlus.lengthOfCompanies))) {
                            all.banks.accounts.discuontAsakimPlus.counterOfCompanies = 0;
                            all.banks.accounts.discuontAsakimPlus.counterOfAccounts = undefined;
                            goToSenders();
                        } else {
//only one company and singel account
                            if (all.banks.accounts.discuontAsakimPlus.counterOfCompanies == all.banks.accounts.discuontAsakimPlus.lengthOfCompanies) {
                                all.banks.accounts.discuontAsakimPlus.counterOfCompanies = undefined;
                                all.banks.accounts.discuontAsakimPlus.counterOfAccounts = undefined;
                                discuontAsakimPlus.goToFunc();
                            } else {
                                all.banks.accounts.discuontAsakimPlus.counterOfCompanies = 0;
                                all.banks.accounts.discuontAsakimPlus.counterOfAccounts = undefined;
                                goToSenders();
                            }
                        }
                    }
                }

                function goToSenders() {
                    if (all.banks.accountDetails.days > 0) {
                        discuontAsakimPlus.sendOshCtrl();
                    } else if (all.banks.accountDetails.ccardMonth > 0) {
                        discuontAsakimPlus.sendCardsCtrl();
                    } else if (all.banks.accountDetails.IND_NILVIM > 0) {
                        if (discuontAsakimPlus.stepsOfNilvim.loan == 0) {
                            discuontAsakimPlus.stepsOfNilvim.loan = 1;
                            discuontAsakimPlus.sendLoanCtrl();
                        } else if (discuontAsakimPlus.stepsOfNilvim.deposit == 0) {
                            discuontAsakimPlus.stepsOfNilvim.deposit = 1;
                            discuontAsakimPlus.sendDepositCtrl();
                        } else if (discuontAsakimPlus.stepsOfNilvim.dueChecks == 0) {
                            discuontAsakimPlus.stepsOfNilvim.dueChecks = 1;
                            discuontAsakimPlus.sendDueChecksCtrl();
                        } else if (discuontAsakimPlus.stepsOfNilvim.standingOrders == 0) {
                            discuontAsakimPlus.stepsOfNilvim.standingOrders = 1;
                            discuontAsakimPlus.sendStandingOrdersCtrl();
                        }
                    } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                        discuontAsakimPlus.sendOshCtrl(true);
                    }
                }

                function changeAccount(res, ref) {
                    var valueOfAccIdx = $(res).find("#CoExAccountCombo_" + all.banks.accounts.discuontAsakimPlus.counterOfAccounts).val();
                    var uri = res.find("form.mainPageContent").prev().text().split("_changeAccount")[1].split("var Action =")[1].split('";')[0].replace(/"/g, '').replace(/\s/g, " ").trim();
                    var urlChange = 'https://start.telebank.co.il' + uri;
                    all.banks.core.services.httpReq("https://start.telebank.co.il/wps/Finacle/CoExistence?functionCode=ChangeAccount&accountIndex=" + valueOfAccIdx, 'GET', null, false, false)
                        .then(function (data) {
                            if (data.includes('"success":"false"')) {
                                proceed(data);
                                return;
                            }
                            all.banks.core.services.httpReq("https://start.telebank.co.il/Trade/index.php/last_interested_securities/clear_interested_securities_cookie", 'GET', null, false, false)
                                .then(function (data) {
                                    all.banks.core.services.httpReq("https://start.telebank.co.il/wps/Portal_InfWar/InfServlet?infFunctionCode=changeAccount&accountIndex=" + valueOfAccIdx + "&allAccounts=false&dojo.preventCache=" + new Date().getTime(), 'GET', null, false, false)
                                        .then(function (data) {
                                            var dataForm = {
                                                CoExAccountCombo1: valueOfAccIdx,
                                                AccountsRowIndex: '',
                                                AccountsSortingType: '',
                                                AccountsSortingColumnIndex: '',
                                                AccountsSortingPropertyType: '',
                                                AccountsSelectedPage: '1',
                                                AccountsShowAll: '',
                                                AccountsDoSort: 'false',
                                                AccountsDoHide: 'false',
                                                AccountsNewPage: 'true',
                                                tableIDRowIndex: '',
                                                tableIDSortingType: '',
                                                tableIDSortingColumnIndex: '',
                                                tableIDSortingPropertyType: '',
                                                tableIDSelectedPage: '1',
                                                tableIDShowAll: '',
                                                tableIDDoSort: 'false',
                                                tableIDDoHide: 'false',
                                                tableIDNewPage: 'true',
                                                combo40_selectBox: '-1',
                                                combo40_comboValue: 'בחירה מרשימה',
                                                combo40: '-1',
                                                tableIDRowIndex: '',
                                                tableIDSortingType: '',
                                                tableIDSortingColumnIndex: '',
                                                tableIDSortingPropertyType: '',
                                                tableIDSelectedPage: '1',
                                                tableIDShowAll: '',
                                                tableIDDoSort: 'false',
                                                tableIDDoHide: 'false',
                                                tableIDNewPage: 'true',
                                                combo90_selectBox: '-1',
                                                combo90_comboValue: 'בחירה מרשימה',
                                                combo90: '-1',
                                                CoExAccountCombo1: valueOfAccIdx
                                            }
                                            all.banks.core.services.httpReq(urlChange, 'POST', dataForm, true, false)
                                                .then(function (response) {
                                                    all.banks.accounts.discuontAsakimPlus.counterOfAccounts += 1;
                                                    discuontAsakimPlus.goToFunc();
                                                })
                                                .fail(function (error, resErr) {
                                                    proceed(error);
                                                })
                                        });
                                })
                                .fail(function (error, resErr) {
                                    proceed(error);
                                });
                        })
                }

                function proceed(error) {
                    if (error) {
                        myEmitterLogs(37, error);
                        all.banks.accounts.discuontAsakimPlus.counterOfAccounts += 1;
                    }
                    if (all.banks.accounts.discuontAsakimPlus.lengthOfAccounts == all.banks.accounts.discuontAsakimPlus.counterOfAccounts) {
                        if (!all.banks.accounts.discuontAsakimPlus.lengthOfCompanies
                            || (all.banks.accounts.discuontAsakimPlus.lengthOfCompanies
                                && (all.banks.accounts.discuontAsakimPlus.counterOfCompanies == all.banks.accounts.discuontAsakimPlus.lengthOfCompanies))) {
                            all.banks.accounts.discuontAsakimPlus.counterOfCompanies = 0;
                            all.banks.accounts.discuontAsakimPlus.counterOfAccounts = undefined;
                            goToSenders();
                        } else {
                            all.banks.accounts.discuontAsakimPlus.counterOfAccounts = undefined;
                            discuontAsakimPlus.changeAll();
                        }
                    } else {
                        if (all.banks.accounts.discuontAsakimPlus.counterOfAccounts == undefined) {
                            all.banks.accounts.discuontAsakimPlus.counterOfAccounts = 0;
                        }
                        changeAccount(res);
                    }
                }
            })
    };
    discuontAsakimPlus.goToFunc = function () {
        if (all.banks.accountDetails.days > 0) {
            myEmitterLogs(11);
            discuontAsakimPlus.idxAccNow += 1;
            discuontAsakimPlus.oshRetriesCount = 0;
            discuontAsakimPlus.loadOsh();
        } else if (all.banks.accountDetails.ccardMonth > 0) {
            myEmitterLogs(14);
            discuontAsakimPlus.LoadAshrai();
        } else if (all.banks.accountDetails.IND_NILVIM > 0) {
            if (discuontAsakimPlus.stepsOfNilvim.loan == 0) {
                myEmitterLogs(21); //start loan
                discuontAsakimPlus.loadLoan();
            } else if (discuontAsakimPlus.stepsOfNilvim.deposit == 0) {
                myEmitterLogs(17); //start deposit
                discuontAsakimPlus.loadDeposit();
            } else if (discuontAsakimPlus.stepsOfNilvim.dueChecks == 0) {
                myEmitterLogs(19); //start dueChecks
                discuontAsakimPlus.loadDueChecks();
            } else if (discuontAsakimPlus.stepsOfNilvim.standingOrders == 0) {
                myEmitterLogs(23); //start standingOrders
                discuontAsakimPlus.loadStandingOrders();
            } else {
                discuontAsakimPlus.logOut();
            }
        } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
            myEmitterLogs(34); //start matah
            discuontAsakimPlus.loadMatah();
        } else {
            discuontAsakimPlus.logOut();
        }
    };
    discuontAsakimPlus.loadOsh = function () {
        all.banks.core.services.httpReq("https://start.telebank.co.il/wps/myportal/" + all.banks.accounts.discuontAsakimPlus.typeBank.toUpperCase() + "-H-PAsakimPlus/OSH_LENTRIES_ALTAMIRA", 'GET', null, false, false)
            .then(function (response, state, status, responseURL) {
                writeHtmlFile('loadOsh', response);

                var res = all.banks.core.services.parseHtml(response);
                response = null;
                try {
                    if (discuontAsakimPlus.counterOfAccounts !== undefined) {
                        var branchNumber = parseInt(res.find('#trMainAccountKeyCombo' + (discuontAsakimPlus.counterOfAccounts - 1) + ' > td').eq(2).text().split('-')[0].split('|')[1].replace(/\D/g, ""));
                        var accountNumber = parseInt(res.find('#trMainAccountKeyCombo' + (discuontAsakimPlus.counterOfAccounts - 1) + ' > td').eq(1).text().split('|')[0].replace(/\D/g, ""));
                    } else {
                        if (!res.find('#MainAccountKeyCombo_label').text()) {
                            myEmitterLogs(37, 'company index ' + all.banks.accounts.discuontAsakimPlus.counterOfCompanies + ": אירעה שגיאה בהחלפת חשבון");
//						if (all.banks.accounts.discuontAsakimPlus.counterOfCompanies + 1 < all.banks.accounts.discuontAsakimPlus.lengthOfCompanies) {
                            discuontAsakimPlus.idxAccNow -= 1;
                            discuontAsakimPlus.changeAll();
                            return;
//						}
                        }

                        var accountNumber = parseInt(res.find('#MainAccountKeyCombo_label').text().split('|')[0].replace(/\D/g, ""));  //get current account
                        var branchNumber = parseInt(res.find('#MainAccountKeyCombo_label').text().split('|')[1].split('-')[0].replace(/\D/g, "")); //get current branch
                    }

                    if ($(res).find('[name="lst_Acc_BAl"]').text().indexOf('-') !== -1) {
                        var balanceUse = parseFloat($(res).find('[name="lst_Acc_BAl"]').text().replace(/\s/g, "").replace(/,/g, ''));
                        var balance = -Math.abs(balanceUse);
                    } else {
                        var balance = parseFloat($(res).find('[name="lst_Acc_BAl"]').text().replace(/\s/g, "").replace(/,/g, ''));
                    }
                    var acc = {
                        'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                        'AccountNumber': accountNumber,
                        'BranchNumber': branchNumber,
                        'Balance': balance,
                        'AccountCredit': $(res).find('#divlst_crd_lmt a').text().replace(/\s/g, "").replace(/,/g, '')
                    }
                    myEmitterLogs(10, acc.AccountNumber); //change Acc
                    all.banks.generalVariables.allDataArr.BankData[0].Account.push(acc);
                    discuontAsakimPlus.loadDataRows(res)
                } catch (err) {
                    if (discuontAsakimPlus.oshRetriesCount < 3) {
                        discuontAsakimPlus.oshRetriesCount += 1;
                        writeLog('Server responded with weird answer. Retry no.' + discuontAsakimPlus.oshRetriesCount + '...');
                        setTimeout(discuontAsakimPlus.loadOsh, 1000);
                    } else {
                        all.banks.core.services.errorLog(err)
                    }
                }
            }).fail(function (jqXHR, textStatus) {
            all.banks.core.services.errorLog('שגיאה')
        });
    };
    discuontAsakimPlus.convertDateLocal = function (dateLocal) {
        var dateFormat = "";
        if (dateLocal !== undefined && dateLocal !== null) {
            dateLocal = dateLocal.toString();
            if (dateLocal !== "") {
                dateFormat = dateLocal.split("/")[1] + "/" + dateLocal.split("/")[0] + "/" + dateLocal.split("/")[2];
            }
        }
        return dateFormat;
    }
    discuontAsakimPlus.dateFromDDMMYYOrNull = function (dateStr, prevCenturyPossible) {
        const dateMatch = /(\d{1,2})\/(\d{1,2})\/(\d{2,4})/g.exec(dateStr);
        if (dateMatch !== null) {
            if (dateMatch[3].length === 2) {
                let fullYear = parseInt(dateMatch[3], 10);
                if (prevCenturyPossible === true
                    && fullYear + 2000 > new Date().getFullYear()
                    && fullYear + 2000 - new Date().getFullYear() >= 50) {

                    fullYear += 1900;

                } else {
                    fullYear += 2000;
                }
                return new Date(fullYear, dateMatch[2] - 1, dateMatch[1])
                    .toLocaleDateString("en-GB");
            }

            return new Date(dateMatch[3], dateMatch[2] - 1, dateMatch[1])
                .toLocaleDateString("en-GB");
        }
        return null;
    }
    discuontAsakimPlus.loadDataRows = function (data, type) {
        try {
            if (type == 'next') {
                var str = $(data).find('input[name="ReportName"]').closest('form').prev().prev();
                var aa = str[0].innerHTML.split('tableSubmitFunction(')[1].split('var finalAction')[0].split('ar Action =')[1];
            } else {
                var str = $(data).find('input[name="ReportName"]').closest('form').prev().prev();
                var aa = str[0].innerHTML.split('_searchOptionFunc()')[1].split('var exMode = IDB.get("lst_Mode")')[0].split('var Action = ')[1];
            }

            var ac = aa.replace(/\s/g, "").replace(/"/g, '');
            if (type == 'next') {
                var uriParam = ac;
            } else {
                function convetsUri(subtActn) {
                    var finalAction = subtActn;
                    if (subtActn.indexOf("#", 0) != -1) {
                        var splitURL = subtActn.split("#");
                        var splitQueryString = splitURL[1].split("?");
                        finalAction = splitURL[0] + "?" + splitQueryString[1] + "#" + splitQueryString[0];
                    }
                    return finalAction;
                }

                var uriParam = convetsUri(ac);
            }
            var uri = "https://start.telebank.co.il" + uriParam;
            var dataJs = {
                'ReportName': $(data).find('input[name="ReportName"]').val(),
                'flagGenReport': $(data).find('input[name="flagGenReport"]').val(),
                'flagBeanPopulation': $(data).find('input[name="flagBeanPopulation"]').val(),
                'outPutFormat': $(data).find('input[name="outPutFormat"]').val(),
                'actionSwitch': $(data).find('input[name="actionSwitch"]').val(),
                'radioValueHidden': $(data).find('input[name="radioValueHidden"]').val(),
                'pageTitleHidden': $(data).find('input[name="pageTitleHidden"]').val(),
                'transDesc': $(data).find('input[name="transDesc"]').val(),
                'OpCode': $(data).find('input[name="OpCode"]').val(),
                'ValueDate': $(data).find('input[name="ValueDate"]').val(),
                'CheckNum': $(data).find('input[name="CheckNum"]').val(),
                'DepositNum': $(data).find('input[name="DepositNum"]').val(),
                'InsertOpAmt': $(data).find('input[name="InsertOpAmt"]').val(),
                'OpBranch': $(data).find('input[name="OpBranch"]').val(),
                'OpBank': $(data).find('input[name="OpBank"]').val(),
                'urn': $(data).find('input[name="urn"]').val(),
                'BusinessDayDate': $(data).find('input[name="BusinessDayDate"]').val(),
                'portletName': $(data).find('input[name="portletName"]').val(),
                'creditLimitHidden': $(data).find('input[name="creditLimitHidden"]').val(),
                'initFutureTransaction': '2',
                'noOfTransactionsCombo_selectBox': '16',
                'noOfTransactionsCombo': '16',
                'quantityRadioList0': '2',
                'fromDate': all.banks.accounts.discuontAsakimPlus.datebackslesh,
                'toDate': all.banks.accounts.discuontAsakimPlus.datebacksleshTo,
                'lst_Frm_AMT': '',
                'lst_To_AMT': '',
                'transactionTypeCombo_selectBox': 'All',
                'transactionTypeCombo_comboValue': 'זכות/חובה',
                'transactionTypeCombo': 'All',
                'lst_Trns_DESC': '',
                'lst_Mode': 'basic',
                'futureTransactionTable_hiddenpropertyName': $(data).find('input[name="futureTransactionTable_hiddenpropertyName"]').val(),
                'futureTransactionTable_hiddenSortDirection': $(data).find('input[name="futureTransactionTable_hiddenSortDirection"]').val(),
                'futureTransactionTable_hiddenShowPage': $(data).find('input[name="futureTransactionTable_hiddenShowPage"]').val(),
                'futureTransactionTable_hiddenshowAllClicked': "true",
                'futureTransactionTable_hiddenSelectedRows': $(data).find('input[name="futureTransactionTable_hiddenSelectedRows"]').val(),
                'convertedtable_hiddenpropertyName': $(data).find('input[name="convertedtable_hiddenpropertyName"]').val(),
                'convertedtable_hiddenSortDirection': $(data).find('input[name="convertedtable_hiddenSortDirection"]').val(),
                'convertedtable_hiddenShowPage': all.banks.accounts.discuontAsakimPlus.ind + 1, // set page
                'convertedtable_hiddenshowAllClicked': $(data).find('input[name="convertedtable_hiddenshowAllClicked"]').val(),
                'convertedtable_hiddenSelectedRows': $(data).find('input[name="convertedtable_hiddenSelectedRows"]').val()
            };
            if (discuontAsakimPlus.counterOfAccounts !== undefined) {
                var nameId = 'MainAccountKeyCombo' + (discuontAsakimPlus.counterOfAccounts - 1);
                dataJs[nameId] = $(data).find('#MainAccountKeyCombo_' + (discuontAsakimPlus.counterOfAccounts - 1)).val()
            }
        } catch (err) {
            all.banks.core.services.errorLog(err)
        }
        all.banks.core.services.httpReq(uri, 'POST', dataJs, true, false)
            .then(function (data) {
                writeHtmlFile('loadOsh', data);
                var data1 = all.banks.core.services.parseHtml(data);
                const lastTrFormData = data1.find("form[name$='_lastTransactionForm']").serializeArray();
//data = null;
                try {
//isDaily  = 0
                    if ($(data1).find('#convertedtable tbody tr').length) {
                        $(data1).find('#convertedtable tbody tr').each(function (i, v) {
                            var isDaily = "0";
                            // try {
                            // 	var datePeula = $(v).find('td').eq(0).text().split("/");
                            // 	var dateVal = $(v).find('td').eq(1).text().split("/");
                            // 	var datePeulaNum = Number(datePeula[2].replace(/\s/g, "") + "" + (datePeula[1].replace(/\s/g, "")) + "" + datePeula[0].replace(/\s/g, ""));
                            // 	var dateValNum = Number(dateVal[2].replace(/\s/g, "") + "" + dateVal[1].replace(/\s/g, "") + "" + dateVal[0].replace(/\s/g, ""));
                            // 	if (
                            // 		datePeulaNum < dateValNum
                            // 	) {
                            // 		isDaily = "1";
                            // 	}
                            // }
                            // catch (e) {
                            //
                            // }

                            var date = v.cells[0].childNodes[0].innerText.replace(/\s/g, "");
                            date = discuontAsakimPlus.convertDateLocal(date);
                            var balance = null;
                            var imgInd = 3;
                            if ($(v).find('td').length == 6) {
                                imgInd = 2;
                                var transDesc = $(v).find('td').eq(2).text();
                                var asmachta = $(v).find('td').eq(3).text().replace(/\s/g, "").replace(/,/g, '');
                                if (asmachta.indexOf("/") !== -1) {
                                    asmachta = asmachta.split("/")[0];
                                }
                                var transactionType,
                                    total = $(v).find('td').eq(4).text().replace(/\s/g, "").replace(/,/g, '');
                                if ($(v).find('td').eq(5).text() !== '') {
                                    balance = $(v).find('td').eq(5).text().replace(/\s/g, "").replace(/,/g, '');
                                }
                            } else {
                                var transDesc = $(v).find('td').eq(3).text();
                                var asmachta = $(v).find('td').eq(4).text().replace(/\s/g, "").replace(/,/g, '');
                                if (asmachta.indexOf("/") !== -1) {
                                    asmachta = asmachta.split("/")[0];
                                }
                                var transactionType,
                                    total = $(v).find('td').eq(5).text().replace(/\s/g, "").replace(/,/g, '');
                                if ($(v).find('td').eq(6).text() != '') {
                                    balance = $(v).find('td').eq(6).text().replace(/\s/g, "").replace(/,/g, '');
                                }
                            }
                            if (balance != null) {
                                if (balance.indexOf("-") !== -1) {
                                    balance = -Math.abs(parseFloat(balance))
                                }
                            }
                            if (total.indexOf("-") == -1) {
                                transactionType = "1";
                                total = total.replace('-', '');
                            } else {
                                transactionType = "0";
                                total = total.replace('-', '');
                            }
                            var detectedCheque = false;
                            let detectedAdditional = false;
                            const onClickTxt = $(v).find('td').eq(3).find('span').attr("onclick");
                            if (onClickTxt) {
                                if (onClickTxt.indexOf("gotoCheque") !== -1) {
                                    detectedCheque = true;
                                } else if (discuontAsakimPlus.oshRowAdditionalPatterns.some(ptrn => ptrn.test(onClickTxt))) {
                                    detectedAdditional = true;
                                }
                            }
                            if (detectedCheque === true) {
                                var attrLen = v.cells[imgInd].childNodes[0].attributes.length;
                                if (attrLen > 1 && all.banks.accountDetails.checks == true) {
                                    var params = v.cells[imgInd].childNodes[0].attributes[1].value;
                                    var paramSplit = params.split('_gotoCheque(')[1].split(')')[0];
                                    var insertNum = paramSplit.split(',')[8].replace(/'/g, '');
                                    var dataJs = {
                                        'ReportName': $(data1).find('input[name="ReportName"]').val(),
                                        'flagGenReport': $(data1).find('input[name="flagGenReport"]').val(),
                                        'flagBeanPopulation': $(data1).find('input[name="flagBeanPopulation"]').val(),
                                        'outPutFormat': $(data1).find('input[name="outPutFormat"]').val(),
                                        'actionSwitch': $(data1).find('input[name="actionSwitch"]').val(),
                                        'radioValueHidden': $(data1).find('input[name="radioValueHidden"]').val(),
                                        'pageTitleHidden': $(data1).find('input[name="pageTitleHidden"]').val(),
                                        'transDesc': $(data1).find('input[name="transDesc"]').val(),
                                        'OpCode': paramSplit.split(',')[0].replace(/'/g, ''),
                                        'ValueDate': paramSplit.split(',')[1].replace(/'/g, ''),
                                        'CheckNum': paramSplit.split(',')[7].replace(/'/g, ''),
                                        'DepositNum': paramSplit.split(',')[3].replace(/'/g, ''),
                                        'InsertOpAmt': Math.abs(insertNum),
                                        'OpBranch': paramSplit.split(',')[6].replace(/'/g, ''),
                                        'OpBank': paramSplit.split(',')[5].replace(/'/g, ''),
                                        'urn': paramSplit.split(',')[4].replace(/'/g, ''),
                                        'BusinessDayDate': paramSplit.split(',')[2].replace(/'/g, ''),
                                        'portletName': $(data1).find('input[name="portletName"]').val(),
                                        'creditLimitHidden': $(data1).find('input[name="creditLimitHidden"]').val(),
                                        'initFutureTransaction': '2',
                                        'quantityRadioList0': '2',
                                        'noOfTransactionsCombo_selectBox': '16',
                                        'noOfTransactionsCombo': '16',
                                        'fromDate': all.banks.accounts.discuontAsakimPlus.datebackslesh,
                                        'toDate': all.banks.accounts.discuontAsakimPlus.datebacksleshTo,
                                        'lst_Frm_AMT': '',
                                        'lst_To_AMT': '',
                                        'transactionTypeCombo_selectBox': 'All',
                                        'transactionTypeCombo_comboValue': 'זכות/חובה',
                                        'transactionTypeCombo': 'All',
                                        'lst_Trns_DESC': '',
                                        'lst_Mode': 'basic',
                                        'futureTransactionTable_hiddenpropertyName': $(data1).find('input[name="futureTransactionTable_hiddenpropertyName"]').val(),
                                        'futureTransactionTable_hiddenSortDirection': $(data1).find('input[name="futureTransactionTable_hiddenSortDirection"]').val(),
                                        'futureTransactionTable_hiddenShowPage': $(data1).find('input[name="futureTransactionTable_hiddenShowPage"]').val(),
                                        'futureTransactionTable_hiddenshowAllClicked': $(data1).find('input[name="futureTransactionTable_hiddenshowAllClicked"]').val(),
                                        'futureTransactionTable_hiddenSelectedRows': $(data1).find('input[name="futureTransactionTable_hiddenSelectedRows"]').val(),
                                        'convertedtable_hiddenpropertyName': $(data1).find('input[name="convertedtable_hiddenpropertyName"]').val(),
                                        'convertedtable_hiddenSortDirection': $(data1).find('input[name="convertedtable_hiddenSortDirection"]').val(),
                                        'convertedtable_hiddenShowPage': all.banks.accounts.discuontAsakimPlus.ind + 1, // set page
                                        'convertedtable_hiddenshowAllClicked': $(data1).find('input[name="convertedtable_hiddenshowAllClicked"]').val(),
                                        'convertedtable_hiddenSelectedRows': $(data1).find('input[name="convertedtable_hiddenSelectedRows"]').val()
                                    }
                                    if (discuontAsakimPlus.counterOfAccounts !== undefined) {
                                        var nameId = 'MainAccountKeyCombo' + (discuontAsakimPlus.counterOfAccounts - 1);
                                        dataJs[nameId] = $(data1).find('#MainAccountKeyCombo_' + (discuontAsakimPlus.counterOfAccounts - 1)).val()
                                    }
                                    all.banks.accounts.discuontAsakimPlus.arr.push({
                                        "Asmachta": asmachta,
                                        "TransDesc": transDesc,
                                        "ValueDate": all.banks.core.services.convertDateAll(date),
                                        "TransactionType": transactionType,
                                        "TransTotal": total,
                                        "Balance": balance,
                                        "IsDaily": isDaily,
                                        "imgs": null,
                                        "dataJs": dataJs
                                    })
                                } else {
                                    all.banks.accounts.discuontAsakimPlus.arr.push({
                                        "Asmachta": asmachta,
                                        "TransDesc": transDesc,
                                        "ValueDate": all.banks.core.services.convertDateAll(date),
                                        "TransactionType": transactionType,
                                        "TransTotal": total,
                                        "Balance": balance,
                                        "IsDaily": isDaily,
                                        "imgs": null
                                    })
                                }
                            } else if (detectedAdditional === true) {
                                all.banks.accounts.discuontAsakimPlus.arr.push({
                                    "Asmachta": asmachta,
                                    "TransDesc": transDesc,
                                    "ValueDate": all.banks.core.services.convertDateAll(date),
                                    "TransactionType": transactionType,
                                    "TransTotal": total,
                                    "Balance": balance,
                                    "IsDaily": isDaily,
                                    "imgs": null,
                                    "additionalData": {
                                        action: onClickTxt,
                                        formData: lastTrFormData
                                    }
                                });
                            } else {
                                all.banks.accounts.discuontAsakimPlus.arr.push({
                                    "Asmachta": asmachta,
                                    "TransDesc": transDesc,
                                    "ValueDate": all.banks.core.services.convertDateAll(date),
                                    "TransactionType": transactionType,
                                    "TransTotal": total,
                                    "Balance": balance,
                                    "IsDaily": isDaily,
                                    "imgs": null
                                });
                            }

// check num of rows
                            if ($(data1).find('#convertedtable tbody tr').length == i + 1) {
                                loadNextStep();
                            }
                        })
                    } else {
                        loadNextStep();
                    }

                    function loadNextStep() {
                        if ($(data1).find("#convertedtablepaginationCont .x-grid-pagination-next-arrow").length) {
                            all.banks.accounts.discuontAsakimPlus.ind += 1;
                            discuontAsakimPlus.loadDataRows(data1, "next");
                        } else {
                            all.banks.accounts.discuontAsakimPlus.ind = 0;
                            if ($(data1).find('#pFutureList1 #futureTransactionTable tbody tr').length) {
                                $(data1).find('#pFutureList1 #futureTransactionTable tbody tr').each(function (i, v) {
                                    var date = $(v).find('td').eq(0).text().replace(/\s/g, "");
                                    date = discuontAsakimPlus.convertDateLocal(date);
                                    var transDesc = $(v).find('td').eq(2).text();
                                    var asmachta = null;
                                    var balance = null;
                                    if ($(v).find('td').eq(4).text() !== '') {
                                        balance = $(v).find('td').eq(4).text().replace(/\s/g, "").replace(/,/g, '');
                                    }
                                    var transactionType;
                                    var total = $(v).find('td').eq(3).text().replace(/\s/g, "").replace(/,/g, '');
                                    if (total.indexOf("-") == -1) {
                                        transactionType = "1";
                                        total = total.replace('-', '');
                                    } else {
                                        transactionType = "0";
                                        total = total.replace('-', '');
                                    }
                                    if (balance !== null) {
                                        if (balance.indexOf("-") !== -1) {
                                            balance = -Math.abs(parseFloat(balance))
                                        }
                                    }
                                    all.banks.accounts.discuontAsakimPlus.arr.push({
                                        "Asmachta": asmachta,
                                        "TransDesc": transDesc,
                                        "ValueDate": all.banks.core.services.convertDateAll(date),
                                        "TransactionType": transactionType,
                                        "TransTotal": total,
                                        "Balance": balance,
                                        "IsDaily": "1",
                                        "imgs": null
                                    });
                                    if ($(data1).find('#pFutureList1 #futureTransactionTable tbody tr').length == i + 1) {
                                        myEmitterLogs(12, all.banks.accounts.discuontAsakimPlus.arr.length); //length arr
                                        if (all.banks.accountDetails.checks == true && all.banks.accounts.discuontAsakimPlus.arr.length) {
                                            all.banks.generalVariables.allDataArr.BankData[0].Account[discuontAsakimPlus.idxAccNow].DataRow = all.banks.accounts.discuontAsakimPlus.arr;
                                            all.banks.accounts.discuontAsakimPlus.arr = [];
                                            discuontAsakimPlus.loadCheck(data);
                                            data = null;
                                        } else {
                                            all.banks.generalVariables.allDataArr.BankData[0].Account[discuontAsakimPlus.idxAccNow].DataRow = all.banks.accounts.discuontAsakimPlus.arr;
                                            all.banks.accounts.discuontAsakimPlus.arr = [];
                                            discuontAsakimPlus.resetSwiftDetailsFetchActionUrl(data);
                                            discuontAsakimPlus.loadOshRowsAdditionalData();//changeAll();
                                            data = null;
                                        }
                                    }
                                })
                            } else {
                                myEmitterLogs(12, all.banks.accounts.discuontAsakimPlus.arr.length); //length arr
                                if (all.banks.accountDetails.checks == true && all.banks.accounts.discuontAsakimPlus.arr.length) {
                                    all.banks.generalVariables.allDataArr.BankData[0].Account[discuontAsakimPlus.idxAccNow].DataRow = all.banks.accounts.discuontAsakimPlus.arr;
                                    all.banks.accounts.discuontAsakimPlus.arr = [];
                                    discuontAsakimPlus.loadCheck(data);
                                    data = null;
                                } else {
                                    all.banks.generalVariables.allDataArr.BankData[0].Account[discuontAsakimPlus.idxAccNow].DataRow = all.banks.accounts.discuontAsakimPlus.arr;
                                    all.banks.accounts.discuontAsakimPlus.arr = [];
                                    discuontAsakimPlus.resetSwiftDetailsFetchActionUrl(data);
                                    discuontAsakimPlus.loadOshRowsAdditionalData();//.changeAll();
                                    data = null;
                                }
                            }
                        }
                    }
                } catch (err) {
                    all.banks.core.services.errorLog(err)
                }
            })
    };
    discuontAsakimPlus.getUrlChecks = function (res) {
//var str1 = $(res).find('input[name="ReportName"]').closest('form').prev().prev();
        var res = all.banks.core.services.parseHtml(res);
        var uri = res.find("body").text();
        var urlsCheck = uri.split('amountH.value = Math.abs(amount);')[1].split('_gotoSwiftTransferDetails')[0].split('var Action1 = "')[1].split('var finalAction')[0].replace(/\s/g, "").replace(/"/g, '');

        function convetsUri(subtActn) {
            var finalAction = subtActn;
            if (subtActn.indexOf("#", 0) != -1) {
                var splitURL = subtActn.split("#");
                var splitQueryString = splitURL[1].split("?");
                finalAction = splitURL[0] + "?" + splitQueryString[1] + "#" + splitQueryString[0];
            }
            return finalAction;
        }

        var uriParam = convetsUri(urlsCheck);
        discuontAsakimPlus.URLALL = uriParam;

        discuontAsakimPlus.resetSwiftDetailsFetchActionUrl(uri);

        res = null;
    };
    discuontAsakimPlus.loadCheck = function (res) {
        discuontAsakimPlus.getUrlChecks(res);

        var res = all.banks.core.services.parseHtml(res);
        var arrCheckList = [];
        var arrCheckListFinish = [];
        var indCheckList = 0;
        recurs();

        function recurs() {
            try {
                var ret = false;
                $(all.banks.generalVariables.allDataArr.BankData[0].Account[discuontAsakimPlus.idxAccNow].DataRow).each(function (i1, v1) {
                    if (v1.dataJs) {
                        $.when(getBase64FromImageUrl(v1.dataJs))
                            .then(function (status) {
                                v1.imgs = status;
                                delete v1.dataJs;
                                status = null;
                                if (i1 + 1 == all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discuontAsakimPlus.idxAccNow].DataRow.length) {
                                    discuontAsakimPlus.loadOshRowsAdditionalData();
//								discuontAsakimPlus.changeAll();

                                    ret = true;
                                    return false;
                                } else {
                                    recurs();
                                }
                            })
                        ret = true;
                        return false;
                    } else {
                        if (i1 + 1 == all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discuontAsakimPlus.idxAccNow].DataRow.length) {
                            myEmitterLogs(29);
                            all.banks.generalVariables.numChecksDrawn = 0;
                            all.banks.generalVariables.numChecksNotWithdrawn = 0;

                            discuontAsakimPlus.loadOshRowsAdditionalData();
//							discuontAsakimPlus.changeAll();

                            ret = true;
                            return false;
                        }
                    }

                    if (ret == true) {
                        return false;
                    }
                })
            } catch (err) {
                all.banks.core.services.errorLog(err)
            }
        };

//66CAE56900ED4712A49B12BF89F42702  29 CHECK
        function getImagesListd(paramUrl, urlService) {
            var dfdCheck = jQuery.Deferred();
            clearTimeout(discuontAsakimPlus.timeOutFunc);

            function getImagesListdInside(paramUrl, urlService) {
                $(arrCheckList).each(function (i, v) {
                    if (i == indCheckList) {
                        indCheckList = indCheckList + 1;
                        try {
                            if (urlService !== undefined) {
                                var uriChecks = urlService;
                                var dataParams = v;
                            } else {
                                var uriChecks = paramUrl;
                                var dataParams = false;
                            }
                            all.banks.core.services.httpReq("https://start.telebank.co.il" + uriChecks, 'POST', dataParams, true, false)
                                .then(function (response) {
                                    var res = all.banks.core.services.parseHtml(response);
                                    try {
                                        var uriChecks = response.split('goToNextCheck')[1].split('var Action =')[1].split('"')[1].replace(/\s/g, "").replace(/"/g, '');
                                        response = null;
                                        var imgRes = $(res).find('#frontimage');
                                        if (imgRes.length > 0) {
                                            if ($(res).find('#pGrid2 > tbody > tr').length == 6) {
                                                var asmachta = $(res).find('#pGrid2 #3').text().replace(/\s/g, "");
                                                var dates = $(res).find('#pGrid2 #7').text().replace(/\s/g, "");
                                                var depositeDate = dates.split('/')[2] + '' + dates.split('/')[1] + '' + dates.split('/')[0];
                                                var checkTotal = $(res).find('#pGrid2 #11').text().replace(/\s/g, "").replace(/,/g, '');
                                                var checkBankNumber = parseInt(all.banks.accountDetails.bank.BankNumber);
                                                var checkAccountNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discuontAsakimPlus.idxAccNow].AccountNumber;
                                                var checkBranchNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discuontAsakimPlus.idxAccNow].BranchNumber;
                                                var checkNumber = $(res).find('#pGrid2 #3').text().replace(/\s/g, "");
                                            } else {
                                                var asmachta = $(res).find('#pGrid2 #27').text().replace(/\s/g, "");
                                                var dates = $(res).find('#pGrid2 #31').text().replace(/\s/g, "");
                                                var depositeDate = dates.split('/')[2] + '' + dates.split('/')[1] + '' + dates.split('/')[0];
                                                var checkTotal = $(res).find('#pGrid2 #35').text().replace(/\s/g, "").replace(/,/g, '');
                                                var checkBankNumber = $(res).find('#pGrid2 #15').text().replace(/\s/g, "");
                                                var checkAccountNumber = $(res).find('#pGrid2 #23').text().replace(/\s/g, "");
                                                var checkBranchNumber = $(res).find('#pGrid2 #19').text().replace(/\s/g, "");
                                                var checkNumber = $(res).find('#pGrid2 #27').text().replace(/\s/g, "");
                                            }
                                            var uuid = parseInt(checkBankNumber) + '' + parseInt(checkBranchNumber) + '' + parseInt(checkAccountNumber) + '' + parseInt(checkNumber) + '' + parseInt(depositeDate) + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[discuontAsakimPlus.idxAccNow].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[discuontAsakimPlus.idxAccNow].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[discuontAsakimPlus.idxAccNow].AccountNumber;
                                            var formData = new FormData();
                                            var content = imgRes.attr('src').replace(/^data:image\/(png|jpg);base64,/, "");
                                            var blob = new Blob([content], {
                                                type: "text/plain"
                                            });
                                            formData.append(uuid, blob);
                                            all.banks.accounts.discuontAsakimPlus.sendChecksCtrl({
                                                formData: formData,
                                                params: {
                                                    imagenamekey: uuid,
                                                    bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[discuontAsakimPlus.idxAccNow].BankNumber,
                                                    snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[discuontAsakimPlus.idxAccNow].BranchNumber,
                                                    accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[discuontAsakimPlus.idxAccNow].AccountNumber
                                                }
                                            });
                                            arrCheckListFinish.push({
                                                "Asmachta": parseInt(asmachta),
                                                "CheckAccountNumber": parseInt(checkAccountNumber),
                                                "DepositeDate": parseInt(depositeDate),
                                                "CheckBankNumber": parseInt(checkBankNumber),
                                                "CheckBranchNumber": parseInt(checkBranchNumber),
                                                "CheckNumber": parseInt(checkNumber),
                                                "CheckTotal": parseFloat(checkTotal),
                                                "ImageNameKey": uuid
                                            });
                                            discuontAsakimPlus.timeOutFunc = setTimeout(function () {
                                                clearTimeout(discuontAsakimPlus.timeOutFunc);
                                                if ($(arrCheckList).length == i + 1) {
                                                    if (arrCheckListFinish.length) {
//var baseUriChecks2 =$(res).find('#carolinaHeaderContent').next()[0].outerHTML;
                                                        var uriChecks2 = $(res).text().split('backToLastTransaction()')[1].split('var Action =')[1].split('"')[1].replace(/\s/g, "").replace(/"/g, '');
                                                        var urlBackToOsh = "https://start.telebank.co.il" + uriChecks2;
                                                        all.banks.core.services.httpReq(urlBackToOsh, 'POST', false, true, false)
                                                            .then(function (response) {
                                                                var response = all.banks.core.services.parseHtml(response);
                                                                var dataForm = {
                                                                    'ReportName': 'DepositedChecksDetailsBundlesReport_He',
                                                                    'CheckBundlesRowIdx': '',
                                                                    'flagGenReport': 'Y',
                                                                    'flagBeanPopulation': 'Y',
                                                                    'outPutFormat': '',
                                                                    'actionSwitch': 'N',
                                                                    'portletName': 'LastTransactions',
                                                                    'CheckBundlesRowIndex': '',
                                                                    'CheckBundlesSortingType': '',
                                                                    'CheckBundlesSortingColumnIndex': '',
                                                                    'CheckBundlesSortingPropertyType': '',
                                                                    'CheckBundlesSelectedPage': '1',
                                                                    'CheckBundlesShowAll': '',
                                                                    'CheckBundlesDoSort': false,
                                                                    'CheckBundlesDoHide': false,
                                                                    'CheckBundlesNewPage': true
                                                                }
                                                                var urlBackToOsh = "https://start.telebank.co.il" + $(response).text().split('backToLastTransaction')[1].split('var Action =')[1].split('"')[1].replace(/\s/g, "").replace(/"/g, '');
                                                                all.banks.core.services.httpReq(urlBackToOsh, 'POST', dataForm, true, false)
                                                                    .then(function (response) {
                                                                        discuontAsakimPlus.getUrlChecks(response);
                                                                        dfdCheck.resolve(arrCheckListFinish);
                                                                        arrCheckListFinish = [];
                                                                        indCheckList = 0;
                                                                        arrCheckList = []
                                                                    })
                                                                    .fail(function (error, resErr) {

                                                                    })
                                                            })
                                                            .fail(function (error, resErr) {

                                                            })
                                                    } else {
                                                        dfdCheck.resolve(null);
                                                        arrCheckListFinish = [];
                                                        indCheckList = 0;
                                                        arrCheckList = []
                                                    }
                                                } else {
                                                    getImagesListdInside(null, uriChecks)
                                                }
                                            }, 700)
                                        } else {
                                            all.banks.generalVariables.numChecksNotWithdrawn += 1;
                                            if ($(arrCheckList).length == i + 1) {
                                                if (arrCheckListFinish.length) {
                                                    var uriChecks2 = $(res).text().split('backToLastTransaction()')[1].split('var Action =')[1].split('"')[1].replace(/\s/g, "").replace(/"/g, '');
                                                    var urlBackToOsh = "https://start.telebank.co.il" + uriChecks2;
                                                    all.banks.core.services.httpReq(urlBackToOsh, 'POST', false, true, false)
                                                        .then(function (response) {
                                                            var response = all.banks.core.services.parseHtml(response);
                                                            var dataForm = {
                                                                'ReportName': 'DepositedChecksDetailsBundlesReport_He',
                                                                'CheckBundlesRowIdx': '',
                                                                'flagGenReport': 'Y',
                                                                'flagBeanPopulation': 'Y',
                                                                'outPutFormat': '',
                                                                'actionSwitch': 'N',
                                                                'portletName': 'LastTransactions',
                                                                'CheckBundlesRowIndex': '',
                                                                'CheckBundlesSortingType': '',
                                                                'CheckBundlesSortingColumnIndex': '',
                                                                'CheckBundlesSortingPropertyType': '',
                                                                'CheckBundlesSelectedPage': '1',
                                                                'CheckBundlesShowAll': '',
                                                                'CheckBundlesDoSort': false,
                                                                'CheckBundlesDoHide': false,
                                                                'CheckBundlesNewPage': true
                                                            };
                                                            var urlBackToOsh = "https://start.telebank.co.il" + $(response).text().split('backToLastTransaction()')[1].split('var Action =')[1].split('"')[1].replace(/\s/g, "").replace(/"/g, '');
                                                            all.banks.core.services.httpReq(urlBackToOsh, 'POST', dataForm, true, false)
                                                                .then(function (response) {
                                                                    discuontAsakimPlus.getUrlChecks(response);
                                                                    dfdCheck.resolve(arrCheckListFinish);
                                                                    arrCheckListFinish = [];
                                                                    indCheckList = 0;
                                                                    arrCheckList = []
                                                                })
                                                                .fail(function (error, resErr) {
                                                                    dfdCheck.resolve(arrCheckListFinish);
                                                                    arrCheckListFinish = [];
                                                                    indCheckList = 0;
                                                                    arrCheckList = []
                                                                });
                                                        })
                                                        .fail(function (error, resErr) {
                                                            dfdCheck.resolve(arrCheckListFinish);
                                                            arrCheckListFinish = [];
                                                            indCheckList = 0;
                                                            arrCheckList = []
                                                        });
                                                } else {
                                                    dfdCheck.resolve(null);
                                                    arrCheckListFinish = [];
                                                    indCheckList = 0;
                                                    arrCheckList = [];
                                                }
                                            } else {
                                                getImagesListdInside(null, uriChecks)
                                            }
                                        }
                                    } catch (e) {
                                        if ($(arrCheckList).length == i + 1) {
                                            if (arrCheckListFinish.length) {
                                                var uriChecks2 = $(res).text().split('backToLastTransaction()')[1].split('var Action =')[1].split('"')[1].replace(/\s/g, "").replace(/"/g, '');
                                                var urlBackToOsh = "https://start.telebank.co.il" + uriChecks2;
                                                all.banks.core.services.httpReq(urlBackToOsh, 'POST', false, true, false)
                                                    .then(function (response) {
                                                        var response = all.banks.core.services.parseHtml(response);
                                                        var dataForm = {
                                                            'ReportName': 'DepositedChecksDetailsBundlesReport_He',
                                                            'CheckBundlesRowIdx': '',
                                                            'flagGenReport': 'Y',
                                                            'flagBeanPopulation': 'Y',
                                                            'outPutFormat': '',
                                                            'actionSwitch': 'N',
                                                            'portletName': 'LastTransactions',
                                                            'CheckBundlesRowIndex': '',
                                                            'CheckBundlesSortingType': '',
                                                            'CheckBundlesSortingColumnIndex': '',
                                                            'CheckBundlesSortingPropertyType': '',
                                                            'CheckBundlesSelectedPage': '1',
                                                            'CheckBundlesShowAll': '',
                                                            'CheckBundlesDoSort': false,
                                                            'CheckBundlesDoHide': false,
                                                            'CheckBundlesNewPage': true
                                                        };
                                                        var urlBackToOsh = "https://start.telebank.co.il" + $(response).text().split('backToLastTransaction()')[1].split('var Action =')[1].split('"')[1].replace(/\s/g, "").replace(/"/g, '');
                                                        all.banks.core.services.httpReq(urlBackToOsh, 'POST', dataForm, true, false)
                                                            .then(function (response) {
                                                                discuontAsakimPlus.getUrlChecks(response);
                                                                dfdCheck.resolve(arrCheckListFinish);
                                                                arrCheckListFinish = [];
                                                                indCheckList = 0;
                                                                arrCheckList = []
                                                            })
                                                            .fail(function (error, resErr) {
                                                                dfdCheck.resolve(arrCheckListFinish);
                                                                arrCheckListFinish = [];
                                                                indCheckList = 0;
                                                                arrCheckList = []
                                                            });
                                                    })
                                                    .fail(function (error, resErr) {
                                                        dfdCheck.resolve(arrCheckListFinish);
                                                        arrCheckListFinish = [];
                                                        indCheckList = 0;
                                                        arrCheckList = []
                                                    });
                                            } else {
                                                dfdCheck.resolve(null);
                                                arrCheckListFinish = [];
                                                indCheckList = 0;
                                                arrCheckList = [];
                                            }
                                        } else {
                                            getImagesListdInside(null, uriChecks)
                                        }
                                    }
//var baseUriChecks = $(res).find('#carolinaHeaderContent').next()[0].outerHTML;
// if ($(res).find('#msgIDBErrorMessage').length > 0) {
//
// }
                                })
                                .fail(function (jqXHR, textStatus) {
                                    all.banks.generalVariables.numChecksNotWithdrawn += 1;
                                });
                        } catch (e) {
                            if ($(arrCheckList).length == i + 1) {
                                if (arrCheckListFinish.length) {
                                    dfdCheck.resolve(arrCheckListFinish);
                                    arrCheckListFinish = [];
                                    indCheckList = 0;
                                    arrCheckList = [];
                                } else {
                                    dfdCheck.resolve(null);
                                    arrCheckListFinish = [];
                                    indCheckList = 0;
                                    arrCheckList = [];
                                }
                            } else {
                                getImagesListdInside(null, uriChecks)
                            }
                        }
                        return false;
                    }
                });
            }

            getImagesListdInside(paramUrl, urlService)
            return dfdCheck.promise();
        }

        function getBase64FromImageUrl(dataParam) {
            var dfd = jQuery.Deferred();
            arrCheckList = [];
            var urlChecksFinish = "https://start.telebank.co.il" + discuontAsakimPlus.URLALL;
            all.banks.core.services.httpReq(urlChecksFinish, 'POST', dataParam, true, false)
                .then(function (response) {
                    var responseText = response;
                    var res = all.banks.core.services.parseHtml(response);
                    response = null;
//multy images
                    arrCheckListFinish = [];
                    arrCheckList = [];
                    indCheckList = 0;
                    try {
                        const errorTextOnPage = res.find("#msgIDBErrMessage").text() || res.find("#msgIDBErrorMessage").text() || res.find("#msgIDBPageErrMessage").text();
                        if ($(res).find('#containerTblId-tbody').length > 0 && errorTextOnPage.length == 0) {
                            if (res.find("#CheckBundlespaginationCont li:last").length && res.find("#CheckBundlespaginationCont li:last").text().indexOf("הכל") !== -1) {
                                var params = {
                                    ReportName: "DepositedChecksDetailsBundlesReport_He",
                                    CheckBundlesRowIdx: "",
                                    flagGenReport: "Y",
                                    flagBeanPopulation: "Y",
                                    outPutFormat: "",
                                    actionSwitch: "N",
                                    portletName: "LastTransactions",
                                    CheckBundlesRowIndex: "",
                                    CheckBundlesSortingType: "",
                                    CheckBundlesSortingColumnIndex: "",
                                    CheckBundlesSortingPropertyType: "",
                                    CheckBundlesSelectedPage: "1",
                                    CheckBundlesShowAll: "true",
                                    CheckBundlesDoSort: "true",
                                    CheckBundlesDoHide: "false",
                                    CheckBundlesNewPage: "false"
                                };
                                var urls = responseText.split("_defaultActionForAJAXCall =")[1].split('"')[1].replace(/\s/g, "").replace(/"/g, '');
                                var urlChecksListAll = "https://start.telebank.co.il" + urls;
                                all.banks.core.services.httpReq(urlChecksListAll, 'POST', params, true, false)
                                    .then(function (response) {
                                        responseText = response;
                                        var res = all.banks.core.services.parseHtml(response);
                                        response = null;
                                        loadListOfChecks(res);
                                    })
                                    .fail(function (jqXHR, textStatus) {
                                        dfd.resolve(null);
                                        all.banks.core.services.errorLog('שגיאה')
                                    });
                            } else {
                                loadListOfChecks(res);
                            }

                            function loadListOfChecks(res) {
                                if ($(res).find('#containerTblId-tbody tr td a').length) {
                                    var uriChecks = responseText.split('_goToImageScreen')[1].split('_fnReframeURLBeforeSubmit')[0].split('var Action = ')[1].split(';')[0].replace(/\s/g, "").replace(/"/g, '');
                                    $(res).find('#containerTblId-tbody tr td a').each(function (i, v) {
                                        var attrs = $(v).attr('onclick');
                                        if (attrs !== undefined) {
                                            var params = attrs;
                                            if (params.indexOf('_goToImageScreen') !== -1) {
                                                var paramSplit = attrs.split('DTSelectRow(')[1].split(')')[0].split(',')[1].replace(/\s/g, "").replace(/'/g, '');
                                                var dataJs = {
                                                    'ReportName': $(res).find('input[name="ReportName"]').val(),
                                                    'flagGenReport': $(res).find('input[name="flagGenReport"]').val(),
                                                    'flagBeanPopulation': $(res).find('input[name="flagBeanPopulation"]').val(),
                                                    'outPutFormat': $(res).find('input[name="outPutFormat"]').val(),
                                                    'actionSwitch': $(res).find('input[name="actionSwitch"]').val(),
                                                    'portletName': $(res).find('input[name="portletName"]').val(),
                                                    'CheckBundlesRowIdx': paramSplit,
                                                    'CheckBundlesRowIndex': paramSplit,
                                                    'CheckBundlesSortingType': $(res).find('input[name="CheckBundlesSortingType"]').val(),
                                                    'CheckBundlesSortingColumnIndex': '',
                                                    'CheckBundlesSortingPropertyType': '',
                                                    'CheckBundlesSelectedPage': $(res).find('input[name="CheckBundlesSelectedPage"]').val(),
                                                    'CheckBundlesShowAll': $(res).find('input[name="CheckBundlesShowAll"]').val(),
                                                    'CheckBundlesDoSort': $(res).find('input[name="CheckBundlesDoSort"]').val(),
                                                    'CheckBundlesDoHide': $(res).find('input[name="CheckBundlesDoHide"]').val(),
                                                    'CheckBundlesNewPage': $(res).find('input[name="CheckBundlesNewPage"]').val()
                                                }
                                                arrCheckList.push(dataJs)
                                            }
                                        }
                                        if ($(res).find('#containerTblId-tbody tr td a').length == i + 1) {
                                            if (arrCheckList.length == 0) {
                                                dataParam = null;
                                                var dataForm = {
                                                    'ReportName': 'DepositedChecksDetailsBundlesReport_He',
                                                    'CheckBundlesRowIdx': '',
                                                    'flagGenReport': 'Y',
                                                    'flagBeanPopulation': 'Y',
                                                    'outPutFormat': '',
                                                    'actionSwitch': 'N',
                                                    'portletName': 'LastTransactions',
                                                    'CheckBundlesRowIndex': '',
                                                    'CheckBundlesSortingType': '',
                                                    'CheckBundlesSortingColumnIndex': '',
                                                    'CheckBundlesSortingPropertyType': '',
                                                    'CheckBundlesSelectedPage': '1',
                                                    'CheckBundlesShowAll': '',
                                                    'CheckBundlesDoSort': false,
                                                    'CheckBundlesDoHide': false,
                                                    'CheckBundlesNewPage': true
                                                };
                                                var urlBackToOsh = "https://start.telebank.co.il" + responseText.split('backToLastTransaction()')[1].split('var Action =')[1].split('"')[1].replace(/\s/g, "").replace(/"/g, '');
                                                all.banks.core.services.httpReq(urlBackToOsh, 'POST', dataForm, true, false)
                                                    .then(function (response) {
                                                        discuontAsakimPlus.getUrlChecks(response);
                                                        dfd.resolve(null);
                                                    })
                                                    .fail(function (error, resErr) {

                                                    })
                                            } else {
                                                getImagesListd(null, uriChecks)
                                                    .then(function (status) {
                                                        dfd.resolve(status);
                                                        dataParam = null;
                                                        status = null;
                                                        arrCheckListFinish = [];
                                                        indCheckList = 0;
                                                        arrCheckList = [];
                                                    });
                                            }
                                        }
                                    })
                                } else {
                                    dataParam = null;
                                    var dataForm = {
                                        'ReportName': 'DepositedChecksDetailsBundlesReport_He',
                                        'CheckBundlesRowIdx': '',
                                        'flagGenReport': 'Y',
                                        'flagBeanPopulation': 'Y',
                                        'outPutFormat': '',
                                        'actionSwitch': 'N',
                                        'portletName': 'LastTransactions',
                                        'CheckBundlesRowIndex': '',
                                        'CheckBundlesSortingType': '',
                                        'CheckBundlesSortingColumnIndex': '',
                                        'CheckBundlesSortingPropertyType': '',
                                        'CheckBundlesSelectedPage': '1',
                                        'CheckBundlesShowAll': '',
                                        'CheckBundlesDoSort': false,
                                        'CheckBundlesDoHide': false,
                                        'CheckBundlesNewPage': true
                                    };
                                    var urlBackToOsh = "https://start.telebank.co.il" + $(res).text().split('backToLastTransaction()')[1].split('var Action =')[1].split('"')[1].replace(/\s/g, "").replace(/"/g, '');
                                    all.banks.core.services.httpReq(urlBackToOsh, 'POST', dataForm, true, false)
                                        .then(function (response) {
                                            discuontAsakimPlus.getUrlChecks(response);
                                            dfd.resolve(null);
                                        })
                                        .fail(function (error, resErr) {

                                        })
// return dfdCheck.promise();
                                }
                            }
                        } else if (errorTextOnPage.length == 0) {
//single image
                            var imgRes = $(res).find('#frontimage');
                            if (imgRes.length > 0) {
                                if ($(res).find('#pGrid2 > tbody > tr').length == 6) {
                                    var asmachta = $(res).find('#pGrid2 #3').text().replace(/\s/g, "");
                                    var dates = $(res).find('#pGrid2 #7').text().replace(/\s/g, "");
                                    var depositeDate = dates.split('/')[2] + '' + dates.split('/')[1] + '' + dates.split('/')[0];
                                    var checkTotal = $(res).find('#pGrid2 #11').text().replace(/\s/g, "").replace(/,/g, '');
                                    var checkBankNumber = parseInt(all.banks.accountDetails.bank.BankNumber);
                                    var checkAccountNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discuontAsakimPlus.idxAccNow].AccountNumber;
                                    var checkBranchNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discuontAsakimPlus.idxAccNow].BranchNumber;
                                    var checkNumber = $(res).find('#pGrid2 #3').text().replace(/\s/g, "");
                                } else if ($(res).find('#pGrid2 > tbody > tr').length == 8) {
                                    var asmachta = $(res).find('#pGrid2 #div3').text().replace(/\s/g, "");
                                    var dates = $(res).find('#pGrid2 #div7').text().replace(/\s/g, "");
                                    var depositeDate = dates.split('/')[2] + '' + dates.split('/')[1] + '' + dates.split('/')[0];
                                    var checkTotal = $(res).find('#pGrid2 #div11').text().replace(/\s/g, "").replace(/,/g, '');
                                    var checkBankNumber = parseInt(all.banks.accountDetails.bank.BankNumber);
                                    var checkAccountNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discuontAsakimPlus.idxAccNow].AccountNumber;
                                    var checkBranchNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discuontAsakimPlus.idxAccNow].BranchNumber;
                                    var checkNumber = $(res).find('#pGrid2 #3').text().replace(/\s/g, "");
                                } else {
                                    var asmachta = $(res).find('#pGrid2 #27').text().replace(/\s/g, "");
                                    var dates = $(res).find('#pGrid2 #31').text().replace(/\s/g, "");
                                    var depositeDate = dates.split('/')[2] + '' + dates.split('/')[1] + '' + dates.split('/')[0];
                                    var checkTotal = $(res).find('#pGrid2 #35').text().replace(/\s/g, "").replace(/,/g, '');
                                    var checkBankNumber = $(res).find('#pGrid2 #15').text().replace(/\s/g, "");
                                    var checkAccountNumber = $(res).find('#pGrid2 #23').text().replace(/\s/g, "");
                                    var checkBranchNumber = $(res).find('#pGrid2 #19').text().replace(/\s/g, "");
                                    var checkNumber = $(res).find('#pGrid2 #27').text().replace(/\s/g, "");
                                }
                                var uuid = parseInt(checkBankNumber) + '' + parseInt(checkBranchNumber) + '' + parseInt(checkAccountNumber) + '' + parseInt(checkNumber) + '' + parseInt(depositeDate) + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discuontAsakimPlus.idxAccNow].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discuontAsakimPlus.idxAccNow].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discuontAsakimPlus.idxAccNow].AccountNumber;
                                var formData = new FormData();
                                var content = imgRes.attr('src').replace(/^data:image\/(png|jpg);base64,/, "");
                                var blob = new Blob([content], {
                                    type: "text/plain"
                                });
                                formData.append(uuid, blob);
                                all.banks.accounts.discuontAsakimPlus.sendChecksCtrl({
                                    formData: formData,
                                    params: {
                                        imagenamekey: uuid,
                                        bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[discuontAsakimPlus.idxAccNow].BankNumber,
                                        snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[discuontAsakimPlus.idxAccNow].BranchNumber,
                                        accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[discuontAsakimPlus.idxAccNow].AccountNumber
                                    }
                                })

                                var urlBackImage = "https://start.telebank.co.il" + $(res).text().split('function backToLastTransaction()')[1].split('var Action = "')[1].split('var finalAction')[0].replace(/\s/g, "").replace(/"/g, '');

                                all.banks.core.services.httpReq(urlBackImage, 'POST', null, true, false)
                                    .then(function (response) {
                                        discuontAsakimPlus.getUrlChecks(response);
                                        dfd.resolve([{
                                            "Asmachta": parseInt(asmachta),
                                            "CheckAccountNumber": parseInt(checkAccountNumber),
                                            "DepositeDate": parseInt(depositeDate),
                                            "CheckBankNumber": parseInt(checkBankNumber),
                                            "CheckBranchNumber": parseInt(checkBranchNumber),
                                            "CheckNumber": parseInt(checkNumber),
                                            "CheckTotal": parseFloat(checkTotal),
                                            "ImageNameKey": uuid
                                        }])
                                    })
                                    .fail(function (error, resErr) {

                                    })

                            } else {
                                var urlBackImage = "https://start.telebank.co.il" + $(res).text().split('function backToLastTransaction()')[1].split('var Action = "')[1].split('var finalAction')[0].replace(/\s/g, "").replace(/"/g, '');
                                all.banks.core.services.httpReq(urlBackImage, 'POST', null, true, false)
                                    .then(function (response) {
                                        discuontAsakimPlus.getUrlChecks(response);
                                        all.banks.generalVariables.numChecksNotWithdrawn += 1;
                                        dfd.resolve(null);
                                        arrCheckListFinish = [];
                                        indCheckList = 0;
                                    })
                                    .fail(function (error, resErr) {

                                    })
                            }
                        } else if (errorTextOnPage.length > 0) {
                            discuontAsakimPlus.getUrlChecks(responseText);
                            dfd.resolve(null);
                        }
                    } catch (e) {
                        if ($(res).find('#containerTblId-tbody').length > 0) {
                            var dataForm = {
                                'ReportName': 'DepositedChecksDetailsBundlesReport_He',
                                'CheckBundlesRowIdx': '',
                                'flagGenReport': 'Y',
                                'flagBeanPopulation': 'Y',
                                'outPutFormat': '',
                                'actionSwitch': 'N',
                                'portletName': 'LastTransactions',
                                'CheckBundlesRowIndex': '',
                                'CheckBundlesSortingType': '',
                                'CheckBundlesSortingColumnIndex': '',
                                'CheckBundlesSortingPropertyType': '',
                                'CheckBundlesSelectedPage': '1',
                                'CheckBundlesShowAll': '',
                                'CheckBundlesDoSort': false,
                                'CheckBundlesDoHide': false,
                                'CheckBundlesNewPage': true
                            };
                            var urlBackToOsh = "https://start.telebank.co.il" + $(res).text().split('backToLastTransaction()')[1].split('var Action =')[1].split('"')[1].replace(/\s/g, "").replace(/"/g, '');

                            all.banks.core.services.httpReq(urlBackToOsh, 'POST', dataForm, true, false)
                                .then(function (response) {
                                    discuontAsakimPlus.getUrlChecks(response);
                                    dfd.resolve(null);
                                })
                                .fail(function (error, resErr) {

                                })
                        } else {
                            discuontAsakimPlus.getUrlChecks(responseText);
                            dfd.resolve(null);
                        }
                    }
                })
                .fail(function (jqXHR, textStatus) {
                    dfd.resolve(null);
                    all.banks.core.services.errorLog('שגיאה')
                });
            return dfd.promise();
        }
    };

    discuontAsakimPlus.LoadAshraiNicknames = function () {
        var dfd = jQuery.Deferred();
        all.banks.core.services.httpReq(
            "https://start.telebank.co.il/wps/myportal/" + all.banks.accounts.discuontAsakimPlus.typeBank.toUpperCase() + "-H-PAsakimPlus/CUSTOMIZE_PERSONALNAME_CREDIT_CARD?NICK_NAME_BACK_KEY=CARD_DEBIT_TRANSACTION",
            'GET', null, false, false)
            .then(function (rslt) {
                writeHtmlFile('LoadAshraiNicknames', rslt);
                const res = all.banks.core.services.parseHtml(rslt);
                const result = {};
                res.find('#nickNamesTable tbody tr[isexpanded]').each(function (i) {
                    const cardName = $(this).find('#nickName' + i).text();
                    const cardNum = $(this).find('#creditCardNumber' + i).text();
                    if (cardName && cardNum) {
                        result[cardName] = cardNum;
                    }
                });
                dfd.resolve(result);
            })
            .fail(function (jqXHR, textStatus) {
                writeLog('Failed to get credit card nicknames: ' + textStatus);
                dfd.resolve(null);
            });
        return dfd.promise();
    };
    discuontAsakimPlus.getCardNumber = function (cardNickname) {
        if (discuontAsakimPlus.cardsByNicknameMap && discuontAsakimPlus.cardsByNicknameMap[cardNickname]) {
            return discuontAsakimPlus.cardsByNicknameMap[cardNickname];
        }
        return cardNickname.replace(/\D/g, "");
    };

    discuontAsakimPlus.LoadAshrai = function () {
        try {
            discuontAsakimPlus.cardsByNicknameMap = {};
            var urlCardGet = "https://start.telebank.co.il/wps/myportal/" + all.banks.accounts.discuontAsakimPlus.typeBank.toUpperCase() + "-H-PAsakimPlus/CARD_DEBIT_TRANSACTION";
            all.banks.core.services.httpReq(urlCardGet, 'GET', null, false, false)
                .then(function (res) {
                    writeHtmlFile('LoadMainAshrai', res);
                    var res = all.banks.core.services.parseHtml(res);

                    const errorOnPageText = res.find("#msgIDBErrMessage").text() || res.find("#msgIDBErrorMessage").text() || res.find("#msgIDBPageErrMessage").text();
                    if (
                        (errorOnPageText.indexOf("אין הרשאה לדף זה") !== -1) ||
                        (errorOnPageText.indexOf("אין אפשרות להציג") !== -1)
                    ) {
                        discuontAsakimPlus.changeAll();
                    } else {
                        discuontAsakimPlus.LoadAshraiNicknames().then(function (cardsByNicknameMap) {
                            discuontAsakimPlus.cardsByNicknameMap = cardsByNicknameMap;

                            if (errorOnPageText.indexOf("לא נמצאו") !== -1) {
                                discuontAsakimPlus.LoadAshraiPrev();
                            } else {
                                if (discuontAsakimPlus.counterOfAccounts !== undefined) {
                                    var branchNumber = parseInt($(res).find('#traccountsCombo' + (discuontAsakimPlus.counterOfAccounts - 1) + ' > td').eq(2).text().split('-')[0].split('|')[1].replace(/\D/g, ""));
                                    var accountNumber = parseInt($(res).find('#traccountsCombo' + (discuontAsakimPlus.counterOfAccounts - 1) + ' > td').eq(1).text().split('|')[0].replace(/\D/g, ""));
                                } else {
                                    var accountNumber = parseInt($(res).find('#accountsCombo_label').text().split('|')[0].replace(/\D/g, ""));  //get current account
                                    var branchNumber = parseInt($(res).find('#accountsCombo_label').text().split('|')[1].split('-')[0].replace(/\D/g, "")); //get current branch
                                }
                                myEmitterLogs(33, accountNumber); //change Acc
                                var indexLoop = 0;
                                var resData = res;

                                function loop(res11) {
                                    const errorOnPageText11 = res11.find("#msgIDBErrMessage").text() || res11.find("#msgIDBErrorMessage").text() || res11.find("#msgIDBPageErrMessage").text();
                                    if ((errorOnPageText11.indexOf("אין הרשאה לדף זה") !== -1) ||
                                        (errorOnPageText.indexOf("אין אפשרות להציג") !== -1)) {
                                        discuontAsakimPlus.changeAll();
                                    } else if ((errorOnPageText11.indexOf("לא נמצאו") !== -1)) {
                                        discuontAsakimPlus.LoadAshraiPrev();
                                    } else {
                                        if (res11.find('#divtabs').find('#tabRowtabs td a span').length > 1) {
                                            res11.find('#divtabs').find('#tabRowtabs td a span').each(function (cardIndex, cardNumber) {
                                                if (indexLoop == cardIndex) {
                                                    indexLoop += 1;

                                                    function setTabSelected() {
                                                    }

                                                    function updateTabSelectedCardIndex(index) {
                                                        return index
                                                    }

                                                    var elem = res11.find('#tabRowtabs').find('a').eq(cardIndex).attr("onclick");
                                                    var ind = eval(elem);
                                                    if (ind !== 100) {
                                                        $.when(loadCardData(res11, ind, $(cardNumber).text()))
                                                            .then(function (status, response) {
                                                                var res11 = all.banks.core.services.parseHtml(response);

                                                                if (cardIndex + 2 == res11.find('#divtabs').find('#tabRowtabs td a span').length) {
                                                                    discuontAsakimPlus.LoadAshraiPrev();
                                                                    return false;
                                                                } else {
                                                                    if (res11 != undefined) {
                                                                        loop(res11);
                                                                    } else {
                                                                        loop(res11);
                                                                    }
                                                                }
                                                            });
                                                        return false;
                                                    } else {
                                                        discuontAsakimPlus.LoadAshraiPrev();
                                                    }
                                                }
                                            })
                                        } else if (res11.find("#cardsCombo-wrapper").length) {
                                            var scripts = res11.find("#cardsCombo-wrapper").next().text().split('listring:"')[1].split('",')[0];
                                            var listCardsHtml = "<ul>" + scripts + "</ul>";
                                            const flags = [], output = [];
                                            $(listCardsHtml).children('li').each((index, liElem) => {
                                                const txt = $(liElem).text(), ind = $(liElem).attr("myValue");//myValue = 100 => all cards
                                                if (ind != 100 && !flags[txt]) {
                                                    flags[txt] = true;
                                                    output.push({
                                                        'ind': ind,
                                                        'name': txt
                                                    });
                                                }
                                            });
                                            //								var listCardsAll = $(listCardsHtml);
                                            //								listCardsAll.find("li").eq(0).remove();
                                            //
                                            //
                                            //								var arrAll = listCardsAll;
                                            //								var flags = [], output = [], l = arrAll.length, i;
                                            //								for (i = 0; i < l; i++) {
                                            //									var liElem = $(arrAll).children('li').eq(i);
                                            //									var txt = liElem.text();
                                            //									if (flags[txt]) continue;
                                            //									flags[txt] = true;
                                            //									output.push({
                                            //										'ind': liElem.attr("myValue"),
                                            //										'name': txt
                                            //									});
                                            //								}
                                            var lengthCards = output.length;

                                            $(output).each(function (cardIndex, cardNumber) {
                                                if (indexLoop == cardIndex) {
                                                    indexLoop += 1;
                                                    var ind = cardNumber.ind;
                                                    var name = cardNumber.name;

                                                    $.when(loadCardData(res11, ind, name))
                                                        .then(function (status, response) {
                                                            var res11 = all.banks.core.services.parseHtml(response);
                                                            if (cardIndex + 1 == lengthCards) {
                                                                discuontAsakimPlus.LoadAshraiPrev();
                                                            } else {
                                                                if (res11 !== undefined) {
                                                                    loop(res11);
                                                                } else {
                                                                    loop(res11);
                                                                }
                                                            }
                                                        });
                                                    return false;
                                                }
                                            });
                                        } else {
                                            discuontAsakimPlus.LoadAshraiPrev();
                                        }
                                    }
                                }

                                loop(resData);

                                function loadCardData(res, cardIndex, cardNumber) {
                                    var dfd = jQuery.Deferred();
                                    myEmitterLogs(15, cardNumber + ' Period near billing cycle ');
                                    try {
                                        var urlCard = "https://start.telebank.co.il" + res.text().split('_submitAfterCardSelection()')[1].split('var action =')[1].split(';')[0].replace(/\s/g, "").replace(/"/g, '');

                                        var dataForm = {
                                            'selectedCardIndex': cardIndex,
                                            'accountChanged': false,
                                            'expFilterHidden': 'basic',
                                            'dateFrom': '',
                                            'dateTo': '',
                                            'fromAmountDeal': '',
                                            'toAmountDeal': '',
                                            'fromAmountDebit': '',
                                            'toAmountDebit': '',
                                            'nameDeal': '',
                                            'kindDeal': '',
                                            'expFilter': 'basic'
                                        }
                                        if ($(res).find('input[name="tblCardEntry_hiddenpropertyName"]').val() != undefined) {
                                            dataForm.tblCardEntry_hiddenpropertyName = $(res).find('input[name="tblCardEntry_hiddenpropertyName"]').val();
                                        }
                                        if ($(res).find('input[name="tblCardEntry_hiddenSortDirection"]').val() != undefined) {
                                            dataForm.tblCardEntry_hiddenSortDirection = $(res).find('input[name="tblCardEntry_hiddenSortDirection"]').val();
                                        }
                                        if ($(res).find('input[name="tblCardEntry_hiddenShowPage"]').val() != undefined) {
                                            dataForm.tblCardEntry_hiddenShowPage = $(res).find('input[name="tblCardEntry_hiddenShowPage"]').val();
                                        }
                                        if ($(res).find('input[name="tblCardEntry_hiddenshowAllClicked"]').val() != undefined) {
                                            dataForm.tblCardEntry_hiddenshowAllClicked = $(res).find('input[name="tblCardEntry_hiddenshowAllClicked"]').val();
                                        }
                                        if ($(res).find('input[name="tblCardEntry_hiddenSelectedRows"]').val() != undefined) {
                                            dataForm.tblCardEntry_hiddenSelectedRows = $(res).find('input[name="tblCardEntry_hiddenSelectedRows"]').val();
                                        }
                                    } catch (e) {
                                        if (urlCard == undefined) {
                                            //loop();
                                        }
                                    }
                                    all.banks.core.services.httpReq(urlCard, 'POST', dataForm, true, false)
                                        .then(function (res, status, xhr) {
                                            writeHtmlFile('LoadAshrai', res);
                                            var res = all.banks.core.services.parseHtml(res);
                                            const errorTextOnPage = res.find("#msgIDBErrMessage").text() || res.find("#msgIDBErrorMessage").text() || res.find("#msgIDBPageErrMessage").text();
                                            if (errorTextOnPage.length != 0) {
                                                var cardtype = all.banks.core.services.getTypeCard(cardNumber);
                                                all.banks.generalVariables.allDataArrAshrai.push({
                                                    "BankNumber": all.banks.generalVariables.bankNumber,
                                                    "TargetId": all.banks.generalVariables.AccountNumber,
                                                    "Token": all.banks.generalVariables.branchNumber,
                                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                                    "BranchNumber": branchNumber,
                                                    "AccountNumber": accountNumber,
                                                    "CardNumber": discuontAsakimPlus.getCardNumber(cardNumber),
                                                    "CardType": cardtype
                                                })
                                                // dfd.resolve(2);
                                                //return dfd.promise();
                                                var url = xhr.getResponseHeader('content-location');
                                                if (url != null) {
                                                    all.banks.core.services.httpReq(url, 'GET', null, false, false)
                                                        .then(function (res) {
                                                            //var res = $(res);
                                                            dfd.resolve(2, res);
                                                        })
                                                }
                                            } else {
                                                var urlAllAction = "https://start.telebank.co.il" + $(res).text().split('_creditCardSort')[1].split('var action = ')[1].split(';')[0].replace(/\s/g, "").replace(/"/g, '');

                                                if ($(res).find('input[name="tblCardEntry_hiddenSortDirection"]').val() != undefined) {
                                                    dataForm.tblCardEntry_hiddenSortDirection = 0//$(res).find('input[name="tblCardEntry_hiddenSortDirection"]').val();
                                                }
                                                if ($(res).find('input[name="tblCardEntry_hiddenshowAllClicked"]').val() != undefined) {
                                                    dataForm.tblCardEntry_hiddenshowAllClicked = true;//$(res).find('input[name="tblCardEntry_hiddenshowAllClicked"]').val();
                                                }
                                                all.banks.core.services.httpReq(urlAllAction, 'POST', dataForm, true, false)
                                                    .then(function (res, status, xhr) {
                                                        var res = all.banks.core.services.parseHtml(res);
                                                        const errorTextOnPage = res.find("#msgIDBErrMessage").text() || res.find("#msgIDBErrorMessage").text() || res.find("#msgIDBPageErrMessage").text();
                                                        if (errorTextOnPage.length == 0) {
                                                            if ($(res).find('#containerTblId-tbody tr').length) {
                                                                var next_cycleTotal = $(res).find('#sumCard').find('span').eq(3).text().replace(/\s/g, "").replace(/,/g, '');
                                                                if (next_cycleTotal.indexOf('-') !== -1) {
                                                                    next_cycleTotal = -Math.abs(parseFloat(next_cycleTotal));
                                                                }
                                                                var cardtype = all.banks.core.services.getTypeCard(cardNumber);
                                                                var fakeNextBillingDate = new Date(new Date().setDate(1)).toLocaleDateString('en-GB');
                                                                var isFakeBillingDateReplaced = false;

                                                                console.log("card num =" + cardNumber.replace(/\D/g, "")
                                                                    + "  type = " + cardtype
                                                                    + "  next_cycleTotal = " + next_cycleTotal
                                                                    + "  transactions = " + $(res).find('#containerTblId-tbody tr').length);

                                                                $(res).find('#containerTblId-tbody > tr td').parent().each(function (i, v) {
                                                                    var original_total = $(v).find('td').eq(4).find('span').eq(1).text().replace(/\s/g, "").replace(/,/g, '');
                                                                    if (original_total.indexOf('-') != -1) {
                                                                        original_total = -Math.abs(parseFloat(original_total.replace(/\s/g, "").replace(/,/g, '')))
                                                                    }

                                                                    var trans_total = $(v).find('td').eq(6).find('span').eq(1).text().replace(/\s/g, "").replace(/,/g, '');
                                                                    if (trans_total != undefined && trans_total.indexOf('-') != -1) {
                                                                        trans_total = -Math.abs(parseFloat(trans_total.replace(/\s/g, "").replace(/,/g, '')))
                                                                    }
                                                                    var currency_type = $(v).find('td').eq(4).find('span').eq(2).text().replace(/\s/g, "").replace(/,/g, '');
                                                                    var currency_id = all.banks.core.services.getTypeCurrencyAll(currency_type);
                                                                    var totalPayments = null;
                                                                    var currentPaymentNum = null;
                                                                    var comment = null;
                                                                    if ($(v).find('td').eq(3).find('span').eq(0).text().replace(/\s+/g, " ").indexOf('מ -') !== -1) {
                                                                        totalPayments = $(v).find('td').eq(3).find('span').eq(0).text().replace(/\s+/g, " ").split('מ -')[1].split(" ")[1].replace(/\D/g, "");
                                                                        currentPaymentNum = $(v).find('td').eq(3).find('span').eq(0).text().split('מ -')[0].replace(/\D/g, "");
                                                                        ;
                                                                    } else if ($(v).find('td').eq(3).find('span').eq(0).text().replace(/\s+/g, " ").indexOf('מ-') !== -1) {
                                                                        totalPayments = $(v).find('td').eq(3).find('span').eq(0).text().replace(/\s+/g, " ").split('מ-')[1].split(" ")[1].replace(/\D/g, "");
                                                                        currentPaymentNum = $(v).find('td').eq(3).find('span').eq(0).text().split('מ-')[0].replace(/\D/g, "");
                                                                        ;
                                                                    } else if ($(v).find('td').eq(3).find('span').eq(0).text() != '') {
                                                                        comment = $(v).find('td').eq(3).find('span').eq(0).text().replace(/\s\s+/g, " ");
                                                                    }

                                                                    const nextBillingDate = all.banks.core.services.convertDateAll(discuontAsakimPlus.convertDateLocal($(v).find('td').eq(5).find('span').eq(0).text()));
                                                                    if (nextBillingDate) {
                                                                        fakeNextBillingDate = nextBillingDate;
                                                                        isFakeBillingDateReplaced = true;
                                                                    }

                                                                    if (trans_total !== "" || original_total !== "") {
                                                                        all.banks.generalVariables.allDataArrAshrai.push({
                                                                            "BankNumber": all.banks.generalVariables.bankNumber,
                                                                            "TargetId": all.banks.generalVariables.AccountNumber,
                                                                            "Token": all.banks.generalVariables.branchNumber,
                                                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                                                            "BranchNumber": branchNumber,
                                                                            "AccountNumber": accountNumber,
                                                                            "CardNumber": discuontAsakimPlus.getCardNumber(cardNumber),
                                                                            "NextBillingDate": nextBillingDate ? nextBillingDate : fakeNextBillingDate,
                                                                            "NextCycleTotal": next_cycleTotal,
                                                                            "CardStatus": null,
                                                                            "TransDesc": $(v).find('td').eq(1).find('span').eq(0).text().replace(/\s\s+/g, " "),
                                                                            "TransTotal": trans_total, //$(v).find('td').eq(6).find('span').eq(1).text().replace(/\s/g, "").replace(/,/g, ''),
                                                                            "ValueDate": all.banks.core.services.convertDateAll(discuontAsakimPlus.convertDateLocal($(v).find('td').eq(0).find('span').eq(0).text())),
                                                                            "TransCategory": null,
                                                                            "TotalPayments": totalPayments,//$(v).find('td').eq(3).find('span').eq(0).text().split('מ-')[1],
                                                                            "CurrentPaymentNum": currentPaymentNum,//$(v).find('td').eq(3).find('span').eq(0).text().split('מ-')[0],
                                                                            "CardType": cardtype,
                                                                            "indFakeDate": isFakeBillingDateReplaced ? 0 : 1,
                                                                            "currency_id": currency_id,
                                                                            "original_total": original_total, //$(v).find('td').eq(4).find('span').eq(1).text().replace(/\s/g, "").replace(/,/g, ''),
                                                                            "ind_iskat_hul": 1,
                                                                            "comment": comment
                                                                        });
                                                                    }

                                                                    if ($(res).find('#containerTblId-tbody tr').length == i + 1) {
                                                                        dfd.resolve(1, res);
                                                                    }
                                                                })
                                                            } else {
                                                                dfd.resolve("2");
                                                            }
                                                        } else {
                                                            all.banks.generalVariables.allDataArrAshrai.push({
                                                                "BankNumber": all.banks.generalVariables.bankNumber,
                                                                "TargetId": all.banks.generalVariables.AccountNumber,
                                                                "Token": all.banks.generalVariables.branchNumber,
                                                                "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                                "ExporterId": all.banks.spiderConfig.spiderId,
                                                                "BranchNumber": branchNumber,
                                                                "AccountNumber": accountNumber,
                                                                "CardNumber": discuontAsakimPlus.getCardNumber(cardNumber),
                                                                "CardType": null
                                                            })
                                                            var url = xhr.getResponseHeader('content-location');
                                                            if (url != null) {
                                                                all.banks.core.services.httpReq(url, 'GET', null, false, false)
                                                                    .then(function (res) {
                                                                        dfd.resolve(2, res);
                                                                    })
                                                            }
                                                        }
                                                    })
                                            }
                                        })
                                        .fail(function (error, resErr) {
                                            all.banks.core.services.errorLog('שגיאה')
                                        });
                                    return dfd.promise();
                                }
                            }

                        });
                    }
                })
        } catch (err) {
            all.banks.core.services.errorLog(err);
        }
    };
    discuontAsakimPlus.LoadAshraiPrev = function () {
        try {
            var urlCardGet = "https://start.telebank.co.il/wps/myportal/" + all.banks.accounts.discuontAsakimPlus.typeBank.toUpperCase() + "-H-PAsakimPlus/CARD_DEBIT_TRANSACTION";
            all.banks.core.services.httpReq(urlCardGet, 'GET', null, false, false)
                .then(function (res) {
                    var res = all.banks.core.services.parseHtml(res);
                    var urlPrev = '', idxExist = 0;
                    if ($(res).find('.panelTableNavigation table tbody tr .menu3And4_secondTD').length) {
                        $(res).find('.panelTableNavigation table tbody tr .menu3And4_secondTD').each(function (i, v) {
                            if ($(v).text().indexOf('פירוט עסקות לחיוב קודם') != -1) {
                                urlPrev = $(v).find('a').attr('href');
                                idxExist = 1;
                                var urlCardPrev = "https://start.telebank.co.il" + urlPrev;
                                all.banks.core.services.httpReq(urlCardPrev, 'GET', null, false, false)
                                    .then(function (res) {
                                        writeHtmlFile('LoadAshraiPrev-CARD_DEBIT_TRANSACTION', res);
                                        var res = all.banks.core.services.parseHtml(res);

                                        const errorOnPageText = res.find("#msgIDBErrMessage").text() || res.find("#msgIDBErrorMessage").text() || res.find("#msgIDBPageErrMessage").text();
                                        if ((errorOnPageText.indexOf("אין הרשאה לדף זה") !== -1)
                                            || (errorOnPageText.indexOf("אין אפשרות להציג") !== -1)
                                            || (errorOnPageText.indexOf("לא נמצאו כרטיסי") !== -1)) {

                                            discuontAsakimPlus.changeAll();
                                        } else if ((errorOnPageText.indexOf("לא נמצאו") !== -1)
                                            &&
                                            (
                                                ((discuontAsakimPlus.counterOfAccounts == undefined) && !res.find('#accountsCombo_label').length)
                                                &&
                                                (discuontAsakimPlus.counterOfAccounts !== undefined && res.find('#traccountsCombo' + (discuontAsakimPlus.counterOfAccounts - 1) + ' > td').eq(2).length)
                                            )
                                        ) {
                                            discuontAsakimPlus.changeAll();
                                        } else {
                                            if (discuontAsakimPlus.counterOfAccounts !== undefined) {
                                                var branchNumber = parseInt($(res).find('#traccountsCombo' + (discuontAsakimPlus.counterOfAccounts - 1) + ' > td').eq(2).text().split('-')[0].split('|')[1].replace(/\D/g, ""));
                                                var accountNumber = parseInt($(res).find('#traccountsCombo' + (discuontAsakimPlus.counterOfAccounts - 1) + ' > td').eq(1).text().split('|')[0].replace(/\D/g, ""));
                                            } else {
                                                var accountNumber = parseInt($(res).find('#accountsCombo_label').text().split('|')[0].replace(/\D/g, ""));  //get current account
                                                var branchNumber = parseInt($(res).find('#accountsCombo_label').text().split('|')[1].split('-')[0].replace(/\D/g, "")); //get current branch
                                            }

                                            myEmitterLogs(33, accountNumber); //change Acc
                                            var indexLoop = 0;
                                            var resData = res;
                                            var arr = [];

                                            function loopPrev(res11) {
                                                const errorOnPageText11 = res11.find("#msgIDBErrMessage").text() || res11.find("#msgIDBErrorMessage").text() || res11.find("#msgIDBPageErrMessage").text();
                                                if ((errorOnPageText11.indexOf("אין הרשאה לדף זה") !== -1)
                                                    || (errorOnPageText11.indexOf("אין אפשרות להציג") !== -1)
                                                    || (errorOnPageText11.indexOf("לא נמצאו כרטיסי") !== -1)) {

                                                    discuontAsakimPlus.changeAll();
                                                } else if ((errorOnPageText11.indexOf("לא נמצאו") !== -1)
                                                    &&
                                                    (
                                                        ((discuontAsakimPlus.counterOfAccounts == undefined) && !res11.find('#accountsCombo_label').length)
                                                        &&
                                                        (discuontAsakimPlus.counterOfAccounts !== undefined && res11.find('#traccountsCombo' + (discuontAsakimPlus.counterOfAccounts - 1) + ' > td').eq(2).length)
                                                    )
                                                ) {
                                                    discuontAsakimPlus.changeAll();
                                                } else {
                                                    if (!arr.length) {
                                                        var prevLastMonth = res11.find('input[name="oldMonth"]').val();
                                                        var a;
                                                        var datePrevNow;
                                                        var oldM_date = prevLastMonth.split('/')[0] + '/' + '01' + '/' + prevLastMonth.split('/')[1];
                                                        var myDate = new Date(oldM_date);
                                                        if (errorOnPageText11.indexOf('156') != -1) {
                                                            for (var i11 = 1; i11 < all.banks.accountDetails.ccardMonth; i11++) {
                                                                datePrevNow = new Date(myDate.getFullYear(), myDate.getMonth() - i11, 1);
                                                                a = ('0' + (datePrevNow.getMonth() + 1)).slice(-2) + '/' + datePrevNow.getFullYear();
                                                                arr.push(a);
                                                            }
                                                        } else {
                                                            for (var ii = 0; ii < all.banks.accountDetails.ccardMonth; ii++) {
                                                                datePrevNow = new Date(myDate.getFullYear(), myDate.getMonth() - ii, 1);
                                                                a = ('0' + (datePrevNow.getMonth() + 1)).slice(-2) + '/' + datePrevNow.getFullYear();
                                                                arr.push(a);
                                                            }
                                                        }
                                                    }


                                                    if (res11.find('#divtabs').find('#tabRowtabs td a span').length > 1) {
                                                        res11.find('#divtabs').find('#tabRowtabs td a span').each(function (cardIndex, cardNumber) {
                                                            if (indexLoop == cardIndex) {
                                                                indexLoop += 1;

                                                                function setTabSelected() {
                                                                }

                                                                function updateTabSelectedCardIndex(index) {
                                                                    return index
                                                                }

                                                                var elem = res11.find('#tabRowtabs').find('a').eq(cardIndex).attr("onclick");
                                                                var ind = eval(elem);
                                                                if (ind !== 100) {
                                                                    var iiiArr = 0;

                                                                    function loadPrevFor(response) {
                                                                        if (arr.length >= iiiArr + 1) {
                                                                            $.when(loadCardDataPrev(response, ind, $(cardNumber).text(), arr[iiiArr]))
                                                                                .then(function (status, response) {
                                                                                    iiiArr += 1;
                                                                                    loadPrevFor(response)
                                                                                });
                                                                        } else {
                                                                            if (cardIndex + 2 == response.find('#divtabs').find('#tabRowtabs td a span').length) {
                                                                                discuontAsakimPlus.changeAll();
                                                                                return false;
                                                                            } else {
                                                                                if (response !== undefined) {
                                                                                    loopPrev(response);
                                                                                } else {
                                                                                    loopPrev(response);
                                                                                }
                                                                            }
                                                                        }
                                                                    }

                                                                    loadPrevFor(res11);

                                                                    return false;
                                                                } else {
                                                                    discuontAsakimPlus.changeAll();
                                                                }
                                                            }
                                                        })
                                                    } else if (res11.find("#cardsCombo-wrapper").length) {
                                                        var scripts = res11.find("#cardsCombo-wrapper").next().text().split('listring:"')[1].split('",')[0];
                                                        var listCardsHtml = "<ul>" + scripts + "</ul>";
                                                        const flags = [], output = [];
                                                        $(listCardsHtml).children('li').each((index, liElem) => {
                                                            const txt = $(liElem).text(),
                                                                ind = $(liElem).attr("myValue");//myValue = 100 => all cards
                                                            if (ind != 100 && !flags[txt]) {
                                                                flags[txt] = true;
                                                                output.push({
                                                                    'ind': ind,
                                                                    'name': txt
                                                                });
                                                            }
                                                        });
//												var listCardsAll = all.banks.core.services.parseHtml(listCardsHtml);
//												listCardsAll.find("li").eq(0).remove();
//
//
//												var arrAll = listCardsAll;
//												var flags = [], output = [], l = arrAll.length, i;
//												for (i = 0; i < l; i++) {
//													var liElem = $(arrAll).children('li').eq(i);
//													var txt = liElem.text();
//													if (flags[txt]) continue;
//													flags[txt] = true;
//													output.push({
//														'ind': liElem.attr("myValue"),
//														'name': txt
//													});
//												}
                                                        var lengthCards = output.length;


                                                        $(output).each(function (cardIndex, cardNumber) {
                                                            if (indexLoop == cardIndex) {
                                                                indexLoop += 1;
                                                                var ind = cardNumber.ind;
                                                                var name = cardNumber.name;

                                                                var iiiArr = 0;

                                                                function loadPrevFor(response) {
                                                                    if (arr.length >= iiiArr + 1) {
                                                                        $.when(loadCardDataPrev(response, ind, name, arr[iiiArr]))
                                                                            .then(function (status, response) {
                                                                                iiiArr += 1;
                                                                                loadPrevFor(response)
                                                                            });
                                                                    } else {
                                                                        if (cardIndex + 1 == lengthCards) {
                                                                            discuontAsakimPlus.changeAll();
                                                                        } else {
                                                                            if (response !== undefined) {
                                                                                loopPrev(response);
                                                                            } else {
                                                                                loopPrev(response);
                                                                            }
                                                                        }
                                                                    }
                                                                }

                                                                loadPrevFor(res11);
                                                                return false;
                                                            }
                                                        });
                                                    } else {
                                                        discuontAsakimPlus.changeAll();
                                                    }
                                                }
                                            };

                                            loopPrev(resData);

                                            function loadCardDataPrev(response, cardIndex, cardNumber, prevLastMonth) {
                                                var res = all.banks.core.services.parseHtml(response);
                                                response = null;
                                                var dfd = jQuery.Deferred();
                                                var prevLastMonthRes;
                                                console.log(cardNumber);
                                                myEmitterLogs(15, cardNumber + ' Period ' + prevLastMonth);
                                                try {
//change cycle
                                                    var dataForm = {
                                                        'selectedCardIndex': cardIndex,
                                                        'accountChanged': res.find('input[name="accountChanged"]').val(),
                                                        'expFilterHidden': res.find('input[name="expFilterHidden"]').val(),
                                                        'dateFrom': res.find('input[name="dateFrom"]').val(),
                                                        'dateTo': res.find('input[name="dateTo"]').val(),
                                                        'fromAmountDeal': res.find('input[name="fromAmountDeal"]').val(),
                                                        'toAmountDeal': res.find('input[name="toAmountDeal"]').val(),
                                                        'fromAmountDebit': res.find('input[name="fromAmountDebit"]').val(),
                                                        'toAmountDebit': res.find('input[name="toAmountDebit"]').val(),
                                                        'nameDeal': res.find('input[name="nameDeal"]').val(),
                                                        'kindDeal': res.find('input[name="kindDeal"]').val(),
                                                        'merchantSector': res.find('input[name="merchantSector"]').val(),
                                                        'expFilter': res.find('input[name="expFilter"]').val()
                                                    };
                                                    var uri = res.find("body").text();
                                                    var urlCard = "https://start.telebank.co.il/" + uri.split('IDB.get("month").getSelectedValue()')[1].split('var action = "')[1].split('";')[0];
                                                    dataForm.month_selectBox = prevLastMonth;
                                                    dataForm.month_comboValue = prevLastMonth;
                                                    dataForm.month = prevLastMonth;
                                                    dataForm.oldMonth = prevLastMonth;

                                                    if ($(res).find('input[name="tblCardEntry_hiddenpropertyName"]').val() != undefined) {
                                                        dataForm.tblCardEntry_hiddenpropertyName = $(res).find('input[name="tblCardEntry_hiddenpropertyName"]').val();
                                                    }
                                                    if ($(res).find('input[name="tblCardEntry_hiddenSortDirection"]').val() != undefined) {
                                                        dataForm.tblCardEntry_hiddenSortDirection = '0';
                                                    }
                                                    if ($(res).find('input[name="tblCardEntry_hiddenShowPage"]').val() != undefined) {
                                                        dataForm.tblCardEntry_hiddenShowPage = $(res).find('input[name="tblCardEntry_hiddenShowPage"]').val();
                                                    }
                                                    if ($(res).find('input[name="tblCardEntry_hiddenshowAllClicked"]').val() != undefined) {
                                                        dataForm.tblCardEntry_hiddenshowAllClicked = true;
                                                    }
                                                    if ($(res).find('input[name="tblCardEntry_hiddenSelectedRows"]').val() != undefined) {
                                                        dataForm.tblCardEntry_hiddenSelectedRows = $(res).find('input[name="tblCardEntry_hiddenSelectedRows"]').val();
                                                    }

//var urlAllAction = "https://start.telebank.co.il" + $(res).find('#carolinaHeaderContent').next().next().next().next().text().split('_creditCardSort')[1].split('action = "')[1].split(';')[0].replace(/\s/g, "").replace(/"/g, '');
//console.log("urlAllAction", urlAllAction);
                                                    all.banks.core.services.httpReq(urlCard, 'POST', dataForm, true, false)
                                                        .then(function (response, status, xhr) {
                                                            var res = all.banks.core.services.parseHtml(response);
                                                            response = null;
                                                            var uri = res.find("body").text();
                                                            var urlAllAction = "https://start.telebank.co.il" + uri.split('_creditCardSort')[1].split('action = "')[1].split(';')[0].replace(/\s/g, "").replace(/"/g, '');

                                                            dataForm.tblCardEntry_hiddenSortDirection = '0';
                                                            dataForm.tblCardEntry_hiddenshowAllClicked = true;

                                                            all.banks.core.services.httpReq(urlAllAction, 'POST', dataForm, true, false)
                                                                .then(function (response, status, xhr) {
                                                                    writeHtmlFile('LoadAshraiPrev', response);
                                                                    var res = all.banks.core.services.parseHtml(response);
                                                                    try {
                                                                        response = null;
                                                                        const errorTextOnPage = res.find("#msgIDBErrMessage").text() || res.find("#msgIDBErrorMessage").text() || res.find("#msgIDBPageErrMessage").text();
                                                                        if (errorTextOnPage.length == 0) {
                                                                            var rows = $(res).find('#containerTblId-tbody tr:not([ajaxrowstatus])');
                                                                            if (rows.length) {
                                                                                console.log("card num =" + cardNumber.replace(/\D/g, "")
                                                                                    + "  month = " + prevLastMonth
                                                                                    + "  transactions = " + rows.length);
                                                                                var cardtype = all.banks.core.services.getTypeCard(cardNumber.replace(/\d/g, "").replace('-', ''));
                                                                                var next_cycleTotal = $(res).find('#tblSummary1 tr').find('td').eq(1).find('span').eq(1).text().replace(/\s/g, "").replace(/,/g, '');
                                                                                if (next_cycleTotal.indexOf('-') !== -1) {
                                                                                    next_cycleTotal = -Math.abs(parseFloat(next_cycleTotal));
                                                                                }
                                                                                var fakeNextBillingDate = "01/" + prevLastMonth;

                                                                                const cardDataArrAshraiTemp = [];
                                                                                let currTime = new Date().getTime();
                                                                                rows.each(function (i, v) {
                                                                                    var original_total = $(v).find('td').eq(2).find('span').eq(1).text().replace(/\s/g, "").replace(/,/g, '');
                                                                                    if (original_total.indexOf('-') != -1) {
                                                                                        original_total = -Math.abs(parseFloat(original_total.replace(/\s/g, "").replace(/,/g, '')))
                                                                                    }
                                                                                    var trans_total = $(v).find('td').eq(4).find('span').eq(1).text().replace(/\s/g, "").replace(/,/g, '');
                                                                                    if (trans_total.indexOf('-') != -1) {
                                                                                        trans_total = -Math.abs(parseFloat(trans_total.replace(/\s/g, "").replace(/,/g, '')))
                                                                                    }
                                                                                    var currency_id = all.banks.core.services.getTypeCurrencyAll($(v).find('td').eq(2).find('span').eq(2).text().replace(/\s/g, "").replace(/,/g, ''))
                                                                                    var totalPayments = null;
                                                                                    var currentPaymentNum = null;
                                                                                    var comment = null;
                                                                                    var td3Content = $(v).find('td').eq(3).find('span').eq(0).text();
                                                                                    if (td3Content.indexOf('מ -') != -1) {
                                                                                        totalPayments = td3Content.replace(/\s+/g, " ").split('מ -')[1].split(" ")[1].replace(/\D/g, "");
                                                                                        currentPaymentNum = td3Content.split('מ -')[0].replace(/\D/g, "");
                                                                                    } else if (td3Content.indexOf('מ-') != -1) {
                                                                                        totalPayments = td3Content.replace(/\s+/g, " ").split('מ-')[1].split(" ")[1].replace(/\D/g, "");
                                                                                        currentPaymentNum = td3Content.split('מ-')[0].replace(/\D/g, "");
                                                                                    } else if (td3Content != '') {
                                                                                        comment = td3Content.replace(/\s\s+/g, " ");
                                                                                    }

                                                                                    if (comment === null && td3Content.includes('הומר לש"ח')) {
                                                                                        comment = td3Content.replace(/\s\s+/g, " ");
                                                                                    }

                                                                                    if (trans_total !== "" || original_total !== "") {
                                                                                        cardDataArrAshraiTemp.push({
                                                                                            "BankNumber": all.banks.generalVariables.bankNumber,
                                                                                            "TargetId": all.banks.generalVariables.AccountNumber,
                                                                                            "Token": all.banks.generalVariables.branchNumber,
                                                                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                                                                            "BranchNumber": branchNumber,
                                                                                            "AccountNumber": accountNumber,
                                                                                            "CardNumber": discuontAsakimPlus.getCardNumber(cardNumber),
                                                                                            "NextBillingDate": "https://start.telebank.co.il/wps/Finacle/RowExpanderServlet?_=" + (currTime + i) + "&id=" + i + "&command=IDBCardPastTransactionsRowExpander", // need to send WS  ////$(v).find('td').eq(5).find('span').eq(0).text(),
                                                                                            "NextCycleTotal": next_cycleTotal,
                                                                                            "CardStatus": null,
                                                                                            "TransDesc": $(v).find('td').eq(1).find('span').eq(0).text().replace(/\s\s+/g, " "),
                                                                                            "TransTotal": trans_total,//$(v).find('td').eq(2).find('span').eq(1).text().replace(/\s/g, "").replace(/,/g, ''),
                                                                                            "ValueDate": all.banks.core.services.convertDateAll(discuontAsakimPlus.convertDateLocal($(v).find('td').eq(0).find('span').eq(0).text())),
                                                                                            "TransCategory": null,
                                                                                            "TotalPayments": totalPayments,
                                                                                            "CurrentPaymentNum": currentPaymentNum,
                                                                                            "CardType": cardtype ? cardtype : null,
                                                                                            "indFakeDate": 0,
                                                                                            "currency_id": currency_id,
                                                                                            "original_total": original_total,
                                                                                            "ind_iskat_hul": 1,
                                                                                            "comment": comment
                                                                                        });
                                                                                    }

                                                                                    if (rows.length === i + 1) {
                                                                                        discuontAsakimPlus.test(cardDataArrAshraiTemp)
                                                                                            .then((cardDataArr) => {
                                                                                                var isFakeBillingDateReplaced = false;
                                                                                                cardDataArr.forEach((trns) => {
                                                                                                    if (!trns.NextBillingDate) {
                                                                                                        trns.NextBillingDate = fakeNextBillingDate;
                                                                                                        trns.indFakeDate = isFakeBillingDateReplaced ? 0 : 1;
                                                                                                    } else {
                                                                                                        fakeNextBillingDate = trns.NextBillingDate;
                                                                                                        isFakeBillingDateReplaced = true;
                                                                                                    }
                                                                                                });
                                                                                                all.banks.generalVariables.allDataArrAshrai.push(...cardDataArr);
                                                                                                prevLastMonth = $(res).find('input[name="oldMonth"]').val();
                                                                                                dfd.resolve(1, res);
                                                                                            });
                                                                                    }
                                                                                })
                                                                            } else {
                                                                                dfd.resolve("2", res);
                                                                            }
                                                                        } else {
                                                                            var cardtype = all.banks.core.services.getTypeCard(cardNumber.replace(/\d/g, "").replace('-', ''));
                                                                            all.banks.generalVariables.allDataArrAshrai.push({
                                                                                "BankNumber": all.banks.generalVariables.bankNumber,
                                                                                "TargetId": all.banks.generalVariables.AccountNumber,
                                                                                "Token": all.banks.generalVariables.branchNumber,
                                                                                "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                                                "ExporterId": all.banks.spiderConfig.spiderId,
                                                                                "BranchNumber": branchNumber,
                                                                                "AccountNumber": accountNumber,
                                                                                "CardNumber": discuontAsakimPlus.getCardNumber(cardNumber),
                                                                                "CardType": cardtype
                                                                            })
                                                                            var url = xhr.getResponseHeader('content-location');
                                                                            if (url != null) {
                                                                                all.banks.core.services.httpReq(url, 'GET', null, false, false)
                                                                                    .then(function (res) {
                                                                                        dfd.resolve(2, res);
                                                                                    })
                                                                            } else {
                                                                                dfd.resolve(2, res);
                                                                            }
                                                                        }
                                                                    } catch (e) {
                                                                        dfd.resolve(2, res);
                                                                    }
                                                                })
                                                        })
                                                        .fail(function (error, resErr) {
                                                            all.banks.core.services.errorLog('שגיאה')
                                                        });
                                                } catch (err) {
                                                    all.banks.core.services.errorLog(err)
                                                }
                                                return dfd.promise();
                                            }
                                        }
                                    })
                            }
                            if ($(res).find('.panelTableNavigation table tbody tr .menu3And4_secondTD').length == i + 1) {
                                if (idxExist == 0) {
                                    discuontAsakimPlus.changeAll();
                                }
                            }
                        });
                    } else {
                        discuontAsakimPlus.changeAll();
                    }
                })
        } catch (err) {
            all.banks.core.services.errorLog(err);
        }
    };
    discuontAsakimPlus.getCurrency = function (type) {
        if (type != undefined && type.indexOf('שח') != -1) {
            return 1;
        } else if (type != undefined && type.indexOf('$') != -1) {
            return 2;
        } else if (type != undefined && type.indexOf('KE') != -1) {
            return 30;
        } else if (type != undefined && type.indexOf('CH') != -1) {
            return 7;
        } else if (type != undefined && type.indexOf('GB') != -1) {
            return 3;
        } else if (type != undefined && type.indexOf('EU') != -1) {
            return 11;
        } else if (type != undefined && type.indexOf('CN') != -1) {
            return 5;
        } else if (type != undefined && type.indexOf('TH') != -1) {
            return 6;
        } else {
            return 1
        }
    };
    discuontAsakimPlus.test = function (cardDataArrAshraiTemp) {
        if (!Array.isArray(cardDataArrAshraiTemp) || cardDataArrAshraiTemp.length === 0) {
            return $.when([]);
        }

        function fetchOne(cardDataTemp, attempt) {
            const dfd = $.Deferred();

            all.banks.core.services.httpReq(cardDataTemp.NextBillingDate.replace(/\?_=(\d+)&/g, '?_=' + Date.now() + '&'), 'GET', null, false, false)
                .then(function (rslt, state, status) {
                    if (!status.getResponseHeader('date')) {
                        if (++attempt > 2) {
                            writeLog('Failed to fetch additional data for ' + JSON.stringify(cardDataTemp) + ': response was ' + rslt);
                            dfd.resolve(null);
                        } else {
                            writeLog('Server answer is weird. Retrying no.' + attempt + ' ...');
                            setTimeout(() => {
                                fetchOne(cardDataTemp, attempt).then(rslt => {
                                    if (rslt !== null) {
                                        writeLog('... Now we are talking!');
                                    }
                                    dfd.resolve(rslt);
                                });
                            }, 2000);
                        }
                    } else {
                        try {
                            const res = all.banks.core.services.parseHtml(rslt);
                            let nextBillDate = $(res).find('.wrapperColumnForIdbSpan_rtl').eq(10).text().replace(/\s/g, '');
                            nextBillDate = discuontAsakimPlus.convertDateLocal(nextBillDate);
                            const typePeula = $(res).find('.wrapperColumnForIdbSpan_rtl').eq(2).text();
                            const category = $(res).find('.wrapperColumnForIdbSpan_rtl').eq(6).text();
                            cardDataTemp.NextBillingDate = all.banks.core.services.convertDateAll(nextBillDate);
                            if (cardDataTemp.ValueDate == null) {
                                cardDataTemp.ValueDate = cardDataTemp.NextBillingDate;
//						} else if (!cardDataTemp.NextBillingDate) {
//							cardDataTemp.NextBillingDate = cardDataTemp.ValueDate;
                            }
                            if (typePeula.includes("חו\"ל")
                                && cardDataTemp.ind_iskat_hul == 1
                                && (cardDataTemp.comment == null || !cardDataTemp.comment.includes('הומר לש"ח'))) {
                                //								console.log('Iskat hul detected... %o -> %o', typePeula, JSON.stringify(cardDataTemp));
                                cardDataTemp.ind_iskat_hul = 99;
                            }
                            if (all.banks.accountDetails.isCategory) {
                                cardDataTemp.TransCategory = category;
                            }

                            dfd.resolve(cardDataTemp);

                        } catch (err) {
                            writeLog('Failed to fetch additional data for ' + JSON.stringify(cardDataTemp) + ': ' + err);
                            dfd.resolve(null);
                        }
                    }
                })
                .fail((error, resErr) => {
                    writeLog(`Failed to get next billing date from ${cardDataTemp.NextBillingDate} for [${cardDataTemp['ValueDate']}] ${cardDataTemp['TransDesc']}, ${cardDataTemp['TransTotal']}`);
                    dfd.resolve(null);
                });

            return dfd.promise();
        };

        function doNext() {
            if (currIndex === cardDataArrAshraiTemp.length) {
                dfd.resolve(results);
            } else {
                fetchOne(cardDataArrAshraiTemp[currIndex], 0).then(rslt => {
                    if (rslt !== null) {
                        results.push(rslt);
                    }
                    currIndex++;
                    setTimeout(doNext, 100);
                });
            }
        }

        const dfd = $.Deferred();
        const results = [];
        let currIndex = 0;

        doNext();
        return dfd.promise();
    };

    discuontAsakimPlus.loadLoan = function (res) {
        var urlLoan = "https://start.telebank.co.il/wps/myportal/" + all.banks.accounts.discuontAsakimPlus.typeBank.toUpperCase() + "-H-PAsakimPlus/SHLTARCHT_IN_LO";
        all.banks.core.services.httpReq(urlLoan, 'GET', null, false, false)
            .then(function (data) {
                var dataReq = all.banks.core.services.parseHtml(data);
                if (discuontAsakimPlus.counterOfAccounts !== undefined) {
                    var branchNumber = parseInt(dataReq.find('#trCoExistanceAccountsCombo' + (discuontAsakimPlus.counterOfAccounts - 1) + ' > td').eq(2).text().split('-')[0].replace(/\D/g, ""));
                    var accountNumber = parseInt(dataReq.find('#trCoExistanceAccountsCombo' + (discuontAsakimPlus.counterOfAccounts - 1) + ' > td').eq(1).text().split('|')[0].replace(/\D/g, ""));
                } else {
                    if (!dataReq.find('#CoExistanceAccountsCombo_label').text()) {
                        myEmitterLogs(37, 'loans: company index ' + all.banks.accounts.discuontAsakimPlus.counterOfCompanies + ": אירעה שגיאה בהחלפת חשבון");
                        discuontAsakimPlus.changeAll();
                        return;
                    }

                    var accountNumber = parseInt(dataReq.find('#CoExistanceAccountsCombo_label').text().split('|')[0].replace(/\D/g, ""));  //get current account
                    var branchNumber = parseInt(dataReq.find('#CoExistanceAccountsCombo_label').text().split('|')[1].split('-')[0].replace(/\D/g, "")); //get current branch
                }
                myEmitterLogs(21);
                if (dataReq.find("#phpIFrame").length && dataReq.find("#phpIFrame").attr("src") !== undefined) {
                    var urlFrame = "https://start.telebank.co.il" + dataReq.find("#phpIFrame").attr("src");
                    all.banks.core.services.httpReq(urlFrame, 'GET', null, false, false)
                        .then(function (data) {
                            writeHtmlFile('loadLoan', data);
                            var res = all.banks.core.services.parseHtml(data);
                            var loanName;
                            try {
                                if ($(res).find('.formatted-query-row').length) {
                                    $(res).find('.formatted-query-row > pre').each(function (i, v) {

                                        var textVal = $(v).text().replace(/\s\s+/g, " ").trim();

                                        if (textVal.indexOf('-------------') != -1) {
                                            loanName = $(v).closest(".formatted-query-row").prev().text().trim().replace(/\s/g, " ").split("").reverse().join().replace(/,/g, "").replace("(", "").replace(")", "")
                                        }
                                        var textSplit = textVal.split(" ");

                                        if (textSplit.length > 6 && textSplit.reverse()[0].split("-").length == 3) {
                                            var arr = textVal.split(" ").reverse();
                                            var date = arr[3];
                                            date = discuontAsakimPlus.convertDateLocal(date);

//var loanName = $(v).closest(".formatted-query-row").prev().prev().text().trim().replace(/\s/g, " ").split("").reverse().join().replace(/,/g, "").replace("(", "").replace(")", "");
                                            if (loanName == "") {
                                                loanName = null;
                                            }
                                            if (arr[3].indexOf("/") !== -1) {
                                                all.banks.generalVariables.allDataArrLoan.push({
                                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                                    "Token": all.banks.accountDetails.bank.token,
                                                    "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                                    "BranchNumber": branchNumber,
                                                    "AccountNumber": accountNumber,
                                                    "LoanName": loanName,
                                                    "LoanNumber": arr[0],
                                                    "LoanIntrest": arr[5],
                                                    "LoanFinish": null,
                                                    "LoanTotalLeft": arr[1].replace("₪", "").replace(/,/g, '').replace(/\s/g, ""),
                                                    "LoanDate": null,
                                                    "PaymentsNumberLeft": arr[6],
                                                    "LoanOriginalTotal": null,
                                                    "NextPaymentTotal": arr[4].replace("₪", "").replace(/,/g, '').replace(/\s/g, ""),
                                                    "LoanNextPaymentDate": all.banks.core.services.convertDateAll(date),
                                                    "LoanPigurTotal": null
                                                });
                                                var nextLoan = $(v).closest(".formatted-query-row").next();
                                                var textVal1 = $(nextLoan).text().replace(/\s\s+/g, " ").trim();
                                                var textSplit1 = textVal1.split(" ");
                                                if (textSplit1.length > 6 && textSplit1.reverse()[0].split("-").length == 3) {
                                                    var arr1 = textVal1.split(" ").reverse();
                                                    var date1 = arr1[3];
                                                    if (date1.indexOf("/") == -1) {
                                                        all.banks.generalVariables.allDataArrLoan[all.banks.generalVariables.allDataArrLoan.length - 1].LoanPigurTotal = arr1[1].replace("₪", "").replace(/,/g, '').replace(/\s/g, "");
                                                    }
                                                }
                                            }
                                        }
                                        if ($(res).find('.formatted-query-row').length == i + 1) {
                                            myEmitterLogs(12, i + 1); //length arr
                                            discuontAsakimPlus.changeAll();
                                        }
                                    })
                                } else {
                                    discuontAsakimPlus.changeAll();
                                }
                            } catch (e) {

                            }
                        })
                        .fail(function (error, resErr) {
                            all.banks.core.services.errorLog('שגיאה')
                        });
                } else {
                    discuontAsakimPlus.changeAll();
                }
            })
            .fail(function (error, resErr) {
                all.banks.core.services.errorLog('שגיאה')
            });
    };
    discuontAsakimPlus.loadDeposit = function () {
        all.banks.core.services.httpReq("https://start.telebank.co.il/wps/myportal/" + all.banks.accounts.discuontAsakimPlus.typeBank.toUpperCase() + "-H-PAsakimPlus/DEP_INV", 'GET', null, false, false)
            .then(function (res) {
                var res = all.banks.core.services.parseHtml(res);
                if (discuontAsakimPlus.counterOfAccounts !== undefined) {
                    var branchNumber = parseInt(res.find('#trCoExistanceAccountsCombo' + (discuontAsakimPlus.counterOfAccounts - 1) + ' > td').eq(2).text().split('-')[0].replace(/\D/g, ""));
                    var accountNumber = parseInt(res.find('#trCoExistanceAccountsCombo' + (discuontAsakimPlus.counterOfAccounts - 1) + ' > td').eq(1).text().split('|')[0].replace(/\D/g, ""));
                } else {
                    if (!res.find('#CoExistanceAccountsCombo_label').text()) {
                        myEmitterLogs(37, 'deposits: company index ' + all.banks.accounts.discuontAsakimPlus.counterOfCompanies + ": אירעה שגיאה בהחלפת חשבון");
                        discuontAsakimPlus.changeAll();
                        return;
                    }

                    var accountNumber = parseInt(res.find('#CoExistanceAccountsCombo_label').text().split('|')[0].replace(/\D/g, ""));  //get current account
                    var branchNumber = parseInt(res.find('#CoExistanceAccountsCombo_label').text().split('|')[1].split('-')[0].replace(/\D/g, "")); //get current branch
                }
                if (res.find(".menu3And4_secondTD").length) {
                    var indEx = 0;
                    res.find(".menu3And4_secondTD").each(function (i, v) {
                        if ($(v).text().indexOf("פירוט פיקדונות שקליים") !== -1) {
                            indEx = 1;
                            var url = $(v).find("a").attr("href");
                            all.banks.core.services.httpReq("https://start.telebank.co.il" + url, 'GET', null, false, false)
                                .then(function (res) {
                                    var res = all.banks.core.services.parseHtml(res);
                                    var mainSrc = res.find("#showExistingSiteIframe > iframe").attr("src");
                                    if (mainSrc !== undefined) {
                                        all.banks.core.services.httpReq("https://start.telebank.co.il" + mainSrc, 'GET', null, false, false)
                                            .then(function (res) {
                                                var res = all.banks.core.services.parseHtml(res);
                                                try {
                                                    if (res.find('#MsgLabel').length > 0) {
                                                        discuontAsakimPlus.changeAll();
                                                    } else {
                                                        var url_main_frame = res.text().split('var __action = "')[1].split('";')[0];
                                                        if (url_main_frame !== undefined) {
                                                            all.banks.core.services.httpReq("https://start.telebank.co.il" + url_main_frame, 'GET', null, false, false)
                                                                .then(function (res) {
                                                                    var iframeDiv2Src = 'https://start.telebank.co.il/Telebank/investments/A_deposits/PakashMain_Altamira.asp?pageType=info&sMenu_Id=DEP_PKS_DTL&keepXml=true&tabIndex=1&windowId=';
                                                                    all.banks.core.services.httpReq(iframeDiv2Src, 'GET', null, false, false)
                                                                        .then(function (res) {
                                                                            writeHtmlFile('loadDeposit', res);
                                                                            var res = all.banks.core.services.parseHtml(res);
                                                                            if (res.find("#gridTable #innerTable tr").length) {
                                                                                res.find("#gridTable #innerTable tr").each(function (i, v) {
                                                                                    var val = $(v);
                                                                                    var depositDate = val.find("#PlacementDate").text().replace(/\s\s+/g, " ").replace(/-/g, '/').trim();
                                                                                    var dueDate = val.find("#MaturityDate").text().replace(/\s\s+/g, " ").replace(/-/g, '/').trim();
                                                                                    var depositExistStation = val.find("#NextExitDate").text().replace(/\s\s+/g, " ").trim();
                                                                                    dueDate = discuontAsakimPlus.convertDateLocal(dueDate);
                                                                                    depositDate = discuontAsakimPlus.convertDateLocal(depositDate);
                                                                                    depositExistStation = discuontAsakimPlus.convertDateLocal(depositExistStation);

                                                                                    all.banks.generalVariables.allDataArrDeposit.push({
                                                                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                                                                        "Token": all.banks.accountDetails.bank.token,
                                                                                        "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                                                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                                                                        "AccountNumber": accountNumber,
                                                                                        "BranchNumber": branchNumber,
                                                                                        "TypeName": val.find("#Pikname").text().replace(/\s\s+/g, " ").trim(),
                                                                                        "DepositTotal": val.find("#PlacementAmount").text().replace("₪", "").replace(/,/g, '').replace(/\s/g, ""),
                                                                                        "DepositAsTotal": val.find("#PaymentAmmount").text().replace("₪", "").replace(/,/g, '').replace(/\s/g, ""),
                                                                                        "DueDate": all.banks.core.services.convertDateAll(dueDate),
                                                                                        "DepositDate": all.banks.core.services.convertDateAll(depositDate),
                                                                                        "DepositExistStation": all.banks.core.services.convertDateAll(depositExistStation)
// "DepositNumber": val.find("#DepositAccountNumber").text().replace(/\D/g, '')
                                                                                    });
//"DepositInterest": val.find("#Rate")[0].childNodes[0].data.replace(/\s\s+/g, " ").trim().replace("%", "")
                                                                                    if (i + 1 == res.find("#gridTable #innerTable tr").length) {
                                                                                        myEmitterLogs(12, i + 1); //length arr
                                                                                        discuontAsakimPlus.changeAll();
                                                                                    }
                                                                                })
                                                                            } else {
                                                                                discuontAsakimPlus.changeAll();
                                                                            }
                                                                        })

                                                                })
                                                        } else {
                                                            discuontAsakimPlus.changeAll();
                                                        }
                                                    }
                                                } catch (err) {
                                                    all.banks.core.services.errorLog(err)

                                                }
                                            })
                                    } else {
                                        discuontAsakimPlus.changeAll();
                                    }
                                })
                        }
                        if (res.find(".menu3And4_secondTD").length == i + 1) {
                            if (indEx == 0) {
                                discuontAsakimPlus.changeAll();
                            }
                        }
                    })
                } else {
                    discuontAsakimPlus.changeAll();
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    };
    discuontAsakimPlus.loadDueChecks = function () {
        all.banks.core.services.httpReq("https://start.telebank.co.il/wps/myportal/" + all.banks.accounts.discuontAsakimPlus.typeBank.toUpperCase() + "-H-PAsakimPlus/OSH_LENTRIES_ALTAMIRA", 'GET', null, false, false)
            .then(function (res) {
                var res = all.banks.core.services.parseHtml(res);
                if (discuontAsakimPlus.counterOfAccounts !== undefined) {
                    var branchNumber = parseInt($(res).find('#trMainAccountKeyCombo' + (discuontAsakimPlus.counterOfAccounts - 1) + ' > td').eq(2).text().split('-')[0].split('|')[1].replace(/\D/g, ""));
                    var accountNumber = parseInt($(res).find('#trMainAccountKeyCombo' + (discuontAsakimPlus.counterOfAccounts - 1) + ' > td').eq(1).text().split('|')[0].replace(/\D/g, ""));
                } else {
                    if (!res.find('#MainAccountKeyCombo_label').text()) {
                        myEmitterLogs(37, 'dueChecks: company index ' + all.banks.accounts.discuontAsakimPlus.counterOfCompanies + ": אירעה שגיאה בהחלפת חשבון");
                        discuontAsakimPlus.changeAll();
                        return;
                    }

                    var accountNumber = parseInt($(res).find('#MainAccountKeyCombo_label').text().split('|')[0].replace(/\D/g, ""));  //get current account
                    var branchNumber = parseInt($(res).find('#MainAccountKeyCombo_label').text().split('|')[1].split('-')[0].replace(/\D/g, "")); //get current branch
                }
                var url = "https://start.telebank.co.il" + res.find(".Enter_Page_Button_Table_Link").attr("onclick").split("'")[1].split("'")[0];
                all.banks.core.services.httpReq(url, 'GET', null, false, false)
                    .then(function (res) {
                        var res = all.banks.core.services.parseHtml(res);
                        var indEx = 0;
                        res.find(".menuViewNodeTitle").each(function (i, v) {
                            if ($(v).text().indexOf("צפיה בשיקים>>") !== -1) {
                                var url = "https://start.telebank.co.il" + $(v).attr("href");
                                all.banks.core.services.httpReq(url, 'GET', null, false, false)
                                    .then(function (res) {
                                        var res = all.banks.core.services.parseHtml(res);
                                        var url = res.text().split("if (selectedKey==")[1].split('Action =')[1].split(';')[0].replace(/\s/g, "").replace(/"/g, '');

                                        var dateFrom = ("0" + (new Date().getDate())).slice(-2) + '/' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '/' + new Date().getFullYear().toString();
                                        var dateToFormat = new Date(new Date().getFullYear(), new Date().getMonth() + 36, new Date().getDate());
                                        var dateTo = ("0" + (dateToFormat.getDate())).slice(-2) + '/' + ("0" + (dateToFormat.getMonth() + 1)).slice(-2) + '/' + dateToFormat.getFullYear().toString();
                                        var data = {
                                            accountChanged: "",
                                            checktype: "PCK",
                                            ppchecks: "on",
                                            ppcheck_security: "on",
                                            ppchecks_discount: "on",
                                            from_amount: "",
                                            to_amount: "",
                                            frm_chkNo: "",
                                            to_chkNo: "",
                                            reqIddateFrom: "",
                                            frm_date: dateFrom,
                                            reqIddateTo: "",
                                            to_date: dateTo,
                                            ppchecks_temp: "on",
                                            ppchecks_discount_temp: "on",
                                            ppcheck_security_temp: "on"
                                        };
                                        all.banks.core.services.httpReq("https://start.telebank.co.il" + url, 'POST', data, true, false)
                                            .then(function (data) {
                                                var resp = all.banks.core.services.parseHtml(data);
                                                const errorTextOnPage = resp.find("#msgIDBErrMessage").text() || resp.find("#msgIDBErrorMessage").text() || resp.find("#msgIDBPageErrMessage").text();
                                                if (errorTextOnPage.length > 0) {
                                                    discuontAsakimPlus.changeAll();
                                                } else {
                                                    try {
                                                        writeHtmlFile('loadDueChecksDetals', data);
                                                        var data = resp;
                                                        var urlAll = data.text().split('function tableSubmitFunction')[1].split('var Action =')[1].split('var finalAction')[0].replace(/"/g, '').replace(/\s/g, " ").trim();
                                                        var dataJs = {
                                                            ReportName: data.find('input[name="ReportName"]').val(),
                                                            CheckBundlesRowIdx: data.find('input[name="CheckBundlesRowIdx"]').val(),
                                                            selTab: data.find('input[name="selTab"]').val(),
                                                            flagGenReport: data.find('input[name="flagGenReport"]').val(),
                                                            flagBeanPopulation: data.find('input[name="flagBeanPopulation"]').val(),
                                                            outPutFormat: data.find('input[name="outPutFormat"]').val(),
                                                            actionSwitch: data.find('input[name="actionSwitch"]').val(),
                                                            selectednumCheck: data.find('input[name="selectednumCheck"]').val(),
                                                            portletName: data.find('input[name="portletName"]').val(),
                                                            hdUserSortingType: data.find('input[name="hdUserSortingType"]').val(),
                                                            hdUserSortingColumnIndex: data.find('input[name="hdUserSortingColumnIndex"]').val(),
                                                            hdUserSortingPropertyType: data.find('input[name="hdUserSortingPropertyType"]').val(),
                                                            CheckBundlesRowIndex: data.find('input[name="CheckBundlesRowIndex"]').val(),
                                                            CheckBundlesSortingType: data.find('input[name="CheckBundlesSortingType"]').val(),
                                                            CheckBundlesSortingColumnIndex: data.find('input[name="CheckBundlesSortingColumnIndex"]').val(),
                                                            CheckBundlesSortingPropertyType: data.find('input[name="CheckBundlesSortingPropertyType"]').val(),
                                                            CheckBundlesSelectedPage: data.find('input[name="CheckBundlesSelectedPage"]').val(),
                                                            CheckBundlesShowAll: data.find('input[name="CheckBundlesShowAll"]').val(),
                                                            CheckBundlesDoSort: data.find('input[name="CheckBundlesDoSort"]').val(),
                                                            CheckBundlesDoHide: data.find('input[name="CheckBundlesDoHide"]').val(),
                                                            CheckBundlesNewPage: data.find('input[name="CheckBundlesNewPage"]').val(),
                                                            CheckBundles_hiddenpropertyName: data.find('input[name="CheckBundles_hiddenpropertyName"]').val(),
                                                            CheckBundles_hiddenSortDirection: 0,
                                                            CheckBundles_hiddenShowPage: data.find('input[name="CheckBundles_hiddenShowPage"]').val(),
                                                            CheckBundles_hiddenshowAllClicked: true,
                                                            CheckBundles_hiddenByttonType: data.find('input[name="CheckBundles_hiddenByttonType"]').val(),
                                                            CheckBundles_hiddenrequestUserSelectedCheckBoxes: data.find('input[name="CheckBundles_hiddenrequestUserSelectedCheckBoxes"]').val(),
                                                            CheckBundlesNameRowIndex: data.find('input[name="CheckBundlesNameRowIndex"]').val(),
                                                            CheckBundlesNameSortingType: data.find('input[name="CheckBundlesNameSortingType"]').val(),
                                                            CheckBundlesNameSortingColumnIndex: data.find('input[name="CheckBundlesNameSortingColumnIndex"]').val(),
                                                            CheckBundlesNameSortingPropertyType: data.find('input[name="CheckBundlesNameSortingPropertyType"]').val(),
                                                            CheckBundlesNameSelectedPage: data.find('input[name="CheckBundlesNameSelectedPage"]').val(),
                                                            CheckBundlesNameShowAll: data.find('input[name="CheckBundlesNameShowAll"]').val(),
                                                            CheckBundlesNameDoSort: data.find('input[name="CheckBundlesNameDoSort"]').val(),
                                                            CheckBundlesNameDoHide: data.find('input[name="CheckBundlesNameDoHide"]').val(),
                                                            CheckBundlesNameNewPage: data.find('input[name="CheckBundlesNameNewPage"]').val(),
                                                            ChecksDetails2_hiddenpropertyName: data.find('input[name="ChecksDetails2_hiddenpropertyName"]').val(),
                                                            ChecksDetails2_hiddenSortDirection: 0,
                                                            ChecksDetails2_hiddenShowPage: data.find('input[name="ChecksDetails2_hiddenShowPage"]').val(),
                                                            ChecksDetails2_hiddenshowAllClicked: true,
                                                            ChecksDetails2_hiddenByttonType: data.find('input[name="ChecksDetails2_hiddenByttonType"]').val(),
                                                            ChecksDetails2_hiddenrequestUserSelectedCheckBoxes: data.find('input[name="ChecksDetails2_hiddenrequestUserSelectedCheckBoxes"]').val(),
                                                        }
                                                        data.find('#combo_list_wrapper-DraftActActionComboId tbody tr .sme-ext-asterisks-blank ').each(function (i, v) {
                                                            if (data.find('#DraftActActionComboId_' + i).val() != undefined) {
                                                                dataJs['DraftActActionCombo' + i] = data.find('#DraftActActionComboId_' + i).val();
                                                            }
                                                        })
                                                    } catch (err) {
                                                        all.banks.core.services.errorLog(err);
                                                    }
                                                    all.banks.core.services.httpReq("https://start.telebank.co.il" + urlAll, 'POST', dataJs, true, false)
                                                        .then(function (data1) {
                                                            writeHtmlFile('loadDueChecksDetals', data1);
                                                            var data = all.banks.core.services.parseHtml(data1);

                                                            if ($(data).find('#containerTblId-tbody').length) {
                                                                $(data).find('#containerTblId-tbody  > tr').each(function (i, v) {
                                                                    if ($(v).find('> td').length == 6) {
                                                                        var dueDate = $(v).find('#col_4').text().replace(/ /g, '').replace(/\s/g, "");
                                                                        var depositeDate = $(v).next().find(' #innerPG  td ').eq(1).find('span').eq(1).text().replace(/ /g, '').replace(/\s/g, "");
                                                                        if ($(v).find('#col_3 table a').length) {
                                                                            var CheckNumber = $(v).find('#col_3 table a').text().replace(/ /g, '').replace(/\s/g, "")
                                                                        } else {
                                                                            var CheckNumber = $(v).find('#col_3 label').text().replace(/ /g, '').replace(/\s/g, "")
                                                                        }
                                                                        depositeDate = discuontAsakimPlus.convertDateLocal(depositeDate);
                                                                        dueDate = discuontAsakimPlus.convertDateLocal(dueDate);
                                                                        all.banks.generalVariables.allDataArrDueChecks.push({
                                                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                                                            "Token": all.banks.accountDetails.bank.token,
                                                                            "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                                                            "BranchNumber": branchNumber,
                                                                            "AccountNumber": accountNumber,
                                                                            "CheckNumber": CheckNumber,
                                                                            "CheckDescription": $(v).find('#col_1').text().replace(/ /g, '').replace(/\s/g, ""),
                                                                            "DepositeDate": all.banks.core.services.convertDateAll(depositeDate),
                                                                            "DueDate": all.banks.core.services.convertDateAll(dueDate),
                                                                            "CheckTotal": $(v).find('#col_5').text().replace(/ /g, '').replace(/,/g, "").replace(/\s/g, ""),
                                                                            "CheckBankNumber": $(v).next().find(' #innerPG  ').find('tr').eq(1).find('td').eq(0).find('span').eq(1).text().replace(/\s/g, ""),
                                                                            "CheckAccountNumber": $(v).find('#col_2').text().replace(/\s\s+/g, "").replace(/ /g, '').replace(/,/g, ''),
                                                                            "CheckBranchNumber": $(v).next().find('#innerPG ').find('tr').eq(1).find('td').eq(1).find('span').eq(1).text().replace(/\s/g, "")
                                                                        });
                                                                    }
                                                                    if ($(data).find('#containerTblId-tbody > tr').length == i + 1) {
                                                                        myEmitterLogs(12, i + 1); //length arr
                                                                        discuontAsakimPlus.changeAll();
                                                                    }
                                                                })
                                                            } else {
                                                                discuontAsakimPlus.changeAll();
                                                            }

                                                        });
                                                }
                                            });
                                    });
                                indEx = 1;
                            }
                            if (res.find(".menuViewNodeTitle").length == i + 1) {
                                if (indEx == 0) {
                                    discuontAsakimPlus.changeAll();
                                }
                            }
                        })
                    });
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    };
    discuontAsakimPlus.loadStandingOrders = function () {
        all.banks.core.services.httpReq("https://start.telebank.co.il/wps/myportal/" + all.banks.accounts.discuontAsakimPlus.typeBank.toUpperCase() + "-H-PAsakimPlus/OSH_LENTRIES_ALTAMIRA", 'GET', null, false, false)
            .then(function (res) {
                var res = all.banks.core.services.parseHtml(res);
                var url = "https://start.telebank.co.il" + res.find(".Enter_Page_Button_Table_Link").attr("onclick").split("'")[1].split("'")[0];
                all.banks.core.services.httpReq(url, 'GET', null, false, false)
                    .then(function (res) {
                        var res = $(res);
                        var url = res.find("a.menuViewNodeTitle:contains('דו\"ח הרשאות לחיוב חשבון>>')").attr("href");
                        if (!url) {
                            discuontAsakimPlus.changeAll();
                            return;
                        }

                        all.banks.core.services.httpReq("https://start.telebank.co.il" + url, 'GET', null, false, false).then(function (res) {
                            all.banks.core.services.httpReq("https://start.telebank.co.il/wps/myportal/" + all.banks.accounts.discuontAsakimPlus.typeBank.toUpperCase() + "-H-PAsakimPlus/DEBIT_AUTHORIZATION_NAUT", 'GET', null, false, false)
                                .then(function (res) {
                                    var res = all.banks.core.services.parseHtml(res);

                                    const showExistingSiteIframeUrl = res.find("iframe#phpIFrame").attr("src");
                                    if (!showExistingSiteIframeUrl) {
                                        discuontAsakimPlus.changeAll();
                                        return;
                                    }

                                    let branchNumber, accountNumber;
                                    if (discuontAsakimPlus.counterOfAccounts !== undefined) {
                                        branchNumber = parseInt(res.find('#trCoExistanceAccountsCombo' + (discuontAsakimPlus.counterOfAccounts - 1) + ' > td').eq(2).text().split('-')[0].replace(/\D/g, ""));
                                        accountNumber = parseInt(res.find('#trCoExistanceAccountsCombo' + (discuontAsakimPlus.counterOfAccounts - 1) + ' > td').eq(1).text().split('|')[0].replace(/\D/g, ""));
                                    } else {
                                        if (!res.find('#CoExistanceAccountsCombo_label').text()) {
                                            myEmitterLogs(37, 'standing orders: company index ' + all.banks.accounts.discuontAsakimPlus.counterOfCompanies + ": אירעה שגיאה בהחלפת חשבון");
                                            discuontAsakimPlus.changeAll();
                                            return;
                                        }

                                        accountNumber = parseInt(res.find('#CoExistanceAccountsCombo_label').text().split('|')[0].replace(/\D/g, ""));  //get current account
                                        branchNumber = parseInt(res.find('#CoExistanceAccountsCombo_label').text().split('|')[1].split('-')[0].replace(/\D/g, "")); //get current branch
                                    }

                                    all.banks.core.services.httpReq("https://start.telebank.co.il" + showExistingSiteIframeUrl, 'GET', null, false, false).then(function (res) {
                                        writeHtmlFile('loadStandingOrders', res);
                                        var res = all.banks.core.services.parseHtml(res);

                                        const rows = res.find("#debitAuthorizationsList_table > tbody > tr[name^='statusCode']");
                                        if (!rows.length) {
                                            discuontAsakimPlus.changeAll();
                                            return;
                                        }

                                        rows.each(function (i, v) {
                                            const row = $(v);
                                            const rowAdditional = row.next("tr.expand-child");

                                            const orderOpeningDate = rowAdditional.length > 0
                                                ? discuontAsakimPlus.dateFromDDMMYYOrNull(rowAdditional.find("span.text-label-title:contains('תאריך פתיחת הרשאה:')")
                                                    .next("span.text-label-value").text()
                                                    .replace(/[^\d\/]/g, ''), true)
                                                : null;
                                            const orderNumber = rowAdditional.length > 0
                                                ? rowAdditional.find("span.text-label-title:contains('קוד מוסד:')")
                                                    .next("span.text-label-value").text()
                                                    .replace(/\D/g, '')
                                                : null;
                                            const order = {
                                                "TargetId": all.banks.accountDetails.bank.targetId,
                                                "Token": all.banks.accountDetails.bank.token,
                                                "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                                "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                "ExporterId": all.banks.spiderConfig.spiderId,
                                                "AccountNumber": accountNumber,
                                                "BranchNumber": branchNumber,
                                                "OrderName": row.find("td").eq(0).text().trim(),
                                                "OrderOpeningDate": orderOpeningDate,
                                                "OrderLastDate": discuontAsakimPlus.dateFromDDMMYYOrNull(row.find("td").eq(1).text().replace(/[^\d\/]/g, '')),
                                                "OrderTotal": row.find("td").eq(2).text().replace(/[^\d\-\.]/g, ''),
                                                "OrderNumber": orderNumber,
                                                "Asmachta": null,
                                                BankTransferNumber: null,
                                                BranchTransferNumber: null,
                                                AccountTransferNumber: null,
                                                NamePayerTransfer: null,
                                                Type: 2,
                                            };
                                            all.banks.generalVariables.allDataArrStandingOrders.push(order);

                                            if (rows.length === i + 1) {
                                                myEmitterLogs(12, rows.length); //length arr
                                                discuontAsakimPlus.changeAll();
                                            }
                                        });
                                    });
                                });
                        });

//				var indEx = 0;
//				res.find(".menuViewNodeTitle").each(function (i, v) {
//					if ($(v).text().indexOf("ריכוז הוראות קבע ופירוט העברות>>") !== -1) {
//						var url = "https://start.telebank.co.il" + $(v).attr("href");
//						all.banks.core.services.httpReq(url, 'GET', null, false, false)
//						.then(function (res) {
//							var res = all.banks.core.services.parseHtml(res);
//							if (discuontAsakimPlus.counterOfAccounts !== undefined) {
//								var branchNumber = parseInt(res.find('#trCoExistanceAccountsCombo' + (discuontAsakimPlus.counterOfAccounts - 1) + ' > td').eq(2).text().split('-')[0].replace(/\D/g, ""));
//								var accountNumber = parseInt(res.find('#trCoExistanceAccountsCombo' + (discuontAsakimPlus.counterOfAccounts - 1) + ' > td').eq(1).text().split('|')[0].replace(/\D/g, ""));
//							}
//							else {
//								if (!res.find('#CoExistanceAccountsCombo_label').text()) {
//									myEmitterLogs(37, 'standing orders: company index ' + all.banks.accounts.discuontAsakimPlus.counterOfCompanies + ": אירעה שגיאה בהחלפת חשבון");
//									discuontAsakimPlus.changeAll();
//									return;
//								}
//
//								var accountNumber = parseInt(res.find('#CoExistanceAccountsCombo_label').text().split('|')[0].replace(/\D/g, ""));  //get current account
//								var branchNumber = parseInt(res.find('#CoExistanceAccountsCombo_label').text().split('|')[1].split('-')[0].replace(/\D/g, "")); //get current branch
//							}
//							if (res.find("#showExistingSiteIframe iframe").length) {
//								var url = "https://start.telebank.co.il" + res.find("#showExistingSiteIframe iframe").attr("src");
//								all.banks.core.services.httpReq(url, 'GET', null, false, false)
//								.then(function (res) {
//									writeHtmlFile('loadStandingOrders', res);
//									var res = all.banks.core.services.parseHtml(res);
//									if (res.find(".MasterTable_Discount tbody tr").length) {
//										res.find(".MasterTable_Discount > tbody > tr.GridRow_Discount").each(function (i, v) {
//											var date = $(v).find("td").eq(5).text().replace(/-/g, '/');
//											date = discuontAsakimPlus.convertDateLocal(date);
//											all.banks.generalVariables.allDataArrStandingOrders.push({
//												"TargetId": all.banks.accountDetails.bank.targetId,
//												"Token": all.banks.accountDetails.bank.token,
//												"BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
//												"ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
//												"ExporterId": all.banks.spiderConfig.spiderId,
//												"AccountNumber": accountNumber,
//												"BranchNumber": branchNumber,
//												"OrderName": $(v).find("td").eq(0).text().trim(),
//												"OrderOpeningDate": null,
//												"OrderLastDate": all.banks.core.services.convertDateAll(date),
//												"OrderTotal": $(v).find("td").eq(2).text().replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, ''),
//												"OrderNumber": null,
//												"Asmachta": null
//											});
//											if (res.find(".MasterTable_Discount > tbody > tr.GridRow_Discount").length == i + 1) {
//												myEmitterLogs(12, i + 1); //length arr
//												discuontAsakimPlus.changeAll();
//											}
//										})
//									}
//									else {
//										discuontAsakimPlus.changeAll();
//									}
//								})
//							}
//							else {
//								discuontAsakimPlus.changeAll();
//							}
//						});
//						indEx = 1;
//					}
//					if (res.find(".menuViewNodeTitle").length == i + 1) {
//						if (indEx == 0) {
//							discuontAsakimPlus.changeAll();
//						}
//					}
//				})
                    });
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    };
    discuontAsakimPlus.loadMatah = function () {
        all.banks.core.services.httpReq("https://start.telebank.co.il/wps/myportal/" + all.banks.accounts.discuontAsakimPlus.typeBank.toUpperCase() + "-H-PAsakimPlus/FRN_CRN_ACC_LENTRIES_ALTAMIRA", 'GET', null, false, false)
            .then(function (res) {
                var res = all.banks.core.services.parseHtml(res);

                if (res.find('#msgIDBMessage').length == 0) {
                    var dataForm = {
                        "ReportName": "LastTransactionsRpt_he",
                        "flagGenReport": "Y",
                        "flagBeanPopulation": "Y",
                        "outPutFormat": "",
                        "actionSwitch": "N",
                        "radioValueHidden": "",
                        "pageTitleHidden": "תנועות אחרונות במט",
                        "OpCode": "",
                        "ValueDate": "",
                        "CheckNum": "",
                        "DepositNum": "",
                        "InsertOpAmt": "",
                        "OpBranch": "",
                        "OpBank": "",
                        "urn": "",
                        "transDesc": "",
                        "portletName": "LastTransactionsForeign",
                        "creditLimitHidden": "0.00",
                        "noOfTransactionsCombo_selectBox": "16",
                        "noOfTransactionsCombo": "16",
//                                        "quantityRadioList0": 1,
//                                        "noOfTransactionsCombo_comboValue": "16 תנועות אחרונות",
                        "quantityRadioList0": "2",
                        "fromDate": all.banks.accounts.discuontAsakimPlus.datebacksleshMatah,
                        "toDate": all.banks.accounts.discuontAsakimPlus.datebacksleshToMatah,
                        "lst_Frm_AMT": "",
                        "lst_To_AMT": "",
                        "transactionTypeCombo_selectBox": "All",
                        "transactionTypeCombo_comboValue": "זכות/חובה",
                        "transactionTypeCombo": "All",
                        "lst_Trns_DESC": "",
                        "lst_Mode": "basic",
                        "Foreignlst_ConvertedtableRowIndex": "",
                        "Foreignlst_ConvertedtableSortingType": "",
                        "Foreignlst_ConvertedtableSortingColumnIndex": "",
                        "Foreignlst_ConvertedtableSortingPropertyType": "",
                        "Foreignlst_ConvertedtableSelectedPage": "1",
                        "Foreignlst_ConvertedtableShowAll": "",
                        "Foreignlst_ConvertedtableDoSort": "false",
                        "Foreignlst_ConvertedtableDoHide": "false",
                        "Foreignlst_ConvertedtableNewPage": "true",
                        "convertedtable_hiddenpropertyName": "",
                        "convertedtable_hiddenSortDirection": "",
                        'convertedtable_hiddenShowPage': all.banks.accounts.discuontAsakimPlus.ind + 1, // set page
                        "convertedtable_hiddenshowAllClicked": "false",
                        "convertedtable_hiddenByttonType": "",
                        "convertedtable_hiddenrequestUserSelectedCheckBoxes": ""
                    };
                    var urlsMatah;
                    var numOfMatahacc = res.find('#fLastTranC14 .smeModal_modalPage .input_table .combo_list_table-rtl > tbody > tr').length;
                    if (numOfMatahacc) {
                        dataForm ['ForeignAccountKeyCombo' + discuontAsakimPlus.matahSubAcc] = discuontAsakimPlus.matahSubAcc;
                        var changeAccMatah = "https://start.telebank.co.il" + res.text().split('function changeForeignAccount()')[1].split('Action = "')[1].split('"')[0];

                        all.banks.core.services.httpReq(changeAccMatah, 'POST', dataForm, true, false)
                            .then(function (response) {
                                var res = all.banks.core.services.parseHtml(response);
                                urlsMatah = "https://start.telebank.co.il" + res.text().split('_searchOptionFunc()')[1].split('Action = "')[1].split('"')[0].replace(/\s/g, "").replace(/"/g, '');

                                all.banks.core.services.httpReq(urlsMatah, 'POST', dataForm, true, false)
                                    .then(function (response) {
                                        var response = all.banks.core.services.parseHtml(response);
                                        dataForm['convertedtable_hiddenshowAllClicked'] = true;
                                        var urlAll = "https://start.telebank.co.il" + response.text().split('tableSubmitFunction(')[1].split(' var Action = "')[1].split('"')[0];

                                        all.banks.core.services.httpReq(urlAll, 'POST', dataForm, true, false)
                                            .then(function (response) {
                                                writeHtmlFile('loadMatah', response);
                                                discuontAsakimPlus.resetSwiftDetailsFetchActionUrl(response);

                                                var response = all.banks.core.services.parseHtml(response);
                                                if (discuontAsakimPlus.counterOfAccounts !== undefined) {
                                                    var branchNumber = parseInt(response.find('#trMainAccountKeyCombo' + (discuontAsakimPlus.counterOfAccounts - 1) + ' > td').eq(2).text().split('-')[0].split('|')[1].replace(/\D/g, ""));
                                                    var accountNumber = parseInt(response.find('#trMainAccountKeyCombo' + (discuontAsakimPlus.counterOfAccounts - 1) + ' > td').eq(1).text().split('|')[0].replace(/\D/g, ""));
                                                } else {
                                                    if (!response.find('#MainAccountKeyCombo_label').text()) {
                                                        myEmitterLogs(37, 'matach: company index ' + all.banks.accounts.discuontAsakimPlus.counterOfCompanies + ": אירעה שגיאה בהחלפת חשבון");
                                                        discuontAsakimPlus.changeAll();
                                                        return;
                                                    }

                                                    var accountNumber = parseInt(response.find('#MainAccountKeyCombo_label').text().split('|')[0].replace(/\D/g, ""));  //get current account
                                                    var branchNumber = parseInt(response.find('#MainAccountKeyCombo_label').text().split('|')[1].split('-')[0].replace(/\D/g, "")); //get current branch
                                                }
                                                var baseAccDeaElem = response.find('label[name="ForeignAccountKeyCombo"]');
                                                var bankaccounttypeId = '';
                                                if (baseAccDeaElem.length > 0) {
                                                    var baseAccDea = baseAccDeaElem.text().split("|");
                                                    bankaccounttypeId = baseAccDea[0].replace(/\s/g, "");
                                                }
                                                if (baseAccDeaElem.length == 0) {
                                                    baseAccDeaElem = response.find('#fLastTranC14 .smeModal_modalPage .input_table .combo_list_table-rtl > tbody > tr').eq(discuontAsakimPlus.matahSubAcc + 1);
                                                    var baseAccDea = baseAccDeaElem.text().split("|");
                                                    bankaccounttypeId = baseAccDea[0].replace(/\s/g, "").split(';')[1];

                                                }
                                                if (baseAccDeaElem.length) {
                                                    var baseAccDea = baseAccDeaElem.text().split("|");
                                                    var currencyid = all.banks.core.services.getTypeCurrencyAll(baseAccDea[2].replace(/\s/g, ""), true);
                                                    if (response.find('[name="lst_Acc_BAl"]').text().indexOf('-') !== -1) {
                                                        var balanceUse = parseFloat(response.find('[name="lst_Acc_BAl"]').text().replace(/\s/g, "").replace(/,/g, ''));
                                                        var balance = -Math.abs(balanceUse);
                                                    } else {
                                                        var balance = parseFloat(response.find('[name="lst_Acc_BAl"]').text().replace(/\s/g, "").replace(/,/g, ''));
                                                    }
                                                    if (balance == undefined) {
                                                        balance = 0;
                                                    }
                                                    var acc = {
                                                        'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                                        'AccountNumber': bankaccounttypeId,
                                                        'BranchNumber': branchNumber,
                                                        'Balance': balance,
                                                        'AccountCredit': null,
                                                        "BankAccountTypeId": accountNumber,
                                                        "CurrencyId": currencyid
                                                    };
                                                    myEmitterLogs(35, accountNumber); //start dueChecks
                                                    all.banks.generalVariables.allDataArrMatah.BankData[0].Account.push(acc);
                                                    all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow = [];
                                                    var trRows = response.find("#convertedtable #containerTblId-tbody > tr");
                                                    if (trRows.length) {
//										var isHaavara = 0;
                                                        const lastTrFormData = response.find("form[name$='_lastTransactionForm']").serializeArray();
                                                        trRows.each(function (i, v) {
                                                            var val = $(v);
//											var depositeTransferData = null;
                                                            var date = val.find("td#col1 label").text().replace(/\s/g, "");
                                                            var valueDate = date;
                                                            valueDate = discuontAsakimPlus.convertDateLocal(valueDate);
                                                            let additionalDataVal = null;

                                                            var transDesc = val.find("td#col4 label");
                                                            if (transDesc.length) {
                                                                transDesc = transDesc.text();
                                                            } else {
                                                                transDesc = val.find("td#col4 a").text();
//												if (val.find("td#col4 a").attr("onclick").split("commonAjaxTransferDetails(").length > 1) {
//													isHaavara = 1;
//													var transferDetails = val.find("td#col4 a").attr("onclick").split("commonAjaxTransferDetails(")[1].split(')"')[0].split(",");
//													depositeTransferData = {
//														"objectName": "transaction_type=InternalTransfer^operationNumber=" + transferDetails[0].replace(/'/g, "") + "^urn=" + transferDetails[2].replace(/'/g, "") + "^operationAmount=" + transferDetails[6].replace(/'/g, "") + "^transDescription=" + transferDetails[5].replace(/'/g, "") + "^",
//														"_": ""
//													};
//												}
                                                                const onClickTxt = val.find("td#col4 a").attr("onclick");
                                                                additionalDataVal = discuontAsakimPlus.oshRowAdditionalPatterns.some(ptrn => ptrn.test(onClickTxt))
                                                                    ? {
                                                                        action: onClickTxt,
                                                                        formData: [...lastTrFormData,
                                                                            {
                                                                                name: "Foreignlst_ConvertedtableRowIndex",
                                                                                value: val.attr("rownumber")
                                                                            }
                                                                        ]
                                                                    } : null;
                                                            }
                                                            var asmachta = val.find("td#col5 label").text().replace(/\s/g, "");
                                                            var transactionType,
                                                                total = val.find("td#col6 label").text().replace(/\s/g, "").replace(/,/g, '');
                                                            var balanceRow = val.find("td#col7 label").text().replace(/\s/g, "").replace(/,/g, '');
                                                            if (balanceRow == '') {
                                                                balanceRow = null;
                                                            }
                                                            if (balanceRow !== null) {
                                                                if (balanceRow.indexOf("-") !== -1) {
                                                                    balanceRow = -Math.abs(parseFloat(balanceRow))
                                                                }
                                                            }
                                                            if (total.indexOf("-") == -1) {
                                                                transactionType = "1";
                                                                total = total.replace('-', '');
                                                            } else {
                                                                transactionType = "0";
                                                                total = total.replace('-', '');
                                                            }
                                                            all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.push({
                                                                "Asmachta": asmachta.replace(/\D/g, ""),
                                                                "TransDesc": transDesc.replace(/\s/g, " ").trim(),
                                                                "ValueDate": all.banks.core.services.convertDateAll(valueDate),
                                                                "TransactionType": transactionType,
                                                                "TransTotal": total,
                                                                "Balance": balanceRow,
                                                                "IsDaily": "0",
                                                                "imgs": null,
                                                                //"DepositeTransferData": depositeTransferData,
                                                                "additionalData": additionalDataVal
                                                            });
                                                            if (trRows.length === i + 1) {
//												if (isHaavara == 0) {
//													if (numOfMatahacc != undefined && numOfMatahacc > discuontAsakimPlus.matahSubAcc + 1) {
//														discuontAsakimPlus.matahSubAcc++;
//														discuontAsakimPlus.loadMatah();
//													}
//													else {
//														discuontAsakimPlus.matahSubAcc = 0;
//														discuontAsakimPlus.changeAll();
//													}
//												}
//												else {
//													discuontAsakimPlus.getHaavara(numOfMatahacc);
                                                                discuontAsakimPlus.loadRowsAdditionalData(
                                                                    all.banks.generalVariables.allDataArrMatah.BankData[0]
                                                                        .Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow,
                                                                    function () {
                                                                        if (numOfMatahacc !== undefined && numOfMatahacc > discuontAsakimPlus.matahSubAcc + 1) {
                                                                            discuontAsakimPlus.matahSubAcc++;
                                                                            discuontAsakimPlus.loadMatah();
                                                                        } else {
                                                                            discuontAsakimPlus.matahSubAcc = 0;
                                                                            discuontAsakimPlus.changeAll();
                                                                        }
                                                                    });
//												}
                                                            }
                                                        })
                                                    } else {
                                                        if (numOfMatahacc != undefined && numOfMatahacc > discuontAsakimPlus.matahSubAcc + 1) {
                                                            discuontAsakimPlus.matahSubAcc++;
                                                            discuontAsakimPlus.loadMatah();
                                                        } else {
                                                            all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow = [];
                                                            discuontAsakimPlus.matahSubAcc = 0;
                                                            discuontAsakimPlus.changeAll();
                                                        }
                                                    }
                                                } else {
                                                    if (numOfMatahacc != undefined && numOfMatahacc > discuontAsakimPlus.matahSubAcc + 1) {
                                                        discuontAsakimPlus.matahSubAcc++;
                                                        discuontAsakimPlus.loadMatah();
                                                    } else {
                                                        discuontAsakimPlus.matahSubAcc = 0;
                                                        discuontAsakimPlus.changeAll();

                                                    }
                                                }
                                            })
                                    })
                            })
                    } else {
                        if (res.text().split('_searchOptionFunc()').length > 1) {
                            urlsMatah = "https://start.telebank.co.il" + res.text().split('_searchOptionFunc()')[1].split('var Action = "')[1].split('"')[0].replace(/\s/g, "").replace(/"/g, '');

                            all.banks.core.services.httpReq(urlsMatah, 'POST', dataForm, true, false)
                                .then(function (response) {
                                    var response = all.banks.core.services.parseHtml(response);
                                    dataForm ['convertedtable_hiddenshowAllClicked'] = true;
                                    var urlAll = "https://start.telebank.co.il" + response.text().split('tableSubmitFunction(')[1].split(' var Action = "')[1].split('"')[0]

                                    all.banks.core.services.httpReq(urlAll, 'POST', dataForm, true, false)
                                        .then(function (response) {
                                            writeHtmlFile('loadMatah', response);
                                            discuontAsakimPlus.resetSwiftDetailsFetchActionUrl(response);

                                            var response = all.banks.core.services.parseHtml(response);
                                            if (discuontAsakimPlus.counterOfAccounts !== undefined) {
                                                var branchNumber = parseInt(response.find('#trMainAccountKeyCombo' + (discuontAsakimPlus.counterOfAccounts - 1) + ' > td').eq(2).text().split('-')[0].split('|')[1].replace(/\D/g, ""));
                                                var accountNumber = parseInt(response.find('#trMainAccountKeyCombo' + (discuontAsakimPlus.counterOfAccounts - 1) + ' > td').eq(1).text().split('|')[0].replace(/\D/g, ""));
                                            } else {
                                                if (!response.find('#MainAccountKeyCombo_label').text()) {
                                                    myEmitterLogs(37, 'matach: company index ' + all.banks.accounts.discuontAsakimPlus.counterOfCompanies + ": אירעה שגיאה בהחלפת חשבון");
                                                    discuontAsakimPlus.changeAll();
                                                    return;
                                                }

                                                var accountNumber = parseInt(response.find('#MainAccountKeyCombo_label').text().split('|')[0].replace(/\D/g, ""));  //get current account
                                                var branchNumber = parseInt(response.find('#MainAccountKeyCombo_label').text().split('|')[1].split('-')[0].replace(/\D/g, "")); //get current branch
                                            }
                                            var baseAccDeaElem = response.find('label[name="ForeignAccountKeyCombo"]');
                                            var bankaccounttypeId = '';
                                            if (baseAccDeaElem.length > 0) {
                                                var baseAccDea = baseAccDeaElem.text().split("|");
                                                bankaccounttypeId = baseAccDea[0].replace(/\s/g, "");
                                            }
                                            if (baseAccDeaElem.length == 0) {
                                                baseAccDeaElem = response.find('#fLastTranC14 .smeModal_modalPage .input_table .combo_list_table-rtl > tbody > tr').eq(discuontAsakimPlus.matahSubAcc + 1);
                                                var baseAccDea = baseAccDeaElem.text().split("|");
                                                bankaccounttypeId = baseAccDea[0].replace(/\s/g, "").split(';')[1];

                                            }
                                            if (baseAccDeaElem.length) {
                                                var baseAccDea = baseAccDeaElem.text().split("|");

                                                var currencyidCandidate = baseAccDea[2].replace(/\s/g, "");
                                                var currencyid = currencyidCandidate
                                                    ? all.banks.core.services.getTypeCurrencyAll(currencyidCandidate, true)
                                                    : all.banks.core.services.getTypeCurrencyAll(baseAccDea[1].replace(/\s/g, ""), true);

                                                if (response.find('[name="lst_Acc_BAl"]').text().indexOf('-') !== -1) {
                                                    var balanceUse = parseFloat(response.find('[name="lst_Acc_BAl"]').text().replace(/\s/g, "").replace(/,/g, ''));
                                                    var balance = -Math.abs(balanceUse);
                                                } else {
                                                    var balance = parseFloat(response.find('[name="lst_Acc_BAl"]').text().replace(/\s/g, "").replace(/,/g, ''));
                                                }
                                                if (balance == undefined) {
                                                    balance = 0;
                                                }

                                                if (!/\d+/g.test(bankaccounttypeId)) {
                                                    bankaccounttypeId = accountNumber;
                                                }

                                                var acc = {
                                                    'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                                    'AccountNumber': bankaccounttypeId,
                                                    'BranchNumber': branchNumber,
                                                    'Balance': balance,
                                                    'AccountCredit': null,
                                                    "BankAccountTypeId": accountNumber,
                                                    "CurrencyId": currencyid
                                                };
                                                myEmitterLogs(35, accountNumber); //start dueChecks
                                                all.banks.generalVariables.allDataArrMatah.BankData[0].Account.push(acc);
                                                all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow = [];
                                                var trRows = response.find("#convertedtable #containerTblId-tbody > tr");
                                                if (trRows.length) {
//										var isHaavara = 0;
                                                    const lastTrFormData = response.find("form[name$='_lastTransactionForm']").serializeArray();
                                                    trRows.each(function (i, v) {
                                                        var val = $(v);
//											var depositeTransferData = null;
                                                        var date = val.find("td#col1 label").text().replace(/\s/g, "");
                                                        var valueDate = date;
                                                        valueDate = discuontAsakimPlus.convertDateLocal(valueDate);
                                                        let additionalDataVal = null;

                                                        var transDesc = val.find("td#col4 label");
                                                        if (transDesc.length) {
                                                            transDesc = transDesc.text();
                                                        } else {

                                                            transDesc = val.find("td#col4 a").text();
//												if (val.find("td#col4 a").attr("onclick").split("commonAjaxTransferDetails(").length > 1) {
//													isHaavara = 1;
//													var transferDetails = val.find("td#col4 a").attr("onclick").split("commonAjaxTransferDetails(")[1].split(')"')[0].split(",");
//													depositeTransferData = {
//														"objectName": "transaction_type=InternalTransfer^operationNumber=" + transferDetails[0].replace(/'/g, "") + "^urn=" + transferDetails[2].replace(/'/g, "") + "^operationAmount=" + transferDetails[6].replace(/'/g, "") + "^transDescription=" + transferDetails[5].replace(/'/g, "") + "^",
//														"_": ""
//													};
//												}
                                                            const onClickTxt = val.find("td#col4 a").attr("onclick");
                                                            additionalDataVal = discuontAsakimPlus.oshRowAdditionalPatterns.some(ptrn => ptrn.test(onClickTxt))
                                                                ? {
                                                                    action: onClickTxt,
                                                                    formData: [...lastTrFormData,
                                                                        {
                                                                            name: "Foreignlst_ConvertedtableRowIndex",
                                                                            value: val.attr("rownumber")
                                                                        }
                                                                    ]
                                                                } : null;
                                                        }
                                                        var asmachta = val.find("td#col5 label").text().replace(/\s/g, "");
                                                        var transactionType,
                                                            total = val.find("td#col6 label").text().replace(/\s/g, "").replace(/,/g, '');
                                                        var balanceRow = val.find("td#col7 label").text().replace(/\s/g, "").replace(/,/g, '');
                                                        if (balanceRow == '') {
                                                            balanceRow = null;
                                                        }
                                                        if (balanceRow !== null) {
                                                            if (balanceRow.indexOf("-") !== -1) {
                                                                balanceRow = -Math.abs(parseFloat(balanceRow))
                                                            }
                                                        }
                                                        if (total.indexOf("-") == -1) {
                                                            transactionType = "1";
                                                            total = total.replace('-', '');
                                                        } else {
                                                            transactionType = "0";
                                                            total = total.replace('-', '');
                                                        }
                                                        all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.push({
                                                            "Asmachta": asmachta.replace(/\D/g, ""),
                                                            "TransDesc": transDesc.replace(/\s/g, " ").trim(),
                                                            "ValueDate": all.banks.core.services.convertDateAll(valueDate),
                                                            "TransactionType": transactionType,
                                                            "TransTotal": total,
                                                            "Balance": balanceRow,
                                                            "IsDaily": "0",
                                                            "imgs": null,
                                                            //"DepositeTransferData": depositeTransferData
                                                            "additionalData": additionalDataVal
                                                        });
                                                        if (trRows.length == i + 1) {
//												if (isHaavara == 0) {
//													if (numOfMatahacc != undefined && numOfMatahacc > discuontAsakimPlus.matahSubAcc + 1) {
//														discuontAsakimPlus.matahSubAcc++;
//
//														discuontAsakimPlus.loadMatah();
//													}
//													else {
//														discuontAsakimPlus.matahSubAcc = 0;
//														discuontAsakimPlus.changeAll();
//													}
//												}
//												else {
//													discuontAsakimPlus.getHaavara(numOfMatahacc);
//												}
                                                            discuontAsakimPlus.loadRowsAdditionalData(
                                                                all.banks.generalVariables.allDataArrMatah.BankData[0]
                                                                    .Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow,
                                                                function () {
                                                                    if (numOfMatahacc !== undefined && numOfMatahacc > discuontAsakimPlus.matahSubAcc + 1) {
                                                                        discuontAsakimPlus.matahSubAcc++;
                                                                        discuontAsakimPlus.loadMatah();
                                                                    } else {
                                                                        discuontAsakimPlus.matahSubAcc = 0;
                                                                        discuontAsakimPlus.changeAll();
                                                                    }
                                                                });
                                                        }
                                                    })
                                                } else {
                                                    if (numOfMatahacc != undefined && numOfMatahacc > discuontAsakimPlus.matahSubAcc + 1) {
                                                        discuontAsakimPlus.matahSubAcc++;
                                                        discuontAsakimPlus.loadMatah();
                                                    } else {
                                                        all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow = [];
                                                        discuontAsakimPlus.matahSubAcc = 0;
                                                        discuontAsakimPlus.changeAll();
                                                    }
                                                }
                                            } else {
                                                if (numOfMatahacc != undefined && numOfMatahacc > discuontAsakimPlus.matahSubAcc + 1) {
                                                    discuontAsakimPlus.matahSubAcc++;
                                                    discuontAsakimPlus.loadMatah();
                                                } else {
                                                    discuontAsakimPlus.matahSubAcc = 0;
                                                    discuontAsakimPlus.changeAll();

                                                }
                                            }
                                        })
                                })
                                .fail(function (error, resErr, urlParam) {
                                    var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                                    all.banks.core.services.errorLog(logErr);
                                });
                        } else {
                            discuontAsakimPlus.matahSubAcc = 0;
                            discuontAsakimPlus.changeAll();
                        }
                    }

                } else {
                    discuontAsakimPlus.matahSubAcc = 0;
                    discuontAsakimPlus.changeAll();
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    };
//	discuontAsakimPlus.getHaavara = function (numOfMatahacc) {
//		$(all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow).each(function (i, v) {
//			if (v.DepositeTransferData !== null && v.DepositeTransferData[0] == undefined) {
//				all.banks.core.services.httpReq("https://start.telebank.co.il/wps/Finacle/TransactionDetailsAjax?mode=json", 'POST', v.DepositeTransferData, true, false)
//				.then(function (response) {
//					var response = JSON.parse(response);
//					var responseHtml = all.banks.core.services.parseHtml(response.body);
//					var tdBankTransferNumber = responseHtml.find("tr").eq(0).children("td").eq(1).text();
//					var tdBranchTransferNumber = responseHtml.find("tr").eq(1).children("td").eq(1).text();
//					var tdAccountTransferNumber = responseHtml.find("tr").eq(2).children("td").eq(1).text();
//					var tdNamePayerTransfer = responseHtml.find("tr").eq(3).children("td").eq(1).text();
//					v.DepositeTransferData = [{
//						"DepositeTransferDate": v.ValueDate,
//						"BankTransferNumber": parseFloat(tdBankTransferNumber),
//						"BranchTransferNumber": parseFloat(tdBranchTransferNumber),
//						"AccountTransferNumber": parseFloat(tdAccountTransferNumber),
//						"NamePayerTransfer": tdNamePayerTransfer.replace(/\s\s+/g, ""),
//						"DetailsTransfer": null,
//						"TransferTotal": v.TransTotal
//					}];
//					if (i + 1 == all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.length) {
//						if (numOfMatahacc != undefined && numOfMatahacc > discuontAsakimPlus.matahSubAcc + 1) {
//							discuontAsakimPlus.matahSubAcc++;
//							discuontAsakimPlus.loadMatah();
//						}
//						else {
//							discuontAsakimPlus.matahSubAcc = 0;
//							discuontAsakimPlus.changeAll();
//						}
//
//					}
//					else {
//						discuontAsakimPlus.getHaavara(numOfMatahacc);
//					}
//				})
//				.fail(function (error, resErr, urlParam) {
//					v.DepositeTransferData = null;
//					if (i + 1 == all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.length) {
//						if (numOfMatahacc != undefined && numOfMatahacc > discuontAsakimPlus.matahSubAcc + 1) {
//							discuontAsakimPlus.matahSubAcc++;
//							discuontAsakimPlus.loadMatah();
//						}
//						else {
//							discuontAsakimPlus.matahSubAcc = 0;
//							discuontAsakimPlus.changeAll();
//						}
//					}
//					else {
//						discuontAsakimPlus.getHaavara(numOfMatahacc);
//					}
//				});
//				return false;
//			}
//			else {
//				if (i + 1 == all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.length) {
//					if (numOfMatahacc != undefined && numOfMatahacc > discuontAsakimPlus.matahSubAcc + 1) {
//						discuontAsakimPlus.matahSubAcc++;
//						discuontAsakimPlus.loadMatah();
//					}
//					else {
//						discuontAsakimPlus.matahSubAcc = 0;
//						discuontAsakimPlus.changeAll();
//					}
//				}
//			}
//		});
//	};
    discuontAsakimPlus.sessionAlive = function () {
        $.get("https://start.telebank.co.il/Retail/discountinternet/portal/coex.asmx/KeepAlive")
            .done(function (res) {
                $.get("https://start.telebank.co.il/wps/Portal_SmeTheme/themes/html/SME/KeepAlivePortalSite.jsp?dojo.preventCache=" + new Date().getTime())
                    .done(function (res) {
                        $.get("https://start.telebank.co.il/wps/Portal_InfWar/InfServlet?infFunctionCode=keepAlive&dojo.preventCache=" + new Date().getTime())
                            .done(function (res) {
                                $.get("https://start.telebank.co.il/wps/Finacle/CoExistence?functionCode=KeepAlive&dojo.preventCache=" + new Date().getTime())
                                    .done(function (res) {
                                        $.get("https://start.telebank.co.il/wps/myportal/D-H-PRetail/SHPIZER_CALC?functionCode=KeepAlive&dojo.preventCache=" + new Date().getTime())
                                            .done(function (res) {
                                                $.get("https://start.telebank.co.il/Trade/keepalive.php?dojo.preventCache=" + new Date().getTime())
                                                    .done(function (res) {
                                                        $.get("https://start.telebank.co.il/keepalive.json?dojo.preventCache=" + new Date().getTime())
                                                            .done(function (res) {

                                                            })
                                                    })
                                            })
                                    })
                            })
                    })
            })
    };
    discuontAsakimPlus.logOut = function () {

        $.ajax({
            url: "https://www.mercantile.co.il/MB/business/out-of-account?pernum=01342204",
            method: "GET"
        }).done(function (res1) {
            $('#filecontainerlogin').attr('src', '')
            myEmitterLogs(25);
        }).fail(function (jqXHR, textStatus) {
            myEmitterLogs(25);
        });
//https://www.mercantile.co.il/MB/business/out-of-account?pernum=01342204
//$.ajax({
//    url: "https://start.telebank.co.il/Retail/discountinternet/portal/coex.asmx/Logout?reason=CoexUserExit",
//    method: "GET"
//}).done(function (res1) {
//    $.ajax({
//        url: "https://start.telebank.co.il/wps/Finacle/CoExistence?functionCode=LogOut",
//        method: "GET"
//    }).done(function (res1) {
//        $.ajax({
//            url: "https://start.telebank.co.il/Trade/index.php/logout/index/404",
//            method: "GET"
//        }).done(function (res1) {
//            $.ajax({
//                url: "https://start.telebank.co.il/wps/Portal_InfWar/InfServlet?infFunctionCode=LogOut",
//                method: "GET"
//            }).done(function (res1) {
//                $.ajax({
//                    url: "https://start.telebank.co.il/pkmslogout",
//                    method: "GET"
//                }).done(function (res1) {
//                    $.ajax({
//                        url: "https://start.telebank.co.il/LoginPages/Logout",
//                        method: "GET"
//                    }).done(function (res1) {
//                        $.ajax({
//                            url: "https://www.mercantile.co.il/wps/portal/mercantile-personal/out-of-account/",
//                            method: "GET"
//                        }).done(function (res1) {
//                            $('#filecontainerlogin').attr('src', '')
//                            myEmitterLogs(25);
//                        }).fail(function (jqXHR, textStatus) {
//
//                        });
//                    }).fail(function (jqXHR, textStatus) {
//
//                    });
//                }).fail(function (jqXHR, textStatus) {
//
//                });
//            }).fail(function (jqXHR, textStatus) {
//
//            });
//        }).fail(function (jqXHR, textStatus) {
//
//        });
//    }).fail(function (jqXHR, textStatus) {
//
//    });
//}).fail(function (jqXHR, textStatus) {
//
//});
    };

    discuontAsakimPlus.oshRowAdditionalPatterns = [
        /commonAjaxTransfer\((.+)\)/,
        /commonAjaxTransferForeignOutgoing\((.+)\)/,
        /commonAjaxTransferCredit\((.+)\)/,
        /commonAjaxTransferDetails\((.+)\)/,
        /_gotoSwiftTransferDetails\((.+)\)/
    ];

    discuontAsakimPlus.resetSwiftDetailsFetchActionUrl = function (bodyStr) {
        const mtch = /Action1\s*=\s*\"(.+SwiftTransferDetails.Fetch)\"/gm.exec(bodyStr);
        discuontAsakimPlus.SwiftDetailsFetchActionUrl = mtch !== null ? "https://start.telebank.co.il" + mtch[1] : null;
    };

    discuontAsakimPlus.fetchParamsFromFunctionCall = function (fnCallStr) {
        return fnCallStr.split(",").reduce((acmltr, val, idx, arr) => {
            const valTrimmed = val.trim();
            if (valTrimmed.startsWith("'") && valTrimmed.endsWith("'")) {
                acmltr.push(valTrimmed.slice(1, -1));
            } else if (valTrimmed.startsWith("'") && !valTrimmed.endsWith("'") && idx + 1 < arr.length) {
                acmltr.push((valTrimmed + ', ' + arr[idx + 1].trim()).slice(1, -1));
            } else if (!val.startsWith("'") && !val.endsWith("'")) {
                acmltr.push(valTrimmed);
            }
            return acmltr;
        }, []);
    };

    discuontAsakimPlus.findHandlerFor = function (action) {
        const ptrnToUseIndex = !action ? -1
            : discuontAsakimPlus.oshRowAdditionalPatterns.findIndex(ptrn => ptrn.test(action));
        if (ptrnToUseIndex < 0) {
            return null;
        } else if (ptrnToUseIndex >= discuontAsakimPlus.oshRowAdditionalPatterns.length - 1) {
            return discuontAsakimPlus.loadAdditionalDataTypeSwiftFor;
        } else {
            return discuontAsakimPlus.loadAdditionalDataTypeFor;
        }
    };

    discuontAsakimPlus.loadAdditionalDataTypeFor = function (rowInArr) {

        function buildAjaxStringFor(action) {
            let ajaxString = null;

            const patternForAction = discuontAsakimPlus.oshRowAdditionalPatterns.find(ptrn => ptrn.test(action));
            switch (discuontAsakimPlus.oshRowAdditionalPatterns.indexOf(patternForAction)) {
                case 0: {
                    const [serviceName, urn, operationDate, operationCode, operationDescription, operationAmount, transDescription] =
                        discuontAsakimPlus.fetchParamsFromFunctionCall(patternForAction.exec(action)[1]);
                    switch (serviceName) {
                        case 'TransactionDetails' :
                            ajaxString = "transaction_type=InternalTransfer^urn=" + urn + "^" + "operationAmount=" + operationAmount + "^" + "transDescription=" + transDescription + "^";
                            break;
                        case 'OutgoingTransferDetails' :
                            ajaxString = "transaction_type=OutgoingTransfer^" + "urn=" + urn + "^" + "transDescription=" + transDescription + "^";
                            break;
                        case 'CreditIncomingTransferDetails' :
                            ajaxString = "transaction_type=CreditIncomingTransfer^" + "urn=" + urn + "^" + "operationDate=" + operationDate + "^" + "transDescription=" + transDescription + "^";
                            break;
                        case 'DebitIncomingTransferDetails' :
                            ajaxString = "transaction_type=DebitIncomingTransfer^" + "urn=" + urn + "^" + "transDescription=" + transDescription + "^";
                            break;
                        case 'ForeignOutgoingTransferDetails' :
                            ajaxString = "transaction_type=ForeignOutgoingTransfer^" + "urn=" + urn + "^" + "transDescription=" + transDescription + "^";
                            break;
                        case 'TetmDepositDetails' :
                            ajaxString = "transaction_type=TermDeposit^" + "urn=" + urn + "^" + "transDescription=" + transDescription + "^";
                            break;
                        case 'HistoricalActionsInPortfolio' :
                            ajaxString = "transaction_type=HistoricalActionsInPortfolio^" + "beginDate=" + operationDate + "^" + "endDate=" + operationDate + "^" + "operationCode=" + operationCode + "^" + "operationDescription=" + operationDescription + "^" + "operationAmount=" + operationAmount + "^" + "transDescription=" + transDescription + "^";
                            break;
                    }
                    break;
                }
                case 1: {
                    const [serviceName, urn, transDescription] =
                        discuontAsakimPlus.fetchParamsFromFunctionCall(patternForAction.exec(action)[1]);
                    if (serviceName && urn) {
                        ajaxString = "transaction_type=ForeignOutgoingTransfer^" + "urn=" + urn + "^" + "transDescription=" + transDescription + "^";
                    }
                    break;
                }
                case 2: {
                    const [serviceName, urn, operationDate, transDescription] =
                        discuontAsakimPlus.fetchParamsFromFunctionCall(patternForAction.exec(action)[1]);
                    if (serviceName && urn) {
                        ajaxString = "transaction_type=CreditIncomingTransfer^" + "urn=" + urn + "^" + "operationDate=" + operationDate + "^" + "transDescription=" + transDescription + "^";
                    }
                    break;
                }
                case 3: {
                    const [transNo, serviceName, urn, operationDate, operationCode, operationDescription, operationAmount, transDescription] =
                        discuontAsakimPlus.fetchParamsFromFunctionCall(patternForAction.exec(action)[1]);
                    if (serviceName && urn) {
                        ajaxString = "transaction_type=InternalTransfer^operationNumber=" + transNo + "^urn=" + urn + "^" + "operationAmount=" + operationAmount + "^" + "transDescription=" + transDescription + "^";
                    }
                    break;
                }
            }
            return ajaxString;
        }

        var dfd = jQuery.Deferred();

        const ajaxString = buildAjaxStringFor(rowInArr.additionalData.action);

        if (ajaxString) {
            const dataParam = {
                "objectName": ajaxString,
                "_": ""
            };
            all.banks.core.services.httpReq("https://start.telebank.co.il/wps/Finacle/TransactionDetailsAjax?mode=json", 'POST', dataParam, true, false)
                .then(function (response) {
                    try {
                        var response = JSON.parse(response.replace(/([^\\])\\([^\\])/g, "$1\\\\$2"));
                    } catch (e) {
                        writeLog('Transaction details read FAILED: ' + e.message + ' -> ' + e.message);
                        dfd.resolve(null);
                        return;
                    }
                    var responseHtml = all.banks.core.services.parseHtml(response.body);

                    var dtd = {
                        "DepositeTransferDate": rowInArr.ValueDate,
                        "TransferTotal": rowInArr.TransTotal,
                        "BankTransferNumber": null,
                        "BranchTransferNumber": null,
                        "AccountTransferNumber": null,
                        "NamePayerTransfer": null,
                        "DetailsTransfer": response.header
                    };
                    rowInArr.DepositeTransferData = [dtd];

                    const keys = responseHtml.find('.lastTransactionsNotificationBodyKey')
                        .map(function (i, v) {
                            return $(v).text();
                        })
                        .get();
                    const vals = responseHtml.find('.lastTransactionsNotificationBodyValue')
                        .map(function (i, v) {
                            return $(v).text();
                        })
                        .get();
                    const tableMap = keys.reduce((acmltr, v, i) => {
                        if (i < vals.length) {
                            const keyVal = vals[i].trim();
                            const numericV = parseFloat(keyVal);
                            switch (v) {
                                case 'מספר בנק מוטב:':
                                case 'מספר בנק מחויב:':
                                    dtd.BankTransferNumber = Number.isFinite(numericV) ? numericV : null;
                                    break;
                                case 'מספר סניף מוטב:':
                                case 'מספר סניף מחויב:':
                                    dtd.BranchTransferNumber = Number.isFinite(numericV) ? numericV : null;
                                    break;
                                case 'חשבון מוטב:':
                                case 'מספר חשבון מוטב:':
                                case 'מספר חשבון מחויב:':
                                    dtd.AccountTransferNumber = Number.isFinite(numericV) ? numericV : null;
                                    break;
                                case 'שם חשבון מוטב:':
                                case 'שם חשבון מחויב:':
                                case 'שם המעביר:':
                                case 'שם מוסד:':
                                    dtd.NamePayerTransfer = keyVal;
                                    break;
                            }
                        }

                        acmltr[v] = i < vals.length ? vals[i] : null;
                        return acmltr;
                    }, Object.create(null));

                    if (!Number.isFinite(dtd.AccountTransferNumber)) {
                        dtd.DetailsTransfer = JSON.stringify(tableMap);
                    }

                    dfd.resolve(rowInArr.DepositeTransferData);
                })
                .fail(function (jqXHR, textStatus) {
                    rowInArr.DepositeTransferData = [{
                        "DepositeTransferDate": rowInArr.ValueDate,
                        "TransferTotal": rowInArr.TransTotal,
                        "BankTransferNumber": null,
                        "BranchTransferNumber": null,
                        "AccountTransferNumber": null,
                        "NamePayerTransfer": null,
                        "DetailsTransfer": textStatus
                    }];
                    dfd.resolve(rowInArr.DepositeTransferData);
                });
        } else {
            dfd.resolve(null);
        }

        return dfd.promise();
    };

    discuontAsakimPlus.loadAdditionalDataTypeSwiftFor = function (rowInArr) {
        var dfd = jQuery.Deferred();

        const [transCode, urn, transDescription] =
            discuontAsakimPlus.fetchParamsFromFunctionCall(discuontAsakimPlus.oshRowAdditionalPatterns[discuontAsakimPlus.oshRowAdditionalPatterns.length - 1]
                .exec(rowInArr.additionalData.action)[1])
                .filter(prmv => prmv !== "this")
                .map(prmv => prmv.replace(/'/g, "").trim());

        if (transCode
            && Array.isArray(rowInArr.additionalData.formData) && rowInArr.additionalData.formData.length
            && discuontAsakimPlus.SwiftDetailsFetchActionUrl) {

            const formData = rowInArr.additionalData.formData.reduce((acmltr, v, i) => {
                acmltr[v.name] = v.value;

                return acmltr;
            }, Object.create(null));

            formData.OpCode = transCode;
            formData.urn = urn;
            formData.transDesc = transDescription;

            all.banks.core.services.httpReq(discuontAsakimPlus.SwiftDetailsFetchActionUrl, 'POST', formData, true, false)
                .then(function (response) {
                    var _response = all.banks.core.services.parseHtml(response);
                    var dtd = {
                        "DepositeTransferDate": rowInArr.ValueDate,
                        "TransferTotal": rowInArr.TransTotal,
                        "BankTransferNumber": null,
                        "BranchTransferNumber": null,
                        "AccountTransferNumber": null,
                        "NamePayerTransfer": null,
                        "DetailsTransfer": _response.find('#ctlEditedQuery').html()
                    };
                    rowInArr.DepositeTransferData = [dtd];

                    var urlBackToOsh = "https://start.telebank.co.il" + /backTolastTransactions[^{]+{[\s\S]+"(.+BwayActionToken=Cancel.*)"[^}]+}/g.exec(response)[1];
                    var backFormData = _response.find("form[name$='_swiftTransferDetailsForm']").serializeArray();
                    all.banks.core.services.httpReq(urlBackToOsh, 'POST', backFormData, true, false)
                        .then(function (response) {
                            discuontAsakimPlus.resetSwiftDetailsFetchActionUrl(response);
                            dfd.resolve(rowInArr.DepositeTransferData);
                        })
                        .fail(function (error, resErr) {
                            writeLog('Back from swift details request FAILED. ' + error);
                            dfd.resolve(rowInArr.DepositeTransferData);
                        });

//                            dfd.resolve(rowInArr.DepositeTransferData);
                })
                .fail(function (jqXHR, textStatus) {
                    rowInArr.DepositeTransferData = [{
                        "DepositeTransferDate": rowInArr.ValueDate,
                        "TransferTotal": rowInArr.TransTotal,
                        "BankTransferNumber": null,
                        "BranchTransferNumber": null,
                        "AccountTransferNumber": null,
                        "NamePayerTransfer": null,
                        "DetailsTransfer": textStatus
                    }];
                    dfd.resolve(rowInArr.DepositeTransferData);
                });
        } else {
            dfd.resolve(null);
        }

        return dfd.promise();
    };

    discuontAsakimPlus.loadOshRowsAdditionalData = function () {
        discuontAsakimPlus.loadRowsAdditionalData(
            all.banks.generalVariables.allDataArr.BankData[0].Account[discuontAsakimPlus.idxAccNow].DataRow,
            discuontAsakimPlus.changeAll
        );
    };

    discuontAsakimPlus.loadRowsAdditionalData = function (rows, proceedWith) {
        var haavarot2Load = rows.filter(val => val.additionalData || val.additionalData === null);

        if (!haavarot2Load.length) {
            proceedWith();
        } else {
            iterate();
        }

        function iterate() {
            $(haavarot2Load).each(function (i1, v1) {
                if (v1.additionalData) {
                    const handlerFn = discuontAsakimPlus.findHandlerFor(v1.additionalData.action);
                    if (handlerFn === null) {
                        next();
                    } else {
                        $.when(handlerFn(v1))
                            .then(function (rslt) {
                                next();
                            });
                    }
                } else if (v1.additionalData === null) {
                    next();
                } else if (i1 + 1 === haavarot2Load.length) {
                    proceedWith();
                } else {
                    return true;
                }

                return false;

                function next() {
                    delete v1.additionalData;
                    iterate();
                }
            });
        };
    };

    return discuontAsakimPlus;
}();

all.banks.accounts.discountAsakimPlusNew = function () {
    const discountAsakimPlusNew = {};
    discountAsakimPlusNew.dummyForUnescape = $("<p></p>");
    discountAsakimPlusNew.unescapeHtml = function (escapedText) {
        return !escapedText ? escapedText
            : discountAsakimPlusNew.dummyForUnescape.html(
                escapedText.replace(/#&39;/g, "&#39;")
            ).text();
    };

    discountAsakimPlusNew.globalHeaders = {'UUID': all.banks.core.services.uuidv4()};


    discountAsakimPlusNew.login = async function () {

//        function getIDBKey() {
//            return new Promise((resolve, reject) => {
//                $.ajax({
//                    url: "https://dataload.bizibox.biz/ProjectsBiziboxMaven/api/getIDBKey",
//                    xhrFields: {
//                        withCredentials: true
//                    },
//                    method: "POST",
//                    type: "POST",
//                    headers: {
//                        'Accept': '*/*',
//                        'Content-Type': 'application/json'
//                    },
//                    data: JSON.stringify({
//                        idbBKey: all.banks.accountDetails.bank.autoCode
//                    })
//                }).done(function (response, state, status) {
//                    if (!response.code) {
//                        reject(new Error("Failed to get otp code [" + response + "]"));
//                    }
//                    resolve(response.code);
//                }).fail(function (error, resErr) {
//                    reject(error);
//                });
//            });
//        }

        function authenticate() {

            function AddLeadingZerows(theText, numOfZerows2Add) {
                if (theText !== null) {
                    for (var index = theText.length; index < numOfZerows2Add; index++)
                        theText = "0" + theText;
                    return (theText);
                }
            }

            function checkIdNumber(fullIdNumber) {
                var idLength = fullIdNumber.length;
                if (idLength == 10) {
                    if (fullIdNumber.substr(0, 1) == 9)
                        return true;
                    else
                        return false;
                } else {
                    var tempNum, sumTempNum = 0;
                    checkNumber = fullIdNumber.substr(idLength - 1, 1);
                    fullIdNumber = AddLeadingZerows(fullIdNumber, 10)
                    idNumber = fullIdNumber.substr(1, 8);
                    //for each digit multiply by 1 or by 2
                    for (var I = 0; I < idNumber.length; I++) {
                        if (I % 2 != 0) {
                            tempNum = parseInt(idNumber.substr(I, 1)) * 2;
                            //if the number that we recived is greater then 9 add is two digit
                            if (tempNum > 9)
                                tempNum = 1 + tempNum % 10;
                        } else
                            tempNum = parseInt(idNumber.substr(I, 1)) * 1;
                        //sum all the number taht we have recived
                        sumTempNum = sumTempNum + tempNum;
                    }
                    //get the modles from sumTempNum%10
                    tempNum = sumTempNum % 10;
                    //if tempNume is diff from 0 subtract the modle from ten
                    //and the result is the Check Number that we search for
                    if (tempNum != 0)
                        tempNum = 10 - tempNum;
                    if (checkNumber == tempNum)
                        return true;
                    else
                        return false;
                }
            }

            function formatIdNumber(tzIdVal) {
                var bankNum;
                if (parseFloat(all.banks.accountDetails.bank.BankNumber) == 158) {
                    bankNum = "0"
                } else if (parseFloat(all.banks.accountDetails.bank.BankNumber) == 157) {
                    bankNum = "1"
                } else {
                    bankNum = "0";
                }

                if (tzIdVal.length == 10 && tzIdVal.substr(0, 1) == 9)
                    return "000" + bankNum + tzIdVal;
                else
                    return "000" + bankNum + 1 + AddLeadingZerows(tzIdVal, 9);
            }

            var tzId = all.banks.accountDetails.bank.username;
            var custid = dataRes.find("input#custid").val();
            var tzPassword = all.banks.accountDetails.bank.password.slice(0, 14);
//            var otpnumVal = all.banks.accountDetails.bank.autoCode.slice(0, 14);
            var aidnumVal = dataRes.find("input#aidnum").val();
            var username = dataRes.find("input[name='username']").val();
            var aidtype = 'otp';//dataRes.find("input[name='aidtype']").val();
            var aidvalue = dataRes.find("input[name='aidvalue']").val();

            var prefix300 = '300';
            var FormName = false;

            try {
                if (tzId !== undefined) {
                    var username1 = (tzId + "").trim();
                    tzId = username1;
                    username1 = username1.replace(/^0+/, "");
                } else {
                    var username1 = "";
                }
            } catch (e) {
                var username1 = "";
            }

            try {
                if (custid !== undefined) {
                    var username2 = (custid + "").trim();
                    custid = username2;
                } else {
                    var username2 = "";
                }

            } catch (e) {
                var username2 = "";
            }

            var password1 = tzPassword + "";
            var otpnum = null;
            var aidnum = null;

//            try {
//                if (otpnumVal !== undefined) {
//                    var otpnum = otpnumVal + "";
//                } else {
//                    var aidnum = aidnumVal + "";
//                }
//            } catch (e) {
//                var aidnum = aidnumVal + "";
//            }

            if (username2 == "") {
                FormName = true;
            }
            if (FormName) {
                var tzIdVal = username1;
                if (checkIdNumber(tzIdVal)) {
                    custIdGen = formatIdNumber(tzIdVal);
                } else {
                    myEmitterLogs(5);
                    return;
                }

                if (otpnum != null) {
                    if (otpnum.length != 6) {
                        myEmitterLogs(5);
                        return false;
                    }
                }
            } else {
                var codeIdVal = username2;
                codeIdVal = AddLeadingZerows(codeIdVal, 6);
                var custIdGen = prefix300 + '00000' + codeIdVal;
            }

            var passwdValue = tzPassword;

            const appName = "bizibox" // WEB";
            const caller = "Internet" // "Other";
            // Application: "WEB"
            // Bank: "d"
            // Caller: "Internet"
            // CustType: "sme"
            // Lang: "he"
            // Source: 1
            return new Promise((resolve, reject) => {
                all.banks.core.services.httpReq("https://start.telebank.co.il/Lobby/gatewayAPI/verification/getInfo", 'POST',
                    {
                        Application: appName,
                        Caller: caller,
                        Bank: discountAsakimPlusNew.typeBank,
                        Lang: "he",
                        CustType: "sme",
                        Source: 1
                    })
                    .then(function (response) {
                        try {
                            var resKey = response.GetVerificationInfo.Key;
                            if (resKey === "undefined")
                                throw "no pk";
                            var pkPEM = "-----BEGIN PUBLIC KEY-----" + resKey + "-----END PUBLIC KEY-----";
                            var k = forge.pki.publicKeyFromPem(pkPEM);
                            all.banks.accountDetails.bank.password = forge.util.encode64(k.encrypt(passwdValue));
                            username = custIdGen;
                            sendAuth();
                        } catch (e) {
                            reject(e);
                        }
                    })
                    .fail(function (error, resErr, urlParam) {
                        reject(error);
                    });

                /*
                                $.ajax({
                                    url: "https://start.telebank.co.il/LoginPages/gatewayAPI/verification/getPk?_=" + new Date().getTime(),
                                    type: 'GET',
                                    contentType: "application/json; charset=utf-8",
                                    cache: false,
                                    success: function (response, status, xhr) {
                                        try {
                                            var resKey = response.Key;
                                            if (resKey === "undefined")
                                                throw "no pk";
                                            var pkPEM = "-----BEGIN PUBLIC KEY-----" + resKey + "-----END PUBLIC KEY-----";
                                            var k = forge.pki.publicKeyFromPem(pkPEM);
                                            all.banks.accountDetails.bank.password = forge.util.encode64(k.encrypt(passwdValue.toUpperCase()));
                                            username = custIdGen;
                                            sendAuth();
                                        } catch (e) {
                                            reject(e);
                                        }
                                    },
                                    error: function (error) {
                                        reject(error);
                                    }
                                });
                */
                function sendAuth() {
//                function sendAuth(requestTimeOut) {
                    var custIdGen = username;
                    var mi6MD5 = digestsEncoding.MD5(custIdGen, digestsEncoding.outputTypes.Hex);
                    var mi6Cookie = 'mi6=' + mi6MD5 + '; path=/';
                    document.cookie = mi6Cookie;
//                    if (!requestTimeOut) {
//                        requestTimeOut = 30000;
//                    }
                    var data = {
                        Application: appName, // 'WEB',
                        Bank: discountAsakimPlusNew.typeBank,
                        Caller: caller, // 'Internet',
                        CustType: 'sme',
                        Lang: 'he',
                        Password: all.banks.accountDetails.bank.password,
                        PlatformType: 'WEB',
                        ThirdIdentifier: '', //aidvalue,
                        ThirdIdentifierType: 'no_otp', // aidtype,
                        Uid: custIdGen
                    };
                    all.banks.core.services.httpReq("https://start.telebank.co.il/Lobby/gatewayAPI/login", 'POST', data)
                        .then(function (data) {
                            if (!data.Login || data.Login.Status !== 'SUCCESS') {
                                if (data.Error && data.Error.MsgText
                                    && data.Error.MsgText.includes("password has expired")) {
                                    myEmitterLogs(6);
                                } else {
                                    myEmitterLogs(5);
                                }
                                resolve(false);
                            } else {
                                document.cookie = 'mi6=' + data.Login.MI6 + '; path=/';
                                resolve(true);
                            }
                        })
                        .fail(function (error, resErr, urlParam) {
                            reject(error);
                        });
//                    var data = {
//                        username: custIdGen,
//                        password: all.banks.accountDetails.bank.password,
//                        aidtype: 'no_otp', // aidtype,
//                        aidvalue: '' // aidvalue
//                    }
//                    all.banks.core.services.httpReq("https://start.telebank.co.il/LoginPages/Logon", 'POST', data, true, false)
//                            .then(function (dataStr) {
//                                var data = all.banks.core.services.parseHtml(dataStr);
//                                if (data.find(".msghdr_green").length && data.find(".msghdr_green").text().indexOf('בהצלחה') !== -1) {
//                                    if (data.find("span:contains('LOGIN_SUCCESS_WITH_CHANGE_PASSWORD_STATUS')").length) {
//                                        myEmitterLogs(6);
//                                        resolve(false);
//                                    } else {
//                                        resolve(true);
//                                    }
//                                    return;
//                                } else if (data.find(".msghdr_red").text().indexOf('נכשל') !== -1) {
//                                    myEmitterLogs(5, data.find(".msghdr_red").text());
//                                    resolve(false);
//                                    return;
//                                } else {
//                                    myEmitterLogs(8);
//                                    resolve(false);
//                                    return;
//                                }
//                                reject(new Error("Login process failed: " + dataStr));
//                            })
//                            .fail(function (error, resErr, urlParam) {
//                                reject(error);
//                            });
                }
            });
        }

        switch (parseFloat(all.banks.accountDetails.bank.BankNumber)) {
            case 158:
                discountAsakimPlusNew.typeBank = 'd';
                break;
            case 157:
                discountAsakimPlusNew.typeBank = 'm';
                break;
        }

//        await all.banks.core.services.httpReq('https://start.telebank.co.il/LoginPages/Logon?multilang=he&t=S&pagekey=Home&bank=' + discountAsakimPlusNew.typeBank, 'GET', null, false, false);
//        await all.banks.core.services.httpReq("https://start.telebank.co.il/wps/myportal/" + discountAsakimPlusNew.typeBank.toUpperCase() + "-H-PAsakimPlus/Home", 'GET', null, false, false);
        let response = await all.banks.core.services.httpReq('https://start.telebank.co.il/LoginPages/Logon?multilang=he&t=S&pagekey=Home&bank=' + discountAsakimPlusNew.typeBank, 'GET', null, false, false);
        const dataRes = all.banks.core.services.parseHtml(response);

        await all.banks.core.services.httpReq("https://start.telebank.co.il/apollo/core/templates/lobby/masterPage.html?t=S&bank=" + discountAsakimPlusNew.typeBank.toUpperCase() + "&u1=false&multilang=he",
            'GET', null, false, false);
        await all.banks.core.services.httpReq("https://start.telebank.co.il/apollo/core/templates/lobby/masterPage.html#/LOGIN_PAGE_SME", 'GET', null, false, false);

//        if (all.banks.accountDetails.bank.autoCode.length !== 6) {
//            let askForCode = true;
//            do {
//                try {
//                    all.banks.accountDetails.bank.autoCode = await getIDBKey();
//                    askForCode = false;
//                } catch (exc) {
//                    all.banks.core.services.errorLog(exc);
//                }
//            } while (askForCode);
//        }

        try {
            const authenticated = await authenticate();
            if (!authenticated) {
                return;
            }
//            await all.banks.core.services.httpReq('https://start.telebank.co.il/LoginPages/Logon', 'GET', null, false, false);
        } catch (exc) {
            all.banks.core.services.errorLog(exc);
            return;
        }

        if (all.banks.openBankPage) {
            try {
//                await all.banks.core.services.httpReq("https://start.telebank.co.il/apollo/core/templates/default/masterPage.html", 'GET', null, false, false);
//                all.banks.core.services.openBankPage("https://start.telebank.co.il/apollo/core/templates/default/masterPage.html#/MY_ACCOUNT_HOMEPAGE");
                all.banks.core.services.openBankPage("https://start.telebank.co.il/apollo/core/templates/SME/masterPage.html#/MY_ACCOUNT_HOMEPAGE");
            } catch (exc) {
                console.error(exc);
                writeLog(exc);
            }
            return;
        }

        try {
            all.banks.generalVariables.allDataArr = {
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

            await prepareCompaniesWithAccountsList();

            await processAllOsh();
            await processAllCreditCards();
            await processAllNilvim();
            await processAllMatah();

        } catch (exc) {
            console.error(exc);
            writeLog(exc);
        } finally {
            try {
                await logout();
            } catch (exc1) {
                console.error(exc1);
            } finally {
                $('#filecontainerlogin').attr('src', '');
                myEmitterLogs(25);
            }
        }
        console.log("Done");
    };

    async function logout() {
        await $.ajax({
            url: "https://start.telebank.co.il/Retail/discountinternet/portal/coex.asmx/Logout?reason=CoexUserExit",
            xhrFields: {
                withCredentials: true
            },
            dataType: 'text',
            timeout: 1200,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Upgrade-Insecure-Requests', '1');
            }
        });
        await all.banks.core.services.httpReq("https://start.telebank.co.il/LoginPages/Logout", 'GET', null, false, false);
    }

    function dateAsDDMMYYYYArray(dt) {
        return [
            ("0" + (dt.getDate())).slice(-2),
            ("0" + (dt.getMonth() + 1)).slice(-2),
            dt.getFullYear().toString()
        ];
    }

    function strYYYYMMDDAsDDMMYYYYArray(str) {
        const matchExact = /^(\d{4})(\d{2})(\d{2})$/g.exec(str);
        if (matchExact !== null) {
            return [matchExact[3], matchExact[2], matchExact[1]];
        }

        return [];
    }

    function strDDMMYYYYAsDDMMYYYYArray(str) {
        const matchExact = /^(\d{2})(\d{2})(\d{4})$/g.exec(str);
        if (matchExact !== null) {
            return [matchExact[1], matchExact[2], matchExact[3]];
        }

        return [];
    }

    let companiesWithAccountsList;
    let companyIdx = 0, accountIdx = 0;

    async function prepareCompaniesWithAccountsList() {
        try {
            let userCompaniesAndAccounts = await all.banks.core.services.httpReq(
                "https://start.telebank.co.il/Titan/gatewayAPI/userAccounts/bsUserAccountsData?FetchAccountsNickName=true&FirstTimeEntry=true", 'GET', null, false, false);
//                    "https://start.telebank.co.il/Titan/gatewayAPI/userAccountsData?FetchAccountsNickName=true&FirstTimeEntry=true", 'GET', null, false, false);

            if (!userCompaniesAndAccounts || !userCompaniesAndAccounts.UserAccountsData
                || !Array.isArray(userCompaniesAndAccounts.UserAccountsData.UserAccounts)) {
                companiesWithAccountsList = [];
                return;
            }

            userCompaniesAndAccounts = userCompaniesAndAccounts.UserAccountsData;

            // userCompaniesAndAccounts.UserAccounts.filter((uacc)=> {
            //     if(uacc.NewAccountInfo){
            //         const accCompany = uacc.NewAccountInfo.CompanyIdentityNumber
            //             ? userCompaniesAndAccounts.UserCompanies
            //                 .find(uc => uc.CompanyIdentityNumber === uacc.NewAccountInfo.CompanyIdentityNumber)
            //             : userCompaniesAndAccounts.UserCompanies
            //                 .find(uc => uc.DefaultCompanyFlag === "Y");
            //     }
            // })
            const aggregated = userCompaniesAndAccounts.UserAccounts
                .reduce((acmltr, uacc) => {
                    if (uacc.NewAccountInfo) {
                        const accCompany = uacc.NewAccountInfo.CompanyIdentityNumber
                            ? userCompaniesAndAccounts.UserCompanies
                                .find(uc => uc.CompanyIdentityNumber === uacc.NewAccountInfo.CompanyIdentityNumber)
                            : userCompaniesAndAccounts.UserCompanies
                                .find(uc => uc.DefaultCompanyFlag === "Y");
                        if (accCompany) {
                            if (!acmltr[accCompany.CompanyIdentityNumber]) {
                                acmltr[accCompany.CompanyIdentityNumber] = {
                                    company: accCompany,
                                    accounts: []
                                };
                            }
                            if (all.banks.accountDetails.deleted_account_ids.length && (all.banks.accountDetails.deleted_account_ids.some(it => uacc.NewAccountInfo.AccountID.includes(it.toString())))) {

                            } else {
                                acmltr[accCompany.CompanyIdentityNumber]
                                    .accounts.push(uacc);
                            }
                        }
                    }
                    return acmltr;
                }, Object.create(null));

            companiesWithAccountsList = Object.values(aggregated);

            writeLog(JSON.stringify(companiesWithAccountsList));

        } catch (exc) {
            all.banks.core.services.errorLog(exc);
            companiesWithAccountsList = [];
            return;
        }
    }

    async function processAllOsh() {

        let dateFromYYYYMMDD, dateToYYYYMMDD;
        const maxCorrectBalanceRetries = 10;
        let correctBalanceRetryAttempt;
        const toDateIsToday = dateAsDDMMYYYYArray(new Date()).reverse().join('')
            === dateAsDDMMYYYYArray(all.banks.accountDetails.dateTo).reverse().join('');

        if (all.banks.accountDetails.days > 0) {
            dateToYYYYMMDD = dateAsDDMMYYYYArray(all.banks.accountDetails.dateTo).reverse().join('');

            companyIdx = 0;
            for (; companyIdx < companiesWithAccountsList.length; companyIdx++) {
                accountIdx = 0;
                for (; accountIdx < companiesWithAccountsList[companyIdx].accounts.length; accountIdx++) {
                    await processAccountOsh();
                }
            }

            await sendResults();
        }

        async function processAccountOsh() {
            try {
                const acc = companiesWithAccountsList[companyIdx].accounts[accountIdx];
                myEmitterLogs(10, [acc.AccountInfo.BranchID, acc.NewAccountInfo.AccountID].join('-')); //change Acc

                const infoAndBalance = await all.banks.core.services.httpReq(
                    "https://start.telebank.co.il/Titan/gatewayAPI/accountDetails/infoAndBalance/"
                    + acc.NewAccountInfo.AccountID,
                    'GET', null, false, false);
                if (infoAndBalance && infoAndBalance.AccountInfoAndBalance) {
                    // all.banks.accountDetails.dateFrom = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - all.banks.accountDetails.days);
                    if (all.banks.accountDetails.days > 364) {
                        const fixedDateFrom = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 364);
                        writeLog('>>> Fixed processing days number (< 365). New date from: '
                            + dateAsDDMMYYYYArray(fixedDateFrom).join('/') + ' <<<');
                        dateFromYYYYMMDD = dateAsDDMMYYYYArray(fixedDateFrom).reverse().join('');
                    } else {
                        dateFromYYYYMMDD = dateAsDDMMYYYYArray(all.banks.accountDetails.dateFrom).reverse().join('');
                    }
                    correctBalanceRetryAttempt = 0;

                    const processingAccount = {
                        'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),//parseInt(acc.NewAccountInfo.BankID),
                        'BranchNumber': parseInt(acc.AccountInfo.BranchID), // parseInt(acc.NewAccountInfo.BranchID),
                        'AccountNumber': parseInt(acc.NewAccountInfo.AccountID),
                        'Balance': infoAndBalance.AccountInfoAndBalance.AccountBalance,
                        'AccountCredit': infoAndBalance.AccountInfoAndBalance.TotalAccountLimit //infoAndBalance.AccountInfoAndBalance.AccountLimit,
                    };
                    all.banks.generalVariables.allDataArr.BankData[0].Account.push(processingAccount);
                    processingAccount['DataRow'] = await processOshTransactions();

                } else if (!infoAndBalance || infoAndBalance.Error) {
                    myEmitterLogs(37, infoAndBalance && infoAndBalance.Error ? JSON.stringify(infoAndBalance.Error) : ""); //acc not available
                }
            } catch (e) {
                console.error(e);
                writeLog(e);
            }
        }


        async function processOshTransactions() {
            try {
                correctBalanceRetryAttempt++;
                const acc = companiesWithAccountsList[companyIdx].accounts[accountIdx];
                const collected = [];
                const transactions = await all.banks.core.services.httpReq(
                    "https://start.telebank.co.il/Titan/gatewayAPI/lastTransactions/transactions/"
                    + acc.NewAccountInfo.AccountID
                    + "/ByDate?IsCategoryDescCode=True&IsTransactionDetails=True&IsEventNames=True"
                    + "&FromDate=" + dateFromYYYYMMDD
                    + "&ToDate=" + dateToYYYYMMDD
                    + "&CategoryDescCode=&FromAmount=0&CreditOrDebitAmount=",
                    'GET', null, false, false);

                while (transactions && transactions.Info && transactions.Info.ReturnedCode && transactions.Info.ReturnedCode === 'T1000464') {
                    const found = transactions.Info.MsgText.match(/(\d{2})[/](\d{2})[/](\d{2})/);
                    if (found.length === 4) {
                        const dateFromLast = dateAsDDMMYYYYArray(new Date(Number('20' + found[3]), Number(found[2]) - 1, Number(found[1]))).reverse().join('')
                        if (transactions && transactions.CurrentAccountLastTransactions && Array.isArray(transactions.CurrentAccountLastTransactions.OperationEntry)) {
                            transactions.CurrentAccountLastTransactions.OperationEntry = transactions.CurrentAccountLastTransactions.OperationEntry.filter(it => it.OperationDate !== dateFromLast);
                        }
                        const lastTransactions = await all.banks.core.services.httpReq(
                            "https://start.telebank.co.il/Titan/gatewayAPI/lastTransactions/transactions/"
                            + acc.NewAccountInfo.AccountID
                            + "/ByDate?IsCategoryDescCode=True&IsTransactionDetails=True&IsEventNames=True"
                            + "&FromDate=" + dateFromLast
                            + "&ToDate=" + dateToYYYYMMDD
                            + "&CategoryDescCode=&FromAmount=0&CreditOrDebitAmount=",
                            'GET', null, false, false);


                        transactions.Info = lastTransactions.Info;
                        if (transactions && transactions.CurrentAccountLastTransactions && Array.isArray(transactions.CurrentAccountLastTransactions.OperationEntry) && lastTransactions && lastTransactions.CurrentAccountLastTransactions && Array.isArray(lastTransactions.CurrentAccountLastTransactions.OperationEntry)) {
                            transactions.CurrentAccountLastTransactions.OperationEntry = transactions.CurrentAccountLastTransactions.OperationEntry.concat(lastTransactions.CurrentAccountLastTransactions.OperationEntry)
                        }
                    }
                }

                if (transactions && transactions.CurrentAccountLastTransactions) {
                    if (Array.isArray(transactions.CurrentAccountLastTransactions.OperationEntry)
                        && transactions.CurrentAccountLastTransactions.OperationEntry.length
                        && toDateIsToday && correctBalanceRetryAttempt < maxCorrectBalanceRetries
                        && transactions.CurrentAccountLastTransactions.OperationEntry[transactions.CurrentAccountLastTransactions.OperationEntry.length - 1].BalanceAfterOperation
                        !== transactions.CurrentAccountLastTransactions.CurrentAccountInfo.AccountBalance
                        && (all.banks.accountDetails.days + correctBalanceRetryAttempt) < 364) {
                        const fixedDateFrom = new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            new Date().getDate() - (all.banks.accountDetails.days + correctBalanceRetryAttempt));
                        dateFromYYYYMMDD = dateAsDDMMYYYYArray(fixedDateFrom).reverse().join('');
                        writeLog("period [" + dateFromYYYYMMDD + " - " + dateToYYYYMMDD + "]:"
                            + " Expecting latest transaction balance to be " + transactions.CurrentAccountLastTransactions.CurrentAccountInfo.AccountBalance
                            + ", but got " + transactions.CurrentAccountLastTransactions.OperationEntry[transactions.CurrentAccountLastTransactions.OperationEntry.length - 1].BalanceAfterOperation);

                        return await processOshTransactions();
                    }

                    const salariesByUrn = await getSalaries();
                    if (Array.isArray(transactions.CurrentAccountLastTransactions.OperationEntry)) {
                        for (let ntryIdx = 0; ntryIdx < transactions.CurrentAccountLastTransactions.OperationEntry.length; ntryIdx++) {
                            const oe = transactions.CurrentAccountLastTransactions.OperationEntry[ntryIdx];
                            collected.push(await processTransactionEntry(oe, salariesByUrn ? salariesByUrn[oe.Urn] : null));
                        }
                    }
                    if (transactions.CurrentAccountLastTransactions.FutureTransactionsBlock
                        && Array.isArray(transactions.CurrentAccountLastTransactions.FutureTransactionsBlock.FutureTransactionEntry)) {
                        for (let ntryIdx = 0; ntryIdx < transactions.CurrentAccountLastTransactions.FutureTransactionsBlock.FutureTransactionEntry.length; ntryIdx++) {
                            const oe = transactions.CurrentAccountLastTransactions.FutureTransactionsBlock.FutureTransactionEntry[ntryIdx];
                            collected.push(await processTransactionEntry(oe, salariesByUrn[oe.Urn]));
                        }
                    }
                }

                return collected;

            } catch (e) {
                console.error(e);
                writeLog(e);
                return [];
            }
        }

        async function processTransactionEntry(opEntry, foundInSalariesEntry) {
            const ntry = {
                "Asmachta": opEntry.OperationNumber + '' + opEntry.BranchTreasuryNumber.replace(/\D/g, ""),
                "TransDesc": opEntry.OperationDescriptionToDisplay.replace(/\s\s+/g, " "),
                "ValueDate": strYYYYMMDDAsDDMMYYYYArray(opEntry.OperationDate).join("/"),
                "TransactionType": opEntry.OperationAmount < 0 ? 0 : 1,
                "TransTotal": Math.abs(opEntry.OperationAmount),
                "Balance": opEntry.BalanceAfterOperation,
                "IsDaily": 0,
                "urnFromBank": opEntry.Urn,
                "operationCode": opEntry.OperationCode,
                "operationNumber": opEntry.OperationNumber,
                "operationOrder": opEntry.OperationOrder,
                "imgs": null
            };

            if (foundInSalariesEntry && foundInSalariesEntry.TotalAmount === Math.abs(opEntry.OperationAmount)) {
                console.log("Huray!");
                ntry["DepositeTransferData"] = await loadSalaryTransferDetails(foundInSalariesEntry);
            } else {
                switch (opEntry.OperationDetailsServiceName) {
                    case "":
                        if (opEntry.CategoryCode === 3 && all.banks.accountDetails.checks === true) {
                            ntry["imgs"] = await loadCheck(opEntry, true);
                        }
                        break;

                    case "ChecksDetails":
                        if (all.banks.accountDetails.checks === true) {
                            ntry["imgs"] = await loadCheck(opEntry);
                        }
                        break;

                    case "TransactionDetails":
                        ntry["DepositeTransferData"] = await loadTransactionDetails(opEntry);
                        break;

                    case "CreditIncomingTransferDetails":
                        ntry["DepositeTransferData"] = await loadCreditIncomingTransferDetails(opEntry);
                        break;

                    case "DebitIncomingTransferDetails":
                        ntry["DepositeTransferData"] = await loadDebitIncomingTransferDetails(opEntry);
                        break;

                    case "OutgoingTransferDetails":
                        ntry["DepositeTransferData"] = await loadOutgoingTransferDetails(opEntry);
                        break;

                    case "SwiftTransferDetails":
                        ntry["DepositeTransferData"] = await loadSwiftTransferDetails(opEntry);
                        break;
                }
            }

            if (Array.isArray(ntry["DepositeTransferData"])
                && ntry["DepositeTransferData"].length > 0
                && /^\d+$/.test(ntry["DepositeTransferData"][0].MosadCode)) {
                ntry["Asmachta"] = ntry["DepositeTransferData"][0].MosadCode;
            }

            return ntry;
        }

        async function getSalaries() {
            try {
                const acc = companiesWithAccountsList[companyIdx].accounts[accountIdx];
                const requestCommonPart = {
                    "AccountNumber": acc.NewAccountInfo.AccountID,
                    "EventFromDate": dateFromYYYYMMDD,
                    "EventToDate": dateToYYYYMMDD
                };
                const salaries = await Promise.all([
                    all.banks.core.services.httpReq("https://start.telebank.co.il/Titan/gatewayAPI/sme/salaries/salariesEventsQuery",
                        'POST', Object.assign({"EmployerType": 1}, requestCommonPart), false, false),
                    all.banks.core.services.httpReq("https://start.telebank.co.il/Titan/gatewayAPI/sme/salaries/salariesEventsQuery",
                        'POST', Object.assign({"EmployerType": 2}, requestCommonPart), false, false)
                ])
                if (salaries[0].Error || salaries[1].Error) {
                    return null;
                }
//                const collected = [];
                const salariesMerged = salaries
                    .reduce((acmltr, salary, idx) => {
                        if (salary && salary.SalariesEventsQuery && salary.SalariesEventsQuery.SalariesEventsBlock
                            && Array.isArray(salary.SalariesEventsQuery.SalariesEventsBlock.SalariesEventEntry)) {
                            salary.SalariesEventsQuery.SalariesEventsBlock.SalariesEventEntry
                                .forEach(ntry => {
                                    ntry.EmployerType = idx === 0 ? 1 : 2;
                                    acmltr[ntry.Urn] = ntry;
                                });
                        }
                        return acmltr;
//                            return salary && salary.SalariesEventsQuery && salary.SalariesEventsQuery.SalariesEventsBlock
//                                    && Array.isArray(salary.SalariesEventsQuery.SalariesEventsBlock.SalariesEventEntry)
//                                    ? acmltr.concat(salary.SalariesEventsQuery.SalariesEventsBlock.SalariesEventEntry)
//                                    : acmltr;
                    }, {});
                return salariesMerged;
//                return collected;

            } catch (e) {
                console.error(e);
                writeLog(e);
                return null;
            }
        }

        async function loadCheck(reqSource, OperationDescription) {
            let checkLoadResult = [{
                "ImageNameKey": "x"
            }];
            try {
                const acc = companiesWithAccountsList[companyIdx].accounts[accountIdx];
                let req = {
                    "AccountNumber": acc.NewAccountInfo.AccountID,
                    "OperationBranch": reqSource.OperationBranch,
                    "LastTransactionFlag": "True",
                    "OperationCode": reqSource.OperationCode,
                    "Urn": reqSource.Urn,
                    "OperationBank": reqSource.OperationBank,
                    "ValueDate": reqSource.ValueDate,
                    "BusinessDayDate": reqSource.BusinessDayDate
                };

                if (reqSource.OperationCode === "036" && reqSource.DepositNumber !== undefined) {
                    req.DepositNumber = reqSource.DepositNumber;
                }

                if (OperationDescription) {
                    req = {
                        "AccountNumber": acc.NewAccountInfo.AccountID,
                        "LastTransactionFlag": "False",
                        "CheckType": "DepositedChecks",
                        "PostponedCheckFlag": "False",
                        "SecurityCheckFlag": "False",
                        "DiscountCheckFlag": "False",
                        "FromDate": reqSource.ValueDate,
                        "ToDate": reqSource.ValueDate
                    }
                }

                const resp = await all.banks.core.services.httpReq(
                    "https://start.telebank.co.il/Titan/gatewayAPI/checks/details",
                    'POST', req, false, false);
                if (resp && resp.ChecksDetails && resp.ChecksDetails.ChecksDetailsBlock && Array.isArray(resp.ChecksDetails.ChecksDetailsBlock.CheckEntry)) {
                    if (OperationDescription) {
                        let foundCheck = false;
                        const matchChecks = resp.ChecksDetails.ChecksDetailsBlock.CheckEntry.filter((it) => reqSource.OperationDescription.includes(it.CheckNumber))
                        if (matchChecks.length > 1) {
                            const matchByAmount = matchChecks.filter((it) => Number(it.CheckAmount) === reqSource.OperationAmount)
                            if (matchByAmount.length) {
                                foundCheck = matchByAmount[0]
                            } else {
                                foundCheck = matchChecks[0]
                            }
                        } else {
                            foundCheck = matchChecks[0]
                        }
                        checkLoadResult = [];
                        if (foundCheck) {
                            const checkDet = foundCheck;
                            const checkBaseData = {
                                CheckBankNumber: parseInt(checkDet.CheckBankNumber ? checkDet.CheckBankNumber : acc.NewAccountInfo.BankID),
                                CheckBranchNumber: parseInt(checkDet.CheckBranchNumber ? checkDet.CheckBranchNumber : acc.AccountInfo.BranchID /*acc.NewAccountInfo.BranchID*/),
                                CheckAccountNumber: parseInt(checkDet.CheckAccountNumber ? checkDet.CheckAccountNumber : acc.NewAccountInfo.AccountID),
                                Asmachta: reqSource.OperationNumber + '' + reqSource.BranchTreasuryNumber.replace(/\D/g, ""),
                                "DepositeDate": parseInt(checkDet.CheckValueDate),
                                "CheckNumber": parseInt(checkDet.CheckNumber),
                                "CheckTotal": parseFloat(checkDet.CheckAmount),
                                "ImageNameKey": "x"
                            };
                            const imageNameKeyPrepared = checkBaseData.CheckBankNumber + ''
                                + checkBaseData.CheckBranchNumber + ''
                                + checkBaseData.CheckAccountNumber + ''
                                + checkBaseData.CheckNumber + ''
                                + checkBaseData.DepositeDate + '_'
                                + parseInt(all.banks.accountDetails.bank.BankNumber) /*parseInt(acc.NewAccountInfo.BankID)*/ + ''
                                + parseInt(acc.AccountInfo.BranchID) /*parseInt(acc.NewAccountInfo.BranchID)*/ + ''
                                + parseInt(acc.NewAccountInfo.AccountID);

                            if (checkDet.FrontalCheckImage) {

                                checkBaseData.ImageNameKey = await mergeAndUploadImages(imageNameKeyPrepared, checkDet.FrontalCheckImage, checkDet.BackCheckImage, checkBaseData);
                            } else if (checkDet.PictureID && checkDet.PictureID !== '00000000000000000000000000000000_00000') {
                                if (req.DepositNumber || reqSource.DepositNumber !== undefined) {
                                    try {
                                        const chkImgRslt = await all.banks.core.services.httpReq('https://start.telebank.co.il/Titan/gatewayAPI/checks/image',
                                            'POST', {
                                                "checkType": "DepositedChecks",
                                                "identifyImage": checkDet.IdentifyCheckImage,
                                                "identifySeqCheck": checkDet.IdentifySeqCheck,
                                                "identifyProcessDate": checkDet.IdentifyProcessDate,
                                                "identifyCreditBank": checkDet.IdentifyCreditBank, //"",
                                                "pictureID": checkDet.PictureID,
                                                "lastTransactionFlag": "False"
                                            });
                                        if (chkImgRslt && chkImgRslt.CheckImage && chkImgRslt.CheckImage.FrontalCheckImage) {
                                            checkBaseData.ImageNameKey = await mergeAndUploadImages(imageNameKeyPrepared, chkImgRslt.CheckImage.FrontalCheckImage, chkImgRslt.CheckImage.BackCheckImage, checkBaseData);
                                        }
                                    } catch (exc0) {
                                        console.error(exc0);
                                        writeLog(exc0);
                                    }
                                } else {
                                    try {
                                        const chkImgRslt = await all.banks.core.services.httpReq(
                                            "https://start.telebank.co.il/Trade/asprip/index.php/retailHomePage/lastTransactions/pullSingleCheckFromBundlePopup/?accIdx="
                                            + digestsEncoding.MD5(acc.NewAccountInfo.BankID + acc.NewAccountInfo.BranchID + acc.NewAccountInfo.ControlDigits + acc.NewAccountInfo.AccountID)
                                            + "&sN=null&OperationCode=036&IdentifyCreditBank=&IdentifyCheckImage=" + checkDet.IdentifyCheckImage
                                            + "&IdentifySeqCheck=" + checkDet.IdentifySeqCheck
                                            + "&IdentifyProcessDate=" + checkDet.IdentifyProcessDate
                                            + "&CheckBankNumber=" + checkDet.CheckBankNumber
                                            + "&PictureID=" + checkDet.PictureID
                                            + "&CheckStatusCode=00&CheckBranchNumber=" + checkDet.CheckBranchNumber
                                            + "&CheckAccountNumber=" + checkDet.CheckAccountNumber
                                            + "&CheckNumber=" + checkDet.CheckNumber
                                            + "&CheckValueDate=" + checkDet.CheckValueDate
                                            + "&CheckAmount=" + checkDet.CheckAmount
                                            + "&ReturnedDate=&ReasonForReturnedCheck=",
                                            'GET', null, false, false);
                                        const contentImg = $(chkImgRslt).find(".checkImgFront .checkImgSize");
                                        if (contentImg.length) {
                                            checkBaseData.ImageNameKey = await sendCheckImage(imageNameKeyPrepared,
                                                contentImg.attr("src").replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), checkBaseData);
                                        }
                                    } catch (exc0) {
                                        console.error(exc0);
                                        writeLog(exc0);
                                    }
                                }
                            } else if (!(resp.Error && resp.Error.MsgText === "אין אפשרות להציג את תצלום השיק המבוקש")) {
                                try {
                                    const urlPopAllChecks = "https://start.telebank.co.il/Trade/asprip/index.php/retailHomePage/lastTransactions/pullCheckPopup/?accIdx="
                                        + digestsEncoding.MD5(acc.NewAccountInfo.BankID + acc.NewAccountInfo.BranchID + acc.NewAccountInfo.ControlDigits + acc.NewAccountInfo.AccountID)
                                        + "&sN=null&OperationCode=" + req.OperationCode
                                        + "&OperationBranch=" + req.OperationBranch
                                        + "&Urn=" + req.Urn
                                        + "&OperationBank=" + req.OperationBank
                                        + "&BusinessDayDate=" + req.BusinessDayDate
                                        + "&ValueDate=" + req.ValueDate
                                        + "&DepositNumber=" + req.DepositNumber;
                                    await all.banks.core.services.httpReq(urlPopAllChecks, 'GET', null, false, false);

                                    const urlMulti = "https://start.telebank.co.il/Trade/asprip/index.php/retailHomePage/lastTransactions/pullSingleCheckFromBundlePopup/?accIdx="
                                        + digestsEncoding.MD5(acc.NewAccountInfo.BankID + acc.NewAccountInfo.BranchID + acc.NewAccountInfo.ControlDigits + acc.NewAccountInfo.AccountID)
                                        + "&sN=null&OperationCode=" + req.OperationCode
                                        + "&IdentifyCreditBank=" + checkDet.IdentifyCreditBank
                                        + "&IdentifyCheckImage=" + checkDet.IdentifyCheckImage
                                        + "&IdentifySeqCheck=" + checkDet.IdentifySeqCheck
                                        + "&IdentifyProcessDate=" + checkDet.IdentifyProcessDate
                                        + "&CheckBankNumber=" + checkDet.CheckBankNumber
                                        + "&PictureID=" + checkDet.PictureID
                                        + "&CheckStatusCode=" + checkDet.CheckStatusCode
                                        + "&CheckBranchNumber=" + checkDet.CheckBranchNumber
                                        + "&CheckAccountNumber=" + checkDet.CheckAccountNumber
                                        + "&CheckNumber=" + checkDet.CheckNumber
                                        + "&CheckValueDate=" + checkDet.CheckValueDate
                                        + "&CheckAmount=" + checkDet.CheckAmount
                                        + "&ReturnedDate=&ReasonForReturnedCheck=";
                                    const chkImgRslt = await all.banks.core.services.httpReq(urlMulti, 'GET', null, false, false);
                                    const contentImg = $(chkImgRslt).find(".checkImgFront .checkImgSize");
                                    if (contentImg.length) {
                                        checkBaseData.ImageNameKey = await sendCheckImage(imageNameKeyPrepared,
                                            contentImg.attr("src").replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), checkBaseData);
                                    }
                                } catch (exc1) {
                                    console.error(exc1);
                                    writeLog(exc1);
                                }
                            }

                            checkLoadResult.push(checkBaseData);
                            if (checkBaseData.ImageNameKey === "x") {
                                all.banks.generalVariables.numChecksNotWithdrawn++;
                            } else {
                                all.banks.generalVariables.numChecksDrawn++;
                            }
                        }
                    } else {
                        checkLoadResult = [];
                        for (let checkDetIdx = 0; checkDetIdx < resp.ChecksDetails.ChecksDetailsBlock.CheckEntry.length; checkDetIdx++) {
                            const checkDet = resp.ChecksDetails.ChecksDetailsBlock.CheckEntry[checkDetIdx];
                            const checkBaseData = {
                                CheckBankNumber: parseInt(checkDet.CheckBankNumber ? checkDet.CheckBankNumber : acc.NewAccountInfo.BankID),
                                CheckBranchNumber: parseInt(checkDet.CheckBranchNumber ? checkDet.CheckBranchNumber : acc.AccountInfo.BranchID /*acc.NewAccountInfo.BranchID*/),
                                CheckAccountNumber: parseInt(checkDet.CheckAccountNumber ? checkDet.CheckAccountNumber : acc.NewAccountInfo.AccountID),
                                Asmachta: reqSource.OperationNumber + '' + reqSource.BranchTreasuryNumber.replace(/\D/g, ""),
                                "DepositeDate": parseInt(checkDet.CheckValueDate),
                                "CheckNumber": parseInt(checkDet.CheckNumber),
                                "CheckTotal": parseFloat(checkDet.CheckAmount),
                                "ImageNameKey": "x"
                            };
                            const imageNameKeyPrepared = checkBaseData.CheckBankNumber + ''
                                + checkBaseData.CheckBranchNumber + ''
                                + checkBaseData.CheckAccountNumber + ''
                                + checkBaseData.CheckNumber + ''
                                + checkBaseData.DepositeDate + '_'
                                + parseInt(all.banks.accountDetails.bank.BankNumber) /*parseInt(acc.NewAccountInfo.BankID)*/ + ''
                                + parseInt(acc.AccountInfo.BranchID) /*parseInt(acc.NewAccountInfo.BranchID)*/ + ''
                                + parseInt(acc.NewAccountInfo.AccountID);

                            if (checkDet.FrontalCheckImage) {
                                checkBaseData.ImageNameKey = await mergeAndUploadImages(imageNameKeyPrepared, checkDet.FrontalCheckImage, checkDet.BackCheckImage, checkBaseData);
                            } else if (checkDet.PictureID && checkDet.PictureID !== '00000000000000000000000000000000_00000') {
                                if (req.DepositNumber) {
                                    try {
                                        const chkImgRslt = await all.banks.core.services.httpReq('https://start.telebank.co.il/Titan/gatewayAPI/checks/image',
                                            'POST', {
                                                "checkType": "DepositedChecks",
                                                "identifyImage": checkDet.IdentifyCheckImage,
                                                "identifySeqCheck": checkDet.IdentifySeqCheck,
                                                "identifyProcessDate": checkDet.IdentifyProcessDate,
                                                "identifyCreditBank": checkDet.IdentifyCreditBank, //"",
                                                "pictureID": checkDet.PictureID,
                                                "lastTransactionFlag": "False"
                                            });
                                        if (chkImgRslt && chkImgRslt.CheckImage && chkImgRslt.CheckImage.FrontalCheckImage) {
                                            checkBaseData.ImageNameKey = await mergeAndUploadImages(imageNameKeyPrepared, chkImgRslt.CheckImage.FrontalCheckImage, chkImgRslt.CheckImage.BackCheckImage, checkBaseData);
                                        }
                                    } catch (exc0) {
                                        console.error(exc0);
                                        writeLog(exc0);
                                    }
                                } else {
                                    try {
                                        const chkImgRslt = await all.banks.core.services.httpReq(
                                            "https://start.telebank.co.il/Trade/asprip/index.php/retailHomePage/lastTransactions/pullSingleCheckFromBundlePopup/?accIdx="
                                            + digestsEncoding.MD5(acc.NewAccountInfo.BankID + acc.NewAccountInfo.BranchID + acc.NewAccountInfo.ControlDigits + acc.NewAccountInfo.AccountID)
                                            + "&sN=null&OperationCode=036&IdentifyCreditBank=&IdentifyCheckImage=" + checkDet.IdentifyCheckImage
                                            + "&IdentifySeqCheck=" + checkDet.IdentifySeqCheck
                                            + "&IdentifyProcessDate=" + checkDet.IdentifyProcessDate
                                            + "&CheckBankNumber=" + checkDet.CheckBankNumber
                                            + "&PictureID=" + checkDet.PictureID
                                            + "&CheckStatusCode=00&CheckBranchNumber=" + checkDet.CheckBranchNumber
                                            + "&CheckAccountNumber=" + checkDet.CheckAccountNumber
                                            + "&CheckNumber=" + checkDet.CheckNumber
                                            + "&CheckValueDate=" + checkDet.CheckValueDate
                                            + "&CheckAmount=" + checkDet.CheckAmount
                                            + "&ReturnedDate=&ReasonForReturnedCheck=",
                                            'GET', null, false, false);
                                        const contentImg = $(chkImgRslt).find(".checkImgFront .checkImgSize");
                                        if (contentImg.length) {
                                            checkBaseData.ImageNameKey = await sendCheckImage(imageNameKeyPrepared,
                                                contentImg.attr("src").replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), checkBaseData);
                                        }
                                    } catch (exc0) {
                                        console.error(exc0);
                                        writeLog(exc0);
                                    }
                                }
                            } else if (!(resp.Error && resp.Error.MsgText === "אין אפשרות להציג את תצלום השיק המבוקש")) {
                                try {
                                    const urlPopAllChecks = "https://start.telebank.co.il/Trade/asprip/index.php/retailHomePage/lastTransactions/pullCheckPopup/?accIdx="
                                        + digestsEncoding.MD5(acc.NewAccountInfo.BankID + acc.NewAccountInfo.BranchID + acc.NewAccountInfo.ControlDigits + acc.NewAccountInfo.AccountID)
                                        + "&sN=null&OperationCode=" + req.OperationCode
                                        + "&OperationBranch=" + req.OperationBranch
                                        + "&Urn=" + req.Urn
                                        + "&OperationBank=" + req.OperationBank
                                        + "&BusinessDayDate=" + req.BusinessDayDate
                                        + "&ValueDate=" + req.ValueDate
                                        + "&DepositNumber=" + req.DepositNumber;
                                    await all.banks.core.services.httpReq(urlPopAllChecks, 'GET', null, false, false);

                                    const urlMulti = "https://start.telebank.co.il/Trade/asprip/index.php/retailHomePage/lastTransactions/pullSingleCheckFromBundlePopup/?accIdx="
                                        + digestsEncoding.MD5(acc.NewAccountInfo.BankID + acc.NewAccountInfo.BranchID + acc.NewAccountInfo.ControlDigits + acc.NewAccountInfo.AccountID)
                                        + "&sN=null&OperationCode=" + req.OperationCode
                                        + "&IdentifyCreditBank=" + checkDet.IdentifyCreditBank
                                        + "&IdentifyCheckImage=" + checkDet.IdentifyCheckImage
                                        + "&IdentifySeqCheck=" + checkDet.IdentifySeqCheck
                                        + "&IdentifyProcessDate=" + checkDet.IdentifyProcessDate
                                        + "&CheckBankNumber=" + checkDet.CheckBankNumber
                                        + "&PictureID=" + checkDet.PictureID
                                        + "&CheckStatusCode=" + checkDet.CheckStatusCode
                                        + "&CheckBranchNumber=" + checkDet.CheckBranchNumber
                                        + "&CheckAccountNumber=" + checkDet.CheckAccountNumber
                                        + "&CheckNumber=" + checkDet.CheckNumber
                                        + "&CheckValueDate=" + checkDet.CheckValueDate
                                        + "&CheckAmount=" + checkDet.CheckAmount
                                        + "&ReturnedDate=&ReasonForReturnedCheck=";
                                    const chkImgRslt = await all.banks.core.services.httpReq(urlMulti, 'GET', null, false, false);
                                    const contentImg = $(chkImgRslt).find(".checkImgFront .checkImgSize");
                                    if (contentImg.length) {
                                        checkBaseData.ImageNameKey = await sendCheckImage(imageNameKeyPrepared,
                                            contentImg.attr("src").replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), checkBaseData);
                                    }
                                } catch (exc1) {
                                    console.error(exc1);
                                    writeLog(exc1);
                                }
                            }

                            checkLoadResult.push(checkBaseData);
                            if (checkBaseData.ImageNameKey === "x") {
                                all.banks.generalVariables.numChecksNotWithdrawn++;
                            } else {
                                all.banks.generalVariables.numChecksDrawn++;
                            }
                        }
                    }
                }

            } catch (exc) {
                console.error(exc);
                writeLog(exc);
            }

            return checkLoadResult;
        }

        async function loadTransactionDetails(reqSource) {
            try {
                const acc = companiesWithAccountsList[companyIdx].accounts[accountIdx];
                const resp = await all.banks.core.services.httpReq(
                    "https://start.telebank.co.il/Titan/gatewayAPI/transactionDetails"
                    + "/" + acc.NewAccountInfo.AccountID
                    + "/" + reqSource.OperationNumber,
                    'GET', null, false, false);
                if (resp && resp.TransactionDetails) {
                    const transDet = resp.TransactionDetails;
                    return [{
                        "DepositeTransferDate": strYYYYMMDDAsDDMMYYYYArray(reqSource.OperationDate).join("/"),
                        "BankTransferNumber": parseInt(transDet.BeneficiaryBankNumber),
                        "BranchTransferNumber": parseInt(transDet.BeneficiaryBranchNumber),
                        "AccountTransferNumber": parseInt(transDet.BeneficiaryAccountNumber),
                        "NamePayerTransfer": transDet.BeneficiaryAccountName,
                        "DetailsTransfer": transDet.Comments,
                        "TransferTotal": reqSource.OperationAmount
                    }];
                }
            } catch (e) {
                console.error(e);
                writeLog(e);
                return [];
            }
        }

        async function loadCreditIncomingTransferDetails(reqSource) {
            try {
                const acc = companiesWithAccountsList[companyIdx].accounts[accountIdx];
                const resp = await all.banks.core.services.httpReq(
                    "https://start.telebank.co.il/Titan/gatewayAPI/creditIncomingTransferDetails",
                    'POST', {
                        "AccountNumber": acc.NewAccountInfo.AccountID,
                        "Urn": reqSource.Urn
                    }, false, false);
                if (resp && resp.CreditIncomingTransferDetails) {
                    const transDet = resp.CreditIncomingTransferDetails;
                    const result = {
                        "DepositeTransferDate": strYYYYMMDDAsDDMMYYYYArray(reqSource.OperationDate).join("/"),
                        "BankTransferNumber": null,
                        "BranchTransferNumber": null,
                        "AccountTransferNumber": null,
                        "NamePayerTransfer": transDet.MaavirName || transDet.MosadName,
                        "DetailsTransfer": transDet.FreeText || transDet.MosadCode,
                        "TransferTotal": reqSource.OperationAmount,
                        "MosadCode": transDet.MosadCode
                    };

                    let mtch;
                    if ((mtch = /(\d{1,3})-(\d{1,4})-(\d{1,4})-(\d{5,})/g.exec(reqSource.OperationDescription2)) !== null) {
                        result["BankTransferNumber"] = parseInt(mtch[1]);
                        result["BranchTransferNumber"] = parseInt(mtch[2]);
                        result["AccountTransferNumber"] = parseInt(mtch[4]);
                    } else if ((mtch = /[^\d-](\d{1,3})-(\d{1,4})-(\d{5,})/g.exec(reqSource.OperationDescription2)) !== null) {
                        result["BankTransferNumber"] = parseInt(mtch[1]);
                        result["BranchTransferNumber"] = parseInt(mtch[2]);
                        result["AccountTransferNumber"] = parseInt(mtch[3]);
                    }

                    return [result];
                }
            } catch (e) {
                console.error(e);
                writeLog(e);
                return [];
            }
        }

        async function loadDebitIncomingTransferDetails(reqSource) {
            try {
                const acc = companiesWithAccountsList[companyIdx].accounts[accountIdx];
                const resp = await all.banks.core.services.httpReq(
                    "https://start.telebank.co.il/Titan/gatewayAPI/debitIncomingTransferDetails"
                    + "/" + acc.NewAccountInfo.AccountID
                    + "/" + reqSource.Urn,
                    'GET', null, false, false);
                if (resp && (resp.DebitIncomingTransferDetails || resp.DebitIncomingTransferDetailsResponse)) {
                    const transDet = resp.DebitIncomingTransferDetails || resp.DebitIncomingTransferDetailsResponse;
                    const result = {
                        "DepositeTransferDate": strYYYYMMDDAsDDMMYYYYArray(reqSource.OperationDate).join("/"),
                        "BankTransferNumber": null,
                        "BranchTransferNumber": null,
                        "AccountTransferNumber": null,
                        "NamePayerTransfer": transDet.MosadName || transDet.MosadCode,
                        "DetailsTransfer": transDet.ReturnReason,
                        "TransferTotal": transDet.CreditAmount || reqSource.OperationAmount,
                        "MosadCode": transDet.MosadCode
                    };

                    let mtch;
                    if ((mtch = /(\d{1,3})-(\d{1,4})-(\d{1,4})-(\d{5,})/g.exec(reqSource.OperationDescription2)) !== null) {
                        result["BankTransferNumber"] = parseInt(mtch[1]);
                        result["BranchTransferNumber"] = parseInt(mtch[2]);
                        result["AccountTransferNumber"] = parseInt(mtch[4]);
                    } else if ((mtch = /[^\d-](\d{1,3})-(\d{1,4})-(\d{5,})/g.exec(reqSource.OperationDescription2)) !== null) {
                        result["BankTransferNumber"] = parseInt(mtch[1]);
                        result["BranchTransferNumber"] = parseInt(mtch[2]);
                        result["AccountTransferNumber"] = parseInt(mtch[3]);
                    }

                    return [result];
                }
            } catch (e) {
                console.error(e);
                writeLog(e);
                return [];
            }
        }

        async function loadOutgoingTransferDetails(reqSource) {
            try {
                const acc = companiesWithAccountsList[companyIdx].accounts[accountIdx];
                const resp = await all.banks.core.services.httpReq(
                    "https://start.telebank.co.il/Titan/gatewayAPI/outgoingTransferDetails"
                    + "/" + acc.NewAccountInfo.AccountID
                    + "/" + reqSource.Urn,
                    'GET', null, false, false);
                if (resp && resp.OutgoingTransferDetails) {
                    const transDet = resp.OutgoingTransferDetails;
                    return [{
                        "DepositeTransferDate": strYYYYMMDDAsDDMMYYYYArray(reqSource.OperationDate).join("/"),
                        "BankTransferNumber": parseInt(transDet.BeneficiaryBankID),
                        "BranchTransferNumber": parseInt(transDet.BeneficiaryBranchID),
                        "AccountTransferNumber": parseInt(transDet.BeneficiaryAccountID),
                        "NamePayerTransfer": transDet.BeneficiaryName,
                        "DetailsTransfer": transDet.TransferComments,
                        "TransferTotal": reqSource.OperationAmount
                    }];
                    ;
                }
            } catch (e) {
                console.error(e);
                writeLog(e);
                return [];
            }
        }

        async function loadSwiftTransferDetails(reqSource) {
            try {
                const acc = companiesWithAccountsList[companyIdx].accounts[accountIdx];
                const resp = await all.banks.core.services.httpReq(
                    "https://start.telebank.co.il/Titan/gatewayAPI/swiftTransferDetails"
                    + "/" + acc.NewAccountInfo.AccountID
                    + "/" + reqSource.Urn
                    + "/?TransactionCode=" + reqSource.OperationCode,
                    'GET', null, false, false);
                if (resp && resp.SwiftTransferDetails && resp.SwiftTransferDetails.SwiftMessage
                    && Array.isArray(resp.SwiftTransferDetails.SwiftMessage.BlockEntry)) {

                    const messageContent = resp.SwiftTransferDetails.SwiftMessage.BlockEntry
                        .reduce((acmltr, be) => {
                            if (Array.isArray(be.MessageLine)) {
                                const linesFrmtd = be.MessageLine.map(ln => ['<p>', ln, '</p>'].join(""));
                                acmltr.push(...linesFrmtd);
                            }
                            return acmltr;
                        }, [])
                        .join("");

                    return [{
                        "DepositeTransferDate": strYYYYMMDDAsDDMMYYYYArray(reqSource.OperationDate).join("/"),
                        "BankTransferNumber": null,
                        "BranchTransferNumber": null,
                        "AccountTransferNumber": null,
                        "NamePayerTransfer": null,
                        "DetailsTransfer": [
                            '<div class="swiftCaseContent">',
                            messageContent,
                            '</div>'
                        ].join(""),
                        "TransferTotal": reqSource.OperationAmount
                    }];
                }
            } catch (e) {
                console.error(e);
                writeLog(e);
                return [];
            }
        }

        async function loadSalaryTransferDetails(foundInSalariesEntry) {
            try {
                const acc = companiesWithAccountsList[companyIdx].accounts[accountIdx];
                const resp = await all.banks.core.services.httpReq(
                    "https://start.telebank.co.il/Titan/gatewayAPI/sme/salaries/salariesEventDetails"
                    + "/" + foundInSalariesEntry.EmployerAccount
                    + "/" + foundInSalariesEntry.Urn
                    + "/" + foundInSalariesEntry.EmployerType
                    + "/" + foundInSalariesEntry.StatusCode
                    + "/" + foundInSalariesEntry.StatusName,
                    'GET', null, false, false);
                if (resp && resp.SalariesEventDetails && resp.SalariesEventDetails.SalaryPaymentBlock
                    && Array.isArray(resp.SalariesEventDetails.SalaryPaymentBlock.SalaryPaymentEntry)) {
                    return resp.SalariesEventDetails.SalaryPaymentBlock.SalaryPaymentEntry
                        .map(ntry => {
                            return {
                                "DepositeTransferDate": strDDMMYYYYAsDDMMYYYYArray(foundInSalariesEntry.TransactionDate).join("/"),
                                "BankTransferNumber": parseInt(ntry.BeneficiaryBank),
                                "BranchTransferNumber": parseInt(ntry.BeneficiaryBranch),
                                "AccountTransferNumber": parseInt(ntry.BeneficiaryAccount),
                                "NamePayerTransfer": ["BeneficiaryFirstName", "BeneficiaryLastName"]
                                    .filter(k => !!ntry[k] && !!ntry[k].trim())
                                    .map(k => discountAsakimPlusNew.unescapeHtml(ntry[k].trim()))
                                    .join(' '),
                                "DetailsTransfer": ntry.BeneficiaryComment,
                                "TransferTotal": ntry.BeneficiarySalaryAmount
                            };
                        });
                }
            } catch (e) {
                console.error(e);
                writeLog(e);
                return [];
            }
        }

        async function sendResults() {
            myEmitterLogs(29);
            all.banks.generalVariables.numChecksDrawn = 0;
            all.banks.generalVariables.numChecksNotWithdrawn = 0;

            let retry;
            do {
                try {
                    await all.banks.core.services.sendOsh(all.banks.generalVariables.allDataArr, false);
                    retry = false;
                } catch (exc) {
                    console.error(exc);
                    retry = (exc === 'discard');
                }
            } while (retry);
        }

        async function mergeAndUploadImages(key, checkImageFront, checkImageBack, checkBaseData) {
            if (!checkImageFront) {
                return "x"
            }
            let [imgFront, imgBack] = await Promise.all([
                new Promise(resolve => {
                    const img = new Image();
                    img.src = 'data:image/jpeg;base64,' + checkImageFront;
                    img.onload = () => resolve(img);
                    img.onerror = () => resolve(null);
                }),
                new Promise(resolve => {
                    if (!checkImageBack) {
                        resolve(null);
                    } else {
                        const img = new Image();
                        img.src = 'data:image/jpeg;base64,' + checkImageBack;
                        img.onload = () => resolve(img);
                        img.onerror = () => resolve(null);
                    }
                })]);
            if (!imgFront) {
                return "x";
            }
            const canvas = document.createElement("canvas"), ctx = canvas.getContext("2d");
            canvas.width = Math.max(imgFront.width, (imgBack !== null ? imgBack.width : 0));
            canvas.height = imgFront.height + (imgBack !== null ? imgBack.height : 0);
            ctx.drawImage(imgFront, 0, 0);
            if (imgBack !== null) {
                ctx.drawImage(imgBack, 0, imgFront.height);
            }

            const formData = new FormData();
            const blob = new Blob(
                [canvas.toDataURL("image/jpeg", 0.2)
                    .replace(/^data:image\/(png|jpg|jpeg);base64,/, "")],
                {type: "text/plain"}
            );
            formData.append(key, blob);
            do {
                try {
                    await all.banks.core.services.sendChecks({
                        formData: formData,
                        params: {
                            imagenamekey: key,
                            bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.generalVariables.allDataArr.BankData[0].Account.length - 1].BankNumber,
                            snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.generalVariables.allDataArr.BankData[0].Account.length - 1].BranchNumber,
                            accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.generalVariables.allDataArr.BankData[0].Account.length - 1].AccountNumber
                        }
                    });
                    all.banks.generalVariables.numChecksDrawn++;
                    return key
                } catch (error) {
                    console.log(error)
                    if (error !== 'discard') {
                        all.banks.generalVariables.numChecksNotWithdrawn++;
                        return "x"
                    }
                }
            } while (true);
        }

        async function sendCheckImage(key, data, checkBaseData) {
            let result = "x";
            try {
                const fd = new FormData();
                fd.append(key, new Blob([data], {
                    type: "text/plain"
                }));
                let retry;
                do {
                    try {

                        await all.banks.core.services.sendChecks({
                            formData: fd,
                            params: {
                                imagenamekey: key,
                                bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.generalVariables.allDataArr.BankData[0].Account.length - 1].BankNumber,
                                snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.generalVariables.allDataArr.BankData[0].Account.length - 1].BranchNumber,
                                accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.generalVariables.allDataArr.BankData[0].Account.length - 1].AccountNumber
                            }
                        });
                        retry = false;
                        result = key;
                    } catch (exc) {
                        console.error(exc);
                        retry = (exc === 'discard');
                    }
                } while (retry);

            } catch (exc0) {
                console.error(exc0);
            }
            return result;
        }
    }

    async function processAllCreditCards() {
        let creditCardsMMYYYY = [];
        let monYearIdx;
        let currentAccount, currentCard, currentCardData;
        if (all.banks.accountDetails.ccardMonth > 0) {
            myEmitterLogs(14);

            for (var i = 0; i < all.banks.accountDetails.ccardMonth; i++) {
                var dateMonth = new Date(new Date().getFullYear(), new Date().getMonth() - i, 1);
                creditCardsMMYYYY.push(dateAsDDMMYYYYArray(dateMonth).slice(1).join(''));
            }

            all.banks.generalVariables.allDataArrAshrai = [];
            companyIdx = 0;
            for (; companyIdx < companiesWithAccountsList.length; companyIdx++) {
                accountIdx = 0;
                for (; accountIdx < companiesWithAccountsList[companyIdx].accounts.length; accountIdx++) {
                    currentAccount = companiesWithAccountsList[companyIdx].accounts[accountIdx];
                    await processAccountCreditCards();
                }
            }

            await sendResults();
        }

        function processTransactionEntry(ntry) {
            const bbEntry = {
                "NextBillingDate": strYYYYMMDDAsDDMMYYYYArray(ntry.DebitDate).join('/'),
//                        "NextCycleTotal": next_cycleTotal,
                "TransDesc": ntry.MerchantName,
                "TransTotal": ntry.DebitAmount,
                "ValueDate": strYYYYMMDDAsDDMMYYYYArray(ntry.PurchaseDate ? ntry.PurchaseDate : ntry.DebitDate).join('/'),
                "TransCategory": all.banks.accountDetails.isCategory ? ntry.MerchantSector : null,
                "TotalPayments": null,
                "CurrentPaymentNum": null,
                "CardStatus": null,
                "indFakeDate": 0,
                "currency_id": all.banks.core.services.getTypeCurrencyAll(ntry.PurchaseCurrencyCode || ntry.CalPurchaseCurrencySymbol),
                "original_total": ntry.PurchaseAmount,
                "ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(ntry.DebitCurrencySymbol || ntry.DebitCurrencyCode),
                "comment": ntry.PurchaseDescription
            };

            if (('InstallmentNumber' in ntry) && ('TotalNumberOfInstallments' in ntry)
                && ntry.TotalNumberOfInstallments.trim() && ntry.InstallmentNumber.trim()) {
                bbEntry['CurrentPaymentNum'] = parseInt(ntry.InstallmentNumber.trim());
                bbEntry['TotalPayments'] = parseInt(ntry.TotalNumberOfInstallments.trim());
            } else {
                let matchPymnts = /(\d{1,2})\s*(מ|מתוך)\s*-\s*(\d{1,2})/g.exec(ntry.PurchaseComments);
                if (matchPymnts !== null) {
                    bbEntry['CurrentPaymentNum'] = matchPymnts[1];
                    bbEntry['TotalPayments'] = matchPymnts[3];
                }
            }

            return bbEntry;
        }

        async function processCreditCardPast() {
            try {
                myEmitterLogs(15, currentCard.CardNumber + ' period ' + creditCardsMMYYYY[monYearIdx]);

                const resp = await all.banks.core.services.httpReq(
                    "https://start.telebank.co.il/Titan/gatewayAPI/creditCards/cardPastDebitTransactions"
                    + "/" + currentAccount.NewAccountInfo.AccountID
                    + "/" + creditCardsMMYYYY[monYearIdx]
                    + "/C?CardNumber=" + currentCard.CardNumber + "&CardTypeCode=" + currentCardData.CardTypeCode + "&CardValidityDate=" + currentCardData.CardValidityDate,
                    'GET', null, false, false);
                if (resp && resp.CardPastDebitTransactions && resp.CardPastDebitTransactions.CardDebitsTransactionsBlock
                    && Array.isArray(resp.CardPastDebitTransactions.CardDebitsTransactionsBlock.CardDebitsTransactionEntry)) {

                    const processed = [];
                    let firstValidNextBillingDate = null;
                    for (const row of resp.CardPastDebitTransactions.CardDebitsTransactionsBlock.CardDebitsTransactionEntry) {
                        if (row.TempPurchaseFlag === 'T') {
                            continue;
                        }

                        const processedNtry = Object.assign(
                            await processTransactionEntry(row),
                            {
                                NextCycleTotal: resp.CardPastDebitTransactions.NISTotalDebit
                            },
                            currentCard
                        );
                        processed.push(processedNtry);

                        if (firstValidNextBillingDate === null && processedNtry['NextBillingDate']) {
                            firstValidNextBillingDate = processedNtry['NextBillingDate'];
                        }
                    }

                    if (firstValidNextBillingDate !== null) {
                        processed.filter(ntry => !ntry['NextBillingDate']).forEach(ntry => ntry['NextBillingDate'] = firstValidNextBillingDate);
                    }

                    all.banks.generalVariables.allDataArrAshrai.push(...processed);

                    myEmitterLogs(12, processed.length);
                }

            } catch (exc) {
                console.log(exc);
                writeLog(exc);
            }
        }

        async function processCreditCardCurrent() {
            try {
                myEmitterLogs(15, currentCard.CardNumber + ' period current');

                const resp = await all.banks.core.services.httpReq(
                    "https://start.telebank.co.il/Titan/gatewayAPI/creditCards/cardCurrentDebitTransactions"
                    + "/" + currentAccount.NewAccountInfo.AccountID
                    + "/C?CardNumber=" + currentCard.CardNumber + "&CardTypeCode=" + currentCardData.CardTypeCode + "&CardValidityDate=" + currentCardData.CardValidityDate,
                    'GET', null, false, false);
                if (resp && resp.CardCurrentDebitTransactions && resp.CardCurrentDebitTransactions.CardDebitsTransactionsBlock
                    && Array.isArray(resp.CardCurrentDebitTransactions.CardDebitsTransactionsBlock.CardDebitsTransactionEntry)) {

                    const processed = [];
                    let firstValidNextBillingDate = null;
                    for (const row of resp.CardCurrentDebitTransactions.CardDebitsTransactionsBlock.CardDebitsTransactionEntry) {
                        if (row.TempPurchaseFlag === 'T') {
                            continue;
                        }

                        const processedNtry = Object.assign(
                            await processTransactionEntry(row),
                            {
                                NextCycleTotal: resp.CardCurrentDebitTransactions.NISTotalDebit
                            },
                            currentCard
                        );
                        processed.push(processedNtry);

                        if (firstValidNextBillingDate === null && processedNtry['NextBillingDate']) {
                            firstValidNextBillingDate = processedNtry['NextBillingDate'];
                        }
                    }

                    if (firstValidNextBillingDate !== null) {
                        processed.filter(ntry => !ntry['NextBillingDate']).forEach(ntry => ntry['NextBillingDate'] = firstValidNextBillingDate);
                    }

                    all.banks.generalVariables.allDataArrAshrai.push(...processed);

                    myEmitterLogs(12, processed.length);
                }

            } catch (exc) {
                console.log(exc);
                writeLog(exc);
            }
        }

        async function processCreditCard() {
            await processCreditCardCurrent();
            monYearIdx = 0;
            for (; monYearIdx < creditCardsMMYYYY.length; monYearIdx++) {
                await processCreditCardPast();
            }
        }


        async function processAccountAllCreditCardCurrent() {
            try {
                myEmitterLogs(15, 'all account cards, period current');

                const resp = await all.banks.core.services.httpReq(
                    "https://start.telebank.co.il/Titan/gatewayAPI/creditCards/cardCurrentDebitTransactions"
                    + "/" + currentAccount.NewAccountInfo.AccountID
                    + "/A?CardNumber=",
                    'GET', null, false, false);
                if (resp && resp.CardCurrentDebitTransactions && resp.CardCurrentDebitTransactions.CardDebitsTransactionsBlock
                    && Array.isArray(resp.CardCurrentDebitTransactions.CardDebitsTransactionsBlock.CardDebitsTransactionEntry)) {
                    currentCard = {
                        'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber), //parseInt(currentAccount.NewAccountInfo.BankID),
                        'BranchNumber': parseInt(currentAccount.AccountInfo.BranchID/*currentAccount.NewAccountInfo.BranchID*/),
                        'AccountNumber': parseInt(currentAccount.NewAccountInfo.AccountID),
                        'TargetId': all.banks.accountDetails.bank.targetId,
                        'Token': all.banks.accountDetails.bank.token,
                        'ExtractDate': new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                        'ExporterId': all.banks.spiderConfig.spiderId //,
//                        'CardNumber': card.CardNumber,
//                        'CardType': all.banks.core.services.getTypeCard(card.CardFamilyDescription)
                    };
                    const processed = [];
                    let firstValidNextBillingDate = null;
                    for (const row of resp.CardCurrentDebitTransactions.CardDebitsTransactionsBlock.CardDebitsTransactionEntry) {
                        if (row.TempPurchaseFlag === 'T') {
                            continue;
                        }

                        const processedNtry = Object.assign(
                            await processTransactionEntry(row),
                            {
                                NextCycleTotal: 0, // null,
                                'CardNumber': row.CardNumber,
                                'CardType': all.banks.core.services.getTypeCard(row.CardFamilyDescription)
                            },
                            currentCard
                        );
                        processed.push(processedNtry);

                        let cardKey;
                        if ((firstValidNextBillingDate === null
                                || !firstValidNextBillingDate[(cardKey = [processedNtry['CardType'], processedNtry['CardNumber']].join('-'))])
                            && processedNtry['NextBillingDate']) {
                            if (firstValidNextBillingDate === null) {
                                firstValidNextBillingDate = {};
                            }
                            firstValidNextBillingDate[cardKey] = processedNtry['NextBillingDate'];
                        }
                    }

                    if (firstValidNextBillingDate !== null) {
                        processed.filter(ntry => !ntry['NextBillingDate'])
                            .forEach(ntry => ntry['NextBillingDate'] = firstValidNextBillingDate[[ntry['CardType'], ntry['CardNumber']].join('-')]);
                    }

                    all.banks.generalVariables.allDataArrAshrai.push(...processed);

                    myEmitterLogs(12, processed.length);
                }

            } catch (exc) {
                console.log(exc);
                writeLog(exc);
            }
        }

        async function processAccountAllCreditCardsPast() {
            try {
                myEmitterLogs(15, 'all account cards, period ' + creditCardsMMYYYY[monYearIdx]);

                const resp = await all.banks.core.services.httpReq(
                    "https://start.telebank.co.il/Titan/gatewayAPI/creditCards/cardPastDebitTransactions"
                    + "/" + currentAccount.NewAccountInfo.AccountID
                    + "/" + creditCardsMMYYYY[monYearIdx]
                    + "/A",
                    'GET', null, false, false);
                if (resp && resp.CardPastDebitTransactions && resp.CardPastDebitTransactions.CardDebitsTransactionsBlock
                    && Array.isArray(resp.CardPastDebitTransactions.CardDebitsTransactionsBlock.CardDebitsTransactionEntry)) {
                    currentCard = {
                        'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber), //parseInt(currentAccount.NewAccountInfo.BankID),
                        'BranchNumber': parseInt(currentAccount.AccountInfo.BranchID/*currentAccount.NewAccountInfo.BranchID*/),
                        'AccountNumber': parseInt(currentAccount.NewAccountInfo.AccountID),
                        'TargetId': all.banks.accountDetails.bank.targetId,
                        'Token': all.banks.accountDetails.bank.token,
                        'ExtractDate': new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                        'ExporterId': all.banks.spiderConfig.spiderId //,
//                        'CardNumber': card.CardNumber,
//                        'CardType': all.banks.core.services.getTypeCard(card.CardFamilyDescription)
                    };
                    const processed = [];
                    let firstValidNextBillingDate = null;
                    for (const row of resp.CardPastDebitTransactions.CardDebitsTransactionsBlock.CardDebitsTransactionEntry) {
                        if (row.TempPurchaseFlag === 'T') {
                            continue;
                        }

                        const processedNtry = Object.assign(
                            await processTransactionEntry(row),
                            {
                                NextCycleTotal: 0, // null,
                                'CardNumber': row.CardNumber,
                                'CardType': all.banks.core.services.getTypeCard(row.CardFamilyDescription)
                            },
                            currentCard
                        );
                        processed.push(processedNtry);

                        let cardKey;
                        if ((firstValidNextBillingDate === null
                                || !firstValidNextBillingDate[(cardKey = [processedNtry['CardType'], processedNtry['CardNumber']].join('-'))])
                            && processedNtry['NextBillingDate']) {
                            if (firstValidNextBillingDate === null) {
                                firstValidNextBillingDate = {};
                            }
                            firstValidNextBillingDate[cardKey] = processedNtry['NextBillingDate'];
                        }
                    }

                    if (firstValidNextBillingDate !== null) {
                        processed.filter(ntry => !ntry['NextBillingDate'])
                            .forEach(ntry => ntry['NextBillingDate'] = firstValidNextBillingDate[[ntry['CardType'], ntry['CardNumber']].join('-')]);
                    }

                    all.banks.generalVariables.allDataArrAshrai.push(...processed);

                    myEmitterLogs(12, processed.length);
                }

            } catch (exc) {
                console.log(exc);
                writeLog(exc);
            }
        }

        async function processAccountCreditCards() {
            try {
                myEmitterLogs(33, [currentAccount.AccountInfo.BranchID, currentAccount.NewAccountInfo.AccountID].join('-')); //change Acc
                const cardsListResp = await all.banks.core.services.httpReq(
                    "https://start.telebank.co.il/Titan/gatewayAPI/creditCards/cardList/"
                    + currentAccount.NewAccountInfo.AccountID,
                    'GET', null, false, false);
                if (cardsListResp && cardsListResp.CardList && cardsListResp.CardList.CardsBlock
                    && Array.isArray(cardsListResp.CardList.CardsBlock.CardEntry)
                    && cardsListResp.CardList.CardsBlock.CardEntry.length) {

                    for (let cardIdx = 0; cardIdx < cardsListResp.CardList.CardsBlock.CardEntry.length; cardIdx++) {
                        const card = cardsListResp.CardList.CardsBlock.CardEntry[cardIdx];
                        currentCard = {
                            'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),//parseInt(currentAccount.NewAccountInfo.BankID),
                            'BranchNumber': parseInt(currentAccount.AccountInfo.BranchID/*currentAccount.NewAccountInfo.BranchID*/),
                            'AccountNumber': parseInt(currentAccount.NewAccountInfo.AccountID),
                            'TargetId': all.banks.accountDetails.bank.targetId,
                            'Token': all.banks.accountDetails.bank.token,
                            'ExtractDate': new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                            'ExporterId': all.banks.spiderConfig.spiderId,
                            'CardNumber': card.CardNumber,
                            'CardType': all.banks.core.services.getTypeCard(card.CardFamilyDescription)
                        };
                        currentCardData = card;
                        await processCreditCard();
                    }
                } else if (cardsListResp.Error) {
                    await processAccountAllCreditCardCurrent();
                    monYearIdx = 0;
                    for (; monYearIdx < creditCardsMMYYYY.length; monYearIdx++) {
                        await processAccountAllCreditCardsPast();
                    }
                }

            } catch (exc) {
                console.error(exc);
                writeLog(exc);
            }
        }

        async function sendResults() {
            let retry;
            do {
                try {
                    await all.banks.core.services.sendCards(all.banks.generalVariables.allDataArrAshrai);
                    retry = false;
                } catch (exc) {
                    console.error(exc);
                    retry = (exc === 'discard');
                }
            } while (retry);
        }
    }

    async function processAllNilvim() {
        if (all.banks.accountDetails.IND_NILVIM > 0) {
            await processAllStandingOrders();
            await processAllLoans();
            await processAllDeposits();
            await processAllDueChecks();
        }

        async function processAllStandingOrders() {
            myEmitterLogs(24);


            all.banks.generalVariables.allDataArrStandingOrders = [];
            companyIdx = 0;
            for (; companyIdx < companiesWithAccountsList.length; companyIdx++) {
                accountIdx = 0;
                for (; accountIdx < companiesWithAccountsList[companyIdx].accounts.length; accountIdx++) {
                    await processAccountStandingOrders();
                }
            }

            await sendResults();

            async function sendResults() {
                let retry;
                do {
                    try {
                        await all.banks.core.services.sendStandingOrders(all.banks.generalVariables.allDataArrStandingOrders);
                        retry = false;
                    } catch (exc) {
                        console.error(exc);
                        retry = (exc === 'discard');
                    }
                } while (retry);
            }

            async function processAccountStandingOrders() {
                try {
                    const acc = companiesWithAccountsList[companyIdx].accounts[accountIdx];

                    myEmitterLogs(33, [acc.AccountInfo.BranchID, acc.NewAccountInfo.AccountID].join('-')); //change Acc

                    const data = await all.banks.core.services.httpReq("https://start.telebank.co.il/Titan/gatewayAPI/debitAuthorizations/standingOrdersList/" + acc.NewAccountInfo.AccountID, 'GET', null, false, false);
                    try {
                        if (data.StandingOrdersList && data.StandingOrdersList.StandingOrdersBlock && data.StandingOrdersList.StandingOrdersBlock.StandingOrderEntry && data.StandingOrdersList.StandingOrdersBlock.StandingOrderEntry.length) {
                            data.StandingOrdersList.StandingOrdersBlock.StandingOrderEntry.forEach(function (item) {
                                if (item.StandingOrderStatus !== 'F' && item.StandingOrderStatusDescription !== "מוקפאת") {
                                    all.banks.generalVariables.allDataArrStandingOrders.push({
                                        'TargetId': all.banks.accountDetails.bank.targetId,
                                        'Token': all.banks.accountDetails.bank.token,
                                        'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                        'BranchNumber': parseInt(acc.AccountInfo.BranchID),
                                        'AccountNumber': parseInt(acc.NewAccountInfo.AccountID),
                                        'ExtractDate': new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                        'ExporterId': all.banks.spiderConfig.spiderId,
                                        "OrderName": item.Product,
                                        "OrderOpeningDate": item.CreationDate ? item.CreationDate : null,
                                        "OrderLastDate": item.LastTransferDate ? item.LastTransferDate : null,
                                        "OrderTotal": item.StandingOrderAmount,
                                        "OrderNumber": null,
                                        "Asmachta": null,
                                        BankTransferNumber: Number(item.BankID),
                                        BranchTransferNumber: Number(item.BranchID),
                                        AccountTransferNumber: Number(item.AccountNumber),
                                        NamePayerTransfer: item.OpositeName,
                                        Type: 2
                                    });
                                }
                            });
                        }
                    } catch (e) {

                    }

                    const resp = await all.banks.core.services.httpReq(
                        "https://start.telebank.co.il/Titan/gatewayAPI/debitAuthorizations/list"
                        + "/" + acc.NewAccountInfo.AccountID
                        + "/true",
                        'GET', null, false, false);
                    if (resp && resp.DebitAuthorizationsList && resp.DebitAuthorizationsList.AuthorizationsBlock
                        && Array.isArray(resp.DebitAuthorizationsList.AuthorizationsBlock.AuthorizationEntry)) {
                        const commonPart = {
                            'TargetId': all.banks.accountDetails.bank.targetId,
                            'Token': all.banks.accountDetails.bank.token,
                            'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),//parseInt(acc.NewAccountInfo.BankID),
                            'BranchNumber': parseInt(acc.AccountInfo.BranchID/*acc.NewAccountInfo.BranchID*/),
                            'AccountNumber': parseInt(acc.NewAccountInfo.AccountID),
                            'ExtractDate': new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                            'ExporterId': all.banks.spiderConfig.spiderId
                        };

                        const stOrders = resp.DebitAuthorizationsList.AuthorizationsBlock.AuthorizationEntry
                            .map(ae => {
                                return Object.assign({
                                    "OrderName": ae.InstitutionShortName,
                                    "OrderOpeningDate": strYYYYMMDDAsDDMMYYYYArray(ae.CreationDate).join("/"),
                                    "OrderLastDate": strYYYYMMDDAsDDMMYYYYArray(ae.LastDebitDate).join("/"),
                                    "OrderTotal": ae.LastDebitAmount,
                                    "OrderNumber": ae.InstitutionCode,
                                    "Asmachta": null,
                                    BankTransferNumber: null,
                                    BranchTransferNumber: null,
                                    AccountTransferNumber: null,
                                    NamePayerTransfer: null,
                                    Type: 1
                                }, commonPart);
                            });

                        all.banks.generalVariables.allDataArrStandingOrders.push(...stOrders);

                        myEmitterLogs(12, stOrders.length);
                    } else {
                        myEmitterLogs(12, 0);
                    }
                } catch (e) {
                    console.error(e);
                    writeLog(e);
                }
            }
        }

        async function processAllLoans() {
            myEmitterLogs(21);

            all.banks.generalVariables.allDataArrLoan = [];
            companyIdx = 0;
            for (; companyIdx < companiesWithAccountsList.length; companyIdx++) {
                accountIdx = 0;
                for (; accountIdx < companiesWithAccountsList[companyIdx].accounts.length; accountIdx++) {
                    await processAccountLoans();
                }
            }

            await sendResults();

            async function sendResults() {
                let retry;
                do {
                    try {
                        await all.banks.core.services.sendLoan(all.banks.generalVariables.allDataArrLoan);
                        retry = false;
                    } catch (exc) {
                        console.error(exc);
                        retry = (exc === 'discard');
                    }
                } while (retry);
            }

            async function processAccountLoans() {
                try {
                    const acc = companiesWithAccountsList[companyIdx].accounts[accountIdx];

                    myEmitterLogs(33, [acc.AccountInfo.BranchID, acc.NewAccountInfo.AccountID].join('-')); //change Acc

                    const resp = await all.banks.core.services.httpReq(
                        "https://start.telebank.co.il/Titan/gatewayAPI/onlineLoans/loansQuery"
                        + "/" + acc.NewAccountInfo.AccountID,
                        'GET', null, false, false);
                    if (resp && resp.LoansQuery && resp.LoansQuery.LoanDetailsBlock
                        && Array.isArray(resp.LoansQuery.LoanDetailsBlock.LoanEntry)) {
                        const commonPart = {
                            'TargetId': all.banks.accountDetails.bank.targetId,
                            'Token': all.banks.accountDetails.bank.token,
                            'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),//parseInt(acc.NewAccountInfo.BankID),
                            'BranchNumber': parseInt(acc.AccountInfo.BranchID/*acc.NewAccountInfo.BranchID*/),
                            'AccountNumber': parseInt(acc.NewAccountInfo.AccountID),
                            'ExtractDate': new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                            'ExporterId': all.banks.spiderConfig.spiderId
                        };

                        const loans = resp.LoansQuery.LoanDetailsBlock.LoanEntry
                            .map(le => {
                                return Object.assign({
                                    "LoanName": le.LoanName,
                                    "LoanNumber": le.LoanAccount,
                                    "LoanIntrest": le.TotalInterestRate,
                                    "LoanFinish": strYYYYMMDDAsDDMMYYYYArray(le.LastPaymentDate).join("/"),
                                    "LoanTotalLeft": le.LoanBalance,
                                    "LoanDate": strYYYYMMDDAsDDMMYYYYArray(le.EstablishmentDate).join("/"),
                                    "PaymentsNumberLeft": le.NumOfPaymentsRemained,
                                    "LoanOriginalTotal": le.LoanAmount,
                                    "NextPaymentTotal": le.NextPayment,
                                    "LoanNextPaymentDate": strYYYYMMDDAsDDMMYYYYArray(le.NextPaymentDate).join("/"),
                                    "LoanPigurTotal": le.ArrearsAccountInfo.ArrearsBalance,
                                    "LoanType": (le.IsABalloonLoan === "True") ? 2 : 1,
                                    "NumOfPayments": le.NumOfPayments,
                                    "NumOfInterestPayments": null,
                                    "LastPaymentTotal": null,
                                    "GraceNextPaymentDate": null,
                                    "GraceNextPaymentTotal": null,
                                    "LoanFirstPaymentDate": strYYYYMMDDAsDDMMYYYYArray(le.FirstPaymentDate).join("/"),
                                    "InterestFirstPaymentDate": null
                                }, commonPart);
                            });

                        all.banks.generalVariables.allDataArrLoan.push(...loans);

                        myEmitterLogs(12, loans.length);
                    }
                } catch (e) {
                    console.error(e);
                }
            }

            //"https://start.telebank.co.il/Titan/gatewayAPI/onlineLoans/loansQuery/0003080597"
            //{"LoansQuery":{"LoanDetailsBlock":{"LoanEntry":[{"LoanAccount":"1660015600692376","LoanName":"הלואה לא צמודה ברבית משתנה","NumOfPayments":"30","NumOfPaymentsRemained":"17","NumOfPaymentsMade":"13","EstablishmentDate":"20170907","EstablishmentChannelCode":"03","EstablishmentChannel":"סניף","LoanCurrencyCode":"0","LoanCurrency":"ILS","LoanAmount":15000.00,"InterestTypeCode":"2","LinkageType":"0","LinkageCurrency":"","TotalInterestRate":7.1000,"RefundType":"3","IsABalloonLoan":"False","FirstPaymentDate":"20171008","LastPaymentDate":"20200308","NextPaymentDate":"20181108","PreviousPaymentDate":"20181008","NextPayment":547.16,"PreviousPayment":547.16,"BaseInterestType":"P","BaseInterestRate":1.6000,"EarningsRate":5.5000,"InterestChangeFrequencyType":"","InterestChangeFrequency":"","NextInterestChangeDate":"","PrincipalBalance":8824.45,"PrincipalLinkageBalance":0,"InterestBalance":27.46,"InterestLinkageBalance":0,"PrincipalPaymentDayOfMonth":"8","IsLoanInArrears":"False","IsForeignCurrencyLoanInNISArrears":"False","ArrearsInterest":18.5500,"ArrearsAccountInfo":{"ArrearsAccountID":"1660006200998145","ArrearsBalance":0,"ArrearsInterestBalance":0},"LoanSourceType":"1","LoanBalance":8851.91,"PrepaymentPenaltyFee":68.85,"TotalLoanBalance":8920.76,"FinishDate":"20200308","LoanRefundStatus":"0","EstablishmentValueDate":"20170907","CurrentMonthPayment":547.16,"NumberOfPartialPrepayments":"0","LoanPersonalName":""},{"LoanAccount":"1660015600704455","LoanName":"הלואה לא צמודה ברבית משתנה","NumOfPayments":"26","NumOfPaymentsRemained":"16","NumOfPaymentsMade":"10","EstablishmentDate":"20171221","EstablishmentChannelCode":"03","EstablishmentChannel":"סניף","LoanCurrencyCode":"0","LoanCurrency":"ILS","LoanAmount":30000.00,"InterestTypeCode":"2","LinkageType":"0","LinkageCurrency":"","TotalInterestRate":8.1000,"RefundType":"3","IsABalloonLoan":"False","FirstPaymentDate":"20180105","LastPaymentDate":"20200205","NextPaymentDate":"20181105","PreviousPaymentDate":"20181005","NextPayment":1261.93,"PreviousPayment":1261.93,"BaseInterestType":"P","BaseInterestRate":1.6000,"EarningsRate":6.5000,"InterestChangeFrequencyType":"","InterestChangeFrequency":"","NextInterestChangeDate":"","PrincipalBalance":19078.03,"PrincipalLinkageBalance":0,"InterestBalance":80.44,"InterestLinkageBalance":0,"PrincipalPaymentDayOfMonth":"5","IsLoanInArrears":"False","IsForeignCurrencyLoanInNISArrears":"False","ArrearsInterest":18.5500,"ArrearsAccountInfo":{"ArrearsAccountID":"1660006200108778","ArrearsBalance":0,"ArrearsInterestBalance":0},"LoanSourceType":"1","LoanBalance":19158.47,"PrepaymentPenaltyFee":79.16,"TotalLoanBalance":19237.63,"FinishDate":"20200205","LoanRefundStatus":"0","EstablishmentValueDate":"20171221","CurrentMonthPayment":1261.93,"NumberOfPartialPrepayments":"0","LoanPersonalName":""}]},"Summary":{"CurrentMonthTotalPayment":1809.09,"TotalBalance":28010.38,"CurrentMonthTotalPaymentCurrencyCode":"0","CurrentMonthTotalPaymentCurrency":"ILS","TotalBalanceCurrencyCode":"0","TotalBalanceCurrency":"ILS","SummaryCurrencyCode":"0"},"EndedLoanDetailsBlock":{"EndedLoanEntry":[{"LoanAccount":"1660015600721732","LoanName":"הלואה לא צמודה ברבית משתנה","NumOfPayments":"12","NumOfPaymentsRemained":"0","NumOfPaymentsMade":"12","EstablishmentDate":"20180503","EstablishmentChannelCode":"03","EstablishmentChannel":"סניף","LoanCurrencyCode":"0","LoanCurrency":"ILS","LoanAmount":15000.00,"LoanAmountInNIS":0,"InterestTypeCode":"2","LinkageType":"0","LinkageCurrency":"","TotalInterestRate":8.1000,"RefundType":"3","IsABalloonLoan":"False","FirstPaymentDate":"20180608","LastPaymentDate":"20180727","PreviousPaymentDate":"20180708","BaseInterestType":"P","BaseInterestRate":1.6000,"EarningsRate":6.5000,"InterestChangeFrequencyType":"","InterestChangeFrequency":"","PrincipalPaymentDayOfMonth":"8","ArrearsInterest":18.5500,"LoanSourceType":"1","FinishDate":"20180727","LoanRefundStatus":"3","EstablishmentValueDate":"20180503","EventName":"EV_LoanEnded","LoanPersonalName":""},{"LoanAccount":"1660015600728397","LoanName":"הלואה לא צמודה ברבית משתנה","NumOfPayments":"6","NumOfPaymentsRemained":"0","NumOfPaymentsMade":"6","EstablishmentDate":"20180617","EstablishmentChannelCode":"03","EstablishmentChannel":"סניף","LoanCurrencyCode":"0","LoanCurrency":"ILS","LoanAmount":6000.00,"LoanAmountInNIS":0,"InterestTypeCode":"2","LinkageType":"0","LinkageCurrency":"","TotalInterestRate":8.6000,"RefundType":"3","IsABalloonLoan":"False","FirstPaymentDate":"20180708","LastPaymentDate":"20180727","PreviousPaymentDate":"20180708","BaseInterestType":"P","BaseInterestRate":1.6000,"EarningsRate":7.0000,"InterestChangeFrequencyType":"","InterestChangeFrequency":"","PrincipalPaymentDayOfMonth":"8","ArrearsInterest":18.5500,"LoanSourceType":"1","FinishDate":"20180727","LoanRefundStatus":"3","EstablishmentValueDate":"20180614","EventName":"EV_LoanEnded","LoanPersonalName":""}]},"CurrentTimestamp":1540396724888}}
        }

        async function processAllDeposits() {
            myEmitterLogs(17);

            all.banks.generalVariables.allDataArrDeposit = [];
            companyIdx = 0;
            for (; companyIdx < companiesWithAccountsList.length; companyIdx++) {
                accountIdx = 0;
                for (; accountIdx < companiesWithAccountsList[companyIdx].accounts.length; accountIdx++) {
                    await processAccountDeposits();
                }
            }

            await sendResults();

            async function sendResults() {
                let retry;
                do {
                    try {
                        await all.banks.core.services.sendPikdonot(all.banks.generalVariables.allDataArrDeposit);
                        retry = false;
                    } catch (exc) {
                        console.error(exc);
                        retry = (exc === 'discard');
                    }
                } while (retry);
            }

            async function processAccountDeposits() {
                try {
                    const acc = companiesWithAccountsList[companyIdx].accounts[accountIdx];

                    myEmitterLogs(33, [acc.AccountInfo.BranchID, acc.NewAccountInfo.AccountID].join('-')); //change Acc

                    const resp = await all.banks.core.services.httpReq(
                        "https://start.telebank.co.il/Titan/gatewayAPI/deposits/depositsDetails"
                        + "/" + acc.NewAccountInfo.AccountID
                        + "/1",
                        'GET', null, false, false);

                    if (resp && resp.DepositsDetails && resp.DepositsDetails.DepositAccountBlock
                        && Array.isArray(resp.DepositsDetails.DepositAccountBlock.DepositAccountEntry)) {
                        const commonPart = {
                            'TargetId': all.banks.accountDetails.bank.targetId,
                            'Token': all.banks.accountDetails.bank.token,
                            'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),//parseInt(acc.NewAccountInfo.BankID),
                            'BranchNumber': parseInt(acc.AccountInfo.BranchID/*acc.NewAccountInfo.BranchID*/),
                            'AccountNumber': parseInt(acc.NewAccountInfo.AccountID),
                            'ExtractDate': new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                            'ExporterId': all.banks.spiderConfig.spiderId
                        };

                        const deposits = resp.DepositsDetails.DepositAccountBlock.DepositAccountEntry
                            .filter(dae => dae.DepositDetailsBlock && Array.isArray(dae.DepositDetailsBlock.DepositEntry)
                                && dae.DepositDetailsBlock.DepositEntry.length)
                            .reduce((acmltr, dae) => {
                                const firstDetNtry = dae.DepositDetailsBlock.DepositEntry[0];
                                const depositNumber = (dae.TermNewAccountNumber
                                    + ((firstDetNtry.DepositID !== 0) ? firstDetNtry.DepositID : "")
                                ).slice(-9);

                                let depositInterest = null;
                                if (firstDetNtry.RatesPeriodBlock
                                    && Array.isArray(firstDetNtry.RatesPeriodBlock.RatesPeriodEntry)
                                    && firstDetNtry.RatesPeriodBlock.RatesPeriodEntry.length) {
                                    const firstRPE = firstDetNtry.RatesPeriodBlock.RatesPeriodEntry[0];
                                    if (firstRPE.MainTrackFixedRate !== 0) {
                                        depositInterest = firstRPE.MainTrackFixedRate;
                                    } else {
                                        depositInterest = firstRPE.MinimalInterestForCalc;

                                    }
                                }

                                const depDetails = dae.DepositDetailsBlock.DepositEntry
                                    .map((daeDet) => {
                                        return Object.assign({
                                            "TypeName": daeDet.ProductLongName,
                                            "DepositTotal": daeDet.PlacementAmount,
                                            "DepositAsTotal": daeDet.CurrentValue,
                                            "DueDate": strYYYYMMDDAsDDMMYYYYArray(daeDet.MaturityDate).join("/"),
                                            "DepositDate": strYYYYMMDDAsDDMMYYYYArray(daeDet.PlacementDate).join("/"),
                                            "DepositExistStation": strYYYYMMDDAsDDMMYYYYArray(daeDet.AvailabilityDate).join("/"),
                                            "DepositNumber": depositNumber,
                                            "DepositInterest": depositInterest
                                        }, commonPart);
                                    });

                                acmltr.push(...depDetails);

                                return acmltr;
                            }, []);

                        all.banks.generalVariables.allDataArrDeposit.push(...deposits);

                        myEmitterLogs(12, deposits.length);
                    }
                } catch (e) {
                    console.error(e);
                }
            }

            //"https://start.telebank.co.il/Titan/gatewayAPI/deposits/depositsDetails/0069811271/1"
            //??
        }

        async function processAllDueChecks() {
            myEmitterLogs(19);

            const today = new Date();
            const dateFromYYYYMMDD = dateAsDDMMYYYYArray(today).reverse().join('');
            today.setMonth(today.getMonth() + 36);
            const dateToYYYYMMDD = dateAsDDMMYYYYArray(today).reverse().join('');
            ;

            all.banks.generalVariables.allDataArrDueChecks = [];
            companyIdx = 0;
            for (; companyIdx < companiesWithAccountsList.length; companyIdx++) {
                accountIdx = 0;
                for (; accountIdx < companiesWithAccountsList[companyIdx].accounts.length; accountIdx++) {
                    await processAccountDueChecks();
                }
            }

            await sendResults();

            async function sendResults() {
                let retry;
                do {
                    try {
                        await all.banks.core.services.sendDueChecks(all.banks.generalVariables.allDataArrDueChecks);
                        retry = false;
                    } catch (exc) {
                        console.error(exc);
                        retry = (exc === 'discard');
                    }
                } while (retry);
            }

            async function processAccountDueChecks() {
                try {
                    const acc = companiesWithAccountsList[companyIdx].accounts[accountIdx];

                    myEmitterLogs(33, [acc.AccountInfo.BranchID, acc.NewAccountInfo.AccountID].join('-')); //change Acc

                    const resp = await all.banks.core.services.httpReq(
                        "https://start.telebank.co.il/Titan/gatewayAPI/checks/details",
                        'POST', {
                            AccountNumber: acc.NewAccountInfo.AccountID,
                            CheckType: "PostponedChecks",
                            DiscountCheckFlag: "True",
                            LastTransactionFlag: "False",
                            PostponedCheckFlag: "True",
                            SecurityCheckFlag: "True",
                            FromDate: dateFromYYYYMMDD,
                            ToDate: dateToYYYYMMDD
                        }, false, false);
                    if (resp && resp.ChecksDetails && resp.ChecksDetails.ChecksDetailsBlock
                        && Array.isArray(resp.ChecksDetails.ChecksDetailsBlock.CheckEntry)) {
                        const commonPart = {
                            'TargetId': all.banks.accountDetails.bank.targetId,
                            'Token': all.banks.accountDetails.bank.token,
                            'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),//parseInt(acc.NewAccountInfo.BankID),
                            'BranchNumber': parseInt(acc.AccountInfo.BranchID/*acc.NewAccountInfo.BranchID*/),
                            'AccountNumber': parseInt(acc.NewAccountInfo.AccountID),
                            'ExtractDate': new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                            'ExporterId': all.banks.spiderConfig.spiderId
                        };

                        const checks = resp.ChecksDetails.ChecksDetailsBlock.CheckEntry
                            .map(ce => {
                                return Object.assign({
                                    "CheckNumber": ce.CheckNumber,
                                    "CheckDescription": ce.CheckTypeDescription,
                                    "DepositeDate": strYYYYMMDDAsDDMMYYYYArray(ce.DepositDate).join("/"),
                                    "DueDate": strYYYYMMDDAsDDMMYYYYArray(ce.CheckValueDate).join("/"),
                                    "CheckTotal": ce.CheckAmount,
                                    "CheckBankNumber": ce.CheckBankNumber,
                                    "CheckAccountNumber": ce.CheckAccountNumber,
                                    "CheckBranchNumber": ce.CheckBranchNumber
                                }, commonPart);
                            });

                        all.banks.generalVariables.allDataArrDueChecks.push(...checks);

                        myEmitterLogs(12, checks.length);
                    }

                } catch (e) {
                    console.error(e);
                }
            }

            //"https://start.telebank.co.il/Titan/gatewayAPI/checks/details"
            //POST
//                AccountNumber: "0064998594"
//                CheckType: "PostponedChecks"
//                DiscountCheckFlag: "False"
//                FromDate: "20181024"
//                LastTransactionFlag: "False"
//                PostponedCheckFlag: "True"
//                SecurityCheckFlag: "True"
//                ToDate: "20181123"
            //??
        }
    }

    async function processAllMatah() {
        let dateFromYYYYMMDD, dateToYYYYMMDD,
            currAccountsLinked, linkedAccIdx;
        if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
            myEmitterLogs(34);
            dateFromYYYYMMDD = dateAsDDMMYYYYArray(all.banks.accountDetails.dateFromMatah).reverse().join('');
            dateToYYYYMMDD = dateAsDDMMYYYYArray(all.banks.accountDetails.dateToMatah).reverse().join('');

            all.banks.generalVariables.allDataArrMatah = {
                "ExporterId": all.banks.spiderConfig.spiderId,
                "BankData": [{
                    "TargetId": all.banks.accountDetails.bank.targetId,
                    "Token": all.banks.accountDetails.bank.token,
                    "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                    "Account": []
                }]
            };

            companyIdx = 0;
            for (; companyIdx < companiesWithAccountsList.length; companyIdx++) {
                accountIdx = 0;
                for (; accountIdx < companiesWithAccountsList[companyIdx].accounts.length; accountIdx++) {
                    currAccountsLinked = await getLinkedMatahAccounts();
                    if (all.banks.accountDetails.deleted_account_ids.length) {
                        currAccountsLinked = currAccountsLinked.filter(item => !(all.banks.accountDetails.deleted_account_ids.some(it => item.NewAccountInfo.AccountID.includes(it.toString()))))
                    }
                    linkedAccIdx = 0;
                    for (; linkedAccIdx < currAccountsLinked.length; linkedAccIdx++) {
                        await processAccountMatah();
                    }
                }
            }

            await sendResults();
        }

        async function sendResults() {
            let retry;
            do {
                try {
                    await all.banks.core.services.sendOsh(all.banks.generalVariables.allDataArrMatah, true);
                    retry = false;
                } catch (exc) {
                    console.error(exc);
                    retry = (exc === 'discard');
                }
            } while (retry);
        }

        async function getLinkedMatahAccounts() {
            try {
                const acc = companiesWithAccountsList[companyIdx].accounts[accountIdx];
                myEmitterLogs(35, [acc.AccountInfo.BranchID, acc.NewAccountInfo.AccountID].join('-')); //change Acc

                const resp = await all.banks.core.services.httpReq(
                    "https://start.telebank.co.il/Titan/gatewayAPI/foreign/CALinkedAccountsDetails",
                    'POST', {
                        "AccountsBlock": {
                            "AccountEntry": [
                                {
                                    "AccountNumber": acc.NewAccountInfo.AccountID
                                }
                            ]
                        }
                    }, false, false);
                if (resp && resp.CALinkedAccountsDetails && resp.CALinkedAccountsDetails.MainAccountBlock
                    && Array.isArray(resp.CALinkedAccountsDetails.MainAccountBlock.MainAccountEntry)
                    && resp.CALinkedAccountsDetails.MainAccountBlock.MainAccountEntry.length > 0
                    && resp.CALinkedAccountsDetails.MainAccountBlock.MainAccountEntry[0].LinkedAccountsBlock
                    && resp.CALinkedAccountsDetails.MainAccountBlock.MainAccountEntry[0].LinkedAccountsBlock.LinkedAccountEntry) {

                    return resp.CALinkedAccountsDetails.MainAccountBlock.MainAccountEntry[0].LinkedAccountsBlock.LinkedAccountEntry;
                }
            } catch (e) {
                console.error(e);
                writeLog(e);
            }

            return [];
        }

        async function processAccountMatah() {
            const acc = companiesWithAccountsList[companyIdx].accounts[accountIdx];
            const matahAcc = currAccountsLinked[linkedAccIdx];

            myEmitterLogs(35, [matahAcc.AccountInfo.BranchID, matahAcc.NewAccountInfo.AccountID].join('-')); //change Acc

            all.banks.generalVariables.allDataArrMatah.BankData[0].Account.push({
                'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                'AccountNumber': parseInt(matahAcc.NewAccountInfo.AccountID),
                'BranchNumber': parseInt(matahAcc.AccountInfo.BranchID/*matahAcc.NewAccountInfo.BranchID*/),
                'Balance': matahAcc.AccountBalance,
                'AccountCredit': null,
                "BankAccountTypeId": parseInt(acc.NewAccountInfo.AccountID),
                "CurrencyId": all.banks.core.services.getTypeCurrencyAll(matahAcc.AccountCurrencySymbol, true),
                "DataRow": await processMatahTransactions()
            });
        }

        async function processMatahTransactions() {
            try {
                const acc = companiesWithAccountsList[companyIdx].accounts[accountIdx];
                const matahAcc = currAccountsLinked[linkedAccIdx];
                const transactions = await all.banks.core.services.httpReq(
                    "https://start.telebank.co.il/Titan/gatewayAPI/foreignLastTransactions/"
                    + acc.NewAccountInfo.AccountID
                    + "/ByDate?IsCategoryDescCode=True&IsTransactionDetails=True&IsEventNames=True"
                    + "&ForeignBankID=" + matahAcc.NewAccountInfo.BankID
                    + "&ForeignBranchID=" + matahAcc.NewAccountInfo.BranchID
                    + "&ForeignAccountID=" + matahAcc.NewAccountInfo.AccountID
                    + "&FromDate=" + dateFromYYYYMMDD
                    + "&ToDate=" + dateToYYYYMMDD,
                    'GET', null, false, false);
                const collected = [];
                if (transactions && transactions.FALastTransactions) {
                    if (Array.isArray(transactions.FALastTransactions.OperationEntry)) {
                        for (let ntryIdx = 0; ntryIdx < transactions.FALastTransactions.OperationEntry.length; ntryIdx++) {
                            const oe = transactions.FALastTransactions.OperationEntry[ntryIdx];
                            collected.push(await processMatahTransactionEntry(oe));
                        }
                    }
                    if (transactions.FALastTransactions.FutureTransactionsBlock
                        && Array.isArray(transactions.FALastTransactions.FutureTransactionsBlock.FutureTransactionEntry)) {
                        for (let ntryIdx = 0; ntryIdx < transactions.FALastTransactions.FutureTransactionsBlock.FutureTransactionEntry.length; ntryIdx++) {
                            const oe = transactions.FALastTransactions.FutureTransactionsBlock.FutureTransactionEntry[ntryIdx];
                            collected.push(await processMatahTransactionEntry(oe));
                        }
                    }
                }

                myEmitterLogs(12, collected.length);

                return collected;

            } catch (e) {
                console.error(e);
                writeLog(e);
                return [];
            }
        }

        async function processMatahTransactionEntry(opEntry) {
            const ntry = {
                "Asmachta": opEntry.OperationNumber + '' + opEntry.BranchTreasuryNumber.replace(/\D/g, ""),
                "TransDesc": opEntry.OperationDescriptionToDisplay.replace(/\s\s+/g, " "),
                "ValueDate": strYYYYMMDDAsDDMMYYYYArray(opEntry.OperationDate).join("/"),
                "TransactionType": opEntry.OperationAmount < 0 ? 0 : 1,
                "TransTotal": Math.abs(opEntry.OperationAmount),
                "Balance": opEntry.BalanceAfterOperation,
                "urnFromBank": opEntry.Urn,
                "operationCode": opEntry.OperationCode,
                "operationNumber": opEntry.OperationNumber,
                "operationOrder": opEntry.OperationOrder,
                "IsDaily": 0,
                "imgs": null
            };

            switch (opEntry.OperationDetailsServiceName) {
//                case "ChecksDetails":
//                    if (all.banks.accountDetails.checks === true) {
//                        ntry["imgs"] = await loadCheck(opEntry);
//                    }
//                    break;
//
                case "TransactionDetails":
                    ntry["DepositeTransferData"] = await loadMatahTransactionDetails(opEntry);
                    break;

//                case "CreditIncomingTransferDetails":
//                    ntry["DepositeTransferData"] = await loadCreditIncomingTransferDetails(opEntry);
//                    break;
//
//                case "DebitIncomingTransferDetails":
//                    ntry["DepositeTransferData"] = await loadDebitIncomingTransferDetails(opEntry);
//                    break;
//
//                case "OutgoingTransferDetails":
//                    ntry["DepositeTransferData"] = await loadOutgoingTransferDetails(opEntry);
//                    break;

                case "SwiftTransferDetails":
                    ntry["DepositeTransferData"] = await loadMatahSwiftTransferDetails(opEntry);
                    break;

            }

            return ntry;
        }

        async function loadMatahTransactionDetails(reqSource) {
            try {
                const acc = companiesWithAccountsList[companyIdx].accounts[accountIdx];
                const matahAcc = currAccountsLinked[linkedAccIdx];
                const resp = await all.banks.core.services.httpReq(
                    "https://start.telebank.co.il/Titan/gatewayAPI/transactionDetails"
                    + "/" + acc.NewAccountInfo.AccountID
                    + "/" + reqSource.OperationNumber
                    + "/"
                    + "?NewForeignAccountInfoBankID=" + matahAcc.NewAccountInfo.BankID
                    + "&NewForeignAccountInfoBranchID=" + matahAcc.NewAccountInfo.BranchID
                    + "&NewForeignAccountInfoControlDigits="
                    + "&NewForeignAccountInfoAccountID=" + matahAcc.NewAccountInfo.AccountID,
                    'GET', null, false, false);
                if (resp && resp.TransactionDetails) {
                    const transDet = resp.TransactionDetails;
                    return [{
                        "DepositeTransferDate": strYYYYMMDDAsDDMMYYYYArray(reqSource.OperationDate).join("/"),
                        "BankTransferNumber": parseInt(transDet.BeneficiaryBankNumber),
                        "BranchTransferNumber": parseInt(transDet.BeneficiaryBranchNumber),
                        "AccountTransferNumber": parseInt(transDet.BeneficiaryAccountNumber),
                        "NamePayerTransfer": transDet.BeneficiaryAccountName,
                        "DetailsTransfer": transDet.Comments,
                        "TransferTotal": reqSource.OperationAmount
                    }];
                }
            } catch (e) {
                console.error(e);
                writeLog(e);
                return [];
            }
        }

        async function loadMatahSwiftTransferDetails(reqSource) {
            try {
                const acc = companiesWithAccountsList[companyIdx].accounts[accountIdx];
                const matahAcc = currAccountsLinked[linkedAccIdx];
                const resp = await all.banks.core.services.httpReq(
                    "https://start.telebank.co.il/Titan/gatewayAPI/swiftTransferDetails"
                    + "/" + acc.NewAccountInfo.AccountID
                    + "/" + reqSource.Urn
                    + "/?TransactionCode=" + reqSource.OperationCode
                    + "&NewForeignAccountInfoBankID=" + matahAcc.NewAccountInfo.BankID
                    + "&NewForeignAccountInfoBranchID=" + matahAcc.NewAccountInfo.BranchID
                    + "&NewForeignAccountInfoAccountID=" + matahAcc.NewAccountInfo.AccountID,
                    'GET', null, false, false);
                if (resp && resp.SwiftTransferDetails && resp.SwiftTransferDetails.SwiftMessage
                    && Array.isArray(resp.SwiftTransferDetails.SwiftMessage.BlockEntry)) {

                    const messageContent = resp.SwiftTransferDetails.SwiftMessage.BlockEntry
                        .reduce((acmltr, be) => {
                            if (Array.isArray(be.MessageLine)) {
                                const linesFrmtd = be.MessageLine.map(ln => ['<p>', ln, '</p>'].join(""));
                                acmltr.push(...linesFrmtd);
                            }
                            return acmltr;
                        }, [])
                        .join("");

                    return [{
                        "DepositeTransferDate": strYYYYMMDDAsDDMMYYYYArray(reqSource.OperationDate).join("/"),
                        "BankTransferNumber": null,
                        "BranchTransferNumber": null,
                        "AccountTransferNumber": null,
                        "NamePayerTransfer": null,
                        "DetailsTransfer": [
                            '<div class="swiftCaseContent">',
                            messageContent,
                            '</div>'
                        ].join(""),
                        "TransferTotal": reqSource.OperationAmount
                    }];
                }
            } catch (e) {
                console.error(e);
                writeLog(e);
                return [];
            }
        }

    }

    return discountAsakimPlusNew;
}();
