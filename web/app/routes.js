/*
 -- Routes --
*/


//Calls different templates and controllers based on the URL of the page
app.config(function($routeProvider) {
    $routeProvider
        // route for the stats page
        .when('/stats', {
            templateUrl : 'pages/stats.html',
            controller  : 'mainController'
        })

        // route for the servos page
        .when('/servos', {
            templateUrl : 'pages/servos.html',
            controller  : 'servoController'
        })

        // route for the stream page
        .when('/stream', {
            templateUrl : 'pages/stream.html',
            controller  : 'mainController'
        })

        // route for the stream page
        .when('/logs', {
            templateUrl : 'pages/logs.html',
            controller  : 'logController'
        })

         // route for the stream page
        .when('/control', {
            templateUrl : 'pages/control.html',
            controller  : 'mainController'
        })

        //Default path
        .otherwise({redirectTo: '/stats'});
});
