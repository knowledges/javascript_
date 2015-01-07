(function(){

	if (!window['myADS']){window['myADS']={};}
	
	// 检查是否当前的浏览器兼容与整个库
	function isCompatible (other) {
		if (other === false 
			|| !Array.prototype.push 
			|| !Object.hasOwnProperty 
			|| !document.getElementsByTagName 
			|| !document.createElement) {
		  alert('TR- if you see this message isCompatible is failing incorrectly.');
		  return false;
		}
		return true;
	}
	window['myADS']['isCompatible']=isCompatible;

	function $(){
		var elements = new Array();
		// Find all the elements supplied as arguments
		for (var i = 0; i < arguments.length; i++) {
			var element = arguments[i];

			// If the argument is a string assume it's an id
			if (typeof element == 'string') {
				element = document.getElementById(element);
			};

			// 如果只提供了一个参数（If only one argument was supplied,）
			// 则立即返回这个元素（return the element immediately）
			if (arguments.length == 1) {
				return element;
			};

			// 否则，将它添加到数组中 （ Otherwise add it to the array）
			elements.push(element);
		};
		return elements;
	}
	window['myADS']['$']=$;

	function addEvent (node,type,listener) {
		// Check compatibility using the earlier method
		// to ensure graceful degradation
		if (!isCompatible()) {
		  return false
		}
		if (!(node = $(node))) {
			return false;
		}

		if (node.addEventListener) {
		  // W3C method
		  node.addEventListener(type, listener, false);
		  return true;
		} else if (node.attachEvent) {
		  // MSIE method
		  node['e'+type+listener] = listener;
		  node[type+listener] = function(){node['e'+type+listener]( window.event );}
		  node.attachEvent('on' + type, listener);
		  return true;
		}

		// Didn't have either so return false
		return false;
	}
	window['myADS']['addEvent']=addEvent;

	function removeEvent (node,type,listener) {
		if (!(node = $(node))) {return false;}
		if (node.removeEventListener) {
		  node.removeEventListener(type, listener, false);
		  return true;
		} else if (node.detachEvent) {
		  // MSIE method
		  node.detachEvent('on' + type, node[type + listener]);
		  node[type + listener] = null;
		  return true;
		}
		// Didn't have either so return false
		return false;
	}
	window['myADS']['removeEvent']=removeEvent;

	function getElementsByClassName (className,tag, parent) {
		parent = parent || document;
		if (!(parent = $(parent))) return false;

		// Locate all the matching tags
		var allTags = (tag == "*" && parent.all) ? parent.all : parent.getElementsByTagName(tag);
		var matchingElements = new Array();

		// Create a regular expression to determine if the className is correct
		className = className.replace(/\-/g, "\\-");
		var regex = new RegExp("(^|\\s)" + className + "(\\s|$)");

		var element;
		// Check each element
		for (var i = 0; i < allTags.length; i++) {
		  element = allTags[i];
		  if (regex.test(element.className)) {
		    matchingElements.push(element);
		  }
		}

		// Return any matching elements
		return matchingElements;
	}
	window['myADS']['getElementsByClassName']=getElementsByClassName;

	function toggleDisplay (node,value) {
		if (!(node = $(node))) return false;
		if (node.style.display != 'none') {
			node.style.display = 'none';
		} else {
			node.style.display = value || '';
		}
		return true;
	}
	window['myADS']['toggleDisplay']=toggleDisplay;

	function insertAfter (node,referenceNode) {
		if (!(node = $(node))) return false;
		if (!(referenceNode = $(referenceNode))) return false;

		return referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
	}
	window['myADS']['insertAfter']=insertAfter;

	function removeChildren (parent) {
		if (!(parent = $(parent))) return false;

		// While there is a child remove it
		while (parent.firstChild) {
		  parent.firstChild.parentNode.removeChild(parent.firstChild);
		}
		// Return the parent again so you can stack the methods
		return parent;
	}	
	window['myADS']['removeChildren']=removeChildren;

	function prependChild (parent,newChild) {
		if (!(parent = $(parent))) return false;
		if (!(newChild = $(newChild))) return false;
		if (parent.firstChild) {
		  // There is already a child so insert before the first one
		  parent.insertBefore(newChild, parent.firstChild);
		} else {
		  // No children so just append
		  parent.a(newChild);
		}
		// Return the parent again so you can stack the methods
		return parent;
	}
	window['myADS']['prependChild']=prependChild;

})();