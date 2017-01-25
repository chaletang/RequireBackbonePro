define([
	'jquery',
	'underscore',
	'backbone',
	'constants',
	'viewManager',
	'userModel',
	'userCollection',
	'userData'
],function($,_,Backbone,Constants,ViewManager,UserModel,UserCollection,UserData){ 
	var AppRouter = Backbone.Router.extend({
		routes:{
			'users':'showUsers', 
			'user#:query':'editUser',
			'*actions':'defaultAction'
		},
		initialize:function(){			
			Backbone.history.start();	 
		},
		showUsers:function(){
			ViewManager.renderView(UserList_View);

		},
		editUser:function(query){
			ViewManager.renderView(UserEdit_View,query);

		},
		defaultAction:function(){

		}
	});
	return AppRouter;
});
