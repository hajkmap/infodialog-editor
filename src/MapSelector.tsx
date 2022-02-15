import * as React from "react";
import { useEffect, useState } from "react";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";

import useMapConfig from "./hooks/useMapConfig";
import ProTip from "./ProTip";
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
  const [mapName, setMapName] = useState<string>("");
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

    const options: InfoDialogOptions[] = tool?.options;
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
      <Select value={mapName} onChange={handleMapChange}>
        {maps.map((m: string, i) => (
          <MenuItem key={i} value={m}>
            {m}
          </MenuItem>
        ))}
      </Select>
      {loading && <CircularProgress />}
      <ProTip options={infoDialogOptions} />
    </>
  ) : null;
}
