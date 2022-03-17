var svgWidth = 960;
var svgHeight = 500;


var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(Data) {
    Data.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

    var xLinearScale = d3.scaleLinear()
        .domain(d3.extent(Data, d => d.poverty))
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([4, d3.max(Data, d=> d.healthcare)])
        .range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    chartGroup.append("g")
    .call(leftAxis);

    let circlesGroup = chartGroup.selectAll("circle")
        .data(Data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "10")
        .classed("stateCircle", true)
        .attr("fill", "blue")
        .attr("opacity", "0.5");

        chartGroup.append("text")
          .attr("transform", `translate(${width / 2}, ${height + margin.top + 13})`)
          .attr("text-anchor", "middle")
          .attr("font-size", "16px")
          .attr("fill", "black")
          .style("font-weight", "bold")
          .text("In Poverty (%)");

        chartGroup.append("text")
          .attr("y", 0 - ((margin.left / 2) + 2))
          .attr("x", 0 - (height / 2))
          .attr("text-anchor", "middle")
          .attr("font-size", "16px")
          .attr("fill", "black")
          .style("font-weight", "bold")
          .attr("transform", "rotate(-90)")
          .text("Lacks Healthcare (%)");

        chartGroup.append("g").selectAll('text')
          .data(Data)
          .enter()
          .append("text")
          .text(d => d.abbr) 
          .attr("x", d => xLinearScale(d.poverty))
          .attr("y", d => yLinearScale(d.healthcare))
          .classed(".stateText", true)
          .attr("text-anchor", "middle")
          .attr("font-size", "9px")
          .attr("fill", "white");

}).catch(function(error) {
  console.log(error);
});




 