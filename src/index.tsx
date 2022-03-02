import * as React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

import App from "./App";
import theme from "./theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={3}>
      <CssBaseline />
      <App />
    </SnackbarProvider>
  </ThemeProvider>,
  document.querySelector("#root")
);
