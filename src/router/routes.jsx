import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import SellerLayout from "../layout/SellerLayout";
import LoginPage from "../pages/LoginPage";
import AuthSeller from "./protectedRoute/AuthSeller";
import SpecialComponent from "../layout/SpecialComponent";
import RestaurantDetails from "../pages/authSeller/RestaurantDetails";
import MenuList from "../pages/authSeller/MenuList";
import ProfilePage from "../pages/authSeller/Profile";
import EditProfile from "../pages/authSeller/ProfileEditePage";
import CreateMenu from "../pages/authSeller/CreateMenu";
import GetOrderDetails from "../components/AuthSeller/GetOrderDetails";

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
            element: <ProfilePage />,
          },
          {
            path: "edit-profile",
            element: <EditProfile />,
          },
          {
            path: "create-menu",
            element: <CreateMenu />
          },
          {
            path: "order-details/:orderId",
            element: <GetOrderDetails />
          }
        ],
      },
    ],
  },
]);
