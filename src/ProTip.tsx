import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { InfoDialogOptions } from "./types/types";

type Props = {
  options: InfoDialogOptions[];
};

export default function ProTip({ options }: Props) {
  return Array.isArray(options) ? (
    <>
      {options?.map((o, i) => (
        <Box key={i}>{o.name}</Box>
      ))}
    </>
  ) : (
    <Typography variant="caption">No config yet. Add?</Typography>
  );
}
