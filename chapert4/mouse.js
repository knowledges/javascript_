ADS.addEvent(window,'load',function () {
	function eventListener (W3CEvent) {
		// 取得目标
		var target = ADS.getTarget(W3CEvent);

		window.open(target.href);
	}

	var anchor = document.getElementById('example');
	ADS.addEvent(anchor,'click',eventListener);
})