var processMedia = function() {
    var i = 0;
    editController.allMedia.map((screenshot) => {
        screenshot.index = i++;
    });
};

var getMediaData = function() {
    $.getJSON(getScreenshotsUrl, (response) => {
        editController.allMedia = response.screenshots;
        processMedia();
    });
};

var mediaPictureChanged = function(event) {
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

var saveMedia = function() {
    $.post(saveScreenshotUrl, {
        screenshot: editController.mediaPicture,
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
        alert('Success!');
    });
};

var deleteMedia = function(index) {
    var media = editController.allMedia[index];
    $.post(deleteScreenshotUrl, {
        id: media.id
    }, (response) => {
        editController.allMedia.splice(index, 1);
        processMedia();
        alert('success!');
    });
};

getMediaData();