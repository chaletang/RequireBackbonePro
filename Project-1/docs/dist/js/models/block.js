define([
	'underscore',
	'backbone'
],function(_, Backbone){
	var BlockModel = Backbone.Model.extend({
		defaults: {
			id: "",
        	title: "",
        	content:""
   		},
		initialize: function(id,title,content){
			if(!id) id = this.defaults.id;
			if(!title) title = this.defaults.title;
			if(!content) content = this.defaults.content;
			this.set({
				id: id,
				title: title,
				content: content
			});
		}
	});
	return BlockModel;
});
