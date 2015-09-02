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
   return "<br>"
   + "<span class='ratio'>"
      + "<span class='ratio-text'>Ratio: </span>"
      + Math.round(appToDisappRatio(state) * 100) / 100
   + "</span>"
}
function toolTipTitleHelper(geography, data) {
   return '<div class="hoverinfo">'
   + "<span class='state-name'>" + geography.properties.name + "</span>"
}
