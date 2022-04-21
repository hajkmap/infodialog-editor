import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import MapSelector from "./MapSelector";

type Props = {
  maps: string[];
};

const MapView = ({ maps }: Props) => {
  console.log("Maps render: ", maps);
  return maps ? (
    <>
      <Box>Maps</Box>
      {maps?.length} map configs available
      <MapSelector maps={maps} />
    </>
  ) : null;
};

export default MapView;
