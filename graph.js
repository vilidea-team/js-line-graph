function get_graph(all_points){

  // The tallest the graph will ever go
  var max = Math.max(...all_points);
  
  // And this is the lowest it will ever go
  var min = Math.min(...all_points);

  // This is how we evenly seperate the points
  var point_offset = 100 / (all_points.length - 1)
  
  var polygon_points = []
  var all_points_percentages = []

  var no_change = max - min == 0

  for (p = 0; p < all_points.length; ++p) {
  	  
    var percent = no_change ? 0 : 100 - (100 * (all_points[p] - min) / (max - min))
    all_points_percentages.push(percent)
    
    // This is the coords of the point
    polygon_points.unshift(percent + " " + (p == 0 || p == 1 ? "0" : ((point_offset * (p - 1)))))
  }

  // Add the final 99
  polygon_points.unshift(100)

  var y_axis_increment = (max - min) / 4
  var y_axis_points = ``

  y_axis_points = `<div class="y-axis">
    <span>${ max }</span>
    <span>${ Math.round(((y_axis_increment * 3) + min) * 10) / 10 }</span>
    <span>${ Math.round(((y_axis_increment * 2) + min) * 10) / 10 }</span>
    <span>${ Math.round((y_axis_increment + min) * 10) / 10 }</span>
    <span>${ min }</span>
  </div>`

  if(no_change){
    y_axis_points = `<div class="y-axis"><span>${ max }</span></div>`
  }

  return `
  <div class="graph_container">
  	${ y_axis_points }
  	<svg width="100%" height="100%" viewBox="0 0 100 110" preserveAspectRatio="none" class="graph">       
		      <polygon class="bottom" points="${ polygon_points.join(',') },
		                                      110 100,
		                                      110" />
		       <polyline class="line" vector-effect="non-scaling-stroke" points="${ polygon_points.join(',') },${ all_points_percentages[0] }" />

		       <polyline points="100, ${ all_points_percentages[all_points_percentages.length - 1] + 0.1 }, 100, ${ all_points_percentages[all_points_percentages.length - 1] }"
		  vector-effect="non-scaling-stroke" class="circle" />
  	</svg>
  </div>
  `
}
