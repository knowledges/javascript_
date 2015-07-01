ADS.addEvent(window,'load',function () {
	function loginit(W3CEvent){
		switch(this.nodeType){
			case ADS.node.DOCUMENT_NODE:
				ADS.log.write(W3CEvent.type+'on document');
			break;
			case ADS.node.ELEMENT_NODE:
				ADS.log.write(W3CEvent.type+'on box');
			break;
		}
	}

	// 添加鼠标事件
	ADS.addEvent(document,'mousemove',loginit);
	ADS.addEvent(document,'mouseover',loginit);
	ADS.addEvent(document,'mouseout',loginit);
	
	var box = document.getElementById('box');
	ADS.addEvent(box,'mousemove',loginit);
	ADS.addEvent(box,'mouseover',loginit);
	ADS.addEvent(box,'mouseout',loginit);

})