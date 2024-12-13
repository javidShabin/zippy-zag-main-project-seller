import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import SellerLayout from "../layout/SellerLayout";
import Dashbor from "../pages/Dashbord";
import LoginPage from "../pages/LoginPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <SellerLayout />,

        children: [
           {
            path: "/",
            element: <Dashbor />
           },
           {
            path: "sign-up",
            element: <SignupPage />
           },
           {
            path: "log-in",
            element: <LoginPage />
           }
        ]
    }
])