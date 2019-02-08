var processPlaytests = function() {
    var i = 0;
    editController.playtests.map((playtest) => {
        playtest.index = i++;
    });
};

var retrievePlaytestData = function() {
    $.getJSON(getPlaytestsUrl, (response) => {
        editController.playtests = response.playtests;
        processPlaytests()
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
    editController.showSpinner = true;
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
        processPlaytests();
        editController.showSpinner = false;
    });
};

var deletePlaytest = function(index) {
    editController.showSpinner = true;
    var playtest = editController.playtests[index];
    $.post(deletePlaytestUrl, { id: playtest.id }, (response) => {
        editController.playtests.splice(index, 1);
        processPlaytests();
        editController.showSpinner = false;
    });
};

retrievePlaytestData();