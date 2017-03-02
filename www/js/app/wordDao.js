define(["jquery"],
    function($) {
        return {
            getSetNames: function() {

                return $.getJSON("./js/app/data/sets.json", function(data) {
                    var items = [];
                    $.each(data, function(key, val) {
                        items.push(val.setName);
                    });
                    return items;
                });
            },

            getSet: function(setName) {
                this.getSetNames().then(function(setNames) {
                    setNames.sets.forEach(function(set) {
                        if (set.setName === setName) {
                            return;
                        }
                    });
                });
            },

            getWordListNames: function(setName) {
                var wordListNames = new ["one", "two", "three"]();

                return wordListNames;
            },

            getWordList: function(setName, wordListName) {
                var wordList = null;

                return wordList;
            }
        };
    }
);