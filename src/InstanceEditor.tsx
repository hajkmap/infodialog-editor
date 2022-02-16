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
  handleInstanceOptionsChange: (instanceOptions: InfoDialogOptions) => void;
};

export default function InstanceSelector({
  instanceOptions,
  handleInstanceOptionsChange,
}: Props) {
  if (instanceOptions === undefined) return null;

  const [text, setText] = useState(instanceOptions.text);

  // When new instance options arrive…
  useEffect(() => {
    // …let's set the Editor's text
    setText(instanceOptions.text);
  }, [instanceOptions]);

  const handleChange = (newText: string | undefined): void => {
    setText(newText || "");
    instanceOptions.text = newText || "";
    handleInstanceOptionsChange(instanceOptions);
  };

  return (
    <>
      <MDEditor value={text} onChange={handleChange} />
    </>
  );
}
