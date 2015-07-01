(function(){

	if (!window['myADS']){window['myADS']={};}

	/**
	 * Retrieves the event object in a cross-browser way.
	 */
	function getEventObject(W3CEvent) {
	    return W3CEvent || window.event;
	}
	window['ADS']['getEventObject'] = getEventObject;

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

	/********************************
	* Chapter 3
	*********************************/

	/**
	 * Constants for note type comparison
	 */
	window['ADS']['node'] = {
	    ELEMENT_NODE                : 1,
	    ATTRIBUTE_NODE              : 2,
	    TEXT_NODE                   : 3,
	    CDATA_SECTION_NODE          : 4,
	    ENTITY_REFERENCE_NODE       : 5,
	    ENTITY_NODE                 : 6,
	    PROCESSING_INSTRUCTION_NODE : 7,
	    COMMENT_NODE                : 8,
	    DOCUMENT_NODE               : 9,
	    DOCUMENT_TYPE_NODE          : 10,
	    DOCUMENT_FRAGMENT_NODE      : 11,
	    NOTATION_NODE               : 12
	};

	/**
	 * Walk the nodes in the DOM tree without maintaining parent/child relationships.
	 */
	function walkElementsLinear(func,node) {
	    var root = node || window.document;
	    var nodes = root.getElementsByTagName("*");
	    for(var i = 0 ; i < nodes.length ; i++) {
	        func.call(nodes[i]);
	    }
	};
	window['myADS']['walkElementsLinear'] = walkElementsLinear;

	/**
	 * Walk the nodes in the DOM tree maintaining parent/child relationships.
	 */
	function walkTheDOMRecursive(func,node,depth,returnedFromParent) {
	    var root = node || window.document;
	    returnedFromParent = func.call(root,depth++,returnedFromParent);
	    node = root.firstChild;
	    while(node) {
	        walkTheDOMRecursive(func,node,depth,returnedFromParent);
	        node = node.nextSibling;
	    }
	};
	window['myADS']['walkTheDOMRecursive'] = walkTheDOMRecursive;

	/**
	 * Walk the nodes in the DOM tree maintaining parent/child relationships and include the node attributes as well.
	 */
	function walkTheDOMWithAttributes(node,func,depth,returnedFromParent) {
	    var root = node || window.document;
	    returnedFromParent = func(root,depth++,returnedFromParent);
	    if (root.attributes) {
	        for(var i=0; i < root.attributes.length; i++) {
	            walkTheDOMWithAttributes(root.attributes[i],func,depth-1,returnedFromParent);
	        }
	    }
	    if(root.nodeType != ADS.node.ATTRIBUTE_NODE) {
	        node = root.firstChild;
	        while(node) {
	            walkTheDOMWithAttributes(node,func,depth,returnedFromParent);
	            node = node.nextSibling;
	        }
	    }
	};
	window['myADS']['walkTheDOMWithAttributes'] = walkTheDOMWithAttributes;

	/**
	 * Walk the DOM recursively using a callback function
	 */
	function walkTheDOM(node, func) {
	    func(node);
	    node = node.firstChild;
	    while (node) {
	         walkTheDOM(node, func);
	         node = node.nextSibling;
	    }
	}
	window['myADS']['walkTheDOM'] = walkTheDOM;

	/**
	 * Convert hyphenated word-word strings to camel case wordWord strings.
	 */
	function camelize(s) {
	    return s.replace(/-(\w)/g, function (strMatch, p1){
	        return p1.toUpperCase();
	    });
	}
	window['myADS']['camelize'] = camelize;
	
	/**
	 * [stopPropagation description] 阻止冒泡
	 * @param  {[type]} eventObject [description]
	 * @return {[type]}             [description]
	 */
	function stopPropagation(eventObject) {
		eventObject = eventObject || getEventObject(eventObject);
		if (eventObject.preventDefault) {
			eventObject.preventDefault();
		} else {
			eventObject.returnValue = false;
		}
	}
	window['myADS']['stopPropagation'] = stopPropagation;

	/**
	 * Retrieves the element targeted by the event.
	 */
	function getTarget(eventObject) {
	    eventObject = eventObject || getEventObject(eventObject);
	    // Check if the target is W3C or MSIE
	    var target = eventObject.target || eventObject.scrElement;
	    // Reassign the target to the parent
	    // if it is a text node like in Safari
	    if(target.nodeType == ADS.node.TEXT_NODE) {
	        target = node.parentNode;
	    }
	    return target;

	}
	window['ADS']['getTarget'] = getTarget;

	/**
	 * Get the position of the pointer in the document. 
	 */
	function getPointerPositionInDocument(eventObject) {
	    eventObject = eventObject || getEventObject(eventObject);
	    var x = eventObject.pageX || (eventObject.clientX +
	        (document.documentElement.scrollLeft || document.body.scrollLeft));
	    var y= eventObject.pageY || (eventObject.clientY +
	        (document.documentElement.scrollTop || document.body.scrollTop));
	    //x and y now contain the coordinates of the mouse relative to the document origin
	    return {'x':x,'y':y};
	}
	window['ADS']['getPointerPositionInDocument'] = getPointerPositionInDocument;

	/**
	 * Get the key pressed from the event object 
	 */
	function getKeyPressed(eventObject) {
	    eventObject = eventObject || getEventObject(eventObject);
	    var code = eventObject.keyCode;
	    var value = String.fromCharCode(code);
	    return {'code':code,'value':value};
	}
	window['ADS']['getKeyPressed'] = getKeyPressed;

})();