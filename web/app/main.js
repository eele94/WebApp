/*
 -- Module --
*/

var  app = angular.module('myApp', ['ngRoute'])


app.factory('AppData', function($rootScope) {

	var collection = [];

		var AppCom = AppCom || {};

		AppCom.connect = function(host){
			if('WebSocket' in window){
				AppCom.socket = new WebSocket(host);
			} else if('MozWebSocket' in window) {
				AppCom.socket = new MozWebSocket(host);
			} else {
				console.log('Error: WebSocket is not supported by this browser.');
				return;
			}

			AppCom.socket.onopen = function(){
				console.log("Info: connection opened");
			};

			AppCom.socket.onclose = function(){
				console.log("Info: connection closed");
			};

			AppCom.socket.onmessage = function(message){
				var data = JSON.parse(message.data);
				collection.push(data);
				$rootScope.$broadcast("message", data);
			};
		};

		AppCom.initialize = function(){
			var ep = '/websocket/app';

			if(window.location.protocol == 'http:'){
				AppCom.connect('ws://'+window.location.host + ep);
			}else{
				AppCom.connect('wss://'+window.location.host + ep);
			}
		};

		AppCom.initialize();

	return collection;
});

/*
 -- Controllers --
*/
app.controller('mainController', function($scope, LogService){
	$scope.title = "test";
	LogService.addLog(new Log(Log.Type.ERROR, 'Graph library error'));
});

app.controller('menuController', function($scope, $location){
	$scope.getClass = function(path) {
		if ($location.path().substr(0, path.length) == path) {
			return "active"
		} else {
			return ""
		}
	};
});

app.controller('servoController', function($scope, $rootScope, AppData){
	$scope.$on('message', function(event, args) {
		$scope.$apply(function() {
			$scope.kaas = args.Servo1;
		});
	});
});