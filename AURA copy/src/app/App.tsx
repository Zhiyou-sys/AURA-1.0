import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function App() {
  // The app routing and rendering happens here
  return <RouterProvider router={router} />;
}