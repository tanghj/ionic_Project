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
.controller("homeCtrl",function($scope,$state,$http,$ionicScrollDelegate,$ionicLoading) {

	//这是合并分支


	$scope.setData = function(){
		$scope.homeData = {
			"subHeaderData": "",
			"contentData" : "",
			"showTitle": ""
		};
		$scope.slideIndex = 1;
	}

	$scope.GetHeaderData = function(){

		
		
		GetData($http,$ionicLoading,"themes",function(Data){
			//$ionicLoading.show();
	    	$scope.homeData.subHeaderData = Data;
	    	$scope.homeData.subHeaderData.others.unshift({
    			"name":"今日日报",
    			"id":"Today"
    		})
    		//$ionicLoading.hide();
    		$scope.$apply();    		
	    });

	}

	$scope.GetContentData = function(){
		GetData($http,$ionicLoading,"news/latest",function(Data){
			//$ionicLoading.show();
	    	$scope.homeData.contentData = Data;
	    	for (var i = 0; i < $scope.homeData.contentData.stories.length; i++) {
				$scope.homeData.contentData.stories[i].index = i;
			}
			$scope.homeData.showTitle = $scope.homeData.contentData.date;
			//$ionicLoading.hide();
			$scope.$apply();
	    });
	}
  	






	$scope.selectedType = function(list){
		if (list.id == "Today") {
			$scope.GetContentData();
		}else{
			GetData($http,$ionicLoading,"theme/" + list.id,function(Data){
				//$ionicLoading.show();
				$scope.homeData.contentData = Data;
				for (var i = 0; i < $scope.homeData.contentData.stories.length; i++) {
					$scope.homeData.contentData.stories[i].index = i;
				}
				$scope.homeData.showTitle = $scope.homeData.contentData.description;
				$ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
				//$ionicLoading.hide();
				$scope.$apply();
	    	});


		}
	}

  	$scope.onDragRight = function(){
  		console.log("右边");

  		

  		if ($scope.homeData.contentData.date == "" || !$scope.homeData.contentData.date) {
  			myNotice("主题日报暂无过往消息",$ionicLoading);
  			return;
  		}else{

  		}


  		var NowDate = new Date();
		var DateStr = $scope.homeData.contentData.date;
		var DateYears = DateStr.substr(0, 4);
		var DateMonth = DateStr.substr(4,2);
		var DateDay = DateStr.substr(6, 2);
		DateYears = DateYears + "-";
		DateMonth = DateMonth + "-";
		DateStr = DateYears + DateMonth + DateDay;
		var ContrastDate = new Date(DateStr);

  		if (NowDate.getFullYear() == ContrastDate.getFullYear() &&
  			NowDate.getMonth() == ContrastDate.getMonth() &&
  			NowDate.getDate() == ContrastDate.getDate()) {
  			console.log("已经是最新数据");
  			return;
  		}else{
  			//数字转日期
	  		var DateStr = $scope.homeData.contentData.date;
	  		var DateYears = DateStr.substr(0, 4);
	  		var DateMonth = DateStr.substr(4,2);
	  		var DateDay = DateStr.substr(6, 2);
	  		DateYears = DateYears + "-";
	  		DateMonth = DateMonth + "-";
	  		DateStr = DateYears + DateMonth + DateDay;
	  		var TempDate = new Date(DateStr);
	  		var nextDate = new Date(TempDate.getTime() + (24*60*60*1000)*2);  //后一天
	  		//日期转数字
	  		var selectDate = nextDate.toISOString();
	        selectDate     = selectDate.substring(0,10);
	        selectDate     = selectDate.replace(/(日)/g,"");
	        selectDate     = selectDate.replace(/(月)/g,"");
	        selectDate     = selectDate.replace(/(年)/g,"");
	        selectDate     = selectDate.replace(/(-)/g,"");
	        selectDate     = selectDate.replace(/\//g,"");

	  		GetData($http,$ionicLoading,"news/before/" + selectDate,function(Data){
	  			console.log(Data);
				$scope.homeData.contentData = Data;
		    	for (var i = 0; i < $scope.homeData.contentData.stories.length; i++) {
					$scope.homeData.contentData.stories[i].index = i;
				}
				$scope.homeData.showTitle = $scope.homeData.contentData.date;
				$scope.$apply();
				$ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
		    });
  		}
  	}

  	$scope.onDragLeft = function(){
  		console.log("左边");


  		if ($scope.homeData.contentData.date == "" || !$scope.homeData.contentData.date) {
  			myNotice("主题日报暂无过往消息",$ionicLoading);
  			return;
  		}else{

  		}

  		//数字转日期
  		var DateStr = $scope.homeData.contentData.date;
  		var DateYears = DateStr.substr(0, 4);
  		var DateMonth = DateStr.substr(4,2);
  		var DateDay = DateStr.substr(6, 2);
  		DateYears = DateYears + "-";
  		DateMonth = DateMonth + "-";
  		DateStr = DateYears + DateMonth + DateDay;
  		var TempDate = new Date(DateStr);
  		//日期转数字
  		var selectDate = TempDate.toISOString();//前一天
        selectDate     = selectDate.substring(0,10);
        selectDate     = selectDate.replace(/(日)/g,"");
        selectDate     = selectDate.replace(/(月)/g,"");
        selectDate     = selectDate.replace(/(年)/g,"");
        selectDate     = selectDate.replace(/(-)/g,"");
        selectDate     = selectDate.replace(/\//g,"");

  		GetData($http,$ionicLoading,"news/before/" + selectDate,function(Data){
			$scope.homeData.contentData = Data;
	    	for (var i = 0; i < $scope.homeData.contentData.stories.length; i++) {
				$scope.homeData.contentData.stories[i].index = i;
			}
			$scope.homeData.showTitle = $scope.homeData.contentData.date;
			$scope.$apply();
			$ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
	    });
  	}


  	$scope.setData();
  	setTimeout(function() {$scope.GetHeaderData();}, 500);
  	setTimeout(function() {$scope.GetContentData();}, 1500);
    
    




})

// pageOne
.controller("pageOneCtrl",function($scope, $state, $stateParams) {
	$state.go("home");
})