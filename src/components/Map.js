import React, { useState, PureComponent } from 'react';
import ReactMapGL from 'react-map-gl';
import { SVGOverlay, Marker, FlyToInterpolator } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../App.css';

const CITIES = [{name: 'test',  longitude: -120.47473814845159, latitude: 47.52488351782222}];

// PureComponent ensures that the markers are only rerendered when data changes
class Markers extends PureComponent {
  render() {
    const {data} = this.props;
    return data.map(
      city => <Marker key={city.name} longitude={city.longitude} latitude={city.latitude} ><h3 className='x'>X</h3></Marker>
    )
  }
}


function redraw({project}) {
    const [cx, cy] = project([-122, 37]);
    return <circle cx={cx} cy={cy} r={4} fill="blue" />;
  }


const  Map = () => {

    const MAPBOX_TOKEN = 'pk.eyJ1Ijoic3RvbXBrZSIsImEiOiJjazd4Zm9xdWUwY2kxM2tudDF1aHhxMXFsIn0.DUZcqmMCZB2aLYpi203aUQ';

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 48,
    // mapStyle: "mapbox://styles/mapbox/dark-v9",
    longitude: -120.4376,
    zoom: 7,
    cursor: 'crosshair'
  });

  const getCoordinates = (e) => {
    console.log(e.lngLat);
  }

  const goToPlace = (lat, lng) =>  {
      setViewport({
          ...viewport,
            latitude:  lat,
            longitude: lng,
            transitionDuration: 1000,
            zoom: 14,
            transitionInterpolator: new FlyToInterpolator(),

          }
      )
  }


// const mapStyle = fromJS({
//     version: 8,
//     sources: {
//         points: {
//             type: 'geojson',
//             data: {
//                 type: 'FeatureCollection',
//                 features: [
//                     {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.45, 37.78]}}
//                 ]
//             }
//         }
//     },
//     layers: [
//         {
//             id: 'my-layer',
//             type: 'circle',
//             source: 'points',
//             paint: {
//                 'circle-color': '#f00',
//                 'circle-radius': 4
//             }
//         }
//     ]
// });

  return (
      <>
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      onClick={getCoordinates}
    //   mapStyle={mapStyle} 
    >
        <SVGOverlay redraw={redraw} />
    <Markers data={CITIES} />
    </ReactMapGL>
    <div className='lynden'>
    <button onClick={() => goToPlace(47.52488351782222, -120.47473814845159)} >go to Cashmere</button>
    <button onClick={() => goToPlace(48.75687998989363 ,-122.47885352030244)} >go to Bellingham</button>
    <button onClick={() => goToPlace(48.75687998989363 ,-122.48885352030244)} >go to Bellingham2</button>
    </div>
    </>
  );
}

export default Map;