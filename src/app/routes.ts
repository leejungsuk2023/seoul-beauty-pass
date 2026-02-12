import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import FreeOffer from "./pages/FreeOffer";
import HowItWorks from "./pages/HowItWorks";
import ManageBooking from "./pages/ManageBooking";
import MyDashboard from "./pages/MyDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "free-offer", Component: FreeOffer },
      { path: "how-it-works", Component: HowItWorks },
      { path: "manage-booking", Component: ManageBooking },
      { path: "my-dashboard", Component: MyDashboard },
      { path: "admin", Component: AdminDashboard },
    ],
  },
]);