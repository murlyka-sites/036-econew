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
	let $f = $(this).find('.FieldSpinner-Field')
	let $up = $(this).find('.FieldSpinner-Button_Up')
	let $down = $(this).find('.FieldSpinner-Button_Down')
	let value = 0;
	let min = parseInt($f.attr('min'));
	let max = parseInt($f.attr('max'));

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
	let links = [];
	let navOffset = 0;
	let topicOffset = 0;
	let $links = $('.NavSticky-Link, .NavSticky-Button.Button_Theme_Green');
	let $button = $('.NavSticky-Button.Button_Theme_Green2');
	let minOffset = 0;
	let maxOffset = 0;
	let endOffset = 0;

	function init() {
		navOffset = $('.Topic-Sticky').offset().top;
		topicOffset = $('.Topic').offset().top;
		 // - ($('.ToOrder-Button').outerHeight() / 2);

		$links.each(function() {
			let link = {};
			let $s = $($(this).attr('href'));
			let linkOffset = navOffset - $(this).offset().top - ($(this).outerHeight() / 2);
			link.offset = $s.offset().top + linkOffset;
			link.$e = $(this);
			links.push(link);
		});

		let buttonOffset =  $button.offset().top - navOffset - ($button.outerHeight() / 2)
		minOffset = topicOffset;
		maxOffset = $('.ToOrder-Button').offset().top - ($('.ToOrder-Button').outerHeight() / 2) - buttonOffset 
		endOffset = maxOffset - topicOffset

		let linkOffset = $button.offset().top - navOffset  + ($button.outerHeight() / 2)
	}

	$(window).scroll(function() {
		init();
		let offset = window.pageYOffset

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
	// console.log(links);
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
		let index = $(this).index();
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
	let $slider = $(this).find('.SProjects-Slider');
	let $tab = $(this).find('.SProjects-Tab');
	let $current = $(this).find('.SProjects-Current');
	let $prev = $(this).find('.SProjects-Prev');
	let $next = $(this).find('.SProjects-Next');
	let $pagination = $(this).find('.SProjects-Pagination');

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

		let cat = $(this).data('cat');

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

	let src = $(this).data('src');
	$('.CalcRecAvailable-Pr').attr('src', src);
});