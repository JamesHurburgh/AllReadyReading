define(["jquery", "app/languageCodes", "app/wordlists"],
    function($, languageCodes, wordlists) {

        // ResponsiveVoice = responsivevoice;
        // languageCodes = languageCodes;
        // wordlists = wordlists;
        workingList = [];
        //selectedSightWordSetList = [];

        loadSetListList = function() {
            for (var i = 0; i < wordlists.length; i++) {
                wordlists[wordlists[i].setListName] = wordlists[i];
                $("#setListsSelection").append("<option value='" + i + "'>" + wordlists[i].setListName + "</option>");

                var setListName =
                    $("<a href='#'>")
                    .attr("href", "#" + wordlists[i].setListName)
                    .append(wordlists[i].setListName);
                setListName.click(function() { loadSetFromAnchor(this); });
                $("#setListsDropDownList").append($("<li>").append(setListName));
            }
        };

        loadSetFromAnchor = function(anchor) {
            var setName = anchor.href.split("#")[1];
            loadSetFromList(wordlists[setName]);
        };

        loadSetListFromHash = function() {
            var setName = window.location.hash.split("#")[1];
            loadSetFromList(wordlists[setName]);
        };

        loadSetFromList = function(setList) {
            clearWord();
            $("#wordList").empty();
            $("#setList").empty();
            $("#setListHeader").empty();
            $("#wordListHeader").empty();
            selectedSightWordSetList = setList.sets;

            $("#setListHeader").append(setList.setListName);
            $("#wordListHeader").append("-");

            for (var i = 0; i < selectedSightWordSetList.length; i++) {
                $("#setList").append("<div class='set nav nav-pill' style='border: 2px solid #" + selectedSightWordSetList[i].colorHex + "; border-radius: 5px;' collectionIndex='" + i + "' id='" + selectedSightWordSetList[i].setName + "_set'>" + selectedSightWordSetList[i].setName + "</div>");
                $("#" + selectedSightWordSetList[i].setName + "_set").on("click", function() {
                    loadWordList(this.attributes.collectionindex.value);
                });
            }
        }

        loadWordList = function(index) {
            clearWord();
            $("#wordList").empty();
            $("#wordListHeader").empty();
            var set = selectedSightWordSetList[index];
            $("#wordContainer").css("border-radius", "10px");
            $("#wordContainer").css("border", "4px solid white");
            $("#wordContainer").css("border", "4px solid #" + set.colorHex);
            $("#wordListHeader").append(set.setName);
            for (var i = 0; i < set.wordList.length; i++) {
                $("#wordList").append("<div id='" + set.wordList[i] + "' class='word' word='" + set.wordList[i] + "'>" + set.wordList[i] + "</div>");
            }
            $(".word").click(function() { sayThisWord(id); });
        }

        loadVoiceList = function() {
            //Populate voice selection dropdown
            var voicelist = responsiveVoice.getVoices();

            var vselect = $("#voiceselection");

            $.each(voicelist, function() {
                vselect.append($("<option />").val(this.name).text(this.name));
            });
        }

        sayWord = function() {
            sayThisWord($("#word").html());
        }

        sayThisWord = function(word) {
            responsiveVoice.speak(word, $('#voiceselection').val());
        }

        displayRandom = function() {
            var previous = $("#word").html();
            var word = previous;
            while (previous == word) {
                var index = Math.floor($(".word").length * Math.random());
                word = $(".word")[index].attributes.word.value;
            }
            displayWord(word);
        }

        displayWord = function(word) {
            $("#word").empty();
            $("#word").append(word);
        }

        clearWord = function() {
            $("#word").empty();
            $("#word").append("-");
        }

        initialise = function() {
            loadSetListList();
            loadVoiceList();

            $("#pickRandomWordButton").click(function() { displayRandom(); });
            $("#sayWordButton").click(function() { sayWord(); });
            $("#word").click(function() { sayWord(); });

            $("#setListsSelection").change(function() { loadSetList(); });
            loadSetFromList(wordlists[0]);
        };

        initialise();

    });