CBR.Controllers.Index = P(CBR.Controllers.Base, function (c) {
    c.menuBtnTopPosWhenHidden = -40;
    c.navBarTopPosWhenHidden = -72;
    c.menuBtnTopPosWhenHiddenPx = c.menuBtnTopPosWhenHidden + "px";
    c.navBarTopPosWhenHiddenPx = c.navBarTopPosWhenHidden + "px";

    c.init = function () {
        this._initElements();

        this._initElementDimentions();

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
            this._initElementDimentions();
        }.bind(this), 15));

        this.$window.scroll(_.debounce($.proxy(this._onScroll, this), 15));

        this.$menuBtn.click($.proxy(this._toggleMenu, this));
        this.$menuLinks.click($.proxy(this._scrollToPageAndToggleMenu, this));

        this.$scrollingAnchors.click(this._scrollToPage);
    };

    c._initElementDimentions = function () {
        this.windowHeight = this.$window.height();

        // Save height when expanded
        var menuContainerHeight = this.$menuContainer.height();
        this.menuContainerHeightExpanded = menuContainerHeight ? menuContainerHeight : this.menuContainerHeightExpanded;

        var menuContainerWidth = this.$menuContainer.width();
        this.menuContainerWidthExpanded = menuContainerWidth ? menuContainerWidth : this.menuContainerWidthExpanded;
    };

    c._initMenu = function () {
        if (this.$menuBtn.is(":visible")) {
            TweenLite.set(this.$menuContainer, {height: 0, visibility: "visible"});
        }
    };

    c._onScroll = function () {
        var scrollPos = this.$window.scrollTop();

        var wasScrolledDownEnough = this.scrollPos >= this.windowHeight;

        var isScrolledDownEnough = scrollPos >= this.windowHeight + this.navBarTopPosWhenHidden;

        if (this.$menuBtn.is(":visible")) {
            isScrolledDownEnough = scrollPos >= this.windowHeight + this.menuBtnTopPosWhenHidden;
        }

        this.$siteHeader.toggleClass("scrolled-down", isScrolledDownEnough);

        if (isScrolledDownEnough) {
            if (this.$menuBtn.is(":visible")) {
                if (!wasScrolledDownEnough && this._isScrollDown(scrollPos) && this.$menuBtnWrapper.css("top") === "0px") {
                    TweenLite.set(this.$menuBtnWrapper, {top: this.menuBtnTopPosWhenHiddenPx});
                }
                else if (!this.$siteHeader.hasClass("menu-open") && this.$menuBtnWrapper.css("top") === this.menuBtnTopPosWhenHiddenPx) {
                    TweenLite.to(this.$menuBtnWrapper, CBR.defaultAnimationDuration, {top: 0});
                }
            } else {
                if (!wasScrolledDownEnough && this._isScrollDown(scrollPos) && this.$nav.css("top") === "0px") {
                    TweenLite.set(this.$nav, {top: this.navBarTopPosWhenHiddenPx});
                }
                else if (this.$nav.css("top") === this.navBarTopPosWhenHiddenPx) {
                    TweenLite.to(this.$nav, CBR.defaultAnimationDuration, {top: 0});
                }
            }
        }

        this.scrollPos = scrollPos;
    };

    c._toggleMenu = function () {
        if (this.$menuBtn.is(":visible")) {
            this.$siteHeader.toggleClass("menu-open");

            var isMenuOpen = this.$siteHeader.hasClass("menu-open");

            var targetHeight = isMenuOpen ? this.menuContainerHeightExpanded : 0;

            TweenLite.to(this.$menuContainer, CBR.defaultAnimationDuration, {height: targetHeight, ease: Power4.easeOut});

            if (this.$siteHeader.hasClass("scrolled-down")) {
                TweenLite.set(this.$nav, {width: "auto"});

                if (isMenuOpen) {
                    TweenLite.set(this.$menuContainer, {width: 0});
                }

                var targetWidth = isMenuOpen ? this.menuContainerWidthExpanded : 0;
                TweenLite.to(this.$menuContainer, CBR.defaultAnimationDuration, {width: targetWidth, ease: Power4.easeOut, onComplete: function () {
                    TweenLite.set(this.$nav, {width: "100%"});
                }.bind(this)});
            } else {
                TweenLite.set(this.$menuContainer, {width: "auto"});

                if (isMenuOpen) {
                    var scrollPos = this.$window.scrollTop();
                    if (scrollPos < this.menuContainerHeightExpanded) {
                        // We scroll down to make sure that the menu becomes visible
                        TweenLite.to(window, CBR.defaultAnimationDuration, {scrollTo: this.menuContainerHeightExpanded, ease: Power4.easeOut});
                    }
                }
            }
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

    c._scrolledToTheBottom = function (scrollPos) {
        return scrollPos + this.windowHeight === $(document).height();
    };

    c._isScrollUp = function (scrollPos) {
        var scrollPosition = scrollPos || this.$window.scrollTop();
        return scrollPosition < this.scrollPos;
    };

    c._isScrollDown = function (scrollPos) {
        var scrollPosition = scrollPos || this.$window.scrollTop();
        return scrollPosition > this.scrollPos;
    };
});
