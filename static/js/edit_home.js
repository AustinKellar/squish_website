
var retrieveHomeData = function() {
    $.getJSON(getHomePageAssetsUrl, (response) => {
        editController.homePageAssets = response.home_page_assets;
        editController.logo = response.home_page_assets.logo;
        editController.titleScreenshot = response.home_page_assets.screenshot;
        editController.trailerUrl = response.home_page_assets.trailer_url;
        editController.description = response.home_page_assets.description;
    });
};

setTimeout(() => {
    editController.logoChanged = function(event) {
        var input = event.target;
        var file = input.files[0];
        if (file) {
            var reader = new FileReader();
            reader.addEventListener('load', () => {
                editController.logo = reader.result
            }, false);
            reader.readAsDataURL(file);
        }
    };
    
    editController.saveLogo = function() {
        editController.showSpinner = true;
        $.post(saveLogoUrl, {
            id: editController.homePageAssets.id,
            logo: editController.logo
        }, (response) => {
            editController.showSpinner = false;
        });
    };
    
    editController.titleScreenshotChanged = function(event) {
        var input = event.target;
        var file = input.files[0];
        if (file) {
            var reader = new FileReader();
            reader.addEventListener('load', () => {
                editController.titleScreenshot = reader.result;
            }, false);
            reader.readAsDataURL(file);
        }
    };
    
    editController.saveTitleScreenshot = function(event) {
        editController.showSpinner = true;
        $.post(saveTitleScreenshotUrl, {
            id: editController.homePageAssets.id,
            screenshot: editController.titleScreenshot
        }, (response) => {
            editController.showSpinner = false;
        })
    };
    
    editController.saveDescription = function() {
        editController.showSpinner = true;
        $.post(saveDescriptionUrl, {
            id: editController.homePageAssets.id,
            description: editController.description
        }, (response) => {
            editController.showSpinner = false;
        });
    }
    
    editController.saveTrailer = function() {
        editController.showSpinner = true;
        $.post(saveTrailerUrl, {
            id: editController.homePageAssets.id,
            trailer_url: editController.trailerUrl
        }, (response) => {
            editController.showSpinner = false;
        });
    };

    retrieveHomeData();
}, 500);