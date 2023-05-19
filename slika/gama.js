class gama {

    constructor() {
        this.arr = [];
        this.cookies = "";
        this.isNewWebSite = false;
    }

    getInitPage() {
        return new Promise((resolve, reject) => {
            $.get('https://www.gamaf.co.il/front').done(() => {
                all.banks.core.services.removingCookie(false, function () {
                    document.cookie = '';
                    nw.App.clearCache();
                    setTimeout(() => {
                        $('#filecontainerloginWithExplorerUserAgent').attr('src', 'https://www.gamaf.co.il/front');
                        let times = 1;
                        const checker = setInterval(() => {
                            monitorActivityClass.setIntervalActivity();
                            const currentContent = $('#filecontainerloginWithExplorerUserAgent').contents();
                            if (currentContent.find("input[name='qwd_mstms']").length && currentContent.find("input[name='sysmh_']").length) {
                                clearInterval(checker);
                                setTimeout(() => {
                                    // debugger
                                    resolve(true);
                                }, 10000)
                            } else if (times++ > 60) {
                                $('#filecontainerloginWithExplorerUserAgent').attr('src', '');
                                clearInterval(checker);
                                resolve(false);
                            }
                        }, 1000);
                    }, 3000);

                })
            })
        });
    }

    isLoginExist() {
        return new Promise((resolve, reject) => {
            let times = 1;
            let timerTime = 0;

            async function runLogin() {
                timerTime++;
                monitorActivityClass.setIntervalActivity();
                const currentContent = $('#filecontainerloginWithExplorerUserAgent').contents();
                if (currentContent.find('.error.help-block').length) {
                    writeLog("gama error.help-block");
                    // debugger
                    // await clearProxy();
                    if (currentContent.find('.error.help-block').text().includes('תוקף הסיסמא פג')) {
                        myEmitterLogs(6);
                        resolve(false);
                    } else if (currentContent.find('.error.help-block').text().includes('אנא פנה לאיש הקשר שלך בגמא')) {
                        myEmitterLogs(9, 'אנא פנה לאיש הקשר שלך בגמא');
                        resolve(false);
                    } else if (currentContent.find('.error.help-block').text().includes('שגויים')) {
                        myEmitterLogs(5, 'נתוני כניסה שגויים');
                        resolve(false);
                    } else if (currentContent.find('.error.help-block').text().includes('אינם תקינים')) {
                        myEmitterLogs(5, 'נתוני כניסה אינם תקינים');
                        resolve(false);
                    } else if (currentContent.find('.error.help-block').text().includes('תחזוקה')) {
                        myEmitterLogs(9, 'האתר אינו זמין כעת');
                        resolve(false);
                    }
                } else {
                    if (currentContent.find("input[name='qwd_mstms']").length && currentContent.find("input[name='sysmh_']").length) {
                        writeLog("gama currentContent.find(\"input[name='qwd_mstms']\").length && currentContent.find(\"input[name='sysmh_']\").length");
                        // debugger
                        if (times++ > 60) {
                            resolve(false);
                        } else {
                            if (timerTime === 1) {
                                writeLog("gama timerTime 1");
                                $('#filecontainerloginWithExplorerUserAgent').contents().find("input[name='qwd_mstms']").val(all.banks.accountDetails.bank.username.slice(0, 16));
                                $('#filecontainerloginWithExplorerUserAgent').contents().find("input[name='sysmh_']").val(all.banks.accountDetails.bank.password.slice(0, 16));
                                setTimeout(() => {
                                    $('#filecontainerloginWithExplorerUserAgent').contents().find('.sticky-enter form .btn-default[type="submit"]').click();
                                    setTimeout(() => {
                                        runLogin()
                                    }, 5000)
                                }, 2500);
                            } else if (timerTime === 20) {
                                writeLog("gama timerTime 8");
                                timerTime = 0;
                                runLogin()
                            } else {
                                writeLog("gama timerTime " + timerTime);
                                setTimeout(() => {
                                    runLogin()
                                }, 1000)
                            }
                        }
                    } else {
                        writeLog("gama !!currentContent.find(\"input[name='qwd_mstms']\").length && currentContent.find(\"input[name='sysmh_']\").length");
                        // debugger
                        resolve(true);
                    }
                }
            }

            runLogin()
        });
    }

    getPageGo() {
        return new Promise((resolve, reject) => {
            let times = 1;
            const checker = setInterval(() => {
                monitorActivityClass.setIntervalActivity();
                const currentContent = $('#filecontainerloginWithExplorerUserAgent').contents();
                if (currentContent.find('input[name="GO"]').length) {
                    writeLog("gama currentContent.find('input[name=\"GO\"]').length");
                    // debugger
                    clearInterval(checker);
                    setTimeout(() => {
                        resolve(true);
                    }, 1000)
                } else if (times++ > 60) {
                    // debugger
                    writeLog("gama !currentContent.find('input[name=\"GO\"]').length");
                    $('#filecontainerloginWithExplorerUserAgent').attr('src', '');
                    clearInterval(checker);
                    resolve(false);
                }
            }, 5000);
        });
    }

    getCustomerPage() {
        return new Promise((resolve, reject) => {
            let times = 1;
            const checker = setInterval(() => {
                monitorActivityClass.setIntervalActivity();
                const currentContent = $('#filecontainerloginWithExplorerUserAgent').contents();
                if (currentContent.find('#Customer').length) {
                    clearInterval(checker);
                    setTimeout(() => {
                        resolve(true);
                    }, 1000)
                } else if (currentContent.find('#OldPass').length) {
                    clearInterval(checker);
                    resolve('OldPass');
                } else if (times++ > 60) {
                    $('#filecontainerloginWithExplorerUserAgent').attr('src', '');
                    clearInterval(checker);
                    resolve(false);
                }
            }, 4000);
        });
    }

    checkIfChangeAcc(paramsToChangeAccTafnit) {
        return new Promise((resolve, reject) => {
            window.frames[2].fetch('https://www.gamaf.co.il/TAFNIT/%25CSP.Broker.cls',
                {
                    method: 'POST',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: paramsToChangeAccTafnit
                })
                .then((response) => {
                    return response.text();
                })
                .then((page) => {
                    // console.log(page)
                    try {
                        resolve({
                            prevSum: page.split("LastUnionBalance.innerHTML='")[1].split("'}")[0].replace(/[^\d\.-]/g, ""),
                            prevDate: page.split("LastUnionPayDate.innerHTML='")[1].split("'}")[0].replace(/[^\d\/]/g, ""),
                            nextSum: page.split("NextUnionBalance.innerHTML='")[1].split("'}")[0].replace(/[^\d\.-]/g, ""),
                            nextDate: page.split("NextUnionPayDate.innerHTML='")[1].split("'}")[0].replace(/[^\d\/]/g, "")
                        });
                    } catch (e) {
                        resolve(false)
                    }

                    // 00jp00080000Wdw2R8AbC000009sXKYJ3oZm$iyt3MAplEHQ--
                    // #R
                    // var frontwin=((frontwindow.closed) ? self : frontwindow) ;
                    // if (document.all.LastUnionPayDate) {document.all.LastUnionPayDate.innerHTML='11/08/2020'} ;
                    // if (document.all.NextUnionPayDate) {document.all.NextUnionPayDate.innerHTML='18/08/2020'} ;
                    // if (document.all.LastUnionBalance) {document.all.LastUnionBalance.innerHTML='78,754.31'} ;
                    // if (document.all.NextUnionBalance) {document.all.NextUnionBalance.innerHTML='69,430.97'} ;
                    //
                    // #OK
                })
        });
    }

    logoutWait() {
        return new Promise((resolve, reject) => {
            try {
                window.frames[2].fetch('https://www.gamaf.co.il/TAFNIT/exit',
                    {
                        method: 'GET', // *GET, POST, PUT, DELETE, etc.
                        mode: 'cors', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        redirect: 'follow', // manual, *follow, error
                        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    })
                    .then((response) => {
                        return response.text();
                    })
                    .then((res) => {
                        setTimeout(() => {
                            resolve(true);
                        }, 1500);
                    })
            } catch (e) {
                setTimeout(() => {
                    resolve(true);
                }, 1500);
            }
        });
    }


    logoutNewWait() {
        return new Promise((resolve, reject) => {
            try {
                fetch('https://op.gamaf.co.il/gama-service/logout',
                    {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        mode: 'cors', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        headers: {
                            'content-type': 'application/json',
                        },
                        redirect: 'follow', // manual, *follow, error
                        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                        body: JSON.stringify({})
                    })
                    .then((response) => {
                        return response.json();
                    })
                    .then(() => {
                        fetch('https://op.gamaf.co.il/gama-service/destroyUcode',
                            {
                                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                                mode: 'cors', // no-cors, *cors, same-origin
                                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                                credentials: 'same-origin', // include, *same-origin, omit
                                headers: {
                                    'content-type': 'application/json',
                                },
                                redirect: 'follow', // manual, *follow, error
                                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                                body: JSON.stringify({})
                            })
                            .then((response) => {
                                return response.json();
                            })
                            .then(() => {
                                fetch('https://www.gamaf.co.il/flag/resolve',
                                    {
                                        method: 'GET', // *GET, POST, PUT, DELETE, etc.
                                        mode: 'cors', // no-cors, *cors, same-origin
                                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                                        credentials: 'same-origin', // include, *same-origin, omit
                                        redirect: 'follow', // manual, *follow, error
                                        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                                    })
                                    .then((response) => {
                                        return response.text();
                                    })
                                    .then((res) => {
                                        setTimeout(() => {
                                            resolve(true);
                                        }, 1500);
                                    })
                            })
                    })
            } catch (e) {
                setTimeout(() => {
                    resolve(true);
                }, 1500);
            }
        });
    }

    getNewData() {
        fetch('https://op.gamaf.co.il/gama-service/getCustomers',
            {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'content-type': 'application/json',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify({})
            }).then((response) => {
            return response.json();
        })
            .then(async (getCustomersData) => {
                monitorActivityClass.setIntervalActivity()

                const getCustomersRes = getCustomersData.filter((cus) => cus.id !== '0' && cus.id !== 0)
                for (let i = 0; i < getCustomersRes.length; i++) {
                    var customer = getCustomersRes[i];
                    const solek_desc = decodeURI(customer.name)
                    const response = await fetch('https://op.gamaf.co.il/gama-service/PrintPayData',
                        {
                            method: 'POST', // *GET, POST, PUT, DELETE, etc.
                            mode: 'cors', // no-cors, *cors, same-origin
                            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                            credentials: 'same-origin', // include, *same-origin, omit
                            headers: {
                                'content-type': 'application/json',
                            },
                            redirect: 'follow', // manual, *follow, error
                            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                            body: JSON.stringify({
                                "Customer": customer.id
                            })
                        })
                    monitorActivityClass.setIntervalActivity()
                    if (!response.ok) {
                        const message = `An error has occured: ${response.status}`;
                        throw new Error(message);
                    }

                    const printPayData = await response.json();
                    if (printPayData && printPayData.rowSet1 && printPayData.rowSet1.rows && printPayData.rowSet1.rows.length) {
                        printPayData.rowSet1.rows.forEach((row) => {
                            if (row.LastPayDate !== "") {
                                const objData = {
                                    "target_idStr": all.banks.accountDetails.bank.targetId,
                                    "tokenStr": all.banks.accountDetails.bank.token,
                                    "bankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    "solek_desc": solek_desc,
                                    "paymentsTotal": 0,
                                    "grandTotal": 0,
                                    "slikaAccount": row.NunCus,
                                    "cardType": 90,
                                    "extractDate": (new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2)),
                                    "regularPaymentsTotal": row.SumInLastPayDate,
                                    "nextTotal": row.SumInLastPayDate,
                                    "valueDate": all.banks.core.services.convertDateAll(new Date(Number(row.LastPayDate.slice(0, 4)), Number(row.LastPayDate.slice(4, 6)) - 1, Number(row.LastPayDate.slice(6, 8))))
                                }
                                // if (Number(objData.valueDate.split('/')[2]) > 1980) {
                                this.arr.push(objData);
                                // }
                            }
                            if (row.NextPayDate !== "") {
                                const objData = {
                                    "target_idStr": all.banks.accountDetails.bank.targetId,
                                    "tokenStr": all.banks.accountDetails.bank.token,
                                    "bankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    "solek_desc": solek_desc,
                                    "paymentsTotal": 0,
                                    "grandTotal": 0,
                                    "slikaAccount": row.NunCus,
                                    "cardType": 90,
                                    "extractDate": (new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2)),
                                    "regularPaymentsTotal": row.SumItra,
                                    "nextTotal": row.SumItra,
                                    "valueDate": all.banks.core.services.convertDateAll(new Date(Number(row.NextPayDate.slice(0, 4)), Number(row.NextPayDate.slice(4, 6)) - 1, Number(row.NextPayDate.slice(6, 8))))
                                }
                                // if (Number(objData.valueDate.split('/')[2]) > 1980) {
                                this.arr.push(objData);
                                // }
                            }
                        })
                    }
                }
                await this.logoutNewWait();
                await clearProxy();
                monitorVpn.killVpn(async () => {
                    let keepTrying = true;
                    do {
                        writeLog("gama slika send results...");
                        try {
                            await all.banks.core.services.slikaAccount(this.arr);
                            keepTrying = false;
                            writeLog("gama slika send results... Done");
                        } catch (error) {
                            writeLog("gama slika send results... Got " + error);
                            keepTrying = 'discard' === error;
                        }
                    } while (keepTrying);
                    writeLog("gama slika killVpn");
                    myEmitterLogs(25);
                })
            })

    }

    getData(resPage) {
        var dataRes = all.banks.core.services.parseHtml(resPage);
        const link = "https://www.gamaf.co.il" + dataRes.find('#GO').attr('ONCLICK').split("this.form.action='")[1].split("'")[0]
        var serializeForm = dataRes.find("form").serializeArray();
        var obj = {};
        serializeForm.forEach((vals) => {
            obj[vals.name] = vals.value;
        });
        obj["wbOFFICE"] = '12*12*12*12*12*1*';
        obj["wbActualScreenRes"] = '';
        obj["wbNavigatorName"] = 'Microsoft+Internet+Explorer';
        const paramsToTafnit = new URLSearchParams(obj)
        window.frames[2].fetch(link,
            {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: paramsToTafnit
            })
            .then(res => res.arrayBuffer())
            .then(arrayBuffer => iconv.decode(new Buffer(arrayBuffer), 'iso-8859-8').toString())
            .then(async (page) => {
                if (all.banks.openBankPage) {
                    $('#filecontainerloginWithExplorerUserAgent').attr('src', link);

                    try {
                        $('#filecontainerloginWithExplorerUserAgent').show();
                        $('html, body').animate({scrollTop: 1000}, 1000);
                    } catch (e) {

                    }
                    return;
                } else {
                    // console.log(page)
                    let currentContent = all.banks.core.services.parseHtml(page);
                    if (currentContent.find('#Customer').length) {
                        const selectCtrlDOMName = 'Customer';
                        let slikaAccountsDOM = currentContent.find(`select[name='${selectCtrlDOMName}'] option`);
                        let isChangeAcc;
                        for (let i = 0, lastPrevSum, lastPrevDate, lastNextSum, lastNextDate; i < slikaAccountsDOM.length; i++) {
                            const v = $(slikaAccountsDOM[i]);

                            let prevSum = isChangeAcc ? isChangeAcc.prevSum : currentContent.find("#LastUnionBalance").text().replace(/[^\d\.-]/g, "");
                            let prevDate = isChangeAcc ? isChangeAcc.prevDate : currentContent.find("#LastUnionPayDate").text().replace(/[^\d\/]/g, "");
                            let nextSum = isChangeAcc ? isChangeAcc.nextSum : currentContent.find("#NextUnionBalance").text().replace(/[^\d\.-]/g, "");
                            let nextDate = isChangeAcc ? isChangeAcc.nextDate : currentContent.find("#NextUnionPayDate").text().replace(/[^\d\/]/g, "");

                            if (i === 0 || lastPrevSum !== prevSum || lastPrevDate !== prevDate
                                || lastNextSum !== nextSum || lastNextDate !== nextDate) {

                                lastPrevSum = prevSum;
                                lastPrevDate = prevDate;
                                lastNextSum = nextSum;
                                lastNextDate = nextDate;
                                if (prevDate) {
                                    this.arr.push({
                                        "target_idStr": all.banks.accountDetails.bank.targetId,
                                        "tokenStr": all.banks.accountDetails.bank.token,
                                        "bankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                        "solek_desc": $(v).text().replace($(v).val(), '').replace(' - ', '').trim(),
                                        "paymentsTotal": 0,
                                        "grandTotal": 0,
                                        "slikaAccount": $(v).val(),
                                        "cardType": 90,
                                        "extractDate": (new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2)),
                                        "regularPaymentsTotal": prevSum,
                                        "nextTotal": prevSum,
                                        "valueDate": prevDate
                                    });
                                }
                                if (nextDate) {
                                    this.arr.push({
                                        "target_idStr": all.banks.accountDetails.bank.targetId,
                                        "tokenStr": all.banks.accountDetails.bank.token,
                                        "bankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                        "solek_desc": $(v).text().replace($(v).val(), '').replace(' - ', '').trim(),
                                        "paymentsTotal": 0,
                                        "grandTotal": 0,
                                        "slikaAccount": $(v).val(),
                                        "cardType": 90,
                                        "extractDate": (new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2)),
                                        "regularPaymentsTotal": nextSum,
                                        "nextTotal": nextSum,
                                        "valueDate": nextDate
                                    });
                                }
                            }

                            writeLog(`gama slika traverse: processing account ${$(v).val()}... done`);
                            if (i + 1 < slikaAccountsDOM.length) {
                                const valNextAcc = slikaAccountsDOM.eq(i + 1).val();
                                const paramsForChangeAcc = page.split("cspHttpServerMethod('")[1].split("',")[0]
                                const paramsToChangeAccTafnit = 'WARGC=3&WEVENT=' + paramsForChangeAcc + '&WARG_1=TAFNIT&WARG_2=run&WARG_3=EventSrc~Customer~wbInCustomer~' + valNextAcc + '~%25paramlst~wbInCustomer%2C1~%25guid~%20~wblookup~~wberrtreat~~'
                                isChangeAcc = await this.checkIfChangeAcc(paramsToChangeAccTafnit)
                                if (isChangeAcc === false) {
                                    i = slikaAccountsDOM.length
                                }
                            } else {
                            }
                        }

                        await this.logoutWait();
                        // await clearProxy();
                        monitorVpn.killVpn(async () => {
                            let keepTrying = true;
                            do {
                                writeLog("gama slika send results...");
                                try {
                                    await all.banks.core.services.slikaAccount(this.arr);
                                    keepTrying = false;
                                    writeLog("gama slika send results... Done");
                                } catch (error) {
                                    writeLog("gama slika send results... Got " + error);
                                    keepTrying = 'discard' === error;
                                }
                            } while (keepTrying);
                            writeLog("gama slika killVpn");
                            myEmitterLogs(25);
                        })

                    } else if (currentContent.find('#OldPass').length) {
                        myEmitterLogs(6);
                    } else {
                        myEmitterLogs(9);
                    }
                }
            })
    }

    async process() {
        //if (!all.banks.spiderConfig.IsGamaWithout_VPN_PROXY) {
        // writeLog("gama slika setProxy");
        // await clearProxy();
        // await setProxy();
        // }
        writeLog("gama getInitPage");
        monitorActivityClass.setIntervalActivity()
        window.frames[2].fetch('https://www.gamaf.co.il/',
            {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            })
            .then((response) => {
                return response.text();
            })
            .then((res) => {
                monitorActivityClass.setIntervalActivity()
                const form_build_id = $(res).find("input[name='form_build_id']").val()
                const params = new URLSearchParams({
                    'qwd_mstms': all.banks.accountDetails.bank.username.slice(0, 16),
                    'sysmh_': all.banks.accountDetails.bank.password.slice(0, 16),
                    'form_build_id': form_build_id,
                    'form_id': 'webform_submission_sticky_enter_page_variant_homepage-panels_variant-0_form',
                    'g-recaptcha-response': '',
                    'recaptcha': ''
                })
                window.frames[2].fetch('https://www.gamaf.co.il/flag/login',
                    {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        mode: 'cors', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        },
                        redirect: 'follow', // manual, *follow, error
                        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                        body: params
                    })
                    .then((response) => {
                        return response.json();
                    })
                    .then(async (reee) => {
                        monitorActivityClass.setIntervalActivity()
                        console.log(reee)
                        // {
                        //     status: "0"
                        //     response: "תקין"
                        //     Ucode: "5a2rkE8WYGsu7bGjcmpGFzhHL"
                        //     ts: 1597380925
                        //     t: "4e2b43a69bd17853d4163f61f839b1d7"
                        //     UserName: "אופטיקה בגבעה - חיים שחף"
                        //     UserCode: "20006"
                        //     LinkAfterLogin: "https://www.gamaf.co.il/INTERNET/first.csp?UCODE=5a2rkE8WYGsu7bGjcmpGFzhHL&RAZ=17"
                        //     SiteVersion: "2009"
                        //     NeedToSighnOnGamaCodex: 0
                        //     NeedToSighnOnKontrolCodex: 0
                        // }

                        // new res from new WebSite{
                        //     status: "0"
                        //     response: "תקין"
                        //     Ucode: "uXDkTcNptpNDRwQ2ohgtJEv13qsiQr"
                        //     ts: 1600358477
                        //     t: "7f2e5d55f9273cb41a9ca6fcde2ca4e2"
                        //     UserName: "חצי שירה-תמר"
                        //     UserCode: "27619"
                        //     LinkAfterLogin: "https://op.gamaf.co.il/gama-service/prelogin?"
                        //     SiteVersion: "2017"
                        //     NeedToSighnOnGamaCodex: 0
                        //     NeedToSighnOnKontrolCodex: 0
                        // }
                        if (reee.SiteVersion === '2017') {
                            this.isNewWebSite = true;
                            //await clearProxy();
                            document.cookie = window.frames[2].document.cookie;
                            for (const cookie of document.cookie.split(";")) {
                                let [name, val] = cookie.split(";")[0].split("=");
                                if (name && val) {
                                    win.cookies.set({
                                        url: "https://www.gamaf.co.il",
                                        name: name.replace(/\s/g, ""),
                                        domain: ".www.gamaf.co.il",
                                        value: val.replace(/\s/g, "")
                                    });
                                }
                            }
                            // reee = await this.processNewWebsite();
                            // if (!all.banks.spiderConfig.IsGamaWithout_VPN_PROXY) {
                            //     await clearProxy();
                            //     await all.banks.core.main.changeIpV4('israel')
                            // }
                        }
                        if (reee.response === 'תקין') {
                            var LinkAfterLogin = reee.LinkAfterLogin;
                            if (this.isNewWebSite) {
                                LinkAfterLogin = encodeURI(`${reee.LinkAfterLogin}Ucode=${reee.Ucode}&UserName=${reee.UserName}&UserCode=${reee.UserCode}&NeedToSighnOnGamaCodex=${reee.NeedToSighnOnGamaCodex}&NeedToSighnOnKontrolCodex=${reee.NeedToSighnOnKontrolCodex}&ts=${reee.ts}&t=${reee.t}`)
                                if (all.banks.openBankPage) {
                                    all.banks.core.services.openBankPage(LinkAfterLogin);
                                    return
                                }
                            }
                            const senderFetch = this.isNewWebSite ? fetch : window.frames[2].fetch
                            senderFetch(LinkAfterLogin,
                                {
                                    method: 'GET', // *GET, POST, PUT, DELETE, etc.
                                    mode: 'cors', // no-cors, *cors, same-origin
                                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                                    credentials: 'same-origin', // include, *same-origin, omit
                                    redirect: 'follow', // manual, *follow, error
                                    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                                })
                                .then((response) => {
                                    return response.text();
                                })
                                .then(async (resPage) => {
                                    monitorActivityClass.setIntervalActivity()
                                    localStorage.setItem('gama', JSON.stringify({
                                        UserCode: reee.UserCode,
                                        UserName: reee.UserName,
                                    }));
                                    if (this.isNewWebSite) {
                                        this.getNewData()
                                    } else {
                                        this.getData(resPage)
                                    }
                                })
                        } else {
                            await clearProxy();
                            monitorVpn.killVpn(async () => {
                                if (reee.response.includes('תוקף הסיסמא פג')) {
                                    myEmitterLogs(6);
                                } else if (reee.response.includes('פנה לאיש הקשר')) {
                                    myEmitterLogs(9, 'אנא פנה לאיש הקשר שלך בגמא');
                                } else if (reee.response.includes('שגויים')) {
                                    myEmitterLogs(5, 'נתוני כניסה שגויים');
                                } else if (reee.response.includes('אינם תקינים')) {
                                    myEmitterLogs(5, 'נתוני כניסה אינם תקינים');
                                } else if (reee.response.includes('תחזוקה')) {
                                    myEmitterLogs(9, 'האתר אינו זמין כעת');
                                }
                            })
                        }
                    })
            })
    }

    async processNewWebsite() {
        return new Promise((resolve, reject) => {
            all.banks.core.services.removingCookie(false, function () {
                document.cookie = '';
                nw.App.clearCache();
                monitorActivityClass.setIntervalActivity()
                fetch('https://www.gamaf.co.il/',
                    {
                        method: 'GET', // *GET, POST, PUT, DELETE, etc.
                        mode: 'cors', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        redirect: 'follow', // manual, *follow, error
                        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    })
                    .then((response) => {
                        return response.text();
                    })
                    .then((res) => {
                        monitorActivityClass.setIntervalActivity()
                        const form_build_id = $(res).find("input[name='form_build_id']").val()
                        const params = new URLSearchParams({
                            'qwd_mstms': all.banks.accountDetails.bank.username.slice(0, 16),
                            'sysmh_': all.banks.accountDetails.bank.password.slice(0, 16),
                            'form_build_id': form_build_id,
                            'form_id': 'webform_submission_sticky_enter_page_variant_homepage-panels_variant-0_form',
                            'g-recaptcha-response': '',
                            'recaptcha': ''
                        })
                        fetch('https://www.gamaf.co.il/flag/login',
                            {
                                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                                mode: 'cors', // no-cors, *cors, same-origin
                                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                                credentials: 'same-origin', // include, *same-origin, omit
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                                },
                                redirect: 'follow', // manual, *follow, error
                                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                                body: params
                            })
                            .then((response) => {
                                return response.json();
                            })
                            .then(async (reee) => {
                                monitorActivityClass.setIntervalActivity()
                                // console.log(reee)
                                resolve(reee);
                            })
                    })
            })
        });
    }
}

all.banks.accounts.gama = new gama();
