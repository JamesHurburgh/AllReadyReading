requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app'
    },
    shim: {
        'responsivevoice': {
            //Once loaded, use the global 'ResponsiveVoice' as the
            //module value.
            exports: 'ResponsiveVoice'
        }
    }
});

// Start the main app logic.
requirejs(['jquery', 'app/common', 'app/profiles'],
    function($, common, profiles) {

        loadProfileList = function() {
            var profileList = getLocalProfiles();
            $("#usersDropDownList").empty();
            $("#listOfProfiles").empty();
            profileList.forEach(function(profile) {
                $("#listOfProfiles").append(profile.Name);

                var profileImage =
                    $("<img/>")
                    .attr("src", "https://robohash.org/" + profile.Name + ".png?size=40x40");
                var profileLink =
                    $("<a class='profileButton'/>")
                    .attr("href", "#" + profile.Name)
                    .append(profile.Name)
                    .append(profileImage);

                $("#usersDropDownList").append($("<li>").append(profileLink));

            });
            
            $(".profileButton").click(function(){
                loadProfile(this.href.split("#")[1]);
            });
        };

        loadProfile = function(profileName){
            setCurrentProfile(profileName);
            loadCurrentUser();
        }

        loadCurrentUser = function() {

            var profile = getCurrentProfile();
            loadProfileList();

            var profileName = profile.Name;
            $("#currentUser").empty();
            $("#currentUser").append(profileName);
            $("#currentUserImg").attr("src", "https://robohash.org/" + profileName + ".png?size=40x40");

        };

        loadProfileList();
        loadCurrentUser();

        $("#addProfileButton").click(function() {
            var profile = getLocalProfile($("#newProfileName").val());
            loadProfileList();
        });
    });