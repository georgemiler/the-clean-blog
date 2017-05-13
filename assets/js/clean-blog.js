jQuery(document).ready(function ($) {

    //1. Navigation Scripts to Show Header on Scroll-Up
    var MQL = 1024;

    // Primary navigation slide-in effect
    if ($(window).width() >= MQL) {
        var headerHeight = $('.cb-nav').height();
        $(window).on('scroll', {
            previousTop: 0
        },
                function (e) {
                    e.preventDefault();
                    var currentTop = $(window).scrollTop();
                    //check if user is scrolling up
                    if (currentTop < this.previousTop) {
                        //if scrolling up...
                        if (currentTop > 0 && $('.cb-nav').hasClass('is-fixed')) {
                            $('.cb-nav').addClass('is-visible');
                        } else {
                            $('.cb-nav').removeClass('is-visible is-fixed');
                        }
                    } else if (currentTop > this.previousTop) {
                        //if scrolling down...
                        $('.cb-nav').removeClass('is-visible');
                        if (currentTop > headerHeight && $('.cb-nav:not(".is-fixed")'))
                            $('.cb-nav').addClass('is-fixed');
                        // Reset the initial state of the search icon and dropdown
                        $('.icon-search').removeClass('icon-close');
                        $('.search-dropdown').hide();
                    }
                    this.previousTop = currentTop;
                });
    }//End 1.

    //2. Click on the arrow down and scroll to the #content 
    $('.fa-arrow-down').click(function (e) {
        e.preventDefault();
        if (window.innerWidth >= 1024) {
            $('html, body').animate({
                scrollTop: $("#content").position().top
            }, 600);
        } else {
            $('html, body').animate({
                scrollTop: $("#content").position().top - 50
            }, 600);
        }
    });//End 2.

    //3. Open/Close Header Search Form and focus in input search field
    $('.search-trigger').click(function () {
        $(this).find('i').toggleClass('icon-close', 'icon-search');
        $('.search-dropdown').animate({
            height: 'toggle',
            opacity: 'toggle'
        });
        $('.search-dropdown .search-field').focus();
    });
    // Reset Search Input Value to Search...    
    $('input.search-field').val('');//End 3.

    /* 4.
     * Give #wpadminbar a fixed position from 600px and below
     * Used JS instead of CSS because theme check plugin
     * require not to use #wpadminbar in stylesheet
     */
    if (($('.admin-bar').length) && (window.matchMedia('(max-width: 600px)').matches)) {
        $('#wpadminbar').css({position: 'fixed', right: '490px'});
    }//End 4.

    //5. Add required attribute to input field on 404.php and search.php
    if (($('.not-found').length)) {
        $("input").prop('required', true);
    }//End 5.

    //6. Add fixed/reveal effect to footer with footer-reveal.js
    $('#colophon').footerReveal({shadowOpacity: 1});//End 6.

    //7. Add scroll to top feature with jquery.scrollUp.js
    $(function () {
        $.scrollUp({
            scrollName: 'scroll-up',
            scrollImg: true,
            scrollSpeed: 600,
            easingType: 'linear',
            animation: 'fade',
            animationSpeed: 600
        });
    });//End 7.

    //8. Adjusting .entry-header h1 starting from 768px width
    function resizeH1() {
        var $h1 = $('.entry-header h1');
        if (window.innerWidth >= 768) {
            /*
             * Since .site-heading is hidden by default in CSS
             * (when the window width is >= 768px)
             * to avoid $h1 from flashing while resizing,
             * we .show() it back with a .delay() to preserve the new styles.
             * .delay() allows to delay the execution of functions that follow it.
             * If we only use .show(), the display property will be restored
             * to whatever it was initially, and our styles will not be applied !
             */
            $('.site-heading').delay().show();
            // Calculate the total height of the element
            var totalHeight = ($h1.height());
            /*
             * Calculate the number of lines of this element
             * Total height divided by the height of one letter
             * One letter height = 80px (font-size) x 1.1 (line-height) = 88px
             */
            var numOfLines = totalHeight / 88;
            // Force this element height to always be 88px
            $h1.height(88);
            // Adjust $h1 font-size depending on it's number of lines
            if (numOfLines === 2) {
                $h1.css('font-size', '42px');
            } else if (numOfLines === 3) {
                $h1.css('font-size', '40px');
            } else if (numOfLines === 4) {
                $h1.css('font-size', '38px');
            } else if (numOfLines >= 5) {
                $h1.css('font-size', '28px');
            }
            // Align the $h1 text verticaly at the very end
            if (numOfLines >= 2) {
                $h1.css({
                    'text-align': 'center',
                    'display': 'flex',
                    'justify-content': 'center',
                    'align-items': 'flex-end'
                });
            }
        } else {
            // Reset the $h1 state when (window.innerWidth < 768)
            $h1.css({
                'height': '',
                'font-size': '',
                'text-align': '',
                'display': '',
                'justify-content': '',
                'align-items': ''
            });
        }
    }
    // Run the function on DOM ready
    resizeH1();
    // Run the function in case of window resize
    $(window).resize(function (e) {
        e.preventDefault;
        resizeH1();
    });//End 8.
});