function choiceLineGraph(nationalData) {
  var parseDate = d3.time.format("%Y-%m-%d");
  nationalData.forEach(function(choice) {
    choice.minDate = d3.min(choice.attributes.responses.map(function(d) { return parseDate.parse(d.date); }));
    choice.maxDate = d3.max(choice.attributes.responses.map(function(d) { return parseDate.parse(d.date); }));
    choice.maxPercentage = d3.max(choice.attributes.responses.map(function(d) { return d.percentage; }));
  });
  var graph = d3.select("#line-graph");
  var WIDTH = 1000;
  var HEIGHT = 500;
  var MARGINS = {
      top: 20,
      right: 20,
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

  var colorScale = d3.scale.category20();

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
      .attr("stroke-width", 3)
      .attr("fill", "none")
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);

    line.transition() // transition for line generation
      .duration(4000)
      .delay(500 + index * 500)
      .ease("linear")
      .attr('d', lineGen(choice.attributes.responses)); // generate lines on graph
  });

  var yaxiscords = d3.range(26, HEIGHT, 45.4);
  var xaxiscords = d3.range(50, WIDTH, 25);

  graph.selectAll("line.vertical") // grid for x axis
    .data(xaxiscords)
    .enter().append("svg:line")
    .attr("x1", function(d) {return d;})
    .attr("y1", 26)
    .attr("x2", function(d) {return d;})
    .attr("y2", HEIGHT - 25)
    .style("stroke", "rgb(192,192,192)")
    .style("opacity", 0.3)
    .style("stroke-width", 2);

  graph.selectAll("line.horizontal") // grid for y axis
    .data(yaxiscords)
    .enter().append("svg:line")
    .attr("x1", 50)
    .attr("y1", function(d) {return d;})
    .attr("x2", WIDTH - 25)
    .attr("y2", function(d) {return d;})
    .style("stroke", "rgb(192,192,192)")
    .style("opacity", 0.3)
    .style("stroke-width", 2);
}

function mouseover(d) {
  d3.select(this).classed("line-hover", true);
}
function mouseout(d) {
  d3.select(this).classed("line-hover", false);
}

