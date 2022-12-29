class leumiCard {
    constructor() {
        this.siteVersion = 'V3.13-HF.6.26';
    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    exchange(options) {
        return new Promise((resolve, reject) => {
            monitorActivityClass.setIntervalActivity();

            writeLog("leumiCard: " + options.uri);

            options.json = true;
            options.headers = Object.assign(options.headers || {},
                {
                    Origin: 'https://www.max.co.il',
                    Referer: 'https://www.max.co.il/homepage/personal',
                    CAV: this.siteVersion,
                    SID: this.sid,
                    CID: ''
                },
                Object.keys(this.cookies).length
                    ? {
                        Cookie: Object.entries(this.cookies)
                            .map(pair => pair.join('='))
                            .join(';')
                    }
                    : {}
            );

            senderReq.sendersServer(options, (error, response, data) => {
                if (!error && response.statusCode < 400 && Array.isArray(response.headers["set-cookie"])) {
                    const newCookies = response.headers["set-cookie"]
                        .reduce((acmltr, ck) => {
                            const namevalPart = ck.split(";")[0];
                            const eqInx = namevalPart.indexOf("=");
                            acmltr[namevalPart.slice(0, eqInx)] = namevalPart.slice(eqInx + 1);
                            return acmltr;
                        }, {});
                    Object.assign(this.cookies, newCookies);
                }
                console.log("leumiCard: " + options.uri, response.statusCode, data);
                resolve([error, response, data]);
            });
        });
    }

    async login() {
        this.sid = this.uuidv4();
        this.cookies = {};
        // https://online.max.co.il/Anonymous/Login/CardholdersLogin.aspx
        const regCheckPassChar = new RegExp("^[0-9a-zA-Z%`~!@#\\$\\^&\\*\\(\\)\\-_\\=\\+\\[\\]\\{\\};:'/\\|\\?,//.\"\\\\]{1,100}$")
        if (!regCheckPassChar.test(all.banks.accountDetails.bank.password.slice(0, 14))) {
            myEmitterLogs(5, 'הקלדת אותיות וסימנים לא חוקיים');
            return;
        }

        const [error, response, data] = await this.exchange({
            uri: 'https://www.max.co.il/api/login/login',
            method: 'POST',
            body: {
                "username": all.banks.accountDetails.bank.username.slice(0, 55),
                "password": all.banks.accountDetails.bank.password.slice(0, 14),
                "id": null
            }
        });

        if (error || !data || !data.Result) {
            myEmitterLogs(9, error);
            return;
        }

        if (data.Result.LoginStatus !== 0 && !((data.Result.LoginStatus === 6 || data.Result.LoginStatus === 5) && data.Result.LoginCode === 0)) {
            if (data.Result.LoginStatus === 1) {
                myEmitterLogs(6);
            } else if (data.Result.LoginStatus === 4) {
                myEmitterLogs(8);
            } else {
                myEmitterLogs(5);
            }
            return;
        }

        if (all.banks.openBankPage) {
            Object.entries(this.cookies)
                .forEach(([n, v]) => {
                    win.cookies.set({
                        url: "https://online.max.co.il",
                        name: n,
                        domain: ".max.co.il", // "online.max.co.il",
                        value: v
                    });
                });
            setTimeout(() => all.banks.core.services.openBankPage('https://www.max.co.il/homepage/personal'),
                1000);
//            all.banks.core.services.openBankPage('https://www.max.co.il/homepage/personal');
            return;
        }


        try {
            await this.process();
            myEmitterLogs(25);
        } catch (exception) {
            myEmitterLogs(9, exception, exception.stack);
        } finally {
            await this.logout();
        }

        monitorVpn.killVpn(() => {
        });
    }

    async process() {
        const [error, response, data] = await this.exchange({
            uri: 'https://www.max.co.il/api/registered/getHomePageData?v=' + this.siteVersion,
            method: 'GET'
        });

        let cycles, cardi = 0, cyclei = 0;
        let collected = [], classRef = this;
        let commonPart = {
            "TargetId": all.banks.accountDetails.bank.targetId,
            "Token": all.banks.accountDetails.bank.token,
            "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
            "ExporterId": all.banks.spiderConfig.spiderId,
            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
            "BranchNumber": null,
            "AccountNumber": null
        };
        if (data && data.Result && data.Result.UserCards && Array.isArray(data.Result.UserCards.Cards)) {

            cycles = prepareCycles();
            writeLog('Processing cycles: ' + cycles.map(c => c.date).join(', ')
                + ' for ' + data.Result.UserCards.Cards.length + ' cards.');

            for (; cardi < data.Result.UserCards.Cards.length; cardi++) {
                await processCard();
            }
        }
        await sendCardsCtrl();

        async function processCard() {
            cyclei = 0;
            const card = data.Result.UserCards.Cards[cardi];
            myEmitterLogs(15, card.Last4Digits);
            commonPart.CardNumber = card.Last4Digits;
            commonPart.CardType = all.banks.core.services.getTypeCard(card.CardName, 24);
            for (; cyclei < cycles.length; cyclei++) {
                await processCycle();
            }
        }

        async function processCycle() {
            const card = data.Result.UserCards.Cards[cardi],
                cycle = cycles[cyclei];

            writeLog('Processing cycle ' + cycle.date
                + ' for card ' + card.CardName + ' (' + card.Last4Digits + ')...');
            const [error, response, cycleData] = await classRef.exchange({
                uri: 'https://www.max.co.il/api/registered/transactionDetails/getTransactionsAndGraphs'
                    + '?filterData=' + encodeURIComponent(JSON.stringify(Object.assign({
                        "userIndex": -1,
                        "cardIndex": card.Index
                    }, cycle)))
                    + '&v=' + classRef.siteVersion,
                method: 'GET'
            });

            if (cycleData && cycleData.result && cycleData.result.transactions && Array.isArray(cycleData.result.transactions)) {
                const cycleTotalILS = cycleData.result.totalCycle.find(tc => tc.currency === 376).totalAmount;
                const collectedForCardInCycle = cycleData.result.transactions
                    .filter(tr => tr.paymentDate)
                    .map(tr => {
                        const matchPymnts = (tr.planName.includes('תשלומים') || tr.planName.includes('קרדיט'))
                            && /(\d{1,2})\s*(מ|מתוך)\s*(\d{1,2})/g.exec(tr.comments);
                        return {
                            NextBillingDate: toBiziboxDateStr(tr.paymentDate),
                            NextCycleTotal: cycleTotalILS,
                            TransDesc: tr.merchantName,
                            TransTotal: tr.actualPaymentAmount,
                            ValueDate: toBiziboxDateStr(tr.purchaseDate),
                            TransCategory: null,
                            business_address: all.banks.accountDetails.isCategory ? tr.merchantData.address : null,
                            business_phone: all.banks.accountDetails.isCategory ? tr.merchantData.merchantPhone : null,
                            TotalPayments: !!matchPymnts ? matchPymnts[3] : null,
                            CurrentPaymentNum: !!matchPymnts ? matchPymnts[1] : null,
                            ind_iskat_hul: toBiziboxCurrency(tr.paymentCurrency),
                            currency_id: all.banks.core.services.getTypeCurrencyAll(tr.originalCurrency),
                            original_total: tr.originalAmount,
                            comment: tr.comments
                        };
                    });

                collected = collected.concat(collectedForCardInCycle
                    .map(tr => Object.assign(tr, commonPart)));
                writeLog('Processing cycle ' + cycle.date
                    + ' for card ' + card.CardName + ' (' + card.Last4Digits + ')...'
                    + ' Got ' + collectedForCardInCycle.length);
            } else {
                writeLog('Processing cycle ' + cycle.date
                    + ' for card ' + card.CardName + ' (' + card.Last4Digits + ')...'
                    + ' Got nothing');

            }
        }

        function prepareCycles() {
            const cycles = [], now = new Date();
            for (let i = -1, endOfMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0); i < all.banks.accountDetails.ccardMonth;
                 i++, endOfMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 0)) {
                cycles.push(endOfMonth);
            }
//        console.log('cycles => %o', cycles);
            return cycles
                .map(c => {
                    return {
                        "monthView": true,
                        "date": // "2019-07-11"
                            [String(c.getFullYear()), String(c.getMonth() + 1), String(c.getDate())]
                                .map(str => str.padStart(2, '0')).join('-'),
                        "dates": {
                            "startDate": "0",
                            "endDate": "0"
                        }
                    };
                });
        }

        function toBiziboxDateStr(val) {
            if (!val) {
                debugger;
            }
            return val.split('T')[0].split('-').reverse().join('/');
        }

        function toBiziboxCurrency(val) {
            let biziboxKnownVal;
            switch (val) {
                case 840:
                    biziboxKnownVal = 'USD';
                    break;
                case 978:
                    biziboxKnownVal = 'EUR';
                    break;
                case 376:
                    biziboxKnownVal = 'ILS';
                    break;
            }

            return all.banks.core.services.getTypeCurrencyAll(biziboxKnownVal);
        }

        async function sendCardsCtrl() {
            try {
                writeLog('Sending results...');
                myEmitterLogs(16);
                await all.banks.core.services.sendCards(collected);
            } catch (e) {
                if (e === 'discard') {
                    await sendCardsCtrl();
                }
            }
        }
    }

    async logout() {
        writeLog('Logging out...');
        const [error, response, data] = await this.exchange({
            uri: 'https://www.max.co.il/api/login/logoff',
            method: 'POST',
            body: {}
        });
    }
}

all.banks.accounts.leumiCardAll = new leumiCard();

//class leumiCard {
//	constructor() {
//		this.cookies = "";
//		this.idxMonth = 0;
//		this.idxCards = 0;
//		this.eventVal = "";
//		this.param = "";
//		this.pathUrl = "";
//		this.logoutTime = 0;
//		this.arrOfCard = [];
//		this.monthOfCard = [];
//		this.arr = [];
//	}
//
//	leumiPost(...args) {
//		monitorActivityClass.setIntervalActivity();
//		let [url, Referer, cookie, body] = args;
//		writeLog("visaPost: " + url);
//		return new Promise((resolve, reject) => {
//			var options = {
//				uri: url,
//				family: 4,
//				timeout: 40000,
//				form: body,
//				method: "POST",
//				body: "POST",
//				headers: {
//					'Upgrade-Insecure-Requests': "1",
//					"Content-Type": "application/x-www-form-urlencoded",
//					"Host": "online.max.co.il",
//					"Origin": "https://online.max.co.il",
//					'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
//				}
//			};
//			if (cookie !== null) {
//				options.headers.Cookie = cookie;
//			}
//			if (Referer !== null) {
//				options.headers.Referer = Referer;
//			}
//			senderReq.sendersServer(options, (error, response, data) => {
//				//resolve([error, response, data]);
//
//				if (response !== undefined) {
//					if (response.headers !== undefined) {
//						if (response.headers["set-cookie"]) {
//							this.getSetCookies(response.headers["set-cookie"])
//							.then((res) => {
//								resolve([error, response, data]);
//							});
//						}
//						else {
//							resolve([error, response, data]);
//						}
//					}
//					else {
//						resolve([error, response, data]);
//					}
//				}
//				else {
//					resolve([error, response, data]);
//				}
//			});
//		});
//	}
//
//	leumiRestGet(...args) {
//		let [url, Referer, cookie] = args;
//		monitorActivityClass.setIntervalActivity();
//		writeLog("visaRestGet: " + url);
//		return new Promise((resolve, reject) => {
//			let options = {
//				"uri": url,
//				"family": 4,
//				"method": "GET",
//				"timeout": 40000,
//				"headers": {
//					"Connection": "keep-alive",
//					"Upgrade-Insecure-Requests": "1",
//					"Host": "online.max.co.il",
//					'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
//				}
//			}
//			if (cookie !== null) {
//				options.headers.Cookie = cookie;
//			}
//			if (Referer !== null) {
//				options.headers.Referer = Referer;
//			}
//			senderReq.sendersServer(options, (error, response, data) => {
//				//resolve([error, response, data]);
//				if (response !== undefined) {
//					if (response.headers !== undefined) {
//						if (response.headers["set-cookie"]) {
//							this.getSetCookies(response.headers["set-cookie"])
//							.then((res) => {
//								resolve([error, response, data]);
//							});
//						}
//						else {
//							resolve([error, response, data]);
//						}
//					}
//					else {
//						resolve([error, response, data]);
//					}
//				}
//				else {
//					resolve([error, response, data]);
//				}
//			});
//		});
//	}
//
//	getSetCookies(cookie) {
//		return new Promise((resolve, reject) => {
//			try {
//				var cookSplit = this.cookies.split(";");
//				var i, len = cookie.length;
//				if (len) {
//					for (i = 0; i < len; i++) {
//						var v = cookie[i];
//						var name = v.split(";")[0].split("=")[0].replace(/\s/g, "");
//						var val = v.split(";")[0].split("=")[1].replace(/\s/g, "");
//						var exist = 0;
//						var i1, len1 = cookSplit.length;
//						for (i1 = 0; i1 < len1; i1++) {
//							var v1 = cookSplit[i1];
//							if (v1 !== "") {
//								var nameExist = v1.split("=")[0].replace(/\s/g, "");
//								var valExist = v1.split("=")[1].replace(/\s/g, "");
//								if (nameExist === name) {
//									exist = 1;
//									if (val !== valExist) {
//										cookSplit[i1] = v.split(";")[0] + ";"
//									}
//								}
//							}
//						}
//						if (exist === 0) {
//							cookSplit.unshift(cookie[i].split(";")[0])
//						}
//						if (len === i + 1) {
//							//console.log(cookSplit);
//							this.cookies = cookSplit.join(";");
//							resolve(true)
//						}
//					}
//				}
//				else {
//					resolve(true)
//				}
//			}
//			catch (e) {
//				debugger
//			}
//		});
//	}
//
//	sendCardsCtrl() {
//		writeLog("sendCardsCtrl");
//		all.banks.core.services.sendCards(this.arr)
//		.then((arr) => {
//			this.logOut();
//		})
//		.fail((error, resErr) => {
//			if (error == 'discard') {
//				this.sendCardsCtrl();
//			}
//		});
//	}
//
//	async login() {
//		try {
//			writeLog("login");
//			var args = await this.leumiRestGet(
//				"https://online.max.co.il/Anonymous/Login/CardHoldersLogin.aspx",
//				null,
//				null
//			);
//			var [error, response, data] = [...args];
//			var dataRes = all.banks.core.services.parseHtml(data);
//			var serializeForm = dataRes.find("form").serializeArray();
//			var obj = {};
//			serializeForm.forEach((vals) => {
//				obj[vals.name] = vals.value;
//			});
//			obj["ctl00$PlaceHolderMain$CardHoldersLogin1$txtUserName"] = all.banks.accountDetails.bank.username.slice(0, 55);
//			obj["ctl00$PlaceHolderMain$CardHoldersLogin1$txtPassword"] = all.banks.accountDetails.bank.password.slice(0, 14);
//			obj["ctl00$PlaceHolderMain$CardHoldersLogin1$btnLogin"] = "כניסה לאזור האישי";
//			obj["__SCROLLPOSITIONY"] = "250";
//			//console.log(obj);
//			var args = await this.leumiPost(
//				"https://online.max.co.il/Anonymous/Login/CardHoldersLogin.aspx",
//				"https://online.max.co.il/Anonymous/Login/CardHoldersLogin.aspx",
//				this.cookies,
//				obj
//			);
//			var [error, response, data] = [...args];
//			var rid = response.headers.location;
//			if (rid !== undefined) {
//				if (rid.includes("PasswordExpired.aspx")) {
//					myEmitterLogs(6);
//				}
//                                else if(rid.includes('LoginAggreement.aspx') || rid.includes('CreditLawSigning.aspx')) {
//                                        myEmitterLogs(36);
//                                }
////				else if (!rid.includes("HomePage")) {
////					myEmitterLogs(9, 'system unavailable');
////				}
//				else {
//					// console.log(response.headers);
//					// console.log(this.cookies);
////					var args = await this.leumiRestGet(
////						`https://online.max.co.il${rid}`,
////						"https://online.max.co.il/Anonymous/Login/CardHoldersLogin.aspx",
////						this.cookies
////					);
////					var [error, response, data] = [...args];
//
//					if (!all.banks.openBankPage) {
//						var args = await this.leumiRestGet(
//							"https://online.max.co.il/Registred/Transactions/ChargesDeals.aspx",
//							'https://www.max.co.il/homepage/personal', // `https://online.max.co.il${rid}`,
//							this.cookies
//						);
//						var [error, response, data] = [...args];
//						var dataRes = all.banks.core.services.parseHtml(data);
//						try {
//							dataRes.find("select[name='ctl00$PlaceHolderMain$CD$CardsFilter1$ctl02$ddlMonthCharge'] option").each((i, v) => {
//								if (i < all.banks.accountDetails.ccardMonth) {
//									this.monthOfCard.push($(v).val())
//								}
//							});
//							var serializeForm = dataRes.find("form").serializeArray();
//							this.paramsAllPost = {};
//							serializeForm.forEach((vals) => {
//								this.paramsAllPost[vals.name] = vals.value;
//							});
//							this.paramsAllPost["__SCROLLPOSITIONY"] = "250";
//							this.paramsAllPost["ctl00$PlaceHolderMain$CD$CardsFilter1$ctl02$ddlActionType"] = "1";
//							this.paramsAllPost["ctl00$PlaceHolderMain$CD$CardsFilter1$ctl02$ddlFilterParam"] = "1";
//							this.paramsAllPost["ctl00$PlaceHolderMain$CD$CardsFilter1$ctl02$ddlMonthCharge"] = this.monthOfCard[this.idxMonth];
//							this.paramsAllPost["ctl00$PlaceHolderMain$CD$CardsFilter1$ddlCards"] = "-2";
//							this.paramsAllPost["ctl00$PlaceHolderMain$CD$CardsFilter1$ddlCustomers"] = "-1";
//							this.paramsAllPost["ctl00$PlaceHolderMain$CD$CardsFilter1$btnShow"] = "הצג";
//							this.paramsAllPost["ctl00$PlaceHolderMain$CD$CardsFilter1$hdnCardIndex"] = "-2";
//							this.paramsAllPost["ctl00$PlaceHolderMain$CD$CardsFilter1$hdnCustomerIndex"] = "-1";
//							this.paramsAllPost["ctl00$PlaceHolderMain$CD$CardsFilter1$ddlCardsPresentor"] = "-2";
//							delete this.paramsAllPost["username"];
//							delete this.paramsAllPost["password"];
//							this.loadCards();
//						}
//						catch (e) {
//							debugger
//						}
//					}
//					else {
//						var cookSplit = this.cookies.split(";");
//						var i1, len1 = cookSplit.length;
//						for (i1 = 0; i1 < len1; i1++) {
//							var v1 = cookSplit[i1];
//							if (v1 !== "") {
//								var nameExist = v1.split("=")[0].replace(/\s/g, "");
//								var valExist = v1.split("=")[1].replace(/\s/g, "");
//								win.cookies.set({
//									url: "https://online.max.co.il",
//									name: nameExist,
//									domain: ".max.co.il", // "online.max.co.il",
//									value: valExist
//								})
//							}
//						}
//						setTimeout(() => {
//							all.banks.core.services.openBankPage(
//                                                                rid
//                                                                // "https://online.max.co.il/Registred/Transactions/ChargesDeals.aspx?SourceGA=Trisim"
//                                                        );
//						}, 1000)
//					}
//				}
//			}
//			else {
//				myEmitterLogs(5);
//			}
//		}
//		catch (e) {
//		}
//	}
//
//	async loadCardsNextPage(idx, indTables) {
//		var args = await this.leumiPost(
//			"https://online.max.co.il/Registred/Transactions/ChargesDeals.aspx?SourceGA=Trisim",
//			"https://online.max.co.il/Registred/Transactions/ChargesDeals.aspx?SourceGA=Trisim",
//			this.cookies,
//			this.paramsAllPost
//		);
//		var [error, response, data] = [...args];
//		//	writeHtmlFile('loadCardsNextPage', data);
//		var dataRes = all.banks.core.services.parseHtml(data);
//		var cards = dataRes.find(".infoList_holder");
//		if (cards.length) {
//			for (var i = 0; i < cards.length; i++) {
//				if (i == idx) {
//					var thisCard = cards.eq(i);
//
//					var cardType = all.banks.core.services.getTypeCard(thisCard.find(".creditCard_details .creditCard_name li").text());
//					var cardNumber = thisCard.find(".creditCard_details .creditCard_name li").eq(1).text().replace(/\D/g, "");
//					if (!cardNumber.length) {
//						cardNumber = thisCard.find(".creditCard_details .creditCard_name li").eq(2).text().replace(/\D/g, "");
//						cardType = all.banks.core.services.getTypeCard(thisCard.find(".creditCard_details .creditCard_name li").text());
//					}
//					console.log(thisCard.find(".creditCard_details .creditCard_name li").text());
//					if (cardType === 30 || cardType === null) {
//						cardType = 24;
//					}
//					var tables = thisCard.find("table.NotPaddingTable");
//					if (tables.length) {
//						for (var ind = 0; ind < tables.length; ind++) {
//							if (ind == indTables) {
//								var valTab = tables.eq(ind);
//								var tableForKnow = valTab.prevUntil("h2").prev().text();
//								if (!tableForKnow.includes("לידיעה")) {
//									var tableTr = valTab.find("tr.gradient");
//									if (tableTr.length) {
//										var ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(valTab.find("th").eq(6).text());
//										var sumTotal = "", dateNext = null;
//										for (var indTr = 0; indTr < tableTr.length; indTr++) {
//											var thisCardRow = tableTr.eq(indTr);
//											var billingSumSekel = thisCardRow.nextUntil("tr.creditTotal").next("tr.creditTotal").find("td").eq(3).text().replace(/[^\d\.]/g, "");
//											sumTotal = billingSumSekel;
////											var categories = thisCardRow.next("tr.openedJob").find("ul.creditPeirut_opened > li > ul > li");
////											categories.find("label").remove();
//											var transCategory = null, business_address = null, business_phone = null;
//											if (all.banks.accountDetails.isCategory) {
//                                                                                                const transCategoryText = valTab.find(`#${thisCardRow.attr('id').replace('trRegular', 'TrnsCategory')}`).text().trim();
////												var transCategoryText = categories.eq(4).text().trim();
//												if (transCategoryText.length) {
//													transCategory = transCategoryText;
//												}
//												const business_addressText = valTab.find(`#${thisCardRow.attr('id').replace('trRegular', 'TrnsAddress')}`).text().trim();
////												var business_addressText = categories.eq(1).text().trim();
//												if (business_addressText.length) {
//													business_address = business_addressText;
//												}
//												const business_phoneText = valTab.find(`#${thisCardRow.attr('id').replace('trRegular', 'TrnsTel')}`).text().trim();
////												var business_phoneText = categories.eq(2).text().trim();
//												if (business_phoneText.length) {
//													business_phone = business_phoneText;
//												}
//
//											}
//											var td = thisCardRow.children("td");
//											var TotalPayments = null, CurrentPaymentNum = null, comments = null;
//											var pays = thisCardRow.children("td.comments");
//											if (pays.text().includes("מתוך")) {
//												var payments = pays.text().split("מתוך");
//												TotalPayments = payments[1].replace(/\D/g, "");
//												CurrentPaymentNum = payments[0].replace(/\D/g, "");
//											}
//											else {
//												comments = pays.children(".reg").text().trim();
//												if (!comments.length) {
//													comments = null;
//												}
//											}
//											dateNext = td.eq(2).text().trim();
//											this.arr.push({
//												"TargetId": all.banks.accountDetails.bank.targetId,
//												"Token": all.banks.accountDetails.bank.token,
//												"BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
//												"ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
//												"ExporterId": all.banks.spiderConfig.spiderId,
//												"BranchNumber": null,
//												"AccountNumber": null,
//												"CardNumber": cardNumber,
//												"NextBillingDate": td.eq(2).text().trim(),
//												"NextCycleTotal": billingSumSekel,
//												"TransDesc": td.eq(3).text().trim(),
//												"TransTotal": td.eq(6).text().replace(/[^\d\.-]/g, ""),
//												"ValueDate": td.eq(1).text().trim(),
//												"TransCategory": transCategory,
//												"business_address": business_address,
//												"business_phone": business_phone,
//												"TotalPayments": TotalPayments,
//												"CurrentPaymentNum": CurrentPaymentNum,
//												"CardType": cardType,
//												"indFakeDate": 0,
//												"currency_id": all.banks.core.services.getTypeCurrencyAll(td.eq(5).text()),
//												"original_total": td.eq(5).text().replace(/[^\d\.-]/g, ""),
//												"ind_iskat_hul": ind_iskat_hul,
//												"comment": comments
//											});
//										}
//									}
//									var creditDifduf = valTab.find("tr.creditDifduf .difdufLeft a");
//									if (creditDifduf.length) {
//										var serializeForm = dataRes.find("form").serializeArray();
//										delete this.paramsAllPost;
//										this.paramsAllPost = {};
//										serializeForm.forEach((vals) => {
//											this.paramsAllPost[vals.name] = vals.value;
//										});
//										this.paramsAllPost["__SCROLLPOSITIONY"] = "1956";
//										this.paramsAllPost["ctl00$PlaceHolderMain$CD$CardsFilter1$ddlCardsPresentor"] = "-2";
//										delete this.paramsAllPost["username"];
//										delete this.paramsAllPost["password"];
//										this.paramsAllPost["__EVENTTARGET"] = creditDifduf.attr("href").split("__doPostBack('")[1].split("'")[0];
//										await this.loadCardsNextPage(i, ind);
//									}
//									else {
//										var serializeForm = dataRes.find("form").serializeArray();
//										delete this.paramsAllPost;
//										this.paramsAllPost = {};
//										serializeForm.forEach((vals) => {
//											this.paramsAllPost[vals.name] = vals.value;
//										});
//										this.paramsAllPost["__SCROLLPOSITIONY"] = "1956";
//										delete this.paramsAllPost["username"];
//										delete this.paramsAllPost["password"];
//										for (var indArr = 0; indArr < this.arr.length; indArr++) {
//											var valArr = this.arr[indArr];
//											if (valArr.CardNumber == cardNumber && valArr.NextBillingDate == dateNext) {
//												if (valArr.NextCycleTotal == "") {
//													valArr.NextCycleTotal = sumTotal;
//												}
//											}
//										}
//									}
//								}
//							}
//						}
//					}
//				}
//			}
//		}
//	}
//
//	async loadCards() {
//		try {
//			writeLog("nextMonth");
//			var args = await this.leumiPost(
//				"https://online.max.co.il/Registred/Transactions/ChargesDeals.aspx?SourceGA=Trisim",
//				"https://online.max.co.il/Registred/Transactions/ChargesDeals.aspx",
//				this.cookies,
//				this.paramsAllPost
//			);
//			var [error, response, data] = [...args];
//			//writeHtmlFile('leumiCardRest', data);
//			var dataRes = all.banks.core.services.parseHtml(data);
//			var cards = dataRes.find(".infoList_holder");
//			if (cards.length) {
//				for (var i = 0; i < cards.length; i++) {
//					var thisCard = cards.eq(i);
//					var cardType = all.banks.core.services.getTypeCard(thisCard.find(".creditCard_details .creditCard_name li").text());
//					var cardNumber = thisCard.find(".creditCard_details .creditCard_name li").eq(1).text().replace(/\D/g, "");
//					if (!cardNumber.length) {
//						cardNumber = thisCard.find(".creditCard_details .creditCard_name li").eq(2).text().replace(/\D/g, "");
//						cardType = all.banks.core.services.getTypeCard(thisCard.find(".creditCard_details .creditCard_name li").text());
//					}
//					//console.log(thisCard.find(".creditCard_details .creditCard_name li").text());
//					if (cardType === 30 || cardType === null) {
//						cardType = 24;
//					}
//					var tables = thisCard.find("table.NotPaddingTable");
//					if (tables.length) {
//						for (var ind = 0; ind < tables.length; ind++) {
//							var valTab = tables.eq(ind);
//							var tableForKnow = valTab.prevUntil("h2").prev().text();
//							if (!tableForKnow.includes("לידיעה")) {
//								var tableTr = valTab.find("tr.gradient");
//								if (tableTr.length) {
//									var ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(valTab.find("th").eq(6).text());
//									for (var indTr = 0; indTr < tableTr.length; indTr++) {
//										var thisCardRow = tableTr.eq(indTr);
//										var billingSumSekel = thisCardRow.nextUntil("tr.creditTotal").next("tr.creditTotal").find("td").eq(3).text().replace(/[^\d\.]/g, "");
////										var categories = thisCardRow.next("tr.openedJob").find("ul.creditPeirut_opened > li > ul > li");
////										categories.find("label").remove();
//										var transCategory = null, business_address = null, business_phone = null;
//										if (all.banks.accountDetails.isCategory) {
//                                                                                        const transCategoryText = valTab.find(`#${thisCardRow.attr('id').replace('trRegular', 'TrnsCategory')}`).text().trim();
////											var transCategoryText = categories.eq(4).text().trim();
//											if (transCategoryText.length) {
//												transCategory = transCategoryText;
//											}
//                                                                                        const business_addressText = valTab.find(`#${thisCardRow.attr('id').replace('trRegular', 'TrnsAddress')}`).text().trim();
////											var business_addressText = categories.eq(1).text().trim();
//											if (business_addressText.length) {
//												business_address = business_addressText;
//											}
//                                                                                        const business_phoneText = valTab.find(`#${thisCardRow.attr('id').replace('trRegular', 'TrnsTel')}`).text().trim();
////											var business_phoneText = categories.eq(2).text().trim();
//											if (business_phoneText.length) {
//												business_phone = business_phoneText;
//											}
//										}
//										var td = thisCardRow.children("td");
//										var TotalPayments = null, CurrentPaymentNum = null, comments = null;
//										var pays = thisCardRow.children("td.comments");
//										if (pays.text().includes("מתוך")) {
//											var payments = pays.text().split("מתוך");
//											TotalPayments = payments[1].replace(/\D/g, "");
//											CurrentPaymentNum = payments[0].replace(/\D/g, "");
//										}
//										else {
//											comments = pays.children(".reg").text().trim();
//											if (!comments.length) {
//												comments = null;
//											}
//										}
//										this.arr.push({
//											"TargetId": all.banks.accountDetails.bank.targetId,
//											"Token": all.banks.accountDetails.bank.token,
//											"BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
//											"ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
//											"ExporterId": all.banks.spiderConfig.spiderId,
//											"BranchNumber": null,
//											"AccountNumber": null,
//											"CardNumber": cardNumber,
//											"NextBillingDate": td.eq(2).text().trim(),
//											"NextCycleTotal": billingSumSekel,
//											"TransDesc": td.eq(3).text().trim(),
//											"TransTotal": td.eq(6).text().replace(/[^\d\.-]/g, ""),
//											"ValueDate": td.eq(1).text().trim(),
//											"TransCategory": transCategory,
//											"business_address": business_address,
//											"business_phone": business_phone,
//											"TotalPayments": TotalPayments,
//											"CurrentPaymentNum": CurrentPaymentNum,
//											"CardType": cardType,
//											"indFakeDate": 0,
//											"currency_id": all.banks.core.services.getTypeCurrencyAll(td.eq(5).text()),
//											"original_total": td.eq(5).text().replace(/[^\d\.-]/g, ""),
//											"ind_iskat_hul": ind_iskat_hul,
//											"comment": comments
//										});
//									}
//								}
//								var creditDifduf = valTab.find("tr.creditDifduf .difdufLeft a");
//								if (creditDifduf.length) {
//									console.log("creditDifduf");
//									var serializeForm = dataRes.find("form").serializeArray();
//									delete this.paramsAllPost;
//									this.paramsAllPost = {};
//									serializeForm.forEach((vals) => {
//										this.paramsAllPost[vals.name] = vals.value;
//									});
//									this.paramsAllPost["__SCROLLPOSITIONY"] = "1956";
//									this.paramsAllPost["ctl00$PlaceHolderMain$CD$CardsFilter1$ddlCardsPresentor"] = "-2";
//									this.paramsAllPost["__EVENTTARGET"] = creditDifduf.attr("href").split("__doPostBack('")[1].split("'")[0];
//									delete this.paramsAllPost["username"];
//									delete this.paramsAllPost["password"];
//									await this.loadCardsNextPage(i, ind);
//								}
//							}
//						}
//					}
//				}
//			}
//
//			var serializeForm = dataRes.find("form").serializeArray();
//			delete this.paramsAllPost;
//			this.paramsAllPost = {};
//			serializeForm.forEach((vals) => {
//				this.paramsAllPost[vals.name] = vals.value;
//			});
//
//			for (var [index, value] of this.monthOfCard.entries()) {
//				writeLog("Get prev month: " + value);
//				this.idxMonth = value;
//				this.paramsAllPost["__SCROLLPOSITIONY"] = "250";
//				this.paramsAllPost["ctl00$PlaceHolderMain$CD$CardsFilter1$ctl02$ddlActionType"] = "2";
//				this.paramsAllPost["ctl00$PlaceHolderMain$CD$CardsFilter1$ctl02$ddlFilterParam"] = "1";
//				this.paramsAllPost["ctl00$PlaceHolderMain$CD$CardsFilter1$ddlCards"] = "-2";
//				this.paramsAllPost["ctl00$PlaceHolderMain$CD$CardsFilter1$ddlCustomers"] = "-1";
//				this.paramsAllPost["ctl00$PlaceHolderMain$CD$CardsFilter1$hdnCardIndex"] = "-2";
//				this.paramsAllPost["ctl00$PlaceHolderMain$CD$CardsFilter1$hdnCustomerIndex"] = "-1";
//				this.paramsAllPost["ctl00$PlaceHolderMain$CD$CardsFilter1$ddlCardsPresentor"] = "-2";
//				this.paramsAllPost["ctl00$PlaceHolderMain$CD$CardsFilter1$btnShow"] = "הצג";
//				this.paramsAllPost["ctl00$PlaceHolderMain$CD$CardsFilter1$ctl02$ddlMonthCharge"] = value;
//				delete this.paramsAllPost["username"];
//				delete this.paramsAllPost["password"];
//
//				//console.log(this.paramsAllPost);
//				var args = await this.leumiPost(
//					"https://online.max.co.il/Registred/Transactions/ChargesDeals.aspx?SourceGA=Trisim",
//					"https://online.max.co.il/Registred/Transactions/ChargesDeals.aspx?SourceGA=Trisim",
//					this.cookies,
//					this.paramsAllPost
//				);
//				var [error, response, data] = [...args];
//				//writeHtmlFile('leumiCardRest', data);
//				var dataRes = all.banks.core.services.parseHtml(data);
//				var cards = dataRes.find(".infoList_holder");
//				if (cards.length) {
//					for (var i = 0; i < cards.length; i++) {
//						var thisCard = cards.eq(i);
//
//						var cardType = all.banks.core.services.getTypeCard(thisCard.find(".creditCard_details .creditCard_name li").text());
//						var cardNumber = thisCard.find(".creditCard_details .creditCard_name li").eq(1).text().replace(/\D/g, "");
//						if (!cardNumber.length) {
//							cardNumber = thisCard.find(".creditCard_details .creditCard_name li").eq(2).text().replace(/\D/g, "");
//							cardType = all.banks.core.services.getTypeCard(thisCard.find(".creditCard_details .creditCard_name li").text());
//						}
//						//console.log(thisCard.find(".creditCard_details .creditCard_name li").text());
//						if (cardType === 30 || cardType === null) {
//							cardType = 24;
//						}
//
//						var tables = thisCard.find("table.NotPaddingTable");
//						if (tables.length) {
//							for (var ind = 0; ind < tables.length; ind++) {
//								var valTab = tables.eq(ind);
//								var tableTr = valTab.find("tr.gradient");
//								if (tableTr.length) {
//									var ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(valTab.find("th").eq(6).text());
//									for (var indTr = 0; indTr < tableTr.length; indTr++) {
//										var thisCardRow = tableTr.eq(indTr);
//										var billingSumSekel = thisCardRow.nextUntil("tr.creditTotal").next("tr.creditTotal").find("td").eq(3).text().replace(/[^\d\.]/g, "");
////										var categories = thisCardRow.next("tr.openedJob").find("ul.creditPeirut_opened > li > ul > li");
////										categories.find("label").remove();
//										var transCategory = null, business_address = null, business_phone = null;
//										if (all.banks.accountDetails.isCategory) {
//                                                                                        const transCategoryText = valTab.find(`#${thisCardRow.attr('id').replace('trRegular', 'TrnsCategory')}`).text().trim();
////											var transCategoryText = categories.eq(4).text().trim();
//											if (transCategoryText.length) {
//												transCategory = transCategoryText;
//											}
//                                                                                        const business_addressText = valTab.find(`#${thisCardRow.attr('id').replace('trRegular', 'TrnsAddress')}`).text().trim();
////											var business_addressText = categories.eq(1).text().trim();
//											if (business_addressText.length) {
//												business_address = business_addressText;
//											}
//                                                                                        const business_phoneText = valTab.find(`#${thisCardRow.attr('id').replace('trRegular', 'TrnsTel')}`).text().trim();
////											var business_phoneText = categories.eq(2).text().trim();
//											if (business_phoneText.length) {
//												business_phone = business_phoneText;
//											}
//										}
//										var td = thisCardRow.children("td");
//										var TotalPayments = null, CurrentPaymentNum = null, comments = null;
//										var pays = thisCardRow.children("td.comments");
//										if (pays.text().includes("מתוך")) {
//											var payments = pays.text().split("מתוך");
//											TotalPayments = payments[1].replace(/\D/g, "");
//											CurrentPaymentNum = payments[0].replace(/\D/g, "");
//										}
//										else {
//											comments = pays.children(".reg").text().trim();
//											if (!comments.length) {
//												comments = null;
//											}
//										}
//										this.arr.push({
//											"TargetId": all.banks.accountDetails.bank.targetId,
//											"Token": all.banks.accountDetails.bank.token,
//											"BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
//											"ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
//											"ExporterId": all.banks.spiderConfig.spiderId,
//											"BranchNumber": null,
//											"AccountNumber": null,
//											"CardNumber": cardNumber,
//											"NextBillingDate": td.eq(2).text().trim(),
//											"NextCycleTotal": billingSumSekel,
//											"TransDesc": td.eq(3).text().trim(),
//											"TransTotal": td.eq(6).text().replace(/[^\d\.-]/g, ""),
//											"ValueDate": td.eq(1).text().trim(),
//											"TransCategory": transCategory,
//											"business_address": business_address,
//											"business_phone": business_phone,
//											"TotalPayments": TotalPayments,
//											"CurrentPaymentNum": CurrentPaymentNum,
//											"CardType": cardType,
//											"indFakeDate": 0,
//											"currency_id": all.banks.core.services.getTypeCurrencyAll(td.eq(5).text()),
//											"original_total": td.eq(5).text().replace(/[^\d\.-]/g, ""),
//											"ind_iskat_hul": ind_iskat_hul,
//											"comment": comments
//										});
//									}
//								}
//								var creditDifduf = valTab.find("tr.creditDifduf .difdufLeft a");
//								if (creditDifduf.length) {
//									console.log("creditDifduf");
//									var serializeForm = dataRes.find("form").serializeArray();
//									delete this.paramsAllPost;
//									this.paramsAllPost = {};
//									serializeForm.forEach((vals) => {
//										this.paramsAllPost[vals.name] = vals.value;
//									});
//									this.paramsAllPost["__SCROLLPOSITIONY"] = "1956";
//									this.paramsAllPost["ctl00$PlaceHolderMain$CD$CardsFilter1$ddlCardsPresentor"] = "-2";
//									this.paramsAllPost["__EVENTTARGET"] = creditDifduf.attr("href").split("__doPostBack('")[1].split("'")[0];
//									delete this.paramsAllPost["username"];
//									delete this.paramsAllPost["password"];
//									await this.loadCardsNextPage(i, ind);
//								}
//							}
//						}
//					}
//				}
//
//				var serializeForm = dataRes.find("form").serializeArray();
//				delete this.paramsAllPost;
//				this.paramsAllPost = {};
//				serializeForm.forEach((vals) => {
//					this.paramsAllPost[vals.name] = vals.value;
//				});
//				if (index + 1 == this.monthOfCard.length) {
//					//console.log(this.arr)
//					writeLog("סיום ריצה");
//					writeLog("שליחת נתונים");
//					this.sendCardsCtrl();
//				}
//			}
//		}
//		catch (err) {
//			console.log(err);
//		}
//	}
//
//	async logOut() {
//		writeLog("logOut");
//		await this.leumiRestGet(
//			"https://online.max.co.il/Logout.aspx",
//			"https://online.max.co.il/Registred/Transactions/ChargesDeals.aspx?SourceGA=Trisim",
//			this.cookies
//		);
//		writeLog("killVpn");
//		monitorVpn.killVpn(() => {
//			myEmitterLogs(25);
//		});
//	}
//}
//
//all.banks.accounts.leumiCardAll = new leumiCard();
