angular.module('starter.controllers', ['ionic'])

.controller("myCtrl",function($scope,$state){
	$state.go("home");
})


// home
.controller("homeCtrl",function($scope, $state) {
	//这是master分支
})

// pageOne
.controller("pageOneCtrl",function($scope, $state, $stateParams) {
	
})