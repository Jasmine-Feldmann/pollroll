function mousemove(d) {
  d3.selectAll(".line-chart-tooltip").remove();
  var toolTipX = d3.mouse(this)[0] + 20;
  var toolTipY = d3.mouse(this)[1] - 40;
  var toolTip = d3.select(".graph").append("g")
        .attr("class", "line-chart-tooltip");
  toolTip.append("rect")
          .attr("width", 80)
          .attr("height", 40)
          .attr("rx", 4)
          .attr("ry", 4)
          .attr("transform", "translate(" + toolTipX + "," + toolTipY + ")");

  toolTip.append("text")
          .text(d.name);

  toolTip.append("text")
          .text(d.name);

  $(this).css("stroke-width", "6px");
  $(this).css("cursor", "pointer");
  $(this).parent()
    .find($(".legend-items")
    .find($("text:contains('" + $(this).attr('data-legend') + "')")))
    .css("font-weight","bold");
}

function mouseout() {
  d3.selectAll(".line-chart-tooltip").remove();
  $(this).css("stroke-width", "3px");
  $(this).parent()
    .find($(".legend-items")
    .find($("text:contains('" + $(this).attr('data-legend') + "')")))
    .css("font-size", "14px")
    .css("font-weight","initial");
}

function mouseOnLegend() {
  $(this).css("font-weight", "bold")
    .css("cursor", "pointer");
  $(document)
    .find("path[data-legend='" + $(this).text() +"']")
    .css("stroke-width", "6px");
}

function mouseOffOfLegend() {
  $(this).css("font-weight", "initial")
    .css("font-size", "14px");
  $(document)
    .find("path[data-legend='" + $(this).text() +"']")
    .css("stroke-width", "3px");
}
