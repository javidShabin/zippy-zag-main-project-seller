import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import SellerLayout from "../layout/SellerLayout";
import LoginPage from "../pages/LoginPage";
import AuthSeller from "./protectedRoute/AuthSeller";
import SpecialComponent from "../layout/SpecialComponent";
import RestaurantDetails from "../pages/authSeller/RestaurantDetails";
import MenuList from "../pages/authSeller/MenuList";
import ProfilePage from "../pages/authSeller/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SellerLayout />,

    children: [
      {
        path: "/",
        element: <SpecialComponent />,
      },
      {
        path: "sign-up",
        element: <SignupPage />,
      },
      {
        path: "log-in",
        element: <LoginPage />,
      },

      {
        path: "seller",
        element: <AuthSeller />,

        children: [
          {
            path: "rest-details",
            element: <RestaurantDetails />,
          },
          {
            path: "menu-list",
            element: <MenuList />,
          },
          {
            path: "profile",
            element: <ProfilePage />
          }
        ],
      },
    ],
  },
]);
