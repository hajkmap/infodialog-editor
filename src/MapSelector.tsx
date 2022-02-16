import * as React from "react";
import { useEffect, useState } from "react";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";

import useMapConfig from "./hooks/useMapConfig";
import InstanceSelector from "./InstanceSelector";
import { InfoDialogOptions } from "./types/types";

type Props = {
  maps: string[];
};

interface Tool {
  index: number;
  options: [];
  type: string;
}

export default function MapSelector({ maps }: Props) {
  const [mapName, setMapName] = useState("");
  const [pendingChanges, setPendingChanges] = useState(false);
  const { error, loading, data } = useMapConfig(mapName);

  const [infoDialogOptions, setInfoDialogOptions] = useState<
    Array<InfoDialogOptions>
  >([]);

  useEffect(() => {
    // FIXME: Why can't we get rid of "any"?!
    const tool: any = data?.tools?.find(
      // FIXME: Why isn't "t: Tool" valid?!
      (t: any) => t.type === "infodialog"
    );

    const options: InfoDialogOptions[] = tool?.options || [];
    setInfoDialogOptions(options);
  }, [data]);

  useEffect(() => {
    // Pre-select the first map in the Select component
    setMapName(maps[0]);
  }, [maps]);

  const handleMapChange = (event: SelectChangeEvent<typeof mapName>) => {
    const { value } = event.target;
    setMapName(value);
  };

  return maps.length > 0 ? (
    <>
      {pendingChanges && (
        <Typography variant="caption">
          There are local changes. Please rembember to click on the save button
          to send them to the server.
        </Typography>
      )}
      {loading && <CircularProgress />}
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="map-select-label">Map config</InputLabel>
        <Select
          labelId="map-select-label"
          label="Map config"
          value={mapName}
          onChange={handleMapChange}
        >
          {maps.map((m: string, i) => (
            <MenuItem key={i} value={m}>
              {m}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <InstanceSelector
        options={infoDialogOptions}
        mapName={mapName}
        pendingChanges={pendingChanges}
        setPendingChanges={setPendingChanges}
      />
    </>
  ) : null;
}
