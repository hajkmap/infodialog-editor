import * as React from "react";

import {
  useFetchMapsQuery,
  useFetchLayersQuery,
} from "./features/maps/mapsApiSlice";

import { Link as RouterLink, Navigate, Routes, Route } from "react-router-dom";

import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  LinearProgress,
  Link as MUILink,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ConstructionIcon from "@mui/icons-material/Construction";
import MapIcon from "@mui/icons-material/Map";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import EditIcon from "@mui/icons-material/Edit";

import NotFound404 from "./routes/error/PageNotFoundView";
import NoConnectionToServerView from "./routes/error/NoConnectionToServerView";
import DashboardView from "./routes/dashboard/DashboardView";

import MapView from "./routes/map/MapView";
import MapDetailView from "./routes/map/MapDetailView";
import MapToolView from "./routes/map/MapToolView";

import ToolView from "./routes/tool/ToolView";

import DemoView from "./routes/demo/DemoView";

import LayerLayout from "./routes/layer/LayerLayout";
import LayerListView from "./routes/layer/LayerListView";
import LayerAddView from "./routes/layer/LayerAddView";
import LayerDetailView from "./routes/layer/LayerDetailView";

const App = () => {
  const {
    data: maps = [],
    error,
    isUninitialized, // Query has not started yet.
    isLoading, // Query is currently loading for the first time. No data yet.
    isFetching, // Query is currently fetching, but might have data from an earlier request.
    isSuccess, // Query has data from a successful load.
    isError, // Query is currently in an "error" state.
  } = useFetchMapsQuery();

  const {
    data: layers = {
      arcgislayers: [],
      wmslayers: [],
      wmtslayers: [],
      wfslayers: [],
      wfstlayers: [],
      vectorlayers: [],
    },
  } = useFetchLayersQuery();

  if (isFetching) {
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
            <ListItemButton component={RouterLink} to="/demo">
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Redux Demo" />
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
            {isError && <NoConnectionToServerView />}

            {isSuccess && maps.length && Object.keys(layers).length && (
              <Routes>
                <Route path="*" element={<NotFound404 />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route
                  path="/dashboard"
                  element={<DashboardView maps={maps} layers={layers} />}
                />

                <Route path="/map" element={<MapView />} />
                <Route path="/map/:map" element={<MapDetailView />} />
                <Route path="/map/:map/:tool" element={<MapToolView />} />

                <Route path="/tool" element={<ToolView maps={maps} />} />
                <Route path="/layer" element={<LayerLayout layers={layers} />}>
                  <Route path="list" element={<LayerListView />} />
                  <Route path="add" element={<LayerAddView />} />
                  <Route path=":id" element={<LayerDetailView />} />
                  <Route path="*" element={<NotFound404 />} />
                </Route>
                <Route path="/demo" element={<DemoView />} />
              </Routes>
            )}

            <Typography variant="body2" color="text.secondary" align="center">
              {"Copyright © "}
              <MUILink color="inherit" href="https://hajkmap.github.com/">
                Hajk Admin UI
              </MUILink>
              {" 2021-"}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Container>
        </Box>
      </Box>
    );
};

export default App;
