import Map from "./MapCont";
import logo from "./logo.svg";
import "./App.css";

import PrimarySearchAppBar from "./Appbar";
import PermanentDrawerRight from "./sidebar";

function App() {
  return (
    <div className="App">
      <PrimarySearchAppBar />
      <Map />
    </div>
  );
}

export default App;
