define([
	'jquery',
	'underscore',
	'backbone',
	'constants',
	'viewManager' 
],function($,_,Backbone,Constants,ViewManager){ 
	var AppRouter = Backbone.Router.extend({
		routes:{
			'list':'showBlockList', 
			'*actions':'defaultAction'
		},
		initialize:function(){
			Backbone.history.start();	
		},
		showBlockList:function(){
			ViewManager.renderView(Block_View);
			ViewManager.empty(Button_View);
		},
		defaultAction:function(){
			ViewManager.renderView(Button_View); 
			ViewManager.empty(Block_View);
		}
	});
	return AppRouter;
});
