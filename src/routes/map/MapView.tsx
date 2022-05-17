import { Maps } from "../../types/types";

import * as React from "react";
import { Box } from "@mui/system";
import MapSelector from "./MapSelector";

type Props = {
  maps: Maps;
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
