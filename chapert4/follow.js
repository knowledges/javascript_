ADS.addEvent(window,'load',function(){
	var object = document.getElementById('follow');
	object.style.position = 'absolute';

	function eventListener(W3CEvent){
		var pointer = ADS.getPointerPositionInDocument(W3CEvent);

		object.style.left = pointer.x + 'px';
		console.log("X："+object.style.left);
		object.style.top = pointer.y + 'px';
		console.log("Y："+object.style.top);
	}

	ADS.addEvent(document,'mousemove',eventListener);
});