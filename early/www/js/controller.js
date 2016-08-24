angular.module('starter.controllers', ['ionic'])

.controller("myCtrl",function($scope,$state,$http){
	$state.go("home");
	/*try {
	    netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
	} catch (e) {
	    alert("Permission UniversalBrowserRead denied.");
	} */
})


// home
.controller("homeCtrl",function($scope,$state,$http) {

	//这是合并分支
	$scope.setData = function(){
		$scope.homeData = {};
	    GetData($http,"news/latest",function(Data){
	    	$scope.homeData = Data;
	    });
	}
	$scope.pageDealWith = function(){
		for (var i = 0; i < $scope.homeData.stories.length; i++) {
			$scope.homeData.stories[i].index = i;
		}
		console.log($scope.homeData.stories);
	}

	$scope.setData();
	setTimeout(function() {$scope.pageDealWith();}, 500);


  	//方案一
  	//出现问题：SyntaxError: missing ; before statement
  	/*var mydata = {};
	$http.jsonp("http://news-at.zhihu.com/api/4/news/latest")
	.success(function(data){
		mydata = data;
		console.log(mydata);
	});*/
	
	//方案二
	//出现问题：跨域
	/*var url = "http://news-at.zhihu.com/api/4/news/latest";
    $http.get(url)
        .then(function(mycallback){
            $scope.md = mycallback;
            var mydata = mycallback.data; 
            console.log(mydata);            
    });*/

    
    




})

// pageOne
.controller("pageOneCtrl",function($scope, $state, $stateParams) {
	
})