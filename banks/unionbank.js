all.banks.accounts.unionbank = function () {
    var unionbank = {};
    unionbank.timeOfLoadIframe = 0;
    unionbank.imageScale = 0.2;
    unionbank.engWebSite = false;
    unionbank.timesOfChangeIp = 0;

    unionbank.login = function () {
        unionbank.indx = 0;
        unionbank.ddAccAshrai = 0;
        unionbank.ddAshrai = 0;
        unionbank.ddTime = 0;
        unionbank.logOutNumbers = 25;
        unionbank.dateCards = ["01", "02", "03"];
        unionbank.timeOutFunc;
        unionbank.timesOfChangeIp += 1;

        //var frame = $('#filecontainerlogin');
        if (parseInt(all.banks.accountDetails.bank.BankNumber) == 10 || parseInt(all.banks.accountDetails.bank.BankNumber) == 34) {
            unionbank.site_name = 'leumi';
            all.banks.accounts.unionbank.urlServices = 'hb2.bankleumi.co.il';
            all.banks.accounts.unionbank.bankids = 'uniquesig6d21b9fa2d6cb8428728bd3ec699f0501be7f6974660def4404f3ac9a5d373d2';
        }
        // if (parseInt(all.banks.accountDetails.bank.BankNumber) == 34) {
        // 	all.banks.accounts.unionbank.urlServices = 'hb.aibank.co.il';
        // 	all.banks.accounts.unionbank.bankids = 'uniquesige2a40487e251bc3fec0a0ca1a0bed6765d97e390a1e9e2b2eea82f45cde6663f'
        // }
        if (parseInt(all.banks.accountDetails.bank.BankNumber) == 13) {
            unionbank.site_name = 'igud';
            all.banks.accounts.unionbank.urlServices = 'hb.unionbank.co.il';
            all.banks.accounts.unionbank.bankids = '';
            //frame.attr('src', "https://hb.unionbank.co.il/Igud/pre_default.asp");
        }
        // else {
        // 	frame.attr('src', "https://" + all.banks.accounts.unionbank.urlServices + "/H/Login.html");
        // }
        //frame.attr('src', "https://" + all.banks.accounts.unionbank.urlServices + "/H/Login.html");
        unionbank.timeOfLoadIframe += 1;
        writeLog("---- login ----");

        function errorCodeFromUrl(url) {
            var params = {}, queries, temp, i, l;
            const [rest, queryString] = url ? url.split('?') : [];
            if (!queryString) {
                return params;
            }
            // Split into key/value pairs
            queries = queryString.split("&");
            // Convert the array of strings into an object
            for (i = 0, l = queries.length; i < l; i++) {
                temp = queries[i].split('=');
                params[temp[0]] = temp[1];
            }
            return params['errCode'] || params['htmlErrCode'];
        }

        all.banks.core.services.httpReq("https://" + all.banks.accounts.unionbank.urlServices + "/", 'GET', null, false, false)
            .then(function (resPage) {
                var dataRes = all.banks.core.services.parseHtml(resPage);
                var serializeForm = dataRes.find("form").serializeArray();
                var obj = {};
                serializeForm.forEach((vals) => {
                    obj[vals.name] = vals.value;
                });

                obj["uid"] = all.banks.accountDetails.bank.username.slice(0, 7);
                obj["password"] = all.banks.accountDetails.bank.password.slice(0, 12);

                all.banks.core.services.httpReq("https://" + all.banks.accounts.unionbank.urlServices + "/authenticate", 'POST', obj, true, false)
                    .then(function (response, statusWord, responseTextAll, responseUrl) {
                        // console.log(response, statusWord, responseTextAll, responseUrl)
                        if (responseUrl && responseUrl.includes('ErrorPage.htm?errCode=')) {
                            myEmitterLogs(9, 'errCode ' + errorCodeFromUrl(responseUrl))
                            return;
                        }

                        var res = all.banks.core.services.parseHtml(response);
                        if (res.find('.errBody').length && res.find('.errBody').text().indexOf('פג') !== -1) {
                            myEmitterLogs(6);
                        } else if (res.find('.errBody').length && res.find('.errBody').text().indexOf('חסום') !== -1) {
                            myEmitterLogs(8);
                        } else if (res.find('.errBody').length && res.find('.errBody').text().indexOf('שגוי') !== -1) {
                            myEmitterLogs(5);
                        } else if (res.find('.errHeader').length && res.find('.errHeader').text().indexOf('שגוי') !== -1) {
                            writeLog("---- err שגוי----" + response);
                            //frame.attr('src', '');
                            myEmitterLogs(5);
                        } else if (res.find('#loginErrMsg').length && res.find('#loginErrMsg').text().indexOf('שגוי') !== -1) {
                            writeLog("---- err שגוי----" + response);
                            //frame.attr('src', '');
                            myEmitterLogs(5);
                        } else if ((res.find('.errHeader').text().indexOf('המנוי חסום') !== -1) || (parseInt(all.banks.accountDetails.bank.BankNumber) == 13 && res.find('.textForm.TdText').length && res.find('.textForm.TdText').text().indexOf('חסום') !== -1)) {
                            myEmitterLogs(8);
                        } else if (res.find('#errorMsgDescriptionEng').length && res.find('#errorMsgDescriptionEng').text().indexOf('system unavailable') !== -1) {
                            //frame.attr('src', '');
                            myEmitterLogs(9, ': [' + errorCodeFromUrl(responseUrl) + '] '
                                + res.find('#errorMsgDescriptionEng').text().trim().replace(/\s{2,}/g, '. '));
                        } else if (res.find('#verPass').length && res.find('.mainScreen > h2').text().indexOf('פג') !== -1) {
                            myEmitterLogs(6);
                        } else if (res.find('#login').length && res.find('#login').attr("action").indexOf('ValidateChangePassword') !== -1) {
                            myEmitterLogs(6);
                        } else if (res.find('#login').length && res.find('#login').attr("action").indexOf('changepassword') !== -1) {
                            myEmitterLogs(6);
                        } else if (parseInt(all.banks.accountDetails.bank.BankNumber) == 13
                            && ((res.find('#form1').length && res.find('#form1').attr("action")
                                    && res.find('#form1').attr("action").indexOf("ValidateChangePassword.asp") !== -1)
                                || res.find(':button[onclick*="PasswordMustChangeBody"]').length > 0)) {
//					&& res.find('#enter').length && res.find('#enter').attr("onclick").indexOf("h_PasswordMustChangeBody") !== -1) {
                            myEmitterLogs(6);
                        } else if (res.find('.errHeader').length && (res.find('.errHeader').text().indexOf('יש לאשר את') !== -1
                            || res.find('.errHeader').next('label').text().indexOf('יש לאשר את') !== -1)) {
                            writeLog("נדרש הסכם שירות");
                            myEmitterLogs(36);
                        } else if (res.find('.errHeader').length && res.find('.errHeader').text().indexOf('לפוג') !== -1) {
                            unionbank.logOutNumbers = 7;
                            writeLog("---- err לפוג----" + response);
                            // var jsons = {
                            // 	'challenge': '2'
                            // };
                            all.banks.core.services.httpReq("https://" + all.banks.accounts.unionbank.urlServices + "/gotolandingpage", 'GET', null, false, false)
                                .then(function (response) {
                                    var res = all.banks.core.services.parseHtml(response);
                                    if (res.find('.errHeader').length && res.find('.errHeader').text().indexOf('שגוי') !== -1) {
                                        writeLog("---- err שגוי----" + response);
                                        //frame.attr('src', '');
                                        myEmitterLogs(5);
                                    } else if (res.find('#loginErrMsg').length && res.find('#loginErrMsg').text().indexOf('שגוי') !== -1) {
                                        writeLog("---- err שגוי----" + response);
                                        //frame.attr('src', '');
                                        myEmitterLogs(5);
                                    } else if (res.find('.errHeader').length && res.find('.errHeader').text().indexOf('יש לאשר את') !== -1) {
                                        writeLog("נדרש הסכם שירות");
                                        myEmitterLogs(36);
                                    } else if ((res.find('.errHeader').text().indexOf('המנוי חסום') !== -1) || (parseInt(all.banks.accountDetails.bank.BankNumber) == 13 && res.find('.textForm.TdText').length && res.find('.textForm.TdText').text().indexOf('חסום') !== -1)) {
                                        myEmitterLogs(8);
                                    } else if ((res.find('#errorMsgDescriptionEng').length && res.find('#errorMsgDescriptionEng').text().indexOf('system unavailable') !== -1) || (res.find('.errorSystemError1').length && res.find('.errorSystemError1').text().indexOf('unavailable') !== -1)) {
                                        //frame.attr('src', '');
                                        myEmitterLogs(9, 'system unavailable');
                                    } else if (res.find('#ver_password').length && res.find('#changePassheader').text().indexOf('פג') !== -1) {
                                        myEmitterLogs(6);
                                    } else if (parseInt(all.banks.accountDetails.bank.BankNumber) == 13 && res.find('#enter').length && res.find('#enter').attr("onclick").indexOf("h_PasswordMustChangeBody") !== -1) {
                                        myEmitterLogs(6);
                                    } else {
                                        nextStepLogin();
                                    }
                                })
                        } else {
                            if (res.find('form[name="MAINFORM"]').length && res.find('form[name="MAINFORM"]').attr('action').includes('DisplayForeignAccountsActivity')) {
                                unionbank.engWebSite = true;
                            }
                            nextStepLogin();
                        }
                    })
                    .fail(function (error, resErr, urlParam) {
                        var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                        all.banks.core.services.errorLog(logErr)
                    });
            })
            .fail(function (error, resErr, urlParam) {
                writeLog("---- IP is blocked - changeIp----");
                if (unionbank.timesOfChangeIp < 5) {
                    writeLog("---- Start ChangeIp----");
                    all.banks.core.main.changeIpV4(true).then(function (res) {
                        if (res) {
                            console.log(res);
                            unionbank.login();
                        } else {
                            $.get("http://icanhazip.com")
                                .done(function (ipAddrress) {
                                    ipAddrress = ipAddrress.replace(/\s/g, "");
                                    myEmitterLogs(9, 'IP is blocked - ' + ipAddrress + 'spiderId:' + all.banks.spiderConfig.spiderId);
                                });
                        }
                    });
                } else {
                    $.get("http://icanhazip.com")
                        .done(function (ipAddrress) {
                            ipAddrress = ipAddrress.replace(/\s/g, "");
                            myEmitterLogs(9, 'IP is blocked - ' + ipAddrress + 'spiderId:' + all.banks.spiderConfig.spiderId);
                        });
                }
            });

        function nextStepLogin() {
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
                };
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
                all.banks.accounts.unionbank.datebackslesh = ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateFrom.getFullYear().toString().slice(-2);
                all.banks.accounts.unionbank.datebacksleshTo = ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateTo.getFullYear().toString().slice(-2);
                if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                    all.banks.accounts.unionbank.datebacksleshMatah = ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateFromMatah.getFullYear().toString();
                    all.banks.accounts.unionbank.datebacksleshToMatah = ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateToMatah.getFullYear().toString();
                }

                unionbank.getCookAll(function () {
                    if (all.banks.accountDetails.days > 0) {
                        all.banks.accounts.unionbank.loadData();
                    } else if (all.banks.accountDetails.ccardMonth > 0) {
                        myEmitterLogs(14);
                        // all.banks.accounts.unionbank.loadAshrai();
                        unionbank.loadAshraiNew();
                    } else if (all.banks.accountDetails.IND_NILVIM > 0) {
                        myEmitterLogs(21); //start loan
                        all.banks.accounts.unionbank.loadLoan();
                    } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                        myEmitterLogs(34);
                        unionbank.loadMatah();
                    } else {
                        var type = 0;
                        var text = "יציאה מהאתר";
                        all.banks.core.services.reloadPage();
                    }
                })
            } else {

                if (!unionbank.engWebSite) {
                    all.banks.core.services.openBankPage("https://" + all.banks.accounts.unionbank.urlServices + "/eBanking/Accounts/ExtendedActivity.aspx")

                    // all.banks.core.services.openBankPage("https://" + all.banks.accounts.unionbank.urlServices + "/eBanking/Accounts/ExtendedSummary.aspx?p=1");
                } else {
                    all.banks.core.services.openBankPage("https://" + all.banks.accounts.unionbank.urlServices + "/eBanking/ForeignCurrency/DisplayForeignAccountsActivity.aspx?p=1");
                }
            }
            // all.banks.core.services.httpReq("https://" + all.banks.accounts.aibank.urlServices + "/InternalSite/RedirectToOrigURL.asp?site_name=" + aibank.site_name + "&secure=1", 'GET', null, false, false)
            // .then(function (data) {
            // 	all.banks.core.services.httpReq("https://" + all.banks.accounts.aibank.urlServices + "/uniquesig4e0824291ffbe1b42058d6558ed87217/uniquesig0/InternalSite/CustomUpdate/eBank_StartApp.asp?site_name=" + aibank.site_name + "&secure=1", 'GET', null, false, false)
            // 	.then(function (data) {
            // 		all.banks.core.services.httpReq("https://" + all.banks.accounts.aibank.urlServices + "/eBanking/SSOLogin.aspx?SectorCheck=Override?SectorCheck=Override", 'GET', null, false, false)
            // 		.then(function (data, statusWord, responseTextAll, responseUrl) {
            // 			var res = all.banks.core.services.parseHtml(data);
            // 			if (res.find('#MainTableContent').length && res.find('#MainTableContent').text().indexOf('שגוי') !== -1) {
            // 				writeLog("---- err שגוי nextStepLogin ----" + data);
            // 				//frame.attr('src', '');
            // 				myEmitterLogs(5);
            // 			} else if (res.find('#loginErrMsg').length && res.find('#loginErrMsg').text().indexOf('שגוי') !== -1) {
            // 				writeLog("---- err שגוי nextStepLogin ----" + data);
            // 				//frame.attr('src', '');
            // 				myEmitterLogs(5);
            // 			} else if ((res.find('#loginErrMsg #errHeader').text().indexOf('המנוי חסום') !== -1) || (parseInt(all.banks.accountDetails.bank.BankNumber) == 13 && res.find('.textForm.TdText').length && res.find('.textForm.TdText').text().indexOf('חסום') !== -1)) {
            // 				myEmitterLogs(8);
            // 			} else if ((res.find('#errorMsgDescriptionEng').length && res.find('#errorMsgDescriptionEng').text().indexOf('system unavailable') !== -1) || (res.find('.errorSystemError1').length && res.find('.errorSystemError1').text().indexOf('unavailable') !== -1)) {
            // 				//frame.attr('src', '');
            // 				//myEmitterLogs(9, 'system unavailable');
            // 				myEmitterLogs(9, ': [' + errorCodeFromUrl(responseUrl) + '] '
            // 					+ (res.find('#errorMsgDescriptionEng').text() || res.find('.errorSystemError1').text())
            // 					.trim().replace(/\s{2,}/g, '. '));
            // 			} else if (res.find('#ver_password').length && res.find('#changePassheader').text().indexOf('פג') !== -1) {
            // 				myEmitterLogs(6);
            // 			} else if (res.find('#errHeader').length && res.find('#errHeader').text().indexOf('יש לאשר את') !== -1) {
            // 				writeLog("נדרש הסכם שירות");
            // 				myEmitterLogs(36);
            // 			} else if (parseInt(all.banks.accountDetails.bank.BankNumber) == 13 && res.find('#enter').length && res.find('#enter').attr("onclick").indexOf("h_PasswordMustChangeBody") !== -1) {
            // 				myEmitterLogs(6);
            // 			} else if (res.find(".row .col-xs-12 .f-s-24").text().indexOf("אינו זמין") !== -1) {
            // 				//	frame.attr('src', '');
            // 				// myEmitterLogs(9, 'system unavailable');
            // 				myEmitterLogs(9, ': [' + errorCodeFromUrl(responseUrl) + '] ' + res.find(".row .col-xs-12 .f-s-24").text()
            // 				.trim().replace(/\s{2,}/g, '. '));
            // 			} else {
            // 				if (!all.banks.openBankPage) {
            // 					all.banks.generalVariables.allDataArr = {
            // 						"ExporterId": all.banks.spiderConfig.spiderId,
            // 						"BankData": [
            // 							{
            // 								"TargetId": all.banks.accountDetails.bank.targetId,
            // 								"Token": all.banks.accountDetails.bank.token,
            // 								"BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
            // 								"ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
            // 								"Account": []
            // 							}
            // 						]
            // 					};
            // 					all.banks.generalVariables.allDataArrMatah = {
            // 						"ExporterId": all.banks.spiderConfig.spiderId,
            // 						"BankData": [
            // 							{
            // 								"TargetId": all.banks.accountDetails.bank.targetId,
            // 								"Token": all.banks.accountDetails.bank.token,
            // 								"BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
            // 								"ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
            // 								"Account": []
            // 							}
            // 						]
            // 					};
            // 					all.banks.generalVariables.allDataArrAshrai = [];
            // 					all.banks.generalVariables.allDataArrLoan = [];
            // 					all.banks.generalVariables.allDataArrDeposit = [];
            // 					all.banks.generalVariables.allDataArrDueChecks = [];
            // 					all.banks.generalVariables.allDataArrStandingOrders = [];
            // 					all.banks.accounts.aibank.datebackslesh = ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateFrom.getFullYear().toString().slice(-2);
            // 					all.banks.accounts.aibank.datebacksleshTo = ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateTo.getFullYear().toString().slice(-2);
            // 					if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
            // 						all.banks.accounts.aibank.datebacksleshMatah = ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateFromMatah.getFullYear().toString();
            // 						all.banks.accounts.aibank.datebacksleshToMatah = ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateToMatah.getFullYear().toString();
            // 					}
            // 					// var leninter = 0;
            // 					// function getCookiesSite() {
            // 					// 	var input = $('#filecontainerlogin').contents().find('#theMainBody');
            // 					// 	if (!input.length) {
            // 					// 		$('#filecontainerlogin').attr('src', "https://" + all.banks.accounts.aibank.urlServices + "/" + all.banks.accounts.aibank.bankids + "/uniquesig0/eBanking/Accounts/ExtendedActivity.aspx");
            // 					// 		var intervals = setInterval(function () {
            // 					// 			leninter += 1;
            // 					// 			var input = $('#filecontainerlogin').contents().find('#theMainBody');
            // 					// 			if (input.length) {
            // 					// 				clearInterval(intervals);
            // 					// 				getCook();
            // 					// 			}
            // 					// 			else {
            // 					// 				if (leninter > 2000) {
            // 					// 					getCookiesSite();
            // 					// 				}
            // 					// 			}
            // 					// 		}, 20);
            // 					// 	}
            // 					// 	else {
            // 					// 		getCook();
            // 					// 	}
            // 					// }
            // 					//getCookiesSite();
            // 					aibank.getCookAll(function () {
            // 						if (all.banks.accountDetails.days > 0) {
            // 							all.banks.accounts.aibank.loadData();
            // 						} else if (all.banks.accountDetails.ccardMonth > 0) {
            // 							myEmitterLogs(14);
            // 							aibank.loadAshraiNew(); // all.banks.accounts.aibank.loadAshrai();
            // 						} else if (all.banks.accountDetails.IND_NILVIM > 0) {
            // 							myEmitterLogs(21); //start loan
            // 							all.banks.accounts.aibank.loadLoan();
            // 						} else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
            // 							myEmitterLogs(34);
            // 							aibank.loadMatah();
            // 						} else {
            // 							var type = 0;
            // 							var text = "יציאה מהאתר";
            // 							all.banks.core.services.reloadPage();
            // 						}
            // 					})
            // 				} else {
            // 					all.banks.core.services.openBankPage("https://" + all.banks.accounts.aibank.urlServices + "/" + all.banks.accounts.aibank.bankids + "/uniquesig0/eBanking/Accounts/ExtendedActivity.aspx")
            // 				}
            // 			}
            // 		})
            // 	})
            // })
        }

//         all.banks.core.services.httpReq("https://" + all.banks.accounts.unionbank.urlServices + "/", 'GET', null, false, false)
//             .then(function () {
//                 var jsons = {
//                     'system': 'Test',
//                     'uid': all.banks.accountDetails.bank.username.slice(0, 7),
//                     'password': all.banks.accountDetails.bank.password.slice(0, 12),
//                     'command': 'login'
//                 };
//                 all.banks.core.services.httpReq("https://" + all.banks.accounts.unionbank.urlServices + "/InternalSite/Validate.asp", 'POST', jsons, true, false)
//                     .then(function (response, statusWord, responseTextAll) {
//                         var res = all.banks.core.services.parseHtml(response);
//                         if (res.find('#MainTableContent').length && res.find('#MainTableContent').text().indexOf('שגוי') !== -1) {
//                             writeLog("---- err שגוי----" + response);
//                             //frame.attr('src', '');
//                             myEmitterLogs(5);
//                         } else if (res.find('#loginErrMsg').length && res.find('#loginErrMsg').text().indexOf('שגוי') !== -1) {
//                             writeLog("---- err שגוי----" + response);
//                             //frame.attr('src', '');
//                             myEmitterLogs(5);
//                         } else if ((res.find('#loginErrMsg #errHeader').text().indexOf('המנוי חסום') !== -1) || (parseInt(all.banks.accountDetails.bank.BankNumber) == 13 && res.find('.textForm.TdText').length && res.find('.textForm.TdText').text().indexOf('חסום') !== -1)) {
//                             myEmitterLogs(8);
//                         } else if (res.find('#errorMsgDescriptionEng').length && res.find('#errorMsgDescriptionEng').text().indexOf('system unavailable') !== -1) {
//                             //frame.attr('src', '');
//                             myEmitterLogs(9, 'system unavailable');
//                         } else if (res.find('#ver_password').length && res.find('#changePassheader').text().indexOf('פג') !== -1) {
//                             myEmitterLogs(6);
//                         } else if (res.find('#login').length && res.find('#login').attr("action").indexOf('ValidateChangePassword') !== -1) {
//                             myEmitterLogs(6);
//                         } else if (parseInt(all.banks.accountDetails.bank.BankNumber) == 13
//                             && ((res.find('#form1').length && res.find('#form1').attr("action")
//                                 && res.find('#form1').attr("action").indexOf("ValidateChangePassword.asp") !== -1)
//                                 || res.find(':button[onclick*="PasswordMustChangeBody"]').length > 0)) {
// //					&& res.find('#enter').length && res.find('#enter').attr("onclick").indexOf("h_PasswordMustChangeBody") !== -1) {
//                             myEmitterLogs(6);
//                         } else if (res.find('#errHeader').length && res.find('#errHeader').text().indexOf('לפוג') !== -1) {
//                             unionbank.logOutNumbers = 7;
//                             writeLog("---- err לפוג----" + response);
//                             var jsons = {
//                                 'challenge': '2'
//                             };
//                             all.banks.core.services.httpReq("https://" + all.banks.accounts.unionbank.urlServices + "/InternalSite/ValidateContinue.asp", 'POST', jsons, true, false)
//                                 .then(function (response) {
//                                     var res = all.banks.core.services.parseHtml(response);
//                                     if (res.find('#MainTableContent').length && res.find('#MainTableContent').text().indexOf('שגוי') !== -1) {
//                                         writeLog("---- err שגוי----" + response);
//                                         //frame.attr('src', '');
//                                         myEmitterLogs(5);
//                                     } else if (res.find('#loginErrMsg').length && res.find('#loginErrMsg').text().indexOf('שגוי') !== -1) {
//                                         writeLog("---- err שגוי----" + response);
//                                         //frame.attr('src', '');
//                                         myEmitterLogs(5);
//                                     } else if ((res.find('#loginErrMsg #errHeader').text().indexOf('המנוי חסום') !== -1) || (parseInt(all.banks.accountDetails.bank.BankNumber) == 13 && res.find('.textForm.TdText').length && res.find('.textForm.TdText').text().indexOf('חסום') !== -1)) {
//                                         myEmitterLogs(8);
//                                     } else if ((res.find('#errorMsgDescriptionEng').length && res.find('#errorMsgDescriptionEng').text().indexOf('system unavailable') !== -1) || (res.find('.errorSystemError1').length && res.find('.errorSystemError1').text().indexOf('unavailable') !== -1)) {
//                                         //frame.attr('src', '');
//                                         myEmitterLogs(9, 'system unavailable');
//                                     } else if (res.find('#ver_password').length && res.find('#changePassheader').text().indexOf('פג') !== -1) {
//                                         myEmitterLogs(6);
//                                     } else if (parseInt(all.banks.accountDetails.bank.BankNumber) == 13 && res.find('#enter').length && res.find('#enter').attr("onclick").indexOf("h_PasswordMustChangeBody") !== -1) {
//                                         myEmitterLogs(6);
//                                     } else {
//                                         nextStepLogin();
//                                     }
//                                 })
//                         } else {
//                             nextStepLogin();
//                         }
//                     })
//                     .fail(function (error, resErr, urlParam) {
//                         var logErr = "restUrl: " + urlParam + ", status: " + error.status;
//                         all.banks.core.services.errorLog(logErr)
//                     });
//             })
        // var ifarmeSetInterval = setInterval(function () {
        // 	unionbank.timeOfLoadIframe += 1;
        // 	var input = frame.contents().find('#uid');
        // 	if (!input.length || (window.frames[0].osdxdty == undefined)) {
        // 		if (unionbank.timeOfLoadIframe > 10) {
        // 			frame.attr('src', '');
        // 			writeLog("---- err load Loginpage ----");
        // 			myEmitterLogs(9, "err load Loginpage");
        // 		}
        // 		else {
        // 			frame.attr('src', "https://" + all.banks.accounts.unionbank.urlServices + "/H/Login.html");
        // 			// if (parseInt(all.banks.accountDetails.bank.BankNumber) == 13) {
        // 			// 	frame.attr('src', "http://www.unionbank.co.il/14-he/UnionBank.aspx");
        // 			// }
        // 			// else {
        // 			// 	frame.attr('src', "https://" + all.banks.accounts.unionbank.urlServices + "/H/Login.html");
        // 			// }
        // 		}
        // 	}
        // 	else {
        // 		clearInterval(ifarmeSetInterval);
        // 	}
        // }, 4000);
        //
        // var waitForIFrame = setInterval(function () {
        // 	var input = frame.contents().find('#uid');
        // 	if (input.length && (window.frames[0].osdxdty !== undefined)) {
        // 		writeLog("---- waitForIFrame ----");
        //
        // 		clearInterval(waitForIFrame);
        // 		doneLoadFrame();
        // 	}
        // }, 200);
        //
        // function doneLoadFrame() {
        // 	try {
        // 		//var t11 = window.frames[0].document.getElementById('password'),
        // 		//	csz11 = window.frames[0].document.createEvent('KeyboardEvents');
        // 		//csz11.initKeyboardEvent('keydown');
        // 		//t11.dispatchEvent(csz11);
        // 		window.frames[0].document.getElementById('uid').value = all.banks.accountDetails.bank.username.slice(0, 7);
        // 		window.frames[0].document.getElementById('password').value = all.banks.accountDetails.bank.password.slice(0, 12);
        // 		writeLog("---- values written ----");
        //
        // 		setTimeout(function () {
        // 			var t1 = window.frames[0].document.getElementById('password'),
        // 				csz1 = window.frames[0].document.createEvent('KeyboardEvents');
        // 			csz1.initKeyboardEvent('input');
        // 			t1.dispatchEvent(csz1);
        //
        // 			writeLog("---- values dispatchEvent ----");
        //
        // 			var counterLogin = 0;
        // 			var interForLogin = setInterval(function () {
        // 				counterLogin += 1;
        // 				if (frame.contents().find('#uid').val() == "" || frame.contents().find("#password").val() == "" || window.frames[0].osdxdty == undefined) {
        // 					writeLog("---- values not exist ----");
        //
        // 					if (counterLogin > 35) {
        // 						clearInterval(interForLogin);
        // 						if (unionbank.timeOfLoadIframe > 10) {
        // 							frame.attr('src', '');
        // 							myEmitterLogs(9, "err load Loginpage");
        // 						}
        // 						else {
        // 							writeLog("---- Login start again ----");
        // 							unionbank.login();
        // 						}
        // 					}
        // 				}
        // 				else {
        // 					clearInterval(interForLogin);
        // 					var intervalPassHidden = setInterval(function () {
        // 						var passwordVal = frame.contents().find('input:hidden[name="password"]');
        // 						if (passwordVal.length) {
        // 							writeLog("---- value pass exist ----" + passwordVal.val());
        //
        // 							clearInterval(intervalPassHidden);
        // 							var jsons = {
        // 								'system': 'Test',
        // 								'uid': all.banks.accountDetails.bank.username.slice(0, 7),
        // 								'__password': frame.contents().find("#password").val(),
        // 								'command': 'login',
        // 								'password': passwordVal.val()
        // 							};
        // 							all.banks.core.services.httpReq("https://" + all.banks.accounts.unionbank.urlServices + "/InternalSite/Validate.asp", 'POST', jsons, true, false)
        // 							.then(function (response, statusWord, responseTextAll) {
        // 								var res = all.banks.core.services.parseHtml(response);
        // 								if (res.find('#MainTableContent').length && res.find('#MainTableContent').text().indexOf('שגוי') !== -1) {
        // 									writeLog("---- err שגוי----" + response);
        // 									frame.attr('src', '');
        // 									myEmitterLogs(5);
        // 								}
        // 								else if (res.find('#loginErrMsg').length && res.find('#loginErrMsg').text().indexOf('שגוי') !== -1) {
        // 									writeLog("---- err שגוי----" + response);
        // 									frame.attr('src', '');
        // 									myEmitterLogs(5);
        // 								}
        // 								else if ((res.find('#loginErrMsg #errHeader').text().indexOf('המנוי חסום') !== -1) || (parseInt(all.banks.accountDetails.bank.BankNumber) == 13 && res.find('.textForm.TdText').length && res.find('.textForm.TdText').text().indexOf('חסום') !== -1)) {
        // 									myEmitterLogs(8);
        // 								}
        // 								else if (res.find('#errorMsgDescriptionEng').length && res.find('#errorMsgDescriptionEng').text().indexOf('system unavailable') !== -1) {
        // 									frame.attr('src', '');
        // 									myEmitterLogs(9, 'system unavailable');
        // 								}
        // 								else if (res.find('#ver_password').length && res.find('#changePassheader').text().indexOf('פג') !== -1) {
        // 									myEmitterLogs(6);
        // 								}
        // 								else if (parseInt(all.banks.accountDetails.bank.BankNumber) == 13 && res.find('#enter').length && res.find('#enter').attr("onclick").indexOf("h_PasswordMustChangeBody") !== -1) {
        // 									myEmitterLogs(6);
        // 								}
        // 								else if (res.find('#errHeader').length && res.find('#errHeader').text().indexOf('לפוג') !== -1) {
        // 									unionbank.logOutNumbers = 7;
        // 									writeLog("---- err לפוג----" + response);
        // 									var jsons = {
        // 										'challenge': '2'
        // 									};
        // 									all.banks.core.services.httpReq("https://" + all.banks.accounts.unionbank.urlServices + "/InternalSite/ValidateContinue.asp", 'POST', jsons, true, false)
        // 									.then(function (response) {
        // 										var res = all.banks.core.services.parseHtml(response);
        // 										if (res.find('#MainTableContent').length && res.find('#MainTableContent').text().indexOf('שגוי') !== -1) {
        // 											writeLog("---- err שגוי----" + response);
        // 											frame.attr('src', '');
        // 											myEmitterLogs(5);
        // 										}
        // 										else if (res.find('#loginErrMsg').length && res.find('#loginErrMsg').text().indexOf('שגוי') !== -1) {
        // 											writeLog("---- err שגוי----" + response);
        // 											frame.attr('src', '');
        // 											myEmitterLogs(5);
        // 										}
        // 										else if ((res.find('#loginErrMsg #errHeader').text().indexOf('המנוי חסום') !== -1) || (parseInt(all.banks.accountDetails.bank.BankNumber) == 13 && res.find('.textForm.TdText').length && res.find('.textForm.TdText').text().indexOf('חסום') !== -1)) {
        // 											myEmitterLogs(8);
        // 										}
        // 										else if ((res.find('#errorMsgDescriptionEng').length && res.find('#errorMsgDescriptionEng').text().indexOf('system unavailable') !== -1) || (res.find('.errorSystemError1').length && res.find('.errorSystemError1').text().indexOf('unavailable') !== -1)) {
        // 											frame.attr('src', '');
        // 											myEmitterLogs(9, 'system unavailable');
        // 										}
        // 										else if (res.find('#ver_password').length && res.find('#changePassheader').text().indexOf('פג') !== -1) {
        // 											myEmitterLogs(6);
        // 										}
        // 										else if (parseInt(all.banks.accountDetails.bank.BankNumber) == 13 && res.find('#enter').length && res.find('#enter').attr("onclick").indexOf("h_PasswordMustChangeBody") !== -1) {
        // 											myEmitterLogs(6);
        // 										}
        // 										else {
        // 											nextStepLogin();
        // 										}
        // 									})
        // 								}
        // 								else {
        // 									nextStepLogin();
        // 								}
        // 							})
        // 							.fail(function (error, resErr, urlParam) {
        // 								var logErr = "restUrl: " + urlParam + ", status: " + error.status;
        // 								all.banks.core.services.errorLog(logErr)
        // 							});
        // 						}
        // 					}, 200);
        // 				}
        // 			}, 300);
        // 		}, 2000);
        //
        // function nextStepLogin() {
        //     all.banks.core.services.httpReq("https://" + all.banks.accounts.unionbank.urlServices + "/InternalSite/RedirectToOrigURL.asp?site_name=" + unionbank.site_name + "&secure=1", 'GET', null, false, false)
        //         .then(function (data) {
        //             all.banks.core.services.httpReq("https://" + all.banks.accounts.unionbank.urlServices + "/uniquesig4e0824291ffbe1b42058d6558ed87217/uniquesig0/InternalSite/CustomUpdate/eBank_StartApp.asp?site_name=" + unionbank.site_name + "&secure=1", 'GET', null, false, false)
        //                 .then(function (data) {
        //                     all.banks.core.services.httpReq("https://" + all.banks.accounts.unionbank.urlServices + "/eBanking/SSOLogin.aspx?SectorCheck=Override?SectorCheck=Override", 'GET', null, false, false)
        //                         .then(function (data, state, status, responseURL) {
        //                             const errCodeMatch = responseURL ? /\/ErrorPage\.htm\?.*errCode=(\d{1,8})/g.exec(responseURL) : null;
        //                             if (errCodeMatch !== null) {
        //                                 myEmitterLogs(9, ': system unavailable [' + errCodeMatch[1] + '] ');
        //                                 return;
        //                             }
        //
        //                             var res = all.banks.core.services.parseHtml(data);
        //                             if (res.find('#MainTableContent').length && res.find('#MainTableContent').text().indexOf('שגוי') !== -1) {
        //                                 writeLog("---- err שגוי nextStepLogin ----" + data);
        //                                 //frame.attr('src', '');
        //                                 myEmitterLogs(5);
        //                             } else if (res.find('#loginErrMsg').length && res.find('#loginErrMsg').text().indexOf('שגוי') !== -1) {
        //                                 writeLog("---- err שגוי nextStepLogin ----" + data);
        //                                 //frame.attr('src', '');
        //                                 myEmitterLogs(5);
        //                             } else if ((res.find('#loginErrMsg #errHeader').text().indexOf('המנוי חסום') !== -1) || (parseInt(all.banks.accountDetails.bank.BankNumber) == 13 && res.find('.textForm.TdText').length && res.find('.textForm.TdText').text().indexOf('חסום') !== -1)) {
        //                                 myEmitterLogs(8);
        //                             } else if ((res.find('#errorMsgDescriptionEng').length && res.find('#errorMsgDescriptionEng').text().indexOf('system unavailable') !== -1) || (res.find('.errorSystemError1').length && res.find('.errorSystemError1').text().indexOf('unavailable') !== -1)) {
        //                                 //frame.attr('src', '');
        //                                 myEmitterLogs(9, 'system unavailable');
        //                             } else if (res.find('#ver_password').length && res.find('#changePassheader').text().indexOf('פג') !== -1) {
        //                                 myEmitterLogs(6);
        //                             } else if (parseInt(all.banks.accountDetails.bank.BankNumber) == 13) {
        //                                 if(res.find('#enter').length && res.find('#enter').attr("onclick") && res.find('#enter').attr("onclick").indexOf("h_PasswordMustChangeBody") !== -1){
        //                                     myEmitterLogs(6);
        //                                 }
        //                             } else if (res.find(".row .col-xs-12 .f-s-24").text().indexOf("אינו זמין") !== -1) {
        //                                 //	frame.attr('src', '');
        //                                 myEmitterLogs(9, 'system unavailable');
        //                             } else {
        //                                 if (!all.banks.openBankPage) {
        //                                     all.banks.generalVariables.allDataArr = {
        //                                         "ExporterId": all.banks.spiderConfig.spiderId,
        //                                         "BankData": [
        //                                             {
        //                                                 "TargetId": all.banks.accountDetails.bank.targetId,
        //                                                 "Token": all.banks.accountDetails.bank.token,
        //                                                 "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
        //                                                 "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
        //                                                 "Account": []
        //                                             }
        //                                         ]
        //                                     };
        //                                     all.banks.generalVariables.allDataArrMatah = {
        //                                         "ExporterId": all.banks.spiderConfig.spiderId,
        //                                         "BankData": [
        //                                             {
        //                                                 "TargetId": all.banks.accountDetails.bank.targetId,
        //                                                 "Token": all.banks.accountDetails.bank.token,
        //                                                 "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
        //                                                 "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
        //                                                 "Account": []
        //                                             }
        //                                         ]
        //                                     };
        //                                     all.banks.generalVariables.allDataArrAshrai = [];
        //                                     all.banks.generalVariables.allDataArrLoan = [];
        //                                     all.banks.generalVariables.allDataArrDeposit = [];
        //                                     all.banks.generalVariables.allDataArrDueChecks = [];
        //                                     all.banks.generalVariables.allDataArrStandingOrders = [];
        //                                     all.banks.accounts.unionbank.datebackslesh = ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateFrom.getFullYear().toString().slice(-2);
        //                                     all.banks.accounts.unionbank.datebacksleshTo = ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateTo.getFullYear().toString().slice(-2);
        //                                     if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
        //                                         all.banks.accounts.unionbank.datebacksleshMatah = ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateFromMatah.getFullYear().toString();
        //                                         all.banks.accounts.unionbank.datebacksleshToMatah = ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateToMatah.getFullYear().toString();
        //                                     }
        //                                     // var leninter = 0;
        //                                     // function getCookiesSite() {
        //                                     // 	var input = $('#filecontainerlogin').contents().find('#theMainBody');
        //                                     // 	if (!input.length) {
        //                                     // 		$('#filecontainerlogin').attr('src', "https://" + all.banks.accounts.unionbank.urlServices + "/eBanking/Accounts/ExtendedActivity.aspx");
        //                                     // 		var intervals = setInterval(function () {
        //                                     // 			leninter += 1;
        //                                     // 			var input = $('#filecontainerlogin').contents().find('#theMainBody');
        //                                     // 			if (input.length) {
        //                                     // 				clearInterval(intervals);
        //                                     // 				getCook();
        //                                     // 			}
        //                                     // 			else {
        //                                     // 				if (leninter > 2000) {
        //                                     // 					getCookiesSite();
        //                                     // 				}
        //                                     // 			}
        //                                     // 		}, 20);
        //                                     // 	}
        //                                     // 	else {
        //                                     // 		getCook();
        //                                     // 	}
        //                                     // }
        //                                     //getCookiesSite();
        //                                     unionbank.getCookAll(function () {
        //                                         debugger
        //                                         if (all.banks.accountDetails.days > 0) {
        //                                             all.banks.accounts.unionbank.loadData();
        //                                         } else if (all.banks.accountDetails.ccardMonth > 0) {
        //                                             myEmitterLogs(14);
        //                                             // all.banks.accounts.unionbank.loadAshrai();
        //                                             unionbank.loadAshraiNew();
        //                                         } else if (all.banks.accountDetails.IND_NILVIM > 0) {
        //                                             myEmitterLogs(21); //start loan
        //                                             all.banks.accounts.unionbank.loadLoan();
        //                                         } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
        //                                             myEmitterLogs(34);
        //                                             unionbank.loadMatah();
        //                                         } else {
        //                                             var type = 0;
        //                                             var text = "יציאה מהאתר";
        //                                             all.banks.core.services.reloadPage();
        //                                         }
        //                                     })
        //                                 } else {
        //                                     all.banks.core.services.openBankPage("https://" + all.banks.accounts.unionbank.urlServices + "/eBanking/Accounts/ExtendedActivity.aspx")
        //                                 }
        //                             }
        //                         })
        //                 })
        //         })
        // }
    };
    unionbank.sendLoanCtrl = function (data) {
        all.banks.core.services.sendLoan(all.banks.generalVariables.allDataArrLoan)
            .then(function (arr) {
                myEmitterLogs(17); //start deposit
                unionbank.loadDeposit();
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    unionbank.sendLoanCtrl(data)
                }
            })
    };
    unionbank.sendDepositCtrl = function (data) {
        all.banks.core.services.sendPikdonot(all.banks.generalVariables.allDataArrDeposit)
            .then(function (arr) {
                myEmitterLogs(19); //start dueChecks
                unionbank.synchronizeCookieSets().then(function () {
                    unionbank.loadDueChecks(data);
                });
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    unionbank.sendDepositCtrl(data)
                }
            })
    };
    unionbank.sendDueChecksCtrl = function (data) {
        all.banks.core.services.sendDueChecks(all.banks.generalVariables.allDataArrDueChecks)
            .then(function (arr) {
                myEmitterLogs(23); //start standingOrders
                unionbank.loadStandingOrders(data);
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    unionbank.sendDueChecksCtrl(data)
                }
            })
    };
    unionbank.sendStandingOrdersCtrl = function (data) {
        all.banks.core.services.sendStandingOrders(all.banks.generalVariables.allDataArrStandingOrders)
            .then(function (arr) {
                if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                    myEmitterLogs(34);
                    unionbank.loadMatah();
                } else {
                    unionbank.logOut(data);
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    unionbank.sendStandingOrdersCtrl(data)
                }
            })
    };
    unionbank.sendOshCtrl = function (data, matah) {
        if (!matah) {
            var arr = all.banks.generalVariables.allDataArr;
        } else {
            var arr = all.banks.generalVariables.allDataArrMatah;
        }
        all.banks.core.services.sendOsh(arr, matah)
            .then(function (arr) {
                if (!matah) {
                    if (all.banks.accountDetails.ccardMonth > 0) {
                        myEmitterLogs(14);
                        all.banks.accounts.unionbank.indx = 0;
                        unionbank.loadAshraiNew();
                    } else if (all.banks.accountDetails.IND_NILVIM > 0) {
                        myEmitterLogs(21); //start loan
                        all.banks.accounts.unionbank.loadLoan()
                    } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                        myEmitterLogs(34);
                        unionbank.loadMatah();
                    } else {
                        all.banks.accounts.unionbank.logOut(data);
                    }
                } else {
                    all.banks.accounts.unionbank.logOut(data);
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.unionbank.sendOshCtrl(data, matah)
                }
            })
    };
    unionbank.haAvaraPop = function (url, transTotal, valueDate) {
        var dfd = jQuery.Deferred();

        var referer = 'https://' + all.banks.accounts.unionbank.urlServices + '/' + 'eBanking/Accounts/ExtendedActivity.aspx?p=1';
        var cookie = all.banks.accounts.unionbank.cookies;
        monitorActivityClass.setIntervalActivity();
        senderReq.senderRest(url, referer, cookie, null, resXml);

        function resXml(err, body, response) {
            if (err) {
                dfd.resolve(null);
                return;
            }

            if (!response.headers['content-type'].includes('xml')) {
                let mtchrNamePayerTrnsfer = /<lblBeneficiaryOfNameVal>(.+)<\/lblBeneficiaryOfNameVal>/.exec(body)
                    || /<lblTransferNameVal>(.+)<\/lblTransferNameVal>/.exec(body)
                    || /<lblToNameVal>(.+)<\/lblToNameVal>/.exec(body);
                let mtchrBranchAccountBank = /<lblAccountSachbalVal>(.+)<\/lblAccountSachbalVal>/.exec(body);
                let mtchrDepositeTransferDate = /<lblEffectiveDateVal>(.+)<\/lblEffectiveDateVal>/.exec(body);
                let mtchrDetailsTransfer = /<lblActivityDescriptionVal>(.+)<\/lblActivityDescriptionVal>/.exec(body);
                let mtchrTransferTotal = /<lblAmountVal>(.+)<\/lblAmountVal>/.exec(body);

                const arrs = [], objOne = {};
                if (mtchrTransferTotal !== null) {
                    objOne.TransferTotal = Base64Function.decode(mtchrTransferTotal[1]).replace(/[^\d.]/g, "");

                    objOne.DepositeTransferDate = mtchrDepositeTransferDate != null ? Base64Function.decode(mtchrDepositeTransferDate[1]).replace(/\./g, "/") : null;
                    objOne.NamePayerTransfer = mtchrNamePayerTrnsfer != null ? unionbank.decodeThenUnescape(mtchrNamePayerTrnsfer[1]) : null;
                    objOne.DetailsTransfer = mtchrDetailsTransfer != null ? unionbank.decodeThenUnescape(mtchrDetailsTransfer[1]) : null;

                    let mtchrTrnsferAccBranchAcc;
                    if (mtchrBranchAccountBank !== null) {
                        const mtchrBranchAccountBankVal = Base64Function.decode(mtchrBranchAccountBank[1]);
                        const patterns = [/^(\d{3})-(\d+)-(\d{3})$/, /^(\d{3})(\d+)(\d{3})$/, /^[a-zA-Z]{2}[0-9]{2}(\d{3})(\d+)$/];
                        const patternFound = patterns.some((ptrn, idx) => {
                            if (ptrn.test(mtchrBranchAccountBankVal)) {
                                const mtch = ptrn.exec(mtchrBranchAccountBankVal);
                                if (idx === 2) {
                                    objOne.BankTransferNumber = mtch[1];
                                    objOne.BranchTransferNumber = null;
                                    objOne.AccountTransferNumber = mtch[2];
                                } else {
                                    objOne.BankTransferNumber = mtch[3];
                                    objOne.BranchTransferNumber = mtch[1];
                                    objOne.AccountTransferNumber = mtch[2];
                                }
                                return true;
                            }
                            return false;
                        });
                        if (!patternFound) {
                            objOne.BankTransferNumber = null;
                            objOne.BranchTransferNumber = null;
                            objOne.AccountTransferNumber = null;
                        }
                    } else if ((mtchrTrnsferAccBranchAcc = /<lblTransferBankVal>(.+)<\/lblTransferBankVal>.*<lblTransferBranchVal>(.+)<\/lblTransferBranchVal>.*<lblTransferAccountVal>(.+)<\/lblTransferAccountVal>/g.exec(body))
                        !== null) {
                        objOne.BankTransferNumber = Base64Function.decode(mtchrTrnsferAccBranchAcc[1]).replace(/\D/g, "");
                        objOne.BranchTransferNumber = Base64Function.decode(mtchrTrnsferAccBranchAcc[2]).replace(/\D/g, "");
                        objOne.AccountTransferNumber = Base64Function.decode(mtchrTrnsferAccBranchAcc[3]).replace(/\D/g, "");
                    } else if ((mtchrTrnsferAccBranchAcc = /<lblBranchMasavVal>(.+)<\/lblBranchMasavVal>.*<lblAccountMasavVal>(.+)<\/lblAccountMasavVal>.*<lblBankMasavVal>(.+)<\/lblBankMasavVal>/g.exec(body))
                        !== null) {
                        objOne.BankTransferNumber = Base64Function.decode(mtchrTrnsferAccBranchAcc[3]).replace(/\D/g, "");
                        objOne.BranchTransferNumber = Base64Function.decode(mtchrTrnsferAccBranchAcc[1]).replace(/\D/g, "");
                        objOne.AccountTransferNumber = Base64Function.decode(mtchrTrnsferAccBranchAcc[2]).replace(/\D/g, "");
                    }
                    arrs.push(objOne);
                }
                dfd.resolve(arrs);
                return;
            }

            var xmlData = $.parseXML(body);
            var xmlDataTable = $(xmlData).find("table");
            var len = xmlDataTable.find("body row").length;
            if (len > 0) {
                function addIfValid(dtdObj, arr) {
                    if (dtdObj && dtdObj.TransferTotal && dtdObj.TransferTotal.length > 0) {
                        arr.push(dtdObj);
                    }
                }

                if (len == 1 && xmlDataTable.find("body row td").length == 1) {
                    dfd.resolve(null, unionbank.decodeThenUnescape(xmlDataTable.find("body row td").text()));
                } else {
                    var arrs = [], objOne = {};
                    xmlDataTable.find("body row").each(function (i) {
                        if (len > 1) {
                            if ($(this).find('td').length < 3) {
                                if (i + 1 < len) {
                                    var decodeXmlVal = unionbank.decodeThenUnescape($(this).find('td').eq(1).text());
                                    objOne.DepositeTransferDate = valueDate;
                                    objOne.TransferTotal = transTotal;
                                    var id;
                                    var arrXml = decodeXmlVal.split(' ');
                                    //$(arrXml).each(function (i, v) {
                                    //	var val = parseFloat(v);
                                    //	if (!isNaN(val)) {
                                    //		id = i;
                                    //		return false;
                                    //	}
                                    //});
                                    $(arrXml).each(function (i, v) {
                                        if (v.split("-").length == 3) {
                                            id = i;
                                            return false;
                                        }
                                    });

                                    //var numbersBanks = decodeXmlVal.substring(id, decodeXmlVal.length).split('-');

                                    var numbersBanks = arrXml[id].split("-");
                                    objOne.BankTransferNumber = numbersBanks[0].replace(/\D/g, "");
                                    objOne.BranchTransferNumber = numbersBanks[1].replace(/\D/g, "");
                                    objOne.AccountTransferNumber = numbersBanks[2].replace(/\D/g, "");

                                    delete arrXml[id];
                                    var NamePayerTransfer = arrXml.join().replace(/,/g, ' ').trim();
                                    //var NamePayerTransfer = decodeXmlVal.substring(0, id - 1);
                                    if (NamePayerTransfer == "") {
                                        NamePayerTransfer = null;
                                    }
                                    objOne.NamePayerTransfer = NamePayerTransfer;
                                } else {
                                    objOne.DetailsTransfer = Base64Function.decode($(this).find('td').eq(0).text());
                                    addIfValid(objOne, arrs);//arrs.push(objOne);
                                    dfd.resolve(arrs);
                                    xmlData = null;
                                    xmlDataTable = null;
                                }
                            } else {
                                var obj = {};
                                if (i + 1 < len) {
                                    var decodeXmlVal = unionbank.decodeThenUnescape($(this).find('td').eq(1).text());
                                    obj.DepositeTransferDate = valueDate;
                                    obj.TransferTotal = unionbank.decodeThenUnescape($(this).find('td').eq(2).text()).replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, '');
                                    var id;
                                    //var arrXml = decodeXmlVal.split('');
                                    var arrXml = decodeXmlVal.split(' ');
                                    $(arrXml).each(function (i, v) {
                                        if (v.split("-").length == 3) {
                                            id = i;
                                            return false;
                                        }
                                    });
                                    //$(arrXml).each(function (i, v) {
                                    //	var val = parseFloat(v);
                                    //	if (!isNaN(val)) {
                                    //		id = i;
                                    //		return false;
                                    //	}
                                    //});
                                    //var numbersBanks = decodeXmlVal.substring(id, decodeXmlVal.length).split('-');
                                    var numbersBanks = arrXml[id].split("-");
                                    obj.BankTransferNumber = numbersBanks[0].replace(/\D/g, "");
                                    obj.BranchTransferNumber = numbersBanks[1].replace(/\D/g, "");
                                    obj.AccountTransferNumber = numbersBanks[2].replace(/\D/g, "");
                                    delete arrXml[id];
                                    var NamePayerTransfer = arrXml.join().replace(/,/g, ' ').trim();
                                    //var NamePayerTransfer = decodeXmlVal.substring(0, id - 1);
                                    if (NamePayerTransfer == "") {
                                        NamePayerTransfer = unionbank.decodeThenUnescape($(this).find('td').eq(0).text());
                                        if (NamePayerTransfer == "") {
                                            NamePayerTransfer = null;
                                        }
                                    }
                                    obj.NamePayerTransfer = NamePayerTransfer;
                                    var DetailsTransfer2 = unionbank.decodeThenUnescape($(this).find('td').eq(3).text());
                                    obj.DetailsTransfer = DetailsTransfer2;
                                    addIfValid(obj, arrs);//arrs.push(obj);
                                } else {
                                    dfd.resolve(arrs);
                                    xmlData = null;
                                    xmlDataTable = null;
                                }
                            }
                        } else {
                            var td1 = unionbank.decodeThenUnescape($(this).find('td').eq(0).text());
                            var td2 = unionbank.decodeThenUnescape($(this).find('td').eq(1).text());
                            var td3 = unionbank.decodeThenUnescapee($(this).find('td').eq(2).text());
                            var td4 = unionbank.decodeThenUnescape($(this).find('td').eq(3).text());

                            objOne.DetailsTransfer = td4;
                            objOne.DepositeTransferDate = valueDate;
                            objOne.TransferTotal = td3.replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, '');
                            objOne.BankTransferNumber = td2[0].replace(/\D/g, "");
                            objOne.BranchTransferNumber = td2[1].replace(/\D/g, "");
                            objOne.AccountTransferNumber = td2[2].replace(/\D/g, "");
                            objOne.NamePayerTransfer = td1;
                            addIfValid(objOne, arrs);//arrs.push(objOne);

                            dfd.resolve(arrs);
                            xmlData = null;
                            xmlDataTable = null;
                        }
                    });
                }
            } else {
                dfd.resolve(null);
            }
        }

        return dfd.promise();
    };
    unionbank.getCookAll = function (cb) {
        if (cb) {
            setCookAll(cb);
        } else {
            $.get("https://" + all.banks.accounts.unionbank.urlServices + "/ebanking/SessionExtension.aspx")
                .done(function () {
                    setCookAll();
                })
        }

        function setCookAll(cb) {
            // var cook = '';
            // var win = nw.Window.get();
            // win.cookies.getAll({},
            //     function (cookies) {
            //         if (cookies && cookies.length) {
            //             var nisSort = 0;
            //             for (var i = 0; i < cookies.length; i++) {
            //                 if (cookies[i].domain == all.banks.accounts.unionbank.urlServices) {
            //                     if (cookies[i].name == "NisDateSort") {
            //                         nisSort = 1;
            //                         cook += cookies[i].name + "=0;";
            //                     } else {
            //                         cook += cookies[i].name + "=" + cookies[i].value + ";";
            //                     }
            //                 }
            //                 if (cookies.length == i + 1) {
            //                     if (nisSort == 0) {
            //                         cook += "NisDateSort=0;";
            //                     }
            //                     all.banks.accounts.unionbank.cookies = cook;
            //                     if (cb) {
            //                         cb();
            //                         setTimeout(function () {
            //                             unionbank.getCookAll();
            //                         }, 240000);
            //                     } else {
            //                         setTimeout(function () {
            //                             unionbank.getCookAll();
            //                         }, 240000);
            //                     }
            //                 }
            //             }
            //         } else {
            //             myEmitterLogs(9, 'cookies unavailable');
            //         }
            //     });


            win.cookies.getAll({}, function (cool) {
                if (cool && cool.length) {
                    all.banks.accounts.unionbank.cookies = cool
                        .map(ck => {
                            return ck.name + "=" + (ck.name === "NisDateSort" ? "0" : ck.value);
                        })
                        .join(";");
                    if (cb) {
                        cb();
                        setTimeout(function () {
                            unionbank.getCookAll();
                        }, 240000);
                    } else {
                        setTimeout(function () {
                            unionbank.getCookAll();
                        }, 240000);
                    }
                } else {
                    myEmitterLogs(9, 'cookies unavailable');
                }

            });
        }
    }
    unionbank.sendChecksCtrl = function (formData, cb) {
        all.banks.core.services.sendChecks(formData)
            .then(function (arr) {
                all.banks.generalVariables.numChecksDrawn += 1;
                cb();
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.unionbank.sendChecksCtrl(formData, cb)
                } else {
                    cb();
                }
            })
    };
    unionbank.sendCardsCtrl = function (data) {
        all.banks.core.services.sendCards(all.banks.generalVariables.allDataArrAshrai)
            .then(function (arr) {
                if (all.banks.accountDetails.IND_NILVIM > 0) {
                    myEmitterLogs(21); //start loan
                    all.banks.accounts.unionbank.loadLoan();
                } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                    myEmitterLogs(34);
                    unionbank.loadMatah();
                } else {
                    all.banks.accounts.unionbank.logOut(data);
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.unionbank.sendCardsCtrl(data)
                }
            })
    };
    unionbank.getAcc = function (accVal) {
        var arrAccBranch = [];
        var arr = accVal.split(' ');
        if (arr.length) {
            $.each(arr, function (i, v) {
                if (v.split('-').length > 1 && v.split('-')[0].replace(/\D/g, "").length && v.split('-')[1].replace(/\D/g, "").length) {
                    arrAccBranch[1] = parseInt(v.split('-')[0].replace(/\D/g, ""));                     //branch
                    arrAccBranch[0] = parseInt(v.split('-')[1].replace('/', '').replace(/\D/g, ""));    //account
                }
            })
        } else {
            arrAccBranch[1] = parseInt(accVal.split('-')[0].replace(/\D/g, ""));                         //branch
            arrAccBranch[0] = parseInt(accVal.split('-')[1].replace('/', '').replace(/\D/g, ""));        //account
        }
        return arrAccBranch;
    }
    unionbank.convertDateLocal = function (dateLocal) {
        const dateMatch = /\D*(\d{1,2})\/(\d{1,2})\/(\d{2,4})\D*/gm.exec(dateLocal);
        if (dateMatch === null) {
            return "";
        }
        let year = +dateMatch[3];
        if (year < 100) {
            year += 2000;
        }
        return [dateMatch[2], dateMatch[1], year].join('/');

//		var dateFormat = "";
//		if (dateLocal !== undefined && dateLocal !== null) {
//			dateLocal = dateLocal.toString();
//			if (dateLocal !== "") {
//				dateFormat = dateLocal.split("/")[1] + "/" + dateLocal.split("/")[0] + "/" + dateLocal.split("/")[2];
//			}
//		}
//		return dateFormat;
    }
    unionbank.loadData = function () {
        all.banks.core.services.httpReq("https://" + all.banks.accounts.unionbank.urlServices + "/eBanking/Accounts/ExtendedActivity.aspx", 'GET', null, false, false)
            .then(function (data1) {
                all.banks.core.services.httpReq("https://hb.unionbank.co.il/eBanking/Accounts/ExtendedActivity.aspx", 'GET', null, false, false)
                    .then(function (data) {
                        console.log("loadData()");
                        var data = all.banks.core.services.parseHtml(data);
                        try {
                            if (data.find(".errInfo").length && data.find(".errInfo").text().indexOf("לא נמצאו חשבונות") !== -1) {
                                console.log("not exist acc");
                                unionbank.logOut(data);
                                data = null;
                            } else {
                                console.log("acc exist");
                                myEmitterLogs(11);
                                data.find('#ddlAccounts_m_ddl option').each(function (i, v) {
                                    if ($(v).val() == "-1") {
                                        $(v).remove();
                                    } else {
                                        if (all.banks.accountDetails.deleted_account_ids.length) {
                                            const accVal = $(v).text();
                                            const accountNumber = unionbank.getAcc(accVal);
                                            if (accountNumber.length) {
                                                if (all.banks.accountDetails.deleted_account_ids.some(it => accountNumber[0].toString().includes(it.toString()))) {
                                                    $(v).remove()
                                                }
                                            }
                                        }
                                    }
                                });
                                all.banks.accounts.unionbank.dd = data.find('#ddlAccounts_m_ddl');
                                unionbank.ibc = all.banks.accounts.unionbank.dd.find('option').length - 1;
                                if (unionbank.ibc < 0) {
                                    unionbank.sendOshCtrl(data);
                                    return;
                                }

                                all.banks.core.services.httpReq("https://" + all.banks.accounts.unionbank.urlServices + "/eBanking/Accounts/CreditLines.aspx", 'GET', null, false, false)
                                    .then(function (responseCr) {
                                        var responseCr = all.banks.core.services.parseHtml(responseCr);
                                        unionbank.synchronizeCookieSets().then(function () {
                                            try {
                                                if (unionbank.ibc > 0) {
                                                    if (responseCr.find(".errMsgGlobal").length && (responseCr.find(".errMsgGlobal").text().indexOf("לא נמצאו מסגרות") !== -1 || responseCr.find(".errMsgGlobal").text().indexOf("לא הוגדרה מסגרת") !== -1)) {
                                                        all.banks.accounts.unionbank.accountCreditAcc = 0;
                                                        nextAfterLine();
                                                    } else {
                                                        if (responseCr.find('table#tblChecking1').length > 0 && responseCr.find('table#tblChecking1 tr.footer td').length) {
                                                            all.banks.accounts.unionbank.accountCreditAcc = responseCr.find('table#tblChecking1 tr.footer td').eq(0).text().replace(/[^0-9\.]/g, "");
                                                        }
                                                        // responseCr.find("td").each(function () {
                                                        //     var td = $(this).text().indexOf("מסגרת עו\"ש");
                                                        //     if (td !== -1) {
                                                        //         all.banks.accounts.unionbank.accountCreditAcc = $(this).next().text().replace(/[^0-9\.]/g, "");
                                                        //     }
                                                        // })
                                                        nextAfterLine();
                                                    }
                                                } else {
                                                    if (data.find('#lblCreditLineVal').length > 0) {
                                                        all.banks.accounts.unionbank.accountCreditAcc = data.find('#lblCreditLineVal').text().replace(/[^0-9\.]/g, "");
                                                    } else {
                                                        all.banks.accounts.unionbank.accountCreditAcc = null;
                                                    }
                                                    if (responseCr.find(".errMsgGlobal").length && (responseCr.find(".errMsgGlobal").text().indexOf("לא נמצאו מסגרות") !== -1 || responseCr.find(".errMsgGlobal").text().indexOf("לא הוגדרה מסגרת") !== -1)) {
                                                        all.banks.accounts.unionbank.accountCreditAcc = 0;
                                                        nextAfterLine();
                                                    } else {
                                                        if (responseCr.find('table#tblChecking1').length > 0 && responseCr.find('table#tblChecking1 tr.footer td').length) {
                                                            all.banks.accounts.unionbank.accountCreditAcc = responseCr.find('table#tblChecking1 tr.footer td').eq(0).text().replace(/[^0-9\.]/g, "");
                                                        }
                                                        // responseCr.find("td").each(function () {
                                                        //     var td = $(this).text().indexOf("מסגרת עו\"ש");
                                                        //     if (td !== -1) {
                                                        //         all.banks.accounts.unionbank.accountCreditAcc = $(this).next().text().replace(/[^0-9\.]/g, "");
                                                        //     }
                                                        // })
                                                        nextAfterLine();
                                                    }
                                                }
                                            } catch (e) {
                                                var logErr = "err ddAccLine, status: " + e;
                                                all.banks.core.services.errorLog(logErr);
                                            }
                                        })
                                    });

                                function nextAfterLine() {
                                    all.banks.accounts.unionbank.loadAllData();

                                    // senderReq.senderGetRest("https://" + all.banks.accounts.unionbank.urlServices + "/eBanking/Accounts/ExtendedActivity.aspx", all.banks.accounts.unionbank.cookies, resGet);
                                    // console.log("senderGetRest ExtendedActivity loadData()");
                                    //
                                    // function resGet(err, data) {
                                    //     //all.banks.accounts.unionbank.cookies = cookAll;
                                    //     if (err) {
                                    //         console.log("err senderGetRest ExtendedActivity loadData()");
                                    //         var logErr = "restUrl: uniquesig0/eBanking/Accounts/ExtendedActivity.aspx, status: " + err;
                                    //         all.banks.core.services.errorLog(logErr)
                                    //     } else {
                                    //         console.log("body senderGetRest ExtendedActivity loadData()");
                                    //         all.banks.accounts.unionbank.loadAllData();
                                    //         data = null;
                                    //     }
                                    // }
                                }
                            }
                        } catch (err) {
                            data = null;
                            all.banks.core.services.errorLog(err)
                        }
                    })
                    .fail(function (error, resErr, urlParam) {
                        var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                        all.banks.core.services.errorLog(logErr)
                    });
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    };
    unionbank.loadAllData = function (VIEWSTATE, EVENTVALIDATION) {
        // unionbank.synchronizeCookieSets().then(function () {
        //
        // });

        console.log("loadAllData()");
        monitorActivityClass.setIntervalActivity();
        senderReq.senderGetRest("https://" + all.banks.accounts.unionbank.urlServices + "/eBanking/Accounts/ExtendedActivity.aspx", all.banks.accounts.unionbank.cookies, resGetData);
        console.log("senderGetRest Get ExtendedActivity loadAllData()");
        let tryDefaultDates = false;

        function resGetData(err, responseGet) {
            //all.banks.accounts.unionbank.cookies = cookAll;

            if (err) {
                console.log("err senderGetRest ExtendedActivity loadAllData()");
                var logErr = "restUrl: uniquesig0/eBanking/Accounts/ExtendedActivity.aspx, status: " + err;
                all.banks.core.services.errorLog(logErr);
            } else {
                console.log("body senderGetRest ExtendedActivity loadAllData()");
                var responseGet = all.banks.core.services.parseHtml(responseGet);
                all.banks.accounts.unionbank.dataInputs = responseGet;
                try {
                    var dataJson = {
                        '__EVENTTARGET': '',
                        '__EVENTARGUMENT': '',
                        'DES_Group': '',
                        '__VIEWSTATE': responseGet.find('#__VIEWSTATE').val(),
                        'DES_JSE': 1,
                        '__VIEWSTATEGENERATOR': responseGet.find('#__VIEWSTATEGENERATOR').val(),
                        '__EVENTVALIDATION': responseGet.find('#__EVENTVALIDATION').val(),
                        'hidtabindexCount': '121',
                        'hidExitValue': '0',
                        'hideGoogleSerachAlert': 'הוזן תו לא חוקי',
                        'AjaxSaveAS': '',
                        'ddlTransactionType': '001',
                        'ddlTransactionPeriod': '004',
                        'ddlAdvSearchCreditDebt': '001',
                        'ddlAdvSearchAmountSet': '001',
                        'dtFromDate$textBox': all.banks.accounts.unionbank.datebackslesh,
                        'dtToDate$textBox': all.banks.accounts.unionbank.datebacksleshTo,
                        'btnDisplayDates.x': '19',
                        'btnDisplayDates.y': '7',
                        'txtAdvSearchAmount': '',
                        'txtAdvSearchReference': '',
                        'popAnnotation$tbAnnotation': '',
                        'popAnnotation$hItemIndex': '',
                        'popAssignCategory$tbSubCategory': '',
                        'popAssignCategory$lblParentCategory': '',
                        'popAssignCategory$hTransactionID': '',
                        'popAssignCategory$hParentCategoryID': '',
                        'popAssignCategory$hCategoryCardIndex': '',
                        'popAssignCategory$hSubcategoryID': '',
                        'popAssignCategory$hAnnotationText': '',
                        'popDescriptionData$lblParentCategory': '',
                        'popDescriptionData$hTransactionID': '',
                        'popDescriptionData$hParentCategoryID': '',
                        'popDescriptionData$hCategoryCardIndex': '',
                        'popDescriptionData$hSubcategoryID': '',
                        'popDescriptionData$hAnnotationText': '',
                        'hidSaveAsChoice': '',
                        'popupLobyPage$hItemIndex': '',
                        'hidExcel': '0',
                        'hShowAdvSearch': 'false',
                        'hShowCurrentBalanceIncludingToday': 'false',
                        'hidDescriptionTitle': '',
                        'FAVORITESDROPDOWN': '#',
                        'hErrorDescriptionMsg': 'זמנית לא ניתן להציג נתונים בנושא זה',
                        'ddlAccounts$m_ddl': unionbank.dd.find('option').eq(unionbank.indx).val()
                    }

                    // if(unionbank.dd.find('option').length > 1) {
                    //     dataJson['ddlAccounts$m_ddl'] = unionbank.dd.find('option').eq(unionbank.indx).val();
                    // }
                } catch (err) {
                    all.banks.core.services.errorLog(err);
                }

                // unionbank.synchronizeCookieSets().then(function () {
                //
                // });
                monitorActivityClass.setIntervalActivity();
                var url = "https://" + all.banks.accounts.unionbank.urlServices + "/eBanking/Accounts/ExtendedActivity.aspx";
                senderReq.senderRest(url, url, all.banks.accounts.unionbank.cookies, dataJson, resReqPostData);
                console.log("senderGetRest POST ExtendedActivity loadAllData()");

                function resReqPostData(err, body) {
                    //all.banks.accounts.unionbank.cookies = cookAll;
                    if (err) {
                        console.log("err senderGetRest POST ExtendedActivity loadAllData()");
                        if (!tryDefaultDates && err.code === 'ETIMEDOUT') {
                            tryDefaultDates = true;
                            const dfltDates = [all.banks.accounts.unionbank.dataInputs.find('[name="dtFromDate$textBox"]').val(),
                                all.banks.accounts.unionbank.dataInputs.find('[name="dtToDate$textBox"]').val()];
                            writeLog('Osh request for period '
                                + all.banks.accounts.unionbank.datebackslesh + ' - ' + all.banks.accounts.unionbank.datebacksleshTo + ' failed with ' + err.code
                                + '. Retrying with period ' + dfltDates[0] + ' - ' + dfltDates[1]);
                            dataJson['dtFromDate$textBox'] = dfltDates[0];
                            dataJson['dtToDate$textBox'] = dfltDates[1];
                            // unionbank.synchronizeCookieSets().then(function () {
                            //
                            // });
                            monitorActivityClass.setIntervalActivity();
                            senderReq.senderRest(url, url, all.banks.accounts.unionbank.cookies, dataJson, resReqPostData);
                        } else {
                            var logErr = "restUrl: " + url + ", status: " + err;
                            all.banks.core.services.errorLog(logErr);
                        }
                    } else {
                        console.log("body senderGetRest POST ExtendedActivity loadAllData()");
                        dataJson = null;
                        responseGet = null;
                        try {
                            var data = all.banks.core.services.parseHtml(body);
                            all.banks.accounts.unionbank.dataInputs = data;
                            if (data.find(".errInfo").length && data.find(".errInfo").text().indexOf("לא נמצאו חשבונות") !== -1) {
                                unionbank.logOut(data);
                            } else {
                                var accVal = unionbank.dd.find('option').eq(all.banks.accounts.unionbank.indx).text();
                                unionbank.valSelectAcc = unionbank.dd.find('option').eq(all.banks.accounts.unionbank.indx).val();
                                if (data.find('#lblBalancesVal').length > 0) {
                                    all.banks.accounts.unionbank.balanceAcc = data.find('#lblBalancesVal').text().replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, '');
                                } else {
                                    all.banks.accounts.unionbank.balanceAcc = null;
                                }
                                if (unionbank.ibc == 0) {
                                    loadNextAllPage();
                                } else {
                                    // if (data.find('#lblCreditLineVal').length > 0) {
                                    //     all.banks.accounts.unionbank.accountCreditAcc = data.find('#lblCreditLineVal').text().replace(/[^0-9\.]/g, "");
                                    // } else {
                                    //     all.banks.accounts.unionbank.accountCreditAcc = null;
                                    // }
                                    senderReq.senderGetRest("https://" + all.banks.accounts.unionbank.urlServices + "/ebanking/Accounts/CreditLines.aspx", all.banks.accounts.unionbank.cookies, resGetDataCreditLines);
                                    console.log("senderGetRest Get CreditLines()");

                                    function resGetDataCreditLines(err, responseGetCreditLines) {
                                        if (err) {
                                            console.log("err senderGetRest ExtendedActivity loadAllData()");
                                            var logErr = "restUrl: uniquesig0/eBanking/Accounts/ExtendedActivity.aspx, status: " + err;
                                            all.banks.core.services.errorLog(logErr);
                                        } else {
                                            var responseGetCreditLines = all.banks.core.services.parseHtml(responseGetCreditLines);
                                            var dataJsonAcc = {
                                                "__EVENTTARGET": "ddlAccountsNative",
                                                "__EVENTARGUMENT": "",
                                                "__LASTFOCUS": "",
                                                "__VIEWSTATE": responseGetCreditLines.find('#__VIEWSTATE').val(),
                                                "DES_JSE": "1",
                                                "__VIEWSTATEGENERATOR": "",
                                                "__EVENTVALIDATION": responseGetCreditLines.find('#__EVENTVALIDATION').val(),
                                                "hidtabindexCount": "121",
                                                "hidExitValue": "0",
                                                "hideGoogleSerachAlert": "הוזן תו לא חוקי",
                                                "AjaxSaveAS": "",
                                                "ddlAccountsNative": unionbank.dd.find('option').eq(unionbank.indx).val(),
                                                "hidSaveAsChoice": "",
                                                "txtSearchValue": "חפש"
                                            }
                                            var urlsAcc = "https://" + all.banks.accounts.unionbank.urlServices + "/ebanking/Accounts/CreditLines.aspx";

                                            // unionbank.synchronizeCookieSets().then(function () {
                                            //
                                            // });
                                            monitorActivityClass.setIntervalActivity();
                                            senderReq.senderRest(urlsAcc, urlsAcc, all.banks.accounts.unionbank.cookies, dataJsonAcc, resReqPostDataAcc);
                                            console.log("senderGetRest POST ExtendedActivity loadAllData()");

                                            function resReqPostDataAcc(err, responseCr) {
                                                if (err) {
                                                    loadNextAllPage();
                                                } else {
                                                    try {
                                                        var responseCr = all.banks.core.services.parseHtml(responseCr);
                                                        if (responseCr.find(".errMsgGlobal").length && (responseCr.find(".errMsgGlobal").text().indexOf("לא נמצאו מסגרות") !== -1 || responseCr.find(".errMsgGlobal").text().indexOf("לא הוגדרה מסגרת") !== -1)) {
                                                            all.banks.accounts.unionbank.accountCreditAcc = 0;
                                                            loadNextAllPage();
                                                        } else {
                                                            if (responseCr.find('table#tblChecking1').length > 0 && responseCr.find('table#tblChecking1 tr.footer td').length) {
                                                                all.banks.accounts.unionbank.accountCreditAcc = responseCr.find('table#tblChecking1 tr.footer td').eq(0).text().replace(/[^0-9\.]/g, "");
                                                            }
                                                            if (all.banks.accounts.unionbank.accountCreditAcc == null) {
                                                                all.banks.accounts.unionbank.accountCreditAcc = 0;
                                                            }
                                                            loadNextAllPage();
                                                            // var lenTd = responseCr.find("tr.item td");
                                                            // if (lenTd.length) {
                                                            //     lenTd.each(function (ind, val) {
                                                            //         var td = $(this).text().indexOf("מסגרת עו\"ש");
                                                            //         if (td !== -1) {
                                                            //             all.banks.accounts.unionbank.accountCreditAcc = $(this).next().text().replace(/[^0-9\.]/g, "");
                                                            //         }
                                                            //         if (lenTd.length == ind + 1) {
                                                            //             loadNextAllPage();
                                                            //         }
                                                            //     });
                                                            // } else {
                                                            //     if (all.banks.accounts.unionbank.accountCreditAcc == null) {
                                                            //         all.banks.accounts.unionbank.accountCreditAcc = 0;
                                                            //     }
                                                            //     loadNextAllPage();
                                                            // }
                                                        }
                                                    } catch (e) {
                                                        if (all.banks.accounts.unionbank.accountCreditAcc == null) {
                                                            all.banks.accounts.unionbank.accountCreditAcc = 0;
                                                        }
                                                        loadNextAllPage();
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                                function loadNextAllPage() {
                                    var accBranchNumber = unionbank.getAcc(accVal);
                                    var acc = {
                                        'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                        'AccountNumber': accBranchNumber[0],
                                        'BranchNumber': accBranchNumber[1],
                                        'Balance': all.banks.accounts.unionbank.balanceAcc,
                                        'AccountCredit': parseFloat(all.banks.accounts.unionbank.accountCreditAcc)
                                    };
                                    all.banks.generalVariables.allDataArr.BankData[0].Account.push(acc);
                                    myEmitterLogs(10, acc.AccountNumber);

                                    if (all.banks.accounts.unionbank.indx > 0) {
                                        myEmitterLogs(29);
                                        all.banks.generalVariables.numChecksDrawn = 0;
                                        all.banks.generalVariables.numChecksNotWithdrawn = 0;
                                    }
                                    var xmlBuildData;
                                    var xmlBuildDataExist = data.find('#MAINFORM').text().indexOf("BuildData");
                                    if (xmlBuildDataExist !== -1) {
                                        xmlBuildData = data.find('#MAINFORM').text().split("BuildData('")[1].split("');")[0];
                                    }

                                    var xmlParse = $.parseXML(xmlBuildData);
                                    var xmlParseBusinessModel = $(xmlParse).find("BusinessModel");
                                    var arr = [];
                                    if (data.find('#ctlActivityTable').length > 0) {
                                        var arrIndxTh = {};
                                        data.find('#ctlActivityTable tbody').find("tr.header th").each(function (i1, v1) {
                                            if ($(v1).not(".HiddenColumn")) {
                                                if ($(v1).text().indexOf("תאריך") !== -1 && $(v1).text().indexOf("ערך") == -1) {
                                                    arrIndxTh.date = i1;
                                                }
                                                if ($(v1).text().indexOf("תיאור") !== -1) {
                                                    arrIndxTh.transDesc = i1;
                                                }
                                                if ($(v1).text().indexOf("אסמכתא") !== -1) {
                                                    arrIndxTh.asmachta = i1;
                                                }
                                                if ($(v1).text().indexOf("חובה") !== -1) {
                                                    arrIndxTh.hova = i1;
                                                }
                                                if ($(v1).text().indexOf("זכות") !== -1) {
                                                    arrIndxTh.zchut = i1;
                                                }
                                                if ($(v1).text().indexOf("יתרה") !== -1) {
                                                    arrIndxTh.balance = i1;
                                                }
                                            }
                                            if (data.find('#ctlActivityTable tbody').find("tr.header th").length == i1 + 1) {
                                                data.find('#ctlActivityTable tbody').find('tr.ExtendedActivity_ForPrint').each(function (i, v) {
                                                    var objectRow = {};
                                                    var date = v.cells[arrIndxTh.date].innerText.replace(/\s/g, "").replace(/\*/g, "");
                                                    var hova = v.cells[arrIndxTh.hova].innerText.replace(/\s/g, "").replace(/,/g, '');
                                                    var zchut = v.cells[arrIndxTh.zchut].innerText.replace(/\s/g, "").replace(/,/g, '');
                                                    var asmachta = v.cells[arrIndxTh.asmachta].innerText;
                                                    var transDesc = v.cells[arrIndxTh.transDesc].innerText.replace(/\n/g, "").replace(/\t/g, "");
                                                    var balance = v.cells[arrIndxTh.balance].innerText.replace(/\s/g, "").replace(/,/g, '');
                                                    date = unionbank.convertDateLocal(date);
                                                    var transactionType, sum;
                                                    if (zchut == '') {
                                                        transactionType = '0';
                                                        sum = hova;
                                                    } else {
                                                        transactionType = '1';
                                                        sum = zchut;
                                                    }
                                                    if ($(v).children('td').eq(0).children('div').hasClass('additionalPlus')) {
                                                        var id;
                                                        var idXml = $(v).children('td').eq(0).children('div').attr('id');
                                                        var decodeXmlVal = unionbank.decodeThenUnescape($(xmlParseBusinessModel).find('brules_' + idXml).text());
                                                        var IsDisplayLinkToPopup;
                                                        if (decodeXmlVal.indexOf('@') != -1) {
                                                            IsDisplayLinkToPopup = true;
                                                            var additionaldataArr = decodeXmlVal.split('@');
                                                            decodeXmlVal = additionaldataArr[0];
                                                            var arguments = additionaldataArr[6].split('*');
                                                            var urlToPopup = additionaldataArr[3] + "?ExpansionCode=" + arguments[0] + "&ifLink=" + arguments[1] + "&CMID=" + arguments[2] + "&ProcessingDate=" + arguments[3];
                                                        }
                                                        if (decodeXmlVal.indexOf(":") !== -1) {
                                                            decodeXmlVal = decodeXmlVal.split(':')[1];
                                                        }
                                                        var valTextDesc = unionbank.decodeThenUnescape($(xmlParseBusinessModel).find('brules_' + idXml).text());
                                                        if (valTextDesc.indexOf("החזרה") == -1 && valTextDesc.indexOf("נייר") == -1 && valTextDesc.indexOf("שער המרה") == -1 && decodeXmlVal.replace(/\D/g, "") !== "") {
                                                            let bankBranchAccMatch;
                                                            if (urlToPopup) {
                                                                transDesc += " " + decodeXmlVal;
                                                                objectRow.DepositeTransferData = "https://" + all.banks.accounts.unionbank.urlServices + urlToPopup;
                                                            } else if ((bankBranchAccMatch = /:(\D+)(\d{1,3})-(\d{1,3})-(\d{4,})(\D*)/g.exec(valTextDesc)) !== null) {
                                                                objectRow.DepositeTransferData = [
                                                                    {
                                                                        "DepositeTransferDate": all.banks.core.services.convertDateAll(date),
                                                                        "BankTransferNumber": bankBranchAccMatch[2],
                                                                        "BranchTransferNumber": bankBranchAccMatch[3],
                                                                        "AccountTransferNumber": bankBranchAccMatch[4],
                                                                        "NamePayerTransfer": bankBranchAccMatch[1],
                                                                        "DetailsTransfer": valTextDesc.split(bankBranchAccMatch[4])[1],
                                                                        "TransferTotal": sum
                                                                    }];
                                                            } else {
                                                                transDesc += " " + valTextDesc;
                                                            }
                                                        } else {
                                                            transDesc += " " + decodeXmlVal;
                                                            if (urlToPopup) {
                                                                objectRow.DepositeTransferData = "https://" + all.banks.accounts.unionbank.urlServices + urlToPopup;
                                                            }
                                                        }
                                                    }
                                                    if (all.banks.accountDetails.checks && $(v).find('a').length > 0 && $(v).find('a').attr('href').split("'")[0] == "JavaScript:openPopupWindowCustomParams(" && $(v).find('a').attr('href').split("'")[1].indexOf("GetPopupAdditionalDescriptionData.aspx") == -1) {
                                                        objectRow.Asmachta = asmachta;
                                                        objectRow.TransDesc = (transDesc == '') ? null : transDesc.trim();
                                                        objectRow.ValueDate = all.banks.core.services.convertDateAll(date);
                                                        objectRow.TransactionType = transactionType;
                                                        objectRow.TransTotal = sum;
                                                        objectRow.Balance = balance;
                                                        objectRow.IsDaily = "0";
                                                        objectRow.imgs = $(v).find('a').attr('href').split("'")[1];
                                                        arr.push(objectRow);
                                                        //delete objectRow.DepositeTransferData;
                                                    } else if ($(v).find('a').length && $(v).find('a').attr('href').split("'")[0] == "JavaScript:openPopupWindowCustomParams(" && $(v).find('a').attr('href').split("'")[1].indexOf("GetPopupAdditionalDescriptionData.aspx") !== -1) {
                                                        objectRow.DepositeTransferData = $(v).find('a').attr('href').split("'")[1];
                                                        objectRow.Asmachta = asmachta;
                                                        objectRow.TransDesc = (transDesc == '') ? null : transDesc.trim();
                                                        objectRow.ValueDate = all.banks.core.services.convertDateAll(date);
                                                        objectRow.TransactionType = transactionType;
                                                        objectRow.TransTotal = sum;
                                                        objectRow.Balance = balance;
                                                        objectRow.IsDaily = "0";
                                                        objectRow.imgs = null;
                                                        arr.push(objectRow);
                                                    } else if (all.banks.accountDetails.checks && $(v).find('a').length > 0 && $(v).find('a').attr('href').split("'")[0] == "javascript:__doPostBack(") {
                                                        objectRow.Asmachta = asmachta;
                                                        objectRow.TransDesc = (transDesc == '') ? null : transDesc.trim();
                                                        objectRow.ValueDate = all.banks.core.services.convertDateAll(date);
                                                        objectRow.TransactionType = transactionType;
                                                        objectRow.TransTotal = sum;
                                                        objectRow.Balance = balance;
                                                        objectRow.IsDaily = "0";
                                                        objectRow.imgs = {
                                                            list: $(v).find('a').attr('href').split("'")[3]
                                                        };
                                                        arr.push(objectRow);
                                                        //delete objectRow.DepositeTransferData;
                                                    } else {
                                                        if ($(v).find('a').attr('onclick') !== undefined) {
                                                            var haavara = $(v).find('a').attr('onclick').indexOf("OpenDescriptionData");
                                                            if (haavara !== -1) {
                                                                var objArr = $(v).find('a').attr('onclick').substring(haavara, haavara.length).split(');')[0].split("('")[1].replace(/'/g, '').split(',');
                                                                var urls = "https://" + all.banks.accounts.unionbank.urlServices + '/ebanking/partial/Infrastructure/Leumi.Infrastructure.HttpReqHandler.UI/HttpReqHandler.ashx?init=ajaxbm&eventReqArg=PopUpAdditionalDescriptionData&referenceNumber=' + objArr[1] + '&accIndex=' + objArr[2] + '&segmentationFlag=' + objArr[4] + '&etCurrentType=' + objArr[5] + '&transactionCounter=' + objArr[6] + '&actionType=' + objArr[7] + '&popupID=' + objArr[0] + '&effectiveDate=' + objArr[8] + '&&_=' + new Date().getTime();
                                                                objectRow.DepositeTransferData = urls;
                                                            }
                                                        }
                                                        objectRow.Asmachta = asmachta;
                                                        objectRow.TransDesc = (transDesc == '') ? null : transDesc.trim();
                                                        objectRow.ValueDate = all.banks.core.services.convertDateAll(date);
                                                        objectRow.TransactionType = transactionType;
                                                        objectRow.TransTotal = sum;
                                                        objectRow.Balance = balance;
                                                        objectRow.IsDaily = "0";
                                                        objectRow.imgs = null;
                                                        arr.push(objectRow);
                                                        //delete objectRow.DepositeTransferData;
                                                    }
                                                    if (data.find('#ctlActivityTable tbody').find('tr.ExtendedActivity_ForPrint').length == i + 1) {
                                                        loadTableLower();
                                                    }
                                                })
                                            }
                                        })
                                    } else {
                                        loadTableLower();
                                    }

                                    function loadTableLower() {
                                        var isTableUpper = 0;
                                        var divIdTodyTop = "";
                                        if (data.find('#ctlTodayActivityNapaTableUpper').length) {
                                            divIdTodyTop = "#ctlTodayActivityNapaTableUpper";
                                        } else if (data.find('#ctlTodayActivityTableLower').length) {
                                            divIdTodyTop = "#ctlTodayActivityTableLower";
                                        } else if (data.find('#ctlTodayActivityTableUpper').length) {
                                            isTableUpper = 1;
                                            divIdTodyTop = "#ctlTodayActivityTableUpper";
                                        }
                                        if (data.find(divIdTodyTop).length > 0) {
                                            var arrIndxTh = {};
                                            data.find(divIdTodyTop + ' tbody').find("tr.header th").each(function (i1, v1) {
                                                if ($(v1).text().indexOf("תאריך") !== -1 && $(v1).text().indexOf("ערך") == -1) {
                                                    arrIndxTh.date = i1;
                                                }
                                                if ($(v1).text().indexOf("תיאור") !== -1) {
                                                    arrIndxTh.transDesc = i1;
                                                }
                                                if ($(v1).text().indexOf("אסמכתא") !== -1) {
                                                    arrIndxTh.asmachta = i1;
                                                }
                                                if ($(v1).text().indexOf("חובה") !== -1) {
                                                    arrIndxTh.hova = i1;
                                                }
                                                if ($(v1).text().indexOf("זכות") !== -1) {
                                                    arrIndxTh.zchut = i1;
                                                }
                                                if ($(v1).text().indexOf("יתרה") !== -1) {
                                                    arrIndxTh.balance = i1;
                                                }
                                                if (data.find(divIdTodyTop + ' tbody').find("tr.header th").length == i1 + 1) {
                                                    data.find(divIdTodyTop + ' tbody').find('tr.ExtendedActivity_ForPrint').each(function (i, v) {
                                                        var objectRow = {};
                                                        var date = v.cells[arrIndxTh.date].innerText.replace(/\s/g, "").replace(/\*/g, "");
                                                        var hova = v.cells[arrIndxTh.hova].innerText.replace(/\s/g, "").replace(/,/g, '');
                                                        var zchut = v.cells[arrIndxTh.zchut].innerText.replace(/\s/g, "").replace(/,/g, '');
                                                        var asmachta = v.cells[arrIndxTh.asmachta].innerText;
                                                        var transDesc = v.cells[arrIndxTh.transDesc].innerText.replace(/\n/g, "").replace(/\t/g, "");
                                                        var balance = v.cells[arrIndxTh.balance].innerText.replace(/\s/g, "").replace(/,/g, '');
                                                        date = unionbank.convertDateLocal(date);

                                                        var transactionType, sum;
                                                        if (zchut == '') {
                                                            transactionType = '0';
                                                            sum = hova;
                                                        } else {
                                                            transactionType = '1';
                                                            sum = zchut;
                                                        }
                                                        if ($(v).children('td').eq(0).children('div').hasClass('additionalPlus')) {
                                                            var id;
                                                            var idXml = $(v).children('td').eq(0).children('div').attr('id');
                                                            var decodeXmlVal = unionbank.decodeThenUnescape($(xmlParseBusinessModel).find('brules_' + idXml).text());
                                                            var IsDisplayLinkToPopup;
                                                            if (decodeXmlVal.indexOf('@') != -1) {
                                                                IsDisplayLinkToPopup = true;
                                                                var additionaldataArr = decodeXmlVal.split('@');
                                                                decodeXmlVal = additionaldataArr[0];
                                                                var arguments = additionaldataArr[6].split('*');
                                                                var urlToPopup = additionaldataArr[3] + "?ExpansionCode=" + arguments[0] + "&ifLink=" + arguments[1] + "&CMID=" + arguments[2] + "&ProcessingDate=" + arguments[3];
                                                            }
                                                            if (decodeXmlVal.indexOf(":") !== -1) {
                                                                decodeXmlVal = decodeXmlVal.split(':')[1];
                                                            }
                                                            var valTextDesc = unionbank.decodeThenUnescape($(xmlParseBusinessModel).find('brules_' + idXml).text());
                                                            if (valTextDesc.indexOf("החזרה") == -1 && valTextDesc.indexOf("נייר") == -1 && valTextDesc.indexOf("שער המרה") == -1 && decodeXmlVal.replace(/\D/g, "") !== "") {
//																var returnNumAll = function (arrAll, num) {
//																	function returnNum(arrNumbers, splits) {
//																		var id;
//																		if (splits) {
//																			var arrs = arrNumbers.split('');
//																		} else {
//																			var arrs = arrNumbers;
//																		}
//																		$(arrs).each(function (i, v) {
//																			var val = parseFloat(v);
//																			if (isNaN(val)) {
//																				id = i;
//																				return false;
//																			}
//																		});
//																		return id;
//																	}
//
//																	var text = arrAll.substring(0, num);
//																	var arrRevers = returnNum(text.split('').reverse(), false);
//																	var sumFinish = text.substring(text.length - arrRevers, text.length);
//																	return sumFinish;
//																}
//																var returnNumAllEnd = function (arrAll, num) {
//																	function returnNum(arrNumbers, splits) {
//																		var id;
//																		var arrs = arrNumbers;
//																		$(arrs).each(function (i, v) {
//																			var val = parseFloat(v);
//																			if (isNaN(val)) {
//																				id = i;
//																				return false;
//																			}
//																		});
//																		return id;
//																	}
//
//																	var text = arrAll.substring(num + 1, arrAll.length);
//																	var arrRevers = returnNum(text.split(''), false);
//																	var sumFinish = text.substring(0, arrRevers);
//																	return sumFinish;
//																}
//
//																var textSplitMain;
//																var arrayWords = decodeXmlVal.split(" ");
//																arrayWords.forEach(function (v) {
//																	if (v.split("-").length == 3 && v.split("-")[0].replace(/\D/g, "") !== "" && v.split("-")[1].replace(/\D/g, "") !== "" && v.split("-")[2].replace(/\D/g, "") !== "") {
//																		textSplitMain = v.split("-");
//																	}
//																});
//
//																if (textSplitMain !== undefined) {
//																	var BranchTransferNumber = textSplitMain[1];
//																	var indexMainBranch = decodeXmlVal.indexOf("-" + BranchTransferNumber + "-");
//																	var BankTransferNumber = returnNumAll(decodeXmlVal, indexMainBranch);
//																	var AccountTransferNumber = returnNumAllEnd(decodeXmlVal, (indexMainBranch + BranchTransferNumber.length + 1));
//
//																	var NamePayerTransfer = decodeXmlVal.substring(0, indexMainBranch - BankTransferNumber.length);
//																	var DetailsTransfer = decodeXmlVal.substring((indexMainBranch + 2 + AccountTransferNumber.length + BranchTransferNumber.length), decodeXmlVal.length).trim();
//
//																	if (DetailsTransfer.replace(/\s/g, "") == '') {
//																		DetailsTransfer = null;
//																	}
//
//																	var BankTransferNumberVal, BranchTransferNumberVal,
//																		AccountTransferNumberVal;
//																	if (BankTransferNumber.length == 3) {
//																		BranchTransferNumberVal = BankTransferNumber;
//																		if (BranchTransferNumber.length == 2) {
//																			BankTransferNumberVal = BranchTransferNumber;
//																			AccountTransferNumberVal = AccountTransferNumber;
//																		}
//																		else {
//																			BankTransferNumberVal = AccountTransferNumber;
//																			AccountTransferNumberVal = BranchTransferNumber;
//																		}
//																	}
//																	else if (BranchTransferNumber.length == 3) {
//																		BranchTransferNumberVal = BranchTransferNumber;
//																		if (BankTransferNumber.length == 2) {
//																			BankTransferNumberVal = BankTransferNumber;
//																			AccountTransferNumberVal = AccountTransferNumber;
//																		}
//																		else {
//																			BankTransferNumberVal = AccountTransferNumber;
//																			AccountTransferNumberVal = BankTransferNumber;
//																		}
//																	}
//																	else if (AccountTransferNumber.length == 3) {
//																		BranchTransferNumberVal = AccountTransferNumber;
//																		if (BankTransferNumber.length == 2) {
//																			BankTransferNumberVal = BankTransferNumber;
//																			AccountTransferNumberVal = AccountTransferNumber;
//																		}
//																		else {
//																			BankTransferNumberVal = AccountTransferNumber;
//																			AccountTransferNumberVal = BankTransferNumber;
//																		}
//																	}
//
//																	objectRow.DepositeTransferData = [
//																		{
//																			"DepositeTransferDate": all.banks.core.services.convertDateAll(date),
//																			"BankTransferNumber": BankTransferNumberVal,
//																			"BranchTransferNumber": BranchTransferNumberVal,
//																			"AccountTransferNumber": AccountTransferNumberVal,
//																			"NamePayerTransfer": NamePayerTransfer,
//																			"DetailsTransfer": DetailsTransfer,
//																			"TransferTotal": sum
//																		}
//																	]
//																}
                                                                let bankBranchAccMatch;
                                                                if (urlToPopup) {
                                                                    transDesc += " " + decodeXmlVal;
                                                                    objectRow.DepositeTransferData = "https://" + all.banks.accounts.unionbank.urlServices + urlToPopup;
                                                                } else if ((bankBranchAccMatch = /:(\D+)(\d{1,3})-(\d{1,3})-(\d{4,})(\D*)/g.exec(valTextDesc)) !== null) {
                                                                    objectRow.DepositeTransferData = [
                                                                        {
                                                                            "DepositeTransferDate": all.banks.core.services.convertDateAll(date),
                                                                            "BankTransferNumber": bankBranchAccMatch[2],
                                                                            "BranchTransferNumber": bankBranchAccMatch[3],
                                                                            "AccountTransferNumber": bankBranchAccMatch[4],
                                                                            "NamePayerTransfer": bankBranchAccMatch[1],
                                                                            "DetailsTransfer": valTextDesc.split(bankBranchAccMatch[4])[1],
                                                                            "TransferTotal": sum
                                                                        }];
                                                                } else {
                                                                    transDesc += " " + valTextDesc;
                                                                }
                                                            } else {
                                                                transDesc += " " + decodeXmlVal;
                                                                if (urlToPopup) {
                                                                    objectRow.DepositeTransferData = "https://" + all.banks.accounts.unionbank.urlServices + urlToPopup;
                                                                }
                                                            }
                                                        }
                                                        if (all.banks.accountDetails.checks && $(v).find('a').length > 0 && $(v).find('a').attr('href').split("'")[0] == "JavaScript:openPopupWindowCustomParams(" && $(v).find('a').attr('href').split("'")[1].indexOf("GetPopupAdditionalDescriptionData.aspx") == -1) {
                                                            objectRow.Asmachta = asmachta;
                                                            objectRow.TransDesc = (transDesc == '') ? null : transDesc.trim().replace(/&quot;/g, '"');
                                                            objectRow.ValueDate = all.banks.core.services.convertDateAll(date);
                                                            objectRow.TransactionType = transactionType;
                                                            objectRow.TransTotal = sum;
                                                            objectRow.Balance = balance;
                                                            objectRow.IsDaily = "1";
                                                            objectRow.imgs = $(v).find('a').attr('href').split("'")[1];
                                                            arr.push(objectRow);
                                                            //delete objectRow.DepositeTransferData;
                                                        } else if ($(v).find('a').length && $(v).find('a').attr('href').split("'")[0] == "JavaScript:openPopupWindowCustomParams(" && $(v).find('a').attr('href').split("'")[1].indexOf("GetPopupAdditionalDescriptionData.aspx") !== -1) {
                                                            objectRow.DepositeTransferData = $(v).find('a').attr('href').split("'")[1];
                                                            objectRow.Asmachta = asmachta;
                                                            objectRow.TransDesc = (transDesc == '') ? null : transDesc.trim().replace(/&quot;/g, '"');
                                                            objectRow.ValueDate = all.banks.core.services.convertDateAll(date);
                                                            objectRow.TransactionType = transactionType;
                                                            objectRow.TransTotal = sum;
                                                            objectRow.Balance = balance;
                                                            objectRow.IsDaily = "1";
                                                            objectRow.imgs = null;
                                                            arr.push(objectRow);
                                                        } else if (all.banks.accountDetails.checks && $(v).find('a').length > 0 && $(v).find('a').attr('href').split("'")[0] == "javascript:__doPostBack(") {
                                                            objectRow.Asmachta = asmachta;
                                                            objectRow.TransDesc = (transDesc == '') ? null : transDesc.trim().replace(/&quot;/g, '"');
                                                            objectRow.ValueDate = all.banks.core.services.convertDateAll(date);
                                                            objectRow.TransactionType = transactionType;
                                                            objectRow.TransTotal = sum;
                                                            objectRow.Balance = balance;
                                                            objectRow.IsDaily = "1";
                                                            objectRow.imgs = {
                                                                list: $(v).find('a').attr('href').split("'")[3]
                                                            };
                                                            arr.push(objectRow)
                                                            //delete objectRow.DepositeTransferData;
                                                        } else {
                                                            if ($(v).find('a').attr('onclick') !== undefined) {
                                                                var haavara = $(v).find('a').attr('onclick').indexOf("OpenDescriptionData");
                                                                if (haavara !== -1) {
                                                                    var objArr = $(v).find('a').attr('onclick').substring(haavara, haavara.length).split(');')[0].split("('")[1].replace(/'/g, '').split(',');
                                                                    var urls = "https://" + all.banks.accounts.unionbank.urlServices + '/ebanking/partial/Infrastructure/Leumi.Infrastructure.HttpReqHandler.UI/HttpReqHandler.ashx?init=ajaxbm&eventReqArg=PopUpAdditionalDescriptionData&referenceNumber=' + objArr[1] + '&accIndex=' + objArr[2] + '&segmentationFlag=' + objArr[4] + '&etCurrentType=' + objArr[5] + '&transactionCounter=' + objArr[6] + '&actionType=' + objArr[7] + '&popupID=' + objArr[0] + '&effectiveDate=' + objArr[8] + '&&_=' + new Date().getTime();
                                                                    objectRow.DepositeTransferData = urls;
                                                                }
                                                            }
                                                            objectRow.Asmachta = asmachta;
                                                            objectRow.TransDesc = (transDesc == '') ? null : transDesc.trim().replace(/&quot;/g, '"');
                                                            objectRow.ValueDate = all.banks.core.services.convertDateAll(date);
                                                            objectRow.TransactionType = transactionType;
                                                            objectRow.TransTotal = sum;
                                                            objectRow.Balance = balance;
                                                            objectRow.IsDaily = "1";
                                                            objectRow.imgs = null;
                                                            arr.push(objectRow)
                                                            //delete objectRow.DepositeTransferData;
                                                        }
                                                        if (data.find(divIdTodyTop + ' tbody').find('tr.ExtendedActivity_ForPrint').length == i + 1) {
                                                            var divIdTodyTable = "";
                                                            if (data.find('#ctlTodayActivityTableUpper').length && isTableUpper == 0) {
                                                                divIdTodyTable = "#ctlTodayActivityTableUpper";
                                                            } else if (data.find('#ctlTodayActivityNapaTableLower').length) {
                                                                divIdTodyTable = "#ctlTodayActivityNapaTableLower";
                                                            }

                                                            if (data.find(divIdTodyTable).length && data.find(divIdTodyTable + ' tbody tr.ExtendedActivity_ForPrint').length) {
                                                                data.find(divIdTodyTable + ' tbody tr.ExtendedActivity_ForPrint').each(function (i, v) {
                                                                    var objectRow = {};
                                                                    var date = v.cells[arrIndxTh.date].innerText.replace(/\s/g, "").replace(/\*/g, "");
                                                                    var hova = v.cells[arrIndxTh.hova].innerText.replace(/\s/g, "").replace(/,/g, '');
                                                                    var zchut = v.cells[arrIndxTh.zchut].innerText.replace(/\s/g, "").replace(/,/g, '');
                                                                    var asmachta = v.cells[arrIndxTh.asmachta].innerText;
                                                                    var transDesc = v.cells[arrIndxTh.transDesc].innerText.replace(/\n/g, "").replace(/\t/g, "");
                                                                    var balance = v.cells[arrIndxTh.balance].innerText.replace(/\s/g, "").replace(/,/g, '');
                                                                    date = unionbank.convertDateLocal(date);

                                                                    var transactionType, sum;
                                                                    if (zchut == '') {
                                                                        transactionType = '0';
                                                                        sum = hova;
                                                                    } else {
                                                                        transactionType = '1';
                                                                        sum = zchut;
                                                                    }
                                                                    if ($(v).children('td').eq(0).children('div').hasClass('additionalPlus')) {
                                                                        var id;
                                                                        var idXml = $(v).children('td').eq(0).children('div').attr('id');
                                                                        var decodeXmlVal = unionbank.decodeThenUnescape($(xmlParseBusinessModel).find('brules_' + idXml).text());
                                                                        var IsDisplayLinkToPopup;
                                                                        if (decodeXmlVal.indexOf('@') != -1) {
                                                                            IsDisplayLinkToPopup = true;
                                                                            var additionaldataArr = decodeXmlVal.split('@');
                                                                            decodeXmlVal = additionaldataArr[0];
                                                                            var arguments = additionaldataArr[6].split('*');
                                                                            var urlToPopup = additionaldataArr[3] + "?ExpansionCode=" + arguments[0] + "&ifLink=" + arguments[1] + "&CMID=" + arguments[2] + "&ProcessingDate=" + arguments[3];
                                                                        }
                                                                        if (decodeXmlVal.indexOf(":") !== -1) {
                                                                            decodeXmlVal = decodeXmlVal.split(':')[1];
                                                                        }
                                                                        var valTextDesc = unionbank.decodeThenUnescape($(xmlParseBusinessModel).find('brules_' + idXml).text());
                                                                        if (valTextDesc.indexOf("החזרה") == -1 && valTextDesc.indexOf("נייר") == -1 && valTextDesc.indexOf("שער המרה") == -1 && decodeXmlVal.replace(/\D/g, "") !== "") {
                                                                            let bankBranchAccMatch;
                                                                            if (urlToPopup) {
                                                                                transDesc += " " + decodeXmlVal;
                                                                                objectRow.DepositeTransferData = "https://" + all.banks.accounts.unionbank.urlServices + urlToPopup;
                                                                            } else if ((bankBranchAccMatch = /:(\D+)(\d{1,3})-(\d{1,3})-(\d{4,})(\D*)/g.exec(valTextDesc)) !== null) {
                                                                                objectRow.DepositeTransferData = [
                                                                                    {
                                                                                        "DepositeTransferDate": all.banks.core.services.convertDateAll(date),
                                                                                        "BankTransferNumber": bankBranchAccMatch[2],
                                                                                        "BranchTransferNumber": bankBranchAccMatch[3],
                                                                                        "AccountTransferNumber": bankBranchAccMatch[4],
                                                                                        "NamePayerTransfer": bankBranchAccMatch[1],
                                                                                        "DetailsTransfer": valTextDesc.split(bankBranchAccMatch[4])[1],
                                                                                        "TransferTotal": sum
                                                                                    }];
                                                                            } else {
                                                                                transDesc += " " + valTextDesc;
                                                                                if (urlToPopup) {
                                                                                    objectRow.DepositeTransferData = "https://" + all.banks.accounts.unionbank.urlServices + urlToPopup;
                                                                                }
                                                                            }
                                                                        } else {
                                                                            transDesc += " " + decodeXmlVal;
                                                                            if (urlToPopup) {
                                                                                objectRow.DepositeTransferData = "https://" + all.banks.accounts.unionbank.urlServices + urlToPopup;
                                                                            }
                                                                        }
                                                                    }
                                                                    if (all.banks.accountDetails.checks && $(v).find('a').length > 0 && $(v).find('a').attr('href').split("'")[0] == "JavaScript:openPopupWindowCustomParams(" && $(v).find('a').attr('href').split("'")[1].indexOf("GetPopupAdditionalDescriptionData.aspx") == -1) {
                                                                        objectRow.Asmachta = asmachta;
                                                                        objectRow.TransDesc = (transDesc == '') ? null : transDesc.trim().replace(/&quot;/g, '"');
                                                                        objectRow.ValueDate = all.banks.core.services.convertDateAll(date);
                                                                        objectRow.TransactionType = transactionType;
                                                                        objectRow.TransTotal = sum;
                                                                        objectRow.Balance = balance;
                                                                        objectRow.IsDaily = "1";
                                                                        objectRow.imgs = $(v).find('a').attr('href').split("'")[1];
                                                                        arr.push(objectRow);
                                                                        //delete objectRow.DepositeTransferData;
                                                                    } else if ($(v).find('a').length && $(v).find('a').attr('href').split("'")[0] == "JavaScript:openPopupWindowCustomParams(" && $(v).find('a').attr('href').split("'")[1].indexOf("GetPopupAdditionalDescriptionData.aspx") !== -1) {
                                                                        objectRow.DepositeTransferData = $(v).find('a').attr('href').split("'")[1];
                                                                        objectRow.Asmachta = asmachta;
                                                                        objectRow.TransDesc = (transDesc == '') ? null : transDesc.trim().replace(/&quot;/g, '"');
                                                                        objectRow.ValueDate = all.banks.core.services.convertDateAll(date);
                                                                        objectRow.TransactionType = transactionType;
                                                                        objectRow.TransTotal = sum;
                                                                        objectRow.Balance = balance;
                                                                        objectRow.IsDaily = "1";
                                                                        objectRow.imgs = null;
                                                                        arr.push(objectRow);
                                                                    } else if (all.banks.accountDetails.checks && $(v).find('a').length > 0 && $(v).find('a').attr('href').split("'")[0] == "javascript:__doPostBack(") {
                                                                        objectRow.Asmachta = asmachta;
                                                                        objectRow.TransDesc = (transDesc == '') ? null : transDesc.trim().replace(/&quot;/g, '"');
                                                                        objectRow.ValueDate = all.banks.core.services.convertDateAll(date);
                                                                        objectRow.TransactionType = transactionType;
                                                                        objectRow.TransTotal = sum;
                                                                        objectRow.Balance = balance;
                                                                        objectRow.IsDaily = "1";
                                                                        objectRow.imgs = {
                                                                            list: $(v).find('a').attr('href').split("'")[3]
                                                                        };
                                                                        arr.push(objectRow)
                                                                        //delete objectRow.DepositeTransferData;
                                                                    } else {
                                                                        if ($(v).find('a').attr('onclick') !== undefined) {
                                                                            var haavara = $(v).find('a').attr('onclick').indexOf("OpenDescriptionData");
                                                                            if (haavara !== -1) {
                                                                                var objArr = $(v).find('a').attr('onclick').substring(haavara, haavara.length).split(');')[0].split("('")[1].replace(/'/g, '').split(',');
                                                                                var urls = "https://" + all.banks.accounts.unionbank.urlServices + '/ebanking/partial/Infrastructure/Leumi.Infrastructure.HttpReqHandler.UI/HttpReqHandler.ashx?init=ajaxbm&eventReqArg=PopUpAdditionalDescriptionData&referenceNumber=' + objArr[1] + '&accIndex=' + objArr[2] + '&segmentationFlag=' + objArr[4] + '&etCurrentType=' + objArr[5] + '&transactionCounter=' + objArr[6] + '&actionType=' + objArr[7] + '&popupID=' + objArr[0] + '&effectiveDate=' + objArr[8] + '&&_=' + new Date().getTime();
                                                                                objectRow.DepositeTransferData = urls;
                                                                            }
                                                                        }
                                                                        objectRow.Asmachta = asmachta;
                                                                        objectRow.TransDesc = (transDesc == '') ? null : transDesc.trim().replace(/&quot;/g, '"');
                                                                        objectRow.ValueDate = all.banks.core.services.convertDateAll(date);
                                                                        objectRow.TransactionType = transactionType;
                                                                        objectRow.TransTotal = sum;
                                                                        objectRow.Balance = balance;
                                                                        objectRow.IsDaily = "1";
                                                                        objectRow.imgs = null;
                                                                        arr.push(objectRow)
                                                                        //delete objectRow.DepositeTransferData;
                                                                    }
                                                                    if (data.find(divIdTodyTable + ' tbody').find('tr.ExtendedActivity_ForPrint').length == i + 1) {
                                                                        loadAllNext();
                                                                    }
                                                                })
                                                            } else {
                                                                loadAllNext();
                                                            }
                                                        }
                                                    })
                                                }
                                            })
                                        } else {
                                            loadAllNext();
                                        }
                                    }

                                    function getAllChecks() {
                                        console.log('getAllChecks')
                                        clearTimeout(unionbank.timeOutFunc);
                                        var ret = false;
                                        $(all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.unionbank.indx].DataRow).each(function (i, v) {
                                            if (v.imgs !== null && (Object.prototype.toString.call(v.imgs.list) == '[object Undefined]') && (v.imgs.indexOf('CheckImageViewer.aspx') !== -1)) {
                                                $.when(unionbank.checkAll(v.imgs)).then(function (status, textErr) {
                                                    if (status == null) {
                                                        if (textErr == undefined) {
                                                            v.imgs = [{
                                                                "ImageNameKey": "x"
                                                            }];
                                                        } else {
                                                            v.imgs = [{
                                                                "ImageNameKey": textErr
                                                            }];
                                                        }
                                                        all.banks.generalVariables.numChecksNotWithdrawn += 1;
                                                        try {
                                                            getAllChecks();
                                                        } catch (err) {
                                                            all.banks.core.services.errorLog(err)
                                                        }
                                                    } else {
                                                        var asmachta = v.Asmachta;
                                                        var depositeDate = v.ValueDate.replace(/\*/g, "");
                                                        var checkTotal = v.TransTotal;
                                                        var checkBankNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.unionbank.indx].BankNumber;
                                                        var checkAccountNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.unionbank.indx].AccountNumber;
                                                        var checkBranchNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.unionbank.indx].BranchNumber;
                                                        var checkNumber = v.Asmachta;
                                                        var dateLast = depositeDate.split("/")[2] + depositeDate.split("/")[0] + depositeDate.split("/")[1];
                                                        var uuid = checkBankNumber + '' + checkBranchNumber + '' + checkAccountNumber + '' + parseInt(checkNumber) + '' + parseInt(dateLast) + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.unionbank.indx].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.unionbank.indx].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.unionbank.indx].AccountNumber;
                                                        v.imgs = [{
                                                            "Asmachta": parseInt(asmachta),
                                                            "CheckAccountNumber": parseInt(checkAccountNumber),
                                                            "DepositeDate": depositeDate,
                                                            "CheckBankNumber": parseInt(checkBankNumber),
                                                            "CheckBranchNumber": parseInt(checkBranchNumber),
                                                            "CheckNumber": parseInt(checkNumber),
                                                            "CheckTotal": parseFloat(checkTotal),
                                                            "ImageNameKey": uuid
                                                        }];
                                                        var formData = new FormData();
                                                        var content = status;
                                                        var blob = new Blob([content], {
                                                            type: "text/plain"
                                                        });
                                                        formData.append(uuid, blob);
                                                        all.banks.accounts.unionbank.sendChecksCtrl({
                                                            formData: formData,
                                                            params: {
                                                                imagenamekey: v.imgs[0].ImageNameKey,
                                                                bankId: checkBankNumber,
                                                                snifId: checkBranchNumber,
                                                                accountId: checkAccountNumber
                                                            }
                                                        }, function () {
                                                            formData = null;

                                                            try {
                                                                getAllChecks();
                                                            } catch (err) {
                                                                all.banks.core.services.errorLog(err)
                                                            }
                                                        });
                                                    }
                                                })
                                                ret = true;
                                                return false;
                                            } else if (v.imgs !== null && (Object.prototype.toString.call(v.imgs) == '[object Object]')) {
                                                $.when(all.banks.accounts.unionbank.checksList(v.imgs.list)).then(function (status, urlImg) {
                                                    if (status == true) {
                                                        $.when(unionbank.checkAll(urlImg))
                                                            .then(function (status, textErr) {
                                                                if (status == null) {
                                                                    if (textErr == undefined) {
                                                                        v.imgs = [{
                                                                            "ImageNameKey": "x"
                                                                        }];
                                                                    } else {
                                                                        v.imgs = [{
                                                                            "ImageNameKey": textErr
                                                                        }];
                                                                    }
                                                                    all.banks.generalVariables.numChecksNotWithdrawn += 1;
                                                                    unionbank.timeOutFunc = setTimeout(function () {
                                                                        clearTimeout(unionbank.timeOutFunc);
                                                                        try {
                                                                            getAllChecks()
                                                                        } catch (err) {
                                                                            all.banks.core.services.errorLog(err)
                                                                        }
                                                                    }, 500)
                                                                } else {
                                                                    var asmachta = v.Asmachta;
                                                                    var depositeDate = v.ValueDate.replace(/\*/g, "");
                                                                    var checkTotal = v.TransTotal;
                                                                    var checkBankNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.unionbank.indx].BankNumber;
                                                                    var checkAccountNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.unionbank.indx].AccountNumber;
                                                                    var checkBranchNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.unionbank.indx].BranchNumber;
                                                                    var checkNumber = v.Asmachta;
                                                                    var dateLast = depositeDate.split("/")[2] + depositeDate.split("/")[0] + depositeDate.split("/")[1];
                                                                    var uuid = checkBankNumber + '' + checkBranchNumber + '' + checkAccountNumber + '' + parseInt(checkNumber) + '' + parseInt(dateLast) + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.unionbank.indx].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.unionbank.indx].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.unionbank.indx].AccountNumber;
                                                                    v.imgs = [{
                                                                        "Asmachta": parseInt(asmachta),
                                                                        "CheckAccountNumber": parseInt(checkAccountNumber),
                                                                        "DepositeDate": depositeDate,
                                                                        "CheckBankNumber": parseInt(checkBankNumber),
                                                                        "CheckBranchNumber": parseInt(checkBranchNumber),
                                                                        "CheckNumber": parseInt(checkNumber),
                                                                        "CheckTotal": parseFloat(checkTotal),
                                                                        "ImageNameKey": uuid
                                                                    }];
                                                                    var formData = new FormData();
                                                                    var content = status;
                                                                    var blob = new Blob([content], {
                                                                        type: "text/plain"
                                                                    });
                                                                    formData.append(uuid, blob);
                                                                    all.banks.accounts.unionbank.sendChecksCtrl({
                                                                        formData: formData,
                                                                        params: {
                                                                            imagenamekey: v.imgs[0].ImageNameKey,
                                                                            bankId: checkBankNumber,
                                                                            snifId: checkBranchNumber,
                                                                            accountId: checkAccountNumber
                                                                        }
                                                                    }, function () {
                                                                        formData = null;

                                                                        try {
                                                                            getAllChecks();
                                                                        } catch (err) {
                                                                            all.banks.core.services.errorLog(err)
                                                                        }
                                                                    });
                                                                }
                                                            })
                                                    } else {
                                                        v.imgs = status;
                                                        unionbank.timeOutFunc = setTimeout(function () {
                                                            clearTimeout(unionbank.timeOutFunc);
                                                            try {
                                                                getAllChecks()
                                                            } catch (err) {
                                                                all.banks.core.services.errorLog(err)
                                                            }
                                                        }, 500)
                                                    }
                                                });
                                                ret = true;
                                                return false;
                                            } else if (v.DepositeTransferData !== undefined && v.DepositeTransferData !== null && (Object.prototype.toString.call(v.DepositeTransferData) !== "[object Array]")) {
                                                $.when(all.banks.accounts.unionbank.haAvaraPop(v.DepositeTransferData, v.TransTotal, v.ValueDate)).then(function (status, text) {
                                                    v.DepositeTransferData = status;
                                                    if (text !== undefined) {
                                                        v.TransDesc = v.TransDesc + " " + text;
                                                    }
                                                    unionbank.timeOutFunc = setTimeout(function () {
                                                        clearTimeout(unionbank.timeOutFunc);
                                                        try {
                                                            getAllChecks();
                                                        } catch (err) {
                                                            all.banks.core.services.errorLog(err);
                                                        }
                                                    }, 100);
                                                });
                                                ret = true;
                                                return false;
                                            } else {
                                                if (all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.unionbank.indx].DataRow.length == (i + 1)) {
                                                    if (all.banks.accounts.unionbank.indx < unionbank.ibc) {
                                                        all.banks.accounts.unionbank.indx = all.banks.accounts.unionbank.indx + 1;
                                                        all.banks.accounts.unionbank.loadAllData();
                                                        data = null;
                                                    } else {
                                                        all.banks.accounts.unionbank.sendOshCtrl(data);
                                                        data = null;
                                                    }
                                                }
                                            }
                                        })
                                    }

                                    function loadAllNext() {
                                        if (!arr.length) {
                                            all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.unionbank.indx].DataRow = [];
                                            if (all.banks.accounts.unionbank.indx < unionbank.ibc) {
                                                myEmitterLogs(12, 0);
                                                all.banks.accounts.unionbank.indx = all.banks.accounts.unionbank.indx + 1;
                                                all.banks.accounts.unionbank.loadAllData();
                                                data = null;
                                            } else {
                                                all.banks.accounts.unionbank.sendOshCtrl(data);
                                                data = null;
                                            }
                                        } else {
                                            all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.unionbank.indx].DataRow = arr;
                                            myEmitterLogs(12, arr.length);
                                            try {
                                                getAllChecks();
                                            } catch (err) {
                                                all.banks.core.services.errorLog(err);
                                            }
                                        }
                                    }
                                }

                                // if (data.find('#lblCreditLineVal').length > 0) {
                                // 	all.banks.accounts.unionbank.accountCreditAcc = data.find('#lblCreditLineVal').text().replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, '');
                                // }
                                // else {
                                // 	all.banks.accounts.unionbank.accountCreditAcc = null;
                                // }
                            }
                        } catch (err) {
                            all.banks.core.services.errorLog(err);
                        }
                    }
                }
            }
        }
    };
    unionbank.loadAfterListChecks = function (VIEWSTATE, EVENTVALIDATION) {
        var dfd = jQuery.Deferred();
        var dataJson = {
            '__EVENTTARGET': '',
            '__EVENTARGUMENT': '',
            'DES_Group': '',
            '__VIEWSTATE': VIEWSTATE,
            'DES_JSE': 1,
            '__EVENTVALIDATION': EVENTVALIDATION,
            'hidtabindexCount': '121',
            'hidExitValue': '0',
            'hideGoogleSerachAlert': 'הוזן תו לא חוקי',
            'AjaxSaveAS': '',
            'ddlTransactionType': '001',
            'ddlTransactionPeriod': '004',
            'dtFromDate$textBox': all.banks.accounts.unionbank.datebackslesh,
            'dtToDate$textBox': all.banks.accounts.unionbank.datebacksleshTo,
            'btnDisplayDates.x': '19',
            'btnDisplayDates.y': '7',
            'ddlAdvSearchCreditDebt': '001',
            'ddlAdvSearchAmountSet': '001',
            'txtAdvSearchAmount': '',
            'txtAdvSearchReference': '',
            'popAnnotation$tbAnnotation': '',
            'popAnnotation$hItemIndex': '',
            'popAssignCategory$tbSubCategory': '',
            'popAssignCategory$lblParentCategory': '',
            'popAssignCategory$hTransactionID': '',
            'popAssignCategory$hParentCategoryID': '',
            'popAssignCategory$hCategoryCardIndex': '',
            'popAssignCategory$hSubcategoryID': '',
            'popAssignCategory$hAnnotationText': '',
            'popDescriptionData$lblParentCategory': '',
            'popDescriptionData$hTransactionID': '',
            'popDescriptionData$hParentCategoryID': '',
            'popDescriptionData$hCategoryCardIndex': '',
            'popDescriptionData$hSubcategoryID': '',
            'popDescriptionData$hAnnotationText': '',
            'hidSaveAsChoice': '',
            'popupLobyPage$hItemIndex': '',
            'hidExcel': '0',
            'hShowAdvSearch': 'false',
            'hShowCurrentBalanceIncludingToday': 'False',
            'hidDescriptionTitle': '',
            'hErrorDescriptionMsg': 'זמנית לא ניתן להציג נתונים בנושא זה',
            'txtSearchValue': 'חפש',
            'ddlAccounts$m_ddl': all.banks.accounts.unionbank.indx + 1
        }

        // if(unionbank.dd.find('option').length > 1) {
        //     dataJson['ddlAccounts$m_ddl'] = all.banks.accounts.unionbank.indx + 1;
        // }
        all.banks.core.services.httpReq("https://" + all.banks.accounts.unionbank.urlServices + "/eBanking/Accounts/ExtendedActivity.aspx", 'POST', dataJson, true, false)
            .then(function (data) {
                dataJson = null;
                dfd.resolve(data);
                data = null;
            })
            .fail(function (error, resErr, urlParam) {
                dataJson = null;
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
        return dfd.promise();
    };
    unionbank.checksList = function (listImg) {
        var dfd = jQuery.Deferred();
        var jsons = {
            '__EVENTTARGET': 'lnkCheckImage',
            '__EVENTARGUMENT': listImg,
            'DES_Group': '',
            '__VIEWSTATE': unionbank.dataInputs.find('#__VIEWSTATE').val(),
            '__EVENTVALIDATION': unionbank.dataInputs.find('#__EVENTVALIDATION').val(),
            'hidtabindexCount': '',
            'hidExitValue': '0',
            'hideGoogleSerachAlert': 'הוזן תו לא חוקי',
            'AjaxSaveAS': '',
            'ddlTransactionType': '001',
            'ddlTransactionPeriod': '004',
            'dtFromDate$textBox': unionbank.datebackslesh,
            'dtToDate$textBox': unionbank.datebacksleshTo,
            'ddlAdvSearchCreditDebt': '001',
            'ddlAdvSearchAmountSet': '001',
            'txtAdvSearchAmount': '',
            'txtAdvSearchReference': '',
            'popAnnotation$tbAnnotation': '',
            'popAnnotation$hItemIndex': '',
            'popAssignCategory$tbSubCategory': '',
            'popAssignCategory$lblParentCategory': '',
            'popAssignCategory$hTransactionID': '',
            'popAssignCategory$hParentCategoryID': '',
            'popAssignCategory$hCategoryCardIndex': '',
            'popAssignCategory$hSubcategoryID': '',
            'popAssignCategory$hAnnotationText': '',
            'popDescriptionData$lblParentCategory': '',
            'popDescriptionData$hTransactionID': '',
            'popDescriptionData$hParentCategoryID': '',
            'popDescriptionData$hCategoryCardIndex': '',
            'popDescriptionData$hSubcategoryID': '',
            'popDescriptionData$hAnnotationText': '',
            'hidSaveAsChoice': '',
            'popupLobyPage$hItemIndex': '',
            'hidExcel': '0',
            'hShowAdvSearch': 'false',
            'hShowCurrentBalanceIncludingToday': 'True',
            'hidDescriptionTitle': '',
            'hErrorDescriptionMsg': 'זמנית לא ניתן להציג נתונים בנושא זה',
            'txtSearchValue': 'חפש',
            'ddlAccounts$m_ddl': unionbank.dd.find('option').eq(unionbank.indx).val()
        };
        // if (unionbank.dd.find('option').length > 1) {
        //     jsons['ddlAccounts$m_ddl'] = unionbank.dd.find('option').eq(unionbank.indx).val();
        // }
        unionbank.synchronizeCookieSets().then(function () {
            monitorActivityClass.setIntervalActivity();
            var url = "https://" + all.banks.accounts.unionbank.urlServices + "/eBanking/Accounts/ExtendedActivity.aspx";
            senderReq.senderRest(url, url, all.banks.accounts.unionbank.cookies, jsons, resReqPostData)
        });

        function resReqPostData(err, body, cookAll) {
            if (err) {
                var logErr = "restUrl: " + url + ", status: " + err;
                all.banks.core.services.errorLog(logErr);
                return;
            }
            jsons = null;
            var url = "https://" + all.banks.accounts.unionbank.urlServices + "/eBanking/Accounts/DisplayCheckImages.aspx?index=" + unionbank.valSelectAcc + '&cId=' + listImg + '&seg=0&res=0';
            senderReq.senderGetRest(url, all.banks.accounts.unionbank.cookies, resGetData);

            function resGetData(err, responseGet, cookAll) {
                if (err) {
                    var logErr = "restUrl: " + url + ", status: " + err;
                    dfd.resolve([{
                        "ImageNameKey": "x"
                    }]);
                    return;
                }
                var response = responseGet;
                jsons = null;
                if (response.indexOf("language='javascript'>openPopupWindowCustomParams") == -1) {
                    var data = all.banks.core.services.parseHtml(response);
                    // if (!data.find("form#login").length) {
                    //
                    // }

                    response = null;
                    var dates = data.find('#lblDepositCheckDateVal').text();
                    var asmachta = data.find('#lblReferenceVal').text();
                    var arrListCheck = [];
                    var indexCheckRe = 0;

                    function getAllcheckLists(dataAll, datesVar, asmachtaVar) {
                        if (dataAll !== undefined) {
                            data = dataAll;
                            dates = datesVar;
                            asmachta = asmachtaVar;
                            indexCheckRe = 0;
                        }
                        clearTimeout(unionbank.timeOutFunc);
                        if (data.find('#ctlChecksDepositsTable').find('a[href*=openPopupWindowCustomParams]').length) {
                            data.find('#ctlChecksDepositsTable').find('a[href*=openPopupWindowCustomParams]').each(function (i, v) {
                                if (i == indexCheckRe) {
                                    $.when(unionbank.checkAll($(v).attr('href').split("'")[1]))
                                        .then(function (status, textErr) {
                                            indexCheckRe = indexCheckRe + 1;
                                            var depositeDate = '20' + dates.split('/')[2] + '' + dates.split('/')[1] + '' + dates.split('/')[0];
                                            var checkTotal = $(v).closest('#tblCheckNumber').closest('tr').find('td:first').text().replace(/\s/g, "").replace(/,/g, '');
                                            var banksDeat = $(v).closest('#tblCheckNumber').closest('tr').find('td').eq(1).text().replace(/\s/g, "");
                                            var checkBankNumber = banksDeat.split('-')[0];
                                            var checkAccountNumber = banksDeat.split('-')[2];
                                            var checkBranchNumber = banksDeat.split('-')[1];
                                            var checkNumber = $(v).text().replace(/\s/g, "").replace(/,/g, '');
                                            if (status !== null) {
                                                var uuid = parseInt(checkBankNumber) + '' + parseInt(checkBranchNumber) + '' + parseInt(checkAccountNumber) + '' + parseInt(checkNumber) + '' + parseInt(depositeDate) + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.unionbank.indx].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.unionbank.indx].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.unionbank.indx].AccountNumber;
                                                arrListCheck.push({
                                                    "Asmachta": parseInt(asmachta),
                                                    "CheckAccountNumber": parseInt(checkAccountNumber),
                                                    "DepositeDate": (dates.split("/")[0] + "/" + dates.split("/")[1] + "/20" + dates.split("/")[2]),
                                                    "CheckBankNumber": parseInt(checkBankNumber),
                                                    "CheckBranchNumber": parseInt(checkBranchNumber),
                                                    "CheckNumber": parseInt(checkNumber),
                                                    "CheckTotal": parseFloat(checkTotal),
                                                    "ImageNameKey": uuid
                                                });
                                                var formData = new FormData();
                                                var blob = new Blob([status], {
                                                    type: "text/plain"
                                                });
                                                formData.append(uuid, blob);
                                                all.banks.accounts.unionbank.sendChecksCtrl({
                                                    formData: formData,
                                                    params: {
                                                        imagenamekey: arrListCheck[arrListCheck.length - 1].ImageNameKey,
                                                        bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.unionbank.indx].BankNumber,
                                                        snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.unionbank.indx].BranchNumber,
                                                        accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.unionbank.indx].AccountNumber
                                                    }
                                                }, function () {
                                                    formData = null;
                                                    status = null;
                                                });
                                            } else {
                                                var textImage = "x";
                                                if (textErr !== undefined) {
                                                    textImage = textErr;
                                                }
                                                arrListCheck.push({
                                                    "Asmachta": parseInt(asmachta),
                                                    "CheckAccountNumber": parseInt(checkAccountNumber),
                                                    "DepositeDate": (dates.split("/")[0] + "/" + dates.split("/")[1] + "/20" + dates.split("/")[2]),
                                                    "CheckBankNumber": parseInt(checkBankNumber),
                                                    "CheckBranchNumber": parseInt(checkBranchNumber),
                                                    "CheckNumber": parseInt(checkNumber),
                                                    "CheckTotal": parseFloat(checkTotal),
                                                    "ImageNameKey": textImage
                                                });
                                                all.banks.generalVariables.numChecksNotWithdrawn += 1;
                                            }
                                            if (indexCheckRe == data.find('#ctlChecksDepositsTable').find('a[href*=openPopupWindowCustomParams]').length) {
                                                if (data.find('#ctlChecksDepositsPager_plNextPage').length && data.find('#ctlChecksDepositsPager_plNextPage').attr("href") !== undefined) {
                                                    var dataJson = {
                                                        '__EVENTTARGET': 'ctlChecksDepositsPager$plNextPage',
                                                        '__EVENTARGUMENT': '',
                                                        'DES_JSE': '',
                                                        '__VIEWSTATE': data.find('#__VIEWSTATE').val(),
                                                        '__EVENTVALIDATION': data.find('#__EVENTVALIDATION').val(),
                                                        '__VIEWSTATEGENERATOR': data.find('#__VIEWSTATEGENERATOR').val(),
                                                        'hidtabindexCount': '121',
                                                        'hidExitValue': '0',
                                                        'hideGoogleSerachAlert': 'הוזן תו לא חוקי',
                                                        'AjaxSaveAS': '',
                                                        'hidSaveAsChoice': '',
                                                        'lblSelectedItems': '|',
                                                        'lblSelectedAll': data.find('#lblSelectedAll').val(),
                                                        'lblPageItemsCount': '25',
                                                        'txtSearchValue': 'חפש'
                                                    };

                                                    var utlChecksList = 'https://' + all.banks.accounts.unionbank.urlServices + '/' + 'eBanking/Accounts/DisplayCheckImages.aspx?index=' + unionbank.valSelectAcc + '&cId=' + listImg + '&seg=0&res=0';

                                                    unionbank.synchronizeCookieSets().then(function () {
                                                        monitorActivityClass.setIntervalActivity();
                                                        senderReq.senderRest(utlChecksList, utlChecksList, all.banks.accounts.unionbank.cookies, dataJson, resReqPostDataCheck);
                                                    });

                                                    function resReqPostDataCheck(err, body, cookAll) {
                                                        if (err) {
                                                            var logErr = "restUrl: " + url + ", status: " + err;
                                                            all.banks.core.services.errorLog(logErr);
                                                            return;
                                                        }
                                                        dataJson = null;
                                                        data = all.banks.core.services.parseHtml(body);
                                                        dates = data.find('#lblDepositCheckDateVal').text();
                                                        asmachta = data.find('#lblReferenceVal').text();
                                                        indexCheckRe = 0;
                                                        getAllcheckLists(data, dates, asmachta);
                                                    }
                                                } else {
                                                    var dataJson = {
                                                        '__EVENTTARGET': '',
                                                        '__EVENTARGUMENT': '',
                                                        'DES_Group': '',
                                                        '__VIEWSTATE': unionbank.dataInputs.find('#__VIEWSTATE').val(),
                                                        'DES_JSE': 1,
                                                        '__EVENTVALIDATION': unionbank.dataInputs.find('#__EVENTVALIDATION').val(),
                                                        'hidtabindexCount': '121',
                                                        'hidExitValue': '0',
                                                        'hideGoogleSerachAlert': 'הוזן תו לא חוקי',
                                                        'AjaxSaveAS': '',
                                                        'ddlTransactionType': '001',
                                                        'ddlTransactionPeriod': '004',
                                                        'dtFromDate$textBox': unionbank.datebackslesh,
                                                        'dtToDate$textBox': unionbank.datebacksleshTo,
                                                        'btnDisplayDates.x': '19',
                                                        'btnDisplayDates.y': '7',
                                                        'ddlAdvSearchCreditDebt': '001',
                                                        'ddlAdvSearchAmountSet': '001',
                                                        'txtAdvSearchAmount': '',
                                                        'txtAdvSearchReference': '',
                                                        'popAnnotation$tbAnnotation': '',
                                                        'popAnnotation$hItemIndex': '',
                                                        'popAssignCategory$tbSubCategory': '',
                                                        'popAssignCategory$lblParentCategory': '',
                                                        'popAssignCategory$hTransactionID': '',
                                                        'popAssignCategory$hParentCategoryID': '',
                                                        'popAssignCategory$hCategoryCardIndex': '',
                                                        'popAssignCategory$hSubcategoryID': '',
                                                        'popAssignCategory$hAnnotationText': '',
                                                        'popDescriptionData$lblParentCategory': '',
                                                        'popDescriptionData$hTransactionID': '',
                                                        'popDescriptionData$hParentCategoryID': '',
                                                        'popDescriptionData$hCategoryCardIndex': '',
                                                        'popDescriptionData$hSubcategoryID': '',
                                                        'popDescriptionData$hAnnotationText': '',
                                                        'hidSaveAsChoice': '',
                                                        'popupLobyPage$hItemIndex': '',
                                                        'hidExcel': '0',
                                                        'hShowAdvSearch': 'false',
                                                        'hShowCurrentBalanceIncludingToday': 'False',
                                                        'hidDescriptionTitle': '',
                                                        'hErrorDescriptionMsg': 'זמנית לא ניתן להציג נתונים בנושא זה',
                                                        'txtSearchValue': 'חפש',
                                                        'ddlAccounts$m_ddl': unionbank.dd.find('option').eq(unionbank.indx).val()
                                                    }
                                                    // if (unionbank.dd.find('option').length > 1) {
                                                    //     dataJson['ddlAccounts$m_ddl'] = unionbank.dd.find('option').eq(unionbank.indx).val();
                                                    // }
                                                    var utlChecksList = "https://" + all.banks.accounts.unionbank.urlServices + "/eBanking/Accounts/ExtendedActivity.aspx";

                                                    unionbank.synchronizeCookieSets().then(function () {
                                                        monitorActivityClass.setIntervalActivity();
                                                        senderReq.senderRest(utlChecksList, utlChecksList, all.banks.accounts.unionbank.cookies, dataJson, resReqPostDataCheck);
                                                    });

                                                    function resReqPostDataCheck(err, body, cookAll) {
                                                        if (err) {
                                                            var logErr = "restUrl: " + url + ", status: " + err;
                                                            all.banks.core.services.errorLog(logErr);
                                                            return;
                                                        }
                                                        dataJson = null;
                                                        var res = all.banks.core.services.parseHtml(body);

                                                        if (arrListCheck.length == 0) {
                                                            dfd.resolve([{
                                                                "ImageNameKey": "x"
                                                            }]);
                                                        } else {
                                                            dfd.resolve(arrListCheck);
                                                        }
                                                    }
                                                }
                                            } else {
                                                unionbank.timeOutFunc = setTimeout(function () {
                                                    try {
                                                        clearTimeout(unionbank.timeOutFunc);
                                                        getAllcheckLists()
                                                    } catch (err) {
                                                        all.banks.core.services.errorLog(err)
                                                    }
                                                }, 500)
                                            }
                                        })
                                    return false;
                                }
                            })
                        } else {
                            //console.log(responseGet);
                            dfd.resolve([{
                                "ImageNameKey": "x"
                            }]);
                        }
                    }

                    try {
                        getAllcheckLists()
                    } catch (err) {
                        dfd.resolve([{
                            "ImageNameKey": "x"
                        }]);
                    }
                } else {
                    try {
                        var urlImg = response.split("language='javascript'>openPopupWindowCustomParams('")[1].split("',")[0];
                        response = null;
                        if (urlImg !== "") {
                            dfd.resolve(true, urlImg);
                        } else {
                            dfd.resolve([{
                                "ImageNameKey": "x"
                            }]);
                        }
                    } catch (e) {
                        dfd.resolve([{
                            "ImageNameKey": "x"
                        }]);
                    }
                }
            }
        }

        return dfd.promise();
    };
    unionbank.checkAll = function (linkCheck) {
        var dfd = jQuery.Deferred();
        monitorActivityClass.setIntervalActivity();
        var linkFinish = 'https://' + all.banks.accounts.unionbank.urlServices
            + (!linkCheck.startsWith('/') ? '/' : '')
            + linkCheck;
        console.log('linkFinish: ', linkFinish);
        senderReq.senderGetRest(linkFinish, all.banks.accounts.unionbank.cookies, resGetData);

        function resGetData(err, responseGet, cookAll) {
            if (err) {
                var logErr = "restUrl: uniquesig0/eBanking/Accounts/ExtendedActivity.aspx, status: " + err;
                dfd.resolve(null);
                return;
            }
            linkFinish = null;

            function loadImage(url) {
                const dfdImg = jQuery.Deferred();
                const img = new Image();
                img.src = url;
                img.onload = () => dfdImg.resolve(img);
                img.onerror = () => dfdImg.resolve(null);
                return dfdImg;
            }

            function merge(imgFront, imgBack) {
                if (imgFront === null) {
                    return null;
                }

                const canvas = document.createElement("canvas"), ctx = canvas.getContext("2d");
                canvas.width = Math.max(imgFront.width, (imgBack !== null ? imgBack.width : 0));
                canvas.height = imgFront.height + (imgBack !== null ? imgBack.height : 0);
                ctx.drawImage(imgFront, 0, 0);
                if (imgBack !== null) {
                    ctx.drawImage(imgBack, 0, imgFront.height);
                }

                return canvas.toDataURL("image/jpeg", unionbank.imageScale)
                    .replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
            }

            var data = all.banks.core.services.parseHtml(responseGet);
            const imgCheckImageFrontSrc = data.find('#imgCheckImageFront').length && data.find('#imgCheckImageFront').attr('src').length
                ? (data.find('#imgCheckImageFront').attr('src').includes('..')
                    ? data.find('#imgCheckImageFront').attr('src').split('..')[1]
                    : '/Accounts/' + data.find('#imgCheckImageFront').attr('src'))
                : null;
            console.log('imgCheckImageFrontSrc: ', imgCheckImageFrontSrc)
            if (!!imgCheckImageFrontSrc) {
                const imgCheckImageBackSrc = data.find('#imgCheckImageBack').length && data.find('#imgCheckImageBack').attr('src').length
                    ? (data.find('#imgCheckImageBack').attr('src').includes('..')
                        ? data.find('#imgCheckImageBack').attr('src').split('..')[1]
                        : '/Accounts/' + data.find('#imgCheckImageBack').attr('src'))
                    : null
                console.log('imgCheckImageBackSrc222: ', imgCheckImageBackSrc)

                if (!!imgCheckImageBackSrc) {
                    jQuery.when(
                        loadImage('https://' + all.banks.accounts.unionbank.urlServices
                            + '/eBanking'
                            + imgCheckImageFrontSrc),
                        loadImage('https://' + all.banks.accounts.unionbank.urlServices
                            + '/eBanking'
                            + imgCheckImageBackSrc)
                    ).done(function (imgF, imgB) {
                        dfd.resolve(merge(imgF, imgB));
                    });
                } else {
                    jQuery.when(loadImage('https://' + all.banks.accounts.unionbank.urlServices
                        + '/eBanking'
                        + imgCheckImageFrontSrc)
                    ).done(function (imgF) {
                        dfd.resolve(merge(imgF, null));
                    });
                }


//				var image = 'https://' + all.banks.accounts.unionbank.urlServices + '/' + 'eBanking' + $(data).find('#imgCheckImageFront').attr('src').split('..')[1];
//				var img = new Image();
//				img.src = image;
//				img.onload = function () {
//					var canvas = document.createElement("canvas");
//					canvas.width = this.width;
//					canvas.height = this.height;
//					var ctx = canvas.getContext("2d");
//					ctx.drawImage(this, 0, 0);
//					var dataURL = canvas.toDataURL("image/jpeg", unionbank.imageScale);
////                                        fs.writeFile('./Output/image.jpg', new Buffer(dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), 'base64'));
//					dfd.resolve(dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""));
//					data = null;
//				};
//				img.onerror = function () {
//					data = null;
//					dfd.resolve(null);
//				};
            } else {
                if (data.find(".errInfo").length) {
                    dfd.resolve(null, data.find(".errInfo").text());
//					data = null;
                } else {
//					data = null;
                    dfd.resolve(null);
                }
            }
            data = null;
        }

        return dfd.promise();
    };
    unionbank.loadAshrai = function (res) {
        var url = "https://" + all.banks.accounts.unionbank.urlServices + "/ebanking/CreditCard/DisplayCreditCardActivity.aspx";
        all.banks.core.services.httpReq(url, 'GET', null, false, false)
            .then(function (data) {
                try {
                    win.cookies.getAll({}, function (cool) {
                        all.banks.accounts.unionbank.cookies = cool
                            .map(ck => {
                                return ck.name + "=" + ck.value
                            })
                            .join(";");
                        for (const cookie of all.banks.accounts.unionbank.cookies.split(";")) {
                            let [name, val] = cookie.split(";")[0].split("=");
                            win.cookies.set({
                                url: "https://unionbank.co.il",
                                name: name.replace(/\s/g, ""),
                                domain: ".unionbank.co.il",
                                value: val.replace(/\s/g, "")
                            });
                        }
                    });
                    document.cookie = all.banks.accounts.unionbank.cookies;
                    var res = all.banks.core.services.parseHtml(data);

                    setTimeout(function () {
                        console.log("loadAshrai() - get");
                        var jsons = {
                            '__EVENTTARGET': 'ddlAccounts$m_ddl',
                            '__EVENTARGUMENT': res.find('input[name="__EVENTARGUMENT"]').val(),
                            '__LASTFOCUS': res.find('input[name="__LASTFOCUS"]').val(),
                            '__VIEWSTATE': res.find('input[name="__VIEWSTATE"]').val(),
                            'DES_JSE': "1",
                            '__EVENTVALIDATION': res.find('#__EVENTVALIDATION').val(),
                            'hidtabindexCount': res.find('input[name="hidtabindexCount"]').val(),
                            'hidExitValue': res.find('input[name="hidExitValue"]').val(),
                            'hideGoogleSerachAlert': 'הוזן תו לא חוקי',
                            'AjaxSaveAS': res.find('input[name="AjaxSaveAS"]').val(),
                            'ddlAccounts$m_ddl': res.find('select[name="ddlAccounts$m_ddl"]').find('option').eq(unionbank.ddAccAshrai).val(), // ddAcc 0 or 1 or 2 ...
                            'txtSearchValue': 'חפש',
                            'popAnnotation$tbAnnotation': '',
                            'popAnnotation$hItemIndex': '',
                            'popAssignCategory$tbSubCategory': '',
                            'popAssignCategory$lblParentCategory': '',
                            'popAssignCategory$hTransactionID': '',
                            'popAssignCategory$hParentCategoryID': '',
                            'popAssignCategory$hCategoryCardIndex': '',
                            'popAssignCategory$hSubcategoryID': '',
                            'popAssignCategory$hAnnotationText': '',
                            'hCardIndex': '',
                            'hidSaveAsChoice': ''
                        };

                        unionbank.synchronizeCookieSets().then(function () {
                            monitorActivityClass.setIntervalActivity();
                            senderReq.senderRest(url, url, all.banks.accounts.unionbank.cookies, jsons, resReq);
                            console.log("loadAshrai() - senderRest POST");
                        });

                        function resReq(err, body) {
                            console.log("resReq - get cards");
                            //all.banks.accounts.unionbank.cookies = cookies;
                            if (err) {
                                console.log("err resReq - cards");
                                all.banks.accounts.unionbank.ddAshrai = 0;
                                all.banks.accounts.unionbank.ddTime = 0;
                                if (all.banks.accounts.unionbank.ddAccAshrai < unionbank.ddlAccounts.length - 1) {
                                    all.banks.accounts.unionbank.ddAccAshrai = all.banks.accounts.unionbank.ddAccAshrai + 1;
                                    all.banks.accounts.unionbank.setAccAsharai(res);
                                    res = null;
                                } else {
                                    all.banks.accounts.unionbank.sendCardsCtrl(res);
                                    res = null;
                                }
                            } else {
                                console.log("body resReq - cards");
                                var res = all.banks.core.services.parseHtml(body);
                                unionbank.ddlAccounts = res.find('select[name="ddlAccounts$m_ddl"]').find('option');
                                if (res.find('select[name="ddlCard"]').length) {
                                    console.log("body ddlCard exist - cards");
                                    unionbank.ddlCard = res.find('select[name="ddlCard"]').find('option');
                                    unionbank.loadAshraiAll(res);
                                } else {
                                    console.log("body ddlCard null - cards");
                                    all.banks.accounts.unionbank.ddAshrai = 0;
                                    all.banks.accounts.unionbank.ddTime = 0;
                                    if (all.banks.accounts.unionbank.ddAccAshrai < unionbank.ddlAccounts.length - 1) {
                                        all.banks.accounts.unionbank.ddAccAshrai = all.banks.accounts.unionbank.ddAccAshrai + 1;
                                        all.banks.accounts.unionbank.setAccAsharai(res);
                                        res = null;
                                    } else {
                                        all.banks.accounts.unionbank.sendCardsCtrl(res);
                                        res = null;
                                    }
                                }
                            }
                        }
                    }, 1000)
                } catch (e) {
                    all.banks.core.services.errorLog("loadAshrai() " + e);
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    };
    unionbank.setAccAsharai = function (data) {
        console.log("setAccAsharai");
        unionbank.synchronizeCookieSets().then(function () {
            all.banks.accounts.unionbank.loadAshrai(data);
        });
    };
    unionbank.loadAshraiAll = function (res) {
        console.log("loadAshraiAll");
        monitorActivityClass.setIntervalActivity();
        try {
            var ddlDatePayment = unionbank.dateCards[unionbank.ddTime]; //res.find('select[name="ddlDatePayment"]').find('option').eq(all.banks.accounts.unionbank.ddTime).val();
            var jsons = {
                '__EVENTTARGET': res.find('input[name="__EVENTTARGET"]').val(),
                '__EVENTARGUMENT': res.find('input[name="__EVENTARGUMENT"]').val(),
                '__LASTFOCUS': res.find('input[name="__LASTFOCUS"]').val(),
                'DES_Group': res.find('input[name="DES_Group"]').val(),
                '__VIEWSTATE': res.find('input[name="__VIEWSTATE"]').val(),
                'DES_JSE': res.find('input[name="DES_JSE"]').val(),
                '__EVENTVALIDATION': res.find('#__EVENTVALIDATION').val(),
                'hidtabindexCount': res.find('input[name="hidtabindexCount"]').val(),
                'hidExitValue': res.find('input[name="hidExitValue"]').val(),
                '__VIEWSTATEGENERATOR': res.find('#__VIEWSTATEGENERATOR').val(),
                'hideGoogleSerachAlert': 'הוזן תו לא חוקי',
                'AjaxSaveAS': res.find('input[name="AjaxSaveAS"]').val(),
                'ddlAccounts$m_ddl': unionbank.ddlAccounts.eq(all.banks.accounts.unionbank.ddAccAshrai).val(), // ddAcc 0 or 1 or 2 ...
                'ddlCard': unionbank.ddlCard.eq(all.banks.accounts.unionbank.ddAshrai).val(), // card val
                'ddlDatePayment': ddlDatePayment, // 01 02 03... dd date
                'btnDisplay.x': '17',
                'btnDisplay.y': '13',
                popAnnotation$tbAnnotation: '',
                popAnnotation$hItemIndex: '',
                popAssignCategory$tbSubCategory: '',
                popAssignCategory$lblParentCategory: '',
                popAssignCategory$hTransactionID: '',
                popAssignCategory$hParentCategoryID: '',
                popAssignCategory$hCategoryCardIndex: '',
                popAssignCategory$hSubcategoryID: '',
                popAssignCategory$hAnnotationText: '',
                hCardIndex: '',
                hidSaveAsChoice: '',
                FAVORITESDROPDOWN: '#'
            };
            var url = "https://" + all.banks.accounts.unionbank.urlServices + "/ebanking/CreditCard/DisplayCreditCardActivity.aspx";

            unionbank.synchronizeCookieSets().then(function () {
                monitorActivityClass.setIntervalActivity();
                senderReq.senderRest(url, url, all.banks.accounts.unionbank.cookies, jsons, resReqCards);
                console.log("senderRest POST loadAshraiAll()");
            });

            function resReqCards(err, body) {
                monitorActivityClass.setIntervalActivity();
                console.log("loadAshraiAll - resReqCards");
                //all.banks.accounts.unionbank.cookies = cookies;
                if (err) {
                    console.log("err - resReqCards");
                    loadNextCardsAshrai(res);
                } else {
                    if (body === undefined) {
                        console.log("body empty - resReqCards");
                        loadNextCardsAshrai(res);
                    } else {
                        console.log("body exist - resReqCards");

                        var data = all.banks.core.services.parseHtml(body);
                        if (data.find("#NOINFORMATIONREGIONSERVERSIDEERROR .errInfo").length && data.find("#NOINFORMATIONREGIONSERVERSIDEERROR .errInfo").text().indexOf("אין נתונים לחשבון זה") !== -1) {
                            all.banks.accounts.unionbank.ddTime = 0;
                            if (all.banks.accounts.unionbank.ddAshrai < unionbank.ddlCard.length - 2) {
                                all.banks.accounts.unionbank.ddAshrai = all.banks.accounts.unionbank.ddAshrai + 1;
                                all.banks.accounts.unionbank.loadAshraiAll(data);
                                data = null;
                            } else {
                                all.banks.accounts.unionbank.ddAshrai = 0;
                                if (all.banks.accounts.unionbank.ddAccAshrai < unionbank.ddlAccounts.length - 1) {
                                    all.banks.accounts.unionbank.ddAccAshrai = all.banks.accounts.unionbank.ddAccAshrai + 1;
                                    all.banks.accounts.unionbank.setAccAsharai(data);
                                    data = null;
                                } else {
                                    all.banks.accounts.unionbank.sendCardsCtrl(data);
                                    data = null;
                                }
                            }
                        } else {
                            var accVal = unionbank.ddlAccounts.eq(all.banks.accounts.unionbank.ddAccAshrai).text();
                            var nextTotal = data.find('#ctlRegularTransactions  .footer .ColumnsDir').text().replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, '');

                            var cardType = null;
                            if (data.find('#lblCreditCardDescriptionVal').length > 0) {
                                cardType = all.banks.core.services.getTypeCard(data.find('#lblCreditCardDescriptionVal').text());
                            }
                            var nextBillingDateMain = data.find('select[name="ddlDatePayment"]').find('option').eq(all.banks.accounts.unionbank.ddTime).text().replace(/\s/g, "").substr(0, 8);
                            var indFakeDate = 0;
                            if (nextBillingDateMain.split('/').length == 1) {
                                indFakeDate = 1;
                                nextBillingDateMain = getNextBillingDateByCalc(data.find('select[name="ddlDatePayment"]').find('option').eq(0).text().replace(/\s/g, "").substr(0, 8).split('/'), all.banks.accounts.unionbank.ddTime)
                            }

                            nextBillingDateMain = unionbank.convertDateLocal(nextBillingDateMain);

                            var accBranchNumber = unionbank.getAcc(accVal);
                            var cardNumber = unionbank.ddlCard.eq(all.banks.accounts.unionbank.ddAshrai).text();
                            var lengthCardSplit = cardNumber.split(" ");
                            if (lengthCardSplit.length > 1) {
                                cardNumber = lengthCardSplit[lengthCardSplit.length - 1].replace(/\D/g, "");
                            } else {
                                cardNumber = cardNumber.replace(/\D/g, "");
                            }
                            var dataMonthlyCycle = {
                                'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                'AccountNumber': accBranchNumber[0],
                                'BranchNumber': accBranchNumber[1],
                                'NextTotal': nextTotal,
                                'CardNumber': cardNumber,
                                'CardType': cardType,
                                'NextBillingDate': nextBillingDateMain
                            };

                            myEmitterLogs(33, dataMonthlyCycle.AccountNumber);
                            myEmitterLogs(15, dataMonthlyCycle.CardNumber + ' period ' + dataMonthlyCycle.NextBillingDate);
                            if (data.find('#ctlRegularTransactions').length) {
                                console.log("body ctlRegularTransactions - resReqCards");
                                data.find('#ctlRegularTransactions tr').not('.header, .footer').each(function (i, v) {
                                    var totalPaymentsType = $(v).find('td').eq(3).text();
                                    var totalPaymentsSum = null, currentPaymentNumSum = null;
                                    if (totalPaymentsType.indexOf('תשלום') !== -1) {
                                        var textPayCard = totalPaymentsType.split('תשלום')[1].split('מ');
                                        totalPaymentsSum = textPayCard[1].replace(/\D/g, "");
                                        currentPaymentNumSum = textPayCard[0].replace(/\D/g, "");
                                        if (totalPaymentsSum == "" || currentPaymentNumSum == "") {
                                            totalPaymentsSum = (totalPaymentsSum == "") ? currentPaymentNumSum : totalPaymentsSum;
                                            currentPaymentNumSum = 0;
                                        }
                                    }
                                    var valueDate = $(v).find('td').eq(0).text().replace(/\s/g, "");
                                    valueDate = unionbank.convertDateLocal(valueDate);

                                    var currency_id;
                                    var ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(data.find('#lblCreditCardPayment').text());
                                    currency_id = all.banks.core.services.getTypeCurrencyAll($(v).find('td').eq(2).text().replace(/\d/g, "").replace(',', '').replace('.', ''));
                                    all.banks.generalVariables.allDataArrAshrai.push({
                                        "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                        "Token": all.banks.accountDetails.bank.token,
                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                        "BranchNumber": dataMonthlyCycle.BranchNumber,
                                        "AccountNumber": dataMonthlyCycle.AccountNumber,
                                        "CardNumber": parseFloat(dataMonthlyCycle.CardNumber),
                                        "NextBillingDate": all.banks.core.services.convertDateAll(dataMonthlyCycle.NextBillingDate),
                                        "NextCycleTotal": dataMonthlyCycle.NextTotal,
                                        "CardStatus": null,
                                        "TransDesc": $(v).find('td').eq(1).find("span").attr("title").replace(/\n/g, "").replace(/\t/g, ""),
                                        "TransTotal": $(v).find('td').eq(4).text().replace(/\s/g, "").replace(/,/g, ''),
                                        "ValueDate": valueDate != '' ? all.banks.core.services.convertDateAll(valueDate) : all.banks.core.services.convertDateAll(dataMonthlyCycle.NextBillingDate),
                                        "TransCategory": null,
                                        "TotalPayments": totalPaymentsSum,
                                        "CurrentPaymentNum": currentPaymentNumSum,
                                        "CardType": dataMonthlyCycle.CardType,
                                        "indFakeDate": indFakeDate,
                                        "currency_id": currency_id,
                                        "original_total": $(v).find('td').eq(2).text().split(' ')[0].replace(/\s/g, "").replace(/,/g, ''),
                                        "ind_iskat_hul": ind_iskat_hul,
                                        "comment": ''
                                    });
                                });
                                loadDebit();
                            } else {
                                console.log("null ctlRegularTransactions - resReqCards");
                                loadDebit();
                            }

                            function loadDebit() {
                                if (data.find('#ctlRegularTransactionsDebit tr').not('.header, .footer').length) {
                                    console.log("body loadDebit - resReqCards");
                                    var nextTotal = data.find('#ctlRegularTransactionsDebit .footer .ColumnsDir').text().replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, '');

                                    data.find('#ctlRegularTransactionsDebit tr').not('.header, .footer').each(function (i, v) {
                                        var totalPaymentsType = $(v).find('td').eq(3).text();
                                        var totalPaymentsSum = null, currentPaymentNumSum = null;
                                        if (totalPaymentsType.indexOf('תשלום') !== -1) {
                                            var textPayCard = totalPaymentsType.split('תשלום')[1].split('מ');
                                            totalPaymentsSum = textPayCard[1].replace(/\D/g, "");
                                            currentPaymentNumSum = textPayCard[0].replace(/\D/g, "");
                                            if (totalPaymentsSum == "" || currentPaymentNumSum == "") {
                                                totalPaymentsSum = (totalPaymentsSum == "") ? currentPaymentNumSum : totalPaymentsSum;
                                                currentPaymentNumSum = 0;
                                            }
                                        }

                                        var valueDate = $(v).find('td').eq(0).text().replace(/\s/g, "");
                                        valueDate = unionbank.convertDateLocal(valueDate);


                                        var currency_id;
                                        var ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(data.find('#lblCreditCardPayment').text())
                                        currency_id = all.banks.core.services.getTypeCurrencyAll($(v).find('td').eq(2).text().replace(/\d/g, "").replace(',', '').replace('.', ''));
                                        all.banks.generalVariables.allDataArrAshrai.push({
                                            "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                            "Token": all.banks.accountDetails.bank.token,
                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                            "BranchNumber": dataMonthlyCycle.BranchNumber,
                                            "AccountNumber": dataMonthlyCycle.AccountNumber,
                                            "CardNumber": parseFloat(dataMonthlyCycle.CardNumber),
                                            "NextBillingDate": all.banks.core.services.convertDateAll(dataMonthlyCycle.NextBillingDate),
                                            "NextCycleTotal": nextTotal,
                                            "CardStatus": null,
                                            "TransDesc": $(v).find('td').eq(1).find("span").attr("title").replace(/\n/g, "").replace(/\t/g, ""),
                                            "TransTotal": $(v).find('td').eq(4).text().replace(/\s/g, "").replace(/,/g, ''),
                                            "ValueDate": valueDate != '' ? all.banks.core.services.convertDateAll(valueDate) : all.banks.core.services.convertDateAll(dataMonthlyCycle.NextBillingDate),
                                            "TransCategory": null,
                                            "TotalPayments": totalPaymentsSum,
                                            "CurrentPaymentNum": currentPaymentNumSum,
                                            "CardType": dataMonthlyCycle.CardType,
                                            "indFakeDate": 0,
                                            "currency_id": currency_id,
                                            "original_total": $(v).find('td').eq(2).text().split(' ')[0].replace(/\s/g, "").replace(/,/g, ''),
                                            "ind_iskat_hul": ind_iskat_hul,
                                            "comment": ''
                                        })
                                    })
                                    loadCommitmentTransactionsMatah(data);
                                } else {
                                    console.log("null loadDebit - resReqCards");

                                    loadCommitmentTransactionsMatah(data);
                                }
                            }

                            function dataNotPad() {
                                if (data.find('#pnlOne .dataTable.summaryGrid tr').not('.header, .footer').length) {
                                    console.log("body summaryGrid - resReqCards");

                                    const ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(data.find('#pnlOne .dirLTRorRTL').text());
                                    const nextCycleTotal = parseFloat(data.find('#tblSumForeign td.Summary_data').eq(0).text().replace(/[^\d^\.\-]/g, ""));

                                    data.find('#pnlOne .dataTable.summaryGrid tr').not('.header, .footer').each(function (i, v) {
                                        var nextBillingDate = $(v).find('td').eq(4).text().replace(/\s/g, "");
                                        nextBillingDate = unionbank.convertDateLocal(nextBillingDate);
                                        var valueDate = $(v).find('td').eq(0).text().replace(/\s/g, "");
                                        valueDate = unionbank.convertDateLocal(valueDate);

                                        var currency_id = all.banks.core.services.getTypeCurrencyAll($(v).find('td').eq(2).text().replace(/\d/g, "").replace(',', '').replace('.', ''));
                                        all.banks.generalVariables.allDataArrAshrai.push({
                                            "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                            "Token": all.banks.accountDetails.bank.token,
                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                            "BranchNumber": dataMonthlyCycle.BranchNumber,
                                            "AccountNumber": dataMonthlyCycle.AccountNumber,
                                            "CardNumber": parseFloat(dataMonthlyCycle.CardNumber),
                                            "NextBillingDate": all.banks.core.services.convertDateAll(nextBillingDate),
                                            "NextCycleTotal": nextCycleTotal,
                                            "CardStatus": null,
                                            // parseFloat(data.find('#tblSumForeign td').eq(1).text().trim().replace(/\s/g, "").replace(/,/g, '').replace('$', '')),
                                            "TransDesc": $(v).find('td').eq(1).find('span').attr('title'),
                                            "TransTotal": $(v).find('td').eq(5).text().replace(/\s/g, "").replace(/,/g, ''),
                                            // $(v).find('td').eq(3).text().replace(/\s/g, "").replace(/,/g, ''),
                                            "ValueDate": valueDate != '' ? all.banks.core.services.convertDateAll(valueDate) : all.banks.core.services.convertDateAll(dataMonthlyCycle.NextBillingDate),
                                            "TransCategory": null,
                                            "TotalPayments": null,
                                            "CurrentPaymentNum": null,
                                            "CardType": dataMonthlyCycle.CardType,
                                            "indFakeDate": 0,
                                            "currency_id": currency_id,
                                            "original_total": $(v).find('td').eq(3).text().replace(/\s/g, "").replace(/,/g, ''),
                                            // $(v).find('td').eq(5).text().replace(/\s/g, "").replace(/,/g, ''),
                                            "ind_iskat_hul": ind_iskat_hul,
                                            "comment": ''
                                        })
                                        if (data.find('#pnlOne .dataTable.summaryGrid tr').not('.header, .footer').length == i + 1) {
                                            loadNextCardsAshrai(data);
                                        }
                                    })
                                } else {
                                    console.log("null summaryGrid - resReqCards");
                                    loadNextCardsAshrai(data);
                                }

                            }

                            function loadCommitmentTransactionsMatah() {
                                if (data.find('#dgNewForeignTable tr').not('.header, .footer').length) {
                                    console.log("body loadCommitmentTransactionsMatah - resReqCards");

                                    const nextCycleTotal = parseFloat(data.find('#tblSumForeign td.Summary_data').eq(0).text().replace(/[^\d^\.\-]/g, ""));
                                    const ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(
                                        data.find('#tblSumForeign td').eq(1).text().trim().replace(/\s/g, "").replace(/,/g, ''));

                                    data.find('#dgNewForeignTable tr').not('.header, .footer').each(function (i, v) {

                                        var nextBillingDate = $(v).find('td').eq(4).text().replace(/\s/g, "");
                                        nextBillingDate = unionbank.convertDateLocal(nextBillingDate);

                                        var valueDate = $(v).find('td').eq(0).text().replace(/\s/g, "");
                                        valueDate = unionbank.convertDateLocal(valueDate);

                                        const currency_id = all.banks.core.services.getTypeCurrencyAll($(v).find('td').eq(2).text().replace(/\d/g, "").replace(',', '').replace('.', ''));
                                        all.banks.generalVariables.allDataArrAshrai.push({
                                            "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                            "Token": all.banks.accountDetails.bank.token,
                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                            "BranchNumber": dataMonthlyCycle.BranchNumber,
                                            "AccountNumber": dataMonthlyCycle.AccountNumber,
                                            "CardNumber": parseFloat(dataMonthlyCycle.CardNumber),
                                            "NextBillingDate": all.banks.core.services.convertDateAll(nextBillingDate),
                                            "NextCycleTotal": nextCycleTotal,
                                            "CardStatus": null,
                                            "TransDesc": $(v).find('td').eq(1).find('span').attr('title'),
                                            "TransTotal": $(v).find('td').eq(5).text().replace(/\s/g, "").replace(/,/g, ''),
                                            // $(v).find('td').eq(3).text().replace(/\s/g, "").replace(/,/g, ''),
                                            "ValueDate": valueDate != '' ? all.banks.core.services.convertDateAll(valueDate) : all.banks.core.services.convertDateAll(dataMonthlyCycle.NextBillingDate),
                                            "TransCategory": null,
                                            "TotalPayments": null,
                                            "CurrentPaymentNum": null,
                                            "CardType": dataMonthlyCycle.CardType,
                                            "indFakeDate": 0,
                                            "currency_id": currency_id,
                                            "original_total": $(v).find('td').eq(3).text().replace(/\s/g, "").replace(/,/g, ''),
                                            // $(v).find('td').eq(5).text().replace(/\s/g, "").replace(/,/g, ''),
                                            "ind_iskat_hul": ind_iskat_hul,
                                            "comment": ''
                                        });

                                        if (data.find(' #dgNewForeignTable tr').not('.header, .footer').length == i + 1) {
                                            dataNotPad();
                                        }
                                    })
                                } else {
                                    console.log("null loadCommitmentTransactionsMatah - resReqCards");
                                    dataNotPad();
                                }
                            }
                        }
                    }
                }
            }

            function getNextBillingDateByCalc(dd, ddTime) {
                var firstNextBillingDate = new Date(parseInt(dd[2]), (parseInt(dd[1]) - 1) - ddTime, parseInt(dd[0]));
                var nextBillingDate = ('0' + firstNextBillingDate.getDate()).slice(-2) + '/' + ('0' + (firstNextBillingDate.getMonth() + 1)).slice(-2) + '/' + ('0' + firstNextBillingDate.getFullYear()).slice(-2);
                return nextBillingDate;
            }

            function loadNextCardsAshrai(data) {
                console.log("loadNextCardsAshrai() - resReqCards");
                if (all.banks.accounts.unionbank.ddTime < unionbank.dateCards.length - 1) {
                    all.banks.accounts.unionbank.ddTime = all.banks.accounts.unionbank.ddTime + 1;
                    all.banks.accounts.unionbank.loadAshraiAll(data);
                    data = null;
                } else {
                    all.banks.accounts.unionbank.ddTime = 0;
                    if (all.banks.accounts.unionbank.ddAshrai < unionbank.ddlCard.length - 2) {
                        all.banks.accounts.unionbank.ddAshrai = all.banks.accounts.unionbank.ddAshrai + 1;
                        all.banks.accounts.unionbank.loadAshraiAll(data);
                        data = null;
                    } else {
                        all.banks.accounts.unionbank.ddAshrai = 0;
                        if (all.banks.accounts.unionbank.ddAccAshrai < unionbank.ddlAccounts.length - 1) {
                            all.banks.accounts.unionbank.ddAccAshrai = all.banks.accounts.unionbank.ddAccAshrai + 1;
                            all.banks.accounts.unionbank.setAccAsharai(data);
                            data = null;
                        } else {
                            all.banks.accounts.unionbank.sendCardsCtrl(data);
                            data = null;
                        }
                    }
                }
            }
        } catch (e) {
            console.log("err loadAshraiAll(): " + e);
            unionbank.loadAshraiNew();
        }
    };


    unionbank.loadLoan = function () {
        var uri = "https://" + all.banks.accounts.unionbank.urlServices + "/ebanking/LoanAndMortgages/DisplayLoansAndMortgagesSummary.aspx";
        all.banks.core.services.httpReq(uri, 'GET', null, false, false)
            .then(function (res) {

                var urls = "https://" + all.banks.accounts.unionbank.urlServices + "/ebanking/LoanAndMortgages/DisplayLoansAndMortgagesSummary.aspx?init=ajaxbm&index=-1&SortBy=0&&_=" + new Date().getTime();
                all.banks.core.services.httpReq(urls, 'GET', null, false, false)
                    .then(function (data) {
                        var error = $(data).find("Error");
                        if (error.length == 0) {
                            getLoanLink(data);
                        } else {
                            unionbank.sendLoanCtrl(data);
                        }
                    });

                var indDDAcc = 0;

                function getAllLoans(arrLinks, res) {
                    if (arrLinks.length) {
                        $(arrLinks).each(function (i, v) {
                            if (i == indDDAcc) {
                                indDDAcc += 1;
                                all.banks.core.services.httpReq(v, 'GET', null, false, false)
                                    .then(function (data) {
                                        var data = all.banks.core.services.parseHtml(data);
                                        var loanFinish = data.find("#pnlDates tr").eq(2).find("td").eq(1).text();
                                        loanFinish = unionbank.convertDateLocal(loanFinish);

                                        var loanNextPaymentDate = data.find("#pnlDates tr").eq(3).find("td").eq(1).text();
                                        loanNextPaymentDate = unionbank.convertDateLocal(loanNextPaymentDate);

                                        var loanDate = data.find("#pnlDates tr").eq(1).find("td").eq(1).text();
                                        loanDate = unionbank.convertDateLocal(loanDate);

                                        all.banks.generalVariables.allDataArrLoan.push({
                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                            "Token": all.banks.accountDetails.bank.token,
                                            "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                            "BranchNumber": data.find("#pnlVariousData tr").eq(3).find("td").eq(1).text().split("-")[0].replace(/\D/g, ""),
                                            "AccountNumber": data.find("#pnlVariousData tr").eq(3).find("td").eq(1).text().split("-")[1].replace(/\D/g, ""),
                                            "LoanName": data.find("#pnlVariousData tr").eq(2).find("td").eq(1).text(),
                                            "LoanNumber": data.find("#pnlVariousData tr").eq(4).find("td").eq(1).text(),
                                            "LoanIntrest": data.find("#pnlInterestRate tr").eq(2).find("td").eq(1).text().replace("%", ""),
                                            "LoanFinish": all.banks.core.services.convertDateAll(loanFinish),
                                            "LoanTotalLeft": data.find("#pnlSummaries tr").eq(3).find("td").eq(1).text().replace(/,/g, ''),
                                            "LoanDate": all.banks.core.services.convertDateAll(loanDate),
                                            "PaymentsNumberLeft": data.find("#pnlSummaries tr").eq(1).find("td").eq(1).text(),
                                            "LoanOriginalTotal": data.find("#pnlSummaries tr").eq(2).find("td").eq(1).text().replace(/,/g, ''),
                                            "NextPaymentTotal": data.find("#pnlSummaries tr").eq(5).find("td").eq(1).text().replace(/,/g, ''),
                                            "LoanNextPaymentDate": all.banks.core.services.convertDateAll(loanNextPaymentDate),
                                            "LoanPigurTotal": null
                                        });
                                        if (i + 1 == arrLinks.length) {
                                            unionbank.sendLoanCtrl(res);
                                        } else {
                                            getAllLoans(arrLinks, res);
                                        }
                                    })
                                return false;
                            }
                        })
                    } else {
                        unionbank.sendLoanCtrl(res);
                    }
                }

                function getLoanLink(data) {
                    var arrLinks = [];
                    var xmlDataTable = $(data).find('table[tableID=TableNIS1]');
                    if (xmlDataTable.length) {
                        xmlDataTable.find("body row").each(function (ind, v) {
                            var decodeXmlVal = Base64Function.decode($(this).find("td").eq(0).text());
                            var urls1 = "https://" + all.banks.accounts.unionbank.urlServices + decodeXmlVal.split('A Href="')[1].split('" tabIndex="')[0];
                            arrLinks.push(urls1);
                            if (xmlDataTable.find("body row").length == ind + 1) {
                                getAllLoans(arrLinks, data);
                            }
                        })
                    } else {
                        unionbank.sendLoanCtrl(data);
                    }
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    };
    unionbank.loadDeposit = function () {
        var uri = "https://" + all.banks.accounts.unionbank.urlServices + "/ebanking/Investment/DisplayDepositsAndSavings.aspx";
        all.banks.core.services.httpReq(uri, 'GET', null, false, false)
            .then(function (res) {
                var res = all.banks.core.services.parseHtml(res);
                var accountCounter = 0;
                res.find("#ddlClientNumber_m_ddl option").each(function (i, v) {
                    if ($(v).val() !== "כל מספרי הלקוח") {
                        //console.log($(v).val());
                        accountCounter++;
                    }
                });
                var urls = "https://" + all.banks.accounts.unionbank.urlServices + "/ebanking/Investment/DisplayDepositsAndSavings.aspx?init=ajaxbm&index=" + accountCounter + "&indexOrder=" + accountCounter + "&&_=" + new Date().getTime();
                all.banks.core.services.httpReq(urls, 'GET', null, false, false)
                    .then(function (data) {
                        var error = $(data).find("Error");
                        if (error.length == 0 && $(data).find('#TOPERRORMESSAGEREGIONSERVERSIDEERROR').length == 0) {
                            getdDeoisitLink(data);
                        } else {
                            unionbank.sendDepositCtrl(data);
                        }
                    })
                    .fail(function (error, resErr, urlParam) {
                        var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                        all.banks.core.services.errorLog(logErr);
                    });

                var indDDAcc = 0;

                function getAllDeposit(arrLinks, res) {
                    if (arrLinks.length) {
                        $(arrLinks).each(function (i, v) {
                            if (indDDAcc == i) {
                                indDDAcc += 1;
                                all.banks.core.services.httpReq(v, 'GET', null, false, false)
                                    .then(function (data) {
                                        var data = all.banks.core.services.parseHtml(data);
                                        var depositInterest, dueDate, depositExistStation;
                                        if ($(data).find("#pnlInterestRate  tbody  tr").length == 5 || $(data).find("#pnlInterestRate  tbody  tr").length == 6) {
                                            depositInterest = $(data).find("#pnlInterestRate  tbody  tr").eq(4).children('td').eq(1).text().replace("%", "").trim();
                                        } else {
                                            depositInterest = $(data).find("#pnlInterestRate  tbody  tr").eq(2).children('td').eq(1).text().replace("%", "").trim();
                                        }
                                        var depositDate = null;
                                        $(data).find("#pnlDates  tbody  tr").each(function (idx, vals) {
                                            if ($(vals).text().indexOf("הפקדה") !== -1) {
                                                depositDate = $(vals).children('td').eq(1).text();
                                            }
                                            if ($(vals).text().indexOf("יציאה") !== -1) {
                                                depositExistStation = $(vals).children('td').eq(1).text();
                                            }
                                            if ($(vals).text().indexOf("פירעון") !== -1) {
                                                dueDate = $(vals).children('td').eq(1).text();
                                            }
                                        });
                                        if (depositExistStation == undefined) {
                                            depositExistStation = dueDate;
                                        }
                                        var accountNumber = data.find("#ddlClientNumber_m_ddl option:selected").val();
                                        var branchNumber = data.find("#ddlClientNumber_m_ddl option:selected").text().split("-")[0].replace(/\D/g, "");
                                        $(data).find(".Summary_lable1").each(function (idx, vals) {
                                            if ($(vals).text().includes("חשבון")) {
                                                var txtAcc = $(vals).next(".Summary_data2").text();
                                                accountNumber = txtAcc.split("-")[1].replace(/\D/g, "");
                                                branchNumber = txtAcc.split("-")[0].replace(/\D/g, "");
                                            }
                                        });
                                        var depositNumber = ($(data).find("#lblDepositSavingTxt").text().split("/")[$(data).find("#lblDepositSavingTxt").text().split(" ").length - 1]);
                                        if (depositNumber !== undefined) {
                                            depositNumber = depositNumber.replace(/\D/g, "");
                                            if (depositNumber == "") {
                                                depositNumber = null;
                                            }
                                        } else {
                                            depositNumber = null;
                                        }

                                        var depositTotal = null, depositAsTotal = null;
                                        $(data).find("#SummaryBoxDisplayDeposit tbody tr").eq(1).children("td").eq(2).find("table > tbody > tr").each(function (idx, vals) {
                                            if ($(vals).text().indexOf("סכום") !== -1) {
                                                depositTotal = $(vals).children("td").eq(1).text().replace("₪", "").replace(/,/g, '').replace(/\s/g, "");
                                            }
                                            if ($(vals).text().indexOf("שווי") !== -1) {
                                                depositAsTotal = $(vals).children("td").eq(1).text().replace("₪", "").replace(/,/g, '').replace(/\s/g, "");
                                            }
                                        });
                                        dueDate = unionbank.convertDateLocal(dueDate);
                                        depositDate = unionbank.convertDateLocal(depositDate);
                                        depositExistStation = unionbank.convertDateLocal(depositExistStation);

                                        all.banks.generalVariables.allDataArrDeposit.push({
                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                            "Token": all.banks.accountDetails.bank.token,
                                            "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                            "AccountNumber": accountNumber,
                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                            "BranchNumber": parseInt(branchNumber),
                                            "TypeName": $(data).find("#pnlVariousData  tbody  tr").eq(2).children('td').eq(1).text().replace(/\s\s+/g, " "),
                                            "DepositTotal": depositTotal,
                                            "DepositAsTotal": depositAsTotal,
                                            "DueDate": all.banks.core.services.convertDateAll(dueDate),
                                            "DepositDate": all.banks.core.services.convertDateAll(depositDate),
                                            "DepositExistStation": all.banks.core.services.convertDateAll(depositExistStation),
                                            "DepositNumber": depositNumber,
                                            "DepositInterest": depositInterest
                                        });
                                        if (i + 1 == arrLinks.length) {
                                            unionbank.sendDepositCtrl(res);
                                        } else {
                                            getAllDeposit(arrLinks, res);
                                        }
                                    });
                                return false;
                            }
                        })
                    } else {
                        unionbank.sendDepositCtrl(res);
                    }
                }

                function getdDeoisitLink(data) {
                    var xmlDataTable = $(data).find("table");
                    var arrLinks = [];
                    if (xmlDataTable) {
                        xmlDataTable.find("body row").each(function (ind, v) {
                            var decodeXmlVal = Base64Function.decode($(this).find("td").eq(0).text());
                            var urls1 = "https://" + all.banks.accounts.unionbank.urlServices + decodeXmlVal.split('A Href="')[1].split('" tabIndex="')[0];
                            arrLinks.push(urls1)
                            if (xmlDataTable.find("body row").length == ind + 1) {
                                getAllDeposit(arrLinks, res);
                            }
                        })
                    }
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    }
    unionbank.loadDueChecks = function (data) {
        var url = "https://" + all.banks.accounts.unionbank.urlServices + "/ebanking/Accounts/DisplayPostdatedChecks.aspx?FromPage=1";
        all.banks.core.services.httpReq(url, 'GET', null, false, false)
            .then(function (res) {
                var res = all.banks.core.services.parseHtml(res);
                var indDDAcc = 0;

                if ($(res).find("#ddlAccounts_m_ddl option").length === 0) {
                    unionbank.sendDueChecksCtrl(data);
                } else {
                    loadAllDataChecks(res);
                }

                function loadAllDataChecks(res) {
                    $(res).find("#ddlAccounts_m_ddl option").each(function (ind, val) {
                        if (ind == indDDAcc) {
                            var dateTo = ("0" + (new Date().getDate())).slice(-2) + '/' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '/' + new Date().getFullYear().toString().slice(-2);
                            var dateFromFormat = new Date(new Date().getFullYear(), new Date().getMonth() - 2, new Date().getDate());
                            var dateFrom = ("0" + (dateFromFormat.getDate())).slice(-2) + '/' + ("0" + (dateFromFormat.getMonth() + 1)).slice(-2) + '/' + dateFromFormat.getFullYear().toString().slice(-2);
                            var accVal = $(val).text();
                            var accBranchNumber = unionbank.getAcc(accVal);
                            var acc = {
                                'AccountNumber': accBranchNumber[0],
                                'BranchNumber': accBranchNumber[1]
                            };
                            var numberIdx = $(val).val();
                            var uri = "https://" + all.banks.accounts.unionbank.urlServices + "/ebanking/Accounts/DisplayPostdatedChecks.aspx?FromPage=1";
                            // var idx = 0;
                            // var textCook = all.banks.accounts.unionbank.cookies.split(";");
                            // $(textCook).each(function (index, val) {
                            // 	var names = val.split("=")[0].replace(/\s/g, "");
                            // 	if (names == "index") {
                            // 		textCook.splice(index, 1);
                            // 		textCook.push("index=" + numberIdx.toString());
                            // 		idx = 1;
                            // 	}
                            // 	if (index + 1 == textCook.length) {
                            // 		if (idx == 0) {
                            // 			textCook.push("index=" + numberIdx.toString());
                            // 		}
                            // 	}
                            // });
                            // all.banks.accounts.unionbank.cookies = textCook.join(";") + ";";
                            // console.log(all.banks.accounts.unionbank.cookies);
                            var jsons = {
                                "__EVENTTARGET": "",
                                "__EVENTARGUMENT": "",
                                "__LASTFOCUS": "",
                                "DES_Group": "",
                                "__VIEWSTATE": $(res).find('input[name="__VIEWSTATE"]').val(),
                                "__VIEWSTATEGENERATOR": $(res).find('#__VIEWSTATEGENERATOR').val(),
                                "__EVENTVALIDATION": $(res).find('#__EVENTVALIDATION').val(),
                                "hidtabindexCount": "121",
                                "hidExitValue": "0",
                                "hideGoogleSerachAlert": "הוזן תו לא חוקי",
                                "AjaxSaveAS": "",
                                "ddlAccounts$m_ddl": numberIdx,
                                "ddlCheckStatus": "כל השיקים",
                                "ddlDateType": "פירעון",
                                "ddlCheckPeriod": "3",
                                'dtFromDate$textBox': dateFrom,
                                'dtToDate$textBox': dateTo,
                                "btnDisplayDates.x": "15",
                                "btnDisplayDates.y": "8",
                                "ddlBankDescription": "",
                                "ftbPaidBranch": "",
                                "ftbPaidAccount": "",
                                "ddlDebitAccount": "כל החשבונות",
                                "ddlOperator": "יותר מ",
                                "ctbSum": "",
                                "PopupReturnCheckDescriptionReason$hItemIndex": "",
                                "hidSaveAsChoice": "",
                                "hShowAdvSearch": "false",
                                "hCanceledOrReturnedTotalCheckNumber": "",
                                "hCanceledOrReturnedTotalCheckSum": "",
                                "hPaidOrUnPaidTotalCheckNumber": $(res).find('#hPaidOrUnPaidTotalCheckNumber').val(),
                                "hPaidOrUnPaidTotalCheckSum": $(res).find('#hPaidOrUnPaidTotalCheckSum').val(),
                                "txtSearchValue": "חפש"
                            };

                            unionbank.synchronizeCookieSets().then(function () {
                                monitorActivityClass.setIntervalActivity();
                                senderReq.senderRest(uri, uri, all.banks.accounts.unionbank.cookies, jsons, resReq);
                                console.log("loadAllDataChecks() - senderRest POST");
                            });

                            function resReq(err, body) {
                                if (err) {
                                    console.log("err resReq - loadAllDataChecks");
                                    var dateFrom = ("0" + (new Date().getDate())).slice(-2) + '/' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '/' + new Date().getFullYear().toString().slice(-2);
                                    var dateToFormat = new Date(new Date().getFullYear(), new Date().getMonth() + 84, new Date().getDate());
                                    var dateTo = ("0" + (dateToFormat.getDate())).slice(-2) + '/' + ("0" + (dateToFormat.getMonth() + 1)).slice(-2) + '/' + dateToFormat.getFullYear().toString().slice(-2);
                                    jsons["dtFromDate$textBox"] = dateFrom;
                                    jsons["dtToDate$textBox"] = dateTo;
                                    loadChecks2(jsons);
                                } else {
                                    if (body == undefined) {
                                        console.log("body empty - loadAllDataChecks");
                                        var dateFrom = ("0" + (new Date().getDate())).slice(-2) + '/' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '/' + new Date().getFullYear().toString().slice(-2);
                                        var dateToFormat = new Date(new Date().getFullYear(), new Date().getMonth() + 84, new Date().getDate());
                                        var dateTo = ("0" + (dateToFormat.getDate())).slice(-2) + '/' + ("0" + (dateToFormat.getMonth() + 1)).slice(-2) + '/' + dateToFormat.getFullYear().toString().slice(-2);
                                        jsons["dtFromDate$textBox"] = dateFrom;
                                        jsons["dtToDate$textBox"] = dateTo;
                                        loadChecks2(jsons);
                                    } else {
                                        console.log("body resReq - loadAllDataChecks");
                                        var data = all.banks.core.services.parseHtml(body);
                                        res = null;
                                        var dateFrom = ("0" + (new Date().getDate())).slice(-2) + '/' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '/' + new Date().getFullYear().toString().slice(-2);
                                        var dateToFormat = new Date(new Date().getFullYear(), new Date().getMonth() + 84, new Date().getDate());
                                        var dateTo = ("0" + (dateToFormat.getDate())).slice(-2) + '/' + ("0" + (dateToFormat.getMonth() + 1)).slice(-2) + '/' + dateToFormat.getFullYear().toString().slice(-2);
                                        jsons = {
                                            "__EVENTTARGET": "",
                                            "__EVENTARGUMENT": "",
                                            "__LASTFOCUS": "",
                                            "DES_Group": "",
                                            "__VIEWSTATE": $(data).find('input[name="__VIEWSTATE"]').val(),
                                            "__VIEWSTATEGENERATOR": $(data).find('#__VIEWSTATEGENERATOR').val(),
                                            "__EVENTVALIDATION": $(data).find('#__EVENTVALIDATION').val(),
                                            "hidtabindexCount": "121",
                                            "hidExitValue": "0",
                                            "hideGoogleSerachAlert": "הוזן תו לא חוקי",
                                            "AjaxSaveAS": "",
                                            "ddlAccounts$m_ddl": numberIdx,
                                            "ddlCheckStatus": "כל השיקים",
                                            "ddlDateType": "פירעון",
                                            "ddlCheckPeriod": "3",
                                            'dtFromDate$textBox': dateFrom,
                                            'dtToDate$textBox': dateTo,
                                            "btnDisplayDates.x": "15",
                                            "btnDisplayDates.y": "8",
                                            "ddlBankDescription": "",
                                            "ftbPaidBranch": "",
                                            "ftbPaidAccount": "",
                                            "ddlDebitAccount": "כל החשבונות",
                                            "ddlOperator": "יותר מ",
                                            "ctbSum": "",
                                            "PopupReturnCheckDescriptionReason$hItemIndex": "",
                                            "hidSaveAsChoice": "",
                                            "hShowAdvSearch": "false",
                                            "hCanceledOrReturnedTotalCheckNumber": "",
                                            "hCanceledOrReturnedTotalCheckSum": "",
                                            "hPaidOrUnPaidTotalCheckNumber": $(data).find('#hPaidOrUnPaidTotalCheckNumber').val(),
                                            "hPaidOrUnPaidTotalCheckSum": $(data).find('#hPaidOrUnPaidTotalCheckSum').val(),
                                            "txtSearchValue": "חפש"
                                        };
//									var countDueChechs = data.find('#ctlPaidOrUnPaidChecks tbody tr').not('.header, .footer').length;
//									if (countDueChechs) {
//										var arr = [];
//										$(data).find('#ctlPaidOrUnPaidChecks tbody tr').not('.header, .footer').each(function (i, v) {
//											var deBank = $(v).find("td").eq(5).text().replace(/\s/g, "").split("-");
//											var depositeDate = $(v).find("td").eq(3).text();
//											var dueDate = $(v).find("td").eq(4).text();
//											depositeDate = unionbank.convertDateLocal(depositeDate);
//											dueDate = unionbank.convertDateLocal(dueDate);
//
//											all.banks.generalVariables.allDataArrDueChecks.push({
//												"TargetId": all.banks.accountDetails.bank.targetId,
//												"Token": all.banks.accountDetails.bank.token,
//												"BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
//												"ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
//												"ExporterId": all.banks.spiderConfig.spiderId,
//												"AccountNumber": acc.AccountNumber,
//												"BranchNumber": acc.BranchNumber,
//												"CheckNumber": $(v).find("td").eq(0).text(),
//												"CheckDescription": $(v).find("td").eq(2).text().replace(/\n/g, "").replace(/\t/g, ""),
//												"DepositeDate": all.banks.core.services.convertDateAll(depositeDate),
//												"DueDate": all.banks.core.services.convertDateAll(dueDate),
//												"CheckTotal": parseFloat($(v).find("td").eq(6).text().replace(/\s/g, "").replace(/,/g, '')),
//												"CheckBankNumber": deBank[0],
//												"CheckAccountNumber": deBank[2],
//												"CheckBranchNumber": deBank[1]
//											});
//											if (i + 1 == countDueChechs) {
//												loadChecks2(jsons);
//											}
//										})
//									}
//									else {
                                        loadChecks2(jsons);
//									}
                                    }
                                }
                            }

                            function loadChecks2(jsons) {
                                var uri = "https://" + all.banks.accounts.unionbank.urlServices + "/ebanking/Accounts/DisplayPostdatedChecks.aspx?FromPage=2";

                                unionbank.synchronizeCookieSets().then(function () {
                                    monitorActivityClass.setIntervalActivity();
                                    senderReq.senderRest(uri, uri, all.banks.accounts.unionbank.cookies, jsons, resReqs);
                                    console.log("loadChecks2() - senderRest POST");
                                });

                                function resReqs(err, body) {
                                    if (err) {
                                        console.log("err resReq - loadChecks2");
                                        if ((res.find("#ddlAccounts_m_ddl option").length - 1) > indDDAcc) {
                                            indDDAcc = indDDAcc + 1;
                                            loadAllDataChecks(res)
                                        } else {
                                            unionbank.sendDueChecksCtrl(res)
                                        }
                                    } else {
                                        if (body == undefined) {
                                            console.log("body empty - loadChecks2");
                                            if ((res.find("#ddlAccounts_m_ddl option").length - 1) > indDDAcc) {
                                                indDDAcc = indDDAcc + 1;
                                                loadAllDataChecks(res)
                                            } else {
                                                unionbank.sendDueChecksCtrl(res)
                                            }
                                        } else {
                                            console.log("body resReq - loadChecks2");
                                            var data = all.banks.core.services.parseHtml(body);
                                            res = null;

                                            if (data.find('#ctlPaidOrUnPaidChecks tbody tr').not('.header, .footer').length) {
                                                var countDueChechs = data.find('#ctlPaidOrUnPaidChecks tbody tr').not('.header, .footer').length;
                                                $(data).find('#ctlPaidOrUnPaidChecks tbody tr').not('.header, .footer').each(function (i, v) {
                                                    var deBank = $(v).find("td").eq(5).text().replace(/\s/g, "").split("-");
                                                    var depositeDate = $(v).find("td").eq(3).text();
                                                    var dueDate = $(v).find("td").eq(4).text();
                                                    depositeDate = unionbank.convertDateLocal(depositeDate);
                                                    dueDate = unionbank.convertDateLocal(dueDate);

                                                    all.banks.generalVariables.allDataArrDueChecks.push({
                                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                                        "Token": all.banks.accountDetails.bank.token,
                                                        "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                                        "AccountNumber": acc.AccountNumber,
                                                        "BranchNumber": acc.BranchNumber,
                                                        "CheckNumber": $(v).find("td").eq(0).text(),
                                                        "CheckDescription": $(v).find("td").eq(2).text().replace(/\n/g, "").replace(/\t/g, ""),
                                                        "DepositeDate": all.banks.core.services.convertDateAll(depositeDate),
                                                        "DueDate": all.banks.core.services.convertDateAll(dueDate),
                                                        "CheckTotal": parseFloat($(v).find("td").eq(6).text().replace(/\s/g, "").replace(/,/g, '')),
                                                        "CheckBankNumber": deBank[0],
                                                        "CheckAccountNumber": deBank[2],
                                                        "CheckBranchNumber": deBank[1]
                                                    });
                                                    if (i + 1 == countDueChechs) {
                                                        if ((data.find("#ddlAccounts_m_ddl option").length - 1) > indDDAcc) {
                                                            indDDAcc = indDDAcc + 1;
                                                            loadAllDataChecks(data)
                                                        } else {
                                                            unionbank.sendDueChecksCtrl(data)
                                                        }
                                                    }
                                                })
                                            } else {
                                                if ((data.find("#ddlAccounts_m_ddl option").length - 1) > indDDAcc) {
                                                    indDDAcc = indDDAcc + 1;
                                                    loadAllDataChecks(data)
                                                } else {
                                                    unionbank.sendDueChecksCtrl(data)
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            return false;
                        }
                    })
                };
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    };
    unionbank.loadStandingOrders = function () {
        var url = "https://" + all.banks.accounts.unionbank.urlServices + "/ebanking/Accounts/DisplayStandingOrders.aspx";
        all.banks.core.services.httpReq(url, 'GET', null, false, false)
            .then(function (res) {
                var res = all.banks.core.services.parseHtml(res);

                var indDDAcc = 0;

                function loadAllStandingOrders(res) {
                    if ($(res).find("#ddlAccounts_m_ddl option").length) {
                        $(res).find("#ddlAccounts_m_ddl option").each(function (ind, val) {
                            if (ind == indDDAcc) {
                                var jsons = {
                                    '__EVENTTARGET': 'ddlAccounts$m_ddl',
                                    '__EVENTARGUMENT': $(res).find('input[name="__EVENTARGUMENT"]').val(),
                                    '__LASTFOCUS': $(res).find('input[name="__LASTFOCUS"]').val(),
                                    '__VIEWSTATE': $(res).find('input[name="__VIEWSTATE"]').val(),
                                    '__EVENTVALIDATION': $(res).find('#__EVENTVALIDATION').val(),
                                    '__VIEWSTATEGENERATOR': $(res).find('#__VIEWSTATEGENERATOR').val(),
                                    'hidtabindexCount': $(res).find('input[name="hidtabindexCount"]').val(),
                                    'hidExitValue': $(res).find('input[name="hidExitValue"]').val(),
                                    'hideGoogleSerachAlert': 'הוזן תו לא חוקי',
                                    'AjaxSaveAS': $(res).find('input[name="AjaxSaveAS"]').val(),
                                    "ddlAccounts$m_ddl": $(val).val(),
                                    "txt_SortCommand": "",
                                    "txt_isSortAscending": "",
                                    "hidSaveAsChoice": "",
                                    "txtSearchValue": "חפש"
                                };
                                var accVal = $(val).text();
                                var accBranchNumber = unionbank.getAcc(accVal);
                                var acc = {
                                    'AccountNumber': accBranchNumber[0],
                                    'BranchNumber': accBranchNumber[1]
                                };
                                var uri = "https://" + all.banks.accounts.unionbank.urlServices + "/ebanking/Accounts/DisplayStandingOrders.aspx";
                                all.banks.core.services.httpReq(uri, 'POST', jsons, true, false)
                                    .then(function (data) {
                                        var data = all.banks.core.services.parseHtml(data);
                                        (async () => {
                                            const gridTransferSO = $(data).find('#gridTransferSO');
                                            if (gridTransferSO.length) {
                                                const items = $(data).find('#gridTransferSO .item');
                                                for (let i = 0; i < items.length; i++) {
                                                    const link = "https://" + all.banks.accounts.unionbank.urlServices + items.eq(i).find('a').attr('href');
                                                    const table = await all.banks.core.services.httpReq(link, 'GET', null, false, false);
                                                    const parseTable = all.banks.core.services.parseHtml(table);
                                                    const tblSummeryRightTop = parseTable.find('#tblSummeryRightTop');
                                                    const OrderName = tblSummeryRightTop.find('tr').eq(2).children("td").eq(1).text();
                                                    const OrderTotal = tblSummeryRightTop.find('tr').eq(3).children("td").eq(1).text().replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, '');
                                                    const Asmachta = tblSummeryRightTop.find('tr').eq(5).children("td").eq(1).text().replace(/\s/g, "");
                                                    const tblSummeryLeftTop = parseTable.find('#tblSummeryLeftTop');
                                                    const OrderOpeningDate = all.banks.core.services.convertDateAll(unionbank.convertDateLocal(tblSummeryLeftTop.find('tr').eq(0).children("td").eq(1).text().replace(/\s/g, "")));
                                                    const OrderLastDate = all.banks.core.services.convertDateAll(unionbank.convertDateLocal(tblSummeryLeftTop.find('tr').eq(2).children("td").eq(1).text().replace(/\s/g, "")));
                                                    const tblSummeryLeftDown = parseTable.find('#tblSummeryLeftDown');
                                                    const BankTransferNumber = all.banks.core.services.getTypeBank(tblSummeryLeftDown.find('tr').eq(1).children("td").eq(1).text());
                                                    const BranchTransferNumber = tblSummeryLeftDown.find('tr').eq(2).children("td").eq(1).text();
                                                    const AccountTransferNumber = tblSummeryLeftDown.find('tr').eq(3).children("td").eq(1).text();
                                                    const NamePayerTransfer = tblSummeryLeftDown.find('tr').eq(0).children("td").eq(1).text();

                                                    all.banks.generalVariables.allDataArrStandingOrders.push({
                                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                                        "Token": all.banks.accountDetails.bank.token,
                                                        "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                                        "AccountNumber": acc.AccountNumber,
                                                        "BranchNumber": acc.BranchNumber,
                                                        "OrderName": OrderName,
                                                        "OrderOpeningDate": OrderOpeningDate,
                                                        "OrderLastDate": OrderLastDate,
                                                        "OrderTotal": OrderTotal,
                                                        "OrderNumber": null,
                                                        "Asmachta": Asmachta,
                                                        BankTransferNumber: BankTransferNumber,
                                                        BranchTransferNumber: BranchTransferNumber,
                                                        AccountTransferNumber: AccountTransferNumber,
                                                        NamePayerTransfer: NamePayerTransfer,
                                                        Type: 1,
                                                    });
                                                }
                                            }


                                            var xmlBuildData;
                                            var xmlBuildDataExist = $(data).find('#MAINFORM').text().indexOf("BuildData");
                                            if (xmlBuildDataExist !== -1) {
                                                xmlBuildData = $(data).find('#MAINFORM').text().split("BuildData('")[1].split("');")[0];
                                            }
                                            var xmlParse = $.parseXML(xmlBuildData);
                                            var xmlParseBusinessModel = $(xmlParse).find("BusinessModel");
                                            if ($(data).find('#gridAuthorizedDebitSO tbody tr').not('.header, .footer, .level-2-wrapper').length) {
                                                $(data).find('#gridAuthorizedDebitSO tbody tr').not('.header, .footer, .level-2-wrapper').each(function (i, v) {
                                                    var decodeXmlVal = Base64Function.decode($(xmlParseBusinessModel).find('brules_' + i + 1).text()).split("|");
                                                    var tdValLen = $(v).children("td").length;
                                                    if (tdValLen == 5) {
                                                        all.banks.generalVariables.allDataArrStandingOrders.push({
                                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                                            "Token": all.banks.accountDetails.bank.token,
                                                            "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                                            "AccountNumber": acc.AccountNumber,
                                                            "BranchNumber": acc.BranchNumber,
                                                            "OrderName": $(v).children("td").eq(0).text().replace(/\s\s+/g, ""),
                                                            "OrderOpeningDate": all.banks.core.services.convertDateAll(unionbank.convertDateLocal($(v).children("td").eq(2).text().replace(/\s/g, ""))),
                                                            "OrderLastDate": all.banks.core.services.convertDateAll(unionbank.convertDateLocal($(v).children("td").eq(4).text().replace(/\s/g, ""))),
                                                            "OrderTotal": $(v).children("td").eq(3).text().replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, ''),
                                                            "OrderNumber": null,
                                                            "Asmachta": decodeXmlVal[0] == "" ? null : decodeXmlVal[0],
                                                            BankTransferNumber: null,
                                                            BranchTransferNumber: null,
                                                            AccountTransferNumber: null,
                                                            NamePayerTransfer: null,
                                                            Type: 1,
                                                        });
                                                    } else {
                                                        var orderLastDate = $(v).children("td").eq(5).text().replace(/\s/g, "").split(".");
                                                        if (orderLastDate.length == 1) {
                                                            orderLastDate = null;
                                                        } else {
                                                            if (orderLastDate[2].length == 2) {
                                                                if (parseFloat(orderLastDate[2]) > Number(new Date().getFullYear().toString().slice(2, 4))) {
                                                                    orderLastDate[2] = "19" + orderLastDate[2];
                                                                } else {
                                                                    orderLastDate[2] = "20" + orderLastDate[2];
                                                                }
                                                            }
                                                            orderLastDate = orderLastDate[0] + "/" + orderLastDate[1] + "/" + orderLastDate[2];
                                                        }


                                                        var orderOpeningDate = $(v).children("td").eq(3).text().replace(/\s/g, "").split(".");
                                                        if (orderOpeningDate.length == 1) {
                                                            orderOpeningDate = null;
                                                        } else {
                                                            if (orderOpeningDate[2].length == 2) {
                                                                if (parseFloat(orderOpeningDate[2]) > Number(new Date().getFullYear().toString().slice(2, 4))) {
                                                                    orderOpeningDate[2] = "19" + orderOpeningDate[2];
                                                                } else {
                                                                    orderOpeningDate[2] = "20" + orderOpeningDate[2];
                                                                }
                                                            }
                                                            orderOpeningDate = orderOpeningDate[0] + "/" + orderOpeningDate[1] + "/" + orderOpeningDate[2];
                                                        }

                                                        orderOpeningDate = unionbank.convertDateLocal(orderOpeningDate);
                                                        orderLastDate = unionbank.convertDateLocal(orderLastDate);

                                                        all.banks.generalVariables.allDataArrStandingOrders.push({
                                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                                            "Token": all.banks.accountDetails.bank.token,
                                                            "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                                            "AccountNumber": acc.AccountNumber,
                                                            "BranchNumber": acc.BranchNumber,
                                                            "OrderName": $(v).children("td").eq(1).text().replace(/\s\s+/g, ""),
                                                            "OrderOpeningDate": all.banks.core.services.convertDateAll(orderOpeningDate),
                                                            "OrderLastDate": all.banks.core.services.convertDateAll(orderLastDate),
                                                            "OrderTotal": $(v).children("td").eq(4).text().replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, ''),
                                                            "OrderNumber": $(v).children("td").eq(2).text().replace(/\s/g, ""),
                                                            "Asmachta": decodeXmlVal[0] == "" ? null : decodeXmlVal[0],
                                                            BankTransferNumber: null,
                                                            BranchTransferNumber: null,
                                                            AccountTransferNumber: null,
                                                            NamePayerTransfer: null,
                                                            Type: 1,
                                                        });
                                                    }
                                                    if (i + 1 == $(data).find('#gridAuthorizedDebitSO tbody tr').not('.header, .footer, .level-2-wrapper').length) {
                                                        if (($(res).find("#ddlAccounts_m_ddl option").length - 1) > indDDAcc) {
                                                            indDDAcc = indDDAcc + 1;
                                                            loadAllStandingOrders(data)
                                                        } else {
                                                            unionbank.sendStandingOrdersCtrl(data)
                                                        }
                                                    }
                                                })
                                            } else {
                                                if (($(res).find("#ddlAccounts_m_ddl option").length - 1) > indDDAcc) {
                                                    indDDAcc = indDDAcc + 1;
                                                    loadAllStandingOrders(data)
                                                } else {
                                                    unionbank.sendStandingOrdersCtrl(data)
                                                }
                                            }
                                        })();
                                    })
                                    .fail(function (error, resErr, urlParam) {
                                        var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                                        all.banks.core.services.errorLog(logErr)
                                    });
                                return false;
                            }
                        })
                    } else {
                        if (($(res).find("#ddlAccounts_m_ddl option").length - 1) > indDDAcc) {
                            indDDAcc = indDDAcc + 1;
                            loadAllStandingOrders(data)
                        } else {
                            unionbank.sendStandingOrdersCtrl(res)
                        }
                    }
                }

                loadAllStandingOrders(res)
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    };
    unionbank.loadMatah = function () {
        var url = "https://" + all.banks.accounts.unionbank.urlServices + "/ebanking/Accounts/ExtendedSummary.aspx?DisplayType=2&UC=310&from=sideMenu";
        all.banks.core.services.httpReq(url, 'GET', null, false, false)
            .then(function (res) {
                unionbank.synchronizeCookieSets().then(function () {
                    var resParsed = all.banks.core.services.parseHtml(res);
                    if (resParsed.find("#ddlClientNumber_m_ddl option").length > 1) {
                        resParsed.find("#ddlClientNumber_m_ddl option:last").remove();
                    }
                    var accMatah = resParsed.find("#ddlClientNumber_m_ddl option");
                    //console.log(accMatah.text());
                    if (accMatah.length > 0) {
                        loadAccMathah(accMatah, resParsed);
                    } else {
                        unionbank.sendOshCtrl(resParsed, true);
                    }
                });
            });

        var indexAcc = 0;

        function loadAccMathah(accMatah, res) {
            accMatah.each(function (i, v) {
                if (i == indexAcc) {
                    var val = $(v).val();
                    var text = $(v).text();
                    //console.log(val, text);
                    if (indexAcc > 0) {
                        var url = "https://" + all.banks.accounts.unionbank.urlServices + "/ebanking/Accounts/ExtendedSummary.aspx?DisplayType=2&UC=310&from=sideMenu";
                        all.banks.core.services.httpReq(url, 'GET', null, false, false)
                            .then(function (res) {
                                var res = all.banks.core.services.parseHtml(res);
                                var jsons = {
                                    '__EVENTTARGET': 'ddlClientNumber$m_ddl',
                                    '__EVENTARGUMENT': '',
                                    'DES_Group': '',
                                    'DES_JSE': '1',
                                    '__VIEWSTATE': res.find('input[name="__VIEWSTATE"]').val(),
                                    '__EVENTVALIDATION': res.find('#__EVENTVALIDATION').val(),
                                    '__VIEWSTATEGENERATOR': res.find('#__VIEWSTATEGENERATOR').val(),
                                    'hidtabindexCount': res.find('input[name="hidtabindexCount"]').val(),
                                    'hidExitValue': '0',
                                    'hideGoogleSerachAlert': 'הוזן תו לא חוקי',
                                    'AjaxSaveAS': res.find('input[name="AjaxSaveAS"]').val(),
                                    "ddlClientNumber$m_ddl": val,
                                    "txtSearchValue": "חפש",
                                    "popupLobyPage$hItemIndex": ""
                                };
                                var url = "https://" + all.banks.accounts.unionbank.urlServices + "/ebanking/Accounts/ExtendedSummary.aspx?DisplayType=2&UC=310&from=sideMenu";


                                unionbank.synchronizeCookieSets().then(function () {
                                    monitorActivityClass.setIntervalActivity();
                                    senderReq.senderRest(url, url, all.banks.accounts.unionbank.cookies, jsons, resReqPostDataAll);
                                    console.log("senderGetRest POST loadAccMathah()");
                                });
                            });
                    } else {
                        var jsons = {
                            '__EVENTTARGET': 'ddlClientNumber$m_ddl',
                            '__EVENTARGUMENT': '',
                            'DES_Group': '',
                            'DES_JSE': '1',
                            '__VIEWSTATE': res.find('input[name="__VIEWSTATE"]').val(),
                            '__EVENTVALIDATION': res.find('#__EVENTVALIDATION').val(),
                            '__VIEWSTATEGENERATOR': res.find('#__VIEWSTATEGENERATOR').val(),
                            'hidtabindexCount': res.find('input[name="hidtabindexCount"]').val(),
                            'hidExitValue': '0',
                            'hideGoogleSerachAlert': 'הוזן תו לא חוקי',
                            'AjaxSaveAS': res.find('input[name="AjaxSaveAS"]').val(),
                            "ddlClientNumber$m_ddl": val,
                            "txtSearchValue": "חפש",
                            "popupLobyPage$hItemIndex": ""
                        };
                        var url = "https://" + all.banks.accounts.unionbank.urlServices + "/ebanking/Accounts/ExtendedSummary.aspx?DisplayType=2&UC=310&from=sideMenu";


                        unionbank.synchronizeCookieSets().then(function () {
                            monitorActivityClass.setIntervalActivity();
                            senderReq.senderRest(url, url, all.banks.accounts.unionbank.cookies, jsons, resReqPostDataAll);
                            console.log("senderGetRest POST loadAccMathah()");
                        });
                    }

                    function resReqPostDataAll(err, body) {
                        if (err) {
                            console.log("err POST loadAccMathah()");
                            if (indexAcc + 1 == accMatah.length) {
                                unionbank.sendOshCtrl(res, true);
                            } else {
                                indexAcc = indexAcc + 1;
                                loadAccMathah(accMatah, res);
                            }
                        } else {
                            console.log("load POST loadAccMathah()");
                            try {
                                var data = all.banks.core.services.parseHtml(body);
                                //console.log("fdhdfhd/: ", data);
                                if (data == undefined) {
                                    console.log("undefined POST loadAccMathah()");
                                    if (indexAcc + 1 == accMatah.length) {
                                        unionbank.sendOshCtrl(res, true);
                                    } else {
                                        indexAcc = indexAcc + 1;
                                        loadAccMathah(accMatah, res);
                                    }
                                } else {
                                    var rows = data.find("#ctlForeignAccounts tr").not('.header, .footer');
                                    //console.log("rows length loadAccMathah()", rows.length);

                                    if (rows.length) {
                                        var accDeat = {
                                            'AccountNumber': text.split("-")[1].replace(/\D/g, ""),
                                            'BranchNumber': text.split("-")[0].replace(/\D/g, "")
                                        };

                                        var indxRows = 0;

                                        function loadRowsMatah(rows) {
                                            rows.each(function (idx, values) {
                                                if (idx == indxRows) {
                                                    //console.log("loadRowsMatah(): ", idx);
                                                    try {
                                                        var td = $(values).children("td");
                                                        var urlTd = "https://" + all.banks.accounts.unionbank.urlServices + "" + td.eq(0).find("A").attr("Href");
                                                        var balance = td.eq(4).text().replace(/\s/g, "").replace(/,/g, '');
                                                        if (balance == undefined) {
                                                            balance = 0;
                                                        }
                                                        var titleCur = td.eq(1).text();
                                                        var numbersAcc = td.eq(0).find("A span").eq(1).text().split(" ");
                                                        var acc = {
                                                            'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                                            'AccountNumber': numbersAcc[0].replace(/\D/g, ""),
                                                            'BranchNumber': accDeat.BranchNumber,
                                                            'Balance': balance,
                                                            'AccountCredit': null,
                                                            "BankAccountTypeId": numbersAcc[1].replace(/\D/g, ""),
                                                            "CurrencyId": all.banks.core.services.getTypeCurrencyAll(titleCur, true)
                                                        };
                                                        all.banks.generalVariables.allDataArrMatah.BankData[0].Account.push(acc);
                                                        all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow = [];
                                                        //console.log(acc);
                                                        senderReq.senderGetRest(urlTd, all.banks.accounts.unionbank.cookies, resGet);

                                                        function resGet(err, bodyData) {
                                                            var res;
                                                            if (err || (res = all.banks.core.services.parseHtml(bodyData)).find('#TOPERRORMESSAGEREGIONSERVERSIDEERROR > table > tbody > tr > td.errInfo').text()) {
                                                                //console.log("err loadRowsMatah(): ", indxRows);

                                                                if (indxRows + 1 == rows.length) {
                                                                    if (indexAcc + 1 == accMatah.length) {
                                                                        unionbank.sendOshCtrl(data, true);
                                                                    } else {
                                                                        indexAcc = indexAcc + 1;
                                                                        loadAccMathah(accMatah, data);
                                                                    }
                                                                } else {
                                                                    indxRows = indxRows + 1;
                                                                    loadRowsMatah(rows);
                                                                }
                                                            } else {
                                                                //	console.log("load loadRowsMatah(): ", indxRows);

//																var res = all.banks.core.services.parseHtml(bodyData);
                                                                var hidDatesElem = res.find('input[name="HidDates"]').val();
                                                                var loadDate;
                                                                if (hidDatesElem.split(';')[1] != null) {
                                                                    loadDate = hidDatesElem.split(";")[1];
                                                                }
                                                                var hidDates = "notload;" + loadDate;
                                                                var jsons = {
                                                                    '__EVENTTARGET': 'ctlActivityTable$ctl01$ctl00',
                                                                    '__EVENTARGUMENT': '',
                                                                    'DES_Group': '',
                                                                    'DES_JSE': '1',
                                                                    '__VIEWSTATE': res.find('input[name="__VIEWSTATE"]').val(),
                                                                    '__EVENTVALIDATION': res.find('#__EVENTVALIDATION').val(),
                                                                    '__VIEWSTATEGENERATOR': res.find('#__VIEWSTATEGENERATOR').val(),
                                                                    'hidtabindexCount': res.find('input[name="hidtabindexCount"]').val(),
                                                                    'hidExitValue': '0',
                                                                    'hideGoogleSerachAlert': 'הוזן תו לא חוקי',
                                                                    'AjaxSaveAS': res.find('input[name="AjaxSaveAS"]').val(),
                                                                    "ddlAccounts$m_ddl": urlTd.split("?index=")[1],
                                                                    "ForeignTypeFlag": "rbChecking",
                                                                    "ddlTransactionPeriod": "3",
                                                                    "dtFromDate$textBox": all.banks.accounts.unionbank.datebacksleshMatah,
                                                                    "dtToDate$textBox": all.banks.accounts.unionbank.datebacksleshToMatah,
                                                                    "btnDisplayDates.x": "21",
                                                                    "btnDisplayDates.y": "6",
                                                                    "hidSaveAsChoice": "",
                                                                    "popupLobyPage$hItemIndex": "",
                                                                    "popDescriptionData$lblParentCategory": "",
                                                                    "popDescriptionData$hTransactionID": "",
                                                                    "popDescriptionData$hParentCategoryID": "",
                                                                    "popDescriptionData$hCategoryCardIndex": "",
                                                                    "popDescriptionData$hSubcategoryID": "",
                                                                    "popDescriptionData$hAnnotationText": "",
                                                                    "hidExcel": "1",
                                                                    "hidExcelCD": "1",
                                                                    "HidDates": hidDates,
                                                                    "txtSearchValue": "חפש"
                                                                };
                                                                var url = "https://" + all.banks.accounts.unionbank.urlServices + "/ebanking/ForeignCurrency/DisplayForeignAccountsActivity.aspx";

                                                                unionbank.synchronizeCookieSets().then(function () {
                                                                    monitorActivityClass.setIntervalActivity();
                                                                    senderReq.senderRest(url, url, all.banks.accounts.unionbank.cookies, jsons, resReqPostData);
                                                                });

                                                                function resReqPostData(err, body) {
                                                                    if (err) {
                                                                        //	console.log("err loadRowsMatah() date: ", indxRows);

                                                                        if (indxRows + 1 == rows.length) {
                                                                            if (indexAcc + 1 == accMatah.length) {
                                                                                unionbank.sendOshCtrl(res, true);
                                                                            } else {
                                                                                indexAcc = indexAcc + 1;
                                                                                loadAccMathah(accMatah, res);
                                                                            }
                                                                        } else {
                                                                            indxRows = indxRows + 1;
                                                                            loadRowsMatah(rows);
                                                                        }
                                                                    } else {
                                                                        //	console.log("load loadRowsMatah() date: ", indxRows);

                                                                        jsons = null;
                                                                        var data = all.banks.core.services.parseHtml(body);
                                                                        all.banks.accounts.unionbank.dataInputs = data;
                                                                        try {
                                                                            if (data.find('#ctlActivityTable').length) {
                                                                                var arrIndxTh = {};
                                                                                data.find('#ctlActivityTable tbody').find("tr.header th").each(function (i1, v1) {
                                                                                    var v1 = $(v1);
                                                                                    if ($(v1).not(".HiddenColumn")) {
                                                                                        if ($(v1).text().indexOf("תאריך") !== -1 && $(v1).text().indexOf("ערך") == -1) {
                                                                                            arrIndxTh.date = i1;
                                                                                        }
                                                                                        if ($(v1).text().indexOf("תיאור") !== -1) {
                                                                                            arrIndxTh.transDesc = i1;
                                                                                        }
                                                                                        if ($(v1).text().indexOf("אסמכתא") !== -1) {
                                                                                            arrIndxTh.asmachta = i1;
                                                                                        }
                                                                                        if ($(v1).text().indexOf("חובה") !== -1) {
                                                                                            arrIndxTh.hova = i1;
                                                                                        }
                                                                                        if ($(v1).text().indexOf("זכות") !== -1) {
                                                                                            arrIndxTh.zchut = i1;
                                                                                        }
                                                                                        if ($(v1).text().indexOf("יתרה") !== -1) {
                                                                                            arrIndxTh.balance = i1;
                                                                                        }
                                                                                    }

                                                                                    if (data.find('#ctlActivityTable tbody').find("tr.header th").length == i1 + 1) {
                                                                                        var trTable = data.find('#ctlActivityTable tbody').find('tr').not(".header");
                                                                                        trTable.each(function (i, v) {
                                                                                            var date = v.cells[arrIndxTh.date].innerText.replace(/\s/g, "").replace(/\*/g, "");
                                                                                            var hova = v.cells[arrIndxTh.hova].innerText.replace(/\s/g, "").replace(/,/g, '');
                                                                                            var zchut = v.cells[arrIndxTh.zchut].innerText.replace(/\s/g, "").replace(/,/g, '');
                                                                                            var asmachta = v.cells[arrIndxTh.asmachta].innerText;
                                                                                            var transDesc = v.cells[arrIndxTh.transDesc].innerText.replace(/\n/g, "").replace(/\t/g, "");
                                                                                            var balance = v.cells[arrIndxTh.balance].innerText.replace(/\s/g, "").replace(/,/g, '');
                                                                                            date = unionbank.convertDateLocal(date);

                                                                                            var transactionType, sum;
                                                                                            if (zchut == '') {
                                                                                                transactionType = '0';
                                                                                                sum = hova;
                                                                                            } else {
                                                                                                transactionType = '1';
                                                                                                sum = zchut;
                                                                                            }
                                                                                            var depositeTransferData = null;
                                                                                            var valTdTransferData = $(v).find("td:first-child .foreignHiddenDiv span");
                                                                                            if (valTdTransferData.length) {
                                                                                                depositeTransferData = [
                                                                                                    {
                                                                                                        "DepositeTransferDate": all.banks.core.services.convertDateAll(date),
                                                                                                        "BankTransferNumber": null,
                                                                                                        "BranchTransferNumber": null,
                                                                                                        "AccountTransferNumber": null,
                                                                                                        "NamePayerTransfer": null,
                                                                                                        "DetailsTransfer": valTdTransferData.text(),
                                                                                                        "TransferTotal": sum
                                                                                                    }
                                                                                                ];
                                                                                                // if (valTdTransferData.text().indexOf(",") !== -1) {
                                                                                                // 	transDesc += " " + valTdTransferData.text().split(",")[1];
                                                                                                // }
                                                                                            }
                                                                                            all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.push({
                                                                                                "Asmachta": asmachta,
                                                                                                "TransDesc": transDesc,
                                                                                                "ValueDate": all.banks.core.services.convertDateAll(date),
                                                                                                "TransactionType": transactionType,
                                                                                                "TransTotal": sum,
                                                                                                "Balance": balance,
                                                                                                "IsDaily": "0",
                                                                                                "imgs": null,
                                                                                                "DepositeTransferData": depositeTransferData
                                                                                            });
                                                                                            if (trTable.length == i + 1) {
                                                                                                loadTableLowerMatch();
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                })
                                                                            } else if (data.find('#ctlTodayActivityTable').length) {
                                                                                loadTableLowerMatch();
                                                                            } else {
                                                                                if (indxRows + 1 == rows.length) {
                                                                                    if (indexAcc + 1 == accMatah.length) {
                                                                                        unionbank.sendOshCtrl(data, true);
                                                                                    } else {
                                                                                        indexAcc = indexAcc + 1;
                                                                                        loadAccMathah(accMatah, data);
                                                                                    }
                                                                                } else {
                                                                                    indxRows = indxRows + 1;
                                                                                    loadRowsMatah(rows);
                                                                                }
                                                                            }

                                                                            function loadTableLowerMatch() {
                                                                                if (data.find('#ctlTodayActivityTable').length) {
                                                                                    var arrIndxTh = {};
                                                                                    data.find('#ctlTodayActivityTable tbody').find("tr.header th").each(function (i1, v1) {
                                                                                        var v1 = $(v1);
                                                                                        if ($(v1).not(".HiddenColumn")) {
                                                                                            if ($(v1).text().indexOf("תאריך") !== -1 && $(v1).text().indexOf("ערך") == -1) {
                                                                                                arrIndxTh.date = i1;
                                                                                            }
                                                                                            if ($(v1).text().indexOf("תיאור") !== -1) {
                                                                                                arrIndxTh.transDesc = i1;
                                                                                            }
                                                                                            if ($(v1).text().indexOf("אסמכתא") !== -1) {
                                                                                                arrIndxTh.asmachta = i1;
                                                                                            }
                                                                                            if ($(v1).text().indexOf("חובה") !== -1) {
                                                                                                arrIndxTh.hova = i1;
                                                                                            }
                                                                                            if ($(v1).text().indexOf("זכות") !== -1) {
                                                                                                arrIndxTh.zchut = i1;
                                                                                            }
                                                                                            if ($(v1).text().indexOf("יתרה") !== -1) {
                                                                                                arrIndxTh.balance = i1;
                                                                                            }
                                                                                        }

                                                                                        if (data.find('#ctlTodayActivityTable tbody').find("tr.header th").length == i1 + 1) {
                                                                                            var trTable = data.find('#ctlTodayActivityTable tbody').find('tr').not(".header");
                                                                                            trTable.each(function (i, v) {
                                                                                                var date = v.cells[arrIndxTh.date].innerText.replace(/\s/g, "").replace(/\*/g, "");
                                                                                                var hova = v.cells[arrIndxTh.hova].innerText.replace(/\s/g, "").replace(/,/g, '');
                                                                                                var zchut = v.cells[arrIndxTh.zchut].innerText.replace(/\s/g, "").replace(/,/g, '');
                                                                                                var asmachta = v.cells[arrIndxTh.asmachta].innerText;
                                                                                                var transDesc = v.cells[arrIndxTh.transDesc].innerText.replace(/\n/g, "").replace(/\t/g, "");
                                                                                                var balance = v.cells[arrIndxTh.balance].innerText.replace(/\s/g, "").replace(/,/g, '');
                                                                                                date = unionbank.convertDateLocal(date);

                                                                                                var transactionType,
                                                                                                    sum;
                                                                                                if (zchut == '') {
                                                                                                    transactionType = '0';
                                                                                                    sum = hova;
                                                                                                } else {
                                                                                                    transactionType = '1';
                                                                                                    sum = zchut;
                                                                                                }
                                                                                                var depositeTransferData = null;
                                                                                                var valTdTransferData = $(v).find("td:first-child .foreignHiddenDiv span");
                                                                                                if (valTdTransferData.length) {
                                                                                                    depositeTransferData = [
                                                                                                        {
                                                                                                            "DepositeTransferDate": all.banks.core.services.convertDateAll(date),
                                                                                                            "BankTransferNumber": null,
                                                                                                            "BranchTransferNumber": null,
                                                                                                            "AccountTransferNumber": null,
                                                                                                            "NamePayerTransfer": null,
                                                                                                            "DetailsTransfer": valTdTransferData.text(),
                                                                                                            "TransferTotal": sum
                                                                                                        }
                                                                                                    ];
                                                                                                    if (valTdTransferData.text().indexOf(",") !== -1) {
                                                                                                        transDesc += " " + valTdTransferData.text().split(",")[1];
                                                                                                    }
                                                                                                }
                                                                                                all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.push({
                                                                                                    "Asmachta": asmachta,
                                                                                                    "TransDesc": transDesc,
                                                                                                    "ValueDate": all.banks.core.services.convertDateAll(date),
                                                                                                    "TransactionType": transactionType,
                                                                                                    "TransTotal": sum,
                                                                                                    "Balance": balance,
                                                                                                    "IsDaily": "1",
                                                                                                    "imgs": null,
                                                                                                    "DepositeTransferData": depositeTransferData
                                                                                                });
                                                                                                if (trTable.length == i + 1) {
                                                                                                    if (indxRows + 1 == rows.length) {
                                                                                                        if (indexAcc + 1 == accMatah.length) {
                                                                                                            unionbank.sendOshCtrl(data, true);
                                                                                                        } else {
                                                                                                            indexAcc = indexAcc + 1;
                                                                                                            loadAccMathah(accMatah, data);
                                                                                                        }
                                                                                                    } else {
                                                                                                        indxRows = indxRows + 1;
                                                                                                        loadRowsMatah(rows);
                                                                                                    }
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    })
                                                                                } else {
                                                                                    if (indxRows + 1 == rows.length) {
                                                                                        if (indexAcc + 1 == accMatah.length) {
                                                                                            unionbank.sendOshCtrl(data, true);
                                                                                        } else {
                                                                                            indexAcc = indexAcc + 1;
                                                                                            loadAccMathah(accMatah, data);
                                                                                        }
                                                                                    } else {
                                                                                        indxRows = indxRows + 1;
                                                                                        loadRowsMatah(rows);
                                                                                    }
                                                                                }
                                                                            }
                                                                        } catch (err) {
                                                                            all.banks.core.services.errorLog(err);
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    } catch (e) {
                                                        console.log(e)
                                                    }

                                                    return false;
                                                }
                                            });
                                        }

                                        loadRowsMatah(rows);
                                    } else {
                                        if (indexAcc + 1 == accMatah.length) {
                                            unionbank.sendOshCtrl(data, true);
                                        } else {
                                            indexAcc = indexAcc + 1;
                                            loadAccMathah(accMatah, data);
                                        }
                                    }
                                }
                            } catch (e) {
                                console.log(e)
                            }

                        }
                    }

                    return false;
                }
            });
        }
    };
    unionbank.logOut = async function (data) {
        all.banks.accounts.unionbank.cookies = "";
        const resp = await all.banks.core.services.httpReq("https://" + all.banks.accounts.unionbank.urlServices + "/ebanking/SO/SPA.aspx", 'GET', null, false, false);
        const sessionIDMatcher = /\\\"SessionID\\\"\s*\:\s*\\\"([a-fA-F0-9]{32})\\\"/gm.exec(resp);
        if (sessionIDMatcher !== null) {
            const sessionID = sessionIDMatcher[1];
            const options = {
                uri: "https://" + all.banks.accounts.unionbank.urlServices + "/ChannelWCF/Broker.svc/ProcessRequest",
                method: 'POST',
                family: 4,
                timeout: 100000,
                body: JSON.stringify({
                    "moduleName": "UC_SO_Signoff",
                    reqObj: JSON.stringify({
                        "SessionHeader": {"SessionID": sessionID, "FIID": "Igud"},
                    }),
                    "version": "V4.0"
                }),
                headers: {
                    "Host": "hb.unionbank.co.il",
                    "Origin": "https://hb.unionbank.co.il",
                    'Cookie': all.banks.accounts.unionbank.cookies,
                    'Referer': 'https://hb.unionbank.co.il/ebanking/SO/SPA.aspx',
                    'Upgrade-Insecure-Requests': '1',
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36",
                    "Connection": "keep-alive",
                    "Content-Type": "application/json; charset=UTF-8",
                    "Cache-Control": "no-cache"
                }
            }
            senderReq.sendersServer(options, (error, response, body) => {
                resumeLogOut();
            })
        } else {
            resumeLogOut();
        }


        function resumeLogOut() {
            all.banks.core.services.httpReq("https://" + all.banks.accounts.unionbank.urlServices + "/ebanking/logofffromvv.asp", 'GET', null, false, false)
                .then(function (data) {
                    if (parseInt(all.banks.accountDetails.bank.BankNumber) === 10) {
                        all.banks.core.services.httpReq("https://www.leumi.co.il/Leumi/Home/0,2777,5835,00.html", 'GET', null, false, false)
                    }
                    try {
                        myEmitterLogs(unionbank.logOutNumbers);
                    } catch (err) {
                        all.banks.core.services.errorLog(err)
                    }
                })
                .fail(function (error, resErr, urlParam) {
                    try {
                        myEmitterLogs(unionbank.logOutNumbers);
                    } catch (err) {
                        all.banks.core.services.errorLog(err)
                    }
                });
        };
    };
    unionbank.decodeThenUnescape = function (base64Encoded) {
        return !base64Encoded ? base64Encoded
            : unionbank.unescapeHtml(Base64Function.decode(base64Encoded));
    };
    unionbank.dummyForUnescape = $("<p></p>");
    unionbank.unescapeHtml = function (escapedText) {
        return !escapedText ? escapedText : unionbank.dummyForUnescape.html(escapedText).text();
    };

    unionbank.synchronizeCookieSets = function () {
        var dfd = jQuery.Deferred();
        win.cookies.getAll({}, function (cool) {
            all.banks.accounts.unionbank.cookies = cool
                .map(ck => {
                    return ck.name + "=" + (ck.name === "NisDateSort" ? "0" : ck.value);
                }).filter(it => it !== "=").join(";");
            dfd.resolve();
        });
        return dfd.promise();
    };

    unionbank.currencyFromNumber = function (numVal) {
        switch (Number(numVal)) {
            case -1:
                return 'ILS';
            case 1:
                return 'USD';
            case 3:
                return 'פרנק שוויצרי';
            case 12:
                return 'ין יפני';
            case 19:
                return 'לירה שטרלינג';
            case 49:
                return 'EUR';
            default:
                return 'notMetBefore';
        }
    }

    unionbank.loadAshraiNew = async function () {
        const resp = await all.banks.core.services.httpReq(
            "https://" + all.banks.accounts.unionbank.urlServices + "/ebanking/SO/SPA.aspx",
            'GET', null, false, false);
        try {
            const sessionIDMatcher = /\\\"SessionID\\\"\s*\:\s*\\\"([a-fA-F0-9]{32})\\\"/gm.exec(resp);
            if (sessionIDMatcher === null) {
                all.banks.accounts.unionbank.loadAshrai();
                return;
            }
            const sessionID = sessionIDMatcher[1];
            win.cookies.getAll({}, function (cool) {
                all.banks.accounts.unionbank.cookies = cool.filter(it => it.name !== "")
                    .map(ck => {
                        return ck.name + "=" + ck.value
                    })
                    .join(";");
                for (const cookie of all.banks.accounts.unionbank.cookies.split(";")) {
                    let [name, val] = cookie.split(";")[0].split("=");
                    win.cookies.set({
                        url: "https://unionbank.co.il",
                        name: name.replace(/\s/g, ""),
                        domain: ".unionbank.co.il",
                        value: val.replace(/\s/g, "")
                    });
                }
            });
            document.cookie = all.banks.accounts.unionbank.cookies;
            await waiting();
            const getAccountsData = {
                moduleName: "UC_SO_GetAccounts",
                reqObj: JSON.stringify({
                    "SessionHeader": {"SessionID": sessionID, "FIID": "Igud"},
                    "ComboMethod": "true",
                    "StateName": "CardsWorld",
                    "ModuleName": "UC_SO_GetAccounts",
                    "RequestedAccountTypes": "CHECKING",
                    "ExtAccountPermissions": "General",
                    "AccountSegments": ""
                }),
                version: "Infra_V2.0"
            }
            const getAccounts = await senderRests("https://" + all.banks.accounts.unionbank.urlServices +
                '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_GetAccounts', getAccountsData)
            const jsonRespAcc = JSON.parse(JSON.parse(getAccounts).jsonResp);
            // console.log('jsonRespAcc.AccountsItems', jsonRespAcc.AccountsItems);
            if (jsonRespAcc.AccountsItems && jsonRespAcc.AccountsItems.length) {
                if (all.banks.accountDetails.deleted_account_ids.length) {
                    jsonRespAcc.AccountsItems = jsonRespAcc.AccountsItems.filter(item => !(all.banks.accountDetails.deleted_account_ids.some(it => (item.MaskedNumber.split('-')[1].replace(/\D/g, "")).includes(it.toString()))))
                }
                for (let accIdx = 0; accIdx < jsonRespAcc.AccountsItems.length; accIdx++) {
                    // console.log('jsonRespAcc.AccountsItems[accIdx]', jsonRespAcc.AccountsItems[accIdx]);
                    myEmitterLogs(33, jsonRespAcc.AccountsItems[accIdx].MaskedNumber);
                    const maskedClientNumber = jsonRespAcc.AccountsItems[accIdx].MaskedNumber.split('-');
                    const branchNumber = maskedClientNumber[0].replace(/\D/g, "");
                    const accountNumber = maskedClientNumber[1].replace(/\D/g, "");
                    const objBase = {
                        "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                        "TargetId": all.banks.accountDetails.bank.targetId,
                        "Token": all.banks.accountDetails.bank.token,
                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                        "ExporterId": all.banks.spiderConfig.spiderId,
                        "BranchNumber": branchNumber,
                        "AccountNumber": accountNumber,
                    }
                    const accountIndex = jsonRespAcc.AccountsItems[accIdx].AccountIndex;
                    const setAccount = {
                        moduleName: "UC_SO_010_03_SetDefaultAccountIndex",
                        reqObj: JSON.stringify({
                            "SessionHeader": {"SessionID": sessionID, "FIID": "Igud"},
                            "AccountIndex": accountIndex,
                            "StateName": "creditcardinfo",
                            "ModuleName": "UC_SO_010_03_SetDefaultAccountIndex",
                            "ComboMethod": "true",
                            "RequestedAccountTypes": "CHECKING",
                            "ExtAccountPermissions": "General",
                            "AccountSegments": ""
                        }),
                        version: "V4.0"
                    }
                    await senderRests("https://" + all.banks.accounts.unionbank.urlServices + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_010_03_SetDefaultAccountIndex', setAccount)

                    const getAllCardsParams = {
                        moduleName: "UC_SO_GetCreditCardsInfo",
                        reqObj: JSON.stringify({
                            "SessionHeader": {"SessionID": sessionID, "FIID": "Igud"},
                            "AccountIndex": accountIndex,
                            "StateName": "creditcardinfo",
                            "ModuleName": "UC_SO_GetCreditCardsInfo"
                        }),
                        version: "V4.0"
                    }
                    const getAllCards = await senderRests("https://" + all.banks.accounts.unionbank.urlServices + "/" + 'ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_GetCreditCardsInfo', getAllCardsParams)


                    const jsonRespAllCards = JSON.parse(JSON.parse(getAllCards).jsonResp);
                    try {
//                         const cardsToProcess = [
//                             ...(Array.isArray(jsonRespAllCards.CreditCardsItems) ? jsonRespAllCards.CreditCardsItems : []) //,
// //                                            ...(Array.isArray(jsonRespAllCards.DebitCardsItems) ? jsonRespAllCards.DebitCardsItems : [])
//                         ];

                        const cardsToProcess = [
                            ...(Array.isArray(jsonRespAllCards.CreditCardsItems) ? jsonRespAllCards.CreditCardsItems : []),
                            ...(Array.isArray(jsonRespAllCards.OtherCreditCardsItems) ? jsonRespAllCards.OtherCreditCardsItems : []),
                            ...(Array.isArray(jsonRespAllCards.DebitCardsItems) ? jsonRespAllCards.DebitCardsItems : [])
                        ];

                        if (cardsToProcess.length) {
                            // console.log('jsonRespAllCards.CreditCardsItems', jsonRespAllCards.CreditCardsItems)
                            for (let cardIdx = 0; cardIdx < cardsToProcess.length; cardIdx++) {
                                const card = cardsToProcess[cardIdx];
                                const cardStatus = (card.BlockCardStatus && card.BlockCardStatus === 6) ? "1" : null;
                                const cardIndex = card.CardIndex;
                                const cardType = all.banks.core.services.getTypeCard(card.DisplayName)


                                const getAllPeriodsParams = {
                                    moduleName: "UC_MS_125_CreditCardsInfo",
                                    reqObj: JSON.stringify({
                                        "StateName": "CardsWorld",
                                        "ModuleName": "UC_MS_125_CreditCardsInfo",
                                        "SessionHeader": {"SessionID": sessionID, "FIID": "Igud"},
                                        "AccountIndexSpecified": true,
                                        "CardIndex": cardIndex,
                                        "Operation": 2,
                                        "OperationSpecified": true,
                                        "AccountIndex": accountIndex
                                    }),
                                    version: "Infra_V2.0"
                                }
                                const getAllPeriods = await all.banks.core.services.httpReq('https://' + all.banks.accounts.unionbank.urlServices
                                    + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_MS_125_CreditCardsInfo', 'POST', getAllPeriodsParams, false, false);
                                const jsonRespAllPeriods = JSON.parse(getAllPeriods.jsonResp);
                                const cardNumber = card.CardLast4Digits;


                                //
                                // const getAllPeriodsParams = {
                                //     moduleName: "UC_SO_125_GetTotalDebitAndPaymentsDates",
                                //     reqObj: JSON.stringify({
                                //         "SessionHeader": {"SessionID": sessionID, "FIID": "Igud"},
                                //         "CreditCardIndex": cardIndex,
                                //         "StateName": "creditcardinfo",
                                //         "ModuleName": "UC_SO_125_GetTotalDebitAndPaymentsDates"
                                //     }),
                                //     version: "V4.0"
                                // }
                                // const getAllPeriods = await senderRests("https://" + all.banks.accounts.unionbank.urlServices
                                //     + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_125_GetTotalDebitAndPayments', getAllPeriodsParams)
                                // const jsonRespAllPeriods = JSON.parse(JSON.parse(getAllPeriods).jsonResp);
                                // const cardNumber = card.CardLast4Digits;

                                if (jsonRespAllPeriods.Graph && jsonRespAllPeriods.Graph.DebitMonthItems && jsonRespAllPeriods.Graph.DebitMonthItems.length) {
                                    // if (jsonRespAllPeriods.DatePaymentItems && jsonRespAllPeriods.DatePaymentItems.length) {
                                    // console.log('jsonRespAllCards.DatePaymentItems', jsonRespAllPeriods.DatePaymentItems)

                                    for (let periodIdx = 0; periodIdx < jsonRespAllPeriods.Graph.DebitMonthItems.length && ((periodIdx) < all.banks.accountDetails.ccardMonth) && (new Date(jsonRespAllPeriods.Graph.DebitMonthItems[periodIdx].CycleDate) < new Date(card.DatePaymentDueUTC)); periodIdx++) {

                                        // for (let periodIdx = 0; periodIdx < jsonRespAllPeriods.DatePaymentItems.length && (new Date(jsonRespAllPeriods.DatePaymentItems[periodIdx].PaymentDateUTC) < new Date(card.DatePaymentDueUTC));
                                        //      periodIdx++) {

                                        const CycleDate = jsonRespAllPeriods.Graph.DebitMonthItems[periodIdx].CycleDate;
                                        const getCreditCardActivityParams = {
                                            moduleName: "UC_MS_125_CreditCardsInfo",
                                            reqObj: JSON.stringify(
                                                {
                                                    "StateName": "CardsWorld",
                                                    "ModuleName": "UC_MS_125_CreditCardsInfo",
                                                    "SessionHeader": {"SessionID": sessionID, "FIID": "Igud"},
                                                    "AccountIndexSpecified": true,
                                                    "CardIndex": cardIndex,
                                                    "Operation": 3,
                                                    "OperationSpecified": true,
                                                    "CardPeriodType": 99,
                                                    "CardPeriodTypeSpecified": true,
                                                    "CycleDate": CycleDate,
                                                    "AccountIndex": accountIndex
                                                }
                                            ),
                                            version: "Infra_V2.0"
                                        }
                                        const getCreditCardActivity = await all.banks.core.services.httpReq('https://' + all.banks.accounts.unionbank.urlServices
                                            + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_MS_125_CreditCardsInfo', 'POST', getCreditCardActivityParams, false, false);

                                        const jsonRespCardActivity = JSON.parse(getCreditCardActivity.jsonResp);
                                        if (jsonRespCardActivity) {
                                            if (jsonRespCardActivity.SOStatus.Status === false && jsonRespCardActivity.SOStatus.SOStatusItem.length && jsonRespCardActivity.SOStatus.SOStatusItem[0].Code === 1) {

                                            } else {
                                                const nextBillingDate = all.banks.core.services.convertDateAll(jsonRespCardActivity.Activity.LastUpdateUTC);
                                                myEmitterLogs(15, cardNumber + ' period ' + nextBillingDate);
                                                // console.log('jsonRespCardActivity', jsonRespCardActivity)

                                                if (Array.isArray(jsonRespCardActivity.Activity.TabNisTransactionItems) && jsonRespCardActivity.Activity.TabNisTransactionItems.length) {
                                                    for (const tabNIS of jsonRespCardActivity.Activity.TabNisTransactionItems) {
                                                        const nextCycleTotal = tabNIS.TotalAmountDouble;
                                                        if (Array.isArray(tabNIS.NisTransactionItems) && tabNIS.NisTransactionItems.length) {
                                                            const tableBase = Object.assign(
                                                                {
                                                                    "CardNumber": cardNumber,
                                                                    "CardType": cardType,
                                                                    "CardStatus": cardStatus,
                                                                    "NextCycleTotal": nextCycleTotal,
                                                                    "ind_iskat_hul": 1
                                                                },
                                                                objBase,
                                                                jsonRespCardActivity.Activity.TabNisTransactionItems.length === 2 && tabNIS.TableID === 2
                                                                    ? {comment: 'לידיעה בלבד'} : {});
                                                            for (const row of tabNIS.NisTransactionItems) {
                                                                tableBase["NextBillingDate"] = row.DebitCardDebitPeriodUTC
                                                                    ? all.banks.core.services.convertDateAll(row.DebitCardDebitPeriodUTC)
                                                                    : nextBillingDate;
                                                                all.banks.generalVariables.allDataArrAshrai.push(
                                                                    Object.assign(asArrAshraiItem(row), tableBase)
                                                                );
                                                            }
                                                        }
                                                    }
                                                }

                                                if (Array.isArray(jsonRespCardActivity.Activity.TabForeignTransactionItems) && jsonRespCardActivity.Activity.TabForeignTransactionItems.length) {
                                                    for (const tabForeign of jsonRespCardActivity.Activity.TabForeignTransactionItems) {
                                                        if (Array.isArray(tabForeign.ForeignTransactionItems) && tabForeign.ForeignTransactionItems.length) {
                                                            const ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(unionbank.currencyFromNumber(tabForeign.Currency));
                                                            const nextCycleTotal = tabForeign.TotalAmountDouble;
                                                            const tableBase = Object.assign(
                                                                {
                                                                    "CardNumber": cardNumber,
                                                                    "CardType": cardType,
                                                                    "CardStatus": cardStatus,
                                                                    "NextCycleTotal": nextCycleTotal,
                                                                    "ind_iskat_hul": ind_iskat_hul
                                                                },
                                                                objBase,
                                                                jsonRespCardActivity.Activity.TabForeignTransactionItems.length === 2 && tabForeign.TableID === 2
                                                                    ? {comment: 'לידיעה בלבד'} : {});
                                                            for (const row of tabForeign.ForeignTransactionItems) {
                                                                tableBase["NextBillingDate"] = row.DebitCardDebitPeriodUTC
                                                                    ? all.banks.core.services.convertDateAll(row.DebitCardDebitPeriodUTC)
                                                                    : nextBillingDate;
                                                                all.banks.generalVariables.allDataArrAshrai.push(
                                                                    Object.assign(asArrAshraiItem(row), tableBase)
                                                                );
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }


//                                         const nextBillingDate = all.banks.core.services.convertDateAll(jsonRespAllPeriods.DatePaymentItems[periodIdx].PaymentDateUTC);
//                                         myEmitterLogs(15, cardNumber + ' period ' + nextBillingDate);
//                                         const nextCycleTotal = jsonRespAllPeriods.DatePaymentItems[periodIdx].DebitSum;
//                                         const cardPeriodType = jsonRespAllPeriods.DatePaymentItems[periodIdx].CardPeriodType;
//                                         const getCreditCardActivityParams = {
//                                             moduleName: "UC_SO_125_GetCreditCardActivity",
//                                             reqObj: JSON.stringify({
//                                                 "SessionHeader": {"SessionID": sessionID, "FIID": "Igud"},
//                                                 "CardIndex": cardIndex,
//                                                 "CardPeriodType": cardPeriodType,
//                                                 "StateName": "creditcardinfo",
//                                                 "ModuleName": "UC_SO_125_GetCreditCardActivity"
//                                             }),
//                                             version: "V4.0"
//                                         }
//                                         const getCreditCardActivity = await senderRests("https://" + all.banks.accounts.unionbank.urlServices
//                                             + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_125_GetTotalDebitAndPayments', getCreditCardActivityParams)
//                                         const jsonRespCardActivity = JSON.parse(JSON.parse(getCreditCardActivity).jsonResp);
//                                         if (jsonRespCardActivity) {
//                                             // console.log('jsonRespCardActivity', jsonRespCardActivity)
//                                             if (Array.isArray(jsonRespCardActivity.TabNISTransactionItems) && jsonRespCardActivity.TabNISTransactionItems.length) {
//                                                 for (const tabNIS of jsonRespCardActivity.TabNISTransactionItems) {
//                                                     if (Array.isArray(tabNIS.NISTransactionItems) && tabNIS.NISTransactionItems.length) {
//                                                         for (const row of tabNIS.NISTransactionItems) {
//                                                             let currentPaymentNum = null;
//                                                             let totalPayments = null;
//                                                             let transTotal = transTotalFrom(row);
//                                                             let comment = !!row.DealDescription ? row.DealDescription : null;
//                                                             if (row.TypeOfTransaction === 666) { //trans with payments
//                                                                 const payments = row.DealDescription.split('מ -');
//                                                                 if (payments.length > 1) {
//                                                                     currentPaymentNum = payments[0].replace(/\D/g, ""); //current payment
//                                                                     totalPayments = payments[1].replace(/\D/g, ""); //total payments
//                                                                 }
// //                                                                                                            transTotal = row.DebitCardNextPaymentAmount;
//                                                             } else if (row.TypeOfTransaction === 667) {
//                                                                 comment = 'לידיעה בלבד';
//                                                             }
//                                                             if (jsonRespCardActivity.TabNISTransactionItems.length === 2 && tabNIS.TableID === 2) {
//                                                                 comment = 'לידיעה בלבד';
//                                                             }
//                                                             all.banks.generalVariables.allDataArrAshrai.push(Object.assign({
//                                                                 "CardNumber": cardNumber,
//                                                                 "NextBillingDate": all.banks.core.services.convertDateAll(row.DebitCardDebitPeriodUTC),
//                                                                 // "NextBillingDate": nextBillingDate,
//                                                                 "NextCycleTotal": nextCycleTotal,
//                                                                 "CardStatus": null,
//                                                                 "TransDesc": row.DebitCardFirmName,
//                                                                 "TransTotal": transTotal,
//                                                                 "ValueDate": all.banks.core.services.convertDateAll(row.DateDealUTC),
//                                                                 "TransCategory": null,
//                                                                 "TotalPayments": totalPayments,
//                                                                 "CurrentPaymentNum": currentPaymentNum,
//                                                                 "CardType": cardType,
//                                                                 "indFakeDate": 0,
//                                                                 "currency_id": all.banks.core.services.getTypeCurrencyAll(unionbank.currencyFromNumber(row.TransactionCurrency)),
//                                                                 "original_total": row.AmountDouble,
//                                                                 "ind_iskat_hul": 1,
//                                                                 "comment": comment
//                                                             }, objBase));
//                                                         }
//                                                     }
//                                                 }
//                                             }
//
//                                             if (Array.isArray(jsonRespCardActivity.TabForeignTransactionItems) && jsonRespCardActivity.TabForeignTransactionItems.length) {
//                                                 for (const tabForeign of jsonRespCardActivity.TabForeignTransactionItems) {
//                                                     if (Array.isArray(tabForeign.ForeignTransactionItems) && tabForeign.ForeignTransactionItems.length) {
//                                                         const ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(unionbank.currencyFromNumber(tabForeign.Currency));
//                                                         for (const row of tabForeign.ForeignTransactionItems) {
//                                                             let currentPaymentNum = null;
//                                                             let totalPayments = null;
//                                                             let transTotal = transTotalFrom(row);
//                                                             let comment = !!row.DealDescription ? row.DealDescription : null;
//                                                             if (row.TypeOfTransaction === 666) { //trans with payments
//                                                                 const payments = row.DealDescription.split('מ -');
//                                                                 if (payments.length > 1) {
//                                                                     currentPaymentNum = payments[0].replace(/\D/g, ""); //current payment
//                                                                     totalPayments = payments[1].replace(/\D/g, ""); //total payments
//                                                                 }
// //                                                                                                            transTotal = row.DebitCardNextPaymentAmount;
//                                                             } else if (row.TypeOfTransaction === 667) {
//                                                                 comment = 'לידיעה בלבד';
//                                                             }
//                                                             if (jsonRespCardActivity.TabForeignTransactionItems.length === 2 && tabForeign.TableID === 2) {
//                                                                 comment = 'לידיעה בלבד';
//                                                             }
//                                                             all.banks.generalVariables.allDataArrAshrai.push(Object.assign({
//                                                                 "CardNumber": cardNumber,
//                                                                 "NextBillingDate": all.banks.core.services.convertDateAll(row.DebitCardDebitPeriodUTC),
//                                                                 "NextCycleTotal": nextCycleTotal,
//                                                                 "CardStatus": null,
//                                                                 "TransDesc": row.DebitCardFirmName,
//                                                                 "TransTotal": transTotal,
//                                                                 "ValueDate": all.banks.core.services.convertDateAll(row.DateDealUTC),
//                                                                 "TransCategory": null,
//                                                                 "TotalPayments": totalPayments,
//                                                                 "CurrentPaymentNum": currentPaymentNum,
//                                                                 "CardType": cardType,
//                                                                 "indFakeDate": 0,
//                                                                 "currency_id": all.banks.core.services.getTypeCurrencyAll(unionbank.currencyFromNumber(row.TransactionCurrency)),
//                                                                 "original_total": row.AmountDouble,
//                                                                 "ind_iskat_hul": ind_iskat_hul,
//                                                                 "comment": comment
//                                                             }, objBase));
//                                                         }
//                                                     }
//                                                 }
//                                             }
//
//                                         }
                                    }
                                }
                                //all.banks.accountDetails.ccardMonth
                            }
                        }

//                         if (jsonRespAllCards.OtherCreditCardsItems && jsonRespAllCards.OtherCreditCardsItems.length) {
//                             // console.log('jsonRespAllCards.OtherCreditCardsItems', jsonRespAllCards.OtherCreditCardsItems)
//                             for (let cardIdx = 0; cardIdx < jsonRespAllCards.OtherCreditCardsItems.length; cardIdx++) {
//                                 const cardIndex = jsonRespAllCards.OtherCreditCardsItems[cardIdx].CardIndex;
//                                 const cardType = all.banks.core.services.getTypeCard(jsonRespAllCards.OtherCreditCardsItems[cardIdx].DisplayName)
//                                 const getAllPeriodsParams = {
//                                     moduleName: "UC_SO_125_GetTotalDebitAndPaymentsDates",
//                                     reqObj: JSON.stringify({
//                                         "SessionHeader": {"SessionID": sessionID, "FIID": "Igud"},
//                                         "CreditCardIndex": cardIndex,
//                                         "StateName": "creditcardinfo",
//                                         "ModuleName": "UC_SO_125_GetTotalDebitAndPaymentsDates"
//                                     }),
//                                     version: "V4.0"
//                                 }
//                                 const getAllPeriods = await senderRests("https://" + all.banks.accounts.unionbank.urlServices
//                                     + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_125_GetTotalDebitAndPayments', getAllPeriodsParams)
//                                 const jsonRespAllPeriods = JSON.parse(JSON.parse(getAllPeriods).jsonResp);
//
//                                 const cardNumber = jsonRespAllCards.OtherCreditCardsItems[cardIdx].CardLast4Digits;
//                                 if (jsonRespAllPeriods.DatePaymentItems && jsonRespAllPeriods.DatePaymentItems.length) {
//                                     // console.log('jsonRespAllCards.DatePaymentItems', jsonRespAllPeriods.DatePaymentItems)
//                                     for (let periodIdx = 0; periodIdx < (jsonRespAllPeriods.DatePaymentItems.length); periodIdx++) {
//                                         const nextBillingDate = all.banks.core.services.convertDateAll(jsonRespAllPeriods.DatePaymentItems[periodIdx].PaymentDateUTC);
//                                         myEmitterLogs(15, cardNumber + ' period ' + nextBillingDate);
//                                         const nextCycleTotal = jsonRespAllPeriods.DatePaymentItems[periodIdx].DebitSum;
//                                         const cardPeriodType = jsonRespAllPeriods.DatePaymentItems[periodIdx].CardPeriodType;
//                                         const getCreditCardActivityParams = {
//                                             moduleName: "UC_SO_125_GetCreditCardActivity",
//                                             reqObj: JSON.stringify({
//                                                 "SessionHeader": {"SessionID": sessionID, "FIID": "Igud"},
//                                                 "CardIndex": cardIndex,
//                                                 "CardPeriodType": cardPeriodType,
//                                                 "StateName": "creditcardinfo",
//                                                 "ModuleName": "UC_SO_125_GetCreditCardActivity"
//                                             }),
//                                             version: "V4.0"
//                                         }
//                                         const getCreditCardActivity = await senderRests("https://" + all.banks.accounts.unionbank.urlServices
//                                             + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_125_GetTotalDebitAndPayments', getCreditCardActivityParams)
//                                         const jsonRespCardActivity = JSON.parse(JSON.parse(getCreditCardActivity).jsonResp);
//                                         if (jsonRespCardActivity) {
//                                             // console.log('jsonRespCardActivity', jsonRespCardActivity)
//                                             if (Array.isArray(jsonRespCardActivity.TabNISTransactionItems) && jsonRespCardActivity.TabNISTransactionItems.length) {
//                                                 for (const tabNIS of jsonRespCardActivity.TabNISTransactionItems) {
//                                                     if (Array.isArray(tabNIS.NISTransactionItems) && tabNIS.NISTransactionItems.length) {
//                                                         for (const row of tabNIS.NISTransactionItems) {
//                                                             let currentPaymentNum = null;
//                                                             let totalPayments = null;
//                                                             let transTotal = transTotalFrom(row);
//                                                             let comment = !!row.DealDescription ? row.DealDescription : null;
//                                                             if (row.TypeOfTransaction === 666) { //trans with payments
//                                                                 const payments = row.DealDescription.split('מ -');
//                                                                 if (payments.length > 1) {
//                                                                     currentPaymentNum = payments[0].replace(/\D/g, ""); //current payment
//                                                                     totalPayments = payments[1].replace(/\D/g, ""); //total payments
//                                                                 }
// //                                                                                                            transTotal = row.DebitCardNextPaymentAmount;
//                                                             } else if (row.TypeOfTransaction === 667) {
//                                                                 comment = 'לידיעה בלבד';
//                                                             }
//                                                             if (jsonRespCardActivity.TabNISTransactionItems.length === 2 && tabNIS.TableID === 2) {
//                                                                 comment = 'לידיעה בלבד';
//                                                             }
//                                                             all.banks.generalVariables.allDataArrAshrai.push(Object.assign({
//                                                                 "CardNumber": cardNumber,
//                                                                 "NextBillingDate": nextBillingDate,
//                                                                 "NextCycleTotal": nextCycleTotal,
//                                                                 "CardStatus": null,
//                                                                 "TransDesc": row.DebitCardFirmName,
//                                                                 "TransTotal": transTotal,
//                                                                 "ValueDate": all.banks.core.services.convertDateAll(row.DateDealUTC),
//                                                                 "TransCategory": null,
//                                                                 "TotalPayments": totalPayments,
//                                                                 "CurrentPaymentNum": currentPaymentNum,
//                                                                 "CardType": cardType,
//                                                                 "indFakeDate": 0,
//                                                                 "currency_id": all.banks.core.services.getTypeCurrencyAll(unionbank.currencyFromNumber(row.TransactionCurrency)),
//                                                                 "original_total": row.AmountDouble,
//                                                                 "ind_iskat_hul": 1,
//                                                                 "comment": comment
//                                                             }, objBase));
//                                                         }
//                                                     }
//                                                 }
//                                             }
//
//                                             if (Array.isArray(jsonRespCardActivity.TabForeignTransactionItems) && jsonRespCardActivity.TabForeignTransactionItems.length) {
//                                                 for (const tabForeign of jsonRespCardActivity.TabForeignTransactionItems) {
//                                                     if (Array.isArray(tabForeign.ForeignTransactionItems) && tabForeign.ForeignTransactionItems.length) {
//                                                         const ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(unionbank.currencyFromNumber(tabForeign.Currency));
//                                                         for (const row of tabForeign.ForeignTransactionItems) {
//                                                             let currentPaymentNum = null;
//                                                             let totalPayments = null;
//                                                             let transTotal = transTotalFrom(row);
//                                                             let comment = !!row.DealDescription ? row.DealDescription : null;
//                                                             if (row.TypeOfTransaction === 666) { //trans with payments
//                                                                 const payments = row.DealDescription.split('מ -');
//                                                                 if (payments.length > 1) {
//                                                                     currentPaymentNum = payments[0].replace(/\D/g, ""); //current payment
//                                                                     totalPayments = payments[1].replace(/\D/g, ""); //total payments
//                                                                 }
// //                                                                                                            transTotal = row.DebitCardNextPaymentAmount;
//                                                             } else if (row.TypeOfTransaction === 667) {
//                                                                 comment = 'לידיעה בלבד';
//                                                             }
//                                                             if (jsonRespCardActivity.TabForeignTransactionItems.length === 2 && tabForeign.TableID === 2) {
//                                                                 comment = 'לידיעה בלבד';
//                                                             }
//                                                             all.banks.generalVariables.allDataArrAshrai.push(Object.assign({
//                                                                 "CardNumber": cardNumber,
//                                                                 "NextBillingDate": row.DebitCardDebitPeriodUTC ? all.banks.core.services.convertDateAll(row.DebitCardDebitPeriodUTC) : nextBillingDate,
//                                                                 "NextCycleTotal": nextCycleTotal,
//                                                                 "CardStatus": null,
//                                                                 "TransDesc": row.DebitCardFirmName,
//                                                                 "TransTotal": transTotal,
//                                                                 "ValueDate": all.banks.core.services.convertDateAll(row.DateDealUTC),
//                                                                 "TransCategory": null,
//                                                                 "TotalPayments": totalPayments,
//                                                                 "CurrentPaymentNum": currentPaymentNum,
//                                                                 "CardType": cardType,
//                                                                 "indFakeDate": 0,
//                                                                 "currency_id": all.banks.core.services.getTypeCurrencyAll(unionbank.currencyFromNumber(row.TransactionCurrency)),
//                                                                 "original_total": row.AmountDouble,
//                                                                 "ind_iskat_hul": ind_iskat_hul,
//                                                                 "comment": comment
//                                                             }, objBase));
//                                                         }
//                                                     }
//                                                 }
//                                             }
//
//                                         }
//                                     }
//                                 }
//                                 //all.banks.accountDetails.ccardMonth
//                             }
//                         }


                    } catch (e) {
                        console.log('error', e)
                    }

                }

                function asArrAshraiItem(row) {
                    let currentPaymentNum = null;
                    let totalPayments = null;
                    let transTotal = row.DebitCardNextPaymentAmountSpecified === true
                        ? row.DebitCardNextPaymentAmount
                        : row.NextPaymentAmountDoubleSpecified === true
                            ? row.NextPaymentAmountDouble
                            : row.AmountDoubleSpecified === true
                                ? row.AmountDouble
                                : row.Amount;
                    let comment = !!row.DealDescription ? row.DealDescription : null;
                    if ([666, 777].includes(row.TypeOfTransaction)) { //trans with payments
                        const payments = row.DealDescription.split('מ -');
                        if (payments.length > 1) {
                            currentPaymentNum = payments[0].replace(/\D/g, ""); //current payment
                            totalPayments = payments[1].replace(/\D/g, ""); //total payments
                        }
                    } else if (row.TypeOfTransaction === 667) {
                        comment = 'לידיעה בלבד';
                    }

                    return {
                        "TransDesc": row.DebitCardFirmName ? row.DebitCardFirmName.toString().trim() : row.DebitCardFirmName,
                        "TransTotal": transTotal,
                        "ValueDate": all.banks.core.services.convertDateAll(row.DateDealUTC),
                        "TransCategory": null,
                        "TotalPayments": totalPayments,
                        "CurrentPaymentNum": currentPaymentNum,
                        "indFakeDate": 0,
                        "currency_id": all.banks.core.services.getTypeCurrencyAll(unionbank.currencyFromNumber(row.TransactionCurrency)),
                        "original_total": row.AmountDouble,
                        "comment": comment
                    };
                }

                function transTotalFrom(row) {
                    return row.DebitCardNextPaymentAmountSpecified === true
                        ? row.DebitCardNextPaymentAmount
                        : row.NextPaymentAmountDoubleSpecified === true
                            ? row.NextPaymentAmountDouble
                            : row.AmountDoubleSpecified === true
                                ? row.AmountDouble
                                : row.Amount;
                }
            }
            all.banks.accounts.unionbank.sendCardsCtrl(all.banks.core.services.parseHtml(resp));
        } catch (ex) {
            console.error(ex);
            writeLog(ex);
            if (all.banks.accountDetails.IND_NILVIM > 0) {
                myEmitterLogs(21); //start loan
                all.banks.accounts.unionbank.loadLoan();
            } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                myEmitterLogs(34);
                unionbank.loadMatah();
            } else {
                all.banks.accounts.unionbank.logOut(all.banks.core.services.parseHtml(resp));
            }
        }

        async function waiting(url, dataJson) {
            var dfd = jQuery.Deferred();
            setTimeout(() => {
                dfd.resolve();
            }, 1000)
            return dfd.promise();
        }

        async function senderRests(url, dataJson) {
            var dfd = jQuery.Deferred();
            monitorActivityClass.setIntervalActivity();

            const options = {
                uri: url,
                method: 'POST',
                family: 4,
                timeout: 100000,
                body: JSON.stringify(dataJson),
                headers: {
                    "Host": "hb.unionbank.co.il",
                    "Origin": "https://hb.unionbank.co.il",
                    'Cookie': all.banks.accounts.unionbank.cookies,
                    'Referer': 'https://hb.unionbank.co.il/ebanking/SO/SPA.aspx',
                    'Upgrade-Insecure-Requests': '1',
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36",
                    "Connection": "keep-alive",
                    "Content-Type": "application/json; charset=UTF-8",
                    "Cache-Control": "no-cache"
                }
            }
            senderReq.sendersServer(options, (error, response, body) => {
                dfd.resolve(body);
            })

            return dfd.promise();
        };
    };

    return unionbank;
}();

