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
requirejs(['jquery', 'vue', 'app/common', "store", "app/languageCodes", "app/wordDao"],
    function($, Vue, common, store, languageCodes, wordDao) {

        var app = new Vue({
            el: '#app',
            data: {
                setsCount: 0,
                sets: []
            }
        });

        Vue.component('my-component', {
            template: '<span>{{ message }}</span>',
            data: {
                message: 'hello'
            }
        });

        app.sets = wordDao.getSetNames();
        wordDao.getSetNames().then(
            function(setNames) {
                setNames.sets.forEach(function(set) {

                    app.setsCount += 1;

                    var setDisplay = $("<div>")
                        .append(
                            $("<h3>")
                            .append(set.setName)
                            .attr("data-toggle", "collapse")
                            .attr("data-target", "#" + set.setCode)
                        )
                        .attr("class", "panel panel-primary");

                    var content = $("<div>")
                        .attr("id", set.setCode)
                        .attr("class", "collapse");

                    wordDao.getWordListNames(set.setName).then(
                        function(wordListNames) {
                            content.append(wordListNames[0]);
                            console.log("Word list length:" + wordListNames.length);

                        });

                    setDisplay.append(content);

                    $("#sets").append(setDisplay);
                }, this);
            }
        );

    }
);