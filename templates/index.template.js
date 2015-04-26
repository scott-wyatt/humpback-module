/**
* @description 
* Loads <%= filename %> Module
* 
**/
angular.module('humpback.mvc.<%= filename %>', [
	'<%= filename %>.controllers',
	'<%= filename %>.states',
	'<%= filename %>.dependencies',
	'<%= filename %>.models',
	'<%= filename %>.components'
]);