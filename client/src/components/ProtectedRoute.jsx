import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { userCheckTkn } from "../api/user.api";
import Loading from "./common/Loading";
import { setUser } from "../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./common/Sidebar";
import Home from "../pages/Home";
const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user.value)
  console.log(user);
  useEffect(() => {
    const checkToken = async () => {
      setIsLoading(true);

      const { response, err } = await userCheckTkn();

      if (err) {
        localStorage.removeItem("tkn");
        navigate("/login");
      }

      if (response) {
        localStorage.setItem("username", response.username);
        dispatch(setUser(response.username))
        setIsLoading(false);
      }
    };

    const tkn = localStorage.getItem("tkn");

    if (tkn) checkToken();
    else navigate("/login");
  }, [navigate]);

  return (
    isLoading ? (
      <Loading fullHeight />
    ) : (
      <Box sx={{
        display: 'flex'
      }}>
        <Sidebar />
        <Box sx={{
          flexGrow: 1,
          p: 1,
          width: 'max-content'
        }}>
         {props.children}
        </Box>
      </Box>
    )
  );
};

export default ProtectedRoute;