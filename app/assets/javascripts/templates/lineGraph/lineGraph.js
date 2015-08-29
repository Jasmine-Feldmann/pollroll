InitLineGraph();

function InitLineGraph() {
  var graph = d3.select("#line-graph");
  var WIDTH = 1000;
  var HEIGHT = 500;
  var MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    };
  var Xscale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([2009,2015]);
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
}


