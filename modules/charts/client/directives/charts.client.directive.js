(function () {
  'use strict';


angular.module('charts')
    .directive('chartIot',chatIot)


function chatIot() {
  var directive= {
    restrict: 'EA',
    transclude: true,
    scope: {
        data:"=",
        index:"=",
        type:"="
    },
    link: link
  };

  return directive;

  function link(scope) {
    
        scope.$watch('type',function(newVals,oldVals){
            
            if(newVals!=oldVals){
                    d3.selectAll("#chart-"+scope.index+" > *").remove();
                    createGraph();
            }
        })
        function createGraph(){
            var data=scope.data;
            var type=scope.type;
            var svg = d3.select("#chart-"+scope.index),
                margin = {top: 20, right: 20, bottom: 30, left: 40},
                width = +svg.attr("width") - margin.left - margin.right,
                height = +svg.attr("height") - margin.top - margin.bottom;
            
                var x = d3.scaleTime().range([0, width]),
                y = d3.scaleLinear().range([height, 0]);

                var xAxis = d3.axisBottom(x),
                yAxis = d3.axisLeft(y);

                var zoom = d3.zoom()
                .scaleExtent([1, 32])
                .translateExtent([[0, 0], [width, height]])
                .extent([[0, 0], [width, height]])
                .on("zoom", zoomed);

                var line = d3.line()
                .curve(d3.curveMonotoneX)
                .x(function(d) { return x(d.body.effective_time_frame.date_time); })
                .y(function(d) { return y(d.body.data[type].value); });

                svg.append("defs").append("clipPath")
                .attr("id", "clip")
                .append("rect")
                .attr("width", width)
                .attr("height", height);

                var g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                /*
                var div = svg.append("div")
                .attr("class", "tooltip")				
                .style("opacity", 0);
                */
                x.domain(d3.extent(data, 
                function(d) { d.body.effective_time_frame.date_time=new Date(d.body.effective_time_frame.date_time); 
                                return d.body.effective_time_frame.date_time; }));
                y.domain([0, d3.max(data, function(d) {return d.body.data[type].value; })]);

                g.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("d", line);

                g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

                g.append("g")
                .attr("class", "axis axis--y")
                .call(yAxis);

                /*	
                    .data(data)			
                .enter().append("circle")
                    .attr("r", 5)		
                    .attr("cx", function(d) { return x(d.body.effective_time_frame.date_time); })		 
                    .attr("cy", function(d) { return y(d.body.data[type].value); })	 
                    .call(tooltipZoom()) 
                */	


                // Gratuitous intro zoom!
                svg.call(zoom)


                function zoomed() {
                var t = d3.event.transform, xt = t.rescaleX(x);
                g.select(".line").attr("d", line.x(function(d) { return xt(d.body.effective_time_frame.date_time); }));
                g.select(".axis--x").call(xAxis.scale(xt));
                }
            }
        
    }
    
} 
}());

