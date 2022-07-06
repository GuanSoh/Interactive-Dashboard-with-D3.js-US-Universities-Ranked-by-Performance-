function main(){
    
    d3.csv('University_data.csv', function(dt){
    rank = "Unknown"
    
    var year = ["2011","2012","2013","2014","2015","2016"] 
    var selected_year = "2011"
    var selected_university = "Harvard University"
    var AllUniversity = [] 
    AllUniversity = unique_University(AllUniversity) //this var store unique university name that use for filter bar
    var width = 1200 
    var height = 1200
    var colors = []
    Category = ["Teaching","Research","Citation","Inter Outlook","Industrial Income"] 
    total_stu = 0 //variable for total student 
    measure = [] //value for display box
    ratio = [] //ratio for pictograph
    value2 = Extract_ratio(selected_university,selected_year,measure,ratio)
    measure = value2[0]
    total_stu = value2[1]
    ratio = value2[2]
    colors = change_color(measure,colors) //this variable if for display box's colors
    var filled = "#6fd243" //color for filled circle (Pictograph)
    var non_filled = "#e1e6ea" //color for non-filled circle (Pictograph)
    var stu_staff = [] //use to store color for each circle for student and stuff ratio
    var male_female = [] //use to store color for each circle for male and female ratio
    var local_int = [] //use to store color for each circle for local and international ratio
    colors2 = [stu_staff,male_female,local_int]
    colors2 = decide_color(ratio,colors2) //this variable if for Pictograph's colors

    





    //<----Faris's code-------->
    // Define path generator
    var projection = d3.geo.albersUsa()
				   .translate([width/4, height/6])    // translate to center of screen
				   .scale([700]);          // scale things down so see entire US
    var path = d3.geo.path()               // path generator that will convert GeoJSON to SVG paths
    .projection(projection);  // tell path generator to use albersUsa projection
    // Define linear scale for output
    var map_color = d3.scale.linear()
			  .range(["rgb(0,0,0)","rgb(179, 188, 192)"]); // set color here for the map

    var filter = d3
    // var div = d3.select("body").append("div") //div is for pop out box for pictograph's onmouse
    // .attr("class", "tooltip")
    // .style("opacity", 0);

    



    // //<--------------------------!!! Filter Drop Down Bar----------------------->
    var select = d3.select("body")
    .append("div")
    .attr("class","filter3")
    .append("select")

     select
    .on("change", function(d) {
      selected_university = d3.select(this).property("value");
      update_info(selected_university,selected_year)
    });

     select.selectAll("option")
    .data(AllUniversity)
    .enter()
      .append("option")
      .attr("value", function (d) { return d; })
      .text(function (d) { return d; });

    // filter bar for Year
      var select2 = d3.select("body")
      .append("div")
      .attr("class","filter2")
      .append("select")
  
       select2
      .on("change", function(d) {
        selected_year = d3.select(this).property("value");
        update_info(selected_university,selected_year)
      });
  
       select2.selectAll("option")
      .data(year)
      .enter()
        .append("option")
        .attr("value", function (d) { return d; })
        .text(function (d) { return d; });
    //<--------------------------!!! Filter Drop Down Bar----------------------->

    var div = d3.select("body").append("div") //div is for pop out box for pictograph's onmouse
    .attr("class", "tooltip")
    .style("opacity", 0);

    var div2 = d3.select("body").append("div")
    .attr("class", "tooltip2")
    .style("opacity", 0);

    var div3 = d3.select("body").append("div")
    .attr("class", "tooltip3")
    .style("opacity", 0);

    var div4 = d3.select("body")
		    .append("div")   
    		.attr("class", "tooltip4")               
    		.style("opacity", 0);

    var svg = d3.select("body")
                 .append("svg")
                 .attr("width",width)
                 .attr("height",height)
                 .attr("class","SVG");   

    

    location(selected_university)    
    map()         
    create_displaybox()


  

    //<--------- Below section is use for define all function that use above

    function Extract_ratio(University, Year, measure, ratio){ //this function is use to get value for specific uni and year
            for(let i=0; i<dt.length; i++)
                {
        
                 if(dt[i].University_Name == University && dt[i].Year == Year)
                    {
                        measure.push(parseFloat(dt[i].Teaching_Rating))
                        measure.push(parseFloat(dt[i].Research_Rating))
                        measure.push(parseFloat(dt[i].Citations_Rating))
                        measure.push(parseFloat(dt[i].Inter_Outlook_Rating))
                        measure.push(parseFloat(dt[i].Industry_Income_Rating))
                        total_stu = parseInt(dt[i].Num_Students) //number of total student for that uni in specific year
                        ratio.push(dt[i].Student_Staff_Ratio)
                        ratio.push(dt[i].Female_Students_Ratio)
                        ratio.push(dt[i].Inter_Students_Ratio)
                        rank = dt[i].World_Rank
                    }
                 }
            for(let i=0; i<measure.length;i++) //check any null value inside 
            {
                if(measure[i]=="-")
                {
                    measure[i] = "Null"
                }
            }

            for(let i=0; i<ratio.length;i++) //check any null value inside
            {
                console.log(ratio)
                if(ratio[i]=="")
                {
                    ratio[i] = "Null"
                }
            }

            if(measure.length==0) //if the data not available
            {
                measure = ["Null","Null","Null","Null","Null"]
                total_stu = "Null"
                ratio = ["Null","Null","Null"]
            }

            // if(total_stu==null)
            // {
            //     total_stu = "Null"
            // }

            return [measure,total_stu, ratio]
        
            }

    function change_color(measure,colors) //this function is use to decide which color to use according to ratio (Display Box)
    {
        for (let i = 0; i < measure.length; i++) {
            if (measure[i] > 80 ) {
                colors.push("#145A32")
              }
            else if(measure[i] <=80 && measure[i] > 60){
                colors.push("#52BE80")
            }
            else if(measure[i] <=60 && measure[i] >40)
            {
                colors.push("#DC7633")
            }
            else if(measure[i] <=40 && measure[i] >20){
                colors.push("#C0392B")
            }
            else if(measure[i] <=20 && measure[i] >=0){
                colors.push("#641E16")
            }
            else{
                colors.push("#dbd5cd")
            }
         }
         return colors
    }

    function decide_color(rt, color) // this function is use to decide color for each circle according to the value (Pictograph)
    {
        //rt.splice(0, rt.length)
        for (let i = 0; i < rt.length; i++) {
            if(rt[i]>80)
            {
                color[i].push(filled)
                color[i].push(filled)
                color[i].push(filled)
                color[i].push(filled)
                color[i].push(filled)
            }
            else if(ratio[i]>60)
            {
                color[i].push(filled)
                color[i].push(filled)
                color[i].push(filled)
                color[i].push(filled)
                color[i].push(non_filled)
    
            }
            else if(ratio[i]>40)
            {
                color[i].push(filled)
                color[i].push(filled)
                color[i].push(filled)
                color[i].push(non_filled)
                color[i].push(non_filled)
            }
            else if(ratio[i]>20)
            {
                color[i].push(filled)
                color[i].push(filled)
                color[i].push(non_filled)
                color[i].push(non_filled)
                color[i].push(non_filled)
            }
            else if(ratio[i]>0)
            {
                color[i].push(filled)
                color[i].push(non_filled)
                color[i].push(non_filled)
                color[i].push(non_filled)
                color[i].push(non_filled)
            }
            else if(ratio[i]==0)
            {
                color[i].push(non_filled)
                color[i].push(non_filled)
                color[i].push(non_filled)
                color[i].push(non_filled)
                color[i].push(non_filled)

            }
          }
          return color
    
    
    }


    function Empty_Array(measure, colors,ratio,color2) //this function is use to remove all elements in array
    {
        for(let i=0; i<color2.length; i++)
        {
            color2[i].splice(0, color2[i].length)
        }
        measure.splice(0,measure.length)
        colors.splice(0,colors.length)
        ratio.splice(0,ratio.length)
        return [measure, colors,ratio,color2]
    }

    function update_info(University,Year) //this function is use to update the plot's data
    {
        group.remove()
        value = Empty_Array(measure,colors,ratio,colors2)
        measure = value[0]
        colors = value[1]
        ratio = value[2]
        colors2 = value[3]
        value2 = Extract_ratio(University,Year,measure,ratio)
        measure = value2[0]
        total_stu = value2[1]
        ratio = value2[2]
        colors = change_color(measure,colors)
        colors2 = decide_color(ratio,colors2)
        location(University)
        create_displaybox()
  
    }

    function create_displaybox(){ //this function is use to visualize the plot

         //<------ below is code for plot that visualize display box>
         group = svg.selectAll('g')
                 .data(measure)
                 .enter().append('g')
                 .attr("transform",function(d,i){
                     return "translate(0,0)";
                 })
                 group.append('circle')
                 .attr("cx",function(d,i){
                     return i*100 + 50;
                 })
                 .attr('cy',function(d,i){
                             return 495;
                         })
                 .attr("r",function(d){
                             return 45;
                         })
                 .attr("fill","transparent")
                 .attr("stroke",function(d,i){
                     return colors[i]
                 })
                 .attr("stroke-width","4px");
                 group.append("text")
                 .attr("x",function(d,i){
                     return i*100 +30;
         
                 })
                 .attr('y',505)
                 .attr('stroke','black')
                 .attr('font-size','20px')
                 .attr('font-family','sans-serif')
                 .text(function(d,i){
                     return measure[i]; 
                 })
         
         
                 group.append("text")
                 .attr("x", function(d,i){
                     return i*100 +12;
                 })
                 .attr("y",435)
                 .attr('stroke','black')
                 .attr("stroke-width","0.5px")
                 .attr("font-size","15px")
                 .attr("font-family","sans-serif")
                 .text(function(d,i){
                     return Category[i];
                 })

                //<------ below is code for plot that visualize total student>
                 group.append('image') 
                 .attr({
                     'href': 'students.png',  // can also add svg file here
                     x: 650,
                     y: 400,
                     width: 128,
                     height: 128
                 })


                 group.append("text") //display number of student
                 .attr("x", 800)
                 .attr("y",500)
                 .attr('stroke','black')
                 .attr("stroke-width","0.5px")
                 .attr("font-size","50px")
                 .attr("font-family","cursive")
                 .text(total_stu)
             
                 group.append("text") //display the sentence "Total Student"
                 .attr("x", 800)
                 .attr("y",450)
                 .attr('stroke','black')
                 .attr("stroke-width","0.5px")
                 .attr("font-size","30px")
                 .attr("font-family","sans-serif")
                 .text("Total Student")

                 //<------ below is code for plot that Pictograph>
                 group.append('circle')
                 .attr("cx",function(d,i){
                             return i*50 + 650;
                         })
                 .attr('cy',function(d,i){
                             return 70;
                         })
                  .attr("r",function(d){
                             return 15;
                         })
                 .attr("fill",function(d,i){
                     return stu_staff[i]
                 })
                 .attr("stroke","#000000")
                 .on('mouseover', function (d, i) {
                     d3.select(this).transition()
                          .duration('50')
                          .attr('opacity', '.85');
             
                     div.transition()
                          .duration(50)
                          .style("opacity", 1);
                     div.html(ratio[0])
                     .style("left", (d3.event.pageX) + "px")     
                     .style("top", (d3.event.pageY - 28) + "px")
                     })
                 .on('mouseout', function (d, i) {
                     d3.select(this).transition()
                          .duration('50')
                          .attr('opacity', '1');
                     
                     div.transition()
                          .duration('50')
                          .style("opacity", 0);
                 });
             
             
                 group.append('circle')
                 .attr("cx",function(d,i){
                             return i*50 + 650;
                         })
                 .attr('cy',function(d,i){
                             return 200;
                         })
                  .attr("r",function(d){
                             return 15;
                         })
                 .attr("fill",function(d,i){
                     return male_female[i]
                 })
                 .attr("stroke","#000000")
                 .on('mouseover', function (d, i) {
                     d3.select(this).transition()
                          .duration('50')
                          .attr('opacity', '.85');
             
                     div2.transition()
                          .duration(50)
                          .style("opacity", 1);
                     div2.html(ratio[1])
                     .style("left", (d3.event.pageX) + "px")     
                     .style("top", (d3.event.pageY - 28) + "px")
                     })
                 .on('mouseout', function (d, i) {
                     d3.select(this).transition()
                          .duration('50')
                          .attr('opacity', '1');
                     
                     div2.transition()
                          .duration('50')
                          .style("opacity", 0);
                 });
             
                     group.append('circle')
                     .attr("cx",function(d,i){
                                 return i*50 + 650;
                             })
                     .attr('cy',function(d,i){
                                 return 325;
                             })
                      .attr("r",function(d){
                                 return 15;
                             })
                     .attr("fill",function(d,i){
                         return local_int[i]
                     })
                     .attr("stroke","#000000")
                     .on('mouseover', function (d, i) {
                         d3.select(this).transition()
                              .duration('50')
                              .attr('opacity', '.85');
                 
                         div3.transition()
                              .duration(50)
                              .style("opacity", 1);
                         div3.html(ratio[2])
                         .style("left", (d3.event.pageX) + "px")     
                         .style("top", (d3.event.pageY - 28) + "px")
                         })
                     .on('mouseout', function (d, i) {
                         d3.select(this).transition()
                              .duration('50')
                              .attr('opacity', '1');
                         
                         div3.transition()
                              .duration('50')
                              .style("opacity", 0);
                     });
                 
             
             
                 group.append("text")
                 .attr("x",650)
                 .attr("y",40)
                 .attr("font-size","20px")
                 .attr("font-family","sans-serif")
                 .text("Student to Staff Ratio");
             
                 group.append("text")
                 .attr("x",650)
                 .attr("y",170)
                 .attr("font-size","20px")
                 .attr("font-family","sans-serif")
                 .text("Male to Female Ratio");
             
                 group.append("text")
                 .attr("x",640)
                 .attr("y",290)
                 .attr("font-size","20px")
                 .attr("font-family","sans-serif")
                 .text("Local to International Ratio");
             

    }


    function createTitle(title) { // create chart title
        svg.append("text")
            .attr("x", (chart_width / 2))
            .attr("y", 0 - (margin.chart_top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("text-decoration", "underline")
            .text(title);
    }

    function map(){
        d3.csv("stateslived.csv", function(data) {


            // Load GeoJSON data and merge with states data
            d3.json("us-states.json", function(json) {
            
            // Loop through each state data value in the .csv file
            for (var i = 0; i < data.length; i++) {
            
                // Grab State Name
                var dataState = data[i].state;
            
                // Grab data value 
                var dataValue = data[i].visited;
            
                // Find the corresponding state inside the GeoJSON
                for (var j = 0; j < json.features.length; j++)  {
                    var jsonState = json.features[j].properties.name;
            
                    if (dataState == jsonState) {
            
                    // Copy the data value into the JSON
                    json.features[j].properties.visited = dataValue; 
            
                    // Stop looking through the JSON
                    break;
                    }
                }
            }
                    
            // Bind the data to the SVG and create one path per GeoJSON feature
            svg.selectAll("path").remove()
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("stroke", "#fff")
                .style("stroke-width", "1")
                .style("fill", function(d) {
            
                // Get data value
                var value = d.properties.visited;
            
                if (value) {
                //If value exists…
                return map_color(value);
                } else {
                //If value is undefined…
                return "rgb(213,222,217)";
                }

            });
            });      
        });
    }

    function location(place) {        
        uniName = dt.filter(d => d.University_Name == place)

        // circle for location
        svg.selectAll("circle").remove()
            .data(uniName)
        svg.selectAll("circle").remove()
            .data(uniName)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return projection([+d.lon, +d.lat])[0];   
            })
            .attr("cy", function(d) {
                return projection([+d.lon, +d.lat])[1];
            })
            .attr("r", function(d) {
                return Math.sqrt(d.size) * 4;
            })
                .style("fill", "rgb(217,91,67)")	
                .style("opacity", 0.75)	
                

            .on("mouseover", function(d) {      
                div4.transition()        
                .duration(200)      
                .style("opacity", 1);      
                div4.text("Total Score: " + d.Total_Score) // for text in box
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px")
                    
            })   
            
            // fade out tooltip on mouse out               
            .on("mouseout", function(d) {       
                div4.transition()        
                .duration(200)      
                .style("opacity", 0);   
            });
            
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
            
    })
}
    