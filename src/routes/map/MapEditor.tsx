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

import { InfoDialogOptions, MapConfig } from "../../types/types";
// import InstanceEditor from "./InstanceEditor";

type Props = {
  options: MapConfig | null;
  mapName: string;
  pendingChanges: boolean;
  setPendingChanges: Function;
};

export default function MapEditor({
  options,
  mapName,
  pendingChanges,
  setPendingChanges,
}: Props) {
  console.log(mapName, options);
  const { enqueueSnackbar } = useSnackbar();

  const [selectedInstance, setSelectedInstance] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [instanceName, setInstanceName] = useState("");

  return <></>;
}
