function InitLineGraph(nationalData) {
  var parseDate = d3.time.format("%Y-%m-%d");
  nationalData.forEach(function(d) {
    d.date = parseDate.parse(d[0].date);
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
  var Xscale = d3.time.scale().range([MARGINS.left, WIDTH - MARGINS.right])
              .domain(d3.extent(nationalData.map(function(d) { return d.date; })));
  var Yscale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,100]);
  var Xaxis = d3.svg.axis()
      .scale(Xscale)
      .orient("bottom");

  var Yaxis = d3.svg.axis()
      .scale(Yscale)
      .orient("left");

  graph.append("svg:g")
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(Xaxis);

  graph.append("svg:g")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(Yaxis)

  var lineGenApprove = d3.svg.line()
    .x(function(d) {
      return Xscale(d.date);
    })
    .y(function(d) {
      return Yscale(parseFloat(d[0].percentage));
    });

  graph.append("svg:path")
    .attr('d', lineGenApprove(nationalData))
    .attr("stroke", "#29A329")
    .attr("stroke-width", 4)
    .attr("fill", "none");

  var lineGenDisapprove = d3.svg.line()
    .x(function(d) {
      return Xscale(d.date);
    })
    .y(function(d) {
      return Yscale(parseFloat(d[1].percentage));
    });

  graph.append("svg:path")
    .attr('d', lineGenDisapprove(nationalData))
    .attr("stroke", "#FF3300")
    .attr("stroke-width", 4)
    .attr("fill", "none");

  var lineGenUndecided = d3.svg.line()
    .x(function(d) {
      return Xscale(d.date)
    })
    .y(function(d) {
      return Yscale(parseFloat(d[2].percentage));
    });

  graph.append("svg:path")
    .attr('d', lineGenUndecided(nationalData))
    .attr("stroke", "#006B8F")
    .attr("stroke-width", 4)
    .attr("fill", "none")

  var yaxiscords = d3.range(26, HEIGHT, 45.4);
  var xaxiscords = d3.range(50, WIDTH, 25);

  graph.selectAll("line.vertical")
    .data(xaxiscords)
    .enter().append("svg:line")
    .attr("x1", function(d) {return d;})
    .attr("y1", 26)
    .attr("x2", function(d) {return d;})
    .attr("y2", HEIGHT - 25)
    .style("stroke", "rgb(192,192,192)")
    .style("opacity", 0.3)
    .style("stroke-width", 2);

  graph.selectAll("line.horizontal")
    .data(yaxiscords)
    .enter().append("svg:line")
    .attr("x1", 50)
    .attr("y1", function(d) {return d;})
    .attr("x2", WIDTH - 25)
    .attr("y2", function(d) {return d;})
    .style("stroke", "rgb(192,192,192)")
    .style("opacity", 0.3)
    .style("stroke-width", 2)
}

function formatDate(date) {
  return date.substr(0, 4) + date.substr(5, 2) + date.substr(8, 2);
}


