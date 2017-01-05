var app = angular.module('queryModal',[]);
var appEntry = angular.module('entryModal',[]);
var applogin = angular.module('loginModal',[]);

// Controller for Loq qUERY
app.controller('QueryCtrl', function($scope, $http) {
	
    $scope.data = [];
    var request = $http.get('/data');    
    request.success(function(data) {
        $scope.data = data;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });
});
	

// Controller for log entry

appEntry.controller('EntryCtrl', function($scope, $http) {
		
		$scope.personalDetails = [
				       {
				            'cpr':'',
				            'navn':'',
				            'date':'',
				            'duration':''
				        }];
		
	    $scope.personalDetail = {};
	    
	    var request = $http.post('/logEntry');    
	    request.success(function(personalDetail) {
	        $scope.personalDetail = personalDetail;
	    });
	    request.error(function(personalDetail){
	        console.log('Error: ' + personalDetail);
	    });
	    
	    $scope.addNew = function(personalDetails){
            $scope.personalDetails.push({ 
	                'cpr': "", 
	                'navn': "",
	                'date': "",
	                'duration': "",
	            });
	            $scope.PD = {};
	        };
	        
	       // remove the selected row
	        $scope.removeRow = function(index){
	          // remove the row specified in index
	          $scope.personalDetails.splice( index, 1);
	          // if no rows left in the array create a blank array
	          if ($scope.personalDetails.length() === 0){
	            $scope.personalDetails = [];
	          }
	        };
	    
	        $scope.remove = function(){
	            var newDataList=[];
	            $scope.selectedAll = false;
	            angular.forEach($scope.personalDetails, function(selected){
                if(!selected.selected){
	                    newDataList.push(selected);
	                }
	            }); 
	            $scope.personalDetails = newDataList;
	        };
	    
	        $scope.checkAll = function () {
	            if (!$scope.selectedAll) {
	                $scope.selectedAll = true;
	            } else {
	                $scope.selectedAll = false;
	            }
	            angular.forEach($scope.personalDetails, function (personalDetails) {
	                personalDetails.selected = $scope.selectedAll;
	            });
	        };  	    
	    
	});	