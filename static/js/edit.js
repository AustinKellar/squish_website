var processData = function() {
    var i = 0;
    editController.screenshots.map((screenshot) => {
        screenshot.index = i++;
    });
    var j = 0;
    editController.playtests.map((playtest) => {
        playtest.index = j++;
    });
};

var retrieveInitialData = function() {
    $.getJSON(getLogoUrl, (response) => {
        editController.logo = response.logo;
        editController.logo_src = response.logo.logo
    });

    $.getJSON(getScreenshotUrl, (response) => {
        editController.screenshot = response.screenshot;
    });

    $.getJSON(getTrailerUrl, (response) => {
        editController.trailerUrl = response.trailer_url;
    });

    $.getJSON(getDescriptionUrl, (response) => {
        editController.description = response.description;
    });

    $.getJSON(getScreenshotsUrl, (response) => {
        editController.screenshots = response.screenshots;
        processData();
    });

    $.getJSON(getPlaytestsUrl, (response) => {
        editController.playtests = response.playtests;
        processData()
    });
};

var logoChanged = function(event) {
    var input = event.target;
    var file = input.files[0];
    if (file) {
        var reader = new FileReader();
        reader.addEventListener('load', () => {
            editController.logo.logo = reader.result;
            editController.logo_src = reader.result
        }, false);
        reader.readAsDataURL(file);
    }
};

var saveLogo = function() {
    $.post(saveLogoUrl, {
        id: editController.logo.id,
        logo: editController.logo.logo
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
            editController.screenshot = reader.result;
        }, false);
        reader.readAsDataURL(file);
    }
};

var saveTitleScreenshot = function(event) {
    $.post(saveTitleScreenshotUrl, {
        id: editController.logo.id,
        screenshot: editController.screenshot
    }, (response) => {
        alert('Success!');
    })
};

var saveDescription = function() {
    $.post(saveDescriptionUrl, {
        id: editController.logo.id,
        description: editController.description
    }, (response) => {
        alert('Success!');
    });
}

var saveTrailer = function() {
    $.post(saveTrailerUrl, {
        id: editController.logo.id,
        trailer_url: editController.trailerUrl
    }, (response) => {
        alert('Success!');
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

var playtestChanged = function(event) {
    var input = event.target;
    var file = input.files[0];
    if (file) {
        var reader = new FileReader();
        reader.addEventListener('load', () => {
            editController.playtestImage = reader.result
        }, false);
        reader.readAsDataURL(file);
    }
};

var savePlaytest = function() {
    var newPlaytest = {
        title: editController.playtestTitle,
        image: editController.playtestImage,
        playtest_date: editController.playtestDate,
        playtest_time: editController.playtestTime,
        playtest_location: editController.playtestLocation,
        tagline: editController.playtestTagline,
        description: editController.playtestDescription
    };
    $.post(savePlaytestUrl, newPlaytest, (response) => {
        newPlaytest.id = response.id;
        editController.playtests.unshift(newPlaytest);
        processData();
        alert('Success!');
    });
};

var deletePlaytest = function(index) {
    var playtest = editController.playtests[index];
    $.post(deletePlaytestUrl, { id: playtest.id }, (response) => {
        editController.playtests.splice(index, 1);
        processData();
        alert('Success!');
    });
};

var editController = new Vue({
    el: '#edit',
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        logo: undefined,
        logo_src: undefined,
        description: undefined,
        screenshot: undefined,
        caption: undefined,
        trailerUrl: undefined,
        screenshots: [],
        selectedScreenshot: undefined,
        playtests: [],
        playtestTitle: undefined,
        playtestImage: undefined,
        playtestDate: undefined,
        playtestTime: undefined,
        playtestLocation: undefined,
        playtestTagline: undefined,
        playtestDescription: undefined
    },
    methods: {
        logoChanged: logoChanged,
        saveLogo: saveLogo,
        saveTrailer: saveTrailer,
        saveScreenshot: saveScreenshot,
        savePlaytest: savePlaytest,
        deletePlaytest: deletePlaytest,
        titleScreenshotChanged: titleScreenshotChanged,
        saveTitleScreenshot: saveTitleScreenshot,
        saveDescription: saveDescription
    }
});

retrieveInitialData();