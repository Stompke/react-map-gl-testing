import React, { useState, useEffect, PureComponent } from 'react';
import ReactMapGL from 'react-map-gl';
import { SVGOverlay, Marker, FlyToInterpolator, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../App.css';
import 'mapbox-gl/dist/mapbox-gl.css';


const CITIES = [{name: 'test',  longitude: -120.47473814845159, latitude: 47.52488351782222}];
const dots = [[-120.47473814845159, 47.52488351782222],[-122, 49]];

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10,
  zIndex: 10,
};

// PureComponent ensures that the markers are only rerendered when data changes
class Markers extends PureComponent {
  render() {
    const {data} = this.props;
    return data.map(
      city => <Marker key={city.name} longitude={city.longitude} latitude={city.latitude} ><button className='x'>X</button></Marker>
    )
  }
}

let lat = 0;
let lng = 0;

function success (pos) {
  lat = pos.coords.latitude;
  lng = pos.coords.longitude;
}
navigator.geolocation.watchPosition(success);

function redraw({project}) {
  const [cx, cy] = project([lng , lat]);
    return <circle cx={cx} cy={cy} r={4} fill="blue" />;
  }





const  Map = () => {

    const MAPBOX_TOKEN = 'pk.eyJ1Ijoic3RvbXBrZSIsImEiOiJjazg1MW95amEwMjd4M2hwZmY4M212cHB3In0.H9qLvfx_3y3LLTKRpTffUQ';

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 48,
    longitude: -120.4376,
    mapStyle: "mapbox://styles/mapbox/satellite-v9",
    zoom: 9,
    
  });

  const [currentLocation, setCurrentLocation ] = useState({lat: 0, lng: 0});

  const getCoordinates = (e) => {
    console.log(e.lngLat);
  }

  const goToPlace = (lat, lng) =>  {
      setViewport({
          ...viewport,
            latitude:  lat,
            longitude: lng,
            transitionDuration: 1000,
            zoom: 19,
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



  useEffect(() => {
      function success (pos) {
        setCurrentLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        })
      }
      function error (err) {
        console.log(err)
      }
      function options (options) {
        console.log(options)
      }
    navigator.geolocation.watchPosition(success);


  })

  function newLocation (data) {
    console.log(data)
  }

  const _updateViewport = (viewport) => {
    setViewport({viewport});
  }

  return (
      <>
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      // onClick={getCoordinates}
      mapStyle="mapbox://styles/mapbox/satellite-v9"
      cursor='crosshair'
    //   mapStyle={mapStyle} 
    >
              <GeolocateControl
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
          showUserLocation={true}
          // onGeolocate={newLocation}
          style={geolocateStyle}
          // onViewportChange={_updateViewport}

        />

        <SVGOverlay redraw={redraw} />
    <Markers data={CITIES} />
    </ReactMapGL>
    <div className='lynden'>
    <button onClick={() => goToPlace(47.52488351782222, -120.47473814845159)} >go to Cashmere</button>
    <button onClick={() => goToPlace(48.75687998989363 ,-122.47885352030244)} >go to Bellingham</button>
    <button onClick={() => goToPlace(48.75687998989363 ,-122.48885352030244)} >go to Bellingham2</button>
    {currentLocation && <button onClick={() => goToPlace(currentLocation.latitude , currentLocation.longitude)} >Current Location</button>}
    </div>
    </>
  );
}

export default Map;