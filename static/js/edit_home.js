
var retrieveHomeData = function() {
    $.getJSON(getHomePageAssetsUrl, (response) => {
        editController.homePageAssets = response.home_page_assets;
        editController.logo = response.home_page_assets.logo;
        editController.titleScreenshot = response.home_page_assets.screenshot;
        editController.trailerUrl = response.home_page_assets.trailer_url;
        editController.description = response.home_page_assets.description;
    });
};

var logoChanged = function(event) {
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

var saveLogo = function() {
    $.post(saveLogoUrl, {
        id: editController.homePageAssets.id,
        logo: editController.logo
    }, (response) => {
        alert('Success!');
    });
};

var titleScreenshotChanged = function(event) {
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

var saveTitleScreenshot = function(event) {
    $.post(saveTitleScreenshotUrl, {
        id: editController.homePageAssets.id,
        screenshot: editController.titleScreenshot
    }, (response) => {
        alert('Success!');
    })
};

var saveDescription = function() {
    $.post(saveDescriptionUrl, {
        id: editController.homePageAssets.id,
        description: editController.description
    }, (response) => {
        alert('Success!');
    });
}

var saveTrailer = function() {
    $.post(saveTrailerUrl, {
        id: editController.homePageAssets.id,
        trailer_url: editController.trailerUrl
    }, (response) => {
        alert('Success!');
    });
};

retrieveHomeData();