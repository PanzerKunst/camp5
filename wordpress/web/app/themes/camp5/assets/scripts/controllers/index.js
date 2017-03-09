CB.Controllers.Index = {
    siteHeaderImgFolder: `${CB.themeRoot}/dist/images/site-header`,

    siteHeaderImgFileNames: [
        "How_close_to_boulders.jpg",
        "IMG_0451.JPG",
        "IMG_4400.JPG"
    ],

    fadeLengthMs: 1000,
    imgDurationMs: 2000,
    fadeFrameDurationMs: 50,
    currentImgIndex: 0,

    init() {
        this._initElements();
        this._initHeaderBackground();
    },

    _initElements() {
        this.$siteHeaderContainer = $("#site-header").children(".container");
    },

    _initHeaderBackground() {
        this._cycleImg();

        setInterval(() => {
            this._cycleImg();
        }, this.fadeLengthMs + this.imgDurationMs + this.fadeLengthMs);
    },

    _cycleImg() {
        this.imgFileName = this.siteHeaderImgFileNames[this.currentImgIndex];
        this._updateBgImgOpacity(1);
        this._fadeInBgImg();

        setTimeout(() => {
            this._fadeOutBgImg();
            this.currentImgIndex = this.currentImgIndex === this.siteHeaderImgFileNames.length - 1 ? 0 : this.currentImgIndex + 1;
        }, this.imgDurationMs + this.fadeLengthMs);
    },

    _fadeOutBgImg() {
        let siteHeaderImgFilterOpacity = 0;

        const intervalId = setInterval(() => {
            siteHeaderImgFilterOpacity = _.round(siteHeaderImgFilterOpacity + this.fadeFrameDurationMs / this.fadeLengthMs, 2);
            this._updateBgImgOpacity(siteHeaderImgFilterOpacity, this.imgFileName);

            if (siteHeaderImgFilterOpacity === 1) {
                clearInterval(intervalId);
            }
        }, this.fadeFrameDurationMs);
    },

    _fadeInBgImg() {
        let siteHeaderImgFilterOpacity = 1;

        const intervalId = setInterval(() => {
            siteHeaderImgFilterOpacity = _.round(siteHeaderImgFilterOpacity - this.fadeFrameDurationMs / this.fadeLengthMs, 2);
            this._updateBgImgOpacity(siteHeaderImgFilterOpacity, this.imgFileName);

            if (siteHeaderImgFilterOpacity === 0) {
                clearInterval(intervalId);
            }
        }, this.fadeFrameDurationMs);
    },

    _updateBgImgOpacity(opacity) {
        this.$siteHeaderContainer.css("background-image", `linear-gradient(rgba(0, 0, 0, ${opacity}), rgba(0, 0, 0, ${opacity})), url(${this.siteHeaderImgFolder}/${this.imgFileName})`);
    }
};
