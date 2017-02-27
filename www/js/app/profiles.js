define(["jquery", "store"],
    function($, store) {

        var localProfilesKey = "localProfiles";

        getLocalProfiles = function(){
            if(!store.get(localProfilesKey)){
                store.set(localProfilesKey, []);
            }
            return store.get(localProfilesKey);
        };

        getLocalProfile = function(profileName){
            getLocalProfiles().forEach(function(profile) {
                if(profile.Name == profileName){
                    this.profile = profile;
                }
            }, this);
            var profile = {"Name" : profileName};
            if(!this.profile){
                addProfile(profile);
            }else{
                profile = this.profile;
            }
            return profile;
        };

        addProfile = function(profile) {
            var profileList = getLocalProfiles();
            profileList.push(profile);
            store.set(localProfilesKey, profileList);
        };
    }
);