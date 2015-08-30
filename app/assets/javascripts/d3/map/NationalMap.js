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
function parseGeoStats(geography, data) {

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
            console.log(geography);
            console.log(data);
            // var abbr = STATEABBRS[geography.properties.name];
            var abbr = geography.properties.id;
            if (inputData[abbr]) {
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
