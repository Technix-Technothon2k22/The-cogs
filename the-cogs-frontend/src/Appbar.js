import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Modal from "@mui/material/Modal";
import { Divider } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PrimarySearchAppBar(props) {
  console.log(props.analysis);
  const [openAddNode, setAddNodeOpen] = React.useState(false);
  const [openAssessment, setAssessmentOpen] = React.useState(false);

  const [formValues, setFormValues] = React.useState({
    location: "",
    longitude: 0,
    latitude: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleNodeAddClickOpen = () => {
    setAddNodeOpen(true);
  };

  const handleNodeAddClose = () => {
    setAddNodeOpen(false);
  };
  const handleAssessmentClickOpen = () => {
    setAssessmentOpen(true);
  };

  const handleAssessmentClose = () => {
    setAssessmentOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      JSON.stringify({
        location: { lat: formValues.latitude, long: formValues.longitude },
      })
    );

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locality: formValues.location,
        location: { lat: formValues.latitude, long: formValues.longitude },
      }),
    };
    fetch("http://192.168.0.121:5001/add-node", requestOptions).then((res) =>
      console.log(res)
    );
    handleNodeAddClose();
    //window.location.reload(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            ELECTRO_NODE
          </Typography>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="add new node"
              color="inherit"
              onClick={handleNodeAddClickOpen}
            >
              <AddIcon />
            </IconButton>
            <div>
              <Button variant="outlined" onClick={handleNodeAddClickOpen}>
                Open form dialog
              </Button>
              <Dialog open={openAddNode} onClose={handleNodeAddClose}>
                <form onSubmit={handleSubmit}>
                  <DialogTitle>New Node</DialogTitle>

                  <DialogContent>
                    <DialogContentText>
                      Enter details about the new node.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="location"
                      name="location"
                      label="Locality"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={handleInputChange}
                    />
                    <TextField
                      required
                      margin="dense"
                      id="latitude"
                      name="latitude"
                      label="Latitude"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={handleInputChange}
                    />
                    <TextField
                      required
                      margin="dense"
                      id="longitude"
                      label="Longitude"
                      type="text"
                      name="longitude"
                      fullWidth
                      variant="standard"
                      onChange={handleInputChange}
                    />
                  </DialogContent>

                  <DialogActions>
                    <Button onClick={handleNodeAddClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                  </DialogActions>
                </form>
              </Dialog>
            </div>
          </Box>
          <Button
            variant="contained"
            color="success"
            onClick={handleAssessmentClickOpen}
          >
            Assessment
          </Button>
          <Modal
            open={openAssessment}
            onClose={handleAssessmentClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Repair Analyis
              </Typography>
              <Typography
                id="modal-modal-description"
                variant="body1"
                component="p"
              >
                The Nodes which have the most downtime are
              </Typography>

              {props.analysis.map((node) => (
                <>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Location: {node.locality}
                    <br />
                    Repair Count: {node.repairCount}
                  </Typography>
                  <Divider />
                </>
              ))}
            </Box>
          </Modal>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
