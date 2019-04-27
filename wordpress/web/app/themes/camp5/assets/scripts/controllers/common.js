CB.Controllers.Common = {
    init() {
        CB.Services.Browser.addUserAgentAttributeToHtmlTag();
        CB.Services.Browser.fixFlexboxIndicatorClass();

        this._initElements();
        this._initEvents();
        this._removeEmptyParagraphTagsAddedByTheWpEditor();
        this._initPageBackgrounds();
    },

    _initElements() {
        this.$window = $(window);

        this.$siteHeader = $('#site-header');
        this.$siteMenu = $('.nav-primary');
        this.$scrollingAnchors = $('body').find('a[href^="#"]');
        this.$pages = $('#all-pages-as-single').children();
    },

    _initEvents() {
        this.$window.scroll(_.debounce(() => this._onScroll(), 15));

        this.$scrollingAnchors.click(e => CB.Services.Animator.scrollTo(e, this.$siteMenu.outerHeight()));
    },

    _removeEmptyParagraphTagsAddedByTheWpEditor() {
        $('p:empty').remove();
    },

    _onScroll() {
        const isScrolledDownEnough = this.$window.scrollTop() > 0;

        this.$siteHeader.toggleClass('scrolled-down', isScrolledDownEnough);
    },

    _initPageBackgrounds() {
        _.forEach(this.$pages, page => {
            const $page = $(page);
            const dataUrlBgImgLarge = $page.data('urlBgImgLarge');
            const dataUrlBgImgSmall = $page.data('urlBgImgSmall');

            if (!CB.Services.Browser.isLargeScreen()
                && !window.matchMedia('(min-resolution: 2dppx)').matches
                && dataUrlBgImgSmall) {

                $page.addClass('img-bg');
                $page.css('background-image', `url(${dataUrlBgImgSmall})`);
            } else if (dataUrlBgImgLarge) {
                $page.addClass('img-bg');
                $page.css('background-image', `url(${dataUrlBgImgLarge})`);
            }
        });
    }
};
