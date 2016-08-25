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
	}

	$scope.GetHeaderData = function(){
		GetData($http,"themes",function(Data){
	    	$scope.homeData.subHeaderData = Data;
	    	/*for (var i = 0; i < $scope.homeData.subHeaderData.others.length; i++) {
	    		console.log($scope.homeData.subHeaderData.others[i]);

	    	}*/

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


  	$scope.setData();
  	setTimeout(function() {$scope.GetHeaderData();}, 500);
  	setTimeout(function() {$scope.GetContentData();}, 1500);
    
    




})

// pageOne
.controller("pageOneCtrl",function($scope, $state, $stateParams) {
	$state.go("home");
})