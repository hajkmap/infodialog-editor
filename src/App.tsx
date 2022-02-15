import * as React from 'react';
import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './ProTip';
import useMapConfig from './hooks/useMapConfig';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';

import { InfoDialogOptions } from "./types/types";

export default function App() {
  const [mapName, setMapName] = useState<string>("default");
  const [maps, setMaps] = useState<string[]>([]);
  const [infoDialogOptions, setInfoDialogOptions] = useState<InfoDialogOptions[] | undefined>([]);
  const { error, loading, data } = useMapConfig(mapName);

  useEffect(() => {
    const infoDialogOptions = data?.tools?.filter((t: any) => t.type === "infodialog")[0];
    setInfoDialogOptions(infoDialogOptions?.options);
  }, [data]);

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/v1/mapconfig/list");
        const maps: string[] = await response.json();
        setMaps(maps);
      } catch (error: any) {
        if (error) {
          console.log('error: ', error);
        }
      }
    }
    fetchMaps();
  }, []
  )
  const handleMapChange = (event: SelectChangeEvent<typeof mapName>) => {
    const { value } = event.target;
    setMapName(value);
  }



  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          InfoDialog MarkDown editor
        </Typography>
        {loading && (<CircularProgress />)}
        <Select value={mapName} onChange={handleMapChange}>
          {maps.map((m: string) => <MenuItem value={m}>{m}</MenuItem>)}
        </Select>
        <ProTip options={infoDialogOptions} />
      </Box>
      <Box>
        <Button>Save</Button>
      </Box>
    </Container>
  );
}
