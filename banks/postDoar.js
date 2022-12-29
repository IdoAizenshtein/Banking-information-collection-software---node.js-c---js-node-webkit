all.banks.accounts.postDoar = function () {
    var postDoar = {};
    postDoar.login = function () {
        postDoar.indx = 0;
        $.get("https://www.bankhadoar.co.il/")
            .done(function (data) {
                var data = $(data);
                var VIEWSTATE = data.find("input[name='__VIEWSTATE']").val();
                var VIEWSTATEGENERATOR = data.find("input[name='__VIEWSTATEGENERATOR']").val();
                if (all.banks.openBankPage) {
                    $('#filecontainerloginWithUpdatedUserAgent').attr('src', 'https://www.bankhadoar.co.il/#/Login');
                    let times = 1;
                    const checker = setInterval(() => {
                        monitorActivityClass.setIntervalActivity();
                        const currentContentAngular = document.getElementById('filecontainerloginWithUpdatedUserAgent').contentWindow;
                        const currentContent = $('#filecontainerloginWithUpdatedUserAgent').contents();
                        if (currentContentAngular.angular && currentContent.find('#form1 .form-group').length) {
                            writeLog("login currentContent.find('#form1 .form-group').length");
                            clearInterval(checker);

                            currentContentAngular.angular.element(currentContent.find('#form1 .form-group')).scope().loginBoxForm.userName.$setViewValue(all.banks.accountDetails.bank.username.slice(0, 15))
                            currentContentAngular.angular.element(currentContent.find('#form1 .form-group')).scope().loginBoxForm.password.$setViewValue(all.banks.accountDetails.bank.password.slice(0, 30))

                            setTimeout(() => {
                                currentContentAngular.angular.element(currentContent.find('#form1 .form-group')).scope().Enter(currentContentAngular.angular.element(currentContent.find('#form1 .form-group')).scope().loginBoxForm)

                                setTimeout(() => {
                                    $('#filecontainerloginWithUpdatedUserAgent').show();
                                    $('html, body').animate({scrollTop: 1000}, 1000);
                                    setInterval(() => monitorActivityClass.setIntervalActivity(), 20000)

                                    // #lnkBtnNotNow
                                }, 2000)
                            }, 1000)
                        } else if (times++ > 60) {
                            writeLog("login !currentContent.find('#form1 .form-group').length");
                            $('#filecontainerloginWithUpdatedUserAgent').attr('src', '');
                            clearInterval(checker);
                            this.logout();
                        }
                    }, 5000);
                    return;
                }

                if (!VIEWSTATE || !VIEWSTATEGENERATOR) {
                    postDoar.nLogin();
                    return;
                }
                $.ajax({
                    url: "https://www.bankhadoar.co.il/idws/verify",
                    data: {
                        __VIEWSTATE: VIEWSTATE,
                        __VIEWSTATEGENERATOR: VIEWSTATEGENERATOR,
                        "UserName": all.banks.accountDetails.bank.username,
                        "idNumber": "",
                        "password": "",
                        "__idw_method__": "post",
                        "__idw_event__": "UserNameBlur",
                        "__idw_action__": "/",
                        "__idw_language__": "he"
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    method: "POST",
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8"
                }).done(function (data, res, status) {
                    $.ajax({
                        url: "https://www.bankhadoar.co.il/idws/verify",
                        data: {
                            "UserName": all.banks.accountDetails.bank.username,
                            "idNumber": all.banks.accountDetails.bank.autoCode,
                            "password": all.banks.accountDetails.bank.password,
                            "__idw_method__": "POST",
                            "__idw_action__": "/PostBank.WebBanking.UI.Ajax.Services.Login.ajax/Enter/Movements",
                            "__idw_language__": "he",
                            "IDW_TNCK_IDWS": data.Transaction
                        },
                        xhrFields: {
                            withCredentials: true
                        },
                        method: "POST",
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8"
                    })
                        .done(function (data) {
                            if (data.Message) {
                                if (data.Message.indexOf('אחד או יותר מהפרטים שגוי') != -1) {
                                    myEmitterLogs(5);
                                } else {
                                    all.banks.core.services.errorLog(data.Message)
                                }
                            } else {
                                $.ajax({
                                    url: "https://www.bankhadoar.co.il/PostBank.WebBanking.UI.Ajax.Services.Login.ajax/Enter/Movements",
                                    data: JSON.stringify({
                                        "UserName": all.banks.accountDetails.bank.username,
                                        "idNumber": all.banks.accountDetails.bank.autoCode,
                                        "password": all.banks.accountDetails.bank.password
                                    }),
                                    xhrFields: {
                                        withCredentials: true
                                    },
                                    beforeSend: function (xhr) {
                                        xhr.setRequestHeader('Accept', '*/*');
                                        xhr.setRequestHeader('Content-Type', 'application/json');
                                        xhr.setRequestHeader('X-Idw-Ticket', data.Ticket);
                                    },
                                    method: "POST",
                                    contentType: "application/json"
                                }).done(function (resp, status, xhr) {
                                    try {
                                        postDoar.webbankingsessionid = xhr.getResponseHeader('webbankingsessionid');
                                        var res = JSON.parse(resp);
                                        if (res.error) {
                                            myEmitterLogs(9);
                                            postDoar.logOut();
                                        } else {
                                            postDoar.accountNumber = res.accountNumber;
                                            if (!all.banks.openBankPage) {
                                                all.banks.generalVariables.allDataArrDueChecks = [];
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
                                                setInterval(function () {
                                                    postDoar.keepAlive();
                                                }, 10000);
                                                postDoar.datebackslesh = ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2) + '/' + all.banks.accountDetails.dateFrom.getFullYear();
                                                postDoar.datebacksleshTo = ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '/' + ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2) + '/' + all.banks.accountDetails.dateTo.getFullYear();
                                                postDoar.getOsh();
                                            } else {
                                                $.get('https://www.bankhadoar.co.il/PostBank.WebBanking.UI.Ajax.Services.MyAccount.jsData/GetCurrentMovement?callback=angular.callbacks._4&ApplicationSessionID=' + res.ApplicationSessionID + '&sessionAcount=' + res.accountNumber + '&ApplicationSessionBeforeLogin=&Account=' + res.accountNumber).done(function () {
                                                    all.banks.core.services.openBankPage("https://www.bankhadoar.co.il/#/MyAccount/Movement");
                                                })
                                            }
                                        }
                                    } catch (err) {
                                        all.banks.core.services.errorLog(err)
                                    }
                                })
                                    .fail(function (error, resErr, urlParam) {
                                        var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                                        all.banks.core.services.errorLog(logErr)
                                    })
                            }
                        })
                        .fail(function (error, resErr, urlParam) {
                            var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                            all.banks.core.services.errorLog(logErr)
                        })
                })
                    .fail(function (error, resErr, urlParam) {
                        var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                        all.banks.core.services.errorLog(logErr)
                    })
            })
    };
    postDoar.sendOshCtrl = function () {
        all.banks.core.services.sendOsh(all.banks.generalVariables.allDataArr)
            .then(function (arr) {
                if (all.banks.accountDetails.IND_NILVIM > 0) {
                    all.banks.accounts.postDoar.getDueChecks();
                } else {
                    postDoar.logOut();
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.postDoar.sendOshCtrl()
                }
            })
    }
    postDoar.convertDateLocal = function (dateLocal) {
        var dateFormat = "";
        if (dateLocal !== undefined && dateLocal !== null) {
            dateLocal = dateLocal.toString();
            if (dateLocal !== "") {
                dateFormat = dateLocal.split("/")[1] + "/" + dateLocal.split("/")[0] + "/" + dateLocal.split("/")[2];
            }
        }
        return dateFormat;
    }
    postDoar.sendChecksCtrl = function (formData) {
        all.banks.core.services.sendChecks(formData)
            .then(function (arr) {
                all.banks.generalVariables.numChecksDrawn += 1;
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.postDoar.sendChecksCtrl(formData)
                }
            })
    }
    postDoar.sendDeuChecksCtrl = function () {
        all.banks.core.services.sendDueChecks(all.banks.generalVariables.allDataArrDueChecks)
            .then(function (arr) {
                postDoar.logOut();
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    postDoar.sendDeuChecksCtrl()
                }
            })
    }
    postDoar.getOsh = function () {
        $.ajax({
            url: "https://www.bankhadoar.co.il/PostBank.WebBanking.UI.Ajax.Services.MyAccount.ajax/GetTableContent/Movements/" + postDoar.accountNumber,
            data: JSON.stringify({
                "AccountNumber": postDoar.accountNumber,
                "Store": "Movements",
                "FromDate": postDoar.datebackslesh,
                "UntilDate": postDoar.datebacksleshTo,
                "RecentMovements": "20"
            }),
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Accept', '*/*');
                xhr.setRequestHeader('Content-Type', 'application/json');
            },
            method: "POST",
            contentType: "application/json"
        }).done(function (resp) {
            var res = JSON.parse(resp);
            postDoar.hashKey = res.hash;
            var srcMain = all.banks.core.services.parseHtml(res.content);
            var acc = {
                'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                'AccountNumber': postDoar.accountNumber,
                'BranchNumber': '1',
                'Balance': srcMain.find("#tableBody .tableDetailsBottom table thead tr th span").eq(1).text().split(':')[1].replace('₪', '').replace(/\u200E/g, ' ').replace(/\u200F/g, ' ').replace(/\s/g, "").replace(/,/g, '').trim(),
                'AccountCredit': null
            };
            all.banks.generalVariables.allDataArr.BankData[0].Account.push(acc);
            myEmitterLogs(10, acc.AccountNumber);

            var rowsTable = srcMain.find("#tableBody .tableDetailsBottom table tbody tr");
            var arr = [];
            rowsTable.each(function (i, v) {
                if ($(v).find('td').length > 4) {
                    var objectRow = {};
                    var td = $(v).children("td");
                    var date = td.eq(0).text().trim().replace(/\u200E/g, ' ').replace(/\u200F/g, ' ').trim();
                    var hova = td.eq(5).text().trim().replace(/,/g, '').replace(/\u200E/g, ' ').replace(/\u200F/g, ' ').trim();
                    var zchut = td.eq(4).text().trim().replace(/,/g, '').replace(/\u200E/g, ' ').replace(/\u200F/g, ' ').trim();
                    var asmachta = td.eq(2).text().trim().replace(/\u200E/g, ' ').replace(/\u200F/g, ' ').trim();
                    var transDesc = td.eq(3).text().trim().replace(/\u200E/g, ' ').replace(/\u200F/g, ' ').trim();
                    var balance = td.eq(6).text().trim().replace(/\u200E/g, ' ').replace(/\u200F/g, ' ').trim().replace(/\s/g, "").replace(/,/g, '');
                    var transactionType, sum;
                    if (zchut == '') {
                        transactionType = '0';
                        sum = hova;
                    } else {
                        transactionType = '1';
                        sum = zchut;
                    }
                    objectRow.Asmachta = asmachta;
                    objectRow.TransDesc = (transDesc == '') ? null : transDesc.trim().replace(/\u200E/g, ' ').replace(/\u200F/g, ' ').trim();
                    objectRow.ValueDate = all.banks.core.services.convertDateAll(postDoar.convertDateLocal(date));
                    objectRow.TransactionType = transactionType;
                    objectRow.TransTotal = sum;
                    objectRow.Balance = balance;
                    objectRow.IsDaily = "0";
                    objectRow.imgs = null;
                    if (td.eq(7).find("a").length) {
                        var elem = td.eq(7).find("a").attr("onclick");
                        //GetOutputChecks
                        if (elem.indexOf("checks.showOutputChecks") !== -1 && all.banks.accountDetails.checks) {
                            var params = elem.split("checks.showOutputChecks(")[1].split(");")[0].split(",");
                            var imgs =
                                "{" +
                                "Numerator:" +
                                parseFloat(params[0]) + "," +
                                "Peilut:" +
                                '\"' + params[1].split("/")[1].replace(/\D/g, "") + "/" + params[1].split("/")[0].replace(/\D/g, "") + "/" + params[1].split("/")[2].replace(/\D/g, "") + "\"" + "," +
                                "Eshnav:" +
                                params[2] +
                                "}";

                            objectRow.imgs = imgs;
                            objectRow.showOutputChecks = 1;
                        }
                        if (elem.indexOf("checks.showInputCheck") !== -1 && all.banks.accountDetails.checks) {
                            var params = elem.split("checks.showInputCheck(")[1].split(");")[0].split(",");
                            var imgs =
                                "{" +
                                "Asmachta:" +
                                params[1] + "," +
                                "Sum:" +
                                parseFloat(params[2]) + "," +
                                "Peilut:" +
                                '\"' + params[0].split("/")[1].replace(/\D/g, "") + "/" + params[0].split("/")[0].replace(/\D/g, "") + "/" + params[0].split("/")[2].replace(/\D/g, "") + "\"" +
                                "}";
                            objectRow.imgs = imgs;
                            objectRow.showInputCheck = 1;
                        }
                        if (elem.indexOf("checks.showMSV") !== -1) {
                            var params = elem.split("checks.showMSV(")[1].split(");")[0].split(",");
                            var haavara =
                                "{" +
                                "ActionDate:" +
                                '\"' + params[0].split("/")[1].replace(/\D/g, "") + "/" + params[0].split("/")[0].replace(/\D/g, "") + "/" + params[0].split("/")[2].replace(/\D/g, "") + "\"" + "," +
                                "CreditSum:" +
                                parseFloat(params[1]) + "," +
                                "debitSum:" +
                                params[2] + "," +
                                "ReferenceB:" +
                                params[3] + "," +
                                "Eshnav:" +
                                params[4] + "," +
                                "Mutav:" +
                                params[5] + "," +
                                "ReferenceB:" +
                                params[6] +
                                "}";
                            objectRow.DepositeTransferData = haavara;
                        }
                    }
                    arr.push(objectRow);
                }
                if (i + 1 == rowsTable.length) {
                    //all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow = arr;
                    postDoar.processData(arr);
                }
            })
        })
    }
    postDoar.processData = function (data) {
        if (data.length > 0) {
            $.each(data, function (i, v) {
                if (v.DepositeTransferData !== undefined && typeof (v.DepositeTransferData) == "string") {
                    $.when(postDoar.getHaavara(v.DepositeTransferData))
                        .then(function (res) {
                            v.DepositeTransferData = res;
                            postDoar.processData(data);
                        });
                    return false;
                } else if (v.imgs !== null && typeof (v.imgs) == "string") {
                    $.when(postDoar.getCheck(v))
                        .then(function (res) {
                            v.imgs = res;
                            postDoar.processData(data);
                        });
                    return false;
                } else {
                    if (i + 1 == data.length) {
                        all.banks.generalVariables.allDataArr.BankData[0].Account[postDoar.currAccIndex].DataRow = data;
                        myEmitterLogs(29);
                        myEmitterLogs(12, all.banks.generalVariables.allDataArr.BankData[0].Account[postDoar.currAccIndex].DataRow.length);
                        all.banks.accounts.postDoar.sendOshCtrl();
                    }
                }
            })
        } else {
            myEmitterLogs(12, 0);
            all.banks.accounts.postDoar.sendOshCtrl();
        }
    }

    postDoar.getCheck = function (valueObj) {
        var dfd = jQuery.Deferred();
        var url;
        if (valueObj.showOutputChecks) {
            url = "https://www.bankhadoar.co.il/PostBank.WebBanking.UI.Ajax.Services.Checks.ajax/GetOutputChecks"
            delete valueObj['showOutputChecks'];
        } else {
            url = "https://www.bankhadoar.co.il/PostBank.WebBanking.UI.Ajax.Services.Checks.ajax/GetInputChecks";
            delete valueObj['showInputCheck'];
        }
        $.ajax({
            url: url,
            data: valueObj.imgs,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('WebBankingSessionID', postDoar.webbankingsessionid);
            },
            xhrFields: {
                withCredentials: true
            },
            method: "POST",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        }).done(function (data) {
            var res = JSON.parse(data);
            var srcMain = all.banks.core.services.parseHtml(res.content);
            var urlImg = "https://www.bankhadoar.co.il/" + srcMain.find(".CheckDisplayItem.first > img ")[0].outerHTML.split("src=")[1].split('alt=')[0].replace(/"/, '').split(' ')[0].replace(/"/, '').replace(/\amp;/g, '');
            var numberCheck = srcMain.find(".checkProperties h1").text().replace(/\D/g, "");
            var tableProp = srcMain.find(".TableDisplay  tr");
            var numberOfBank = tableProp.eq(0).children("td").text().replace(/\D/g, "");
            var numberOfBranch = tableProp.eq(1).children("td").text().replace(/\D/g, "");
            var date = tableProp.eq(2).children("td").text().replace(/\D/g, "");
            var sumOfCheck = tableProp.eq(3).children("td").text().replace('₪', '').replace(/\u200E/g, ' ').replace(/\u200F/g, ' ').replace(/\s/g, "").replace(/,/g, '').trim();
            var img = new Image();
            img.src = urlImg;
            img.onload = function () {
                var uuid = numberOfBank + '' + numberOfBranch + '' + '' + parseInt(numberCheck) + '' + parseInt(date) + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[postDoar.currAccIndex].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[postDoar.currAccIndex].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[postDoar.currAccIndex].AccountNumber;
                var canvas = document.createElement("canvas");
                canvas.width = this.width;
                canvas.height = this.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0);
                var dataURL = canvas.toDataURL("image/jpeg");
                var formData = new FormData();
                var content = dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                var blob = new Blob([content], {
                    type: "text/plain"
                });
                formData.append(uuid, blob);
                all.banks.accounts.aibank.sendChecksCtrl({
                    formData: formData,
                    params: {
                        imagenamekey: uuid,
                        bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[postDoar.currAccIndex].BankNumber,
                        snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[postDoar.currAccIndex].BranchNumber,
                        accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[postDoar.currAccIndex].AccountNumber
                    }
                });
                formData = null;
                data = null;
                dfd.resolve([{
                    "Asmachta": valueObj.Asmachta,
                    "CheckAccountNumber": null,
                    "DepositeDate": date,
                    "CheckBankNumber": numberOfBank,
                    "CheckBranchNumber": numberOfBranch,
                    "CheckNumber": numberCheck,
                    "CheckTotal": parseFloat(sumOfCheck),
                    "ImageNameKey": uuid
                }]);
            };
            img.onerror = function () {
                data = null;
                dfd.resolve(null);
            };
        })
        return dfd.promise();
    }
    postDoar.getHaavara = function (haavaraData) {
        var dfd = jQuery.Deferred();
        $.ajax({
            url: "https://www.bankhadoar.co.il/PostBank.WebBanking.UI.Ajax.Services.Checks.ajax/GetMSVMovenment",
            data: haavaraData,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('WebBankingSessionID', postDoar.webbankingsessionid);
            },
            xhrFields: {
                withCredentials: true
            },
            method: "POST",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        }).done(function (data) {
            var res = JSON.parse(data);
            var srcMain = all.banks.core.services.parseHtml(res.content);
            var tableProp = srcMain.find(".TableDisplay  tr");
            var NamePayerTransfer = tableProp.eq(0).children("td").eq(0).text();
            var asmachta = tableProp.eq(0).children("td").eq(1).text();
            var TransferTotal = tableProp.eq(1).children("td").eq(0).text().replace(/₪/g, '').replace(/\s/g, "").replace(/,/g, '');
            var DepositeTransferDate = tableProp.eq(1).children("td").eq(1).text();
            var BankTransferNumber = tableProp.eq(2).children("td").eq(0).text();
            var AccountTransferNumber = tableProp.eq(3).children("td").eq(0).text();
            var BranchTransferNumber = null;
            var DetailsTransfer = tableProp.eq(3).children("td").eq(1).text().replace(/\u200E/g, ' ').replace(/\u200F/g, ' ').trim() + " " + tableProp.eq(4).children("td").eq(0).text().replace(/\u200E/g, ' ').replace(/\u200F/g, ' ').trim() + " " + tableProp.eq(5).children("td").eq(0).text().replace(/\u200E/g, ' ').replace(/\u200F/g, ' ').trim();
            dfd.resolve([{
                "DepositeTransferDate": all.banks.core.services.convertDateAll(postDoar.convertDateLocal(DepositeTransferDate)),
                "BankTransferNumber": BankTransferNumber,
                "BranchTransferNumber": BranchTransferNumber,
                "AccountTransferNumber": AccountTransferNumber,
                "NamePayerTransfer": NamePayerTransfer,
                "DetailsTransfer": DetailsTransfer,
                "TransferTotal": TransferTotal
            }]);
        });
        return dfd.promise();
    }
    postDoar.getDueChecks = function () {
        var dateFrom = ("0" + (new Date().getMonth() + 1)).slice(-2) + '/' + ("0" + (new Date().getDate() + 1)).slice(-2) + '/' + new Date().getFullYear();
        var dateToFormat = new Date(new Date().getFullYear(), new Date().getMonth() + 36, new Date().getDate());
        var dateTo = ("0" + (dateToFormat.getMonth() + 1)).slice(-2) + '/' + ("0" + (dateToFormat.getDate())).slice(-2) + '/' + dateToFormat.getFullYear();
        $.ajax({
            url: "https://www.bankhadoar.co.il/PostBank.WebBanking.UI.Ajax.Services.MyAccount.ajax/GetTableContent/CustodyChecks/" + postDoar.accountNumber,
            data: JSON.stringify({
                "AccountNumber": postDoar.accountNumber,
                "Store": "CustodyChecks",
                "FromDate": "",
                "UntilDate": "",
                "Serial": "",
                "Bank": "",
                "Branch": "",
                "AccountCheck": "",
                "FromPaymentDate": dateFrom,
                "UntilPaymentDate": dateTo,
                "FromSum": "",
                "UntilSum": ""
            }),
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Accept', '*/*');
                xhr.setRequestHeader('Content-Type', 'application/json');
            },
            method: "POST",
            contentType: "application/json"
        }).done(function (data) {
            var res = JSON.parse(data);
            var srcMain = all.banks.core.services.parseHtml(res.content);
        })
    }
    postDoar.keepAlive = function () {
        $.ajax({
            url: "https://www.bankhadoar.co.il/PostBank.WebBanking.UI.Ajax.Services.Login.ajax/KeepAlive",
            data: JSON.stringify({}),
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Accept', '*/*');
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('WebBankingSessionID', postDoar.webbankingsessionid);
            },
            method: "POST",
            contentType: "application/json"
        });
    }
    postDoar.logOut = function () {
        var urls = "https://www.bankhadoar.co.il/PostBank.WebBanking.UI.Ajax.Services.Login.jsData/Logout?collback=angular.callbacks._1";
        all.banks.core.services.httpReq(urls, 'GET', null, false, false)
            .then(function (res) {
                var urls = "https://www.bankhadoar.co.il/PostBank.WebBanking.UI.Ajax.Services.Login.jsData/isLoggedOn?collback=angular.callbacks._2";
                all.banks.core.services.httpReq(urls, 'GET', null, false, false)
                    .then(function (res) {
                        all.banks.core.services.httpReq("https://www.bankhadoar.co.il/", 'GET', null, false, false);
                        $('#filecontainerlogin').attr('src', '')
                        myEmitterLogs(25);
                    })
            })
            .fail(function (error, resErr, urlParam) {
                var urls = "https://www.bankhadoar.co.il/PostBank.WebBanking.UI.Ajax.Services.Login.jsData/isLoggedOn?collback=angular.callbacks._2";
                all.banks.core.services.httpReq(urls, 'GET', null, false, false)
                    .then(function (res) {
                        all.banks.core.services.httpReq("https://www.bankhadoar.co.il/", 'GET', null, false, false);
                        $('#filecontainerlogin').attr('src', '')
                        myEmitterLogs(25);
                    })

                // var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                // all.banks.core.services.errorLog(logErr)
            })
            .fail(function (error, resErr, urlParam) {
                all.banks.core.services.httpReq("https://www.bankhadoar.co.il/", 'GET', null, false, false);
                $('#filecontainerlogin').attr('src', '')
                myEmitterLogs(25);
            })
    };


    postDoar.nSendGetReturnJson = function (url, data) {
        return new Promise((resolve, reject) => {
            const callback = data.callback;
            $.ajax({
                url: url,
                data: data,
                method: 'GET',
                dataType: callback ? "text" : "json"
            }).done((data, res, status) => {
                if (!callback) {
                    resolve(data);
                } else {
                    const regex = new RegExp(`${callback}\\((.+)\\)`, 'g');
                    let mtch = regex.exec(data);
                    if (mtch !== null && mtch[1]) {
                        resolve(JSON.parse(mtch[1]));
                    } else {
                        resolve(false);
                    }
                }
            }).fail(() => resolve(false));
        });
    };

    postDoar.nSendGetReturnJsonNew = function (url, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                data: JSON.stringify(data),
                xhrFields: {
                    withCredentials: true
                },
                method: "POST",
                contentType: "application/json; charset=UTF-8"
            }).done((body, res, status) => {
                resolve(body);
            }).fail(() => resolve(false));
        });
    };
    postDoar.nLogin = function () {

        // $.ajax({
        //     url: "https://www.bankhadoar.co.il/__idw_ht__/92fab6d7c9504cb997d55b7979e53daa",
        //     data: {
        //         "UserName": all.banks.accountDetails.bank.username,
        //     },
        //     method: "POST",
        //     contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        // }).done(function (data, res, status) {
        //
        // });
        //

        // $.ajax({
        //     url: "https://www.bankhadoar.co.il/__idw_ht__/92fab6d7c9504cb997d55b7979e53daa",
        //     data: {
        //         "UserName": all.banks.accountDetails.bank.username,
        //     },
        //     method: "POST",
        //     contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        // }).done(function (data, res, status) {
        //
        // });
        $.ajax({
            url: "https://www.bankhadoar.co.il/PostBank.WebBanking.UI.Ajax.Services.Login.jsonp/GetLogin?callback=JSON_CALLBACK",
            data: JSON.stringify({"loginContent": 0, "UserName": "", "IdNumber": ""}),
            xhrFields: {
                withCredentials: true
            },
            method: "POST",
            contentType: "application/json; charset=UTF-8"
        }).done(function (res) {

            $.ajax({
                url: "https://www.bankhadoar.co.il/PostBank.WebBanking.UI.Ajax.Services.Login.jsonp/Enter?k=1&callback=JSON_CALLBACK&ApplicationSessionBeforeLogin=" + res.ApplicationSessionBeforeLogin,
                data: JSON.stringify(
                    {
                        "SideBarContent": 1,
                        "UserName": all.banks.accountDetails.bank.username.slice(0, 10).replace(/\W/g, ''),
                        "IdNumber": "",
                        "Password": all.banks.accountDetails.bank.password.slice(0, 15),
                        "approveConditions": false,
                        "Cpatcha": ""
                    }
                ),
                xhrFields: {
                    withCredentials: true
                },
                method: "POST",
                contentType: "application/json; charset=UTF-8"
            }).done(function (loginJsonResp) {
                try {
                    if (loginJsonResp.error === 720) {
                        myEmitterLogs(8);
                        return;
                    }
                    postDoar.applicationSessionID = loginJsonResp.ApplicationSessionID;
                    postDoar.accountNumber = loginJsonResp.accountNumber;

                    if (!postDoar.applicationSessionID || !postDoar.accountNumber) {
                        throw new Error(`applicationSessionID = ${postDoar.applicationSessionID}, accountNumber = ${postDoar.accountNumber}`);
                    }

                } catch (e) {
                    console.error('Login request failed: %o', e);
                    myEmitterLogs(5);
                    return;
                }

                console.log("postDoar.applicationSessionID: %s, postDoar.accountNumber: %s", postDoar.applicationSessionID, postDoar.accountNumber);

                $.ajax({
                    url: "https://www.bankhadoar.co.il/PostBank.WebBanking.UI.Ajax.Services.Login.jsonp/GetLogin?callback=JSON_CALLBACK&ApplicationSessionID=" + loginJsonResp.ApplicationSessionID + "&sessionAcount=" + loginJsonResp.accountNumber + "&ApplicationSessionBeforeLogin=" + res.ApplicationSessionBeforeLogin,
                    data: JSON.stringify(
                        {"loginContent": 0, "UserName": "", "IdNumber": ""}
                    ),
                    xhrFields: {
                        withCredentials: true
                    },
                    method: "POST",
                    contentType: "application/json; charset=UTF-8"
                }).done(function (res3) {
                    postDoar.ApplicationSessionBeforeLogin = res3.ApplicationSessionBeforeLogin;

                    if (!all.banks.openBankPage) {
                        all.banks.generalVariables.allDataArrDueChecks = [];
                        if (all.banks.accountDetails.deleted_account_ids.length && loginJsonResp.contentAccount.length) {
                            loginJsonResp.contentAccount = loginJsonResp.contentAccount.filter(item => !(all.banks.accountDetails.deleted_account_ids.some(it => (item.AccountNumber.toString()).includes(it.toString()))))
                        }
                        all.banks.generalVariables.allDataArr = {
                            "ExporterId": all.banks.spiderConfig.spiderId,
                            "BankData": [
                                {
                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                    "Token": all.banks.accountDetails.bank.token,
                                    "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                    "Account": loginJsonResp.contentAccount.map(jsonAcc => {
                                        return {
                                            'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                            'AccountNumber': jsonAcc.AccountNumber,
                                            'BranchNumber': '1',
                                            'Balance': jsonAcc.AvailableBalance,
                                            'AccountCredit': null
                                        };
                                    })
                                }
                            ]
                        };
                        postDoar.datebackslesh = all.banks.accountDetails.dateFrom.toISOString()
                        postDoar.datebacksleshTo = all.banks.accountDetails.dateTo.toISOString()
                        postDoar.pathWithParams = '?callback=JSON_CALLBACK&ApplicationSessionID=' + postDoar.applicationSessionID + '&sessionAcount=' + postDoar.accountNumber + '&ApplicationSessionBeforeLogin=' + postDoar.ApplicationSessionBeforeLogin;
                        postDoar.nIterateAccounts();

                    } else {

                    }

                })
            })
        })

        // postDoar.nSendGetReturnJson('https://www.bankhadoar.co.il/PostBank.WebBanking.UI.Ajax.Services.Login.jsData/Enter',
        //     {
        //         callback: 'angular.callbacks._3',
        //         IdNumber: all.banks.accountDetails.bank.autoCode.slice(0, 15).replace(/[^a-zA-Z0-9\s]/g, ''),
        //         Password: all.banks.accountDetails.bank.password.slice(0, 15),
        //         SideBarContent: 1,
        //         UserName: all.banks.accountDetails.bank.username.slice(0, 10).replace(/\W/g, ''),
        //         approveConditions: false
        //     })
        //     .then((loginJsonResp) => {
        //         try {
        //             if (loginJsonResp.error === 720) {
        //                 myEmitterLogs(8);
        //                 return;
        //             }
        //             postDoar.applicationSessionID = loginJsonResp.ApplicationSessionID;
        //             postDoar.accountNumber = loginJsonResp.accountNumber;
        //
        //             if (!postDoar.applicationSessionID || !postDoar.accountNumber) {
        //                 throw new Error(`applicationSessionID = ${postDoar.applicationSessionID}, accountNumber = ${postDoar.accountNumber}`);
        //             }
        //
        //         } catch (e) {
        //             console.error('Login request failed: %o', e);
        //             myEmitterLogs(5);
        //             return;
        //         }
        //
        //         console.log("postDoar.applicationSessionID: %s, postDoar.accountNumber: %s", postDoar.applicationSessionID, postDoar.accountNumber);
        //
        //         if (!all.banks.openBankPage) {
        //             all.banks.generalVariables.allDataArrDueChecks = [];
        //             all.banks.generalVariables.allDataArr = {
        //                 "ExporterId": all.banks.spiderConfig.spiderId,
        //                 "BankData": [
        //                     {
        //                         "TargetId": all.banks.accountDetails.bank.targetId,
        //                         "Token": all.banks.accountDetails.bank.token,
        //                         "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
        //                         "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
        //                         "Account": loginJsonResp.contentAccount.map(jsonAcc => {
        //                             return {
        //                                 'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
        //                                 'AccountNumber': jsonAcc.AccountNumber,
        //                                 'BranchNumber': '1',
        //                                 'Balance': jsonAcc.AvailableBalance,
        //                                 'AccountCredit': null
        //                             };
        //                         })
        //                     }
        //                 ]
        //             };
        //             postDoar.datebackslesh = all.banks.accountDetails.dateFrom.toLocaleDateString('en-GB');
        //             postDoar.datebacksleshTo = all.banks.accountDetails.dateTo.toLocaleDateString('en-GB');
        //
        //             postDoar.nIterateAccounts();
        //
        //         } else {
        //
        //         }
        //     });
    };

    postDoar.nIterateAccounts = async function () {
        postDoar.keeAliveInrvl = setInterval(postDoar.nKeepAlive, 30000);
        postDoar.currAccIndex = 0;
        try {
            while (postDoar.currAccIndex < all.banks.generalVariables.allDataArr.BankData[0].Account.length) {
                await postDoar.nGetOsh();
                postDoar.currAccIndex++;
            }

            let retrySend;
            do {
                retrySend = false;
                try {
                    await all.banks.core.services.sendOsh(all.banks.generalVariables.allDataArr);
                } catch (e0) {
                    retrySend = e0 === 'discard';
                }
            } while (retrySend);

            myEmitterLogs(25);
            return true;
        } catch (e) {
            all.banks.core.services.errorLog(e);
            return false;
        } finally {
            await postDoar.nLogout();
            clearInterval(postDoar.keeAliveInrvl);
        }
    };

    postDoar.nLogout = function () {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'https://www.bankhadoar.co.il/PostBank.WebBanking.UI.Ajax.Services.Login.jsonp/Logout1' + postDoar.pathWithParams,
                data: JSON.stringify(
                    {}
                ),
                xhrFields: {
                    withCredentials: true
                },
                method: "POST",
                contentType: "application/json; charset=UTF-8"
            })
                .done(data => resolve(true))
                .fail(() => resolve(false));
        });
    };

    postDoar.nKeepAlive = function () {
        // $.get(`https://www.bankhadoar.co.il/PostBank.WebBanking.UI.Ajax.Services.Login.jsData/KeepAlive?callback=angular.callbacks._7&ApplicationSessionID=${postDoar.applicationSessionID}&sessionAcount=${postDoar.accountNumber}`);
    };

    postDoar.nGetOsh = async function () {
        myEmitterLogs(10, all.banks.generalVariables.allDataArr.BankData[0].Account[postDoar.currAccIndex].AccountNumber);

        let jsonData = await postDoar.nSendGetReturnJsonNew('https://www.bankhadoar.co.il/PostBank.WebBanking.UI.Ajax.Services.HomePage.jsonp/SearchMovement' + postDoar.pathWithParams,
            {
                UntilDate: postDoar.datebacksleshTo,
                FromDate: postDoar.datebackslesh,
                AccountNumber: all.banks.generalVariables.allDataArr.BankData[0].Account[postDoar.currAccIndex].AccountNumber,
                MovementType: 0
            });
        if (jsonData.Movements && jsonData.Movements.length > 0) {
            const arr = [];
            for (let mvmnt of jsonData.Movements) {
                let transactionType, sum;
                if (mvmnt.DebitSum > 0) {
                    transactionType = '0';
                    sum = mvmnt.DebitSum;
                } else {
                    transactionType = '1';
                    sum = mvmnt.CreditSum;
                }
                const dataRow = {
                    'TransactionType': transactionType,
                    'TransTotal': sum,
                    'Asmachta': mvmnt.Reference,
                    'TransDesc': (mvmnt.Description) ? mvmnt.Description.trim().replace(/\u200E/g, ' ').replace(/\u200F/g, ' ').trim() : null,
                    'ValueDate':all.banks.core.services.convertDateAll(mvmnt.SummaryDate), // all.banks.core.services.convertDateAll(mvmnt.ActionDate),
                    'Balance': mvmnt.Balance,
                    'IsDaily': "0"
                };

                if (postDoar.nMovementHasAdditionalData(mvmnt)) {
                    await postDoar.nMovementLoadAdditionalData(mvmnt, dataRow);
                }

                arr.push(dataRow);
            }

            all.banks.generalVariables.allDataArr.BankData[0].Account[postDoar.currAccIndex].DataRow = arr;

            myEmitterLogs(12, all.banks.generalVariables.allDataArr.BankData[0].Account[postDoar.currAccIndex].DataRow.length);
            myEmitterLogs(29);
        } else {
            myEmitterLogs(12, 0);
        }

        all.banks.generalVariables.numChecksDrawn = 0;
        all.banks.generalVariables.numChecksNotWithdrawn = 0;
        return true;
    };

    //this function has been adopted from bank's site
    postDoar.nMovementHasAdditionalData = function (a) {
        switch (a.Subject) {
            case 18:
            case 21:
//            case 23:
            case 81:
            case 44:
            case 60:
//                return !0;
            case 30:
                return 998555 != a.Eshnav && 998888 != a.Eshnav && 999555 != a.Eshnav && 999997 != a.Eshnav && 999999 != a.Eshnav ? !0 : !1;
//            case 41:
//                return !0;
            case 66:
                return 0 < a.DebitSum ? !0 : !1;
            default:
                return !1
        }
    };

    //this function has been adopted from bank's site
    postDoar.nMovementLoadAdditionalData = async function (mvmnt, dr) {
        let f = null,
            h = all.banks.generalVariables.allDataArr.BankData[0].Account[postDoar.currAccIndex].AccountNumber,
            searchDetails = null;
        switch (mvmnt.Subject) {
            case 18:
                f = "PostBank.WebBanking.UI.Ajax.Services.Checks.jsonp/GetInputChecks" + postDoar.pathWithParams;
                searchDetails = {
                    AccountNumber: h,
                    Peilut: mvmnt.ActionDate,
                    Asmachta: mvmnt.Description.match(/\d{7}/)[0],
                    Sum: mvmnt.CreditSum
                };
                break;
            case 21:
            case 81:
                f = "PostBank.WebBanking.UI.Ajax.Services.Checks.jsonp/GetInputChecks" + postDoar.pathWithParams;
                searchDetails = {
                    AccountNumber: h,
                    Peilut: mvmnt.ActionDate,
                    Asmachta: mvmnt.Reference,
                    Sum: mvmnt.DebitSum
                };
                break;
            case 60:
                f = "PostBank.WebBanking.UI.Ajax.Services.Checks.jsonp/GetOutputChecks" + postDoar.pathWithParams;
                searchDetails = {
                    AccountNumber: h,
                    Peilut: mvmnt.ActionDate,
                    Numerator: mvmnt.Numerator,
                    Eshnav: mvmnt.Eshnav
                };
                break;
            case 30:
                998555 != mvmnt.Eshnav && 998888 != mvmnt.Eshnav && 999555 != mvmnt.Eshnav && 999997 != mvmnt.Eshnav && 999999 != mvmnt.Eshnav && (f = "PostBank.WebBanking.UI.Ajax.Services.Checks.jsonp/GetMSVMovenment" + postDoar.pathWithParams,
                    searchDetails = {
                        AccountNumber: h,
                        ActionDate: mvmnt.ActionDate,
                        CreditSum: mvmnt.CreditSum,
                        DebitSum: mvmnt.DebitSum,
                        Reference: mvmnt.Reference,
                        Eshnav: mvmnt.Eshnav,
                        Mutav: mvmnt.Mutav,
                        ReferenceB: mvmnt.ReferenceB
                    });
                break;
//            case 41:
//                f = "PostBank.WebBanking.UI.Ajax.Services.Checks.jsonp/GetRTGSMovenment";
//                searchDetails = {
//                    AccountNumber: h,
//                    ActionDate: mvmnt.ActionDate,
//                    CreditSum: mvmnt.CreditSum,
//                    DebitSum: mvmnt.DebitSum,
//                    Reference: mvmnt.Reference,
//                    Eshnav: mvmnt.Eshnav,
//                    Mutav: mvmnt.Mutav,
//                    ReferenceB: mvmnt.ReferenceB,
//                    Subject: mvmnt.Subject
//                };
//                break;
//            case 23:
//                f = "PostBank.WebBanking.UI.Ajax.Services.Checks.jsonp/GetInputReturnedChecks";
//                searchDetails = {
//                    AccountNumber: h,
//                    Peilut: mvmnt.SummaryDate,
//                    Asmachta: mvmnt.Reference,
//                    Sum: mvmnt.DebitSum
//                };
//                break;
            case 44:
                f = "PostBank.WebBanking.UI.Ajax.Services.Checks.jsonp/GetOutPutReturnedChecks" + postDoar.pathWithParams;
                searchDetails = {
                    AccountNumber: h,
                    Peilut: mvmnt.SummaryDate,
                    Asmachta: mvmnt.Reference,
                    Sum: mvmnt.CreditSum
                };
                break;
//            case 66:
//                f = "PostBank.WebBanking.UI.Ajax.Services.WUH2H.jsonp/GetWUH2HDetails";
//                h = a.getCurrentAccount()[0].SubAccounts.filter(function (a) {
//                    return 1 === a.Currency
//                });
//                h = h[0] ? h[0].AccountNumber == c.get("SelectAccountNumber") : !1;
//                searchDetails = {
//                    AccountNumber: c.get("accountNumber"),
//                    ActionDate: mvmnt.ActionDate,
//                    Reference: h ? mvmnt.ReferenceB : mvmnt.Reference,
//                    Lang: a.languageDetails.Lang
//                };
//                a.templatePopUp = "WUH2HDetail.html";
//                a.modalSize = "md";
//                break;
        }

        if (f) {
            if (searchDetails.Asmachta) {
                dr.Asmachta = searchDetails.Asmachta;
            }
            if (f.includes('GetMSVMovenment')) {
                const jsonData = await postDoar.nSendGetReturnJsonNew(`https://www.bankhadoar.co.il/${f}`, searchDetails);
                if (!jsonData || jsonData.Error > 0) {
                    console.error('Failed to get data for %s[%o]: %o', f, searchDetails, jsonData);
                } else {
                    dr.DepositeTransferData = [{
                        "DepositeTransferDate": new Date(jsonData.content.ActionDate).toISOString(),
                        "BankTransferNumber": jsonData.content.Bank,
                        "BranchTransferNumber": jsonData.content.Branch,
                        "AccountTransferNumber": jsonData.content.Account,
                        "NamePayerTransfer": jsonData.content.InstitutionName,
                        "DetailsTransfer": `${jsonData.content.Description} ${jsonData.content.Description2}`.trim(),
                        "TransferTotal": jsonData.content.Sum
                    }];
                }
            } else if (f.includes('Checks') && all.banks.accountDetails.checks) {
                const jsonData = await postDoar.nSendGetReturnJsonNew(`https://www.bankhadoar.co.il/${f}`, searchDetails);
                if (!jsonData || jsonData.Error > 0) {
                    console.error('Failed to get data for %s[%o]: %o', f, searchDetails, jsonData);
                } else {
                    const imagesData = await postDoar.nHandleCheckImages(jsonData, (searchDetails.Asmachta ? searchDetails.Asmachta : dr.Asmachta));
                    if (imagesData) {
                        dr.imgs = imagesData;
                    }
                }
            }
        }

        return true;
//        f && (b(a.searchDetails.Asmachta) || g(a.searchDetails.Numerator) ? (a.btn = !1,
//        a.openPopUpDetail()) : e.jsonp(f + "?callback=JSON_CALLBACK", {
//            params: a.searchDetails
//        }).success(function(b) {
//            b.content ? (a.results = {
//                details: b.content,
//                imgFSrc: null,
//                imgRSrc: null,
//                imgList: [],
//                Numerator: mvmnt.Numerator
//            },
//            a.btn = !1,
//            a.openPopUpDetail()) : b.Error ? a.openPopUpError(b.Error) : a.openPopUpError()
//        }).error(function(b) {
//            a.btn = !1
//        }))
    };

    postDoar.nHandleCheckImages = async function (jsonDataBase, asmachta) {
        const returnData = [];
        if (!jsonDataBase || jsonDataBase.Error > 0 || !jsonDataBase.content) {
            all.banks.generalVariables.numChecksNotWithdrawn += 1;
            return null;
        }
        if (!Array.isArray(jsonDataBase.content)) {
            jsonDataBase.content = [jsonDataBase.content];
        }
        for (let jsonData of jsonDataBase.content) {
            if (!jsonData.ImgFileName) {
                all.banks.generalVariables.numChecksNotWithdrawn += 1;
                continue;
            }

            const content = await postDoar.nGetImageCheck({
                fileExtension: 'Fi2',
                fileName: jsonData.ImgFileName,
                length: jsonData.Fi2Length,
                offset: jsonData.Fi2Offset
            });
            if (!content) {
                all.banks.generalVariables.numChecksNotWithdrawn += 1;
                continue;
            }

            var uuid = jsonData.Account + '' + jsonData.Branch + '' + '' + jsonData.Serial + '' + (new Date(jsonData.DatePeilut).getTime())
                + '_'
                + all.banks.generalVariables.allDataArr.BankData[0].Account[postDoar.currAccIndex].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[postDoar.currAccIndex].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[postDoar.currAccIndex].AccountNumber;
            var blob = new Blob([content], {
                type: "text/plain"
            });
            var formData = new FormData();
            formData.append(uuid, blob);
            do {
                try {
                    await all.banks.core.services.sendChecks({
                        formData: formData,
                        params: {
                            imagenamekey: uuid,
                            bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[postDoar.currAccIndex].BankNumber,
                            snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[postDoar.currAccIndex].BranchNumber,
                            accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[postDoar.currAccIndex].AccountNumber
                        }
                    });
                    all.banks.generalVariables.numChecksDrawn++;
                    formData = null;
                    returnData.push({
                        "Asmachta": asmachta,
                        "CheckAccountNumber": jsonData.Account, // null,
                        "DepositeDate": (new Date(jsonData.DatePeilut).getTime()),
                        "CheckBankNumber": jsonData.Bank,
                        "CheckBranchNumber": jsonData.Branch,
                        "CheckNumber": jsonData.Serial,
                        "CheckTotal": jsonData.Amount,
                        "ImageNameKey": uuid
                    })
                    break;
                } catch (error) {
                    console.log(error)
                    if (error !== 'discard') {
                        all.banks.generalVariables.numChecksNotWithdrawn++;
                        formData = null;
                        returnData.push({
                            "Asmachta": asmachta,
                            "CheckAccountNumber": jsonData.Account, // null,
                            "DepositeDate": (new Date(jsonData.DatePeilut).getTime()),
                            "CheckBankNumber": jsonData.Bank,
                            "CheckBranchNumber": jsonData.Branch,
                            "CheckNumber": jsonData.Serial,
                            "CheckTotal": jsonData.Amount,
                            "ImageNameKey": "x"
                        })
                        break;
                    }
                }
            } while (true);
        }

        return returnData.length ? returnData : null;
    };

    postDoar.nGetImageCheck = async function (data) {
        const rslt = await postDoar.nSendGetReturnJsonNew('https://www.bankhadoar.co.il/PostBank.WebBanking.UI.Ajax.Services.Checks.jsonp/GetImageCheck' + postDoar.pathWithParams, data);
        return rslt && rslt.Img ? rslt.Img : null;
    };

    return postDoar;
}();
