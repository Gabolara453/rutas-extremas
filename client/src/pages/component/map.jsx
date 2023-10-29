import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, FeatureGroup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import L  from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import { EditControl } from 'react-leaflet-draw';


function Map({mapCnter, ClickCoord}) {
  
  const [clickedPosition, setClickedPosition] = useState(null);
  
  const MapClickHandler = ({ onClick }) => {
    const map = useMapEvents({
      click: (e) => {
        onClick(e);
        map.locate();
      },
    });

    return null;
  };

  // const handleCreated = (e) => {
  //   const { layerType, layer } = e;
  //   if (layerType === 'marker') {
  //     const { lat, lng } = layer.getLatLng();
  //     // setClickedPosition({ lat, lng });
  //     // console.log(`Coordenadas seleccionadas: Latitud ${lat}, Longitud ${lng}`);
  //   }
  // };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    ClickCoord({ lat, lng })
    setClickedPosition({ lat, lng });
  }; 

  return (
    <div>      
      <div>
        <MapContainer 
          key={`${mapCnter[0]}-${mapCnter[1]}`} 
          center={mapCnter} 
          zoom={10} 
          style={{ height: '400px', width: '100%' }} 
          onclick={(e) => handleMapClick(e)}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <FeatureGroup>
             <EditControl
              position='topright'
              // onCreated={handleCreated}
              draw={{
                // polyline: {
                //   icon: new L.DivIcon({
                //     iconSize: new L.Point(8, 8),
                //     className: "leaflet-div-icon leaflet-editing-icon"
                //   }),
                //   shapeOptions: {
                //     guidelineDistance: 10,
                //     color: "navy",
                //     weight: 3
                //   }
                // },
                marker: {
                  icon: new L.Icon.Default(), // Use the default marker icon
                },
                rectangle: false,
                circle: false,
                circlemarker: false,
                polyline: false,
              }}
            />
          </FeatureGroup>
           
          
          <MapClickHandler onClick={handleMapClick} />
          {clickedPosition && (
            <Marker position={[clickedPosition.lat, clickedPosition.lng]} >
              <Popup>Coordenadas: {clickedPosition.lat}, {clickedPosition.lng}</Popup>
            </Marker>
          )}
      </MapContainer>
      </div>
    </div>
  );
};

export default Map;
