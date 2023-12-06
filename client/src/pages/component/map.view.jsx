import React, { useState, useEffect } from 'react';
import LocationIcon from '../assets/img/location.png'
import { MapContainer, TileLayer, Marker, Popup,  FeatureGroup } from 'react-leaflet'
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

function MapView({coordenates}) {

  const [clickedPosition, setClickedPosition] = useState(null);
  // 
  // const handleMapClick = (e) => {
  //   const { lat, lng } = e.latlng;
  //   setClickedPosition({ lat, lng });
  // }; 
  
  useEffect(() => {
    if(!coordenates) return;
    setClickedPosition({lat:coordenates[0], lng:coordenates[1]});
    // setClickedPosition(JSON.stringify({ lat: coordenates[0], lng: coordenates[1]}));
    // setClickedPosition(coordenates);
    // const { lat, lng } = coordenates;
    // setClickedPosition({ lat, lng });
  }, [coordenates])

  console.log(coordenates)
  
  return (
    <>      
        <MapContainer 
          center={coordenates} 
          zoom={12} 
          style={{ height: '600px', width: '400px' }}
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
           
          
          {clickedPosition && (
            <Marker position={[clickedPosition.lat, clickedPosition.lng]} icon={customIcon}>
              <Popup>Coordenadas: {clickedPosition.lat}, {clickedPosition.lng}</Popup>
            </Marker>
          )}
      </MapContainer>
    </>
  );
};

export default MapView;
