function initBarChart(nationalData, title) {
  // Find the most recent poll date.
  var latestDate = d3.max(nationalData.map(function(d) {
    return d.attributes.responses.slice(-1)[0].date;
  }));
  // Filter out any candidates who aren't currently polling.
  nationalDataFiltered = nationalData.filter(function(d) {
    return d.attributes.responses.slice(-1)[0].date == latestDate;
  });
  var WIDTH = 1000;
  var HEIGHT = 500;
  var MARGINS = {
    top: 40,
    right: 10,
    bottom: 50,
    left: 60
  };
  var graph = d3.select("#bar-graph");

  var Xscale = d3.scale.ordinal()
                  .rangeRoundBands([0,WIDTH - (MARGINS.left + MARGINS.right)], .1)
                  .domain(nationalDataFiltered.map(function(d) { return d.attributes.answer; }));

  var Yscale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]);
  Yscale.domain([
      0,
      d3.max(nationalDataFiltered.map(function(choice) { return parseFloat(choice.attributes.responses.slice(-1)[0].percentage) })) + 5
    ]);

  var colorScale = d3.scale.ordinal()
    .domain(nationalData.map(function(d) { return d.attributes.answer; }))
    .range(["#4daf4a","#e41a1c","#377eb8","#984ea3","#ff7f00","#a65628","#f781bf","#999999", "#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3", "#8dd3c7","#bebada","#fb8072","#80b1d3","#fdb462","#FF00FF","#fccde5","#d9d9d9","#bc80bd","#ccebc5", "#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#b15928"]);

  // define the axes
  var Xaxis = d3.svg.axis()
      .scale(Xscale)
      .orient("bottom");

  var Yaxis = d3.svg.axis()
      .scale(Yscale)
      .orient("left");

  // append the axes
  var xAxis = graph.append("svg:g")
    .attr("class", "x-axis")
    .attr("transform", "translate(" + (MARGINS.left - 8) + "," + (HEIGHT - MARGINS.bottom) + ")")
    .call(Xaxis);

  // Rotate the x-axis labels if there are more than 10 bars.
  if (nationalDataFiltered.length > 10) {
    xAxis.selectAll("text")
         .style("text-anchor", "end")
         .attr("transform", "rotate(-30), translate(5, 0)");
  }

  graph.append("svg:g")
    .attr("class", "y-axis")
    .attr("transform", "translate(" + MARGINS.left + ",-10)")
    .call(Yaxis);

  var yAxisLabel = d3.select(".y-axis")
                     .append("text")
                     .attr("transform", "translate(-" + ((MARGINS.left / 2) + 10) + ",350), rotate(-90)" )
                     .text("Poll Response Percentage");

  var chartTitle = graph.append("text")
                        .attr("class", "bar-chart-title")
                        .attr("text-anchor", "center")
                        .attr("transform", "translate(" + ((WIDTH + 30) / 4) + ",30)")
                        .text(title + " - Latest Poll (" + latestDate + ")");

  var bar = graph.selectAll(".bar-group")
              .data(nationalDataFiltered)
              .enter()
              .append("g")
              .attr("class", "bar-group")

  var bars = bar.append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return Xscale(d.attributes.answer); })
      .attr("y", HEIGHT + MARGINS.bottom)
      .attr("width", Xscale.rangeBand())
      .attr("height", 0)
      .attr("fill", function(d) {
        return colorScale(d.attributes.answer); })
      .attr("transform", function(d) {
        return "rotate(180," + (Xscale(d.attributes.answer) + (Xscale.rangeBand() / 2) + 30) + "," + HEIGHT + ")";
      });

  bars.transition()
      .duration(500)
      .attr("height", function(d) { return HEIGHT - Yscale(d.attributes.responses.slice(-1)[0].percentage) - MARGINS.top; });

  var barLabels = bar.append("text")
     .attr("text-anchor", "center")
     .attr("x", function(d) {
      return Xscale(d.attributes.answer) + (Xscale.rangeBand() / 2) + 40; })
     .attr("y", HEIGHT - MARGINS.bottom)
     .attr("dy", "-0.8em")
     .attr("fill", "black")
     .text(function(d) { return d.attributes.responses.slice(-1)[0].percentage + "%"; });

  barLabels.transition()
        .duration(500)
        .attr("y", function(d) { return Yscale(d.attributes.responses.slice(-1)[0].percentage); });
}
