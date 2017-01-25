define([
	'jquery',
	'router'
],function($,Router){
	var App = {
		initialize: function(){
            App.router = new Router();
            console.log("App initialization finished!");
		},
		destroy: function(){
			//do destroy here
			console.log("App destroyed!");
		}
	};
	return App;
});
