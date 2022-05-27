import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Typography from "@mui/material/Typography";

const selectColor = (status) => {
  if (status === "online") return "green";
  else if (status === "repair") return "#b28704";
  else return "red";
};

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
        const col = selectColor(node.status);
        return (
          <Marker
            key={node._id.$oid}
            position={[node.location.lat, node.location.long]}
            onClick={() => {
              setActivePark(node);
            }}
            color={col}
          >
            <Popup>
              <Typography color={col}>
                Voltage = {node.volt}V<br />
                Phase = {node.phase}
                <br />
                Co-ordinates = {node.location.lat} N, {node.location.long} E
              </Typography>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
export default MapCont;
