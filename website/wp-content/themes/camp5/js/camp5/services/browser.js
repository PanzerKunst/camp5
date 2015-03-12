CBR.Services.Browser = {
    addUserAgentAttributeToHtmlTag: function() {
        document.documentElement.setAttribute("data-useragent", navigator.userAgent);
    }
};
