import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import SellerLayout from "../layout/SellerLayout";
import Dashbor from "../pages/Dashbord";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <SellerLayout />,

        children: [
           {
            path: "/",
            element: <Dashbor />
           }
        ]
    }
])