function main(){

    d3.csv('University_data.csv', function(dt){
     var year = ["2011","2012","2013","2014","2015","2016"] 
     var selected_year = "2011"
     var selected_university = "Harvard University"
     var AllUniversity = [] 
     AllUniversity = unique_University(AllUniversity)
   
     // Variable for Bar Chart **
     var fileName = "University_data.csv";
     var selectedUni = "George Washington University";
     var fromYear = 2011;
     var toYear = 2015;
     rating = ["Teaching_Rating","Research_Rating","Citations_Rating","Inter_Outlook_Rating","Industry_Income_Rating"]
     var selectedRating = "Teaching_Rating"
   
     var data1 = [
         { "Year": 2011, "Total_Score": 78 },
         { "Year": 2012, "Total_Score": 49 },
         { "Year": 2013, "Total_Score": 49 },
         { "Year": 2014, "Total_Score": 44 },
         { "Year": 2015, "Total_Score": 45 },
         { "Year": 2016, "Total_Score": 0 }
     ]

     var data3 = [
       { "Year": 2011, "Teaching_Rating": 60.6 },
       { "Year": 2012, "Teaching_Rating": 44.2 },
       { "Year": 2013, "Teaching_Rating": 48.1 },
       { "Year": 2014, "Teaching_Rating": 45.6 },
       { "Year": 2015, "Teaching_Rating": 44.6 },
       { "Year": 2016, "Teaching_Rating": 44.7 }
     ]
   
     var bar_margin = { bar_top: 100, bar_right: 20, bar_bottom: 80, bar_left: 80 },
         bar_width = 550 - bar_margin.bar_left - bar_margin.bar_right, //control size of bar plot
         bar_height = 600 - bar_margin.bar_top - bar_margin.bar_bottom;
   
     var bar_x = d3.scale.ordinal()
         .rangeRoundBands([0, bar_width], .1);
   
     var bar_y = d3.scale.linear()
         .range([bar_height, 0]);
   
     var xAxis_bar = d3.svg.axis()
         .scale(bar_x)
         .orient("bottom");
   
     var yAxis_bar = d3.svg.axis()
         .scale(bar_y)
         .orient("left")
   
       //<---------Variable for LineChart 1---->
       var selectedUni = "George Washington University";
       var fromYear = 2011;
       var toYear = 2015;
     
       line_margin = { line_top: 60, line_right: 20, line_bottom: 30, line_left: 40 },
       line_width = 400 - line_margin.line_left - line_margin.line_right, //control size of line plot
       line_height = 440 - line_margin.line_top - line_margin.line_bottom;
   
       var formatxAxis = d3.format('.0f'); // remove decimal from year
   
           var line_x = d3.scale.linear()
               .domain([2011, 2016])
               .range([0, line_width]); // our chart width
   
           var line_y = d3.scale.linear()
               .domain([0, 100])
               .range([line_height, 0]); // our chart height
   
           var xAxis_line = d3.svg.axis()
               .scale(line_x)
               .orient("bottom")
               .tickFormat(formatxAxis)
               .ticks(6);
   
           var yAxis_line = d3.svg.axis()
               .scale(line_y)
               .orient("left")
   
           // add the line
           var line_1 = d3.svg.line()
               .x(function (d) { return line_x(d.Year); }) // apply the x scale to the x data
               .y(function (d) { return line_y(d.Teaching_Rating); }); // apply the y scale to the y data
   
   
   

   
               // //<--------------------------!!! Filter Drop Down Bar----------------------->
       var select = d3.select("body")
       .append("div")
       .attr("class","filter")
       .append("select")
   
        select
       .on("change", function(d) {
         selected_university = d3.select(this).property("value");
         update_data(selected_university,selectedRating)
       });
   
        select.selectAll("option")
       .data(AllUniversity)
       .enter()
         .append("option")
         .attr("value", function (d) { return d; })
         .text(function (d) { return d; });
   

         // filter bar for Rating
       var select2 = d3.select("body")
       .append("div")
       .attr("class","filter2")
       .append("select")
   
        select2
       .on("change", function(d) {
        selectedRating = d3.select(this).property("value");
         update_data(selected_university,selectedRating)
       });
   
        select2.selectAll("option")
       .data(rating)
       .enter()
         .append("option")
         .attr("value", function (d) { return d; })
         .text(function (d) { return d; });
       //<--------------------------!!! Filter Drop Down Bar----------------------->
   
       function create_bar() //function to visualize bar plot
       {
           svg = d3.select("#bar_plot").append("svg")
           .attr("width", 600) //size of svg
           .attr("height",600)
           .append("g")
           .attr("transform", "translate(" + 140 + "," + 100+ ")"); //position of bar plot
       
           bar_x.domain(data1.map(function (d) { return d.Year; }));
           bar_y.domain([0, 100]);
       
           svg.append("g") //visualize x axis
           .attr("class", "x axis")
           .attr("transform", "translate(0," + bar_height + ")")
           .call(xAxis_bar);
       
           svg.append("g") // visualize y axis
           .attr("class", "y axis")
           .call(yAxis_bar)
           .append("text")
           .attr("y", -35)
           .attr("dy", ".71em")
           .style("text-anchor", "end")
           .text("Total Score");
       
   
       }
   
 
       function create_line1(){ //visualize line plot
   
           line_svg = d3
               .select("#line_plot")
               .append("svg")
               .attr("width",600)
               .attr("height",800)
               .append("g")
               .attr("transform", "translate(" + 80 + "," + 170 + ")");
   
       }

       function line_value(){ //show line plot's value
        line_svg.append("path")
        .attr("class", "line")
        .attr({
            "d": line_1(data3),
            "fill": "none",
            "stroke": "black"
            
        })

        
        line_svg.append("g") //line plot x axis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + line_height + ")")
        .call(xAxis_line);
 
        line_svg.append("g") //lien plot y axis
        .attr("class", "y axis")
        .call(yAxis_line)
        .append("text")
        .attr("font-size","px")
        .attr("y", -40)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Rating");

       }

       function line_value_remove(){ //remove value of line plot
           line_svg.selectAll("path").remove()
       }

     
   
     function update_bar(data) { // show value of bar plot
         svg.selectAll("bar")
             .data(data)
             .enter()
             .append("rect")
             .transition()
             .duration(750) // 0.75 second
             .attr("x", function (d) { return bar_x(d.Year); })
             .attr("y", function (d) { return bar_y(d.Total_Score); })
             .attr("width", bar_x.rangeBand())
             .attr("height", function (d) { return bar_height - bar_y(d.Total_Score); })
             .style("fill", function (d) { // bar colour
                 if (d.Total_Score <= 20) {
                     return "#da0d0d"; //red
                 }
                 else if (d.Total_Score <= 40) {
                     return "#ff5733"; //orange
                 }
                 else if (d.Total_Score <= 60) {
                     return "#ffec33"; //yellow
                 }
                 else if (d.Total_Score <= 80) {
                     return "#a8dd25"; //light green
                 }
                 else {
                     return "#3eda0d"; //green
                 }
             })
     }

     function remove_bar(){ 
        svg.selectAll("rect").remove(); // remove previous bar's value
     }

   
   function unique_University(AllUniversity){ //this function is use to extract unique university name
   
       for(let i=0; i<dt.length;i++)
       {
           AllUniversity.push(dt[i].University_Name)
       }
   
       AllUniversity = AllUniversity.filter((c, index) => { //filter duplicate elements
           return AllUniversity.indexOf(c) === index;
       });
       return AllUniversity
   
       }

   function update_data(University, Rating){ //update data according to the filter
    line_value_remove()
    remove_bar()
    value = Extract_Value(University,Rating)
    data1 = value[0]
    data3 = value[1]
    line_value()
    update_bar(data1)

}

function Extract_Value(University,Rating){ //
    var num=0
    var num2 = 0

    for(let i=0; i<dt.length; i++)
    {

     if(dt[i].University_Name == University)
        {
            data1[num].Total_Score = dt[i].Total_Score
            num = num+1
            //rating = ["Teaching_Rating","Research_Rating","Citations_Rating","Inter_Outlook_Rating","Industry_Income_Rating"]

            if(Rating == "Teaching_Rating"){
                data3[num2].Teaching_Rating = dt[i].Teaching_Rating
                num2 = num2 +1

            }
            else if (Rating == "Research_Rating")
            {
                data3[num2].Teaching_Rating = dt[i].Research_Rating
                num2 = num2 +1
            }
            else if (Rating == "Citations_Rating")
            {
                data3[num2].Teaching_Rating = dt[i].Citations_Rating
                num2 = num2 +1
            }
            else if (Rating == "Inter_Outlook_Rating")
            {
                data3[num2].Teaching_Rating = dt[i].Inter_Outlook_Rating
                num2 = num2 +1
            }
            else if (Rating == "Industry_Income_Rating")
            {
                data3[num2].Teaching_Rating = dt[i].Industry_Income_Rating
                num2 = num2 +1
            }
        }
     }
     return [data1,data3]
}

   
   
     // Initialize the plot with the first dataset
     create_bar()
     create_line1()
     line_value()
     update_bar(data1)
    
     
   })
   }
