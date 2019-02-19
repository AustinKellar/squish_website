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

setTimeout(() => {
    editController.playtestChanged = function(event) {
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
    
    editController.savePlaytest = function() {
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
    
    editController.deletePlaytest = function(index) {
        if (confirm('Are you sure you want to delete this playtest?')) {
            editController.showSpinner = true;
            var playtest = editController.playtests[index];
            $.post(deletePlaytestUrl, { id: playtest.id }, (response) => {
                editController.playtests.splice(index, 1);
                processPlaytests();
                editController.showSpinner = false;
            });
        }
    };

    editController.updatedPlaytestChanged = function(event) {
        var input = event.target;
        var file = input.files[0];
        if (file) {
            var reader = new FileReader();
            reader.addEventListener('load', () => {
                editController.updatedPlaytest.image = reader.result
            }, false);
            reader.readAsDataURL(file);
        }
    };

    editController.updatePlaytest = function() {
        if (confirm('Are you sure you want to change this playtest?')) {
            editController.showSpinner = true;
            var playtest = editController.updatedPlaytest;
            $.post(updatePlaytestUrl, {
                id: playtest.id,
                title: playtest.title,
                image: playtest.image,
                playtest_date: playtest.playtest_date,
                playtest_time: playtest.playtest_time,
                playtest_location: playtest.playtest_location,
                tagline: playtest.tagline,
                description: playtest.description
            }, (response) => {
                processPlaytests();
                editController.showSpinner = false;
                window.location.href = window.location.href;
            });
        }
    };

    retrievePlaytestData();
}, 500);
