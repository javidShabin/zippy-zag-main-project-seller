import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../pages/SignupPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <SignupPage />
    }
])