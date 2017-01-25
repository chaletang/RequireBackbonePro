define([
	'basicView',
	'constants',
	'userModel',
	'userCollection',
	'userData',
	'text!templates/user/list.html'
],function(BasicView,Constants,UserModel,UserCollection,UserData,UserListTemplate){
	var UserListView = BasicView.extend({
		id: UserList_View,
		initialized: false,
		viewTemplate: UserListTemplate,
		initialize: function(){
			this.listenTo(this.model, 'change', this.render);
		},
		render: function($parent){
			if(!this.initialized){			
				var compiledTemplate = _.template(UserListTemplate);
				var compiledHtml = compiledTemplate({ users: UserCollection.models}); 
				$(this.el).html(compiledHtml);
				$parent.html("");
				$parent.append(this.el);
				this.initialized = true;
				console.log(this.id + " rendered!");
			}
			else {
				console.log(this.id + " already rendered, will show BlockView!");
				this.show();
			}
			return this;
		}
		
	});
	return UserListView;
});
