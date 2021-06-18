
var mapGheto = new maptalks.Map('mapGheto', {
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
  
  Promise.all([
    d3.json("https://raw.githubusercontent.com/texty/upa_map/main/data/UKR_adm1.json"), //0
    d3.csv("../gheto_clear.csv"),
    d3.csv("../villages.csv")
  ]).then(function (data) {

    new maptalks.VectorLayer('admin', data[0]).addTo(mapGheto);
    new maptalks.VectorLayer('admin', data[0]).addTo(mapVillage);

  
  
    window.globalData = data[1];
    const gheto = new maptalks.VectorLayer('upa').addTo(mapGheto);
    const village = new maptalks.VectorLayer('upa_main').addTo(mapVillage);


    const maxColorGheto = d3.max(data[1].map(d => d.color))
    const maxColorVillage = d3.max(data[1].map(d => d.color))


    const ghetoScale = d3.scaleLinear()
      // .exponent(3)
      .domain([0, maxColorGheto]) 
      .range([0, 1])
      
    const villageScale = d3.scalePow()
      .exponent(0.35)
      .domain([0, maxColorVillage]) 
      .range([0, 1])


   

    function getSizeGheto(a) {
      if (a < 600) {
        return 10
      } else if (a < 2000) {
        return 20
      }
      else if (a < 100000) {
        return 25
      }
    }

    function getColorGheto(a) {
      if (a == -9999) {
        return "#ff8c50"
      } else {
        return d3.interpolateReds(ghetoScale(a))
      }
    }


    function getSizeVillage(a) {
      if (a < 100) {
        return 10
      } else if (a < 355) {
        return 20
      }
      else if (a < 800) {
        return 25
      }
    }

    function getColorVillage(a) {
      if (a == -9999) {
        return "#ff8c50"
      } else {
        return d3.interpolateReds(villageScale(a))
      }
    }

    // (600.0, 2000.0, 9450
  
    data[1].forEach(function (d) {
      d.lat = +d.lat;
      d.lon = +d.lon;
    });
  
  
    data[1].forEach(function (d) {
      // console.log(d)
      var ghetoMarker = new maptalks.Marker(
        [d.lon, d.lat], {
        symbol: {
          'markerType': 'ellipse',
          'markerFill': getColorGheto(d.color),
          'markerFillOpacity': 1,
          'markerLineColor': "#b4b4b4",
          'markerLineWidth': 0,
          'markerWidth': getSizeGheto(d.size),
          'markerHeight': getSizeGheto(d.size)
        },

      }
  
  
      );
  
      var tipGheto = new maptalks.ui.ToolTip(d.descr, width="20px");
  
      tipGheto.addTo(ghetoMarker);
  
      gheto.addGeometry(ghetoMarker);
  
    });

      
    data[2].forEach(function (d) {
      // console.log(d)
      var villageMarker = new maptalks.Marker(
        [d.lon, d.lat], {
        symbol: {
          'markerType': 'ellipse',
          'markerFill': getColorVillage(d.dead_for_map),
          'markerFillOpacity': 1,
          'markerLineColor': "#b4b4b4",
          'markerLineWidth': 0,
          'markerWidth': getSizeVillage(d.population_for_map),
          'markerHeight': getSizeVillage(d.population_for_map)
        },
        properties: {
          "date": d.year
        }
      }
  
  
      );
  
      var tipVillage = new maptalks.ui.ToolTip(d.descr, width="80px");
  
      tipVillage.addTo(villageMarker);
  
      village.addGeometry(villageMarker);
  
    });
  
    function filter(date_val) {
      village._geoList
        .forEach(function (feature) {
          ;
  
          if (feature.properties.date > +date_val) {
            feature._symbol.markerFillOpacity = 0
  
            feature.updateSymbol([
              {
              }
            ]);
          }
          else {
            feature._symbol.markerFillOpacity = 1
            feature.updateSymbol([
              {
              }
            ]);
          }
        });
  

  

    }

    var mySlider = new rSlider({
      target: '#sampleSlider',
      values: ["1941", "1942", "1943", "1944"],
      range: false,
      tooltip: true,
      scale: true,
      labels: false,
      set: ["194"],
      onChange: function (vals) { filter(vals) }
    });
    

  
    d3.select("span#close").on("click", function () {
      d3.select("div#myModal").style("display", "none");
    });
  
  
  });