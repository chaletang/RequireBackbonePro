define([
	'underscore',
	'backbone',
	'backboneLocalstorage',
	'userModel',
	'userData'
],function(_, Backbone,Store,UserModel,UserData){
	var UserCollection = Backbone.Collection.extend({	
		url: '/users',
	  	localStorage: new Store('users-backbone'),
		model: UserModel,
		initialize: function(){
			var that = this;
			_.each(userData, function(p){
				var model = new UserModel(p.id,p.name,p.portrait);
				that.create(model);
			});
            that.on( "change:name", this.changeName, this);
			
		},
		changeName: function( model, val, options)
        {
            var prev = model.previousAttributes();
            console.log( model.get("name") + " changed his name from " + prev.name);
        },
	});
	return new UserCollection();
});
