import Header from "../components/common/Header";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import { Stack, Box, Typography, IconButton} from "@mui/material";


const HomePage = () => {
  const username = localStorage.getItem("username");

  const navigate = useNavigate();


  const onSignOut = () => {
    localStorage.removeItem("tkn");
    navigate("/login");

  }


  return (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      sx={{ height: "100%" }}
    >
      <Header bg borderBottom>
        <Box sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          paddingX: 2,
          maxWidth: "md"
        }}>
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }}
          >
            {username}
          </Typography>
          <IconButton
            onClick={onSignOut}
            sx={{
              position: "absolute",
              top: "50%",
              right: "16px",
              transform: "translateY(-50%)"
            }}
          >
            <LogoutOutlinedIcon />
          </IconButton>
        </Box>
      </Header>

      <Box sx={{
        height: "100%",
        position: "fixed",
        zIndex: 1,
        maxWidth: "md",
        width: "100%",
        overflowY: "auto",
        paddingTop: "60px",
        paddingBottom: "90px",
        "&::-webkit-scrollbar": {
          width: "0px"
        }
      }}>

      </Box>

      <Stack
        width="100%"
        alignItems="center"
        justifyContent="center"
        borderTop="1px solid #2c2c2c"
        bgcolor="#000"
        zIndex={3}
      >
      </Stack>
    </Stack>
  );
};

export default HomePage;