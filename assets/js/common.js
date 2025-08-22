(function ($) {

	$(window).on('load', function () {

		function map() {

			var maps = $('#map')

			if (maps.length > 0) {
				var apiKey = maps.attr('data-api-key'),
					apiURL

				if (apiKey) {
					apiURL = 'https://maps.google.com/maps/api/js?key=' + apiKey + ' &sensor=false'
				} else {
					apiURL = 'https://maps.google.com/maps/api/js?sensor=false'
				}

				$.getScript(apiURL, function (data, textStatus, jqxhr) {
					maps.each(function () {

						var current_map = $(this),

							latlng = new google.maps.LatLng(current_map.attr('data-longitude'),

								current_map.attr('data-latitude')),

							point = current_map.attr('data-marker'),

							center = {
								lat: 10.516667,
								lng: 7.433333,
							},

							markerPos = {
								lat: 10.516667,
								lng: 7.433333,
							},

							myOptions = {
								zoom: 13,
								center: center,
								disableDefaultUI: true,
								mapTypeId: google.maps.MapTypeId.ROADMAP,
								mapTypeControl: false,
								scrollwheel: false,
								draggable: true,
								panControl: false,
								zoomControl: false,
								disableDefaultUI: true,
								styles: [
									{
										"featureType": "administrative",
										"elementType": "labels.text.fill",
										"stylers": [
											{
												"color": "#212326",
											}
										]
									},
									{
										"featureType": "administrative.locality",
										"elementType": "labels.text.fill",
										"stylers": [
											{
												"color": "#0D73FC",
											}
										]
									},
									{
										"featureType": "landscape",
										"elementType": "all",
										"stylers": [
											{
												"color": "#F8F8F9",
											}
										]
									},
									{
										"featureType": "poi",
										"elementType": "all",
										"stylers": [
											{
												"visibility": "off",
											}
										]
									},
									{
										"featureType": "road",
										"elementType": "all",
										"stylers": [
											{
												"saturation": -100,
											},
											{
												"lightness": 45,
											}
										]
									},
									{
										"featureType": "road",
										"elementType": "labels",
										"stylers": [
											{
												"visibility": "off",
											}
										]
									},
									{
										"featureType": "road",
										"elementType": "labels.icon",
										"stylers": [
											{
												"visibility": "off",
											}
										]
									},
									{
										"featureType": "transit",
										"elementType": "all",
										"stylers": [
											{
												"visibility": "off",
											}
										]
									},
									{
										"featureType": "road.highway",
										"elementType": "all",
										"stylers": [
											{
												"visibility": "off",
											}
										]
									},
									{
										"featureType": "road.arterial",
										"elementType": "labels.icon",
										"stylers": [
											{
												"visibility": "off",
											}
										]
									},
									{
										"featureType": "transit",
										"elementType": "all",
										"stylers": [
											{
												"visibility": "off",
											}
										]
									},
									{
										"featureType": "water",
										"elementType": "all",
										"stylers": [
											{
												"color": "#0D73FC",
											},
											{
												"visibility": "on",
											}
										]
									}
								]
							}

						var map = new google.maps.Map(current_map[0], myOptions)

						var marker = new google.maps.Marker({
							map: map,
							icon: {
								size: new google.maps.Size(59, 69),
								origin: new google.maps.Point(0, 0),
								anchor: new google.maps.Point(0, 69),
								url: point,
							},
							position: markerPos
						})

						var windowContent = '<h3 class="map-placeholder">Here</h3>'
						var infowindow = new google.maps.InfoWindow({
							content: windowContent,
						})

						var windowContent = '<img src="/static/orgone/logo.png" style="width:80%;" class="map-placeholder">'
						var infowindow = new google.maps.InfoWindow({
							content: windowContent,
						})

						google.maps.event.addListener(marker, 'click', function () {
							infowindow.open(map, marker)
						})

						infowindow.open(map, marker)

						google.maps.event.addDomListener(window, "resize", function () {
							var center = map.getCenter()
							google.maps.event.trigger(map, "resize")
							map.setCenter(center)
						})
					})
				})
			}
		}

		map()

	})

	'use strict'

	jQuery(document).ready(function () {

		// object fit

		objectFitImages()

		// mobile menu

		$('.hamburger').on('click', function () {

			$(this).toggleClass('is-active')
			$('.mobile-nav').toggleClass('is-active')
			$('header').toggleClass('menu-opened')

		})

		$('.intro-mobile-menu li a').on('click', function () {

			$('.hamburger').removeClass('is-active')
			$('.mobile-nav').removeClass('is-active')
			$('header').removeClass('menu-opened')

		})

		$('.mobile-menu li.menu-item--has-child').on('click', function () {

			$(this).toggleClass('sub-menu-opened').children('.sub-menu').stop().slideToggle(300)

		})

		//--- SLIDERS START ---//

		// promo-slider

		function promoSlider() {

			var slider = $('.promo-slider')

			if (!slider.length) return

			var status = $('.paging-info')

			slider.on('init afterChange', function (event, slick, currentSlide, nextSlide) {

				var i = (currentSlide ? currentSlide : 0) + 1
				status.text(i + '/' + slick.slideCount)

			})

			slider.slick({

				fade: true,
				adaptiveHeight: true,
				infinite: true,
				speed: 500,
				cssEase: 'ease-in-out',
				arrows: false,
				dots: true,
				appendDots: '.promo-dots',

			})

		}

		promoSlider()

		// cooperation slider

		function cooperationSlider() {

			var slider = $('.cooperation-slider')

			if (!slider.length) return

			slider.slick({

				arrows: false,
				slidesToShow: 4.5,
				adaptiveHeight: true,
				autoplay: true,
				autoplaySpeed: 3000,

				responsive: [{
					
					settings: {
						slidesToShow: 3.5,
					}
				}, {
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
					}
				}, {
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
					}
				}, {
					breakpoint: 576,
					settings: {
						slidesToShow: 1,
					}
				}],

			})

		}

		cooperationSlider()

		// testimonials primary slider

		function testimonialsPrimarySlider() {

			var slider = $('.testimonials-primary-slider')

			if (!slider.length) return

			slider.slick({

				arrows: false,
				dots: true,
				appendDots: '.testimonials--primary .testimonials-dots',
				adaptiveHeight: true,

			})

		}

		testimonialsPrimarySlider()

		// brands slider

		function brandsSlider() {

			var slider = $('.brands-slider')

			if (!slider.length) return

			slider.slick({

				slidesToShow: 5,
				arrows: false,
				dots: true,
				appendDots: '.brands-dots',
				adaptiveHeight: true,
				responsive: [{
					breakpoint: 1200,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 2,
					}
				}, {
					breakpoint: 992,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 2,
					}
				}, {
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				}],

			})

		}

		brandsSlider()

		// project gallery slider

		function projectGallery() {

			var slider = $('.project-gallery')

			if (!slider.length) return

			slider.slick({

				slidesToShow: 6,
				slidesToScroll: 2,
				arrows: false,
				infinite: false,
				dots: true,
				appendDots: '.project-gallery-dots',
				responsive: [{
					breakpoint: 1600,
					settings: {
						slidesToShow: 5,
						slidesToScroll: 2,
					}
				}, {
					breakpoint: 1366,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 2,
					}
				}, {
					breakpoint: 992,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 2,
					}
				}, {
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				}, {
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				}]

			})

		}

		projectGallery()

		// instagram slider

		function instagramSlider() {

			var slider = $('.instagram-slider')

			if (!slider.length) return

			slider.slick({

				slidesToShow: 6,
				slidesToScroll: 2,
				arrows: false,
				infinite: false,
				dots: true,
				appendDots: '.instagram-dots',
				responsive: [{
					breakpoint: 1600,
					settings: {
						slidesToShow: 5,
						slidesToScroll: 2,
					}
				}, {
					breakpoint: 1366,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 2,
					}
				}, {
					breakpoint: 992,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 2,
					}
				}, {
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				}, {
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				}],

			})

		}

		instagramSlider()

		// products slider

		function productsSlider() {

			var slider = $('.products-slider')

			if (!slider.length) return

			slider.slick({

				arrows: false,
				dots: true,
				slidesToShow: 4,
				slidesToScroll: 2,
				appendDots: '.products-slider-dots',
				responsive: [{
					breakpoint: 992,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 2,
					}
				}, {
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				}, {
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				}]

			})

		}

		productsSlider()

		// additional slider

		function additionalSlider() {

			var slider = $('.additional-slider')

			if (!slider.length) return

			slider.slick({

				slidesToShow: 4,
				slidesToScroll: 1,
				arrows: false,
				dots: true,
				appendDots: '.additional-dots',
				responsive: [{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
					}
				}, {
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
					}
				}, {
					breakpoint: 576,
					settings: {
						slidesToShow: 1,
					}
				}]
			})

		}

		additionalSlider()

		// product slider

		function productSlider() {

			var slider = $('.product-slider')

			if (!slider.length) return

			slider.slick({

				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				asNavFor: '.nav-slider',
				fade: true,

			})

			var navSlider = $('.nav-slider')

			navSlider.slick({

				slidesToShow: 4,
				slidesToScroll: 1,
				asNavFor: '.product-slider',
				focusOnSelect: true,
				arrows: false,

			})

		}

		productSlider()

		// testimonials-1

		function testimonials1() {

			var slider = $('.testimonials-img-left-slider')

			if (!slider.length) return

			slider.slick({

				arrows: false,
				dots: true,
				appendDots: '.testimonials--img-left .testimonials-dots',
				adaptiveHeight: true,

			})

		}

		testimonials1()

		// testimonials-2

		function testimonials2() {

			var slider = $('.testimonials-img-right-slider')

			if (!slider.length) return

			slider.slick({

				arrows: false,
				dots: true,
				appendDots: '.testimonials--img-right .testimonials-dots',
				adaptiveHeight: true,

			})

		}

		testimonials2()

		// cases slider

		function casesSlider() {

			var slider = $('.cases-slider')

			if (!slider.length) return

			slider.slick({

				slidesToShow: 2.5,
				speed: 500,
				arrows: false,
				dots: true,
				appendDots: '.cases-dots',
				responsive: [{
					breakpoint: 1366,
					settings: {
						slidesToShow: 2,
					}
				}, 
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
					}
				}]

			})

		}

		casesSlider()

		// logos slider

		function logosSlider() {

			var slider = $('.logos-slider')

			if (!slider.length) return

			slider.slick({

				slidesToShow: 4,
				slidesToScroll: 4,
				appendDots: '.logos-dots',
				arrows: false,
				dots: true,
				responsive: [{
					breakpoint: 992,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				}, {
					breakpoint: 576,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				}]

			})

		}

		logosSlider()

		// pages slider

		function pagesSlider() {

			var slider = $('.pages-slider')

			if (!slider.length) return

			slider.slick({

				slidesToShow: 2,
				slidesToScroll: 2,
				arrows: false,
				dots: true,
				appendDots: '.pages-slider-dots',
				responsive: [{
					breakpoint: 768,
					settings: {
						appendDots: '.lower-pages-slider-dots'
					}
				}, {
					breakpoint: 576,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						appendDots: '.lower-pages-slider-dots'
					}
				}],

			})

		}

		pagesSlider()

		// items slider

		function itemsSlider() {

			var slider = $('.items-slider')

			if (!slider.length) return

			slider.slick({

				slidesToShow: 3,
				arrows: false,
				dots: true,

				responsive: [{
					breakpoint: 1200,
					settings: {
						slidesToShow: 2,
					}
				}, {
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
					}
				}]

			})

		}

		itemsSlider()

		//  --- SLIDERS END --- //

		// --- TABS START --- //

		// detail tabs

		function detailTabs() {

			var tabs = $('.details-tabs')

			if (!tabs.length) return

			$(".details-tabs .tabs-content__item").not(":first").hide()
			$(".details-tabs .tabs-header__title").on('click', function () {

				$(".details-tabs .tabs-header__title").removeClass("active").eq($(this).index()).addClass("active")
				$(".details-tabs .tabs-content__item").hide().eq($(this).index()).fadeIn(500)

			}).eq(0).addClass("active")

		}

		detailTabs()

		// product tabs

		function productTabs() {

			var tabs = $('.product-tabs')

			if (!tabs.length) return

			$(".product-tabs .tabs-content__item").not(":first").hide()
			$(".product-tabs .tabs-header__title").on('click', function () {

				$(".product-tabs .tabs-header__title").removeClass("active").eq($(this).index()).addClass("active")
				$(".product-tabs .tabs-content__item").hide().eq($(this).index()).fadeIn(500)

			}).eq(0).addClass("active")

		}

		productTabs()

		// catalog tabs

		function catalogTabs() {

			var tabs = $('.catalog-tabs')

			if (!tabs.length) return

			$(".catalog-tabs .tabs-content__item").not(":nth-of-type(2)").hide()
			$(".catalog-tabs .tabs-header__title").on('click', function () {

				$(".catalog-tabs .tabs-header__title").removeClass("active").eq($(this).index()).addClass("active")
				$(".catalog-tabs .tabs-content__item").hide().eq($(this).index()).fadeIn(500)

			}).eq(1).addClass("active")

		}

		catalogTabs()

		// product info tabs

		function productInfoTabs() {

			var tabs = $(".product-info-tabs")

			if (!tabs.length) return

			$(".product-info-tabs .tabs-content__item").not(":first").hide()
			$(".product-info-tabs .tabs-header__title").on('click', function () {

				$(".product-info-tabs .tabs-header__title").removeClass("active").eq($(this).index()).addClass("active")
				$(".product-info-tabs .tabs-content__item").hide().eq($(this).index()).fadeIn(500)

			}).eq(0).addClass("active")

			$('.product-info-tabs .tabs-header__title.reviews').on('click', function () {
				$('body').find('.downloads-block').hide()
			})

			$('.product-info-tabs .tabs-header__title:not(.reviews)').on('click', function () {
				$('body').find('.downloads-block').fadeIn(500)
			})

		}

		productInfoTabs()

		// responsive tabs

		function responsiveTabs() {

			var responsiveTabs = $('#responsive-tabs'),
				horizontal = $('.horizontal--tabs'),
				vertical = $('.vertical--tabs')

			if (!responsiveTabs.length) return

			horizontal.responsiveTabs({

				startCollapsed: 'false'

			})

			vertical.responsiveTabs({

				startCollapsed: 'false'

			})

		}

		responsiveTabs()

		// --- TABS END --- //

		// parallax

		if ($(window).width() > 1200) {

			$('.jarallax').jarallax({

				speed: 0.3,

			})

		}

		// filter trigger

		function filterTrigger() {

			var filterTrigger = $('.filter-trigger')

			if (!filterTrigger.length) return

			filterTrigger.on('click', function () {

				$('body').find('.filter-backdrop').addClass('is-active')
				$('body').find('.aside-holder').addClass('is-active')

			})

			var close = $('.close-aside')

			close.on('click', function () {

				$('body').find('.filter-backdrop').removeClass('is-active')
				$('body').find('.aside-holder').removeClass('is-active')

			})

			var backdrop = $('.aside-holder, .filter-backdrop')

			backdrop.swipe({

				swipeLeft: function () {
					$('.aside-holder').removeClass('is-active')
					$('.filter-backdrop').removeClass('is-active')
				},

				threshold: 50,

			})

		}

		filterTrigger()

		$(document).on('click', function (event) {

			if ($(event.target).closest(".filter-trigger, .aside-holder").length) return
			$('.filter-backdrop').removeClass('is-active')
			$('.aside-holder').removeClass('is-active')
			event.stopPropagation()

		})

		// password view

		function passwordView() {

			var passwordTrigger = $('.password-trigger')

			if (!passwordTrigger.length) return

			passwordTrigger.on('click', function () {

				$(this).toggleClass('active')

				var input = $($(this).attr('toggle'))

				if (input.attr('type') == 'password') {
					input.attr('type', 'text')
				} else {
					input.attr('type', 'password')
				}
			})

		}

		passwordView()

		// fancy video

		function fancybox() {

			var fancybox = $('.fancy-video')

			if (!fancybox.length) return

			fancybox.fancybox()

		}

		fancybox()

		// info-box hover

		var $box = $('.info-box')
		if ($box.length) {
			$box.find('.info-box__hidden').slideUp('0')
			$('.info-box').hover(function () {

				$(this).find('.info-box__hidden').stop().slideDown('70')

			},
				function () {
					$(this).find('.info-box__hidden').stop().slideUp('70').removeAttr("style")
				}
			)
		}

		// form input

		function formField() {

			var formField = $('.form-field')

			if (!formField.length) return

			formField.on('change', function () {

				var $this = $(this)
				var $thisField = $this.find('input')
				if ($this.val() !== "") {
					$this.addClass('field--filled')
				} else {
					$this.removeClass('field--filled')
				}

			})

		}

		formField()

		// gallery filter

		function gallery() {

			var gallery = $('.gallery'),
				title = $('.filter-header .header__title')

			if (!gallery.length) return

			gallery.isotope({

				itemSelector: '.gallery-item',

			})

			// gallery filter on click

			var $grid = $('.gallery').isotope({

				itemSelector: '.gallery-item',

			})

			title.on('click', function () {

				var filterValue = $(this).attr('data-filter')
				$grid.isotope({ filter: filterValue })

			})

			// gallery buttons active

			title.on('click', function () {

				title.removeClass('active')
				$(this).addClass('active')

			})

		}

		gallery()

		// blog masonry

		function masonry() {

			var masonry = $('.blog-masonry')

			if (!masonry.length) return

			masonry.isotope({

				itemSelector: '.masonry-item',
				percentPosition: true,

			})

		}

		masonry()

		// counter

		function counter() {

			var counter = $('.counter')

			if (!counter.length) return

			counter.counterUp({

				delay: 10,
				time: 1500,

			})

		}

		counter()

		// faq toggle

		function accordion() {

			var accordion = $('.accordion-item')

			if (!accordion.length) return

			$('.accordion-item .title-block').on('click', function () {

				$(this).children('.icon').toggleClass('active')
				$(this).parent().children('.content-block').stop().slideToggle(300)

			})

		}

		accordion()

		// range slider

		function rangeSlider() {

			var rangeSlider = $('.range-slider')

			if (!rangeSlider.length) return

			var min = $('.range-value.min'),
				max = $('.range-value.max')

			rangeSlider.ionRangeSlider({
				type: 'double',
				min: 0,
				max: 13000,
				from: 0,
				to: 10350,
				skin: 'round',
				step: 10,
				onChange: function (data) {

					min.val(data.from)
					max.val(data.to)

				},

			})

		}

		rangeSlider()

		// aside toggles

		function asideToggle() {

			var asideToggle = $('.catalog-aside .toggler')

			if (!asideToggle.length) return

			asideToggle.on('click', function () {

				$(this).toggleClass('active').next('.toggle-item').stop().slideToggle(300)

			})

		}

		asideToggle()

		// quantity

		function quantity() {

			var count = $('.count-block'),
				minus = $('.minus'),
				plus = $('.plus')

			if (!count.length) return

			minus.on('click', function () {

				var $input = $(this).parent().find('input')
				var count = parseInt($input.val()) - 1
				count = count < 1 ? 1 : count
				$input.val(count)
				$input.change()
				return false

			})

			plus.on('click', function () {

				var $input = $(this).parent().find('input')
				$input.val(parseInt($input.val()) + 1)
				$input.change()
				return false

			})

		}

		quantity()

		// alert close

		function alertClose() {

			var alert = $('.alert'),
				close = $('.alert .close')

			if (!alert.length) return

			close.on('click', function () {

				$(this).parent('.alert').fadeOut(300)

			})

		}

		alertClose()

		// tag close

		function tagClose() {

			var tag = $('tag'),
				close = $('.tag .close')

			close.on('click', function () {

				$(this).parent('.tag').hide()

			})

		}

		tagClose()

		// tooltip

		$('[data-toggle="tooltip"]').tooltip('show')

		// scroll to id

		function scrollTo() {

			var scrollTo = $('a.anchor[href^="#"]')

			if (!scrollTo.length) return

			$('a.anchor[href^="#"]').bind("click", function (e) {

				var anchor = $(this)
				$('html, body').stop().animate({
					scrollTop: $(anchor.attr('href')).offset().top
				}, 600)
				e.preventDefault()

			})

		}

		scrollTo()

		function introFixed() {

			var header = $('.intro-header')

			if (!header.length) return

			if ($(window).width() > 992) {

				$(window).on('scroll', function () {
					if ($(window).scrollTop() > 0) {
						header.addClass('fixed-header')
					}

					else {
						header.removeClass('fixed-header')
					}
				})

			}

		}

		introFixed()

		// bar chart

		function barChart() {

			var barChart = $('#bar-chart')

			if (!barChart.length) return

			var ctx = document.getElementById('bar-chart').getContext('2d')
			var myChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
					datasets: [{
						label: '# of Votes',
						data: [12, 19, 3, 5, 2, 3],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)',
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)',
						],
						borderWidth: 1
					}]
				},
				options: {
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true,
							}
						}]
					}
				}
			})

		}

		barChart()

		// line chart

		function lineChart() {

			var lineChart = $('#line-chart')

			if (!lineChart.length) return

			var ctx = document.getElementById('line-chart').getContext('2d')
			var myChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
					datasets: [{
						label: 'Red',
						data: [330, 250, 480, 120, 220, 130, 255],
						backgroundColor: 'rgba(255, 99, 132, 0.2)',
						borderColor: 'rgba(255, 99, 132, 1)',
						borderWidth: 1,
					}, {
						label: 'Blue',
						data: [230, 350, 120, 240, 360, 180, 295],
						backgroundColor: 'rgba(105, 195, 255, 0.2)',
						borderColor: 'rgba(105, 195, 255, 1)',
						borderWidth: 1,
					}, {
						label: 'Yellow',
						data: [450, 290, 123, 332, 439, 222, 340],
						backgroundColor: 'rgba(255, 209, 94, 0.2)',
						borderColor: 'rgba(255, 209, 94, 1)',
						borderWidth: 1,
					}, {
						label: 'Green',
						data: [400, 450, 380, 250, 450, 320, 210],
						backgroundColor: 'rgba(155, 220, 220, 0.2)',
						borderColor: 'rgba(155, 220, 220, 1)',
						borderWidth: 1,
					}, {
						label: 'Purple',
						data: [500, 220, 110, 50, 430, 310, 410],
						backgroundColor: 'rgba(154, 104, 255, 0.2)',
						borderColor: 'rgba(154, 104, 255, 1)',
						borderWidth: 1,
					}, {
						label: 'Orange',
						data: [0, 100, 200, 300, 400, 320, 222],
						backgroundColor: 'rgba(255, 159, 64, 0.2)',
						borderColor: 'rgba(255, 159, 64, 1)',
						borderWidth: 1,
					}]
				}
			})

		}

		lineChart()

		// radar chart

		function radarChart() {

			var radarChart = $('#radar-chart')

			if (!radarChart.length) return

			var ctx = document.getElementById('radar-chart').getContext('2d')
			var myChart = new Chart(ctx, {
				type: 'radar',
				data: {
					labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
					datasets: [
						{
							label: 'First',
							data: [100, 44, 55, 90, 55, 80, 100],
							backgroundColor: 'rgba(154, 104, 255, 0.2)',
							borderColor: 'rgba(154, 104, 255, 1)',
							borderWidth: 1,

						}, {
							label: 'Second',
							data: [30, 80, 60, 20, 40, 100, 50],
							backgroundColor: 'rgba(255, 99, 132, 0.2)',
							borderColor: 'rgba(255, 99, 132, 1)',
							borderWidth: 1,
						}]
				}
			})

		}

		radarChart()

		// doughnut chart

		function doughnutChart() {

			var doughnutChart = $('#doughnut-chart')

			if (!doughnutChart.length) return

			var ctx = document.getElementById('doughnut-chart').getContext('2d')
			var myChart = new Chart(ctx, {
				type: 'doughnut',
				data: {
					labels: ['Red', 'Blue', 'Yellow'],
					datasets: [{
						data: [70, 20, 10],
						backgroundColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(105, 195, 255, 1)',
							'rgba(255, 209, 94, 1)',
						],
					}]
				}
			})

		}

		doughnutChart()

		var jForm = $('.js-contact-form')

		if (!jForm.length > 0) return

		jForm.each(function (i, form) {
			var $this = $(form)

			$this.on('submit', function () {
				var $this = $(this),
					str = $this.serialize(),
					note = $this.find('.form__note')

				$.ajax({
					type: "POST",
					url: "send_mail/contact_process.php",
					data: str,
					success: function (msg) {
						var result = '<span style="color: green"><br/>Your message has been sent. Thank you!</span>'

						note.html(result)

						$this.get(0).reset()

						setTimeout(function () { note.html('') }, 3000)
					},
					error: function (err) {
						var result = '<span style="color: red"><br/>Your message not sent! Error: "' + err.responseJSON.message + '"</span>'

						note.html(result)
					},
					complete: function () {

					}
				})

				return false
			})
		})

	})

}(jQuery))