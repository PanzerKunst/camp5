"use strict";

/* Content of the Gallery page in Wordpress:
 <ul class="cbr-gallery">
 <li data-file-name="acroyoga.jpg"></li>
 <li data-file-name="after-dinner.jpg"></li>
 <li data-file-name="after-the-rain.jpg"></li>
 <li data-file-name="anders-climbing.jpg"></li>
 <li data-file-name="campfire-at-night-1.jpg"></li>
 <li data-file-name="campfire-at-night-2.jpg"></li>
 <li data-file-name="campfire-at-night-closeup-1.jpg"></li>
 <li data-file-name="campfire-at-night-closeup-2.jpg"></li>
 <li data-file-name="community-tent-at-night.jpg"></li>
 <li data-file-name="dinner.jpg"></li>
 <li data-file-name="dishwashing.jpg"></li>
 <li data-file-name="emma-climbing.jpg"></li>
 <li data-file-name="epicness.jpg"></li>
 <li data-file-name="friends.jpg"></li>
 <li data-file-name="hair-wash.jpg"></li>
 <li data-file-name="harmonica.jpg"></li>
 <li data-file-name="kids.jpg"></li>
 <li data-file-name="kylskap-problemet.jpg"></li>
 <li data-file-name="malin-climbing.jpg"></li>
 <li data-file-name="meadow.jpg"></li>
 <li data-file-name="saturday-night-1.jpg"></li>
 <li data-file-name="saturday-night-2.jpg"></li>
 <li data-file-name="slackline.jpg"></li>
 <li data-file-name="spotting.jpg"></li>
 </ul>
 */

CBR.Services.Gallery = P(function(c) {
    c.init = function(thumbDirectory, fullSizeDirectory) {
        this.thumbDirectory = thumbDirectory;
        this.fullSizeDirectory = fullSizeDirectory;

        this._initElements();
        this._initBackgrounds();
        this._initAnchors();
    };

    c._initElements = function() {
        this.$listItems = $(".cbr-gallery").children();
    };

    c._initBackgrounds = function() {
        for (var i = 0; i < this.$listItems.length; i++) {
            var $li = $(this.$listItems[i]);
            var fileName = $li.data("fileName");

            $li.css("background-image", "url(" + this.thumbDirectory + fileName + ")");
        }
    };

    c._initAnchors = function() {
        for (var i = 0; i < this.$listItems.length; i++) {
            var $li = $(this.$listItems[i]);
            var fileName = $li.data("fileName");

            $li.html("<a href=\"" + this.fullSizeDirectory + fileName + "\"></a>");
        }
    };
});
