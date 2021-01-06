// Add boiler plate information for SVG area, margins, etc
var svgWidth = 900;
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

// function used for updating y-scale var upon click on axis label. 
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

// function used for updating yAxis var upon click on axis label same as above just change to Y/left.
function renderYAxis(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

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
        .attr("cx", d => newXScale(d[chosenXAxis]))
        // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dx
        .attr("dx", d => newXScale(d[chosenXAxis]));

    return circlesGroup;
};

// function used for updating Ycircles group with a transition to
// new circles
function renderYCircles(circlesGroup, newYScale, chosenYAxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("cy", d => newYScale(d[chosenYAxis]))
        // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dx
        .attr("dy", d => newYScale(d[chosenYAxis]));

    return circlesGroup;
};

// function for updating text in circles here: similar to above transition
// x circles:
function xCircleText(circlesGroup, newXScale, chosenXAxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("dx", d => newXScale(d[chosenXAxis]));

    return circlesGroup;
};

// y circles:
function yCircleText(circlesGroup, newYScale, chosenYAxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("dy", d => newYScale(d[chosenYAxis]));

    return circlesGroup;
};

// function used for updating circles group with new tooltip
// labels are what is printed in tool tip pop up
// commenting out for now and want to get the charts working
// function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

//     var xlabel;
//     var ylabel;

//     if (chosenXAxis === "poverty") {
//       xlabel = "Poverty: )"
//     }
//     else if (chosenXAxis === "age") {
//         xlabel = "Age:";
//       }
//     else if (chosenXAxis === "income") {
//       xlabel = "Household Income:";
//     }
//     if (chosenYAxis === "healthcare") {
//         ylabel = "Healthcare: ";
//       }
//       else if (chosenYAxis === "smokes") {
//           ylabel = "Smokes: ";
//         }
//       else if (chosenYAxis === "obesity") {
//         ylabel = "Obesity: ";
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

d3.csv("assets/data/data.csv").then(function (scatterData) {
    console.log(scatterData);

    // parse data - getting all strings into numerical form
    scatterData.forEach(function (d) {
        d.poverty = +d.poverty;
        d.povertyMoe = +d.povertyMoe;
        d.age = +d.age;
        d.ageMoe = +d.ageMoe;
        d.income = +d.income;
        d.incomeMoe = +d.incomeMoe;
        d.healthcare = +d.healthcare;
        d.healthcareLow = +d.healthcareLow;
        d.healthcareHigh = +d.healthcareHigh;
        d.obesity = +d.obesity;
        d.obesityLow = +d.obesityLow;
        d.obesityHigh = +d.obesityHigh;
        d.smokes = +d.smokes;
        d.smokesLow = +d.smokesLow;
        d.smokesHigh = +d.smokesHigh;
    });

    // xLinearScale function above csv import
    var xLinearScale = xScale(scatterData, chosenXAxis);

    // yLinearScale function above csv import
    var yLinearScale = yScale(scatterData, chosenYAxis);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    // append y axis
    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        // .attr("transform")
        .call(leftAxis);

    // append initial circles
    // https://stackoverflow.com/questions/55988709/how-can-i-add-labels-inside-the-points-in-a-scatterplot
    var circlesGroup = chartGroup.selectAll("circle")
        .data(scatterData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("r", 20)
        .attr("fill", "purple")
        .attr("opacity", "0.6");

    // add state labels to the data points
    var circleText = chartGroup.selectAll("text")
    .data(scatterData)
    .enter()
    .append("text")
    .classed("stateCircle", true);

    circleText.attr("dx", d => xLinearScale(d[chosenXAxis]))
    .attr("dy", d => yLinearScale(d[chosenYAxis]))
    .text(d=> d.abbr)
    .classed("stateText", true);
    // .attr("font-size", "12px")
    // .attr("text-anchor", "middle")
    // ;

    // get state abbreviation in circles here:
    // cx-cy define yaxis coordinate of center point 
    // dx-dy indicate shift along the x-axis positio of an element or its content
    // https://stackoverflow.com/questions/13615381/d3-add-text-to-circle

    // var circleText = circlesGroup.append("text")
    //     .text(d => d.abbr)
    // console.log(circleText)
    //     .attr("dx", d => xLinearScale(d[chosenXAxis]))
    //     .attr("dy", d => yLinearScale(d[chosenYAxis]))
    //     .classed("stateText", true);


    // Create group for three x-axis labels
    var xLabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`);

    var povertyLabel = xLabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "poverty") // value to grab for event listener
        .classed("active", true)
        .text("In Poverty (%)");

    var ageLabel = xLabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "age") // value to grab for event listener
        .classed("inactive", true)
        .text("Age (Median)");

    var incomeLabel = xLabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "income") // value to grab for event listener
        .classed("inactive", true)
        .text("Household Income (Median)");

    // Create group for three y-axis labels
    var yLabelsGroup = chartGroup.append("g")
        .attr("transform", "rotate(-90)")

    var healthcareLabel = yLabelsGroup.append("text")
        .attr("y", 40 - margin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("value", "healthcare") // value to grab for event listener
        .classed("active", true)
        .text("Lacks Heathcare (%)")

    var obeseLabel = yLabelsGroup.append("text")
        .attr("y", 20 - margin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("value", "obesity") // value to grab for event listener
        .classed("inactive", true)
        .text("Obese (%)")

    var smokeLabel = yLabelsGroup.append("text")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("value", "smokes") // value to grab for event listener
        .classed("inactive", true)
        .text("Smokes (%)")

    // updateToolTip function above csv import
    // commented out below until updateToolTip is finalized
    // var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

    // x axis labels event listener
    xLabelsGroup.selectAll("text")
        .on("click", function () {
            // get value of selection
            var value = d3.select(this).attr("value");
            if (value !== chosenXAxis) {

                // replaces chosenXAxis with value
                chosenXAxis = value;

                console.log(chosenXAxis);

                // functions here found above csv import
                // updates x scale for new data
                xLinearScale = xScale(scatterData, chosenXAxis);

                // updates x axis with transition
                xAxis = renderXAxes(xLinearScale, xAxis);

                // updates circles with new x values
                circlesGroup = renderXCircles(circlesGroup, xLinearScale, chosenXAxis);

                // update circles with new x text
                circleText = xCircleText(circleText, xLinearScale, chosenXAxis);

                // updates tooltips with new info
                // circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

                // changes classes to change bold text (set labels not selected as inactive)
                if (chosenXAxis === "poverty") {
                    povertyLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    ageLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    incomeLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else if (chosenXAxis === "age") {
                    ageLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    povertyLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    incomeLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else {
                    incomeLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    povertyLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    ageLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
            }
        });

    // y axis labels event listener
    yLabelsGroup.selectAll("text")
        .on("click", function () {
            // get value of selection
            var value = d3.select(this).attr("value");
            if (value !== chosenYAxis) {

                // replaces chosenXAxis with value
                chosenYAxis = value;

                console.log(chosenYAxis)

                // functions here found above csv import
                // updates x scale for new data
                yLinearScale = yScale(scatterData, chosenYAxis);

                // updates x axis with transition
                yAxis = renderYAxis(yLinearScale, yAxis);

                // updates circles with new x values
                circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);

                // update circles with new y text
                circleText = yCircleText(circleText, yLinearScale, chosenYAxis);

                // updates tooltips with new info
                // circlesGroup = updateToolTip(chosenYAxis, circlesGroup);

                // changes classes to change bold text set labels not selected as inactive
                if (chosenYAxis === "healthcare") {
                    healthcareLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    obeseLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    smokeLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else if (chosenYAxis === "obesity") {
                    obeseLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    healthcareLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    smokeLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else {
                    smokeLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    healthcareLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    obeseLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
            }
        });
}).catch(function (error) {
    console.log(error);
});
