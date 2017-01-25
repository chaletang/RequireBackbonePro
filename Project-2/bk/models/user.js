define([
	'underscore',
	'backbone'
],function(_, Backbone){
	var UserModel = Backbone.Model.extend({
		urlRoot: "/users",
		defaults: {
			id: "",
			name: "",
			portrait: ""
   		},
		initialize: function(id,name,portrait){
			if(!id) id = this.defaults.id;
			if(!name) name = this.defaults.name;
			if(!portrait) portrait = this.defaults.portrait;
			this.set({
				id: id,
				name: name,
				portrait: portrait
			});
		}
	});
	return UserModel;
});
