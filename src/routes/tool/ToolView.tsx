import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import MapSelector from "../map/MapSelector";

type Props = {
  maps: string[];
};

const MapView = ({ maps }: Props): JSX.Element => {
  return (
    <>
      <Box>Tools</Box>
    </>
  );
};

export default MapView;
