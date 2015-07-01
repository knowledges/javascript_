ADS.addEvent(window,'load',function () {
	function mouseClick (W3CEvent) {
		var keyDown = ADS.getMouseButton(W3CEvent);
		keyDown.left ? console.log('点击了左键') : console.log('没有点击左键');
		keyDown.right ? console.log('点击了右键') : console.log('没有点击右键');
		keyDown.middle ? console.log('点击了中键') : console.log('没有点击中键');
	}

	ADS.addEvent(document,'click',mouseClick);
});