function appToDisappRatio(state) {
   return state["responses"][0]["percentage"] / state["responses"][1]["percentage"];
}

function assignFillKeys(inputData) {
   var levels = [0.5,0.75,1,1.25,1.5,1.75,2,2.25]
   for (var i = 0; i < levels.length-1; i++) {
      for (state in inputData) {
         var ratio = appToDisappRatio(inputData[state])
         if (ratio < levels[0]) {
            inputData[state]["fillKey"] = "color1";
         }
         else if (levels[i] <= ratio && ratio < levels[i+1]) {
            inputData[state]["fillKey"] = "color" + (i+2);
         }
         else if (levels.slice(-1) < ratio) {
            inputData[state]["fillKey"] = "color9";
         }
      }
   }
}

function assignFineGrainedFillKeys(inputData) {
   _.each(inputData, function(state, stateAbbrev) {
      state.fillKey = "color" + stateAbbrev;
   });
   console.log("line 27", inputData);
}


function makeRatioAProperty(inputData) {
   for (state in inputData) {
      inputData[state]["appToDisappRatio"] = appToDisappRatio(inputData[state])
   }
}

function drawDatamap(inputData){
   var onlyStates = _.clone(inputData);
   delete onlyStates["US"]
   var colorScheme = fineGrainedColorScheme(onlyStates);
   makeRatioAProperty(onlyStates);
   assignFineGrainedFillKeys(onlyStates);

   var map = new Datamap({
      data: onlyStates,
      scope: 'usa',
      element: document.getElementById('map-container'),
      height: 700,
      geographyConfig: {
         highlightBorderColor: '#1D1075',
         highlightBorderWidth: 3,
         highlightFillColor: '#ACE',
         popupTemplate: function(geography, data) {
            var abbr = geography.id;
            if (onlyStates[abbr]) {
               return toolTipTitleHelper(geography, data)
               + toolTipHelper(onlyStates[abbr], 0)
               + toolTipHelper(onlyStates[abbr], 1)
               + toolTipRatioHelper(onlyStates[abbr])
               + toolTipHelper(onlyStates[abbr], 2)
               + "</div>"
            }
            else {
               return toolTipTitleHelper(geography, data)   
               + "<br>" + "Insufficient data"
               + "</div>"
            }
         },
      },
      fills: colorScheme
   });
   map.labels();
}