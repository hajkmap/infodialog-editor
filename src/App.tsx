import * as React from "react";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import MapSelector from "./MapSelector";

export default function App() {
  const [maps, setMaps] = useState<string[]>([]);

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const response = await fetch(
          "http://localhost:3002/api/v1/mapconfig/list"
        );
        const maps: string[] = await response.json();
        setMaps(maps);
      } catch (error) {
        if (error) {
          console.log("error: ", error);
        }
      }
    };

    fetchMaps();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          InfoDialog MarkDown editor
        </Typography>
      </Box>
      {maps.length > 0 && <MapSelector maps={maps} />}
      <Box>
        <Button>Save</Button>
      </Box>
    </Container>
  );
}
