var xsltProcessor = new XSLTProcessor();
var xslStyleSheet;
var xmlDoc;

// 异步获取一个XSL 文件
var requestXsl = new XMLHttpRequest();
requestXsl.onreadystatechange = function () {
	xslStyleSheet = request.responseXML;
}
requestXsl.open('GET','example1.xsl',true);
requestXsl.send(null);

// 异步取得一个XML文件
var requestXml = new XMLHttpRequest();
requestXml.onreadystatechange = function(){
	xmlDoc = request.responseXML;
}
requestXsl.open('GET','example1.xml',true);
requestXsl.send(null);

var  processor = function () {
	if (xslStyleSheet && xmlDoc) {
		clearInterval(this);
		// 通过XSLT转换XML
		xsltProcessor.importStylesheet(xslStyleSheet);
		var fragment = xsltProcessor.transformToFragment(xmlDoc,document);
		ADS.$('example').appendChild(fragment);
	};
}
setInterval(processor,200);