import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { InfoDialogOptions } from "./types/types";

type AppProps = {
  options?: InfoDialogOptions[];
}

export default function ProTip({ options }: AppProps) {
  console.log('options: ',);
  return (
    <>
      {options?.map(o => <Box>{o.name}</Box>)}
    </>
  )

}
