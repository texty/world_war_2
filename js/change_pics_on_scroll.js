Promise.all([
    d3.xml("scroll_section/01.svg"),
    d3.xml("scroll_section/02.svg"),
    d3.xml("scroll_section/03.svg"),
    d3.xml("scroll_section/04.svg"),
    d3.xml("scroll_section/05_new.svg"),
    d3.xml("scroll_section/06.svg"),
    d3.xml("scroll_section/07.svg"),
    d3.xml("scroll_section/01_copy.svg")
]).then(function(data){

    /* дивна поведінка xml, якщо не перезберегти у змінну, то можна використати лише один раз*/
    var c_0 = data[0].documentElement;
    var c_1 = data[1].documentElement;
    var c_2 = data[2].documentElement;
    var c_3 = data[3].documentElement;
    var c_4 = data[4].documentElement;
    var c_5 = data[5].documentElement;
    var c_6 = data[6].documentElement;
    var c_1_copy = data[7].documentElement;



    /* додаємо найперше svg, g-elements з усіх інших будемо додавати сюди*/
    d3.select("#chart").node().append(c_0);

    /* визначаємо його, з ним далі працюємо*/
    var svg = d3.select("#chart").select("svg");


    /* скрол вниз*/
    var change_pic_scrolling_down = function (svg_data, current_svg_index, next_svg_index, circles_arr) {


        /* видаляємо групи з попереднього svg*/
        svg.select("g#content-" + current_svg_index)
            .transition()
            .duration(2000)
            .style("opacity", 0)
            .remove();


        /* додаємо тимчасовий svg, щоб забрати з нього g#content*/
        d3.select("#chart-3")
            .node()
            .append(svg_data);

        var content_group = d3.select("#chart-3 > svg > g#content-"+next_svg_index).node().innerHTML;
        var circles_group = d3.select("#chart-3 > svg > g#circles-"+next_svg_index).node().innerHTML;



        d3.selectAll(".slider-dots span").classed("active", false);
        d3.select(".slider-dots span:nth-child("+ next_svg_index +")").classed("active", true);



        setTimeout(function () {
            /* міняємо положення та радіус для кружечків*/
            if(circles_arr && circles_arr != "array_6" ) {
                var step_arr = arrays_all.filter(function(d){ return d.array === circles_arr});
                step_arr.forEach(function (el) {
                    svg.select("circle#" + el.id)
                        .transition()
                        .duration(1000)
                        .attr("cx", el.cx_to)
                        .attr("cy", el.cy_to)
                        .attr("r", el.r_to)
                        .style("opacity", 0.07);
                });
            }

            /* додаємо групи з наступного svg  з анімацією прозорості */
            /* спочатку кружечки */
            d3.select("#chart")
                .select("svg")
                .append("g")
                .attr("id", "circles-"+next_svg_index)
                .style("opacity", 0)
                .html(circles_group)
                .transition()
                .duration(2000)
                .style("opacity", 1);

            /* потім все інше */
            d3.select("#chart")
                .select("svg")
                .append("g")
                .attr("id", "content-"+next_svg_index)
                .style("opacity", 0)
                .html(content_group)
                .transition()
                .duration(2000)
                .style("opacity", 1);
        }, 100);

        d3.select("#chart-3").select("svg").remove();
    };




    /* коли скролимо назад уверх*/
    function change_pic_scrolling_up(svg_data, next_svg_index, current_svg_index, circles_arr){
        /* видаляємо групи з попереднього svg*/
        svg.select("g#content-" + next_svg_index)
            .transition()
            .duration(2000)
            .style("opacity", 0)
            .remove();


        d3.select("#chart-3").node().append(svg_data);

        var content_group = d3.select("#chart-3 > svg > g#content-"+current_svg_index).node().innerHTML;

        svg.selectAll("g#circles-"+next_svg_index).remove();
        svg.select("g#content-"+next_svg_index).remove();


        d3.selectAll(".slider-dots span").classed("active", false);
        d3.select(".slider-dots span:nth-child("+ current_svg_index +")").classed("active", true);

        if(circles_arr) {
            var step_arr = arrays_all.filter(function(d){ return d.array === circles_arr});
            step_arr.forEach(function (el) {
                svg.select("circle#" + el.id)
                    .transition()
                    .duration(1000)
                    .attr("cx", el.cx_from)
                    .attr("cy", el.cy_from)
                    .attr("r", el.r_from)
                    .style("opacity", el.opacity);
            });
        }

        /* потім все інше */
        d3.select("#chart")
            .select("svg")
            .append("g")
            .attr("id", "content-"+current_svg_index)
            .style("opacity", 0)
            .html(content_group)
            .transition()
            .duration(2000)
            .style("opacity", 1);

        d3.select("#chart-3").select("svg").remove();

    }


    /* усі в */
    function last_scroll_down(){
        //red
        ["circle_1_3", "circle_1_4", "circle_1_5", "circle_1_6",
            "circle_2_1", "circle_2_2", "circle_2_5", "circle_2_6", "circle_2_7", "circle_2_8", "circle_2_9", "circle_2_10",
            "circle_4_2", "circle_4_4", "circle_4_6", "circle_4_7", "circle_4_8", "circle_4_9",
            "circle_6_1"
        ].forEach(function(el){
            svg.selectAll("circle#" + el)
                .transition()
                .duration(2000)
                .attr("cx", 704)
                .attr("cy", 204)
                .attr("r", 0)
        });

        //pink
        ["circle_1_1",
            "circle_2_3",
            "circle_4_1", "circle_4_5",
            "circle_5_1",  "circle_5_2",  "circle_5_3",  "circle_5_4", "circle_5_5"
        ].forEach(function(el){
            svg.selectAll("circle#" + el)
                .transition()
                .duration(2000)
                .attr("cx", 197)
                .attr("cy", 338)
                .attr("r", 0)
        });

        //brown
        ["circle_1_2",
            "circle_2_4",
            "circle_4_3", "circle_5_6",
            "circle_6_2",  "circle_6_3"].forEach(function(el){
            svg.selectAll("circle#" + el)
                .transition()
                .duration(2000)
                .attr("cx", 830)
                .attr("cy", 503)
                .attr("r", 0)
        });

        d3.selectAll(".slider-dots span").classed("active", false);
        d3.select(".slider-dots span:nth-child("+ 7 +")").classed("active", true);
    }

    function last_scroll_up(){
        arrays_all.forEach(function(el){

            svg.select("circle#" + el.id)
                .transition()
                .duration(2000)
                .attr("cx", el.cx_to)
                .attr("cy", el.cy_to)
                .attr("r", el.r_to)
        });
    }



    /* скролама */
    var container = document.querySelector('#scroll');
    var graphic = container.querySelector('.scroll__graphic');
    var text = container.querySelector('.scroll__text');
    var step = text.querySelectorAll('.step');
    var scroller = scrollama();


    function handleStepEnter(r) {
        if (r.index === 0 && r.direction == "up") {
            change_pic_scrolling_up(c_1_copy, 2, 1, "array_1")
        }
        if (r.index === 1 && r.direction == "down") {
            change_pic_scrolling_down(c_1, 1, 2, "array_1")
        }
        if (r.index === 1 && r.direction == "up") {
            change_pic_scrolling_up(c_1, 3, 2, "array_2")
        }
        if (r.index === 2 && r.direction == "down") {
            change_pic_scrolling_down(c_2, 2, 3, "array_2");
        }
        if (r.index === 2 && r.direction == "up") {
            change_pic_scrolling_up(c_2, 4, 3)
        }
        if (r.index === 3 && r.direction == "down") {
            change_pic_scrolling_down(c_3, 3, 4)
        }
        if (r.index === 3 && r.direction == "up") {
            change_pic_scrolling_up(c_3, 5, 4, "array_4")
        }
        if (r.index === 4 && r.direction == "down") {
            change_pic_scrolling_down(c_4, 4, 5, "array_4")
        }
        if (r.index === 4 && r.direction == "up") {
            change_pic_scrolling_up(c_4, 6, 5, "array_5")
        }
        if (r.index === 5 && r.direction == "down") {
            change_pic_scrolling_down(c_5, 5, 6, "array_5")
        }
        if (r.index === 5 && r.direction == "up") {
            last_scroll_up();
            change_pic_scrolling_up(c_5, 7, 6, "array_6");

        }
        if (r.index === 6 && r.direction == "down") {
            change_pic_scrolling_down(c_6, 6, 7, "array_6");
            last_scroll_down();
        }
    }


    scroller.setup({
        container: '#scroll',
        graphic: '.scroll__graphic',
        text: '.scroll__text',
        step: '.scroll__text .step'
    })
        .onStepEnter(handleStepEnter);

    window.addEventListener("resize", scroller.resize);

});

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

d3.select("#show-hidden-1").on("click", function(){
    d3.select("#hidden-1").classed("hidden-block", !d3.select("#hidden-1").classed("hidden-block"));
});


d3.select("#show-hidden-2").on("click", function(){
    d3.select("#hidden-2").classed("hidden-block", !d3.select("#hidden-2").classed("hidden-block"));
});