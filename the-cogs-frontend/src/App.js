<<<<<<< HEAD
import logo from "./logo.svg";
import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import PrimarySearchAppBar from "./Appbar";
=======
import logo from './logo.svg';
import PrimarySearchAppBar from './Appbar';
import './App.css';
>>>>>>> 7e285ce4983ec3378405a09c39df7076caee903a

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
    </div>
  );
}

export default App;
