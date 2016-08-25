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
	/*$scope.setData = function(){
		$scope.homeData = {
			"contentData" : "",
			"subHeaderData": ""
		};

	    GetData($http,"news/latest",function(Data){
	    	$scope.homeData.contentData = Data;
	    });

	    setTimeout(function() {
	    	GetData($http,"themes",function(Data){
		    	$scope.homeData.subHeaderData = Data;
		    });
	    }, 500);

	    

	}
	$scope.pageDealWith = function(){
		console.log($scope.homeData);
		for (var i = 0; i < $scope.homeData.contentData.stories.length; i++) {
			$scope.homeData.contentData.stories[i].index = i;
		}
	}

	$scope.selectedType = function(list){
		GetData($http,"theme/" + list.id,function(Data){
			$scope.homeData.contentData = Data;
	    });
	    $scope.pageDealWith();
	}


	$scope.setData();
	setTimeout(function() {$scope.pageDealWith();}, 500);*/


	$scope.setData = function(){
		$scope.homeData = {
			"subHeaderData": "",
			"contentData" : ""
		};
		$scope.slideIndex = 1;
	}

	$scope.GetHeaderData = function(){
		GetData($http,"themes",function(Data){
	    	$scope.homeData.subHeaderData = Data;
	    	$scope.homeData.subHeaderData.others.unshift({
    			"name":"今日日报",
    			"id":"Today"
    		})
	    });
	}

	$scope.GetContentData = function(){
		GetData($http,"news/latest",function(Data){
	    	$scope.homeData.contentData = Data;
	    	for (var i = 0; i < $scope.homeData.contentData.stories.length; i++) {
				$scope.homeData.contentData.stories[i].index = i;
			}
			$scope.$apply();
	    });
	}
  	

	$scope.selectedType = function(list){
		GetData($http,"theme/" + list.id,function(Data){
			$scope.homeData.contentData = Data;
	    });
	    $scope.GetContentData();
	}

	$scope.selectedType = function(list){
		if (list.id == "Today") {
			$scope.GetContentData();
		}else{
			GetData($http,"theme/" + list.id,function(Data){
				$scope.homeData.contentData = Data;
				for (var i = 0; i < $scope.homeData.contentData.stories.length; i++) {
					$scope.homeData.contentData.stories[i].index = i;
				}
				$scope.$apply();
	    	});
		}
	}

	$scope.changedFun = function(index){
		var NowDate = new Date();
		var TempDate = new Date($scope.homeData.contentData.date);


		/*if(NowDate.getTime() > TempDate.getTime()){
	        console.log('NowDate大');
	    } else {
	        console.log("已经是最新数据了。");
	    }*/




	   

	    /*if (index == 3 || index == 4) {
	    	console.log("向右->");
	    }else if (index == 1 || index == 0) {
	    	console.log("<-向左");
	    }else{
	    	console.log("<-向左");
	    }*/

	    //console.log(index);
		/*GetData($http,"news/before/20131119",function(Data){
			console.log(Data);
			$scope.homeData.contentData = Data;
	    	for (var i = 0; i < $scope.homeData.contentData.stories.length; i++) {
				$scope.homeData.contentData.stories[i].index = i;
			}
			$scope.$apply();
	    });*/

	}
  	

  	$scope.onDragRight = function(){
  		console.log("右边");
  	}

  	$scope.onDragLeft = function(){
  		console.log("左边");
  	}


  	$scope.setData();
  	setTimeout(function() {$scope.GetHeaderData();}, 500);
  	setTimeout(function() {$scope.GetContentData();}, 1500);
    
    




})

// pageOne
.controller("pageOneCtrl",function($scope, $state, $stateParams) {
	$state.go("home");
})