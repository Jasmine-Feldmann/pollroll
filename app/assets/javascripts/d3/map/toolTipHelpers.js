function toolTipHelper(state, num) {
   return "<br>" 
   + "<span class='data-answer'>" 
      + state["responses"][num]["answer"] 
   + ":" + "</span>" + " "
   + "<span class='data-percentage'>" 
      + state["responses"][num]["percentage"] 
   + "</span>" 
   + "<span class='percent-sign'>%</span>"
}
function toolTipRatioHelper(state) {
   // console.log(dataSet);
   return "<br>"
   + "<span class='ratio'>"
      + "Ratio: "
   + "</span>" 
      + Math.round(appToDisappRatio(state) * 100) / 100
}
function toolTipTitleHelper(geography, data) {
   return '<div class="hoverinfo">'
   + "<span class='state-name'>" + geography.properties.name + "</span>"
}