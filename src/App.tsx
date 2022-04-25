import * as React from "react";
import {
  Link as RouterLink,
  Navigate,
  Outlet,
  useRoutes,
  useLocation,
  matchPath,
  Routes,
  Route,
} from "react-router-dom";
import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  LinearProgress,
  Link as MUILink,
  List,
  Paper,
  Toolbar,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ConstructionIcon from "@mui/icons-material/Construction";
import MapIcon from "@mui/icons-material/Map";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import EditIcon from "@mui/icons-material/Edit";
import AssignmentIcon from "@mui/icons-material/Assignment";

import MapSelector from "./routes/map/MapSelector";
import { Grid } from "@mui/material";

import NotFound404 from "./routes/error/PageNotFoundView";
import NoConnectionToServerView from "./routes/error/NoConnectionToServerView";
import DashboardView from "./routes/dashboard/DashboardView";
import MapView from "./routes/map/MapView";
import ToolView from "./routes/tool/ToolView";

import LayerLayout from "./routes/layer/LayerLayout";
import LayerListView from "./routes/layer/LayerListView";
import LayerAddView from "./routes/layer/LayerAddView";
import LayerDetailView from "./routes/layer/LayerDetailView";

import { Layers } from "./types/types";

const App = () => {
  const [maps, setMaps] = useState<string[]>([]);
  const [layers, setLayers] = useState<Layers | any>({});
  const [error, setError] = useState("");

  const fetchMaps = async () => {
    try {
      const response = await fetch(
        "http://localhost:3002/api/v1/mapconfig/list"
      );
      const maps: string[] = await response.json();
      setMaps(maps);
      setError("");
    } catch (e) {
      console.log("error: ", e);
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  const fetchLayers = async () => {
    try {
      const response = await fetch(
        "http://localhost:3002/api/v1/config/layers"
      );
      const layers: Layers = await response.json();
      setLayers(layers);
      setError("");
    } catch (e) {
      console.log("error: ", e);
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  // Fetch available layers and maps upon load
  useEffect(() => {
    fetchLayers();
    fetchMaps();
  }, []);

  if (
    error.length === 0 &&
    (maps.length === 0 || Object.keys(layers).length === 0)
  ) {
    return <LinearProgress />;
  } else
    return (
      <Box sx={{ display: "flex" }}>
        <AppBar position="absolute" sx={{ paddingLeft: "250px" }}>
          <Toolbar>
            <IconButton color="inherit" edge="start">
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="h1"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent">
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: 250,
            }}
          >
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItemButton component={RouterLink} to="/">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton component={RouterLink} to="/map">
              <ListItemIcon>
                <MapIcon />
              </ListItemIcon>
              <ListItemText primary="Maps" />
            </ListItemButton>
            <ListItemButton component={RouterLink} to="/layer">
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Layers" />
            </ListItemButton>
            <ListItemButton component={RouterLink} to="/tool">
              <ListItemIcon>
                <ConstructionIcon />
              </ListItemIcon>
              <ListItemText primary="Tools" />
            </ListItemButton>
            <ListItemButton component={RouterLink} to="/search">
              <ListItemIcon>
                <ContentPasteSearchIcon />
              </ListItemIcon>
              <ListItemText primary="Search sources" />
            </ListItemButton>
            <ListItemButton component={RouterLink} to="/edit">
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Edit sources" />
            </ListItemButton>
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            paddingLeft: "250px",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {error.length !== 0 && <NoConnectionToServerView />}

            {error.length === 0 && maps.length && Object.keys(layers).length && (
              <Routes>
                <Route path="*" element={<NotFound404 />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route
                  path="/dashboard"
                  element={<DashboardView maps={maps} layers={layers} />}
                />
                <Route path="/map" element={<MapView maps={maps} />} />
                <Route path="/tool" element={<ToolView maps={maps} />} />(
                <Route path="/layer" element={<LayerLayout layers={layers} />}>
                  <Route path="list" element={<LayerListView />} />
                  <Route path="add" element={<LayerAddView />} />
                  <Route path=":id" element={<LayerDetailView />} />
                  <Route path="*" element={<NotFound404 />} />
                </Route>
                )
              </Routes>
            )}
            <Copyright />
          </Container>
        </Box>
      </Box>
    );
};

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <MUILink color="inherit" href="https://hajkmap.github.com/">
        Hajk Admin UI
      </MUILink>
      {" 2021-"}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default App;
