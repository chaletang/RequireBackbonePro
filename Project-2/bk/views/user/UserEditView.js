define([
	'basicView',
	'constants',
	'userModel',
	'userCollection',
	'userData',
	'text!templates/user/edit.html'
],function(BasicView,Constants,UserModel,UserCollection,UserData,UserEditTemplate){
	var UserEditView = BasicView.extend({
		id: UserEdit_View,
		initialized: false,
		viewTemplate: UserEditTemplate,
		initialize: function () {
			//this.listenTo(this.model, 'change', this.render);
		},
		render: function(query,$parent){
			if(!this.initialized){				
				this.model = UserCollection.get(query);
				var compiledTemplate = _.template(UserEditTemplate);
				var compiledHtml = compiledTemplate({ user: this.model}); 
				$(this.el).html(compiledHtml);
				$parent.html("");
				$parent.append(this.el);
				this.initialized = true;
				console.log(this.id + " rendered!"); 
			}
			else {
				console.log(this.id + " already rendered, will show UserEditView!");
				this.show();
			}
			return this;
		},
		events: {
        	'click .save': 'editUser'
	    },
	    editUser: function () {
    	 	var nameValue = this.$('input#inputName').val();
			if (nameValue!="") {
				this.model.save({ name: nameValue });  
			} else {
				this.clear();
			}
    	}
	});
	return UserEditView;
});
