import { Maps } from "../../types/types";

import * as React from "react";
import { Link } from "react-router-dom";

import { useFetchMapsQuery } from "../../features/maps/maps-api-slice";

import MapSelector from "./MapSelector";
import { List, ListItem, Typography } from "@mui/material";

const MapView = () => {
  const {
    data: maps = [],
    error,
    isUninitialized, // Query has not started yet.
    isLoading, // Query is currently loading for the first time. No data yet.
    isFetching, // Query is currently fetching, but might have data from an earlier request.
    isSuccess, // Query has data from a successful load.
    isError, // Query is currently in an "error" state.
  } = useFetchMapsQuery();

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
      <MapSelector maps={maps} />
    </>
  ) : null;
};

export default MapView;
