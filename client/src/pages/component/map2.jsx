import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, FeatureGroup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import L  from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import { EditControl } from 'react-leaflet-draw';
import { getAllRegiones, getAllComId, getCoordRgns } from "../../context/auth.backend";

function Map() {

  const [options1, setOptions1] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [regn, setRegion] = useState("");
  const [comna, setComuna] = useState("");
  const [mapCenter, setMapCenter] = useState([-35.426944, -71.665556]); // Coordenadas de Santiago, Chile
  const [clickedPosition, setClickedPosition] = useState(null);

  useEffect(() => {
    getAllRegiones()
      .then((data) => {
        const arrayRg = data.response;
        const mappedOptions = arrayRg.map((item) => (
          <option key={item[0]} value={item[0]}>
            {item[1]} {/* Ajusta esto según tus datos */}
          </option>
        ));
        setOptions1(mappedOptions);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del primer select:', error);
      });

  }, []);

  useEffect(() => {
    if(!regn) return;
    getAllComId(regn)
      .then((data) => {
        const arrayCm = data.response;
        const mappedOptions = arrayCm.map((item) => (
          <option key={item[0]} value={item[0]}>
            {item[1]}
          </option>
        ));

        setOptions2(mappedOptions);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del segundo select:', error);
      });
    getCoordRgns(regn).then((data) => {
      const ar_coords = data.response;
      const coords = [ar_coords[0], ar_coords[1]];
      console.log(coords)
      setMapCenter(coords);
    }).catch((error) => {
        console.error('Error al obtener los datos de las coordenadas:', error);
      });

  }, [regn]);

  const MapClickHandler = ({ onClick }) => {
    const map = useMapEvents({
      click: (e) => {
        onClick(e);
        map.locate();
      },
    });

    return null;
  };

  const handleCreated = (e) => {
    const { layerType, layer } = e;
    if (layerType === 'marker') {
      const { lat, lng } = layer.getLatLng();
      setClickedPosition({ lat, lng });
      console.log(`Coordenadas seleccionadas: Latitud ${lat}, Longitud ${lng}`);
    }
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setClickedPosition({ lat, lng });
    console.log(`Coordenadas seleccionadas: Latitud ${lat}, Longitud ${lng}`);
    // setMapCenter([lat, lng]);
  };

  return (
    <div>      
      <form>
      <label>
          Región:
        <select value={regn} onChange={(e) => setRegion(e.target.value)} >
          <option value="">Selecciona una región</option>
          {options1}
        </select>
      </label>
      <label>
          Comuna:
        <select value={comna} onChange={(e) => setComuna(e.target.value)} >
          <option value="">Selecciona una comuna</option>
          {options2}
        </select>
      </label>
      </form>
      <div>
        <MapContainer 
          key={`${mapCenter[0]}-${mapCenter[1]}`} 
          center={mapCenter} 
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
              onCreated={handleCreated}
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
