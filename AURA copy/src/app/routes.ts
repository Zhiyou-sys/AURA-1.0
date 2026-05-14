import { createBrowserRouter, Navigate } from "react-router";
import { MainLayout } from "./components/MainLayout";
import { Home } from "./pages/Home";
import { MapSelection } from "./pages/MapSelection";
import { PlotDetail } from "./pages/PlotDetail";
import { Booking } from "./pages/Booking";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "map", Component: MapSelection },
      { path: "plot/:id", Component: PlotDetail },
      { path: "booking/:id", Component: Booking },
      { path: "dashboard", element: <Navigate to="/" replace /> },
      { path: "settings", Component: Settings },
    ],
  },
]);