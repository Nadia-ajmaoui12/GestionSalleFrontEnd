import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './styles/style.css';
import jwt from 'jsonwebtoken';
// eslint-disable-next-line import/no-unresolved
import accessTokenStorage from '../../services/security/accessTokenStorage';

export default function AppBarMenu({ children }: any) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = accessTokenStorage.get();
  const decodedToken = jwt.decode(token);
  const role = decodedToken ? decodedToken.role : 'none';
  const userName = decodedToken ? decodedToken.firstName : 'none';
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const excludedPaths = ['/', '/register'];

  const shouldDisplayMenu = !excludedPaths.includes(location.pathname);

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '10%' }}>
      {shouldDisplayMenu && (
        <AppBar component="nav" className="AppBarStyle">
          <Toolbar>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Typography variant="h6" component="div">
                {userName || 'null'}
              </Typography>
            </Box>
            {role === 'MANAGER' && (
              <>
                <Button style={{ color: '#fff' }} component={Link} to="/profil">
                  Profil
                </Button>
                <Button
                  style={{ color: '#fff' }}
                  component={Link}
                  to="manager/reservations"
                >
                  Reservations Management
                </Button>
                <Button
                  style={{ color: '#fff' }}
                  component={Link}
                  to="manager/clients"
                >
                  Our Clients
                </Button>
                <Button
                  style={{ color: '#fff' }}
                  component={Link}
                  to="manager/spots"
                >
                  Rooms Management
                </Button>
                <Button
                  style={{ color: '#fff' }}
                  component={Link}
                  to="manager/spot/form"
                >
                  Add new Room
                </Button>
              </>
            )}

            {role === 'CLIENT' && (
              <>
                <Button style={{ color: '#fff' }} component={Link} to="/profil">
                  Profil
                </Button>
                <Button
                  style={{ color: '#fff' }}
                  component={Link}
                  to="/reservations"
                >
                  My Reservations
                </Button>
              </>
            )}

            <IconButton color="inherit" onClick={handleLogout}>
              <PowerSettingsNewIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
      <Box component="main" className="PageContainer">
        {children}
      </Box>
    </Box>
  );
}
