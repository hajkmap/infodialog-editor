import * as React from "react";
import { Box } from "@mui/system";
import { Layers } from "../../types/types";

type Props = {
  maps: string[];
  layers: Layers;
};

const DashboardView = ({ maps, layers }: Props) => {
  console.log("Dashboard render: ", maps, layers);
  return (
    <>
      <Box>Dashboard</Box>
      {maps?.length} map configs, {layers["wmslayers"]?.length} WMS layers and{" "}
      {layers["vectorlayers"]?.length} vector layers available
    </>
  );
};

export default DashboardView;
