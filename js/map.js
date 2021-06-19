
var mapGheto = new maptalks.Map('mapGheto', {
    center: [33.372536, 49.064028], 
      maxZoom: 12,
      zoom: 6.4 ,
    zoomControl: {
      'position': 'top-left',
      'slider': false,
      'zoomLevel': false
    },
    layers: [
      new maptalks.VectorLayer('v')
    ],
    minZoom: 6,
    maxZoom: 10,
    maxPitch: 0,
    pitch: 0,
    scrollWheelZoom: false
  });


var mapVillage = new maptalks.Map('mapVillage', {
  center: [33.372536, 49.064028], 
    maxZoom: 12,
    zoom: 6.4,
  zoomControl: {
    'position': 'top-left',
    'slider': false,
    'zoomLevel': false
  },
  layers: [
    new maptalks.VectorLayer('v')
  ],
  minZoom: 6,
  maxZoom: 10,
  maxPitch: 0,
  pitch: 0,
  scrollWheelZoom: false
});
  
  Promise.all([
    d3.json("https://raw.githubusercontent.com/texty/upa_map/main/data/UKR_adm1.json"), //0
    d3.csv("gheto_clear.csv"),
    d3.csv("villages.csv"),

  
  
  ]).then(function (data) {

    new maptalks.VectorLayer('admin', data[0])
    .setStyle({
      'symbol' : {
        'polygonFill': "#ffffff",
        'polygonOpacity': 0.7,
        'lineColor': 'silver',
        'lineWidth': 1,
        'lineOpacity': 0.7
    }
    }).addTo(mapGheto);
    
    new maptalks.VectorLayer('admin', data[0])
    .setStyle({
      'symbol' : {
        'polygonFill': "#ffffff",
        'polygonOpacity': 0.7,
        'lineColor': 'silver',
        'lineWidth': 1,
        'lineOpacity': 0.7
    }
    }).addTo(mapVillage);

  
  
    window.globalData = data[1];
    const gheto = new maptalks.VectorLayer('gheto').addTo(mapGheto);
    const village = new maptalks.VectorLayer('village').addTo(mapVillage);


    const maxColorGheto = d3.max(data[1].map(d => d.color))
    const maxColorVillage = d3.max(data[1].map(d => d.color))


    const ghetoScale = d3.scaleLinear()
      .domain([0, maxColorGheto]) 
      .range([0.2, 1])
      
    const villageScale = d3.scaleLinear()
      // .exponent(0.35)
      .domain([0, 200]) 
      .range([0.1, 1])


   

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
        // return d3.interpolateReds(ghetoScale(a))

        var color = d3.interpolateLab("#FF8A7D", "#64000D")(ghetoScale(a))
        return color

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
        // return d3.interpolateReds(villageScale(a))
        var color = d3.interpolateLab("#FF8A7D", "#64000D")(villageScale(a))
        return color
       
      }
    }

  
    data[1].forEach(function (d) {
      d.lat = +d.lat;
      d.lon = +d.lon;
    });
  
  
    data[1].forEach(function (d) {
      var ghetoMarker = new maptalks.Marker(
        [d.lon, d.lat], {
        symbol: {
          'markerType': 'ellipse',
          'markerFill': getColorGheto(d.color),
          // 'marketFill': 'rgb(135,196,240)',
          'markerFillOpacity': 0.7,
          'markerLineColor': "#b4b4b4",
          'markerLineWidth': 0,
          'markerWidth': getSizeGheto(d.size),
          'markerHeight': getSizeGheto(d.size)
        },

      }
  
  
      );

  
      var tipGheto = new maptalks.ui.ToolTip(` 
      <p>Населений пункт: ${d.settlment_name}</p>
      <p>Деталі: ${d.descr}</p>
      `).on("click", function(d) { 
        d.show()
       } );
  
      tipGheto.addTo(ghetoMarker);
  
      gheto.addGeometry(ghetoMarker);
  
    });

      
    data[2].forEach(function (d) {
      var villageMarker = new maptalks.Marker(
        [d.lon, d.lat], {
        symbol: {
          'markerType': 'ellipse',
          'markerFill': getColorVillage(d.dead_for_map),
          'markerFillOpacity': 0.7,
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

  
      var tipVillage = new maptalks.ui.ToolTip(` 
      <p>Населений пункт: ${d.settlment_name}</p>
      <p>Деталі: ${d.descr}</p>
      `);
  
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
            feature._symbol.markerFillOpacity = 0.7
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
      set: ["1944"],
      onChange: function (vals) { filter(vals) }
    });
    

  
    d3.select("span#close").on("click", function () {
      d3.select("div#myModal").style("display", "none");
    });
  
  
  });