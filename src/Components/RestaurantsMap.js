import React, { Component } from 'react';
import * as Constants from '../constants';
// import restaurantPin from '../assets/img/restaurant-pin.png';
// import mcdonaldsPin from '../assets/img/mcdonalds-pin.png';
// import kfcPin from '../assets/img/kfc-pin.png';
// import subwayPin from '../assets/img/subway-pin.png';
// import burgetKingPin from '../assets/img/burget-king-pin.png';

class RestaurantsMap extends Component {
  mapRef = React.createRef();
  layer = null;
  state = {
    map: null
  };

  componentWillReceiveProps(newProps) {
    this.state.map.removeLayer(this.layer);
    this.layer = null;
    let dataPoints = this.getDataPoints(newProps.list);
    this.createCluster(this.state.map, dataPoints);
  }

  getDataPoints(data) {
    return data.map(function(item) {
      return new window.H.clustering.DataPoint(item.lat, item.lng, null, item);
    });
  }

  getRandomDataPoint(cluster) {
    var dataPoints = [];
    cluster.forEachDataPoint(dataPoints.push.bind(dataPoints));
    return dataPoints[Math.random() * dataPoints.length | 0];
  }

  componentDidMount() {
    this.initializeMap();
  }

  initializeMap() {
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: Constants.API_KEY
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(this.mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 48.1351, lng: 11.5820 },
      zoom: 10,
      pixelRatio: window.devicePixelRatio || 1
    });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    this.setState({ map }, () => { console.log('map loaded successfully !!!'); });

    let dataPoints = this.getDataPoints(this.props.list);

    this.createCluster(map, dataPoints);
  }

  createCluster(map, dataPoints) {
    const H = window.H;
    // let CUSTOM_THEME = {
    //   getClusterPresentation: (cluster) => {
    //     let randomDataPoint = this.getRandomDataPoint(cluster),
    //     data = randomDataPoint.getData();

    //     let w, h;
    //     let weight = cluster.getWeight();
    //     if (weight <= 6) {
    //       w = 35;
    //       h = 35;
    //     } else if (weight <= 12) {
    //       w = 50;
    //       h = 50;
    //     } else {
    //       w = 75;
    //       h = 75;
    //     }
        // let clusterMarker = new H.map.Marker(cluster.getPosition(), {
        //   icon: new H.map.Icon(restaurantPin, {
        //     size: {w: w, h: h},
        //     anchor: { x: (w/2), y: (h/2) }
        //   }),
        //   min: cluster.getMinZoom(),
        //   max: cluster.getMaxZoom()
        // });
        // clusterMarker.setData(data);


        // clusterMarker.addEventListener("pointerenter", function (event) {
        //   var point = event.target.getPosition(),
        //   screenPosition = map.geoToScreen(point),
        //   t = event.target,
        //   data = t.getData(),
        //   tooltipContent = "";
        //   data.forEachEntry(function(p) {
        //     tooltipContent += p.getPosition().lat + " " + p.getPosition().lng + "</br>";
        //   });
        //   infoBubble = new H.ui.InfoBubble(map.screenToGeo(screenPosition.x, screenPosition.y), { content: tooltipContent });
        //   ui.addBubble(infoBubble);
        // });

        // clusterMarker.addEventListener("pointerleave", function (event) {
        //   if(infoBubble) {
        //     ui.removeBubble(infoBubble);
        //     infoBubble = null;
        //   }
        // });

      //   return clusterMarker;
      // },

      // getNoisePresentation: (noisePoint) => {
      //   let data = noisePoint.getData(),
      //   noiseMarker = new H.map.Marker(noisePoint.getPosition(), {
      //     min: noisePoint.getMinZoom(),
      //     // max: 20,
      //     icon: new H.map.Icon(restaurantPin, {
      //       size: {w: 20, h: 20},
      //       anchor: {x: 10, y: 10}
      //     })
      //   });

      //   noiseMarker.setData(data);

        // return noiseMarker;
    //   }
    // };

    let clusteredDataProvider = new H.clustering.Provider(dataPoints, {
      min: 1,
      max: 22,
      clusteringOptions: {
        eps: 32,
        minWeight: 3
      },
      // theme: CUSTOM_THEME
    });
    this.layer = new H.map.layer.ObjectLayer(clusteredDataProvider);
    map.addLayer(this.layer);
  }

  componentWillUnmount() {
    this.state.map.dispose();
  }

  render() {
    return <div ref={this.mapRef} style={{ height: "500px" }} />;
  }
}

export default RestaurantsMap;
