function drawDatamap(inputData){
   var map = new Datamap({
      scope: 'usa',
      element: document.getElementById('map-container'),
      height: 500,
      geographyConfig: {
        highlightBorderColor: '#bada55',
      popupTemplate: function(geography, data) {
         var abbr = STATEABBRS[geography.properties.name];
         return '<div class="hoverinfo">'
         + geography.properties.name
         + "<br>" + inputData[abbr]["responses"][0]["answer"] + " " + inputData[abbr]["responses"][0]["percentage"] + "%"
         + "<br>" + inputData[abbr]["responses"][1]["answer"] + " " + inputData[abbr]["responses"][1]["percentage"] + "%"
         + "<br>" + inputData[abbr]["responses"][2]["answer"] + " " + inputData[abbr]["responses"][2]["percentage"] + "%"
         + "<br>sampleImage:" + "<img src='https://thingiverse-production-new.s3.amazonaws.com/renders/ed/21/ea/ac/8d/ray_graphics_thumb_tiny.jpg'>"
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