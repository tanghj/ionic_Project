/*function GetData(http,target) {
  	var url = "http://news-at.zhihu.com/api/4/" + target;
  	console.log("请求地址" + url);
  	var tempData = undefined;
	http.get(url)
	    .then(function(mycallback){
	        tempData = mycallback.data;
	        //console.log(tempData);
			//return tempData;     
	});
	setTimeout(function() {
		console.log(tempData);
		return tempData; 
	}, 100);

}*/

function GetData(http,target,copyData){
  	var url = "http://news-at.zhihu.com/api/4/" + target;
  	console.log("请求地址" + url);
  	tempData = undefined;
	http.get(url)
	    .then(function(mycallback){
	        tempData = mycallback.data;
	             
	});
	setTimeout(function() {
		copyData(tempData);
	}, 500);
}