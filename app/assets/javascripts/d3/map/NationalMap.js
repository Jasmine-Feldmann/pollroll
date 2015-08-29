var map = new Datamap({
   scope: 'usa',
   element: document.getElementById('map-container'),
   height: 500,
   geographyConfig: {
     highlightBorderColor: '#bada55',
     popupTemplate: function(geography, data) {
      return '<div class="hoverinfo">' 
      + geography.properties.name 
      + "<br>Electoral Votes:" +  data.electoralVotes + " " 
      + "<br>Approve:" + data.Approve 
      + "<br>Disapprove:" + data.Disapprove 
      + "<br>Undecided:" + data.Undecided 
      + "<br>sampleImage:" + "<img src='https://thingiverse-production-new.s3.amazonaws.com/renders/ed/21/ea/ac/8d/ray_graphics_thumb_tiny.jpg'>"
   },
   highlightBorderWidth: 3
   },

   fills: {
      "High Approval": "#00CC00",
      "Moderate Approval": "#88FF88",
      "Even": "#FFFF77",
      "Moderate Disapproval": "#FF8888",
      "High Disapproval": "#CC0000",

      // "Republican": "#CC4731",
      // "Democrat": "#306596",
      // "Heavy Democrat": "#667FAF",
      // "Light Democrat": "#A9C0DE",
      // "Heavy Republican": "#CA5E5B",
      // "Light Republican": "#EAA9A8",
      defaultFill: "#AAA"
   },

   data:{
      "AL": {"fillKey": "High Disapproval", "electoralVotes": 32},
      "AK": {"fillKey": "High Disapproval", "electoralVotes": 32},
      "AR": {"fillKey": "High Disapproval", "electoralVotes": 32},
      "AZ": {"fillKey": "High Disapproval", "electoralVotes": 5, "Approve": 35, "Disapprove": 44.2, "Undecided": "<img>"},
      "CA": {"fillKey": "Even", "electoralVotes": 5, "Approve": 35, "Disapprove": 44.2, "Undecided": 15},
      "CO": {"fillKey": "Moderate Approval", "electoralVotes": 5},
      "CT": {"fillKey": "High Approval", "electoralVotes": 32},
      "DE": {"fillKey": "High Approval", "electoralVotes": 32},
      "FL": {"fillKey": "Even", "electoralVotes": 29},
      "GA": {"fillKey": "High Disapproval", "electoralVotes": 32},
      "HI": {"fillKey": "High Approval", "electoralVotes": 32},
      "ID": {"fillKey": "High Disapproval", "electoralVotes": 32},
      "IL": {"fillKey": "High Approval", "electoralVotes": 32},
      "IN": {"fillKey": "High Disapproval", "electoralVotes": 11},
      "IA": {"fillKey": "Moderate Approval", "electoralVotes": 11},
      "KS": {"fillKey": "High Disapproval", "electoralVotes": 32},
      "KY": {"fillKey": "High Disapproval", "electoralVotes": 32},
      "LA": {"fillKey": "High Disapproval", "electoralVotes": 32},
      "MD": {"fillKey": "High Approval", "electoralVotes": 32},
      "ME": {"fillKey": "High Approval", "electoralVotes": 32},
      "MA": {"fillKey": "High Approval", "electoralVotes": 32},
      "MN": {"fillKey": "High Approval", "electoralVotes": 32},
      "MI": {"fillKey": "High Approval", "electoralVotes": 32},
      "MS": {"fillKey": "High Disapproval", "electoralVotes": 32},
      "MO": {"fillKey": "High Disapproval", "electoralVotes": 13},
      "MT": {"fillKey": "High Disapproval", "electoralVotes": 32},
      "NC": {"fillKey": "Moderate Disapproval", "electoralVotes": 32},
      "NE": {"fillKey": "High Disapproval", "electoralVotes": 32},
      "NV": {"fillKey": "High Approval", "electoralVotes": 32},
      "NH": {"fillKey": "Moderate Approval", "electoralVotes": 32},
      "NJ": {"fillKey": "High Approval", "electoralVotes": 32},
      "NY": {"fillKey": "High Approval", "electoralVotes": 32},
      "ND": {"fillKey": "High Disapproval", "electoralVotes": 32},
      "NM": {"fillKey": "High Approval", "electoralVotes": 32},
      "OH": {"fillKey": "Even", "electoralVotes": 32},
      "OK": {"fillKey": "High Disapproval", "electoralVotes": 32},
      "OR": {"fillKey": "High Approval", "electoralVotes": 32},
      "PA": {"fillKey": "High Approval", "electoralVotes": 32},
      "RI": {"fillKey": "High Approval", "electoralVotes": 32},
      "SC": {"fillKey": "Moderate Disapproval", "electoralVotes": 32},
      "SD": {"fillKey": "Moderate Disapproval", "electoralVotes": 32},
      "TN": {"fillKey": "Moderate Disapproval", "electoralVotes": 32},
      "TX": {"fillKey": "Moderate Disapproval", "electoralVotes": 32},
      "UT": {"fillKey": "Moderate Disapproval", "electoralVotes": 32},
      "WI": {"fillKey": "High Approval", "electoralVotes": 32},
      "VA": {"fillKey": "Moderate Approval", "electoralVotes": 32},
      "VT": {"fillKey": "Moderate Approval", "electoralVotes": 32},
      "WA": {"fillKey": "Moderate Approval", "electoralVotes": 32},
      "WV": {"fillKey": "Moderate Disapproval", "electoralVotes": 32},
      "WY": {"fillKey": "Moderate Disapproval", "electoralVotes": 32},
   }
});
map.labels();