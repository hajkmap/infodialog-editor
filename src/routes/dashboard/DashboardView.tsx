import { Layers, Maps } from "../../types/types";

import * as React from "react";
import { Box } from "@mui/system";

type Props = {
  maps: Maps;
  layers: Layers;
};

const DashboardView = ({ maps, layers }: Props) => {
  // console.log("Dashboard render: ", maps, layers);
  return (
    <>
      <Box>Dashboard</Box>
      {maps?.length} map configs, {layers["wmslayers"]?.length} WMS layers and{" "}
      {layers["vectorlayers"]?.length} vector layers available
    </>
  );
};

export default DashboardView;
