import React, { Component } from 'react';

class RestaurantsMap extends Component {
  mapRef = React.createRef();
  state = {
    map: null
  };

  componentDidMount() {
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: "o2MmlxW45F-Jf-55SXsChSYynJokhY1RzcePb9I8-lM"
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(this.mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 48.1351, lng: 11.5820 },
      zoom: 10,
      pixelRatio: window.devicePixelRatio || 1
    });

    let dataPoints = [];
    dataPoints.push(new H.clustering.DataPoint(51.01, 0.01));
    dataPoints.push(new H.clustering.DataPoint(50.04, 1.01));
    dataPoints.push(new H.clustering.DataPoint(51.45, 1.01));
    dataPoints.push(new H.clustering.DataPoint(51.01, 2.01));
    let clusteredDataProvider = new H.clustering.Provider(dataPoints);
    let layer = new H.map.layer.ObjectLayer(clusteredDataProvider);
    map.addLayer(layer);

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // const ui = H.ui.UI.createDefault(map, defaultLayers);

    this.setState({ map }, () => { console.log('map loaded successfully !!!'); });

  }

  componentWillUnmount() {
    this.state.map.dispose();
  }

  render() {
    return <div ref={this.mapRef} style={{ height: "500px" }} />;
  }
}

export default RestaurantsMap;
