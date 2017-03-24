CB.Services.CbrGallery = {
    init(thumbDirectory, fullSizeDirectory) {
        this.thumbDirectory = thumbDirectory;
        this.fullSizeDirectory = fullSizeDirectory;

        this._initElements();
        this._initAttributes();
        this._initAnchors();
        initPhotoSwipeFromDOM(".cbr-gallery");
    },

    _initElements() {
        this.$wrapper = $(".cbr-gallery");
        this.$figures = this.$wrapper.children();
    },

    _initAttributes() {
        this.$wrapper.prop("itemscope", true);
        this.$wrapper.attr("itemtype", "http://schema.org/ImageGallery");

        this.$figures.each(() => {
            const $figure = $(this);

            $figure.prop("itemscope", true);
            $figure.attr("itemprop", "associatedMedia");
            $figure.attr("itemtype", "http://schema.org/ImageObject");
        });
    },

    _initAnchors() {
        for (const figure of this.$figures) {
            const $figure = $(figure);
            const fileName = $figure.data("fileName");

            $figure.html(`<a href="${this.fullSizeDirectory}${fileName}" itemprop="contentUrl"></a>`);
            $figure.children().css("background-image", `url(${this.thumbDirectory}${fileName})`);
        }
    }
};
