import * as React from "react";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import MapSelector from "./routes/map/MapSelector";
import { Grid } from "@mui/material";

export default function App() {
  const [maps, setMaps] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const response = await fetch(
          "http://localhost:3002/api/v1/mapconfig/list"
        );
        const maps: string[] = await response.json();
        setMaps(maps);
      } catch (e) {
        console.log("error: ", e);
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    };

    fetchMaps();
  }, []);

  const ErrorMessage = () => {
    return (
      <>
        <Typography>Couldn't load configuration:</Typography>
        <Typography sx={{ fontFamily: "monospace" }}>{error}</Typography>
      </>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          InfoDialog MarkDown editor
        </Typography>
      </Grid>

      {error.length > 0 && (
        <Grid item xs={12}>
          <ErrorMessage />
        </Grid>
      )}

      {maps.length > 0 && (
        <Grid item xs={12}>
          <MapSelector maps={maps} />
        </Grid>
      )}
    </Grid>
  );
}
