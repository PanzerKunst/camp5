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
;// create the base namespace
var CBR = CBR || {};

// create additional namespace
CBR.Controllers = CBR.Controllers || {};
CBR.Services = CBR.Services || {};

CBR.defaultAnimationDuration = 0.5;
;CBR.Controllers.Base = P(function () {
});
;CBR.Controllers.Index = P(CBR.Controllers.Base, function (c) {
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
