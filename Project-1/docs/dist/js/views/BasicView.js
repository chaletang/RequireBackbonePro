define(["jquery","underscore","backbone"], function($,_,backbone){
	var BasicView = Backbone.View.extend({
		id :"",
		className : "",
		tagName : "div",
		initialized : false,
		viewTemplate : "",
		data : {},
		events: {},
		eventsBinding: function(){},
		render: function($parent){
			if(!this.initialized){
				var template = _.template(this.viewTemplate)(this.data);
				$(this.el).html(template);
				$parent.append(this.el);
				this.initialized = true;
				console.log(this.id + " rendered!");
			} else {
				console.log(this.id + " already rendered, will show View!");
				this.show();
			}
			this.eventsBinding();
			this.delegateEvents();
			return this;
		},
		show: function(){
			if(this.initialized){
				$(this.el).show();
				console.log(this.id + " show!");
			} else {
				console.log(this.id + " not rendered, start rendering!");
				this.render();
			}
			return this;
		},
		hide: function(){
			if(this.initialized){
				$(this.el).hide();
				console.log(this.id + " hide!");
			} else {
				console.log(this.id + " was not rendered, do not need to hide!");
			}
			return this;
		},
		remove: function(){
			if(this.initialized){
				$(this.el).remove();
				this.initialized = false;
				console.log(this.id + " destroyed!");
			}
		}
	});
	return BasicView;
});
