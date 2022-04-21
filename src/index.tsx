import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

import App from "./App";

import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={3}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SnackbarProvider>
  </ThemeProvider>
);
