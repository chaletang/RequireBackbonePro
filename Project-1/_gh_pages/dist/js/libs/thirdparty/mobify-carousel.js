var Mobify = window.Mobify = window.Mobify || {};
Mobify.$ = Mobify.$ || window.Zepto || window.jQuery;
Mobify.UI = Mobify.UI || { classPrefix: 'm-' };

(function($, document) {
    $.support = $.support || {};

    $.extend($.support, {
        'touch': 'ontouchend' in document
    });

})(Mobify.$, document);



/**
    @module Holds common functions relating to UI.
*/
Mobify.UI.Utils = (function($) {
    var exports = {}
        , has = $.support;

    /**
        Events (either touch or mouse)
    */
    exports.events = (has.touch)
        ? {down: 'touchstart', move: 'touchmove', up: 'touchend'}
        : {down: 'mousedown', move: 'mousemove', up: 'mouseup'};

    /**
        Returns the position of a mouse or touch event in (x, y)
        @function
        @param {Event} touch or mouse event
        @returns {Object} X and Y coordinates
    */
    exports.getCursorPosition = (has.touch)
        ? function(e) {e = e.originalEvent || e; return {x: e.touches[0].clientX, y: e.touches[0].clientY}}
        : function(e) {return {x: e.clientX, y: e.clientY}};


    /**
        Returns prefix property for current browser.
        @param {String} CSS Property Name
        @return {String} Detected CSS Property Name
    */
    exports.getProperty = function(name) {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms', '']
          , testStyle = document.createElement('div').style;
        
        for (var i = 0; i < prefixes.length; ++i) {
            if (testStyle[prefixes[i] + name] !== undefined) {
                return prefixes[i] + name;
            }
        }

        // Not Supported
        return;
    };

    $.extend(has, {
        'transform': !! (exports.getProperty('Transform'))
      , 'transform3d': !! (window.WebKitCSSMatrix && 'm11' in new WebKitCSSMatrix()) 
    });

    // translate(element, delta, dir)
    // Moves the element by delta (px)
    var transformProperty = exports.getProperty('Transform');
    if (has.transform3d) {
        exports.translate = function(element, delta, dir) {
             if (typeof delta == 'number') delta = delta + 'px';   
             if(dir == "horizontal"){
             	element.style[transformProperty] = 'translate3d(' + delta  + ',0,0)';
             }
             else {
             	element.style[transformProperty] = 'translate3d(0,' + delta  + ',0)';
             }
        };
    } else if (has.transform) {
        exports.translate = function(element, delta, dir) {
             if (typeof delta == 'number') delta = delta + 'px';
             if(dir == "horizontal"){
             	element.style[transformProperty] = 'translate(' + delta  + ',0)';
             }
             else {
             	element.style[transformProperty] = 'translate(0,' + delta  + ')';
             }
        };
    } else {
        exports.translate = function(element, delta, dir) {
            if (typeof delta == 'number') delta = delta + 'px';
            if(dir == "horizontal"){
             	element.style.left = delta;
             }
             else {
             	element.style.top = delta;
             }
        };
    }

    // setTransitions
    var transitionProperty = exports.getProperty('Transition')
      , durationProperty = exports.getProperty('TransitionDuration');

    exports.setTransitions = function(element, enable) {
        if (enable) {
            element.style[durationProperty] = '';
        } else {
            element.style[durationProperty] = '0s';
        }
    }


    // Request Animation Frame
    // courtesy of @paul_irish
    exports.requestAnimationFrame = (function() {
        var prefixed = (window.requestAnimationFrame       || 
                        window.webkitRequestAnimationFrame || 
                        window.mozRequestAnimationFrame    || 
                        window.oRequestAnimationFrame      || 
                        window.msRequestAnimationFrame     || 
                        function( callback ){
                            window.setTimeout(callback, 1000 / 60);
                        });

        var requestAnimationFrame = function() {
            prefixed.apply(window, arguments);
        };

        return requestAnimationFrame;
    })();

    return exports;

})(Mobify.$);

Mobify.UI.Carousel = (function($, Utils) {
    var defaults = {
            dragRadius: 10
          , moveRadius: 20
          , classPrefix: undefined
          , classNames: {
                outer: 'carousel'
              , inner: 'carousel-inner' 
              , item: 'item'
              , center: 'center'
              , touch: 'has-touch'
              , dragging: 'dragging'
              , active: 'active'
              , controller: 'carousel-controller'
            }
            ,rotation: 5000
            ,step: 1
            ,slideName: 'data-slider'
            ,autoPlay: false
            ,circulation: false
            ,direction: 'horizontal'
            ,correlation:false
            ,crotation: 5000
            ,dragable: true
        }
       , has = $.support;

    // Constructor
    var Carousel = function(element, options) {
        this.setOptions(options);
        this.initElements(element);
        this.initOffsets();
        this.initAnimation();
        this.bind();
    };

    // Expose Dfaults
    Carousel.defaults = defaults;
	
	Carousel.prototype.begin = function() {
		var _this = this;
		var realDelay = _this.delay;
		if(this.correlation){
			var related = this.$element.find(".m-item.active").index() + 1 ;
			var count = this.$items.length;
			var pager = Math.ceil(this.$items.length/_this.step);
			var cPager = Math.ceil(related/_this.step);
			var left = cPager*_this.step - related + 1;	
			if(cPager == pager && count < pager*_this.step){
				left = count - related + 1;	
			}
			//alert("related:" + related +",pager:"+pager+",cPager:"+cPager+",left:"+left);
			realDelay = _this.crotation*left - 2000;
		}
		if(_this.autoPlay){
			_this.interval = (realDelay) ? setTimeout(function() { 

			_this.next(realDelay);

		  }, realDelay) : 0;
		}
		
	};
	
    Carousel.prototype.transitionEnd = function(e) {
    	if (this.delay != undefined)
		{
			this.begin();
		}
		else if (this.parentElement._carousel.delay)
		{
			this.parentElement._carousel.begin();
		}
	}
    
    Carousel.prototype.setOptions = function(opts) {
        var options = this.options || $.extend({}, defaults, opts);
        
        /* classNames requires a deep copy */
        options.classNames = $.extend({}, options.classNames, opts.classNames || {});

        /* By default, classPrefix is `undefined`, which means to use the Mobify-wide level prefix */
        options.classPrefix = options.classPrefix || Mobify.UI.classPrefix;

        this.options = options;
		this.delay = options.rotation;
		this.step = options.step;
		this.slideName = options.slideName;
		this.autoPlay = options.autoPlay;
		this.circulation = options.circulation;
		this.direction = options.direction;
		this.correlation = options.correlation;
		this.crotation = options.crotation;
		this.dragable = options.dragable;
    };
    
    Carousel.prototype.resize = function(){
    	var self = this;
    	var slider = Math.ceil(self._index / self.step);
    	self.delay = 0;
		clearTimeout(self.interval);
		self.move((slider - 1) * self.step + 1);

    }

    Carousel.prototype.initElements = function(element) {
        this._index = 1;
        
        this.element = element;
        this.$element = $(element);
        this.$inner = this.$element.find('.' + this._getClass('inner'));
		this.realInnerHtml = this.$inner.html();
		var length = this.$inner.children().length;
		var slideCount = length;
		if (length % this.step != 0) {
			var addCount = (Math.floor(length / this.step) + 1) * this.step - length;
			for (var i = 0; i < addCount; i++) {
				   this.$inner.html(this.$inner.html() + '<div class="m-item" style=""></div>');
			}
			slideCount = Math.floor(length / this.step) + 1;
		} else {
			slideCount = length / this.step;
		}
		
		var slideStr = ""
		for (var i = 1; i <= slideCount; i++) {
		   slideStr = slideStr + '<a href="#" ' + this.slideName + '="' + i + '"></a>';
		}
		slideStr = slideStr + '<a class="m-pager"><span>' + this._index + '</span>/' + length +'</a>';
		this.$element.find(".m-carousel-controls.m-carousel-pagination").html(slideStr);
		
        this.$items = this.$inner.children();
        
        this.$start = this.$items.eq(0);
        this.$sec = this.$items.eq(1);
        this.$current = this.$items.eq(this._index);

        this._length = this.$items.length;
        this._alignment = this.$element.hasClass(this._getClass('center')) ? 0.5 : 0;
        this.$controller = this.$element.parent().find('.' + this._getClass('controller'));

    };

    Carousel.prototype.initOffsets = function() {
        this._offset = 0;
        this._offsetDrag = 0;
    }

    Carousel.prototype.initAnimation = function() {
        this.animating = false;
        this.dragging = false;
        this._needsUpdate = false;
        this._enableAnimation();
    };


    Carousel.prototype._getClass = function(id) {
        return this.options.classPrefix + this.options.classNames[id];
    };


    Carousel.prototype._enableAnimation = function() {
        if (this.animating) {
            return;
        }

        Utils.setTransitions(this.$inner[0], true);
        this.$inner.removeClass(this._getClass('dragging'));
        this.animating = true;
    }

    Carousel.prototype._disableAnimation = function() {
        if (!this.animating) {
            return;
        }
        
        Utils.setTransitions(this.$inner[0], false);
        this.$inner.addClass(this._getClass('dragging'));
        this.animating = false;
    }

    Carousel.prototype.update = function() {
        /* We throttle calls to the real `_update` for efficiency */
        if (this._needsUpdate) {
            return;
        }

        var self = this;
        this._needsUpdate = true;
        Utils.requestAnimationFrame(function() {
            self._update();
        });
    }

    Carousel.prototype._update = function() {
        if (!this._needsUpdate) {
            return;
        }

        var x = Math.round(this._offset + this._offsetDrag);

        Utils.translate(this.$inner[0], x, this.direction);

        this._needsUpdate = false;
    }

    Carousel.prototype.bind = function() {

        var abs = Math.abs
            , dragging = false
            , canceled = false
            , dragRadius = this.options.dragRadius
            , xy
            , dx
            , dy
            , dragThresholdMet
            , self = this
            , $element = this.$element
            , $inner = this.$inner
            , opts = this.options
            , dragLimit = this.$element.width()
            , lockLeft = false
            , lockRight = false
            , $nextArrow = $element.find(".m-carousel-arrows > [data-slider='next']")
            , $prevArrow = $element.find(".m-carousel-arrows > [data-slider='prev']")
            , $pagination = $element.find(".m-carousel-pagination > [data-slider]")
            , $controller = this.$controller;
            

        function start(e) {
        	if(self.dragable){
            if (!has.touch) e.preventDefault();

            dragging = true;
            canceled = false;

            xy = Utils.getCursorPosition(e);
            dx = 0;
            dy = 0;
            dragThresholdMet = false;

            // Disable smooth transitions
            self._disableAnimation();

            lockLeft = self._index == 1;
            lockRight = self._index + (self.step -1) >= self._length;
           }
        }

        function drag(e) {
        	if(self.dragable){
            if (!dragging || canceled) return;

            var newXY = Utils.getCursorPosition(e);
            dx = xy.x - newXY.x;
            dy = xy.y - newXY.y;
            
			if(self.direction == "horizontal") {
	            if (dragThresholdMet || abs(dx) > abs(dy) && (abs(dx) > dragRadius)) {
	                dragThresholdMet = true;
	                e.preventDefault();
	                if (lockLeft && (dx < 0)) {
	                    dx = dx * (-dragLimit)/(dx - dragLimit);
	                } else if (lockRight && (dx > 0)) {
	                    dx = dx * (dragLimit)/(dx + dragLimit);
	                }
	                else {
	                	self._offsetDrag = -dx;
	                	self.update();
	                }

	            } else if ((abs(dy) > abs(dx)) && (abs(dy) > dragRadius)) {
	                canceled = true;
	            }
            }
            else {
            	if (dragThresholdMet || abs(dy) > abs(dx) && (abs(dy) > dragRadius)) {
	                dragThresholdMet = true;
	                e.preventDefault();
	                
	                if (lockLeft && (dy < 0)) {
	                    dy = dy * (-dragLimit)/(dy - dragLimit);
	                } else if (lockRight && (dy > 0)) {
	                    dy = dy * (dragLimit)/(dy + dragLimit);
	                }
	                else {
	                	self._offsetDrag = -dy;
	                	self.update();
	                }
	            } else if ((abs(dx) > abs(dy)) && (abs(dx) > dragRadius)) {
	                canceled = true;
	            }
        }

            }
        }

        function end(e) {
        	if(self.dragable){
            if (!dragging) {
                return;
            }
            dragging = false;
            
            self._enableAnimation();
            
            if(self.direction == "horizontal"){

	            if (!canceled && abs(dx) > opts.moveRadius) {
	                // Move to the next slide if necessary
	                if (dx > 0) {
	                    self.next();
	                } else {
	                    self.prev();
	                }
	            } else {
	                // Reset back to regular position
	                self._offsetDrag = 0;
	                self.update();
	            }
            }
            else {
            	if (!canceled && abs(dy) > opts.moveRadius) {
	                // Move to the next slide if necessary
	                if (dy > 0) {
	                    self.next();
	                } else {
	                    self.prev();
	                }
	            } else {
	                // Reset back to regular position
	                self._offsetDrag = 0;
	                self.update();
	            }
            }

            }

        }
		
        function click(e) {
        	
            if (dragThresholdMet) e.preventDefault();
        }

        $inner
            .on(Utils.events.down + '.carousel', start)
            .on(Utils.events.move + '.carousel', drag)
            .on(Utils.events.up + '.carousel', end)
            .on('click.carousel', click)
            .on('mouseout.carousel', end);
            
        $element.on('mouseover', function(e){
				clearTimeout(self.interval);
		});
		
		$element.on('mouseout', function(e){
			if(!$element.hasClass("paused")){
				self.begin();
			}
		});
        $(window).resize(function(){
        	self.resize();
        });    
		$controller.on('click', '[' + self.slideName + ']', function(e){
			e.preventDefault();
			var action = $(this).attr(self.slideName);
			if(action == "pause"){
				$element.addClass("paused");
        		clearTimeout(self.interval);
        		//alert($(this).attr(self.slideName))
        		$(this).attr(self.slideName,"play");
        	}
        	else if(action == "play"){
        		$element.removeClass("paused");
        		self.begin();
        		$(this).attr(self.slideName,"pause");
        	}
		});
		
		$("." + $element.attr("data-target")).on('mouseover', function(e){
			clearTimeout(self.interval);
		});
		
		$("." + $element.attr("data-target")).on('mouseout', function(e){
			if(!$element.hasClass("paused")){
				self.begin();
			}
		});

        $element.on('click', '[' + self.slideName + ']', function(e){
            e.preventDefault();
            //self.delay = 0;
			//clearTimeout(self.interval);
            var action = $(this).attr(self.slideName)
              , index = parseInt(action, 10);
			  
            if (isNaN(index)) {
            	if(action == "prev"){
            		self.prev();
            	}
            	else if(action == "next"){
            		self.next();
            	}
            } else {
                self.move((index - 1) * self.step + 1);
                if(index == 1){
                	$nextArrow.removeClass("m-disabled");
                	$prevArrow.addClass("m-disabled");
                }
                else if(index == $pagination.length) {
                	$prevArrow.removeClass("m-disabled"); 
                	$nextArrow.addClass("m-disabled");
                }
                else {
                	$prevArrow.removeClass("m-disabled");
                	$nextArrow.removeClass("m-disabled");
                }
            } 
            
        });

        $element.on('afterSlide', function(e, previousSlide, nextSlide) {
            self.$items.eq((previousSlide - 1)*self.step ).removeClass(self._getClass('active'));
            self.$items.eq((nextSlide - 1)*self.step ).addClass(self._getClass('active'));

            self.$element.find('[' + self.slideName + '=\'' + previousSlide + '\']').removeClass(self._getClass('active'));
			self.$element.find('[' + self.slideName + '=\'' + nextSlide + '\']').addClass(self._getClass('active'));
        });


		$element.trigger('beforeSlide', [1, 1]);
		$element.trigger('afterSlide', [1, 1]);


		// add event listeners
		if (navigator.userAgent.indexOf('MSIE') && navigator.userAgent.indexOf('MSIE') > -1) {
			self.transitionEnd(); 
		}
		else{
			self.$inner.bind('transitionend', self.transitionEnd);
			self.$inner.bind('webkitTransitionEnd', self.transitionEnd); // for ios and android browsers
		}
        self.update();

    };

    Carousel.prototype.unbind = function() {
        this.$inner.off();
    }

    Carousel.prototype.destroy = function() {
        this.unbind();
        this.$element.trigger('destroy');
        this.$element.remove();
        
        // Cleanup
        this.$element = null;
        this.$inner = null;
        this.$start = null;
        this.$current = null;
    }

    Carousel.prototype.move = function(newIndex, opts) {
        var $element = this.$element
            , $inner = this.$inner
            , $items = this.$items
            , $start = this.$start
            , $current = this.$current
            , length = this._length
            , index = this._index;
                
        opts = opts || {};
        // Bound Values between [1, length];
        if (newIndex < 1) {
            newIndex = 1;
        } else if (newIndex > this._length) {
            newIndex = length;
        }
        
        // Bail out early if no move is necessary.
        if (newIndex == this._index) {
            //return; // Return Type?
        }

        // Trigger beforeSlide event
        $element.trigger('beforeSlide', [index, newIndex]);


        // Index must be decremented to convert between 1- and 0-based indexing.
        this.$current = $current = $items.eq(newIndex - 1);

        var currentOffset = $current.prop('offsetLeft') + $current.prop('clientWidth') * this._alignment
            , startOffset = $start.prop('offsetLeft') + $start.prop('clientWidth') * this._alignment
        
        if(this.direction == "vertical"){
        	currentOffset = $current.prop('offsetTop') + $current.prop('clientHeight') * this._alignment
            , startOffset = $start.prop('offsetTop') + $start.prop('clientHeight') * this._alignment
        }    

        var transitionOffset = -(currentOffset - startOffset);

        this._offset = transitionOffset;
        this._offsetDrag = 0;
        this._index = newIndex;
        this.update();
        // Trigger afterSlide event
		var previousSlide = index;
		var nextSlide = newIndex;
		if (newIndex % this.step == 0) {
			previousSlide = index / this.step;
		} else {
			previousSlide = Math.floor(index / this.step) + 1;
		}
		if (newIndex % this.step == 0) {
			nextSlide = newIndex / this.step;
		} else {
			nextSlide = Math.floor(newIndex / this.step) + 1;
		}
        $element.trigger('afterSlide', [previousSlide, nextSlide]);
		
		// stx customization IE 8/9 fix
		if (navigator.userAgent.indexOf('MSIE') && navigator.userAgent.indexOf('MSIE') > -1) {
			this.transitionEnd(); 
		}
		
		$element.find(".m-pager > span ").text(newIndex);
    };

    Carousel.prototype.next = function(delay) {
		this.delay = delay || 0;
		//clearTimeout(this.interval);
		this.$element.find(".m-carousel-arrows > a[data-slider='prev']").removeClass("m-disabled");
		if (this._index <= this._length - this.step)
		{
			this.move(this._index + this.step); // if not last slide
			
			if(this._index + (this.step - 1) >= this._length){
				this.$element.find(".m-carousel-arrows > a[data-slider='next']").addClass("m-disabled");
			}
			else {
				this.$element.find(".m-carousel-arrows > a[data-slider='next']").removeClass("m-disabled");
			}
		}			
		else 
		{
			if(this.circulation){
				this.$element.find(".m-carousel-arrows > a[data-slider='next']").removeClass("m-disabled");
				this.move(1); //if last slide return to start
			}
		}
    };
    
    Carousel.prototype.prev = function(delay) {
		this.delay = delay || 0;
		//clearTimeout(this.interval);
        this.$element.find(".m-carousel-arrows > a[data-slider='next']").removeClass("m-disabled");
		// if not at first slide
		if (this._index > this.step) 
		{
			this.move(this._index - this.step);
			if(this._index == 1){
				this.$element.find(".m-carousel-arrows > a[data-slider='prev']").addClass("m-disabled");
			}
			else {
				this.$element.find(".m-carousel-arrows > a[data-slider='prev']").removeClass("m-disabled");
			}
		}
		else 
		{
			var lastIndex = (Math.ceil(this._length / this.step) - 1) * this.step + 1;
			
			if(this.circulation){
				this.$element.find(".m-carousel-arrows > a[data-slider='prev']").removeClass("m-disabled");
				this.move(lastIndex); //if first slide return to last slide
			}
		}
    };
    Carousel.prototype.resize = function(){
    	var self = this;
    	if(self.autoPlay && !self.$element.hasClass("paused")){
    		self.$controller.find("["+ self.slideName + " ='pause'] ").trigger('click');
    	}
    };

    return Carousel;

})(Mobify.$, Mobify.UI.Utils);



(function($) {
    /**
        jQuery interface to set up a carousel


        @param {String} [action] Action to perform. When no action is passed, the carousel is simply initialized.
        @param {Object} [options] Options passed to the action.
    */
    $.fn.mcarousel = function (action, options) {
        var initOptions = $.extend({}, $.fn.mcarousel.defaults, options);

        // Handle different calling conventions
        if (typeof action == 'object') {
            initOptions = $(initOptions, action);
            options = null;
            action = null;
        }
        this.each(function () {
            var $this = $(this)
              , carousel = this._carousel;
            
            if (!carousel) {
                carousel = new Mobify.UI.Carousel(this, initOptions); 
            }

            if (action) {

                if (action === 'destroy') {
                    carousel = null;
                }
                else {
                	carousel[action](options);
                }
            }
            
            this._carousel = carousel; 
        })

        return this;
    };

    $.fn.mcarousel.defaults = {}; 

})(Mobify.$);
