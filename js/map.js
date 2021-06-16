
var mapGheto = new maptalks.Map('mapGheto', {
    center: [33.372536, 49.064028], 
      maxZoom: 12,
      zoom: 7,
    // attributionControl: {
    //   'content': '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
    // },
    // baseLayer: new maptalks.TileLayer('tile', {
    //   urlTemplate: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
    //   subdomains: ['a', 'b', 'c', 'd'],
    //   attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
    // }),
    zoomControl: {
      'position': 'top-left',
      'slider': false,
      'zoomLevel': false
    },
    layers: [
      new maptalks.VectorLayer('v')
    ],
    minZoom: 7,
    maxZoom: 10,
    maxPitch: 0,
    pitch: 0,
    scrollWheelZoom: false
  });


var mapVillage = new maptalks.Map('mapVillage', {
  center: [33.372536, 49.064028], 
    maxZoom: 12,
    zoom: 7,
  zoomControl: {
    'position': 'top-left',
    'slider': false,
    'zoomLevel': false
  },
  layers: [
    new maptalks.VectorLayer('v')
  ],
  minZoom: 7,
  maxZoom: 10,
  maxPitch: 0,
  pitch: 0,
  scrollWheelZoom: false
});
  

  var mySlider = new rSlider({
    target: '#sampleSlider',
    values: ["лип.1941", "серп.1941", "вер.1941", "жовт.1941", "лист.1941", "груд.1941",
      "січ.1942", "лют.1942", "бер.1942", "квіт.1942", "трав.1942", "черв.1942", "лип.1942",
      "серп.1942", "вер.1942", "жовт.1942", "лист.1942", "груд.1942"],
    range: false,
    tooltip: true,
    scale: true,
    labels: false,
    set: ["груд.1942"],
    // onChange: function (vals) { filter(dict_of_vals[vals]) }
  });
  
  Promise.all([
    d3.json("https://raw.githubusercontent.com/texty/upa_map/main/data/UKR_adm1.json"), //0
    // d3.csv("https://raw.githubusercontent.com/texty/upa_map/main/data/geocode_upa_with_dest.csv"), //1
    d3.csv("gheto_clear.csv"),
  
  
  ]).then(function (data) {

    new maptalks.VectorLayer('admin', data[0]).addTo(mapGheto);
  
  
    window.globalData = data[1];
    const upa_places = new maptalks.VectorLayer('upa').addTo(mapGheto);
    const obl_markers = new maptalks.VectorLayer('upa_main').addTo(mapGheto);


    const maxColor = d3.max(data[1].map(d => d.color))

   

    function getSize(a) {
      if (a < 600) {
        return 10
      } else if (a < 2000) {
        return 20
      }
      else if (a < 100000) {
        return 25
      }
    }

    function getColor(a) {
      if (a == -9999) {
        return "#ff8c50"
      } else {
        return d3.interpolateReds(a/maxColor)
      }
    }

    // (600.0, 2000.0, 9450
  
    data[1].forEach(function (d) {
      d.lat = +d.lat;
      d.lon = +d.lon;
    });
  
  
    data[1].forEach(function (d) {
      // console.log(d)
      var src = new maptalks.Marker(
        [d.lon, d.lat], {
        symbol: {
          'markerType': 'ellipse',
          'markerFill': getColor(d.color),
          'markerFillOpacity': 1,
          'markerLineColor': "#b4b4b4",
          'markerLineWidth': 0,
          'markerWidth': getSize(d.size),
          'markerHeight': getSize(d.size)
        },

      }
  
  
      );
  
      var tip = new maptalks.ui.ToolTip(d.descr);
  
      tip.addTo(src);
  
      upa_places.addGeometry(src);
  
    });
  
    function filter(date_val) {
      upa_places._geoList
        .forEach(function (feature) {
          ;
  
          if (feature.properties.date > date_val) {
            // feature._symbol.markerFill = "#7375d8";
            feature._symbol.markerFillOpacity = 0
  
            feature.updateSymbol([
              {
                // 'markerFill': '#7375d8',
                // 'markerWidth': 100,
                // 'markerHeight': 100
              }
            ]);
          }
          else {
            feature._symbol.markerFill = "#ff3d4f";
            feature._symbol.markerFillOpacity = 1
            feature.updateSymbol([
              {
                // 'markerFill': '#7375d8',
                // 'markerWidth': 100,
                // 'markerHeight': 100
              }
            ]);
          }
        });
  
  
      obl_markers._geoList
        .forEach(function (feature) {
          ;
  
          if (feature.properties.date > date_val) {
            // feature._symbol.markerFill = "#7375d8";
            feature._symbol.markerFillOpacity = 0
            feature._symbol.markerLineWidth = 0
            feature.updateSymbol([
              {
                // 'markerFill': '#7375d8',
                // 'markerWidth': 100,
                // 'markerHeight': 100
              }
            ]);
          }
          else {
            feature._symbol.markerFill = "#ff3d4f";
            feature._symbol.markerFillOpacity = 1
            feature._symbol.markerLineWidth = 4
            feature.updateSymbol([
              {
                // 'markerFill': '#7375d8',
                // 'markerWidth': 100,
                // 'markerHeight': 100
              }
            ]);
          }
        });
  
  
  
      linesLayer._geoList
        .forEach(function (feature) {
  
          if (feature.properties.date > date_val) {
            // feature._symbol.markerFill = "#7375d8";
            feature._symbol.lineOpacity = 0
            feature.updateSymbol([
              {
              }
            ]);
          }
          else {
            feature._symbol.lineOpacity = 1
            feature.updateSymbol([
              {
              }
            ]);
          }
        });
    }
  
  
    // var mySlider = new rSlider({
    //   target: '#sampleSlider',
    //   values: ["лип.1941", "серп.1941", "вер.1941", "жовт.1941", "лист.1941", "груд.1941",
    //     "січ.1942", "лют.1942", "бер.1942", "квіт.1942", "трав.1942", "черв.1942", "лип.1942",
    //     "серп.1942", "вер.1942", "жовт.1942", "лист.1942", "груд.1942"],
    //   range: false,
    //   tooltip: true,
    //   scale: true,
    //   labels: false,
    //   set: ["груд.1942"],
    //   onChange: function (vals) { filter(dict_of_vals[vals]) }
    // });
  
    // linesLayer.on('click', function (e) {
    //     debugger;
    //     alert(e)
  
    //     });
  
    // map.on('click', function (e) {
    //   //reset colors
    //   // upa_places.forEach(function (g) {
    //   //   g.updateSymbol({
    //   //     'markerFill' : '#0e595e'
    //   //   });
    //   // });
    //   //identify
    //   map.identify(
    //     {
    //       'coordinate': e.coordinate,
    //       'layers': [obl_markers],
    //       // "count": 1
    //     },
    //     function (geos) {
    //       // debugger;
    //       // console.log(geos.map(d => d.properties.place)),
    //       // // console.log(geos[0].properties.parent_node)
    //       // console.log(geos.map(d => d._coordinates))
    //       // console.log(geos.map(d => d.properties.type))
  
  
  
    //       geos.forEach(function (g) {
  
    //         var html_name = names_of_obl[g.properties.place.trim()];
    //         // debugger;
  
  
    //         if (html_name) {
    //           d3.select("div#myModal").style("display", "block");
  
    //           d3.html(`https://raw.githubusercontent.com/texty/upa_map/main/htmls/${html_name}`).then(function (d) {
    //             d3.select("div#myModal div#modal-text").html(d.body.innerHTML)
    //           });
  
    //         }
  
    //         // if (g.properties.type == "child") {
    //         //   console.log(g.properties.place)
  
    //         //   d3.select("div#myModal").style("display", "block");
  
    //         //   d3.html("htmls/staline.html").then(function (d) {
    //         //     d3.select("div#myModal div#modal-text").html(d.body.innerHTML)
    //         //   });
    //         // }
    //         // g.updateSymbol({
    //         //   'markerFill' : '#f00'
    //         // });
    //       });
    //       // if (geos.length === 0) {
    //       //   return;
    //       // }
    //       // geos.forEach(function (g) {
    //       //   g.updateSymbol({
    //       //     'markerFill' : '#f00'
    //       //   });
    //       // });
    //     }
    //   );
    // });
  
  
  
    // d3.select("#filter").on("click", function(){
    //     d3.select("div#myModal").style("display", "block");
  
    //     d3.html("htmls/staline.html").then(function (d) { 
    //         d3.select("div#myModal div#modal-text").html(d.body.innerHTML)
    //     }); 
  
    // });
  
    d3.select("span#close").on("click", function () {
      d3.select("div#myModal").style("display", "none");
    });
  
  
  });