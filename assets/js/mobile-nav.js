;// Мобильное меню
class MobileMenu {
	constructor(opts) {
		let that = this;
		this.hasOpen = false;
		this.$nav = $(opts.nav);
		this.$burger = $(opts.burger);
		this.$page = $(opts.page);
		this.$container = $(opts.container);
		this.$close = $(opts.close);
		this.levels = [];
		this.level = 0;
		this._createMenuOptions = opts.createMenuOptions;

		this.$burger.click(()=>{
			this.toggleMenu(!this.hasOpen);
		});

		this.$close.click(()=>{
			this.close()
		})

		this._createLevel($(this._createMenuOptions[0].menu));

		this._move()
		this._init()

		$(window).resize(() => {
			this._init()
		})

		window.matchMedia("(max-width: 991px)").addListener((x) => {
			if(!x.matches) {
				if(this.level == 0) {
					this.close();
				}
			}
		})

		this.$page.on('touchmove', function() {
			// alert(that.hasOpen)
			if(that.HasOpen) {

				event.preventDefault();
				event.stopPropagation()
			}
		})
	}

	toggleMenu(open) {
		if(this.hasOpen) {
			this.close()
		} else {
			this.open()
		}
	}

	open() {
		this.hasOpen = true;

		// change burger
		this.$burger.addClass('active')

		//show menu
		this.$nav.css('transform', 'translateY(0)')

		// lock scroll
		scrollLock.hide()
		$('.Header, .Nav').css('margin-right', '-' + scrollLock.getWidth() + 'px')
		$('html, body').css('height', '100%')
		/*
		this.$page.css('overflow', 'hidden');
		$('html, body').css('height', '100%');
		$('.Nav, .Header, .Page').addClass('compensate-for-scroll')
		*/
	}

	close() {
		this.hasOpen = false;

		// change burger
		this.$burger.removeClass('active')

		// hide menu
		this.$nav.css('transform', 'translateY(-100%)')
		
		// unlock scroll
		scrollLock.show()
		$('html, body').css('height', '')
		$('.Header, .Nav').css('margin-right', '')
		/*
		this.$page.css('overflow', '')
		$('html, body').css('height', '');
		$('.Nav, .Header, .Page').removeClass('compensate-for-scroll')
		*/
	}

	_changeLevel() {
		// this.levels(this.level).css('transform', 'translateX('+ 0 +')')
		this.$container.css('transform', 'translateX(-'+ (this.level * 100) +'vw)')
		// scrollLock.setScrollableTargets($(this.levels);
	}

	// _closeLevel() {
	// 	this.level--
	// 	this.$container.css('transform', 'translateX(-'+ (this.level * 100) +'%)')
	// }

	_destroyMenuLevel() {
		this.levels.pop().remove();
		console.log('destroy menu level ' + this.levels.length);
	}

	_createEvents(level, opts) {
		let that = this;
		let $link = $(opts.linkNextLevel);


		$link.click(function() {
			let $menu = $(opts.nextMenu(this));
			that.level = level + 1;

			if($(window).width() > 991) {
				if(!that.hasOpen) {
					that.open();
				}

				if(that.level == 1 && $(this).hasClass('active')) {
					$(this).removeClass('active');
					that.close()
					that.level = 0

					return false;
				}

				$link.removeClass('active');
				$(this).addClass('active')
			}

			
			that._createLevel($menu);
			that._changeLevel();

			return false
		});
	}

	_createLevel($menu) {
		let that = this;
		let level = this.level;
		let $level;

		// если 
		if(this.levels.length > level) {
			this._destroyMenuLevel()
			return this._createLevel($menu);
		}

		// scrollLock.setScrollableTargets('.NavMobile-Level')

		
		$level = $('<div class="NavMobile-Level sl--scrollable"></div>');

		if(level > 0) {
			let $back = $('<button class="NavMobile-Back Link"> <i class="fa fa-chevron-left"></i></button>').click(() => {
				that.level-- 
				that._changeLevel()
			});

			$level.append($back)
		}

		this.levels.push($level.append($menu.clone()));
		this.$container.append(this.levels[level]);
		console.log('create menu level ' + (this.levels.length - 1));
		
		
		// если есть ещё подменю, добавляем события для его открытия
		if(this._createMenuOptions[level]) {
			this._createEvents(level, this._createMenuOptions[level]);
		}
	}

	_move() {
		var touchStart = 0;
		var touchOffset = 0;
		var lastTouch;
		var that = this;

		this.$container.on('touchstart', function(e) {
			touchStart =  e.changedTouches[0].pageX
			lastTouch = e.changedTouches[0];
		});

		this.$container.on('touchmove', function(e) {
			touchOffset = (e.changedTouches[0].pageX - touchStart) / ($(window).width() / 100)

			if(touchOffset < 0 || that.level == 0) {
				return 
			}

			// $(this).css('transition', 'none');
			// $(this).css('transform', 'translateX('+ (touchOffset + (that.level * -100 )) + '%)');
			
		})

		this.$container.on('touchend', function() {
			// $(this).css('transition', '')

			if(touchOffset > 10) {
				that.level--
				that._changeLevel();
			}

			
		})

		// mc.on('panright', (e) => {
		// 	x += e.deltaX * -1;
		// 	this.$container.css('transition', 'none')
		// 	this.$container.css('left', x +'px')
		// 	console.log(e, x)

		// 	// if (e.isFinal) {
		// 	// 	console.log('final' + x);

		// 	// 	// alert('Final')
		// 	// }
		// })

		// mc.on('panleft', (e) => {
		// 	x += e.deltaX;
		// 	this.$container.css('transition', 'none')
		// 	this.$container.css('left', x +'px')
		// 	console.log(e, x)
		// })
	}


	_init() {
		let offset = $('.Nav').outerHeight() + $('.Header').outerHeight();
		this.$nav.css('padding-top', offset);
	}
}

let menu = new MobileMenu({
	nav: '.NavMobile',
	burger: '.Nav-Burger',
	page: '.Page',
	container: '.NavMobile-Container',
	close: '.NavMobile-Close',
	createMenuOptions: {
		0: {
			menu: '.NavTop',
			linkNextLevel: '.NavTop-Link',
			nextMenu(link) {
				return $(link).next().find('.NavTopSub');
			}
		},
		1: {
			linkNextLevel: '.NavTopSub-Link',
			nextMenu(link) {
				return $(link).next().find('.NavTopSubContent')
			}
		}
	}
});
/*
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
*/