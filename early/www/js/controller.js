angular.module('starter.controllers', ['ionic'])

.controller("myCtrl",function($scope,$state,$http){
	$state.go("home");
})


// home
.controller("homeCtrl",function($scope,$state,$http,$ionicScrollDelegate,$ionicLoading) {

	//这是合并分支
	$scope.setData = function(){
		$scope.homeData = {
			"subHeaderData": "",
			"contentData" : "",
			"showTitle": "",
			"contentType":"Today",
			"contentDateNum":""
		};
		$scope.slideIndex = 1;
	}

	$scope.GetHeaderData = function(){
		GetData($http,$ionicLoading,"themes",function(Data){
	    	$scope.homeData.subHeaderData = Data;
	    	$scope.homeData.subHeaderData.others.unshift({
    			"name":"今日日报",
    			"id":"Today"
    		})
    		//默认选择的type
	    	setTimeout(function() {
	    		document.getElementById("今日日报").style.backgroundColor = "#E3E3E3";
				document.getElementById("今日日报").style.color = "#FFF";
	    		document.getElementById("keepDiv").style.backgroundColor = "#E3E3E3";
	    	}, 500);

    		//$scope.$apply();    		
	    });
	}

	$scope.GetContentData = function(){
		GetData($http,$ionicLoading,"news/latest",function(Data){
	    	$scope.homeData.contentData = Data;
	    	for (var i = 0; i < $scope.homeData.contentData.stories.length; i++) {
				$scope.homeData.contentData.stories[i].index = i;
			}
			$scope.homeData.showTitle = $scope.homeData.contentData.date;
			$scope.$apply();
	    });
	}
  	






	$scope.selectedType = function(list){
		$scope.homeData.contentType = list.id;
		if (list.id == "Today") {
			$scope.GetContentData();
		}else{
			GetData($http,$ionicLoading,"theme/" + list.id,function(Data){
				$scope.homeData.contentData = Data;
				for (var i = 0; i < $scope.homeData.contentData.stories.length; i++) {
					$scope.homeData.contentData.stories[i].index = i;
				}
				$scope.homeData.showTitle = $scope.homeData.contentData.description;
				$ionicScrollDelegate.$getByHandle('homeScroll').scrollTop();
				$scope.$apply();
	    	});
		}



		//判断选择了那个tpye
		var obj = event.srcElement;
		var selectDivId = ["今日日报" ,"日常心理学" ,"用户推荐日报" ,"电影日报" ,"不许无聊" ,"设计日报" ,"大公司日报" ,"财经日报" ,"互联网安全" ,"开始游戏" ,"音乐日报" ,"动漫日报" ,"体育日报"];
		if (obj.id != "") {
			for (var i = 0; i < selectDivId.length; i++) {
				document.getElementById(selectDivId[i]).style.backgroundColor = "#FFF";
				document.getElementById(selectDivId[i]).style.color = "#000";
			}
			obj.style.backgroundColor = "#E3E3E3";
			obj.style.color = "#FFF";
		}
	}

  	$scope.onDragRight = function(){
  		if ($scope.homeData.contentData.date == "" || !$scope.homeData.contentData.date) {
  			myNotice("主题日报暂无过往消息。",$ionicLoading);
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
  			myNotice("已经是最新数据。",$ionicLoading);
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
				$scope.homeData.contentData = Data;
		    	for (var i = 0; i < $scope.homeData.contentData.stories.length; i++) {
					$scope.homeData.contentData.stories[i].index = i;
				}
				$scope.homeData.showTitle = $scope.homeData.contentData.date;
				$scope.$apply();
				$ionicScrollDelegate.$getByHandle('homeScroll').scrollTop();
		    });
  		}
  	}

  	$scope.onDragLeft = function(){
  		if ($scope.homeData.contentData.date == "" || !$scope.homeData.contentData.date) {
  			myNotice("主题日报暂无过往消息。",$ionicLoading);
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
			$ionicScrollDelegate.$getByHandle('homeScroll').scrollTop();
	    });
  	}




  	$scope.setData();
  	setTimeout(function() {$scope.GetHeaderData();}, 500);
  	setTimeout(function() {$scope.GetContentData();}, 1500);
})

// details
.controller("detailsCtrl",function($scope, $state, $stateParams,$http,$ionicScrollDelegate,$ionicLoading) {
	$scope.setData = function(){
		$scope.detailsData = {
			"contentId":$stateParams.contentId,
			"contentType":$stateParams.contentType,
			"contentData":"",
			"articleList":"",
			"contentDateNum":$stateParams.contentDateNum
		};

		

		if ($scope.detailsData.contentType == "Today") {
			var DateYears = $scope.detailsData.contentDateNum.substr(0, 4);
	  		var DateMonth = $scope.detailsData.contentDateNum.substr(4,2);
	  		var DateDay = $scope.detailsData.contentDateNum.substr(6, 2);
	  		DateYears = DateYears + "-";
	  		DateMonth = DateMonth + "-";
	  		DateStr = DateYears + DateMonth + DateDay;
	  		var TempDate = new Date(DateStr);
	  		var TempDate2 = new Date(TempDate.getTime() + 24*60*60*1000);
	  		var selectDate = TempDate2.toISOString();//前一天
	        selectDate     = selectDate.substring(0,10);
	        selectDate     = selectDate.replace(/(日)/g,"");
	        selectDate     = selectDate.replace(/(月)/g,"");
	        selectDate     = selectDate.replace(/(年)/g,"");
	        selectDate     = selectDate.replace(/(-)/g,"");
	        selectDate     = selectDate.replace(/\//g,"");
	        $scope.GetBeforeDate = selectDate;
		}else{
			
		}
	}

	$scope.GetContentData = function(){
		//获取显示文章
		GetData($http,$ionicLoading,"news/" + $scope.detailsData.contentId ,function(Data){
			$scope.detailsData.contentData = Data;
			$scope.$apply();
	    });

		//获取文章列表
		setTimeout(function() {
			//判断是主题日报还是默认日报
			if ($scope.detailsData.contentType == "Today") {
				//判断是默认日报还是之前日报
		  		var NowDate = new Date();
				var DateStr = $scope.detailsData.contentDateNum;
				var DateYears = DateStr.substr(0, 4);
				var DateMonth = DateStr.substr(4,2);
				var DateDay = DateStr.substr(6, 2);
				DateYears = DateYears + "-";
				DateMonth = DateMonth + "-";
				DateStr = DateYears + DateMonth + DateDay;
				var ContrastDate = new Date(DateStr);

		  		if (NowDate.getFullYear() == ContrastDate.getFullYear() &&
		  			NowDate.getMonth() == ContrastDate.getMonth() &&
		  			NowDate.getDate() == ContrastDate.getDate() ||
		  			ContrastDate == "" ||!ContrastDate) {
		  			GetData($http,$ionicLoading,"news/latest",function(Data){
						$scope.detailsData.articleList = Data;
						document.getElementById("myIframe").src = $scope.detailsData.contentData.share_url;
				    });
		  		}else{
		  			GetData($http,$ionicLoading,"news/before/" + $scope.GetBeforeDate,function(Data){
						$scope.detailsData.articleList = Data;
						document.getElementById("myIframe").src = $scope.detailsData.contentData.share_url;
				    });
		  		}
				

			}else{
				GetData($http,$ionicLoading,"theme/" + $scope.detailsData.contentType,function(Data){
					$scope.detailsData.articleList = Data;
					document.getElementById("myIframe").src = $scope.detailsData.contentData.share_url;
		    	});
			}
		}, 500);
	}



	$scope.onDragRight = function(){
		console.log("右边->");
		//判断是否是最新日报
		if ($scope.detailsData.articleList.stories[0].id == $scope.detailsData.contentId) {
			myNotice("已经是第一篇了。",$ionicLoading);
			return;
		}else{
			var TempID = "";
			for (var i = 0; i < $scope.detailsData.articleList.stories.length; i++) {
				if ($scope.detailsData.articleList.stories[i].id == $scope.detailsData.contentId) {
					TempID = $scope.detailsData.articleList.stories[i-1].id
				}else{

				}
			}
			//获取显示文章
			setTimeout(function() {
				GetData($http,$ionicLoading,"news/" + TempID ,function(Data){
					$scope.detailsData.contentId = TempID;
					$scope.detailsData.contentData = Data;
					document.getElementById("myIframe").src = $scope.detailsData.contentData.share_url;
					$scope.$apply();
			    });

			}, 500);
		}
	}
	$scope.onDragLeft = function(){
		console.log("<-左边");
		if ($scope.detailsData.articleList.stories[$scope.detailsData.articleList.stories.length-1].id == $scope.detailsData.contentId) {
			myNotice("已经是最后一篇了。",$ionicLoading);
			return;
		}else{
			var TempID = "";
			for (var i = 0; i < $scope.detailsData.articleList.stories.length; i++) {
				if ($scope.detailsData.articleList.stories[i].id == $scope.detailsData.contentId) {
					TempID = $scope.detailsData.articleList.stories[i+1].id
				}else{

				}
			}
			//获取显示文章
			setTimeout(function() {
				GetData($http,$ionicLoading,"news/" + TempID ,function(Data){
					$scope.detailsData.contentId = TempID;
					$scope.detailsData.contentData = Data;
					document.getElementById("myIframe").src = $scope.detailsData.contentData.share_url;
					$scope.$apply();
			    });
			}, 500);
		}
	}



	$scope.setData();
  	setTimeout(function() {$scope.GetContentData();}, 1000);
})


















