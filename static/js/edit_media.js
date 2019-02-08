var processMedia = function() {
    var i = 0;
    editController.allMedia.map((media) => {
        media.index = i++;
    });
};

var getMediaData = function() {
    $.getJSON(getAllMediaUrl, (response) => {
        editController.allMedia = response.all_media;
        processMedia();
        editController.showSpinner = false;
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
    
    editController.mediaPictureChanged = function(event) {
        var input = event.target;
        var file = input.files[0];
        if (file) {
            var reader = new FileReader();
            reader.addEventListener('load', () => {
                editController.mediaPicture = reader.result
            }, false);
            reader.readAsDataURL(file);
        }
    };
    
    editController.saveMedia = function() {
        editController.showSpinner = true;
        $.post(saveMediaUrl, {
            media: editController.mediaPicture,
            caption: editController.mediaCaption
        }, (response) => {
            editController.allMedia.push({
                img_src: editController.mediaPicture, 
                caption: editController.mediaCaption, 
                id: response.id
            });
            processMedia();
            editController.mediaPicture = undefined;
            editController.mediaCaption = undefined;
            editController.showSpinner = false;
        });
    };
    
    editController.deleteMedia = function(index) {
        editController.showSpinner = true;
        var media = editController.allMedia[index];
        $.post(deleteMediaUrl, {
            id: media.id
        }, (response) => {
            editController.allMedia.splice(index, 1);
            processMedia();
            editController.showSpinner = false;
        });
    };

    editController.specificMediaChanged = function(index, event) {
        var input = event.target;
        var file = input.files[0];
        if (file) {
            var reader = new FileReader();
            reader.addEventListener('load', () => {
                editController.allMedia[index].img_src = reader.result
            }, false);
            reader.readAsDataURL(file);
        }
    };

    editController.updateMedia = function(index) {
        editController.showSpinner = true;
        var media = editController.allMedia[index];
        $.post(updateMediaUrl, {
            id: media.id,
            media: media.img_src,
            caption: media.caption
        }, (response) => {
            processMedia();
            editController.showSpinner = false;
        });
    };

    getMediaData();
}, 500);