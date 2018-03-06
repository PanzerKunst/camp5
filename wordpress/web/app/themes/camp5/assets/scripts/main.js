/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

// eslint-disable-next-line wrap-iife
(function($) {

    // Use this variable to set up the common and page specific functions. If you
    // rename this variable, you will also need to rename the namespace below.
    const Sage = {

        // All pages
        common: {
            init() {

                // JavaScript to be fired on all pages
                CB.Controllers.Common.init();
            },
            finalize() {

                // JavaScript to be fired on all pages, after page specific JS is fired
            }
        },

        // Home page
        home: {
            init() {
                CB.Controllers.Index.init();
            }
        },

        // Checkout
        checkout: {
            init() {
                CB.Controllers.Checkout.init();
            }
        }
    };

    // The routing fires all common scripts, followed by the page specific scripts.
    // Add additional events for more control over timing e.g. a finalize event
    const UTIL = {
        fire(func, funcname, args) {
            let fire;
            const namespace = Sage;

            // eslint-disable-next-line no-undefined
            funcname = (funcname === undefined) ? "init" : funcname;
            fire = func !== "";
            fire = fire && namespace[func];
            fire = fire && typeof namespace[func][funcname] === "function";

            if (fire) {
                namespace[func][funcname](args);
            }
        },
        loadEvents() {

            // Fire common init JS
            UTIL.fire("common");

            // Fire page-specific init JS, and then finalize JS
            $.each(document.body.className.replace(/-/g, "_").split(/\s+/), (i, classnm) => {
                UTIL.fire(classnm);
                UTIL.fire(classnm, "finalize");
            });

            // Fire common finalize JS
            UTIL.fire("common", "finalize");
        }
    };

    // Load Events
    $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
