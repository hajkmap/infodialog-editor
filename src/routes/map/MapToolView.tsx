import React, { useState } from "react";

import { useFetchMapConfigQuery } from "../../features/maps/mapsApiSlice";

import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import InstanceSelector from "../tool/InfoDialog/InstanceSelector";
import { InfoDialogOptions } from "../../types/types";

const MapToolView = () => {
  const params = useParams();

  const [pendingChanges, setPendingChanges] = useState(false);

  const {
    data: mapConfig,
    error,
    isUninitialized, // Query has not started yet.
    isLoading, // Query is currently loading for the first time. No data yet.
    isFetching, // Query is currently fetching, but might have data from an earlier request.
    isSuccess, // Query has data from a successful load.
    isError, // Query is currently in an "error" state.
  } = useFetchMapConfigQuery(params.map);

  const toolConfig = mapConfig?.tools.find((t) => t.type === params.tool);

  return toolConfig ? (
    <>
      <Typography variant="h3">
        <Link to={`/map/${params.map}`}>{params.map}</Link>
      </Typography>
      <Typography variant="subtitle1">{params.tool}</Typography>

      {params.tool === "infodialog" && typeof params.map === "string" && (
        <InstanceSelector
          options={toolConfig?.options as InfoDialogOptions[]}
          mapName={params.map}
          pendingChanges={pendingChanges}
          setPendingChanges={setPendingChanges}
        />
      )}
    </>
  ) : null;
};

export default MapToolView;
