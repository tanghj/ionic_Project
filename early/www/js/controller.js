angular.module('starter.controllers', ['ionic'])

.controller("myCtrl",function($scope,$state){
	$state.go("home");
})


// home
.controller("homeCtrl",function($scope, $state) {

	//这是合并分支
	$scope.tempItem = [];
	var btnNameArr = ["App","Photo","Books","Music","Video","Other"];
	for (var i = 0; i < 6; i++) {
		$scope.tempItem.push({
			"index":i,
			"Name":btnNameArr[i]
		})
	}

})

// pageOne
.controller("pageOneCtrl",function($scope, $state, $stateParams) {
	
})