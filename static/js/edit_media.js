var processMedia = function() {
    var i = 0;
    editController.screenshots.map((screenshot) => {
        screenshot.index = i++;
    });
};

var getMediaData = function() {
    $.getJSON(getScreenshotsUrl, (response) => {
        editController.screenshots = response.screenshots;
        processMedia();
    });
};

var screenshotChanged = function(event) {
    var input = event.target;
    var file = input.files[0];
    if (file) {
        var reader = new FileReader();
        reader.addEventListener('load', () => {
            editController.selectedScreenshot = reader.result
        }, false);
        reader.readAsDataURL(file);
    }
};

var saveScreenshot = function() {
    $.post(saveScreenshotUrl, {
        screenshot: editController.selectedScreenshot,
        caption: editController.caption
    }, (response) => {
        editController.screenshots.push({
            img_src: editController.selectedScreenshot, 
            caption: editController.caption, 
            id: response.id
        });
        processData();
        editController.selectedScreenshot = undefined;
        editController.caption = undefined;
        alert('Success!');
    });
};

var deleteScreenshot = function(index) {
    var screenshot = editController.screenshots[index];
    $.post(deleteScreenshotUrl, {
        id: screenshot.id
    }, (response) => {
        editController.screenshots.splice(index, 1);
        processData();
        alert('success!');
    });
};

getMediaData();