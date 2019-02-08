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

var deleteMedia = function(index) {
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

getMediaData();