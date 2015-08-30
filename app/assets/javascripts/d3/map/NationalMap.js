function toolTipHelper(dataSet, num) {
   return "<br>" 
   + "<span class='data-answer'>" 
      + dataSet["responses"][num]["answer"] 
   + ":" + "</span>" + " "
   + "<span class='data-percentage'>" 
      + dataSet["responses"][num]["percentage"] 
   + "</span>" + " "
   + "%"
}
function toolTipTitleHelper(geography, data) {
   return '<div class="hoverinfo">'
   + "<span class='state-name'>" + geography.properties.name + "</span>"
}
var StateStats = function(geography, data) {
   this.id = geography.id;
   this.approve = data.responses[0].answer;
   this.approvePercentage = data.responses[0].percentage;
   this.disapprove = data.responses[1].answer;
   this.disapprovePercentage = data.responses[1].percentage;
   this.undecided = data.responses[2].answer;
   this.undecidedPercentage = data.responses[2].percentage;
}

function drawDatamap(inputData){
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
               var stats = new StateStats(geography, data);
               console.log(stats);
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
         'Disapprove': '#CC4731',
         'Approve': '#306596',
         'Undecided': 'purple',
         defaultFill: '#AAA'
      },
   });

   map.labels();
}
