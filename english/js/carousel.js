/**
 * Created by yevheniia on 18.06.21.
 */
d3.selectAll(".preview img").on("click", function(){
    var clicked_src = d3.select(this).attr("src");

    d3.selectAll(".preview img").classed("gallery-hidden-pic", false);
    d3.select(this).classed("gallery-hidden-pic", true);

    d3.select(".gallery-main-pic img").attr("src", clicked_src);

});

d3.select("#show-hidden-3").on("click", function(){
    d3.select("#hidden-3").classed("hidden-block", !d3.select("#hidden-3").classed("hidden-block"));
});