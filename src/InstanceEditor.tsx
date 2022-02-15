import * as React from "react";
import { useEffect, useState } from "react";

import MDEditor from "@uiw/react-md-editor";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { InfoDialogOptions } from "./types/types";

type Props = {
  instanceOptions: InfoDialogOptions;
  handleSave: Function;
};

export default function InstanceSelector({
  instanceOptions,
  handleSave,
}: Props) {
  if (instanceOptions === undefined) return null;

  useEffect(() => {
    setText(instanceOptions.text);
  }, [instanceOptions]);

  const [text, setText] = useState<string | undefined>(instanceOptions.text);

  const handleClick = () => {
    instanceOptions.text = text || "";
    console.log("Saving:", instanceOptions);
    handleSave(instanceOptions);
  };

  return (
    <>
      <MDEditor value={text} onChange={setText} />
      <Box>
        <Button onClick={handleClick}>Save</Button>
      </Box>
    </>
  );
}
