!function ($) {
	$.fn.multiItemCarousel = function() {
		var pc = ".pl-carousel";
		var mS = ".m-single";
		var mSBoxShadow = ".m-boxShadow";
		var mc = ".m-carousel";
		var mcInner = ".m-carousel-inner";
		var mcH = ".m-carousel-horizontal";
		var mcV = ".m-carousel-vertical";
		var mcS = ".m-carousel-single";
		var mcT = ".m-carousel-thumbnail";
		var mcSL = ".m-carousel-slide";
		var mcC = ".m-carousel-column";
		var mcItem = ".m-item";
		var mcPagination = ".m-carousel-pagination";
		var mcItemActive = ".m-item.m-active";
		
		initSimpleCarousel();
		
		window.onload = function(e){
		 	initCalculatedCarousel();
		}
		
		function initSimpleCarousel(){
			// Horizontal Carousel
			if ($(pc).find(mcH).length > 0) {
				var width = window.innerWidth;
				var step = Number($(pc).find(mcH).attr("step"));
				if(Number.isNaN(step)) {
					step = 1;
				}
				$(pc).find(mcH).mcarousel("", {rotation:0, step:step});
			}
			
			// Thumbnail Carousel
			if ($(pc).find(mcT).length > 0) {
				var width = window.innerWidth;
				$(pc).find(mcT).mcarousel("", {rotation:0, step:1});
			}
			
			// Slide Carousel
			if ($(pc).find(mcSL).length > 0) {
				var width = window.innerWidth;
				$(pc).find(mcSL).mcarousel("", {rotation:0, step:1});
			}
			
			// Column Carousel
			if ($(pc).find(mcC).length > 0) {
				var width = window.innerWidth;
				var step = Number($(pc).find(mcC).attr("step"));
				if(Number.isNaN(step)) {
					step = 1;
				}
				$(pc).find(mcC).mcarousel("", {rotation:0, step:step});
			}
		}		
		
		function initCalculatedCarousel(){
			// Single Carousel		
			if ($(mS).find(mcS).length > 0) {
				var width = window.innerWidth;
				$(mS).find(mcS).mcarousel("", {rotation:0, step:1}).on("afterSlide", function (e, previousSlide, nextSlide) {
					var innerHeight = $(mS).find(mcItemActive).height();
					$(mS).find(mSBoxShadow).css("height",innerHeight + "px");
					$(mS).find(mcInner).css("height",innerHeight + "px");
				});
				var innerHeight = $(mS).find(mcItemActive).height();
				$(mS).find(mSBoxShadow).css("height",innerHeight + "px");
				$(mS).find(mcInner).css("height",innerHeight + "px");				
			}	
			
			// Vertical Carousel	
			if ($(pc).find(mcV).length > 0) {
				var width = window.innerWidth;
				var step = Number($(pc).find(mcV).attr("step"));
				if(Number.isNaN(step)) {
					step = 1;
				}
				setVerticalCarouselHeight($(pc).find(mcV),step);
				setTimeout(function(){
					$(pc).find(mcV).mcarousel("", {rotation:0, step:step, direction: 'vertical'});
					//var mpTop = $(pc).find(mcV).find(mcPagination).outerHeight()/2;
					//$(pc).find(mcV).find(mcPagination).css("margin-top", "-" + mpTop + "px");
				},10);	
			}
			
		}
		
		function setVerticalCarouselHeight(container, step){
			var item = container.find(mcItem);
			var length = item.length;
			var height = item.outerHeight();
			var containerHeight = height * step + 30;
			container.css("height", containerHeight + "px");	
		}
		
		$(window).resize(function() {
			var width = window.innerWidth;		
			if ($(pc).find(mcV).length > 0) {
				setVerticalCarouselHeight($(this).parent().find(mcV), 3);
			}	
		});
	    	
	}
}(window.jQuery); 

$(function(){
	if ($(".pl-carousel .m-carousel").length > 0) {
		$.fn.multiItemCarousel();	 
	}
});


