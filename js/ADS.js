(function() {
  if (!window['ADS']) {
    window['ADS'] = {};
  }
  //检查是否当前的浏览器兼容与整个库
  function isCompatible(other) {
    if (other === false || !Array.prototype.push || !Object.hasOwnProperty || !document.getElementsByTagName || !document.createElement) {
      alert('TR- if you see this message isCompatible is failing incorrectly.');
      return false;
    }
    return true;
  };
  window['ADS']['isCompatible'] = isCompatible;
  //document.getElementByIdx_x_x（）的更换。

  function $() {
    var elements = new Array();

    // Find all the elements supplied as arguments
    for (var i = 0; i < arguments.length; i++) {
      var element = arguments[i];

      // If the argument is a string assume it's an id
      if (typeof element == 'string') {
        element = document.getElementById(element);
      }

      // If only one argument was supplied, return the element immediately
      if (arguments.length == 1) {
        return element;
      }

      // Otherwise add it to the array
      elements.push(element);
    }

    // Return the array of multiple requested elements
    return elements;
  };
  window['ADS']['$'] = $;
  //元素上注册事件监听器
  function addEvent(node, type, listener) {
    // Check compatibility using the earlier method
    // to ensure graceful degradation
    if (!isCompatible()) {
      return false
    }
    if (!(node = $(node))) return false;

    if (node.addEventListener) {
      // W3C method
      node.addEventListener(type, listener, false);
      return true;
    } else if (node.attachEvent) {
      // MSIE method
      // node['e'+type+listener] = listener;
      //   node[type+listener] = function(){node['e'+type+listener]( window.event );}
      node.attachEvent('on' + type, listener);
      return true;
    }

    // Didn't have either so return false
    return false;
  };
  window['ADS']['addEvent'] = addEvent;

  //注销一个元素的事件监听器
  function removeEvent(node, type, listener) {
    if (!(node = $(node))) return false;
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
  };
  window['ADS']['removeEvent'] = removeEvent;

  function getElementsByClassName(className, tag, parent) {
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
  };
  window['ADS']['getElementsByClassName'] = getElementsByClassName;

  function toggleDisplay(node, value) {
    if (!(node = $(node))) return false;
    if (node.style.display != 'none') {
      node.style.display = 'none';
    } else {
      node.style.display = value || '';
    }
    return true;
  }
  window['ADS']['toggleDisplay'] = toggleDisplay;

  function insertAfter(node, referenceNode) {
    if (!(node = $(node))) return false;
    if (!(referenceNode = $(referenceNode))) return false;

    return referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
  };
  window['ADS']['insertAfter'] = insertAfter;

  function removeChildren(parent) {
    if (!(parent = $(parent))) return false;

    // While there is a child remove it
    while (parent.firstChild) {
      parent.firstChild.parentNode.removeChild(parent.firstChild);
    }
    // Return the parent again so you can stack the methods
    return parent;
  };
  window['ADS']['removeChildren'] = removeChildren;

  function prependChild(parent, newChild) {
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
  window['ADS']['prependChild'] = prependChild;


  //Retrieve the size of the browser window.
  function getBrowserWindowSize() {
    var de = document.documentElement;

    // windows.innerWidth for most browsers
    // document.documentElement.clientWidth for MSIE in strict mode
    // document.body.clientWidth for MSIE in quirks mode

    return {
      'width': (
        windows.innerWidth || (de && de.clientWidth) || document.body.clientWidth),
      'height': (
        windows.innerHeight || (de && de.clientHeight) || document.body.clientHeight)
    }
  };
  window['ADS']['getBrowserWindowSize'] = getBrowserWindowSize;

  //加载事件
  function addLoadEvent(loadEvent, waitForImgs) {
    if (!isCompatible()) {
      return false;
    }
    if (waitForImgs) {
      addEvent(window, 'load', loadEvent);
    }
    var init = function() {
      if (arguments.callee.done) return;

      arguments.callee.done = true;
      loadEvent.apply(document, arguments);
    };
    //firefox
    if (addEventListener) {
      addEventListener("DOMContentLoaded", init, false);
    }
    return true;
  };
  window['ADS']['addLoadEvent'] = addLoadEvent;

  //停止事件传播
  function stopPropagation(eventObj) {
    eventObj = eventObj || getEventObject(eventObj);
    if (eventObj.stopPropagation) {
      event.stopPropagation();
    } else {
      eventObj.cancelBubble = true;
    }
  };
  window['ADS']['stopPropagation'] = stopPropagation;

  function preventDefault(eventObject) {
    eventObject = eventObject || getEventObject(eventObject);
    if (eventObject.preventDefault) {
      eventObject.preventDefault();
    } else {
      eventObject.returnValue = false;
    }
  }
  window['ADS']['preventDefault'] = preventDefault;
  //检索在跨浏览器的方式事件对象。
  function getEventObject(W3CEvent) {
    return W3CEvent || window.event;
  };
  window['ADS']['getEventObject'] = getEventObject;
  //鼠标点击事件
  function getMouseButton(eventObject) {
    eventObject = eventObject || getEventObject(eventObject);
    // Initialize an object wit the appropriate properties
    var buttons = {
      'left': false,
      'middle': false,
      'right': false
    };
    // Check the toString value of the eventObject
    // W3C Dom object have a toString method and in this case it
    // should be MouseEvent
    if (eventObject.toString && eventObject.toString().indexOf('MouseEvent') != -1) {
      // W3C Method
      switch (eventObject.button) {
        case 0:
          buttons.left = true;
          break;
        case 1:
          buttons.middle = true;
          break;
        case 2:
          buttons.right = true;
          break;
        default:
          break;
      }
    } else if (eventObject.button) {
      // MSIE method
      switch (eventObject.button) {
        case 1:
          buttons.left = true;
          break;
        case 2:
          buttons.right = true;
          break;
        case 3:
          buttons.left = true;
          buttons.right = true;
          break;
        case 4:
          buttons.middle = true;
          break;
        case 5:
          buttons.left = true;
          buttons.middle = true;
          break;
        case 6:
          buttons.middle = true;
          buttons.right = true;
          break;
        case 7:
          buttons.left = true;
          buttons.middle = true;
          buttons.right = true;
          break;
        default:
          break;
      }
    } else {
      return false;
    }
    return buttons;
  }
  window['ADS']['getMouseButton'] = getMouseButton;
  //按键
  function getKeyPressed(eventObject) {
    eventObject = eventObject || getEventObject(eventObject);
    var code = eventObject.keyCode;
    var value = String.fromCharCode(code);
    return {
      'code': code,
      'value': value
    };
  }
  window['ADS']['getKeyPressed'] = getKeyPressed;
  //在document中获得鼠标的位置
  function getPointerPositionInDocument(eventObject) {
    eventObject = eventObject || getEventObject(eventObject);
    var x = eventObject.pageX || (eventObject.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
    var y = eventObject.pageY || (eventObject.clientY + (document.documentElement.scrollTop || document.body.scrollTop));

    return {
      'x': x,
      'y': y
    };
  };
  window['ADS']['getPointerPositionInDocument'] = getPointerPositionInDocument;
  //检索所有的classes作为一个数组
  function getClassNames(element) {
    if (!(element = $(element))) {
      return false;
    }
    return element.className.replace(/\s+/, ' ').split(' ');
  };
  window['ADS']['getClassNames'] = getClassNames;

  //Add a class to an element
  function addClassName(element, className) {
    if (!(element = $(element))) {
      return false;
    }

    element.className += (element.className ? ' ' : '') + className;
    return true;
  };
  window['ADS']['addClassName'] = addClassName;
  //Check if a class exists on an element
  function hasClassName(element, className) {
    if (!(element = $(element))) {
      return false;
    }
    classes = getClassNames(element);

    for (var i = 0; i < classes.length; i++) {
      if (classes[i] === className) {
        return true;
      }
    }
    return false;
  };
  window['ADS']['hasClassName'] = hasClassName;
  //remove a class from an element
  function removeClassName(element, className) {
    if (!(element = $(element))) {
      return false;
    }
    classes = getClassNames(element);
    length = classes.length;
    for (var i = length - 1; i >= 0; i--) {
      if (classes[i] === className) {
        delete(classes[i]);
      }
    }
    element.className = classes.join(' ');
    (length == classes.length ? false : true);
  };
  window['ADS']['removeClassName'] = removeClassName;
  //用于修改样式
  //Add a new stylesheet
  function addStyleSheet(url, media) {
    media = media || 'screen';
    var link = document.create_r_rElement('LINK');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', url);
    link.setAttribute('media', media);
    document.getElementsByTagName_r('head')[0].a(link);
  };
  window['ADS']['addStyleSheet'] = addStyleSheet;
  //Retrieve an array of all the stylesheets by URL
  function getStyleSheets(url, media) {
    var sheets = [];
    for (var i = 0; i < document.styleSheets.length; i++) {
      if (url && document.styleSheets[i].href.indexOf(url) == -1) {
        continue;
      }
      if (media) {
        media = media.replace(/,\s*/, ',');
        var styleMedia;
        if (document.styleSheets[i].media.mediaText) {
          //dom
          styleMedia = document.styleSheets[i].media.mediaText.replace(/,\s*/, ',');
          //safari
          styleMedia.replace(/,\s*$/, '');
        } else {
          //IE
          styleMedia = document.styleSheets[i].media.replace(/,\s*/, ',');
        }
        if (styleMedia != media) {
          continue;
        }
      }
      sheets.push(document.styleSheets[i]);
    }
    return sheets;
  };
  window['ADS']['getStyleSheets'] = getStyleSheets;
  // Remove a stylesheet
  function removeStyleSheet(url, media) {
    styles = getStyleSheets(url, media);
    for (var i = 0; i < styles.length; i++) {
      var node = styles[i].ownerNode || styles[i].owingElement;
      //禁用样式表
      styles[i].disabled = true;
      //remove node
      node.parentNode.removeChild(node);
    }
  };
  window['ADS']['removeStyleSheet'] = removeStyleSheet;
  //连字符连接的单词转换字字符串大小写wordWord字符串。word-word=>wordWord;
  function camelize(s) {
    return s.replace(/-(\w)/g, function(strMatch, p) {
      return p.toUpperCase;
    });
  };
  window['ADS']['camelize'] = camelize;

  function uncamelize(s, sep) {
    sep = sep || '-';
    return s.replace(/([a-z])([A-Z])/g, function(strMatch, p1, p2) {
      return p1 + sep + p2.toLowerCase();
    });
  }
  window['ADS']['uncamelize'] = uncamelize;

  //Changes the style of a single element by id
  function setStyleById(element, styles) {
    if (!(element = $(element))) {
      return false
    };
    for (property in styles) {
      if (!styles.hasOwnProperty(property)) continue;
      if (element.style.setProperty) {
        element.style.setProperty(uncamelize(property, '-'), styles[property], null);
      } else {
        element.style[camelize(property)] = styles[property];
      }
    }
    return true;
  };
  window['ADS']['setStyleById'] = setStyleById;
  //Changes the style of multiple elements by class name
  function setStylesByClassName(parent, tag, className, styles) {
    if (!(parent = $(parent))) {
      return false;
    }
    var elements = getElementsByClassName(className, tag, parent);
    for (var e = 0; e < elements.length; e++) {
      setStyleById(elements[e], styles);
    }
    return true;
  };
  window['ADS']['setStylesByClassName'] = setStylesByClassName;
  //Changes the style of multiple elements by tag name
  function setStylesByTagName(tagname, styles, parent) {
    parent = $(parent) || document;
    var elements = parent.getElementsByTagName_r(tagname);
    for (var i = 0; i < elements.length; i++) {
      setStyleById(elements[i], styles);
    }
    return true;
  };
  window['ADS']['setStylesByTagName'] = setStylesByTagName;

  function getStyle(element, property) {
    if (!(element = $(element)) || !property) return false;
    // Check for the value in the element's style property
    var value = element.style[camelize(property)];
    if (!value) {
      // Retrieve the computed style value
      if (document.defaultView && document.defaultView.getComputedStyle) {
        // The DOM method
        var css = document.defaultView.getComputedStyle(element, null);
        value = css ? css.getPropertyValue(property) : null;
      } else if (element.currentStyle) {
        // The MSIE method
        value = element.currentStyle[camelize(property)];
      }
    }
    // Return an empty string rather than auto so that you don't
    // have to check for auto values
    return value == 'auto' ? '' : value;
  }
  window['ADS']['getStyle'] = getStyle;
  window['ADS']['getStyleById'] = getStyle;


})();