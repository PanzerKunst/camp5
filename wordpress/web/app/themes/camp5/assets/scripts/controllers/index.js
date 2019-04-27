CB.Controllers.Index = {
    siteHeaderImgFolder: `${CB.themeRoot}/dist/images/site-header`,

    siteHeaderImgFileNames: [
        'climbing.jpg',
        'acroyoga.jpg',
        'flow.jpg'
    ],

    subtextBgColours: [
        'rgb(224, 113, 118)',
        'rgb(7, 163, 172)',
        'rgb(209, 26, 86)'
    ],

    fadeLengthMs: 1000,
    imgDurationMs: 2000,
    fadeFrameDurationMs: 10,
    currentImgIndex: _.random(0, 2),

    init() {
        this._initElements();
        this._initHeaderBackground();
        CB.Services.CbrGallery.init(`${CB.themeRoot}/dist/images/cbr-gallery/thumbs/`, `${CB.themeRoot}/dist/images/cbr-gallery/full/`);
    },

    _initElements() {
        this.$siteHeaderContainer = $('#site-header').children('.container');
        this.$subtext = this.$siteHeaderContainer.find('.subtext');
    },

    _initHeaderBackground() {
        this._cycleImg();
        this._cycleSubtextBgColour();

        setInterval(() => {
            this._cycleImg();
            this._cycleSubtextBgColour();
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

    _updateBgImgOpacity(opacity) {
        this.$siteHeaderContainer.css('background-image', `linear-gradient(rgba(0, 0, 0, ${opacity}), rgba(0, 0, 0, ${opacity})), url(${this.siteHeaderImgFolder}/${this.imgFileName})`);
    },

    _cycleSubtextBgColour() {
        this._fadeInSubtextBgColour();

        setTimeout(() => {
            this._fadeOutSubtextBgColour();
        }, this.imgDurationMs + this.fadeLengthMs);
    },

    _fadeInSubtextBgColour() {
        TweenLite.to(this.$subtext, this.fadeLengthMs / 1000, {backgroundColor: this.subtextBgColours[this.currentImgIndex], ease: Power0.easeNone});
    },

    _fadeOutSubtextBgColour() {
        TweenLite.to(this.$subtext, this.fadeLengthMs / 1000, {backgroundColor: 'rgb(0, 0, 0)', ease: Power0.easeNone});
    }
};
