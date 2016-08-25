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

//方案一
  	//出现问题：SyntaxError: missing ; before statement
  	/*var mydata = {};
	$http.jsonp("http://news-at.zhihu.com/api/4/news/latest")
	.success(function(data){
		mydata = data;
		console.log(mydata);
	});*/
	
	//方案二
	//出现问题：火狐跨域
	/*var url = "http://news-at.zhihu.com/api/4/news/latest";
    $http.get(url)
        .then(function(mycallback){
            $scope.md = mycallback;
            var mydata = mycallback.data; 
            console.log(mydata);            
    });*/

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