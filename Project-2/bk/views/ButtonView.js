define([
	'basicView',
	'constants',
	'text!templates/button.html'
	],function(BasicView,Constants,ButtonTemplate){
		var ButtonView = BasicView.extend({
			id: Button_View,
			initialized: false,
			viewTemplate: ButtonTemplate,
			data: {name:'Show Blocks',path:'list'},
			events : {
			    "click .button" : "doNavigate" 
			},
			render: function(){
				var that = this;
				that.constructor.__super__.render.apply(this, arguments);	
				setTimeout(function(){
					that.$el.parent().find(".left-eye").addClass("moving-left");
					that.$el.parent().find(".right-eye").addClass("moving-right");
				},1000);
			},
			doNavigate: function(){		
				var router = new Backbone.Router();
				router.navigate(this.data.path,true);
			}
		});
		return ButtonView;
	});
