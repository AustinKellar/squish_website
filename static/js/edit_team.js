var processTeamMembers = function () {
    let i = 0;
    editController.teamMembers.map((member) => {
        member.index = i++;
    });
};

var getTeamMembers = function () {
    $.getJSON(getTeamMembersUrl, (response) => {
        editController.teamMembers = response.team_members;
        processTeamMembers();
    });
};

setTimeout(() => {
    editController.teamMemberImageChanged = function () {
        var input = event.target;
        var file = input.files[0];
        if (file) {
            var reader = new FileReader();
            reader.addEventListener('load', () => {
                editController.memberImage = reader.result
            }, false);
            reader.readAsDataURL(file);
        }
    };

    editController.updatedTeamMemberImageChanged = function () {
        var input = event.target;
        var file = input.files[0];
        if (file) {
            var reader = new FileReader();
            reader.addEventListener('load', () => {
                editController.updatedMember.image = reader.result
            }, false);
            reader.readAsDataURL(file);
        }
    };

    editController.saveTeamMember = function () {
        if (confirm('Are you sure you want to add a new team member?')) {
            editController.showSpinner = true;
            var newMember = {
                name: editController.memberName,
                title: editController.memberTitle,
                image: editController.memberImage,
                bio: editController.memberBio,
                portfolio: editController.memberPortfolio,
                github: editController.memberGithub,
                soundcloud: editController.memberSoundcloud,
                itchio: editController.memberItchio,
                linkedin: editController.memberLinkedin
            };

            $.post(saveTeamMemberUrl, newMember, (response) => {
                newMember.id = response.id;
                editController.teamMembers.push(newMember);
                processTeamMembers();
                editController.showSpinner = false;
                window.location.href = window.location.href;
            });
        }
    };

    editController.updateTeamMember = function () {
        if (confirm('Are you sure you want to change this team member?')) {
            editController.showSpinner = true;
            var member = editController.updatedMember;
            $.post(updateTeamMemberUrl, {
                id: member.id,
                name: member.name,
                title: member.title,
                image: member.image,
                bio: member.bio,
                portfolio: member.portfolio,
                github: member.github,
                soundcloud: member.soundcloud,
                itchio: member.itchio,
                linkedin: member.linkedin
            }, (response) => {
                processTeamMembers();
                editController.showSpinner = false;
            });
        }
    };

    editController.deleteTeamMember = function (index) {
        if (confirm('Are you sure you want to delete this team member?')) {
            editController.showSpinner = true;
            var member = editController.teamMembers[index];
            $.post(deleteTeamMemberUrl, { id: member.id }, (response) => {
                editController.teamMembers.splice(index, 1);
                processTeamMembers();
                editController.showSpinner = false;
            });
        }
    };

    getTeamMembers();
}, 500);