function toolTipHelper(dataSet, num) {
   return "<br>" 
   + "<span class=data-answer>" 
      + dataSet["responses"][num]["answer"] 
   + "</span>" + " "
   + "<span class=data-percentage>" 
      + dataSet["responses"][num]["percentage"] 
   + "</span>" + " "
   + "%"
}

function drawDatamap(inputData){
   var map = new Datamap({
      scope: 'usa',
      element: document.getElementById('map-container'),
      height: 700,
      geographyConfig: {
        highlightBorderColor: '#bada55',
      popupTemplate: function(geography, data) {
         var abbr = STATEABBRS[geography.properties.name];
         if (inputData[abbr]) {
            return '<div class="hoverinfo">'
            + geography.properties.name
            + toolTipHelper(inputData[abbr], 0)
            + toolTipHelper(inputData[abbr], 1)
            + toolTipHelper(inputData[abbr], 2)
            + "<br>sampleImage:" + "<img src='https://thingiverse-production-new.s3.amazonaws.com/renders/ed/21/ea/ac/8d/ray_graphics_thumb_tiny.jpg'>"
         }
         else {
            return '<div class="hoverinfo">'
            + geography.properties.name
            + "<br>" + "Insufficient data"
         }
      },
      highlightBorderWidth: 3
      },

      fills: {
         'Disapprove': '#CC4731',
         'Approve': '#306596',
         'Undecided': 'purple',
         defaultFill: '#AAA'
      },
      data: inputData
   });

   map.labels();
}
