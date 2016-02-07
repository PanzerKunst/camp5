"use strict";

$.fn.parallax = function(bgPosX, parallaxSpeed) {
    bgPosX = bgPosX || "50%";
    parallaxSpeed = parallaxSpeed || 3;

    var $window = $(window);
    var $elements = $(this);

    function update() {
        var scrollPos = $window.scrollTop();

        $elements.each(function() {
            var $el = $(this);
            var elementPosY = $el.offset().top;

            if (scrollPos >= elementPosY) {
                var newParallaxPosition = -Math.round((scrollPos - elementPosY) / parallaxSpeed) + "px";
                $el.css("backgroundPosition", bgPosX + " " + newParallaxPosition);
            }
        });
    }

    function canBrowserBenefitFromASmootherParallax() {
        // Windows, except FF
        return (navigator.platform === "Win32" || navigator.platform === "Win64") &&
            navigator.userAgent.indexOf("Firefox") === -1;
    }

    if (!Modernizr.touch) {
        $window.scroll(update).resize(update);

        // To have a smoother parallax when scrolling with the mouse wheel
        if (canBrowserBenefitFromASmootherParallax()) {
            $window.mousewheel(function(e) {
                e.preventDefault();

                var scrollTop = $window.scrollTop();
                var scrollYPos = scrollTop - e.deltaY * 200;

                TweenLite.to(window, CBR.defaultAnimationDuration / 2, {scrollTo: scrollYPos, ease: Power1.easeOut});
            });
        }
    }
};
