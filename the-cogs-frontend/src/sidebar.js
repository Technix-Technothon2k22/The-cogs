import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

const drawerWidth = "2  0%";

const selectColor = (status) => {
  if (status === "online") return "green";
  else if (status === "repair") return "#b28704";
  else return "red";
};

export default function PermanentDrawerRight(props) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
      anchor={"right"}
    >
      <List>
        {props.result
          .filter((item) => item.status === "offline")
          .map((node, index) => {
            const changeStatus = () =>
              fetch(`http://localhost:5001/change-status/${node._id.$oid}`, {
                method: "PUT",
              });
            return (
              <ListItem key={node._id.$oid} disablePadding>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Grid container>
                      <Grid item xs={11}>
                        <Typography color={selectColor(node.status)}>
                          {node.status}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}></Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color={selectColor(node.status)}>
                      Voltage = {node.volt}V<br />
                      Phase = {node.phase}
                      <br />
                      Co-ordinates = {node.location.lat} N, {node.location.long}{" "}
                      E
                      <br />
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={changeStatus}
                      >
                        Repair
                      </Button>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </ListItem>
            );
          })}
      </List>
      <List>
        {props.result
          .filter((item) => item.status === "online")
          .map((node, index) => {
            return (
              <ListItem key={node._id.$oid} disablePadding>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography color={selectColor(node.status)}>
                      {node.locality}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color={selectColor(node.status)}>
                      Voltage = {node.volt}V<br />
                      Phase = {node.phase}
                      <br />
                      Co-ordinates = {node.location.lat} N, {node.location.long}{" "}
                      E
                      <br />
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </ListItem>
            );
          })}
      </List>
      <Divider />
    </Drawer>
  );
}
