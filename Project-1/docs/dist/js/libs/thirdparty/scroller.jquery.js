/*
 * scroller.js v1.0
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 */

(function ( $ ) {
	$.fn.scroller = function( options ) {

		"use strict";
		var args = arguments,
			returnValue = null;

		this.each(function(){

			var instance = this,
				$this = $( this );

			var settings = $.extend({
				//Defaults
				speed						: 10,
				frameLength					: 25,
				direction					: "horizontal",
				inner_el					: $this.find(".scroller-inner"),
				on_reset					: function () {}
			}, options );
			// Store a settings reference within the element's data
			if (!$.data(instance, 'plugin_scroller')) {
				$.data(instance, 'plugin_scroller', settings);
				instance.settings = $.data(instance, 'plugin_scroller');
			}

			var selector = [],
				current_vel,
				animate,
				$inner_el = instance.settings.inner_el,
				speed = instance.settings.speed;

			var methods = {
				// Initialise Revealer
				init: function () {
					return initialise.apply(this, Array.prototype.slice.call(arguments));
				},
				reset: function () {
					return reset.apply(this, Array.prototype.slice.call(arguments));
				}
			};

			// Initialise Revealer
			function initialise(){
				// console.log('init scroller');

				var $children = $inner_el.children();

				$children.appendTo($inner_el);

				$this.hover(
					function(){
						startWatch();
					},
					function(){
						endWatch();
					});

				$this.addClass("scroller-init");
				$inner_el.css({"position" : "absolute"});
				// $clip_el.css({"position" : "absolute"});

				return this;
			}
			function get_container_width() {

				var actualWidth = $this.width(),
					windowWidth = $(window).width(),
					xOffset = $this.offset().left,
					maxWidth = windowWidth-xOffset;

				var returnVal = actualWidth;

				if(maxWidth < actualWidth) {
					return maxWidth;
				} else {
					return actualWidth;
				}
			}
			function get_right_limit() {

				var actualWidth = $inner_el.width(),
					returnVal = -(actualWidth - get_container_width());
				return returnVal;
			}
			function get_xPercent(mouseX) {

				var xOffset = $this.offset().left,
					elWidth = get_container_width(),
					rel_mouseX = mouseX - xOffset,
					xPercent = (Math.round(rel_mouseX/elWidth * 100)*2) - 100;

				return xPercent;
			}
			function getVelocity(xPercent) {

				var vel = xPercent/100 * speed;

				// if(get_xPercent(event.pageX) < -25) {
				// 	console.log("move left at " + vel);
				// } else if(get_xPercent(event.pageX) > 25) {
				// 	console.log("move right at " + vel);
				// } else {
				// 	return 0;
				// }
				return vel;
			}
			function scrollMe() {
				var currentLeft = parseInt($inner_el.css("left"));


				if(isNaN(currentLeft)) {
					currentLeft = 0;
				}

				var newLeft = currentLeft - current_vel;

				// console.log("newLeft: ", newLeft);

				if(newLeft > 0) {
					newLeft = 0;
				} else if(newLeft < get_right_limit()) {
					newLeft = get_right_limit();
				}
				$inner_el.css({
					"left" : newLeft
				});

			}
			function startWatch() {
				// console.log("startWatch ", get_container_width());
				$this.mousemove(function( event ) {

					current_vel = getVelocity(get_xPercent(event.pageX));


					// $( "#log" ).append( "<div>" + get_xPercent(event.pageX) + "%</div>" );
				});
				animate = setInterval(scrollMe, instance.settings.frameLength);
			}
			function endWatch() {
				// console.log("endWatch");
				$this.mousemove(null);
				clearInterval(animate);
				// $( "#log" ).append( "<div>STOPPED</div>" );
			}
			function reset(){


				if (typeof instance.settings.on_refresh === "function") {
					instance.settings.on_reset.call(this);
				}
				return this;
			}

			// Invoke called method or init
			if ( methods[options] ) {
				returnValue = methods[options].apply(this, Array.prototype.slice.call(args, 1));
				return returnValue;
			} else if (typeof options === 'object' || !options) {
				returnValue = methods.init.apply(this, arguments);
				return returnValue;
			} else {
				$.error('No ' + options + ' method found in jQuery.scroller');
			}

			// Return object instance or option value
			if (!returnValue) {
				returnValue = this;
			}

		});
		return returnValue;
	};
}( jQuery ));

