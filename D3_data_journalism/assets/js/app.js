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
  };

// function used for updating xcircles group with a transition to
// new circles
function renderXCircles(circlesGroup, newXScale, chosenXAxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]));
  
    return circlesGroup;
  };

  // function used for updating Ycircles group with a transition to
// new circles
function renderYCircles(circlesGroup, newXScale, chosenYAxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenYAxis]));
  
    return circlesGroup;
  };

// function used for updating circles group with new tooltip
// axis labels came from Homework example
// commenting out for now and want to get the charts working
// function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

//     var xlabel;
//     var ylabel;
  
//     if (chosenXAxis === "poverty") {
//       xlabel = "In Poverty (%)";
//     }
//     else if (chosenXAxis === "age") {
//         xlabel = "Age (Median)";
//       }
//     else (chosenXAxis === "income") {
//       xlabel = "Household Income (Median)";
//     }
//     if (chosenYAxis === "healthcare") {
//         ylabel = "Lacks Healthcare (%))";
//       }
//       else if (chosenYAxis === "smokes") {
//           ylabel = "Smokes (%)";
//         }
//       else (chosenYAxis === "obesity") {
//         ylabel = "Obesity (%)";
//       }
  
//     var toolTip = d3.tip()
//       .attr("class", "tooltip")
//       .offset([80, -60])
//       .html(function(d) {
//         return (`${d.state}<br>${xlabel} ${d[chosenXAxis]}<br>${ylabel} ${d[chosenYAxis]}`);
//       });
  
//     circlesGroup.call(toolTip);
  
//     circlesGroup.on("mouseover", function(data) {
//       toolTip.show(data);
//     })
//       // onmouseout event
//       .on("mouseout", function(data, index) {
//         toolTip.hide(data);
//       });
  
//     return circlesGroup;
//   }

//Read in csv to look at data and how it is arranged

d3.csv("assets/data/data.csv").then(function(scatterData) {
    console.log(scatterData);
    // console.log("yScale is: " ${yScale(scatterData, chosenYAxis)});
});
