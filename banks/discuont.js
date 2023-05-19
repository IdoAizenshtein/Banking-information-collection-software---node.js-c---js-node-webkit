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

all.banks.accounts.discuont = function () {
    var discuont = {};
    discuont.login = async function () {
        discuont.accountNow = 0;
        discuont.accArr = [];
        discuont.matah = false;
        discuont.arrMonth = [];

        discuont.globalHeaders = {'UUID': all.banks.core.services.uuidv4()};

        for (var i = 0; i < all.banks.accountDetails.ccardMonth; i++) {
            var dateMonth = new Date(new Date().getFullYear(), new Date().getMonth() - i, 1);
            discuont.arrMonth.push(("0" + (dateMonth.getMonth() + 1)).slice(-2) + '' + dateMonth.getFullYear().toString())
        }

        if (parseFloat(all.banks.accountDetails.bank.BankNumber) == 11) {
            all.banks.accounts.discuont.typeBank = 'd';
        }
        if (parseFloat(all.banks.accountDetails.bank.BankNumber) == 17) {
            all.banks.accounts.discuont.typeBank = 'm';
        }
        // await all.banks.core.services.httpReq('https://start.telebank.co.il/LoginPages/Logon?multilang=he&t=P&pagekey=home&bank=' + all.banks.accounts.discuont.typeBank, 'GET', null, false, false);
        // let response = await all.banks.core.services.httpReq('https://start.telebank.co.il/LoginPages/Logon?multilang=he&t=P&pagekey=home&bank=' + all.banks.accounts.discuont.typeBank, 'GET', null, false, false);
        let response = await all.banks.core.services.httpReq('https://start.telebank.co.il/login/?multilang=he&bank=' + all.banks.accounts.discuont.typeBank + '&t=p', 'GET', null, false, false);
        var dataRes = all.banks.core.services.parseHtml(response);
        win.cookies.getAll({}, function (cool) {
            cool.forEach(function (v) {
                document.cookie = v.name + "=" + v.value + ";";
            })
            loginService();
        })


        function AddLeadingZerows(theText, numOfZerows2Add) {
            if (theText != null) {
                for (var index = theText.length; index < numOfZerows2Add; index++)
                    theText = "0" + theText;
                return (theText);
            }
        }

        function loginService() {
            all.banks.accountDetails.bank.username = all.banks.accountDetails.bank.username.slice(0, 10);
            all.banks.accountDetails.bank.password = all.banks.accountDetails.bank.password.slice(0, 14);
            all.banks.accountDetails.bank.autoCode = all.banks.accountDetails.bank.autoCode.slice(0, 14);

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
                if (parseFloat(all.banks.accountDetails.bank.BankNumber) == 11) {
                    bankNum = "0"
                } else if (parseFloat(all.banks.accountDetails.bank.BankNumber) == 17) {
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
            var tzPassword = all.banks.accountDetails.bank.password;
            var otpnumVal = dataRes.find("input#otpnum").val();
            var aidnumVal = all.banks.accountDetails.bank.autoCode;
            var username = dataRes.find("input[name='username']").val();
            var aidtype = 'aid';//dataRes.find("input[name='aidtype']").val();
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
            const appName = "bizibox" // WEB";
            const caller = "Internet" // "Other";
            $.ajax({
                url: "https://start.telebank.co.il/Lobby/gatewayAPI/verification/getInfo",
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    "Application": appName, // "WEB",
                    "Caller": caller, // "Internet",
                    "Bank": all.banks.accounts.discuont.typeBank,
                    "Lang": "he",
                    "CustType": "private",
                    "Source": 1
                }),
                cache: false,
                headers: discuont.globalHeaders,
                success: function (response, status, xhr) {
                    try {
                        var e = response.GetVerificationInfo.Key;
                        // if (resKey === "undefined")
                        //     throw "no pk";
                        const A = "-----BEGIN PUBLIC KEY-----";
                        var k = "-----END PUBLIC KEY-----";
                        // e = key
                        // t = value of pass or aid
                        e = -1 === (e = -1 === e.indexOf(A) ? A + e : e).indexOf(k) ? e + k : e;
                        var r = forge.pki.publicKeyFromPem(e);
                        all.banks.accountDetails.bank.password = forge.util.encode64(r.encrypt(passwdValue))
                        all.banks.accountDetails.bank.autoCode = forge.util.encode64(r.encrypt(aidnumVal))
                        username = custIdGen;
                        if (otpnum != null) {
                            aidvalue = otpnum;
                            var requestTimeOut = 50000;
                        } else {
                            // aidvalue = forge.util.encode64(k.encrypt(aidnum));
                            var requestTimeOut = 30000;
                        }
                        sendAuth(requestTimeOut);
                    } catch (e) {
                        debugger;
                    }
                },
                error: function (error) {
                    debugger;
                }
            });

            function sendAuth(requestTimeOut) {
                var custIdGen = username;
//				var mi6MD5 = digestsEncoding.MD5(custIdGen, digestsEncoding.outputTypes.Hex);
//				var mi6Cookie = 'mi6=' + mi6MD5 + '; path=/';
//				document.cookie = mi6Cookie;
                if (!requestTimeOut) {
                    requestTimeOut = 30000;
                }
                var data = {
                    Application: appName, // 'WEB',
                    Bank: all.banks.accounts.discuont.typeBank,
                    Caller: caller, //'Internet',
                    CustType: 'private',
                    Lang: 'he',
                    Password: all.banks.accountDetails.bank.password,
                    PlatformType: 'WEB',
                    ThirdIdentifier: all.banks.accountDetails.bank.autoCode,
                    ThirdIdentifierType: aidtype,
                    Uid: custIdGen,
                }
                all.banks.core.services.httpReq("https://start.telebank.co.il/Lobby/gatewayAPI/login", 'POST', data, false, false)
                    .then(function (data) {
//					if ($(data).find(".msghdr_green").length && $(data).find(".msghdr_green").text().indexOf('בהצלחה') !== -1) {
//						all.banks.accounts.discuont.loadData();
//					}
//					else if ($(data).find(".msghdr_red").length && $(data).find(".msghdr_red").text().indexOf('נכשל') !== -1) {
//						myEmitterLogs(5);
//					}
//					else {
//						myEmitterLogs(8);
//					}

                        if (!data.Login || data.Login.Status !== 'SUCCESS') {
                            myEmitterLogs(5);
                        } else {
                            document.cookie = 'mi6=' + data.Login.MI6 + '; path=/';
                            all.banks.accounts.discuont.loadData();
                        }
                    })
                    .fail(function (error, resErr, urlParam) {
                        var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                        all.banks.core.services.errorLog(logErr)
                    });
            }
        }
    }
    discuont.sendOshCtrl = function (matah) {
        if (!matah) {
            var data = all.banks.generalVariables.allDataArr;
        } else {
            var data = all.banks.generalVariables.allDataArrMatah;
        }


        all.banks.core.services.sendOsh(data, matah)
            .then(function (arr) {
                if (all.banks.accountDetails.ccardMonth > 0) {
                    all.banks.accountDetails.ccardMonth = -1;
                    myEmitterLogs(14);
                    discuont.accountNow = 0;
                    all.banks.accounts.discuont.changeAccAshrai();
                } else if (all.banks.accountDetails.IND_NILVIM > 0) {
                    all.banks.accountDetails.IND_NILVIM = -1;
                    discuont.accountNow = 0;
                    myEmitterLogs(21);
                    if (all.banks.accounts.discuont.lengthAcc > 0) {
                        all.banks.accounts.discuont.changeAccLoan("loadLoan");
                    } else {
                        all.banks.accounts.discuont.loadaccountDetailsLoan("loadLoan");
                    }
                } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                    all.banks.accountDetails.MATAH_DAY_TO_RUN = -1;
                    discuont.accountNow = 0;
                    discuont.matah = true;
                    myEmitterLogs(34);
                    discuont.changeAcc(discuont.matah);
                } else {
                    discuont.logOut();
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.discuont.sendOshCtrl(matah)
                }
            })
    }
    discuont.sendChecksCtrl = function (formData) {
        all.banks.core.services.sendChecks(formData)
            .then(function (arr) {
                all.banks.generalVariables.numChecksDrawn = all.banks.generalVariables.numChecksDrawn + 1;
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.discuont.sendChecksCtrl(formData)
                }
            })
    }
    discuont.sendCardsCtrl = function () {
        all.banks.core.services.sendCards(all.banks.generalVariables.allDataArrAshrai)
            .then(function (arr) {
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
                }
                if (all.banks.accountDetails.IND_NILVIM > 0) {
                    all.banks.accountDetails.IND_NILVIM = -1;
                    discuont.accountNow = 0;
                    myEmitterLogs(21);
                    if (all.banks.accounts.discuont.lengthAcc > 0) {
                        all.banks.accounts.discuont.changeAccLoan("loadLoan");
                    } else {
                        all.banks.accounts.discuont.loadaccountDetailsLoan("loadLoan");
                    }
                } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                    all.banks.accountDetails.MATAH_DAY_TO_RUN = -1;
                    discuont.accountNow = 0;
                    discuont.matah = true;
                    myEmitterLogs(34);
                    discuont.changeAcc(discuont.matah);
                } else {
                    discuont.logOut();
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.discuont.sendCardsCtrl();
                }
            })
    }
    discuont.sendLoanCtrl = function () {
        all.banks.core.services.sendLoan(all.banks.generalVariables.allDataArrLoan)
            .then(function (arr) {
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
                }
                discuont.accountNow = 0;
                myEmitterLogs(17);
                if (all.banks.accounts.discuont.lengthAcc > 0) {
                    all.banks.accounts.discuont.changeAccLoan("loadDeposite");
                } else {
                    all.banks.accounts.discuont.loadaccountDetailsLoan("loadDeposite");
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    discuont.sendLoanCtrl()
                }
            })
    }
    discuont.sendDepositCtrl = function () {
        all.banks.core.services.sendPikdonot(all.banks.generalVariables.allDataArrDeposit)
            .then(function (arr) {
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
                }
                discuont.accountNow = 0;
                myEmitterLogs(19);
                if (all.banks.accounts.discuont.lengthAcc > 0) {
                    all.banks.accounts.discuont.changeAccLoan("loadDueChecks");
                } else {
                    all.banks.accounts.discuont.loadaccountDetailsLoan("loadDueChecks");
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    discuont.sendDepositCtrl()
                }
            })
    }
    discuont.sendDeuChecksCtrl = function () {
        all.banks.core.services.sendDueChecks(all.banks.generalVariables.allDataArrDueChecks)
            .then(function (arr) {
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
                }
                discuont.accountNow = 0;
                myEmitterLogs(24);
                if (all.banks.accounts.discuont.lengthAcc > 0) {
                    all.banks.accounts.discuont.changeAccLoan("loadStandingOrder");
                } else {
                    all.banks.accounts.discuont.loadaccountDetailsLoan("loadStandingOrder");
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    discuont.sendDeuChecksCtrl()
                }
            })
    }
    discuont.sendStandingOrdersCtrl = function (data) {
        all.banks.core.services.sendStandingOrders(all.banks.generalVariables.allDataArrStandingOrders)
            .then(function (arr) {
                if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                    all.banks.accountDetails.MATAH_DAY_TO_RUN = -1;
                    all.banks.accountDetails.IND_NILVIM = -1;
                    discuont.accountNow = 0;
                    myEmitterLogs(34);
                    discuont.matah = true;
                    discuont.changeAcc(discuont.matah);
                } else {
                    discuont.logOut();
                }

            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    discuont.sendStandingOrdersCtrl();
                }
            })
    }
    discuont.loadData = function () {
        all.banks.core.services.httpReq("https://start.telebank.co.il/LoginPages/Logon", 'GET', null, false, false)
            .then(function (res) {
                var dataRes = all.banks.core.services.parseHtml(res);
                if (dataRes.find(".tzId2_div").length && dataRes.find(".tzId2_div").text().indexOf('סיסמה חדשה') !== -1) {
                    myEmitterLogs(6);
                } else {
                    discuont.login2();
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    }
    discuont.login2 = async function () {
        await all.banks.core.services.httpReq("https://start.telebank.co.il/apollo/retail/#/MY_ACCOUNT_HOMEPAGE", 'GET', null, false, false);
        if (!all.banks.openBankPage) {
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
            all.banks.generalVariables.allDataArrAshrai = [];
            all.banks.generalVariables.allDataArrLoan = [];
            all.banks.generalVariables.allDataArrDeposit = [];
            all.banks.generalVariables.allDataArrDueChecks = [];
            all.banks.generalVariables.allDataArrStandingOrders = [];
            all.banks.accounts.discuont.datebackslesh = all.banks.accountDetails.dateFrom.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2);
            all.banks.accounts.discuont.datebacksleshTo = all.banks.accountDetails.dateTo.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2);
            all.banks.accounts.discuontAsakimPlus.datebacksleshMatah = all.banks.accountDetails.dateFromMatah.getFullYear() + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2);
            all.banks.accounts.discuontAsakimPlus.datebacksleshToMatah = (all.banks.accountDetails.dateToMatah.getFullYear()) + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2);
            discuont.login6();
        } else {
            all.banks.core.services.openBankPage("https://start.telebank.co.il/apollo/retail/#/MY_ACCOUNT_HOMEPAGE");
        }
    }
    discuont.login6 = async function (accid, discount_token, sn) {
        var res = await all.banks.core.services.httpReq("https://start.telebank.co.il/Titan/gatewayAPI/userAccountsData", 'GET', null, false, false);
        try {
            if (all.banks.accountDetails.deleted_account_ids.length) {
                const UserAccounts = res.UserAccountsData.UserAccounts.filter(item => !(all.banks.accountDetails.deleted_account_ids.some(it => item.NewAccountInfo.AccountID.includes(it.toString()))))
                if (UserAccounts.length) {
                    res.UserAccountsData.UserAccounts = UserAccounts;
                }
            }
            all.banks.accounts.discuont.lengthAcc = res.UserAccountsData.UserAccounts.length;
            res.UserAccountsData.UserAccounts.forEach(function (a, i) {
                var obj = {
                    numberAcc: a.NewAccountInfo.AccountID,
                    AccountNumberMD5: a.AccountNumberMD5,
                    md5: digestsEncoding.MD5(a.NewAccountInfo.BankID + a.NewAccountInfo.BranchID + a.NewAccountInfo.ControlDigits + a.NewAccountInfo.AccountID)
                };
                all.banks.accounts.discuont.accArr.push(obj);
                if (res.UserAccountsData.UserAccounts.length == i + 1) {
                    discuont.loadResources();
                }
            })
        } catch (err) {
            all.banks.core.services.errorLog(err)
        }
    }
    discuont.loadResources = async function () {
        function keep() {
            return new Promise(resolve => {
                $.ajax({
                    url: "https://start.telebank.co.il/Trade/keepalive.php",
                    data: null,
                    xhrFields: {
                        withCredentials: true
                    },
                    method: "POST",
                    contentType: "text/x-www-form-urlencoded"
                }).done(function () {
                    resolve(true);
                }).fail(() => {
                    resolve(true);
                })
            });
        }

        document.cookie = "custEnable=1; path=/";
        document.cookie = "IV_JCT=%2FTrade; path=/";
        win.cookies.set({
            url: 'https://start.telebank.co.il',
            name: "custEnable",
            domain: 'start.telebank.co.il',
            value: "1"
        })
        win.cookies.set({
            url: 'https://start.telebank.co.il',
            name: "IV_JCT",
            domain: 'start.telebank.co.il',
            value: "%2FTrade"
        })
        await all.banks.core.services.httpReq("https://start.telebank.co.il/Retail/Telebank/Coexistance/ASP/CoexPortal.asp", 'GET', null, false, false);
        await all.banks.core.services.httpReq("https://start.telebank.co.il/Titan/gatewayAPI/initWebActivity/?WebID=41420341420320170924052520", 'GET', null, false, false);
        try {
            await all.banks.core.services.httpReq("https://start.telebank.co.il/Trade/asprip/index.php/onlineBankingTheme/dummy_method?accIdx="
                + all.banks.accounts.discuont.accArr[discuont.accountNow].AccountNumberMD5 + "&site=Retail", 'GET', null, false, false);
        } catch (e) {
            writeLog("Failure in dummy_method. Seems recoverable, so will continue [" + e + "]");
        }

        // try {
        //     await all.banks.core.services.httpReq("https://start.telebank.co.il/DiscountInternet/Portal/Init.aspx", 'GET', null, false, false);
        // } catch (e) {
        //
        // }
        document.cookie = "IV_JCT=%2FRetail; path=/";
        win.cookies.set({
            url: 'https://start.telebank.co.il',
            name: "IV_JCT",
            domain: 'start.telebank.co.il',
            value: "%2FRetail"
        })
        await keep();

        if (all.banks.accountDetails.days > 0) {
            all.banks.accounts.discuont.changeAcc();
        } else if (all.banks.accountDetails.ccardMonth > 0) {
            all.banks.accountDetails.ccardMonth = -1;
            myEmitterLogs(14);
            all.banks.accounts.discuont.changeAccAshrai();
        } else if (all.banks.accountDetails.IND_NILVIM > 0) {
            myEmitterLogs(21);
            all.banks.accounts.discuont.changeAccLoan("loadLoan");
        } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
            myEmitterLogs(34);
            discuont.matah = true;
            all.banks.accounts.discuont.changeAcc(discuont.matah);
        } else {
            discuont.logOut();
        }
    }
    discuont.convertDateLocal = function (dateLocal) {
        var dateFormat = "";
        if (dateLocal !== undefined && dateLocal !== null) {
            dateLocal = dateLocal.toString();
            if (dateLocal !== "") {
                dateFormat = dateLocal.substring(4, 6) + "/" + dateLocal.substring(6, 8) + "/" + dateLocal.substring(0, 4);
            }
        }
        return dateFormat;
    }
    discuont.changeAcc = async function (matah) {
//        await all.banks.core.services.httpReq("https://start.telebank.co.il/Trade/asprip/index.php/onlineBankingTheme/dummy_method?accIdx="
//                + all.banks.accounts.discuont.accArr[discuont.accountNow].AccountNumberMD5 + "&site=Retail", 'GET', null, false, false)
        try {
            await all.banks.core.services.httpReq("https://start.telebank.co.il/Trade/asprip/index.php/onlineBankingTheme/dummy_method?accIdx="
                + all.banks.accounts.discuont.accArr[discuont.accountNow].AccountNumberMD5 + "&site=Retail", 'GET', null, false, false);
        } catch (e) {
            writeLog("Failure in dummy_method. Seems recoverable, so will continue [" + e + "]");
        }
        await all.banks.core.services.httpReq("https://start.telebank.co.il/Titan/gatewayAPI/getCurrentTimestamp", 'GET', null, false, false);
        discuont.loadaccountDetails(discuont.matah);
    }
    discuont.loadLoan = function () {
        all.banks.core.services.httpReq("https://start.telebank.co.il/Titan/gatewayAPI/onlineLoans/loansQuery/" + all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc, 'GET', null, false, false)
            .then(function (res) {
                try {
                    if (res.Error == undefined && res.LoansQuery && res.LoansQuery.LoanDetailsBlock && res.LoansQuery.LoanDetailsBlock.LoanEntry) {
                        $(res.LoansQuery.LoanDetailsBlock.LoanEntry).each(function (i, v) {
                            all.banks.generalVariables.allDataArrLoan.push({
                                "TargetId": all.banks.accountDetails.bank.targetId,
                                "Token": all.banks.accountDetails.bank.token,
                                "BankNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BankNumber,
                                "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                "ExporterId": all.banks.spiderConfig.spiderId,
                                "BranchNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BranchNumber,
                                "AccountNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].AccountNumber,
                                "LoanName": v.LoanName,
                                "LoanNumber": v.LoanAccount,
                                "LoanIntrest": v.TotalInterestRate,
                                "LoanFinish": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.LastPaymentDate)),
                                "LoanTotalLeft": v.LoanBalance,
                                "LoanDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.EstablishmentDate)),
                                "PaymentsNumberLeft": v.NumOfPaymentsRemained,
                                "LoanOriginalTotal": v.LoanAmount,
                                "NextPaymentTotal": v.NextPayment,
                                "LoanNextPaymentDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.NextPaymentDate)),
                                "LoanPigurTotal": v.ArrearsAccountInfo.ArrearsBalance,
                                "LoanType": (v.IsABalloonLoan === "True") ? 2 : 1,
                                "NumOfPayments": v.NumOfPayments,
                                "NumOfInterestPayments": null,
                                "LastPaymentTotal": null,
                                "GraceNextPaymentDate": null,
                                "GraceNextPaymentTotal": null,
                                "LoanFirstPaymentDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.FirstPaymentDate)),
                                "InterestFirstPaymentDate": null
                            });
                            if (res.LoansQuery.LoanDetailsBlock.LoanEntry.length == i + 1) {
                                if (all.banks.accounts.discuont.lengthAcc > 0) {
                                    if ((discuont.accountNow + 1) < discuont.lengthAcc) {
                                        discuont.accountNow = discuont.accountNow + 1;
                                        all.banks.accounts.discuont.changeAccLoan("loadLoan");
                                    } else {
                                        discuont.sendLoanCtrl();
                                    }
                                } else {
                                    discuont.sendLoanCtrl();
                                }
                            }
                        });
                    } else {
                        if (all.banks.accounts.discuont.lengthAcc > 0) {
                            if ((discuont.accountNow + 1) < discuont.lengthAcc) {
                                discuont.accountNow = discuont.accountNow + 1;
                                all.banks.accounts.discuont.changeAccLoan("loadLoan");
                            } else {
                                discuont.sendLoanCtrl();
                            }
                        }
                    }

                } catch (e) {
                    discuont.sendLoanCtrl();
                    res = null;
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });

    }
    discuont.loadDueChecks = function () {
        var dateFrom = new Date().getFullYear().toString() + ("0" + (new Date().getMonth() + 1)).slice(-2) + ("0" + (new Date().getDate())).slice(-2);
        var dateToFormat = new Date(new Date().getFullYear(), new Date().getMonth() + 36, new Date().getDate());
        var dateTo = dateToFormat.getFullYear().toString() + ("0" + (dateToFormat.getMonth() + 1)).slice(-2) + ("0" + (dateToFormat.getDate())).slice(-2);
        var data = {
            "AccountNumber": all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc,
            "CheckType": "PostponedChecks",
            "FromDate": dateFrom,
            "ToDate": dateTo,
            "PostponedCheckFlag": "True",
            "SecurityCheckFlag": "True",
            "DiscountCheckFlag": "True",
            "FromAmount": "",
            "ToAmount": "",
            "FromCheckNumber": "",
            "ToCheckNumber": "",
            "OperationBranch": "",
            "LastTransactionFlag": "False",
            "OperationBank": ""
        };
        var url = "https://start.telebank.co.il/Titan/gatewayAPI/checks/details";
        all.banks.core.services.httpReq(url, 'POST', data, false, false)
            .then(function (data) {
                if (!data.Error) {
                    if (data.ChecksDetails.ChecksDetailsBlock.CheckEntry.length) {
                        $(data.ChecksDetails.ChecksDetailsBlock.CheckEntry).each(function (i, v) {
                            all.banks.generalVariables.allDataArrDueChecks.push({
                                "TargetId": all.banks.accountDetails.bank.targetId,
                                "Token": all.banks.accountDetails.bank.token,
                                "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                "ExporterId": all.banks.spiderConfig.spiderId,
                                "BranchNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BranchNumber,
                                "AccountNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].AccountNumber,
                                "CheckNumber": v.CheckNumber,
                                "CheckDescription": v.CheckTypeDescription,
                                "DepositeDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.DepositDate)),
                                "DueDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.CheckValueDate)),
                                "CheckTotal": v.CheckAmount,
                                "CheckBankNumber": v.CheckBankNumber,
                                "CheckAccountNumber": v.CheckAccountNumber,
                                "CheckBranchNumber": v.CheckBranchNumber
                            });
                            if (data.ChecksDetails.ChecksDetailsBlock.CheckEntry.length == i + 1) {
                                if (all.banks.accounts.discuont.lengthAcc > 0) {
                                    if ((discuont.accountNow + 1) < discuont.lengthAcc) {
                                        discuont.accountNow = discuont.accountNow + 1;
                                        all.banks.accounts.discuont.changeAccLoan("loadDueChecks");
                                    } else {
                                        discuont.sendDeuChecksCtrl();
                                    }
                                } else {
                                    discuont.sendDeuChecksCtrl();
                                }
                            }
                        })
                    } else {
                    }
                } else {
                    if (all.banks.accounts.discuont.lengthAcc > 0) {
                        if ((discuont.accountNow + 1) < discuont.lengthAcc) {
                            discuont.accountNow = discuont.accountNow + 1;
                            all.banks.accounts.discuont.changeAccLoan("loadDueChecks");
                        } else {
                            discuont.sendDeuChecksCtrl();
                        }
                    } else {
                        discuont.sendDeuChecksCtrl();
                    }
                }
            });
        // all.banks.core.services.httpReq("https://start.telebank.co.il/wps/myportal/" + all.banks.accounts.discuont.typeBank.toUpperCase() + "-H-Retail/CHKVEW", 'GET', null, false, false)
        // .then(function (res) {
        // 	//var url = $(res).find(".mainPageContent").attr("action");
        // 	var dateFrom = new Date().getFullYear().toString() + ("0" + (new Date().getMonth() + 1)).slice(-2) + ("0" + (new Date().getDate())).slice(-2);
        // 	var dateToFormat = new Date(new Date().getFullYear(), new Date().getMonth() + 36, new Date().getDate());
        // 	var dateTo = dateToFormat.getFullYear().toString() + ("0" + (dateToFormat.getMonth() + 1)).slice(-2) + ("0" + (dateToFormat.getDate())).slice(-2);
        // 	try {
        //
        // 	}
        // 	catch (err) {
        // 	}
        //
        // })
        // .fail(function (error, resErr, urlParam) {
        // 	var logErr = "restUrl: " + urlParam + ", status: " + error.status;
        // 	all.banks.core.services.errorLog(logErr)
        // });
    }
    discuont.loadDeposite = function () {
        all.banks.core.services.httpReq("https://start.telebank.co.il/Titan/gatewayAPI/deposits/depositsDetails/" + all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc + '/1', 'GET', null, false, false)
            .then(function (res) {
                if (res.Error == undefined) {
                    var depositInterest;

                    $(res.DepositsDetails.DepositAccountBlock.DepositAccountEntry).each(function (i, v) {
                        var depositNumber = v.TermNewAccountNumber;
                        if (v.DepositDetailsBlock.DepositEntry[0].DepositID != 0) {
                            depositNumber = depositNumber + v.DepositDetailsBlock.DepositEntry[0].DepositID;
                        }

                        if (v.DepositDetailsBlock.DepositEntry[0].RatesPeriodBlock.RatesPeriodEntry[0] !== undefined) {
                            if (v.DepositDetailsBlock.DepositEntry[0].RatesPeriodBlock.RatesPeriodEntry[0].MainTrackFixedRate != 0) {
                                depositInterest = v.DepositDetailsBlock.DepositEntry[0].RatesPeriodBlock.RatesPeriodEntry[0].MainTrackFixedRate;
                            } else {
                                depositInterest = v.DepositDetailsBlock.DepositEntry[0].MinimalInterestForCalc;

                            }
                        } else {
                            depositInterest = null;
                        }
                        if (v.DepositDetailsBlock.DepositEntry.length > 1) {
                            $(v.DepositDetailsBlock.DepositEntry).each(function (i, v) {
                                all.banks.generalVariables.allDataArrDeposit.push({
                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                    "Token": all.banks.accountDetails.bank.token,
                                    "BankNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BankNumber,
                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    "BranchNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BranchNumber,
                                    "AccountNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].AccountNumber,
                                    "TypeName": v.ProductLongName,
                                    "DepositTotal": v.PlacementAmount,
                                    "DepositAsTotal": v.CurrentValue,
                                    "DueDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.MaturityDate)),
                                    "DepositDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.PlacementDate)),
                                    "DepositExistStation": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.AvailabilityDate)),
                                    "DepositNumber": depositNumber.slice(-9),
                                    "DepositInterest": depositInterest
                                })
                            })
                        } else {
                            all.banks.generalVariables.allDataArrDeposit.push({
                                "TargetId": all.banks.accountDetails.bank.targetId,
                                "Token": all.banks.accountDetails.bank.token,
                                "BankNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BankNumber,
                                "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                "ExporterId": all.banks.spiderConfig.spiderId,
                                "BranchNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BranchNumber,
                                "AccountNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].AccountNumber,
                                "TypeName": v.DepositDetailsBlock.DepositEntry[0].ProductLongName,
                                "DepositTotal": v.DepositDetailsBlock.DepositEntry[0].PlacementAmount,
                                "DepositAsTotal": v.DepositDetailsBlock.DepositEntry[0].CurrentValue,
                                "DueDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.DepositDetailsBlock.DepositEntry[0].MaturityDate)),
                                "DepositDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.DepositDetailsBlock.DepositEntry[0].PlacementDate)),
                                "DepositExistStation": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.DepositDetailsBlock.DepositEntry[0].AvailabilityDate)),
                                "DepositNumber": depositNumber.slice(-9),   //v.AccountNumber,
                                "DepositInterest": depositInterest
                            })
                        }
                        if (res.DepositsDetails.DepositAccountBlock.DepositAccountEntry.length == i + 1) {
                            if (all.banks.accounts.discuont.lengthAcc > 0) {
                                if ((discuont.accountNow + 1) < discuont.lengthAcc) {
                                    discuont.accountNow = discuont.accountNow + 1;
                                    all.banks.accounts.discuont.changeAccLoan("loadDeposite");
                                } else {
                                    discuont.sendDepositCtrl();
                                }
                            } else {
                                discuont.sendDepositCtrl();
                            }
                        }
                    });
                } else {
                    if (all.banks.accounts.discuont.lengthAcc > 0) {
                        if ((discuont.accountNow + 1) < discuont.lengthAcc) {
                            discuont.accountNow = discuont.accountNow + 1;
                            all.banks.accounts.discuont.changeAccLoan("loadDeposite");
                        } else {
                            discuont.sendDepositCtrl();
                        }
                    }
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    }
    discuont.loadStandingOrders = async function () {
        try {
            const data = await all.banks.core.services.httpReq("https://start.telebank.co.il/Titan/gatewayAPI/debitAuthorizations/standingOrdersList/" + all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc, 'GET', null, false, false);
            try {
                if (data.StandingOrdersList && data.StandingOrdersList.StandingOrdersBlock && data.StandingOrdersList.StandingOrdersBlock.StandingOrderEntry && data.StandingOrdersList.StandingOrdersBlock.StandingOrderEntry.length) {
                    data.StandingOrdersList.StandingOrdersBlock.StandingOrderEntry.forEach(function (item) {
                        if (item.StandingOrderStatus !== 'F' && item.StandingOrderStatusDescription !== "מוקפאת") {
                            all.banks.generalVariables.allDataArrStandingOrders.push({
                                "TargetId": all.banks.accountDetails.bank.targetId,
                                "Token": all.banks.accountDetails.bank.token,
                                "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                "ExporterId": all.banks.spiderConfig.spiderId,
                                "BranchNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BranchNumber,
                                "AccountNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].AccountNumber,
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
                                Type: 2,
                            });
                        }
                    });
                }
            } catch (e) {
                if (all.banks.accounts.discuont.lengthAcc > 0) {
                    if ((discuont.accountNow + 1) < discuont.lengthAcc) {
                        discuont.accountNow = discuont.accountNow + 1;
                        all.banks.accounts.discuont.changeAccLoan("loadStandingOrder");
                    } else {
                        discuont.sendStandingOrdersCtrl();
                    }
                } else {
                    discuont.sendStandingOrdersCtrl();
                }
            }

            const resp = await all.banks.core.services.httpReq(
                "https://start.telebank.co.il/Titan/gatewayAPI/debitAuthorizations/list"
                + "/" + all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc
                + "/true",
                'GET', null, false, false);
            if (resp && resp.DebitAuthorizationsList && resp.DebitAuthorizationsList.AuthorizationsBlock
                && Array.isArray(resp.DebitAuthorizationsList.AuthorizationsBlock.AuthorizationEntry)) {
                const commonPart = {
                    'TargetId': all.banks.accountDetails.bank.targetId,
                    'Token': all.banks.accountDetails.bank.token,
                    "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                    "BranchNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BranchNumber,
                    "AccountNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].AccountNumber,
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

            if (all.banks.accounts.discuont.lengthAcc > 0) {
                if ((discuont.accountNow + 1) < discuont.lengthAcc) {
                    discuont.accountNow = discuont.accountNow + 1;
                    all.banks.accounts.discuont.changeAccLoan("loadStandingOrder");
                } else {
                    discuont.sendStandingOrdersCtrl();
                }
            } else {
                discuont.sendStandingOrdersCtrl();
            }
        } catch (e) {
            console.error(e);
            writeLog(e);
            if (all.banks.accounts.discuont.lengthAcc > 0) {
                if ((discuont.accountNow + 1) < discuont.lengthAcc) {
                    discuont.accountNow = discuont.accountNow + 1;
                    all.banks.accounts.discuont.changeAccLoan("loadStandingOrder");
                } else {
                    discuont.sendStandingOrdersCtrl();
                }
            } else {
                discuont.sendStandingOrdersCtrl();
            }
        }


        // function loadStandingOrdersAll() {
        // 	all.banks.core.services.httpReq("https://start.telebank.co.il/Titan/gatewayAPI/debitAuthorizations/standingOrdersList/" + all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc, 'GET', null, false, false)
        // 	.then(function (data) {
        // 		try {
        // 			if (data.StandingOrdersList && data.StandingOrdersList.StandingOrdersBlock && data.StandingOrdersList.StandingOrdersBlock.StandingOrderEntry && data.StandingOrdersList.StandingOrdersBlock.StandingOrderEntry.length) {
        // 				data.StandingOrdersList.StandingOrdersBlock.StandingOrderEntry.forEach(function (item) {
        // 					if (item.StandingOrderStatus !== 'F' && StandingOrderStatusDescription !== "מוקפאת") {
        // 						all.banks.generalVariables.allDataArrStandingOrders.push({
        // 							"TargetId": all.banks.accountDetails.bank.targetId,
        // 							"Token": all.banks.accountDetails.bank.token,
        // 							"BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
        // 							"ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
        // 							"ExporterId": all.banks.spiderConfig.spiderId,
        // 							"BranchNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BranchNumber,
        // 							"AccountNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].AccountNumber,
        // 							"OrderName": item.Product,
        // 							"OrderOpeningDate": item.CreationDate ? item.CreationDate : null,
        // 							"OrderLastDate": item.LastTransferDate ? item.LastTransferDate : null,
        // 							"OrderTotal": item.StandingOrderAmount,
        // 							"OrderNumber": null,
        // 							"Asmachta": null,
        // 							BankTransferNumber: Number(item.BankID),
        // 							BranchTransferNumber: Number(item.BranchID),
        // 							AccountTransferNumber: Number(item.AccountNumber),
        // 							NamePayerTransfer: item.OpositeName,
        // 							Type: 2,
        // 						});
        // 					}
        // 				})
        // 			}
        //
        //
        // 			if (all.banks.accounts.discuont.lengthAcc > 0) {
        // 				if ((discuont.accountNow + 1) < discuont.lengthAcc) {
        // 					discuont.accountNow = discuont.accountNow + 1;
        // 					all.banks.accounts.discuont.changeAccLoan("loadStandingOrder");
        // 				}
        // 				else {
        // 					discuont.sendStandingOrdersCtrl();
        // 				}
        // 			}
        // 			else {
        // 				discuont.sendStandingOrdersCtrl();
        // 			}
        // 		} catch (e) {
        // 			if (all.banks.accounts.discuont.lengthAcc > 0) {
        // 				if ((discuont.accountNow + 1) < discuont.lengthAcc) {
        // 					discuont.accountNow = discuont.accountNow + 1;
        // 					all.banks.accounts.discuont.changeAccLoan("loadStandingOrder");
        // 				}
        // 				else {
        // 					discuont.sendStandingOrdersCtrl();
        // 				}
        // 			}
        // 			else {
        // 				discuont.sendStandingOrdersCtrl();
        // 			}
        // 		}
        // 	})
        // }


        // all.banks.core.services.httpReq("https://start.telebank.co.il/Trade/asprip/index.php/DEBIT_AUTHORIZATION/?accIdx=" + all.banks.accounts.discuont.accArr[discuont.accountNow].AccountNumberMD5 + "&sN=null", 'GET', null, false, false)
        // .then(function (data) {
        // 	var res = all.banks.core.services.parseHtml(data);
        // 	if (res.find(".appleTableList tbody > tr.appleTableListRow").length) {
        // 		$(res.find(".appleTableList tbody > tr.appleTableListRow")).each(function (i, v) {
        // 			var v = $(v);
        // 			var nextRow = v.next("tr.appleTableListRowDetails");
        // 			var openingDate = discuont.dateFromDDMMYYOrNull(
        // 				nextRow.find(".detailsContainer span.detailLabel:contains('תאריך פתיחת הרשאה:')")
        // 				.next("span.detailData").text()
        // 				.replace(/[^\d\/]/g, ''),
        // 				true);
        //
        // 			var lastDate = discuont.dateFromDDMMYYOrNull(
        // 				$(v).find('td.authLastDebitDate').text().replace(/[^\d\/]/g, '')
        // 			);
        //
        // 			all.banks.generalVariables.allDataArrStandingOrders.push({
        // 				"TargetId": all.banks.accountDetails.bank.targetId,
        // 				"Token": all.banks.accountDetails.bank.token,
        // 				"BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
        // 				"ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
        // 				"ExporterId": all.banks.spiderConfig.spiderId,
        // 				"BranchNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BranchNumber,
        // 				"AccountNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].AccountNumber,
        // 				"OrderName": $(v).find('td.authInstitutionShortName').text().replace(/\s\s+/g, " "),
        // 				"OrderOpeningDate": openingDate,
        // 				"OrderLastDate": lastDate,
        // 				"OrderTotal": $(v).find("td.authLastDebitAmount").text().replace(/[^\d\.-]/g, ""),
        // 				"OrderNumber": nextRow.find('.detailsContainer > ul').eq(1).find("li").eq(1).find('span').eq(1).text(),
        // 				"Asmachta": '',
        // 				BankTransferNumber: null,
        // 				BranchTransferNumber: null,
        // 				AccountTransferNumber: null,
        // 				NamePayerTransfer: null,
        // 				Type: 1,
        // 			});
        // 			if (res.find(".appleTableList tbody > tr.appleTableListRow").length == i + 1) {
        // 				loadStandingOrdersAll();
        // 			}
        // 		});
        // 	} else {
        // 		loadStandingOrdersAll();
        // 	}
        // });
    }
    discuont.changeAccAshrai = async function () {
        try {
            await all.banks.core.services.httpReq("https://start.telebank.co.il/Trade/asprip/index.php/onlineBankingTheme/dummy_method?accIdx="
                + all.banks.accounts.discuont.accArr[discuont.accountNow].AccountNumberMD5 + "&site=Retail", 'GET', null, false, false);
        } catch (e) {
            writeLog("Failure in dummy_method. Seems recoverable, so will continue [" + e + "]");
        }
//        await all.banks.core.services.httpReq("https://start.telebank.co.il/Trade/asprip/index.php/onlineBankingTheme/dummy_method?accIdx="
//                + all.banks.accounts.discuont.accArr[discuont.accountNow].AccountNumberMD5 + "&site=Retail", 'GET', null, false, false)
        await all.banks.core.services.httpReq("https://start.telebank.co.il/Titan/gatewayAPI/getCurrentTimestamp", 'GET', null, false, false);
        discuont.loadaccountDetailsAshrai()
    }
    discuont.loadaccountDetailsAshrai = function () {
        all.banks.core.services.httpReq("https://start.telebank.co.il/Titan/gatewayAPI/accountDetails/" + all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc, 'GET', null, false, false)
            .then(function (res) {
                if (res.Error === undefined) {
                    var acc = {
                        'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                        'AccountNumber': res.AccountDetails.AccountNumber,
                        'BranchNumber': res.AccountDetails.HandlingBranchId,
                        'Balance': res.AccountDetails.Balance,
                        'AccountCredit': res.AccountDetails.AccountFrame
                    };
                    all.banks.generalVariables.allDataArr.BankData[0].Account.push(acc);
                    discuont.loadCard();
                } else {
                    myEmitterLogs(37, all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc + ": " + res.Error.MsgText);
                    if ((discuont.accountNow + 1) < all.banks.accounts.discuont.lengthAcc) {
                        discuont.accountNow = discuont.accountNow + 1;
                        all.banks.accounts.discuont.changeAccAshrai()
                    } else {
                        all.banks.accounts.discuont.sendCardsCtrl()
                    }
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    }
    discuont.changeAccLoan = async function (deposit) {
        try {
            await all.banks.core.services.httpReq("https://start.telebank.co.il/Trade/asprip/index.php/onlineBankingTheme/dummy_method?accIdx="
                + all.banks.accounts.discuont.accArr[discuont.accountNow].AccountNumberMD5 + "&site=Retail", 'GET', null, false, false);
        } catch (e) {
            writeLog("Failure in dummy_method. Seems recoverable, so will continue [" + e + "]");
        }
//        await all.banks.core.services.httpReq("https://start.telebank.co.il/Trade/asprip/index.php/onlineBankingTheme/dummy_method?accIdx="
//                + all.banks.accounts.discuont.accArr[discuont.accountNow].AccountNumberMD5 + "&site=Retail", 'GET', null, false, false)
        await all.banks.core.services.httpReq("https://start.telebank.co.il/Titan/gatewayAPI/getCurrentTimestamp", 'GET', null, false, false);
        discuont.loadaccountDetailsLoan(deposit)
    }
    discuont.loadaccountDetailsLoan = function (deposit) {
        all.banks.core.services.httpReq("https://start.telebank.co.il/Titan/gatewayAPI/accountDetails/" + all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc, 'GET', null, false, false)
            .then(function (res) {
                if (res.Error === undefined) {
                    var acc = {
                        'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                        'AccountNumber': res.AccountDetails.AccountNumber,
                        'BranchNumber': res.AccountDetails.HandlingBranchId,
                        'Balance': res.AccountDetails.Balance,
                        'AccountCredit': res.AccountDetails.AccountFrame
                    };
                    all.banks.generalVariables.allDataArr.BankData[0].Account.push(acc);
                    if (deposit == "loadLoan") {
                        discuont.loadLoan();
                    } else if (deposit == "loadDeposite") {
                        discuont.loadDeposite();
                    } else if (deposit == "loadDueChecks") {
                        discuont.loadDueChecks();
                    } else if (deposit == "loadStandingOrder") {
                        // discuont.accountNow = 0;
                        discuont.loadStandingOrders();
                    }
                    // discuont.changeAccGetUuid().then(function (data) {
                    // 	if (data == true) {
                    //
                    // 	}
                    // 	else {
                    // 		all.banks.core.services.errorLog('שגיאה');
                    // 	}
                    // })
                } else {
                    myEmitterLogs(37, all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc + ": " + res.Error.MsgText);
                    if ((discuont.accountNow + 1) < discuont.lengthAcc) {
                        discuont.accountNow = discuont.accountNow + 1;
                        all.banks.accounts.discuont.changeAccLoan(deposit);
                    } else {
                        discuont.sendStandingOrdersCtrl();
                    }
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    }
    discuont.loadaccountDetails = function (matah) {
        all.banks.core.services.httpReq("https://start.telebank.co.il/Titan/gatewayAPI/accountDetails/" + all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc, 'GET', null, false, false)
            .then(function (res) {
                if (res.Error === undefined) {
                    var acc = {
                        'BankNumber': all.banks.accountDetails.bank.BankNumber,
                        'AccountNumber': res.AccountDetails.AccountNumber,
                        'BranchNumber': res.AccountDetails.HandlingBranchId,
                        'Balance': res.AccountDetails.Balance,
                        'AccountCredit': res.AccountDetails.AccountFrame
                    }
                    all.banks.generalVariables.allDataArr.BankData[0].Account.push(acc);
                    if (!discuont.matah) {
                        myEmitterLogs(10, acc.BranchNumber + '-' + acc.AccountNumber);
                        discuont.loadOsh();
                    } else {
                        myEmitterLogs(35, acc.BranchNumber + '-' + acc.AccountNumber);
                        var url = "https://start.telebank.co.il/Titan/gatewayAPI/foreign/CALinkedAccountsDetails";
                        var jsonReq = {"AccountsBlock": {"AccountEntry": [{"AccountNumber": res.AccountDetails.AccountNumber}]}};
                        all.banks.core.services.httpReq(url, 'POST', jsonReq, false, false)
                            .then(function (data) {
                                if (!data.Error && !data.CALinkedAccountsDetails.MainAccountBlock.MainAccountEntry[0].Error) {
                                    discuont.loadMatah(data, acc);
                                } else {
                                    if ((discuont.accountNow + 1) < all.banks.accounts.discuont.lengthAcc) {
                                        discuont.accountNow = discuont.accountNow + 1;
                                        all.banks.accounts.discuont.changeAcc(matah)
                                    } else {
                                        all.banks.accountDetails.MATAH_DAY_TO_RUN = -1;
                                        all.banks.accounts.discuont.sendOshCtrl(discuont.matah);
                                    }
                                }
                            })
                    }
                } else {
                    myEmitterLogs(37, all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc + ": " + res.Error.MsgText);
                    if ((discuont.accountNow + 1) < all.banks.accounts.discuont.lengthAcc) {
                        discuont.accountNow = discuont.accountNow + 1;
                        all.banks.accounts.discuont.changeAcc(matah)
                    } else {
                        all.banks.accountDetails.MATAH_DAY_TO_RUN = -1;
                        all.banks.accounts.discuont.sendOshCtrl(discuont.matah);
                    }
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    }
    discuont.loadChecks = function (req, uuids, v) {
        var arrUuid = uuids;
        var dfd = $.Deferred();
        var url = "https://start.telebank.co.il/Titan/gatewayAPI/checks/details";
        all.banks.core.services.httpReq(url, 'POST', req, false, false)
            .then(function (data) {
                try {
                    if (data.Error == undefined) {
                        var arrCheck = [], ind = 0, sendWsNotVal = 0;

                        function loadChecks() {
                            $(data.ChecksDetails.ChecksDetailsBlock.CheckEntry).each(function (i, val) {
                                if (ind == i) {
                                    ind += 1;
                                    if (val.CheckBankNumber !== '') {
                                        var CheckBankNumber = parseInt(val.CheckBankNumber);
                                        var CheckBranchNumber = parseInt(val.CheckBranchNumber);
                                        var CheckAccountNumber = parseInt(val.CheckAccountNumber);
                                    } else {
                                        var CheckBankNumber = parseInt(v.OperationBank);
                                        var CheckBranchNumber = parseInt(v.OperationBranch);
                                        var CheckAccountNumber = parseInt(arrUuid.numberAcc);
                                    }
                                    var uuid = CheckBankNumber + '' + CheckBranchNumber + '' + CheckAccountNumber + '' + Number(val.CheckNumber) + '' + Number(val.CheckValueDate) + '_' + Number(all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BankNumber) + '' + Number(all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BranchNumber) + '' + Number(all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].AccountNumber);
                                    if (val.FrontalCheckImage !== "") {
                                        var formData = new FormData();
                                        var content = val.FrontalCheckImage;
                                        var blob = new Blob([content], {
                                            type: "text/plain"
                                        });
                                        formData.append(uuid, blob);
                                        all.banks.accounts.discuont.sendChecksCtrl({
                                            formData: formData,
                                            params: {
                                                imagenamekey: uuid,
                                                bankId: Number(all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BankNumber),
                                                snifId: Number(all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BranchNumber),
                                                accountId: Number(all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].AccountNumber)
                                            }
                                        });
                                        arrCheck.push({
                                            "Asmachta": v.OperationNumber + '' + v.BranchTreasuryNumber.replace(/\D/g, ""),
                                            "CheckAccountNumber": CheckAccountNumber,
                                            "DepositeDate": parseInt(val.CheckValueDate),
                                            "CheckBankNumber": CheckBankNumber,
                                            "CheckBranchNumber": CheckBranchNumber,
                                            "CheckNumber": parseInt(val.CheckNumber),
                                            "CheckTotal": parseFloat(val.CheckAmount),
                                            "ImageNameKey": uuid
                                        });
                                        if (i + 1 == data.ChecksDetails.ChecksDetailsBlock.CheckEntry.length) {
                                            dfd.resolve(arrCheck)
                                        }
                                    } else {
                                        if (val.PictureID !== "") {
                                            const checkData = {
                                                "Asmachta": v.OperationNumber + '' + v.BranchTreasuryNumber.replace(/\D/g, ""),
                                                "CheckAccountNumber": CheckAccountNumber,
                                                "DepositeDate": parseInt(val.CheckValueDate),
                                                "CheckBankNumber": CheckBankNumber,
                                                "CheckBranchNumber": CheckBranchNumber,
                                                "CheckNumber": parseInt(val.CheckNumber),
                                                "CheckTotal": parseFloat(val.CheckAmount),
                                                "ImageNameKey": 'x'
                                            };

                                            if (req.DepositNumber) {
                                                all.banks.core.services.httpReq('https://start.telebank.co.il/Titan/gatewayAPI/checks/image', 'POST', {
                                                    "checkType": "DepositedChecks",
                                                    "identifyImage": val.IdentifyCheckImage,
                                                    "identifySeqCheck": val.IdentifySeqCheck,
                                                    "identifyProcessDate": val.IdentifyProcessDate,
                                                    "identifyCreditBank": val.IdentifyCreditBank,//"",
                                                    "pictureID": val.PictureID,
                                                    "lastTransactionFlag": "False"
                                                }).then((chkImgRslt) => {
//												console.log('%o', chkImgRslt);
                                                    if (chkImgRslt && chkImgRslt.CheckImage && chkImgRslt.CheckImage.FrontalCheckImage) {
                                                        const fd = new FormData();
                                                        fd.append(uuid, new Blob([chkImgRslt.CheckImage.FrontalCheckImage], {
                                                            type: "text/plain"
                                                        }));
                                                        all.banks.accounts.discuont.sendChecksCtrl({
                                                            formData: fd,
                                                            params: {
                                                                imagenamekey: uuid,
                                                                bankId: Number(all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BankNumber),
                                                                snifId: Number(all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BranchNumber),
                                                                accountId: Number(all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].AccountNumber)
                                                            }
                                                        });
                                                        Object.assign(checkData, {
                                                            "ImageNameKey": uuid
                                                        });
                                                    }
                                                })
                                                    .fail(() => {
                                                    })
                                                    .done(() => {
                                                        arrCheck.push(checkData);
                                                        if (i + 1 === data.ChecksDetails.ChecksDetailsBlock.CheckEntry.length) {
                                                            dfd.resolve(arrCheck);
                                                        } else {
                                                            loadChecks();
                                                        }
                                                    });
                                            } else {
                                                var urlMulti = "https://start.telebank.co.il/Trade/asprip/index.php/retailHomePage/lastTransactions/pullSingleCheckFromBundlePopup/?accIdx=" + arrUuid.md5 + "&sN=null&OperationCode=036&IdentifyCreditBank=&IdentifyCheckImage=" + val.IdentifyCheckImage + "&IdentifySeqCheck=" + val.IdentifySeqCheck + "&IdentifyProcessDate=" + val.IdentifyProcessDate + "&CheckBankNumber=" + val.CheckBankNumber + "&PictureID=" + val.PictureID + "&CheckStatusCode=00&CheckBranchNumber=" + val.CheckBranchNumber + "&CheckAccountNumber=" + val.CheckAccountNumber + "&CheckNumber=" + val.CheckNumber + "&CheckValueDate=" + val.CheckValueDate + "&CheckAmount=" + val.CheckAmount + "&ReturnedDate=&ReasonForReturnedCheck=";
                                                all.banks.core.services.httpReq(urlMulti, 'GET', null, false, false)
                                                    .then(function (imgRes) {
                                                        var formData = new FormData();
                                                        var contentImg = $(imgRes).find(".checkImgFront .checkImgSize");
                                                        if (contentImg.length) {
                                                            var content = contentImg.attr("src").replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                                                            var blob = new Blob([content], {
                                                                type: "text/plain"
                                                            });
                                                            formData.append(uuid, blob);
                                                            all.banks.accounts.discuont.sendChecksCtrl({
                                                                formData: formData,
                                                                params: {
                                                                    imagenamekey: uuid,
                                                                    bankId: Number(all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BankNumber),
                                                                    snifId: Number(all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BranchNumber),
                                                                    accountId: Number(all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].AccountNumber)
                                                                }
                                                            });
                                                        } else {
                                                            uuid = "x";
                                                        }

                                                        arrCheck.push(Object.assign(checkData, {
                                                            "ImageNameKey": uuid
                                                        }));
                                                        if (i + 1 == data.ChecksDetails.ChecksDetailsBlock.CheckEntry.length) {
                                                            dfd.resolve(arrCheck)
                                                        } else {
                                                            loadChecks();
                                                        }
                                                    })
                                            }

                                            return false;
                                        } else {
                                            if (sendWsNotVal == 0) {
                                                sendWsNotVal = 1;
                                                var urlPopAllChecks = "https://start.telebank.co.il/Trade/asprip/index.php/retailHomePage/lastTransactions/pullCheckPopup/?accIdx=" + arrUuid.md5 + "&sN=null&OperationCode=" + req.OperationCode + "&OperationBranch=" + req.OperationBranch + "&Urn=" + req.Urn + "&OperationBank=" + req.OperationBank + "&BusinessDayDate=" + req.BusinessDayDate + "&ValueDate=" + req.ValueDate + "&DepositNumber=" + req.DepositNumber;
                                                all.banks.core.services.httpReq(urlPopAllChecks, 'GET', null, false, false)
                                                    .then(function (imgRes) {
                                                        sendCheckWhenNotVal()
                                                    })
                                                return false;
                                            } else {
                                                sendCheckWhenNotVal()
                                                return false;
                                            }

                                            function sendCheckWhenNotVal() {
                                                var urlMulti = "https://start.telebank.co.il/Trade/asprip/index.php/retailHomePage/lastTransactions/pullSingleCheckFromBundlePopup/?accIdx=" + arrUuid.md5 + "&sN=null&OperationCode=" + req.OperationCode + "&IdentifyCreditBank=" + val.IdentifyCreditBank + "&IdentifyCheckImage=" + val.IdentifyCheckImage + "&IdentifySeqCheck=" + val.IdentifySeqCheck + "&IdentifyProcessDate=" + val.IdentifyProcessDate + "&CheckBankNumber=" + val.CheckBankNumber + "&PictureID=" + val.PictureID + "&CheckStatusCode=" + val.CheckStatusCode + "&CheckBranchNumber=" + val.CheckBranchNumber + "&CheckAccountNumber=" + val.CheckAccountNumber + "&CheckNumber=" + val.CheckNumber + "&CheckValueDate=" + val.CheckValueDate + "&CheckAmount=" + val.CheckAmount + "&ReturnedDate=&ReasonForReturnedCheck=";
                                                all.banks.core.services.httpReq(urlMulti, 'GET', null, false, false)
                                                    .then(function (imgRes) {
                                                        var imgRes = $(imgRes);
                                                        if ($(imgRes).find(".checkImgFront").length) {
                                                            var formData = new FormData();
                                                            var content = $(imgRes).find(".checkImgFront .checkImgSize").attr("src").replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                                                            var blob = new Blob([content], {
                                                                type: "text/plain"
                                                            });
                                                            formData.append(uuid, blob);
                                                            all.banks.accounts.discuont.sendChecksCtrl({
                                                                formData: formData,
                                                                params: {
                                                                    imagenamekey: uuid,
                                                                    bankId: Number(all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BankNumber),
                                                                    snifId: Number(all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BranchNumber),
                                                                    accountId: Number(all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].AccountNumber)
                                                                }
                                                            });

                                                            arrCheck.push({
                                                                "Asmachta": v.OperationNumber + '' + v.BranchTreasuryNumber.replace(/\D/g, ""),
                                                                "CheckAccountNumber": CheckAccountNumber,
                                                                "DepositeDate": parseInt(val.CheckValueDate),
                                                                "CheckBankNumber": CheckBankNumber,
                                                                "CheckBranchNumber": CheckBranchNumber,
                                                                "CheckNumber": parseInt(val.CheckNumber),
                                                                "CheckTotal": parseFloat(val.CheckAmount),
                                                                "ImageNameKey": uuid
                                                            });
                                                        } else {
                                                            arrCheck.push({
                                                                "Asmachta": v.OperationNumber + '' + v.BranchTreasuryNumber.replace(/\D/g, ""),
                                                                "CheckAccountNumber": CheckAccountNumber,
                                                                "DepositeDate": parseInt(val.CheckValueDate),
                                                                "CheckBankNumber": CheckBankNumber,
                                                                "CheckBranchNumber": CheckBranchNumber,
                                                                "CheckNumber": parseInt(val.CheckNumber),
                                                                "CheckTotal": parseFloat(val.CheckAmount),
                                                                "ImageNameKey": imgRes.find(".error_msg").text()
                                                            });
                                                        }

                                                        if (i + 1 == data.ChecksDetails.ChecksDetailsBlock.CheckEntry.length) {
                                                            dfd.resolve(arrCheck)
                                                        } else {
                                                            loadChecks()
                                                        }
                                                    });
                                            }
                                        }
                                    }
                                }
                            })
                        }

                        loadChecks();
                    } else {
                        all.banks.generalVariables.numChecksNotWithdrawn += 1;
                        dfd.resolve([{
                            "ImageNameKey": "x"
                        }]);
                    }
                } catch (err) {
                    all.banks.core.services.errorLog(err);
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
        return dfd.promise();
    }
    discuont.loadOsh = function () {
        const maxCorrectBalanceRetries = 10;
        let fromDate, correctBalanceRetryAttempt = 0;
        const toDateIsToday = (String(new Date().getFullYear()) + String(new Date().getMonth() + 1).padStart(2, '0')
            + String(new Date().getDate()).padStart(2, '0')) === all.banks.accounts.discuont.datebacksleshTo;
        let isSetDateFrom = false;

        function doLoad() {
            if (!isSetDateFrom) {
                if (correctBalanceRetryAttempt > maxCorrectBalanceRetries) {
                    complete();
                }
                if (correctBalanceRetryAttempt === 0) {
                    fromDate = all.banks.accounts.discuont.datebackslesh;
                } else {
                    const dt = new Date(all.banks.accountDetails.dateTo.getFullYear(), all.banks.accountDetails.dateTo.getMonth(),
                        all.banks.accountDetails.dateTo.getDate() - (all.banks.accountDetails.days + correctBalanceRetryAttempt));
                    fromDate = String(dt.getFullYear()) + String(all.banks.accountDetails.dateFrom.getMonth() + 1).padStart(2, '0')
                        + String(all.banks.accountDetails.dateFrom.getDate()).padStart(2, '0');
                }
            } else {

            }

            correctBalanceRetryAttempt++;

            all.banks.core.services.httpReq("https://start.telebank.co.il/Titan/gatewayAPI/lastTransactions/" + all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc
                + "/ByDate?IsCategoryDescCode=True&IsTransactionDetails=True&IsFutureTransactionFlag=True&IsEventNames=True"
                + "&FromDate=" + fromDate
                + "&ToDate=" + all.banks.accounts.discuont.datebacksleshTo
                + "&FromAmount=0&ToAmount=999999999999.99", 'GET', null, false, false)
                .then(function (res) {
                    if (!isSetDateFrom) {
                        all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].DataRow = [];
                    }

                    isSetDateFrom = false;
                    if (res.Info && res.Info.GeneratedCode === "1000464") {
                        const paragraph = res.Info.MsgText;
                        const regex = /(\d{1,2})\/(\d{1,2})\/(\d{1,2})/g;
                        const found = paragraph.match(regex);
                        if (found.length === 1) {
                            const dateFromNew = found[0].split('/');
                            const dtNew = new Date(Number('20' + dateFromNew[2]), Number(dateFromNew[1]) - 1,
                                Number(dateFromNew[0]) + 1);
                            fromDate = String(dtNew.getFullYear()) + String(dtNew.getMonth() + 1).padStart(2, '0')
                                + String(dtNew.getDate()).padStart(2, '0');
                            // const dateTill = String('20' + dateFromNew[2]) + String(dateFromNew[1]).padStart(2, '0')
                            //     + String(dateFromNew[0]).padStart(2, '0');
                            isSetDateFrom = true;
                        }
                    }
                    if (res.Error == undefined && Array.isArray(res.CurrentAccountLastTransactions.OperationEntry)) {
                        if (!isSetDateFrom) {
                            if (res.CurrentAccountLastTransactions.OperationEntry.length > 0
                                && toDateIsToday
                                && res.CurrentAccountLastTransactions.OperationEntry[res.CurrentAccountLastTransactions.OperationEntry.length - 1].BalanceAfterOperation
                                !== res.CurrentAccountLastTransactions.CurrentAccountInfo.AccountBalance
                                && correctBalanceRetryAttempt < maxCorrectBalanceRetries
                                && (all.banks.accountDetails.days + correctBalanceRetryAttempt) < 364) {
                                writeLog("period [" + fromDate + " - " + all.banks.accounts.discuont.datebacksleshTo + "]:"
                                    + " Expecting latest transaction balance to be " + all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].Balance
                                    + ", but got " + res.CurrentAccountLastTransactions.OperationEntry[res.CurrentAccountLastTransactions.OperationEntry.length - 1].BalanceAfterOperation);
                                doLoad();
                                return;
                            }
                        }


                        var counter = 0;
                        const inFuture = (date) => {
                            return new Date(Number(date.substring(0, 4)), Number(date.substring(4, 6)), Number(date.substring(6, 8))).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)
                        };

                        function loadOshLoop() {
                            $(res.CurrentAccountLastTransactions.OperationEntry).each(function (i, v) {
                                var balance = null;
                                if (i == counter) {
                                    counter = counter + 1;

                                    if (v.BalanceAfterOperation !== undefined) {
                                        balance = v.BalanceAfterOperation;
                                    }
                                    var transactionType = 1;
                                    var totalOperationAmount = v.OperationAmount;
                                    if (v.OperationAmount < 0) {
                                        transactionType = 0;
                                        totalOperationAmount = v.OperationAmount * (-1);
                                    }
                                    if (all.banks.accountDetails.checks == true && v.OperationDetailsServiceName == "ChecksDetails") {
                                        var req = {
                                            "AccountNumber": all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc,
                                            "OperationBranch": v.OperationBranch,
                                            "LastTransactionFlag": "True",
                                            "OperationCode": v.OperationCode,
                                            "Urn": v.Urn,
                                            "OperationBank": v.OperationBank,
                                            "ValueDate": v.ValueDate,
                                            "BusinessDayDate": v.BusinessDayDate
                                        };
                                        if (v.OperationCode == "036" && v.DepositNumber !== undefined) {
                                            req.DepositNumber = v.DepositNumber
                                        }
                                        $.when(discuont.loadChecks(req, all.banks.accounts.discuont.accArr[discuont.accountNow], v)).then(function (status) {
                                            req = null;
                                            all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].DataRow.push({
                                                "Asmachta": v.OperationNumber + '' + v.BranchTreasuryNumber.replace(/\D/g, ""),
                                                "TransDesc": v.OperationDescriptionToDisplay.replace(/\s\s+/g, " "),
                                                "ValueDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.OperationDate)),
                                                "TransactionType": transactionType,
                                                "TransTotal": totalOperationAmount,
                                                "Balance": balance,
                                                "IsDaily": "0",
                                                "imgs": status,
                                                "urnFromBank": v.Urn,
                                                "operationCode": v.OperationCode,
                                                "operationNumber": v.OperationNumber,
                                                "operationOrder": v.OperationOrder
                                            });
                                            if (i + 1 == res.CurrentAccountLastTransactions.OperationEntry.length) {
                                                loadNextStep()
                                            } else {
                                                loadOshLoop()
                                            }
                                        });
                                    } else if (v.OperationDetailsServiceName == "TransactionDetails") {
                                        var urls = "https://start.telebank.co.il/Titan/gatewayAPI/transactionDetails/" + all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc + "/" + v.OperationNumber;
                                        all.banks.core.services.httpReq(urls, 'GET', null, false, false)
                                            .then(function (response) {
                                                all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].DataRow.push({
                                                    "Asmachta": v.OperationNumber + '' + v.BranchTreasuryNumber.replace(/\D/g, ""),
                                                    "TransDesc": v.OperationDescriptionToDisplay.replace(/\s\s+/g, " "),
                                                    "ValueDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.OperationDate)), //v.ValueDate
                                                    "TransactionType": transactionType,
                                                    "TransTotal": totalOperationAmount, //v.OperationAmount
                                                    "Balance": balance,
                                                    "IsDaily": "0",
                                                    "imgs": null,
                                                    "urnFromBank": v.Urn,
                                                    "operationCode": v.OperationCode,
                                                    "operationNumber": v.OperationNumber,
                                                    "operationOrder": v.OperationOrder,
                                                    "DepositeTransferData": [{
                                                        "DepositeTransferDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.OperationDate)), //v.ValueDate
                                                        "BankTransferNumber": parseFloat(response.TransactionDetails.BeneficiaryBankNumber),
                                                        "BranchTransferNumber": parseFloat(response.TransactionDetails.BeneficiaryBranchNumber),
                                                        "AccountTransferNumber": parseFloat(response.TransactionDetails.BeneficiaryAccountNumber),
                                                        "NamePayerTransfer": response.TransactionDetails.BeneficiaryAccountName,
                                                        "DetailsTransfer": response.TransactionDetails.Comments,
                                                        "TransferTotal": v.OperationAmount
                                                    }]
                                                })
                                                if (i + 1 == res.CurrentAccountLastTransactions.OperationEntry.length) {
                                                    loadNextStep()
                                                } else {
                                                    loadOshLoop()
                                                }
                                            })
                                            .fail(function (error, resErr) {
                                                if (i + 1 == res.CurrentAccountLastTransactions.OperationEntry.length) {
                                                    loadNextStep()
                                                } else {
                                                    loadOshLoop()
                                                }
                                            })
                                    } else if (v.OperationDetailsServiceName == "CreditIncomingTransferDetails") {
                                        var dataReq = {
                                            "AccountNumber": all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc,
                                            "Urn": v.Urn
                                        };
                                        var url = "https://start.telebank.co.il/Titan/gatewayAPI/creditIncomingTransferDetails";
                                        all.banks.core.services.httpReq(url, 'POST', dataReq, false, false)
                                            .then(function (resp) {
                                                var BankTransferNumber = null, BranchTransferNumber = null,
                                                    AccountTransferNumber = null;
                                                if (resp.Error) {
                                                    all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].DataRow.push({
                                                        "Asmachta": v.OperationNumber + '' + v.BranchTreasuryNumber.replace(/\D/g, ""),
                                                        "TransDesc": v.OperationDescriptionToDisplay.replace(/\s\s+/g, " "),
                                                        "ValueDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.OperationDate)), //v.ValueDate
                                                        "TransactionType": transactionType,
                                                        "TransTotal": totalOperationAmount, //v.OperationAmount,
                                                        "Balance": balance,
                                                        "IsDaily": "0",
                                                        "imgs": null,
                                                        "operationCode": v.OperationCode,
                                                        "operationNumber": v.OperationNumber,
                                                        "operationOrder": v.OperationOrder,
                                                        "urnFromBank": v.Urn
                                                    })
                                                    if (i + 1 == res.CurrentAccountLastTransactions.OperationEntry.length) {
                                                        loadNextStep()
                                                    } else {
                                                        loadOshLoop()
                                                    }
                                                } else {
                                                    if (v.OperationDescription2.indexOf('-') !== -1) {
                                                        BankTransferNumber = v.OperationDescription2.split('-')[0].replace(/\D/g, "");
                                                        BranchTransferNumber = v.OperationDescription2.split('-')[1].replace(/\D/g, "");
                                                        AccountTransferNumber = v.OperationDescription2.split('-')[3].replace(/\D/g, "");
                                                    }
                                                    const kodMosad = /^\d+$/.test(resp.CreditIncomingTransferDetails.MosadCode)
                                                        ? resp.CreditIncomingTransferDetails.MosadCode : null;
                                                    all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].DataRow.push({
                                                        "Asmachta": kodMosad !== null
                                                            ? kodMosad
                                                            : v.OperationNumber + '' + v.BranchTreasuryNumber.replace(/\D/g, ""),
                                                        "TransDesc": v.OperationDescriptionToDisplay.replace(/\s\s+/g, " "),
                                                        "ValueDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.OperationDate)), //v.ValueDate
                                                        "TransactionType": transactionType,
                                                        "TransTotal": totalOperationAmount, //v.OperationAmount,
                                                        "Balance": balance,
                                                        "IsDaily": "0",
                                                        "imgs": null,
                                                        "urnFromBank": v.Urn,
                                                        "operationCode": v.OperationCode,
                                                        "operationNumber": v.OperationNumber,
                                                        "operationOrder": v.OperationOrder,
                                                        "DepositeTransferData": [{
                                                            "DepositeTransferDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.OperationDate)), //v.ValueDate
                                                            "BankTransferNumber": BankTransferNumber,
                                                            "BranchTransferNumber": BranchTransferNumber,
                                                            "AccountTransferNumber": AccountTransferNumber,
                                                            "NamePayerTransfer": resp.CreditIncomingTransferDetails.MaavirName,
                                                            "DetailsTransfer": resp.CreditIncomingTransferDetails.FreeText,
                                                            "TransferTotal": v.OperationAmount
                                                        }]
                                                    });
                                                    if (i + 1 == res.CurrentAccountLastTransactions.OperationEntry.length) {
                                                        loadNextStep()
                                                    } else {
                                                        loadOshLoop()
                                                    }
                                                }
                                            })
                                            .fail(function (error, resErr) {
                                                if (i + 1 == res.CurrentAccountLastTransactions.OperationEntry.length) {
                                                    loadNextStep()
                                                } else {
                                                    loadOshLoop()
                                                }
                                            })
                                    } else if (v.OperationDetailsServiceName == "DebitIncomingTransferDetails") {
                                        //								var dataReq = {
                                        //									"AccountNumber": all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc,
                                        //									"Urn": v.Urn
                                        //								};
                                        var url = ["https://start.telebank.co.il/Titan/gatewayAPI/debitIncomingTransferDetails",
                                            all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc,
                                            v.Urn].join('/');
                                        all.banks.core.services.httpReq(url, 'GET', null, false, false)
                                            .then(function (resp) {
                                                var BankTransferNumber = null, BranchTransferNumber = null,
                                                    AccountTransferNumber = null;
                                                if (resp.Error) {
                                                    all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].DataRow.push({
                                                        "Asmachta": v.OperationNumber + '' + v.BranchTreasuryNumber.replace(/\D/g, ""),
                                                        "TransDesc": v.OperationDescriptionToDisplay.replace(/\s\s+/g, " "),
                                                        "ValueDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.OperationDate)), //v.ValueDate
                                                        "TransactionType": transactionType,
                                                        "TransTotal": totalOperationAmount, //v.OperationAmount,
                                                        "Balance": balance,
                                                        "urnFromBank": v.Urn,
                                                        "operationCode": v.OperationCode,
                                                        "operationNumber": v.OperationNumber,
                                                        "operationOrder": v.OperationOrder,
                                                        "IsDaily": "0",
                                                        "imgs": null
                                                    })
                                                    if (i + 1 == res.CurrentAccountLastTransactions.OperationEntry.length) {
                                                        loadNextStep()
                                                    } else {
                                                        loadOshLoop()
                                                    }
                                                } else {
                                                    let mtch;
                                                    if ((mtch = /(\d{1,3})-(\d{1,4})-(\d{1,4})-(\d{5,})/g.exec(v.OperationDescription2)) !== null) {
                                                        BankTransferNumber = parseInt(mtch[1]);
                                                        BranchTransferNumber = parseInt(mtch[2]);
                                                        AccountTransferNumber = parseInt(mtch[4]);
                                                    } else if ((mtch = /[^\d-](\d{1,3})-(\d{1,4})-(\d{5,})/g.exec(v.OperationDescription2)) !== null) {
                                                        BankTransferNumber = parseInt(mtch[1]);
                                                        BranchTransferNumber = parseInt(mtch[2]);
                                                        AccountTransferNumber = parseInt(mtch[3]);
                                                    }
                                                    //										if (v.OperationDescription2.indexOf('-') !== -1) {
                                                    //											BankTransferNumber = v.OperationDescription2.split('-')[0].replace(/\D/g, "");
                                                    //											BranchTransferNumber = v.OperationDescription2.split('-')[1].replace(/\D/g, "");
                                                    //											AccountTransferNumber = v.OperationDescription2.split('-')[3].replace(/\D/g, "");
                                                    //										}
                                                    const transDet = resp.DebitIncomingTransferDetails || resp.DebitIncomingTransferDetailsResponse;
                                                    const kodMosad = /^\d+$/.test(transDet.MosadCode) ? transDet.MosadCode : null;
                                                    all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].DataRow.push({
                                                        "Asmachta": kodMosad !== null
                                                            ? kodMosad
                                                            : v.OperationNumber + '' + v.BranchTreasuryNumber.replace(/\D/g, ""),
                                                        "TransDesc": v.OperationDescriptionToDisplay.replace(/\s\s+/g, " "),
                                                        "ValueDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.OperationDate)), //v.ValueDate
                                                        "TransactionType": transactionType,
                                                        "TransTotal": totalOperationAmount, //v.OperationAmount,
                                                        "Balance": balance,
                                                        "IsDaily": "0",
                                                        "imgs": null,
                                                        "urnFromBank": v.Urn,
                                                        "operationCode": v.OperationCode,
                                                        "operationNumber": v.OperationNumber,
                                                        "operationOrder": v.OperationOrder,
                                                        "DepositeTransferData": [{
                                                            "DepositeTransferDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.OperationDate)), //v.ValueDate
                                                            "BankTransferNumber": BankTransferNumber,
                                                            "BranchTransferNumber": BranchTransferNumber,
                                                            "AccountTransferNumber": AccountTransferNumber,
                                                            "NamePayerTransfer": transDet.MosadName || transDet.MosadCode,
                                                            "DetailsTransfer": transDet.ReturnReason,
                                                            "TransferTotal": transDet.CreditAmount || v.OperationAmount,
                                                            "MosadCode": transDet.MosadCode
                                                        }]
                                                    });
                                                    if (i + 1 == res.CurrentAccountLastTransactions.OperationEntry.length) {
                                                        loadNextStep()
                                                    } else {

                                                        loadOshLoop()
                                                    }
                                                }
                                            })
                                            .fail(function (error, resErr) {
                                                if (i + 1 == res.CurrentAccountLastTransactions.OperationEntry.length) {
                                                    loadNextStep()
                                                } else {
                                                    loadOshLoop()
                                                }
                                            })
                                    } else {
                                        all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].DataRow.push({
                                            "Asmachta": v.OperationNumber + '' + v.BranchTreasuryNumber.replace(/\D/g, ""),
                                            "TransDesc": v.OperationDescriptionToDisplay.replace(/\s\s+/g, " "),
                                            "ValueDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.OperationDate)), //v.ValueDate
                                            "TransactionType": transactionType,
                                            "TransTotal": totalOperationAmount, //v.OperationAmount,
                                            "Balance": balance,
                                            "IsDaily": "0",
                                            "urnFromBank": v.Urn,
                                            "operationCode": v.OperationCode,
                                            "operationNumber": v.OperationNumber,
                                            "operationOrder": v.OperationOrder,
                                            "imgs": null
                                        })
                                        if (i + 1 == res.CurrentAccountLastTransactions.OperationEntry.length) {
                                            loadNextStep()
                                        } else {
                                            loadOshLoop()
                                        }
                                    }


                                    function loadNextStep() {
                                        if (res.CurrentAccountLastTransactions.FutureTransactionsBlock.FutureTransactionEntry != undefined) {
                                            $(res.CurrentAccountLastTransactions.FutureTransactionsBlock.FutureTransactionEntry).each(function (i, v) {
                                                if (!inFuture(v.ValueDate)) {
                                                    var balance = null;
                                                    if (v.EstimatedBalance !== undefined) {
                                                        balance = v.EstimatedBalance;
                                                    }
                                                    var transactionType = 1;
                                                    var totalOperationAmount = v.OperationAmount;
                                                    if (v.OperationAmount < 0) {
                                                        transactionType = 0;
                                                        totalOperationAmount = v.OperationAmount * (-1);
                                                    }
                                                    all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].DataRow.push({
                                                        "Asmachta": null,
                                                        "TransDesc": v.OperationDescriptionToDisplay.replace(/\s\s+/g, " "),
                                                        "ValueDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.OperationDate)), //v.ValueDate
                                                        "TransactionType": transactionType,
                                                        "TransTotal": totalOperationAmount, //v.OperationAmount
                                                        "Balance": balance,
                                                        "IsDaily": "1",
                                                        "urnFromBank": v.Urn,
                                                        "operationCode": v.OperationCode,
                                                        "operationNumber": v.OperationNumber,
                                                        "operationOrder": v.OperationOrder,
                                                        "imgs": null
                                                    })
                                                }
                                                if (res.CurrentAccountLastTransactions.FutureTransactionsBlock.FutureTransactionEntry.length == i + 1) {
                                                    complete();
                                                }
                                            })
                                        } else {
                                            complete();
                                        }
                                    }

                                    return false;
                                }
                            });
                        }

                        loadOshLoop();
                    } else {
                        complete();
                    }
                })
                .fail(function (error, resErr, urlParam) {
                    var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                    //			all.banks.core.services.errorLog(logErr)
                    complete();
                });

        }

        function complete() {
            if (!isSetDateFrom) {
                myEmitterLogs(12, all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].DataRow.length);
                if ((discuont.accountNow + 1) < all.banks.accounts.discuont.lengthAcc) {
                    discuont.accountNow = discuont.accountNow + 1;
                    all.banks.accounts.discuont.changeAcc();
                } else {
                    all.banks.accounts.discuont.sendOshCtrl();
                }
            } else {
                doLoad();
            }


        }

        doLoad();
    };
    discuont.loadMatah = function (data, acc) {
        var countMatahAcc = 0;
        changeSubMatahAcc(acc);

        function changeSubMatahAcc(acc) {
            $(data.CALinkedAccountsDetails.MainAccountBlock.MainAccountEntry[0].LinkedAccountsBlock.LinkedAccountEntry).each(function (i1, v1) {
                var currencyid = all.banks.core.services.getTypeCurrencyAll(v1.AccountCurrencySymbol, true);
                var accData = {
                    'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                    'AccountNumber': v1.NewAccountInfo.AccountID,
                    'BranchNumber': acc.BranchNumber,
                    'Balance': v1.AccountBalance,
                    'AccountCredit': null,
                    "BankAccountTypeId": acc.AccountNumber,
                    "CurrencyId": currencyid
                };
                if (i1 == countMatahAcc) {
                    countMatahAcc++;
                    all.banks.generalVariables.allDataArrMatah.BankData[0].Account.push(accData);
                    all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow = [];

                    var url = "https://start.telebank.co.il/Titan/gatewayAPI/foreignLastTransactions/" + all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc + "/ByDate?IsCategoryDescCode=True&IsTransactionDetails=True&IsFutureTransactionFlag=True&IsEventNames=True&ForeignBankID=" + v1.NewAccountInfo.BankID + "&ForeignBranchID=" + v1.NewAccountInfo.BranchID + "&ForeignControlDigits=&ForeignAccountID=" + v1.NewAccountInfo.AccountID + "&FromAmount=0&ToAmount=999999999999.99&FromDate=" + all.banks.accounts.discuontAsakimPlus.datebacksleshMatah + "&ToDate=" + all.banks.accounts.discuontAsakimPlus.datebacksleshToMatah;
                    all.banks.core.services.httpReq(url, 'GET', null, false, false)
                        .then(function (res) {
                            if (res.Error == undefined) {
                                var counter = 0;

                                function loadOshLoop() {
                                    $(res.FALastTransactions.OperationEntry).each(function (i, v) {
                                        var balance = null;
                                        if (i == counter) {
                                            counter = counter + 1;
                                            if (v.BalanceAfterOperation !== undefined) {
                                                balance = v.BalanceAfterOperation;
                                            }
                                            var transactionType = 1;
                                            var totalOperationAmount = v.OperationAmount;
                                            if (v.OperationAmount < 0) {
                                                transactionType = 0;
                                                totalOperationAmount = v.OperationAmount * (-1);
                                            }
                                            // if (all.banks.accountDetails.checks == true && v.OperationDetailsServiceName == "ChecksDetails") {
                                            //     var req = {
                                            //         "AccountNumber": all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc,
                                            //         "OperationBranch": v.OperationBranch,
                                            //         "LastTransactionFlag": "True",
                                            //         "OperationCode": v.OperationCode,
                                            //         "Urn": v.Urn,
                                            //         "OperationBank": v.OperationBank,
                                            //         "ValueDate": v.ValueDate,
                                            //         "BusinessDayDate": v.BusinessDayDate
                                            //     };
                                            //     if (v.OperationCode == "036" && v.DepositNumber !== undefined) {
                                            //         req.DepositNumber = v.DepositNumber
                                            //     }
                                            //     $.when(discuont.loadChecks(req, all.banks.accounts.discuont.accArr[discuont.accountNow], v)).then(function (status) {
                                            //         req = null;
                                            //         all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].DataRow.push({
                                            //             "Asmachta": v.OperationNumber + '' + v.BranchTreasuryNumber.replace(/\D/g, ""),
                                            //             "TransDesc": v.OperationDescriptionToDisplay.replace(/\s\s+/g, " "),
                                            //             "ValueDate": v.OperationDate,
                                            //             "TransactionType": transactionType,
                                            //             "TransTotal": totalOperationAmount,
                                            //             "Balance": balance,
                                            //             "IsDaily": "0",
                                            //             "imgs": status
                                            //         });
                                            //         if (i + 1 == res.CurrentAccountLastTransactions.OperationEntry.length) {
                                            //             loadNextStep()
                                            //         }
                                            //         else {
                                            //             loadOshLoop()
                                            //         }
                                            //     });
                                            // }
                                            if (v.OperationDetailsServiceName == "TransactionDetails") {
                                                var urls = "https://start.telebank.co.il/Titan/gatewayAPI/transactionDetails/" + all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc + "/" + v.OperationNumber + "?NewForeignAccountInfoBankID=" + data.CALinkedAccountsDetails.MainAccountBlock.MainAccountEntry[0].LinkedAccountsBlock.LinkedAccountEntry[0].NewAccountInfo.BankID + "&NewForeignAccountInfoBranchID=" + data.CALinkedAccountsDetails.MainAccountBlock.MainAccountEntry[0].LinkedAccountsBlock.LinkedAccountEntry[0].NewAccountInfo.BranchID + "&NewForeignAccountInfoControlDigits=&" + "NewForeignAccountInfoAccountID=" + data.CALinkedAccountsDetails.MainAccountBlock.MainAccountEntry[0].LinkedAccountsBlock.LinkedAccountEntry[0].NewAccountInfo.AccountID;
                                                all.banks.core.services.httpReq(urls, 'GET', null, false, false)
                                                    .then(function (response) {
                                                        var depositeTransferData = null;
                                                        if (!response.Error) {
                                                            depositeTransferData = [{
                                                                "DepositeTransferDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.OperationDate)), //v.ValueDate
                                                                "BankTransferNumber": parseFloat(response.TransactionDetails.BeneficiaryBankNumber),
                                                                "BranchTransferNumber": parseFloat(response.TransactionDetails.BeneficiaryBranchNumber),
                                                                "AccountTransferNumber": parseFloat(response.TransactionDetails.BeneficiaryAccountNumber),
                                                                "NamePayerTransfer": response.TransactionDetails.BeneficiaryAccountName,
                                                                "DetailsTransfer": response.TransactionDetails.Comments,
                                                                "TransferTotal": v.OperationAmount
                                                            }]
                                                        }

                                                        all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.push({
                                                            "Asmachta": v.OperationNumber + '' + v.BranchTreasuryNumber.replace(/\D/g, ""),
                                                            "TransDesc": v.OperationDescriptionToDisplay.replace(/\s\s+/g, " "),
                                                            "ValueDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.OperationDate)),//v.ValueDate
                                                            "TransactionType": transactionType,
                                                            "TransTotal": totalOperationAmount, //v.OperationAmount
                                                            "Balance": balance,
                                                            "IsDaily": "0",
                                                            "imgs": null,
                                                            "urnFromBank": v.Urn,
                                                            "operationCode": v.OperationCode,
                                                            "operationNumber": v.OperationNumber,
                                                            "operationOrder": v.OperationOrder,
                                                            "DepositeTransferData": depositeTransferData
                                                        });
                                                        if (i + 1 == res.FALastTransactions.OperationEntry.length && data.CALinkedAccountsDetails.MainAccountBlock.MainAccountEntry[0].LinkedAccountsBlock.LinkedAccountEntry.length == i1 + 1) {
                                                            if ((discuont.accountNow + 1) < all.banks.accounts.discuont.lengthAcc) {
                                                                discuont.accountNow = discuont.accountNow + 1;
                                                                all.banks.accounts.discuont.changeAcc(discuont.matah)
                                                            } else {
                                                                myEmitterLogs(12, all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.length);
                                                                all.banks.accountDetails.MATAH_DAY_TO_RUN = -1;
                                                                all.banks.accounts.discuont.sendOshCtrl(discuont.matah);
                                                            }
                                                        } else if (i + 1 == res.FALastTransactions.OperationEntry.length) {
                                                            changeSubMatahAcc(acc);
                                                        } else {
                                                            loadOshLoop()
                                                        }
                                                    })
                                                    .fail(function (error, resErr) {
                                                        if (i + 1 == res.CurrentAccountLastTransactions.OperationEntry.length) {
                                                            loadNextStep(discuont.matah)
                                                        } else {
                                                            loadOshLoop()
                                                        }
                                                    })
                                            }
                                                // else if (v.OperationDetailsServiceName == "CreditIncomingTransferDetails") {
                                                //     var dataReq = {
                                                //         "AccountNumber": all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc,
                                                //         "Urn": v.Urn
                                                //     };
                                                //     var url = "https://start.telebank.co.il/Titan/gatewayAPI/creditIncomingTransferDetails?c=" + all.banks.accounts.discuont.accArr[discuont.accountNow].uuid;
                                                //     all.banks.core.services.httpReq(url, 'POST', dataReq, false, false)
                                                //         .then(function (resp) {
                                                //             var BankTransferNumber = null, BranchTransferNumber = null, AccountTransferNumber = null;
                                                //             if (resp.Error) {
                                                //                 all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].DataRow.push({
                                                //                     "Asmachta": v.OperationNumber + '' + v.BranchTreasuryNumber.replace(/\D/g, ""),
                                                //                     "TransDesc": v.OperationDescriptionToDisplay.replace(/\s\s+/g, " "),
                                                //                     "ValueDate": v.OperationDate,//v.ValueDate
                                                //                     "TransactionType": transactionType,
                                                //                     "TransTotal": totalOperationAmount, //v.OperationAmount,
                                                //                     "Balance": balance,
                                                //                     "IsDaily": "0",
                                                //                     "imgs": null
                                                //                 })
                                                //                 if (i + 1 == res.CurrentAccountLastTransactions.OperationEntry.length) {
                                                //                     loadNextStep()
                                                //                 }
                                                //                 else {
                                                //                     loadOshLoop()
                                                //                 }
                                                //             }
                                                //             else {
                                                //                 if (v.OperationDescription2.indexOf('-') !== -1) {
                                                //                     BankTransferNumber = v.OperationDescription2.split('-')[0].replace(/\D/g, "");
                                                //                     BranchTransferNumber = v.OperationDescription2.split('-')[1].replace(/\D/g, "");
                                                //                     AccountTransferNumber = v.OperationDescription2.split('-')[3].replace(/\D/g, "");
                                                //                 }
                                                //                 all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].DataRow.push({
                                                //                     "Asmachta": v.OperationNumber + '' + v.BranchTreasuryNumber.replace(/\D/g, ""),
                                                //                     "TransDesc": v.OperationDescriptionToDisplay.replace(/\s\s+/g, " "),
                                                //                     "ValueDate": v.OperationDate,//v.ValueDate
                                                //                     "TransactionType": transactionType,
                                                //                     "TransTotal": totalOperationAmount, //v.OperationAmount,
                                                //                     "Balance": balance,
                                                //                     "IsDaily": "0",
                                                //                     "imgs": null,
                                                //                     "DepositeTransferData": [{
                                                //                         "DepositeTransferDate": v.OperationDate,//v.ValueDate
                                                //                         "BankTransferNumber": BankTransferNumber,
                                                //                         "BranchTransferNumber": BranchTransferNumber,
                                                //                         "AccountTransferNumber": AccountTransferNumber,
                                                //                         "NamePayerTransfer": resp.CreditIncomingTransferDetails.MaavirName,
                                                //                         "DetailsTransfer": resp.CreditIncomingTransferDetails.FreeText,
                                                //                         "TransferTotal": v.OperationAmount
                                                //                     }]
                                                //                 });
                                                //                 if (i + 1 == res.CurrentAccountLastTransactions.OperationEntry.length) {
                                                //                     loadNextStep()
                                                //                 }
                                                //                 else {
                                                //
                                                //                     loadOshLoop()
                                                //                 }
                                                //             }
                                                //         })
                                                //         .fail(function (error, resErr) {
                                                //             if (i + 1 == res.CurrentAccountLastTransactions.OperationEntry.length) {
                                                //                 loadNextStep()
                                                //             }
                                                //             else {
                                                //                 loadOshLoop()
                                                //             }
                                                //         })
                                            // }
                                            else {
                                                all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.push({
                                                    "Asmachta": v.OperationNumber + '' + v.BranchTreasuryNumber.replace(/\D/g, ""),
                                                    "TransDesc": v.OperationDescriptionToDisplay.replace(/\s\s+/g, " "),
                                                    "ValueDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(v.OperationDate)),//v.ValueDate
                                                    "TransactionType": transactionType,
                                                    "TransTotal": totalOperationAmount,//v.OperationAmount,
                                                    "Balance": balance,
                                                    "IsDaily": "0",
                                                    "urnFromBank": v.Urn,
                                                    "operationCode": v.OperationCode,
                                                    "operationNumber": v.OperationNumber,
                                                    "operationOrder": v.OperationOrder,
                                                    "imgs": null
                                                })
                                                if (i + 1 == res.FALastTransactions.OperationEntry.length && data.CALinkedAccountsDetails.MainAccountBlock.MainAccountEntry[0].LinkedAccountsBlock.LinkedAccountEntry.length == i1 + 1) {
                                                    if ((discuont.accountNow + 1) < all.banks.accounts.discuont.lengthAcc) {
                                                        discuont.accountNow = discuont.accountNow + 1;
                                                        all.banks.accounts.discuont.changeAcc(discuont.matah)
                                                    } else {
                                                        myEmitterLogs(12, all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.length);
                                                        all.banks.accountDetails.MATAH_DAY_TO_RUN = -1;
                                                        all.banks.accounts.discuont.sendOshCtrl(discuont.matah);
                                                    }
                                                } else if (i + 1 == res.FALastTransactions.OperationEntry.length) {
                                                    changeSubMatahAcc(acc);
                                                } else {
                                                    loadOshLoop()
                                                }
                                            }
                                            // function loadNextStep(matah) {
                                            //     if (res.CurrentAccountLastTransactions.FutureTransactionsBlock.FutureTransactionEntry != undefined) {
                                            //         $(res.CurrentAccountLastTransactions.FutureTransactionsBlock.FutureTransactionEntry).each(function (i, v) {
                                            //             var balance = null;
                                            //             if (v.EstimatedBalance !== undefined) {
                                            //                 balance = v.EstimatedBalance;
                                            //             }
                                            //             var transactionType = 1;
                                            //             var totalOperationAmount = v.OperationAmount;
                                            //             if (v.OperationAmount < 0) {
                                            //                 transactionType = 0;
                                            //                 totalOperationAmount = v.OperationAmount * (-1);
                                            //             }
                                            //             all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.push({
                                            //                 "Asmachta": null,
                                            //                 "TransDesc": v.OperationDescriptionToDisplay.replace(/\s\s+/g, " "),
                                            //                 "ValueDate": v.OperationDate,//v.ValueDate
                                            //                 "TransactionType": transactionType,
                                            //                 "TransTotal": totalOperationAmount,//v.OperationAmount
                                            //                 "Balance": balance,
                                            //                 "IsDaily": "1",
                                            //                 "imgs": null
                                            //             })
                                            //             if (res.CurrentAccountLastTransactions.FutureTransactionsBlock.FutureTransactionEntry.length == i + 1) {
                                            //                 if ((discuont.accountNow + 1) < all.banks.accounts.discuont.lengthAcc) {
                                            //                     myEmitterLogs(12, all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.length);
                                            //                     discuont.accountNow = discuont.accountNow + 1;
                                            //                     all.banks.accounts.discuont.changeAcc(discuont.matah)
                                            //                 }
                                            //                 else {
                                            //                     myEmitterLogs(12, all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.length);
                                            //                     all.banks.accounts.discuont.sendOshCtrl(discuont.matah);
                                            //                 }
                                            //             }
                                            //         })
                                            //     }
                                            //     else {
                                            //         if ((discuont.accountNow + 1) < all.banks.accounts.discuont.lengthAcc) {
                                            //             myEmitterLogs(12, all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.length);
                                            //             discuont.accountNow = discuont.accountNow + 1;
                                            //             all.banks.accounts.discuont.changeAcc(discuont.matah)
                                            //         }
                                            //         else {
                                            //             myEmitterLogs(12, all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.length);
                                            //             all.banks.accounts.discuont.sendOshCtrl(discuont.matah);
                                            //         }
                                            //     }
                                            // }

                                            return false;
                                        }
                                    });
                                }

                                loadOshLoop()
                            } else {
                                changeSubMatahAcc(acc);
                                // myEmitterLogs(12, all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.length);
                                // if ((discuont.accountNow + 1) < all.banks.accounts.discuont.lengthAcc) {
                                //     discuont.accountNow = discuont.accountNow + 1;
                                //     all.banks.accounts.discuont.changeAcc(matah)
                                // }
                                // else {
                                //     all.banks.accountDetails.MATAH_DAY_TO_RUN = -1;
                                //     all.banks.accounts.discuont.sendOshCtrl(matah);
                                // }
                            }
                        })
                        .fail(function (error, resErr, urlParam) {
                            var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                            all.banks.core.services.errorLog(logErr)
                        });
                    return false;
                }
                if (data.CALinkedAccountsDetails.MainAccountBlock.MainAccountEntry[0].LinkedAccountsBlock.LinkedAccountEntry.length == i1 + 1) {
                    if ((discuont.accountNow + 1) < all.banks.accounts.discuont.lengthAcc) {
                        myEmitterLogs(12, all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.length);
                        discuont.accountNow = discuont.accountNow + 1;
                        all.banks.accounts.discuont.changeAcc(discuont.matah)
                    } else {
                        myEmitterLogs(12, all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.length);
                        all.banks.accountDetails.MATAH_DAY_TO_RUN = -1;
                        all.banks.accounts.discuont.sendOshCtrl(discuont.matah);
                    }
                }
            })
        }
    };
    discuont.CurrencyId = function (type) {
        if (type != null && type.indexOf('EUR') !== -1) {
            return 11;
        } else if (type != null && type.indexOf('€') !== -1) {
            return 11;
        } else if (type != null && type.indexOf('$') !== -1) {
            return 2;
        } else if (type != null && type.indexOf('דולר') !== -1) {
            return 2;
        } else if (type != null && type.indexOf('USD') !== -1) {
            return 2;
        } else if (type != null && type.indexOf('HKD') !== -1) {
            return 9;
        } else if (type != null && type.indexOf('YUN') !== -1) {
            return 30;
        } else if (type != null && type.indexOf('JPY') !== -1) {
            return 15;
        } else {
            return 1;
        }
    };
    discuont.loadCardDea = function (numCard) {
        var dfd = $.Deferred();
        all.banks.core.services.httpReq("https://start.telebank.co.il/Titan/gatewayAPI/creditCards/cardCurrentDebitTransactions/" + all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc + "/C?CardNumber=" + numCard.CardNumber, 'GET', null, false, false)
            .then(function (res) {
                if (res.Error == undefined) {
                    const firstWithDebitDate = res.CardCurrentDebitTransactions.CardDebitsTransactionsBlock.CardDebitsTransactionEntry
                        .find(cdte => cdte.DebitDate);
                    var dataMonthlyCycle = {
                        'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                        'AccountNumber': all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].AccountNumber,
                        'BranchNumber': all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BranchNumber,
                        'NextTotal': res.CardCurrentDebitTransactions.NISTotalDebit,
                        'CardNumber': numCard.CardNumber,
                        'CardType': all.banks.core.services.getTypeCard(res.CardCurrentDebitTransactions.CardDebitsTransactionsBlock.CardDebitsTransactionEntry[0].CardFamilyDescription),
                        'NextBillingDate': firstWithDebitDate ? firstWithDebitDate.DebitDate : null
                    }
                    if ($(res.CardCurrentDebitTransactions.CardDebitsTransactionsBlock.CardDebitsTransactionEntry).length) {
                        $(res.CardCurrentDebitTransactions.CardDebitsTransactionsBlock.CardDebitsTransactionEntry)
                            .each(function (indx, val) {
                                if (val.TempPurchaseFlag !== 'T') {
                                    var totalPaymentsSum = null, currentPaymentNumSum = null;
                                    if (val.InstallmentNumber !== undefined && val.InstallmentNumber !== '') {
                                        currentPaymentNumSum = parseInt(val.InstallmentNumber);
                                        totalPaymentsSum = parseInt(val.TotalNumberOfInstallments);
                                    }
                                    all.banks.generalVariables.allDataArrAshrai.push({
                                        "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                        "Token": all.banks.accountDetails.bank.token,
                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                        "BranchNumber": dataMonthlyCycle.BranchNumber,
                                        "AccountNumber": dataMonthlyCycle.AccountNumber,
                                        "CardNumber": val.CardNumber,
                                        "NextBillingDate": all.banks.core.services.convertDateAll(
                                            discuont.convertDateLocal(val.DebitDate ? val.DebitDate : dataMonthlyCycle['NextBillingDate'])),
                                        "NextCycleTotal": dataMonthlyCycle.NextTotal,
                                        "CardStatus": null,
                                        "TransDesc": val.MerchantName.replace(/\s\s+/g, " "),
                                        "TransTotal": val.DebitAmount ? val.DebitAmount : 0,
                                        "ValueDate": all.banks.core.services.convertDateAll(
                                            discuont.convertDateLocal(val.PurchaseDate ? val.PurchaseDate : val.DebitDate)),
                                        "TransCategory": null,
                                        "TotalPayments": totalPaymentsSum,
                                        "CurrentPaymentNum": currentPaymentNumSum,
                                        "CardType": dataMonthlyCycle.CardType,
                                        "indFakeDate": 0,
                                        "currency_id": all.banks.core.services.getTypeCurrencyAll(val.PurchaseCurrencyCode),
                                        "original_total": val.PurchaseAmount,
                                        "ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(val.DebitCurrencyCode),
                                        "comment": val.PurchaseTypeDescription
                                    });
                                }
                                if ($(res.CardCurrentDebitTransactions.CardDebitsTransactionsBlock.CardDebitsTransactionEntry).length == indx + 1) {
                                    loadMonthPrev(0)
                                }
                            })
                    } else {
                        loadMonthPrev(0);
                    }
                } else {
                    var dataMonthlyCycle = {
                        'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                        'AccountNumber': all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].AccountNumber,
                        'BranchNumber': all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BranchNumber,
                        'NextTotal': null,
                        'CardNumber': numCard.CardNumber,
                        'CardType': null,
                        'NextBillingDate': null
                    }
                    loadMonthPrev(0);
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });

        function loadMonthPrev(numnerLopp) {
            var loopNum = numnerLopp;

            function loop() {
                $(discuont.arrMonth).each(function (i, v) {
                    if (loopNum == i) {
                        loopNum = loopNum + 1;
                        all.banks.core.services.httpReq("https://start.telebank.co.il/Titan/gatewayAPI/creditCards/cardPastDebitTransactions/" + all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc + "/" + v + "/C?CardNumber=" + numCard.CardNumber, 'GET', null, false, false)
                            .then(function (res) {
                                if (res.Error == undefined) {
                                    const firstWithDebitDate = res.CardPastDebitTransactions.CardDebitsTransactionsBlock.CardDebitsTransactionEntry
                                        .find(cdte => cdte.DebitDate);
                                    var dataMonthlyCycle = {
                                        'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                        'AccountNumber': all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].AccountNumber,
                                        'BranchNumber': all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BranchNumber,
                                        'NextTotal': res.CardPastDebitTransactions.NISTotalDebit,
                                        'CardNumber': numCard.CardNumber,
                                        'CardType': all.banks.core.services.getTypeCard(res.CardPastDebitTransactions.CardDebitsTransactionsBlock.CardDebitsTransactionEntry[0].CardFamilyDescription),
                                        'NextBillingDate': firstWithDebitDate ? firstWithDebitDate.DebitDate : null
                                    }
                                    myEmitterLogs(33, dataMonthlyCycle.AccountNumber);
                                    myEmitterLogs(15, dataMonthlyCycle.CardNumber + ' period ' + dataMonthlyCycle.NextBillingDate);
                                    if ($(res.CardPastDebitTransactions.CardDebitsTransactionsBlock.CardDebitsTransactionEntry).length) {
                                        $(res.CardPastDebitTransactions.CardDebitsTransactionsBlock.CardDebitsTransactionEntry).each(function (indx, val) {
                                            if (val.TempPurchaseFlag !== 'T') {
                                                var totalPaymentsSum = null, currentPaymentNumSum = null;
                                                if (val.PurchaseComments !== undefined && val.PurchaseComments !== '' && ((val.PurchaseComments.indexOf('מ -')) !== -1) && val.PurchaseDescription == "תשלום-ישראל") {
                                                    currentPaymentNumSum = parseInt(val.PurchaseComments.split('מ -')[0]);
                                                    totalPaymentsSum = parseInt(val.PurchaseComments.split('מ -')[1]);
                                                }
                                                all.banks.generalVariables.allDataArrAshrai.push({
                                                    "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                                    "Token": all.banks.accountDetails.bank.token,
                                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                                    "BranchNumber": dataMonthlyCycle.BranchNumber,
                                                    "AccountNumber": dataMonthlyCycle.AccountNumber,
                                                    "CardNumber": val.CardNumber,
                                                    "NextBillingDate": all.banks.core.services.convertDateAll(
                                                        discuont.convertDateLocal(val.DebitDate ? val.DebitDate : dataMonthlyCycle['NextBillingDate'])),
                                                    "NextCycleTotal": dataMonthlyCycle.NextTotal,
                                                    "CardStatus": null,
                                                    "TransDesc": val.MerchantName,
                                                    "TransTotal": val.DebitAmount ? val.DebitAmount : 0,
                                                    "ValueDate": all.banks.core.services.convertDateAll(discuont.convertDateLocal(val.PurchaseDate ? val.PurchaseDate : val.DebitDate)),
                                                    "TransCategory": null,
                                                    "TotalPayments": totalPaymentsSum,
                                                    "CurrentPaymentNum": currentPaymentNumSum,
                                                    "CardType": dataMonthlyCycle.CardType,
                                                    "indFakeDate": 0,
                                                    "currency_id": all.banks.core.services.getTypeCurrencyAll(val.CalPurchaseCurrencySymbol),
                                                    "original_total": val.PurchaseAmount,
                                                    "ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(val.DebitCurrencySymbol),
                                                    "comment": val.PurchaseDescription
                                                });
                                            }

                                            if ($(res.CardPastDebitTransactions.CardDebitsTransactionsBlock.CardDebitsTransactionEntry).length == indx + 1) {
                                                if (discuont.arrMonth.length == (i + 1)) {
                                                    dfd.resolve(true);
                                                } else {
                                                    loop()
                                                }
                                            }
                                        })
                                    } else {
                                        if (discuont.arrMonth.length == (i + 1)) {
                                            dfd.resolve(true);
                                        } else {
                                            loop()
                                        }
                                    }
                                } else {
                                    var dataMonthlyCycle = {
                                        'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                        'AccountNumber': all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].AccountNumber,
                                        'BranchNumber': all.banks.generalVariables.allDataArr.BankData[0].Account[discuont.accountNow].BranchNumber,
                                        'NextTotal': null,
                                        'CardNumber': numCard.CardNumber,
                                        'CardType': null,
                                        'NextBillingDate': null
                                    }
                                    if (discuont.arrMonth.length == (i + 1)) {
                                        dfd.resolve(true);
                                    } else {
                                        loop()
                                    }
                                }
                            })
                            .fail(function (error, resErr, urlParam) {
                                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                                all.banks.core.services.errorLog(logErr)
                            });
                        return false;
                    }
                })
            }

            loop();
        }

        return dfd.promise();
    };
    discuont.loadCard = function () {
        all.banks.core.services.httpReq("https://start.telebank.co.il/Titan/gatewayAPI/creditCards/cardsPastOrFutureDebitTotal/" + all.banks.accounts.discuont.accArr[discuont.accountNow].numberAcc + "/F", 'GET', null, false, false)
            .then(function (res) {
                if (res.Error == undefined && !!res.CardsPastOrFutureDebitTotal && !!res.CardsPastOrFutureDebitTotal.CardsBlock) {
                    var idx = 0;

                    function loadListOfCard() {
                        $(res.CardsPastOrFutureDebitTotal.CardsBlock.CardsEntry).each(function (i, v) {
                            if (i == idx) {
                                idx += 1;
                                if (v.IsCardCanceled == 'N' || v.IsCardCanceled == 'Y') {
                                    $.when(discuont.loadCardDea(v))
                                        .then(function (numberCard) {
                                            if (i + 1 == res.CardsPastOrFutureDebitTotal.CardsBlock.CardsEntry.length) {
                                                if ((discuont.accountNow + 1) < all.banks.accounts.discuont.lengthAcc) {
                                                    discuont.accountNow = discuont.accountNow + 1;
                                                    all.banks.accounts.discuont.changeAccAshrai()
                                                } else {
                                                    all.banks.accounts.discuont.sendCardsCtrl()
                                                }
                                            } else {
                                                loadListOfCard();
                                            }
                                        })
                                    return false;
                                } else {
                                    if (i + 1 == res.CardsPastOrFutureDebitTotal.CardsBlock.CardsEntry.length) {
                                        if ((discuont.accountNow + 1) < all.banks.accounts.discuont.lengthAcc) {
                                            discuont.accountNow = discuont.accountNow + 1;
                                            all.banks.accounts.discuont.changeAccAshrai()
                                        } else {
                                            all.banks.accounts.discuont.sendCardsCtrl()
                                        }
                                    }
                                }
                            }
                        })
                    }

                    loadListOfCard();
                } else {
                    if ((discuont.accountNow + 1) < all.banks.accounts.discuont.lengthAcc) {
                        discuont.accountNow = discuont.accountNow + 1;
                        all.banks.accounts.discuont.changeAccAshrai()
                    } else {
                        all.banks.accounts.discuont.sendCardsCtrl()
                    }
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    }
    discuont.logOut = async function () {
        try {
            await all.banks.core.services.httpReq("https://start.telebank.co.il/Trade/index.php/logout/index/402", 'GET', null, false, false);
            await all.banks.core.services.httpReq("https://start.telebank.co.il/Retail/discountinternet/portal/coex.asmx/Logout?reason=CoexUserExit", 'GET', null, false, false);
            await all.banks.core.services.httpReq("https://start.telebank.co.il/Titan/gatewayAPI/logout/LogoutButton/PRTL_EXIT_BUTTON_CLICKED?EndWebActivity=True", 'GET', null, false, false);
            all.banks.core.services.httpReq("https://start.telebank.co.il/pkmslogout", 'GET', null, false, false);
            $('#filecontainerlogin').attr('src', '')
            myEmitterLogs(25);
        } catch (e) {
            $('#filecontainerlogin').attr('src', '')
            myEmitterLogs(25);
        }
    };
    discuont.dateFromDDMMYYOrNull = function (dateStr, prevCenturyPossible) {
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
    };
    return discuont;
}();
