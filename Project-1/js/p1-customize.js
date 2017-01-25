function setSameElementHeight(e) {
	var tallest = 0;
	$(e).each(function() {
		$(this).css('height', 'auto');
		// reset height in case an empty div has been populated
		if ($(this).height() > tallest) {
			tallest = $(this).height();
		}
	});
	$(e).height(tallest);
}


function resetElementHeight(e) {
	$(e).each(function() {
		$(this).css('height', 'auto');
	});
}

function winResize(){
	$( window ).resize(function() {
		set_imageContainers();
	});
}


/**Main Scripts**/
function InitHeroSlider(container) {
	$(container).find("li").each(function() {
		var index = $(container).find("li").index(this);
		var b_image = "../dist/images/herostory_" + (index + 1) + ".jpg";
		$(this).css("background-image", "url(" + b_image + ")");
	});
}

function initHomeCarousel(container) {
	InitHeroSlider(container);
	$(container).unslider({
		speed : 500, //  The speed to animate each slide (in milliseconds)
		delay : 3000, //  The delay between slide animations (in milliseconds)
		complete : function() {
		}, //  A function that gets called after every slide animation
		keys : true, //  Enable keyboard (left, right) arrow shortcuts
		dots : true, //  Display dot navigation
		fluid : false //  Support responsive design. May break non-responsive designs
	});
}

$(function() {
	if($(".banner").length > 0){
		initHomeCarousel(".banner");
	}
	if($("#bb-bookblock-vertical").length > 0){
		initBookBlock('#bb-bookblock-vertical');
	}
	if($("#bb-bookblock-horizontal").length > 0){
		initBookBlock('#bb-bookblock-horizontal'); 
	}

});

function initBookBlock(container) {
	var config = {
		$bookBlock : $(container),
		$navNext : $(".bb-nav-next[data-target='" + container + "']"),
		$navPrev : $(".bb-nav-prev[data-target='" + container + "']"),
		$navFirst : $(".bb-nav-first[data-target='" + container + "']"),
		$navLast : $(".bb-nav-last[data-target='" + container + "']")
	}
	config.$bookBlock.bookblock({
		speed : 800,
		shadowSides : 0.8,
		shadowFlip : 0.7,
		orientation : config.$bookBlock.attr("data-orientation")
	});
	initBookEvents(config);
}

function initBookEvents(config) {
	var $slides = config.$bookBlock.children();
	// add navigation events
	config.$navNext.on('click touchstart', function() {
		config.$bookBlock.bookblock('next');
		return false;
	});

	config.$navPrev.on('click touchstart', function() {
		config.$bookBlock.bookblock('prev');
		return false;
	});

	config.$navFirst.on('click touchstart', function() {
		config.$bookBlock.bookblock('first');
		return false;
	});

	config.$navLast.on('click touchstart', function() {
		config.$bookBlock.bookblock('last');
		return false;
	});

	// add swipe events
	$slides.on({
		'swipeleft' : function(event) {
			config.$bookBlock.bookblock('next');
			return false;
		},
		'swiperight' : function(event) {
			config.$bookBlock.bookblock('prev');
			return false;
		}
	});

	// add keyboard events
	$(document).keydown(function(e) {
		var keyCode = e.keyCode || e.which, arrow = {
			left : 37,
			up : 38,
			right : 39,
			down : 40
		};

		switch (keyCode) {
		case arrow.left:
			config.$bookBlock.bookblock('prev');
			break;
		case arrow.right:
			config.$bookBlock.bookblock('next');
			break;
		}
	});
}

$(function() {
	var current = 0;
	var delay = 5000;
	var timer = setInterval(autoSlider, delay);
	var ttimer = 0;
	var mstep = 5;

	function activateSlider(index) {
		var slider = $(".ms-carousel-gallery").find(".m-carousel-sliders");
		var gallary = $(".ms-carousel-gallery").find(".m-carousel-gallery");
		slider.find(".m-item").not(slider.find(".m-item").eq(index)).removeClass("active");
		slider.find(".m-item").eq(index).addClass("active");

		gallary.find(".m-cg-item").not(gallary.find(".m-cg-item").eq(index)).removeClass("active");
		gallary.find(".m-cg-item").eq(index).addClass("active");
	}

	function autoSlider() {
		current++;
		var length = $(".m-carousel-sliders").find(".m-item").length;
		var pager = Math.ceil(length / mstep);
		var cPager = Math.ceil(current / mstep);
		if (current <= length - 1) {
			activateSlider(current);
		} else {
			current = 0;
		}
	}

	if ($(".ms-carousel-gallery .m-carousel-sliders").length > 0) {
		$(".ms-carousel-gallery .m-carousel-sliders").mcarousel("", {
			step : mstep,
			autoPlay : true,
			circulation : true,
			correlation : true,
			crotation : delay,
			dragable : false
		}).on("beforeSlide", function(e, previousSlide, nextSlide) {
			clearTimeout(timer);
		}).on("afterSlide", function(e, previousSlide, nextSlide) {
			var nextIndex = (nextSlide - 1) * 5;
			current = nextIndex;
			activateSlider(current);
			if (!$(".ms-carousel-gallery .m-carousel-sliders").hasClass("paused")) {
				timer = setInterval(autoSlider, delay);
			}
		});
		$(".ms-carousel-gallery .m-carousel-sliders .m-item").on("mouseover", function() {
			clearTimeout(timer);
			current = $(this).index();
			ttimer = setTimeout(activateSlider, 200, current);
		});
		$(".ms-carousel-gallery .m-carousel-sliders .m-item").on("mouseout", function() {
			clearTimeout(ttimer);
			if (!$(".ms-carousel-gallery .m-carousel-sliders").hasClass("paused")) {
				timer = setInterval(autoSlider, delay);
			}
		});
		$(".ms-carousel-gallery .m-carousel-gallery .m-cg-item").on("mouseover", function() {
			clearTimeout(timer);
		});
		$(".ms-carousel-gallery .m-carousel-gallery .m-cg-item").on("mouseout", function() {
			if (!$(".ms-carousel-gallery .m-carousel-sliders").hasClass("paused")) {
				timer = setInterval(autoSlider, delay);
			}
		});
		$(".ms-carousel-gallery .m-carousel-controller").on("click", "[data-slide='pause']", function() {
			clearTimeout(timer);
		});
		$(".ms-carousel-gallery .m-carousel-controller").on("click", "[data-slide='play']", function() {
			timer = setInterval(autoSlider, delay);
		});
	}
});

/*Swiper*/
$(function(){
 	InitSwiperEvent();
});

function InitSwiperEvent() { 
	if ($(".swiper-container").length > 0) {
		var mySwiper_process1 = new Swiper('.article-process .swiper-container.swiper-1', {
			progress : true,
			onProgressChange : function(swiper) {
				for (var i = 0; i < swiper.slides.length; i++) {
					var slide = swiper.slides[i];
					var progress = slide.progress;
					swiper.setTransform(slide, 'translate3d(0px,0,' + (-Math.abs(progress * 1500)) + 'px)');
				}
			},
			onTouchStart : function(swiper) {
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.setTransition(swiper.slides[i], 0);
				}
			},
			onSetWrapperTransition : function(swiper) { 
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.setTransition(swiper.slides[i], swiper.params.speed);
				}
			}
		})

		var mySwiper_process2 = new Swiper('.article-process .swiper-container.swiper-2', {
			progress : true,
			onProgressChange : function(swiper) {
				for (var i = 0; i < swiper.slides.length; i++) {
					var slide = swiper.slides[i];
					var progress = slide.progress;
					var scale, translate, opacity;
					if (progress <= 0) {
						opacity = 1 - Math.min(Math.abs(progress), 1);
						scale = 1 - Math.min(Math.abs(progress / 2), 1);
						translate = progress * swiper.width;
					} else {
						opacity = 1 - Math.min(Math.abs(progress / 2), 1);
						scale = 1;
						translate = 0;
					}
					slide.style.opacity = opacity;
					swiper.setTransform(slide, 'translate3d(' + (translate) + 'px,0,0) scale(' + scale + ')');
				}
			},
			onTouchStart : function(swiper) {
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.setTransition(swiper.slides[i], 0);
				}
			},
			onSetWrapperTransition : function(swiper) {
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.setTransition(swiper.slides[i], swiper.params.speed);
				}
			}
		})
		// Set Z-Indexes
		for (var i = 0; i < mySwiper_process2.slides.length; i++) {
			mySwiper_process2.slides[i].style.zIndex = mySwiper_process2.slides.length - i;
		}

		var mySwiper_process3 = new Swiper('.article-process .swiper-container.swiper-3', {
			progress : true,
			onProgressChange : function(swiper) {
				for (var i = 0; i < swiper.slides.length; i++) {
					var slide = swiper.slides[i];
					var progress = slide.progress;
					var rotate = -90 * progress;
					if (rotate < -90)
						rotate = -90;
					if (rotate > 90)
						rotate = 90;
					var translate = progress * swiper.width / 2;
					var opacity = 1 - Math.min(Math.abs(progress), 1);
					slide.style.opacity = opacity;
					swiper.setTransform(slide, 'rotateY(' + rotate + 'deg) translate3d(' + translate + 'px,0,0)');
				}
			},
			onTouchStart : function(swiper) {
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.setTransition(swiper.slides[i], 0);
				}
			},
			onSetWrapperTransition : function(swiper) {
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.setTransition(swiper.slides[i], swiper.params.speed);
				}
			}
		});

		var mySwiper_smooth1 = new Swiper('.article-smooth .swiper-container.swiper-1', {
			speed : 1000,
			progress : true,
			onProgressChange : function(swiper) {
				for (var i = 0; i < swiper.slides.length; i++) {
					var slide = swiper.slides[i];
					var progress = slide.progress;
					var translate = progress * swiper.width;
					var characters = slide.querySelectorAll('span');
					for (var j = 0; j < characters.length; j++) {
						var charScale = progress * 1500 * (characters.length - j) / characters.length;
						var charOpacity = 1 - Math.min(Math.abs(progress), 1);
						swiper.setTransform(characters[j], 'translate3d(0,0,' + (charScale) + 'px)');
						characters[j].style.opacity = charOpacity;
					}
					swiper.setTransform(slide, 'translate3d(' + translate + 'px,0,0)');
				}
			},
			onTouchStart : function(swiper) {
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.setTransition(swiper.slides[i], 0);
					var characters = swiper.slides[i].querySelectorAll('span');
					for (var j = 0; j < characters.length; j++) {
						swiper.setTransition(characters[j], 0);
					}
				}

			},
			onSetWrapperTransition : function(swiper) {
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.setTransition(swiper.slides[i], swiper.params.speed);
					var characters = swiper.slides[i].querySelectorAll('span');
					for (var j = 0; j < characters.length; j++) {
						swiper.setTransition(characters[j], swiper.params.speed);
					}
				}

			}
		});
	}
}


$(function() {
	if($(".extra").length > 0) {
		InitScrollEvent();
		loadImages($("#gallery-display-wrap"), "images-loaded", "image-loaded");
		initCarouselImagesLoad();
		InitJQZoomEvent(); 
		winResize();
	}
	
})
function InitScrollEvent() {
	var event = "top";
	var dataPos = "data-";
	var dataStart = "0%";
	var dataEnd = "100%";
	var dataDis = "-100%";
	var scrollDir = 2000;
	var scrollSum = 0;
	var flag = 0;
	var z_index = "z-index:10";
	var a_count = $(".scroll-article").length;
	$(".scroll-article").each(function() {
		var index = $(".scroll-article").index(this);
		var scroll = $(this);
		event = scroll.attr("data-event");
		if (scroll.attr("data-id") == "0") {
			var st_attrKey = "data-start";
			var st_attrValue = event + ":" + dataStart;
			scroll.attr(st_attrKey, st_attrValue);

			scrollSum += scrollDir;
			flag = scrollSum;
			var st_attrKey = "data-" + scrollSum;
			var st_attrValue = "";
			scroll.attr(st_attrKey, st_attrValue);

			scrollSum += 1;
			var st_attrKey = "data-" + scrollSum;
			var st_attrValue = event + ":" + dataDis;
			scroll.attr(st_attrKey, st_attrValue);

		} else {
			var st_attrKey = "data-0";
			var st_attrValue = event + ":" + (100 * (index + 1)) + "%";
			scroll.attr(st_attrKey, st_attrValue);

			scrollSum = flag;
			flag = scrollSum;
			var st_attrKey = "data-" + (scrollSum);
			var st_attrValue = event + ":" + dataStart;
			scroll.attr(st_attrKey, st_attrValue);

			scrollSum += scrollDir;
			flag = scrollSum;
			var st_attrKey = "data-" + scrollSum;
			var st_attrValue = "";
			scroll.attr(st_attrKey, st_attrValue);

			scrollSum += 1;
			var st_attrKey = "data-" + scrollSum;
			var st_attrValue = event + ":" + dataDis;

			if (index < a_count - 1) {
				scroll.attr(st_attrKey, st_attrValue);
			}
		}

	});

	var s = skrollr.init();
}

//Product Images Loading

function set_ImageContainerSize($img) {
	var $img_wrap = $img.closest(".image-wrap"),
		setBy = $img_wrap.data("set-by");
		$img_row = $img_wrap.parents(".gallery-display-items-group");
		$img_row_items_count = $img_row.find(".gallery-display-item-wrap").length;

	if(setBy === "height") {
		var wrap_h = $img_wrap.height();
		$img.height(wrap_h);
		$img.width("auto");
		$img.width($img.width());
		$img_wrap.width($img.width());

	} else {

		var wrap_w = $img_wrap.width();

		$img.width(wrap_h);
		$img.height("auto");
		$img.height($img.width());
		$img_wrap.height($img.height());
	}
	
}

function set_imageContainers() {
	$(".img-shim").each(function(){
		set_ImageContainerSize($(this));
	});
}

function set_BackgroundImage($img) {
	var $img_wrap = $img.closest(".image-wrap");
	if($img_wrap.length) {
		$img_wrap.css({
			"background-image" : "url('" + $img.attr("src") + "')"
		});
		$img_wrap.addClass("has-bg-img");
		$img.remove();
	}
}

function processImage($img) {
	if($img.hasClass("img-bgr-loader")) {
		set_BackgroundImage($img);
	}
	if($img.hasClass("img-shim")) {
		set_ImageContainerSize($img);
	}
}

function loadImages($el, containerClass, imgClass) {
	var $imgs = $el.find(".dyn-img"),
		nImgs = $imgs.length;

	$el.data("images_loaded", 0);

	$imgs.each(function(){

		var $img = $(this),
			$mem_img = $("<img/>"),
			src = $img.data("src"),
			img_width,
			img_height;

		$mem_img.load(function(){
			img_width = this.width;
			img_height = this.height;
			$img.attr("data-width", img_width);
			$img.attr("data-height", img_height);
		});

		$img.load(function(){
			var current_images_loaded = $el.data("images_loaded"),
				updated_images_loaded = current_images_loaded + 1;

			$img.addClass(imgClass);

			$el.data("images_loaded", updated_images_loaded);


			if(updated_images_loaded === nImgs) {
				$el.addClass(containerClass);
			}
			processImage($img);
		});
		$mem_img.attr("src", src);
		$img.attr("src", src);

	});

}

function img_placers() {
	$(".img-placer").each(function(){
		var $btn = $(this),
			$target = $($btn.data("target")),
			src = $btn.data("img-src"),
			caption = $btn.data("caption");

		$btn.hover(
			function(){
				var $mem_img = $("<img/>");

				$mem_img.load(function(){
					// //console.log("bg image loaded");
					$btn.addClass("img-placer-loaded");
					if($btn.hasClass("hover")) {
						// //console.log("bg image showing");
						$target.removeClass("loading");
						$target.addClass("active");
						$target.css({
							"background-image" : "url('" + src + "')"
						});
					}
				});

				$btn.addClass("hover");

				update_the_caption(caption);
				lock_the_caption();

				if($btn.hasClass("img-placer-loaded")) {
					$target.addClass("active");
					$target.css({
						"background-image" : "url('" + src + "')"
					});
				} else {
					$target.css({
						"background-image" : "none"
					});
					$target.addClass("loading");
					// $mem_img.data("btn_src", $btn);
					$mem_img.attr("src", src);
				}

			},
			function(){
				restore_the_caption();
				$btn.removeClass("hover");
				$target.removeClass("active");
			}
		);
	});
}
function initCarouselImagesLoad(){	
	$(".scroller").scroller();
	$(".carousel-custom").each(function(){
		$(this).find(".item").hide();
		gotoNextSlide($(this));
		setInterval(gotoNextSlide, $(this).data("interval"), $(this));
	});
}

function gotoNextSlide($el) {
	var $curr = $el.find(".active"),
		$next = $curr.next();

	if(!$next.length) {
		$next = $el.find(".item:first-child");
	}

	var new_caption = $next.data("caption");

	$curr.removeClass("active");

	store_the_caption(new_caption);
	update_the_caption(new_caption);

	$next.addClass("active").fadeIn("slow",function(){
		$curr.fadeOut(50);
	});
}

function gotoPrevSlide($el) {
	var $curr = $el.find(".active"),
		$prev = $curr.prev();

	if(!$prev.length) {
		$prev = $el.find(".item:last-child");
	}

	var new_caption = $prev.data("caption");

	$curr.removeClass("active");

	store_the_caption(new_caption);
	update_the_caption(new_caption);

	$prev.addClass("active").fadeIn("slow",function(){
		$curr.fadeOut(50);
	});
}
function lock_the_caption(lock){

	var $caption = $("#the-caption");

	if(lock !== false) {
		$caption.addClass("locked");
	} else {
		$caption.removeClass("locked");
	}

}
function store_the_caption(str){
	var $caption = $("#the-caption");
	$caption.data("restore_str", str);
}
function restore_the_caption(){
	var $caption = $("#the-caption"),
		restore_str = $caption.data("restore_str")

	lock_the_caption(false);
	$caption.find("#caption-text").text(restore_str);

}
function update_the_caption(str, force){
	var $caption = $("#the-caption");

	if(typeof force === true) {
		lock_the_caption(false);
	}

	if(!$caption.hasClass("locked")) {
		$caption.find("#caption-text").text(str);
	} else {
		return false;
	}
};

function InitJQZoomEvent() {
    $('.jqzoom').jqzoom({
        zoomType: 'standard',
        lens: true,
        preloadImages: false,
        alwaysOn: false
    });

    $("#zoomType").change(function () {
        var value = $(this).val();
        switch (value) {
            case "0":
                $('.jqzoom').jqzoom({
                    zoomType: 'standard',
                    lens: true,
                    preloadImages: false,
                    alwaysOn: false
                });
                break;
            case "1":
                $('.jqzoom').jqzoom({
                    zoomType: 'drag',
                    lens: true,
                    preloadImages: false
                });
                break;
            case "2":
                $('.jqzoom').jqzoom({
                    zoomType: 'standard',
                    lens: true,
                    preloadImages: false,
                    alwaysOn: true
                });
                break;
            case "3":
                $('.jqzoom').jqzoom({
                    zoomType: 'innerzoom',
                    preloadImages: false,
                    alwaysOn: false
                });
                break;
            case "4":
                $('.jqzoom').jqzoom({
                    zoomType: 'standard',
                    lens: true,
                    preloadImages: false,
                    alwaysOn: false,
                    zoomWidth: 200,
                    zoomHeight: 200,
                    xOffset: 90,
                    yOffset: 30,
                    position: 'left'
                });
                break;
            case "5":
                $('.jqzoom').jqzoom({
                    zoomType: 'reverse',
                    lens: true,
                    preloadImages: false,
                    alwaysOn: false
                });
                break;

        }
    });
}

$(function(){
	if($(".my-container").length > 0) {
		InitWidget();
		BindNewWidget();
	}
	
	autoTextarea();
});

var i = Number(localStorage.getItem('new-counter')) + 1, 
blockList, 
blockArray = [],
headerBtn = "<span class='header-btn'><i class='fa fa-edit'></i><i class='fa fa-save'></i><i class='fa fa-eye-slash'></i><i class='fa fa-remove'></i></span>";


function autoTextarea() {
	$("body").on("keyup", "textarea", function() {
		$(this).css("height", "auto");
		$(this).css("height", (this.scrollHeight + (this.offsetHeight - this.clientHeight)) + "px"); 
	});
}

function InitWidget(){
    blockList = localStorage.getItem('allBlocks');
    
    blockArray = blockList ? blockList.split(',') : [];
    
    for( j = 0, k = blockArray.length; j < k; j++) {
    	if(localStorage.getItem(blockArray[j])!= null){
			var template = "<div class='panel panel-red' id='"+ blockArray[j] +"'>" 
			+ "<div class='panel-heading'><h3 class='panel-title'>" + blockArray[j] + "</h3>" + headerBtn + "</div>" 
			+ "<div class='panel-body new-widget editable'>" 
			+"<div class='auto-container'>"
			+localStorage.getItem(blockArray[j]) 
			+"</div></div></div>";	
			$(template).appendTo($('.my-blocks'));
		}
    }
}

function BindNewWidget() {
	$('.widget-add').on('click', '.fa-plus.active', function(e) {
		e.preventDefault();
		var template = "<div class='panel panel-red' id='newBlock-"+ i +"'>" 
		+ "<div class='panel-heading'><h3 class='panel-title'>newBlock-" + i + "</h3>" + headerBtn + "</div>" 
		+ "<div class='panel-body new-widget editable'>" 
		+ "</div></div>";
		$(template).appendTo($('.my-blocks'));
		$(this).removeClass('active');
	});

	$('.widget-add').on('click', '.fa-trash', function(e) {
		e.preventDefault();
		$(".new-widget").parents(".panel").remove();
		localStorage.clear();
		i = 1;
		$('.widget-add').find('.fa-plus').addClass('active');
	});

	$('.my-container').on('click', '.fa-edit', function() {
		var $editable = $(this).parents('.panel').find('.editable');
		$editable.fadeIn();
		var editableHtml = $editable.find('.auto-container').html();
		$editable.empty();
		var editableTemplate = "<textarea class='form-control' rows='1' placeholder='Insert your html here'></textarea>";
		$(editableTemplate).appendTo($editable);
		$editable.find('textarea').val(editableHtml);
		$(this).parent().find('.fa-save').addClass("active");
	});

	$('.my-container').on('click', '.fa-save.active', function() {
		var $block = $(this).parents('.panel');
		var $editable = $block.find('.editable');
		$editable.fadeIn();
		var editableHtml = $editable.find('textarea').val();
		$("<div class='auto-container'>" + editableHtml + "</div>").appendTo($editable);
		$editable.find('textarea').remove();
		$(this).removeClass("active");	
		if(localStorage.getItem($block.attr('id')) == null){
			$.pubsub.publish('/add/', []);
		}
		else {
			localStorage.setItem($block.attr('id'), $('#' + $block.attr('id')).find('.auto-container').html());
		}
		$('.widget-add').find('.fa-plus').addClass('active');

	});

	$('.my-container').on('click', '.fa-remove', function(e) {
		var $block = $(this).parents('.panel');
		e.preventDefault();
		$.pubsub.publish('/remove/', [$block]);
	});
	$('.my-container').on('click', '.fa-eye-slash', function(e) {
		var $editable = $(this).parents('.panel').find('.editable');
		e.preventDefault();
		$(this).addClass('fa-eye').removeClass('fa-eye-slash');
		$editable.fadeOut();
	});
	$('.my-container').on('click', '.fa-eye', function(e) {
		var $editable = $(this).parents('.panel').find('.editable');
		e.preventDefault();
		$(this).addClass('fa-eye-slash').removeClass('fa-eye');
		$editable.fadeIn();
	});

	$.pubsub.subscribe('/add/', function() {
		// Take the value of the input field and save it to localStorage
		localStorage.setItem("newBlock-" + i, $("#newBlock-" + i).find(".auto-container").html());
		// Set the to-do max counter so on page refresh it keeps going up instead of reset
		localStorage.setItem('new-counter', i);
		blockList = localStorage.getItem('allBlocks');
		if (blockList == "" || blockList == null) {
			localStorage.setItem('allBlocks', "newBlock-" + i);
		} else {
			localStorage.setItem('allBlocks', blockList + "," + ("newBlock-" + i));
		}

		$.pubsub.publish('/regenerate-list/', []);

		i++;
	});

	$.pubsub.subscribe('/regenerate-list/', function() {
		//default action
	});

	$.pubsub.subscribe('/remove/', function(e, $item) {
		var $this = $item[0];
		var parentId = $this.attr('id');
		// Remove todo list from localStorage based on the id of the clicked parent element
		localStorage.removeItem(parentId);
		// Fade out the list item then remove from DOM
		$this.fadeOut(function() {
			$this.remove();
			$.pubsub.publish('/regenerate-list/', []);
		});
	});
}
