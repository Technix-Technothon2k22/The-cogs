import React from "react";
import Map from "./MapCont";
import "./App.css";

import PrimarySearchAppBar from "./Appbar";
import PermanentDrawerRight from "./sidebar";
import { Box, CircularProgress } from "@mui/material";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      dataIsLoaded: false,
    };
  }
  componentDidMount() {
    setInterval(
      () =>
        fetch("http://192.168.0.121:5001/get-data")
          .then((res) => res.json())
          .then((json) => {
            this.setState(
              {
                nodes: json,
                dataIsLoaded: true,
              },
              () => console.log("data loaded")
            );
          }),
      10000
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div className="App">
        <Box sx={{ flexGrow: 1 }}>
          <PrimarySearchAppBar {...this.state.nodes} />
          {this.state.dataIsLoaded ? (
            <Map {...this.state.nodes} />
          ) : (
            <h1> Loading </h1>
          )}

          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {this.state.dataIsLoaded ? (
              <PermanentDrawerRight {...this.state.nodes} />
            ) : (
              <CircularProgress />
            )}
          </Box>
        </Box>
      </div>
    );
  }
}

export default App;
