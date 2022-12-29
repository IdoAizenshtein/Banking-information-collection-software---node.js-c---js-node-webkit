all.banks.accounts.fibi = function () {
    var fibi = {
        attemptNo: 1,
        imageScale: 0.1
    };
    fibi.changeIp = function (changeInMiddle) {
        if (fibi.timeToTry === undefined) {
            fibi.timeToTry = 0;
        }
        fibi.timeToTry += 1;
        writeLog("---- Start ChangeIp----");
        all.banks.core.main.changeIpV4(true).then(function (res) {
            setTimeout(() => {
                if (changeInMiddle == undefined) {
                    fibi.login();
                } else {
                    changeInMiddle();
                }
            }, 1500);
            // if (res) {
            //     fibi.timeToTry = undefined;
            //     setTimeout(() => {
            //         if (changeInMiddle == undefined) {
            //             fibi.login();
            //         } else {
            //             changeInMiddle();
            //         }
            //     }, 1500);
            // } else {
            //     $.get("http://icanhazip.com")
            //         .done(function (ipAddrress) {
            //             ipAddrress = ipAddrress.replace(/\s/g, "");
            //             writeLog('IP is blocked - ' + ipAddrress + 'spiderId:' + all.banks.spiderConfig.spiderId);
            //             if (fibi.timeToTry > 10) {
            //                 myEmitterLogs(9, 'IP is blocked - ' + ipAddrress + 'spiderId:' + all.banks.spiderConfig.spiderId);
            //                 setTimeout(() => {
            //                     if (changeInMiddle == undefined) {
            //                         fibi.login();
            //                     } else {
            //                         changeInMiddle();
            //                     }
            //                 }, 1500);
            //             } else {
            //                 fibi.changeIp(changeInMiddle);
            //             }
            //         });
            // }
        });
    }
    fibi.timeToTry = undefined;
    fibi.mapCards = [];
    fibi.login = function () {
        localStorage.removeItem('users')
        localStorage.removeItem('rxvt')
        localStorage.removeItem('rxVisitor')
        sessionStorage.removeItem("currentSession")
        var branch = $("#branch").val();
        var account = $("#account").val();
        var subAccount = $("#subAccount").val();
        fibi.isSetAccAndBranch = branch !== '' && account !== '';
        fibi.isSetSubAcc = subAccount !== '';
        fibi.BankNumber = parseInt(all.banks.accountDetails.bank.BankNumber);
        fibi.days = false;
        fibi.cards = false;
        fibi.nilvim = false;
        fibi.nilvimDeposit = false;
        fibi.nilvimDueChecks = false;
        fibi.nilvimStandingOrders = false;
        fibi.matah = false;
        fibi.ddAccAshrai = 0;
        fibi.ddASubAccMatah = 0;
        fibi.ddAshrai = 0;
        fibi.ddTime = 0;
        fibi.arrMonthCycle = [];
        fibi.paramLoad = 0;
        fibi.ind = 0;
        fibi.indCompany = 0;
        fibi.arr = [];
        fibi.timeOutFunc;

        if (parseInt(all.banks.accountDetails.bank.BankNumber) == 31) {
            all.banks.accounts.fibi.urlServices = 'online.fibi.co.il';
            all.banks.accounts.fibi.bankids = 'FIBIPORTAL'
        }
        if (parseInt(all.banks.accountDetails.bank.BankNumber) == 46) {
            all.banks.accounts.fibi.urlServices = 'online.bankmassad.co.il';
            all.banks.accounts.fibi.bankids = 'MASADPRTAL'
        }
        if (parseInt(all.banks.accountDetails.bank.BankNumber) == 52) {
            all.banks.accounts.fibi.urlServices = 'online.pagi.co.il';
            all.banks.accounts.fibi.bankids = 'PAGIPORTAL'
        }
        if (parseInt(all.banks.accountDetails.bank.BankNumber) == 126) {
            all.banks.accounts.fibi.urlServices = 'online.fibi.co.il';
            all.banks.accounts.fibi.bankids = 'FIBIPORTAL'
        }
        if (parseInt(all.banks.accountDetails.bank.BankNumber) == 14) {
            all.banks.accounts.fibi.urlServices = 'online.bankotsar.co.il';
            all.banks.accounts.fibi.bankids = 'OTSARPRTAL'
        }


        // all.banks.accountDetails.bank.username = all.banks.accountDetails.bank.username.replace(/[\W_]+/g, '');
        // all.banks.accountDetails.bank.password = all.banks.accountDetails.bank.password.replace(/[\W_]+/g, '');
        all.banks.accountDetails.bank.password = all.banks.accountDetails.bank.password.slice(0, 14);

        let counterSeconds = 0;
        let timeToRunAgain = setTimeout(() => {
            if (counterSeconds === 0) {
                counterSeconds = 2;
                writeLog("---- Pending login2.do for a long time - changeIp----");
                fibi.changeIp();
            }
        }, 15000);

        function loadAuto() {
            $.get("https://www." + all.banks.accounts.fibi.urlServices.split('online.')[1] + "/wps/portal/")
                .done(function (res) {
                    if (counterSeconds === 0) {
                        counterSeconds = 1;
                        clearTimeout(timeToRunAgain);
                        try {
                            var data = all.banks.core.services.parseHtml(res);
                            var mymessage = data.find("#mymessage");
                            if (mymessage.length && mymessage.text().includes("אינו זמין")) {
                                myEmitterLogs(9, 'system unavailable');
                            } else {
                                var endpoint = "https://" + all.banks.accounts.fibi.urlServices;
                                var bankNum = "0" + parseInt(all.banks.accountDetails.bank.BankNumber);

                                if (parseInt(all.banks.accountDetails.bank.BankNumber) === 126) {
                                    endpoint = "https://online.fibi.co.il";
                                    bankNum = "031";
                                }

                                var appId = "rest_app_" + bankNum;
                                var policyId = "Login";
                                var cryptoMode = com.ts.mobile.sdk.ConnectionCryptoMode.Full;
                                var connectionSettings = com.ts.mobile.sdk.SDKConnectionSettings.createWithCryptoMode(endpoint, appId, null, null, cryptoMode);
                                var sdk = xmsdk.XmSdk();
                                sdk.setConnectionSettings(connectionSettings);
                                var myHandler = new MyUIHandler(sdk.host);
                                sdk.setUiHandler(myHandler);
                                window.submitLoginForm = false;
                                sdk.initialize().then(function () {
                                    var transmitContainer = $('<div name="login" id="loginDiv"><form name="login" id="loginForm" autocomplete="off"><div class="input-holder"><input type="text" id="username"autocomplete="off" name="username" maxlength="15" class="username form-control form-input" aria-label="קוד משתמש" aria-describedby="usernameError inputValidationMsg validationMsg serverErrorMsg serverErrorMsgTransmit msgCont" tabindex="1" placeholder="קוד משתמש" autofocus/> <div class="input-help"><div class="question"><button type="button" id="tooltiptrigger1" aria-label="עזרה קוד משתמש" class="question_a" role="button" tabindex="4" aria-describedby="tooltip-1">?</button></div><div id="tooltip-1" class="lightbox-menu" role="tooltip"><div><h3>קוד משתמש</h3><span></span><div class="tooltip-content"><p>קוד משתמש (4-9 תווים) אותיות לועזיות וספרות בלבד</p></div></div></div></div></div><div class="input-holder min_marging2 lastholder"><input type="password" id="password" name="password" autocomplete="new-password" maxlength="8" class="password form-control form-input" aria-label="סיסמה" aria-describedby="passwordError" tabindex="2" placeholder="סיסמה"/><div class="input-help"><div class="question"><button type="button" id="tooltiptrigger2" aria-label="עזרה סיסמה" class="question_a" role="button" tabindex="5" aria-describedby="tooltip-2">?</button></div><div id="tooltip-2" class="lightbox-menu" role="tooltip"><div><h3>סיסמה</h3><span></span><div class="tooltip-content"><p>הסיסמה תכלול בין 6-8 תווים ספרות ואותיות באנגלית בלבד</p></div></div></div></div></div><div class="ErrorHolder"><div class="info_msg" id="msgCont"><p id="mymessage"></p></div></div><input id="continueBtn" type="button" aria-label="כניסה" tabindex="3" class="btn login min_marging margin_shortbody" value="כניסה"/></form></div>');
                                    transmitContainer.find('#username').val(all.banks.accountDetails.bank.username)
                                    transmitContainer.find('#password').val(all.banks.accountDetails.bank.password)

                                    sdk.logout().then(function () {
                                        authenticateTransmit()
                                    }).catch(function (err) {
                                        var err_text = JSON.stringify(err);
                                        console.log('Logout error: ' + err_text);
                                        sessionStorage.removeItem("currentSession");
                                        authenticateTransmit();
                                    });

                                    function authenticateTransmit() {
                                        var clientContext = {uiContainer: transmitContainer};
                                        var additional_params = {
                                            "bankId": bankNum
                                        };
                                        sdk.authenticate(all.banks.accountDetails.bank.username, policyId, additional_params, clientContext)
                                            .then(function (successfulAuth) {
                                                    const token = successfulAuth.getToken();
                                                    var data = {
                                                        isPaymentProc: false,
                                                        KODSAFA: 'HE',
                                                        userLoginHome: (parseInt(all.banks.accountDetails.bank.BankNumber) !== 126) ? 'Private' : 'Platinum',
                                                        passwordEnc: token,
                                                        bankId: all.banks.accounts.fibi.bankids,
                                                        showCaptcha: false,
                                                        lang: 'HE',
                                                        user: all.banks.accountDetails.bank.username,
                                                    };
                                                    all.banks.core.services.httpReq("https://" + all.banks.accounts.fibi.urlServices + "/MatafLoginService/MatafLoginServlet", 'POST', data, true, false)
                                                        .then(function (data) {
                                                            try {
                                                                var data = all.banks.core.services.parseHtml(data);
                                                                if (data.find('#mymessage').length && data.find('#mymessage').text().indexOf('הכניסה נחסמה') !== -1) {
                                                                    $('#filecontainerlogin').attr('src', '');
                                                                    myEmitterLogs(8);
                                                                } else if (data.find('#mymessage').text().indexOf("הסיסמא מבוטלת עקב אי שימוש, אנא פנה לסניף") !== -1) {
                                                                    $('#filecontainerlogin').attr('src', '');
                                                                    myEmitterLogs(8);
                                                                } else if (data.find('#mymessage').length && data.find('#mymessage').text().indexOf('שגוי') !== -1) {
                                                                    $('#filecontainerlogin').attr('src', '');
                                                                    var type = 2;
                                                                    var text = "פרטי כניסה שגויים";
                                                                    myEmitterLogs(5);
                                                                } else if (data.find('#mymessage').length && data.find('#mymessage').text().indexOf('באפשרותך להכנס באמצעות האתר בו מתנהל חשבונך') !== -1) {
                                                                    $('#filecontainerlogin').attr('src', '');
                                                                    myEmitterLogs(5, 'באפשרותך להכנס באמצעות האתר בו מתנהל חשבונך');
                                                                } else if (!data.find('#mymessage').length && data.find('form[name="changePassword"]').length) {
                                                                    $('#filecontainerlogin').attr('src', '');
                                                                    var type = 4;
                                                                    var text = "סיסמה פגה";
                                                                    myEmitterLogs(6);
                                                                } else if (!data.find('#mymessage').length && data.find('form[name="ChangePswform"]').length) {
                                                                    $('#filecontainerlogin').attr('src', '');
                                                                    var type = 4;
                                                                    var text = "סיסמה פגה";
                                                                    myEmitterLogs(6);
                                                                } else if (data.find('.mainTD').length && data.find('.mainTD').text().indexOf('אנו מתנצלים') !== -1) {
                                                                    $('#filecontainerlogin').attr('src', '');
                                                                    myEmitterLogs(9);
                                                                } else {
                                                                    var mymessage = data.find("#mymessage");
                                                                    if (mymessage.length && mymessage.text().includes("אינו זמין")) {
                                                                        writeLog("---- IP is blocked - changeIp----");
                                                                        fibi.changeIp();
                                                                        // fibi.changeIp(function () {
                                                                        //     fibi.loginMiddleOnWork(function () {
                                                                        //         nextTo();
                                                                        //     });
                                                                        // });
                                                                    } else {
                                                                        nextTo();

                                                                        // if (!all.banks.openBankPage && (parseInt(all.banks.accountDetails.bank.BankNumber) !== 46)) {
                                                                        //     all.banks.core.services.httpReq("https://" + all.banks.accounts.fibi.urlServices + "/MatafRestApiService/rest/creditCardsBeyond/points", 'POST', null, true, false)
                                                                        //         .then(function (data, state, status) {
                                                                        //             if (data.POINTS && data.POINTS.BANK && data.POINTS.BANK !== '26') {
                                                                        //                 fibi.BankNumber = parseInt(data.POINTS.BANK);
                                                                        //             }
                                                                        //             nextTo();
                                                                        //         })
                                                                        // } else {
                                                                        //     nextTo();
                                                                        // }
                                                                    }

                                                                    function nextTo() {
                                                                        if (!all.banks.openBankPage) {
                                                                            // var cook = '';
                                                                            // var win = nw.Window.get();
                                                                            // win.cookies.getAll({},
                                                                            // 	function (cookies) {
                                                                            // 		if (cookies && cookies.length) {
                                                                            // 			for (var i = 0; i < cookies.length; i++) {
                                                                            // 				if (cookies[i].domain == all.banks.accounts.fibi.urlServices) {
                                                                            // 					cook += cookies[i].name + "=" + cookies[i].value + ";";
                                                                            // 				}
                                                                            // 				if (cookies.length == i + 1) {
                                                                            // 					all.banks.accounts.fibi.cookies = cook;
                                                                            // 				}
                                                                            // 			}
                                                                            // 		}
                                                                            // 	});
                                                                            all.banks.generalVariables.allDataArr = {
                                                                                "ExporterId": all.banks.spiderConfig.spiderId,
                                                                                "BankData": [
                                                                                    {
                                                                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                                                                        "Token": all.banks.accountDetails.bank.token,
                                                                                        "BankNumber": fibi.BankNumber,
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
                                                                            all.banks.generalVariables.allDataArrMatah = {
                                                                                "ExporterId": all.banks.spiderConfig.spiderId,
                                                                                "BankData": [
                                                                                    {
                                                                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                                                                        "Token": all.banks.accountDetails.bank.token,
                                                                                        "BankNumber": fibi.BankNumber,
                                                                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                                                        "Account": []
                                                                                    }
                                                                                ]
                                                                            };
                                                                            all.banks.accounts.aibank.datebacksleshMatah = ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateFromMatah.getFullYear().toString();
                                                                            all.banks.accounts.aibank.datebacksleshToMatah = ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateToMatah.getFullYear().toString();

                                                                            if (all.banks.accountDetails.days > 0) {
                                                                                fibi.days = true;
                                                                                fibi.cards = false;
                                                                                fibi.nilvim = false;
                                                                                myEmitterLogs(11);
                                                                                data = null;
                                                                                all.banks.accounts.fibi.getUrlPostOsh();
                                                                            } else if (all.banks.accountDetails.ccardMonth > 0) {
                                                                                fibi.days = false;
                                                                                fibi.cards = true;
                                                                                fibi.nilvim = false;
                                                                                fibi.matah = false;
                                                                                data = null;
                                                                                all.banks.accounts.fibi.loadPrivateAccountFlow()
                                                                            } else if (all.banks.accountDetails.IND_NILVIM > 0) {
                                                                                fibi.days = false;
                                                                                fibi.cards = false;
                                                                                fibi.nilvim = true;
                                                                                fibi.matah = false;
                                                                                myEmitterLogs(21); //start loan
                                                                                data = null;

                                                                                all.banks.accounts.fibi.loadPrivateAccountFlow()
                                                                            } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                                                                                fibi.matah = true;
                                                                                fibi.days = false;
                                                                                fibi.cards = false;
                                                                                fibi.nilvim = false;
                                                                                myEmitterLogs(34);
                                                                                all.banks.accounts.fibi.selectAcc = data.find('#account_num_select');


                                                                                if (fibi.isSetAccAndBranch) {
                                                                                    var branch = $("#branch").val();
                                                                                    var account = $("#account").val();
                                                                                    all.banks.accounts.fibi.selectAcc.find('option').each((idx, child) => {
                                                                                        const label = child.text;
                                                                                        if (!label.includes(account)) {
                                                                                            $(child).remove()
                                                                                        }
                                                                                    });
                                                                                } else {
                                                                                    if (all.banks.accountDetails.deleted_account_ids.length) {
                                                                                        all.banks.accounts.fibi.selectAcc.find('option').each((idx, child) => {
                                                                                            const label = child.text;
                                                                                            if (all.banks.accountDetails.deleted_account_ids.some(it => label.includes(it.toString()))) {
                                                                                                $(child).remove()
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                }

                                                                                all.banks.generalVariables.allDataArrMatah = {
                                                                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                                                                    "BankData": [
                                                                                        {
                                                                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                                                                            "Token": all.banks.accountDetails.bank.token,
                                                                                            "BankNumber": fibi.BankNumber,
                                                                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                                                            "Account": []
                                                                                        }
                                                                                    ]
                                                                                };
                                                                                all.banks.accounts.aibank.datebacksleshMatah = ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateFromMatah.getFullYear().toString();
                                                                                all.banks.accounts.aibank.datebacksleshToMatah = ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateToMatah.getFullYear().toString();

                                                                                data = null;
                                                                                fibi.loadPrivateAccountFlow();
                                                                            } else {
                                                                                data = null;
                                                                                all.banks.core.services.reloadPage();
                                                                            }
                                                                        } else {
                                                                            data = null;
                                                                            all.banks.core.services.openBankPage("https://" + all.banks.accounts.fibi.urlServices + "/wps/myportal/FibiMenu/Online/OnAccountMngment/OnBalanceTrans/PrivateAccountFlow");
                                                                        }
                                                                    }

                                                                }
                                                            } catch (err) {

                                                                all.banks.core.services.errorLog(err)
                                                            }
                                                        })
                                                        .fail(fibi.redoOrFail);
                                                },
                                                function (err) {
                                                    var err_text = JSON.stringify(err);
                                                    //User locked Error
                                                    if ((err._errorCode == 3) || (err._errorCode == 1 && err._data.assertion_error_code == 5)) {
                                                    } else if ((err._errorCode == 12) || (err._errorCode == 11)) {
                                                    } else {
                                                        if (err._errorCode === 8) {
                                                            myEmitterLogs(8, err_text);
                                                            return
                                                        } else if (err._errorCode === 6) {
                                                            myEmitterLogs(9, err_text);
                                                            return
                                                        }
                                                    }
                                                    myEmitterLogs(5, err_text);
                                                    console.log('Authentication error: ' + err_text);
                                                });
                                    }

                                }).catch(function (err) {
                                    var err_text = JSON.stringify(err);
                                    console.log('Initialize error: ' + err_text);
                                });
                                // $("#filecontainerlogin").attr("src", 'https://' + all.banks.accounts.fibi.urlServices + '/wps/portal/FibiMenu/ResponsiveSiteCookieCleaner');
                                // $('#filecontainerlogin').on("load", function (frameSrc) {
                                //     if (frameSrc.target.contentDocument.body.id === 'content') {
                                //         $("#filecontainerlogin").attr("src", '');
                                //
                                //
                                //         var endpoint = "https://" + all.banks.accounts.fibi.urlServices;
                                //         var bankNum = "0" + parseInt(all.banks.accountDetails.bank.BankNumber);
                                //
                                //         if (parseInt(all.banks.accountDetails.bank.BankNumber) === 126) {
                                //             endpoint = "https://online.fibi.co.il";
                                //             bankNum = "031";
                                //         }
                                //
                                //         var appId = "rest_app_" + bankNum;
                                //         var policyId = "Login";
                                //         var cryptoMode = com.ts.mobile.sdk.ConnectionCryptoMode.Full;
                                //         var connectionSettings = com.ts.mobile.sdk.SDKConnectionSettings.createWithCryptoMode(endpoint, appId, null, null, cryptoMode);
                                //         var sdk = xmsdk.XmSdk();
                                //         sdk.setConnectionSettings(connectionSettings);
                                //         var myHandler = new MyUIHandler(sdk.host);
                                //         sdk.setUiHandler(myHandler);
                                //         window.submitLoginForm = false;
                                //         sdk.initialize().then(function () {
                                //             var transmitContainer = $('<div name="login" id="loginDiv"><form name="login" id="loginForm" autocomplete="off"><div class="input-holder"><input type="text" id="username"autocomplete="off" name="username" maxlength="15" class="username form-control form-input" aria-label="קוד משתמש" aria-describedby="usernameError inputValidationMsg validationMsg serverErrorMsg serverErrorMsgTransmit msgCont" tabindex="1" placeholder="קוד משתמש" autofocus/> <div class="input-help"><div class="question"><button type="button" id="tooltiptrigger1" aria-label="עזרה קוד משתמש" class="question_a" role="button" tabindex="4" aria-describedby="tooltip-1">?</button></div><div id="tooltip-1" class="lightbox-menu" role="tooltip"><div><h3>קוד משתמש</h3><span></span><div class="tooltip-content"><p>קוד משתמש (4-9 תווים) אותיות לועזיות וספרות בלבד</p></div></div></div></div></div><div class="input-holder min_marging2 lastholder"><input type="password" id="password" name="password" autocomplete="new-password" maxlength="8" class="password form-control form-input" aria-label="סיסמה" aria-describedby="passwordError" tabindex="2" placeholder="סיסמה"/><div class="input-help"><div class="question"><button type="button" id="tooltiptrigger2" aria-label="עזרה סיסמה" class="question_a" role="button" tabindex="5" aria-describedby="tooltip-2">?</button></div><div id="tooltip-2" class="lightbox-menu" role="tooltip"><div><h3>סיסמה</h3><span></span><div class="tooltip-content"><p>הסיסמה תכלול בין 6-8 תווים ספרות ואותיות באנגלית בלבד</p></div></div></div></div></div><div class="ErrorHolder"><div class="info_msg" id="msgCont"><p id="mymessage"></p></div></div><input id="continueBtn" type="button" aria-label="כניסה" tabindex="3" class="btn login min_marging margin_shortbody" value="כניסה"/></form></div>');
                                //             transmitContainer.find('#username').val(all.banks.accountDetails.bank.username)
                                //             transmitContainer.find('#password').val(all.banks.accountDetails.bank.password)
                                //
                                //             sdk.logout().then(function () {
                                //                 authenticateTransmit()
                                //             }).catch(function (err) {
                                //                 var err_text = JSON.stringify(err);
                                //                 console.log('Logout error: ' + err_text);
                                //                 sessionStorage.removeItem("currentSession");
                                //                 authenticateTransmit();
                                //             });
                                //
                                //             function authenticateTransmit() {
                                //                 var clientContext = {uiContainer: transmitContainer};
                                //                 var additional_params = {
                                //                     "bankId": bankNum
                                //                 };
                                //                 sdk.authenticate(all.banks.accountDetails.bank.username, policyId, additional_params, clientContext)
                                //                     .then(function (successfulAuth) {
                                //                             const token = successfulAuth.getToken();
                                //                             var data = {
                                //                                 isPaymentProc: false,
                                //                                 KODSAFA: 'HE',
                                //                                 userLoginHome: (parseInt(all.banks.accountDetails.bank.BankNumber) !== 126) ? 'Private' : 'Platinum',
                                //                                 passwordEnc: token,
                                //                                 bankId: all.banks.accounts.fibi.bankids,
                                //                                 showCaptcha: false,
                                //                                 lang: 'HE',
                                //                                 user: all.banks.accountDetails.bank.username,
                                //                             };
                                //                             all.banks.core.services.httpReq("https://" + all.banks.accounts.fibi.urlServices + "/MatafLoginService/MatafLoginServlet", 'POST', data, true, false)
                                //                                 .then(function (data) {
                                //                                     try {
                                //                                         var data = all.banks.core.services.parseHtml(data);
                                //                                         if (data.find('#mymessage').length && data.find('#mymessage').text().indexOf('הכניסה נחסמה') !== -1) {
                                //                                             $('#filecontainerlogin').attr('src', '');
                                //                                             myEmitterLogs(8);
                                //                                         } else if (data.find('#mymessage').text().indexOf("הסיסמא מבוטלת עקב אי שימוש, אנא פנה לסניף") !== -1) {
                                //                                             $('#filecontainerlogin').attr('src', '');
                                //                                             myEmitterLogs(8);
                                //                                         } else if (data.find('#mymessage').length && data.find('#mymessage').text().indexOf('שגוי') !== -1) {
                                //                                             $('#filecontainerlogin').attr('src', '');
                                //                                             var type = 2;
                                //                                             var text = "פרטי כניסה שגויים";
                                //                                             myEmitterLogs(5);
                                //                                         } else if (data.find('#mymessage').length && data.find('#mymessage').text().indexOf('באפשרותך להכנס באמצעות האתר בו מתנהל חשבונך') !== -1) {
                                //                                             $('#filecontainerlogin').attr('src', '');
                                //                                             myEmitterLogs(5, 'באפשרותך להכנס באמצעות האתר בו מתנהל חשבונך');
                                //                                         } else if (!data.find('#mymessage').length && data.find('form[name="changePassword"]').length) {
                                //                                             $('#filecontainerlogin').attr('src', '');
                                //                                             var type = 4;
                                //                                             var text = "סיסמה פגה";
                                //                                             myEmitterLogs(6);
                                //                                         } else if (!data.find('#mymessage').length && data.find('form[name="ChangePswform"]').length) {
                                //                                             $('#filecontainerlogin').attr('src', '');
                                //                                             var type = 4;
                                //                                             var text = "סיסמה פגה";
                                //                                             myEmitterLogs(6);
                                //                                         } else if (data.find('.mainTD').length && data.find('.mainTD').text().indexOf('אנו מתנצלים') !== -1) {
                                //                                             $('#filecontainerlogin').attr('src', '');
                                //                                             myEmitterLogs(9);
                                //                                         } else {
                                //                                             var mymessage = data.find("#mymessage");
                                //                                             if (mymessage.length && mymessage.text().includes("אינו זמין")) {
                                //                                                 writeLog("---- IP is blocked - changeIp----");
                                //                                                 fibi.changeIp();
                                //                                                 // fibi.changeIp(function () {
                                //                                                 //     fibi.loginMiddleOnWork(function () {
                                //                                                 //         nextTo();
                                //                                                 //     });
                                //                                                 // });
                                //                                             } else {
                                //                                                 if (!all.banks.openBankPage && (parseInt(all.banks.accountDetails.bank.BankNumber) !== 46)) {
                                //                                                     debugger
                                //                                                     all.banks.core.services.httpReq("https://" + all.banks.accounts.fibi.urlServices + "/MatafRestApiService/rest/creditCardsBeyond/points" , 'POST', null, true, false)
                                //                                                         .then(function (data, state, status) {
                                //                                                             fibi.BankNumber = parseInt(data.POINTS.BANK);
                                //                                                             debugger
                                //                                                             // const aaa = {
                                //                                                             //     "status": {"status": null, "reason": null, "message": null},
                                //                                                             //     "general": {
                                //                                                             //         "timeStamp": "2021-06-30T17:35:00",
                                //                                                             //         "clientID": "Portal: I737VDT",
                                //                                                             //         "requestUUID": "a22cdf67-c359-4bb1-b60e-9cc2c9415457"
                                //                                                             //     },
                                //                                                             //     "POINTS": {
                                //                                                             //         "BANK": "31",
                                //                                                             //         "SNIF": "41",
                                //                                                             //         "MCH": "31704",
                                //                                                             //         "IS_BEYOND": 0,
                                //                                                             //         "TOTAL_VALID_POINTS": 0,
                                //                                                             //         "POTENTIAL_POINTS": 0
                                //                                                             //     }
                                //                                                             // }
                                //
                                //                                                         })
                                //                                                 }else{
                                //                                                     nextTo();
                                //                                                 }
                                //                                             }
                                //
                                //                                             function nextTo() {
                                //                                                 if (!all.banks.openBankPage) {
                                //                                                     // var cook = '';
                                //                                                     // var win = nw.Window.get();
                                //                                                     // win.cookies.getAll({},
                                //                                                     // 	function (cookies) {
                                //                                                     // 		if (cookies && cookies.length) {
                                //                                                     // 			for (var i = 0; i < cookies.length; i++) {
                                //                                                     // 				if (cookies[i].domain == all.banks.accounts.fibi.urlServices) {
                                //                                                     // 					cook += cookies[i].name + "=" + cookies[i].value + ";";
                                //                                                     // 				}
                                //                                                     // 				if (cookies.length == i + 1) {
                                //                                                     // 					all.banks.accounts.fibi.cookies = cook;
                                //                                                     // 				}
                                //                                                     // 			}
                                //                                                     // 		}
                                //                                                     // 	});
                                //                                                     all.banks.generalVariables.allDataArr = {
                                //                                                         "ExporterId": all.banks.spiderConfig.spiderId,
                                //                                                         "BankData": [
                                //                                                             {
                                //                                                                 "TargetId": all.banks.accountDetails.bank.targetId,
                                //                                                                 "Token": all.banks.accountDetails.bank.token,
                                //                                                                 "BankNumber": fibi.BankNumber,
                                //                                                                 "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                //                                                                 "Account": []
                                //                                                             }
                                //                                                         ]
                                //                                                     };
                                //                                                     all.banks.generalVariables.allDataArrAshrai = [];
                                //                                                     all.banks.generalVariables.allDataArrLoan = [];
                                //                                                     all.banks.generalVariables.allDataArrDeposit = [];
                                //                                                     all.banks.generalVariables.allDataArrDueChecks = [];
                                //                                                     all.banks.generalVariables.allDataArrStandingOrders = [];
                                //                                                     all.banks.generalVariables.allDataArrMatah = {
                                //                                                         "ExporterId": all.banks.spiderConfig.spiderId,
                                //                                                         "BankData": [
                                //                                                             {
                                //                                                                 "TargetId": all.banks.accountDetails.bank.targetId,
                                //                                                                 "Token": all.banks.accountDetails.bank.token,
                                //                                                                 "BankNumber": fibi.BankNumber,
                                //                                                                 "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                //                                                                 "Account": []
                                //                                                             }
                                //                                                         ]
                                //                                                     };
                                //                                                     all.banks.accounts.aibank.datebacksleshMatah = ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateFromMatah.getFullYear().toString();
                                //                                                     all.banks.accounts.aibank.datebacksleshToMatah = ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateToMatah.getFullYear().toString();
                                //
                                //                                                     if (all.banks.accountDetails.days > 0) {
                                //                                                         fibi.days = true;
                                //                                                         fibi.cards = false;
                                //                                                         fibi.nilvim = false;
                                //                                                         myEmitterLogs(11);
                                //                                                         data = null;
                                //                                                         all.banks.accounts.fibi.getUrlPostOsh();
                                //                                                     } else if (all.banks.accountDetails.ccardMonth > 0) {
                                //                                                         fibi.days = false;
                                //                                                         fibi.cards = true;
                                //                                                         fibi.nilvim = false;
                                //                                                         fibi.matah = false;
                                //                                                         data = null;
                                //                                                         all.banks.accounts.fibi.loadPrivateAccountFlow()
                                //                                                     } else if (all.banks.accountDetails.IND_NILVIM > 0) {
                                //                                                         fibi.days = false;
                                //                                                         fibi.cards = false;
                                //                                                         fibi.nilvim = true;
                                //                                                         fibi.matah = false;
                                //                                                         myEmitterLogs(21); //start loan
                                //                                                         data = null;
                                //
                                //                                                         all.banks.accounts.fibi.loadPrivateAccountFlow()
                                //                                                     } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                                //                                                         fibi.matah = true;
                                //                                                         fibi.days = false;
                                //                                                         fibi.cards = false;
                                //                                                         fibi.nilvim = false;
                                //                                                         myEmitterLogs(34);
                                //                                                         all.banks.accounts.fibi.selectAcc = data.find('#account_num_select');
                                //
                                //
                                //                                                         all.banks.generalVariables.allDataArrMatah = {
                                //                                                             "ExporterId": all.banks.spiderConfig.spiderId,
                                //                                                             "BankData": [
                                //                                                                 {
                                //                                                                     "TargetId": all.banks.accountDetails.bank.targetId,
                                //                                                                     "Token": all.banks.accountDetails.bank.token,
                                //                                                                     "BankNumber": fibi.BankNumber,
                                //                                                                     "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                //                                                                     "Account": []
                                //                                                                 }
                                //                                                             ]
                                //                                                         };
                                //                                                         all.banks.accounts.aibank.datebacksleshMatah = ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateFromMatah.getFullYear().toString();
                                //                                                         all.banks.accounts.aibank.datebacksleshToMatah = ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateToMatah.getFullYear().toString();
                                //
                                //                                                         data = null;
                                //                                                         fibi.loadPrivateAccountFlow();
                                //                                                     } else {
                                //                                                         data = null;
                                //                                                         all.banks.core.services.reloadPage();
                                //                                                     }
                                //                                                 } else {
                                //                                                     data = null;
                                //                                                     all.banks.core.services.openBankPage("https://" + all.banks.accounts.fibi.urlServices + "/wps/myportal/FibiMenu/Online/OnAccountMngment/OnBalanceTrans/PrivateAccountFlow");
                                //                                                 }
                                //                                             }
                                //
                                //                                         }
                                //                                     } catch (err) {
                                //
                                //                                         all.banks.core.services.errorLog(err)
                                //                                     }
                                //                                 })
                                //                                 .fail(fibi.redoOrFail);
                                //                         },
                                //                         function (err) {
                                //                             var err_text = JSON.stringify(err);
                                //                             //User locked Error
                                //                             if ((err._errorCode == 3) || (err._errorCode == 1 && err._data.assertion_error_code == 5)) {
                                //                             } else if ((err._errorCode == 12) || (err._errorCode == 11)) {
                                //                             } else {
                                //                                 if (err._errorCode === 8) {
                                //                                     myEmitterLogs(8, err_text);
                                //                                     return
                                //                                 } else if (err._errorCode === 6) {
                                //                                     myEmitterLogs(9, err_text);
                                //                                     return
                                //                                 }
                                //                             }
                                //                             myEmitterLogs(5, err_text);
                                //                             console.log('Authentication error: ' + err_text);
                                //                         });
                                //             }
                                //
                                //         }).catch(function (err) {
                                //             var err_text = JSON.stringify(err);
                                //             console.log('Initialize error: ' + err_text);
                                //         });
                                //
                                //     }
                                //
                                // })

                            }
                        } catch (err) {
                            all.banks.core.services.errorLog(err);
                        }
                    }

                })
                .fail(function (error, resErr, urlParam) {
                    if (counterSeconds === 0) {
                        counterSeconds = 2;
                        clearTimeout(timeToRunAgain);
                        writeLog("---- IP is blocked - changeIp----");
                        fibi.changeIp();
                    }
                });
        }


        $.getScript("js/lib/fibiLoginCryption.js", function (data, textStatus, jqxhr) {
            setTimeout(() => loadAuto(), 2000);
        });


    };

    fibi.loadPrivateAccountFlow = function () {
        all.banks.core.services.httpReq("https://" + all.banks.accounts.fibi.urlServices + "/wps/myportal/FibiMenu/Online/OnAccountMngment/OnBalanceTrans/PrivateAccountFlow", 'GET', null, false, false)
            .then(fibi.initializeGlobals)
            .then(fibi.restoreCompanySelection)
            .then(fibi.restoreAccountSelection)
            .then(function (res, bbb, ccc) {
                var res = all.banks.core.services.parseHtml(res);
                all.banks.accounts.fibi.changeAccount(res);
                res = null;
            })
            .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                fibi.loadPrivateAccountFlow();
            }));
    };
    fibi.checkWhatNext = function () {
        if (all.banks.accountDetails.ccardMonth > 0) {
            all.banks.accounts.fibi.loadDatesAshrai();
        } else if (all.banks.accountDetails.IND_NILVIM > 0) {
            if (fibi.nilvim) {
                all.banks.accounts.fibi.loadLoan();
            } else if (fibi.nilvimDeposit) {
                all.banks.accounts.fibi.loadDeposit();
            } else if (fibi.nilvimDueChecks) {
                all.banks.accounts.fibi.loadDueChecks();
            } else if (fibi.nilvimStandingOrders) {
                all.banks.accounts.fibi.loadStandingOrders();
            }
        } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
            all.banks.accounts.fibi.ind = 0;
            fibi.loadMatah(false, true);
        }
    }
    fibi.senders = function () {
        if (all.banks.accountDetails.ccardMonth > 0) {
            all.banks.accountDetails.ccardMonth = 0;
            all.banks.accounts.fibi.sendCardsCtrl();
        } else if (all.banks.accountDetails.IND_NILVIM > 0) {
            if (fibi.nilvim) {
                fibi.nilvim = false;
                all.banks.accounts.fibi.sendLoanCtrl();
            } else if (fibi.nilvimDeposit) {
                fibi.nilvimDeposit = false;
                all.banks.accounts.fibi.sendDepositCtrl();
            } else if (fibi.nilvimDueChecks) {
                fibi.nilvimDueChecks = false;
                all.banks.accounts.fibi.sendDueChecksCtrl();
            } else if (fibi.nilvimStandingOrders) {
                fibi.nilvimStandingOrders = false;
                all.banks.accountDetails.ccardMonth = 0;
                all.banks.accountDetails.IND_NILVIM = 0;
                all.banks.accounts.fibi.sendStandingOrdersCtrl();
            }
        } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
            all.banks.accounts.fibi.ind = 0;
            all.banks.accountDetails.ccardMonth = 0;
            all.banks.accountDetails.IND_NILVIM = 0;
            all.banks.accountDetails.MATAH_DAY_TO_RUN = 0;
            all.banks.accounts.fibi.sendOshCtrl(2, 1);
        }
    }
    fibi.changeAccount = function (res) {
        if (all.banks.accounts.fibi.selectAcc.length) {
            if (res.find('head').find("base").length) {
                var urlChangeAcc = res.find('head').find("base").attr("href") + '' + res.find('form[name="refreshPortletForm"]').attr('action');
            } else {
                var urlChangeAcc = "https://" + all.banks.accounts.fibi.urlServices + res.find('form[name="refreshPortletForm"]').attr('action');
            }
            var optionFirst = $(all.banks.accounts.fibi.selectAcc).find('option').eq(0).val();
            var minusLength = 1,
                indAccOptionFirstNull = 0;
            if (optionFirst === "") {
                minusLength = 2;
                indAccOptionFirstNull = 1;
            }
            if (all.banks.accounts.fibi.selectAcc.val() !== undefined && (($(all.banks.accounts.fibi.selectAcc).find('option').length - minusLength) >= all.banks.accounts.fibi.ddAccAshrai)) {
                var data = {
                    PortletForm_ACTION_NAME: 'changeAccount',
                    'portal_current_account': $(all.banks.accounts.fibi.selectAcc).find('option').eq(all.banks.accounts.fibi.ddAccAshrai + indAccOptionFirstNull).val(),
                    'portal_current_bank': $(all.banks.accounts.fibi.selectAcc).find('option').eq(all.banks.accounts.fibi.ddAccAshrai + indAccOptionFirstNull).attr('data-bank'),
                    portal_company_tz: ''
                };
                fibi.portal_current_account = data.portal_current_account;
                fibi.portal_current_bank = data.portal_current_bank;
                res = null;
                console.log("data = " + JSON.stringify(data) + "ID = " + all.banks.accounts.fibi.ddAccAshrai);
                all.banks.core.services.httpReq(urlChangeAcc, 'POST', data, true, false)
                    .then(function (data, bbb, ccc) {
                        var expires = ccc.getResponseHeader("Expires");
                        if (expires === 0 || expires === "0") {
                            fibi.loginMiddleOnWork(function () {
                                fibi.checkWhatNext()
                            });
                        } else {
                            fibi.checkWhatNext()
                        }
                    })
                    .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                        fibi.checkWhatNext()
                    }));
            } else {
                fibi.senders()
            }
        } else {
            if (all.banks.accounts.fibi.ddAccAshrai === 0) {
                fibi.checkWhatNext()
            } else {
                fibi.senders()
            }
        }
    };
    fibi.loadDatesAshrai = function () {
        console.log('----loadDatesAshrai')
        fibi.mapCards = [];
        all.banks.core.services.httpReq("https://" + all.banks.accounts.fibi.urlServices + "/wps/myportal/FibiMenu/Online/OnCreditCardsMenu/OnCrCardsDetPayms/AuthCrCardsChargesDetails", 'GET', null, false, false)
            .then(function (data, bbb, ccc) {
                var expires = ccc.getResponseHeader("Expires");
                if (expires === 0 || expires === "0") {
                    fibi.loginMiddleOnWork(function () {
                        fibi.loadDatesAshrai();
                    });
                } else {
                    var data = all.banks.core.services.parseHtml(data);

                    all.banks.core.services.httpReq('https://' + all.banks.accounts.fibi.urlServices + '/wps/myportal/FibiMenu/Online/OnCreditCardsMenu/OnCrCardsDetPayms/AuthCrCardsCharges', 'GET', null, false, false)
                        .then(function (data1, bbb, ccc1) {
                            var expires = ccc1.getResponseHeader("Expires");
                            if (expires === 0 || expires === "0") {
                                fibi.loginMiddleOnWork(function () {
                                    // console.log('loadAshraiAll--- 3110')
                                    fibi.loadAshraiAll(data);
                                })
                            } else {
                                var data1 = all.banks.core.services.parseHtml(data1);
                                if (data1.find('#mymsgdiv').length && data1.find('#mymsgdiv').text().includes('לא נמצאו נתונים')) {
                                    all.banks.accounts.fibi.ddAshrai = 0;
                                    all.banks.accounts.fibi.ddAccAshrai = all.banks.accounts.fibi.ddAccAshrai + 1;
                                    all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + (data).find('form[name="LogoutUser"]').attr('action');
                                    // console.log('setAccAsharai --- 3118')
                                    all.banks.accounts.fibi.changeAccount(data);
                                } else {
                                    const tableCards = data1.find('.rounded.data.highhead > tbody');
                                    const trCards = tableCards.children('tr');
                                    if (trCards.length) {
                                        trCards.each((idx, child) => {
                                            fibi.mapCards.push({
                                                cardNumber: $(child).children('td').eq(0).children('span').eq(0).text(),
                                                CardStatus: $(child).children('td:last').text().includes('כרטיס חסום') ? 1 : null
                                            })
                                        });
                                    }
                                    all.banks.accounts.fibi.arrMonthCycle = [];
                                    if (data.find('select[name="I-TR-CHIYUV"]').length > 0) {
                                        const today = new Date().toDateString();

                                        function isToday(val) {
                                            try {
                                                const dmy = val.split('.');
                                                return new Date(dmy[2], dmy[1] - 1, dmy[0]).toDateString() === today;
                                            } catch (e) {
                                                return false;
                                            }
                                        }

                                        let index = data.find('select[name="I-TR-CHIYUV"] option:selected').index();
                                        let backTillIndex = Math.max(index - all.banks.accountDetails.ccardMonth, 0);
                                        const chiyuvOpts = data.find('select[name="I-TR-CHIYUV"] option');

                                        if (index > 0
                                            && index + 1 < chiyuvOpts.length
                                            && !isToday(chiyuvOpts.eq(index - 1).val())) {
                                            all.banks.accounts.fibi.arrMonthCycle.push(chiyuvOpts.eq(index + 1).val());
                                        }

                                        do {
                                            all.banks.accounts.fibi.arrMonthCycle.push(chiyuvOpts.eq(index).val());
                                            index--;

                                            if (isToday(chiyuvOpts.eq(index).val()) && backTillIndex > 0) {
                                                backTillIndex--;
                                            }
                                        } while (index >= backTillIndex);

                                        // console.log('loadAshraiAll--- 3170')
                                        all.banks.accounts.fibi.loadAshraiAll(data);
                                        data = null;
                                    } else {
                                        all.banks.accounts.fibi.ddTime = 0;
                                        if (all.banks.accounts.fibi.ddAshrai < data.find('select[name="I-SEL-MS-KARTIS"] option').length - 1) {
                                            all.banks.accounts.fibi.ddAshrai = all.banks.accounts.fibi.ddAshrai + 1;
                                            // console.log('loadAshraiAll--- 3177')
                                            all.banks.accounts.fibi.loadAshraiAll(data);
                                            data = null;
                                        } else {
                                            all.banks.accounts.fibi.ddAshrai = 0;
                                            all.banks.accounts.fibi.ddAccAshrai = all.banks.accounts.fibi.ddAccAshrai + 1;
                                            all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + (data).find('form[name="LogoutUser"]').attr('action');
                                            // console.log('setAccAsharai --- 3181')
                                            all.banks.accounts.fibi.changeAccount(data);
                                            data = null;
                                        }
                                    }
                                }
                            }
                        })
                }
            })
            .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                fibi.loadDatesAshrai();
            }));
    };
    fibi.loadAshraiAll = function (res) {
        console.log('------loadAshraiAll-----')
        const deleteMeWhenDecidedToReleaseThis = false;
        const cardOpt = res.find('select[name="I-SEL-MS-KARTIS"] option').eq(all.banks.accounts.fibi.ddAshrai + 1).text();
        var bankNumber = (Number(res.find('#account_num_select').find('option:selected').attr('data-bank')) ? Number(res.find('#account_num_select').find('option:selected').attr('data-bank')) : fibi.BankNumber);
        if (bankNumber === 26) {
            bankNumber = 126;
        }
        const isCardExist = fibi.mapCards.filter(it => cardOpt.includes(it.cardNumber));
        if (deleteMeWhenDecidedToReleaseThis && isCardExist.length && isCardExist[0].CardStatus === 1) {
            var cardNumber = cardOpt.replace(/\D/g, "");
            var cardType = all.banks.core.services.getTypeCard(cardOpt);
            var dataMonthlyCycle = {
                'BankNumber': bankNumber,
                'AccountNumber': parseInt(res.find('.fibi_account .acc_num').text().replace(/\D/g, "")),
                'BranchNumber': parseInt(res.find('.fibi_branch .branch_num').text().replace(/\D/g, "")),
                'NextTotal': null,
                'CardNumber': cardNumber,
                'CardType': cardType,
                'NextBillingDate': null
            }
            all.banks.generalVariables.allDataArrAshrai.push({
                "TargetId": all.banks.accountDetails.bank.targetId,
                "Token": all.banks.accountDetails.bank.token,
                "BankNumber": bankNumber,
                "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                "ExporterId": all.banks.spiderConfig.spiderId,
                "BranchNumber": dataMonthlyCycle.BranchNumber,
                "AccountNumber": dataMonthlyCycle.AccountNumber,
                "CardNumber": dataMonthlyCycle.CardNumber,
                "NextBillingDate": null,
                "NextCycleTotal": dataMonthlyCycle.NextTotal,
                "CardStatus": 1,
                "TransDesc": 'ללא מלל',
                "TransTotal": null,
                "ValueDate": null,
                "TransCategory": null,
                "TotalPayments": null,
                "CurrentPaymentNum": null,
                "CardType": null,
                "indFakeDate": 0,
                "currency_id": null,
                "original_total": null,
                "ind_iskat_hul": null,
                "comment": 'כרטיס חסום'
            });
            var cardDDLength = res.find('select[name="I-SEL-MS-KARTIS"] option').length - 1;
            all.banks.accounts.fibi.ddTime = 0;
            if (all.banks.accounts.fibi.ddAshrai < cardDDLength - 1) {
                all.banks.accounts.fibi.ddAshrai = all.banks.accounts.fibi.ddAshrai + 1;
                // console.log('loadAshraiAll--- 3613')
                all.banks.accounts.fibi.loadAshraiAll(res);
            } else {
                all.banks.accounts.fibi.ddAshrai = 0;
                all.banks.accounts.fibi.ddAccAshrai = all.banks.accounts.fibi.ddAccAshrai + 1;
                all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + res.find('form[name="LogoutUser"]').attr('action');
                // console.log('setAccAsharai --- 3616')
                all.banks.accounts.fibi.changeAccount(res);
            }
        } else {
            var jsons = {
                'SUGBAKA': '212',
                'responseType': 'HTML',
                'I-D-STATUS': 'CH-KAROV',
                'I-SEL-MS-KARTIS': res.find('select[name="I-SEL-MS-KARTIS"] option').eq(all.banks.accounts.fibi.ddAshrai + 1).val(),
                'I-TR-CHIYUV': all.banks.accounts.fibi.arrMonthCycle[all.banks.accounts.fibi.ddTime]
            };

            if (res.find('head').find("base").length) {
                var url = res.find('head').find("base").attr("href") + '' + res.find('#DetailsCurrentMonth').attr('action');
            } else {
                var url = "https://" + all.banks.accounts.fibi.urlServices + res.find('#DetailsCurrentMonth').attr('action');
            }
            all.banks.core.services.httpReq(url, 'POST', jsons, true, false)
                .then(function (data, bbb, ccc) {
                    var expires = ccc.getResponseHeader("Expires");
                    if (expires === 0 || expires === "0") {
                        fibi.loginMiddleOnWork(function () {
                            // console.log('loadAshraiAll--- 3642')
                            fibi.loadAshraiAll(res);
                        });
                    } else {
                        var data = all.banks.core.services.parseHtml(data);
                        var cardDDLength = data.find('select[name="I-SEL-MS-KARTIS"] option').length - 1;

                        async function runCards() {
                            try {
                                function nextSteps(data) {
                                    // console.log('ddTime: ', all.banks.accounts.fibi.ddTime)
                                    // console.log('arrMonthCycle length: ', all.banks.accounts.fibi.arrMonthCycle.length)
                                    // console.log('ddAshrai: ', all.banks.accounts.fibi.ddAshrai)
                                    // console.log('ddAccAshrai: ', all.banks.accounts.fibi.ddAccAshrai)
                                    // console.log('cardDDLength: ', cardDDLength-1)

                                    if (all.banks.accounts.fibi.ddTime < all.banks.accounts.fibi.arrMonthCycle.length - 1) {
                                        all.banks.accounts.fibi.ddTime = all.banks.accounts.fibi.ddTime + 1;
                                        // console.log('loadAshraiAll--- 3657')
                                        all.banks.accounts.fibi.loadAshraiAll(data);
                                        data = null;
                                    } else {
                                        all.banks.accounts.fibi.ddTime = 0;
                                        if (all.banks.accounts.fibi.ddAshrai < cardDDLength - 1) {
                                            all.banks.accounts.fibi.ddAshrai = all.banks.accounts.fibi.ddAshrai + 1;
                                            // console.log('loadAshraiAll--- 3664')
                                            all.banks.accounts.fibi.loadAshraiAll(data);
                                            data = null;
                                        } else {
                                            all.banks.accounts.fibi.ddAshrai = 0;
                                            all.banks.accounts.fibi.ddAccAshrai = all.banks.accounts.fibi.ddAccAshrai + 1;
                                            all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + data.find('form[name="LogoutUser"]').attr('action');
                                            console.log('setAccAsharai --- !!!!!!!!!')
                                            all.banks.accounts.fibi.changeAccount(data);
                                            data = null;
                                        }
                                    }
                                }

                                if (data.find('.nnnn2222 #test5').length > 0) {
                                    var cardNumber = data.find('.nnnn2222 #test5 .filter_form > div').eq(1).find('table tbody > tr').eq(0).find('td').eq(1).find('span').eq(0).text().replace(/\D/g, "");
                                    var nextBillingDateMain = data.find('#DetailsCurrentMonth table.chead tbody tr').eq(1).find('span').text().replace(/\s/g, "").split('/');
                                    var nextTotal = null;
                                    if (data.find('.nnnn2222 #test5 .noresults').length == 0) {
                                        nextTotal = data.find('.nnnn2222 #test1 #mysummary tr.summary td').eq(1).find('span').eq(0).text().replace(/\s/g, "").replace(/,/g, '')
                                    }
                                    var cardType = all.banks.core.services.getTypeCard(data.find('.nnnn2222 #test5 .filter_form > div').eq(1).find('table tbody > tr').eq(0).find('td').eq(1).text());
                                    var dataMonthlyCycle = {
                                        'BankNumber': bankNumber,
                                        'AccountNumber': parseInt(data.find('.fibi_account .acc_num').text().replace(/\D/g, "")),
                                        'BranchNumber': parseInt(data.find('.fibi_branch .branch_num').text().replace(/\D/g, "")),
                                        'NextTotal': nextTotal,
                                        'CardNumber': cardNumber,
                                        'CardType': cardType,
                                        'NextBillingDate': data.find('.OUT-SHKL-KOT table tbody tr').find('td').eq(1).find('span').eq(1).text().split('/')[0] + '/' + nextBillingDateMain[0] + '/' + nextBillingDateMain[1]
                                    }
                                    await myEmitterLogsPromise(33, dataMonthlyCycle.AccountNumber);
                                    await myEmitterLogsPromise(15, dataMonthlyCycle.CardNumber + ' period ' + dataMonthlyCycle.NextBillingDate);

                                    function tabletest3(data, dataMonthlyCycle) {
                                        if (data.find('.nnnn2222 #test3  tr table tbody tr').length) {
                                            var nextCycleDate = data.find('.nnnn2222 .OUT-MTH-KOT table tbody tr').find('td').eq(1).find('span').eq(1).text();
                                            var comment = '';
                                            dataMonthlyCycle.NextBillingDate = nextCycleDate;
                                            dataMonthlyCycle.NextTotal = data.find('.nnnn2222 #test3 #mysummary tr.summary td').eq(1).find('span').eq(0).text().replace(/\s/g, "").replace(/,/g, '')
                                            data.find('.nnnn2222 #test3  tr table tbody tr').each(function (i, v) {
                                                var totalPaymentsSum = null, currentPaymentNumSum = null;
                                                var totalPaymentsType = $(v).find('td').eq(4).text();
                                                var indEx = totalPaymentsType.indexOf('- מ');
                                                var identPay = totalPaymentsType.indexOf('ךותמ');
                                                if (identPay != -1) {
                                                    totalPaymentsSum = $(v).find('td').eq(4).text().split('ךותמ')[0].replace(/\D/g, "");
                                                    currentPaymentNumSum = parseInt($(v).find('td').eq(4).text().split('ךותמ')[1])
                                                }
                                                var currency_id = all.banks.core.services.getTypeCurrencyAll($(v).find('td').eq(3).text());
                                                var ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll($(v).find('td').eq(5).text());
                                                var valueDate = $(v).find('td').eq(0).text().replace(/\s/g, "");

                                                all.banks.generalVariables.allDataArrAshrai.push({
                                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                                    "Token": all.banks.accountDetails.bank.token,
                                                    "BankNumber": bankNumber,
                                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                                    "BranchNumber": dataMonthlyCycle.BranchNumber,
                                                    "AccountNumber": dataMonthlyCycle.AccountNumber,
                                                    "CardNumber": dataMonthlyCycle.CardNumber,
                                                    "NextBillingDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal(dataMonthlyCycle.NextBillingDate)),
                                                    "NextCycleTotal": dataMonthlyCycle.NextTotal,
                                                    "CardStatus": null,
                                                    "TransDesc": $(v).find('td').eq(1).text() === '' ? 'ללא מלל' : $(v).find('td').eq(1).text(),
                                                    "TransTotal": $(v).find('td').eq(4).text().replace(/\s/g, "").replace(/,/g, ''),
                                                    "ValueDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal(valueDate)),
                                                    "TransCategory": null,
                                                    "TotalPayments": totalPaymentsSum,
                                                    "CurrentPaymentNum": currentPaymentNumSum,
                                                    "CardType": dataMonthlyCycle.CardType,
                                                    "indFakeDate": 0,
                                                    "currency_id": currency_id,
                                                    "original_total": $(v).find('td').eq(2).text().replace(/\s/g, "").replace(/,/g, ''),
                                                    "ind_iskat_hul": ind_iskat_hul,
                                                    "comment": fibi.reverseComment($(v).find('td').eq(6).text())
                                                })
                                                if ((data.find('.nnnn2222 #test3 tr table tbody tr').length - 1) == i) {
                                                    tabletest4(data, dataMonthlyCycle)
                                                }
                                            })
                                        } else {
                                            tabletest4(data, dataMonthlyCycle)
                                        }
                                    }

                                    function tabletest2(data, dataMonthlyCycle) {
                                        if (data.find('.nnnn2222 #test2  tr table tbody tr').length) {
                                            data.find('.nnnn2222 #test2  tr table tbody tr').each(function (i1, v1) {
                                                var comment = '';
                                                var currency_id = all.banks.core.services.getTypeCurrencyAll($(v1).find('td').eq(3).text());
                                                var valueDate = $(v1).find('td').eq(0).text().replace(/\s/g, "");
                                                var totalPaymentsSum = null, currentPaymentNumSum = null;
                                                var totalPaymentsType = $(v1).find('td').eq(5).text();
                                                var indEx = totalPaymentsType.indexOf('- מ');
                                                var identPay = totalPaymentsType.indexOf('ךותמ');
                                                if (identPay != -1) {
                                                    totalPaymentsSum = $(v1).find('td').eq(5).text().split('ךותמ')[0].replace(/\D/g, "");
                                                    currentPaymentNumSum = parseInt($(v1).find('td').eq(5).text().split('ךותמ')[1])
                                                }
                                                if (indEx !== -1) {
                                                    var textPayCard = $(v1).find('td').eq(5).text().split('- מ');
                                                    totalPaymentsSum = textPayCard[0].replace(/\D/g, "")
                                                    if (totalPaymentsSum && totalPaymentsSum.toString().length > 2) {
                                                        totalPaymentsSum = totalPaymentsSum.slice(-1)
                                                    }
                                                    currentPaymentNumSum = textPayCard[1].replace(/\D/g, "")
                                                } else if (indEx == -1 && identPay == -1) {
                                                    comment = fibi.reverseComment(totalPaymentsType);
                                                }

                                                all.banks.generalVariables.allDataArrAshrai.push({
                                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                                    "Token": all.banks.accountDetails.bank.token,
                                                    "BankNumber": bankNumber,
                                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                                    "BranchNumber": dataMonthlyCycle.BranchNumber,
                                                    "AccountNumber": dataMonthlyCycle.AccountNumber,
                                                    "CardNumber": dataMonthlyCycle.CardNumber,
                                                    "NextBillingDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal($(v1).find('td').eq(1).text().replace(/\s/g, "").replace(/,/g, ''))),
                                                    "NextCycleTotal": $(v1).find('td').eq(3).text().replace(/\s/g, "").replace(/,/g, ''),//dataMonthlyCycle.NextTotal,
                                                    "CardStatus": null,
                                                    "TransDesc": $(v1).find('td').eq(2).text() === '' ? 'ללא מלל' : $(v1).find('td').eq(2).text(),
                                                    "TransTotal": $(v1).find('td').eq(4).text().replace(/\s/g, "").replace(/,/g, ''),
                                                    "ValueDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal(valueDate)),
                                                    "TransCategory": null,
                                                    "TotalPayments": totalPaymentsSum,
                                                    "CurrentPaymentNum": currentPaymentNumSum,
                                                    "CardType": dataMonthlyCycle.CardType,
                                                    "indFakeDate": 0,
                                                    "currency_id": currency_id,
                                                    "original_total": $(v1).find('td').eq(3).text().replace(/\s/g, "").replace(/,/g, ''),
                                                    "ind_iskat_hul": 1,
                                                    "comment": comment
                                                })
                                                if ((data.find('.nnnn2222 #test2 tr table tbody tr').length - 1) == i1) {
                                                    tabletest3(data, dataMonthlyCycle)
                                                }
                                            })
                                        } else {
                                            tabletest3(data, dataMonthlyCycle)
                                        }
                                    }

                                    function tabletest4(data, dataMonthlyCycle) {
                                        if (data.find('.nnnn2222 #test4 table.data tbody tr').length) {
                                            var nextTotal = data.find('.nnnn2222 #test4  #hiuvumTbl212_4 .summary').find('td').eq(1).text().replace(/\s/g, "").replace(/,/g, '');
                                            data.find('.nnnn2222 #test4 table.data tbody > tr').each(function (i4, v4) {
                                                var comment = '';
                                                var currency_id = all.banks.core.services.getTypeCurrencyAll($(v4).children('td').eq(4).text());
                                                var ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll($(v4).children('td').eq(6).text())
                                                var valueDate = $(v4).children('td').eq(0).text().replace(/\s/g, "");
                                                var totalPaymentsSum = null, currentPaymentNumSum = null;
                                                var totalPaymentsType = $(v4).children('td').eq(8).text();
                                                var indEx = totalPaymentsType.indexOf('- מ');
                                                var identPay = totalPaymentsType.indexOf('ךותמ');

                                                if (identPay != -1) {
                                                    totalPaymentsSum = $(v4).children('td').eq(8).text().split('ךותמ')[0].replace(/\D/g, "");
                                                    currentPaymentNumSum = parseInt($(v4).children('td').eq(8).text().split('ךותמ')[1])
                                                }
                                                if (indEx !== -1) {
                                                    var textPayCard = $(v4).children('td').eq(4).text().split('- מ');
                                                    totalPaymentsSum = textPayCard[0].replace(/\D/g, "")
                                                    if (totalPaymentsSum && totalPaymentsSum.toString().length > 2) {
                                                        totalPaymentsSum = totalPaymentsSum.slice(-1)
                                                    }
                                                    currentPaymentNumSum = textPayCard[1].replace(/\D/g, "")
                                                } else if (indEx == -1 && identPay == -1) {
                                                    comment = fibi.reverseComment(totalPaymentsType)
                                                }

                                                all.banks.generalVariables.allDataArrAshrai.push({
                                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                                    "Token": all.banks.accountDetails.bank.token,
                                                    "BankNumber": bankNumber,
                                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                                    "BranchNumber": dataMonthlyCycle.BranchNumber,
                                                    "AccountNumber": dataMonthlyCycle.AccountNumber,
                                                    "CardNumber": dataMonthlyCycle.CardNumber,
                                                    "NextBillingDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal($(v4).children('td').eq(1).text().replace(/\s/g, ""))),
                                                    "NextCycleTotal": nextTotal,
                                                    "CardStatus": null,
                                                    "TransDesc": $(v4).children('td').eq(2).text() === '' ? 'ללא מלל' : $(v4).children('td').eq(2).text(),
                                                    "TransTotal": $(v4).children('td').eq(5).text().replace(/\s/g, "").replace(/,/g, ''),
                                                    "ValueDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal(valueDate)),
                                                    "TransCategory": null,
                                                    "TotalPayments": totalPaymentsSum,
                                                    "CurrentPaymentNum": currentPaymentNumSum,
                                                    "CardType": dataMonthlyCycle.CardType,
                                                    "indFakeDate": 0,
                                                    "currency_id": currency_id,
                                                    "original_total": $(v4).children('td').eq(3).text().replace(/\s/g, "").replace(/,/g, ''),
                                                    "ind_iskat_hul": ind_iskat_hul,
                                                    "comment": fibi.reverseComment($(v4).children('td').eq(7).text())
                                                })
                                                if ((data.find('.nnnn2222 #test4 table.data tbody tr').length - 1) == i4) {
                                                    nextSteps(data)
                                                }
                                            })
                                        } else {
                                            nextSteps(data)
                                        }
                                    }

                                    if (data.find('.nnnn2222 #test5 .noresults').length == 0) {
                                        if (data.find('.nnnn2222 #test1  tr table tbody tr').length) {
                                            var comment = '';
                                            data.find('.nnnn2222 #test1 tr table tbody tr').each(function (i1, v1) {
                                                var currency_id = all.banks.core.services.getTypeCurrencyAll($(v1).find('td').eq(3).text());

                                                var valueDate = $(v1).find('td').eq(0).text().replace(/\s/g, "");
                                                var totalPaymentsSum = null, currentPaymentNumSum = null;
                                                var totalPaymentsType = $(v1).find('td').eq(4).text();
                                                var indEx = totalPaymentsType.indexOf(' מ');
                                                if (indEx !== -1) {
                                                    var textPayCard = $(v1).find('td').eq(4).text().split('מ');
                                                    totalPaymentsSum = textPayCard[0].replace(/\D/g, "")
                                                    if (totalPaymentsSum && totalPaymentsSum.toString().length > 2) {
                                                        totalPaymentsSum = totalPaymentsSum.slice(-1)
                                                    }
                                                    currentPaymentNumSum = textPayCard[1].replace(/\D/g, "")
                                                }
                                                var identPay = totalPaymentsType.indexOf('ךותמ');
                                                if (identPay != -1) {
                                                    totalPaymentsSum = $(v1).find('td').eq(4).text().split('ךותמ')[0].replace(/\D/g, "");
                                                    currentPaymentNumSum = parseInt($(v1).find('td').eq(4).text().split('ךותמ')[1])
                                                }
                                                if (indEx == -1 && identPay == -1) {
                                                    comment = totalPaymentsType
                                                }
                                                all.banks.generalVariables.allDataArrAshrai.push({
                                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                                    "Token": all.banks.accountDetails.bank.token,
                                                    "BankNumber": bankNumber,
                                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                                    "BranchNumber": dataMonthlyCycle.BranchNumber,
                                                    "AccountNumber": dataMonthlyCycle.AccountNumber,
                                                    "CardNumber": dataMonthlyCycle.CardNumber,
                                                    "NextBillingDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal(dataMonthlyCycle.NextBillingDate)),
                                                    "NextCycleTotal": dataMonthlyCycle.NextTotal,
                                                    "CardStatus": null,
                                                    "TransDesc": $(v1).find('td').eq(1).text() === '' ? 'ללא מלל' : $(v1).find('td').eq(1).text(),
                                                    "TransTotal": $(v1).find('td').eq(3).text().replace(/\s/g, "").replace(/,/g, ''),
                                                    "ValueDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal(valueDate)),
                                                    "TransCategory": null,
                                                    "TotalPayments": totalPaymentsSum,
                                                    "CurrentPaymentNum": currentPaymentNumSum,
                                                    "CardType": dataMonthlyCycle.CardType,
                                                    "indFakeDate": 0,
                                                    "currency_id": currency_id,
                                                    "original_total": $(v1).find('td').eq(2).text().replace(/\s/g, "").replace(/,/g, ''),
                                                    "ind_iskat_hul": 1,
                                                    "comment": fibi.reverseComment(comment)
                                                })
                                            })
                                        }
                                        tabletest2(data, dataMonthlyCycle)
                                    } else {
                                        nextSteps(data);
                                    }
                                } else {
                                    nextSteps(data);
                                }
                            } catch (err) {
                                console.log(err)
                            }
                        }

                        runCards();

                    }
                })
                .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                    // console.log('loadAshraiAll--- 3941')
                    fibi.loadAshraiAll(res);
                }));
        }

    };

    fibi.loginMiddleOnWork = function (cb) {
        all.banks.core.services.removingCookie(false, function () {
            localStorage.removeItem('users')
            localStorage.removeItem('rxvt')
            localStorage.removeItem('rxVisitor')
            sessionStorage.removeItem("currentSession")
            $.getScript("js/lib/fibiLoginCryption.js", function (data, textStatus, jqxhr) {
                fibi.changeIp(function () {
                    setTimeout(() => loadAuto(), 3000);
                });
            });
        });

        function loadAuto() {
            var xhr_worked = false;
            var xhr_loadAuto = $.get("https://www." + all.banks.accounts.fibi.urlServices.split('online.')[1] + "/wps/portal/")
                .done(function (res) {
                    xhr_worked = true;
                    clearTimeout(timeoutWaiting)
                    try {
                        var data = all.banks.core.services.parseHtml(res);
                        var mymessage = data.find("#mymessage");
                        if (mymessage.length && mymessage.text().includes("אינו זמין")) {
                            myEmitterLogs(9, 'system unavailable');
                        } else {
                            var endpoint = "https://" + all.banks.accounts.fibi.urlServices;
                            var bankNum = "0" + parseInt(all.banks.accountDetails.bank.BankNumber);

                            if (parseInt(all.banks.accountDetails.bank.BankNumber) === 126) {
                                endpoint = "https://online.fibi.co.il";
                                bankNum = "031";
                            }

                            var appId = "rest_app_" + bankNum;
                            var policyId = "Login";
                            var cryptoMode = com.ts.mobile.sdk.ConnectionCryptoMode.Full;
                            var connectionSettings = com.ts.mobile.sdk.SDKConnectionSettings.createWithCryptoMode(endpoint, appId, null, null, cryptoMode);
                            var sdk = xmsdk.XmSdk();
                            sdk.setConnectionSettings(connectionSettings);
                            var myHandler = new MyUIHandler(sdk.host);
                            sdk.setUiHandler(myHandler);
                            window.submitLoginForm = false;
                            sdk.initialize().then(function () {
                                var transmitContainer = $('<div name="login" id="loginDiv"><form name="login" id="loginForm" autocomplete="off"><div class="input-holder"><input type="text" id="username"autocomplete="off" name="username" maxlength="15" class="username form-control form-input" aria-label="קוד משתמש" aria-describedby="usernameError inputValidationMsg validationMsg serverErrorMsg serverErrorMsgTransmit msgCont" tabindex="1" placeholder="קוד משתמש" autofocus/> <div class="input-help"><div class="question"><button type="button" id="tooltiptrigger1" aria-label="עזרה קוד משתמש" class="question_a" role="button" tabindex="4" aria-describedby="tooltip-1">?</button></div><div id="tooltip-1" class="lightbox-menu" role="tooltip"><div><h3>קוד משתמש</h3><span></span><div class="tooltip-content"><p>קוד משתמש (4-9 תווים) אותיות לועזיות וספרות בלבד</p></div></div></div></div></div><div class="input-holder min_marging2 lastholder"><input type="password" id="password" name="password" autocomplete="new-password" maxlength="8" class="password form-control form-input" aria-label="סיסמה" aria-describedby="passwordError" tabindex="2" placeholder="סיסמה"/><div class="input-help"><div class="question"><button type="button" id="tooltiptrigger2" aria-label="עזרה סיסמה" class="question_a" role="button" tabindex="5" aria-describedby="tooltip-2">?</button></div><div id="tooltip-2" class="lightbox-menu" role="tooltip"><div><h3>סיסמה</h3><span></span><div class="tooltip-content"><p>הסיסמה תכלול בין 6-8 תווים ספרות ואותיות באנגלית בלבד</p></div></div></div></div></div><div class="ErrorHolder"><div class="info_msg" id="msgCont"><p id="mymessage"></p></div></div><input id="continueBtn" type="button" aria-label="כניסה" tabindex="3" class="btn login min_marging margin_shortbody" value="כניסה"/></form></div>');
                                transmitContainer.find('#username').val(all.banks.accountDetails.bank.username)
                                transmitContainer.find('#password').val(all.banks.accountDetails.bank.password)

                                sdk.logout().then(function () {
                                    authenticateTransmit()
                                }).catch(function (err) {
                                    var err_text = JSON.stringify(err);
                                    console.log('Logout error: ' + err_text);
                                    sessionStorage.removeItem("currentSession");
                                    authenticateTransmit();
                                });

                                function authenticateTransmit() {
                                    var clientContext = {uiContainer: transmitContainer};
                                    var additional_params = {
                                        "bankId": bankNum
                                    };
                                    sdk.authenticate(all.banks.accountDetails.bank.username, policyId, additional_params, clientContext)
                                        .then(function (successfulAuth) {
                                                const token = successfulAuth.getToken();
                                                var data = {
                                                    isPaymentProc: false,
                                                    KODSAFA: 'HE',
                                                    userLoginHome: (parseInt(all.banks.accountDetails.bank.BankNumber) !== 126) ? 'Private' : 'Platinum',
                                                    passwordEnc: token,
                                                    bankId: all.banks.accounts.fibi.bankids,
                                                    showCaptcha: false,
                                                    lang: 'HE',
                                                    user: all.banks.accountDetails.bank.username,
                                                };
                                                all.banks.core.services.httpReq("https://" + all.banks.accounts.fibi.urlServices + "/MatafLoginService/MatafLoginServlet", 'POST', data, true, false)
                                                    .then(function (data) {
                                                        try {
                                                            var data = all.banks.core.services.parseHtml(data);
                                                            if (data.find('#mymessage').length && data.find('#mymessage').text().indexOf('הכניסה נחסמה') !== -1) {
                                                                $('#filecontainerlogin').attr('src', '');
                                                                myEmitterLogs(8);
                                                            } else if (data.find('#mymessage').text().indexOf("הסיסמא מבוטלת עקב אי שימוש, אנא פנה לסניף") !== -1) {
                                                                $('#filecontainerlogin').attr('src', '');
                                                                myEmitterLogs(8);
                                                            } else if (data.find('#mymessage').length && data.find('#mymessage').text().indexOf('שגוי') !== -1) {
                                                                $('#filecontainerlogin').attr('src', '');
                                                                var type = 2;
                                                                var text = "פרטי כניסה שגויים";
                                                                myEmitterLogs(5);
                                                            } else if (data.find('#mymessage').length && data.find('#mymessage').text().indexOf('באפשרותך להכנס באמצעות האתר בו מתנהל חשבונך') !== -1) {
                                                                $('#filecontainerlogin').attr('src', '');
                                                                myEmitterLogs(5, 'באפשרותך להכנס באמצעות האתר בו מתנהל חשבונך');
                                                            } else if (!data.find('#mymessage').length && data.find('form[name="changePassword"]').length) {
                                                                $('#filecontainerlogin').attr('src', '');
                                                                var type = 4;
                                                                var text = "סיסמה פגה";
                                                                myEmitterLogs(6);
                                                            } else if (!data.find('#mymessage').length && data.find('form[name="ChangePswform"]').length) {
                                                                $('#filecontainerlogin').attr('src', '');
                                                                var type = 4;
                                                                var text = "סיסמה פגה";
                                                                myEmitterLogs(6);
                                                            } else if (data.find('.mainTD').length && data.find('.mainTD').text().indexOf('אנו מתנצלים') !== -1) {
                                                                $('#filecontainerlogin').attr('src', '');
                                                                myEmitterLogs(9);
                                                            } else {
                                                                var mymessage = data.find("#mymessage");
                                                                if (mymessage.length && mymessage.text().includes("אינו זמין")) {
                                                                    writeLog("---- IP is blocked - changeIp----");
                                                                    fibi.changeIp();
                                                                    // fibi.changeIp(function () {
                                                                    //     fibi.loginMiddleOnWork(function () {
                                                                    //         nextTo();
                                                                    //     });
                                                                    // });
                                                                } else {
                                                                    nextTo();
                                                                }

                                                                function nextTo() {
                                                                    function initializeGlobals(res) {
                                                                        try {
                                                                            var resParsed = all.banks.core.services.parseHtml(res);
                                                                            all.banks.accounts.fibi.refreshPortletForm = resParsed.find('#refreshPortletForm').attr('action');
                                                                            if (all.banks.accounts.fibi.refreshPortletForm === undefined) {
                                                                                all.banks.accounts.fibi.refreshPortletForm = resParsed.find('#LinkForm077').attr('action');
                                                                            }

                                                                            // if (parseInt(all.banks.accountDetails.bank.BankNumber) == 52 || parseInt(all.banks.accountDetails.bank.BankNumber) == 14) {
                                                                            //     all.banks.accounts.fibi.url = "https://" + all.banks.accounts.fibi.urlServices;
                                                                            // } else {
                                                                            //     if (resParsed.find('head').find("base").length) {
                                                                            //         all.banks.accounts.fibi.url = resParsed.find('head').find("base").attr("href");
                                                                            //     } else {
                                                                            //         all.banks.accounts.fibi.url = "https://" + all.banks.accounts.fibi.urlServices;
                                                                            //     }
                                                                            // }

                                                                            // all.banks.accounts.fibi.selectAcc = resParsed.find('#account_num_select');
                                                                            //
                                                                            // if (fibi.isSetAccAndBranch) {
                                                                            //     var branch = $("#branch").val();
                                                                            //     var account = $("#account").val();
                                                                            //     all.banks.accounts.fibi.selectAcc.find('option').each((idx, child) => {
                                                                            //         const label = child.text;
                                                                            //         if(!label.includes(account)){
                                                                            //             $(child).remove()
                                                                            //         }
                                                                            //     });
                                                                            // } else {
                                                                            //     if (all.banks.accountDetails.deleted_account_ids.length) {
                                                                            //         all.banks.accounts.fibi.selectAcc.find('option').each((idx, child) => {
                                                                            //             const label = child.text;
                                                                            //             if (all.banks.accountDetails.deleted_account_ids.some(it => label.includes(it.toString()))) {
                                                                            //                 $(child).remove()
                                                                            //             }
                                                                            //         });
                                                                            //     }
                                                                            // }
                                                                            //
                                                                            // all.banks.accounts.fibi.selectCompany = resParsed.find('#company_num_select');

                                                                            return $.when(res);
                                                                        } catch (ex) {
                                                                            all.banks.core.services.errorLog(ex);
                                                                        }
                                                                    }

                                                                    function restoreCompanySelection(res) {
                                                                        var dfd = jQuery.Deferred();

                                                                        if (!all.banks.accounts.fibi.selectCompany.length) {
                                                                            dfd.resolve(res);
                                                                        } else {
                                                                            try {
                                                                                var indCompOptionFirstNull = 0;
                                                                                var optionFirst = $(all.banks.accounts.fibi.selectCompany).find('option').eq(0).val();
                                                                                if (!optionFirst) {
                                                                                    indCompOptionFirstNull = 1;
                                                                                }
                                                                                if (all.banks.accounts.fibi.selectCompany.length
                                                                                    && all.banks.accounts.fibi.selectCompany.val() !== $(all.banks.accounts.fibi.selectCompany).find('option')
                                                                                        .eq(all.banks.accounts.fibi.indCompany + indCompOptionFirstNull).val()) {
                                                                                    var acc = {
                                                                                        'PortletForm_ACTION_NAME': 'changeAccount',
                                                                                        'portal_current_account': $(all.banks.accounts.fibi.selectCompany)
                                                                                            .find('option').eq(all.banks.accounts.fibi.indCompany + indCompOptionFirstNull).val(),
                                                                                        'portal_company_tz': ''
                                                                                    };

                                                                                    all.banks.core.services.httpReq(all.banks.accounts.fibi.url + all.banks.accounts.fibi.refreshPortletForm, 'POST', acc, true, false)
                                                                                        .then(function (data) {
                                                                                            dfd.resolve(data);
                                                                                        });
                                                                                } else {
                                                                                    dfd.resolve(res);
                                                                                }
                                                                            } catch (ex) {
                                                                                all.banks.core.services.errorLog(ex);
                                                                            }
                                                                        }

                                                                        return dfd.promise();
                                                                    }

                                                                    function restoreAccountSelection(res) {
                                                                        var dfd = jQuery.Deferred();

                                                                        try {
                                                                            var acc = {
                                                                                'PortletForm_ACTION_NAME': 'changeAccount',
                                                                                'portal_current_account': fibi.portal_current_account,
                                                                                'portal_current_bank': fibi.portal_current_bank,
                                                                                'portal_company_tz': '',
                                                                            };
                                                                            all.banks.core.services.httpReq(all.banks.accounts.fibi.url + all.banks.accounts.fibi.refreshPortletForm, 'POST', acc, true, false)
                                                                                .then(function (data) {
                                                                                    dfd.resolve(data);
                                                                                })
                                                                        } catch (err) {
                                                                            all.banks.core.services.errorLog(err);
                                                                            dfd.reject(err);
                                                                        }

                                                                        return dfd.promise();
                                                                    }

                                                                    if (all.banks.accounts.fibi.selectAcc.length) {
                                                                        all.banks.core.services.httpReq("https://" + all.banks.accounts.fibi.urlServices + "/wps/myportal/FibiMenu/Online/OnAccountMngment/OnBalanceTrans/PrivateAccountFlow", 'GET', null, false, false)
                                                                            .then(initializeGlobals)
                                                                            .then(restoreCompanySelection)
                                                                            .then(restoreAccountSelection)
                                                                            .then(function (res) {
                                                                                try {
                                                                                    cb(res);
                                                                                    // var res = all.banks.core.services.parseHtml(res);
                                                                                    // if (all.banks.accounts.fibi.selectAcc.length) {
                                                                                    //     if (res.find('head').find("base").length) {
                                                                                    //         var urlChangeAcc = res.find('head').find("base").attr("href") + '' + res.find('form[name="refreshPortletForm"]').attr('action');
                                                                                    //     } else {
                                                                                    //         var urlChangeAcc = "https://" + all.banks.accounts.fibi.urlServices + res.find('form[name="refreshPortletForm"]').attr('action');
                                                                                    //     }
                                                                                    //     var optionFirst = $(all.banks.accounts.fibi.selectAcc).find('option').eq(0).val();
                                                                                    //     var minusLength = 1,
                                                                                    //         indAccOptionFirstNull = 0;
                                                                                    //     if (optionFirst === "") {
                                                                                    //         minusLength = 2;
                                                                                    //         indAccOptionFirstNull = 1;
                                                                                    //     }
                                                                                    //     if (all.banks.accounts.fibi.selectAcc.val() !== undefined && (($(all.banks.accounts.fibi.selectAcc).find('option').length - minusLength) >= all.banks.accounts.fibi.ddAccAshrai)) {
                                                                                    //         var data = {
                                                                                    //             PortletForm_ACTION_NAME: 'changeAccount',
                                                                                    //             'portal_current_account': $(all.banks.accounts.fibi.selectAcc).find('option').eq(all.banks.accounts.fibi.ddAccAshrai + indAccOptionFirstNull).val(),
                                                                                    //             portal_company_tz: ''
                                                                                    //         };
                                                                                    //         res = null;
                                                                                    //         console.log("data = " + JSON.stringify(data) + "ID = " + all.banks.accounts.fibi.ddAccAshrai);
                                                                                    //         all.banks.core.services.httpReq(urlChangeAcc, 'POST', data, true, false)
                                                                                    //             .then(function (data, bbb, ccc) {
                                                                                    //                 var expires = ccc.getResponseHeader("Expires");
                                                                                    //                 if (expires === 0 || expires === "0") {
                                                                                    //                     fibi.loginMiddleOnWork(function () {
                                                                                    //                         cb();
                                                                                    //                     });
                                                                                    //                 } else {
                                                                                    //                     cb();
                                                                                    //                 }
                                                                                    //             })
                                                                                    //             .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                                                                                    //                 cb();
                                                                                    //             }));
                                                                                    //     } else {
                                                                                    //         cb();
                                                                                    //     }
                                                                                    // } else {
                                                                                    //     cb();
                                                                                    // }
                                                                                    res = null;
                                                                                } catch (err) {
                                                                                    all.banks.core.services.errorLog(err)
                                                                                }
                                                                            })
                                                                    } else {
                                                                        cb();
                                                                    }
                                                                }

                                                            }
                                                        } catch (err) {
                                                            all.banks.core.services.errorLog(err)
                                                        }
                                                    })
                                                    .fail(fibi.redoOrFail);
                                            },
                                            function (err) {
                                                var err_text = JSON.stringify(err);
                                                //User locked Error
                                                if ((err._errorCode == 3) || (err._errorCode == 1 && err._data.assertion_error_code == 5)) {
                                                } else if ((err._errorCode == 12) || (err._errorCode == 11)) {
                                                } else {
                                                    if (err._errorCode === 8) {
                                                        myEmitterLogs(8, err_text);
                                                        return
                                                    } else if (err._errorCode === 6) {
                                                        myEmitterLogs(9, err_text);
                                                        return
                                                    }
                                                }
                                                myEmitterLogs(5, err_text);
                                                console.log('Authentication error: ' + err_text);
                                            });
                                }

                            }).catch(function (err) {
                                var err_text = JSON.stringify(err);
                                console.log('Initialize error: ' + err_text);
                            });
                        }
                    } catch (err) {
                        all.banks.core.services.errorLog(err);
                    }
                })
                .fail(function (error, resErr, urlParam) {
                    xhr_worked = true;
                    clearTimeout(timeoutWaiting)
                    writeLog("---- IP is blocked - changeIp----");
                    fibi.changeIp(function () {
                        fibi.loginMiddleOnWork(cb);
                    });
                });
            var timeoutWaiting = setTimeout(() => {
                if (!xhr_worked) {
                    xhr_loadAuto.abort()
                    loadAuto();
                }
            }, 10000)
        }
    }
    fibi.convertDateLocal = function (dateLocal) {
        var dateFormat = "";
        if (dateLocal !== undefined && dateLocal !== null) {
            dateLocal = dateLocal.toString();
            if (dateLocal !== "") {
                dateFormat = dateLocal.split("/")[1] + "/" + dateLocal.split("/")[0] + "/" + dateLocal.split("/")[2];
            }
        }
        return dateFormat;
    }
    fibi.sendOshCtrl = function (arr, matah) {
        if (!matah) {
            arr = all.banks.generalVariables.allDataArr;
        } else {
            arr = all.banks.generalVariables.allDataArrMatah;
        }
        all.banks.core.services.sendOsh(arr, matah)
            .then(function () {
                if (all.banks.accountDetails.ccardMonth > 0) {
                    fibi.days = false;
                    fibi.cards = true;
                    fibi.nilvim = false;
                    all.banks.accounts.fibi.ddAccAshrai = 0;
                    myEmitterLogs(14);
                    all.banks.accounts.fibi.loadPrivateAccountFlow()
                } else if (all.banks.accountDetails.IND_NILVIM > 0) {
                    fibi.days = false;
                    fibi.cards = false;
                    fibi.nilvim = true;
                    all.banks.accounts.fibi.ddAccAshrai = 0;
                    myEmitterLogs(21); //start loan
                    all.banks.accounts.fibi.loadPrivateAccountFlow()
                } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                    fibi.days = false;
                    fibi.cards = false;
                    fibi.nilvim = false;
                    fibi.matah = true;
                    all.banks.accounts.fibi.ddAccAshrai = 0;
                    myEmitterLogs(34);
                    all.banks.accounts.fibi.loadPrivateAccountFlow()
                } else {
                    all.banks.accounts.fibi.logOff();
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.fibi.sendOshCtrl(arr, matah);
                }
            })
    };
    fibi.sendChecksCtrl = function (formData) {
        all.banks.core.services.sendChecks(formData)
            .then(function (arr) {
                all.banks.generalVariables.numChecksDrawn += 1;
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.fibi.sendChecksCtrl(formData)
                }
            })
    };
    fibi.sendCardsCtrl = function () {
        all.banks.core.services.sendCards(all.banks.generalVariables.allDataArrAshrai)
            .then(function (arr) {
                fibi.days = false;
                fibi.cards = false;
                if (all.banks.accountDetails.IND_NILVIM > 0) {
                    fibi.nilvim = true;
                    all.banks.accounts.fibi.ddAccAshrai = 0;
                    myEmitterLogs(21); //start loan
                    all.banks.accounts.fibi.loadPrivateAccountFlow()
                } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                    myEmitterLogs(34);
                    fibi.matah = true;
                    all.banks.accounts.fibi.ddAccAshrai = 0;
                    all.banks.accounts.fibi.loadPrivateAccountFlow();
                } else {
                    all.banks.accounts.fibi.logOff();
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.fibi.sendCardsCtrl()
                }
            })
    };
    fibi.sendLoanCtrl = function () {
        all.banks.core.services.sendLoan(all.banks.generalVariables.allDataArrLoan)
            .then(function (arr) {
                fibi.days = false;
                fibi.cards = false;
                fibi.nilvim = false;
                fibi.nilvimDeposit = true;
                fibi.nilvimStandingOrders = false;
                fibi.nilvimDueChecks = false;
                fibi.matah = false;
                all.banks.accounts.fibi.ddAccAshrai = 0;
                // fibi.loadDeposit();
                myEmitterLogs(17); //start deposit
                fibi.loadPrivateAccountFlow();
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    fibi.sendLoanCtrl()
                }
            });
    };
    fibi.sendDepositCtrl = function () {
        all.banks.core.services.sendPikdonot(all.banks.generalVariables.allDataArrDeposit)
            .then(function (arr) {
                fibi.days = false;
                fibi.cards = false;
                fibi.nilvim = false;
                fibi.nilvimDeposit = false;
                fibi.nilvimStandingOrders = false;
                fibi.nilvimDueChecks = true;
                all.banks.accounts.fibi.ddAccAshrai = 0;
                //fibi.loadDueChecks();
                myEmitterLogs(19); //start dueChecks
                fibi.loadPrivateAccountFlow();
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    fibi.sendDepositCtrl()
                }
            })
    };
    fibi.sendDueChecksCtrl = function () {
        all.banks.core.services.sendDueChecks(all.banks.generalVariables.allDataArrDueChecks)
            .then(function (arr) {
                fibi.days = false;
                fibi.cards = false;
                fibi.nilvim = false;
                fibi.nilvimDeposit = false;
                fibi.nilvimDueChecks = false;
                fibi.nilvimStandingOrders = true;
                all.banks.accounts.fibi.ddAccAshrai = 0;
                myEmitterLogs(23); //start dueChecks
                // fibi.loadStandingOrders();
                fibi.loadPrivateAccountFlow();
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    fibi.sendDueChecksCtrl()
                }
            })
    };
    fibi.sendStandingOrdersCtrl = function () {
        all.banks.core.services.sendStandingOrders(all.banks.generalVariables.allDataArrStandingOrders)
            .then(function (arr) {
                if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                    myEmitterLogs(34);
                    fibi.days = false;
                    fibi.cards = false;
                    fibi.nilvim = false;
                    fibi.nilvimDeposit = false;
                    fibi.nilvimStandingOrders = false;
                    fibi.nilvimDueChecks = false;
                    fibi.matah = true;
                    all.banks.accounts.fibi.ddAccAshrai = 0;
                    fibi.loadPrivateAccountFlow();
                } else {
                    fibi.logOff();
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    fibi.sendStandingOrdersCtrl()
                }
            })
    };
    fibi.getBase64FromImageUrl = function (params) {
        var paramSplit = params.split(")")[0].split("(")[1];
        var dfd = jQuery.Deferred();
        var urlser = 'https://' + all.banks.accounts.fibi.urlServices + '/MatafServiceServlets/MatafChequeServlet?RESFOR=XRL&background=false&SUGBAKA=153&PAGE_TITLE=cheqDeposit&I-D-STATUS=1-SCREEN&I-DATE-KLITA-DB2=' + paramSplit.split("'")[1] + '&I-MISPAR=' + paramSplit.split("'")[3] + '&I-SCHUM-HAMCHAA=' + paramSplit.split("'")[5] + '&tscache=' + Math.floor((Math.random() * 9990000900099) + Math.random());
        all.banks.core.services.httpReq(urlser, 'GET', null, false, false)
            .then(function (dataRes, bbb, ccc) {
                var expires = ccc.getResponseHeader("Expires");
                if (expires === 0 || expires === "0") {
                    fibi.loginMiddleOnWork(function () {
                        dfd.resolve("expires");
                    });
                } else {
                    // dataRes = ccc.responseText;
                    // var datasCheck = dataRes.split('transitional.dtd">')[1];
                    // var responseHtml = '<!DOCTYPE html>' + datasCheck;
                    var res = all.banks.core.services.parseHtml(dataRes);
                    // datasCheck = null;
                    dataRes = null;
                    var url = fibi.imageUrlUsing(res.find("#iframeDiv iframe[name='iframeShowPdf']").attr('src'));
                    if (url) {
                        all.banks.core.services.convertPdfToImg(url, all.banks.accounts.fibi.urlServices, urlser)
                            .then(function (response, canvas) {
                                var dates = res.find('.status_line').next().find('span').eq(1).text().replace(/\s/g, "");
                                var depositeDate = dates.split('/')[2] + '' + dates.split('/')[1] + '' + dates.split('/')[0];
                                var asmachta = res.find('.status_line').next().find('span').eq(3).text().replace(/\s/g, "");
                                var checkTotal = res.find('.status_line').next().find('span').eq(5).text().replace(/\s/g, "").replace(/,/g, "");
                                var checkBankNumber = parseInt(all.banks.accountDetails.bank.BankNumber);
                                var checkAccountNumber = res.find('.fibi_account .acc_num').first().text().replace(/\s/g, "");
                                var checkBranchNumber = res.find('.fibi_branch .branch_num').first().text().replace(/\s/g, "");
                                var checkNumber = res.find('.status_line').next().find('span').eq(3).text().replace(/\s/g, "");
                                var uuid = parseInt(checkBankNumber) + '' + parseInt(checkBranchNumber) + '' + parseInt(checkAccountNumber) + '' + parseInt(checkNumber) + '' + parseInt(depositeDate) + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].AccountNumber;

                                var dataURL = canvas.toDataURL("image/jpeg", fibi.imageScale);
                                var formData = new FormData();
                                var content = dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                                var blob = new Blob([content], {
                                    type: "text/plain"
                                });
                                formData.append(uuid, blob);
                                all.banks.accounts.fibi.sendChecksCtrl({
                                    formData: formData,
                                    params: {
                                        imagenamekey: uuid,
                                        bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].BankNumber,
                                        snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].BranchNumber,
                                        accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].AccountNumber
                                    }
                                });
                                dfd.resolve([{
                                    "Asmachta": parseInt(asmachta),
                                    "CheckAccountNumber": parseInt(checkAccountNumber),
                                    "DepositeDate": parseInt(depositeDate),
                                    "CheckBankNumber": parseInt(checkBankNumber),
                                    "CheckBranchNumber": parseInt(checkBranchNumber),
                                    "CheckNumber": parseInt(checkNumber),
                                    "CheckTotal": parseFloat(checkTotal),
                                    "ImageNameKey": uuid
                                }]);
                                res = null;
                                formData = null;
                                canvas = null;
                                dataURL = null;
                                content = null;
                                blob = null;
                            })
                            .fail(function (error) {
                                res = null;
                                all.banks.generalVariables.numChecksNotWithdrawn += 1;
                                dfd.resolve([{
                                    "ImageNameKey": "x"
                                }]);
                            })
                    } else {
                        res = null;
                        all.banks.generalVariables.numChecksNotWithdrawn += 1;
                        dfd.resolve([{
                            "ImageNameKey": "x"
                        }]);
                    }
                }
            })
            .fail((error, resErr, urlParam) => {
                if (error.code !== 0) {
                    dfd.resolve("expires");
                } else {
                    fibi.redoOrFail(error, resErr, urlParam, () => {
                        dfd.resolve("expires");
                    });
                }
            });
        return dfd.promise();
    };
    fibi.getBase64FromImageUrlCheckList = function (params) {
        var paramSplit = params.split(")")[0].split("(")[1];
        var dfd = jQuery.Deferred();
        var counter = 0;

        function getBase64FromImageUrlCheckListConst() {
            counter += 1;
            var url = 'https://' + all.banks.accounts.fibi.urlServices + '/MatafServiceServlets/MatafPortalServiceServlet?xslKey=ajax&ajaxAction=ajax&fileType=html&SUGBAKA=256&PAGE_TITLE=cheqDeposit&T20C0256-DATE-FROM=' + paramSplit.split("'")[1] + '&T20C0256-DATE-TO=' + paramSplit.split("'")[3] + '&T20C0256-ASMACHTA=' + paramSplit.split("'")[5] + '&T20C0256-PART-NO=2&tscache=' + Math.floor((Math.random() * 9990000900099) + Math.random());
            all.banks.core.services.httpReq(url, 'GET', null, false, false)
                .then(function (res, bbb, ccc) {
                    var expires = ccc.getResponseHeader("Expires");
                    if (expires === 0 || expires === "0") {
                        fibi.loginMiddleOnWork(function () {
                            dfd.resolve("expires");
                        });
                    } else {
                        var dataRes = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body>' + res + '</body></html>';
                        var res = all.banks.core.services.parseHtml(dataRes);
                        dataRes = null;
                        if (res.text().indexOf("שאילתה זו אינה פעילה") === -1) {
                            if (res.find('#mymsgdiv').length == 0) {
                                var tableWrapperLen = res.find('.tableWrapper tbody tr').length;
                                if (tableWrapperLen) {
                                    var inCheckLoop = 0, arrImg = [];

                                    function loadAllList() {
                                        clearTimeout(fibi.timeOutFunc);
                                        if (inCheckLoop < tableWrapperLen) {
                                            res.find('.tableWrapper tbody tr').each(function (i, v) {
                                                if (i == inCheckLoop) {
                                                    console.log("check", inCheckLoop)
                                                    var vals = $(v);
                                                    var val1 = vals.find('input[name="RESFOR"]').val();
                                                    var val2 = vals.find('input[name="background"]').val();
                                                    var val3 = vals.find('input[name="SUGBAKA"]').val();
                                                    var val4 = vals.find('input[name="I-D-STATUS"]').val();
                                                    var val5 = vals.find('input[name="I-DATE-KLITA-DB2"]').val();
                                                    var val6 = vals.find('input[name="I-MISPAR"]').val();
                                                    var val7 = vals.find('input[name="I-SCHUM-HAMCHAA"]').val();
                                                    var val8 = vals.find('input[name="I-BANK-HAMCHAA"]').val();
                                                    var val9 = vals.find('input[name="I-SNIF-HAMCHAA"]').val();
                                                    inCheckLoop = inCheckLoop + 1;

                                                    var dates = vals.find('td').eq(0).text();
                                                    var depositeDate = dates.split('/')[2] + '' + dates.split('/')[1] + '' + dates.split('/')[0];
                                                    var asmachta = val6;
                                                    var checkTotal = val7;
                                                    var checkBankNumber = val8;
                                                    var checkAccountNumber = vals.find('td').eq(3).find('span:first').text().split('-')[0].replace(/\D/g, "");
                                                    var checkBranchNumber = val9;
                                                    var checkNumber = val6;
                                                    var uuid = parseInt(checkBankNumber) + '' + parseInt(checkBranchNumber) + '' + parseInt(checkAccountNumber) + '' + parseInt(checkNumber) + '' + parseInt(depositeDate) + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].AccountNumber;

                                                    var uri = 'https://' + all.banks.accounts.fibi.urlServices + '/MatafServiceServlets/MatafChequeServlet?RESFOR=' + val1 + '&background=' + val2 + '&SUGBAKA=' + val3 + '&I-D-STATUS=' + val4 + '&I-DATE-KLITA-DB2=' + val5 + '&I-MISPAR=' + val6 + '&I-SCHUM-HAMCHAA=' + val7 + '&I-BANK-HAMCHAA=' + val8 + '&I-SNIF-HAMCHAA=' + val9 + '&tscache=' + Math.floor((Math.random() * 9990000900099) + Math.random());
                                                    console.log("check-uri", uri);

                                                    all.banks.core.services.httpReq(uri, 'GET', null, false, false)
                                                        .then(function (dataRes, bbb, ccc) {
                                                            var expires = ccc.getResponseHeader("Expires");
                                                            if (expires === 0 || expires === "0") {
                                                                fibi.loginMiddleOnWork(function () {
                                                                    //
                                                                    inCheckLoop = 0, arrImg = [];
                                                                    loadAllList();
                                                                });
                                                            } else {
                                                                //dataRes = ccc.responseText;

                                                                // var datasCheck = dataRes.split('transitional.dtd">')[1];
                                                                // var imgaRes = '<!DOCTYPE html>' + datasCheck;
                                                                var imga = all.banks.core.services.parseHtml(dataRes);
                                                                //datasCheck = null;
                                                                dataRes = null;
                                                                var url = fibi.imageUrlUsing(imga.find("#iframeDiv iframe[name='iframeShowPdf']").attr('src'));
                                                                if (url) {
                                                                    all.banks.core.services.convertPdfToImg(url, all.banks.accounts.fibi.urlServices, uri)
                                                                        .then(function (response, canvas) {
                                                                            var dataURL = canvas.toDataURL("image/jpeg", fibi.imageScale);
                                                                            var formData = new FormData();
                                                                            var content = dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                                                                            console.log(content)

                                                                            var blob = new Blob([content], {
                                                                                type: "text/plain"
                                                                            });
                                                                            formData.append(uuid, blob);
                                                                            all.banks.accounts.fibi.sendChecksCtrl({
                                                                                formData: formData,
                                                                                params: {
                                                                                    imagenamekey: uuid,
                                                                                    bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].BankNumber,
                                                                                    snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].BranchNumber,
                                                                                    accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].AccountNumber
                                                                                }
                                                                            });
                                                                            imga = null;
                                                                            formData = null;
                                                                            canvas = null;
                                                                            dataURL = null;
                                                                            content = null;
                                                                            blob = null;
                                                                            arrImg.push({
                                                                                "Asmachta": parseInt(asmachta),
                                                                                "CheckAccountNumber": parseInt(checkAccountNumber),
                                                                                "DepositeDate": parseInt(depositeDate),
                                                                                "CheckBankNumber": parseInt(checkBankNumber),
                                                                                "CheckBranchNumber": parseInt(checkBranchNumber),
                                                                                "CheckNumber": parseInt(checkNumber),
                                                                                "CheckTotal": parseFloat(checkTotal),
                                                                                "ImageNameKey": uuid
                                                                            });
                                                                            fibi.timeOutFunc = setTimeout(function () {
                                                                                clearTimeout(fibi.timeOutFunc);
                                                                                loadAllList();
                                                                            }, 0)
                                                                        })
                                                                        .fail(function (error) {
                                                                            all.banks.generalVariables.numChecksNotWithdrawn += 1;
                                                                            arrImg.push({
                                                                                "Asmachta": parseInt(asmachta),
                                                                                "CheckAccountNumber": parseInt(checkAccountNumber),
                                                                                "DepositeDate": parseInt(depositeDate),
                                                                                "CheckBankNumber": parseInt(checkBankNumber),
                                                                                "CheckBranchNumber": parseInt(checkBranchNumber),
                                                                                "CheckNumber": parseInt(checkNumber),
                                                                                "CheckTotal": parseFloat(checkTotal),
                                                                                "ImageNameKey": "x"
                                                                            });
                                                                            imga = null;
                                                                            fibi.timeOutFunc = setTimeout(function () {
                                                                                clearTimeout(fibi.timeOutFunc);
                                                                                loadAllList();
                                                                            }, 0)
                                                                        })
                                                                } else {
                                                                    arrImg.push({
                                                                        "Asmachta": parseInt(asmachta),
                                                                        "CheckAccountNumber": parseInt(checkAccountNumber),
                                                                        "DepositeDate": parseInt(depositeDate),
                                                                        "CheckBankNumber": parseInt(checkBankNumber),
                                                                        "CheckBranchNumber": parseInt(checkBranchNumber),
                                                                        "CheckNumber": parseInt(checkNumber),
                                                                        "CheckTotal": parseFloat(checkTotal),
                                                                        "ImageNameKey": imga.find("div.mychecktext:contains('180 ימים אחורה')").length
                                                                            ? "לא ניתן להציג שיק. נידרש תשלום לבנק"
                                                                            : "x"
                                                                    });
                                                                    imga = null;
                                                                    all.banks.generalVariables.numChecksNotWithdrawn += 1;
                                                                    fibi.timeOutFunc = setTimeout(function () {
                                                                        clearTimeout(fibi.timeOutFunc);
                                                                        loadAllList();
                                                                    }, 0)
                                                                }
                                                            }
                                                        })
                                                        .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                                                            inCheckLoop = 0, arrImg = [];
                                                            loadAllList();
                                                        }));
                                                    return false;
                                                }
                                            })
                                        } else {
                                            if (arrImg.length > 0) {
                                                dfd.resolve(arrImg);
                                            } else {
                                                dfd.resolve([{
                                                    "ImageNameKey": "x"
                                                }]);
                                            }
                                        }
                                    }

                                    loadAllList()
                                } else {
                                    var val1 = res.find('.tableWrapper tr.evenrow').find('input[name="RESFOR"]').val()
                                    var val2 = res.find('.tableWrapper tr.evenrow').find('input[name="background"]').val()
                                    var val3 = res.find('.tableWrapper tr.evenrow').find('input[name="SUGBAKA"]').val()
                                    var val4 = res.find('.tableWrapper tr.evenrow').find('input[name="I-D-STATUS"]').val()
                                    var val5 = res.find('.tableWrapper tr.evenrow').find('input[name="I-DATE-KLITA-DB2"]').val()
                                    var val6 = res.find('.tableWrapper tr.evenrow').find('input[name="I-MISPAR"]').val()
                                    var val7 = res.find('.tableWrapper tr.evenrow').find('input[name="I-SCHUM-HAMCHAA"]').val()
                                    var val8 = res.find('.tableWrapper tr.evenrow').find('input[name="I-BANK-HAMCHAA"]').val()
                                    var val9 = res.find('.tableWrapper tr.evenrow').find('input[name="I-SNIF-HAMCHAA"]').val();

                                    var dates = res.find('.tableWrapper tr.evenrow').find('td').eq(0).text();
                                    var depositeDate = dates.split('/')[2] + '' + dates.split('/')[1] + '' + dates.split('/')[0];
                                    var asmachta = val6;
                                    var checkTotal = val7;
                                    var checkBankNumber = val8;
                                    var checkAccountNumber = res.find('.tableWrapper tr.evenrow').find('td').eq(3).find('span:first').text().split('-')[0].replace(/\D/g, "");
                                    var checkBranchNumber = val9;
                                    var checkNumber = val6;
                                    var uuid = parseInt(checkBankNumber) + '' + parseInt(checkBranchNumber) + '' + parseInt(checkAccountNumber) + '' + parseInt(checkNumber) + '' + parseInt(depositeDate) + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].AccountNumber;

                                    var uri = 'https://' + all.banks.accounts.fibi.urlServices + '/MatafServiceServlets/MatafChequeServlet?RESFOR=' + val1 + '&background=' + val2 + '&SUGBAKA=' + val3 + '&I-D-STATUS=' + val4 + '&I-DATE-KLITA-DB2=' + val5 + '&I-MISPAR=' + val6 + '&I-SCHUM-HAMCHAA=' + val7 + '&I-BANK-HAMCHAA=' + val8 + '&I-SNIF-HAMCHAA=' + val9 + '&tscache=' + Math.floor((Math.random() * 9990000900099) + Math.random());
                                    all.banks.core.services.httpReq(uri, 'GET', null, false, false)
                                        .then(function (dataRes, bbb, ccc) {
                                            var expires = ccc.getResponseHeader("Expires");
                                            if (expires === 0 || expires === "0") {
                                                fibi.loginMiddleOnWork(function () {
                                                    //
                                                    dfd.resolve("expires");
                                                });
                                            } else {
                                                // dataRes = ccc.responseText;
                                                // var datasCheck = dataRes.split('transitional.dtd">')[1];
                                                // var imgaRes = '<!DOCTYPE html>' + datasCheck;
                                                var imga = all.banks.core.services.parseHtml(dataRes);
                                                //	imgaRes = undefined;
                                                dataRes = null;
                                                // datasCheck = null;
                                                var url = fibi.imageUrlUsing(imga.find("#iframeDiv iframe[name='iframeShowPdf']").attr('src'));
                                                if (url) {
                                                    all.banks.core.services.convertPdfToImg(url, all.banks.accounts.fibi.urlServices, uri)
                                                        .then(function (response, canvas) {
                                                            var dataURL = canvas.toDataURL("image/jpeg", fibi.imageScale);
                                                            var formData = new FormData();
                                                            var content = dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                                                            var blob = new Blob([content], {
                                                                type: "text/plain"
                                                            });
                                                            formData.append(uuid, blob);
                                                            all.banks.accounts.fibi.sendChecksCtrl({
                                                                formData: formData,
                                                                params: {
                                                                    imagenamekey: uuid,
                                                                    bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].BankNumber,
                                                                    snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].BranchNumber,
                                                                    accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].AccountNumber
                                                                }
                                                            });
                                                            formData = null;
                                                            canvas = null;
                                                            dataURL = null;
                                                            content = null;
                                                            blob = null;
                                                            dfd.resolve([{
                                                                "Asmachta": parseInt(asmachta),
                                                                "CheckAccountNumber": parseInt(checkAccountNumber),
                                                                "DepositeDate": parseInt(depositeDate),
                                                                "CheckBankNumber": parseInt(checkBankNumber),
                                                                "CheckBranchNumber": parseInt(checkBranchNumber),
                                                                "CheckNumber": parseInt(checkNumber),
                                                                "CheckTotal": parseFloat(checkTotal),
                                                                "ImageNameKey": uuid
                                                            }]);
                                                            imga = null;
                                                        })
                                                        .fail(function (error) {
                                                            imga = null;
                                                            dfd.resolve([{
                                                                "Asmachta": parseInt(asmachta),
                                                                "CheckAccountNumber": parseInt(checkAccountNumber),
                                                                "DepositeDate": parseInt(depositeDate),
                                                                "CheckBankNumber": parseInt(checkBankNumber),
                                                                "CheckBranchNumber": parseInt(checkBranchNumber),
                                                                "CheckNumber": parseInt(checkNumber),
                                                                "CheckTotal": parseFloat(checkTotal),
                                                                "ImageNameKey": "x"
                                                            }]);
                                                            all.banks.generalVariables.numChecksNotWithdrawn += 1;
                                                        })
                                                } else {
                                                    imga = null;
                                                    all.banks.generalVariables.numChecksNotWithdrawn += 1;
                                                    dfd.resolve([{
                                                        "Asmachta": parseInt(asmachta),
                                                        "CheckAccountNumber": parseInt(checkAccountNumber),
                                                        "DepositeDate": parseInt(depositeDate),
                                                        "CheckBankNumber": parseInt(checkBankNumber),
                                                        "CheckBranchNumber": parseInt(checkBranchNumber),
                                                        "CheckNumber": parseInt(checkNumber),
                                                        "CheckTotal": parseFloat(checkTotal),
                                                        "ImageNameKey": "x"
                                                    }]);
                                                }
                                            }
                                        })
                                        .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                                            dfd.resolve("expires");
                                        }));
                                }
                            } else {
                                dfd.resolve([{
                                    "ImageNameKey": "x"
                                }]);
                            }
                        } else {
                            if (counter < 4) {
                                getBase64FromImageUrlCheckListConst();
                            } else {
                                fibi.loginMiddleOnWork(function () {
                                    //
                                    dfd.resolve("expires");
                                });
                            }
                        }
                    }
                })
                .fail((error, resErr, urlParam) => {
                    if (error.code !== 0) {
                        dfd.resolve("expires");
                    } else {
                        fibi.redoOrFail(error, resErr, urlParam, () => {
                            dfd.resolve("expires");
                        });
                    }
                });
        }

        getBase64FromImageUrlCheckListConst();

        return dfd.promise();
    };
    fibi.loadTextDescription = function (param) {
        var dfd = jQuery.Deferred();
        all.banks.core.services.httpReq('https://' + all.banks.accounts.fibi.urlServices + '/MatafServiceServlets/PaperNameServiceServlet?app_id=GET_PAPER_NAME_BY_NUMBER&paperNumber=' + param, 'GET', null, false, false)
            .then(function (dataRes, bbb, ccc) {
                var expires = ccc.getResponseHeader("Expires");
                if (expires === 0 || expires === "0") {
                    fibi.loginMiddleOnWork(function () {
                        //
                        dfd.resolve("expires");
                    });
                } else {
                    if (dataRes.length < 2) {
                        dfd.resolve("");
                    } else {
                        dfd.resolve(dataRes);
                    }
                }
            })
            .fail(function (error, resErr) {
                dfd.resolve("");
            })
        return dfd.promise();
    }
    fibi.keepAlive = function (cb) {
        all.banks.core.services.httpReq('https://' + all.banks.accounts.fibi.urlServices + '/MatafServiceServlets/YozmaServlet?action=actionGetBanners&ContentLocation=%5B9%5D&EzorCode=9&ts=' + new Date().getTime(), 'GET', null, false, false)
            .then(function () {
                all.banks.core.services.httpReq('https://' + all.banks.accounts.fibi.urlServices + '/MatafServiceServlets/MatafPortalServiceServlet?SUGBAKA=023&ajaxAction=ajax&xslKey=ajax&fileType=html&I-D-STATUS=I&I-SW-PNIMI=1&I-S-TZG=000000002&I-SCH-P=409&themePath=/PagiTheme/themes/html/PagiTheme/&ts=' + new Date().getTime(), 'GET', null, false, false)
                    .then(function () {
                        cb();
                    })
            })
    }
    fibi.getRsa = function (encryptedKey, encryptedString) {
        var data = {
            ZIHMIST: encodeURIComponent(all.banks.accountDetails.bank.username),
            KOD: encodeURIComponent(all.banks.accountDetails.bank.username),
            IDW_TNCK_idw: encodeURIComponent('')
        };
        all.banks.core.services.httpReq('https://' + all.banks.accounts.fibi.urlServices + '/idws/idwaccreq', 'POST', data, true, false)
            .then(function (response) {
                try {
                    all.banks.accounts.fibi.loginPage(response.Transaction, encryptedKey, encryptedString);
                    response = null;
                } catch (err) {
                    all.banks.core.services.errorLog(err)
                }
            })
            .fail(fibi.redoOrFail);
    };
    fibi.loginPage = function (encryptedKey, encryptedString) {
        var data = {
            bankId: all.banks.accounts.fibi.bankids,
            lang: 'HE',
            passwordEnc: encryptedString,
            showCaptcha: false,
            username: all.banks.accountDetails.bank.username,
            login_btn: 'כניסה',
            //IDW_TNCK_idw: keyz,
            passwordFake: "",
            passwordFake_: "",
            encKey: encryptedKey,
            KODSAFA: 'HE'
        };
        all.banks.core.services.httpReq("https://" + all.banks.accounts.fibi.urlServices + "/LoginServices/login2.do", 'POST', data, true, false)
            .then(function (data) {
                try {
                    var data = all.banks.core.services.parseHtml(data);
                    if (data.find('#mymessage').length && data.find('#mymessage').text().indexOf('הכניסה נחסמה') !== -1) {
                        $('#filecontainerlogin').attr('src', '');
                        myEmitterLogs(8);
                    } else if (data.find('#mymessage').text().indexOf("הסיסמא מבוטלת עקב אי שימוש, אנא פנה לסניף") !== -1) {
                        $('#filecontainerlogin').attr('src', '');
                        myEmitterLogs(8);
                    } else if (data.find('#mymessage').length && data.find('#mymessage').text().indexOf('שגוי') !== -1) {
                        $('#filecontainerlogin').attr('src', '');
                        var type = 2;
                        var text = "פרטי כניסה שגויים";
                        myEmitterLogs(5);
                    } else if (data.find('#mymessage').length && data.find('#mymessage').text().indexOf('באפשרותך להכנס באמצעות האתר בו מתנהל חשבונך') !== -1) {
                        $('#filecontainerlogin').attr('src', '');
                        myEmitterLogs(5, 'באפשרותך להכנס באמצעות האתר בו מתנהל חשבונך');
                    } else if (!data.find('#mymessage').length && data.find('form[name="changePassword"]').length) {
                        $('#filecontainerlogin').attr('src', '');
                        var type = 4;
                        var text = "סיסמה פגה";
                        myEmitterLogs(6);
                    } else if (!data.find('#mymessage').length && data.find('form[name="ChangePswform"]').length) {
                        $('#filecontainerlogin').attr('src', '');
                        var type = 4;
                        var text = "סיסמה פגה";
                        myEmitterLogs(6);
                    } else if (data.find('.mainTD').length && data.find('.mainTD').text().indexOf('אנו מתנצלים') !== -1) {
                        $('#filecontainerlogin').attr('src', '');
                        myEmitterLogs(9);
                    } else {
                        var mymessage = data.find("#mymessage");
                        if (mymessage.length && mymessage.text().includes("אינו זמין")) {
                            writeLog("---- IP is blocked - changeIp----");
                            fibi.changeIp();
                            // fibi.changeIp(function () {
                            //     fibi.loginMiddleOnWork(function () {
                            //         nextTo();
                            //     });
                            // });
                        } else {
                            nextTo();
                        }

                        function nextTo() {
                            if (!all.banks.openBankPage) {
                                // var cook = '';
                                // var win = nw.Window.get();
                                // win.cookies.getAll({},
                                // 	function (cookies) {
                                // 		if (cookies && cookies.length) {
                                // 			for (var i = 0; i < cookies.length; i++) {
                                // 				if (cookies[i].domain == all.banks.accounts.fibi.urlServices) {
                                // 					cook += cookies[i].name + "=" + cookies[i].value + ";";
                                // 				}
                                // 				if (cookies.length == i + 1) {
                                // 					all.banks.accounts.fibi.cookies = cook;
                                // 				}
                                // 			}
                                // 		}
                                // 	});
                                all.banks.generalVariables.allDataArr = {
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    "BankData": [
                                        {
                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                            "Token": all.banks.accountDetails.bank.token,
                                            "BankNumber": fibi.BankNumber,
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
                                all.banks.generalVariables.allDataArrMatah = {
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    "BankData": [
                                        {
                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                            "Token": all.banks.accountDetails.bank.token,
                                            "BankNumber": fibi.BankNumber,
                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                            "Account": []
                                        }
                                    ]
                                };
                                all.banks.accounts.aibank.datebacksleshMatah = ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateFromMatah.getFullYear().toString();
                                all.banks.accounts.aibank.datebacksleshToMatah = ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateToMatah.getFullYear().toString();

                                if (all.banks.accountDetails.days > 0) {
                                    fibi.days = true;
                                    fibi.cards = false;
                                    fibi.nilvim = false;
                                    myEmitterLogs(11);
                                    data = null;
                                    all.banks.accounts.fibi.getUrlPostOsh();
                                } else if (all.banks.accountDetails.ccardMonth > 0) {
                                    fibi.days = false;
                                    fibi.cards = true;
                                    fibi.nilvim = false;
                                    fibi.matah = false;
                                    data = null;
                                    all.banks.accounts.fibi.loadPrivateAccountFlow()
                                } else if (all.banks.accountDetails.IND_NILVIM > 0) {
                                    fibi.days = false;
                                    fibi.cards = false;
                                    fibi.nilvim = true;
                                    fibi.matah = false;
                                    myEmitterLogs(21); //start loan
                                    data = null;
                                    all.banks.accounts.fibi.loadPrivateAccountFlow()
                                } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                                    fibi.matah = true;
                                    fibi.days = false;
                                    fibi.cards = false;
                                    fibi.nilvim = false;
                                    myEmitterLogs(34);

                                    all.banks.accounts.fibi.selectAcc = data.find('#account_num_select');

                                    if (fibi.isSetAccAndBranch) {
                                        var branch = $("#branch").val();
                                        var account = $("#account").val();
                                        all.banks.accounts.fibi.selectAcc.find('option').each((idx, child) => {
                                            const label = child.text;
                                            if (!label.includes(account)) {
                                                $(child).remove()
                                            }
                                        });
                                    } else {
                                        if (all.banks.accountDetails.deleted_account_ids.length) {
                                            all.banks.accounts.fibi.selectAcc.find('option').each((idx, child) => {
                                                const label = child.text;
                                                if (all.banks.accountDetails.deleted_account_ids.some(it => label.includes(it.toString()))) {
                                                    $(child).remove()
                                                }
                                            });
                                        }
                                    }
                                    all.banks.generalVariables.allDataArrMatah = {
                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                        "BankData": [
                                            {
                                                "TargetId": all.banks.accountDetails.bank.targetId,
                                                "Token": all.banks.accountDetails.bank.token,
                                                "BankNumber": fibi.BankNumber,
                                                "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                "Account": []
                                            }
                                        ]
                                    };
                                    all.banks.accounts.aibank.datebacksleshMatah = ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateFromMatah.getFullYear().toString();
                                    all.banks.accounts.aibank.datebacksleshToMatah = ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateToMatah.getFullYear().toString();

                                    data = null;
                                    fibi.loadPrivateAccountFlow();
                                } else {
                                    data = null;
                                    all.banks.core.services.reloadPage();
                                }
                            } else {
                                data = null;
                                all.banks.core.services.openBankPage("https://" + all.banks.accounts.fibi.urlServices + "/wps/myportal/FibiMenu/Online/OnAccountMngment/OnBalanceTrans/PrivateAccountFlow");
                            }
                        }

                    }
                } catch (err) {

                    all.banks.core.services.errorLog(err)
                }
            })
            .fail(fibi.redoOrFail);
    };
    fibi.getUrlPostOsh = function () {
        all.banks.core.services.httpReq("https://" + all.banks.accounts.fibi.urlServices + "/wps/myportal/FibiMenu/Online/OnAccountMngment/OnBalanceTrans/PrivateAccountFlow", 'GET', null, false, false)
            .then(fibi.initializeGlobals)
            .then(fibi.restoreCompanySelection)
            .then(fibi.restoreAccountSelection)
            .then(function (res) {
                try {
                    var res = all.banks.core.services.parseHtml(res);

//				if (parseInt(all.banks.accountDetails.bank.BankNumber) == 52 || parseInt(all.banks.accountDetails.bank.BankNumber) == 126 || parseInt(all.banks.accountDetails.bank.BankNumber) == 14) {
//					all.banks.accounts.fibi.url = "https://" + all.banks.accounts.fibi.urlServices;
//				} else {
//					all.banks.accounts.fibi.url = res.find('head').find("base").attr("href");
//				}
//				all.banks.accounts.fibi.refreshPortletForm = res.find('#refreshPortletForm').attr('action');
//				all.banks.accounts.fibi.selectAcc = res.find('#account_num_select');
//				all.banks.accounts.fibi.selectCompany = res.find('#company_num_select');
//				if (all.banks.accounts.fibi.refreshPortletForm === undefined) {
//					all.banks.accounts.fibi.refreshPortletForm = res.find('#LinkForm077').attr('action');
//				}
                    all.banks.accounts.fibi.loadAcc(res);
                    res = null;
                } catch (err) {
                    all.banks.core.services.errorLog(err)
                }
            })
            .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                fibi.getUrlPostOsh();
            }));
    };
    fibi.loadAcc = function (res, matah) {
        myEmitterLogs(29);
        all.banks.generalVariables.numChecksDrawn = 0;
        all.banks.generalVariables.numChecksNotWithdrawn = 0;
        all.banks.accounts.fibi.arr = [];
        if (all.banks.accounts.fibi.selectAcc.length) {
            if (res) {
                if (res && res.find('#refreshPortletForm').length > 0 && res.find('#refreshPortletForm').attr('action')) {
                    all.banks.accounts.fibi.refreshPortletForm = res.find('#refreshPortletForm').attr('action');
                }
            }
//			if (res && res.find('#LinkForm077').length > 0 && res.find('#LinkForm077').attr('action')) {
//				all.banks.accounts.fibi.refreshPortletForm = res.find('#LinkForm077').attr('action');
//			}
            res = null;
            var optionFirst = $(all.banks.accounts.fibi.selectAcc).find('option').eq(0).val();
            var minusLength = 1,
                indAccOptionFirstNull = 0;
            if (optionFirst == "") {
                minusLength = 2;
                indAccOptionFirstNull = 1;
            }
            // all.banks.core.services.httpReq("https://" + all.banks.accounts.fibi.urlServices + "/wps/myportal/FibiMenu/Online/OnCreditCardsMenu/OnCrCardsDetPayms/AuthCrCardsChargesDetails", 'GET', null, false, false)
            //     .then(function (data, bbb, ccc) {
            //         var expires = ccc.getResponseHeader("Expires");
            //         if (expires === 0 || expires === "0") {
            //             fibi.loginMiddleOnWork(function () {
            //                 fibi.loadDatesAshrai();
            //             });
            //         } else {
            //             var data = all.banks.core.services.parseHtml(data);
            //         }
            //     })
            if (all.banks.accounts.fibi.selectAcc.val() !== undefined && (($(all.banks.accounts.fibi.selectAcc).find('option').length - minusLength) >= all.banks.accounts.fibi.ind)) {
                var acc = {
                    'PortletForm_ACTION_NAME': 'changeAccount',
                    'portal_current_account': $(all.banks.accounts.fibi.selectAcc).find('option').eq(all.banks.accounts.fibi.ind + indAccOptionFirstNull).val(),
                    'portal_company_tz': '',
                    'portal_current_bank': $(all.banks.accounts.fibi.selectAcc).find('option').eq(all.banks.accounts.fibi.ind + indAccOptionFirstNull).attr('data-bank')
                }
                fibi.portal_current_account = acc.portal_current_account;
                fibi.portal_current_bank = acc.portal_current_bank;

                //				if (all.banks.accounts.fibi.refreshPortletForm === undefined) {
//					all.banks.accounts.fibi.refreshPortletForm = res.find('#LinkForm077').attr('action');
//				}

                // $(all.banks.accounts.fibi.selectAcc).find('option').eq(all.banks.accounts.fibi.ind + indAccOptionFirstNull).attr('data-bank')
                all.banks.core.services.httpReq("https://" + all.banks.accounts.fibi.urlServices + "/wps/myportal/FibiMenu/Online/OnAccountMngment/OnBalanceTrans/PrivateAccountFlow", 'GET', null, false, false)
                    .then(function (res, state, status) {
                        var expires = status.getResponseHeader("Expires");
                        if (expires === 0 || expires === "0") {
                            fibi.loginMiddleOnWork(function (dataRes) {
                                fibi.loadAcc(all.banks.core.services.parseHtml(dataRes), matah);
                            });
                            return;
                        }
                        var resParsed = all.banks.core.services.parseHtml(res);
                        all.banks.accounts.fibi.refreshPortletForm = resParsed.find('#refreshPortletForm').attr('action');
                        if (all.banks.accounts.fibi.refreshPortletForm === undefined) {
                            all.banks.accounts.fibi.refreshPortletForm = resParsed.find('#LinkForm077').attr('action');
                        }

                        all.banks.core.services.httpReq(all.banks.accounts.fibi.url + all.banks.accounts.fibi.refreshPortletForm, 'POST', acc, true, false)
                            .then(function (data, state, status) {
                                var expires = status.getResponseHeader("Expires");
                                if (expires === 0 || expires === "0") {
                                    fibi.loginMiddleOnWork(function () {
                                        fibi.loadAcc(res, matah);
                                    });
                                    return;
                                }
                                var data = all.banks.core.services.parseHtml(data);
                                if (parseInt(all.banks.accountDetails.bank.BankNumber) == 52 || parseInt(all.banks.accountDetails.bank.BankNumber) == 14) {
                                    all.banks.accounts.fibi.url = "https://" + all.banks.accounts.fibi.urlServices;
                                } else {
                                    if (data.find('head').find("base").length) {
                                        all.banks.accounts.fibi.url = data.find('head').find("base").attr("href");
                                    } else {
                                        all.banks.accounts.fibi.url = "https://" + all.banks.accounts.fibi.urlServices;
                                    }
                                }
                                all.banks.accounts.fibi.refreshPortletForm = data.find('#refreshPortletForm').attr('action');
                                if (all.banks.accounts.fibi.refreshPortletForm === undefined) {
                                    all.banks.accounts.fibi.refreshPortletForm = data.find('#LinkForm077').attr('action');
                                }
                                if (matah === undefined) {
                                    loadOshPage(data);
                                    data = null;
                                } else {
                                    fibi.loadMatah(false, true);
                                    data = null;
                                }
                            })
                            .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                                fibi.loadAcc(res, matah);
                            }));
                    });

            } else {
                all.banks.accounts.fibi.sendOshCtrl();
            }
        } else {
            if (all.banks.accounts.fibi.ind === 0) {
                loadOshPage(res, true);
                res = null;
            } else {
                res = null;
                all.banks.accounts.fibi.sendOshCtrl();
            }
        }


        function loadOshPage(data, onlyOne) {
            try {
                if (data.find('#mymsgdiv').length && data.find('#mymsgdiv').text().includes('אין הרשאה')) {
                    monitorVpn.killVpn(function () {
                        setTimeout(function () {
                            myEmitterLogs(25, 'אין הרשאה לחשבון לפעולה המבוקשת');
                        }, 500);
                    });
                    return;
                }
                if (!onlyOne) {
                    if (parseInt(all.banks.accountDetails.bank.BankNumber) == 52 || parseInt(all.banks.accountDetails.bank.BankNumber) == 14) {
                        all.banks.accounts.fibi.url = "https://" + all.banks.accounts.fibi.urlServices;
                    } else {
                        if (data.find('head').find("base").length) {
                            all.banks.accounts.fibi.url = data.find('head').find("base").attr("href");
                        } else {
                            all.banks.accounts.fibi.url = "https://" + all.banks.accounts.fibi.urlServices;
                        }
                    }
                }

                var balance = data.find('.acc_balance .current_balance .main_balance').text().replace(/\s/g, "").replace(/,/g, '');
                if (balance == '') {
                    balance = null;
                }
                var accountNumber = data.find('.status_line .acc_num').text().replace(/\s/g, "").replace(/,/g, '');
                var branchNumber = data.find('.status_line .branch_num').text().replace(/\s/g, "").replace(/,/g, '');
                var bankNumber = (Number(data.find('#account_num_select').find('option:selected').attr('data-bank')) ? Number(data.find('#account_num_select').find('option:selected').attr('data-bank')) : fibi.BankNumber);
                if (bankNumber === 26) {
                    bankNumber = 126;
                }
                var url = "https://" + all.banks.accounts.fibi.urlServices + "/wps/myportal/FibiMenu/Online/OnAccountMngment/overDraftLimit/overdraftlimitupdate";
                all.banks.core.services.httpReq(url, 'GET', null, false, false)
                    .then(function (res, bbb, ccc) {
                        var expires = ccc.getResponseHeader("Expires");
                        if (expires === 0 || expires === "0") {
                            fibi.loginMiddleOnWork(function () {
                                loadOshPage(data, onlyOne);
                            });
                        } else {
                            var res = all.banks.core.services.parseHtml(res);
                            var accCredit = null;
                            if (!res.find('#mymsgdiv').length) {
                                accCredit = res.find('#MISGAROT-TV tr.summary td').eq(1).text().replace(/\D/g, "");
                            } else {
                                accCredit = 0;
                            }
                            if (accCredit === '') {
                                var urlOld = "https://" + all.banks.accounts.fibi.urlServices + "/wps/myportal/FibiMenu/Online/OnAccountMngment/OnBalanceTrans/OnWithdrowDetailsPrivate";
                                all.banks.core.services.httpReq(urlOld, 'GET', null, false, false)
                                    .then(function (res, bbb, ccc) {
                                        var expires = ccc.getResponseHeader("Expires");
                                        if (expires === 0 || expires === "0") {
                                            fibi.loginMiddleOnWork(function () {
                                                loadOshPage(data, onlyOne);
                                            });
                                        } else {
                                            var res = all.banks.core.services.parseHtml(res);
                                            var accCredit = null;
                                            if (!res.find('#mymsgdiv').length) {
                                                accCredit = res.find('#MISGAROT-TV tr.summary td').eq(1).text().replace(/\D/g, "");
                                            } else {
                                                accCredit = 0;
                                            }

                                            var acc = {
                                                'BankNumber': bankNumber,
                                                'AccountNumber': accountNumber,
                                                'BranchNumber': branchNumber,
                                                'Balance': balance == null ? null : parseFloat(balance),
                                                'AccountCredit': accCredit
                                            }
                                            myEmitterLogs(10, acc.AccountNumber);
                                            all.banks.generalVariables.allDataArr.BankData[0].Account.push(acc);
                                            res = null;
                                            data = null;
                                            all.banks.accounts.fibi.loadOsh();
                                        }
                                    })
                                    .fail(function () {
                                        var acc = {
                                            'BankNumber': bankNumber,
                                            'AccountNumber': accountNumber,
                                            'BranchNumber': branchNumber,
                                            'Balance': balance == null ? null : parseFloat(balance),
                                            'AccountCredit': null
                                        }
                                        myEmitterLogs(10, acc.AccountNumber);
                                        all.banks.generalVariables.allDataArr.BankData[0].Account.push(acc);
                                        data = null;
                                        all.banks.accounts.fibi.loadOsh();
                                    });
                            } else {
                                var acc = {
                                    'BankNumber': bankNumber,
                                    'AccountNumber': accountNumber,
                                    'BranchNumber': branchNumber,
                                    'Balance': balance == null ? null : parseFloat(balance),
                                    'AccountCredit': accCredit
                                }
                                myEmitterLogs(10, acc.AccountNumber);
                                all.banks.generalVariables.allDataArr.BankData[0].Account.push(acc);
                                res = null;
                                data = null;
                                all.banks.accounts.fibi.loadOsh();
                            }
                        }
                    })
                    .fail(function () {
                        var acc = {
                            'BankNumber': bankNumber,
                            'AccountNumber': accountNumber,
                            'BranchNumber': branchNumber,
                            'Balance': balance == null ? null : parseFloat(balance),
                            'AccountCredit': null
                        }
                        myEmitterLogs(10, acc.AccountNumber);
                        all.banks.generalVariables.allDataArr.BankData[0].Account.push(acc);
                        data = null;
                        all.banks.accounts.fibi.loadOsh();
                    });
            } catch (err) {
                all.banks.core.services.errorLog(err)
            }
        }
    };
    fibi.reverseComment = function (comment) {
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
    };
    fibi.loadOsh = function (nextNav) {
        try {
            var subAccount = $("#subAccount").val();
            if (all.banks.accounts.fibi.paramLoad == 0) {
                var paramDef = {
                    'RESFOR': 'XRL',
                    'SUGBAKA': '077',
                    'I-FROM-YY': all.banks.accountDetails.dateFrom.getFullYear().toString(),
                    'I-FROM-MM': ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2),
                    'I-FROM-DD': ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2),
                    'I-TILL-YY': all.banks.accountDetails.dateTo.getFullYear().toString(),
                    'I-TILL-MM': ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2),
                    'I-TILL-DD': ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2),
                    'I-TR-LMT-B': '',
                    'I-TR-LMT-E': '',
                    'I-DIRECT': '',
                    'I-SCH1': fibi.isSetSubAcc ? subAccount : '',
                    'I-HOLDMONE': '',
                    'I-HOLDMONE-B': '',
                    'I-HOLDMONE-E': '',
                    'I-LINE-CTR': '',
                    'I-S-TZG': '2',
                    'I-EXCEL-MURCHAV': '',
                    'sTv': '',
                    'FastMn': '4'
                }
            } else {
                var nextNavAlla = all.banks.accounts.fibi.paramLoad.split(")")[0];
                var nextNavAll = nextNavAlla.split("(")[1];
                var a = nextNavAll.split("'")[1],
                    b = nextNavAll.split("'")[5],
                    c = nextNavAll.split("'")[7],
                    d = nextNavAll.split("'")[9],
                    e = nextNavAll.split("'")[11],
                    f = nextNavAll.split("'")[13],
                    g = nextNavAll.split("'")[15],
                    h = nextNavAll.split("'")[17],
                    i = nextNavAll.split("'")[19];
                nextNavAll = null;
                nextNavAlla = null;
                var paramDef = {
                    'RESFOR': 'XRL',
                    'SUGBAKA': a,
                    'I-FROM-YY': all.banks.accountDetails.dateFrom.getFullYear().toString(),
                    'I-FROM-MM': ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2),
                    'I-FROM-DD': ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2),
                    'I-TILL-YY': all.banks.accountDetails.dateTo.getFullYear().toString(),
                    'I-TILL-MM': ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2),
                    'I-TILL-DD': ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2),
                    'I-TR-LMT-B': b,
                    'I-TR-LMT-E': c,
                    'I-DIRECT': d,
                    'I-SCH1': fibi.isSetSubAcc ? subAccount : e,
                    'I-HOLDMONE': f,
                    'I-HOLDMONE-B': g,
                    'I-HOLDMONE-E': h,
                    'I-LINE-CTR': i,
                    'I-S-TZG': '000000002',
                    'I-EXCEL-MURCHAV': '',
                    'sTv': '',
                    'FastMn': '4'
                }
            }

            if (all.banks.accounts.fibi.refreshPortletForm === undefined) {
                throw new Error("Something went wrong... refreshPortletForm not found");
            }

            all.banks.core.services.httpReq(all.banks.accounts.fibi.url + all.banks.accounts.fibi.refreshPortletForm, 'POST', paramDef, true, false)
                .then(function (data, bbb, ccc) {
                    var expires = ccc.getResponseHeader("Expires");
                    if (expires === 0 || expires === "0") {
                        fibi.loginMiddleOnWork(function () {
                            fibi.loadOsh(all.banks.accounts.fibi.paramLoad);
                        });
                    } else {
                        try {
                            var data = all.banks.core.services.parseHtml(data);
                            if (all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.generalVariables.allDataArr.BankData[0].Account.length - 1].AccountCredit === 0 && data.find('.withdrawal_balance .main_balance').length && data.find('.current_balance .main_balance').length) {
                                const current_balance = Number(data.find('.current_balance .main_balance').text().replace(/\s/g, "").replace(/,/g, ''));
                                all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.generalVariables.allDataArr.BankData[0].Account.length - 1].AccountCredit = Number(data.find('.withdrawal_balance .main_balance').text().replace(/\s/g, "").replace(/,/g, '')) - current_balance;
                            }

                            fibi.keepAlive(function () {
                                all.banks.accounts.fibi.refreshPortletForm = data.find('#refreshPortletForm').attr('action');
                                if (all.banks.accounts.fibi.refreshPortletForm === undefined) {
                                    all.banks.accounts.fibi.refreshPortletForm = data.find('#LinkForm077').attr('action');
                                }
                                if (parseInt(all.banks.accountDetails.bank.BankNumber) == 52 || parseInt(all.banks.accountDetails.bank.BankNumber) == 14) {
                                    all.banks.accounts.fibi.url = "https://" + all.banks.accounts.fibi.urlServices;
                                } else {
                                    if (data.find('head').find("base").length) {
                                        all.banks.accounts.fibi.url = data.find('head').find("base").attr("href");
                                    } else {
                                        all.banks.accounts.fibi.url = "https://" + all.banks.accounts.fibi.urlServices;
                                    }
                                }
                                var page = data.find('#Npage')[0];
                                if (page !== undefined) {
                                    all.banks.accounts.fibi.paramLoad = nextNav;
                                    var arrLoop = [];
                                    if (data.find('#dataTable077 tbody tr').length) {
                                        data.find('#dataTable077 tbody tr').each(function (i, v) {
                                            var total, transactionType;
                                            var credit = $(v).find('.credit  span').text().replace(/\s/g, "");
                                            if (credit == '') {
                                                total = $(v).find('.debit  span').text().replace(/\s/g, "").replace(/,/g, '');
                                                transactionType = '0';
                                            } else {
                                                total = $(v).find('.credit  span').text().replace(/\s/g, "").replace(/,/g, '');
                                                transactionType = '1';
                                            }

                                            var date = $(v).find('.date.first > span').text();
                                            if (date !== '') {
                                                var transDesvInfo = "";
                                                var transDesc = $(v).find('.reference').text().replace(/\\n|\r?\n|\r/gm, "");
                                                if ($(v).find('.reference  span').length) {
//												var transDesc = $(v).find('.reference  span').text();
                                                    if ($(v).find('.reference  a').length) {
//													if (transDesc.replace(/\s/g, "") == "") {
//														transDesc += $(v).find('.reference  a').text();
//													}
                                                        if ($(v).find('.reference  a').attr("href").indexOf("getPapersName") !== -1) {
                                                            transDesvInfo = $(v).find('.reference  a').attr("href").split(",")[1].replace(/\D/g, "");
                                                        }
                                                    }
                                                }
//											else {
//												var transDesc = $(v).find('.reference  a').text();
//											}

                                                var lenSpan = $(v).find('.reference  span').length;
                                                var imgs = null;
                                                if (lenSpan == 0 && !$(v).find('.reference a').hasClass('PW1') && ($(v).find('.reference a').attr('href').indexOf("void(0)") == -1) && all.banks.accountDetails.checks == true) {
                                                    transDesc = $(v).find('.reference  a').text()
                                                    var typeAttrChecks = $(v).find('.reference a').attr('href');
                                                    var Balance = $(v).find('.balance span').text().replace(/\s/g, "").replace(/,/g, '');
                                                    if (Balance == '') {
                                                        Balance = null;
                                                    }
                                                    var objData = {
                                                        "Asmachta": $(v).find('.details').text().replace(/\s/g, "").replace(/,/g, ''),
                                                        "TransDesc": transDesc,
                                                        "ValueDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal(date)),
                                                        "TransactionType": transactionType,
                                                        "TransTotal": total,
                                                        'Balance': Balance == null ? null : parseFloat(Balance),
                                                        "IsDaily": "0",
                                                        "imgs": typeAttrChecks
                                                    };
                                                    if (transDesvInfo !== "") {
                                                        objData.transDesvInfo = transDesvInfo;
                                                    }
                                                    arrLoop.push(objData);
                                                } else {
                                                    var depositeTransferData = null;
                                                    if ($(v).find('.reference a').hasClass('PW1')) {
                                                        var sugbakasha = $(v).find('td.reference a.PW1').attr('sugbakasha');
                                                        var shlavibud = $(v).find('td.reference a.PW1').attr('shlavibud');
                                                        var actdate = $(v).find('td.reference a.PW1').attr('actdate');
                                                        var actschum = $(v).find('td.reference a.PW1').attr('actschum');
                                                        if (actschum == undefined) {
                                                            depositeTransferData = "https://" + all.banks.accounts.fibi.urlServices + "/MatafServiceServlets/MatafPortalServiceServlet?ajaxAction=ajax&xslKey=ajax&fileType=html&SUGBAKA=" + sugbakasha + "&IN-SHLVIBUD=" + shlavibud + "&IN-TR-FROM=" + actdate + "&IN-TR-TILL=" + actdate + "&B_SUGBAKA=077";
                                                        } else {
                                                            depositeTransferData = "https://" + all.banks.accounts.fibi.urlServices + "/MatafServiceServlets/MatafPortalServiceServlet?ajaxAction=ajax&xslKey=ajax&fileType=html&SUGBAKA=" + sugbakasha + "&IN-SHLVIBUD=" + shlavibud + "&IN-SCHUM-FROM=" + actschum + "&IN-SCHUM-TILL=" + actschum + "&IN-TR-FROM=" + actdate + "&IN-TR-TILL=" + actdate + "&B_SUGBAKA=077";
                                                        }
                                                    }
                                                    var Balance = $(v).find('.balance span').text().replace(/\s/g, "").replace(/,/g, '');
                                                    if (Balance == '') {
                                                        Balance = null;
                                                    }
                                                    var objData = {
                                                        "Asmachta": $(v).find('.details').text().replace(/\s/g, "").replace(/,/g, ''),
                                                        "TransDesc": transDesc,
                                                        "ValueDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal(date)),
                                                        "TransactionType": transactionType,
                                                        "TransTotal": total,
                                                        'Balance': Balance == null ? null : parseFloat(Balance),
                                                        "IsDaily": "0",
                                                        "imgs": imgs,
                                                        "DepositeTransferData": depositeTransferData
                                                    };
                                                    if (transDesvInfo !== "") {
                                                        objData.transDesvInfo = transDesvInfo;
                                                    }
                                                    arrLoop.push(objData)
                                                }
                                            }

                                            if (data.find('#dataTable077 tbody tr').length == i + 1) {
                                                var lenArrSlice = arrLoop.length;

                                                function getAllChecks() {
                                                    clearTimeout(fibi.timeOutFunc);
                                                    try {
                                                        var ret = false;
                                                        $(arrLoop).each(function (i, v) {
                                                            if (v.imgs !== null && Object.prototype.toString.call(v.imgs) == '[object String]' && ((v.imgs.indexOf('submitFormCheque256_077') !== -1) || (v.imgs.indexOf('submitFormCheque153_077') !== -1))) {
                                                                var typeAttrChecks = v.imgs.split("(")[0].split(':')[1];
                                                                var imgs;
                                                                if (typeAttrChecks == 'submitFormCheque256_077') {
                                                                    imgs = all.banks.accounts.fibi.getBase64FromImageUrlCheckList(v.imgs);
                                                                }
                                                                if (typeAttrChecks == 'submitFormCheque153_077') {
                                                                    imgs = all.banks.accounts.fibi.getBase64FromImageUrl(v.imgs);
                                                                }
                                                                console.log("typeCheck", typeAttrChecks)
                                                                $.when(imgs).then(function (status) {
                                                                    if (status === "expires") {
                                                                        getAllChecks();
                                                                    } else {
                                                                        v.imgs = status;
                                                                        fibi.timeOutFunc = setTimeout(function () {
                                                                            clearTimeout(fibi.timeOutFunc);
                                                                            getAllChecks();
                                                                        }, 0)
                                                                    }
                                                                })
                                                                ret = true;
                                                                return false;
                                                            } else if (v.DepositeTransferData !== undefined && v.DepositeTransferData !== null && Object.prototype.toString.call(v.DepositeTransferData) !== '[object Array]' && v.DepositeTransferData.indexOf("&IN-SCHUM-FROM=") == -1) {
                                                                $.when(fibi.loadHaavara(v.DepositeTransferData))
                                                                    .then(function (status) {
                                                                        if (status === "expires") {
                                                                            getAllChecks();
                                                                        } else {
                                                                            v.DepositeTransferData = status;
                                                                            fibi.timeOutFunc = setTimeout(function () {
                                                                                clearTimeout(fibi.timeOutFunc);
                                                                                getAllChecks();
                                                                            }, 0)
                                                                        }
                                                                    });
                                                                ret = true;
                                                                return false;
                                                            } else if (v.transDesvInfo !== undefined) {
                                                                delete v.transDesvInfo;
                                                                fibi.timeOutFunc = setTimeout(function () {
                                                                    clearTimeout(fibi.timeOutFunc);
                                                                    getAllChecks();
                                                                }, 0)

                                                                // $.when(fibi.loadTextDescription(v.transDesvInfo))
                                                                //     .then(function (text) {
                                                                //         if (text === "expires") {
                                                                //             getAllChecks();
                                                                //         } else {
                                                                //             v.TransDesc = v.TransDesc + " " + text;
                                                                //             delete v.transDesvInfo;
                                                                //             fibi.timeOutFunc = setTimeout(function () {
                                                                //                 clearTimeout(fibi.timeOutFunc);
                                                                //                 getAllChecks();
                                                                //             }, 500)
                                                                //         }
                                                                //     })
                                                                ret = true;
                                                                return false;
                                                            } else {
                                                                if (lenArrSlice == (i + 1)) {
                                                                    loadHaavarotType22();
                                                                }
                                                            }
                                                        })
                                                    } catch (err) {
                                                        all.banks.core.services.errorLog(err)
                                                    }
                                                }

                                                function loadHaavarotType22() {
                                                    clearTimeout(fibi.timeOutFunc);
                                                    var ret = false;
                                                    $(arrLoop).each(function (i, v) {
                                                        if (v.DepositeTransferData !== undefined && v.DepositeTransferData !== null && Object.prototype.toString.call(v.DepositeTransferData) !== '[object Array]' && v.DepositeTransferData.indexOf("&IN-SCHUM-FROM=") !== -1) {
                                                            $.when(fibi.loadHaavara(v.DepositeTransferData))
                                                                .then(function (status) {
                                                                    if (status === "expires") {
                                                                        loadHaavarotType22();
                                                                    } else {
                                                                        v.DepositeTransferData = status;
                                                                        fibi.timeOutFunc = setTimeout(function () {
                                                                            clearTimeout(fibi.timeOutFunc);
                                                                            loadHaavarotType22();
                                                                        }, 0);
                                                                    }
                                                                });
                                                            ret = true;
                                                            return false;
                                                        } else {
                                                            if (lenArrSlice == (i + 1)) {
                                                                Array.prototype.push.apply(all.banks.accounts.fibi.arr, arrLoop);
                                                                arrLoop = [];
                                                                var nextNav = data.find('#Npage').attr('href');
                                                                myEmitterLogs(31);
                                                                all.banks.accounts.fibi.paramLoad = nextNav;
                                                                all.banks.accounts.fibi.loadOsh(all.banks.accounts.fibi.paramLoad);
                                                                nextNav = null;
                                                                data = null;
                                                            }
                                                        }
                                                    })
                                                }

                                                if (arrLoop.length > 0) {
                                                    getAllChecks()
                                                } else {
                                                    var nextNav = data.find('#Npage').attr('href');
                                                    myEmitterLogs(31);
                                                    all.banks.accounts.fibi.paramLoad = nextNav;
                                                    all.banks.accounts.fibi.loadOsh(all.banks.accounts.fibi.paramLoad);
                                                    nextNav = null;
                                                    data = null;
                                                }
                                            }
                                        })
                                    } else {
                                        var nextNav = data.find('#Npage').attr('href');
                                        myEmitterLogs(31);
                                        data = null;
                                        all.banks.accounts.fibi.paramLoad = nextNav;
                                        all.banks.accounts.fibi.loadOsh(all.banks.accounts.fibi.paramLoad);
                                        nextNav = null;
                                    }
                                } else {
                                    all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + data.find('form[name="LogoutUser"]').attr('action');
                                    all.banks.accounts.fibi.paramLoad = 0;
                                    var arrLoopIns = [];
                                    if (data.find('#dataTable077 tbody tr').length) {
                                        data.find('#dataTable077 tbody tr').each(function (i, v) {
                                            var total, transactionType;
                                            var credit = $(v).find('.credit  span').text().replace(/\s/g, "");
                                            if (credit == '') {
                                                total = $(v).find('.debit  span').text().replace(/\s/g, "").replace(/,/g, '');
                                                transactionType = '0';
                                            } else {
                                                total = $(v).find('.credit  span').text().replace(/\s/g, "").replace(/,/g, '');
                                                transactionType = '1';
                                            }

                                            var date = $(v).find('.date.first > span').text();
                                            if (date !== '') {
                                                var transDesvInfo = "";
                                                var transDesc = $(v).find('.reference').text().replace(/\\n|\r?\n|\r/gm, "");
                                                if ($(v).find('.reference  span').length) {
//												var transDesc = $(v).find('.reference  span').text();
                                                    if ($(v).find('.reference  a').length) {
//													if (transDesc.replace(/\s/g, "") == "") {
//														transDesc += $(v).find('.reference  a').text();
//													}
                                                        if ($(v).find('.reference  a').attr("href").indexOf("getPapersName") !== -1) {
                                                            transDesvInfo = $(v).find('.reference  a').attr("href").split(",")[1].replace(/\D/g, "");
                                                        }
                                                    }
                                                }
//											else {
//												var transDesc = $(v).find('.reference  a').text();
//											}

                                                var lenSpan = $(v).find('.reference  span').length;
                                                var imgs = null;
                                                if (lenSpan == 0 && !$(v).find('.reference a').hasClass('PW1') && ($(v).find('.reference a').attr('href').indexOf("void(0)") == -1) && all.banks.accountDetails.checks == true) {
                                                    transDesc = $(v).find('.reference  a').text()
                                                    var typeAttrChecks = $(v).find('.reference a').attr('href');
                                                    var Balance = $(v).find('.balance span').text().replace(/\s/g, "").replace(/,/g, '');
                                                    if (Balance == '') {
                                                        Balance = null;
                                                    }
                                                    var objData = {
                                                        "Asmachta": $(v).find('.details').text().replace(/\s/g, "").replace(/,/g, ''),
                                                        "TransDesc": transDesc,
                                                        "ValueDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal(date)),
                                                        "TransactionType": transactionType,
                                                        "TransTotal": total,
                                                        'Balance': Balance == null ? null : parseFloat(Balance),
                                                        "IsDaily": "0",
                                                        "imgs": typeAttrChecks
                                                    };
                                                    if (transDesvInfo !== "") {
                                                        objData.transDesvInfo = transDesvInfo;
                                                    }
                                                    arrLoopIns.push(objData);
                                                } else {
                                                    var depositeTransferData = null;
                                                    if ($(v).find('.reference a').hasClass('PW1')) {
                                                        var sugbakasha = $(v).find('td.reference a.PW1').attr('sugbakasha');
                                                        var shlavibud = $(v).find('td.reference a.PW1').attr('shlavibud');
                                                        var actdate = $(v).find('td.reference a.PW1').attr('actdate');
                                                        var actschum = $(v).find('td.reference a.PW1').attr('actschum');
                                                        if (actschum == undefined) {
                                                            depositeTransferData = "https://" + all.banks.accounts.fibi.urlServices + "/MatafServiceServlets/MatafPortalServiceServlet?ajaxAction=ajax&xslKey=ajax&fileType=html&SUGBAKA=" + sugbakasha + "&IN-SHLVIBUD=" + shlavibud + "&IN-TR-FROM=" + actdate + "&IN-TR-TILL=" + actdate + "&B_SUGBAKA=077";
                                                        } else {
                                                            depositeTransferData = "https://" + all.banks.accounts.fibi.urlServices + "/MatafServiceServlets/MatafPortalServiceServlet?ajaxAction=ajax&xslKey=ajax&fileType=html&SUGBAKA=" + sugbakasha + "&IN-SHLVIBUD=" + shlavibud + "&IN-SCHUM-FROM=" + actschum + "&IN-SCHUM-TILL=" + actschum + "&IN-TR-FROM=" + actdate + "&IN-TR-TILL=" + actdate + "&B_SUGBAKA=077";
                                                        }
                                                    }
                                                    var Balance = $(v).find('.balance span').text().replace(/\s/g, "").replace(/,/g, '');
                                                    if (Balance == '') {
                                                        Balance = null;
                                                    }
                                                    var objData = {
                                                        "Asmachta": $(v).find('.details').text().replace(/\s/g, "").replace(/,/g, ''),
                                                        "TransDesc": transDesc,
                                                        "ValueDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal(date)),
                                                        "TransactionType": transactionType,
                                                        "TransTotal": total,
                                                        'Balance': Balance == null ? null : parseFloat(Balance),
                                                        "IsDaily": "0",
                                                        "imgs": imgs,
                                                        "DepositeTransferData": depositeTransferData
                                                    }
                                                    if (transDesvInfo !== "") {
                                                        objData.transDesvInfo = transDesvInfo;
                                                    }
                                                    arrLoopIns.push(objData)
                                                }
                                            }

                                            if (data.find('#dataTable077 tbody tr').length == i + 1) {
                                                if (all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].Balance == null) {
                                                    all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].Balance = arrLoopIns[arrLoopIns.length - 1].Balance;
                                                }

                                                function todayTransactions() {
                                                    all.banks.core.services.httpReq("https://" + all.banks.accounts.fibi.urlServices + "/wps/myportal/FibiMenu/Online/OnAccountMngment/OnBalanceTrans/todayTransactions", 'GET', null, false, false)
                                                        .then(function (res, bbb, ccc) {
                                                            var expires = ccc.getResponseHeader("Expires");
                                                            if (expires === 0 || expires === "0") {
                                                                fibi.loginMiddleOnWork(function () {
                                                                    //
                                                                    todayTransactions();
                                                                });
                                                            } else {
                                                                try {
                                                                    var res = all.banks.core.services.parseHtml(res);

                                                                    function getAllChecksIns() {
                                                                        clearTimeout(fibi.timeOutFunc);
                                                                        var ret = false;
                                                                        $(arrLoopIns).each(function (i, v) {
                                                                            if (v.imgs !== null && Object.prototype.toString.call(v.imgs) == '[object String]' && ((v.imgs.indexOf('submitFormCheque256_077') !== -1) || (v.imgs.indexOf('submitFormCheque153_077') !== -1))) {
                                                                                var typeAttrChecks = v.imgs.split("(")[0].split(':')[1];
                                                                                var imgs;
                                                                                if (typeAttrChecks == 'submitFormCheque256_077') {
                                                                                    imgs = all.banks.accounts.fibi.getBase64FromImageUrlCheckList(v.imgs);
                                                                                }
                                                                                if (typeAttrChecks == 'submitFormCheque153_077') {
                                                                                    imgs = all.banks.accounts.fibi.getBase64FromImageUrl(v.imgs);
                                                                                }
                                                                                console.log("typeCheck", typeAttrChecks)
                                                                                $.when(imgs).then(function (status) {
                                                                                    if (status === "expires") {
                                                                                        getAllChecksIns();
                                                                                    } else {
                                                                                        v.imgs = status;
                                                                                        fibi.timeOutFunc = setTimeout(function () {
                                                                                            clearTimeout(fibi.timeOutFunc);
                                                                                            getAllChecksIns();
                                                                                        }, 0)
                                                                                    }
                                                                                });
                                                                                ret = true;
                                                                                return false;
                                                                            } else if (v.DepositeTransferData !== undefined && v.DepositeTransferData !== null && Object.prototype.toString.call(v.DepositeTransferData) !== '[object Array]' && v.DepositeTransferData.indexOf("&IN-SCHUM-FROM=") == -1) {
                                                                                $.when(fibi.loadHaavara(v.DepositeTransferData))
                                                                                    .then(function (status) {
                                                                                        if (status === "expires") {
                                                                                            getAllChecksIns();
                                                                                        } else {
                                                                                            v.DepositeTransferData = status;
                                                                                            fibi.timeOutFunc = setTimeout(function () {
                                                                                                clearTimeout(fibi.timeOutFunc);
                                                                                                getAllChecksIns();
                                                                                            }, 0);
                                                                                        }
                                                                                    });
                                                                                ret = true;
                                                                                return false;
                                                                            } else if (v.transDesvInfo !== undefined) {
                                                                                delete v.transDesvInfo;
                                                                                fibi.timeOutFunc = setTimeout(function () {
                                                                                    clearTimeout(fibi.timeOutFunc);
                                                                                    getAllChecksIns();
                                                                                }, 0);

                                                                                // $.when(fibi.loadTextDescription(v.transDesvInfo))
                                                                                //     .then(function (text) {
                                                                                //         if (text === "expires") {
                                                                                //             getAllChecksIns();
                                                                                //         } else {
                                                                                //             v.TransDesc = v.TransDesc + " " + text;
                                                                                //             delete v.transDesvInfo;
                                                                                //             fibi.timeOutFunc = setTimeout(function () {
                                                                                //                 clearTimeout(fibi.timeOutFunc);
                                                                                //                 getAllChecksIns();
                                                                                //             }, 500);
                                                                                //         }
                                                                                //     });
                                                                                ret = true;
                                                                                return false;
                                                                            } else {
                                                                                if (arrLoopIns.length == (i + 1)) {
                                                                                    loadHaavarotType2();
                                                                                }
                                                                            }
                                                                        })
                                                                    };

                                                                    function loadHaavarotType2() {
                                                                        clearTimeout(fibi.timeOutFunc);
                                                                        var ret = false;
                                                                        $(arrLoopIns).each(function (i, v) {
                                                                            if (v.DepositeTransferData !== undefined && v.DepositeTransferData !== null && Object.prototype.toString.call(v.DepositeTransferData) !== '[object Array]' && v.DepositeTransferData.indexOf("&IN-SCHUM-FROM=") !== -1) {
                                                                                $.when(fibi.loadHaavara(v.DepositeTransferData))
                                                                                    .then(function (status) {
                                                                                        if (status === "expires") {
                                                                                            loadHaavarotType2();
                                                                                        } else {
                                                                                            v.DepositeTransferData = status;
                                                                                            fibi.timeOutFunc = setTimeout(function () {
                                                                                                clearTimeout(fibi.timeOutFunc);
                                                                                                loadHaavarotType2();
                                                                                            }, 0);
                                                                                        }
                                                                                    });
                                                                                ret = true;
                                                                                return false;
                                                                            } else {
                                                                                if (arrLoopIns.length == (i + 1)) {
                                                                                    Array.prototype.push.apply(all.banks.accounts.fibi.arr, arrLoopIns);
                                                                                    arrLoopIns = [];
                                                                                    all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].DataRow = all.banks.accounts.fibi.arr;
                                                                                    fibi.arr = [];
                                                                                    myEmitterLogs(12, all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].DataRow.length);
                                                                                    all.banks.accounts.fibi.ind = all.banks.accounts.fibi.ind + 1;
                                                                                    all.banks.accounts.fibi.loadAcc();
                                                                                    data = null;
                                                                                }
                                                                            }
                                                                        })
                                                                    }

                                                                    if (res.find('#dataTable023 tbody tr').length) {
                                                                        res.find('#dataTable023 tbody tr').each(function (i, v) {
                                                                            var total, transactionType;
                                                                            var credit = $(v).find('.credit  span').text().replace(/\s/g, "");
                                                                            if (credit == '') {
                                                                                total = $(v).find('.debit  span').text().replace(/\s/g, "").replace(/,/g, '');
                                                                                transactionType = '0';
                                                                            } else {
                                                                                total = $(v).find('.credit  span').text().replace(/\s/g, "").replace(/,/g, '');
                                                                                transactionType = '1';
                                                                            }

                                                                            var date = $(v).find('.date.first > span').text();
                                                                            if (date !== '') {
                                                                                var transDesvInfo = "";
                                                                                var transDesc = $(v).find('.details').text().replace(/\s\s+/g, "");
                                                                                var Balance = $(v).find('.balance span').text().replace(/\s/g, "").replace(/,/g, '');
                                                                                if (Balance.replace(/\D/g, "") == '') {
                                                                                    Balance = null;
                                                                                }
                                                                                var objData = {
                                                                                    "Asmachta": null,
                                                                                    "TransDesc": transDesc,
                                                                                    "ValueDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal(date)),
                                                                                    "TransactionType": transactionType,
                                                                                    "TransTotal": total !== "" ? total : 0,
                                                                                    'Balance': Balance == null ? null : parseFloat(Balance),
                                                                                    "IsDaily": "1",
                                                                                    "imgs": null
                                                                                };
                                                                                arrLoopIns.push(objData)
                                                                            }
                                                                            if (res.find('#dataTable023 tbody tr').length == i + 1) {
                                                                                if (arrLoopIns.length > 0) {
                                                                                    res = null;
                                                                                    getAllChecksIns()
                                                                                } else {
                                                                                    all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].DataRow = all.banks.accounts.fibi.arr;
                                                                                    fibi.arr = [];
                                                                                    myEmitterLogs(12, all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].DataRow.length);
                                                                                    all.banks.accounts.fibi.ind = all.banks.accounts.fibi.ind + 1;
                                                                                    res = null;
                                                                                    data = null;
                                                                                    all.banks.accounts.fibi.loadAcc();
                                                                                }
                                                                            }
                                                                        })
                                                                    } else {
                                                                        res = null;
                                                                        getAllChecksIns()
                                                                    }
                                                                } catch (err) {
                                                                    all.banks.core.services.errorLog(err)

                                                                }
                                                            }
                                                        })
                                                        .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                                                            todayTransactions();
                                                        }));
                                                }

                                                todayTransactions();
                                            }
                                        })
                                    } else {
                                        all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].DataRow = all.banks.accounts.fibi.arr;
                                        fibi.arr = [];
                                        myEmitterLogs(12, all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.fibi.ind].DataRow.length);
                                        all.banks.accounts.fibi.ind = all.banks.accounts.fibi.ind + 1;
                                        all.banks.accounts.fibi.loadAcc();
                                        data = null;
                                    }
                                }
                            })
                        } catch (err) {
                            all.banks.core.services.errorLog(err)
                        }
                    }
                })
                .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                    all.banks.accounts.fibi.paramLoad = nextNav;
                    all.banks.accounts.fibi.loadOsh(all.banks.accounts.fibi.paramLoad);
                }));
        } catch (err) {
            all.banks.core.services.errorLog(err)
        }
    };
    fibi.loadHaavara = function (url) {
        var dfd = jQuery.Deferred();

        function loadHaavaraInside(url) {
            all.banks.core.services.httpReq(url, 'GET', null, false, false)
                .then(function (res, bbb, ccc) {
                    var expires = ccc.getResponseHeader("Expires");
                    if (expires === 0 || expires === "0") {
                        fibi.loginMiddleOnWork(function () {
                            //
                            // dfd.resolve("expires");
                            loadHaavaraInside(url)
                            // fibi.loadHaavara(url)
                        });
                    } else {
                        try {
                            var res = all.banks.core.services.parseHtml(res);
                            if (res.find('#mymsgdiv').length) {
                                res = null;
                                dfd.resolve(null)
                            } else {
                                var arr = [];
                                if (res.find('#dataTable523_ajax').length) {
                                    res.find('#dataTable523_ajax tr').not("thead tr").each(function (i, v) {
                                        var vals = $(v);
                                        arr.push({
                                            "DepositeTransferDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal(vals.find('td').eq(0).text().replace(/\s\s+/g, ""))),
                                            "BankTransferNumber": vals.find('td').eq(3).text(),
                                            "BranchTransferNumber": vals.find('td').eq(4).text(),
                                            "AccountTransferNumber": vals.find('td').eq(5).text().indexOf('-') !== -1 ? vals.find('td').eq(5).text().split('-')[1] : vals.find('td').eq(5).text(),
                                            "NamePayerTransfer": vals.find('td').eq(6).text().replace(/\s\s+/g, ""),
                                            "DetailsTransfer": vals.find('td').eq(7).text().replace(/\s\s+/g, ""),
                                            "TransferTotal": vals.find('td').eq(2).text().replace(/\s/g, "").replace(/,/g, '')
                                        })
                                        if (i + 1 == res.find('#dataTable523_ajax tbody tr').length) {
                                            res = null;
                                            dfd.resolve(arr);
                                        }
                                    })
                                } else if (res.find('#dataTable526').length) {
                                    res.find('#dataTable526  tr').not("thead tr").each(function (i, v) {
                                        var vals = $(v);
                                        arr.push({
                                            "DepositeTransferDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal(vals.find('td').eq(1).text().replace(/\s\s+/g, ""))),
                                            "BankTransferNumber": vals.find('td').eq(3).text(),
                                            "BranchTransferNumber": vals.find('td').eq(4).text(),
                                            "AccountTransferNumber": vals.find('td').eq(5).text(),
                                            "NamePayerTransfer": vals.find('td').eq(2).text().replace(/\s\s+/g, ""),
                                            "DetailsTransfer": vals.find('td').eq(9).text().replace(/\s\s+/g, ""),
                                            "TransferTotal": vals.find('td').eq(6).text().replace(/\s/g, "").replace(/,/g, '')
                                        });
                                        if (i + 1 == res.find('#dataTable526 tbody tr').length) {
                                            res = null;
                                            dfd.resolve(arr)
                                        }
                                    })
                                } else {
                                    res = null;
                                    dfd.resolve(null)
                                }
                            }
                        } catch (err) {
                            all.banks.core.services.errorLog(err)
                        }
                    }
                })
                .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                    dfd.resolve("expires");
                }));
        }

        loadHaavaraInside(url)
        return dfd.promise();
    };
    fibi.CurrencId = function (type) {
        if (type != undefined && type.indexOf('דולר ארה"ב') !== -1) {
            return 2;
        } else if (type != undefined && type.indexOf('$') !== -1) {
            return 2;
        } else if (type != undefined && type.indexOf('EUR') !== -1) {
            return 11;
        } else if (type != undefined && type.indexOf('ש"ח') !== -1) {
            return 1;
        } else if (type != undefined && type.indexOf('בשקלים') !== -1) {
            return 1;
        } else if (type != undefined && type.indexOf('אירו') !== -1) {
            return 11;
        } else if (type != undefined && type.indexOf('לי"ש') !== -1) {
            return 3;
        } else if (type != undefined && type.indexOf('זלוטי פולנ') !== -1) {
            return 12;
        } else {
            return 1
        }
    };
    fibi.loadLoan = function () {
        all.banks.core.services.httpReq("https://" + all.banks.accounts.fibi.urlServices + "/wps/myportal/FibiMenu/Online/OnLoansMortgageMenu/OnLoans/AuthLoansDetails", 'GET', null, false, false)
            .then(function (data, bbb, ccc) {
                var expires = ccc.getResponseHeader("Expires");
                if (expires === 0 || expires === "0") {
                    fibi.loginMiddleOnWork(function () {
                        fibi.loadLoan();
                    });
                } else {
                    try {
                        var data = all.banks.core.services.parseHtml(data);
                        var bankNumber = (Number(data.find('#account_num_select').find('option:selected').attr('data-bank')) ? Number(data.find('#account_num_select').find('option:selected').attr('data-bank')) : fibi.BankNumber);
                        if (bankNumber === 26) {
                            bankNumber = 126;
                        }
                        if ($(data).find('#tblHALVAOT  tbody tr').length) {
                            $(data).find('#tblHALVAOT tbody tr').each(function (i, v) {
                                var intrest = $(v).find("td").eq(3).text().replace(/\s\s+/g, "");
                                var res = '';
                                if (intrest.indexOf('P') != -1) {
                                    var sp = intrest.split('(')
                                    res = parseFloat(sp[1])
                                } else {
                                    res = parseFloat(intrest)
                                }
                                var loanNextPaymentDate = $(v).find("td").eq(7).text().replace(/\s\s+/g, "");
                                var loanDate = $(v).find("td").eq(2).text().replace(/\s\s+/g, "");
                                var loanFinish = $(v).find("td").eq(5).text().replace(/\s\s+/g, "");
                                all.banks.generalVariables.allDataArrLoan.push({
                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                    "Token": all.banks.accountDetails.bank.token,
                                    "BankNumber": bankNumber,
                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    "AccountNumber": parseInt($(data).find('.fibi_account .acc_num').text().replace(/\D/g, "")),
                                    "BranchNumber": parseInt($(data).find('.fibi_branch .branch_num').text().replace(/\D/g, "")),
                                    "LoanName": $(v).find("td").eq(0).html().split("<br>")[0].replace(/\s\s+/g, ""),
                                    "LoanNumber": $(v).find("td").eq(0).text().replace(/\s\s+/g, "").replace(/-/g, "").replace(/\D/g, ""), //$(v).find("td").eq(0).html().split("<br>")[1].replace(/\s\s+/g, "").replace(/-/g, ""),
                                    "LoanIntrest": res,
                                    "LoanFinish": all.banks.core.services.convertDateAll(fibi.convertDateLocal(loanFinish)),
                                    "LoanTotalLeft": $(v).find("td").eq(4).text().replace(/\s\s+/g, "").replace(/\s/g, "").replace(/,/g, ''),
                                    "LoanDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal(loanDate)),
                                    "PaymentsNumberLeft": null,
                                    "LoanOriginalTotal": $(v).find("td").eq(1).text().replace(/\s\s+/g, "").replace(/\s/g, "").replace(/,/g, ''),
                                    "NextPaymentTotal": $(v).find("td").eq(6).text().replace(/\s\s+/g, "").replace(/\s/g, "").replace(/,/g, ''),
                                    "LoanNextPaymentDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal(loanNextPaymentDate)),
                                    "LoanPigurTotal": null
                                });

                                const loan = all.banks.generalVariables.allDataArrLoan[all.banks.generalVariables.allDataArrLoan.length - 1];
                                loan.LoanType = null;
                                loan.NumOfPayments = null;
                                loan.NumOfInterestPayments = null;
                                loan.LastPaymentTotal = null;
                                loan.InterestFirstPaymentDate = null;
                                loan.LoanFirstPaymentDate = null;

                                const prevPaymentBlockIdMatch = /getRetr\('(.+)'\)/g.exec($(v).find("td").eq(7).find("a[href^='javascript:getRetr']").attr('href'))
                                if (prevPaymentBlockIdMatch !== null) {
                                    const principalSum = Number($(data).find('#' + prevPaymentBlockIdMatch[1] + " table > tbody > tr > td:contains('סכום קרן:')").next('td').text()
                                        .replace(/[^\d-.]/g, ""));
                                    loan.GraceNextPaymentTotal = principalSum === 0
                                        ? $(data).find('#' + prevPaymentBlockIdMatch[1] + " table > tbody > tr > td:contains('סכום ריבית:')").next('td').text()
                                            .replace(/[^\d-.]/g, "")
                                        : null;
                                }

                                const nextPaymentBlockIdMatch = /getRetr\('(.+)'\)/g.exec($(v).find("td").eq(8).find("a[href^='javascript:getRetr']").attr('href'))
                                if (nextPaymentBlockIdMatch !== null) {
                                    loan.GraceNextPaymentDate = all.banks.core.services.convertDateAll(fibi.convertDateLocal(
                                        $(data).find('#' + nextPaymentBlockIdMatch[1] + " table > tbody > tr > td:contains('תאריך ריבית:')").next('td').text()));
                                }

                                if ($(data).find('#tblHALVAOT tbody tr').length == i + 1) {

                                    all.banks.accounts.fibi.ddAccAshrai = all.banks.accounts.fibi.ddAccAshrai + 1;
                                    all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + $(data).find('form[name="LogoutUser"]').attr('action');
                                    all.banks.accounts.fibi.changeAccount(data);
                                }
                            })

                        } else {
                            all.banks.accounts.fibi.ddAccAshrai = all.banks.accounts.fibi.ddAccAshrai + 1;
                            all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + $(data).find('form[name="LogoutUser"]').attr('action');
                            all.banks.accounts.fibi.changeAccount(data);
                        }
                    } catch (e) {
                        all.banks.accounts.fibi.ddAccAshrai = all.banks.accounts.fibi.ddAccAshrai + 1;
                        all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + data.find('form[name="LogoutUser"]').attr('action');
                        all.banks.accounts.fibi.changeAccount(data);
                    }
                }
            })
            .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                fibi.loadLoan();
            }));
    };
    fibi.loadDeposit = function () {
        all.banks.core.services.httpReq("https://" + all.banks.accounts.fibi.urlServices + "/wps/myportal/FibiMenu/Online/OnDepositsAndSavings/OnlnPnsMostUsed/OnMUSavSmryShkl", 'GET', null, false, false)
            .then(function (data, bbb, ccc) {
                var expires = ccc.getResponseHeader("Expires");
                if (expires === 0 || expires === "0") {
                    fibi.loginMiddleOnWork(function () {
                        fibi.loadDeposit();
                    });
                } else {
                    try {
                        var data = all.banks.core.services.parseHtml(data);
                        var bankNumber = (Number(data.find('#account_num_select').find('option:selected').attr('data-bank')) ? Number(data.find('#account_num_select').find('option:selected').attr('data-bank')) : fibi.BankNumber);
                        if (bankNumber === 26) {
                            bankNumber = 126;
                        }
                        const commonPart = {
                            "TargetId": all.banks.accountDetails.bank.targetId,
                            "Token": all.banks.accountDetails.bank.token,
                            "BankNumber": bankNumber,
                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                            "ExporterId": all.banks.spiderConfig.spiderId,
                            "AccountNumber": parseInt($(data).find('.fibi_account .acc_num').text().replace(/\D/g, "")),
                            "BranchNumber": parseInt($(data).find('.fibi_branch .branch_num').text().replace(/\D/g, "")),
                        };
                        $(data).find('.hisahon_container.panel > .panel-body').each(function (i, v) {
                            var interest = $(v).find('[area-label="שיעור ריבית שנתית לפקדון"]').siblings('strong');
                            var interestValue = interest.length === 2 ?
                                (Number(interest.eq(0).text().replace(/[^\d.-]/g, '')) < Number(interest.eq(1).text().replace(/[^\d.-]/g, '')) ?
                                    interest.eq(0).text().replace(/[^\d.-]/g, '') : interest.eq(1).text().replace(/[^\d.-]/g, ''))
                                : interest.text().replace(/[^\d.-]/g, '');

                            all.banks.generalVariables.allDataArrDeposit.push(Object.assign({
                                    "TypeName":
                                        $(v).siblings('.panel-heading').children('h3').text().trim(),
                                    // $(v).find('[area-label="סוג הריבית"]').siblings('strong').text().trim(),
                                    "DepositAsTotal": $(v).find('[aria-label="שווי נוכחי"]').siblings('strong').text().replace(/[^\d.-]/g, ''),
                                    "DepositTotal": $(v).find('[aria-label="קרן"]').siblings('strong').text().replace(/[^\d.-]/g, ''),
                                    "DueDate": all.banks.core.services.convertDateAll(
                                        fibi.convertDateLocal($(v).find('[aria-label="מועד הפרעון"]').siblings('strong').text().trim())),
                                    "DepositDate": all.banks.core.services.convertDateAll(
                                        fibi.convertDateLocal($(v).find('[aria-label="מועד הפקדה"]').siblings('strong').text().trim())),
                                    "DepositExistStation": all.banks.core.services.convertDateAll(
                                        fibi.convertDateLocal($(v).find('[aria-label="תחנת היציאה הבאה"]').siblings('strong').text().trim())),
                                    "DepositNumber":  // $(v).find('[aria-label="מס פקדון"]').siblings('strong').text().replace(/[^\d.-]/g, ''),
                                        '',
                                    "DepositInterest": interestValue
                                }, commonPart)
                            );
                        });

//                        if ($(data).find('#dataTable101').length) {
//                            $(data).find('#dataTable101 tbody tr').each(function (i, v) {
//                                var num1 = $(v).find("td a").eq(0).attr("onclick").split(",")[0].replace(/\D/g, "");
//                                var num2 = $(v).find("td a").eq(0).attr("onclick").split(",")[1].replace(/\D/g, "");
//                                var num3 = $(v).find("td a").eq(0).attr("onclick").split(",")[2].replace(/\D/g, "");
//                                var uri = "https://" + all.banks.accounts.fibi.urlServices + "/MatafServiceServlets/MatafPortalServiceServlet?SUGBAKA=" + num1 + "&IN-BANK=" + num2 + "&IN-MISPAR-PIKADON=" + num3 + "&tscache=" + new Date().getTime() + "&";
//                                all.banks.core.services.httpReq(uri, 'GET', null, false, false)
//                                    .then(function (res1) {
//                                        var res = "<html><body>" + res1 + "</body></html>";
//                                        var res = all.banks.core.services.parseHtml(res);
//                                        var depositInterest;
//                                        if ($(res).find('.inner_tab.stam_tab .tbl_layout').eq(0).find('tbody > tr').eq(6).children("td").eq(1).find('span').length == 1 && res.find('.strong.flr.222').length == 0) {
//                                            depositInterest = $(res).find('.inner_tab.stam_tab .tbl_layout').eq(0).find('tbody > tr').eq(6).children("td").eq(1).text().replace(/\s/g, "").replace("%", "").replace("-", "");
//                                        } else if (res.find('.strong.flr.222').length) {
//                                            depositInterest = res.find('.strong.flr.222').text().replace(/\s/g, "").replace("%", "").replace("-", "");
//
//                                        } else {
//                                            depositInterest = $(res).find('.inner_tab.stam_tab .tbl_layout').eq(0).find('tbody > tr').eq(6).children("td").eq(1).find('span').eq(1).text().replace(/\s/g, "").replace("%", "").replace("-", "");
//                                        }
//                                        if (depositInterest.indexOf("P") !== -1) {
//                                            depositInterest = 100 + parseFloat(depositInterest.replace("P", ""));
//                                        }
//                                        all.banks.generalVariables.allDataArrDeposit.push({
//                                            "TargetId": all.banks.accountDetails.bank.targetId,
//                                            "Token": all.banks.accountDetails.bank.token,
//                                            "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
//                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
//                                            "ExporterId": all.banks.spiderConfig.spiderId,
//                                            "AccountNumber": parseInt($(data).find('.fibi_account .acc_num').text().replace(/\D/g, "")),
//                                            "BranchNumber": parseInt($(data).find('.fibi_branch .branch_num').text().replace(/\D/g, "")),
//                                            "TypeName": $(v).find("td").eq(0).text().replace(/\s\s+/g, ""),
//                                            "DepositTotal": $(v).find("td").eq(3).text().replace(/\s\s+/g, "").replace(/ /g, '').replace(/,/g, ''),
//                                            "DepositAsTotal": $(v).find("td").eq(7).text().replace(/\s\s+/g, "").replace(/ /g, '').replace(/,/g, ''),
//                                            "DueDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal($(v).find("td").eq(5).text().replace(/\s\s+/g, ""))),
//                                            "DepositDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal($(v).find("td").eq(4).text().replace(/\s\s+/g, ""))),
//                                            "DepositExistStation": all.banks.core.services.convertDateAll(fibi.convertDateLocal($(v).find("td").eq(6).text().replace(/\s\s+/g, ""))),
//                                            "DepositNumber": '',//$(res).find('.inner_tab.stam_tab .tbl_layout').eq(0).find('tbody > tr').eq(2).children("td").eq(1).text().replace(/\s\s+/g, "").replace(/-/g, ""),
//                                            "DepositInterest": depositInterest
//                                        });
//
//                                        if ($(data).find('#dataTable101 tbody tr').length == i + 1) {
//                                            all.banks.accounts.fibi.ddAccAshrai = all.banks.accounts.fibi.ddAccAshrai + 1;
//                                            all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + data.find('form[name="LogoutUser"]').attr('action');
//                                            all.banks.accounts.fibi.changeAccount(data);
//
//                                        }
//                                    })
//                                    .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
//                                        all.banks.generalVariables.allDataArrDeposit = [];
//                                        fibi.loadDeposit();
//                                    }));
//                            })
//                        } else {

                        all.banks.accounts.fibi.ddAccAshrai = all.banks.accounts.fibi.ddAccAshrai + 1;
                        all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + data.find('form[name="LogoutUser"]').attr('action');
                        all.banks.accounts.fibi.changeAccount(data);
//                        }
                    } catch (e) {
                        all.banks.accounts.fibi.ddAccAshrai = all.banks.accounts.fibi.ddAccAshrai + 1;
                        all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + data.find('form[name="LogoutUser"]').attr('action');
                        all.banks.accounts.fibi.changeAccount(data);
                    }
                }
            })
            .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                fibi.loadDeposit();
            }));
    };
    fibi.loadDueChecks = function () {
        all.banks.core.services.httpReq("https://" + all.banks.accounts.fibi.urlServices + "/wps/myportal/FibiMenu/Online/OnAccountMngment/OnChequeActions/OnChequeDahui", 'GET', null, false, false)
            .then(function (res, bbb, ccc) {
                var expires = ccc.getResponseHeader("Expires");
                if (expires === 0 || expires === "0") {
                    fibi.loginMiddleOnWork(function () {
                        fibi.loadDueChecks();
                    });
                } else {
                    try {
                        var res = all.banks.core.services.parseHtml(res);
                        var dateFrom = ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + new Date().getFullYear();
                        var dateToFormat = new Date(new Date().getFullYear(), new Date().getMonth() + 36, new Date().getDate());
                        var dateTo = ("0" + (dateToFormat.getDate())).slice(-2) + '' + ("0" + (dateToFormat.getMonth() + 1)).slice(-2) + dateToFormat.getFullYear();
                        var jsons = {
                            "SUGBAKA": $(res).find("input[name='SUGBAKA']").val(),
                            "responseType": 'HTML',
                            "RESFOR": 'XRL',
                            "SNIFA": $(res).find("input[name='SNIFA']").val(),
                            "MCHA": $(res).find("input[name='MCHA']").val(),
                            "ZIHCHEVR": $(res).find("select[name='company_num_select'] option:selected").val(),
                            "I-TAARIH-P": '',
                            "I-TR-FIRST": dateFrom,
                            "I-SUG-LINK": '055',
                            "I-ZIHUY-P": '',
                            "I-BANK-HAM": '',
                            "I-SNIF-HAM": '',
                            "I-MCH-HAM": '',
                            "I-MIS-HAM": '',
                            "I-S-HAM": '',
                            "I-SHLVIBUD": '',
                            "I-EXCEL-MURCHAV": '0',
                            "I-TR-LAST": dateTo
                        }
                    } catch (e) {
                        all.banks.accounts.fibi.ddAccAshrai = all.banks.accounts.fibi.ddAccAshrai + 1;
                        all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + res.find('form[name="LogoutUser"]').attr('action');
                        all.banks.accounts.fibi.changeAccount(data);
                    }
                    if ($(res).find("#mymsgdiv").length == 0) {
                        function loadDueChecksPage() {
                            var url;
                            if (parseInt(all.banks.accountDetails.bank.BankNumber) == 31 || parseInt(all.banks.accountDetails.bank.BankNumber) == 46 || parseInt(all.banks.accountDetails.bank.BankNumber) == 126) {
                                if ($(res).find('head').find("base").length) {
                                    url = $(res).find('head').find("base").attr("href")
                                        // $(res).find('form[name="LogoutUser"]').attr('action').split('/dl4/')
                                        + $(res).find("form[name='FormLinkSugbaka']").attr("action");
                                } else {
                                    url = "https://" + all.banks.accounts.fibi.urlServices + $(res).find("form[name='FormLinkSugbaka']").attr("action");
                                }
                            } else {
                                url = "https://" + all.banks.accounts.fibi.urlServices + $(res).find("form[name='FormLinkSugbaka']").attr("action");
                            }
                            all.banks.core.services.httpReq(url, 'POST', jsons, true, false)
                                .then(function (data) {
                                    try {
                                        var data = all.banks.core.services.parseHtml(data);
                                        var bankNumber = (Number(data.find('#account_num_select').find('option:selected').attr('data-bank')) ? Number(data.find('#account_num_select').find('option:selected').attr('data-bank')) : fibi.BankNumber);
                                        if (bankNumber === 26) {
                                            bankNumber = 126;
                                        }
                                        if ($(data).find('#DayDetailsTable').length) {
                                            $(data).find('#DayDetailsTable tbody tr').each(function (i, v) {
                                                all.banks.generalVariables.allDataArrDueChecks.push({
                                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                                    "Token": all.banks.accountDetails.bank.token,
                                                    "BankNumber": bankNumber,
                                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                                    "AccountNumber": parseInt($(data).find('.fibi_account .acc_num').text().replace(/\D/g, "")),
                                                    "BranchNumber": parseInt($(data).find('.fibi_branch .branch_num').text().replace(/\D/g, "")),
                                                    "CheckNumber": $(v).find("td").eq(5).text().replace(/\s/g, ""),
                                                    "CheckDescription": $(v).find("td").eq(7).text().replace(/\s\s+/g, ""),
                                                    "DepositeDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal($(v).find("td").eq(6).text())),
                                                    "DueDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal($(v).find("td").eq(0).text())),
                                                    "CheckTotal": $(v).find("td").eq(1).text().replace(/\s\s+/g, "").replace(/ /g, '').replace(/,/g, ''),
                                                    "CheckBankNumber": $(v).find("td").eq(4).text().replace(/\s/g, ""),
                                                    "CheckAccountNumber": $(v).find("td").eq(2).text().replace(/\s/g, ""),
                                                    "CheckBranchNumber": $(v).find("td").eq(3).text().replace(/\s/g, "")
                                                });

                                                if ($(data).find('#DayDetailsTable tbody tr').length == i + 1) {
                                                    try {
                                                        const nextPageLink = $(data).find('#fibi_tab_Data > span > a').attr('href');
                                                        let nextPageLinkParams;
                                                        if (nextPageLink && (nextPageLinkParams = /javascript:.+\((.+)\)/g.exec(nextPageLink)) !== null) {
                                                            nextPageLinkParams = nextPageLinkParams[1].split(',');
                                                            jsons['SUGBAKA'] = nextPageLinkParams[0].replace(/'/g, "");
                                                            jsons['SNIFA'] = nextPageLinkParams[1].replace(/'/g, "");
                                                            jsons['MCHA'] = nextPageLinkParams[2].replace(/'/g, "");
                                                            jsons['ZIHCHEVR'] = nextPageLinkParams[3].replace(/'/g, "");
                                                            jsons['I-TAARIH-P'] = nextPageLinkParams[4].replace(/'/g, "");
                                                            jsons['I-TR-FIRST'] = nextPageLinkParams[5].replace(/'/g, "");
                                                            jsons['I-SUG-LINK'] = nextPageLinkParams[6].replace(/'/g, "");
                                                            jsons['I-ZIHUY-P'] = nextPageLinkParams[7].replace(/'/g, "");
                                                            jsons['I-BANK-HAM'] = nextPageLinkParams[8].replace(/'/g, "");
                                                            jsons['I-SNIF-HAM'] = nextPageLinkParams[9].replace(/'/g, "");
                                                            jsons['I-MCH-HAM'] = nextPageLinkParams[10].replace(/'/g, "");
                                                            jsons['I-MIS-HAM'] = nextPageLinkParams[11].replace(/'/g, "");
                                                            jsons['I-S-HAM'] = nextPageLinkParams[12].replace(/'/g, "");
                                                            jsons['I-EXCEL-MURCHAV'] = nextPageLinkParams[13].replace(/'/g, "");
                                                            jsons['I-SHLVIBUD'] = nextPageLinkParams[14].replace(/'/g, "");
                                                            jsons['I-TR-LAST'] = nextPageLinkParams[15].replace(/'/g, "");
                                                            res = data;
                                                            loadDueChecksPage();
                                                            return;
                                                        }
                                                    } catch (e) {
                                                        writeLog('fibi.loadDueChecks: Failed to proceed to next page. ' + e);
                                                    }
                                                    // all.banks.accounts.fibi.ddAccAshrai = all.banks.accounts.fibi.ddAccAshrai + 1;
                                                    // all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + $(data).find('form[name="LogoutUser"]').attr('action');
                                                    // all.banks.accounts.fibi.changeAccount(data);
                                                    fibi.loadDueChecksNikaion();
                                                }
                                            });
                                        } else {
                                            // all.banks.accounts.fibi.ddAccAshrai = all.banks.accounts.fibi.ddAccAshrai + 1;
                                            // all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + $(data).find('form[name="LogoutUser"]').attr('action');
                                            // all.banks.accounts.fibi.changeAccount(data);
                                            fibi.loadDueChecksNikaion();
                                        }
                                    } catch (e) {
                                        all.banks.accounts.fibi.ddAccAshrai = all.banks.accounts.fibi.ddAccAshrai + 1;
                                        all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + $(data).find('form[name="LogoutUser"]').attr('action');
                                        all.banks.accounts.fibi.changeAccount(data);
                                    }
                                })
                                .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                                    fibi.loadDueChecks();
                                }));
                        }

                        loadDueChecksPage();
                    } else {
                        // all.banks.accounts.fibi.ddAccAshrai = all.banks.accounts.fibi.ddAccAshrai + 1;
                        // all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + $(res).find('form[name="LogoutUser"]').attr('action');
                        // all.banks.accounts.fibi.changeAccount(res);
                        fibi.loadDueChecksNikaion();

                    }
                }
            })
            .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                fibi.loadDueChecks();
            }));
    };
    fibi.loadDueChecksNikaion = function () {
        all.banks.core.services.httpReq("https://" + all.banks.accounts.fibi.urlServices + "/wps/myportal/FibiMenu/Online/OnAccountMngment/OnChequeActions/OnChequeCleaned", 'GET', null, false, false)
            .then(function (res, bbb, ccc) {
                var expires = ccc.getResponseHeader("Expires");
                if (expires === 0 || expires === "0") {
                    fibi.loginMiddleOnWork(function () {
                        fibi.loadDueChecksNikaion();
                    });
                } else {
                    try {
                        var res = all.banks.core.services.parseHtml(res);
                        var dateFrom = ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + new Date().getFullYear();
                        var dateToFormat = new Date(new Date().getFullYear(), new Date().getMonth() + 36, new Date().getDate());
                        var dateTo = ("0" + (dateToFormat.getDate())).slice(-2) + '' + ("0" + (dateToFormat.getMonth() + 1)).slice(-2) + dateToFormat.getFullYear();
                        var jsons = {
                            "SUGBAKA": $(res).find("input[name='SUGBAKA']").val(),
                            "responseType": 'HTML',
                            "RESFOR": 'XRL',
                            "SNIFA": $(res).find("input[name='SNIFA']").val(),
                            "MCHA": $(res).find("input[name='MCHA']").val(),
                            "ZIHCHEVR": $(res).find("select[name='company_num_select'] option:selected").val(),
                            "I-TAARIH-P": '',
                            "I-TR-FIRST": dateFrom,
                            "I-SUG-LINK": '055',
                            "I-ZIHUY-P": '',
                            "I-BANK-HAM": '',
                            "I-SNIF-HAM": '',
                            "I-MCH-HAM": '',
                            "I-MIS-HAM": '',
                            "I-S-HAM": '',
                            "I-SHLVIBUD": '',
                            "I-EXCEL-MURCHAV": '0',
                            "I-TR-LAST": dateTo
                        }
                    } catch (e) {
                        all.banks.accounts.fibi.ddAccAshrai = all.banks.accounts.fibi.ddAccAshrai + 1;
                        all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + res.find('form[name="LogoutUser"]').attr('action');
                        all.banks.accounts.fibi.changeAccount(data);
                    }
                    if ($(res).find("#mymsgdiv").length == 0) {
                        var url;
                        if (parseInt(all.banks.accountDetails.bank.BankNumber) == 31 || parseInt(all.banks.accountDetails.bank.BankNumber) == 46 || parseInt(all.banks.accountDetails.bank.BankNumber) == 126) {
                            if ($(res).find('head').find("base").length) {
                                url = $(res).find('head').find("base").attr("href")
                                    // $(res).find('form[name="LogoutUser"]').attr('action').split('/dl4/')
                                    + $(res).find("form[name='FormLinkSugbaka']").attr("action");
                            } else {
                                url = "https://" + all.banks.accounts.fibi.urlServices + $(res).find("form[name='FormLinkSugbaka']").attr("action");
                            }
                        } else {
                            url = "https://" + all.banks.accounts.fibi.urlServices + $(res).find("form[name='FormLinkSugbaka']").attr("action");
                        }
                        all.banks.core.services.httpReq(url, 'POST', jsons, true, false)
                            .then(function (data) {
                                try {
                                    var data = all.banks.core.services.parseHtml(data);
                                    var bankNumber = (Number(data.find('#account_num_select').find('option:selected').attr('data-bank')) ? Number(data.find('#account_num_select').find('option:selected').attr('data-bank')) : fibi.BankNumber);
                                    if (bankNumber === 26) {
                                        bankNumber = 126;
                                    }
                                    if ($(data).find('#DayDetailsTable').length) {
                                        $(data).find('#DayDetailsTable tbody tr').each(function (i, v) {
                                            all.banks.generalVariables.allDataArrDueChecks.push({
                                                "TargetId": all.banks.accountDetails.bank.targetId,
                                                "Token": all.banks.accountDetails.bank.token,
                                                "BankNumber": bankNumber,
                                                "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                "ExporterId": all.banks.spiderConfig.spiderId,
                                                "AccountNumber": parseInt($(data).find('.fibi_account .acc_num').text().replace(/\D/g, "")),
                                                "BranchNumber": parseInt($(data).find('.fibi_branch .branch_num').text().replace(/\D/g, "")),
                                                "CheckNumber": $(v).find("td").eq(5).text().replace(/\s/g, ""),
                                                "CheckDescription": $(v).find("td").eq(7).text().replace(/\s\s+/g, "") != '' ? $(v).find("td").eq(7).text().replace(/\s\s+/g, "") : "שיקים לנכיון",
                                                "DepositeDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal($(v).find("td").eq(6).text())),
                                                "DueDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal($(v).find("td").eq(0).text())),
                                                "CheckTotal": $(v).find("td").eq(1).text().replace(/\s\s+/g, "").replace(/ /g, '').replace(/,/g, ''),
                                                "CheckBankNumber": $(v).find("td").eq(4).text().replace(/\s/g, ""),
                                                "CheckAccountNumber": $(v).find("td").eq(2).text().replace(/\s/g, ""),
                                                "CheckBranchNumber": $(v).find("td").eq(3).text().replace(/\s/g, "")
                                            });

                                            if ($(data).find('#DayDetailsTable tbody tr').length == i + 1) {
                                                all.banks.accounts.fibi.ddAccAshrai = all.banks.accounts.fibi.ddAccAshrai + 1;
                                                all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + $(data).find('form[name="LogoutUser"]').attr('action');
                                                all.banks.accounts.fibi.changeAccount(data);
                                            }
                                        })
                                    } else {
                                        all.banks.accounts.fibi.ddAccAshrai = all.banks.accounts.fibi.ddAccAshrai + 1;
                                        all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + $(data).find('form[name="LogoutUser"]').attr('action');
                                        all.banks.accounts.fibi.changeAccount(data);

                                    }
                                } catch (e) {
                                    all.banks.accounts.fibi.ddAccAshrai = all.banks.accounts.fibi.ddAccAshrai + 1;
                                    all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + $(data).find('form[name="LogoutUser"]').attr('action');
                                    all.banks.accounts.fibi.changeAccount(data);

                                }
                            })
                            .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                                fibi.loadDueChecksNikaion();
                            }));
                    } else {
                        all.banks.accounts.fibi.ddAccAshrai = all.banks.accounts.fibi.ddAccAshrai + 1;
                        all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + $(res).find('form[name="LogoutUser"]').attr('action');
                        all.banks.accounts.fibi.changeAccount(res);
                    }
                }
            })
            .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                fibi.loadDueChecksNikaion();
            }));
    };
    fibi.loadStandingOrders = function () {

        function chargeDetails() {
            all.banks.core.services.httpReq("https://" + all.banks.accounts.fibi.urlServices + "/wps/myportal/FibiMenu/Online/OnAccountMngment/chargeAllow/chargeDetails", 'GET', null, false, false)
                .then(function (res, bbb, ccc) {
                    var expires = ccc.getResponseHeader("Expires");
                    if (expires === 0 || expires === "0") {
                        fibi.loginMiddleOnWork(function () {
                            fibi.loadStandingOrders();
                        });
                    } else {
                        try {
                            var data = all.banks.core.services.parseHtml(res);
                            var bankNumber = (Number(data.find('#account_num_select').find('option:selected').attr('data-bank')) ? Number(data.find('#account_num_select').find('option:selected').attr('data-bank')) : fibi.BankNumber);
                            if (bankNumber === 26) {
                                bankNumber = 126;
                            }
                            if ($(data).find("#Harshaot tbody tr").length) {
                                $(data).find("#Harshaot tbody tr").each(function (i, v) {
                                    all.banks.generalVariables.allDataArrStandingOrders.push({
                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                        "Token": all.banks.accountDetails.bank.token,
                                        "BankNumber": bankNumber,
                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                        "AccountNumber": parseInt($(data).find('.fibi_account .acc_num').text().replace(/\D/g, "")),
                                        "BranchNumber": parseInt($(data).find('.fibi_branch .branch_num').text().replace(/\D/g, "")),
                                        "OrderName": $(v).children("td").eq(2).text().replace(/\s\s+/g, ""),
                                        "OrderOpeningDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal($(v).children("td").eq(4).text().replace(/\./g, '/'))),
                                        "OrderLastDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal($(v).children("td").eq(8).text().replace(/\./g, '/'))),
                                        "OrderTotal": $(v).children("td").eq(9).text().replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, ''),
                                        "OrderNumber": $(v).children("td").eq(1).text().replace(/\D/g, ""),
                                        "Asmachta": "", //$(v).children("td").eq(6).text().replace(/\s/g, ""),
                                        BankTransferNumber: null,
                                        BranchTransferNumber: null,
                                        AccountTransferNumber: null,
                                        NamePayerTransfer: null,
                                        Type: 1,
                                    });

                                    if ($(data).find("#Harshaot tbody tr").length == i + 1) {
                                        all.banks.accounts.fibi.ddAccAshrai = all.banks.accounts.fibi.ddAccAshrai + 1;
                                        all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + data.find('form[name="LogoutUser"]').attr('action');
                                        all.banks.accounts.fibi.changeAccount(data);
                                    }
                                })
                            } else {
                                all.banks.accounts.fibi.ddAccAshrai = all.banks.accounts.fibi.ddAccAshrai + 1;
                                all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + $(data).find('form[name="LogoutUser"]').attr('action');
                                all.banks.accounts.fibi.changeAccount(data);
                            }
                        } catch (e) {
                            all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + $(data).find('form[name="LogoutUser"]').attr('action');
                            all.banks.accounts.fibi.changeAccount(res);
                            all.banks.accounts.fibi.ddAccAshrai = all.banks.accounts.fibi.ddAccAshrai + 1;
                        }
                    }
                })
                .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                    fibi.loadStandingOrders();
                }));
        }


        all.banks.core.services.httpReq("https://" + all.banks.accounts.fibi.urlServices + "/wps/myportal/FibiMenu/Online/OnAccountMngment/OnBalanceTrans/OnDebitDetailsPrivate", 'GET', null, false, false)
            .then(function (res, bbb, ccc) {
                var expires = ccc.getResponseHeader("Expires");
                if (expires === 0 || expires === "0") {
                    fibi.loginMiddleOnWork(function () {
                        fibi.loadStandingOrders();
                    });
                } else {
                    try {
                        var data = all.banks.core.services.parseHtml(res);
                        var bankNumber = (Number(data.find('#account_num_select').find('option:selected').attr('data-bank')) ? Number(data.find('#account_num_select').find('option:selected').attr('data-bank')) : fibi.BankNumber);
                        if (bankNumber === 26) {
                            bankNumber = 126;
                        }
                        if ($(data).find(".rounded.data tbody tr").length) {
                            $(data).find(".rounded.data tbody tr").each(function (i, v) {
                                all.banks.generalVariables.allDataArrStandingOrders.push({
                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                    "Token": all.banks.accountDetails.bank.token,
                                    "BankNumber": bankNumber,
                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    "AccountNumber": parseInt($(data).find('.fibi_account .acc_num').text().replace(/\D/g, "")),
                                    "BranchNumber": parseInt($(data).find('.fibi_branch .branch_num').text().replace(/\D/g, "")),
                                    "OrderName": $(v).children("td").eq(0).text().replace(/\s\s+/g, ""),
                                    "OrderOpeningDate": null,
                                    "OrderLastDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal($(v).children("td").eq(2).text().replace(/\./g, '/'))),
                                    "OrderTotal": $(v).children("td").eq(1).text().replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, ''),
                                    "OrderNumber": null,
                                    "Asmachta": $(v).children("td").eq(5).text().replace(/\s/g, ""),
                                    BankTransferNumber: all.banks.core.services.getTypeBank($(v).children("td").eq(6).text().replace(/\s\s+/g, "")),
                                    BranchTransferNumber: null,
                                    AccountTransferNumber: null,
                                    NamePayerTransfer: $(v).children("td").eq(7).text().replace(/\s\s+/g, ""),
                                    Type: 2,
                                });


                                if ($(data).find(".rounded.data tbody tr").length === i + 1) {
                                    all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + data.find('form[name="LogoutUser"]').attr('action');
                                    chargeDetails();
                                }
                            })
                        } else {
                            all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + $(data).find('form[name="LogoutUser"]').attr('action');
                            chargeDetails();
                        }
                    } catch (e) {
                        all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + $(data).find('form[name="LogoutUser"]').attr('action');
                        chargeDetails();
                    }
                }
            })
            .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                fibi.loadStandingOrders();
            }));
    };
    fibi.loadMatah = function (isEmpty, isNewCompany) {
        function checkIfFinished() {
            if (isNewCompany) {
                return false
            }
            if (isEmpty && !all.banks.accounts.fibi.selectAcc.length && !all.banks.accounts.fibi.selectCompany.length) {
                return false
            }
            if (all.banks.accounts.fibi.selectAcc && all.banks.accounts.fibi.selectAcc.length && all.banks.accounts.fibi.selectAcc.val() !== undefined) {
                var optionFirst = $(all.banks.accounts.fibi.selectAcc).find('option').eq(0).val();
                var minusLength = 1;
                if (optionFirst == "") {
                    minusLength = 2;
                }
                if ((($(all.banks.accounts.fibi.selectAcc).find('option').length - minusLength) >= all.banks.accounts.fibi.ind)) {
                    return false
                }
            }
            return true;
        }

        function promiseEmpty(res) {
            return $.when(res)
        }

        if (!checkIfFinished()) {
            var url = "https://" + all.banks.accounts.fibi.urlServices + "/wps/myportal/FibiMenu/Online/OnForeignCurrency/" +
                ((parseInt(all.banks.accountDetails.bank.BankNumber) === 52
                    || parseInt(all.banks.accountDetails.bank.BankNumber) === 14
                    || parseInt(all.banks.accountDetails.bank.BankNumber) === 46
                    || parseInt(all.banks.accountDetails.bank.BankNumber) === 31
                    || parseInt(all.banks.accountDetails.bank.BankNumber) === 126
                ) ? "OnCurrentAccountFC/AuthFCCurrentMovements" : "OnlnFCMostUsed/OnMUFCCMovs");

            all.banks.core.services.httpReq(url, 'GET', null, false, false)
                .then(isEmpty ? promiseEmpty : fibi.initializeGlobals)
                .then(isEmpty ? promiseEmpty : fibi.restoreCompanySelection)
                .then(isEmpty ? promiseEmpty : fibi.restoreAccountSelection)
                .then(function (res) {
                    try {
                        var data = all.banks.core.services.parseHtml(res);
                        var numSubAcc = data.find('select[name="IN-SCH-MTB"] option').length;
                        all.banks.accounts.fibi.logOutUrl = 'https://' + all.banks.accounts.fibi.urlServices + '' + data.find('form[name="LogoutUser"]').attr('action');
                        if (!data.find('#mymsgdiv').length && numSubAcc) {
                            var accDea = data.find('select[name="IN-SCH-MTB"] option').eq(fibi.ddASubAccMatah).text().split('-');
                            console.log(all.banks.accounts.aibank.datebacksleshMatah + " -> " + accDea, accDea[2]);
                            var currencyId = all.banks.core.services.getTypeCurrencyAll(accDea[2], true);
                            if (currencyId == null) {
                                currencyId = 99;
                            }
                            var bankNumber = (Number(data.find('#account_num_select').find('option:selected').attr('data-bank')) ? Number(data.find('#account_num_select').find('option:selected').attr('data-bank')) : fibi.BankNumber);
                            if (bankNumber === 26) {
                                bankNumber = 126;
                            }
                            var acc = {
                                'BankNumber': bankNumber,
                                'AccountNumber': parseInt(data.find('.fibi_account .acc_num').text().replace(/\D/g, "")),
                                'BranchNumber': parseInt(data.find('.fibi_branch .branch_num').text().replace(/\D/g, "")),
                                'Balance': 0,
                                'AccountCredit': null,
                                "BankAccountTypeId": (accDea.length > 0) ? accDea[0].replace(/\s/g, "") : null,
                                "CurrencyId": currencyId
                            };
                            writeLog('loadMatah: ' + JSON.stringify(acc));
                            all.banks.generalVariables.allDataArrMatah.BankData[0].Account.push(acc);
                            all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow = [];
                            fibi.loadOshMatah(data);
                        } else {
                            if (numSubAcc > fibi.ddASubAccMatah + 1) {
                                fibi.ddASubAccMatah++;
                                fibi.loadMatah(true);
                            } else {
                                all.banks.accounts.fibi.ind = all.banks.accounts.fibi.ind + 1;
                                all.banks.accounts.fibi.ddAccAshrai = 0;
                                fibi.ddASubAccMatah = 0;
                                fibi.loadMatah();
                                data = null;
                            }
                        }
                    } catch (e) {
                        console.log(e)
                        all.banks.core.services.errorLog("fibi.loadMatah() " + e);
                    }
                })
                .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                    fibi.loadMatah(isEmpty, isNewCompany);
                }));
        } else {
            var indCompOptionFirstNull = 0;
            var optionFirst1 = $(all.banks.accounts.fibi.selectCompany).find('option').eq(0).val();
            if (!optionFirst1) {
                indCompOptionFirstNull = 1;
            }
            if (all.banks.accounts.fibi.selectCompany.length && all.banks.accounts.fibi.selectCompany.val() !== $(all.banks.accounts.fibi.selectCompany).find('option').eq(all.banks.accounts.fibi.indCompany + indCompOptionFirstNull).val()) {
                all.banks.accounts.fibi.indCompany = all.banks.accounts.fibi.indCompany + 1;
                fibi.ind = 0;
                fibi.ddAccAshrai = 0;
                fibi.ddASubAccMatah = 0;
                fibi.loadMatah(false, true);
            } else {
                all.banks.accounts.fibi.ddAccAshrai = 0;
                all.banks.accountDetails.ccardMonth = 0;
                all.banks.accountDetails.IND_NILVIM = 0;
                all.banks.accountDetails.MATAH_DAY_TO_RUN = 0;
                all.banks.accounts.fibi.sendOshCtrl(2, 1);
            }
        }
    }
    fibi.loadOshMatah = function (data, nextPage) {
        var dataLast = data;
        var numSubAcc = data.find('select[name="IN-SCH-MTB"] option').length;// length of sub acc matah
        if (data !== undefined && numSubAcc > 0) {
            var formdata, urlPost;
            if (data.find('head').find("base").length) {
                urlPost = data.find('head').find("base").attr("href")
                    + data.find("form[name='showTnuot']").attr("action");
            } else {
                urlPost = "https://" + all.banks.accounts.fibi.urlServices + data.find("form[name='showTnuot']").attr('action');
            }
            if (nextPage == undefined) {
                // responseType: HTML
                // SUGBAKA: 040
                // MC_ID: 1
                // IN-EXCEL-MURCHAV: 1
                // attachment:
                //     IN-SCH-MTB: 719002
                // fromDate: 27/07/2022
                // IN-DATE-FROM-YYYY: 2022
                // IN-DATE-FROM-MM: 07
                // IN-DATE-FROM-DD: 27
                // tillDate: 03/08/2022
                // IN-DATE-TO-YYYY: 2022
                // IN-DATE-TO-MM: 08
                // IN-DATE-TO-DD: 03


                console.log("loadOshMatah");
                formdata = {
                    "responseType": "HTML",
                    "SUGBAKA": "040",
                    "MC_ID": "1",
                    "IN-EXCEL-MURCHAV": "1",
                    "attachment": "",
                    "IN-SCH-MTB": data.find('select[name="IN-SCH-MTB"] option').eq(fibi.ddASubAccMatah).val(),
                    "fromDate": all.banks.accounts.aibank.datebacksleshMatah,
                    "IN-DATE-FROM-YYYY": all.banks.accounts.aibank.datebacksleshMatah.split('/')[2],
                    "IN-DATE-FROM-MM": all.banks.accounts.aibank.datebacksleshMatah.split('/')[1],
                    "IN-DATE-FROM-DD": all.banks.accounts.aibank.datebacksleshMatah.split('/')[0],
                    "tillDate": all.banks.accounts.aibank.datebacksleshToMatah,
                    "IN-DATE-TO-YYYY": all.banks.accounts.aibank.datebacksleshToMatah.split('/')[2],
                    "IN-DATE-TO-MM": all.banks.accounts.aibank.datebacksleshToMatah.split('/')[1],
                    "IN-DATE-TO-DD": all.banks.accounts.aibank.datebacksleshToMatah.split('/')[0]
                };
            } else {
                console.log("go to next page");
                formdata = {
                    "SUGBAKA": "040",
                    "IN-SCH-MTB": data.find('select[name="IN-SCH-MTB"] option').eq(fibi.ddASubAccMatah).val(),
                    "IN-DATE-FROM-YYYY": all.banks.accounts.aibank.datebacksleshMatah.split('/')[2],
                    "IN-DATE-FROM-MM": all.banks.accounts.aibank.datebacksleshMatah.split('/')[1],
                    "IN-DATE-FROM-DD": all.banks.accounts.aibank.datebacksleshMatah.split('/')[0],
                    "IN-DATE-TO-YYYY": all.banks.accounts.aibank.datebacksleshToMatah.split('/')[2],
                    "IN-DATE-TO-MM": all.banks.accounts.aibank.datebacksleshToMatah.split('/')[1],
                    "IN-DATE-TO-DD": all.banks.accounts.aibank.datebacksleshToMatah.split('/')[0],
                    "IN-MONE-TN-DAF": data.find('[name="IN-MONE-TN-DAF"] ').val(),
                    "IN-MONE-TN-MFT": data.find('[name="IN-MONE-TN-DAF"] ').val(),
                    "IN-DIRECT": 'F'
                };
            }
            all.banks.core.services.httpReq(urlPost, 'POST', formdata, true, false)
                .then(function (res, bbb, ccc) {
                    console.log("--loadOshMatah--")
                    var expires = ccc.getResponseHeader("Expires");
                    if (expires === 0 || expires === "0") {
                        if (data == undefined) {
                            var data = dataLast;
                        }
                        fibi.loginMiddleOnWork(function () {
                            fibi.loadOshMatah(data, nextPage);
                        });
                    } else {
                        all.banks.accounts.fibi.lastContentLocation = ccc.getResponseHeader("Content-Location");
                        var data = all.banks.core.services.parseHtml(res);
                        if (data.find('.filter_form.complex.border_bottom tbody tr').length) {
                            data.find('.filter_form.complex.border_bottom tbody tr').each(function (i, v) {
                                var transactionType, sum;
                                var hova = $(v).find('.debit').text();
                                var zchut = $(v).find('.credit').text();
                                if (zchut == '') {
                                    transactionType = '0';
                                    sum = hova;
                                } else {
                                    transactionType = '1';
                                    sum = zchut;
                                }
                                var balance = $(v).find('td ').eq(0).text().replace(/\s/g, "").replace(/,/g, '');
                                var depositTransferData = null;
                                if (sum != '' && $(v).find('td ').eq(7).text() != '') {
                                    if ($(v).find('td a').attr('href')) {
                                        if ($(v).find('td a').attr('href').split("javascript:call258('").length > 1) {
                                            var dataFunc = $(v).find('td a').attr('href').split("call258(")[1].split(");")[0].split(",");
                                            var link258 = data.find("form#link258");
                                            link258.find("input[name='I-SWFTDATE']").val(dataFunc[0].replace(/'/g, ""));
                                            link258.find("input[name='I-SWFTTIME']").val(dataFunc[1].replace(/'/g, ""));
                                            link258.find("input[name='I-SWFTASM']").val(dataFunc[2].replace(/'/g, ""));
                                            link258.find("input[name='I-KOD-TEL']").val(dataFunc[3].replace(/'/g, ""));

                                            var url = "https://" + all.banks.accounts.fibi.urlServices + "/MatafServiceServlets/ReadMailServlet?";
                                            url += link258.serialize();
                                            url += '&SwiftDate=' + dataFunc[0].replace(/'/g, "") + '&SwiftTime=' + dataFunc[1].replace(/'/g, "") + '&SwiftAsm=' + dataFunc[2].replace(/'/g, "") + '&KodTel=' + dataFunc[3].replace(/'/g, "");
                                            depositTransferData = url;

                                        }
                                        if ($(v).find('td a').attr('href').split('javascript:call276').length > 1) {
                                            var dataFunc = $(v).find('td a').attr('href').split("call276(")[1].split(");")[0].split(",");

                                            var link276 = data.find("form#link276");
                                            link276.find("input[name='KEY-SUGBAKA']").val(dataFunc[0].replace(/'/g, ""));
                                            link276.find("input[name='I-MIS-ISKA']").val(dataFunc[1].replace(/'/g, ""));
                                            var url = "https://" + all.banks.accounts.fibi.urlServices + "/MatafServiceServlets/ReadMailServlet?";
                                            url += link276.serialize() + '&passMispar=' + dataFunc[1].replace(/'/g, "");
                                            depositTransferData = url;

                                        }
                                    }
                                    all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.push({
                                        "Asmachta": $(v).find('td').eq(6).text().replace(/\s/g, "").replace(/,/g, ''),
                                        "TransDesc": $(v).find('td').eq(4).text(),
                                        "ValueDate": all.banks.core.services.convertDateAll(fibi.convertDateLocal($(v).find('td.last').text().replace(/\s/g, "").replace(/,/g, ''))),
                                        "TransactionType": transactionType,
                                        "TransTotal": sum.replace(/,/g, ''),
                                        "Balance": balance,
                                        "IsDaily": "0",
                                        "imgs": null,
                                        "DepositeTransferData": depositTransferData
                                    });
                                }
                            })

                            if (data.find("[name='NextPrev'] ").find("table .page_link.no_print.nosave").attr('href') !== undefined) {
                                myEmitterLogs(31);
                                fibi.loadOshMatah(data, 1);
                            } else {
                                if (all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.length) {
                                    $.when(fibi.loadHaavaraMatah())
                                        .then(function (status) {
                                            if (numSubAcc > fibi.ddASubAccMatah + 1) {
                                                fibi.ddASubAccMatah++;
                                                fibi.loadMatah(true);
                                            } else {
                                                all.banks.accounts.fibi.ind = all.banks.accounts.fibi.ind + 1;
                                                all.banks.accounts.fibi.ddAccAshrai = 0;
                                                fibi.ddASubAccMatah = 0;
                                                fibi.loadMatah();
                                                data = null;
                                            }
                                        });
                                } else {
                                    if (numSubAcc > fibi.ddASubAccMatah + 1) {
                                        fibi.ddASubAccMatah++;
                                        fibi.loadMatah(true);
                                    } else {
                                        all.banks.accounts.fibi.ind = all.banks.accounts.fibi.ind + 1;
                                        all.banks.accounts.fibi.ddAccAshrai = 0;
                                        fibi.ddASubAccMatah = 0;
                                        fibi.loadMatah();
                                        data = null;
                                    }
                                }
                            }
                        } else {
                            if (numSubAcc > fibi.ddASubAccMatah + 1) {
                                fibi.ddASubAccMatah++;
                                fibi.loadMatah(true);
                            } else {
                                all.banks.accounts.fibi.ind = all.banks.accounts.fibi.ind + 1;
                                all.banks.accounts.fibi.ddAccAshrai = 0;
                                fibi.ddASubAccMatah = 0;
                                fibi.loadMatah();
                                data = null;
                            }
                        }
                    }
                })
                .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                    fibi.loadOshMatah(data, nextPage);
                }));
        } else {
            if (numSubAcc > fibi.ddASubAccMatah + 1) {
                fibi.ddASubAccMatah++;
                fibi.loadMatah(true);
            } else {
                all.banks.accounts.fibi.ind = all.banks.accounts.fibi.ind + 1;
                all.banks.accounts.fibi.ddAccAshrai = 0;
                fibi.ddASubAccMatah = 0;
                fibi.loadMatah();
                data = null;
            }
        }
    }
    fibi.loadHaavaraMatah = function () {
        var dfd = jQuery.Deferred();
        var count = 0;

        function loadRowsHaavara() {
            $(all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow).each(function (i, v) {
                if (count == i) {
                    if (v.DepositeTransferData !== null && Object.prototype.toString.call(v.DepositeTransferData) !== '[object Array]') {
                        all.banks.core.services.httpReq(v.DepositeTransferData, 'GET', null, false, false)
                            .then(function (res, bbb, ccc) {
                                var expires = ccc.getResponseHeader("Expires");
                                if (expires === 0 || expires === "0") {
                                    fibi.loginMiddleOnWork(function () {
                                        loadRowsHaavara();
                                    });
                                } else {
                                    count++;
                                    try {
                                        var res = all.banks.core.services.parseHtml(res);
                                        if (res.find('#mymsgdiv').length) {
                                            v.DepositeTransferData = null;
                                            loadRowsHaavara();
                                        } else {
                                            var arr = [];
                                            if (res.find('.containertable tbody tr').length) {
                                                var vals = '';
                                                res.find('.containertable tbody tr').each(function (i1, v1) {
                                                    vals += ($(v1).find('td').eq(0).text().trim())
                                                    if (res.find('.containertable tbody tr').length > i1) {
                                                        vals += ','
                                                    }
                                                    if (i1 + 1 == res.find('.containertable tbody tr').length) {
                                                        try {
                                                            arr.push({
                                                                "DepositeTransferDate": v.ValueDate,
                                                                "BankTransferNumber": '',
                                                                "BranchTransferNumber": '',
                                                                "AccountTransferNumber": '',
                                                                "NamePayerTransfer": '',
                                                                "DetailsTransfer": vals.slice(0, 4000),
                                                                "TransferTotal": v.TransTotal
                                                            });
                                                            v.DepositeTransferData = arr;
                                                            loadRowsHaavara();
                                                        } catch (e) {
                                                            v.DepositeTransferData = null;
                                                            loadRowsHaavara();
                                                        }

                                                    }
                                                })
                                            } else {
                                                v.DepositeTransferData = null;
                                                loadRowsHaavara();
                                            }

                                            if (all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.length == i + 1) {
                                                dfd.resolve(true)
                                            }
                                            return false;
                                        }

                                    } catch (err) {
                                        all.banks.core.services.errorLog(err)
                                    }
                                }
                            })
                            .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                                loadRowsHaavara();
                            }));

                        return false;
                    } else {
                        count++;
                    }

                    if (all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.length == i + 1) {
                        dfd.resolve(true)
                    }

                }
            })
        }

        loadRowsHaavara();

        return dfd.promise();
    };
    fibi.logOff = function () {
        var minusLength = 1,
            indAccOptionFirstNull = 0;
        var optionFirst = $(all.banks.accounts.fibi.selectCompany).find('option').eq(0).val();
        if (optionFirst == "" || optionFirst == undefined) {
            minusLength = 2;
            indAccOptionFirstNull = 1;
        }

        if (all.banks.accounts.fibi.selectCompany.length && all.banks.accounts.fibi.selectCompany.val() !== undefined && (($(all.banks.accounts.fibi.selectCompany).find('option').length - minusLength) > all.banks.accounts.fibi.indCompany)) {
            all.banks.accounts.fibi.indCompany = all.banks.accounts.fibi.indCompany + 1;
            fibi.ind = 0;
            fibi.ddAccAshrai = 0;
//			var acc = {
//				'PortletForm_ACTION_NAME': 'changeAccount',
//				'portal_current_account': $(all.banks.accounts.fibi.selectCompany).find('option').eq(all.banks.accounts.fibi.indCompany + indAccOptionFirstNull).val(),
//				'portal_company_tz': ''
//			}
            all.banks.core.services.httpReq("https://" + all.banks.accounts.fibi.urlServices + "/wps/myportal/FibiMenu/Online/OnAccountMngment/OnBalanceTrans/PrivateAccountFlow", 'GET', null, false, false)
                .then(fibi.initializeGlobals)
                .then(fibi.restoreCompanySelection)
                .then(fibi.restoreAccountSelection)
                .then(function (res) {
                    all.banks.generalVariables.allDataArr = {
                        "BankData": [
                            {
                                "TargetId": all.banks.accountDetails.bank.targetId,
                                "Token": all.banks.accountDetails.bank.token,
                                "BankNumber": fibi.BankNumber,
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

                    if (all.banks.accountDetails.days > 0) {
                        fibi.days = true;
                        fibi.cards = false;
                        fibi.nilvim = false;
                        all.banks.accounts.fibi.getUrlPostOsh()
                    } else if (all.banks.accountDetails.ccardMonth > 0) {
                        fibi.days = false;
                        fibi.cards = true;
                        fibi.nilvim = false;
                        all.banks.accounts.fibi.loadPrivateAccountFlow()
                    } else if (all.banks.accountDetails.IND_NILVIM > 0) {
                        fibi.days = false;
                        fibi.cards = false;
                        fibi.nilvim = true;
                        all.banks.accounts.fibi.loadPrivateAccountFlow()
                    } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                        fibi.days = false;
                        fibi.cards = false;
                        fibi.nilvim = false;
                        fibi.matah = true;
                        myEmitterLogs(34);
                        all.banks.accounts.aibank.datebacksleshMatah = ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateFromMatah.getFullYear().toString();
                        all.banks.accounts.aibank.datebacksleshToMatah = ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateToMatah.getFullYear().toString();
                        all.banks.accounts.fibi.loadPrivateAccountFlow()
                    }
                })
                .fail((error, resErr, urlParam) => fibi.redoOrFail(error, resErr, urlParam, () => {
                    all.banks.accounts.fibi.indCompany = all.banks.accounts.fibi.indCompany - 1;
                    fibi.logOff();
                }));
        } else {
            all.banks.core.services.httpReq(all.banks.accounts.fibi.logOutUrl, 'GET', null, false, false)
                .then(function (res) {
                    fibi.attemptNo = 1;
                    setTimeout(function () {
                        monitorVpn.killVpn(function () {
                            setTimeout(function () {
                                myEmitterLogs(25);
                            }, 500);
                        });
                    }, 500);
                })
                .fail(function (error, resErr, urlParam) {
                    fibi.attemptNo = 1;
                    setTimeout(function () {
                        monitorVpn.killVpn(function () {
                            setTimeout(function () {
                                myEmitterLogs(25);
                            }, 500);
                        });
                    }, 500);
                });
        }
    };
    fibi.imageUrlUsing = function (query) {
        return query && !query.includes('fileName=info.pdf')
            ? 'https://' + all.banks.accounts.fibi.urlServices + '' + query
            : undefined;
    };
    fibi.redoOrFail = function (error, resErr, urlParam, cb) {
        if (error && error.status === 0 && fibi.attemptNo > 0) {
            writeLog(`Request failed (fibi family) ->  restUrl: ${urlParam}, status: ${error.status}. Change ip and redo.`)
            fibi.attemptNo--;
            if (cb) {
                fibi.changeIp(function () {
                    fibi.loginMiddleOnWork(cb);
                });
            } else {
                fibi.changeIp();
            }
        } else {
            all.banks.core.services.errorLog(` restUrl: ${urlParam}, status: ${error.status}`);
        }
    };
    fibi.initializeGlobals = function (res) {
        try {
            var resParsed = all.banks.core.services.parseHtml(res);
            if (parseInt(all.banks.accountDetails.bank.BankNumber) == 52 || parseInt(all.banks.accountDetails.bank.BankNumber) == 14) {
                all.banks.accounts.fibi.url = "https://" + all.banks.accounts.fibi.urlServices;
            } else {
                if (resParsed.find('head').find("base").length) {
                    all.banks.accounts.fibi.url = resParsed.find('head').find("base").attr("href");
                } else {
                    all.banks.accounts.fibi.url = "https://" + all.banks.accounts.fibi.urlServices;
                }
            }
            all.banks.accounts.fibi.refreshPortletForm = resParsed.find('#refreshPortletForm').attr('action');
            if (all.banks.accounts.fibi.refreshPortletForm === undefined) {
                all.banks.accounts.fibi.refreshPortletForm = resParsed.find('#LinkForm077').attr('action');
            }

            all.banks.accounts.fibi.selectAcc = resParsed.find('#account_num_select');
            if (fibi.isSetAccAndBranch) {
                var branch = $("#branch").val();
                var account = $("#account").val();
                all.banks.accounts.fibi.selectAcc.find('option').each((idx, child) => {
                    const label = child.text;
                    if (!label.includes(account)) {
                        $(child).remove()
                    }
                    // if (label !== (branch + "-" + account)) {
                    //     $(child).remove()
                    // }
                });
            } else {
                if (all.banks.accountDetails.deleted_account_ids.length) {
                    all.banks.accounts.fibi.selectAcc.find('option').each((idx, child) => {
                        const label = child.text;
                        if (all.banks.accountDetails.deleted_account_ids.some(it => label.includes(it.toString()))) {
                            $(child).remove()
                        }
                    });
                }
            }

            all.banks.accounts.fibi.selectCompany = resParsed.find('#company_num_select');

            return $.when(res);
        } catch (ex) {
            all.banks.core.services.errorLog(ex);
        }
    };
    fibi.restoreCompanySelection = function (res) {
        var dfd = jQuery.Deferred();

        if (!all.banks.accounts.fibi.selectCompany.length) {
            dfd.resolve(res);
        } else {
            try {
                var indCompOptionFirstNull = 0;
                var optionFirst = $(all.banks.accounts.fibi.selectCompany).find('option').eq(0).val();
                if (!optionFirst) {
                    indCompOptionFirstNull = 1;
                }
                if (all.banks.accounts.fibi.selectCompany.length
                    && all.banks.accounts.fibi.selectCompany.val() !== $(all.banks.accounts.fibi.selectCompany).find('option')
                        .eq(all.banks.accounts.fibi.indCompany + indCompOptionFirstNull).val()) {
//                        var acc = {
//                            'PortletForm_ACTION_NAME': 'changeAccount',
//                            'portal_current_account': $(all.banks.accounts.fibi.selectCompany)
//                                    .find('option').eq(all.banks.accounts.fibi.indCompany + indCompOptionFirstNull).val(),
//                            'portal_company_tz': ''
//                        };
                    var acc = {
                        'PortletForm_ACTION_NAME': 'changeCompanyTevel',
                        'portal_current_account': '',
                        'portal_company_tz': $(all.banks.accounts.fibi.selectCompany)
                            .find('option').eq(all.banks.accounts.fibi.indCompany + indCompOptionFirstNull).val()
                    };

                    all.banks.core.services.httpReq(all.banks.accounts.fibi.url + all.banks.accounts.fibi.refreshPortletForm, 'POST', acc, true, false)
                        .then(fibi.initializeGlobals)
                        .then(function (data) {
                            dfd.resolve(data);
                        });
                } else {
                    dfd.resolve(res);
                }
            } catch (ex) {
                all.banks.core.services.errorLog(ex);
                dfd.reject(ex);
            }
        }

        return dfd.promise();
    };
    fibi.restoreAccountSelection = function (res) {
        var dfd = jQuery.Deferred();

        try {
            var optionFirst = $(all.banks.accounts.fibi.selectAcc).find('option').eq(0).val();
            var minusLength = 1,
                indAccOptionFirstNull = 0;
            if (optionFirst == "") {
                minusLength = 2;
                indAccOptionFirstNull = 1;
            }
            if ((($(all.banks.accounts.fibi.selectAcc).find('option').length - minusLength) >= all.banks.accounts.fibi.ind)) {
                var acc = {
                    'PortletForm_ACTION_NAME': 'changeAccount',
                    'portal_current_account': $(all.banks.accounts.fibi.selectAcc).find('option')
                        .eq(all.banks.accounts.fibi.ddAccAshrai > 0 ? all.banks.accounts.fibi.ddAccAshrai : all.banks.accounts.fibi.ind
                            + indAccOptionFirstNull).val(),
                    'portal_current_bank': $(all.banks.accounts.fibi.selectAcc).find('option')
                        .eq(all.banks.accounts.fibi.ddAccAshrai > 0 ? all.banks.accounts.fibi.ddAccAshrai : all.banks.accounts.fibi.ind
                            + indAccOptionFirstNull).attr('data-bank'),
                    'portal_company_tz': ''
                };
                fibi.portal_current_account = acc.portal_current_account;
                fibi.portal_current_bank = acc.portal_current_bank;
//                all.banks.core.services.httpReq("https://" + all.banks.accounts.fibi.urlServices + "/wps/myportal/FibiMenu/Online/OnAccountMngment/OnBalanceTrans/PrivateAccountFlow", 'GET', null, false, false)
//                    .then(function (res) {
//                        var resParsed = all.banks.core.services.parseHtml(res);
//                        all.banks.accounts.fibi.refreshPortletForm = resParsed.find('#refreshPortletForm').attr('action');
//                        if (all.banks.accounts.fibi.refreshPortletForm === undefined) {
//                            all.banks.accounts.fibi.refreshPortletForm = resParsed.find('#LinkForm077').attr('action');
//                        }

                all.banks.core.services.httpReq(all.banks.accounts.fibi.url + all.banks.accounts.fibi.refreshPortletForm, 'POST', acc, true, false)
                    .then(fibi.initializeGlobals)
                    .then(function (data) {
                        dfd.resolve(data);
                    });
//                    });

            } else {
                dfd.resolve(res);
            }
        } catch (err) {
            all.banks.core.services.errorLog(err);
            dfd.reject(err);
        }

        return dfd.promise();
    };
    return fibi;
}();
