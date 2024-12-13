import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import SellerLayout from "../layout/SellerLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <SellerLayout />
    }
])