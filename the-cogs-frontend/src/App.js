import logo from "./logo.svg";
import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import PrimarySearchAppBar from "./Appbar";
import PermanentDrawerRight from "./sidebar";


function App() {
  return (
    <div className="App">
      <PrimarySearchAppBar />
      <MapContainer center={[45.4, -75.7]} zoom={12} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
      <PermanentDrawerRight/>
    </div>
  );
}

export default App;
