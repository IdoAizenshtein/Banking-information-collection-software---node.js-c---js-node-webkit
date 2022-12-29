all.banks.accounts.discountAsakim = function () {
	var discountAsakim = {};
	discountAsakim.login = async function () {
		discountAsakim.account = [];
		discountAsakim.comboCard = [];
		discountAsakim.countCard = 0;
		discountAsakim.comboCardPrevMonth = [];
		discountAsakim.countCardPrevMonth = 0;
		discountAsakim.accPrevCount = 0;
		discountAsakim.accountNow = 0;
		discountAsakim.govaina = false;
		discountAsakim.nikaion = false;
		discountAsakim.bitahon = false;
		if (parseFloat(all.banks.accountDetails.bank.BankNumber) == 58) {
			all.banks.accounts.discountAsakim.typeBank = 'd';
		}
		if (parseFloat(all.banks.accountDetails.bank.BankNumber) == 57) {
			all.banks.accounts.discountAsakim.typeBank = 'm';
		}

		await all.banks.core.services.httpReq('https://start.telebank.co.il/LoginPages/Logon?multilang=he&t=O&pagekey=Home&bank=' + all.banks.accounts.discountAsakim.typeBank, 'GET', null, false, false);
		let response = await all.banks.core.services.httpReq('https://start.telebank.co.il/LoginPages/Logon?multilang=he&t=O&pagekey=Home&bank=' + all.banks.accounts.discountAsakim.typeBank, 'GET', null, false, false);
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
						}
						else
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
				if (parseFloat(all.banks.accountDetails.bank.BankNumber) == 58) {
					bankNum = "0"
				}
				else if (parseFloat(all.banks.accountDetails.bank.BankNumber) == 57) {
					bankNum = "1"
				}
				else {
					bankNum = "0";
				}

				if (tzIdVal.length == 10 && tzIdVal.substr(0, 1) == 9)
					return "000" + bankNum + tzIdVal;
				else
					return "000" + bankNum + 1 + AddLeadingZerows(tzIdVal, 9);
			}

			var tzId = dataRes.find("input#tzId").val();
			var custid = all.banks.accountDetails.bank.username;
			var tzPassword = all.banks.accountDetails.bank.password;
			var otpnumVal = dataRes.find("input#otpnum").val();
			var aidnumVal = all.banks.accountDetails.bank.autoCode;
			var username = dataRes.find("input[name='username']").val();
			var aidtype = dataRes.find("input[name='aidtype']").val();
			var aidvalue = dataRes.find("input[name='aidvalue']").val();

			var prefix300 = '300';
			var FormName = false;

			try {
				if (tzId !== undefined) {
					var username1 = (tzId + "").trim();
					tzId = username1;
					username1 = username1.replace(/^0+/, "");
				}
				else {
					var username1 = "";
				}
			} catch (e) {
				var username1 = "";
			}

			try {
				if (custid !== undefined) {
					var username2 = (custid + "").trim();
					custid = username2;
				}
				else {
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
				}
				else {
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
				}
				else {
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
				url: "https://start.telebank.co.il/LoginPages/gatewayAPI/verification/getPk",
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
						if (otpnum != null) {
							aidvalue = otpnum;
							var requestTimeOut = 50000;
						} else {
							aidvalue = forge.util.encode64(k.encrypt(aidnum));
							var requestTimeOut = 30000;
						}
						sendAuth(requestTimeOut);
					} catch (e) {
						myEmitterLogs(5);
					}
				},
				error: function (error) {
					myEmitterLogs(5);
				}
			});

			function sendAuth(requestTimeOut) {
				var custIdGen = username;
				var mi6MD5 = digestsEncoding.MD5(custIdGen, digestsEncoding.outputTypes.Hex);
				var mi6Cookie = 'mi6=' + mi6MD5 + '; path=/';
				document.cookie = mi6Cookie;
				if (!requestTimeOut) {
					requestTimeOut = 30000;
				}
				var data = {
					username: custIdGen,
					password: all.banks.accountDetails.bank.password,
					aidtype: aidtype,
					aidvalue: aidvalue
				}
				all.banks.core.services.httpReq("https://start.telebank.co.il/LoginPages/Logon", 'POST', data, true, false)
				.then(function (data) {
					var data = all.banks.core.services.parseHtml(data);
					if (data.find(".msghdr_green").length && data.find(".msghdr_green").text().indexOf('בהצלחה') !== -1) {
						all.banks.accounts.discountAsakim.loadData();
					}
					else if (data.find(".msghdr_red").length && data.find(".msghdr_red").text().indexOf('נכשל') !== -1) {
						myEmitterLogs(5);
					}
					else {
						myEmitterLogs(8);
					}
				})
				.fail(function (error, resErr, urlParam) {
					var logErr = "restUrl: " + urlParam + ", status: " + error.status;
					all.banks.core.services.errorLog(logErr)
				});
			}
		}
	}
	discountAsakim.calcMonth = function () {
		discountAsakim.comboCardPrevMonth = [];
		for (var i = 0; i < all.banks.accountDetails.ccardMonth; i++) {
			var dateMonth = new Date(new Date().getFullYear(), new Date().getMonth() - i, 1);
			discountAsakim.comboCardPrevMonth.push(("0" + (dateMonth.getMonth() + 1)).slice(-2) + '/' + dateMonth.getFullYear().toString())
		}
	}
	discountAsakim.sendOshCtrl = function (matah) {
		if (!matah) {
			var arr = all.banks.generalVariables.allDataArr;
		}
		else {
			var arr = all.banks.generalVariables.allDataArrMatah;
			all.banks.accountDetails.MATAH_DAY_TO_RUN = -1;
		}
		all.banks.core.services.sendOsh(arr, matah)
		.then(function (arr) {
			if (!matah) {
				if (all.banks.accountDetails.ccardMonth > 0) {
					all.banks.accounts.discountAsakim.accountNow = 0;
					myEmitterLogs(14);
					discountAsakim.changeAllAcc("card");
				}
				else if (all.banks.accountDetails.IND_NILVIM > 0) {
					all.banks.accounts.discountAsakim.accountNow = 0;
					myEmitterLogs(21);
					discountAsakim.changeAllAcc("loan", true);
				}
				else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
					all.banks.accountDetails.MATAH_DAY_TO_RUN = -1;
					all.banks.accountDetails.IND_NILVIM = -1;
					all.banks.accounts.discountAsakim.accountNow = 0;
					myEmitterLogs(34);
					discountAsakim.changeAllAcc('matah');
				}
				else {
					all.banks.accounts.discountAsakim.logOut();
				}
			}
			else {
				all.banks.accounts.discountAsakim.logOut();
			}
		})
		.fail(function (error, resErr) {
			if (error == 'discard') {
				all.banks.accounts.discountAsakim.sendOshCtrl(arr, matah);
			}
		})
	}
	discountAsakim.sendChecksCtrl = function (formData) {
		var dfd = jQuery.Deferred();
		all.banks.core.services.sendChecks(formData)
		.then(function (arr) {
			all.banks.generalVariables.numChecksDrawn = all.banks.generalVariables.numChecksDrawn + 1;
			if (arr == "error") {
				dfd.resolve("error");
			}
			else {
				dfd.resolve(arr);
			}
		})
		.fail(function (error, resErr) {
			dfd.reject('discard');
		})
		return dfd.promise();
	}
	discountAsakim.sendCardsCtrl = function () {
		all.banks.core.services.sendCards(all.banks.generalVariables.allDataArrAshrai)
		.then(function (arr) {
			if (all.banks.accountDetails.IND_NILVIM > 0) {
				all.banks.accounts.discountAsakim.accountNow = 0;
				myEmitterLogs(21);
				discountAsakim.changeAllAcc("loan", true);
			}
			else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
				all.banks.accountDetails.MATAH_DAY_TO_RUN = -1;
				all.banks.accountDetails.IND_NILVIM = -1;
				all.banks.accounts.discountAsakim.accountNow = 0;
				myEmitterLogs(34);
				discountAsakim.changeAllAcc('matah');
			}
			else {
				all.banks.accounts.discountAsakim.logOut()
			}
		})
		.fail(function (error, resErr) {
			if (error == 'discard') {
				all.banks.accounts.discountAsakim.sendCardsCtrl()
			}
		})
	}
	discountAsakim.sendLoanCtrl = function () {
		all.banks.core.services.sendLoan(all.banks.generalVariables.allDataArrLoan)
		.then(function (arr) {
			all.banks.accounts.discountAsakim.accountNow = 0;
			myEmitterLogs(17);
			discountAsakim.changeAllAcc("deposit");

		})
		.fail(function (error, resErr) {
			if (error == 'discard') {
				discountAsakim.sendLoanCtrl();
			}
		})
	};
	discountAsakim.sendDepositCtrl = function (data) {
		all.banks.core.services.sendPikdonot(all.banks.generalVariables.allDataArrDeposit)
		.then(function (arr) {
			all.banks.accounts.discountAsakim.accountNow = 0;
			discountAsakim.changeAllAcc("duechecks");
			// discuontAsakimPlus.changeAll();
		})
		.fail(function (error, resErr) {
			if (error == 'discard') {
				discountAsakim.sendDepositCtrl();
			}
		})
	};
	discountAsakim.sendDueChecksCtrl = function (data) {
		all.banks.core.services.sendDueChecks(all.banks.generalVariables.allDataArrDueChecks)
		.then(function (arr) {
			all.banks.accounts.discountAsakim.accountNow = 0;

			discountAsakim.changeAllAcc("orders");
		})
		.fail(function (error, resErr) {
			if (error == 'discard') {
				discountAsakim.sendDueChecksCtrl();
				// discuontAsakimPlus.changeAll();
			}
		})
	};
	discountAsakim.sendStandingOrdersCtrl = function (data) {
		all.banks.core.services.sendStandingOrders(all.banks.generalVariables.allDataArrStandingOrders)
		.then(function (arr) {
			// all.banks.accountDetails.IND_NILVIM = 0;
			if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
				all.banks.accountDetails.MATAH_DAY_TO_RUN = -1;
				all.banks.accountDetails.IND_NILVIM = -1;
				all.banks.accounts.discountAsakim.accountNow = 0;
				myEmitterLogs(34);
				discountAsakim.changeAllAcc('matah');
			}
			else {
				discountAsakim.logOut();
			}

		})
		.fail(function (error, resErr) {
			if (error == 'discard') {
				discountAsakim.sendStandingOrdersCtrl();
			}
		});
	};
	discountAsakim.loadData = function () {
		all.banks.core.services.httpReq("https://start.telebank.co.il/LoginPages/Logon", 'GET', null, false, false)
		.then(function (data) {
			var data = all.banks.core.services.parseHtml(data);
			if (data.find(".tzId2_div").eq(1).length && data.find(".tzId2_div").eq(1).text().indexOf('סיסמה חדשה') !== -1) {
				myEmitterLogs(6); //Password expired
			}
			else {
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
					all.banks.generalVariables.allDataArrAshrai = [];
					all.banks.generalVariables.allDataArrLoan = [];
					all.banks.generalVariables.allDataArrDeposit = [];
					all.banks.generalVariables.allDataArrDueChecks = [];
					all.banks.generalVariables.allDataArrStandingOrders = [];
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
					all.banks.accounts.discuontAsakimPlus.datebacksleshMatah = all.banks.accountDetails.dateFromMatah.getFullYear().toString() + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2);
					all.banks.accounts.discuontAsakimPlus.datebacksleshToMatah = all.banks.accountDetails.dateToMatah.getFullYear().toString() + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2);
					all.banks.accounts.discountAsakim.datebackslesh = all.banks.accountDetails.dateFrom.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2);
					all.banks.accounts.discountAsakim.datebacksleshTo = all.banks.accountDetails.dateTo.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2);
					$('#filecontainerlogin').attr('src', 'https://start.telebank.co.il/LoginPages/Logon?multilang=he&t=O&pagekey=Home&bank=' + all.banks.accounts.discountAsakim.typeBank);
					setTimeout(function () {
						try {
							var iframes = $('#filecontainerlogin').contents();
							all.banks.accounts.discountAsakim.uuidPage = window.frames[0].window.__csrfid;
							all.banks.accounts.discountAsakim.VIEWSTATE = iframes.find('input[name="__VIEWSTATE"]').val();
							all.banks.accounts.discountAsakim.VIEWSTATEGENERATOR = iframes.find('#__VIEWSTATEGENERATOR').val();
							//var ddAcc = $('#filecontainerlogin').contents().find('#ctl00_accountsSelect_AccountsCombo_index');
							var aspnetForm = iframes.find('#aspnetForm');
							if (aspnetForm.length) {
								all.banks.core.services.httpReq("https://start.telebank.co.il/Retail/DiscountInternet/GUI2008/" + aspnetForm.attr("action"), 'GET', null, false, false)
								.then(function (data) {
									if (data.includes('["ctl00_accountsSelect_AccountsCombo"].Initialize(')) {
										var arrAcc = "[" + data.split('["ctl00_accountsSelect_AccountsCombo"].Initialize(')[1].split(");")[0] + "]";
										arrAcc = JSON.parse(arrAcc)[1];
										var ddAcc = arrAcc;
										if (ddAcc.length) {
											$(ddAcc).each(function (i, v) {
												var text = v.Text.split(' ');
												var obj = {
													accNumber: text[0].replace(/\s/g, ""),
													snif: text[1].split('-')[0].replace(/\s/g, "").replace(/\D/g, ""),
													numberAcc: v.Value,
													selected: v.Selected
												}
												all.banks.accounts.discountAsakim.account.push(obj);
											});
											if (all.banks.accountDetails.days > 0) {
												$('#filecontainerlogin').attr('src', '');
												discountAsakim.changeAllAcc("osh", true);
											}
											else if (all.banks.accountDetails.ccardMonth > 0) {
												$('#filecontainerlogin').attr('src', '');
												myEmitterLogs(14);
												discountAsakim.changeAllAcc("card", true);
											}
											else if (all.banks.accountDetails.IND_NILVIM > 0) {
												myEmitterLogs(21);
												$('#filecontainerlogin').attr('src', '');
												discountAsakim.changeAllAcc("loan", true);
											}
											else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
												myEmitterLogs(34); //start matah
												$('#filecontainerlogin').attr('src', '');
												discountAsakim.changeAllAcc("matah", true);
											}
											else {
												all.banks.core.services.reloadPage();
											}
										}
									}
									else {
										var dataReq = all.banks.core.services.parseHtml(data);
										var text = dataReq.find('#ctl00_accountsSelect_lblAccount').text().split(' ');
										var parts = text[1].split(':')[1].split('-');
										var obj = {
											accNumber: text[0].replace(/\s/g, ""),
											snif: text[1].split('-')[0].replace(/\s/g, "").replace(/\D/g, ""),
											numberAcc: parts[0] + '' + parts[1] + '' + parts[2] + '' + parseFloat(parts[3]),
											selected: true
										}
										all.banks.accounts.discountAsakim.account.push(obj);
										if (all.banks.accountDetails.days > 0) {
											$('#filecontainerlogin').attr('src', '');
											discountAsakim.changeAllAcc("osh", true);
										}
										else if (all.banks.accountDetails.ccardMonth > 0) {
											$('#filecontainerlogin').attr('src', '');
											myEmitterLogs(14);
											discountAsakim.changeAllAcc("card", true);
										}
										else if (all.banks.accountDetails.IND_NILVIM > 0) {
											$('#filecontainerlogin').attr('src', '');
											myEmitterLogs(21);
											$('#filecontainerlogin').attr('src', '');
											discountAsakim.changeAllAcc("loan", true);
										}
										else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
											myEmitterLogs(34); //start matah
											$('#filecontainerlogin').attr('src', '');
											discountAsakim.changeAllAcc("matah", true);
										}
										else {
											all.banks.core.services.reloadPage();
										}
									}

								})
							}
							else {
								debugger
							}
						}
						catch (err) {
							all.banks.core.services.errorLog(err)
						}
					}, 6000)
				}
				else {
					all.banks.core.services.openBankPage('https://start.telebank.co.il/LoginPages/Logon?multilang=he&t=O&pagekey=Home&bank=' + all.banks.accounts.discountAsakim.typeBank);
				}
			}
		})
		.fail(function (error, resErr, urlParam) {
			var logErr = "restUrl: " + urlParam + ", status: " + error.status;
			all.banks.core.services.errorLog(logErr)
		});
	}
	discountAsakim.convertDateLocal = function (dateLocal) {
		var dateFormat = "";
		if (dateLocal !== undefined && dateLocal !== null) {
			dateLocal = dateLocal.toString();
			if (dateLocal !== "") {
				dateFormat = dateLocal.split("-")[1] + "/" + dateLocal.split("-")[0] + "/" + dateLocal.split("-")[2];
			}
		}
		return dateFormat;
	}
	discountAsakim.changeAllAcc = function (type, firstLoad) {
		if (firstLoad) {
			if (all.banks.accounts.discountAsakim.accountNow == 0 && !discountAsakim.account[0].selected) {
				changeAcc();
			}
			else {
				if (type == "osh") {
					myEmitterLogs(11); // get data
					var acc = {
						'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
						'AccountNumber': all.banks.accounts.discountAsakim.account[all.banks.accounts.discountAsakim.accountNow].accNumber,
						'BranchNumber': all.banks.accounts.discountAsakim.account[all.banks.accounts.discountAsakim.accountNow].snif,
						'Balance': '',
						'AccountCredit': ''
					}
					all.banks.generalVariables.allDataArr.BankData[0].Account.push(acc);
					myEmitterLogs(10, acc.AccountNumber); //change Acc
				}
				goToType(type);
			}
		}
		else {
			if (all.banks.accounts.discountAsakim.account.length > 1) {
				changeAcc();
			}
			else {
				goToType(type);
			}
		}

		function goToType(type) {
			if (type == "osh") {
				discountAsakim.loadDataAll();
			}
			else if (type == "card") {
				discountAsakim.loadAshrai();
			}
			else if (type == "loan") {
				discountAsakim.loadLoan();
			}
			else if (type == "deposit") {
				discountAsakim.loadDeposit();
			}
			else if (type == 'duechecks') {
				discountAsakim.govaina = true;
				discountAsakim.bitahon = false;
				discountAsakim.nikaion = false;
				discountAsakim.loadDueChecksBitahon(0);
			}
			else if (type == 'orders') {
				discountAsakim.loadStandingOrders();
			}
			else if (type == 'matah') {
				discountAsakim.matah();
			}
		}

		function changeAcc() {
			if (type == "osh") {
				myEmitterLogs(11); // get data
				var acc = {
					'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
					'AccountNumber': all.banks.accounts.discountAsakim.account[all.banks.accounts.discountAsakim.accountNow].accNumber,
					'BranchNumber': all.banks.accounts.discountAsakim.account[all.banks.accounts.discountAsakim.accountNow].snif,
					'Balance': '',
					'AccountCredit': ''
				}
				all.banks.generalVariables.allDataArr.BankData[0].Account.push(acc);
				myEmitterLogs(10, acc.AccountNumber); //change Acc
			}
			var forms = {
				"ctl00$ScriptManager1": "ctl00$ScriptManager1|ctl00$cmdButton",
				"ctl00$menu$TabStrip": '{"State":{},"TabState":{"ctl00_menu_TabStrip_ctl00":{"Selected":true},"ctl00_menu_TabStrip_ctl00_ctl00":{"Selected":true}}}',
				"ctl00_accountsSelect_AccountsCombo_index": all.banks.accounts.discountAsakim.accountNow,
				"ctl00$accountsSelect$hiddenSelectedAccountIndex": "0",
				"ctl00$accountsSelect$hiddenPersonalName": "",
				"ctl00_personalMenu_PersonalMenuCombo_index": "0",
				"ctl00$cmdName": "AccountChangedCommand",
				'ctl00$cmdArgs': all.banks.accounts.discountAsakim.account[all.banks.accounts.discountAsakim.accountNow].numberAcc,
				"__EVENTTARGET": "",
				"__EVENTARGUMENT": "",
				'__VIEWSTATE': all.banks.accounts.discountAsakim.VIEWSTATE,
				'__ASYNCPOST': 'true',
				'ctl00$cmdButton': 'Send Command'
			}
			$.ajax({
				url: "https://start.telebank.co.il/Retail/DiscountInternet/GUI2008/Main.aspx?p=MY_ACCOUNT_HOMEPAGE&fxyz=" + all.banks.accounts.discountAsakim.uuidPage,
				beforeSend: function (xhr) {
					xhr.setRequestHeader('X-MicrosoftAjax', 'Delta=true');
				},
				data: forms,
				method: "POST",
				contentType: "application/x-www-form-urlencoded"
			})
			.done(function (data) {
				var srcMain = '<html><body>' + data + '</body></html>';
				var srcMain = $(srcMain);
				all.banks.accounts.discountAsakim.VIEWSTATE = srcMain[srcMain.length - 1].data.split('|')[12];
				goToType(type);
			})
			.fail(function (error, resErr, urlParam) {
				var logErr = "restUrl: " + urlParam + ", status: " + error.status;
				all.banks.core.services.errorLog(logErr)
			});
		}
	}
	discountAsakim.loadDataAll = function () {
		all.banks.core.services.httpReq("https://start.telebank.co.il/Telebank/currentAccount/lastEntries/Lentries_Altamira.asp?NumOfTrans=16&sMenu_Id=OSH_LENTRIES_ALTAMIRA&FromDate=" + all.banks.accounts.discountAsakim.datebackslesh + "&ToDate=" + all.banks.accounts.discountAsakim.datebacksleshTo + "&fxyz=" + all.banks.accounts.discountAsakim.uuidPage, 'GET', null, false, false)
		.then(function (res) {
			var url = "https://start.telebank.co.il/Telebank/currentAccount/lastEntries/Lentries_Altamira.asp?NumOfTrans=16&sMenu_Id=OSH_LENTRIES_ALTAMIRA&FromDate=" + all.banks.accounts.discountAsakim.datebackslesh + "&ToDate=" + all.banks.accounts.discountAsakim.datebacksleshTo + "&fxyz=" + all.banks.accounts.discountAsakim.uuidPage;
			var jsons = {
				'isPostBack': '1',
				'gridName': 'gridLentries',
				'expandGridStatus': '',
				'pageNum': '-1',
				'colNumberFilter': '',
				'colTypeFilter': '',
				'colType': '',
				'filterWinOpened': '0'
			};
			all.banks.core.services.httpReq(url, 'POST', jsons, true, false)
			.then(function (data) {
				try {
					var data = all.banks.core.services.parseHtml(data);
					var dataContent = data[21];
					//var grayArchiveStart = $(dataContent).find('table  tr').eq(1).find('td:first').children('table').eq(1).next().text().split('var checkImageWin')[0].split("'")[1];
					all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discountAsakim.accountNow].AccountCredit = ($(dataContent).find('.textLink').eq(0).text().replace(/\s/g, "").replace(/,/g, '') !== "") ? $(dataContent).find('.textLink').eq(0).text().replace(/\s/g, "").replace(/,/g, '') : data.find('.textLink').eq(0).text().replace(/\s/g, "").replace(/,/g, '');
					all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discountAsakim.accountNow].Balance = data.find('.fieldValue').eq(1).text().replace(/\s/g, "").replace(/,/g, '').indexOf('.') !== -1 ? data.find('.fieldValue').eq(1).text().replace(/\s/g, "").replace(/,/g, '') : data.find('.fieldValue').eq(2).text().replace(/\s/g, "").replace(/,/g, '');
					all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discountAsakim.accountNow].DataRow = [];
					if (data.find('#innerTable tr').length > 0) {
						var dateInd, descInd, asmachtaInd, totalInd, balanceInd;
						data.find('#outerTable > tr > th').each(function (ind, val) {
							var textTh = $(val).text();
							if (textTh.indexOf("תאריך") !== -1) {
								dateInd = ind;
							}
							else if (textTh.indexOf("תיאור") !== -1) {
								descInd = ind;
							}
							else if (textTh.indexOf("אסמכתה") !== -1) {
								asmachtaInd = ind;
							}
							else if (textTh.indexOf("זכות") !== -1) {
								totalInd = ind;
							}
							else if (textTh.indexOf("יתרה") !== -1) {
								balanceInd = ind;
							}

							if (data.find('#outerTable > tr > th').length == ind + 1) {
								data.find('#innerTable tr').each(function (i, v) {
									var values = $(v);
									var asmachta = values.find('td').eq(asmachtaInd).text().split('/')[0].replace(/\s/g, "");
									if (asmachta == undefined || asmachta == '') {
										asmachta = null;
									}
									var date = values.find('td').eq(dateInd).text();
									date = discountAsakim.convertDateLocal(date);

									var total = values.find('td').eq(totalInd).text().replace(/\s/g, "").replace(/,/g, '');
									var transactionType = '0';
									if (total.indexOf('-') == -1) {
										transactionType = '1';
									}
									var balance = values.find('td').eq(balanceInd).text().replace(/\s/g, "").replace(/,/g, '');
									if (balance == '') {
										balance = null;
									}
									var imgs = null;
									if (all.banks.accountDetails.checks == true && values.find('td').eq(descInd).find('div').length > 0) {
										if (values.find('td').eq(descInd).find('div').attr('onclick') !== undefined) {
											var attrs = values.find('td').eq(descInd).find('div').attr('onclick').split("'");
											if (attrs[0] == 'viewCheckImage(') {
												imgs = "https://start.telebank.co.il/Telebank/currentAccount/imaging/imagingCheckImageRetrieve.asp?FetchType=CurrentAccount&grayArchiveStart=20100101&checkDate=" + attrs[1] + "&checkNum=" + attrs[3] + "&checkSum=" + attrs[5].replace(/−/g, "");
											}
										}
									}
									all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discountAsakim.accountNow].DataRow.push({
										"Asmachta": asmachta,
										"TransDesc": values.find('td').eq(descInd).text().trim(),
										"ValueDate": all.banks.core.services.convertDateAll(date),
										"TransactionType": transactionType,
										"TransTotal": Math.abs(total),
										"Balance": balance,
										"IsDaily": "0",
										"imgs": imgs
									})
									if (data.find('#innerTable tr').length == i + 1) {
										loadNextStep()
									}
								})
							}
						})
					}
					else {
						loadNextStep();
					}

					function loadNextStep() {
						myEmitterLogs(12, all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discountAsakim.accountNow].DataRow.length); //length arr
						if (all.banks.accountDetails.checks == true && all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discountAsakim.accountNow].DataRow.length > 0) {
							all.banks.accounts.discountAsakim.loadCheck();
						}
						else {
							if (all.banks.accounts.discountAsakim.account.length > (all.banks.accounts.discountAsakim.accountNow + 1)) {
								all.banks.accounts.discountAsakim.accountNow = all.banks.accounts.discountAsakim.accountNow + 1;
								discountAsakim.changeAllAcc("osh");
							}
							else {
								all.banks.accounts.discountAsakim.sendOshCtrl();
							}
						}
					}
				}
				catch (err) {
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
	discountAsakim.loadCheck = function () {
		try {
			$(all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discountAsakim.accountNow].DataRow).each(function (i, v) {
				if (v.imgs !== null && Object.prototype.toString.call(v.imgs) !== "[object Array]") {
					all.banks.core.services.httpReq(v.imgs, 'GET', null, false, false)
					.then(function (res) {
						var uuid = Number(all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discountAsakim.accountNow].BankNumber) + '' + Number(all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discountAsakim.accountNow].BranchNumber) + '' + Number(all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discountAsakim.accountNow].AccountNumber) + '' + parseFloat(v.TransDesc.split(':')[1]) + '' + parseInt(v.ValueDate.replace(/\//g, "")) + '_' + Number(all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discountAsakim.accountNow].BankNumber) + '' + Number(all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discountAsakim.accountNow].BranchNumber) + '' + Number(all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discountAsakim.accountNow].AccountNumber);
						var imgUrl = 'https://start.telebank.co.il/Telebank/currentAccount/imaging/loadCheckImage.asp?imageType=FrontImage';
						all.banks.core.services.httpReq(imgUrl, 'GET', null, false, false)
						.then(function (res) {
							var img = new Image();
							img.src = imgUrl;
							img.onload = function () {
								var canvas = document.createElement("canvas");
								canvas.width = this.width;
								canvas.height = this.height;
								var ctx = canvas.getContext("2d");
								ctx.drawImage(this, 0, 0);
								var dataURL = canvas.toDataURL("image/jpeg");
								var content = dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
								var checkAccountNumber = parseFloat(v.TransDesc.split(':')[1]);
								var formData = new FormData();
								var blob = new Blob([content], {
									type: "text/plain"
								});
								formData.append(uuid, blob);

								function sendCheck() {
									all.banks.accounts.discountAsakim.sendChecksCtrl({
										formData:formData,
										params:{
											imagenamekey: uuid,
											bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discountAsakim.accountNow].BankNumber,
											snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discountAsakim.accountNow].BranchNumber,
											accountId:all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discountAsakim.accountNow].AccountNumber
										}
									})
									.then(function (response) {
										formData = null;
										content = null;
										if (response !== "error") {
											v.imgs = [{
												"Asmachta": v.Asmachta.split('/')[0].replace(/\s/g, ""),
												"CheckAccountNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discountAsakim.accountNow].AccountNumber,
												"DepositeDate": v.ValueDate,
												"CheckBankNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discountAsakim.accountNow].BankNumber,
												"CheckBranchNumber": all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discountAsakim.accountNow].BranchNumber,
												"CheckNumber": checkAccountNumber,
												"CheckTotal": v.TransTotal,
												"ImageNameKey": uuid
											}];
										}
										else {
											v.imgs = [{
												"ImageNameKey": "x"
											}];
										}
										discountAsakim.loadCheck();
									})
									.fail(function (error) {
										sendCheck()
									});
								}

								sendCheck()
							};
							img.onerror = function () {
								all.banks.generalVariables.numChecksNotWithdrawn += 1;
								v.imgs = [{
									"ImageNameKey": "x"
								}];
								discountAsakim.loadCheck();
							};
						})
					})
					.fail(function (error, resErr) {
						all.banks.generalVariables.numChecksNotWithdrawn += 1;
						v.imgs = [{
							"ImageNameKey": "x"
						}];
						discountAsakim.loadCheck();
					});
					return false;
				}
				if (all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.accounts.discountAsakim.accountNow].DataRow.length == i + 1) {
					myEmitterLogs(29);
					all.banks.generalVariables.numChecksDrawn = 0;
					all.banks.generalVariables.numChecksNotWithdrawn = 0;
					if (all.banks.accounts.discountAsakim.account.length > (all.banks.accounts.discountAsakim.accountNow + 1)) {
						all.banks.accounts.discountAsakim.accountNow = all.banks.accounts.discountAsakim.accountNow + 1;
						discountAsakim.changeAllAcc("osh");
					}
					else {
						all.banks.accounts.discountAsakim.sendOshCtrl();
					}
				}
			})
		}
		catch (err) {
			all.banks.core.services.errorLog(err)
		}
	}
	discountAsakim.loadAshrai = function () {
		var urlGetAllCards = "https://start.telebank.co.il/Telebank/credit/creditCards_Altamira/getCardList.asp?sMenu_Id=CARD_DEBIT_TRANSACTION&fxyz=" + all.banks.accounts.discountAsakim.uuidPage;
		all.banks.core.services.httpReq(urlGetAllCards, 'GET', null, false, false)
		.then(function (res) {
				var res = all.banks.core.services.parseHtml(res);
				if ((res.find('#errMsgContent').length == 0 || res.find('#errMsgContent').text().indexOf('113') != -1) && res.find('#content table tbody tr td tbody tr td tbody tr td  script').length == 0) {
					res.find("script").each(function (i, v) {
						if ($(v).text().indexOf('cardNumber') != -1) {
							var cardNumber = $(v).text().split('cardNumber')[1].replace(/\D/g, "").trim();
							if (cardNumber != '') {
								var obj = {
									'cardNumber': cardNumber,
									'cardType': $(v).text().split('TabName = ')[1].split('var')[0]
								}
								discountAsakim.comboCard.push(obj)
							}
						}
					});
					if (discountAsakim.comboCard.length) {
						discountAsakim.loadCardAll();
					}
					else {
						if (all.banks.accounts.discountAsakim.account.length > (all.banks.accounts.discountAsakim.accountNow + 1)) {
							all.banks.accounts.discountAsakim.accountNow = all.banks.accounts.discountAsakim.accountNow + 1;
							discountAsakim.countCard = 0;
							discountAsakim.comboCard = [];
							discountAsakim.changeAllAcc("card");
						}
						else {
							all.banks.accounts.discountAsakim.sendCardsCtrl()
						}
					}
				}
				else if (res.find('#errMsgContent').length == 0 || res.find('#errMsgContent').text().indexOf('113') != -1) {
					$.each(res.find('#content table tbody tr td tbody tr td tbody tr td  script'), function (i, v) {

						if ($(v).text().indexOf("var card_name='") !== -1) {
							console.log($(v).text().split("+ ' - ' + '")[1].split("';")[0].trim())
							console.log($(v).text().split("card_number='")[1].split("';")[0].trim())

							var obj = {
								'cardNumber': $(v).text().split("card_number='")[1].split("';")[0].trim(),
								'cardType': $(v).text().split("+ ' - ' + '")[1].split("';")[0].trim()
							}

							discountAsakim.comboCard.push(obj)
						}

					})
					if (discountAsakim.comboCard.length) {
						discountAsakim.loadCardAll();
					}
					else {
						if (all.banks.accounts.discountAsakim.account.length > (all.banks.accounts.discountAsakim.accountNow + 1)) {
							all.banks.accounts.discountAsakim.accountNow = all.banks.accounts.discountAsakim.accountNow + 1;
							discountAsakim.countCard = 0;
							discountAsakim.comboCard = [];
							discountAsakim.changeAllAcc("card");
						}
						else {
							all.banks.accounts.discountAsakim.sendCardsCtrl()
						}
					}
				}
				else {
					if (all.banks.accounts.discountAsakim.account.length > (all.banks.accounts.discountAsakim.accountNow + 1)) {
						all.banks.accounts.discountAsakim.accountNow = all.banks.accounts.discountAsakim.accountNow + 1;
						discountAsakim.countCard = 0;
						discountAsakim.comboCard = [];
						discountAsakim.changeAllAcc("card");
					}
					else {
						all.banks.accounts.discountAsakim.sendCardsCtrl()
					}
				}
			}
		)
		.fail(function (error, resErr) {
			all.banks.core.services.errorLog('שגיאה')
		});
	}
	discountAsakim.getCurrency = function (type) {
		if (type != undefined && type.indexOf('שח') != -1) {
			return 1;
		}
		else if (type != undefined && type.indexOf('$') != -1) {
			return 2;
		}
		else if (type != undefined && type.indexOf('USD') != -1) {
			return 2;
		}
		else if (type != undefined && type.indexOf('KE') != -1) {
			return 50;
		}
		else if (type != undefined && type.indexOf('GB') != -1) {
			return 3;
		}
		else if (type != undefined && type.indexOf('EUR') != -1) {
			return 11;
		}
		else if (type != undefined && type.indexOf('CN') != -1) {
			return 5;
		}
		else if (type != undefined && type.indexOf('TH') != -1) {
			return 6;
		}
		else {
			return 1
		}
	};
	discountAsakim.loadCardAll = function () {
		$(discountAsakim.comboCard).each(function (index, valCard) {
			if (index == discountAsakim.countCard) {
				var urlCard = 'https://start.telebank.co.il/Telebank/credit/creditCards_Altamira/creditCurrentDebitTransacrions.asp?cardNumber=' + valCard.cardNumber + '&tabsMode=True&tabIndex=0&windowId=';
				all.banks.core.services.httpReq(urlCard, 'GET', null, false, false)
				.then(function (res) {
					var dataForm = {
						isPostBack: 1,
						gridName: 'gridCurrentDebitTransactions',
						expandGridStatus: '',
						pageNum: '-1',
						colNumberFilter: '',
						colTypeFilter: '',
						colType: '',
						filterWinOpened: 0
					};
					var urlCardAll = 'https://start.telebank.co.il/Telebank/credit/creditCards_Altamira/creditCurrentDebitTransacrions.asp?cardNumber=' + valCard.cardNumber + '&tabsMode=True&tabIndex=0&windowId=&fxyz=' + all.banks.accounts.discountAsakim.uuidPage;

					all.banks.core.services.httpReq(urlCardAll, 'POST', dataForm, true, false)
					.then(function (res) {
						var res = all.banks.core.services.parseHtml(res);
						if (res.find('#innerTable tr').length > 0) {
							var dateInd, descInd, originalTotalInd, billingDateInd, trTotalInd, details;
							res.find('#outerTable tr th').each(function (ind, val) {
								var textTh = $(val).text();
								if (textTh.indexOf("תאריך") != -1 && textTh.indexOf("העסקה") != -1) {
									dateInd = ind;
								}
								else if (textTh.indexOf("פירוט") != -1) {
									details = ind;
								}
								else if (textTh.indexOf("שם") !== -1 && textTh.indexOf("בית") != -1 && textTh.indexOf("העסק") != -1) {
									descInd = ind;
								}
								else if (textTh.indexOf("סכום") != -1 && textTh.indexOf("העסקה") != -1) {
									originalTotalInd = ind;
								}
								else if (textTh.indexOf("תאריך") != -1 && textTh.indexOf("החיוב") != -1) {
									billingDateInd = ind;
								}
								else if (textTh.indexOf("סכום") != -1 && textTh.indexOf("החיוב") != -1) {
									trTotalInd = ind;
								}
								if (res.find('#outerTable tr th').length == ind + 1) {
									myEmitterLogs(15, valCard.cardNumber.slice(-4) + ' Perion Now');
									//writeHtmlFile('innerTable', res.find('#innerTable').html());

									res.find('#innerTable > tr').each(function (i, v) {
										if ($(v).hasClass('rowClass0') || $(v).hasClass('rowClass1')) {
											var CardNumber = valCard.cardNumber.slice(-4);
											var ValueDate = $(v).find('> td').eq(dateInd).text().replace(/\u00A0/g, '');
											ValueDate = discountAsakim.convertDateLocal(ValueDate);

											var TransDesc = $(v).find('> td').eq(descInd).text();
											var NextBillingDate = $(v).find(' > td').eq(billingDateInd).text();
											NextBillingDate = discountAsakim.convertDateLocal(NextBillingDate);

											var totalPaymentsSum = null, currentPaymentNumSum = null,
												indexComment = null, comment = null;
											indexComment = $(v).find('td').eq(details).text();
											if (indexComment.indexOf('מ −') !== -1) {
												totalPaymentsSum = $(v).find('td').eq(details).text().replace(/\s+/g, " ").split('מ −')[1].split(" ")[1].replace(/\D/g, "");
												currentPaymentNumSum = $(v).find('td').eq(details).text().split('מ −')[0].replace(/\D/g, "");
											}
											else if (indexComment.indexOf('מ-') !== -1) {
												totalPaymentsSum = $(v).find('td').eq(details).text().replace(/\s+/g, " ").split('מ-')[1].split(" ")[1].replace(/\D/g, "");
												currentPaymentNumSum = $(v).find('td').eq(details).text().split('מ-')[0].replace(/\D/g, "");
											}
											else {
												comment = indexComment;
											}
											var currency_id = all.banks.core.services.getTypeCurrencyAll($(v).find(' > td ').eq(trTotalInd).find('td').eq(1).text());
											var CardType = all.banks.core.services.getTypeCard(valCard.cardType);
											var TransTotal = $(v).find('> td ').eq(trTotalInd).find('td').eq(0).text().replace(/\s/g, "").replace(/,/g, '');
											var ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll($(v).find('> td').eq(originalTotalInd).find('td').eq(1).text());
											all.banks.generalVariables.allDataArrAshrai.push({
												"BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
												"TargetId": all.banks.accountDetails.bank.targetId,
												"Token": all.banks.accountDetails.bank.token,
												"ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
												"ExporterId": all.banks.spiderConfig.spiderId,
												"BranchNumber": all.banks.accounts.discountAsakim.account[all.banks.accounts.discountAsakim.accountNow].snif,
												"AccountNumber": all.banks.accounts.discountAsakim.account[all.banks.accounts.discountAsakim.accountNow].accNumber,
												"CardNumber": CardNumber,
												"NextBillingDate": all.banks.core.services.convertDateAll(NextBillingDate),
												"NextCycleTotal": res.find('#totalDebitILS tbody tr').find('td').eq(2).text().replace(/\s/g, "").replace(/,/g, '') != '' ? res.find('#totalDebitILS tbody tr').find('td').eq(2).text().replace(/\s/g, "").replace(/,/g, '') : res.find('#toBeDebitILS tbody tr').find('td').eq(2).text().replace(/\s/g, "").replace(/,/g, ''),
												"CardStatus": null,
												"TransDesc": TransDesc,
												"TransTotal": TransTotal,
												"ValueDate": ValueDate != '' ? all.banks.core.services.convertDateAll(ValueDate) : all.banks.core.services.convertDateAll(NextBillingDate),
												"TransCategory": null,
												"TotalPayments": totalPaymentsSum,
												"CurrentPaymentNum": currentPaymentNumSum,
												"CardType": CardType,
												"indFakeDate": 0,
												"currency_id": currency_id,
												"original_total": $(v).find('> td').eq(originalTotalInd).find('table tbody td').eq(0).text().replace(/\s/g, "").replace(/,/g, ''),
												"ind_iskat_hul": ind_iskat_hul,
												"comment": comment
											});
										}
										if (res.find('#innerTable > tr').length == i + 1) {
											discountAsakim.calcMonth();
											discountAsakim.loadCardAllPrev();
										}
									})
								}
							})
						}
						else {
							discountAsakim.calcMonth();
							discountAsakim.loadCardAllPrev();
						}
					})
				})
				return false;
			}
		});
	}
	discountAsakim.loadCardAllPrev = function () {
		$(discountAsakim.comboCardPrevMonth).each(function (index, valPrev) {
			if (index == discountAsakim.countCardPrevMonth) {
				var urlCard = 'https://start.telebank.co.il/Telebank/credit/creditCards_Altamira/creditPastDebitTransacrions.asp?RequestedMonth=' + valPrev + '&cardNumber=' + discountAsakim.comboCard[discountAsakim.countCard].cardNumber + '&tabsMode=True&tabIndex=0&windowId=&fxyz=' + all.banks.accounts.discountAsakim.uuidPage;
				all.banks.core.services.httpReq(urlCard, 'GET', null, false, false)
				.then(function (res) {
					var res = all.banks.core.services.parseHtml(res);
					if ($(res).find('#errMsgContent').text().indexOf('113') != -1) {
						if (discountAsakim.comboCard.length - 1 > discountAsakim.countCard) {
							if (discountAsakim.comboCardPrevMonth.length == index + 1) {
								discountAsakim.countCard += 1;
								discountAsakim.countCardPrevMonth = 0;
								discountAsakim.loadCardAll();
							}
							else {
								discountAsakim.countCardPrevMonth += 1;
								discountAsakim.loadCardAllPrev();
							}
						}
						else {
							if (discountAsakim.comboCardPrevMonth.length == index + 1) {
								if (all.banks.accounts.discountAsakim.account.length > (all.banks.accounts.discountAsakim.accountNow + 1)) {
									all.banks.accounts.discountAsakim.accountNow = all.banks.accounts.discountAsakim.accountNow + 1;
									discountAsakim.countCard = 0;
									discountAsakim.countCardPrevMonth = 0;
									discountAsakim.comboCard = [];
									discountAsakim.changeAllAcc("card");
								}
								else {
									discountAsakim.countCardPrevMonth = 0;
									all.banks.accounts.discountAsakim.sendCardsCtrl()
								}
							}
							else {
								discountAsakim.countCardPrevMonth += 1;
								discountAsakim.loadCardAllPrev();
							}
						}
					}
					else {
						var dataForm = {
							isPostBack: '1',
							gridName: 'gridPDebitTrans',
							expandGridStatus: '',
							pageNum: '-1',
							colNumberFilter: '',
							colTypeFilter: '',
							colType: '',
							filterWinOpened: '0'
						}
						var urlCard = 'https://start.telebank.co.il/Telebank/credit/creditCards_Altamira/creditPastDebitTransacrions.asp?RequestedMonth=' + valPrev + '&cardNumber=' + discountAsakim.comboCard[discountAsakim.countCard].cardNumber + '&tabsMode=True&tabIndex=0&windowId=&fxyz=' + all.banks.accounts.discountAsakim.uuidPage;
						all.banks.core.services.httpReq(urlCard, 'POST', dataForm, true, false)
						.then(function (res) {
							var res = all.banks.core.services.parseHtml(res);
							if (res.find('#innerTable  tr').length > 0) {
								var dateInd, descInd, originalTotalInd, billingDateInd, trTotalInd, details;
								res.find('#outerTable tr th').each(function (ind, val) {
									var textTh = $(val).text();
									if (textTh.indexOf("תאריך") != -1 && textTh.indexOf("העסקה") != -1) {
										dateInd = ind;
									}
									else if (textTh.indexOf("פירוט") != -1) {
										details = ind;
									}
									else if (textTh.indexOf("שם") !== -1 && textTh.indexOf("בית") != -1 && textTh.indexOf("העסק") != -1) {
										descInd = ind;
									}
									else if (textTh.indexOf("סכום") != -1 && textTh.indexOf("העסקה") != -1) {
										originalTotalInd = ind;
									}
									else if (textTh.indexOf("תאריך") != -1 && textTh.indexOf("החיוב") != -1) {
										billingDateInd = ind;
									}
									else if (textTh.indexOf("סכום") != -1 && textTh.indexOf("החיוב") != -1) {
										trTotalInd = ind;
									}
									if (res.find('#outerTable tr th').length == ind + 1) {
										myEmitterLogs(15, discountAsakim.comboCard[discountAsakim.countCard].cardNumber.slice(-4) + ' Period ' + valPrev);
										if (res.find('#innerTable > tr').length) {
											//	writeHtmlFile('innerTable', res.find('#innerTable').html());

											res.find('#innerTable > tr').each(function (i, v) {
												if ($(v).hasClass('rowClass0') || $(v).hasClass('rowClass1')) {
													var CardNumber = discountAsakim.comboCard[discountAsakim.countCard].cardNumber.slice(-4);
													var ValueDate = $(v).find('> td').eq(dateInd).text().replace(/\u00A0/g, '');
													ValueDate = discountAsakim.convertDateLocal(ValueDate);

													var TransDesc = $(v).find('> td').eq(descInd).text();
													var NextBillingDate = $(v).find('> td').eq(billingDateInd).text();
													NextBillingDate = discountAsakim.convertDateLocal(NextBillingDate);

													var totalPaymentsSum = null, currentPaymentNumSum = null,
														indexComment = null, comment = null;

													indexComment = $(v).find('td').eq(details).text();
													if (indexComment.indexOf('מ −') !== -1) {
														totalPaymentsSum = indexComment.replace(/\s+/g, " ").split('מ −')[1].split(" ")[1].replace(/\D/g, "");
														currentPaymentNumSum = indexComment.split('מ −')[0].replace(/\D/g, "");
													}
													else if (indexComment.indexOf('מ-') !== -1) {
														totalPaymentsSum = indexComment.replace(/\s+/g, " ").split('מ-')[1].split(" ")[1].replace(/\D/g, "");
														currentPaymentNumSum = indexComment.split('מ-')[0].replace(/\D/g, "");
													}
													else {
														comment = indexComment;
													}
													var currency_id = all.banks.core.services.getTypeCurrencyAll($(v).find(' > td ').eq(trTotalInd).find('td').eq(1).text());
													var CardType = all.banks.core.services.getTypeCard(discountAsakim.comboCard[discountAsakim.countCard].cardType);
													var TransTotal = $(v).find('> td ').eq(trTotalInd).find('td').eq(0).text().replace(/\s/g, "").replace(/,/g, '');
													var ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll($(v).find('> td ').eq(originalTotalInd).find('td').eq(1).text());
													all.banks.generalVariables.allDataArrAshrai.push({
														"BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
														"TargetId": all.banks.accountDetails.bank.targetId,
														"Token": all.banks.accountDetails.bank.token,
														"ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
														"ExporterId": all.banks.spiderConfig.spiderId,
														"BranchNumber": all.banks.accounts.discountAsakim.account[all.banks.accounts.discountAsakim.accountNow].snif,
														"AccountNumber": all.banks.accounts.discountAsakim.account[all.banks.accounts.discountAsakim.accountNow].accNumber,
														"CardNumber": CardNumber,
														"NextBillingDate": all.banks.core.services.convertDateAll(NextBillingDate),
														"NextCycleTotal": res.find('#divDefaultSums tbody tr').find('td').eq(2).text().replace(/\s/g, "").replace(/,/g, ''),
														"CardStatus": null,
														"TransDesc": TransDesc,
														"TransTotal": TransTotal,
														"ValueDate": ValueDate != '' ? all.banks.core.services.convertDateAll(ValueDate) : all.banks.core.services.convertDateAll(NextBillingDate),
														"TransCategory": null,
														"TotalPayments": totalPaymentsSum,
														"CurrentPaymentNum": currentPaymentNumSum,
														"CardType": CardType,
														"indFakeDate": 0,
														"currency_id": currency_id,
														"original_total": $(v).find('> td ').eq(originalTotalInd).find('td').eq(0).text().replace(/\s/g, "").replace(/,/g, ''),
														"ind_iskat_hul": ind_iskat_hul,
														"comment": comment
													})
													if (res.find('#innerTable > tr').length == i + 1) {
														if (discountAsakim.comboCard.length - 1 > discountAsakim.countCard) {
															if (discountAsakim.comboCardPrevMonth.length == index + 1) {
																discountAsakim.countCardPrevMonth = 0;
																discountAsakim.countCard += 1;
																discountAsakim.loadCardAll();
															}
															else {
																discountAsakim.countCardPrevMonth += 1;
																discountAsakim.loadCardAllPrev();
															}
														}
														else {
															if (discountAsakim.comboCardPrevMonth.length == index + 1) {
																if (all.banks.accounts.discountAsakim.account.length > (all.banks.accounts.discountAsakim.accountNow + 1)) {
																	all.banks.accounts.discountAsakim.accountNow = all.banks.accounts.discountAsakim.accountNow + 1;
																	discountAsakim.countCard = 0;
																	discountAsakim.countCardPrevMonth = 0;
																	discountAsakim.comboCard = [];
																	discountAsakim.changeAllAcc("card");
																}
																else {
																	discountAsakim.countCardPrevMonth = 0;
																	all.banks.accounts.discountAsakim.sendCardsCtrl()
																}
															}
															else {
																discountAsakim.countCardPrevMonth += 1;
																discountAsakim.loadCardAllPrev();
															}
														}
													}
												}
											})
										}
										else {
											if (discountAsakim.comboCard.length - 1 > discountAsakim.countCard) {
												if (discountAsakim.comboCardPrevMonth.length == index + 1) {
													discountAsakim.countCard += 1;
													discountAsakim.countCardPrevMonth = 0;
													discountAsakim.loadCardAll();
												}
												else {
													discountAsakim.countCardPrevMonth += 1;
													discountAsakim.loadCardAllPrev();
												}
											}
											else {
												if (discountAsakim.comboCardPrevMonth.length == index + 1) {
													if (all.banks.accounts.discountAsakim.account.length > (all.banks.accounts.discountAsakim.accountNow + 1)) {
														all.banks.accounts.discountAsakim.accountNow = all.banks.accounts.discountAsakim.accountNow + 1;
														discountAsakim.countCard = 0;
														discountAsakim.countCardPrevMonth = 0;
														discountAsakim.comboCard = [];
														discountAsakim.changeAllAcc("card");
													}
													else {
														discountAsakim.countCardPrevMonth = 0;
														all.banks.accounts.discountAsakim.sendCardsCtrl()
													}
												}
												else {
													discountAsakim.countCardPrevMonth += 1;
													discountAsakim.loadCardAllPrev();
												}
											}
										}
									}
								})
							}
							else {
								if (discountAsakim.comboCard.length - 1 > discountAsakim.countCard) {
									if (discountAsakim.comboCardPrevMonth.length == index + 1) {
										discountAsakim.countCard += 1;
										discountAsakim.countCardPrevMonth = 0;
										discountAsakim.loadCardAll();
									}
									else {
										discountAsakim.countCardPrevMonth += 1;
										discountAsakim.loadCardAllPrev();
									}
								}
								else {
									if (discountAsakim.comboCardPrevMonth.length == index + 1) {
										if (all.banks.accounts.discountAsakim.account.length > (all.banks.accounts.discountAsakim.accountNow + 1)) {
											all.banks.accounts.discountAsakim.accountNow = all.banks.accounts.discountAsakim.accountNow + 1;
											discountAsakim.countCard = 0;
											discountAsakim.countCardPrevMonth = 0;
											discountAsakim.comboCard = [];
											discountAsakim.changeAllAcc("card");
										}
										else {
											discountAsakim.countCardPrevMonth = 0;
											all.banks.accounts.discountAsakim.sendCardsCtrl()
										}
									}
									else {
										discountAsakim.countCardPrevMonth += 1;
										discountAsakim.loadCardAllPrev();
									}
								}
							}
						})
					}
				})
				return false;
			}
		})
	}
	discountAsakim.loadLoan = function () {
		var urlLoan = "https://start.telebank.co.il/Retail/DiscountInternet/GUI2008/Main.aspx?fxyz=" + all.banks.accounts.discountAsakim.uuidPage;
		var forms = {
			"ctl00$ScriptManager1": "ctl00$ScriptManager1|ctl00$cmdButton",
			"ctl00$menu$TabStrip": '{"State":{},"TabState":{"ctl00_menu_TabStrip_ctl00":{"Selected":true},"ctl00_menu_TabStrip_ctl00_ctl00":{"Selected":true}}}',
			"ctl00_accountsSelect_AccountsCombo_index": all.banks.accounts.discountAsakim.accountNow,
			"ctl00$accountsSelect$hiddenSelectedAccountIndex": "0",
			"ctl00$accountsSelect$hiddenPersonalName": "",
			"ctl00_personalMenu_PersonalMenuCombo_index": "0",
			"ctl00$cmdName": "MenuCommand",
			'ctl00$cmdArgs': "LOANS_1",
			"__EVENTTARGET": "",
			"__EVENTARGUMENT": "",
			'__VIEWSTATE': all.banks.accounts.discountAsakim.VIEWSTATE,
			'__ASYNCPOST': 'true',
			'__VIEWSTATEGENERATOR': all.banks.accounts.discountAsakim.VIEWSTATEGENERATOR,
			'ctl00$cmdButton': 'Send Command'
		}
		$.ajax({
			url: urlLoan,
			beforeSend: function (xhr) {
				xhr.setRequestHeader('X-MicrosoftAjax', 'Delta=true');
			},
			data: forms,
			method: "POST",
			contentType: "application/x-www-form-urlencoded"
		})
		.done(function (data) {
			var dataReq = all.banks.core.services.parseHtml(data);
			myEmitterLogs(21);
			if (dataReq.text().split(' __action = "').length > 1 && dataReq.text().split(' __action = "')[1].split('";')[0] !== undefined) {
				loadLoans(dataReq);
			}
			else {
				var urlLoan = "https://start.telebank.co.il/Retail/DiscountInternet/GUI2008/Main.aspx?fxyz=" + all.banks.accounts.discountAsakim.uuidPage;
				var forms = {
					"ctl00$ScriptManager1": "ctl00$ScriptManager1|ctl00$cmdButton",
					"ctl00$menu$TabStrip": '{"State":{},"TabState":{"ctl00_menu_TabStrip_ctl00":{"Selected":true},"ctl00_menu_TabStrip_ctl00_ctl06":{"Selected":true}}}',
					"ctl00_accountsSelect_AccountsCombo_index": all.banks.accounts.discountAsakim.accountNow,
					"ctl00$accountsSelect$hiddenSelectedAccountIndex": "0",
					"ctl00$accountsSelect$hiddenPersonalName": "",
					"ctl00_personalMenu_PersonalMenuCombo_index": "0",
					"ctl00_subMenu_SubMenuCombo_index": "1",
					"ctl00$cmdName": "SubMenuCommand",
					'ctl00$cmdArgs': "SHLTARCHT_IN_LO_1",
					"__EVENTTARGET": "",
					"__EVENTARGUMENT": "",
					'__VIEWSTATE': all.banks.accounts.discountAsakim.VIEWSTATE,
					'__ASYNCPOST': 'true',
					'__VIEWSTATEGENERATOR': all.banks.accounts.discountAsakim.VIEWSTATEGENERATOR,
					'ctl00$cmdButton': 'Send Command'
				}
				$.ajax({
					url: urlLoan,
					beforeSend: function (xhr) {
						xhr.setRequestHeader('X-MicrosoftAjax', 'Delta=true');
					},
					data: forms,
					method: "POST",
					contentType: "application/x-www-form-urlencoded"
				})
				.done(function (data) {
					var dataReq = all.banks.core.services.parseHtml(data);
					loadLoans(dataReq);
				})
			}

			function loadLoans(dataReq) {
				if (dataReq.text().split(' __action = "').length > 1 && dataReq.text().split(' __action = "')[1].split('";')[0] !== undefined) {
					var urlFrame = "https://start.telebank.co.il" + dataReq.text().split(' __action = "')[1].split('";')[0];
					all.banks.core.services.httpReq(urlFrame, 'GET', null, false, false)
					.then(function (data) {
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
										date = date.split("/")[1] + "/" + date.split("/")[0] + "/" + date.split("/")[2];

										//var loanName = $(v).closest(".formatted-query-row").prev().prev().text().trim().replace(/\s/g, " ").split("").reverse().join().replace(/,/g, "").replace("(", "").replace(")", "");
										if (loanName == "") {
											loanName = null;
										}
										if (date.indexOf("/") !== -1) {
											var dataRows = {
												"TargetId": all.banks.accountDetails.bank.targetId,
												"Token": all.banks.accountDetails.bank.token,
												"ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
												"ExporterId": all.banks.spiderConfig.spiderId,
												'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
												'AccountNumber': all.banks.accounts.discountAsakim.account[all.banks.accounts.discountAsakim.accountNow].accNumber,
												'BranchNumber': all.banks.accounts.discountAsakim.account[all.banks.accounts.discountAsakim.accountNow].snif,
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
											}
											if (dataRows.LoanNextPaymentDate !== null && dataRows.NextPaymentTotal.replace(/\D/g, "") !== "") {
												all.banks.generalVariables.allDataArrLoan.push(dataRows);
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
									}
									if ($(res).find('.formatted-query-row').length == i + 1) {
										if (all.banks.accounts.discountAsakim.account.length > (all.banks.accounts.discountAsakim.accountNow + 1)) {
											all.banks.accounts.discountAsakim.accountNow = all.banks.accounts.discountAsakim.accountNow + 1;
											discountAsakim.changeAllAcc("loan");
										}
										else {
											all.banks.accounts.discountAsakim.sendLoanCtrl();
										}
									}
								})
							}
							else {
								if (all.banks.accounts.discountAsakim.account.length > (all.banks.accounts.discountAsakim.accountNow + 1)) {
									all.banks.accounts.discountAsakim.accountNow = all.banks.accounts.discountAsakim.accountNow + 1;
									discountAsakim.changeAllAcc("loan");
								}
								else {
									all.banks.accounts.discountAsakim.sendLoanCtrl();
								}
							}
						}
						catch (e) {
							if (all.banks.accounts.discountAsakim.account.length > (all.banks.accounts.discountAsakim.accountNow + 1)) {
								all.banks.accounts.discountAsakim.accountNow = all.banks.accounts.discountAsakim.accountNow + 1;
								discountAsakim.changeAllAcc("loan");
							}
							else {
								all.banks.accounts.discountAsakim.sendLoanCtrl();
							}
						}
					})
					.fail(function (error, resErr) {
						all.banks.core.services.errorLog('שגיאה')
					});
				}
				else {
					if (all.banks.accounts.discountAsakim.account.length > (all.banks.accounts.discountAsakim.accountNow + 1)) {
						all.banks.accounts.discountAsakim.accountNow = all.banks.accounts.discountAsakim.accountNow + 1;
						discountAsakim.changeAllAcc("loan");
					}
					else {
						all.banks.accounts.discountAsakim.sendLoanCtrl();
					}
				}
			}
		})
		.fail(function (error, resErr) {
			all.banks.core.services.errorLog('שגיאה')
		});
	};
	discountAsakim.loadDeposit = function () {
		var forms = {
			keepXml: false
		};
		$.ajax({
			url: "https://start.telebank.co.il/Telebank/investments/A_deposits/PakashMainTabs_Altamira.asp?sMenu_Id=DEP_PKS_DTL&showAllAccounts=false&lang=HEB&fxyz=" + all.banks.accounts.discountAsakim.uuidPage,
			beforeSend: function (xhr) {
				xhr.setRequestHeader('X-MicrosoftAjax', 'Delta=true');
			},
			data: forms,
			method: "POST",
			contentType: "application/x-www-form-urlencoded"
		})
		.done(function (data) {
			var urlDeposit = 'https://start.telebank.co.il/Telebank/investments/A_deposits/PakashMain_Altamira.asp?pageType=info&sMenu_Id=DEP_PKS_DTL&keepXml=true&tabIndex=1&windowId=';
			all.banks.core.services.httpReq(urlDeposit, 'GET', null, false, false)
			.then(function (data) {
				try {
					var res = all.banks.core.services.parseHtml(data);
					data = null;
					if (res.find("#gridTable #innerTable tr").length) {
						res.find("#gridTable #innerTable tr").each(function (i, v) {
							var val = $(v);
							//var depositDate = val.find("#PlacementDate").text().replace(/\s\s+/g, " ").trim().replace(/-/g,"/");
							//var dueDate = val.find("#MaturityDate").text().replace(/\s\s+/g, " ").trim().replace(/-/g,"/");
							//var depositExistStation = val.find("#NextExitDate").text().replace(/\s\s+/g, " ").trim();
							if (val.find("#Pikname").text().indexOf("תוכנית חיסכון מפתח") == -1) {
								var valDepositInterest = val.find("td#Rate").text();
								var depositInterest = 0;

								if (valDepositInterest.includes("P")) {
									val.find("td#Rate column").remove();
									var textDep = val.find("td#Rate").text().replace(/[^\d\.]/g, "");
									if (textDep !== "") {
										depositInterest = 100 - Number(textDep);
									}
								}
								else {
									val.find("td#Rate column").remove();
									var textDep = val.find("td#Rate").text().replace(/[^\d\.]/g, "");
									if (textDep !== "") {
										depositInterest = Number(textDep);
									}
								}
								all.banks.generalVariables.allDataArrDeposit.push({
									"TargetId": all.banks.accountDetails.bank.targetId,
									"Token": all.banks.accountDetails.bank.token,
									"ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
									"ExporterId": all.banks.spiderConfig.spiderId,
									'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
									'AccountNumber': all.banks.accounts.discountAsakim.account[all.banks.accounts.discountAsakim.accountNow].accNumber,
									'BranchNumber': all.banks.accounts.discountAsakim.account[all.banks.accounts.discountAsakim.accountNow].snif,
									"TypeName": val.find("#Pikname").text().replace(/\s\s+/g, " ").trim(),
									"DepositTotal": val.find("#PlacementAmount").text().replace("₪", "").replace(/,/g, '').replace(/\s/g, ""),
									"DepositAsTotal": val.find("#PaymentAmmount").text().replace("₪", "").replace(/,/g, '').replace(/\s/g, ""),
									"DueDate": all.banks.core.services.convertDateAll(discountAsakim.convertDateLocal(val.find("#MaturityDate").text().replace(/\s\s+/g, " ").trim())),
									"DepositDate": all.banks.core.services.convertDateAll(discountAsakim.convertDateLocal(val.find("#PlacementDate").text().replace(/\s\s+/g, " ").trim())),
									"DepositExistStation": all.banks.core.services.convertDateAll(discountAsakim.convertDateLocal(val.find("#NextExitDate").text().replace(/\s\s+/g, " ").trim())),
									"DepositNumber": val.find("#DepositAccountNumber").text().replace(/\D/g, "").slice(-9),
									"DepositInterest": depositInterest
								});
							}
							if (i + 1 == res.find("#gridTable #innerTable tr").length) {
								if (all.banks.accounts.discountAsakim.account.length > (all.banks.accounts.discountAsakim.accountNow + 1)) {
									all.banks.accounts.discountAsakim.accountNow = all.banks.accounts.discountAsakim.accountNow + 1;
									discountAsakim.changeAllAcc("deposit");
								}
								else {
									all.banks.accounts.discountAsakim.sendDepositCtrl();
								}
							}
						})
					}
					else {
						if (all.banks.accounts.discountAsakim.account.length > (all.banks.accounts.discountAsakim.accountNow + 1)) {
							all.banks.accounts.discountAsakim.accountNow = all.banks.accounts.discountAsakim.accountNow + 1;
							discountAsakim.changeAllAcc("deposit");
						}
						else {
							all.banks.accounts.discountAsakim.sendDepositCtrl();
						}
					}
				}
				catch (e) {
					debugger
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
	}
	discountAsakim.loadDueChecksBitahon = function (checkstype) {
		var urlDueChecksBitahon = "https://start.telebank.co.il/Telebank/currentaccount/postponedcheckes/PostponedCheckesTabs_Altamira.asp?sMenu_Id=OSH_POSTPONDSAFE_CHECKS_ALT&draftType=" + checkstype + "&fxyz=" + all.banks.accounts.discountAsakim.uuidPage;
		all.banks.core.services.httpReq(urlDueChecksBitahon, 'GET', null, false, false)
		.then(function (data) {
			// var urlLoan = "https://start.telebank.co.il/Retail/DiscountInternet/GUI2008/Main.aspx?fxyz=" + all.banks.accounts.discountAsakim.uuidPage;
			// var forms = {
			//     "ctl00$ScriptManager1": "ctl00$ScriptManager1|ctl00$cmdButton",
			//     "ctl00$menu$TabStrip": '{"State":{},"TabState":{"ctl00_menu_TabStrip_ctl00":{"Selected":true},"ctl00_menu_TabStrip_ctl00_ctl00":{"Selected":true}}}',
			//     "ctl00_accountsSelect_AccountsCombo_index": all.banks.accounts.discountAsakim.accountNow,
			//     "ctl00$accountsSelect$hiddenSelectedAccountIndex": "0",
			//     "ctl00$accountsSelect$hiddenPersonalName": "",
			//     "ctl00_personalMenu_PersonalMenuCombo_index": "0",
			//     "ctl00$cmdName": "MenuCommand",
			//     'ctl00$cmdArgs': "OSH_POSTPOND_CHECKS_ALT",
			//     "__EVENTTARGET": "",
			//     "__EVENTARGUMENT": "",
			//     '__VIEWSTATE': all.banks.accounts.discountAsakim.VIEWSTATE,
			//     '__ASYNCPOST': 'true',
			//     '__VIEWSTATEGENERATOR': all.banks.accounts.discountAsakim.VIEWSTATEGENERATOR,
			//     'ctl00$cmdButton': 'Send Command'
			// }
			// $.ajax({
			//     url: urlLoan,
			//     beforeSend: function (xhr) {
			//         xhr.setRequestHeader('X-MicrosoftAjax', 'Delta=true');
			//     },
			//     data: forms,
			//     method: "POST",
			//     contentType: "application/x-www-form-urlencoded"
			// })
			//     .done(function (data) {
			var url = "https://start.telebank.co.il/Telebank/currentaccount/postponedcheckes/PostponedChecksMain_Altamira.asp?pageType=details&sMenu_Id=OSH_POSTPONDSAFE_CHECKS_ALT&draftType=" + checkstype + "&tabIndex=0&windowId=";

			all.banks.core.services.httpReq(url, 'GET', null, false, false)
			.then(function (data) {
				var dataReq = all.banks.core.services.parseHtml(data);
				var accUrl = dataReq.find('[name="OneAccountNumber"]').val();
				if (dataReq.find('[name="OneAccountNumber"]').length) {
					var dateToFormat = new Date(new Date().getFullYear(), new Date().getMonth() + 36, new Date().getDate());
					var dateTo = ("0" + (dateToFormat.getDate())).slice(-2) + ' - ' + ("0" + (dateToFormat.getMonth() + 1)).slice(-2) + ' - ' + dateToFormat.getFullYear().toString();
					var dateFrom = ("0" + (new Date().getDate())).slice(-2) + ' - ' + ("0" + (new Date().getMonth() + 1)).slice(-2) + ' - ' + new Date().getFullYear().toString();

					var url = "https://start.telebank.co.il/Telebank/currentaccount/postponedcheckes/PostponedChecksMain_Altamira.asp?pageType=details&draftType=" + checkstype + "&fxyz=" + all.banks.accounts.discountAsakim.uuidPage + "&draftAccNum=" + accUrl + "&toDate=" + dateTo + "&fromDate=" + dateFrom + "&tabIndex=0";
					all.banks.core.services.httpReq(url, 'GET', null, false, false)
					.then(function (res) {
						var data = all.banks.core.services.parseHtml(res);

						if (data.find('#innerTable').length) {
							data.find('#innerTable tr').each(function (i, v) {
								all.banks.generalVariables.allDataArrDueChecks.push({
									"TargetId": all.banks.accountDetails.bank.targetId,
									"Token": all.banks.accountDetails.bank.token,
									"ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
									"ExporterId": all.banks.spiderConfig.spiderId,
									'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
									'AccountNumber': all.banks.accounts.discountAsakim.account[all.banks.accounts.discountAsakim.accountNow].accNumber,
									'BranchNumber': all.banks.accounts.discountAsakim.account[all.banks.accounts.discountAsakim.accountNow].snif,
									"CheckNumber": $(v).find('#CheckNum').text(),
									"CheckDescription": $(v).find('#CheckStatusDescription').text().trim(),
									"DepositeDate": all.banks.core.services.convertDateAll(discountAsakim.convertDateLocal($(v).find('#DepositDate').text().replace(/\s\s+/g, " ").trim())),
									"DueDate": all.banks.core.services.convertDateAll(discountAsakim.convertDateLocal($(v).find('#PaymentDate').text().replace(/\s\s+/g, " ").trim())),
									"CheckTotal": $(v).find('#CheckAmount').text().replace(/ /g, '').replace(/,/g, "").replace(/\s/g, ""),
									"CheckBankNumber": $(v).find('#CheckBankID').text(),
									"CheckAccountNumber": $(v).find('#CheckAccountID').text(),
									"CheckBranchNumber": $(v).find('#CheckBranchID').text()
								});

								if ($(data).find('#innerTable tr').length == i + 1) {
									if (discountAsakim.govaina) {
										discountAsakim.govaina = false;
										discountAsakim.bitahon = true;

										discountAsakim.loadDueChecksBitahon(1);
									}
									else if (discountAsakim.bitahon) {
										discountAsakim.bitahon = false;
										discountAsakim.nikaion = true;
										discountAsakim.loadDueChecksBitahon(2);

									}
									else {
										if (all.banks.accounts.discountAsakim.account.length > (all.banks.accounts.discountAsakim.accountNow + 1)) {
											all.banks.accounts.discountAsakim.accountNow = all.banks.accounts.discountAsakim.accountNow + 1;
											discountAsakim.changeAllAcc("duechecks");
										}
										else {
											all.banks.accounts.discountAsakim.sendDueChecksCtrl();
										}
									}

								}
							})
						}
						else {
							if (discountAsakim.govaina) {
								discountAsakim.govaina = false;
								discountAsakim.bitahon = true;

								discountAsakim.loadDueChecksBitahon(1);
							}
							else if (discountAsakim.bitahon) {
								discountAsakim.bitahon = false;
								discountAsakim.nikaion = true;
								discountAsakim.loadDueChecksBitahon(2);

							}
							else {
								if (all.banks.accounts.discountAsakim.account.length > (all.banks.accounts.discountAsakim.accountNow + 1)) {
									all.banks.accounts.discountAsakim.accountNow = all.banks.accounts.discountAsakim.accountNow + 1;
									discountAsakim.changeAllAcc("duechecks");
								}
								else {
									all.banks.accounts.discountAsakim.sendDueChecksCtrl();
								}
							}
						}

					});
				}
				else {
					if (discountAsakim.govaina) {
						discountAsakim.govaina = false;
						discountAsakim.bitahon = true;
						discountAsakim.loadDueChecksBitahon(1);
					}
					else if (discountAsakim.bitahon) {
						discountAsakim.bitahon = false;
						discountAsakim.nikaion = true;
						discountAsakim.loadDueChecksBitahon(2);
					}
					else {
						if (all.banks.accounts.discountAsakim.account.length > (all.banks.accounts.discountAsakim.accountNow + 1)) {
							all.banks.accounts.discountAsakim.accountNow = all.banks.accounts.discountAsakim.accountNow + 1;
							discountAsakim.changeAllAcc("duechecks");
						}
						else {
							all.banks.accounts.discountAsakim.sendDueChecksCtrl();
						}
					}
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
	discountAsakim.loadStandingOrders = function () {
		var urlOrder = "https://start.telebank.co.il/Retail/DiscountInternet/GUI2008/Main.aspx?fxyz=" + all.banks.accounts.discountAsakim.uuidPage;
		var forms = {
			"ctl00$ScriptManager1": "ctl00$ScriptManager1|ctl00$cmdButton",
			"ctl00$menu$TabStrip": '{"State":{},"TabState":{"ctl00_menu_TabStrip_ctl00":{"Selected":true},"ctl00_menu_TabStrip_ctl00_ctl00":{"Selected":true}}}',
			"ctl00_accountsSelect_AccountsCombo_index": all.banks.accounts.discountAsakim.accountNow,
			"ctl00$accountsSelect$hiddenSelectedAccountIndex": "0",
			"ctl00$accountsSelect$hiddenPersonalName": "",
			"ctl00_personalMenu_PersonalMenuCombo_index": "0",
			"ctl00$cmdName": "MenuCommand",
			'ctl00$cmdArgs': "DEBIT_AUTHORIZATION",
			"__EVENTTARGET": "",
			"__EVENTARGUMENT": "",
			'__VIEWSTATE': all.banks.accounts.discountAsakim.VIEWSTATE,
			'__ASYNCPOST': 'true',
			'__VIEWSTATEGENERATOR': all.banks.accounts.discountAsakim.VIEWSTATEGENERATOR,
			'ctl00$cmdButton': 'Send Command'
		}
		$.ajax({
			url: urlOrder,
			beforeSend: function (xhr) {
				xhr.setRequestHeader('X-MicrosoftAjax', 'Delta=true');
			},
			data: forms,
			method: "POST",
			contentType: "application/x-www-form-urlencoded"
		})
		.done(function (data) {
			var res = all.banks.core.services.parseHtml(data);
			if (res.find(" .MasterTable_Discount > tbody tr").length) {
				res.find(".MasterTable_Discount > tbody tr").each(function (i, v) {
					all.banks.generalVariables.allDataArrStandingOrders.push({
						"TargetId": all.banks.accountDetails.bank.targetId,
						"Token": all.banks.accountDetails.bank.token,
						'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
						'AccountNumber': all.banks.accounts.discountAsakim.account[all.banks.accounts.discountAsakim.accountNow].accNumber,
						'BranchNumber': all.banks.accounts.discountAsakim.account[all.banks.accounts.discountAsakim.accountNow].snif,
						"ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
						"ExporterId": all.banks.spiderConfig.spiderId,
						"OrderName": $(v).find("td").eq(1).text().trim(),
						"OrderOpeningDate": all.banks.core.services.convertDateAll(discountAsakim.convertDateLocal($(v).find("td").eq(3).text().trim())),
						"OrderLastDate": all.banks.core.services.convertDateAll(discountAsakim.convertDateLocal($(v).find("td").eq(4).text().trim())),
						"OrderTotal": $(v).find("td").eq(5).text().replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, ''),
						"OrderNumber": $(v).find("td").eq(0).text().trim(),
						"Asmachta": null,
						BankTransferNumber: null,
						BranchTransferNumber: null,
						AccountTransferNumber: null,
						NamePayerTransfer: null,
						Type: 2,
					});
					if (res.find(".MasterTable_Discount > tbody tr").length == i + 1) {
						myEmitterLogs(12, i + 1); //length arr
						if (all.banks.accounts.discountAsakim.account.length > (all.banks.accounts.discountAsakim.accountNow + 1)) {
							all.banks.accounts.discountAsakim.accountNow = all.banks.accounts.discountAsakim.accountNow + 1;
							discountAsakim.changeAllAcc("orders");
						}
						else {
							all.banks.accounts.discountAsakim.sendStandingOrdersCtrl();
						}
					}
				})
			}
			else {
				if (all.banks.accounts.discountAsakim.account.length > (all.banks.accounts.discountAsakim.accountNow + 1)) {
					all.banks.accounts.discountAsakim.accountNow = all.banks.accounts.discountAsakim.accountNow + 1;
					discountAsakim.changeAllAcc("orders");
				}
				else {
					all.banks.accounts.discountAsakim.sendStandingOrdersCtrl();
				}
			}

		})
		.fail(function (error, resErr, urlParam) {
			var logErr = "restUrl: " + urlParam + ", status: " + error.status;
			all.banks.core.services.errorLog(logErr)
		});
	}
	discountAsakim.matah = function () {
		var urlRe = "https://start.telebank.co.il/Telebank/foreignCurrency/FrnLastEntries/FrnLentriesAccounts.asp?fxyz=" + all.banks.accounts.discountAsakim.uuidPage;
		all.banks.core.services.httpReq(urlRe, 'GET', null, false, false)
		.then(function (data) {
			try {
				var res = all.banks.core.services.parseHtml(data);
				if (res.find("#frnLentries_ACC_TR script").length) {
					var accMatah = res.find("#frnLentries_ACC_TR script");
					loadAccMathah(accMatah, res);
				}
				else {
					if (all.banks.accounts.discountAsakim.account.length > (all.banks.accounts.discountAsakim.accountNow + 1)) {
						all.banks.accounts.discountAsakim.accountNow = all.banks.accounts.discountAsakim.accountNow + 1;
						discountAsakim.changeAllAcc("matah");
					}
					else {
						all.banks.accounts.discountAsakim.sendOshCtrl(true);
					}
				}
			}
			catch (e) {
				debugger
			}

		})


		var index = 0;

		function loadAccMathah(accMatah) {
			try {
				accMatah.each(function (i, v) {
					if (i == index) {
						index++;
						if ($(v).text().split("value = '").length > 1) {
							console.log($(v).text().split("value = '")[1].split('@OK')[0])
							var bankDetals = $(v).text().split("value = '")[1].split('@OK')[0];
							var urlGet = "https://start.telebank.co.il/Retail/Telebank/foreignCurrency/FrnLastEntries/NewFrnLentries_Altamira.asp?accountDetails=" + bankDetals + "&NumOfTrans=&retrieveType=&fromDate=" + all.banks.accounts.discuontAsakimPlus.datebacksleshMatah + "&toDate=" + all.banks.accounts.discuontAsakimPlus.datebacksleshToMatah + "&pageNum=&accStatus=OK";
							all.banks.core.services.httpReq(urlGet, 'GET', null, false, false)
							.then(function (data) {
								var urlSubAccMAtah = "https://start.telebank.co.il/Retail/Telebank/foreignCurrency/FrnLastEntries/NewFrnLentries_Altamira.asp?accountDetails=" + bankDetals + "&fromDate=" + all.banks.accounts.discuontAsakimPlus.datebacksleshMatah + "&toDate=" + all.banks.accounts.discuontAsakimPlus.datebacksleshToMatah + "&NumOfTrans=&retrieveType=&pageNum=&accStatus=OK&fxyz" + all.banks.accounts.discountAsakim.uuidPage;
								var json = {
									'isPostBack': '1',
									'gridName': 'FrnLentriesGrid',
									'expandGridStatus': '',
									'pageNum': '-1',
									'colNumberFilter': '',
									'colTypeFilter': '',
									'colType': '',
									'filterWinOpened': '0'
								}
								all.banks.core.services.httpReq(urlSubAccMAtah, 'POST', json, true, false)
								.then(function (data) {
									try {
										var res = all.banks.core.services.parseHtml(data);
										var currencyid = all.banks.core.services.getTypeCurrencyAll(res.find(".oneLineBG .freeColumn tr td").eq(1).text(), true);
										var acc = {
											'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
											'AccountNumber': $(v).text().split("value = '")[1].split('@OK')[0].split('-')[2],
											'BranchNumber': all.banks.accounts.discountAsakim.account[all.banks.accounts.discountAsakim.accountNow].snif,
											'Balance': res.find(" .oneLineBG .freeColumn tr td").eq(4).text().replace("₪", "").replace(/,/g, '').replace(/\s/g, ""),
											'AccountCredit': null,
											"BankAccountTypeId": all.banks.accounts.discountAsakim.account[all.banks.accounts.discountAsakim.accountNow].accNumber,
											"CurrencyId": currencyid
										};
										all.banks.generalVariables.allDataArrMatah.BankData[0].Account.push(acc);
										all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow = [];
										if (res.find("#innerTable").length) {
											var dateInd, descInd, asmachtaInd, totalInd, balanceInd;
											res.find('#outerTable > tr > th').each(function (ind, val) {
												var textTh = $(val).text();
												if (textTh.indexOf("תאריך") !== -1) {
													dateInd = ind;
												}
												else if (textTh.indexOf("תיאור") !== -1) {
													descInd = ind;
												}
												else if (textTh.indexOf("אסמכתה") !== -1) {
													asmachtaInd = ind;
												}
												else if (textTh.indexOf("זכות") !== -1) {
													totalInd = ind;
												}
												else if (textTh.indexOf("יתרה") !== -1) {
													balanceInd = ind;
												}

												if (res.find('#outerTable > tr > th').length == ind + 1) {
													res.find("#innerTable > tr").each(function (i1, v1) {
														var transactionType = '0';
														if ($(v1).find('td').eq(totalInd).text().indexOf('-') == -1) {
															transactionType = '1';
														}
														all.banks.generalVariables.allDataArrMatah.BankData[0].Account[all.banks.generalVariables.allDataArrMatah.BankData[0].Account.length - 1].DataRow.push({
															"Asmachta": $(v1).find('td').eq(asmachtaInd).text().replace('/', '').replace(/\D/g, ""),
															"TransDesc": $(v1).find('td').eq(descInd).text().replace(/\s\s+/g, " "),
															"ValueDate": all.banks.core.services.convertDateAll(discountAsakim.convertDateLocal($(v1).find('td').eq(dateInd).text().trim())),
															"TransactionType": transactionType,
															"TransTotal": Math.abs($(v1).find('td').eq(totalInd).text().replace(/,/g, '').replace(/\s/g, "")),
															"Balance": $(v1).find('td').eq(balanceInd).text().replace(/,/g, '').replace(/\s/g, ""),
															"IsDaily": "0",
															"imgs": null,
															"DepositeTransferData": null
														})
														if (res.find("#innerTable > tr").length == i1 + 1) {
															if (res.find("#frnLentries_ACC_TR script").length == i + 1) {
																if (all.banks.accounts.discountAsakim.account.length > (all.banks.accounts.discountAsakim.accountNow + 1)) {
																	all.banks.accounts.discountAsakim.accountNow = all.banks.accounts.discountAsakim.accountNow + 1;
																	discountAsakim.changeAllAcc("matah");
																}
																else {
																	all.banks.accounts.discountAsakim.sendOshCtrl(true);
																}

															}
															else {
																loadAccMathah(accMatah);
															}
														}


													})
												}
											})
										}
										else {
											if (res.find("#frnLentries_ACC_TR script").length == i + 1) {
												if (all.banks.accounts.discountAsakim.account.length > (all.banks.accounts.discountAsakim.accountNow + 1)) {
													all.banks.accounts.discountAsakim.accountNow = all.banks.accounts.discountAsakim.accountNow + 1;
													discountAsakim.changeAllAcc("matah");
												}
												else {
													all.banks.accounts.discountAsakim.sendOshCtrl(true);
												}
											}
											else {
												loadAccMathah(accMatah);
											}
										}
									}
									catch (e) {
										debugger
									}

									return false;
								})
								return false;
							})

						}
						else {
							loadAccMathah(accMatah);

						}
						return false;
					}

				})
			}
			catch (e) {
				debugger
			}
		}

	}
	discountAsakim.logOut = function () {
		$.ajax({
			url: "https://start.telebank.co.il/Retail/DiscountInternet/GUI2008/Main.aspx?fxyz=" + all.banks.accounts.discountAsakim.uuidPage,
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Upgrade-Insecure-Requests', '1');
			},
			data: {
				'__EVENTTARGET': 'ctl00$header$ExitButton',
				'__EVENTARGUMENT': '',
				'__VIEWSTATE': all.banks.accounts.discountAsakim.VIEWSTATE,
				'ctl00$menu$TabStrip': '{"State":{},"TabState":{"ctl00_menu_TabStrip_ctl00":{"Selected":true},"ctl00_menu_TabStrip_ctl00_ctl00":{"Selected":true}}}',
				'ctl00$accountsSelect$hiddenSelectedAccountIndex': '0',
				'ctl00$accountsSelect$hiddenPersonalName': '(unable to decode value)',
				'ctl00_personalMenu_PersonalMenuCombo_index': '0',
				'ctl00$cmdName': '',
				'ctl00$cmdArgs': ''
			},
			method: "POST",
			contentType: "application/x-www-form-urlencoded"
		}).done(function (data) {
			$.ajax({
				url: "https://start.telebank.co.il/Trade/index.php/last_interested_securities/clear_interested_securities_cookie/",
				method: "POST"
			}).done(function (res) {
				$.ajax({
					url: "https://start.telebank.co.il/Trade/index.php/logout",
					method: "POST"
				}).done(function (res) {
					all.banks.core.services.httpReq("https://start.telebank.co.il/pkmslogout?lr=1", 'GET', null, false, false)
					.then(function (res) {
						$('#filecontainerlogin').attr('src', '')
						myEmitterLogs(25);
					})
					.fail(function (error, resErr, urlParam) {
						var logErr = "restUrl: " + urlParam + ", status: " + error.status;
						all.banks.core.services.errorLog(logErr)
					});
				})
				.fail(function (jqXHR, textStatus) {
					all.banks.core.services.errorLog('שגיאה')

				});
			}).fail(function (jqXHR, textStatus) {
				all.banks.core.services.errorLog('שגיאה')

			});
		}).fail(function (jqXHR, textStatus) {
			all.banks.core.services.errorLog('שגיאה')
		});
	}
	return discountAsakim;
}();



