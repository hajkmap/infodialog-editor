import * as React from "react";
import { useEffect, useState } from "react";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Button,
  CircularProgress,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useSnackbar } from "notistack";

import { InfoDialogOptions } from "../../../types/types";
import InstanceEditor from "./InstanceEditor";

type Props = {
  options: InfoDialogOptions[];
  mapName: string;
  pendingChanges: boolean;
  setPendingChanges: Function;
};

export default function InstanceSelector({
  options,
  mapName,
  pendingChanges,
  setPendingChanges,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const [selectedInstance, setSelectedInstance] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [instanceName, setInstanceName] = useState("");

  console.log("options: ", options);
  useEffect(() => {
    Array.isArray(options) && setSelectedInstance("0");
  }, [options]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setSelectedInstance(value);
  };

  const handleInstanceOptionsChange = (instanceOptions: InfoDialogOptions) => {
    // Use the index of currently selected instance to grab it in
    // the options array. Next, set its value to the new options.
    options[parseInt(selectedInstance)] = instanceOptions;
    setPendingChanges(true);
  };

  const sendOptionsToServer = async () => {
    console.log("sending options: ", options);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options),
    };

    const url = `http://localhost:3002/api/v1/settings/update/${mapName}/infodialog`;

    try {
      const response = await fetch(url, requestOptions);
      if ([201, 204].includes(response.status)) {
        enqueueSnackbar("Changes saved!", { variant: "success" });
        setPendingChanges(false);
      } else {
        enqueueSnackbar("Couldn't save changes", { variant: "error" });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Couldn't save changes", { variant: "error" });
    }
  };

  const handleAddNewInstance = () => {
    // Prepare the new instance
    const instanceOptions: InfoDialogOptions = {
      allowDangerousHtml: false,
      buttonText: "",
      headerText: "",
      icon: "help",
      name: instanceName,
      showOnlyOnce: false,
      target: "left",
      text: "",
      title: "",
      useLegacyNonMarkdownRenderer: false,
      visibleAtStart: false,
      visibleForGroups: [],
    };

    // Add the new instance options to our array
    options.push(instanceOptions);

    // Ensure that we pre-select the newly added instance in the dropdown
    setSelectedInstance((options.length - 1).toString());

    // Tell the UI that there are pending changes
    setPendingChanges(true);

    // Close the dialog
    setDialogOpen(false);
  };

  const handleDelete = () => {
    options.splice(Number(selectedInstance), 1);
    setSelectedInstance("");
    setPendingChanges(true);
  };

  const AddNewButton = () => {
    return (
      <Button color="success" onClick={() => setDialogOpen(true)}>
        Add new instance
      </Button>
    );
  };

  return (
    <>
      <Grid container item xs={12}>
        {options.length > 0 ? (
          <>
            <Grid item xs={12}>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="infodialog-select-label">
                  InfoDialog instance
                </InputLabel>
                <Select
                  label="InfoDialog instance"
                  labelId="infodialog-select-label"
                  value={selectedInstance}
                  onChange={handleChange}
                >
                  {options?.map((o, i) => (
                    <MenuItem key={i} value={`${i}`}>
                      {o.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <AddNewButton />
              <Button onClick={handleDelete} color="error">
                Delete
              </Button>
              <Button
                onClick={sendOptionsToServer}
                color="primary"
                disabled={!pendingChanges}
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={12}>
              <InstanceEditor
                instanceOptions={options[parseInt(selectedInstance)]}
                handleInstanceOptionsChange={handleInstanceOptionsChange}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12}>
              <Typography>No config yet. Add?</Typography>
            </Grid>
            <Grid item xs={12}>
              <AddNewButton />
              <Button
                onClick={sendOptionsToServer}
                color="primary"
                disabled={!pendingChanges}
              >
                Save
              </Button>
            </Grid>
          </>
        )}
      </Grid>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add new InfoDialog instance</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the following details in order to add a new
            InfoDialog to <i>{mapName}</i>.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="instance-name-input"
            defaultValue=""
            label="Instance name"
            helperText="Allowed characters: a-z, A-Z, numbers, underscore and dash."
            error={instanceName.length === 0}
            type="text"
            fullWidth
            variant="standard"
            onChange={({ target }) => {
              if (/^[a-zA-Z\-\_\d]+$/.test(target.value)) {
                setInstanceName(target.value);
              } else {
                setInstanceName("");
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            disabled={instanceName.length === 0}
            color="primary"
            variant="contained"
            onClick={handleAddNewInstance}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
