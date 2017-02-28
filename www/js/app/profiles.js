define(["jquery", "store"],
    function($, store) {

        var keys = {
            currentProfileName : 'currentProfileName',
            localProfileList : "localProfiles"
        };
        
        getLocalProfiles = function(){
            if(!store.get(keys.localProfileList)){
                store.set(keys.localProfileList, []);
            }
            return store.get(keys.localProfileList);
        };

        getLocalProfile = function(profileName){
            var localProfile = null;
            getLocalProfiles().forEach(function(profile) {
                if(profile.Name == profileName){
                    localProfile = profile;
                }
            }, this);
            if(!localProfile){
                localProfile = {"Name" : profileName};
                addProfile(localProfile);
            }
            return localProfile;
        };

        addProfile = function(profile) {
            var profileList = getLocalProfiles();
            profileList.push(profile);
            store.set(keys.localProfileList, profileList);
        };

        getCurrentProfile = function(){
            var profileName = store.get(keys.currentProfileName);
            if(!profileName){
                profileName = "Guest";
            }
            return getLocalProfile(profileName);
        }

        setCurrentProfile = function(profileName){
            store.set(keys.currentProfileName, profileName);
        }
    }
);