(function() {

	/**
	* Service to handle the cartrawler data.
	*/
	var cartrawler = function($http) {

		var rawJsonData, extractedCarsArray = [];

		/**
		* Send and receive $htttp request
		*/
	var getRawJsonData = function() {
		
	return $http.get("assets/json/data.php?new_date="+localStorage.getItem("newdate")).then(function(response) {
					rawJsonData = response.data;
					return rawJsonData;
				});

	
		};
		
		/** 
		* Extract the vehicle data from the JSON in useful format
		*/
		var getCarsFromRawJson = function(rawJsonArray) {

			var vehAvails, vehVendorAvails, i, j, vendor, vehicle,extractedCarsArray1 = [];
			
			if(0<extractedCarsArray.length) extractedCarsArray.length = 0;

			vehVendorAvails = rawJsonArray;

			for(i=0;i< vehVendorAvails.length; i++){
				extractedCarsArray.push(vehVendorAvails[i])
				
			}
			return extractedCarsArray;
		};


		/**
		* Public api for the methods and variables
		*/
		return {
			getRawJsonData: getRawJsonData,
			getCarsFromRawJson: getCarsFromRawJson,
			extractedCarsArray: extractedCarsArray
		};

	};

	/**
	* Add the service to the app module 
	*/
	var module = angular.module("cartrawlerViewer");
	module.factory("cartrawler", ["$http", cartrawler]);

}());