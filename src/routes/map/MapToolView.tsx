import { MapConfig } from "../../types/types";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { List, ListItem, Typography } from "@mui/material";

const MapToolView: React.FC = (): JSX.Element => {
  const params = useParams();
  console.log("params: ", params);

  return (
    <>
      <Typography variant="h3">
        <Link to={`/map/${params.map}`}>{params.map}</Link>
      </Typography>
      <Typography variant="subtitle1">{params.tool}</Typography>
    </>
  );
};

export default MapToolView;
