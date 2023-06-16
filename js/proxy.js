function shExpMatch(url, pattern) {
    pattern = pattern.replace(/\./g, '\\.');
    pattern = pattern.replace(/\*/g, '.*');
    pattern = pattern.replace(/\?/g, '.');
    var newRe = new RegExp('^' + pattern + '$');
    return newRe.test(url);
}

function FindProxyForURL(url, host) {
    if (!shExpMatch(host, "*bizibox.biz") && !shExpMatch(host, "*bb-ng-images-cheques")) {
        return "PROXY zproxy.lum-superproxy.io:22225; DIRECT";
    }
    return 'DIRECT';
}


function setProxy() {
    return new Promise((resolve, reject) => {
        if (window.navigator.platform.indexOf('Win') > -1) {
            resolve(true);
        } else {
            var myCredentials = {
                password: 'h0mi0yvib3to'
            }
            if (window.all && window.all.banks && window.all.banks.accountDetails && window.all.banks.accountDetails.bank && window.all.banks.accountDetails.bank.token) {
                myCredentials.username = 'brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob' + all.banks.accountDetails.bank.token.replace(/-/g, '');
            } else {
                myCredentials.username = 'brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob';
            }

            const pendingRequests = [];

            function completed(requestDetails) {
                // console.log(`completed: ${requestDetails.requestId}`);
                var index = pendingRequests.indexOf(requestDetails.requestId);
                if (index > -1) {
                    pendingRequests.splice(index, 1);
                }
            }

            function provideCredentialsSync(requestDetails) {
                if (pendingRequests.indexOf(requestDetails.requestId) != -1) {
                    // console.log(`bad credentials for: ${requestDetails.requestId}`);
                    return {cancel: false};
                }
                pendingRequests.push(requestDetails.requestId);
                // console.log(`providing credentials for: ${requestDetails.requestId}`);

                return {authCredentials: myCredentials};
            }

            chrome.webRequest.onAuthRequired.addListener(
                provideCredentialsSync,
                {urls: ["<all_urls>"]},
                ["blocking"]
            );

            chrome.webRequest.onCompleted.addListener(
                completed,
                {urls: ["<all_urls>"]}
            );

            chrome.webRequest.onErrorOccurred.addListener(
                completed,
                {urls: ["<all_urls>"]}
            );
            let testConnectionTime = 0;

            function setLocalProxy() {
                chrome.proxy.settings.set(
                    {
                        value: {
                            rules: {
                                singleProxy: {
                                    host: 'zproxy.lum-superproxy.io',
                                    port: 22225
                                }
                            },
                            mode: "pac_script",
                            pacScript: {
                                data: FindProxyForURL.toString()
                            }
                        },
                        scope: 'regular'
                    },
                    function () {
                        setTimeout(() => {
                            $.get("https://lumtest.com/myip").then(rr => {
                                writeLog('--- success proxy connection----' + rr.replace(/\s/g, ""));
                                resolve(true);
                            }).fail(() => {
                                if (testConnectionTime < 5) {
                                    testConnectionTime++;
                                    setLocalProxy()
                                } else {
                                    writeLog('--- 5 times nosuccess proxy connection----');
                                    clearProxy().then(r => {
                                        resolve(false);
                                    });
                                }
                            })
                        }, 2000)
                    });
            }

            writeLog('--- Try to get real IP for add to whitelist----');
            $.get("https://lumtest.com/myip")
                .done(function (ipAddrress) {
                    writeLog('--- Real IP: ' + ipAddrress + '----');

                    require('request')({
                        uri: 'https://api.brightdata.com/zone/whitelist',
                        method: "POST",
                        body: {'zone': 'residential', 'ip': ipAddrress.replace(/\s/g, "")},
                        json: true,
                        headers: {'Authorization': 'Bearer 959bcce2-a1e9-466c-b4b8-eb1d06cdcf4f'}
                    }, (error, response, data) => {
                        setLocalProxy();
                    });
                }).fail(() => {
                writeLog('--- Unable to access the server icanhazip.com ----');
                setLocalProxy();
            })


            // chrome.webRequest.onAuthRequired.addListener(
            // 	function handler(details) {
            // 		if (--retry < 0){
            // 			return {cancel: true};
            // 		}else{
            // 			return {authCredentials: {username: username, password: password}};
            // 		}
            // 	},
            // 	{urls: ["<all_urls>"]},
            // 	['blocking']
            // );


            // chrome.webRequest.onAuthRequired.addListener(auth, {
            // 	urls: ["<all_urls>"]
            // }, ["blocking"]);
        }
    });
}

function clearProxy() {
    var authCredentials;
    if (window.all && window.all.banks && window.all.banks.accountDetails && window.all.banks.accountDetails.bank && window.all.banks.accountDetails.bank.token) {
        authCredentials = {
            username: 'brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob' + all.banks.accountDetails.bank.token.replace(/-/g, ''),
            password: 'h0mi0yvib3to'
        }
    } else {
        authCredentials = {
            username: 'brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob',
            password: 'h0mi0yvib3to'
        }
    }

    return new Promise((resolve, reject) => {
        if (window.navigator.platform.indexOf('Win') > -1) {
            resolve(true);
        } else {
            chrome.proxy.settings.clear({
                scope: 'regular'
            }, function () {
                resolve(true);
            });

            var auth = function () {
                return {
                    authCredentials
                };
            };
            chrome.webRequest.onAuthRequired.removeListener(auth)
        }
    });
}

clearProxy();
