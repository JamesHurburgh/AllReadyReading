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

        var currentProfile = getCurrentProfile();
        $("#userName").append(currentProfile.Name);
        $("#voice").val(currentProfile.voiceName);

        var words = Object.getOwnPropertyNames(currentProfile.wordContainer);
        
        $.each(words, function(index, word) {
            var wordStats = currentProfile.wordContainer[word];
            
            var wordDetails = $("<div>")
            // var wordDetails = $("<a href='#' aria-controls='home' role='tab' data-toggle='tab'>")
                //.attr("class", "nav-link")
                .append($("<h4>").append(word));
            
            var activityTypes = ["Find", "Spell"];
            activityTypes.forEach(function(activity) {
                var activityStats = wordStats[activity];
                if(!activityStats){

                }else{
                    var activityDetails = $("<div>");
                    activityDetails.append(
                        $("<h5>")
                        .append(activity));
                        var stats = $("<div class='progress progress-striped'>");
                        var correctPercent = activityStats.correctCount/(activityStats.correctCount + activityStats.incorrectCount)*100;
                        var correctBar = $("<div class='progress-bar progress-bar-success'>")
                        .append("Correct: " + activityStats.correctCount)
                        .attr("style", "width: "+correctPercent+"%");
                        
                        var incorrectPercent = activityStats.incorrectCount/(activityStats.correctCount + activityStats.incorrectCount)*100;
                        var incorrectBar = $("<div class='progress-bar progress-bar-danger'>")
                        .append("Incorrect: " + activityStats.incorrectCount)
                        .attr("style", "width: "+incorrectPercent+"%");
                        
                        stats.append(correctBar);
                        stats.append(incorrectBar);
                    activityDetails.append(stats);

                    wordDetails.append(activityDetails);
                }

            }, this);
            wordDetails.append("<hr>");
            //<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>
            $("#wordStatistics").append(wordDetails);
            
        });



    });