var retrieveInitialData = function() {
    $.getJSON(getLogoUrl, (response) => {
        editController.logo = response.logo;
        console.log(response.logo);
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

var editController = new Vue({
    el: '#edit',
    delimiters: ['${', '}'],
    unsafeDelimiters: ['!{', '}'],
    data: {
        logo: undefined,
        logoSelector: undefined
    },
    methods: {
        logoChanged: logoChanged
    }
});

retrieveInitialData();