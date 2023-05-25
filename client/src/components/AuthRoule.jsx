import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userCheckTkn } from "../api/user.api";
import Loading from "./common/Loading";
import Header from "./common/Header";
import Link from '@mui/material/Link';
const AuthRoute = (props) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      setIsLoading(true);

      const { response, err } = await userCheckTkn();

      if (err) {
        localStorage.removeItem("tkn");
        setIsLoading(false);
      }

      if (response) navigate("/");
    };

    const tkn = localStorage.getItem("tkn");

    if (tkn) checkToken();
    else setIsLoading(false);
  }, [navigate]);

  return (
    isLoading ? (
      <Loading />
    ) : (
      <Container
        component="main"
        maxWidth="md"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Header>
          <Typography variant="h5" fontWeight="600">
            Kanban APP
          </Typography>
        </Header>

        <Box width="100%">
          {props.children}
        </Box>

        <Box  padding={2}>
          <Link target="_blank" href= 'https://linktr.ee/xnjosgui'>
          <Typography variant="caption" color="primary">
          @xnjosgui ® allrights reserved 
          </Typography>
          </Link>
        </Box>
      </Container>
    )
  );
};

export default AuthRoute;