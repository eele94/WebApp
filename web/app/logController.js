/*
  -- Log Controller --
*/

app.controller('logController', function($scope, LogService){

	//Sets the variable of the type filter
	//So we can see logs per category
	//Also sets the tab index for the active class tab
	$scope.setLogFilterVar = function(filtervar){
		switch(filtervar)
		{
			case 'error':
				$scope.logFilterVar = Log.Type.ERROR;
				$scope.tabIndex = 2;
				break;
			case 'warning':
				$scope.logFilterVar = Log.Type.WARNING;
				$scope.tabIndex = 3;
				break;
			case 'info':
				$scope.logFilterVar = Log.Type.INFO;
				$scope.tabIndex = 1;
				break;
			default:
				$scope.logFilterVar = -1;
				$scope.tabIndex = 0;
				break;
		}					
	};

	//Holds the variables we need
	$scope.logFilterVar = -1;
	$scope.tabIndex = 0;
	$scope.logs = LogService.getLogs();

	//Checks if this is the current tab that is opened
	//If so it will give the tab the active state
	$scope.isActive = function(num){
		if(num == $scope.tabIndex)
			return "active";
		return "";
	}

	//This is doing the filtering
	//Compares the logs with the filter variable
	$scope.logFilter = function(input){
		if($scope.logFilterVar == -1) return input;

		if($scope.logFilterVar == input.type)
			return input;

		return null;
	};

	//Updates the details and logs
	$scope.update = function(){
		$scope.logs = LogService.getLogs();
		$scope.logCount = LogService.getCount();
		$scope.infoCount = LogService.getCount(Log.Type.INFO);
		$scope.warningCount = LogService.getCount(Log.Type.WARNING);
		$scope.errorCount = LogService.getCount(Log.Type.ERROR);
	}
	$scope.update();

	//Clears all the logs, resets the count
	$scope.clearLogs = function(){
		LogService.clearLogs();
		$scope.update();
	};

	//Save logs to json format
	function saveTextAsFile()
	{
		var textToWrite = JSON.stringify($scope.logs);
		var textFileAsBlob = new Blob([textToWrite], {type:'application/json'});
		var d = new Date();
		var fileNameToSaveAs = d.getTime() + ".json";

		var downloadLink = document.createElement("a");
		downloadLink.download = fileNameToSaveAs;
		downloadLink.innerHTML = "Download File";

		if (window.webkitURL != null)
		{
			// Chrome allows the link to be clicked
			// without actually adding it to the DOM.
			downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
		}
		else
		{
			// Firefox requires the link to be added to the DOM
			// before it can be clicked.
			downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
			downloadLink.onclick = destroyClickedElement;
			downloadLink.style.display = "none";
			document.body.appendChild(downloadLink);
		}

		downloadLink.click();
	}

	//Saves logs when there are logs available
	$scope.saveLogs = function(){
		if($scope.logCount > 0)
			saveTextAsFile("test");
	}

	//Test function to add a log
	//TODO: Remove this
	$scope.addTest = function() { 
		var log = new Log(Log.Type.ERROR, 'test');
		LogService.addLog(log);
		$scope.update();
	};
});