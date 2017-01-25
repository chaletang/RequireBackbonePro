define([
	'underscore',
	'backbone',
	'blockModel'
],function(_, Backbone,BlockModel){
	var BlockCollection = Backbone.Collection.extend({	
		modal: BlockModel,
		initialize: function(){
			
		}
	});
	return BlockCollection;
});
