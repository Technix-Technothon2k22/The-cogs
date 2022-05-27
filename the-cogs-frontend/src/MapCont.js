import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapCont = (props) => {
  console.log(props);
  const [activePark, setActivePark] = useState(null);
  return (
    <MapContainer center={[15.283, 73.98]} zoom={12} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {props.result.map((node) => {
        console.log(node._id.$oid);
        return (
          <Marker
            key={node._id.$oid}
            position={[node.location.lat, node.location.long]}
            onClick={() => {
              setActivePark(node);
            }}
          >
            <Popup></Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
export default MapCont;
