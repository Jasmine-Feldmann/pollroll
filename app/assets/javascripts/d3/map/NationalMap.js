function toolTipHelper(dataSet, num) {
   return "<br>" 
   + "<span class='data-answer'>" 
      + dataSet["responses"][num]["answer"] 
   + ":" + "</span>" + " "
   + "<span class='data-percentage'>" 
      + dataSet["responses"][num]["percentage"] 
   + "</span>" 
   + "<span class='percent-sign'>%</span>"
}
function toolTipTitleHelper(geography, data) {
   return '<div class="hoverinfo">'
   + "<span class='state-name'>" + geography.properties.name + "</span>"
}

function appToDisappRatio(state) {
   console.log("state line 17", state);
   return state["responses"][0]["percentage"] / state["responses"][1]["percentage"];
}
function approvalRatioDeciles(inputData) {
   var allRatios = _.map(inputData, function(state) {
      return appToDisappRatio(state);
   }).sort();
   // console.log("allRatios", allRatios);
   var first = allRatios[0];
   var last = allRatios.slice(-1);
   var difference = last - first;
   return _.range(first, last, difference/10);
}

function assignFillKeys(inputData) {
   var deciles = approvalRatioDeciles(inputData);
   // for (var i = deciles.length - 1; i >= 0; i--) {
   for (var i = 0; i < deciles.length-1; i++) {
      for (state in inputData) {
         console.log("state line 36", state);
         if (deciles[i] <= appToDisappRatio(state) && appToDisappRatio(onlyStates[state]) < deciles[i+1]) {
            state["fillKey"] = "color" + i;
         }

         // switch (true) {
         //   case (deciles[0] <= appToDisappRatio(state) &&  appToDisappRatio(state) < deciles[1]): /* do something */ break;
         //   case (1000 <= val &&  val < 2000): /* do something */ break;
         //   ...
         //   case (29000 <= val &&  val < 30000): /* do something */ break;
         // }

      }
   }
}

function drawDatamap(inputData){
   console.log("inputData",inputData);
   var onlyStates = _.clone(inputData);
   delete onlyStates["US"]
   console.log("approvalRatioDeciles(onlyStates)", approvalRatioDeciles(onlyStates));
   console.log("onlyStates line 57", onlyStates);
   assignFillKeys(onlyStates);
   console.log("onlyStates again", onlyStates);
   // d3.select("body").attr("fill",function() {

   // });

   // var colors = d3.scale.category10();
   // console.log(colors);

   var map = new Datamap({
      data: inputData,
      scope: 'usa',
      element: document.getElementById('map-container'),
      height: 700,
      geographyConfig: {
         // highlightBorderColor: '#bada55',
         highlightBorderColor: '#1D1075',
         highlightBorderWidth: 3,
         highlightFillColor: '#ACE',
         // highlightFillColor: '#FC8D59',
         // highlightFillOpacity: 0.85,
         popupTemplate: function(geography, data) {
            var abbr = geography.id;
            if (inputData[abbr]) {
               // console.log("geography", geography);
               // console.log("data", data);
               return toolTipTitleHelper(geography, data)
               + toolTipHelper(inputData[abbr], 0)
               + toolTipHelper(inputData[abbr], 1)
               + toolTipHelper(inputData[abbr], 2)
               + "<br>sampleImage:" + "<img src='https://thingiverse-production-new.s3.amazonaws.com/renders/ed/21/ea/ac/8d/ray_graphics_thumb_tiny.jpg'>"
               + "</div>"
            }
            else {
               return toolTipTitleHelper(geography, data)   
               + "<br>" + "Insufficient data"
               + "</div>"
            }
         },
      },
      fills: {
         // 'Strongly Disapprove': '#FF4731',
         // 'Disapprove': '#CC4731',
         // 'Approve': '#306596',
         // 'Strongly Approve': '#0065BB',
         // 'Undecided': 'purple',

         // "d5": "rgb(165,0,38)",
         // "d4": "rgb(215,48,39)",
         // "d3": "rgb(244,109,67)",
         // "d2": "rgb(253,174,97)",
         // "d1": "rgb(254,224,139)",
         // "neutral": "rgb(255,255,191)",
         // "a1": "rgb(217,239,139)",
         // "a2": "rgb(166,217,106)",
         // "a3": "rgb(102,189,99)",
         // "a4": "rgb(26,152,80)",
         // "a5": "rgb(0,104,55)",

         "color0": "rgb(84,48,5)",
         "color1": "rgb(140,81,10)",
         "color2": "rgb(191,129,45)",
         "color3": "rgb(223,194,125)",
         "color4": "rgb(246,232,195)",
         "color5": "rgb(245,245,245)",
         "color6": "rgb(199,234,229)",
         "color7": "rgb(128,205,193)",
         "color8": "rgb(53,151,143)",
         "color9": "rgb(1,102,94)",
         "color10": "rgb(0,60,48)",
         defaultFill: '#AAA'
      },
   });

   map.labels();
}
