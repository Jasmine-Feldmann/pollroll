function drawDatamap(inputData){
var map = new Datamap({
   scope: 'usa',
   element: document.getElementById('map-container'),
   height: 500,
   geographyConfig: {
     highlightBorderColor: '#bada55',
     popupTemplate: function(geography, data) {
      return '<div class="hoverinfo">'
      + geography.properties.name
      + "<br>Approve:" + data.Approve
      + "<br>Disapprove:" + data.Disapprove
      + "<br>Undecided:" + data.Undecided
      + "<br>sampleImage:" + "<img src='https://thingiverse-production-new.s3.amazonaws.com/renders/ed/21/ea/ac/8d/ray_graphics_thumb_tiny.jpg'>"
   },
   highlightBorderWidth: 3
   },

   // fills: {
   //    "High Approval": "#00CC00",
   //    "Moderate Approval": "#88FF88",
   //    "Even": "#FFFF77",
   //    "Moderate Disapproval": "#FF8888",
   //    "High Disapproval": "#CC0000",

   //    // "Republican": "#CC4731",
   //    // "Democrat": "#306596",
   //    // "Heavy Democrat": "#667FAF",
   //    // "Light Democrat": "#A9C0DE",
   //    // "Heavy Republican": "#CA5E5B",
   //    // "Light Republican": "#EAA9A8",
   //    defaultFill: "#AAA"
   // },

   fills: {
   'Disapprove': '#CC4731',
   'Approve': '#306596',
   'Undecided': 'purple',
   defaultFill: '#AAA'
},
data: inputData

   // data:{
   //    "AL": {"fillKey": "High Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "AK": {"fillKey": "High Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "AR": {"fillKey": "High Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "AZ": {"fillKey": "High Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "CA": {"fillKey": "High Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "CO": {"fillKey": "Moderate Approval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "CT": {"fillKey": "High Approval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "DE": {"fillKey": "High Approval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "FL": {"fillKey": "Even", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "GA": {"fillKey": "High Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "HI": {"fillKey": "High Approval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "ID": {"fillKey": "High Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "IL": {"fillKey": "High Approval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "IN": {"fillKey": "High Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "IA": {"fillKey": "Moderate Approval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "KS": {"fillKey": "High Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "KY": {"fillKey": "High Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "LA": {"fillKey": "High Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "MD": {"fillKey": "High Approval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "ME": {"fillKey": "High Approval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "MA": {"fillKey": "High Approval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "MN": {"fillKey": "High Approval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "MI": {"fillKey": "High Approval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "MS": {"fillKey": "High Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "MO": {"fillKey": "High Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "MT": {"fillKey": "High Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "NC": {"fillKey": "Moderate Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "NE": {"fillKey": "High Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "NV": {"fillKey": "High Approval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "NH": {"fillKey": "Moderate Approval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "NJ": {"fillKey": "High Approval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "NY": {"fillKey": "High Approval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "ND": {"fillKey": "High Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "NM": {"fillKey": "High Approval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "OH": {"fillKey": "Even", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "OK": {"fillKey": "High Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "OR": {"fillKey": "High Approval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "PA": {"fillKey": "High Approval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "RI": {"fillKey": "High Approval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "SC": {"fillKey": "Moderate Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "SD": {"fillKey": "Moderate Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "TN": {"fillKey": "Moderate Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "TX": {"fillKey": "Moderate Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "UT": {"fillKey": "Moderate Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "WI": {"fillKey": "High Approval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "VA": {"fillKey": "Moderate Approval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "VT": {"fillKey": "Moderate Approval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "WA": {"fillKey": "Moderate Approval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "WV": {"fillKey": "Moderate Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   //    "WY": {"fillKey": "Moderate Disapproval", "Approve": sampleDataStates[0]["choice"]["Approve"], "Disapprove": 666, "Undecided": 777},
   // }
});
map.labels();
}
