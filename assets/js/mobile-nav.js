;// Мобильное меню
(function() {
	let $navMobile = $('.NavMobile');
	let $page = $('.Page');
	let $burger = $('.Nav-Burger');
	let $close = $('.NavMobile-Close');
	let $levels = $('.NavMobile-Container');
	let $level1 = $('.NavMobile-Level:nth-child(1)')
	let $level2 = $('.NavMobile-Level:nth-child(2)')
	let $level3 = $('.NavMobile-Level:nth-child(3)')
	let translate = 0;
	let $cur1, $cur2, $cur3;
	let isOpen = false;

	$burger.click(openLevel1);
	$close.click(closeMenu);
	$('.NavTop-Link').click(openLevel2);
	$('.NavTopSub-Link').click(openLevel3)

	$level2.find('.NavMobile-Back').click(closeLevel2);
	$level3.find('.NavMobile-Back').click(closeLevel3);

	init();

	$(window).resize(init);
	let touchStart = 0;
	let touchOffset = 0;

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
		


		let $open = $(this).next().find('.NavTopSub');

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
		let $open = $(this).next().find('.NavTopSubContent');

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
		let offset = $('.Nav').outerHeight() + $('.Header').outerHeight();

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