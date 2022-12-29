var hostName = 'com.arx.poalim_host';

chrome.runtime.onConnectExternal.addListener(function(port) {
	port.onMessage.addListener(function(request) {
		chrome.runtime.sendNativeMessage(hostName, request, function(response) {
			if (!response)
				response = { rc: 701, errMsg: "Cannot connect to host" };

			port.postMessage(response);
		});
	})
});