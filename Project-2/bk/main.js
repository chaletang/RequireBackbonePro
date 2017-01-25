requirejs.config({
    paths: {
        jquery:'libs/jquery/jquery',
        underscore:'libs/underscore/underscore',
        backbone:'libs/backbone/backbone',
        backboneLocalstorage: 'libs/backbone.localstorage/backbone.localStorage',
        app:"controller/app",
        router:"controller/router",
        constants: "controller/constants",
        viewManager:'controller/viewManager',
        userModel:  "models/user",
        userCollection: "collections/users",
        userData: "data/userData",
        basicView: "views/BasicView",
        userListView: "views/user/UserListView",  
        userEditView: "views/user/UserEditView",  
        buttonView:"views/ButtonView"
    }
});

var Config = {};
require([
	"jquery"
],function($){
	Config = {	
		/* App root html element id */
		AppRoot: $("#app")
	};
});

require([
	'app',
],function(App){
	App.initialize();
});


