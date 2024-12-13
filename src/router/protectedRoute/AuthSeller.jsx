import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const AuthSeller = () => {
  const { isSellerExist } = useSelector((state) => state.seller);
  console.log(isSellerExist);
  const navigate = useNavigate();

  if (!isSellerExist) {
    navigate("/log-in");
  }

  return isSellerExist ? <Outlet /> : null;
};

export default AuthSeller;
