ADS.addEvent(window,'load',function () {
	function click_init(W3CEvent){
		switch(this.nodeType){
			case ADS.node.DOCUMENT_NODE:
				ADS.log.write(W3CEvent.type+'on document');
			break;
			case ADS.node.ELEMENT_NODE:
				ADS.log.write(W3CEvent.type+'on box');
			break;
		}
	}

	ADS.addEvent(document,'mousedown',click_init);
	ADS.addEvent(box,'mouseup',click_init);
	ADS.addEvent(box,'click',click_init);
	ADS.addEvent(box,'dblclick',click_init)

	var box = document.getElementById('box');
	ADS.addEvent(box,'mousedown',click_init);
	ADS.addEvent(box,'mouseup',click_init);
	ADS.addEvent(box,'click',click_init);
	ADS.addEvent(box,'dblclick',click_init)
});