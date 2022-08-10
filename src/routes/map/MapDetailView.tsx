import React from "react";
import { Link, useParams } from "react-router-dom";

import { useFetchMapConfigQuery } from "../../features/maps/maps-api-slice";

import { LinearProgress, List, ListItem, Typography } from "@mui/material";

const MapDetailView = () => {
  const params = useParams();

  const {
    data: mapConfig,
    error,
    isUninitialized, // Query has not started yet.
    isLoading, // Query is currently loading for the first time. No data yet.
    isFetching, // Query is currently fetching, but might have data from an earlier request.
    isSuccess, // Query has data from a successful load.
    isError, // Query is currently in an "error" state.
  } = useFetchMapConfigQuery(params.map);

  return (
    <>
      <Typography variant="h3">{mapConfig?.map.title}</Typography>
      <Typography variant="subtitle1">{params.map}</Typography>
      {(isFetching || isLoading) && <LinearProgress />}
      {Array.isArray(mapConfig?.tools) && (
        <List>
          {mapConfig?.tools.map((t) => (
            <ListItem key={t.type}>
              <Link to={t.type}>{t.type}</Link>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default MapDetailView;
