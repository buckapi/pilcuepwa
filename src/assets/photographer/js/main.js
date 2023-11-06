(function ($) {
    "use strict";


    /************************************
            Vertical Menu
    *************************************/
    $(".navbar .dropdown-toggle").append('<i class="fas fa-angle-down"></i>');
    $(".submenu").before('<i class="fas fa-angle-down switcher"></i>');
    $(".vertical-menu li i.switcher").on('click', function () {
        var $submenu = $(this).next(".submenu");
        $submenu.slideToggle(300);
        $submenu.parent().toggleClass("openmenu");
    });

    /*************************************
        Canvas Menu
   **************************************/
    $("button.burger-menu").on('click', function () {
        $(".canvas-menu").toggleClass("open");
        $(".main-overlay").toggleClass("active");
    });

    $(".canvas-menu .btn-close, .main-overlay").on('click', function () {
        $(".canvas-menu").removeClass("open");
        $(".main-overlay").removeClass("active");
    });
   
    /*************************************   
  Sticky Menu
   **************************************/
    let sticky = $('.sticky');
    let win = $(window);
    win.on('scroll', function () {
        let scroll = win.scrollTop();
        if (scroll < 1) {
            sticky.removeClass("is-sticky");
        } else {
            sticky.addClass("is-sticky");
        }
    });

    /*************************************   
  Search Popup
   **************************************/
    $("button.search").on('click', function () {
        $(".search-popup").addClass("visible");
    });

    $(".search-popup .btn-close").on('click', function () {
        $(".search-popup").removeClass("visible");
    });

    $(document).keyup(function (e) {
        if (e.key === "Escape") { // escape key maps to keycode `27`
            $(".search-popup").removeClass("visible");
        }
    });

    // Hero Slider

    $('#hero-slider-one').owlCarousel({
        loop: true,
        margin: 15,
        responsiveClass: true,
        navText: ["PREV", "NEXT"],
        responsive: {
            0: {
                items: 1,
                nav: true,
                dots: false
            },
            600: {
                items: 1,
                nav: true,
                dots: false
            },
            1000: {
                items: 1,
                nav: true,
                dots: false,
                loop: true
            }
        }
    });

    // Hero Slider Two//

    $('#hero-slider-two').owlCarousel({
        loop: true,
        margin: 0,
        responsiveClass: true,
        navText: ['<i class="fal fa-long-arrow-left"></i>', '<i class="fal fa-long-arrow-right"></i>'],
        responsive: {
            0: {
                items: 1,
                nav: true,
                dots: false
            },
            600: {
                items: 1,
                nav: true,
                dots: false
            },
            1000: {
                items: 1,
                nav: true,
                dots: false,
                loop: true
            }
        }
    });
    /* ===================================
    Gallery Carousel */
    $('.gallery-wrap').owlCarousel({
        loop: false,
        margin: 0,
        responsiveClass: true,
        items: 1,
        nav: true,
        navText: ['<i class="fal fa-long-arrow-left"></i>', '<i class="fal fa-long-arrow-right"></i>'],
    });
 /* ===================================
    Gallery Carousel Full Width */
    $('.gallery-wrap-fullwidth').owlCarousel({
        loop: true,
        margin: 0,
        responsiveClass: true,
        items: 1,
        nav: true,
        navText: ['prev', 'next'],
    });
     /* ===================================
    Testimonial Slider */

    $('#testimonial-slider').owlCarousel({
        loop: true,
        margin: 0,
        responsiveClass: true,
        navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>'],
        responsive: {
            0: {
                items: 1,
                nav: true,
                dots: false
            },
            600: {
                items: 1,
                nav: true,
                dots: false
            },
            1000: {
                items: 1,
                nav: true,
                dots: false,
                loop: true
            }
        }
    });

   /* ===================================
   Testimonial Slider 2 */
    $('#testimonial-slider1').owlCarousel({
        loop: true,
        margin: 0,
        responsiveClass: true,
        navText: ['<i class="fas fa-quote-left"></i>', '<i class="fas fa-quote-right"></i>'],
        responsive: {
            0: {
                items: 1,
                nav: true,
                dots: false
            },
            600: {
                items: 1,
                nav: true,
                dots: false
            },
            1000: {
                items: 1,
                nav: true,
                dots: false,
                loop: true
            }
        }
    });

     /* ===================================
    Post Style 10 Carousel */

    $('#post-style--10').owlCarousel({
        loop: true,
        margin: 0,
        responsiveClass: true,
        navText: ['prev', 'next'],
        responsive: {
            0: {
                items: 1,
                nav: true,
                dots: false
            },
            600: {
                items: 1,
                nav: true,
                dots: false
            },
            1000: {
                items: 1,
                nav: true,
                dots: false,
                loop: true
            }
        }
    });

     /* ===================================
    Self Hosted Video */
    var $sel = $("#video1");
    var $video = $sel.children("video"), video = $video[0]
    var $controls = $sel.children(".controls");
    var $play = $controls.children("span");

    // control visibility
    $sel.on("mouseover mouseout", function (e) {
        $controls.css("display", e.type === "mouseout" && video.paused ? "none" : "block");
        $controls.css("display", e.type === "mouseover" && video.play ? "block" : "none");
    });

    // play or pause
    $play.on("click", toggle);
    $video.on("click", toggle);

    function toggle() {
        video[video.paused ? "play" : "pause"]();
    }


  /* ===================================
    WoW JS Init */
    new WOW().init({
        animateClass: 'animated',
        mobile: false,
    });

 /* ===================================
    Scroll UP */
    $.scrollUp({
        scrollName: 'scrollUp', // Element ID
        topDistance: '300', // Distance from top before showing element (px)
        topSpeed: 300, // Speed back to top (ms)
        scrollText: '<i class="fal fa-arrow-up"></i>', // Text for element
    });
 /* ===================================
   Jarallax Parallax */
    $('.jarallax').jarallax({
        speed: 0.2
    });

     /* ===================================
    Preloader */
    $(window).on('load', function () {
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({ 'overflow': 'visible' });
    });

})(jQuery);




