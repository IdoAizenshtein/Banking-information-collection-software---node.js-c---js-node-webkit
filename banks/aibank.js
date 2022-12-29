all.banks.accounts.aibank = function () {
    console.log('jenkins test 14.08.2019 15:07#4 ');
    var aibank = {};
    aibank.timeOfLoadIframe = 0;
    aibank.timesOfChangeIp = 0;
    aibank.engWebSite = false;
    aibank.login = function () {
        aibank.indx = 0;
        aibank.ddAccAshrai = 0;
        aibank.ddAshrai = 0;
        aibank.ddTime = 0;
        aibank.logOutNumbers = 25;
        aibank.dateCards = ["01", "02", "03"];
        aibank.timeOutFunc;
        aibank.imageScale = 0.2;
        aibank.DELAY_BETWEEN_RETRIES = 30000;
        aibank.MAX_RETRIES_COUNT = 6;
        aibank.timesOfChangeIp += 1;

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

        //var frame = $('#filecontainerlogin');
        if (parseInt(all.banks.accountDetails.bank.BankNumber) == 10 || parseInt(all.banks.accountDetails.bank.BankNumber) == 34) {
            aibank.site_name = 'Leumi';
            all.banks.accounts.aibank.urlServices = 'hb2.bankleumi.co.il';
            all.banks.accounts.aibank.bankids = 'uniquesig6d21b9fa2d6cb8428728bd3ec699f0501be7f6974660def4404f3ac9a5d373d2';
        }
        // if (parseInt(all.banks.accountDetails.bank.BankNumber) == 34) {
        // 	all.banks.accounts.aibank.urlServices = 'hb.aibank.co.il';
        // 	all.banks.accounts.aibank.bankids = 'uniquesige2a40487e251bc3fec0a0ca1a0bed6765d97e390a1e9e2b2eea82f45cde6663f'
        // }
        if (parseInt(all.banks.accountDetails.bank.BankNumber) == 13) {
            aibank.site_name = 'Igud';
            all.banks.accounts.aibank.urlServices = 'hb.unionbank.co.il';
            all.banks.accounts.aibank.bankids = 'uniquesig3cde3c5ed0bacaaf43bd8cf67c0edb22bbdfd24764715d4e5acec4ac6a25fdf7';
            //frame.attr('src', "https://hb.unionbank.co.il/Igud/pre_default.asp");
        }
        // else {
        // 	frame.attr('src', "https://" + all.banks.accounts.aibank.urlServices + "/H/Login.html");
        // }
        //frame.attr('src', "https://" + all.banks.accounts.aibank.urlServices + "/H/Login.html");
        aibank.timeOfLoadIframe += 1;
        writeLog("---- login ----");
        all.banks.core.services.httpReq("https://" + all.banks.accounts.aibank.urlServices + "/", 'GET', null, false, false)
            .then(function (resPage) {
                var dataRes = all.banks.core.services.parseHtml(resPage);
                var serializeForm = dataRes.find("form").serializeArray();
                var obj = {};
                serializeForm.forEach((vals) => {
                    obj[vals.name] = vals.value;
                });

                obj["uid"] = all.banks.accountDetails.bank.username.slice(0, 7);
                obj["password"] = all.banks.accountDetails.bank.password.slice(0, 12);

                // __VIEWSTATE: j17jiE057grg2ogYZUYfQTW/uk/u4KaewYWUVxVSNwADIw1eP1JWeGbmoye4Ehb1Mn0SsSbOjziuNvVyyilAGjaTHeIvsUYNH+MqU1Zo0dI=
                // 	__VIEWSTATEGENERATOR: 34DEA991
                // __EVENTVALIDATION: Ad7wn1CS4zKsIWaIdK7EMA+N//sNVOOQkVR3+cGvyO1X/t87+vLtX5b22oMx6t+KU5w4CV9P1BgQEiQxWDhf1xEXc1OzdfyVUmja7rcoQ5K7hhnpw8n95+tEuQbORmD4
                // uid: barak20
                // __password: 08c5797428011800616db348b60baaca1078a1bc08d434b316ecbc6a43c5bb3d6ba33bb7e69ee5b91f4ee6ee7f0c19bbe7341ee64fec21420e12d7b6d9433eb9a1b61e0e5711200c5a277e0a6afae4b3a4df3b6d22a22b5116b288a9255998746f89b047c4dd577f
                // origUrl: /H%2fLogin.html
                // trackingCode: 24333
                // sysNum: 23
                // langNum: 1
                // remainingLoginAttempts: 5
                // authType: 1

                //https://hb2.bankleumi.co.il/authenticate

                // var jsons = {
                // 	'system': 'Test',
                // 	'uid': all.banks.accountDetails.bank.username.slice(0, 7),
                // 	'password': all.banks.accountDetails.bank.password.slice(0, 12),
                // 	'command': 'login'
                // };
                //all.banks.core.services.httpReq("https://" + all.banks.accounts.aibank.urlServices + "/InternalSite/Validate.asp", 'POST', jsons, true, false)
                all.banks.core.services.httpReq("https://" + all.banks.accounts.aibank.urlServices + "/authenticate", 'POST', obj, true, false)
                    .then(function (response, statusWord, responseTextAll, responseUrl) {
                        // console.log(response, statusWord, responseTextAll, responseUrl)
                        if (responseUrl && responseUrl.includes('ErrorPage.htm?errCode=')) {
                            myEmitterLogs(9, 'errCode ' + errorCodeFromUrl(responseUrl))
                        }

                        var res = all.banks.core.services.parseHtml(response);
                        if (res.find('.errHeader').length && res.find('.errHeader').text().indexOf('שגוי') !== -1) {
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
                            aibank.logOutNumbers = 7;
                            writeLog("---- err לפוג----" + response);
                            // var jsons = {
                            // 	'challenge': '2'
                            // };
                            all.banks.core.services.httpReq("https://" + all.banks.accounts.aibank.urlServices + "/gotolandingpage", 'GET', null, false, false)
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
                                aibank.engWebSite = true;
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
                if (aibank.timesOfChangeIp < 5) {
                    writeLog("---- Start ChangeIp----");
                    all.banks.core.main.changeIpV4(true).then(function (res) {
                        if (res) {
                            console.log(res);
                            aibank.login();
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
        // var ifarmeSetInterval = setInterval(function () {
        // 	aibank.timeOfLoadIframe += 1;
        // 	var input = frame.contents().find('#uid');
        // 	if (!input.length || (window.frames[0].osdxdty == undefined)) {
        // 		if (aibank.timeOfLoadIframe > 10) {
        // 			frame.attr('src', '');
        // 			writeLog("---- err load Loginpage ----");
        // 			myEmitterLogs(9, "err load Loginpage");
        // 		}
        // 		else {
        // 			frame.attr('src', "https://" + all.banks.accounts.aibank.urlServices + "/H/Login.html");
        // 			// if (parseInt(all.banks.accountDetails.bank.BankNumber) == 13) {
        // 			// 	frame.attr('src', "http://www.unionbank.co.il/14-he/UnionBank.aspx");
        // 			// }
        // 			// else {
        // 			// 	frame.attr('src', "https://" + all.banks.accounts.aibank.urlServices + "/H/Login.html");
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
        // 						if (aibank.timeOfLoadIframe > 10) {
        // 							frame.attr('src', '');
        // 							myEmitterLogs(9, "err load Loginpage");
        // 						}
        // 						else {
        // 							writeLog("---- Login start again ----");
        // 							aibank.login();
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
        // 							all.banks.core.services.httpReq("https://" + all.banks.accounts.aibank.urlServices + "/InternalSite/Validate.asp", 'POST', jsons, true, false)
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
        // 									aibank.logOutNumbers = 7;
        // 									writeLog("---- err לפוג----" + response);
        // 									var jsons = {
        // 										'challenge': '2'
        // 									};
        // 									all.banks.core.services.httpReq("https://" + all.banks.accounts.aibank.urlServices + "/InternalSite/ValidateContinue.asp", 'POST', jsons, true, false)
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
        async function nextStepLogin() {
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
                all.banks.accounts.aibank.datebackslesh = ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateFrom.getFullYear().toString().slice(-2);
                all.banks.accounts.aibank.datebacksleshTo = ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateTo.getFullYear().toString().slice(-2);
                if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                    all.banks.accounts.aibank.datebacksleshMatah = ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateFromMatah.getFullYear().toString();
                    all.banks.accounts.aibank.datebacksleshToMatah = ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + '/' + all.banks.accountDetails.dateToMatah.getFullYear().toString();
                }
                // var leninter = 0;
                // function getCookiesSite() {
                // 	var input = $('#filecontainerlogin').contents().find('#theMainBody');
                // 	if (!input.length) {
                // 		$('#filecontainerlogin').attr('src', "https://" + all.banks.accounts.aibank.urlServices + "/" + all.banks.accounts.aibank.bankids + "/uniquesig0/eBanking/Accounts/ExtendedActivity.aspx");
                // 		var intervals = setInterval(function () {
                // 			leninter += 1;
                // 			var input = $('#filecontainerlogin').contents().find('#theMainBody');
                // 			if (input.length) {
                // 				clearInterval(intervals);
                // 				getCook();
                // 			}
                // 			else {
                // 				if (leninter > 2000) {
                // 					getCookiesSite();
                // 				}
                // 			}
                // 		}, 20);
                // 	}
                // 	else {
                // 		getCook();
                // 	}
                // }
                //getCookiesSite();

                aibank.getCookAll(function () {
                    if (all.banks.accountDetails.days > 0) {
                        aibank.loadOshNew()
                        //     all.banks.accounts.aibank.loadData()
                        // if (!aibank.engWebSite) {
                        // } else {
                        // }
                    } else if (all.banks.accountDetails.ccardMonth > 0) {
                        myEmitterLogs(14);
                        aibank.loadAshraiNew(); // all.banks.accounts.aibank.loadAshrai();
                    } else if (all.banks.accountDetails.IND_NILVIM > 0) {
                        myEmitterLogs(21); //start loan
                        all.banks.accounts.aibank.loadLoan();
                    } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                        myEmitterLogs(34);
                        aibank.loadMatah();
                    } else {
                        var type = 0;
                        var text = "יציאה מהאתר";
                        all.banks.core.services.reloadPage();
                    }
                })
            } else {
                await aibank.synchronizeCookieSets();
                await all.banks.core.services.httpReq(
                    "https://" + all.banks.accounts.aibank.urlServices + "/ebanking/SO/SPA.aspx",
                    'GET', null, false, false);
                if (!aibank.engWebSite) {
                    all.banks.core.services.openBankPage("https://" + all.banks.accounts.aibank.urlServices + "/eBanking/SO/SPA.aspx");
                } else {
                    all.banks.core.services.openBankPage("https://" + all.banks.accounts.aibank.urlServices + "/eBanking/ForeignCurrency/DisplayForeignAccountsActivity.aspx?p=1");
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
    };
    aibank.sendLoanCtrl = function (data) {
        all.banks.core.services.sendLoan(all.banks.generalVariables.allDataArrLoan)
            .then(function (arr) {
                myEmitterLogs(17); //start deposit
                aibank.loadDeposit();
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    aibank.sendLoanCtrl(data)
                }
            })
    };
    aibank.sendDepositCtrl = function (data) {
        all.banks.core.services.sendPikdonot(all.banks.generalVariables.allDataArrDeposit)
            .then(function (arr) {
                myEmitterLogs(19); //start dueChecks
                aibank.synchronizeCookieSets().then(function () {
                    aibank.loadDueChecks(data);
                });
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    aibank.sendDepositCtrl(data)
                }
            })
    };
    aibank.sendDueChecksCtrl = function (data) {
        all.banks.core.services.sendDueChecks(all.banks.generalVariables.allDataArrDueChecks)
            .then(function (arr) {
                myEmitterLogs(23); //start standingOrders
                aibank.loadStandingOrders(data);
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    aibank.sendDueChecksCtrl(data)
                }
            })
    };
    aibank.sendStandingOrdersCtrl = function (data) {
        all.banks.core.services.sendStandingOrders(all.banks.generalVariables.allDataArrStandingOrders)
            .then(function (arr) {
                if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                    myEmitterLogs(34);
                    aibank.loadMatah();
                } else {
                    aibank.logOut(data);
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    aibank.sendStandingOrdersCtrl(data)
                }
            })
    };
    aibank.sendOshCtrl = function (data, matah) {
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
                        all.banks.accounts.aibank.indx = 0;
                        aibank.synchronizeCookieSets().then(function () {
                            aibank.loadAshraiNew();
                        });
//                        aibank.loadAshraiNew(); // all.banks.accounts.aibank.loadAshrai();
                    } else if (all.banks.accountDetails.IND_NILVIM > 0) {
                        myEmitterLogs(21); //start loan
                        all.banks.accounts.aibank.loadLoan()
                    } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                        myEmitterLogs(34);
                        aibank.synchronizeCookieSets().then(function () {
                            aibank.loadMatah();
                        });
                    } else {
                        all.banks.accounts.aibank.logOut(data);
                    }
                } else {
                    all.banks.accounts.aibank.logOut(data);
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.aibank.sendOshCtrl(data, matah)
                }
            })
    };
    aibank.haAvaraPop = function (url, transTotal, valueDate) {
        var dfd = jQuery.Deferred();
        var referer = 'https://' + all.banks.accounts.aibank.urlServices + '/uniquesig0/eBanking/Accounts/ExtendedActivity.aspx?p=1';
        var cookie = all.banks.accounts.aibank.cookies;
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
                    objOne.NamePayerTransfer = mtchrNamePayerTrnsfer != null ? Base64Function.decode(mtchrNamePayerTrnsfer[1]) : null;
                    objOne.DetailsTransfer = mtchrDetailsTransfer != null ? Base64Function.decode(mtchrDetailsTransfer[1]) : null;

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
                    } else {
                        // debugger;
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
                    dfd.resolve(null, aibank.decodeThenUnescape(xmlDataTable.find("body row td").text()));
                } else {
                    var arrs = [], objOne = {};
                    xmlDataTable.find("body row").each(function (i) {
                        if (len > 1) {
                            if ($(this).find('td').length < 3) {
                                if (i + 1 < len) {
                                    var decodeXmlVal = aibank.decodeThenUnescape($(this).find('td').eq(1).text());
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
                                    objOne.DetailsTransfer = aibank.decodeThenUnescape($(this).find('td').eq(0).text());
                                    addIfValid(objOne, arrs);//arrs.push(objOne);
                                    dfd.resolve(arrs);
                                    xmlData = null;
                                    xmlDataTable = null;
                                }
                            } else {
                                var obj = {};
                                if (i + 1 < len) {
                                    var decodeXmlVal = aibank.decodeThenUnescape($(this).find('td').eq(1).text());
                                    obj.DepositeTransferDate = valueDate;
                                    obj.TransferTotal = Base64Function.decode($(this).find('td').eq(2).text()).replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, '');
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
                                        NamePayerTransfer = aibank.decodeThenUnescape($(this).find('td').eq(0).text());
                                        if (NamePayerTransfer == "") {
                                            NamePayerTransfer = null;
                                        }
                                    }
                                    obj.NamePayerTransfer = NamePayerTransfer;
                                    var DetailsTransfer2 = aibank.decodeThenUnescape($(this).find('td').eq(3).text());
                                    obj.DetailsTransfer = DetailsTransfer2;
                                    addIfValid(obj, arrs);//arrs.push(obj);
                                } else {
                                    dfd.resolve(arrs);
                                    xmlData = null;
                                    xmlDataTable = null;
                                }
                            }
                        } else {
                            var td1 = aibank.decodeThenUnescape($(this).find('td').eq(0).text());
                            var td2 = Base64Function.decode($(this).find('td').eq(1).text());
                            var td3 = Base64Function.decode($(this).find('td').eq(2).text());
                            var td4 = aibank.decodeThenUnescape($(this).find('td').eq(3).text());

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
    aibank.getCookAll = function (cb) {
        if (cb) {
            setCookAll(cb);
        } else {
            $.get("https://" + all.banks.accounts.aibank.urlServices + "/ebanking/SessionExtension.aspx")
                .done(function () {
                    setCookAll();
                })
        }

        function setCookAll(cb) {
            var cook = '';
            var win = nw.Window.get();
            win.cookies.getAll({},
                function (cookies) {
                    if (cookies && cookies.length) {
                        var nisSort = 0;
                        for (var i = 0; i < cookies.length; i++) {
                            if (cookies[i].domain == all.banks.accounts.aibank.urlServices) {
                                if (cookies[i].name == "NisDateSort") {
                                    nisSort = 1;
                                    cook += cookies[i].name + "=0;";
                                } else {
                                    cook += cookies[i].name + "=" + cookies[i].value + ";";
                                }
                            }
                            if (cookies.length == i + 1) {
                                if (nisSort == 0) {
                                    cook += "NisDateSort=0;";
                                }
                                all.banks.accounts.aibank.cookies = cook;
                                if (cb) {
                                    cb();
                                    setTimeout(function () {
                                        aibank.getCookAll();
                                    }, 240000);
                                } else {
                                    setTimeout(function () {
                                        aibank.getCookAll();
                                    }, 240000);
                                }
                            }
                        }
                    } else {
                        myEmitterLogs(9, 'cookies unavailable');
                    }
                });
        }
    }
    aibank.sendChecksCtrl = function (formData, cb) {
        all.banks.core.services.sendChecks(formData)
            .then(function (arr) {
                all.banks.generalVariables.numChecksDrawn += 1;
                cb();
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.aibank.sendChecksCtrl(formData, cb)
                } else {
                    cb();
                }
            })
    };
    aibank.sendCardsCtrl = function (data) {
        all.banks.core.services.sendCards(all.banks.generalVariables.allDataArrAshrai)
            .then(function (arr) {
                if (all.banks.accountDetails.IND_NILVIM > 0) {
                    myEmitterLogs(21); //start loan
                    aibank.synchronizeCookieSets().then(function () {
                        all.banks.accounts.aibank.loadLoan();
                    });
                } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                    myEmitterLogs(34);
                    aibank.synchronizeCookieSets().then(function () {
                        aibank.loadMatah();
                    });
                } else {
                    all.banks.accounts.aibank.logOut(data);
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.aibank.sendCardsCtrl(data)
                }
            })
    };
    aibank.getAcc = function (accVal) {
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
    aibank.convertDateLocal = function (dateLocal) {
        const dateMatch = /\D*(\d{1,2})\/(\d{1,2})\/(\d{2,4})\D*/gm.exec(dateLocal);
        if (dateMatch === null) {
            return "";
        }
        let year = +dateMatch[3];
        if (year < 100) {
            year += 2000;
        }
        return [dateMatch[2], dateMatch[1], year].join('/');

//        var dateFormat = "";
//        if (dateLocal !== undefined && dateLocal !== null) {
//            dateLocal = dateLocal.toString();
//            if (dateLocal !== "") {
//                dateFormat = dateLocal.split("/")[1] + "/" + dateLocal.split("/")[0] + "/" + dateLocal.split("/")[2];
//            }
//        }
//        return dateFormat;
    }
    aibank.loadData = async function () {
        try {
            writeLog('Trying to use new site version for osh ....');
            if (await aibank.loadOshNew() === true) {
                writeLog('Trying to use new site version for osh .... DONE');
                return;
            }
            writeLog('Trying to use new site version for osh .... FAILED! Falling back to old site implementation.');
        } catch (e) {
            writeLog('Trying to use new site version for osh .... FAILED!'
                + e.stack + '\nFalling back to old site implementation.\n');
        }

        let retryCount = 0;

        function attempt() {
            all.banks.core.services.httpReq("https://" + all.banks.accounts.aibank.urlServices + "/eBanking/Accounts/ExtendedActivity.aspx", 'GET', null, false, false)
                .then(function (data) {
                    console.log("loadData()");
                    var data = all.banks.core.services.parseHtml(data);
                    try {
                        if (data.find(".errInfo").length && data.find(".errInfo").text().indexOf("לא נמצאו חשבונות") !== -1) {
                            console.log("not exist acc");
                            aibank.logOut(data);
                            data = null;
                        } else {
                            all.banks.accounts.aibank.dd = data.find('#ddlAccounts_m_ddl');

                            if (!all.banks.accounts.aibank.dd.length || !all.banks.accounts.aibank.dd.find('option').length) {
                                aibank.ibc = -1;
                                if ((retryCount++) < aibank.MAX_RETRIES_COUNT) {
                                    writeLog("=== "
                                        + "(" + retryCount + "/" + aibank.MAX_RETRIES_COUNT + ")"
                                        + " No accounts found and no error message located."
                                        + " Next try in " + aibank.DELAY_BETWEEN_RETRIES + "ms. ===");
                                    setTimeout(attempt, aibank.DELAY_BETWEEN_RETRIES);
                                    return;
                                } else {
                                    writeLog("=== No accounts found and no error message located."
                                        + " Giving up on  this one. ===");
                                }

                            } else {
                                console.log("acc exist");
                                myEmitterLogs(11);
                                data.find('#ddlAccounts_m_ddl option').each(function (i, v) {
                                    if ($(v).val() == "-1") {
                                        $(v).remove();
                                    } else {
                                        if (all.banks.accountDetails.deleted_account_ids.length) {
                                            const accVal = $(v).text();
                                            const accountNumber = aibank.getAcc(accVal);
                                            if (accountNumber.length) {
                                                if (all.banks.accountDetails.deleted_account_ids.some(it => accountNumber[0].toString().includes(it.toString()))) {
                                                    $(v).remove()
                                                }
                                            }
                                        }
                                    }
                                });
                                aibank.ibc = all.banks.accounts.aibank.dd.find('option').length - 1;
                            }

                            if (aibank.ibc < 0) {
                                aibank.sendOshCtrl(data);
                                return;
                            }

                            all.banks.core.services.httpReq("https://" + all.banks.accounts.aibank.urlServices + "/eBanking/Accounts/CreditLines.aspx", 'GET', null, false, false)
                                .then(function (responseCr) {
                                    var responseCr = all.banks.core.services.parseHtml(responseCr);
                                    aibank.synchronizeCookieSets().then(function () {
                                        try {
                                            if (aibank.ibc > 0) {
                                                nextAfterLine();
                                            } else {
                                                if (data.find('#lblCreditLineVal').length > 0) {
                                                    all.banks.accounts.aibank.accountCreditAcc = data.find('#lblCreditLineVal').text().replace(/[^0-9\.]/g, "");
                                                } else {
                                                    all.banks.accounts.aibank.accountCreditAcc = null;
                                                }
                                                if (responseCr.find(".errMsgGlobal").length && (responseCr.find(".errMsgGlobal").text().indexOf("לא נמצאו מסגרות") !== -1 || responseCr.find(".errMsgGlobal").text().indexOf("לא הוגדרה מסגרת") !== -1)) {
                                                    all.banks.accounts.aibank.accountCreditAcc = 0;
                                                    nextAfterLine();
                                                } else {
                                                    responseCr.find("td").each(function () {
                                                        var td = $(this).text().indexOf("מסגרת עו\"ש");
                                                        if (td !== -1) {
                                                            all.banks.accounts.aibank.accountCreditAcc = $(this).next().text().replace(/[^0-9\.]/g, "");
                                                        }
                                                    })
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
                                senderReq.senderGetRest("https://" + all.banks.accounts.aibank.urlServices + "/eBanking/Accounts/ExtendedActivity.aspx", all.banks.accounts.aibank.cookies, resGet);
                                console.log("senderGetRest ExtendedActivity loadData()");

                                function resGet(err, data) {
                                    //all.banks.accounts.aibank.cookies = cookAll;
                                    if (err) {
                                        console.log("err senderGetRest ExtendedActivity loadData()");
                                        var logErr = "restUrl: uniquesig0/eBanking/Accounts/ExtendedActivity.aspx, status: " + err;
                                        all.banks.core.services.errorLog(logErr)
                                    } else {
                                        console.log("body senderGetRest ExtendedActivity loadData()");
                                        all.banks.accounts.aibank.loadAllData();
                                        data = null;
                                    }
                                }
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
        }

        attempt();
    };
    aibank.loadAllData = function (VIEWSTATE, EVENTVALIDATION) {
        aibank.synchronizeCookieSets().then(function () {
            console.log("loadAllData()");
            monitorActivityClass.setIntervalActivity();
            senderReq.senderGetRest("https://" + all.banks.accounts.aibank.urlServices + "/eBanking/Accounts/ExtendedActivity.aspx", all.banks.accounts.aibank.cookies, resGetData);
            console.log("senderGetRest Get ExtendedActivity loadAllData()");
        });
        let tryDefaultDates = false;

        function resGetData(err, responseGet) {

            //all.banks.accounts.aibank.cookies = cookAll;
            if (err) {
                console.log("err senderGetRest ExtendedActivity loadAllData()");
                var logErr = "restUrl: uniquesig0/eBanking/Accounts/ExtendedActivity.aspx, status: " + err;
                all.banks.core.services.errorLog(logErr);
            } else {
                console.log("body senderGetRest ExtendedActivity loadAllData()");
                var responseGet = all.banks.core.services.parseHtml(responseGet);
                all.banks.accounts.aibank.dataInputs = responseGet;
                try {
                    var dataJson = {
                        '__EVENTTARGET': '', //'ctlActivityTable$ctl01$ctl00',
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
                        'dtFromDate$textBox': all.banks.accounts.aibank.datebackslesh,
                        'dtToDate$textBox': all.banks.accounts.aibank.datebacksleshTo,
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
                        'hShowCurrentBalanceIncludingToday': 'false',
                        'hidDescriptionTitle': '',
                        'hErrorDescriptionMsg': 'זמנית לא ניתן להציג נתונים בנושא זה',
                        'txtSearchValue': 'חפש',
                        'ddlAccounts$m_ddl': aibank.dd.find('option').eq(aibank.indx).val()
                    }
                } catch (err) {
                    all.banks.core.services.errorLog(err);
                }
                monitorActivityClass.setIntervalActivity();
                var url = "https://" + all.banks.accounts.aibank.urlServices + "/eBanking/Accounts/ExtendedActivity.aspx";
                senderReq.senderRest(url, url, all.banks.accounts.aibank.cookies, dataJson, resReqPostData);
                console.log("senderGetRest POST ExtendedActivity loadAllData()");

                function resReqPostData(err, body) {
                    //all.banks.accounts.aibank.cookies = cookAll;
                    if (err) {
                        console.log("err senderGetRest POST ExtendedActivity loadAllData()");
                        if (!tryDefaultDates && err.code === 'ETIMEDOUT') {
                            tryDefaultDates = true;
                            const dfltDates = [all.banks.accounts.aibank.dataInputs.find('[name="dtFromDate$textBox"]').val(),
                                all.banks.accounts.aibank.dataInputs.find('[name="dtToDate$textBox"]').val()];
                            writeLog('Osh request for period '
                                + all.banks.accounts.aibank.datebackslesh + ' - ' + all.banks.accounts.aibank.datebacksleshTo + ' failed with ' + err.code
                                + '. Retrying with period ' + dfltDates[0] + ' - ' + dfltDates[1]);
                            dataJson['dtFromDate$textBox'] = dfltDates[0];
                            dataJson['dtToDate$textBox'] = dfltDates[1];
                            senderReq.senderRest(url, url, all.banks.accounts.aibank.cookies, dataJson, resReqPostData);
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
                            all.banks.accounts.aibank.dataInputs = data;
                            if (data.find(".errInfo").length && data.find(".errInfo").text().indexOf("לא נמצאו חשבונות") !== -1) {
                                aibank.logOut(data);
                            } else {
                                var accVal = aibank.dd.find('option').eq(all.banks.accounts.aibank.indx).text();
                                aibank.valSelectAcc = aibank.dd.find('option').eq(all.banks.accounts.aibank.indx).val();
                                if (data.find('#lblBalancesVal').length > 0) {
                                    all.banks.accounts.aibank.balanceAcc = data.find('#lblBalancesVal').text().replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, '');
                                } else {
                                    all.banks.accounts.aibank.balanceAcc = null;
                                }
                                if (aibank.ibc == 0) {
                                    loadNextAllPage();
                                } else {
                                    if (data.find('#lblCreditLineVal').length > 0) {
                                        all.banks.accounts.aibank.accountCreditAcc = data.find('#lblCreditLineVal').text().replace(/[^0-9\.]/g, "");
                                    } else {
                                        all.banks.accounts.aibank.accountCreditAcc = null;
                                    }
                                    senderReq.senderGetRest("https://" + all.banks.accounts.aibank.urlServices + "/ebanking/Accounts/CreditLines.aspx", all.banks.accounts.aibank.cookies, resGetDataCreditLines);
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
                                                "ddlAccountsNative": aibank.dd.find('option').eq(aibank.indx).val(),
                                                "hidSaveAsChoice": "",
                                                "txtSearchValue": "חפש"
                                            }
                                            var urlsAcc = "https://" + all.banks.accounts.aibank.urlServices + "/ebanking/Accounts/CreditLines.aspx";
                                            senderReq.senderRest(urlsAcc, urlsAcc, all.banks.accounts.aibank.cookies, dataJsonAcc, resReqPostDataAcc);
                                            console.log("senderGetRest POST ExtendedActivity loadAllData()");

                                            function resReqPostDataAcc(err, responseCr) {
                                                if (err) {
                                                    loadNextAllPage();
                                                } else {
                                                    try {
                                                        var responseCr = all.banks.core.services.parseHtml(responseCr);
                                                        if (responseCr.find(".errMsgGlobal").length && (responseCr.find(".errMsgGlobal").text().indexOf("לא נמצאו מסגרות") !== -1 || responseCr.find(".errMsgGlobal").text().indexOf("לא הוגדרה מסגרת") !== -1)) {
                                                            all.banks.accounts.aibank.accountCreditAcc = 0;
                                                            loadNextAllPage();
                                                        } else {
                                                            var lenTd = responseCr.find("tr.item td");
                                                            if (lenTd.length) {
                                                                lenTd.each(function (ind, val) {
                                                                    var td = $(this).text().indexOf("מסגרת עו\"ש");
                                                                    if (td !== -1) {
                                                                        all.banks.accounts.aibank.accountCreditAcc = $(this).next().text().replace(/[^0-9\.]/g, "");
                                                                    }
                                                                    if (lenTd.length == ind + 1) {
                                                                        loadNextAllPage();
                                                                    }
                                                                });
                                                            } else {
                                                                if (all.banks.accounts.aibank.accountCreditAcc == null) {
                                                                    all.banks.accounts.aibank.accountCreditAcc = 0;
                                                                }
                                                                loadNextAllPage();
                                                            }
                                                        }
                                                    } catch (e) {
                                                        if (all.banks.accounts.aibank.accountCreditAcc == null) {
                                                            all.banks.accounts.aibank.accountCreditAcc = 0;
                                                        }
                                                        loadNextAllPage();
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                                function loadNextAllPage() {
                                    var accBranchNumber = aibank.getAcc(accVal);
                                    var acc = {
                                        'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                        'AccountNumber': accBranchNumber[0],
                                        'BranchNumber': accBranchNumber[1],
                                        'Balance': all.banks.accounts.aibank.balanceAcc,
                                        'AccountCredit': parseFloat(all.banks.accounts.aibank.accountCreditAcc)
                                    };
                                    all.banks.generalVariables.allDataArr.BankData[0].Account.push(acc);
                                    myEmitterLogs(10, acc.AccountNumber);

                                    if (all.banks.accounts.aibank.indx > 0) {
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
                                                    date = aibank.convertDateLocal(date);
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
                                                        var decodeXmlVal = aibank.decodeThenUnescape($(xmlParseBusinessModel).find('brules_' + idXml).text());
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
                                                        var valTextDesc = aibank.decodeThenUnescape($(xmlParseBusinessModel).find('brules_' + idXml).text());
                                                        if (valTextDesc.indexOf("החזרה") == -1 && valTextDesc.indexOf("נייר") == -1 && valTextDesc.indexOf("שער המרה") == -1 && decodeXmlVal.replace(/\D/g, "") !== "") {
                                                            let bankBranchAccMatch;
                                                            if (urlToPopup) {
                                                                transDesc += " " + decodeXmlVal;
                                                                objectRow.DepositeTransferData = "https://" + all.banks.accounts.aibank.urlServices + urlToPopup;
                                                            } else if ((bankBranchAccMatch = /:(\D+)(\d{1,3})-(\d{1,3})-(\d{4,})(\D*)/g.exec(valTextDesc)) !== null) {
                                                                objectRow.DepositeTransferData = [
                                                                    {
                                                                        "DepositeTransferDate": all.banks.core.services.convertDateAll(date),
                                                                        "BankTransferNumber": bankBranchAccMatch[2],
                                                                        "BranchTransferNumber": bankBranchAccMatch[3],
                                                                        "AccountTransferNumber": bankBranchAccMatch[4],
                                                                        "NamePayerTransfer": bankBranchAccMatch[1],
                                                                        "DetailsTransfer": bankBranchAccMatch[5],
                                                                        "TransferTotal": sum
                                                                    }];
                                                            } else {
                                                                transDesc += " " + valTextDesc;
                                                            }
                                                        } else {
                                                            transDesc += " " + decodeXmlVal;
                                                            if (urlToPopup) {
                                                                objectRow.DepositeTransferData = "https://" + all.banks.accounts.aibank.urlServices + urlToPopup;
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
                                                                var urls = "https://" + all.banks.accounts.aibank.urlServices + '/ebanking/partial/Infrastructure/Leumi.Infrastructure.HttpReqHandler.UI/HttpReqHandler.ashx?init=ajaxbm&eventReqArg=PopUpAdditionalDescriptionData&referenceNumber=' + objArr[1] + '&accIndex=' + objArr[2] + '&segmentationFlag=' + objArr[4] + '&etCurrentType=' + objArr[5] + '&transactionCounter=' + objArr[6] + '&actionType=' + objArr[7] + '&popupID=' + objArr[0] + '&effectiveDate=' + objArr[8] + '&&_=' + new Date().getTime();
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
                                                        date = aibank.convertDateLocal(date);

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
                                                            var decodeXmlVal = aibank.decodeThenUnescape($(xmlParseBusinessModel).find('brules_' + idXml).text());
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
                                                            var valTextDesc = aibank.decodeThenUnescape($(xmlParseBusinessModel).find('brules_' + idXml).text());
                                                            if (valTextDesc.indexOf("החזרה") == -1 && valTextDesc.indexOf("נייר") == -1 && valTextDesc.indexOf("שער המרה") == -1 && decodeXmlVal.replace(/\D/g, "") !== "") {
//                                                                var returnNumAll = function (arrAll, num) {
//                                                                    function returnNum(arrNumbers, splits) {
//                                                                        var id;
//                                                                        if (splits) {
//                                                                            var arrs = arrNumbers.split('');
//                                                                        } else {
//                                                                            var arrs = arrNumbers;
//                                                                        }
//                                                                        $(arrs).each(function (i, v) {
//                                                                            var val = parseFloat(v);
//                                                                            if (isNaN(val)) {
//                                                                                id = i;
//                                                                                return false;
//                                                                            }
//                                                                        });
//                                                                        return id;
//                                                                    }
//
//                                                                    var text = arrAll.substring(0, num);
//                                                                    var arrRevers = returnNum(text.split('').reverse(), false);
//                                                                    var sumFinish = text.substring(text.length - arrRevers, text.length);
//                                                                    return sumFinish;
//                                                                }
//                                                                var returnNumAllEnd = function (arrAll, num) {
//                                                                    function returnNum(arrNumbers, splits) {
//                                                                        var id;
//                                                                        var arrs = arrNumbers;
//                                                                        $(arrs).each(function (i, v) {
//                                                                            var val = parseFloat(v);
//                                                                            if (isNaN(val)) {
//                                                                                id = i;
//                                                                                return false;
//                                                                            }
//                                                                        });
//                                                                        return id;
//                                                                    }
//
//                                                                    var text = arrAll.substring(num + 1, arrAll.length);
//                                                                    var arrRevers = returnNum(text.split(''), false);
//                                                                    var sumFinish = text.substring(0, arrRevers);
//                                                                    return sumFinish;
//                                                                }
//
//                                                                var textSplitMain;
//                                                                var arrayWords = decodeXmlVal.split(" ");
//                                                                arrayWords.forEach(function (v) {
//                                                                    if (v.split("-").length == 3 && v.split("-")[0].replace(/\D/g, "") !== "" && v.split("-")[1].replace(/\D/g, "") !== "" && v.split("-")[2].replace(/\D/g, "") !== "") {
//                                                                        textSplitMain = v.split("-");
//                                                                    }
//                                                                });
//
//                                                                if (textSplitMain !== undefined) {
//                                                                    var BranchTransferNumber = textSplitMain[1];
//                                                                    var indexMainBranch = decodeXmlVal.indexOf("-" + BranchTransferNumber + "-");
//                                                                    var BankTransferNumber = returnNumAll(decodeXmlVal, indexMainBranch);
//                                                                    var AccountTransferNumber = returnNumAllEnd(decodeXmlVal, (indexMainBranch + BranchTransferNumber.length + 1));
//
//                                                                    var NamePayerTransfer = decodeXmlVal.substring(0, indexMainBranch - BankTransferNumber.length);
//                                                                    var DetailsTransfer = decodeXmlVal.substring((indexMainBranch + 2 + AccountTransferNumber.length + BranchTransferNumber.length), decodeXmlVal.length).trim();
//
//                                                                    if (DetailsTransfer.replace(/\s/g, "") == '') {
//                                                                        DetailsTransfer = null;
//                                                                    }
//
//                                                                    var BankTransferNumberVal, BranchTransferNumberVal,
//                                                                            AccountTransferNumberVal;
//                                                                    if (BankTransferNumber.length == 3) {
//                                                                        BranchTransferNumberVal = BankTransferNumber;
//                                                                        if (BranchTransferNumber.length == 2) {
//                                                                            BankTransferNumberVal = BranchTransferNumber;
//                                                                            AccountTransferNumberVal = AccountTransferNumber;
//                                                                        } else {
//                                                                            BankTransferNumberVal = AccountTransferNumber;
//                                                                            AccountTransferNumberVal = BranchTransferNumber;
//                                                                        }
//                                                                    } else if (BranchTransferNumber.length == 3) {
//                                                                        BranchTransferNumberVal = BranchTransferNumber;
//                                                                        if (BankTransferNumber.length == 2) {
//                                                                            BankTransferNumberVal = BankTransferNumber;
//                                                                            AccountTransferNumberVal = AccountTransferNumber;
//                                                                        } else {
//                                                                            BankTransferNumberVal = AccountTransferNumber;
//                                                                            AccountTransferNumberVal = BankTransferNumber;
//                                                                        }
//                                                                    } else if (AccountTransferNumber.length == 3) {
//                                                                        BranchTransferNumberVal = AccountTransferNumber;
//                                                                        if (BankTransferNumber.length == 2) {
//                                                                            BankTransferNumberVal = BankTransferNumber;
//                                                                            AccountTransferNumberVal = AccountTransferNumber;
//                                                                        } else {
//                                                                            BankTransferNumberVal = AccountTransferNumber;
//                                                                            AccountTransferNumberVal = BankTransferNumber;
//                                                                        }
//                                                                    }
//
//                                                                    objectRow.DepositeTransferData = [
//                                                                        {
//                                                                            "DepositeTransferDate": all.banks.core.services.convertDateAll(date),
//                                                                            "BankTransferNumber": BankTransferNumberVal,
//                                                                            "BranchTransferNumber": BranchTransferNumberVal,
//                                                                            "AccountTransferNumber": AccountTransferNumberVal,
//                                                                            "NamePayerTransfer": NamePayerTransfer,
//                                                                            "DetailsTransfer": DetailsTransfer,
//                                                                            "TransferTotal": sum
//                                                                        }
//                                                                    ]
//                                                                }
                                                                let bankBranchAccMatch;
                                                                if (urlToPopup) {
                                                                    transDesc += " " + decodeXmlVal;
                                                                    objectRow.DepositeTransferData = "https://" + all.banks.accounts.aibank.urlServices + urlToPopup;
                                                                } else if ((bankBranchAccMatch = /:(\D+)(\d{1,3})-(\d{1,3})-(\d{4,})(\D*)/g.exec(valTextDesc)) !== null) {
                                                                    objectRow.DepositeTransferData = [
                                                                        {
                                                                            "DepositeTransferDate": all.banks.core.services.convertDateAll(date),
                                                                            "BankTransferNumber": bankBranchAccMatch[2],
                                                                            "BranchTransferNumber": bankBranchAccMatch[3],
                                                                            "AccountTransferNumber": bankBranchAccMatch[4],
                                                                            "NamePayerTransfer": bankBranchAccMatch[1],
                                                                            "DetailsTransfer": bankBranchAccMatch[5],
                                                                            "TransferTotal": sum
                                                                        }];
                                                                } else {
                                                                    transDesc += " " + valTextDesc;
                                                                }
                                                            } else {
                                                                transDesc += " " + decodeXmlVal;
                                                                if (urlToPopup) {
                                                                    objectRow.DepositeTransferData = "https://" + all.banks.accounts.aibank.urlServices + urlToPopup;
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
                                                                    var urls = "https://" + all.banks.accounts.aibank.urlServices + '/ebanking/partial/Infrastructure/Leumi.Infrastructure.HttpReqHandler.UI/HttpReqHandler.ashx?init=ajaxbm&eventReqArg=PopUpAdditionalDescriptionData&referenceNumber=' + objArr[1] + '&accIndex=' + objArr[2] + '&segmentationFlag=' + objArr[4] + '&etCurrentType=' + objArr[5] + '&transactionCounter=' + objArr[6] + '&actionType=' + objArr[7] + '&popupID=' + objArr[0] + '&effectiveDate=' + objArr[8] + '&&_=' + new Date().getTime();
                                                                    objectRow.DepositeTransferData = urls;
                                                                }
                                                            }
                                                            objectRow.Asmachta = asmachta;
                                                            objectRow.TransDesc = (transDesc === '') ? null : transDesc.trim().replace(/&quot;/g, '"');
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
                                                                    date = aibank.convertDateLocal(date);

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
                                                                        var decodeXmlVal = aibank.decodeThenUnescape($(xmlParseBusinessModel).find('brules_' + idXml).text());
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
                                                                        var valTextDesc = aibank.decodeThenUnescape($(xmlParseBusinessModel).find('brules_' + idXml).text());
                                                                        if (valTextDesc.indexOf("החזרה") == -1 && valTextDesc.indexOf("נייר") == -1 && valTextDesc.indexOf("שער המרה") == -1 && decodeXmlVal.replace(/\D/g, "") !== "") {
//                                                                            var returnNumAll = function (arrAll, num) {
//                                                                                function returnNum(arrNumbers, splits) {
//                                                                                    var id;
//                                                                                    if (splits) {
//                                                                                        var arrs = arrNumbers.split('');
//                                                                                    } else {
//                                                                                        var arrs = arrNumbers;
//                                                                                    }
//                                                                                    $(arrs).each(function (i, v) {
//                                                                                        var val = parseFloat(v);
//                                                                                        if (isNaN(val)) {
//                                                                                            id = i;
//                                                                                            return false;
//                                                                                        }
//                                                                                    });
//                                                                                    return id;
//                                                                                }
//
//                                                                                var text = arrAll.substring(0, num);
//                                                                                var arrRevers = returnNum(text.split('').reverse(), false);
//                                                                                var sumFinish = text.substring(text.length - arrRevers, text.length);
//                                                                                return sumFinish;
//                                                                            }
//                                                                            var returnNumAllEnd = function (arrAll, num) {
//                                                                                function returnNum(arrNumbers, splits) {
//                                                                                    var id;
//                                                                                    var arrs = arrNumbers;
//                                                                                    $(arrs).each(function (i, v) {
//                                                                                        var val = parseFloat(v);
//                                                                                        if (isNaN(val)) {
//                                                                                            id = i;
//                                                                                            return false;
//                                                                                        }
//                                                                                    });
//                                                                                    return id;
//                                                                                }
//
//                                                                                var text = arrAll.substring(num + 1, arrAll.length);
//                                                                                var arrRevers = returnNum(text.split(''), false);
//                                                                                var sumFinish = text.substring(0, arrRevers);
//                                                                                return sumFinish;
//                                                                            }
//
//                                                                            var textSplitMain;
//                                                                            var arrayWords = decodeXmlVal.split(" ");
//                                                                            arrayWords.forEach(function (v) {
//                                                                                if (v.split("-").length == 3 && v.split("-")[0].replace(/\D/g, "") !== "" && v.split("-")[1].replace(/\D/g, "") !== "" && v.split("-")[2].replace(/\D/g, "") !== "") {
//                                                                                    textSplitMain = v.split("-");
//                                                                                }
//                                                                            });
//
//                                                                            if (textSplitMain !== undefined) {
//                                                                                var BranchTransferNumber = textSplitMain[1];
//                                                                                var indexMainBranch = decodeXmlVal.indexOf("-" + BranchTransferNumber + "-");
//                                                                                var BankTransferNumber = returnNumAll(decodeXmlVal, indexMainBranch);
//                                                                                var AccountTransferNumber = returnNumAllEnd(decodeXmlVal, (indexMainBranch + BranchTransferNumber.length + 1));
//
//                                                                                var NamePayerTransfer = decodeXmlVal.substring(0, indexMainBranch - BankTransferNumber.length);
//                                                                                var DetailsTransfer = decodeXmlVal.substring((indexMainBranch + 2 + AccountTransferNumber.length + BranchTransferNumber.length), decodeXmlVal.length).trim();
//
//                                                                                if (DetailsTransfer.replace(/\s/g, "") == '') {
//                                                                                    DetailsTransfer = null;
//                                                                                }
//
//                                                                                var BankTransferNumberVal,
//                                                                                        BranchTransferNumberVal,
//                                                                                        AccountTransferNumberVal;
//                                                                                if (BankTransferNumber.length == 3) {
//                                                                                    BranchTransferNumberVal = BankTransferNumber;
//                                                                                    if (BranchTransferNumber.length == 2) {
//                                                                                        BankTransferNumberVal = BranchTransferNumber;
//                                                                                        AccountTransferNumberVal = AccountTransferNumber;
//                                                                                    } else {
//                                                                                        BankTransferNumberVal = AccountTransferNumber;
//                                                                                        AccountTransferNumberVal = BranchTransferNumber;
//                                                                                    }
//                                                                                } else if (BranchTransferNumber.length == 3) {
//                                                                                    BranchTransferNumberVal = BranchTransferNumber;
//                                                                                    if (BankTransferNumber.length == 2) {
//                                                                                        BankTransferNumberVal = BankTransferNumber;
//                                                                                        AccountTransferNumberVal = AccountTransferNumber;
//                                                                                    } else {
//                                                                                        BankTransferNumberVal = AccountTransferNumber;
//                                                                                        AccountTransferNumberVal = BankTransferNumber;
//                                                                                    }
//                                                                                } else if (AccountTransferNumber.length == 3) {
//                                                                                    BranchTransferNumberVal = AccountTransferNumber;
//                                                                                    if (BankTransferNumber.length == 2) {
//                                                                                        BankTransferNumberVal = BankTransferNumber;
//                                                                                        AccountTransferNumberVal = AccountTransferNumber;
//                                                                                    } else {
//                                                                                        BankTransferNumberVal = AccountTransferNumber;
//                                                                                        AccountTransferNumberVal = BankTransferNumber;
//                                                                                    }
//                                                                                }
//
//                                                                                objectRow.DepositeTransferData = [
//                                                                                    {
//                                                                                        "DepositeTransferDate": all.banks.core.services.convertDateAll(date),
//                                                                                        "BankTransferNumber": BankTransferNumberVal,
//                                                                                        "BranchTransferNumber": BranchTransferNumberVal,
//                                                                                        "AccountTransferNumber": AccountTransferNumberVal,
//                                                                                        "NamePayerTransfer": NamePayerTransfer,
//                                                                                        "DetailsTransfer": DetailsTransfer,
//                                                                                        "TransferTotal": sum
//                                                                                    }
//                                                                                ]
//                                                                            }
                                                                            let bankBranchAccMatch;
                                                                            if (urlToPopup) {
                                                                                transDesc += " " + decodeXmlVal;
                                                                                objectRow.DepositeTransferData = "https://" + all.banks.accounts.aibank.urlServices + urlToPopup;
                                                                            } else if ((bankBranchAccMatch = /:(\D+)(\d{1,3})-(\d{1,3})-(\d{4,})(\D*)/g.exec(valTextDesc)) !== null) {
                                                                                objectRow.DepositeTransferData = [
                                                                                    {
                                                                                        "DepositeTransferDate": all.banks.core.services.convertDateAll(date),
                                                                                        "BankTransferNumber": bankBranchAccMatch[2],
                                                                                        "BranchTransferNumber": bankBranchAccMatch[3],
                                                                                        "AccountTransferNumber": bankBranchAccMatch[4],
                                                                                        "NamePayerTransfer": bankBranchAccMatch[1],
                                                                                        "DetailsTransfer": bankBranchAccMatch[5],
                                                                                        "TransferTotal": sum
                                                                                    }];
                                                                            } else {
                                                                                transDesc += " " + valTextDesc;
                                                                                if (urlToPopup) {
                                                                                    objectRow.DepositeTransferData = "https://" + all.banks.accounts.aibank.urlServices + urlToPopup;
                                                                                }
                                                                            }
                                                                        } else {
                                                                            transDesc += " " + decodeXmlVal;
                                                                            if (urlToPopup) {
                                                                                objectRow.DepositeTransferData = "https://" + all.banks.accounts.aibank.urlServices + urlToPopup;
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
                                                                                var urls = "https://" + all.banks.accounts.aibank.urlServices + '/ebanking/partial/Infrastructure/Leumi.Infrastructure.HttpReqHandler.UI/HttpReqHandler.ashx?init=ajaxbm&eventReqArg=PopUpAdditionalDescriptionData&referenceNumber=' + objArr[1] + '&accIndex=' + objArr[2] + '&segmentationFlag=' + objArr[4] + '&etCurrentType=' + objArr[5] + '&transactionCounter=' + objArr[6] + '&actionType=' + objArr[7] + '&popupID=' + objArr[0] + '&effectiveDate=' + objArr[8] + '&&_=' + new Date().getTime();
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
                                        clearTimeout(aibank.timeOutFunc);
                                        var ret = false;
                                        $(all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].DataRow).each(function (i, v) {
                                            if (v.imgs !== null && (Object.prototype.toString.call(v.imgs.list) == '[object Undefined]') && (v.imgs.indexOf('CheckImageViewer.aspx') !== -1)) {
                                                $.when(aibank.checkAll(v.imgs)).then(function (status, textErr) {
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
                                                        var checkBankNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].BankNumber;
                                                        var checkAccountNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].AccountNumber;
                                                        var checkBranchNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].BranchNumber;
                                                        var checkNumber = v.Asmachta;
                                                        var dateLast = depositeDate.split("/")[2] + depositeDate.split("/")[0] + depositeDate.split("/")[1];
                                                        var uuid = checkBankNumber + '' + checkBranchNumber + '' + checkAccountNumber + '' + parseInt(checkNumber) + '' + parseInt(dateLast) + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].AccountNumber;
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
                                                        all.banks.accounts.aibank.sendChecksCtrl({
                                                            formData: formData,
                                                            params: {
                                                                imagenamekey: v.imgs[0].ImageNameKey,
                                                                bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].BankNumber,
                                                                snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].BranchNumber,
                                                                accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].AccountNumber
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
                                                $.when(all.banks.accounts.aibank.checksList(v.imgs.list)).then(function (status, urlImg) {
                                                    if (status == true) {
                                                        $.when(aibank.checkAll(urlImg))
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
                                                                    aibank.timeOutFunc = setTimeout(function () {
                                                                        clearTimeout(aibank.timeOutFunc);
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
                                                                    var checkBankNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].BankNumber;
                                                                    var checkAccountNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].AccountNumber;
                                                                    var checkBranchNumber = all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].BranchNumber;
                                                                    var checkNumber = v.Asmachta;
                                                                    var dateLast = depositeDate.split("/")[2] + depositeDate.split("/")[0] + depositeDate.split("/")[1];
                                                                    var uuid = checkBankNumber + '' + checkBranchNumber + '' + checkAccountNumber + '' + parseInt(checkNumber) + '' + parseInt(dateLast) + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].AccountNumber;
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
                                                                    all.banks.accounts.aibank.sendChecksCtrl({
                                                                        formData: formData,
                                                                        params: {
                                                                            imagenamekey: v.imgs[0].ImageNameKey,
                                                                            bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].BankNumber,
                                                                            snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].BranchNumber,
                                                                            accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].AccountNumber
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
                                                        aibank.timeOutFunc = setTimeout(function () {
                                                            clearTimeout(aibank.timeOutFunc);
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
                                                $.when(all.banks.accounts.aibank.haAvaraPop(v.DepositeTransferData, v.TransTotal, v.ValueDate)).then(function (status, text) {
                                                    v.DepositeTransferData = status;
                                                    if (text !== undefined) {
                                                        v.TransDesc = v.TransDesc + " " + text;
                                                    }
                                                    aibank.timeOutFunc = setTimeout(function () {
                                                        clearTimeout(aibank.timeOutFunc);
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
                                                if (all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].DataRow.length == (i + 1)) {
                                                    if (all.banks.accounts.aibank.indx < aibank.ibc) {
                                                        all.banks.accounts.aibank.indx = all.banks.accounts.aibank.indx + 1;
                                                        all.banks.accounts.aibank.loadAllData();
                                                        data = null;
                                                    } else {
                                                        all.banks.accounts.aibank.sendOshCtrl(data);
                                                        data = null;
                                                    }
                                                }
                                            }
                                        })
                                    }

                                    function loadAllNext() {
                                        if (!arr.length) {
                                            all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].DataRow = [];
                                            if (all.banks.accounts.aibank.indx < aibank.ibc) {
                                                myEmitterLogs(12, 0);
                                                all.banks.accounts.aibank.indx = all.banks.accounts.aibank.indx + 1;
                                                all.banks.accounts.aibank.loadAllData();
                                                data = null;
                                            } else {
                                                all.banks.accounts.aibank.sendOshCtrl(data);
                                                data = null;
                                            }
                                        } else {
                                            all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].DataRow = arr;
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
                                // 	all.banks.accounts.aibank.accountCreditAcc = data.find('#lblCreditLineVal').text().replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, '');
                                // }
                                // else {
                                // 	all.banks.accounts.aibank.accountCreditAcc = null;
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
    aibank.loadAfterListChecks = function (VIEWSTATE, EVENTVALIDATION) {
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
            'dtFromDate$textBox': all.banks.accounts.aibank.datebackslesh,
            'dtToDate$textBox': all.banks.accounts.aibank.datebacksleshTo,
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
            'ddlAccounts$m_ddl': all.banks.accounts.aibank.indx + 1
        }
        all.banks.core.services.httpReq("https://" + all.banks.accounts.aibank.urlServices + "/eBanking/Accounts/ExtendedActivity.aspx", 'POST', dataJson, true, false)
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
    aibank.checksList = function (listImg) {
        var dfd = jQuery.Deferred();
        var jsons = {
            '__EVENTTARGET': 'lnkCheckImage',
            '__EVENTARGUMENT': listImg,
            'ddlAccounts$m_ddl': aibank.dd.find('option').eq(aibank.indx).val(),
            'DES_Group': '',
            '__VIEWSTATE': aibank.dataInputs.find('#__VIEWSTATE').val(),
            '__EVENTVALIDATION': aibank.dataInputs.find('#__EVENTVALIDATION').val(),
            'hidtabindexCount': '',
            'hidExitValue': '0',
            'hideGoogleSerachAlert': 'הוזן תו לא חוקי',
            'AjaxSaveAS': '',
            'ddlTransactionType': '001',
            'ddlTransactionPeriod': '004',
            'dtFromDate$textBox': aibank.datebackslesh,
            'dtToDate$textBox': aibank.datebacksleshTo,
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
            'txtSearchValue': 'חפש'
        };
        monitorActivityClass.setIntervalActivity();
        var url = "https://" + all.banks.accounts.aibank.urlServices + "/eBanking/Accounts/ExtendedActivity.aspx";
        aibank.synchronizeCookieSets().then(function () {
            senderReq.senderRest(url, url, all.banks.accounts.aibank.cookies, jsons, resReqPostData);
        });

        function resReqPostData(err, body, cookAll) {
            if (err) {
                var logErr = "restUrl: " + url + ", status: " + err;
                all.banks.core.services.errorLog(logErr);
                return;
            }
            jsons = null;
            var url = "https://" + all.banks.accounts.aibank.urlServices + "/eBanking/Accounts/DisplayCheckImages.aspx?index=" + aibank.valSelectAcc + '&cId=' + listImg + '&seg=0&res=0';
            senderReq.senderGetRest(url, all.banks.accounts.aibank.cookies, resGetData);

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
                        clearTimeout(aibank.timeOutFunc);
                        if (data.find('#ctlChecksDepositsTable').find('a[href*=openPopupWindowCustomParams]').length) {
                            data.find('#ctlChecksDepositsTable').find('a[href*=openPopupWindowCustomParams]').each(function (i, v) {
                                if (i == indexCheckRe) {
                                    $.when(aibank.checkAll($(v).attr('href').split("'")[1]))
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
                                                var uuid = parseInt(checkBankNumber) + '' + parseInt(checkBranchNumber) + '' + parseInt(checkAccountNumber) + '' + parseInt(checkNumber) + '' + parseInt(depositeDate) + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].AccountNumber;
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
                                                all.banks.accounts.aibank.sendChecksCtrl({
                                                    formData: formData,
                                                    params: {
                                                        imagenamekey: arrListCheck[arrListCheck.length - 1].ImageNameKey,
                                                        bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].BankNumber,
                                                        snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].BranchNumber,
                                                        accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.aibank.indx].AccountNumber
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

                                                    var utlChecksList = 'https://' + all.banks.accounts.aibank.urlServices + '/eBanking/Accounts/DisplayCheckImages.aspx?index=' + aibank.valSelectAcc + '&cId=' + listImg + '&seg=0&res=0';
                                                    senderReq.senderRest(utlChecksList, utlChecksList, all.banks.accounts.aibank.cookies, dataJson, resReqPostDataCheck);

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
                                                        '__VIEWSTATE': aibank.dataInputs.find('#__VIEWSTATE').val(),
                                                        'DES_JSE': 1,
                                                        '__EVENTVALIDATION': aibank.dataInputs.find('#__EVENTVALIDATION').val(),
                                                        'hidtabindexCount': '121',
                                                        'hidExitValue': '0',
                                                        'hideGoogleSerachAlert': 'הוזן תו לא חוקי',
                                                        'AjaxSaveAS': '',
                                                        'ddlTransactionType': '001',
                                                        'ddlTransactionPeriod': '004',
                                                        'dtFromDate$textBox': aibank.datebackslesh,
                                                        'dtToDate$textBox': aibank.datebacksleshTo,
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
                                                        'ddlAccounts$m_ddl': aibank.dd.find('option').eq(aibank.indx).val()
                                                    }
                                                    var utlChecksList = "https://" + all.banks.accounts.aibank.urlServices + "/eBanking/Accounts/ExtendedActivity.aspx";
                                                    senderReq.senderRest(utlChecksList, utlChecksList, all.banks.accounts.aibank.cookies, dataJson, resReqPostDataCheck);

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
                                                aibank.timeOutFunc = setTimeout(function () {
                                                    try {
                                                        clearTimeout(aibank.timeOutFunc);
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
    aibank.checkAll = function (linkCheck) {
        var dfd = jQuery.Deferred();
        monitorActivityClass.setIntervalActivity();
        var linkFinish = 'https://' + all.banks.accounts.aibank.urlServices
            + (!linkCheck.startsWith('/') ? '/' : '')
            + linkCheck;
        aibank.synchronizeCookieSets().then(function () {
            senderReq.senderGetRest(linkFinish, all.banks.accounts.aibank.cookies, resGetData);
        });

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

                return canvas.toDataURL("image/jpeg", aibank.imageScale)
                    .replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
            }

            var data = all.banks.core.services.parseHtml(responseGet);
            const imgCheckImageFrontSrc = data.find('#imgCheckImageFront').length && data.find('#imgCheckImageFront').attr('src').length
                ? (data.find('#imgCheckImageFront').attr('src').includes('..')
                    ? data.find('#imgCheckImageFront').attr('src').split('..')[1]
                    : '/Accounts/' + data.find('#imgCheckImageFront').attr('src'))
                : null;
            if (!!imgCheckImageFrontSrc) {
                const imgCheckImageBackSrc = data.find('#imgCheckImageBack').length && data.find('#imgCheckImageBack').attr('src').length
                    ? (data.find('#imgCheckImageBack').attr('src').includes('..')
                        ? data.find('#imgCheckImageBack').attr('src').split('..')[1]
                        : '/Accounts/' + data.find('#imgCheckImageBack').attr('src'))
                    : null;
//				const chequeBackPic = data.find('#imgCheckImageBack[src]');
                if (!!imgCheckImageBackSrc) {
                    jQuery.when(
                        loadImage('https://' + all.banks.accounts.aibank.urlServices
                            + '/eBanking'
                            + imgCheckImageFrontSrc),
                        loadImage('https://' + all.banks.accounts.aibank.urlServices
                            + '/eBanking'
                            + imgCheckImageBackSrc)
                    ).done(function (imgF, imgB) {
                        dfd.resolve(merge(imgF, imgB));
                    });
                } else {
                    jQuery.when(loadImage('https://' + all.banks.accounts.aibank.urlServices
                        + '/eBanking'
                        + imgCheckImageFrontSrc)
                    ).done(function (imgF) {
                        dfd.resolve(merge(imgF, null));
                    });
                }

//                var image = 'https://' + all.banks.accounts.aibank.urlServices + '/' + all.banks.accounts.aibank.bankids + '/uniquesig0/eBanking' + $(data).find('#imgCheckImageFront').attr('src').split('..')[1];
//                var img = new Image();
//                img.src = image;
//                img.onload = function () {
//                    var canvas = document.createElement("canvas");
//                    canvas.width = this.width;
//                    canvas.height = this.height;
//                    var ctx = canvas.getContext("2d");
//                    ctx.drawImage(this, 0, 0);
//                    var dataURL = canvas.toDataURL("image/jpeg", aibank.imageScale);
//                    dfd.resolve(dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""));
//                    data = null;
//                };
//                img.onerror = function () {
//                    data = null;
//                    dfd.resolve(null);
//                };
            } else {
                if (data.find(".errInfo").length) {
                    dfd.resolve(null, data.find(".errInfo").text());
//                    data = null;
                } else {
//                    data = null;
                    dfd.resolve(null);
                }
            }
            data = null;
        }

        return dfd.promise();
    };
    aibank.loadAshrai = function (res) {
        var url = "https://" + all.banks.accounts.aibank.urlServices + "/ebanking/CreditCard/DisplayCreditCardActivity.aspx";
        all.banks.core.services.httpReq(url, 'GET', null, false, false)
            .then(function (data) {
                try {
                    console.log("loadAshrai() - get");
                    var res = all.banks.core.services.parseHtml(data);
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
                        'ddlAccounts$m_ddl': res.find('select[name="ddlAccounts$m_ddl"]').find('option').eq(aibank.ddAccAshrai).val(), // ddAcc 0 or 1 or 2 ...
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
                    monitorActivityClass.setIntervalActivity();
                    senderReq.senderRest(url, url, all.banks.accounts.aibank.cookies, jsons, resReq);
                    console.log("loadAshrai() - senderRest POST");

                    function resReq(err, body) {
                        console.log("resReq - get cards");
                        //all.banks.accounts.aibank.cookies = cookies;
                        if (err) {
                            console.log("err resReq - cards");
                            all.banks.accounts.aibank.ddAshrai = 0;
                            all.banks.accounts.aibank.ddTime = 0;
                            if (all.banks.accounts.aibank.ddAccAshrai < aibank.ddlAccounts.length - 1) {
                                all.banks.accounts.aibank.ddAccAshrai = all.banks.accounts.aibank.ddAccAshrai + 1;
                                all.banks.accounts.aibank.setAccAsharai(res);
                                res = null;
                            } else {
                                all.banks.accounts.aibank.sendCardsCtrl(res);
                                res = null;
                            }
                        } else {
                            console.log("body resReq - cards");
                            var res = all.banks.core.services.parseHtml(body);

                            aibank.ddlAccounts = res.find('select[name="ddlAccounts$m_ddl"]').find('option');
                            if (res.find('select[name="ddlCard"]').length) {
                                console.log("body ddlCard exist - cards");
                                aibank.ddlCard = res.find('select[name="ddlCard"]').find('option');
                                aibank.loadAshraiAll(res);
                            } else if (res.find('select[name="ddlCards"]').length) {
                                console.log("body ddlCard exist - cards");
                                aibank.ddlCard = res.find('select[name="ddlCards"]').find('option');
                                aibank.loadAshraiAll(res);
                            } else {
                                console.log("body ddlCard null - cards");
                                all.banks.accounts.aibank.ddAshrai = 0;
                                all.banks.accounts.aibank.ddTime = 0;
                                if (all.banks.accounts.aibank.ddAccAshrai < aibank.ddlAccounts.length - 1) {
                                    all.banks.accounts.aibank.ddAccAshrai = all.banks.accounts.aibank.ddAccAshrai + 1;
                                    all.banks.accounts.aibank.setAccAsharai(res);
                                    res = null;
                                } else {
                                    all.banks.accounts.aibank.sendCardsCtrl(res);
                                    res = null;
                                }
                            }
                        }
                    }
                } catch (e) {
                    all.banks.core.services.errorLog("loadAshrai() " + e);
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    };
    aibank.setAccAsharai = function (data) {
        console.log("setAccAsharai");
        aibank.synchronizeCookieSets().then(function () {
            all.banks.accounts.aibank.loadAshrai(data);
        });
    };
    aibank.loadAshraiAll = function (res) {
        console.log("loadAshraiAll");
        monitorActivityClass.setIntervalActivity();
        try {
            var ddlDatePayment = aibank.dateCards[aibank.ddTime]; //res.find('select[name="ddlDatePayment"]').find('option').eq(all.banks.accounts.aibank.ddTime).val();
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
                'hideGoogleSerachAlert': 'הוזן תו לא חוקי',
                'AjaxSaveAS': res.find('input[name="AjaxSaveAS"]').val(),
                'ddlAccounts$m_ddl': aibank.ddlAccounts.eq(all.banks.accounts.aibank.ddAccAshrai).val(), // ddAcc 0 or 1 or 2 ...
                'ddlCard': aibank.ddlCard.eq(all.banks.accounts.aibank.ddAshrai).val(), // card val
                'ddlDatePayment': ddlDatePayment, // 01 02 03... dd date
                'btnDisplay.x': '10',
                'btnDisplay.y': '8'
            };
            var url = "https://" + all.banks.accounts.aibank.urlServices + "/ebanking/CreditCard/DisplayCreditCardActivity.aspx";
            senderReq.senderRest(url, url, all.banks.accounts.aibank.cookies, jsons, resReqCards);
            console.log("senderRest POST loadAshraiAll()");

            function resReqCards(err, body) {
                monitorActivityClass.setIntervalActivity();
                console.log("loadAshraiAll - resReqCards");
                //all.banks.accounts.aibank.cookies = cookies;
                if (err) {
                    console.log("err - resReqCards");
                    loadNextCardsAshrai(res);
                } else {
                    if (body == undefined) {
                        console.log("body empty - resReqCards");
                        loadNextCardsAshrai(res);
                    } else {
                        console.log("body exist - resReqCards");

                        var data = all.banks.core.services.parseHtml(body);
                        if (data.find("#NOINFORMATIONREGIONSERVERSIDEERROR .errInfo").length && data.find("#NOINFORMATIONREGIONSERVERSIDEERROR .errInfo").text().indexOf("אין נתונים לחשבון זה") !== -1) {
                            all.banks.accounts.aibank.ddTime = 0;
                            if (all.banks.accounts.aibank.ddAshrai < aibank.ddlCard.length - 2) {
                                all.banks.accounts.aibank.ddAshrai = all.banks.accounts.aibank.ddAshrai + 1;
                                all.banks.accounts.aibank.loadAshraiAll(data);
                                data = null;
                            } else {
                                all.banks.accounts.aibank.ddAshrai = 0;
                                if (all.banks.accounts.aibank.ddAccAshrai < aibank.ddlAccounts.length - 1) {
                                    all.banks.accounts.aibank.ddAccAshrai = all.banks.accounts.aibank.ddAccAshrai + 1;
                                    all.banks.accounts.aibank.setAccAsharai(data);
                                    data = null;
                                } else {
                                    all.banks.accounts.aibank.sendCardsCtrl(data);
                                    data = null;
                                }
                            }
                        } else {
                            var accVal = aibank.ddlAccounts.eq(all.banks.accounts.aibank.ddAccAshrai).text();
                            var nextTotal = data.find('#ctlRegularTransactions  .footer .ColumnsDir').text().replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, '');

                            var cardType = null;
                            if (data.find('#lblCreditCardDescriptionVal').length > 0) {
                                cardType = all.banks.core.services.getTypeCard(data.find('#lblCreditCardDescriptionVal').text());
                            }
                            var nextBillingDateMain = data.find('select[name="ddlDatePayment"]').find('option').eq(all.banks.accounts.aibank.ddTime).text().replace(/\s/g, "").substr(0, 8);
                            var indFakeDate = 0;
                            if (nextBillingDateMain.split('/').length == 1) {
                                indFakeDate = 1;
                                nextBillingDateMain = getNextBillingDateByCalc(data.find('select[name="ddlDatePayment"]').find('option').eq(0).text().replace(/\s/g, "").substr(0, 8).split('/'), all.banks.accounts.aibank.ddTime)
                            }

                            nextBillingDateMain = aibank.convertDateLocal(nextBillingDateMain);

                            var accBranchNumber = aibank.getAcc(accVal);
                            var cardNumber = aibank.ddlCard.eq(all.banks.accounts.aibank.ddAshrai).text();
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

                                const isLeYadiaBilvad = /לידיעה בלבד/gm.test(data.find('#tblRegularHeader').text());
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
                                    valueDate = aibank.convertDateLocal(valueDate);

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
                                        "comment": isLeYadiaBilvad ? 'לידיעה בלבד' : ''
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

                                    const isLeYadiaBilvad = /לידיעה בלבד/gm.test(data.find('#tblRegularDebitHeader').text());
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
                                        valueDate = aibank.convertDateLocal(valueDate);


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
                                            "comment": isLeYadiaBilvad ? 'לידיעה בלבד' : ''
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
                                    let nextCycleTotal = parseFloat(data.find('#tblSumForeign td.Summary_data').eq(0).text().replace(/[^\d^\.\-]/g, ""));
                                    // parseFloat(data.find('#tblSumForeign td').eq(1).text().replace(/[^\d^\.\-]/g, ""));
                                    if (Number.isNaN(nextCycleTotal)) {
                                        nextCycleTotal = parseFloat(data.find('#pnlOne > table.dataTable.summaryGrid > tbody > tr.footer > td.number_column.ColumnsDir').text().replace(/[^\d^\.\-]/g, ""));
                                    }

                                    data.find('#pnlOne .dataTable.summaryGrid tr').not('.header, .footer').each(function (i, v) {
                                        var nextBillingDate = $(v).find('td').eq(4).text().replace(/\s/g, "");
                                        nextBillingDate = aibank.convertDateLocal(nextBillingDate);
                                        var valueDate = $(v).find('td').eq(0).text().replace(/\s/g, "");
                                        valueDate = aibank.convertDateLocal(valueDate);

                                        var currency_id;
                                        var ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(data.find('#pnlOne .dirLTRorRTL').text());
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
                                            "NextBillingDate": all.banks.core.services.convertDateAll(nextBillingDate),
                                            "NextCycleTotal": nextCycleTotal,
                                            "CardStatus": null,
                                            //parseFloat(data.find('#tblSumForeign td').eq(1).text().trim().replace(/\s/g, "").replace(/,/g, '').replace('$', '')),
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
                                    // parseFloat(data.find('#tblSumForeign td').eq(1).text().replace(/[^\d^\.\-]/g, ""));
                                    const ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(data.find('#tblSumForeign td').eq(1).text().trim().replace(/\s/g, "").replace(/,/g, ''))

                                    data.find('#dgNewForeignTable tr').not('.header, .footer').each(function (i, v) {

                                        var nextBillingDate = $(v).find('td').eq(4).text().replace(/\s/g, "");
                                        nextBillingDate = aibank.convertDateLocal(nextBillingDate);

                                        var valueDate = $(v).find('td').eq(0).text().replace(/\s/g, "");
                                        valueDate = aibank.convertDateLocal(valueDate);

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
                if (all.banks.accounts.aibank.ddTime < aibank.dateCards.length - 1) {
                    all.banks.accounts.aibank.ddTime = all.banks.accounts.aibank.ddTime + 1;
                    all.banks.accounts.aibank.loadAshraiAll(data);
                    data = null;
                } else {
                    all.banks.accounts.aibank.ddTime = 0;
                    if (all.banks.accounts.aibank.ddAshrai < aibank.ddlCard.length - 2) {
                        all.banks.accounts.aibank.ddAshrai = all.banks.accounts.aibank.ddAshrai + 1;
                        all.banks.accounts.aibank.loadAshraiAll(data);
                        data = null;
                    } else {
                        all.banks.accounts.aibank.ddAshrai = 0;
                        if (all.banks.accounts.aibank.ddAccAshrai < aibank.ddlAccounts.length - 1) {
                            all.banks.accounts.aibank.ddAccAshrai = all.banks.accounts.aibank.ddAccAshrai + 1;
                            all.banks.accounts.aibank.setAccAsharai(data);
                            data = null;
                        } else {
                            all.banks.accounts.aibank.sendCardsCtrl(data);
                            data = null;
                        }
                    }
                }
            }
        } catch (e) {
            console.log("err loadAshraiAll(): " + e);
            aibank.loadAshrai();
        }
    };
    aibank.loadLoan = function () {
        aibank.synchronizeCookieSets().then(function () {
            var uri = "https://" + all.banks.accounts.aibank.urlServices + "/ebanking/LoanAndMortgages/DisplayLoansAndMortgagesSummary.aspx";
            all.banks.core.services.httpReq(uri, 'GET', null, false, false)
                .then(function (res) {

                    var urls = "https://" + all.banks.accounts.aibank.urlServices + "/ebanking/LoanAndMortgages/DisplayLoansAndMortgagesSummary.aspx?init=ajaxbm&index=-1&SortBy=0&&_=" + new Date().getTime();
                    all.banks.core.services.httpReq(urls, 'GET', null, false, false)
                        .then(function (data) {
                            var error = $(data).find("Error");
                            if (error.length == 0) {
                                getLoanLink(data);
                            } else {
                                aibank.sendLoanCtrl(data);
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
                                            loanFinish = aibank.convertDateLocal(loanFinish);

                                            var loanNextPaymentDate = data.find("#pnlDates tr").eq(3).find("td").eq(1).text();
                                            loanNextPaymentDate = aibank.convertDateLocal(loanNextPaymentDate);

                                            var loanDate = data.find("#pnlDates tr").eq(1).find("td").eq(1).text();
                                            loanDate = aibank.convertDateLocal(loanDate);


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

                                            const v1 = v.replace("DisplayLoanActivity.aspx", "AmortizationSchedule.aspx");
                                            all.banks.core.services.httpReq(v1, 'GET', null, false, false)
                                                .then(function (data) {
                                                    const xmlMatch = /(<BusinessModel>*.+<\/BusinessModel>)/gm.exec(data);
                                                    if (xmlMatch !== null) {
                                                        var xmlData = $.parseXML(xmlMatch[1]);
                                                        const loan = all.banks.generalVariables.allDataArrLoan[all.banks.generalVariables.allDataArrLoan.length - 1];
                                                        if (all.banks.spiderConfig.IsLeumiSilukin) {
                                                            loan["SilukinData"] = []
                                                        }
                                                        loan["NumOfPayments"] = Base64Function.decode($(xmlData).find("lblNumOfPaymentsVal").text())
                                                            .replace(/\D/g, "");
                                                        loan["LoanFirstPaymentDate"] = all.banks.core.services.convertDateAll(aibank.convertDateLocal(
                                                            Base64Function.decode($(xmlData).find("lblPrincipalFirstPaymentVal").text())));
                                                        loan["InterestFirstPaymentDate"] = all.banks.core.services.convertDateAll(aibank.convertDateLocal(
                                                            Base64Function.decode($(xmlData).find("lblInterestFirstPaymentVal").text())));

                                                        var xmlDataTable = $(xmlData).find("table");
                                                        if (xmlDataTable.find("body row").length > 0) {
                                                            loan["LastPaymentTotal"] = Base64Function.decode(xmlDataTable.find("body row:last td:last").text())
                                                                .replace(/[^\d-.]/g, "");
                                                            if (all.banks.spiderConfig.IsLeumiSilukin) {
                                                                xmlDataTable.find("body row").each(function (i, r) {
                                                                    loan["SilukinData"].push({
                                                                        "Payment_Num": i + 1,
                                                                        "Date_Of_Payment": all.banks.core.services.convertDateAll(aibank.convertDateLocal(Base64Function.decode($(r).find("td").eq(0).text()))),
                                                                        "Principal": Number(Base64Function.decode($(r).find("td").eq(1).text()).replace(/[^\d-.]/g, "")),
                                                                        "Interest": Number(Base64Function.decode($(r).find("td").eq(2).text()).replace(/[^\d-.]/g, "")),
                                                                        "Total_Payment": Number(Base64Function.decode($(r).find("td").eq(4).text()).replace(/[^\d-.]/g, "")),
                                                                        "Principal_Balance": null,
                                                                        "Loan_Balance": Number(Base64Function.decode($(r).find("td").eq(3).text()).replace(/[^\d-.]/g, ""))
                                                                    })
                                                                });
                                                            }
                                                            xmlDataTable.find("body row").each(function (i, r) {
                                                                const loanFundPayment = Number(Base64Function.decode($(r).find("td").eq(1).text())
                                                                    .replace(/[^\d-.]/g, ""));
                                                                if (loanFundPayment > 0) {
                                                                    loan["GraceNextPaymentDate"] = all.banks.core.services.convertDateAll(aibank.convertDateLocal(
                                                                        Base64Function.decode($(r).find("td").eq(0).text())));
                                                                    loan["GraceNextPaymentTotal"] = Base64Function.decode($(r).find("td").eq(4).text())
                                                                        .replace(/[^\d-.]/g, "");
                                                                    return false;
                                                                }
                                                            });
                                                        }
                                                    }
                                                })
                                                .always(function () {
                                                    if (i + 1 == arrLinks.length) {
                                                        aibank.sendLoanCtrl(res);
                                                    } else {
                                                        getAllLoans(arrLinks, res);
                                                    }
                                                });

                                            //                                                if (i + 1 == arrLinks.length) {
                                            //                                                    aibank.sendLoanCtrl(res);
                                            //                                                } else {
                                            //                                                    getAllLoans(arrLinks, res);
                                            //                                                }
                                        })
                                    return false;
                                }
                            })
                        } else {
                            aibank.sendLoanCtrl(res);
                        }
                    }

                    function getLoanLink(data) {
                        var arrLinks = [];
                        var xmlDataTable = $(data).find('table[tableID=TableNIS1]');
                        if (xmlDataTable.length) {
                            xmlDataTable.find("body row").each(function (ind, v) {
                                var decodeXmlVal = Base64Function.decode($(this).find("td").eq(0).text());
                                var urls1 = "https://" + all.banks.accounts.aibank.urlServices + decodeXmlVal.split('A Href="')[1].split('" tabIndex="')[0];
                                arrLinks.push(urls1);
                                if (xmlDataTable.find("body row").length == ind + 1) {
                                    getAllLoans(arrLinks, data);
                                }
                            })
                        } else {
                            aibank.sendLoanCtrl(data);
                        }
                    }


                })
                .fail(function (error, resErr, urlParam) {
                    var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                    all.banks.core.services.errorLog(logErr)
                });
        });
    };
    aibank.loadDeposit = function () {
        var uri = "https://" + all.banks.accounts.aibank.urlServices + "/ebanking/Investment/DisplayDepositsAndSavings.aspx";
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
                var urls = "https://" + all.banks.accounts.aibank.urlServices + "/ebanking/Investment/DisplayDepositsAndSavings.aspx?init=ajaxbm&index=" + accountCounter + "&indexOrder=" + accountCounter + "&&_=" + new Date().getTime();
                all.banks.core.services.httpReq(urls, 'GET', null, false, false)
                    .then(function (data) {
                        var error = $(data).find("Error");
                        if (error.length == 0 && $(data).find('#TOPERRORMESSAGEREGIONSERVERSIDEERROR').length == 0) {
                            getdDeoisitLink(data);
                        } else {
                            aibank.sendDepositCtrl(data);
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
                                        if ($(data).find("#pnlInterestRate >  table > tbody >  tr").length == 5 || $(data).find("#pnlInterestRate >  table >  tbody > tr").length == 6) {
                                            depositInterest = $(data).find("#pnlInterestRate > table >  tbody  > tr").eq(4).children('th').text().replace("%", "").trim();
                                        } else {
                                            depositInterest = $(data).find("#pnlInterestRate >  table > tbody > tr").eq(2).children('th').text().replace("%", "").trim();
                                        }
                                        var depositDate = null;
                                        $(data).find("#pnlDates  tbody  tr").each(function (idx, vals) {
                                            if ($(vals).text().indexOf("הפקדה") !== -1) {
                                                depositDate = $(vals).children('th').eq(0).text();
                                            }
                                            if ($(vals).text().indexOf("יציאה") !== -1) {
                                                depositExistStation = $(vals).children('th').eq(0).text();
                                            }
                                            if ($(vals).text().indexOf("פירעון") !== -1) {
                                                dueDate = $(vals).children('th').eq(0).text();
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
                                        $(data).find("#pnlSummaries > table > tbody > tr").each(function (idx, vals) {
                                            // var textxxxx = $(vals).text();
                                            // var childrenTH = $(vals).children("th");
                                            // var aaaaa = $(vals).children("th").eq(0).text()
                                            if ($(vals).text().indexOf("סכום") !== -1) {
                                                depositTotal = $(vals).children("th").eq(0).text().replace("₪", "").replace(/,/g, '').replace(/\s/g, "");
                                            }
                                            if ($(vals).text().indexOf("שווי") !== -1) {
                                                depositAsTotal = $(vals).children("th").eq(0).text().replace("₪", "").replace(/,/g, '').replace(/\s/g, "");
                                            }
                                        });
                                        dueDate = aibank.convertDateLocal(dueDate);
                                        depositDate = aibank.convertDateLocal(depositDate);
                                        depositExistStation = aibank.convertDateLocal(depositExistStation);

                                        all.banks.generalVariables.allDataArrDeposit.push({
                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                            "Token": all.banks.accountDetails.bank.token,
                                            "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                            "AccountNumber": accountNumber,
                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                            "BranchNumber": parseInt(branchNumber),
                                            "TypeName": $(data).find("#pnlVariousData  tbody  tr").eq(2).children('th').eq(0).text().replace(/\s\s+/g, " "),
                                            "DepositTotal": depositTotal,
                                            "DepositAsTotal": depositAsTotal,
                                            "DueDate": all.banks.core.services.convertDateAll(dueDate),
                                            "DepositDate": all.banks.core.services.convertDateAll(depositDate),
                                            "DepositExistStation": all.banks.core.services.convertDateAll(depositExistStation),
                                            "DepositNumber": depositNumber,
                                            "DepositInterest": depositInterest
                                        });
                                        if (i + 1 == arrLinks.length) {
                                            aibank.sendDepositCtrl(res);
                                        } else {
                                            getAllDeposit(arrLinks, res);
                                        }
                                    });
                                return false;
                            }
                        })
                    } else {
                        aibank.sendDepositCtrl(res);
                    }
                }

                function getdDeoisitLink(data) {
                    var xmlDataTable = $(data).find("table");
                    var arrLinks = [];
                    if (xmlDataTable) {
                        xmlDataTable.find("body row").each(function (ind, v) {
                            var decodeXmlVal = Base64Function.decode($(this).find("td").eq(0).text());
                            var urls1 = "https://" + all.banks.accounts.aibank.urlServices + decodeXmlVal.split('A Href="')[1].split('" tabIndex="')[0];
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
    aibank.loadDueChecks = function (data) {
        var url = "https://" + all.banks.accounts.aibank.urlServices + "/ebanking/Accounts/DisplayPostdatedChecks.aspx?FromPage=1";
        all.banks.core.services.httpReq(url, 'GET', null, false, false)
            .then(function (res) {
                var res = all.banks.core.services.parseHtml(res);
                var indDDAcc = 0;

                if ($(res).find("#ddlAccounts_m_ddl option").length === 0) {
                    aibank.sendDueChecksCtrl(data);
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
                            var accBranchNumber = aibank.getAcc(accVal);
                            var acc = {
                                'AccountNumber': accBranchNumber[0],
                                'BranchNumber': accBranchNumber[1]
                            };
                            var numberIdx = $(val).val();
                            var uri = "https://" + all.banks.accounts.aibank.urlServices + "/ebanking/Accounts/DisplayPostdatedChecks.aspx?FromPage=1";
                            // var idx = 0;
                            // var textCook = all.banks.accounts.aibank.cookies.split(";");
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
                            // all.banks.accounts.aibank.cookies = textCook.join(";") + ";";
                            // console.log(all.banks.accounts.aibank.cookies);
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
                                "txtSearchValue": "חפש",
                                "DES_JSE": 1
                            };
//                            senderReq.senderRest(uri, uri, all.banks.accounts.aibank.cookies, jsons, resReq);
                            console.log("loadAllDataChecks() - senderRest POST");
                            all.banks.core.services.httpReq(uri, 'POST', jsons, true, false)
                                .then(function (response) {
                                    resReq(null, response);
                                })
                                .fail(function (error) {
                                    resReq(error, null);
                                });

                            function resReq(err, body) {
                                if (err) {
                                    console.log("err resReq - loadAllDataChecks");
                                    var dateFrom = ("0" + (new Date().getDate())).slice(-2) + '/' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '/' + new Date().getFullYear().toString().slice(-2);
                                    var dateToFormat = new Date(new Date().getFullYear() + 7, 11, 31);
                                    var dateTo = ("0" + (dateToFormat.getDate())).slice(-2) + '/' + ("0" + (dateToFormat.getMonth() + 1)).slice(-2) + '/' + dateToFormat.getFullYear().toString().slice(-2);
                                    jsons["dtFromDate$textBox"] = dateFrom;
                                    jsons["dtToDate$textBox"] = dateTo;
                                    loadChecks2(jsons);
                                } else {
                                    if (body == undefined) {
                                        console.log("body empty - loadAllDataChecks");
                                        var dateFrom = ("0" + (new Date().getDate())).slice(-2) + '/' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '/' + new Date().getFullYear().toString().slice(-2);
                                        var dateToFormat = new Date(new Date().getFullYear() + 7, 11, 31);
                                        var dateTo = ("0" + (dateToFormat.getDate())).slice(-2) + '/' + ("0" + (dateToFormat.getMonth() + 1)).slice(-2) + '/' + dateToFormat.getFullYear().toString().slice(-2);
                                        jsons["dtFromDate$textBox"] = dateFrom;
                                        jsons["dtToDate$textBox"] = dateTo;
                                        loadChecks2(jsons);
                                    } else {
                                        console.log("body resReq - loadAllDataChecks");
                                        var data = all.banks.core.services.parseHtml(body);
                                        res = null;
                                        var dateFrom = ("0" + (new Date().getDate())).slice(-2) + '/' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '/' + new Date().getFullYear().toString().slice(-2);
                                        var dateToFormat = new Date(new Date().getFullYear() + 7, 11, 31);
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
//											depositeDate = aibank.convertDateLocal(depositeDate);
//											dueDate = aibank.convertDateLocal(dueDate);
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
                                var uri = "https://" + all.banks.accounts.aibank.urlServices + "/ebanking/Accounts/DisplayPostdatedChecks.aspx?FromPage=2";
//                                senderReq.senderRest(uri, uri, all.banks.accounts.aibank.cookies, jsons, resReqs);
                                console.log("loadChecks2() - senderRest POST");
                                all.banks.core.services.httpReq(uri, 'POST', jsons, true, false)
                                    .then(function (response) {
                                        resReq2(null, response);
                                    })
                                    .fail(function (error) {
                                        resReq2(error, null);
                                    });

                                function resReq2(err, body) {
                                    if (err) {
                                        console.log("err resReq - loadChecks2");
                                        if ((res.find("#ddlAccounts_m_ddl option").length - 1) > indDDAcc) {
                                            indDDAcc = indDDAcc + 1;
                                            loadAllDataChecks(res)
                                        } else {
                                            aibank.sendDueChecksCtrl(res)
                                        }
                                    } else {
                                        if (body == undefined) {
                                            console.log("body empty - loadChecks2");
                                            if ((res.find("#ddlAccounts_m_ddl option").length - 1) > indDDAcc) {
                                                indDDAcc = indDDAcc + 1;
                                                loadAllDataChecks(res)
                                            } else {
                                                aibank.sendDueChecksCtrl(res)
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
                                                    depositeDate = aibank.convertDateLocal(depositeDate);
                                                    dueDate = aibank.convertDateLocal(dueDate);

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
                                                            aibank.sendDueChecksCtrl(data)
                                                        }
                                                    }
                                                })
                                            } else {
                                                if ((data.find("#ddlAccounts_m_ddl option").length - 1) > indDDAcc) {
                                                    indDDAcc = indDDAcc + 1;
                                                    loadAllDataChecks(data)
                                                } else {
                                                    aibank.sendDueChecksCtrl(data)
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            return false;
                        }
                    })
                }
                ;
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    };
    aibank.loadStandingOrders = async function () {
        var url = "https://" + all.banks.accounts.aibank.urlServices + "/ebanking/Accounts/DisplayStandingOrders.aspx";
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
                                var accBranchNumber = aibank.getAcc(accVal);
                                var acc = {
                                    'AccountNumber': accBranchNumber[0],
                                    'BranchNumber': accBranchNumber[1]
                                };
                                var uri = "https://" + all.banks.accounts.aibank.urlServices + "/ebanking/Accounts/DisplayStandingOrders.aspx";
                                all.banks.core.services.httpReq(uri, 'POST', jsons, true, false)
                                    .then(function (data) {
                                        var data = all.banks.core.services.parseHtml(data);
                                        (async () => {
                                            const gridTransferSO = $(data).find('#gridTransferSO');
                                            if (gridTransferSO.length) {
                                                const items = $(data).find('#gridTransferSO .item');
                                                for (let i = 0; i < items.length; i++) {
                                                    const link = "https://" + all.banks.accounts.aibank.urlServices + items.eq(i).find('a').attr('href');
                                                    const table = await all.banks.core.services.httpReq(link, 'GET', null, false, false);
                                                    const parseTable = all.banks.core.services.parseHtml(table);
                                                    const tblSummeryRightTop = parseTable.find('#tblSummeryRightTop');
                                                    const OrderName = tblSummeryRightTop.find('tr').eq(2).children("td").eq(1).text();
                                                    const OrderTotal = tblSummeryRightTop.find('tr').eq(3).children("td").eq(1).text().replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, '');
                                                    const Asmachta = tblSummeryRightTop.find('tr').eq(5).children("td").eq(1).text().replace(/\s/g, "");
                                                    const tblSummeryLeftTop = parseTable.find('#tblSummeryLeftTop');
                                                    const OrderOpeningDate = all.banks.core.services.convertDateAll(aibank.convertDateLocal(tblSummeryLeftTop.find('tr').eq(0).children("td").eq(1).text().replace(/\s/g, "")));
                                                    const OrderLastDate = all.banks.core.services.convertDateAll(aibank.convertDateLocal(tblSummeryLeftTop.find('tr').eq(2).children("td").eq(1).text().replace(/\s/g, "")));
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
                                                            "OrderOpeningDate": all.banks.core.services.convertDateAll(aibank.convertDateLocal($(v).children("td").eq(2).text().replace(/\s/g, ""))),
                                                            "OrderLastDate": all.banks.core.services.convertDateAll(aibank.convertDateLocal($(v).children("td").eq(4).text().replace(/\s/g, ""))),
                                                            "OrderTotal": $(v).children("td").eq(3).text().replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, ''),
                                                            "OrderNumber": null,
                                                            "Asmachta": decodeXmlVal[0] === "" ? null : decodeXmlVal[0],
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
                                                        orderOpeningDate = aibank.convertDateLocal(orderOpeningDate);
                                                        orderLastDate = aibank.convertDateLocal(orderLastDate);
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
                                                            "Asmachta": decodeXmlVal[0] === "" ? null : decodeXmlVal[0],
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
                                                            aibank.sendStandingOrdersCtrl(data)
                                                        }
                                                    }
                                                })
                                            } else {
                                                if (($(res).find("#ddlAccounts_m_ddl option").length - 1) > indDDAcc) {
                                                    indDDAcc = indDDAcc + 1;
                                                    loadAllStandingOrders(data)
                                                } else {
                                                    aibank.sendStandingOrdersCtrl(data)
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
                            aibank.sendStandingOrdersCtrl(res)
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
    aibank.loadMatah = function () {
        all.banks.accounts.aibank.cookies = "";
        var url = "https://" + all.banks.accounts.aibank.urlServices + "/ebanking/Accounts/ExtendedSummary.aspx?DisplayType=2&UC=310&from=sideMenu";
        all.banks.core.services.httpReq(url, 'GET', null, false, false)
            .then(function (res) {
                win.cookies.getAll({}, function (cool) {
                    all.banks.accounts.aibank.cookies = cool
                        .map(ck => {
                            if (ck.name === '' || ck.name === 'SERVERID') {
                                return '';
                            } else {
                                return ck.name + "=" + (ck.name === "NisDateSort" ? "0" : ck.value);
                            }
                        })
                        .join(";");
                    var resParsed = all.banks.core.services.parseHtml(res);
                    if (resParsed.find("#ddlClientNumber_m_ddl option").length > 1) {
                        resParsed.find("#ddlClientNumber_m_ddl option:last").remove();
                    }
                    var accMatah = resParsed.find("#ddlClientNumber_m_ddl option");
                    // console.log(accMatah.text(), accMatah);
                    // debugger
                    if (accMatah.length > 0) {
                        loadAccMathah(accMatah, resParsed);
                    } else {
                        aibank.sendOshCtrl(resParsed, true);
                        return false;
                    }
                })
            });

        var indexAcc = 0;

        function loadAccMathah(accMatah, res) {
            accMatah.each(function (i, v) {
                if (i == indexAcc) {
                    var val = $(v).val();
                    var text = $(v).text();
                    //console.log(val, text);
                    if (indexAcc > 0) {
                        var url = "https://" + all.banks.accounts.aibank.urlServices + "/ebanking/Accounts/ExtendedSummary.aspx?DisplayType=2&UC=310&from=sideMenu";
                        senderReq.senderGetRest(url, all.banks.accounts.aibank.cookies, (err, res) => {
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
                            var url = "https://" + all.banks.accounts.aibank.urlServices + "/ebanking/Accounts/ExtendedSummary.aspx?DisplayType=2&UC=310&from=sideMenu";
                            senderReq.senderRest(url, url, all.banks.accounts.aibank.cookies, jsons, resReqPostDataAll);
                            console.log("senderGetRest POST loadAccMathah()");
                        });
//                        all.banks.core.services.httpReq(url, 'GET', null, false, false)
//                            .then(function (res) {
//                                var res = all.banks.core.services.parseHtml(res);
//                                var jsons = {
//                                    '__EVENTTARGET': 'ddlClientNumber$m_ddl',
//                                    '__EVENTARGUMENT': '',
//                                    'DES_Group': '',
//                                    'DES_JSE': '1',
//                                    '__VIEWSTATE': res.find('input[name="__VIEWSTATE"]').val(),
//                                    '__EVENTVALIDATION': res.find('#__EVENTVALIDATION').val(),
//                                    '__VIEWSTATEGENERATOR': res.find('#__VIEWSTATEGENERATOR').val(),
//                                    'hidtabindexCount': res.find('input[name="hidtabindexCount"]').val(),
//                                    'hidExitValue': '0',
//                                    'hideGoogleSerachAlert': 'הוזן תו לא חוקי',
//                                    'AjaxSaveAS': res.find('input[name="AjaxSaveAS"]').val(),
//                                    "ddlClientNumber$m_ddl": val,
//                                    "txtSearchValue": "חפש",
//                                    "popupLobyPage$hItemIndex": ""
//                                };
//                                var url = "https://" + all.banks.accounts.aibank.urlServices + "/ebanking/Accounts/ExtendedSummary.aspx?DisplayType=2&UC=310&from=sideMenu";
//                                senderReq.senderRest(url, url, all.banks.accounts.aibank.cookies, jsons, resReqPostDataAll);
//                                console.log("senderGetRest POST loadAccMathah()");
//                            });
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
                        var url = "https://" + all.banks.accounts.aibank.urlServices + "/ebanking/Accounts/ExtendedSummary.aspx?DisplayType=2&UC=310&from=sideMenu";
                        senderReq.senderRest(url, url, all.banks.accounts.aibank.cookies, jsons, resReqPostDataAll);
                        console.log("senderGetRest POST loadAccMathah()");
                    }

                    function resReqPostDataAll(err, body) {
                        if (err) {
                            console.log("err POST loadAccMathah()");
                            if (indexAcc + 1 == accMatah.length) {
                                aibank.sendOshCtrl(res, true);
                                return false;
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
                                        aibank.sendOshCtrl(res, true);
                                        return false;
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
                                                        var urlTd = "https://" + all.banks.accounts.aibank.urlServices + "" + td.eq(0).find("A").attr("Href");
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

                                                        senderReq.senderGetRest(urlTd, all.banks.accounts.aibank.cookies, resGet);

                                                        function resGet(err, bodyData) {
                                                            var res;
                                                            if (err || (res = all.banks.core.services.parseHtml(bodyData)).find('#TOPERRORMESSAGEREGIONSERVERSIDEERROR > table > tbody > tr > td.errInfo').text()) {
                                                                //console.log("err loadRowsMatah(): ", indxRows);

                                                                if (indxRows + 1 == rows.length) {
                                                                    if (indexAcc + 1 == accMatah.length) {
                                                                        aibank.sendOshCtrl(data, true);
                                                                        return false;
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
                                                                // writeHtmlFile('bodyData', bodyData);

                                                                var bodyDataTableSrc = all.banks.core.services.parseHtml(bodyData);
                                                                var hidDatesElem = res.find('input[name="HidDates"]').val();
                                                                var loadDate;
                                                                if (hidDatesElem.split(';')[1] != null) {
                                                                    loadDate = hidDatesElem.split(";")[1];
                                                                }
                                                                var hidDates = "notload;" + loadDate;
                                                                var jsons = {
                                                                    // '__EVENTTARGET': 'ctlActivityTable$ctl01$ctl00',
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
                                                                    "dtFromDate$textBox": all.banks.accounts.aibank.datebacksleshMatah,
                                                                    "dtToDate$textBox": all.banks.accounts.aibank.datebacksleshToMatah,
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

                                                                monitorActivityClass.setIntervalActivity();
                                                                var url = "https://" + all.banks.accounts.aibank.urlServices + "/ebanking/ForeignCurrency/DisplayForeignAccountsActivity.aspx";
                                                                senderReq.senderRest(url, url, all.banks.accounts.aibank.cookies, jsons, resReqPostData);

                                                                function resReqPostData(err, body) {
                                                                    if (err) {
                                                                        //	console.log("err loadRowsMatah() date: ", indxRows);

                                                                        if (indxRows + 1 == rows.length) {
                                                                            if (indexAcc + 1 == accMatah.length) {
                                                                                aibank.sendOshCtrl(res, true);
                                                                                return false;
                                                                            } else {
                                                                                indexAcc = indexAcc + 1;
                                                                                loadAccMathah(accMatah, res);
                                                                            }
                                                                        } else {
                                                                            indxRows = indxRows + 1;
                                                                            loadRowsMatah(rows);
                                                                        }
                                                                    } else {
                                                                        // console.log("load loadRowsMatah() date: ", indxRows);

                                                                        jsons = null;
                                                                        var data = all.banks.core.services.parseHtml(body);
                                                                        all.banks.accounts.aibank.dataInputs = data;
                                                                        try {
                                                                            let isBasedOnOriginal = false;
                                                                            let fromDateCalc = new Date(("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2) + '/' + all.banks.accountDetails.dateFromMatah.getFullYear().toString());
                                                                            if ((!data.find('#ctlActivityTable').length)
                                                                                && (bodyDataTableSrc.find('#ctlActivityTable').length || bodyDataTableSrc.find('#ctlTodayActivityTable').length)
                                                                            ) {
                                                                                console.log('get data from src');
                                                                                data = bodyDataTableSrc;
                                                                                isBasedOnOriginal = true;
                                                                            }

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
                                                                                            date = aibank.convertDateLocal(date);
                                                                                            if (!isBasedOnOriginal || (isBasedOnOriginal && (new Date(date) >= new Date(fromDateCalc)))) {
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
                                                                                            }


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
                                                                                        aibank.sendOshCtrl(all.banks.accounts.aibank.dataInputs, true);
                                                                                        return false;
                                                                                    } else {
                                                                                        indexAcc = indexAcc + 1;
                                                                                        loadAccMathah(accMatah, all.banks.accounts.aibank.dataInputs);
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
                                                                                                date = aibank.convertDateLocal(date);

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
                                                                                                            aibank.sendOshCtrl(data, true);
                                                                                                            return false;
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
                                                                                            aibank.sendOshCtrl(data, true);
                                                                                            return false;
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
                                                                            console.log(err)

                                                                            // debugger
                                                                            all.banks.core.services.errorLog(err);
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    } catch (e) {
                                                        // debugger
                                                        console.log(e)
                                                    }

                                                    return false;
                                                }
                                            });
                                        }

                                        loadRowsMatah(rows);
                                    } else {
                                        if (indexAcc + 1 == accMatah.length) {
                                            aibank.sendOshCtrl(data, true);
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
    aibank.logOut = function (data) {
        all.banks.accounts.aibank.cookies = "";

        if (data.find('form[name="MAINFORM"]').length > 0) {
            var dataJson = {
                '__EVENTTARGET': '',
                '__EVENTARGUMENT': '',
                '__VIEWSTATE': data.find('form[name="MAINFORM"] input[name="__VIEWSTATE"]').val(),
                '__EVENTVALIDATION': data.find('form[name="MAINFORM"] input[name="__EVENTVALIDATION"]').val(),
                'hidtabindexCount': '121',
                'hidExitValue': '1',
                'hideGoogleSerachAlert': 'הוזן תו לא חוקי',
                'AjaxSaveAS': '',
                'hidSaveAsChoice': '',
                'popupLobyPage$hItemIndex': '',
                'txtSearchValue': 'חפש'
            };
            var pathUrlLogOut = data.find('form[name="MAINFORM"]').attr('action').replace("./", "");
            var url = "https://" + all.banks.accounts.aibank.urlServices + "/eBanking/Accounts/" + pathUrlLogOut;
            all.banks.core.services.httpReq(url, 'POST', dataJson, true, false)
                .then(function (data) {
                    dataJson = null;
                })
                .fail(function (error, resErr, urlParam) {
                    // try {
                    //     //$('#filecontainerlogin').attr('src', '');
                    //     myEmitterLogs(aibank.logOutNumbers);
                    // } catch (err) {
                    //     all.banks.core.services.errorLog(err)
                    // }
                })
                .done(resumeLogOut);
        } else {
            resumeLogOut();
        }

        function resumeLogOut() {
            all.banks.core.services.httpReq("https://" + all.banks.accounts.aibank.urlServices + "/ebanking/logofffromvv.asp", 'GET', null, false, false)
                .then(function (data) {
                    if (parseInt(all.banks.accountDetails.bank.BankNumber) == 10) {
                        all.banks.core.services.httpReq("https://www.leumi.co.il/Leumi/Home/0,2777,5835,00.html", 'GET', null, false, false)
                    }
                    try {
                        myEmitterLogs(aibank.logOutNumbers);
                    } catch (err) {
                        all.banks.core.services.errorLog(err)
                    }
                })
                .fail(function (error, resErr, urlParam) {
                    try {
                        myEmitterLogs(aibank.logOutNumbers);
                    } catch (err) {
                        all.banks.core.services.errorLog(err)
                    }
                });
        }
    };
    aibank.decodeThenUnescape = function (base64Encoded) {
        return !base64Encoded ? base64Encoded
            : aibank.unescapeHtml(Base64Function.decode(base64Encoded));
    };
    aibank.dummyForUnescape = $("<p></p>");
    aibank.unescapeHtml = function (escapedText) {
        return !escapedText ? escapedText : aibank.dummyForUnescape.html(escapedText).text();
    };
    aibank.currencyFromNumber = function (numVal) {
        switch (Number(numVal)) {
            case -1:
                return 'ILS';
            case 1:
            case 15:
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
    aibank.timesToTryCard = 0;
    aibank.loadAshraiNew = async function () {
        aibank.timesToTryCard += 1;
        await aibank.synchronizeCookieSets();

        const resp = await all.banks.core.services.httpReq(
            "https://" + all.banks.accounts.aibank.urlServices + "/ebanking/SO/SPA.aspx",
            'GET', null, false, false);

        try {
            const sessionIDMatcher = /\\\"SessionID\\\"\s*\:\s*\\\"([a-fA-F0-9]{32})\\\"/gm.exec(resp);
            if (sessionIDMatcher === null) {
                if (aibank.timesToTryCard < 4) {
                    aibank.loadAshraiNew()
                } else {
                    myEmitterLogs(9, "err load Ashrai New");
                }
                return;
            }
            const sessionID = sessionIDMatcher[1];
            // console.log('sessionID---', sessionID)

            const getAccountsData = {
                moduleName: "UC_SO_GetAccounts",
                reqObj: JSON.stringify({
                    "SessionHeader": {"SessionID": sessionID, "FIID": aibank.site_name},
                    "ComboMethod": "true",
                    "StateName": "creditcardinfo",
                    "ModuleName": "UC_SO_GetAccounts",
                    "RequestedAccountTypes": "CHECKING",
                    "ExtAccountPermissions": "General",
                    "AccountSegments": ""
                }),
                version: "V4.0"
            }

            // const getAccounts = await senderRests('https://' + all.banks.accounts.aibank.urlServices +
            //     '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_GetAccounts', getAccountsData)
            const getAccounts = await all.banks.core.services.httpReq('https://' + all.banks.accounts.aibank.urlServices +
                '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_GetAccounts', 'POST', getAccountsData, false, false);

            const jsonRespAcc = JSON.parse(getAccounts.jsonResp);
            // console.log('jsonRespAcc.AccountsItems', jsonRespAcc.AccountsItems);
            if (jsonRespAcc.AccountsItems && jsonRespAcc.AccountsItems.length) {
                if (all.banks.accountDetails.deleted_account_ids.length) {
                    jsonRespAcc.AccountsItems = jsonRespAcc.AccountsItems.filter(item => !(all.banks.accountDetails.deleted_account_ids.some(it => (/^(\d+)-([\d/]+)$/g.exec(item.MaskedNumber)[2].replace('/', '')).includes(it.toString()))))
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
                            "SessionHeader": {"SessionID": sessionID, "FIID": aibank.site_name},
                            "AccountIndex": accountIndex,
                            "StateName": "CreditCardInfo",
                            "ModuleName": "UC_SO_010_03_SetDefaultAccountIndex",
                            "ComboMethod": "true",
                            "RequestedAccountTypes": "CHECKING",
                            "ExtAccountPermissions": "General",
                            "AccountSegments": ""
                        }),
                        version: "V4.0"
                    }
                    //await senderRests('https://hb2.bankleumi.co.il/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_010_03_SetDefaultAccountIndex', setAccount)
                    await all.banks.core.services.httpReq('https://' + all.banks.accounts.aibank.urlServices + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_010_03_SetDefaultAccountIndex', 'POST',
                        setAccount, false, false);


                    const getAllCardsParams = {
                        moduleName: "UC_SO_GetCreditCardsInfo",
                        reqObj: JSON.stringify({
                            "SessionHeader": {"SessionID": sessionID, "FIID": aibank.site_name},
                            "AccountIndex": accountIndex,
                            "StateName": "CreditCardInfo",
                            "ModuleName": "UC_SO_GetCreditCardsInfo"
                        }),
                        version: "V4.0"
                    }
                    // const getAllCards = await senderRests('https://' + all.banks.accounts.aibank.urlServices
                    //     + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_GetCreditCardsInfo', getAllCardsParams)
                    const getAllCards = await all.banks.core.services.httpReq('https://' + all.banks.accounts.aibank.urlServices
                        + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_GetCreditCardsInfo', 'POST', getAllCardsParams, false, false);


                    const jsonRespAllCards = JSON.parse(getAllCards.jsonResp);
                    const cardsToProcess = [
                        ...(Array.isArray(jsonRespAllCards.CreditCardsItems) ? jsonRespAllCards.CreditCardsItems : []),
                        ...(Array.isArray(jsonRespAllCards.OtherCreditCardsItems) ? jsonRespAllCards.OtherCreditCardsItems : []),
                        ...(Array.isArray(jsonRespAllCards.DebitCardsItems) ? jsonRespAllCards.DebitCardsItems : [])
                    ];
                    if (cardsToProcess.length) {
                        console.log('jsonRespAllCards.CreditCardsItems', jsonRespAllCards.CreditCardsItems)
                        for (let cardIdx = 0; cardIdx < cardsToProcess.length; cardIdx++) {
                            const card = cardsToProcess[cardIdx];
                            const cardStatus = (card.BlockCardStatus && card.BlockCardStatus === 6) ? "1" : null;
                            const cardIndex = card.CardIndex;
                            const cardType = all.banks.core.services.getTypeCard(card.DisplayName)


                            // const getAllPeriodsParams = {
                            //     moduleName: "UC_SO_125_GetTotalDebitAndPaymentsDates",
                            //     reqObj: JSON.stringify({
                            //         "SessionHeader": {"SessionID": sessionID, "FIID": "Leumi"},
                            //         "CreditCardIndex": cardIndex,
                            //         "StateName": "creditcardinfo",
                            //         "ModuleName": "UC_SO_125_GetTotalDebitAndPaymentsDates"
                            //     }),
                            //     version: "V4.0"
                            // }
                            // const getAllPeriods = await senderRests('https://' + all.banks.accounts.aibank.urlServices
                            //     + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_125_GetTotalDebitAndPayments', getAllPeriodsParams)

                            // const getAllPeriods = await all.banks.core.services.httpReq('https://' + all.banks.accounts.aibank.urlServices
                            //     + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_125_GetTotalDebitAndPayments', 'POST', getAllPeriodsParams, false, false);


                            const getAllPeriodsParams = {
                                moduleName: "UC_MS_125_CreditCardsInfo",
                                reqObj: JSON.stringify({
                                    "StateName": "CardsWorld",
                                    "ModuleName": "UC_MS_125_CreditCardsInfo",
                                    "SessionHeader": {"SessionID": sessionID, "FIID": aibank.site_name},
                                    "AccountIndexSpecified": true,
                                    "CardIndex": cardIndex,
                                    "Operation": 2,
                                    "OperationSpecified": true,
                                    "AccountIndex": accountIndex
                                }),
                                version: "Infra_V2.0"
                            }
                            const getAllPeriods = await all.banks.core.services.httpReq('https://' + all.banks.accounts.aibank.urlServices
                                + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_MS_125_CreditCardsInfo', 'POST', getAllPeriodsParams, false, false);
                            const jsonRespAllPeriods = JSON.parse(getAllPeriods.jsonResp);
                            const cardNumber = card.CardLast4Digits;
                            if (jsonRespAllPeriods.Graph && jsonRespAllPeriods.Graph.DebitMonthItems && jsonRespAllPeriods.Graph.DebitMonthItems.length) {
                                // console.log('jsonRespAllPeriods.Graph.DebitMonthItems', jsonRespAllPeriods.Graph.DebitMonthItems)
                                for (let periodIdx = 0; periodIdx < jsonRespAllPeriods.Graph.DebitMonthItems.length && ((periodIdx) < all.banks.accountDetails.ccardMonth) && (new Date(jsonRespAllPeriods.Graph.DebitMonthItems[periodIdx].CycleDate) < new Date(card.DatePaymentDueUTC)); periodIdx++) {
                                    const CycleDate = jsonRespAllPeriods.Graph.DebitMonthItems[periodIdx].CycleDate;
                                    const getCreditCardActivityParams = {
                                        moduleName: "UC_MS_125_CreditCardsInfo",
                                        reqObj: JSON.stringify(
                                            {
                                                "StateName": "CardsWorld",
                                                "ModuleName": "UC_MS_125_CreditCardsInfo",
                                                "SessionHeader": {
                                                    "SessionID": sessionID,
                                                    "FIID": aibank.site_name
                                                },
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
                                    const getCreditCardActivity = await all.banks.core.services.httpReq('https://' + all.banks.accounts.aibank.urlServices
                                        + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_MS_125_CreditCardsInfo', 'POST', getCreditCardActivityParams, false, false);
                                    // const getCreditCardActivityParams = {
                                    //     moduleName: "UC_SO_125_GetCreditCardActivity",
                                    //     reqObj: JSON.stringify({
                                    //         "SessionHeader": {"SessionID": sessionID, "FIID": "Leumi"},
                                    //         "CardIndex": cardIndex,
                                    //         "CardPeriodType": cardPeriodType,
                                    //         "StateName": "creditcardinfo",
                                    //         "ModuleName": "UC_SO_125_GetCreditCardActivity"
                                    //     }),
                                    //     version: "V4.0"
                                    // }
                                    // const getCreditCardActivity = await all.banks.core.services.httpReq('https://' + all.banks.accounts.aibank.urlServices
                                    //     + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_125_GetTotalDebitAndPayments', 'POST', getCreditCardActivityParams, false, false);

                                    // const getCreditCardActivity = await senderRests('https://' + all.banks.accounts.aibank.urlServices
                                    //     + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_125_GetTotalDebitAndPayments', getCreditCardActivityParams)


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
                                                        const ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(aibank.currencyFromNumber(tabForeign.Currency));
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
                                }
                            }
                            //all.banks.accountDetails.ccardMonth
                        }
                    }

//                    if (jsonRespAllCards.OtherCreditCardsItems && jsonRespAllCards.OtherCreditCardsItems.length) {
//                        // console.log('jsonRespAllCards.OtherCreditCardsItems', jsonRespAllCards.OtherCreditCardsItems)
//                        for (let cardIdx = 0; cardIdx < jsonRespAllCards.OtherCreditCardsItems.length; cardIdx++) {
//                            const cardIndex = jsonRespAllCards.OtherCreditCardsItems[cardIdx].CardIndex;
//                            const cardType = all.banks.core.services.getTypeCard(jsonRespAllCards.OtherCreditCardsItems[cardIdx].DisplayName)
//                            const getAllPeriodsParams = {
//                                moduleName: "UC_SO_125_GetTotalDebitAndPaymentsDates",
//                                reqObj: JSON.stringify({
//                                    "SessionHeader": {"SessionID": sessionID, "FIID": "Leumi"},
//                                    "CreditCardIndex": cardIndex,
//                                    "StateName": "creditcardinfo",
//                                    "ModuleName": "UC_SO_125_GetTotalDebitAndPaymentsDates"
//                                }),
//                                version: "V4.0"
//                            }
//                            // const getAllPeriods = await senderRests('https://' + all.banks.accounts.aibank.urlServices
//                            //     + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_125_GetTotalDebitAndPayments', getAllPeriodsParams)
//
//                            const getAllPeriods = await all.banks.core.services.httpReq('https://' + all.banks.accounts.aibank.urlServices
//                                + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_125_GetTotalDebitAndPayments', 'POST', getAllPeriodsParams, false, false);
//
//                            const jsonRespAllPeriods = JSON.parse(getAllPeriods.jsonResp);
//
//                            const cardNumber = jsonRespAllCards.OtherCreditCardsItems[cardIdx].CardLast4Digits;
//                            if (jsonRespAllPeriods.DatePaymentItems && jsonRespAllPeriods.DatePaymentItems.length) {
//                                // console.log('jsonRespAllCards.DatePaymentItems', jsonRespAllPeriods.DatePaymentItems)
//                                for (let periodIdx = 0; periodIdx < (jsonRespAllPeriods.DatePaymentItems.length); periodIdx++) {
//                                    const nextBillingDate = all.banks.core.services.convertDateAll(jsonRespAllPeriods.DatePaymentItems[periodIdx].PaymentDateUTC);
//                                    myEmitterLogs(15, cardNumber + ' period ' + nextBillingDate);
//                                    const nextCycleTotal = jsonRespAllPeriods.DatePaymentItems[periodIdx].DebitSum;
//                                    const cardPeriodType = jsonRespAllPeriods.DatePaymentItems[periodIdx].CardPeriodType;
//                                    const getCreditCardActivityParams = {
//                                        moduleName: "UC_SO_125_GetCreditCardActivity",
//                                        reqObj: JSON.stringify({
//                                            "SessionHeader": {"SessionID": sessionID, "FIID": "Leumi"},
//                                            "CardIndex": cardIndex,
//                                            "CardPeriodType": cardPeriodType,
//                                            "StateName": "creditcardinfo",
//                                            "ModuleName": "UC_SO_125_GetCreditCardActivity"
//                                        }),
//                                        version: "V4.0"
//                                    }
//                                    // const getCreditCardActivity = await senderRests('https://' + all.banks.accounts.aibank.urlServices
//                                    //     + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_125_GetTotalDebitAndPayments', getCreditCardActivityParams)
//
//                                    const getCreditCardActivity = await all.banks.core.services.httpReq('https://' + all.banks.accounts.aibank.urlServices
//                                        + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_125_GetTotalDebitAndPayments', 'POST', getCreditCardActivityParams, false, false);
//
//                                    const jsonRespCardActivity = JSON.parse(getCreditCardActivity.jsonResp);
//                                    if (jsonRespCardActivity) {
//                                        // console.log('jsonRespCardActivity', jsonRespCardActivity)
//                                        if (Array.isArray(jsonRespCardActivity.TabNISTransactionItems) && jsonRespCardActivity.TabNISTransactionItems.length) {
//                                            for (const tabNIS of jsonRespCardActivity.TabNISTransactionItems) {
//                                                if (Array.isArray(tabNIS.NISTransactionItems) && tabNIS.NISTransactionItems.length) {
//                                                    const tableBase = Object.assign(
//                                                            {
//                                                                "CardNumber": cardNumber,
//                                                                "CardType": cardType,
//                                                                "CardStatus": null,
//                                                                "NextCycleTotal": nextCycleTotal,
//                                                                "ind_iskat_hul": 1
//                                                            },
//                                                            objBase,
//                                                            jsonRespCardActivity.TabNISTransactionItems.length === 2 && tabNIS.TableID === 2
//                                                            ? {comment: 'לידיעה בלבד'} : {});
//                                                    for (const row of tabNIS.NISTransactionItems) {
//                                                        tableBase["NextBillingDate"] = row.DebitCardDebitPeriodUTC
//                                                                        ? all.banks.core.services.convertDateAll(row.DebitCardDebitPeriodUTC)
//                                                                        : nextBillingDate;
//                                                        all.banks.generalVariables.allDataArrAshrai.push(
//                                                                Object.assign(asArrAshraiItem(row), tableBase)
//                                                        );
//                                                    }
//                                                }
//                                            }
//                                        }
//
//                                        if (Array.isArray(jsonRespCardActivity.TabForeignTransactionItems) && jsonRespCardActivity.TabForeignTransactionItems.length) {
//                                            for (const tabForeign of jsonRespCardActivity.TabForeignTransactionItems) {
//                                                if (Array.isArray(tabForeign.ForeignTransactionItems) && tabForeign.ForeignTransactionItems.length) {
//                                                    const ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(aibank.currencyFromNumber(tabForeign.Currency));
//                                                    const tableBase = Object.assign(
//                                                            {
//                                                                "CardNumber": cardNumber,
//                                                                "CardType": cardType,
//                                                                "CardStatus": null,
//                                                                "NextCycleTotal": nextCycleTotal,
//                                                                "ind_iskat_hul": ind_iskat_hul
//                                                            },
//                                                            objBase,
//                                                            jsonRespCardActivity.TabForeignTransactionItems.length === 2 && tabForeign.TableID === 2
//                                                            ? {comment: 'לידיעה בלבד'} : {});
//                                                    for (const row of tabForeign.ForeignTransactionItems) {
//                                                        tableBase["NextBillingDate"] = row.DebitCardDebitPeriodUTC
//                                                                        ? all.banks.core.services.convertDateAll(row.DebitCardDebitPeriodUTC)
//                                                                        : nextBillingDate;
//                                                        all.banks.generalVariables.allDataArrAshrai.push(
//                                                                Object.assign(asArrAshraiItem(row), tableBase)
//                                                        );
//                                                    }
//                                                }
//                                            }
//                                        }
//                                    }
//                                }
//                            }
//                            //all.banks.accountDetails.ccardMonth
//                        }
//                    }
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
                        "currency_id": all.banks.core.services.getTypeCurrencyAll(aibank.currencyFromNumber(row.TransactionCurrency)),
                        "original_total": row.AmountDouble,
                        "comment": comment
                    };
                }
            }
            all.banks.accounts.aibank.sendCardsCtrl(all.banks.core.services.parseHtml(resp));

        } catch (ex) {
            console.log(ex);
            writeLog(ex);
            if (all.banks.accountDetails.IND_NILVIM > 0) {
                myEmitterLogs(21); //start loan
                all.banks.accounts.aibank.loadLoan();
            } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                myEmitterLogs(34);
                aibank.synchronizeCookieSets().then(function () {
                    aibank.loadMatah();
                });
            } else {
                all.banks.accounts.aibank.logOut(all.banks.core.services.parseHtml(resp));
            }
        }


        // async function waiting(url, dataJson) {
        //     var dfd = jQuery.Deferred();
        //     setTimeout(() => {
        //         dfd.resolve();
        //     }, 3500)
        //     return dfd.promise();
        // }
        //
        // async function senderRests(url, dataJson) {
        //     function getSetCookies(cookie) {
        //         return new Promise((resolve, reject) => {
        //             try {
        //                 var cookSplit = all.banks.accounts.aibank.cookies.split(";");
        //                 var i, len = cookie.length;
        //                 if (len) {
        //                     for (i = 0; i < len; i++) {
        //                         var v = cookie[i];
        //                         var name = v.split(";")[0].split("=")[0].replace(/\s/g, "");
        //                         var val = v.split(";")[0].split("=")[1].replace(/\s/g, "");
        //                         var exist = 0;
        //                         var i1, len1 = cookSplit.length;
        //                         for (i1 = 0; i1 < len1; i1++) {
        //                             var v1 = cookSplit[i1];
        //                             if (v1 !== "") {
        //                                 var nameExist = v1.split("=")[0].replace(/\s/g, "");
        //                                 var valExist = v1.split("=")[1].replace(/\s/g, "");
        //                                 if (nameExist === name) {
        //                                     exist = 1;
        //                                     if (val !== valExist) {
        //                                         v1 = v.split(";")[0] + ";"
        //                                     }
        //                                 }
        //                             }
        //                         }
        //                         if (exist === 0) {
        //                             cookSplit.unshift(v.split(";")[0])
        //                         }
        //                         if (len === i + 1) {
        //                             all.banks.accounts.aibank.cookies = cookSplit
        //                                 .map(ck => {
        //                                     const name1 = ck.split("=")[0].replace(/\s/g, "");
        //                                     const val1 = ck.split("=")[1].replace(/\s/g, "");
        //                                     return name1 + "=" + (name1 === "NisDateSort" ? "0" : val1);
        //                                 }).join(";");
        //                             resolve(true)
        //                         }
        //                     }
        //                 } else {
        //                     resolve(true)
        //                 }
        //             } catch (e) {
        //                 debugger
        //             }
        //         });
        //     }
        //
        //     var dfd = jQuery.Deferred();
        //     var domains = "bankleumi";
        //     if (url.indexOf("aibank") !== -1) {
        //         domains = "aibank";
        //     } else if (url.indexOf("unionbank") !== -1) {
        //         domains = "unionbank";
        //     }
        //     const options = {
        //         uri: url,
        //         method: 'POST',
        //         family: 4,
        //         timeout: 100000,
        //         body: JSON.stringify(dataJson),
        //         headers: {
        //             "Host": "hb2." + domains + ".co.il",
        //             "Origin": "https://hb2." + domains + ".co.il",
        //             'Cookie': all.banks.accounts.aibank.cookies,
        //             'Referer': 'https://hb2.bankleumi.co.il/ebanking/SO/SPA.aspx',
        //             'Upgrade-Insecure-Requests': '1',
        //             "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36",
        //             "Connection": "keep-alive",
        //             "Content-Type": "application/json; charset=UTF-8",
        //             "Cache-Control": "no-cache",
        //         }
        //     }
        //     senderReq.sendersServer(options, (error, response, body) => {
        //         if (response !== undefined && response.headers !== undefined && response.headers["set-cookie"]) {
        //             getSetCookies(response.headers["set-cookie"])
        //                 .then((res) => {
        //                     dfd.resolve(body);
        //                 });
        //         } else {
        //             dfd.resolve(body);
        //         }
        //     });
        //
        //     return dfd.promise();
        // };
    };
    aibank.loadAshraiNewPrevRemoveSoon = async function () {
        const baseNewUrl = "https://" + all.banks.accounts.aibank.urlServices + "/ebanking/CreditCard/DisplayCreditCardActivityNew.aspx"
        let accounts, accIdx;
        let cards, cardIdx;
        let cycles, cycleIdx;

        const resp = await all.banks.core.services.httpReq(
            "https://" + all.banks.accounts.aibank.urlServices + "/ebanking/CreditCard/DisplayCreditCardActivity.aspx",
            'GET', null, false, false);
        const $resp = all.banks.core.services.parseHtml(resp);

        try {
            accounts = $resp.find("#ddlAccounts_m_ddl > option").map((idx, el) => {
                const _el = $(el);
                const accObj = {
                    content: _el.text(),
                    value: Number(_el.attr("value"))
                };

                [accObj.accountNum, accObj.branchNum] = aibank.getAcc(accObj.content);

                return accObj;
            });

            for (accIdx = 0; accIdx < accounts.length; accIdx++) {
                myEmitterLogs(33, accounts[accIdx].content);
                await processAshraiAccount();
            }

            all.banks.accounts.aibank.sendCardsCtrl($resp);

        } catch (ex) {
            console.log(ex);
            writeLog(ex);
            if (all.banks.accountDetails.IND_NILVIM > 0) {
                myEmitterLogs(21); //start loan
                all.banks.accounts.aibank.loadLoan();
            } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                myEmitterLogs(34);
                aibank.loadMatah();
            } else {
                all.banks.accounts.aibank.logOut($resp);
            }
        }

        async function processAshraiAccount() {
            const xmlData = await all.banks.core.services.httpReq(
                baseNewUrl + `?init=ajaxbm&index=${accounts[accIdx].value}&updateDdlCard=true&&_=${new Date().getTime()}`,
                'GET', null, false, false);
            cards = $(xmlData).find("ddlCards").children()
                .map((idx, el) => {
                    const _el = $(el);
                    return {
                        content: Base64Function.decode(_el.text()),
                        value: Number(Base64Function.decode(_el.attr("value")).replace(/[^\d-]/g, ""))
                    };
                })
                .get()
                .filter(val => val.value >= 0);

            for (cardIdx = 0; cardIdx < cards.length; cardIdx++) {
                await processCard();
            }
        }

        async function processCard() {
            const xmlData = await all.banks.core.services.httpReq(
                baseNewUrl + `?init=ajaxbm&index=${accounts[accIdx].value}&cardIndex=${cards[cardIdx].value}&updateDllMoreAction=true&&_=${new Date().getTime()}`,
                'GET', null, false, false);
            cycles = $(xmlData).find("ddlPeriod").children()
                .map((idx, el) => {
                    const _el = $(el);
                    return {
                        content: Base64Function.decode(_el.text()),
                        value: Number(Base64Function.decode(_el.attr("value")).replace(/[^\d-]/g, ""))
                    };
                })
                .get()
                .filter(val => val.value >= 0);

            for (cycleIdx = 0; cycleIdx < cycles.length; cycleIdx++) {
                myEmitterLogs(15, cards[cardIdx].content + ' period ' + cycles[cycleIdx].content);
                await processCardCycle();
            }
        }

        async function processCardCycle() {
            const commonPart = {
                "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                "TargetId": all.banks.accountDetails.bank.targetId,
                "Token": all.banks.accountDetails.bank.token,
                "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                "ExporterId": all.banks.spiderConfig.spiderId,
                "BranchNumber": accounts[accIdx].branchNum,
                "AccountNumber": accounts[accIdx].accountNum,
                //                "CardNumber": parseFloat(cards[cardIdx].content.replace(/\D/g, "")),
                //                "CardType": all.banks.core.services.getTypeCard(cards[cardIdx].content),
                "NextBillingDate": all.banks.core.services.convertDateAll(aibank.convertDateLocal(cycles[cycleIdx].content))
            };

            const xmlData = await all.banks.core.services.httpReq(
                baseNewUrl + `?init=ajaxbm&index=${accounts[accIdx].value}&cardIndex=${(cards[cardIdx].value)}&periodID=${(cycles[cycleIdx].value)}&&_=${new Date().getTime()}`,
                'GET', null, false, false);
            const summaryNode = $(xmlData).find("table:last footer");
            commonPart["CardNumber"] = parseFloat(Base64Function.decode(summaryNode.find("last4digitList").text()).split(";")[0]);

            $(xmlData).find("table").each((idx, el) => {
                const _el = $(el);
                const tblType = _el.attr("type");
                if (tblType.startsWith("CardDetailsTableRow")) {
                    // CardDetailsTableRow.... section should appear first. If it's not, move this part out and put before the loop.
                    if (!commonPart["CardType"]) {
                        _el.find("body row").each((idx, row) => {
                            const _row = $(row);
                            _row.children().each((idx, td) => {
                                const _td = $(td);
                                if (Base64Function.decode(_td.text()).includes("סוג הכרטיס")) {
                                    commonPart["CardType"] = all.banks.core.services.getTypeCard(
                                        Base64Function.decode(_td.next().text())
                                    );
                                    return false;
                                }
                            });

                            return !commonPart["CardType"];
                        });
                    }

                } else if (tblType === "TransactionsByDate") {
                    const nextTotal = Base64Function.decode(_el.find("footer td").eq(1).text()).replace(/[^\d.-]/g, "");
                    const tableTitle = Base64Function.decode(summaryNode.find("lbl" + _el.attr("tableID")).text());
                    const isLeYadiaBilvad = /לידיעה בלבד/gm.test(tableTitle);
                    const isLeYadia = /לידיעה/gm.test(tableTitle);

                    _el.find("body row").each((idx, row) => {
                        const _row = $(row);

                        const matchPymnts = /(\d{1,2})\s*(מ|מתוך)\s*-\s*(\d{1,2})/g.exec(Base64Function.decode(_row.find('td').eq(3).text()));
                        const valueDate = aibank.convertDateLocal(Base64Function.decode(_row.find('td').eq(0).text()).replace(/\s/g, ""));
                        const desc = /title\s*'(.+)';/g.exec(Base64Function.decode(_row.find('td').eq(1).attr("attr")));

                        all.banks.generalVariables.allDataArrAshrai.push(
                            Object.assign(Object.create(null),
                                commonPart, {
                                    "NextCycleTotal": nextTotal,
                                    "CardStatus": null,
                                    "TransDesc": desc !== null
                                        ? desc[1].split("#SPACE#").join(' ')
                                        : Base64Function.decode(_row.find('td').eq(1).text()),
                                    "TransTotal": Base64Function.decode(_row.find('td').eq(4).text()).replace(/[^\d.-]/g, ""),
                                    "ValueDate": valueDate
                                        ? all.banks.core.services.convertDateAll(valueDate)
                                        : all.banks.core.services.convertDateAll(commonPart.NextBillingDate),
                                    "TransCategory": null,
                                    "TotalPayments": matchPymnts !== null ? matchPymnts[3] : null,
                                    "CurrentPaymentNum": matchPymnts !== null ? matchPymnts[1] : null,
                                    "indFakeDate": 0,
                                    "currency_id": all.banks.core.services.getTypeCurrencyAll(
                                        Base64Function.decode(_row.find('td').eq(2).text()).replace(/\d,./g, "")),
                                    "original_total": Base64Function.decode(_row.find('td').eq(2).text()).replace(/[^\d.-]/g, ""),
                                    "ind_iskat_hul": 1,
                                    "comment": isLeYadiaBilvad ? 'לידיעה בלבד' : (isLeYadia ? 'לידיעה' : '')
                                }));
                    });

                } else if (tblType === "TransactionsByDateForeign") {
                    const nextTotal = Base64Function.decode(_el.find("footer td").eq(1).text()).replace(/[^\d.-]/g, "");
                    const tableTitle = Base64Function.decode(summaryNode.find("lbl" + _el.attr("tableID")).text());
                    const ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(tableTitle);
                    const isLeYadiaBilvad = /לידיעה בלבד/gm.test(tableTitle);
                    const isLeYadia = /לידיעה/gm.test(tableTitle);

                    _el.find("body row").each((idx, row) => {
                        const _row = $(row);

                        const valueDate = aibank.convertDateLocal(Base64Function.decode(_row.find('td').eq(0).text()).replace(/\s/g, ""));
                        const nextBillingDate = aibank.convertDateLocal(Base64Function.decode(_row.find('td').eq(4).text()).replace(/\s/g, ""));
                        const desc = /title\s*'(.+)';/g.exec(Base64Function.decode(_row.find('td').eq(1).attr("attr")));

                        all.banks.generalVariables.allDataArrAshrai.push(
                            Object.assign(Object.create(null),
                                commonPart, {
                                    "NextBillingDate": nextBillingDate
                                        ? all.banks.core.services.convertDateAll(nextBillingDate)
                                        : all.banks.core.services.convertDateAll(commonPart.NextBillingDate),
                                    "NextCycleTotal": nextTotal,
                                    "CardStatus": null,
                                    "TransDesc": desc !== null
                                        ? desc[1].split("#SPACE#").join(' ')
                                        : Base64Function.decode(_row.find('td').eq(1).text()),
                                    "TransTotal": Base64Function.decode(_row.find('td').eq(5).text()).replace(/[^\d.-]/g, ""),
                                    "ValueDate": valueDate
                                        ? all.banks.core.services.convertDateAll(valueDate)
                                        : all.banks.core.services.convertDateAll(commonPart.NextBillingDate),
                                    "TransCategory": null,
                                    "TotalPayments": null,
                                    "CurrentPaymentNum": null,
                                    "indFakeDate": 0,
                                    "currency_id": all.banks.core.services.getTypeCurrencyAll(
                                        Base64Function.decode(_row.find('td').eq(2).text()).replace(/\d,./g, "")),
                                    "original_total": Base64Function.decode(_row.find('td').eq(3).text()).replace(/[^\d.-]/g, ""),
                                    "ind_iskat_hul": ind_iskat_hul,
                                    "comment": isLeYadiaBilvad ? 'לידיעה בלבד' : (isLeYadia ? 'לידיעה' : '')
                                })
                        );
                    });
                }
            });
        }
    };
    aibank.synchronizeCookieSets = function () {
        var dfd = jQuery.Deferred();
        win.cookies.getAll({}, function (cool) {
            all.banks.accounts.aibank.cookies = cool
                .map(ck => {
                    return ck.name + "=" + (ck.name === "NisDateSort" ? "0" : ck.value);
                })
                .join(";");
            dfd.resolve();
        });
        return dfd.promise();
    };
    aibank.timesToTry = 0;
    aibank.loadOshNew = async function () {
        aibank.timesToTry += 1;
        await aibank.synchronizeCookieSets();

        let resp = await all.banks.core.services.httpReq(
            "https://" + all.banks.accounts.aibank.urlServices + "/ebanking/SO/SPA.aspx",
            'GET', null, false, false);

        try {
            const sessionIDMatcher = /\\\"SessionID\\\"\s*\:\s*\\\"([a-fA-F0-9]{32})\\\"/gm.exec(resp);
            if (sessionIDMatcher === null) {
                if (aibank.timesToTry < 4) {
                    aibank.loadOshNew()
                } else {
                    myEmitterLogs(9, "err load Osh New");
                }
                return;
            }

            const sessionID = sessionIDMatcher[1];
            const allAccounts = await all.banks.core.services.httpReq('https://' + all.banks.accounts.aibank.urlServices
                + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_GetCreditCardsInfo', 'POST', {
                moduleName: "UC_SO_GetAccounts",
                reqObj: JSON.stringify({
                    "SessionHeader": {"SessionID": sessionID, "FIID": aibank.site_name},
                    "ComboMethod": true,
                    "StateName": "businessaccounttrx",
                    "ModuleName": "UC_SO_GetAccounts",
                    "RequestedAccountTypes": "CHECKING",
                    "ExtAccountPermissions": "General",
                    "AccountSegments": ""
                }),
                version: "V4.0"
            }, false, false);
            const jsonRespAllAccounts = JSON.parse(allAccounts.jsonResp);

            if (!Array.isArray(jsonRespAllAccounts.AccountsItems) || !jsonRespAllAccounts.AccountsItems.length) {
                all.banks.accounts.aibank.sendOshCtrl(all.banks.core.services.parseHtml(resp));
                return false;
            }

            all.banks.generalVariables.allDataArr = {
                "ExporterId": all.banks.spiderConfig.spiderId,
                "BankData": [
                    {
                        "TargetId": all.banks.accountDetails.bank.targetId,
                        "Token": all.banks.accountDetails.bank.token,
                        "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + ''
                            + ("0" + (new Date().getDate())).slice(-2) + ''
                            + ("0" + (new Date().getHours())).slice(-2) + ''
                            + ("0" + (new Date().getMinutes())).slice(-2),
                        "Account": []
                    }
                ]
            };

            all.banks.generalVariables.numChecksDrawn = 0;
            all.banks.generalVariables.numChecksNotWithdrawn = 0;
            if (all.banks.accountDetails.deleted_account_ids.length) {
                jsonRespAllAccounts.AccountsItems = jsonRespAllAccounts.AccountsItems.filter(item => !(all.banks.accountDetails.deleted_account_ids.some(it => (/^(\d+)-([\d/]+)$/g.exec(item.MaskedNumber)[2].replace('/', '')).includes(it.toString()))))
            }
            let accountItemIndex, account;
            for (let accountIdx = 0; accountIdx < jsonRespAllAccounts.AccountsItems.length; accountIdx++) {
                const branchAccMatch = /^(\d+)-([\d/]+)$/g.exec(jsonRespAllAccounts.AccountsItems[accountIdx].MaskedNumber/*.MaskedClientNumber*/);
                account = {
                    'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                    'AccountNumber': branchAccMatch[2].replace('/', ''),
                    'BranchNumber': branchAccMatch[1],
                    'Balance': null,
                    'AccountCredit': null,
                    'DataRow': []
                };

                all.banks.generalVariables.allDataArr.BankData[0].Account.push(account);

                myEmitterLogs(10, account.AccountNumber);

                accountItemIndex = jsonRespAllAccounts.AccountsItems[accountIdx].AccountIndex;

                await processAccount();

                myEmitterLogs(12, account.DataRow.length);
            }

            myEmitterLogs(29);

            all.banks.accounts.aibank.sendOshCtrl(all.banks.core.services.parseHtml(resp));
            return true;

            function dateFromUTCString(utcStr) {
                let dt = new Date(utcStr);
                if (isNaN(dt)) {
                    const ddmmyyMatch = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/.exec(utcStr);
                    if (ddmmyyMatch !== null) {
                        dt = new Date((ddmmyyMatch[3].length > 2 ? 0 : 2000) + parseInt(ddmmyyMatch[3]),
                            parseInt(ddmmyyMatch[2]) - 1,
                            parseInt(ddmmyyMatch[1]));
                    }
                }
                return dt;
            }

            async function processAccount() {
                const accountTransactionsResp = await all.banks.core.services.httpReq('https://' + all.banks.accounts.aibank.urlServices
                    + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_27_GetBusinessAccountTrx', 'POST', {
                    moduleName: "UC_SO_27_GetBusinessAccountTrx",
                    reqObj: JSON.stringify({
                        "SessionHeader": {"SessionID": sessionID, "FIID": aibank.site_name},
                        "StateName": "BusinessAccountTrx",
                        "ModuleName": "UC_SO_27_GetBusinessAccountTrx",
                        "AccountIndex": accountItemIndex,
                        "RequestType": "",
                        "FromDateUTC": all.banks.accountDetails.dateFrom.toUTCString(),
                        "ToDateUTC": all.banks.accountDetails.dateTo.toUTCString(),
                        "OperationsNumber": "9999999999",
                        "TrxType": "1",
                        "Amount": 0,
                        "AmountType1": 0,
                        "AmountType2": 0,
                        "ReferenceNumber": 0,
                        "BeneficiaryName": 0,
                        "BeneficiaryBankCode": 0,
                        "BeneficiaryBranch": 0,
                        "BeneficiaryAccountNumber": 0,
                        "InvoiceNumber": 0,
                        "PeriodType": "3"
                    }),
                    version: "V4.0"
                }, false, false);
                const jsonAccountTransactions = JSON.parse(accountTransactionsResp.jsonResp);

                account['Balance'] = jsonAccountTransactions.BalanceDisplay;
                account['AccountCredit'] = jsonAccountTransactions.TotalCredit;

                if (Array.isArray(jsonAccountTransactions.HistoryTransactionsItems)) {
                    const performReverse = Array.isArray(jsonAccountTransactions.UserPreferenceItems)
                        && jsonAccountTransactions.UserPreferenceItems.length
                        && jsonAccountTransactions.UserPreferenceItems[0].TrxSortOrder === true;

                    if (jsonAccountTransactions.TodayFlag === true && jsonAccountTransactions.HistoryTransactionsItems.length) {
                        account['Balance'] = performReverse
                            ? jsonAccountTransactions.HistoryTransactionsItems[0].RunningBalance
                            : jsonAccountTransactions.HistoryTransactionsItems[jsonAccountTransactions.HistoryTransactionsItems.length - 1].RunningBalance;
                    }
                    for (const tr of (performReverse ? jsonAccountTransactions.HistoryTransactionsItems.reverse()
                        : jsonAccountTransactions.HistoryTransactionsItems)) {
                        account.DataRow.push(Object.assign(await processTransaction(tr), {
                            "IsDaily": "0"
                        }));
                    }
                }
                if (Array.isArray(jsonAccountTransactions.TodayTransactionsItems)) {
                    for (const tr of jsonAccountTransactions.TodayTransactionsItems) {
                        account.DataRow.push(Object.assign(await processTransaction(tr), {
                            "IsDaily": "1"
                        }));
                    }
                }

                return true;

                async function processTransaction(trx) {
                    return {
                        "Asmachta": trx.ReferenceNumberLong,
                        "TransDesc": trx.Description,
                        "ValueDate": all.banks.core.services.convertDateAll(trx.DateUTC), // trx.EffectiveDateUTC,
                        "TransactionType": trx.TransactionSign === true ? 1 : 0,
                        "TransTotal": trx.TransactionSign === true ? trx.Credit : trx.Debit, // trx.Amount,
                        "Balance": trx.RunningBalance,
                        "imgs": all.banks.accountDetails.checks ? await fetchCheckDataIfPresent(trx) : null,
                        "DepositeTransferData": await fetchDepositeTransferData(trx)
                    };
                }

                async function fetchCheckDataIfPresent(trx) {
                    let result;
                    try {
                        switch (trx.IfLinkInt) {
                            case 125: {
                                const checkDataResp = await all.banks.core.services.httpReq('https://' + all.banks.accounts.aibank.urlServices
                                    + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_021_GetWithdrawnCheckData', 'POST', {
                                    moduleName: "UC_SO_021_GetWithdrawnCheckData",
                                    reqObj: JSON.stringify({
                                        "SessionHeader": {"SessionID": sessionID, "FIID": aibank.site_name},
                                        "StateName": "businessaccounttrx",
                                        "ModuleName": "UC_SO_021_GetWithdrawnCheckData",
                                        "AccountIndex": accountItemIndex,
                                        "StartDateUTC": trx.DateUTC,
                                        "EndDateUTC": trx.DateUTC,
                                        "AmountFrom": trx.Debit,
                                        "AmountTo": trx.Debit,
                                        "SegmentationFlagInt": trx.SegmentationFlagInt,
                                        "ReferenceNumberLong": trx.ReferenceNumberLong
                                    }),
                                    version: "V4.0"
                                }, false, false);
                                const jsonCheckDataResp = JSON.parse(checkDataResp.jsonResp);
                                const depositeDate = dateFromUTCString(jsonCheckDataResp.OfficialBusinessDayUTC);
                                result = [{
                                    "Asmachta": trx.ReferenceNumberLong,
                                    "DepositeDate": all.banks.core.services.convertDateAll(depositeDate),
                                    "CheckNumber": jsonCheckDataResp.WithdrawnCheckNumber,
                                    "CheckTotal": jsonCheckDataResp.CheckAmount,
                                    "CheckBankNumber": account.BankNumber,
                                    "CheckBranchNumber": account.BranchNumber,
                                    "CheckAccountNumber": account.AccountNumber,
                                    "ImageNameKey": !!jsonCheckDataResp.CheckImageFront
                                        ? await mergeAndUploadImages(jsonCheckDataResp.CheckImageFront, jsonCheckDataResp.CheckImageBack,
                                            account.BankNumber + '' + account.BranchNumber + '' + account.AccountNumber
                                            + jsonCheckDataResp.WithdrawnCheckNumber + ''
                                            + depositeDate.getFullYear() + ("0" + (depositeDate.getMonth() + 1)).slice(-2) + ("0" + depositeDate.getDate()).slice(-2)
                                            + '_' + account.BankNumber + '' + account.BranchNumber + '' + account.AccountNumber, account.BankNumber, account.BranchNumber, account.AccountNumber)
                                        : "x"
                                }];
                                break;
                            }
                            case 117:
                            case 22464:
                            case 56470:
                            case 55509:
                            case 56615:
                            case 22928: {
                                const checkDataResp = await all.banks.core.services.httpReq('https://' + all.banks.accounts.aibank.urlServices
                                    + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_021_GetDepositCheckData', 'POST', {
                                    moduleName: "UC_SO_021_GetDepositCheckData",
                                    reqObj: JSON.stringify({
                                        "SessionHeader": {"SessionID": sessionID, "FIID": aibank.site_name},
                                        "StateName": "BusinessAccountTrx",
                                        "ModuleName": "DepositCheque",
                                        "AccountIndex": accountItemIndex,
                                        "StartDateUTC": trx.DateUTC,
                                        "EndDateUTC": trx.DateUTC,
                                        "AmountFrom": 0, // trx.Credit,
                                        "AmountTo": trx.Credit,
                                        "SegmentationFlagInt": trx.SegmentationFlagInt,
                                        "ReferenceNumberLong": trx.ReferenceNumberLong
                                    }),
                                    version: "V4.0"
                                }, false, false);
                                const jsonCheckDataResp = JSON.parse(checkDataResp.jsonResp);
                                if (!Array.isArray(jsonCheckDataResp.DepositCheckItems)) {
                                    result = null;
                                } else {
                                    result = [];
                                    if (jsonCheckDataResp.DepositCheckItems.length && jsonCheckDataResp.DepositCheckItems[0] !== null) {
                                        for (const chk of jsonCheckDataResp.DepositCheckItems) {
                                            const depositeDate = dateFromUTCString(chk.OfficialBusinessDayUTC);
                                            let checkBankNumber = null, checkBranchNumber = null,
                                                checkAccountNumber = null;
                                            const chkBBAMatch = /^(\d{1,2})-(\d{1,3})-(\d{4,})$/.exec(chk.CheckFullAccount);
                                            if (chkBBAMatch) {
                                                checkBankNumber = chkBBAMatch[1];
                                                checkBranchNumber = chkBBAMatch[2];
                                                checkAccountNumber = chkBBAMatch[3];
                                            } else {
                                                const chkBBAMatchLess = chk.CheckFullAccount.split('-');
                                                checkBankNumber = chkBBAMatchLess[0];
                                                checkBranchNumber = chkBBAMatchLess[1];
                                                checkAccountNumber = chkBBAMatchLess[2];
                                            }

                                            if (!chk.CheckImageFront && chk.ChequeUniqueId) {
                                                try {
                                                    const checkImageResp = await all.banks.core.services.httpReq('https://' + all.banks.accounts.aibank.urlServices
                                                        + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_021_GetDepositCheckImages', 'POST', {
                                                        moduleName: "UC_SO_021_GetDepositCheckImages",
                                                        reqObj: JSON.stringify({
                                                            "SessionHeader": {
                                                                "SessionID": sessionID,
                                                                "FIID": aibank.site_name
                                                            },
                                                            "StateName": "businessaccounttrx",
                                                            "ModuleName": "ChequeImage",
                                                            "ChequeUniqueId": chk.ChequeUniqueId
                                                        }),
                                                        version: "V4.0"
                                                    }, false, false);
                                                    const jsonCheckImageResp = JSON.parse(checkImageResp.jsonResp);
                                                    chk.CheckImageFront = jsonCheckImageResp.CheckImageFront;
                                                    chk.CheckImageBack = jsonCheckImageResp.CheckImageBack;
                                                } catch (e) {
                                                    writeLog('Failed to get check image for UC_SO_021_GetDepositCheckImages: '
                                                        + JSON.stringify(chk)
                                                        + ':\n' + e);
                                                }
                                            }

                                            result.push(
                                                Object.assign({
                                                    "Asmachta": chk.ReferenceNumberLong,
                                                    "DepositeDate": all.banks.core.services.convertDateAll(depositeDate),
                                                    "CheckNumber": chk.CheckNumberLong,
                                                    "CheckBankNumber": checkBankNumber,
                                                    "CheckBranchNumber": checkBranchNumber,
                                                    "CheckAccountNumber": checkAccountNumber,
                                                    "CheckTotal": chk.CheckAmount,
                                                    "ImageNameKey": !!chk.CheckImageFront
                                                        ? await mergeAndUploadImages(chk.CheckImageFront, chk.CheckImageBack,
                                                            ((checkBankNumber && checkBranchNumber && checkAccountNumber)
                                                                ? parseInt(checkBankNumber) + '' + parseInt(checkBranchNumber) + '' + parseInt(checkAccountNumber) + ''
                                                                : '')
                                                            + chk.CheckNumberLong + ''
                                                            + depositeDate.getFullYear() + ("0" + (depositeDate.getMonth() + 1)).slice(-2) + ("0" + depositeDate.getDate()).slice(-2)
                                                            + '_' + account.BankNumber + '' + account.BranchNumber + '' + account.AccountNumber, checkBankNumber, checkBranchNumber, checkAccountNumber)
                                                        : "x"
                                                })
                                            );
                                        }
                                    }
                                }

                                break;
                            }
                            case 1864:
                            case 8386: {
                                const checkDataResp = await all.banks.core.services.httpReq('https://' + all.banks.accounts.aibank.urlServices
                                    + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_2003_08_GetReturnedChecksList', 'POST', {
                                    moduleName: "UC_SO_2003_08_GetReturnedChecksList",
                                    reqObj: JSON.stringify({
                                        "SessionHeader": {"SessionID": sessionID, "FIID": aibank.site_name},
                                        "StateName": "businessaccounttrx",
                                        "ModuleName": "UC_SO_2003_08_GetReturnedChecksList",
                                        "AccountIndex": accountItemIndex,
                                        "ComboMethod": true,
                                        "StartDateUTC": (trx.IfLinkInt === 1864) ? trx.DateUTC : trx.EffectiveDateUTC,
                                        "EndDateUTC": trx.DateUTC,
                                        "AmountFrom": trx.TransactionSign === true ? trx.Credit : trx.Debit,
                                        "AmountTo": trx.TransactionSign === true ? trx.Credit : trx.Debit,
                                        "CheckTypeCode": (trx.IfLinkInt === 1864) ? trx.TypeInt : "1",
                                        "ReferenceNumberLong": 1,
                                        "PartialSerialNumberLong": (trx.IfLinkInt === 1864) ? trx.ReferenceNumberLong : trx.ReferenceNumberLong.toString().slice(-3)
                                    }),
                                    version: "V4.0"
                                }, false, false);
                                const jsonCheckDataResp = JSON.parse(checkDataResp.jsonResp);
                                const listToTraverse = [
                                    ...(Array.isArray(jsonCheckDataResp.ReturnedDepositChecksItems)
                                        ? jsonCheckDataResp.ReturnedDepositChecksItems.filter(it => !!it) : []),
                                    ...(Array.isArray(jsonCheckDataResp.ReturnedWithdrawChecksItems)
                                        ? jsonCheckDataResp.ReturnedWithdrawChecksItems.filter(it => !!it) : [])
                                ];
                                if (!Array.isArray(listToTraverse) && !listToTraverse.length) {
                                    result = null;
                                } else {
                                    result = [];
                                    if (jsonCheckDataResp.ReturnedDepositChecksItems.length && jsonCheckDataResp.ReturnedDepositChecksItems[0] !== null) {
                                        for (const chk of jsonCheckDataResp.ReturnedDepositChecksItems) {
                                            let depositeDate = dateFromUTCString(chk.OfficialBusinessDayUTC);
                                            let checkBankNumber = null, checkBranchNumber = null,
                                                checkAccountNumber = null;
                                            const chkBBAMatch = /^(\d{1,2})-(\d{1,3})-(\d{4,})$/.exec(chk.CheckFullAccount);
                                            if (chkBBAMatch) {
                                                checkBankNumber = chkBBAMatch[1];
                                                checkBranchNumber = chkBBAMatch[2];
                                                checkAccountNumber = chkBBAMatch[3];
                                            } else {
                                                checkBankNumber = account.BankNumber;
                                                checkBranchNumber = account.BranchNumber;
                                                checkAccountNumber = account.AccountNumber;
                                            }

                                            result.push(
                                                Object.assign({
                                                    "Asmachta": chk.ReferenceNumberLong,
                                                    "DepositeDate": all.banks.core.services.convertDateAll(depositeDate),
                                                    "CheckNumber": chk.CheckNumberString,
                                                    "CheckBankNumber": checkBankNumber,
                                                    "CheckBranchNumber": checkBranchNumber,
                                                    "CheckAccountNumber": checkAccountNumber,
                                                    "CheckTotal": chk.CheckAmount,
                                                    "ImageNameKey": !!chk.CheckImageFront
                                                        ? await mergeAndUploadImages(chk.CheckImageFront, chk.CheckImageBack,
                                                            ((checkBankNumber && checkBranchNumber && checkAccountNumber)
                                                                ? parseInt(checkBankNumber) + '' + parseInt(checkBranchNumber) + '' + parseInt(checkAccountNumber) + ''
                                                                : '')
                                                            + chk.CheckNumberString + ''
                                                            + depositeDate.getFullYear() + ("0" + (depositeDate.getMonth() + 1)).slice(-2) + ("0" + depositeDate.getDate()).slice(-2)
                                                            + '_' + account.BankNumber + '' + account.BranchNumber + '' + account.AccountNumber, checkBankNumber, checkBranchNumber, checkAccountNumber)
                                                        : "x"
                                                })
                                            );
                                        }
                                    }
                                    if (jsonCheckDataResp.ReturnedWithdrawChecksItems.length && jsonCheckDataResp.ReturnedWithdrawChecksItems[0] !== null) {
                                        for (const chk of jsonCheckDataResp.ReturnedWithdrawChecksItems) {
                                            let depositeDate = dateFromUTCString(chk.OfficialBusinessDayUTC);
                                            let checkBankNumber = null, checkBranchNumber = null,
                                                checkAccountNumber = null;
                                            const chkBBAMatch = /^(\d{1,2})-(\d{1,3})-(\d{4,})$/.exec(chk.CheckFullAccount);
                                            if (chkBBAMatch) {
                                                checkBankNumber = chkBBAMatch[1];
                                                checkBranchNumber = chkBBAMatch[2];
                                                checkAccountNumber = chkBBAMatch[3];
                                            } else {
                                                checkBankNumber = account.BankNumber;
                                                checkBranchNumber = account.BranchNumber;
                                                checkAccountNumber = account.AccountNumber;
                                            }

                                            result.push(
                                                Object.assign({
                                                    "Asmachta": chk.ReferenceNumberLong,
                                                    "DepositeDate": all.banks.core.services.convertDateAll(depositeDate),
                                                    "CheckNumber": chk.CheckNumberString,
                                                    "CheckBankNumber": checkBankNumber,
                                                    "CheckBranchNumber": checkBranchNumber,
                                                    "CheckAccountNumber": checkAccountNumber,
                                                    "CheckTotal": chk.CheckAmount,
                                                    "ImageNameKey": !!chk.CheckImageFront
                                                        ? await mergeAndUploadImages(chk.CheckImageFront, chk.CheckImageBack,
                                                            ((checkBankNumber && checkBranchNumber && checkAccountNumber)
                                                                ? parseInt(checkBankNumber) + '' + parseInt(checkBranchNumber) + '' + parseInt(checkAccountNumber) + ''
                                                                : '')
                                                            + chk.CheckNumberString + ''
                                                            + depositeDate.getFullYear() + ("0" + (depositeDate.getMonth() + 1)).slice(-2) + ("0" + depositeDate.getDate()).slice(-2)
                                                            + '_' + account.BankNumber + '' + account.BranchNumber + '' + account.AccountNumber, checkBankNumber, checkBranchNumber, checkAccountNumber)
                                                        : "x"
                                                })
                                            );
                                        }
                                    }
                                }

                                break;
                            }
                            default:
                                result = null;
                                break;
                        }

                    } catch (e) {
                        writeLog('Failed to get check data for ' + JSON.stringify(trx)
                            + ':\n' + e);
                    }

                    return result;

                    async function mergeAndUploadImages(checkImageFront, checkImageBack, key, checkBankNumber, checkBranchNumber, checkAccountNumber) {
                        if (!checkImageFront) {
                            return "x";
                        }
                        let [imgFront, imgBack] = await Promise.all([
                            new Promise(resolve => {
                                const img = new Image();
                                img.src = 'data:image/jpeg;base64,' + checkImageFront;
                                img.onload = () => resolve(img);
                            }),
                            new Promise(resolve => {
                                if (!checkImageBack) {
                                    resolve(null);
                                } else {
                                    const img = new Image();
                                    img.src = 'data:image/jpeg;base64,' + checkImageBack;
                                    img.onload = () => resolve(img);
                                }
                            })]);
                        const canvas = document.createElement("canvas"), ctx = canvas.getContext("2d");
                        canvas.width = Math.max(imgFront.width, (imgBack !== null ? imgBack.width : 0));
                        canvas.height = imgFront.height + (imgBack !== null ? imgBack.height : 0);
                        ctx.drawImage(imgFront, 0, 0);
                        if (imgBack !== null) {
                            ctx.drawImage(imgBack, 0, imgFront.height);
                        }

                        const formData = new FormData();
                        const blob = new Blob(
                            [canvas.toDataURL("image/jpeg", aibank.imageScale)
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
                                        bankId: account.BankNumber,
                                        snifId: account.BranchNumber,
                                        accountId: account.AccountNumber
                                    }
                                });
                                all.banks.generalVariables.numChecksDrawn++;
                                return key;
                            } catch (error) {
                                if (error !== 'discard') {
                                    all.banks.generalVariables.numChecksNotWithdrawn++;
                                    return "x";
                                }
                            }
                        } while (true);
                    }
                }

                async function fetchDepositeTransferData(trx) {
                    if (trx.AdditionalActivityTypeInt === 11 && trx.ExtensionTypeCode === 7) {
                        const multiTransferDataResp = await all.banks.core.services.httpReq('https://' + all.banks.accounts.aibank.urlServices
                            + '/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_024_GetMultiTransferData', 'POST', {
                            moduleName: "UC_SO_024_GetMultiTransferData",
                            reqObj: JSON.stringify({
                                "SessionHeader": {"SessionID": sessionID, "FIID": aibank.site_name},
                                "StateName": "BusinessAccountTrx",
                                "ModuleName": "UC_SO_024_GetMultiTransferData",
                                "AccountIndex": accountItemIndex,
                                "FITID": trx.FITID,
                                "TransactionID": 0,
                                "SegmentationFlag": String(trx.SegmentationFlagInt),
                                "Type": "0" + trx.TypeInt,
                                "ActionType": "1",
                                "EffectiveDateString": "00000000"
                            }),
                            version: "V4.0"
                        }, false, false);
                        const jsonMultiTransferDataResp = JSON.parse(multiTransferDataResp.jsonResp);

                        const transferDescreptionItems = jsonMultiTransferDataResp.TransferDescreptionItems;
                        if (transferDescreptionItems) {
                            return transferDescreptionItems.map((it) => {
                                return {
                                    "DepositeTransferDate": all.banks.core.services.convertDateAll(trx.EffectiveDateUTC),
                                    "BankTransferNumber": it.DescriptionToBankNumber ? Number(it.DescriptionToBankNumber) : null,
                                    "BranchTransferNumber": it.DescriptionToBranchNumber ? Number(it.DescriptionToBranchNumber) : null,
                                    "AccountTransferNumber": it.CreditAccountNum ? Number(it.CreditAccountNum) : null,
                                    "NamePayerTransfer": it.DescriptionOppositeName,
                                    "DetailsTransfer": it.DescriptionTransferComment,
                                    "TransferTotal": it.Amount
                                }
                            })
                        } else {
                            return null;
                        }
                    }


                    if (!trx.AdditionalDescriptionIdentifier || trx.IfLinkInt === 8386) {
                        return null;
                    }

                    const transferBBCMatch = /^העברה (מ|מאת|אל):(.+)\s(\d{1,3})-(\d{1,3})-(\d{1,})(.*)$/g.exec(trx.AdditionalData);
                    if (transferBBCMatch !== null) {
                        return [{
                            "DepositeTransferDate": trx.EffectiveDateUTC,
                            "BankTransferNumber": transferBBCMatch[3],
                            "BranchTransferNumber": transferBBCMatch[4],
                            "AccountTransferNumber": transferBBCMatch[5],
                            "NamePayerTransfer": transferBBCMatch[2],
                            "DetailsTransfer": transferBBCMatch[6],
                            "TransferTotal": trx.Amount
                        }];
                    }

                    const transferIBANILMatch = /^העברה (מ|מאת|אל):(.+)IBAN.+IL(\d{2})(\d{3})(\d{3})(\d{13})(.*)$/g.exec(trx.AdditionalData);
                    if (transferIBANILMatch !== null) {
                        return [{
                            "DepositeTransferDate": trx.EffectiveDateUTC,
                            "BankTransferNumber": transferIBANILMatch[4],
                            "BranchTransferNumber": transferIBANILMatch[5],
                            "AccountTransferNumber": transferIBANILMatch[6],
                            "NamePayerTransfer": transferIBANILMatch[2],
                            "DetailsTransfer": transferIBANILMatch[7],
                            "TransferTotal": trx.Amount
                        }];
                    }

                    if (trx.AdditionalData && trx.AdditionalData.trim()) {
                        return [{
                            "DepositeTransferDate": trx.EffectiveDateUTC,
                            "BankTransferNumber": null,
                            "BranchTransferNumber": null,
                            "AccountTransferNumber": null,
                            "NamePayerTransfer": null,
                            "DetailsTransfer": trx.AdditionalData,
                            "TransferTotal": trx.Amount
                        }];
                    }

                    return null;
                }
            }
        } catch (e) {

        }

    };
    return aibank;
}();

