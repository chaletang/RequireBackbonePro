define(["jquery","underscore","constants","app"], function ($,_,Constants,App) {
    var ViewsManager = function () {
        this.views = [];
    };

    ViewsManager.prototype.contains = function (view) {
        return _.contains(this.views, view);
    };

    ViewsManager.prototype.add = function (view) {
        if (!this.contains(view)) {
            this.views.push(view);
            console.log("ViewManager added view : " + view.id);
        }
    };

    ViewsManager.prototype.remove = function (view) {
        this.views = _.without(this.views, view);
    };
    
    ViewsManager.prototype.empty = function (id) {
        $("#" + id).remove();
    };

    ViewsManager.prototype.isFirstView = function (view) {
        return this.views[this.views.length - 1] === view;
    };

    ViewsManager.prototype.getFirstView = function () {
        return this.views[this.views.length - 1];
    };

    ViewsManager.prototype.findView = function (id, getAll) {
        var result = [];
        if (_.isString(id) && id.length > 0) {
            _.each(this.views, function (view) {
                if (view && view.id && view.id.toLowerCase() === id.toLowerCase()) {
                    result.push(view);
                }
            });
        }
        return getAll ? result : (result.length > 0 ? result[0] : null);
    };

    ViewsManager.prototype.updateAllViews = function () {
        var view, i;
        for (i = this.views.length - 1; i >= 0; i--) {
            view = this.views[i];
            if (view && _.isFunction(view.update)) {
                view.update();
            }
        }
    };
    
    ViewsManager.prototype.renderView = function (id,$parent) {
    	var that = this;
        if (!id) return;
        $parent = !$parent ? $(Config.AppRoot) : $parent;
        var view = that.findView(id);
        if (!view || view === null) {
            var route = VIEW_PATH[id];
            if (route) {
                require([route], function (ScopedView) {
                    view = new ScopedView();
                    view.render($parent);
                    that.add(view);
                });
            }
        } else {
        	console.log("View:" + view.id + " show!");
            view.show();
        }
        return view;
    };

    return new ViewsManager();
});