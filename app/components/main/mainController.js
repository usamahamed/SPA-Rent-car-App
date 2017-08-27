(function() {

	var module = angular.module("cartrawlerViewer");
  module.config(function($httpProvider) {
      //Remove the header used to identify ajax call  that would prevent CORS from working
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });
	/**
	 * Controller to manage the main car list view
	 */ 
	var MainController = function($scope, $location, cartrawler) {
		$scope.parseInt = parseInt;


		 $scope.Datetimepick=localStorage.getItem("newdate");
		/**
		 * Add useful data to $scope when data received
		 */
		var onDataRecived = function(response) {
					$('.spinner').hide(); 	

			//get the response object
			var obj = cartrawler.getCarsFromRawJson(response);
			//map object to array
			let arr = Object.keys(obj).map((k) => obj[k])
			//display message in case of no data
			if(arr.length===0){

				$('.no-data').fadeIn(300).html("There is no cars available in this time/date");
				$('.show-button').show();

			}else{
				$('.no-data').fadeOut(300)
					    $('.show-button').show();


			}
			//assign to the controller scope
			$scope.vehiclesDetails=arr;
			};

		/**
		 * Notify user when bad request has been made
		 */
		var onError = function() {
			$scope.error = "Apologies, we could not fetch the raw data. Please try again soon";
			alert($scope.error);
		};

		/**
		 * Route to the vehicle details page
		 */
		$scope.onVehicleClicked = function(vehicleDetail) {

			$location.path('/main/vehicle/' + vehicleDetail.$$hashKey);


		};

		
		/**
		 * Use the cartrawler service to get data
		 * On sucess fire the onDataRecived function
		 * On failure fire the onError function
		 */
		 $scope.fetch=	function(){
		$('.spinner').show(); 	
		$('.app-container').slideUp(300);
		$('.save-button').css("display","none");
		$('.buttons-container').css({'top': '142px','margin': '1px -32px','position': 'absolute'	});
		

		cartrawler.getRawJsonData().then(onDataRecived, onError);

		 }
		 /**
		 * Pick another date/time
		 */
	 $scope.showtimepanel=	function(){
	 	$('.app-container').slideDown(300);
	    $('.no-data').hide(300);
	   	$('.show-button').css("display","none");
		$('.repeating-card').css({'top':'266px','-webkit-transition':'ALL .5s ease-in-out','-transition':'ALL .5s ease-in-out'});
		$('.buttons-container').css({'top': '495px','margin': '1px 64px','position': 'absolute','-webkit-transition':'ALL .5s ease-in-out','-transition':'ALL .5s ease-in-out'});
		$('.save-button').show();
		$('.save-button').css({'position': 'absolute','right': '333px','width': '133px','padding': '0 33px','-webkit-transition':'ALL .5s ease-in-out','-transition':'ALL .5s ease-in-out'	});
		 if ($(window).width() <= 619) {  $('.save-button').css({'margin': '393px -161px'	});} 
		 }
	};


	/**
	 * Add controller to app
	 * Passing in dependencies to protect them when minifiying
	 */
	module.controller("MainController", ["$scope", "$location", "cartrawler", MainController]);

}());