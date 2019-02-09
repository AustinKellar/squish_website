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
        if (confirm('Are you sure you want to delete this picture?')) {
            editController.showSpinner = true;
            var media = editController.allMedia[index];
            $.post(deleteMediaUrl, {
                id: media.id
            }, (response) => {
                editController.allMedia.splice(index, 1);
                processMedia();
                editController.showSpinner = false;
            });
        }
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
        if (confirm('Are you sure you want to change this picture?')) {
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
        }
    };

    getMediaData();
}, 500);