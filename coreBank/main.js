all.banks.core.main = function () {
    //to re-trigger pipeline
    //test1
    var main = {};
    main.loadConfig = function () {
        main.timeTosend = 0;
        main.TimeOut;
        clearTimeout(main.TimeOut);
        all.banks.spiderConfig.status = 'on';
        if (!all.banks.statusWorkUpdate && !all.banks.statusWorkFromRest) {
            if (all.banks.spiderConfig.Ppoalim == true) {
                main.loadPoalimAsakim();
            } else {
                main.loadAllBanks();
            }
        }
    };
    main.loadAllBanks = function () {
        all.banks.core.main.timeTosend++;
        if (all.banks.core.main.timeTosend > 100 && (!all.banks.statusWorkUpdate && !all.banks.statusWorkFromRest)) {
            all.banks.core.services.reloadPage();
            return;
        }
        if (!all.banks.statusWorkUpdate && !all.banks.statusWorkFromRest) {
            var data = {
                spiderId: all.banks.spiderConfig.spiderId,
                workTime: (all.banks.spiderConfig.isISO == undefined) ? all.banks.spiderConfig.time_to_send : 333,
                sendToServer: all.banks.spiderConfig.sendToServer,
                versionNum: pkg.version
            };
            all.banks.core.services.loadBanksAll(data)
                .then(function (response) {
                    if (all.banks.spiderConfig.runPoalimAsakimParallel) {
                        all.banks.accounts.poalimAsakimNew.numberOfOperations = parseFloat(all.banks.spiderConfig.poalimBizThreadNum);
                        all.banks.accounts.poalimAsakimNew.numberOfOperationsChecks = parseFloat(all.banks.spiderConfig.poalimBizCheckThreadNum);
                        all.banks.accounts.poalimAsakimNew.numOfAccForRenewLogin = parseFloat(all.banks.spiderConfig.numOfAccForRenewLogin);
                        all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginOsh = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginOsh);
                        all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginCards = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginCards);
                        all.banks.accounts.poalimAsakimNew.numberOfOperationsCards = parseFloat(all.banks.spiderConfig.numberOfOperationsCards);
                        all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginMatah = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginMatah);
                        all.banks.accounts.poalimAsakimNew.numberOfOperationsMatah = parseFloat(all.banks.spiderConfig.numberOfOperationsMatah);
                        all.banks.accounts.poalimAsakimNew.numberOfOperationsNilvim = parseFloat(all.banks.spiderConfig.numberOfOperationsNilvim);
                        all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginNilvim = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginNilvim);
                    }
                    if ((typeof response == 'object') && response.length > 0) {
                        var data = response[0];
                        if (data.api_url !== undefined && data.api_url !== null) {
                            all.banks.spiderConfig.sendToServerApi = data.api_url;
                        }
                        if (data.AccountsToIgnore !== undefined && data.AccountsToIgnore !== null && data.AccountsToIgnore.deleted_account_ids !== undefined && data.AccountsToIgnore.deleted_account_ids.length) {
                            all.banks.accountDetails.deleted_account_ids = data.AccountsToIgnore.deleted_account_ids;
                        } else {
                            all.banks.accountDetails.deleted_account_ids = [];
                        }
                        if (data.checkpic_load_days == 0) {
                            all.banks.accountDetails.checks = false;
                        } else {
                            all.banks.accountDetails.checks = true;
                        }
                        all.banks.accountDetails.isCategory = false;
                        all.banks.accountDetails.days = data.account_load_days;
//					if ((data.BankNumber == 158 || data.BankNumber == 157) && all.banks.accountDetails.days > 179) {
//						all.banks.accountDetails.days = 179;
//					}
                        all.banks.accountDetails.dateFrom = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - all.banks.accountDetails.days);
                        if (data.date_till !== undefined && data.date_till !== null) {
                            var dateSplits = data.date_till.split('/');
                            all.banks.accountDetails.dateTo = new Date(parseFloat(dateSplits[2]), parseFloat(dateSplits[1]) - 1, parseFloat(dateSplits[0]));
                        } else {
                            all.banks.accountDetails.dateTo = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                        }
                        all.banks.accountDetails.IND_NILVIM = data.ind_load_nilvim;
                        all.banks.accountDetails.ccardMonth = data.ccard_load_months;
                        all.banks.accountDetails.MATAH_DAY_TO_RUN = data.run_type_to_do;
                        all.banks.accountDetails.dateFromMatah = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - all.banks.accountDetails.MATAH_DAY_TO_RUN);
                        all.banks.accountDetails.dateToMatah = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                        all.banks.accounts.IND_CHECKS_TO_S3 = data.ind_checks_to_s3;

                        if (data.Password) {
                            all.banks.accountDetails.bank = {
                                BankNumber: data.BankNumber,
                                targetId: data.AccountNumber,
                                token: data.Branch,
                                username: data.UserName,
                                password: plainify(data.Password),
                                autoCode: data.AuthUserId,
                                ExtractDate: new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2)
                            };
                            all.banks.generalVariables.AccountNumber = all.banks.accountDetails.bank.targetId;
                            all.banks.generalVariables.bankNumber = all.banks.accountDetails.bank.BankNumber;
                            all.banks.generalVariables.branchNumber = all.banks.accountDetails.bank.token;
                            all.banks.generalVariables.ExtractDate = all.banks.accountDetails.bank.ExtractDate;
                            all.banks.generalVariables.isPoalimAsakim = false;
                            all.banks.accountDetails.ccardMonth = parseFloat(all.banks.accountDetails.ccardMonth);
                            if (all.banks.accountDetails.ccardMonth !== 0 && all.banks.accountDetails.ccardMonth !== 1) {
                                var bankNum = parseFloat(all.banks.accountDetails.bank.BankNumber);
                                all.banks.accountDetails.ccardMonth = all.banks.core.services.setMonthOfCards(bankNum, all.banks.accountDetails.ccardMonth);
                            } else if (all.banks.accountDetails.ccardMonth == 1) {
                                all.banks.accountDetails.ccardMonth = 3;
                            }
                            writeLog('gettokenlist_work_json: ', JSON.stringify(all.banks.accountDetails));

                            if (!all.banks.exit) {
                                main.goToBank();
                            }
                        } else {
                            myEmitterLogs(9, " אין פרטי כניסה");
                        }
                    } else {
                        if (all.banks.spiderConfig.Ppoalim == true) {
                            all.banks.core.main.TimeOut = setTimeout(function () {
                                clearTimeout(all.banks.core.main.TimeOut);
                                if (!all.banks.exit) {
                                    main.loadPoalimAsakim()
                                }
                            }, all.banks.spiderConfig.time_to_send * 1000)
                        } else {
                            all.banks.core.main.TimeOut = setTimeout(function () {
                                clearTimeout(all.banks.core.main.TimeOut);
                                if (!all.banks.exit) {
                                    main.loadAllBanks()
                                }
                            }, all.banks.spiderConfig.time_to_send * 1000)
                        }
                    }
                })
                .fail(function (error) {
                    all.banks.core.main.TimeOut = setTimeout(function () {
                        clearTimeout(all.banks.core.main.TimeOut);
                        if (!all.banks.exit) {
                            main.loadAllBanks()
                        }
                    }, all.banks.spiderConfig.time_to_send * 1000)
                })
        }
    };
    main.loadPoalimAsakim = function () {
        all.banks.core.main.timeTosend++;
        if (all.banks.core.main.timeTosend > 100 && (!all.banks.statusWorkUpdate && !all.banks.statusWorkFromRest)) {
            all.banks.core.services.reloadPage();
            return;
        }
        if (!all.banks.statusWorkUpdate && !all.banks.statusWorkFromRest) {
            var data = {
                spiderId: all.banks.spiderConfig.spiderId,
                workTime: (all.banks.spiderConfig.isISO === undefined) ? all.banks.spiderConfig.time_to_send : 333,
                sendToServer: all.banks.spiderConfig.sendToServer,
                versionNum: pkg.version
            };
            all.banks.core.services.loadPoalimAsakim(data)
                .then(function (response) {
                    if (all.banks.spiderConfig.runPoalimAsakimParallel) {
                        all.banks.accounts.poalimAsakimNew.numberOfOperations = parseFloat(all.banks.spiderConfig.poalimBizThreadNum);
                        all.banks.accounts.poalimAsakimNew.numberOfOperationsChecks = parseFloat(all.banks.spiderConfig.poalimBizCheckThreadNum);
                        all.banks.accounts.poalimAsakimNew.numOfAccForRenewLogin = parseFloat(all.banks.spiderConfig.numOfAccForRenewLogin);
                        all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginOsh = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginOsh);
                        all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginCards = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginCards);
                        all.banks.accounts.poalimAsakimNew.numberOfOperationsCards = parseFloat(all.banks.spiderConfig.numberOfOperationsCards);
                        all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginMatah = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginMatah);
                        all.banks.accounts.poalimAsakimNew.numberOfOperationsMatah = parseFloat(all.banks.spiderConfig.numberOfOperationsMatah);
                        all.banks.accounts.poalimAsakimNew.numberOfOperationsNilvim = parseFloat(all.banks.spiderConfig.numberOfOperationsNilvim);
                        all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginNilvim = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginNilvim);
                    }
                    if (response == -1) {
                        all.banks.core.services.reloadPage();
                    } else if (response == 999) {
                        if (!all.banks.exit) {
                            main.loadAllBanks();
                        }
                    } else {
                        all.banks.accountDetails.run_type = response;
                        all.banks.core.main.TimeOut = setTimeout(function () {
                            clearTimeout(all.banks.core.main.TimeOut);
                            //main.loadAllBanks();
                            if (!all.banks.exit) {
                                main.loadPoalimAsakim();
                            }
                        }, all.banks.spiderConfig.time_to_send * 1000)
                        // if (response > 0) {
                        //     var ifarmeSetInterval = setInterval(function () {
                        //         if (typeof (window.frames[0].callCheckIsMnkReady) == "function") {
                        //             clearInterval(ifarmeSetInterval);
                        //             window.frames[0].callCheckIsMnkReady(function (result) {
                        //                 if (result == "0") {
                        //                     all.banks.accountDetails.bank = {
                        //                         BankNumber: 12,
                        //                         targetId: all.banks.spiderConfig.Ptarget_id,
                        //                         token: all.banks.spiderConfig.Ptoken,
                        //                         password: all.banks.spiderConfig.Ppass,
                        //                         ExtractDate: new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2)
                        //                     };
                        //                     all.banks.accountDetails.isCategory = false;
                        //                     all.banks.generalVariables.AccountNumber = all.banks.spiderConfig.Ptarget_id;
                        //                     all.banks.generalVariables.bankNumber = 12;
                        //                     all.banks.generalVariables.branchNumber = all.banks.spiderConfig.Ptoken;
                        //                     all.banks.generalVariables.ExtractDate = all.banks.accountDetails.bank.ExtractDate;
                        //                     all.banks.generalVariables.isPoalimAsakim = true;
                        //                     if (!all.banks.exit) {
                        //                         main.goToBank();
                        //                     }
                        //                 } else {
                        //                     all.banks.accountDetails.bank = {
                        //                         BankNumber: 12,
                        //                         targetId: all.banks.spiderConfig.Ptarget_id,
                        //                         token: all.banks.spiderConfig.Ptoken,
                        //                         password: all.banks.spiderConfig.Ppass,
                        //                         ExtractDate: new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2)
                        //                     };
                        //                     all.banks.accountDetails.isCategory = false;
                        //                     all.banks.generalVariables.AccountNumber = all.banks.spiderConfig.Ptarget_id;
                        //                     all.banks.generalVariables.bankNumber = 12;
                        //                     all.banks.generalVariables.branchNumber = all.banks.spiderConfig.Ptoken;
                        //                     all.banks.generalVariables.ExtractDate = all.banks.accountDetails.bank.ExtractDate;
                        //                     myEmitterLogs(27);
                        //                     all.banks.core.main.TimeOut = setTimeout(function () {
                        //                         clearTimeout(all.banks.core.main.TimeOut);
                        //                         if (!all.banks.exit) {
                        //                             main.loadPoalimAsakim()
                        //                         }
                        //                     }, all.banks.spiderConfig.time_to_send * 1000)
                        //                 }
                        //             });
                        //         } else {
                        //             $('#filecontainerlogin').attr('src', 'https://biz.bankhapoalim.co.il/cgi-bin/poalwwwc');
                        //         }
                        //     }, 5000);
                        // } else {
                        //     all.banks.core.main.TimeOut = setTimeout(function () {
                        //         clearTimeout(all.banks.core.main.TimeOut);
                        //         //main.loadAllBanks();
                        //         if (!all.banks.exit) {
                        //             main.loadPoalimAsakim();
                        //         }
                        //     }, all.banks.spiderConfig.time_to_send * 1000)
                        // }
                    }
                })
                .fail(function (error) {
                    all.banks.core.main.TimeOut = setTimeout(function () {
                        clearTimeout(all.banks.core.main.TimeOut);
                        if (!all.banks.exit) {
                            main.loadPoalimAsakim()
                        }
                    }, all.banks.spiderConfig.time_to_send * 1000)
                })
        }
    };

    main.changeIpV4 = function (change) {
        return new Promise((resolve, reject) => {
            // if(window.navigator.platform.indexOf('Win') === -1 && (all.banks.accountDetails.deleted_account_ids.length && all.banks.accountDetails.deleted_account_ids[0].toString() === '111111111')){
            //     setProxy().then(() => {
            //         resolve(true);
            //     })
            // }else{
            //
            // }
            if (all.banks.spiderConfig.changeIp !== undefined) {
                if (all.banks.spiderConfig.changeIp === true) {
                    monitorVpn.checkVpnTime(change, function isFinishVpn(res) {
                        if (res) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    });
                } else {
                    resolve(false);
                }
            } else {
                resolve(false);
            }
        });
    }

    main.goToBank = function () {
        if (!all.banks.statusWorkUpdate) {
            all.banks.statusWorkFromRest = true;
            window.all.banks.vpnConnected = false;
            $(".loader").show();
            win.setBadgeLabel(" progress ");
            win.setProgressBar(50);
            // console.log(JSON.stringify(all.banks.accountDetails))
            // console.log(all.banks.accountDetails.bank);
            // debugger
            if (!all.banks.generalVariables.isPoalimAsakim && !all.banks.openBankPage) {
                myEmitterLogs(1);
            }
            all.banks.spiderConfig.status = 'process';
            all.banks.core.services.removingCookie(false, function () {
                document.cookie = '';
                nw.App.clearCache();

                if (!all.banks.openBankPage && !main.hasValidWorkplan()) {
                    myEmitterLogs(9, " נתוני הרצה שגויים: "
                        + " Bank number " + all.banks.accountDetails.bank.BankNumber
                        + " Running type: Days to run: " + all.banks.accountDetails.days
                        + " Checks: " + all.banks.accountDetails.checks
                        + " Credit card: " + all.banks.accountDetails.ccardMonth
                        + " Nilvim: " + all.banks.accountDetails.IND_NILVIM
                        + " Matach: " + all.banks.accountDetails.MATAH_DAY_TO_RUN
                        + " token to run: " + all.banks.accountDetails.bank.token.replace(/-/g, '').toUpperCase());
                    return;
                }
                all.banks.core.services.loadTokensFromConfig()
                    .then(function (response) {
                        if (response) {
                            const tokens = response.split(',').map((it) => it.replace(/\s/g, "").replace(/-/g, '').toUpperCase());
                            all.banks.core.services.runByDays = tokens.includes(all.banks.accountDetails.bank.token.replace(/-/g, '').toUpperCase())
                        }
                        login()
                    })
                    .fail(function (error) {
                        all.banks.core.services.runByDays = false;
                        login()
                    })

                function login() {
                    // all.banks.accounts.IND_CHECKS_TO_S3 = 1;
                    // console.log('SendToAmazon: ', all.banks.accounts.IND_CHECKS_TO_S3 === 1)
                    myEmitterLogs('SendToAmazon: ' + (all.banks.accounts.IND_CHECKS_TO_S3 === 1));
                    all.banks.spiderConfig.sendToServerAWS = 'etl.bizibox.biz';
                    if (all.banks.spiderConfig.sendToServer.includes('adm-pre.bizibox.biz') || all.banks.spiderConfig.sendToServer.includes('secure-dev.bizibox.biz')) {
                        all.banks.spiderConfig.sendToServerAWS = 'dev-etl.bizibox.biz';
                    } else if (all.banks.spiderConfig.sendToServer.includes('aws-secure-stg.bizibox.biz') || all.banks.spiderConfig.sendToServer.includes('aws-stg-adm.bizibox.biz')) {
                        all.banks.spiderConfig.sendToServerAWS = 'etl-stage.bizibox.biz';
                    }
                    if (all.banks.accounts.IND_CHECKS_TO_S3 === 1) {
                        all.banks.core.services.loginAWS()
                            .then(function (response) {
                                nextRunData()
                            })
                            .fail(function (error) {
                                all.banks.core.services.runByDays = false;
                                nextRunData()
                            })
                    } else {
                        nextRunData()
                    }
                }

                function nextRunData() {
                    if (parseFloat(all.banks.accountDetails.bank.BankNumber) === 57) {
                        all.banks.accountDetails.bank.BankNumber = 157;
                    }
                    switch (parseFloat(all.banks.accountDetails.bank.BankNumber)) {
                        case 31:
                        case 46:
                        case 52:
                        case 126:
                        case 14:
                            main.changeIpV4('israel').then(function () {
                                all.banks.accounts.fibi.login();
                            });
                            break;

                        case 11:
                        case 17:
                            main.changeIpV4(false).then(function () {
                                all.banks.accounts.discuont.login();
                            });
                            break;


                        case 12:
                            if (all.banks.generalVariables.isPoalimAsakim) {
                                all.banks.accounts.poalimAsakimNew.numberOfOperations = parseFloat(all.banks.spiderConfig.poalimBizThreadNum);
                                all.banks.accounts.poalimAsakimNew.numberOfOperationsChecks = parseFloat(all.banks.spiderConfig.poalimBizCheckThreadNum);
                                all.banks.accounts.poalimAsakimNew.numOfAccForRenewLogin = parseFloat(all.banks.spiderConfig.numOfAccForRenewLogin);
                                all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginOsh = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginOsh);
                                all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginCards = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginCards);
                                all.banks.accounts.poalimAsakimNew.numberOfOperationsCards = parseFloat(all.banks.spiderConfig.numberOfOperationsCards);
                                all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginMatah = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginMatah);
                                all.banks.accounts.poalimAsakimNew.numberOfOperationsMatah = parseFloat(all.banks.spiderConfig.numberOfOperationsMatah);
                                all.banks.accounts.poalimAsakimNew.numberOfOperationsNilvim = parseFloat(all.banks.spiderConfig.numberOfOperationsNilvim);
                                all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginNilvim = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginNilvim);
                                main.changeIpV4(false).then(function () {
                                    window.all.banks.vpnConnected = true;
                                    all.banks.accounts.poalimAsakimNew.login();
                                });
                                // if ((all.banks.accounts.poalimAsakimNew.numberOfOperations !== 0 && all.banks.spiderConfig.runPoalimAsakimParallel)
                                //     ||
                                //     (all.banks.accountDetails.deleted_account_ids.length && all.banks.accountDetails.deleted_account_ids[0].toString() === '123')
                                // ) {
                                //
                                //     // if (window.navigator.platform.indexOf('Win') === -1 && !all.banks.openBankPage) {
                                //     //     $.get("https://lumtest.com/myip")
                                //     //         .done(function (ipAddrress) {
                                //     //             ipAddrress = ipAddrress.replace(/\s/g, "");
                                //     //             request({
                                //     //                 uri: 'https://api.brightdata.com/zone/whitelist',
                                //     //                 method: "POST",
                                //     //                 body: {'zone': 'residential', 'ip': ipAddrress},
                                //     //                 json: true,
                                //     //                 headers: {'Authorization': 'Bearer 959bcce2-a1e9-466c-b4b8-eb1d06cdcf4f'}
                                //     //             }, (error, response, data) => {
                                //     //                 request({
                                //     //                     uri: "https://lumtest.com/myip",
                                //     //                     family: 4,
                                //     //                     method: 'GET',
                                //     //                     timeout: 40000000,
                                //     //                     'proxy': 'http://brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob' + all.banks.accountDetails.bank.token.replace(/-/g, '') + ':h0mi0yvib3to@zproxy.lum-superproxy.io:22225',
                                //     //                     headers: {
                                //     //                         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
                                //     //                     }
                                //     //                 }, function (error, response, body) {
                                //     //                     if (body && typeof body === 'string') {
                                //     //                         all.banks.accounts.poalimAsakimNew.IpAddress = body.replace(/\s/g, "")
                                //     //                         all.banks.accounts.poalimAsakimNew.login();
                                //     //                     }
                                //     //                 })
                                //     //                 all.banks.accounts.poalimAsakimNew.intervalXHRKeepProxySession = setInterval(() => {
                                //     //                     request({
                                //     //                         uri: "https://lumtest.com/myip",
                                //     //                         family: 4,
                                //     //                         method: 'GET',
                                //     //                         timeout: 40000000,
                                //     //                         proxy: 'http://brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob' + all.banks.accountDetails.bank.token.replace(/-/g, '') + ':h0mi0yvib3to@zproxy.lum-superproxy.io:22225',
                                //     //                         headers: {
                                //     //                             'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
                                //     //                         }
                                //     //                     }, function (error, response, body) {
                                //     //                         if (body && typeof body === 'string') {
                                //     //                             if (all.banks.accounts.poalimAsakimNew.IpAddress !== body.replace(/\s/g, "")) {
                                //     //                                 myEmitterLogs(9, '---Proxy ip changed!! now is:' + body.replace(/\s/g, "") + ' --- before:' + all.banks.accounts.poalimAsakimNew.IpAddress);
                                //     //                             }
                                //     //                             writeLog('---ipAfterServerTestProxy prevent 30 sec: ' + body.replace(/\s/g, ""));
                                //     //                         }
                                //     //                     })
                                //     //                 }, 5000)
                                //     //             });
                                //     //         })
                                //     //     // writeLog('---Set Proxy----');
                                //     //     // setProxy().then((suc) => {
                                //     //     //     if(suc){
                                //     //     //         all.banks.accounts.poalimAsakimNew.intervalXHRKeepProxySession = setInterval(() => {
                                //     //     //             request({
                                //     //     //                 uri: "https://icanhazip.com",
                                //     //     //                 family: 4,
                                //     //     //                 method: 'GET',
                                //     //     //                 timeout: 40000000,
                                //     //     //                 'proxy': ('http://brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob' + all.banks.accountDetails.bank.token.replace(/-/g, '') + ':h0mi0yvib3to@zproxy.lum-superproxy.io:22225'),
                                //     //     //                 headers: {
                                //     //     //                     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
                                //     //     //                 }
                                //     //     //             }, function (error, response, body) {
                                //     //     //                 if (body && typeof body === 'string') {
                                //     //     //                     writeLog('---ipAfterServerTestProxy prevent 30 sec: ' + body.replace(/\s/g, ""));
                                //     //     //                 }
                                //     //     //             })
                                //     //     //         }, 15000)
                                //     //     //         all.banks.accounts.poalimAsakimNew.login();
                                //     //     //     }else{
                                //     //     //         main.changeIpV4(false).then(function () {
                                //     //     //             window.all.banks.vpnConnected = true;
                                //     //     //             all.banks.accounts.poalimAsakimNew.login();
                                //     //     //         });
                                //     //     //     }
                                //     //     // })
                                //     // } else {
                                //     //     all.banks.accounts.poalimAsakimNew.login();
                                //     // }
                                //
                                // } else {
                                //     // if (window.navigator.platform.indexOf('Win') === -1 && !all.banks.openBankPage) {
                                //     //     writeLog('---Set Proxy----');
                                //     //     setProxy().then((suc) => {
                                //     //         if (suc) {
                                //     //             all.banks.accounts.poalimAsakim.login();
                                //     //         } else {
                                //     //             main.changeIpV4(false).then(function () {
                                //     //                 window.all.banks.vpnConnected = true;
                                //     //                 all.banks.accounts.poalimAsakim.login();
                                //     //             });
                                //     //         }
                                //     //     })
                                //     // } else {
                                //     //     all.banks.accounts.poalimAsakim.login();
                                //     // }
                                //
                                //     main.changeIpV4(false).then(function () {
                                //         window.all.banks.vpnConnected = true;
                                //         all.banks.accounts.poalimAsakim.login();
                                //     });
                                //     // main.changeIpV4(false).then(function () {
                                //     //     all.banks.accounts.poalimAsakim.login();
                                //     // });
                                // }
                            } else {
                                all.banks.accounts.hapoalim.login();
                            }
                            break;

                        case 122:
                        case 123:
                        case 124:
                            all.banks.accounts.poalimAsakimNew.numberOfOperations = parseFloat(all.banks.spiderConfig.poalimBizThreadNum);
                            all.banks.accounts.poalimAsakimNew.numberOfOperationsChecks = parseFloat(all.banks.spiderConfig.poalimBizCheckThreadNum);
                            all.banks.accounts.poalimAsakimNew.numOfAccForRenewLogin = parseFloat(all.banks.spiderConfig.numOfAccForRenewLogin);
                            all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginOsh = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginOsh);
                            all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginCards = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginCards);
                            all.banks.accounts.poalimAsakimNew.numberOfOperationsCards = parseFloat(all.banks.spiderConfig.numberOfOperationsCards);
                            all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginMatah = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginMatah);
                            all.banks.accounts.poalimAsakimNew.numberOfOperationsMatah = parseFloat(all.banks.spiderConfig.numberOfOperationsMatah);
                            all.banks.accounts.poalimAsakimNew.numberOfOperationsNilvim = parseFloat(all.banks.spiderConfig.numberOfOperationsNilvim);
                            all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginNilvim = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginNilvim);
                            main.changeIpV4(false).then(function () {
                                window.all.banks.vpnConnected = true;
                                all.banks.accounts.poalimAsakimNew.login();
                            });
                            // if ((all.banks.accounts.poalimAsakimNew.numberOfOperations !== 0 && all.banks.spiderConfig.runPoalimAsakimParallel)
                            //     ||
                            //     (all.banks.accountDetails.deleted_account_ids.length && all.banks.accountDetails.deleted_account_ids[0].toString() === '123')
                            // ) {
                            //     all.banks.accounts.poalimAsakimNew.numberOfOperations = parseFloat(all.banks.spiderConfig.poalimBizThreadNum);
                            //     all.banks.accounts.poalimAsakimNew.numberOfOperationsChecks = parseFloat(all.banks.spiderConfig.poalimBizCheckThreadNum);
                            //     all.banks.accounts.poalimAsakimNew.numOfAccForRenewLogin = parseFloat(all.banks.spiderConfig.numOfAccForRenewLogin);
                            //     all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginOsh = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginOsh);
                            //     all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginCards = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginCards);
                            //     all.banks.accounts.poalimAsakimNew.numberOfOperationsCards = parseFloat(all.banks.spiderConfig.numberOfOperationsCards);
                            //     all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginMatah = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginMatah);
                            //     all.banks.accounts.poalimAsakimNew.numberOfOperationsMatah = parseFloat(all.banks.spiderConfig.numberOfOperationsMatah);
                            //     all.banks.accounts.poalimAsakimNew.numberOfOperationsNilvim = parseFloat(all.banks.spiderConfig.numberOfOperationsNilvim);
                            //     all.banks.accounts.poalimAsakimNew.numOfAccForRenewLoginNilvim = parseFloat(all.banks.spiderConfig.numOfAccForRenewLoginNilvim);
                            //     // main.changeIpV4(false).then(function () {
                            //     //     all.banks.accounts.poalimAsakimNew.login();
                            //     // });
                            //
                            //     main.changeIpV4(false).then(function () {
                            //         window.all.banks.vpnConnected = true;
                            //         all.banks.accounts.poalimAsakimNew.login();
                            //     });
                            //     // if (window.navigator.platform.indexOf('Win') === -1 && !all.banks.openBankPage) {
                            //     //     $.get("https://lumtest.com/myip")
                            //     //         .done(function (ipAddrress) {
                            //     //             ipAddrress = ipAddrress.replace(/\s/g, "");
                            //     //             request({
                            //     //                 uri: 'https://api.brightdata.com/zone/whitelist',
                            //     //                 method: "POST",
                            //     //                 body: {'zone': 'residential', 'ip': ipAddrress},
                            //     //                 json: true,
                            //     //                 headers: {'Authorization': 'Bearer 959bcce2-a1e9-466c-b4b8-eb1d06cdcf4f'}
                            //     //             }, (error, response, data) => {
                            //     //                 request({
                            //     //                     uri: "https://lumtest.com/myip",
                            //     //                     family: 4,
                            //     //                     method: 'GET',
                            //     //                     timeout: 40000000,
                            //     //                     'proxy': 'http://brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob' + all.banks.accountDetails.bank.token.replace(/-/g, '') + ':h0mi0yvib3to@zproxy.lum-superproxy.io:22225',
                            //     //                     headers: {
                            //     //                         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
                            //     //                     }
                            //     //                 }, function (error, response, body) {
                            //     //                     if (body && typeof body === 'string') {
                            //     //                         all.banks.accounts.poalimAsakimNew.IpAddress = body.replace(/\s/g, "")
                            //     //                         all.banks.accounts.poalimAsakimNew.login();
                            //     //                     }
                            //     //                 })
                            //     //                 all.banks.accounts.poalimAsakimNew.intervalXHRKeepProxySession = setInterval(() => {
                            //     //                     request({
                            //     //                         uri: "https://lumtest.com/myip",
                            //     //                         family: 4,
                            //     //                         method: 'GET',
                            //     //                         timeout: 40000000,
                            //     //                         'proxy': 'http://brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob' + all.banks.accountDetails.bank.token.replace(/-/g, '') + ':h0mi0yvib3to@zproxy.lum-superproxy.io:22225',
                            //     //                         headers: {
                            //     //                             'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
                            //     //                         }
                            //     //                     }, function (error, response, body) {
                            //     //                         if (body && typeof body === 'string') {
                            //     //                             if (all.banks.accounts.poalimAsakimNew.IpAddress !== body.replace(/\s/g, "")) {
                            //     //                                 myEmitterLogs(9, '---Proxy ip changed!! now is:' + body.replace(/\s/g, "") + ' --- before:' + all.banks.accounts.poalimAsakimNew.IpAddress);
                            //     //                             }
                            //     //                             writeLog('---ipAfterServerTestProxy prevent 30 sec: ' + body.replace(/\s/g, ""));
                            //     //                         }
                            //     //                     })
                            //     //                 }, 5000)
                            //     //             });
                            //     //         })
                            //     //     // writeLog('---Set Proxy----');
                            //     //     // setProxy().then((suc) => {
                            //     //     //     if(suc){
                            //     //     //
                            //     //     //     }else{
                            //     //     //         main.changeIpV4(false).then(function () {
                            //     //     //             window.all.banks.vpnConnected = true;
                            //     //     //             all.banks.accounts.poalimAsakimNew.login();
                            //     //     //         });
                            //     //     //     }
                            //     //     //
                            //     //     // })
                            //     // } else {
                            //     //     all.banks.accounts.poalimAsakimNew.login();
                            //     // }
                            // } else {
                            //     main.changeIpV4(false).then(function () {
                            //         window.all.banks.vpnConnected = true;
                            //         all.banks.accounts.poalimAsakim.login();
                            //     });
                            //     // if (window.navigator.platform.indexOf('Win') === -1 && !all.banks.openBankPage) {
                            //     //     writeLog('---Set Proxy----');
                            //     //     setProxy().then((suc) => {
                            //     //         if (suc) {
                            //     //             all.banks.accounts.poalimAsakim.login();
                            //     //         } else {
                            //     //             main.changeIpV4(false).then(function () {
                            //     //                 window.all.banks.vpnConnected = true;
                            //     //                 all.banks.accounts.poalimAsakim.login();
                            //     //             });
                            //     //         }
                            //     //     })
                            //     // } else {
                            //     //     all.banks.accounts.poalimAsakim.login();
                            //     // }
                            //     // main.changeIpV4(false).then(function () {
                            //     //     all.banks.accounts.poalimAsakim.login();
                            //     // });
                            // }
                            break;

                        case 10:
                        case 34:
                            main.changeIpV4(false).then(function () {
                                all.banks.accounts.aibank.login();
                            });
                            break;

                        case 13:
                            main.changeIpV4(false).then(function () {
                                all.banks.accounts.unionbank.login();
                            });
                            break;

                        case 54:
                            // if (window.navigator.platform.indexOf('Win') === -1) {
                            //     $.get("https://lumtest.com/myip")
                            //         .done(function (ipAddrress) {
                            //             ipAddrress = ipAddrress.replace(/\s/g, "");
                            //             require('request')({
                            //                 uri: 'https://api.brightdata.com/zone/whitelist',
                            //                 method: "POST",
                            //                 body: {'zone': 'residential', 'ip': ipAddrress},
                            //                 json: true,
                            //                 headers: {'Authorization': 'Bearer 959bcce2-a1e9-466c-b4b8-eb1d06cdcf4f'}
                            //             }, (error, response, data) => {
                            //                 all.banks.accounts.bankjerusalem.login();
                            //             });
                            //         })
                            // } else {
                            //     all.banks.accounts.bankjerusalem.login();
                            // }
                            main.changeIpV4('israel').then(function () {
                                all.banks.accounts.bankjerusalem.login();
                            });
                            break;

                        case 20:
                            main.changeIpV4(false).then(function () {
                                all.banks.accounts.mizrahiTefahot.login();
                            });
                            break;

                        case 58:
                            main.changeIpV4(false).then(function () {
                                all.banks.accounts.discountAsakim.login();
                            });
                            break;

                        case 57:
                        case 157:
                        case 158:
                            main.changeIpV4(false).then(function () {
                                all.banks.accounts.discountAsakimPlusNew.login();
                            });
                            break;

                        case 4:
                            // main.changeIpV4(false).then(function () {
                            all.banks.accounts.yahav.login();
                            // })
                            break;

                        case 9:
                            all.banks.accounts.postDoar.login();
                            break;

                        case 91:
                            all.banks.accounts.yatzilAll.login();
                            break;

                        case 21:
                            main.changeIpV4(false).then(function () {
                                all.banks.accounts.visaCardAll.login();
                            });
                            break;

                        case 81:
                            main.changeIpV4(false).then(function () {
                                all.banks.accounts.visaAll.login();
                            });
                            break;

                        case 87:
                            main.changeIpV4(false).then(function () {
                                all.banks.accounts.meshulam.login();
                            });
                            break;

                        case 22:
                        case 23:
                        case 25:
                            all.banks.accounts.israCardAll.login();
                            break;

                        case 24:
                            all.banks.accounts.leumiCardAll.login();
                            break;

                        case 82:
                            all.banks.accounts.isracardAsakim.login();
                            break;

                        case 90:
                        case 190:
                            // main.changeIpV4('israel').then(function () {
                            //     all.banks.accounts.gama.process();
                            // });
                            writeLog('---Set Proxy----');
                            setProxy().then(() => {
                                all.banks.accounts.gama.process();
                            })
//                         clearProxy().then(() => {
//                             all.banks.accounts.gama.process();
//                         });

                            // if (!all.banks.spiderConfig.IsGamaWithout_VPN_PROXY) {
                            //     main.changeIpV4('israel').then(function () {
                            //         all.banks.accounts.gama.process();
                            //     });
                            // } else {
                            //     all.banks.accounts.gama.process();
                            // }

                            break;

                        case 80:
                            all.banks.accounts.leumiCardSlika.login();
                            break;

                        case 89:
                            all.banks.accounts.tzameret.process();
                            break;

                        default:
                            myEmitterLogs(9, "Number of Bank not exist");
                            break;
                    }
                }
            });
        }
    };

    main.hasValidWorkplan = function () {
        let result;
        switch (parseFloat(all.banks.accountDetails.bank.BankNumber)) {
            // ----------- banks --------------
            case 12:    // poalimAsakim / hapoalim
                if (!all.banks.generalVariables.isPoalimAsakim) {
                    result = [all.banks.accountDetails.days, all.banks.accountDetails.ccardMonth, all.banks.accountDetails.IND_NILVIM, all.banks.accountDetails.MATAH_DAY_TO_RUN]
                        .some(val => Number.isInteger(val) && val > 0);
                } else {
                    result = true;
                }
                break;

            case 122:
            case 123:
            case 124:   // poalimAsakim
                result = true;
                break;

            case 10:    // -||-
            case 13:    // -||-
            case 34:    // aibank

            case 31:    // -||-
            case 46:    // -||-
            case 52:    // -||-
            case 126:   // -||-
            case 14:    // fibi

            case 11:    // -||-
            case 17:    // discuont

            case 54:    // bankjerusalem
            case 20:    // mizrahiTefahot

            case 57:    // -||-
            case 58:    // discountAsakim

            case 157:    // -||-
            case 158:   // discuontAsakimPlus

            case 4:     // yahav
            case 9:     // postDoar
                result = [all.banks.accountDetails.days, all.banks.accountDetails.ccardMonth, all.banks.accountDetails.IND_NILVIM, all.banks.accountDetails.MATAH_DAY_TO_RUN]
                    .some(val => Number.isInteger(val) && val > 0);
                break;

            // ----------- cards --------------
            case 21:    // visaCard

            case 22:    // -||-
            case 23:    // -||-
            case 25:    // israCard
            case 24:    // leumiCard
                if (all.banks.accountDetails.ccardMonth === 0) {
                    all.banks.accountDetails.ccardMonth = 3;
                }
                result = Number.isInteger(all.banks.accountDetails.ccardMonth) && all.banks.accountDetails.ccardMonth > 0;
                break;

            // ----------- slika --------------
            case 91: // yatzil
            case 81: // visa
            case 82: // isracardAsakim
            case 90: // gama
            case 87: // meshulam
            case 190: // gama
            case 80: // leumiCardSlika
            case 89: // tzameret
                result = true;
                break;

            default:
                result = false;
                break;
        }

        return result;
    };

    return main;
}();
