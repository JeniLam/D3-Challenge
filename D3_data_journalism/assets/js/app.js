// Add boiler plate information for SVG area, margins, etc
var svgWidth = 960;
var svgHeight = 600;

// Define the chart's margins as an object
var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select scatter id to hold chart, append SVG area to it, and set its dimensions
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

// function used for updating x-scale var upon click on axis label - taken from Day 3 activity 12
function xScale(scatterData, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(scatterData, d => d[chosenXAxis]) * 0.8,
        d3.max(scatterData, d => d[chosenXAxis]) * 1.2
      ])
      .range([0, chartWidth]);
  
    return xLinearScale;
  
  };

  // function used for updating y-scale var upon click on axis label. Possibly need to debug when run as Y axis sets up a bit differently than x.
function yScale(scatterData, chosenYAxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(scatterData, d => d[chosenYAxis]) * 0.8,
        d3.max(scatterData, d => d[chosenYAxis]) * 1.2
      ])
      .range([chartHeight, 0]);
  
    return yLinearScale;
      
  };

  // function used for updating xAxis var upon click on axis label
function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  }

  // function used for updating yAxis var upon click on axis label same as above just change to Y/left. Possibly need to debug when run as Y axis sets up a bit differently than x.
function renderYAxes(newXScale, yAxis) {
    var leftAxis = d3.axisleft(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
  }

//Read in csv to look at data and how it is arranged

d3.csv("assets/data/data.csv").then(function(scatterData) {
    console.log(scatterData);
    // console.log("yScale is: " ${yScale(scatterData, chosenYAxis)});
});
