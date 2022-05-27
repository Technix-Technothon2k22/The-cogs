import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const MapCont = (props) => {
  console.log(props);
  const [activePark, setActivePark] = useState(null);
  return (
    <MapContainer center={[15.283, 73.98]} zoom={12} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {props.result.map((node) => {
        console.log(node.location);
        return (
          <Marker
            key={node.$oid}
            position={[
              node.location.lat.$numberDecimal,
              node.location.long.$numberDecimal,
            ]}
            onClick={() => {
              setActivePark(node);
            }}
          />
        );
      })}
    </MapContainer>
  );
};
export default MapCont;
