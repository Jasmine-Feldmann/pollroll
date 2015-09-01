function choiceLineGraph(nationalData) {
  var parseDate = d3.time.format("%Y-%m-%d");
  nationalData.forEach(function(choice) {
    choice.minDate = d3.min(choice.attributes.responses.map(function(d) { return parseDate.parse(d.date); }));
    choice.maxDate = d3.max(choice.attributes.responses.map(function(d) { return parseDate.parse(d.date); }));
    choice.maxPercentage = d3.max(choice.attributes.responses.map(function(d) { return d.percentage; }));
    choice.name = choice.attributes.answer;
  });
  var graph = d3.select("#line-graph");
  var WIDTH = 975;
  var HEIGHT = 500;
  var MARGINS = {
      top: 20,
      right: 130,
      bottom: 26,
      left: 50
    };
  var Xscale = d3.time.scale().range([MARGINS.left, WIDTH - MARGINS.right]);
  Xscale.domain([
      d3.min(nationalData.map(function(choice) { return choice.minDate; })),
      d3.max(nationalData.map(function(choice) { return choice.maxDate; }))
    ]);
  var Yscale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]);
  Yscale.domain([
      0,
      d3.max(nationalData.map(function(choice) { return parseFloat(choice.maxPercentage) })) + 5
    ]);

  var colorScale = d3.scale.ordinal()
    .range(["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#a65628","#f781bf","#999999", "#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3", "#8dd3c7","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5", "#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#b15928"]);

  var Xaxis = d3.svg.axis()
      .scale(Xscale)
      .orient("bottom");

  var Yaxis = d3.svg.axis()
      .scale(Yscale)
      .orient("left");

  // append the axes
  graph.append("svg:g")
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(Xaxis);
  graph.append("svg:g")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(Yaxis);


  var lineGen = d3.svg.line()
    .x(function(d) {
      return Xscale(parseDate.parse(d.date));
    })
    .y(function(d) {
      return Yscale(parseFloat(d.percentage));
    })
    .interpolate('basis'); // make the lines rounded

  nationalData.forEach(function(choice, index) {
    var line = graph.append("svg:path")
      .attr("stroke", colorScale(index))
      .attr("data-legend", choice.name)
      .attr("stroke-width", 3)
      .attr("fill", "none")
      .on("mousemove", mousemove)
      .on("mouseout", mouseout);

    line.transition() // transition for line generation
      .duration(4000)
      .delay(100 + index * 100)
      .ease("linear")
      .attr('d', lineGen(choice.attributes.responses));
 // generate lines on graph
  });

  var yaxiscords = d3.range(26, HEIGHT, 45.4);
  var xaxiscords = d3.range(50, WIDTH - 120, 25);

  graph.selectAll("line.vertical") // grid for x axis
    .data(xaxiscords)
    .enter().append("svg:line")
    .attr("x1", function(d) {return d;})
    .attr("y1", 26)
    .attr("x2", function(d) {return d;})
    .attr("y2", HEIGHT - 20)
    .style("stroke", "rgb(192,192,192)")
    .style("opacity", 0.3)
    .style("stroke-width", 2);

  graph.selectAll("line.horizontal") // grid for y axis
    .data(yaxiscords)
    .enter().append("svg:line")
    .attr("x1", 50)
    .attr("y1", function(d) {return d;})
    .attr("x2", WIDTH - 125)
    .attr("y2", function(d) {return d;})
    .style("stroke", "rgb(192,192,192)")
    .style("opacity", 0.3)
    .style("stroke-width", 2);

  var legend = graph.append("g")
    .attr("class","legend")
    .attr("transform","translate(860,30)")
    .style("font-size","15px")
    .call(d3.legend);

  $(".legend-items > text").on("mouseenter", mouseOnLegend);
  $(".legend-items > text").on("mouseleave", mouseOffOfLegend);

}

function mousemove() {
  $(this).css("stroke-width", "6px");
  $(this).css("cursor", "pointer");
  $(this).parent()
    .find($(".legend-items")
    .find($("text:contains('" + $(this).attr('data-legend') + "')")))
    .css("font-weight","bold");
}

function mouseout() {
  $(this).css("stroke-width", "3px");
  $(this).parent()
    .find($(".legend-items")
    .find($("text:contains('" + $(this).attr('data-legend') + "')")))
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
  $(this).css("font-weight", "initial");
  $(document)
    .find("path[data-legend='" + $(this).text() +"']")
    .css("stroke-width", "3px");
}
