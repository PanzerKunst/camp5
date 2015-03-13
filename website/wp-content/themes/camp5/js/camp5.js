var P = (function(prototype, ownProperty, undefined) {
  return function P(_superclass /* = Object */, definition) {
    // handle the case where no superclass is given
    if (definition === undefined) {
      definition = _superclass;
      _superclass = Object;
    }

    // C is the class to be returned.
    //
    // When called, creates and initializes an instance of C, unless
    // `this` is already an instance of C, then just initializes `this`;
    // either way, returns the instance of C that was initialized.
    //
    //  TODO: the Chrome inspector shows all created objects as `C`
    //        rather than `Object`.  Setting the .name property seems to
    //        have no effect.  Is there a way to override this behavior?
    function C() {
      var self = this instanceof C ? this : new Bare;
      self.init.apply(self, arguments);
      return self;
    }

    // C.Bare is a class with a noop constructor.  Its prototype will be
    // the same as C, so that instances of C.Bare are instances of C.
    // `new MyClass.Bare` then creates new instances of C without
    // calling .init().
    function Bare() {}
    C.Bare = Bare;

    // Extend the prototype chain: first use Bare to create an
    // uninitialized instance of the superclass, then set up Bare
    // to create instances of this class.
    var _super = Bare[prototype] = _superclass[prototype];
    var proto = Bare[prototype] = C[prototype] = C.p = new Bare;

    // pre-declaring the iteration variable for the loop below to save
    // a `var` keyword after minification
    var key;

    // set the constructor property on the prototype, for convenience
    proto.constructor = C;

    C.extend = function(def) { return P(C, def); }

    return (C.open = function(def) {
      if (typeof def === 'function') {
        // call the defining function with all the arguments you need
        // extensions captures the return value.
        def = def.call(C, proto, _super, C, _superclass);
      }

      // ...and extend it
      if (typeof def === 'object') {
        for (key in def) {
          if (ownProperty.call(def, key)) {
            proto[key] = def[key];
          }
        }
      }

      // if no init, assume we're inheriting from a non-Pjs class, so
      // default to using the superclass constructor.
      if (!('init' in proto)) proto.init = _superclass;

      return C;
    })(definition);
  }

  // as a minifier optimization, we've closured in a few helper functions
  // and the string 'prototype' (C[p] is much shorter than C.prototype)
})('prototype', ({}).hasOwnProperty);
;var CBR = {};

// Additional namespaces
CBR.Controllers = {};
CBR.Services = {};

CBR.defaultAnimationDuration = 0.5;
;CBR.Services.Browser = {
    addUserAgentAttributeToHtmlTag: function() {
        document.documentElement.setAttribute("data-useragent", navigator.userAgent);
    }
};
;CBR.Controllers.Base = P(function () {
});
;CBR.Controllers.Index = P(CBR.Controllers.Base, function (c) {
    c.menuBtnTopPosWhenHidden = "-40px";
    c.navBarTopPosWhenHidden = "-72px";

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
        var isScrolledDownEnough = scrollPos >= this.windowHeight;

        this.$siteHeader.toggleClass("scrolled-down", isScrolledDownEnough);

        if (isScrolledDownEnough) {
            if (this.$menuBtn.is(":visible")) {
                if (!wasScrolledDownEnough && this._isScrollDown(scrollPos) && this.$menuBtnWrapper.css("top") === "0px") {
                    TweenLite.set(this.$menuBtnWrapper, {top: this.menuBtnTopPosWhenHidden});
                }
                else if (!this.$siteHeader.hasClass("menu-open") && this.$menuBtnWrapper.css("top") === this.menuBtnTopPosWhenHidden) {
                    TweenLite.to(this.$menuBtnWrapper, CBR.defaultAnimationDuration, {top: 0});
                }
            } else {
                if (!wasScrolledDownEnough && this._isScrollDown(scrollPos) && this.$nav.css("top") === "0px") {
                    TweenLite.set(this.$nav, {top: this.navBarTopPosWhenHidden});
                }
                else if (this.$nav.css("top") === this.navBarTopPosWhenHidden) {
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
