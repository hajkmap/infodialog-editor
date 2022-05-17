import * as React from "react";
import { useEffect, useState } from "react";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import { useSnackbar } from "notistack";

import { MapConfig } from "../../types/types";
import InstanceSelector from "../tool/InfoDialog/InstanceSelector";

type Props = {
  options: MapConfig | null;
  mapName: string;
  pendingChanges: boolean;
  setPendingChanges: Function;
};

export default function MapEditor({
  options,
  mapName,
  pendingChanges,
  setPendingChanges,
}: Props) {
  const [activeTool, setActiveTool] = useState("");

  const handleToolChange = (event: SelectChangeEvent<typeof activeTool>) => {
    const { value } = event.target;
    setActiveTool(value);
  };

  useEffect(() => {
    // Pre-select the first map in the Select component
    setActiveTool("");
  }, [options]);

  function ToolSelector() {
    const activeToolOptions: any = options?.tools?.find(
      (t: any) => t.type === activeTool
    );

    switch (activeTool) {
      case "infodialog":
        return (
          <InstanceSelector
            options={activeToolOptions?.options}
            mapName={mapName}
            pendingChanges={pendingChanges}
            setPendingChanges={setPendingChanges}
          />
        );

      default:
        return <>Not yet implemented</>;
    }
  }

  return options?.tools ? (
    <>
      <Grid item xs={12}>
        <FormControl sx={{ minWidth: 200, display: "flex" }}>
          <InputLabel id="map-select-label">Active tool</InputLabel>
          <Select
            labelId="map-select-label"
            label="Map config"
            value={activeTool}
            onChange={handleToolChange}
          >
            {options?.tools?.map((e: any, i) => (
              <MenuItem key={i} value={e.type}>
                {e.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Divider sx={{ p: 2 }} />
      <Grid item xs={12}>
        <ToolSelector />
      </Grid>
    </>
  ) : null;
}
