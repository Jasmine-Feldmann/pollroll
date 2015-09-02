function drawApprovalScatterPlot() {
  var plot = d3.select("#approval-scatter");
  var WIDTH = 1000;
  var HEIGHT = 500;
  var MARGINS = {
    top: 50,
    right: 20,
    bottom: 50,
    left: 50
  };

  // KMEANS_DATA is defined in kmeans_training_results.js
  var data = KMEANS_DATA;

  var xScale = d3.scale.linear()
                  .range([MARGINS.left, WIDTH - MARGINS.right])
                  .domain([d3.min(data.map(function(d) {
                    return parseFloat(d.stockPrice);
                  })), d3.max(data.map(function(d) {
                    return parseFloat(d.stockPrice);
                  }))]);

  var yScale = d3.scale.linear()
                  .range([HEIGHT - MARGINS.top, MARGINS.bottom])
                  .domain([d3.min(data.map(function(d) {
                    return parseFloat(d.unemployment);
                  })) - 0.5, d3.max(data.map(function(d) {
                    return parseFloat(d.unemployment);
                  }))]);

  var colorScale = d3.scale.linear()
                    .domain([d3.min(data.map(function(d) {
                      return parseInt(d.approval);
                    })), d3.max(data.map(function(d) {
                      return parseInt(d.approval);
                    }))])
                    .range(["red", "green"]);

  var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom");

  var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left");

  plot.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(xAxis);

  plot.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(" + MARGINS.left + ",0)")
        .call(yAxis);

  var yaxiscords = d3.range(MARGINS.top, HEIGHT - MARGINS.bottom, 25);
  var xaxiscords = d3.range(MARGINS.left, WIDTH, 25);

  plot.selectAll("line.vertical") // grid for x axis
    .data(xaxiscords)
    .enter().append("svg:line")
    .attr("x1", function(d) {return d;})
    .attr("y1", MARGINS.top)
    .attr("x2", function(d) {return d;})
    .attr("y2", HEIGHT - MARGINS.bottom)
    .style("stroke", "rgb(192,192,192)")
    .style("opacity", 0.3)
    .style("stroke-width", 2);

  plot.selectAll("line.horizontal") // grid for y axis
    .data(yaxiscords)
    .enter().append("svg:line")
    .attr("x1", MARGINS.left)
    .attr("y1", function(d) {return d;})
    .attr("x2", WIDTH - MARGINS.right)
    .attr("y2", function(d) {return d;})
    .style("stroke", "rgb(192,192,192)")
    .style("opacity", 0.3)
    .style("stroke-width", 2);

  var pointGroups = plot.selectAll(".point-group")
                      .data(data)
                      .enter()
                      .append("g")
                      .attr("class", "point-group");
  var plotPoints = pointGroups.append("circle")
                      .attr("class", "plot-point")
                      .attr("r", function(d) {
                        return 10 * Math.pow((d.approval / 50), 2);
                      })
                      .attr("cx", function(d) {
                        return xScale(parseFloat(d.stockPrice));
                      })
                      .attr("cy", function(d) {
                        return yScale(parseFloat(d.unemployment));
                      })
                      .attr("fill", function(d) {
                        return colorScale(parseInt(d.approval));
                      });
}
