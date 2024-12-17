import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import SellerLayout from "../layout/SellerLayout";
import LoginPage from "../pages/LoginPage";
import AuthSeller from "./protectedRoute/AuthSeller";
import Resteaurant from "../pages/authSeller/Resteauranr";
import SpecialComponent from "../layout/SpecialComponent";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <SellerLayout />,

        children: [
           {
            path: "/",
            element: <SpecialComponent />
           },
           {
            path: "sign-up",
            element: <SignupPage />
           },
           {
            path: "log-in",
            element: <LoginPage />
           },

           {
            path: "seller",
            element: <AuthSeller />,

            children: [
                {
                    path: "rest-details",
                    element: <Resteaurant />
                }
            ]
           }
        ]
    }
])