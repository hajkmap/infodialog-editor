import { Maps } from "../../types/types";

import * as React from "react";
import { Link } from "react-router-dom";

import MapSelector from "./MapSelector";
import { List, ListItem, Typography } from "@mui/material";

type Props = {
  maps: Maps;
};

const MapView = ({ maps }: Props) => {
  console.log("Maps render: ", maps);
  return maps ? (
    <>
      <Typography variant="h4">{maps?.length} map configs available</Typography>
      <List>
        {maps.map((m) => (
          <ListItem key={m}>
            <Link to={`/map/${m}`}>{m}</Link>
          </ListItem>
        ))}
      </List>
      {/* <MapSelector maps={maps} /> */}
    </>
  ) : null;
};

export default MapView;
