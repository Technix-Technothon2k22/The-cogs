import React from "react";
import Map from "./MapCont";
import "./App.css";

import PrimarySearchAppBar from "./Appbar";
import PermanentDrawerRight from "./sidebar";
import { Box, CircularProgress, Backdrop } from "@mui/material";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      dataIsLoaded: false,
    };
  }
  componentDidMount() {
    setInterval(() => {
      fetch("http://192.168.0.121:5001/get-data")
        .then((res) => res.json())
        .then((json) =>
          this.setState(
            {
              data: json,
              dataIsLoaded: true,
            },
            () => console.log("data loaded")
          )
        );
    }, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div className="App">
        <Box sx={{ flexGrow: 1 }}>
          {this.state.dataIsLoaded ? (
            <>
              <PrimarySearchAppBar {...this.state.data} />
              <Map {...this.state.data} />
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <PermanentDrawerRight {...this.state.data} />
              </Box>
            </>
          ) : (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open="true"
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
        </Box>
      </div>
    );
  }
}

export default App;
