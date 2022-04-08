import * as React from "react";
import { useEffect, useState } from "react";

import MDEditor from "@uiw/react-md-editor";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { InfoDialogOptions } from "./types/types";

type Props = {
  instanceOptions: InfoDialogOptions;
  handleInstanceOptionsChange: (instanceOptions: InfoDialogOptions) => void;
};

export default function InstanceEditor({
  instanceOptions,
  handleInstanceOptionsChange,
}: Props) {
  if (instanceOptions === undefined) return null;

  // When new instance options arrive…
  // useEffect(() => {
  //   // …let's set the Editor's text
  //   setText(instanceOptions.text);
  // }, [instanceOptions]);

  function RenderInput(k: string, v: string, i: number) {
    const [value, setValue] = useState(v);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      (instanceOptions as any)[k] = e.target.value;
      handleInstanceOptionsChange(instanceOptions);
    };

    return (
      <TextField
        key={i}
        label={k}
        value={value}
        fullWidth
        sx={{ m: 1 }}
        onChange={handleChange}
      />
    );
  }

  function RenderCheckbox(k: string, v: boolean, i: number) {
    const [value, setValue] = useState(v);

    return (
      <FormControlLabel
        key={i}
        control={
          <Checkbox
            checked={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setValue(e.target.checked);
              (instanceOptions as any)[k] = e.target.checked;
              handleInstanceOptionsChange(instanceOptions);
            }}
            name={k}
          />
        }
        label={k}
      />
    );
  }

  function RenderMarkdownEditor(v: string, i: number) {
    console.log("RenderMarkdownEditor: ", v);
    const [text, setText] = useState(v);

    const handleChange = (newText: string | undefined): void => {
      setText(newText || "");
      instanceOptions.text = newText || "";
      handleInstanceOptionsChange(instanceOptions);
    };

    return <MDEditor value={text} onChange={handleChange} key={i} />;
  }

  function RenderOption(option: any, i: number) {
    const k: string = option[0];
    const v: string | boolean | {} = option[1];

    // Text is a special type that we take care of in the MD Editor.
    // Let's put if first, and render as soon as we encounter an option
    // named 'text'.
    if (k === "text") return RenderMarkdownEditor(v as string, i);

    // For other options, look at type of its value and render an UI
    // element accordingly, e.g. checkbox for booleans, text fields for strings.
    // if (typeof v === "string") return RenderInput(k, v, i);
    // if (typeof v === "boolean") return RenderCheckbox(k, v as boolean, i);
    // return <Typography key={i}>Not supported: {k}</Typography>;
  }

  console.log("got new instanceOptions: ", instanceOptions);
  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      {Object.entries(instanceOptions).map((o: any, i: number) =>
        RenderOption(o, i)
      )}
    </FormControl>
  );
}
