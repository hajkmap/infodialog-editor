import * as React from "react";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { InfoDialogOptions } from "./types/types";
import InstanceEditor from "./InstanceEditor";

type Props = {
  options: InfoDialogOptions[];
  mapName: string;
};

export default function InstanceSelector({ options, mapName }: Props) {
  const [selectedInstance, setSelectedInstance] = useState<string>("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setSelectedInstance(value);
  };

  const handleSave = (instanceOptions: InfoDialogOptions) => {
    console.log("I think I'm on instance id: ", selectedInstance);
    options[parseInt(selectedInstance)] = instanceOptions;
    console.log("New tool options to save:", options);

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options),
    };

    const url = `http://localhost:3002/api/v1/settings/update/${mapName}/infodialog`;
    fetch(url, requestOptions).then((response) => console.log(response));
  };

  useEffect(() => {
    Array.isArray(options) && setSelectedInstance("0");
  }, [options]);

  return (
    <>
      {Array.isArray(options) ? (
        <>
          <Select value={selectedInstance} onChange={handleChange}>
            {options?.map((o, i) => (
              <MenuItem key={i} value={`${i}`}>
                {o.name}
              </MenuItem>
            ))}
          </Select>
          <InstanceEditor
            instanceOptions={options[parseInt(selectedInstance)]}
            handleSave={handleSave}
          />
        </>
      ) : (
        <Typography variant="caption">No config yet. Add?</Typography>
      )}
    </>
  );
}
