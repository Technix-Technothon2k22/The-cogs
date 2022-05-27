import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const Data = {
  parks: [
    {
      type: "Feature",
      properties: {
        PARK_ID: 960,
        NAME: "Bearbrook Skateboard Park",
        DESCRIPTIO: "Flat asphalt surface, 5 components",
      },
      geometry: {
        type: "Point",
        coordinates: [15.283, 73.98],
      },
    },
    {
      type: "Feature",
      properties: {
        PARK_ID: 1219,
        NAME: "Bob MacQuarrie Skateboard Park (SK8 Extreme Park)",
        DESCRIPTIO:
          "Flat asphalt surface, 10 components, City run learn to skateboard programs, City run skateboard camps in summer",
      },
      geometry: {
        type: "Point",
        coordinates: [15.3982, 73.8113],
      },
    },
  ],
};
const MapCont = () => {
  const [activePark, setActivePark] = useState(null);
  return (
    <MapContainer center={[15.283, 73.98]} zoom={12} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {Data.parks.map((park) => (
        <Marker
          key={park.properties.PARK_ID}
          position={[
            park.geometry.coordinates[0],
            park.geometry.coordinates[1],
          ]}
          onClick={() => {
            setActivePark(park);
          }}
        />
      ))}
    </MapContainer>
  );
};
export default MapCont;
