// $(document).ready({
//    alert("hello");
//    // $("body").prepend("div").css("background-color","red");
// }); 


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
var StateStats = function(geography, data) {
   // this.id = geography.id;
   this.approve = data.responses[0].answer;
   this.approvePercentage = data.responses[0].percentage;
   this.disapprove = data.responses[1].answer;
   this.disapprovePercentage = data.responses[1].percentage;
   this.undecided = data.responses[2].answer;
   this.undecidedPercentage = data.responses[2].percentage;
}



function calculateFillKeys(inputData) {
   for (state in inputData) {
      inputData[state]['fillKey'] = _.sample(["a5","a4","a3","a2","a1","neutral","d1","d2","d3","d4","d5"])
   }
}

function drawDatamap(inputData){
   calculateFillKeys(inputData);
   console.log(inputData);
   d3.select("body").attr("fill",function() {

   });
   // var stats = new StateStats(geography, data);
   // console.log(stats);

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
               console.log("data", data);
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

         "d5": "rgb(84,48,5)",
         "d4": "rgb(140,81,10)",
         "d3": "rgb(191,129,45)",
         "d2": "rgb(223,194,125)",
         "d1": "rgb(246,232,195)",
         "neutral": "rgb(245,245,245)",
         "a1": "rgb(199,234,229)",
         "a2": "rgb(128,205,193)",
         "a3": "rgb(53,151,143)",
         "a4": "rgb(1,102,94)",
         "a5": "rgb(0,60,48)",
         defaultFill: '#AAA'
      },
   });

   map.labels();
}
