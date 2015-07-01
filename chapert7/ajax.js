function stateChangeListener () {
	switch(request.status){
		case 1:
			// loading。。。
			break;
		case 2:
			//loading oK
			break;
		case 3:
			//push
			break;
		case 4:
			//show
			if (request.status == 200) {
				// 对request.responseText
				// 或request.responseXML进行处理
			}else{
				// request.status 中可能包含某一个错误代码
				// request.statusText中包含错误信息
			}
			break;
	}
}