ADS.addEvent(window, 'load', function() {
	// ADS.log.header('testNodeName');
 //    ADS.log.write('nodeName is: ' + document.getElementById('firefox').nodeName);

	// ADS.log.header('testing nodeValue');
 //    ADS.log.write('nodeValue is: ' + document.getElementById('firefox').nodeValue);

	// ADS.log.header('testing nodeType');
 //    ADS.log.write('nodeType is: ' + document.getElementById('firefox').nodeType);

 //    console.log("nodeType:"+document.getElementById('firefox').nodeType + "\nADS.node.COMMENT_NODE:"+ADS.node.COMMENT_NODE);

     

});
// ADS.addEvent(window, 'load', function() {
//     ADS.log.header('List child nodes of the document body');
//     for( var i = 0 ; i < document.body.childNodes.length ; i++ ) {
//         ADS.log.write(document.body.childNodes.item(i).nodeName);
//     }
// });

// ADS.addEvent(window, 'load', function() {
//     ADS.log.header('Testing Attributes');
//     var firefoxAnchor = document.getElementById('firefox');
//     for(var i=0 ; i < firefoxAnchor.attributes.length ; i++) {
//         ADS.log.write(
//             firefoxAnchor.attributes.item(i).nodeName
//                 + ' = '
//                 + firefoxAnchor.attributes.item(i).nodeValue
//         );
//     }
// });
//

// ADS.addEvent(window, 'load', function() {
//     ADS.log.header('Attributes And ChildNodes');

//     var h2 = document.getElementsByTagName('H2')[0];

//     ADS.log.write(h2.nodeName);
//     ADS.log.write(h2.nodeName + ' hasChildNodes: ' + h2.hasChildNodes());
//     ADS.log.write(h2.nodeName + ' childNodes: ' + h2.childNodes);
//     ADS.log.write(h2.nodeName + ' number of childNodes: ' + h2.childNodes.length);
    
//     ADS.log.write(h2.nodeName + ' attributes: ' + h2.attributes);
//     ADS.log.write(h2.nodeName + ' number of attributes: ' + h2.attributes.length);
    
//     // This line will error in MSIE
//     ADS.log.write(h2.nodeName + ' hasAttributes: ' + h2.hasAttributes());
// });

// appendChild()
// ADS.addEvent(window,'load',function () {
// 	ADS.log.header('Append Child');
// 	var newChild = document.createElement('LI');
// 	newChild.appendChild(document.createTextNode('A new list item_1!'));
// 	var list = document.getElementById('browserList');
// 	list.appendChild(newChild);
// });

// // insertBefore
// ADS.addEvent(window,'load',function(){
// 	ADS.log.header('insert Before');
// 	var newChild = document.createElement('LI');
// 	newChild.appendChild(document.createTextNode('A new list item_2!'));
// 	var list = document.getElementById('browserList');
// 	list.insertBefore(newChild,list.lastChild);
// });

// ADS.addEvent(window, 'load', function() {
//     ADS.log.header('Replace a node');
//     var newChild = document.createElement('LI')
//     newChild.appendChild(document.createTextNode('A new list item!'));
//     var firefoxLi = document.getElementById('opera');
//     firefoxLi.parentNode.replaceChild(newChild,firefoxLi);
// });

// ADS.addEvent(window, 'load', function() {
//     ADS.log.header('Remove a node');
//     var firefoxLi = document.getElementById('msie');
//     firefoxLi.parentNode.removeChild(firefoxLi);
// });

// ADS.addEvent(window, 'load', function() {
//     //ADS.log.header('Clone and Move a Node');
//     var firefoxLi = document.getElementById('firefoxListItem');
//     var firefoxLiClone = firefoxLi.cloneNode(true);
//     var unorderedList = firefoxLi.parentNode;

//     // Apped to the list
//     unorderedList.appendChild(firefoxLi);
//     // Append to the list
//     unorderedList.appendChild(firefoxLiClone);
// });


// ADS.addEvent(window,'load',function() {
//     ADS.log.header('Set Safari title attribute');
//     var safariAnchor = document.getElementById('safari');
//     safariAnchor.setAttribute('title','Safari is for Mac OS X');
// });

// 核心Element 对象
// 1.操作Element 对象的属性
// getAttribute(name);
ADS.addEvent(window,'load',function(){
	ADS.log.header('Get Safari href attribute');
	var safariAnchor = document.getElementById('safari');
	var href = safariAnchor.getAttribute('href');
	ADS.log.write(href);
});

// setAttribute(name,value)
ADS.addEvent(window,'load',function(){
	ADS.log.header('Get Safari href attribute');
	var safariAnchor = document.getElementById('safari');
	safariAnchor.setAttribute('title','safari is for Mac OS X');
});

// removeAttribute(name)
ADS.addEvent(window,'load',function(){
	ADS.log.header('Remove Firefox title attribute');
	var firefox = document.getElementById('firefoxListItem');
	firefox.removeAttribute('title');
});
// 在Element 中查找 Element 对象
ADS.addEvent(window,'load',function() {
    ADS.log.header('Get all browserList elements by tag name');
    var list = document.getElementById('browserList');
    var ancestors = list.getElementsByTagName('*');
    for(i = 0 ; i < ancestors.length ; i++ ) {
        ADS.log.write(ancestors.item(i).nodeName);
    }
});

// 1.document.documentElement属性：
// 访问文档根元素的快捷方式。对于在浏览器中呈现的HTML文档而言，所谓的根元素就是<html> 标签。

// 2.使用Document对象的方法创建节点。
// 例如： document.createAttribute(name);

// 3.使用Document对象的方法查找Element对象
//
