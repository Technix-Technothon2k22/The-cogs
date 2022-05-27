import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Typography from "@mui/material/Typography";
import * as L from "leaflet";

const LeafIcon = L.Icon.extend({
  options: {},
});

const greenIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|8bc34a&chf=a,s,ee00FFFF",
  }),
  redIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|f44336&chf=a,s,ee00FFFF",
  }),
  amberIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|b28704&chf=a,s,ee00FFFF",
  });

const selectColor = (status) => {
  if (status === "online") return "green";
  else if (status === "repair") return "#b28704";
  else return "red";
};

const selectIcon = (status) => {
  if (status === "online") return greenIcon;
  else if (status === "repair") return amberIcon;
  else return redIcon;
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
            icon={selectIcon(node.status)}
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
