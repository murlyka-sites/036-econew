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

	$levels.on('touchstart', function(e) {
		touchStart =  e.changedTouches[0].pageX
	})

	$levels.on('touchmove', function(e) {
		touchOffset = (e.changedTouches[0].pageX - touchStart) / ($(window).width() / 100)
		console.log(touchOffset, translate)
		if(touchOffset < 0 || translate >= 0) {
			return false
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
		if(isOpen && $(this).hasClass('NavTop-Link_Active')) {
			closeMenu();
			$(this).removeClass('NavTop-Link_Active')
			return false
		} else {
			openMenu();
		}
		


		var $open = $(this).next().find('.NavTopSub');

		$('.NavTop-Link_Active').removeClass('NavTop-Link_Active');
		$(this).addClass('NavTop-Link_Active');

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
		$('.NavTop-Link_Active').removeClass('NavTop-Link_Active');
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
			$('html, body').css('overflow', 'hidden');
		} else {
			$('html, body').css('overflow', 'auto')
		}
	}
})();