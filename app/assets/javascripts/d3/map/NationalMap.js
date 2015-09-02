var img = new Image();
img.onload = function() {
    ctx.drawImage(img, 0, 0);
}
img.src = "http://upload.wikimedia.org/wikipedia/commons/d/d2/Svg_example_square.svg";



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

function makeRatioAProperty(inputData) {
   for (state in inputData) {
      inputData[state]["appToDisappRatio"] = appToDisappRatio(inputData[state])
   }
}

function drawDatamap(inputData){
   var onlyStates = _.clone(inputData);
   delete onlyStates["US"]
   makeRatioAProperty(onlyStates);
   assignFillKeys(onlyStates);   

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
            // console.log("geography",geography)
            // console.log("data",data)
            var abbr = geography.id;
            if (onlyStates[abbr]) {
               // console.log(onlyStates);
               // console.log(onlyStates[abbr]["responses"][0]["answer"], onlyStates[abbr]["responses"][0]["percentage"]);

               // _.map(onlyStates, function(state) {
               //    return new StateData()
               // })

               var stateData = getDataForPieGraph(onlyStates[abbr]);
               pieGraph(stateData);
               // console.log(stateData);

               // var x = "<br>sampleImage:" + "<img src='https://thingiverse-production-new.s3.amazonaws.com/renders/ed/21/ea/ac/8d/ray_graphics_thumb_tiny.jpg'>"
               var x = "<br>sampleImage:" + "<img src='#pie-chart-container'>"
               return x
               // return toolTipTitleHelper(geography, data)
               // + toolTipHelper(onlyStates[abbr], 0)
               // + toolTipHelper(onlyStates[abbr], 1)
               // + toolTipRatioHelper(onlyStates[abbr])
               // + toolTipHelper(onlyStates[abbr], 2)
               // // + "<br>sampleImage:" + "<img src='https://thingiverse-production-new.s3.amazonaws.com/renders/ed/21/ea/ac/8d/ray_graphics_thumb_tiny.jpg'>"
               // // + "<svg id='pie-graph' width='300' height='300'></svg>"
               // // + pieGraph(stateData);
               // + "</div>"
            }
            else {
               return toolTipTitleHelper(geography, data)   
               + "<br>" + "Insufficient data"
               + "</div>"
            }
         },
      },
      fills: NINECOLORSCHEME
   });
   map.labels();
}