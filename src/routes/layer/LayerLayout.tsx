import { Layers } from "../../types/types";

import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

import { Box, TextField } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridSelectionModel,
} from "@mui/x-data-grid";

type Props = {
  layers: Layers;
};

const LayerLayout = ({ layers }: Props): JSX.Element => {
  const { wmslayers, vectorlayers } = layers;

  const [cols, setCols] = React.useState<GridColDef[]>([]);
  console.log("cols: ", cols);
  useEffect(() => {
    wmslayers?.[0] &&
      setCols(
        Object.keys(wmslayers[0]).map((k) => {
          console.log("k: ", k);
          return {
            field: k,
            headerName: k.toUpperCase(),
            ...(k === "layersInfo" && {
              valueGetter: (params: GridValueGetterParams) => {
                console.log("params: ", params);
                // `${params.row.firstName || ""} ${params.row.lastName || ""}`,
                return params.value && Object.keys(params.value).length;
              },
            }),
          };
        })
      );
  }, [wmslayers]);
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "caption",
      headerName: "Caption",
      width: 200,
      editable: true,
    },
    {
      field: "imageFormat",
      headerName: "Format",
      width: 120,
      editable: true,
    },
    {
      field: "url",
      headerName: "URL",
      width: 350,
      editable: true,
    },
    {
      field: "serverType",
      headerName: "Server",
      width: 150,
      editable: true,
    },
    {
      field: "tiled",
      headerName: "GWC",
      width: 70,
      editable: true,
      type: "boolean",
    },
    {
      field: "projection",
      headerName: "Projection",
      // type: 'number',
      width: 110,
      editable: true,
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];
  return (
    <Box sx={{ flex: 1, flexDirection: "columns" }}>
      <Link to="/layer/list">List layers</Link>
      <Link to="/layer/add">Add layer</Link>
      <Link to={`/layer/${selectionModel[0]}`}>Detail view</Link>
      <Outlet />

      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={wmslayers}
          columns={cols}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          // checkboxSelection
          // disableSelectionOnClick
          onSelectionModelChange={(newSelectionModel) => {
            console.log("newSelectionModel: ", newSelectionModel);
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
        />
      </div>
    </Box>
  );
};

export default LayerLayout;
