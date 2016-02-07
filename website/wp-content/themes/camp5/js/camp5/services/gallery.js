"use strict";

/* Content of the Gallery page in Wordpress:
 <div class="cbr-gallery">
 <figure data-file-name="acroyoga.jpg" data-size="1081x720"></figure>
 <figure data-file-name="after-dinner.jpg" data-size="1081x720"></figure>
 <figure data-file-name="after-the-rain.jpg" data-size="1081x720"></figure>
 <figure data-file-name="anders-climbing.jpg" data-size="720x1081"></figure>
 <figure data-file-name="campfire-at-night-1.jpg" data-size="1086x720"></figure>
 <figure data-file-name="campfire-at-night-2.jpg" data-size="1081x720"></figure>
 <figure data-file-name="campfire-at-night-closeup-1.jpg" data-size="1081x720"></figure>
 <figure data-file-name="campfire-at-night-closeup-2.jpg" data-size="1081x720"></figure>
 <figure data-file-name="community-tent-at-night.jpg" data-size="1086x720"></figure>
 <figure data-file-name="dinner.jpg" data-size="1086x720"></figure>
 <figure data-file-name="dishwashing.jpg" data-size="1081x720"></figure>
 <figure data-file-name="emma-climbing.jpg" data-size="1081x720"></figure>
 <figure data-file-name="epicness.jpg" data-size="1081x720"></figure>
 <figure data-file-name="friends.jpg" data-size="1081x720"></figure>
 <figure data-file-name="hair-wash.jpg" data-size="1081x720"></figure>
 <figure data-file-name="harmonica.jpg" data-size="2048x1363"></figure>
 <figure data-file-name="kids.jpg" data-size="1086x720"></figure>
 <figure data-file-name="kylskap-problemet.jpg" data-size="1081x720"></figure>
 <figure data-file-name="malin-climbing.jpg" data-size="720x1081"></figure>
 <figure data-file-name="meadow.jpg" data-size="1081x720"></figure>
 <figure data-file-name="saturday-night-1.jpg" data-size="1086x720"></figure>
 <figure data-file-name="saturday-night-2.jpg" data-size="1086x720"></figure>
 <figure data-file-name="slackline.jpg" data-size="1081x720"></figure>
 <figure data-file-name="spotting.jpg" data-size="1081x720"></figure>
 </div>
 */

CBR.Services.Gallery = P(function(c) {
    c.init = function(thumbDirectory, fullSizeDirectory) {
        this.thumbDirectory = thumbDirectory;
        this.fullSizeDirectory = fullSizeDirectory;

        this._initElements();
        this._initAttributes();
        this._initAnchors();
        initPhotoSwipeFromDOM(".cbr-gallery");
    };

    c._initElements = function() {
        this.$wrapper = $(".cbr-gallery");
        this.$figures = this.$wrapper.children();
    };

    c._initAttributes = function() {
        this.$wrapper.prop("itemscope", true);
        this.$wrapper.attr("itemtype", "http://schema.org/ImageGallery");

        this.$figures.each(function() {
            var $figure = $(this);

            $figure.prop("itemscope", true);
            $figure.attr("itemprop", "associatedMedia");
            $figure.attr("itemtype", "http://schema.org/ImageObject");
        });
    };

    c._initAnchors = function() {
        for (var i = 0; i < this.$figures.length; i++) {
            var $figure = $(this.$figures[i]);
            var fileName = $figure.data("fileName");

            $figure.html("<a href=\"" + this.fullSizeDirectory + fileName + "\" itemprop=\"contentUrl\"></a>");
            $figure.children().css("background-image", "url(" + this.thumbDirectory + fileName + ")");
        }
    };
});
