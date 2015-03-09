CBR.Controllers.Index = P(CBR.Controllers.Base, function (c) {
    c.init = function () {
        this._initElements();

        this.windowHeight = this.$window.height();

        this._initEvents();

        this._initMenu();
    };

    c._initElements = function () {
        this.$window = $(window);

        this.$siteHeader = $("#masthead");
        this.$menuBtnWrapper = this.$siteHeader.children("#menu-btn-wrapper");
        this.$menuBtn = this.$menuBtnWrapper.children();

        this.$nav = $("#site-navigation");
        this.$menuContainer = this.$nav.children("div");
        this.$menuLinks = this.$menuContainer.find("a");

        this.$mainPanel = $("#main");
        this.$scrollingAnchors = this.$mainPanel.find("a[href^=#]");
    };

    c._initEvents = function () {
        this.$window.resize(_.debounce(function () {
            this.windowHeight = this.$window.height();
        }.bind(this), 15));

        this.$window.scroll(_.debounce($.proxy(this._updateMenuPosition, this), 15));

        this.$menuBtn.click($.proxy(this._toggleMenu, this));
        this.$menuLinks.click($.proxy(this._scrollToPageAndToggleMenu, this));

        this.$scrollingAnchors.click(this._scrollToPage);
    };

    c._initMenu = function () {
        if (this.$menuBtn.is(":visible")) {
            this.isMenuClosed = true;

            // Save height when expanded
            this.menuContainerHeightExpanded = this.$menuContainer.height();    // TODO: recalculate on window resize
            this.menuContainerWidthExpanded = this.$menuContainer.width();    // TODO: recalculate on window resize

            TweenLite.set(this.$menuContainer, {height: 0, visibility: "visible"});
        }
    };

    c._updateMenuPosition = function () {
        var scrollPos = this.$window.scrollTop();

        var isScrolledDownEnough = scrollPos >= this.windowHeight;

        this.$siteHeader.toggleClass("scrolled-down", isScrolledDownEnough);

        // TODO: replace opacity with menu scrolling down
        if (!this.isScrolledDownEnough && isScrolledDownEnough) {
            TweenLite.set([this.$menuBtnWrapper, this.$menuContainer], {opacity: 0});
            TweenLite.to([this.$menuBtnWrapper, this.$menuContainer], CBR.defaultAnimationDuration, {opacity: 1});
        }

        this.isScrolledDownEnough = isScrolledDownEnough;
    };

    c._toggleMenu = function () {
        if (this.$menuBtn.is(":visible")) {
            var targetHeight = this.isMenuClosed ? this.menuContainerHeightExpanded : 0;

            TweenLite.to(this.$menuContainer, CBR.defaultAnimationDuration, {height: targetHeight, ease: Power4.easeOut});

            if (this.$siteHeader.hasClass("scrolled-down")) {
                TweenLite.set(this.$nav, {width: "auto"});

                if (this.isMenuClosed) {
                    TweenLite.set(this.$menuContainer, {width: 0});
                }

                var targetWidth = this.isMenuClosed ? this.menuContainerWidthExpanded : 0;
                TweenLite.to(this.$menuContainer, CBR.defaultAnimationDuration, {width: targetWidth, ease: Power4.easeOut, onComplete: function() {
                    TweenLite.set(this.$nav, {width: "100%"});
                }.bind(this)});
            } else {
                TweenLite.set(this.$menuContainer, {width: "auto"});
            }

            this.isMenuClosed = !this.isMenuClosed;
        }
    };

    c._scrollToPage = function (e) {
        e.preventDefault();

        var $target = $(e.currentTarget);
        var hash = $target.attr("href");
        var pageId = hash.substring(1);
        var $page = $(document.getElementById(pageId));

        var scrollYPos = $page.offset().top;
        TweenLite.to(window, CBR.defaultAnimationDuration, {scrollTo: scrollYPos, ease: Power4.easeOut});
    };

    c._scrollToPageAndToggleMenu = function (e) {
        this._scrollToPage(e);
        this._toggleMenu();
    };
});
