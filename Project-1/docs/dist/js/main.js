requirejs.config({
    paths: {
        jquery:'libs/jquery/jquery',
        underscore:'libs/underscore/underscore',
        backbone:'libs/backbone/backbone',
        'jquery.pubsub':'libs/thirdparty/jquery.pubsub',
        'modernizr.custom':'libs/thirdparty/modernizr.custom',
        app:"controller/app",
        router:"controller/router",
        constants: "controller/constants",
        viewManager:'controller/viewManager',
        blockModel:  "models/block",
        blockCollection: "collections/blocks",
        blockData: "data/block",
        basicView: "views/BasicView",
        blockListView: "views/block/BlockListView",  
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


