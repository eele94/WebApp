/*
 -- Log implementation --
*/

//Enum that holds the type of log
Log.Type = {
    INFO : "INFO",
    WARNING : "WARNING",
    ERROR : "ERROR"
}

//Log structure
//type is a Log.Type Enum
function Log(type, message)
{
	this.id = -1;
	this.type = type;
	this.message = message;

	this.setID = function(id){
		this.id = id;
	};

	this.getID = function(){
		return id;
	}

	this.show = function(){
		alert(this.getMessage());
	};

	this.getMessage = function(){
		return this.type + " | " + this.message;
	};
};

//Log service hold all the logs so we are able to access them from everywhere within the app
app.service('LogService', function() {
	var _logs = [];

	var errorCount = 0;
	var warningCount = 0;
	var infoCount = 0;

    //Adds a log and increments count, if the parameter isnt a log it will throw an error
    this.addLog = function(log){
    	if(log instanceof Log)
    	{
    		//Set the ID based on the array length
    		var newLog = log;
    		newLog.setID(_logs.length);
    		_logs.push(newLog);

    		//Increment log status
    		if(log.type == Log.Type.INFO) infoCount++;
    		if(log.type == Log.Type.WARNING) warningCount++;
    		if(log.type == Log.Type.ERROR) errorCount++;
    	}
    	else
    		throw "This isnt a log";
    }
 
    //Return the amount of logs per catergory, or all if there is no type specified
    this.getCount = function(type){
    	switch(type)
    	{
    		case Log.Type.INFO: return infoCount; break; 
    		case Log.Type.WARNING: return warningCount; break;
    		case Log.Type.ERROR: return errorCount; break;
    		default: return infoCount+warningCount+errorCount; break;
    	}
    }

    //Returns the logs
    this.getLogs = function() {
    	return _logs;
    }

    //Clears the logs and resets the count
    this.clearLogs = function() {
    	_logs = [];
    	errorCount = 0;
    	warningCount = 0;
    	infoCount = 0;
    }

    //Returns the last log
    this.getLatestLog = function() {
    	return _logs[_logs.length - 1];
    }
});

//Gets the bootstrap class based on the log type
app.filter("getBootstrapType", function(){
   return function(input){
        switch(input){
            case Log.Type.INFO: return 'info'; break; 
            case Log.Type.WARNING: return 'warning'; break;
            case Log.Type.ERROR: return 'danger'; break; 
        }
        return '';
   }
});