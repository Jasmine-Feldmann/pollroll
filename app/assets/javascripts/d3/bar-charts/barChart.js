function initBarChart(nationalData) {
  var latestDate = d3.max(nationalData.map(function(d) {
    return d.attributes.responses.slice(-1)[0].date;
  }));
  nationalData = nationalData.filter(function(d) {
    return d.attributes.responses.slice(-1)[0].date == latestDate;
  });
  var WIDTH = 1000;
  var HEIGHT = 500;
  var MARGINS = {
    top: 20,
    right: 20,
    bottom: 26,
    left: 50
  };
  var graph = d3.select("#bar-graph");

  var Xscale = d3.scale.ordinal()
                  .rangeRoundBands([0,WIDTH - (MARGINS.left + MARGINS.right)], .1)
                  .domain(nationalData.map(function(d) { return d.attributes.answer; }));

  var Yscale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]);
  Yscale.domain([
      0,
      d3.max(nationalData.map(function(choice) { return parseFloat(choice.attributes.responses.slice(-1)[0].percentage) })) + 5
    ]);

  var colorScale = d3.scale.ordinal()
    .range(["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#a65628","#f781bf","#999999", "#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3", "#8dd3c7","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5", "#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#b15928"]);

  // define the axes
  var Xaxis = d3.svg.axis()
      .scale(Xscale)
      .orient("bottom");

  var Yaxis = d3.svg.axis()
      .scale(Yscale)
      .orient("left");

  // append the axes
  graph.append("svg:g")
    .attr("transform", "translate(" + (MARGINS.left - 8) + "," + (HEIGHT - MARGINS.bottom) + ")")
    .call(Xaxis);
  graph.append("svg:g")
    .attr("transform", "translate(" + MARGINS.left + ",0)")
    .call(Yaxis);


  var bar = graph.selectAll(".bar-group")
              .data(nationalData)
              .enter()
              .append("g")
              .attr("class", "bar-group")

  var bars = bar.append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return Xscale(d.attributes.answer); })
      .attr("y", HEIGHT + MARGINS.bottom)
      .attr("width", Xscale.rangeBand())
      .attr("height", 0)
      .attr("fill", function(d, i) { return colorScale(i); })
      .attr("transform", function(d) {
        return "rotate(180," + (Xscale(d.attributes.answer) + (Xscale.rangeBand() / 2) + 20) + "," + HEIGHT + ")";
      });

  bars.transition()
      .duration(500)
      .attr("height", function(d) { return HEIGHT - Yscale(d.attributes.responses.slice(-1)[0].percentage) - MARGINS.top; });

  var labels = bar.append("text")
     .attr("x", function(d) {
      return Xscale(d.attributes.answer) + (Xscale.rangeBand() / 2) + 25; })
     .attr("y", HEIGHT)
     .attr("fill", "black")
     .text(function(d) { return d.attributes.responses.slice(-1)[0].percentage; });

  labels.transition()
        .duration(500)
        .attr("y", function(d) { return Yscale(d.attributes.responses.slice(-1)[0].percentage) - MARGINS.top; });
}
