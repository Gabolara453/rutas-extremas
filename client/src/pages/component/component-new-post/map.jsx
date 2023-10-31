import React, { useState } from 'react';
import LocationIcon from '../../assets/img/location.png'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, FeatureGroup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import L  from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import { EditControl } from 'react-leaflet-draw';

const customIcon = new L.Icon({
    iconUrl: LocationIcon,  // Ruta a tu imagen de ícono personalizado
    iconSize: [20, 25],  // Tamaño del ícono
    iconAnchor: [16, 32],  // Punto de anclaje del ícono
    popupAnchor: [0, -32],  // Punto de anclaje del popup
  });

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
                marker: {
                  icon: customIcon, // Use the default marker icon
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
            <Marker position={[clickedPosition.lat, clickedPosition.lng]} icon={customIcon}>
              
              <Popup>Coordenadas: {clickedPosition.lat}, {clickedPosition.lng}</Popup>
            </Marker>
          )}
      </MapContainer>
      </div>
    </div>
  );
};

export default Map;
