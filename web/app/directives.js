/*
 -- Directives --
*/

app.directive('topbar', function(){
	return{
		restrict: 'E',
		templateUrl: 'views/topbar.html'
	};
});

app.directive('sidebar', function(){
	return{
		restrict: 'E',
		templateUrl: 'views/sidebar.html',
	};
});

app.directive('pane', function(){
  return {
    restrict: 'E',
    transclude: true,
    scope: { title:'@', icon:'@' },
    template: '<div class="container"><div class="page-header"><h3><span class="{{icon}}"></span> {{title}}</h3></div>' +
              '<ng-transclude></ng-transclude>' +
              '</div>'
  };
});