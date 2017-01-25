define([
	'basicView',
	'constants',
	'blockModel',
	'blockCollection',
	'blockData',
	'text!templates/block/list.html'
],function(BasicView,Constants,BlockModel,BlockCollection,BlockData,BlockListTemplate){
	var BlockListView = BasicView.extend({
		id: Block_View,
		initialized: false,
		viewTemplate: BlockListTemplate,
		render: function($parent){
			if(!this.initialized){
				var collection = new BlockCollection(); 
				_.each(blocksData, function(p){
					var model = new BlockModel(p.id,p.title,p.content);
					collection.add(model);
				});
				var compiledTemplate = _.template(BlockListTemplate);
				var compiledHtml = compiledTemplate({ blocks: collection.models}); 
				$(this.el).html(compiledHtml);
				$parent.append(this.el);
				this.initialized = true;
				console.log(this.id + " rendered!");
			}
			else {
				console.log(this.id + " already rendered, will show BlockView!");
				this.show();
			}
			return this;
		},
		eventsBinding: function(){
			//this.events["click .title"] = "";
		}
	});
	return BlockListView;
});
