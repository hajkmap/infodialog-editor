import { MapConfig } from "../../types/types";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { List, ListItem, Typography } from "@mui/material";

const MapDetailView: React.FC = (): JSX.Element => {
  const params = useParams();

  const [mapConfig, setMapConfig] = useState<MapConfig | null>(null);

  const fetchMapConfig = async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/v1/mapconfig/${params.map}`
      );
      const config: MapConfig = await response.json();
      console.log("config: ", config);
      setMapConfig(config);
      // setError("");
    } catch (e) {
      console.log("error: ", e);
      if (e instanceof Error) {
        // setError(e.message);
      }
    }
  };

  useEffect(() => {
    fetchMapConfig();
  }, []);

  return (
    <>
      <Typography variant="h3">{mapConfig?.map.title}</Typography>
      <Typography variant="subtitle1">{params.map}</Typography>
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
