/**
 * @description
 * 
 * <%= whatIsThis %>.
 */

angular.module( 'humpback.views.<%= statename %>.states', [

])
.config(function config( $stateProvider, $urlRouterProvider) {
	$stateProvider
		.state( '<%= state %>', {
			url: '<%= filename %>',
			ncyBreadcrumb: {
          		label: '<%=filename %>'
        	},
			views: {
				"@": {
					controller: '<%= statename %>Ctrl',
					templateUrl: 'app/views/<%= foldername %><%=filename %>.html'
				}
			}
		})
		;
});