import AuthRoute from './component/AuthRoute';
import ProtectedRoute from './component/ProtectedRoute';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register';

import CssBaseline  from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {BrowserRouter, Route, Routes} from 'react-router-dom'



function App() {

  const theme = createTheme({
    palette: {
    mode: 'dark',
  },})


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/login" element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          } />
          <Route path="/register" element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
