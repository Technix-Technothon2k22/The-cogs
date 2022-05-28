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

export default function PrimarySearchAppBar() {
  const [open, setOpen] = React.useState(false);
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
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        locality: formValues.location,
        location: { lat: formValues.latitude, long: formValues.longitude },
      }),
    };
    fetch("http://localhost:5001/add-node", requestOptions).then((res) =>
      console.log(res)
    );
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
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
              onClick={handleClickOpen}
            >
              <AddIcon />
            </IconButton>
            <div>
              <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                  <DialogTitle>Subscribe</DialogTitle>

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
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                  </DialogActions>
                </form>
              </Dialog>
            </div>
            {/* <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            {/* <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
