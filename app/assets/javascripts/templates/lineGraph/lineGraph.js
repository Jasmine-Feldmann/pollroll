InitLineGraph();

function InitLineGraph() {
  var graph = d3.select("#line-graph");
  var WIDTH = 1000;
  var HEIGHT = 500;
  var MARGINS = {
      top: 20,
      right: 20,
      bottom: 26,
      left: 50
    };
  var Xscale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain(["200909","200912"]);
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
      return Yscale(d.choice.Approve);
    });

  graph.append("svg:path")
    .attr('d', lineGenApprove(sampleData))
    .attr("stroke", "green")
    .attr("stroke-width", 2)
    .attr("fill", "none");

  var lineGenDisapprove = d3.svg.line()
    .x(function(d) {
      return Xscale(d.date)
    })
    .y(function(d) {
      return Yscale(d.choice.Disapprove)
    });

  graph.append("svg:path")
    .attr('d', lineGenDisapprove(sampleData))
    .attr("stroke", "red")
    .attr("stroke-width", 2)
    .attr("fill", "none");

  var lineGenUndecided = d3.svg.line()
    .x(function(d) {
      return Xscale(d.date)
    })
    .y(function(d) {
      return Yscale(d.choice.Undecided)
    });

  graph.append("svg:path")
    .attr('d', lineGenUndecided(sampleData))
    .attr("stroke", "blue")
    .attr("stroke-width", 2)
    .attr("fill", "none")
}




