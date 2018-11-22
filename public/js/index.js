// settings popup
$.fancybox.defaults.touch = false;

$('form').submit(function() {
	$.fancybox.close();
	$.fancybox.open({src: '#Popupthks'})
});


$('.Field[type=tel]').inputmask('+7(999) 999-99-99');

$('.Foo-Title').click(function() {
	$(this).toggleClass('Foo-Title_Active')
	$(this).next().toggleClass('NavFoo_Open');
})

$('.TopicCollapse-Header').click(function() {
	$(this).toggleClass('TopicCollapse-Header_Open')
	$(this).next().toggleClass('TopicCollapse-Body_Open');
});

$('.TopicSliderMain-Title').click(function() {
	$(this).toggleClass('TopicSliderMain-Title_Open')
	$(this).next().toggleClass('TopicSliderMain-Desc_Open');
});


$('.FieldSpinner').each(function() {
	var $f = $(this).find('.FieldSpinner-Field')
	var $up = $(this).find('.FieldSpinner-Button_Up')
	var $down = $(this).find('.FieldSpinner-Button_Down')
	var value = 0;
	var min = parseInt($f.attr('min'));
	var max = parseInt($f.attr('max'));

	getValue();

	$f.change(getValue);

	$up.click(function() {
		if(!isMax() || max >= (value + 1)) {
			$f.val(++value)
		}
	});

	$down.click(function() {
		if(!isMin() || min <= (value - 1)) {
			$f.val(--value);
		}
	})


	function isMax() {
		return ($f.attr('max') && !isNaN(max));
	}

	function isMin() {
		return ($f.attr('min') && !isNaN(min));
	}

	function getValue() {
		value = parseInt($f.val(), 10);

		if(isNaN(value)) {
			value = 0;
		}
	}
});



// dropdown
$('.NavSticky-Choosen').click(function() {
	$(this).find('.NavSticky-Current').toggleClass('NavSticky-Current_Open');
	$(this).find('.NavSticky-List').toggleClass('NavSticky-List_Open');
})

$('.NavSticky-Choosen').blur(function() {
	$(this).find('.NavSticky-Current').removeClass('NavSticky-Current_Open');
	$(this).find('.NavSticky-List').toggleClass('NavSticky-List_Open');
});

// left sidebar
$('.NavSticky').each(function() {
	var links = [];
	var navOffset = 0;
	var topicOffset = 0;
	var $links = $('.NavSticky-Link, .NavSticky-Button.Button_Theme_Green2');
	var $button = $('.NavSticky-Button.Button_Theme_Green2');
	var minOffset = 0;
	var maxOffset = 0;
	var endOffset = 0;

	function init() {
		navOffset = $('.Topic-Sticky').offset().top;
		topicOffset = $('.Topic').offset().top;
		 // - ($('.ToOrder-Button').outerHeight() / 2);

		$links.each(function() {
			var link = {};
			var $s = $($(this).attr('href'));
			var linkOffset = navOffset - $(this).offset().top - ($(this).outerHeight() / 2);
			link.offset = $s.offset().top + linkOffset;
			link.$e = $(this);
			links.push(link);
		});

		var buttonOffset =  $button.offset().top - navOffset - ($button.outerHeight() / 2)
		minOffset = topicOffset;
		maxOffset = $('.ToOrder-Button').offset().top - ($('.ToOrder-Button').outerHeight() / 2) - buttonOffset 
		endOffset = maxOffset - topicOffset

		var linkOffset = $button.offset().top - navOffset  + ($button.outerHeight() / 2)
	}

	$(window).scroll(function() {
		init();
		var offset = window.pageYOffset

		if($(window).width() < 768) {
			return false;
		}

		if(offset < minOffset) {
			if($('.Topic-Sticky').css('position') != 'absolute' || $('.Topic-Sticky').css('top') != 0) {
				$('.Topic-Sticky').css('position', 'absolute');
				$('.Topic-Sticky').css('top', 0)
			}
		} else if(maxOffset > offset && offset >= minOffset) {
			if($('.Topic-Sticky').css('position') != 'fixed' || $('.Topic-Sticky').css('top') != 0) {
				$('.Topic-Sticky').css('position', 'fixed')
				$('.Topic-Sticky').css('top', 0)
			}			
		} else {
			if($('.Topic-Sticky').css('position') != 'absolute' || $('.Topic-Sticky').css('top') != endOffset) {
				$('.Topic-Sticky').css('position', 'absolute');
				$('.Topic-Sticky').css('top', endOffset);
			}
		}

		$.each(links, function(i, v) {

			if(v.offset <= offset) {
				$links.removeClass('active')
				v.$e.addClass('active')
			}
		})
	})

	$(window).resize(init)

	init();
});


// checkbox
$('.Checkbox-Gray').iCheck({
	checkboxClass: 'Checkbox Checkbox_Theme_Gray',
	checkedClass: 'Checkbox_Checked'
});


$('.Checkbox-White').iCheck({
	checkboxClass: 'Checkbox Checkbox_Theme_White',
	checkedClass: 'Checkbox_Checked'
});


// slider
$('.TopicSlider').each(function() {
	var main = new Swiper($(this).find('.TopicSliderMain'), {
    speed: 400,
    spaceBetween: 15,
    loop: true,
		navigation: {
			nextEl: '.TopicSliderMain-Next',
			prevEl: '.TopicSliderMain-Prev',
		}
	});

	main.on('slideChange', function(e) {
		toSlide(main.realIndex + 1);
	})



	var mySwiper = new Swiper($(this).find('.TopicSliderThumb'), {
    speed: 400,
    // loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    slidesPerColumn: 2,
		breakpoints: {
			576: {
				slidesPerView: 3
			},
			1200: {
				slidesPerView: 3
			}
		}


	});
	main.on('init', function() {
		alert()
		toSlide(main.realIndex + 1);
	})

	$('.TopicSliderThumb-Slide').click(function() {
		var index = $(this).index();
		main.slideTo(index + 1);
		// toSlide(index);
	});

	function toSlide(index) {
		$('.TopicSliderThumb-Slide_Active').removeClass('TopicSliderThumb-Slide_Active');
		$('.TopicSliderThumb-Slide:nth-child('+index+')').addClass('TopicSliderThumb-Slide_Active');
	}
})

$('.SProjects').each(function() {
	var swiper;
	var $slider = $(this).find('.SProjects-Slider');
	var $tab = $(this).find('.SProjects-Tab');
	var $current = $(this).find('.SProjects-Current');
	var $prev = $(this).find('.SProjects-Prev');
	var $next = $(this).find('.SProjects-Next');
	var $pagination = $(this).find('.SProjects-Pagination');

	$(this).find('.non-swiper-slide[data-cat=1]').addClass('swiper-slide').removeClass('non-swiper-slide');

	initSlider();

	$current.next().hide()

	$($tab).click(function() {
		swiper.destroy();
		$tab.removeClass('active');
		$(this).addClass('active')
		

		if($(window).width() < 1200) {
			$current.removeClass('open');
			$current.next().slideUp();
			$current.text($(this).text())
		}

		var cat = $(this).data('cat');

		$slider.find('.swiper-slide:not([data-cat='+cat+'])').removeClass('swiper-slide').addClass('non-swiper-slide');
		$slider.find('.non-swiper-slide[data-cat='+cat+']').addClass('swiper-slide').removeClass('non-swiper-slide');

		initSlider();
	});

	$current.click(function() {
		
		$(this).toggleClass('open')
		$(this).next().slideToggle()


	})

	function initSlider() {
		swiper = new Swiper($slider, {
			speed: 400,
			slidesPerView: 'auto',
			navigation: {
				nextEl: $next,
				prevEl: $prev
			},
			pagination: {
	    	el: $pagination,
	    	type: 'bullets',
	    	clickable: true
	    }
		});
	}
});

$('.CEdge-Title').click(function () {
	if($(this).hasClass('open')) {
		$('.CEdge-Title.open').next().slideUp();
		$('.CEdge-Title.open').removeClass('open');

		return
	}

	$('.CEdge-Title.open').next().slideUp();
	$('.CEdge-Title.open').removeClass('open');



	$(this).addClass('open');
	$(this).next().slideDown();
});

$('.SClient').each(function() {
	mySwiper = new Swiper($(this).find('.SClient-Slider'), {
    speed: 400,
    loop: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    pagination: {
    	el: $(this).find('.SClient-Pagination'),
    	type: 'bullets',
    	clickable: true
    }
	});
});

$('.Header-Toggle').click(function() {
	$('.Header-Toggle').next().addClass('d-none');

	$(this).next().removeClass('d-none')
});

$('[data-toggle=tooltip]').tooltip()

$('.CalcRecAvailable-Title').hover(function() {
	$('.CalcRecAvailable-Title').removeClass('active');
	$(this).addClass('active')

	var src = $(this).data('src');
	$('.CalcRecAvailable-Pr').attr('src', src);
});
$('.SMainProduct').each(function() {
	var $slider = $(this).find('.SMainProduct-Slider');
	var $pagination = $(this).find('.SMainProduct-Pagination');
	var $bullets = $(this).find('.CMainProductNav');
	var $prev = $(this).find('.SMainProduct-Prev');
	var $next = $(this).find('.SMainProduct-Next');

	swiper = new Swiper($slider, {
		speed: 400,
		spaceBetween: 30,
		loop: true,
		effect: 'fade',
		autoHeight: true,
		fadeEffect: {
			crossFade: true
		},
		pagination: {
			el: $pagination,
			renderBullet: function(index, className) {
				// return '<span class="' + className + '">' + (index + 1) + '</span>';
				console.log($($bullets[0]).html())
				return $('<div>').append($($bullets[index]).addClass(className)).html()
			},
			clickable: true,
			bulletClass: 'SMainProduct-Bullet',
			bulletActiveClass: 'active'
		},
		navigation: {
			nextEl: $next,
			prevEl: $prev
		}
	});

})
;// Мобильное меню
(function() {
	var $navMobile = $('.NavMobile');
	var $page = $('.Page');
	var $burger = $('.Nav-Burger');
	var $close = $('.NavMobile-Close');
	var $levels = $('.NavMobile-Container');
	var $level1 = $('.NavMobile-Level:nth-child(1)')
	var $level2 = $('.NavMobile-Level:nth-child(2)')
	var $level3 = $('.NavMobile-Level:nth-child(3)')
	var translate = 0;
	var $cur1, $cur2, $cur3;
	var isOpen = false;

	$burger.click(openLevel1);
	$close.click(closeMenu);
	$('.NavTop-Link').click(openLevel2);
	$('.NavTopSub-Link').click(openLevel3)

	$level2.find('.NavMobile-Back').click(closeLevel2);
	$level3.find('.NavMobile-Back').click(closeLevel3);

	init();

	$(window).resize(init);
	var touchStart = 0;
	var touchOffset = 0;
	var lastTouch;

	$levels.on('touchstart', function(e) {
		touchStart =  e.changedTouches[0].pageX
		lastTouch = e.changedTouches[0];
	})

	$levels.on('touchmove', function(e) {
		touchOffset = (e.changedTouches[0].pageX - touchStart) / ($(window).width() / 100)
		// var  x = Math.abs(lastTouch.pageX - e.changedTouches[0].pageX);
		// var y = Math.abs(lastTouch.pageY - e.changedTouches[0].pageY);
		// console.log(x, y)
		// if(y > x) {
		// 	return 
		// }
		if(touchOffset < 0 || translate >= 0) {
			return 
		}



		

		$(this).css('transition', 'none')
		$(this).css('transform', 'translateX('+ (touchOffset + translate) + '%)')
		
	})

	$levels.on('touchend', function() {
		$(this).css('transition', '')
		$(this).css('transform', '')

		if(touchOffset > 10) {
			if(translate == -100) {
				closeLevel2();
			} else if( translate == -200) {
				closeLevel3()
			}
		}
	})

	function openLevel1() {
		$navMobile.slideToggle();
		
		$burger.toggleClass('active');
		scrollLock(true)

		if($cur1) {
			$cur1.remove();
		}
		$cur1 = $('.NavTop').clone(true);
		$level1.append($cur1);
	}

	function openLevel2() {
		if(isOpen && $(this).hasClass('active')) {
			closeMenu();
			$(this).removeClass('active')
			return false
		} else {
			openMenu();
		}
		


		var $open = $(this).next().find('.NavTopSub');

		$('.NavTop-Link.active').removeClass('active');
		$(this).addClass('active');

		if($cur2) {
			$cur2.remove();
		}
		if($cur3) {
			$cur3.remove();	
		}
		$cur2 = $open.clone(true);

		$level2.append($cur2);

		$levels.addClass('NavMobile-Container_Level2');
		translate = -100
	}

	function openLevel3() {
		var $open = $(this).next().find('.NavTopSubContent');

		if($cur3) {
			$cur3.remove();
		}

		$('.NavTopSub-Link_Active').removeClass('NavTopSub-Link_Active');
		$(this).addClass('NavTopSub-Link_Active');

		$cur3 = $open.clone(true);

		$level3.append($cur3);

		$levels.addClass('NavMobile-Container_Level3');
		translate = - 200
	}

	function closeLevel2() {
		$levels.removeClass('NavMobile-Container_Level2');
		translate = 0
		$('.NavTop-Link.active').removeClass('active');
	}

	function closeLevel3() {
		$levels.removeClass('NavMobile-Container_Level3');
		translate = -100
		$('.NavTopSub-Link_Active').removeClass('NavTopSub-Link_Active');
	}

	function openMenu() {
		isOpen = true;
		$navMobile.slideDown();
		scrollLock(true);
		console.log($burger)
	}

	function closeMenu() {
		isOpen = false
		$navMobile.slideUp();
		scrollLock(false);
		$burger.removeClass('active');

	}

	function init() {
		var offset = $('.Nav').outerHeight() + $('.Header').outerHeight();

		$navMobile.css('padding-top', offset);
	}

	function scrollLock(lock) {
		if(lock) {
			$('.Page').addClass('Page_Lock');
		} else {
			$('.Page').removeClass('Page_Lock');
		}
	}
})();